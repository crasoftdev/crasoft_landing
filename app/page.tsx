import { faqSchema, pageMetadata, productsSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Investors } from "@/components/home/Investors";
import { Faq, FAQS } from "@/components/home/Faq";
import { Contact } from "@/components/home/Contact";

// Crasoft-only: the title, description and share card name no product.
export const metadata = pageMetadata({
  title: "Crasoft | Software Company for Custom Web and Mobile Apps",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <JsonLd data={productsSchema()} />
      <JsonLd data={faqSchema(FAQS)} />
      <Hero />
      <Products />
      <Services />
      <Process />
      <Investors />
      <Faq />
      <Contact />
    </main>
  );
}
