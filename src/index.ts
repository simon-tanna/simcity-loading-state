import * as fs from "fs";
import * as path from "path";

export const getAllMessages = (): string[] => {
  const filePath: string = path.join(__dirname, "loadingMessages.txt");
  const messages: string[] = fs.readFileSync(filePath, "utf-8").split("\n");
  return messages;
};

export const getRandomMessage = (
  duration: number = 3,
  numberOfMessages?: number
) => {
  const messages: string[] = getAllMessages();
  if (messages.length === 0) {
    throw new Error("No messages available");
  }

  let usedMessages: string[] = [];
  let currentIndex: number = 0;
  let intervalId: NodeJS.Timeout | null = null;

  const displayRandomLoadingMessage = () => {
    // Clear interval if number of messages is defined and equals the current index
    if (numberOfMessages !== undefined && currentIndex === numberOfMessages) {
      if (intervalId) clearInterval(intervalId);
      return;
    }

    // When all messages have been used, reset the index and usedMessages array
    if (usedMessages.length === messages.length) {
      usedMessages = [];
      currentIndex = 0;
    }

    let randomMessage: string;

    do {
      randomMessage = messages[Math.floor(Math.random() * messages.length)];
    } while (usedMessages.includes(randomMessage));

    usedMessages.push(randomMessage);
    currentIndex++;

    return randomMessage;
  };

  intervalId = setInterval(displayRandomLoadingMessage, duration * 1000);

  return () => {
    if (intervalId) clearInterval(intervalId);
  };
};

export default { getAllMessages, getRandomMessage };
