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

  const { applicantName, applicantEmail, positions, applicationIds } = req.body;

  if (!applicantEmail || !applicantName) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: applicantEmail,
      subject: `Application Received — Lifewood`,
      html: emailWrapper(`
        <h2 style="color:#133020;">Hi ${applicantName},</h2>
        <p>Thank you for applying to Lifewood!</p>
        <p>We've received your application${positions.length > 1 ? 's' : ''}:</p>
        <ul>
          ${positions.map((pos, i) => `<li><strong>${pos}</strong> (ID: ${applicationIds[i]}) - <span style="color:#FFB347;">Pending</span></li>`).join('')}
        </ul>
        <p>Our team will review your application and get back to you soon.</p>
        <p>— The Lifewood Team</p>
      `),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Confirmation email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}