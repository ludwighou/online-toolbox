"use client";
import { useState } from "react";

const bankPrefix: Record<string, string> = {
  "62":"UnionPay","4":"Visa","5":"MasterCard","37":"AmEx","60":"Discover","35":"JCB","9":"UnionPay",
};

export default function BankCardValidate() {
  const [card, setCard] = useState("");
  const [info, setInfo] = useState<Record<string, string>>({});
  const validate = () => {
    const s = card.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(s)) { setInfo({"Hint":"Enter 13-19 digit card number"}); return; }
    let sum = 0; let alt = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let n = parseInt(s[i]);
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n; alt = !alt;
    }
    const d: Record<string, string> = {};
    d["Length"] = s.length + " digits";
    d["Luhn"] = sum % 10 === 0 ? "Pass" : "Fail";
    for (const [p, name] of Object.entries(bankPrefix)) {
      if (s.startsWith(p)) { d["Network"] = name; break; }
    }
    if (!d["Network"]) d["Network"] = "Unknown";
    setInfo(d);
  };
  return (
    <div className="tool-workspace">
      <label>Card Number</label>
      <input value={card} onChange={(e) => setCard(e.target.value)} placeholder="Enter card number" />
      <button className="btn btn-primary" onClick={validate} style={{ marginTop: 12 }}>Validate</button>
      {Object.keys(info).length > 0 && (
        <div style={{ marginTop: 16 }}>
          {Object.entries(info).map(([k, v]) => (
            <div key={k} style={{ display: "flex", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ width: 80, color: "#9ca3af", fontSize: 13 }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: v === "Pass" ? "#059669" : v === "Fail" ? "#dc2626" : "inherit" }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
