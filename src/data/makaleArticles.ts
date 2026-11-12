import { MakaleItem } from './makaleTypes';
import { ATOLYE_1_ARTICLES } from './makaleAtolye1';
import { ATOLYE_2_ARTICLES } from './makaleAtolye2';

// Toplam 40 Makale:
// Atölye 1: 5 ve 6. Sınıf seviyesine uygun 20 makale (id: 101-120)
// Atölye 2: 7 ve 8. Sınıf (LGS Odaklı) seviyesine uygun 20 makale (id: 201-220)
export const ALL_MAKALE_ARTICLES: MakaleItem[] = [
  ...ATOLYE_1_ARTICLES,
  ...ATOLYE_2_ARTICLES
];

export const WORKSHOPS = [
  {
    id: 1,
    title: "Atölye 1 (5 ve 6. Sınıf)",
    shortTitle: "Atölye 1 (5-6. Sınıf)",
    gradeLevel: "5 ve 6. Sınıf",
    description: "5 ve 6. Sınıf seviyesine uygun 20 özgün metin ve temel metin analitiği",
    articleCount: ATOLYE_1_ARTICLES.length,
    articles: ATOLYE_1_ARTICLES
  },
  {
    id: 2,
    title: "Atölye 2 (7 ve 8. Sınıf)",
    shortTitle: "Atölye 2 (7-8. Sınıf)",
    gradeLevel: "7 ve 8. Sınıf",
    description: "7 ve 8. Sınıf (LGS Odaklı) seviyesine uygun 20 özgün metin, beceri temelli sorular ve derinlemesine analiz",
    articleCount: ATOLYE_2_ARTICLES.length,
    articles: ATOLYE_2_ARTICLES
  }
];

export * from './makaleTypes';
export { ATOLYE_1_ARTICLES } from './makaleAtolye1';
export { ATOLYE_2_ARTICLES } from './makaleAtolye2';
