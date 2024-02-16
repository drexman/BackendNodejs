import { PrismaClient } from "@prisma/client";

declare global {}

const prismaClient = new PrismaClient();

export default prismaClient;
