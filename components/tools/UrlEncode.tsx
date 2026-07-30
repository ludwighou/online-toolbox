"use client";
import { useState } from "react";

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const convert = () => {
    try { setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input)); }
    catch { setOutput("??????" + (mode === "encode" ? "??" : "??")); }
  };
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <button className={"btn " + (mode === "encode" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("encode")}>??</button>
        <button className={"btn " + (mode === "decode" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("decode")}>??</button>
      </div>
      <label>{mode === "encode" ? "????" : "??URL?????"}</label>
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "??????URL??" : "??URL?????"} />
      <button className="btn btn-primary" onClick={convert} style={{ marginTop: 12 }}>??</button>
      {output && <textarea rows={6} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
