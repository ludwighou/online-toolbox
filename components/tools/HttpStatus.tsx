"use client";

const statusCodes = [
  { code: 100, desc: "Continue ??" },
  { code: 200, desc: "OK ??" },
  { code: 201, desc: "Created ???" },
  { code: 204, desc: "No Content ???" },
  { code: 301, desc: "Moved Permanently ?????" },
  { code: 302, desc: "Found ?????" },
  { code: 304, desc: "Not Modified ???" },
  { code: 400, desc: "Bad Request ????" },
  { code: 401, desc: "Unauthorized ???" },
  { code: 403, desc: "Forbidden ????" },
  { code: 404, desc: "Not Found ???" },
  { code: 405, desc: "Method Not Allowed ?????" },
  { code: 408, desc: "Request Timeout ????" },
  { code: 429, desc: "Too Many Requests ????" },
  { code: 500, desc: "Internal Server Error ???????" },
  { code: 502, desc: "Bad Gateway ????" },
  { code: 503, desc: "Service Unavailable ?????" },
  { code: 504, desc: "Gateway Timeout ????" },
];

export default function HttpStatus() {
  const cat = (c: number) => c < 200 ? "??" : c < 300 ? "??" : c < 400 ? "???" : c < 500 ? "?????" : "?????";
  const color = (c: number) => c < 200 ? "#0ea5e9" : c < 300 ? "#059669" : c < 400 ? "#d97706" : c < 500 ? "#dc2626" : "#7c3aed";
  return (
    <div className="tool-workspace">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 8 }}>
        {statusCodes.map(s => (
          <div key={s.code} style={{ background: "#f9fafb", borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: color(s.code), width: 48 }}>{s.code}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.desc}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{cat(s.code)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
