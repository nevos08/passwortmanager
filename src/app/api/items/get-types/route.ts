import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const types = await prisma.itemType.findMany({ select: { id: true, description: true, hideInput: true } })
  return NextResponse.json({ types })
}
