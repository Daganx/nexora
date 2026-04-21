import { Article } from "../../../types/article";
import { ArticleImage } from "./ArticleImage";
import { ArticleOverlay } from "./ArticleOverlay";
import { ArticleContent } from "./ArticleContent";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl min-h-[440px] relative overflow-hidden border border-neutral-200 group cursor-pointer">
        <ArticleImage article={article} />
        <ArticleOverlay />
        <ArticleContent article={article} />
      </div>
    </div>
  );
}
