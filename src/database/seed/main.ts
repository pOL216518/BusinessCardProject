import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';
import { seedData } from './seed-data.js';
import { Seeder } from './seeder.js';

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
  // Либо заполняется полностью данными (seed-data), либо не заполняется вовсе
  try {
    await prisma.$transaction((tx) => new Seeder(tx).run(seedData), {
      timeout: 60_000,
    });
    console.log(`Успешное заполнения данных для профиля "${seedData.profile.slug}"`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error('Ошибка при заполнении данных:', error);
  process.exit(1);
});