import * as fs from "fs";
import * as path from "path";
import { getRandomMessage } from "../src/index";

describe("getRandomMessage", () => {
  beforeAll(() => {
    // mocking a small file
    fs.writeFileSync(
      path.join(__dirname, "test-messages.txt"),
      "message1\nmessage2\nmessage3\n"
    );
  });

  afterAll(() => {
    // perform some a cleanup after the tests
    fs.unlinkSync(path.join(__dirname, "test-messages.txt"));
  });

  it("returns an array of strings", () => {
    const messages = getRandomMessage();
    expect(Array.isArray(messages)).toBe(true);
  });
});
