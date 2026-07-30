"use client";
import { useState } from "react";

export default function RandomPicker() {
  const [items, setItems] = useState("");
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const pick = () => {
    const list = items.split("\n").map(s => s.trim()).filter(Boolean);
    if (!list.length) { setResults(["??????"]); return; }
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setResults(shuffled.slice(0, Math.min(count, list.length)));
  };
  return (
    <div className="tool-workspace">
      <label>?????????</label>
      <textarea rows={6} value={items} onChange={(e) => setItems(e.target.value)} placeholder={"??A\n??B\n??C"} />
      <div className="row" style={{ marginTop: 12 }}>
        <div><label>????</label><input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={pick}>????</button></div>
      </div>
      {results.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {results.map((r, i) => (
            <div key={i} className="result-box" style={{ marginTop: 4, fontSize: 18, fontWeight: 700, textAlign: "center" }}>
              {i === 0 && results.length > 1 && "?? "}{r}{i === 0 && results.length > 1 && " ??"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
