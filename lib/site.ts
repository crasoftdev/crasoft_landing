// Every company fact used in more than one place. Metadata, JSON-LD, the footer
// and About read from here, so the facts stay the same everywhere.
export const site = {
  name: "Crasoft",
  url: "https://crasoftinc.com",
  slogan: "Crafted software.",
  // The hero headline, also on the social share image.
  headline: "We turn everyday problems into simple software.",
  // The one-sentence answer to "What is Crasoft?": the meta description, the
  // Organization JSON-LD and llms.txt all say this. Keep it Crasoft-only.
  description:
    "Crasoft is a US software company founded in 2020. We design and build our own software products, plus custom web and mobile apps for businesses and founders.",
  type: "Software company",
  country: "United States",
  countryCode: "US",
  foundingYear: 2020,
  email: "info@crasoftinc.com",
  // TODO(content): registered legal name (e.g. with "Inc."), used in Privacy and Terms.
  legalName: null as string | null,
  logo: "/crasoft-logo.png",
  // TODO(content): phone number, if it should be on the site.
  phone: null,
  // TODO(content): US street address (street, city, state, ZIP).
  address: null,
  // TODO(content): official profile URLs (LinkedIn, X, GitHub, Crunchbase).
  sameAs: [] as string[],
} as const;

// Navbar and footer links. Home sections for now; inner pages join as they ship.
// TODO(content): add Careers once that page exists.
export const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const contactHref = "/#contact";

// Date the Privacy Policy and Terms of Use took effect. Change it with any edit to them.
export const legalEffectiveDate = "2026-10-15";

// Footer bottom row.
export const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
] as const;
