const fs = require('fs');
let code = fs.readFileSync('src/components/mit/StudentMitPanel.tsx', 'utf8');

const formulasStart = code.indexOf('const FORMULAS = {');
const questionsStart = code.indexOf('const QUESTIONS = {');
const questionsEnd = code.indexOf('export const StudentMitPanel = ({ state, actions }: any) => {');

if (formulasStart === -1 || questionsStart === -1 || questionsEnd === -1) {
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
        { title: 'Kümelerde Kesişim', formula: 'A ∩ B', desc: 'Her iki kümede de ortak olarak bulunan elemanların oluşturduğu kümedir.', example: 'A={1,2,3}, B={3,4,5} ise A ∩ B = {3}' }
    ],
    7: [
        { title: 'Yüzde Hesaplama', formula: "x'in %y'si = (x × y) / 100", desc: 'Bir sayının belirtilen yüzdesini bulmak için sayıyı yüzde ile çarpıp 100 e böleriz.', example: '70 in %40 ı = (70 × 40) / 100 = 28' },
        { title: 'Çemberin Çevresi', formula: 'Ç = 2 × π × r', desc: 'Bir çemberin uzunluğu, çapı ile pi sayısının çarpımına eşittir.', example: 'Yarıçapı (r) 5 cm olan çemberin çevresi (π=3) = 2 × 3 × 5 = 30 cm' },
        { title: 'Yüzdeye Çevirme', formula: 'a/b = (a×n)/(b×n) = %', desc: 'Paydası 100 olmayan kesirler genişletilerek 100 yapılır.', example: '2/5 = 40/100 = %40' }
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
        { id: 1, topic: 'Yüzdeler', q: '70 in %40 ı kaçtır?', options: ['14', '28', '35', '42'], ans: '28', hint: 'Sayıyı yüze bölüp kırk ile çarpmalısın. Veya 70 i 10 a bölüp 4 ile de çarpabilirsin.' },
        { id: 2, topic: 'Yüzdeler', q: 'Bir mağazada %20 indirimle 160 TL ye satılan bir ürünün indirimsiz fiyatı kaç TL dir?', options: ['180', '192', '200', '220'], ans: '200', hint: 'Ürün %20 indirimli satılıyorsa, fiyatının %80 i ödeniyordur. Hangi sayının %80 i 160 eder?' },
        { id: 3, topic: 'Denklemler', q: '3x - 5 = 2x + 7 denklemini sağlayan x değeri kaçtır?', options: ['2', '12', '10', '5'], ans: '12', hint: 'Bilinenleri bir tarafa, bilinmeyenleri bir tarafa toplamalısın.' }
    ],
    6: [
        { id: 1, topic: 'İşlem Önceliği', q: '3 + ( 2 × 3 + 2 ) işleminin sonucu kaçtır?', options: ['11', '15', '13', '17'], ans: '11', hint: 'Önce parantez içi, ancak parantez içinde de önce çarpma işlemini (2 × 3) yapmalısın.' },
        { id: 2, topic: 'İşlem Önceliği', q: '24 × 2 ÷ 4 + 9 × ( 2 + 2 ) işleminin sonucu kaçtır?', options: ['42', '48', '36', '54'], ans: '48', hint: 'Önce parantez içi (2+2=4). Sonra soldan sağa çarpma ve bölmeler (24×2=48, 48÷4=12 ve 9×4=36). En son toplama (12+36).' },
        { id: 3, topic: 'İşlem Önceliği', q: '3 + 15 ÷ 3 işleminin sonucu kaçtır?', options: ['6', '8', '10', '12'], ans: '8', hint: 'İşlem önceliğine göre toplama işleminden önce bölme işlemi (15 ÷ 3) yapılmalıdır.' }
    ],
    5: [
        { id: 1, topic: 'Kesirlerde Toplama', q: '5/6 + 1/3 işleminin sonucu kaçtır?', options: ['6/9', '7/6', '6/6', '8/6'], ans: '7/6', hint: 'Paydaları eşitlemek için 1/3 kesrini 2 ile genişletmelisin.' },
        { id: 2, topic: 'Kesirlerde Toplama', q: '2/6 + 1/6 işleminin sonucu kaçtır?', options: ['3/12', '1/2', '4/6', '1/3'], ans: '1/2', hint: 'Paydaları eşit olan kesirlerde sadece paylar toplanır. Sonucu sadeleştirmeyi (3/6 = 1/2) unutma.' },
        { id: 3, topic: 'Dikdörtgenin Alanı', q: 'Alanı 100 m² olan bir dikdörtgenin bir kenar uzunluğu 5 m ise diğer kenarının uzunluğu kaç metredir?', options: ['15', '20', '25', '30'], ans: '20', hint: 'Alanı ve bir kenar uzunluğu verilen dikdörtgenin diğer kenar uzunluğu bulunurken, alan (100) verilen kenar uzunluğuna (5) bölünür.' }
    ]
};

`;

code = code.substring(0, formulasStart) + newMockData + code.substring(questionsEnd);

fs.writeFileSync('src/components/mit/StudentMitPanel.tsx', code);
