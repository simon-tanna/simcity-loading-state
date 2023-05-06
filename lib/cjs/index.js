"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMessage = exports.getAllMessages = exports.messageEmitter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const events_1 = require("events");
exports.messageEmitter = new events_1.EventEmitter();
/**
 * Retrieves all messages from the 'loadingMessages.txt' file and returns them as an array of strings.
 * @function
 * @name getAllMessages
 * @returns {string[]} An array containing all messages from the 'loadingMessages.txt' file.
 * @example
 * // Get all messages from 'loadingMessages.txt'
 * const messages = getAllMessages();
 * console.log(messages);
 */
const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = (0, path_1.join)(__dirname, "loadingMessages.txt");
    const fileContent = yield fs_1.promises.readFile(filePath, "utf-8");
    return fileContent.split("\n");
});
exports.getAllMessages = getAllMessages;
/**
 * Displays random loading messages from the 'loadingMessages.txt' file at a specified duration.
 * If numberOfMessages is provided, it limits the number of messages displayed.
 * @function
 * @name getRandomMessage
 * @param {number} [duration=3] - The duration in seconds between displaying messages. Default value is 3 seconds.
 * @param {number} [numberOfMessages] - The optional limit for the number of messages to be displayed.
 * @returns {function} A function that can be invoked to clear the interval and stop displaying messages.
 * @throws {Error} If there are no messages available to display.
 * @example
 * // Display a random message every 5 seconds, up to 10 messages
 */
const getRandomMessage = (duration = 3, numberOfMessages) => {
    const displayRandomLoadingMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield (0, exports.getAllMessages)();
        if (!messages.length)
            throw new Error("No messages available");
        let usedMessages = [];
        let currentIndex = 0;
        let intervalId = null;
        if (numberOfMessages !== undefined && currentIndex === numberOfMessages) {
            if (intervalId)
                clearInterval(intervalId);
            return;
        }
        if (usedMessages.length === messages.length) {
            usedMessages = [];
            currentIndex = 0;
        }
        let randomMessage;
        do {
            randomMessage = messages[Math.floor(Math.random() * messages.length)];
        } while (usedMessages.includes(randomMessage));
        usedMessages.push(randomMessage);
        currentIndex++;
        exports.messageEmitter.emit("message", randomMessage);
    });
    const intervalId = setInterval(displayRandomLoadingMessage, duration * 1000);
    return () => {
        if (intervalId)
            clearInterval(intervalId);
    };
};
exports.getRandomMessage = getRandomMessage;
exports.default = { getAllMessages: exports.getAllMessages, getRandomMessage: exports.getRandomMessage, messageEmitter: exports.messageEmitter };
