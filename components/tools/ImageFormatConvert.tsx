"use client";
import { useState, useRef } from "react";

const formats = ["image/jpeg", "image/png", "image/webp", "image/bmp"] as const;
const formatLabels: Record<string, string> = { "image/jpeg": "JPG", "image/png": "PNG", "image/webp": "WebP", "image/bmp": "BMP" };

export default function ImageFormatConvert() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("image/png");
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null);
  const convert = () => {
    if (!file || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      c.width = img.width; c.height = img.height;
      c.getContext("2d")!.drawImage(img, 0, 0);
      setResult(c.toDataURL(format));
    };
    img.src = URL.createObjectURL(file);
  };
  const download = () => {
    const a = document.createElement("a"); a.href = result; a.download = "converted." + formatLabels[format].toLowerCase(); a.click();
  };
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {file && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>{file.name}</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div><label>????</label><select value={format} onChange={(e) => setFormat(e.target.value)}>{formats.map(f => <option key={f} value={f}>{formatLabels[f]}</option>)}</select></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={convert} disabled={!file}>??</button></div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {result && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <img src={result} alt="" style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 8 }} />
          <div style={{ marginTop: 8 }}><button className="btn btn-secondary" onClick={download}>?? {formatLabels[format]}</button></div>
        </div>
      )}
    </div>
  );
}
