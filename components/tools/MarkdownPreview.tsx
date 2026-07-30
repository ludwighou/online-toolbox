"use client";
import { useState } from "react";

function md2html(md: string): string {
  let h = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, "<h3></h3>")
    .replace(/^## (.+)$/gm, "<h2></h2>")
    .replace(/^# (.+)$/gm, "<h1></h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong></strong>")
    .replace(/\*(.+?)\*/g, "<em></em>")
    .replace(/([^]+)/g, "<code></code>")
    .replace(/^\- (.+)$/gm, "<li></li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li></li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href=""></a>');
  h = "<p>" + h + "</p>";
  h = h.replace(/<p><h([1-3])>/g, "<h>").replace(/<\/h([1-3])><\/p>/g, "</h>");
  h = h.replace(/(<li>[^<]*<\/li>)/g, "<ul></ul>");
  return h;
}

export default function MarkdownPreview() {
  const [input, setInput] = useState("");
  return (
    <div className="tool-workspace">
      <div className="row">
        <div style={{ flex: 1 }}>
          <label>Markdown ??</label>
          <textarea rows={14} value={input} onChange={(e) => setInput(e.target.value)} placeholder="# ??\n\n**??** *??*\n\n- ???" style={{ fontFamily: "monospace", fontSize: 14 }} />
        </div>
        <div style={{ flex: 1 }}>
          <label>??</label>
          <div className="result-box" style={{ minHeight: 300 }} dangerouslySetInnerHTML={{ __html: md2html(input) }} />
        </div>
      </div>
    </div>
  );
}
