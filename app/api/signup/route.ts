export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email ve şifre gerekli" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Bu email zaten kayıtlı" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name || "Admin" }
    });
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }
}
