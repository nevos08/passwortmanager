import SearchField from "./(components)/SearchField"
import CreateItemButton from "./(components)/CreateItemButton"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import ItemDialog from "./(components)/ItemDialog"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

async function getEntries() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error("Not authenticated")
  }

  return prisma.item.findMany({
    where: { userId: parseInt(session.user.id) },
    include: {
      itemEntries: {
        include: {
          itemType: { select: { description: true, hideInput: true } },
        },
      },
    },
  })
}

export default async function Dashboard({ searchParams }: { searchParams: { search?: string } }) {
  const items = await getEntries()

  const filteredItems = items.filter((item) => {
    if (!searchParams.search) return true
    if (item.name.toLowerCase().includes(searchParams.search.toLowerCase())) return true
  })

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold">Deine gespeicherten Passwörter</h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              In der Liste findest du alle gespeicherten Passwörter
            </p>
          </div>

          <CreateItemButton />
        </div>
        <div className="flex items-center gap-8">
          <SearchField />
        </div>
      </div>

      {items.length === 0 && (
        <div className="mt-4 w-full rounded-md bg-secondary p-4 text-center">
          Du hast noch keine Passwörter angelegt.
        </div>
      )}

      <div className={cn("grid grid-cols-3 gap-2", items.length > 0 && "mt-2")}>
        {filteredItems.map((item) => (
          <ItemDialog
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </>
  )
}
