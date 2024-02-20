import prismaClient from "../prisma";

import { CreateUserProps, PropsEmail } from "../intefaces/userType";

class UserService {
  async findByEmail({ email }: PropsEmail) {
    let customer = await prismaClient.user.findFirst({ where: { email } });
    return customer;
  }

  async addNewCustomer({ name, email, password }: CreateUserProps) {
    const customer = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        status: true,
      },
    });

    return customer;
  }
}

export { UserService };
