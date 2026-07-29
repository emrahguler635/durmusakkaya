import ProjectDetailClient from "./project-detail-client";
import { adminProjectsData } from "@/lib/admin-data";

export function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = [];
    
    if (adminProjectsData && Array.isArray(adminProjectsData) && adminProjectsData.length > 0) {
      adminProjectsData.forEach((project: any) => {
        if (project?.slug && project?.published !== false) {
          const cleanSlug = String(project.slug).trim();
          if (cleanSlug && cleanSlug.length > 0 && !cleanSlug.includes('"') && !cleanSlug.includes("'")) {
            slugs.push({ slug: cleanSlug });
          }
        }
      });
    }
    
    if (slugs.length === 0) {
      return [{ slug: "placeholder" }];
    }
    
    return slugs;
  } catch (error) {
    return [{ slug: "placeholder" }];
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return <ProjectDetailClient slug={params.slug} />;
}
