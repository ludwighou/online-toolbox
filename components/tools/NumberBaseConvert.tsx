"use client";
import { useState } from "react";

const bases = [
  { label: "??? (Bin)", radix: 2 },
  { label: "??? (Oct)", radix: 8 },
  { label: "??? (Dec)", radix: 10 },
  { label: "???? (Hex)", radix: 16 },
];

export default function NumberBaseConvert() {
  const [input, setInput] = useState("");
  const [from, setFrom] = useState(10);
  const val = parseInt(input, from);
  const isValid = !isNaN(val) && input.trim() !== "";
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <div><label>????</label><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="??: 255" /></div>
        <div><label>????</label><select value={from} onChange={(e) => setFrom(Number(e.target.value))}>{bases.map(b => <option key={b.radix} value={b.radix}>{b.label}</option>)}</select></div>
      </div>
      {isValid && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, marginTop: 12 }}>
          {bases.map(b => (
            <div key={b.radix} style={{ background: "#f9fafb", borderRadius: 6, padding: 10 }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{b.label}</div>
              <div style={{ fontSize: 15, fontFamily: "monospace", fontWeight: 600 }}>{val.toString(b.radix).toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
