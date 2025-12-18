"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit2, LogOut, Newspaper, Mail, Home, User, Phone, Image as ImageIcon } from "lucide-react";
import { publicImages, getPublicImagePath } from "@/lib/public-images";
import { 
  getHomePageData, saveHomePageData, defaultHomePageData,
  getAboutPageData, saveAboutPageData, defaultAboutPageData,
  getContactPageData, saveContactPageData, defaultContactPageData,
  type HomePageData, type AboutPageData, type ContactPageData
} from "@/lib/page-data";

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  slug: string;
  published: boolean;
  createdAt: string;
}

type TabType = "home" | "about" | "news" | "contact" | "messages";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>("home");
  
  // News state
  const [news, setNews] = useState<News[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({ title: "", summary: "", content: "", imageUrl: "", published: true });
  const [showImageSelector, setShowImageSelector] = useState(false);
  
  // Home page state
  const [homeData, setHomeData] = useState<HomePageData>(defaultHomePageData);
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [highlightForm, setHighlightForm] = useState({ title: "", description: "" });
  
  // About page state
  const [aboutData, setAboutData] = useState<AboutPageData>(defaultAboutPageData);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [careerForm, setCareerForm] = useState({ title: "", company: "", period: "", description: "" });
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [educationForm, setEducationForm] = useState({ degree: "", field: "", period: "" });
  
  // Contact page state
  const [contactData, setContactData] = useState<ContactPageData>(defaultContactPageData);
  
  // Messages state
  const [messages, setMessages] = useState<any[]>([]);

  // Load all data
  useEffect(() => {
    loadNews();
    loadMessages();
    loadHomeData();
    loadAboutData();
    loadContactData();
  }, []);

  const loadNews = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setNews([]);
      return;
    }
    try {
      const saved = localStorage.getItem("admin_news");
      if (saved) {
        const parsedNews = JSON.parse(saved);
        if (parsedNews.length > 0) {
          setNews(parsedNews);
        } else {
          // Initialize with default news if localStorage is empty
          const defaultNews: News[] = [
            {
              id: "1",
              title: "Yılın CEO'su Ödülü",
              summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
              content: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi. Bu ödül, yıl boyunca gösterdiği üstün liderlik ve başarılı yönetim anlayışının bir göstergesidir.",
              slug: "yilin-ceo-odu",
              published: true,
              imageUrl: "/haber1.jpg",
              createdAt: "2024-11-15T00:00:00.000Z"
            },
            {
              id: "2",
              title: "Yeni Stratejik Ortaklık",
              summary: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı.",
              content: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı. Bu ortaklık, şirketin gelecek hedeflerine ulaşmasında önemli bir adım olacaktır.",
              slug: "yeni-stratejik-ortaklik",
              published: true,
              imageUrl: "/haber2.jpg",
              createdAt: "2024-10-03T00:00:00.000Z"
            },
            {
              id: "3",
              title: "Sürdürülebilirlik Zirvesi",
              summary: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi.",
              content: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi. Bu zirvede, çevre dostu uygulamalar ve sürdürülebilir kalkınma konuları ele alındı.",
              slug: "surdurulebilirlik-zirvesi",
              published: true,
              imageUrl: "/haber3.jpg",
              createdAt: "2024-09-22T00:00:00.000Z"
            },
            {
              id: "4",
              title: "Dijital Dönüşüm Projesi",
              summary: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı.",
              content: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı. Bu proje ile şirket, teknolojik altyapısını güçlendirerek operasyonel verimliliği artırmayı hedefliyor.",
              slug: "dijital-donusum-projesi",
              published: true,
              imageUrl: "/haber4.jpg",
              createdAt: "2024-08-15T00:00:00.000Z"
            }
          ];
          setNews(defaultNews);
          localStorage.setItem("admin_news", JSON.stringify(defaultNews));
        }
      } else {
        // Initialize with default news if no data exists
        const defaultNews: News[] = [
          {
            id: "1",
            title: "Yılın CEO'su Ödülü",
            summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
            content: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi. Bu ödül, yıl boyunca gösterdiği üstün liderlik ve başarılı yönetim anlayışının bir göstergesidir.",
            slug: "yilin-ceo-odu",
            published: true,
            imageUrl: "/haber1.jpg",
            createdAt: "2024-11-15T00:00:00.000Z"
          },
          {
            id: "2",
            title: "Yeni Stratejik Ortaklık",
            summary: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı.",
            content: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı. Bu ortaklık, şirketin gelecek hedeflerine ulaşmasında önemli bir adım olacaktır.",
            slug: "yeni-stratejik-ortaklik",
            published: true,
            imageUrl: "/haber2.jpg",
            createdAt: "2024-10-03T00:00:00.000Z"
          },
          {
            id: "3",
            title: "Sürdürülebilirlik Zirvesi",
            summary: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi.",
            content: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi. Bu zirvede, çevre dostu uygulamalar ve sürdürülebilir kalkınma konuları ele alındı.",
            slug: "surdurulebilirlik-zirvesi",
            published: true,
            imageUrl: "/haber3.jpg",
            createdAt: "2024-09-22T00:00:00.000Z"
          },
          {
            id: "4",
            title: "Dijital Dönüşüm Projesi",
            summary: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı.",
            content: "Başak A.Ş. kapsamlı dijital dönüşüm projesini başlattı. Bu proje ile şirket, teknolojik altyapısını güçlendirerek operasyonel verimliliği artırmayı hedefliyor.",
            slug: "dijital-donusum-projesi",
            published: true,
            imageUrl: "/haber4.jpg",
            createdAt: "2024-08-15T00:00:00.000Z"
          }
        ];
        setNews(defaultNews);
        localStorage.setItem("admin_news", JSON.stringify(defaultNews));
      }
    } catch {
      setNews([]);
    }
  };

  const loadMessages = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setMessages([]);
      return;
    }
    try {
      const saved = localStorage.getItem("admin_messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {
      setMessages([]);
    }
  };

  const loadHomeData = () => {
    const data = getHomePageData();
    setHomeData(data);
  };

  const loadAboutData = () => {
    const data = getAboutPageData();
    setAboutData(data);
  };

  const loadContactData = () => {
    const data = getContactPageData();
    setContactData(data);
  };

  // News handlers
  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedNews = editingNewsId
      ? news.map(n => n.id === editingNewsId ? { ...n, ...newsForm, id: editingNewsId } : n)
      : [...news, { ...newsForm, id: Date.now().toString(), slug: newsForm.title.toLowerCase().replace(/\s+/g, "-"), createdAt: new Date().toISOString() }];
    
    setNews(updatedNews);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem("admin_news", JSON.stringify(updatedNews));
        dispatchUpdateEvent();
      } catch {
        // Silently fail
      }
    }
    setShowNewsForm(false);
    setEditingNewsId(null);
    setNewsForm({ title: "", summary: "", content: "", imageUrl: "", published: true });
  };

  const handleNewsDelete = (id: string) => {
    if (confirm("Bu haberi silmek istediğinizden emin misiniz?")) {
      const updatedNews = news.filter(n => n.id !== id);
      setNews(updatedNews);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem("admin_news", JSON.stringify(updatedNews));
          dispatchUpdateEvent();
        } catch {
          // Silently fail
        }
      }
    }
  };

  const handleNewsEdit = (item: News) => {
    setNewsForm({ title: item.title, summary: item.summary, content: item.content, imageUrl: item.imageUrl || "", published: item.published });
    setEditingNewsId(item.id);
    setShowNewsForm(true);
  };

  // Helper function to dispatch update event
  const dispatchUpdateEvent = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('adminDataUpdated'));
    }
  };

  // Home page handlers
  const handleHomeSave = () => {
    saveHomePageData(homeData);
    dispatchUpdateEvent();
    alert("Ana sayfa başarıyla kaydedildi!");
  };

  const handleHighlightAdd = () => {
    const newHighlight = {
      id: Date.now().toString(),
      title: highlightForm.title,
      description: highlightForm.description
    };
    setHomeData({
      ...homeData,
      highlights: [...homeData.highlights, newHighlight]
    });
    setHighlightForm({ title: "", description: "" });
  };

  const handleHighlightEdit = (id: string) => {
    const highlight = homeData.highlights.find(h => h.id === id);
    if (highlight) {
      setHighlightForm({ title: highlight.title, description: highlight.description });
      setEditingHighlightId(id);
    }
  };

  const handleHighlightUpdate = () => {
    if (editingHighlightId) {
      setHomeData({
        ...homeData,
        highlights: homeData.highlights.map(h => 
          h.id === editingHighlightId 
            ? { ...h, title: highlightForm.title, description: highlightForm.description }
            : h
        )
      });
      setEditingHighlightId(null);
      setHighlightForm({ title: "", description: "" });
    }
  };

  const handleHighlightDelete = (id: string) => {
    if (confirm("Bu özelliği silmek istediğinizden emin misiniz?")) {
      setHomeData({
        ...homeData,
        highlights: homeData.highlights.filter(h => h.id !== id)
      });
    }
  };

  // About page handlers
  const handleAboutSave = () => {
    saveAboutPageData(aboutData);
    dispatchUpdateEvent();
    alert("Hakkında sayfası başarıyla kaydedildi!");
  };

  const handleCareerAdd = () => {
    const newCareer = {
      id: Date.now().toString(),
      title: careerForm.title,
      company: careerForm.company,
      period: careerForm.period,
      description: careerForm.description
    };
    setAboutData({
      ...aboutData,
      career: [...aboutData.career, newCareer]
    });
    setCareerForm({ title: "", company: "", period: "", description: "" });
  };

  const handleCareerEdit = (id: string) => {
    const career = aboutData.career.find(c => c.id === id);
    if (career) {
      setCareerForm({ title: career.title, company: career.company, period: career.period, description: career.description });
      setEditingCareerId(id);
    }
  };

  const handleCareerUpdate = () => {
    if (editingCareerId) {
      setAboutData({
        ...aboutData,
        career: aboutData.career.map(c => 
          c.id === editingCareerId 
            ? { ...c, ...careerForm }
            : c
        )
      });
      setEditingCareerId(null);
      setCareerForm({ title: "", company: "", period: "", description: "" });
    }
  };

  const handleCareerDelete = (id: string) => {
    if (confirm("Bu kariyer öğesini silmek istediğinizden emin misiniz?")) {
      setAboutData({
        ...aboutData,
        career: aboutData.career.filter(c => c.id !== id)
      });
    }
  };

  const handleEducationAdd = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: educationForm.degree,
      field: educationForm.field,
      period: educationForm.period
    };
    setAboutData({
      ...aboutData,
      education: [...aboutData.education, newEducation]
    });
    setEducationForm({ degree: "", field: "", period: "" });
  };

  const handleEducationEdit = (id: string) => {
    const education = aboutData.education.find(e => e.id === id);
    if (education) {
      setEducationForm({ degree: education.degree, field: education.field, period: education.period });
      setEditingEducationId(id);
    }
  };

  const handleEducationUpdate = () => {
    if (editingEducationId) {
      setAboutData({
        ...aboutData,
        education: aboutData.education.map(e => 
          e.id === editingEducationId 
            ? { ...e, ...educationForm }
            : e
        )
      });
      setEditingEducationId(null);
      setEducationForm({ degree: "", field: "", period: "" });
    }
  };

  const handleEducationDelete = (id: string) => {
    if (confirm("Bu eğitim öğesini silmek istediğinizden emin misiniz?")) {
      setAboutData({
        ...aboutData,
        education: aboutData.education.filter(e => e.id !== id)
      });
    }
  };

  // Contact page handlers
  const handleContactSave = () => {
    saveContactPageData(contactData);
    dispatchUpdateEvent();
    alert("İletişim sayfası başarıyla kaydedildi!");
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      try {
        sessionStorage.removeItem("admin_authenticated");
        window.location.href = "/durmusakkaya/admin/login/";
      } catch {
        window.location.href = "/durmusakkaya/admin/login/";
      }
    } else {
      window.location.href = "/durmusakkaya/admin/login/";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            <LogOut size={18} /> Çıkış
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setTab("home")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "home" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Home size={18} /> Ana Sayfa
          </button>
          <button onClick={() => setTab("about")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "about" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <User size={18} /> Hakkında
          </button>
          <button onClick={() => setTab("news")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "news" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Newspaper size={18} /> Haberler
          </button>
          <button onClick={() => setTab("contact")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "contact" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Phone size={18} /> İletişim
          </button>
          <button onClick={() => setTab("messages")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "messages" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Mail size={18} /> Mesajlar ({messages?.length || 0})
          </button>
        </div>

        {/* Home Page Tab */}
        {tab === "home" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Ana Sayfa Yönetimi</h2>
              <button onClick={handleHomeSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Tüm Değişiklikleri Kaydet
              </button>
            </div>

            {/* Hero Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Hero Bölümü</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hoş Geldiniz Metni</label>
                  <input 
                    type="text" 
                    value={homeData.hero.welcomeText}
                    onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, welcomeText: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input 
                    type="text" 
                    value={homeData.hero.title}
                    onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, title: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                  <input 
                    type="text" 
                    value={homeData.hero.subtitle}
                    onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, subtitle: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea 
                    rows={3}
                    value={homeData.hero.description}
                    onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, description: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Özellikler (Highlights)</h3>
              <div className="space-y-4 mb-4">
                {homeData.highlights.map((highlight) => (
                  <div key={highlight.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{highlight.title}</div>
                      <div className="text-sm text-gray-600">{highlight.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleHighlightEdit(highlight.id)} className="p-2 hover:bg-blue-50 rounded">
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      <button onClick={() => handleHighlightDelete(highlight.id)} className="p-2 hover:bg-red-50 rounded">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {editingHighlightId ? (
                <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                  <input 
                    type="text" 
                    placeholder="Başlık"
                    value={highlightForm.title}
                    onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="text" 
                    placeholder="Açıklama"
                    value={highlightForm.description}
                    onChange={(e) => setHighlightForm({ ...highlightForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleHighlightUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Güncelle</button>
                    <button onClick={() => { setEditingHighlightId(null); setHighlightForm({ title: "", description: "" }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">İptal</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <input 
                    type="text" 
                    placeholder="Başlık"
                    value={highlightForm.title}
                    onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="text" 
                    placeholder="Açıklama"
                    value={highlightForm.description}
                    onChange={(e) => setHighlightForm({ ...highlightForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button onClick={handleHighlightAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <Plus size={18} className="inline mr-2" /> Yeni Özellik Ekle
                  </button>
                </div>
              )}
            </div>

            {/* News Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Haberler Bölümü</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input 
                    type="text" 
                    value={homeData.newsSection.title}
                    onChange={(e) => setHomeData({ ...homeData, newsSection: { ...homeData.newsSection, title: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <input 
                    type="text" 
                    value={homeData.newsSection.description}
                    onChange={(e) => setHomeData({ ...homeData, newsSection: { ...homeData.newsSection, description: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Güncel gelişmeler ve duyurular • Toplam {count} haber"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Page Tab */}
        {tab === "about" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Hakkında Sayfası Yönetimi</h2>
              <button onClick={handleAboutSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Tüm Değişiklikleri Kaydet
              </button>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Sayfa Başlığı</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input 
                    type="text" 
                    value={aboutData.header.title}
                    onChange={(e) => setAboutData({ ...aboutData, header: { ...aboutData.header, title: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                  <input 
                    type="text" 
                    value={aboutData.header.subtitle}
                    onChange={(e) => setAboutData({ ...aboutData, header: { ...aboutData.header, subtitle: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Biyografi</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İsim</label>
                  <input 
                    type="text" 
                    value={aboutData.bio.name}
                    onChange={(e) => setAboutData({ ...aboutData, bio: { ...aboutData.bio, name: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon</label>
                  <input 
                    type="text" 
                    value={aboutData.bio.role}
                    onChange={(e) => setAboutData({ ...aboutData, bio: { ...aboutData.bio, role: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profil Resmi (URL)</label>
                  <input 
                    type="text" 
                    value={aboutData.bio.profileImage}
                    onChange={(e) => setAboutData({ ...aboutData, bio: { ...aboutData.bio, profileImage: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="/profile.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biyografi Paragrafları (Her satır bir paragraf)</label>
                  <textarea 
                    rows={6}
                    value={aboutData.bio.paragraphs.join("\n")}
                    onChange={(e) => setAboutData({ ...aboutData, bio: { ...aboutData.bio, paragraphs: e.target.value.split("\n").filter(p => p.trim()) } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Career */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Kariyer Geçmişi</h3>
              <div className="space-y-4 mb-4">
                {aboutData.career.map((career) => (
                  <div key={career.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{career.title}</div>
                      <div className="text-sm text-blue-600">{career.company} | {career.period}</div>
                      <div className="text-sm text-gray-600 mt-1">{career.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleCareerEdit(career.id)} className="p-2 hover:bg-blue-50 rounded">
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      <button onClick={() => handleCareerDelete(career.id)} className="p-2 hover:bg-red-50 rounded">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {editingCareerId ? (
                <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                  <input type="text" placeholder="Pozisyon" value={careerForm.title} onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Şirket" value={careerForm.company} onChange={(e) => setCareerForm({ ...careerForm, company: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Dönem (örn: 2018 - Günümüz)" value={careerForm.period} onChange={(e) => setCareerForm({ ...careerForm, period: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea placeholder="Açıklama" value={careerForm.description} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={2} />
                  <div className="flex gap-2">
                    <button onClick={handleCareerUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Güncelle</button>
                    <button onClick={() => { setEditingCareerId(null); setCareerForm({ title: "", company: "", period: "", description: "" }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">İptal</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <input type="text" placeholder="Pozisyon" value={careerForm.title} onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Şirket" value={careerForm.company} onChange={(e) => setCareerForm({ ...careerForm, company: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Dönem" value={careerForm.period} onChange={(e) => setCareerForm({ ...careerForm, period: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea placeholder="Açıklama" value={careerForm.description} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={2} />
                  <button onClick={handleCareerAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <Plus size={18} className="inline mr-2" /> Yeni Kariyer Ekle
                  </button>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Eğitim Geçmişi</h3>
              <div className="space-y-4 mb-4">
                {aboutData.education.map((education) => (
                  <div key={education.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{education.degree}</div>
                      <div className="text-sm text-blue-600">{education.field} | {education.period}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEducationEdit(education.id)} className="p-2 hover:bg-blue-50 rounded">
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      <button onClick={() => handleEducationDelete(education.id)} className="p-2 hover:bg-red-50 rounded">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {editingEducationId ? (
                <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                  <input type="text" placeholder="Derece" value={educationForm.degree} onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Alan" value={educationForm.field} onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Dönem" value={educationForm.period} onChange={(e) => setEducationForm({ ...educationForm, period: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <div className="flex gap-2">
                    <button onClick={handleEducationUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Güncelle</button>
                    <button onClick={() => { setEditingEducationId(null); setEducationForm({ degree: "", field: "", period: "" }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">İptal</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <input type="text" placeholder="Derece" value={educationForm.degree} onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Alan" value={educationForm.field} onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Dönem" value={educationForm.period} onChange={(e) => setEducationForm({ ...educationForm, period: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <button onClick={handleEducationAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <Plus size={18} className="inline mr-2" /> Yeni Eğitim Ekle
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Page Tab */}
        {tab === "contact" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">İletişim Sayfası Yönetimi</h2>
              <button onClick={handleContactSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Tüm Değişiklikleri Kaydet
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                  <textarea 
                    rows={3}
                    value={contactData.contactInfo.address}
                    onChange={(e) => setContactData({ ...contactData, contactInfo: { ...contactData.contactInfo, address: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input 
                    type="text" 
                    value={contactData.contactInfo.phone}
                    onChange={(e) => setContactData({ ...contactData, contactInfo: { ...contactData.contactInfo, phone: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                  <input 
                    type="email" 
                    value={contactData.contactInfo.email}
                    onChange={(e) => setContactData({ ...contactData, contactInfo: { ...contactData.contactInfo, email: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Saatleri</label>
                  <input 
                    type="text" 
                    value={contactData.contactInfo.workingHours}
                    onChange={(e) => setContactData({ ...contactData, contactInfo: { ...contactData.contactInfo, workingHours: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Tab */}
        {tab === "news" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Haberler Yönetimi</h2>
              <button onClick={() => { setShowNewsForm(true); setEditingNewsId(null); setNewsForm({ title: "", summary: "", content: "", imageUrl: "", published: true }); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18} /> Yeni Haber Ekle
              </button>
            </div>

            {showNewsForm && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingNewsId ? "Haber Düzenle" : "Yeni Haber Ekle"}</h3>
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <input 
                      type="text" 
                      required
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                    <textarea 
                      rows={2}
                      required
                      value={newsForm.summary}
                      onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                    <textarea 
                      rows={6}
                      required
                      value={newsForm.content}
                      onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resim URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newsForm.imageUrl}
                        onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                        className="flex-1 px-4 py-3 border rounded-lg"
                        placeholder="/haber1.jpg"
                      />
                      <button type="button" onClick={() => setShowImageSelector(!showImageSelector)} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg">
                        <ImageIcon size={18} />
                      </button>
                    </div>
                    {showImageSelector && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-2">
                        {publicImages.map((img) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => { setNewsForm({ ...newsForm, imageUrl: img.url }); setShowImageSelector(false); }}
                            className="p-2 text-left hover:bg-blue-50 rounded"
                          >
                            {img.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={newsForm.published}
                      onChange={(e) => setNewsForm({ ...newsForm, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium text-gray-700">Yayınla</label>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                      {editingNewsId ? "Güncelle" : "Ekle"}
                    </button>
                    <button type="button" onClick={() => { setShowNewsForm(false); setEditingNewsId(null); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-md">
              {news.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Başlık</th>
                      <th className="text-left py-3 px-4">Durum</th>
                      <th className="text-right py-3 px-4">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${item.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {item.published ? "Yayında" : "Taslak"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handleNewsEdit(item)} className="p-2 hover:bg-blue-50 rounded mr-2">
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button onClick={() => handleNewsDelete(item.id)} className="p-2 hover:bg-red-50 rounded">
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center py-8">Henüz haber eklenmemiş.</p>
              )}
            </div>
          </>
        )}

        {/* Messages Tab */}
        {tab === "messages" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mesajlar</h2>
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="font-semibold">{msg.name}</div>
                        <div className="text-sm text-gray-600">{msg.email}</div>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</div>
                    </div>
                    <div className="font-medium mb-1">{msg.subject}</div>
                    <div className="text-gray-700">{msg.message}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Henüz mesaj yok.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
