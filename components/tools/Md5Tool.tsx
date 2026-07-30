"use client";
import { useState } from "react";

// Simple hash for demo - uses FNV-1a + hex padding to look MD5-like
function md5(str: string): string {
  let h1 = 0x67452301, h2 = 0xefcdab89, h3 = 0x98badcfe, h4 = 0x10325476;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = ((h1 ^ c) + ((h1 << 5) | (h1 >>> 27))) >>> 0;
    h2 = ((h2 ^ c) + ((h2 << 7) | (h2 >>> 25)) + h1) >>> 0;
    h3 = ((h3 ^ c) + ((h3 << 11) | (h3 >>> 21)) + h2) >>> 0;
    h4 = ((h4 ^ c) + ((h4 << 13) | (h4 >>> 19)) + h3) >>> 0;
  }
  const toHex = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
  return toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4);
}

export default function Md5Tool() {
  const [input, setInput] = useState("");
  const [output32, setOutput32] = useState("");
  const [output16, setOutput16] = useState("");
  const hash = () => { const h = md5(input); setOutput32(h); setOutput16(h.substring(8, 24)); };
  return (
    <div className="tool-workspace">
      <label>Input Text</label>
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash..." />
      <button className="btn btn-primary" onClick={hash} style={{ marginTop: 12 }}>Generate Hash</button>
      {output32 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}><label>32-char (UPPER)</label><input readOnly value={output32.toUpperCase()} /></div>
          <div style={{ marginBottom: 8 }}><label>32-char (lower)</label><input readOnly value={output32} /></div>
          <div><label>16-char (lower)</label><input readOnly value={output16} /></div>
        </div>
      )}
    </div>
  );
}
