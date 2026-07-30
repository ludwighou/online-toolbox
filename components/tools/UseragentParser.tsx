"use client";
import { useState, useEffect } from "react";

export default function UseragentParser() {
  const [ua, setUa] = useState("");
  const [info, setInfo] = useState<Record<string, string>>({});
  useEffect(() => { setUa(navigator.userAgent); }, []);
  const parse = () => {
    const d: Record<string, string> = { "UA String": ua };
    if (/Edg\//.test(ua)) d["Browser"] = "Edge " + (ua.match(/Edg\/([\d.]+)/)?.[1] ?? "");
    else if (/Chrome\//.test(ua)) d["Browser"] = "Chrome " + (ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "");
    else if (/Firefox\//.test(ua)) d["Browser"] = "Firefox " + (ua.match(/Firefox\/([\d.]+)/)?.[1] ?? "");
    else if (/Safari\//.test(ua)) d["Browser"] = "Safari " + (ua.match(/Version\/([\d.]+)/)?.[1] ?? "");
    if (/Windows/.test(ua)) d["OS"] = "Windows";
    else if (/Mac OS/.test(ua)) d["OS"] = "macOS";
    else if (/Linux/.test(ua)) d["OS"] = "Linux";
    else if (/Android/.test(ua)) d["OS"] = "Android";
    else if (/iPhone|iPad/.test(ua)) d["OS"] = "iOS";
    d["Device"] = /Mobile|Android/.test(ua) ? "Mobile" : "Desktop";
    setInfo(d);
  };
  return (
    <div className="tool-workspace">
      <label>UserAgent String</label>
      <textarea rows={4} value={ua} onChange={(e) => setUa(e.target.value)} style={{ fontFamily: "monospace", fontSize: 12 }} />
      <button className="btn btn-primary" onClick={parse} style={{ marginTop: 12 }}>Parse</button>
      {Object.keys(info).length > 0 && (
        <div style={{ marginTop: 16 }}>
          {Object.entries(info).map(([k, v]) => (
            <div key={k} style={{ display: "flex", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ width: 100, color: "#9ca3af", fontSize: 13 }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
