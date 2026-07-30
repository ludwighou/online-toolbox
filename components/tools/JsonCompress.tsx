"use client";
import { useState } from "react";

export default function JsonCompress() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");
  const compress = () => { try { const o = JSON.parse(input); setOutput(JSON.stringify(o)); setErr(""); } catch (e: any) { setErr(e.message); } };
  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setErr(""); } catch (e: any) { setErr(e.message); } };
  return (
    <div className="tool-workspace">
      <label>?? JSON</label>
      <textarea rows={10} value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key":"value"}' />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={compress}>??</button>
        <button className="btn btn-secondary" onClick={format}>???</button>
      </div>
      {err && <div className="result-box" style={{ color: "#dc2626", marginTop: 12 }}>{err}</div>}
      {output && <textarea rows={10} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
