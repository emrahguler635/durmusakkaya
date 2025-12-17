export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Tüm alanları doldurun" }, { status: 400 });
    }
    const submission = await prisma.contactSubmission.create({ data });
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    return NextResponse.json({ error: "Mesaj gönderilemedi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: "Mesajlar yüklenemedi" }, { status: 500 });
  }
}
