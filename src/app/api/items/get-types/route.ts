import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const types = await prisma.itemType.findMany()
  return NextResponse.json({ types })
}
