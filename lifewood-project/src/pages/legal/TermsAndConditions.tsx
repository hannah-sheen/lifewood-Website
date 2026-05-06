import { FileText } from 'lucide-react';
import LegalLayout from './LegalLayout';

export default function TermsAndConditions() {
  return (
    <LegalLayout icon={<FileText className="w-5 h-5" />} title="Terms & Conditions">
      <S title="1. Acceptance of Terms">
        <p>By accessing and using the Lifewood Data Technology website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.</p>
      </S>
      <S title="2. Use of the Website">
        <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
        <ul>
          <li>Use the site in any way that violates applicable local, national, or international laws or regulations</li>
          <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
          <li>Attempt to gain unauthorized access to any part of the website or its related systems</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
        </ul>
      </S>
      <S title="3. Intellectual Property">
        <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Lifewood Data Technology and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
      </S>
      <S title="4. Job Applications">
        <p>By submitting a job application through our website, you confirm that all information provided is accurate and complete. Lifewood Data Technology reserves the right to reject any application and is not obligated to provide reasons for its decisions. Submission of an application does not guarantee an interview or employment.</p>
      </S>
      <S title="5. Disclaimer of Warranties">
        <p>This website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
      </S>
      <S title="6. Limitation of Liability">
        <p>To the fullest extent permitted by law, Lifewood Data Technology shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.</p>
      </S>
      <S title="7. Third-Party Links">
        <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
      </S>
      <S title="8. Governing Law">
        <p>These Terms and Conditions are governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the relevant courts.</p>
      </S>
      <S title="9. Changes to These Terms">
        <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.</p>
      </S>
      <S title="10. Contact Us">
        <p>If you have any questions about these Terms and Conditions, contact us at <a href="mailto:lifewood@lifewood.com">lifewood@lifewood.com</a>.</p>
      </S>
    </LegalLayout>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2>{title}</h2>{children}</div>;
}
