import { PrismaClient } from "@prisma/client";

let prisma = PrismaClient;

declare global {}

const prismaClient = new PrismaClient();

export default prismaClient;
