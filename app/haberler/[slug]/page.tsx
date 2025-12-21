import NewsDetailClient from "./news-detail-client";
import { adminNewsData } from "@/lib/admin-data";

// Generate static params - CRITICAL for Next.js static export
// This function runs at build time and creates static pages for all news slugs
// For new news added after build, the client component will load them from localStorage
export function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = [];
    
    // Get all slugs from adminNewsData (available at build time)
    if (adminNewsData && Array.isArray(adminNewsData)) {
      adminNewsData.forEach((news: any) => {
        if (news?.slug && news?.published !== false) {
          const cleanSlug = String(news.slug).trim();
          if (cleanSlug && cleanSlug.length > 0 && !cleanSlug.includes('"') && !cleanSlug.includes("'")) {
            slugs.push({ slug: cleanSlug });
          }
        }
      });
    }
    
    // CRITICAL: Always return at least one slug to enable dynamic routing in static export
    // Next.js requires at least one slug to create the dynamic route structure
    // If no slugs found, return a placeholder - client component will handle loading
    if (slugs.length === 0) {
      return [{ slug: "news" }];
    }
    
    return slugs;
  } catch (error) {
    // Fallback: return placeholder to ensure dynamic routing works
    return [{ slug: "news" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
