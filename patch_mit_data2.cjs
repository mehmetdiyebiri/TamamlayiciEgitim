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
        { title: 'Dörtgenin İç Açıları', formula: 'A + B + C + D = 360°', desc: 'Dörtgenlerin iç açılarının ölçüleri toplamı 360° dir.', example: 'Üç açısı 105°, 80°, 42° olan dörtgenin 4. açısı: 360 - 227 = 133°' },
        { title: 'Kesirlerde Toplama', formula: 'a/c + b/c = (a+b)/c', desc: 'Paydaları eşit kesirlerde paylar toplanır, ortak payda aynen yazılır.', example: '2/6 + 1/6 = 3/6' }
    ],
    6: [
        { title: 'İşlem Önceliği', formula: '1.( ) 2.×/÷ 3.+/-', desc: 'Önce parantez içi, sonra çarpma/bölme, en son toplama/çıkarma yapılır.', example: '3 + ( 2 × 3 + 2 ) = 3 + ( 6 + 2 ) = 3 + 8 = 11' },
        { title: 'Ondalık Gösterim', formula: 'Payda 10, 100, 1000', desc: 'Paydası 10, 100 veya 1000 olan kesirler virgül ile ondalık gösterilebilir.', example: '5/10 = 0,5 (Sıfır tam onda beş)' },
        { title: 'Çarpanlar', formula: 'A = a × b', desc: 'Bir sayıyı kalansız bölen sayılara o sayının çarpanı (böleni) denir.', example: '12 nin çarpanları: 1, 2, 3, 4, 6, 12' },
        { title: 'Örüntü Kuralı', formula: 'n. Terim = a.n + b', desc: 'Sabit artan örüntülerde artış miktarı n ile çarpılır.', example: '5, 8, 11... örüntüsünde kural: 3n+2' }
    ],
    7: [
        { title: 'Yüzde Hesaplama', formula: "x'in %y'si = (x × y) / 100", desc: 'Bir sayının belirtilen yüzdesini bulmak için sayıyı yüzde ile çarpıp 100 e böleriz.', example: '70 in %40 ı = (70 × 40) / 100 = 28' },
        { title: 'Çemberin Çevresi', formula: 'Ç = 2 × π × r', desc: 'Bir çemberin uzunluğu, çapı ile pi sayısının çarpımına eşittir.', example: 'Yarıçapı (r) 5 cm olan çemberin çevresi (π=3) = 2 × 3 × 5 = 30 cm' },
        { title: 'Dairenin Alanı', formula: 'A = π × r²', desc: 'Dairenin alanı pi sayısı ile yarıçapın karesinin çarpımıdır.', example: 'Yarıçapı 10 cm olan dairenin alanı (π=3) = 3 × 10² = 300 cm²' },
        { title: 'Çokgenin İç Açıları', formula: '(n - 2) × 180°', desc: 'n kenarlı bir çokgenin iç açılarının ölçüleri toplamı formülüdür.', example: 'Altıgenin iç açıları toplamı: (6-2)×180 = 720°' },
        { title: 'Çokgenin Dış Açısı', formula: '360° / n', desc: 'Düzgün çokgenin bir dış açısını verir. Tüm çokgenlerin dış açı toplamı 360°dir.', example: 'Düzgün onikigenin bir dış açısı: 360/12 = 30°' },
        { title: 'Rasyonel Sayılarda Bölme', formula: '(a/b) : (c/d) = (a/b) × (d/c)', desc: 'Birinci kesir aynen yazılır, ikinci kesir ters çevrilip çarpılır.', example: '-3/4 : 1/5 = -3/4 × 5/1 = -15/4' },
        { title: 'Ortanca (Medyan)', formula: 'Küçükten büyüğe sırala', desc: 'Sayılar küçükten büyüğe doğru sıralandığında ortadaki sayı bu dizinin medyanıdır.', example: '11, 13, 19, 22, 25 dizisinin medyanı 19 dur.' }
    ],
    8: [
        { title: 'Üslü Sayılarda Çarpma', formula: 'a^x × a^y = a^(x+y)', desc: 'Tabanları aynı olan üslü ifadeler çarpılırken üsler toplanır.', example: '2³ × 2⁴ = 2^(3+4) = 2⁷' },
        { title: 'Pisagor Bağıntısı', formula: 'a² + b² = c²', desc: 'Dik üçgende dik kenarların kareleri toplamı, hipotenüsün karesine eşittir.', example: 'Kenarları 3 ve 4 olan dik üçgenin hipotenüsü: 3² + 4² = c² => 9+16 = 25 => c = 5' },
        { title: 'İki Kare Farkı', formula: 'a² - b² = (a-b)(a+b)', desc: 'İki terimin karelerinin farkı, bu terimlerin toplamı ile farkının çarpımına eşittir.', example: 'x² - 16 = (x-4)(x+4)' },
        { title: 'Tam Kare Özdeşliği', formula: '(a+b)² = a² + 2ab + b²', desc: 'İki terimin toplamının karesi özdeşliğidir.', example: '(x+3)² = x² + 6x + 9' }
    ]
};

