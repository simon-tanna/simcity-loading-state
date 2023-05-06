import { EventEmitter } from "events";
import { messages as loadingMessagesFile } from "./loadingMessages.json";
export const messageEmitter = new EventEmitter();
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
export const getAllMessages = async () => {
    return loadingMessagesFile;
};
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
export const getRandomMessage = (duration = 3, numberOfMessages) => {
    const displayRandomLoadingMessage = async () => {
        const messages = await getAllMessages();
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
        messageEmitter.emit("message", randomMessage);
    };
    const intervalId = setInterval(displayRandomLoadingMessage, duration * 1000);
    return () => {
        if (intervalId)
            clearInterval(intervalId);
    };
};
export default { getAllMessages, getRandomMessage, messageEmitter };
