import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { userRoutes } from "./routes";
import { cors } from "hono/cors";
import { connectProducer } from "./kafka/producer";
import { startConsumer } from "./kafka/consumer";

const app = new Hono();

app.use("*", cors());

app.get("/health", async (c) => {
  return c.json({ status: "ok" }, 200);
});

app.route("/api", userRoutes);

async function startServer() {
  await connectProducer();
  await startConsumer();

  serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log("🚀 Server running on http://localhost:3000");
}

startServer();
