import { MitStudyQuestion, packStage } from './types';

export const GRADE_8A_QUESTIONS: MitStudyQuestion[] = [
    // =========================================================================
    // 1. KONU: Çarpanlar ve Katlar (EBOB, EKOK, Asal Çarpanlar, Aralarında Asallık)
    // =========================================================================
    ...packStage(8, 'ck', 'Çarpanlar ve Katlar', 'kolay', [
        [
            '72 sayısının asal çarpanlarının çarpımı şeklinde yazılışı aşağıdakilerden hangisidir?',
            '2³ · 3²', '2² · 3³', '2⁴ · 3', '2³ · 3',
            '72 = 8 × 9 biçiminde ayırıp asal kuvvetlere dönüştürün.',
            '72 = 8 × 9 = 2³ · 3².'
        ],
        [
            'EBOB(24, 36) kaçtır?',
            '12', '6', '18', '72',
            '24 ve 36 yı aynı anda bölen en büyük doğal sayıyı bulun.',
            '24 = 2³·3, 36 = 2²·3² ⇒ EBOB = 2²·3 = 12.'
        ],
        [
            'EKOK(12, 18) kaçtır?',
            '36', '24', '54', '72',
            '12 ve 18 in ortak katlarının en küçüğünü bulun.',
            '12 = 2²·3, 18 = 2·3² ⇒ EKOK = 2²·3² = 36.'
        ],
        [
            'Aşağıdaki sayı çiftlerinden hangisi aralarında asaldır?',
            '8 ve 15', '9 ve 12', '14 ve 21', '10 ve 25',
            'Aralarında asal sayıların 1 den başka ortak pozitif böleni yoktur.',
            'EBOB(8, 15) = 1 olduğundan 8 ve 15 aralarında asaldır.'
        ],
        [
            '60 sayısının kaç tane farklı asal çarpanı vardır?',
            '3', '2', '4', '5',
            '60 = 2² · 3 · 5 şeklinde asal çarpanlarına ayırın.',
            'Farklı asal çarpanları 2, 3 ve 5 olmak üzere 3 tanedir.'
        ],
        [
            'Aralarında asal iki doğal sayının EBOB u her zaman kaçtır?',
            '1', '0', 'Sayıların çarpımı', 'Küçük sayı',
            'Aralarında asal sayılar 1 dışında ortak bölene sahip değildir.',
            'Aralarında asal sayıların en büyük ortak böleni 1 dir.'
        ],
        [
            'Birbirinin katı olan 15 ve 45 sayılarının EKOK u kaçtır?',
            '45', '15', '90', '60',
            'Biri diğerinin katı olan iki sayının EKOK u büyük sayıya eşittir.',
            '45, 15 in katı olduğundan EKOK(15, 45) = 45 tir.'
        ]
    ]),
    ...packStage(8, 'ck', 'Çarpanlar ve Katlar', 'orta', [
        [
            'A = 2³ · 3² · 5 ve B = 2² · 3³ · 7 olduğuna göre EBOB(A, B) kaçtır?',
            '36', '72', '108', '18',
            'Ortak asal çarpanların en küçük üslü olanlarını çarpın.',
            'EBOB(A, B) = 2² · 3² = 4 × 9 = 36.'
        ],
        [
            'Aralarında asal iki sayının EKOK u 84 ve sayılardan biri 12 ise diğer sayı kaçtır?',
            '7', '14', '6', '21',
            'Aralarında asal iki sayının çarpımı EKOK larına eşittir.',
            '12 × b = 84 ⇒ b = 7 (12 ve 7 aralarında asaldır).'
        ],
        [
            'EBOB u 6, EKOK u 180 olan iki sayıdan biri 30 ise diğer sayı kaçtır?',
            '36', '24', '42', '48',
            'İki sayının çarpımı EBOB × EKOK a eşittir.',
            '30 × b = 6 × 180 = 1.080 ⇒ b = 36.'
        ],
        [
            '42 kg pirinç ve 56 kg bulgur hiç artmayacak ve birbirine karıştırılmayacak şekilde eşit ağırlıklı en büyük paketlere doldurulacaktır. En az kaç paket gerekir?',
            '7', '14', '6', '8',
            'Paket ağırlığı EBOB(42, 56) = 14 kg olmalıdır.',
            '42/14 + 56/14 = 3 + 4 = 7 paket.'
        ],
        [
            'İki zilden biri 15 dakikada, diğeri 20 dakikada bir çalmaktadır. İkisi birlikte saat 09:00 da çaldıktan sonra ilk kez saat kaçta yeniden birlikte çalarlar?',
            '10:00', '09:45', '10:15', '10:30',
            'EKOK(15, 20) dakika sonra tekrar birlikte çalarlar.',
            'EKOK(15, 20) = 60 dk = 1 saat ⇒ 09:00 + 1:00 = 10:00.'
        ],
        [
            '2x + 1 ve 15 sayıları aralarında asal olduğuna göre x yerine yazılabilecek en küçük pozitif tam sayı kaçtır?',
            '3', '1', '2', '4',
            'x = 1 ⇒ 3 (3 e bölünür), x = 2 ⇒ 5 (5 e bölünür), x = 3 ⇒ 7 (EBOB(7,15)=1).',
            'x = 3 için 2(3)+1 = 7 olur ve EBOB(7, 15) = 1 olduğundan en küçük pozitif tam sayı 3 tür.'
        ],
        [
            '84 sayısının pozitif tam sayı çarpanlarının sayısı kaçtır?',
            '12', '10', '8', '16',
            '84 = 2² · 3¹ · 7¹ dir. Üsleri 1 artırıp çarpın.',
            '(2 + 1)(1 + 1)(1 + 1) = 3 × 2 × 2 = 12 çarpan.'
        ]
    ]),
    ...packStage(8, 'ck', 'Çarpanlar ve Katlar', 'zor', [
        [
            '6 ve 8 e bölündüğünde her seferinde 3 kalanını veren 100 den büyük en küçük doğal sayı kaçtır?',
            '123', '99', '111', '147',
            'EKOK(6, 8) = 24 ün 100 den büyük katına 3 ekleyin.',
            '24 × 5 = 120 ⇒ 120 + 3 = 123.'
        ],
        [
            'Kenar uzunlukları 36 m ve 48 m olan dikdörtgen şeklindeki bahçenin etrafına köşelere de gelmek şartıyla eşit aralıklarla en az kaç fidan dikilebilir?',
            '14', '12', '16', '28',
            'Fidan aralığı EBOB(36, 48) = 12 m dir. Çevreyi 12 ye bölün.',
            'Çevre = 2(36 + 48) = 168 m ⇒ 168 / 12 = 14 fidan.'
        ],
        [
            '(a − 2) ve (b + 3) aralarında asal iki sayıdır. (a − 2) / (b + 3) = 24 / 36 olduğuna göre a + b kaçtır?',
            '4', '5', '6', '7',
            '24/36 kesrini en sade (aralarında asal) hâline getirin: 2/3.',
            'a − 2 = 2 ⇒ a = 4; b + 3 = 3 ⇒ b = 0. Toplam a + b = 4.'
        ],
        [
            'Boyutları 8 cm ve 12 cm olan dikdörtgen kartonlar yan yana ve alt alta dizilerek en küçük alanlı bir kare oluşturuluyor. En az kaç karton gerekir?',
            '6', '4', '8', '12',
            'Karenin bir kenarı EKOK(8, 12) = 24 cm olur.',
            '(24 / 8) × (24 / 12) = 3 × 2 = 6 karton.'
        ],
        [
            'EBOB(x, y) = 8 ve x + y = 56 koşulunu sağlayan x ve y pozitif tam sayıları için x · y çarpımı en çok kaç olabilir?',
            '768', '640', '512', '704',
            'x = 8a, y = 8b (a, b aralarında asal) ⇒ a + b = 7. Çarpımın en büyük olması için a ve b yakın seçilir: 3 ve 4.',
            'x = 24, y = 32 ⇒ 24 × 32 = 768.'
        ],
        [
            '120 litrelik ve 150 litrelik iki varildeki farklı zeytinyağları eşit hacimli şişelere doldurulacaktır. Şişelerin hacmi 10 litreden az tam sayı olduğuna göre en az kaç şişe gerekir?',
            '45', '27', '54', '30',
            'EBOB(120, 150) = 30 un 10 dan küçük en büyük böleni 6 dır.',
            '120/6 + 150/6 = 20 + 25 = 45 şişe.'
        ],
        [
            'İki basamaklı 2A sayısı ile 18 sayısı aralarında asal olduğuna göre A yerine kaç farklı rakam yazılabilir?',
            '3', '4', '2', '5',
            '18 in asal çarpanları 2 ve 3 tür. 2A sayısı 2 ye ve 3 e bölünmemelidir.',
            '20-29 arasında tek ve 3 e bölünmeyenler: 23, 25, 29 ⇒ A ∈ {3, 5, 9} (3 farklı rakam).'
        ]
    ]),
    ...packStage(8, 'ck', 'Çarpanlar ve Katlar', 'sinav', [
        [
            'Yürüyüş yolunun başlangıç ve bitiş noktaları dahil olmak üzere iki kenarındaki lambaların kaç kez aynı hizaya geldiği bulunur?',
            '5', '4', '6', '3',
            'Lambalar EKOK(18, 24) = 72 m de bir aynı hizaya gelir. Başlangıcı (0. metre) unutmayın!',
            '288 / 72 = 4 aralık ⇒ 4 + 1 = 5 kez aynı hizaya gelirler.',
            '288 metre uzunluğundaki düz bir yürüyüş yolunun bir kenarına 18 m, diğer kenarına 24 m aralıklarla başlangıç noktasından itibaren aydınlatma direkleri dikilecektir.'
        ],
        [
            'İki farklı markanın kedi mamaları aynı toplam tutara satın alınmıştır. Ödenen toplam tutar 1.000 TL den fazla olduğuna göre en az kaç TL ödenmiştir?',
            '1.200', '1.080', '1.140', '1.440',
            'Her iki pakete ödenen tutar EKOK(120, 150) = 600 TL nin katı olmalıdır.',
            '1.000 TL den büyük en küçük 600 katı 1.200 TL dir. (A dan 10 paket, B den 8 paket).',
            'Bir petshopta A marka mamanın paketi 120 TL, B marka mamanın paketi 150 TL dir. Barınak yetkilisi her iki markadan da eşit toplam tutarda (her biri için ayrı ayrı eşit) mama almıştır.'
        ],
        [
            'Buna göre dikdörtgen bahçenin alanı en fazla kaç m² olabilir?',
            '56', '48', '60', '52',
            'Kenarlar tam sayı, aralarında asal ve 2(a+b) = 30 ⇒ a + b = 15. En büyük alan yakın sayılarla: 7 ve 8.',
            '7 + 8 = 15 ve EBOB(7, 8) = 1 ⇒ Alan = 7 × 8 = 56 m².',
            'Çevresi 30 m olan dikdörtgen şeklindeki bir hobi bahçesinin metre cinsinden kenar uzunlukları aralarında asal iki tam sayıdır.'
        ],
        [
            'İki farklı raftaki kitaplar hiç boşluk kalmadan sığdığına göre, bu iki kitaplığın raf uzunluğu 300 cm den az olmak şartıyla en fazla kaç cm olabilir?',
            '288', '264', '240', '276',
            'Raf uzunluğu EKOK(12, 16) = 48 cm nin katıdır.',
            '300 den küçük en büyük 48 katı 48 × 6 = 288 cm dir.',
            'Eşit uzunluktaki iki kütüphane rafından üst rafa 12 cm kalınlığındaki ansiklopediler, alt rafa 16 cm kalınlığındaki klasörler boşluk kalmadan yan yana dizilebilmektedir.'
        ],
        [
            'Kare şeklindeki fayansların bir kenar uzunluğu tam sayı olmak üzere, bu zemin en az kaç fayansla kaplanabilir?',
            '20', '16', '24', '15',
            'Fayans kenarı EBOB(240, 300) = 60 cm seçilirse en az fayans kullanılır.',
            '(240 / 60) × (300 / 60) = 4 × 5 = 20 fayans.',
            'Eni 240 cm, boyu 300 cm olan dikdörtgen bir banyo zemini hiç kesilmeden eş kare fayanslarla kaplanacaktır.'
        ],
        [
            'Buna göre okulun koridorundaki dolaplardan hem 4 ün hem 6 nın katı olan numaralı dolapların sayısı kaçtır?',
            '8', '7', '9', '10',
            'Hem 4 ün hem 6 nın katı olan sayılar EKOK(4, 6) = 12 nin katlarıdır.',
            '100 / 12 = 8 tam bölüm (12, 24, 36, 48, 60, 72, 84, 96) ⇒ 8 dolap.',
            'Bir okul koridorunda 1 den 100 e kadar numaralandırılmış 100 adet öğrenci dolabı vardır.'
        ],
        [
            'İki ayrı demir çubuk hiç artmayacak şekilde eşit ve en uzun tam sayı parçalara ayrılacaktır. Bu işlem için toplam en az kaç kesim yapılır?',
            '9', '11', '10', '8',
            'Parça uzunluğu EBOB(75, 90) = 15 cm dir. Her çubukta (parça sayısı − 1) kesim yapılır!',
            '75/15 = 5 parça (4 kesim); 90/15 = 6 parça (5 kesim). Toplam = 4 + 5 = 9 kesim.',
            'Atölyede 75 cm ve 90 cm uzunluğundaki iki demir çubuk tek tek kesilerek en büyük eş uzunlukta parçalara bölünecektir.'
        ]
    ]),

    // =========================================================================
    // 2. KONU: Üslü Sayılar (Negatif Üs, Kurallar, Çözümleme, Bilimsel Gösterim)
    // =========================================================================
    ...packStage(8, 'us', 'Üslü Sayılar', 'kolay', [
        [
            '2⁻³ üslü ifadesinin değeri kaçtır?',
            '1/8', '-8', '-6', '1/6',
            'Negatif üs sayıyı çarpmaya göre ters çevirir: a⁻ⁿ = 1 / aⁿ.',
            '2⁻³ = 1 / 2³ = 1/8.'
        ],
        [
            '3⁴ · 3² çarpımının sonucu aşağıdakilerden hangisidir?',
            '3⁶', '3⁸', '9⁶', '3²',
            'Tabanlar aynı iken çarpmada üsler toplanır.',
            '3⁴⁺² = 3⁶.'
        ],
        [
            '5⁷ / 5³ bölümünün sonucu kaçtır?',
            '5⁴', '5¹⁰', '1⁴', '5²',
            'Tabanlar aynı iken bölmede payın üssünden paydanın üssü çıkarılır.',
            '5⁷⁻³ = 5⁴.'
        ],
        [
            '(2³)⁴ üslü ifadesinin eşiti hangisidir?',
            '2¹²', '2⁷', '8⁴', '2⁸¹',
            'Üssün üssü alınırken üsler çarpılır.',
            '2³ˣ⁴ = 2¹².'
        ],
        [
            '450.000 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?',
            '4,5 × 10⁵', '45 × 10⁴', '0,45 × 10⁶', '4,5 × 10⁴',
            'Bilimsel gösterim a × 10ⁿ biçimindedir ve 1 ≤ |a| < 10 olmalıdır.',
            '450.000 = 4,5 × 10⁵.'
        ],
        [
            '(-5)⁰ + 3⁻¹ işleminin sonucu kaçtır?',
            '4/3', '2/3', '-2/3', '1/3',
            '(-5)⁰ = 1 ve 3⁻¹ = 1/3 tür.',
            '1 + 1/3 = 4/3.'
        ],
        [
            '2⁵ · 5⁵ çarpımının sonucu kaçtır?',
            '10⁵', '7⁵', '10¹⁰', '10²⁵',
            'Üsler aynı iken tabanlar çarpılır.',
            '(2 × 5)⁵ = 10⁵.'
        ]
    ]),
    ...packStage(8, 'us', 'Üslü Sayılar', 'orta', [
        [
            '8⁴ sayısı 2 tabanında nasıl yazılır?',
            '2¹²', '2⁷', '2¹⁶', '2⁶',
            '8 = 2³ yazıp üssün üssünü alın.',
            '(2³)⁴ = 2¹².'
        ],
        [
            '0,00032 sayısının bilimsel gösterimi hangisidir?',
            '3,2 × 10⁻⁴', '3,2 × 10⁻⁵', '32 × 10⁻⁵', '0,32 × 10⁻³',
            'Virgülü 4 basamak sağa kaydırarak 3,2 elde ederiz; üs 4 azalır.',
            '0,00032 = 3,2 × 10⁻⁴.'
        ],
        [
            '27² · 9⁻² işleminin sonucu kaçtır?',
            '9', '3', '27', '1/3',
            'Her iki sayıyı 3 tabanında yazın: 27 = 3³, 9 = 3².',
            '(3³)² · (3²)⁻² = 3⁶ · 3⁻⁴ = 3² = 9.'
        ],
        [
            '4 · 10² + 7 · 10⁰ + 5 · 10⁻¹ + 2 · 10⁻³ çözümlenmiş hâli verilen ondalık sayı hangisidir?',
            '407,502', '47,52', '407,52', '470,502',
            'Olmayan basamaklara (10¹ ve 10⁻²) 0 yazmayı unutmayın.',
            '400 + 7 + 0,5 + 0,002 = 407,502.'
        ],
        [
            '(1/3)⁻² + (-2)⁻³ işleminin sonucu kaçtır?',
            '71/8', '73/8', '65/8', '-71/8',
            '(1/3)⁻² = 9 ve (-2)⁻³ = -1/8 dir.',
            '9 − 1/8 = 72/8 − 1/8 = 71/8.'
        ],
        [
            '4¹⁰ sayısının yarısı kaçtır?',
            '2¹⁹', '2¹⁰', '4⁵', '2⁹',
            '4¹⁰ = (2²)¹⁰ = 2²⁰ dir. Yarısı 2¹ e bölünerek bulunur.',
            '2²⁰ / 2¹ = 2¹⁹.'
        ],
        [
            '12⁶ / 6⁶ bölümünün sonucu kaçtır?',
            '64', '32', '12', '2',
            'Üsler aynıyken tabanlar bölünür.',
            '(12 / 6)⁶ = 2⁶ = 64.'
        ]
    ]),
    ...packStage(8, 'us', 'Üslü Sayılar', 'zor', [
        [
            '2⁵ · 5⁷ çarpımı kaç basamaklı bir doğal sayıdır?',
            '7', '6', '8', '5',
            '2⁵ · 5⁵ · 5² = 25 · 10⁵ biçiminde düzenleyin.',
            '25 in yanına 5 sıfır gelir: 2 + 5 = 7 basamaklıdır.'
        ],
        [
            '3ˣ = 5 olduğuna göre 3ˣ⁺² ifadesinin değeri kaçtır?',
            '45', '25', '15', '125',
            '3ˣ⁺² = 3ˣ · 3² olarak parçalayın.',
            '5 × 9 = 45.'
        ],
        [
            '(2⁴ + 2⁴ + 2⁴ + 2⁴) / 8² işleminin sonucu kaçtır?',
            '1', '2', '4', '1/2',
            'Pay = 4 · 2⁴ = 2² · 2⁴ = 2⁶. Payda = (2³)² = 2⁶.',
            '2⁶ / 2⁶ = 1.'
        ],
        [
            'a = 2⁶⁰, b = 3⁴⁰, c = 5²⁰ sayılarının küçükten büyüğe sıralanışı hangisidir?',
            'c < a < b', 'a < b < c', 'c < b < a', 'b < a < c',
            'Tüm üsleri 20 ye eşitleyin: (2³)²⁰, (3²)²⁰, 5²⁰.',
            'a = 8²⁰, b = 9²⁰, c = 5²⁰ ⇒ c < a < b.'
        ],
        [
            '(-2)⁻⁴ · (-4)³ / (-8)⁻² işleminin sonucu kaçtır?',
            '-256', '256', '-64', '64',
            'İşaretleri ayrı belirleyin: (+) · (−) / (+) = (−). Sonra 2 tabanına çevirin.',
            '-(2⁻⁴ · 2⁶ / 2⁻⁶) = -(2² / 2⁻⁶) = -2⁸ = -256.'
        ],
        [
            '0,048 × 10⁹ = 4,8 × 10ᵃ ve 620 × 10⁻⁵ = 6,2 × 10ᵇ ise a + b kaçtır?',
            '4', '5', '3', '10',
            '0,048 × 10⁹ = 4,8 × 10⁷ (a=7); 620 × 10⁻⁵ = 6,2 × 10⁻³ (b=-3).',
            'a + b = 7 + (-3) = 4.'
        ],
        [
            'Bir bakteri türü her 20 dakikada bir ikiye bölünerek çoğalmaktadır. Başlangıçta 4 bakteri varsa 2 saat sonunda kaç bakteri olur?',
            '2⁸', '2⁶', '2⁷', '2⁹',
            '2 saat = 120 dakika ⇒ 120/20 = 6 bölünme gerçekleşir.',
            '4 · 2⁶ = 2² · 2⁶ = 2⁸ bakteri.'
        ]
    ]),
    ...packStage(8, 'us', 'Üslü Sayılar', 'sinav', [
        [
            'Bu ağaçların 1 yılda ürettiği toplam oksijen miktarının kilogram cinsinden bilimsel gösterimi hangisidir?',
            '2,4 × 10⁷', '24 × 10⁶', '2,4 × 10⁶', '2,4 × 10⁸',
            '2 × 10⁵ ağaç × 120 kg = 240 × 10⁵ kg = 2,4 × 10⁷ kg.',
            '2 × 10⁵ × 1,2 × 10² = 2,4 × 10⁷ kg.',
            'Bir ağaçlandırma projesinde 2 × 10⁵ adet fidan dikilmiştir. Yetişkin bir ağacın yılda ortalama 120 kg oksijen ürettiği bilinmektedir.'
        ],
        [
            'Kâğıt 6 kez üst üste tam ortadan ikiye katlandığında elde edilen kâğıt destesi toplam kaç mm kalınlığında olur?',
            '3,2', '6,4', '1,6', '12,8',
            '6 katlamada 2⁶ = 64 kat oluşur. 64 × 0,05 mm hesaplayın.',
            '64 × 5 × 10⁻² = 320 × 10⁻² = 3,2 mm.',
            'Kalınlığı 0,05 mm (5 × 10⁻² mm) olan bir kâğıt yaprağı art arda 6 kez ortadan ikiye katlanıyor.'
        ],
        [
            'Bu güneş paneli tarlasının 1 günde ürettiği enerjinin kWh cinsinden 2 tabanında gösterimi hangisidir?',
            '2¹⁶', '2¹⁵', '2¹⁴', '2¹⁸',
            'Panel sayısı 4⁵ = 2¹⁰, panel başı üretim 8² = 2⁶ kWh.',
            '2¹⁰ × 2⁶ = 2¹⁶ kWh.',
            'Bir enerji sahasında 4⁵ adet güneş paneli kuruludur ve her bir panel günde ortalama 8² kWh elektrik üretmektedir.'
        ],
        [
            'Dünya ile Güneş arasındaki mesafenin metre cinsinden bilimsel gösterimi hangisidir? (1 km = 10³ m)',
            '1,5 × 10¹¹', '1,5 × 10⁸', '15 × 10¹⁰', '1,5 × 10¹⁰',
            '150.000.000 km = 1,5 × 10⁸ km. Metreye çevirmek için 10³ ile çarpın.',
            '1,5 × 10⁸ × 10³ = 1,5 × 10¹¹ m.',
            'Astronomi dergisinde Dünya ile Güneş arasındaki ortalama mesafe 150 milyon kilometre olarak verilmiştir.'
        ],
        [
            'Bu veri merkezindeki 16² adet sunucunun her birinde 8⁴ GB depolama alanı vardır. Toplam kapasite kaç TB tır? (1 TB = 2¹⁰ GB)',
            '2¹⁰', '2⁸', '2¹²', '2²⁰',
            'Toplam GB = (2⁴)² × (2³)⁴ = 2⁸ × 2¹² = 2²⁰ GB.',
            '2²⁰ / 2¹⁰ = 2¹⁰ TB.',
            'Yeni kurulan veri merkezinde özdeş 16² sunucu bulunmakta ve her sunucu 8⁴ GB veri depolayabilmektedir.'
        ],
        [
            'Bir sporcunun 4 günlük koşu mesafeleri çözümlenmiş hâlde verilmiştir. En uzun mesafeyi hangi gün koşmuştur?',
            'Çarşamba (12,45 km)', 'Pazartesi (12,405 km)', 'Salı (12,095 km)', 'Perşembe (12,449 km)',
            'Ondalık basamakları onda birlerden başlayarak karşılaştırın.',
            '12,450 > 12,449 > 12,405 > 12,095 ⇒ En uzun mesafe Çarşamba (1·10¹+2·10⁰+4·10⁻¹+5·10⁻²).',
            'Koşucunun 4 günlük antrenman kayıtları: Pzt 1·10¹+2·10⁰+4·10⁻¹+5·10⁻³, Sal 1·10¹+2·10⁰+9·10⁻²+5·10⁻³, Çar 1·10¹+2·10⁰+4·10⁻¹+5·10⁻², Per 1·10¹+2·10⁰+4·10⁻¹+4·10⁻²+9·10⁻³ km.'
        ],
        [
            'Bir fabrika her 8 günde 2¹¹ adet vida üretiyor. Fabrika 32 günde ürettiği tüm vidaları her biri 2⁷ vida alan kutulara koyarsa kaç kutu gerekir?',
            '2⁶', '2⁵', '2⁷', '2⁸',
            '32 gün = 4 dönem (2²). Toplam vida = 2² · 2¹¹ = 2¹³.',
            'Kutu sayısı = 2¹³ / 2⁷ = 2⁶ = 64 kutu.',
            'Otomasyon hattında sabit hızla her 8 günde 2¹¹ adet vida üretilip 2⁷ şer adetlik kutulara paketlenmektedir.'
        ]
    ]),

    // =========================================================================
    // 3. KONU: Köklü Sayılar (Tam Kare, a√b, Dört İşlem, Gerçek Sayılar)
    // =========================================================================
    ...packStage(8, 'ks', 'Köklü Sayılar', 'kolay', [
        [
            '√169 + √81 işleminin sonucu kaçtır?',
            '22', '21', '23', '20',
            '169 = 13² ve 81 = 9² dir.',
            '13 + 9 = 22.'
        ],
        [
            '√45 sayısı hangi ardışık iki tam sayı arasındadır?',
            '6 ile 7', '5 ile 6', '7 ile 8', '4 ile 5',
            '45 ten küçük ve büyük en yakın tam kareler 36 ve 49 dur.',
            '√36 < √45 < √49 ⇒ 6 < √45 < 7.'
        ],
        [
            '√72 ifadesinin a√b biçiminde en sade yazılışı hangisidir?',
            '6√2', '4√3', '3√8', '8√2',
            '72 = 36 × 2 şeklinde tam kare çarpan ayırın.',
            '√(36 × 2) = 6√2.'
        ],
        [
            '3√5 ifadesinde katsayı kök içine alındığında hangi sayı elde edilir?',
            '√45', '√15', '√75', '√25',
            'Katsayının karesini alıp kök içiyle çarpın: √(3² × 5).',
            '√(9 × 5) = √45.'
        ],
        [
            '√3 · √12 çarpımının sonucu kaçtır?',
            '6', '36', '3√2', '4√3',
            'Kök içlerini çarpın: √(3 × 12) = √36.',
            '√36 = 6.'
        ],
        [
            '4√2 + 5√2 − 3√2 işleminin sonucu nedir?',
            '6√2', '6√6', '12√2', '9√2',
            'Kök içleri aynıyken yalnızca katsayılar toplanır/çıkarılır.',
            '(4 + 5 − 3)√2 = 6√2.'
        ],
        [
            'Aşağıdaki sayılardan hangisi irrasyonel bir sayıdır?',
            '√18', '√49', '0,25', '3/7',
            'Kök dışına tam çıkamayan karekökler irrasyoneldir.',
            '18 tam kare olmadığından √18 = 3√2 irrasyonel sayıdır.'
        ]
    ]),
    ...packStage(8, 'ks', 'Köklü Sayılar', 'orta', [
        [
            '√50 + √32 − √18 işleminin sonucu kaçtır?',
            '6√2', '4√2', '8√2', '5√2',
            'Her terimi a√2 şeklinde yazın: 5√2, 4√2, 3√2.',
            '5√2 + 4√2 − 3√2 = 6√2.'
        ],
        [
            '√0,36 + √1,21 işleminin sonucu kaçtır?',
            '1,7', '1,5', '1,9', '0,17',
            '√(36/100) = 0,6 ve √(121/100) = 1,1 dir.',
            '0,6 + 1,1 = 1,7.'
        ],
        [
            '√75 sayısı aşağıdakilerden hangisi ile çarpılırsa sonuç bir doğal sayı olur?',
            '√12', '√18', '√20', '√8',
            '√75 = 5√3 tür. Sonucun doğal sayı olması için diğer çarpan da k√3 biçiminde olmalıdır.',
            '√12 = 2√3 ⇒ 5√3 × 2√3 = 30 (doğal sayı).'
        ],
        [
            '6√18 ÷ 2√2 işleminin sonucu kaçtır?',
            '9', '3√3', '6', '18',
            'Katsayıları katsayıya, kök içini kök içine bölün.',
            '(6/2) · √(18/2) = 3 · √9 = 3 × 3 = 9.'
        ],
        [
            'Alanı 108 cm² olan bir karenin çevresi kaç cm dir?',
            '24√3', '12√3', '18√3', '36√3',
            'Bir kenar √108 = 6√3 cm dir.',
            'Çevre = 4 × 6√3 = 24√3 cm.'
        ],
        [
            '√110 sayısı hangi tam sayıya daha yakındır?',
            '10', '11', '9', '12',
            '100 ile 121 arasında 110 un uzaklıklarını karşılaştırın: 100 e 10 birim, 121 e 11 birim.',
            '110 − 100 = 10 < 121 − 110 = 11 olduğundan 10 a daha yakındır.'
        ],
        [
            'a = 5√2, b = 4√3, c = 3√6 sayılarının büyükten küçüğe sıralanışı hangisidir?',
            'c > a > b', 'a > c > b', 'b > c > a', 'c > b > a',
            'Katsayıları kök içine alın: a = √50, b = √48, c = √54.',
            '√54 > √50 > √48 ⇒ c > a > b.'
        ]
    ]),
    ...packStage(8, 'ks', 'Köklü Sayılar', 'zor', [
        [
            '√(30 + √(40 − √16)) işleminin sonucu kaçtır?',
            '6', '5', '7', '8',
            'En içteki kökten başlayarak dışa doğru hesaplayın.',
            '√16 = 4 ⇒ √(40 − 4) = √36 = 6 ⇒ √(30 + 6) = √36 = 6.'
        ],
        [
            'Sayı doğrusunda √15 ile √85 arasında kaç tane tam sayı vardır?',
            '6', '5', '7', '8',
            '√15 ≈ 3,87 ve √85 ≈ 9,22 dir.',
            'Aradaki tam sayılar: 4, 5, 6, 7, 8, 9 olmak üzere 6 tanedir.'
        ],
        [
            'Kenar uzunlukları √48 cm ve √27 cm olan dikdörtgenin alanı kaç cm² dir?',
            '36', '18√3', '24', '48',
            '√48 = 4√3 ve √27 = 3√3 tür.',
            '4√3 × 3√3 = 12 × 3 = 36 cm².'
        ],
        [
            '√(1,44) / √(0,09) + √(0,64) işleminin sonucu kaçtır?',
            '4,8', '4,4', '5,2', '3,8',
            '1,2 / 0,3 + 0,8 işlemini yapın.',
            '4 + 0,8 = 4,8.'
        ],
        [
            'x = √2 ve y = √3 olduğuna göre √72 nin x ve y türünden eşiti hangisidir?',
            'x³ · y²', 'x² · y³', 'x³ · y', 'x² · y²',
            '72 = 2³ · 3² olduğundan √72 = (√2)³ · (√3)² dir.',
            'x³ · y².'
        ],
        [
            'Çevresi √300 cm olan eşkenar üçgen ile aynı çevreye sahip karenin bir kenarı kaç cm dir?',
            '2,5√3', '5√3', '3√3', '4√3',
            '√300 = 10√3 cm dir. Karenin bir kenarı 10√3 / 4 tür.',
            '10√3 / 4 = 2,5√3 cm.'
        ],
        [
            '0,4̄ (devirli ondalık) sayısının karekökü hangi rasyonel sayıya eşittir?',
            '2/3', '2/9', '4/9', '1/3',
            '0,4̄ = 4/9 olarak kesre çevirin, sonra karekök alın.',
            '√(4/9) = 2/3.'
        ]
    ]),
    ...packStage(8, 'ks', 'Köklü Sayılar', 'sinav', [
        [
            'Buna göre dikdörtgen kartondan kesilip atılan artık kısmın alanı kaç cm² dir?',
            '24', '16', '20', '28',
            'Dikdörtgen alanı = √98 × √32 = 7√2 × 4√2 = 56 cm². Kesilen en büyük karenin kenarı 4√2 cm ⇒ alanı 32 cm².',
            'Artık alan = 56 − 32 = 24 cm².',
            'Kenar uzunlukları √98 cm ve √32 cm olan dikdörtgen bir kartondan kenarı olabilecek en büyük kare kesilip çıkarılıyor.'
        ],
        [
            'A noktasından başlayan bir karınca sayı doğrusu boyunca sağa doğru √75 birim ilerlerse hangi iki tam sayı arasında durur?',
            '10 ile 11', '9 ile 10', '11 ile 12', '8 ile 9',
            '√75, √64 (=8) ile √81 (=9) arasındadır. Başlangıç noktası 2 ye ekleyin.',
            '2 + (8 ile 9 arası) ⇒ 10 ile 11 arasında durur.',
            'Sayı doğrusu üzerinde A = 2 noktasında bulunan bir karınca pozitif yönde √75 birim yürüyor.'
        ],
        [
            'Yan yana bitişik yerleştirilen bu üç karenin alt kenarlarının oluşturduğu toplam uzunluk kaç cm dir?',
            '12√2', '10√2', '14√2', '11√2',
            'Alanların kareköklerini alıp toplayın: √18 + √32 + √50.',
            '3√2 + 4√2 + 5√2 = 12√2 cm.',
            'Alanları sırasıyla 18 cm², 32 cm² ve 50 cm² olan üç kare tabanları aynı doğru üzerinde olacak biçimde yan yana yerleştiriliyor.'
        ],
        [
            'Ölçülen boy uzunluğu cetvelde hangi tam sayıya en yakındır?',
            '7', '6', '8', '5',
            '45 sayısının hangi tam kare sayıya (36 mı, 49 mu) daha yakın olduğunu karşılaştırın.',
            '√36 = 6, √49 = 7. 45 sayısı 49 a (4 fark) 36 dan (9 fark) daha yakın olduğundan 7 cm ye en yakındır.',
            'Bir laboratuvar ölçümünde metal çubuğun boyu √45 cm olarak hesaplanmıştır.'
        ],
        [
            'Bir kenarı √12 m olan kare şeklindeki bahçenin etrafına 3 sıra tel çekilecektir. En az kaç tam metre tel satın alınmalıdır?',
            '42', '41', '40', '44',
            '3 sıra tel = 3 × 4√12 = 12√12 = 24√3 = √1728 m dir.',
            '41² = 1681 < 1728 < 1764 = 42² olduğundan en az 42 metre tel gerekir.',
            'Çiftçi, kenar uzunluğu √12 metre olan kare bahçesinin etrafına 3 sıra tel çekmek için metrelik tam sayı uzunlukta tel alacaktır.'
        ],
        [
            'Kenarları √80 cm ve √20 cm olan dikdörtgen bir levha, alanı 5 cm² olan eş karelere bölündüğünde kaç kare elde edilir?',
            '8', '10', '6', '16',
            'Levhanın alanı = 4√5 × 2√5 = 40 cm² dir.',
            '40 / 5 = 8 adet eş kare elde edilir.',
            'Tasarım dersinde √80 cm × √20 cm boyutlarındaki ahşap levha, her biri 5 cm² alanlı eş karelere ayrılıyor.'
        ],
        [
            '√200 m uzunluğundaki bir ip her seferinde tam ortadan ikiye katlanıp kesilerek 4 eş parçaya ayrılıyor. Her parçanın uzunluğu kaç metredir?',
            '2,5√2', '5√2', '4√2', '2√2',
            '√200 = 10√2 m dir. 4 eş parçaya bölün.',
            '10√2 / 4 = 2,5√2 m.',
            'İzci kampında √200 metre uzunluğundaki halat 4 çadır için eşit uzunlukta parçalara bölünüyor.'
        ]
    ]),

    // =========================================================================
    // 4. KONU: Cebirsel İfadeler (Çarpma, Özdeşlikler, Çarpanlara Ayırma)
    // =========================================================================
    ...packStage(8, 'ci', 'Cebirsel İfadeler', 'kolay', [
        [
            '3x · (2x − 5) çarpımının sonucu aşağıdakilerden hangisidir?',
            '6x² − 15x', '6x − 15x', '5x² − 15x', '6x² − 5',
            '3x terimini parantez içindeki her terimle çarpın.',
            '3x · 2x − 3x · 5 = 6x² − 15x.'
        ],
        [
            '(x + 4)² özdeşliğinin açılımı aşağıdakilerden hangisidir?',
            'x² + 8x + 16', 'x² + 16', 'x² + 4x + 16', 'x² + 8x + 8',
            '(a + b)² = a² + 2ab + b².',
            'x² + 2(x)(4) + 4² = x² + 8x + 16.'
        ],
        [
            '(x − 3)² özdeşliğinin açılımı hangisidir?',
            'x² − 6x + 9', 'x² − 9', 'x² − 3x + 9', 'x² + 6x + 9',
            '(a − b)² = a² − 2ab + b².',
            'x² − 6x + 9.'
        ],
        [
            'x² − 25 ifadesinin çarpanlarına ayrılmış hâli hangisidir?',
            '(x − 5)(x + 5)', '(x − 5)²', '(x + 5)²', 'x(x − 25)',
            'İki kare farkı özdeşliği: a² − b² = (a − b)(a + b).',
            'x² − 5² = (x − 5)(x + 5).'
        ],
        [
            '4x² − 12x ifadesinin ortak çarpan parantezine alınmış hâli hangisidir?',
            '4x(x − 3)', '4(x² − 3)', '2x(2x − 12)', 'x(4x − 3)',
            '4x² ve 12x terimlerinin en büyük ortak çarpanı 4x tir.',
            '4x(x − 3).'
        ],
        [
            '5x² − 3xy + 7y − 9 cebirsel ifadesinin katsayılar toplamı kaçtır?',
            '0', '9', '18', '-2',
            'Tüm terimlerin işaretli katsayılarını toplayın: 5 + (-3) + 7 + (-9).',
            '5 − 3 + 7 − 9 = 0.'
        ],
        [
            '(a − 7)(a + 7) çarpımının sonucu nedir?',
            'a² − 49', 'a² + 49', 'a² − 14a + 49', 'a² − 14',
            'İki kare farkı özdeşliğini kullanın.',
            'a² − 7² = a² − 49.'
        ]
    ]),
    ...packStage(8, 'ci', 'Cebirsel İfadeler', 'orta', [
        [
            '(2x + 3)² özdeşliğinin açılımı hangisidir?',
            '4x² + 12x + 9', '4x² + 6x + 9', '2x² + 12x + 9', '4x² + 9',
            '(2x)² + 2(2x)(3) + 3².',
            '4x² + 12x + 9.'
        ],
        [
            '9x² − 16y² ifadesinin çarpanlarına ayrılmış biçimi hangisidir?',
            '(3x − 4y)(3x + 4y)', '(9x − 4y)(x + 4y)', '(3x − 4y)²', '(3x − 8y)(3x + 8y)',
            '(3x)² − (4y)² şeklinde iki kare farkı yazın.',
            '(3x − 4y)(3x + 4y).'
        ],
        [
            'x² − 10x + 25 ifadesinin çarpanlarına ayrılmış hâli nedir?',
            '(x − 5)²', '(x + 5)²', '(x − 5)(x + 5)', '(x − 10)²',
            'Birinci terim x², son terim 5², ortadaki −2·x·5 tir.',
            '(x − 5)².'
        ],
        [
            '(x + 2)(2x − 5) çarpımında x li terimin katsayısı kaçtır?',
            '-1', '1', '-9', '9',
            'Dağıtın: 2x² − 5x + 4x − 10.',
            '-5x + 4x = -1x ⇒ katsayı -1 dir.'
        ],
        [
            '103² − 97² işleminin sonucu iki kare farkı kullanılarak kaç bulunur?',
            '1.200', '600', '1.000', '1.400',
            '(103 − 97)(103 + 97) olarak hesaplayın.',
            '6 × 200 = 1.200.'
        ],
        [
            '4x² + kx + 9 ifadesi bir tam kare cebirsel ifade olduğuna göre pozitif k değeri kaçtır?',
            '12', '6', '18', '24',
            '(2x + 3)² = 4x² + 12x + 9 özdeşliğiyle karşılaştırın.',
            'k = 2 × 2 × 3 = 12.'
        ],
        [
            '3x² − 27 ifadesinin tam çarpanlarına ayrılmış hâli hangisidir?',
            '3(x − 3)(x + 3)', '3(x − 9)(x + 9)', '(3x − 9)(x + 3)', '3(x − 3)²',
            'Önce 3 ortak parantezine alın: 3(x² − 9).',
            '3(x² − 9) = 3(x − 3)(x + 3).'
        ]
    ]),
    ...packStage(8, 'ci', 'Cebirsel İfadeler', 'zor', [
        [
            'a + b = 10 ve a · b = 21 olduğuna göre a² + b² değeri kaçtır?',
            '58', '79', '100', '64',
            '(a + b)² = a² + 2ab + b² özdeşliğini kullanın.',
            '10² = a² + b² + 2(21) ⇒ 100 − 42 = 58.'
        ],
        [
            'x − y = 6 ve x² − y² = 48 olduğuna göre x + y kaçtır?',
            '8', '6', '12', '4',
            'x² − y² = (x − y)(x + y) = 48.',
            '6(x + y) = 48 ⇒ x + y = 8.'
        ],
        [
            'a − b = 5 ve a · b = 6 olduğuna göre a² + b² kaçtır?',
            '37', '13', '25', '31',
            '(a − b)² = a² − 2ab + b² ⇒ 25 = a² + b² − 12.',
            'a² + b² = 25 + 12 = 37.'
        ],
        [
            'x = 99 için x² + 2x + 1 ifadesinin sayısal değeri kaçtır?',
            '10.000', '9.900', '10.100', '9.801',
            'x² + 2x + 1 = (x + 1)² özdeşliğini kullanın.',
            '(99 + 1)² = 100² = 10.000.'
        ],
        [
            'x + 1/x = 5 olduğuna göre x² + 1/x² değeri kaçtır?',
            '23', '25', '27', '21',
            'Her iki tarafın karesini alın: x² + 2·x·(1/x) + 1/x² = 25.',
            'x² + 2 + 1/x² = 25 ⇒ x² + 1/x² = 23.'
        ],
        [
            '(3x − 2)² − (3x + 2)² ifadesi aşağıdakilerden hangisine özdeştir?',
            '-24x', '24x', '-12x', '8',
            'İki kare farkıyla: [(3x−2)−(3x+2)][(3x−2)+(3x+2)].',
            '(-4)(6x) = -24x.'
        ],
        [
            'Bir karenin kenar uzunluğu (x + 3) cm den (x − 1) cm ye indirilirse alanı kaç cm² azalır?',
            '8x + 8', '4x + 8', '8x + 10', '4x + 10',
            '(x + 3)² − (x − 1)² farkını hesaplayın.',
            '(x² + 6x + 9) − (x² − 2x + 1) = 8x + 8.'
        ]
    ]),
    ...packStage(8, 'ci', 'Cebirsel İfadeler', 'sinav', [
        [
            'Buna göre kalan kâğıdın bir yüzünün alanını cm² cinsinden veren cebirsel ifade hangisidir?',
            '(3x − 4)(3x + 4)', '(3x − 2)(3x + 2)', '(3x − 4)²', '9x² − 4',
            'Başlangıç alanı (3x)² = 9x², kesilen 4 karenin toplam alanı 4 × 2² = 16 cm².',
            '9x² − 16 = (3x − 4)(3x + 4).',
            'Bir kenarı 3x cm olan kare şeklindeki kâğıdın dört köşesinden birer kenarı 2 cm olan eş kareler kesilip çıkarılıyor.'
        ],
        [
            'Buna göre çocuk oyun parkı dışında kalan yürüyüş alanının m² cinsinden cebirsel ifadesi hangisidir?',
            '(2x − 1)(2x + 11)', '(2x + 5)²', '(2x − 6)(2x + 6)', '4x² + 20x + 61',
            'Toplam alan (2x + 5)², oyun alanı 6² = 36 m² dir. İki kare farkı uygulayın.',
            '(2x + 5)² − 6² = (2x + 5 − 6)(2x + 5 + 6) = (2x − 1)(2x + 11).',
            'Bir kenarı (2x + 5) metre olan kare şeklindeki meydanın ortasına bir kenarı 6 metre olan kare çocuk oyun alanı yapılıyor.'
        ],
        [
            'Panonun tamamının alanı (16x² + 24x + 9) cm² olduğuna göre, kare şeklindeki panonun çevresi kaç cm dir?',
            '16x + 12', '4x + 3', '8x + 6', '16x + 9',
            '16x² + 24x + 9 = (4x + 3)² olduğundan bir kenar 4x + 3 cm dir.',
            'Çevre = 4(4x + 3) = 16x + 12 cm.',
            'Sınıf panosu için kare şeklinde bir mantar pano hazırlanıyor ve alanı (16x² + 24x + 9) cm² olarak hesaplanıyor.'
        ],
        [
            'Oluşturulan yeni dikdörtgenin alanı başlangıçtaki karenin alanına göre nasıl değişir?',
            '9 cm² azalır', '9 cm² artar', 'Değişmez', '6x cm² artar',
            'Yeni alan = (x + 3)(x − 3) = x² − 9 cm² dir.',
            'İlk alan x², yeni alan x² − 9 olduğundan 9 cm² azalır.',
            'Bir kenarı x cm olan kare şeklindeki bir fayansın bir kenarı 3 cm uzatılıp diğer kenarı 3 cm kısaltılarak dikdörtgen model tasarlanıyor.'
        ],
        [
            'Çerçeve içindeki fotoğrafın alanını veren cebirsel ifade hangisidir?',
            'x² − 8x + 16', 'x² − 4x + 4', 'x² − 16', 'x² − 8x + 8',
            'Her iki kenardan 2 + 2 = 4 cm azaldığı için fotoğrafın kenarı (x − 4) cm olur.',
            '(x − 4)² = x² − 8x + 16.',
            'Dış kenar uzunluğu x cm olan kare bir fotoğraf çerçevesinin her kenarından 2 cm kalınlığında ahşap kenarlık bulunmaktadır.'
        ],
        [
            'Bu 4 özdeş dikdörtgen levha kenarlarından birleştirilerek oluşturulan büyük şeklin toplam alanı hangisidir?',
            '4x² + 12x', 'x² + 3x', '4x² + 3x', '8x + 12',
            'Bir levhanın alanı x(x + 3) = x² + 3x tir. 4 ile çarpın.',
            '4(x² + 3x) = 4x² + 12x.',
            'Kısa kenarı x cm, uzun kenarı (x + 3) cm olan 4 özdeş dikdörtgen güneş paneli yan yana monte ediliyor.'
        ],
        [
            'Alanı (2x² + 10x + 12) cm² olan dikdörtgenin kısa kenarı (x + 2) cm ise uzun kenarı kaç cm dir?',
            '2x + 6', 'x + 6', '2x + 3', '2x + 4',
            '2(x² + 5x + 6) = 2(x + 2)(x + 3) = (x + 2)(2x + 6).',
            'Uzun kenar = 2(x + 3) = 2x + 6 cm.',
            'Dikdörtgen şeklindeki bir kitap kapağının alanı (2x² + 10x + 12) cm², kısa kenarı (x + 2) cm dir.'
        ]
    ]),

    // =========================================================================
    // 5. KONU: Doğrusal Denklemler ve Eğim (Denklemler, Koordinat, Doğru Grafiği, Eğim)
    // =========================================================================
    ...packStage(8, 'dd', 'Doğrusal Denklemler ve Eğim', 'kolay', [
        [
            'x/2 + x/3 = 10 denklemini sağlayan x değeri kaçtır?',
            '12', '10', '15', '6',
            'Paydaları 6 da eşitleyin: 3x/6 + 2x/6 = 10.',
            '5x / 6 = 10 ⇒ 5x = 60 ⇒ x = 12.'
        ],
        [
            'Koordinat sisteminde (-4, 3) noktası kaçıncı bölgededir?',
            'II. Bölge', 'I. Bölge', 'III. Bölge', 'IV. Bölge',
            'x < 0 ve y > 0 olan noktalar II. bölgededir.',
            'Apsisi negatif (-4), ordinatı pozitif (+3) olduğundan II. bölgededir.'
        ],
        [
            'y = 3x − 5 doğrusunun eğimi kaçtır?',
            '3', '-5', '-3', '5/3',
            'y = mx + n biçiminde x in katsayısı m eğimdir.',
            'Eğim m = 3.'
        ],
        [
            'Dikey uzunluğu 6 m, yatay uzunluğu 8 m olan bir rampanın eğimi yüzde kaçtır?',
            '%75', '%60', '%80', '%48',
            'Eğim = Dikey / Yatay = 6 / 8.',
            '6 / 8 = 3 / 4 = %75.'
        ],
        [
            'y = 2x + 4 doğrusu y eksenini hangi noktada keser?',
            '(0, 4)', '(4, 0)', '(-2, 0)', '(0, 2)',
            'y eksenini kestiği noktada x = 0 dır.',
            'x = 0 ⇒ y = 4 ⇒ (0, 4).'
        ],
        [
            'Aşağıdaki doğrulardan hangisi orijinden (0, 0) geçer?',
            'y = -4x', 'y = x + 1', 'x = 3', 'y = 5',
            'Sabit terimi 0 olan y = mx doğruları orijinden geçer.',
            'x = 0 iken y = 0 olduğu için y = -4x orijinden geçer.'
        ],
        [
            'x = 5 doğrusunun grafiği hangi eksene paraleldir?',
            'y eksenine', 'x eksenine', 'Hiçbirine', 'Orijinden geçer',
            'x = a doğruları dikey doğrulardır.',
            'x = 5 doğrusu y eksenine paraleldir.'
        ]
    ]),
    ...packStage(8, 'dd', 'Doğrusal Denklemler ve Eğim', 'orta', [
        [
            '2x − 3y + 12 = 0 doğrusunun eğimi kaçtır?',
            '2/3', '-2/3', '3/2', '-4',
            'y yi yalnız bırakın: 3y = 2x + 12 ⇒ y = (2/3)x + 4.',
            'Eğim = 2/3.'
        ],
        [
            '3x + 4y = 24 doğrusu ile koordinat eksenleri arasında kalan dik üçgenin alanı kaç birimkaredir?',
            '24', '48', '12', '36',
            'Eksenleri kestiği noktaları bulun: x=0 ⇒ y=6; y=0 ⇒ x=8.',
            'Alan = (6 × 8) / 2 = 24 br².'
        ],
        [
            '(x − 1)/3 − (x + 2)/4 = 1 denkleminin kökü kaçtır?',
            '22', '18', '14', '20',
            'Her terimi 12 ile çarpın: 4(x−1) − 3(x+2) = 12.',
            '4x − 4 − 3x − 6 = 12 ⇒ x − 10 = 12 ⇒ x = 22.'
        ],
        [
            'A(2, k) noktası 3x − 2y = 14 doğrusu üzerinde olduğuna göre k kaçtır?',
            '-4', '4', '-2', '2',
            'x = 2, y = k yazıp çözün.',
            '3(2) − 2k = 14 ⇒ 6 − 2k = 14 ⇒ -2k = 8 ⇒ k = -4.'
        ],
        [
            'Eğimi %20 olan bir yolda 15 metre dikey yükseklik kazanmak için yatayda kaç metre ilerlenmelidir?',
            '75', '60', '80', '30',
            '15 / yatay = 20 / 100 = 1 / 5.',
            'yatay = 15 × 5 = 75 m.'
        ],
        [
            'P(a − 3, 2a + 4) noktası x ekseni üzerinde olduğuna göre P noktasının koordinatları nedir?',
            '(-5, 0)', '(0, 10)', '(5, 0)', '(-2, 0)',
            'x ekseni üzerindeki noktaların ordinatı y = 0 dır.',
            '2a + 4 = 0 ⇒ a = -2 ⇒ x = -2 − 3 = -5 ⇒ (-5, 0).'
        ],
        [
            'Başlangıçta 20 cm boyunda olan bir fidan her ay 4 cm uzamaktadır. x ay sonraki boyu y cm olduğuna göre doğrusal ilişki denklemi hangisidir?',
            'y = 4x + 20', 'y = 20x + 4', 'y = 4x − 20', 'y = 24x',
            'Sabit başlangıç 20, aylık değişim hızı (eğim) 4 tür.',
            'y = 4x + 20.'
        ]
    ]),
    ...packStage(8, 'dd', 'Doğrusal Denklemler ve Eğim', 'zor', [
        [
            'A(m, 3m − 12) noktası koordinat sisteminin IV. bölgesinde olduğuna göre m nin alabileceği en büyük tam sayı değeri kaçtır?',
            '3', '4', '2', '5',
            'IV. bölgede x > 0 ve y < 0 olmalıdır.',
            'm > 0 ve 3m − 12 < 0 ⇒ m < 4. En büyük tam sayı m = 3 tür.'
        ],
        [
            '3x + ay − 10 = 0 doğrusunun eğimi -3/5 olduğuna göre a kaçtır?',
            '5', '-5', '3', '-3',
            'ax + by + c = 0 doğrusunun eğimi -a/b dir; burada -3/a = -3/5.',
            'a = 5.'
        ],
        [
            'Bir depoda 180 litre su vardır ve musluk açıldığında her saat 15 litre su boşalmaktadır. Kaç saat sonra depoda 45 litre su kalır?',
            '9', '8', '10', '12',
            'y = 180 − 15x denkleminde y = 45 yazın.',
            '180 − 15x = 45 ⇒ 15x = 135 ⇒ x = 9 saat.'
        ],
        [
            'Koordinat düzleminde y = 2x, x = 4 ve x ekseni ile sınırlı üçgensel bölgenin alanı kaç birimkaredir?',
            '16', '32', '8', '12',
            'x = 4 iken y = 8 olur. Taban 4, yükseklik 8 birimdir.',
            '(4 × 8) / 2 = 16 br².'
        ],
        [
            'Bir sayının 2/5 inin 4 fazlası, aynı sayının yarısının 1 eksiğine eşittir. Bu sayı kaçtır?',
            '50', '40', '60', '45',
            '2x/5 + 4 = x/2 − 1 denklemini çözün.',
            '5 = x/2 − 2x/5 = x/10 ⇒ x = 50.'
        ],
        [
            'A(-2, 1) ve B(4, 13) noktalarından geçen doğrunun eğimi kaçtır?',
            '2', '3', '1/2', '-2',
            'm = (y₂ − y₁) / (x₂ − x₁).',
            '(13 − 1) / (4 − (-2)) = 12 / 6 = 2.'
        ],
        [
            'x = -3, x = 5, y = -2 ve y = 4 doğrularının sınırladığı dikdörtgenin alanı kaç birimkaredir?',
            '48', '36', '42', '54',
            'Yatay kenar = 5 − (-3) = 8 br, dikey kenar = 4 − (-2) = 6 br.',
            'Alan = 8 × 6 = 48 br².'
        ]
    ]),
    ...packStage(8, 'dd', 'Doğrusal Denklemler ve Eğim', 'sinav', [
        [
            'Buna göre iki fidanın boyları dikildikten kaç ay sonra birbirine eşit olur?',
            '8', '6', '10', '12',
            'A: 30 + 5x, B: 54 + 2x. İkisini eşitleyin.',
            '30 + 5x = 54 + 2x ⇒ 3x = 24 ⇒ x = 8 ay.',
            'A fidanı dikildiğinde 30 cm olup ayda 5 cm, B fidanı dikildiğinde 54 cm olup ayda 2 cm uzamaktadır.'
        ],
        [
            'Engelli rampası yönetmeliğine göre eğimin en fazla %8 olması gerekmektedir. Yüksekliği 60 cm olan girişe yapılacak rampanın yatay uzunluğu en az kaç metre olmalıdır?',
            '7,5', '6', '8', '7',
            '0,60 / yatay ≤ 8 / 100 ⇒ yatay ≥ 60 / 8 = 7,5 m.',
            '0,6 / 0,08 = 7,5 metre.',
            'Okul girişindeki 60 cm yüksekliğindeki merdivenin yanına yönetmeliğe uygun (eğimi en çok %8) engelli rampası yapılacaktır.'
        ],
        [
            'Buna göre A ve B operatörlerinin aylık fatura tutarları kaç dakikalık konuşmada eşit olur?',
            '200', '150', '250', '180',
            'A: 80 + 0,5x, B: 120 + 0,3x eşitliğini çözün.',
            '0,2x = 40 ⇒ x = 200 dakika.',
            'A tarifesi 80 TL sabit ücret + dakika başı 0,50 TL; B tarifesi 120 TL sabit ücret + dakika başı 0,30 TL ücretlendirmektedir.'
        ],
        [
            'Aynı başlangıç noktasından çizilen iki rampadan birincisinin dikeyi 4 m yatayı 10 m, ikincisinin dikeyi 6 m yatayı 12 m dir. İki rampanın eğimleri farkı yüzde kaçtır?',
            '%10', '%15', '%20', '%5',
            '1. rampa: 4/10 = %40; 2. rampa: 6/12 = %50.',
            '%50 − %40 = %10.',
            'Bir kaykay parkında iki farklı çıkış rampasının eğimleri güvenlik standartlarına göre karşılaştırılmaktadır.'
        ],
        [
            'Elektrikli otomobilin bataryası %100 doluyken yola çıkıyor ve sabit hızla her 100 km de bataryanın %20 sini tüketiyor. 350 km sonunda bataryada yüzde kaç şarj kalır?',
            '%30', '%25', '%35', '%40',
            'Doğrusal denklem: y = 100 − 0,2x. x = 350 yazın.',
            '100 − 0,2(350) = 100 − 70 = %30.',
            'Bir elektrikli aracın kalan batarya yüzdesi (y) ile gidilen yol (x km) arasında doğrusal bir ilişki vardır.'
        ],
        [
            'A(-3, 2) noktasından başlayıp eğimi 1/2 olan doğru boyunca sağa doğru yatayda 8 birim ilerleyen bir noktanın yeni koordinatları nedir?',
            '(5, 6)', '(5, 10)', '(5, 4)', '(1, 6)',
            'Eğim 1/2 ⇒ yatay +8 ise dikey +4 artar.',
            '(-3 + 8, 2 + 4) = (5, 6).',
            'Harita simülasyonunda bir araç A(-3, 2) noktasından eğimi 1/2 olan doğrusal rota boyunca pozitif x yönünde hareket etmektedir.'
        ],
        [
            'Bir taksi açılış ücreti 25 TL ve gidilen her km için 12 TL almaktadır. 169 TL ödeyen bir yolcu kaç km gitmiştir?',
            '12', '11', '13', '14',
            '25 + 12x = 169 denklemini çözün.',
            '12x = 144 ⇒ x = 12 km.',
            'Şehir içi taksi tarifesi sabit açılış ücreti ve kilometre başı doğrusal artışla hesaplanmaktadır.'
        ]
    ]),

    // =========================================================================
    // 6. KONU: Eşitsizlikler (Kurma, Sayı Doğrusu, Çözüm Kümesi, Problemler)
    // =========================================================================
    ...packStage(8, 'es', 'Eşitsizlikler', 'kolay', [
        [
            '"Bir sayının 3 katının 4 eksiği en fazla 20 dir." cümlesine uygun eşitsizlik hangisidir?',
            '3x − 4 ≤ 20', '3x − 4 < 20', '3x − 4 ≥ 20', '3(x − 4) ≤ 20',
            '"En fazla" ifadesi küçük veya eşit (≤) anlamına gelir.',
            '3x − 4 ≤ 20.'
        ],
        [
            '2x + 5 > 13 eşitsizliğinin çözüm aralığı hangisidir?',
            'x > 4', 'x ≥ 4', 'x > 9', 'x < 4',
            '5 i karşıya atın: 2x > 8, her iki tarafı 2 ye bölün.',
            'x > 4.'
        ],
        [
            '-3x ≤ 15 eşitsizliğinin çözümü hangisidir?',
            'x ≥ -5', 'x ≤ -5', 'x ≥ 5', 'x ≤ 5',
            'Eşitsizliğin her iki tarafı negatif sayıya bölünürse yön değişir!',
            '-3x / (-3) ≥ 15 / (-3) ⇒ x ≥ -5.'
        ],
        [
            'Sayı doğrusunda -2 noktası içi dolu, 5 noktası içi boş çizilip arası tarandığında hangi eşitsizlik gösterilmiş olur?',
            '-2 ≤ x < 5', '-2 < x ≤ 5', '-2 < x < 5', '-2 ≤ x ≤ 5',
            'İçi dolu nokta dahil (≤), içi boş nokta hariç (<) anlamındadır.',
            '-2 ≤ x < 5.'
        ],
        [
            'x + 7 < 12 eşitsizliğini sağlayan en büyük tam sayı kaçtır?',
            '4', '5', '3', '6',
            'x < 5 olduğundan 5 dahil değildir.',
            '5 ten küçük en büyük tam sayı 4 tür.'
        ],
        [
            '"Asansör en çok 450 kg taşıyabilir." ifadesi yük miktarı m için nasıl yazılır?',
            'm ≤ 450', 'm < 450', 'm ≥ 450', 'm > 450',
            '450 kg sınırı dahildir, daha fazlası taşınamaz.',
            'm ≤ 450.'
        ],
        [
            'x / 4 ≥ 3 eşitsizliğinin çözümü hangisidir?',
            'x ≥ 12', 'x ≤ 12', 'x > 12', 'x ≥ 7',
            'Her iki tarafı pozitif 4 ile çarpın (yön değişmez).',
            'x ≥ 12.'
        ]
    ]),
    ...packStage(8, 'es', 'Eşitsizlikler', 'orta', [
        [
            '4x − 7 ≤ 2x + 9 eşitsizliğini sağlayan en büyük tam sayı kaçtır?',
            '8', '7', '9', '6',
            '2x ≤ 16 ⇒ x ≤ 8.',
            '8 dahil olduğundan en büyük tam sayı 8 dir.'
        ],
        [
            '5 − 2x < 17 eşitsizliğini sağlayan en küçük tam sayı kaçtır?',
            '-5', '-6', '-7', '-4',
            '-2x < 12 ⇒ negatif sayıya bölünce yön değişir: x > -6.',
            '-6 dan büyük en küçük tam sayı -5 tir.'
        ],
        [
            '-5 < 2x − 1 ≤ 9 eşitsizliğini sağlayan kaç tane tam sayı vardır?',
            '7', '6', '8', '5',
            'Her yere 1 ekleyin: -4 < 2x ≤ 10 ⇒ -2 < x ≤ 5.',
            'x ∈ {-1, 0, 1, 2, 3, 4, 5} olmak üzere 7 tam sayı vardır.'
        ],
        [
            '3(x − 2) > 5x + 4 eşitsizliğinin çözümü nedir?',
            'x < -5', 'x > -5', 'x < 5', 'x > 5',
            '3x − 6 > 5x + 4 ⇒ -10 > 2x ⇒ x < -5.',
            'x < -5.'
        ],
        [
            '(2x − 3) / 5 ≤ 3 eşitsizliğini sağlayan en büyük tam sayı kaçtır?',
            '9', '8', '10', '7',
            '2x − 3 ≤ 15 ⇒ 2x ≤ 18 ⇒ x ≤ 9.',
            'En büyük tam sayı 9 dur.'
        ],
        [
            'Bir üçgenin kenar uzunlukları 5 cm, 9 cm ve x cm ise x in alabileceği kaç farklı tam sayı değeri vardır? (Üçgen eşitsizliği)',
            '9', '8', '10', '7',
            '|9 − 5| < x < 9 + 5 ⇒ 4 < x < 14.',
            '5 ten 13 e kadar 13 − 5 + 1 = 9 farklı tam sayı değeri vardır.'
        ],
        [
            'x/2 + x/3 < 15 eşitsizliğini sağlayan en büyük doğal sayı kaçtır?',
            '17', '18', '16', '15',
            '5x / 6 < 15 ⇒ 5x < 90 ⇒ x < 18.',
            '18 den küçük en büyük doğal sayı 17 dir.'
        ]
    ]),
    ...packStage(8, 'es', 'Eşitsizlikler', 'zor', [
        [
            'Bir öğrencinin ilk iki sınav puanı 74 ve 82 dir. Üç sınav ortalamasının en az 85 olması için 3. sınavdan en az kaç puan almalıdır?',
            '99', '98', '95', '100',
            '(74 + 82 + x) / 3 ≥ 85 eşitsizliğini çözün.',
            '156 + x ≥ 255 ⇒ x ≥ 99.'
        ],
        [
            '3 < a < 8 olduğuna göre 2a − 5 ifadesinin alabileceği en büyük tam sayı değeri kaçtır?',
            '10', '11', '9', '12',
            'a tam sayı denmediği için aralığı genişletin: 6 < 2a < 16 ⇒ 1 < 2a − 5 < 11.',
            '11 den küçük en büyük tam sayı 10 dur.'
        ],
        [
            '2x − 1 < 3x + 4 ≤ x + 16 bileşik eşitsizliğini sağlayan tam sayıların toplamı kaçtır?',
            '11', '15', '10', '6',
            'Sol: -5 < x. Sağ: 2x ≤ 12 ⇒ x ≤ 6. Aralık: -5 < x ≤ 6.',
            '-4 − 3 − 2 − 1 + 0 + 1 + 2 + 3 + 4 + 5 + 6 = 11.'
        ],
        [
            'Bir mağaza 400 TL ye aldığı montu %25 ten fazla, %40 tan az kârla satacaktır. Satış fiyatı (x TL) hangi aralıktadır?',
            '500 < x < 560', '500 ≤ x ≤ 560', '480 < x < 560', '520 < x < 580',
            '400 ün %25 fazlası 500, %40 fazlası 560 tır.',
            '500 < x < 560.'
        ],
        [
            '-4 ≤ (1 − 3x) / 2 < 5 eşitsizliğini sağlayan en küçük tam sayı kaçtır?',
            '-2', '-3', '-1', '0',
            '-8 ≤ 1 − 3x < 10 ⇒ -9 ≤ -3x < 9 ⇒ -3 < x ≤ 3.',
            '-3 ten büyük en küçük tam sayı -2 dir.'
        ],
        [
            'Cebinde 350 TL si olan Emre, tanesi 45 TL olan kitaplardan alıp yanında en az 80 TL yol parası bırakmak istiyor. En fazla kaç kitap alabilir?',
            '6', '5', '7', '4',
            '350 − 45x ≥ 80 ⇒ 45x ≤ 270 ⇒ x ≤ 6.',
            'En fazla 6 kitap alabilir.'
        ],
        [
            'a < 0 olmak üzere ax + 6a > 0 eşitsizliğinin çözümü hangisidir?',
            'x < -6', 'x > -6', 'x < 6', 'x > 6',
            'ax > -6a. a negatif olduğundan her iki tarafı a ya bölünce yön değişir!',
            'x < -6.'
        ]
    ]),
    ...packStage(8, 'es', 'Eşitsizlikler', 'sinav', [
        [
            'Bu asansöre 72 kg ağırlığındaki kargo görevlisi ile birlikte her biri 28 kg olan kolilerden en fazla kaç tane binebilir?',
            '13', '14', '12', '15',
            '72 + 28x ≤ 450 ⇒ 28x ≤ 378 ⇒ x ≤ 13,5.',
            'Tam sayı olarak en fazla 13 koli yüklenebilir.',
            'Taşıma kapasitesi en fazla 450 kg olan bir yük asansörüne 72 kg ağırlığındaki görevli ile 28 kg lık özdeş koliler binecektir.'
        ],
        [
            'Buna göre A firmasının B firmasından daha ekonomik (daha ucuz) olması için en az kaç km yol gidilmelidir?',
            '101', '100', '99', '120',
            'A < B: 500 + 3x < 300 + 5x ⇒ 200 < 2x ⇒ x > 100.',
            '100 km den fazla tam sayı olarak en az 101 km gidilmelidir.',
            'Bir araç kiralama işinde A firması 500 TL sabit + km başı 3 TL, B firması 300 TL sabit + km başı 5 TL talep etmektedir.'
        ],
        [
            'Kare bahçenin çevresi 64 m den büyük ve 100 m den küçük olduğuna göre, bahçenin bir kenar uzunluğunun alabileceği tam sayı değerlerinin toplamı kaçtır?',
            '164', '160', '172', '156',
            '64 < 4x < 100 ⇒ 16 < x < 25. Tam sayılar: 17, 18, 19, 20, 21, 22, 23, 24.',
            '(17 + 24) × 8 / 2 = 41 × 4 = 164.',
            'Mimar, çevresi 64 metreden fazla, 100 metreden az olacak biçimde tam sayı kenarlı kare bir park planlamaktadır.'
        ],
        [
            'Bir fabrikada üretilen cam şişelerin hacmi 500 mL ± 15 mL tolerans aralığındadır. Kalite kontrolden geçen bir şişenin hacmi (V) hangi eşitsizliği sağlamalıdır?',
            '485 ≤ V ≤ 515', '485 < V < 515', '470 ≤ V ≤ 530', '500 ≤ V ≤ 515',
            '500 − 15 = 485 alt sınır, 500 + 15 = 515 üst sınırdır (sınırlar dahil).',
            '485 ≤ V ≤ 515.',
            'İçecek şişeleme hattında 500 mL hedef hacimden en fazla 15 mL sapmaya izin verilmektedir.'
        ],
        [
            'Bir öğrencinin LGS hazırlık kampında haftada en az 420 soru çözmesi gerekiyor. İlk 5 günde toplam 285 soru çözdüğüne göre kalan 2 günde günde ortalama en az kaç soru çözmelidir?',
            '68', '67', '65', '70',
            '285 + 2x ≥ 420 ⇒ 2x ≥ 135 ⇒ x ≥ 67,5.',
            'Tam sayı olarak günde en az 68 soru çözmelidir.',
            'Haftalık soru hedefi en az 420 soru olan bir öğrenci, ilk 5 günde 285 soru çözmüştür.'
        ],
        [
            'Bir parkurda 60 km/sa ile 90 km/sa hız limitleri arasında (sınırlar dahil) 2 saat kesintisiz giden bir aracın aldığı yol (s km) hangi aralıktadır?',
            '120 ≤ s ≤ 180', '60 ≤ s ≤ 90', '120 < s < 180', '100 ≤ s ≤ 180',
            'Yol = Hız × Zaman ⇒ her iki sınırı 2 ile çarpın.',
            '60×2 ≤ s ≤ 90×2 ⇒ 120 ≤ s ≤ 180.',
            'Otoyolun belirli bir kesiminde minimum hız 60 km/sa, maksimum hız 90 km/sa olarak belirlenmiştir.'
        ],
        [
            'Kırtasiyeden 15 TL lik kalemlerden x tane ve 40 TL lik bir defter alan Zeynep’in 200 TL den az, 120 TL den fazla parası gitmiştir. x in alabileceği kaç farklı tam sayı değeri vardır?',
            '5', '4', '6', '3',
            '120 < 15x + 40 < 200 ⇒ 80 < 15x < 160 ⇒ 5,33 < x < 10,66.',
            'x ∈ {6, 7, 8, 9, 10} olmak üzere 5 farklı değer alabilir.',
            'Zeynep 40 TL ye bir defter ve tanesi 15 TL olan kalemlerden birkaç adet alarak toplamda 120 TL den fazla, 200 TL den az ödeme yapmıştır.'
        ]
    ])
];
