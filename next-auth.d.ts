import { DefaultArgs } from "@prisma/client/runtime/library"
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: string
      firstName: string
      lastName: string
    } & Defaultuser
  }

  interface User extends DefaultUser {
    firstName: string
    lastName: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    firstName: string
    lastName: string
    role: string
  }
}
