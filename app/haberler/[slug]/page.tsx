import NewsDetailClient from "./news-detail-client";
import { adminNewsData } from "@/lib/admin-data";

// Generate static params from admin news data
// This allows Next.js to pre-render pages for all news items
// Note: For new news added after build, client-side rendering will handle them
export function generateStaticParams() {
  try {
    // Get slugs from adminNewsData
    const slugs: { slug: string }[] = [];
    
    if (adminNewsData && Array.isArray(adminNewsData)) {
      adminNewsData.forEach((news: any) => {
        if (news?.slug && news?.published !== false) {
          // Validate slug (no quotes, no special characters that break URLs)
          const cleanSlug = String(news.slug).trim();
          if (cleanSlug && !cleanSlug.includes('"') && !cleanSlug.includes("'") && cleanSlug.length > 0) {
            slugs.push({ slug: cleanSlug });
          }
        }
      });
    }
    
    // Always return at least one placeholder to allow dynamic routing
    // Client-side component will handle all news loading (including new ones)
    if (slugs.length === 0) {
      return [{ slug: "news" }];
    }
    
    // Return all found slugs + a catch-all placeholder for new news
    // This ensures Next.js creates dynamic routes for all existing news
    // and allows client-side rendering for new news added after build
    return [...slugs, { slug: "new" }];
  } catch (error) {
    // Fallback to placeholder if there's any error
    console.error("Error generating static params:", error);
    return [{ slug: "news" }, { slug: "new" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
