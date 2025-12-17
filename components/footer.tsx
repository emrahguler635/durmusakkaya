import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="DA Logo" width={80} height={80} className="rounded bg-white p-2" />
            <div>
              <h3 className="font-bold text-lg">Dr. Durmuş AKKAYA</h3>
              <p className="text-blue-200 text-sm">Başak A.Ş. Genel Müdürü</p>
            </div>
          </div>
          <div className="flex gap-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
              <Twitter size={28} />
            </a>
            <Link href="/iletisim" className="p-4 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
              <Mail size={28} />
            </Link>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-4 pt-4 text-center">
          <p className="text-blue-300 text-xs">© {new Date().getFullYear()} Dr. Durmuş AKKAYA. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
