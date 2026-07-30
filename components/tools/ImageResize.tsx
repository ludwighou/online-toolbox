"use client";
import { useState, useRef } from "react";

export default function ImageResize() {
  const [file, setFile] = useState<File | null>(null);
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null);
  const resize = () => {
    if (!file || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      c.width = w; c.height = h;
      c.getContext("2d")!.drawImage(img, 0, 0, w, h);
      setResult(c.toDataURL("image/png"));
    };
    img.src = URL.createObjectURL(file);
  };
  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "resized.png"; a.click(); };
  const keepRatio = (newW: number) => {
    if (!file) return; setW(newW); const img = new Image();
    img.onload = () => setH(Math.round(newW * img.height / img.width));
    img.src = URL.createObjectURL(file);
  };
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {file && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{file.name}</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div><label>?? (px)</label><input type="number" value={w} onChange={(e) => keepRatio(Number(e.target.value))} /></div>
        <div><label>?? (px)</label><input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={resize} disabled={!file}>????</button></div>
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
