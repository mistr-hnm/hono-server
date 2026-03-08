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
    eachMessage: async ({ message, partition, topic }) => {
      const data = JSON.parse(message.value!.toString());
      console.log("Received event:", data);
      console.log("Topic:", topic);
      console.log("Partition:", partition);
      console.log("Offset:", message.offset);
      console.log("Received event:", data);
    },
  });
}
