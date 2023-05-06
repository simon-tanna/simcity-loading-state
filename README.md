# SimCity Loading Messages

This npm package provides an easy way to display random loading messages from a predefined text file, similar to the ones seen in the popular SimCity game series. The package exports a function that generates random loading messages at a specified duration and emits an event when a new message is generated.

## Installation

Install the package using npm:

`npm install simcity-loading-state`

or using yarn:

`yarn add simcity-loading-state`

## Usage

### Basic Example

```javascript
import { getRandomMessage, messageEmitter } from "simcity-loading-state";
// Start generating random messages every 3 seconds
const cancelInterval = getRandomMessage(3, undefined);
// Listen for events and handle the random messages
messageEmitter.on("message", (message) => {
  console.log("Random Message:", message);
});
// Cancel the interval when you want to stop displaying messages
setTimeout(() => {
  cancelInterval();
}, 15000);
```

### React JS Example

You can use the package in a React project as follows:

```javascript
import React, { useState, useEffect } from "react";
import { getRandomMessage, messageEmitter } from "simcity-loading-state";
const RandomMessageComponent = () => {
  const [randomMessage, setRandomMessage] = useState("");
  useEffect(() => {
    const handleMessage = (message) => {
      setRandomMessage(message);
    };
    // Start generating random messages
    const cancelInterval = getRandomMessage(3, undefined);
    // Listen for events and update the state
    messageEmitter.on("message", handleMessage);
    // Clean up when the component is unmounted
    return () => {
      cancelInterval();
      messageEmitter.removeListener("message", handleMessage);
    };
  }, []);
  return (
    <div>
      <h2>Random Message:</h2>
      <p>{randomMessage}</p>
    </div>
  );
};
export default RandomMessageComponent;
```

## API

`getAllMessages(): string[]`

This function retrieves all messages from the `loadingMessages.txt` file and returns them as an array of strings.

`getRandomMessage(duration: number, numberOfMessages?: number): () => void`

This function displays random loading messages from the `loadingMessages.txt` file at a specified duration (in seconds). If `numberOfMessages` is provided, it limits the number of messages displayed. It returns a function that can be invoked to clear the interval and stop displaying messages.

`messageEmitter: EventEmitter`

This instance of EventEmitter emits a "message" event with the random message as the event payload when a new message is generated.

## Thanks

A big thank you to [Erik Cox](https://gist.github.com/erikcox) for collating the list of loading states that I was able to use.

### License

MIT