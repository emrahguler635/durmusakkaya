"use client";
import NewsDetailClient from "./news-detail-client";

// For Next.js static export, we need generateStaticParams to enable dynamic routing
// However, since we can't predict all future slugs at build time, we return a placeholder
// The client component will handle loading news from localStorage for any slug
export function generateStaticParams() {
  // Return a placeholder slug to ensure Next.js creates the dynamic route structure
  // The client component (NewsDetailClient) will handle loading news from localStorage
  // for ANY slug, including ones not in admin-data.ts or added after build
  return [{ slug: "placeholder" }];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
