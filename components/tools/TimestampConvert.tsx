"use client";
import { useState } from "react";

export default function TimestampConvert() {
  const [ts, setTs] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState<"ts2date" | "date2ts">("ts2date");
  const [result, setResult] = useState("");
  const now = () => { const n = Math.floor(Date.now() / 1000); setTs(String(n)); setResult(new Date(n * 1000).toLocaleString("en-US")); };
  const convert = () => {
    if (mode === "ts2date") {
      const t = parseInt(ts);
      if (isNaN(t)) { setResult("Invalid timestamp"); return; }
      setResult(new Date(ts.length > 10 ? t : t * 1000).toLocaleString("en-US"));
    } else {
      if (!date) { setResult("Please select a date"); return; }
      setResult(String(Math.floor(new Date(date).getTime() / 1000)));
    }
  };
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 16 }}>
        <button className={"btn " + (mode === "ts2date" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("ts2date")}>Timestamp to Date</button>
        <button className={"btn " + (mode === "date2ts" ? "btn-primary" : "btn-secondary")} onClick={() => setMode("date2ts")}>Date to Timestamp</button>
      </div>
      {mode === "ts2date" ? (
        <div className="row">
          <div style={{ flex: 2 }}><label>Unix Timestamp (sec)</label><input value={ts} onChange={(e) => setTs(e.target.value)} placeholder="e.g. 1700000000" /></div>
          <div style={{ display: "flex", alignItems: "flex-end", flex: "0 0 auto" }}><button className="btn btn-secondary" onClick={now}>Now</button></div>
        </div>
      ) : (
        <div><label>Date & Time</label><input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      )}
      <button className="btn btn-primary" onClick={convert} style={{ marginTop: 16 }}>Convert</button>
      {result && <div className="result-box" style={{ marginTop: 16, fontSize: 15, fontWeight: 600 }}>{result}</div>}
    </div>
  );
}
