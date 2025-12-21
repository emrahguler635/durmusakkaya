import NewsDetailClient from "./news-detail-client";
import { adminNewsData } from "@/lib/admin-data";

// Generate static params from admin news data
// IMPORTANT: For static export, Next.js requires generateStaticParams to return at least one slug
// to enable dynamic routing. However, we can't predict all future slugs at build time.
// Solution: Return all known slugs from admin-data.ts, and the client component will
// handle loading news from localStorage for any slug (including new ones added after build).
export function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = [];
    
    // Get all slugs from adminNewsData
    if (adminNewsData && Array.isArray(adminNewsData)) {
      adminNewsData.forEach((news: any) => {
        if (news?.slug && news?.published !== false) {
          const cleanSlug = String(news.slug).trim();
          // Validate slug: must be non-empty and not contain quotes
          if (cleanSlug && cleanSlug.length > 0 && !cleanSlug.includes('"') && !cleanSlug.includes("'")) {
            slugs.push({ slug: cleanSlug });
          }
        }
      });
    }
    
    // CRITICAL: Always return at least one slug to enable dynamic routing
    // If no slugs found in admin-data.ts, return a catch-all placeholder
    // The client component (NewsDetailClient) will handle loading news from localStorage
    // for any slug, including ones not in admin-data.ts
    if (slugs.length === 0) {
      // Return a catch-all slug that will match any news slug
      return [{ slug: "news" }];
    }
    
    // Return all found slugs
    // Note: The client component will also check localStorage for news with slugs
    // not in this list, allowing new news to work even if not in admin-data.ts at build time
    return slugs;
  } catch (error) {
    // Fallback: return a catch-all slug to ensure dynamic routing works
    console.error("Error in generateStaticParams:", error);
    return [{ slug: "news" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
