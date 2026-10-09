export interface ParagrafQuestion {
  id: number;
  questionStem: string;
  questionType: 'Ana Fikir' | 'Yardımcı Fikir' | 'Çıkarım' | 'Anlatım Biçimi' | 'Konu / Başlık';
  options: string[];
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
}

export interface ParagrafItem {
  id: number;
  title: string;
  category: 'Bilim' | 'Tarih' | 'Teknoloji' | 'Sanat' | 'Coğrafya' | 'Edebiyat';
  kur: string; // e.g. "Kur 1: Temel", "Kur 2: Orta", "Kur 3: İleri"
  paragraphText: string;
  questions: ParagrafQuestion[];
}

export const PARAGRAF_CATEGORIES = ['Tümü', 'Bilim', 'Tarih', 'Teknoloji', 'Sanat', 'Coğrafya', 'Edebiyat'] as const;

import { BILIM_PARAGRAFLARI } from './paragraflar/bilim';
import { TARIH_PARAGRAFLARI } from './paragraflar/tarih';
import { TEKNOLOJI_PARAGRAFLARI } from './paragraflar/teknoloji';
import { SANAT_PARAGRAFLARI } from './paragraflar/sanat';
import { COGRAFYA_PARAGRAFLARI } from './paragraflar/cografya';
import { EDEBIYAT_PARAGRAFLARI } from './paragraflar/edebiyat';

export const ALL_PARAGRAFLAR: ParagrafItem[] = [
  ...BILIM_PARAGRAFLARI,
  ...TARIH_PARAGRAFLARI,
  ...TEKNOLOJI_PARAGRAFLARI,
  ...SANAT_PARAGRAFLARI,
  ...COGRAFYA_PARAGRAFLARI,
  ...EDEBIYAT_PARAGRAFLARI,
];
