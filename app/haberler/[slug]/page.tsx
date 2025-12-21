import NewsDetailClient from "./news-detail-client";

// Generate at least one static param to allow dynamic routes
// All news will be client-side rendered via NewsDetailClient
export function generateStaticParams() {
  // Return a placeholder slug to allow dynamic routing
  // The actual content will be loaded client-side
  return [{ slug: "placeholder" }];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
