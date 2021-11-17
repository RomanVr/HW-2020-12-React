import { sleep } from "./sleep";

describe("Sleep tests", () => {
  it("test resolve", async () => {
    const time = 200;
    await expect(sleep(time)).resolves.toBe(undefined);
  });
});
