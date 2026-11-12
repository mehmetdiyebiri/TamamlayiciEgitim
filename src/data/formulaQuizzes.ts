export interface FormulaQuizQuestion {
    id: string;
    question: string;
    options: string[];
    ans: string;
    explanation: string;
    hint: string;
}

export const FORMULA_QUIZZES: Record<string, FormulaQuizQuestion[]> = {
    // 5. SINIF
    "Dikdörtgenin Alanı": [
        {
            id: "da_1",
            question: "Kısa kenarı 6 cm ve uzun kenarı 9 cm olan bir dikdörtgenin alanı kaç cm² dir?",
            options: ["54 cm²", "30 cm²", "45 cm²", "60 cm²"],
            ans: "54 cm²",
            explanation: "Alan = Kısa Kenar × Uzun Kenar = 6 × 9 = 54 cm².",
            hint: "Formül: Alan = a × b"
        },
        {
            id: "da_2",
            question: "Alanı 48 cm² ve uzun kenarı 8 cm olan bir dikdörtgenin kısa kenarı kaç cm'dir?",
            options: ["6 cm", "8 cm", "4 cm", "7 cm"],
            ans: "6 cm",
            explanation: "Kısa Kenar = Alan ÷ Uzun Kenar = 48 ÷ 8 = 6 cm.",
            hint: "Ters işlem: Alanı verilen kenara bölün."
        },
        {
            id: "da_3",
            question: "Kenar uzunlukları 12 m ve 15 m olan dikdörtgen şeklindeki bir bahçenin alanı kaç m² dir?",
            options: ["180 m²", "54 m²", "160 m²", "200 m²"],
            ans: "180 m²",
            explanation: "Alan = 12 × 15 = 180 m².",
            hint: "12 ile 15'i çarpın."
        },
        {
            id: "da_4",
            question: "Çevresi 34 cm ve uzun kenarı 10 cm olan dikdörtgenin alanı kaç cm² dir?",
            options: ["70 cm²", "60 cm²", "80 cm²", "140 cm²"],
            ans: "70 cm²",
            explanation: "Kısa kenar = (34 - 20) ÷ 2 = 7 cm. Alan = 10 × 7 = 70 cm².",
            hint: "Önce kısa kenarı bulun, sonra alan formülünü uygulayın."
        },
        {
            id: "da_5",
            question: "Bir dikdörtgenin kısa kenarı 2 katına, uzun kenarı 3 katına çıkarılırsa alanı kaç katına çıkar?",
            options: ["6 katına", "5 katına", "4 katına", "8 katına"],
            ans: "6 katına",
            explanation: "Yeni Alan = (2a) × (3b) = 6(a × b), yani 6 katına çıkar.",
            hint: "2 × 3 = 6."
        }
    ],

    "Karenin Alanı": [
        {
            id: "ka_1",
            question: "Bir kenar uzunluğu 8 cm olan bir karenin alanı kaç cm² dir?",
            options: ["64 cm²", "32 cm²", "16 cm²", "48 cm²"],
            ans: "64 cm²",
            explanation: "Alan = a × a = 8 × 8 = 64 cm².",
            hint: "Formül: Alan = a²"
        },
        {
            id: "ka_2",
            question: "Alanı 100 cm² olan bir karenin bir kenar uzunluğu kaç cm'dir?",
            options: ["10 cm", "25 cm", "20 cm", "50 cm"],
            ans: "10 cm",
            explanation: "Hangi sayının kendisiyle çarpımı 100 eder? 10 × 10 = 100.",
            hint: "100'ün karekökü kaçtır?"
        },
        {
            id: "ka_3",
            question: "Çevresi 48 cm olan karenin alanı kaç santimetrekaredir?",
            options: ["144 cm²", "96 cm²", "196 cm²", "121 cm²"],
            ans: "144 cm²",
            explanation: "Bir kenar = 48 ÷ 4 = 12 cm. Alan = 12 × 12 = 144 cm².",
            hint: "Önce 4'e bölerek bir kenarı bulun."
        },
        {
            id: "ka_4",
            question: "Bir kenarı 5 metre olan kare şeklindeki halının m² fiyatı 40 TL ise bu halı kaç TL'dir?",
            options: ["1000 TL", "800 TL", "1200 TL", "500 TL"],
            ans: "1000 TL",
            explanation: "Alan = 5 × 5 = 25 m². Tutar = 25 × 40 = 1000 TL.",
            hint: "Alanı birim fiyatla çarpın."
        },
        {
            id: "ka_5",
            question: "Bir kenarı 2 katına çıkarılan karenin alanı kaç katına çıkar?",
            options: ["4 katına", "2 katına", "8 katına", "16 katına"],
            ans: "4 katına",
            explanation: "Yeni alan = (2a)² = 4a², yani 4 katına çıkar.",
            hint: "2² = 4."
        }
    ],

    "Küpün Hacmi": [
        {
            id: "kh_1",
            question: "Bir ayrıtının uzunluğu 4 cm olan küpün hacmi kaç cm³ tür?",
            options: ["64 cm³", "16 cm³", "48 cm³", "96 cm³"],
            ans: "64 cm³",
            explanation: "Hacim = a³ = 4 × 4 × 4 = 64 cm³.",
            hint: "Formül: Hacim = a × a × a"
        },
        {
            id: "kh_2",
            question: "Hacmi 125 cm³ olan bir küpün bir ayrıtı kaç cm'dir?",
            options: ["5 cm", "25 cm", "15 cm", "10 cm"],
            ans: "5 cm",
            explanation: "5 × 5 × 5 = 125 olduğu için bir ayrıtı 5 cm'dir.",
            hint: "Hangi sayının küpü 125 eder?"
        },
        {
            id: "kh_3",
            question: "Bir ayrıtı 2 metre olan küp şeklindeki su deposu kaç m³ su alır?",
            options: ["8 m³", "4 m³", "6 m³", "12 m³"],
            ans: "8 m³",
            explanation: "Hacim = 2 × 2 × 2 = 8 m³.",
            hint: "2³ = 8."
        },
        {
            id: "kh_4",
            question: "Bir ayrıtı 3 cm olan küplerden kaç tanesi birleştirilirse hacmi 81 cm³ olan bir prizma elde edilir?",
            options: ["3 tane", "9 tane", "27 tane", "1 tane"],
            ans: "3 tane",
            explanation: "Bir küpün hacmi = 3³ = 27 cm³. 81 ÷ 27 = 3 tane gerekir.",
            hint: "81'i bir küpün hacmine bölün."
        },
        {
            id: "kh_5",
            question: "Bir küpün bir ayrıtı 2 katına çıkarılırsa hacmi kaç katına çıkar?",
            options: ["8 katına", "4 katına", "6 katına", "2 katına"],
            ans: "8 katına",
            explanation: "(2a)³ = 8a³, yani hacim 8 katına çıkar.",
            hint: "2³ = 8."
        }
    ],

    "Dikdörtgenler Prizmasının Hacmi": [
        {
            id: "dph_1",
            question: "Ayrıtları 3 cm, 5 cm ve 8 cm olan dikdörtgenler prizmasının hacmi kaç cm³ tür?",
            options: ["120 cm³", "80 cm³", "60 cm³", "150 cm³"],
            ans: "120 cm³",
            explanation: "Hacim = a × b × c = 3 × 5 × 8 = 120 cm³.",
            hint: "En, boy ve yüksekliği çarpın."
        },
        {
            id: "dph_2",
            question: "Hacmi 180 cm³, taban ayrıtları 5 cm ve 6 cm olan prizmanın yüksekliği kaç cm'dir?",
            options: ["6 cm", "5 cm", "8 cm", "10 cm"],
            ans: "6 cm",
            explanation: "Taban Alanı = 5 × 6 = 30. Yükseklik = 180 ÷ 30 = 6 cm.",
            hint: "Hacim = Taban Alanı × Yükseklik."
        },
        {
            id: "dph_3",
            question: "Boyutları 2 m, 3 m ve 4 m olan bir odanın hacmi kaç metreküptür?",
            options: ["24 m³", "18 m³", "20 m³", "28 m³"],
            ans: "24 m³",
            explanation: "2 × 3 × 4 = 24 m³.",
            hint: "2 × 3 × 4 işlemini yapın."
        },
        {
            id: "dph_4",
            question: "Taban alanı 40 cm² ve yüksekliği 7 cm olan dikdörtgenler prizmasının hacmi kaçtır?",
            options: ["280 cm³", "140 cm³", "240 cm³", "300 cm³"],
            ans: "280 cm³",
            explanation: "Hacim = Taban Alanı × Yükseklik = 40 × 7 = 280 cm³.",
            hint: "Taban alanı ile yüksekliği çarpın."
        },
        {
            id: "dph_5",
            question: "Boyutları 10 cm, 20 cm ve 30 cm olan bir kutunun hacmi kaç cm³ tür?",
            options: ["6000 cm³", "600 cm³", "5000 cm³", "12000 cm³"],
            ans: "6000 cm³",
            explanation: "10 × 20 × 30 = 6000 cm³.",
            hint: "10 × 20 × 30."
        }
    ],

    "Yüzde Hesaplama": [
        {
            id: "yh_1",
            question: "80 sayısının %25'i kaçtır?",
            options: ["20", "25", "15", "30"],
            ans: "20",
            explanation: "%25 çeyrek demektir: 80 ÷ 4 = 20.",
            hint: "80 × 25 / 100."
        },
        {
            id: "yh_2",
            question: "150 TL'lik bir kazağa %20 indirim yapılırsa indirimli fiyat kaç TL olur?",
            options: ["120 TL", "130 TL", "110 TL", "125 TL"],
            ans: "120 TL",
            explanation: "İndirim = 150 × 20 / 100 = 30 TL. Fiyat = 150 - 30 = 120 TL.",
            hint: "Önce %20'yi bulun, sonra fiyattan düşün."
        },
        {
            id: "yh_3",
            question: "40 sayısının %150'si kaçtır?",
            options: ["60", "50", "70", "80"],
            ans: "60",
            explanation: "40 × 150 / 100 = 60.",
            hint: "Kendisi (40) + Yarısı (20) = 60."
        },
        {
            id: "yh_4",
            question: "200 kişilik bir grubun %40'ı erkektir. Grupta kaç kız vardır?",
            options: ["120", "80", "100", "140"],
            ans: "120",
            explanation: "Kız oranı = %60. 200 × 60 / 100 = 120 kız.",
            hint: "%100 - %40 = %60."
        },
        {
            id: "yh_5",
            question: "50'nin yüzde kaçı 15'tir?",
            options: ["%30", "%25", "%35", "%20"],
            ans: "%30",
            explanation: "(15 / 50) × 100 = 30, yani %30.",
            hint: "15'i 50'ye bölüp 100 ile çarpın."
        }
    ],

    "Kesirlerde Genişletme": [
        {
            id: "kg_1",
            question: "3/5 kesri 4 ile genişletilirse hangi kesir elde edilir?",
            options: ["12/20", "12/5", "3/20", "7/9"],
            ans: "12/20",
            explanation: "(3×4)/(5×4) = 12/20.",
            hint: "Hem payı hem paydayı 4 ile çarpın."
        },
        {
            id: "kg_2",
            question: "2/7 kesrinin paydası 28 yapıldığında payı kaç olur?",
            options: ["8", "6", "10", "14"],
            ans: "8",
            explanation: "28 ÷ 7 = 4 ile genişletilmiştir. Pay = 2 × 4 = 8.",
            hint: "7'yi 28 yapmak için 4 ile çarparız."
        },
        {
            id: "kg_3",
            question: "Aşağıdakilerden hangisi 1/3 kesrinin genişletilmiş hali değildir?",
            options: ["4/15", "3/9", "5/15", "6/18"],
            ans: "4/15",
            explanation: "1/3 kesrinde payda payın 3 katı olmalıdır. 15, 4'ün 3 katı değildir.",
            hint: "Payı 3 ile çarpınca paydayı vermelidir."
        },
        {
            id: "kg_4",
            question: "5/8 = x/32 eşitliğinde x kaçtır?",
            options: ["20", "25", "15", "18"],
            ans: "20",
            explanation: "Payda 4 ile çarpılmış (8×4=32), o halde pay da 4 ile çarpılır: 5×4=20.",
            hint: "32 ÷ 8 = 4."
        },
        {
            id: "kg_5",
            question: "4/9 kesri 6 ile genişletilirse oluşan kesir hangisidir?",
            options: ["24/54", "20/54", "24/45", "18/54"],
            ans: "24/54",
            explanation: "(4×6) / (9×6) = 24/54.",
            hint: "4×6 ve 9×6."
        }
    ],

    "Kesirlerde Sadeleştirme": [
        {
            id: "ks_1",
            question: "18/24 kesrinin en sade hali hangisidir?",
            options: ["3/4", "9/12", "6/8", "2/3"],
            ans: "3/4",
            explanation: "Her iki sayı da 6 ile bölünür: (18÷6)/(24÷6) = 3/4.",
            hint: "EBOB(18, 24) = 6."
        },
        {
            id: "ks_2",
            question: "25/35 kesri 5 ile sadeleştirildiğinde hangi kesir elde edilir?",
            options: ["5/7", "5/8", "7/5", "1/7"],
            ans: "5/7",
            explanation: "(25÷5)/(35÷5) = 5/7.",
            hint: "Pay ve paydayı 5'e bölün."
        },
        {
            id: "ks_3",
            question: "36/48 = a/4 ise a kaçtır?",
            options: ["3", "2", "4", "5"],
            ans: "3",
            explanation: "48 ÷ 12 = 4 olduğuna göre pay da 12'ye bölünür: 36 ÷ 12 = 3.",
            hint: "Paydayı 4 yapmak için 12'ye böldük."
        },
        {
            id: "ks_4",
            question: "Aşağıdaki kesirlerden hangisi daha fazla sadeleştirilemez (en sade haldedir)?",
            options: ["7/11", "9/12", "14/21", "15/25"],
            ans: "7/11",
            explanation: "7 ve 11 aralarında asaldır, 1 dışında ortak bölenleri yoktur.",
            hint: "Ortak böleni olmayan kesri seçin."
        },
        {
            id: "ks_5",
            question: "50/100 kesrinin en sade hali kaçtır?",
            options: ["1/2", "5/10", "2/4", "1/4"],
            ans: "1/2",
            explanation: "50 ile sadeleştirilirse 1/2 bulunur.",
            hint: "50/100 yarımdır."
        }
    ],

    // 6. SINIF
    "2 ile Bölünebilme": [
        {
            id: "b2_1",
            question: "Aşağıdaki sayılardan hangisi 2 ile kalansız bölünür?",
            options: ["478", "345", "621", "899"],
            ans: "478",
            explanation: "Birler basamağı 8 (çift) olduğu için 478, 2'ye tam bölünür.",
            hint: "Birler basamağı 0, 2, 4, 6, 8 olmalıdır."
        },
        {
            id: "b2_2",
            question: "3 basamaklı 54A sayısı 2 ile tam bölünebiliyorsa A yerine kaç farklı rakam yazılabilir?",
            options: ["5", "4", "6", "9"],
            ans: "5",
            explanation: "A yerine 0, 2, 4, 6, 8 gelebilir (toplam 5 rakam).",
            hint: "Çift rakamların sayısı kaçtır?"
        },
        {
            id: "b2_3",
            question: "Aşağıdaki işlemlerden hangisinin sonucu tek sayıdır (2'ye bölünmez)?",
            options: ["7 × 9", "6 × 8", "12 + 14", "20 ÷ 2"],
            ans: "7 × 9",
            explanation: "7 × 9 = 63 (tek sayıdır).",
            hint: "Tek × Tek = Tek."
        },
        {
            id: "b2_4",
            question: "987 sayısının 2 ile bölümünden kalan kaçtır?",
            options: ["1", "0", "2", "7"],
            ans: "1",
            explanation: "Tek sayıların 2 ile bölümünden kalan daima 1'dir.",
            hint: "7 tek sayıdır."
        },
        {
            id: "b2_5",
            question: "Rakamları farklı en büyük 3 basamaklı çift doğal sayı hangisidir?",
            options: ["986", "988", "998", "976"],
            ans: "986",
            explanation: "Yüzler 9, onlar 8, birler için en büyük çift rakam 6 seçilir: 986.",
            hint: "Rakamları farklı ve çift olmalı."
        }
    ],

    "3 ile Bölünebilme": [
        {
            id: "b3_1",
            question: "Aşağıdaki sayılardan hangisi 3 ile kalansız bölünür?",
            options: ["531", "422", "611", "724"],
            ans: "531",
            explanation: "5 + 3 + 1 = 9 (3'ün katı) olduğu için 531 tam bölünür.",
            hint: "Rakamlar toplamı 3'ün katı olmalı."
        },
        {
            id: "b3_2",
            question: "Dört basamaklı 32A4 sayısı 3 ile tam bölündüğüne göre A'nın alabileceği değerler toplamı kaçtır?",
            options: ["12", "15", "9", "18"],
            ans: "12",
            explanation: "3 + 2 + A + 4 = 9 + A. A: 0, 3, 6, 9 olabilir. Toplam = 0 + 3 + 6 + 9 = 18. (Rakam olduğu için 0, 3, 6, 9 => 18).",
            hint: "9 + A sayısı 3'ün katı olmalı."
        },
        {
            id: "b3_3",
            question: "785 sayısının 3 ile bölümünden kalan kaçtır?",
            options: ["2", "1", "0", "3"],
            ans: "2",
            explanation: "7 + 8 + 5 = 20. 20'nin 3 ile bölümünden kalan 2'dir.",
            hint: "Rakamları toplayıp 3'e bölün."
        },
        {
            id: "b3_4",
            question: "Aşağıdaki sayılardan hangisi hem 2 hem de 3 ile kalansız bölünür?",
            options: ["432", "525", "311", "614"],
            ans: "432",
            explanation: "432 çifttir (2'ye bölünür). 4 + 3 + 2 = 9 (3'e bölünür).",
            hint: "Hem çift olmalı hem rakamlar toplamı 3'ün katı olmalı."
        },
        {
            id: "b3_5",
            question: "12A sayısının 3 ile tam bölünmesi için A kaç olamaz?",
            options: ["5", "0", "3", "6"],
            ans: "5",
            explanation: "1 + 2 + 5 = 8 (3'ün katı değildir). A = 5 olamaz.",
            hint: "A = 0, 3, 6, 9 olabilir."
        }
    ],

    "Mutlak Değer": [
        {
            id: "md_1",
            question: "|-9| + |+4| işleminin sonucu kaçtır?",
            options: ["13", "-5", "5", "-13"],
            ans: "13",
            explanation: "|-9| = 9 ve |+4| = 4. 9 + 4 = 13.",
            hint: "Mutlak değer daima pozitif çıkar."
        },
        {
            id: "md_2",
            question: "Mutlak değeri 7 olan tam sayılar hangileridir?",
            options: ["-7 ve +7", "Yalnızca +7", "Yalnızca -7", "0 ve 7"],
            ans: "-7 ve +7",
            explanation: "|-7| = 7 ve |+7| = 7'dir.",
            hint: "Sıfıra 7 birim uzaklıkta iki sayı vardır."
        },
        {
            id: "md_3",
            question: "|-15| - |-6| işleminin sonucu kaçtır?",
            options: ["9", "21", "-9", "-21"],
            ans: "9",
            explanation: "15 - 6 = 9.",
            hint: "15 - 6 işlemini yapın."
        },
        {
            id: "md_4",
            question: "Aşağıdaki sıralamalardan hangisi doğrudur?",
            options: ["|-3| < |-5| < |+8|", "|-5| < |-3| < |+8|", "|+8| < |-5| < |-3|", "|-3| < |+8| < |-5|"],
            ans: "|-3| < |-5| < |+8|",
            explanation: "3 < 5 < 8 doğrudur.",
            hint: "Değerleri: 3, 5, 8."
        },
        {
            id: "md_5",
            question: "|x| = 0 eşitliğini sağlayan x değeri kaçtır?",
            options: ["0", "1", "-1", "Yoktur"],
            ans: "0",
            explanation: "Mutlak değeri 0 olan tek sayı 0'dır.",
            hint: "Sıfıra uzaklığı 0 olan sayı."
        }
    ],

    "Üçgenin Alanı": [
        {
            id: "ua_1",
            question: "Tabanı 10 cm ve yüksekliği 6 cm olan üçgenin alanı kaç cm² dir?",
            options: ["30 cm²", "60 cm²", "20 cm²", "15 cm²"],
            ans: "30 cm²",
            explanation: "Alan = (Taban × Yükseklik) ÷ 2 = (10 × 6) ÷ 2 = 30 cm².",
            hint: "İki ile bölmeyi unutmayın!"
        },
        {
            id: "ua_2",
            question: "Dik kenarları 8 cm ve 12 cm olan bir dik üçgenin alanı kaç cm² dir?",
            options: ["48 cm²", "96 cm²", "24 cm²", "40 cm²"],
            ans: "48 cm²",
            explanation: "(8 × 12) ÷ 2 = 96 ÷ 2 = 48 cm².",
            hint: "Dik kenarlar birbirinin tabanı ve yüksekliğidir."
        },
        {
            id: "ua_3",
            question: "Alanı 28 cm² ve tabanı 7 cm olan üçgenin yüksekliği kaç cm'dir?",
            options: ["8 cm", "4 cm", "14 cm", "6 cm"],
            ans: "8 cm",
            explanation: "Taban × Yükseklik = 2 × Alan = 56. Yükseklik = 56 ÷ 7 = 8 cm.",
            hint: "Önce alanı 2 ile çarpın, sonra tabana bölün."
        },
        {
            id: "ua_4",
            question: "Tabanı 14 cm ve yüksekliği 5 cm olan üçgenin alanı kaç cm² dir?",
            options: ["35 cm²", "70 cm²", "28 cm²", "45 cm²"],
            ans: "35 cm²",
            explanation: "(14 × 5) ÷ 2 = 70 ÷ 2 = 35 cm².",
            hint: "14 × 5 / 2."
        },
        {
            id: "ua_5",
            question: "Bir üçgenin tabanı 2 katına çıkarılırsa alanı nasıl değişir?",
            options: ["2 katına çıkar", "4 katına çıkar", "Değişmez", "Yarıya iner"],
            ans: "2 katına çıkar",
            explanation: "Alan taban uzunluğu ile doğru orantılıdır, 2 katına çıkar.",
            hint: "Doğru orantı."
        }
    ],

    "Çemberin Çevresi": [
        {
            id: "cc_1",
            question: "Yarıçapı 4 cm olan çemberin çevre uzunluğu kaç cm'dir? (π = 3 alınız)",
            options: ["24 cm", "12 cm", "48 cm", "18 cm"],
            ans: "24 cm",
            explanation: "Çevre = 2 × π × r = 2 × 3 × 4 = 24 cm.",
            hint: "2 × 3 × r."
        },
        {
            id: "cc_2",
            question: "Çapı 20 cm olan bir çemberin çevresi kaç cm'dir? (π = 3 alınız)",
            options: ["60 cm", "30 cm", "120 cm", "40 cm"],
            ans: "60 cm",
            explanation: "Çap = 20 cm ise yarıçap r = 10 cm. Çevre = 2 × 3 × 10 = 60 cm.",
            hint: "Yarıçap çapın yarısıdır: r = 10 cm."
        },
        {
            id: "cc_3",
            question: "Çevresi 54 cm olan çemberin yarıçapı kaç cm'dir? (π = 3 alınız)",
            options: ["9 cm", "18 cm", "6 cm", "12 cm"],
            ans: "9 cm",
            explanation: "2 × 3 × r = 54 => 6r = 54 => r = 9 cm.",
            hint: "54'ü 6'ya bölün."
        },
        {
            id: "cc_4",
            question: "Yarıçapı 5 cm olan bir tekerlek 10 tur attığında kaç cm yol alır? (π = 3 alınız)",
            options: ["300 cm", "150 cm", "600 cm", "30 cm"],
            ans: "300 cm",
            explanation: "1 tur = Çevre = 2 × 3 × 5 = 30 cm. 10 tur = 30 × 10 = 300 cm.",
            hint: "1 tur çevresi kadardır."
        },
        {
            id: "cc_5",
            question: "Yarıçapı 2 katına çıkarılan çemberin çevresi kaç katına çıkar?",
            options: ["2 katına", "4 katına", "8 katına", "Değişmez"],
            ans: "2 katına",
            explanation: "Çevre yarıçap ile doğru orantılıdır, 2 katına çıkar.",
            hint: "Çevre formülünde r birinci derecedendir."
        }
    ],

    // 7. SINIF
    "Orantı Özelliği (İçler-Dışlar)": [
        {
            id: "id_1",
            question: "3/x = 6/14 orantısında x kaçtır?",
            options: ["7", "6", "8", "9"],
            ans: "7",
            explanation: "3 × 14 = 6 × x => 42 = 6x => x = 7.",
            hint: "İçler dışlar çarpımı yapın: 3 × 14 = 6 × x."
        },
        {
            id: "id_2",
            question: "5/8 = 15/y orantısında y kaçtır?",
            options: ["24", "20", "28", "30"],
            ans: "24",
            explanation: "Pay 3 ile çarpılmış (5×3=15), payda da 3 ile çarpılır: 8×3 = 24.",
            hint: "5 × y = 8 × 15."
        },
        {
            id: "id_3",
            question: "Bir haritada 2 cm gerçekte 50 km'yi gösteriyorsa, 6 cm kaç km'yi gösterir?",
            options: ["150 km", "100 km", "200 km", "120 km"],
            ans: "150 km",
            explanation: "2/50 = 6/x => 2x = 300 => x = 150 km.",
            hint: "2 cm 50 km ise 1 cm 25 km'dir."
        },
        {
            id: "id_4",
            question: "a/b = 2/3 ve b = 18 ise a kaçtır?",
            options: ["12", "9", "15", "16"],
            ans: "12",
            explanation: "a/18 = 2/3 => 3a = 36 => a = 12.",
            hint: "3a = 2 × 18."
        },
        {
            id: "id_5",
            question: "4 kilogram elma 24 TL ise 10 kilogram elma kaç TL'dir?",
            options: ["60 TL", "50 TL", "70 TL", "48 TL"],
            ans: "60 TL",
            explanation: "1 kg = 24 ÷ 4 = 6 TL. 10 kg = 10 × 6 = 60 TL.",
            hint: "Birim fiyatı bulun."
        }
    ],

    "Çokgenlerde İç Açılar Toplamı": [
        {
            id: "cia_1",
            question: "Bir altıgenin (n=6) iç açıları toplamı kaç derecedir?",
            options: ["720°", "540°", "360°", "900°"],
            ans: "720°",
            explanation: "(6 - 2) × 180° = 4 × 180° = 720°.",
            hint: "Formül: (n - 2) × 180°"
        },
        {
            id: "cia_2",
            question: "İç açıları toplamı 900° olan çokgen kaç kenarlıdır?",
            options: ["7", "6", "8", "9"],
            ans: "7",
            explanation: "(n - 2) × 180 = 900 => n - 2 = 5 => n = 7.",
            hint: "900'ü 180'e bölün ve 2 ekleyin."
        },
        {
            id: "cia_3",
            question: "Bir sekizgenin iç açıları toplamı kaç derecedir?",
            options: ["1080°", "900°", "1260°", "720°"],
            ans: "1080°",
            explanation: "(8 - 2) × 180° = 6 × 180° = 1080°.",
            hint: "6 × 180°."
        },
        {
            id: "cia_4",
            question: "Beşgenin iç açıları toplamı kaç derecedir?",
            options: ["540°", "360°", "720°", "450°"],
            ans: "540°",
            explanation: "(5 - 2) × 180° = 3 × 180° = 540°.",
            hint: "3 × 180°."
        },
        {
            id: "cia_5",
            question: "Bir ongenin (n=10) iç açıları toplamı kaç derecedir?",
            options: ["1440°", "1260°", "1620°", "1800°"],
            ans: "1440°",
            explanation: "(10 - 2) × 180° = 8 × 180° = 1440°.",
            hint: "8 × 180°."
        }
    ],

    "Düzgün Çokgenin Bir İç Açısı": [
        {
            id: "dbia_1",
            question: "Düzgün bir altıgenin bir iç açısı kaç derecedir?",
            options: ["120°", "108°", "135°", "128°"],
            ans: "120°",
            explanation: "Toplam = 720°. Bir açı = 720 ÷ 6 = 120°.",
            hint: "Dış açı = 360/6 = 60°. İç açı = 180 - 60 = 120°."
        },
        {
            id: "dbia_2",
            question: "Düzgün bir beşgenin bir iç açısı kaç derecedir?",
            options: ["108°", "120°", "100°", "110°"],
            ans: "108°",
            explanation: "Toplam = 540°. Bir açı = 540 ÷ 5 = 108°.",
            hint: "540 ÷ 5."
        },
        {
            id: "dbia_3",
            question: "Düzgün bir sekizgenin bir iç açısı kaç derecedir?",
            options: ["135°", "140°", "120°", "150°"],
            ans: "135°",
            explanation: "Dış açı = 360 ÷ 8 = 45°. İç açı = 180 - 45 = 135°.",
            hint: "180 - (360/8)."
        },
        {
            id: "dbia_4",
            question: "Bir iç açısının ölçüsü 144° olan düzgün çokgen kaç kenarlıdır?",
            options: ["10", "12", "8", "9"],
            ans: "10",
            explanation: "Dış açı = 180 - 144 = 36°. Kenar sayısı = 360 ÷ 36 = 10.",
            hint: "Kenar sayısı = 360 ÷ Dış Açı."
        },
        {
            id: "dbia_5",
            question: "Düzgün bir dörtgenin (kare) bir iç açısı kaç derecedir?",
            options: ["90°", "60°", "120°", "100°"],
            ans: "90°",
            explanation: "Karenin her iç açısı 90 derecedir.",
            hint: "360 ÷ 4 = 90°."
        }
    ],

    "Dairenin Alanı": [
        {
            id: "dalan_1",
            question: "Yarıçapı 5 cm olan dairenin alanı kaç cm² dir? (π = 3 alınız)",
            options: ["75 cm²", "30 cm²", "150 cm²", "45 cm²"],
            ans: "75 cm²",
            explanation: "Alan = π × r² = 3 × 5² = 3 × 25 = 75 cm².",
            hint: "Formül: Alan = π × r²"
        },
        {
            id: "dalan_2",
            question: "Çapı 8 cm olan bir dairenin alanı kaç cm² dir? (π = 3 alınız)",
            options: ["48 cm²", "192 cm²", "24 cm²", "96 cm²"],
            ans: "48 cm²",
            explanation: "Yarıçap r = 4 cm. Alan = 3 × 4² = 3 × 16 = 48 cm².",
            hint: "Önce yarıçapı bulun: r = 4 cm."
        },
        {
            id: "dalan_3",
            question: "Alanı 108 cm² olan dairenin yarıçapı kaç cm'dir? (π = 3 alınız)",
            options: ["6 cm", "18 cm", "9 cm", "12 cm"],
            ans: "6 cm",
            explanation: "3 × r² = 108 => r² = 36 => r = 6 cm.",
            hint: "108 ÷ 3 = 36."
        },
        {
            id: "dalan_4",
            question: "Yarıçapı 2 katına çıkarılan dairenin alanı kaç katına çıkar?",
            options: ["4 katına", "2 katına", "8 katına", "16 katına"],
            ans: "4 katına",
            explanation: "Alan yarıçapın karesiyle orantılıdır: 2² = 4 katına çıkar.",
            hint: "r² bağıntısı."
        },
        {
            id: "dalan_5",
            question: "Yarıçapı 10 cm olan dairenin alanı kaç cm² dir? (π = 3 alınız)",
            options: ["300 cm²", "60 cm²", "150 cm²", "600 cm²"],
            ans: "300 cm²",
            explanation: "Alan = 3 × 10² = 3 × 100 = 300 cm².",
            hint: "3 × 100."
        }
    ],

    // 8. SINIF (LGS)
    "EBOB-EKOK Özelliği": [
        {
            id: "ee_1",
            question: "EBOB(a, b) = 4 ve EKOK(a, b) = 60 olduğuna göre a × b çarpımı kaçtır?",
            options: ["240", "120", "480", "15"],
            ans: "240",
            explanation: "a × b = EBOB(a,b) × EKOK(a,b) = 4 × 60 = 240.",
            hint: "İki sayının çarpımı EBOB ile EKOK'un çarpımına eşittir."
        },
        {
            id: "ee_2",
            question: "Çarpımları 180 olan iki sayının EKOK'u 36 ise EBOB'u kaçtır?",
            options: ["5", "6", "4", "9"],
            ans: "5",
            explanation: "EBOB = Çarpım ÷ EKOK = 180 ÷ 36 = 5.",
            hint: "180'i 36'ya bölün."
        },
        {
            id: "ee_3",
            question: "Aralarında asal iki sayının EBOB'u kaçtır?",
            options: ["1", "0", "Kendileri", "Çarpımları"],
            ans: "1",
            explanation: "Aralarında asal sayıların 1'den başka ortak böleni yoktur, EBOB = 1'dir.",
            hint: "Aralarında asal tanımı."
        },
        {
            id: "ee_4",
            question: "Aralarında asal iki sayının EKOK'u 42 ise bu iki sayının toplamı en az kaç olabilir?",
            options: ["13", "17", "23", "43"],
            ans: "13",
            explanation: "a × b = 42. Aralarında asal çarpanlar: 6 ve 7. Toplam = 6 + 7 = 13.",
            hint: "Çarpımı 42 olan ve birbirine en yakın aralarında asal çift."
        },
        {
            id: "ee_5",
            question: "EBOB(12, 18) × EKOK(12, 18) işleminin sonucu kaçtır?",
            options: ["216", "108", "432", "144"],
            ans: "216",
            explanation: "12 × 18 = 216.",
            hint: "Sayıların çarpımına eşittir: 12 × 18."
        }
    ],

    "Üslü İfadelerde Çarpma (Aynı Taban)": [
        {
            id: "uic_1",
            question: "3⁴ × 3⁵ işleminin sonucu hangisidir?",
            options: ["3⁹", "3²⁰", "9⁹", "9²⁰"],
            ans: "3⁹",
            explanation: "Tabanlar aynı olduğunda üsler toplanır: 3^(4 + 5) = 3⁹.",
            hint: "Formül: aˣ × aʸ = a⁽ˣ⁺ʸ⁾"
        },
        {
            id: "uic_2",
            question: "2⁻³ × 2⁸ işleminin sonucu kaçtır?",
            options: ["2⁵", "2⁻²⁴", "2¹¹", "4⁵"],
            ans: "2⁵",
            explanation: "(-3) + 8 = 5 => 2⁵.",
            hint: "Üsleri işaretleriyle toplayın: -3 + 8."
        },
        {
            id: "uic_3",
            question: "5⁴ × 5⁻⁴ işleminin sonucu kaçtır?",
            options: ["1", "0", "5", "5⁸"],
            ans: "1",
            explanation: "5^(4 - 4) = 5⁰ = 1.",
            hint: "Sıfırıncı kuvvet 1'e eşittir."
        },
        {
            id: "uic_4",
            question: "7² × 7³ × 7⁴ işleminin sonucu kaçtır?",
            options: ["7⁹", "7²⁴", "21⁹", "7⁸"],
            ans: "7⁹",
            explanation: "2 + 3 + 4 = 9 => 7⁹.",
            hint: "2 + 3 + 4 = 9."
        },
        {
            id: "uic_5",
            question: "4³ × 2⁵ işleminin 2 tabanındaki değeri nedir?",
            options: ["2¹¹", "2⁸", "2¹⁵", "4⁸"],
            ans: "2¹¹",
            explanation: "4³ = (2²)³ = 2⁶. 2⁶ × 2⁵ = 2¹¹.",
            hint: "4'ü 2² olarak yazın."
        }
    ],

    "Üssün Üssü": [
        {
            id: "uu_1",
            question: "(2³)² ifadesinin eşiti nedir?",
            options: ["2⁶", "2⁵", "2⁹", "4⁶"],
            ans: "2⁶",
            explanation: "Üsler çarpılır: 3 × 2 = 6 => 2⁶.",
            hint: "Formül: (aˣ)ʸ = a⁽ˣ×ʸ⁾"
        },
        {
            id: "uu_2",
            question: "(5⁻²)³ ifadesinin eşiti nedir?",
            options: ["5⁻⁶", "5¹", "5⁶", "5⁻⁵"],
            ans: "5⁻⁶",
            explanation: "(-2) × 3 = -6 => 5⁻⁶.",
            hint: "-2 ile 3'ü çarpın."
        },
        {
            id: "uu_3",
            question: "8⁴ ifadesinin 2 tabanındaki eşiti hangisidir?",
            options: ["2¹²", "2⁷", "2¹⁶", "2⁶⁴"],
            ans: "2¹²",
            explanation: "8 = 2³ => (2³)⁴ = 2^(3×4) = 2¹².",
            hint: "8 = 2³."
        },
        {
            id: "uu_4",
            question: "(10²)³ sayısı kaç basamaklıdır?",
            options: ["7", "6", "5", "8"],
            ans: "7",
            explanation: "(10²)³ = 10⁶. 1'in yanına 6 tane sıfır gelir (1.000.000) = 7 basamaklı.",
            hint: "10ⁿ sayısı (n + 1) basamaklıdır."
        },
        {
            id: "uu_5",
            question: "(3⁴)⁰ işleminin sonucu kaçtır?",
            options: ["1", "0", "3", "81"],
            ans: "1",
            explanation: "Sıfır hariç herhangi bir sayının sıfırıncı kuvveti 1'dir.",
            hint: "a⁰ = 1."
        }
    ],

    "Kök Dışına Çıkarma": [
        {
            id: "kdc_1",
            question: "√48 sayısı a√b şeklinde yazıldığında a + b en az kaçtır?",
            options: ["7", "8", "16", "12"],
            ans: "7",
            explanation: "√48 = √(16 × 3) = 4√3. a = 4, b = 3. a + b = 4 + 3 = 7.",
            hint: "En büyük tam kare çarpan 16'dır."
        },
        {
            id: "kdc_2",
            question: "√75 sayısının eşiti hangisidir?",
            options: ["5√3", "3√5", "25√3", "15√5"],
            ans: "5√3",
            explanation: "√75 = √(25 × 3) = 5√3.",
            hint: "75 = 25 × 3."
        },
        {
            id: "kdc_3",
            question: "3√5 sayısı kök içine alındığında hangi sayı elde edilir?",
            options: ["√45", "√15", "√75", "√30"],
            ans: "45",
            explanation: "3 kök içine 3² = 9 olarak girer: √(9 × 5) = √45.",
            hint: "3² × 5 = 45."
        },
        {
            id: "kdc_4",
            question: "√200 sayısının a√b biçimindeki en sade hali hangisidir?",
            options: ["10√2", "2√10", "5√8", "20√2"],
            ans: "10√2",
            explanation: "√200 = √(100 × 2) = 10√2.",
            hint: "100 tam karedir."
        },
        {
            id: "kdc_5",
            question: "√32 + √18 işleminin sonucu kaçtır?",
            options: ["7√2", "5√2", "√50", "6√2"],
            ans: "7√2",
            explanation: "4√2 + 3√2 = 7√2.",
            hint: "√32 = 4√2, √18 = 3√2."
        }
    ],

    "Pisagor Bağıntısı": [
        {
            id: "pb_1",
            question: "Dik kenarları 6 cm ve 8 cm olan bir dik üçgenin hipotenüs uzunluğu kaç cm'dir?",
            options: ["10 cm", "14 cm", "12 cm", "9 cm"],
            ans: "10 cm",
            explanation: "6² + 8² = 36 + 64 = 100 = 10² cm.",
            hint: "3-4-5 özel üçgeninin 2 katı (6-8-10)."
        },
        {
            id: "pb_2",
            question: "Hipotenüsü 13 cm ve bir dik kenarı 5 cm olan dik üçgenin diğer dik kenarı kaç cm'dir?",
            options: ["12 cm", "8 cm", "10 cm", "11 cm"],
            ans: "12 cm",
            explanation: "13² - 5² = 169 - 25 = 144 = 12² cm (5-12-13 üçgeni).",
            hint: "5-12-13 özel üçgeni."
        },
        {
            id: "pb_3",
            question: "Dik kenarları 9 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm'dir?",
            options: ["15 cm", "18 cm", "21 cm", "16 cm"],
            ans: "15 cm",
            explanation: "3-4-5 üçgeninin 3 katı: 9-12-15 cm.",
            hint: "3-4-5 üçgeninin 3 katı."
        },
        {
            id: "pb_4",
            question: "Bir kenarı 7 cm ve hipotenüsü 25 cm olan dik üçgenin diğer dik kenarı kaç cm'dir?",
            options: ["24 cm", "20 cm", "18 cm", "22 cm"],
            ans: "24 cm",
            explanation: "7-24-25 özel dik üçgenidir.",
            hint: "7-24-25 özel üçgeni."
        },
        {
            id: "pb_5",
            question: "Köşegen uzunluğu 10 cm olan bir karenin bir kenarı kaç cm'dir?",
            options: ["5√2 cm", "5 cm", "10√2 cm", "2√5 cm"],
            ans: "5√2 cm",
            explanation: "a² + a² = 10² => 2a² = 100 => a² = 50 => a = √50 = 5√2 cm.",
            hint: "Köşegen = a√2."
        }
    ],

    "İki Kare Farkı Özdeşliği": [
        {
            id: "ikf_1",
            question: "x² - 36 ifadesinin çarpanlarına ayrılmış hali hangisidir?",
            options: ["(x - 6)(x + 6)", "(x - 6)²", "(x + 6)²", "(x - 18)(x + 18)"],
            ans: "(x - 6)(x + 6)",
            explanation: "a² - b² = (a - b)(a + b) => x² - 6² = (x - 6)(x + 6).",
            hint: "36 = 6²."
        },
        {
            id: "ikf_2",
            question: "105² - 95² işleminin sonucu iki kare farkı kullanılarak nasıl pratik bulunur?",
            options: ["2000", "1000", "4000", "200"],
            ans: "2000",
            explanation: "(105 - 95)(105 + 95) = 10 × 200 = 2000.",
            hint: "(Fark) × (Toplam) = 10 × 200."
        },
        {
            id: "ikf_3",
            question: "4x² - 25 ifadesinin çarpanlara ayrılmış hali hangisidir?",
            options: ["(2x - 5)(2x + 5)", "(4x - 5)(4x + 5)", "(2x - 25)(2x + 25)", "(2x - 5)²"],
            ans: "(2x - 5)(2x + 5)",
            explanation: "(2x)² - 5² = (2x - 5)(2x + 5).",
            hint: "4x² = (2x)² ve 25 = 5²."
        },
        {
            id: "ikf_4",
            question: "a² - b² = 40 ve a - b = 4 olduğuna göre a + b kaçtır?",
            options: ["10", "8", "16", "20"],
            ans: "10",
            explanation: "(a - b)(a + b) = 40 => 4 × (a + b) = 40 => a + b = 10.",
            hint: "40 ÷ 4 = 10."
        },
        {
            id: "ikf_5",
            question: "x² - 1 ifadesinin çarpanları hangileridir?",
            options: ["(x - 1)(x + 1)", "(x - 1)²", "x(x - 1)", "(x + 1)²"],
            ans: "(x - 1)(x + 1)",
            explanation: "1 = 1² olduğu için x² - 1² = (x - 1)(x + 1).",
            hint: "1² = 1."
        }
    ]
};

