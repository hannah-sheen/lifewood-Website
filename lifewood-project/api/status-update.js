import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ─── Logo CID inline attachment ───────────────────────────────────────────────
const logoAttachment = {
  filename: 'lifewood-logo.avif',
  path: path.join(__dirname, 'assets/lifewood-paper-logo.avif'),
  cid: 'lifewood-logo@lifewood',
};

// Helper functions
const label = (text) =>
  `<p style="margin:0 0 5px;font-family:'Manrope',system-ui,sans-serif;font-size:10px;font-weight:800;color:#708E7C;text-transform:uppercase;letter-spacing:2px;">${text}</p>`;

const card = (inner, bg = '#fff', border = '#e8e2d4') =>
  `<div style="background:${bg};border-radius:12px;border:1px solid ${border};padding:24px;margin-top:20px;">${inner}</div>`;

// Email wrapper with CID logo reference
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:#f5eedb;font-family:'Manrope',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5eedb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#133020;border-radius:16px 16px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="cid:lifewood-logo@lifewood" alt="Lifewood" height="36" style="display:block;height:36px;width:auto;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:10px;font-weight:700;color:#708E7C;text-transform:uppercase;letter-spacing:2.5px;">Data Technology</p>
                  </td>
                </tr>
              </table>
            <tr>
          </tr>

          <!-- Saffron accent bar -->
          <tr>
            <td style="background:#FFB347;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#F9F7F7;padding:40px;border-left:1px solid #e8e2d4;border-right:1px solid #e8e2d4;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#133020;border-radius:0 0 16px 16px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <tr>
                    <img src="cid:lifewood-logo@lifewood" alt="Lifewood" height="22" style="display:block;height:22px;width:auto;opacity:0.5;" />
                  </td>
                  <td align="right">
                    <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:11px;color:#708E7C;">© ${new Date().getFullYear()} Lifewood Data Technology</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </table>
    </tr>
  </table>
</body>
</html>
`;

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { applicantName, applicantEmail, applicationId, position, newStatus, message } = req.body;

  if (!applicantEmail || !applicantName || !newStatus) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const statusColors = {
    Pending: { bg: '#f5eedb', border: '#FFB347', text: '#133020' },
    Shortlisted: { bg: '#e0f2fe', border: '#0ea5e9', text: '#0c4a6e' },
    Hired: { bg: '#dcfce7', border: '#046241', text: '#14532d' },
    Withdrawn: { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a' },
    'Not Selected': { bg: '#fef9c3', border: '#ca8a04', text: '#713f12' },
    Declined: { bg: '#fee2e2', border: '#dc2626', text: '#7f1d1d' },
  };
  const colors = statusColors[newStatus] || statusColors.Pending;

  const defaultMessages = {
    Pending:
      `Your application for the <strong>${position}</strong> role is currently under review. Our recruitment team will carefully assess your profile and get back to you with an update soon. Thank you for your patience.`,
    Shortlisted:
      `Great news! After reviewing your application for the <strong>${position}</strong> role, we are pleased to inform you that you have been shortlisted. Our team will be in touch shortly with the next steps in the selection process. Well done!`,
    Hired:
      `Congratulations! 🎉 We are thrilled to offer you the <strong>${position}</strong> position at Lifewood Data Technology. Your skills, experience, and dedication stood out throughout the process. Welcome to the team — we can't wait to have you on board!`,
    Withdrawn:
      `We have noted that your application for the <strong>${position}</strong> role has been withdrawn. If this was done in error or you wish to reapply in the future, please don't hesitate to reach out to us. We wish you all the best.`,
    'Not Selected':
      `Thank you for your interest in the <strong>${position}</strong> role at Lifewood Data Technology. After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs. We truly appreciate the time and effort you put into your application and encourage you to apply for future openings.`,
    Declined:
      `We regret to inform you that your application for the <strong>${position}</strong> role has been declined at this time. We appreciate your interest in Lifewood Data Technology and encourage you to keep an eye on future opportunities that may be a better fit. Thank you for considering us.`,
  };

  const defaultMsg = defaultMessages[newStatus] || defaultMessages.Pending;
  const emailBody = message
    ? `${defaultMsg}<br/><br/>${message}`
    : defaultMsg;

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: applicantEmail,
      subject: `Application Update: ${newStatus} — Lifewood Data Technology`,
      html: emailWrapper(`
        <p style="margin:0 0 4px;font-family:'Manrope',system-ui,sans-serif;font-size:11px;font-weight:800;color:#FFB347;text-transform:uppercase;letter-spacing:2px;">Application Update</p>
        <h2 style="margin:0 0 6px;font-family:'Manrope',system-ui,sans-serif;font-size:26px;font-weight:800;color:#133020;letter-spacing:-0.5px;">Hi ${applicantName},</h2>
        <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#708E7C;line-height:1.7;">There has been an update to your application at Lifewood Data Technology.</p>

        ${card(`
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe0;">
                ${label('Position')}
                <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;font-weight:700;color:#133020;">${position}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe0;">
                ${label('Application ID')}
                <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;font-weight:800;color:#046241;">${applicationId}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;">
                ${label('New Status')}
                <span style="display:inline-block;margin-top:6px;padding:4px 14px;background:${colors.bg};border:1.5px solid ${colors.border};border-radius:20px;font-family:'Manrope',system-ui,sans-serif;font-size:12px;font-weight:800;color:${colors.text};text-transform:uppercase;letter-spacing:1px;">${newStatus}</span>
              </td>
            </tr>
          </table>
        `)}

        ${card(`
          ${label('Message from Lifewood')}
          <p style="margin:8px 0 0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#133020;line-height:1.75;">${emailBody}</p>
        `)}

        <p style="margin:28px 0 0;font-family:'Manrope',system-ui,sans-serif;font-size:13px;color:#708E7C;">— The Lifewood Recruitment Team</p>
      `),
      attachments: [logoAttachment],
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Status update email error:', err);
    res.status(500).json({ error: 'Failed to send status update email.' });
  }
}