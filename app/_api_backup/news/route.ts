export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Haberler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    const data = await request.json();
    const slug = data.title?.toLowerCase()?.replace(/[^a-z0-9ğüşöçı]+/gi, "-")?.replace(/-+/g, "-") || `haber-${Date.now()}`;
    const news = await prisma.news.create({
      data: { ...data, slug }
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Haber eklenemedi" }, { status: 500 });
  }
}
