import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Zap, Sparkles, CheckCircle2, ChevronRight, Search, 
  Lightbulb, ArrowRight, Play, RefreshCw, Layers, Star, Compass, 
  Calculator, BookOpen, ChevronDown, Check, HelpCircle, Shapes,
  Grid, BarChart2, Dices, Scale, Ruler, Maximize2, CheckCircle,
  Eye, Smile, Award, Flame
} from 'lucide-react';

export interface MindMapNode {
  id: string;
  gradeLevel: number; // 5, 6, 7, 8
  title: string;
  kidSummary: string; // 10-year-old child friendly headline
  shortDesc: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  ruleFormula: string;
  howItWorks: string;
  visualType?: 'geometry_basics' | 'line_relations' | 'compass_triangles' | 'area_grid' | 'stats_steps' | 'probability_dice' | 'algebra_scale' | 'angle_types';
  example: {
    problem: string;
    steps: string[];
    result: string;
  };
  tryIt: {
    question: string;
    correctAnswer: string;
    hint: string;
  };
}

export interface MindMapCategory {
  id: string;
  gradeLevel: number; // 5 for 5th grade specific, 0 for all
  title: string;
  emoji: string;
  color: string;
  desc: string;
  nodes: MindMapNode[];
}

export const MIND_MAP_DATA: MindMapCategory[] = [
  // =========================================================================
  // 5. SINIF MAARİF MODELİ: 10 YAŞINA ÖZEL GÖRSEL ZİHİN HARİTALARI
  // =========================================================================
  {
    id: 'geometrik_kavramlar_5',
    gradeLevel: 5,
    title: '5. Sınıf Geometrik Şekiller & Doğrular',
    emoji: '📐',
    color: 'from-blue-500 via-indigo-600 to-purple-600',
    desc: 'Nokta, doğru, ışın, açı çeşitleri ve küs paralel tren rayları!',
    nodes: [
      {
        id: 'temel_kavramlar',
        gradeLevel: 5,
        title: 'Nokta, Doğru, Işın ve Doğru Parçası',
        kidSummary: 'Kalemin bıraktığı izden sonsuz uzay yollarına!',
        shortDesc: 'Boyutsuz noktadan sonsuza uzanan ışın ve doğrulara görsel rehber.',
        badge: 'Temel Geometri',
        color: 'text-blue-600',
        borderColor: 'border-blue-300',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-900',
        visualType: 'geometry_basics',
        ruleFormula: 'Nokta: • A  |  Doğru: ⟷ AB  |  Doğru Parçası: [AB]  |  Işın: [AB⟵',
        howItWorks: '• Nokta (• A): Kalemin ucunun deftere dokunduğu andır! Sıfır boyutludur, eni ve boyu yoktur.\n• Doğru (⟷ AB): İki ucu da uzaya kadar giden sonsuz bir yoldur! İki ucunda ok bulunur.\n• Doğru Parçası ([AB]): İki ucu da kapalıdır, cetvelle boyu ölçülebilir (Örn: |AB| = 10 cm).\n• Işın ([AB⟵): Fenerden çıkan ışık gibidir! Başlangıç noktası sabittir, diğer ucu sonsuza gider.',
        example: {
          problem: 'Cetvelimizle boyunu 8 cm olarak ölçebildiğimiz ve iki ucu kapalı olan şekil nedir?',
          steps: [
            '1. İki ucu da kapalı ve sınırlıdır.',
            '2. Boyu cetvelle ölçülebilmektedir (|AB| = 8 cm).',
            '3. Bu geometrik şekil "Doğru Parçası"dır ve [AB] sembolüyle gösterilir.'
          ],
          result: 'Doğru Parçası [AB]'
        },
        tryIt: {
          question: 'Fenerden veya Güneş\'ten çıkan ve tek yöne sonsuza giden ışık çizgisine geometride ne denir?',
          correctAnswer: 'Işın',
          hint: 'Güneş ışınlarını hatırla: Başlangıç Güneş\'tir, ucu sonsuza gider!'
        }
      },
      {
        id: 'dogrularin_durumlari',
        gradeLevel: 5,
        title: 'İki Doğrunun Durumları (Tren Rayları & Köşeler)',
        kidSummary: 'Küs tren rayları (//), kavşaklar (✕) ve pencere köşeleri (⊥)!',
        shortDesc: 'Paralel (//), Kesişen, Dik Kesişen (⊥) ve Üst Üste Çakışık Doğrular.',
        badge: 'Doğru Maceraları',
        color: 'text-indigo-600',
        borderColor: 'border-indigo-300',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-900',
        visualType: 'line_relations',
        ruleFormula: 'Paralel: d // k (Asla Kesişmez) | Dik: d ⊥ k (90° Açılı) | Çakışık: p ≡ r',
        howItWorks: '1. Paralel Doğrular (//): Tren rayları gibidir! Birbirine küstürler, aralarındaki mesafe hep aynıdır ve ASLA çarpışmazlar.\n2. Kesişen Doğrular: Dört yol kavşağı gibi tek bir noktada buluşurlar.\n3. Dik Kesişen Doğrular (⊥): Odanın duvarı ile tabanı gibi tam 90°\'lik dik açıyla kesişirler.\n4. Çakışık Doğrular: Üst üste yapışmış ikiz doğrular gibidir, bütün noktaları ortaktır.',
        example: {
          problem: 'Aralarındaki uzaklık her zaman 4 cm olan ve sonsuza kadar gitseler bile hiç kesişmeyen doğrular hangisidir?',
          steps: [
            '1. Aradaki mesafe hep sabittir.',
            '2. Asla kesişmezler ve ortak noktaları yoktur.',
            '3. Bu doğrular Paralel Doğrulardır (Sembolü: //).'
          ],
          result: 'Paralel Doğrular (d // k)'
        },
        tryIt: {
          question: 'Odamızın duvarı ile tabanının oluşturduğu 90 derecelik dik kesişme sembolü nedir? (⊥ mi // mi?)',
          correctAnswer: '⊥',
          hint: 'Ters T harfine benzeyen diklik sembolü: ⊥.'
        }
      },
      {
        id: 'aci_cesitleri_konum',
        gradeLevel: 5,
        title: 'Açı Çeşitleri & Noktanın Konumu',
        kidSummary: 'Timsah ağzı dar açı, kitap köşesi dik açı, yelpaze geniş açı!',
        shortDesc: 'Dar (<90°), Dik (90°), Geniş (>90°), Doğru (180°) ve Adım Sayma.',
        badge: 'Açı Rehberi',
        color: 'text-sky-600',
        borderColor: 'border-sky-300',
        bgColor: 'bg-sky-50',
        textColor: 'text-sky-900',
        visualType: 'angle_types',
        ruleFormula: 'Dar: 0° < x < 90°  |  Dik: 90°  |  Geniş: 90° < x < 180°  |  Doğru: 180°',
        howItWorks: '• Dar Açı: Timsahın minik açtığı sivri ağzı gibidir (90°\'den küçüktür; örn: 30°, 60°, 85°).\n• Dik Açı: Asker gibi dimdik duran kitap köşesidir (Tam 90°).\n• Geniş Açı: Plaj şezlongu veya açılmış yelpaze gibidir (90° ile 180° arası; örn: 120°, 150°).\n• Doğru Açı: Kollarını iki yana açmış çocuk gibi dümdüzdür (Tam 180°).\n• Noktanın Konumu: Kareli zeminde adım sayarız: "3 adım Sağa ➡️, 2 adım Yukarı ⬆️".',
        example: {
          problem: 'Ölçüsü 130° olan bir açı hangi açı türüdür?',
          steps: [
            '1. 130 sayısı 90\'dan büyüktür.',
            '2. 130 sayısı 180\'den küçüktür.',
            '3. 90° ile 180° arasında olduğu için Geniş Açı\'dır.'
          ],
          result: 'Geniş Açı'
        },
        tryIt: {
          question: 'Ölçüsü tam 90 derece olan köşe açısına ne ad verilir?',
          correctAnswer: 'Dik Açı',
          hint: 'Kitap köşesi veya kare köşesi gibi dimdik olan açı.'
        }
      }
    ]
  },

  {
    id: 'ucgen_insasi_cember_5',
    gradeLevel: 5,
    title: '5. Sınıf Pergel ile Üçgen Çizimi',
    emoji: '🔺',
    color: 'from-pink-500 via-rose-600 to-red-600',
    desc: 'Sabun balonları ve pergel ile eşkenar, ikizkenar ve çeşitkenar üçgen inşası!',
    nodes: [
      {
        id: 'cemberle_eskenar',
        gradeLevel: 5,
        title: 'Çember & Pergel ile Eşkenar Üçgen',
        kidSummary: 'Aynı boydaki iki çemberin sihirli buluşması!',
        shortDesc: 'Pergel açıklığını bozmadan çizilen çemberlerle 3 kenarı eşit üçgen.',
        badge: 'Üçgen İnşası',
        color: 'text-rose-600',
        borderColor: 'border-rose-300',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-900',
        visualType: 'compass_triangles',
        ruleFormula: 'Aynı Yarıçap (r) ➔ 3 Kenar Eşit (a = b = c) ➔ Eşkenar Üçgen',
        howItWorks: '1. Pergelimizi cetvelle 4 cm açarız.\n2. A merkezli bir çember çizeriz.\n3. Pergelin açıklığını HİÇ BOZMADAN C noktasına batırıp ikinci çemberi çizeriz.\n4. İki çemberin kesiştiği tepe noktasını (D) merkezlerle birleştirdiğimizde, 3 kenarı da tam 4 cm olan kusursuz bir Eşkenar Üçgen elde ederiz!',
        example: {
          problem: 'Büyüklükleri aynı olan iki çember kesiştirilip merkezleri ve kesişim noktası birleştirilirse hangi üçgen oluşur?',
          steps: [
            '1. Çemberlerin yarıçapları birbirine eşittir.',
            '2. Birleştirilen tüm kenar uzunlukları aynı (r) çıkar.',
            '3. Bütün kenarları eşit olan üçgen Eşkenar Üçgen\'dir.'
          ],
          result: 'Eşkenar Üçgen (Tüm kenarlar eşit)'
        },
        tryIt: {
          question: '3 kenar uzunluğu da birbirine eşit (Örn: 5 cm, 5 cm, 5 cm) olan üçgenin adı nedir?',
          correctAnswer: 'Eşkenar Üçgen',
          hint: 'Tüm kenarları "eş" olan üçgen.'
        }
      }
    ]
  },

  {
    id: 'alan_geometrik_nicelikler_5',
    gradeLevel: 5,
    title: '5. Sınıf Dikdörtgen Alanı & Çikolata Izgarası',
    emoji: '🍫',
    color: 'from-emerald-500 via-teal-600 to-green-600',
    desc: 'Satır × Sütun ile birim kare sayma ve Alan-Çevre farkı.',
    nodes: [
      {
        id: 'alan_formulu_kareler',
        gradeLevel: 5,
        title: 'Dikdörtgenin Alanı = Uzun Kenar × Kısa Kenar',
        kidSummary: 'Çikolata tabletindeki kareleri tek tek saymadan anında bul!',
        shortDesc: 'Kareli zeminde satır ve sütunları çarparak yüzey alanını hesaplama.',
        badge: 'Alan Modeli',
        color: 'text-emerald-600',
        borderColor: 'border-emerald-300',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-900',
        visualType: 'area_grid',
        ruleFormula: 'Alan (A) = Uzun Kenar × Kısa Kenar  (A = a × b)',
        howItWorks: '• Alan: Odanın tabanına parke döşemek veya masanın üzerini örtüyle kaplamak gibi yüzeyin kapladığı yerdir.\n• Birim Kare Modeli: 4 satır ve 6 sütun olan bir çikolatada 24 kare vardır. Tek tek saymak yerine 4 × 6 = 24 cm² yaparız!\n• Alan vs Çevre Farkı: Alan masanın üst yüzeyidir (cm²); Çevre ise masanın etrafındaki kenar çıtasıdır (cm).',
        example: {
          problem: 'Kısa kenarı 4 cm, uzun kenarı 7 cm olan dikdörtgen bir halının alanı kaç cm² dir?',
          steps: [
            '1. Formül: Alan = Kısa Kenar × Uzun Kenar',
            '2. İşlem: 4 × 7 = 28',
            '3. Birim: cm² (santimetrekare)'
          ],
          result: '28 cm²'
        },
        tryIt: {
          question: 'Kısa kenarı 5 cm, uzun kenarı 8 cm olan dikdörtgenin alanı kaç cm² dir?',
          correctAnswer: '40',
          hint: '5 ile 8\'i çarp: 5 × 8 = 40.'
        }
      }
    ]
  },

  {
    id: 'istatistik_arastirma_5',
    gradeLevel: 5,
    title: '5. Sınıf İstatistiğin 4 Temel Adımı',
    emoji: '📊',
    color: 'from-amber-500 via-orange-600 to-yellow-600',
    desc: '1. Soru Sor ➔ 2. Veri Topla ➔ 3. Grafik Çiz ➔ 4. Şampiyonu Yorumla!',
    nodes: [
      {
        id: 'istatistik_4_adim',
        gradeLevel: 5,
        title: 'İstatistiki Araştırmanın 4 Katlı Binası',
        kidSummary: 'Dedektif gibi soru sor, veri topla ve renkli grafikle açıkla!',
        shortDesc: 'Araştırma sorusu, çetele/anket, sütun grafiği ve sonuç çıkarma.',
        badge: 'Veri Dedektifi',
        color: 'text-amber-600',
        borderColor: 'border-amber-300',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-900',
        visualType: 'stats_steps',
        ruleFormula: '1. Soru Belirle ➔ 2. Veri Topla ➔ 3. Tablo/Grafik Yap ➔ 4. Yorumla & Karar Ver',
        howItWorks: '1. Adım (Temel): Araştırma Sorusu Sor (Örn: "5/A sınıfının en sevdiği dondurma çeşidi nedir?").\n2. Adım (Malzeme): Anket yapıp çetele tutarak sayıları biriktir.\n3. Adım (İnşa): Renkli sütun grafiği ve sıklık tablosu çiz.\n4. Adım (Kullanım): En çok çilekli dondurmanın sevildiğini yorumla!',
        example: {
          problem: '"Ahmet\'in en sevdiği renk nedir?" sorusu geçerli bir istatistiksel araştırma sorusu mudur?',
          steps: [
            '1. Bu soru sadece 1 kişiye yöneliktir ve tek bir cevabı vardır.',
            '2. İstatistik sorusu bir gruba sorulmalı ve farklı veriler üretmelidir.',
            '3. Dolayısıyla araştırma sorusu olamaz.'
          ],
          result: 'Hayır, tekil kişiye ait soru olduğu için uygun değildir.'
        },
        tryIt: {
          question: '"Okulumuzdaki öğrencilerin en çok dinlediği müzik türü nedir?" uygun bir araştırma sorusu mudur? (Evet / Hayır)',
          correctAnswer: 'Evet',
          hint: 'Bütün okuldan farklı farklı veriler toplanacağı için harika bir araştırma sorusudur!'
        }
      }
    ]
  },

  {
    id: 'olasilik_kavramlari_5',
    gradeLevel: 5,
    title: '5. Sınıf Olasılık, Zar & Şans Oyunları',
    emoji: '🎲',
    color: 'from-purple-500 via-pink-600 to-indigo-600',
    desc: 'Deney, çıktılar, Kesin Olay (%100), İmkansız Olay (%0) ve kart çekmece!',
    nodes: [
      {
        id: 'olasilik_zar_olay',
        gradeLevel: 5,
        title: 'Olasılık: Kesin, İmkansız ve Eşit Şans',
        kidSummary: 'Zar atma deneyi ve şans hesaplama dünyası!',
        shortDesc: 'Olasılık = İstenen Sonuçlar / Tüm Sonuçlar. 0 ile 1 arasındadır.',
        badge: 'Şans & Olasılık',
        color: 'text-purple-600',
        borderColor: 'border-purple-300',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-900',
        visualType: 'probability_dice',
        ruleFormula: 'Olasılık = İstenen Durum Sayısı ÷ Tüm Olası Durumlar  (0 ≤ Olasılık ≤ 1)',
        howItWorks: '• Deney: Zarı yere atmak veya torbadan kart çekmek.\n• Tüm Durumlar (Örnek Uzay): Zarda 6 yüz vardır (1, 2, 3, 4, 5, 6).\n• Kesin Olay (%100): Zarda 7\'den küçük sayı gelmesi (Kesinlikle olur, değeri 1\'dir).\n• İmkânsız Olay (%0): Zarda 9 gelmesi (Asla olamaz, değeri 0\'dır).\n• Eşit Şans: 3 Mavi ve 3 Kırmızı karttan birini çekme şansı birbirine eşittir.',
        example: {
          problem: '6 yüzlü bir zar atıldığında çift sayı (2, 4, 6) gelme olasılığı nedir?',
          steps: [
            '1. Tüm olası sayılar: 1, 2, 3, 4, 5, 6 (Toplam 6 durum)',
            '2. İstenen çift sayılar: 2, 4, 6 (3 durum)',
            '3. Olasılık: 3 / 6 = 1 / 2 (%50 yani yarı yarıya)'
          ],
          result: '1/2 (%50 Şans)'
        },
        tryIt: {
          question: 'Bir zar atıldığında 8 gelmesi nasıl bir olaydır? (Kesin mi İmkansız mı?)',
          correctAnswer: 'İmkansız',
          hint: 'Zarda 8 sayısı olmadığı için gerçekleşmesi imkânsızdır (%0).'
        }
      }
    ]
  },

  {
    id: 'cebirsel_denge_terazi_5',
    gradeLevel: 5,
    title: '5. Sınıf Eşitliğin Korunumu & Terazi',
    emoji: '⚖️',
    color: 'from-violet-500 via-purple-600 to-indigo-700',
    desc: 'İki kefeli denge terazisi ve ters işlemle gizli kutuyu (x) bulma!',
    nodes: [
      {
        id: 'esitlik_korunumu_denge',
        gradeLevel: 5,
        title: 'Eşit Kollu Terazi & Denge Kuralı',
        kidSummary: 'İki kefeye de aynı elmayı eklersen terazi dengede kalır!',
        shortDesc: 'Eşitliğin her iki tarafına aynı işlem yapılırsa denge asla bozulmaz.',
        badge: 'Denge & Cebir',
        color: 'text-violet-600',
        borderColor: 'border-violet-300',
        bgColor: 'bg-violet-50',
        textColor: 'text-violet-900',
        visualType: 'algebra_scale',
        ruleFormula: 'Sol Kefe = Sağ Kefe ➔ İki tarafa aynı işlemi yap (+, -, ×, ÷)',
        howItWorks: '1. Denge Terazisi: Sol kefede "x + 2 kg", sağ kefede "7 kg" varken terazi dengededir.\n2. Gizli Kutuyu Bulma: İki kefeden de 2 kg çıkarırsak denge bozulmaz ve kutunun ağırlığı x = 5 kg bulunur!\n3. Çarpma dengesi: 3 kutu = 21 kg ise, bir kutu 21 ÷ 3 = 7 kg eder.',
        example: {
          problem: 'Terazinin solunda x + 3 kg, sağında 12 kg varken terazi dengededir. x kaçtır?',
          steps: [
            '1. Denge denklemi: x + 3 = 12',
            '2. Her iki taraftan 3 kg alalım: x + 3 - 3 = 12 - 3',
            '3. x = 9 kg bulunur.'
          ],
          result: 'x = 9'
        },
        tryIt: {
          question: 'x + 4 = 10 dengesinde x\'i bulmak için her iki taraftan kaç çıkarmalıyız?',
          correctAnswer: '4',
          hint: 'Yanındaki 4 kg fazlalığı iki taraftan da çıkarmalıyız (x = 6 kalır).'
        }
      }
    ]
  },

  // =========================================================================
  // GENEL ZİHİNDEN DÖRT İŞLEM & HESAPLAMA STRATEJİLERİ
  // =========================================================================
  {
    id: 'aritmetik_hileleri',
    gradeLevel: 0,
    title: 'Zihinden Hızlı Dört İşlem Hileleri',
    emoji: '⚡',
    color: 'from-amber-500 via-orange-500 to-red-500',
    desc: '11 ile çarpma, 9 hilesi, 5 ve 25 kısayolları ile işlem canavarı ol!',
    nodes: [
      {
        id: 'carpma_11',
        gradeLevel: 0,
        title: '11 ile İki Basamaklı Sayıları Çarpma',
        kidSummary: 'Rakamları topla, sandviç gibi tam araya yaz!',
        shortDesc: 'Rakamları topla, iki basamağın arasına yerleştir.',
        badge: 'Çarpma Hilesi',
        color: 'text-amber-600',
        borderColor: 'border-amber-300',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-900',
        ruleFormula: 'AB × 11 = A _ (A+B) _ B',
        howItWorks: '43 × 11 yaparken:\n1. 4 ve 3 rakamlarını iki yana aç: 4 _ 3\n2. Rakamları topla: 4 + 3 = 7\n3. Ortaya yaz: 473! İşte bu kadar kolay!',
        example: {
          problem: '35 × 11 = ?',
          steps: [
            '1. 3 ve 5\'i ayır: 3 _ 5',
            '2. Topla: 3 + 5 = 8',
            '3. Ortaya yaz: 385'
          ],
          result: '385'
        },
        tryIt: {
          question: '52 × 11 işleminin sonucu kaçtır?',
          correctAnswer: '572',
          hint: '5 ve 2\'yi ayır, arasına 5+2=7 koy -> 572.'
        }
      },
      {
        id: 'carpma_9',
        gradeLevel: 0,
        title: '9 ile Çarpma (10 ile Çarp, Çıkar)',
        kidSummary: 'Sona sıfır ekle, sayının kendisini çıkar!',
        shortDesc: '46 × 9 ➔ 460 - 46 = 414.',
        badge: 'Hızlı Çarpma',
        color: 'text-orange-600',
        borderColor: 'border-orange-300',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-900',
        ruleFormula: 'X × 9 = (X × 10) - X',
        howItWorks: 'Zihinden 9 ile çarpmak yerine, 10 ile çarpıp (sona sıfır koyup) sayının kendisini çıkarmak çok daha hızlıdır.',
        example: {
          problem: '25 × 9 = ?',
          steps: [
            '1. 25\'in sonuna sıfır koy: 250',
            '2. 250\'den 25 çıkar: 225'
          ],
          result: '225'
        },
        tryIt: {
          question: '30 × 9 işleminin sonucu kaçtır?',
          correctAnswer: '270',
          hint: '300\'den 30 çıkar: 270.'
        }
      }
    ]
  }
];

