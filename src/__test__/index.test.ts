// import * as fs from "fs";
// import * as path from "path";
// import { getAllMessages, getRandomMessage, messageEmitter } from "..";

// describe("getAllMessages", () => {
//   it("returns an array of strings", () => {
//     const messages = getAllMessages();
//     expect(Array.isArray(messages)).toBe(true);
//     expect(messages.every((message) => typeof message === "string")).toBe(true);
//   });

//   it("returns all messages from the file", () => {
//     const filePath = path.join(__dirname, "loadingMessages.txt");
//     const messages = fs.readFileSync(filePath, "utf-8").split("\n");
//     expect(getAllMessages()).toEqual(messages);
//   });
// });

// describe("getRandomMessage", () => {
//   let intervalId: any;
//   const originalSetInterval = global.setInterval;

//   beforeEach(() => {
//     messageEmitter.on("message", () => {});
//   });

//   afterEach(() => {
//     if (intervalId) clearInterval(intervalId);
//     global.setInterval = originalSetInterval;
//     messageEmitter.removeAllListeners("message");
//   });

//   it("returns a non-empty string", (done) => {
//     messageEmitter.once("message", (message) => {
//       expect(typeof message === "string").toBe(true);
//       expect(message.length).toBeGreaterThan(0);
//       done();
//     });
//     intervalId = getRandomMessage(1, 1);
//   });

//   it("returns a different message when called multiple times", (done) => {
//     const messages: string[] = [];
//     let count = 0;

//     messageEmitter.on("message", (message) => {
//       messages.push(message);
//       count++;

//       if (count === 3) {
//         expect(messages[0] !== messages[1] || messages[1] !== messages[2]).toBe(
//           true
//         );
//         done();
//       }
//     });

//     intervalId = getRandomMessage(1, 3);
//   });

//   it("stops returning messages after the specified number of messages", (done) => {
//     let count = 0;

//     messageEmitter.on("message", () => {
//       count++;

//       if (count === 2) {
//         setTimeout(() => {
//           expect(count).toBe(2);
//           done();
//         }, 1500);
//       }
//     });

//     intervalId = getRandomMessage(1, 2);
//   });

//   it("clears the interval when the returned cancel function is called", (done) => {
//     let count = 0;

//     messageEmitter.on("message", () => {
//       count++;
//       if (count === 1) {
//         intervalId();
//         setTimeout(() => {
//           expect(count).toBe(1);
//           done();
//         }, 1500);
//       }
//     });

//     intervalId = getRandomMessage(1, undefined);
//   });

//   it("does not throw an error when the array is non-empty", () => {
//     expect(() => {
//       intervalId = getRandomMessage();
//     }).not.toThrow();
//   });
// });
