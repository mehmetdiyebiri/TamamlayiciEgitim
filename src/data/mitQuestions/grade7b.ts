import { MitStudyQuestion, packStage } from './types';

export const GRADE_7B_QUESTIONS: MitStudyQuestion[] = [
    // =========================================================================
    // 7. KONU: Geometrik Nicelikler (1) (Çokgenler, Eşkenar Dörtgen ve Yamuk Alanı)
    // =========================================================================
    ...packStage(7, 'gn1', 'Geometrik Nicelikler (1)', 'kolay', [
        [
            'Bir beşgenin iç açılarının ölçüleri toplamı kaç derecedir?',
            '540°', '360°', '450°', '720°',
            'n kenarlı çokgende iç açılar toplamı (n − 2) × 180° formülüyle bulunur.',
            '(5 − 2) × 180° = 3 × 180° = 540°.'
        ],
        [
            'Tüm çokgenlerin dış açılarının ölçüleri toplamı kaç derecedir?',
            '360°', '180°', '540°', 'Kenar sayısına göre değişir',
            'Kenar sayısı ne olursa olsun dış açılar toplamı sabittir.',
            'Her konveks çokgenin dış açılarının ölçüleri toplamı 360° dir.'
        ],
        [
            'Köşegen uzunlukları 8 cm ve 10 cm olan bir eşkenar dörtgenin alanı kaç cm² dir?',
            '40', '80', '18', '36',
            'Eşkenar dörtgenin alanı = (e × f) / 2.',
            '(8 × 10) / 2 = 80 / 2 = 40 cm².'
        ],
        [
            'Alt tabanı 10 cm, üst tabanı 6 cm ve yüksekliği 5 cm olan yamuğun alanı kaç cm² dir?',
            '40', '80', '30', '50',
            'Yamuğun alanı = ((a + c) × h) / 2.',
            '((10 + 6) × 5) / 2 = (16 × 5) / 2 = 80 / 2 = 40 cm².'
        ],
        [
            'Bir düzgün altıgenin bir dış açısının ölçüsü kaç derecedir?',
            '60°', '120°', '45°', '72°',
            'Düzgün n-genin bir dış açısı 360° / n ile bulunur.',
            '360° / 6 = 60°.'
        ],
        [
            'Bir düzgün sekizgenin kenar uzunluğu 7 cm ise çevresi kaç cm dir?',
            '56', '48', '64', '49',
            'Düzgün çokgenin tüm kenarları eşittir.',
            '8 × 7 = 56 cm.'
        ],
        [
            'Altıgenin bir köşesinden çizilebilecek köşegen sayısı kaçtır?',
            '3', '4', '6', '9',
            'Bir köşeden çizilebilen köşegen sayısı n − 3 tür.',
            '6 − 3 = 3 köşegen çizilebilir.'
        ]
    ]),
    ...packStage(7, 'gn1', 'Geometrik Nicelikler (1)', 'orta', [
        [
            'Bir düzgün ongenin bir iç açısının ölçüsü kaç derecedir?',
            '144°', '140°', '135°', '150°',
            'Önce bir dış açıyı (360°/10) bulup 180° den çıkarın.',
            'Dış açı = 360° / 10 = 36°. İç açı = 180° − 36° = 144°.'
        ],
        [
            'İç açılarının ölçüleri toplamı 1080° olan çokgen kaç kenarlıdır?',
            '8', '6', '7', '9',
            '(n − 2) × 180° = 1080° denklemini çözün.',
            'n − 2 = 1080 / 180 = 6 ⇒ n = 8 (sekizgen).'
        ],
        [
            'Alanı 54 cm² ve köşegenlerinden biri 9 cm olan eşkenar dörtgenin diğer köşegeni kaç cm dir?',
            '12', '6', '18', '10',
            '(9 × f) / 2 = 54 eşitliğini çözün.',
            '9 × f = 108 ⇒ f = 12 cm.'
        ],
        [
            'Alanı 60 cm², paralel kenarlarının toplamı 15 cm olan bir yamuğun yüksekliği kaç cm dir?',
            '8', '4', '6', '10',
            '(15 × h) / 2 = 60 denkleminden h yi bulun.',
            '15 × h = 120 ⇒ h = 8 cm.'
        ],
        [
            'Bir dış açısı 45° olan düzgün çokgenin çevresi 72 cm ise bir kenarı kaç cm dir?',
            '9', '8', '12', '6',
            'Önce n = 360° / 45° ile kenar sayısını bulun.',
            'n = 360 / 45 = 8 kenarlı. Bir kenar = 72 / 8 = 9 cm.'
        ],
        [
            'Tabanı 14 cm ve yüksekliği 6 cm olan paralelkenar ile aynı alana sahip eşkenar dörtgenin bir köşegeni 12 cm ise diğer köşegeni kaç cm dir?',
            '14', '7', '12', '16',
            'Paralelkenarın alanı = 14 × 6 = 84 cm² dir.',
            '(12 × f) / 2 = 84 ⇒ 6f = 84 ⇒ f = 14 cm.'
        ],
        [
            'Bir iç açısı 150° olan düzgün çokgen kaç kenarlıdır?',
            '12', '10', '15', '9',
            'Dış açı = 180° − 150° = 30° olur.',
            'n = 360° / 30° = 12 kenarlıdır.'
        ]
    ]),
    ...packStage(7, 'gn1', 'Geometrik Nicelikler (1)', 'zor', [
        [
            'Bir köşegeni diğer köşegeninin 3 katı olan eşkenar dörtgenin alanı 96 cm² ise kısa köşegeni kaç cm dir?',
            '8', '6', '12', '16',
            'Köşegenlere k ve 3k deyip (k × 3k) / 2 = 96 çözün.',
            '3k² / 2 = 96 ⇒ 3k² = 192 ⇒ k² = 64 ⇒ k = 8 cm.'
        ],
        [
            'Üst tabanı alt tabanının yarısı kadar olan bir yamuğun yüksekliği 10 cm ve alanı 120 cm² dir. Alt tabanı kaç cm dir?',
            '16', '8', '12', '18',
            'Üst tabana x, alt tabana 2x deyin: ((x + 2x) × 10) / 2 = 120.',
            '15x = 120 ⇒ x = 8. Alt taban = 2x = 16 cm.'
        ],
        [
            'Bir iç açısının ölçüsü bir dış açısının ölçüsünün 4 katı olan düzgün çokgenin bir köşesinden kaç köşegen çizilebilir?',
            '7', '10', '8', '6',
            'Dış açıya x, iç açıya 4x deyin: 5x = 180° ⇒ x = 36°.',
            'n = 360° / 36° = 10 kenarlı. Bir köşeden n − 3 = 7 köşegen çizilir.'
        ],
        [
            'Kenar uzunluğu 10 cm olan bir eşkenar dörtgenin yüksekliği 8 cm, bir köşegeni 16 cm ise diğer köşegeni kaç cm dir?',
            '10', '8', '12', '20',
            'Alan hem taban × yükseklik hem de (e × f) / 2 ile bulunur.',
            'Alan = 10 × 8 = 80 cm². (16 × f) / 2 = 80 ⇒ 8f = 80 ⇒ f = 10 cm.'
        ],
        [
            'Bir dikdörtgenin kenar uzunlukları 12 cm ve 8 cm dir. Bu dikdörtgenin köşelerinden kenar orta noktaları birleştirilerek oluşturulan eşkenar dörtgenin alanı kaç cm² dir?',
            '48', '96', '36', '64',
            'Oluşan eşkenar dörtgenin köşegenleri dikdörtgenin kenarlarına eşittir.',
            'Alan = (12 × 8) / 2 = 48 cm².'
        ],
        [
            'Çevresi 48 cm olan bir dikdörtgenin alanı en çok kaç cm² olabilir (kenarlar tam sayı)?',
            '144', '140', '128', '120',
            'Çevre sabitken alan en büyük kare olduğunda elde edilir.',
            'a + b = 24. En büyük alan a = b = 12 iken 12 × 12 = 144 cm².'
        ],
        [
            'Bir beşgenin iç açıları 95°, 110°, 125°, x ve (x + 20°) olduğuna göre en büyük iç açısı kaç derecedir?',
            '125°', '115°', '130°', '120°',
            'Beşgenin iç açıları toplamı 540° dir.',
            '95 + 110 + 125 + 2x + 20 = 540 ⇒ 350 + 2x = 540 ⇒ 2x = 190 ⇒ x = 95°. Açılar: 95, 110, 125, 95, 115 ⇒ en büyük 125°.'
        ]
    ]),
    ...packStage(7, 'gn1', 'Geometrik Nicelikler (1)', 'sinav', [
        [
            'Bahçe planına göre yamuk şeklindeki çim alanın metrekaresi 50 TL ye çimlendirilecektir. Toplam maliyet kaç TL dir?',
            '7.500', '6.000', '8.500', '15.000',
            'Önce yamuğun alanını bulup 50 TL ile çarpın.',
            'Alan = ((18 + 12) × 10) / 2 = 150 m². Maliyet = 150 × 50 = 7.500 TL.',
            'Okul bahçesinde alt tabanı 18 m, üst tabanı 12 m ve yüksekliği 10 m olan yamuk şeklinde bir yeşil alan oluşturuluyor.'
        ],
        [
            'Bir kenarı 10 cm olan düzgün altıgen ile bir kenarı 10 cm olan karenin birer kenarları çakıştırıldığında oluşan dış şeklin çevresi kaç cm olur?',
            '80', '100', '90', '70',
            'Çakışan 2 kenar dış çevreden eksilir.',
            'Altıgenin 5 dış kenarı + karenin 3 dış kenarı = 8 kenar ⇒ 8 × 10 = 80 cm.',
            'Tangram etkinliğinde aynı kenar uzunluğuna sahip düzgün çokgenler kenarlarından birleştiriliyor.'
        ],
        [
            'Tasarlanan uçurtmanın yüzey alanı kaç cm² dir?',
            '1.050', '2.100', '900', '1.200',
            'Eşkenar dörtgenin çıtaları köşegenleridir: (e × f) / 2.',
            '(35 × 60) / 2 = 35 × 30 = 1.050 cm².',
            'Kaan, 35 cm ve 60 cm uzunluğundaki iki çıtayı birbirini dik ortalayacak şekilde bağlayarak eşkenar dörtgen biçiminde bir uçurtma yapıyor.'
        ],
        [
            'Buna göre dikdörtgen duvar yüzeyinde fayans kaplanmayan alan kaç m² dir?',
            '12', '18', '24', '16',
            'Dikdörtgen alandan 12 eşkenar dörtgenin toplam alanını çıkarın.',
            'Duvar = 6 × 4 = 24 m². Bir fayans = (2 × 1) / 2 = 1 m². 12 fayans = 12 m². Kalan = 24 − 12 = 12 m².',
            '6 m × 4 m boyutlarındaki bir duvarın üzerine köşegenleri 2 m ve 1 m olan 12 adet eşkenar dörtgen dekoratif panel boşluksuz/örtüşmesiz yerleştiriliyor.'
        ],
        [
            'Bir düzgün beşgen ile bir düzgün altıgenin birer kenarları dıştan çakıştırıldığında, ortak köşede dışarıda kalan dar açı kaç derecedir?',
            '132°', '128°', '144°', '108°',
            'Tam açı 360° den beşgenin (108°) ve altıgenin (120°) iç açılarını çıkarın.',
            '360° − (108° + 120°) = 360° − 228° = 132°.',
            'Geometri panosunda düzgün beşgen ve düzgün altıgen birer kenarları boyunca yan yana yapıştırılıyor.'
        ],
        [
            'Verilen 36 cm² alana sahip dikdörtgenlerin kenar uzunlukları tam sayıdır. Buna göre çevresi en büyük ve en küçük olanların çevreleri farkı kaç cm dir?',
            '50', '48', '52', '44',
            '36 nın çarpan çiftlerinden (1,36) en büyük çevreyi, (6,6) en küçük çevreyi verir.',
            'En büyük çevre = 2×(1+36) = 74 cm. En küçük çevre = 2×(6+6) = 24 cm. Fark = 74 − 24 = 50 cm.',
            'Mimarlık atölyesinde alanı 36 cm² olan tam sayı kenarlı farklı dikdörtgen odalar tasarlanıyor.'
        ],
        [
            'Kare şeklindeki bir kağıdın karşılıklı iki köşesinden tabanı 4 cm ve yüksekliği 4 cm olan eş dik üçgenler kesilip atılıyor. Kalan şeklin alanı 84 cm² ise karenin ilk çevresi kaç cm dir?',
            '40', '36', '44', '32',
            'İki üçgenin toplam alanı 2 × (4×4/2) = 16 cm² dir.',
            'İlk karenin alanı = 84 + 16 = 100 cm² ⇒ bir kenarı 10 cm ⇒ çevresi 40 cm.',
            'El sanatları dersinde kare fon kartonunun iki köşesi kesilerek altıgen çerçeve elde ediliyor.'
        ]
    ]),

    // =========================================================================
    // 8. KONU: Geometrik Nicelikler (2) (Çemberde Açı, Yay Uzunluğu, Daire ve Dilim Alanı)
    // =========================================================================
    ...packStage(7, 'gn2', 'Geometrik Nicelikler (2)', 'kolay', [
        [
            'Bir çemberde ölçüsü 70° olan merkez açının gördüğü yayın ölçüsü kaç derecedir?',
            '70°', '35°', '140°', '290°',
            'Merkez açının ölçüsü gördüğü yayın ölçüsüne eşittir.',
            'Merkez açı = gördüğü yay = 70°.'
        ],
        [
            'Yarıçapı 5 cm olan bir çemberin çevresi kaç cm dir? (π = 3 alınız.)',
            '30', '15', '75', '25',
            'Çevre = 2 · π · r.',
            '2 × 3 × 5 = 30 cm.'
        ],
        [
            'Yarıçapı 4 cm olan bir dairenin alanı kaç cm² dir? (π = 3 alınız.)',
            '48', '24', '36', '64',
            'Dairenin alanı = π · r².',
            '3 × 4² = 3 × 16 = 48 cm².'
        ],
        [
            'Çapı 12 cm olan çemberin yarıçapı kaç cm dir?',
            '6', '24', '3', '12',
            'Yarıçap çapın yarısıdır (r = R / 2).',
            '12 / 2 = 6 cm.'
        ],
        [
            'Bir çemberde 90° lik merkez açının gördüğü yay, çemberin kaçta kaçıdır?',
            '1/4', '1/2', '1/3', '1/6',
            'Tam çember 360° dir.',
            '90° / 360° = 1/4.'
        ],
        [
            'Yarıçapı 6 cm olan çemberde 60° lik merkez açının gördüğü yayın uzunluğu kaç cm dir? (π = 3 alınız.)',
            '6', '12', '18', '9',
            'Yay uzunluğu = 2 · π · r · (α / 360°).',
            '2 × 3 × 6 × (60/360) = 36 × (1/6) = 6 cm.'
        ],
        [
            'Yarıçapı 6 cm olan yarım dairenin alanı kaç cm² dir? (π = 3 alınız.)',
            '54', '108', '36', '27',
            'Yarım daire alanı = (π · r²) / 2.',
            '(3 × 36) / 2 = 108 / 2 = 54 cm².'
        ]
    ]),
    ...packStage(7, 'gn2', 'Geometrik Nicelikler (2)', 'orta', [
        [
            'Çevresi 42 cm olan bir çemberin yarıçapı kaç cm dir? (π = 3 alınız.)',
            '7', '14', '6', '8',
            '2 · π · r = 42 eşitliğini çözün.',
            '6r = 42 ⇒ r = 7 cm.'
        ],
        [
            'Alanı 75 cm² olan bir dairenin çevresi kaç cm dir? (π = 3 alınız.)',
            '30', '25', '15', '36',
            'Önce 3r² = 75 den r yi bulup 2πr hesaplayın.',
            'r² = 25 ⇒ r = 5 cm. Çevre = 2 × 3 × 5 = 30 cm.'
        ],
        [
            'Yarıçapı 10 cm olan dairede 72° lik daire diliminin alanı kaç cm² dir? (π = 3 alınız.)',
            '60', '72', '50', '120',
            'Dilim alanı = π · r² · (72 / 360).',
            '3 × 100 × (1/5) = 300 / 5 = 60 cm².'
        ],
        [
            'Yarıçapı 8 cm olan çemberde uzunluğu 12 cm olan yayı gören merkez açı kaç derecedir? (π = 3 alınız.)',
            '90°', '60°', '120°', '75°',
            'Tam çevre = 2×3×8 = 48 cm. 12 cm bunun 1/4 üdür.',
            '(12 / 48) × 360° = (1/4) × 360° = 90°.'
        ],
        [
            'Yarıçapları 6 cm ve 4 cm olan eş merkezli iki daire arasındaki halkanın alanı kaç cm² dir? (π = 3 alınız.)',
            '60', '36', '48', '72',
            'Büyük dairenin alanından küçük dairenin alanını çıkarın.',
            '3×6² − 3×4² = 108 − 48 = 60 cm².'
        ],
        [
            'Bir çemberde (3x + 15)° lik merkez açının gördüğü majör (büyük) yay 225° ise x kaçtır?',
            '40', '35', '45', '50',
            'Küçük yay = 360° − 225° = 135° dir.',
            '3x + 15 = 135 ⇒ 3x = 120 ⇒ x = 40.'
        ],
        [
            'Çapı 16 cm olan çeyrek dairenin alanı kaç cm² dir? (π = 3 alınız.)',
            '48', '192', '64', '36',
            'r = 8 cm ve çeyrek daire 1/4 alandır.',
            '(3 × 8²) / 4 = (3 × 64) / 4 = 48 cm².'
        ]
    ]),
    ...packStage(7, 'gn2', 'Geometrik Nicelikler (2)', 'zor', [
        [
            'Merkez açısı 120° olan bir daire diliminin alanı 64 cm² ise bu dairenin yarıçapı kaç cm dir? (π = 3 alınız.)',
            '8', '6', '12', '16',
            'Dilim alanı = π · r² · (120/360) = 3 · r² · (1/3) = r² olur.',
            'r² = 64 ⇒ r = 8 cm.'
        ],
        [
            'Bir kenarı 10 cm olan karenin içine kenarlara teğet en büyük daire çiziliyor. Karenin daire dışında kalan alanı kaç cm² dir? (π = 3 alınız.)',
            '25', '75', '20', '30',
            'Dairenin çapı karenin kenarına (10 cm), yarıçapı 5 cm ye eşittir.',
            'Kare alanı = 100 cm². Daire alanı = 3×5² = 75 cm². Kalan = 100 − 75 = 25 cm².'
        ],
        [
            'Yarıçapı 4 cm olan yarım daire şeklindeki kartonun çevresi kaç cm dir? (π = 3 alınız.)',
            '20', '12', '16', '24',
            'Yarım çember yayına çap uzunluğunu (2r) eklemeyi unutmayın!',
            'Yarım yay = π·r = 3×4 = 12 cm. Çap = 8 cm. Çevre = 12 + 8 = 20 cm.'
        ],
        [
            'Bir saatte akrep ile yelkovan saat 04:00 ü gösterirken aralarındaki küçük merkez açının gördüğü yay uzunluğu, yelkovan 6 cm ise kaç cm dir? (π = 3 alınız.)',
            '12', '6', '18', '9',
            'Saat 04:00 te 4 bölme vardır: 4 × 30° = 120°.',
            '2 × 3 × 6 × (120/360) = 36 × (1/3) = 12 cm.'
        ],
        [
            'Çevresi 18 cm olan dairenin yarıçapı 2 katına çıkarılırsa alanı kaç cm² artar? (π = 3 alınız.)',
            '81', '108', '27', '54',
            'İlk r = 18/6 = 3 cm (alan 27). Yeni r = 6 cm (alan 108).',
            'Artış = 108 − 27 = 81 cm².'
        ],
        [
            'Yarıçapı 9 cm olan dairede 40° lik daire diliminin çevresi kaç cm dir? (π = 3 alınız.)',
            '24', '6', '18', '21',
            'Dilimin çevresi = yay uzunluğu + 2 yarıçaptır.',
            'Yay = 2×3×9×(40/360) = 6 cm. Çevre = 6 + 9 + 9 = 24 cm.'
        ],
        [
            'Yarıçapı 20 cm olan bir bisiklet tekerleği 15 tam tur döndüğünde kaç metre yol alır? (π = 3 alınız.)',
            '18', '180', '9', '12',
            '1 tur = 2·π·r cm dir. Sonucu 100 e bölerek metreye çevirin.',
            '1 tur = 2×3×20 = 120 cm. 15 tur = 1.800 cm = 18 m.'
        ]
    ]),
    ...packStage(7, 'gn2', 'Geometrik Nicelikler (2)', 'sinav', [
        [
            'Silecek çalıştırıldığında camda temizlediği bölgenin alanı kaç cm² dir? (π = 3 alınız.)',
            '1.600', '1.200', '800', '2.400',
            'Dilim alanı = π · r² · (α / 360°).',
            '3 × 40² × (120/360) = 3 × 1.600 × (1/3) = 1.600 cm².',
            'Bir aracın arka camındaki 40 cm uzunluğundaki silecek 120° lik açıyla tek noktadan dönerek camı temizliyor.'
        ],
        [
            'Fıskiyenin sulayabildiği çim alanın tamamı kaç m² dir? (π = 3 alınız.)',
            '147', '120', '168', '98',
            'Tam tur dönen fıskiye r = 7 m yarıçaplı bir daire oluşturur: Alan = π · r².',
            'Tam tur sulanan alan = π · r² = 3 × 7² = 3 × 49 = 147 m².',
            'Parkın ortasına yerleştirilen döner fıskiye her yöne en fazla 7 metre uzağa su püskürterek tam tur dönmektedir.'
        ],
        [
            'Aynı fıskiye sadece 120° lik bir köşe bölgesini sulayacak şekilde ayarlanırsa ve menzili 6 m olursa sulanan alan kaç m² olur? (π = 3 alınız.)',
            '36', '108', '72', '18',
            '3 × 6² × (120/360) işlemini yapın.',
            '3 × 36 × (1/3) = 36 m².',
            'Bahçe kenarındaki duvar yüzünden fıskiye yalnızca 120° lik açıyla ve 6 metre menzille çalıştırılıyor.'
        ],
        [
            'Koşu pistinin bir tam turunun uzunluğu kaç metredir? (π = 3 alınız.)',
            '380', '320', '290', '440',
            'İki düz kenar (100 + 100) ile iki yarım çemberin (1 tam çember, r=30) toplamını alın.',
            'Düz kısımlar = 200 m. Çember = 2×3×30 = 180 m. Toplam = 380 m.',
            'Bir atletizm pisti 100 m uzunluğunda iki paralel düz yol ve bunları uçlarından birleştiren 30 m yarıçaplı iki yarım çemberden oluşuyor.'
        ],
        [
            'Pizzanın 45° lik 1 dilimini yiyen Kerem, pizzanın kaç cm² lik kısmını yemiştir? (π = 3 alınız.)',
            '54', '108', '72', '36',
            '45° tam dairenin 1/8 idir. r = 12 cm alın.',
            'Tam alan = 3 × 12² = 432 cm². 1 dilim = 432 / 8 = 54 cm².',
            'Çapı 24 cm olan daire şeklindeki pizza, merkez açısı 45° olan eş dilimlere ayrılıyor.'
        ],
        [
            'Dairesel yürüyüş yolunun (halkanın) alanı kaç m² dir? (π = 3 alınız.)',
            '132', '144', '108', '96',
            'İç yarıçap 10 m, dış yarıçap 12 m dir: π(R² − r²).',
            '3 × (12² − 10²) = 3 × (144 − 100) = 3 × 44 = 132 m².',
            'Yarıçapı 10 m olan dairesel bir havuzun etrafına 2 m genişliğinde taş yürüyüş yolu yapılıyor.'
        ],
        [
            'A ve B dişlileri birbirine temas etmektedir. A dişlisi 6 tam tur döndüğünde B dişlisi kaç tam tur döner?',
            '9', '4', '8', '12',
            'Alınan yay uzunlukları eşittir: r₁ · tur₁ = r₂ · tur₂.',
            '12 × 6 = 8 × tur₂ ⇒ 72 = 8 × tur₂ ⇒ tur₂ = 9 tur.',
            'Bir saat mekanizmasında yarıçapı 12 mm olan A dişlisi ile yarıçapı 8 mm olan B dişlisi birbirini çevirmektedir.'
        ]
    ]),

    // =========================================================================
    // 9. KONU: Dönüşüm (Öteleme ve Yansıma)
    // =========================================================================
    ...packStage(7, 'dn', 'Dönüşüm', 'kolay', [
        [
            'Bir şeklin yönü ve biçimi değişmeden düzlemde bir yerden başka bir yere kaydırılmasına ne ad verilir?',
            'Öteleme', 'Yansıma', 'Döndürme', 'Benzerlik',
            'Kaydırma hareketi şeklin duruşunu değiştirmez.',
            'Düzlemde biçim, boyut ve yön değişmeden yapılan kaydırma hareketine öteleme denir.'
        ],
        [
            'Bir şeklin bir doğruya göre ayna görüntüsünün alınmasına ne ad verilir?',
            'Yansıma', 'Öteleme', 'Büyütme', 'Eğme',
            'Aynadaki görüntü simetri doğrusuna göre oluşur.',
            'Bir doğruya göre eşit uzaklıkta simetrik görüntü oluşturmaya yansıma denir.'
        ],
        [
            'Kareli zeminde A noktası 4 birim sağa ötelendiğinde, noktanın yatay konumu nasıl değişir?',
            '4 birim artar', '4 birim azalır', 'Değişmez', '8 birim artar',
            'Sağa öteleme yatay eksende pozitif yönde artıştır.',
            'Sağa doğru 4 birim ötelemede yatay konum 4 birim artar.'
        ],
        [
            'Bir şekle öteleme veya yansıma uygulandığında aşağıdakilerden hangisi kesinlikle değişmez?',
            'Kenar uzunlukları ve açıları', 'Konumu', 'Yansıma sonrası yönü', 'Doğruya uzaklığı',
            'Öteleme ve yansıma eş şekiller üretir.',
            'Eşlik dönüşümlerinde şeklin kenar uzunlukları, açıları ve alanı değişmez.'
        ],
        [
            'Kareli zeminde bir nokta simetri doğrusuna 5 birim uzaklıktadır. Bu nokta ile yansıma görüntüsü arasındaki uzaklık kaç birimdir?',
            '10', '5', '15', '0',
            'Görüntü de simetri doğrusunun diğer tarafında 5 birim uzaklıktadır.',
            '5 + 5 = 10 birim.'
        ],
        [
            'Aşağıdaki büyük harflerden hangisinin hem yatay hem de dikey simetri doğrusu vardır?',
            'H', 'A', 'E', 'M',
            'Hem yukarıdan aşağıya hem soldan sağa katlandığında çakışan harfi bulun.',
            'H harfi hem yatay hem dikey simetri doğrusuna sahiptir.'
        ],
        [
            'Bir dikdörtgenin kaç tane simetri doğrusu vardır?',
            '2', '4', '1', '0',
            'Kare olmayan dikdörtgende köşegenler simetri doğrusu değildir.',
            'Dikdörtgenin karşılıklı kenarlarının orta noktalarından geçen 2 simetri doğrusu vardır.'
        ]
    ]),
    ...packStage(7, 'dn', 'Dönüşüm', 'orta', [
        [
            'Koordinatları (2, 5) olan A noktası 3 birim sağa, 4 birim aşağı ötelenirse yeni konumu ne olur?',
            '(5, 1)', '(-1, 9)', '(5, 9)', '(-1, 1)',
            'Sağa öteleme x i artırır, aşağı öteleme y yi azaltır.',
            '(2 + 3, 5 − 4) = (5, 1).'
        ],
        [
            'K(-3, 4) noktasının x eksenine (yatay eksene) göre yansımasının koordinatları nedir?',
            '(-3, -4)', '(3, 4)', '(3, -4)', '(4, -3)',
            'x eksenine göre yansımada x sabit kalır, y işaret değiştirir.',
            '(-3, 4) → (-3, -4).'
        ],
        [
            'M(5, -2) noktasının y eksenine (dikey eksene) göre yansımasının koordinatları nedir?',
            '(-5, -2)', '(5, 2)', '(-5, 2)', '(-2, 5)',
            'y eksenine göre yansımada y sabit kalır, x işaret değiştirir.',
            '(5, -2) → (-5, -2).'
        ],
        [
            'B(-4, -1) noktası önce 6 birim sağa, sonra 3 birim yukarı ötelenirse hangi noktaya ulaşır?',
            '(2, 2)', '(-10, 2)', '(2, -4)', '(-2, 2)',
            'x e +6, y ye +3 ekleyin.',
            '(-4 + 6, -1 + 3) = (2, 2).'
        ],
        [
            'Bir düzgün altıgenin toplam kaç tane simetri doğrusu vardır?',
            '6', '3', '12', '4',
            'Düzgün n-genin n tane simetri doğrusu vardır.',
            'Düzgün altıgenin 3 ü köşelerden, 3 ü kenar ortalarından geçen toplam 6 simetri doğrusu vardır.'
        ],
        [
            'P(a, b) noktası 4 birim sola ve 2 birim yukarı ötelendiğinde P′(1, 5) noktası elde ediliyor. a + b kaçtır?',
            '8', '6', '10', '4',
            'a − 4 = 1 ve b + 2 = 5 eşitliklerini çözün.',
            'a = 5, b = 3 ⇒ a + b = 8.'
        ],
        [
            'Aşağıdaki geometrik şekillerden hangisinin simetri doğrusu yoktur?',
            'Paralelkenar (özel olmayan)', 'İkizkenar yamuk', 'Eşkenar dörtgen', 'İkizkenar üçgen',
            'Katlandığında iki parçası tam üst üste gelmeyen şekli seçin.',
            'Özel olmayan paralelkenarın simetri doğrusu yoktur.'
        ]
    ]),
    ...packStage(7, 'dn', 'Dönüşüm', 'zor', [
        [
            'A(3, -5) noktası önce x eksenine göre yansıtılıyor, ardından 2 birim sola ve 3 birim aşağı öteleniyor. Son koordinatları nedir?',
            '(1, 2)', '(5, 2)', '(-5, -8)', '(1, -8)',
            'Adım adım ilerleyin: x eksenine yansıma → (3, 5).',
            'Yansıma: (3, 5). Öteleme: (3 − 2, 5 − 3) = (1, 2).'
        ],
        [
            'B(-2, 6) noktasının önce y eksenine, sonra x eksenine göre yansıması alındığında hangi nokta elde edilir?',
            '(2, -6)', '(-2, -6)', '(2, 6)', '(-6, 2)',
            'y ekseni x i, x ekseni y yi ters işaretli yapar.',
            'y ye göre: (2, 6). x e göre: (2, -6).'
        ],
        [
            'Köşeleri A(1, 2), B(4, 2) ve C(1, 6) olan dik üçgen 5 birim sola ötelendiğinde alanı kaç birimkare olur?',
            '6', '12', '8', '10',
            'Öteleme şeklin alanını değiştirmez; taban 3, yükseklik 4 birimdir.',
            'Alan = (3 × 4) / 2 = 6 br².'
        ],
        [
            'T(4, -3) noktasının x = 1 dikey doğrusuna göre yansımasının koordinatları nedir?',
            '(-2, -3)', '(-4, -3)', '(4, 5)', '(-3, -3)',
            'x = 4 ten x = 1 e uzaklık 3 birimdir; 3 birim daha sola gidin.',
            '1 − 3 = -2 olur, y değişmez: (-2, -3).'
        ],
        [
            'D(2, 5) noktasının y = 2 yatay doğrusuna göre yansımasının koordinatları nedir?',
            '(2, -1)', '(2, -5)', '(2, 1)', '(-2, 5)',
            'y = 5 in y = 2 ye uzaklığı 3 birimdir; 3 birim aşağı inin.',
            '2 − 3 = -1 olur, x değişmez: (2, -1).'
        ],
        [
            'Bir şekil önce 4 birim sağa ve 2 birim aşağı, ardından 7 birim sola ve 5 birim yukarı öteleniyor. Tek adımda yapılan net öteleme nedir?',
            '3 birim sola, 3 birim yukarı', '11 birim sağa, 7 birim yukarı', '3 birim sağa, 3 birim aşağı', '3 birim sola, 7 birim yukarı',
            'Yatay ve dikey ötelemeleri kendi içinde toplayın.',
            'Yatay: +4 − 7 = -3 (3 sola). Dikey: -2 + 5 = +3 (3 yukarı).'
        ],
        [
            'Bir dijital saatte 12:51 yazısı yatay bir aynada (altına konulan aynada) okunduğunda aşağıdakilerden hangisi görünür?',
            '15:21', '12:51', '15:51', '12:21',
            'Yatay yansımada üst-alt yer değiştirir: 1→1, 2→5, 5→2 olur.',
            'Soldan sağa rakam sırası korunur, üst-alt ters döner: 1→1, 2→5, 5→2, 1→1 ⇒ 15:21.'
        ]
    ]),
    ...packStage(7, 'dn', 'Dönüşüm', 'sinav', [
        [
            'Robotun hedef noktasına ulaşması için son konumundan hangi ötelemeyi yapması gerekir?',
            '4 birim sağa, 2 birim aşağı', '4 birim sola, 2 birim yukarı', '2 birim sağa, 4 birim aşağı', '6 birim sağa, 2 birim aşağı',
            'Önce robotun 1. hamle sonrası konumunu bulun: (-3+2, 1+4) = (-1, 5).',
            '(-1, 5) ten (3, 3) e ulaşmak için x: +4 (sağa), y: -2 (aşağı) gerekir.',
            'Kareli koordinat düzleminde (-3, 1) noktasındaki kodlama robotu önce 2 birim sağa ve 4 birim yukarı hareket ediyor. Hedef noktası (3, 3) tür.'
        ],
        [
            'Kareli desende motifin 4. adımdaki köşe koordinatı aşağıdakilerden hangisidir?',
            '(10, 2)', '(8, 2)', '(10, -2)', '(12, 2)',
            'Her adımda motif 3 birim sağa öteleniyor ve x eksenine göre yansıtılıyor.',
            '1. adım: (1, -2) → 2. adım: (4, 2) → 3. adım: (7, -2) → 4. adım: (10, 2).',
            'Geleneksel kilim motifinde A(1, -2) köşesi her adımda 3 birim sağa ötelenip x eksenine göre yansıtılarak şerit desen oluşturuluyor.'
        ],
        [
            'Kâğıt açıldığında oluşan toplam delik sayısı kaçtır?',
            '4', '2', '8', '6',
            'İki kez katlanan kâğıt 4 katmanlı olur; her katmanda 1 delik oluşur.',
            'İlk açılışta 2, ikinci açılışta yansımayla 4 simetrik delik elde edilir.',
            'Kare şeklinde bir kâğıt önce dikey, sonra yatay ortadan ikiye katlanıyor ve köşeye yakın bir yerden tek bir delik açılıyor.'
        ],
        [
            'Buna göre ambulansın önündeki yazının düz okunabilmesi için dikiz aynasındaki dönüşüm hangisidir?',
            'Dikey eksene göre yansıma', 'Yatay eksene göre yansıma', 'Sadece sola öteleme', 'Sadece yukarı öteleme',
            'Ayna görüntüsü sağ ve solu ters çevirir.',
            'Dikey eksene göre yansıma sol-sağ simetrisi sağladığından ters yazılan yazı aynada düz okunur.',
            'Ambulans araçlarının ön kaputunda "AMBULANS" yazısı aynadan bakıldığında düz okunabilmesi için ters olarak yazılır.'
        ],
        [
            'Kareli haritada A(-2, 3) noktasındaki drone, y ekseni boyunca uzanan nehre göre simetrik olan B noktasına uçup ardından 5 birim aşağı inerek C noktasına konuyor. C nin koordinatları nedir?',
            '(2, -2)', '(-2, -2)', '(2, 8)', '(-2, -8)',
            'y eksenine göre yansıma: B(2, 3). 5 birim aşağı: y den 5 çıkar.',
            'B(2, 3) → 5 birim aşağı → C(2, 3 − 5) = (2, -2).',
            'Haritalama görevindeki bir drone koordinat düzleminde yansıma ve öteleme komutlarıyla yönlendiriliyor.'
        ],
        [
            'Koordinatları (1, 1), (4, 1), (4, 3), (1, 3) olan dikdörtgenin x eksenine göre yansıması alındığında, ilk dikdörtgen ile görüntüsü arasındaki en kısa mesafe kaç birimdir?',
            '2', '1', '4', '6',
            'İlk dikdörtgenin x eksenine en yakın kenarı y = 1, görüntüsününki y = -1 üzerindedir.',
            '1 − (-1) = 2 birim.',
            'Mimari çizimde bir pencere bloğu yatay eksene göre simetrik olarak alt kata kopyalanıyor.'
        ],
        [
            'Satranç tahtasında (2, 1) karesindeki bir at önce 2 birim yukarı ve 1 birim sağa, sonra 1 birim yukarı ve 2 birim sağa hareket ederse hangi kareye gelir?',
            '(5, 4)', '(4, 5)', '(5, 3)', '(3, 4)',
            'İki hamlenin yatay ve dikey bileşenlerini toplayın.',
            'x = 2 + 1 + 2 = 5, y = 1 + 2 + 1 = 4 ⇒ (5, 4).',
            'Satranç antrenmanında taşların hamleleri koordinat düzleminde öteleme olarak modellenmektedir.'
        ]
    ]),

    // =========================================================================
    // 10. KONU: İstatistiksel Araştırma Süreci (Çizgi, Daire Grafiği, Ortalama, Ortanca, Mod)
    // =========================================================================
    ...packStage(7, 'ia', 'İstatistiksel Araştırma Süreci', 'kolay', [
        [
            '8, 12, 15, 9, 16 veri grubunun aritmetik ortalaması kaçtır?',
            '12', '11', '13', '14',
            'Tüm verileri toplayıp veri sayısına (5) bölün.',
            '(8 + 12 + 15 + 9 + 16) / 5 = 60 / 5 = 12.'
        ],
        [
            '3, 7, 7, 9, 12, 7, 15 veri grubunun tepe değeri (modu) kaçtır?',
            '7', '9', '12', '15',
            'En çok tekrar eden sayı tepe değerdir.',
            '7 sayısı 3 kez tekrar ederek en sık geçen değer olduğundan mod = 7 dir.'
        ],
        [
            '4, 9, 11, 15, 20 veri grubunun ortancası (medyanı) kaçtır?',
            '11', '9', '15', '12',
            'Küçükten büyüğe sıralı veride tam ortadaki değer medyan olur.',
            '5 veriden 3. sıradaki sayı 11 dir ⇒ ortanca = 11.'
        ],
        [
            'Bir öğrencinin bir hafta boyunca günlere göre değişen sıcaklığını göstermek için en uygun grafik türü hangisidir?',
            'Çizgi grafiği', 'Daire grafiği', 'Sıklık tablosu', 'Nokta grafiği',
            'Zaman içindeki sürekli değişim çizgi grafiğiyle gösterilir.',
            'Zamana bağlı artış ve azalışlar en net çizgi grafiği ile izlenir.'
        ],
        [
            'Bir bütünü oluşturan parçaların yüzdelik oranlarını göstermek için en uygun grafik hangisidir?',
            'Daire grafiği', 'Çizgi grafiği', 'Sütun grafiği', 'Çetele tablosu',
            'Parça-bütün ilişkisi 360° lik dilimlerle gösterilir.',
            'Parça-bütün dağılımları için en uygun grafik daire grafiğidir.'
        ],
        [
            '36 öğrencilik bir sınıfta 9 öğrenci basketbol seçmiştir. Bu veri daire grafiğinde kaç derecelik merkez açıyla gösterilir?',
            '90°', '45°', '120°', '60°',
            '9 / 36 = 1/4 olduğundan 360° nin 1/4 ünü alın.',
            '(9 / 36) × 360° = 90°.'
        ],
        [
            '10, 14, 18, 22 veri grubunun ortancası (medyanı) kaçtır?',
            '16', '14', '18', '15',
            'Çift sayıda veri varsa ortadaki iki sayının ortalamasını alın.',
            '(14 + 18) / 2 = 32 / 2 = 16.'
        ]
    ]),
    ...packStage(7, 'ia', 'İstatistiksel Araştırma Süreci', 'orta', [
        [
            '6 sayının aritmetik ortalaması 15 tir. Bu gruba 22 sayısı eklenirse yeni aritmetik ortalama kaç olur?',
            '16', '17', '15,5', '18',
            'İlk toplam = 6 × 15 = 90 dır. 22 ekleyip 7 ye bölün.',
            '(90 + 22) / 7 = 112 / 7 = 16.'
        ],
        [
            '12, 8, 15, 8, 20, 15, 8 veri grubunun ortancası ile tepe değerinin toplamı kaçtır?',
            '20', '16', '23', '18',
            'Önce sıralayın: 8, 8, 8, 12, 15, 15, 20.',
            'Ortanca = 12, Tepe değer (mod) = 8 ⇒ Toplam = 12 + 8 = 20.'
        ],
        [
            'Bir daire grafiğinde elma üretimi 144° lik dilimle gösterilmiştir. Toplam üretim 500 ton ise elma üretimi kaç tondur?',
            '200', '180', '220', '150',
            '500 × (144 / 360) oranını hesaplayın.',
            '144 / 360 = 2 / 5 ⇒ 500 × (2 / 5) = 200 ton.'
        ],
        [
            '5, 9, x, 13, 17 veri grubu küçükten büyüğe sıralı olup aritmetik ortalaması 11 ise ortancası kaçtır?',
            '11', '10', '12', '9',
            '5 verinin toplamı 5 × 11 = 55 olmalıdır.',
            '5 + 9 + x + 13 + 17 = 55 ⇒ 44 + x = 55 ⇒ x = 11 (ortanca).'
        ],
        [
            '4 arkadaşın yaş ortalaması 13 tür. 3 yıl sonra bu 4 arkadaşın yaş ortalaması kaç olur?',
            '16', '15', '17', '25',
            'Her veri aynı miktarda artarsa ortalama da o kadar artar.',
            '13 + 3 = 16.'
        ],
        [
            'Bir veri grubunda tüm veriler farklıysa aşağıdakilerden hangisi doğrudur?',
            'Tepe değeri (modu) yoktur', 'Ortancası yoktur', 'Ortalaması yoktur', 'Tepe değeri en büyük sayıdır',
            'Hiçbir sayı diğerlerinden fazla tekrar etmezse mod oluşmaz.',
            'Tüm değerler eşit sıklıkta (1 kez) geçtiğinde veri grubunun tepe değeri (modu) yoktur.'
        ],
        [
            'Bir mağazanın 4 günlük satışları sırasıyla 25, 35, 30 ve 50 adettir. Bu veriler daire grafiğinde gösterilirse 35 adetlik günün açısı kaç derece olur?',
            '90°', '80°', '100°', '75°',
            'Toplam satış = 25 + 35 + 30 + 50 = 140 tır.',
            '(35 / 140) × 360° = (1 / 4) × 360° = 90°.'
        ]
    ]),
    ...packStage(7, 'ia', 'İstatistiksel Araştırma Süreci', 'zor', [
        [
            'Aritmetik ortalaması 24 olan 5 sayıdan biri çıkarıldığında kalan 4 sayının ortalaması 21 oluyor. Çıkarılan sayı kaçtır?',
            '36', '30', '33', '27',
            'İlk toplamdan (5×24) son toplamı (4×21) çıkarın.',
            '120 − 84 = 36.'
        ],
        [
            '10, 12, 12, 13, 14, 65 veri grubunda aşırı büyük (uç) bir değer vardır. Bu grubu en gerçekçi temsil eden merkezi eğilim ölçüsü hangisidir?',
            'Ortanca (12,5)', 'Aritmetik ortalama (21)', 'Açıklık (55)', 'En büyük değer (65)',
            'Uç değerler aritmetik ortalamayı bozar; ortanca uç değerden etkilenmez.',
            '65 uç değeri ortalamayı 21 e çeker; gerçek dağılımı en iyi ortanca (12+13)/2 = 12,5 temsil eder.'
        ],
        [
            'Bir daire grafiğinde A ürünü 108°, B ürünü 162°, C ürünü geri kalan açıyla gösterilmektedir. B ürünü C ürününden 48 adet fazla ise toplam ürün sayısı kaçtır?',
            '240', '200', '300', '180',
            'C = 360 − (108 + 162) = 90°. B − C = 162° − 90° = 72°.',
            '72° = 48 adet ise 360° = 5 × 48 = 240 adet.'
        ],
        [
            '6, 8, 10, x, 14 veri grubunda tepe değer 8 olduğuna göre bu veri grubunun aritmetik ortalaması kaçtır?',
            '9,2', '9', '9,6', '8,8',
            'Modun 8 olması için x = 8 olmalıdır.',
            '(6 + 8 + 10 + 8 + 14) / 5 = 46 / 5 = 9,2.'
        ],
        [
            'Bir sınıftaki 12 kızın matematik ortalaması 80, 8 erkeğin ortalaması 70 tir. Sınıfın tamamının ortalaması kaçtır?',
            '76', '75', '74', '78',
            'Ağırlıklı ortalama: (12×80 + 8×70) / 20.',
            '(960 + 560) / 20 = 1520 / 20 = 76.'
        ],
        [
            'Bir çizgi grafiğinde sıcaklık Pazartesi 14°C, Salı 18°C, Çarşamba 15°C, Perşembe 21°C, Cuma 17°C olarak ölçülmüştür. En büyük günlük sıcaklık değişimi hangi iki gün arasında olmuştur?',
            'Çarşamba – Perşembe', 'Pazartesi – Salı', 'Perşembe – Cuma', 'Salı – Çarşamba',
            'Ardışık günler arasındaki mutlak farkları karşılaştırın.',
            'Pzt-Sal: 4°C, Sal-Çar: 3°C, Çar-Per: 6°C, Per-Cum: 4°C ⇒ en büyük değişim Çarşamba–Perşembe (6°C).'
        ],
        [
            'Pozitif tam sayılardan oluşan 5 elemanlı bir veri grubunun ortancası 10, tek tepe değeri 12 ve aritmetik ortalaması 10 dur. Bu gruptaki en küçük sayı en az kaç olabilir?',
            '7', '5', '6', '8',
            'Veriler a < b < 10 ≤ 12 = 12 (veya b = 10 olamaz çünkü mod tek 12) ⇒ a + b = 16 ve b en çok 9 olabilir.',
            'Toplam = 50. 10 + 12 + 12 = 34 ⇒ a + b = 16. Tek mod 12 olduğu için b en fazla 9 olabilir ⇒ a = 16 − 9 = 7.'
        ]
    ]),
    ...packStage(7, 'ia', 'İstatistiksel Araştırma Süreci', 'sinav', [
        [
            'Daire grafiğinde kütüphanedeki Roman kitaplarının merkez açısı 150°, Bilim kitaplarının 90° ve kalanlar Tarih kitaplarıdır. Toplam 720 kitap varsa Tarih kitabı sayısı kaçtır?',
            '240', '180', '300', '210',
            'Tarih açısı = 360° − (150° + 90°) = 120° dir.',
            '(120 / 360) × 720 = (1 / 3) × 720 = 240 kitap.',
            'Okul kütüphanesindeki 720 kitabın türlerine göre dağılımı daire grafiğiyle sunulmuştur.'
        ],
        [
            'Grafiğe göre 5 günlük ortalama adım sayısı kaçtır?',
            '8.000', '7.500', '8.200', '7.800',
            '5 günün adım sayılarını toplayıp 5 e bölün.',
            '(7.000 + 8.500 + 6.500 + 9.000 + 9.000) / 5 = 40.000 / 5 = 8.000 adım.',
            'Burak’ın 5 günlük yürüyüş çizgi grafiğinde adım sayıları: Pzt 7.000, Sal 8.500, Çar 6.500, Per 9.000, Cum 9.000 olarak kaydedilmiştir.'
        ],
        [
            'İki basketbolcunun 5 maçlık sayı ortalaması aynı (18 sayı) olmasına rağmen, hangisinin performansı daha istikrarlıdır?',
            'Açıklığı küçük olan sporcu', 'Açıklığı büyük olan sporcu', 'Modu büyük olan sporcu', 'En yüksek tek maç skoru olan sporcu',
            'Verilerin birbirine yakın olması istikrarı gösterir.',
            'Aynı ortalamada açıklığı (en büyük − en küçük) küçük olan veri grubu daha tutarlı ve istikrarlıdır.',
            'Antrenör, aynı sayı ortalamasına sahip iki oyuncudan daha istikrarlı olanı ilk beşe alacaktır.'
        ],
        [
            'Daire grafiğinde elektrik faturası 72° lik dilimle gösterilmektedir. Aylık gider toplam 15.000 TL ise elektrik faturası kaç TL dir?',
            '3.000', '2.500', '3.600', '2.400',
            '72° / 360° = 1 / 5 oranını kullanın.',
            '15.000 / 5 = 3.000 TL.',
            'Bir ailenin aylık 15.000 TL lik bütçe dağılımı daire grafiği ile analiz edilmektedir.'
        ],
        [
            'Bir yarışmada 7 hakemin verdiği puanlar 7, 8, 8, 9, 9, 9, 10 dur. En küçük ve en büyük puan atıldığında ortanca nasıl değişir?',
            'Değişmez (9 kalır)', '1 artar', '0,5 azalır', '1 azalır',
            '7 puanın ortancası ile 7 ve 10 atılınca kalan 5 puanın ortancasını karşılaştırın.',
            'İlk ortanca 4. eleman = 9. Kalan (8, 8, 9, 9, 9) ortancası 3. eleman = 9 ⇒ değişmez.',
            'Jimnastik yarışmasında uç değerlendirmelerin etkisini azaltmak için en düşük ve en yüksek hakem puanları çıkarılmaktadır.'
        ],
        [
            'Aralık ayında 4 ürünün satış adetleri: Kalem 120, Defter 90, Silgi 60, Çanta 90 dır. Bu veriler daire grafiğine dönüştürülürse Kalem ile Silginin açıları farkı kaç derece olur?',
            '60°', '45°', '90°', '30°',
            'Toplam = 360 adet! Her 1 adet tam 1° ye karşılık gelir.',
            'Kalem = 120°, Silgi = 60° ⇒ Fark = 120° − 60° = 60°.',
            'Bir kırtasiyenin Aralık ayı satış verileri yıllık rapor için daire grafiğine aktarılmaktadır.'
        ],
        [
            '5 deneme sınavının ortalamasını 85 ten 87 ye çıkarmak isteyen Ece, 6. deneme sınavından kaç puan almalıdır?',
            '97', '95', '92', '99',
            'İlk 5 sınav toplamı 5×85 = 425, 6 sınav hedef toplamı 6×87 = 522 dir.',
            '522 − 425 = 97 puan almalıdır.',
            'Ece ilk 5 matematik denemesinde 85 puan ortalaması yakalamıştır ve 6. deneme sonunda ortalamasını 87 ye yükseltmek istemektedir.'
        ]
    ]),

    // =========================================================================
    // 11. KONU: Veriden Olasılığa (Deneysel ve Teorik Olasılık)
    // =========================================================================
    ...packStage(7, 'vo', 'Veriden Olasılığa', 'kolay', [
        [
            'Hilesiz bir madeni para havaya atıldığında üst yüze tura gelme olasılığı kaçtır?',
            '1/2', '1/4', '1', '0',
            '2 olası durumdan (yazı, tura) 1 i turadır.',
            'P(Tura) = 1/2.'
        ],
        [
            'Hilesiz bir zar atıldığında üst yüze 5 gelme olasılığı kaçtır?',
            '1/6', '5/6', '1/5', '1/3',
            '6 olası durumdan yalnızca biri 5 tir.',
            'P(5) = 1/6.'
        ],
        [
            'Bir torbada 3 kırmızı ve 5 mavi top vardır. Rastgele çekilen bir topun kırmızı olma olasılığı kaçtır?',
            '3/8', '3/5', '5/8', '1/3',
            'İstenen (3) / Toplam (3 + 5 = 8).',
            'P(Kırmızı) = 3/8.'
        ],
        [
            'Hilesiz bir zar atıldığında üst yüze 7 gelme olasılığı kaçtır?',
            '0', '1/7', '1/6', '1',
            'Zarda 7 yüzü bulunmadığı için imkânsız olaydır.',
            'İmkânsız olayın olasılığı 0 dır.'
        ],
        [
            'Bir para 20 kez atıldığında 13 kez yazı gelmiştir. Bu deneye göre yazı gelmenin deneysel olasılığı kaçtır?',
            '13/20', '7/20', '1/2', '13/7',
            'Deneysel olasılık = (Olayın gerçekleşme sayısı) / (Toplam deney sayısı).',
            '13 / 20.'
        ],
        [
            'Hilesiz bir zar atıldığında üst yüze çift sayı gelme olasılığı kaçtır?',
            '1/2', '1/3', '2/3', '1/6',
            'Çift sayılar {2, 4, 6} olmak üzere 3 tanedir.',
            '3 / 6 = 1/2.'
        ],
        [
            'Bir olayın olasılığı 1 ise bu olay nasıl adlandırılır?',
            'Kesin olay', 'İmkânsız olay', 'Eş olasılıklı olay', 'Deneysel olay',
            'Her denemede mutlaka gerçekleşen olayın olasılığı 1 dir.',
            'Olasılığı 1 olan olay kesin olaydır.'
        ]
    ]),
    ...packStage(7, 'vo', 'Veriden Olasılığa', 'orta', [
        [
            '1 den 10 a kadar numaralandırılmış özdeş kartlardan rastgele biri çekiliyor. Kartın asal sayı olma olasılığı kaçtır?',
            '2/5', '1/2', '3/10', '3/5',
            '1 ile 10 arasındaki asal sayılar: 2, 3, 5, 7 (4 tane).',
            '4 / 10 = 2/5.'
        ],
        [
            'Bir torbada 4 sarı, 6 yeşil ve 2 siyah bilye vardır. Rastgele çekilen bilyenin sarı OLMAMA olasılığı kaçtır?',
            '2/3', '1/3', '1/2', '3/4',
            'Toplam 12 bilyenin 8 i sarı değildir.',
            '8 / 12 = 2/3.'
        ],
        [
            'Bir basketbolcu antrenmanda yaptığı 40 serbest atışın 28 ini sayıya çevirmiştir. Bu veriye göre bir sonraki atışı sayı yapmasının deneysel olasılığı yüzde kaçtır?',
            '%70', '%65', '%75', '%60',
            '28 / 40 kesrini yüzdeye çevirin.',
            '28 / 40 = 7 / 10 = %70.'
        ],
        [
            '“MATEMATİK” kelimesinin harfleri özdeş kartlara yazılıp bir torbaya atılıyor. Rastgele çekilen kartta M harfi yazma olasılığı kaçtır?',
            '2/9', '1/9', '2/7', '1/3',
            'Kelime 9 harflidir ve içinde 2 tane M vardır.',
            'P(M) = 2/9.'
        ],
        [
            'Bir olayın gerçekleşme olasılığı 3/8 ise gerçekleşmeme olasılığı kaçtır?',
            '5/8', '3/5', '1/2', '7/8',
            'Bir olayın olma ve olmama olasılıkları toplamı 1 dir.',
            '1 − 3/8 = 5/8.'
        ],
        [
            '8 eş dilime ayrılmış bir çarkta 3 dilim mavi, 3 dilim kırmızı, 2 dilim sarıdır. Çark çevrildiğinde ibrenin gelme olasılığı en az olan renk ve olasılığı nedir?',
            'Sarı, 1/4', 'Sarı, 1/8', 'Mavi, 3/8', 'Kırmızı, 1/4',
            'En az dilime sahip renk sarı (2/8) dır.',
            '2 / 8 = 1/4 ile en düşük olasılık sarıdadır.'
        ],
        [
            'Bir zar 50 kez atıldığında 10 kez 6 gelmiştir. 6 gelmesinin deneysel olasılığı ile teorik olasılığı arasındaki farkın mutlak değeri kaçtır?',
            '1/30', '1/15', '1/10', '1/6',
            'Deneysel = 10/50 = 1/5; Teorik = 1/6.',
            '|1/5 − 1/6| = |6/30 − 5/30| = 1/30.'
        ]
    ]),
    ...packStage(7, 'vo', 'Veriden Olasılığa', 'zor', [
        [
            'Bir torbada 5 kırmızı ve bir miktar mavi top vardır. Rastgele çekilen bir topun kırmızı olma olasılığı 1/4 ise torbada kaç mavi top vardır?',
            '15', '20', '12', '10',
            '5 / (5 + m) = 1 / 4 eşitliğini çözün.',
            '5 + m = 20 ⇒ m = 15 mavi top.'
        ],
        [
            'Bir sınıfta 14 kız ve 10 erkek öğrenci vardır. Sınıftan rastgele seçilen bir öğrencinin erkek olma olasılığının 1/2 olması için sınıfa kaç erkek öğrenci daha katılmalıdır?',
            '4', '2', '6', '5',
            'Erkek sayısı kız sayısına eşit olduğunda olasılık 1/2 olur.',
            '14 − 10 = 4 erkek öğrenci katılmalıdır.'
        ],
        [
            'Bir deneyin tekrar sayısı çok fazla artırıldığında (örneğin bir para 10.000 kez atıldığında) deneysel olasılık hangi değere yaklaşır?',
            'Teorik olasılığa', '0 a', '1 e', 'Deney sayısına',
            'Büyük sayılar yasasına göre çok denemede deneysel olasılık kuramsal değere yakınsar.',
            'Deneme sayısı arttıkça deneysel olasılık teorik olasılık değerine yaklaşır.'
        ],
        [
            '1 den 20 ye kadar (dahil) numaralanmış kartlardan rastgele seçilen bir kartın hem 2 ye hem 3 e bölünebilme olasılığı kaçtır?',
            '3/20', '1/5', '1/4', '1/10',
            'Hem 2 ye hem 3 e bölünenler 6 nın katlarıdır: {6, 12, 18}.',
            '3 / 20.'
        ],
        [
            'Bir kutudaki 24 kalemin 3/8 i kurşun, kalanı tükenmez kalemdir. Kutudan rastgele seçilen kalemin tükenmez olma olasılığı kaçtır?',
            '5/8', '3/8', '1/2', '2/3',
            '1 − 3/8 = 5/8 i tükenmez kalemdir (15/24).',
            '15 / 24 = 5/8.'
        ],
        [
            'Hilesiz iki madeni para aynı anda havaya atıldığında ikisinin de aynı (ikisi de yazı veya ikisi de tura) gelme olasılığı kaçtır?',
            '1/2', '1/4', '3/4', '1/3',
            'Tüm durumlar: {YY, YT, TY, TT} (4 durum). Aynı olanlar: {YY, TT} (2 durum).',
            '2 / 4 = 1/2.'
        ],
        [
            'Bir torbada 6 beyaz, 4 siyah top vardır. Torbaya kaç siyah top daha eklenirse siyah çekme olasılığı 1/2 olur?',
            '2', '3', '4', '6',
            'Siyah ve beyaz top sayıları eşitlendiğinde olasılık 1/2 olur.',
            '6 − 4 = 2 siyah top eklenmelidir.'
        ]
    ]),
    ...packStage(7, 'vo', 'Veriden Olasılığa', 'sinav', [
        [
            'Tablodaki deneme verilerine göre çark çevrildiğinde "Kitap" ödülünün gelmesinin deneysel olasılığı kaçtır?',
            '3/10', '1/4', '2/5', '7/20',
            'Toplam çevirme sayısını bulup Kitap sayısına oranlayın.',
            'Toplam = 12 + 15 + 13 + 10 = 50. Kitap = 15 ⇒ 15 / 50 = 3/10.',
            'Okul kermesinde bir ödül çarkı 50 kez çevrilmiş; Kalem 12, Kitap 15, Defter 13, Silgi 10 kez gelmiştir.'
        ],
        [
            'Buna göre depodan rastgele alınan bir ampulün sağlam çıkma olasılığı yüzde kaçtır?',
            '%95', '%90', '%96', '%92',
            '200 ampulden 10 u bozuksa 190 ı sağlamdır.',
            '190 / 200 = 95 / 100 = %95.',
            'Kalite kontrol testinde 200 ampul incelenmiş ve 10 tanesinin bozuk olduğu tespit edilmiştir.'
        ],
        [
            'Bu sınıftan rastgele seçilen bir öğrencinin gözlüklü bir kız öğrenci olma olasılığı kaçtır?',
            '1/5', '1/4', '3/10', '1/6',
            'İstenen (6) / Tüm sınıf (30).',
            '6 / 30 = 1/5.',
            '30 kişilik 7-A sınıfında 16 kız öğrenci vardır ve kız öğrencilerin 6 sı gözlüklüdür.'
        ],
        [
            '24 kişilik kurada çekilişe sonradan 6 kişi daha katılırsa, kuradaki ilk oyunculardan Ali’nin kazanma olasılığı nasıl değişir?',
            '1/24 ten 1/30 a düşer', '1/24 ten 1/18 e artar', 'Değişmez', '1/30 dan 1/24 e artar',
            'Payda 24 ten 30 a çıkınca birim kesir küçülür.',
            'Başlangıçta 1/24 iken 6 kişi eklenince 1/30 olur, yani olasılık azalır.',
            'Kütüphane kitap çekilişine başlangıçta 24 öğrenci isim yazdırmış, son dakikada 6 öğrenci daha listeye eklenmiştir.'
        ],
        [
            'Hilesiz bir zar 60 kez atıldığında her yüzün yaklaşık 10 kez gelmesi beklenir. Ancak deneyde 3 yüzü 18 kez gelmiştir. Bu durum için aşağıdakilerden hangisi en doğru yorumdur?',
            'Deneysel olasılık 3/10 dur; atış sayısı arttıkça 1/6 ya yaklaşması beklenir', 'Zar kesinlikle 10 yüzlüdür', '3 gelme teorik olasılığı 3/10 olmuştur', 'Sonraki atışta kesinlikle 3 gelmez',
            'Teorik olasılık değişmez (1/6); çok sayıda denemede deneysel olasılık teorik değere yaklaşır.',
            'Deneysel olasılık 18/60 = 3/10 dur. Teorik olasılık hâlâ 1/6 dır ve deney tekrarlandıkça sonuç 1/6 ya yaklaşır.',
            'Matematik laboratuvarında öğrenciler hilesiz bir zarı 60 kez atarak elde ettikleri sonuçları teorik olasılıkla karşılaştırıyor.'
        ],
        [
            'İçinde sadece kırmızı, mavi ve yeşil topların bulunduğu 36 topluk kutudan kırmızı çekme olasılığı 1/3, mavi çekme olasılığı 1/4 ise kutuda kaç yeşil top vardır?',
            '15', '12', '18', '9',
            'Kırmızı = 36/3 = 12, Mavi = 36/4 = 9. Kalanlar yeşildir.',
            '36 − (12 + 9) = 36 − 21 = 15 yeşil top.',
            'Renkli top kutusunun içeriği olasılık değerleriyle etiketlenmiştir.'
        ],
        [
            'Yüzlerinde 2, 4, 6, 8, 10, 12 yazan özel bir zar atıldığında üst yüze gelen sayının 3 ün katı olma olasılığı kaçtır?',
            '1/3', '1/2', '1/6', '2/3',
            '6 yüz içinde 3 ün katları {6, 12} olmak üzere 2 tanedir.',
            '2 / 6 = 1/3.',
            'Eğitsel kutu oyununda yüzleri 2 şer artan çift sayılarla numaralandırılmış 6 yüzlü bir zar kullanılmaktadır.'
        ]
    ])
];
