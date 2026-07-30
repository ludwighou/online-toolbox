"use client";
import { useState } from "react";

const presets: [string, string][] = [
  ["Every minute", "* * * * *"],
  ["Every 5min", "*/5 * * * *"],
  ["Every hour", "0 * * * *"],
  ["Daily 0:00", "0 0 * * *"],
  ["Daily 8:00", "0 8 * * *"],
  ["Mon 0:00", "0 0 * * 1"],
  ["1st 0:00", "0 0 1 * *"],
];

export default function CronGenerator() {
  const [min, setMin] = useState("*");
  const [hour, setHour] = useState("*");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const cron = [min, hour, dom, month, dow].join(" ");
  const explain = () => {
    const p: string[] = [];
    if (min === "*") p.push("Every minute");
    else if (min.startsWith("*/")) p.push("Every " + min.slice(2) + " min");
    else p.push("Minute " + min);
    if (hour === "*") p.push("every hour");
    else p.push("hour " + hour);
    if (dom !== "*") p.push("day " + dom);
    if (month !== "*") p.push("month " + month);
    if (dow === "1") p.push("Monday");
    return p.join(" ") || "Every minute";
  };
  const applyPreset = (val: string) => {
    const p = val.split(" ");
    setMin(p[0]); setHour(p[1]); setDom(p[2]); setMonth(p[3]); setDow(p[4]);
  };
  return (
    <div className="tool-workspace">
      <label>Presets</label>
      <div className="row" style={{ marginBottom: 16 }}>
        {presets.slice(0, 5).map(([name, val]) => (
          <button key={name} className="btn btn-secondary" onClick={() => applyPreset(val)}>{name}</button>
        ))}
      </div>
      <div className="row">
        {[
          { label: "Minute", val: min, set: setMin },
          { label: "Hour", val: hour, set: setHour },
          { label: "Day", val: dom, set: setDom },
          { label: "Month", val: month, set: setMonth },
          { label: "DOW", val: dow, set: setDow },
        ].map(f => (
          <div key={f.label}><label>{f.label}</label><input value={f.val} onChange={(e) => f.set(e.target.value)} /></div>
        ))}
      </div>
      <div className="result-box" style={{ marginTop: 16, fontFamily: "monospace", fontSize: 18, textAlign: "center", letterSpacing: 4 }}>{cron}</div>
      <div style={{ marginTop: 8, fontSize: 14, color: "#6b7280", textAlign: "center" }}>{explain()}</div>
    </div>
  );
}
