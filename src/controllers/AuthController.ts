import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/UserService";
import * as bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../auth/secrets";

class AuthController {
  async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as { email: string; password: string };
    const userService = new UserService();

    let user = await userService.findByEmail({ email });

    if (!user) {
      reply.statusCode = 400;
      return reply.send({ message: "username or password may be incorrect" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      reply.statusCode = 400;
      return reply.send({ message: "username or password may be incorrect" });
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1h",
      },
    );
    return { id: user.id, email: user.email, token };
  }

}

export { AuthController };
