import { describe, expect, it } from "vitest";
import {
  deserializeTabState,
  isValidTab,
  serializeTabState,
  TAB_INPUT,
  TAB_PREVIEW,
  transitionTab,
} from "../src/state.js";

describe("tab state", () => {
  it("validates known tabs", () => {
    expect(isValidTab(TAB_INPUT)).toBe(true);
    expect(isValidTab(TAB_PREVIEW)).toBe(true);
    expect(isValidTab("other")).toBe(false);
  });

  it("rejects invalid transitions", () => {
    expect(transitionTab(TAB_INPUT, "x")).toBe(TAB_INPUT);
  });

  it("serializes and deserializes state", () => {
    const encoded = serializeTabState(TAB_PREVIEW);
    expect(deserializeTabState(encoded)).toBe(TAB_PREVIEW);
  });

  it("falls back on malformed payload", () => {
    expect(deserializeTabState("not-json")).toBe(TAB_INPUT);
  });
});
