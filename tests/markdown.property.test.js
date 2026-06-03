import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { escapeHtml, renderMarkdown } from "../src/markdown.js";

describe("markdown property tests", () => {
  it("escaped text never contains raw angle brackets", () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const escaped = escapeHtml(input);
        expect(escaped.includes("<")).toBe(false);
        expect(escaped.includes(">")).toBe(false);
      }),
      { seed: 20260603, numRuns: 200 }
    );
  });

  it("rendered markdown never emits script tags from input", () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const html = renderMarkdown(input);
        expect(html.toLowerCase().includes("<script")).toBe(false);
      }),
      { seed: 20260603, numRuns: 200 }
    );
  });
});
