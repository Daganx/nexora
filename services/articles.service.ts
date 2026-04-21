import articlesData from "@/data/articles.json";
import { Article } from "@/types/article";

// Function to get all Articles
export async function getSites(): Promise<Article[]> {
  return articlesData;
}

// Function to get the LastArticle
export async function getLatestArticle(): Promise<Article | null> {
  const sorted = articlesData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sorted[0] || null;
}

// Function to get the two LatestArticles
export async function getLatestArticles(): Promise<Article[]> {
  return articlesData
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 2);
}
