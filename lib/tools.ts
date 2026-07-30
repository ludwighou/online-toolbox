import toolsData from '../tools-data.json';

export interface Tool {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  keywords: string;
  icon: string;
  category: string;
  component: string;
}

export interface CategoryInfo {
  key: string;
  name: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  { key: 'image', name: '图片工具', icon: 'image' },
  { key: 'text', name: '文本工具', icon: 'file-text' },
  { key: 'convert', name: '计算转换', icon: 'repeat' },
  { key: 'dev', name: '开发工具', icon: 'terminal' },
  { key: 'life', name: '生活工具', icon: 'heart' },
];

const tools: Tool[] = toolsData as Tool[];

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.id === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(slug: string, count: number = 6): Tool[] {
  const current = getToolBySlug(slug);
  if (!current) return tools.slice(0, count);
  return tools
    .filter((t) => t.category === current.category && t.id !== slug)
    .slice(0, count);
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.id);
}

export function getCategoryName(categoryKey: string): string {
  return categories.find((c) => c.key === categoryKey)?.name ?? categoryKey;
}
