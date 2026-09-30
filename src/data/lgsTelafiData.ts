export interface LgsTelafiQuestion {
  id: number;
  category: 'Sözel Mantık' | 'Ana Fikir' | 'Çıkarım' | 'Cümlede Anlam' | 'Görsel & Tablo Yorumu' | 'Paragrafta Yapı';
  konu: string;
  context: string;
  tableOrPremises?: string[];
  questionStem: string;
  options: string[];
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
}

export const LGS_TELAFI_SORULARI: LgsTelafiQuestion[] = [
  {
    id: 1,
    category: 'Sözel Mantık',
    konu: 'Sıralama ve Yer Belirleme',
    context: 'Bir okulun 8. sınıf öğrencileri olan Ali, Burak, Ceren, Deniz ve Elif; kütüphanedeki 1, 2, 3, 4 ve 5 numaralı yan yana dizilmiş çalışma masalarında oturmaktadır. Masalar soldan sağa doğru 1\'den 5\'e kadar numaralandırılmıştır.',
    tableOrPremises: [
      'Deniz, tam ortadaki (3 numaralı) masada oturmaktadır.',
      'Ali ve Burak yan yana masalarda oturmamaktadır.',
      'Ceren, Ali\'nin hemen solundaki masada oturmaktadır.',
      'Elif, 1 numaralı masada değildir.'
    ],
    questionStem: 'Bu bilgilere göre 1 numaralı masada oturan öğrenci kesinlikle kimdir?',
    options: [
      'Burak',
      'Elif',
      'Ceren',
      'Ali'
    ],
    correctAnswer: 2,
    explanation: 'Ceren, Ali\'nin hemen solundaysa Ceren ve Ali sırasıyla yan yana (C, A) bir blok oluşturur. Deniz 3 numarada olduğundan, bu (C, A) bloğu yalnızca 1 ve 2 numaralı masalara yerleşebilir (çünkü 4 ve 5\'e yerleşirse 1 ve 2\'ye Burak ve Elif kalır; ancak Elif 1\'de olamayacağından Elif 2\'de, Burak 1\'de kalır, bu durumda Ali 5\'te, Burak 1\'de olur fakat blok 4-5\'tedir. Oysa Ceren 1, Ali 2 olduğunda Elif 1 olmama koşuluyla 4 veya 5\'e oturabilir ve Burak da Elif\'in yanına yerleşebilir). Dolayısıyla 1 numaralı masada mutlaka Ceren oturur.'
  },
  {
    id: 2,
    category: 'Ana Fikir',
    konu: 'Paragrafta Ana Düşünce',
    context: 'Bir yazarın büyüklüğü, dili süslü kelimelerle boğmasında değil; herkesin bildiği gündelik sözcüklerle daha önce hiç düşünülmemiş derinlikleri aktarabilmesindedir. Yalınlık, basitlik veya sıradanlık demek değildir; aksine fazlalıklardan arınmış, gereksiz her yükü sırtından atmış en saf ustalıktır. Mermer bloktan fazlalıkları yontarak heykeli ortaya çıkaran sanatçı gibi, hakiki edebiyatçı da kelimeleri yığarak değil, ayıklayarak ölümsüz eserler yaratır.',
    questionStem: 'Bu parçada asıl anlatılmak istenen düşünce aşağıdakilerden hangisidir?',
    options: [
      'Edebi başarının ölçütü, dili süslemekten ziyade fazlalıklardan arınmış sade bir ustalıkla derin anlamlar kurabilmektir.',
      'Yazarlar yalnızca halkın konuştuğu gündelik dili kullanmak zorundadır.',
      'Mermer heykeltıraşlığı edebiyattan daha üstün bir sanat dalıdır.',
      'Sade yazılan eserlerin hepsi zamanla unutulmaya mahkumdur.'
    ],
    correctAnswer: 0,
    explanation: 'Metnin ana fikri; gerçek ustalığın süslü söz yığınlarında değil, heykeltıraşın fazlalıkları ayıklaması gibi sade ama derin bir anlatım kurmakta yattığıdır.'
  },
  {
    id: 3,
    category: 'Sözel Mantık',
    konu: 'Grup Eşleştirme ve Branş Dağılımı',
    context: 'Bir kampa katılan Ayşe, Betül, Can ve Derya adlı dört öğrenci; Okçuluk, Yüzme ve Satranç branşlarından yalnızca birini seçmiştir. Branşlarla ilgili bilinenler şunlardır:',
    tableOrPremises: [
      'Her branşı en az bir öğrenci seçmiştir.',
      'Okçuluk branşını iki kişi seçmiştir.',
      'Can, Satranç branşını seçmiştir.',
      'Ayşe ve Betül farklı branşları seçmişlerdir.'
    ],
    questionStem: 'Bu bilgilere göre Derya\'nın seçtiği branş kesinlikle hangisidir?',
    options: [
      'Satranç',
      'Yüzme',
      'Okçuluk',
      'Okçuluk veya Satranç'
    ],
    correctAnswer: 2,
    explanation: 'Toplam 4 öğrenci vardır: Okçuluk (2 kişi), Satranç (1 kişi - Can), Yüzme (1 kişi). Can Satrançta olduğundan Satranç kontenjanı dolmuştur. Ayşe ve Betül farklı branşlardadır; biri Yüzme, diğeri Okçuluk olmak zorundadır. Okçulukta 2 kişi gerektiğine göre, kalan 1 kişi mutlaka Derya olmalıdır. Dolayısıyla Derya kesinlikle Okçuluk branşındadır.'
  },
  {
    id: 4,
    category: 'Çıkarım',
    konu: 'Neden-Sonuç ve Koşul İlişkisi',
    context: 'Akdeniz bölgesinde makilerin yapraklarının mumsu ve sert bir kütikula tabakasıyla kaplı olması, yazın aylar süren kavurucu sıcaklarda yapraktan buharlaşmayla gerçekleşen su kaybını en alt düzeye indirir. Eğer bu bitkiler geniş ve ince yapraklara sahip olsaydı, ilk kuraklık dalgasında dokularındaki tüm nemi kaybederek kururlardı.',
    questionStem: 'Bu parçaya göre makilerin kurak iklimde hayatta kalabilmesi aşağıdakilerden hangisine bağlanmıştır?',
    options: [
      'Yalnızca kış aylarında yaprak dökmelerine',
      'Güneş ışığını tamamen emen koyu renkli gövdelerine',
      'Su kaybını önleyen koruyucu ve sert yaprak anatomisine',
      'Toprak yüzeyine çok yakın kısa kök sistemlerine'
    ],
    correctAnswer: 2,
    explanation: 'Metinde makilerin sert ve mumsu yaprak kütikulasının terlemeyle su kaybını önleyerek kurak yaz aylarında hayatta kalmalarını sağladığı açıkça vurgulanmıştır.'
  },
  {
    id: 5,
    category: 'Sözel Mantık',
    konu: 'Kronolojik Sıralama ve Akıl Yürütme',
    context: 'Bir maraton yarışında Kemal, Leman, Mert, Nuri ve Oya ilk 5 sırayı paylaşmıştır. Bitiş çizgisine varış sıralarıyla ilgili şunlar bilinmektedir:',
    tableOrPremises: [
      'Mert yarışı Leman\'dan hemen önce bitirmiştir.',
      'Yarışı birinci bitiren kişi Kemal değildir.',
      'Nuri, yarışı Kemal\'den sonra ama Oya\'dan önce tamamlamıştır.',
      'Oya yarışı sonuncu (5.) olarak bitirmiştir.'
    ],
    questionStem: 'Bu bilgilere göre maraton yarışını birinci sırada tamamlayan kişi kimdir?',
    options: [
      'Mert',
      'Leman',
      'Kemal',
      'Nuri'
    ],
    correctAnswer: 0,
    explanation: 'Oya 5. sıradadır. Nuri, Kemal\'den sonra ve Oya\'dan önce olduğuna göre sıralama Kemal > Nuri > Oya şeklindedir (Oya 5 olduğuna göre Nuri 4, Kemal 3 veya 2 olabilir). Ancak Mert ve Leman peş peşe (Mert hemen Leman\'dan önce) bitirmiştir; yani (M, L) bloğu vardır. 5. sırada Oya varken, (M, L) bloğu 1 ve 2. sıralara yerleşmek zorundadır. Bu durumda 1. Mert, 2. Leman, 3. Kemal, 4. Nuri, 5. Oya olur. Kemal 1. değildir kuralı da doğrulanır. Dolayısıyla 1. sırada bitiren Mert\'tir.'
  },
  {
    id: 6,
    category: 'Cümlede Anlam',
    konu: 'Örtük Anlam ve Cümle Yorumu',
    context: '"Sanatçı, son romanında da okuyucuyu alıştığı mekanların dışına çıkarmaktan çekinmemiştir."',
    questionStem: 'Bu cümleden kesin olarak çıkarılabilecek yargı aşağıdakilerden hangisidir?',
    options: [
      'Yazarın bu romanı önceki romanlarından daha fazla satmıştır.',
      'Yazar daha önce de en az bir roman yazmış ve onda da alışılmışın dışındaki mekanları kullanmıştır.',
      'Yazar romanlarında sadece tarihi olayları konu edinmektedir.',
      'Yazarın romanları sadece yetişkin okuyuculara hitap etmektedir.'
    ],
    correctAnswer: 1,
    explanation: '"son romanında da" ifadesindeki "-de/-da" bağlacı, yazarın bundan önce de roman(lar) yazdığını ve bu roman(lar)ında da okuru alışılmışın dışındaki mekanlara taşıdığını kesin olarak gösterir.'
  },
  {
    id: 7,
    category: 'Görsel & Tablo Yorumu',
    konu: 'Tablo Okuma ve Veri Analizi',
    context: 'Bir kütüphanede bir hafta boyunca ödünç alınan kitap türlerinin dağılımı şöyledir:\n- Pazartesi: Roman (15), Bilim (8), Tarih (5)\n- Çarşamba: Roman (12), Bilim (14), Tarih (7)\n- Cuma: Roman (20), Bilim (6), Tarih (11)',
    questionStem: 'Bu verilere göre aşağıdaki yargılardan hangisi kesinlikle doğrudur?',
    options: [
      'Hafta boyunca en az ödünç alınan tür Roman olmuştur.',
      'Bilim türündeki kitapların en çok ödünç alındığı gün Çarşamba\'dır.',
      'Tarih kitapları her gün Bilim kitaplarından daha çok okunmuştur.',
      'Cuma günü toplam ödünç alınan kitap sayısı Çarşamba gününden daha azdır.'
    ],
    correctAnswer: 1,
    explanation: 'Bilim kitapları Pazartesi 8, Çarşamba 14, Cuma 6 adet alınmıştır; dolayısıyla Çarşamba günü 14 adetle en yüksek seviyededir.'
  },
  {
    id: 8,
    category: 'Paragrafta Yapı',
    konu: 'Düşüncenin Akışını Bozan Cümle',
    context: '(I) Kitap okuma alışkanlığı, bireyin düşünce dünyasını zenginleştiren en temel zihinsel faaliyettir. (II) Düzenli okuyan insanlar, karşılaştıkları problemleri daha analitik ve soğukkanlı çözebilirler. (III) Dünyadaki kağıt üretim maliyetleri son yıllarda oldukça artmıştır. (IV) Dahası, kelime dağarcığının genişlemesiyle birlikte kendini ifade etme becerisi de belirgin biçimde güçlenir.',
    questionStem: 'Bu parçada numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?',
    options: [
      'I',
      'II',
      'III',
      'IV'
    ],
    correctAnswer: 2,
    explanation: 'I, II ve IV numaralı cümleler kitap okumanın zihinsel ve dilsel faydalarını konu edinirken, III numaralı cümle tamamen alakasız şekilde kağıt üretim maliyetlerinden bahsettiği için akışı bozmaktadır.'
  },
  {
    id: 9,
    category: 'Sözel Mantık',
    konu: 'Koşullu Önermeler ve Doğruluk Değeri',
    context: 'Bir teknoloji kulübünde Arda, Berk ve Ceyda isimli üç öğrenciden her biri Yazılım, Robotik veya Tasarım masalarından birinde görevlidir. Masalar ve öğrencilerle ilgili şunlar bilinmektedir:',
    tableOrPremises: [
      'Her masada yalnızca bir öğrenci görevlidir.',
      'Arda Robotik masasında değildir.',
      'Eğer Berk Yazılım masasındaysa Ceyda Robotik masasındadır.',
      'Berk kesinlikle Tasarım masasındadır.'
    ],
    questionStem: 'Bu bilgilere göre Arda hangi masada görevlidir?',
    options: [
      'Yazılım',
      'Robotik',
      'Tasarım',
      'Yazılım veya Tasarım'
    ],
    correctAnswer: 0,
    explanation: 'Berk Tasarım masasındadır. Kalan masalar Yazılım ve Robotik\'tir. Arda Robotik masasında olmadığına göre, Arda mecburen Yazılım masasında olmalıdır. (Ceyda ise Robotik masasına kalır).'
  },
  {
    id: 10,
    category: 'Çıkarım',
    konu: 'Metnin Bütününe Hakim Anlam',
    context: 'Hata yapmaktan korkan bir öğrenci, aslında yeni bir şey öğrenmekten korkuyor demektir. Beynimiz, doğru yaptığımız anlardan ziyade hata yapıp o hatayı düzelttiğimiz anlarda nöronlar arası yeni ve kalıcı bağlantılar (sinapslar) kurar. Yanlış cevap, zihnin keşif yolculuğunda önüne çıkan bir duvar değil; doğru hedefe giden yolu aydınlatan bir trafik levhasıdır.',
    questionStem: 'Bu parçanın yazarına göre "hata yapmak" ile ilgili en doğru değerlendirme nedir?',
    options: [
      'Öğrencinin yeteneksiz olduğunu gösteren kalıcı bir eksikliktir.',
      'Öğrenme sürecini durduran ve özgüveni tamamen yok eden bir durumdur.',
      'Zihinsel gelişimi ve kalıcı öğrenmeyi sağlayan yapıcı bir rehberdir.',
      'Sadece sınav esnasında önemsenmesi gereken bir detaydır.'
    ],
    correctAnswer: 2,
    explanation: 'Yazar hataların nöronal bağlantı kurdurduğunu ve doğru hedefe giden yolu aydınlatan bir levha olduğunu belirterek, hatayı öğrenmeyi sağlayan yapıcı bir rehber olarak değerlendirmiştir.'
  }
];
