"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GraduationCap, Briefcase, Award, Target } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminAboutData } from "@/lib/admin-data";

// Static about page data (fallback)
const staticAboutData = {
  header: {
    title: "Hakkımda",
    subtitle: "Kariyer yolculuğum ve vizyon"
  },
  bio: {
    name: "Dr. Durmuş AKKAYA",
    role: "Başak A.Ş. Yönetim Kurulu Başkanı",
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

export default function AboutPage() {
  // Use admin data if available, otherwise use static data
  const aboutData = (adminAboutData && Object.keys(adminAboutData).length > 0) ? adminAboutData : staticAboutData;
  const careerIcons = [Briefcase, Target, Award];

  // Sort career by date (newest first)
  const sortedCareer = [...(aboutData.career || [])].sort((a: any, b: any) => {
    const parseDate = (dateStr: string): number => {
      if (!dateStr || dateStr === "Halen" || dateStr === "Günümüz" || dateStr.toLowerCase().includes("halen")) {
        return Infinity; // Current positions get highest priority
      }
      
      // Parse Turkish month names
      const monthMap: { [key: string]: number } = {
        "oca": 1, "şub": 2, "mar": 3, "nis": 4, "may": 5, "haz": 6,
        "tem": 7, "ağu": 8, "eyl": 9, "eki": 10, "kas": 11, "ara": 12
      };
      
      const parts = dateStr.trim().split(" ");
      if (parts.length === 2) {
        const month = monthMap[parts[0].toLowerCase()] || 0;
        const year = parseInt(parts[1]) || 0;
        return year * 12 + month;
      }
      return 0;
    };

    const aEndDate = a.endDate || a.period?.split(" - ")[1] || "";
    const bEndDate = b.endDate || b.period?.split(" - ")[1] || "";
    
    const aDate = parseDate(aEndDate);
    const bDate = parseDate(bEndDate);
    
    // If both are current (Infinity), compare start dates
    if (aDate === Infinity && bDate === Infinity) {
      const aStartDate = a.startDate || a.period?.split(" - ")[0] || "";
      const bStartDate = b.startDate || b.period?.split(" - ")[0] || "";
      return parseDate(bStartDate) - parseDate(aStartDate);
    }
    
    return bDate - aDate; // Descending order (newest first)
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{aboutData.header.title}</h1>
          <p className="text-blue-200 text-lg">{aboutData.header.subtitle}</p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-xl">
              <Image
                src={getImagePath(aboutData.bio.profileImage)}
                alt={aboutData.bio.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {aboutData.bio.name.split(" ").map((word, i, arr) => 
                  i === arr.length - 1 ? (
                    <span key={i} className="text-blue-600">{word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
              <p className="text-blue-600 font-medium mb-6">{aboutData.bio.role}</p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {aboutData.bio.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kariyer Geçmişi</h2>
            <p className="text-gray-600">Profesyonel deneyim ve başarılar</p>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {sortedCareer.map((career: any, index: number) => {
              const Icon = careerIcons[index % careerIcons.length];
              const iconColors = [
                { bg: "bg-blue-100", text: "text-blue-600" },
                { bg: "bg-yellow-100", text: "text-yellow-600" },
                { bg: "bg-green-100", text: "text-green-600" },
                { bg: "bg-purple-100", text: "text-purple-600" }
              ];
              const colors = iconColors[index % iconColors.length];
              const period = career.startDate && career.endDate 
                ? `${career.startDate} - ${career.endDate}` 
                : career.period || "";
              
              return (
                <div key={career.id}>
                  <div className="flex gap-4 p-6 hover:bg-gray-50 transition-colors">
                    {/* Logo/Icon */}
                    <div className="flex-shrink-0">
                      {career.logo ? (
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          <Image
                            src={getImagePath(career.logo)}
                            alt={career.company}
                            width={56}
                            height={56}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 ${colors.bg} rounded-full flex items-center justify-center`}>
                          <Icon className={colors.text} size={28} />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{career.title}</h3>
                      <p className="text-gray-700 font-medium mb-2">
                        {career.company}
                        {career.employmentType && (
                          <span className="text-gray-500 font-normal"> · {career.employmentType}</span>
                        )}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600 mb-2">
                        {period && (
                          <span>{period}</span>
                        )}
                        {career.duration && period && (
                          <span> · </span>
                        )}
                        {career.duration && (
                          <span>{career.duration}</span>
                        )}
                      </div>
                      
                      {career.location && (
                        <p className="text-sm text-gray-500 mb-2">{career.location}</p>
                      )}
                      
                      {career.description && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{career.description}</p>
                      )}
                    </div>
                  </div>
                  {index < sortedCareer.length - 1 && (
                    <div className="border-t border-gray-200 mx-6"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Eğitim</h2>
            <p className="text-gray-600">Akademik geçmiş</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {aboutData.education.map((education, index) => {
              const bgColors = ["bg-blue-50", "bg-yellow-50"];
              const textColors = ["text-blue-600", "text-yellow-600"];
              const bgColor = bgColors[index % bgColors.length];
              const textColor = textColors[index % textColors.length];
              return (
                <div key={education.id} className={`${bgColor} p-6 rounded-xl`}>
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className={textColor} size={28} />
                    <h3 className="font-semibold text-gray-900">{education.degree}</h3>
                  </div>
                  <p className="text-gray-700">{education.field}</p>
                  <p className="text-gray-500 text-sm mt-1">{education.period}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
