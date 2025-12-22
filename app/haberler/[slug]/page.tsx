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
    // We return all found slugs, but if none found, return a placeholder
    // The client component (NewsDetailClient) will handle loading news from localStorage
    // for ANY slug, including ones not in admin-data.ts or added after build
    if (slugs.length === 0) {
      // Return a placeholder slug to ensure Next.js creates dynamic route structure
      return [{ slug: "placeholder" }];
    }
    
    // Return all found slugs from admin-data.ts
    // The client component will check localStorage for news with any slug,
    // allowing new news to work even if not in admin-data.ts at build time
    return slugs;
  } catch (error) {
    // Fallback: return placeholder to ensure dynamic routing works
    return [{ slug: "placeholder" }];
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
