"use client";
import { useState } from "react";

export default function BmiCalc() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [result, setResult] = useState("");
  const calc = () => {
    const h = parseFloat(height) / 100, w = parseFloat(weight);
    if (!h || !w) { setResult("Invalid input"); return; }
    const bmi = w / (h * h);
    let level = "", color = "";
    if (bmi < 18.5) { level = "Underweight"; color = "#0ea5e9"; }
    else if (bmi < 24) { level = "Normal"; color = "#059669"; }
    else if (bmi < 28) { level = "Overweight"; color = "#d97706"; }
    else { level = "Obese"; color = "#dc2626"; }
    setResult(bmi.toFixed(1) + " | " + level);
  };
  return (
    <div className="tool-workspace">
      <div className="row">
        <div><label>Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
        <div><label>Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={calc}>Calculate</button></div>
      </div>
      {result && <div className="result-box" style={{ marginTop: 16, fontSize: 24, fontWeight: 700, textAlign: "center" }}>{result}</div>}
      <div style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        <span style={{ color: "#0ea5e9" }}>&lt;18.5 Underweight</span> | <span style={{ color: "#059669" }}>18.5-24 Normal</span> | <span style={{ color: "#d97706" }}>24-28 Overweight</span> | <span style={{ color: "#dc2626" }}>28+ Obese</span>
      </div>
    </div>
  );
}
