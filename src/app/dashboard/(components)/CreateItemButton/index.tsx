import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa6"
import CreationForm from "../CreationForm"

export default function CreateItemButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Neuen Eintrag erstellen
          <FaPlus className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Neuen Eintrag erstellen</DialogTitle>
          <DialogDescription>Fülle alle Felder aus, um einen neuen Eintrag zu erstellen.</DialogDescription>
        </DialogHeader>
        <CreationForm />
      </DialogContent>
    </Dialog>
  )
}
