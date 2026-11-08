// Renders a JSON-LD structured-data script. `data` is one schema.org object or
// an array of them. Safe to place in the document body.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe inside a <script type="application/ld+json">.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
