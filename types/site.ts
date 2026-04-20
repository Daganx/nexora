// types/site.ts -> Type de mes données JSON data/sites.json
export type Site = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  createdAt: string;
};
