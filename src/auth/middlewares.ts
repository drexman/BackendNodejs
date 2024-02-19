import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../auth/secrets";

export const verifiyToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    if (!request.headers.authorization) {
      reply.statusCode = 403;
      reply.send({ message: "No authorization" });
    }

    const token = request.headers.authorization?.replace("Bearer ", "")!;

    verify(token, JWT_SECRET);
  } catch (error) {}
};
