"use client";
import { useState } from "react";

function minifyCSS(css: string) { return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "").replace(/;}/g, "}").trim(); }
function beautifyCSS(css: string) {
  let indent = 0, out = "";
  css = css.replace(/\s*([{};])\s*/g, "");
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "{") { out += " {\n"; indent++; }
    else if (c === "}") { indent--; out += "\n" + "  ".repeat(indent) + "}\n"; }
    else if (c === ";") { out += ";\n" + "  ".repeat(indent); }
    else out += c;
  }
  return out.trim();
}

export default function CssMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="tool-workspace">
      <label>?? CSS</label>
      <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="??CSS??..." style={{ fontFamily: "monospace", fontSize: 13 }} />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={() => setOutput(minifyCSS(input))}>??</button>
        <button className="btn btn-secondary" onClick={() => setOutput(beautifyCSS(input))}>??</button>
      </div>
      {output && <textarea rows={8} readOnly value={output} style={{ marginTop: 12, fontFamily: "monospace", fontSize: 13, background: "#f9fafb" }} />}
    </div>
  );
}
