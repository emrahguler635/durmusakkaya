import NewsDetailClient from "./news-detail-client";

// Generate static params for static news only
// New news will work via client-side rendering in NewsDetailClient
// The client component reads from localStorage and admin-data.ts
export function generateStaticParams() {
  return [
    { slug: "yilin-ceo-odu" },
    { slug: "yeni-stratejik-ortaklik" },
    { slug: "surdurulebilirlik-zirvesi" },
    { slug: "dijital-donusum-projesi" }
  ];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
