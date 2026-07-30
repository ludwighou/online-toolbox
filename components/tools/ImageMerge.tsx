"use client";
import { useState, useRef } from "react";

export default function ImageMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [dir, setDir] = useState<"horizontal" | "vertical">("horizontal");
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => setFiles(Array.from(e.target.files ?? []));
  const merge = () => {
    if (files.length < 2 || !canvasRef.current) return;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    files.forEach((f) => {
      const img = new Image();
      img.onload = () => {
        imgs.push(img);
        loaded++;
        if (loaded === files.length) {
          const c = canvasRef.current!;
          if (dir === "horizontal") {
            c.width = imgs.reduce((s, i) => s + i.width, 0);
            c.height = Math.max(...imgs.map(i => i.height));
            let x = 0;
            imgs.forEach(i => { c.getContext("2d")!.drawImage(i, x, 0); x += i.width; });
          } else {
            c.width = Math.max(...imgs.map(i => i.width));
            c.height = imgs.reduce((s, i) => s + i.height, 0);
            let y = 0;
            imgs.forEach(i => { c.getContext("2d")!.drawImage(i, 0, y); y += i.height; });
          }
          setResult(c.toDataURL("image/png"));
        }
      };
      img.src = URL.createObjectURL(f);
    });
  };
  const download = () => { const a = document.createElement("a"); a.href = result; a.download = "merged.png"; a.click(); };
  return (
    <div className="tool-workspace">
      <label>???? (??2?)</label>
      <input type="file" accept="image/*" multiple onChange={handleFiles} />
      {files.length > 0 && <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>?? {files.length} ?</div>}
      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label>????</label>
          <div className="row" style={{ gap: 8 }}>
            <button className={"btn " + (dir === "horizontal" ? "btn-primary" : "btn-secondary")} onClick={() => setDir("horizontal")}>??</button>
            <button className={"btn " + (dir === "vertical" ? "btn-primary" : "btn-secondary")} onClick={() => setDir("vertical")}>??</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={merge} disabled={files.length < 2}>??</button></div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {result && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <img src={result} alt="" style={{ maxWidth: "100%", maxHeight: 500, borderRadius: 8 }} />
          <div style={{ marginTop: 8 }}><button className="btn btn-secondary" onClick={download}>??</button></div>
        </div>
      )}
    </div>
  );
}
