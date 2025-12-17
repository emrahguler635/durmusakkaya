'use client';
// Centralized news data - reads from localStorage if available, otherwise uses default

interface NewsItem {
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

// Default news data (fallback)
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
  },
  {
    id: "4",
    title: "Dijital Dönüşüm Projesi",
    summary: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı.",
    content: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı. Bu proje ile şirket, teknolojik altyapısını güçlendirerek operasyonel verimliliği artırmayı hedefliyor.",
    slug: "dijital-donusum-projesi",
    published: true,
    imageUrl: "/haber4.jpg",
    createdAt: "2024-08-15T00:00:00.000Z",
    updatedAt: "2024-08-15T00:00:00.000Z"
  },
  {
    id: "5",
    title: "Yeni Ofis Açılışı",
    summary: "İstanbul'daki yeni genel müdürlük binası açıldı.",
    content: "İstanbul'daki yeni genel müdürlük binası açıldı. Modern ve çevre dostu tasarımı ile dikkat çeken bina, şirketin büyüme vizyonunu yansıtıyor.",
    slug: "yeni-ofis-acilisi",
    published: true,
    imageUrl: null,
    createdAt: "2024-07-10T00:00:00.000Z",
    updatedAt: "2024-07-10T00:00:00.000Z"
  },
  {
    id: "6",
    title: "Kurumsal Sosyal Sorumluluk Projesi",
    summary: "Eğitim alanında yeni bir sosyal sorumluluk projesi başlatıldı.",
    content: "Eğitim alanında yeni bir sosyal sorumluluk projesi başlatıldı. Bu proje ile gençlerin eğitimine katkı sağlanarak toplumsal kalkınmaya destek veriliyor.",
    slug: "kurumsal-sosyal-sorumluluk-projesi",
    published: true,
    imageUrl: null,
    createdAt: "2024-06-20T00:00:00.000Z",
    updatedAt: "2024-06-20T00:00:00.000Z"
  },
  {
    id: "7",
    title: "Yıllık Genel Kurul Toplantısı",
    summary: "2024 yılı genel kurul toplantısı başarıyla tamamlandı.",
    content: "2024 yılı genel kurul toplantısı başarıyla tamamlandı. Toplantıda şirketin geçmiş yıl performansı değerlendirildi ve gelecek hedefler paylaşıldı.",
    slug: "yillik-genel-kurul-toplantisi",
    published: true,
    imageUrl: null,
    createdAt: "2024-05-12T00:00:00.000Z",
    updatedAt: "2024-05-12T00:00:00.000Z"
  },
  {
    id: "8",
    title: "Uluslararası İş Birliği Anlaşması",
    summary: "Avrupa pazarına açılım için önemli bir anlaşma imzalandı.",
    content: "Avrupa pazarına açılım için önemli bir anlaşma imzalandı. Bu anlaşma ile şirket, uluslararası pazarlardaki varlığını güçlendirecek.",
    slug: "uluslararasi-is-birligi-anlasmasi",
    published: true,
    imageUrl: null,
    createdAt: "2024-04-08T00:00:00.000Z",
    updatedAt: "2024-04-08T00:00:00.000Z"
  },
  {
    id: "9",
    title: "Yenilikçi Ürün Lansmanı",
    summary: "Sektörde ilk olan yeni ürün başarıyla piyasaya sunuldu.",
    content: "Sektörde ilk olan yeni ürün başarıyla piyasaya sunuldu. Bu ürün, müşteri ihtiyaçlarına yönelik yenilikçi çözümler sunuyor.",
    slug: "yenilikci-urun-lansmani",
    published: true,
    imageUrl: null,
    createdAt: "2024-03-25T00:00:00.000Z",
    updatedAt: "2024-03-25T00:00:00.000Z"
  },
  {
    id: "10",
    title: "Çalışan Başarı Ödülleri",
    summary: "Yılın en başarılı çalışanları ödüllendirildi.",
    content: "Yılın en başarılı çalışanları ödüllendirildi. Bu ödüller, şirket içindeki başarılı performansları takdir etmek amacıyla verildi.",
    slug: "calisan-basari-odulleri",
    published: true,
    imageUrl: null,
    createdAt: "2024-02-18T00:00:00.000Z",
    updatedAt: "2024-02-18T00:00:00.000Z"
  },
  {
    id: "11",
    title: "Sektör Zirvesi Katılımı",
    summary: "Ulusal sektör zirvesinde önemli konuşmalar yapıldı.",
    content: "Ulusal sektör zirvesinde önemli konuşmalar yapıldı. Dr. Durmuş AKKAYA, sektörün geleceği hakkında değerli görüşlerini paylaştı.",
    slug: "sektor-zirvesi-katilimi",
    published: true,
    imageUrl: null,
    createdAt: "2024-01-30T00:00:00.000Z",
    updatedAt: "2024-01-30T00:00:00.000Z"
  },
  {
    id: "12",
    title: "Yeni Yıl Mesajı",
    summary: "2024 yılı için yeni hedefler ve beklentiler paylaşıldı.",
    content: "2024 yılı için yeni hedefler ve beklentiler paylaşıldı. Şirket, yeni yılda büyüme ve başarı odaklı çalışmalarına devam edecek.",
    slug: "yeni-yil-mesaji",
    published: true,
    imageUrl: null,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

// Get news from localStorage or return default
export function getAllNews(): NewsItem[] {
  if (typeof window === 'undefined') return defaultNews;
  const saved = localStorage.getItem("admin_news");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure all fields exist
      return parsed.length > 0 ? parsed : defaultNews;
    } catch {
      return defaultNews;
    }
  }
  return defaultNews;
}

// Export for backward compatibility (lazy evaluation)
export function getAllNewsArray(): NewsItem[] {
  return getAllNews();
}

// Get latest news (for homepage)
export function getLatestNews(count: number = 3): NewsItem[] {
  const news = getAllNews().filter(n => n.published);
  return news.slice(0, count);
}

// Get news for news page (first 12)
export function getNewsForPage(): NewsItem[] {
  const news = getAllNews().filter(n => n.published);
  return news.slice(0, 12);
}

// Get news by slug
export function getNewsBySlug(slug: string): NewsItem | undefined {
  const news = getAllNews();
  return news.find(n => n.slug === slug && n.published);
}
