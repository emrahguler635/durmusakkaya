import NewsDetailClient from "./news-detail-client";

// For static export, we need to generate at least some static params
// But we'll make the page work client-side for all slugs
export function generateStaticParams() {
  // Return static news slugs only - new news will work via client-side rendering
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
