import { Shield } from 'lucide-react';
import LegalLayout from './LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout icon={<Shield className="w-5 h-5" />} title="Privacy Policy">
      <S title="1. Information We Collect">
        <p>We collect information you provide directly to us when you submit a job application, fill out a contact form, or communicate with us. This includes:</p>
        <ul>
          <li>Personal identifiers: full name, email address, phone number, date of birth, gender, and home address</li>
          <li>Professional information: resume, work history, and applied positions</li>
          <li>Communications: messages sent through our contact form</li>
          <li>Technical data: IP address, browser type, pages visited, and cookies</li>
        </ul>
      </S>
      <S title="2. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and manage your job applications</li>
          <li>Communicate with you about your application status</li>
          <li>Respond to your inquiries and contact form submissions</li>
          <li>Improve and maintain our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </S>
      <S title="3. Data Retention">
        <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy. Application data is retained for up to 2 years after the conclusion of a recruitment process. Contact form submissions are retained for up to 1 year.</p>
      </S>
      <S title="4. Sharing Your Information">
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, subject to confidentiality agreements. We may also disclose information when required by law.</p>
      </S>
      <S title="5. Your Rights">
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li>Right to access the personal data we hold about you</li>
          <li>Right to request correction of inaccurate data</li>
          <li>Right to request deletion of your data</li>
          <li>Right to object to or restrict processing</li>
          <li>Right to data portability</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:lifewood@lifewood.com">lifewood@lifewood.com</a>.</p>
      </S>
      <S title="6. Security">
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
      </S>
      <S title="7. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>
      </S>
      <S title="8. Contact Us">
        <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:lifewood@lifewood.com">lifewood@lifewood.com</a> or by phone at +41 123 456 123.</p>
      </S>
    </LegalLayout>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2>{title}</h2>{children}</div>;
}
