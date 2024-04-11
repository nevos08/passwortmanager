"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaCopy } from "react-icons/fa6"
import DeleteButton from "./DeleteButton"
import { toast } from "sonner"

type ItemDialogProps = {
  item: {
    id: number
    name: string
    url: string | null
    userId: number
    createdAt: Date
    updatedAt: Date
    itemEntries: {
      id: number
      itemId: number
      itemTypeId: number
      itemType: {
        description: string
        hideInput: boolean
      }
      value: string
      createdAt: Date
      updatedAt: Date
    }[]
  }
}

export default function ItemDialog({ item }: ItemDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded border p-4 transition hover:shadow-md dark:hover:bg-secondary dark:hover:shadow-none">
          <p className="clamp-1 overflow-hidden text-xl font-bold">{item.name}</p>
          <p className="text-neutral-600 dark:text-neutral-400">
            Zuletzt aktualisiert:{" "}
            {item.updatedAt.toLocaleDateString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
              year: "numeric",
              day: "2-digit",
              month: "2-digit",
            })}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        {item.url && (
          <div className="flex items-center justify-between gap-2 rounded-md border bg-secondary px-4 py-2 dark:bg-background">
            <p className="font-bold">URL:</p>
            <div className="flex items-center gap-2">
              <p>{item.url}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  toast.info("Wert in Zwischenablage kopiert")
                  navigator.clipboard.writeText(item.url as string)
                }}
              >
                <FaCopy className="text-xl" />
              </Button>
            </div>
          </div>
        )}

        <div className="mt-2">
          <h2 className="text-lg font-bold">Einträge</h2>

          {item.itemEntries.map((entry) => (
            <div
              key={entry.id}
              className="mt-2 flex items-center justify-between gap-2 rounded-md border bg-secondary px-4 py-2 dark:bg-background"
            >
              <p className="font-bold">{entry.itemType.description}:</p>
              <div className="flex items-center gap-2">
                <p>{entry.value}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    toast.info("Wert in Zwischenablage kopiert")
                    navigator.clipboard.writeText(entry.value)
                  }}
                >
                  <FaCopy className="text-xl" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <DeleteButton id={item.id} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
