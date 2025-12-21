"use client";
import { useState, useEffect } from "react";
import NewsCard from "@/components/news-card";
import { Newspaper } from "lucide-react";
import { adminNewsData } from "@/lib/admin-data";

export default function NewsPage() {
  // Use admin data only - no static fallback
  const [news, setNews] = useState<any[]>([]);
  
  useEffect(() => {
    // Get news from adminNewsData or localStorage
    let allNews: any[] = [];
    
    if (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
      allNews = adminNewsData;
    }
    
    // Also check localStorage for latest data
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const savedNews = localStorage.getItem("admin_news");
        if (savedNews) {
          const parsedNews = JSON.parse(savedNews);
          if (parsedNews && Array.isArray(parsedNews) && parsedNews.length > 0) {
            allNews = parsedNews;
          }
        }
      } catch (e) {
        // Silently fail
      }
    }
    
    setNews(allNews.slice(0, 12));
  }, []);

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
