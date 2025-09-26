import { PrismaClient } from "../generated/prisma/client.js";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // optional logs
  });

// prevent multiple instances in dev
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
