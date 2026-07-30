"use client";
import { useState } from "react";

export default function TextDedup() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [info, setInfo] = useState("");
  const dedup = () => {
    const lines = input.split("\n");
    const unique = [...new Set(lines.filter(Boolean))];
    setOutput(unique.join("\n"));
    setInfo("Removed " + (lines.filter(Boolean).length - unique.length) + " duplicates, kept " + unique.length + " lines");
  };
  return (
    <div className="tool-workspace">
      <label>Input (one per line)</label>
      <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="One entry per line..." />
      <button className="btn btn-primary" onClick={dedup} style={{ marginTop: 12 }}>Dedup</button>
      {info && <div className="result-box" style={{ marginTop: 8 }}>{info}</div>}
      {output && <textarea rows={8} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
