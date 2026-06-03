import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  deserializeTabState,
  serializeTabState,
  TAB_INPUT,
  TAB_PREVIEW,
  transitionTab,
} from "../src/state.js";

describe("state property tests", () => {
  it("serialize/deserialize round-trip keeps tab value", () => {
    fc.assert(
      fc.property(fc.constantFrom(TAB_INPUT, TAB_PREVIEW), (tab) => {
        expect(deserializeTabState(serializeTabState(tab))).toBe(tab);
      }),
      { seed: 20260603, numRuns: 200 }
    );
  });

  it("transition always yields a valid tab", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (current, next) => {
        const result = transitionTab(current, next);
        expect([TAB_INPUT, TAB_PREVIEW]).toContain(result);
      }),
      { seed: 20260603, numRuns: 200 }
    );
  });
});
