export interface FormulaCardItem {
    title: string;
    formula: string;
    desc: string;
    example: string;
}

export const FORMULAS: Record<"5" | "6" | "7" | "8", FormulaCardItem[]> = {
    "5": [
        {
            title: "Dikdörtgenin Çevresi",
            formula: "Çevre = 2 × (a + b)",
            desc: "Dikdörtgenin çevresi, kısa kenar ile uzun kenar uzunluklarının toplamının 2 katına eşittir.",
            example: "Kenarları 4 cm ve 7 cm olan dikdörtgenin çevresi = 2 × (4 + 7) = 2 × 11 = 22 cm"
        },
        {
            title: "Dikdörtgenin Alanı",
            formula: "Alan = a × b",
            desc: "Dikdörtgenin alanı, kısa kenar ile uzun kenar uzunluğunun çarpımına eşittir.",
            example: "Kenarları 4 cm ve 5 cm olan dikdörtgenin alanı = 4 × 5 = 20 cm²"
        },
        {
            title: "Karenin Alanı ve Çevresi",
            formula: "Çevre = 4 × a  |  Alan = a × a",
            desc: "Karenin dört kenarı da eşittir. Çevresi bir kenarının 4 katı, alanı ise bir kenarının kendisiyle çarpımıdır.",
            example: "Bir kenarı 6 cm olan karenin çevresi = 4 × 6 = 24 cm, alanı = 6 × 6 = 36 cm²"
        },
        {
            title: "Üçgen ve Dörtgen İç Açıları",
            formula: "Üçgen = 180°  |  Dörtgen = 360°",
            desc: "Her üçgenin iç açılarının ölçüleri toplamı 180°, her dörtgenin iç açılarının ölçüleri toplamı 360°'dir.",
            example: "İki açısı 50° ve 60° olan üçgenin üçüncü açısı = 180° − (50° + 60°) = 70°"
        },
        {
            title: "Kesirlerde Genişletme",
            formula: "a/b = (a × k) / (b × k)",
            desc: "Bir kesrin payı ve paydası sıfırdan farklı aynı doğal sayı ile çarpıldığında kesre denk bir kesir elde edilir.",
            example: "2/3 kesrini 4 ile genişletirsek = (2 × 4) / (3 × 4) = 8/12"
        },
        {
            title: "Kesirlerde Sadeleştirme",
            formula: "a/b = (a ÷ k) / (b ÷ k)",
            desc: "Bir kesrin payı ve paydası ortak bir bölenine bölündüğünde kesrin değeri değişmez, daha sade yazılır.",
            example: "15/20 kesrini 5 ile sadeleştirirsek = (15 ÷ 5) / (20 ÷ 5) = 3/4"
        },
        {
            title: "Yüzde Hesaplama",
            formula: "a/100 = %a  (Paydayı 100 yap)",
            desc: "Bir bütünün 100 eş parçasından kaçının alındığını gösterir. Kesirleri genişletip veya sadeleştirip paydayı 100 yaparak yüzdeye çeviririz.",
            example: "3/5 = (3 × 20) / (5 × 20) = 60/100 = %60 | 80'in %25'i = 80 ÷ 4 = 20"
        },
        {
            title: "Olasılık Değeri (0–1)",
            formula: "0 ≤ Olasılık ≤ 1  (İmkânsız: 0, Kesin: 1)",
            desc: "Bir olayın gerçekleşme olasılığı 0 ile 1 arasında (0 ve 1 dâhil) değer alır. İmkânsız olayın olasılığı 0, kesin olayın olasılığı 1'dir.",
            example: "Standart zarda 7 gelmesi imkânsızdır (0); 7'den küçük gelmesi kesindir (1)."
        }
    ],
    "6": [
        {
            title: "2 ile Bölünebilme",
            formula: "Birler Basamağı: 0, 2, 4, 6, 8",
            desc: "Bir doğal sayının birler basamağı çift rakam ise o sayı 2 ile kalansız bölünür.",
            example: "456 sayısının birler basamağı 6 (çift) olduğu için 2'ye tam bölünür."
        },
        {
            title: "3 ile Bölünebilme",
            formula: "Rakamlar Toplamı = 3'ün katı",
            desc: "Bir doğal sayının rakamlarının sayı değerleri toplamı 3 veya 3'ün katı ise o sayı 3'e tam bölünür.",
            example: "741 → 7 + 4 + 1 = 12 (3'ün katı olduğundan 3'e tam bölünür.)"
        },
        {
            title: "4 ile Bölünebilme",
            formula: "Son İki Basamak = 00 veya 4'ün katı",
            desc: "Bir doğal sayının son iki basamağındaki sayı 00 veya 4'ün katı ise o sayı 4 ile kalansız bölünür.",
            example: "516 sayısının son iki basamağı 16 (4 × 4) olduğu için 4'e tam bölünür."
        },
        {
            title: "5 ve 10 ile Bölünebilme",
            formula: "5 için: 0 veya 5  |  10 için: 0",
            desc: "Birler basamağı 0 veya 5 olan sayılar 5'e; birler basamağı 0 olan sayılar 10'a kalansız bölünür.",
            example: "725 → 5'e tam bölünür, 10'a bölünmez. 430 → hem 5'e hem 10'a tam bölünür."
        },
        {
            title: "6 ile Bölünebilme",
            formula: "Hem 2'ye hem 3'e tam bölünme",
            desc: "Bir doğal sayı hem 2'ye (çift sayı) hem de 3'e (rakamlar toplamı 3'ün katı) tam bölünüyorsa 6'ya da tam bölünür.",
            example: "324 çifttir ve 3 + 2 + 4 = 9 (3'ün katı) olduğu için 6'ya tam bölünür."
        },
        {
            title: "9 ile Bölünebilme",
            formula: "Rakamlar Toplamı = 9'un katı",
            desc: "Bir doğal sayının rakamlarının sayı değerleri toplamı 9 veya 9'un katı ise o sayı 9'a kalansız bölünür.",
            example: "387 → 3 + 8 + 7 = 18 (9'un katı olduğundan 9'a tam bölünür.)"
        },
        {
            title: "Tümler ve Bütünler Açılar",
            formula: "Tümler: α + β = 90°  |  Bütünler: α + β = 180°",
            desc: "Ölçüleri toplamı 90° olan iki açıya tümler, ölçüleri toplamı 180° olan iki açıya bütünler açılar denir.",
            example: "35°'nin tümleri = 90° − 35° = 55° | 35°'nin bütünleri = 180° − 35° = 145°"
        },
        {
            title: "Üçgenin Alanı",
            formula: "Alan = (Taban × Yükseklik) ÷ 2",
            desc: "Bir üçgenin alanı, bir kenar uzunluğu ile o kenara ait yüksekliğin çarpımının yarısına eşittir.",
            example: "Tabanı 8 cm, yüksekliği 5 cm olan üçgenin alanı = (8 × 5) ÷ 2 = 20 cm²"
        },
        {
            title: "Paralelkenarın Alanı",
            formula: "Alan = a × h",
            desc: "Paralelkenarın alanı, bir kenar uzunluğu ile o kenara ait yüksekliğin çarpımına eşittir.",
            example: "Tabanı 6 cm, yüksekliği 4 cm olan paralelkenarın alanı = 6 × 4 = 24 cm²"
        },
        {
            title: "Alan Ölçme Birimleri",
            formula: "km² > hm² > dam² > m² > dm² > cm² > mm²",
            desc: "Alan ölçü birimlerinde aşağı inildikçe her basamakta 100 ile çarpılır, yukarı çıkıldıkça 100'e bölünür.",
            example: "1 m² = 10 000 cm²  |  3 dm² = 300 cm²  |  5000 mm² = 50 cm²"
        },
        {
            title: "Aritmetik Ortalama ve Açıklık",
            formula: "Ort = Toplam ÷ Adet  |  Açıklık = En Büyük − En Küçük",
            desc: "Verilerin toplamının veri sayısına bölümü aritmetik ortalamayı; en büyük ve en küçük veri farkı açıklığı verir.",
            example: "4, 6, 8, 10 için Ortalama = 28 ÷ 4 = 7, Açıklık = 10 − 4 = 6"
        }
    ],
    "7": [
        {
            title: "Mutlak Değer",
            formula: "|x| ≥ 0",
            desc: "Bir tam sayının sayı doğrusunda sıfıra olan uzaklığına mutlak değer denir. Uzaklık negatif olamayacağından sonuç daima sıfır veya pozitiftir.",
            example: "|-5| = 5, |+3| = 3 ve |0| = 0"
        },
        {
            title: "Tam Sayılarla Çarpma ve Bölme",
            formula: "Aynı İşaret → (+)  |  Zıt İşaret → (−)",
            desc: "Aynı işaretli iki tam sayının çarpımı veya bölümü pozitif, zıt işaretli iki tam sayının çarpımı veya bölümü negatiftir.",
            example: "(−4) × (−5) = +20  |  (−12) ÷ (+3) = −4"
        },
        {
            title: "Orantı Özelliği (İçler-Dışlar)",
            formula: "a/b = c/d  ise  a × d = b × c",
            desc: "İki oranın eşitliğine orantı denir. Bir orantıda içler çarpımı daima dışlar çarpımına eşittir.",
            example: "3/x = 6/10  →  3 × 10 = 6x  →  30 = 6x  →  x = 5"
        },
        {
            title: "Yüzde Artış ve İndirim",
            formula: "Yeni Değer = Eski ± (Eski × Yüzde / 100)",
            desc: "Bir çokluğa yüzde zam yapıldığında hesaplanan yüzde eklenir, indirim yapıldığında ise başlangıç değerinden çıkarılır.",
            example: "200 TL'lik ürüne %15 indirim = 200 − 30 = 170 TL"
        },
        {
            title: "Çokgenlerde İç Açılar Toplamı",
            formula: "İç Açılar Toplamı = (n − 2) × 180°",
            desc: "n kenarlı bir dışbükey çokgenin bir köşesinden çizilen köşegenler (n − 2) üçgen oluşturur; iç açılar toplamı (n − 2) × 180°'dir.",
            example: "Beşgenin (n = 5) iç açıları toplamı = (5 − 2) × 180° = 3 × 180° = 540°"
        },
        {
            title: "Düzgün Çokgenin Bir İç Açısı",
            formula: "Bir İç Açı = [(n − 2) × 180°] ÷ n",
            desc: "Düzgün çokgenin tüm iç açıları eşittir. İç açılar toplamını kenar sayısına (n) bölerek bir iç açısını buluruz.",
            example: "Düzgün altıgenin bir iç açısı = [(6 − 2) × 180°] ÷ 6 = 720° ÷ 6 = 120°"
        },
        {
            title: "Çokgenlerde Dış Açılar Toplamı",
            formula: "Dış Açılar Toplamı = 360°",
            desc: "Kenar sayısı kaç olursa olsun tüm dışbükey çokgenlerin dış açılarının ölçüleri toplamı daima 360°'dir.",
            example: "Üçgen, dörtgen, beşgen ve ongenin her birinin dış açıları toplamı 360°'dir."
        },
        {
            title: "Düzgün Çokgenin Bir Dış Açısı",
            formula: "Bir Dış Açı = 360° ÷ n",
            desc: "Düzgün çokgenin tüm dış açıları birbirine eşittir. 360° kenar sayısına bölünerek bir dış açı bulunur.",
            example: "Düzgün sekizgenin (n = 8) bir dış açısı = 360° ÷ 8 = 45°"
        },
        {
            title: "Eşkenar Dörtgen ve Yamuğun Alanı",
            formula: "Eşkenar D. = (e × f) / 2  |  Yamuk = [(a + c) × h] / 2",
            desc: "Eşkenar dörtgenin alanı köşegenler çarpımının yarısı; yamuğun alanı paralel tabanlar toplamı ile yüksekliğin çarpımının yarısıdır.",
            example: "Köşegenleri 6 ve 8 cm olan eşkenar dörtgen = (6 × 8)/2 = 24 cm²"
        },
        {
            title: "Çemberin Çevresi",
            formula: "Çevre = 2 × π × r  (veya π × R)",
            desc: "Çemberin çevre uzunluğu, çap uzunluğu (2r) ile pi (π) sayısının çarpımına eşittir.",
            example: "Yarıçapı 5 cm olan çemberin çevresi (π = 3) = 2 × 3 × 5 = 30 cm"
        },
        {
            title: "Çember Yayının Uzunluğu",
            formula: "Yay = 2 × π × r × (α / 360°)",
            desc: "Merkez açısı α olan çember yayının uzunluğu, tüm çember çevresinin (α / 360°) kadarıdır.",
            example: "r = 6 cm, α = 60°, π = 3 → Yay = 2 × 3 × 6 × (60/360) = 36 ÷ 6 = 6 cm"
        },
        {
            title: "Dairenin Alanı",
            formula: "Alan = π × r²",
            desc: "Yarıçapı r olan dairenin alanı, π sayısı ile yarıçapın karesinin çarpımına eşittir.",
            example: "Yarıçapı 4 cm olan dairenin alanı (π = 3) = 3 × 4² = 3 × 16 = 48 cm²"
        },
        {
            title: "Daire Diliminin Alanı",
            formula: "Dilim Alanı = π × r² × (α / 360°)",
            desc: "Merkez açısı α olan daire diliminin alanı, tam daire alanının (α / 360°) oranındaki parçasıdır.",
            example: "r = 6 cm, α = 60°, π = 3 → Alan = 3 × 36 × (60/360) = 108 ÷ 6 = 18 cm²"
        }
    ],
    "8": [
        {
            title: "EBOB-EKOK Özelliği",
            formula: "a × b = EBOB(a, b) × EKOK(a, b)",
            desc: "İki pozitif doğal sayının çarpımı, bu sayıların EBOB ve EKOK değerlerinin çarpımına eşittir. Aralarında asal sayılarda EBOB = 1, EKOK = a × b olur.",
            example: "EBOB(6, 8) = 2 ve EKOK(6, 8) = 24 → 6 × 8 = 2 × 24 = 48"
        },
        {
            title: "Üslü İfadelerde Çarpma (Aynı Taban)",
            formula: "aˣ × aʸ = aˣ⁺ʸ",
            desc: "Tabanları aynı olan üslü ifadeler çarpılırken ortak taban aynen yazılır ve üsler toplanır.",
            example: "2³ × 2⁵ = 2³⁺⁵ = 2⁸  |  3⁻² × 3⁶ = 3⁴"
        },
        {
            title: "Üslü İfadelerde Çarpma (Aynı Üs)",
            formula: "aˣ × bˣ = (a × b)ˣ",
            desc: "Üsleri eşit olan üslü ifadeler çarpılırken tabanlar çarpılır, ortak üs aynen yazılır.",
            example: "3⁴ × 2⁴ = (3 × 2)⁴ = 6⁴  |  5³ × 2³ = 10³"
        },
        {
            title: "Üslü İfadelerde Bölme (Aynı Taban)",
            formula: "aˣ ÷ aʸ = aˣ⁻ʸ  (a ≠ 0)",
            desc: "Tabanları aynı olan üslü ifadeler bölünürken payın üssünden paydanın üssü çıkarılır.",
            example: "5⁷ ÷ 5³ = 5⁷⁻³ = 5⁴  |  2⁵ ÷ 2⁻² = 2⁵⁻⁽⁻²⁾ = 2⁷"
        },
        {
            title: "Üssün Üssü",
            formula: "(aˣ)ʸ = aˣ·ʸ",
            desc: "Üslü bir ifadenin tekrar üssü alınırken taban korunur, üsler birbiriyle çarpılır.",
            example: "(2³)⁴ = 2³·⁴ = 2¹²  |  (5⁻²)³ = 5⁻⁶"
        },
        {
            title: "Bilimsel Gösterim",
            formula: "a × 10ⁿ   (1 ≤ |a| < 10)",
            desc: "Çok büyük veya çok küçük sayıları a × 10ⁿ biçiminde yazarken katsayının mutlak değeri 1'e eşit veya 1'den büyük, 10'dan küçük olmalıdır.",
            example: "21 000 000 = 2,1 × 10⁷  |  0,00045 = 4,5 × 10⁻⁴"
        },
        {
            title: "Kareköklü İfadelerde Çarpma",
            formula: "a√b × c√d = (a × c)√(b × d)",
            desc: "Kareköklü ifadeler çarpılırken katsayılar kendi aralarında, kök içindeki sayılar kendi aralarında çarpılır.",
            example: "2√3 × 4√5 = (2 × 4)√(3 × 5) = 8√15"
        },
        {
            title: "Kök Dışına Çıkarma",
            formula: "√(a² × b) = a√b   (a ≥ 0, b ≥ 0)",
            desc: "Kök içindeki sayı en büyük tam kare çarpanı ayrılacak şekilde yazılır; tam kare çarpan kök dışına karekökü alınarak çıkarılır.",
            example: "√12 = √(4 × 3) = 2√3  |  √72 = √(36 × 2) = 6√2"
        },
        {
            title: "Tam Kare Özdeşliği (Toplam)",
            formula: "(a + b)² = a² + 2ab + b²",
            desc: "İki terimin toplamının karesi: birincinin karesi, birinci ile ikincinin çarpımının iki katı ve ikincinin karesinin toplamıdır.",
            example: "(x + 3)² = x² + 6x + 9"
        },
        {
            title: "Tam Kare Özdeşliği (Fark)",
            formula: "(a − b)² = a² − 2ab + b²",
            desc: "İki terimin farkının karesi: birincinin karesi, eksi iki terimin çarpımının iki katı, artı ikincinin karesidir.",
            example: "(x − 4)² = x² − 8x + 16"
        },
        {
            title: "İki Kare Farkı Özdeşliği",
            formula: "a² − b² = (a − b)(a + b)",
            desc: "İki terimin karelerinin farkı, bu iki terimin farkı ile toplamının çarpımına eşittir.",
            example: "x² − 25 = (x − 5)(x + 5)  |  4a² − 9 = (2a − 3)(2a + 3)"
        },
        {
            title: "Eğim",
            formula: "m = Dikey Uzunluk ÷ Yatay Uzunluk",
            desc: "Doğrunun dikey değişiminin yatay değişimine oranıdır. y = mx + n denkleminde x'in katsayısı m eğimi verir.",
            example: "Dikey 4 m, yatay 5 m ise eğim = 4/5 = %80  |  y = 3x − 7 doğrusunun eğimi 3'tür."
        },
        {
            title: "Pisagor Bağıntısı",
            formula: "a² + b² = c²",
            desc: "Bir dik üçgende dik kenarların uzunluklarının kareleri toplamı, hipotenüsün (en uzun kenarın) karesine eşittir.",
            example: "Dik kenarları 3 ve 4 cm ise hipotenüs: 3² + 4² = 9 + 16 = 25 → c = 5 cm"
        },
        {
            title: "Silindirin Hacmi ve Yüzey Alanı",
            formula: "Hacim = πr²h  |  Yüzey Alanı = 2πr² + 2πrh",
            desc: "Dik dairesel silindirin hacmi taban alanı ile yüksekliğin çarpımıdır. Yüzey alanı iki daire tabanı ile yanal dikdörtgenin alanı toplamıdır.",
            example: "r = 2 cm, h = 5 cm, π = 3 → Hacim = 3 × 4 × 5 = 60 cm³, Alan = 24 + 60 = 84 cm²"
        },
        {
            title: "Basit Olayların Olma Olasılığı",
            formula: "P(A) = İstenen Olası Durum Sayısı ÷ Tüm Olası Durum Sayısı",
            desc: "Eş olasılıklı bir deneyde bir olayın olma olasılığı, istenen çıktı sayısının tüm olası çıktı sayısına bölümüdür.",
            example: "3 kırmızı, 5 mavi top arasından kırmızı çekme olasılığı = 3 / (3 + 5) = 3/8"
        }
    ]
};
