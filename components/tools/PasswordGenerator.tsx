"use client";
import { useState } from "react";

const charsets: Record<string, string> = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ lowercase: true, uppercase: true, numbers: true, symbols: true });
  const [passwords, setPasswords] = useState<string[]>([]);
  const generate = () => {
    let chars = "";
    Object.entries(opts).forEach(([k, v]) => { if (v) chars += charsets[k]; });
    if (!chars) { setPasswords(["?????????"]); return; }
    const results: string[] = [];
    for (let j = 0; j < 5; j++) {
      const arr = new Uint32Array(len);
      crypto.getRandomValues(arr);
      let p = "";
      for (let i = 0; i < len; i++) p += chars[arr[i] % chars.length];
      results.push(p);
    }
    setPasswords(results);
  };
  const toggle = (k: string) => setOpts({ ...opts, [k]: !(opts as any)[k] });
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        <div><label>??</label><input type="number" min={4} max={128} value={len} onChange={(e) => setLen(Number(e.target.value))} /></div>
        <div style={{ display: "flex", alignItems: "flex-end" }}><button className="btn btn-primary" onClick={generate}>????</button></div>
      </div>
      <div className="row" style={{ marginBottom: 16 }}>
        {Object.keys(charsets).map(k => (
          <label key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 400 }}>
            <input type="checkbox" checked={(opts as any)[k]} onChange={() => toggle(k)} /> {k === "lowercase" ? "??" : k === "uppercase" ? "??" : k === "numbers" ? "??" : "??"}
          </label>
        ))}
      </div>
      {passwords.map((p, i) => (
        <div key={i} className="result-box" style={{ marginTop: 6, fontFamily: "monospace", fontSize: 14, letterSpacing: 1 }}>{p}</div>
      ))}
    </div>
  );
}
