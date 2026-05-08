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
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#133020;border-radius:16px 16px 0 0;padding:28px 40px;">
          <table width="100%"><tr>
            <td><h1 style="margin:0;color:#FFB347;font-size:24px;">Lifewood</h1></td>
            <td align="right"><p style="margin:0;color:#708E7C;font-size:10px;">Data Technology</p></td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#FFB347;height:3px;"></td></tr>
        <tr><td style="background:#F9F7F7;padding:40px;">${content}</td></tr>
        <tr><td style="background:#133020;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="margin:0;color:#708E7C;font-size:11px;">© ${new Date().getFullYear()} Lifewood Data Technology</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: emailWrapper(`
        <h2 style="margin:0 0 10px;color:#133020;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `),
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: `We received your message, ${name}!`,
      html: emailWrapper(`
        <h2 style="margin:0 0 10px;color:#133020;">Thank you, ${name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>— The Lifewood Team</p>
      `),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}