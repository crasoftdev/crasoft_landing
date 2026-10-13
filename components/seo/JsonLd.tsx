import type { Thing, WithContext } from "schema-dts";

// Renders a typed schema-dts object as JSON-LD. `<` is escaped so the JSON can
// never close the script tag early.
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
