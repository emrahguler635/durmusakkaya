import NewsDetailClient from "./news-detail-client";
import { adminNewsData } from "@/lib/admin-data";

// Generate static params from admin news data
// This allows Next.js to pre-render pages for all news items
// IMPORTANT: For static export, we need to return at least one slug to enable dynamic routing
// Client-side component (NewsDetailClient) will handle loading all news, including new ones
export function generateStaticParams() {
  try {
    // Get slugs from adminNewsData
    const slugs: { slug: string }[] = [];
    
    if (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
      adminNewsData.forEach((news: any) => {
        if (news?.slug && news?.published !== false) {
          // Validate slug (no quotes, no special characters that break URLs)
          const cleanSlug = String(news.slug).trim();
          if (cleanSlug && cleanSlug.length > 0 && !cleanSlug.includes('"') && !cleanSlug.includes("'")) {
            slugs.push({ slug: cleanSlug });
          }
        }
      });
    }
    
    // CRITICAL: Always return at least one slug to enable dynamic routing in static export
    // If no slugs found, return a placeholder
    // Client-side component will handle loading all news (including new ones from localStorage)
    if (slugs.length === 0) {
      return [{ slug: "placeholder" }];
    }
    
    // Return all found slugs
    // Note: New news added after build will be handled by client-side component
    return slugs;
  } catch (error) {
    // Fallback to placeholder if there's any error
    // This ensures Next.js can still create dynamic routes
    return [{ slug: "placeholder" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
