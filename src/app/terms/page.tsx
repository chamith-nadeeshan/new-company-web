import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

// TEMPLATE — standard boilerplate, NOT legal advice. Have this reviewed by a
// lawyer and replace the placeholder company details in `siteConfig` before
// relying on it.
export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${siteConfig.name}'s website and services.`,
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 8, 2026"
      intro={`These terms govern your use of the ${siteConfig.name} website and the services we provide. By accessing our site or engaging us, you agree to these terms.`}
    >
      <LegalSection heading="Use of our website">
        <p>
          You may use our website for lawful purposes only. You agree not to misuse the site,
          interfere with its operation, or attempt to access it in any way other than through the
          interface we provide.
        </p>
      </LegalSection>

      <LegalSection heading="Services">
        <p>
          The scope, timeline, deliverables, and fees for any engagement are defined in a separate
          written proposal or agreement. Where those documents conflict with these terms, the signed
          agreement for that engagement prevails.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          All content on this website — including text, graphics, logos, and code — is owned by{" "}
          {siteConfig.name} or its licensors and is protected by applicable intellectual property
          laws. Ownership of project deliverables transfers to the client as set out in the relevant
          engagement agreement, typically on final payment.
        </p>
      </LegalSection>

      <LegalSection heading="Client responsibilities">
        <p>
          For project work, you agree to provide timely access to the materials, approvals, and
          information we need, and to ensure that any content you supply does not infringe the rights
          of others.
        </p>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Fees and payment schedules are set out in each engagement agreement. Unless stated
          otherwise, invoices are due on the terms specified there, and late payments may pause work
          on the project.
        </p>
      </LegalSection>

      <LegalSection heading="Warranties and disclaimers">
        <p>
          Our website and its content are provided &ldquo;as is&rdquo; without warranties of any
          kind, whether express or implied, to the fullest extent permitted by law. We do not warrant
          that the site will be uninterrupted, error-free, or free of harmful components.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the maximum extent permitted by law, {siteConfig.name} will not be liable for any
          indirect, incidental, or consequential damages arising from your use of the website. Our
          total liability for any engagement is limited as set out in the relevant agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Termination">
        <p>
          We may suspend or restrict access to the website at any time if we reasonably believe these
          terms have been breached. Termination of project engagements is governed by the relevant
          agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of{" "}
          {siteConfig.location ? siteConfig.location : "the jurisdiction in which we operate"}, and any
          disputes will be subject to the exclusive jurisdiction of its courts.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms from time to time. The &ldquo;last updated&rdquo; date above
          reflects the most recent revision. Continued use of our site after changes constitutes
          acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about these terms? Contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-fg underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
