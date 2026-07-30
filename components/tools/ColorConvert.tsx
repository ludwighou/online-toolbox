"use client";
import { useState } from "react";

function hexToRgb(h: string) { const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h); return m ? [parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)] : null; }
function rgbToHex(r: number, g: number, b: number) { return "#" + [r,g,b].map(x => x.toString(16).padStart(2,"0")).join(""); }
function rgbToHsl(r: number, g: number, b: number) { r/=255;g/=255;b/=255; const mx=Math.max(r,g,b),mn=Math.min(r,g,b); let h=0,s=0,l=(mx+mn)/2; if(mx!==mn){ const d=mx-mn; s=l>.5?d/(2-mx-mn):d/(mx+mn); h=mx===r?((g-b)/d+(g<b?6:0)):mx===g?((b-r)/d+2):((r-g)/d+4); h/=6; } return [Math.round(h*360),Math.round(s*100),Math.round(l*100)]; }

export default function ColorConvert() {
  const [h, setH] = useState("#2563eb");
  const [r, setR] = useState("37");
  const [g, setG] = useState("99");
  const [b, setB] = useState("235");
  const [mode, setMode] = useState<"hex"|"rgb">("hex");
  const hexUpdate = () => {
    const rgb = hexToRgb(h);
    if (rgb) { setR(String(rgb[0])); setG(String(rgb[1])); setB(String(rgb[2])); }
  };
  const rgbUpdate = () => {
    const ri = parseInt(r)||0, gi = parseInt(g)||0, bi = parseInt(b)||0;
    setH(rgbToHex(ri, gi, bi));
  };
  const ri = parseInt(r)||0, gi = parseInt(g)||0, bi = parseInt(b)||0;
  const hsl = rgbToHsl(ri, gi, bi);
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 16 }}>
        <div><label>HEX</label><input value={h} onChange={(e) => { setH(e.target.value); hexUpdate(); }} placeholder="#2563eb" /></div>
        <div style={{ width: 48, height: 38, borderRadius: 6, border: "1px solid #d1d5db", background: h, alignSelf: "flex-end" }} />
      </div>
      <div className="row">
        <div><label>R</label><input type="number" min={0} max={255} value={r} onChange={(e) => { setR(e.target.value); rgbUpdate(); }} /></div>
        <div><label>G</label><input type="number" min={0} max={255} value={g} onChange={(e) => { setG(e.target.value); rgbUpdate(); }} /></div>
        <div><label>B</label><input type="number" min={0} max={255} value={b} onChange={(e) => { setB(e.target.value); rgbUpdate(); }} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 16 }}>
        <div style={{ background: "#f9fafb", borderRadius: 6, padding: 10, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>RGB</div>
          <div style={{ fontFamily: "monospace", fontWeight: 600 }}>rgb({ri},{gi},{bi})</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 6, padding: 10, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>HSL</div>
          <div style={{ fontFamily: "monospace", fontWeight: 600 }}>hsl({hsl[0]},{hsl[1]}%,{hsl[2]}%)</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 6, padding: 10, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>HEX</div>
          <div style={{ fontFamily: "monospace", fontWeight: 600 }}>{h}</div>
        </div>
      </div>
    </div>
  );
}
