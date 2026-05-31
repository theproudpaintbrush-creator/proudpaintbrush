import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { CITIES } from "@/lib/cities";
import { getServiceSlugs } from "@/lib/services";
import { getAllPageKeys } from "@/lib/pages";

const BASE_URL = "https://www.theproudpaintbrush.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/exterior-painting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/interior-painting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cabinet-painting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/our-story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/our-vision`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/core-values`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const exteriorCityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${BASE_URL}/exterior-painting/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  const interiorCityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${BASE_URL}/interior-painting/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  const interiorServicePages: MetadataRoute.Sitemap = getServiceSlugs("interior").map((slug) => ({
    url: `${BASE_URL}/interior-painting/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const exteriorServicePages: MetadataRoute.Sitemap = getServiceSlugs("exterior").map((slug) => ({
    url: `${BASE_URL}/exterior-painting/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const contentPages: MetadataRoute.Sitemap = getAllPageKeys().map((key) => ({
    url: `${BASE_URL}/${key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: key.includes("/") ? 0.7 : 0.75,
  }));

  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...exteriorCityPages,
    ...interiorCityPages,
    ...interiorServicePages,
    ...exteriorServicePages,
    ...contentPages,
    ...blogPages,
  ];
}
