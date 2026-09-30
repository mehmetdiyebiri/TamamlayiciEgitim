import { SozelMantikItem } from './sozelMantikTypes';

export const ATOLYE_1_QUESTIONS: SozelMantikItem[] = [
  {
    id: 1001,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 1,
    title: 'Raf Dizilimi',
    category: 'Sıralama',
    context: 'Bir kütüphane rafına A, B, C, D ve E kitapları yan yana dizilmiştir.',
    premises: [
      "C kitabı, B'nin hemen sağındadır.",
      "A kitabı, E'nin solundadır.",
      'D kitabı en sağdadır.'
    ],
    questionStem: 'Buna göre, soldan ikinci kitap hangisidir?',
    options: [
      { letter: 'A', text: 'A kitabı', isCorrect: false },
      { letter: 'B', text: 'B kitabı', isCorrect: true },
      { letter: 'C', text: 'C kitabı', isCorrect: false },
      { letter: 'D', text: 'E kitabı', isCorrect: false }
    ],
    resultText: 'Soldan ikinci kitap B kitabıdır. Dizilim: A – B – C – E – D şeklindedir.',
    matrix: {
      title: 'Sinaptik Çözüm Matrisi (Raf Sıralaması)',
      headers: ['Sıra No', '1. Kitap', '2. Kitap', '3. Kitap', '4. Kitap', '5. Kitap'],
      rows: [
        ['Dizilim', 'A', 'B', 'C', 'E', 'D'],
        ['Analiz', 'E’nin solunda (En başta)', 'BC Bloğu başı', 'BC Bloğu sonu', 'A’nın sağında', 'Kesin Bilgi (En sağ)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Bilgiyi Yerleştir', content: "Öncülde 'D kitabı en sağdadır' denmiş. Bu, 5 numaralı koltuğun sahibinin kesinlikle D olduğunu gösterir." },
      { step: 2, title: 'Blok Oluşturma', content: "'C, B'nin hemen sağındadır' ifadesi bize ayrılmaz bir [BC] bloğu verir. Bu iki kitap her zaman yan yana ve bu sırayla durmalıdır." },
      { step: 3, title: 'Bağlantı Kurma', content: "'A, E'nin solundadır' ifadesi ise A…E şeklinde bir ilişki kurar (Aralarında kitap olabilir veya olmayabilir)." },
      { step: 4, title: 'Olasılıkları Deneme', content: "[BC] bloğu (2-3) sırasına konulduğunda, A 1. sıraya, E ise 4. sıraya düşer: A – B – C – E – D dizilimi kesinleşir." }
    ],
    neuralBrake: "'A, E'nin solundadır' dediğinde zihin bazen 'hemen solunda' gibi algılar. 'Hemen' kelimesi geçmiyorsa araya başka kitaplar girebilir.",
    cognitiveTime: '45-60 saniye',
    synapticCoding: 'Blok halindeki verileri [B-C] şeklinde kutu içine alarak işaretle.'
  },
  {
    id: 1002,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 2,
    title: 'Meyve Sepeti',
    category: 'Eşleştirme',
    context: 'Ali, Burak ve Can; elma, armut ve muz meyvelerinden birer tane almıştır.',
    premises: [
      'Ali elma almamıştır.',
      'Burak armut almıştır.'
    ],
    questionStem: 'Buna göre Can ne almıştır?',
    options: [
      { letter: 'A', text: 'Elma', isCorrect: true },
      { letter: 'B', text: 'Armut', isCorrect: false },
      { letter: 'C', text: 'Muz', isCorrect: false },
      { letter: 'D', text: 'Portakal', isCorrect: false }
    ],
    resultText: 'Can Elma almıştır. Ali Muz, Burak Armut almıştır.',
    matrix: {
      title: 'Sinaptik Çözüm Matrisi (Kişi - Meyve Tablosu)',
      headers: ['Kişiler', 'Elma', 'Armut', 'Muz'],
      rows: [
        ['Ali', 'X (Almamış)', 'X (Burak aldı)', '+ (Kalan tek meyve)'],
        ['Burak', 'X', '+ (Kesin Bilgi)', 'X'],
        ['Can', '+ (Kalan tek kişi)', 'X', 'X']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Bilgiyi İşle', content: "'Burak armut almıştır' ifadesi en sağlam çividir. Burak satırına ve Armut sütununa '+' koyuyoruz. Burak başka meyve alamaz, armudu da başka kimse alamaz." },
      { step: 2, title: 'Olumsuz Veriyi Değerlendir', content: "'Ali elma almamıştır' bilgisiyle Ali'nin Elma sütununa 'X' koyuyoruz." },
      { step: 3, title: 'Boşlukları Doldur', content: "Ali için geriye tek seçenek Muz kalır. Ali Muz alınca muz sütunu da kapanır." },
      { step: 4, title: 'Sonuca Ulaş', content: "Elma sütununda tek açık kalan kişi Can'dır. Dolayısıyla Can Elma almıştır." }
    ],
    neuralBrake: "'Ali elma almadıysa armut almıştır' gibi aceleci bir varsayıma kapılma! Burak'ın armut aldığı kesinleştiği an Ali için armut otomatik elenir.",
    cognitiveTime: '20-30 saniye',
    synapticCoding: 'Kesin olan verilere (+), imkansız olanlara (X) koyarak tabloyu kapat.'
  },
  {
    id: 1003,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 3,
    title: 'Kat Planı',
    category: 'Yerleştirme',
    context: 'Beş katlı bir binanın her katında bir daire vardır.',
    premises: [
      'Can en alt katta, Deniz ise en üst katta oturmaktadır.',
      "Ahmet, Burcu'nun üstündeki katlardan birinde oturmaktadır.",
      'Ahmet 4. kattadır.'
    ],
    questionStem: 'Buna göre Burcu kaçıncı katta oturuyor olabilir?',
    options: [
      { letter: 'A', text: 'Yalnız 2', isCorrect: false },
      { letter: 'B', text: 'Yalnız 3', isCorrect: false },
      { letter: 'C', text: '2 veya 3. kat', isCorrect: true },
      { letter: 'D', text: '1 veya 4. kat', isCorrect: false }
    ],
    resultText: 'Burcu 2. veya 3. kattadır.',
    matrix: {
      title: 'Sinaptik Dikey Bina Matrisi',
      headers: ['Kat No', 'Kişi', 'Durum / Olasılık'],
      rows: [
        ['5', 'Deniz', 'Kesin Bilgi (En üst kat)'],
        ['4', 'Ahmet', 'Kesin Bilgi'],
        ['3', '(Burcu?)', "Ahmet'in altında olduğu için aday"],
        ['2', '(Burcu?)', "Ahmet'in altında olduğu için aday"],
        ['1', 'Can', 'Kesin Bilgi (En alt kat)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Uç Noktaları Sabitle', content: 'Can 1. katta (en alt), Deniz ise 5. kattadır (en üst). Bu iki katı hemen eliyoruz.' },
      { step: 2, title: 'Kesin Veriyi İşle', content: "Ahmet'in 4. katta olduğu bilgisi verilmiş. 4 numaralı kutucuğa Ahmet yazılır." },
      { step: 3, title: 'Bağıntı Kurma', content: "'Ahmet, Burcu'nun üstündeki katlardan birindedir' ifadesi Burcu'nun kesinlikle 4. katın altında olduğunu gösterir." },
      { step: 4, title: 'Olasılıkları Sınırla', content: '1. katta Can oturduğuna göre Burcu için geriye sadece 2. kat veya 3. kat kalır.' }
    ],
    neuralBrake: "'Üstündeki katlardan birinde' ifadesi 'hemen üstünde' demek değildir. Araya kat girebilir.",
    cognitiveTime: '15-20 saniye',
    synapticCoding: 'Kesin olmayan yerleşimleri tabloya parantez içinde (Burcu?) şeklinde yaz.'
  },
  {
    id: 1004,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 4,
    title: 'Otobüs Terminali',
    category: 'Zaman Çizelgesi',
    context: "A, B, C ve D şehirlerine giden otobüslerin saatleri 10:00, 11:00, 12:00 ve 13:00'dür.",
    premises: [
      'A otobüsü en son kalkmaktadır.',
      "C otobüsü B'den önce, 11:00'den sonra kalkmaktadır."
    ],
    questionStem: 'Öncüllere göre mantıksal çelişkiyi yakalayarak B otobüsünün durumunu belirleyiniz.',
    options: [
      { letter: 'A', text: "B otobüsü saat 11:00'de kalkar.", isCorrect: false },
      { letter: 'B', text: "B otobüsü saat 12:00'de kalkar.", isCorrect: false },
      { letter: 'C', text: "B otobüsü 13:00'te kalkmalıdır fakat A ile çakışır (kurgu çelişir).", isCorrect: true },
      { letter: 'D', text: "B otobüsü saat 10:00'da kalkar.", isCorrect: false }
    ],
    resultText: "C 12:00'de kalkarsa B'nin 13:00'te olması gerekir ama 13:00'te A vardır; bu soru çakışma kurgusu inceler.",
    matrix: {
      title: 'Zaman Odaklı Terminal Matrisi',
      headers: ['Saat', 'Otobüs / Şehir', 'Analiz'],
      rows: [
        ['10:00', 'D', 'Kalan tek boşluk'],
        ['11:00', 'Boş / Kısıtlı', "C, 11:00'den sonra olmalı"],
        ['12:00', 'C', "11:00'den sonra ve B'den önce tek uygun saat"],
        ['13:00', 'A', "Kesin Bilgi (En son) - B buraya çakışır!"]
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Uç Noktayı Belirle', content: "En son kalkan otobüs 13:00 olduğundan A otobüsü 13:00'e kesin yerleşir." },
      { step: 2, title: 'Kısıtlamaları Analiz Et', content: "C '11:00'den sonra' kalkacaksa 12:00 veya 13:00 kalır. 13:00 dolu olduğundan C mecburen 12:00'dedir." },
      { step: 3, title: 'Bağıntıyı Kur', content: "C otobüsü B'den önce kalkacaksa, B'nin 12:00'den sonra (13:00) kalkması gerekir." },
      { step: 4, title: 'Çelişkiyi Yakala', content: "B'nin 13:00'te olması gerekirken 13:00'te zaten A vardır. Bu durum kurguda çelişki oluşturur." }
    ],
    neuralBrake: "Sözel mantıkta bazen 'boşluk kalması' değil, 'çakışma olması' sorulur.",
    cognitiveTime: '40 saniye',
    synapticCoding: 'Çakışan verilerin yanına ünlem (!) koyarak hatayı görselleştir.'
  },
  {
    id: 1005,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 5,
    title: 'Dil Kursu',
    category: 'Küme Mantığı',
    context: 'Bir sınıftaki öğrenciler İngilizce, Almanca ve Fransızca dillerinden en az birini bilmektedir.',
    premises: [
      'İngilizce bilen herkes Almanca da bilmektedir.',
      'Sadece Fransızca bilen 5 kişi vardır.'
    ],
    questionStem: 'Bu sınıfta Almanca bilip İngilizce bilmeyen öğrenci olması mümkün müdür?',
    options: [
      { letter: 'A', text: 'Hayır, kesinlikle imkansızdır.', isCorrect: false },
      { letter: 'B', text: 'Evet, Almanca kümesi İngilizceyi kapsadığından mümkündür.', isCorrect: true },
      { letter: 'C', text: 'Sadece Fransızca bilenler varsa mümkündür.', isCorrect: false },
      { letter: 'D', text: 'Bilgi yetersizdir.', isCorrect: false }
    ],
    resultText: 'Evet, Almanca bilip İngilizce bilmeyen birileri olabilir çünkü İngilizce kümesi Almanca kümesinin alt kümesidir.',
    matrix: {
      title: 'Venn Şeması Küme Dağılımı',
      headers: ['Bölge', 'Temsil Ettiği Durum', 'Varlık Durumu'],
      rows: [
        ['İ ⊂ A (İç Daire)', 'İngilizce ve Almanca Bilenler', 'Mevcut'],
        ['A \\ İ (Dış Halka)', 'Almanca bilip İngilizce bilmeyenler', 'Mümkün (Kısıt yok)'],
        ['F (Ayrık/Kesişen)', 'Sadece Fransızca bilenler', '5 kişi (Sabit)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kapsama İlişkisini Kur', content: "'İngilizce bilen herkes Almanca bilir' demek İ ⊂ A (İngilizce kümesi Almanca kümesinin içindedir) demektir." },
      { step: 2, title: 'Veriyi Yerleştir', content: "Fransızca için ayrı bir alan oluşturup sadece F'ye ait bölgeye 5 yazılır." },
      { step: 3, title: 'Boşluk Analizi', content: 'Şemada Almanca dairesinin içinde olup İngilizce dairesinin dışında kalan halka bölgesi vardır.' },
      { step: 4, title: 'Sonuca Ulaş', content: 'Bu halkanın boş olduğuna dair kısıtlama verilmediğinden burada öğrenci bulunması mümkündür.' }
    ],
    neuralBrake: "En büyük yanılsama: 'İngilizce bilen herkes Almanca bilir' cümlesini 'Almanca bilen herkes İngilizce bilir' şeklinde tersinden de doğru sanmaktır!",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Şemada İ ⊂ A ve F=5 notasyonunu kullan.'
  },
  {
    id: 1006,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 6,
    title: 'Nöbet Listesi',
    category: 'Sıralama',
    context: 'Pazartesi, Salı ve Çarşamba günleri Ali, Veli ve Selami nöbet tutacaktır.',
    premises: [
      'Ali Çarşamba günü nöbet tutmayacaktır.',
      "Selami'nin nöbeti Veli'den hemen sonradır."
    ],
    questionStem: 'Buna göre Pazartesi günü kim nöbet tutar?',
    options: [
      { letter: 'A', text: 'Ali', isCorrect: true },
      { letter: 'B', text: 'Veli', isCorrect: false },
      { letter: 'C', text: 'Selami', isCorrect: false },
      { letter: 'D', text: 'Belirlenemez', isCorrect: false }
    ],
    resultText: 'Pazartesi günü Ali nöbet tutar. Dizilim: Pazartesi Ali, Salı Veli, Çarşamba Selami.',
    matrix: {
      title: 'Gün Bazlı Nöbet Matrisi',
      headers: ['Gün', 'Nöbetçi', 'Sinaptik Çıkarım'],
      rows: [
        ['Pazartesi', 'Ali', 'Blok yerleşimi sonucu kalan tek gün'],
        ['Salı', 'Veli', 'Veli-Selami bloğunun başlangıcı'],
        ['Çarşamba', 'Selami', 'Ali burada olamaz, Selami tamamlar']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blok Oluşturma', content: "'Selami'nin nöbeti Veli'den hemen sonradır' ifadesi bize ayrılmaz bir [Veli - Selami] bloğu verir." },
      { step: 2, title: 'Olasılıkları Deneme', content: '3 gün ve 1 ikili blok var. Ya Pzt-Salı ya da Salı-Çarşamba olur.' },
      { step: 3, title: 'Kısıtlamayı Uygula', content: "Ali Çarşamba nöbet tutmayacaksa, blok Pzt-Salı olamaz çünkü o zaman Ali Çarşamba'ya kalırdı." },
      { step: 4, title: 'Kesinleşen Tablo', content: 'Blok mecburen Salı-Çarşamba günlerine oturur, Ali ise Pazartesi gününe yerleşir.' }
    ],
    neuralBrake: "'Hemen sonra' ifadesi anahtardır. Eğer 'hemen' demeseydi araya başka biri girebilirdi.",
    cognitiveTime: '30-40 saniye',
    synapticCoding: '[V → S] şeklinde bir okla ikilinin yönünü ve bitişikliğini sabitle.'
  },
  {
    id: 1007,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 7,
    title: 'Kutu Kulesi',
    category: 'Dikey Sıralama',
    context: 'Bir rafta kırmızı, mavi, yeşil ve sarı renkli kutular üst üste dizilmiştir.',
    premises: [
      'Sarı kutu en üsttedir.',
      'Mavi kutu, yeşil kutunun hemen altındadır.',
      'Kırmızı kutu ile yeşil kutu arasında bir kutu vardır.'
    ],
    questionStem: 'Buna göre en alttaki (4.) kutu hangisidir?',
    options: [
      { letter: 'A', text: 'Yeşil kutu', isCorrect: false },
      { letter: 'B', text: 'Mavi kutu', isCorrect: false },
      { letter: 'C', text: 'Kırmızı kutu', isCorrect: true },
      { letter: 'D', text: 'Sarı kutu', isCorrect: false }
    ],
    resultText: 'En alttaki kutu Kırmızı kutudur. Dizilim (yukarıdan aşağı): Sarı (1) - Yeşil (2) - Mavi (3) - Kırmızı (4).',
    matrix: {
      title: 'Dikey Kule Matrisi',
      headers: ['Kat (Sıra)', 'Kutu Rengi', 'Analiz'],
      rows: [
        ['1 (En Üst)', 'Sarı', 'Kesin Bilgi'],
        ['2', 'Yeşil', 'Mavi ile blok, Kırmızı ile aralıklı'],
        ['3', 'Mavi', "Yeşil'in hemen altı"],
        ['4 (En Alt)', 'Kırmızı', 'Yeşil ile arasında 1 kutu (Mavi) var']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Sabiti Yerleştir', content: "Sarı kutu en üsttedir (1. sıra). Geriye 2, 3 ve 4. sıralar kaldı." },
      { step: 2, title: 'Blok Oluşturma', content: "'Mavi, yeşilin hemen altındadır' ifadesinden [Yeşil / Mavi] yapışık bloğu elde edilir." },
      { step: 3, title: 'Aralıklı Blok Analizi', content: "'Kırmızı ile yeşil arasında bir kutu vardır' kuralını uygularız." },
      { step: 4, title: 'Dizilimi Netleştir', content: 'Yeşil 2, Mavi 3 olursa Kırmızı 4 olur. Yeşil ile Kırmızı arasında Mavi kalır ve tüm kurallar sağlanır.' }
    ],
    neuralBrake: "'Arasında bir kutu vardır' dendiğinde o kutunun kim olduğunu bilmek zorunda değilsin, bir boşluk bırakman yeterlidir.",
    cognitiveTime: '50-60 saniye',
    synapticCoding: 'Aralıklı blokları K _ Y şeklinde görselleştir.'
  },
  {
    id: 1008,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 8,
    title: 'Menü Seçimi',
    category: 'Kontenjan Takibi',
    context: 'Bir lokantada A, B ve C menüleri vardır. 10 kişi bu menülerden sipariş vermiştir.',
    premises: [
      'A menüsünü 4 kişi seçmiştir.',
      'B menüsünü 3 kişi seçmiştir.'
    ],
    questionStem: 'Buna göre C menüsünü kaç kişi seçmiştir?',
    options: [
      { letter: 'A', text: '2 kişi', isCorrect: false },
      { letter: 'B', text: '3 kişi', isCorrect: true },
      { letter: 'C', text: '4 kişi', isCorrect: false },
      { letter: 'D', text: '5 kişi', isCorrect: false }
    ],
    resultText: 'C menüsünü 3 kişi seçmiştir (10 - 4 - 3 = 3).',
    matrix: {
      title: 'Kontenjan Takip Havuzu',
      headers: ['Menü Türü', 'Seçen Kişi Sayısı', 'Durum'],
      rows: [
        ['A Menüsü', '4', 'Belirli'],
        ['B Menüsü', '3', 'Belirli'],
        ['C Menüsü', '3', 'Kalan Miktar (10 - 7)'],
        ['TOPLAM', '10', 'Sabit Havuz']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Toplamı Sabitle', content: 'Elimizdeki toplam veri 10 kişidir.' },
      { step: 2, title: 'Verilenleri Topla', content: 'Bilinen kategoriler: A (4 kişi) + B (3 kişi) = 7 kişi.' },
      { step: 3, title: 'Artık Miktarı Bul', content: 'Toplam sayıdan bilinenleri çıkar: 10 - 7 = 3.' },
      { step: 4, title: 'Eşleştirme', content: 'Kalan 3 kişilik seçim mecburen C menüsüne aittir.' }
    ],
    neuralBrake: "Kesin rakamlar verildiğinde varsayımlara değil basit toplama odaklanmalısın.",
    cognitiveTime: '15-20 saniye',
    synapticCoding: '10 - 4 - 3 = 3 formülünü kağıt kenarına not et.'
  },
  {
    id: 1009,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 9,
    title: 'Takım Dağılımı',
    category: 'Gruplandırma',
    context: 'Ece, Efe, Ege ve Ela ikişerli olarak Mavi ve Kırmızı takımlara ayrılacaktır.',
    premises: [
      'Ece ve Efe aynı takımda değildir.',
      'Ege Mavi takımdadır.'
    ],
    questionStem: 'Buna göre Kırmızı takımda kesinlikle yer alan kişi ve muhtemel takım arkadaşı kimdir?',
    options: [
      { letter: 'A', text: 'Kesinlikle Ela vardır; yanındaki kişi Ece veya Efe’dir.', isCorrect: true },
      { letter: 'B', text: 'Kesinlikle Ece vardır; yanındaki kişi Ela’dır.', isCorrect: false },
      { letter: 'C', text: 'Kesinlikle Efe vardır; yanındaki kişi Ege’dir.', isCorrect: false },
      { letter: 'D', text: 'Ela ve Ege birliktedir.', isCorrect: false }
    ],
    resultText: 'Kırmızı takımda Ela kesinlikle vardır; yanındaki arkadaşı ise Ece veya Efe’dir.',
    matrix: {
      title: 'Gruplandırma Matrisi',
      headers: ['Mavi Takım (2 Kişi)', 'Kırmızı Takım (2 Kişi)', 'Analiz'],
      rows: [
        ['Ege (Kesin)', 'Ela (Kesin Kalan)', "Ege maviye yazılınca Ela kırmızıya zorunlu kalır"],
        ['Ece veya Efe', 'Efe veya Ece', 'Zıtlık kuralı (Ece ve Efe ayrı takımlarda)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Sabitle', content: 'Ege Mavi takımdadır. Mavi kutusuna Ege yazılır.' },
      { step: 2, title: 'Zıtlık İlişkisini Kur', content: 'Ece ve Efe aynı takımda değilse biri Mavi, diğeri Kırmızı takımdadır (Ece ↔ Efe).' },
      { step: 3, title: 'Kontenjan Takibi', content: 'Mavi takımda Ege’nin yanına Ece veya Efe’den sadece biri gelebilir.' },
      { step: 4, title: 'Boşta Kalanı Yerleştir', content: 'Geriye kalan tek isim olan Ela mecburen Kırmızı takımdadır. Yanında Ece veya Efe yer alır.' }
    ],
    neuralBrake: "'Ece ve Efe aynı takımda değil' bilgisi, ikisinin de Kırmızı takımda olma ihtimalini tamamen yok eder.",
    cognitiveTime: '40-50 saniye',
    synapticCoding: 'Takımları iki kutu yapıp içine isimleri yazarak zıtlık okunu (↔) kullan.'
  },
  {
    id: 1010,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 10,
    title: 'Harf Dizisi',
    category: 'Konumlandırma',
    context: 'K, L, M, N harfleri bir sırada dizilmiştir.',
    premises: [
      'K, L’nin sağındadır.',
      'M, N’nin solundadır.',
      'L ve N yan yanadır.'
    ],
    questionStem: 'En soldaki (ilk sıradaki) harf hangisi “olamaz”?',
    options: [
      { letter: 'A', text: 'M harfi', isCorrect: false },
      { letter: 'B', text: 'L harfi', isCorrect: false },
      { letter: 'C', text: 'K harfi', isCorrect: true },
      { letter: 'D', text: 'N harfi', isCorrect: false }
    ],
    resultText: 'En soldaki harf kesinlikle K olamaz. Çünkü K’nin solunda en azından bir L harfi bulunmak zorundadır.',
    matrix: {
      title: 'Harf Yön Analiz Matrisi',
      headers: ['Harf', 'Solunda Olması Gereken', 'Sağında Olması Gereken', 'En Sola Geçebilir mi?'],
      rows: [
        ['K', 'L harfi kesin solunda olmalı', 'Yok', 'HAYIR (Solunda L olmak zorunda)'],
        ['L', 'Yok', 'K sağında olmalı', 'Evet'],
        ['M', 'Yok', 'N sağında olmalı', 'Evet (En güçlü aday)'],
        ['N', 'M solunda olmalı', 'Yok', 'Hayır (M solunda)']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Yönleri Belirle', content: 'L < K (L daha solda) ve M < N (M daha solda).' },
      { step: 2, title: 'Blok Yerleştirme', content: 'L ve N yan yana olduğuna göre dizilimin kalbi LN veya NL şeklindedir.' },
      { step: 3, title: 'Olasılıkları Birleştir', content: 'Dizilim M – L – N – K veya M – N – L – K olabilir.' },
      { step: 4, title: 'İmkansızlığı Yakala', content: 'Her iki senaryoda da K harfi L’nin sağında olmak zorundadır. K en sola konulursa L onun sağında kalır ve öncülle çelişir.' }
    ],
    neuralBrake: "'Hangisi olamaz' sorularında, bir şeyin sağında olarak tanımlanan öge asla dizinin en solunda yer alamaz.",
    cognitiveTime: '50-60 saniye',
    synapticCoding: 'L < K ve M < N şeklinde eşitsizlik sembolleriyle kodla.'
  },
  {
    id: 1011,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 11,
    title: 'Kurs Kayıtları',
    category: 'Karmaşık Eşleştirme',
    context: 'Arda, Berk, Ceyda ve Deniz; hafta sonu düzenlenen Gitar, Piyano, Resim ve Dans kurslarından birine kayıt yaptırmışlardır.',
    premises: [
      'Arda ve Ceyda’nın kayıt yaptırdığı kurslar sanat dalı (Gitar, Piyano, Resim) kategorisindedir; ancak ikisi de Piyano kursuna gitmemektedir.',
      'Berk, Dans kursuna kayıt yaptırmıştır.',
      'Deniz, Resim kursuna gitmemektedir.'
    ],
    questionStem: 'Buna göre Resim kursuna kim kayıt yaptırmış olabilir?',
    options: [
      { letter: 'A', text: 'Yalnız Berk', isCorrect: false },
      { letter: 'B', text: 'Yalnız Deniz', isCorrect: false },
      { letter: 'C', text: 'Arda veya Ceyda', isCorrect: true },
      { letter: 'D', text: 'Yalnız Arda', isCorrect: false }
    ],
    resultText: 'Resim kursuna Arda veya Ceyda kayıt yaptırmıştır. Deniz Piyano kursuna gitmiştir.',
    matrix: {
      title: '4x4 Kurs Eşleştirme Matrisi',
      headers: ['Kişiler', 'Gitar', 'Piyano', 'Resim', 'Dans'],
      rows: [
        ['Arda', 'Olası (+)', 'X (Gitmiyor)', 'Olası (+)', 'X (Sanat dalında)'],
        ['Berk', 'X', 'X', 'X', '+ (Kesin Bilgi)'],
        ['Ceyda', 'Olası (+)', 'X (Gitmiyor)', 'Olası (+)', 'X (Sanat dalında)'],
        ['Deniz', 'X', '+ (Kalan tek kişi)', 'X (Öncül)', 'X']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi İşle', content: 'Berk Dans kursuna gitmiştir (+).' },
      { step: 2, title: 'Kategori Sınırlaması', content: 'Arda ve Ceyda sanat dalına gidiyor ve Piyano’ya gitmiyor. Geriye Gitar ve Resim kalır.' },
      { step: 3, title: 'Kalanları Dağıt', content: 'Arda ve Ceyda Gitar ve Resim’i paylaşınca Piyano kursuna gidebilecek tek kişi kalır: Deniz.' },
      { step: 4, title: 'Sonuç Çıkarımı', content: 'Deniz Piyano’ya gittiğine göre Resim kursuna Arda veya Ceyda’dan biri kayıt yaptırmıştır.' }
    ],
    neuralBrake: "'Sanat dalı' gibi gruplandırmalarda önce grubun dışındakileri elemek zihinsel yükü hafifletir.",
    cognitiveTime: '45 saniye',
    synapticCoding: 'Tabloda + ve X işaretlerini kullanarak satır ve sütunları kapat.'
  },
  {
    id: 1012,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 12,
    title: 'Haftalık Ders Programı',
    category: 'Değişkenli Sıralama',
    context: 'Bir okulda öğretmenlik yapan Selin, Pazartesi’den Cuma’ya kadar her gün bir sınıfa (9, 10, 11, 12. sınıflar ve Hazırlık sınıfı) ders vermektedir.',
    premises: [
      '9. sınıfların dersi, 12. sınıflardan hemen önceki gündür.',
      'Hazırlık sınıfının dersi Çarşamba günüdür.',
      '10. sınıfların dersi, Hazırlık sınıfından sonraki günlerden birindedir.',
      '11. sınıfların dersi haftanın ilk günü değildir.'
    ],
    questionStem: 'Buna göre 11. sınıfların dersi hangi gündür?',
    options: [
      { letter: 'A', text: 'Pazartesi', isCorrect: false },
      { letter: 'B', text: 'Perşembe', isCorrect: false },
      { letter: 'C', text: 'Cuma', isCorrect: true },
      { letter: 'D', text: 'Salı', isCorrect: false }
    ],
    resultText: '11. sınıfların dersi Cuma günüdür. Program: Pazartesi 9, Salı 12, Çarşamba Hazırlık, Perşembe 10, Cuma 11.',
    matrix: {
      title: 'Haftalık Program Matrisi',
      headers: ['Günler', 'Sınıf', 'Analiz / Kısıt'],
      rows: [
        ['Pazartesi', '9. Sınıf', '11 olamaz, 9-12 bloğunun başı'],
        ['Salı', '12. Sınıf', '9-12 bloğunun devamı'],
        ['Çarşamba', 'Hazırlık', 'Kesin Bilgi'],
        ['Perşembe', '10. Sınıf', 'Hazırlık sonrası (10. sınıf zorunlu)'],
        ['Cuma', '11. Sınıf', 'Kalan tek boş gün']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Sabitle', content: 'Hazırlık sınıfı Çarşamba günüdür. Tablo ortadan ikiye bölündü.' },
      { step: 2, title: 'Blok Yerleştirme', content: "'9'lar 12'lerden hemen önce' [9-12] bloğu verir. Bu blok ya Pzt-Salı ya Perşembe-Cuma'dır." },
      { step: 3, title: 'Kısıtlamaları Kontrol Et', content: "10. sınıflar Çarşamba'dan sonraki bir gündeyse, [9-12] Perşembe-Cuma'ya konursa 10'lara yer kalmaz. Bu yüzden [9-12] mecburen Pazartesi-Salı olur." },
      { step: 4, title: 'Son Yerleşim', content: "11. sınıflar ilk gün olmadığına göre 10. sınıflar Perşembe, 11. sınıflar Cuma gününe kalır." }
    ],
    neuralBrake: "'Sonraki günlerden biri' ile 'hemen sonraki gün' farkına dikkat! 10. sınıflar Cuma da olabilirdi ama 11 için yer kalmadığından Perşembe'ye itildi.",
    cognitiveTime: '50-70 saniye',
    synapticCoding: 'Kesinleşen günlerin yanına onay işareti koyarak zihnini rahatlat.'
  },
  {
    id: 1013,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 13,
    title: 'Restoran Siparişleri',
    category: 'Öncelik-Sonralık',
    context: 'Bir restoranda A, B, C, D ve E müşterileri sırasıyla sipariş vermişlerdir.',
    premises: [
      'B’nin siparişi, D’den hemen sonra hazırlanmıştır.',
      'A’nın siparişi, C’den önce; ancak en başta değildir.',
      'E’nin siparişi, A’dan hemen sonra hazırlanmıştır.'
    ],
    questionStem: 'Buna göre siparişi 3. sırada hazırlanan müşteri hangisidir?',
    options: [
      { letter: 'A', text: 'B müşterisi', isCorrect: false },
      { letter: 'B', text: 'A müşterisi', isCorrect: true },
      { letter: 'C', text: 'C müşterisi', isCorrect: false },
      { letter: 'D', text: 'D müşterisi', isCorrect: false }
    ],
    resultText: 'Siparişi 3. sırada hazırlanan müşteri A’dır. Sıralama: D (1) – B (2) – A (3) – E (4) – C (5).',
    matrix: {
      title: 'Sipariş Sıralama Matrisi',
      headers: ['Sıra No', 'Müşteri', 'Analiz'],
      rows: [
        ['1', 'D', 'Blokların yerleşebileceği tek başlangıç'],
        ['2', 'B', 'D-B bloğunun parçası'],
        ['3', 'A', 'A-E bloğu başlangıcı (En başta olamaz kuralı)'],
        ['4', 'E', 'A’dan hemen sonra'],
        ['5', 'C', 'A’dan sonra kalan müşteri']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blokları Oluştur', content: 'İki blok: [D - B] ve [A - E].' },
      { step: 2, title: 'Bağlantı Kur', content: "'A, C'den öncedir' kurgusu: [A - E] ... C." },
      { step: 3, title: 'Kısıtlamayı Uygula', content: 'A en başta olamayacağına göre ilk sıraya diğer blok [D - B] gelmelidir.' },
      { step: 4, title: 'Dizilimi Tamamla', content: 'Dizilim: D(1) – B(2) – A(3) – E(4) – C(5) olur. 3. sırada A vardır.' }
    ],
    neuralBrake: "'A, C'den önce' ifadesini 'hemen önce' diye okuma! Araya başkaları girebilir.",
    cognitiveTime: '20 saniye',
    synapticCoding: 'D-B ve A-E bloklarını kare içine al, A < C ilişkisini okla göster.'
  },
  {
    id: 1014,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 14,
    title: 'Apartman Sakinleri ve Evcil Hayvanlar',
    category: 'Çoklu Değişken',
    context: 'Dört katlı bir apartmanın her katında bir kişi (Aslı, Burak, Ceren, Demir) yaşamakta ve farklı bir evcil hayvan (Kedi, Köpek, Kuş, Balık) beslemektedir.',
    premises: [
      'Demir, 2. katta yaşamaktadır ve köpeği vardır.',
      'Kuş besleyen kişi, en üst katta yaşamaktadır.',
      'Aslı, balık besleyen kişinin hemen üstündeki katta yaşamaktadır.',
      'Ceren, kedisi olan kişinin altındaki katlardan birinde yaşamaktadır.'
    ],
    questionStem: 'Buna göre 3. katta kim yaşamaktadır ve hangi hayvanı beslemektedir?',
    options: [
      { letter: 'A', text: 'Burak - Kedi', isCorrect: true },
      { letter: 'B', text: 'Aslı - Kuş', isCorrect: false },
      { letter: 'C', text: 'Ceren - Balık', isCorrect: false },
      { letter: 'D', text: 'Demir - Köpek', isCorrect: false }
    ],
    resultText: '3. katta Burak yaşamaktadır ve Kedi beslemektedir. 4: Aslı (Kuş), 3: Burak (Kedi), 2: Demir (Köpek), 1: Ceren (Balık).',
    matrix: {
      title: 'Apartman Kat & Hayvan Matrisi',
      headers: ['Kat No', 'Kişi', 'Hayvan', 'Analiz'],
      rows: [
        ['4', 'Aslı', 'Kuş', 'En üst kat (Kuş) ve Balığın üstü'],
        ['3', 'Burak', 'Kedi', 'Ceren’in üstünde kedi besleyen tek kişi'],
        ['2', 'Demir', 'Köpek', 'Kesin Bilgi'],
        ['1', 'Ceren', 'Balık', 'En alt kat ve Balık besleyen kişi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi İşle', content: 'Demir 2. katta ve Köpek besliyor. 4. katın hayvanı Kuş.' },
      { step: 2, title: 'Bağlantılı Blok Kur', content: "'Aslı, balık besleyenin hemen üstünde' bloğu [Aslı / Balık] sadece 4-3 veya 3-1 olabilir; 2 dolu olduğu için Aslı 4. katta, Balık 3 veya 1'dedir." },
      { step: 3, title: 'Kalan İsimleri Yerleştir', content: 'Aslı 4, Demir 2 ise geriye 1 ve 3 kalır. Ceren kedi besleyenin altındaysa Ceren 1. kattadır, Burak 3. kattadır.' },
      { step: 4, title: 'Kontrol ve Düzeltme', content: 'Kedi besleyen Burak (3), Balık besleyen Ceren (1) olunca tüm şartlar eksiksiz sağlanır.' }
    ],
    neuralBrake: "'Altındaki katlardan birinde' ile 'hemen altında' farkına dikkat et!",
    cognitiveTime: '80-90 saniye',
    synapticCoding: 'İsim ve hayvanları katların yanına sütun halinde yaz.'
  },
  {
    id: 1015,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 15,
    title: 'Şehir Uçuşları',
    category: 'Gruplandırma',
    context: 'Aylin, Bora, Cenk, Defne, Erdem ve Fulya isimli altı arkadaş; Ankara, İstanbul ve İzmir şehirlerinden birine uçmuşlardır.',
    premises: [
      'Her şehre en az bir, en fazla üç kişi uçmuştur.',
      'Ankara’ya sadece bir kişi uçmuştur ve bu kişi Bora değildir.',
      'Aylin ve Cenk aynı şehre uçmuşlardır.',
      'Defne ve Erdem farklı şehirlere uçmuşlardır.',
      'Fulya, İzmir’e uçmuştur.'
    ],
    questionStem: 'Buna göre Ankara’ya uçan kişi kimdir?',
    options: [
      { letter: 'A', text: 'Bora', isCorrect: false },
      { letter: 'B', text: 'Fulya', isCorrect: false },
      { letter: 'C', text: 'Defne veya Erdem', isCorrect: true },
      { letter: 'D', text: 'Aylin veya Cenk', isCorrect: false }
    ],
    resultText: 'Ankara’ya uçan kişi Defne veya Erdem’dir.',
    matrix: {
      title: 'Şehir Kontenjan Matrisi',
      headers: ['Şehir', 'Kişiler', 'Kontenjan / Kural'],
      rows: [
        ['Ankara (1 Kişi)', 'Defne (veya Erdem)', 'Bora değil, AC bloğu sığmaz, Fulya İzmir’de'],
        ['İstanbul (Max 3)', 'Aylin, Cenk, Bora', 'AC bloğu ve Bora buraya yerleşebilir'],
        ['İzmir (Max 3)', 'Fulya, Erdem (veya Defne)', 'Fulya kesin İzmir’de']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Verileri ve Kontenjanı Yaz', content: 'Ankara = 1 kişi (Bora değil). Fulya = İzmir. Toplam 6 kişi.' },
      { step: 2, title: 'Blok Oluşturma', content: 'Aylin ve Cenk [AC] bloğu oluşturur. Ankara tek kişilik olduğundan bu blok oraya gidemez.' },
      { step: 3, title: 'Zıtlık İlişkisini Kullan', content: 'Defne ve Erdem farklı şehirlere gitmiştir (D ≠ E).' },
      { step: 4, title: 'Olasılıkları Daralt', content: 'Aylin, Cenk, Fulya, Bora Ankara’ya gidemediği için Ankara koltuğu mecburen Defne veya Erdem’e kalır.' }
    ],
    neuralBrake: "'Sadece bir kişi' kısıtlaması, 2 kişilik blokların o kategoriye girmesini otomatik engeller.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Kontenjanları (1-3-2) şehirlerin yanına not et: A=C ve D≠E sembollerini kullan.'
  },
  {
    id: 1016,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 16,
    title: 'Kütüphane Kitap Ödünç Alma',
    category: 'Çapraz Eşleştirme',
    context: 'Kaan, Leyla, Mert ve Nil; Pazartesi ve Salı günleri Roman, Şiir, Tarih ve Bilim türlerinden birer kitap ödünç almışlardır. Her gün iki kişi kitap almıştır.',
    premises: [
      'Mert, Salı günü Roman türünde bir kitap almıştır.',
      'Tarih ve Bilim kitapları aynı gün ödünç alınmıştır.',
      'Kaan, Pazartesi günü kitap almıştır; ancak aldığı kitap Şiir değildir.',
      'Leyla ve Nil farklı günlerde kitap almışlardır.'
    ],
    questionStem: 'Buna göre Pazartesi günü Bilim kitabı alan kişi kimdir?',
    options: [
      { letter: 'A', text: 'Mert', isCorrect: false },
      { letter: 'B', text: 'Kaan', isCorrect: true },
      { letter: 'C', text: 'Leyla', isCorrect: false },
      { letter: 'D', text: 'Nil', isCorrect: false }
    ],
    resultText: 'Pazartesi günü Bilim kitabı alan kişi Kaan’dır (Nil Tarih, Mert Roman, Leyla Şiir almıştır).',
    matrix: {
      title: 'Zaman Odaklı Çapraz Matris',
      headers: ['Günler', '1. Kişi / Kitap', '2. Kişi / Kitap', 'Analiz'],
      rows: [
        ['Pazartesi', 'Kaan / Bilim', 'Nil / Tarih', 'Tarih-Bilim bloğu buraya sığar'],
        ['Salı', 'Mert / Roman', 'Leyla / Şiir', 'Mert kesin, Leyla kalan tek kişi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi İşle', content: 'Mert Salı günü Roman almıştır. Kaan Pazartesi günündedir.' },
      { step: 2, title: 'Blok Yerleştirme', content: "Tarih ve Bilim aynı gün alınmıştır [Tarih-Bilim]. Salı gününde bir yer dolu olduğundan bu ikili mecburen Pazartesi'ye yerleşir." },
      { step: 3, title: 'Kişi Dağılımı', content: "Leyla ve Nil farklı günlerdeyse biri Pazartesi, biri Salı'dır." },
      { step: 4, title: 'Eşleştirme ve Sonuç', content: "Pazartesi günü Tarih ve Bilim alındığına ve Kaan Pazartesi günü Şiir almadığına göre Kaan Bilim (veya Tarih) almıştır. Kaan Bilim aldığında yanındaki Nil Tarih alır." }
    ],
    neuralBrake: "'Aynı gün' ifadesi o günün kontenjanını hızla kapatır. İki kitaplık paket Salı'ya sığamazdı.",
    cognitiveTime: '60-80 saniye',
    synapticCoding: 'Pazartesi (P), Salı (S) olarak kodla, kitap türlerini B, T, R, Ş olarak yaz.'
  },
  {
    id: 1017,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 17,
    title: 'Bilgi Yarışması',
    category: 'Puan ve Sıra',
    context: 'Can, Eda, Mete ve Oya bir bilgi yarışmasına katılmış; 70, 80, 85 ve 90 puanlarından birini almışlardır.',
    premises: [
      'Eda, Mete’den daha yüksek puan almıştır.',
      'En yüksek puanı Can almamıştır.',
      'Oya, 85 puan almıştır.'
    ],
    questionStem: 'Buna göre 80 puan alan kişi kimdir?',
    options: [
      { letter: 'A', text: 'Eda', isCorrect: false },
      { letter: 'B', text: 'Can', isCorrect: true },
      { letter: 'C', text: 'Mete', isCorrect: false },
      { letter: 'D', text: 'Oya', isCorrect: false }
    ],
    resultText: '80 puan alan kişi Can’dır. Puanlar: Eda 90, Oya 85, Can 80, Mete 70.',
    matrix: {
      title: 'Puan Sıralama Matrisi',
      headers: ['Puan', 'Kişi', 'Analiz'],
      rows: [
        ['90', 'Eda', 'Can olamaz, Mete’den yüksek olmalı'],
        ['85', 'Oya', 'Kesin Bilgi'],
        ['80', 'Can', 'Kalan tek makul yer'],
        ['70', 'Mete', 'Eda’dan düşük kalmalı']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Veriyi Yerleştir', content: 'Oya 85 puan almıştır. Tablonun ikinci sırası kapanır.' },
      { step: 2, title: 'Olumsuz Veriyi Değerlendir', content: 'En yüksek puanı (90) Can almamıştır. Can 80 veya 70 almıştır.' },
      { step: 3, title: 'Büyüklük İlişkisini Kur', content: 'Eda > Mete. Boşta kalan puanlar 90, 80, 70.' },
      { step: 4, title: 'Olasılıkları Daralt', content: 'Can 90 alamıyorsa ve Mete Eda’dan düşük olmak zorundaysa 90’ı Eda alır. Can 80, Mete 70 puan alır.' }
    ],
    neuralBrake: "'En yüksek puanı Can almamıştır' dendiğinde zihin Can'ı en sona atma eğilimi gösterir. Oysa Can ikinci veya üçüncü de olabilir.",
    cognitiveTime: '30-45 saniye',
    synapticCoding: 'E > M ve C ≠ 90 sembolik notlarını al.'
  },
  {
    id: 1018,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 18,
    title: 'Vagon Dağılımı',
    category: 'Kapasite ve Renk',
    context: 'Bir trenin 1, 2, 3 ve 4 numaralı vagonları Kırmızı, Mavi, Yeşil ve Sarı renklerdedir. Her vagonda sadece bir görevli (Ali, Burak, Cem, Deniz) bulunmaktadır.',
    premises: [
      'Mavi vagon, 3 numaralı vagondur.',
      'Cem, Kırmızı vagondadır.',
      'Ali, 1 numaralı vagondadır; ancak vagonu Sarı değildir.',
      'Deniz, Yeşil vagondan bir önceki vagondadır.'
    ],
    questionStem: 'Buna göre 4 numaralı vagonun rengi ve görevlisi kimdir?',
    options: [
      { letter: 'A', text: 'Yeşil vagon - Cem', isCorrect: true },
      { letter: 'B', text: 'Sarı vagon - Burak', isCorrect: false },
      { letter: 'C', text: 'Kırmızı vagon - Ali', isCorrect: false },
      { letter: 'D', text: 'Mavi vagon - Deniz', isCorrect: false }
    ],
    resultText: '4 numaralı vagon Yeşil, görevlisi Deniz’in bir önündeki kuralına göre Cem’dir.',
    matrix: {
      title: 'Vagon ve Görevli Matrisi',
      headers: ['Vagon No', 'Renk', 'Görevli', 'Analiz'],
      rows: [
        ['1', 'Kırmızı / Sarı', 'Ali', 'Sarı değilse Kırmızı adayı'],
        ['2', 'Sarı / Yeşil', 'Deniz', 'Yeşil’den bir önceki vagon kuralı'],
        ['3', 'Mavi', 'Burak', 'Mavi kesin bilgi, Burak kalan kişi'],
        ['4', 'Yeşil', 'Cem', 'Yeşil vagon ve Cem yerleşimi']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Kesin Verileri İşle', content: 'Mavi 3 numarada, Ali 1 numaradadır.' },
      { step: 2, title: 'Blok ve Konum Analizi', content: "'Deniz, Yeşil vagondan bir önceki vagondadır' [Deniz - Yeşil] sıralı ilişkisi verir." },
      { step: 3, title: 'Renkleri Yerleştir', content: 'Ali Sarı değil, 3 Mavi. Yeşil 4 numaraya gelirse Deniz 2 veya 3 olur.' },
      { step: 4, title: 'Kişileri Eşleştir', content: 'Tüm kısıtlamalar çapraz denetlendiğinde 4 numaralı vagon Yeşil çıkar.' }
    ],
    neuralBrake: "İlk kurduğun mantık diğer öncülle çelişirse panik yapmadan blok kaydırma yapmalısın.",
    cognitiveTime: '90-120 saniye',
    synapticCoding: 'Renk ve isimleri hafifçe yazıp kesinleşince koyulaştır.'
  },
  {
    id: 1019,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 19,
    title: 'Restoran Menüsü',
    category: 'Kalori Sıralaması',
    context: 'Bir restoranda satılan K, L, M, N ve P yemeklerinin kalori miktarları birbirinden farklıdır.',
    premises: [
      'M yemeği, L yemeğinden daha yüksek; ancak K yemeğinden daha düşük kalorilidir.',
      'P yemeği en düşük kalorili yemek değildir.',
      'N yemeğinin kalorisi, L yemeğinden daha düşüktür.'
    ],
    questionStem: 'Buna göre kalori miktarı en yüksek olan yemek hangisidir?',
    options: [
      { letter: 'A', text: 'K yemeği', isCorrect: true },
      { letter: 'B', text: 'M yemeği', isCorrect: false },
      { letter: 'C', text: 'P yemeği', isCorrect: false },
      { letter: 'D', text: 'L yemeği', isCorrect: false }
    ],
    resultText: 'Kalori miktarı en yüksek olan yemek K yemeğidir. Zincir: K > M > L > N (ve P en düşük değil).',
    matrix: {
      title: 'Eşitsizlik Zinciri Matrisi',
      headers: ['Sıra (Yüksekten Düşüğe)', 'Yemek', 'Analiz'],
      rows: [
        ['1 (En Yüksek)', 'K', 'M ve L’den yüksek, zirve adayı'],
        ['2', 'M', 'K’den düşük, L’den yüksek'],
        ['3', 'L', 'M’den düşük, N’den yüksek'],
        ['4 veya 5', 'P', 'En düşük değil kuralı'],
        ['En Düşük', 'N', 'L’den düşük, bilinen en dip']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Zincirleri Birleştir', content: 'K > M > L ve L > N birleşince: K > M > L > N oluşur.' },
      { step: 2, title: 'Kayıp Parçayı Bul', content: 'K, M, L, N sıralaması kesin. Geriye P yemeği kaldı.' },
      { step: 3, title: 'Kısıtlamayı Uygula', content: "'P en düşük değildir' dendiğine göre P, N'den büyüktür." },
      { step: 4, title: 'En Yüksek Analizi', content: 'P hakkında K’den büyük olduğuna dair bilgi yoktur. K mevcut zinciri domine ettiği için zirvededir.' }
    ],
    neuralBrake: "'En düşük değildir' ifadesi P'nin 'en yüksek' olduğu anlamına gelmez!",
    cognitiveTime: '15-20 saniye',
    synapticCoding: 'K > M > L > N zincirini tek satırda yaz.'
  },
  {
    id: 1020,
    atolyeId: 1,
    atolyeTitle: 'Atölye 1: Temel Bloklar ve Matris İnşası',
    questionNumber: 20,
    title: 'Haftalık Nöbet ve İzin Günleri',
    category: 'Kombinasyonlu Sıralama',
    context: 'Pazartesi’den Cuma’ya kadar (5 gün) Kerem, Leyla, Murat, Nil ve Oya bir hastanede nöbet tutacaktır.',
    premises: [
      'Kerem ve Nil’in nöbet günleri arasında iki gün vardır.',
      'Murat, Nil’den hemen sonraki gün nöbet tutacaktır.',
      'Leyla’nın nöbet günü, Oya’nın nöbet gününden öncedir.',
      'Hiç kimse nöbet tuttuğu günün hemen ertesi günü izin kullanmamaktadır.'
    ],
    questionStem: 'Perşembe günü kimin nöbetçi olduğu kesin olarak söylenebilir?',
    options: [
      { letter: 'A', text: 'Kerem', isCorrect: false },
      { letter: 'B', text: 'Nil', isCorrect: true },
      { letter: 'C', text: 'Murat', isCorrect: false },
      { letter: 'D', text: 'Leyla', isCorrect: false }
    ],
    resultText: 'Perşembe günü kesin olarak Nil nöbetçidir. Günler: Pazartesi Kerem, Salı Leyla, Çarşamba Oya, Perşembe Nil, Cuma Murat.',
    matrix: {
      title: 'Haftalık Planlama Matrisi',
      headers: ['Günler', 'Nöbetçi', 'Sinaptik Analiz'],
      rows: [
        ['Pazartesi', 'Kerem', 'K-N arası 2 gün kuralı başlangıcı'],
        ['Salı', 'Leyla', 'Oya’dan önce olma kuralı'],
        ['Çarşamba', 'Oya', 'Kalan boşluğa yerleşim'],
        ['Perşembe', 'Nil', 'K-N arası 2 gün kuralı bitişi'],
        ['Cuma', 'Murat', 'Nil’den hemen sonraki gün [N-M] bloğu']
      ]
    },
    solutionSteps: [
      { step: 1, title: 'Blokları Oluştur', content: "'Nil'den hemen sonra Murat' [N - M] bloğudur. 'Kerem ve Nil arasında iki gün' K _ _ N veya N _ _ K." },
      { step: 2, title: 'Olasılıkları Birleştir', content: 'K _ _ N dizilimine M eklenince K _ _ N M yapısı oluşur ve tam 5 gün eder.' },
      { step: 3, title: 'Kalanları Dağıt', content: "Geriye Salı ve Çarşamba kalır. 'Leyla Oya'dan öncedir' kuralıyla Salı Leyla, Çarşamba Oya olur." },
      { step: 4, title: 'Kesinlik Kontrolü', content: '1-Kerem, 2-Leyla, 3-Oya, 4-Nil, 5-Murat. Perşembe günü kesin Nil nöbetçidir.' }
    ],
    neuralBrake: "İzin günü bilgisi bazen soruyu zorlaştırmak için eklenir. Soru nöbeti soruyorsa sadece nöbet verisine odaklan.",
    cognitiveTime: '30 saniye',
    synapticCoding: 'Blokları kağıdın kenarına K _ _ N M şeklinde çiz.'
  }
];
