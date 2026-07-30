"use client";
import { useState, useRef, useEffect } from "react";

function ImgLoader({ src, canvasRef }: { src: string; canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    if (!canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      c.width = img.width; c.height = img.height;
      c.getContext("2d")!.drawImage(img, 0, 0);
    };
    img.src = src;
  }, [src, canvasRef]);
  return null;
}

export default function ColorPicker() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [color, setColor] = useState<{ r: number; g: number; b: number } | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return; setFile(f); setSrc(URL.createObjectURL(f));
  };
  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current; if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (c.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (c.height / rect.height));
    const pixel = c.getContext("2d")!.getImageData(x, y, 1, 1).data;
    setColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const hex = color ? "#" + [color.r, color.g, color.b].map(c => c.toString(16).padStart(2, "0")).join("") : "";
  return (
    <div className="tool-workspace">
      <label>????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {src && <div style={{ marginTop: 16, position: "relative", display: "inline-block" }}>
        <canvas ref={canvasRef} onClick={pick} style={{ maxWidth: "100%", cursor: "crosshair", borderRadius: 8 }} />
        <ImgLoader src={src} canvasRef={canvasRef} />
        {color && <div style={{ position: "absolute", left: pos.x - 12, top: pos.y - 12, width: 24, height: 24, borderRadius: "50%", border: "3px solid white", boxShadow: "0 0 0 2px black", background: hex }} />}
      </div>}
      {color && (
        <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 8, background: hex, border: "1px solid #d1d5db" }} />
          <div>
            <div style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 16 }}>{hex.toUpperCase()}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>rgb({color.r}, {color.g}, {color.b})</div>
          </div>
        </div>
      )}
    </div>
  );
}
