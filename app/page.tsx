import { pageMetadata, productsSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { Products } from "@/components/home/Products";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { CaseStudy } from "@/components/home/CaseStudy";
import { Investors } from "@/components/home/Investors";
import { Faq } from "@/components/home/Faq";
import { Contact } from "@/components/home/Contact";

export const metadata = pageMetadata({
  title: "Crasoft | Software company behind the TFONE trucking apps",
  description:
    "Crasoft is a US software company founded in 2020. We build TFONE, a family of apps for trucking companies, and custom software for businesses and founders.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <JsonLd data={productsSchema()} />
      <Hero />
      <Proof />
      <Products />
      <Services />
      <Process />
      <CaseStudy />
      <Investors />
      <Faq />
      <Contact />
    </main>
  );
}
