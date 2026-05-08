import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailWrapper = (content) => `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body style="background:#f5eedb;font-family:Arial;padding:40px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;">
    ${content}
    <hr style="margin:30px 0;border-color:#eee;" />
    <p style="color:#999;font-size:12px;">Lifewood Data Technology</p>
  </div>
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
    Pending: '#FFB347',
    Shortlisted: '#0ea5e9',
    Hired: '#046241',
    Withdrawn: '#3b82f6',
    'Not Selected': '#ca8a04',
    Declined: '#dc2626',
  };

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: applicantEmail,
      subject: `Application Update: ${newStatus} — Lifewood`,
      html: emailWrapper(`
        <h2 style="color:#133020;">Hi ${applicantName},</h2>
        <p>Your application for <strong>${position}</strong> (ID: ${applicationId}) has been updated.</p>
        <div style="display:inline-block;padding:8px 16px;background:${statusColors[newStatus] || '#FFB347'};color:#fff;border-radius:20px;margin:20px 0;">
          ${newStatus}
        </div>
        <p>${message || 'No additional message provided.'}</p>
      `),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Status update email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}