import * as fs from "fs";
import * as path from "path";
import { getAllMessages, getRandomMessage } from "..";

describe("getAllMessages", () => {
  it("returns an array of strings", () => {
    const messages = getAllMessages();
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.every((message) => typeof message === "string")).toBe(true);
  });

  it("returns all messages from the file", () => {
    const filePath = path.join(__dirname, "loadingMessages.txt");
    const messages = fs.readFileSync(filePath, "utf-8").split("\n");
    expect(getAllMessages()).toEqual(messages);
  });
});

describe("getRandomMessage", () => {
  it("returns a string", () => {
    const message = getRandomMessage();
    expect(typeof message === "string").toBe(true);
  });

  it("returns a message that is included in the array", () => {
    const messages = getAllMessages();
    expect(messages.includes(getRandomMessage())).toBe(true);
  });

  it("returns a non-empty string", () => {
    const message = getRandomMessage();
    expect(message.length).toBeGreaterThan(0);
  });

  it("returns a different message when called multiple times", () => {
    const message1 = getRandomMessage();
    const message2 = getRandomMessage();
    const message3 = getRandomMessage();
    expect(message1 === message2 && message2 === message3).toBe(false);
  });

  it("does not throw an error when the array is non-empty", () => {
    expect(() => {
      getRandomMessage();
    }).not.toThrow();
  });
});
