import { SozelMantikItem } from './sozelMantikTypes';

export const ATOLYE_5_QUESTIONS: SozelMantikItem[] = [
  {
    id: 5001,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 1,
    title: 'Kelime-Sayı Matrisi',
    category: 'Şifre Çözme',
    context: 'Aşağıdaki tabloda bazı kelimeler ve şifreli karşılıkları verilmiştir: KALE = 4135, LALE = 3135, ELMA = 5391, ASLI = 1738.',
    premises: [
      'KALE = 4135 ve LALE = 3135 (K-L farkı ilk rakamdaki 4-3 farkıdır)',
      'L = 3, K = 4, A = 1, E = 5',
      'ELMA = 5391 olduğundan M = 9',
      'ASLI = 1738 olduğundan S = 7 (veya 8)'
    ],
    questionStem: 'Bu mantığa göre “MASA” kelimesinin şifre kodu aşağıdakilerden hangisi olabilir?',
    options: [
      { letter: 'A', text: '9171', isCorrect: true },
      { letter: 'B', text: '9371', isCorrect: false },
      { letter: 'C', text: '4171', isCorrect: false },
      { letter: 'D', text: '5171', isCorrect: false }
    ],
    resultText: '“MASA” kelimesinin kodu 9171’dir (M=9, A=1, S=7, A=1).',
    matrix: {
      title: 'Harf - Rakam Eşleşme Matrisi',
      headers: ['Harf', 'Rakam Değeri', 'Kaynak Kelime', 'Doğrulama'],
      rows: [
        ['L', '3', 'KALE & LALE', 'Ortak harf/rakam'],
        ['K', '4', 'KALE', 'LALE’den farkı'],
        ['A', '1', 'Tüm Kelimeler', 'En sık geçen harf'],
        ['E', '5', 'KALE & ELMA', 'Son / ilk rakam'],
        ['M', '9', 'ELMA', 'Kalan tek rakam'],
        ['S', '7 (veya 8)', 'ASLI', 'Hedef kelimede 7']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Farklılıklar Üzerinden Git', content: 'KALE ve LALE arasındaki fark K ve L’dir. 4135 ve 3135 arasındaki fark ilk rakamdır (K=4, L=3, A=1, E=5).' },
      { step: 2, title: 'Yeni Harf Türetme', content: 'ELMA (5391) kelimesinde E=5, L=3, A=1 bilindiğinden M=9 bulunur.' },
      { step: 3, title: 'Hedef Harfleri Topla', content: 'MASA = M(9) - A(1) - S(7) - A(1).' },
      { step: 4, title: 'Sonuç', content: 'MASA kelimesinin kodu 9171 olur.' }
    ],
    neuralBrake: "Şifreleme sorularında harflerin yerleri bu soruda pozisyonel şifrelemedir; her harfin yeri koduyla aynıdır.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'K=4, L=3, A=1, E=5, M=9, S=7 notunu al.'
  },
  {
    id: 5002,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 2,
    title: 'Sembolik Şekil Şifreleri',
    category: 'Şekil - Sayı Şifreleme',
    context: 'Şekil grupları sayılarla eşleştirilmiştir: (İçi dolu Kare) + (İçi boş Üçgen) + (İçi dolu Daire) = 742; (İçi boş Daire) + (İçi dolu Kare) + (İçi boş Üçgen) = 174; (İçi dolu Üçgen) + (İçi boş Daire) + (İçi dolu Kare) = 617.',
    premises: [
      'İlk iki grupta ortak olan şekiller: İçi dolu Kare ve İçi boş Üçgen. Ortak sayılar: 7 ve 4.',
      'İkinci ve üçüncü grupta ortak olan: İçi boş Daire (1). Dolayısıyla İçi boş Daire = 1.',
      'İçi dolu Kare = 7, İçi boş Üçgen = 4, İçi dolu Daire = 2, İçi dolu Üçgen = 6.'
    ],
    questionStem: 'Buna göre (İçi dolu Daire) + (İçi dolu Üçgen) + (İçi boş Daire) grubunun sayısal karşılığı nedir?',
    options: [
      { letter: 'A', text: '261', isCorrect: true },
      { letter: 'B', text: '741', isCorrect: false },
      { letter: 'C', text: '612', isCorrect: false },
      { letter: 'D', text: '246', isCorrect: false }
    ],
    resultText: 'İstenen şekil grubunun karşılığı 261’dir. (İçi dolu Daire = 2, İçi dolu Üçgen = 6, İçi boş Daire = 1).',
    matrix: {
      title: 'Şekil - Değer Matrisi',
      headers: ['Şekil Türü', 'Sayısal Değeri', 'Analiz / Eşleşme'],
      rows: [
        ['İçi dolu Kare', '7', 'İlk iki grupta ortak ve konumu değişse de sabit'],
        ['İçi boş Üçgen', '4', '742 ve 174 içindeki ortak 4'],
        ['İçi dolu Daire', '2', 'İlk grupta kalan tek şekil (742 -> 2)'],
        ['İçi boş Daire', '1', 'İkinci ve üçüncü grupta ortak olan 1'],
        ['İçi dolu Üçgen', '6', 'Üçüncü grupta kalan tek rakam (617 -> 6)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Ortak Eleman Taraması', content: 'İlk iki denklemden Dolu Kare ve Boş Üçgen = {7, 4}.' },
      { step: 2, title: 'Değer Sabitleme', content: 'İkinci ve üçüncü denklemde ortak olan Boş Daire = 1.' },
      { step: 3, title: 'Bilinmeyenleri Türetme', content: 'Dolu Kare = 7, Boş Üçgen = 4, Dolu Üçgen = 6, Dolu Daire = 2.' },
      { step: 4, title: 'Hedef Şekli İnşa Et', content: 'Dolu Daire (2) + Dolu Üçgen (6) + Boş Daire (1) = 261.' }
    ],
    neuralBrake: "İçinin dolu veya boş olması tamamen farklı bir değişken demektir.",
    cognitiveTime: '25 saniye',
    synapticCoding: 'Şekilleri kağıdın kenarına çizip sayılarını yanına yaz.'
  },
  {
    id: 5003,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 3,
    title: 'Kelime Merdiveni',
    category: 'Kaydırma Algoritması',
    context: 'Kelimeler belirli kurala göre şifrelenmiştir: ANKA → BÖLB, SORU → ŞPSV, MERT → NFSU.',
    premises: [
      'A → B, S → Ş, M → N (her harf alfabede 1 sonraki harfe dönüşür)',
      'N → O, Ö (N’den sonra O, sonra Ö gelir)',
      'Kural: Kelimedeki her harf, Türk alfabesinde kendisinden bir sonraki harf ile yer değiştirir.'
    ],
    questionStem: 'Bu kurala göre “KİTAP” kelimesinin şifrelenmiş hali aşağıdakilerden hangisidir?',
    options: [
      { letter: 'A', text: 'LJUBR', isCorrect: true },
      { letter: 'B', text: 'LITAP', isCorrect: false },
      { letter: 'C', text: 'MJVCS', isCorrect: false },
      { letter: 'D', text: 'LİUBR', isCorrect: false }
    ],
    resultText: '“KİTAP” kelimesinin şifreli karşılığı “LJUBR” olur. (K→L, İ→J, T→U, A→B, P→R).',
    matrix: {
      title: 'Harf İlerleme Matrisi',
      headers: ['Orijinal Harf', 'Alfabe Sırası', 'Sonraki Harf', 'Kural'],
      rows: [
        ['K', '14', 'L', '+1 Harf'],
        ['İ', '12', 'J', '+1 Harf (İ’den sonra J gelir)'],
        ['T', '24', 'U', '+1 Harf'],
        ['A', '1', 'B', '+1 Harf'],
        ['P', '20', 'R', '+1 Harf']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kuralı Çöz', content: 'Her harf alfabedeki bir sonraki harfe dönüşmektedir (+1).' },
      { step: 2, title: 'Sesli Harf Kontrolü', content: 'İ’den sonra gelen harf J’dir (alfabede I, İ, J).' },
      { step: 3, title: 'Harf Harf İlerle', content: 'K→L, İ→J, T→U, A→B, P→R.' },
      { step: 4, title: 'Sonuç', content: 'KİTAP → LJUBR.' }
    ],
    neuralBrake: "Türk alfabesinde İ’den sonra J geldiğini unutma!",
    cognitiveTime: '15 saniye',
    synapticCoding: 'Alfabeyi baştan sayma, sadece ilgili harfin komşusuna bak.'
  },
  {
    id: 5004,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 4,
    title: 'Sayısal Ayna Şifreleme',
    category: 'Yer Değiştirme',
    context: 'Sayı grupları şifreli sayılara dönüştürülmüştür: 2847 → 8274, 6139 → 1693, 5281 → 2518.',
    premises: [
      '4 basamaklı sayılar ikişerli bloklara ayrılır: [28] ve [47].',
      'Birinci grup kendi içinde yer değiştirir: [28] → [82].',
      'İkinci grup kendi içinde yer değiştirir: [47] → [74].',
      'Tüm örnekler bu simetriyi doğrular (61→16, 39→93).'
    ],
    questionStem: 'Bu kurala göre “4762” sayısı hangi şifreli sayıya dönüşür?',
    options: [
      { letter: 'A', text: '7426', isCorrect: true },
      { letter: 'B', text: '2674', isCorrect: false },
      { letter: 'C', text: '7462', isCorrect: false },
      { letter: 'D', text: '6247', isCorrect: false }
    ],
    resultText: '“4762” sayısının şifreli karşılığı 7426’dır. [47] → 74 ve [62] → 26.',
    matrix: {
      title: 'İkili Blok Dönüşüm Matrisi',
      headers: ['Sayı Grubu', '1. Blok', '1. Blok Aynası', '2. Blok', '2. Blok Aynası', 'Sonuç'],
      rows: [
        ['2847', '28', '82', '47', '74', '8274'],
        ['6139', '61', '16', '39', '93', '1693'],
        ['4762', '47', '74', '62', '26', '7426']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Gruplandırma', content: '4762 sayısını [47] ve [62] olarak ikiye ayır.' },
      { step: 2, title: 'Sol Blok Dönüşümü', content: '47 kendi içinde takas edilir: 74.' },
      { step: 3, title: 'Sağ Blok Dönüşümü', content: '62 kendi içinde takas edilir: 26.' },
      { step: 4, title: 'Birleştirme', content: '74 ve 26 yan yana konulur: 7426.' }
    ],
    neuralBrake: "Rakamların toplamına veya çarpımına bakmadan önce mekânsal yer değişimlerini kontrol et.",
    cognitiveTime: '10 saniye',
    synapticCoding: 'İkişerli blok simetrisini uygula.'
  },
  {
    id: 5005,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 5,
    title: 'Kelime İçi Matematik',
    category: 'Hece-Sayı Şifreleme',
    context: 'Kelimeler belirli bir mantığa göre sayılarla eşleştirilmiştir: ARABA → 32, KELEBEK → 34, SİNEMACI → 44, OKUL → 22.',
    premises: [
      'İlk rakam: Kelimedeki hece sayısı (A-RA-BA = 3, Sİ-NE-MA-CI = 4).',
      'İkinci rakam: Kelimedeki sessiz harf sayısı (ARABA -> R, B = 2; KELEBEK -> K, L, B, K = 4).',
      'Formül: Şifre = (Hece Sayısı)(Sessiz Harf Sayısı).'
    ],
    questionStem: 'Bu mantığa göre “KÜTÜPHANE” kelimesinin sayısal karşılığı nedir?',
    options: [
      { letter: 'A', text: '45', isCorrect: true },
      { letter: 'B', text: '44', isCorrect: false },
      { letter: 'C', text: '35', isCorrect: false },
      { letter: 'D', text: '54', isCorrect: false }
    ],
    resultText: '“KÜTÜPHANE” kelimesinin sayısal karşılığı 45’tir (4 hece: KÜ-TÜP-HA-NE, 5 sessiz harf: K, T, P, H, N).',
    matrix: {
      title: 'Hece ve Sessiz Harf Analiz Matrisi',
      headers: ['Kelime', 'Hecelenmiş Hali', 'Hece Sayısı (1. Rakam)', 'Sessiz Harfler', 'Sessiz Sayısı (2. Rakam)', 'Kod'],
      rows: [
        ['ARABA', 'A-RA-BA', '3', 'R, B', '2', '32'],
        ['KELEBEK', 'KE-LE-BEK', '3', 'K, L, B, K', '4', '34'],
        ['KÜTÜPHANE', 'KÜ-TÜP-HA-NE', '4', 'K, T, P, H, N', '5', '45']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Heceleme', content: 'KÜ-TÜP-HA-NE (4 hece). İlk rakam 4.' },
      { step: 2, title: 'Sessiz Harf Sayımı', content: 'K, T, P, H, N (5 sessiz harf). İkinci rakam 5.' },
      { step: 3, title: 'Birleştirme', content: 'İlk rakam 4, ikinci rakam 5: 45.' },
      { step: 4, title: 'Sonuç', content: 'KÜTÜPHANE = 45.' }
    ],
    neuralBrake: "Toplam harf sayısı yanıltabilir; hece ve sessiz harfleri ayrı say.",
    cognitiveTime: '10 saniye',
    synapticCoding: 'Şifre = (Hece Sayısı)(Sessiz Harf Sayısı).'
  },
  {
    id: 5006,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 6,
    title: 'Mantıksal Kapılar',
    category: 'Algoritma Şifreleme',
    context: 'Bir yazılım girilen 4 harfli kelimeleri 3 kurala göre işlemektedir: 1. Kapı: 1. harf ile 4. harfin yerini değiştirir. 2. Kapı: Tüm sesli harfleri alfabede kendisinden sonraki harfe dönüştürür. 3. Kapı: 2. harfi siler.',
    premises: [
      '1. Kapı: 1 ve 4 yer değişir.',
      '2. Kapı: Sesliler +1 harfe dönüşür (I -> İ, A -> B).',
      '3. Kapı: 2. harf silinir.'
    ],
    questionStem: 'Programa giriş olarak “ASLI” yazılırsa, üç kapıdan geçtikten sonra çıkış panelinde ne görünür?',
    options: [
      { letter: 'A', text: 'İLB', isCorrect: true },
      { letter: 'B', text: 'SLI', isCorrect: false },
      { letter: 'C', text: 'İSB', isCorrect: false },
      { letter: 'D', text: 'LBA', isCorrect: false }
    ],
    resultText: 'Programın çıkış panelinde “İLB” ifadesi görünür. Giriş: ASLI → 1. Kapı: ISLA → 2. Kapı: İSLB → 3. Kapı: İLB.',
    matrix: {
      title: 'Algoritma Kapıları Adım Matrisi',
      headers: ['İşlem Adımı', 'Girdi', 'Uygulanan İşlem', 'Çıktı'],
      rows: [
        ['Giriş', 'ASLI', 'Başlangıç', 'ASLI'],
        ['1. Kapı', 'ASLI', '1. ve 4. harf takas (A ↔ I)', 'ISLA'],
        ['2. Kapı', 'ISLA', 'Seslileri 1 ileri kaydır (I→İ, A→B)', 'İSLB'],
        ['3. Kapı', 'İSLB', '2. harfi (S) sil', 'İLB']
      ]
    },
    solutionSteps: [
      { step: 1, title: '1. Kapı (Yer Değiştirme)', content: 'A ve I takas edilir: ISLA.' },
      { step: 2, title: '2. Kapı (Dönüştürme)', content: 'Sesli harfler I ve A bir ileri kaydırılır: I→İ, A→B. Kelime: İSLB.' },
      { step: 3, title: '3. Kapı (Eksiltme)', content: '2. harf olan S silinir: İLB.' },
      { step: 4, title: 'Sonuç', content: 'Çıkış paneli: İLB.' }
    ],
    neuralBrake: "2. Kapı'da I harfi İ olur, A harfi B olur; sadece sesli harfler arasında döngü değildir.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Her kapıdan sonraki kelimeyi alt alta yaz.'
  },
  {
    id: 5007,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 7,
    title: 'Sayısal Mantık Labirenti',
    category: 'Hareket Şifreleri',
    context: 'Bir robot (0,0) noktasından 4 haneli kodlara göre hareket eder: 1. rakam Kuzey (+y), 2. rakam Güney (-y), 3. rakam Doğu (+x), 4. rakam Batı (-x).',
    premises: [
      '1. Komut: 4125 -> Kuzey: 4, Güney: 1, Doğu: 2, Batı: 5.',
      '2. Komut: 2361 -> Kuzey: 2, Güney: 3, Doğu: 6, Batı: 1.'
    ],
    questionStem: 'Robot sırasıyla “4125” ve “2361” komutlarını alırsa ulaştığı “son koordinat” nedir?',
    options: [
      { letter: 'A', text: '(+2, +2)', isCorrect: true },
      { letter: 'B', text: '(+3, +1)', isCorrect: false },
      { letter: 'C', text: '(+4, +2)', isCorrect: false },
      { letter: 'D', text: '(0, +2)', isCorrect: false }
    ],
    resultText: 'Robotun ulaştığı son koordinat (+2, +2) noktasıdır.',
    matrix: {
      title: 'Koordinat Eksen Toplam Matrisi',
      headers: ['Yön', 'Eksen', '1. Komut (4125)', '2. Komut (2361)', 'Net Değişim'],
      rows: [
        ['Kuzey (+y)', 'y', '4', '2', '+6'],
        ['Güney (-y)', 'y', '1', '3', '-4 -> Net y = +2'],
        ['Doğu (+x)', 'x', '2', '6', '+8'],
        ['Batı (-x)', 'x', '5', '1', '-6 -> Net x = +2']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Dikey Hareket (y)', content: 'Kuzey: 4 + 2 = 6, Güney: 1 + 3 = 4. Net y: 6 - 4 = +2.' },
      { step: 2, title: 'Yatay Hareket (x)', content: 'Doğu: 2 + 6 = 8, Batı: 5 + 1 = 6. Net x: 8 - 6 = +2.' },
      { step: 3, title: 'Koordinat Eşleştirme', content: '(x, y) = (+2, +2).' },
      { step: 4, title: 'Sonuç', content: 'Ulaşılan son koordinat (+2, +2) noktasıdır.' }
    ],
    neuralBrake: "Kuzey-Güney farkı y eksenini, Doğu-Batı farkı x eksenini verir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'X = (Doğu - Batı), Y = (Kuzey - Güney).'
  },
  {
    id: 5008,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 8,
    title: 'Kromatik Mantık',
    category: 'Renk Şifreleri',
    context: 'Renkler (Kırmızı - Mavi - Sarı) 3 haneli kodla tanımlanır. Karıştırma: haneler toplanır, 9’u geçerse birler basamağı yazılır. Parlatma: tüm rakamlar 1 artırılır (9 olan 0 olur).',
    premises: [
      'Girdi kodu: 352.',
      'Karıştırılacak kod: 416.',
      'Karıştırma sonucu: (3+4), (5+1), (2+6) = 768.',
      'Parlatma işlemi: her rakam +1 artırılır.'
    ],
    questionStem: '“352” kodu önce “416” ile karıştırılıp ardından “parlatılırsa” son kod ne olur?',
    options: [
      { letter: 'A', text: '879', isCorrect: true },
      { letter: 'B', text: '768', isCorrect: false },
      { letter: 'C', text: '980', isCorrect: false },
      { letter: 'D', text: '869', isCorrect: false }
    ],
    resultText: 'İşlemler tamamlandığında son renk kodu “879” olur. Karıştırma: 768 → Parlatma (+1): 879.',
    matrix: {
      title: 'Kromatik İşlem Adımları',
      headers: ['İşlem Adımı', 'Kırmızı (K)', 'Mavi (M)', 'Sarı (S)', 'Sonuç Kodu'],
      rows: [
        ['Başlangıç', '3', '5', '2', '352'],
        ['1. Karıştırma (+416)', '3 + 4 = 7', '5 + 1 = 6', '2 + 6 = 8', '768'],
        ['2. Parlatma (+1)', '7 + 1 = 8', '6 + 1 = 7', '8 + 1 = 9', '879']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Toplama İşlemi', content: '352 + 416 = 768.' },
      { step: 2, title: 'Kural Kontrolü', content: 'Hiçbir basamak 9’u geçmedi.' },
      { step: 3, title: 'Parlatma', content: '7→8, 6→7, 8→9 = 879.' },
      { step: 4, title: 'Sonuç', content: 'Son kod: 879.' }
    ],
    neuralBrake: "9+1 durumunda sonucun 0 olacağını unutma; sınır değerlere dikkat et.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Her haneyi (K-M-S) ayrı sütun gibi düşün.'
  },
  {
    id: 5009,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 9,
    title: 'Kelime Piramidi',
    category: 'Eksiltme Şifreleri',
    context: 'Şifreleme sistemi kelimeleri şu kurallara göre budamaktadır: 1. Adım: Tam ortadaki harfi siler (harf çiftse ortadaki iki harften soldakini siler). 2. Adım: Başındaki ve sonundaki harfleri siler. 3. Adım: Kalan harfleri ters çevirir.',
    premises: [
      'Girdi: “STRATEJİ” (8 harf).',
      'Ortadaki iki harf: T (4.) ve E (5.). Soldaki “T” silinir → STRAEJİ.',
      'Baş (S) ve son (İ) silinir → TRAE.',
      'Harfler ters çevrilir → EART.'
    ],
    questionStem: 'Sisteme “STRATEJİ” kelimesi girilirse 3. adımın sonunda elde edilen “nihai şifre” ne olur?',
    options: [
      { letter: 'A', text: 'EART', isCorrect: true },
      { letter: 'B', text: 'TRAE', isCorrect: false },
      { letter: 'C', text: 'RATE', isCorrect: false },
      { letter: 'D', text: 'ETAR', isCorrect: false }
    ],
    resultText: '“STRATEJİ” kelimesinin piramit sistemindeki nihai şifresi “EART” olur.',
    matrix: {
      title: 'Piramit Budama Matrisi',
      headers: ['İşlem Adımı', 'Mevcut Kelime', 'Uygulanan İşlem', 'Kalan Parça'],
      rows: [
        ['Giriş', 'STRATEJİ', 'Başlangıç (8 harf)', 'STRATEJİ'],
        ['1. Adım', 'STRATEJİ', 'Ortadaki soldaki (T) silinir', 'STRAEJİ'],
        ['2. Adım', 'STRAEJİ', 'Baş (S) ve Son (İ) silinir', 'TRAE'],
        ['3. Adım', 'TRAE', 'Ters çevirme', 'EART']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Orta Nokta Tespiti', content: '8 harfli STRATEJİ kelimesinde 4. harf T, 5. harf E’dir. Soldaki T atılır: STRAEJİ.' },
      { step: 2, title: 'Uçları Budama', content: 'En baştaki S ve en sondaki İ harfi silinir: TRAE.' },
      { step: 3, title: 'Simetrik Dönüşüm', content: 'T-R-A-E tersten yazılır: E-A-R-T.' },
      { step: 4, title: 'Sonuç', content: 'Nihai şifre: EART.' }
    ],
    neuralBrake: "Çift sayıda harfte 'soldakini sil' talimatı şifrenin kaderini belirler.",
    cognitiveTime: '15 saniye',
    synapticCoding: 'Kelimeleri yeniden yazmak yerine üzerini çiz.'
  },
  {
    id: 5010,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 10,
    title: 'Mantıksal Matris',
    category: 'Şifreli Tablolar',
    context: 'Harfler satır (1, 2, 3) ve sütun (★, ●, ▲) ile kodlanır. Kural: Önce sütun sembolü, ardından satır numarası yazılır. Tablo: ★1=A, ●1=B, ▲1=C, ★2=D, ●2=E, ▲2=F, ★3=G, ●3=H.',
    premises: [
      'Kod: ●2▲1●3.',
      '●2: ● sütunu, 2. satır = E.',
      '▲1: ▲ sütunu, 1. satır = C.',
      '●3: ● sütunu, 3. satır = H.'
    ],
    questionStem: '“●2▲1●3” şeklinde şifrelenmiş olan kelime nedir?',
    options: [
      { letter: 'A', text: 'ECH', isCorrect: true },
      { letter: 'B', text: 'ECE', isCorrect: false },
      { letter: 'C', text: 'ACH', isCorrect: false },
      { letter: 'D', text: 'ECA', isCorrect: false }
    ],
    resultText: 'Şifrelenmiş olan kelime “ECH” olarak çözülür.',
    matrix: {
      title: 'Matris Çözümleme Tablosu',
      headers: ['Kod Parçası', 'Sütun (Sembol)', 'Satır (Rakam)', 'Harf Karşılığı'],
      rows: [
        ['●2', '●', '2', 'E'],
        ['▲1', '▲', '1', 'C'],
        ['●3', '●', '3', 'H']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Şifreyi Gruplandır', content: '(●2), (▲1) ve (●3).' },
      { step: 2, title: 'İlk Harf', content: '● sütunu 2. satır = E.' },
      { step: 3, title: 'İkinci Harf', content: '▲ sütunu 1. satır = C.' },
      { step: 4, title: 'Üçüncü Harf', content: '● sütunu 3. satır = H. Kelime: ECH.' }
    ],
    neuralBrake: "Kural 'sütun + satır'dır; ters okuma yaparsan yanlış harfe ulaşırsın.",
    cognitiveTime: '10 saniye',
    synapticCoding: 'Harf = f(Sütun, Satır).'
  },
  {
    id: 5011,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 11,
    title: 'Sesli Harf Frekansı',
    category: 'Sayısal Ağırlık',
    context: 'Kelimelerin değeri içindeki sesli harflerin alfabe sıra numaraları toplamıdır. A:1, E:6, I:11, İ:12, O:18, Ö:19, U:25, Ü:26.',
    premises: [
      'ADA = 1 + 1 = 2',
      'KELE = 6 + 6 = 12',
      'OKUL = 18 + 25 = 43'
    ],
    questionStem: 'Bu mantığa göre “KÜTÜPHANE” kelimesinin şifre değeri kaçtır?',
    options: [
      { letter: 'A', text: '59', isCorrect: true },
      { letter: 'B', text: '53', isCorrect: false },
      { letter: 'C', text: '65', isCorrect: false },
      { letter: 'D', text: '48', isCorrect: false }
    ],
    resultText: '“KÜTÜPHANE” kelimesinin şifre değeri 59’dur (Ü:26 + Ü:26 + A:1 + E:6 = 59).',
    matrix: {
      title: 'Sesli Harf Değer Matrisi',
      headers: ['Kelime', 'Sesli Harfler', 'Harf Değerleri', 'Toplam Değer'],
      rows: [
        ['ADA', 'A, A', '1 + 1', '2'],
        ['KELE', 'E, E', '6 + 6', '12'],
        ['OKUL', 'O, U', '18 + 25', '43'],
        ['KÜTÜPHANE', 'Ü, Ü, A, E', '26 + 26 + 1 + 6', '59']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Sesli Harf Tespiti', content: 'KÜTÜPHANE kelimesindeki sesli harfler: Ü, Ü, A, E.' },
      { step: 2, title: 'Değerleri Ata', content: 'Ü = 26, A = 1, E = 6.' },
      { step: 3, title: 'Topla', content: '26 + 26 = 52; 52 + 1 = 53; 53 + 6 = 59.' },
      { step: 4, title: 'Sonuç', content: 'Değer: 59.' }
    ],
    neuralBrake: "Sessiz harfleri kesinlikle hesaba katma; sadece sesli harflere odaklan.",
    cognitiveTime: '10 saniye',
    synapticCoding: 'Aynı harfleri çarp: 2 x 26 = 52.'
  },
  {
    id: 5012,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 12,
    title: 'Zincirleme Mantık',
    category: 'Harf Bağlantısı',
    context: 'Birinci kelimenin son iki harfi ile ikinci kelimenin ilk iki harfi incelenir: Tam aynısıysa +2, simetriği (tersi) ise +1, bağlantı yoksa 0 puan.',
    premises: [
      'Zincir: “KASSA” → “SARAY” → “YARIN” → “IRAK”.',
      'KASSA (SA) - SARAY (SA): Tam aynı (+2 puan).',
      'SARAY (AY) - YARIN (YA): Birbirinin tersi (+1 puan).',
      'YARIN (IN) - IRAK (IR): Bağlantı yok (0 puan).'
    ],
    questionStem: 'Aşağıdaki zincirin toplam kodu kaçtır? “KASSA” → “SARAY” → “YARIN” → “IRAK”',
    options: [
      { letter: 'A', text: '3', isCorrect: true },
      { letter: 'B', text: '4', isCorrect: false },
      { letter: 'C', text: '5', isCorrect: false },
      { letter: 'D', text: '2', isCorrect: false }
    ],
    resultText: 'Bu kelime zincirinin toplam kodu 3’tür (2 + 1 + 0 = 3).',
    matrix: {
      title: 'Geçiş Noktaları Analiz Matrisi',
      headers: ['Bağlantı Noktası', '1. Kelime Sonu', '2. Kelime Başı', 'İlişki Türü', 'Puan'],
      rows: [
        ['KASSA - SARAY', 'SA', 'SA', 'Tam Uyum', '+2'],
        ['SARAY - YARIN', 'AY', 'YA', 'Simetrik (Ters)', '+1'],
        ['YARIN - IRAK', 'IN', 'IR', 'Bağlantı Yok', '0'],
        ['TOPLAM SKOR', '-', '-', '-', '3']
      ]
    },
    solutionSteps: [
      { step: 1, title: '1. Eklem', content: 'KASSA (SA) ve SARAY (SA) tam aynı: 2 puan.' },
      { step: 2, title: '2. Eklem', content: 'SARAY (AY) ve YARIN (YA) simetrik: 1 puan.' },
      { step: 3, title: '3. Eklem', content: 'YARIN (IN) ve IRAK (IR) eşleşmiyor: 0 puan.' },
      { step: 4, title: 'Toplam', content: '2 + 1 + 0 = 3.' }
    ],
    neuralBrake: "Hece değil 2 harfli grup önemlidir; kelime ortasını okumadan uçlara bak.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'SA-SA (+2), AY-YA (+1), IN-IR (0).'
  },
  {
    id: 5013,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 13,
    title: 'Sözlük Sıralaması ve Artış Katsayısı',
    category: 'Alfabetik Sıra ve Değer',
    context: 'Kelimeler sözlük sırasına dizilir. 1. sıradaki kelimenin değeri harf sayısı x 1, 2. sıradaki x 2, 3. sıradaki x 3, 4. sıradaki x 4’tür.',
    premises: [
      'Kelimeler: “KALEM”, “ASKI”, “MASA”, “ELMA”.',
      'Sözlük sırası: 1-ASKI, 2-ELMA, 3-KALEM, 4-MASA.',
      'MASA 4. sıradadır.',
      'MASA’nın harf sayısı 4’tür.'
    ],
    questionStem: 'Bu sistemde “MASA” kelimesinin şifre değeri kaçtır?',
    options: [
      { letter: 'A', text: '16', isCorrect: true },
      { letter: 'B', text: '12', isCorrect: false },
      { letter: 'C', text: '20', isCorrect: false },
      { letter: 'D', text: '8', isCorrect: false }
    ],
    resultText: '“MASA” kelimesinin şifre değeri 16’dır (4 harf × 4. sıra = 16).',
    matrix: {
      title: 'Sözlük Rafı ve Katsayı Matrisi',
      headers: ['Sözlük Sırası', 'Kelime', 'Harf Sayısı', 'Çarpan (Sıra No)', 'Değer'],
      rows: [
        ['1', 'ASKI', '4', '× 1', '4'],
        ['2', 'ELMA', '4', '× 2', '8'],
        ['3', 'KALEM', '5', '× 3', '15'],
        ['4', 'MASA', '4', '× 4', '16']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Alfabetik Sıralama', content: 'A (ASKI) - E (ELMA) - K (KALEM) - M (MASA).' },
      { step: 2, title: 'Hedef Kelime Sırası', content: 'MASA 4. sıradadır.' },
      { step: 3, title: 'Harf Sayısı', content: 'MASA 4 harflidir.' },
      { step: 4, title: 'Hesaplama', content: '4 harf x 4. sıra = 16.' }
    ],
    neuralBrake: "MASA'nın harf sayısı ile sırasının aynı olması tesadüftür; her zaman kuralın tanımına sadık kal.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Değer = Harf Sayısı x Sıra No.'
  },
  {
    id: 5014,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 14,
    title: 'Zıtlıklar Şifresi',
    category: 'Alfabenin Tersinden Eşleşme',
    context: 'Alfabenin başındaki harfler sondakilerle simetriktir. Türk alfabesi 29 harftir. Simetri kuralı: Sıra No + Zıt Sıra No = 30.',
    premises: [
      'A (1) ↔ Z (29)',
      'B (2) ↔ Y (28)',
      'F (7) için: 30 - 7 = 23 -> Ü',
      'E (6) için: 30 - 6 = 24 -> V',
      'Z (29) -> A (1)',
      'A (1) -> Z (29)'
    ],
    questionStem: 'Bu mantığa göre “FEZA” kelimesinin şifrelenmiş hali aşağıdakilerden hangisidir?',
    options: [
      { letter: 'A', text: 'ÜVAZ', isCorrect: true },
      { letter: 'B', text: 'ÜYAZ', isCorrect: false },
      { letter: 'C', text: 'VÜAZ', isCorrect: false },
      { letter: 'D', text: 'ÜVAŞ', isCorrect: false }
    ],
    resultText: '“FEZA” kelimesinin şifreli karşılığı “ÜVAZ”dır.',
    matrix: {
      title: 'U Simetri Matrisi',
      headers: ['Kelime Harfi', 'Alfabe Sırası (Düz)', 'Zıt Sıra (30 - No)', 'Şifre Karşılığı'],
      rows: [
        ['F', '7', '23', 'Ü'],
        ['E', '6', '24', 'V'],
        ['Z', '29', '1', 'A'],
        ['A', '1', '29', 'Z']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Simetri Kuralı', content: 'Sıra + Zıt Sıra = 30.' },
      { step: 2, title: 'F ve E Harfleri', content: 'F (7) -> 23 (Ü). E (6) -> 24 (V).' },
      { step: 3, title: 'Z ve A Harfleri', content: 'Z (29) -> 1 (A). A (1) -> 29 (Z).' },
      { step: 4, title: 'Birleştirme', content: 'Ü - V - A - Z.' }
    ],
    neuralBrake: "Alfabeyi tersten saymak yerine 30 - Sıra No formülünü kullan.",
    cognitiveTime: '15 saniye',
    synapticCoding: 'Zıt = 30 - n.'
  },
  {
    id: 5015,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 15,
    title: 'Ünlü-Ünsüz Yer Değişimi',
    category: 'Fonetik Şifreleme',
    context: '1. Ünlü Kuralı: Tüm ünlüler kendi aralarında sağa doğru bir pozisyon kayar (en sondaki başa döner). 2. Ünsüz Kuralı: Tüm ünsüzler alfabede kendisinden hemen önceki ünsüze dönüşür (K’den önceki ünsüz J, R’den önceki ünsüz P).',
    premises: [
      'Kelime: “KARE”.',
      'Ünlüler: {A, E} -> sağa kayınca E başa, A sona gelir: [E, A].',
      'Ünsüzler: K → J, R → P.'
    ],
    questionStem: 'Bu algoritmaya göre “KARE” kelimesinin şifrelenmiş hali nedir?',
    options: [
      { letter: 'A', text: 'JEPA', isCorrect: true },
      { letter: 'B', text: 'JAPE', isCorrect: false },
      { letter: 'C', text: 'KEPA', isCorrect: false },
      { letter: 'D', text: 'JERA', isCorrect: false }
    ],
    resultText: '“KARE” kelimesinin şifreli hali “JEPA” olur. 1: J (K yerine), 2: E (A yerine), 3: P (R yerine), 4: A (E yerine).',
    matrix: {
      title: 'Fonetik Katman Matrisi',
      headers: ['Pozisyon', 'Orijinal Harf', 'Tür', 'Dönüşüm Kuralı', 'Yeni Harf'],
      rows: [
        ['1', 'K', 'Ünsüz', 'Bir önceki ünsüz (K ↔ J)', 'J'],
        ['2', 'A', 'Ünlü', 'Ünlü rotasyonu (E başa gelir)', 'E'],
        ['3', 'R', 'Ünsüz', 'Bir önceki ünsüz (R ↔ P)', 'P'],
        ['4', 'E', 'Ünlü', 'Ünlü rotasyonu (A sona gelir)', 'A']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Harf Ayrıştırma', content: 'Ünsüzler {K, R}, Ünlüler {A, E}.' },
      { step: 2, title: 'Ünlülerin Rotasyonu', content: 'A ve E sağa kayar: E başa, A sona geçer (E - A).' },
      { step: 3, title: 'Ünsüzlerin Dönüşümü', content: 'K → J, R → P.' },
      { step: 4, title: 'Yeniden İnşa', content: 'Ünsüz1 Ünlü1 Ünsüz2 Ünlü2 = J E P A.' }
    ],
    neuralBrake: "Ünlü ve ünsüz kurallarını iki farklı katman gibi düşün, birbirine karıştırma.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Önce ünlüleri sonra ünsüzleri yerleştir.'
  },
  {
    id: 5016,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 16,
    title: 'Kuyruk Soruları ve Sıralama Mantığı',
    category: 'Kuyruk Mantığı',
    context: 'Bir bilet kuyruğunda bekleyen Arda, Burcu ve Can ile ilgili bilgiler verilmiştir.',
    premises: [
      'Arda, baştan 7. sıradadır.',
      'Burcu, sondan 5. sıradadır.',
      'Can, tam olarak Arda ile Burcu’nun ortasındadır.',
      'Arda ile Burcu arasında 3 kişi vardır ve Burcu, Arda’nın daha gerisindedir.'
    ],
    questionStem: 'Bu bilet kuyruğunda toplam kaç kişi vardır?',
    options: [
      { letter: 'A', text: '15 kişi', isCorrect: true },
      { letter: 'B', text: '14 kişi', isCorrect: false },
      { letter: 'C', text: '16 kişi', isCorrect: false },
      { letter: 'D', text: '13 kişi', isCorrect: false }
    ],
    resultText: 'Kuyrukta toplam 15 kişi vardır. Arda baştan 7, arada 3 kişi, Burcu baştan 11. Burcu sondan 5. ise arkasında 4 kişi vardır: 11 + 4 = 15.',
    matrix: {
      title: 'Sayı Doğrusu Kuyruk Matrisi',
      headers: ['Segment', 'Kişi / Aralık', 'Kişi Sayısı', 'Kümülatif Sıra'],
      rows: [
        ['Ön Kısım', 'Arda dahil', '7 kişi', '1 - 7'],
        ['Ara Bölge', 'Arda-Burcu arası', '3 kişi', '8 - 10'],
        ['Burcu', 'Burcu kendisi', '1 kişi', '11. sıra (Baştan)'],
        ['Arka Kısım', 'Burcu’dan sonra', '4 kişi (Sondan 5. ise)', '12 - 15'],
        ['TOPLAM', 'Tüm Kuyruk', '15 kişi', '15']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Referans Noktası', content: 'Arda baştan 7. sıradadır (7 kişi).' },
      { step: 2, title: 'Boşlukları Doldurma', content: 'Arda’dan sonraki 3 kişi eklenir: 7 + 3 = 10.' },
      { step: 3, title: 'İkinci Kişi', content: 'Burcu eklenir: 10 + 1 = 11. Burcu baştan 11. sıradadır.' },
      { step: 4, title: 'Final Toplamı', content: 'Burcu sondan 5. ise arkasında 4 kişi vardır: 11 + 4 = 15.' }
    ],
    neuralBrake: "Burcu sondan 5. demek arkasında 5 değil 4 kişi var demektir (Burcu kendisi 5. sıradır).",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Toplam = Baştan Sıra + Sondan Sıra - 1 = 11 + 5 - 1 = 15.'
  },
  {
    id: 5017,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 17,
    title: 'Dijital Saat ve Yansıma Mantığı',
    category: 'Ayna ve Simetri',
    context: 'Dijital saat aynaya yansıtılmaktadır. 0, 1 ve 8 aynada kendisi gibi görünür; 2 rakamı 5, 5 rakamı 2 olarak görünür. Format SS:DD şeklindedir.',
    premises: [
      'Orijinal saat: “12:50”.',
      '1 aynada yine 1’dir.',
      '2 aynada 5’e dönüşür.',
      '5 aynada 2’ye dönüşür.',
      '0 aynada yine 0’dır.'
    ],
    questionStem: 'Dijital saat “12:50”yi gösterirken bu saatin ayna yansıması olan “şifreli saat” nedir?',
    options: [
      { letter: 'A', text: '15:20', isCorrect: true },
      { letter: 'B', text: '12:50', isCorrect: false },
      { letter: 'C', text: '05:21', isCorrect: false },
      { letter: 'D', text: '51:02', isCorrect: false }
    ],
    resultText: '“12:50” saatinin ayna yansıması olan şifreli saat “15:20”dir.',
    matrix: {
      title: 'Dijital Rakam Ayna Matrisi',
      headers: ['Orijinal Rakam', 'Pozisyon', 'Ayna Kuralı', 'Yansıma Sonucu'],
      rows: [
        ['1', '1. Rakam (Saat onlar)', 'Kendisi', '1'],
        ['2', '2. Rakam (Saat birler)', '2 ↔ 5', '5'],
        ['5', '3. Rakam (Dakika onlar)', '5 ↔ 2', '2'],
        ['0', '4. Rakam (Dakika birler)', 'Kendisi', '0']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Rakamları Ayır', content: '1, 2, 5, 0.' },
      { step: 2, title: 'Değişmezleri Belirle', content: '1 ve 0 aynı kalır.' },
      { step: 3, title: 'Dönüşümleri Uygula', content: '2 -> 5, 5 -> 2 olur.' },
      { step: 4, title: 'Blokları Birleştir', content: 'Saat: 15, Dakika: 20 -> 15:20.' }
    ],
    neuralBrake: "Saat ve dakika blokları yer değiştirmez, kural tanımlandığı şekilde rakam bazında aynalanır.",
    cognitiveTime: '15 saniye',
    synapticCoding: '1->1, 2->5, 5->2, 0->0.'
  },
  {
    id: 5018,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 18,
    title: 'Kelime Çarkı ve Açısal Kaydırma',
    category: 'Açısal Döngü',
    context: '8 harfli çark (A-B-C-D-E-F-G-H) her adımda 45 derece döner. Başlangıçta ok “A” harfindedir. Saat yönü geriye (H, G, F...), saat yönünün tersi ileriye (B, C, D...) gider.',
    premises: [
      'Her harf arası 360 / 8 = 45 derecedir.',
      '1. Hareket: Saat yönünün tersine 90 derece (90/45 = 2 harf ileri) -> B(1), C(2). İlk harf: C.',
      '2. Hareket: C noktasından saat yönünde 135 derece (135/45 = 3 harf geri) -> B(1), A(2), H(3). İkinci harf: H.'
    ],
    questionStem: 'Çark önce saat yönünün tersine 90 derece, ardından saat yönünde 135 derece döndürülürse okun gösterdiği harfler sırasıyla hangi heceyi oluşturur?',
    options: [
      { letter: 'A', text: 'CH', isCorrect: true },
      { letter: 'B', text: 'CG', isCorrect: false },
      { letter: 'C', text: 'BH', isCorrect: false },
      { letter: 'D', text: 'DH', isCorrect: false }
    ],
    resultText: 'Okun gösterdiği harfler sırasıyla “CH” ifadesini oluşturur.',
    matrix: {
      title: 'Açısal Adım ve Konum Matrisi',
      headers: ['Adım', 'Açı & Yön', 'Birim Adım (45°)', 'Yön Etkisi', 'Ulaşılan Harf'],
      rows: [
        ['Başlangıç', '0°', '0', '-', 'A'],
        ['1. Hareket', 'Tersine 90°', '2 Adım', 'İleri (B, C)', 'C'],
        ['2. Hareket', 'Saat yönünde 135°', '3 Adım', 'Geri (B, A, H)', 'H'],
        ['BİRLEŞİM', '-', '-', '-', 'CH']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Birim Değeri Belirle', content: '360 / 8 = 45 derece (her 45 derece = 1 harf).' },
      { step: 2, title: 'İlk Pozisyon', content: 'Saat yönünün tersine 90 derece = 2 harf ileri -> A’dan sonra B, C (İlk harf C).' },
      { step: 3, title: 'İkinci Pozisyon', content: 'C’den saat yönünde 135 derece = 3 harf geri -> B, A, H (İkinci harf H).' },
      { step: 4, title: 'Sonuç', content: 'Kod: CH.' }
    ],
    neuralBrake: "Saat yönü ile tersi hareketlerinin ileri/geri yönlerini öncüle göre kontrol et.",
    cognitiveTime: '20 saniye',
    synapticCoding: '90/45 = 2 ileri (C), 135/45 = 3 geri (H).'
  },
  {
    id: 5019,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 19,
    title: 'Kriptografik Paragraf',
    category: 'Gizli Mesaj Analizi',
    context: '“3-1-2-1 kodlu operasyon için GÜNEŞ kelimesini (+2) anahtarıyla şifreleyin. Ardından oluşan kelimenin sadece sessiz harflerini alarak sonuna operasyonun toplam sayısal değerini ekleyin.”',
    premises: [
      '(+2) Anahtarı: G+2=İ, Ü+2=Y, N+2=P, E+2=G, Ş+2=A -> İYPG A.',
      'Sessiz Harf Filtresi: İYPG A içindeki sesliler (İ, A) atılır -> Y, P, G.',
      'Sayısal Değer: 3 + 1 + 2 + 1 = 7.'
    ],
    questionStem: 'Bu talimatlara göre oluşturulacak olan “Final Şifresi” aşağıdakilerden hangisidir?',
    options: [
      { letter: 'A', text: 'YPG7', isCorrect: true },
      { letter: 'B', text: 'İYPG7', isCorrect: false },
      { letter: 'C', text: 'YPG3121', isCorrect: false },
      { letter: 'D', text: 'YPGA7', isCorrect: false }
    ],
    resultText: 'Raporun istediği final şifresi “YPG7”dir.',
    matrix: {
      title: 'Kriptografik Akış Matrisi',
      headers: ['İşlem Adımı', 'Girdi', 'Uygulanan Mantık', 'Çıktı'],
      rows: [
        ['1. Kaydırma', 'GÜNEŞ', 'Her harfi 2 ileri kaydır', 'İYPG A'],
        ['2. Ayıklama', 'İYPG A', 'Sadece sessiz harfleri tut', 'YPG'],
        ['3. Matematik', '3-1-2-1', 'Rakamları topla (3+1+2+1)', '7'],
        ['4. Birleştirme', 'YPG ve 7', 'Metin ve sayıyı ekle', 'YPG7']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Metin Dönüşümü', content: 'GÜNEŞ (+2) -> İ, Y, P, G, A (İYPG A).' },
      { step: 2, title: 'Filtreleme', content: 'Sesli harfler İ ve A atılır -> Y, P, G.' },
      { step: 3, title: 'Kod Hesaplama', content: '3 + 1 + 2 + 1 = 7.' },
      { step: 4, title: 'Sentez', content: 'YPG + 7 = YPG7.' }
    ],
    neuralBrake: "Oluşan kelimedeki seslileri atmayı unutma; YPGA7 tuzağına düşme.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Metin: YPG, Sayı: 7 -> YPG7.'
  },
  {
    id: 5020,
    atolyeId: 5,
    atolyeTitle: 'Atölye 5: Şifreleme ve Sözel Mantık Oyunları',
    questionNumber: 20,
    title: 'Karakter Döngüsü',
    category: 'Kelime Algoritması',
    context: 'Yazılım 6 harfli kelimeleri şifreler: 1. Adım (Aynalama): İlk 3 harf ile son 3 harf blok olarak yer değiştirir. 2. Adım (Vokal Kaydırma): Sesli harfler sonraki sesliye dönüşür (A→E, E→I, I→İ, İ→O, O→Ö, Ö→U, U→Ü, Ü→A). 3. Adım: Toplam harf sayısı sona eklenir.',
    premises: [
      'Girdi: “BİLGİS”.',
      '1. Adım: BİL ve GİS blokları takas edilir → GİSBİL.',
      '2. Adım: İki adet İ harfi O harfine dönüşür → GOSBOL.',
      '3. Adım: Toplam harf sayısı (6) sona eklenir → GOSBOL6.'
    ],
    questionStem: 'Yazılıma “BİLGİS” kelimesi girilirse çıkışta hangi şifre görünür?',
    options: [
      { letter: 'A', text: 'GOSBOL6', isCorrect: true },
      { letter: 'B', text: 'GİSBİL6', isCorrect: false },
      { letter: 'C', text: 'GOSBOL', isCorrect: false },
      { letter: 'D', text: 'BİLGİS6', isCorrect: false }
    ],
    resultText: 'Şifreli çıktı “GOSBOL6” olur.',
    matrix: {
      title: 'Karakter Döngüsü Evrim Matrisi',
      headers: ['İşlem Adımı', 'Mevcut Veri', 'Uygulanan Mantık', 'Elde Edilen Çıktı'],
      rows: [
        ['Giriş', 'BİLGİS', 'Başlangıç kelimesi (6 harf)', 'BİLGİS'],
        ['1. Aynalama', 'BİL - GİS', 'Blokları yer değiştir', 'GİSBİL'],
        ['2. Vokal Kaydırma', 'GİSBİL', 'İ → O dönüşümü', 'GOSBOL'],
        ['3. Sayısal Ek', 'GOSBOL', 'Harf sayısını (6) ekle', 'GOSBOL6']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Yapısal Bölünme', content: 'BİLGİS iki yarıya ayrılır (BİL ve GİS), takas edilir: GİSBİL.' },
      { step: 2, title: 'Vokal Döngüsü', content: 'İ harfinden sonra gelen sesli harf O’dur. GİSBİL → GOSBOL.' },
      { step: 3, title: 'Sayısal Mühürleme', content: 'Toplam harf sayısı 6 sona eklenir: GOSBOL6.' },
      { step: 4, title: 'Sonuç', content: 'Çıktı: GOSBOL6.' }
    ],
    neuralBrake: "İ'den sonra J getirmemelisin; kural sadece sesli harfler listesindeki döngüyü işletir (İ -> O).",
    cognitiveTime: '15 saniye',
    synapticCoding: 'BİL-GİS -> GİSBİL -> GOSBOL -> GOSBOL6.'
  }
];
