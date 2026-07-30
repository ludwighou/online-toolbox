"use client";
import { useState, useRef } from "react";

export default function ImageBgRemove() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return; setFile(f); setSrc(URL.createObjectURL(f));
  };
  // Simple background removal using color threshold
  const remove = () => {
    if (!src || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const d = imageData.data;
      // Sample top-left corner as background
      const bgR = d[0], bgG = d[1], bgB = d[2];
      const threshold = 80;
      for (let i = 0; i < d.length; i += 4) {
        const dr = Math.abs(d[i] - bgR), dg = Math.abs(d[i + 1] - bgG), db = Math.abs(d[i + 2] - bgB);
        if (dr < threshold && dg < threshold && db < threshold) d[i + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      setResult(c.toDataURL("image/png"));
    };
    img.src = src;
  };
  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "no-bg.png"; a.click(); };
  return (
    <div className="tool-workspace">
      <label>???? (????????)</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {src && <div style={{ marginTop: 16, textAlign: "center" }}><img src={src} alt="" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} /></div>}
      <button className="btn btn-primary" onClick={remove} disabled={!src} style={{ marginTop: 12 }}>????</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {result && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50% / 20px 20px", display: "inline-block", borderRadius: 8 }}>
            <img src={result} alt="" style={{ maxWidth: "100%", maxHeight: 400, display: "block" }} />
          </div>
          <div style={{ marginTop: 8 }}><button className="btn btn-secondary" onClick={download}>?? PNG</button></div>
        </div>
      )}
    </div>
  );
}
