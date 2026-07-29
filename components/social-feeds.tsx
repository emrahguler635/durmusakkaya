"use client";
import { Facebook, Instagram, Twitter, ExternalLink } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/DrDurmsAKKAYA";
const INSTAGRAM_URL = "https://www.instagram.com/dr.durmusakkaya64/";
const X_URL = "https://x.com/drdurmusakkaya";
const X_EMBED_URL =
  "https://syndication.twitter.com/srv/timeline-profile/screen-name/DrDurmusAkkaya?dnt=false&embed=1&showReplies=false&lang=tr&theme=light";

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

          {/* X - iframe syndication (widgets.js frame içinde çalışmıyor) */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
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
            <div className="bg-white min-h-[560px]">
              <iframe
                title="X Paylaşımları"
                src={X_EMBED_URL}
                width="100%"
                height="560"
                style={{ border: "none", overflow: "hidden", display: "block" }}
                loading="lazy"
                allow="encrypted-media; clipboard-write"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-4 pb-4 -mt-2 text-center">
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline"
                >
                  Tüm X paylaşımlarını gör <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
