// services/sites.service.ts
import sitesData from "@/data/sites.json";
import { Site } from "@/types/site";

export async function getSites(): Promise<Site[]> {
  return sitesData;
}
