import { Kafka } from "kafkajs";
import "dotenv/config";

export const kafka = new Kafka({
  clientId: process.env.CLIENT_ID || "my-app",
  brokers: [process.env.BROKERS || "localhost:9091"],
  ssl: false,
  sasl: {
    mechanism: "plain",
    username: "external",
    password: "external-pass",
  },
});

// you can put all security configuration in env.
