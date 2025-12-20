import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminNewsData } from "@/lib/admin-data";
import NewsDetailClient from "./news-detail-client";

// Static news data (fallback)
const staticNews = [
  {
    id: "1",
    title: "Yılın CEO'su Ödülü",
    summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
    content: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi. Bu ödül, yıl boyunca gösterdiği üstün liderlik ve başarılı yönetim anlayışının bir göstergesidir.",
    slug: "yilin-ceo-odu",
    published: true,
    imageUrl: "/haber1.jpg",
    createdAt: "2024-11-15T00:00:00.000Z"
  },
  {
    id: "2",
    title: "Yeni Stratejik Ortaklık",
    summary: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı.",
    content: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı. Bu ortaklık, şirketin gelecek hedeflerine ulaşmasında önemli bir adım olacaktır.",
    slug: "yeni-stratejik-ortaklik",
    published: true,
    imageUrl: "/haber2.jpg",
    createdAt: "2024-10-03T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Sürdürülebilirlik Zirvesi",
    summary: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi.",
    content: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi. Bu zirvede, çevre dostu uygulamalar ve sürdürülebilir kalkınma konuları ele alındı.",
    slug: "surdurulebilirlik-zirvesi",
    published: true,
    imageUrl: "/haber3.jpg",
    createdAt: "2024-09-22T00:00:00.000Z"
  },
  {
    id: "4",
    title: "Dijital Dönüşüm Projesi",
    summary: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı.",
    content: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı. Bu proje ile şirket, teknolojik altyapısını güçlendirerek operasyonel verimliliği artırmayı hedefliyor.",
    slug: "dijital-donusum-projesi",
    published: true,
    imageUrl: "/haber4.jpg",
    createdAt: "2024-08-15T00:00:00.000Z"
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
          .filter((n: any) => n.published !== false && n.slug && typeof n.slug === 'string')
          .map((n: any) => n.slug)
      : [];
    
    // Combine and remove duplicates
    const allSlugs = [...staticSlugs, ...adminSlugs];
    const uniqueSlugs = Array.from(new Set(allSlugs.filter(slug => slug && typeof slug === 'string')));
    
    console.log('generateStaticParams - Static slugs:', staticSlugs);
    console.log('generateStaticParams - Admin slugs:', adminSlugs);
    console.log('generateStaticParams - All unique slugs:', uniqueSlugs);
    
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