// Fallback generator if a specific formula quiz is requested that isn't hardcoded above
export function getFormulaQuiz(formulaTitle: string): FormulaQuizQuestion[] {
    if (FORMULA_QUIZZES[formulaTitle]) {
        return FORMULA_QUIZZES[formulaTitle];
    }
    // Generic high-quality 5 questions matching math curriculum
    return [
        {
            id: "gen_1",
            question: `${formulaTitle} kuralı uygulandığında birinci adımda ne yapılır?`,
            options: ["Verilen değerler formülde yerine konur", "Sayılar doğrudan toplanır", "Yalnızca karekök alınır", "İşlem tersine çevrilir"],
            ans: "Verilen değerler formülde yerine konur",
            explanation: "Formül uygulamasında ilk ve en önemli adım verilen değişken değerlerini doğru formüle yerleştirmektir.",
            hint: "Formüldeki sembollerin değerlerini tespit edin."
        },
        {
            id: "gen_2",
            question: `${formulaTitle} bağıntısında değişken 2 katına çıkarılırsa sonuç nasıl etkilenir?`,
            options: ["Bağıntının derecesine göre artar", "Her zaman yarıya düşer", "Hiçbir zaman değişmez", "Sıfıra eşit olur"],
            ans: "Bağıntının derecesine göre artar",
            explanation: "Doğrusal bağıntılarda 2 katına, karesel bağıntılarda (alan gibi) 4 katına, kübik bağıntılarda (hacim gibi) 8 katına çıkar.",
            hint: "Değişkenin üssüne dikkat ediniz."
        },
        {
            id: "gen_3",
            question: `${formulaTitle} konusunda en sık yapılan işlem hatası hangisidir?`,
            options: ["İşlem önceliğini veya birimleri dikkate almamak", "Fazla sadeleştirme yapmak", "Sonucu pozitif bulmak", "Grafik çizmek"],
            ans: "İşlem önceliğini veya birimleri dikkate almamak",
            explanation: "Birim dönüşümleri (cm/m, litre/dm³) ve işlem önceliği atlandığında yanlış sonuca ulaşılır.",
            hint: "Birimler ve işlem adımları çok önemlidir."
        },
        {
            id: "gen_4",
            question: `${formulaTitle} konusunu pekiştirmek için aşağıdaki adımlardan hangisi en etkilidir?`,
            options: ["Farklı sayılarla en az 5 alıştırma çözmek", "Yalnızca formülü ezberlemek", "İşlemleri hesap makinesine yaptırmak", "Sadece konu özetini okumak"],
            ans: "Farklı sayılarla en az 5 alıştırma çözmek",
            explanation: "Matematiksel formüller bol örnek ve farklı problem tipleri çözülerek zihne kalıcı olarak yerleşir.",
            hint: "Pratik yapmak mükemmelleştirir."
        },
        {
            id: "gen_5",
            question: `${formulaTitle} kuralı günlük hayatta en çok nerede kullanılır?`,
            options: ["Ölçme, planlama, mühendislik ve hesaplamalarda", "Sadece tarih derslerinde", "Sadece müzik dinlerken", "Yalnızca spor yaparken"],
            ans: "Ölçme, planlama, mühendislik ve hesaplamalarda",
            explanation: "Matematiksel formüller mimariden günlük bütçeye, teknolojiden doğa bilimlerine kadar her alanda temel teşkil eder.",
            hint: "Matematik yaşamın her alanındadır."
        }
    ];
}
