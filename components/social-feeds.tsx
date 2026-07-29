"use client";
import { useEffect, useRef } from "react";
import { Facebook, Instagram, Twitter, ExternalLink } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/DrDurmsAKKAYA";
const INSTAGRAM_URL = "https://www.instagram.com/dr.durmusakkaya64/";
const X_URL = "https://x.com/drdurmusakkaya";

export default function SocialFeeds() {
  const xContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadWidgets = () => {
      const tw = (window as any).twttr;
      if (tw?.widgets?.load && xContainerRef.current) {
        tw.widgets.load(xContainerRef.current);
      }
    };

    if ((window as any).twttr?.widgets) {
      loadWidgets();
      return;
    }

    const existing = document.getElementById("x-widgets-js");
    if (existing) {
      existing.addEventListener("load", loadWidgets);
      return () => existing.removeEventListener("load", loadWidgets);
    }

    const script = document.createElement("script");
    script.id = "x-widgets-js";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = loadWidgets;
    document.body.appendChild(script);
  }, []);

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

          {/* X */}
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
            <div ref={xContainerRef} className="p-3 bg-white min-h-[560px]">
              <a
                className="twitter-timeline"
                data-height="560"
                data-theme="light"
                data-chrome="noheader nofooter"
                href="https://twitter.com/DrDurmusAkkaya"
              >
                @DrDurmusAkkaya paylaşımları
              </a>
              <div className="mt-4 p-4 rounded-xl bg-gray-100 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  X paylaşımları tarayıcıda engellenirse hesabı doğrudan açabilirsiniz.
                </p>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  X’te Aç <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
