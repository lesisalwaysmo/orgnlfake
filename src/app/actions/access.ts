"use server";

import { createClient, isAdmin } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendEmail(to: string, subject: string, html: string) {
    if (!RESEND_API_KEY) {
        console.warn("RESEND_API_KEY not set. Skipping email to:", to);
        return;
    }

    try {
        const { Resend } = await import("resend");
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
            from: "Portfolio Access System <onboarding@resend.dev>",
            to,
            subject,
            html,
        });
    } catch (err) {
        console.error("Failed to send email:", err);
    }
}

export async function approveAndGenerateLink(requestId: string) {
    const supabase = (await createClient()) as any;

    // Verify caller is admin or the model who owns this request
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
        // Check if model owns this request
        const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .single();

        const { data: request } = await supabase
            .from("access_requests")
            .select("creator_username")
            .eq("id", requestId)
            .single();

        if (!profile || !request || profile.username !== request.creator_username) {
            throw new Error("Unauthorized");
        }
    }

    // 1. Generate secure token & set 24-hour expiry
    const secureToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    // 2. Insert token into DB
    const { error: tokenError } = await supabase
        .from("access_tokens")
        .insert({
            token: secureToken,
            request_id: requestId,
            expires_at: expires.toISOString(),
        });

    if (tokenError) {
        console.error("Failed to create token:", tokenError);
        return { error: "Failed to create access token" };
    }

    // 3. Update request status to APPROVED
    const { error: updateError } = await supabase
        .from("access_requests")
        .update({ status: "APPROVED" })
        .eq("id", requestId);

    if (updateError) {
        console.error("Failed to update request status:", updateError);
        return { error: "Failed to update request status" };
    }

    // 4. Fetch request details for the email
    const { data: requestData } = await supabase
        .from("access_requests")
        .select("*")
        .eq("id", requestId)
        .single();

    if (requestData) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const magicLink = `${siteUrl}/${requestData.creator_username}/vault?token=${secureToken}`;

        // Email the VIP client
        await sendEmail(
            requestData.client_email,
            `✨ Access Granted: Exclusive Portfolio`,
            `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e8e8e8; border-radius: 16px; overflow: hidden;">
                <div style="padding: 48px 40px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);">
                    <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.05em; margin: 0 0 8px; color: #c9a86c;">You're In</h1>
                    <p style="font-size: 14px; color: #888; margin: 0;">Exclusive access has been granted</p>
                </div>
                <div style="padding: 40px;">
                    <p style="font-size: 15px; line-height: 1.8; color: #aaa; margin: 0 0 24px;">
                        Hi ${requestData.client_name},<br><br>
                        Your request to view <strong style="color: #e8e8e8;">${requestData.category}</strong> content for 
                        <strong style="color: #e8e8e8;">@${requestData.creator_username}</strong> has been approved.
                    </p>
                    <a href="${magicLink}" style="display: block; text-align: center; padding: 16px 32px; background: #c9a86c; color: #0a0a0a; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 8px; margin: 0 0 32px;">
                        Enter Vault →
                    </a>
                    <div style="border-top: 1px solid #222; padding-top: 24px;">
                        <p style="font-size: 12px; color: #666; line-height: 1.8; margin: 0;">
                            ⚠️ <strong>Security Notice:</strong><br>
                            • This link expires in <strong>24 hours</strong><br>
                            • Maximum <strong>2 views</strong> allowed<br>
                            • Link is locked to your device — <strong>do not share</strong>
                        </p>
                    </div>
                </div>
            </div>
            `
        );
    }

    // 5. Revalidate dashboards
    revalidatePath("/admin/access-requests");
    revalidatePath("/dashboard/access-requests");

    return { success: true };
}

export async function regenerateLink(requestId: string) {
    const supabase = (await createClient()) as any;

    // Verify caller is admin or the model who owns this request
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .single();

        const { data: request } = await supabase
            .from("access_requests")
            .select("creator_username")
            .eq("id", requestId)
            .single();

        if (!profile || !request || profile.username !== request.creator_username) {
            throw new Error("Unauthorized");
        }
    }

    // Generate fresh token, reset timer and views
    const secureToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    const { error: tokenError } = await supabase
        .from("access_tokens")
        .insert({
            token: secureToken,
            request_id: requestId,
            expires_at: expires.toISOString(),
        });

    if (tokenError) {
        return { error: "Failed to regenerate token" };
    }

    // Update request back to APPROVED
    await supabase
        .from("access_requests")
        .update({ status: "APPROVED" })
        .eq("id", requestId);

    // Fetch request details and email the client
    const { data: requestData } = await supabase
        .from("access_requests")
        .select("*")
        .eq("id", requestId)
        .single();

    if (requestData) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const magicLink = `${siteUrl}/${requestData.creator_username}/vault?token=${secureToken}`;

        await sendEmail(
            requestData.client_email,
            `🔄 Fresh Access Link: Exclusive Portfolio`,
            `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e8e8e8; border-radius: 16px; overflow: hidden;">
                <div style="padding: 48px 40px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);">
                    <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.05em; margin: 0 0 8px; color: #c9a86c;">New Access Link</h1>
                    <p style="font-size: 14px; color: #888; margin: 0;">Your previous link has been refreshed</p>
                </div>
                <div style="padding: 40px;">
                    <p style="font-size: 15px; line-height: 1.8; color: #aaa; margin: 0 0 24px;">
                        Hi ${requestData.client_name},<br><br>
                        A fresh access link has been generated for <strong style="color: #e8e8e8;">${requestData.category}</strong> content 
                        from <strong style="color: #e8e8e8;">@${requestData.creator_username}</strong>.
                    </p>
                    <a href="${magicLink}" style="display: block; text-align: center; padding: 16px 32px; background: #c9a86c; color: #0a0a0a; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 8px; margin: 0 0 32px;">
                        Enter Vault →
                    </a>
                    <div style="border-top: 1px solid #222; padding-top: 24px;">
                        <p style="font-size: 12px; color: #666; line-height: 1.8; margin: 0;">
                            ⚠️ <strong>Security Notice:</strong><br>
                            • This link expires in <strong>24 hours</strong><br>
                            • Maximum <strong>2 views</strong> allowed<br>
                            • Link is locked to your device — <strong>do not share</strong>
                        </p>
                    </div>
                </div>
            </div>
            `
        );
    }

    revalidatePath("/admin/access-requests");
    revalidatePath("/dashboard/access-requests");

    return { success: true };
}
