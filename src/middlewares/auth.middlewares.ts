import fastify, {
  FastifyRequest,
  FastifyReply,
  DoneFuncWithErrOrRes,
} from "fastify";

import { verify, VerifyErrors, Jwt, JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../auth/secrets";
import { UserService } from "../services/UserService";
import { AuthProps } from "../intefaces/authType";

export const verifiyToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    reply.code(401).send({ message: "No authorization" });
  }

  const token = request.headers.authorization?.replace(/^Bearer /, "")!;
  if (!token) {
    reply.code(401).send({ message: "No authorization" });
  }

  const decodedToken = verify(
    token,
    JWT_SECRET,
    (err: VerifyErrors | null, res: Jwt | JwtPayload | string | undefined) => {
      if (err) {
        return "token expired";
      }
      return res;
    },
  ) as any;

  if (decodedToken == "token expired") {
    reply.code(401).send({ message: "No authorization: token expired" });
  }

  const userService = new UserService();
  const user = await userService.findByEmail({ email: decodedToken.email });
  if (!user) {
    reply.code(401).send({ message: "No authorization: invalid token" });
  }
  done();
};
