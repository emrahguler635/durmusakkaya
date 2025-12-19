"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GraduationCap, Briefcase, Award, Target } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { adminAboutData } from "@/lib/admin-data";

// Static about page data
const staticAboutData = {
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

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(adminAboutData || staticAboutData);
  const careerIcons = [Briefcase, Target, Award];

  useEffect(() => {
    if (adminAboutData) {
      setAboutData(adminAboutData);
    }
  }, []);

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
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kariyer Geçmişi</h2>
            <p className="text-gray-600">Profesyonel deneyim ve başarılar</p>
          </div>
          <div className="space-y-6">
            {aboutData.career.map((career, index) => {
              const Icon = careerIcons[index % careerIcons.length];
              const iconColors = [
                { bg: "bg-blue-100", text: "text-blue-600" },
                { bg: "bg-yellow-100", text: "text-yellow-600" },
                { bg: "bg-blue-100", text: "text-blue-600" }
              ];
              const colors = iconColors[index % iconColors.length];
              return (
                <div key={career.id} className="bg-white p-6 rounded-xl shadow-md flex gap-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={colors.text} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{career.title}</h3>
                    <p className="text-blue-600">{career.company} | {career.period}</p>
                    <p className="text-gray-600 mt-2">{career.description}</p>
                  </div>
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
