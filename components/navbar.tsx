"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getImagePath } from "@/lib/image-path";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkinda", label: "Hakkında" },
  { href: "/haberler", label: "Haberler" },
  { href: "/iletisim", label: "İletişim" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="font-bold text-3xl text-blue-900 flex items-center gap-3">
            <Image src={getImagePath("/logo.png")} alt="DA Logo" width={140} height={140} className="rounded" />
            <span>Dr. Durmuş AKKAYA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="px-5 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-lg">
                {l.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-white border-t">
            <nav className="flex flex-col p-4 gap-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold text-lg">
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
