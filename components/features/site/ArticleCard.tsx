import Image from "next/image";
import { Article } from "@/types/article";

type Props = {
  article: Article;
};

export function ArticleCard({ article }: Props) {
  return (
    <div className="border p-4">
      <div className="relative w-full h-48">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold text-orange-500">{article.title}</h3>

        <p className="mt-2 text-sm text-gray-700">{article.content}</p>
      </div>
    </div>
  );
}
