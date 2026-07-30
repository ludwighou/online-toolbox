"use client";
import { useState } from "react";

const holidays = [
  { name: "New Year", date: (y: number) => y + "-01-01" },
  { name: "Spring Festival", date: (y: number) => y + "-01-29" },
  { name: "Lantern Festival", date: (y: number) => y + "-02-12" },
  { name: "Valentine's Day", date: (y: number) => y + "-02-14" },
  { name: "Women's Day", date: (y: number) => y + "-03-08" },
  { name: "Labor Day", date: (y: number) => y + "-05-01" },
  { name: "Dragon Boat", date: (y: number) => y + "-05-31" },
  { name: "Children's Day", date: (y: number) => y + "-06-01" },
  { name: "Party Day", date: (y: number) => y + "-07-01" },
  { name: "Army Day", date: (y: number) => y + "-08-01" },
  { name: "Qixi", date: (y: number) => y + "-08-29" },
  { name: "Teacher's Day", date: (y: number) => y + "-09-10" },
  { name: "Mid-Autumn", date: (y: number) => y + "-10-06" },
  { name: "National Day", date: (y: number) => y + "-10-01" },
  { name: "Double Ninth", date: (y: number) => y + "-10-29" },
  { name: "Christmas", date: (y: number) => y + "-12-25" },
  { name: "New Year's Eve", date: (y: number) => y + "-01-28" },
];

export default function HolidayCalc() {
  const now = new Date();
  const y = now.getFullYear();
  const today = now.toISOString().split("T")[0];
  const upcoming = holidays
    .map(h => ({ ...h, dateStr: h.date(y) }))
    .filter(h => h.dateStr >= today)
    .sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  return (
    <div className="tool-workspace">
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{y} Holidays</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8 }}>
        {holidays.map(h => {
          const d = h.date(y);
          const left = Math.ceil((new Date(d).getTime() - new Date(today).getTime()) / 86400000);
          return (
            <div key={h.name} style={{ background: "#f9fafb", borderRadius: 6, padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{h.name}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{d}</div>
              </div>
              {left >= 0 && <span style={{ fontSize: 12, color: left <= 7 ? "#dc2626" : "#9ca3af" }}>{left === 0 ? "Today" : left + "d"}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
