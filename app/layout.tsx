import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '在线工具箱 - 免费在线工具集合',
  description: '免费在线工具箱，提供JSON格式化、图片压缩、Base64编码、二维码生成、单位换算等50+实用工具，无需下载安装即开即用。',
  keywords: '在线工具,免费工具,JSON格式化,图片压缩,二维码生成,Base64编码,单位换算,在线工具箱',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
