"use client";
import { useState } from "react";

function minifyJS(js: string) { return js.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "").replace(/\s+/g, " ").replace(/\s*([{}();,:])\s*/g, "").trim(); }
function beautifyJS(js: string) {
  let indent = 0, out = "", inStr = false, strCh = "";
  for (let i = 0; i < js.length; i++) {
    const c = js[i];
    if (inStr) { out += c; if (c === strCh) inStr = false; continue; }
    if (c === '"' || c === "'" || c === "") { inStr = true; strCh = c; out += c; continue; }
    if (c === "{" || c === "[") { out += c + "\n" + "  ".repeat(++indent); }
    else if (c === "}" || c === "]") { out += "\n" + "  ".repeat(--indent) + c; }
    else if (c === ";") { out += ";\n" + "  ".repeat(indent); }
    else if (c === ",") { out += ", "; }
    else out += c;
  }
  return out.trim();
}

export default function JsMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="tool-workspace">
      <label>?? JavaScript</label>
      <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="??JS??..." style={{ fontFamily: "monospace", fontSize: 13 }} />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={() => setOutput(minifyJS(input))}>??</button>
        <button className="btn btn-secondary" onClick={() => setOutput(beautifyJS(input))}>??</button>
      </div>
      {output && <textarea rows={8} readOnly value={output} style={{ marginTop: 12, fontFamily: "monospace", fontSize: 13, background: "#f9fafb" }} />}
    </div>
  );
}
