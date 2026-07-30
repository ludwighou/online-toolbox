'use client';
import { useState } from 'react';

export default function WordCount() {
  const [text, setText] = useState('');
  const cn = text.match(/[\u4e00-\u9fa5]/g)?.length ?? 0;
  const en = text.match(/[a-zA-Z]+/g)?.length ?? 0;
  const chars = text.length;
  const lines = text ? text.split('\n').length : 0;
  return (
    <div className="tool-workspace">
      <label>输入文本</label>
      <textarea rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="在此粘贴或输入文本..." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 12, marginTop: 16 }}>
        {[{ label: '总字符数', v: chars }, { label: '中文字数', v: cn }, { label: '英文单词数', v: en }, { label: '行数', v: lines }].map((s) => (
          <div key={s.label} style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2563eb' }}>{s.v}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
