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

function isTableSeparatorLine(line) {
  if (!line.includes("|")) {
    return false;
  }

  const cells = line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseTableCells(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(blockLines) {
  const [headerLine, , ...bodyLines] = blockLines;
  const headers = parseTableCells(headerLine);
  const rows = bodyLines
    .map(parseTableCells)
    .filter((cells) => cells.length > 0 && cells.some((cell) => cell !== ""));

  const headerHtml = headers
    .map((cell) => `<th>${formatInline(cell)}</th>`)
    .join("");
  const bodyHtml = rows
    .map((cells) => {
      const tds = cells
        .map((cell) => `<td>${formatInline(cell)}</td>`)
        .join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");

  return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
}

function renderTextBlocks(segment) {
  const lines = segment.split("\n");
  const html = [];
  const paragraph = [];
  const listItems = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      html.push(`<p>${formatInline(paragraph.join(" "))}</p>`);
      paragraph.length = 0;
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      const items = listItems
        .map((item) => `<li>${formatInline(item)}</li>`)
        .join("");
      html.push(`<ul>${items}</ul>`);
      listItems.length = 0;
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }

    const nextLine = lines[i + 1];
    if (line.includes("|") && nextLine && isTableSeparatorLine(nextLine)) {
      flushParagraph();
      flushList();
      const tableLines = [line, nextLine];
      let j = i + 2;

      while (j < lines.length && lines[j].includes("|") && !/^\s*$/.test(lines[j])) {
        tableLines.push(lines[j]);
        j += 1;
      }

      html.push(renderTable(tableLines));
      i = j - 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${formatInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      continue;
    }

    flushList();

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
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