export const MindMapsView = ({ grade = 5 }: { grade?: number }) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number>(grade === 5 ? 5 : 0);
  
  const filteredCategories = useMemo(() => {
    if (selectedGradeFilter === 5) {
      return MIND_MAP_DATA.filter(c => c.gradeLevel === 5 || c.gradeLevel === 0);
    }
    return MIND_MAP_DATA;
  }, [selectedGradeFilter]);

  const [selectedCatId, setSelectedCatId] = useState<string>(
    grade === 5 ? 'geometrik_kavramlar_5' : MIND_MAP_DATA[0].id
  );
  
  const activeCategory = useMemo(() => {
    const found = filteredCategories.find(c => c.id === selectedCatId);
    return found || filteredCategories[0];
  }, [filteredCategories, selectedCatId]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>(activeCategory.nodes[0].id);

  const activeNode = useMemo(() => {
    const found = activeCategory.nodes.find(n => n.id === selectedNodeId);
    return found || activeCategory.nodes[0];
  }, [activeCategory, selectedNodeId]);

  const [userTryInput, setUserTryInput] = useState('');
  const [tryFeedback, setTryFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelectNode = (node: MindMapNode) => {
    setSelectedNodeId(node.id);
    setUserTryInput('');
    setTryFeedback(null);
    setShowHint(false);
  };

  const handleTrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTryInput.trim()) return;

    const cleanInput = userTryInput.trim().toLowerCase();
    const cleanTarget = activeNode.tryIt.correctAnswer.trim().toLowerCase();

    if (cleanInput === cleanTarget || cleanInput.includes(cleanTarget)) {
      setTryFeedback('correct');
    } else {
      setTryFeedback('wrong');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 px-1 sm:px-3 space-y-8 animate-in fade-in duration-300 font-sans">
      {/* 10-YEAR OLD FRIENDLY PLAYFUL TOP BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-2 border-indigo-500/30">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400 text-slate-950 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-amber-400/20">
              <Sparkles size={16} className="animate-spin" />
              5. SINIF MAARİF ZİHİN HARİTASI
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-indigo-100 text-xs sm:text-sm font-bold rounded-full backdrop-blur-md">
              <Smile size={16} className="text-amber-300" /> Kolay, Sade &amp; Renkli Anlatım
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            5. Sınıf Matematik Görsel Zihin Haritası 🌟
          </h2>
          <p className="text-indigo-100 text-sm sm:text-lg leading-relaxed font-medium">
            Geometrik şekiller, pergel ile üçgen çizimi, dikdörtgen alanı, istatistik binası, olasılık zarları ve terazi dengesi! Renkli büyük resimlere bakarak saniyeler içinde öğren!
          </p>

          {/* Grade Quick Filter Switcher */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setSelectedGradeFilter(5);
                setSelectedCatId('geometrik_kavramlar_5');
              }}
              className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-base transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                selectedGradeFilter === 5
                  ? 'bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/30 scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Star size={18} className="fill-current" /> 5. Sınıf Maarif Haritaları
            </button>
            <button
              onClick={() => {
                setSelectedGradeFilter(0);
              }}
              className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-base transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                selectedGradeFilter === 0
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/10 text-indigo-200 hover:bg-white/20'
              }`}
            >
              <Layers size={18} /> Tüm Haritalar &amp; Hileler
            </button>
          </div>
        </div>
      </div>

      {/* BIG PLAYFUL CATEGORY TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {filteredCategories.map(cat => {
          const isActive = cat.id === activeCategory.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCatId(cat.id);
                setSelectedNodeId(cat.nodes[0].id);
                setUserTryInput('');
                setTryFeedback(null);
                setShowHint(false);
              }}
              className={`p-5 rounded-3xl border-2 text-left transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                isActive 
                  ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-100 ring-4 ring-indigo-500/20 scale-[1.03]' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md text-slate-700'
              }`}
            >
              <div className="space-y-2.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${cat.color} shadow-md text-white group-hover:scale-110 transition-transform`}>
                  {cat.emoji}
                </div>
                <h3 className={`font-black text-sm sm:text-base leading-snug ${isActive ? 'text-indigo-950' : 'text-slate-800'}`}>
                  {cat.title}
                </h3>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400">
                <span>{cat.nodes.length} Konu</span>
                <ChevronRight size={16} className={isActive ? 'text-indigo-600 translate-x-1 transition-transform' : 'text-slate-300'} />
              </div>
            </button>
          );
        })}
      </div>

      {/* MAIN SPLIT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Category Sub-Topics (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers size={16} className="text-indigo-600" /> Konu Listesi
              </h4>
              <span className="text-xs sm:text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                {activeCategory.nodes.length} Harita Düğümü
              </span>
            </div>

            <div className="space-y-3">
              {activeCategory.nodes.map((node) => {
                const isNodeActive = node.id === activeNode.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                      isNodeActive
                        ? `${node.bgColor} ${node.borderColor} shadow-md ring-2 ring-offset-2 ring-indigo-500/20 scale-[1.02]`
                        : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${isNodeActive ? 'bg-indigo-600 ring-4 ring-indigo-200 animate-pulse' : 'bg-slate-300'}`} />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm sm:text-base font-black ${isNodeActive ? node.textColor : 'text-slate-900'}`}>
                          {node.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {node.kidSummary || node.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Visual Diagram & Interactive Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Concept Node Header & Kid-Friendly Explanation */}
              <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider ${activeNode.bgColor} ${activeNode.color} border-2 ${activeNode.borderColor} shadow-xs`}>
                    {activeNode.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-700 font-black bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
                    <Lightbulb size={16} className="text-amber-500" /> 10 Yaş Kolay Anlatım
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">
                    {activeNode.title}
                  </h3>
                  <p className="text-base sm:text-xl font-bold text-indigo-700 mb-4">
                    💡 {activeNode.kidSummary}
                  </p>
                  <div className="text-sm sm:text-base text-slate-700 font-medium whitespace-pre-line leading-relaxed bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200">
                    {activeNode.howItWorks}
                  </div>
                </div>

                {/* Formula or Definition Highlight Bar */}
                <div className="bg-slate-900 text-amber-300 p-5 rounded-2xl font-mono text-center text-sm sm:text-base font-black shadow-inner border border-slate-800 tracking-wide">
                  {activeNode.ruleFormula}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* LARGE & VIBRANT VISUAL DIAGRAMS FOR 10-YEAR OLD KIDS */}
              {/* ------------------------------------------------------------- */}
              
              {/* 1. GEOMETRY BASICS LARGE VISUAL (Nokta, Doğru, Doğru Parçası, Işın) */}
              {activeNode.visualType === 'geometry_basics' && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-blue-200 shadow-md space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-xl font-black text-blue-950 flex items-center gap-2">
                      <Shapes className="text-blue-600" size={24} /> Büyük Geometri Rehberi
                    </h4>
                    <span className="text-xs sm:text-sm font-bold text-blue-700 bg-white px-4 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                      Görsel Semboller
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nokta Card */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-blue-100 shadow-sm space-y-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-100 text-blue-800 font-black text-xs sm:text-sm rounded-full">
                        ✏️ 1. NOKTA (• A)
                      </div>
                      <div className="h-24 sm:h-28 flex items-center justify-center bg-blue-50/60 rounded-2xl border border-blue-100">
                        <span className="w-7 h-7 bg-blue-600 rounded-full inline-block shadow-lg"></span>
                        <span className="font-black text-2xl ml-3 text-blue-900">A</span>
                      </div>
                      <p className="text-sm sm:text-base text-blue-950 font-bold">
                        Kalemin bıraktığı izdir. Boyutu (eni, boyu) yoktur!
                      </p>
                    </div>

                    {/* Doğru Card */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-indigo-100 shadow-sm space-y-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-100 text-indigo-800 font-black text-xs sm:text-sm rounded-full">
                        🚀 2. DOĞRU (⟷ AB)
                      </div>
                      <div className="h-24 sm:h-28 flex items-center justify-center bg-indigo-50/60 rounded-2xl border border-indigo-100 px-4">
                        <div className="w-full flex items-center justify-between text-indigo-600 font-black text-base">
                          <span className="text-2xl">◀━━</span>
                          <span className="w-4 h-4 bg-indigo-600 rounded-full"></span>
                          <span className="text-xs sm:text-sm font-black bg-indigo-600 text-white px-3 py-1 rounded-lg">AB Doğrusu</span>
                          <span className="w-4 h-4 bg-indigo-600 rounded-full"></span>
                          <span className="text-2xl">━━▶</span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-indigo-950 font-bold">
                        İki ucu da uzaya kadar gider! Asla bitmez (İki ok var).
                      </p>
                    </div>

                    {/* Doğru Parçası Card */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-emerald-100 shadow-sm space-y-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 font-black text-xs sm:text-sm rounded-full">
                        📏 3. DOĞRU PARÇASI ([AB])
                      </div>
                      <div className="h-24 sm:h-28 flex items-center justify-center bg-emerald-50/60 rounded-2xl border border-emerald-100 px-4">
                        <div className="w-full flex items-center justify-between text-emerald-600 font-black text-base">
                          <span className="w-5 h-5 bg-emerald-700 rounded-full border-2 border-white shadow-sm"></span>
                          <div className="flex-1 border-t-4 border-emerald-500 mx-3 flex items-center justify-center">
                            <span className="text-xs font-black bg-emerald-700 text-white px-3 py-1 rounded-full mt-[-14px]">
                              Boyu Ölçülür |AB|
                            </span>
                          </div>
                          <span className="w-5 h-5 bg-emerald-700 rounded-full border-2 border-white shadow-sm"></span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-emerald-950 font-bold">
                        İki ucu kapalıdır! Cetvelle boyu ölçülebilir.
                      </p>
                    </div>

                    {/* Işın Card */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-amber-100 shadow-sm space-y-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 text-amber-800 font-black text-xs sm:text-sm rounded-full">
                        🔦 4. IŞIN ([AB⟵)
                      </div>
                      <div className="h-24 sm:h-28 flex items-center justify-center bg-amber-50/60 rounded-2xl border border-amber-100 px-4">
                        <div className="w-full flex items-center justify-between text-amber-600 font-black text-base">
                          <span className="w-5 h-5 bg-amber-600 rounded-full"></span>
                          <span className="text-xs sm:text-sm font-black bg-amber-500 text-slate-950 px-3 py-1 rounded-lg">Fener Işığı</span>
                          <span className="text-2xl">━━━━▶</span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-amber-950 font-bold">
                        Başlangıcı sabittir, diğer ucu sonsuza uçar!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. DOĞRULARIN BİRBİRİNE GÖRE DURUMLARI (Tren Rayları, Makas, Ev Çatısı) */}
              {activeNode.visualType === 'line_relations' && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-indigo-200 shadow-md space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-xl font-black text-indigo-950 flex items-center gap-2">
                      🚂 Doğruların İlişkileri (Tren Rayı &amp; Çatı Modeli)
                    </h4>
                    <span className="text-xs sm:text-sm font-bold text-indigo-700 bg-white px-4 py-1.5 rounded-full border border-indigo-200 shadow-2xs">
                      4 Temel Durum
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Paralel Doğrular */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-blue-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-blue-100 text-blue-900 rounded-full">
                          1. PARALEL DOĞRULAR (//)
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-blue-600">Küs Raylar</span>
                      </div>
                      <div className="h-24 sm:h-28 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col justify-center gap-3.5 px-5">
                        <div className="w-full flex items-center justify-between text-blue-600 font-bold text-sm">
                          <span>◀━━━━━━━━━━━━━━━━▶</span> <span className="font-mono font-black text-base">d</span>
                        </div>
                        <div className="w-full flex items-center justify-between text-blue-600 font-bold text-sm">
                          <span>◀━━━━━━━━━━━━━━━━▶</span> <span className="font-mono font-black text-base">k</span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-950 font-bold">
                        Aralarındaki mesafe hep aynıdır, ASLA kesişmezler! (d // k)
                      </p>
                    </div>

                    {/* Dik Kesişen Doğrular */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-rose-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-rose-100 text-rose-900 rounded-full">
                          2. DİK KESİŞEN (⊥)
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-rose-600">Tam 90° Köşe</span>
                      </div>
                      <div className="h-24 sm:h-28 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-center justify-center relative">
                        {/* Horizontal Line */}
                        <div className="w-3/4 h-1.5 bg-rose-500 absolute"></div>
                        {/* Vertical Line */}
                        <div className="w-1.5 h-3/4 bg-rose-500 absolute"></div>
                        {/* 90 deg box */}
                        <div className="w-4 h-4 border-t-2 border-r-2 border-rose-700 absolute top-5 right-[46%]"></div>
                      </div>
                      <p className="text-sm text-rose-950 font-bold">
                        Pencere veya duvar köşesi gibi 90° ile kesişirler! (d ⊥ k)
                      </p>
                    </div>

                    {/* Kesişen Doğrular */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-amber-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-full">
                          3. KESİŞEN DOĞRULAR
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-amber-700">Dört Yol Ağzı</span>
                      </div>
                      <div className="h-24 sm:h-28 bg-amber-50/60 rounded-2xl border border-amber-100 flex items-center justify-center relative">
                        <div className="text-3xl font-black text-amber-600 rotate-45">➕</div>
                        <span className="w-3.5 h-3.5 bg-amber-700 rounded-full absolute"></span>
                      </div>
                      <p className="text-sm text-amber-950 font-bold">
                        Yalnızca 1 adet ortak kesişim noktaları bulunur.
                      </p>
                    </div>

                    {/* Çakışık Doğrular */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-purple-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-purple-100 text-purple-900 rounded-full">
                          4. ÇAKIŞIK DOĞRULAR (≡)
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-purple-700">İkiz Doğrular</span>
                      </div>
                      <div className="h-24 sm:h-28 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-center justify-center">
                        <div className="w-3/4 h-3 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-full shadow-xs flex items-center justify-center">
                          <span className="text-xs font-black text-white bg-slate-900 px-3 py-1 rounded-full shadow-xs">
                            p ve r Üst Üste
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-purple-950 font-bold">
                        Tamamen üst üste binerler, bütün noktaları ortaktır!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. AÇI ÇEŞİTLERİ BÜYÜK YELPAZE & SAAT DİYAGRAMI */}
              {activeNode.visualType === 'angle_types' && (
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-sky-200 shadow-md space-y-6">
                  <h4 className="text-base sm:text-xl font-black text-sky-950 flex items-center gap-2">
                    🪭 Açı Yelpazesi (Timsah Ağzından Düz Çizgiye)
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                    {/* Dar Açı */}
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-sky-200 text-center space-y-3 shadow-xs">
                      <div className="text-xs sm:text-sm font-black text-sky-900 bg-sky-100 py-1.5 rounded-xl">🐊 DAR AÇI</div>
                      <div className="h-20 sm:h-24 flex items-center justify-center">
                        <svg className="w-18 h-18 sm:w-20 sm:h-20" viewBox="0 0 50 50">
                          <line x1="5" y1="40" x2="45" y2="40" stroke="#0284c7" strokeWidth="3.5" />
                          <line x1="5" y1="40" x2="35" y2="15" stroke="#0284c7" strokeWidth="3.5" />
                          <path d="M 20 40 A 15 15 0 0 0 17 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                        </svg>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-sky-800">0° ile 90° Arası</div>
                    </div>

                    {/* Dik Açı */}
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-indigo-200 text-center space-y-3 shadow-xs">
                      <div className="text-xs sm:text-sm font-black text-indigo-900 bg-indigo-100 py-1.5 rounded-xl">📐 DİK AÇI</div>
                      <div className="h-20 sm:h-24 flex items-center justify-center">
                        <svg className="w-18 h-18 sm:w-20 sm:h-20" viewBox="0 0 50 50">
                          <line x1="10" y1="40" x2="45" y2="40" stroke="#4f46e5" strokeWidth="3.5" />
                          <line x1="10" y1="40" x2="10" y2="5" stroke="#4f46e5" strokeWidth="3.5" />
                          <rect x="10" y="30" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                        </svg>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-indigo-800">Tam 90° Köşe</div>
                    </div>

                    {/* Geniş Açı */}
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-purple-200 text-center space-y-3 shadow-xs">
                      <div className="text-xs sm:text-sm font-black text-purple-900 bg-purple-100 py-1.5 rounded-xl">🏖️ GENİŞ AÇI</div>
                      <div className="h-20 sm:h-24 flex items-center justify-center">
                        <svg className="w-18 h-18 sm:w-20 sm:h-20" viewBox="0 0 50 50">
                          <line x1="25" y1="40" x2="48" y2="40" stroke="#9333ea" strokeWidth="3.5" />
                          <line x1="25" y1="40" x2="5" y2="15" stroke="#9333ea" strokeWidth="3.5" />
                          <path d="M 35 40 A 15 15 0 0 0 15 25" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                        </svg>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-purple-800">90° - 180° Arası</div>
                    </div>

                    {/* Doğru Açı */}
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-emerald-200 text-center space-y-3 shadow-xs">
                      <div className="text-xs sm:text-sm font-black text-emerald-900 bg-emerald-100 py-1.5 rounded-xl">📏 DOĞRU AÇI</div>
                      <div className="h-20 sm:h-24 flex items-center justify-center">
                        <svg className="w-18 h-18 sm:w-20 sm:h-20" viewBox="0 0 50 50">
                          <line x1="5" y1="35" x2="45" y2="35" stroke="#10b981" strokeWidth="3.5" />
                          <circle cx="25" cy="35" r="3.5" fill="#10b981" />
                          <path d="M 12 35 A 13 13 0 0 1 38 35" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                        </svg>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-emerald-800">Tam 180° Düz</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PERGEL & ÇEMBERLE ÜÇGEN İNŞASI BÜYÜK RESİMLER */}
              {activeNode.visualType === 'compass_triangles' && (
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-rose-200 shadow-md space-y-6">
                  <h4 className="text-base sm:text-xl font-black text-rose-950 flex items-center gap-2">
                    🔺 İki Sabun Balonu (Çember) ile Üçgen İnşası
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Eşkenar Üçgen */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-rose-200 space-y-4 text-center shadow-xs">
                      <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-rose-100 text-rose-900 rounded-full inline-block">
                        1. EŞKENAR ÜÇGEN
                      </span>
                      <div className="h-28 sm:h-32 bg-rose-50/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        {/* Big Intersecting Circles */}
                        <div className="absolute left-6 w-20 h-20 rounded-full border-2 border-dashed border-rose-400 opacity-60"></div>
                        <div className="absolute right-6 w-20 h-20 rounded-full border-2 border-dashed border-rose-400 opacity-60"></div>
                        <svg className="w-24 h-20 z-10" viewBox="0 0 60 50">
                          <polygon points="30,8 12,42 48,42" fill="rgba(244, 63, 94, 0.3)" stroke="#e11d48" strokeWidth="3.5" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base text-rose-950 font-black">
                        3 Kenarı da Eşit (a = b = c)
                      </p>
                      <span className="text-xs text-rose-700 font-bold block bg-rose-50 py-1.5 rounded-xl">
                        Çember yarıçapları aynıdır!
                      </span>
                    </div>

                    {/* İkizkenar Üçgen */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-pink-200 space-y-4 text-center shadow-xs">
                      <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-pink-100 text-pink-900 rounded-full inline-block">
                        2. İKİZKENAR ÜÇGEN
                      </span>
                      <div className="h-28 sm:h-32 bg-pink-50/50 rounded-2xl flex items-center justify-center relative">
                        <svg className="w-24 h-20 z-10" viewBox="0 0 60 50">
                          <polygon points="30,4 16,45 44,45" fill="rgba(236, 72, 153, 0.3)" stroke="#db2777" strokeWidth="3.5" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base text-pink-950 font-black">
                        2 Kenarı İkiz Kardeş (Eşit)
                      </p>
                      <span className="text-xs text-pink-700 font-bold block bg-pink-50 py-1.5 rounded-xl">
                        Yalnızca 2 kenar eşittir!
                      </span>
                    </div>

                    {/* Çeşitkenar Üçgen */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-amber-200 space-y-4 text-center shadow-xs">
                      <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-full inline-block">
                        3. ÇEŞİTKENAR ÜÇGEN
                      </span>
                      <div className="h-28 sm:h-32 bg-amber-50/50 rounded-2xl flex items-center justify-center relative">
                        <svg className="w-24 h-20 z-10" viewBox="0 0 60 50">
                          <polygon points="42,6 8,44 54,38" fill="rgba(245, 158, 11, 0.3)" stroke="#d97706" strokeWidth="3.5" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base text-amber-950 font-black">
                        3 Kenarı da Bambaşka Boy
                      </p>
                      <span className="text-xs text-amber-700 font-bold block bg-amber-50 py-1.5 rounded-xl">
                        Farklı pergel açıklığı ile çizilir.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. DİKDÖRTGEN ALANI & BİRİM KARE ÇİKOLATA MODELİ */}
              {activeNode.visualType === 'area_grid' && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-emerald-200 shadow-md space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-xl font-black text-emerald-950 flex items-center gap-2">
                      🍫 Çikolata Tablet &amp; Birim Kare Alan Modeli
                    </h4>
                    <span className="text-xs sm:text-sm font-black text-emerald-800 bg-white px-4 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
                      Satır × Sütun
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-7 rounded-3xl border-2 border-emerald-100 shadow-sm">
                    <div className="space-y-4 flex-1">
                      <div className="text-xl sm:text-2xl font-black text-emerald-950">
                        Dikdörtgen Alanı: 4 cm × 6 cm = 24 cm²
                      </div>
                      <p className="text-sm sm:text-base text-emerald-800 font-medium leading-relaxed">
                        Her küçük kare 1 birim kare (1 cm²) yer kaplar. 24 kareyi tek tek saymak yerine <span className="font-black bg-emerald-100 px-2.5 py-1 rounded-xl text-emerald-900">4 Satır × 6 Sütun = 24 cm²</span> yaparız!
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                          <div className="text-xs sm:text-sm font-black text-emerald-950">🟩 ALAN (Yüzey)</div>
                          <div className="text-xl font-black text-emerald-700 mt-1">24 cm²</div>
                          <div className="text-xs text-emerald-600 font-bold mt-0.5">Odaya Halı Döşemek</div>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                          <div className="text-xs sm:text-sm font-black text-amber-950">🔲 ÇEVRE (Sınır)</div>
                          <div className="text-xl font-black text-amber-700 mt-1">20 cm</div>
                          <div className="text-xs text-amber-600 font-bold mt-0.5">Etrafına Çit Çekmek</div>
                        </div>
                      </div>
                    </div>

                    {/* Big Visual Chocolate Grid */}
                    <div className="bg-amber-900 p-4 rounded-3xl shadow-xl border-4 border-amber-950 shrink-0">
                      <div className="grid grid-cols-6 gap-2 p-1.5 bg-amber-800 rounded-2xl">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="w-10 h-10 bg-amber-600 hover:bg-amber-400 transition-colors border-2 border-amber-500 rounded-lg flex items-center justify-center text-sm font-black text-amber-100 shadow-inner">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-xs font-black text-amber-200 mt-2.5">
                        4 Sıra × 6 Kare = 24 Çikolata Karesi 🍫
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. İSTATİSTİK 4 KATLI BİNA MODELİ */}
              {activeNode.visualType === 'stats_steps' && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-amber-200 shadow-md space-y-6">
                  <h4 className="text-base sm:text-xl font-black text-amber-950 flex items-center gap-2">
                    🏗️ İstatistiki Araştırmanın 4 Katlı Binası
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                    {/* Kat 1 */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 text-center space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md">
                        1
                      </div>
                      <div className="font-black text-sm sm:text-base text-amber-950">Araştırma Sorusu</div>
                      <div className="text-3xl">🎯</div>
                      <p className="text-xs text-amber-800 font-bold">
                        Temeli Atmak: "En sevilen spor ne?"
                      </p>
                    </div>

                    {/* Kat 2 */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-emerald-200 text-center space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md">
                        2
                      </div>
                      <div className="font-black text-sm sm:text-base text-emerald-950">Veri Toplama</div>
                      <div className="text-3xl">🧺</div>
                      <p className="text-xs text-emerald-800 font-bold">
                        Malzemeleri Topla: Anket ve Çetele
                      </p>
                    </div>

                    {/* Kat 3 */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-rose-200 text-center space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-rose-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md">
                        3
                      </div>
                      <div className="font-black text-sm sm:text-base text-rose-950">Görselleştirme</div>
                      <div className="text-3xl">📊</div>
                      <p className="text-xs text-rose-800 font-bold">
                        Binayı İnşa Et: Sütun Grafiği Çiz
                      </p>
                    </div>

                    {/* Kat 4 */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-purple-200 text-center space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md">
                        4
                      </div>
                      <div className="font-black text-sm sm:text-base text-purple-950">Yorumlama</div>
                      <div className="text-3xl">🏆</div>
                      <p className="text-xs text-purple-800 font-bold">
                        Binayı Kullan: Şampiyonu açıkla!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. OLASILIK RENKLİ ZAR & ŞANS OYUNU */}
              {activeNode.visualType === 'probability_dice' && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-purple-200 shadow-md space-y-6">
                  <h4 className="text-base sm:text-xl font-black text-purple-950 flex items-center gap-2">
                    🎲 Zar ve Renkli Kartlarla Olasılık Oyunu
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Zar Durumları */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-purple-200 shadow-xs text-center space-y-4">
                      <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-purple-100 text-purple-900 rounded-full">
                        6 YÜZLÜ ZAR
                      </span>
                      <div className="flex items-center justify-center gap-2 py-1">
                        {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'].map((dice, i) => (
                          <span key={i} className="text-3xl sm:text-4xl text-purple-700 bg-purple-50 p-1.5 rounded-xl border border-purple-200">
                            {dice}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-purple-950 font-bold">
                        Tüm Olası Durumlar = 6 Adet
                      </p>
                    </div>

                    {/* Kesin Olay */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-xs text-center space-y-3">
                      <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-full">
                        🎯 KESİN OLAY (%100)
                      </span>
                      <div className="text-3xl pt-2 font-black text-emerald-700">🌟 Değeri = 1</div>
                      <p className="text-sm text-emerald-950 font-bold">
                        Zarda 7'den küçük sayı gelmesi kesinlikle gerçekleşir!
                      </p>
                    </div>

                    {/* İmkansız Olay */}
                    <div className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-xs text-center space-y-3">
                      <span className="font-black text-xs sm:text-sm px-3.5 py-1.5 bg-rose-100 text-rose-900 rounded-full">
                        🚫 İMKÂNSIZ OLAY (%0)
                      </span>
                      <div className="text-3xl pt-2 font-black text-rose-700">❌ Değeri = 0</div>
                      <p className="text-sm text-rose-950 font-bold">
                        Zarda 9 gelmesi asla mümkün değildir!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. DENGE TERAZİSİ & ELMA KASALARI (CEBİR) */}
              {activeNode.visualType === 'algebra_scale' && (
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-violet-200 shadow-md space-y-6">
                  <h4 className="text-base sm:text-xl font-black text-violet-950 flex items-center gap-2">
                    ⚖️ İki Kefeli Denge Terazisi &amp; Elma Modeli
                  </h4>

                  <div className="bg-white p-7 rounded-3xl border-2 border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm">
                    <div className="space-y-3 flex-1">
                      <div className="text-lg sm:text-2xl font-black text-violet-950">
                        Denge Kuralı: Sol Kefe (x + 2) = Sağ Kefe (7)
                      </div>
                      <p className="text-sm sm:text-base text-violet-800 font-medium leading-relaxed">
                        İki kefeden de 2 elma çıkarırsak terazi DENGEDE kalır ve kutunun içindeki gizli elma sayısı <span className="font-black text-violet-950 bg-violet-100 px-3 py-1 rounded-xl">x = 5</span> bulunur!
                      </p>
                    </div>

                    {/* Animated Scale Diagram */}
                    <div className="flex items-center gap-5 bg-violet-50 p-5 rounded-3xl border-2 border-violet-200 shadow-xs shrink-0">
                      {/* Left Pan */}
                      <div className="text-center space-y-1.5">
                        <div className="px-5 py-2.5 bg-violet-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-sm">
                          🎁 x + 🍎🍎 (2)
                        </div>
                        <span className="text-xs font-black text-violet-600 block">Sol Kefe</span>
                      </div>

                      <div className="text-2xl font-black text-violet-400">⚖️ =</div>

                      {/* Right Pan */}
                      <div className="text-center space-y-1.5">
                        <div className="px-5 py-2.5 bg-emerald-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-sm">
                          🍎🍎🍎🍎🍎🍎🍎 (7)
                        </div>
                        <span className="text-xs font-black text-emerald-600 block">Sağ Kefe</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Concrete Example with Cartoonish Step-by-Step Flow */}
              <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-sm space-y-5">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Lightbulb size={20} className="text-amber-500" />
                  Örnek Soru &amp; Adım Adım Zihin Akışı
                </h4>

                <div className="bg-indigo-50/70 p-6 sm:p-7 rounded-3xl border border-indigo-100 space-y-4">
                  <div className="text-base sm:text-xl font-black text-indigo-950 flex items-center gap-2.5">
                    <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black">SORU</span>
                    {activeNode.example.problem}
                  </div>

                  <div className="space-y-2.5 pl-4 border-l-4 border-indigo-400">
                    {activeNode.example.steps.map((step, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-indigo-950 font-bold">
                        {step}
                      </p>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-indigo-200 text-sm sm:text-base font-black text-emerald-800 flex items-center gap-2.5">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    Doğru Cevap: {activeNode.example.result}
                  </div>
                </div>
              </div>

              {/* Interactive "Hemen Zihninde Dene" Challenge */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-amber-400 font-black text-base sm:text-lg">
                    <Zap size={22} className="fill-current animate-pulse" />
                    Hemen Zihninde Dene! 🎯
                  </div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs sm:text-sm text-indigo-300 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors bg-white/10 px-4 py-2 rounded-xl"
                  >
                    <HelpCircle size={16} /> {showHint ? 'İpucunu Kapat' : 'İpucu İste'}
                  </button>
                </div>

                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-xs border border-white/10">
                  <p className="text-base sm:text-xl font-black text-white leading-relaxed">
                    {activeNode.tryIt.question}
                  </p>
                  {showHint && (
                    <p className="mt-3 text-sm sm:text-base text-amber-200 font-bold bg-amber-500/20 p-4 rounded-2xl border border-amber-500/30">
                      💡 İpucu: {activeNode.tryIt.hint}
                    </p>
                  )}
                </div>

                <form onSubmit={handleTrySubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={userTryInput}
                    onChange={(e) => {
                      setUserTryInput(e.target.value);
                      setTryFeedback(null);
                    }}
                    placeholder="Zihninden bulduğun cevabı buraya yaz..."
                    className="flex-1 bg-white/15 border-2 border-white/20 px-5 py-4 rounded-2xl text-white placeholder-white/50 text-sm sm:text-base font-bold focus:outline-none focus:ring-4 focus:ring-amber-400/30"
                  />
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-4 rounded-2xl text-sm sm:text-base transition-all shadow-lg active:scale-95 cursor-pointer shrink-0"
                  >
                    Kontrol Et ✨
                  </button>
                </form>

                {tryFeedback === 'correct' && (
                  <div className="p-5 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-2xl text-emerald-300 text-sm sm:text-base font-black flex items-center gap-3 animate-in fade-in">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                    Harikasın! Doğru yanıt verdin ve zihin haritasını başarıyla tamamladın! 🌟
                  </div>
                )}

                {tryFeedback === 'wrong' && (
                  <div className="p-5 bg-rose-500/20 border-2 border-rose-500/40 rounded-2xl text-rose-300 text-sm sm:text-base font-black flex items-center gap-3 animate-in fade-in">
                    <HelpCircle size={24} className="text-rose-400" />
                    Tekrar dene veya ipucuna bak! Yukarıdaki renkli resimleri inceleyerek kolayca bulabilirsin.
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
