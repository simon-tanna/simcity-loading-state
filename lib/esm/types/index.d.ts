/// <reference types="node" />
import { EventEmitter } from "events";
export declare const messageEmitter: EventEmitter;
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
export declare const getAllMessages: () => Promise<string[]>;
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
export declare const getRandomMessage: (duration?: number, numberOfMessages?: number) => (() => void);
declare const _default: {
    getAllMessages: () => Promise<string[]>;
    getRandomMessage: (duration?: number, numberOfMessages?: number | undefined) => () => void;
    messageEmitter: EventEmitter;
};
export default _default;
//# sourceMappingURL=index.d.ts.map