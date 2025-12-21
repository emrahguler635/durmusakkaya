"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminNewsData } from "@/lib/admin-data";

export default function NewsDetailClient({ slug }: { slug: string }) {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get news from adminNewsData or localStorage only - no static fallback
    let allNews: any[] = [];
    
    // First, try to get from adminNewsData (from lib/admin-data.ts)
    if (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
      allNews = adminNewsData;
    }
    
    // Also check localStorage for latest data (client-side only)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const savedNews = localStorage.getItem("admin_news");
        if (savedNews) {
          const parsedNews = JSON.parse(savedNews);
          if (parsedNews && Array.isArray(parsedNews) && parsedNews.length > 0) {
            // Merge with existing news, prioritizing localStorage data
            const newsMap = new Map();
            allNews.forEach(n => newsMap.set(n.slug, n));
            parsedNews.forEach((n: any) => {
              if (n.slug) {
                newsMap.set(n.slug, n);
              }
            });
            allNews = Array.from(newsMap.values());
          }
        }
      } catch (e) {
        // Silently fail
      }
    }
    
    // Find news by slug
    const foundNews = allNews.find((n: any) => n.slug === slug && (n.published !== false));
    setNews(foundNews || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Yükleniyor...</p>
        </div>
      </div>
    );
  }

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

  // Format date safely
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
          {/* Ana Görsel */}
          {news.imageUrl ? (
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
              <Image src={getImagePath(news.imageUrl)} alt={news.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
              <Image src={getImagePath("/og-image.png")} alt={news.title} fill className="object-cover" />
            </div>
          )}
          
          {/* İçerik */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl text-gray-600 mb-6 font-medium">{news.summary}</p>
            <div className="whitespace-pre-wrap">{news.content}</div>
          </div>
          
          {/* Birden Fazla Görsel Galerisi */}
          {news.images && Array.isArray(news.images) && news.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.images.map((imgUrl: string, index: number) => (
                  <div key={index} className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group cursor-pointer">
                    <Image 
                      src={getImagePath(imgUrl)} 
                      alt={`${news.title} - Görsel ${index + 1}`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

