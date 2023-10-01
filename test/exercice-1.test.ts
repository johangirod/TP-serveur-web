import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

const SERVER_HOST = "http://localhost:3000";
describe("Exercice 1", () => {
  it("should have a ping route that returns 200", async () => {
    const res = await fetch(`${SERVER_HOST}/ping`);
    expect(res.status).toBe(200);
  });

  it("should serve index.html on /", async () => {
    const res = await fetch(`${SERVER_HOST}/`);
    expect(res.status).toBe(200);
    const dom = new JSDOM(await res.text());
    expect(
      dom.window.document
        .querySelector("[data-test-restaurant-title]")
        ?.textContent?.trim(),
    ).not.toBeFalsy();
  });

  it("should serve assets on /assets", async () => {
    const res = await fetch(`${SERVER_HOST}/assets/img/restaurant.jpg`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/jpeg");
  });
});
