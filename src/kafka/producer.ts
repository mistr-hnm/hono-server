import { kafka } from "./kafka";

export const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
  console.log("Producer connected");
}

export async function sendMessage(topic: string, message: unknown) {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
}
