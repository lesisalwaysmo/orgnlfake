import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating success for local testing.");
      console.log("Join Application Data:", JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true, warning: 'RESEND_API_KEY missing' });
    }

    const fieldRows = [
      ['Full Name', data.fullName],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Date of Birth', data.age],
      ['Country', data.country],
      ['City', data.city],
      ['Creator Type', data.creatorType],
      ['Niche', data.niche],
      ['Experience', data.experience],
      ['Bio', data.bio],
      ['Instagram', data.instagram],
      ['TikTok', data.tiktok],
      ['YouTube', data.youtube],
      ['X / Twitter', data.twitter],
      ['Total Followers', data.totalFollowers],
      ['Content Types', Array.isArray(data.contentType) ? data.contentType.join(', ') : ''],
      ['Content Style', data.contentStyle],
      ['Posting Frequency', data.postingFrequency],
      ['Services Needed', Array.isArray(data.servicesNeeded) ? data.servicesNeeded.join(', ') : ''],
      ['Budget Range', data.budget],
      ['Commitment', data.commitment],
      ['Preferred Contact', data.contactMethod],
      ['Preferred Start Date', data.startDate],
      ['Why Us', data.whyUs],
      ['Unique Factor', data.uniqueFactor],
    ]
      .filter(([, val]) => val)
      .map(([label, val]) => `<tr><td style="padding:8px 16px;font-weight:600;color:#666;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:8px 16px;color:#1a1a1a;">${val}</td></tr>`)
      .join('');

    await resend.emails.send({
      from: 'Join Application <onboarding@resend.dev>',
      to: 'Join@orgnlfake.agency',
      subject: `🚀 New Join Application: ${data.fullName || 'Unknown'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1a1a1a; max-width: 600px;">
          <h2 style="font-size: 24px; text-transform: uppercase; margin-bottom: 24px;">New Creator Application</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
            ${fieldRows}
          </table>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p style="font-size: 14px; color: #666;">This application was submitted via the Join Us page on orgnlfake.agency.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send join application:", error);
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 });
  }
}
