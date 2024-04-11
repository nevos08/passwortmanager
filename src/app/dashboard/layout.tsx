import { getServerSession } from "next-auth"
import LogoutButton from "@/components/LogoutButton"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { IoMdSettings } from "react-icons/io"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import Link from "next/link"

const ThemeSwitcher = dynamic(() => import("@/components/ThemeSwitcher"), { ssr: false })

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="bg-secondary shadow-md dark:border-b dark:bg-background dark:shadow-none">
        <header className="container mx-auto flex items-center justify-between px-0 py-4">
          <h1 className="text-2xl font-bold">Passwort-Manager</h1>

          <div className="flex items-center gap-4">
            <p className="font-bold">{session?.user.firstName + " " + session?.user.lastName}</p>
            <Button asChild>
              <Link href="/dashboard">Startseite</Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
            >
              <Link href="/dashboard/settings">
                <IoMdSettings className="text-2xl" />
              </Link>
            </Button>
            <LogoutButton />
            <ThemeSwitcher />
          </div>
        </header>
      </div>

      <main className="container mx-auto mt-8 rounded-xl border bg-secondary p-4 shadow-md dark:bg-background dark:shadow-none">
        {children}
      </main>
    </>
  )
}
