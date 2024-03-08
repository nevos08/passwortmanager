"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/db"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"

export async function createItem(name: string, url: string, entries: Array<{ type: number; value: string }>) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return

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

    // const res = await prisma.item.create({
    //   data: {
    //     id: 0,
    //     name: name,
    //     url: url,
    //     userId: Number(session.user.id),
    //   },
    // })
    //
    // await prisma.itemEntry.createMany({
    //   data: entries.map((entry) => ({
    //     value: entry.value,
    //     itemTypeId: entry.type,
    //     itemId: res.id,
    //   })),
    // })
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      console.log(e)
    }
  }
}
