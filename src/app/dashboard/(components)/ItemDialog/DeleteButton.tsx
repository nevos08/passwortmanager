"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaTrash } from "react-icons/fa6"
import { deleteItem } from "@/app/dashboard/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type DeleteButtonProps = {
  id: number
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter()

  const onDelete = () => {
    deleteItem(id).then((res) => {
      if (res.state) {
        toast.success(res.msg)
      } else {
        toast.error(res.msg)
      }
      router.refresh()
    })
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            onClick={onDelete}
          >
            <FaTrash className="mr-2 text-lg" />
            Löschen
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Diese Aktion kann nicht rückgängig gemacht werden!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
