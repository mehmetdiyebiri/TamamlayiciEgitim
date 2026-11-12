import { SozelMantikItem } from './sozelMantikTypes';

export const ATOLYE_4_QUESTIONS: SozelMantikItem[] = [
  {
    id: 4001,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 1,
    title: 'Koşu Yarışı',
    category: 'Sıralama – İsim – Süre',
    context: 'Arda, Berk, Can, Deniz ve Elif isimli beş arkadaşın katıldığı koşu yarışındaki sıralamalar belirlenecektir.',
    premises: [
      'Yarışta beraberlik yoktur (herkes farklı sırada bitirmiştir).',
      'Can, yarışı Deniz’den hemen sonra, Arda’dan ise hemen önce bitirmiştir.',
      'Berk, yarışı sonuncu sırada bitirmemiştir.',
      'Elif, yarışı Arda’dan sonraki bir sırada tamamlamıştır.'
    ],
    questionStem: 'Yarışın galibi (1. olan) ve sonuncusu (5. olan) kimdir?',
    options: [
      { letter: 'A', text: 'Galip: Deniz, Sonuncu: Elif', isCorrect: true },
      { letter: 'B', text: 'Galip: Arda, Sonuncu: Berk', isCorrect: false },
      { letter: 'C', text: 'Galip: Can, Sonuncu: Elif', isCorrect: false },
      { letter: 'D', text: 'Galip: Deniz, Sonuncu: Berk', isCorrect: false }
    ],
    resultText: 'Yarışın galibi Deniz, sonuncusu ise Elif’tir. Sıralama: 1: Deniz, 2: Can, 3: Arda, 4: Berk, 5: Elif.',
    matrix: {
      title: 'Yarış Sıralama Matrisi',
      headers: ['Sıra', 'İsim', 'Analiz'],
      rows: [
        ['1.', 'Deniz', 'Blok başında olduğu için tek aday'],
        ['2.', 'Can', 'Deniz’in hemen arkasında'],
        ['3.', 'Arda', 'Can’ın hemen arkasında'],
        ['4.', 'Berk', 'Sonuncu değil kuralı gereği buradadır'],
        ['5.', 'Elif', 'Arda’dan sonra kalan tek yer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Can Deniz'den hemen sonra, Arda'dan hemen önce' [Deniz - Can - Arda] üçlü bloğunu verir." },
      { step: 2, title: 'Bloğu Yerleştir', content: "Elif Arda'dan sonra geleceği için Arda 5. olamaz. Üçlü blok mecburen 1-2-3'e yerleşir." },
      { step: 3, title: 'Berk ve Elif Konumlandırma', content: 'Berk sonuncu olamaz kuralı gereği 4. olur, 5. ise Elif’e kalır.' },
      { step: 4, title: 'Sonuç', content: 'Galip Deniz, sonuncu Elif’tir.' }
    ],
    neuralBrake: "'Sonraki bir sırada' ile 'hemen sonra' ifadelerini karıştırma. 'Sonraki' araya başkalarının girebileceğini söyler.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'D-C-A üçlü bloğunu tek parça hareket ettir.'
  },
  {
    id: 4002,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 2,
    title: 'Kütüphane Rafları',
    category: 'Raf No – Tür – Yazar',
    context: '1’den 5’e kadar numaralandırılmış raflara Roman, Şiir, Tarih, Biyografi ve Bilim kitapları dizilmiştir (1 en alt, 5 en üst).',
    premises: [
      'Roman, en üst raftadır.',
      'Şiir kitabı ile Tarih kitabı arasında tam iki raf bulunmaktadır.',
      'Biyografi kitabı, Şiir kitabının hemen altındaki raftadır.',
      'Bilim kitabı, Tarih kitabından daha üstteki bir raftadır.'
    ],
    questionStem: 'Buna göre 2. ve 4. raflarda hangi türdeki kitaplar bulunmaktadır?',
    options: [
      { letter: 'A', text: '2. raf: Biyografi, 4. raf: Bilim', isCorrect: true },
      { letter: 'B', text: '2. raf: Tarih, 4. raf: Şiir', isCorrect: false },
      { letter: 'C', text: '2. raf: Bilim, 4. raf: Biyografi', isCorrect: false },
      { letter: 'D', text: '2. raf: Şiir, 4. raf: Tarih', isCorrect: false }
    ],
    resultText: '2. rafta Biyografi, 4. rafta ise Bilim kitabı bulunmaktadır. 5: Roman, 4: Bilim, 3: Şiir, 2: Biyografi, 1: Tarih.',
    matrix: {
      title: 'Dikey Raf Sıralama Matrisi',
      headers: ['Raf No', 'Kitap Türü', 'Analiz'],
      rows: [
        ['5', 'Roman', 'Kesin Bilgi (En Üst)'],
        ['4', 'Bilim', 'Tarih’ten üstte kalan tek boş raf'],
        ['3', 'Şiir', 'Aralık kuralına göre mecburen burada'],
        ['2', 'Biyografi', 'Şiir’in hemen altı'],
        ['1', 'Tarih', 'Şiir ile arasında 2 raf kuralı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyle Çatıyı Kur', content: 'Roman 5. raftadır.' },
      { step: 2, title: 'Aralık ve Blok Analizi', content: 'Şiir ile Tarih arasında 2 raf vardır ve Biyografi Şiir’in hemen altındadır.' },
      { step: 3, title: 'Yerleştirme', content: 'Şiir 3, Biyografi 2, Tarih 1 olur. 3 ile 1 arasında 2. raf ve boşluk dengesi kurulur.' },
      { step: 4, title: 'Boşluğu Doldur', content: 'Geriye kalan 4. rafa Bilim kitabı yerleşir.' }
    ],
    neuralBrake: "'Arasında X tane vardır' dendiğinde nesnelerin kendilerini dahil etme. 1 ile 4 arasında iki raf (2 ve 3) vardır.",
    cognitiveTime: '45 saniye',
    synapticCoding: 'Roman = 5 çiviledikten sonra aralıklı blokları test et.'
  },
  {
    id: 4003,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 3,
    title: 'Sinema Kuyruğu',
    category: 'Sıra – İsim – Bilet',
    context: 'Arda, Berk, Can, Deniz ve Elif sinema gişesinde bilet almak için kuyrukta beklemektedir.',
    premises: [
      'Kuyruğun tam ortasında bulunan kişi 2 bilet alacaktır.',
      'Deniz, kuyrukta Berk’in hemen önünde, Can’ın ise hemen arkasındadır.',
      'Arda, biletini Elif’ten daha önce alacaktır.',
      'Can, kuyruğun en başında değildir.'
    ],
    questionStem: 'Kuyrukta 2. sırada kim vardır ve 3. sıradaki kişi kaç bilet alacaktır?',
    options: [
      { letter: 'A', text: '2. sırada Can vardır; 3. sıradaki kişi (Deniz) 2 bilet alacaktır.', isCorrect: true },
      { letter: 'B', text: '2. sırada Deniz vardır; 3. sıradaki kişi 1 bilet alacaktır.', isCorrect: false },
      { letter: 'C', text: '2. sırada Arda vardır; 3. sıradaki kişi 2 bilet alacaktır.', isCorrect: false },
      { letter: 'D', text: '2. sırada Berk vardır; 3. sıradaki kişi 3 bilet alacaktır.', isCorrect: false }
    ],
    resultText: 'Kuyrukta 2. sırada Can vardır ve 3. sıradaki kişi (Deniz) 2 bilet alacaktır. Sıralama: 1: Arda, 2: Can, 3: Deniz (2 bilet), 4: Berk, 5: Elif.',
    matrix: {
      title: 'Kuyruk Sıralama Matrisi',
      headers: ['Sıra No', 'İsim', 'Bilet Sayısı', 'Analiz'],
      rows: [
        ['1.', 'Arda', '-', 'Can başta değilse tek aday'],
        ['2.', 'Can', '-', 'Blok başlangıcı'],
        ['3.', 'Deniz', '2 Bilet', 'Kuyruğun tam ortası (Kesin Bilgi)'],
        ['4.', 'Berk', '-', 'Deniz’in hemen arkası'],
        ['5.', 'Elif', '-', 'Arda’dan sonra kalan son yer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Merkez Veriyi Sabitle', content: '5 kişilik grupta tam orta 3. sıradır; 2 bilet alır.' },
      { step: 2, title: 'Blok Oluşturma', content: "'Deniz Berk'in önünde, Can'ın arkasındadır' [Can - Deniz - Berk] bloğunu verir." },
      { step: 3, title: 'Blok Yerleştirme', content: "Can 1. sıra olamaz kuralıyla blok mecburen 2-3-4 olur." },
      { step: 4, title: 'Son Yerleşim', content: "Arda Elif'ten önce bilet alacağına göre 1. sıra Arda, 5. sıra Elif olur." }
    ],
    neuralBrake: "'Önünde' olmak gişeye daha yakın olmak (daha küçük numara) demektir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Tam orta = 3. sıra çivilemesini yap.'
  },
  {
    id: 4004,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 4,
    title: 'Apartman Katları ve Hayvanlar',
    category: 'Kat No – İsim – Evcil Hayvan',
    context: '5 katlı apartmanda Arda, Burcu, Cenk, Deniz ve Elif oturmaktadır. Kedi, Köpek ve Kuş beslenmektedir.',
    premises: [
      'Burcu, 2. katta oturmaktadır ve evcil hayvanı yoktur.',
      'Cenk, apartmanın en üst katında oturmaktadır.',
      'Deniz, Arda’nın hemen üstündeki katta oturmaktadır.',
      'Kuş besleyen kişi, Kedi besleyen kişinin hemen altındaki katta oturmaktadır.',
      'Köpek besleyen kişi Cenk değildir, 1. katta oturanın evcil hayvanı yoktur.',
      'Elif’in bir Kedisi vardır.'
    ],
    questionStem: 'Buna göre 4. katta kim oturmaktadır ve hangi evcil hayvanı beslemektedir?',
    options: [
      { letter: 'A', text: 'Elif - Kedi', isCorrect: true },
      { letter: 'B', text: 'Deniz - Kuş', isCorrect: false },
      { letter: 'C', text: 'Arda - Köpek', isCorrect: false },
      { letter: 'D', text: 'Burcu - Hayvanı yok', isCorrect: false }
    ],
    resultText: '4. katta Elif oturmaktadır ve Kedi beslemektedir. 5: Cenk, 4: Elif (Kedi), 3: Deniz (Kuş), 2: Burcu, 1: Arda.',
    matrix: {
      title: 'Bina Sakinleri ve Hayvan Matrisi',
      headers: ['Kat No', 'İsim', 'Evcil Hayvan', 'Analiz'],
      rows: [
        ['5', 'Cenk', 'Yok / Belirsiz', 'En üst kat (Kesin Bilgi)'],
        ['4', 'Elif', 'Kedi', '3’te Kuş varsa mecburen buradadır'],
        ['3', 'Deniz', 'Kuş', 'Arda’nın üstü ve Kedi’nin altı'],
        ['2', 'Burcu', 'Yok', 'Kesin Bilgi'],
        ['1', 'Arda', 'Yok', 'Deniz’in altı ve 1. kat kuralı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Verileri Yerleştir', content: 'Cenk 5, Burcu 2. 1. kat ve Burcu evcil hayvansız.' },
      { step: 2, title: 'İsim Blokları', content: "'Deniz Arda'nın hemen üstünde' [Arda 1, Deniz 3] şeklinde oturur (2 dolu olduğu için)." },
      { step: 3, title: 'Elif ve Kedi', content: 'Geriye 4. kat ve Elif kalır. Elif Kedi besler.' },
      { step: 4, title: 'Hayvan Yerleşimi', content: "Kuş Kedi'nin hemen altındaysa 3. kattaki Deniz Kuş besler." }
    ],
    neuralBrake: "Hemen üstünde/altında atlama yapmaman gerektiğini hatırlatır.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Kat numaralarını dikey yaz.'
  },
  {
    id: 4005,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 5,
    title: 'Haftalık Nöbet Çizelgesi',
    category: 'Gün – İsim – Branş',
    context: 'Ali, Burcu, Can, Deniz ve Elif; Pazartesi’den Cuma’ya hafta içi her gün birer doktor olarak nöbet tutacaktır.',
    premises: [
      'Burcu, Ali’den hemen önceki gün nöbet tutacaktır.',
      'Can, nöbetini haftanın tam ortasında (Çarşamba) tutacaktır.',
      'Deniz, Can’dan sonraki bir gün nöbet tutacaktır ancak bu gün Cuma değildir.',
      'Elif, nöbetini Deniz’den daha önceki bir gün tutacaktır.'
    ],
    questionStem: 'Perşembe günü kim nöbet tutmaktadır ve Ali hangi gün nöbetçidir?',
    options: [
      { letter: 'A', text: 'Perşembe: Deniz, Ali: Salı', isCorrect: true },
      { letter: 'B', text: 'Perşembe: Can, Ali: Pazartesi', isCorrect: false },
      { letter: 'C', text: 'Perşembe: Elif, Ali: Çarşamba', isCorrect: false },
      { letter: 'D', text: 'Perşembe: Burcu, Ali: Cuma', isCorrect: false }
    ],
    resultText: 'Perşembe günü Deniz nöbet tutmaktadır; Ali ise Salı günü nöbetçidir.',
    matrix: {
      title: 'Nöbet Günleri Matrisi',
      headers: ['Günler', 'Doktor İsmi', 'Analiz'],
      rows: [
        ['Pazartesi', 'Burcu', 'Ali ile olan blok buraya sığar'],
        ['Salı', 'Ali', 'Burcu’dan hemen sonraki gün'],
        ['Çarşamba', 'Can', 'Haftanın ortası (Kesin Bilgi)'],
        ['Perşembe', 'Deniz', 'Can’dan sonra ve Cuma değilse tek gün'],
        ['Cuma', 'Elif', 'Geriye kalan son gün']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Veriyi Yerleştir', content: 'Can Çarşamba günüdür.' },
      { step: 2, title: 'Blok Analizi', content: "'Burcu Ali'den hemen önce' [Burcu -> Ali] Pazartesi-Salı'ya yerleşir." },
      { step: 3, title: 'Deniz’i Konumlandır', content: 'Deniz Çarşamba’dan sonra ve Cuma değilse mecburen Perşembe’dir.' },
      { step: 4, title: 'Sonuç', content: 'Perşembe Deniz, Ali Salı günüdür.' }
    ],
    neuralBrake: "'Haftanın tam ortası' 5 günlük düzende her zaman 3. gündür (Çarşamba).",
    cognitiveTime: '25 saniye',
    synapticCoding: 'Günleri kısaltarak Pzt, Sal, Çar, Per, Cum yaz.'
  },
  {
    id: 4006,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 6,
    title: 'Mağaza Ödeme Sırası',
    category: 'Müşteri – Ürün – Sıra',
    context: 'Arda, Berk, Can, Deniz ve Elif; Gömlek, Pantolon, Ceket, Ayakkabı ve Kemer satın almak için sıraya girmiştir (1-5).',
    premises: [
      'Her müşteri sadece bir ürün almıştır.',
      'Can, sıranın en sonundadır ve Ayakkabı satın almıştır.',
      'Arda, Deniz’den hemen sonra, Berk’ten ise hemen önce ödeme yapacaktır.',
      'Gömlek alan kişi, Pantolon alan kişiden hemen önceki sırada ödeme yapacaktır.',
      'Elif, Ceket satın almıştır ve 1. sırada değildir.',
      'Pantolon, 3. sırada ödeme yapan kişi tarafından satın alınmıştır.'
    ],
    questionStem: 'Buna göre 2. sırada kim vardır ve ne satın almıştır?',
    options: [
      { letter: 'A', text: 'Arda - Gömlek', isCorrect: true },
      { letter: 'B', text: 'Deniz - Kemer', isCorrect: false },
      { letter: 'C', text: 'Berk - Pantolon', isCorrect: false },
      { letter: 'D', text: 'Elif - Ceket', isCorrect: false }
    ],
    resultText: '2. sırada Arda vardır ve Gömlek satın almıştır. Sıra: 1: Deniz (Kemer), 2: Arda (Gömlek), 3: Berk (Pantolon), 4: Elif (Ceket), 5: Can (Ayakkabı).',
    matrix: {
      title: 'Ödeme Sırası ve Ürün Matrisi',
      headers: ['Sıra No', 'Müşteri', 'Ürün', 'Analiz'],
      rows: [
        ['1.', 'Deniz', 'Kemer', '3’lü bloğun başı'],
        ['2.', 'Arda', 'Gömlek', 'Deniz’den sonra, Pantolon’dan önce'],
        ['3.', 'Berk', 'Pantolon', 'Kesin Bilgi: 3. sırada Pantolon'],
        ['4.', 'Elif', 'Ceket', 'Elif Ceket aldı ve 1. değil'],
        ['5.', 'Can', 'Ayakkabı', 'Kesin Bilgi: En sonda Ayakkabı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Veriler', content: '5. sıra Can (Ayakkabı), 3. sıra Pantolon, 2. sıra Gömlek (Gömlek Pantolon’dan hemen önce).' },
      { step: 2, title: 'Blok Analizi', content: "'Arda Deniz'den sonra, Berk'ten önce' [Deniz -> Arda -> Berk] bloğu 1-2-3'e oturur." },
      { step: 3, title: 'Yerleştirme', content: 'Deniz 1, Arda 2, Berk 3 olur. Elif 4. sıraya kalır ve Ceket alır.' },
      { step: 4, title: 'Sonuç', content: '2. sırada Arda vardır ve Gömlek almıştır.' }
    ],
    neuralBrake: "'X, Y'den hemen sonradır' ifadesi matematiksel olarak X = Y + 1 demektir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Önce ürünleri yerleştir, sonra kişileri oturt.'
  },
  {
    id: 4007,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 7,
    title: 'Yemek Yarışması',
    category: 'Aşçı – Yemek – Puan',
    context: 'Arda, Burcu, Cem, Deniz ve Ebru’nun yaptığı Karnıyarık, Mantı, İçli Köfte, Sarma ve Hünkar Beğendi 1’den 5’e sırayla tadılmıştır.',
    premises: [
      'Her aşçı bir yemek yapmış ve her yemek farklı sırada tadılmıştır.',
      'Hünkar Beğendi, İçli Köfte’den hemen sonra, Mantı’dan ise hemen önce tadılmıştır.',
      'Burcu’nun yemeği 2. sırada tadılmıştır.',
      'Cem, yemeğini Arda’dan hemen önce, Deniz’den ise hemen sonra sunmuştur.',
      'Sarma, en son sırada tadılan yemektir ve bu yemeği Ebru yapmamıştır.'
    ],
    questionStem: 'Buna göre 4. sırada hangi yemek tadılmıştır ve bu yemeği kim yapmıştır?',
    options: [
      { letter: 'A', text: 'Karnıyarık - Cem', isCorrect: true },
      { letter: 'B', text: 'Mantı - Burcu', isCorrect: false },
      { letter: 'C', text: 'İçli Köfte - Deniz', isCorrect: false },
      { letter: 'D', text: 'Sarma - Arda', isCorrect: false }
    ],
    resultText: '4. sırada Karnıyarık tadılmıştır ve bu yemeği Cem yapmıştır. Tadım Sırası: 1: İçli Köfte (Ebru), 2: Hünkar Beğendi (Burcu), 3: Mantı (Deniz), 4: Karnıyarık (Cem), 5: Sarma (Arda).',
    matrix: {
      title: 'Yemek Tadım Bandı Matrisi',
      headers: ['Sıra No', 'Aşçı İsmi', 'Sunulan Yemek', 'Analiz'],
      rows: [
        ['1.', 'Ebru', 'İçli Köfte', 'Hünkar Beğendi öncesi'],
        ['2.', 'Burcu', 'Hünkar Beğendi', 'Kesin Bilgi: 2. sıra Burcu'],
        ['3.', 'Deniz', 'Mantı', 'Hünkar Beğendi sonrası'],
        ['4.', 'Cem', 'Karnıyarık', 'Kalan yemek ve Cem'],
        ['5.', 'Arda', 'Sarma', 'Sarma en son (Ebru yapmadı)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Yemek Bloğu', content: '[İçli Köfte -> Hünkar Beğendi -> Mantı] ardışık bloğu.' },
      { step: 2, title: 'İsim Bloğu', content: '[Deniz -> Cem -> Arda] ardışık bloğu.' },
      { step: 3, title: 'Yerleştirme', content: 'Burcu 2. sırada Hünkar Beğendi sunar. İçli Köfte 1, Mantı 3 olur.' },
      { step: 4, title: 'Sonuç', content: '4. sırada Karnıyarık tadılmıştır ve yemeği Cem yapmıştır.' }
    ],
    neuralBrake: "Çapa noktayı (2. sıra Burcu) kullanarak iki ayrı bloğu çakıştır.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Sarma = 5 ve Hünkar = 2 çivilerini hemen gir.'
  },
  {
    id: 4008,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 8,
    title: 'Otopark Dizilimi',
    category: 'Peron – Renk – Marka',
    context: '1’den 5’e kadar peronlara Beyaz, Siyah, Gri, Kırmızı ve Mavi araçlar park edilmiştir.',
    premises: [
      'Kırmızı araç, Beyaz aracın hemen sağındaki perondadır.',
      'Gri araç ile Siyah araç arasında tam iki peron boşluk vardır.',
      'Mavi araç, 2 numaralı perondadır.',
      'Gri araç, Mavi aracın solunda değildir.'
    ],
    questionStem: 'Buna göre 4 numaralı peronda hangi renk araç vardır ve Beyaz araç kaç numaradadır?',
    options: [
      { letter: 'A', text: '4 numarada Kırmızı, Beyaz araç 3 numaradadır.', isCorrect: true },
      { letter: 'B', text: '4 numarada Gri, Beyaz araç 1 numaradadır.', isCorrect: false },
      { letter: 'C', text: '4 numarada Beyaz, Kırmızı araç 5 numaradadır.', isCorrect: false },
      { letter: 'D', text: '4 numarada Siyah, Beyaz araç 2 numaradadır.', isCorrect: false }
    ],
    resultText: '4 numaralı peronda Kırmızı araç vardır ve Beyaz araç 3 numaralı perondadır. Peronlar: 1: Siyah, 2: Mavi, 3: Beyaz, 4: Kırmızı, 5: Gri.',
    matrix: {
      title: 'Otopark Peron Matrisi',
      headers: ['Peron No', 'Araç Rengi', 'Analiz'],
      rows: [
        ['1', 'Siyah', 'Gri ile arasında 2 peron (2 ve 3)'],
        ['2', 'Mavi', 'Kesin Bilgi'],
        ['3', 'Beyaz', 'Kırmızı ile blok oluşturan yer'],
        ['4', 'Kırmızı', 'Beyaz’ın hemen sağındaki peron'],
        ['5', 'Gri', 'Siyah’tan 2 peron sonra']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Merkezi Veriyi Çivile', content: 'Mavi araç 2 numaralı perondadır.' },
      { step: 2, title: 'Boşluklu Blok Analizi', content: 'Gri ile Siyah arasında 2 peron varsa ya 1-4 ya da 2-5 olur. 2 doluysa 1-4 veya Gri 5, Siyah 1 incelenir.' },
      { step: 3, title: 'Yan Yana Bloğu', content: "[Beyaz - Kırmızı] yan yana olmalıdır (3 ve 4)." },
      { step: 4, title: 'Sonuç', content: '3 Beyaz, 4 Kırmızı olur. 1 Siyah, 5 Gri park eder.' }
    ],
    neuralBrake: "'Hemen sağında' peron numarasının bir artması (3 -> 4) demektir.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Beyaz-Kırmızı bloğunu birleşik bir kutu gibi gezdir.'
  },
  {
    id: 4009,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 9,
    title: 'Konser Bileti',
    category: 'Sıra – İsim – Kategori',
    context: 'Arda, Berk, Can, Deniz ve Elif; VIP, Saha İçi ve Tribün biletleri için sıraya girmiştir (1-5).',
    premises: [
      'Herkes farklı sırada bilet almıştır.',
      'VIP bileti alan sadece bir kişidir ve bu kişi 3. sırada değildir.',
      'Can, biletini Arda’dan hemen sonra, Elif’ten ise hemen önce almıştır.',
      'Deniz, biletini VIP bilet alandan hemen önce almıştır.',
      'Berk, biletini en son sırada almıştır ve aldığı bilet Tribün kategorisindedir.',
      'İlk iki sırada bilet alanlar Saha İçi kategorisinden bilet almıştır.'
    ],
    questionStem: 'Buna göre VIP biletini kim almıştır ve kaçıncı sırada almıştır?',
    options: [
      { letter: 'A', text: 'Arda - 2. sırada', isCorrect: true },
      { letter: 'B', text: 'Can - 3. sırada', isCorrect: false },
      { letter: 'C', text: 'Deniz - 1. sırada', isCorrect: false },
      { letter: 'D', text: 'Elif - 4. sırada', isCorrect: false }
    ],
    resultText: 'VIP biletini Arda almıştır ve 2. sırada almıştır. Sıra: 1: Deniz (Saha İçi), 2: Arda (VIP), 3: Can (Saha İçi), 4: Elif (Tribün), 5: Berk (Tribün).',
    matrix: {
      title: 'Bilet Satış Sırası Matrisi',
      headers: ['Sıra No', 'İsim', 'Kategori', 'Analiz'],
      rows: [
        ['1.', 'Deniz', 'Saha İçi', 'VIP’den hemen önceki kişi'],
        ['2.', 'Arda', 'VIP', 'Deniz’in arkası, VIP alan kişi'],
        ['3.', 'Can', 'Saha İçi', 'Arda’dan hemen sonraki kişi'],
        ['4.', 'Elif', 'Tribün', 'Can’dan hemen sonraki kişi'],
        ['5.', 'Berk', 'Tribün', 'Kesin Bilgi (En Son)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Uç Verileri Sabitle', content: 'Berk 5. sırada Tribün biletidir.' },
      { step: 2, title: 'Blok Analizi', content: "[Arda -> Can -> Elif] ardışık bloğu." },
      { step: 3, title: 'VIP ve Deniz İlişkisi', content: "Deniz VIP'nin hemen önündedir." },
      { step: 4, title: 'Son Yerleşim', content: 'Deniz 1, Arda 2 (VIP), Can 3, Elif 4, Berk 5 dizilimi tüm kuralları sağlar.' }
    ],
    neuralBrake: "VIP 3. sırada değil kuralını atlama!",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Arda -> Can -> Elif bloğunu kur.'
  },
  {
    id: 4010,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 10,
    title: 'Uygulama İkonları',
    category: 'Sıra – Uygulama – Renk',
    context: 'Telefonun alt barındaki 5 ikon; Mesajlar, Telefon, Kamera, Müzik ve Ayarlar uygulamalarına aittir. Renkler: Yeşil, Mavi, Gri, Kırmızı, Turuncu.',
    premises: [
      'İkonlar soldan sağa 1’den 5’e sıralanmıştır.',
      'Mavi renkli ikon, Kırmızı ikonun hemen solunda, Yeşil ikonun hemen sağındadır.',
      'Ayarlar uygulaması 5. sıradadır ve rengi Gri değildir.',
      'Kamera uygulaması, Müzik uygulamasının hemen sağındadır.',
      'Mesajlar uygulaması Yeşil renklidir.',
      'Turuncu renkli ikon, Müzik uygulamasına aittir ve 1. sırada değildir.'
    ],
    questionStem: 'Buna göre 2. sıradaki uygulamanın adı ve rengi nedir?',
    options: [
      { letter: 'A', text: 'Telefon - Mavi', isCorrect: true },
      { letter: 'B', text: 'Kamera - Kırmızı', isCorrect: false },
      { letter: 'C', text: 'Müzik - Turuncu', isCorrect: false },
      { letter: 'D', text: 'Mesajlar - Yeşil', isCorrect: false }
    ],
    resultText: '2. sıradaki uygulama Telefon’dur ve rengi Mavi’dir. 1: Mesajlar (Yeşil), 2: Telefon (Mavi), 3: Müzik (Turuncu), 4: Kamera (Kırmızı), 5: Ayarlar (Gri/farklı renk).',
    matrix: {
      title: 'İkon Sıra ve Renk Matrisi',
      headers: ['Sıra No', 'Uygulama Adı', 'İkon Rengi', 'Analiz'],
      rows: [
        ['1.', 'Mesajlar', 'Yeşil', 'Mavi-Yeşil bloğu ve Mesajlar=Yeşil'],
        ['2.', 'Telefon', 'Mavi', 'Yeşil’in hemen sağında'],
        ['3.', 'Müzik', 'Turuncu', '1. değil ve Kamera’nın solunda'],
        ['4.', 'Kamera', 'Kırmızı', 'Müzik’in hemen sağında'],
        ['5.', 'Ayarlar', 'Gri / Diğer', 'Ayarlar 5. sıradadır']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Renk Bloğunu Oluştur', content: '[Yeşil -> Mavi -> Kırmızı] bloğu.' },
      { step: 2, title: 'Mesajlar Eşleşmesi', content: 'Mesajlar = Yeşil olduğuna göre 1. sıra Mesajlar (Yeşil), 2. sıra Mavi olur.' },
      { step: 3, title: 'Müzik ve Kamera', content: 'Müzik Turuncu ve Kamera onun hemen sağındadır.' },
      { step: 4, title: 'Sonuç', content: '2. sıradaki uygulama Telefon’dur ve rengi Mavi’dir.' }
    ],
    neuralBrake: "'Gri değildir' gibi negatif öncüller kalan seçenekler arasında güvenlik kilididir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Renk bloğunu (Y-M-K) ray üzerinde kaydır.'
  },
  {
    id: 4011,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 11,
    title: 'Öğretmenler Ders Programı',
    category: 'Gün – Ders – Öğretmen',
    context: 'Ali, Burcu, Can, Deniz ve Elif; Pazartesi’den Cuma’ya Matematik, Türkçe, Fizik, Kimya ve Tarih derslerine girmektedir.',
    premises: [
      'Matematik dersi, Fizik dersinden hemen sonraki gün, Türkçe dersinden ise hemen önceki gün işlenmektedir.',
      'Deniz, Salı günü derse girmektedir ve branşı Kimya değildir.',
      'Burcu, Tarih dersine girmektedir ve bu ders Cuma değildir.',
      'Ali, Matematik öğretmeni değildir ve dersi Can’dan önceki bir gündür.',
      'Elif, Perşembe günü Fizik dersine girmektedir.'
    ],
    questionStem: 'Buna göre Çarşamba günü hangi ders işlenmektedir ve bu dersin öğretmeni kimdir?',
    options: [
      { letter: 'A', text: 'Kimya dersi - Ali', isCorrect: true },
      { letter: 'B', text: 'Türkçe dersi - Deniz', isCorrect: false },
      { letter: 'C', text: 'Fizik dersi - Elif', isCorrect: false },
      { letter: 'D', text: 'Matematik dersi - Can', isCorrect: false }
    ],
    resultText: 'Çarşamba günü Kimya dersi işlenmektedir ve öğretmeni Ali’dir. Pzt: Burcu (Tarih), Salı: Deniz (Türkçe), Çar: Ali (Kimya), Per: Elif (Fizik), Cum: Can (Matematik).',
    matrix: {
      title: 'Haftalık Öğretmen ve Branş Matrisi',
      headers: ['Günler', 'Öğretmen', 'İşlenen Ders', 'Analiz'],
      rows: [
        ['Pazartesi', 'Burcu', 'Tarih', 'Cuma değilse ve blok doluysa tek yer'],
        ['Salı', 'Deniz', 'Türkçe', 'Deniz Salı günü ve Kimya değil'],
        ['Çarşamba', 'Ali', 'Kimya', 'Ali Can’dan önce ve Kimya öğretmeni'],
        ['Perşembe', 'Elif', 'Fizik', 'Kesin Bilgi'],
        ['Cuma', 'Can', 'Matematik', 'Kalan öğretmen ve ders']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriler', content: 'Elif Perşembe Fizik, Deniz Salı günüdür.' },
      { step: 2, title: 'Ders Bloğu', content: 'Fizik Perşembe ise Matematik Cuma’ya kalır.' },
      { step: 3, title: 'Burcu ve Tarih', content: 'Burcu Tarih ve Cuma değilse Pazartesi gününe yerleşir.' },
      { step: 4, title: 'Sonuç', content: 'Çarşamba günü Kimya dersi işlenir ve öğretmeni Ali’dir.' }
    ],
    neuralBrake: "'X'ten önceki bir gün' ifadesi hemen öncesi olmak zorunda değildir.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Çift katlı tablo oluştur: Üst kat Öğretmen, alt kat Branş.'
  },
  {
    id: 4012,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 12,
    title: 'Sinema Seansları',
    category: 'Saat – Film – Salon',
    context: 'Aksiyon, Komedi, Dram, Animasyon ve Korku filmleri 12.00, 14.00, 16.00, 18.00 ve 20.00 seanslarında 1-5 salonlarda gösterilecektir.',
    premises: [
      'Her film farklı saat ve salonda gösterilmektedir.',
      'Aksiyon filmi, 1. salondadır ancak seansı 12.00 değildir.',
      'Komedi filminin seansı, Dram filminin seansından hemen öncedir.',
      '16.00 seansındaki film 3. salondadır.',
      'Animasyon filmi, Korku filminden daha geç bir saatte ve daha yüksek numaralı salondadır.',
      '20.00 seansındaki film 5. salonda değildir ve Dram değildir.'
    ],
    questionStem: 'Buna göre 18.00 seansında hangi film, hangi salonda gösterilmektedir?',
    options: [
      { letter: 'A', text: 'Aksiyon filmi, 1. salonda', isCorrect: true },
      { letter: 'B', text: 'Dram filmi, 3. salonda', isCorrect: false },
      { letter: 'C', text: 'Komedi filmi, 4. salonda', isCorrect: false },
      { letter: 'D', text: 'Animasyon filmi, 5. salonda', isCorrect: false }
    ],
    resultText: '18.00 seansında Aksiyon filmi, 1. salonda gösterilmektedir. 12: Korku (2. Salon), 14: Komedi (4. Salon), 16: Dram (3. Salon), 18: Aksiyon (1. Salon), 20: Animasyon (5/4. Salon).',
    matrix: {
      title: 'Seans ve Salon Matrisi',
      headers: ['Saat', 'Film Türü', 'Salon No', 'Analiz'],
      rows: [
        ['12.00', 'Korku', '2', 'Animasyon’dan önce'],
        ['14.00', 'Komedi', '4', 'Dram’dan hemen önce'],
        ['16.00', 'Dram', '3', 'Kesin Bilgi: 16.00 = 3. Salon'],
        ['18.00', 'Aksiyon', '1', '1. Salon kuralı ve saat eşleşmesi'],
        ['20.00', 'Animasyon', '4/5', 'En geç saat']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Veriyi Sabitle', content: '16.00 seansı 3. salondadır.' },
      { step: 2, title: 'Zaman Bloğu', content: 'Komedi Dram’dan hemen öncedir (Dram 16.00 ise Komedi 14.00).' },
      { step: 3, title: 'Salon ve Film', content: 'Aksiyon 1. salonda ve 12.00 değilse 18.00 seansına yerleşir.' },
      { step: 4, title: 'Sonuç', content: '18.00 seansında Aksiyon filmi 1. salondadır.' }
    ],
    neuralBrake: "'Daha geç' saat büyümesi, 'daha yüksek salon' rakam büyümesi demektir; çift filtreleme yap.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Saatleri dikey yazıp film ve salon sütunları aç.'
  },
  {
    id: 4013,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 13,
    title: 'Otel Odaları',
    category: 'Kat – Misafir – Kahvaltı Sırası',
    context: '5 katlı otelde Arda, Burak, Can, Deniz ve Elif kalmaktadır. Sabah kahvaltı salonuna iniş sıraları belirlenmiştir.',
    premises: [
      'Herkes farklı bir sırada kahvaltıya inmiştir.',
      'Can, 4. katta kalmaktadır ve kahvaltıya Deniz’den hemen sonra inmiştir.',
      'Arda, 1. katta kalmaktadır ve kahvaltıya en son inen kişi değildir.',
      'Elif, otelin en üst katında kalmaktadır ve kahvaltıya Burak’tan daha önce inmiştir.',
      'Kahvaltıya ilk inen kişi, 2. katta konaklamaktadır.'
    ],
    questionStem: 'Kahvaltıya 3. sırada inen kişi kimdir ve kaçıncı katta konaklamaktadır?',
    options: [
      { letter: 'A', text: 'Can - 4. katta', isCorrect: true },
      { letter: 'B', text: 'Deniz - 3. katta', isCorrect: false },
      { letter: 'C', text: 'Burak - 2. katta', isCorrect: false },
      { letter: 'D', text: 'Elif - 5. katta', isCorrect: false }
    ],
    resultText: 'Kahvaltıya 3. sırada inen kişi Can’dır ve 4. katta konaklamaktadır.',
    matrix: {
      title: 'Kahvaltı Sırası ve Kat Matrisi',
      headers: ['Kahvaltı Sırası', 'Misafir İsmi', 'Kaldığı Kat', 'Analiz'],
      rows: [
        ['1.', 'Burak', '2. Kat', '2. kat kuralı'],
        ['2.', 'Deniz', '3. Kat', 'Can’dan hemen önce inen kişi'],
        ['3.', 'Can', '4. Kat', 'Deniz’in hemen arkası, 4. kat kesin'],
        ['4.', 'Arda', '1. Kat', '1. kat kuralı ve sonuncu olmama'],
        ['5.', 'Elif', '5. Kat', '5. kat kesin bilgi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Katları Sabitle', content: 'Elif 5. katta, Can 4. katta, Arda 1. kattadır.' },
      { step: 2, title: 'İlk İnen Kişi', content: 'İlk inen 2. kattadır (Burak veya Deniz).' },
      { step: 3, title: 'Blok Analizi', content: "'Can Deniz'den hemen sonra inmiştir' [Deniz -> Can] bloğunu verir." },
      { step: 4, title: 'Sonuç', content: 'Can 4. katta konaklamaktadır ve 3. sırada inmiştir.' }
    ],
    neuralBrake: "'Ters orantılı değildir' gibi kafa karıştırıcı ifadelere takılma, somut öncüllere odaklan.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Kat numaraları ile iniş sıralarını yan yana iki liste yap.'
  },
  {
    id: 4014,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 14,
    title: 'Kargo Rotası',
    category: 'Sıra – Mahalle – Kurye',
    context: 'Ali, Berk ve Can; Yıldız, Güneş, Ay, Bulut ve Deniz mahallelerine toplam 5 paket teslim edecektir.',
    premises: [
      'Toplam 5 teslimat yapılmış ve her mahallede bir teslimat olmuştur.',
      'Güneş Mahallesi’ne yapılan teslimat, Bulut’tan hemen sonra, Yıldız’dan ise hemen öncedir.',
      'Can, 2. ve 4. sıradaki teslimatları gerçekleştirmiştir.',
      'Ay Mahallesi, teslimat rotasının en başındadır.',
      'Berk, sadece bir teslimat yapmıştır ve bu teslimat Deniz Mahallesi’nedir.',
      'Ali, rotanın 3. sırasındaki paketi teslim etmiştir.'
    ],
    questionStem: 'Buna göre 4. sırada hangi mahalleye teslimat yapılmıştır ve kim yapmıştır?',
    options: [
      { letter: 'A', text: 'Yıldız Mahallesi - Can', isCorrect: true },
      { letter: 'B', text: 'Güneş Mahallesi - Ali', isCorrect: false },
      { letter: 'C', text: 'Bulut Mahallesi - Can', isCorrect: false },
      { letter: 'D', text: 'Deniz Mahallesi - Berk', isCorrect: false }
    ],
    resultText: '4. sırada Yıldız Mahallesi’ne teslimat yapılmıştır ve bu teslimatı Can gerçekleştirmiştir. Rota: 1: Ay (Berk/Can?), 2: Bulut (Can), 3: Güneş (Ali), 4: Yıldız (Can), 5: Deniz (Berk).',
    matrix: {
      title: 'Kargo Dağıtım Çizelgesi',
      headers: ['Sıra No', 'Mahalle Adı', 'Kurye İsmi', 'Analiz'],
      rows: [
        ['1.', 'Ay', 'Kalan Kurye', 'Teslimat rotasının en başı'],
        ['2.', 'Bulut', 'Can', '3’lü bloğun başlangıcı'],
        ['3.', 'Güneş', 'Ali', 'Blok ortası ve Ali’nin sırası'],
        ['4.', 'Yıldız', 'Can', 'Blok sonu ve Can’ın kesin sırası'],
        ['5.', 'Deniz', 'Berk', 'Berk sadece Deniz Mahallesi’ne teslimat yaptı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Verileri Sabitle', content: 'Ay 1. sırada, Ali 3. sırada, Can 2 ve 4. sıralarda.' },
      { step: 2, title: 'Kurye-Mahalle Eşleşmesi', content: 'Berk sadece Deniz Mahallesi’ne teslimat yaptı. Berk mecburen 5. sıradadır.' },
      { step: 3, title: 'Blok Analizi', content: '[Bulut -> Güneş -> Yıldız] bloğu mecburen 2, 3 ve 4. sıralara oturur.' },
      { step: 4, title: 'Sonuç', content: '4. sırada Yıldız Mahallesi’ne teslimat yapılmıştır ve teslimatı Can yapmıştır.' }
    ],
    neuralBrake: "'Sadece bir teslimat yapmıştır' ifadesi Berk'i tek hücreye kilitler.",
    cognitiveTime: '25 saniye',
    synapticCoding: 'Kurye isimlerini sıraların yanına hemen yaz.'
  },
  {
    id: 4015,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 15,
    title: 'Tez Savunma Takvimi',
    category: 'Saat – Öğrenci – Bölüm',
    context: 'Arda, Berk, Can, Deniz ve Elif; Hukuk, Tıp, Mühendislik, Mimarlık ve Edebiyat tezlerini 09.00, 10.00, 11.00, 13.00 ve 14.00’te savunacaktır.',
    premises: [
      'Mühendislik savunması, Tıp savunmasından hemen önce, Hukuk savunmasından hemen sonradır.',
      'Deniz, savunmasını saat 11.00’de yapacaktır.',
      'Arda, savunmasını Berk’ten daha geç, Can’dan ise daha erken bir saatte yapacaktır.',
      'Edebiyat bölümünün savunması saat 14.00’tedir.',
      'Elif, Hukuk öğrencisidir.'
    ],
    questionStem: 'Buna göre saat 10.00’da kimin savunması vardır ve Berk hangi bölümün öğrencisidir?',
    options: [
      { letter: 'A', text: 'Berk - Mühendislik', isCorrect: true },
      { letter: 'B', text: 'Elif - Hukuk', isCorrect: false },
      { letter: 'C', text: 'Deniz - Tıp', isCorrect: false },
      { letter: 'D', text: 'Arda - Mimarlık', isCorrect: false }
    ],
    resultText: 'Saat 10.00’da Berk’in savunması vardır; Berk Mühendislik öğrencisidir. 09.00: Elif (Hukuk), 10.00: Berk (Mühendislik), 11.00: Deniz (Tıp), 13.00: Arda (Mimarlık), 14.00: Can (Edebiyat).',
    matrix: {
      title: 'Savunma Programı Matrisi',
      headers: ['Saat', 'Öğrenci İsmi', 'Bölüm / Branş', 'Analiz'],
      rows: [
        ['09.00', 'Elif', 'Hukuk', 'Hukuk-Müh-Tıp bloğu başlangıcı'],
        ['10.00', 'Berk', 'Mühendislik', 'Hukuk’tan sonraki bölüm'],
        ['11.00', 'Deniz', 'Tıp', 'Kesin Bilgi: Saat 11.00'],
        ['13.00', 'Arda', 'Mimarlık', 'Berk-Arda-Can sıralaması'],
        ['14.00', 'Can', 'Edebiyat', 'Kesin Bilgi: Saat 14.00']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Verileri Sabitle', content: 'Deniz 11.00, Edebiyat 14.00.' },
      { step: 2, title: 'Bölüm Bloğu', content: '[Hukuk -> Mühendislik -> Tıp] ardışık bloğu Deniz 11.00’deyse 09.00 (Hukuk), 10.00 (Müh), 11.00 (Tıp) olur.' },
      { step: 3, title: 'Öğrenci Eşleşmesi', content: 'Elif Hukuk öğrencisi olduğundan 09.00 Elif’indir. Berk 10.00’a kalır.' },
      { step: 4, title: 'Sonuç', content: 'Saat 10.00’da Berk savunma yapar ve Mühendislik öğrencisidir.' }
    ],
    neuralBrake: "'Daha geç/erken' ardışık kısıtlı listede tek bir dizilime kapı açar.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Saatleri 09-10-11-13-14 olarak alt alta yaz.'
  },
  {
    id: 4016,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 16,
    title: 'Müze Gezisi Eserleri',
    category: 'Salon No – Eser – Sanatçı',
    context: '1’den 5’e salonlarda Tablo, Heykel, Mozaik, Eskiz ve Büst sergilenmektedir. Sanatçılar: A, B, C, D ve E.',
    premises: [
      'Her salonda farklı sanatçıya ait eser vardır.',
      'Heykel, 3 numaralı salondadır.',
      'C sanatçısının eseri, A sanatçısının eserinden hemen sonraki, D sanatçısının eserinden hemen önceki salondadır.',
      'B sanatçısının eseri bir Tablodur ve 1 numaralı salonda değildir.',
      'Mozaik, Heykel’den daha küçük numaralı salondadır.',
      'Eskiz, E sanatçısına aittir ve 5 numaralı salondadır.'
    ],
    questionStem: 'Buna göre 2 numaralı salonda hangi tür eser vardır ve C sanatçısının eseri hangisidir?',
    options: [
      { letter: 'A', text: 'Büst vardır; C sanatçısının eseri Büst’tür.', isCorrect: true },
      { letter: 'B', text: 'Mozaik vardır; C sanatçısının eseri Tablo’dur.', isCorrect: false },
      { letter: 'C', text: 'Tablo vardır; C sanatçısının eseri Heykel’dir.', isCorrect: false },
      { letter: 'D', text: 'Eskiz vardır; C sanatçısının eseri Mozaik’tir.', isCorrect: false }
    ],
    resultText: '2 numaralı salonda Büst vardır; C sanatçısının eseri de Büst’tür. 1: Mozaik (A), 2: Büst (C), 3: Heykel (D), 4: Tablo (B), 5: Eskiz (E).',
    matrix: {
      title: 'Müze Salon ve Sanatçı Matrisi',
      headers: ['Salon No', 'Sanatçı', 'Eser Türü', 'Analiz'],
      rows: [
        ['1', 'A', 'Mozaik', 'Heykel’den küçük numaralı tek boş salon'],
        ['2', 'C', 'Büst', 'A-C-D bloğunun orta parçası'],
        ['3', 'D', 'Heykel', 'Kesin Bilgi: 3. Salon'],
        ['4', 'B', 'Tablo', '1 değil ve 5 doluysa buraya kalır'],
        ['5', 'E', 'Eskiz', 'Kesin Bilgi: 5. Salon']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Verileri Sabitle', content: 'Heykel 3. salonda, E sanatçısının Eskiz’i 5. salonda.' },
      { step: 2, title: 'Sanatçı Bloğu', content: '[A -> C -> D] ardışık bloğu D 3. salonda olacak şekilde 1-2-3’e oturur.' },
      { step: 3, title: 'Kalan Sanatçı ve Eser', content: '4. salona B sanatçısı ve Tablo yerleşir.' },
      { step: 4, title: 'Eser Türleri', content: 'Mozaik Heykel’den küçük (1. salon) olduğuna göre 2. salona Büst kalır. C’nin eseri Büst’tür.' }
    ],
    neuralBrake: "'Küçük numaralı salon' daha başta veya solda olmayı temsil eder.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'A-C-D bloğunu Heykel (3) ile çakıştır.'
  },
  {
    id: 4017,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 17,
    title: 'Spor Programı İstasyonları',
    category: 'Saat – Kişi – Alet',
    context: 'Arda, Berk, Can, Deniz ve Elif; Koşu Bandı, Ağırlık, Bisiklet, Kürek ve Pilates aletlerini 18.00, 18.30, 19.00, 19.30 ve 20.00’de kullanacaktır.',
    premises: [
      'Herkes farklı bir aleti farklı saatte kullanmaktadır.',
      'Koşu Bandı, Bisiklet’ten hemen sonra, Ağırlık’tan hemen önce kullanılacaktır.',
      'Can, aletini saat 19.00’da kullanacaktır.',
      'Berk, Ağırlık çalışmayacaktır ve çalışması saat 18.00’de değildir.',
      'Deniz, Pilates yapacaktır ve bu çalışma Kürek’ten daha geç bir saatte olacaktır.',
      'Elif, Bisiklet kullanacaktır.'
    ],
    questionStem: 'Buna göre saat 19.30’da kim, hangi aleti kullanmaktadır?',
    options: [
      { letter: 'A', text: 'Berk - Kürek', isCorrect: true },
      { letter: 'B', text: 'Deniz - Pilates', isCorrect: false },
      { letter: 'C', text: 'Arda - Koşu Bandı', isCorrect: false },
      { letter: 'D', text: 'Can - Ağırlık', isCorrect: false }
    ],
    resultText: 'Saat 19.30’da Berk, Kürek aletini kullanmaktadır. 18.00: Elif (Bisiklet), 18.30: Arda (Koşu Bandı), 19.00: Can (Ağırlık), 19.30: Berk (Kürek), 20.00: Deniz (Pilates).',
    matrix: {
      title: 'İstasyon ve Saat Matrisi',
      headers: ['Saat', 'Kişi İsmi', 'Kullanılan Alet', 'Analiz'],
      rows: [
        ['18.00', 'Elif', 'Bisiklet', '3’lü blok başı ve Elif’in aleti'],
        ['18.30', 'Arda', 'Koşu Bandı', 'Bisiklet’ten hemen sonraki istasyon'],
        ['19.00', 'Can', 'Ağırlık', 'Kesin Bilgi: 19.00 ve blok sonu'],
        ['19.30', 'Berk', 'Kürek', 'Deniz’den önce olması gereken saat'],
        ['20.00', 'Deniz', 'Pilates', 'En geç saat ve Pilates eşleşmesi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok ve Sabit Veri', content: '[Bisiklet -> Koşu Bandı -> Ağırlık] bloğu. Can 19.00’dadır.' },
      { step: 2, title: 'Elif ve Bisiklet', content: 'Elif Bisiklet kullanırsa blok 18.00’den başlar: 18.00 Elif, 18.30 Koşu Bandı, 19.00 Can (Ağırlık).' },
      { step: 3, title: 'Kalanlar', content: 'Deniz Pilates yapar ve Kürek’ten sonradır. O halde Deniz 20.00, Berk 19.30 (Kürek) olur.' },
      { step: 4, title: 'Sonuç', content: 'Saat 19.30’da Berk Kürek kullanmaktadır.' }
    ],
    neuralBrake: "'Hemen önce' birbirine yapışık kutular, 'daha geç' ise aralıklı mesafe alabilir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Kişi isimlerini aletlerin yanına etiketle.'
  },
  {
    id: 4018,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 18,
    title: 'Yazılım Şirketi Ofis Düzeni',
    category: 'Kat – Departman – Yönetici',
    context: '5 katlı binada Yazılım, Tasarım, Pazarlama, İK ve Finans departmanları bulunmaktadır. Yöneticiler: Arda, Berk, Can, Deniz, Elif.',
    premises: [
      'Tasarım departmanı, Yazılım departmanının hemen üstünde, Finans departmanının hemen altındaki kattadır.',
      'Deniz, 4. kattaki departmanın yöneticisidir.',
      'Arda, İK departmanının yöneticisidir ve bu departman 1. katta değildir.',
      'Berk, Finans departmanının yöneticisidir.',
      'Can’ın yönettiği departman, Elif’in yönettiği departmandan daha alt bir kattadır.'
    ],
    questionStem: 'Buna göre 2. katta hangi departman bulunmaktadır ve Yazılım departmanının yöneticisi kimdir?',
    options: [
      { letter: 'A', text: '2. katta İK departmanı; Yazılım yöneticisi Elif’tir.', isCorrect: true },
      { letter: 'B', text: '2. katta Finans departmanı; Yazılım yöneticisi Berk’tir.', isCorrect: false },
      { letter: 'C', text: '2. katta Tasarım departmanı; Yazılım yöneticisi Deniz’dir.', isCorrect: false },
      { letter: 'D', text: '2. katta Pazarlama departmanı; Yazılım yöneticisi Can’dır.', isCorrect: false }
    ],
    resultText: '2. katta İK departmanı bulunmaktadır; Yazılım departmanının yöneticisi ise Elif’tir. Katlar: 5: Finans (Berk), 4: Tasarım (Deniz), 3: Yazılım (Elif), 2: İK (Arda), 1: Pazarlama (Can).',
    matrix: {
      title: 'Ofis Kat Hiyerarşi Matrisi',
      headers: ['Kat No', 'Departman', 'Yönetici', 'Analiz'],
      rows: [
        ['5', 'Finans', 'Berk', 'Finans/Tasarım/Yazılım bloğu tepesi'],
        ['4', 'Tasarım', 'Deniz', 'Deniz 4. kattadır kuralı'],
        ['3', 'Yazılım', 'Elif', 'Tasarım’ın hemen altı'],
        ['2', 'İK', 'Arda', '1. katta değilse mecburen 2. kat'],
        ['1', 'Pazarlama', 'Can', 'Can Elif’ten daha alt katta']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Departman Bloğu', content: '[Finans / Tasarım / Yazılım] ardışık üçlü bloğu.' },
      { step: 2, title: 'Deniz ve Kat 4', content: 'Deniz 4. kattadır ve Berk Finans yöneticisidir. Blok 5-4-3 olarak oturur (5 Finans Berk, 4 Tasarım Deniz, 3 Yazılım).' },
      { step: 3, title: 'İK ve Arda', content: 'İK 1. katta değilse mecburen 2. kattadır (Arda).' },
      { step: 4, title: 'Sonuç', content: '2. katta İK departmanı vardır, Yazılım departmanı yöneticisi Elif’tir.' }
    ],
    neuralBrake: "'Hemen üstünde' ile 'daha alt katta' arasındaki ayrımı net yap.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Berk = Finans ve Arda = İK notlarını al.'
  },
  {
    id: 4019,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 19,
    title: 'Havaalanı Pist Sıralaması',
    category: 'Saat – Şirket – Şehir',
    context: '10.00, 11.00, 12.00, 13.00 ve 14.00 saatlerinde A, B, C, D ve E şirketlerinin uçakları Londra, Paris, Berlin, Roma ve Tokyo rotalarında iniş yapacaktır.',
    premises: [
      'Londra uçağı, C şirketine aittir ve Berlin uçağından hemen sonra, Roma uçağından hemen önce inecektir.',
      'E şirketine ait uçak saat 12.00’de iniş yapacaktır.',
      'Tokyo uçağı, saat 10.00’da iniş yapacak olan uçağın hemen arkasındaki sırada değildir.',
      'B şirketi, Paris uçağına sahiptir ve iniş saati 14.00 değildir.',
      'D şirketi, E şirketinden daha erken bir saatte iniş yapacaktır.'
    ],
    questionStem: 'Buna göre saat 13.00’te hangi şehrin uçağı inmektedir ve B şirketi hangi saatte iniş yapacaktır?',
    options: [
      { letter: 'A', text: 'Paris uçağı inmektedir; B şirketi saat 13.00’te iniş yapacaktır.', isCorrect: true },
      { letter: 'B', text: 'Roma uçağı inmektedir; B şirketi saat 11.00’de iniş yapacaktır.', isCorrect: false },
      { letter: 'C', text: 'Berlin uçağı inmektedir; B şirketi saat 10.00’da iniş yapacaktır.', isCorrect: false },
      { letter: 'D', text: 'Tokyo uçağı inmektedir; B şirketi saat 14.00’te iniş yapacaktır.', isCorrect: false }
    ],
    resultText: 'Saat 13.00’te Paris uçağı inmektedir; B şirketi de 13.00’te iniş yapacaktır. 10.00: D (Berlin), 11.00: C (Londra), 12.00: E (Roma), 13.00: B (Paris), 14.00: A (Tokyo).',
    matrix: {
      title: 'İniş Şeridi ve Şehir Matrisi',
      headers: ['İniş Saati', 'Şirket', 'Rota (Şehir)', 'Analiz'],
      rows: [
        ['10.00', 'D', 'Berlin', 'E’den erken olan uygun yer ve blok başı'],
        ['11.00', 'C', 'Londra', 'Berlin-Roma arası kilit şehir'],
        ['12.00', 'E', 'Roma', 'Kesin Bilgi: Saat 12.00 ve blok sonu'],
        ['13.00', 'B', 'Paris', 'B = Paris eşleşmesi için kalan tek uygun yer'],
        ['14.00', 'A', 'Tokyo', 'Kalan son şirket ve şehir']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Şehir Bloğu', content: '[Berlin -> Londra (C) -> Roma] ardışık üçlü bloğu.' },
      { step: 2, title: 'Zaman ve Şirket', content: 'E şirketi 12.00’dedir. D E’den erkendir (10.00 veya 11.00).' },
      { step: 3, title: 'Blok Yerleştirme', content: 'Blok 10-11-12 saatlerine yerleşir (10.00 Berlin, 11.00 Londra C, 12.00 Roma E).' },
      { step: 4, title: 'Kalanları Eşleştir', content: 'B şirketi Paris uçağıdır ve 14.00 değilse 13.00’te iner. 14.00’e Tokyo (A) kalır.' }
    ],
    neuralBrake: "'Hemen arkasındaki sırada değildir' negatif kısıtı olasılıkları test etmek içindir.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Şehir bloğunu (B-L-R) tek birim gibi hareket ettir.'
  },
  {
    id: 4020,
    atolyeId: 4,
    atolyeTitle: 'Atölye 4: Sıralama ve Karmaşık Yerleştirme',
    questionNumber: 20,
    title: 'Otobüs Seferleri',
    category: 'Peron No – Şirket – Varış',
    context: '1’den 5’e peronlarda A, B, C, D ve E şirketleri Ankara, İstanbul, İzmir, Antalya ve Bursa seferleri yapmaktadır.',
    premises: [
      'Ankara otobüsü 1 numaralı perondadır.',
      'İzmir otobüsü, İstanbul otobüsünün hemen sağındaki perondadır.',
      'C şirketi Antalya’ya gitmektedir ve peron numarası İzmir otobüsünden daha büyüktür.',
      'B şirketi, İzmir veya Ankara seferini yapmamaktadır.',
      'E şirketinin otobüsü, D şirketinin otobüsünden hemen sonraki (sağındaki) perondadır.',
      'Bursa otobüsü, B şirketine aittir.'
    ],
    questionStem: 'Buna göre 3 numaralı perondan hangi şehre otobüs kalkmaktadır ve İstanbul otobüsü hangi şirkete aittir?',
    options: [
      { letter: 'A', text: '3 numaradan İzmir; İstanbul otobüsü E şirketine aittir.', isCorrect: true },
      { letter: 'B', text: '3 numaradan Antalya; İstanbul otobüsü D şirketine aittir.', isCorrect: false },
      { letter: 'C', text: '3 numaradan Bursa; İstanbul otobüsü A şirketine aittir.', isCorrect: false },
      { letter: 'D', text: '3 numaradan İstanbul; İstanbul otobüsü C şirketine aittir.', isCorrect: false }
    ],
    resultText: '3 numaralı perondan İzmir’e otobüs kalkmaktadır; İstanbul otobüsü ise E şirketine aittir. 1: D (Ankara), 2: E (İstanbul), 3: A (İzmir), 4: B (Bursa), 5: C (Antalya).',
    matrix: {
      title: 'Terminal Peron Matrisi',
      headers: ['Peron No', 'Şirket', 'Varış Şehri', 'Analiz'],
      rows: [
        ['1', 'D', 'Ankara', 'Ankara kesin; E-D bloğu başı'],
        ['2', 'E', 'İstanbul', 'D’den hemen sonra ve İzmir bloğu başı'],
        ['3', 'A', 'İzmir', 'İstanbul’un hemen sağındaki peron'],
        ['4', 'B', 'Bursa', 'B-Bursa eşleşmesi'],
        ['5', 'C', 'Antalya', 'C-Antalya eşleşmesi ve en büyük peron']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Çapa Veriyi Yerleştir', content: 'Ankara 1 numaralı perondadır.' },
      { step: 2, title: 'Şehir Bloğu', content: "'İzmir İstanbul'un hemen sağında' [İstanbul -> İzmir] bloğudur (2 ve 3 numaraya yerleşir)." },
      { step: 3, title: 'Şirket Blokları', content: "'E, D'den hemen sonra' D 1 (Ankara), E 2 (İstanbul) olur." },
      { step: 4, title: 'Final Eşleşme', content: 'C Antalya’ya gitmektedir ve İzmir’den büyüktür (C 5. perondadır). B Bursa 4. peronda, A İzmir 3. perondadır.' }
    ],
    neuralBrake: "'Hemen sağındaki' peron numarasının bir artması demektir.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'C-Antalya ve B-Bursa bloklarını yedek kulübesi gibi listele.'
  }
];
