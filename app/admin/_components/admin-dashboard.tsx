"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit2, LogOut, Newspaper, Mail, Home, User, Phone, Image as ImageIcon, Rocket, Briefcase, ChevronUp, ChevronDown, BookOpen } from "lucide-react";
import { publicImages, getPublicImagePath } from "@/lib/public-images";
import { getImagePath } from "@/lib/image-path";
import { 
  getHomePageData, saveHomePageData, defaultHomePageData,
  getAboutPageData, saveAboutPageData, defaultAboutPageData,
  getContactPageData, saveContactPageData, defaultContactPageData,
  type HomePageData, type AboutPageData, type ContactPageData
} from "@/lib/page-data";
import {
  adminProjectsData,
  adminNewsData,
  adminPublicationsData,
  adminHomeData,
  adminAboutData,
  adminContactData,
} from "@/lib/admin-data";

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null; // Ana görsel (geriye uyumluluk için)
  images: string[]; // Birden fazla görsel için
  slug: string;
  published: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  images: string[];
  slug: string;
  published: boolean;
  createdAt: string;
  status?: string;
  location?: string;
  startYear?: string;
  videoUrl?: string;
}

type TabType = "home" | "about" | "news" | "publications" | "projects" | "contact" | "messages";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>("home");
  const projectYearOptions = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  const projectStatusOptions = ["Devam Ediyor", "Bitti", "Proje Aşamasında"];
  
  // News state
  const [news, setNews] = useState<News[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({ title: "", summary: "", content: "", imageUrl: "", images: [] as string[], published: true });
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Publications state (Akademik Yayınlar)
  const [publications, setPublications] = useState<News[]>([]);
  const [showPublicationForm, setShowPublicationForm] = useState(false);
  const [editingPublicationId, setEditingPublicationId] = useState<string | null>(null);
  const [publicationForm, setPublicationForm] = useState({ title: "", summary: "", content: "", imageUrl: "", images: [] as string[], published: true });
  const [showPublicationImageSelector, setShowPublicationImageSelector] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({ title: "", summary: "", content: "", imageUrl: "", images: [] as string[], published: true, status: "", location: "", startYear: "", videoUrl: "" });
  const [showProjectImageSelector, setShowProjectImageSelector] = useState(false);
  
  // Home page state
  const [homeData, setHomeData] = useState<HomePageData>(defaultHomePageData);
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [highlightForm, setHighlightForm] = useState({ title: "", description: "" });
  
  // About page state
  const [aboutData, setAboutData] = useState<AboutPageData>(defaultAboutPageData);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [careerForm, setCareerForm] = useState({ 
    title: "", 
    company: "", 
    employmentType: "Tam zamanlı", 
    startDate: "", 
    endDate: "", 
    duration: "", 
    location: "", 
    description: "",
    logo: ""
  });
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [educationForm, setEducationForm] = useState({ degree: "", field: "", period: "" });
  
  // Contact page state
  const [contactData, setContactData] = useState<ContactPageData>(defaultContactPageData);
  
  // Messages state
  const [messages, setMessages] = useState<any[]>([]);

  // GitHub token state (client-side only, never accessed during build)
  const [githubToken, setGithubToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenDraft, setTokenDraft] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load all data
  useEffect(() => {
    setMounted(true);
    loadNews();
    loadPublications();
    loadProjects();
    loadMessages();
    loadHomeData();
    loadAboutData();
    loadContactData();
    
    // Load GitHub token from localStorage (persistent, client-side only)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const savedToken = localStorage.getItem("github_token");
        if (savedToken) {
          setGithubToken(savedToken);
        }
      } catch (e) {
        // Silently fail
      }
    }
  }, []);

  const openTokenModal = () => {
    setTokenDraft(githubToken);
    setShowTokenInput(true);
  };

  const saveGithubToken = () => {
    const trimmed = tokenDraft.trim();
    if (!trimmed) {
      alert("Lütfen geçerli bir GitHub token girin (ghp_... ile başlar).");
      return;
    }
    setGithubToken(trimmed);
    try {
      localStorage.setItem("github_token", trimmed);
    } catch {
      // Silently fail
    }
    setShowTokenInput(false);
    alert("✅ Token kaydedildi. Artık haber ve proje kaydedebilirsiniz.");
  };

  const clearGithubToken = () => {
    setGithubToken("");
    setTokenDraft("");
    try {
      localStorage.removeItem("github_token");
    } catch {
      // Silently fail
    }
    setShowTokenInput(false);
  };

  const loadNews = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setNews([]);
      return;
    }
    try {
      const saved = localStorage.getItem("admin_news");
      if (saved) {
        const parsedNews = JSON.parse(saved);
        if (Array.isArray(parsedNews) && parsedNews.length > 0) {
          setNews(parsedNews);
          return;
        }
      }
      // Fallback to published admin data and sync to localStorage
      if (adminNewsData && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
        setNews(adminNewsData);
        try {
          localStorage.setItem("admin_news", JSON.stringify(adminNewsData));
        } catch {
          // Silently fail
        }
      } else {
        setNews([]);
      }
    } catch {
      setNews([]);
    }
  };

  const loadPublications = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setPublications([]);
      return;
    }
    try {
      const saved = localStorage.getItem("admin_publications");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPublications(parsed);
          return;
        }
      }
      if (adminPublicationsData && Array.isArray(adminPublicationsData) && adminPublicationsData.length > 0) {
        setPublications(adminPublicationsData);
        try {
          localStorage.setItem("admin_publications", JSON.stringify(adminPublicationsData));
        } catch {
          // Silently fail
        }
      } else {
        setPublications([]);
      }
    } catch {
      setPublications([]);
    }
  };

  const loadProjects = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setProjects([]);
      return;
    }
    try {
      const saved = localStorage.getItem("admin_projects");
      if (saved) {
        const parsedProjects = JSON.parse(saved);
        if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
          setProjects(parsedProjects);
          return;
        }
      }
      if (adminProjectsData && Array.isArray(adminProjectsData) && adminProjectsData.length > 0) {
        setProjects(adminProjectsData);
        try {
          localStorage.setItem("admin_projects", JSON.stringify(adminProjectsData));
        } catch {
          // Silently fail
        }
      } else {
        setProjects([]);
      }
    } catch {
      setProjects([]);
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

  // A browser without a saved draft must start from what is published on the site,
  // not from the built-in defaults, otherwise the next save overwrites live content.
  const hasLocalDraft = (storageKey: string): boolean => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") return false;
    try {
      return !!localStorage.getItem(storageKey);
    } catch {
      return false;
    }
  };

  const loadHomeData = () => {
    if (!hasLocalDraft("admin_homepage") && adminHomeData?.hero) {
      setHomeData(adminHomeData);
      saveHomePageData(adminHomeData);
      return;
    }
    setHomeData(getHomePageData());
  };

  const loadAboutData = () => {
    if (!hasLocalDraft("admin_aboutpage") && adminAboutData?.bio) {
      setAboutData(adminAboutData);
      saveAboutPageData(adminAboutData);
      return;
    }
    setAboutData(getAboutPageData());
  };

  const loadContactData = () => {
    if (!hasLocalDraft("admin_contactpage") && adminContactData?.contactInfo) {
      setContactData(adminContactData);
      saveContactPageData(adminContactData);
      return;
    }
    setContactData(getContactPageData());
  };

  // Helper function to create a clean slug from title
  const createSlug = (title: string): string => {
    if (!title) return "";
    return title
      .toLowerCase()
      .normalize("NFD") // Normalize to decomposed form for accented characters
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  };

  // Fix all news slugs (call this to clean up existing news)
  const fixAllNewsSlugs = async () => {
    const fixedNews = news.map((item: any) => {
      const cleanSlug = createSlug(item.title);
      return { ...item, slug: cleanSlug };
    });
    
    setNews(fixedNews);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem("admin_news", JSON.stringify(fixedNews));
      } catch {
        // Silently fail
      }
    }
    
    // Commit to GitHub
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("news (slug fix)");
      if (success) {
        alert("✅ Tüm haber slug'ları düzeltildi ve GitHub'a kaydedildi!");
      } else {
        alert("⚠️ Slug'lar localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    }
  };

  // Delete all news (clean start)
  const deleteAllNews = async () => {
    if (!confirm("⚠️ TÜM HABERLERİ SİLMEK İSTEDİĞİNİZDEN EMİN MİSİNİZ?\n\nBu işlem geri alınamaz! Sadece static haberler kalacak.")) {
      return;
    }
    
    // Clear all news (keep only static news which are in the code)
    setNews([]);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem("admin_news", JSON.stringify([]));
      } catch {
        // Silently fail
      }
    }
    
    // Commit to GitHub
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("news (delete all)");
      if (success) {
        alert("✅ Tüm haberler silindi ve GitHub'a kaydedildi! Artık temiz bir başlangıç yapabilirsiniz.");
      } else {
        alert("⚠️ Haberler localStorage'dan silindi, ancak GitHub'a yüklenemedi.");
      }
    }
  };

  // News handlers
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = editingNewsId 
      ? news.find(n => n.id === editingNewsId)?.slug || createSlug(newsForm.title)
      : createSlug(newsForm.title);
    
    const updatedNews = editingNewsId
      ? news.map(n => n.id === editingNewsId ? { ...n, ...newsForm, slug: newSlug, id: editingNewsId, images: newsForm.images || [] } : n)
      : [...news, { ...newsForm, id: Date.now().toString(), slug: newSlug, createdAt: new Date().toISOString(), images: newsForm.images || [] }];
    
    setNews(updatedNews);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem("admin_news", JSON.stringify(updatedNews));
      } catch {
        // Silently fail
      }
    }
    
    // Commit to GitHub if in browser
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("news");
      if (!success) {
        alert("Haber localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    }
    
    setShowNewsForm(false);
    setEditingNewsId(null);
    setNewsForm({ title: "", summary: "", content: "", imageUrl: "", images: [], published: true });
  };

  const handleNewsDelete = async (id: string) => {
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
      
      // Commit to GitHub if in browser
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        const success = await commitToGitHubAndDeploy("news (delete)");
        if (!success) {
          alert("Haber localStorage'dan silindi, ancak GitHub'a yüklenemedi.");
        }
      }
    }
  };

  const handleNewsEdit = (item: News) => {
    setNewsForm({ 
      title: item.title, 
      summary: item.summary, 
      content: item.content, 
      imageUrl: item.imageUrl || "", 
      images: item.images || [],
      published: item.published 
    });
    setEditingNewsId(item.id);
    setShowNewsForm(true);
  };

  // Publication handlers (Akademik Yayınlar)
  const handlePublicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = editingPublicationId 
      ? publications.find(n => n.id === editingPublicationId)?.slug || createSlug(publicationForm.title)
      : createSlug(publicationForm.title);
    
    const updated = editingPublicationId
      ? publications.map(n => n.id === editingPublicationId ? { ...n, ...publicationForm, slug: newSlug, id: editingPublicationId, images: publicationForm.images || [] } : n)
      : [...publications, { ...publicationForm, id: Date.now().toString(), slug: newSlug, createdAt: new Date().toISOString(), images: publicationForm.images || [] }];
    
    setPublications(updated);
    try {
      localStorage.setItem("admin_publications", JSON.stringify(updated));
    } catch {
      // Silently fail
    }
    
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("publications");
      if (!success) {
        alert("Yayın localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    }
    
    setShowPublicationForm(false);
    setEditingPublicationId(null);
    setPublicationForm({ title: "", summary: "", content: "", imageUrl: "", images: [], published: true });
  };

  const handlePublicationDelete = async (id: string) => {
    if (confirm("Bu yayını silmek istediğinizden emin misiniz?")) {
      const updated = publications.filter(n => n.id !== id);
      setPublications(updated);
      try {
        localStorage.setItem("admin_publications", JSON.stringify(updated));
      } catch {
        // Silently fail
      }
      
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        const success = await commitToGitHubAndDeploy("publications (delete)");
        if (!success) {
          alert("Yayın localStorage'dan silindi, ancak GitHub'a yüklenemedi.");
        }
      }
    }
  };

  const handlePublicationEdit = (item: News) => {
    setPublicationForm({ 
      title: item.title, 
      summary: item.summary, 
      content: item.content, 
      imageUrl: item.imageUrl || "", 
      images: item.images || [],
      published: item.published 
    });
    setEditingPublicationId(item.id);
    setShowPublicationForm(true);
  };

  // Project handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = editingProjectId 
      ? projects.find(p => p.id === editingProjectId)?.slug || createSlug(projectForm.title)
      : createSlug(projectForm.title);
    
    const updatedProjects = editingProjectId
      ? projects.map(p => p.id === editingProjectId ? { ...p, ...projectForm, slug: newSlug, id: editingProjectId, images: projectForm.images || [] } : p)
      : [...projects, { ...projectForm, id: Date.now().toString(), slug: newSlug, createdAt: new Date().toISOString(), images: projectForm.images || [] }];
    
    setProjects(updatedProjects);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem("admin_projects", JSON.stringify(updatedProjects));
      } catch {
        // Silently fail
      }
    }
    
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("projects");
      if (!success) {
        alert("Proje localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    }
    
    setShowProjectForm(false);
    setEditingProjectId(null);
    setProjectForm({ title: "", summary: "", content: "", imageUrl: "", images: [], published: true, status: "", location: "", startYear: "", videoUrl: "" });
  };

  const handleProjectDelete = async (id: string) => {
    if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem("admin_projects", JSON.stringify(updatedProjects));
        } catch {
          // Silently fail
        }
      }
      
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        const success = await commitToGitHubAndDeploy("projects (delete)");
        if (!success) {
          alert("Proje localStorage'dan silindi, ancak GitHub'a yüklenemedi.");
        }
      }
    }
  };

  const handleProjectEdit = (item: Project) => {
    setProjectForm({ 
      title: item.title, 
      summary: item.summary, 
      content: item.content, 
      imageUrl: item.imageUrl || "", 
      images: item.images || [],
      published: item.published,
      status: item.status || "",
      location: item.location || "",
      startYear: item.startYear || "",
      videoUrl: item.videoUrl || ""
    });
    setEditingProjectId(item.id);
    setShowProjectForm(true);
  };

  const deleteAllProjects = async () => {
    if (!confirm("⚠️ TÜM PROJELERİ SİLMEK İSTEDİĞİNİZDEN EMİN MİSİNİZ?\n\nBu işlem geri alınamaz!")) {
      return;
    }
    
    setProjects([]);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem("admin_projects", JSON.stringify([]));
      } catch {
        // Silently fail
      }
    }
    
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("projects (delete all)");
      if (success) {
        alert("✅ Tüm projeler silindi ve GitHub'a kaydedildi!");
      } else {
        alert("⚠️ Projeler localStorage'dan silindi, ancak GitHub'a yüklenemedi.");
      }
    }
  };

  // Resim yükleme fonksiyonu (GitHub'a base64 olarak kaydet)
  const uploadImageToGitHub = async (file: File, folder: "news" | "projects" | "publications" = "news"): Promise<string | null> => {
    if (typeof window === 'undefined' || typeof fetch === 'undefined' || typeof btoa === 'undefined') {
      return null;
    }

    if (!githubToken) {
      openTokenModal();
      return null;
    }

    setUploadingImage(true);
    try {
      // Dosyayı base64'e çevir
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // data:image/jpeg;base64, kısmını kaldır
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      const base64Content = await base64Promise;
      
      // Dosya adını oluştur (timestamp + random + extension)
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop() || 'jpg';
      const prefix = folder === "projects" ? "project" : folder === "publications" ? "publication" : "news";
      const fileName = `${prefix}-${timestamp}-${random}.${extension}`;
      const imagePath = `public/images/${folder}/${fileName}`;
      const publicUrl = `/images/${folder}/${fileName}`;

      // GitHub API: Create file
      const repo = "emrahguler635/durmusakkaya";
      const message = `Add ${prefix} image: ${fileName}`;

      const response = await fetch(`https://api.github.com/repos/${repo}/contents/${imagePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          content: base64Content
        })
      });

      if (response.ok) {
        return publicUrl;
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('GitHub API error:', errorData);
        const msg = errorData.message || 'Bilinmeyen hata';
        if (msg.toLowerCase().includes('bad credentials') || response.status === 401) {
          alert(`Resim yüklenemedi: GitHub token geçersiz veya süresi dolmuş.\n\nLütfen yeni bir token girip tekrar deneyin.`);
          openTokenModal();
        } else {
          alert(`Resim yüklenemedi: ${msg}`);
        }
        return null;
      }
    } catch (error: any) {
      console.error('Image upload error:', error);
      alert(`Resim yüklenirken hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Resim yükleme handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Resim boyutu 5MB'dan küçük olmalıdır.");
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      alert("Lütfen bir resim dosyası seçin.");
      return;
    }

    const uploadedUrl = await uploadImageToGitHub(file, "news");
    if (uploadedUrl) {
      // Ana görsel yoksa, yüklenen resmi ana görsel yap
      if (!newsForm.imageUrl) {
        setNewsForm({ ...newsForm, imageUrl: uploadedUrl, images: [...newsForm.images, uploadedUrl] });
      } else {
        setNewsForm({ ...newsForm, images: [...newsForm.images, uploadedUrl] });
      }
      alert("✅ Resim başarıyla yüklendi! Deploy işlemi otomatik başlatıldı.");
    }

    // Input'u temizle
    e.target.value = '';
  };

  const handlePublicationImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Resim boyutu 5MB'dan küçük olmalıdır.");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Lütfen bir resim dosyası seçin.");
      return;
    }

    const uploadedUrl = await uploadImageToGitHub(file, "publications");
    if (uploadedUrl) {
      if (!publicationForm.imageUrl) {
        setPublicationForm({ ...publicationForm, imageUrl: uploadedUrl, images: [...publicationForm.images, uploadedUrl] });
      } else {
        setPublicationForm({ ...publicationForm, images: [...publicationForm.images, uploadedUrl] });
      }
      alert("✅ Resim başarıyla yüklendi!");
    }

    e.target.value = '';
  };

  // Proje resim yükleme handler
  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Resim boyutu 5MB'dan küçük olmalıdır.");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Lütfen bir resim dosyası seçin.");
      return;
    }

    const uploadedUrl = await uploadImageToGitHub(file, "projects");
    if (uploadedUrl) {
      if (!projectForm.imageUrl) {
        setProjectForm({ ...projectForm, imageUrl: uploadedUrl, images: [...projectForm.images, uploadedUrl] });
      } else {
        setProjectForm({ ...projectForm, images: [...projectForm.images, uploadedUrl] });
      }
      alert("✅ Resim başarıyla yüklendi!");
    }

    e.target.value = '';
  };

  const handleProjectVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // GitHub Contents API large binary uploads become unreliable above ~90MB.
    if (file.size > 90 * 1024 * 1024) {
      alert("Video boyutu 90MB'dan küçük olmalıdır. Daha büyük videolar için YouTube veya Vimeo linki kullanın.");
      return;
    }

    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.type)) {
      alert("Lütfen mp4, webm veya ogg formatında bir video dosyası seçin.");
      return;
    }

    if (!githubToken) {
      openTokenModal();
      return;
    }

    setUploadingVideo(true);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      const base64Content = await base64Promise;
      
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop() || 'mp4';
      const fileName = `project-video-${timestamp}-${random}.${extension}`;
      const filePath = `public/videos/projects/${fileName}`;
      const publicUrl = `/videos/projects/${fileName}`;

      const repo = "emrahguler635/durmusakkaya";
      const message = `Add project video: ${fileName}`;

      const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          content: base64Content
        })
      });

      if (response.ok) {
        setProjectForm({ ...projectForm, videoUrl: publicUrl });
        alert("✅ Video başarıyla yüklendi!");
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        const errorMessage = errorData.message || "Bilinmeyen hata";
        if (response.status === 401 || String(errorMessage).toLowerCase().includes("bad credentials")) {
          alert("Video yüklenemedi: GitHub token geçersiz veya süresi dolmuş. Lütfen tokenı yenileyip tekrar deneyin.");
          openTokenModal();
        } else if (response.status === 413 || response.status === 422) {
          alert("Video yüklenemedi: Dosya GitHub API için çok büyük. Lütfen videoyu 90MB altına düşürün veya YouTube/Vimeo linki kullanın.");
        } else {
          alert(`Video yüklenemedi: ${errorMessage}`);
        }
      }
    } catch (error: any) {
      alert(`Video yüklenirken hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  // GitHub commit and deploy function (ONLY called from user actions, never during build)
  const commitToGitHubAndDeploy = async (dataType: string): Promise<boolean> => {
    // Double check - should never happen during build
    if (typeof window === 'undefined' || typeof fetch === 'undefined' || typeof btoa === 'undefined') {
      return false;
    }
    
    if (!githubToken) {
      openTokenModal();
      return false;
    }

    setIsSaving(true);
    try {
      // Save token to localStorage (persistent storage)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("github_token", githubToken);
      }

      // Use React state as source of truth so saving one section never wipes another.
      // For sections we are not editing right now, fall back to the local draft and then
      // to the published data, so an unrelated save can never reset them to the defaults.
      const keepSection = <T,>(
        isEditing: boolean,
        stateValue: T,
        storageKey: string,
        publishedValue: any
      ): T => {
        if (isEditing) return stateValue;
        if (typeof localStorage !== "undefined") {
          try {
            const saved = localStorage.getItem(storageKey);
            if (saved) return JSON.parse(saved) as T;
          } catch {
            // Silently fail
          }
        }
        return publishedValue ?? stateValue;
      };

      const homeDataToSave = keepSection(
        dataType.startsWith("home"),
        homeData,
        "admin_homepage",
        adminHomeData?.hero ? adminHomeData : null
      );
      const aboutDataToSave = keepSection(
        dataType.startsWith("about"),
        aboutData,
        "admin_aboutpage",
        adminAboutData?.bio ? adminAboutData : null
      );
      const contactDataToSave = keepSection(
        dataType.startsWith("contact"),
        contactData,
        "admin_contactpage",
        adminContactData?.contactInfo ? adminContactData : null
      );
      let newsToSave: News[] = news;
      let publicationsToSave: News[] = publications;
      let projectsToSave: Project[] = projects;

      // If we're saving something other than news/projects/publications, never overwrite
      // published data with an empty array (e.g. localStorage was missing).
      const savingNews = dataType.startsWith("news");
      const savingPublications = dataType.startsWith("publications");
      const savingProjects = dataType.startsWith("projects");
      if (!savingNews && newsToSave.length === 0 && Array.isArray(adminNewsData) && adminNewsData.length > 0) {
        newsToSave = adminNewsData;
      }
      if (!savingPublications && publicationsToSave.length === 0 && Array.isArray(adminPublicationsData) && adminPublicationsData.length > 0) {
        publicationsToSave = adminPublicationsData;
      }
      if (!savingProjects && projectsToSave.length === 0 && Array.isArray(adminProjectsData) && adminProjectsData.length > 0) {
        projectsToSave = adminProjectsData;
      }
      if (typeof localStorage !== 'undefined') {
        try {
          if (!savingNews && newsToSave.length === 0) {
            const savedNews = localStorage.getItem("admin_news");
            if (savedNews) {
              const parsed = JSON.parse(savedNews);
              if (Array.isArray(parsed) && parsed.length > 0) newsToSave = parsed;
            }
          }
          if (!savingPublications && publicationsToSave.length === 0) {
            const savedPublications = localStorage.getItem("admin_publications");
            if (savedPublications) {
              const parsed = JSON.parse(savedPublications);
              if (Array.isArray(parsed) && parsed.length > 0) publicationsToSave = parsed;
            }
          }
          if (!savingProjects && projectsToSave.length === 0) {
            const savedProjects = localStorage.getItem("admin_projects");
            if (savedProjects) {
              const parsed = JSON.parse(savedProjects);
              if (Array.isArray(parsed) && parsed.length > 0) projectsToSave = parsed;
            }
          }
        } catch (e) {
          // Silently fail
        }
      }

      // Create data file content (build-safe: always valid TypeScript)
      // Escape any backticks or template literals in JSON to prevent syntax errors
      const safeStringify = (obj: any) => {
        return JSON.stringify(obj, null, 2).replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      };
      
      const dataFileContent = `// Auto-generated data file - DO NOT EDIT MANUALLY
// This file is generated from admin panel changes
// Note: This file is used by both server and client components

export const adminHomeData: any = ${safeStringify(homeDataToSave)};
export const adminAboutData: any = ${safeStringify(aboutDataToSave)};
export const adminContactData: any = ${safeStringify(contactDataToSave)};
export const adminNewsData: any = ${safeStringify(newsToSave)};
export const adminProjectsData: any = ${safeStringify(projectsToSave)};
export const adminPublicationsData: any = ${safeStringify(publicationsToSave)};
`;

      // GitHub API: Create or update file
      const repo = "emrahguler635/durmusakkaya";
      // Fixed path: use lib/admin-data.ts instead of durmus_akkaya_website/nextjs_space/lib/admin-data.ts
      const path = "lib/admin-data.ts";
      const message = `Update ${dataType} from admin panel - ${new Date().toISOString()}`;
      
      // Get current file SHA if exists
      let sha = null;
      try {
        const getFileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          sha = fileData.sha;
        }
      } catch (e) {
        // File doesn't exist, will create new
      }

      // Encode content to base64 (browser API, only available client-side)
      const content = btoa(unescape(encodeURIComponent(dataFileContent)));

      // Create or update file
      console.log('Committing to GitHub:', { repo, path, message, hasSha: !!sha });
      const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          content: content,
          sha: sha
        })
      });

      console.log('GitHub API response status:', response.status, response.statusText);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('GitHub commit successful:', responseData.commit?.sha);
        // Trigger workflow dispatch
        try {
          const workflowResponse = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/deploy.yml/dispatches`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ref: 'main'
            })
          });
          
          if (workflowResponse.ok) {
            alert("✅ Değişiklikler GitHub'a kaydedildi ve deploy başlatıldı! Birkaç dakika içinde web sitesinde görünecek.");
            return true;
          } else {
            alert("✅ Değişiklikler GitHub'a kaydedildi! Ancak deploy başlatılamadı. Lütfen GitHub Actions sayfasından manuel olarak deploy başlatın.");
            return true;
          }
        } catch (e) {
          alert("✅ Değişiklikler GitHub'a kaydedildi! Ancak deploy başlatılamadı. Lütfen GitHub Actions sayfasından manuel olarak deploy başlatın.");
          return true;
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('GitHub API error:', errorData);
        const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        alert(`❌ GitHub'a kaydedilemedi!\n\nHata: ${errorMessage}\n\nLütfen:\n1. Token'ın doğru olduğundan emin olun\n2. Token'ın 'repo' izinlerine sahip olduğundan emin olun`);
        if (response.status === 401 || String(errorMessage).toLowerCase().includes("bad credentials")) {
          openTokenModal();
        }
        return false;
      }
    } catch (error: any) {
      alert(`❌ Hata: ${error.message || 'Bir hata oluştu'}`);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Home page handlers
  const handleHomeSave = async () => {
    saveHomePageData(homeData);
    // Only commit to GitHub if we're in browser (not during build)
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("home page");
      if (!success) {
        alert("Ana sayfa localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    } else {
      alert("Ana sayfa başarıyla kaydedildi!");
    }
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
  const handleAboutSave = async () => {
    saveAboutPageData(aboutData);
    // Only commit to GitHub if we're in browser (not during build)
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("about page");
      if (!success) {
        alert("Hakkında sayfası localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    } else {
      alert("Hakkında sayfası başarıyla kaydedildi!");
    }
  };

  const handleCareerAdd = () => {
    const newCareer = {
      id: Date.now().toString(),
      title: careerForm.title,
      company: careerForm.company,
      employmentType: careerForm.employmentType,
      startDate: careerForm.startDate,
      endDate: careerForm.endDate,
      duration: careerForm.duration,
      location: careerForm.location || undefined,
      description: careerForm.description || undefined,
      logo: careerForm.logo || undefined
    };
    setAboutData({
      ...aboutData,
      career: [...aboutData.career, newCareer]
    });
    setCareerForm({ 
      title: "", 
      company: "", 
      employmentType: "Tam zamanlı", 
      startDate: "", 
      endDate: "", 
      duration: "", 
      location: "", 
      description: "",
      logo: ""
    });
  };

  const handleCareerEdit = (id: string) => {
    const career = aboutData.career.find(c => c.id === id);
    if (career) {
      setCareerForm({ 
        title: career.title || "", 
        company: career.company || "", 
        employmentType: career.employmentType || "Tam zamanlı",
        startDate: career.startDate || career.period?.split(" - ")[0] || "",
        endDate: career.endDate || (career.period?.includes("Günümüz") || career.period?.includes("Halen") ? "Halen" : career.period?.split(" - ")[1] || ""),
        duration: career.duration || "",
        location: career.location || "",
        description: career.description || "",
        logo: career.logo || ""
      });
      setEditingCareerId(id);
    }
  };

  const handleCareerUpdate = () => {
    if (editingCareerId) {
      setAboutData({
        ...aboutData,
        career: aboutData.career.map(c => 
          c.id === editingCareerId 
            ? { 
                ...c, 
                title: careerForm.title,
                company: careerForm.company,
                employmentType: careerForm.employmentType,
                startDate: careerForm.startDate,
                endDate: careerForm.endDate,
                duration: careerForm.duration,
                location: careerForm.location || undefined,
                description: careerForm.description || undefined,
                logo: careerForm.logo || undefined
              }
            : c
        )
      });
      setEditingCareerId(null);
      setCareerForm({ 
        title: "", 
        company: "", 
        employmentType: "Tam zamanlı", 
        startDate: "", 
        endDate: "", 
        duration: "", 
        location: "", 
        description: "",
        logo: ""
      });
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

  const moveCareer = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= aboutData.career.length) return;
    const career = [...aboutData.career];
    [career[index], career[target]] = [career[target], career[index]];
    setAboutData({ ...aboutData, career });
  };

  const moveEducation = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= aboutData.education.length) return;
    const education = [...aboutData.education];
    [education[index], education[target]] = [education[target], education[index]];
    setAboutData({ ...aboutData, education });
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
  const handleContactSave = async () => {
    saveContactPageData(contactData);
    // Only commit to GitHub if we're in browser (not during build)
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      const success = await commitToGitHubAndDeploy("contact page");
      if (!success) {
        alert("İletişim sayfası localStorage'a kaydedildi, ancak GitHub'a yüklenemedi.");
      }
    } else {
      alert("İletişim sayfası başarıyla kaydedildi!");
    }
  };

  const handleDeploy = async () => {
    if (!confirm("GitHub Pages'e deploy başlatmak istediğinizden emin misiniz? Bu işlem birkaç dakika sürebilir.")) {
      return;
    }

    try {
      // GitHub Actions workflow'unu tetiklemek için GitHub API kullanıyoruz
      // Not: Bu için GitHub Personal Access Token gerekir, ancak güvenlik nedeniyle
      // kullanıcıyı GitHub Actions sayfasına yönlendiriyoruz
      const repoUrl = "https://github.com/emrahguler635/durmusakkaya/actions/workflows/deploy.yml";
      window.open(repoUrl, "_blank");
      alert("GitHub Actions sayfası açıldı. 'Run workflow' butonuna tıklayarak deploy başlatabilirsiniz.");
    } catch (error) {
      alert("Deploy başlatılamadı. Lütfen GitHub Actions sayfasından manuel olarak başlatın.");
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      try {
        sessionStorage.removeItem("admin_authenticated");
      } catch {
        // Silently fail
      }
    }
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex flex-wrap gap-2 items-center">
            {mounted && (
              <button
                onClick={openTokenModal}
                className={`px-3 py-2 rounded-lg text-sm ${githubToken ? "bg-gray-600 hover:bg-gray-700" : "bg-orange-500 hover:bg-orange-600"} text-white`}
              >
                {githubToken ? "Token Değiştir" : "Token Ekle"}
              </button>
            )}
            {mounted && isSaving && (
              <span className="text-sm text-yellow-300">Kaydediliyor...</span>
            )}
            <button onClick={handleDeploy} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-white">
              <Rocket size={18} /> Deploy Başlat
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              <LogOut size={18} /> Çıkış
            </button>
          </div>
        </div>
      </header>

      {showTokenInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">GitHub Token Gerekli</h2>
            <p className="text-sm text-gray-600 mb-4">
              Haber veya proje kaydetmek için GitHub Personal Access Token girin.
              Token bu tarayıcıda saklanır; başka bilgisayarda bir kez daha girmeniz gerekir.
            </p>
            <ol className="text-sm text-gray-600 list-decimal list-inside mb-4 space-y-1">
              <li>
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  github.com/settings/tokens
                </a>
                {" "}adresine gidin
              </li>
              <li><strong>Generate new token (classic)</strong> ile oluşturun</li>
              <li><strong>repo</strong> iznini işaretleyin</li>
              <li>Oluşan <code className="bg-gray-100 px-1 rounded">ghp_...</code> token’ı aşağıya yapıştırın</li>
            </ol>
            <input
              type="password"
              placeholder="ghp_..."
              value={tokenDraft}
              onChange={(e) => setTokenDraft(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 mb-4"
              autoFocus
            />
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowTokenInput(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800"
              >
                İptal
              </button>
              {githubToken && (
                <button
                  type="button"
                  onClick={clearGithubToken}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Temizle
                </button>
              )}
              <button
                type="button"
                onClick={saveGithubToken}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button onClick={() => setTab("publications")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "publications" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <BookOpen size={18} /> Akademik Yayınlar
          </button>
          <button onClick={() => setTab("projects")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "projects" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Briefcase size={18} /> Projeler
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

            {/* Projects Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Projeler Bölümü</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input 
                    type="text" 
                    value={homeData.projectsSection?.title || "Projeler"}
                    onChange={(e) => setHomeData({ ...homeData, projectsSection: { ...homeData.projectsSection, title: e.target.value, description: homeData.projectsSection?.description || "" } })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <input 
                    type="text" 
                    value={homeData.projectsSection?.description || ""}
                    onChange={(e) => setHomeData({ ...homeData, projectsSection: { ...homeData.projectsSection, title: homeData.projectsSection?.title || "Projeler", description: e.target.value } })}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Yürütülen ve tamamlanan projeler • Toplam {count} proje"
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
              <p className="text-sm text-gray-500 mb-3">Sırayı değiştirmek için ▲ ▼ butonlarını kullanın. En üstteki kayıt sitede en üstte görünür.</p>
              <div className="space-y-4 mb-4">
                {aboutData.career.map((career: any, index: number) => (
                  <div key={career.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => moveCareer(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Yukarı taşı"
                      >
                        <ChevronUp size={18} className="text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveCareer(index, "down")}
                        disabled={index === aboutData.career.length - 1}
                        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Aşağı taşı"
                      >
                        <ChevronDown size={18} className="text-gray-700" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{career.title}</div>
                      <div className="text-sm text-blue-600">
                        {career.company}
                        {career.employmentType && ` • ${career.employmentType}`}
                        {career.startDate && career.endDate && ` • ${career.startDate} - ${career.endDate}`}
                        {career.duration && ` • ${career.duration}`}
                      </div>
                      {career.location && <div className="text-sm text-gray-500 mt-1">{career.location}</div>}
                      {career.description && <div className="text-sm text-gray-600 mt-1">{career.description}</div>}
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
                  <input type="text" placeholder="Pozisyon (örn: Öğretim Üyesi)" value={careerForm.title} onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Organizasyon (örn: İstanbul Arel Üniversitesi)" value={careerForm.company} onChange={(e) => setCareerForm({ ...careerForm, company: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <select value={careerForm.employmentType} onChange={(e) => setCareerForm({ ...careerForm, employmentType: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                    <option value="Tam zamanlı">Tam zamanlı</option>
                    <option value="Yarı zamanlı">Yarı zamanlı</option>
                    <option value="Dönemsel">Dönemsel</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Başlangıç (örn: Eyl 2024)" value={careerForm.startDate} onChange={(e) => setCareerForm({ ...careerForm, startDate: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Bitiş (örn: Halen veya Mar 2023)" value={careerForm.endDate} onChange={(e) => setCareerForm({ ...careerForm, endDate: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <input type="text" placeholder="Süre (örn: 1 yıl 4 ay)" value={careerForm.duration} onChange={(e) => setCareerForm({ ...careerForm, duration: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Konum (opsiyonel, örn: İstanbul, Türkiye)" value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Logo URL (opsiyonel)" value={careerForm.logo} onChange={(e) => setCareerForm({ ...careerForm, logo: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea placeholder="Açıklama (opsiyonel)" value={careerForm.description} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                  <div className="flex gap-2">
                    <button onClick={handleCareerUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Güncelle</button>
                    <button onClick={() => { setEditingCareerId(null); setCareerForm({ title: "", company: "", employmentType: "Tam zamanlı", startDate: "", endDate: "", duration: "", location: "", description: "", logo: "" }); }} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">İptal</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <input type="text" placeholder="Pozisyon (örn: Öğretim Üyesi)" value={careerForm.title} onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Organizasyon (örn: İstanbul Arel Üniversitesi)" value={careerForm.company} onChange={(e) => setCareerForm({ ...careerForm, company: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <select value={careerForm.employmentType} onChange={(e) => setCareerForm({ ...careerForm, employmentType: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                    <option value="Tam zamanlı">Tam zamanlı</option>
                    <option value="Yarı zamanlı">Yarı zamanlı</option>
                    <option value="Dönemsel">Dönemsel</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Başlangıç (örn: Eyl 2024)" value={careerForm.startDate} onChange={(e) => setCareerForm({ ...careerForm, startDate: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Bitiş (örn: Halen veya Mar 2023)" value={careerForm.endDate} onChange={(e) => setCareerForm({ ...careerForm, endDate: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <input type="text" placeholder="Süre (örn: 1 yıl 4 ay)" value={careerForm.duration} onChange={(e) => setCareerForm({ ...careerForm, duration: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Konum (opsiyonel, örn: İstanbul, Türkiye)" value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Logo URL (opsiyonel)" value={careerForm.logo} onChange={(e) => setCareerForm({ ...careerForm, logo: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea placeholder="Açıklama (opsiyonel)" value={careerForm.description} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                  <button onClick={handleCareerAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <Plus size={18} className="inline mr-2" /> Yeni Kariyer Ekle
                  </button>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Eğitim Geçmişi</h3>
              <p className="text-sm text-gray-500 mb-3">Sırayı değiştirmek için ▲ ▼ butonlarını kullanın.</p>
              <div className="space-y-4 mb-4">
                {aboutData.education.map((education, index) => (
                  <div key={education.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => moveEducation(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Yukarı taşı"
                      >
                        <ChevronUp size={18} className="text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveEducation(index, "down")}
                        disabled={index === aboutData.education.length - 1}
                        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Aşağı taşı"
                      >
                        <ChevronDown size={18} className="text-gray-700" />
                      </button>
                    </div>
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
              <div className="flex gap-2">
                <button onClick={deleteAllNews} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  🗑️ Tüm Haberleri Sil
                </button>
                <button onClick={fixAllNewsSlugs} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  🔧 Slug'ları Düzelt
                </button>
                <button onClick={() => { setShowNewsForm(true); setEditingNewsId(null); setNewsForm({ title: "", summary: "", content: "", imageUrl: "", images: [], published: true }); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={18} /> Yeni Haber Ekle
              </button>
              </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ana Görsel (URL)</label>
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Görseller (Birden Fazla)</label>
                    <div className="space-y-3">
                      {/* Resim Yükleme Butonu */}
                      <div className="flex items-center gap-2">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="hidden"
                            id="image-upload"
                          />
                          <div className="px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-center">
                            {uploadingImage ? (
                              <span className="text-blue-600">⏳ Yükleniyor...</span>
                            ) : (
                              <span className="text-blue-600 flex items-center justify-center gap-2">
                                <ImageIcon size={18} /> Yeni Resim Yükle (Max 5MB)
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                      
                      {/* Yüklenen Görseller Listesi */}
                      {newsForm.images && newsForm.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {newsForm.images.map((imgUrl, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={getImagePath(imgUrl)} 
                                alt={`Görsel ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = newsForm.images.filter((_, i) => i !== index);
                                  setNewsForm({ ...newsForm, images: newImages });
                                  // Eğer silinen görsel ana görsel ise, ilk görseli ana görsel yap
                                  if (newsForm.imageUrl === imgUrl && newImages.length > 0) {
                                    setNewsForm({ ...newsForm, images: newImages, imageUrl: newImages[0] });
                                  } else if (newsForm.imageUrl === imgUrl) {
                                    setNewsForm({ ...newsForm, images: newImages, imageUrl: "" });
                                  } else {
                                    setNewsForm({ ...newsForm, images: newImages });
                                  }
                                }}
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={14} />
                              </button>
                              {newsForm.imageUrl === imgUrl && (
                                <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                  Ana
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => setNewsForm({ ...newsForm, imageUrl: imgUrl })}
                                className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Ana Yap
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* URL ile Görsel Ekleme */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Görsel URL'si ekle..."
                          className="flex-1 px-4 py-2 border rounded-lg"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const url = (e.target as HTMLInputElement).value.trim();
                              if (url && !newsForm.images.includes(url)) {
                                setNewsForm({ ...newsForm, images: [...newsForm.images, url] });
                                if (!newsForm.imageUrl) {
                                  setNewsForm({ ...newsForm, images: [...newsForm.images, url], imageUrl: url });
                                }
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            const url = input.value.trim();
                            if (url && !newsForm.images.includes(url)) {
                              setNewsForm({ ...newsForm, images: [...newsForm.images, url] });
                              if (!newsForm.imageUrl) {
                                setNewsForm({ ...newsForm, images: [...newsForm.images, url], imageUrl: url });
                              }
                              input.value = '';
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Ekle
                        </button>
                      </div>
                    </div>
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

        {/* Publications Tab */}
        {tab === "publications" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Akademik Yayınlar Yönetimi</h2>
              <button onClick={() => { setShowPublicationForm(true); setEditingPublicationId(null); setPublicationForm({ title: "", summary: "", content: "", imageUrl: "", images: [], published: true }); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18} /> Yeni Yayın Ekle
              </button>
            </div>

            {showPublicationForm && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingPublicationId ? "Yayın Düzenle" : "Yeni Yayın Ekle"}</h3>
                <form onSubmit={handlePublicationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <input 
                      type="text" 
                      required
                      value={publicationForm.title}
                      onChange={(e) => setPublicationForm({ ...publicationForm, title: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                    <textarea 
                      rows={2}
                      required
                      value={publicationForm.summary}
                      onChange={(e) => setPublicationForm({ ...publicationForm, summary: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                    <textarea 
                      rows={6}
                      required
                      value={publicationForm.content}
                      onChange={(e) => setPublicationForm({ ...publicationForm, content: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ana Görsel (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={publicationForm.imageUrl}
                        onChange={(e) => setPublicationForm({ ...publicationForm, imageUrl: e.target.value })}
                        className="flex-1 px-4 py-3 border rounded-lg"
                        placeholder="/images/publications/..."
                      />
                      <button type="button" onClick={() => setShowPublicationImageSelector(!showPublicationImageSelector)} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg">
                        <ImageIcon size={18} />
                      </button>
                    </div>
                    {showPublicationImageSelector && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-2">
                        {publicImages.map((img) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => { setPublicationForm({ ...publicationForm, imageUrl: img.url }); setShowPublicationImageSelector(false); }}
                            className="p-2 text-left hover:bg-blue-50 rounded"
                          >
                            {img.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Görseller (Birden Fazla)</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePublicationImageUpload}
                            disabled={uploadingImage}
                            className="hidden"
                            id="publication-image-upload"
                          />
                          <div className="px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-center">
                            {uploadingImage ? (
                              <span className="text-blue-600">⏳ Yükleniyor...</span>
                            ) : (
                              <span className="text-blue-600 flex items-center justify-center gap-2">
                                <ImageIcon size={18} /> Yeni Resim Yükle (Max 5MB)
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                      
                      {publicationForm.images && publicationForm.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {publicationForm.images.map((imgUrl, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={getImagePath(imgUrl)} 
                                alt={`Görsel ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = publicationForm.images.filter((_, i) => i !== index);
                                  if (publicationForm.imageUrl === imgUrl && newImages.length > 0) {
                                    setPublicationForm({ ...publicationForm, images: newImages, imageUrl: newImages[0] });
                                  } else if (publicationForm.imageUrl === imgUrl) {
                                    setPublicationForm({ ...publicationForm, images: newImages, imageUrl: "" });
                                  } else {
                                    setPublicationForm({ ...publicationForm, images: newImages });
                                  }
                                }}
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={14} />
                              </button>
                              {publicationForm.imageUrl === imgUrl && (
                                <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                  Ana
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => setPublicationForm({ ...publicationForm, imageUrl: imgUrl })}
                                className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Ana Yap
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={publicationForm.published}
                      onChange={(e) => setPublicationForm({ ...publicationForm, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium text-gray-700">Yayınla</label>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                      {editingPublicationId ? "Güncelle" : "Ekle"}
                    </button>
                    <button type="button" onClick={() => { setShowPublicationForm(false); setEditingPublicationId(null); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-md">
              {publications.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Başlık</th>
                      <th className="text-left py-3 px-4">Durum</th>
                      <th className="text-right py-3 px-4">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${item.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {item.published ? "Yayında" : "Taslak"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handlePublicationEdit(item)} className="p-2 hover:bg-blue-50 rounded mr-2">
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button onClick={() => handlePublicationDelete(item.id)} className="p-2 hover:bg-red-50 rounded">
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center py-8">Henüz akademik yayın eklenmemiş.</p>
              )}
            </div>
          </>
        )}

        {/* Projects Tab */}
        {tab === "projects" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Projeler Yönetimi</h2>
              <div className="flex gap-2">
                <button onClick={deleteAllProjects} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  🗑️ Tüm Projeleri Sil
                </button>
                <button onClick={() => { setShowProjectForm(true); setEditingProjectId(null); setProjectForm({ title: "", summary: "", content: "", imageUrl: "", images: [], published: true, status: "", location: "", startYear: "", videoUrl: "" }); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={18} /> Yeni Proje Ekle
                </button>
              </div>
            </div>

            {showProjectForm && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingProjectId ? "Proje Düzenle" : "Yeni Proje Ekle"}</h3>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                    <textarea 
                      rows={2}
                      required
                      value={projectForm.summary}
                      onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                    <textarea 
                      rows={6}
                      required
                      value={projectForm.content}
                      onChange={(e) => setProjectForm({ ...projectForm, content: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Proje Künyesi</h4>
                    <p className="text-xs text-gray-600 mb-4">Bu bilgiler proje detay sayfasında sağ taraftaki künye kutusunda gösterilir.</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Proje Durumu</label>
                        <select
                          value={projectForm.status}
                          onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                          className="w-full px-4 py-3 border rounded-lg bg-white"
                        >
                          <option value="">Seçiniz</option>
                          {projectStatusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasyon</label>
                        <input 
                          type="text" 
                          value={projectForm.location}
                          onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                          className="w-full px-4 py-3 border rounded-lg bg-white"
                          placeholder="Örn: Bağcılar, Güneşli"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlangıç Yılı</label>
                        <select
                          value={projectForm.startYear}
                          onChange={(e) => setProjectForm({ ...projectForm, startYear: e.target.value })}
                          className="w-full px-4 py-3 border rounded-lg bg-white"
                        >
                          <option value="">Seçiniz</option>
                          {projectYearOptions.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Proje Tanıtım Videosu</h4>
                    <p className="text-xs text-gray-600 mb-3">YouTube/Vimeo linki yapıştırın veya doğrudan video dosyası yükleyin (GitHub API sınırı nedeniyle max 90MB).</p>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        value={projectForm.videoUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg bg-white"
                        placeholder="Örn: https://www.youtube.com/watch?v=..."
                      />
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/ogg"
                            onChange={handleProjectVideoUpload}
                            disabled={uploadingVideo}
                            className="hidden"
                            id="project-video-upload"
                          />
                          <div className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-center">
                            {uploadingVideo ? (
                              <span className="text-gray-600">⏳ Video yükleniyor...</span>
                            ) : (
                              <span className="text-gray-700 flex items-center justify-center gap-2">
                                🎬 Video Dosyası Yükle (mp4, webm, ogg - Max 90MB)
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                      {projectForm.videoUrl && (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                          <span>✅ Video: {projectForm.videoUrl.length > 60 ? projectForm.videoUrl.substring(0, 60) + '...' : projectForm.videoUrl}</span>
                          <button type="button" onClick={() => setProjectForm({ ...projectForm, videoUrl: "" })} className="ml-auto text-red-500 hover:text-red-700 font-bold">✕</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ana Görsel (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={projectForm.imageUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                        className="flex-1 px-4 py-3 border rounded-lg"
                        placeholder="/proje1.jpg"
                      />
                      <button type="button" onClick={() => setShowProjectImageSelector(!showProjectImageSelector)} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg">
                        <ImageIcon size={18} />
                      </button>
                    </div>
                    {showProjectImageSelector && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg grid grid-cols-2 gap-2">
                        {publicImages.map((img) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => { setProjectForm({ ...projectForm, imageUrl: img.url }); setShowProjectImageSelector(false); }}
                            className="p-2 text-left hover:bg-blue-50 rounded"
                          >
                            {img.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Görseller (Birden Fazla)</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjectImageUpload}
                            disabled={uploadingImage}
                            className="hidden"
                            id="project-image-upload"
                          />
                          <div className="px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-center">
                            {uploadingImage ? (
                              <span className="text-blue-600">⏳ Yükleniyor...</span>
                            ) : (
                              <span className="text-blue-600 flex items-center justify-center gap-2">
                                <ImageIcon size={18} /> Yeni Resim Yükle (Max 5MB)
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                      
                      {projectForm.images && projectForm.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {projectForm.images.map((imgUrl, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={getImagePath(imgUrl)} 
                                alt={`Görsel ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = projectForm.images.filter((_, i) => i !== index);
                                  if (projectForm.imageUrl === imgUrl && newImages.length > 0) {
                                    setProjectForm({ ...projectForm, images: newImages, imageUrl: newImages[0] });
                                  } else if (projectForm.imageUrl === imgUrl) {
                                    setProjectForm({ ...projectForm, images: newImages, imageUrl: "" });
                                  } else {
                                    setProjectForm({ ...projectForm, images: newImages });
                                  }
                                }}
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={14} />
                              </button>
                              {projectForm.imageUrl === imgUrl && (
                                <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                  Ana
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => setProjectForm({ ...projectForm, imageUrl: imgUrl })}
                                className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Ana Yap
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Görsel URL'si ekle..."
                          className="flex-1 px-4 py-2 border rounded-lg"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const url = (e.target as HTMLInputElement).value.trim();
                              if (url && !projectForm.images.includes(url)) {
                                if (!projectForm.imageUrl) {
                                  setProjectForm({ ...projectForm, images: [...projectForm.images, url], imageUrl: url });
                                } else {
                                  setProjectForm({ ...projectForm, images: [...projectForm.images, url] });
                                }
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            const url = input.value.trim();
                            if (url && !projectForm.images.includes(url)) {
                              if (!projectForm.imageUrl) {
                                setProjectForm({ ...projectForm, images: [...projectForm.images, url], imageUrl: url });
                              } else {
                                setProjectForm({ ...projectForm, images: [...projectForm.images, url] });
                              }
                              input.value = '';
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={projectForm.published}
                      onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium text-gray-700">Yayınla</label>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                      {editingProjectId ? "Güncelle" : "Ekle"}
                    </button>
                    <button type="button" onClick={() => { setShowProjectForm(false); setEditingProjectId(null); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-md">
              {projects.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Başlık</th>
                      <th className="text-left py-3 px-4">Lokasyon</th>
                      <th className="text-left py-3 px-4">Proje Durumu</th>
                      <th className="text-left py-3 px-4">Yayın</th>
                      <th className="text-right py-3 px-4">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.location || "—"}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.status || "—"}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${item.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {item.published ? "Yayında" : "Taslak"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handleProjectEdit(item)} className="p-2 hover:bg-blue-50 rounded mr-2">
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button onClick={() => handleProjectDelete(item.id)} className="p-2 hover:bg-red-50 rounded">
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center py-8">Henüz proje eklenmemiş.</p>
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

