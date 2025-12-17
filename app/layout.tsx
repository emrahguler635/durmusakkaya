import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Dr. Durmuş AKKAYA | Başak A.Ş. Genel Müdürü",
  description: "Dr. Durmuş AKKAYA - Başak A.Ş. Genel Müdürü. Profesyonel deneyim, haberler ve iletişim.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  },
  openGraph: {
    title: "Dr. Durmuş AKKAYA | Başak A.Ş. Genel Müdürü",
    description: "Dr. Durmuş AKKAYA - Başak A.Ş. Genel Müdürü",
    images: ["/og-image.png"]
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
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
