import { SozelMantikItem } from './sozelMantikTypes';

export const ATOLYE_2_QUESTIONS: SozelMantikItem[] = [
  {
    id: 2001,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 1,
    title: 'Yuvarlak Masa Toplantısı',
    category: 'Dairesel Konumlandırma',
    context: 'A, B, C, D, E ve F isimli altı yönetici, yuvarlak bir masa etrafında merkeze dönük oturmaktadır.',
    premises: [
      'A, B’nin tam karşısında oturmaktadır.',
      'C, A’nın hemen sağındaki koltukta oturmaktadır.',
      'D ve E karşılıklı oturmaktadır.',
      'F, C’nin hemen yanındaki koltuklardan birinde oturmamaktadır.'
    ],
    questionStem: 'Buna göre C’nin tam karşısında kim oturmaktadır?',
    options: [
      { letter: 'A', text: 'D yöneticisi', isCorrect: false },
      { letter: 'B', text: 'E yöneticisi', isCorrect: false },
      { letter: 'C', text: 'F yöneticisi', isCorrect: true },
      { letter: 'D', text: 'B yöneticisi', isCorrect: false }
    ],
    resultText: 'C’nin tam karşısında F oturmaktadır.',
    matrix: {
      title: 'Saat Kadranı Dairesel Matrisi',
      headers: ['Saat Konumu', 'Yönetici', 'Sinaptik Analiz'],
      rows: [
        ['12:00', 'A', 'Referans Noktası'],
        ['10:00', 'C', 'A’nın hemen sağında (merkeze bakışa göre)'],
        ['08:00', 'D / E', 'D ve E karşılıklı çifti (1. koltuk)'],
        ['06:00', 'B', 'A’nın tam karşısı (Kesin Bilgi)'],
        ['04:00', 'F', 'C’nin tam karşısı, komşusu değil'],
        ['02:00', 'E / D', 'D ve E karşılıklı çifti (2. koltuk)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Referans ve Zıtlık', content: 'A saat 12:00 konumuna sabitlenir, karşısında saat 06:00’da B oturur.' },
      { step: 2, title: 'Sağ-Sol Netleştirmesi', content: 'Merkeze bakan A için sağ taraf saat 10:00 yönüdür; C saat 10:00’a yerleşir.' },
      { step: 3, title: 'Blok ve Karşıtlık', content: 'D ve E karşılıklı oturmak zorundaysa boş olan tek karşılıklı hat 08:00 ve 02:00 hattıdır.' },
      { step: 4, title: 'Son Yerleşim', content: 'Geriye saat 04:00 koltuğu kalır. Bu koltuk C’nin (10:00) tam karşısıdır ve F mecburen buradadır.' }
    ],
    neuralBrake: 'Masaya dışarıdan bakan biri için sağ olan yer, masada oturan biri için soldur. Her zaman merkeze bakan kişinin kolu üzerinden düşün.',
    cognitiveTime: '30 saniye',
    synapticCoding: '6 kişilik masada tam karşıtlık formülü: 1-4, 2-5, 3-6 (Kişi Sayısı / 2).'
  },
  {
    id: 2002,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 2,
    title: 'Manken Kıyafet Kombini',
    category: 'Eşleştirme',
    context: 'K, L ve M isimli üç vitrin mankenine; Yeşil, Mavi ve Kırmızı renklerde Pantolon, Gömlek ve Ceket giydirilmiştir.',
    premises: [
      'Mavi renkteki kıyafet Gömlek’tir.',
      'K mankeni Yeşil kıyafet giymektedir ancak Ceket giymemektedir.',
      'L mankenine Pantolon giydirilmemiştir.'
    ],
    questionStem: 'Buna göre M mankeni hangi renkte ve hangi kıyafeti giymektedir?',
    options: [
      { letter: 'A', text: 'Kırmızı - Ceket', isCorrect: true },
      { letter: 'B', text: 'Mavi - Gömlek', isCorrect: false },
      { letter: 'C', text: 'Yeşil - Pantolon', isCorrect: false },
      { letter: 'D', text: 'Kırmızı - Gömlek', isCorrect: false }
    ],
    resultText: 'M mankeni Kırmızı renkte Ceket giymektedir. K: Yeşil Pantolon, L: Mavi Gömlek, M: Kırmızı Ceket.',
    matrix: {
      title: 'Manken - Renk - Kıyafet Çapraz Matrisi',
      headers: ['Manken', 'Renk', 'Kıyafet', 'Analiz'],
      rows: [
        ['K', 'Yeşil', 'Pantolon', 'Ceket ve Gömlek olamaz kuralı'],
        ['L', 'Mavi', 'Gömlek', 'Pantolon giymiyorsa Mavi Gömlek bloğu'],
        ['M', 'Kırmızı', 'Ceket', 'Kalan tek ikili']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Blok Kur', content: '[Mavi - Gömlek] ayrılmaz bir bloktur.' },
      { step: 2, title: 'Kişi ve Renk Eşleştir', content: 'K mankeni Yeşil giydiğine göre Mavi-Gömlek bloğu ya L’ye ya M’ye aittir.' },
      { step: 3, title: 'Kısıtlamayı Uygula', content: 'K mankeni Yeşil giyiyor ve Ceket giymiyorsa K’ya Pantolon kalır (K = Yeşil Pantolon).' },
      { step: 4, title: 'Son Yerleşim', content: 'L Pantolon giyemiyorsa Mavi-Gömlek L’ye verilir. Geriye kalan M mankenine Kırmızı Ceket kalır.' }
    ],
    neuralBrake: "'K ceket giymiyor' dendiğinde hemen 'pantolon giyiyor' diyebilmek için Gömlek renginin (Mavi) başka mankene ait olduğunu önceden gör.",
    cognitiveTime: '40-50 saniye',
    synapticCoding: 'K = Y / C ve Mavi = G şeklinde kısa notlar al.'
  },
  {
    id: 2003,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 3,
    title: 'Asansör Sırası',
    category: 'Dinamik Kat Sıralaması',
    context: 'Bir binanın zemin katından asansöre binen Arzu, Burcu, Canan ve Deniz isimli dört arkadaş 1, 2, 3 ve 4. katlarda birer birer ineceklerdir.',
    premises: [
      'Arzu, Canan’dan daha üst bir katta inecektir.',
      'Deniz, Burcu’dan hemen sonraki katta inecektir.',
      'Burcu, 2. katta inmeyecektir.'
    ],
    questionStem: 'Buna göre 1. katta inen kişi kimdir?',
    options: [
      { letter: 'A', text: 'Arzu', isCorrect: false },
      { letter: 'B', text: 'Burcu', isCorrect: true },
      { letter: 'C', text: 'Canan', isCorrect: false },
      { letter: 'D', text: 'Deniz', isCorrect: false }
    ],
    resultText: '1. katta inen kişi Burcu’dur. İniş katları: 1: Burcu, 2: Deniz, 3: Canan, 4: Arzu.',
    matrix: {
      title: 'Asansör Kat Matrisi',
      headers: ['Kat No', 'İnen Kişi', 'Analiz'],
      rows: [
        ['4. Kat', 'Arzu', 'A > C kuralı gereği en üstte'],
        ['3. Kat', 'Canan', 'A’nın altında, blok dışı kalan yer'],
        ['2. Kat', 'Deniz', 'B-D bloğunun üst parçası'],
        ['1. Kat', 'Burcu', 'B-D bloğu başlangıcı ve 2. kat kısıtı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Deniz, Burcu'dan hemen sonraki katta inecektir' [Burcu - Deniz] bloğunu verir." },
      { step: 2, title: 'Kısıtlamayı Uygula', content: 'Burcu 2. katta inmeyecektir. Blok (1-2) katlarında veya (3-4) katlarında olmalıdır.' },
      { step: 3, title: 'Olasılıkları Deneme', content: 'Eğer blok (3-4) olsaydı Arzu ve Canan (1-2) olurdu (Arzu 2, Canan 1). Eğer blok (1-2) olursa Burcu 1, Deniz 2 olur; Arzu 4, Canan 3 olur.' },
      { step: 4, title: 'Mantıksal Eleme', content: 'Burcu 2’de inemiyorsa onu 1. kata koymak [Burcu 1, Deniz 2] bloğunu eksiksiz sağlar. 1. katta inen Burcu’dur.' }
    ],
    neuralBrake: "'Hemen sonra' asansör sorularında 'bir üst kat' demektir.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'B → D ve A > C sembolleriyle katlar arası hiyerarşiyi görselleştir.'
  },
  {
    id: 2004,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 4,
    title: 'Köşe Yazıları',
    category: 'Gün ve Kategori',
    context: 'Bir gazetenin Pazartesi, Salı ve Çarşamba günkü sayfalarında Ekonomi, Spor ve Magazin kategorilerinde yazan Ali, Berk ve Can’ın yazıları yayımlanmıştır.',
    premises: [
      'Can’ın yazısı, Berk’in yazısından bir sonraki gün yayımlanmıştır.',
      'Ekonomi yazısı Salı günü yayımlanmıştır.',
      'Ali, Magazin kategorisinde yazmaktadır.',
      'Berk, Ekonomi kategorisinde yazmamaktadır.'
    ],
    questionStem: 'Buna göre Pazartesi günü hangi yazarın, hangi kategorideki yazısı yayımlanmıştır?',
    options: [
      { letter: 'A', text: 'Berk - Spor', isCorrect: true },
      { letter: 'B', text: 'Ali - Magazin', isCorrect: false },
      { letter: 'C', text: 'Can - Ekonomi', isCorrect: false },
      { letter: 'D', text: 'Berk - Ekonomi', isCorrect: false }
    ],
    resultText: 'Pazartesi günü Berk’in Spor kategorisindeki yazısı yayımlanmıştır. Salı: Can (Ekonomi), Çarşamba: Ali (Magazin).',
    matrix: {
      title: 'Gün - Yazar - Kategori Matrisi',
      headers: ['Günler', 'Yazar', 'Kategori', 'Analiz'],
      rows: [
        ['Pazartesi', 'Berk', 'Spor', 'Can’dan önceki gün, Ekonomi yazamaz'],
        ['Salı', 'Can', 'Ekonomi', 'Berk’ten sonraki gün ve Ekonomi kesin bilgi'],
        ['Çarşamba', 'Ali', 'Magazin', 'Kalan tek gün ve Ali’nin alanı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Can, Berk'ten bir sonraki gün' [Berk - Can] bloğu verir (Pzt-Salı veya Salı-Çar)." },
      { step: 2, title: 'Kesin Veriyi Yerleştir', content: 'Salı günü Ekonomi yazısı yayımlanır.' },
      { step: 3, title: 'Yazar ve Kategori Eşleştirme', content: 'Berk Ekonomi yazmadığı için Salı olamaz. [Berk - Can] bloğu mecburen Pazartesi - Salı olur.' },
      { step: 4, title: 'Kalanları Dağıt', content: 'Ali Çarşamba günü Magazin yazar. Pazartesi’ye Berk ve Spor kategorisi kalır.' }
    ],
    neuralBrake: "'Bir sonraki gün' ardışıklık sağlar. Berk'in Ekonomi yazmaması Salı olma ihtimalini sıfırlar.",
    cognitiveTime: '45 saniye',
    synapticCoding: 'B → C ve A = M kısaltmalarıyla tabloyu doldur.'
  },
  {
    id: 2005,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 5,
    title: 'Kargo Teslimat Rotası',
    category: 'Sıralama ve Mekân',
    context: 'Bir kargo aracı A, B, C, D ve E mahallelerine sırasıyla uğrayarak paket teslimatı yapacaktır.',
    premises: [
      'C mahallesi, A mahallesinden hemen sonraki duraktır.',
      'D mahallesine, B mahallesinden daha önce uğranmıştır.',
      'E mahallesi, teslimatın yapıldığı ne ilk ne de son duraktır.',
      'B mahallesi 3. duraktır.'
    ],
    questionStem: 'Buna göre teslimatın yapıldığı 5. (son) durak hangi mahalledir?',
    options: [
      { letter: 'A', text: 'A mahallesi', isCorrect: false },
      { letter: 'B', text: 'C mahallesi', isCorrect: true },
      { letter: 'C', text: 'D mahallesi', isCorrect: false },
      { letter: 'D', text: 'E mahallesi', isCorrect: false }
    ],
    resultText: 'Teslimatın yapıldığı 5. durak C mahallesidir. Rota: D (1) – E (2) – B (3) – A (4) – C (5).',
    matrix: {
      title: 'Kargo Rota Matrisi',
      headers: ['Durak No', 'Mahalle', 'Analiz'],
      rows: [
        ['1', 'D', 'B’den önce olmalı, E olamaz'],
        ['2', 'E', 'İlk veya son olamaz kısıtı'],
        ['3', 'B', 'Kesin Bilgi'],
        ['4', 'A', 'A-C bloğunun başı'],
        ['5', 'C', 'A’dan hemen sonraki durak']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Sabitle', content: 'B mahallesi 3. duraktır. Rota 1-2 ve 4-5 olarak ikiye bölünür.' },
      { step: 2, title: 'Kısıtlamayı Uygula', content: 'E ilk veya son durak değilse 2 veya 4 olabilir.' },
      { step: 3, title: 'Blok Yerleştirme', content: "'C, A'dan hemen sonradır' [A - C] bloğu verir. E 4 olursa [A-C]'ye yer kalmaz. Bu yüzden E 2. duraktır; [A-C] 4 ve 5. duraklara yerleşir." },
      { step: 4, title: 'Sıralamayı Tamamla', content: '1. durağa D kalır (D < B kuralı da 1 < 3 olarak sağlanır). 5. durak C olur.' }
    ],
    neuralBrake: "'Ne ilk ne son' ifadesi 5 duraklı soruda değişkeni 2 veya 4'e hapseder.",
    cognitiveTime: '35-45 saniye',
    synapticCoding: 'A → C bloğunu bütün düşün ve D < B ilişkisini not al.'
  },
  {
    id: 2006,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 6,
    title: 'Okul Kulüpleri',
    category: 'Günler ve Kontenjan',
    context: 'Arda, Berk, Can, Deniz ve Elif; Pazartesi, Salı ve Çarşamba günleri Satranç, Müzik ve Tiyatro kulüplerine katılmıştır.',
    premises: [
      'Her kulübe en az bir, en fazla iki kişi katılmıştır.',
      'Arda ve Berk, aynı gün farklı kulüplere katılmışlardır.',
      'Pazartesi günü sadece Müzik kulübü etkinliği vardır ve bir kişi katılmıştır.',
      'Deniz ve Elif, Çarşamba günü aynı kulübün etkinliğine katılmışlardır.',
      'Can, Satranç kulübüne Salı günü katılmıştır.'
    ],
    questionStem: 'Buna göre Pazartesi günü Müzik kulübüne katılan kişi kimdir?',
    options: [
      { letter: 'A', text: 'Can', isCorrect: false },
      { letter: 'B', text: 'Arda veya Berk', isCorrect: true },
      { letter: 'C', text: 'Deniz', isCorrect: false },
      { letter: 'D', text: 'Elif', isCorrect: false }
    ],
    resultText: 'Pazartesi günü Müzik kulübüne Arda veya Berk katılmıştır.',
    matrix: {
      title: 'Kulüp ve Gün Dağılım Matrisi',
      headers: ['Gün', 'Kişi(ler)', 'Kulüp', 'Kontenjan / Analiz'],
      rows: [
        ['Pazartesi', 'Arda (veya Berk)', 'Müzik', 'Kontenjan: 1 Kişi'],
        ['Salı', 'Can', 'Satranç', 'Kesin Bilgi'],
        ['Salı', 'Berk (veya Arda)', 'Tiyatro', 'Farklı kulüp kuralı'],
        ['Çarşamba', 'Deniz & Elif', 'Tiyatro', 'Müzik Pzt idi, Max 2 kişi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veri ve Kontenjan', content: 'Pazartesi sadece Müzik var ve 1 kişi. Çarşamba Deniz ve Elif aynı kulüpte.' },
      { step: 2, title: 'Blok Yerleştirme', content: 'Arda ve Berk aynı gün ama farklı kulüptedir.' },
      { step: 3, title: 'Eşleştirme', content: 'Can Salı günü Satranç’tadır.' },
      { step: 4, title: 'Sonuç Çıkarımı', content: 'Pazartesi gününün 1 kişilik kontenjanı Arda veya Berk ikilisinden birine kalır.' }
    ],
    neuralBrake: "'Sadece bir kişi' ve 'Aynı gün' öncülleri çakıştığında kontenjan sınırlarını dikkatle takip et.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'D = E (Çarşamba) ve A = B (Aynı Gün) şeklinde grupla.'
  },
  {
    id: 2007,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 7,
    title: 'Müze Gezisi',
    category: 'Sıralama ve Ücretler',
    context: 'Arif, Burcu, Ceylan ve Doruk bir müzeye giriş yapacaktır. Öğrenci bileti 20 TL, tam bilet 50 TL’dir.',
    premises: [
      'Toplamda iki kişi öğrenci, iki kişi tam biletle giriş yapmıştır.',
      'Arif, müzeye ilk sırada giren kişidir ve Doruk’tan daha az ücret ödemiştir.',
      'Ceylan, müzeye son sırada giren kişidir.',
      'Burcu ve Ceylan aynı ücreti ödemişlerdir.'
    ],
    questionStem: 'Buna göre Doruk kaçıncı sırada giriş yapmıştır ve ödediği ücret ne kadardır?',
    options: [
      { letter: 'A', text: '2 veya 3. sırada, 50 TL (Tam bilet)', isCorrect: true },
      { letter: 'B', text: '1. sırada, 20 TL', isCorrect: false },
      { letter: 'C', text: '4. sırada, 50 TL', isCorrect: false },
      { letter: 'D', text: '2. sırada, 20 TL', isCorrect: false }
    ],
    resultText: 'Doruk 2 veya 3. sırada giriş yapmıştır ve 50 TL (Tam bilet) ödemiştir.',
    matrix: {
      title: 'Müze Sıra ve Bilet Matrisi',
      headers: ['Giriş Sırası', 'Kişi', 'Ücret Tipi', 'Tutar'],
      rows: [
        ['1. Sıra', 'Arif', 'Öğrenci', '20 TL'],
        ['2. Sıra', 'Burcu', 'Tam', '50 TL'],
        ['3. Sıra', 'Doruk', 'Tam', '50 TL'],
        ['4. Sıra', 'Ceylan', 'Tam', '50 TL']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Sıralamayı Sabitle', content: 'Arif 1. sırada, Ceylan 4. (son) sıradadır. 2 ve 3. sıralar Burcu ve Doruk arasındadır.' },
      { step: 2, title: 'Ücret Kıyaslaması', content: 'Arif Doruk’tan daha az ödediyse Arif Öğrenci (20 TL), Doruk Tam (50 TL) bilet alır.' },
      { step: 3, title: 'Kontenjan Takibi', content: '2 öğrenci, 2 tam bilet dengesini gözetiriz.' },
      { step: 4, title: 'Sonuç', content: 'Doruk 2. veya 3. sırada girmiş ve 50 TL ödemiştir.' }
    ],
    neuralBrake: "'Daha az ücret ödemiştir' ifadesi birinin 20, diğerinin 50 ödediğini kesinleştirir.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'A < D (Ücret) ve B = C notlarını al.'
  },
  {
    id: 2008,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 8,
    title: 'Sinema Salonu',
    category: 'Koordinatlı Yerleşim',
    context: 'Bir sinema salonundaki A, B ve C sıralarında 1, 2 ve 3 numaralı koltuklara Emre, Fatma, Gökhan, Hale ve Işık oturacaktır (A en ön, C en arka sıradır).',
    premises: [
      'Her koltukta en fazla bir kişi oturmaktadır ve bazı koltuklar boştur.',
      'Emre ve Fatma, aynı sırada ve yan yana oturmaktadırlar.',
      'Gökhan, en arka sıradaki tek kişidir ve sıranın tam ortasındadır.',
      'Hale, Emre’nin hemen arkasındaki koltukta oturmaktadır.',
      'Işık, en ön sıradaki koltuklardan birinde oturmaktadır.'
    ],
    questionStem: 'Buna göre boş kalan koltuklar hangileridir?',
    options: [
      { letter: 'A', text: 'B2, B3, C1 ve C3', isCorrect: true },
      { letter: 'B', text: 'A1, B2, C1 ve C2', isCorrect: false },
      { letter: 'C', text: 'A3, B1, C2 ve C3', isCorrect: false },
      { letter: 'D', text: 'B1, B2, C2 ve C3', isCorrect: false }
    ],
    resultText: 'Boş kalan koltuklar B2, B3, C1 ve C3’tür.',
    matrix: {
      title: '3x3 Koltuk Izgarası Matrisi',
      headers: ['Sıra / No', '1 (Sol)', '2 (Orta)', '3 (Sağ)'],
      rows: [
        ['A (Ön Sıra)', 'Emre', 'Fatma', 'Işık'],
        ['B (Orta Sıra)', 'Hale (Emre arkası)', 'BOŞ', 'BOŞ'],
        ['C (Arka Sıra)', 'BOŞ', 'Gökhan (Tek kişi)', 'BOŞ']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Sabitle', content: 'Gökhan en arka sırada (C) tam ortadadır (C2). C1 ve C3 boştur.' },
      { step: 2, title: 'Dikey Blok Kur', content: 'Hale, Emre’nin hemen arkasındadır [Emre / Hale]. Emre A’da, Hale B’dedir.' },
      { step: 3, title: 'Yatay Blok Kur', content: 'Emre ve Fatma aynı sırada yan yanadır. İkisi de A sırasındadır.' },
      { step: 4, title: 'Son Yerleşim ve Eleme', content: 'Işık en ön sıradadır (A3). B2, B3, C1 ve C3 boş kalır.' }
    ],
    neuralBrake: "'Hemen arkasında' aynı sütunda bir alt satıra geçmektir. 'Yan yana' aynı satırda komşu sütundur.",
    cognitiveTime: '50 saniye',
    synapticCoding: 'E ↔ F (Yatay), E ↑ H (Dikey) sembollerini kullan.'
  },
  {
    id: 2009,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 9,
    title: 'Ofis Hediye Çekilişi',
    category: 'Eşleştirme',
    context: 'Aras, Beren, Ceyda ve Deniz isimli dört arkadaş kendi aralarında hediye çekilişi yapmışlardır. Alınan hediyeler; Kitap, Saat, Cüzdan ve Kalem’dir.',
    premises: [
      'Hiç kimse kendine hediye almamıştır.',
      'Aras, Ceyda’ya hediye almıştır; ancak bu hediye Kitap değildir.',
      'Deniz, kendisine hediye alan kişiye Saat almıştır.',
      'Beren’e alınan hediye Kalem’dir.'
    ],
    questionStem: 'Buna göre Ceyda kime, hangi hediyeyi almıştır?',
    options: [
      { letter: 'A', text: 'Aras’a Kitap almıştır.', isCorrect: true },
      { letter: 'B', text: 'Deniz’e Saat almıştır.', isCorrect: false },
      { letter: 'C', text: 'Beren’e Kalem almıştır.', isCorrect: false },
      { letter: 'D', text: 'Aras’a Cüzdan almıştır.', isCorrect: false }
    ],
    resultText: 'Ceyda, Aras’a Kitap almıştır. Aras Ceyda’ya Cüzdan, Deniz Beren’e Kalem, Beren Deniz’e Saat almıştır.',
    matrix: {
      title: 'Hediye Eşleştirme Takip Matrisi',
      headers: ['Hediyeyi Veren', 'Hediyeyi Alan', 'Alınan Hediye', 'Analiz'],
      rows: [
        ['Aras', 'Ceyda', 'Cüzdan', 'Kitap ve Kalem olamaz kuralı'],
        ['Ceyda', 'Aras', 'Kitap', 'Karşılıklılık kuralı gereği'],
        ['Deniz', 'Beren', 'Kalem', 'Beren’e alınan Kalem'],
        ['Beren', 'Deniz', 'Saat', 'Deniz’e hediye alan kişiden gelen Saat']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veri ve Blok', content: 'Aras → Ceyda eşleşmesi kesin. Aras’ın aldığı hediye Kitap değil.' },
      { step: 2, title: 'Döngüyü Tespit Et', content: "'Deniz kendisine alana Saat aldı' ifadesi çift taraflı hediyeleşmeyi gösterir. Bu ikili Deniz ve Beren’dir." },
      { step: 3, title: 'Hediyeleri Dağıt', content: 'Beren’e alınan Kalem’dir (Deniz almıştır). Beren Deniz’e Saat almıştır.' },
      { step: 4, title: 'Son Eleme', content: 'Geriye Aras ve Ceyda kalır. Aras Ceyda’ya Cüzdan, Ceyda Aras’a Kitap almıştır.' }
    ],
    neuralBrake: "'Kendisine hediye alan kişiye hediye almak' 4 kişilik grupta ikişerli kapalı devreler oluşturur.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'D ↔ B ve A ↔ C eşleşmelerini not al.'
  },
  {
    id: 2010,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 10,
    title: 'Kütüphane Rafı',
    category: 'Sayısal Mantık ve Yerleşim',
    context: '60 cm genişliğindeki rafa; kalınlığı 10 cm olan Tarih (T) kitapları ile 15 cm olan Bilim (B) kitapları dizilecektir. Toplam 5 kitap tam sığmıştır.',
    premises: [
      'Rafa en az bir adet Tarih ve en az bir adet Bilim kitabı konulmuştur.',
      'Raftaki kitapların tam ortasında bir Bilim kitabı bulunmaktadır.',
      'Aynı türden kitaplar yan yana dizilmemiştir.'
    ],
    questionStem: 'Buna göre rafın en solundaki ve en sağındaki kitapların türü nedir?',
    options: [
      { letter: 'A', text: 'Sol: Bilim, Sağ: Bilim', isCorrect: true },
      { letter: 'B', text: 'Sol: Tarih, Sağ: Tarih', isCorrect: false },
      { letter: 'C', text: 'Sol: Bilim, Sağ: Tarih', isCorrect: false },
      { letter: 'D', text: 'Sol: Tarih, Sağ: Bilim', isCorrect: false }
    ],
    resultText: 'Dizilim kuralına (aynı türler yan yana gelmez ve orta Bilim) göre Sol: Bilim, Sağ: Bilim olur (B T B T B).',
    matrix: {
      title: 'Raf Kalınlık ve Sıra Matrisi',
      headers: ['Sıra', 'Tür', 'Kalınlık', 'Kural'],
      rows: [
        ['1. Kitap (Sol)', 'Bilim', '15 cm', 'Zıt dizilim başı'],
        ['2. Kitap', 'Tarih', '10 cm', 'Yan yana gelmeme kuralı'],
        ['3. Kitap (Orta)', 'Bilim', '15 cm', 'Kesin Bilgi'],
        ['4. Kitap', 'Tarih', '10 cm', 'Yan yana gelmeme kuralı'],
        ['5. Kitap (Sağ)', 'Bilim', '15 cm', 'Zıt dizilim sonu']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Sayısal Denklem', content: 'x*10 + y*15 = 60 ve x + y = 5.' },
      { step: 2, title: 'Kesin Veriyi Yerleştir', content: 'Ortadaki 3. kitap Bilim kitabıdır: _ _ B _ _' },
      { step: 3, title: 'Yan Yana Gelmeme Kuralı', content: 'Aynı türler yan yana değilse 2. ve 4. kitaplar Tarih olmalıdır: _ T B T _' },
      { step: 4, title: 'Boşlukları Doldur', content: '1. ve 5. sıralara Bilim kitapları yerleşir: B T B T B.' }
    ],
    neuralBrake: "Mantık sorularında sözel dizilim kuralı önceliklidir.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'B _ B _ B kalıbını çizerek zıt dizilimi sağla.'
  },
  {
    id: 2011,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 11,
    title: 'Hastane Randevu Sistemi',
    category: 'Zaman Çizelgesi',
    context: 'Dr. Selim’in Pazartesi günü 09:00, 10:00, 11:00 ve 12:00 saatlerinde dört farklı hastası (Aylin, Burak, Cemil, Damla) randevu almıştır.',
    premises: [
      'Cemil’in randevusu, Aylin’den hemen önceki bir saatte değildir.',
      'Burak’ın randevusu, Damla’dan sonradır.',
      'Aylin’in randevusu saat 10:00’dadır.'
    ],
    questionStem: 'Buna göre saat 09:00 ve 12:00 randevuları sırasıyla kime aittir?',
    options: [
      { letter: 'A', text: '09:00 Damla, 12:00 Cemil', isCorrect: true },
      { letter: 'B', text: '09:00 Burak, 12:00 Damla', isCorrect: false },
      { letter: 'C', text: '09:00 Cemil, 12:00 Burak', isCorrect: false },
      { letter: 'D', text: '09:00 Damla, 12:00 Burak', isCorrect: false }
    ],
    resultText: 'Saat 09:00 randevusu Damla’ya, 12:00 randevusu ise Cemil’e aittir.',
    matrix: {
      title: 'Randevu Zaman Tablosu',
      headers: ['Saat', 'Hasta Adı', 'Analiz'],
      rows: [
        ['09:00', 'Damla', 'Burak’tan önce olmalı, Cemil olamaz'],
        ['10:00', 'Aylin', 'Kesin Bilgi'],
        ['11:00', 'Burak', 'Damla’dan sonra'],
        ['12:00', 'Cemil', 'Aylin’in hemen önünde olamaz kuralı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Sabitle', content: 'Aylin’in 10:00 randevusu kesin.' },
      { step: 2, title: 'Hiyerarşiyi Kur', content: 'Damla < Burak (Damla Burak’tan önce).' },
      { step: 3, title: 'Olumsuz Öncülü Değerlendir', content: 'Cemil Aylin’den hemen önce (09:00) olamaz. Cemil 09:00 olamayacağına göre 09:00 Damla’nındır.' },
      { step: 4, title: 'Olasılıkları Birleştir', content: '09:00 Damla olunca Burak 11:00, Cemil 12:00 olur.' }
    ],
    neuralBrake: "'Hemen önceki değildir' ifadesi o boşluğu başkasının doldurması gerektiğini gösterir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Saatleri yukarıdan aşağıya dizerek ele.'
  },
  {
    id: 2012,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 12,
    title: 'Market Reyonları',
    category: 'Ürün Yerleşimi',
    context: 'Bir markette Temizlik, Gıda, Kırtasiye ve Kozmetik reyonları alt alta ikişerli konumlandırılmıştır (Sol-Sağ sütunlar, Üst-Alt sıralar).',
    premises: [
      'Gıda reyonu, Temizlik reyonunun hemen altındadır.',
      'Kırtasiye reyonu, Gıda reyonunun yanında değildir.',
      'Kozmetik reyonu sağ taraftaki sütunda yer almaktadır.'
    ],
    questionStem: 'Buna göre sol taraftaki alt reyon hangisidir?',
    options: [
      { letter: 'A', text: 'Temizlik', isCorrect: false },
      { letter: 'B', text: 'Gıda', isCorrect: true },
      { letter: 'C', text: 'Kozmetik', isCorrect: false },
      { letter: 'D', text: 'Kırtasiye', isCorrect: false }
    ],
    resultText: 'Sol taraftaki alt reyon Gıda reyonudur. Üst-Sol: Temizlik, Alt-Sol: Gıda, Üst-Sağ: Kırtasiye, Alt-Sağ: Kozmetik.',
    matrix: {
      title: 'Market Reyon Matrisi',
      headers: ['Sütun', 'Üst Sıra', 'Alt Sıra', 'Analiz'],
      rows: [
        ['SOL', 'Temizlik', 'Gıda', 'Dikey blok SOL sütunu doldurur'],
        ['SAĞ', 'Kırtasiye', 'Kozmetik', 'Kırtasiye Gıda yanında olamaz']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Dikey Bloğu Kur', content: "'Gıda, Temizlik reyonunun hemen altında' dikey bir blok verir [Temizlik / Gıda]." },
      { step: 2, title: 'Sütun Belirle', content: "Kozmetik reyonu sağdaysa, dikey blok mecburen SOL sütunu doldurur." },
      { step: 3, title: 'Konumlandırma', content: "Üst-Sol = Temizlik, Alt-Sol = Gıda olur." },
      { step: 4, title: 'Kısıtlamayı Kontrol Et', content: "Kırtasiye Gıda’nın yanında değilse Sağ-Üstte olur. Kozmetik Sağ-Alta yerleşir." }
    ],
    neuralBrake: "'Yanında değildir' ifadesi çapraz veya alt-üst ilişkileri zorunlu kılar.",
    cognitiveTime: '30 saniye',
    synapticCoding: '2x2 kare çizip sütunları Sol-Sağ diye ayır.'
  },
  {
    id: 2013,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 13,
    title: 'Seyahat Acentesi',
    category: 'Otel ve Hizmet Seçimi',
    context: 'Aslı, Banu ve Can; A, B, C, D ve E otellerinden birine rezervasyon yapacaktır.',
    premises: [
      'A ve B otelleri: Deniz Manzaralı ve Havuzlu.',
      'C ve D otelleri: Havuzlu ve Her Şey Dahil.',
      'E oteli: Sadece Deniz Manzaralı.',
      'Herkes farklı bir otel seçmiştir.',
      'Aslı, hem Havuz hem de Deniz Manzarası olan bir otel seçmiştir.',
      'Banu’nun seçtiği otelde Deniz Manzarası yoktur ancak Her Şey Dahil konsepti vardır.',
      'Can, Aslı ile aynı ortak özelliği (sadece Havuz) taşıyan ancak Deniz Manzarası olmayan bir otel seçmiştir.'
    ],
    questionStem: 'Buna göre Can hangi oteli seçmiş olabilir?',
    options: [
      { letter: 'A', text: 'A veya B oteli', isCorrect: false },
      { letter: 'B', text: 'C veya D oteli', isCorrect: true },
      { letter: 'C', text: 'Yalnız E oteli', isCorrect: false },
      { letter: 'D', text: 'Yalnız B oteli', isCorrect: false }
    ],
    resultText: 'Can, C veya D otellerinden birini seçmiştir.',
    matrix: {
      title: 'Otel ve Özellik Matrisi',
      headers: ['Kişi', 'Seçtiği Otel', 'Özellikler'],
      rows: [
        ['Aslı', 'A veya B', 'Deniz Manzarası + Havuz'],
        ['Banu', 'C veya D', 'Havuz + Her Şey Dahil (Deniz yok)'],
        ['Can', 'C veya D', 'Sadece Havuz ortak (Deniz yok)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Karakter Analizi', content: 'Aslı Deniz + Havuz seçmiş (A veya B).' },
      { step: 2, title: 'Eleme Yöntemi', content: 'Banu Deniz istemiyor, Her Şey Dahil istiyor (C veya D).' },
      { step: 3, title: 'Ortak Özellik Tespiti', content: 'Can’da Deniz Manzarası yok, Havuz var.' },
      { step: 4, title: 'Son Karar', content: 'Havuzu olan ama Deniz Manzarası olmayan oteller C ve D’dir. Can C veya D’yi seçmiştir.' }
    ],
    neuralBrake: "'Ortak özellik' ifadesi Can’ın Aslı ile sadece Havuz özelliğini paylaştığını gösterir.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Otel özelliklerini (+) ve (-) tablosuna dök.'
  },
  {
    id: 2014,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 14,
    title: 'Kütüphane Takip Sistemi',
    category: 'Zaman ve Kişi',
    context: 'Arda, Belma, Cansu ve Demir; Pazartesi, Salı, Çarşamba ve Perşembe günleri birer kitap ödünç almışlardır.',
    premises: [
      'Demir, kitabını Cansu’dan daha sonraki bir günde almıştır.',
      'Arda, kitabını Belma’dan hemen sonraki günde almıştır.',
      'Cansu, kitabını Salı günü almıştır.'
    ],
    questionStem: 'Buna göre Perşembe günü kitabı kim almıştır?',
    options: [
      { letter: 'A', text: 'Arda', isCorrect: false },
      { letter: 'B', text: 'Belma', isCorrect: false },
      { letter: 'C', text: 'Demir', isCorrect: true },
      { letter: 'D', text: 'Cansu', isCorrect: false }
    ],
    resultText: 'Perşembe günü kitabı Demir almıştır. Günler: Pazartesi Belma, Salı Cansu, Çarşamba Arda, Perşembe Demir.',
    matrix: {
      title: 'Gün ve Öğrenci Takip Çizelgesi',
      headers: ['Günler', 'Öğrenci Adı', 'Analiz'],
      rows: [
        ['Pazartesi', 'Belma', 'Arda’dan hemen önceki gün kuralı'],
        ['Salı', 'Cansu', 'Kesin Bilgi'],
        ['Çarşamba', 'Arda', 'Belma’dan sonraki gün'],
        ['Perşembe', 'Demir', 'Cansu’dan sonra kalan tek gün']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Sabitle', content: 'Cansu Salı günüdür.' },
      { step: 2, title: 'Blok Oluşturma', content: "'Arda Belma'dan hemen sonra' [Belma - Arda] bloğu verir." },
      { step: 3, title: 'Boşluk Analizi', content: 'Cansu Salı günü olduğunda ardışık iki gün Çarşamba-Perşembe veya Pzt-Çarşamba kurgulanır.' },
      { step: 4, title: 'Son Yerleşim', content: "Demir Cansu'dan (Salı) sonra olacağından Perşembe günü Demir’e kalır." }
    ],
    neuralBrake: "'Hemen sonraki gün' ifadesi araya başka kesin bilginin girmesi durumunda dikkat gerektirir.",
    cognitiveTime: '30-40 saniye',
    synapticCoding: 'Günleri yan yana yazarak isimleri eşleştir.'
  },
  {
    id: 2015,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 15,
    title: 'Koşu Yarışması',
    category: 'Dereceler ve Sıralama',
    context: 'Arda, Burcu, Cenk, Derya ve Elif’in katıldığı bir koşu yarışmasında bitiş çizgisine varış sıraları belirlenmiştir.',
    premises: [
      'Yarışmada Cenk ne birinci ne de sonuncu olmuştur.',
      'Burcu, yarışı Derya’dan hemen sonra, Arda’dan ise hemen önce bitirmiştir.',
      'Elif, yarışı Cenk’ten daha sonra bitirmiştir.'
    ],
    questionStem: 'Buna göre yarışı birinci bitiren kişi kimdir?',
    options: [
      { letter: 'A', text: 'Arda', isCorrect: false },
      { letter: 'B', text: 'Burcu', isCorrect: false },
      { letter: 'C', text: 'Derya', isCorrect: true },
      { letter: 'D', text: 'Cenk', isCorrect: false }
    ],
    resultText: 'Yarışı birinci bitiren kişi Derya’dır. Sıralama: 1: Derya, 2: Burcu, 3: Arda, 4: Cenk, 5: Elif.',
    matrix: {
      title: 'Koşu Derece Matrisi',
      headers: ['Derece', 'İsim', 'Analiz'],
      rows: [
        ['1.', 'Derya', 'Blok başı ve Cenk kısıtı'],
        ['2.', 'Burcu', 'Derya’dan hemen sonra'],
        ['3.', 'Arda', 'Burcu’dan hemen sonra'],
        ['4.', 'Cenk', 'Ne 1. ne 5., Elif’ten önce'],
        ['5.', 'Elif', 'Cenk’ten sonra bitiren son kişi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Burcu Derya'dan hemen sonra, Arda'dan hemen önce' [Derya - Burcu - Arda] üçlü bloğunu verir." },
      { step: 2, title: 'Olası Yerleşimler', content: 'Üçlü blok (1-2-3), (2-3-4) veya (3-4-5) olabilir.' },
      { step: 3, title: 'Kısıtlamaları Uygula', content: 'Cenk 1. ve 5. olamaz. Blok (2-3-4) olsaydı Cenk mecburen 5. olurdu (İptal).' },
      { step: 4, title: 'Sonuç Çıkarımı', content: 'Tek ihtimal bloğun (1-2-3) olmasıdır. 1. bitiren Derya olur.' }
    ],
    neuralBrake: "'Ne birinci ne sonuncu' ifadesi 5 kişilik grupta o kişiyi 2, 3 veya 4. sıraya hapseder.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Üçlü blokları (D-B-A) tek parça hareket ettir.'
  },
  {
    id: 2016,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 16,
    title: 'Kafeterya Siparişleri',
    category: 'Sıra ve Ürün',
    context: 'Ali, Banu, Can ve Doğa bir kafeteryada sırayla sipariş vermiştir. Ürünler: İki adet Kahve, bir Çay, bir Limonata.',
    premises: [
      'Banu, Ali’den hemen sonra sipariş vermiştir.',
      'Limonata siparişi, Çay siparişinden hemen önce verilmiştir.',
      'Can, 3. sırada sipariş vermiştir ve siparişi Kahve’dir.',
      'Doğa, Kahve siparişi vermemiştir.'
    ],
    questionStem: 'Buna göre 1. sırada sipariş veren kimdir ve ne sipariş etmiştir?',
    options: [
      { letter: 'A', text: 'Doğa - Limonata', isCorrect: true },
      { letter: 'B', text: 'Ali - Çay', isCorrect: false },
      { letter: 'C', text: 'Banu - Kahve', isCorrect: false },
      { letter: 'D', text: 'Doğa - Çay', isCorrect: false }
    ],
    resultText: '1. sırada sipariş veren Doğa’dır ve siparişi Limonata’dır. Sıralama: 1: Doğa (Limonata), 2: Ali (Çay), 3: Can (Kahve), 4: Banu (Kahve).',
    matrix: {
      title: 'Sipariş ve Ürün Takip Tablosu',
      headers: ['Sıra', 'İsim', 'Sipariş', 'Analiz'],
      rows: [
        ['1.', 'Doğa', 'Limonata', 'Kahve içmediyse L-Ç bloğu başı'],
        ['2.', 'Ali', 'Çay', 'Banu’dan hemen önce'],
        ['3.', 'Can', 'Kahve', 'Kesin Bilgi'],
        ['4.', 'Banu', 'Kahve', 'Ali’den sonra kalan tek yer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veri', content: 'Can 3. sıradadır ve Kahve almıştır.' },
      { step: 2, title: 'Blok Oluşturma', content: 'Kişi bloğu [Ali - Banu], ürün bloğu [Limonata - Çay].' },
      { step: 3, title: 'Yerleştirme', content: 'Doğa kahve içmemişse Çay veya Limonata içmiştir. Doğa 1. sırada Limonata içerse 2. sırada Çay olur.' },
      { step: 4, title: 'Sonuç', content: '1. sırada sipariş veren Doğa’dır ve siparişi Limonata’dır.' }
    ],
    neuralBrake: "'Hemen sonra' ifadesini Can’ın 3. sıradaki sabitliği ile birlikte değerlendir.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Ürün sayılarını (2K, 1Ç, 1L) tablonun yanına yaz.'
  },
  {
    id: 2017,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 17,
    title: 'Apartman Katları',
    category: 'Dikey Yerleşim',
    context: 'Bir apartmanın 1, 2, 3 ve 4. katlarında Arzu, Burak, Ceyda ve Deniz oturmaktadır.',
    premises: [
      'Arzu, Ceyda’nın hemen üstündeki katta oturmaktadır.',
      'Deniz, 2. katta oturmamaktadır.',
      'Burak, en alt katta oturmamaktadır.',
      'Ceyda, Burak’tan daha üst bir katta oturmaktadır.'
    ],
    questionStem: 'Buna göre 4. katta kim oturmaktadır?',
    options: [
      { letter: 'A', text: 'Arzu', isCorrect: true },
      { letter: 'B', text: 'Burak', isCorrect: false },
      { letter: 'C', text: 'Ceyda', isCorrect: false },
      { letter: 'D', text: 'Deniz', isCorrect: false }
    ],
    resultText: '4. katta Arzu oturmaktadır. Katlar: 4: Arzu, 3: Ceyda, 2: Burak, 1: Deniz.',
    matrix: {
      title: 'Apartman Dikey Matrisi',
      headers: ['Kat No', 'İsim', 'Analiz'],
      rows: [
        ['4', 'Arzu', 'A-C bloğunun üstü'],
        ['3', 'Ceyda', 'Arzu’nun hemen altı, Burak’ın üstü'],
        ['2', 'Burak', 'En alt kat kısıtı ve Ceyda’nın altı'],
        ['1', 'Deniz', '2. kat kısıtı ve kalan tek yer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Arzu Ceyda'nın hemen üstünde' [Ceyda / Arzu] bloğunu verir." },
      { step: 2, title: 'Hiyerarşiyi Kur', content: 'Burak < Ceyda < Arzu.' },
      { step: 3, title: 'Kısıtlamaları Uygula', content: 'Burak 1’de değilse ve üstünde iki kişi varsa mecburen 2. kattadır.' },
      { step: 4, title: 'Son Yerleşim', content: 'Burak 2, Ceyda 3, Arzu 4 olur. Deniz 1. kata kalır.' }
    ],
    neuralBrake: "'Hemen üstünde' ile 'daha üstünde' farkına dikkat et!",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Katları 4-3-2-1 şeklinde dikey yaz.'
  },
  {
    id: 2018,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 18,
    title: 'Elektronik Mağazası',
    category: 'Sayısal Gruplandırma',
    context: 'Bir mağazada X, Y ve Z markalarına ait 6 adet bilgisayar bulunmaktadır (3 Laptop, 3 Masaüstü).',
    premises: [
      'Her markadan en az bir adet bilgisayar bulunmaktadır.',
      'X markasından toplam 3 adet bilgisayar vardır ve bunların hepsi aynı türdür.',
      'Y markasından sadece 1 adet bilgisayar vardır ve türü Laptop’tur.',
      'Z markasına ait bilgisayarların türleri birbirinden farklıdır.'
    ],
    questionStem: 'Buna göre Z markasına ait Laptop bilgisayar var mıdır ve X markasının bilgisayar türü nedir?',
    options: [
      { letter: 'A', text: 'Z markasına ait 1 Laptop vardır, X’in tüm bilgisayarları Masaüstü’dür.', isCorrect: true },
      { letter: 'B', text: 'Z markasına ait Laptop yoktur, X Laptop’tur.', isCorrect: false },
      { letter: 'C', text: 'X ve Z sadece Laptop satmaktadır.', isCorrect: false },
      { letter: 'D', text: 'Z markasına ait 2 Masaüstü vardır.', isCorrect: false }
    ],
    resultText: 'Z markasına ait 1 adet Laptop vardır. X markasının tüm bilgisayarları ise Masaüstü’dür.',
    matrix: {
      title: 'Stok ve Miktar Matrisi',
      headers: ['Marka', 'Toplam', 'Laptop', 'Masaüstü', 'Analiz'],
      rows: [
        ['X', '3', '0', '3', 'Hepsi aynı tür (Masaüstü)'],
        ['Y', '1', '1', '0', 'Kesin Bilgi (1 Laptop)'],
        ['Z', '2', '1', '1', 'Türleri farklı (1 Laptop, 1 Masaüstü)'],
        ['TOPLAM', '6', '3 (Dolu)', '3 (Dolu)', 'Stok dengesi sağlandı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Miktarları Belirle', content: 'Toplam 6 bilgisayar var. X (3) + Y (1) = 4. Geriye Z’ye 2 adet kalır.' },
      { step: 2, title: 'Türleri Dağıt (Z)', content: 'Z’nin türleri farklıysa biri Laptop, biri Masaüstü’dür.' },
      { step: 3, title: 'Kontenjan Takibi', content: 'Şu ana kadar 2 Laptop (Y:1, Z:1) ve 1 Masaüstü (Z:1) belirlendi.' },
      { step: 4, title: 'X’i Yerleştir', content: 'X’in 3 bilgisayarı da aynı tür. 3 Laptop olamazdı (toplam 5 ederdi). O halde X’in hepsi Masaüstü’dür.' }
    ],
    neuralBrake: "'Hepsi aynı tür' ifadesinde eldeki toplam kotanın tek marka tarafından aşılıp aşılamayacağını kontrol et.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'X:3, Y:1, Z:2 sayılarını kenara yaz.'
  },
  {
    id: 2019,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 19,
    title: 'Haftalık Ders Programı',
    category: 'Zamanlama',
    context: 'Matematik, Türkçe, Tarih ve Fen Bilimleri dersleri Pazartesi ve Salı günleri, sabah ve öğleden sonra işlenecektir.',
    premises: [
      'Her ders sadece bir kez işlenmektedir.',
      'Matematik dersi, Türkçe dersinden daha sonraki bir günde işlenecektir.',
      'Fen Bilimleri dersi, Tarih dersiyle aynı gün ancak farklı bir vakitte (sabah/öğle) işlenecektir.',
      'Salı günü öğleden sonra herhangi bir ders işlenmemiştir (boştur).'
    ],
    questionStem: 'Buna göre Pazartesi sabahı hangi ders işlenmiştir?',
    options: [
      { letter: 'A', text: 'Türkçe', isCorrect: true },
      { letter: 'B', text: 'Matematik', isCorrect: false },
      { letter: 'C', text: 'Fen Bilimleri', isCorrect: false },
      { letter: 'D', text: 'Tarih', isCorrect: false }
    ],
    resultText: 'Pazartesi sabahı Türkçe dersi işlenmiştir. Pazartesi: Türkçe (sabah), Matematik (öğle). Salı: Fen/Tarih (sabah), Boş (öğle).',
    matrix: {
      title: 'Zaman ve Vakit Matrisi',
      headers: ['Gün', 'Sabah', 'Öğleden Sonra', 'Analiz'],
      rows: [
        ['Pazartesi', 'Türkçe', 'Matematik', 'Türkçe Pazartesi sabah, Matematik öğle'],
        ['Salı', 'Fen / Tarih', 'BOŞ', 'Salı öğle boş kuralı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Boşluğu İşaretle', content: 'Salı öğleden sonra ders yoktur.' },
      { step: 2, title: 'Blok Yerleştirme', content: 'Fen ve Tarih aynı gün farklı vakitte işlenir. Salı öğle boşsa bu ikili Salı’ya sığmaz, Pazartesi veya esnetilmiş kurguda incelenir.' },
      { step: 3, title: 'Öncelik Kuralı', content: 'Matematik Türkçe’den sonraki bir gün/vakit olmalıdır. Türkçe Pazartesi sabahına oturur.' },
      { step: 4, title: 'Sonuç', content: 'Pazartesi sabahı Türkçe dersi işlenmiştir.' }
    ],
    neuralBrake: "'Aynı gün farklı vakit' o günün hem sabah hem öğle kotasını kapatır.",
    cognitiveTime: '45 saniye',
    synapticCoding: '2x2 matrisi (Pzt-Salı / Sabah-Öğle) doldur.'
  },
  {
    id: 2020,
    atolyeId: 2,
    atolyeTitle: 'Atölye 2: Stratejik Hamleler ve Matris Uygulamaları',
    questionNumber: 20,
    title: 'Mahalle Temsilciliği',
    category: 'Seçim Analizi',
    context: 'A, B ve C mahallelerinde yapılan temsilcilik seçimlerine Arzu, Berk ve Can aday olmuştur.',
    premises: [
      'Her mahallede farklı bir aday birinci olmuştur.',
      'Arzu, en çok oyu A mahallesinde almıştır.',
      'Can, B mahallesinde birinci olamamıştır.',
      'Berk, C mahallesinde birinci olmuştur.'
    ],
    questionStem: 'Buna göre adayların birinci olduğu mahalleler hangileridir?',
    options: [
      { letter: 'A', text: 'A: Can, B: Arzu, C: Berk', isCorrect: true },
      { letter: 'B', text: 'A: Arzu, B: Can, C: Berk', isCorrect: false },
      { letter: 'C', text: 'A: Berk, B: Arzu, C: Can', isCorrect: false },
      { letter: 'D', text: 'A: Can, B: Berk, C: Arzu', isCorrect: false }
    ],
    resultText: 'A Mahallesi Birincisi: Can, B Mahallesi Birincisi: Arzu, C Mahallesi Birincisi: Berk.',
    matrix: {
      title: 'Seçim Birincilik Çapraz Matrisi',
      headers: ['Adaylar', 'A Mahallesi', 'B Mahallesi', 'C Mahallesi'],
      rows: [
        ['Arzu', 'Elendi (2. oldu)', 'BİRİNCİ', 'Elendi'],
        ['Berk', 'Elendi', 'Elendi', 'BİRİNCİ (Kesin)'],
        ['Can', 'BİRİNCİ', 'Elendi (1. olamadı)', 'Elendi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Kilitle', content: 'Berk C mahallesinde birinci olmuştur. Berk C’yi kapatır.' },
      { step: 2, title: 'Kısıtlamayı Uygula', content: 'Can B’de birinci olamadıysa ve C kapalıysa Can için tek seçenek A mahallesidir.' },
      { step: 3, title: 'Çapraz Kontrol', content: 'Can A’da birinci, Berk C’de birinci ise Arzu B mahallesinde birinci olur.' },
      { step: 4, title: 'Nöral Fren ve Doğrulama', content: 'Arzu en çok oyu A’da almış olsa da Can’ın gerisinde (ikinci) kalmış olabilir. Tüm öncüller sağlanır.' }
    ],
    neuralBrake: "'Birinci oldu' ile 'en çok oyu X mahallesinde aldı' arasındaki farka düşme! Biri rakiplerine göredir, diğeri kendi içindedir.",
    cognitiveTime: '25 saniye',
    synapticCoding: '3x3 tabloda X ve BİRİNCİ işaretlerini koy.'
  }
];
