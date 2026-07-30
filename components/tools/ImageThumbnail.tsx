"use client";
import { useState, useRef } from "react";

export default function ImageThumbnail() {
  const [files, setFiles] = useState<File[]>([]);
  const [size, setSize] = useState(150);
  const [results, setResults] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => setFiles(Array.from(e.target.files ?? []));
  const generate = () => {
    const urls: string[] = [];
    let loaded = 0;
    files.forEach((f) => {
      const img = new Image();
      img.onload = () => {
        const c = canvasRef.current!;
        const ratio = Math.min(size / img.width, size / img.height);
        c.width = img.width * ratio; c.height = img.height * ratio;
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        urls.push(c.toDataURL("image/jpeg", 80));
        loaded++;
        if (loaded === files.length) setResults(urls);
      };
      img.src = URL.createObjectURL(f);
    });
  };
  return (
    <div className="tool-workspace">
      <label>???? (???)</label>
      <input type="file" accept="image/*" multiple onChange={handleFiles} />
      {files.length > 0 && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>?? {files.length} ???</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div><label>??????? (px)</label><input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={generate}>?????</button></div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {results.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {results.map((url, i) => <img key={i} src={url} alt="" style={{ borderRadius: 4 }} />)}
        </div>
      )}
    </div>
  );
}
