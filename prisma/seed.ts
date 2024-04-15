import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  await prisma.itemType.createMany({
    data: [
      { description: "Passwort", hideInput: true },
      { description: "Website", hideInput: false },
      { description: "E-Mail", hideInput: false },
      { description: "Text", hideInput: false },
    ],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
