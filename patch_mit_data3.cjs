const fs = require('fs');
let code = fs.readFileSync('src/components/mit/StudentMitPanel.tsx', 'utf8');

const formulasStart = code.indexOf('const FORMULAS = {');
const questionsEnd = code.indexOf('export const StudentMitPanel =');

if (formulasStart === -1 || questionsEnd === -1) {
    console.error("Could not find insertion points");
    process.exit(1);
}

const newMockData = `const FORMULAS = {
    5: [
        { title: 'Dikdörtgenin Alanı', formula: 'A = a × b', desc: 'Dikdörtgenin alanı kısa kenar ile uzun kenar uzunluğunun çarpımıdır.', example: 'Kenarları 6 cm ve 12 cm olan dikdörtgenin alanı: 6 × 12 = 72 cm²' },
        { title: 'Üçgenin İç Açıları', formula: 'A + B + C = 180°', desc: 'Üçgenlerin iç açılarının ölçüleri toplamı 180° dir.', example: 'İki açısı 82° ve 28° olan üçgenin 3. açısı: 180 - (82+28) = 70°' },
        { title: 'Kesirlerde Toplama', formula: 'a/c + b/c = (a+b)/c', desc: 'Paydaları eşit kesirlerde paylar toplanır, ortak payda aynen yazılır.', example: '2/6 + 1/6 = 3/6' },
        { title: 'Ondalık Gösterim', formula: 'Payda 10, 100, 1000', desc: 'Paydası 10, 100 veya 1000 olan kesirler virgül ile ondalık gösterilebilir.', example: '5/10 = 0,5 (Sıfır tam onda beş)' }
    ],
    6: [
        { title: 'İşlem Önceliği', formula: '1.( ) 2.×/÷ 3.+/-', desc: 'Önce parantez içi, sonra çarpma/bölme, en son toplama/çıkarma yapılır.', example: '3 + ( 2 × 3 + 2 ) = 3 + ( 6 + 2 ) = 3 + 8 = 11' },
        { title: 'Asal Sayılar', formula: 'Sadece 1 ve kendisine bölünür', desc: 'Pozitif çarpanları sadece 1 ve kendisi olan 1 den büyük sayılardır.', example: '2, 3, 5, 7, 11, 13, 17...' },
        { title: 'Cebirsel İfadeler', formula: '3x + 5x = 8x', desc: 'Benzer terimlerin katsayıları toplanır veya çıkarılır.', example: '9a - 3a = (9-3)a = 6a' },
        { title: 'Örüntü Kuralı', formula: 'n. Terim = a.n + b', desc: 'Sabit artan örüntülerde artış miktarı n ile çarpılır.', example: '5, 8, 11... örüntüsünde kural: 3n+2' }
    ],
    7: [
        { title: 'Yüzde Hesaplama', formula: "x'in %y'si = (x × y) / 100", desc: 'Bir sayının belirtilen yüzdesini bulmak için sayıyı yüzde ile çarpıp 100 e böleriz.', example: '70 in %40 ı = (70 × 40) / 100 = 28' },
        { title: 'Yamuğun Alanı', formula: 'A = (a+c)×h / 2', desc: 'Alt ve üst taban toplamının yarısı ile yüksekliğin çarpımıdır.', example: 'Tabanları 6 ve 14, yüksekliği 8 olan yamuk: (6+14)×8/2 = 80 cm²' },
        { title: 'Eşkenar Dörtgen Alanı', formula: 'A = (e×f) / 2', desc: 'Köşegen uzunluklarının çarpımının yarısına eşittir.', example: 'Köşegenleri 20 ve 15 olan dörtgen: 20×15/2 = 150 cm²' },
        { title: 'Daire Diliminin Alanı', formula: 'A = π.r².(α/360)', desc: 'Merkez açının 360 a oranı ile daire alanının çarpımıdır.', example: 'Yarıçap 9, Açı 80°: 3×9²×(80/360) = 54 cm²' },
        { title: 'Rasyonel Sayılarda Bölme', formula: '(a/b) : (c/d) = (a/b) × (d/c)', desc: 'Birinci kesir aynen yazılır, ikinci kesir ters çevrilip çarpılır.', example: '-3/4 : 1/5 = -3/4 × 5/1 = -15/4' }
    ],
    8: [
        { title: 'Pisagor Bağıntısı', formula: 'a² + b² = c²', desc: 'Dik üçgende dik kenarların kareleri toplamı, hipotenüsün karesine eşittir.', example: 'Kenarları 3 ve 4 olan dik üçgenin hipotenüsü: 3² + 4² = c² => c = 5' },
        { title: 'Silindirin Hacmi', formula: 'V = π × r² × h', desc: 'Taban alanı ile yüksekliğin çarpımına eşittir.', example: 'r=4, h=6 olan silindir (π=3): 3×4²×6 = 288 cm³' },
        { title: 'Doğrunun Eğimi', formula: 'm = Dikey / Yatay', desc: 'Dikey uzunluğun yatay uzunluğa oranı eğimdir.', example: 'Dikey 4, yatay 5 ise eğim %80 dir (4/5 = 80/100)' },
        { title: 'Bilimsel Gösterim', formula: 'a × 10^n (1 ≤ |a| < 10)', desc: 'Sayıyı 1 ile 10 arasında yazıp 10 un kuvveti ile çarpmaktır.', example: '21 000 000 000 = 2,1 × 10^10' },
        { title: 'İki Kare Farkı Özdeşliği', formula: 'a² - b² = (a-b)(a+b)', desc: 'İki terimin karelerinin farkı, bu iki terimin toplamı ile farkının çarpımına eşittir.', example: 'x² - 16 = (x-4)(x+4)' }
    ]
};

const QUESTIONS = {
    8: [
        { id: 1, topic: 'Çarpanlar ve Katlar', q: 'A ve B aralarında asal iki sayıdır. EKOK(A,B) = 120 ve A = 8 olduğuna göre B kaçtır?', options: ['10', '12', '15', '20'], ans: '15', hint: "Aralarında asal iki sayının EKOK'u bu sayıların çarpımına eşittir. Yani A × B = 120 olmalı." },
        { id: 2, topic: 'Dik Üçgen ve Pisagor', q: 'Uzunluğu 25 m olan bir direk, 8 metrelik kısmı dik kalacak şekilde kırılarak ucu yere değiyor. Direğin uç noktası direkten ne kadar uzaktadır?', options: ['12', '15', '17', '20'], ans: '15', hint: 'Dik kenar 8, hipotenüs (25-8=17) m. Pisagor: 8² + x² = 17² => x=15.' },
        { id: 3, topic: 'Silindirin Hacmi', q: 'Yarıçapı 4 cm, yüksekliği 6 cm olan dik dairesel silindirin hacmi kaç cm³ tür? (π=3)', options: ['144', '288', '216', '312'], ans: '288', hint: 'Hacim = π.r².h formülünü kullan: 3 × 4² × 6.' },
        { id: 4, topic: 'Kareköklü İfadeler', q: 'Alanı 77 cm² olan karenin bir kenar uzunluğu hangi ardışık tam sayılar arasındadır?', options: ['6 ile 7', '7 ile 8', '8 ile 9', '9 ile 10'], ans: '8 ile 9', hint: '77 sayısı, tam kare olan 64 (8²) ile 81 (9²) arasındadır. Yani karekökü 8 ile 9 arasındadır.' },
        { id: 5, topic: 'Eğim', q: '2x + 3y = 5 doğrusunun eğimi kaçtır?', options: ['2/3', '-2/3', '3/2', '-3/2'], ans: '-2/3', hint: 'Denklemde y yi yalnız bırak: 3y = 5 - 2x => y = (5 - 2x)/3. x in katsayısı -2/3 eğimdir.' }
    ],
    7: [
        { id: 1, topic: 'Yamuğun Alanı', q: 'Alt tabanı 14 cm, üst tabanı 6 cm ve yüksekliği 8 cm olan yamuğun alanı kaç cm² dir?', options: ['60', '80', '100', '120'], ans: '80', hint: 'Yamuğun alanı: (Alt taban + Üst taban) × Yükseklik / 2 => (14+6) × 8 / 2.' },
        { id: 2, topic: 'Çember ve Daire', q: 'Yarıçapının uzunluğu 12 cm olan çeyrek çemberin uzunluğu kaç cm dir? (π=3)', options: ['18', '36', '72', '108'], ans: '18', hint: 'Önce tam çevreyi (2.π.r = 2×3×12 = 72) bul, sonra çeyrek olduğu için 4 e böl.' },
        { id: 3, topic: 'Yüzdeler', q: '200 TL lik bir ürüne önce %10 zam, ardından zamlı fiyatı üzerinden %10 indirim yapılıyor. Ürünün son fiyatı kaç TL dir?', options: ['198', '200', '202', '210'], ans: '198', hint: '200 e %10 zam yaparsan 220 TL olur. 220 nin %10 u 22 TL dir. 220 den 22 çıkar => 198 TL.' },
        { id: 4, topic: 'Rasyonel Sayılar', q: '-3/4 : 1/5 işleminin sonucu kaçtır?', options: ['-15/4', '-3/20', '15/4', '3/20'], ans: '-15/4', hint: 'Bölme işleminde birinci kesir aynen yazılır, ikinci kesir ters çevrilip çarpılır. Yani -3/4 × 5/1.' }
    ],
    6: [
        { id: 1, topic: 'İşlem Önceliği', q: '3 + ( 2 × 3 + 2 ) işleminin sonucu kaçtır?', options: ['11', '15', '13', '17'], ans: '11', hint: 'Önce parantez içi, ancak parantez içinde de önce çarpma işlemini (2 × 3) yapmalısın.' },
        { id: 2, topic: 'Örüntüler', q: '5, 8, 11... şeklinde ilerleyen sayı örüntüsünün kuralı (genel terimi) hangisidir?', options: ['3n', '3n+2', '4n+1', '5n'], ans: '3n+2', hint: 'Örüntü 3 er 3 er artıyor, demek ki 3n olmalı. n=1 verdiğimizde ilk terimin 5 çıkması için 2 eklemeliyiz (3n+2).' },
        { id: 3, topic: 'Cebirsel İfadeler', q: '5 . ( 7x + 2y ) işleminin sonucu hangisidir?', options: ['35x + 2y', '12x + 7y', '35x + 10y', '7x + 10y'], ans: '35x + 10y', hint: 'Tek terimli 5, parantez içindeki diğer iki terimle ayrı ayrı çarpılır (Dağılma Özelliği).' }
    ],
    5: [
        { id: 1, topic: 'Kesirlerde Toplama', q: '5/6 + 1/3 işleminin sonucu kaçtır?', options: ['6/9', '7/6', '6/6', '8/6'], ans: '7/6', hint: 'Paydaları eşitlemek için 1/3 kesrini 2 ile genişletmelisin.' },
        { id: 2, topic: 'Ondalık Gösterim', q: '7/20 kesrinin ondalık gösterimi aşağıdakilerden hangisidir?', options: ['0,35', '0,7', '0,07', '0,72'], ans: '0,35', hint: 'Paydayı 100 yapmak için kesri 5 ile genişletmelisin. (7×5) / (20×5) = 35 / 100 = 0,35.' }
    ]
};

`

code = code.substring(0, formulasStart) + newMockData + code.substring(questionsEnd);

fs.writeFileSync('src/components/mit/StudentMitPanel.tsx', code);
console.log("Patched curriculum data 3");
