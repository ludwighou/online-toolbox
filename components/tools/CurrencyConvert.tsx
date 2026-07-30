"use client";
import { useState } from "react";

const rates: Record<string, number> = {
  CNY:1, USD:0.139, EUR:0.128, JPY:20.94, KRW:184.5, GBP:0.109, HKD:1.088, AUD:0.209, CAD:0.189, SGD:0.186,
};

export default function CurrencyConvert() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("CNY");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState("");
  const convert = () => {
    const a = parseFloat(amount);
    if (isNaN(a)) { setResult("Invalid amount"); return; }
    const base = a / rates[from];
    const r = base * rates[to];
    setResult(a + " " + from + " = " + r.toFixed(2) + " " + to);
  };
  return (
    <div className="tool-workspace">
      <div className="row">
        <div><label>Amount</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        <div><label>From</label><select value={from} onChange={(e) => setFrom(e.target.value)}>{Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div><label>To</label><select value={to} onChange={(e) => setTo(e.target.value)}>{Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={convert}>Convert</button></div>
      </div>
      {result && <div className="result-box" style={{ marginTop: 16, fontSize: 18, fontWeight: 600, textAlign: "center" }}>{result}</div>}
      <div style={{ marginTop: 8, fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Reference rates only</div>
    </div>
  );
}
