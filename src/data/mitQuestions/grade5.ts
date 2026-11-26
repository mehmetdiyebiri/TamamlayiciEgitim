import { MitStudyQuestion, packStage } from './types';

export const GRADE_5_QUESTIONS: MitStudyQuestion[] = [
    // 1. SAYILAR VE NİCELİKLER (1)
    ...packStage(5, 'sn1', 'Sayılar ve Nicelikler (1)', 'kolay', [
        ['74 508 219 sayısının binler bölüğündeki sayı hangisidir?', '508', '74', '219', '580', 'Sağdan sola üçer basamak ayrılır.', 'Binler bölüğü ortadaki üç rakam olan 508\'dir.'],
        ['Beş milyon üç yüz bin kırk iki sayısının rakamlarla yazılışı hangisidir?', '5 300 042', '5 030 042', '5 300 420', '5 003 042', 'Milyonlar: 5, Binler: 300, Birler: 042.', 'Bölükler birleştirildiğinde 5 300 042 olur.'],
        ['48 625 + 13 274 işleminin sonucu kaçtır?', '61 899', '61 889', '60 899', '62 899', 'Aynı basamakları alt alta toplayın.', '48 625 + 13 274 = 61 899.'],
        ['90 450 - 34 210 işleminin sonucu kaçtır?', '56 240', '56 340', '55 240', '66 240', 'Birler basamağından başlayarak çıkarın.', '90 450 - 34 210 = 56 240.'],
        ['324 × 100 işleminin sonucu kaçtır?', '32 400', '3 240', '324 000', '32 040', '100 ile çarpmak için sağına iki sıfır eklenir.', '324 × 100 = 32 400.'],
        ['840 ÷ 12 işleminin sonucu kaçtır?', '70', '60', '72', '80', '84 ÷ 12 = 7\'dir.', '840 ÷ 12 = 70 bulunur.'],
        ['63 491 820 sayısındaki 4 rakamının basamak değeri kaçtır?', '400 000', '40 000', '4 000 000', '4 000', '4 rakamı yüz binler basamağındadır.', '4 × 100 000 = 400 000.']
    ]),
    ...packStage(5, 'sn1', 'Sayılar ve Nicelikler (1)', 'orta', [
        ['348 × 25 işleminin sonucu kaçtır?', '8 700', '8 600', '8 500', '8 900', 'Sayıyı 4\'e bölüp 100 ile çarpın.', '348 ÷ 4 = 87; 87 × 100 = 8 700.'],
        ['Bölen 16, bölüm 25 ve kalan en büyük değerde ise bölünen kaçtır?', '415', '400', '416', '399', 'Kalan bölenden küçük en fazla 15 olur.', '16 × 25 + 15 = 415.'],
        ['702 040 018 sayısının okunuşu hangisidir?', 'Yedi yüz iki milyon kırk bin on sekiz', 'Yedi yüz yirmi milyon kırk bin on sekiz', 'Yedi yüz iki milyon dört yüz bin on sekiz', 'Yedi yüz iki milyon dört bin yüz seksen', 'Milyonlar 702, binler 040, birler 018.', '702 milyon, 40 bin, 18 diye okunur.'],
        ['18 rafın her birinde 36 kitap bulunan kütüphanede toplam kaç kitap vardır?', '648', '628', '668', '588', '18 × 36 işlemini yapın.', '18 × 36 = 648 kitap.'],
        ['4 782 + 2 319 toplamının en yakın yüzlüğe yuvarlanmış tahmini kaçtır?', '7 100', '7 000', '7 200', '6 900', '4 800 ve 2 300 olarak yuvarlanır.', '4 800 + 2 300 = 7 100.'],
        ['1 350 kg elma 15 kg\'lık kasalara dolduruluyor. Kaç kasa gerekir?', '90', '80', '95', '85', '1 350 ÷ 15 işlemini yapın.', '1 350 ÷ 15 = 90 kasa.'],
        ['Rakamları toplamı 12 olan 8 basamaklı en küçük sayının birler basamağı kaçtır?', '9', '8', '2', '1', 'Sayı 10 000 029 olur.', '1 + 2 + 9 = 12; birler basamağı 9\'dur.']
    ]),
    ...packStage(5, 'sn1', 'Sayılar ve Nicelikler (1)', 'zor', [
        ['Rakamları farklı 7 basamaklı en küçük çift sayının on binler basamağı kaçtır?', '2', '3', '0', '4', 'Sayı 1 023 456\'dır.', '1 023 456 sayısında on binler basamağı 2\'dir.'],
        ['Tanesi 14 TL\'den alınan 50 defterin 35\'i 20 TL\'den, 15\'i 18 TL\'den satılırsa kâr kaç TL olur?', '270', '250', '290', '310', 'Maliyet 700 TL, toplam geliri hesaplayın.', 'Gelir 700 + 270 = 970 TL; kâr 970 - 700 = 270 TL.'],
        ['215 öğrenci en fazla 42 kişi alan otobüslerle geziye gidecektir. En az kaç otobüs gerekir?', '6', '5', '4', '7', '5 otobüs 210 kişi alır; kalan 5 kişiyi unutmayın.', '5 + 1 = 6 otobüs gerekir.'],
        ['7A4 582 190 sayısında A\'nın basamak değeri 60 000 000 ise A ile binler bölüğü rakamları toplamı kaçtır?', '21', '19', '15', '23', 'A = 6 ve binler bölüğü 582\'dir.', '6 + (5 + 8 + 2) = 21.'],
        ['48 tavuk ve 35 koyunun bulunduğu çiftlikte toplam kaç hayvan ayağı vardır?', '236', '226', '246', '216', 'Tavuk 2, koyun 4 ayaklıdır.', '48×2 + 35×4 = 96 + 140 = 236.'],
        ['Farkları 240 olan iki sayıdan büyüğü küçüğünün 5 katıdır. Büyük sayı kaçtır?', '300', '280', '320', '250', '5 kat - 1 kat = 4 kat = 240.', '1 kat = 60, büyük sayı = 5 × 60 = 300.'],
        ['Tam bilet 120 TL, öğrenci bileti 85 TL olan sinemada 14 tam ve 20 öğrenci biletinden kaç TL gelir elde edilir?', '3 380', '3 280', '3 480', '3 180', '14×120 ve 20×85 toplayın.', '1 680 + 1 700 = 3 380 TL.']
    ]),
    ...packStage(5, 'sn1', 'Sayılar ve Nicelikler (1)', 'sinav', [
        ['İl kodu 45, kategori kodu 3 basamaklı en küçük doğal sayının 1 fazlası, raf sırası 480\'in 4 fazlası olan kitabın 8 basamaklı barkodu hangisidir?', '45 101 484', '45 100 484', '45 101 480', '45 110 484', 'Bölükleri sırayla yazın: 45, 101, 484.', '45 milyon 101 bin 484 → 45 101 484.', 'Bir kütüphanede 8 basamaklı barkodun milyonlar bölüğü il kodunu, binler bölüğü kategoriyi, birler bölüğü raf sırasını göstermektedir.'],
        ['Toplam 45 adım atan robotun 9 adımı geri, kalanı ileri olduğuna göre robot kaç puan toplamıştır?', '135', '180', '145', '125', '36 ileri adım = 9 tane 4\'lü grup eder.', '9×20 = 180 kazanır; 9×5 = 45 kaybeder → 135 puan.', 'Bir yarışmada robot her 4 ileri adımda 20 puan kazanmakta, her 1 geri adımda 5 puan kaybetmektedir.'],
        ['Her bidon 180 TL\'den satıldığına göre fabrikanın 1 günlük satışı kaç TL\'dir?', '21 600', '20 600', '22 400', '19 800', 'Önce 1 440 ÷ 12 = 120 bidon bulunur.', '120 × 180 = 21 600 TL.', 'Bir meyve suyu fabrikasında günde 1 440 litre meyve suyu 12 litrelik bidonlara doldurulmaktadır.'],
        ['Ayşe\'nin ödeyeceği bir aylık taksit tutarı kaç TL\'dir?', '420', '400', '440', '460', 'Önce kalan borcu bulup 15\'e bölün.', '(8 400 - 2 100) ÷ 15 = 6 300 ÷ 15 = 420 TL.', 'Ayşe 8 400 TL\'lik bisiklet için 2 100 TL peşinat verip kalanı 15 eşit taksite böldürüyor.'],
        ['Sayaçta 124 658 300 yazarken düğmeye 1 kez basılırsa ekranda hangi sayı görünür?', '126 655 300', '126 658 000', '124 655 300', '126 358 300', 'Milyonlar basamağı +2, binler basamağı -3 değişir.', '124 658 300 + 2 000 000 - 3 000 = 126 655 300.', 'Bir dijital sayaç her basılışta milyonlar basamağını 2 artırıyor, binler basamağını 3 azaltıyor.'],
        ['Tüm kitaplar her kolide 25 kitap olacak şekilde paketlenirse en az kaç koli gerekir?', '31', '30', '29', '32', 'Toplam kitap 345 + 410 = 755\'tir.', '755 ÷ 25 = 30 koli ve 5 kitap artar → 31 koli.', 'Kampanyada 5/A sınıfı 345, 5/B sınıfı ise 5/A\'dan 65 fazla kitap toplamıştır.'],
        ['Bu 3 yazıcı birlikte 1 saatte toplam kaç sayfa baskı yapar?', '8 100', '7 800', '8 400', '2 700', '3 yazıcı dakikada 135 sayfa basar.', '135 × 60 = 8 100 sayfa.', 'Bir matbaa dakikada 45 sayfa basan 3 özdeş yazıcıyı aynı anda çalıştırmaktadır.']
    ]),

    // 2. SAYILAR VE NİCELİKLER (2)
    ...packStage(5, 'sn2', 'Sayılar ve Nicelikler (2)', 'kolay', [
        ['3/4 kesrinin 5 ile genişletilmiş hâli hangisidir?', '15/20', '15/4', '8/9', '12/20', 'Pay ve paydayı 5 ile çarpın.', '(3×5)/(4×5) = 15/20.'],
        ['18/24 kesrinin en sade hâli hangisidir?', '3/4', '6/8', '2/3', '9/12', 'Pay ve paydayı 6\'ya bölün.', '(18÷6)/(24÷6) = 3/4.'],
        ['17/5 bileşik kesrinin tam sayılı yazılışı hangisidir?', '3 tam 2/5', '2 tam 7/5', '3 tam 1/5', '4 tam 2/5', '17 ÷ 5 = 3 kalan 2.', '3 tam 2/5 olur.'],
        ['2/9 + 5/9 işleminin sonucu kaçtır?', '7/9', '7/18', '10/9', '3/9', 'Paydalar eşitse paylar toplanır.', '(2+5)/9 = 7/9.'],
        ['35/100 kesrinin ondalık gösterimi hangisidir?', '0,35', '3,5', '0,035', '35,0', 'Virgülden sonra 2 basamak olmalıdır.', '35/100 = 0,35.'],
        ['0,64 ondalık gösteriminin yüzde yazılışı hangisidir?', '%64', '%6,4', '%46', '%640', '0,64 = 64/100.', '64/100 = %64.'],
        ['1/3, 1/8, 1/5 birim kesirlerinin büyükten küçüğe sıralanışı hangisidir?', '1/3 > 1/5 > 1/8', '1/8 > 1/5 > 1/3', '1/5 > 1/3 > 1/8', '1/3 > 1/8 > 1/5', 'Birim kesirde payda küçüldükçe kesir büyür.', '1/3 > 1/5 > 1/8.']
    ]),
    ...packStage(5, 'sn2', 'Sayılar ve Nicelikler (2)', 'orta', [
        ['2/3 + 1/6 işleminin sonucu kaçtır?', '5/6', '3/9', '4/6', '1/2', '2/3 = 4/6 olarak genişletin.', '4/6 + 1/6 = 5/6.'],
        ['4,75 + 2,8 işleminin sonucu kaçtır?', '7,55', '7,83', '6,55', '7,45', '2,8 = 2,80 yazıp alt alta toplayın.', '4,75 + 2,80 = 7,55.'],
        ['3/5 kesrinin yüzde gösterimi hangisidir?', '%60', '%35', '%30', '%75', 'Kesri 20 ile genişletin.', '60/100 = %60.'],
        ['120 sayısının %25\'i kaçtır?', '30', '25', '40', '24', '%25 çeyrek demektir.', '120 ÷ 4 = 30.'],
        ['84 sayısının 3/7\'ü kaçtır?', '36', '28', '42', '32', '84\'ü 7\'ye bölüp 3 ile çarpın.', '12 × 3 = 36.'],
        ['9,2 - 3,65 işleminin sonucu kaçtır?', '5,55', '5,65', '6,55', '5,45', '9,20 - 3,65 yapın.', '9,20 - 3,65 = 5,55.'],
        ['3/4, 0,72 ve %78 ifadelerinin küçükten büyüğe sıralanışı hangisidir?', '0,72 < 3/4 < %78', '3/4 < 0,72 < %78', '0,72 < %78 < 3/4', '%78 < 3/4 < 0,72', '3/4 = %75 ve 0,72 = %72.', '%72 < %75 < %78 → 0,72 < 3/4 < %78.']
    ]),
    ...packStage(5, 'sn2', 'Sayılar ve Nicelikler (2)', 'zor', [
        ['Bir deponun önce 1/4\'ü, sonra 3/8\'i dolduruluyor. Boş kalan kısım kaçta kaçtır?', '3/8', '5/8', '1/2', '1/4', '2/8 + 3/8 = 5/8 dolu.', '8/8 - 5/8 = 3/8 boş kalır.'],
        ['3/5\'i 45 olan sayının tamamı kaçtır?', '75', '60', '80', '90', '45 ÷ 3 = 15 (1 parça).', '15 × 5 = 75.'],
        ['250 TL\'lik çantaya %20 indirim yapılırsa yeni fiyat kaç TL olur?', '200 TL', '210 TL', '190 TL', '220 TL', '250\'nin %20\'si 50 TL\'dir.', '250 - 50 = 200 TL.'],
        ['10 km\'lik parkurun 3,45 km\'sini ve 2,8 km\'sini koşan sporcunun kaç km yolu kalır?', '3,75 km', '3,85 km', '4,25 km', '3,65 km', 'Koşulan 6,25 km\'dir.', '10,00 - 6,25 = 3,75 km.'],
        ['32 öğrencinin %75\'i futbolu seviyor. Futbolu sevmeyen kaç öğrenci vardır?', '8', '24', '6', '10', 'Sevmeyenler %25 (çeyrek).', '32 ÷ 4 = 8 öğrenci.'],
        ['2 tam 1/3 - 5/6 işleminin en sade sonucu kaçtır?', '3/2', '5/6', '4/3', '7/6', '2 tam 1/3 = 14/6.', '14/6 - 5/6 = 9/6 = 3/2.'],
        ['300 sayfalık kitabın ilk gün %30\'unu, ikinci gün 75 sayfasını okuyan öğrencinin kaç sayfası kalır?', '135', '125', '145', '115', 'İlk gün 90 sayfa okunmuştur.', '300 - (90 + 75) = 135 sayfa.']
    ]),
    ...packStage(5, 'sn2', 'Sayılar ve Nicelikler (2)', 'sinav', [
        ['İki etkinliğin sonunda bataryanın yüzde kaçı dolu kalmıştır?', '%25', '%35', '%20', '%30', '2/5 = %40 ve 0,35 = %35.', '%100 - (%40 + %35) = %25.', 'Tam dolu telefon bataryasının oyunda 2/5\'i, videoda ise 0,35\'i tükenmiştir.'],
        ['Tartı 5 kg gösterdiğine göre meyvelerin toplam ağırlığı için ne söylenebilir?', 'Tam 5,00 kg gelir, fark yoktur', '0,10 kg eksiktir', '0,20 kg fazladır', '0,25 kg eksiktir', '2,45 + 1,80 + 0,75 toplayın.', 'Toplam 5,00 kg eder, fark yoktur.', 'Manavdan 2,45 kg elma, 1,8 kg portakal ve 0,75 kg muz alan Kerem hepsini birlikte tarttırıyor.'],
        ['İki ürünü indirimli alan müşteri toplam kaç TL öder?', '610 TL', '600 TL', '620 TL', '590 TL', '400\'de 60 TL, 300\'de 30 TL indirim var.', '340 + 270 = 610 TL.', 'Mağazada 400 TL\'lik ayakkabıya %15, 300 TL\'lik eşofmana %10 indirim yapılmaktadır.'],
        ['35 litre daha su eklendiğinde akvaryumun dolması için kaç litre suya daha ihtiyaç kalır?', '45 litre', '55 litre', '40 litre', '50 litre', 'Başlangıçta 180 × 5/9 = 100 L su var.', '100 + 35 = 135 L; 180 - 135 = 45 L.', '180 litre kapasiteli bir akvaryumun 5/9\'u su ile doludur.'],
        ['En yüksek ve en düşük başarıyı gösteren öğrenciler sırasıyla kimlerdir?', 'Can ve Burcu', 'Can ve Deniz', 'Ali ve Burcu', 'Deniz ve Ali', 'Hepsini yüzdeye çevirin: %85, %82, %88, %84.', 'En yüksek Can (%88), en düşük Burcu (%82).', 'Dört öğrencinin doğru oranları: Ali 17/20, Burcu 0,82, Can %88, Deniz 21/25.'],
        ['Terzinin elinde kalan kumaş kaç metredir?', '2,40 m', '2,30 m', '2,50 m', '2,10 m', 'Kullanılan 2,35 + 1,75 = 4,10 m.', '6,50 - 4,10 = 2,40 m.', 'Bir terzi 6,5 m kumaşın 2,35 m\'siyle elbise, 1,75 m\'siyle etek dikiyor.'],
        ['Çiftçi kaç dönüm alana mısır ekmiştir?', '100 dönüm', '120 dönüm', '80 dönüm', '90 dönüm', '3/10 = %30; mısır %25 kalır.', '400 × 25/100 = 100 dönüm.', 'Bir çiftçi 400 dönüm tarlasının %45\'ine buğday, 3/10\'una arpa ve kalanına mısır ekiyor.']
    ]),

    // 3. İŞLEMLERLE CEBİRSEL DÜŞÜNME
    ...packStage(5, 'cd', 'İşlemlerle Cebirsel Düşünme', 'kolay', [
        ['4 + 3 × 5 işleminin sonucu kaçtır?', '19', '35', '23', '12', 'Önce çarpma yapılır.', '3 × 5 = 15; 4 + 15 = 19.'],
        ['(12 + 8) ÷ 4 işleminin sonucu kaçtır?', '5', '14', '8', '4', 'Önce parantez içi yapılır.', '20 ÷ 4 = 5.'],
        ['▲ + 15 = 32 eşitliğinde ▲ kaçtır?', '17', '47', '15', '18', '32 - 15 işlemini yapın.', '▲ = 17.'],
        ['3, 7, 11, 15, ? örüntüsünde soru işareti yerine ne gelir?', '19', '18', '20', '21', 'Her adımda 4 artıyor.', '15 + 4 = 19.'],
        ['4 × ■ = 36 eşitliğinde ■ kaçtır?', '9', '8', '12', '32', '36 ÷ 4 işlemini yapın.', '■ = 9.'],
        ['5² + 2³ işleminin sonucu kaçtır?', '33', '16', '29', '31', '5² = 25 ve 2³ = 8.', '25 + 8 = 33.'],
        ['Sol kefede 14 kg, sağ kefede 6 kg + ■ kg varken terazi dengede ise ■ kaçtır?', '8', '20', '6', '9', '6 + ■ = 14.', '■ = 14 - 6 = 8 kg.']
    ]),
    ...packStage(5, 'cd', 'İşlemlerle Cebirsel Düşünme', 'orta', [
        ['20 + (18 - 6) ÷ 3 × 2 işleminin sonucu kaçtır?', '28', '22', '24', '32', '12 ÷ 3 = 4; 4 × 2 = 8.', '20 + 8 = 28.'],
        ['5, 11, 17, 23, ... örüntüsünün 8. adımı kaçtır?', '47', '41', '53', '45', 'Kural 6×adım - 1.', '6×8 - 1 = 47.'],
        ['2 × ▲ + 7 = 25 eşitliğinde ▲ kaçtır?', '9', '16', '11', '8', '2×▲ = 18.', '▲ = 9.'],
        ['6² - 4 × (10 - 3) işleminin sonucu kaçtır?', '8', '12', '16', '4', '36 - 4×7.', '36 - 28 = 8.'],
        ['Sayıyı 3 ile çarpıp 5 ekleyen makineye 12 atılırsa kaç çıkar?', '41', '51', '36', '39', '12×3 + 5.', '36 + 5 = 41.'],
        ['48 ÷ (12 - ■) = 6 eşitliğinde ■ kaçtır?', '4', '6', '8', '2', '48 ÷ 8 = 6 olduğundan 12 - ■ = 8.', '■ = 4.'],
        ['1. adımda 4, 2. adımda 7, 3. adımda 10 çubuk kullanılan örüntünün 10. adımında kaç çubuk vardır?', '31', '30', '34', '28', 'Kural 3×adım + 1.', '3×10 + 1 = 31.']
    ]),
    ...packStage(5, 'cd', 'İşlemlerle Cebirsel Düşünme', 'zor', [
        ['Sol kefede 3 kutu + 4 kg, sağda 1 kutu + 18 kg dengede ise 1 kutu kaç kg\'dır?', '7 kg', '6 kg', '8 kg', '9 kg', '2 kutu = 14 kg kalır.', '14 ÷ 2 = 7 kg.'],
        ['(7² - 3³) × 2 + 16 ÷ 4 işleminin sonucu kaçtır?', '48', '44', '52', '40', '49 - 27 = 22.', '22×2 + 4 = 48.'],
        ['Kuralı "5 katının 3 eksiği" olan örüntünün 12. ve 7. adımlarının farkı kaçtır?', '25', '20', '30', '22', '57 - 32 veya 5×5.', '57 - 32 = 25.'],
        ['Hangi sayının 4 katının 9 fazlası 57 eder?', '12', '14', '11', '13', '(57 - 9) ÷ 4.', '48 ÷ 4 = 12.'],
        ['Sayıyı 2 ile çarpıp 6 çıkaran makineden 28 çıktığına göre giriş sayısı kaçtır?', '17', '11', '14', '19', 'Ters işlem: (28 + 6) ÷ 2.', '34 ÷ 2 = 17.'],
        ['100 - 2 × (3² + 4 × 5) işleminin sonucu kaçtır?', '42', '48', '38', '52', 'Parantez içi 9 + 20 = 29.', '100 - 58 = 42.'],
        ['İlk gün 15 TL atıp her gün bir öncekinden 4 TL fazla atan Ece 5. gün kaç TL atar?', '31 TL', '35 TL', '27 TL', '29 TL', '15, 19, 23, 27, 31.', '5. gün 31 TL atar.']
    ]),
    ...packStage(5, 'cd', 'İşlemlerle Cebirsel Düşünme', 'sinav', [
        ['Parkta toplam 130 TL harcayan Ali kaç kez oyuncağa binmiştir?', '6', '5', '7', '8', '130 - 40 = 90 TL oyuncak ücreti.', '90 ÷ 15 = 6 kez.', 'Bir oyun parkına giriş 40 TL, her oyuncak binişi 15 TL\'dir.'],
        ['15 bölmeli bir korkuluk için toplam kaç çubuk gerekir?', '76', '75', '81', '71', 'Kural 5×bölme + 1.', '5×15 + 1 = 76 çubuk.', 'Korkuluk tasarımında 1. bölmede 6, 2. bölmede 11, 3. bölmede 16 çubuk kullanılıyor.'],
        ['Sol kefede 3 kırmızı küp varken denge için sağ kefeye kaç gram konulmalıdır?', '30 gram', '25 gram', '35 gram', '15 gram', '1 kırmızı = 10 gram.', '3 × 10 = 30 gram.', 'Terazide 1 kırmızı küp = 2 mavi küp ve 1 mavi küp = 5 gramdır.'],
        ['Algoritmaya giriş olarak 5 yazıldığında çıkışta hangi sayı görülür?', '88', '100', '76', '92', '5² = 25; 25×4 - 12.', '100 - 12 = 88.', 'Algoritma adımları: Karesini al → 4 ile çarp → 12 çıkar.'],
        ['Sınıfta 13 sıra olduğuna göre toplam kaç öğrenci vardır?', '30', '26', '34', '28', '13 × 2 + 4.', '26 + 4 = 30 öğrenci.', 'Öğrenciler sıralara ikişerli oturduğunda 4 öğrenci ayakta kalıyor.'],
        ['(8 ★ 5) ★ 10 işleminin sonucu kaçtır?', '47', '45', '57', '37', 'Önce 8 ★ 5 = 3×8 - 5 = 19.', '19 ★ 10 = 3×19 - 10 = 47.', 'Bir oyunda a ★ b = 3×a - b olarak tanımlanmıştır.'],
        ['Fidanın boyu kaç ay sonra 80 cm olur?', '10 ay', '8 ay', '12 ay', '9 ay', 'Uzaması gereken 60 cm.', '60 ÷ 6 = 10 ay.', 'Boyu 20 cm olan bir fidan her ay 6 cm uzamaktadır.']
    ]),

    // 4. GEOMETRİK ŞEKİLLER
    ...packStage(5, 'gs', 'Geometrik Şekiller', 'kolay', [
        ['Başlangıç noktası belli, diğer ucu sonsuza giden şekil hangisidir?', 'Işın', 'Doğru', 'Doğru parçası', 'Nokta', 'Fener ışığını düşünün.', 'Tek ucu sabit diğer ucu sonsuz şekil ışındır.'],
        ['Ölçüsü 125° olan açı hangi türdür?', 'Geniş açı', 'Dar açı', 'Dik açı', 'Doğru açı', '90° ile 180° arası.', '125° geniş açıdır.'],
        ['İki kenarı eşit olan üçgene ne denir?', 'İkizkenar üçgen', 'Çeşitkenar üçgen', 'Dik üçgen', 'Geniş açılı üçgen', 'İki kenar ikiz gibi eşittir.', 'İkizkenar üçgendir.'],
        ['Bir üçgenin iç açıları toplamı kaç derecedir?', '180°', '90°', '270°', '360°', 'Bir doğru açı kadardır.', 'Tüm üçgenlerin iç açıları toplamı 180°\'dir.'],
        ['Aynı düzlemde hiç kesişmeyen doğrulara ne ad verilir?', 'Paralel doğrular', 'Dik doğrular', 'Kesişen doğrular', 'Çakışık doğrular', 'Tren rayları gibi (//).', 'Paralel doğrulardır.'],
        ['Tüm kenarları eşit ve tüm açıları 90° olan dörtgen hangisidir?', 'Kare', 'Yamuk', 'Paralelkenar', 'Eşkenar dörtgen', 'Düzgün dörtgendir.', 'Kare tüm kenarları eşit ve açıları 90° olan dörtgendir.'],
        ['Bir dik açının ölçüsü kaç derecedir?', '90°', '45°', '180°', '60°', 'Kitap köşesi dik açıdır.', 'Dik açı 90°\'dir.']
    ]),
    ...packStage(5, 'gs', 'Geometrik Şekiller', 'orta', [
        ['İki açısı 55° ve 70° olan üçgenin üçüncü açısı kaç derecedir?', '55°', '65°', '45°', '60°', '180° - (55° + 70°).', '180° - 125° = 55°.'],
        ['Üç açısı 80°, 95° ve 110° olan dörtgenin dördüncü açısı kaçtır?', '75°', '85°', '65°', '90°', 'Dörtgen iç açıları toplamı 360°.', '360° - 285° = 75°.'],
        ['Eşkenar üçgenin her bir iç açısı kaç derecedir?', '60°', '45°', '90°', '120°', '180° ÷ 3.', '60°\'dir.'],
        ['Hangi dörtgenin köşegenleri her zaman dik kesişir?', 'Eşkenar dörtgen', 'Dikdörtgen', 'Paralelkenar', 'Yamuk', 'Tüm kenarları eşit olan dörtgenler.', 'Kare ve eşkenar dörtgende köşegenler dik kesişir.'],
        ['Bir dik üçgenin dar açılarından biri 37° ise diğeri kaç derecedir?', '53°', '63°', '43°', '57°', '90° - 37°.', '53°\'dir.'],
        ['Bir beşgenin kaç köşegeni vardır?', '5', '2', '4', '6', 'İçinde yıldız çizen çizgiler.', 'Beşgenin 5 köşegeni vardır.'],
        ['A, B\'nin 4 birim sağında ve 3 birim yukarısındaysa B, A\'nın neresindedir?', '4 birim solunda, 3 birim aşağısında', '4 birim sağında, 3 birim aşağısında', '3 birim solunda, 4 birim aşağısında', '4 birim solunda, 3 birim yukarısında', 'Yönler tam tersine döner.', '4 birim solunda ve 3 birim aşağısındadır.']
    ]),
    ...packStage(5, 'gs', 'Geometrik Şekiller', 'zor', [
        ['Tepe açısı 40° olan ikizkenar üçgenin bir taban açısı kaç derecedir?', '70°', '80°', '65°', '50°', '(180° - 40°) ÷ 2.', '140° ÷ 2 = 70°.'],
        ['Bir paralelkenarda dar açı 65° ise komşu geniş açı kaç derecedir?', '115°', '125°', '105°', '130°', 'Ardışık açılar toplamı 180°.', '180° - 65° = 115°.'],
        ['En büyük tam sayı dar açıdan 15° küçük olan açı kaç derecedir?', '74°', '75°', '73°', '76°', 'En büyük tam sayı dar açı 89°.', '89° - 15° = 74°.'],
        ['Bir yamuğun paralel tabanları arasındaki yan kenar açılarından biri 110° ise diğeri kaçtır?', '70°', '80°', '60°', '90°', 'Toplamları 180°\'dir.', '180° - 110° = 70°.'],
        ['Aynı yarıçaplı A ve B merkezli iki çemberin kesişim noktası C ile oluşturulan ABC üçgeni hangi türdür?', 'Eşkenar üçgen', 'Dik üçgen', 'Çeşitkenar üçgen', 'Geniş açılı üçgen', 'Üç kenar da aynı yarıçapa eşittir.', '|AB|=|AC|=|BC|=r → Eşkenar üçgen.'],
        ['Bir üçgende açılardan biri diğerinin 2 katı, üçüncüsü 60° ise en büyük açı kaç derecedir?', '80°', '70°', '90°', '100°', '3 kat = 120°.', '1 kat = 40°, en büyük açı 80°.'],
        ['Saat tam 04:00 iken akrep ile yelkovan arasındaki küçük açı kaç derecedir?', '120°', '90°', '150°', '100°', 'Her saat aralığı 30°.', '4 × 30° = 120°.']
    ]),
    ...packStage(5, 'gs', 'Geometrik Şekiller', 'sinav', [
        ['Oluşan dik üçgenin diğer dar açısı kaç derecedir?', '55°', '45°', '65°', '50°', '90° - 35°.', '55°\'dir.', 'Dikdörtgen kağıdın bir köşesi tabanla 35° açı yapacak şekilde katlanıyor.'],
        ['Eşkenar üçgen ve karenin ortak köşesinde dışarıda birleşen iki kenarın iç açıları toplamı (60° + 90°) kaç derecedir?', '150°', '120°', '135°', '160°', '60° + 90° toplayın.', '150° olur.', 'Bir parkta bir kenarı ortak olan eşkenar üçgen çiçeklik ve kare oyun alanı yan yanadır.'],
        ['Köşegenleri çizilen eşkenar dörtgenin içinde oluşan 4 eş üçgenin türü nedir?', 'Dik açılı üçgen', 'Geniş açılı üçgen', 'Eşkenar üçgen', 'Dar açılı üçgen', 'Köşegenler 90° ile kesişir.', 'Hepsi dik açılı üçgendir.', 'Bir eşkenar dörtgenin köşegenleri çizilerek 4 eş üçgen elde ediliyor.'],
        ['Bu ikizkenar üçgenin taban açısı bir dik açıdan kaç derece küçüktür?', '50°', '40°', '60°', '30°', 'Taban açısı 40°.', '90° - 40° = 50°.', 'Çatı tasarımında tepe açısı 100° olan ikizkenar üçgen kullanılmıştır.'],
        ['Salıncak (C), Bankın (B) konumuna göre nerededir?', '2 birim sağında, 2 birim aşağısında', '2 birim solunda, 2 birim aşağısında', '8 birim sağında, 6 birim aşağısında', '2 birim sağında, 2 birim yukarısında', 'Yatay -3+5=+2, Dikey +2-4=-2.', '2 birim sağında ve 2 birim aşağısındadır.', 'Krokide A, B\'nin 3 sol 2 yukarısında; C ise A\'nın 5 sağ 4 aşağısındadır.'],
        ['Paralelkenarın iki geniş açısının toplamı kaç derecedir?', '216°', '144°', '208°', '224°', 'Bir geniş açı 180° - 72° = 108°.', '108° + 108° = 216°.', 'Paralelkenar şeklindeki bir kumaşın dar açısı 72°\'dir.'],
        ['Geniş açı kartının ölçüsü dar açı kartının ölçüsünden kaç derece fazladır?', '30°', '25°', '35°', '95°', '115° - 85°.', '30° fazladır.', 'Panoda 85°, 90°, 115° ve 180° ölçülerinde dört kart asılıdır.']
    ]),

    // 5. GEOMETRİK NİCELİKLER
    ...packStage(5, 'gn', 'Geometrik Nicelikler', 'kolay', [
        ['Kısa kenarı 6 cm, uzun kenarı 9 cm olan dikdörtgenin alanı kaç cm²\'dir?', '54 cm²', '30 cm²', '45 cm²', '60 cm²', 'Alan = a × b.', '6 × 9 = 54 cm².'],
        ['Bir kenarı 8 cm olan karenin alanı kaç cm²\'dir?', '64 cm²', '32 cm²', '16 cm²', '48 cm²', 'Alan = a × a.', '8 × 8 = 64 cm².'],
        ['Kenarları 7 cm ve 12 cm olan dikdörtgenin çevresi kaç cm\'dir?', '38 cm', '19 cm', '84 cm', '34 cm', '2 × (7 + 12).', '2 × 19 = 38 cm.'],
        ['Çevresi 36 cm olan karenin bir kenarı kaç cm\'dir?', '9 cm', '6 cm', '12 cm', '8 cm', '36 ÷ 4.', '9 cm.'],
        ['3 metre 45 santimetre toplam kaç santimetredir?', '345 cm', '3045 cm', '75 cm', '354 cm', '1 m = 100 cm.', '300 + 45 = 345 cm.'],
        ['2 saat 25 dakika toplam kaç dakikadır?', '145 dakika', '125 dakika', '165 dakika', '225 dakika', '1 saat = 60 dk.', '120 + 25 = 145 dk.'],
        ['Kenarları 5 cm, 6 cm ve 8 cm olan üçgenin çevresi kaç cm\'dir?', '19 cm', '20 cm', '18 cm', '21 cm', 'Üç kenarı toplayın.', '5 + 6 + 8 = 19 cm.']
    ]),
    ...packStage(5, 'gn', 'Geometrik Nicelikler', 'orta', [
        ['Alanı 72 cm² ve uzun kenarı 9 cm olan dikdörtgenin çevresi kaç cm\'dir?', '34 cm', '32 cm', '36 cm', '17 cm', 'Kısa kenar 72 ÷ 9 = 8 cm.', '2 × (9 + 8) = 34 cm.'],
        ['Çevresi 48 cm olan karenin alanı kaç cm²\'dir?', '144 cm²', '96 cm²', '121 cm²', '169 cm²', 'Bir kenar 12 cm.', '12 × 12 = 144 cm².'],
        ['13:40\'ta başlayan film 1 saat 55 dakika sürerse saat kaçta biter?', '15:35', '15:25', '15:45', '14:35', '14:40 + 55 dk.', '15:35\'te biter.'],
        ['Alanı 36 cm² ve kenarları doğal sayı olan dikdörtgenin çevresi en az kaç cm olur?', '24 cm', '26 cm', '30 cm', '74 cm', '6×6 kare en küçük çevreyi verir.', '4 × 6 = 24 cm.'],
        ['2,4 km parkurun 850 m\'sini yürüyen kişinin kaç metre yolu kalır?', '1 550 m', '1 450 m', '1 650 m', '1 350 m', '2,4 km = 2 400 m.', '2 400 - 850 = 1 550 m.'],
        ['Kenarları 10 m ve 6 m olan bahçenin etrafına 3 sıra tel çekilirse kaç metre tel gerekir?', '96 m', '32 m', '64 m', '180 m', 'Çevre 32 m.', '32 × 3 = 96 m.'],
        ['Çevresi 40 cm olan dikdörtgenin uzun kenarı kısadan 4 cm fazlaysa alanı kaç cm²\'dir?', '96 cm²', '84 cm²', '100 cm²', '92 cm²', 'Kenarlar 8 ve 12 cm.', '8 × 12 = 96 cm².']
    ]),
    ...packStage(5, 'gn', 'Geometrik Nicelikler', 'zor', [
        ['12 m × 8 m oda, bir kenarı 2 m olan kare fayanslarla kaplanacaktır. Kaç fayans gerekir?', '24', '48', '12', '32', '96 ÷ 4.', '24 fayans gerekir.'],
        ['Çevresi 36 cm olan eşkenar üçgenin bir kenarıyla eşit kenarlı karenin alanı kaç cm²\'dir?', '144 cm²', '81 cm²', '121 cm²', '100 cm²', 'Kenar = 12 cm.', '12 × 12 = 144 cm².'],
        ['Alanı 24 cm² ve kenarları doğal sayı olan kaç farklı dikdörtgen çizilebilir?', '4', '3', '5', '6', '(1,24), (2,12), (3,8), (4,6).', '4 farklı dikdörtgen çizilir.'],
        ['Kenarı 10 cm olan kareden 4 cm × 6 cm dikdörtgen kesilip atılırsa kalan alan kaç cm² olur?', '76 cm²', '66 cm²', '80 cm²', '72 cm²', '100 - 24.', '76 cm².'],
        ['Kısa kenarı 2 katına, uzun kenarı 3 katına çıkarılan dikdörtgenin alanı kaç katına çıkar?', '6 katına', '5 katına', '4 katına', '9 katına', '2 × 3 = 6.', 'Alan 6 katına çıkar.'],
        ['Yan yana 3 eş kareden oluşan dikdörtgenin çevresi 40 cm ise alanı kaç cm²\'dir?', '75 cm²', '60 cm²', '90 cm²', '45 cm²', 'Çevrede 8 kare kenarı var → 1 kenar 5 cm.', '5 × 15 = 75 cm².'],
        ['08:45\'te yola çıkan otobüs 3s 30dk gidip 25dk mola veriyor, sonra 1s 40dk daha gidiyor. Varış saati kaçtır?', '14:20', '14:10', '14:30', '13:50', 'Toplam 5 saat 35 dakika.', '08:45 + 5s 35dk = 14:20.']
    ]),
    ...packStage(5, 'gn', 'Geometrik Nicelikler', 'sinav', [
        ['Havuz dışında çimlendirilecek alan kaç m²\'dir?', '244 m²', '280 m²', '256 m²', '234 m²', '20×14 - 6×6.', '280 - 36 = 244 m².', '20 m × 14 m dikdörtgen parkın ortasına bir kenarı 6 m kare havuz yapılıyor.'],
        ['Karenin alanı dikdörtgenin alanından kaç cm² fazladır?', '25 cm²', '20 cm²', '30 cm²', '15 cm²', 'Kare 15×15=225; Dikdörtgen 10×20=200.', '225 - 200 = 25 cm².', '60 cm tel ile Elif bir kare, Kaan ise kısa kenarı 10 cm olan bir dikdörtgen yapıyor.'],
        ['5 tablonun duvarda kapladığı toplam alan kaç cm²\'dir?', '12 000 cm²', '2 400 cm²', '10 000 cm²', '14 400 cm²', '1 tablo = 2 400 cm².', '5 × 2 400 = 12 000 cm².', 'Eni 40 cm, boyu 60 cm olan 5 özdeş tablo duvara asılıyor.'],
        ['Atlet pist çevresinde 4 tur attığında kaç dakika koşmuş olur?', '8 dakika', '6 dakika', '10 dakika', '12 dakika', '1 tur 300 m → 4 tur 1 200 m.', '1 200 ÷ 150 = 8 dakika.', 'Kenarları 90 m ve 60 m olan pistte atlet dakikada 150 m koşmaktadır.'],
        ['Kalan kartonun alanı kaç cm²\'dir?', '200 cm²', '208 cm²', '196 cm²', '184 cm²', '216 - 4×(2×2).', '216 - 16 = 200 cm².', '18 cm × 12 cm kartonun 4 köşesinden kenarı 2 cm olan 4 eş kare kesiliyor.'],
        ['Müşteri halı yıkama için toplam kaç TL öder?', '720 TL', '680 TL', '760 TL', '540 TL', 'Toplam alan 12 + 4 = 16 m².', '16 × 45 = 720 TL.', 'm² fiyatı 45 TL olan firmaya 3m×4m ve 2m×2m iki halı veriliyor.'],
        ['4. ders saat kaçta biter?', '11:40', '11:30', '11:50', '11:20', '4 ders (160 dk) + 3 teneffüs (30 dk) = 190 dk.', '08:30 + 3s 10dk = 11:40.', 'Dersler 40 dk, teneffüsler 10 dk ve ilk ders 08:30\'da başlıyor.']
    ]),

    // 6. İSTATİSTİKSEL ARAŞTIRMA SÜRECİ
    ...packStage(5, 'ia', 'İstatistiksel Araştırma Süreci', 'kolay', [
        ['Aşağıdakilerden hangisi bir istatistiksel araştırma sorusudur?', 'Okulumuzdaki 5. sınıf öğrencilerinin en sevdiği spor dalı nedir?', 'Türkiye\'nin başkenti neresidir?', 'Ali\'nin boyu kaç santimetredir?', 'Bir yılda kaç mevsim vardır?', 'Bir gruba sorulup farklı veriler üretmelidir.', 'Sadece ilk seçenek bir gruptan değişken veri toplar.'],
        ['Verilerin beşerli çizgilerle sayıldığı tabloya ne ad verilir?', 'Çetele tablosu', 'Sıklık tablosu', 'Sütun grafiği', 'Nokta grafiği', 'Her 5. çizgi çapraz çizilir.', 'Çetele tablosudur.'],
        ['Elma 12, muz 15, çilek 18 oy aldıysa ankete kaç kişi katılmıştır?', '45', '42', '48', '35', 'Sıklıkları toplayın.', '12 + 15 + 18 = 45.'],
        ['Sütun grafiğinde veriler ne ile karşılaştırılır?', 'Eşit genişlikte dikdörtgen sütunlar', 'Daire dilimleri', 'Sadece noktalar', 'Üçgen dilimler', 'Adı sütun grafiğidir.', 'Eşit genişlikte sütunların boyları karşılaştırılır.'],
        ['İstatistiksel araştırma sürecinin ilk adımı hangisidir?', 'Araştırma sorusunu oluşturmak', 'Grafiği yorumlamak', 'Sütun grafiği çizmek', 'Sonuç raporu yazmak', 'Önce neyi araştıracağımızı belirleriz.', 'İlk adım araştırma sorusunu oluşturmaktır.'],
        ['Çetele tablosunda 3 tam beşlik grup ve 2 tek çizgi kaç sayısını gösterir?', '17', '15', '12', '19', '3 × 5 + 2.', '17 sayısını gösterir.'],
        ['Pazartesi 14, Salı 20, Çarşamba 11 kitap okunduysa en çok hangi gün okunmuştur?', 'Salı', 'Pazartesi', 'Çarşamba', 'Pazartesi ve Salı', 'En yüksek sütun.', '20 kitapla Salı günüdür.']
    ]),
    ...packStage(5, 'ia', 'İstatistiksel Araştırma Süreci', 'orta', [
        ['Mavi 14, Kırmızı 9, Yeşil 11, Sarı 6 oy aldı. En çok ve en az oy alan renklerin farkı kaçtır?', '8', '5', '6', '9', '14 - 6.', '8 oy fark vardır.'],
        ['Her simgenin 4 kitabı gösterdiği şekil grafiğinde 6 simge kaç kitabı gösterir?', '24', '10', '20', '28', '6 × 4.', '24 kitap.'],
        ['Hangi araştırma sorusu sayısal (nicel) veri toplar?', '5/A sınıfının haftada okuduğu sayfa sayıları kaçtır?', 'En sevilen mevsim hangisidir?', 'Öğrencilerin göz renkleri nelerdir?', 'En sevilen yemek nedir?', 'Ölçüm/sayma ile sayı üretmelidir.', 'Sayfa sayısı nicel veridir.'],
        ['4 günde satılan 25, 30, 35 ve 40 dondurmanın toplamı kaçtır?', '130', '120', '140', '125', 'Dört sayıyı toplayın.', '25 + 30 + 35 + 40 = 130.'],
        ['Her 1 birim kare 5 öğrenciyi gösteriyorsa 35 öğrenci kaç birim karelik sütunla gösterilir?', '7', '5', '6', '8', '35 ÷ 5.', '7 birim kare.'],
        ['Her tam ağaç 10, yarım ağaç 5 fidanı gösteriyorsa 4 tam ve 1 yarım ağaç kaç fidandır?', '45', '40', '50', '35', '4×10 + 5.', '45 fidan.'],
        ['Pzt 18, Sal 24, Çar 15, Per 23 kitap ödünç alındı. İlk iki gün son iki günden kaç fazladır?', '4', '6', '2', '8', '42 - 38.', '4 kitap fazladır.']
    ]),
    ...packStage(5, 'ia', 'İstatistiksel Araştırma Süreci', 'zor', [
        ['50 kişilik ankette Futbol 18, Basketbol 12, Voleybol 11, kalanı Yüzme seçti. Yüzme yüzde kaçtır?', '%18', '%9', '%20', '%16', 'Yüzme = 9 kişi; 9/50 = 18/100.', '%18\'dir.'],
        ['5 günlük toplam 240 sorunun ilk 4 günü 40, 55, 35, 50 ise Cuma kaç soru çözülmüştür?', '60', '50', '55', '65', '240 - 180.', '60 soru.'],
        ['Ayran 40, Süt 25, Su 55, Meyve Suyu 30 satıldı. Su toplam satışın kaçta kaçıdır?', '11/30', '1/3', '2/5', '7/30', '55/150 kesrini 5\'e bölün.', '11/30.'],
        ['Şube mevcutları 28, 32, 30, 30 olan 4 şubenin ortalaması kaçtır?', '30', '29', '31', '28', '120 ÷ 4.', '30 öğrenci.'],
        ['Bir sütun grafiği 0 yerine 20\'den başlatılırsa ne olur?', 'Sütunlar arasındaki fark olduğundan büyük görünerek yanıltıcı olur', 'Verilerin toplamı değişir', 'Grafik daha doğru olur', 'En küçük veri sıfırlanır', 'Görsel oran bozulur.', 'Eksen 0\'dan başlamazsa grafik yanıltıcı yorumlara yol açar.'],
        ['Pzt 120, Salı Pzt\'nin 3/4\'ü, Çarşamba Salı\'dan 40 fazla ekmek satıldı. Çarşamba kaç ekmek satıldı?', '130', '120', '140', '110', 'Salı 90; Çarşamba 90 + 40.', '130 ekmek.'],
        ['24 kız ve 16 erkek öğrencinin %40\'ı Matematik seçtiğine göre kaç öğrenci Matematik seçmiştir?', '16', '14', '18', '12', 'Toplam 40; 40\'ın %40\'ı.', '16 öğrenci.']
    ]),
    ...packStage(5, 'ia', 'İstatistiksel Araştırma Süreci', 'sinav', [
        ['Dört sınıfın topladığı piller 30\'arlık kutulara konulursa kaç kutu tam dolar?', '12', '11', '13', '10', 'Toplam 360 pil.', '360 ÷ 30 = 12 kutu.', 'Atık pil yarışmasında 5/A 85, 5/B 110, 5/C 95 ve 5/D 70 pil toplamıştır.'],
        ['Nisan ayındaki yeni üye sayısı, Ocak ve Şubat toplamından kaç eksiktir?', '10', '14', '6', '12', '24 + 36 = 60.', '60 - 50 = 10 eksiktir.', 'Kütüphaneye Ocak 24, Şubat 36, Mart 30 ve Nisan 50 yeni üye kaydolmuştur.'],
        ['Her sembol 5 fidanı gösteriyorsa toplam kaç sembol çizilir?', '25', '24', '26', '20', 'Toplam 125 fidan.', '125 ÷ 5 = 25 sembol.', 'Kampanyada 45 çam, 35 meşe, 20 ıhlamur ve 25 akçaağaç dikilmiştir.'],
        ['En çok ve en az ziyaretçi gelen günlerin gelir farkı kaç TL\'dir?', '2 750 TL', '2 500 TL', '2 250 TL', '3 000 TL', '(200 - 90) × 25.', '110 × 25 = 2 750 TL.', 'Müzeye Pzt 120, Sal 150, Çar 90, Per 140, Cum 200 kişi gelmiş; bilet 25 TL\'dir.'],
        ['Resim kulübünü seçenler Spor kulübünü seçenlerin kaçta kaçıdır?', '1/4', '1/5', '1/3', '1/8', 'Resim = 40 - 36 = 4 kişi.', '4 / 16 = 1/4.', '40 öğrencilik ankette Bilim 12, Spor 16, Müzik 8, kalanı Resim kulübünü seçti.'],
        ['Sıcaklığın 20°C üzerinde olduğu günler tüm günlerin yüzde kaçıdır?', '%60', '%40', '%50', '%80', 'Salı, Perşembe, Cuma (3 gün).', '3 / 5 = %60.', '5 günlük sıcaklıklar: Pzt 18°C, Sal 21°C, Çar 19°C, Per 24°C, Cum 23°C.'],
        ['İlk 4 haftada haftalık ortalama kaç kalem satılmıştır?', '70', '68', '72', '74', '280 ÷ 4.', '70 kalem.', '4 haftalık kalem satışları sırasıyla 64, 76, 82 ve 58 adettir.']
    ]),

    // 7. VERİDEN OLASILIĞA
    ...packStage(5, 'vo', 'Veriden Olasılığa', 'kolay', [
        ['Hilesiz bir zar atıldığında üst yüze 7 gelmesi nasıl bir olaydır?', 'İmkânsız olay', 'Kesin olay', 'Eşit olasılıklı olay', 'Daha olası olay', 'Zarda 7 yoktur.', 'İmkânsız olaydır (0).'],
        ['Hilesiz madeni para atıldığında yazı ve tura gelmesi nasıl olaylardır?', 'Eşit olasılıklı', 'İmkânsız', 'Kesin', 'Yazı daha olası', 'İkisi de 1/2.', 'Eşit olasılıklıdır.'],
        ['Sadece 5 kırmızı bilye olan torbadan kırmızı çekilmesi nasıl olaydır?', 'Kesin olay', 'İmkânsız olay', 'Az olası olay', 'Eşit olasılıklı olay', 'Başka renk yok.', 'Kesin olaydır (1).'],
        ['6 mavi, 2 sarı top bulunan torbadan hangi rengin gelme olasılığı fazladır?', 'Mavi', 'Sarı', 'Eşittir', 'Kırmızı', '6 > 2.', 'Mavi topun olasılığı daha fazladır.'],
        ['Hilesiz bir zar atıldığında tüm olası durumların sayısı kaçtır?', '6', '3', '5', '12', 'Zarın yüz sayısı.', '1, 2, 3, 4, 5, 6 → 6 durum.'],
        ['Bir olayın olasılık değeri hangi iki sayı arasında yer alır?', '0 ile 1', '1 ile 10', '0 ile 100', '1 ile 6', 'İmkânsız 0, kesin 1.', '0 ile 1 arasındadır.'],
        ['4 yeşil ve 4 siyah kalemden rastgele seçilenin yeşil olma olasılığı kaçtır?', '1/2', '1/4', '1/8', '3/4', '4/8.', '1/2 (%50).']
    ]),
    ...packStage(5, 'vo', 'Veriden Olasılığa', 'orta', [
        ['1\'den 10\'a kadar numaralı kartlardan çift sayı çekme olasılığı kaçtır?', '1/2', '2/5', '3/5', '3/10', '5 çift sayı var.', '5/10 = 1/2.'],
        ['3 kırmızı, 5 mavi, 2 yeşil bilyeden mavi çekme olasılığı kaçtır?', '1/2', '3/10', '1/5', '2/5', 'Toplam 10 bilye.', '5/10 = 1/2.'],
        ['"MATEMATİK" kelimesinin harflerinden rastgele seçilenin M olma olasılığı kaçtır?', '2/9', '1/9', '2/8', '3/9', '9 harfte 2 tane M.', '2/9.'],
        ['Hilesiz zar atıldığında 4\'ten büyük sayı gelme olasılığı kaçtır?', '1/3', '1/2', '2/3', '1/6', '5 ve 6 (2 durum).', '2/6 = 1/3.'],
        ['8 eş dilimli çarkta 3 sarı, 4 mavi, 1 kırmızı dilim varsa kırmızı gelme olasılığı kaçtır?', '1/8', '3/8', '1/4', '1/3', '1/8.', '1/8.'],
        ['20 öğrencinin 12\'si kız ise rastgele seçilenin erkek olma olasılığı yüzde kaçtır?', '%40', '%60', '%30', '%45', '8/20 = 40/100.', '%40.'],
        ['5 kırmızı, 8 beyaz top olan torbaya kaç kırmızı eklenirse olasılıklar eşit olur?', '3', '2', '4', '5', '8 - 5 = 3.', '3 kırmızı top eklenmelidir.']
    ]),
    ...packStage(5, 'vo', 'Veriden Olasılığa', 'zor', [
        ['1\'den 12\'ye kadar kartlardan 3\'ün katı çekme olasılığı kaçtır?', '1/3', '1/4', '1/2', '5/12', '3, 6, 9, 12 (4 tane).', '4/12 = 1/3.'],
        ['4 kırmızı, 6 mavi, 10 sarı bilyeden sarı OLMAMA olasılığı kaçtır?', '1/2', '1/5', '3/10', '3/5', '10/20.', '1/2.'],
        ['15 topun bulunduğu torbada yeşil olasılığı 2/5 ise kaç yeşil top vardır?', '6', '5', '9', '3', '2/5 = 6/15.', '6 yeşil top.'],
        ['20 kez atılan parada 13 kez yazı geldiyse yazı gelmenin deneysel olasılığı kaçtır?', '13/20', '7/20', '1/2', '13/7', 'Gerçekleşen / Toplam.', '13/20.'],
        ['"ANKARA" kelimesinin harflerinden rastgele seçilenin sesli harf olma olasılığı kaçtır?', '1/2', '1/3', '2/3', '1/6', '6 harfte 3 tane A.', '3/6 = 1/2.'],
        ['5 mavi, 4 kırmızı, 3 sarı ve x siyah toptan mavi çekme olasılığı 1/4 ise x kaçtır?', '8', '6', '7', '10', 'Toplam 20 olmalı.', '20 - 12 = 8.'],
        ['10 eş dilimli çarkta 3 mavi, 5 yeşil, 2 mor dilim varsa mor veya mavi gelme olasılığı kaçtır?', '1/2', '3/10', '1/5', '7/10', '(2+3)/10.', '5/10 = 1/2.']
    ]),
    ...packStage(5, 'vo', 'Veriden Olasılığa', 'sinav', [
        ['Son durumda seçilen öğrencinin gözlüklü olma olasılığı kaçtır?', '1/2', '2/5', '1/3', '3/5', '18 gözlüklü, 36 toplam.', '18/36 = 1/2.', '12 gözlüklü, 18 gözlüksüz öğrencinin olduğu sınıfa 6 gözlüklü yeni öğrenci katılıyor.'],
        ['Tek bilet alan öğrencinin ödül kazanma olasılığı yüzde kaçtır?', '%20', '%25', '%15', '%10', '5, 10, 15, 20 → 4 bilet.', '4/20 = %20.', '1\'den 20\'ye kadar biletlerden 5\'in katı olanlar kitap ödülü kazanmaktadır.'],
        ['4 mavi araba çıkarıldığında kalanlardan sarı çekme olasılığı kaçtır?', '5/16', '1/4', '5/20', '3/8', 'Kalan toplam 16 araba.', '5/16.', 'Sepette 6 kırmızı, 9 mavi ve 5 sarı araba bulunmaktadır.'],
        ['Ece çarkta kaç dilimi sarıya boyamalıdır?', '2', '1', '3', '4', '4 yeşil, 2 mavi, kalan sarı.', '8 - 6 = 2 dilim.', '8 eş dilimli çarkta yeşil %50, mavi %25, kalanı sarı olacaktır.'],
        ['Bu deneye göre çift sayı gelmesinin deneysel olasılığı kaçtır?', '8/15', '1/2', '7/15', '3/5', '4 + 7 + 5 = 16 çift.', '16/30 = 8/15.', 'Zar 30 kez atıldığında 6 kez 1, 4 kez 2, 5 kez 3, 7 kez 4, 3 kez 5 ve 5 kez 6 gelmiştir.'],
        ['Geziye 5/A dışından kaç öğrenci katılmıştır?', '15', '10', '12', '18', '5/A\'dan 10 kişi var.', '25 - 10 = 15 öğrenci.', '25 kişilik gezide kurada 5/A\'dan öğrenci çıkma olasılığı 2/5\'tir.'],
        ['Portakallı olma olasılığı vişneli olma olasılığının kaç katıdır?', '3', '2', '4', '6', '6/12 ÷ 2/12.', '3 katıdır.', 'Masada 4 elmalı, 6 portakallı ve 2 vişneli meyve suyu vardır.']
    ])
];
