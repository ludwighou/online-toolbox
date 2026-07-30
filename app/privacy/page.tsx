import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 - 在线工具箱',
  description: '在线工具箱隐私政策，了解我们如何收集、使用和保护您的个人信息。',
  robots: 'noindex, follow',
};

export default function PrivacyPage() {
  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            在线工具箱
          </a>
        </div>
      </header>
      <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px', lineHeight: 2 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>隐私政策</h1>
        <p style={{ color: '#6b7280', marginBottom: 32 }}>最后更新日期：2026年7月30日</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>一、信息收集</h2>
          <p>本网站为纯前端工具站点，所有工具均在您的浏览器本地运行。<strong>我们不收集、不存储、不上传任何您输入的内容。</strong></p>
          <p style={{ marginTop: 8 }}>我们可能通过第三方服务自动收集以下非个人身份信息：</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>浏览器类型和版本</li>
            <li>访问页面和停留时间（通过 Vercel Analytics）</li>
            <li>IP 地址（用于地理位置统计，不关联个人身份）</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>二、Cookie 使用</h2>
          <p>本网站本身不使用 Cookie。第三方广告服务商（如 Google AdSense、百度联盟）可能在您的浏览器中设置 Cookie 以提供个性化广告。您可以通过浏览器设置管理或禁用 Cookie。</p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>三、第三方服务</h2>
          <p>本网站使用以下第三方服务，它们有各自的隐私政策：</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Vercel — 网站托管和 Analytics（<a href="https://vercel.com/legal/privacy-policy" style={{ color: '#2563eb' }}>隐私政策</a>）</li>
            <li>Google AdSense — 广告投放（<a href="https://policies.google.com/privacy" style={{ color: '#2563eb' }}>隐私政策</a>）</li>
            <li>百度联盟 — 广告投放（<a href="https://union.baidu.com/" style={{ color: '#2563eb' }}>隐私政策</a>）</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>四、数据安全</h2>
          <p>由于本网站不收集用户数据，不存在数据泄露风险。所有工具计算均在浏览器本地内存中完成，关闭页面后数据即被清除。</p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>五、儿童隐私</h2>
          <p>本网站不面向13岁以下儿童，不会有意收集儿童的个人信息。</p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>六、政策更新</h2>
          <p>我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，重大变更会通过网站公告通知。</p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>七、联系方式</h2>
          <p>如对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
          <p style={{ marginTop: 8 }}>邮箱：admin@你的域名.com（部署后替换为实际邮箱）</p>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 在线工具箱 | <a href="/privacy">隐私政策</a></p>
        </div>
      </footer>
    </>
  );
}
