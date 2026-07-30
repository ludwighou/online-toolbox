"use client";
import { useState, useRef } from "react";

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState<{ url: string; origSize: string; newSize: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null);
  const compress = () => {
    if (!file || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      c.width = img.width; c.height = img.height;
      c.getContext("2d")!.drawImage(img, 0, 0);
      c.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResult({ url, origSize: (file.size / 1024).toFixed(1) + " KB", newSize: (blob.size / 1024).toFixed(1) + " KB" });
      }, "image/jpeg", quality / 100);
    };
    img.src = URL.createObjectURL(file);
  };
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {file && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div><label>????: {quality}%</label><input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={compress} disabled={!file}>??</button></div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {result && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <img src={result.url} alt="" style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 8 }} />
          <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{result.origSize} ? <strong style={{ color: "#059669" }}>{result.newSize}</strong></div>
        </div>
      )}
    </div>
  );
}
