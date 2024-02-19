import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/UserService";
import * as bcrypt from "bcrypt";

class UserController {
  newCustomer = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password } = request.body as { name: string; email: string, password: string };

    if (!name || !email || !password) {
      reply.statusCode = 400;
      reply.send({ message: 'fill in all fields' })
    }

    const hash = await bcrypt.hash(password, 10);
    const userService = new UserService();
    
    let customer = await userService.findByEmail({ email });
    if (customer) {
      reply.statusCode = 400;
      reply.send({ menssage: 'User already exists' })
    }
    
    customer = await userService.addNewCustomer({ name, email, password: hash});
    reply.send(customer);
  };
}

export { UserController };
