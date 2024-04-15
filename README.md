# Passwortmanager

Gruppenprojekt für das Modul SWEP

## Requirements

- MariaDB Database
- Node.js (npm)

## Installation

1. Clone the repository
2. Run `npm install` in the root directory
3. Fill out the `.env.example` file and rename it to `.env` (Unless you know what you're doing, you can leave NEXTAUTH_URL as it is.)
4. Run `npx prisma generate` and `npx prisma migrate dev --name "Some super name"`
5. Run `npm run build` and `npm run start`
6. You can now visit the password manager at `http://localhost:3000`
