import { renderMarkdown } from "./markdown.js";
import { TAB_INPUT, TAB_PREVIEW, transitionTab } from "./state.js";

const MAX_INPUT_BYTES = 200 * 1024;

const tabs = Array.from(document.querySelectorAll("[role='tab']"));
const panelInput = document.getElementById("panel-input");
const panelPreview = document.getElementById("panel-preview");
const input = document.getElementById("markdown-input");
const preview = document.getElementById("preview-output");
const statusMessage = document.getElementById("status-message");

let activeTab = TAB_INPUT;

function getUtf8Length(text) {
  return new TextEncoder().encode(text).length;
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "var(--warn)" : "var(--accent-strong)";
}

function renderPreviewFromInput() {
  const rawText = input.value;
  const sizeBytes = getUtf8Length(rawText);

  if (sizeBytes > MAX_INPUT_BYTES) {
    const sizeKb = Math.ceil(sizeBytes / 1024);
    setStatus(`入力サイズが上限を超えています (${sizeKb}KB / 上限200KB)。`, true);
    preview.innerHTML = "<p>入力サイズを減らしてから再度プレビューしてください。</p>";
    return;
  }

  const html = renderMarkdown(rawText);
  preview.innerHTML = html;
  setStatus(`プレビューを更新しました (${Math.ceil(sizeBytes / 1024)}KB)。`);
}

function applyTabUi(nextTab) {
  const isInput = nextTab === TAB_INPUT;

  panelInput.classList.toggle("is-hidden", !isInput);
  panelPreview.classList.toggle("is-hidden", isInput);

  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === nextTab;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", selected ? "true" : "false");
    tab.setAttribute("tabindex", selected ? "0" : "-1");
  });
}

function activateTab(nextTab) {
  activeTab = transitionTab(activeTab, nextTab);
  applyTabUi(activeTab);

  if (activeTab === TAB_PREVIEW) {
    renderPreviewFromInput();
  } else {
    input.focus();
  }
}

function getNextTabByArrow(current, key) {
  if (key !== "ArrowLeft" && key !== "ArrowRight") {
    return current;
  }
  if (key === "ArrowRight") {
    return current === TAB_INPUT ? TAB_PREVIEW : TAB_INPUT;
  }
  return current === TAB_PREVIEW ? TAB_INPUT : TAB_PREVIEW;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab);
  });

  tab.addEventListener("keydown", (event) => {
    const next = getNextTabByArrow(activeTab, event.key);
    if (next !== activeTab) {
      event.preventDefault();
      activateTab(next);
      const selectedButton = tabs.find((item) => item.dataset.tab === next);
      selectedButton?.focus();
    }
  });
});

activateTab(TAB_INPUT);
