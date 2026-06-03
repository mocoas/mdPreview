import { describe, expect, it } from "vitest";
import { escapeHtml, renderMarkdown } from "../src/markdown.js";

describe("markdown rendering", () => {
  it("escapes dangerous tags", () => {
    const html = renderMarkdown("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("renders headings and inline emphasis", () => {
    const html = renderMarkdown("# 見出し\n\n本文 **強調** と *斜体*");
    expect(html).toContain("<h1>見出し</h1>");
    expect(html).toContain("<strong>強調</strong>");
    expect(html).toContain("<em>斜体</em>");
  });

  it("renders fenced code blocks", () => {
    const html = renderMarkdown("```\nconst a = 1;\n```");
    expect(html).toContain("<pre><code>");
    expect(html).toContain("const a = 1;");
  });

  it("escapeHtml converts five dangerous characters", () => {
    expect(escapeHtml('<>&\"\''))
      .toBe("&lt;&gt;&amp;&quot;&#39;");
  });
});
