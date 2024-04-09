import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/db"
import { stat } from "fs"
import { getServerSession } from "next-auth"

export async function deleteItem(id: number) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return { state: false, msg: "Du bist nicht angemeldet!" }

  try {
    await prisma.item.delete({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        itemEntries: true,
        user: false,
      },
    })

    return { state: true, msg: "Item erfolgreich gelöscht!" }
  } catch (e) {
    return { state: false, msg: "Fehler beim Löschen des Items!" }
  }
}
