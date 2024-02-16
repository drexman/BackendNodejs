import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";
import prismaClient from "../prisma";

class AuthController {
  async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body;
    let customer = await prismaClient.customer.findFirst({ where: { email } });
    if (customer) {
      reply.statusCode = 400;
      return reply.send({ message: "Incorrect password" });
    }

    return;
  }
}

export { AuthController };
