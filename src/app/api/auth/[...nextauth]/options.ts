import { prisma } from "@/lib/db"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        })

        if (!user) return null

        try {
          const valid = await bcrypt.compare(credentials.password, user.password)

          if (valid) {
            return {
              id: user.id.toString(),
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            }
          }
        } catch (e) {}

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
      }

      return session
    },
  },
}
