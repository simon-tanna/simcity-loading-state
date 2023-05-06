/* eslint-disable */

import React, { useState, useEffect } from "react";
import { getRandomMessage, messageEmitter } from "simcity-loading-state"";

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