const QUESTIONS = {
    8: [
        { id: 1, topic: 'Çarpanlar ve Katlar', q: 'A ve B aralarında asal iki sayıdır. EKOK(A,B) = 120 ve A = 8 olduğuna göre B kaçtır?', options: ['10', '12', '15', '20'], ans: '15', hint: "Aralarında asal iki sayının EKOK'u bu sayıların çarpımına eşittir. Yani A × B = 120 olmalı." },
        { id: 2, topic: 'Üslü İfadeler', q: '2³ + 2³ + 2³ + 2³ işleminin sonucu aşağıdakilerden hangisidir?', options: ['2⁶', '2⁵', '8³', '4³'], ans: '2⁵', hint: 'Elma + Elma + Elma + Elma = 4 Elma mantığını düşün. Burada 4 tane 2³ var. 4 × 2³ işlemi yapmalısın. (4 = 2²)' },
        { id: 3, topic: 'Kareköklü İfadeler', q: '√48 sayısının a√b şeklinde yazılışı hangisidir?', options: ['2√12', '4√3', '3√4', '16√3'], ans: '4√3', hint: '48 sayısını, 16 × 3 olarak yazmayı dene.' }
    ],
    7: [
        { id: 1, topic: 'Çokgenler', q: 'Bir onbeşgenin dış açıları ölçüleri toplamı kaç derecedir?', options: ['180', '360', '540', '720'], ans: '360', hint: 'Tüm çokgenlerin (üçgen, dörtgen, onbeşgen fark etmez) dış açıları ölçüleri toplamı daima 360 derecedir.' },
        { id: 2, topic: 'Rasyonel Sayılar', q: '-3/4 : 1/5 işleminin sonucu kaçtır?', options: ['-15/4', '-3/20', '15/4', '3/20'], ans: '-15/4', hint: 'Bölme işleminde birinci kesir aynen yazılır, ikinci kesir ters çevrilip çarpılır. Yani -3/4 × 5/1 işlemini yapmalısın.' },
        { id: 3, topic: 'Oran ve Orantı', q: 'Bir duvarı 5 işçi 4 günde örüyorsa, 10 işçi aynı duvarı kaç günde örer?', options: ['2', '4', '8', '10'], ans: '2', hint: 'İşçi sayısı arttığında işin bitme süresi kısalır. Yani burada TERS orantı vardır. Karşılıklı çarpımlar eşittir: 5 × 4 = 10 × x' },
        { id: 4, topic: 'Veri Analizi', q: '25, 13, 22, 19, 11 veri grubunun ortanca değeri (medyanı) kaçtır?', options: ['13', '19', '20', '22'], ans: '19', hint: 'Medyanı bulmak için önce sayıları küçükten büyüğe sıralamalısın: 11, 13, 19, 22, 25. Ortadaki sayıyı bul.' },
        { id: 5, topic: 'Denklemler', q: '3x + 10 = 25 denklemini sağlayan x değeri kaçtır?', options: ['3', '5', '10', '15'], ans: '5', hint: '+10 u eşitliğin karşı tarafına -10 olarak gönder (25 - 10 = 15). Sonra çarpım durumundaki 3 e böl.' },
        { id: 6, topic: 'Dairenin Alanı', q: 'Yarıçapının uzunluğu 10 cm olan bir dairenin alanı kaç cm² dir? (π = 3 alınız.)', options: ['30', '60', '300', '600'], ans: '300', hint: 'Dairenin alanı π × r² formülüyle hesaplanır. Yani 3 × 10² işlemini yapmalısın.' }
    ],
    6: [
        { id: 1, topic: 'İşlem Önceliği', q: '3 + ( 2 × 3 + 2 ) işleminin sonucu kaçtır?', options: ['11', '15', '13', '17'], ans: '11', hint: 'Önce parantez içi, ancak parantez içinde de önce çarpma işlemini (2 × 3) yapmalısın.' },
        { id: 2, topic: 'Örüntüler', q: '5, 8, 11... şeklinde ilerleyen sayı örüntüsünün kuralı (genel terimi) hangisidir?', options: ['3n', '3n+2', '4n+1', '5n'], ans: '3n+2', hint: 'Örüntü 3 er 3 er artıyor, demek ki 3n olmalı. n=1 verdiğimizde ilk terimin 5 çıkması için 2 eklemeliyiz (3n+2).' },
        { id: 3, topic: 'İşlem Önceliği', q: '3 + 15 ÷ 3 işleminin sonucu kaçtır?', options: ['6', '8', '10', '12'], ans: '8', hint: 'İşlem önceliğine göre toplama işleminden önce bölme işlemi (15 ÷ 3) yapılmalıdır.' }
    ],
    5: [
        { id: 1, topic: 'Kesirlerde Toplama', q: '5/6 + 1/3 işleminin sonucu kaçtır?', options: ['6/9', '7/6', '6/6', '8/6'], ans: '7/6', hint: 'Paydaları eşitlemek için 1/3 kesrini 2 ile genişletmelisin.' },
        { id: 2, topic: 'Dikdörtgenin Alanı', q: 'Alanı 100 m² olan bir dikdörtgenin bir kenar uzunluğu 5 m ise diğer kenarının uzunluğu kaç metredir?', options: ['15', '20', '25', '30'], ans: '20', hint: 'Alanı ve bir kenar uzunluğu verilen dikdörtgenin diğer kenar uzunluğu bulunurken, alan (100) verilen kenar uzunluğuna (5) bölünür.' }
    ]
};

`

code = code.substring(0, formulasStart) + newMockData + code.substring(questionsEnd);

fs.writeFileSync('src/components/mit/StudentMitPanel.tsx', code);
console.log("Patched curriculum data");
