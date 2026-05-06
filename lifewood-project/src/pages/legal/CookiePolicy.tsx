import { Cookie } from 'lucide-react';
import LegalLayout from './LegalLayout';

export default function CookiePolicy() {
  return (
    <LegalLayout icon={<Cookie className="w-5 h-5" />} title="Cookie Policy">
      <S title="1. What Are Cookies">
        <p>Cookies are small text files placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and enabling certain features to function properly.</p>
      </S>
      <S title="2. Types of Cookies We Use">
        <p><strong>Strictly Necessary Cookies</strong> — These cookies are essential for the website to function and cannot be disabled. They are usually set in response to actions you take such as setting your privacy preferences or filling in forms.</p>
        <p><strong>Analytics Cookies</strong> — These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information collected is aggregated and anonymous.</p>
        <p><strong>Functional Cookies</strong> — These cookies enable enhanced functionality and personalization, such as remembering your language preference or region.</p>
        <p><strong>Marketing Cookies</strong> — These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</p>
      </S>
      <S title="3. How We Use Cookies">
        <ul>
          <li>To keep you signed in during your session</li>
          <li>To remember your cookie consent preferences</li>
          <li>To understand how visitors interact with our website</li>
          <li>To improve site performance and user experience</li>
        </ul>
      </S>
      <S title="4. Third-Party Cookies">
        <p>Some cookies on our site are placed by third-party services such as analytics providers. These third parties have their own privacy policies and we have no control over their cookies. We encourage you to review their policies.</p>
      </S>
      <S title="5. Managing Cookies">
        <p>You can control and manage cookies in several ways. You can update your preferences at any time through our <a href="/cookie-settings">Cookie Settings</a> page. You can also configure your browser to refuse cookies or delete existing ones — refer to your browser's help documentation for instructions.</p>
        <p>Please note that disabling certain cookies may affect the functionality of our website.</p>
      </S>
      <S title="6. Changes to This Policy">
        <p>We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated date.</p>
      </S>
      <S title="7. Contact Us">
        <p>If you have questions about our use of cookies, contact us at <a href="mailto:lifewood@lifewood.com">lifewood@lifewood.com</a>.</p>
      </S>
    </LegalLayout>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2>{title}</h2>{children}</div>;
}
