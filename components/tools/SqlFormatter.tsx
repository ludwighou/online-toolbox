"use client";
import { useState } from "react";

function formatSQL(sql: string) {
  return sql.replace(/\s+/g, " ").replace(/\b(SELECT|FROM|WHERE|AND|OR|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|ORDER BY|GROUP BY|HAVING|LIMIT|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE|UNION|AS|IN|NOT IN|BETWEEN|LIKE|IS NULL|IS NOT NULL|EXISTS)\b/gi, "\n").replace(/,/g, ",\n  ").trim();
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="tool-workspace">
      <label>?? SQL</label>
      <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1" style={{ fontFamily: "monospace", fontSize: 13 }} />
      <button className="btn btn-primary" onClick={() => setOutput(formatSQL(input))} style={{ marginTop: 12 }}>???</button>
      {output && <textarea rows={10} readOnly value={output} style={{ marginTop: 12, fontFamily: "monospace", fontSize: 13, background: "#f9fafb" }} />}
    </div>
  );
}
