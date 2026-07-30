"use client";
import { useState } from "react";

export default function CaseConvert() {
  const [input, setInput] = useState("");
  const toCamel = (s: string) => s.replace(/[_-]([a-z])/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, c => c.toLowerCase());
  const toPascal = (s: string) => s.replace(/[_-]([a-z])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, c => c.toUpperCase());
  const toSnake = (s: string) => s.replace(/[A-Z]/g, c => "_" + c.toLowerCase()).replace(/^_/, "").replace(/-/g, "_");
  const toKebab = (s: string) => s.replace(/[A-Z]/g, c => "-" + c.toLowerCase()).replace(/^-/, "").replace(/_/g, "-");
  return (
    <div className="tool-workspace">
      <label>????</label>
      <textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} placeholder="??????..." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, marginTop: 16 }}>
        {[
          { label: "?? UPPERCASE", v: input.toUpperCase() },
          { label: "?? lowercase", v: input.toLowerCase() },
          { label: "????? Title Case", v: input.replace(/\b\w/g, c => c.toUpperCase()) },
          { label: "?? camelCase", v: toCamel(input) },
          { label: "??? PascalCase", v: toPascal(input) },
          { label: "?? snake_case", v: toSnake(input) },
          { label: "?? kebab-case", v: toKebab(input) },
          { label: "????? tOGGLE", v: input.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("") },
        ].map(item => (
          input ? <div key={item.label} style={{ background: "#f9fafb", borderRadius: 6, padding: 10 }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 13, fontFamily: "monospace", wordBreak: "break-all" }}>{item.v}</div>
          </div> : null
        ))}
      </div>
    </div>
  );
}
