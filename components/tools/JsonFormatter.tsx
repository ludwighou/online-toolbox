"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");
  const format = () => { try { const o = JSON.parse(input); setOutput(JSON.stringify(o, null, 2)); setErr(""); } catch (e: any) { setErr(e.message); setOutput(""); } };
  const validate = () => { try { JSON.parse(input); setErr("JSON 格式正确"); setOutput(input); } catch (e: any) { setErr("无效JSON: " + e.message); setOutput(""); } };
  const compress = () => { try { setOutput(JSON.stringify(JSON.parse(input))); setErr(""); } catch (e: any) { setErr(e.message); } };
  return (
    <div className="tool-workspace">
      <label>输入 JSON</label>
      <textarea rows={10} value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value"}' />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={format}>格式化</button>
        <button className="btn btn-secondary" onClick={compress}>压缩</button>
        <button className="btn btn-secondary" onClick={validate}>校验</button>
      </div>
      {err && <div className="result-box" style={{ color: err.includes("正确") ? "#059669" : "#dc2626", marginTop: 12 }}>{err}</div>}
      {output && <textarea rows={10} readOnly value={output} style={{ marginTop: 12, background: "#f9fafb" }} />}
    </div>
  );
}
