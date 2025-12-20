import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminNewsData } from "@/lib/admin-data";

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
  // Use admin data if available, otherwise use static data
  const allNews = (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) 
    ? adminNewsData 
    : staticNews;
  
  // Get all unique slugs from both sources
  const allSlugs = [
    ...staticNews.filter((n: any) => n.published).map((n: any) => n.slug),
    ...(adminNewsData && Array.isArray(adminNewsData) ? adminNewsData.filter((n: any) => n.published && n.slug).map((n: any) => n.slug) : [])
  ];
  
  // Remove duplicates
  const uniqueSlugs = Array.from(new Set(allSlugs));
  
  return uniqueSlugs.map(slug => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Handle async params (Next.js 15)
  const resolvedParams = await Promise.resolve(params);
  
  // Use admin data if available, otherwise use static data
  const allNews = (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) 
    ? adminNewsData 
    : staticNews;
  
  const news = allNews.find((n: any) => n.slug === resolvedParams.slug && (n.published !== false));

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Haber bulunamadı</p>
          <Link href="/haberler" className="text-blue-600 hover:text-blue-800">
            Haberlere Dön
          </Link>
        </div>
      </div>
    );
  }

  // Format date safely for static export
  const date = new Date(news.createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/haberler" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Haberlere Dön
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{news.title}</h1>
          <div className="flex items-center gap-2 text-blue-200">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {news.imageUrl ? (
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
              <Image src={getImagePath(news.imageUrl)} alt={news.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
              <Image src={getImagePath("/og-image.png")} alt={news.title} fill className="object-cover" />
            </div>
          )}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl text-gray-600 mb-6 font-medium">{news.summary}</p>
            <div className="whitespace-pre-wrap">{news.content}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
