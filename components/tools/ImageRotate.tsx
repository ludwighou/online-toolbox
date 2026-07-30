"use client";
import { useState, useRef } from "react";

export default function ImageRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null);
  const rotate = () => {
    if (!file || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const rad = angle * Math.PI / 180;
      const c = canvasRef.current!;
      const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
      c.width = Math.ceil(img.width * cos + img.height * sin);
      c.height = Math.ceil(img.width * sin + img.height * cos);
      const ctx = c.getContext("2d")!;
      ctx.translate(c.width / 2, c.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setResult(c.toDataURL("image/png"));
    };
    img.src = URL.createObjectURL(file);
  };
  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "rotated.png"; a.click(); };
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {file && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{file.name}</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div><label>????</label><select value={angle} onChange={(e) => setAngle(Number(e.target.value))}><option value={90}>90?</option><option value={180}>180?</option><option value={270}>270?</option><option value={45}>45?</option><option value={-90}>-90?</option></select></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={rotate} disabled={!file}>??</button></div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {result && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <img src={result} alt="" style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 8 }} />
          <div style={{ marginTop: 8 }}><button className="btn btn-secondary" onClick={download}>??</button></div>
        </div>
      )}
    </div>
  );
}
