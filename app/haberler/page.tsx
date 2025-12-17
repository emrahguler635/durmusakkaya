import NewsCard from "@/components/news-card";
import { Newspaper } from "lucide-react";

// Static data for GitHub Pages
const news = [
  {
    id: "1",
    title: "Yılın CEO'su Ödülü",
    summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
    content: "",
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
    content: "",
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
    content: "",
    slug: "surdurulebilirlik-zirvesi",
    published: true,
    imageUrl: null,
    createdAt: "2024-09-22T00:00:00.000Z",
    updatedAt: "2024-09-22T00:00:00.000Z"
  }
];

export default function NewsPage() {

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Haberler</h1>
          <p className="text-blue-200 text-lg">Güncel gelişmeler ve duyurular</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {(news ?? []).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(news ?? []).map((item) => (
                <NewsCard key={item.id} {...item} createdAt={item.createdAt} imageUrl={item.imageUrl ?? undefined} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Newspaper className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">Henüz haber bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
