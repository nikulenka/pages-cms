import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

export type House = {
  title: string;
  type?: string;
  description: string;
  fullDescription?: string;
  capacity: string;
  area?: string;
  bedrooms?: number;
  price: string;
  image: string;
  gallery?: string[];
  features?: string[];
  order: number;
  published: boolean;
};

export type Activity = {
  title: string;
  description: string;
  image: string;
  order: number;
  published: boolean;
};

export type Review = {
  name: string;
  location?: string;
  text: string;
  rating?: number;
  date?: string;
  published: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type GalleryImage = {
  src: string;
  alt?: string;
};

export type GeneralSettings = {
  siteTitle?: string;
  slogan?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroImages?: string[];
  welcomeText?: string;
  weddingTitle?: string;
  weddingText?: string;
  weddingImage?: string;
  phone1?: string;
  phone2?: string;
  address?: string;
  distanceMinsk?: string;
  distanceVolozhyn?: string;
  instagram?: string;
  responseTime?: string;
  pricePerNight?: string;
  priceNewYear?: string;
  priceBanya?: string;
  checkIn?: string;
  checkOut?: string;
  prepayment?: string;
  cancellation?: string;
};

function readMarkdownDir(dir: string): any[] {
  const full = path.join(process.cwd(), dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => matter(fs.readFileSync(path.join(full, f), "utf-8")).data);
}

function readYamlFile(filePath: string): any {
  const full = path.join(process.cwd(), filePath);
  if (!fs.existsSync(full)) return {};
  return yaml.load(fs.readFileSync(full, "utf-8")) ?? {};
}

export function getHouses(): House[] {
  return readMarkdownDir("content/houses")
    .filter((h) => h.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) as House[];
}

export function getActivities(): Activity[] {
  return readMarkdownDir("content/activities")
    .filter((a) => a.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) as Activity[];
}

export function getReviews(): Review[] {
  return readMarkdownDir("content/reviews")
    .filter((r) => r.published !== false) as Review[];
}

export function getGeneralSettings(): GeneralSettings {
  return readYamlFile("content/general.yml") as GeneralSettings;
}

export function getFaq(): FaqItem[] {
  const data = readYamlFile("content/faq.yml");
  return (data.items ?? []) as FaqItem[];
}

export function getGallery(): GalleryImage[] {
  const data = readYamlFile("content/gallery.yml");
  return (data.images ?? []) as GalleryImage[];
}
