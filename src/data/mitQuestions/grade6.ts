import { MitStudyQuestion, packStage } from './types';

export const GRADE_6_QUESTIONS: MitStudyQuestion[] = [
    // 1. SAYILAR VE NİCELİKLER (1) — Çarpanlar, Katlar, Bölünebilme, Asal Sayılar
    ...packStage(6, 'sn1', 'Sayılar ve Nicelikler (1)', 'kolay', [
        ['Aşağıdaki sayılardan hangisi asal sayıdır?', '29', '21', '27', '33', 'Asal sayılar sadece 1\'e ve kendisine bölünür.', '21=3×7, 27=3×9, 33=3×11; 29 asaldır.'],
        ['456 sayısı aşağıdaki sayılardan hangisine kalansız bölünemez?', '5', '2', '3', '6', '5 ile bölünebilmesi için son rakam 0 veya 5 olmalıdır.', '456\'nın son rakamı 6 olduğu için 5\'e tam bölünmez.'],
        ['18 sayısının kaç tane doğal sayı çarpanı (böleni) vardır?', '6', '4', '5', '8', '18 = 1×18, 2×9, 3×6.', 'Çarpanları: 1, 2, 3, 6, 9, 18 (6 adet).'],
        ['En küçük asal sayı ile iki basamaklı en küçük asal sayının toplamı kaçtır?', '13', '12', '14', '15', 'En küçük asal 2, iki basamaklı en küçük asal 11\'dir.', '2 + 11 = 13.'],
        ['741 sayısı 3 ile kalansız bölünebilir mi? Neden?', 'Evet, rakamları toplamı 12 olduğu için', 'Hayır, tek sayı olduğu için', 'Hayır, son basamağı 1 olduğu için', 'Evet, son basamağı tek olduğu için', '3 ile bölünebilme kuralı rakamları toplamıdır.', '7 + 4 + 1 = 12, 3\'ün katı olduğundan bölünür.'],
        ['24 sayısının asal çarpanları hangileridir?', '2 ve 3', '2 ve 4', '3 ve 8', '1, 2 ve 3', '24 = 2 × 2 × 2 × 3.', 'Asal çarpanları yalnızca 2 ve 3\'tür.'],
        ['12 ve 18 sayılarının ortak bölenlerinin en büyüğü kaçtır?', '6', '3', '9', '12', '12: {1,2,3,4,6,12}, 18: {1,2,3,6,9,18}.', 'En büyük ortak bölen 6\'dır.']
    ]),
    ...packStage(6, 'sn1', 'Sayılar ve Nicelikler (1)', 'orta', [
        ['32A4 dört basamaklı sayısı 3 ile kalansız bölünebildiğine göre A\'nın alabileceği değerler toplamı kaçtır?', '18', '12', '15', '9', '3+2+A+4 = 9+A, 3\'ün katı olmalı: A = 0, 3, 6, 9.', '0 + 3 + 6 + 9 = 18.'],
        ['54A üç basamaklı sayısı hem 2 hem 5 ile kalansız bölünebiliyorsa A kaçtır?', '0', '5', '2', '4', 'Hem 2 hem 5\'e bölünen sayılar 10\'un katıdır.', 'Birler basamağı 0 olmalıdır.'],
        ['72 sayısının asal çarpanlarına ayrılmış biçimi hangisidir?', '2³ × 3²', '2² × 3³', '2⁴ × 3', '2³ × 3³', '72 = 8 × 9.', '8 = 2³, 9 = 3² → 2³ × 3².'],
        ['4 51B sayısı 4 ile kalansız bölünebildiğine göre B yerine yazılabilecek rakamlar toplamı kaçtır?', '8', '6', '10', '12', 'Son iki basamak 1B, 4\'ün katı olmalı: 12 ve 16.', 'B = 2 veya 6; toplam 2 + 6 = 8.'],
        ['8 ve 12 sayılarının 50\'den küçük en büyük ortak katı kaçtır?', '48', '24', '36', '40', '8 ve 12\'nin en küçük ortak katı 24\'tür.', 'Katları: 24, 48 → 50\'den küçük en büyük 48.'],
        ['6A8 sayısı 9 ile kalansız bölünebildiğine göre A kaçtır?', '4', '5', '3', '6', '6 + A + 8 = 14 + A = 18 olmalı.', 'A = 4.'],
        ['42 ile 56 sayılarının en büyük ortak böleni kaçtır?', '14', '7', '21', '28', '42 = 14×3 ve 56 = 14×4.', 'En büyük ortak bölen 14\'tür.']
    ]),
    ...packStage(6, 'sn1', 'Sayılar ve Nicelikler (1)', 'zor', [
        ['Rakamları farklı 4A2B sayısı hem 5 hem 9 ile kalansız bölünebiliyor. A + B en fazla kaç olabilir?', '12', '14', '11', '15', 'B=0 veya B=5. B=5 ise 4+A+2+5 = 11+A = 18 → A=7.', 'A=7, B=5 (rakamlar farklı: 4725) → 7 + 5 = 12.'],
        ['İki zil 15 dk ve 20 dk arayla çalmaktadır. Saat 09:00\'da birlikte çaldıktan sonra ilk kez saat kaçta tekrar birlikte çalarlar?', '10:00', '09:45', '10:15', '10:30', '15 ve 20\'nin en küçük ortak katı 60 dakikadır.', '60 dk = 1 saat → 09:00 + 1 saat = 10:00.'],
        ['36 kg pirinç ve 48 kg bulgur birbirine karıştırılmadan eşit büyüklükte poşetlere doldurulacaktır. En az kaç poşet gerekir?', '7', '12', '6', '8', 'Ortak en büyük poşet 12 kg\'dır.', '36÷12 = 3, 48÷12 = 4 → 3 + 4 = 7 poşet.'],
        ['1\'den 30\'a kadar olan doğal sayılardan kaç tanesi asal sayıdır?', '10', '9', '11', '8', '2, 3, 5, 7, 11, 13, 17, 19, 23, 29.', 'Toplam 10 adet asal sayı vardır.'],
        ['5 23A sayısı 6 ile kalansız bölünebildiğine göre A\'nın alabileceği değerler toplamı kaçtır?', '10', '8', '12', '6', 'Hem çift hem rakamları toplamı 3\'ün katı: 10+A → A=2 veya 8.', '2 + 8 = 10.'],
        ['A = 2² × 3 × 5 ve B = 2 × 3² × 5 sayılarının en büyük ortak böleni kaçtır?', '30', '15', '60', '45', 'Ortak asal çarpanların küçük üsleri alınır.', '2¹ × 3¹ × 5¹ = 30.'],
        ['Biri 40 cm, diğeri 56 cm uzunluğundaki iki kurdele hiç artmadan eşit parçalara bölünecektir. Bir parça en fazla kaç cm olabilir?', '8 cm', '4 cm', '14 cm', '10 cm', '40 ve 56\'nın en büyük ortak böleni.', '40 = 8×5, 56 = 8×7 → 8 cm.']
    ]),
    ...packStage(6, 'sn1', 'Sayılar ve Nicelikler (1)', 'sinav', [
        ['İki hat saat 07:30\'da birlikte hareket ettikten sonra 12:00\'ye kadar (07:30 hariç) kaç kez daha birlikte hareket ederler?', '3', '2', '4', '5', '24 ve 36\'nın ortak katı 72 dk (1s 12dk).', '08:42, 09:54, 11:06 → toplam 3 kez.', 'Bir duraktan A otobüsü 24 dakikada bir, B otobüsü 36 dakikada bir kalkmaktadır.'],
        ['Kenarlara eşit aralıklarla ve köşelere de gelmek şartıyla en az kaç fidan dikilebilir?', '14', '12', '16', '28', '30 ve 40\'ın en büyük ortak böleni 10 m\'dir.', 'Çevre = 140 m; 140 ÷ 10 = 14 fidan.', 'Kenar uzunlukları 30 m ve 40 m olan dikdörtgen bahçenin çevresine eşit aralıklarla fidan dikilecektir.'],
        ['Kasadaki kalem sayısı 100\'den fazla olduğuna göre kasada en az kaç kalem vardır?', '108', '102', '120', '114', '9 ve 12\'nin en küçük ortak katı 36\'dır.', '36\'nın 100\'den büyük en küçük katı 36 × 3 = 108.', 'Bir kırtasiyeci kalemleri 9\'arlı veya 12\'şerli paketlediğinde hiç kalem artmamaktadır.'],
        ['Şifre 6 ile kalansız bölünebildiğine göre * yerine yazılabilecek en büyük rakam kaçtır?', '6', '8', '4', '9', '4+7+1+* = 12+* hem 3\'ün katı hem de * çift olmalıdır.', '12 + 6 = 18 olduğundan en büyük rakam 6\'dır.', 'Bir kasanın 4 basamaklı şifresi 471* biçimindedir.'],
        ['Bu koşulu sağlayan en küçük doğal sayı kaçtır?', '63', '60', '57', '65', '12 ve 15\'in ortak katı 60; üzerine 3 eklenir.', '60 + 3 = 63.', 'Bir bilye grubu 12\'şerli ve 15\'erli sayıldığında her seferinde 3 bilye artmaktadır.'],
        ['Kartonun kesilmeden önceki kısa kenarı 36 cm, uzun kenarı 60 cm olduğuna göre elde edilecek karelerin sayısı en az kaçtır?', '15', '12', '18', '10', 'Kare kenarı 36 ve 60\'ın en büyük ortak böleni olan 12 cm.', '(36÷12) × (60÷12) = 3 × 5 = 15 kare.', 'Bir dikdörtgen karton hiç artmadan eş karelere ayrılacaktır.'],
        ['Asal çarpanları yalnızca 2 ve 5 olan 50\'den küçük en büyük doğal sayı kaçtır?', '40', '45', '32', '48', '2 ve 5 dışında asal çarpan içermemeli (örn: 10, 20, 40).', '40 = 2³ × 5 olduğundan 50\'den küçük en büyük sayı 40\'tır.', 'Bir oyunda puan kartları yalnızca 2 ve 5 asal çarpanlarına sahip sayılarla etiketlenmektedir.']
    ]),

    // 2. SAYILAR VE NİCELİKLER (2) — Kesirlerle Çarpma/Bölme, Ondalık İşlemler, Oran
    ...packStage(6, 'sn2', 'Sayılar ve Nicelikler (2)', 'kolay', [
        ['2/3 × 4/5 işleminin sonucu kaçtır?', '8/15', '6/8', '8/8', '10/12', 'Pay ile pay, payda ile payda çarpılır.', '(2×4)/(3×5) = 8/15.'],
        ['3/4 ÷ 1/2 işleminin sonucu kaçtır?', '3/2', '3/8', '2/3', '6/8', 'Birinci aynen, ikinci ters çevrilip çarpılır.', '3/4 × 2/1 = 6/4 = 3/2.'],
        ['0,4 × 0,6 işleminin sonucu kaçtır?', '0,24', '2,4', '0,024', '1,0', '4 × 6 = 24; toplam 2 ondalık basamak.', '0,24.'],
        ['Bir sınıfta 12 kız ve 18 erkek vardır. Kızların erkeklere oranı en sade hâliyle kaçtır?', '2/3', '3/2', '2/5', '3/5', '12/18 kesrini 6 ile sadeleştirin.', '12/18 = 2/3.'],
        ['3,456 ondalık sayısının onda birler basamağındaki rakam kaçtır?', '4', '5', '6', '3', 'Virgülden sonraki ilk basamak onda birlerdir.', 'Onda birler basamağı 4\'tür.'],
        ['4,8 ÷ 2 işleminin sonucu kaçtır?', '2,4', '24', '0,24', '2,2', '48 ÷ 2 = 24 → bir basamak virgül.', '2,4.'],
        ['Aşağıdaki oranlardan hangisi birimsiz orandır?', '20 cm / 50 cm', '120 km / 2 saat', '45 TL / 3 kg', '60 m / 10 sn', 'Aynı tür birimlerin oranı birimsizdir.', 'cm/cm birimleri sadeleşir, birimsiz orandır.']
    ]),
    ...packStage(6, 'sn2', 'Sayılar ve Nicelikler (2)', 'orta', [
        ['1 tam 1/2 × 2/3 işleminin sonucu kaçtır?', '1', '3/2', '2/3', '4/3', '1 tam 1/2 = 3/2 olarak yazın.', '3/2 × 2/3 = 6/6 = 1.'],
        ['6 ÷ 3/4 işleminin sonucu kaçtır?', '8', '9/2', '6', '12', '6 × 4/3.', '24/3 = 8.'],
        ['2,5 × 1,4 işleminin sonucu kaçtır?', '3,5', '3,2', '35', '2,9', '25 × 14 = 350 → 2 virgül kaydır.', '3,50 = 3,5.'],
        ['4,2 ÷ 0,7 işleminin sonucu kaçtır?', '6', '0,6', '60', '7', 'Virgülleri bir basamak sağa kaydırın: 42 ÷ 7.', '42 ÷ 7 = 6.'],
        ['Bir araç 3 saatte 270 km yol gidiyor. Aracın yol/zaman oranı kaç km/saattir?', '90 km/sa', '80 km/sa', '100 km/sa', '85 km/sa', '270 ÷ 3.', '90 km/sa.'],
        ['5,847 sayısının yüzde birler basamağına yuvarlanmış hâli hangisidir?', '5,85', '5,84', '5,8', '5,90', 'Binde birler basamağı 7 ≥ 5 olduğu için yukarı yuvarlanır.', '5,85 olur.'],
        ['24 litrelik su, 3/4 litrelik şişelere doldurulursa kaç şişe dolar?', '32', '18', '28', '36', '24 ÷ 3/4 = 24 × 4/3.', '8 × 4 = 32 şişe.']
    ]),
    ...packStage(6, 'sn2', 'Sayılar ve Nicelikler (2)', 'zor', [
        ['Bir araç 180 km yolu 2 saatte gitmektedir. Bu aracın hızı saniyede kaç metredir?', '25 m/sn', '30 m/sn', '20 m/sn', '90 m/sn', '90 km/sa = 90 000 m / 3 600 sn.', '90 000 ÷ 3 600 = 25 m/sn.'],
        ['(3/4 + 1/2) ÷ 5/8 işleminin sonucu kaçtır?', '2', '5/4', '3/2', '5/2', '3/4 + 2/4 = 5/4.', '5/4 × 8/5 = 8/4 = 2.'],
        ['1,8 ÷ 0,06 + 2,5 × 4 işleminin sonucu kaçtır?', '40', '13', '35', '42', '1,8 ÷ 0,06 = 180 ÷ 6 = 30; 2,5 × 4 = 10.', '30 + 10 = 40.'],
        ['Bir karışımda suyun şuruba oranı 5/2\'dir. 35 litre su kullanıldığında kaç litre şurup kullanılır?', '14 litre', '12 litre', '15 litre', '10 litre', '5/2 = 35/x (7 kat genişletme).', '2 × 7 = 14 litre şurup.'],
        ['Bir deponun 2/5\'i doludur. Depodaki suyun 3/4\'ü kullanıldığında tüm deponun kaçta kaçı dolu kalır?', '1/10', '3/10', '1/5', '3/20', 'Kullanılan: 2/5 × 3/4 = 3/10.', 'Kalan: 2/5 - 3/10 = 4/10 - 3/10 = 1/10.'],
        ['Çözümlenmiş hâli 4×10 + 3×1 + 7×0,1 + 5×0,001 olan ondalık sayı hangisidir?', '43,705', '43,75', '43,075', '403,705', 'Yüzde birler basamağı 0\'dır.', '43,705.'],
        ['A/B = 3/5 ve A + B = 48 ise B sayısı kaçtır?', '30', '18', '24', '32', '3 kat + 5 kat = 8 kat = 48.', '1 kat = 6 → B = 5 × 6 = 30.']
    ]),
    ...packStage(6, 'sn2', 'Sayılar ve Nicelikler (2)', 'sinav', [
        ['Bir kilogramı 48 TL olan fındıktan 1,75 kg alan müşteri kaç TL öder?', '84 TL', '80 TL', '86 TL', '78 TL', '1,75 = 7/4 veya 48 × 1,75.', '48 × 1,75 = 84 TL.', 'Bir kuruyemişçide fındığın kilogram satış fiyatı 48 TL\'dir.'],
        ['Kesilen toplam parça sayısı kaçtır?', '14', '12', '16', '15', '10,5 ÷ 0,75 = 1050 ÷ 75.', '1050 ÷ 75 = 14 parça.', '10,5 metre uzunluğundaki kurdele 0,75 metrelik eş parçalara kesilecektir.'],
        ['Kızların sayısının tüm sınıfa oranı 4/9 olduğuna göre bu sınıfta kaç erkek öğrenci vardır?', '20', '16', '18', '24', '4 kat = 16 kız ise 1 kat = 4.', 'Erkek = 5 kat = 5 × 4 = 20.', 'Bir sınıfta 16 kız öğrenci bulunmaktadır.'],
        ['Bahçenin geri kalan kısmının alanı tüm bahçenin kaçta kaçıdır?', '7/12', '5/12', '1/3', '1/2', '1/4 + (1/4 × 2/3) = 1/4 + 1/6 = 5/12.', '1 - 5/12 = 7/12.', 'Bir bahçenin 1/4\'üne domates, domates ekili alanın 2/3\'ü kadar alana biber ekilmiştir.'],
        ['A marka sütün 1 litresi ile B marka sütün 1 litresi arasındaki fiyat farkı kaç TL\'dir?', '4 TL', '3 TL', '5 TL', '2 TL', 'A: 54 ÷ 1,5 = 36 TL; B: 80 ÷ 2,5 = 32 TL.', '36 - 32 = 4 TL fark.', 'Market rafında 1,5 L A marka süt 54 TL, 2,5 L B marka süt 80 TL\'dir.'],
        ['180 gram un ile aynı oranda kek yapmak için kaç gram şeker gerekir?', '120 gram', '100 gram', '150 gram', '90 gram', 'Şeker / Un = 2/3.', '180 × 2/3 = 120 gram.', 'Bir kek tarifinde 3 su bardağı una 2 su bardağı şeker konulmaktadır.'],
        ['Hangi aracın saatteki ortalama hızı daha fazladır ve aradaki fark kaç km/saattir?', 'B aracı, 15 km/sa fazla', 'A aracı, 15 km/sa fazla', 'B aracı, 10 km/sa fazla', 'İkisinin hızı eşittir', 'A: 240÷3 = 80 km/sa; B: 380÷4 = 95 km/sa.', '95 - 80 = 15 km/sa ile B aracı daha hızlıdır.', 'A aracı 3 saatte 240 km, B aracı 4 saatte 380 km yol gitmiştir.']
    ]),

    // 3. İŞLEMLERLE CEBİRSEL DÜŞÜNME VE DEĞİŞİMLER
    ...packStage(6, 'cd', 'İşlemlerle Cebirsel Düşünme ve Değişimler', 'kolay', [
        ['2⁵ üslü ifadesinin değeri kaçtır?', '32', '10', '25', '64', '2 × 2 × 2 × 2 × 2.', '2⁵ = 32.'],
        ['"Bir sayının 3 katının 5 fazlası" ifadesinin cebirsel yazılışı hangisidir?', '3x + 5', '3(x + 5)', '5x + 3', 'x + 8', 'Sayı x olsun: 3 katı 3x, 5 fazlası +5.', '3x + 5.'],
        ['4x + 7y - 9 cebirsel ifadesinin sabit terimi kaçtır?', '-9', '7', '4', '9', 'Değişken içermeyen terim işaretiyle birlikte alınır.', 'Sabit terim -9\'dur.'],
        ['x = 4 için 5x - 3 cebirsel ifadesinin değeri kaçtır?', '17', '20', '23', '15', 'x yerine 4 yazın: 5×4 - 3.', '20 - 3 = 17.'],
        ['8 × (10 + 4) = 8 × 10 + 8 × ▲ eşitliğinde ▲ kaçtır?', '4', '8', '10', '14', 'Çarpmanın toplama üzerine dağılma özelliği.', '▲ = 4.'],
        ['10⁴ sayısı kaç basamaklı bir doğal sayıdır?', '5', '4', '6', '3', '1\'in sağına 4 sıfır yazılır: 10 000.', '10 000 beş basamaklıdır.'],
        ['6a - 2b + 5 cebirsel ifadesinde kaç tane terim vardır?', '3', '2', '4', '5', 'Toplama ve çıkarma işaretleri terimleri ayırır.', '6a, -2b ve +5 olmak üzere 3 terim vardır.']
    ]),
    ...packStage(6, 'cd', 'İşlemlerle Cebirsel Düşünme ve Değişimler', 'orta', [
        ['3⁴ - 2⁵ + 5⁰ işleminin sonucu kaçtır?', '50', '49', '51', '48', '3⁴=81, 2⁵=32, 5⁰=1.', '81 - 32 + 1 = 50.'],
        ['a = 6 için (2a + 8) ÷ 4 cebirsel ifadesinin değeri kaçtır?', '5', '4', '6', '8', '(2×6 + 8) ÷ 4.', '20 ÷ 4 = 5.'],
        ['7 × 28 + 7 × 12 işlemini ortak çarpan paranteziyle hesapladığımızda sonuç kaç olur?', '280', '260', '300', '240', '7 × (28 + 12) = 7 × 40.', '280.'],
        ['"Bir sayının 4 eksiğinin 2 katı" ifadesinin cebirsel karşılığı hangisidir?', '2(x - 4)', '2x - 4', '4x - 2', 'x - 8', 'Önce 4 eksiltilir, sonra tamamı 2 ile çarpılır.', '2(x - 4).'],
        ['4x + 5y - 2x + 3 cebirsel ifadesinin katsayılar toplamı kaçtır?', '10', '12', '14', '8', 'Katsayılar: 4, 5, -2, 3.', '4 + 5 - 2 + 3 = 10.'],
        ['24 ÷ 6 + 3² × 2 - 4 işleminin sonucu kaçtır?', '18', '22', '14', '20', 'Önce üs (9), sonra bölme (4) ve çarpma (18).', '4 + 18 - 4 = 18.'],
        ['Bir kenarı a cm olan eşkenar üçgenin çevresini veren cebirsel ifade hangisidir?', '3a', 'a + 3', 'a³', '3a + 3', '3 eş kenar toplanır: a + a + a.', '3a.']
    ]),
    ...packStage(6, 'cd', 'İşlemlerle Cebirsel Düşünme ve Değişimler', 'zor', [
        ['45 × 99 işlemini dağılma özelliğini kullanarak en pratik nasıl hesaplarız?', '45 × (100 - 1) = 4 500 - 45 = 4 455', '45 × (90 + 9) = 4 050 + 45 = 4 095', '45 × 100 - 1 = 4 499', '45 × 100 + 45 = 4 545', '99 = 100 - 1 yazıp 45\'i dağıtın.', '4 500 - 45 = 4 455.'],
        ['Kısa kenarı x cm, uzun kenarı (2x + 5) cm olan dikdörtgenin çevresini veren cebirsel ifade hangisidir?', '6x + 10', '3x + 5', '6x + 5', '4x + 10', 'Çevre = 2 × (x + 2x + 5).', '2 × (3x + 5) = 6x + 10.'],
        ['m = 5 ve n = 3 için m² - 2n + 4 ifadesinin değeri kaçtır?', '23', '25', '19', '21', '5² - 2×3 + 4.', '25 - 6 + 4 = 23.'],
        ['1. adımda 5, 2. adımda 9, 3. adımda 13 olan sayı örüntüsünün n. adımını veren cebirsel kural nedir?', '4n + 1', '5n - 1', '4n + 5', '3n + 2', 'Artış miktarı 4 olduğundan 4n ile başlar.', 'n=1 için 4(1)+1=5 → kural 4n + 1.'],
        ['(4³ - 2⁴) ÷ (3² - 1) işleminin sonucu kaçtır?', '6', '8', '4', '12', '(64 - 16) ÷ (9 - 1).', '48 ÷ 8 = 6.'],
        ['Bir araç saatte v km hızla 4 saat, ardından (v + 10) km hızla 2 saat gidiyor. Toplam yolun cebirsel ifadesi nedir?', '6v + 20', '6v + 10', '4v + 20', '5v + 20', '4v + 2(v + 10).', '4v + 2v + 20 = 6v + 20.'],
        ['12 × 10⁶ doğal sayısı kaç basamaklıdır?', '8', '7', '6', '9', '12\'nin sağına 6 sıfır eklenir.', '2 + 6 = 8 basamaklıdır.']
    ]),
    ...packStage(6, 'cd', 'İşlemlerle Cebirsel Düşünme ve Değişimler', 'sinav', [
        ['x = 12 km yolculuk yapan bir müşteri kaç TL taksi ücreti öder?', '210 TL', '200 TL', '220 TL', '180 TL', 'Ücret ifadesi: 30 + 15x.', '30 + 15 × 12 = 30 + 180 = 210 TL.', 'Bir taksinin açılış ücreti 30 TL, gidilen her kilometre için ücret 15 TL\'dir.'],
        ['Bu paketteki kalem sayısı k = 8 için toplam maliyet kaç TL olur?', '134 TL', '124 TL', '144 TL', '128 TL', 'Toplam maliyet: 12k + 38.', '12×8 + 38 = 96 + 38 = 134 TL.', 'Bir kırtasiyede kalem 12 TL, defter 38 TL\'dir. Bir müşteri k kalem ve 1 defter alıyor.'],
        ['8. adımdaki kare sayısı ile 4. adımdaki kare sayısının toplamı kaçtır?', '42', '40', '38', '44', 'Kural: 3n + 3 (n=1 → 6, n=2 → 9).', 'n=8 → 27; n=4 → 15. Toplam: 27 + 15 = 42.', 'Bir karo deseninde 1. adımda 6, 2. adımda 9, 3. adımda 12 kare kullanılıyor.'],
        ['Alanı veren cebirsel ifade x = 7 cm için kaç cm² olur?', '84 cm²', '77 cm²', '91 cm²', '70 cm²', 'Alan = 6 × (x + 7) = 6x + 42.', '6 × (7 + 7) = 84 cm².', 'Kısa kenarı 6 cm, uzun kenarı (x + 7) cm olan bir dikdörtgen levha veriliyor.'],
        ['İşlem sonucunda elde edilen sayı kaçtır?', '25', '20', '30', '15', '(5³ - 5²) ÷ 2² = (125 - 25) ÷ 4.', '100 ÷ 4 = 25.', 'Bir bilgisayar programı 5\'in küpünden 5\'in karesini çıkarıp sonucu 2\'nin karesine bölmektedir.'],
        ['Toplam harcanan para miktarı n = 5 için kaç TL\'dir?', '115 TL', '105 TL', '125 TL', '110 TL', 'İfade: 25 + 18n.', '25 + 18×5 = 25 + 90 = 115 TL.', 'Bir öğrenci 25 TL\'ye kitap ve tanesi 18 TL olan kalemlerden n tane almıştır.'],
        ['6 × 10⁵ ile 4 × 10⁴ toplamı kaçtır?', '640 000', '1 000 000', '604 000', '64 000', '600 000 + 40 000.', '640 000.', 'Bir kütüphanenin dijital arşivinde 6 × 10⁵ Türkçe ve 4 × 10⁴ yabancı belge bulunmaktadır.']
    ]),

    // 4. GEOMETRİK ŞEKİLLER — Komşu, Tümler, Bütünler, Ters Açılar
    ...packStage(6, 'gs', 'Geometrik Şekiller', 'kolay', [
        ['Ölçüleri toplamı 90° olan iki açıya ne ad verilir?', 'Tümler açılar', 'Bütünler açılar', 'Ters açılar', 'Komşu açılar', '90° → Tümler (2 hece), 180° → Bütünler (3 hece).', 'Toplamları 90° olan açılar tümler açılardır.'],
        ['Ölçüsü 35° olan bir açının tümleri kaç derecedir?', '55°', '145°', '65°', '45°', '90° - 35°.', '55°\'dir.'],
        ['Ölçüsü 110° olan bir açının bütünleri kaç derecedir?', '70°', '80°', '20°', '90°', '180° - 110°.', '70°\'dir.'],
        ['Kesişen iki doğrunun oluşturduğu ters açıların ölçüleri arasındaki ilişki nedir?', 'Birbirine eşittir', 'Toplamları 90°\'dir', 'Toplamları 180°\'dir', 'Biri diğerinin 2 katıdır', 'Makasın karşılıklı kolları gibi düşünün.', 'Ters açıların ölçüleri her zaman eşittir.'],
        ['Köşeleri ve birer ışınları ortak olan, iç bölgeleri çakışmayan açılara ne denir?', 'Komşu açılar', 'Ters açılar', 'Eş açılar', 'Dik açılar', 'Yan yana duran açılar.', 'Komşu açılardır.'],
        ['Ölçüsü 62° olan açının ters açısı kaç derecedir?', '62°', '28°', '118°', '124°', 'Ters açılar eşittir.', '62°\'dir.'],
        ['Ölçüleri toplamı 180° olan iki açıya ne ad verilir?', 'Bütünler açılar', 'Tümler açılar', 'Dar açılar', 'Ters açılar', 'Doğru açı 180°\'dir.', 'Bütünler açılardır.']
    ]),
    ...packStage(6, 'gs', 'Geometrik Şekiller', 'orta', [
        ['Bütünleri 132° olan bir açının tümleri kaç derecedir?', '42°', '48°', '38°', '52°', 'Önce açıyı bulun: 180° - 132° = 48°.', 'Tümleri: 90° - 48° = 42°.'],
        ['Tümler iki açıdan biri diğerinin 2 katı olduğuna göre büyük açı kaç derecedir?', '60°', '30°', '45°', '70°', '1 kat + 2 kat = 3 kat = 90°.', '1 kat = 30°, büyük açı = 60°.'],
        ['Bütünler iki açıdan biri diğerinden 20° fazladır. Küçük açı kaç derecedir?', '80°', '100°', '70°', '90°', '2 küçük + 20° = 180°.', '2 küçük = 160° → küçük açı 80°.'],
        ['Kesişen iki doğrunun oluşturduğu dört açıdan biri 75° ise diğer üç açının ölçüleri nelerdir?', '75°, 105°, 105°', '75°, 75°, 105°', '15°, 75°, 15°', '105°, 105°, 105°', 'Ters açısı 75°, komşu bütünleri 105°.', '75°, 105°, 105°.'],
        ['Bir açının bütünleri ile tümlerinin farkı her zaman kaç derecedir?', '90°', '180°', '45°', '60°', '(180 - x) - (90 - x).', 'Daima 90°\'dir.'],
        ['Komşu tümler iki açıdan biri 24° ise diğeri kaç derecedir?', '66°', '156°', '76°', '56°', '90° - 24°.', '66°\'dir.'],
        ['Bir doğru üzerinde oluşan komşu üç açı 45°, 65° ve x° ise x kaçtır?', '70°', '60°', '80°', '75°', 'Doğru açı 180°\'dir.', '180° - (45° + 65°) = 70°.']
    ]),
    ...packStage(6, 'gs', 'Geometrik Şekiller', 'zor', [
        ['Bütünler iki açının oranı 2/7 olduğuna göre büyük açı kaç derecedir?', '140°', '120°', '135°', '150°', '2 kat + 7 kat = 9 kat = 180°.', '1 kat = 20° → büyük açı 7 × 20° = 140°.'],
        ['Bir açının bütünleri, kendisinin 4 katından 10° eksiktir. Bu açı kaç derecedir?', '38°', '36°', '40°', '42°', 'x + (4x - 10) = 180 → 5x = 190.', 'x = 190 ÷ 5 = 38°.'],
        ['Tümler iki açının farkı 16° olduğuna göre büyük açının bütünleri kaç derecedir?', '127°', '137°', '53°', '117°', 'Büyük açı = (90 + 16) ÷ 2 = 53°.', 'Bütünleri: 180° - 53° = 127°.'],
        ['Bir nokta etrafındaki dört açının üçü 85°, 110° ve 95° ise dördüncü açı kaç derecedir?', '70°', '80°', '60°', '75°', 'Tam açı 360°\'dir.', '360° - (85 + 110 + 95) = 360° - 290° = 70°.'],
        ['Ölçüleri (2x + 10)° ve (3x - 20)° olan iki açı ters açılar olduğuna göre x kaçtır?', '30', '25', '35', '20', 'Ters açılar eşittir: 2x + 10 = 3x - 20.', 'x = 30.'],
        ['Komşu tümler iki açının açıortayları arasında kalan açı kaç derecedir?', '45°', '90°', '60°', '30°', 'Toplamları 90° olan iki açının yarıları toplamı.', '90° ÷ 2 = 45°.'],
        ['Bir açının tümlerinin 3 katı, bütünlerinin 1 katından 30° fazladır. Bu açı kaç derecedir?', '30°', '40°', '45°', '35°', '3(90 - x) = (180 - x) + 30 → 270 - 3x = 210 - x.', '2x = 60 → x = 30°.']
    ]),
    ...packStage(6, 'gs', 'Geometrik Şekiller', 'sinav', [
        ['İki makas bıçağının oluşturduğu ters açılardan biri (4x - 12)° ve diğeri 68° ise x kaçtır?', '20', '18', '22', '16', '4x - 12 = 68.', '4x = 80 → x = 20.', 'Bir makas açıldığında kesişen iki kol ters açılar oluşturmaktadır.'],
        ['Kesişen iki caddenin dar açısı 52° ise bu açının komşu bütünleri olan geniş kavşak açısı kaç derecedir?', '128°', '138°', '118°', '38°', '180° - 52°.', '128°.', 'Bir şehir planında iki düz cadde tek bir kavşakta kesişmektedir.'],
        ['Güneş panelinin yatayla yaptığı açı 38° ise panelin düşey direkle yaptığı tümler açı kaç derecedir?', '52°', '62°', '42°', '142°', 'Düşey ve yatay 90° oluşturur: 90° - 38°.', '52°.', 'Bir çatıdaki güneş paneli yatay zemin ile 38° açı yapmaktadır.'],
        ['Açıortay çizildikten sonra oluşan küçük açılardan birinin bütünleri kaç derecedir?', '124°', '114°', '134°', '56°', '112°\'nin yarısı 56°.', '180° - 56° = 124°.', 'Ölçüsü 112° olan bir açının açıortayı çiziliyor.'],
        ['Saat 03:30 olduğunda akrep 3 ile 4\'ün tam ortasındadır. Akrep ile yelkovan arasındaki küçük açı kaç derecedir?', '75°', '90°', '60°', '80°', '4 ile 6 arası 60° + yarım saat 15°.', '60° + 15° = 75°.', 'Bir duvar saatinde ardışık iki sayı arası 30°\'dir.'],
        ['Düz bir duvar boyunca yerleştirilen üç eş üçgen rafın köşe açıları toplamı doğru açı oluşturuyorsa her bir rafın o köşedeki açısı kaç derecedir?', '60°', '45°', '90°', '50°', '180° ÷ 3.', '60°.', 'Bir marangoz düz duvar boyunca köşeleri ortak 3 eş raf yerleştiriyor.'],
        ['İki ışın arasındaki 140°\'lik açının içinden geçen bir ışın açıyı 3/4 oranında bölüyor. Küçük açının tümleri kaç derecedir?', '30°', '60°', '40°', '20°', '7 kat = 140° → 1 kat = 20° → küçük açı 60°.', '90° - 60° = 30°.', 'Bir ışın demeti 140°\'lik bir açıyı 3 ve 4 ile orantılı iki komşu açıya ayırıyor.']
    ]),

    // 5. GEOMETRİK NİCELİKLER — Üçgen ve Paralelkenar Alanı, Alan Ölçme Birimleri
    ...packStage(6, 'gn', 'Geometrik Nicelikler', 'kolay', [
        ['Tabanı 10 cm, yüksekliği 6 cm olan üçgenin alanı kaç cm²\'dir?', '30 cm²', '60 cm²', '16 cm²', '20 cm²', 'Alan = (taban × yükseklik) ÷ 2.', '(10 × 6) ÷ 2 = 30 cm².'],
        ['Tabanı 9 cm, bu tabana ait yüksekliği 5 cm olan paralelkenarın alanı kaç cm²\'dir?', '45 cm²', '22,5 cm²', '28 cm²', '54 cm²', 'Alan = taban × yükseklik.', '9 × 5 = 45 cm².'],
        ['1 metrekare (m²) kaç santimetrekaredir (cm²)?', '10 000 cm²', '100 cm²', '1 000 cm²', '100 000 cm²', 'Alan birimleri 100\'er 100\'er büyür/küçülür (2 basamak = 100×100).', '1 m² = 100 dm² = 10 000 cm².'],
        ['1 ar kaç metrekaredir?', '100 m²', '10 m²', '1 000 m²', '10 000 m²', 'Arazi ölçülerinde 1 ar = 100 m².', '1 ar = 100 m².'],
        ['Dik kenarları 8 cm ve 6 cm olan dik üçgenin alanı kaç cm²\'dir?', '24 cm²', '48 cm²', '14 cm²', '28 cm²', 'Dik kenarların çarpımının yarısı.', '(8 × 6) ÷ 2 = 24 cm².'],
        ['1 dekar (dönüm) kaç metrekaredir?', '1 000 m²', '100 m²', '10 000 m²', '500 m²', '1 dekar = 10 ar = 1 000 m².', '1 dekar = 1 000 m².'],
        ['Alanı 36 cm² ve tabanı 9 cm olan paralelkenarın yüksekliği kaç cm\'dir?', '4 cm', '8 cm', '6 cm', '3 cm', 'Yükseklik = Alan ÷ Taban.', '36 ÷ 9 = 4 cm.']
    ]),
    ...packStage(6, 'gn', 'Geometrik Nicelikler', 'orta', [
        ['Alanı 42 cm² ve tabanı 12 cm olan bir üçgenin bu tabana ait yüksekliği kaç cm\'dir?', '7 cm', '3,5 cm', '6 cm', '8 cm', 'Alan × 2 ÷ taban.', '84 ÷ 12 = 7 cm.'],
        ['3 hektar (ha) arazi kaç metrekaredir?', '30 000 m²', '3 000 m²', '300 m²', '300 000 m²', '1 hektar = 10 000 m².', '3 × 10 000 = 30 000 m².'],
        ['Bir paralelkenarın iki farklı kenarı 10 cm ve 8 cm\'dir. 10 cm\'lik kenara ait yükseklik 4 cm ise 8 cm\'lik kenara ait yükseklik kaç cm\'dir?', '5 cm', '6 cm', '4 cm', '3,2 cm', 'Alan sabittir: 10×4 = 8×h.', '40 ÷ 8 = 5 cm.'],
        ['4,5 m² + 25 000 cm² toplamı kaç m² eder?', '7 m²', '6,5 m²', '29,5 m²', '7,5 m²', '25 000 cm² = 2,5 m².', '4,5 + 2,5 = 7 m².'],
        ['Tabanı 14 cm, yüksekliği tabanının yarısı olan üçgenin alanı kaç cm²\'dir?', '49 cm²', '98 cm²', '56 cm²', '42 cm²', 'Yükseklik = 7 cm.', '(14 × 7) ÷ 2 = 49 cm².'],
        ['2,4 hektar + 6 dekar toplam kaç ar eder?', '300 ar', '246 ar', '30 ar', '3 000 ar', '1 ha = 100 ar, 1 daa = 10 ar.', '240 + 60 = 300 ar.'],
        ['Bir dikdörtgenin köşegeni çizildiğinde oluşan iki üçgenden birinin alanı 35 cm² ise dikdörtgenin alanı kaç cm²\'dir?', '70 cm²', '35 cm²', '105 cm²', '140 cm²', 'Köşegen dikdörtgeni iki eş üçgene böler.', '35 × 2 = 70 cm².']
    ]),
    ...packStage(6, 'gn', 'Geometrik Nicelikler', 'zor', [
        ['Tabanı 16 cm, yüksekliği 9 cm olan paralelkenarın içinden tabanı 16 cm, yüksekliği 9 cm olan bir üçgen kesiliyor. Kalan alan kaç cm²\'dir?', '72 cm²', '144 cm²', '64 cm²', '80 cm²', 'Üçgen, paralelkenarın tam yarısıdır.', '144 - 72 = 72 cm².'],
        ['4 dekarlık bir tarlanın 1 250 m²\'sine domates, 15 arına biber ekiliyor. Geriye kaç m² boş alan kalır?', '1 250 m²', '1 500 m²', '1 000 m²', '1 750 m²', '4 daa = 4 000 m²; 15 ar = 1 500 m².', '4 000 - (1 250 + 1 500) = 1 250 m².'],
        ['Bir üçgenin tabanı 2 katına, yüksekliği 3 katına çıkarılırsa alanı kaç katına çıkar?', '6 katına', '3 katına', '5 katına', '12 katına', '(2a × 3h) / 2 = 6 × (ah/2).', 'Alan 6 katına çıkar.'],
        ['Çevresi 44 cm olan bir paralelkenarın uzun kenarı 14 cm, kısa kenarına ait yüksekliği 7 cm olduğuna göre alanı kaç cm²\'dir?', '56 cm²', '98 cm²', '112 cm²', '84 cm²', 'Kısa kenar = (44 - 28) ÷ 2 = 8 cm.', 'Alan = 8 × 7 = 56 cm².'],
        ['Tabanı 12 cm olan bir dik üçgenin hipotenüsü değil diğer dik kenarı 10 cm\'dir. Bu üçgenle aynı alana sahip ve tabanı 15 cm olan bir paralelkenarın yüksekliği kaç cm\'dir?', '4 cm', '8 cm', '6 cm', '5 cm', 'Üçgenin alanı = (12×10)/2 = 60 cm².', 'Paralelkenar yüksekliği = 60 ÷ 15 = 4 cm.'],
        ['0,08 km²\'lik bir orman alanı kaç hektardır?', '8 ha', '80 ha', '800 ha', '0,8 ha', '1 km² = 100 hektar.', '0,08 × 100 = 8 ha.'],
        ['Aralarındaki uzaklık 6 cm olan paralel iki doğru arasında tabanı 11 cm olan bir üçgen çiziliyor. Bu üçgenin alanı kaç cm²\'dir?', '33 cm²', '66 cm²', '22 cm²', '44 cm²', 'Paralel doğrular arası uzaklık üçgenin yüksekliğidir.', '(11 × 6) ÷ 2 = 33 cm².']
    ]),
    ...packStage(6, 'gn', 'Geometrik Nicelikler', 'sinav', [
        ['Parsellerin her biri 250 m² olduğuna göre bu arazi en fazla kaç parsele bölünebilir?', '48', '40', '50', '45', '1,2 ha = 12 000 m².', '12 000 ÷ 250 = 48 parsel.', 'Bir belediye 1,2 hektarlık arsayı 250 m²\'lik konut parsellerine ayırmaktadır.'],
        ['Paralelkenar şeklindeki bahçenin tamamını çimlendirmek için kaç TL ödenir?', '21 600 TL', '10 800 TL', '18 000 TL', '24 000 TL', 'Alan = 24 × 15 = 360 m².', '360 × 60 = 21 600 TL.', 'Tabanı 24 m, yüksekliği 15 m olan paralelkenar bahçede 1 m² çim 60 TL\'dir.'],
        ['Üçgen şeklindeki yelkenin kumaş maliyeti kaç TL\'dir?', '2 800 TL', '5 600 TL', '2 400 TL', '3 200 TL', 'Alan = (8 × 7) ÷ 2 = 28 m².', '28 × 100 = 2 800 TL.', 'Tabanı 8 m, yüksekliği 7 m olan üçgen yelkenin metrekaresi 100 TL\'dir.'],
        ['Birleştirilen iki üçgen ve bir dikdörtgenden oluşan çatının ön yüz alanı kaç m²\'dir?', '46 m²', '42 m²', '52 m²', '38 m²', 'Dikdörtgen 8×4=32 m², iki üçgen 2×(3,5×4/2)=14 m².', '32 + 14 = 46 m².', 'Bir evin ön yüzü 8 m × 4 m dikdörtgen ve yanlarında tabanı 3,5 m, yüksekliği 4 m iki üçgenden oluşuyor.'],
        ['6 dekarlık tarlanın tamamını sürmek için toplam kaç litre yakıt gerekir?', '45 litre', '40 litre', '50 litre', '30 litre', '6 dekar = 60 ar.', '(60 ÷ 4) × 3 = 15 × 3 = 45 litre.', 'Bir traktör her 4 arlık araziyi sürmek için 3 litre yakıt tüketmektedir.'],
        ['Kartonun boyalı paralelkenar kısmının alanı kaç cm²\'dir?', '120 cm²', '140 cm²', '100 cm²', '60 cm²', 'Dikdörtgen 20×10=200; iki yan üçgen 2×(8×10/2)=80.', '200 - 80 = 120 cm².', '20 cm × 10 cm dikdörtgen kartonun iki yanından tabanı 8 cm, yüksekliği 10 cm iki dik üçgen kesiliyor.'],
        ['Kalan arazinin alanı kaç dekar (dönüm) olur?', '15 dekar', '12 dekar', '18 dekar', '20 dekar', '2 ha = 20 dekar; 50 ar = 5 dekar.', '20 - 5 = 15 dekar.', '2 hektarlık arazinin 50 arlık bölümü okul bahçesi olarak ayrılıyor.']
    ]),

    // 6. İSTATİSTİKSEL ARAŞTIRMA SÜRECİ — Aritmetik Ortalama, Açıklık, İkili Sütun Grafiği
    ...packStage(6, 'ia', 'İstatistiksel Araştırma Süreci', 'kolay', [
        ['10, 14, 18, 22 veri grubunun aritmetik ortalaması kaçtır?', '16', '15', '17', '18', 'Verileri toplayıp 4\'e bölün.', '(10 + 14 + 18 + 22) ÷ 4 = 64 ÷ 4 = 16.'],
        ['8, 15, 3, 21, 11 veri grubunun açıklığı (ranjı) kaçtır?', '18', '15', '19', '12', 'Açıklık = En büyük değer - En küçük değer.', '21 - 3 = 18.'],
        ['İki farklı sınıfın ders başarılarını aynı grafikte karşılaştırmak için en uygun grafik hangisidir?', 'İkili sütun grafiği', 'Çetele tablosu', 'Tekli sıklık tablosu', 'Sayı doğrusu', 'İki grubu yan yana karşılaştıran grafik.', 'İkili sütun grafiğidir.'],
        ['Bir öğrencinin üç matematik sınav notu 70, 80 ve 90 ise ortalaması kaçtır?', '80', '75', '85', '82', '(70 + 80 + 90) ÷ 3.', '240 ÷ 3 = 80.'],
        ['12, 12, 12, 12 veri grubunun açıklığı kaçtır?', '0', '12', '4', '1', 'En büyük 12, en küçük 12.', '12 - 12 = 0.'],
        ['Beş sayının toplamı 125 ise bu sayıların aritmetik ortalaması kaçtır?', '25', '20', '30', '24', '125 ÷ 5.', '25.'],
        ['Bir veri grubunda açıklığın küçük olması neyi gösterir?', 'Verilerin birbirine yakın ve tutarlı olduğunu', 'Verilerin çok dağınık olduğunu', 'Ortalamanın çok yüksek olduğunu', 'Veri sayısının az olduğunu', 'Açıklık yayılım ölçüsüdür.', 'Küçük açıklık verilerin istikrarlı ve birbirine yakın olduğunu gösterir.']
    ]),
    ...packStage(6, 'ia', 'İstatistiksel Araştırma Süreci', 'orta', [
        ['Dört sayının aritmetik ortalaması 18\'dir. Bu sayılara 28 sayısı eklenirse yeni ortalama kaç olur?', '20', '19', '21', '22', 'İlk 4 sayının toplamı 4 × 18 = 72.', '(72 + 28) ÷ 5 = 100 ÷ 5 = 20.'],
        ['14, 22, A, 18 veri grubunun açıklığı 15 olduğuna göre A sayısı en az kaç olabilir?', '7', '9', '8', '6', 'En büyük 22 iken 22 - A = 15.', 'A = 7.'],
        ['Yaşları ortalaması 12 olan 5 kişilik gruba yaşı 18 olan bir kişi katılırsa yeni yaş ortalaması kaç olur?', '13', '14', '12,5', '15', 'Toplam yaş: 60 + 18 = 78.', '78 ÷ 6 = 13.'],
        ['Bir basketbolcunun 4 maçtaki sayıları 16, 20, 14 ve x\'tir. Ortalaması 18 olduğuna göre x kaçtır?', '22', '20', '24', '18', 'Toplam 4 × 18 = 72 olmalı.', '72 - (16 + 20 + 14) = 22.'],
        ['A grubu: {15, 17, 16, 16} ve B grubu: {4, 28, 10, 22}. İki grubun ortalamaları eşit (16) olduğuna göre hangi grup daha istikrarlıdır?', 'A grubu (açıklığı daha küçük)', 'B grubu (açıklığı daha büyük)', 'İkisi de aynıdır', 'Karşılaştırılamaz', 'A açıklığı 2, B açıklığı 24.', 'Açıklığı küçük olan A grubu daha istikrarlıdır.'],
        ['6 sayının aritmetik ortalaması 15\'tir. Bu sayılardan 25 çıkarılırsa kalan 5 sayının ortalaması kaç olur?', '13', '14', '12', '11', 'İlk toplam 90; 90 - 25 = 65.', '65 ÷ 5 = 13.'],
        ['Bir sınıfta 10 kızın boy ortalaması 150 cm, 10 erkeğin boy ortalaması 160 cm ise tüm sınıfın boy ortalaması kaç cm\'dir?', '155 cm', '154 cm', '156 cm', '152 cm', 'Sayılar eşit olduğu için (150 + 160) ÷ 2.', '155 cm.']
    ]),
    ...packStage(6, 'ia', 'İstatistiksel Araştırma Süreci', 'zor', [
        ['Üç sayının ortalaması 24, başka beş sayının ortalaması 16\'dır. Bu 8 sayının ortalaması kaçtır?', '19', '20', '18', '21', 'Toplamlar: 3×24 = 72 ve 5×16 = 80.', '(72 + 80) ÷ 8 = 152 ÷ 8 = 19.'],
        ['Bir veri grubundaki her bir veriye 6 eklenirse aritmetik ortalama ve açıklık nasıl değişir?', 'Ortalama 6 artar, açıklık değişmez', 'İkisi de 6 artar', 'Ortalama değişmez, açıklık 6 artar', 'İkisi de değişmez', 'En büyük ve en küçük ikisi de 6 arttığı için fark değişmez.', 'Ortalama +6 artar, açıklık sabit kalır.'],
        ['İlk 3 sınavının ortalaması 76 olan Arda, 4. sınavdan kaç alırsa ortalaması 80 olur?', '92', '88', '90', '84', '4 sınav toplamı 320 olmalı; ilk 3 toplamı 228.', '320 - 228 = 92.'],
        ['12, 18, 25, x, 30 veri grubunun açıklığı 21 ise x\'in alabileceği değerlerin toplamı kaçtır?', '42', '33', '39', '45', 'x en küçükse 30 - x = 21 → x = 9; x en büyükse x - 12 = 21 → x = 33.', '9 + 33 = 42.'],
        ['Bir sınıfta 12 kızın not ortalaması 85, 8 erkeğin not ortalaması 75\'tir. Sınıf ortalaması kaçtır?', '81', '80', '82', '79', '(12×85 + 8×75) ÷ 20 = (1020 + 600) ÷ 20.', '1620 ÷ 20 = 81.'],
        ['Beş kardeşin bugünkü yaş ortalaması 14\'tür. 4 yıl sonra bu kardeşlerin yaş ortalaması kaç olur?', '18', '16', '19', '20', 'Herkes 4 yaş büyür.', '14 + 4 = 18.'],
        ['Aritmetik ortalaması 20 olan 6 doğal sayıdan ikisi 12 ve 16\'dır. Kalan 4 sayının ortalaması kaçtır?', '23', '22', '24', '21', 'Toplam 120; 120 - 28 = 92.', '92 ÷ 4 = 23.']
    ]),
    ...packStage(6, 'ia', 'İstatistiksel Araştırma Süreci', 'sinav', [
        ['Hangi sporcunun koşu süreleri daha istikrarlıdır ve iki sporcunun açıklıkları farkı kaç saniyedir?', 'Mert daha istikrarlı, fark 6 sn', 'Can daha istikrarlı, fark 6 sn', 'Mert daha istikrarlı, fark 4 sn', 'İkisi de eşit istikrardadır', 'Mert açıklık: 14-12=2 sn; Can açıklık: 17-9=8 sn.', '8 - 2 = 6 sn farkla Mert daha istikrarlıdır.', '100 m koşusunda Mert\'in süreleri {12, 13, 14, 13} sn, Can\'ın süreleri {9, 17, 12, 14} sn\'dir.'],
        ['İki şubenin toplam okuduğu kitap sayılarının farkı kaçtır?', '15', '10', '20', '25', '6/A: 25+30+20=75; 6/B: 30+25+35=90.', '90 - 75 = 15 kitap.', 'İkili sütun grafiğinde 3 ayda 6/A sırasıyla 25, 30, 20; 6/B ise 30, 25, 35 kitap okumuştur.'],
        ['Yeni katılan iki öğrencinin yaşları toplamı kaçtır?', '30', '28', '32', '26', 'İlk toplam 8×11=88; yeni toplam 10×11,8=118.', '118 - 88 = 30.', 'Yaş ortalaması 11 olan 8 kişilik kulübe 2 kişi daha katılınca ortalama 11,8 oluyor.'],
        ['Son gün kaç soru çözerse 5 günlük ortalaması tam 60 soru olur?', '75', '70', '80', '65', '5 gün toplamı 300 olmalı; ilk 4 gün 225.', '300 - 225 = 75 soru.', 'Defne ilk 4 günde 50, 65, 55 ve 55 soru çözmüştür.'],
        ['Bu iki ilin 4 günlük ortalama sıcaklıkları arasındaki fark kaç derecedir?', '4°C', '3°C', '5°C', '2°C', 'A ort: (18+20+22+20)/4=20; B ort: (14+16+18+16)/4=16.', '20 - 16 = 4°C.', '4 günlük sıcaklıklar A ilinde {18, 20, 22, 20}°C, B ilinde {14, 16, 18, 16}°C\'dir.'],
        ['Takımın boy ortalaması kaç cm olur?', '175 cm', '174 cm', '176 cm', '173 cm', 'Eski toplam 5×172=860; 860 - 165 + 180 = 875.', '875 ÷ 5 = 175 cm.', 'Boy ortalaması 172 cm olan 5 kişilik takımdan 165 cm\'lik oyuncu çıkıp 180 cm\'lik oyuncu giriyor.'],
        ['Satışların en yüksek olduğu gün ile en düşük olduğu gün arasındaki açıklık kaç adettir?', '45', '40', '50', '35', 'En yüksek 85, en düşük 40.', '85 - 40 = 45 adet.', 'Bir mağazada hafta içi günlük satışlar 55, 40, 70, 85 ve 60 adettir.']
    ]),

    // 7. VERİDEN OLASILIĞA — 6. Sınıf Olasılık, Deneysel & Teorik Olasılık
    ...packStage(6, 'vo', 'Veriden Olasılığa', 'kolay', [
        ['Hilesiz bir zar atıldığında üst yüze asal sayı gelme olasılığı kaçtır?', '1/2', '1/3', '2/3', '1/6', 'Asal sayılar: 2, 3, 5 (3 adet).', '3 / 6 = 1/2.'],
        ['Bir olayın olma olasılığı 3/8 ise olmama olasılığı kaçtır?', '5/8', '3/8', '1/2', '1/8', 'Olma + Olmama = 1.', '1 - 3/8 = 5/8.'],
        ['1\'den 15\'e kadar numaralı kartlardan 5\'in katı çekme olasılığı kaçtır?', '1/5', '1/3', '2/5', '4/15', '5, 10, 15 (3 kart).', '3 / 15 = 1/5.'],
        ['Aşağıdaki sayılardan hangisi bir olayın olasılığı OLAMAZ?', '5/4', '0', '1', '0,75', 'Olasılık 0 ile 1 arasında olmalıdır.', '5/4 > 1 olduğundan olasılık olamaz.'],
        ['Torbada 7 mavi, 3 kırmızı, 5 yeşil top vardır. Yeşil çekme olasılığı kaçtır?', '1/3', '1/5', '7/15', '2/5', 'Toplam 15 top, 5 yeşil.', '5 / 15 = 1/3.'],
        ['Bir deneyin gerçekleşebilecek tüm sonuçlarının kümesine ne ad verilir?', 'Örnek uzay', 'Kesin olay', 'Sıklık', 'Aritmetik ortalama', 'Tüm olası çıktılar kümesi.', 'Örnek uzay denir.'],
        ['Hilesiz bir zar atıldığında 2\'den küçük sayı gelme olasılığı kaçtır?', '1/6', '1/3', '1/2', '0', 'Sadece 1 sayısı 2\'den küçüktür.', '1 / 6.']
    ]),
    ...packStage(6, 'vo', 'Veriden Olasılığa', 'orta', [
        ['1\'den 20\'ye kadar numaralı kartlardan rastgele seçilenin 3\'ün katı olma olasılığı kaçtır?', '3/10', '1/4', '7/20', '2/5', '3, 6, 9, 12, 15, 18 (6 adet).', '6 / 20 = 3/10.'],
        ['Bir basketbolcu 25 serbest atışın 18\'ini sayı yapmıştır. Bu verilere göre bir sonraki atışı sayı yapmasının deneysel olasılığı yüzde kaçtır?', '%72', '%68', '%75', '%80', '18/25 kesrini 4 ile genişletin.', '72/100 = %72.'],
        ['24 kişilik sınıfta gözlüklü seçilme olasılığı 1/4 ise gözlüksüz kaç öğrenci vardır?', '18', '6', '16', '20', 'Gözlüklü 6 kişi.', '24 - 6 = 18 gözlüksüz.'],
        ['"OLASILIK" kelimesinin harflerinden rastgele seçilenin sessiz harf olma olasılığı kaçtır?', '1/2', '3/8', '5/8', '1/4', '8 harfte 4 sessiz (L, S, L, K).', '4 / 8 = 1/2.'],
        ['İçinde 10 siyah, 15 beyaz top bulunan torbadan en az kaç beyaz top çıkarılırsa siyah çekme olasılığı 1/2 olur?', '5', '10', '3', '4', 'Siyah ve beyaz sayıları 10 = 10 olmalı.', '15 - 10 = 5 beyaz top çıkarılmalıdır.'],
        ['1\'den 12\'ye kadar numaralı toplardan seçilenin 12\'nin böleni olma olasılığı kaçtır?', '1/2', '1/3', '5/12', '7/12', '12\'nin bölenleri: 1, 2, 3, 4, 6, 12 (6 adet).', '6 / 12 = 1/2.'],
        ['Bir çark 12 eş dilime bölünmüştür. 3 dilim sarı, 4 dilim mavi, 5 dilim yeşildir. Mavi veya sarı gelme olasılığı kaçtır?', '7/12', '1/2', '5/12', '2/3', '3 + 4 = 7 dilim.', '7 / 12.']
    ]),
    ...packStage(6, 'vo', 'Veriden Olasılığa', 'zor', [
        ['1\'den 30\'a kadar tam sayılardan rastgele seçilen bir sayının hem 2 hem 3 ile bölünebilme olasılığı kaçtır?', '1/6', '1/5', '1/3', '1/10', '6\'nın katları: 6, 12, 18, 24, 30 (5 adet).', '5 / 30 = 1/6.'],
        ['Bir torbadaki 36 bilyenin renklerine göre dağılımı: 1/3\'ü sarı, 1/4\'ü mavi, kalanı kırmızıdır. Kırmızı çekme olasılığı kaçtır?', '5/12', '1/2', '7/12', '1/3', 'Sarı 12, Mavi 9 → Kırmızı 15.', '15 / 36 = 5/12.'],
        ['Bir madeni para 50 kez atıldığında 28 kez tura geliyor. Tura gelmenin deneysel olasılığı ile teorik olasılığı arasındaki fark kaçtır?', '3/50', '1/25', '1/50', '2/25', '28/50 - 25/50.', '3/50 (0,06).'],
        ['10 ile 25 arasındaki (10 ve 25 dahil) doğal sayılardan rastgele seçilenin asal olma olasılığı kaçtır?', '5/16', '1/4', '3/8', '5/15', 'Toplam 16 sayı; asallar: 11, 13, 17, 19, 23 (5 adet).', '5 / 16.'],
        ['İki torbadan 1.\'sinde 3 kırmızı 5 mavi, 2.\'sinde 4 kırmızı 4 mavi top vardır. Hangi torbadan kırmızı çekme olasılığı daha yüksektir?', '2. torba', '1. torba', 'İkisinde de eşittir', 'Belirlenemez', '1. torba 3/8, 2. torba 4/8.', '4/8 > 3/8 olduğundan 2. torba.'],
        ['Bir kutudaki kalemlerin mavi olma olasılığı 2/7, kırmızı olma olasılığı 3/7 ve kalan 6 kalem siyahtır. Kutuda toplam kaç kalem vardır?', '21', '28', '14', '35', 'Siyah oranı: 1 - 5/7 = 2/7 = 6 kalem.', '1/7 = 3 kalem → toplam 7 × 3 = 21 kalem.'],
        ['Rakamları (0-9) yazılı 10 karttan rastgele seçilenin 6\'dan büyük veya 2\'den küçük olma olasılığı kaçtır?', '1/2', '2/5', '3/5', '3/10', '0, 1 ve 7, 8, 9 → toplam 5 kart.', '5 / 10 = 1/2.']
    ]),
    ...packStage(6, 'vo', 'Veriden Olasılığa', 'sinav', [
        ['Rastgele seçilen bir öğrencinin müzik kulübünden olma olasılığı kaçtır?', '3/10', '1/4', '7/20', '2/5', 'Müzik = 40 - (14 + 10 + 4) = 12.', '12 / 40 = 3/10.', '40 öğrencilik bir okul kulübünde 14 spor, 10 satranç, 4 resim ve kalanı müzik kulübündedir.'],
        ['İlk seçilen elma çürük çıktığına göre kalanlar arasından rastgele seçilen ikinci elmanın sağlam olma olasılığı kaçtır?', '16/19', '4/5', '15/19', '17/19', 'Kalan toplam 19, sağlam sayısı değişmedi 16.', '16 / 19.', 'Bir kasadaki 20 elmanın 4\'ü çürük, 16\'sı sağlamdır.'],
        ['Çark 60 kez çevrildiğinde teorik olarak yaklaşık kaç kez yeşil gelmesi beklenir?', '15', '20', '12', '18', 'Yeşil olasılığı 3/12 = 1/4.', '60 × 1/4 = 15 kez.', '12 eş dilimli bir çarkın 3 dilimi yeşil, diğerleri farklı renktedir.'],
        ['Çekilişte bilet numarasının 4 ile kalansız bölünebilme olasılığı kaçtır?', '1/4', '1/5', '3/10', '1/3', '1-40 arası 4\'ün katı 10 sayı vardır.', '10 / 40 = 1/4.', '1\'den 40\'a kadar numaralanmış 40 bilet arasından bir kazanan çekilecektir.'],
        ['Torbaya en az kaç mavi top eklenirse mavi çekme olasılığı 2/3 olur?', '12', '8', '10', '14', 'Kırmızı 8 top = 1/3 olmalı → toplam 24 top.', 'Mavi 16 olmalı; 16 - 4 = 12 top eklenir.', 'Bir torbada 8 kırmızı ve 4 mavi top bulunmaktadır.'],
        ['Seçilen kitabın roman olmama olasılığı yüzde kaçtır?', '%65', '%35', '%60', '%70', 'Roman dışı: 26 kitap (26/40 = 65/100).', '%65.', 'Bir rafta 14 roman, 16 hikaye ve 10 şiir kitabı vardır.'],
        ['Kura ile seçilen öğrencinin 6/A sınıfında okuyan bir kız öğrenci olma olasılığı kaçtır?', '1/5', '3/10', '1/4', '2/5', '6/A kız sayısı 12, toplam öğrenci 60.', '12 / 60 = 1/5.', '6. sınıflarda toplam 60 öğrenci vardır ve bunların 12\'si 6/A sınıfındaki kız öğrencilerdir.']
    ])
];
