"use client";
import { useState } from "react";

export default function AgeCalc() {
  const [birth, setBirth] = useState("");
  const [info, setInfo] = useState<Record<string, string>>({});
  const calc = () => {
    if (!birth) return;
    const b = new Date(birth), n = new Date();
    let age = n.getFullYear() - b.getFullYear();
    const m = n.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && n.getDate() < b.getDate())) age--;
    const diffMs = n.getTime() - b.getTime();
    const totalDays = Math.floor(diffMs / 86400000);
    const nextBirthday = new Date(n.getFullYear(), b.getMonth(), b.getDate());
    if (nextBirthday < n) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday.getTime() - n.getTime()) / 86400000);
    const d: Record<string, string> = {};
    d["Age"] = String(age);
    d["Birth Date"] = birth;
    d["Days Lived"] = totalDays.toLocaleString();
    d["Days to Birthday"] = String(daysToNext);
    setInfo(d);
  };
  return (
    <div className="tool-workspace">
      <div className="row">
        <div style={{ flex: 2 }}><label>Birth Date</label><input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={calc}>Calculate</button></div>
      </div>
      {Object.keys(info).length > 0 && (
        <div style={{ marginTop: 16 }}>
          {Object.entries(info).map(([k, v]) => (
            <div key={k} style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ width: 140, color: "#9ca3af", fontSize: 13 }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
