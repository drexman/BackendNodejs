import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  email: string;
}

class CustomerService {
  async addNewCustomer({ name, email }: CreateCustomerProps) {
    if (!name || !email) {
      throw new Error("Preencha todos os campos");
    }

    let customer = await prismaClient.customer.findFirst({ where: { email } });
    if (customer) {
      throw new Error("User already exists");
    }
    customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    });

    return customer;
  }
}

export { CustomerService };
