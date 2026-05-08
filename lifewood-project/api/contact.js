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
                <tr>
              </table>
            </td>
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
                  <td>
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

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Send email to admin
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      html: emailWrapper(`
        <p style="margin:0 0 4px;font-family:'Manrope',system-ui,sans-serif;font-size:11px;font-weight:800;color:#FFB347;text-transform:uppercase;letter-spacing:2px;">Incoming Message</p>
        <h2 style="margin:0 0 6px;font-family:'Manrope',system-ui,sans-serif;font-size:26px;font-weight:800;color:#133020;letter-spacing:-0.5px;">New Contact Message</h2>
        <p style="margin:0 0 4px;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#708E7C;">Someone reached out via the Lifewood website.</p>

        ${card(`
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe0;">
              ${label('Full Name')}
              <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;font-weight:700;color:#133020;">${name}</p>
            </td></tr>
            <tr><td style="padding:10px 0;">
              ${label('Email Address')}
              <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;font-weight:700;color:#046241;">${email}</p>
            </td></tr>
          </table>
        `)}

        ${card(`
          ${label('Message')}
          <p style="margin:8px 0 0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#133020;line-height:1.75;">${message.replace(/\n/g, '<br>')}</p>
        `)}
      `),
      attachments: [logoAttachment],
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: `We received your message, ${name}!`,
      html: emailWrapper(`
        <p style="margin:0 0 4px;font-family:'Manrope',system-ui,sans-serif;font-size:11px;font-weight:800;color:#FFB347;text-transform:uppercase;letter-spacing:2px;">Message Received</p>
        <h2 style="margin:0 0 6px;font-family:'Manrope',system-ui,sans-serif;font-size:26px;font-weight:800;color:#133020;letter-spacing:-0.5px;">Thank you, ${name}!</h2>
        <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#708E7C;line-height:1.7;">We've received your message and will get back to you as soon as possible.</p>

        ${card(`
          ${label('Your Message')}
          <p style="margin:8px 0 0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#133020;line-height:1.75;">${message.replace(/\n/g, '<br>')}</p>
        `)}

        <p style="margin:28px 0 0;font-family:'Manrope',system-ui,sans-serif;font-size:13px;color:#708E7C;">— The Lifewood Team</p>
      `),
      attachments: [logoAttachment],
    });

    console.log(`Contact email processed for ${email}`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ error: err.message || 'Failed to send email' });
  }
}