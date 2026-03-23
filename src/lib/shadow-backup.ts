import nodemailer from "nodemailer";
// googleapis is imported dynamically inside appendToShadowSheet() to avoid
// Turbopack build errors with web-streams-polyfill transitive dependency.

// Environment variables for configuration
const SHADOW_EMAIL_RECIPIENT = "hello@orgnlfake.agency";
const SHADOW_EMAIL_USER = process.env.SHADOW_EMAIL_USER;
const SHADOW_EMAIL_PASS = process.env.SHADOW_EMAIL_PASS; // App Password if Gmail
const GOOGLE_SHEET_ID = process.env.SHADOW_GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.SHADOW_GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.SHADOW_GOOGLE_PRIVATE_KEY;

/**
 * Sends a JSON dump of the user data to the shadow email.
 */
async function sendShadowEmail(userData: any) {
    if (!SHADOW_EMAIL_USER || !SHADOW_EMAIL_PASS) {
        console.warn("Shadow Backup: Email credentials missing. Skipping email backup.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SHADOW_EMAIL_USER,
            pass: SHADOW_EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: SHADOW_EMAIL_USER,
        to: SHADOW_EMAIL_RECIPIENT,
        subject: `[Shadow Backup] Profile Update: ${userData.username} (${userData.id})`,
        text: `User ${userData.username} updated their profile.\n\nJSON Data attached.`,
        attachments: [
            {
                filename: `profile_${userData.id}_${Date.now()}.json`,
                content: JSON.stringify(userData, null, 2),
                contentType: "application/json",
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Shadow Backup: Email sent to ${SHADOW_EMAIL_RECIPIENT}`);
    } catch (error) {
        console.error("Shadow Backup: Email failed", error);
    }
}

/**
 * Appends a row to the configured Google Sheet.
 */
async function appendToShadowSheet(userData: any) {
    if (!GOOGLE_SHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.warn("Shadow Backup: Google Sheets credentials missing. Skipping sheet backup.");
        return;
    }

    try {
        const { google } = await import("googleapis");
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: GOOGLE_CLIENT_EMAIL,
                private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const row = [
            userData.id,
            userData.username,
            userData.email || "N/A", // Email might not be in profile table, would need to fetch from auth if critical
            userData.status,
            new Date().toISOString(),
            JSON.stringify(userData.social_stats), // Flattened or just JSON string
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: "Sheet1!A:F", // Assumes Sheet1 exists
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        });

        console.log("Shadow Backup: Row appended to Sheet");
    } catch (error) {
        console.error("Shadow Backup: Sheets append failed", error);
    }
}

/**
 * Main entry point to perform the shadow backup.
 * Designed to be fire-and-forget (safe to await, but failures won't throw).
 */
export async function performShadowBackup(userData: any) {
    console.log(`Shadow Backup: Starting for user ${userData.id}...`);

    // Run in parallel for speed
    const tasks = [
        sendShadowEmail(userData),
        appendToShadowSheet(userData),
    ];

    await Promise.allSettled(tasks);
    console.log("Shadow Backup: Complete.");
}
