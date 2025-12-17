import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, Award, Linkedin, Twitter, Mail } from "lucide-react";
import NewsCard from "@/components/news-card";
import HeroSlider from "@/components/hero-slider";

// Static data for GitHub Pages
const news = [
  {
    id: "1",
    title: "Yılın CEO'su Ödülü",
    summary: "Dr. Durmuş AKKAYA, yılın en başarılı CEO'su seçildi.",
    content: "",
    slug: "yilin-ceo-odu",
    published: true,
    imageUrl: null,
    createdAt: "2024-11-15T00:00:00.000Z",
    updatedAt: "2024-11-15T00:00:00.000Z"
  },
  {
    id: "2",
    title: "Yeni Stratejik Ortaklık",
    summary: "Başak A.Ş. yeni stratejik ortaklık anlaşması imzaladı.",
    content: "",
    slug: "yeni-stratejik-ortaklik",
    published: true,
    imageUrl: null,
    createdAt: "2024-10-03T00:00:00.000Z",
    updatedAt: "2024-10-03T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Sürdürülebilirlik Zirvesi",
    summary: "Sürdürülebilirlik konulu önemli bir zirve düzenlendi.",
    content: "",
    slug: "surdurulebilirlik-zirvesi",
    published: true,
    imageUrl: null,
    createdAt: "2024-09-22T00:00:00.000Z",
    updatedAt: "2024-09-22T00:00:00.000Z"
  }
];

export default function HomePage() {

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <HeroSlider />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl text-white">
            <p className="text-blue-200 font-medium mb-4">Hoş Geldiniz</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Dr. Durmuş <span className="text-yellow-400">AKKAYA</span>
            </h1>
            <p className="text-xl text-blue-100 mb-4">Başak A.Ş. Genel Müdürü</p>
            <p className="text-blue-200 mb-8 text-lg">
              Yılların deneyimi ve vizyoner liderlik anlayışıyla kurumsal başarıyı hedefleyen bir yönetici.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/hakkinda" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                Hakkımda <ArrowRight size={18} />
              </Link>
              <Link href="/iletisim" className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Liderlik</h3>
              <p className="text-gray-600">Yılların yöneticilik deneyimi ve stratejik vizyon</p>
            </div>
            <div className="bg-yellow-50 p-8 rounded-xl text-center">
              <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Başarı</h3>
              <p className="text-gray-600">Sürdürülebilir büyüme ve kurumsal başarılar</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">İletişim</h3>
              <p className="text-gray-600">Açık iletişim ve iş birliği odaklı yaklaşım</p>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Son Haberler</h2>
              <p className="text-gray-600 mt-2">Güncel gelişmeler ve duyurular • Toplam {news.length} haber</p>
            </div>
            <Link href="/haberler" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center gap-1">
              Tümü <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(news ?? []).length > 0 ? (
              (news ?? []).map((item) => (
                <NewsCard key={item.id} {...item} createdAt={item.createdAt} imageUrl={item.imageUrl ?? undefined} />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-8">Henüz haber bulunmamaktadır.</p>
            )}
          </div>
        </div>
      </section>

      
    </div>
  );
}
