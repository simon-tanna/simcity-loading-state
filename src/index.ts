import * as fs from "fs";
import * as path from "path";

export const getRandomMessage = () => {
  const filePath = path.join(__dirname, "loadingMessages.txt");
  const messages = fs.readFileSync(filePath, "utf-8").split("\n");
  return messages;
};

