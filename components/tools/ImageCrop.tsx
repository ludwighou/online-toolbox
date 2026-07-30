"use client";
import { useState, useRef } from "react";

export default function ImageCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
  const [result, setResult] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return; setFile(f); setSrc(URL.createObjectURL(f));
  };
  const doCrop = () => {
    const c = canvasRef.current, img = imgRef.current;
    if (!c || !img) return;
    c.width = crop.w; c.height = crop.h;
    c.getContext("2d")!.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
    setResult(c.toDataURL("image/png"));
  };
  const download = () => {
    const a = document.createElement("a"); a.href = result; a.download = "cropped.png"; a.click();
  };
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {src && (
        <>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <img ref={imgRef} src={src} alt="" style={{ maxWidth: "100%", maxHeight: 300 }} />
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <div><label>X</label><input type="number" value={crop.x} onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) })} /></div>
            <div><label>Y</label><input type="number" value={crop.y} onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) })} /></div>
            <div><label>?</label><input type="number" value={crop.w} onChange={(e) => setCrop({ ...crop, w: Number(e.target.value) })} /></div>
            <div><label>?</label><input type="number" value={crop.h} onChange={(e) => setCrop({ ...crop, h: Number(e.target.value) })} /></div>
            <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={doCrop}>??</button></div>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {result && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <img src={result} alt="" style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 8 }} />
          <div style={{ marginTop: 8 }}><button className="btn btn-secondary" onClick={download}>?? PNG</button></div>
        </div>
      )}
    </div>
  );
}
