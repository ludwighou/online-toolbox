"use client";
import { useState } from "react";

function genUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const generate = () => setUuids(Array.from({ length: count }, () => genUUID()));
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <div><label>????</label><input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={generate}>?? UUID</button></div>
      </div>
      {uuids.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {uuids.map((u, i) => <div key={i} className="result-box" style={{ marginTop: 4, fontFamily: "monospace", fontSize: 13 }}>{u}</div>)}
        </div>
      )}
    </div>
  );
}
