import { prisma } from "@/lib/db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json()

    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hasedPassword,
      },
    })

    return NextResponse.json({ status: "success", msg: "Du wirst nun eingeloggt." })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({
          status: "error",
          msg: "Diese E-Mail existiert bereits. Bitte verwende eine andere E-Mail.",
        })
      }
    }
  }

  return NextResponse.json({ status: "error", msg: "Something went wrong." })
}
