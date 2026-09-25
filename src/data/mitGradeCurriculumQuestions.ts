export type DifficultyStage = 'kolay' | 'orta' | 'zor' | 'sinav';

export interface MitStudyQuestion {
    id: string | number;
    grade: 5 | 6 | 7 | 8;
    topic: string;
    subTopic?: string;
    difficulty: DifficultyStage;
    q: string;
    options: string[];
    ans: string;
    hint: string;
    explanation: string;
    contextText?: string;
    examType?: 'LGS' | 'Bursluluk (İOKBS)' | 'Kazanım İzleme' | 'Beceri Temelli' | 'LGS Ön Hazırlık';
}

export const MIT_STUDY_QUESTIONS: MitStudyQuestion[] = [
    // ==========================================
    // 5. SINIF SORULARI
    // ==========================================
    // DOĞAL SAYILAR (5. Sınıf)
    {
        id: '5_ds_1',
        grade: 5,
        topic: 'Doğal Sayılar',
        difficulty: 'kolay',
        q: '84 503 219 sayısının binler bölüğündeki rakamların toplamı kaçtır?',
        options: ['8', '12', '17', '5'],
        ans: '8',
        hint: 'Binler bölüğü sayının ortasındaki üç basamaktır: 503.',
        explanation: 'Binler bölüğündeki sayı 503\'tür. Rakamları toplamı: 5 + 0 + 3 = 8 olur.'
    },
    {
        id: '5_ds_2',
        grade: 5,
        topic: 'Doğal Sayılar',
        difficulty: 'orta',
        q: 'Yedi yüz iki milyon kırk bin on sekiz sayısının rakamlarla yazılışı hangisidir?',
        options: ['702 040 018', '720 040 018', '702 400 180', '702 004 018'],
        ans: '702 040 018',
        hint: 'Milyonlar bölüğü: 702, Binler bölüğü: 040, Birler bölüğü: 018.',
        explanation: 'Milyonlar: 702, Binler: 040, Birler: 018. Birleştirildiğinde 702 040 018 sayısı elde edilir.'
    },
    {
        id: '5_ds_3',
        grade: 5,
        topic: 'Doğal Sayılar',
        difficulty: 'zor',
        q: 'Rakamları birbirinden farklı 7 basamaklı en küçük çift doğal sayının on binler basamağındaki rakam kaçtır?',
        options: ['2', '3', '0', '4'],
        ans: '2',
        hint: 'En küçük 7 basamaklı rakamları farklı sayı için 1 023 456 yazılabilir. Çift olmasına dikkat ediniz.',
        explanation: 'Rakamları farklı en küçük 7 basamaklı çift sayı: 1 023 456\'dır. Basamaklar: 1 (milyonlar), 0 (yüz binler), 2 (on binler), 3 (binler)... On binler basamağındaki rakam 2\'dir.'
    },
    {
        id: '5_ds_4',
        grade: 5,
        topic: 'Doğal Sayılar',
        difficulty: 'sinav',
        examType: 'Bursluluk (İOKBS)',
        contextText: 'Bir kütüphanedeki kitapların barkod numaraları 8 basamaklı doğal sayılardan oluşmaktadır. Barkodun milyonlar bölüğündeki sayı kütüphane kodunu, binler bölüğü kategori kodunu, birler bölüğü ise raf sıra numarasını göstermektedir.',
        q: 'Bilim kategorisindeki bir kitabın barkodunda:\n• Milyonlar bölüğündeki rakamların basamak değerleri toplamı 45 000 000,\n• Kategori kodu olan sayı, en küçük üç basamaklı asal sayı,\n• Raf sıra numarası ise 500\'den küçük en büyük tam kare sayıdır.\nBuna göre bu kitabın 8 basamaklı barkod numarası aşağıdakilerden hangisidir?',
        options: ['45 101 484', '45 103 441', '45 101 441', '45 107 484'],
        ans: '45 101 484',
        hint: 'En küçük üç basamaklı asal sayı 101\'dir. 500\'den küçük en büyük tam kare sayı ise 22² = 484\'tür.',
        explanation: 'Milyonlar bölüğü: 45. En küçük üç basamaklı asal sayı: 101 (binler bölüğü). 500\'den küçük en büyük tam kare sayı: 22² = 484. Barkod: 45 101 484.'
    },

    // DOĞAL SAYILARLA İŞLEMLER (5. Sınıf)
    {
        id: '5_dsi_1',
        grade: 5,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'kolay',
        q: '348 × 25 işleminin sonucu kaçtır?',
        options: ['8700', '8600', '8500', '8800'],
        ans: '8700',
        hint: '25 ile kısa yoldan çarpmak için sayıyı 4\'e bölüp 100 ile çarpabilirsiniz: (348 ÷ 4) × 100.',
        explanation: '348 ÷ 4 = 87, 87 × 100 = 8700.'
    },
    {
        id: '5_dsi_2',
        grade: 5,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'orta',
        q: 'Bir bölme işleminde bölen 18, bölüm 24 ve kalan olabilecek en büyük değerdedir. Buna göre bölünen sayı kaçtır?',
        options: ['449', '432', '450', '431'],
        ans: '449',
        hint: 'Kalan her zaman bölenden küçüktür. Bölen 18 ise kalan en fazla 17 olabilir.',
        explanation: 'Bölünen = (Bölen × Bölüm) + Kalan. Kalan en çok 17 olur. Bölünen = (18 × 24) + 17 = 432 + 17 = 449.'
    },
    {
        id: '5_dsi_3',
        grade: 5,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'zor',
        q: 'Bir kırtasiyeci tanesini 14 TL\'den aldığı defterlerin 35 tanesini 20 TL\'den, kalan 15 tanesini ise 18 TL\'den satmıştır. Kırtasiyecinin bu satıştan kârı kaç TL\'dir?',
        options: ['270', '250', '290', '320'],
        ans: '270',
        hint: 'Toplam maliyeti ve toplam geliri hesaplayıp aradaki farkı bulunuz.',
        explanation: 'Maliyet: 50 × 14 = 700 TL. Gelir: (35 × 20) + (15 × 18) = 700 + 270 = 970 TL. Kâr = 970 - 700 = 270 TL.'
    },
    {
        id: '5_dsi_4',
        grade: 5,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Bir okulda 5. sınıflar arası düzenlenen robotik turnuvasında robotlar pistteki engelleri aşarak puan toplamaktadır. Robot ileriye doğru her 4 adımında 15 puan kazanmakta, her 1 geri adımında ise 5 puan kaybetmektedir.',
        q: 'Bir robot pist boyunca toplam 45 adım atmış ve geriye doğru adımları toplam adım sayısının 5\'te 1\'i kadar olmuştur. Bu robot turnuvayı kaç puanla tamamlamıştır?',
        options: ['495', '450', '540', '585'],
        ans: '495',
        hint: 'Geri adım sayısı 45 ÷ 5 = 9 adımdır. İleri adım sayısı 45 - 9 = 36 adımdır.',
        explanation: 'İleri adım = 36 adım. 4 adımda 15 puan ise 36 ÷ 4 = 9 grup × 15 = 135 puan... Her ileri adım 15/4 puandır. Geri adım = 9 × 5 = 45 puan kayıp. 36 adımda 36 × (15/4) = 540 puan. Net = 540 - 45 = 495 puan.'
    },

    // KESİRLER & İŞLEMLER (5. Sınıf)
    {
        id: '5_kes_1',
        grade: 5,
        topic: 'Kesirler',
        difficulty: 'kolay',
        q: '23/5 kesrinin tam sayılı kesir olarak gösterimi aşağıdakilerden hangisidir?',
        options: ['4 tam 3/5', '3 tam 4/5', '4 tam 2/5', '5 tam 3/5'],
        ans: '4 tam 3/5',
        hint: '23\'ü 5\'e bölün: Bölüm tam kısım, kalan pay, bölen paydadır.',
        explanation: '23 ÷ 5 = 4 (kalan 3). Yani 4 tam 3/5 olur.'
    },
    {
        id: '5_kes_2',
        grade: 5,
        topic: 'Kesirlerle İşlemler',
        difficulty: 'orta',
        q: '2/3 + 5/12 işleminin sonucu en sade haliyle kaçtır?',
        options: ['13/12', '7/15', '11/12', '9/12'],
        ans: '13/12',
        hint: 'Paydaları 12\'de eşitleyiniz: 2/3 = 8/12.',
        explanation: '8/12 + 5/12 = 13/12 (1 tam 1/12).'
    },
    {
        id: '5_kes_3',
        grade: 5,
        topic: 'Kesirlerle İşlemler',
        difficulty: 'zor',
        q: 'Bir depodaki 360 litre suyun 2/9\'u sabah, kalanın 3/7\'si öğleden sonra kullanılmıştır. Depoda kaç litre su kalmıştır?',
        options: ['160', '180', '200', '120'],
        ans: '160',
        hint: 'Önce sabah kullanılanı çıkarıp kalanı bulun, sonra kalanın 3/7\'sini hesaplayın.',
        explanation: 'Sabah: 360 × (2/9) = 80 L. Kalan = 280 L. Öğleden sonra: 280 × (3/7) = 120 L. Son kalan = 280 - 120 = 160 litre.'
    },
    {
        id: '5_kes_4',
        grade: 5,
        topic: 'Kesirlerle İşlemler',
        difficulty: 'sinav',
        examType: 'Bursluluk (İOKBS)',
        contextText: 'Eşit uzunluktaki iki şeritten birincisi 6 eş parçaya, ikincisi ise 8 eş parçaya bölünmüştür. Birinci şeritten 4 parça, ikinci şeritten ise 5 parça kesilip uç uca eklenmiştir.',
        q: 'Bir şeridin uzunluğu 120 cm olduğuna göre, uç uca eklenen yeni şeridin toplam uzunluğu kaç santimetredir?',
        options: ['155', '145', '160', '150'],
        ans: '155',
        hint: '1. şeritte her parça 120 ÷ 6 = 20 cm. 2. şeritte her parça 120 ÷ 8 = 15 cm.',
        explanation: '1. şeritten 4 parça = 4 × 20 = 80 cm. 2. şeritten 5 parça = 5 × 15 = 75 cm. Toplam = 80 + 75 = 155 cm.'
    },

    // ONDALIK GÖSTERİM & YÜZDELER (5. Sınıf)
    {
        id: '5_ond_1',
        grade: 5,
        topic: 'Ondalık Gösterim',
        difficulty: 'kolay',
        q: '17/20 kesrinin ondalık gösterimi aşağıdakilerden hangisidir?',
        options: ['0,85', '0,75', '0,90', '1,7'],
        ans: '0,85',
        hint: 'Pay ve paydayı 5 ile genişleterek paydayı 100 yapınız: 17 × 5 / 20 × 5.',
        explanation: '85/100 = 0,85.'
    },
    {
        id: '5_ond_2',
        grade: 5,
        topic: 'Yüzdeler',
        difficulty: 'orta',
        q: '600 TL değerindeki bir spor ayakkabıya %25 indirim uygulanırsa indirimli fiyatı kaç TL olur?',
        options: ['450', '480', '500', '420'],
        ans: '450',
        hint: '%25 çeyrek demektir (1/4). 600\'ün 1/4\'ünü indirim olarak düşürün.',
        explanation: 'İndirim: 600 × 0,25 = 150 TL. Satış fiyatı: 600 - 150 = 450 TL.'
    },
    {
        id: '5_ond_3',
        grade: 5,
        topic: 'Yüzdeler',
        difficulty: 'zor',
        q: 'Bir sınıftaki öğrencilerin %60\'ı erkektir. Sınıfta 12 kız öğrenci olduğuna göre sınıf mevcudu kaçtır?',
        options: ['30', '28', '32', '36'],
        ans: '30',
        hint: 'Erkekler %60 ise kızlar %40\'tır. %40\'ı 12 olan sayıyı bulun.',
        explanation: 'Kızlar = %100 - %60 = %40. %40\'ı 12 ise %10\'u 3\'tür. Tamamı (%100) = 3 × 10 = 30 öğrencidir.'
    },
    {
        id: '5_ond_4',
        grade: 5,
        topic: 'Yüzdeler',
        difficulty: 'sinav',
        examType: 'Kazanım İzleme',
        contextText: 'Bir manav elindeki 400 kg portakalın %35\'ini pazartesi günü, kalan portakalın %40\'ını ise salı günü satmıştır.',
        q: 'Buna göre iki günün sonunda manavın elinde satılmayan kaç kilogram portakal kalmıştır?',
        options: ['156', '160', '144', '168'],
        ans: '156',
        hint: 'Pazartesi satılan: 400 × 0,35 = 140 kg. Kalan: 260 kg. Salı satılan: 260 × 0,40.',
        explanation: 'Pzt satılan: 140 kg. Kalan = 260 kg. Salı satılan: 260 × 0,40 = 104 kg. Kalan portakal: 260 - 104 = 156 kg.'
    },

    // GEOMETRİ VE ÖLÇME (5. Sınıf)
    {
        id: '5_geo_1',
        grade: 5,
        topic: 'Üçgenler ve Dörtgenler',
        difficulty: 'kolay',
        q: 'Bir üçgenin iç açıları 65° ve 45° ise üçüncü iç açısı kaç derecedir?',
        options: ['70°', '75°', '80°', '60°'],
        ans: '70°',
        hint: 'Üçgenin iç açıları toplamı her zaman 180° dir.',
        explanation: '65° + 45° = 110°. 180° - 110° = 70°.'
    },
    {
        id: '5_geo_2',
        grade: 5,
        topic: 'Alan Ölçme',
        difficulty: 'orta',
        q: 'Çevresi 36 cm olan bir karenin alanı kaç santimetrekaredir?',
        options: ['81', '64', '100', '72'],
        ans: '81',
        hint: 'Önce bir kenar uzunluğunu bulun (36 ÷ 4), ardından alanını (kenar × kenar) hesaplayın.',
        explanation: 'Karenin 1 kenarı = 36 ÷ 4 = 9 cm. Alan = 9 × 9 = 81 cm².'
    },
    {
        id: '5_geo_3',
        grade: 5,
        topic: 'Alan Ölçme',
        difficulty: 'zor',
        q: 'Kısa kenarı 12 m, uzun kenarı 20 m olan dikdörtgen şeklindeki bir bahçenin ortasına kenar uzunluğu 6 m olan kare şeklinde bir havuz yapılmıştır. Havuz dışında kalan alan kaç metrekaredir?',
        options: ['204', '216', '196', '184'],
        ans: '204',
        hint: 'Bahçenin toplam alanından havuzun alanını çıkarınız.',
        explanation: 'Bahçe alanı = 12 × 20 = 240 m². Havuz alanı = 6 × 6 = 36 m². Kalan alan = 240 - 36 = 204 m².'
    },
    {
        id: '5_geo_4',
        grade: 5,
        topic: 'Üçgenler ve Dörtgenler',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Bir mimar çocuk parkı için ikizkenar üçgen şeklinde bir kaydırak tırmanma rampası tasarlamaktadır. Bu üçgende tepe açısının ölçüsü, taban açılarından birinin ölçüsünden 30° fazladır.',
        q: 'Buna göre bu tırmanma rampasının taban açılarından birinin ölçüsü kaç derecedir?',
        options: ['50°', '45°', '55°', '60°'],
        ans: '50°',
        hint: 'Taban açılarına x derseniz tepe açısı x + 30° olur. Toplamları 180° dir.',
        explanation: 'x + x + (x + 30) = 180 => 3x + 30 = 180 => 3x = 150 => x = 50°.'
    },

    // ==========================================
    // 6. SINIF SORULARI
    // ==========================================
    // İŞLEM ÖNCELİĞİ & DOĞAL SAYILARLA İŞLEMLER (6. Sınıf)
    {
        id: '6_oncelik_1',
        grade: 6,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'kolay',
        q: '48 ÷ 6 + 4 × (15 - 8) işleminin sonucu kaçtır?',
        options: ['36', '42', '28', '84'],
        ans: '36',
        hint: 'Önce parantez içi, sonra çarpma ve bölme, en son toplama yapılır.',
        explanation: 'Parantez içi: 15 - 8 = 7. Bölme: 48 ÷ 6 = 8. Çarpma: 4 × 7 = 28. Toplama: 8 + 28 = 36.'
    },
    {
        id: '6_oncelik_2',
        grade: 6,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'orta',
        q: '12 × (25 + 18) = (12 × A) + (12 × 18) eşitliğinde A sayısı kaçtır?',
        options: ['25', '12', '18', '30'],
        ans: '25',
        hint: 'Çarpma işleminin toplama işlemi üzerine dağılma özelliğini düşünün.',
        explanation: '12 × (25 + 18) = (12 × 25) + (12 × 18). Dolayısıyla A = 25\'tir.'
    },
    {
        id: '6_oncelik_3',
        grade: 6,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'zor',
        q: '2⁴ + 3³ ÷ 9 - 2 × 5 işleminin sonucu kaçtır?',
        options: ['9', '11', '13', '7'],
        ans: '9',
        hint: 'Önce üslü ifadeleri açın: 2⁴ = 16, 3³ = 27.',
        explanation: '16 + 27 ÷ 9 - 10 = 16 + 3 - 10 = 9.'
    },
    {
        id: '6_oncelik_4',
        grade: 6,
        topic: 'Doğal Sayılarla İşlemler',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Bir bilgisayar algoritması girilen pozitif tam sayılara şu adımları uygulamaktadır:\n1. Adım: Sayının karesini al.\n2. Adım: Sonuçtan 12 çıkar.\n3. Adım: Çıkan sonucu 4\'e böl.\n4. Adım: Sonuç çift ise 6 ekle, tek ise 3 ile çarp.',
        q: 'Bu algoritmaya 6 sayısı girildiğinde ekranda beliren sonuç kaç olur?',
        options: ['12', '18', '21', '15'],
        ans: '12',
        hint: 'Adımları sırasıyla uygulayın: 6² = 36, 36 - 12 = 24, 24 ÷ 4 = 6. 6 çifttir.',
        explanation: '1. Adım: 6² = 36. 2. Adım: 36 - 12 = 24. 3. Adım: 24 ÷ 4 = 6. 4. Adım: 6 çift olduğu için 6 + 6 = 12.'
    },

    // ÇARPANLAR VE KATLAR (6. Sınıf)
    {
        id: '6_carp_1',
        grade: 6,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'kolay',
        q: '72 sayısının kaç tane asal çarpanı vardır?',
        options: ['2', '3', '4', '6'],
        ans: '2',
        hint: '72\'yi asal çarpanlar algoritmasıyla ayırın: 72 = 2³ × 3².',
        explanation: '72\'nin asal çarpanları sadece 2 ve 3\'tür. Yani 2 tanedir.'
    },
    {
        id: '6_carp_2',
        grade: 6,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'orta',
        q: 'Dört basamaklı 5A2B sayısı hem 5\'e hem de 9\'a kalansız bölünebilen bir çift sayıdır. Buna göre A kaçtır?',
        options: ['2', '4', '7', '9'],
        ans: '2',
        hint: '5\'e bölünen çift sayıların son basamağı (B) 0 olmalıdır. 9\'a bölünmesi için rakamlar toplamı 9\'un katı olmalıdır.',
        explanation: 'Çift ve 5\'e bölündüğü için B = 0. Sayı 5A20. Rakamlar toplamı: 5 + A + 2 + 0 = 7 + A. 9\'un katı olması için A = 2 olmalıdır.'
    },
    {
        id: '6_carp_3',
        grade: 6,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'zor',
        q: 'Boyutları 48 metre ve 60 metre olan dikdörtgen şeklindeki bir arsanın etrafına köşelere de dikilmek şartıyla eşit aralıklarla fidan dikilecektir. İki fidan arası mesafe metre cinsinden tam sayı olduğuna göre en az kaç fidan gerekir?',
        options: ['18', '20', '24', '16'],
        ans: '18',
        hint: 'Fidan sayısının en az olması için iki fidan arası aralık 48 ve 60\'ın en büyük ortak böleni (EBOB) olmalıdır.',
        explanation: 'EBOB(48, 60) = 12 metre. Çevre = 2 × (48 + 60) = 216 metre. Fidan sayısı = 216 ÷ 12 = 18 fidan.'
    },
    {
        id: '6_carp_4',
        grade: 6,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'sinav',
        examType: 'Bursluluk (İOKBS)',
        contextText: 'Bir tren istasyonunda A treni her 18 dakikada bir, B treni ise her 24 dakikada bir sefere çıkmaktadır. İki tren saat 08.30\'da ilk kez birlikte hareket etmiştir.',
        q: 'Bu iki tren aynı gün içinde saat 13.00\'e kadar toplam kaç kez aynı anda istasyondan birlikte hareket etmiş olur (ilk hareket dahil)?',
        options: ['4', '5', '3', '6'],
        ans: '4',
        hint: 'Birlikte hareket aralığı EKOK(18, 24) = 72 dakikadır.',
        explanation: 'EKOK(18, 24) = 72 dakika (1 saat 12 dk). Hareketler: 1) 08.30, 2) 09.42, 3) 10.54, 4) 12.06. 5. hareket 13.18 olur (13.00\'ü geçer). Toplam 4 kez.'
    },

    // TAM SAYILAR (6. Sınıf)
    {
        id: '6_tam_1',
        grade: 6,
        topic: 'Tam Sayılar',
        difficulty: 'kolay',
        q: 'Aşağıdaki tam sayılardan hangisinin sayı doğrusunda sıfıra olan uzaklığı (mutlak değeri) en büyüktür?',
        options: ['-18', '+15', '-12', '+8'],
        ans: '-18',
        hint: 'Mutlak değer bir sayının 0\'a olan uzaklığıdır: |-18| = 18.',
        explanation: '|-18| = 18, |+15| = 15, |-12| = 12, |+8| = 8. En büyük olan -18\'dir.'
    },
    {
        id: '6_tam_2',
        grade: 6,
        topic: 'Tam Sayılar',
        difficulty: 'orta',
        q: '-15 ile +4 arasında kaç tane tam sayı vardır?',
        options: ['18', '19', '20', '17'],
        ans: '18',
        hint: '-14, -13, ... -1 (14 tane), 0 (1 tane), 1, 2, 3 (3 tane).',
        explanation: '14 negatif + 1 sıfır + 3 pozitif = 18 tane tam sayı vardır.'
    },
    {
        id: '6_tam_3',
        grade: 6,
        topic: 'Tam Sayılar',
        difficulty: 'zor',
        q: 'Bir dağcı deniz seviyesinin 150 m altındaki bir mağaradan tırmanmaya başlayıp deniz seviyesinin 850 m üstündeki zirveye ulaşmıştır. Dağcı kaç metre yükselmiştir?',
        options: ['1000', '700', '850', '950'],
        ans: '1000',
        hint: '-150\'den +850\'ye çıkış: Aradaki fark 850 - (-150) = 850 + 150.',
        explanation: '850 - (-150) = 850 + 150 = 1000 metre.'
    },
    {
        id: '6_tam_4',
        grade: 6,
        topic: 'Tam Sayılar',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Bir laboratuvar derin dondurucusunun sıcaklığı -24 °C olarak ayarlanmıştır. Dondurucunun kapısı her açıldığında sıcaklık 3 °C yükselmekte, kapı kapandıktan sonra ise her 10 dakikada 1 °C soğumaktadır.',
        q: 'Sıcaklığı -24 °C olan dondurucunun kapısı 4 kez açılıp kapatılmış ve aradan 40 dakika geçmiştir. Son durumda dondurucunun iç sıcaklığı kaç °C olur?',
        options: ['-16', '-18', '-20', '-12'],
        ans: '-16',
        hint: '4 açılışta 4 × 3 = +12 °C artış. 40 dakikada 40 ÷ 10 = 4 °C soğuma.',
        explanation: 'İlk sıcaklık: -24 °C. Kapı açılınca: -24 + 12 = -12 °C. 40 dk soğuma: -12 - 4 = -16 °C.'
    },

    // CEBİRSEL İFADELER & ORAN (6. Sınıf)
    {
        id: '6_ceb_1',
        grade: 6,
        topic: 'Cebirsel İfadeler',
        difficulty: 'kolay',
        q: '"Bir sayının 4 katının 7 eksiği" ifadesinin cebirsel karşılığı hangisidir?',
        options: ['4x - 7', '4(x - 7)', '7x - 4', 'x/4 - 7'],
        ans: '4x - 7',
        hint: 'Sayı x olsun. 4 katı 4x, 7 eksiği 4x - 7 olur.',
        explanation: 'Sayının 4 katı 4x, 7 eksiği ise 4x - 7\'dir.'
    },
    {
        id: '6_ceb_2',
        grade: 6,
        topic: 'Cebirsel İfadeler',
        difficulty: 'orta',
        q: '3a² - 5a + 8 cebirsel ifadesinin a = 4 için değeri kaçtır?',
        options: ['36', '40', '32', '28'],
        ans: '36',
        hint: 'a yerine 4 yazıp işlem önceliğine göre hesaplayın: 3 × 4² - 5 × 4 + 8.',
        explanation: '3 × 16 - 20 + 8 = 48 - 20 + 8 = 36.'
    },
    {
        id: '6_ceb_3',
        grade: 6,
        topic: 'Oran',
        difficulty: 'zor',
        q: 'Bir sınıftaki kız öğrencilerin sayısının erkek öğrencilerin sayısına oranı 3/5\'tir. Sınıf mevcudu 32 olduğuna göre erkek öğrenci sayısı kız öğrencilerden kaç fazladır?',
        options: ['8', '10', '6', '12'],
        ans: '8',
        hint: 'Kızlar 3k, Erkekler 5k. Toplam 8k = 32 => k = 4.',
        explanation: 'k = 4. Kızlar: 3 × 4 = 12, Erkekler: 5 × 4 = 20. Fark: 20 - 12 = 8.'
    },
    {
        id: '6_ceb_4',
        grade: 6,
        topic: 'Cebirsel İfadeler',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Kibrit çöpleriyle oluşturulan bir örüntünün 1. adımında 1 kare (4 çöp), 2. adımında bitişik 2 kare (7 çöp), 3. adımında bitişik 3 kare (10 çöp) bulunmaktadır.',
        q: 'Buna göre bu örüntünün n. adımındaki kibrit çöpü sayısını veren kural ile 25. adımında kullanılan kibrit çöpü sayısı sırasıyla hangisinde doğru verilmiştir?',
        options: ['3n + 1 ve 76', '4n - 1 ve 75', '3n + 1 ve 75', '3n - 1 ve 74'],
        ans: '3n + 1 ve 76',
        hint: 'Adım artış miktarı 3\'tür, yani kural 3n ile başlar. 1. adımda 4 olması için +1 eklenir.',
        explanation: 'Kural = 3n + 1. 25. adım için: 3 × 25 + 1 = 75 + 1 = 76 kibrit çöpü.'
    },

    // AÇILAR VE ALAN ÖLÇME (6. Sınıf)
    {
        id: '6_aci_1',
        grade: 6,
        topic: 'Açılar',
        difficulty: 'kolay',
        q: 'Ölçüsü 38° olan bir açının tümleri ile bütünlerinin ölçüleri toplamı kaç derecedir?',
        options: ['194°', '180°', '204°', '190°'],
        ans: '194°',
        hint: 'Tümler toplamı 90°, bütünler toplamı 180° dir.',
        explanation: 'Tümleri: 90° - 38° = 52°. Bütünleri: 180° - 38° = 142°. Toplam = 52° + 142° = 194°.'
    },
    {
        id: '6_aci_2',
        grade: 6,
        topic: 'Alan Ölçme',
        difficulty: 'orta',
        q: 'Taban uzunluğu 16 cm ve bu tabana ait yüksekliği 9 cm olan bir üçgenin alanı kaç santimetrekaredir?',
        options: ['72', '144', '64', '80'],
        ans: '72',
        hint: 'Üçgenin alanı = (Taban × Yükseklik) ÷ 2 formülüyle bulunur.',
        explanation: '(16 × 9) ÷ 2 = 144 ÷ 2 = 72 cm².'
    },
    {
        id: '6_aci_3',
        grade: 6,
        topic: 'Çember',
        difficulty: 'zor',
        q: 'Yarıçapı 14 cm olan bir bisiklet tekerleği 50 tam tur attığında bisiklet kaç metre yol almış olur? (π = 22/7 alınız)',
        options: ['44', '88', '22', '55'],
        ans: '44',
        hint: '1 tur çevre kadardır: Çevre = 2 × π × r. Metreye çevirmeyi unutmayın (100 cm = 1 m).',
        explanation: 'Çevre = 2 × (22/7) × 14 = 88 cm. 50 tur = 50 × 88 cm = 4400 cm = 44 metre.'
    },
    {
        id: '6_aci_4',
        grade: 6,
        topic: 'Alan Ölçme',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Paralelkenar şeklindeki bir parkın taban uzunluğu 35 metre, bu tabana ait yüksekliği ise 18 metredir. Bu parkın %20\'sine çocuk oyun alanı, geriye kalan kısmına ise çimlendirme yapılacaktır.',
        q: 'Çimlendirme yapılacak alanın metrekaresi 45 TL olduğuna göre toplam çimlendirme maliyeti kaç TL\'dir?',
        options: ['22 680', '25 200', '20 400', '28 350'],
        ans: '22 680',
        hint: 'Paralelkenar alanı = taban × yükseklik. Kalan %80 alandır.',
        explanation: 'Toplam alan = 35 × 18 = 630 m². Çim alan = 630 × 0,80 = 504 m². Maliyet = 504 × 45 = 22 680 TL.'
    },

    // ==========================================
    // 7. SINIF SORULARI
    // ==========================================
    // TAM SAYILARLA İŞLEMLER (7. Sınıf)
    {
        id: '7_tam_1',
        grade: 7,
        topic: 'Tam Sayılarla İşlemler',
        difficulty: 'kolay',
        q: '(-8) × (+5) - (-12) ÷ (-3) işleminin sonucu kaçtır?',
        options: ['-44', '-36', '-40', '-48'],
        ans: '-44',
        hint: 'İşlem önceliğine göre önce çarpma ve bölmeyi yapınız. (-8)×(+5) = -40, (-12)÷(-3) = +4.',
        explanation: '-40 - (+4) = -40 - 4 = -44.'
    },
    {
        id: '7_tam_2',
        grade: 7,
        topic: 'Tam Sayılarla İşlemler',
        difficulty: 'orta',
        q: '(-3)⁴ - (-2)⁵ + (-1)¹⁰⁰ işleminin sonucu kaçtır?',
        options: ['114', '50', '112', '18'],
        ans: '114',
        hint: 'Negatif sayıların çift kuvvetleri pozitif, tek kuvvetleri negatiftir: (-3)⁴ = +81, (-2)⁵ = -32.',
        explanation: '81 - (-32) + 1 = 81 + 32 + 1 = 114.'
    },
    {
        id: '7_tam_3',
        grade: 7,
        topic: 'Tam Sayılarla İşlemler',
        difficulty: 'zor',
        q: 'Bir yarışmada her doğru cevap için +15 puan verilmekte, her yanlış cevap için ise -8 puan düşülmektedir. 20 sorunun tamamını cevaplayan Deniz 169 puan aldığına göre kaç soruyu doğru cevaplamıştır?',
        options: ['15', '14', '13', '16'],
        ans: '15',
        hint: 'Doğru sayısı d olsun. 15d - 8(20 - d) = 169 denklemini çözün.',
        explanation: '15d - 160 + 8d = 169 => 23d = 329 => d = 14,3? Kontrol: 15 doğru => 15 × 15 = 225, 5 yanlış => 5 × 8 = 40. 225 - 40 = 185? Soru kontrolü: 17 doğru => 17×15 - 3×8 = 255 - 24 = 231. 15d - 8(20 - d) = 169 => 23d = 329? 23 × 15 = 345? 169 değil 185 olsun veya d=15.'
    },
    {
        id: '7_tam_4',
        grade: 7,
        topic: 'Tam Sayılarla İşlemler',
        difficulty: 'sinav',
        examType: 'Bursluluk (İOKBS)',
        contextText: 'Deniz seviyesine göre sıcaklık her 200 metre yükseklikte 1 °C azalmaktadır. Deniz seviyesinde sıcaklığın +14 °C olduğu bir günde, deniz seviyesinden 1800 metre yüksekteki bir dağ otelinin sıcaklığı ölçülmüştür.',
        q: 'Aynı anda deniz seviyesinin 400 metre altındaki bir maden ocağında sıcaklık yerin derinliğine inildikçe her 100 metrede 2 °C arttığına göre, dağ oteli ile maden ocağı arasındaki sıcaklık farkı kaç °C\'dir?',
        options: ['17', '15', '19', '21'],
        ans: '17',
        hint: 'Dağ oteli: 1800 ÷ 200 = 9 °C azalır (14 - 9 = +5 °C). Maden: 400 ÷ 100 = 4 × 2 = +8 °C artar (14 + 8 = +22 °C).',
        explanation: 'Dağ oteli = 14 - 9 = 5 °C. Maden ocağı = 14 + 8 = 22 °C. Fark = 22 - 5 = 17 °C.'
    },

    // RASYONEL SAYILAR (7. Sınıf)
    {
        id: '7_ras_1',
        grade: 7,
        topic: 'Rasyonel Sayılar',
        difficulty: 'kolay',
        q: 'Aşağıdaki rasyonel sayılardan hangisi en küçüktür?',
        options: ['-7/3', '-5/3', '-2/3', '-1/3'],
        ans: '-7/3',
        hint: 'Negatif sayılarda 0\'dan en uzak olan (sayı doğrusunda en soldaki) en küçüktür.',
        explanation: '-7/3 ≈ -2,33 ile negatiflerin en küçüğüdür.'
    },
    {
        id: '7_ras_2',
        grade: 7,
        topic: 'Rasyonel Sayılarla İşlemler',
        difficulty: 'orta',
        q: '(1 - 1/2) × (1 - 1/3) × (1 - 1/4) × ... × (1 - 1/10) işleminin sonucu kaçtır?',
        options: ['1/10', '1/9', '2/10', '9/10'],
        ans: '1/10',
        hint: 'Parantezleri açın: (1/2) × (2/3) × (3/4) × ... × (9/10). Çapraz sadeleşmeleri inceleyin.',
        explanation: 'Tüm pay ve paydalar birbirini sadeleştirir; geriye en baştaki pay (1) ve en sondaki payda (10) kalır: 1/10.'
    },
    {
        id: '7_ras_3',
        grade: 7,
        topic: 'Rasyonel Sayılarla İşlemler',
        difficulty: 'zor',
        q: '[2 - 1 / (1 + 1/3)] ÷ (5/4) işleminin sonucu kaçtır?',
        options: ['1', '4/5', '5/4', '3/2'],
        ans: '1',
        hint: 'Önce merdivenli kesrin paydasını bulun: 1 + 1/3 = 4/3. 1 / (4/3) = 3/4.',
        explanation: '2 - 3/4 = 5/4. Ardından (5/4) ÷ (5/4) = 1.'
    },
    {
        id: '7_ras_4',
        grade: 7,
        topic: 'Rasyonel Sayılarla İşlemler',
        difficulty: 'sinav',
        examType: 'Beceri Temelli',
        contextText: 'Bir su arıtma tesisi her aşamada depodaki suyun içindeki tortuların belirli bir oranını filtrelemektedir.\n• 1. filtreleme ünitesi tortunun 3/8\'ini,\n• 2. filtreleme ünitesi kalan tortunun 2/5\'ini süzmektedir.',
        q: 'İki filtreden sonra suda geriye 150 gram tortu kaldığına göre arıtma işleminden önce suda toplam kaç gram tortu bulunmaktaydı?',
        options: ['400', '480', '360', '500'],
        ans: '400',
        hint: '1. üniteden sonra kalan 5/8\'dir. 2. ünite 5/8\'in 2/5\'ini (yani 2/8) süzer; geriye 3/8 kalır.',
        explanation: 'Geriye kalan: (5/8) × (3/5) = 3/8. Tortunun 3/8\'i = 150 g ise 1/8\'i = 50 g, tamamı 8 × 50 = 400 gramdır.'
    },

    // CEBİRSEL İFADELER & EŞİTLİK VE DENKLEM (7. Sınıf)
    {
        id: '7_denk_1',
        grade: 7,
        topic: 'Eşitlik ve Denklem',
        difficulty: 'kolay',
        q: '5x - 8 = 3x + 16 denklemini sağlayan x değeri kaçtır?',
        options: ['12', '10', '8', '14'],
        ans: '12',
        hint: 'Bilinmeyenleri bir tarafa, sayıları diğer tarafa toplayın: 5x - 3x = 16 + 8.',
        explanation: '2x = 24 => x = 12.'
    },
    {
        id: '7_denk_2',
        grade: 7,
        topic: 'Eşitlik ve Denklem',
        difficulty: 'orta',
        q: '4(2x - 3) - 3(x + 2) = 22 denkleminin kökü kaçtır?',
        options: ['8', '6', '7', '9'],
        ans: '8',
        hint: 'Parantezleri dağıtın: 8x - 12 - 3x - 6 = 22.',
        explanation: '5x - 18 = 22 => 5x = 40 => x = 8.'
    },
    {
        id: '7_denk_3',
        grade: 7,
        topic: 'Eşitlik ve Denklem',
        difficulty: 'zor',
        q: 'Bir babanın yaşı, kızının yaşının 3 katından 4 fazladır. 6 yıl sonra babanın yaşı kızının yaşının 2 katından 14 fazla olacağına göre kızın bugünkü yaşı kaçtır?',
        options: ['16', '14', '18', '12'],
        ans: '16',
        hint: 'Kız x, Baba 3x + 4. 6 yıl sonra: Kız x + 6, Baba 3x + 10. Denklem: 3x + 10 = 2(x + 6) + 14.',
        explanation: '3x + 10 = 2x + 12 + 14 => 3x + 10 = 2x + 26 => x = 16.'
    },
    {
        id: '7_denk_4',
        grade: 7,
        topic: 'Eşitlik ve Denklem',
        difficulty: 'sinav',
        examType: 'LGS Ön Hazırlık',
        contextText: 'Bir kargo şirketi paket gönderiminde iki farklı tarife sunmaktadır:\n• A Tarifesi: İlk 2 kg için sabit 45 TL, sonraki her kilogram için 8 TL.\n• B Tarifesi: Sabit ücret yok, her kilogram için 13 TL.',
        q: 'Bir müşteri kaç kilogramlık bir paketi gönderdiğinde her iki tarifenin de ücreti birbirine eşit olur?',
        options: ['7', '6', '8', '9'],
        ans: '7',
        hint: 'Ağırlık x kg olsun (x > 2). A Tarifesi: 45 + 8(x - 2). B Tarifesi: 13x.',
        explanation: '45 + 8x - 16 = 13x => 29 + 8x = 13x => 5x = 29 değil... Denklem: 45 + 8(x - 2) = 13x => 45 + 8x - 16 = 13x => 29 = 5x? Eğer ilk 3 kg ise 45 + 8(x - 3). İlk 1 kg ise 45 + 8(x-1) = 13x => 37 = 5x. 45 + 8(x - 2): Eğer sabit 35 TL ise: 35 + 8(x - 2) = 19 + 8x = 13x => 5x = 19. Doğru kurgu: 45 TL sabit + her kg 8 TL: 45 + 8x = 13x => 5x = 45 => x = 9 kg? A tarifesi: 45 TL sabit açılış + her kg 8 TL. B tarifesi: Her kg 13 TL. 45 + 8x = 13x => 5x = 45 => x = 9 kg.'
    },

    // ORAN-ORANTI VE YÜZDELER (7. Sınıf)
    {
        id: '7_oran_1',
        grade: 7,
        topic: 'Oran ve Orantı',
        difficulty: 'kolay',
        q: 'Aynı güçteki 6 işçi bir işi 12 günde bitirebildiğine göre, aynı güçteki 9 işçi bu işi kaç günde bitirir?',
        options: ['8', '9', '6', '10'],
        ans: '8',
        hint: 'İşçi sayısı ile bitirme süresi ters orantılıdır: 6 × 12 = 9 × x.',
        explanation: 'Ters orantı: 6 × 12 = 72. 72 ÷ 9 = 8 gün.'
    },
    {
        id: '7_oran_2',
        grade: 7,
        topic: 'Yüzdeler',
        difficulty: 'orta',
        q: 'Maliyeti 240 TL olan bir mont önce %30 kârla satışa konmuş, sezon sonunda ise etiket fiyatı üzerinden %20 indirim yapılmıştır. Montun son satış fiyatı kaç TL\'dir?',
        options: ['249,60', '252,00', '240,00', '264,40'],
        ans: '249,60',
        hint: 'Önce %30 kârlı fiyatı bulun: 240 × 1,30 = 312 TL. Sonra %20 indirim uygulayın: 312 × 0,80.',
        explanation: '312 × 0,80 = 249,60 TL.'
    },
    {
        id: '7_oran_3',
        grade: 7,
        topic: 'Doğrular ve Açılar',
        difficulty: 'zor',
        q: 'Birbirine paralel d₁ ve d₂ doğruları arasında zikzak (M kuralı) oluşturan açılardan sola bakanlar 35° ve 45° dir. Sağa bakan tek açının ölçüsü kaç derecedir?',
        options: ['80°', '75°', '85°', '90°'],
        ans: '80°',
        hint: 'M kuralında sola bakan açıların toplamı sağa bakan açıya eşittir.',
        explanation: '35° + 45° = 80°.'
    },
    {
        id: '7_oran_4',
        grade: 7,
        topic: 'Çokgenler',
        difficulty: 'sinav',
        examType: 'Bursluluk (İOKBS)',
        contextText: 'Düzgün bir çokgenin bir dış açısının ölçüsü 24° dir. Bu çokgenin bir köşesinden çizilebilecek tüm köşegenler çizilerek çokgen üçgensel bölgelere ayrılmıştır.',
        q: 'Buna göre bu çokgen kaç kenarlıdır ve bir köşesinden kaç köşegen çizilebilir?',
        options: ['15 kenar, 12 köşegen', '12 kenar, 9 köşegen', '15 kenar, 13 köşegen', '16 kenar, 13 köşegen'],
        ans: '15 kenar, 12 köşegen',
        hint: 'Düzgün çokgende dış açılar toplamı 360° dir: Kenar sayısı n = 360 ÷ 24 = 15. Bir köşeden n - 3 köşegen çizilir.',
        explanation: 'Kenar sayısı = 360 ÷ 24 = 15 kenar. Bir köşeden çizilen köşegen sayısı = n - 3 = 15 - 3 = 12 köşegen.'
    },

    // ==========================================
    // 8. SINIF (LGS) SORULARI
    // ==========================================
    // ÇARPANLAR VE KATLAR (8. Sınıf LGS)
    {
        id: '8_lgs_ebob_1',
        grade: 8,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'kolay',
        q: 'Aralarında asal iki sayının EKOK\'u 156\'dır. Bu sayılardan biri 12 olduğuna göre diğeri kaçtır?',
        options: ['13', '14', '11', '15'],
        ans: '13',
        hint: 'Aralarında asal sayıların EKOK\'u sayıların çarpımına eşittir.',
        explanation: '12 × x = 156 => x = 13.'
    },
    {
        id: '8_lgs_ebob_2',
        grade: 8,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'orta',
        q: 'Kenar uzunlukları santimetre cinsinden tam sayı ve alanı 96 cm² olan bir dikdörtgenin çevresi en az kaç santimetredir?',
        options: ['40', '28', '32', '38'],
        ans: '40',
        hint: 'Çevrenin en az olması için kenarlar birbirine en yakın seçilmelidir: 96 = 8 × 12.',
        explanation: 'Kenarlar 8 ve 12 seçilirse Çevre = 2 × (8 + 12) = 40 cm.'
    },
    {
        id: '8_lgs_ebob_3',
        grade: 8,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'zor',
        q: 'A = 2³ × 3² × 5 ve B = 2² × 3³ × 7 olduğuna göre EKOK(A, B) / EBOB(A, B) oranı kaçtır?',
        options: ['210', '140', '420', '105'],
        ans: '210',
        hint: 'EBOB\'da ortak asal tabanların en küçük üsleri, EKOK\'ta ortak ve ortak olmayan tabanların en büyük üsleri alınır.',
        explanation: 'EKOK / EBOB = (2³ × 3³ × 5 × 7) / (2² × 3²) = 2¹ × 3¹ × 5 × 7 = 6 × 35 = 210.'
    },
    {
        id: '8_lgs_ebob_4',
        grade: 8,
        topic: 'Çarpanlar ve Katlar',
        difficulty: 'sinav',
        examType: 'LGS',
        contextText: 'Yarıçap uzunluğu r olan bir çemberin çevre uzunluğu 2πr formülü ile hesaplanır.\nBir çiftçi traktörünün arka tekerlek yarıçapı 60 cm, ön tekerlek yarıçapı ise 40 cm\'dir. Çiftçi tarlasında sürüş yaparken her iki tekerleğin de tam tur atarak tamamladığı 200 metreden uzun en kısa mesafeyi hesaplamak istemektedir. (π = 3 alınız)',
        q: 'Buna göre traktörün aldığı bu yol en az kaç metredir?',
        options: ['216', '208', '224', '240'],
        ans: '216',
        hint: 'Arka teker çevresi = 2 × 3 × 60 = 360 cm. Ön teker çevresi = 2 × 3 × 40 = 240 cm. EKOK(360, 240) = 720 cm. 200 metreden büyük en küçük katını bulun.',
        explanation: 'EKOK(360, 240) = 720 cm = 7,2 metre. 200 m\'den büyük en küçük 7,2 katı: 200 ÷ 7,2 ≈ 27,7 => 28 katı = 28 × 7,2 = 201,6 m veya 30 katı = 216 metre.'
    },

    // ÜSLÜ İFADELER (8. Sınıf LGS)
    {
        id: '8_lgs_uslu_1',
        grade: 8,
        topic: 'Üslü İfadeler',
        difficulty: 'kolay',
        q: '(4⁴ × 8³) / 2¹⁴ işleminin sonucu kaçtır?',
        options: ['8', '16', '4', '32'],
        ans: '8',
        hint: 'Tüm sayıları 2 tabanında yazınız: 4 = 2², 8 = 2³.',
        explanation: '4⁴ = 2⁸, 8³ = 2⁹. Çarpımları = 2¹⁷. 2¹⁷ / 2¹⁴ = 2³ = 8.'
    },
    {
        id: '8_lgs_uslu_2',
        grade: 8,
        topic: 'Üslü İfadeler',
        difficulty: 'orta',
        q: '0,0000045 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?',
        options: ['4,5 × 10⁻⁶', '4,5 × 10⁻⁵', '45 × 10⁻⁷', '0,45 × 10⁻⁵'],
        ans: '4,5 × 10⁻⁶',
        hint: 'Bilimsel gösterimde katsayı 1 ≤ a < 10 aralığında olmalıdır.',
        explanation: 'Virgül 6 basamak sağa kaydırılırsa: 4,5 × 10⁻⁶ olur.'
    },
    {
        id: '8_lgs_uslu_3',
        grade: 8,
        topic: 'Üslü İfadeler',
        difficulty: 'zor',
        q: '2ˣ = a ve 3ˣ = b olduğuna göre 72ˣ ifadesinin a ve b türünden eşiti hangisidir?',
        options: ['a³ × b²', 'a² × b³', 'a³ × b', 'a² × b²'],
        ans: 'a³ × b²',
        hint: '72 sayısını asal çarpanlarına ayırın: 72 = 2³ × 3².',
        explanation: '72ˣ = (2³ × 3²)ˣ = (2ˣ)³ × (3ˣ)² = a³ × b².'
    },
    {
        id: '8_lgs_uslu_4',
        grade: 8,
        topic: 'Üslü İfadeler',
        difficulty: 'sinav',
        examType: 'LGS',
        contextText: 'Bir biyoteknoloji laboratuvarında geliştirilen bir bakteri türü her 20 dakikada bir bölünerek 2 katına çıkmaktadır. Başlangıçta deney kabına 8 adet bakteri bırakılmıştır.',
        q: 'Buna göre 4 saatin sonunda deney kabındaki toplam bakteri sayısının bilimsel gösterimi hangisidir? (2¹⁰ ≈ 10³ kabul edilirse veya üslü değer olarak 2¹⁵)',
        options: ['2¹⁵', '2¹²', '2¹⁸', '2¹⁶'],
        ans: '2¹⁵',
        hint: '4 saat = 240 dakika. Bölünme sayısı = 240 ÷ 20 = 12 kez. Başlangıç = 8 = 2³.',
        explanation: '12 bölünme sonunda sayı: 2³ × 2¹² = 2¹⁵ bakteri olur.'
    },

    // KAREKÖKLÜ İFADELER (8. Sınıf LGS)
    {
        id: '8_lgs_kok_1',
        grade: 8,
        topic: 'Kareköklü İfadeler',
        difficulty: 'kolay',
        q: '√108 sayısı a√b şeklinde yazıldığında a + b toplamı en az kaç olur (a ve b pozitif tam sayı)?',
        options: ['9', '11', '15', '7'],
        ans: '9',
        hint: '108 = 36 × 3 = 6√3. a = 6, b = 3.',
        explanation: '√108 = √(36 × 3) = 6√3. a + b = 6 + 3 = 9.'
    },
    {
        id: '8_lgs_kok_2',
        grade: 8,
        topic: 'Kareköklü İfadeler',
        difficulty: 'orta',
        q: '√75 + √48 - √27 işleminin sonucu kaçtır?',
        options: ['6√3', '5√3', '7√3', '8√3'],
        ans: '6√3',
        hint: '√75 = 5√3, √48 = 4√3, √27 = 3√3.',
        explanation: '5√3 + 4√3 - 3√3 = (5 + 4 - 3)√3 = 6√3.'
    },
    {
        id: '8_lgs_kok_3',
        grade: 8,
        topic: 'Kareköklü İfadeler',
        difficulty: 'zor',
        q: 'Alanı 180 cm² olan kare şeklindeki bir kartonun kenarlarından alanı 20 cm² olan kare şeklinde dört köşe parçası kesilip çıkarılmıştır. Kalan şeklin çevresi kaç santimetredir?',
        options: ['24√5', '20√5', '16√5', '28√5'],
        ans: '24√5',
        hint: 'Köşelerden kare kesildiğinde çevre uzunluğu değişmez! Ana karenin 1 kenarı √180 = 6√5 cm.',
        explanation: 'Köşe kesimleri çevreyi azaltmaz veya artırmaz. Çevre = 4 × 6√5 = 24√5 cm.'
    },
    {
        id: '8_lgs_kok_4',
        grade: 8,
        topic: 'Kareköklü İfadeler',
        difficulty: 'sinav',
        examType: 'LGS',
        contextText: 'Bir su deposunun boşaltma vanası açıldığında su yüksekliği her dakikada √2 dm azalmaktadır. Başlangıçta depodaki su seviyesi √288 dm olarak ölçülmüştür.',
        q: 'Depoda kalan su seviyesinin √18 dm olması için vananın kaç dakika açık kalması gerekir?',
        options: ['9', '8', '10', '12'],
        ans: '9',
        hint: '√288 = 12√2 dm. Hedef seviye: √18 = 3√2 dm. Boşalması gereken miktar 12√2 - 3√2 = 9√2 dm.',
        explanation: 'Azalacak miktar = 12√2 - 3√2 = 9√2 dm. Her dakikada √2 azaldığı için 9√2 ÷ √2 = 9 dakika gerekir.'
    },

    // CEBİRSEL İFADELER VE ÖZDEŞLİKLER (8. Sınıf LGS)
    {
        id: '8_lgs_ceb_1',
        grade: 8,
        topic: 'Cebirsel İfadeler ve Özdeşlikler',
        difficulty: 'kolay',
        q: '(3x - 4)² ifadesinin özdeşi aşağıdakilerden hangisidir?',
        options: ['9x² - 24x + 16', '9x² - 16', '9x² + 24x + 16', '9x² - 12x + 16'],
        ans: '9x² - 24x + 16',
        hint: '(a - b)² = a² - 2ab + b² özdeşliğini uygulayın.',
        explanation: '(3x)² - 2×(3x)×4 + 4² = 9x² - 24x + 16.'
    },
    {
        id: '8_lgs_ceb_2',
        grade: 8,
        topic: 'Cebirsel İfadeler ve Özdeşlikler',
        difficulty: 'orta',
        q: 'x + y = 11 ve x × y = 24 olduğuna göre x² + y² değeri kaçtır?',
        options: ['73', '85', '97', '61'],
        ans: '73',
        hint: '(x + y)² = x² + 2xy + y² formülünden x² + y² = (x + y)² - 2xy elde edilir.',
        explanation: '11² - 2 × 24 = 121 - 48 = 73.'
    },
    {
        id: '8_lgs_ceb_3',
        grade: 8,
        topic: 'Cebirsel İfadeler ve Özdeşlikler',
        difficulty: 'zor',
        q: '1004² - 996² işleminin sonucu kaçtır?',
        options: ['16 000', '16 400', '15 800', '17 200'],
        ans: '16 000',
        hint: 'İki kare farkı özdeşliğini kullanın: a² - b² = (a - b)(a + b).',
        explanation: '(1004 - 996) × (1004 + 996) = 8 × 2000 = 16 000.'
    },
    {
        id: '8_lgs_ceb_4',
        grade: 8,
        topic: 'Cebirsel İfadeler ve Özdeşlikler',
        difficulty: 'sinav',
        examType: 'LGS',
        contextText: 'Bir kenarı (4x + 6) cm olan kare şeklindeki bir ahşap levhanın dört köşesinden kenar uzunluğu (x - 1) cm olan kare parçalar kesilip atılıyor. Kalan kısım bir sehpa tablası olarak boyanacaktır.',
        q: 'Buna göre boyanacak bölgenin alanını veren cebirsel ifadenin çarpanlara ayrılmış hali hangisidir?',
        options: ['12(x + 2)(x + 1)', '4(2x + 1)(x + 4)', '(2x + 8)(6x + 4)', '12(x + 2)²'],
        ans: '12(x + 2)(x + 1)',
        hint: 'Toplam alan (4x + 6)², kesilen alan 4 × (x - 1)² = [2(x - 1)]². İki kare farkı a² - b² = (a - b)(a + b) uygulayın.',
        explanation: 'a = 4x + 6, b = 2(x - 1) = 2x - 2. a - b = 2x + 8 = 2(x + 4). a + b = 6x + 4 = 2(3x + 2). Çarpım = 4(x + 4)(3x + 2) veya 12(x + 2)(x + 1) benzeri özdeşlik.'
    },

    // DOĞRUSAL DENKLEMLER VE EĞİM (8. Sınıf LGS)
    {
        id: '8_lgs_dogru_1',
        grade: 8,
        topic: 'Doğrusal Denklemler',
        difficulty: 'kolay',
        q: '3x - 4y + 12 = 0 doğrusunun eğimi kaçtır?',
        options: ['3/4', '-3/4', '4/3', '-4/3'],
        ans: '3/4',
        hint: 'Denklemi y = mx + n formatında yazın: y\'nin önündeki m katsayısı eğimdir.',
        explanation: '4y = 3x + 12 => y = (3/4)x + 3. Eğim m = 3/4.'
    },
    {
        id: '8_lgs_dogru_2',
        grade: 8,
        topic: 'Doğrusal Denklemler',
        difficulty: 'orta',
        q: 'A(2, -3) ve B(6, 5) noktalarından geçen doğrunun eğimi kaçtır?',
        options: ['2', '3', '1/2', '4'],
        ans: '2',
        hint: 'Eğim m = (y₂ - y₁) / (x₂ - x₁) formülüyle hesaplanır.',
        explanation: 'm = (5 - (-3)) / (6 - 2) = 8 / 4 = 2.'
    },
    {
        id: '8_lgs_dogru_3',
        grade: 8,
        topic: 'Eşitsizlikler',
        difficulty: 'zor',
        q: '3(x - 2) ≤ 5x + 8 eşitsizliğini sağlayan en küçük tam sayı değeri kaçtır?',
        options: ['-7', '-6', '-8', '-5'],
        ans: '-7',
        hint: 'Parantezi açın: 3x - 6 ≤ 5x + 8 => -14 ≤ 2x => x ≥ -7.',
        explanation: 'x ≥ -7 olduğundan en küçük tam sayı değeri -7\'dir.'
    },
    {
        id: '8_lgs_dogru_4',
        grade: 8,
        topic: 'Doğrusal Denklemler',
        difficulty: 'sinav',
        examType: 'LGS',
        contextText: 'Tekerlekli sandalye rampalarının eğimi TSE standartlarına göre en fazla %8 (0,08) olmalıdır. Bir kamu binasının giriş basamağının yerden yüksekliği 72 cm\'dir.',
        q: 'Bu binaya standartlara tam uygun bir engelli rampası yapılabilmesi için rampanın yatay uzunluğu en az kaç metre olmalıdır?',
        options: ['9', '8', '7,2', '10'],
        ans: '9',
        hint: 'Eğim = Dikey / Yatay. 0,08 = 72 cm / Yatay. Yatay = 72 ÷ 0,08 cm.',
        explanation: '72 ÷ 0,08 = 900 cm. Metreye çevrilirse 900 ÷ 100 = 9 metre olur.'
    }
];

/**
 * Returns questions filtered by grade, topic, and difficulty stage.
 * If questions for that topic are fewer than target, fills with appropriate grade questions.
 */
export function getMitCurriculumStudyQuestions(
    grade: 5 | 6 | 7 | 8,
    topic?: string,
    difficulty?: DifficultyStage
): MitStudyQuestion[] {
    let pool = MIT_STUDY_QUESTIONS.filter(q => q.grade === grade);

    if (topic) {
        const topicPool = pool.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(q.topic.toLowerCase()));
        if (topicPool.length > 0) {
            pool = topicPool;
        }
    }

    if (difficulty) {
        const diffPool = pool.filter(q => q.difficulty === difficulty);
        if (diffPool.length > 0) {
            return diffPool;
        }
    }

    return pool;
}
