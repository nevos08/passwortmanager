"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/db"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"

export async function createItem(name: string, url: string, entries: Array<{ type: number; value: string }>) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return

  console.log(session.user.id)

  try {
    const res = await prisma.item.create({
      data: {
        name: name,
        url: url,
        user: {
          connect: { id: Number(session.user.id) },
        },
      },
    })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      console.log(e)
    }
  }
}
