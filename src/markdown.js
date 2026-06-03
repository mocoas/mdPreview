function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInline(raw) {
  let text = escapeHtml(raw);
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return text;
}

function renderTextBlocks(segment) {
  const lines = segment.split("\n");
  const html = [];
  const paragraph = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      html.push(`<p>${formatInline(paragraph.join(" "))}</p>`);
      paragraph.length = 0;
    }
  }

  for (const line of lines) {
    if (/^\s*$/.test(line)) {
      flushParagraph();
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${formatInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  return html.join("\n");
}

export function renderMarkdown(input) {
  const source = String(input ?? "").replace(/\r\n?/g, "\n").trim();
  if (!source) {
    return "<p>プレビュー対象の Markdown を入力してください。</p>";
  }

  const tokens = [];
  let cursor = 0;
  const codeBlockPattern = /```([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockPattern.exec(source)) !== null) {
    if (match.index > cursor) {
      tokens.push({ type: "text", value: source.slice(cursor, match.index) });
    }
    tokens.push({ type: "code", value: match[1].replace(/^\n/, "") });
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) {
    tokens.push({ type: "text", value: source.slice(cursor) });
  }

  return tokens
    .map((token) => {
      if (token.type === "code") {
        return `<pre><code>${escapeHtml(token.value)}</code></pre>`;
      }
      return renderTextBlocks(token.value);
    })
    .filter(Boolean)
    .join("\n");
}

export { escapeHtml };
