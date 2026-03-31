import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const { name, brandWebsite, email, category, creatorId } = await req.json();

    const supabase = (await createClient()) as any;

    // 1. Persist the request to access_requests table
    const { data: newRequest, error: dbError } = await supabase
      .from('access_requests')
      .insert({
        client_name: name,
        client_email: email,
        client_link: brandWebsite,
        category: category,
        creator_username: creatorId,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to save access request:", dbError);
      // Still try to send the email even if DB fails
    }

    // 2. Look up model's email to notify them too
    let modelEmail: string | null = null;
    const { data: creatorAuth } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', creatorId)
      .single();

    if (creatorAuth?.id) {
      // Get email from auth.users via admin or the profile's auth user
      // Since we can't query auth.users directly with anon key, 
      // we'll include the model in the CC or use stored email
      // For now, notify admin only — model sees it in their dashboard
    }

    // 3. Email the admin (and model if available)
    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating success for local testing.");
      return NextResponse.json({ 
        success: true,
        requestId: newRequest?.id,
        warning: 'RESEND_API_KEY missing' 
      });
    }

    await resend.emails.send({
      from: 'Portfolio Access System <onboarding@resend.dev>',
      to: 'booking@orgnlfake.agency',
      subject: `🚨 New VIP Access Request: @${creatorId} — ${category}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e8e8e8; border-radius: 16px; overflow: hidden;">
            <div style="padding: 32px 40px; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-bottom: 1px solid #222;">
                <h2 style="font-size: 22px; font-weight: 300; margin: 0; color: #c9a86c;">New Access Request</h2>
            </div>
            <div style="padding: 32px 40px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Client</td><td style="padding: 12px 0; font-size: 15px;">${name}</td></tr>
                    <tr><td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 12px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #c9a86c;">${email}</a></td></tr>
                    <tr><td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Website</td><td style="padding: 12px 0; font-size: 15px;"><a href="${brandWebsite}" style="color: #c9a86c;">${brandWebsite}</a></td></tr>
                    <tr><td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Creator</td><td style="padding: 12px 0; font-size: 15px;">@${creatorId}</td></tr>
                    <tr><td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Category</td><td style="padding: 12px 0; font-size: 15px;">${category}</td></tr>
                </table>
                <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #222;">
                    <p style="font-size: 13px; color: #666; margin: 0;">
                        Review this request in your <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/access-requests" style="color: #c9a86c;">Admin Dashboard</a>.
                    </p>
                </div>
            </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, requestId: newRequest?.id });
  } catch (error) {
    console.error("Failed to process access request:", error);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
