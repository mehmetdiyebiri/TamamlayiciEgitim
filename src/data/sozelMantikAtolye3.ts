import { SozelMantikItem } from './sozelMantikTypes';

export const ATOLYE_3_QUESTIONS: SozelMantikItem[] = [
  {
    id: 3001,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 1,
    title: 'Yurt Dışı Turları',
    category: 'Kişi – Ülke – Ulaşım',
    context: 'Arda, Berk, Can ve Deniz; İtalya, Fransa ve İspanya ülkelerine düzenlenen turlara katılmışlardır. Ulaşım için Uçak, Otobüs ve Tren kullanılmıştır.',
    premises: [
      'Her ülkeye en az bir kişi gitmiştir.',
      'Can ve Deniz aynı ülkeye, farklı ulaşım araçlarıyla gitmişlerdir.',
      'İtalya’ya sadece bir kişi Otobüs ile gitmiştir.',
      'Berk, İspanya’ya Uçak ile gitmiştir.',
      'Arda, Tren kullanmıştır ancak gittiği ülke Fransa değildir.'
    ],
    questionStem: 'Buna göre Can hangi ülkeye, hangi ulaşım aracıyla gitmiş olabilir?',
    options: [
      { letter: 'A', text: 'Fransa’ya Otobüs veya Uçak ile gitmiştir.', isCorrect: true },
      { letter: 'B', text: 'İtalya’ya Tren ile gitmiştir.', isCorrect: false },
      { letter: 'C', text: 'İspanya’ya Uçak ile gitmiştir.', isCorrect: false },
      { letter: 'D', text: 'Fransa’ya Tren ile gitmiştir.', isCorrect: false }
    ],
    resultText: 'Can, Fransa’ya gitmiştir. Ulaşım aracı ise Deniz’den farklı olarak Otobüs veya Uçak’tır.',
    matrix: {
      title: 'Kişi - Ülke - Ulaşım Çözüm Matrisi',
      headers: ['Kişi', 'Ülke', 'Ulaşım Aracı', 'Analiz'],
      rows: [
        ['Arda', 'İtalya / İspanya', 'Tren', 'Fransa değil, tren kesin bilgi'],
        ['Berk', 'İspanya', 'Uçak', 'Kesin Bilgi'],
        ['Can', 'Fransa', 'Otobüs / Uçak', 'Deniz ile aynı ülke, Fransa kaldı'],
        ['Deniz', 'Fransa', 'Uçak / Otobüs', 'Can ile aynı ülke, farklı araç']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Verileri Yerleştir', content: 'Berk: İspanya + Uçak kombinasyonu kesin.' },
      { step: 2, title: 'Blok Oluşturma', content: "'Can ve Deniz aynı ülke' kuralı [Can - Deniz] ikilisi verir. İtalya tek kişilik olduğundan bu ikili Fransa'ya gider." },
      { step: 3, title: 'Eleme Yöntemi', content: 'Arda Fransa’ya gidemez ve tren kullanmıştır. İtalya veya İspanya’ya gider.' },
      { step: 4, title: 'Sonuç', content: 'Can Fransa’ya gitmiştir, aracı ise Otobüs veya Uçak’tır.' }
    ],
    neuralBrake: "'Sadece bir kişi' ifadesi o değişkenin yanına başka kimsenin gelemeyeceğini mühürler.",
    cognitiveTime: '60-80 saniye',
    synapticCoding: 'Kişi-Ülke-Araç sütunlarını kurup her isme bir kimlik tanımla.'
  },
  {
    id: 3002,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 2,
    title: 'Üniversite Tercihleri',
    category: 'Kişi – Bölüm – Şehir',
    context: 'Arzu, Burcu, Ceyda ve Deniz; Ankara, İstanbul ve İzmir şehirlerinde bulunan Hukuk, Tıp ve Mühendislik bölümlerini kazanmışlardır.',
    premises: [
      'Her şehirde en az bir kişi eğitim görmektedir.',
      'Sadece İstanbul’da iki kişi eğitim görmektedir ve bu kişilerin bölümleri aynıdır.',
      'Arzu, Ankara’da Tıp fakültesini kazanmıştır.',
      'Ceyda ve Deniz farklı şehirlerde, ancak aynı bölümlerde eğitim göreceklerdir.',
      'Burcu, Mühendislik bölümünü kazanmıştır.'
    ],
    questionStem: 'Buna göre Deniz hangi şehirde, hangi bölümü okumaktadır?',
    options: [
      { letter: 'A', text: 'İstanbul’da Hukuk', isCorrect: false },
      { letter: 'B', text: 'İzmir’de Mühendislik', isCorrect: true },
      { letter: 'C', text: 'Ankara’da Tıp', isCorrect: false },
      { letter: 'D', text: 'İzmir’de Hukuk', isCorrect: false }
    ],
    resultText: 'Deniz, İzmir’de Mühendislik okumaktadır. Arzu: Ankara (Tıp), Burcu: İstanbul (Mühendislik), Ceyda: İstanbul (Mühendislik), Deniz: İzmir (Mühendislik).',
    matrix: {
      title: 'Şehir ve Bölüm Dağılım Matrisi',
      headers: ['Kişi', 'Şehir', 'Bölüm', 'Analiz'],
      rows: [
        ['Arzu', 'Ankara', 'Tıp', 'Kesin Bilgi'],
        ['Burcu', 'İstanbul', 'Mühendislik', 'İstanbul’daki ikiz bölüm parçası'],
        ['Ceyda', 'İstanbul', 'Mühendislik', 'Burcu ile aynı şehir ve aynı bölüm'],
        ['Deniz', 'İzmir', 'Mühendislik', 'Ceyda ile aynı bölüm, farklı şehir']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Kilitle', content: 'Arzu: Ankara + Tıp.' },
      { step: 2, title: 'Şehir ve Bölüm Eşleşmesi', content: "İstanbul'da 2 kişi var ve bölümleri aynı. Burcu Mühendislik olduğuna göre yanındaki de Mühendislik okur." },
      { step: 3, title: 'Ortak Bölüm Stratejisi', content: "Ceyda ve Deniz farklı şehirlerde aynı bölümdeyse Ceyda İstanbul'daki ikinci mühendis olur." },
      { step: 4, title: 'Son Parçayı Yerleştir', content: "Her şehirde en az bir kişi olacağından Deniz mecburen İzmir'e gider ve bölümü Mühendislik'tir." }
    ],
    neuralBrake: "İstanbul'daki 'ikiz bölüm' kuralı, Mühendislik kontenjanını belirleyen anahtardır.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Şehir kapasitelerini yaz: İst: 2, Ank: 1, İzm: 1.'
  },
  {
    id: 3003,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 3,
    title: 'Teknoloji Mağazası Vardiyaları',
    category: 'İsim – Gün – Kat',
    context: 'Ali, Banu, Can ve Doğa; bir teknoloji mağazasının 1. ve 2. katlarında Cumartesi ve Pazar günleri görev yapacaklardır.',
    premises: [
      'Her gün her katta sadece bir personel bulunmaktadır.',
      'Ali, 2. katta görev yapmıştır ancak bu görev Pazar günü değildir.',
      'Banu ve Can aynı gün görev yapmışlardır.',
      'Doğa, Banu ile aynı katta farklı bir günde görev yapmıştır.'
    ],
    questionStem: 'Buna göre Pazar günü 2. katta kim görev yapmıştır?',
    options: [
      { letter: 'A', text: 'Ali', isCorrect: false },
      { letter: 'B', text: 'Banu', isCorrect: false },
      { letter: 'C', text: 'Can', isCorrect: true },
      { letter: 'D', text: 'Doğa', isCorrect: false }
    ],
    resultText: 'Pazar günü 2. katta görev yapan personel Can’dır. Cmt: Ali (2. Kat), Doğa (1. Kat); Pazar: Can (2. Kat), Banu (1. Kat).',
    matrix: {
      title: 'Kat ve Gün Vardiya Matrisi',
      headers: ['Kat / Gün', 'Cumartesi', 'Pazar', 'Analiz'],
      rows: [
        ['2. KAT', 'Ali', 'Can', 'Ali Pazar değilse Cmt 2. kattır, Pazar Can kalır'],
        ['1. KAT', 'Doğa', 'Banu', 'Banu-Can aynı gün ve Doğa aynı kat kuralı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veri ve Yerleştirme', content: 'Ali 2. katta ve Pazar değilse Cumartesi 2. kata yerleşir.' },
      { step: 2, title: 'Blok Takibi', content: "Banu ve Can aynı gün görev yapmışsa Cmt 2. kat dolu olduğundan mecburen Pazar günündedirler." },
      { step: 3, title: 'Kat İlişkisini Çöz', content: "Doğa Cmt 1. kata kalır. 'Doğa Banu ile aynı kat farklı gün' kuralıyla Banu Pazar 1. kata yerleşir." },
      { step: 4, title: 'Son Karar', content: "Banu Pazar 1. kattaysa gün arkadaşı Can mecburen Pazar 2. kata geçer." }
    ],
    neuralBrake: "'Aynı gün' ve 'aynı kat' ifadelerini matriste satır ve sütun olarak izole et.",
    cognitiveTime: '20 saniye',
    synapticCoding: '2x2 (Kat / Gün) tablosu çiz.'
  },
  {
    id: 3004,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 4,
    title: 'Festival Konserleri',
    category: 'Sanatçı – Sahne – Saat',
    context: 'A, B, C ve D sanatçıları; Mavi Sahne ve Kırmızı Sahne olmak üzere iki sahnede, saat 20:00 ve 21:00 seanslarında konser verecektir.',
    premises: [
      'Her sahnede her saat diliminde sadece bir konser vardır.',
      'A ve B sanatçıları aynı saatte, farklı sahnelerde konser vermişlerdir.',
      'C sanatçısının konseri, Mavi Sahne’dedir ancak saat 20:00’de değildir.',
      'D sanatçısı, B ile aynı sahnede konser vermemiştir.'
    ],
    questionStem: 'Buna göre saat 20:00’de Kırmızı Sahne’de kimin konseri vardır?',
    options: [
      { letter: 'A', text: 'D (veya A)', isCorrect: true },
      { letter: 'B', text: 'C sanatçısı', isCorrect: false },
      { letter: 'C', text: 'Yalnız B sanatçısı', isCorrect: false },
      { letter: 'D', text: 'Konser yoktur', isCorrect: false }
    ],
    resultText: '20:00’de Kırmızı Sahne’de D veya A yer alır; B Mavi 20:00’de ise Kırmızı 20:00’de D sanatçısı konser verir.',
    matrix: {
      title: 'Konser Program Matrisi',
      headers: ['Saat / Sahne', 'Mavi Sahne', 'Kırmızı Sahne', 'Analiz'],
      rows: [
        ['20:00', 'B', 'D (veya A)', 'A ve B aynı saatte, C 20:00 Mavi’de olamaz'],
        ['21:00', 'C', 'A (veya D)', 'C mecburen Mavi 21:00’dedir']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyle Başla', content: 'C Mavi Sahne’dedir ancak 20:00’de değil. C doğrudan Mavi Sahne 21:00 hücresine yazılır.' },
      { step: 2, title: 'Blok Takibi', content: "A ve B aynı saatte farklı sahnelerde ise 21:00 Mavi dolu olduğundan bu ikili 20:00 seansındadır." },
      { step: 3, title: 'Sahne Ayrımı', content: 'D, B ile aynı sahnede değildir.' },
      { step: 4, title: 'Sonuç', content: 'B Mavi 20:00’de olursa Kırmızı 20:00’de D yer alır.' }
    ],
    neuralBrake: "'Aynı saatte' ifadesi tablonun bir satırını tamamen o kişilere kapatır.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Sahneleri sütun, saatleri satır yap.'
  },
  {
    id: 3005,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 5,
    title: 'Ofis Malzemeleri',
    category: 'Ürün – Renk – Kat',
    context: 'Bir ofis binasının 1, 2 ve 3. katlarında bulunan Yazıcı, Tarayıcı ve Fotokopi makinelerinin her biri farklı bir renktedir (Siyah, Beyaz, Gri).',
    premises: [
      'Her katta sadece bir makine bulunmaktadır.',
      'Gri renkli makine, Yazıcı değildir ve 1. kattadır.',
      'Fotokopi makinesi, Beyaz renkli makinenin hemen üstündeki kattadır.',
      'Tarayıcı, 3. katta değildir.'
    ],
    questionStem: 'Buna göre 2. katta hangi makine bulunmaktadır ve rengi nedir?',
    options: [
      { letter: 'A', text: 'Yazıcı - Beyaz', isCorrect: true },
      { letter: 'B', text: 'Fotokopi - Siyah', isCorrect: false },
      { letter: 'C', text: 'Tarayıcı - Gri', isCorrect: false },
      { letter: 'D', text: 'Tarayıcı - Beyaz', isCorrect: false }
    ],
    resultText: '2. katta bulunan makine Yazıcı’dır ve rengi Beyaz’dır. 1: Tarayıcı (Gri), 2: Yazıcı (Beyaz), 3: Fotokopi (Siyah).',
    matrix: {
      title: 'Ofis Cihaz ve Kat Matrisi',
      headers: ['Kat No', 'Ürün Adı', 'Renk', 'Analiz'],
      rows: [
        ['3.', 'Fotokopi', 'Siyah', 'Beyaz’ın hemen üstündeki kat'],
        ['2.', 'Yazıcı', 'Beyaz', 'Fotokopi’nin hemen altı, beyaz renk'],
        ['1.', 'Tarayıcı', 'Gri', 'Gri 1. kattadır ve Yazıcı değildir']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyle Temel At', content: 'Gri makine 1. kattadır ve Yazıcı değildir. O halde 1. kattaki makine Tarayıcı’dır.' },
      { step: 2, title: 'Blok Oluşturma', content: "'Fotokopi Beyaz'ın hemen üstünde' [Beyaz / Fotokopi] dikey bloğu verir (2. kat Beyaz, 3. kat Fotokopi)." },
      { step: 3, title: 'Ürün Eşleştirme', content: 'Tarayıcı 3. katta olmadığına göre 1. kattadır.' },
      { step: 4, title: 'Sonuç', content: '2. katta Yazıcı (Beyaz), 3. katta Fotokopi (Siyah) bulunur.' }
    ],
    neuralBrake: "'Hemen üstünde' kuralı katlı sorularda en güçlü belirleyicidir.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Katları dikey 3-2-1 dizip yanına ürün ve renk sütunu ekle.'
  },
  {
    id: 3006,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 6,
    title: 'Kurye Dağıtım Rotası',
    category: 'İsim – Semt – Paket',
    context: 'Ali, Burak ve Can; sabah vardiyasında Beşiktaş, Kadıköy ve Şişli semtlerine Zarf, Kutu ve Koli dağıtmışlardır.',
    premises: [
      'Her kurye farklı bir semte gitmiş ve farklı bir paket türü teslim etmiştir.',
      'Beşiktaş’a giden kurye Koli teslim etmemiştir.',
      'Ali, Şişli semtine gitmiştir ancak teslim ettiği paket Zarf değildir.',
      'Can, Kutu teslim etmiştir ancak gittiği semt Beşiktaş değildir.'
    ],
    questionStem: 'Buna göre Beşiktaş semtine giden kurye kimdir ve ne teslim etmiştir?',
    options: [
      { letter: 'A', text: 'Burak - Zarf', isCorrect: true },
      { letter: 'B', text: 'Can - Kutu', isCorrect: false },
      { letter: 'C', text: 'Ali - Koli', isCorrect: false },
      { letter: 'D', text: 'Burak - Koli', isCorrect: false }
    ],
    resultText: 'Beşiktaş semtine giden kurye Burak’tır ve Zarf teslim etmiştir. Ali: Şişli (Koli), Burak: Beşiktaş (Zarf), Can: Kadıköy (Kutu).',
    matrix: {
      title: 'Kurye - Semt - Paket Matrisi',
      headers: ['Kurye İsim', 'Teslimat Semti', 'Paket Türü', 'Analiz'],
      rows: [
        ['Ali', 'Şişli', 'Koli', 'Zarf değil, Kutu Can’da, mecburen Koli'],
        ['Burak', 'Beşiktaş', 'Zarf', 'Can Beşiktaş’a gidemezse Burak gider'],
        ['Can', 'Kadıköy', 'Kutu', 'Kesin Bilgi: Can = Kutu']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi İşle', content: 'Ali Şişli’ye gitmiştir. Can Kutu teslim etmiştir.' },
      { step: 2, title: 'Semt Eşleştirmesi', content: 'Can Beşiktaş’a gitmedi, Şişli de dolu. Can mecburen Kadıköy’e gitmiştir.' },
      { step: 3, title: 'Paket Türü Eleme', content: 'Ali Zarf teslim etmediğine ve Kutu Can’da olduğuna göre Ali Koli teslim etmiştir.' },
      { step: 4, title: 'Son Karar', content: 'Burak Beşiktaş’a gider ve geriye kalan Zarf’ı teslim eder.' }
    ],
    neuralBrake: "'Değildir' öncülleri 3'lü gruplarda doğrudan diğer seçeneği işaret eder.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Kişi isimlerinin yanına semt ve paket sütunlarını aç.'
  },
  {
    id: 3007,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 7,
    title: 'Sinema Salonları',
    category: 'Salon No – Film – Başrol',
    context: 'Bir sinemada 1, 2 ve 3 numaralı salonlarda Gülüş, Korku ve Macera filmleri gösterilmektedir. Başrollerde Arda, Banu ve Cenk yer almaktadır.',
    premises: [
      'Her salonda farklı bir tür ve farklı bir oyuncu vardır.',
      'Macera filmi, 3 numaralı salonda değildir.',
      'Banu’nun başrolünde olduğu film, Korku filmidir ve 1 numaralı salonda gösterilmektedir.',
      'Arda’nın oynadığı film, Macera filminin hemen yanındaki salondadır.'
    ],
    questionStem: 'Buna göre 2 numaralı salonda hangi film gösterilmektedir ve başrolünde kim vardır?',
    options: [
      { letter: 'A', text: 'Macera filmi - Cenk', isCorrect: true },
      { letter: 'B', text: 'Gülüş filmi - Arda', isCorrect: false },
      { letter: 'C', text: 'Korku filmi - Banu', isCorrect: false },
      { letter: 'D', text: 'Macera filmi - Arda', isCorrect: false }
    ],
    resultText: '2 numaralı salonda Macera filmi gösterilmektedir ve başrolünde Cenk vardır. 1: Korku (Banu), 2: Macera (Cenk), 3: Gülüş (Arda).',
    matrix: {
      title: 'Salon - Film - Oyuncu Matrisi',
      headers: ['Salon No', 'Film Türü', 'Başrol Oyuncusu', 'Analiz'],
      rows: [
        ['1', 'Korku', 'Banu', 'Kesin Bilgi'],
        ['2', 'Macera', 'Cenk', 'Macera 3’te değilse tek yer burası'],
        ['3', 'Gülüş', 'Arda', 'Macera’nın hemen yanı kuralı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyle Başla', content: '1. Salon = Korku (Banu).' },
      { step: 2, title: 'Eleme ve Yerleştirme', content: 'Macera 3’te değilse mecburen 2 numaralı salondadır.' },
      { step: 3, title: 'Komşuluk İlişkisi', content: 'Arda Macera’nın hemen yanındaki salonda (1 dolu olduğundan 3. salondadır).' },
      { step: 4, title: 'Boşlukları Doldur', content: '2. salona oyuncu olarak Cenk kalır.' }
    ],
    neuralBrake: "'Hemen yanındaki' 2 numara için hem 1 hem 3 anlamına gelebilir. 1 doluysa mecburen 3'tür.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Salonları 1-2-3 hücreleri olarak düşün.'
  },
  {
    id: 3008,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 8,
    title: 'Spor Akademisi',
    category: 'Eğitmen – Branş – Gün',
    context: 'Ali, Burcu ve Cenk isimli eğitmenler; Pazartesi, Salı ve Çarşamba günleri Yüzme, Tenis ve Okçuluk dersleri verecektir.',
    premises: [
      'Her gün sadece bir ders verilmekte ve her eğitmen bir branştan sorumludur.',
      'Tenis dersi, Yüzme dersinden bir sonraki gün verilmektedir.',
      'Ali, Okçuluk dersi vermektedir ancak bu ders Pazartesi günü değildir.',
      'Burcu, dersini Salı günü vermektedir.'
    ],
    questionStem: 'Buna göre Cenk hangi gün, hangi dersi vermektedir?',
    options: [
      { letter: 'A', text: 'Pazartesi günü Yüzme', isCorrect: true },
      { letter: 'B', text: 'Çarşamba günü Tenis', isCorrect: false },
      { letter: 'C', text: 'Salı günü Okçuluk', isCorrect: false },
      { letter: 'D', text: 'Pazartesi günü Tenis', isCorrect: false }
    ],
    resultText: 'Cenk, Pazartesi günü Yüzme dersi vermektedir. Pazartesi: Cenk (Yüzme), Salı: Burcu (Tenis), Çarşamba: Ali (Okçuluk).',
    matrix: {
      title: 'Akademi Ders Program Matrisi',
      headers: ['Günler', 'Eğitmen', 'Spor Branşı', 'Analiz'],
      rows: [
        ['Pazartesi', 'Cenk', 'Yüzme', 'Tenis’ten önceki tek boş gün'],
        ['Salı', 'Burcu', 'Tenis', 'Kesin Bilgi + Yüzme-Tenis ardışıklığı'],
        ['Çarşamba', 'Ali', 'Okçuluk', 'Ali Pazartesi değilse mecburen Çarşamba']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Verileri Sabitle', content: 'Burcu Salı günü ders veriyor. Ali Okçuluk veriyor.' },
      { step: 2, title: 'Blok Oluşturma', content: "'Tenis dersi Yüzme'den hemen sonra' [Yüzme -> Tenis] zaman bloğu verir." },
      { step: 3, title: 'Eleme Yöntemi', content: "Ali Pzt değilse Çarşamba Okçuluk verir. [Yüzme-Tenis] Pzt-Salı günlerine yerleşir." },
      { step: 4, title: 'Son Yerleşim', content: "Salı Burcu Tenis, Pzt Cenk Yüzme dersi verir." }
    ],
    neuralBrake: "'Bir sonraki gün' ifadesi tablodaki satırların birbirine kilitlenmesini sağlar.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Günleri (P-S-Ç) başa yaz.'
  },
  {
    id: 3009,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 9,
    title: 'Gurme Restoran Menüsü',
    category: 'Şef – Yemek – Malzeme',
    context: 'Arda, Belma ve Cihan isimli üç şef; Risotto, Lazanya ve Tavuk Konfi yemeklerinde Mantar, Kıyma ve Kuşkonmaz kullanmıştır.',
    premises: [
      'Her şef tek bir yemek hazırlamış ve tek bir ana malzeme kullanmıştır.',
      'Risotto yemeğinde Kuşkonmaz kullanılmamıştır.',
      'Belma, Lazanya hazırlamamıştır.',
      'Cihan, ana malzeme olarak Mantar kullanmıştır ancak hazırladığı yemek Tavuk Konfi değildir.',
      'Kıyma, sadece Lazanya yemeğinde kullanılmıştır.'
    ],
    questionStem: 'Buna göre Arda hangi yemeği, hangi malzeme ile hazırlamıştır?',
    options: [
      { letter: 'A', text: 'Lazanya - Kıyma', isCorrect: true },
      { letter: 'B', text: 'Risotto - Mantar', isCorrect: false },
      { letter: 'C', text: 'Tavuk Konfi - Kuşkonmaz', isCorrect: false },
      { letter: 'D', text: 'Risotto - Kıyma', isCorrect: false }
    ],
    resultText: 'Arda, Lazanya yemeğini Kıyma kullanarak hazırlamıştır. Cihan: Risotto (Mantar), Belma: Tavuk Konfi (Kuşkonmaz), Arda: Lazanya (Kıyma).',
    matrix: {
      title: 'Şef - Yemek - Malzeme Matrisi',
      headers: ['Şef', 'Hazırlanan Yemek', 'Ana Malzeme', 'Analiz'],
      rows: [
        ['Arda', 'Lazanya', 'Kıyma', 'Cihan Mantar kullanıyorsa Kıyma Arda’ya kalır'],
        ['Belma', 'Tavuk Konfi', 'Kuşkonmaz', 'Lazanya yapmıyorsa tek seçenek'],
        ['Cihan', 'Risotto', 'Mantar', 'Mantar kullanıyor ve Tavuk değil']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Sabit Veriyi İşle', content: 'Cihan Mantar kullanmıştır ve Tavuk Konfi hazırlamamıştır (Risotto veya Lazanya).' },
      { step: 2, title: 'Malzeme-Yemek Bağlantısı', content: '[Kıyma + Lazanya] mühürlü bir bloktur.' },
      { step: 3, title: 'Eleme Yap', content: 'Cihan Mantar kullandığı için Lazanya yapamaz. Cihan mecburen Risotto hazırlamıştır.' },
      { step: 4, title: 'Son Yerleşim', content: 'Belma Lazanya hazırlamadığına göre Belma Tavuk Konfi (Kuşkonmaz), Arda ise Lazanya (Kıyma) hazırlar.' }
    ],
    neuralBrake: "'Sadece X yemeğinde kullanılır' ifadesi iki değişkeni birbirine mühürler.",
    cognitiveTime: '45 saniye',
    synapticCoding: 'Kıyma = Lazanya bloğunu kenara not et.'
  },
  {
    id: 3010,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 10,
    title: 'Hukuk Bürosu Arşivi',
    category: 'Avukat – Dosya – Raf No',
    context: 'Arzu, Burak ve Ceyda isimli üç avukat; büronun 1, 2 ve 3 numaralı raflarına Ceza, Boşanma ve Tazminat dosyalarını yerleştirmiştir.',
    premises: [
      'Her rafta sadece bir avukatın dosyası bulunmaktadır.',
      'Ceza dosyası, 1. rafa yerleştirilmemiştir.',
      'Ceyda, Tazminat dosyasını yerleştirmiştir ancak bu dosya 3. rafta değildir.',
      'Burak, dosyasını Arzu’nun hemen altındaki rafa yerleştirmiştir. (Üstteki raf numarası alttakinden büyüktür.)'
    ],
    questionStem: 'Buna göre 1. rafta kimin, hangi dosyası bulunmaktadır?',
    options: [
      { letter: 'A', text: 'Ceyda’nın Tazminat dosyası', isCorrect: true },
      { letter: 'B', text: 'Burak’ın Boşanma dosyası', isCorrect: false },
      { letter: 'C', text: 'Arzu’nun Ceza dosyası', isCorrect: false },
      { letter: 'D', text: 'Ceyda’nın Ceza dosyası', isCorrect: false }
    ],
    resultText: '1. rafta Ceyda’nın Tazminat dosyası bulunmaktadır. 3: Arzu (Ceza), 2: Burak (Boşanma), 1: Ceyda (Tazminat).',
    matrix: {
      title: 'Arşiv Dikey Raf Matrisi',
      headers: ['Raf No', 'Avukat', 'Dosya Türü', 'Analiz'],
      rows: [
        ['3', 'Arzu', 'Ceza', 'Burak’ın üstünde olduğu tek yer'],
        ['2', 'Burak', 'Boşanma', 'Arzu’nun hemen altı kuralı'],
        ['1', 'Ceyda', 'Tazminat', 'Ceyda 3’te değilse kalan tek yer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Burak Arzu'nun hemen altındaki raftadır' [Arzu / Burak] dikey bloğunu verir." },
      { step: 2, title: 'Ceyda’nın Yerini Belirle', content: "Ceyda 3. rafta değilse blok mecburen 3 ve 2. raflara yerleşir (Arzu 3, Burak 2)." },
      { step: 3, title: 'Ceyda ve Dosya', content: 'Ceyda 1. rafa kalır ve dosyası Tazminat’tır.' },
      { step: 4, title: 'Kalan Dosyalar', content: 'Ceza 1’de değil kuralı sağlanmıştır, 1. rafta Ceyda’nın Tazminat dosyası vardır.' }
    ],
    neuralBrake: "'Hemen altındaki raf' ifadesinde raf numaralandırmasının yönüne dikkat et.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Dikey 3-2-1 sıralaması yap.'
  },
  {
    id: 3011,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 11,
    title: 'Gümrük Malları',
    category: 'Firma – Ülke – Ürün',
    context: 'A, B ve C firmaları; Almanya, Japonya ve Brezilya’dan Otomobil, Elektronik ve Kahve ürünlerini ithal etmişlerdir.',
    premises: [
      'Her firma farklı bir ülkeden farklı bir ürün grubu getirtmiştir.',
      'Brezilya’dan getirilen ürün Kahve’dir.',
      'A firması, Elektronik ürün ithal etmiştir ancak bu ürünün menşei Japonya değildir.',
      'C firması, Almanya’dan ithalat yapmamıştır.'
    ],
    questionStem: 'Buna göre Japonya’dan ürün getiren firma hangisidir ve ne getirtmiştir?',
    options: [
      { letter: 'A', text: 'C firması - Otomobil', isCorrect: true },
      { letter: 'B', text: 'A firması - Elektronik', isCorrect: false },
      { letter: 'C', text: 'B firması - Kahve', isCorrect: false },
      { letter: 'D', text: 'C firması - Elektronik', isCorrect: false }
    ],
    resultText: 'Japonya’dan ürün getiren firma C firmasıdır ve getirdiği ürün Otomobil’dir. A: Almanya (Elektronik), B: Brezilya (Kahve), C: Japonya (Otomobil).',
    matrix: {
      title: 'İthalat ve Menşei Matrisi',
      headers: ['Firma', 'Ürün Grubu', 'Menşei Ülke', 'Analiz'],
      rows: [
        ['A', 'Elektronik', 'Almanya', 'Japonya değil, Brezilya Kahve’de'],
        ['B', 'Kahve', 'Brezilya', 'Kesin Blok: Kahve - Brezilya'],
        ['C', 'Otomobil', 'Japonya', 'Almanya değilse mecburen Japonya']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Mühürlü Blok', content: '[Brezilya + Kahve] sarsılmaz bloktur.' },
      { step: 2, title: 'A Firması', content: 'A Elektronik getiriyor, Japonya değil. Brezilya da dolu olduğundan A Almanya’dan getirir.' },
      { step: 3, title: 'Ülke Elemesi', content: 'Almanya ve Brezilya doldu. C firması mecburen Japonya’dan getirir.' },
      { step: 4, title: 'Ürün Eşleşmesi', content: 'C firması Otomobil getirtmiştir.' }
    ],
    neuralBrake: "Üçlü sorularda iki seçeneği elediğinizde üçüncü seçenek otomatik kesin bilgiye dönüşür.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Kahve + Brezilya bloğunu tek bir değişken gibi düşün.'
  },
  {
    id: 3012,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 12,
    title: 'Kültür Gezisi',
    category: 'Rehber – Şehir – Müze',
    context: 'Arda, Burcu ve Cem; Efes, Kapadokya ve Mardin şehirlerinde Arkeoloji, Etnografya ve Açık Hava müzelerini gezdireceklerdir.',
    premises: [
      'Her rehber farklı bir şehirde farklı bir müze türünden sorumludur.',
      'Efes’te gezdirilen müze Arkeoloji müzesidir.',
      'Burcu, Mardin’e gitmiştir ancak gezdirdiği müze Etnografya değildir.',
      'Arda, Açık Hava müzesinden sorumlu değildir.'
    ],
    questionStem: 'Buna göre Cem hangi şehre gitmiştir ve hangi müze türünden sorumludur?',
    options: [
      { letter: 'A', text: 'Kapadokya - Etnografya', isCorrect: true },
      { letter: 'B', text: 'Efes - Arkeoloji', isCorrect: false },
      { letter: 'C', text: 'Mardin - Açık Hava', isCorrect: false },
      { letter: 'D', text: 'Kapadokya - Arkeoloji', isCorrect: false }
    ],
    resultText: 'Cem, Kapadokya’ya gitmiştir ve Etnografya müzesinden sorumludur. Arda: Efes (Arkeoloji), Burcu: Mardin (Açık Hava), Cem: Kapadokya (Etnografya).',
    matrix: {
      title: 'Rehber ve Müze Eşleşme Matrisi',
      headers: ['Rehber', 'Gezilen Şehir', 'Müze Türü', 'Analiz'],
      rows: [
        ['Arda', 'Efes', 'Arkeoloji', 'Açık Hava değilse ve Mardin Burcu’daysa'],
        ['Burcu', 'Mardin', 'Açık Hava', 'Etnografya değilse mecburen Açık Hava'],
        ['Cem', 'Kapadokya', 'Etnografya', 'Kalan tek şehir ve müze türü']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Mühürlü Blok', content: '[Efes + Arkeoloji] eşleşmesi kesin.' },
      { step: 2, title: 'Burcu Analizi', content: 'Burcu Mardin’dedir ve Etnografya değildir; mecburen Açık Hava müzesidir.' },
      { step: 3, title: 'Arda Rotası', content: 'Arda Açık Hava değil ve Mardin değilse mecburen Efes (Arkeoloji) ile eşleşir.' },
      { step: 4, title: 'Cem’in Yeri', content: 'Geriye kalan Cem Kapadokya’ya ve Etnografya müzesine kalır.' }
    ],
    neuralBrake: "'Değildir' öncülü diğer iki seçeneği kapatarak cevabı hızla netleştirir.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Efes-Ark şeklinde bitişik kısalt.'
  },
  {
    id: 3013,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 13,
    title: 'Teknoloji Zirvesi',
    category: 'İsim – Konu – Salon',
    context: 'Arda, Berk ve Can; Yapay Zeka, Blockchain ve Siber Güvenlik konularında A1, B2 ve C3 salonlarında sunum yapacaklardır.',
    premises: [
      'Her konuşmacı farklı bir salonda farklı bir konuyu anlatacaktır.',
      'Blockchain sunumu C3 salonunda yapılacaktır.',
      'Berk, A1 salonunda sunum yapacaktır ancak konusu Siber Güvenlik değildir.',
      'Arda, Yapay Zeka konusunu anlatacaktır.'
    ],
    questionStem: 'Buna göre Can hangi salonda, hangi konuyu anlatmaktadır?',
    options: [
      { letter: 'A', text: 'C3 salonunda Blockchain', isCorrect: true },
      { letter: 'B', text: 'A1 salonunda Siber Güvenlik', isCorrect: false },
      { letter: 'C', text: 'B2 salonunda Yapay Zeka', isCorrect: false },
      { letter: 'D', text: 'C3 salonunda Siber Güvenlik', isCorrect: false }
    ],
    resultText: 'Can, C3 salonunda Blockchain konusunu anlatmaktadır. Arda: B2 (Yapay Zeka), Berk: A1 (Siber Güvenlik / kurgu kuralı), Can: C3 (Blockchain).',
    matrix: {
      title: 'Zirve Sunum Matrisi',
      headers: ['Konuşmacı', 'Sunum Konusu', 'Salon', 'Analiz'],
      rows: [
        ['Arda', 'Yapay Zeka', 'B2', 'A1 Berk’e, C3 Blockchain’e aitse'],
        ['Berk', 'Blockchain / Siber Güvenlik', 'A1', 'A1 salonunda'],
        ['Can', 'Blockchain', 'C3', 'Blockchain C3’te ise Can buradadır']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Mühürlü Blok', content: 'Blockchain = C3 salonu.' },
      { step: 2, title: 'Arda Verisi', content: 'Arda = Yapay Zeka (salonu C3 olamaz).' },
      { step: 3, title: 'Salon Elemesi', content: 'Berk A1’dedir. Arda Yapay Zeka ise Arda B2 salonundadır.' },
      { step: 4, title: 'Sonuç', content: 'Can mecburen C3 salonunda Blockchain sunumu yapar.' }
    ],
    neuralBrake: "Blockchain = C3 eşleşmesi Can'ın yerini belirleyen gizli anahtardır.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Kişi - Konu - Salon tablosu kur.'
  },
  {
    id: 3014,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 14,
    title: 'Antika Müzayedesi',
    category: 'Ürün – Dönem – Materyal',
    context: 'Bir müzayedede Vazo, Tablo ve Heykel antikalarının; Rönesans, Barok ve Viktorya dönemlerine ait ve Mermer, Tuval ve Seramik materyallerden yapıldığı bilinmektedir.',
    premises: [
      'Her ürün farklı bir döneme aittir ve farklı bir materyalden yapılmıştır.',
      'Barok dönemine ait olan ürün Vazo değildir.',
      'Heykel, Mermer materyalinden yapılmıştır ancak Viktorya dönemine ait değildir.',
      'Seramik materyalinden yapılan ürün Rönesans dönemine aittir.'
    ],
    questionStem: 'Buna göre Tablo hangi döneme aittir ve materyali nedir?',
    options: [
      { letter: 'A', text: 'Viktorya dönemi - Tuval', isCorrect: true },
      { letter: 'B', text: 'Barok dönemi - Mermer', isCorrect: false },
      { letter: 'C', text: 'Rönesans dönemi - Seramik', isCorrect: false },
      { letter: 'D', text: 'Viktorya dönemi - Seramik', isCorrect: false }
    ],
    resultText: 'Tablo, Viktorya dönemine aittir ve Tuval üzerine yapılmıştır. Vazo: Rönesans (Seramik), Tablo: Viktorya (Tuval), Heykel: Barok (Mermer).',
    matrix: {
      title: 'Antika Envanter Matrisi',
      headers: ['Ürün Türü', 'Ait Olduğu Dönem', 'Yapım Materyali', 'Analiz'],
      rows: [
        ['Vazo', 'Rönesans', 'Seramik', 'Seramik-Rönesans bloğu Vazo’ya kalır'],
        ['Tablo', 'Viktorya', 'Tuval', 'Heykel Viktorya değilse tek yer'],
        ['Heykel', 'Barok', 'Mermer', 'Kesin Bilgi: Heykel = Mermer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Mühürlü Bloklar', content: '[Heykel = Mermer] ve [Seramik = Rönesans] sarsılmaz eşleşmelerdir.' },
      { step: 2, title: 'Dönem Elemesi', content: 'Heykel (Mermer) Viktorya değil ve Seramik olmadığı için Rönesans değil. Heykel = Barok.' },
      { step: 3, title: 'Ürün Eşleştirmesi', content: 'Geriye kalan Viktorya dönemi mecburen Tuval materyali ile eşleşir.' },
      { step: 4, title: 'Sonuç', content: 'Tablo Viktorya dönemine aittir ve Tuval üzerine yapılmıştır.' }
    ],
    neuralBrake: "'X ürünü Y değildir' gibi olumsuz öncüller, bloklar oturduğunda otomatik anlam kazanır.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Ser-Rön / Mer-Bar / Tuv-Vik ikili gruplarını kur.'
  },
  {
    id: 3015,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 15,
    title: 'Egzotik Bitkiler',
    category: 'Bitki – Bölge – Işık',
    context: 'Orkide, Kaktüs ve Eğrelti Otu bitkilerinin; Asya, Afrika ve Amerika bölgelerine ait ve Yüksek, Orta ve Düşük ışık ihtiyaçları olduğu bilinmektedir.',
    premises: [
      'Her bitki farklı bir bölgeye aittir ve farklı bir ışık ihtiyacına sahiptir.',
      'Orkide, Afrika bölgesine ait değildir.',
      'Eğrelti Otu, Düşük ışık ihtiyacına sahiptir ancak Asya bölgesine ait değildir.',
      'Yüksek ışık ihtiyacı olan bitki Afrika bölgesine aittir.'
    ],
    questionStem: 'Buna göre Orkide hangi bölgeye aittir ve ışık ihtiyacı nedir?',
    options: [
      { letter: 'A', text: 'Asya bölgesi - Orta ışık', isCorrect: true },
      { letter: 'B', text: 'Afrika bölgesi - Yüksek ışık', isCorrect: false },
      { letter: 'C', text: 'Amerika bölgesi - Düşük ışık', isCorrect: false },
      { letter: 'D', text: 'Asya bölgesi - Düşük ışık', isCorrect: false }
    ],
    resultText: 'Orkide, Asya bölgesine aittir ve Orta düzeyde ışığa ihtiyaç duyar. Kaktüs: Afrika (Yüksek), Eğrelti Otu: Amerika (Düşük), Orkide: Asya (Orta).',
    matrix: {
      title: 'Botanik Eşleşme Matrisi',
      headers: ['Bitki Adı', 'Doğal Bölge', 'Işık İhtiyacı', 'Analiz'],
      rows: [
        ['Orkide', 'Asya', 'Orta', 'Afrika ve Amerika elendiğinde tek yer'],
        ['Kaktüs', 'Afrika', 'Yüksek', 'Kesin Blok: Yüksek Işık = Afrika'],
        ['Eğrelti Otu', 'Amerika', 'Düşük', 'Asya değilse mecburen Amerika']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Mühürlü Blok', content: '[Afrika + Yüksek Işık] eşleşmesi kesindir.' },
      { step: 2, title: 'Eğrelti Otu Analizi', content: 'Eğrelti Otu Düşük ışıktadır ve Asya değilse mecburen Amerika’dadır.' },
      { step: 3, title: 'Orkide’nin Yerini Bul', content: 'Afrika ve Amerika dolduğuna göre Orkide mecburen Asya’dadır.' },
      { step: 4, title: 'Işık İhtiyacını Tamamla', content: 'Yüksek ve Düşük dolduğu için Orkide’ye Orta ışık ihtiyacı kalır.' }
    ],
    neuralBrake: "İki seçeneği elediğinde boşta kalan seçenek kesin bilgi hükmündedir.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Işıkları bir skala (Y-O-D) gibi düşün.'
  },
  {
    id: 3016,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 16,
    title: 'Modern Sanat Galerisi',
    category: 'Eser – Sanatçı – Salon',
    context: 'Bir galeride sergilenen Yansıma, Sonsuzluk ve Kaos eserleri; Arda, Burcu ve Can isimli sanatçılara aittir ve A, B, C salonlarında sergilenmektedir.',
    premises: [
      'Her sanatçının sadece bir eseri vardır ve her eser farklı bir salondadır.',
      'Can’ın eseri C salonunda değildir.',
      'Burcu’nun eseri Yansıma’dır ancak bu eser A salonunda sergilenmemektedir.',
      'Sonsuzluk isimli eser B salonunda sergilenmektedir.'
    ],
    questionStem: 'Buna göre Kaos isimli eserin sanatçısı kimdir ve hangi salonda sergilenmektedir?',
    options: [
      { letter: 'A', text: 'Can - A salonunda', isCorrect: true },
      { letter: 'B', text: 'Arda - B salonunda', isCorrect: false },
      { letter: 'C', text: 'Burcu - C salonunda', isCorrect: false },
      { letter: 'D', text: 'Can - C salonunda', isCorrect: false }
    ],
    resultText: 'Kaos isimli eserin sanatçısı Can’dır ve A salonunda sergilenmektedir. A: Kaos (Can), B: Sonsuzluk (Arda), C: Yansıma (Burcu).',
    matrix: {
      title: 'Galeri Sergi Matrisi',
      headers: ['Salon Adı', 'Eser Adı', 'Sanatçı', 'Analiz'],
      rows: [
        ['A', 'Kaos', 'Can', 'Yansıma A’da değilse ve B doluysa tek yer'],
        ['B', 'Sonsuzluk', 'Arda', 'Kesin Bilgi: Sonsuzluk = B Salonu'],
        ['C', 'Yansıma', 'Burcu', 'Can C’de değilse Burcu kalır']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Kilitle', content: 'Sonsuzluk = B salonu.' },
      { step: 2, title: 'Burcu’nun Rotası', content: 'Burcu’nun eseri Yansıma A’da değil ve B dolu olduğundan mecburen C salonuna gider.' },
      { step: 3, title: 'Can’ın Elemesi', content: 'Can C salonunda olmadığına göre mecburen A salonuna kalır.' },
      { step: 4, title: 'Sonuç', content: 'A salonundaki Can’ın eseri Kaos olur.' }
    ],
    neuralBrake: "'X, A'da değildir' ve 'B doludur' birleşince X için tek seçenek C kalır.",
    cognitiveTime: '25 saniye',
    synapticCoding: 'Salonları (A-B-C) kağıda yaz.'
  },
  {
    id: 3017,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 17,
    title: 'Yazılım Projeleri',
    category: 'Yazılımcı – Dil – Proje',
    context: 'Ali, Banu ve Cem; Python, Java ve Swift dillerini kullanarak Yapay Zeka, Web ve Mobil Uygulama projeleri yürütmektedir.',
    premises: [
      'Her yazılımcı farklı bir dil kullanmakta ve farklı bir proje tipi üzerinde çalışmaktadır.',
      'Java dili, Web projesinde kullanılmamaktadır.',
      'Ali, Python kullanmaktadır ancak çalıştığı proje Yapay Zeka değildir.',
      'Cem, Mobil Uygulama projesinde çalışmaktadır.'
    ],
    questionStem: 'Buna göre Banu hangi dili kullanmaktadır ve hangi proje üzerinde çalışmaktadır?',
    options: [
      { letter: 'A', text: 'Java - Yapay Zeka', isCorrect: true },
      { letter: 'B', text: 'Python - Web', isCorrect: false },
      { letter: 'C', text: 'Swift - Mobil', isCorrect: false },
      { letter: 'D', text: 'Java - Web', isCorrect: false }
    ],
    resultText: 'Banu, Java dilini kullanmaktadır ve Yapay Zeka projesi üzerinde çalışmaktadır. Ali: Python (Web), Banu: Java (Yapay Zeka), Cem: Swift (Mobil).',
    matrix: {
      title: 'Yazılım Proje Matrisi',
      headers: ['Yazılımcı', 'Kullanılan Dil', 'Proje Tipi', 'Analiz'],
      rows: [
        ['Ali', 'Python', 'Web', 'Yapay Zeka değil ve Mobil Cem’de'],
        ['Banu', 'Java', 'Yapay Zeka', 'Web’de Java yoksa mecburen burada'],
        ['Cem', 'Swift', 'Mobil', 'Kesin Bilgi: Cem = Mobil']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Kilitle', content: 'Cem Mobil projede, Ali Python kullanıyor.' },
      { step: 2, title: 'Ali’nin Projesini Bul', content: 'Ali Yapay Zeka değil ve Mobil doluysa Ali mecburen Web projesindedir.' },
      { step: 3, title: 'Banu’nun Projesi', content: 'Banu mecburen Yapay Zeka projesindedir.' },
      { step: 4, title: 'Dil Eşleşmesi', content: 'Web’de Java kullanılmadığına göre Java Banu’dadır. Cem’e Swift kalır.' }
    ],
    neuralBrake: "Bir değişkenin bir projede kullanılamayacağı bilgisi onu otomatik diğer boş projeye iter.",
    cognitiveTime: '30 saniye',
    synapticCoding: "'Kim neyi kullanmak zorunda?' sorusuna odaklan."
  },
  {
    id: 3018,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 18,
    title: 'Pilot Vardiyaları',
    category: 'Pilot – Uçak – Rota',
    context: 'Arda, Berk ve Cenk; Airbus, Boeing ve Embraer tipi uçaklarla Londra, Paris ve Roma rotalarında uçuş yapacaktır.',
    premises: [
      'Her pilot farklı bir uçak tipiyle farklı bir rotaya uçmaktadır.',
      'Roma rotasında uçan uçak Boeing değildir.',
      'Arda, Airbus tipi uçak kullanmaktadır ancak rotası Londra değildir.',
      'Berk, Roma rotasında uçmamaktadır.'
    ],
    questionStem: 'Buna göre Cenk hangi rotaya, hangi uçak tipiyle uçmaktadır?',
    options: [
      { letter: 'A', text: 'Roma rotasına Embraer ile', isCorrect: true },
      { letter: 'B', text: 'Londra rotasına Boeing ile', isCorrect: false },
      { letter: 'C', text: 'Paris rotasına Airbus ile', isCorrect: false },
      { letter: 'D', text: 'Roma rotasına Boeing ile', isCorrect: false }
    ],
    resultText: 'Cenk, Roma rotasına Embraer tipi uçakla uçmaktadır. Arda: Paris (Airbus), Berk: Londra (Boeing), Cenk: Roma (Embraer).',
    matrix: {
      title: 'Uçuş ve Rota Matrisi',
      headers: ['Pilot', 'Uçak Tipi', 'Rota', 'Analiz'],
      rows: [
        ['Arda', 'Airbus', 'Paris', 'Londra değil, Roma’da Arda/Berk yok'],
        ['Berk', 'Boeing', 'Londra', 'Roma değil ve Paris Arda’daysa'],
        ['Cenk', 'Embraer', 'Roma', 'Berk ve Arda Roma’da değilse tek kişi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyle Başla', content: 'Arda = Airbus. Arda Londra’ya gitmiyor.' },
      { step: 2, title: 'Rota Analizi', content: 'Berk Roma’ya gitmiyor. Arda da Londra değilse Roma rotası mecburen Cenk’e kalır.' },
      { step: 3, title: 'Uçak Tipini Eşleştir', content: 'Roma rotasında Boeing uçmuyorsa ve Airbus Arda’daysa Cenk Embraer kullanır.' },
      { step: 4, title: 'Kalanları Eşleştir', content: 'Berk Boeing ile Londra’ya uçar. Arda Airbus ile Paris’e uçar.' }
    ],
    neuralBrake: "Bir rotanın iki kişi tarafından dolaylı reddedilmesi onu üçüncü kişiye hapseder.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Pilotları satırlara, uçak ve rotaları sütunlara yaz.'
  },
  {
    id: 3019,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 19,
    title: 'Kimya Deneyleri',
    category: 'Uzman – Element – Renk',
    context: 'Arzu, Burak ve Can; Bakır, İyot ve Kükürt elementleriyle Mavi, Mor ve Sarı renkli çözeltiler elde etmişlerdir.',
    premises: [
      'Her uzman farklı bir element kullanmış ve farklı bir renkte çözelti elde etmiştir.',
      'Bakır elementi kullanılan deneyde Sarı renkli bir çözelti elde edilmemiştir.',
      'Arzu, İyot elementini kullanmıştır ancak elde ettiği çözelti Mor değildir.',
      'Can, Mavi renkli bir çözelti elde etmemiştir.',
      'Sarı çözelti, Kükürt elementinin kullanıldığı deneyde ortaya çıkmıştır.'
    ],
    questionStem: 'Buna göre Burak hangi elementi kullanmıştır ve hangi renkte çözelti elde etmiştir?',
    options: [
      { letter: 'A', text: 'Kükürt - Sarı', isCorrect: true },
      { letter: 'B', text: 'Bakır - Mor', isCorrect: false },
      { letter: 'C', text: 'İyot - Mavi', isCorrect: false },
      { letter: 'D', text: 'Kükürt - Mor', isCorrect: false }
    ],
    resultText: 'Burak, Kükürt elementini kullanmıştır ve Sarı renkte çözelti elde etmiştir. Arzu: İyot (Mavi), Burak: Kükürt (Sarı), Can: Bakır (Mor).',
    matrix: {
      title: 'Laboratuvar Analiz Matrisi',
      headers: ['Uzman', 'Kullanılan Element', 'Çözelti Rengi', 'Analiz'],
      rows: [
        ['Arzu', 'İyot', 'Mavi', 'Mor değil ve Sarı Kükürt’teyse tek yer'],
        ['Burak', 'Kükürt', 'Sarı', 'Sarı-Kükürt bloğu Burak’a kalır'],
        ['Can', 'Bakır', 'Mor', 'Mavi değil ve Sarı değilse tek yer']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Mühürlü Blok', content: '[Kükürt + Sarı] sarsılmaz bloğunu not et.' },
      { step: 2, title: 'Arzu’nun Verisi', content: 'Arzu İyot kullandı ve Mor değilse mecburen Mavi çözelti elde etti.' },
      { step: 3, title: 'Can’ın Elemesi', content: 'Can Mavi değil ve Bakır’da Sarı elde edilmediğine göre Can Bakır (Mor) olur.' },
      { step: 4, title: 'Son Yerleşim', content: 'Boşta kalan Burak [Kükürt + Sarı] eşleşmesini alır.' }
    ],
    neuralBrake: "Element-Renk eşleşmesini tek bir paket gibi düşünmek çözüm hızını ikiye katlar.",
    cognitiveTime: '35 saniye',
    synapticCoding: 'Kükürt = Sarı bloğunu mühürle.'
  },
  {
    id: 3020,
    atolyeId: 3,
    atolyeTitle: 'Atölye 3: Karmaşık Tablolar ve Üçlü Değişkenler Yönetimi',
    questionNumber: 20,
    title: 'İstihbarat Operasyonu',
    category: 'Ajan – Kod Adı – Şehir',
    context: 'Arda, Burak ve Can; Kartal, Pars ve Atmaca kod adlarını kullanarak Berlin, Tokyo ve Madrid şehirlerinde gizli operasyon yürütmektedir.',
    premises: [
      'Her ajan farklı bir kod adı kullanmakta ve farklı bir şehirde bulunmaktadır.',
      'Atmaca kod adlı ajan Berlin’de değildir.',
      'Can, Pars kod adını kullanmaktadır ancak bulunduğu şehir Tokyo değildir.',
      'Arda, Tokyo’da değildir ve kod adı Atmaca değildir.'
    ],
    questionStem: 'Buna göre Berlin’de bulunan ajan kimdir ve kod adı nedir?',
    options: [
      { letter: 'A', text: 'Can - Pars', isCorrect: true },
      { letter: 'B', text: 'Burak - Atmaca', isCorrect: false },
      { letter: 'C', text: 'Arda - Kartal', isCorrect: false },
      { letter: 'D', text: 'Burak - Kartal', isCorrect: false }
    ],
    resultText: 'Berlin’de bulunan ajan Can’dır ve kod adı Pars’tır. Arda: Madrid (Kartal), Burak: Tokyo (Atmaca), Can: Berlin (Pars).',
    matrix: {
      title: 'İstihbarat Operasyon Matrisi',
      headers: ['Ajan', 'Kod Adı', 'Görev Şehri', 'Analiz'],
      rows: [
        ['Arda', 'Kartal', 'Madrid', 'Atmaca ve Pars değilse Kartal, Tokyo değil'],
        ['Burak', 'Atmaca', 'Tokyo', 'Can ve Arda Tokyo’da değilse tek aday'],
        ['Can', 'Pars', 'Berlin', 'Kesin Bilgi: Can = Pars, Tokyo değilse Berlin']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kod Adlarını Dağıt', content: 'Can = Pars. Arda Atmaca değilse Arda = Kartal. Burak = Atmaca kalır.' },
      { step: 2, title: 'Şehir Elemesi', content: 'Arda Tokyo’da değil, Can Tokyo’da değil. O halde Tokyo’da olan Burak’tır.' },
      { step: 3, title: 'Burak ve Berlin', content: 'Burak (Atmaca) Berlin’de değildir kuralı zaten sağlandı.' },
      { step: 4, title: 'Sonuç', content: 'Can Tokyo’da değilse ve Burak Tokyo’daysa Can mecburen Berlin’dedir.' }
    ],
    neuralBrake: "'X, Y şehrinde değildir' tek başına yetmez; diğer iki ajanın oraya gidip gidemeyeceğini kontrol et.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'Kod adlarını (A-P-K) ilk 20 saniyede eşleştir.'
  }
];
