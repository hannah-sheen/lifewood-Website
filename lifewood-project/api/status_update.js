import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const logoAttachment = {
  filename: 'lifewood-logo.avif',
  path: path.join(process.cwd(), 'src/assets/lifewood-paper-logo.avif'),
  cid: 'lifewood-logo@lifewood',
};

const label = (text) =>
  `<p style="margin:0 0 5px;font-family:'Manrope',system-ui,sans-serif;font-size:10px;font-weight:800;color:#708E7C;text-transform:uppercase;letter-spacing:2px;">${text}</p>`;

const card = (inner, bg = '#fff', border = '#e8e2d4') =>
  `<div style="background:${bg};border-radius:12px;border:1px solid ${border};padding:24px;margin-top:20px;">${inner}</div>`;

const emailWrapper = (content) => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" /></head>
<body style="margin:0;padding:0;background:#f5eedb;font-family:'Manrope',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5eedb;padding:40px 16px;"><td><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="background:#133020;border-radius:16px 16px 0 0;padding:28px 40px;">
        <table width="100%"><tr><td><img src="cid:lifewood-logo@lifewood" height="36" /></td>
        <td align="right"><p style="margin:0;color:#708E7C;font-size:10px;">Data Technology</p></td></tr></table>
      </td></tr>
      <tr><td style="background:#FFB347;height:3px;"></td></tr>
      <tr><td style="background:#F9F7F7;padding:40px;">${content}</td></tr>
      <tr><td style="background:#133020;border-radius:0 0 16px 16px;padding:24px 40px;">
        <table width="100%"><tr><td><img src="cid:lifewood-logo@lifewood" height="22" style="opacity:0.5;" /></td>
        <td align="right"><p style="margin:0;color:#708E7C;font-size:11px;">© ${new Date().getFullYear()} Lifewood Data Technology</p></td></tr></table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

export default async function handler(req, res) {
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

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: applicantEmail,
      subject: `Application Update: ${newStatus} — Lifewood`,
      html: emailWrapper(`
        <p style="margin:0 0 4px;font-family:'Manrope',system-ui,sans-serif;font-size:11px;font-weight:800;color:#FFB347;text-transform:uppercase;letter-spacing:2px;">Application Update</p>
        <h2 style="margin:0 0 6px;font-family:'Manrope',system-ui,sans-serif;font-size:26px;font-weight:800;color:#133020;letter-spacing:-0.5px;">Hi ${applicantName},</h2>
        <p style="margin:0;font-family:'Manrope',system-ui,sans-serif;font-size:14px;color:#708E7C;">Your application has been updated.</p>
        ${card(`
          ${label('Position')}<p style="margin:0 0 15px;font-weight:700;">${position}</p>
          ${label('Application ID')}<p style="margin:0 0 15px;font-weight:800;color:#046241;">${applicationId}</p>
          ${label('New Status')}
          <span style="display:inline-block;padding:4px 14px;background:${colors.bg};border:1.5px solid ${colors.border};border-radius:20px;font-size:12px;font-weight:800;color:${colors.text};">${newStatus}</span>
        `)}
        ${card(`<p style="margin:0;font-size:14px;color:#133020;">${message || 'No additional message provided.'}</p>`)}
        <p style="margin-top:28px;">— The Lifewood Recruitment Team</p>
      `),
      attachments: [logoAttachment],
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Status update email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}