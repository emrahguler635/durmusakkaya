import NewsCard from "@/components/news-card";
import { Newspaper } from "lucide-react";
import { getNewsForPage, allNews } from "@/lib/news-data";

// Get first 12 news for display
const news = getNewsForPage();

export default function NewsPage() {

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Haberler</h1>
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
