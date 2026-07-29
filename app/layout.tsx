import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Removed dynamic export for static build

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://emrahguler635.github.io/durmusakkaya"),
  title: "Dr. Durmuş AKKAYA | Başak A.Ş. Yönetim Kurulu Başkanı",
  description: "Dr. Durmuş AKKAYA - Başak A.Ş. Yönetim Kurulu Başkanı. Profesyonel deneyim, haberler ve iletişim.",
  icons: {
    icon: "/durmusakkaya/favicon.svg",
    shortcut: "/durmusakkaya/favicon.svg"
  },
  openGraph: {
    title: "Dr. Durmuş AKKAYA | Başak A.Ş. Yönetim Kurulu Başkanı",
    description: "Dr. Durmuş AKKAYA - Başak A.Ş. Yönetim Kurulu Başkanı",
    images: ["/durmusakkaya/og-image.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={`${inter.className} bg-gray-50`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="pt-28 min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
