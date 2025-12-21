import NewsDetailClient from "./news-detail-client";

// No static params - all news will be managed via admin panel
// The client component reads from localStorage and admin-data.ts
export function generateStaticParams() {
  // Return empty array - all news will be client-side rendered
  return [];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
