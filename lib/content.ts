import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type House = {
  title: string;
  type: string;
  description: string;
  fullDescription?: string;
  capacity: string;
  price: string;
  image: string;
  order: number;
  published: boolean;
};

export function getHouses(): House[] {
  const dir = path.join(process.cwd(), 'content/houses');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      return matter(raw).data as House;
    })
    .filter((h) => h.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
