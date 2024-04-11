"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth"

export async function changePassword(password1: string, password2: string) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return { state: false, msg: "Du bist nicht eingeloggt." }
  if (password1 !== password2) return { state: false, msg: "Die Passwörter stimmen nicht überein." }

  try {
    const password = password1
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await prisma.user.update({
      where: {
        id: parseInt(session.user.id),
      },
      data: {
        password: hashedPassword,
      },
    })
    return { state: true, msg: "Passwort wurde erfolgreich geändert." }
  } catch (e) {
    return { state: false, msg: "Es ist ein Fehler aufgetreten." }
  }
}
