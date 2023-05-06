import { expect } from "chai";
import { EventEmitter } from "events";
import { getAllMessages, getRandomMessage, messageEmitter } from "../src/index";
import Mocha from "mocha";

describe("getAllMessages()", () => {
  it("should return an array of messages", async () => {
    const messages: string[] = await getAllMessages();
    expect(messages).to.be.an("array");
    expect(messages.length).to.be.greaterThan(0);
    expect(messages.every((message) => typeof message === "string")).to.be.true;
  });
});

describe("getRandomMessage()", () => {
  it("should display random messages at the specified duration", function (done) {
    this.timeout(5000);
    const numberOfMessages: number = 3;
    let count: number = 0;
    const messageListener = (message: string) => {
      expect(message).to.be.a("string");
      count++;
      console.log(`Message ${count}:`, message);
      if (count === numberOfMessages) {
        done();
      }
    };
    messageEmitter.on("message", messageListener);
    const stopInterval = getRandomMessage(1, numberOfMessages);
    setTimeout(() => {
      stopInterval();
      messageEmitter.off("message", messageListener);
    }, numberOfMessages * 1000 + 1000);
  });

  it("should stop displaying messages when the numberOfMessages limit is reached", function (done) {
    this.timeout(5000);
    const numberOfMessages: number = 2;
    let count: number = 0;
    const messageListener = (message: string) => {
      expect(message).to.be.a("string");
      count++;
      console.log(`Message ${count}:`, message);
      if (count === numberOfMessages) {
        done();
      }
    };
    messageEmitter.on("message", messageListener);
    const stopInterval = getRandomMessage(1, numberOfMessages);
    setTimeout(() => {
      stopInterval();
      messageEmitter.off("message", messageListener);
    }, numberOfMessages * 1000 + 1000);
  });
});

describe("messageEmitter", () => {
  it("should be an instance of EventEmitter", () => {
    expect(messageEmitter).to.be.an.instanceOf(EventEmitter);
  });
});
