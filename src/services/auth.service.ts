import bcrypt from "bcryptjs";
import { uuidv7 } from "uuidv7";
import { prisma } from "../lib/prisma.js";
import { generateUuidV7Buffer } from "../utils/uuid.js";
import { Role } from "../generated/prisma/enums.js";
import type { UserCreateInput } from "../generated/prisma/models/User.js";
import type { SafeUser } from "../types/user.js";
import { toSafeUser } from "../utils/user.js";
import { ConflictError } from "../errors/ConflictError.js";

export const isEmailAlreadyExists = async (email: string): Promise<boolean> => {
    const count = await prisma.user.count({
        where: { email: email }
    });

    return count > 0;
};

export const registerClient = async (email: string, plainPassword: string): Promise<SafeUser> => {
    if (await isEmailAlreadyExists(email)) {
        throw new ConflictError(`Email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const clientData: UserCreateInput = {
        id: generateUuidV7Buffer(),
        role: Role.CLIENT,
        email: email,
        name: uuidv7(),
        password: hashedPassword,
    }

    const client = await prisma.user.create({
        data: clientData,
    });

    return toSafeUser(client);
};