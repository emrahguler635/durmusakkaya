import PublicationDetailClient from "./publication-detail-client";
import { adminPublicationsData } from "@/lib/admin-data";

export function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = [];
    
    if (adminPublicationsData && Array.isArray(adminPublicationsData) && adminPublicationsData.length > 0) {
      adminPublicationsData.forEach((item: any) => {
        if (item?.slug && item?.published !== false) {
          const cleanSlug = String(item.slug).trim();
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

export default function PublicationDetailPage({ params }: { params: { slug: string } }) {
  return <PublicationDetailClient slug={params.slug} />;
}
