"use client";
import { useEffect, useRef } from "react";
import { Facebook, Instagram, ExternalLink } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/DrDurmsAKKAYA";
const INSTAGRAM_URL = "https://www.instagram.com/dr.durmusakkaya64/";

export default function SocialFeeds() {
  const fbContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Facebook Page Plugin responsive resize
    const resize = () => {
      if (typeof window === "undefined" || !fbContainerRef.current) return;
      const iframe = fbContainerRef.current.querySelector("iframe");
      if (!iframe) return;
      const width = Math.min(Math.max(fbContainerRef.current.clientWidth, 280), 500);
      const href = encodeURIComponent(FACEBOOK_URL);
      iframe.src = `https://www.facebook.com/plugins/page.php?href=${href}&tabs=timeline&width=${width}&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
      iframe.width = String(width);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Sosyal Medya</h2>
          <p className="text-gray-600">
            Facebook ve Instagram hesaplarından güncel paylaşımları takip edin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Facebook */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Facebook size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Facebook</h3>
                  <p className="text-sm text-gray-500">DrDurmsAKKAYA</p>
                </div>
              </div>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Sayfaya Git <ExternalLink size={14} />
              </a>
            </div>
            <div ref={fbContainerRef} className="flex justify-center p-4 bg-white min-h-[620px]">
              <iframe
                title="Facebook Paylaşımları"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_URL)}&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                width="500"
                height="620"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center">
                  <Instagram size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instagram</h3>
                  <p className="text-sm text-gray-500">@dr.durmusakkaya64</p>
                </div>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-pink-600 hover:text-pink-800"
              >
                Profile Git <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex justify-center p-4 bg-white min-h-[620px]">
              <iframe
                title="Instagram Paylaşımları"
                src="https://www.instagram.com/dr.durmusakkaya64/embed"
                width="400"
                height="620"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
