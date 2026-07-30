"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrcodeGenerate() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generate = async () => {
    if (!text || !canvasRef.current) return;
    await QRCode.toCanvas(canvasRef.current, text, { width: size, margin: 2 });
  };
  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  };
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <div style={{ flex: 2 }}><label>?? (??/??)</label><input value={text} onChange={(e) => setText(e.target.value)} placeholder="???????" /></div>
        <div><label>??</label><select value={size} onChange={(e) => setSize(Number(e.target.value))}><option value={128}>128</option><option value={256}>256</option><option value={512}>512</option></select></div>
      </div>
      <button className="btn btn-primary" onClick={generate}>?????</button>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <canvas ref={canvasRef} style={{ display: "inline-block" }} />
        {text && <div style={{ marginTop: 8 }}><button className="btn btn-secondary" onClick={download}>?? PNG</button></div>}
      </div>
    </div>
  );
}
