"use client";
import { useState, useEffect } from "react";

export default function IpLookup() {
  const [ip, setIp] = useState("");
  const [info, setInfo] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  useEffect(() => { fetch("https://api.ipify.org?format=json").then(r => r.json()).then(d => setIp(d.ip)).catch(() => {}); }, []);
  const lookup = async () => {
    setLoading(true);
    try {
      const r = await fetch("https://ipapi.co/" + ip + "/json/");
      const d = await r.json();
      const result: Record<string, string> = {};
      result["IP Address"] = d.ip || ip;
      result["Country"] = d.country_name || "";
      result["Region"] = d.region || "";
      result["City"] = d.city || "";
      result["ISP"] = d.org || "";
      result["Timezone"] = d.timezone || "";
      setInfo(result);
    } catch { setInfo({"Error": "Query failed"}); }
    setLoading(false);
  };
  return (
    <div className="tool-workspace">
      <div className="row">
        <div style={{ flex: 2 }}><label>IP Address</label><input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Enter IP address" /></div>
        <div style={{ display: "flex", alignItems: "flex-end", flex: "0 0 auto" }}><button className="btn btn-primary" onClick={lookup} disabled={loading}>{loading ? "Loading..." : "Lookup"}</button></div>
      </div>
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
