import { MitStudyQuestion, packStage } from './types';

export const GRADE_7A_QUESTIONS: MitStudyQuestion[] = [
    // 1. TAM SAYILAR VE MUTLAK DEĞER
    ...packStage(7, 'ts', 'Tam Sayılar ve Mutlak Değer', 'kolay', [
        ['(-8) + (+5) işleminin sonucu kaçtır?', '-3', '3', '-13', '13', 'Zıt işaretli tam sayılarda büyükten küçük çıkarılır, büyüğün işareti konur.', '8 - 5 = 3; büyük olan negatif olduğundan -3.'],
        ['(-6) × (-4) işleminin sonucu kaçtır?', '+24', '-24', '+10', '-10', 'Aynı işaretli iki tam sayının çarpımı pozitiftir.', '(-) × (-) = (+) → +24.'],
        ['|-12| + |+7| işleminin sonucu kaçtır?', '19', '5', '-5', '-19', 'Mutlak değer bir sayının sıfıra uzaklığıdır, daima ≥ 0 olur.', '12 + 7 = 19.'],
        ['(-36) ÷ (+9) işleminin sonucu kaçtır?', '-4', '+4', '-27', '-6', 'Zıt işaretlilerin bölümü negatiftir.', '-36 ÷ 9 = -4.'],
        ['(-2)³ üslü ifadesinin değeri kaçtır?', '-8', '+8', '-6', '+6', 'Negatif sayının tek kuvveti negatiftir.', '(-2)×(-2)×(-2) = -8.'],
        ['(-5) - (-9) işleminin sonucu kaçtır?', '+4', '-14', '-4', '+14', 'İki eksi yan yana gelince artı olur: -5 + 9.', '-5 + 9 = +4.'],
        ['Aşağıdaki tam sayılardan hangisi en küçüktür?', '-15', '-3', '0', '-9', 'Sayı doğrusunda en soldaki sayı en küçüktür.', '-15 < -9 < -3 < 0.']
    ]),
    ...packStage(7, 'ts', 'Tam Sayılar ve Mutlak Değer', 'orta', [
        ['(-3)² - (-2)³ işleminin sonucu kaçtır?', '17', '1', '-17', '15', '(-3)² = +9, (-2)³ = -8.', '9 - (-8) = 9 + 8 = 17.'],
        ['(-4) × (+5) + (-18) ÷ (-3) işleminin sonucu kaçtır?', '-14', '-26', '+14', '-12', 'Önce çarpma ve bölme yapılır: -20 ve +6.', '-20 + 6 = -14.'],
        ['|-9| - |-15| + |+4| işleminin sonucu kaçtır?', '-2', '28', '10', '-10', 'Mutlak değerleri önce pozitif çıkarın: 9 - 15 + 4.', '9 - 15 = -6; -6 + 4 = -2.'],
        ['Mutlak değeri 6\'dan küçük olan kaç tane tam sayı vardır?', '11', '10', '12', '5', '-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5.', 'Toplam 11 tam sayı vardır.'],
        ['(-1)¹⁰⁰ + (-1)⁹⁹ - (-1)⁰ işleminin sonucu kaçtır?', '-1', '1', '0', '3', 'Çift kuvvet +1, tek kuvvet -1, 0. kuvvet +1.', '1 + (-1) - 1 = -1.'],
        ['-4² + (-4)² işleminin sonucu kaçtır?', '0', '32', '-32', '16', '-4² = -16, (-4)² = +16.', '-16 + 16 = 0.'],
        ['Bir dalgıç deniz seviyesinin 14 m altındayken 6 m yukarı çıkıp sonra 9 m daha derine iniyor. Son konumu nedir?', '-17 m', '-11 m', '-29 m', '-15 m', '-14 + 6 - 9.', '-8 - 9 = -17 m.']
    ]),
    ...packStage(7, 'ts', 'Tam Sayılar ve Mutlak Değer', 'zor', [
        ['|x - 3| = 7 eşitliğini sağlayan x tam sayılarının toplamı kaçtır?', '6', '10', '4', '14', 'x - 3 = 7 → x = 10 veya x - 3 = -7 → x = -4.', '10 + (-4) = 6.'],
        ['a = -3 ve b = -2 için a² - b³ + a×b işleminin sonucu kaçtır?', '23', '11', '7', '17', '(-3)² = 9, (-2)³ = -8, (-3)×(-2) = +6.', '9 - (-8) + 6 = 9 + 8 + 6 = 23.'],
        ['20 soruluk testte her doğru +5, her yanlış -2 puandır. 14 doğru ve 6 yanlış yapan öğrenci kaç puan alır?', '58', '70', '62', '54', '14×5 + 6×(-2).', '70 - 12 = 58 puan.'],
        ['Ardışık 5 tam sayının toplamı -25 olduğuna göre en büyük sayı kaçtır?', '-3', '-7', '-5', '-1', 'Ortadaki sayı -25 ÷ 5 = -5\'tir.', 'Sayılar: -7, -6, -5, -4, -3 → en büyük -3.'],
        ['Çarpımları -24 olan iki tam sayının toplamı en az kaç olabilir?', '-23', '-25', '-14', '-10', 'Bir çarpan -24, diğeri +1 seçildiğinde toplam en küçük olur.', '(-24) + (+1) = -23.'],
        ['(-2)⁴ ÷ (-4) - (-3) × (+5) işleminin sonucu kaçtır?', '11', '-19', '19', '-11', '16 ÷ (-4) = -4; (-3)×5 = -15.', '-4 - (-15) = -4 + 15 = 11.'],
        ['Bir soğuk hava deposunun sıcaklığı +12°C iken soğutucu çalıştırılıyor ve sıcaklık her 5 dakikada 3°C düşüyor. 35 dakika sonra sıcaklık kaç °C olur?', '-9°C', '-6°C', '-12°C', '-3°C', '35 ÷ 5 = 7 kez 3°C düşer (toplam 21°C).', '12 - 21 = -9°C.']
    ]),
    ...packStage(7, 'ts', 'Tam Sayılar ve Mutlak Değer', 'sinav', [
        ['Asansör son durumda kaçıncı kattadır?', '-2. kat', '-1. kat', '-3. kat', '0. kat', '-3 + 8 - 7.', '5 - 7 = -2. kat.', 'Bir AVM\'nin otoparkındaki -3. kattan binen kişi 8 kat yukarı çıkıp ardından 7 kat aşağı inmektedir.'],
        ['Hedefe 4 kırmızı, 3 mavi ve 2 sarı ok atan sporcu toplam kaç puan alır?', '12', '16', '8', '18', '4×(+6) + 3×(-2) + 2×(-3).', '24 - 6 - 6 = 12 puan.', 'Okçuluk tahtasında kırmızı +6, mavi -2, sarı -3 puan değerindedir.'],
        ['A ve B şehirleri arasındaki sıcaklık farkı kaç derecedir?', '23°C', '13°C', '18°C', '25°C', '(+5) - (-18) = 5 + 18.', '23°C fark vardır.', 'Aynı gün A şehrinde sıcaklık +5°C, B şehrinde ise -18°C ölçülmüştür.'],
        ['Kartlardan en küçük değere sahip olan ile en büyük değere sahip olanın toplamı kaçtır?', '9', '15', '5', '11', 'Kartlar: -27, +16, -9, +36.', 'En küçük -27, en büyük +36 → -27 + 36 = 9.', 'Dört kartta (-3)³, (-2)⁴, -3² ve (-6)² ifadeleri yazılıdır.'],
        ['6 saat sonunda bu dağın zirvesindeki sıcaklık kaç °C olur?', '-16°C', '-12°C', '-18°C', '-14°C', 'Her 200 m\'de 1°C düşer → 1 600 m\'de 8°C daha soğuk, ayrıca 6 saatte 6×2=12°C düşüş.', 'Başlangıç zirve: +4 - 8 = -4°C; 6 saat sonra -4 - 12 = -16°C.', 'Deniz seviyesinde sıcaklık +4°C iken 1 600 m yükseklikteki zirvede her 200 m\'de 1°C düşüş olmakta ve hava akşam saatlerinde saatte 2°C soğumaktadır.'],
        ['Buna göre x × y çarpımının en büyük değeri kaçtır?', '20', '16', '24', '12', '|x| = 5 → x = ±5; |y| = 4 → y = ±4.', 'Aynı işaretli seçilirse (-5)×(-4) = +20 veya 5×4 = +20.', 'Tam sayı olan x ve y için |x| = 5 ve |y| = 4 eşitlikleri verilmiştir.'],
        ['Tüm 5 turun sonunda oyuncunun net puanı kaçtır?', '-7', '-5', '-9', '+7', '3×(+4) + 2×(-5) + (-9) → kontrol: +12 - 10 - 9.', '12 - 19 = -7 puan.', 'Bir oyunda kazanılan her tur +4, kaybedilen her tur -5 puan; 1 kez kural ihlali ise -9 puandır. Oyuncu 3 tur kazanmış, 2 tur kaybetmiş ve 1 kural ihlali yapmıştır.']
    ]),

    // 2. RASYONEL SAYILARDA İŞLEMLER
    ...packStage(7, 'rs', 'Rasyonel Sayılarda İşlemler', 'kolay', [
        ['(-2/5) + (+4/5) işleminin sonucu kaçtır?', '2/5', '-2/5', '6/5', '-6/5', 'Paydalar eşit: (-2 + 4) / 5.', '2/5.'],
        ['(-3/4) × (+2/5) işleminin en sade sonucu kaçtır?', '-3/10', '3/10', '-6/9', '-5/20', '(-3×2) / (4×5) = -6/20.', 'Sadeleşince -3/10.'],
        ['(-1/2) ÷ (-3/4) işleminin sonucu kaçtır?', '2/3', '-2/3', '3/8', '-3/8', '(-1/2) × (-4/3) = +4/6.', '2/3.'],
        ['(-2/3)² üslü ifadesinin değeri kaçtır?', '4/9', '-4/9', '4/6', '-4/6', 'Negatif sayının çift kuvveti pozitiftir.', '(-2/3)×(-2/3) = 4/9.'],
        ['-3/5 rasyonel sayısının ondalık gösterimi hangisidir?', '-0,6', '-0,3', '-0,35', '-0,65', '2 ile genişletin: -6/10.', '-0,6.'],
        ['0,3̄ (3 devirli) ondalık gösteriminin rasyonel sayı karşılığı hangisidir?', '1/3', '3/10', '1/9', '3/100', 'Devreden 1 basamak → 3/9.', '3/9 = 1/3.'],
        ['-5/6 rasyonel sayısının toplama işlemine göre tersi hangisidir?', '+5/6', '-6/5', '+6/5', '-5/6', 'Toplamları 0 olan iki sayı birbirinin toplama tersidir.', '+5/6.']
    ]),
    ...packStage(7, 'rs', 'Rasyonel Sayılarda İşlemler', 'orta', [
        ['(-1/3) + (1/2) - (5/6) işleminin sonucu kaçtır?', '-2/3', '2/3', '-1/3', '-1/2', 'Paydaları 6\'da eşitleyin: -2/6 + 3/6 - 5/6.', '-4/6 = -2/3.'],
        ['(1 - 1/4) × (1 + 1/3) işleminin sonucu kaçtır?', '1', '3/4', '4/3', '5/6', '3/4 × 4/3.', '12/12 = 1.'],
        ['(-1/2)³ + (-1/2)² işleminin sonucu kaçtır?', '1/8', '-1/8', '3/8', '-3/8', '-1/8 + 1/4 = -1/8 + 2/8.', '1/8.'],
        ['1,2̄ (2 devirli) ondalık sayısının rasyonel karşılığı hangisidir?', '11/9', '12/9', '12/10', '10/9', '(12 - 1) / 9.', '11/9.'],
        ['-3/4, -2/3 ve -5/6 rasyonel sayılarının küçükten büyüğe sıralanışı hangisidir?', '-5/6 < -3/4 < -2/3', '-2/3 < -3/4 < -5/6', '-3/4 < -5/6 < -2/3', '-5/6 < -2/3 < -3/4', 'Payda 12 yapın: -10/12, -9/12, -8/12.', '-10/12 < -9/12 < -8/12.'],
        ['(2/3) ÷ (1/2 - 1/6) işleminin sonucu kaçtır?', '2', '1/2', '4/3', '3/2', 'Parantez içi 3/6 - 1/6 = 2/6 = 1/3.', '(2/3) ÷ (1/3) = 2.'],
        ['-4/7 rasyonel sayısının çarpma işlemine göre tersi hangisidir?', '-7/4', '+7/4', '+4/7', '-4/7', 'Çarpımları +1 olan sayı çarpma tersidir.', '-7/4.']
    ]),
    ...packStage(7, 'rs', 'Rasyonel Sayılarda İşlemler', 'zor', [
        ['1 + 1 / (1 + 1/2) çok adımlı işleminin sonucu kaçtır?', '5/3', '3/2', '4/3', '7/3', 'Önce alttan başlayın: 1 + 1/2 = 3/2; 1 ÷ (3/2) = 2/3.', '1 + 2/3 = 5/3.'],
        ['(1 - 1/2) × (1 - 1/3) × (1 - 1/4) × (1 - 1/5) işleminin sonucu kaçtır?', '1/5', '1/4', '2/5', '1/20', '1/2 × 2/3 × 3/4 × 4/5 sadeleşir.', 'Çapraz sadeleşince 1/5 kalır.'],
        ['Maaşının 1/3\'ünü kiraya, kalanının 1/4\'ünü mutfağa harcayan kişinin maaşının kaçta kaçı kalır?', '1/2', '5/12', '1/3', '7/12', 'Kalan 2/3; mutfak = 2/3 × 1/4 = 1/6.', 'Toplam harcanan 1/3 + 1/6 = 1/2; kalan 1/2.'],
        ['(-2/3)² ÷ (-4/9) + 1/2 işleminin sonucu kaçtır?', '-1/2', '3/2', '-3/2', '1/2', '(4/9) ÷ (-4/9) = -1.', '-1 + 1/2 = -1/2.'],
        ['0,16̄ (sadece 6 devirli) sayısının en sade rasyonel karşılığı hangisidir?', '1/6', '16/99', '15/99', '1/9', '(16 - 1) / 90 = 15/90.', '15/90 = 1/6.'],
        ['2 - (3 / (2 - 1/2)) işleminin sonucu kaçtır?', '0', '1', '2', '-1', '2 - 1/2 = 3/2; 3 ÷ (3/2) = 2.', '2 - 2 = 0.'],
        ['Bir çubuğun 1/5\'i kesildiğinde orta noktası 6 cm kaymaktadır. Çubuğun ilk uzunluğu kaç cm\'dir?', '60 cm', '30 cm', '45 cm', '75 cm', 'Kesilen parçanın yarısı orta nokta kaymasıdır: kesilen = 12 cm.', '1/5\'i 12 cm ise tamamı 12 × 5 = 60 cm.']
    ]),
    ...packStage(7, 'rs', 'Rasyonel Sayılarda İşlemler', 'sinav', [
        ['Deponun tamamı kaç litre su almaktadır?', '120 litre', '100 litre', '140 litre', '90 litre', '1/4\'ten 2/3\'e artış: 2/3 - 1/4 = 5/12.', '5/12\'si 50 L ise tamamı 50 ÷ 5 × 12 = 120 L.', '1/4\'ü su ile dolu depoya 50 litre daha su eklendiğinde deponun 2/3\'ü doluyor.'],
        ['Top 3. kez yere çarptıktan sonra kaç cm yükselir?', '27 cm', '36 cm', '18 cm', '45 cm', 'Her sıçramada 3/5\'i: 125 × (3/5)³.', '125 × 27/125 = 27 cm.', '125 cm yükseklikten bırakılan bir top her yere çarpışında önceki yüksekliğinin 3/5\'i kadar zıplamaktadır.'],
        ['Kalan 120 sayfa kitabın kaçta kaçıdır ve kitap toplam kaç sayfadır?', '3/8\'i ve 320 sayfa', '5/8\'i ve 320 sayfa', '3/8\'i ve 280 sayfa', '1/4\'ü ve 480 sayfa', '1/4 + 3/8 = 5/8 okundu → kalan 3/8 = 120.', '1/8 = 40 → tamamı 320 sayfa.', 'Bir kitabın ilk hafta 1/4\'ünü, ikinci hafta 3/8\'ini okuyan öğrencinin geriye 120 sayfası kalmıştır.'],
        ['Bu koşullar altında 1 tam litre zeytinyağı kaç TL\'ye gelmektedir?', '240 TL', '220 TL', '260 TL', '200 TL', '180 ÷ (3/4) = 180 × 4/3.', '60 × 4 = 240 TL.', '3/4 litrelik şişesi 180 TL\'ye satılan doğal zeytinyağının litre fiyatı hesaplanıyor.'],
        ['İki çubuk uç uca eklendiğinde toplam uzunluk kaç metredir?', '4 tam 5/12 m', '4 tam 1/4 m', '4 tam 7/12 m', '3 tam 11/12 m', '2 tam 3/4 + 1 tam 2/3 = 3 + 9/12 + 8/12.', '3 + 17/12 = 4 tam 5/12 m.', 'Uzunlukları 2 tam 3/4 m ve 1 tam 2/3 m olan iki tahta çıta uç uca birleştiriliyor.'],
        ['Sayı doğrusunda -1 ile -2 arası 4 eş parçaya bölünmüştür. -1\'e en yakın solundaki ilk işaretli nokta hangi rasyonel sayıdır?', '-5/4', '-7/4', '-3/4', '-6/4', '-1\'den sola 1/4 birim gidilir: -1 tam 1/4.', '-5/4.', 'Bir sayı doğrusu üzerinde -2 ile -1 aralığı 4 eş parçaya ayrılmıştır.'],
        ['A ve B noktaları arasındaki uzaklık kaç birimdir?', '19/6', '13/6', '17/6', '5/6', 'B - A = (7/3) - (-5/6) = 14/6 + 5/6.', '19/6 birim.', 'Sayı doğrusunda A noktası -5/6, B noktası +7/3 üzerine yerleştirilmiştir.']
    ]),

    // 3. ORAN-ORANTI
    ...packStage(7, 'oo', 'Oran-Orantı', 'kolay', [
        ['3/4 = x/20 orantısında x kaçtır?', '15', '12', '16', '18', 'Payda 5 katına çıkmış, pay da 5 katına çıkar.', '3 × 5 = 15.'],
        ['4 kg elma 60 TL ise 7 kg elma kaç TL\'dir?', '105 TL', '95 TL', '110 TL', '120 TL', '1 kg elma 60 ÷ 4 = 15 TL.', '7 × 15 = 105 TL.'],
        ['Aşağıdakilerden hangisi ters orantıya örnektir?', 'Aynı işi yapan işçi sayısı ile işin bitme süresi', 'Alınan kalem sayısı ile ödenen toplam tutar', 'Sabit hızla gidilen süre ile alınan yol', 'Karenin kenar uzunluğu ile çevresi', 'Biri artarken diğeri aynı oranda azalmalıdır.', 'İşçi arttıkça işin bitme süresi azalır (ters orantı).'],
        ['x ve y doğru orantılıdır. x = 5 iken y = 15 ise x = 8 iken y kaçtır?', '24', '20', '25', '30', 'y/x = 3 sabiti vardır.', '8 × 3 = 24.'],
        ['6 işçinin 10 günde bitirdiği bir işi aynı güçteki 12 işçi kaç günde bitirir?', '5', '20', '6', '4', 'Ters orantı: 6 × 10 = 12 × x.', '60 ÷ 12 = 5 gün.'],
        ['1/100 000 ölçekli haritada 4 cm gösterilen yol gerçekte kaç km\'dir?', '4 km', '40 km', '0,4 km', '400 km', '100 000 cm = 1 km.', '4 × 1 = 4 km.'],
        ['a/b = 2/5 orantısında b = 35 ise a kaçtır?', '14', '10', '15', '12', '35 ÷ 5 = 7 kat.', '2 × 7 = 14.']
    ]),
    ...packStage(7, 'oo', 'Oran-Orantı', 'orta', [
        ['Bir çiftlikteki 20 ineğe 18 gün yetecek yem vardır. 10 inek daha alınırsa aynı yem kaç gün yeter?', '12', '15', '10', '27', 'Toplam 30 inek olur (ters orantı): 20 × 18 = 30 × x.', '360 ÷ 30 = 12 gün.'],
        ['x ve y ters orantılıdır. x = 9 iken y = 8 ise x = 12 iken y kaçtır?', '6', '4', '9', '10', 'x × y = 72 sabiti vardır.', '72 ÷ 12 = 6.'],
        ['120 TL, 3 ve 5 yaşlarındaki iki kardeşe yaşlarıyla doğru orantılı paylaştırılırsa büyük kardeş kaç TL alır?', '75 TL', '45 TL', '80 TL', '70 TL', '3k + 5k = 8k = 120 → k = 15.', '5 × 15 = 75 TL.'],
        ['(x + 2) / 6 = 5 / 3 orantısında x kaçtır?', '8', '10', '6', '7', 'İçler-dışlar: 3(x + 2) = 30 → x + 2 = 10.', 'x = 8.'],
        ['80 km/sa hızla 6 saatte gidilen yolu, 120 km/sa hızla giden araç kaç saatte gider?', '4 saat', '5 saat', '3 saat', '9 saat', 'Yol = 80 × 6 = 480 km.', '480 ÷ 120 = 4 saat.'],
        ['Gerçek uzunluğu 150 km olan iki şehir arası mesafe haritada 5 cm gösteriliyorsa haritanın ölçeği nedir?', '1 / 3 000 000', '1 / 300 000', '1 / 30 000 000', '1 / 750 000', '150 km = 15 000 000 cm.', '5 / 15 000 000 = 1 / 3 000 000.'],
        ['Aynı kapasitedeki 4 musluk bir havuzu 9 saatte dolduruyorsa 6 musluk aynı havuzu kaç saatte doldurur?', '6 saat', '13,5 saat', '5 saat', '7 saat', '4 × 9 = 6 × x.', '36 ÷ 6 = 6 saat.']
    ]),
    ...packStage(7, 'oo', 'Oran-Orantı', 'zor', [
        ['70 adet bilye 2 ve 5 ile ters orantılı olarak iki kutuya paylaştırılıyor. Büyük pay kaç bilyedir?', '50', '20', '45', '55', 'Ters orantı → 5k ve 2k: 7k = 70 → k = 10.', 'Büyük pay 5 × 10 = 50 bilye.'],
        ['Birbirine bağlı iki dişli çarktan birinde 24, diğerinde 36 diş vardır. Küçük çark 15 tur döndüğünde büyük çark kaç tur döner?', '10', '12', '22,5', '8', 'Diş sayısı ile tur sayısı ters orantılıdır: 24 × 15 = 36 × x.', '360 ÷ 36 = 10 tur.'],
        ['Bir üçgenin iç açıları 2, 3 ve 4 ile doğru orantılıdır. En büyük iç açı kaç derecedir?', '80°', '60°', '100°', '90°', '2k + 3k + 4k = 9k = 180° → k = 20°.', '4 × 20° = 80°.'],
        ['a/3 = b/5 = c/7 ve 2a + b - c = 16 olduğuna göre b kaçtır?', '20', '12', '28', '15', 'a=3k, b=5k, c=7k → 6k + 5k - 7k = 4k = 16 → k = 4.', 'b = 5 × 4 = 20.'],
        ['15 makine günde 8 saat çalışarak bir siparişi 12 günde yetiştiriyor. 20 makine aynı çalışma düzeniyle kaç günde yetiştirir?', '9 gün', '10 gün', '8 gün', '16 gün', '15 × 12 = 20 × x.', '180 ÷ 20 = 9 gün.'],
        ['x + 1 sayısı y - 2 ile ters orantılıdır. x = 3 iken y = 8 ise x = 7 iken y kaçtır?', '5', '4', '6', '3', '(3+1)×(8-2) = 4×6 = 24.', '(7+1)×(y-2) = 24 → 8(y-2) = 24 → y = 5.'],
        ['180 km\'de 12 litre yakıt tüketen bir otomobil 450 km yolda kaç litre yakıt tüketir?', '30 litre', '25 litre', '32 litre', '28 litre', '15 km\'de 1 litre tüketir.', '450 ÷ 15 = 30 litre.']
    ]),
    ...packStage(7, 'oo', 'Oran-Orantı', 'sinav', [
        ['5 gün sonra kampa 10 izci daha katılırsa kalan yiyecek tüm izcilere kaç gün yeter?', '12 gün', '15 gün', '10 gün', '14 gün', '5 gün sonunda 30 izciye 16 gün yetecek yiyecek kalır.', '30 × 16 = 40 × x → x = 12 gün.', '30 izciye 21 gün yetecek kadar yiyecek bulunan bir kampa 5 gün sonra 10 izci daha katılıyor.'],
        ['Haritada 6 cm olan bu iki şehir arasını saatte 90 km hızla giden otobüs kaç saatte alır?', '4 saat', '3 saat', '5 saat', '6 saat', '6 × 6 000 000 cm = 360 km.', '360 ÷ 90 = 4 saat.', 'Ölçeği 1 / 6 000 000 olan Türkiye haritasında A ve B şehirleri arası 6 cm\'dir.'],
        ['Elde edilen 630 gramlık karışımda kaç gram fındık vardır?', '270 gram', '360 gram', '210 gram', '300 gram', 'Fındık 3k, Fıstık 4k → 7k = 630 → k = 90.', 'Fındık = 3 × 90 = 270 gram.', 'Kuruyemişçi fındık ve fıstığı 3/4 oranında karıştırarak 630 gramlık paketler hazırlıyor.'],
        ['Büyük kasnak 20 tur döndüğünde küçük kasnak kaç tur döner?', '32 tur', '25 tur', '30 tur', '36 tur', 'Çap/yarıçap ile tur sayısı ters orantılı: 8 × 20 = 5 × x.', '160 ÷ 5 = 32 tur.', 'Kayışla bağlı iki kasnağın yarıçapları 8 cm ve 5 cm\'dir.'],
        ['En çok şekeri alan çocuk en az şekeri alan çocuktan kaç şeker fazla almıştır?', '24', '18', '30', '20', '2k + 3k + 5k = 10k = 80 → k = 8.', 'Fark: 5k - 2k = 3k = 24 şeker.', '80 şeker üç çocuğa 2, 3 ve 5 ile doğru orantılı dağıtılıyor.'],
        ['4 saat boyunca birlikte çalışan bu iki musluk havuzun kaçta kaçını doldurur?', '7/9', '2/3', '5/6', '8/9', '1 saatte 1/9 + 1/12 = 7/36 doldururlar.', '4 saatte 4 × 7/36 = 7/9.', 'Bir havuzu A musluğu tek başına 9 saatte, B musluğu tek başına 12 saatte doldurabilmektedir.'],
        ['15 m² duvarı boyamak için kaç litre boya gerekir?', '2,5 litre', '2 litre', '3 litre', '2,25 litre', '6 m² için 1 L → 15 ÷ 6.', '2,5 litre boya gerekir.', '18 m² duvarı boyamak için 3 litre boya harcanmaktadır.']
    ]),

    // 4. YÜZDE PROBLEMLERİ
    ...packStage(7, 'yp', 'Yüzde Problemleri', 'kolay', [
        ['160 sayısının %15\'i kaçtır?', '24', '16', '20', '32', '160 × 15 / 100.', '2400 ÷ 100 = 24.'],
        ['%20\'si 30 olan sayı kaçtır?', '150', '120', '180', '160', '%20 = 1/5 olduğundan 30 × 5.', '150.'],
        ['80 sayısının %10 fazlası kaçtır?', '88', '90', '84', '72', '80 + 8.', '88.'],
        ['200 TL\'lik ayakkabıya %25 zam yapılırsa yeni fiyatı kaç TL olur?', '250 TL', '225 TL', '240 TL', '260 TL', '200\'ün %25\'i 50 TL.', '200 + 50 = 250 TL.'],
        ['50 TL\'lik kitap 40 TL\'ye satılırsa yüzde kaç indirim yapılmıştır?', '%20', '%10', '%25', '%15', '10 TL indirim: 10/50 = 20/100.', '%20 indirim.'],
        ['300 sayısının %40 eksiği kaçtır?', '180', '120', '220', '160', '300\'ün %60\'ı veya 300 - 120.', '180.'],
        ['40 sayısı 160 sayısının yüzde kaçıdır?', '%25', '%20', '%30', '%40', '40 / 160 = 1/4.', '%25.']
    ]),
    ...packStage(7, 'yp', 'Yüzde Problemleri', 'orta', [
        ['%30 kârla 650 TL\'ye satılan bir ceketin maliyet fiyatı kaç TL\'dir?', '500 TL', '455 TL', '520 TL', '480 TL', '%130\'u 650 TL ise %100\'ü kaçtır?', '650 ÷ 130 × 100 = 500 TL.'],
        ['%20 indirimle 320 TL\'ye satılan bir kulaklığın indirimden önceki fiyatı kaç TL\'dir?', '400 TL', '384 TL', '420 TL', '360 TL', '%80\'i 320 TL.', '320 ÷ 80 × 100 = 400 TL.'],
        ['240 TL\'ye alınan bir masa 300 TL\'ye satılırsa yüzde kaç kâr elde edilir?', '%25', '%20', '%30', '%15', 'Kâr 60 TL; 60 / 240 = 1/4.', '%25 kâr.'],
        ['Bir sınıfta 18 kız ve 12 erkek vardır. Erkekler sınıfın yüzde kaçıdır?', '%40', '%60', '%30', '%35', 'Toplam 30; 12/30 = 4/10.', '%40.'],
        ['600 TL\'lik bir ürüne %18 KDV eklendiğinde satış fiyatı kaç TL olur?', '708 TL', '698 TL', '718 TL', '688 TL', 'KDV = 600 × 18/100 = 108 TL.', '600 + 108 = 708 TL.'],
        ['%15 zararla 340 TL\'ye satılan bir ürünün alış fiyatı kaç TL\'dir?', '400 TL', '391 TL', '420 TL', '380 TL', '%85\'i 340 TL.', '340 ÷ 85 × 100 = 400 TL.'],
        ['450 sayısının %0,4\'ü (binde 4\'ü) kaçtır?', '1,8', '18', '0,18', '4,5', '450 × 0,4 / 100 = 180 / 100.', '1,8.']
    ]),
    ...packStage(7, 'yp', 'Yüzde Problemleri', 'zor', [
        ['Etiket fiyatı 500 TL olan bir monta önce %20 indirim, sonra indirimli fiyat üzerinden %10 indirim daha yapılıyor. Son fiyat kaç TL olur?', '360 TL', '350 TL', '370 TL', '380 TL', '500 → 400 TL → 400\'ün %10 eksiği.', '400 - 40 = 360 TL.'],
        ['Bir dikdörtgenin uzun kenarı %20 artırılıp kısa kenarı %20 azaltılırsa alanı nasıl değişir?', '%4 azalır', 'Değişmez', '%4 artar', '%10 azalır', '10 × 10 = 100 iken yeni kenarlar 12 × 8 = 96.', '100 → 96 olduğundan %4 azalır.'],
        ['%25 kârla satılan bir ürüne satış fiyatı üzerinden %20 indirim yapılırsa kâr-zarar durumu ne olur?', 'Ne kâr ne zarar edilir (%0)', '%5 kâr edilir', '%5 zarar edilir', '%10 kâr edilir', '100 TL → %25 kârla 125 TL → %20 indirimle 100 TL.', 'Maliyet fiyatına (100 TL) dönülür, %0.'],
        ['Bir sayının %45\'i ile %25\'inin farkı 36 olduğuna göre bu sayı kaçtır?', '180', '160', '200', '150', '%20\'si 36 ise tamamı 36 × 5.', '180.'],
        ['Bir mağaza 800 TL\'ye aldığı ürünü %40 kârla etiketleyip indirimde 952 TL\'ye satıyor. Etiket fiyatına yüzde kaç indirim yapılmıştır?', '%15', '%20', '%12', '%18', 'Etiket 800 × 1,4 = 1 120 TL. İndirim = 168 TL.', '168 / 1 120 = 0,15 = %15.'],
        ['Tuz oranı %20 olan 200 gram tuzlu suya 50 gram saf su eklenirse yeni karışımın tuz yüzdesi kaç olur?', '%16', '%15', '%18', '%12', 'Tuz 40 g, toplam karışım 250 g.', '40 / 250 = 16/100 = %16.'],
        ['Bir ürünün fiyatı 200 TL\'den 250 TL\'ye çıkarsa yüzde kaç artmış olur; 250\'den 200\'e inerse yüzde kaç azalmış olur?', '%25 artar, %20 azalır', '%25 artar, %25 azalır', '%20 artar, %25 azalır', '%20 artar, %20 azalır', '50/200 = %25; 50/250 = %20.', 'Artış %25, azalış %20\'dir.']
    ]),
    ...packStage(7, 'yp', 'Yüzde Problemleri', 'sinav', [
        ['Kampanyadan yararlanan müşteri 2. ayakkabı dahil toplam kaç TL öder?', '1 280 TL', '1 200 TL', '1 360 TL', '1 120 TL', '1. ayakkabı 800 TL; 2. ayakkabı %40 indirimli 480 TL.', '800 + 480 = 1 280 TL.', 'Bir mağazada tanesi 800 TL olan ayakkabılarda "ikincisi %40 indirimli" kampanyası yapılmaktadır.'],
        ['Elektrik faturası geçen aya göre yüzde kaç artmıştır?', '%15', '%12', '%18', '%20', 'Artış 48 TL; 48 / 320.', '48 / 320 = 3/20 = %15.', 'Bir ailenin elektrik faturası geçen ay 320 TL, bu ay 368 TL gelmiştir.'],
        ['Kalan yumurtaların satışı sonunda pazarcının toplam kâr-zarar durumu nedir?', '%8 kâr', '%10 kâr', '%5 kâr', '%2 zarar', 'Maliyet 100×5=500 TL; kırık 10 → 90 yumurta × 6 TL = 540 TL.', 'Kâr 40 TL → 40/500 = %8 kâr.', 'Pazarcı tanesi 5 TL\'den 100 yumurta alıyor. Taşırken %10\'u kırılıyor, kalanları 6 TL\'den satıyor.'],
        ['Bu öğrencinin 40 soruluk sınavdaki başarı yüzdesi kaçtır?', '%75', '%70', '%80', '%85', '30 / 40 = 3/4.', '%75.', '40 soruluk denemede 30 doğru yapan bir öğrencinin doğru yüzdesi hesaplanıyor.'],
        ['Önce %10 zam sonra %10 zam yapıldığında 1 000 TL\'lik ürünün son fiyatı kaç TL olur?', '1 210 TL', '1 200 TL', '1 220 TL', '1 190 TL', '1 000 → 1 100 → 1 100 + 110.', '1 210 TL.', 'Bir ürünün 1 000 TL olan fiyatına iki ay üst üste %10 zam uygulanıyor.'],
        ['İndirimli bilet alan 4 arkadaş toplam kaç TL ödemiştir?', '510 TL', '540 TL', '480 TL', '520 TL', '150\'nin %15 eksiği = 127,5 TL.', '4 × 127,5 = 510 TL.', 'Tanesi 150 TL olan konser biletlerinde 4 ve üzeri alımlarda toplam tutara %15 indirim yapılmaktadır.'],
        ['Bir okuldaki 500 öğrencinin %48\'i kızdır. Kız öğrencilerin %25\'i satranç kursuna gidiyorsa kaç kız öğrenci satranç kursundadır?', '60', '55', '65', '72', 'Kız sayısı 240; 240\'ın %25\'i.', '240 ÷ 4 = 60 kız öğrenci.', '500 öğrencilik okulda öğrenci kulüp dağılımları yüzdeyle verilmiştir.']
    ]),

    // 5. İŞLEMSEL CEBİRSEL İFADELER — Cebirsel İşlemler, Örüntüler, 1. Dereceden Denklemler
    ...packStage(7, 'ci', 'İşlemsel Cebirsel İfadeler', 'kolay', [
        ['(3x + 5) + (2x - 8) işleminin sonucu hangisidir?', '5x - 3', '5x + 13', '6x - 3', '5x + 3', 'Benzer terimleri toplayın: 3x+2x ve 5-8.', '5x - 3.'],
        ['4(2x - 3) işleminin sonucu hangisidir?', '8x - 12', '8x - 3', '6x - 12', '8x + 12', '4\'ü parantez içine dağıtın.', '4×2x - 4×3 = 8x - 12.'],
        ['3x - 7 = 14 denkleminin kökü (x değeri) kaçtır?', '7', '5', '9', '6', '3x = 21.', 'x = 7.'],
        ['Genel terimi 5n - 2 olan sayı örüntüsünün 6. terimi kaçtır?', '28', '30', '26', '32', 'n yerine 6 yazın: 5×6 - 2.', '30 - 2 = 28.'],
        ['(7a + 4) - (3a + 1) işleminin sonucu hangisidir?', '4a + 3', '4a + 5', '10a + 5', '4a - 3', 'Eksi işaretini parantez içine dağıtın: 7a + 4 - 3a - 1.', '4a + 3.'],
        ['2x + 9 = x + 15 denkleminde x kaçtır?', '6', '8', '4', '12', '2x - x = 15 - 9.', 'x = 6.'],
        ['4, 9, 14, 19, ... örüntüsünün genel terimi (kuralı) hangisidir?', '5n - 1', '5n + 4', '4n + 5', '5n + 1', 'Artış 5 olduğundan 5n; n=1 için 4.', '5(1) - 1 = 4 → 5n - 1.']
    ]),
    ...packStage(7, 'ci', 'İşlemsel Cebirsel İfadeler', 'orta', [
        ['3(2x - 4) - 2(x - 5) ifadesinin en sade hâli hangisidir?', '4x - 2', '4x - 22', '8x - 2', '4x + 2', '6x - 12 - 2x + 10.', '4x - 2.'],
        ['4(x - 2) = 2x + 10 denkleminde x kaçtır?', '9', '6', '8', '7', '4x - 8 = 2x + 10 → 2x = 18.', 'x = 9.'],
        ['Bir sayının 3 katının 5 eksiği, aynı sayının 2 katının 7 fazlasına eşittir. Bu sayı kaçtır?', '12', '10', '14', '8', '3x - 5 = 2x + 7.', 'x = 12.'],
        ['Ardışık üç tam sayının toplamı 54 olduğuna göre en büyük sayı kaçtır?', '19', '18', '20', '17', 'x + (x+1) + (x+2) = 54 → 3x + 3 = 54 → x = 17.', 'En büyük sayı 17 + 2 = 19.'],
        ['Genel terimi 7n - 4 olan örüntünün kaçıncı terimi 59\'dur?', '9', '8', '10', '7', '7n - 4 = 59 → 7n = 63.', 'n = 9.'],
        ['(5x - 3) - (2x - 9) ifadesinin x = 4 için değeri kaçtır?', '18', '6', '12', '16', '3x + 6 ifadesinde x = 4 yazın.', '3×4 + 6 = 18.'],
        ['Bir babanın yaşı oğlunun yaşının 4 katıdır. İkisinin yaşları toplamı 55 ise oğul kaç yaşındadır?', '11', '12', '10', '13', 'x + 4x = 55 → 5x = 55.', 'x = 11.']
    ]),
    ...packStage(7, 'ci', 'İşlemsel Cebirsel İfadeler', 'zor', [
        ['3(2x + 1) - 5(x - 2) = 20 denkleminde x kaçtır?', '7', '5', '9', '6', '6x + 3 - 5x + 10 = 20 → x + 13 = 20.', 'x = 7.'],
        ['Kısa kenarı (2x - 3) cm, uzun kenarı (3x + 5) cm olan dikdörtgenin çevresi 64 cm ise alanı kaç cm²\'dir?', '207 cm²', '180 cm²', '225 cm²', '198 cm²', '2(5x + 2) = 64 → 5x + 2 = 32 → x = 6. Kenarlar 9 cm ve 23 cm.', 'Alan = 9 × 23 = 207 cm².'],
        ['Ali\'nin parası Veli\'nin parasının 3 katından 10 TL eksiktir. Ali Veli\'ye 25 TL verirse paraları eşit oluyor. Veli\'nin başlangıçta kaç TL\'si vardır?', '30 TL', '25 TL', '35 TL', '40 TL', '(3x - 10) - 25 = x + 25 → 2x = 60.', 'x = 30 TL.'],
        ['Bir sınıftaki öğrenciler sıralara 2\'şerli oturunca 6 kişi ayakta kalıyor, 3\'erli oturunca 2 sıra boş kalıyor. Sınıfta kaç sıra vardır?', '12', '10', '14', '16', '2x + 6 = 3(x - 2) → 2x + 6 = 3x - 6.', 'x = 12 sıra.'],
        ['4(a - 2b) - 3(2a - 3b) ifadesinin en sade hâli hangisidir?', '-2a + b', '-2a - b', '2a + b', '-2a - 17b', '4a - 8b - 6a + 9b.', '-2a + b.'],
        ['İlk terimi 8 ve ortak farkı 6 olan örüntünün 10. terimi ile 4. teriminin toplamı kaçtır?', '88', '82', '90', '84', 'Kural 6n + 2: a₁₀ = 62, a₄ = 26.', '62 + 26 = 88.'],
        ['Hangi sayının 4 fazlasının yarısı, aynı sayının 5 eksiğine eşittir?', '14', '12', '16', '10', '(x + 4)/2 = x - 5 → x + 4 = 2x - 10.', 'x = 14.']
    ]),
    ...packStage(7, 'ci', 'İşlemsel Cebirsel İfadeler', 'sinav', [
        ['Buna göre x kaçtır?', '5', '4', '6', '7', 'Sol 3x + 8 = Sağ x + 18 → 2x = 10.', 'x = 5.', 'Dengedeki bir terazinin sol kefesinde 3 tane x kg\'lık kütle ve 8 kg, sağ kefesinde 1 tane x kg\'lık kütle ve 18 kg vardır.'],
        ['İki kardeşin yaşları toplamı kaç yıl sonra annelerinin yaşına eşit olur?', '16 yıl', '12 yıl', '14 yıl', '18 yıl', '(8 + t) + (12 + t) = 36 + t → 20 + 2t = 36 + t.', 't = 16 yıl sonra.', 'Anne 36, iki çocuğu ise 8 ve 12 yaşındadır.'],
        ['Bu merdivenin toplam basamak sayısı kaçtır?', '36', '24', '30', '42', 'x/2 - x/3 = 6 → x/6 = 6.', 'x = 36 basamak.', 'Bir çocuk merdivenleri ikişer çıkıp üçer inmektedir. Çıkarken attığı adım sayısı inerken attığından 6 fazladır.'],
        ['Kumbarada toplam kaç adet 5 TL\'lik banknot vardır?', '12', '10', '14', '8', '5x + 10(20 - x) = 140 → 200 - 5x = 140 → 5x = 60.', 'x = 12 adet.', 'Bir kumbarada 5 TL ve 10 TL\'lik toplam 20 adet banknotun toplam değeri 140 TL\'dir.'],
        ['Bu şekil örüntüsünün 15. adımında kaç kibrit çöpü kullanılır?', '46', '45', '48', '42', '1. adım 4, 2. adım 7, 3. adım 10 → kural 3n + 1.', '3×15 + 1 = 46 kibrit.', 'Kareler yan yana eklenerek 1. adımda 4, 2. adımda 7, 3. adımda 10 kibrit çöpü kullanılıyor.'],
        ['Telin tamamının uzunluğu kaç cm\'dir?', '72 cm', '60 cm', '84 cm', '96 cm', 'Bir kenarı x → 4x = 3(x + 6) → x = 18 cm.', 'Tel uzunluğu 4 × 18 = 72 cm.', 'Bir tel ile kare yapıldığında bir kenarı, aynı tel ile eşkenar üçgen yapıldığında oluşan kenardan 6 cm kısa olmaktadır.'],
        ['Oluşan karenin bir kenar uzunluğu kaç cm olur?', '10 cm', '12 cm', '8 cm', '14 cm', 'Kısa kenar x, uzun kenar 2x olsun: x + 4 = 2x - 2 → x = 6.', 'Karenin kenarı 6 + 4 = 10 cm.', 'Uzun kenarı kısa kenarının 2 katı olan dikdörtgenin kısa kenarı 4 cm artırılıp uzun kenarı 2 cm azaltılınca bir kare elde ediliyor.']
    ]),

    // 6. GEOMETRİK ŞEKİLLER — Paralel Doğrular & Keseni, Açıortay, Yöndeş/İç Ters/U-Z-M Kuralları
    ...packStage(7, 'gs', 'Geometrik Şekiller', 'kolay', [
        ['Bir açıyı iki eş parçaya bölen ışına ne ad verilir?', 'Açıortay', 'Kenarortay', 'Yükseklik', 'Köşegen', 'Açıyı tam ortadan ikiye böler.', 'Açıortay denir.'],
        ['Paralel iki doğrunun bir kesenle oluşturduğu yöndeş açıların ölçüleri arasındaki ilişki nedir?', 'Birbirine eşittir', 'Toplamları 90°\'dir', 'Toplamları 180°\'dir', 'Farkları 90°\'dir', 'Aynı yöne bakan açılardır.', 'Yöndeş açılar birbirine eşittir.'],
        ['Paralel iki doğrunun bir kesenle oluşturduğu iç ters açılardan biri 64° ise diğeri kaç derecedir?', '64°', '116°', '26°', '128°', 'Z kuralı: iç ters açılar eşittir.', '64°\'dir.'],
        ['Paralel iki doğru arasında aynı tarafta bulunan (U kuralı) iki açının toplamı kaç derecedir?', '180°', '90°', '360°', '120°', 'Karşı durumlu açılar bütünlerdir.', '180°\'dir.'],
        ['Ölçüsü 136° olan açının açıortayı çizildiğinde oluşan açılardan biri kaç derecedir?', '68°', '66°', '72°', '64°', '136° ÷ 2.', '68°\'dir.'],
        ['Paralel iki doğru arasındaki U kuralında açılardan biri 115° ise diğeri kaç derecedir?', '65°', '75°', '55°', '115°', '180° - 115°.', '65°\'dir.'],
        ['Dış ters açılar paralel iki doğru ve bir kesen için daima nasıldır?', 'Ölçüleri eşittir', 'Toplamları 90°\'dir', 'Biri dar biri geniştir', 'Toplamları 360°\'dir', 'Dış ters açılar birbirine eşittir.', 'Ölçüleri her zaman eşittir.']
    ]),
    ...packStage(7, 'gs', 'Geometrik Şekiller', 'orta', [
        ['Paralel iki doğru arasında M kuralı oluşturan iki dar açı 32° ve 46° ise ortadaki açı kaç derecedir?', '78°', '102°', '68°', '82°', 'M kuralında sağa bakanların toplamı sola bakana eşittir.', '32° + 46° = 78°.'],
        ['Paralel doğrular arasında yöndeş olan iki açı (3x - 10)° ve (2x + 15)° ise x kaçtır?', '25', '20', '30', '15', '3x - 10 = 2x + 15.', 'x = 25.'],
        ['Paralel doğrular arasında karşı durumlu (U kuralı) iki açı (4x + 10)° ve (2x + 20)° ise x kaçtır?', '25', '30', '20', '35', '6x + 30 = 180 → 6x = 150.', 'x = 25.'],
        ['Paralel doğrular arasında kalem ucu (roket) kuralında üç iç açının toplamı kaç derecedir?', '360°', '180°', '270°', '540°', 'İki U kuralı birleşimi: 2 × 180°.', '360°\'dir.'],
        ['Kalem ucu kuralında iki açı 130° ve 115° ise üçüncü açı kaç derecedir?', '115°', '125°', '105°', '110°', '360° - (130° + 115°).', '360° - 245° = 115°.'],
        ['Komşu bütünler iki açının açıortayları arasındaki açı her zaman kaç derecedir?', '90°', '45°', '120°', '60°', '180° ÷ 2.', '90°\'dir (dik açı).'],
        ['Z kuralında (5x - 15)° ve 85° iç ters açılar ise x kaçtır?', '20', '18', '22', '14', '5x - 15 = 85 → 5x = 100.', 'x = 20.']
    ]),
    ...packStage(7, 'gs', 'Geometrik Şekiller', 'zor', [
        ['Paralel iki doğru arasında zikzak (testereli) kuralında sola bakan açılar 35°, 50°, 25°; sağa bakan açılar 62° ve x° ise x kaçtır?', '48°', '52°', '42°', '58°', 'Sola bakanlar toplamı = Sağa bakanlar toplamı.', '35 + 50 + 25 = 110; 110 - 62 = 48°.'],
        ['Paralel iki doğru arasında karşı durumlu (U) iki açının açıortayları çiziliyor. Bu açıortayların kesişim açısı kaç derecedir?', '90°', '60°', '120°', '45°', 'a + b = 90° olduğu için üçgende kalan açı 90° olur.', '90°\'dir.'],
        ['d₁ // d₂ doğruları arasında M kuralında üst açı 42°, orta açı 105° ise alt açının bütünleri kaç derecedir?', '117°', '63°', '127°', '107°', 'Alt dar açı = 105° - 42° = 63°.', 'Bütünleri = 180° - 63° = 117°.'],
        ['d₁ // d₂ doğruları arasında kalem ucu şeklindeki üç açı 3x, 4x + 10 ve 5x - 10 ise en küçük açı kaç derecedir?', '90°', '80°', '100°', '120°', '12x = 360° → x = 30°.', 'En küçük açı 3 × 30° = 90°.'],
        ['Bir kesenle paralel iki doğrunun oluşturduğu iki dış ters açı (2x + 30)° ve (4x - 18)° ise bu açılardan birinin bütünleri kaç derecedir?', '102°', '78°', '112°', '88°', '2x + 30 = 4x - 18 → 2x = 48 → x = 24 → açı 78°.', 'Bütünleri = 180° - 78° = 102°.'],
        ['Ölçüsü (2x + 12)° olan açının açıortayı açıyı iki adet 34°\'lik açıya ayırıyorsa x kaçtır?', '28', '26', '30', '22', '2x + 12 = 68 → 2x = 56.', 'x = 28.'],
        ['Paralel iki doğru arasında üst açı 140° (geniş), orta kırım açısı 85° ve alt açı x° (geniş) olan kalem ucunda x kaçtır?', '135°', '125°', '145°', '115°', '140 + 85 + x = 360.', 'x = 360 - 225 = 135°.']
    ]),
    ...packStage(7, 'gs', 'Geometrik Şekiller', 'sinav', [
        ['Işının ikinci aynadan ayrılırken paralel duvarla yaptığı dar açı kaç derecedir?', '38°', '52°', '76°', '42°', 'M kuralı: 38° + x = 76°.', 'x = 38°.', 'Paralel iki duvar arasına yerleştirilen lazer ışını üst duvarla 38° açı yaparak ortadaki aynada 76° yön değiştiriyor.'],
        ['Köprünün alt destek kirişi yatay yolla kaç derecelik geniş açı yapar?', '126°', '54°', '116°', '136°', 'Paralel iki kiriş arasında U kuralı: 180° - 54°.', '126°.', 'Bir köprüde üst ve alt yatay kirişler birbirine paraleldir. Çapraz demir üst kirişle iç tarafta 54° açı yapmaktadır.'],
        ['Tasarlanan Z harfi logosunda alt yatay şerit ile çapraz şerit arasındaki dar açı kaç derecedir?', '47°', '133°', '43°', '53°', 'İç ters açılar eşittir.', '47°.', 'Bir grafik tasarımcı üst ve alt kenarı paralel olan Z logosunda üst iç açıyı 47° çiziyor.'],
        ['Katlama sonrası oluşan iki komşu eş açıdan birinin ölçüsü kaç derecedir?', '58°', '62°', '54°', '64°', 'Katlama izi açıortay oluşturur: 116° ÷ 2.', '58°.', '116°\'lik bir açı çizilmiş kağıt, açının iki kolu tam üst üste gelecek şekilde katlanıyor.'],
        ['Buna göre x açısı kaç derecedir?', '110°', '100°', '120°', '130°', 'Kalem ucu kuralı: 125° + 125° + x = 360°.', 'x = 110°.', 'Paralel iki kaldırım arasına yerleştirilen bisiklet yolunda iki kırılma açısı 125°\'şer derecedir.'],
        ['Paralel iki raf arasına yerleştirilen destek çubuğunun oluşturduğu yöndeş açılardan biri (3x + 14)°, diğeri 74° ise x kaçtır?', '20', '18', '22', '24', '3x + 14 = 74 → 3x = 60.', 'x = 20.', 'Paralel iki kitaplık rafı eğik bir metal çubukla destekleniyor.'],
        ['Zikzak yürüyüş yolunda sola bakan 40° ve 55° açılara karşılık sağa bakan açının ölçüsü kaç derecedir?', '95°', '85°', '105°', '90°', 'M kuralı: 40° + 55°.', '95°.', 'Paralel iki park sınırı arasında tek kırılmalı bir yürüyüş patikası çiziliyor.']
    ])
];
