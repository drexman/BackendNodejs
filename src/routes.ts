import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { verifiyToken } from "./middlewares/auth.middlewares"

export const publicRoutes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) => {
  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AuthController().login(request, reply);
    },
  ),
    fastify.post(
      "/user",
      async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().newCustomer(request, reply);
      },
    );
};

export const privateRoutes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) => {
  fastify.get(
    "/profile",
    {
      preHandler : verifiyToken
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {'done' : 'sucessol'}
    },
  );
};
