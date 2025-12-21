import NewsDetailClient from "./news-detail-client";

// Generate at least one static param to allow dynamic routes
// All news will be client-side rendered via NewsDetailClient
export function generateStaticParams() {
  // Return a placeholder to allow dynamic routing
  // The client component will handle all news loading
  return [{ slug: "news" }];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
