import Fastify from "fastify";
import { PORT } from "./auth/secrets";
import { publicRoutes, privateRoutes } from "./routes";
const app = Fastify({ logger: true });

const start = async () => {
  await app.register(publicRoutes);
  await app.register(privateRoutes);

  try {
    await app.listen({ port: PORT });
  } catch (err) {
    process.exit(1);
  }
};

start();
