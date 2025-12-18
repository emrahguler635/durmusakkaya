// Simplified news data for static build
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  slug: string;
  published: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt?: string;
}

// Static news data (no localStorage)
const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "Yılın CEO'su Ödülü",
    summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
    content: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi. Bu ödül, yıl boyunca gösterdiği üstün liderlik ve başarılı yönetim anlayışının bir göstergesidir.",
    slug: "yilin-ceo-odu",
    published: true,
    imageUrl: "/haber1.jpg",
    createdAt: "2024-11-15T00:00:00.000Z",
    updatedAt: "2024-11-15T00:00:00.000Z"
  },
  {
    id: "2",
    title: "Yeni Stratejik Ortaklık",
    summary: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı.",
    content: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı. Bu ortaklık, şirketin gelecek hedeflerine ulaşmasında önemli bir adım olacaktır.",
    slug: "yeni-stratejik-ortaklik",
    published: true,
    imageUrl: "/haber2.jpg",
    createdAt: "2024-10-03T00:00:00.000Z",
    updatedAt: "2024-10-03T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Sürdürülebilirlik Zirvesi",
    summary: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi.",
    content: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi. Bu zirvede, çevre dostu uygulamalar ve sürdürülebilir kalkınma konuları ele alındı.",
    slug: "surdurulebilirlik-zirvesi",
    published: true,
    imageUrl: "/haber3.jpg",
    createdAt: "2024-09-22T00:00:00.000Z",
    updatedAt: "2024-09-22T00:00:00.000Z"
  }
];

export function getAllNews(): NewsItem[] {
  return defaultNews;
}

export function getAllNewsArray(): NewsItem[] {
  return defaultNews;
}

export function getLatestNews(count: number = 3): NewsItem[] {
  return defaultNews.slice(0, count);
}

export function getNewsForPage(): NewsItem[] {
  return defaultNews.slice(0, 12);
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return defaultNews.find(n => n.slug === slug && n.published);
}
