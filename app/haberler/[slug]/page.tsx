import { adminNewsData } from "@/lib/admin-data";
import NewsDetailClient from "./news-detail-client";

// Static news data (fallback)
const staticNews = [
  {
    id: "1",
    title: "Yılın CEO'su Ödülü",
    slug: "yilin-ceo-odu",
    published: true,
  },
  {
    id: "2",
    title: "Yeni Stratejik Ortaklık",
    slug: "yeni-stratejik-ortaklik",
    published: true,
  },
  {
    id: "3",
    title: "Sürdürülebilirlik Zirvesi",
    slug: "surdurulebilirlik-zirvesi",
    published: true,
  },
  {
    id: "4",
    title: "Dijital Dönüşüm Projesi",
    slug: "dijital-donusum-projesi",
    published: true,
  }
];

// Generate static params for all news slugs (both static and admin data)
export function generateStaticParams() {
  try {
    // Get all unique slugs from both sources
    const staticSlugs = staticNews
      .filter((n: any) => n.published && n.slug && typeof n.slug === 'string')
      .map((n: any) => n.slug);
    
    const adminSlugs = (adminNewsData && Array.isArray(adminNewsData))
      ? adminNewsData
          .filter((n: any) => n.published !== false && n.slug && typeof n.slug === 'string' && n.slug.length > 0)
          .map((n: any) => n.slug)
      : [];
    
    // Combine and remove duplicates, filter out invalid slugs
    const allSlugs = [...staticSlugs, ...adminSlugs];
    const uniqueSlugs = Array.from(new Set(allSlugs.filter(slug => 
      slug && 
      typeof slug === 'string' && 
      slug.length > 0 &&
      !slug.includes('"') && // Remove slugs with quotes
      !slug.includes('>') && // Remove slugs with > character
      /^[a-z0-9-]+$/.test(slug) // Only allow lowercase letters, numbers, and hyphens
    )));
    
    return uniqueSlugs.map(slug => ({ slug }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Fallback to static news only
    return staticNews
      .filter((n: any) => n.published && n.slug)
      .map((n: any) => ({ slug: n.slug }));
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetailClient slug={params.slug} />;
}
