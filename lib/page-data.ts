'use client';
// Centralized page data management for admin panel

export interface HomePageData {
  hero: {
    welcomeText: string;
    title: string;
    subtitle: string;
    description: string;
  };
  highlights: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  newsSection: {
    title: string;
    description: string;
  };
}

export interface AboutPageData {
  header: {
    title: string;
    subtitle: string;
  };
  bio: {
    name: string;
    role: string;
    paragraphs: string[];
    profileImage: string;
  };
  career: Array<{
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    field: string;
    period: string;
  }>;
}

export interface ContactPageData {
  header: {
    title: string;
    subtitle: string;
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
  };
}

// Default data
export const defaultHomePageData: HomePageData = {
  hero: {
    welcomeText: "Hoş Geldiniz",
    title: "Dr. Durmuş AKKAYA",
    subtitle: "Başak A.Ş. Genel Müdürü",
    description: "Yılların deneyimi ve vizyoner liderlik anlayışıyla kurumsal başarıyı hedefleyen bir yönetici."
  },
  highlights: [
    {
      id: "1",
      title: "Liderlik",
      description: "Yılların yöneticilik deneyimi ve stratejik vizyon"
    },
    {
      id: "2",
      title: "Başarı",
      description: "Sürdürülebilir büyüme ve kurumsal başarılar"
    },
    {
      id: "3",
      title: "İletişim",
      description: "Açık iletişim ve iş birliği odaklı yaklaşım"
    }
  ],
  newsSection: {
    title: "Son Haberler",
    description: "Güncel gelişmeler ve duyurular • Toplam {count} haber"
  }
};

export const defaultAboutPageData: AboutPageData = {
  header: {
    title: "Hakkımda",
    subtitle: "Kariyer yolculuğum ve vizyon"
  },
  bio: {
    name: "Dr. Durmuş AKKAYA",
    role: "Başak A.Ş. Genel Müdürü",
    paragraphs: [
      "Uzun yılların iş deneyimi ve akademik birikimle donanmış bir lider olarak, kurumsal yönetim ve stratejik planlama alanlarında geniş bir vizyona sahibim.",
      "Başak A.Ş.'nin büyümesine ve sektörde öncü konuma gelmesine liderlik etmekten gurur duyuyorum. İnovasyon, sürdürülebilirlik ve müşteri memnuniyeti odaklı yaklaşımımız sayesinde şirketimiz istikrarlı bir büyüme süreci yaşamaktadır.",
      "Ekip çalışmasına ve yenilikçi düşünceye olan inancım, başarılı projelerin temelini oluşturmaktadır."
    ],
    profileImage: "/profile.jpg"
  },
  career: [
    {
      id: "1",
      title: "Genel Müdür",
      company: "Başak A.Ş.",
      period: "2018 - Günümüz",
      description: "Şirketin genel yönetimi, stratejik planlama ve büyüme hedeflerinin belirlenmesi"
    },
    {
      id: "2",
      title: "Genel Müdür Yardımcısı",
      company: "Başak A.Ş.",
      period: "2014 - 2018",
      description: "Operasyonel süreçlerin yönetimi ve iyileştirilmesi"
    },
    {
      id: "3",
      title: "Bölüm Müdürü",
      company: "Başak A.Ş.",
      period: "2010 - 2014",
      description: "Satış ve pazarlama bölümünün yönetimi"
    }
  ],
  education: [
    {
      id: "1",
      degree: "Doktora",
      field: "Işletme Yönetimi",
      period: "2008 - 2012"
    },
    {
      id: "2",
      degree: "Yüksek Lisans",
      field: "MBA - İşletme",
      period: "2005 - 2007"
    }
  ]
};

export const defaultContactPageData: ContactPageData = {
  header: {
    title: "İletişim",
    subtitle: "Benimle iletişime geçin"
  },
  contactInfo: {
    address: "Başak A.Ş. Genel Müdürlük\nİstanbul, Türkiye",
    phone: "+90 (212) 000 00 00",
    email: "info@basak.com.tr",
    workingHours: "Pazartesi - Cuma: 09:00 - 18:00"
  }
};

// Storage functions
export function getHomePageData(): HomePageData {
  if (typeof window === 'undefined') return defaultHomePageData;
  const saved = localStorage.getItem("admin_homepage");
  return saved ? JSON.parse(saved) : defaultHomePageData;
}

export function saveHomePageData(data: HomePageData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("admin_homepage", JSON.stringify(data));
}

export function getAboutPageData(): AboutPageData {
  if (typeof window === 'undefined') return defaultAboutPageData;
  const saved = localStorage.getItem("admin_aboutpage");
  return saved ? JSON.parse(saved) : defaultAboutPageData;
}

export function saveAboutPageData(data: AboutPageData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("admin_aboutpage", JSON.stringify(data));
}

export function getContactPageData(): ContactPageData {
  if (typeof window === 'undefined') return defaultContactPageData;
  const saved = localStorage.getItem("admin_contactpage");
  return saved ? JSON.parse(saved) : defaultContactPageData;
}

export function saveContactPageData(data: ContactPageData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("admin_contactpage", JSON.stringify(data));
}

