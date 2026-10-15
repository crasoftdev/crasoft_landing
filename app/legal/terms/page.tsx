import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalSection, legalName } from "@/components/legal/LegalPage";

const PATH = "/legal/terms";

export const metadata = pageMetadata({
  title: "Terms of Use: The Rules for Using crasoftinc.com",
  description:
    "The terms for using crasoftinc.com, the Crasoft company website: what the content is for, links to TFONE product sites, who owns the content, and our liability.",
  path: PATH,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path={PATH}
      intro={
        <p>
          These terms apply to your use of crasoftinc.com, the website of {legalName}. By using the site, you agree to
          them. If you don’t agree, please don’t use the site.
        </p>
      }
    >
      <LegalSection title="1. What this site is for">
        <p>
          The site tells you about {legalName}, our products and our services. It is general information, not an
          offer. Our products are covered by their own terms on their own websites, and custom work is covered by a
          separate written agreement.
        </p>
      </LegalSection>

      <LegalSection title="2. Our content">
        <p>
          The text, design, logos and product names on this site, including TFONE, belong to {legalName}. You’re
          welcome to read the site and share links to it. Please ask us before copying or republishing our content.
          The product demos on the site use sample data, not real customer data.
        </p>
      </LegalSection>

      <LegalSection title="3. Using the site fairly">
        <p>
          Don’t attack the site, overload it, try to break into it, or use it for anything illegal. Reading and
          indexing the site, including by search engines and AI tools, is fine.
        </p>
      </LegalSection>

      <LegalSection title="4. Links to other sites">
        <p>
          The site links to our product websites and to other sites. Each of those has its own terms and privacy
          policy.
        </p>
      </LegalSection>

      <LegalSection title="5. No warranties">
        <p>
          We work to keep the site accurate and available, but we provide it “as is”, without warranties of any kind,
          to the extent the law allows.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of liability">
        <p>
          To the extent the law allows, {legalName} is not liable for any indirect or consequential loss that comes
          from using this site.
        </p>
      </LegalSection>

      {/* TODO(content): governing law: the US state whose laws apply to these terms. */}

      <LegalSection title="7. Changes and contact">
        <p>
          If we change these terms, we’ll post the new version here and update the date at the top. Questions? Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. See also our{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
