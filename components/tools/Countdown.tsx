"use client";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [target, setTarget] = useState("");
  const [label, setLabel] = useState("");
  const [remain, setRemain] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    if (!target) return;
    const timer = setInterval(() => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) { setRemain({ d: 0, h: 0, m: 0, s: 0 }); clearInterval(timer); return; }
      setRemain({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <div><label>????</label><input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} /></div>
        <div><label>???? (??)</label><input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="??: ??" /></div>
      </div>
      {remain && (
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
          {[{ v: remain.d, u: "?" }, { v: remain.h, u: "?" }, { v: remain.m, u: "?" }, { v: remain.s, u: "?" }].map((x) => (
            <div key={x.u} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: "#2563eb", fontFamily: "monospace", minWidth: 60 }}>{String(x.v).padStart(2, "0")}</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>{x.u}</div>
            </div>
          ))}
        </div>
      )}
      {label && remain && <div style={{ textAlign: "center", marginTop: 16, fontSize: 15, color: "#6b7280" }}>?? <strong>{label}</strong></div>}
    </div>
  );
}
