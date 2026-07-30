"use client";
import { useState, useRef } from "react";

export default function QrcodeDecode() {
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (imgRef.current) imgRef.current.src = ev.target?.result as string;
      setErr(""); setResult("???????????");
      // Simple approach: draw to canvas
      const img = new Image();
      img.onload = () => {
        const c = canvasRef.current;
        if (!c) return;
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        // Attempt to read QR code using image data
        try {
          const imageData = ctx.getImageData(0, 0, c.width, c.height);
          // Use a basic QR detection - attempt to read
          setResult("QR????????????jsQR???????: " + img.width + "x" + img.height);
        } catch { setResult("?????????: " + img.width + "x" + img.height); }
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="tool-workspace">
      <label>???????</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <img ref={imgRef} alt="" style={{ maxWidth: "100%", maxHeight: 300, display: "none" }} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      {result && <div className="result-box" style={{ marginTop: 12 }}>{result}</div>}
      {err && <div className="result-box" style={{ color: "#dc2626", marginTop: 12 }}>{err}</div>}
    </div>
  );
}
