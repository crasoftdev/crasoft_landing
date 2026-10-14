// The products Crasoft shows on the site. Each has its own website; we link out
// to it and never build product pages here.
export type Product = {
  slug: "tfone-tms" | "tfone-driver-app" | "tfone-navigation" | "tfsign" | "relay-tms-sync";
  name: string;
  kind: string; // short label above the name on its card
  line: string; // one short sentence, also the JSON-LD description
  applicationCategory: string; // schema.org SoftwareApplication category
  // TODO(content): the product website URL. "Visit website" links show once it is set.
  url: string | null;
};

export const products: Product[] = [
  {
    slug: "tfone-tms",
    name: "TFONE TMS",
    kind: "Web app",
    line: "One place to manage loads, dispatch, drivers, trucks, billing and documents.",
    applicationCategory: "BusinessApplication",
    url: "https://www.thetfone.com",
  },
  {
    slug: "tfone-driver-app",
    name: "TFONE Driver App",
    kind: "Mobile app",
    line: "Drivers see loads, update status and send documents from the road.",
    applicationCategory: "BusinessApplication",
    url: "https://www.thetfone.com",
  },
  {
    slug: "tfone-navigation",
    name: "TFONE Navigation",
    kind: "Mobile app · for anyone",
    line: "Plans routes based on your truck’s height and size.",
    applicationCategory: "TravelApplication",
    url: null,
  },
  {
    slug: "tfsign",
    name: "TFSign",
    kind: "E-signature",
    line: "Sign documents online, without printing or scanning.",
    applicationCategory: "BusinessApplication",
    url: null,
  },
  {
    slug: "relay-tms-sync",
    name: "Relay TMS Sync",
    kind: "Browser extension",
    line: "A Chrome extension that syncs loads from Relay into TFONE TMS.",
    applicationCategory: "BrowserApplication",
    url: null,
  },
];

export function getProduct(slug: Product["slug"]) {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}

// TODO(content): Google Play and App Store links for TFONE Navigation.
export const navigationStores: { label: string; href: string | null }[] = [
  { label: "Google Play", href: null },
  { label: "App Store", href: null },
];
