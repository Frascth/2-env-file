import { Role, User } from "../generated/prisma/client.js";

export const getClientByEmail = async (email: string): Promise<User | null> => {
  const client = await prisma.user.findFirst({
    where: { email: email, role: Role.CLIENT }
  });

  return client;
};