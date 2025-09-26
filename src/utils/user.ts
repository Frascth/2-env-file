import type { User } from "../generated/prisma/client.js";
import type { SafeUser } from "../types/user.js";
import { bufferToUuid } from "./uuid.js";

export const toSafeUser = (user: User): SafeUser => {
  const { password, ...userWithoutPassword } = user;

  const safeUser : SafeUser = {
    ...userWithoutPassword,
    id: bufferToUuid(user.id),
  };

  return safeUser;
};