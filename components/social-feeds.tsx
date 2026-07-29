"use client";
import { Facebook, Instagram, Twitter, ExternalLink } from "lucide-react";

const SOCIALS = [
  {
    name: "Facebook",
    handle: "DrDurmsAKKAYA",
    url: "https://www.facebook.com/DrDurmsAKKAYA",
    description: "Facebook sayfasındaki güncel paylaşımları görün.",
    color: "bg-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    embed: `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent("https://www.facebook.com/DrDurmsAKKAYA")}&tabs=timeline&width=500&height=520&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`,
    icon: Facebook,
  },
  {
    name: "Instagram",
    handle: "@dr.durmusakkaya64",
    url: "https://www.instagram.com/dr.durmusakkaya64/",
    description: "Instagram hesabındaki güncel paylaşımları görün.",
    color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    button: "bg-pink-600 hover:bg-pink-700",
    embed: "https://www.instagram.com/dr.durmusakkaya64/embed",
    icon: Instagram,
  },
  {
    name: "X",
    handle: "@DrDurmusAkkaya",
    url: "https://x.com/drdurmusakkaya",
    description: "X hesabındaki güncel paylaşımları görün.",
    color: "bg-black",
    button: "bg-black hover:bg-gray-800",
    embed: null,
    icon: Twitter,
  },
];

export default function SocialFeeds() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Sosyal Medya</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Facebook, Instagram ve X hesaplarından güncel paylaşımları buradan takip edebilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{social.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{social.handle}</p>
                <p className="text-gray-600 text-sm mb-5">{social.description}</p>
                <span className={`inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg ${social.button}`}>
                  Hesaba Git <ExternalLink size={14} />
                </span>
              </a>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-200 bg-white font-semibold text-gray-900">
              Facebook Paylaşımları
            </div>
            <div className="flex justify-center p-4 bg-white min-h-[520px]">
              <iframe
                title="Facebook Paylaşımları"
                src={SOCIALS[0].embed!}
                width="500"
                height="520"
                style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-200 bg-white font-semibold text-gray-900">
              Instagram Paylaşımları
            </div>
            <div className="flex justify-center p-4 bg-white min-h-[520px]">
              <iframe
                title="Instagram Paylaşımları"
                src={SOCIALS[1].embed!}
                width="400"
                height="520"
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
