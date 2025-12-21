import NewsDetailClient from "./news-detail-client";
import { adminNewsData } from "@/lib/admin-data";

// Generate static params - CRITICAL for Next.js static export
// This function runs at build time and creates static pages for all news slugs
// IMPORTANT: For static export, Next.js requires generateStaticParams to return at least one slug
// to enable dynamic routing. The client component will handle loading news from localStorage
// for any slug, including new ones added after build.
export function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = [];
    
    // Get all slugs from adminNewsData (available at build time)
    if (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
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
    
    // CRITICAL: Always return at least one slug to enable dynamic routing in static export
    // Next.js requires at least one slug to create the dynamic route structure
    // We return all found slugs PLUS a catch-all placeholder to ensure any slug works
    // The client component (NewsDetailClient) will handle loading news from localStorage
    // for any slug, including ones not in admin-data.ts
    if (slugs.length === 0) {
      // Return a catch-all slug - client component will handle loading
      return [{ slug: "news" }];
    }
    
    // Return all found slugs from admin-data.ts
    // IMPORTANT: We also add a catch-all placeholder to ensure Next.js creates
    // the dynamic route structure that can handle any slug
    // The client component will check localStorage for news with slugs not in this list
    return [...slugs, { slug: "new" }];
  } catch (error) {
    // Fallback: return catch-all slug to ensure dynamic routing works
    console.error("Error in generateStaticParams:", error);
    return [{ slug: "news" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
