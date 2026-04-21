import articlesData from "@/data/articles.json";
import { ArticleCard } from "./articles/ArticleCard";

// File for the 2 latest articles on HomePage
export function LatestArticles() {
  const latestArticles = articlesData.slice(0, 4);

  return (
    <section>
      <div className="relative flex flex-col items-center justify-center gap-7">
        <h3 className="text-base">Latest</h3>
        <h2 className="text-[7vw] leading-none font-bold">ARTICLES</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-10">
        {latestArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </section>
  );
}
