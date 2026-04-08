import jobsTree from "@/public/14.09.2024.json";
import { polishToEnglish } from "@/utils/polishToEnglish";

export type GrudziadzServiceLeaf = {
  /** Segment URL pod /grudziadz/[publicSlug] */
  publicSlug: string;
  /** Klucz do getContent / offers / users (jak dotychczas: polishToEnglish(title)) */
  contentSlug: string;
  title: string;
  serviceTitle: string;
  categoryTitle: string;
};

type JobsJson = typeof jobsTree;

/**
 * Spłaszcza drzewo z public/14.09.2024.json i buduje krótkie URL-e:
 * `/grudziadz/{publicSlug}` zamiast `/oferta/dla-firm/{a}/{b}/{c}`.
 *
 * Domyślnie `publicSlug === contentSlug` (polishToEnglish(title)).
 * Przy kolizji tytułów: `publicSlug = polishToEnglish(\`\${categoryTitle}-\${title}\`)`.
 */
function buildLeaves(): GrudziadzServiceLeaf[] {
  const leaves: GrudziadzServiceLeaf[] = [];
  const usedPublicSlugs = new Set<string>();

  const tree = jobsTree as JobsJson;
  for (const service of tree) {
    const serviceTitle = service.title;
    for (const category of service.data) {
      const categoryTitle = category.title;
      for (const job of category.data) {
        const title = job.title;
        const contentSlug = polishToEnglish(title);

        let publicSlug = contentSlug;
        if (usedPublicSlugs.has(publicSlug)) {
          publicSlug = polishToEnglish(`${categoryTitle}-${title}`);
        }
        if (usedPublicSlugs.has(publicSlug)) {
          publicSlug = polishToEnglish(`${serviceTitle}-${categoryTitle}-${title}`);
        }
        usedPublicSlugs.add(publicSlug);

        leaves.push({
          publicSlug,
          contentSlug,
          title,
          serviceTitle,
          categoryTitle,
        });
      }
    }
  }
  return leaves;
}

const LEAVES = buildLeaves();

const byPublicSlug = new Map<string, GrudziadzServiceLeaf>(
  LEAVES.map((l) => [l.publicSlug, l])
);

export function getAllGrudziadzServiceLeaves(): GrudziadzServiceLeaf[] {
  return LEAVES;
}

export function getGrudziadzServiceByPublicSlug(
  publicSlug: string
): GrudziadzServiceLeaf | undefined {
  return byPublicSlug.get(publicSlug);
}

export function getGrudziadzStaticParams(): { slug: string }[] {
  return LEAVES.map((l) => ({ slug: l.publicSlug }));
}
