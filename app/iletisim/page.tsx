"use client";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./_components/contact-form";

// Static contact page data
const staticContactData = {
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

export default function ContactPage() {
  const [contactData, setContactData] = useState(staticContactData);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem("admin_contactpage");
        if (saved) {
          setContactData(JSON.parse(saved));
        }
      } catch (e) {
        // Silently fail, use static data
      }
    }
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{contactData.header.title}</h1>
          <p className="text-blue-200 text-lg">{contactData.header.subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adres</h3>
                    <p className="text-gray-600 whitespace-pre-line">{contactData.contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telefon</h3>
                    <p className="text-gray-600">{contactData.contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-posta</h3>
                    <p className="text-gray-600">{contactData.contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Çalışma Saatleri</h3>
                    <p className="text-gray-600">{contactData.contactInfo.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mesaj Gönder</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
