import * as z from "zod"
import PasswordForm from "./PasswordForm"

export default function Settings() {
  return (
    <>
      <h2 className="text-3xl font-bold">Einstellungen</h2>

      <div className="mt-2 w-full rounded border p-4">
        <h3 className="text-xl font-bold">Paswort ändern</h3>
        <PasswordForm />
      </div>
    </>
  )
}
