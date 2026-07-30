import type { Metadata } from 'next';
import { getAllSlugs, getToolBySlug, getRelatedTools, getCategoryName } from '../../lib/tools';
import ToolComponent from '../../components/ToolComponent';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: '工具未找到' };
  return {
    title: `${tool.name} - 在线${tool.name}工具`,
    description: tool.description,
    keywords: tool.keywords,
    robots: 'index, follow',
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return (
      <div className="tool-page">
        <div className="empty-state">
          <h2>工具未找到</h2>
          <p style={{ marginTop: 8 }}><a href="/" style={{ color: '#2563eb' }}>返回首页</a></p>
        </div>
      </div>
    );
  }

  const related = getRelatedTools(tool.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://online-toolbox.vercel.app/${tool.id}`,
    applicationCategory: 'UtilityApplication',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="header">
        <div className="container">
          <a href="/" className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            在线工具箱
          </a>
        </div>
      </header>
      <main className="tool-page">
        <nav className="breadcrumb" aria-label="面包屑导航">
          <a href="/">首页</a>
          <span>/</span>
          <span>{getCategoryName(tool.category)}</span>
          <span>/</span>
          <span>{tool.name}</span>
        </nav>
        <div className="tool-header">
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
        </div>
        <ToolComponent componentName={tool.component} />
        <div className="ad-placeholder">广告位 — 接入百度联盟/AdSense后此处展示广告</div>
        {related.length > 0 && (
          <section className="related-tools">
            <h3>相关工具</h3>
            <div className="related-grid">
              {related.map((r) => (
                <a key={r.id} href={`/${r.id}`} className="related-card">
                  <div className="name">{r.name}</div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
