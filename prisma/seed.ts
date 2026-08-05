import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clean up
  await prisma.userProgress.deleteMany();
  
  // Seed initial user progress
  const progress = await prisma.userProgress.create({
    data: {
      deviceId: 'seed-device-id-arya',
      username: 'Arya',
      xp: 150,
      streak: 3,
      currentKand: 'Bal Kand',
      kidsMode: false,
      language: 'English',
    },
  });

  console.log('Seed database completed successfully:', progress);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
