"use client";
import { Facebook, Instagram, Twitter, ExternalLink, Users, FileText } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/DrDurmsAKKAYA";
const INSTAGRAM_URL = "https://www.instagram.com/dr.durmusakkaya64/";
const X_URL = "https://x.com/drdurmusakkaya";

export default function SocialFeeds() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Sosyal Medya</h2>
          <p className="text-gray-600">
            Facebook, Instagram ve X hesaplarından güncel paylaşımları takip edin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Facebook */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Facebook size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Facebook</h3>
                  <p className="text-xs text-gray-500">DrDurmsAKKAYA</p>
                </div>
              </div>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                Git <ExternalLink size={12} />
              </a>
            </div>
            <div className="flex justify-center p-3 bg-white min-h-[560px]">
              <iframe
                title="Facebook Paylaşımları"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_URL)}&tabs=timeline&width=340&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                width="340"
                height="560"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center">
                  <Instagram size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instagram</h3>
                  <p className="text-xs text-gray-500">@dr.durmusakkaya64</p>
                </div>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-800"
              >
                Git <ExternalLink size={12} />
              </a>
            </div>
            <div className="flex justify-center p-3 bg-white min-h-[560px]">
              <iframe
                title="Instagram Paylaşımları"
                src="https://www.instagram.com/dr.durmusakkaya64/embed"
                width="340"
                height="560"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
          </div>

          {/* X - profile card (X ücretsiz timeline gömüsünü rate-limit ile engelliyor) */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <Twitter size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">X</h3>
                  <p className="text-xs text-gray-500">@DrDurmusAkkaya</p>
                </div>
              </div>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-800 hover:text-black"
              >
                Git <ExternalLink size={12} />
              </a>
            </div>

            <div className="bg-white flex-1 p-5 flex flex-col min-h-[560px]">
              <div className="h-20 rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 mb-4" />

              <div className="-mt-10 mb-3 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-black border-4 border-white text-white flex items-center justify-center shadow-md">
                  <Twitter size={26} />
                </div>
              </div>

              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-gray-900">Dr. Durmuş AKKAYA</h4>
                <p className="text-gray-500 text-sm mb-2">@DrDurmusAkkaya</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Bağcılar Belediyesi BAŞAK A.Ş. Yönetim Kurulu Başkanı.
                  Önceden Uşak Belediye Başkan Yardımcısı.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
                  <Users className="mx-auto text-gray-700 mb-1" size={18} />
                  <div className="text-sm font-semibold text-gray-900">Takipçiler</div>
                  <div className="text-xs text-gray-500">X’te görüntüle</div>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
                  <FileText className="mx-auto text-gray-700 mb-1" size={18} />
                  <div className="text-sm font-semibold text-gray-900">Paylaşımlar</div>
                  <div className="text-xs text-gray-500">Güncel gönderiler</div>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  X’te Paylaşımları Gör <ExternalLink size={16} />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl transition-colors"
                >
                  @DrDurmusAkkaya’yı Takip Et
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

