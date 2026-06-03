export const TAB_INPUT = "input";
export const TAB_PREVIEW = "preview";

const VALID_TABS = new Set([TAB_INPUT, TAB_PREVIEW]);

export function isValidTab(tab) {
  return VALID_TABS.has(tab);
}

export function transitionTab(currentTab, nextTab) {
  if (!isValidTab(currentTab)) {
    currentTab = TAB_INPUT;
  }
  if (!isValidTab(nextTab)) {
    return currentTab;
  }
  return nextTab;
}

export function serializeTabState(tab) {
  const safeTab = isValidTab(tab) ? tab : TAB_INPUT;
  return JSON.stringify({ activeTab: safeTab });
}

export function deserializeTabState(payload) {
  try {
    const parsed = JSON.parse(payload);
    if (isValidTab(parsed.activeTab)) {
      return parsed.activeTab;
    }
  } catch {
    // Fallback to the default tab when payload is invalid.
  }
  return TAB_INPUT;
}
