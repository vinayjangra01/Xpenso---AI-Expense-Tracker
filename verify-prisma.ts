import { PrismaClient } from '@prisma/client';

async function main() {
  try {
    const prisma = new PrismaClient();
    console.log('Prisma Client successfully imported and instantiated');
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
