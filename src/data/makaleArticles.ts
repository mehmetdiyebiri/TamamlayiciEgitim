import { MakaleItem } from './makaleTypes';
import { BILIM_ARTICLES } from './makaleBilim';
import { TARIH_ARTICLES } from './makaleTarih';
import { TEKNOLOJI_ARTICLES } from './makaleTeknoloji';
import { SANAT_ARTICLES } from './makaleSanat';
import { COGRAFYA_ARTICLES } from './makaleCografya';
import { EDEBIYAT_ARTICLES } from './makaleEdebiyat';

export const ALL_MAKALE_ARTICLES: MakaleItem[] = [
  ...BILIM_ARTICLES,
  ...TARIH_ARTICLES,
  ...TEKNOLOJI_ARTICLES,
  ...SANAT_ARTICLES,
  ...COGRAFYA_ARTICLES,
  ...EDEBIYAT_ARTICLES
];

export const WORKSHOPS = [
  {
    id: 1,
    title: "Okuma Atölyesi",
    shortTitle: "Okuma Atölyesi",
    description: "6 Kategori, 24 Özgün Bilimsel ve Akademik Makale",
    articleCount: ALL_MAKALE_ARTICLES.length,
    articles: ALL_MAKALE_ARTICLES
  }
];

export * from './makaleTypes';
