"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminNewsData } from "@/lib/admin-data";

export default function NewsDetailClient({ slug }: { slug: string }) {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
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

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!news?.images || news.images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? news.images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === news.images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, news?.images]);

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

  // Determine cover image
  const coverImage = news.imageUrl || (news.images && news.images.length > 0 ? news.images[0] : null);
  
  // Filter gallery images (exclude cover image if it's in images array)
  const galleryImages = news.images && Array.isArray(news.images) 
    ? news.images.filter((img: string, index: number) => {
        // If imageUrl exists and matches this image, exclude it from gallery
        if (news.imageUrl && img === news.imageUrl) return false;
        // If no imageUrl but this is the first image (used as cover), exclude it
        if (!news.imageUrl && index === 0) return false;
        return true;
      })
    : [];

  // Helper function to open lightbox with correct index
  const openLightboxWithImage = (imgUrl: string) => {
    if (!news.images || news.images.length === 0) return;
    const index = news.images.indexOf(imgUrl);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

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
          {/* Kapak Resmi */}
          {coverImage ? (
            <div 
              className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-8 shadow-lg cursor-pointer group"
              onClick={() => {
                if (news.images && news.images.length > 0) {
                  const index = news.images.indexOf(coverImage);
                  if (index !== -1) {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }
                }
              }}
            >
              <Image 
                src={getImagePath(coverImage)} 
                alt={news.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Büyütmek için tıklayın
                </span>
              </div>
            </div>
          ) : (
            <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image src={getImagePath("/og-image.png")} alt={news.title} fill className="object-cover" />
            </div>
          )}
          
          {/* İçerik */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl text-gray-600 mb-6 font-medium">{news.summary}</p>
            <div className="whitespace-pre-wrap">{news.content}</div>
          </div>
          
          {/* Galeri (Kapak resmi hariç diğer görseller) */}
          {galleryImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryImages.map((imgUrl: string, index: number) => {
                  // Find original index in news.images array for lightbox
                  const originalIndex = news.images.indexOf(imgUrl);
                  return (
                    <div 
                      key={index} 
                      className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
                      onClick={() => {
                        setLightboxIndex(originalIndex);
                        setLightboxOpen(true);
                      }}
                    >
                      <Image 
                        src={getImagePath(imgUrl)} 
                        alt={`${news.title} - Görsel ${index + 1}`} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Lightbox Modal */}
          {lightboxOpen && news.images && news.images.length > 0 && (
            <div 
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Kapat"
              >
                <X size={32} />
              </button>
              
              {/* Previous Button */}
              {news.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === 0 ? news.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Önceki"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              
              {/* Image Container */}
              <div 
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getImagePath(news.images[lightboxIndex])}
                    alt={`${news.title} - Görsel ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Image Counter */}
                {news.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                    {lightboxIndex + 1} / {news.images.length}
                  </div>
                )}
              </div>
              
              {/* Next Button */}
              {news.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === news.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Sonraki"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>
          )}
          
          {/* Keyboard Navigation */}
          {lightboxOpen && news.images && news.images.length > 1 && (
            <div
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  setLightboxIndex((prev) => (prev === 0 ? news.images.length - 1 : prev - 1));
                } else if (e.key === 'ArrowRight') {
                  setLightboxIndex((prev) => (prev === news.images.length - 1 ? 0 : prev + 1));
                } else if (e.key === 'Escape') {
                  setLightboxOpen(false);
                }
              }}
              tabIndex={0}
              className="outline-none"
            />
          )}
        </div>
      </section>
    </div>
  );
}

