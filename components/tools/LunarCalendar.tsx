"use client";
import { useState } from "react";

const lunarMonths = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const lunarDays = ["", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
const animals = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];

export default function LunarCalendar() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const d = new Date(date);
  const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
  const zodiac = animals[(y - 4) % 12];
  const lunarM = ((m + 9) % 12) + 1;
  const lunarD = Math.min(day, 30);
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return (
    <div className="tool-workspace">
      <label>Select Date</label>
      <div className="row">
        <div><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 20, textAlign: "center" }}>
        <div style={{ background: "#f9fafb", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>Gregorian</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{y}-{m}-{day}</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{weekdays[d.getDay()]}</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>Lunar (approx)</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>M{lunarM} D{lunarD}</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{y}</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>Zodiac</div>
          <div style={{ fontSize: 32 }}>{zodiac}</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{zodiac}</div>
        </div>
      </div>
    </div>
  );
}
