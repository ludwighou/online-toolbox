"use client";
import { useState } from "react";

function diff(a: string, b: string) {
  const al = a.split("\n"), bl = b.split("\n");
  const m = Math.max(al.length, bl.length);
  const r: { type: "same"|"add"|"remove"|"change"; left: string; right: string }[] = [];
  for (let i = 0; i < m; i++) {
    const l = al[i] ?? "", r2 = bl[i] ?? "";
    if (l === r2) r.push({ type: "same", left: l, right: r2 });
    else if (!l) r.push({ type: "add", left: "", right: r2 });
    else if (!r2) r.push({ type: "remove", left: l, right: "" });
    else r.push({ type: "change", left: l, right: r2 });
  }
  return r;
}

export default function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const rows = diff(left, right);
  return (
    <div className="tool-workspace">
      <div className="row">
        <div style={{ flex: 1 }}><label>????</label><textarea rows={10} value={left} onChange={(e) => setLeft(e.target.value)} placeholder="????" /></div>
        <div style={{ flex: 1 }}><label>???</label><textarea rows={10} value={right} onChange={(e) => setRight(e.target.value)} placeholder="???" /></div>
      </div>
      <div className="result-box" style={{ marginTop: 16, fontFamily: "monospace", fontSize: 13, maxHeight: 400, overflow: "auto" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ padding: "1px 8px", background: r.type === "add" ? "#d1fae5" : r.type === "remove" ? "#fee2e2" : r.type === "change" ? "#fef3c7" : "transparent" }}>
            <span style={{ width: 24, display: "inline-block", color: "#9ca3af" }}>{i + 1}</span>
            <span style={r.type === "remove" || r.type === "change" ? { background: "#fca5a5", textDecoration: "line-through" } : {}}>{r.left || "\u00a0"}</span>
            {r.type === "change" && " ? "}
            <span style={r.type === "add" || r.type === "change" ? { background: "#86efac" } : {}}>{r.type !== "remove" ? r.right : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
