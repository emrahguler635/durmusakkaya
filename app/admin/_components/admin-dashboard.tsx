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
        setNews(JSON.parse(saved));
      } else {
        const defaultNews: News[] = [];
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

  // Home page handlers
  const handleHomeSave = () => {
    saveHomePageData(homeData);
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
    alert("İletişim sayfası başarıyla kaydedildi!");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    router.push("/admin/login");
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
                    <button onClick={handleHighlightUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Güncelle
                    </button>
                    <button onClick={() => { setEditingHighlightId(null); setHighlightForm({ title: "", description: "" }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">
                      İptal
                    </button>
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
              <h3 className="text-lg font-semibold mb-4">Eğitim</h3>
              <div className="space-y-4 mb-4">
                {aboutData.education.map((education) => (
                  <div key={education.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{education.degree}</div>
                      <div className="text-sm text-gray-700">{education.field}</div>
                      <div className="text-sm text-gray-500">{education.period}</div>
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

        {/* News Tab */}
        {tab === "news" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Haberler</h2>
              <button onClick={() => { setShowNewsForm(true); setEditingNewsId(null); setNewsForm({ title: "", summary: "", content: "", imageUrl: "", published: true }); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus size={18} /> Yeni Haber
              </button>
            </div>

            {showNewsForm && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingNewsId ? "Haber Düzenle" : "Yeni Haber"}</h3>
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <input type="text" required placeholder="Başlık" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <input type="text" required placeholder="Özet" value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <textarea required rows={5} placeholder="İçerik" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Görsel</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Görsel URL veya public klasöründen seçin" 
                        value={newsForm.imageUrl} 
                        onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })} 
                        className="flex-1 px-4 py-3 border rounded-lg" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowImageSelector(!showImageSelector)}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg border flex items-center gap-2"
                      >
                        <ImageIcon size={18} />
                        Seç
                      </button>
                    </div>
                    {showImageSelector && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg border max-h-60 overflow-y-auto">
                        <p className="text-sm text-gray-600 mb-2">Public klasöründen seçin:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {publicImages.map((img) => (
                            <button
                              key={img.url}
                              type="button"
                              onClick={() => {
                                setNewsForm({ ...newsForm, imageUrl: getPublicImagePath(img.url) });
                                setShowImageSelector(false);
                              }}
                              className="p-2 text-left border rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
                            >
                              <div className="text-xs font-medium text-gray-700">{img.name}</div>
                              <div className="text-xs text-gray-500 truncate">{img.url}</div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          💡 Yeni resim eklemek için: public klasörüne resim ekleyin, sonra lib/public-images.ts dosyasına ekleyin
                        </p>
                      </div>
                    )}
                  </div>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={newsForm.published} onChange={(e) => setNewsForm({ ...newsForm, published: e.target.checked })} /> Yayınla</label>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Kaydet</button>
                    <button type="button" onClick={() => { setShowNewsForm(false); setEditingNewsId(null); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">İptal</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {(news ?? []).length === 0 ? (
                <p className="p-6 text-gray-500 text-center">Henüz haber yok</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr><th className="text-left p-4">Başlık</th><th className="text-left p-4">Tarih</th><th className="p-4">Durum</th><th className="p-4">İşlemler</th></tr>
                  </thead>
                  <tbody>
                    {(news ?? []).map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-4 font-medium">{item.title}</td>
                        <td className="p-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</td>
                        <td className="p-4 text-center"><span className={`px-2 py-1 rounded text-xs ${item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{item.published ? "Yayında" : "Taslak"}</span></td>
                        <td className="p-4 flex gap-2 justify-center">
                          <button onClick={() => handleNewsEdit(item)} className="p-2 hover:bg-blue-50 rounded"><Edit2 size={16} className="text-blue-600" /></button>
                          <button onClick={() => handleNewsDelete(item.id)} className="p-2 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Contact Tab */}
        {tab === "contact" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">İletişim Sayfası Yönetimi</h2>
              <button onClick={handleContactSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
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
                    value={contactData.header.title}
                    onChange={(e) => setContactData({ ...contactData, header: { ...contactData.header, title: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                  <input 
                    type="text" 
                    value={contactData.header.subtitle}
                    onChange={(e) => setContactData({ ...contactData, header: { ...contactData.header, subtitle: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adres (Satır atlamak için \n kullanın)</label>
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

        {/* Messages Tab */}
        {tab === "messages" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {(messages ?? []).length === 0 ? (
              <p className="p-6 text-gray-500 text-center">Henüz mesaj yok</p>
            ) : (
              <div className="divide-y">
                {(messages ?? []).map((msg) => (
                  <div key={msg.id} className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{msg.name}</span>
                      <span className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{msg.email}</p>
                    <p className="font-medium text-gray-700 mb-2">{msg.subject}</p>
                    <p className="text-gray-600">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
