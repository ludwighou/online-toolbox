"use client";
import { useState, useRef } from "react";

export default function ImageWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null);
  const watermark = () => {
    if (!file || !text || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.font = Math.max(20, img.width / 20) + "px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(text, img.width - ctx.measureText(text).width - 40, img.height - 30);
      setResult(c.toDataURL("image/png"));
    };
    img.src = URL.createObjectURL(file);
  };
  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "watermarked.png"; a.click(); };
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {file && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{file.name}</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div style={{ flex: 2 }}><label>????</label><input value={text} onChange={(e) => setText(e.target.value)} placeholder="??????" /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={watermark} disabled={!file || !text}>????</button></div>
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
