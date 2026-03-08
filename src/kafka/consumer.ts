import { kafka } from "./kafka";

export async function startConsumer() {
  const consumer = kafka.consumer({
    groupId: "user-service",
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "user-created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value!.toString());
      console.log("Received event:", data);
    },
  });
}
