// SEO URL variant generator + sitemap + robots.txt
const fs = require('fs');
const path = require('path');
const tools = require('./tools-data.json');

const domain = 'https://online-toolbox.vercel.app';

const variantPatterns = [
  (tool) => `/${tool.id}`,
  (tool) => `/${tool.id}-online`,
  (tool) => `/${tool.nameEn.toLowerCase().replace(/\s+/g, '-')}`,
  (tool) => `/free-${tool.id}`,
  (tool) => `/online-${tool.nameEn.toLowerCase().replace(/\s+/g, '-')}`,
];

// Generate sitemap
const sitemapEntries = tools.map((tool) =>
`  <url>
    <loc>${domain}/${tool.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${sitemapEntries}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);

// Generate robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml`;
fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robots);

// Generate redirects
const redirects = [];
tools.forEach((tool) => {
  variantPatterns.slice(1).forEach((fn) => {
    const variantUrl = fn(tool);
    if (variantUrl !== `/${tool.id}`) {
      redirects.push({ source: variantUrl, destination: `/${tool.id}`, permanent: true });
    }
  });
});

const vercelPath = path.join(__dirname, 'vercel.json');
let vercelConfig = { cleanUrls: true, redirects: [] };
if (fs.existsSync(vercelPath)) {
  vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
}
vercelConfig.redirects = redirects;
fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2));

console.log(`Generated sitemap with ${tools.length} URLs`);
console.log(`Generated ${redirects.length} redirect rules`);
console.log('Created: public/sitemap.xml, public/robots.txt, vercel.json');
