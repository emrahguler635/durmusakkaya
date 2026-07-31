"use client";
import { useState, useEffect } from "react";
import PublicationCard from "@/components/publication-card";
import { BookOpen } from "lucide-react";
import { adminPublicationsData } from "@/lib/admin-data";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<any[]>([]);
  
  useEffect(() => {
    let allPublications: any[] = [];
    
    if (adminPublicationsData && Array.isArray(adminPublicationsData) && adminPublicationsData.length > 0) {
      allPublications = adminPublicationsData;
    }
    
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem("admin_publications");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed) && parsed.length > 0) {
            const map = new Map();
            allPublications.forEach(p => map.set(p.slug || p.id, p));
            parsed.forEach((p: any) => {
              if (p.slug || p.id) {
                map.set(p.slug || p.id, p);
              }
            });
            allPublications = Array.from(map.values());
          }
        }
      } catch (e) {
        // Silently fail
      }
    }
    
    const sorted = [...allPublications]
      .filter((p: any) => p.published !== false)
      .sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    
    setPublications(sorted.slice(0, 12));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Akademik Yayınlar</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {(publications ?? []).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(publications ?? []).map((item) => (
                <PublicationCard key={item.id} {...item} createdAt={item.createdAt} imageUrl={item.imageUrl ?? undefined} images={item.images} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">Henüz akademik yayın bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
