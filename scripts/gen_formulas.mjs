import fs from 'fs';

const formulas = {
    5: [
        { title: 'Dikdörtgenin Alanı', formula: 'Alan = a × b', desc: 'Dikdörtgenin alanı, kısa kenar ile uzun kenarın çarpımına eşittir.', example: 'Kenarları 4 cm ve 5 cm olan dikdörtgenin alanı = 4 × 5 = 20 cm²' },
        { title: 'Karenin Alanı', formula: 'Alan = a × a (a²)', desc: 'Karenin alanı, bir kenarının kendisiyle çarpımına eşittir.', example: 'Bir kenarı 6 cm olan karenin alanı = 6 × 6 = 36 cm²' },
        { title: 'Küpün Hacmi', formula: 'Hacim = a × a × a', desc: 'Küpün hacmi, üç ayrıtının uzunlukları çarpımına eşittir.', example: 'Bir ayrıtı 3 cm olan küpün hacmi = 3 × 3 × 3 = 27 cm³' },
        { title: 'Dikdörtgenler Prizmasının Hacmi', formula: 'Hacim = a × b × c', desc: 'Prizmanın hacmi; en, boy ve yükseklik değerlerinin çarpımına eşittir.', example: 'Ayrıtları 2, 3 ve 4 cm olan prizmanın hacmi = 2 × 3 × 4 = 24 cm³' },
        { title: 'Yüzde Hesaplama', formula: 'x\'in %y\'si = (x × y) / 100', desc: 'Bir sayının yüzdesini bulmak için sayıyı yüzde ile çarpıp 100\'e böleriz.', example: '200\'ün %30\'u = (200 × 30) / 100 = 60' },
        { title: 'Kesirlerde Genişletme', formula: 'a/b = (a×k)/(b×k)', desc: 'Kesrin pay ve paydası aynı sayı ile çarpıldığında kesrin değeri değişmez.', example: '2/3 kesrini 4 ile genişletirsek = (2×4)/(3×4) = 8/12' },
        { title: 'Kesirlerde Sadeleştirme', formula: 'a/b = (a÷k)/(b÷k)', desc: 'Kesrin pay ve paydası aynı sayıya bölündüğünde kesrin değeri değişmez.', example: '15/20 kesrini 5 ile sadeleştirirsek = (15÷5)/(20÷5) = 3/4' },
    ],
    6: [
        { title: '2 ile Bölünebilme', formula: 'Son Basamak: 0, 2, 4, 6, 8', desc: 'Bir sayının birler basamağı çift sayı ise o sayı 2\'ye tam bölünür.', example: '456 (Sonu 6) -> 2\'ye tam bölünür.' },
        { title: '3 ile Bölünebilme', formula: 'Rakamlar Toplamı = 3 veya 3\'ün katı', desc: 'Bir sayının rakamları toplamı 3\'ün katı ise o sayı 3\'e tam bölünür.', example: '741 -> 7+4+1=12 (3\'ün katı)' },
        { title: '4 ile Bölünebilme', formula: 'Son İki Basamak = 00 veya 4\'ün katı', desc: 'Sayının son iki basamağı 00 veya 4\'ün katı ise 4\'e tam bölünür.', example: '516 (Son iki basamak 16, 4\'ün katı)' },
        { title: '5 ile Bölünebilme', formula: 'Son Basamak: 0 veya 5', desc: 'Sayının birler basamağı 0 veya 5 ise 5\'e tam bölünür.', example: '725 (Son basamak 5)' },
        { title: '9 ile Bölünebilme', formula: 'Rakamlar Toplamı = 9 veya 9\'un katı', desc: 'Bir sayının rakamları toplamı 9\'un katı ise o sayı 9\'a tam bölünür.', example: '387 -> 3+8+7=18 (9\'un katı)' },
        { title: 'Mutlak Değer', formula: '|x| ≥ 0', desc: 'Bir sayının sıfıra olan uzaklığına mutlak değer denir ve daima pozitiftir.', example: '|-5| = 5 ve |+3| = 3' },
        { title: 'Üçgenin Alanı', formula: 'Alan = (Taban × Yükseklik) / 2', desc: 'Üçgenin alanı, bir kenarı ile o kenara ait yüksekliğin çarpımının yarısıdır.', example: 'Tabanı 8 cm, yüksekliği 5 cm olan üçgenin alanı = (8×5)/2 = 20 cm²' },
        { title: 'Paralelkenarın Alanı', formula: 'Alan = a × h', desc: 'Paralelkenarın alanı, taban uzunluğu ile o tabana ait yüksekliğin çarpımıdır.', example: 'Tabanı 6 cm, yüksekliği 4 cm olan paralelkenar alanı = 6 × 4 = 24 cm²' },
        { title: 'Çemberin Çevresi', formula: 'Çevre = 2 × π × r', desc: 'Çemberin çevresi çapı (2r) ile π (pi) sayısının çarpımıdır.', example: 'Yarıçapı 5 cm olan çemberin çevresi = 2 × 3 × 5 = 30 cm (π=3 için)' },
        { title: 'Sıvı Ölçme Birimleri', formula: '1 Litre (L) = 1 dm³ = 1000 mL', desc: 'Hacim ve sıvı ölçüleri arasındaki temel dönüşüm formülüdür.', example: '5 L = 5 dm³ = 5000 mL' }
    ],
    7: [
        { title: 'Orantı Özelliği (İçler-Dışlar)', formula: 'a/b = c/d ise a×d = b×c', desc: 'İki orantı eşitliğinde içler çarpımı dışlar çarpımına eşittir.', example: '3/x = 6/10 -> 3×10 = 6x -> 30=6x -> x=5' },
        { title: 'Çokgenlerde İç Açılar Toplamı', formula: 'İç Açılar Toplamı = (n - 2) × 180°', desc: 'n kenarlı bir çokgenin iç açılarının toplamı formülüdür.', example: 'Beşgenin (n=5) iç açıları toplamı = (5-2)×180 = 3×180 = 540°' },
        { title: 'Düzgün Çokgenin Bir İç Açısı', formula: 'İç Açı = [(n - 2) × 180°] / n', desc: 'Düzgün çokgenin tüm iç açıları birbirine eşittir.', example: 'Düzgün altıgenin bir iç açısı = [(6-2)×180]/6 = 720/6 = 120°' },
        { title: 'Çokgenlerde Dış Açılar Toplamı', formula: 'Dış Açılar Toplamı = 360°', desc: 'Bütün dışbükey çokgenlerin dış açıları toplamı daima 360 derecedir.', example: 'Üçgen, dörtgen, beşgen... hepsinin dış açılar toplamı 360° dir.' },
        { title: 'Düzgün Çokgenin Bir Dış Açısı', formula: 'Dış Açı = 360° / n', desc: 'Düzgün çokgenin dış açıları eşit olduğundan 360, kenar sayısına bölünür.', example: 'Düzgün sekizgenin bir dış açısı = 360/8 = 45°' },
        { title: 'Dairenin Alanı', formula: 'Alan = π × r²', desc: 'Yarıçapı r olan dairenin alanı pi sayısı ile yarıçapın karesinin çarpımıdır.', example: 'Yarıçapı 4 cm olan dairenin alanı (π=3) = 3 × 4² = 3 × 16 = 48 cm²' },
        { title: 'Daire Diliminin Alanı', formula: 'Dilim Alanı = π × r² × (α / 360°)', desc: 'Merkez açısı α olan daire diliminin alanıdır.', example: 'r=6 cm, α=60° -> Alan (π=3) = 3 × 36 × (60/360) = 108 × 1/6 = 18 cm²' },
        { title: 'Çember Yayının Uzunluğu', formula: 'Yay Uzunluğu = 2 × π × r × (α / 360°)', desc: 'Merkez açısı α olan çember yayının uzunluğudur.', example: 'r=6 cm, α=60° -> Yay (π=3) = 2 × 3 × 6 × (60/360) = 36 × 1/6 = 6 cm' },
        { title: 'Tam Sayılarla Çarpma ve Bölme', formula: '(-) × (-) = (+) | (-) × (+) = (-)', desc: 'Aynı işaretli sayıların çarpımı/bölümü pozitif, zıt işaretli sayıların negatiftir.', example: '(-4) × (-5) = +20 | (-12) ÷ (+3) = -4' }
    ],
    8: [
        { title: 'EBOB-EKOK Özelliği', formula: 'a × b = EBOB(a,b) × EKOK(a,b)', desc: 'İki doğal sayının çarpımı, bu sayıların EBOB ve EKOK değerlerinin çarpımına eşittir.', example: 'EBOB(6,8)=2 ve EKOK(6,8)=24 -> 6×8 = 2×24 = 48' },
        { title: 'Üslü İfadelerde Çarpma (Aynı Taban)', formula: 'a^x × a^y = a^(x+y)', desc: 'Tabanları aynı olan üslü ifadeler çarpılırken üsler toplanır.', example: '2^3 × 2^5 = 2^(3+5) = 2^8' },
        { title: 'Üslü İfadelerde Çarpma (Aynı Üs)', formula: 'a^x × b^x = (a×b)^x', desc: 'Üsleri aynı olan ifadeler çarpılırken tabanlar çarpılır, üs aynen yazılır.', example: '3^4 × 2^4 = (3×2)^4 = 6^4' },
        { title: 'Üslü İfadelerde Bölme (Aynı Taban)', formula: 'a^x / a^y = a^(x-y)', desc: 'Tabanları aynı olan üslü ifadeler bölünürken payın üssünden paydanın üssü çıkarılır.', example: '5^7 / 5^3 = 5^(7-3) = 5^4' },
        { title: 'Üssün Üssü', formula: '(a^x)^y = a^(x×y)', desc: 'Üslü bir ifadenin tekrar üssü alındığında üsler birbiriyle çarpılır.', example: '(2^3)^4 = 2^(3×4) = 2^12' },
        { title: 'Bilimsel Gösterim', formula: 'a × 10^n (1 ≤ |a| < 10)', desc: 'Sayıyı 1 ile 10 arasında (1 dahil) yazıp 10 un kuvveti ile çarpmaktır.', example: '21 000 000 000 = 2,1 × 10^10' },
        { title: 'Kareköklü İfadelerde Çarpma', formula: '√a × √b = √(a×b)', desc: 'Karekök içindeki sayılar aynı kök içinde çarpılabilir.', example: '√3 × √5 = √15' },
        { title: 'Kök Dışına Çıkarma', formula: '√(a²×b) = a√b', desc: 'Kök içindeki tam kare çarpan, kök dışına karesiz olarak çıkar.', example: '√12 = √(4×3) = √(2²×3) = 2√3' },
        { title: 'Tam Kare Özdeşliği (Toplam)', formula: '(a+b)² = a² + 2ab + b²', desc: 'İki terimin toplamının karesi: Birincinin karesi, birinci ile ikincinin çarpımının iki katı, ikincinin karesi.', example: '(x+3)² = x² + 6x + 9' },
        { title: 'Tam Kare Özdeşliği (Fark)', formula: '(a-b)² = a² - 2ab + b²', desc: 'İki terimin farkının karesi: Birincinin karesi, eksi birinci ile ikincinin çarpımının iki katı, artı ikincinin karesi.', example: '(x-4)² = x² - 8x + 16' },
        { title: 'İki Kare Farkı Özdeşliği', formula: 'a² - b² = (a-b)(a+b)', desc: 'İki terimin karelerinin farkı, bu iki terimin toplamı ile farkının çarpımına eşittir.', example: 'x² - 25 = (x-5)(x+5)' },
        { title: 'Pisagor Bağıntısı', formula: 'a² + b² = c²', desc: 'Dik üçgende dik kenarların (a, b) karelerinin toplamı hipotenüsün (c) karesine eşittir.', example: '3² + 4² = 9 + 16 = 25 = 5²' },
        { title: 'Eğim', formula: 'm = Dikey / Yatay', desc: 'Dikey uzunluğun yatay uzunluğa oranı eğimdir. Koordinat sisteminde m = (y2-y1)/(x2-x1)', example: 'Dikey 4, yatay 5 ise eğim %80 dir (4/5 = 80/100)' },
        { title: 'Silindirin Hacmi', formula: 'Hacim = π × r² × h', desc: 'Silindirin hacmi taban alanı (Daire Alanı) ile yüksekliğinin çarpımına eşittir.', example: 'r=2, h=5, π=3 -> Hacim = 3 × 4 × 5 = 60 cm³' },
        { title: 'Kürenin Hacmi', formula: 'Hacim = (4/3) × π × r³', desc: 'Yarıçapı r olan kürenin hacim formülüdür.', example: 'r=3, π=3 -> Hacim = (4/3) × 3 × 27 = 108 cm³' }
    ]
};

const tsContent = `export const FORMULAS = ${JSON.stringify(formulas, null, 4)};\n`;
fs.writeFileSync('src/data/formulas.ts', tsContent);
console.log('Formulas generated!');
