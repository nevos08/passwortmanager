import SearchField from "./Search"
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
import CreationForm from "./CreationForm"

export default async function Dashboard() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold">Deine gespeicherten Passwörter</h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            In der Liste findest du alle gespeicherten Passwörter
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              Neuen Eintrag erstellen
              <FaPlus className="text-xl" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Eintrag erstellen</DialogTitle>
              <DialogDescription>Fülle alle Felder aus, um einen neuen Eintrag zu erstellen.</DialogDescription>
            </DialogHeader>
            <CreationForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center gap-8">
        <SearchField />
      </div>
    </div>
  )
}
