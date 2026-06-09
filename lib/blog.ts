import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  readTime: number;
  image?: string;
  imageAlt?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: number;
  image?: string;
}

const blogDir = path.join(process.cwd(), "content", "blog");

function ensureBlogDir(): boolean {
  try {
    return fs.existsSync(blogDir);
  } catch {
    return false;
  }
}

export function getAllPosts(): BlogPostMeta[] {
  if (!ensureBlogDir()) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
  const posts: BlogPostMeta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const data = JSON.parse(raw) as BlogPost;
    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      readTime: data.readTime,
      image: data.image,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!ensureBlogDir()) return null;

  const filePath = path.join(blogDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as BlogPost;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
