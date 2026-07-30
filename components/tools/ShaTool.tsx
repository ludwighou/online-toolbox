"use client";
import { useState } from "react";

async function sha(text: string, algo: "SHA-1" | "SHA-256" | "SHA-512"): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function ShaTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [algo, setAlgo] = useState<"SHA-1" | "SHA-256" | "SHA-512">("SHA-256");
  const hash = async () => setOutput(await sha(input, algo));
  return (
    <div className="tool-workspace">
      <div className="row" style={{ marginBottom: 12 }}>
        {(["SHA-1", "SHA-256", "SHA-512"] as const).map(a => (
          <button key={a} className={"btn " + (algo === a ? "btn-primary" : "btn-secondary")} onClick={() => setAlgo(a)}>{a}</button>
        ))}
      </div>
      <label>????</label>
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="????????" />
      <button className="btn btn-primary" onClick={hash} style={{ marginTop: 12 }}>????</button>
      {output && <textarea rows={4} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
