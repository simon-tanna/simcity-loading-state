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
  const originalSetInterval = global.setInterval;
  const originalClearInterval = global.clearInterval;

  afterEach(() => {
    global.setInterval = originalSetInterval;
    global.clearInterval = originalClearInterval;
  });

  it("returns a non-empty string", () => {
    global.setInterval = ((callback: any, interval: any) => {
      const message = callback();
      expect(typeof message === "string").toBe(true);
      expect(message.length).toBeGreaterThan(0);
    }) as any;
    getRandomMessage(1, 1);
  });

  it("returns a different message when called multiple times", () => {
    const messages: string[] = [];
    global.setInterval = ((callback: any, interval: any) => {
      for (let i = 0; i < 3; i++) {
        messages.push(callback());
      }
    }) as any;
    getRandomMessage(1, 3);
    expect(messages[0] === messages[1] && messages[1] === messages[2]).toBe(
      false
    );
  });

  it("stops returning messages after the specified number of messages", () => {
    const messages: string[] = [];
    global.setInterval = ((callback: any, interval: any) => {
      for (let i = 0; i < 4; i++) {
        messages.push(callback());
      }
    }) as any;
    getRandomMessage(1, 2);
    expect(messages[2]).toBeUndefined();
    expect(messages[3]).toBeUndefined();
  });

  it("clears the interval when the returned cancel function is called", () => {
    let clearIntervalCalled = false;
    let capturedIntervalId: NodeJS.Timer;

    global.setInterval = ((callback: any, interval: any) => {
      const intervalId = originalSetInterval(callback, interval);
      capturedIntervalId = intervalId;
      return intervalId;
    }) as any;

    global.clearInterval = ((intervalId: NodeJS.Timer) => {
      originalClearInterval(intervalId);
      if (intervalId === capturedIntervalId) {
        clearIntervalCalled = true;
      }
    }) as any;

    const cancelInterval = getRandomMessage(1, undefined);
    cancelInterval();
    expect(clearIntervalCalled).toBe(true);
  });

  it("does not throw an error when the array is non-empty", () => {
    expect(() => {
      getRandomMessage();
    }).not.toThrow();
  });
});
