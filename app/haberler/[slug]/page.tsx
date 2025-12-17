import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { getImagePath } from "@/lib/image-path";

// Static data for GitHub Pages
const newsData = [
  {
    id: "1",
    title: "Yılın CEO'su Ödülü",
    summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
    content: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi. Bu ödül, yıl boyunca gösterdiği üstün liderlik ve başarılı yönetim anlayışının bir göstergesidir.",
    slug: "yilin-ceo-odu",
    published: true,
    imageUrl: null,
    createdAt: "2024-11-15T00:00:00.000Z",
    updatedAt: "2024-11-15T00:00:00.000Z"
  },
  {
    id: "2",
    title: "Yeni Stratejik Ortaklık",
    summary: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı.",
    content: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı. Bu ortaklık, şirketin gelecek hedeflerine ulaşmasında önemli bir adım olacaktır.",
    slug: "yeni-stratejik-ortaklik",
    published: true,
    imageUrl: null,
    createdAt: "2024-10-03T00:00:00.000Z",
    updatedAt: "2024-10-03T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Sürdürülebilirlik Zirvesi",
    summary: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi.",
    content: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi. Bu zirvede, çevre dostu uygulamalar ve sürdürülebilir kalkınma konuları ele alındı.",
    slug: "surdurulebilirlik-zirvesi",
    published: true,
    imageUrl: null,
    createdAt: "2024-09-22T00:00:00.000Z",
    updatedAt: "2024-09-22T00:00:00.000Z"
  }
];

export function generateStaticParams() {
  return newsData.map((news) => ({
    slug: news.slug,
  }));
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = newsData.find(n => n.slug === params.slug);

  if (!news) notFound();

  const formattedDate = new Date(news.createdAt).toLocaleDateString("tr-TR", {
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
