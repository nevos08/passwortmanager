"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/db"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"

export async function createItem(name: string, url: string, entries: Array<{ type: number; value: string }>) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return { state: false, msg: "Du bist nicht angemeldet." }

  try {
    await prisma.item.create({
      data: {
        name: name,
        url: url,
        user: {
          connect: { id: Number(session.user.id) },
        },
        itemEntries: {
          create: entries.map((entry) => ({
            itemTypeId: entry.type,
            value: entry.value,
          })),
        },
      },
    })
    return { state: true, msg: "Der Eintrag wurde erstellt." }
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      console.log(e)
    }
    return { state: false, msg: "Ein Fehler ist aufgetreten." }
  }
}

export async function deleteItem(id: number) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return { state: false, msg: "Du bist nicht angemeldet!" }

  try {
    const deleteEntries = prisma.itemEntry.deleteMany({
      where: {
        itemId: id,
      },
    })

    const deleteItem = prisma.item.delete({
      where: {
        id: id,
        userId: parseInt(session.user.id),
      },
    })

    const transaction = await prisma.$transaction([deleteEntries, deleteItem])

    return { state: true, msg: "Item erfolgreich gelöscht!" }
  } catch (e) {
    console.log(e)
    return { state: false, msg: "Fehler beim Löschen des Items!" }
  }
}
