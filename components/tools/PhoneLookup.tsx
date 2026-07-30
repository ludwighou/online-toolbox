"use client";
import { useState } from "react";

const carrierDB: Record<string, string> = {
  "130":"China Unicom","131":"China Unicom","132":"China Unicom","133":"China Telecom","134":"China Mobile",
  "135":"China Mobile","136":"China Mobile","137":"China Mobile","138":"China Mobile","139":"China Mobile",
  "145":"China Unicom","147":"China Mobile","150":"China Mobile","151":"China Mobile","152":"China Mobile",
  "153":"China Telecom","155":"China Unicom","156":"China Unicom","157":"China Mobile","158":"China Mobile",
  "159":"China Mobile","166":"China Unicom","170":"MVNO","171":"MVNO","172":"China Mobile","173":"China Telecom",
  "174":"China Telecom","175":"China Unicom","176":"China Unicom","177":"China Telecom","178":"China Mobile",
  "180":"China Telecom","181":"China Telecom","182":"China Mobile","183":"China Mobile","184":"China Mobile",
  "185":"China Unicom","186":"China Unicom","187":"China Mobile","188":"China Mobile","189":"China Telecom",
  "190":"China Telecom","191":"China Telecom","193":"China Telecom","195":"China Mobile","196":"China Unicom",
  "197":"China Mobile","198":"China Mobile","199":"China Telecom",
};

export default function PhoneLookup() {
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState<Record<string, string>>({});
  const lookup = () => {
    const clean = phone.replace(/\D/g, "");
    const d: Record<string, string> = {};
    if (clean.length === 11 && clean.startsWith("1")) {
      const prefix = clean.slice(0, 3);
      d["Carrier"] = carrierDB[prefix] || "Unknown";
    }
    if (!Object.keys(d).length) d["Hint"] = "Enter 11-digit mobile number";
    setInfo(d);
  };
  return (
    <div className="tool-workspace">
      <label>Phone Number</label>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
      <button className="btn btn-primary" onClick={lookup} style={{ marginTop: 12 }}>Lookup</button>
      {Object.keys(info).length > 0 && (
        <div style={{ marginTop: 16 }}>
          {Object.entries(info).map(([k, v]) => (
            <div key={k} style={{ display: "flex", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ width: 80, color: "#9ca3af", fontSize: 13 }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
