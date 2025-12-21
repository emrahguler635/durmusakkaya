import { adminNewsData } from "@/lib/admin-data";
import NewsDetailClient from "./news-detail-client";

// Generate static params from adminNewsData
// This ensures all news items have static pages generated
export function generateStaticParams() {
  try {
    if (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
      const slugs = adminNewsData
        .filter((n: any) => n.published !== false && n.slug && typeof n.slug === 'string' && n.slug.length > 0)
        .map((n: any) => n.slug)
        .filter((slug: string) => /^[a-z0-9-]+$/.test(slug)); // Only valid slugs
      
      return slugs.map(slug => ({ slug }));
    }
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
  }
  
  // Return empty array if no admin data
  return [];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
