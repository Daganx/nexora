import Image from "next/image";
import { Article } from "../../../types/article";

interface ArticleImageProps {
  article: Article;
}

export function ArticleImage({ article }: ArticleImageProps) {
  return (
    <Image
      src={article.image}
      alt={article.title}
      fill
      className="object-contain object-center"
      unoptimized
    />
  );
}
