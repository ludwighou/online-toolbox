"use client";
import { useState } from "react";

export default function IdCardParser() {
  const [id, setId] = useState("");
  const [info, setInfo] = useState<Record<string, string>>({});
  const parse = () => {
    const d: Record<string, string> = {};
    const s = id.trim();
    if (!/^\d{17}[\dXx]$/.test(s)) { d["Hint"] = "Enter 18-digit ID number"; setInfo(d); return; }
    const w = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    const c = "10X98765432";
    let sum = 0;
    for (let i = 0; i < 17; i++) sum += parseInt(s[i]) * w[i];
    d["Checksum"] = c[sum % 11] === s[17].toUpperCase() ? "Valid" : "Invalid";
    d["Birth Date"] = s.slice(6, 10) + "-" + s.slice(10, 12) + "-" + s.slice(12, 14);
    d["Gender"] = parseInt(s[16]) % 2 === 1 ? "Male" : "Female";
    d["Age"] = String(new Date().getFullYear() - parseInt(s.slice(6, 10)));
    setInfo(d);
  };
  return (
    <div className="tool-workspace">
      <label>ID Card Number</label>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter 18-digit ID number" />
      <button className="btn btn-primary" onClick={parse} style={{ marginTop: 12 }}>Parse</button>
      {Object.keys(info).length > 0 && (
        <div style={{ marginTop: 16 }}>
          {Object.entries(info).map(([k, v]) => (
            <div key={k} style={{ display: "flex", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ width: 100, color: "#9ca3af", fontSize: 13 }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: v === "Valid" ? "#059669" : v === "Invalid" ? "#dc2626" : "inherit" }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
