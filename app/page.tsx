"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Award, Mail } from "lucide-react";
import NewsCard from "@/components/news-card";
import HeroSlider from "@/components/hero-slider";
import { getLatestNews, allNews } from "@/lib/news-data";
import { getHomePageData, type HomePageData } from "@/lib/page-data";

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const news = getLatestNews(3);

  useEffect(() => {
    const data = getHomePageData();
    setHomeData(data);
  }, []);

  if (!homeData) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  const highlightIcons = [Briefcase, Award, Mail];
  const highlightColors = [
    { bg: "bg-blue-50", icon: "bg-blue-600" },
    { bg: "bg-yellow-50", icon: "bg-yellow-500" },
    { bg: "bg-blue-50", icon: "bg-blue-600" }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <HeroSlider />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl text-white">
            <p className="text-blue-200 font-medium mb-4">{homeData.hero.welcomeText}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {homeData.hero.title.split(" ").map((word, i, arr) => 
                i === arr.length - 1 ? (
                  <span key={i} className="text-white">{word}</span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>
            <p className="text-xl text-blue-100 mb-4">{homeData.hero.subtitle}</p>
            <p className="text-blue-200 mb-8 text-lg">
              {homeData.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/hakkinda" className="bg-white hover:bg-white/90 text-blue-900 font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
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
            {homeData.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              const colors = highlightColors[index % highlightColors.length];
              return (
                <div key={highlight.id} className={`${colors.bg} p-8 rounded-xl text-center`}>
                  <div className={`w-14 h-14 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{homeData.newsSection.title}</h2>
              <p className="text-gray-600 mt-2">
                {homeData.newsSection.description.replace("{count}", allNews.length.toString())}
              </p>
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
