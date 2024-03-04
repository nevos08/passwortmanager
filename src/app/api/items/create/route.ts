import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  const {} = await req.json()

  return NextResponse.json({})
}
