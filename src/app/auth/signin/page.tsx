import FormPanel from "./Form"
import Link from "next/link"

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="rounded-xl border bg-card p-4 shadow-2xl  dark:bg-background dark:shadow-none">
        <h1 className="text-center text-3xl font-bold">Anmelden</h1>
        <FormPanel />
      </div>

      <div>
        <p>
          Du hast noch kein Konto? Hier kannst du dich{" "}
          <Link
            href="/auth/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}
