import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

// TEMPLATE — standard boilerplate, NOT legal advice. Have this reviewed by a
// lawyer and replace the placeholder company details in `siteConfig` before
// relying on it.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 8, 2026"
      intro={`This policy explains how ${siteConfig.name} ("we", "us") collects, uses, and protects information when you visit our website or work with us. By using our site, you agree to the practices described here.`}
    >
      <LegalSection heading="Information we collect">
        <p>
          We collect information you provide directly — such as your name, email address, phone
          number, and any details you include when you contact us or request a proposal. We also
          collect limited technical data automatically, including your IP address, browser type,
          device information, and pages visited.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Respond to your enquiries and provide the services you request.</li>
          <li>Operate, maintain, and improve our website and services.</li>
          <li>Send project updates and, where permitted, relevant communications.</li>
          <li>Meet our legal, accounting, and security obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          Our website may use cookies and similar technologies to understand how visitors use the
          site and to improve your experience. You can control cookies through your browser
          settings; disabling them may affect some functionality.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing your information">
        <p>
          We do not sell your personal information. We may share it with trusted service providers
          who help us operate our business (for example, hosting and analytics providers), and only
          to the extent needed to perform their work. We may also disclose information where required
          by law.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          We keep personal information only for as long as necessary to fulfil the purposes
          described in this policy, including any legal, accounting, or reporting requirements.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on your location, you may have the right to access, correct, or delete the
          personal information we hold about you, or to object to or restrict certain processing. To
          exercise these rights, contact us using the details below.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We take reasonable technical and organisational measures to protect your information.
          However, no method of transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links">
        <p>
          Our website may contain links to third-party sites. We are not responsible for the privacy
          practices or content of those sites and encourage you to review their policies.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date above
          reflects the most recent revision. Continued use of our site after changes constitutes
          acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about this policy? Contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-fg underline underline-offset-4">
            {siteConfig.email}
          </a>
          {siteConfig.location ? `, or write to us in ${siteConfig.location}.` : "."}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
