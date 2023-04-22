import * as fs from "fs";
import * as path from "path";

export const getAllMessages = (): string[] => {
  const filePath: string = path.join(__dirname, "loadingMessages.txt");
  const messages: string[] = fs.readFileSync(filePath, "utf-8").split("\n");
  return messages;
};

export const getRandomMessage = () => {
  const messages: string[] = getAllMessages();
  if (messages.length === 0) {
    throw new Error("No messages available");
  }
  const randomMessage: string =
    messages[Math.floor(Math.random() * messages.length)];
  return randomMessage;
};
