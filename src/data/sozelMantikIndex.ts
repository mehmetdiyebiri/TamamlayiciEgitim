import { SozelMantikItem, SozelMantikAtolyeMeta } from './sozelMantikTypes';
import { ATOLYE_1_QUESTIONS } from './sozelMantikAtolye1';
import { ATOLYE_2_QUESTIONS } from './sozelMantikAtolye2';
import { ATOLYE_3_QUESTIONS } from './sozelMantikAtolye3';
import { ATOLYE_4_QUESTIONS } from './sozelMantikAtolye4';
import { ATOLYE_5_QUESTIONS } from './sozelMantikAtolye5';

export const SOZEL_MANTIK_ATOLYELER: SozelMantikAtolyeMeta[] = [
  {
    id: 1,
    title: 'Atölye 1: Giriş Düzeyi ve Tablo Kurma Mantığı',
    subtitle: 'Tek ve Çift Değişkenli Tablolar, Kesin Bilgi Çivileme',
    questionCount: 20,
    difficulty: 'Başlangıç - Temel Seviye',
    iconName: 'LayoutGrid',
    color: 'indigo'
  },
  {
    id: 2,
    title: 'Atölye 2: İki Değişkenli Bağıntılar ve Kümeleme',
    subtitle: 'Kişi-Branş, Kat-Daire, Gün-Nöbet Eşleştirmeleri',
    questionCount: 20,
    difficulty: 'Orta Seviye',
    iconName: 'GitMerge',
    color: 'cyan'
  },
  {
    id: 3,
    title: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    subtitle: 'Kişi – Ülke – Araç, Çok Boyutlu İndeksleme ve Mühürleme',
    questionCount: 20,
    difficulty: 'İleri Seviye',
    iconName: 'Layers',
    color: 'emerald'
  },
  {
    id: 4,
    title: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    subtitle: 'Ray Modeli, Raf, Kuyruk, Pist, Seans ve Zaman Sıralamaları',
    questionCount: 20,
    difficulty: 'Uzman Seviye',
    iconName: 'ArrowDownUp',
    color: 'amber'
  },
  {
    id: 5,
    title: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    subtitle: 'Kriptoloji, Harf-Rakam Matrisleri, Aynalama, Labirent ve Algoritmalar',
    questionCount: 20,
    difficulty: 'Usta Seviye',
    iconName: 'Cpu',
    color: 'purple'
  }
];

export const ALL_SOZEL_MANTIK_QUESTIONS: SozelMantikItem[] = [
  ...ATOLYE_1_QUESTIONS,
  ...ATOLYE_2_QUESTIONS,
  ...ATOLYE_3_QUESTIONS,
  ...ATOLYE_4_QUESTIONS,
  ...ATOLYE_5_QUESTIONS
];

export function getQuestionsByAtolye(atolyeId: number): SozelMantikItem[] {
  switch (atolyeId) {
    case 1:
      return ATOLYE_1_QUESTIONS;
    case 2:
      return ATOLYE_2_QUESTIONS;
    case 3:
      return ATOLYE_3_QUESTIONS;
    case 4:
      return ATOLYE_4_QUESTIONS;
    case 5:
      return ATOLYE_5_QUESTIONS;
    default:
      return ATOLYE_1_QUESTIONS;
  }
}
