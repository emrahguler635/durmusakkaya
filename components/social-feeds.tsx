"use client";
import { useEffect, useRef } from "react";
import { Facebook, Instagram, Twitter, ExternalLink } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/DrDurmsAKKAYA";
const INSTAGRAM_URL = "https://www.instagram.com/dr.durmusakkaya64/";
const X_URL = "https://x.com/drdurmusakkaya";

export default function SocialFeeds() {
  const fbContainerRef = useRef<HTMLDivElement>(null);
  const xContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Load X (Twitter) timeline widget
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

        <div className="grid lg:grid-cols-3 gap-8">
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
                Git <ExternalLink size={14} />
              </a>
            </div>
            <div ref={fbContainerRef} className="flex justify-center p-4 bg-white min-h-[620px]">
              <iframe
                title="Facebook Paylaşımları"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_URL)}&tabs=timeline&width=340&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                width="340"
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
                Git <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex justify-center p-4 bg-white min-h-[620px]">
              <iframe
                title="Instagram Paylaşımları"
                src="https://www.instagram.com/dr.durmusakkaya64/embed"
                width="340"
                height="620"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
          </div>

          {/* X (Twitter) */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <Twitter size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">X</h3>
                  <p className="text-sm text-gray-500">@DrDurmusAkkaya</p>
                </div>
              </div>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-black"
              >
                Git <ExternalLink size={14} />
              </a>
            </div>
            <div ref={xContainerRef} className="p-4 bg-white min-h-[620px] overflow-hidden">
              <a
                className="twitter-timeline"
                data-height="620"
                data-theme="light"
                href="https://twitter.com/DrDurmusAkkaya?ref_src=twsrc%5Etfw"
              >
                @DrDurmusAkkaya paylaşımları
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
