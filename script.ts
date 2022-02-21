import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // prismma client queries here
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
