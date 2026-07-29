"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminProjectsData } from "@/lib/admin-data";

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  useEffect(() => {
    let allProjects: any[] = [];
    
    if (adminProjectsData && Array.isArray(adminProjectsData) && adminProjectsData.length > 0) {
      allProjects = adminProjectsData;
    }
    
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const savedProjects = localStorage.getItem("admin_projects");
        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          if (parsedProjects && Array.isArray(parsedProjects) && parsedProjects.length > 0) {
            const projectsMap = new Map();
            allProjects.forEach(p => projectsMap.set(p.slug, p));
            parsedProjects.forEach((p: any) => {
              if (p.slug) {
                projectsMap.set(p.slug, p);
              }
            });
            allProjects = Array.from(projectsMap.values());
          }
        }
      } catch (e) {
        // Silently fail
      }
    }
    
    const foundProject = allProjects.find((p: any) => p.slug === slug && (p.published !== false));
    setProject(foundProject || null);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project?.images || project.images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project?.images]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Proje bulunamadı</p>
          <Link href="/projeler" className="text-blue-600 hover:text-blue-800">
            Projelere Dön
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(project.createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    year: "numeric", month: "long", day: "numeric"
  });

  const coverImage = project.imageUrl || (project.images && project.images.length > 0 ? project.images[0] : null);
  
  const galleryImages = project.images && Array.isArray(project.images) 
    ? project.images.filter((img: string, index: number) => {
        if (project.imageUrl && img === project.imageUrl) return false;
        if (!project.imageUrl && index === 0) return false;
        return true;
      })
    : [];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/projeler" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Projelere Dön
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex items-center gap-2 text-blue-200">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {coverImage ? (
            <div 
              className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-8 shadow-lg cursor-pointer group"
              onClick={() => {
                if (project.images && project.images.length > 0) {
                  const index = project.images.indexOf(coverImage);
                  if (index !== -1) {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }
                }
              }}
            >
              <Image 
                src={getImagePath(coverImage)} 
                alt={project.title} 
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
              <Image src={getImagePath("/og-image.png")} alt={project.title} fill className="object-cover" />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl text-gray-600 mb-6 font-medium">{project.summary}</p>
            <div className="whitespace-pre-wrap">{project.content}</div>
          </div>
          
          {galleryImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
              <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
                {galleryImages.map((imgUrl: string, index: number) => {
                  const originalIndex = project.images.indexOf(imgUrl);
                  return (
                    <div 
                      key={index} 
                      className="relative w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] aspect-video bg-gray-100 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0"
                      onClick={() => {
                        setLightboxIndex(originalIndex);
                        setLightboxOpen(true);
                      }}
                    >
                      <Image 
                        src={getImagePath(imgUrl)} 
                        alt={`${project.title} - Görsel ${index + 1}`} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {lightboxOpen && project.images && project.images.length > 0 && (
            <div 
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Kapat"
              >
                <X size={32} />
              </button>
              
              {project.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Önceki"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              
              <div 
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getImagePath(project.images[lightboxIndex])}
                    alt={`${project.title} - Görsel ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                    {lightboxIndex + 1} / {project.images.length}
                  </div>
                )}
              </div>
              
              {project.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Sonraki"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
