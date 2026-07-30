"use client";
import { useState } from "react";

export default function TextSort() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const sortAsc = () => setOutput(input.split("\n").filter(Boolean).sort((a, b) => a.localeCompare(b)).join("\n"));
  const sortDesc = () => setOutput(input.split("\n").filter(Boolean).sort((a, b) => b.localeCompare(a)).join("\n"));
  const shuffle = () => setOutput(input.split("\n").filter(Boolean).sort(() => Math.random() - 0.5).join("\n"));
  const reverse = () => setOutput(input.split("\n").filter(Boolean).reverse().join("\n"));
  return (
    <div className="tool-workspace">
      <label>Input (one per line)</label>
      <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="One entry per line..." />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={sortAsc}>Asc</button>
        <button className="btn btn-secondary" onClick={sortDesc}>Desc</button>
        <button className="btn btn-secondary" onClick={shuffle}>Shuffle</button>
        <button className="btn btn-secondary" onClick={reverse}>Reverse</button>
      </div>
      {output && <textarea rows={8} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
