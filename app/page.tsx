import { categories, getToolsByCategory } from '../lib/tools';

const categoryIcons: Record<string, string> = {
  image: '🖼️',
  text: '📝',
  convert: '🔄',
  dev: '💻',
  life: '❤️',
};

export default function HomePage() {
  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            在线工具箱
          </a>
          <nav>
            {categories.map((cat) => (
              <a key={cat.key} href={`#${cat.key}`}>{cat.name}</a>
            ))}
          </nav>
        </div>
      </header>
      <section className="hero">
        <h1>免费在线工具箱</h1>
        <p>50+实用在线工具，无需下载安装，即开即用。全部免费，持续更新。</p>
      </section>
      <main className="container">
        {categories.map((cat) => {
          const tools = getToolsByCategory(cat.key);
          return (
            <section key={cat.key} id={cat.key} className="section">
              <h2 className="section-title">
                <span>{categoryIcons[cat.key] || '🔧'}</span> {cat.name}
              </h2>
              <div className="tool-grid">
                {tools.map((tool) => (
                  <a key={tool.id} href={`/${tool.id}`} className="tool-card">
                    <div className="tool-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    </div>
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-desc">{tool.description}</div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 在线工具箱 | <a href="/privacy">隐私政策</a></p>
        </div>
      </footer>
    </>
  );
}
