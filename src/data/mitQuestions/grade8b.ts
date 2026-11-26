import { MitStudyQuestion, packStage } from './types';

export const GRADE_8B_QUESTIONS: MitStudyQuestion[] = [
    // =========================================================================
    // 7. KONU: Üçgenler (Yardımcı Elemanlar, Üçgen Eşitsizliği, Açı-Kenar, Pisagor)
    // =========================================================================
    ...packStage(8, 'uc', 'Üçgenler', 'kolay', [
        [
            'Dik kenar uzunlukları 6 cm ve 8 cm olan bir dik üçgenin hipotenüs uzunluğu kaç cm dir?',
            '10', '12', '14', '9',
            'Pisagor bağıntısı: a² + b² = c² (3-4-5 üçgeninin 2 katı).',
            '6² + 8² = 36 + 64 = 100 ⇒ c = √100 = 10 cm.'
        ],
        [
            'Kenar uzunlukları 5 cm, 12 cm ve x cm olan bir dik üçgende hipotenüs x ise x kaçtır?',
            '13', '17', '15', '11',
            '5-12-13 özel dik üçgenini veya Pisagor bağıntısını kullanın.',
            '5² + 12² = 25 + 144 = 169 ⇒ x = 13 cm.'
        ],
        [
            'Bir üçgenin bir köşesini karşı kenarın orta noktasına birleştiren doğru parçasına ne ad verilir?',
            'Kenarortay', 'Açıortay', 'Yükseklik', 'Hipotenüs',
            'Karşı kenarı iki eş parçaya bölen yardımcı elemandır.',
            'Köşeyi karşı kenarın orta noktasına birleştiren doğru parçası kenarortaydır.'
        ],
        [
            'Kenar uzunlukları 4 cm, 7 cm ve x cm olan bir üçgende x in alabileceği en büyük tam sayı değeri kaçtır?',
            '10', '11', '9', '12',
            'Üçgen eşitsizliği: |7 − 4| < x < 7 + 4 ⇒ 3 < x < 11.',
            '11 den küçük en büyük tam sayı 10 dur.'
        ],
        [
            'Bir ABC üçgeninde m(A) = 80°, m(B) = 60° ve m(C) = 40° olduğuna göre en uzun kenar hangisidir?',
            '[BC]', '[AC]', '[AB]', 'Hepsi eşittir',
            'Üçgende en büyük açının karşısında en uzun kenar bulunur.',
            'En büyük açı A (80°) olduğundan karşısındaki [BC] kenarı en uzundur.'
        ],
        [
            'Dik üçgende 90° lik açının karşısındaki en uzun kenara ne ad verilir?',
            'Hipotenüs', 'Kenarortay', 'Yükseklik', 'Açıortay',
            'Dik üçgenin en uzun kenarı özel bir isim taşır.',
            'Dik açının karşısındaki kenara hipotenüs denir.'
        ],
        [
            'Aşağıdaki kenar uzunlukları verilen üçlülerden hangisi ile bir üçgen ÇİZİLEMEZ?',
            '3 cm, 5 cm, 9 cm', '4 cm, 6 cm, 8 cm', '5 cm, 5 cm, 7 cm', '6 cm, 8 cm, 10 cm',
            'İki kenarın toplamı üçüncü kenardan kesinlikle büyük olmalıdır.',
            '3 + 5 = 8 < 9 olduğundan üçgen eşitsizliği sağlanmaz ve üçgen çizilemez.'
        ]
    ]),
    ...packStage(8, 'uc', 'Üçgenler', 'orta', [
        [
            'Hipotenüsü 17 cm ve bir dik kenarı 8 cm olan dik üçgenin diğer dik kenarı kaç cm dir?',
            '15', '12', '14', '9',
            '8-15-17 özel dik üçgeni veya x² + 8² = 17².',
            'x² = 289 − 64 = 225 ⇒ x = 15 cm.'
        ],
        [
            'Bir üçgenin kenar uzunlukları 6 cm ve 11 cm dir. Üçüncü kenarın alabileceği tam sayı değerlerinin sayısı kaçtır?',
            '11', '10', '12', '9',
            '11 − 6 < x < 11 + 6 ⇒ 5 < x < 17.',
            '6 dan 16 ya kadar 16 − 6 + 1 = 11 farklı tam sayı değeri vardır.'
        ],
        [
            'Dik kenar uzunlukları 5 cm ve 10 cm olan dik üçgenin hipotenüsü kaç cm dir?',
            '5√5', '15', '5√3', '10√2',
            '5² + 10² = 25 + 100 = 125 ⇒ √125.',
            '√125 = √(25 × 5) = 5√5 cm.'
        ],
        [
            'Köşeleri A(1, 2) ve B(7, 10) olan [AB] doğru parçasının uzunluğu kaç birimdir?',
            '10', '8', '12', '14',
            'Yatay fark |7 − 1| = 6, dikey fark |10 − 2| = 8. Pisagor uygulayın.',
            '√(6² + 8²) = √100 = 10 birim.'
        ],
        [
            'Bir ikizkenar üçgenin taban uzunluğu 12 cm ve eşit kenarları 10 cm ise tabana ait yüksekliği kaç cm dir?',
            '8', '6', '9', '7',
            'İkizkenar üçgende tabana inen yükseklik tabanı 6-6 iki eş parçaya böler.',
            'h² + 6² = 10² ⇒ h² = 64 ⇒ h = 8 cm.'
        ],
        [
            'Bir üçgenin tek bir şekilde çizilebilmesi için aşağıdaki bilgilerden hangisi YETERLİ DEĞİLDİR?',
            'Üç iç açısının ölçüsü', 'Üç kenarının uzunluğu', 'İki kenarı ve aralarındaki açı', 'Bir kenarı ve uçlarındaki iki açı',
            'Yalnızca üç açı bilinirse sonsuz tane benzer üçgen çizilebilir.',
            'Üç iç açının bilinmesi kenar uzunluklarını belirlemediği için tek bir üçgen çizimine yetmez.'
        ],
        [
            'Bir eşkenar üçgenin herhangi bir köşesinden çizilen yükseklik, aynı zamanda hangi yardımcı elemanlarla çakışır?',
            'Hem açıortay hem kenarortay', 'Yalnızca açıortay', 'Yalnızca kenarortay', 'Hiçbiri',
            'Eşkenar üçgende tüm yardımcı elemanlar simetri eksenidir.',
            'Eşkenar üçgende yükseklik, açıortay ve kenarortay aynı doğru parçasıdır.'
        ]
    ]),
    ...packStage(8, 'uc', 'Üçgenler', 'zor', [
        [
            'ABC üçgeninde [AB] = 7 cm, [AC] = 9 cm ve m(A) > 90° (geniş açı) ise [BC] kenarının alabileceği en küçük tam sayı değeri kaç cm dir?',
            '12', '11', '10', '13',
            'Geniş açı karşısındaki kenar, dik üçgendeki hipotenüsten büyüktür: x² > 7² + 9².',
            'x² > 49 + 81 = 130. 11² = 121 < 130 < 144 = 12² ⇒ en küçük x = 12 cm.'
        ],
        [
            'Köşegen uzunlukları 14 cm ve 48 cm olan bir eşkenar dörtgenin bir kenar uzunluğu kaç cm dir?',
            '25', '24', '26', '20',
            'Köşegenler birbirini dik ortalar: 7 cm ve 24 cm dik kenarlı üçgen oluşur.',
            '7² + 24² = 49 + 576 = 625 ⇒ kenar = 25 cm (7-24-25 üçgeni).'
        ],
        [
            'Ortak [AC] kenarına sahip ABC ve ADC üçgenlerinde AB = 6, BC = 8, AD = 5, DC = 11 cm ise |AC| nin alabileceği tam sayı değerleri toplamı kaçtır?',
            '70', '60', '63', '77',
            'Üçgen eşitsizliklerinin kesişimi: 2 < x < 14 ve 6 < x < 16 ⇒ 6 < x < 14.',
            'x ∈ {7, 8, 9, 10, 11, 12, 13} ⇒ toplam = 7 × 10 = 70.'
        ],
        [
            'Bir dik üçgende hipotenüs √50 cm ve dik kenarlardan biri diğerinin 2 katı ise kısa dik kenar kaç cm dir?',
            '√10', '5', '2√5', '√5',
            'Dik kenarlar k ve 2k olsun: k² + (2k)² = 50.',
            '5k² = 50 ⇒ k² = 10 ⇒ k = √10 cm.'
        ],
        [
            'Geniş açılı bir üçgende yüksekliklerin kesişim noktası (diklik merkezi) nerede bulunur?',
            'Üçgenin dış bölgesinde', 'Üçgenin iç bölgesinde', 'Geniş açılı köşede', 'En uzun kenarın orta noktasında',
            'Dar kenarlara çizilen yükseklikler kenar uzantılarına iner.',
            'Geniş açılı üçgende yüksekliklerin uzantıları üçgenin dış bölgesinde kesişir.'
        ],
        [
            'Bir ABC üçgeninde A köşesinden çizilen kenarortay [AD] nin uzunluğu 9 cm, [BC] = 18 cm ise m(BAC) açısı kaç derecedir?',
            '90°', '60°', '120°', '45°',
            'Muhteşem üçlü: hipotenüse ait kenarortay hipotenüsün yarısıdır.',
            '|AD| = |BD| = |DC| = 9 cm olduğundan A açısı 90° dir.'
        ],
        [
            'Çevresi 24 cm olan bir üçgenin bir kenar uzunluğu tam sayı olarak en fazla kaç cm olabilir?',
            '11', '12', '10', '13',
            'Bir kenar, çevrenin yarısından kesinlikle küçük olmalıdır (a < b + c ⇒ 2a < 24).',
            'a < 12 olduğundan en fazla 11 cm olabilir.'
        ]
    ]),
    ...packStage(8, 'uc', 'Üçgenler', 'sinav', [
        [
            'Merdivenin alt ucu duvardan 7 m daha uzağa kaydırılırsa üst ucu duvardan kaç metre aşağı iner?',
            '7', '5', '6', '4',
            'İlk durum: 5-12-13 üçgeni (yükseklik 12 m). Alt uç 5 + 7 = 12 m olunca yeni yükseklik 5 m olur.',
            '12 − 5 = 7 metre aşağı iner.',
            '13 metre uzunluğundaki bir merdiven, alt ucu duvardan 5 metre uzakta olacak biçimde dik duvara yaslanmıştır.'
        ],
        [
            'Buna göre A ve B noktaları arasındaki kuş uçuşu (en kısa) mesafe kaç metredir?',
            '25', '35', '30', '20',
            'Yatayda 15 m, dikeyde 20 m yol alındığına göre dik üçgenin hipotenüsünü bulun.',
            '15² + 20² = 225 + 400 = 625 ⇒ √625 = 25 m (3-4-5 üçgeninin 5 katı).',
            'Bir yürüyüşçü A noktasından önce doğuya doğru 15 m, ardından kuzeye doğru 20 m yürüyerek B noktasına ulaşıyor.'
        ],
        [
            'Fırtınada kırılan direğin kırılmadan önceki toplam yüksekliği kaç metredir?',
            '16', '18', '14', '20',
            'Yere devrilen kısım hipotenüstür: √(6² + 8²) = 10 m.',
            'Ayakta kalan 6 m + devrilen 10 m = 16 metre.',
            'Dik duran bir elektrik direği yerden 6 metre yüksekliğinden kırılmış ve tepe noktası direğin tabanından 8 metre uzağa yere değmiştir.'
        ],
        [
            'Buna göre kaydırağın eğimli kayma yüzeyinin uzunluğu kaç metredir?',
            '5', '4,5', '5,5', '6',
            'Dik kenarlar 3 m ve 4 m olan dik üçgenin hipotenüsünü hesaplayın.',
            '3² + 4² = 25 ⇒ hipotenüs = 5 metre.',
            'Çocuk parkındaki kaydırağın merdiven yüksekliği 3 m, kaydırağın yere değdiği noktanın merdiven tabanına uzaklığı 4 m dir.'
        ],
        [
            'Bir marangoz elindeki 7 cm ve 12 cm lik iki çıtaya üçüncü bir çıta ekleyerek üçgen çerçeve yapacaktır. Üçüncü çıtanın tam sayı uzunluğu en az kaç cm, en çok kaç cm olabilir?',
            'En az 6 cm, en çok 18 cm', 'En az 5 cm, en çok 19 cm', 'En az 6 cm, en çok 19 cm', 'En az 7 cm, en çok 18 cm',
            'Üçgen eşitsizliği: 12 − 7 < x < 12 + 7 ⇒ 5 < x < 19.',
            '5 ten büyük en küçük tam sayı 6, 19 dan küçük en büyük tam sayı 18 dir.',
            'Atölyede 7 cm ve 12 cm uzunluğunda iki ahşap çıta kullanılarak üçgen bir raf çerçevesi yapılacaktır.'
        ],
        [
            'Katlama işlemi sonunda elde edilen [AD] çizgisi ABC üçgeninin hangi yardımcı elemanıdır?',
            'Açıortay', 'Kenarortay', 'Yükseklik', 'Orta dikme',
            '[AB] kenarı [AC] kenarı üzerine tam çakıştığında A açısı iki eş parçaya bölünür.',
            'Komşu iki kenarı üst üste getiren katlama izi o köşenin açıortayını oluşturur.',
            'Kağıttan kesilmiş bir ABC üçgeninde [AB] kenarı [AC] kenarı ile çakışacak şekilde katlanıp tekrar açılıyor ve oluşan kat izi [AD] olarak işaretleniyor.'
        ],
        [
            'Buna göre dikdörtgen şeklindeki televizyon ekranının köşegen (ekran boyutu) uzunluğu kaç birimdir?',
            '20', '28', '24', '22',
            '12-16-20 dik üçgenini (3-4-5 in 4 katı) kullanın.',
            '√(12² + 16²) = √(144 + 256) = √400 = 20 birim.',
            'Eni 16 birim, boyu 12 birim olan dikdörtgen bir televizyon ekranının köşegen uzunluğu ölçülmektedir.'
        ]
    ]),

    // =========================================================================
    // 8. KONU: Eşlik ve Benzerlik (Benzerlik Oranı, Çevre/Alan Oranı, Uygulamalar)
    // =========================================================================
    ...packStage(8, 'eb', 'Eşlik ve Benzerlik', 'kolay', [
        [
            'Benzer iki üçgenin karşılıklı açıları için aşağıdakilerden hangisi her zaman doğrudur?',
            'Ölçüleri birbirine eşittir', 'Benzerlik oranıyla çarpılır', 'Toplamları 360° dir', 'Birbirinin yarısıdır',
            'Benzer şekillerin biçimleri aynı olduğundan açıları değişmez.',
            'Benzer çokgenlerin karşılıklı iç açılarının ölçüleri eşittir.'
        ],
        [
            'Benzerlik oranı 1 olan iki üçgen için ne söylenebilir?',
            'Eş üçgenlerdir', 'Alanları farklıdır', 'Çevreleri farklıdır', 'Yalnızca açıları eşittir',
            'k = 1 ise karşılıklı tüm kenarlar eşittir.',
            'Benzerlik oranı 1 olan şekiller birebir eş (≅) şekillerdir.'
        ],
        [
            'Benzer iki üçgenin benzerlik oranı 2/3 ise çevrelerinin oranı kaçtır?',
            '2/3', '4/9', '8/27', '1/3',
            'Benzer çokgenlerin çevreleri oranı benzerlik oranına eşittir.',
            'Çevreler oranı = k = 2/3.'
        ],
        [
            'Benzer iki karenin benzerlik oranı 1/4 ise alanlarının oranı kaçtır?',
            '1/16', '1/4', '1/8', '1/2',
            'Benzer şekillerin alanları oranı benzerlik oranının karesine (k²) eşittir.',
            '(1/4)² = 1/16.'
        ],
        [
            'ABC ~ DEF benzerliğinde |AB| = 6 cm, |DE| = 9 cm ve |BC| = 8 cm ise |EF| kaç cm dir?',
            '12', '10', '14', '11',
            '6 / 9 = 8 / |EF| orantısını kurun.',
            '2 / 3 = 8 / |EF| ⇒ |EF| = 12 cm.'
        ],
        [
            'Aşağıdaki geometrik şekil çiftlerinden hangisi HER ZAMAN birbirine benzerdir?',
            'İki eşkenar üçgen', 'İki dikdörtgen', 'İki ikizkenar üçgen', 'İki paralelkenar',
            'Tüm açıları her zaman eşit ve kenarları sabit oranlı şekiller her zaman benzerdir.',
            'Tüm eşkenar üçgenlerin açıları 60°-60°-60° olduğundan her zaman benzerdirler.'
        ],
        [
            'ABC ≅ KLM eşliğinde m(A) = 50° ve m(L) = 70° ise m(C) kaç derecedir?',
            '60°', '50°', '70°', '80°',
            'Sıralamaya göre m(B) = m(L) = 70° dir.',
            'm(C) = 180° − (50° + 70°) = 60°.'
        ]
    ]),
    ...packStage(8, 'eb', 'Eşlik ve Benzerlik', 'orta', [
        [
            'Kenarları 4 cm, 6 cm ve 8 cm olan üçgene benzer başka bir üçgenin en uzun kenarı 20 cm ise çevresi kaç cm dir?',
            '45', '40', '50', '36',
            'Benzerlik oranı k = 20 / 8 = 5/2 dir. İlk çevre 18 cm dir.',
            'Yeni çevre = 18 × (5/2) = 45 cm.'
        ],
        [
            'Alanları oranı 9 / 25 olan benzer iki çokgenin çevreleri oranı kaçtır?',
            '3/5', '9/25', '81/625', '3/25',
            'Alanlar oranı k² = 9/25 ⇒ k = √(9/25) = 3/5.',
            'Çevreler oranı = k = 3/5.'
        ],
        [
            'Bir ABC üçgeninde DE // BC dir. |AD| = 4 cm, |DB| = 6 cm ve |DE| = 6 cm ise |BC| kaç cm dir?',
            '15', '12', '9', '18',
            'Küçük üçgenin kenarı |AD| = 4, büyük üçgenin kenarı |AB| = 4 + 6 = 10 dur.',
            '4 / 10 = 6 / |BC| ⇒ 4 · |BC| = 60 ⇒ |BC| = 15 cm.'
        ],
        [
            'Kenar uzunlukları 6 cm ve 9 cm olan dikdörtgen ile kenarları 10 cm ve x cm olan dikdörtgen benzerdir. Kısa kenar 10 cm olduğuna göre x kaçtır?',
            '15', '12', '13', '18',
            '6 / 10 = 9 / x orantısını çözün.',
            '6x = 90 ⇒ x = 15 cm.'
        ],
        [
            'Benzer iki üçgenin benzerlik oranı 3/4 ve küçük üçgenin alanı 27 cm² ise büyük üçgenin alanı kaç cm² dir?',
            '48', '36', '64', '54',
            'Alanlar oranı (3/4)² = 9/16 dır.',
            '9 / 16 = 27 / A ⇒ A = 3 × 16 = 48 cm².'
        ],
        [
            'Kelebek benzerliğinde AB // CD, |AE| = 4 cm, |ED| = 8 cm ve |AB| = 5 cm ise |CD| kaç cm dir? (E kesişim noktası)',
            '10', '8', '12', '15',
            '4 / 8 = 5 / |CD| orantısını kurun.',
            '1 / 2 = 5 / |CD| ⇒ |CD| = 10 cm.'
        ],
        [
            'Eş iki üçgenden birinin dik kenarları 5 cm ve 12 cm ise diğer üçgenin çevresi kaç cm dir?',
            '30', '24', '34', '28',
            'Hipotenüs 13 cm dir; eş üçgenlerin çevreleri eşittir.',
            '5 + 12 + 13 = 30 cm.'
        ]
    ]),
    ...packStage(8, 'eb', 'Eşlik ve Benzerlik', 'zor', [
        [
            'Bir ABC üçgeninde DE // BC, |AD| = 3 cm ve |DB| = 6 cm dir. ADE üçgeninin alanı 8 cm² ise BCED yamuğunun alanı kaç cm² dir?',
            '64', '72', '56', '48',
            'Benzerlik oranı k = 3 / (3+6) = 1/3 ⇒ alanlar oranı 1/9. Büyük üçgen 72 cm² dir.',
            'Yamuğun alanı = 72 − 8 = 64 cm².'
        ],
        [
            'Benzer iki üçgenden birinin yüksekliği 6 cm, diğerinin buna karşılık gelen yüksekliği 9 cm dir. Büyük üçgenin alanı 63 cm² ise küçük üçgenin alanı kaç cm² dir?',
            '28', '42', '32', '24',
            'Yükseklikler oranı benzerlik oranına eşittir: k = 6/9 = 2/3 ⇒ k² = 4/9.',
            '4 / 9 = A / 63 ⇒ A = 4 × 7 = 28 cm².'
        ],
        [
            'Bir üçgenin kenar uzunlukları 12 cm, 15 cm ve 18 cm dir. Bu üçgene benzer ve çevresi 60 cm olan üçgenin en kısa kenarı kaç cm dir?',
            '16', '15', '18', '20',
            'İlk çevre = 12 + 15 + 18 = 45 cm. k = 60 / 45 = 4/3.',
            'En kısa kenar = 12 × (4/3) = 16 cm.'
        ],
        [
            'Koordinat düzleminde köşeleri O(0,0), A(4,0), B(0,3) olan üçgenle benzerlik oranı 3 olan ve orijinden büyütülen üçgenin hipotenüsü kaç birimdir?',
            '15', '12', '9', '18',
            'İlk hipotenüs 5 birimdir. k = 3 ile çarpılır.',
            '5 × 3 = 15 birim.'
        ],
        [
            'İki benzer dikdörtgenin çevreleri 24 cm ve 36 cm dir. Küçük dikdörtgenin alanı 32 cm² ise büyük dikdörtgenin alanı kaç cm² dir?',
            '72', '48', '64', '54',
            'k = 24 / 36 = 2/3 ⇒ alanlar oranı k² = 4/9.',
            '4 / 9 = 32 / A ⇒ A = 8 × 9 = 72 cm².'
        ],
        [
            'Bir ABC üçgeninde D ∈ [AB], E ∈ [AC] ve DE // BC dir. |AD| = 2x, |DB| = x + 3, |AE| = 8, |EC| = 6 ise x kaçtır?',
            '6', '4', '5', '8',
            'Thales orantısı: 2x / (x + 3) = 8 / 6 = 4 / 3.',
            '6x = 4x + 12 ⇒ 2x = 12 ⇒ x = 6.'
        ],
        [
            'Bir fotoğraf 8 cm × 12 cm boyutundadır. En-boy oranı korunarak kısa kenarı 20 cm olacak biçimde büyütülürse yeni alanı kaç cm² olur?',
            '600', '480', '540', '720',
            'k = 20 / 8 = 2,5 ⇒ uzun kenar = 12 × 2,5 = 30 cm.',
            'Alan = 20 × 30 = 600 cm².'
        ]
    ]),
    ...packStage(8, 'eb', 'Eşlik ve Benzerlik', 'sinav', [
        [
            'Aynı anda 1,6 m boyundaki bir öğrencinin gölgesi 2 m ölçüldüğüne göre bayrak direğinin boyu kaç metredir?',
            '8', '7,5', '9', '6,4',
            'Boy / Gölge oranları eşittir: 1,6 / 2 = h / 10.',
            'h = (1,6 × 10) / 2 = 8 metre.',
            'Güneşli bir günde okul bahçesindeki bayrak direğinin gölgesi 10 metre olarak ölçülmüştür.'
        ],
        [
            'Buna göre nehrin genişliği |AB| kaç metredir?',
            '24', '18', '20', '30',
            'Kelebek benzerliğini kullanın: |AB| / 12 = 16 / 8.',
            '|AB| = 12 × 2 = 24 metre.',
            'Harita mühendisleri nehrin karşısındaki A noktasına olan genişliği ölçmek için benzer dik üçgenler oluşturuyor: küçük üçgende karşı kenar 12 m, komşu 8 m; büyük üçgende komşu 16 m dir.'
        ],
        [
            'Buna göre projektörün duvarda oluşturduğu görüntünün yüksekliği kaç cm dir?',
            '150', '120', '180', '160',
            'Benzer üçgenlerde uzaklık oranı yükseklik oranına eşittir: 2 / 5 = 60 / h.',
            '2h = 300 ⇒ h = 150 cm.',
            'Bir projeksiyon cihazı 2 m uzaktaki perdeye 60 cm yüksekliğinde görüntü yansıtmaktadır. Cihaz perdeden 5 m uzağa taşınıyor.'
        ],
        [
            'Maket üzerindeki kare parkın alanı 25 cm² olduğuna göre gerçek parkın alanı kaç m² dir?',
            '10.000', '1.000', '2.500', '40.000',
            '1/2000 ölçeğinde 1 cm = 20 m dir. 5 cm × 5 cm lik kare gerçekte 100 m × 100 m dir.',
            '100 × 100 = 10.000 m².',
            '1 / 2.000 ölçekli bir şehir maketinde kare şeklindeki parkın alanı 25 cm² olarak modellenmiştir.'
        ],
        [
            'Ekrandaki 12 cm × 18 cm lik dikdörtgen afiş %50 oranında küçültülerek (kenarları yarıya indirilerek) yazdırıldığında kapladığı alan yüzde kaç azalır?',
            '%75', '%50', '%25', '%60',
            'Kenarlar 1/2 oranına inerse alan (1/2)² = 1/4 ine iner.',
            '1 − 1/4 = 3/4 = %75 azalır.',
            'Grafik tasarımcı 12 cm × 18 cm boyutundaki broşürü kenar uzunluklarını yarıya düşürerek cep boy basacaktır.'
        ],
        [
            '2 m yüksekliğindeki bir duvarın 3 m gerisinden bakan 1,5 m boyundaki gözlemci, duvarın 9 m ötesindeki ağacın tepe noktasını duvarın üst kenarıyla aynı hizada görüyor. Ağacın boyu kaç metredir?',
            '3,5', '4', '3', '4,5',
            'Göz hizası 1,5 m den yukarıdaki dik üçgenleri alın: duvar farkı 0,5 m (3 m de). Toplam yatay 12 m.',
            '0,5 / 3 = x / 12 ⇒ x = 2 m. Ağaç boyu = 1,5 + 2 = 3,5 m.',
            'Bir gözlemci 1,5 m göz yüksekliğiyle kendisinden 3 m ilerideki 2 m yüksekliğindeki duvarın hemen üzerinden 9 m daha gerideki ağacın tepesini görmektedir.'
        ],
        [
            'İki benzer üçgen levhanın metal ağırlıkları alanlarıyla doğru orantılıdır. Benzerlik oranı 2/5 olan bu levhalardan küçüğü 200 gram ise büyüğü kaç gramdır?',
            '1.250', '500', '1.000', '800',
            'Alanlar oranı (2/5)² = 4/25 tir.',
            '4 / 25 = 200 / W ⇒ W = 50 × 25 = 1.250 gram.',
            'Aynı kalınlıktaki sacdan kesilmiş benzer iki üçgen trafik levhasının kütleleri yüzey alanlarıyla orantılıdır.'
        ]
    ]),

    // =========================================================================
    // 9. KONU: Dönüşüm Geometrisi (Koordinat Sisteminde Öteleme, Yansıma, Bileşke)
    // =========================================================================
    ...packStage(8, 'dg', 'Dönüşüm Geometrisi', 'kolay', [
        [
            'A(3, -4) noktasının x eksenine göre yansımasının koordinatları hangisidir?',
            '(3, 4)', '(-3, -4)', '(-3, 4)', '(-4, 3)',
            'x eksenine göre yansımada x sabit kalır, y işaret değiştirir.',
            '(3, -4) → (3, 4).'
        ],
        [
            'B(-5, 2) noktasının y eksenine göre yansımasının koordinatları hangisidir?',
            '(5, 2)', '(-5, -2)', '(5, -2)', '(2, -5)',
            'y eksenine göre yansımada y sabit kalır, x işaret değiştirir.',
            '(-5, 2) → (5, 2).'
        ],
        [
            'C(1, -2) noktası 4 birim sola ve 5 birim yukarı ötelendiğinde yeni koordinatları ne olur?',
            '(-3, 3)', '(5, -7)', '(-3, -7)', '(5, 3)',
            'x ten 4 çıkarın, y ye 5 ekleyin.',
            '(1 − 4, -2 + 5) = (-3, 3).'
        ],
        [
            'D(6, -1) noktasının orijine göre yansımasının (önce x sonra y eksenine göre yansımasının) koordinatları nedir?',
            '(-6, 1)', '(6, 1)', '(-6, -1)', '(1, -6)',
            'Orijine göre yansımada hem x hem y işaret değiştirir.',
            '(6, -1) → (-6, 1).'
        ],
        [
            'Bir şekle öteleme ve yansıma uygulandığında elde edilen görüntü ile ilk şekil arasındaki ilişki nedir?',
            'Eş şekillerdir', 'Yalnızca benzerdirler', 'Alanları iki katına çıkar', 'Açıları değişir',
            'Öteleme ve yansıma boyut ve açıları korur.',
            'Elde edilen görüntü ilk şekille birebir eştir.'
        ],
        [
            'K(-2, 7) noktası 6 birim sağa ötelenirse hangi bölgeye geçer?',
            'I. Bölge', 'II. Bölge', 'III. Bölge', 'IV. Bölge',
            '(-2 + 6, 7) = (4, 7) olur.',
            'x > 0 ve y > 0 olduğundan I. Bölgeye geçer.'
        ],
        [
            'M(0, 5) noktasının y eksenine göre yansıması hangi noktadır?',
            '(0, 5)', '(0, -5)', '(5, 0)', '(-5, 0)',
            'y ekseni üzerindeki noktaların y eksenine göre yansıması kendileridir.',
            '(-0, 5) = (0, 5).'
        ]
    ]),
    ...packStage(8, 'dg', 'Dönüşüm Geometrisi', 'orta', [
        [
            'A(-4, 3) noktası önce x eksenine göre yansıtılıyor, sonra 5 birim sağa öteleniyor. Son koordinatları nedir?',
            '(1, -3)', '(-9, -3)', '(1, 3)', '(9, -3)',
            'x e göre yansıma: (-4, -3). 5 birim sağa: (-4 + 5, -3).',
            '(1, -3).'
        ],
        [
            'B(a, -6) noktasının y eksenine göre yansıması B′(4, b) olduğuna göre a + b kaçtır?',
            '-10', '-2', '10', '2',
            'y eksenine göre yansıma (-a, -6) = (4, b) verir.',
            'a = -4, b = -6 ⇒ a + b = -10.'
        ],
        [
            'P(2, -5) noktası 3 birim sola ve 7 birim yukarı ötelendikten sonra y eksenine göre yansıtılıyor. Elde edilen nokta hangisidir?',
            '(1, 2)', '(-1, 2)', '(1, -2)', '(-5, 2)',
            'Öteleme: (2−3, -5+7) = (-1, 2). y eksenine yansıma: x işaret değiştirir.',
            '(1, 2).'
        ],
        [
            'T(5, 2) noktasının x = 2 doğrusuna göre yansımasının koordinatları hangisidir?',
            '(-1, 2)', '(-5, 2)', '(5, -2)', '(0, 2)',
            'x = 5 in x = 2 ye uzaklığı 3 birimdir; 2 − 3 = -1.',
            '(-1, 2).'
        ],
        [
            'K(-3, 1) noktasının y = -2 doğrusuna göre yansımasının koordinatları nedir?',
            '(-3, -5)', '(-3, -1)', '(-3, -4)', '(3, -5)',
            'y = 1 in y = -2 ye uzaklığı 3 birimdir; -2 − 3 = -5.',
            '(-3, -5).'
        ],
        [
            'Köşelerinden biri A(2, 4) olan bir üçgen ötelendiğinde A′(-3, 1) elde ediliyor. Aynı öteleme B(5, -2) köşesine uygulanırsa B′ ne olur?',
            '(0, -5)', '(10, 1)', '(0, 1)', '(-1, -5)',
            'Öteleme kuralı: x′ = x − 5, y′ = y − 3.',
            'B′ = (5 − 5, -2 − 3) = (0, -5).'
        ],
        [
            'A(-2, -3) noktasının önce x eksenine göre yansıması, sonra 4 birim sağa ve 2 birim aşağı ötelenmesiyle oluşan nokta hangi bölgededir?',
            'I. Bölge', 'II. Bölge', 'III. Bölge', 'IV. Bölge',
            'Yansıma: (-2, 3). Öteleme: (-2+4, 3−2) = (2, 1).',
            '(2, 1) noktası I. Bölgededir.'
        ]
    ]),
    ...packStage(8, 'dg', 'Dönüşüm Geometrisi', 'zor', [
        [
            'A(m − 2, 5) noktası ile B(3, 2n + 1) noktası x eksenine göre simetrik ise m · n çarpımı kaçtır?',
            '-15', '15', '-10', '10',
            'x eksenine göre simetrik noktalarda apsisler eşit, ordinatlar zıt işaretlidir.',
            'm − 2 = 3 ⇒ m = 5; 2n + 1 = -5 ⇒ n = -3. Çarpım = 5 × (-3) = -15.'
        ],
        [
            'A(-3, 4) noktasının y eksenine göre yansıması B, B nin x eksenine göre yansıması C dir. ABC üçgeninin alanı kaç birimkaredir?',
            '24', '48', '12', '36',
            'A(-3, 4), B(3, 4), C(3, -4) bir dik üçgendir: |AB| = 6 br, |BC| = 8 br.',
            'Alan = (6 × 8) / 2 = 24 br².'
        ],
        [
            'K(a, b) noktası 4 birim sağa, 3 birim aşağı ötelenip ardından y eksenine göre yansıtıldığında K″(-1, 2) noktası elde ediliyor. a + b kaçtır?',
            '2', '4', '0', '6',
            'Geri sarın: y yansımasından önce (1, 2). Ötelemeden önce a + 4 = 1 ⇒ a = -3; b − 3 = 2 ⇒ b = 5.',
            'a + b = -3 + 5 = 2.'
        ],
        [
            'A(1, 2), B(5, 2), C(5, 5) üçgeninin y = 2 doğrusuna göre yansıması alındığında C ile C′ noktaları arasındaki uzaklık kaç birimdir?',
            '6', '3', '5', '10',
            'C(5, 5) in y = 2 ye uzaklığı 3 birimdir; C′(5, -1) olur.',
            '5 − (-1) = 6 birim.'
        ],
        [
            'Bir P(x, y) noktasına ardışık olarak "2 birim sağa, 3 birim aşağı" ötelemesi 4 kez uygulandığında P′(5, -7) oluyor. P noktasının başlangıç koordinatları nedir?',
            '(-3, 5)', '(-3, -5)', '(3, 5)', '(-5, 5)',
            '4 tekrarda toplam +8 sağa, -12 aşağı gidilir.',
            'x + 8 = 5 ⇒ x = -3; y − 12 = -7 ⇒ y = 5 ⇒ (-3, 5).'
        ],
        [
            'Koordinat düzleminde y = 2x + 4 doğrusunun x eksenine göre yansıması olan doğrunun denklemi hangisidir?',
            'y = -2x − 4', 'y = -2x + 4', 'y = 2x − 4', 'y = x − 4',
            'x eksenine göre yansımada y yerine -y yazılır.',
            '-y = 2x + 4 ⇒ y = -2x − 4.'
        ],
        [
            'A(2, 3) ve B(6, 5) noktalarını birleştiren doğru parçası x eksenine göre yansıtıldığında A′B′ doğru parçasının uzunluğu kaç birim olur?',
            '2√5', '4', '2√3', '6',
            'Yansıma uzunluğu değiştirmez: √((6−2)² + (5−3)²) = √(16 + 4).',
            '√20 = 2√5 birim.'
        ]
    ]),
    ...packStage(8, 'dg', 'Dönüşüm Geometrisi', 'sinav', [
        [
            'Bilgisayar oyunundaki karakterin hedef kapıya ulaşması için yaptığı dönüşüm hangisidir?',
            'y eksenine göre yansıma, sonra 4 birim aşağı öteleme', 'x eksenine göre yansıma, sonra 4 birim sağa öteleme', 'y eksenine göre yansıma, sonra 4 birim yukarı öteleme', '6 birim sağa, 4 birim yukarı öteleme',
            '(-3, 5) ten (3, 1) e ulaşmak için önce y eksenine yansıma → (3, 5), sonra 4 aşağı → (3, 1).',
            '(-3, 5) → y yansıması (3, 5) → 4 birim aşağı (3, 1).',
            'Bir 2D platform oyununda A(-3, 5) noktasında bulunan karakter, dönüşüm portalını kullanarak B(3, 1) noktasındaki kapıya ışınlanıyor.'
        ],
        [
            'Oluşan simetrik desende en son çizilen 4. motifin merkez koordinatları nedir?',
            '(6, -2)', '(6, 2)', '(4, -2)', '(8, -2)',
            '1. motif (-6, 2) → her adımda 4 birim sağa ve x eksenine göre yansıma.',
            '1: (-6, 2) → 2: (-2, -2) → 3: (2, 2) → 4: (6, -2).',
            'Bir duvar kâğıdı tasarımında merkezi (-6, 2) olan motif, her adımda 4 birim sağa ötelenip x eksenine göre yansıtılarak 4 adımlı şerit desen oluşturuluyor.'
        ],
        [
            'Bu iki ayna yansıması sonucu lazer ışınının ulaştığı son hedef nokta ile başlangıç noktası arasındaki uzaklık kaç birimdir?',
            '10', '8', '12', '14',
            'Başlangıç (-3, 4), önce y sonra x yansıması → (3, -4). İki nokta arası uzaklık √(6² + 8²).',
            '√((3 − (-3))² + (-4 − 4)²) = √(36 + 64) = 10 birim.',
            'Optik düzenekte (-3, 4) noktasındaki ışın önce y eksenindeki aynadan, sonra x eksenindeki aynadan simetrik olarak yansıtılıyor.'
        ],
        [
            'Köşeleri (-4, 1), (-1, 1), (-1, 3), (-4, 3) olan dikdörtgen levha önce y eksenine göre yansıtılıyor, sonra 2 birim aşağı öteleniyor. Yeni dikdörtgenin köşelerinden biri hangisi OLAMAZ?',
            '(4, 3)', '(1, -1)', '(4, -1)', '(1, 1)',
            'y yansıması: (4,1),(1,1),(1,3),(4,3). 2 aşağı: (4,-1),(1,-1),(1,1),(4,1).',
            '(4, 3) yeni köşeler arasında yer almaz.',
            'CAD çizim programında koordinatları verilen bir dikdörtgen parça y eksenine göre aynalanıp 2 birim aşağı kaydırılıyor.'
        ],
        [
            'Koordinat düzleminde merkezi (2, 3) ve yarıçapı 2 birim olan daire, x eksenine göre yansıtılırsa yeni dairenin x eksenine en yakın noktasının ordinatı kaç olur?',
            '-1', '-3', '-5', '-2',
            'Yeni merkez (2, -3) olur. Yarıçap 2 birim yukarı çıktığında en yakın nokta y = -3 + 2 = -1 dir.',
            'En yakın nokta (2, -1) olduğundan ordinat -1 dir.',
            'Bir logo tasarımında merkezi (2, 3) ve yarıçapı 2 birim olan dairesel rozetin x eksenine göre simetriği çiziliyor.'
        ],
        [
            'Kareli haritada A(1, -2) konumundan harekete geçen drone, önce x eksenine göre yansıması olan B ye, sonra B nin y eksenine göre yansıması olan C ye uçuyor. Drone toplam kaç birim yol almıştır?',
            '6', '4', '8', '10',
            'A(1,-2) → B(1,2) mesafe 4 br; B(1,2) → C(-1,2) mesafe 2 br.',
            'Toplam yol = 4 + 2 = 6 birim.',
            'Otonom teslimat drone’u eksenlere paralel uçarak önce x eksenine simetrik noktaya, ardından y eksenine simetrik noktaya gidiyor.'
        ],
        [
            'Bir üçgenin ağırlık merkezi G(-2, 5) noktasındadır. Üçgen 6 birim sağa ve 8 birim aşağı ötelendiğinde yeni ağırlık merkezi G′ ile orijin O(0, 0) arasındaki mesafe kaç birim olur?',
            '5', '7', '6', '4',
            'G′ = (-2 + 6, 5 − 8) = (4, -3) olur.',
            'Orijine uzaklık = √(4² + (-3)²) = √25 = 5 birim.',
            'Animasyon yazılımında ağırlık merkezi (-2, 5) olan üçgen nesne ekranda kaydırılarak yeni konumuna taşınıyor.'
        ]
    ]),

    // =========================================================================
    // 10. KONU: Geometrik Cisimler (Dik Prizmalar, Dik Dairesel Silindir, Piramit, Koni)
    // =========================================================================
    ...packStage(8, 'gc', 'Geometrik Cisimler', 'kolay', [
        [
            'Taban yarıçapı 4 cm ve yüksekliği 10 cm olan dik dairesel silindirin hacmi kaç cm³ tür? (π = 3 alınız.)',
            '480', '240', '160', '360',
            'Silindirin hacmi V = π · r² · h.',
            '3 × 4² × 10 = 3 × 16 × 10 = 480 cm³.'
        ],
        [
            'Taban yarıçapı 5 cm ve yüksekliği 8 cm olan dik dairesel silindirin yanal alanı kaç cm² dir? (π = 3 alınız.)',
            '240', '120', '300', '180',
            'Yanal alan = 2 · π · r · h.',
            '2 × 3 × 5 × 8 = 240 cm².'
        ],
        [
            'Bir beşgen dik prizmanın toplam kaç tane yüzü vardır?',
            '7', '5', '10', '15',
            'n-gen prizmada 2 taban + n yanal yüz = n + 2 yüz bulunur.',
            '5 + 2 = 7 yüz.'
        ],
        [
            'Bir kare dik piramidin toplam kaç tane ayrıtı vardır?',
            '8', '5', '6', '12',
            'Tabanda 4 ayrıt, yanlarda tepeye çıkan 4 ayrıt vardır.',
            '4 + 4 = 8 ayrıt.'
        ],
        [
            'Dik dairesel silindirin açınımında yanal yüz hangi geometrik şekildir?',
            'Dikdörtgen', 'Üçgen', 'Daire dilimi', 'Yamuk',
            'Silindirin yan yüzeyi açıldığında düz bir dikdörtgen oluşturur.',
            'Taban çevresi ile yüksekliğin oluşturduğu bir dikdörtgendir.'
        ],
        [
            'Dik dairesel koninin açınımında hangi iki geometrik şekil bulunur?',
            'Bir daire ve bir daire dilimi', 'İki daire ve bir dikdörtgen', 'Bir kare ve dört üçgen', 'İki üçgen ve bir daire',
            'Koninin tabanı daire, yan yüzü daire dilimidir.',
            'Açınım 1 daire (taban) ve 1 daire diliminden (yanal yüz) oluşur.'
        ],
        [
            'Taban ayrıtı 6 cm ve yüksekliği 10 cm olan kare dik prizmanın hacmi kaç cm³ tür?',
            '360', '240', '180', '600',
            'Hacim = Taban Alanı × Yükseklik = a² · h.',
            '6² × 10 = 36 × 10 = 360 cm³.'
        ]
    ]),
    ...packStage(8, 'gc', 'Geometrik Cisimler', 'orta', [
        [
            'Taban yarıçapı 3 cm ve yüksekliği 7 cm olan dik dairesel silindirin tüm yüzey alanı kaç cm² dir? (π = 3 alınız.)',
            '180', '126', '153', '216',
            'Yüzey alanı = 2πr² + 2πrh.',
            '2×3×9 + 2×3×3×7 = 54 + 126 = 180 cm².'
        ],
        [
            'Hacmi 540 cm³ ve yüksekliği 5 cm olan dik dairesel silindirin taban yarıçapı kaç cm dir? (π = 3 alınız.)',
            '6', '5', '8', '9',
            '3 · r² · 5 = 540 ⇒ 15r² = 540.',
            'r² = 36 ⇒ r = 6 cm.'
        ],
        [
            'Taban kenarı 10 cm ve yan yüz yüksekliği 13 cm olan kare dik piramidin cisim yüksekliği kaç cm dir?',
            '12', '10', '8', '11',
            'Taban yarı-kenarı 5 cm, cisim yüksekliği h ve yan yüz yüksekliği 13 cm dik üçgen oluşturur.',
            'h² + 5² = 13² ⇒ h = 12 cm (5-12-13 üçgeni).'
        ],
        [
            'Taban yarıçapı 6 cm ve yüksekliği 8 cm olan dik dairesel koninin ana doğrusu (yan ayrıt uzunluğu) kaç cm dir?',
            '10', '12', '14', '9',
            'r, h ve ana doğru (a) dik üçgen oluşturur: 6² + 8² = a².',
            'a = √100 = 10 cm.'
        ],
        [
            'Taban çevresi 24 cm ve yüksekliği 10 cm olan kare dik prizmanın yüzey alanı kaç cm² dir?',
            '312', '240', '276', '360',
            'Bir taban kenarı 24/4 = 6 cm dir. Yüzey alanı = 2(6²) + 24×10.',
            '72 + 240 = 312 cm².'
        ],
        [
            'Bir altıgen dik piramidin yüz sayısı (Y), köşe sayısı (K) ve ayrıt sayısı (A) için Y + K − A kaçtır?',
            '2', '0', '4', '1',
            'Altıgen piramitte Y = 7, K = 7, A = 12 dir (Euler bağıntısı).',
            '7 + 7 − 12 = 2.'
        ],
        [
            'Dik kenarları 3 cm ve 4 cm, hipotenüsü 5 cm olan dik üçgen dik prizmanın yüksekliği 8 cm ise hacmi kaç cm³ tür?',
            '48', '96', '60', '72',
            'Taban alanı = (3 × 4) / 2 = 6 cm².',
            'Hacim = 6 × 8 = 48 cm³.'
        ]
    ]),
    ...packStage(8, 'gc', 'Geometrik Cisimler', 'zor', [
        [
            'Kenarları 12 cm ve 18 cm olan dikdörtgen karton, 18 cm lik kenarları çakışacak şekilde kıvrılarak dik dairesel silindir yapılıyor. Bu silindirin hacmi kaç cm³ tür? (π = 3 alınız.)',
            '216', '324', '432', '192',
            '18 cm lik kenarlar çakışınca yükseklik h = 18 cm, taban çevresi 2πr = 12 cm olur.',
            '6r = 12 ⇒ r = 2 cm. V = 3 × 2² × 18 = 216 cm³.'
        ],
        [
            'Aynı dikdörtgen karton (12 cm × 18 cm) bu kez 12 cm lik kenarları çakışacak şekilde kıvrılırsa oluşan silindirin hacmi kaç cm³ olur? (π = 3 alınız.)',
            '324', '216', '432', '288',
            'h = 12 cm ve taban çevresi 2πr = 18 cm ⇒ r = 3 cm.',
            'V = 3 × 3² × 12 = 27 × 12 = 324 cm³.'
        ],
        [
            'Yarıçapı 2 katına çıkarılıp yüksekliği yarıya indirilen bir dik dairesel silindirin hacmi nasıl değişir?',
            '2 katına çıkar', 'Değişmez', '4 katına çıkar', 'Yarıya iner',
            'Yeni hacim: π · (2r)² · (h/2) = π · 4r² · h/2 = 2πr²h.',
            'Başlangıç hacminin tam 2 katına çıkar.'
        ],
        [
            'Taban yarıçapı 4 cm ve ana doğrusu 12 cm olan dik dairesel koninin açınımındaki daire diliminin merkez açısı kaç derecedir?',
            '120°', '90°', '150°', '60°',
            'Konide r / a = α / 360° bağıntısını kullanın.',
            '4 / 12 = α / 360° ⇒ 1 / 3 = α / 360° ⇒ α = 120°.'
        ],
        [
            'Taban kenarı 12 cm ve cisim yüksekliği 8 cm olan kare dik piramidin tüm yüzey alanı kaç cm² dir?',
            '384', '240', '336', '432',
            'Yan yüz yüksekliği = √(6² + 8²) = 10 cm dir. 4 yan üçgen + 1 kare taban.',
            'Taban = 144, 4 yan yüz = 4 × (12×10/2) = 240. Toplam = 144 + 240 = 384 cm².'
        ],
        [
            'Yanal alanı 180 cm² ve hacmi 270 cm³ olan dik dairesel silindirin taban yarıçapı kaç cm dir?',
            '3', '4', '6', '5',
            'V / Yanal Alan = (πr²h) / (2πrh) = r / 2 dir!',
            '270 / 180 = r / 2 ⇒ 3 / 2 = r / 2 ⇒ r = 3 cm.'
        ],
        [
            'Ayrıt uzunlukları 4 cm, 6 cm ve 9 cm olan dikdörtgenler prizması eritilerek bir küp yapılıyor. Bu küpün bir ayrıtı kaç cm olur?',
            '6', '5', '7', '8',
            'Hacim korunur: a³ = 4 × 6 × 9 = 216.',
            'a³ = 216 ⇒ a = 6 cm.'
        ]
    ]),
    ...packStage(8, 'gc', 'Geometrik Cisimler', 'sinav', [
        [
            'Silindir şeklindeki boya rulosu duvar üzerinde 10 tam tur döndürüldüğünde kaç cm² lik alan boyanmış olur? (π = 3 alınız.)',
            '6.000', '3.000', '4.800', '7.200',
            '1 turda boyanan alan rulo silindirinin yanal alanıdır: 2πrh.',
            '1 tur = 2 × 3 × 5 × 20 = 600 cm². 10 tur = 6.000 cm².',
            'Yarıçapı 5 cm ve genişliği (yüksekliği) 20 cm olan silindir biçimindeki bir boya rulosu düz duvarda yuvarlanmaktadır.'
        ],
        [
            'Tamamen dolu olan silindir su deposundaki su, 6 litrelik bidonlara doldurulacaktır. En fazla kaç bidon tam olarak dolar? (π = 3 alınız; 1 dm³ = 1 L)',
            '40', '36', '45', '32',
            'V = 3 × 4² × 5 = 240 dm³ = 240 litre.',
            '240 / 6 = 40 bidon tam dolar.',
            'Taban yarıçapı 4 dm ve yüksekliği 5 dm olan dik dairesel silindir biçimindeki su deposu ağzına kadar su ile doludur.'
        ],
        [
            'Konserve kutusunun sadece yan yüzeyini tam saracak kâğıt etiketin alanı kaç cm² dir? (π = 3 alınız.)',
            '360', '420', '300', '480',
            'Etiket alanı silindirin yanal alanıdır: 2πrh (r = 5 cm, h = 12 cm).',
            '2 × 3 × 5 × 12 = 360 cm².',
            'Taban çapı 10 cm ve yüksekliği 12 cm olan silindir şeklindeki konserve kutusunun yan yüzeyine boşluk kalmadan etiket yapıştırılacaktır.'
        ],
        [
            'Bir ayrıtı 6 cm olan kare prizmanın içine sığabilecek en büyük dik dairesel silindirin hacmi kaç cm³ tür? (Prizmanın yüksekliği 10 cm, π = 3 alınız.)',
            '270', '360', '180', '300',
            'Silindirin taban çapı en fazla 6 cm (r = 3 cm), yüksekliği 10 cm olabilir.',
            'V = 3 × 3² × 10 = 270 cm³.',
            'Taban ayrıtı 6 cm, yüksekliği 10 cm olan kare dik prizma şeklindeki bir kutunun içine dik olarak yerleştirilebilecek en büyük silindir şişe tasarlanıyor.'
        ],
        [
            'Şekildeki gibi taban yarıçapı 4 cm olan içi su dolu silindir kapta su yüksekliği 9 cm dir. Bu suyun tamamı taban yarıçapı 6 cm olan boş bir silindir kaba boşaltılırsa su yüksekliği kaç cm olur?',
            '4', '6', '3', '5',
            'Hacim değişmez: π · 4² · 9 = π · 6² · h₂.',
            '16 × 9 = 36 · h₂ ⇒ 144 = 36 · h₂ ⇒ h₂ = 4 cm.',
            'Kimya laboratuvarında yarıçapı 4 cm olan silindir beherdeki 9 cm yükseklikteki çözelti, yarıçapı 6 cm olan geniş silindir kaba aktarılıyor.'
        ],
        [
            'Kare piramit şeklindeki kamp çadırının taban kenarı 6 m ve yan yüz yüksekliği 5 m dir. Çadırın yalnızca 4 yan yüzeyini kaplamak için kaç m² branda gerekir?',
            '60', '96', '72', '48',
            '4 eş üçgen yan yüzün alanını toplayın: 4 × (6 × 5 / 2).',
            '4 × 15 = 60 m².',
            'Taban ayrıtı 6 m, yan yüz yüksekliği 5 m olan kare dik piramit biçimindeki çadırın yan yüzeyleri su geçirmez branda ile kaplanacaktır.'
        ],
        [
            'Taban yarıçapı 5 cm ve yüksekliği 12 cm olan dondurma külahının (dik dairesel koni) ana doğrusunun uzunluğu kaç cm dir?',
            '13', '15', '14', '17',
            '5-12-13 dik üçgeni oluşur.',
            '√(5² + 12²) = √169 = 13 cm.',
            'Bir pastanede üretilen dik dairesel koni şeklindeki külahın ağız yarıçapı 5 cm, dik yüksekliği 12 cm dir.'
        ]
    ]),

    // =========================================================================
    // 11. KONU: Veri Analizi (Daire, Sütun, Çizgi Grafikleri ve Dönüşümleri)
    // =========================================================================
    ...packStage(8, 'va', 'Veri Analizi', 'kolay', [
        [
            'Toplam 180 öğrencinin bulunduğu bir okulda 45 öğrenci müzik kulübündedir. Bu veri daire grafiğinde kaç derecelik merkez açıyla gösterilir?',
            '90°', '60°', '120°', '45°',
            '(45 / 180) × 360°.',
            '(1 / 4) × 360° = 90°.'
        ],
        [
            'Bir daire grafiğinde 72° lik dilim, bütünün yüzde kaçını temsil eder?',
            '%20', '%25', '%15', '%18',
            '(72 / 360) × 100.',
            '(1 / 5) × 100 = %20.'
        ],
        [
            'Bir çiftlikteki 360 hayvanın 120 si koyun, 90 ı keçi, kalanı inektir. İneklerin daire grafiğindeki merkez açısı kaç derecedir?',
            '150°', '120°', '140°', '160°',
            'Toplam 360 hayvan olduğu için her 1 hayvan 1° dir.',
            '360 − (120 + 90) = 150°.'
        ],
        [
            'Bir aracın saatlere göre hız değişimini göstermek için en uygun grafik türü hangisidir?',
            'Çizgi grafiği', 'Daire grafiği', 'Sütun grafiği', 'Venn şeması',
            'Zamana bağlı sürekli artış/azalış çizgi grafiğiyle izlenir.',
            'Çizgi grafiği.'
        ],
        [
            'Bir daire grafiğinde %35 lik bir dilimin merkez açısı kaç derecedir?',
            '126°', '120°', '135°', '108°',
            '360° nin %35 ini alın: 360 × 35 / 100.',
            '3,6 × 35 = 126°.'
        ],
        [
            'Farklı şehirlerin yıllık yağış miktarlarını birbirleriyle karşılaştırmak için en uygun grafik türü hangisidir?',
            'Sütun grafiği', 'Daire grafiği', 'Çizgi grafiği', 'Sayı doğrusu',
            'Kategoriler arası miktar karşılaştırmasında sütun grafiği tercih edilir.',
            'Sütun grafiği.'
        ],
        [
            'Bir daire grafiğinde 108° lik dilim 240 kg meyveyi gösteriyorsa toplam meyve miktarı kaç kg dır?',
            '800', '720', '900', '600',
            '108 / 360 = 3 / 10 dur.',
            '(3 / 10) · T = 240 ⇒ T = 800 kg.'
        ]
    ]),
    ...packStage(8, 'va', 'Veri Analizi', 'orta', [
        [
            'Bir daire grafiğinde A: 140°, B: 100° ve C geri kalan açıdır. A ile C nin farkı 40 kişi ise toplam kişi sayısı kaçtır?',
            '720', '360', '540', '600',
            'C = 360° − 240° = 120°. A − C = 140° − 120° = 20°.',
            '20° = 40 kişi ⇒ 1° = 2 kişi ⇒ 360° = 720 kişi.'
        ],
        [
            'Bir fabrikada üretilen 900 aracın %40 ı beyaz, %25 i siyah ve kalanı gridir. Gri araçlar daire grafiğinde kaç dereceyle gösterilir?',
            '126°', '135°', '108°', '144°',
            'Gri oranı = %100 − %65 = %35 tir.',
            '360° × 35 / 100 = 126°.'
        ],
        [
            'Sütun grafiğinde 4 şubenin kitap sayıları 40, 60, 80, 60 olarak verilmiştir. Bu veriler daire grafiğine aktarıldığında 80 kitaplık şube kaç derece olur?',
            '120°', '90°', '100°', '135°',
            'Toplam kitap = 240. 80 / 240 = 1/3.',
            '(1 / 3) × 360° = 120°.'
        ],
        [
            'Daire grafiğinde 150° lik dilimdeki elmaların sayısı 100 adettir. Aynı grafikte 90° lik dilimdeki armutların sayısı kaçtır?',
            '60', '50', '75', '80',
            '150° → 100 adet ise her 3° → 2 adettir.',
            '90° × (100 / 150) = 60 adet.'
        ],
        [
            'Bir mağazada Pazartesi 30, Salı 45, Çarşamba 60, Perşembe 45 adet ürün satılmıştır. Günlük ortalama satış kaç adettir?',
            '45', '40', '50', '42',
            '(30 + 45 + 60 + 45) / 4.',
            '180 / 4 = 45 adet.'
        ],
        [
            'Bir bahçedeki ağaçların 3/8 i elma, 1/4 ü kiraz, kalanı eriktir. Erik ağaçlarının daire grafiğindeki açısı kaç derecedir?',
            '135°', '120°', '150°', '90°',
            'Erik oranı = 1 − (3/8 + 2/8) = 3/8.',
            '(3 / 8) × 360° = 135°.'
        ],
        [
            'Bir çizgi grafiğinde bir bitkinin boyu 1. hafta 12 cm, 5. hafta 28 cm olarak ölçülmüştür. Sabit hızla büyüyen bitki haftada kaç cm uzamıştır?',
            '4', '3', '5', '3,5',
            '4 haftada 28 − 12 = 16 cm uzamıştır.',
            '16 / 4 = 4 cm/hafta.'
        ]
    ]),
    ...packStage(8, 'va', 'Veri Analizi', 'zor', [
        [
            'Bir okulda 8. sınıfların şubelere göre dağılımı daire grafiğinde 8A: 120°, 8B: 100°, 8C: 140° dir. 8C şubesinde 8B den 12 öğrenci fazla olduğuna göre 8A şubesinde kaç öğrenci vardır?',
            '36', '30', '42', '40',
            '140° − 100° = 40° = 12 öğrenci ⇒ 10° = 3 öğrenci.',
            '8A = 120° = 12 × 3 = 36 öğrenci.'
        ],
        [
            'Bir depodaki A ve B ürünlerinin toplamı 180 adettir ve daire grafiğinde A ürünü 120° dir. Depoya 60 adet daha A ürünü eklenirse yeni daire grafiğinde A ürününün merkez açısı kaç derece olur?',
            '180°', '160°', '200°', '150°',
            'Başta A = 60, B = 120 dir. 60 A eklenince A = 120, B = 120 (toplam 240) olur.',
            '120 / 240 = 1/2 ⇒ 180°.'
        ],
        [
            'İki ayrı daire grafiğinden 1. grafik (toplam 360 ürün) A ürününü 90°, 2. grafik (toplam 720 ürün) A ürününü 60° göstermektedir. İki fabrikadaki toplam A ürünü sayısı kaçtır?',
            '210', '180', '240', '150',
            '1. fabrika: 360×(90/360) = 90; 2. fabrika: 720×(60/360) = 120.',
            '90 + 120 = 210 ürün.'
        ],
        [
            'Bir tarladaki buğday, arpa ve mısır ekili alanlar daire grafiğinde sırasıyla 150°, 90° ve 120° dir. Dönüm başına buğdaydan 400 kg, arpadan 300 kg, mısırdan 500 kg verim alınmaktadır. Toplam 120 dönüm tarladan kaç ton buğday elde edilir?',
            '20', '18', '24', '15',
            'Buğday alanı = 120 × (150/360) = 50 dönüm.',
            '50 × 400 kg = 20.000 kg = 20 ton.'
        ],
        [
            'Bir mağazanın Ocak-Şubat-Mart satışları 200, 250 ve 450 adettir. Nisan ayında kaç adet satış yapılırsa 4 aylık daire grafiğinde Nisan ayının merkez açısı 90° olur?',
            '300', '250', '360', '225',
            'Nisan 90° ise diğer 3 ay 270° dir (3 katı).',
            '270° = 200 + 250 + 450 = 900 adet ⇒ 90° = 900 / 3 = 300 adet.'
        ],
        [
            'Bir sınıftaki öğrencilerin %45 i futbol, %30 u basketbol, kalan 10 öğrenci voleybol oynamaktadır. Futbol oynayan öğrenci sayısı basketboldan kaç fazladır?',
            '6', '4', '8', '5',
            'Voleybol = %25 = 10 kişi ⇒ toplam sınıf = 40 kişi.',
            'Futbol − Basketbol = %15 ⇒ 40 × 15 / 100 = 6 kişi.'
        ],
        [
            'Bir şirketin 2024 yılı geliri 720.000 TL olup 4 çeyreğin dağılımı 60°, 90°, 120°, 90° dir. 3. çeyrek geliri 1. çeyrek gelirinden yüzde kaç fazladır?',
            '%100', '%50', '%60', '%120',
            '1. çeyrek 60°, 3. çeyrek 120° dir (tam 2 katı).',
            '(120 − 60) / 60 = 1 = %100 fazladır.'
        ]
    ]),
    ...packStage(8, 'va', 'Veri Analizi', 'sinav', [
        [
            'Buna göre satılan 8. sınıf test kitaplarının sayısı, 7. sınıf test kitaplarının sayısından kaç fazladır?',
            '90', '60', '120', '75',
            '8. sınıf = 150°, 7. sınıf = 90° (fark 60°). Toplam 540 kitapta 60° = 1/6 dır.',
            '540 × (60 / 360) = 90 kitap fazladır.',
            'Bir kitabevinde bir haftada satılan 540 matematik test kitabının sınıflara göre dağılımı daire grafiğinde 5. Sınıf 60°, 6. Sınıf 60°, 7. Sınıf 90° ve 8. Sınıf 150° olarak gösterilmiştir.'
        ],
        [
            'Buna göre gün sonunda toplam kaç adet kusurlu tişört ayrılmıştır?',
            '44', '40', '48', '36',
            'Beyaz (120°) = 400 adet (%3 → 12); Siyah (150°) = 500 adet (%4 → 20); Mavi (90°) = 300 adet (%4 → 12).',
            '12 + 20 + 12 = 44 kusurlu tişört.',
            'Bir tekstil atölyesinde bir günde üretilen 1.200 tişörtün renklere göre dağılımı daire grafiğinde Beyaz 120°, Siyah 150°, Mavi 90° dir. Beyazların %3 ü, Siyahların %4 ü ve Mavilerin %4 ü kusurlu çıkmıştır.'
        ],
        [
            'Aynı okulun 2024 ve 2025 yılı öğrenci sayıları sırasıyla 360 ve 450 dir. 2024 te 8. sınıflar daire grafiğinde 100°, 2025 te 80° ile gösterilmiştir. İki yıldaki 8. sınıf öğrenci sayıları için ne söylenebilir?',
            'Değişmemiştir (ikisi de 100 öğrencidir)', '20 öğrenci azalmıştır', '20 öğrenci artmıştır', '10 öğrenci artmıştır',
            '2024: 360 × (100/360) = 100. 2025: 450 × (80/360) = 100.',
            'Merkez açısı küçülse de toplam öğrenci arttığı için 8. sınıf sayısı 100 olarak sabit kalmıştır.',
            'Bir ortaokulun 2024 yılında 360, 2025 yılında 450 öğrencisi bulunmaktadır. Her iki yılın sınıf dağılımı ayrı daire grafikleriyle sunulmuştur.'
        ],
        [
            'Üç gün boyunca çözülen toplam soru sayısı 720 dir. 1. gün 200, 2. gün 280 soru çözüldüğüne göre 3. gün çözülen sorular daire grafiğinde kaç dereceyle gösterilir?',
            '120°', '100°', '140°', '110°',
            '3. gün = 720 − (200 + 280) = 240 soru. 240 / 720 = 1/3.',
            '(1 / 3) × 360° = 120°.',
            'LGS kampındaki bir öğrenci 3 günde toplam 720 soru çözmüş ve günlük dağılımı sütun grafiğinden daire grafiğine dönüştürmüştür.'
        ],
        [
            'Bir galerideki 180 aracın marka dağılımı daire grafiğinde A: 160°, B: 120°, C: 80° dir. Galeriden 20 adet A marka araç satılıp yerine 20 adet C marka araç alınırsa yeni grafikte A ve C nin açıları farkı kaç derece olur?',
            '0° (Eşit olurlar)', '20°', '40°', '10°',
            'Başta A = 80, B = 60, C = 40 araçtır. Değişim sonrası A = 60, C = 60 olur.',
            'A ve C nin adetleri 60 ar olduğundan açıları da 120° şer olur ve farkları 0° dir.',
            '180 araçlık bir oto galeride araç stoğu güncellenerek yeniden daire grafiğine aktarılmaktadır.'
        ],
        [
            'Bir çiftlikte 4 günde toplanan yumurta sayıları çizgi grafiğinde Pzt 180, Sal 220, Çar 160, Per 240 olarak gösterilmiştir. En çok yumurta toplanan gün, 4 günlük toplamın yüzde kaçını oluşturur?',
            '%30', '%25', '%35', '%28',
            'Toplam = 180 + 220 + 160 + 240 = 800. En yüksek gün Perşembe (240).',
            '(240 / 800) × 100 = %30.',
            'Organik yumurta çiftliğinde 4 günlük üretim çizgi grafiği üzerinden analiz edilmektedir.'
        ],
        [
            'Bir elektronik mağazasında 400 adet ürünün %30 u telefon, %45 i kulaklık, kalanı tablettir. Bir tabletin fiyatı 5.000 TL olduğuna göre tüm tabletlerin toplam satış değeri kaç TL dir?',
            '500.000', '400.000', '600.000', '450.000',
            'Tablet oranı %25 ⇒ 400 × 25 / 100 = 100 adet tablet.',
            '100 × 5.000 = 500.000 TL.',
            'Mağazanın aylık 400 adetlik satış dağılımı yüzde dilimli daire grafiğiyle raporlanmıştır.'
        ]
    ]),

    // =========================================================================
    // 12. KONU: Olasılık (Basit Olayların Olma Olasılığı, LGS Kurguları)
    // =========================================================================
    ...packStage(8, 'ol', 'Olasılık', 'kolay', [
        [
            'Hilesiz bir zar atıldığında üst yüze asal sayı gelme olasılığı kaçtır?',
            '1/2', '1/3', '2/3', '1/6',
            'Zardaki asal sayılar {2, 3, 5} olmak üzere 3 tanedir.',
            '3 / 6 = 1/2.'
        ],
        [
            '1 den 12 ye kadar numaralandırılmış kartlardan rastgele çekilen bir kartın 4 ün katı olma olasılığı kaçtır?',
            '1/4', '1/3', '1/6', '1/2',
            '4 ün katları: {4, 8, 12} (3 kart).',
            '3 / 12 = 1/4.'
        ],
        [
            'Bir torbada 5 kırmızı, 7 mavi, 8 sarı bilye vardır. Rastgele çekilen bilyenin mavi olma olasılığı kaçtır?',
            '7/20', '7/13', '3/10', '2/5',
            'Toplam bilye = 5 + 7 + 8 = 20.',
            'P(Mavi) = 7/20.'
        ],
        [
            'Bir olayın olma olasılığı 0,35 ise olmama olasılığı kaçtır?',
            '0,65', '0,55', '0,75', '0,45',
            'P(A) + P(A′) = 1.',
            '1 − 0,35 = 0,65.'
        ],
        [
            'Hilesiz bir madeni para ve bir zar aynı anda atıldığında oluşabilecek tüm olası durumların sayısı kaçtır?',
            '12', '8', '6', '18',
            'Para için 2, zar için 6 durum: 2 × 6.',
            '2 × 6 = 12 olası durum vardır.'
        ],
        [
            'Aşağıdaki sayılardan hangisi bir olayın olma olasılığı OLAMAZ?',
            '5/4', '0', '1', '3/7',
            'Olasılık değeri her zaman 0 ile 1 arasındadır (0 ≤ P ≤ 1).',
            '5/4 = 1,25 > 1 olduğundan olasılık değeri olamaz.'
        ],
        [
            '“OLASILIK” kelimesinin harfleri özdeş kartlara yazılıp çekildiğinde sesli harf gelme olasılığı kaçtır?',
            '1/2', '3/8', '5/8', '1/4',
            '8 harf içinde sesliler: O, A, I, I (4 tane).',
            '4 / 8 = 1/2.'
        ]
    ]),
    ...packStage(8, 'ol', 'Olasılık', 'orta', [
        [
            '1 den 25 e kadar (dahil) tam sayılar kartlara yazılıyor. Rastgele çekilen kartın tam kare sayı olma olasılığı kaçtır?',
            '1/5', '4/25', '6/25', '1/4',
            'Tam kareler: {1, 4, 9, 16, 25} (5 tane).',
            '5 / 25 = 1/5.'
        ],
        [
            '24 ün pozitif tam sayı çarpanları eş kartlara yazılıp torbaya atılıyor. Rastgele çekilen kartın çift sayı olma olasılığı kaçtır?',
            '3/4', '1/2', '5/8', '7/8',
            '24 ün çarpanları: {1, 2, 3, 4, 6, 8, 12, 24} (8 tane). Çiftler: 6 tane.',
            '6 / 8 = 3/4.'
        ],
        [
            'Bir torbada 9 sarı ve bir miktar yeşil top vardır. Yeşil çekme olasılığı 2/5 ise torbada kaç yeşil top vardır?',
            '6', '9', '15', '12',
            'Sarı çekme olasılığı 1 − 2/5 = 3/5 tir. 3/5 = 9 / Toplam ⇒ Toplam = 15.',
            'Yeşil = 15 − 9 = 6 top.'
        ],
        [
            'İki hilesiz zar aynı anda atıldığında üst yüze gelen sayıların toplamının 7 olma olasılığı kaçtır?',
            '1/6', '1/9', '5/36', '7/36',
            'Toplam 36 durumdan toplamı 7 olanlar: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 durum.',
            '6 / 36 = 1/6.'
        ],
        [
            '1 den 30 a kadar sayılardan rastgele seçilen bir sayının 18 ile aralarında asal olma olasılığı kaçtır?',
            '1/3', '2/5', '1/2', '7/15',
            '18 in asal çarpanları 2 ve 3 tür. 1-30 arası 2 ve 3 e bölünmeyenler: 1,5,7,11,13,17,19,23,25,29 (10 sayı).',
            '10 / 30 = 1/3.'
        ],
        [
            'İçinde 4 kırmızı, 5 mavi, 6 beyaz bilye olan torbadan en az kaç bilye çıkarılırsa kalan bilyeler arasında her rengin çekilme olasılığı eşit olur?',
            '3', '2', '4', '5',
            'Her renkten en az olan kadar (4 er tane) bırakmak için 1 mavi + 2 beyaz çıkarılır.',
            '1 + 2 = 3 bilye çıkarılmalıdır.'
        ],
        [
            'Rastgele seçilen iki basamaklı bir doğal sayının tam kare olma olasılığı kaçtır?',
            '1/15', '1/10', '7/90', '1/18',
            'İki basamaklı 90 sayı (10–99) vardır. Tam kareler: {16, 25, 36, 49, 64, 81} (6 tane).',
            '6 / 90 = 1/15.'
        ]
    ]),
    ...packStage(8, 'ol', 'Olasılık', 'zor', [
        [
            '√1 den √20 ye kadar (dahil) tüm kareköklü ifadeler kartlara yazılıyor. Rastgele çekilen karttaki sayının rasyonel sayı olma olasılığı kaçtır?',
            '1/5', '1/4', '3/20', '3/10',
            'Rasyonel olanlar tam karelerin kökleridir: √1, √4, √9, √16 (4 tane).',
            '4 / 20 = 1/5.'
        ],
        [
            'Bir sınıfta 28 öğrenci vardır. Rastgele seçilen bir öğrencinin kız olma olasılığı 3/7 den fazla olduğuna göre sınıfta EN AZ kaç kız öğrenci vardır?',
            '13', '12', '14', '15',
            'x / 28 > 3 / 7 = 12 / 28 ⇒ x > 12.',
            '12 den büyük en küçük tam sayı 13 kız öğrencidir.'
        ],
        [
            'A = {√2, √3, √8, √12} kümesinden rastgele seçilen farklı iki sayının çarpımının doğal sayı olma olasılığı kaçtır?',
            '1/3', '1/2', '1/6', '2/3',
            '4 sayıdan 6 farklı çift seçilebilir: (√2,√8) ve (√3,√12) çiftlerinin çarpımı doğal sayıdır (2 durum).',
            '2 / 6 = 1/3.'
        ],
        [
            'Bir torbada 12 mavi ve x kırmızı top vardır. Torbadan 3 mavi top alınıp yerine 3 kırmızı top konulduğunda kırmızı çekme olasılığı 1/2 oluyor. Başlangıçtaki x kaçtır?',
            '6', '9', '8', '12',
            'Yeni durumda mavi = 9, kırmızı = x + 3 olur. Olasılık 1/2 ise sayılar eşittir.',
            'x + 3 = 9 ⇒ x = 6.'
        ],
        [
            '20 kişilik bir sınıfta gözlüklü kız sayısı 4, gözlüksüz kız sayısı 6, gözlüklü erkek sayısı 3 tür. Rastgele seçilen bir öğrencinin gözlüksüz ERKEK olma olasılığı kaçtır?',
            '7/20', '3/10', '1/4', '2/5',
            'Gözlüksüz erkek = 20 − (4 + 6 + 3) = 7 kişi.',
            '7 / 20.'
        ],
        [
            'Bir kenarı 10 cm olan karenin içine kenarlara teğet bir daire çiziliyor. Karenin içine rastgele atılan bir noktanın dairenin DIŞINDA kalma olasılığı kaçtır? (π = 3 alınız.)',
            '1/4', '3/4', '1/5', '1/3',
            'Kare alanı = 100 cm², daire alanı = 3×5² = 75 cm². Dış bölge = 25 cm².',
            '25 / 100 = 1/4.'
        ],
        [
            '36 nın pozitif tam sayı bölenlerinden rastgele seçilen birinin asal sayı olma olasılığı kaçtır?',
            '2/9', '1/3', '1/9', '4/9',
            '36 nın bölenleri: {1, 2, 3, 4, 6, 9, 12, 18, 36} (9 tane). Asallar: {2, 3} (2 tane).',
            '2 / 9.'
        ]
    ]),
    ...packStage(8, 'ol', 'Olasılık', 'sinav', [
        [
            'Kalan koltuklardan rastgele bilet alan bir yolcunun cam kenarı ve çift numaralı bir koltukta oturma olasılığı kaçtır?',
            '1/4', '1/5', '3/10', '1/3',
            '1 den 20 ye kadar 20 boş koltukta cam kenarı {1,4,5,8,9,12,13,16,17,20} → bunlardan çift olanlar {4,8,12,16,20} (5 tane).',
            '5 / 20 = 1/4.',
            'Bir otobüste 1 den 20 ye kadar numaralanmış 20 boş koltuk 2+2 düzenindedir (cam kenarı koltuklar: 1, 4, 5, 8, 9, 12, 13, 16, 17, 20).'
        ],
        [
            'Bu sınıftan rastgele seçilen bir öğrencinin sıra numarasının 2 nin pozitif tam sayı kuvveti olma olasılığı kaçtır?',
            '2/15', '1/6', '1/5', '1/10',
            '1 den 30 a kadar 2 nin pozitif tam sayı kuvvetleri: 2, 4, 8, 16 (4 tane).',
            '4 / 30 = 2/15.',
            '30 öğrencili 8-B sınıfında öğrenciler 1 den 30 a kadar ardışık sıra numaraları almıştır.'
        ],
        [
            'İki torbadaki topların tamamı tek bir büyük kutuda birleştirilip rastgele bir top çekildiğinde sarı gelme olasılığı kaç olur?',
            '2/5', '1/2', '3/10', '9/20',
            '1. torba: 5 sarı + 7 mavi; 2. torba: 7 sarı + 11 mavi ⇒ toplam 12 sarı, 30 top.',
            '12 / 30 = 2/5.',
            'Birinci torbada 5 sarı 7 mavi, ikinci torbada 7 sarı 11 mavi özdeş top vardır. İki torbanın tamamı boş bir kutuya boşaltılıyor.'
        ],
        [
            'Daire grafiği verilen bir okul kulübünden rastgele seçilen bir öğrencinin Robotik kulübünde olma olasılığı kaçtır?',
            '1/4', '1/3', '1/5', '2/9',
            'Robotik kulübünün merkez açısı 90° ise olasılık 90° / 360° dir.',
            '90 / 360 = 1/4.',
            'Okul kulüplerinin öğrenci dağılımı daire grafiğinde Müzik 110°, Spor 160° ve kalanı Robotik kulübü olarak gösterilmiştir.'
        ],
        [
            'Hedef tahtasına isabet eden bir okun boyalı (ortadaki kare) bölgeye isabet etme olasılığı kaçtır?',
            '1/9', '1/3', '1/6', '2/9',
            'Büyük kare 12×12 = 144 cm², içteki boyalı kare 4×4 = 16 cm².',
            '16 / 144 = 1/9.',
            'Kenar uzunluğu 12 cm olan kare hedef tahtasının tam ortasına kenar uzunluğu 4 cm olan kare şeklinde bir ödül bölgesi boyanmıştır.'
        ],
        [
            'Bir apartmandaki 1 den 16 ya kadar numaralanmış dairelerden rastgele biri seçiliyor. Seçilen daire numarasının karekökünün 3 ten büyük bir sayı olma olasılığı kaçtır?',
            '7/16', '1/2', '3/8', '9/16',
            '√n > 3 ⇒ n > 9 olmalıdır. 10, 11, 12, 13, 14, 15, 16 (7 daire).',
            '7 / 16.',
            '16 dairelik bir apartmanda çekilişle bir daireye yıl sonu hediyesi verilecektir.'
        ],
        [
            'Üzerinde 2⁻¹, 2⁰, 2¹, 2², 2³, (-2)² yazan 6 özdeş karttan rastgele biri çekildiğinde değerinin 1 den büyük tam sayı olma olasılığı kaçtır?',
            '2/3', '1/2', '5/6', '1/3',
            'Değerler: 1/2, 1, 2, 4, 8, 4. 1 den büyük tam sayılar: 2, 4, 8, 4 (4 kart).',
            '4 / 6 = 2/3.',
            'Matematik yarışmasında 6 adet üslü ifade kartı ters çevrilip karıştırılıyor ve yarışmacıdan rastgele bir kart seçmesi isteniyor.'
        ]
    ])
];
