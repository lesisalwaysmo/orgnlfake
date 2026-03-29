import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const { name, brandWebsite, email, category, creatorId } = await req.json();

    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating success for local testing.");
      return NextResponse.json({ success: true, warning: 'RESEND_API_KEY missing' });
    }

    await resend.emails.send({
      from: 'Portfolio Access System <onboarding@resend.dev>', // Update this when domain is connected
      to: 'booking@orgnlfake.agency',
      subject: `🚨 Portfolio Access Request: ${creatorId} - ${category}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1a1a1a;">
            <h2 style="font-size: 24px; text-transform: uppercase;">New Access Request</h2>
            <p style="font-size: 16px;"><strong>Client Name:</strong> ${name}</p>
            <p style="font-size: 16px;"><strong>Brand Website:</strong> <a href="${brandWebsite}">${brandWebsite}</a></p>
            <p style="font-size: 16px;"><strong>Client Email:</strong> ${email}</p>
            <p style="font-size: 16px;"><strong>Model / Creator:</strong> ${creatorId}</p>
            <p style="font-size: 16px;"><strong>Requested Category:</strong> ${category}</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />
            <p style="font-size: 14px; color: #666;">Please generate a hybrid link for this specific model and category in the Supabase dashboard, then reply to the client.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send access request:", error);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
