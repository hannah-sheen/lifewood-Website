# Nodemailer Setup Guide (with ENV)

## Install

```bash
npm install nodemailer dotenv
```

---

## .env

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=hannahsheen12@gmail.com
MAIL_PASS=ha@WL09615
MAIL_FROM="Hannah Sheen Obejero <hannahsheen12@gmail.com>"
```

> **Gmail:** Go to Google Account → Security → 2FA → [App Passwords](https://myaccount.google.com/apppasswords) and generate one.

---

## mailer.js (reusable transporter)

```js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465', // true only for port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify on startup (optional but recommended)
transporter.verify((err) => {
  if (err) console.error('Mail server connection failed:', err);
  else console.log('Mail server ready');
});

module.exports = transporter;
```

---

## Sending an Email

```js
const transporter = require('./mailer');

async function sendWelcomeEmail(toEmail, name) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: `Welcome, ${name}!`,
    html: `<h1>Hi ${name}, welcome aboard!</h1>`,
  });
}
```

---

## ENV per Environment

**.env.development**
```env
MAIL_HOST=smtp.ethereal.email   # fake SMTP, no real emails sent
MAIL_PORT=587
MAIL_USER=generated@ethereal.email
MAIL_PASS=generatedpassword
```

**.env.production**
```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USER=apikey
MAIL_PASS=your-sendgrid-api-key
MAIL_FROM="App Name <no-reply@yourdomain.com>"
```

> Generate Ethereal credentials at [ethereal.email](https://ethereal.email) — good for local dev/testing.

---

## .gitignore

```
.env
.env.*
!.env.example
```

## .env.example (commit this)

```env
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```

---

## Common Providers

| Provider  | `MAIL_HOST`             | `MAIL_PORT` | Notes                        |
|-----------|-------------------------|-------------|------------------------------|
| Gmail     | `smtp.gmail.com`        | 587         | Use App Password             |
| Outlook   | `smtp.office365.com`    | 587         |                              |
| SendGrid  | `smtp.sendgrid.net`     | 587         | `MAIL_USER` = `apikey`       |
| Mailgun   | `smtp.mailgun.org`      | 587         | Use SMTP credentials         |
| Ethereal  | `smtp.ethereal.email`   | 587         | Dev/testing only             |
