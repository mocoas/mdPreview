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

  it("renders markdown tables", () => {
    const html = renderMarkdown("| 列A | 列B |\n| --- | --- |\n| 1 | 2 |");
    expect(html).toContain("<table>");
    expect(html).toContain("<th>列A</th>");
    expect(html).toContain("<th>列B</th>");
    expect(html).toContain("<td>1</td>");
    expect(html).toContain("<td>2</td>");
  });

  it("renders unordered lists", () => {
    const html = renderMarkdown("- りんご\n- みかん");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>りんご</li>");
    expect(html).toContain("<li>みかん</li>");
  });

  it("separates paragraph and list blocks correctly", () => {
    const html = renderMarkdown("導入文\n- 項目A\n- 項目B\n締め");
    expect(html).toContain("<p>導入文</p>");
    expect(html).toContain("<ul><li>項目A</li><li>項目B</li></ul>");
    expect(html).toContain("<p>締め</p>");
  });

  it("escapeHtml converts five dangerous characters", () => {
    expect(escapeHtml('<>&\"\''))
      .toBe("&lt;&gt;&amp;&quot;&#39;");
  });
});
