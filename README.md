# Passwortmanager

Gruppenprojekt für das Modul SWEP

## Requirements

- MariaDB Database
- Node.js >= 18 (npm)

## Installation

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `openssl rand -base64 32` to generate a random string for the NEXTAUTH_SECRET in the next step.
4. Fill out the `.env.example` file and rename it to `.env` (Unless you know what you're doing, you can leave NEXTAUTH_URL as it is.)
5. Run `npx prisma generate` and `npx prisma migrate dev --name "Some super name"`
6. Run `npx prisma db seed`
7. Run `npm run build` and `npm run start`
8. You can now visit the password manager at `http://localhost:3000`
