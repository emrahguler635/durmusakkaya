"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  createdAt: string;
  slug: string;
}

export default function NewsCard({ id, title, summary, imageUrl, createdAt, slug }: NewsCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR", {
    year: "numeric", month: "long", day: "numeric"
  });
  return (
    <Link href={`/haberler/${slug}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="relative aspect-video bg-gray-100">
          <Image src={imageUrl ? getImagePath(imageUrl) : getImagePath("/og-image.png")} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{summary}</p>
          <div className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
            Devamını Oku <ArrowRight size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
