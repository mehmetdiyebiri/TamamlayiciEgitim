import { SozelMantikItem, SozelMantikAtolyeMeta } from './sozelMantikTypes';
import { ATOLYE_1_QUESTIONS } from './sozelMantikAtolye1';
import { ATOLYE_2_QUESTIONS } from './sozelMantikAtolye2';
import { ATOLYE_3_QUESTIONS } from './sozelMantikAtolye3';
import { ATOLYE_4_QUESTIONS } from './sozelMantikAtolye4';
import { ATOLYE_5_QUESTIONS } from './sozelMantikAtolye5';

export const SOZEL_MANTIK_ATOLYELER: SozelMantikAtolyeMeta[] = [
  {
    id: 1,
    title: 'Atölye 1 – 5. Sınıflar için: Giriş Düzeyi ve Tablo Kurma Mantığı',
    shortLabel: 'Atölye 1 – 5. Sınıflar için',
    gradeLevel: '5. Sınıflar için',
    subtitle: 'Tek ve Çift Değişkenli Tablolar, Kesin Bilgi Çivileme',
    questionCount: 20,
    difficulty: '5. Sınıf • Temel Seviye',
    iconName: 'LayoutGrid',
    color: 'indigo'
  },
  {
    id: 2,
    title: 'Atölye 2 – 6. Sınıflar için: İki Değişkenli Bağıntılar ve Kümeleme',
    shortLabel: 'Atölye 2 – 6. Sınıflar için',
    gradeLevel: '6. Sınıflar için',
    subtitle: 'Kişi-Branş, Kat-Daire, Gün-Nöbet Eşleştirmeleri',
    questionCount: 20,
    difficulty: '6. Sınıf • Orta Seviye',
    iconName: 'GitMerge',
    color: 'cyan'
  },
  {
    id: 3,
    title: 'Atölye 3 – 7. Sınıflar için: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    shortLabel: 'Atölye 3 – 7. Sınıflar için',
    gradeLevel: '7. Sınıflar için',
    subtitle: 'Kişi – Ülke – Araç, Çok Boyutlu İndeksleme ve Mühürleme',
    questionCount: 20,
    difficulty: '7. Sınıf • İleri Seviye',
    iconName: 'Layers',
    color: 'emerald'
  },
  {
    id: 4,
    title: 'Atölye 4 – 8. Sınıflar için: Sıralama ve Karmaşık Yerleştirme',
    shortLabel: 'Atölye 4 – 8. Sınıflar için',
    gradeLevel: '8. Sınıflar için',
    subtitle: 'Ray Modeli, Raf, Kuyruk, Pist, Seans ve Zaman Sıralamaları',
    questionCount: 20,
    difficulty: '8. Sınıf • Uzman Seviye',
    iconName: 'ArrowDownUp',
    color: 'amber'
  },
  {
    id: 5,
    title: 'Atölye 5 – 8. Sınıflar ve LGS için: Şifreleme ve Sözel Mantık Oyunları',
    shortLabel: 'Atölye 5 – 8. Sınıflar ve LGS için',
    gradeLevel: '8. Sınıflar ve LGS için',
    subtitle: 'Kriptoloji, Harf-Rakam Matrisleri, Aynalama, Labirent ve Algoritmalar',
    questionCount: 20,
    difficulty: '8. Sınıf ve LGS • Usta Seviye',
    iconName: 'Cpu',
    color: 'purple'
  }
];

export function getSozelMantikAtolyeLabel(atolyeId: number): string {
  const found = SOZEL_MANTIK_ATOLYELER.find(a => a.id === atolyeId);
  return found ? found.shortLabel : `Atölye ${atolyeId}`;
}

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

