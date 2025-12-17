import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await prisma.news.findUnique({
    where: { slug: params.slug }
  });

  if (!news) notFound();

  const formattedDate = news.createdAt.toLocaleDateString("tr-TR", {
    year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/haberler" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Haberlere Dön
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{news.title}</h1>
          <div className="flex items-center gap-2 text-blue-200">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {news.imageUrl && (
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
              <Image src={news.imageUrl} alt={news.title} fill className="object-cover" />
            </div>
          )}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl text-gray-600 mb-6 font-medium">{news.summary}</p>
            <div className="whitespace-pre-wrap">{news.content}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
