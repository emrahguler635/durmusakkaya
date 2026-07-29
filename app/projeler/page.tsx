"use client";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/project-card";
import { Briefcase } from "lucide-react";
import { adminProjectsData } from "@/lib/admin-data";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  
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
            allProjects.forEach(p => projectsMap.set(p.slug || p.id, p));
            parsedProjects.forEach((p: any) => {
              if (p.slug || p.id) {
                projectsMap.set(p.slug || p.id, p);
              }
            });
            allProjects = Array.from(projectsMap.values());
          }
        }
      } catch (e) {
        // Silently fail
      }
    }
    
    const sortedProjects = [...allProjects]
      .filter((p: any) => p.published !== false)
      .sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    
    setProjects(sortedProjects.slice(0, 12));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Projeler</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {(projects ?? []).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(projects ?? []).map((item) => (
                <ProjectCard key={item.id} {...item} createdAt={item.createdAt} imageUrl={item.imageUrl ?? undefined} images={item.images} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Briefcase className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">Henüz proje bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
