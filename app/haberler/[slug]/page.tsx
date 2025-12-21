import NewsDetailClient from "./news-detail-client";

// Generate static params - return empty array to allow all dynamic routes
// All news will be client-side rendered via NewsDetailClient
// This prevents build errors when adminNewsData is not available at build time
export function generateStaticParams() {
  // Return empty array - Next.js will create a catch-all page
  // The client component will handle all news loading from localStorage and admin-data.ts
  return [];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
