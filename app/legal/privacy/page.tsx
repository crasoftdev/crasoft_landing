import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalSection, legalName } from "@/components/legal/LegalPage";

const PATH = "/legal/privacy";

export const metadata = pageMetadata({
  title: "Privacy Policy: What Crasoft Collects and Why",
  description:
    "How Crasoft handles personal data: what we receive when you visit crasoftinc.com or email us, why we keep it, who we share it with, and how to have it deleted.",
  path: PATH,
});

const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path={PATH}
      intro={
        <p>
          This policy explains what personal data {legalName} receives through crasoftinc.com, and what we do with it.
          In short: the site has no forms, no cookies and no analytics. We only see what you choose to email us.
        </p>
      }
    >
      <LegalSection title="1. Who we are">
        <p>
          {legalName} is a software company in the {site.country}. You can reach us about this policy at {email}.
        </p>
        {/* TODO(content): US mailing address, once set in lib/site.ts. */}
      </LegalSection>

      <LegalSection title="2. What we collect">
        <ul>
          <li>
            <strong className="text-ink">Emails you send us.</strong> Your name, email address and anything you write,
            such as your company and what you need.
          </li>
          <li>
            <strong className="text-ink">Basic server logs.</strong> When you visit, our hosting provider records
            technical data such as your IP address, browser type, the page you asked for and the time.
          </li>
        </ul>
        <p>We don’t use cookies, analytics or advertising trackers on this site.</p>
      </LegalSection>

      <LegalSection title="3. How we use it">
        <p>
          We use your email to reply, set up a call and talk about working together. Server logs keep the site running
          and secure. We don’t sell or rent your personal data, and we don’t use it for advertising.
        </p>
      </LegalSection>

      <LegalSection title="4. Who we share it with">
        <p>
          Only the service providers that host this site and our email, and only so they can run those services for
          us. We may also share data if the law requires it.
        </p>
        {/* TODO(content): name the hosting provider and the email provider here. */}
      </LegalSection>

      <LegalSection title="5. How long we keep it">
        <p>
          We keep emails for as long as we need them for our conversation and any work that follows, then delete them.
          Server logs are kept for a short time by our hosting provider.
        </p>
      </LegalSection>

      <LegalSection title="6. Your choices">
        <p>
          You can ask us what personal data we have about you, and ask us to correct or delete it. Email {email} and
          we’ll reply within 30 days. Depending on where you live, such as California or the EU, you may have more
          rights under local law, and we’ll respect them.
        </p>
      </LegalSection>

      <LegalSection title="7. Children">
        <p>This site is not meant for children under 13, and we don’t knowingly collect their data.</p>
      </LegalSection>

      <LegalSection title="8. Our product websites">
        <p>
          This policy covers crasoftinc.com only. TFONE TMS, the TFONE Driver App and our other products have their
          own websites and privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes">
        <p>
          If we change this policy, we’ll post the new version here and update the date at the top. See also our{" "}
          <Link href="/legal/terms">Terms of Use</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
