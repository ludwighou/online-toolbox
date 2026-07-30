"use client";

export default function AsciiTable() {
  const chars = Array.from({ length: 95 }, (_, i) => i + 32);
  return (
    <div className="tool-workspace">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(80px,1fr))", gap: 4 }}>
        {chars.map(c => (
          <div key={c} style={{ background: "#f9fafb", borderRadius: 4, padding: "6px 8px", textAlign: "center", fontSize: 12 }}>
            <div style={{ fontWeight: 700, fontFamily: "monospace" }}>{c}</div>
            <div style={{ color: "#9ca3af", fontFamily: "monospace" }}>{String.fromCharCode(c)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
