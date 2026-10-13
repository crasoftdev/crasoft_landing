// Every company fact used in more than one place. Metadata, JSON-LD, the footer
// and About read from here, so the facts stay the same everywhere.
export const site = {
  name: "Crasoft",
  url: "https://crasoftinc.com",
  slogan: "Crafted software.",
  description:
    "We craft software with precise parts, a perfect fit, and care in each detail, so it meets your business's everyday needs without compromise.",
  type: "Software company",
  country: "United States",
  foundingYear: 2020,
  email: "info@crasoftinc.com",
  logo: "/crasoft-logo.png",
  // TODO(content): phone number, if it should be on the site.
  phone: null,
  // TODO(content): US street address (street, city, state, ZIP).
  address: null,
  // TODO(content): official profile URLs (LinkedIn, X, GitHub, Crunchbase).
  sameAs: [] as string[],
} as const;

// Navbar and footer links. Home sections for now; inner pages join as they ship.
// TODO(content): add Careers, Privacy and Terms once those pages exist.
export const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const contactHref = "/#contact";
