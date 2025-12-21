import NewsDetailClient from "./news-detail-client";
import { adminNewsData } from "@/lib/admin-data";

// Generate static params from admin news data
// This allows Next.js to pre-render pages for all news items
export function generateStaticParams() {
  try {
    // Get slugs from adminNewsData
    const slugs: { slug: string }[] = [];
    
    if (adminNewsData && Array.isArray(adminNewsData)) {
      adminNewsData.forEach((news: any) => {
        if (news?.slug && news?.published !== false) {
          // Validate slug (no quotes, no special characters that break URLs)
          const cleanSlug = String(news.slug).trim();
          if (cleanSlug && !cleanSlug.includes('"') && !cleanSlug.includes("'")) {
            slugs.push({ slug: cleanSlug });
          }
        }
      });
    }
    
    // If no slugs found, return a placeholder to allow dynamic routing
    if (slugs.length === 0) {
      return [{ slug: "news" }];
    }
    
    return slugs;
  } catch (error) {
    // Fallback to placeholder if there's any error
    console.error("Error generating static params:", error);
    return [{ slug: "news" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
