import Image from "next/image";
import { GraduationCap, Briefcase, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hakkımda</h1>
          <p className="text-blue-200 text-lg">Kariyer yolculuğum ve vizyon</p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Dr. Durmuş AKKAYA"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Dr. Durmuş <span className="text-blue-600">AKKAYA</span></h2>
              <p className="text-blue-600 font-medium mb-6">Başak A.Ş. Genel Müdürü</p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Uzun yılların iş deneyimi ve akademik birikimle donanmış bir lider olarak, kurumsal yönetim ve stratejik planlama alanlarında geniş bir vizyona sahibim.
                </p>
                <p>
                  Başak A.Ş.'nin büyümesine ve sektörde öncü konuma gelmesine liderlik etmekten gurur duyuyorum. İnovasyon, sürdürülebilirlik ve müşteri memnuniyeti odaklı yaklaşımımız sayesinde şirketimiz istikrarlı bir büyüme süreci yaşamaktadır.
                </p>
                <p>
                  Ekip çalışmasına ve yenilikçi düşünceye olan inancım, başarılı projelerin temelini oluşturmaktadır.
                </p>
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
            <div className="bg-white p-6 rounded-xl shadow-md flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Genel Müdür</h3>
                <p className="text-blue-600">Başak A.Ş. | 2018 - Günümüz</p>
                <p className="text-gray-600 mt-2">Şirketin genel yönetimi, stratejik planlama ve büyüme hedeflerinin belirlenmesi</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Genel Müdür Yardımcısı</h3>
                <p className="text-blue-600">Başak A.Ş. | 2014 - 2018</p>
                <p className="text-gray-600 mt-2">Operasyonel süreçlerin yönetimi ve iyileştirilmesi</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Bölüm Müdürü</h3>
                <p className="text-blue-600">Başak A.Ş. | 2010 - 2014</p>
                <p className="text-gray-600 mt-2">Satış ve pazarlama bölümünün yönetimi</p>
              </div>
            </div>
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
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-blue-600" size={28} />
                <h3 className="font-semibold text-gray-900">Doktora</h3>
              </div>
              <p className="text-gray-700">Işletme Yönetimi</p>
              <p className="text-gray-500 text-sm mt-1">2008 - 2012</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-yellow-600" size={28} />
                <h3 className="font-semibold text-gray-900">Yüksek Lisans</h3>
              </div>
              <p className="text-gray-700">MBA - İşletme</p>
              <p className="text-gray-500 text-sm mt-1">2005 - 2007</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
