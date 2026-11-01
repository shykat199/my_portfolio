import type { Graph, Thing } from "schema-dts";

export function JsonLd({ nodes }: { nodes: Thing[] }) {
  const graph: Graph = { "@context": "https://schema.org", "@graph": nodes };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
