"use client";
import { useState } from "react";

const categories: Record<string, { units: string[]; rates: number[] }> = {
  Length: { units: ["m", "km", "cm", "mm", "mile", "ft", "in"], rates: [1, 1000, 100, 1000, 1609.34, 0.3048, 0.0254] },
  Weight: { units: ["kg", "g", "mg", "ton", "lb", "oz"], rates: [1, 1000, 1e6, 0.001, 0.4536, 0.02835] },
  Temperature: { units: ["Celsius", "Fahrenheit", "Kelvin"], rates: [1, 1, 1] },
  Area: { units: ["m2", "km2", "hectare", "mu", "ft2"], rates: [1, 1e6, 10000, 666.67, 0.0929] },
  Volume: { units: ["L", "mL", "m3", "gallon", "pint"], rates: [1, 1000, 0.001, 3.785, 0.473] },
};

export default function UnitConvert() {
  const [cat, setCat] = useState("Length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [val, setVal] = useState("1");
  const [result, setResult] = useState("");
  const c = categories[cat];
  const convert = () => {
    const v = parseFloat(val);
    if (isNaN(v)) { setResult("Invalid number"); return; }
    if (cat === "Temperature") {
      const idx = c.units.indexOf(from);
      let celsius = idx === 0 ? v : idx === 1 ? (v - 32) * 5 / 9 : v - 273.15;
      const tidx = c.units.indexOf(to);
      const r = tidx === 0 ? celsius : tidx === 1 ? celsius * 9 / 5 + 32 : celsius + 273.15;
      setResult(r.toFixed(4) + " " + to);
      return;
    }
    const fi = c.units.indexOf(from), ti = c.units.indexOf(to);
    const base = v * c.rates[fi];
    const r = base / c.rates[ti];
    setResult(r.toFixed(6) + " " + to);
  };
  return (
    <div className="tool-workspace">
      <label>Category</label>
      <select value={cat} onChange={(e) => { setCat(e.target.value); setFrom(categories[e.target.value].units[0]); setTo(categories[e.target.value].units[1]); }} style={{ marginBottom: 12 }}>
        {Object.keys(categories).map(k => <option key={k} value={k}>{k}</option>)}
      </select>
      <div className="row">
        <div><label>Value</label><input type="number" value={val} onChange={(e) => setVal(e.target.value)} /></div>
        <div><label>From</label><select value={from} onChange={(e) => setFrom(e.target.value)}>{c.units.map(u => <option key={u} value={u}>{u}</option>)}</select></div>
        <div><label>To</label><select value={to} onChange={(e) => setTo(e.target.value)}>{c.units.map(u => <option key={u} value={u}>{u}</option>)}</select></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={convert}>Convert</button></div>
      </div>
      {result && <div className="result-box" style={{ marginTop: 16, fontSize: 16, fontWeight: 600 }}>{result}</div>}
    </div>
  );
}
