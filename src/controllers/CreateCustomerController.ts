import { FastifyRequest, FastifyReply } from "fastify";
import { CustomerService } from "../services/CustomerService";

class CreateCustomerController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = request.body as { name: string; email: string };
    const customerService = new CustomerService();
    const customer = await customerService.addNewCustomer({ name, email });

    reply.send(customer);
  };
}

export { CreateCustomerController };
