"use client";
import { useState } from "react";

const esc: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const unesc: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };

export default function HtmlEscape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const convert = () => {
    if (mode === "escape") setOutput(input.replace(/[&<>"']/g, (c) => esc[c]));
    else setOutput(input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (c) => unesc[c]));
  };
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <button className={"btn " + (mode === "escape" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("escape")}>?? Escape</button>
        <button className={"btn " + (mode === "unescape" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("unescape")}>??? Unescape</button>
      </div>
      <label>?? HTML</label>
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "escape" ? "<div>Hello</div>" : "&lt;div&gt;Hello&lt;/div&gt;"} />
      <button className="btn btn-primary" onClick={convert} style={{ marginTop: 12 }}>??</button>
      {output && <textarea rows={6} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
