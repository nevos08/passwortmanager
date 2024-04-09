import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return redirect("/auth/signin")
  }

  return redirect("/dashboard")
}
