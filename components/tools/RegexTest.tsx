"use client";
import { useState } from "react";

export default function RegexTest() {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const test = () => {
    try {
      const re = new RegExp(pattern, flags);
      const m = [...text.matchAll(re)];
      setMatches(m.map(x => x[0]));
      setErr(m.length + " ???");
    } catch (e: any) { setErr(e.message); setMatches([]); }
  };
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <div><label>?????</label><input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="??: \\d+" /></div>
        <div><label>??</label><select value={flags} onChange={(e) => setFlags(e.target.value)}><option value="">?</option><option value="g">g</option><option value="gi">gi</option><option value="gm">gm</option><option value="gim">gim</option></select></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={test}>??</button></div>
      </div>
      <label>????</label>
      <textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="????????" />
      {err && <div className="result-box" style={{ marginTop: 12 }}>{err}</div>}
      {matches.length > 0 && (
        <div className="result-box" style={{ marginTop: 12 }}>
          {matches.map((m, i) => <div key={i} style={{ padding: "2px 0", display: "flex", gap: 8 }}><span style={{ color: "#9ca3af" }}>{i + 1}.</span><code style={{ background: "#dbeafe", padding: "0 6px", borderRadius: 4 }}>{m}</code></div>)}
        </div>
      )}
    </div>
  );
}
