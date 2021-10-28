import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

(async () => {
  try {
    const result = await prismaClient.$queryRaw`SELECT 1;`;
  } catch (e) {
    console.log("Cannot fire test query, please check connection string");
    process.exit(1);
  }
})();

export { prismaClient };
