"use client";
import { useState } from "react";

export default function DateCalc() {
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [days, setDays] = useState("");
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const [result, setResult] = useState("");
  const calc = () => {
    if (mode === "diff" && d1 && d2) {
      const diff = Math.abs(new Date(d2).getTime() - new Date(d1).getTime()) / 86400000;
      setResult(diff + " ?");
    } else if (mode === "add" && d1 && days) {
      const d = new Date(d1); d.setDate(d.getDate() + parseInt(days));
      setResult(d.toISOString().split("T")[0]);
    } else { setResult("???????"); }
  };
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 16 }}>
        <button className={"btn " + (mode === "diff" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("diff")}>?????</button>
        <button className={"btn " + (mode === "add" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("add")}>????</button>
      </div>
      {mode === "diff" ? (
        <div className="row">
          <div><label>?? 1</label><input type="date" value={d1} onChange={(e) => setD1(e.target.value)} /></div>
          <div><label>?? 2</label><input type="date" value={d2} onChange={(e) => setD2(e.target.value)} /></div>
        </div>
      ) : (
        <div className="row">
          <div><label>????</label><input type="date" value={d1} onChange={(e) => setD1(e.target.value)} /></div>
          <div><label>?? (+/-)</label><input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="??: 30 ? -7" /></div>
        </div>
      )}
      <button className="btn btn-primary" onClick={calc} style={{ marginTop: 16 }}>??</button>
      {result && <div className="result-box" style={{ marginTop: 16, fontSize: 16, fontWeight: 600 }}>{result}</div>}
    </div>
  );
}
