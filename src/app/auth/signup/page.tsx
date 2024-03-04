import { Button } from "@/components/ui/button"
import FormPanel from "./Form"
import Link from "next/link"

export default function SignUp() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="rounded-xl border bg-card p-4 shadow-2xl dark:bg-background dark:shadow-none">
        <h1 className="text-center text-3xl font-bold">Registrieren</h1>
        <FormPanel />
      </div>

      <div>
        <p>
          Du hast bereits ein Konto? Hier kannst du dich
          <Link
            href="/auth/signin"
            className="pl-1 underline underline-offset-4 hover:text-primary"
          >
            anmelden
          </Link>
        </p>
      </div>
    </div>
  )
}
