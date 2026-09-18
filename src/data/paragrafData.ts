export interface ParagrafQuestion {
  id: number;
  questionStem: string;
  questionType: 'Ana Fikir' | 'Yardımcı Fikir' | 'Çıkarım' | 'Anlatım Biçimi' | 'Konu / Başlık';
  options: string[];
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
}

export interface ParagrafItem {
  id: number;
  title: string;
  category: 'Bilim' | 'Tarih' | 'Teknoloji' | 'Sanat' | 'Coğrafya' | 'Edebiyat';
  kur: string; // e.g. "Kur 1: Temel", "Kur 2: Orta", "Kur 3: İleri"
  paragraphText: string;
  questions: ParagrafQuestion[];
}

export const PARAGRAF_CATEGORIES = ['Tümü', 'Bilim', 'Tarih', 'Teknoloji', 'Sanat', 'Coğrafya', 'Edebiyat'] as const;

export const ALL_PARAGRAFLAR: ParagrafItem[] = [
  // BİLİM
  {
    id: 1,
    title: "Beyin ve Uyku Arasındaki Temizlik Mesaisi",
    category: "Bilim",
    kur: "Kur 1: Temel",
    paragraphText: "Uyku, uzun yıllar boyunca beynin sadece dinlendiği ve pasif bir konuma geçtiği bir evre olarak düşünülmüştür. Oysa son yıllarda keşfedilen 'gliyofatik sistem', uykunun aslında beynin en yoğun temizlik mesaisi olduğunu göstermektedir. Derin uyku esnasında beyin hücreleri arasındaki boşluklar yaklaşık yüzde 60 oranında genişler ve beyin omurilik sıvısı bu kanallardan hızla akarak gün boyunca biriken toksik proteinleri (örneğin Alzheimer'a yol açan amiloid-beta plaklarını) süpürüp atar. Yeterli ve kaliteli uyumayan bireylerde bu biyolojik atıklar temizlenemez, bu da hafıza kayıplarına ve odaklanma güçlüklerine zemin hazırlar.",
    questions: [
      {
        id: 101,
        questionStem: "Bu metnin ana düşüncesi aşağıdakilerden hangisidir?",
        questionType: "Ana Fikir",
        options: [
          "Uykusuzluk çeken insanların tümünde Alzheimer hastalığı mutlaka ortaya çıkar.",
          "Uyku, beynin pasif dinlenmesinden ziyade hücresel atıkları temizleyen hayati bir onarım sürecidir.",
          "Gliyofatik sistem yalnızca gündüz saatlerinde aktif olarak çalışır.",
          "Beyin omurilik sıvısı sadece yaşlı insanlarda toksinleri temizler."
        ],
        correctAnswer: 1,
        explanation: "Metin uykunun pasif bir mola olmadığını, beynin toksik proteinleri temizlediği aktif bir süreç olduğunu ana fikir olarak vurgulamaktadır."
      },
      {
        id: 102,
        questionStem: "Bu parçadan aşağıdakilerden hangisi **çıkarılamaz**?",
        questionType: "Çıkarım",
        options: [
          "Derin uykuda beyin hücreleri arasındaki boşluklarda belirgin bir genişleme gerçekleşir.",
          "Temizlenemeyen toksik atıklar bilişsel fonksiyonlarda ve odaklanmada gerilemeye yol açabilir.",
          "Günün her saatinde uyunması insan zekasını doğrudan iki katına çıkarır.",
          "Amiloid-beta plaklarının birikimi Alzheimer riskiyle ilişkilendirilmektedir."
        ],
        correctAnswer: 2,
        explanation: "Metinde uykunun zekayı iki katına çıkardığına dair hiçbir ifade yer almamaktadır; bu abartılı ve asılsız bir yargıdır."
      },
      {
        id: 103,
        questionStem: "Bu metnin anlatımında aşağıdakilerin hangisinden yararlanılmıştır?",
        questionType: "Anlatım Biçimi",
        options: [
          "Olay örgüsüne dayalı öyküleme",
          "Açıklama ve sayısal veriden yararlanma (%60)",
          "Bilinç akışı ve kişileştirme",
          "Karşılıklı konuşmalara dayalı tartışma"
        ],
        correctAnswer: 1,
        explanation: "Yazar okuyucuyu bilgilendirmek amacıyla açıklayıcı anlatım kullanmış ve '%60 oranında genişler' ifadesiyle sayısal veriden yararlanmıştır."
      }
    ]
  },
  {
    id: 2,
    title: "Derin Denizlerin Işıldayan Canlıları: Biyolüminesans",
    category: "Bilim",
    kur: "Kur 2: Orta",
    paragraphText: "Okyanusların 200 metreden daha derin bölgelerine güneş ışığı neredeyse hiç ulaşamaz; 1000 metreden sonra ise zifiri bir karanlık hüküm sürer. Bu dondurucu ve ışıksız alemde yaşayan canlıların yüzde 90'a yakını, 'biyolüminesans' adı verilen bir kimyasal tepkimeyle kendi ışıklarını üretir. Lusiferin pigmentinin lusiferaz enzimi ve oksijenle birleşmesi sonucu ortaya çıkan bu soğuk ışık, neredeyse hiç ısı yaymaz. Derin deniz balıkları, deniz anaları ve kalamarlar bu ışığı yalnızca karanlıkta yön bulmak için kullanmazlar. Kimi bir avcıyı şaşırtmak ve gözünü kamaştırmak, kimi zifiri suda eşini bulmak, kimi ise fener balığında olduğu gibi meraklı kurbanları kendine doğru çekip avlamak için bu parıltıdan yararlanır.",
    questions: [
      {
        id: 201,
        questionStem: "Bu parçaya göre canlıların kendi ışığını üretmesinin **amaçları arasında** aşağıdakilerden hangisi yer almaz?",
        questionType: "Yardımcı Fikir",
        options: [
          "Avını kendine doğru çekerek avlanmak",
          "Avcılardan kaçarken onları şaşırtıp uzaklaştırmak",
          "Deniz suyunun sıcaklığını artırarak buzları eritmek",
          "Karanlık sularda kendi türünden eşini bulmak"
        ],
        correctAnswer: 2,
        explanation: "Metinde üretilen ışığın 'soğuk ışık' olduğu ve ısı yaymadığı belirtilmiştir; deniz suyunu ısıtmak veya buz eritmek gibi bir işlevi yoktur."
      },
      {
        id: 202,
        questionStem: "Bu parçanın konusu en doğru şekilde hangisinde belirtilmiştir?",
        questionType: "Konu / Başlık",
        options: [
          "Okyanus tabanındaki volkanik hareketler",
          "Derin deniz canlılarının ışık üretme mekanizması ve bu ışığın kullanım alanları",
          "Güneş ışınlarının deniz suyundaki kırılma açıları",
          "Küresel ısınmanın balık türleri üzerindeki etkileri"
        ],
        correctAnswer: 1,
        explanation: "Parça derin deniz canlılarının biyolüminesans yoluyla ışık üretmesini ve bunu avlanma, savunma, eş bulma gibi işlevlerde kullanmasını konu almaktadır."
      }
    ]
  },

  // TARİH
  {
    id: 3,
    title: "Göbeklitepe: Tarihin Sıfır Noktası ve İnanç",
    category: "Tarih",
    kur: "Kur 1: Temel",
    paragraphText: "Şanlıurfa yakınlarında keşfedilen Göbeklitepe, arkeoloji dünyasının insanlık tarihine dair kabullerini derinden sarstı. Klasik tarih tezi; insanların önce tarımı keşfedip yerleşik köyler kurduğunu, ardından şehirleri ve nihayetinde tapınakları inşa ettiğini savunuyordu. Ancak günümüzden yaklaşık 12.000 yıl öncesine tarihlenen Göbeklitepe'de devasa 'T' biçimli dikilitaşlar ve görkemli tapınak alanları ortaya çıkarıldığında bu alanın avcı-toplayıcı göçebeler tarafından inşa edildiği anlaşıldı. Yani insanları bir araya getiren ve organize eden ilk itici güç tarımsal zorunluluklar değil, ortak inanç ve ritüellerdi. İnanç, yerleşik yaşamı ve dolayısıyla tarımı tetikleyen temel katalizör olmuştur.",
    questions: [
      {
        id: 301,
        questionStem: "Bu parçada Göbeklitepe ile ilgili asıl vurgulanmak istenen düşünce nedir?",
        questionType: "Ana Fikir",
        options: [
          "Eski insanların taştan aletler yapmada başarısız olduğu",
          "Tapınakların ve dini ritüellerin yerleşik yaşama geçişte tarımdan önce gelen birleştirici bir güç olduğu",
          "Şanlıurfa'nın dünyanın en kalabalık ticaret şehri olduğu",
          "Göbeklitepe'nin bir gökbilim gözlemevi olarak tasarlandığı"
        ],
        correctAnswer: 1,
        explanation: "Metnin ana fikri, sanılanın aksine tarımın değil ortak inanç ve tapınma ihtiyacının insanları organize ederek yerleşik hayata yönelttiğidir."
      },
      {
        id: 302,
        questionStem: "Göbeklitepe'nin keşfinden önceki 'klasik tarih tezi' insanlık gelişimini hangi sırayla açıklıyordu?",
        questionType: "Yardımcı Fikir",
        options: [
          "İnanç / Tapınak -> Tarım -> Yerleşik Yaşam",
          "Tarım -> Yerleşik Yaşam -> Tapınak / Şehir",
          "Sanayileşme -> Ticaret -> Tarım",
          "Yazı -> Şehir Devletleri -> Tarım"
        ],
        correctAnswer: 1,
        explanation: "Metinde açıkça: 'Klasik tarih tezi; insanların önce tarımı keşfedip yerleşik köyler kurduğunu... nihayetinde tapınakları inşa ettiğini savunuyordu' denmektedir."
      }
    ]
  },
  {
    id: 4,
    title: "Sümerlerin En Kalıcı Mirası: Kil Tabletler ve Yazı",
    category: "Tarih",
    kur: "Kur 2: Orta",
    paragraphText: "MÖ 3200 civarında Mezopotamya'da Sümerlerin geliştirdiği çivi yazısı, başlangıçta şiirler ya da kahramanlık destanları yazmak için icat edilmemişti. Tapınak ambarlarına teslim edilen buğday çuvallarının, koyun sayılarının ve vergi borçlarının kaydını tutma ihtiyacı, yazının doğmasındaki asıl gerekçeydi. Kamış uçlarıyla yaş kil tabletler üzerine basılan semboller zamanla somut nesneleri aşarak soyut kavramları ve sesleri temsil etmeye başladı. Pişirilerek taşlaşan kil tabletler; yangınlardan ve doğal afetlerden etkilenmeyerek günümüze kadar ulaştı ve Sümerlerin gündelik yaşamından kanunlarına kadar paha biçilmez bir tarihsel hafıza bıraktı.",
    questions: [
      {
        id: 401,
        questionStem: "Metne göre Sümerlerin yazıyı icat etmelerindeki **asıl ve ilk gerekçe** nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Komşu kavimlerle diplomatik mektuplar paylaşmak",
          "Ekonomik ve ticari kayıtları, vergi ve ambar stoklarını hatasız tutmak",
          "Gılgamış gibi mitolojik destanları gelecek kuşaklara aktarmak",
          "Hükümdarların zaferlerini anıt heykellere kazımak"
        ],
        correctAnswer: 1,
        explanation: "Metinde 'ambarlara teslim edilen buğday, koyun ve vergi borçlarının kaydını tutma ihtiyacı yazının doğmasındaki asıl gerekçeydi' denmektedir."
      },
      {
        id: 402,
        questionStem: "Sümer tabletlerinin binlerce yıl sonrasına kadar bozulmadan kalabilmesi neye bağlanmıştır?",
        questionType: "Çıkarım",
        options: [
          "Yalnızca altın kaplama kutularda saklanmalarına",
          "Kil malzemenin pişirilip taşlaşarak yangın ve afetlere dirençli hale gelmesine",
          "Çok gizli mağaralara gömülmüş olmalarına",
          "Mısır piramitlerindeki mezarlara yerleştirilmelerine"
        ],
        correctAnswer: 1,
        explanation: "Metinde pişirilerek taşlaşan kil tabletlerin yangınlardan ve afetlerden etkilenmeden günümüze ulaştığı ifade edilmiştir."
      }
    ]
  },

  // TEKNOLOJİ
  {
    id: 5,
    title: "Akıllı Algoritmalar ve Yankı Odaları",
    category: "Teknoloji",
    kur: "Kur 1: Temel",
    paragraphText: "Sosyal medya platformları, kullanıcıları ekranda olabildiğince uzun süre tutmak üzere tasarlanmış öneri algoritmalarıyla çalışır. Bu algoritmalar; beğendiğiniz paylaşımları, tıkladığınız haberleri ve durakladığınız videoları analiz ederek önünüze sürekli sizin dünya görüşünüzü doğrulayan içerikler düşürür. İlk bakışta kişiselleştirilmiş hoş bir konfor gibi görünen bu mekanizma, aslında 'yankı odası' (echo chamber) tehlikesini doğurur. Karşıt veya farklı görüşlerle hiç karşılaşmayan birey, kendi fikirlerinin tüm dünya tarafından benimsendiği yanılgısına kapılır. Bu durum toplumsal kutuplaşmayı derinleştirir ve yapıcı eleştiri kültürünü zedeler.",
    questions: [
      {
        id: 501,
        questionStem: "Bu metinde geçen 'yankı odası' kavramıyla anlatılmak istenen durum nedir?",
        questionType: "Ana Fikir",
        options: [
          "Müzik stüdyolarında ses yalıtımının kusursuz yapılması",
          "Kişinin sosyal medyada sadece kendi fikirlerini destekleyen içeriklerle karşılaşarak tek taraflı düşünceye hapsolması",
          "Kullanıcıların internet şifrelerini sık sık değiştirmek zorunda kalması",
          "Görüntülü konuşmalarda sesin gecikmeli olarak geri dönmesi"
        ],
        correctAnswer: 1,
        explanation: "Yankı odası, algoritmaların sürekli kullanıcının benimsediği görüşleri önüne çıkarıp zıt fikirleri gizleyerek bireyi tek taraflı bir düşünce çemberine hapsetmesidir."
      },
      {
        id: 502,
        questionStem: "Yazara göre algoritmik yankı odalarının ortaya çıkardığı **en olumsuz toplumsal sonuç** nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Cep telefonu bataryalarının daha çabuk tükenmesi",
          "Toplumsal kutuplaşmanın derinleşmesi ve yapıcı eleştiri kültürünün yok olması",
          "Yabancı dil öğreniminin yavaşlaması",
          "İnternet bağlantı hızlarının bölgesel olarak düşmesi"
        ],
        correctAnswer: 1,
        explanation: "Metnin son cümlesinde 'Bu durum toplumsal kutuplaşmayı derinleştirir ve yapıcı eleştiri kültürünü zedeler' ifadesi yer almaktadır."
      }
    ]
  },
  {
    id: 6,
    title: "Otonom Araçlar ve Karar Verme İkilemleri",
    category: "Teknoloji",
    kur: "Kur 2: Orta",
    paragraphText: "Sürücüsüz (otonom) otomobiller; kameraları, radar ve Lidar sensörleriyle insan sürücülere oranla çok daha hızlı tepki vererek dikkatsizlik ve yorgunluk kaynaklı kazaları büyük ölçüde önleme potansiyeline sahiptir. Ancak bu araçların yazılımları, kaçınılmaz kaza anlarında hangi kararı vermesi gerektiği sorusuyla yüzleştiğinde felsefi bir çıkmaza girer. Örneğin frenleri patlayan bir otonom araç; kaldırımdaki beş yayayı kurtarmak için direksiyonu duvara kırıp içindeki tek yolcunun hayatını mı feda etmelidir, yoksa yolcusunu her ne pahasına olursa olsun korumalı mıdır? Bu 'tramvay ikilemi', otonom teknolojilerin sadece bir yazılım meselesi olmadığını; derin bir etik, ahlak ve hukuk felsefesi boyutu taşıdığını kanıtlar.",
    questions: [
      {
        id: 601,
        questionStem: "Bu metnin ana düşüncesi aşağıdakilerden hangisidir?",
        questionType: "Ana Fikir",
        options: [
          "Otonom araçlar hiçbir zaman trafikte güvenli biçimde kullanılamayacaktır.",
          "Otonom teknolojiler sadece teknik ve mühendislik başarısıyla sınırlı olmayıp çözülmesi gereken etik ve hukuki ikilemler barındırır.",
          "İnsan sürücüler otonom araçlardan her durumda daha mantıklı kararlar verir.",
          "Lidar sensörleri yağmurlu havalarda tamamen işlevsiz kalmaktadır."
        ],
        correctAnswer: 1,
        explanation: "Yazar metinde sürücüsüz araçların kaza anındaki tercihleri üzerinden teknolojinin sadece yazılım değil, derin etik ve felsefi boyutlar taşıdığını vurgulamaktadır."
      },
      {
        id: 602,
        questionStem: "Parçada sözü edilen 'tramvay ikilemi' örneği neyi somutlaştırmak için kullanılmıştır?",
        questionType: "Çıkarım",
        options: [
          "Toplu taşıma biletlerinin pahalılığını",
          "Algoritmaların kaçınılmaz kaza anlarında vereceği ahlaki kararların karmaşıklığını",
          "Otomobil motorlarının yakıt tasarrufu oranını",
          "Şehir içi yolların genişletilmesi gerekliliğini"
        ],
        correctAnswer: 1,
        explanation: "Tramvay ikilemi, yazılımın yayayı mı yoksa yolcuyu mu feda edeceği gibi ahlaki ve etik zor kararları göstermek için bir örnek olarak sunulmuştur."
      }
    ]
  },

  // SANAT
  {
    id: 7,
    title: "Geleneksel Ebru Sanatı ve Suyun Sabrı",
    category: "Sanat",
    kur: "Kur 1: Temel",
    paragraphText: "Geleneksel Türk-İslam sanatlarının en zariflerinden biri olan ebru, kitre adı verilen bitkisel bir zamkla yoğunlaştırılmış suyun yüzeyinde icra edilir. Ebru ustası, toprak boyaları sığır ödüyle karıştırarak suyun üzerinde batmadan yüzmelerini ve birbirine karışmadan açılmalarını sağlar. At kılından ve gül dalından yapılan fırçalarla suyun üzerine serpiştirilen renkler, 'biz' adı verilen metal iğnelerle taranarak benzersiz desenlere dönüştürülür. Son aşamada suyun üzerine örtülen özel kağıt, deseni emer ve sudan çekilir. Ebru sanatında yapılan bir hatayı geri almak ya da aynı eserin tıpatıp aynısını ikinci kez üretmek imkansızdır; her tekne açılışı ve her kağıt çekilişi 'anın tekrar edilemezliğine' bir övgüdür.",
    questions: [
      {
        id: 701,
        questionStem: "Bu parçadan ebru sanatı ile ilgili olarak aşağıdakilerden hangisi **çıkarılamaz**?",
        questionType: "Çıkarım",
        options: [
          "Su yoğunluğunu artırmak için kitre adı verilen bitkisel zamk kullanılır.",
          "Boyaların suyun üstünde kalabilmesi için sığır ödünden yararlanılır.",
          "Yapılan desenler dijital makinelerle kolayca kopyalanıp seri üretilebilir.",
          "Aynı ebru deseninin bir daha birebir aynısını üretmek imkansızdır."
        ],
        correctAnswer: 2,
        explanation: "Metinde ebru sanatında aynı eserin tıpatıp aynısını üretmenin imkansız olduğu ve her çalışmanın benzersiz olduğu söylenmektedir; dijital kopyalama veya seri üretimden bahsedilmez."
      },
      {
        id: 702,
        questionStem: "Bu metinde ebru sanatının hangi yönü özellikle vurgulanmıştır?",
        questionType: "Ana Fikir",
        options: [
          "Yalnızca saray mensupları tarafından yapılabilmesi",
          "Doğal malzemelerle yapılan ve her anın tekrar edilemez özgünlüğünü taşıyan bir sanat olması",
          "En pahalı boyalar kullanıldığı için az icra edilmesi",
          "Avrupa'da ortaya çıkıp Osmanlı'ya geç gelmiş olması"
        ],
        correctAnswer: 1,
        explanation: "Metin doğal malzemeleri (kitre, öd, gül dalı) ve her çekilişin 'anın tekrar edilemezliği' taşıyan özgünlüğünü vurgulamaktadır."
      }
    ]
  },
  {
    id: 8,
    title: "Gölge Oyunu ve Karagöz ile Hacivat'ın Dili",
    category: "Sanat",
    kur: "Kur 2: Orta",
    paragraphText: "Karagöz ve Hacivat gölge oyunu, deriden kesilmiş ve kök boyalarla renklendirilmiş tasvirlerin (suretlerin) arkadan aydınlatılmış beyaz bir perdeye (ayna) yansıtılmasıyla canlandırılır. Oyunu tek başına oynatan 'Hayali' (hayalbaz); tüm karakterlerin ses tonlarını, lehçelerini ve şarkılarını perde arkasında tek başına icra eden usta bir meddahtır. Hacivat; kurallara bağlı, eğitimli, ağdalı Osmanlı Türkçesiyle konuşan ve çıkarlarını gözeten yarı aydın tipini simgelerken; Karagöz, halkın sağduyusunu, saf mizahını ve söz oyunlarını temsil eder. Hacivat'ın süslü sözlerini Karagöz'ün yanlış anlayıp komik cevaplar vermesi, toplumun farklı tabakaları arasındaki iletişim engellerini gülmece yoluyla eleştiren incelikli bir ayna görevi görür.",
    questions: [
      {
        id: 801,
        questionStem: "Bu parçaya göre Karagöz ve Hacivat oyunundaki temel mizah unsuru nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Perdenin arkasındaki ışığın renginin sürekli değişmesi",
          "Hacivat'ın süslü ve ağdalı konuşmalarının Karagöz tarafından yanlış anlaşılıp çarpıtılması",
          "Oyuncuların sahnede birbirlerine fiziki şakalar yapması",
          "Hayali'nin oyun esnasında seyircileri sahneye davet etmesi"
        ],
        correctAnswer: 1,
        explanation: "Metinde 'Hacivat'ın süslü sözlerini Karagöz'ün yanlış anlayıp komik cevaplar vermesi' temel mizah kaynağı olarak belirtilmiştir."
      },
      {
        id: 802,
        questionStem: "Bu metnin anlatımında hangi anlatım tekniği ağır basmaktadır?",
        questionType: "Anlatım Biçimi",
        options: [
          "Karşılaştırma ve Açıklama",
          "Kişisel duyguların abartılı övgüsü",
          "Mitolojik masalların rivayet edilmesi",
          "Geleceğe dair varsayımlar öne sürme"
        ],
        correctAnswer: 0,
        explanation: "Yazar Karagöz ve Hacivat karakterlerini karşılaştırarak (eğitimli yarı aydın vs sağduyulu halk) bilgi verici açıklama yapmıştır."
      }
    ]
  },

  // COĞRAFYA
  {
    id: 9,
    title: "Akdeniz İklimi ve Makilerin İnatçı Anatomisi",
    category: "Coğrafya",
    kur: "Kur 1: Temel",
    paragraphText: "Akdeniz iklim bölgesinde yaz ayları aşırı sıcak ve kurak, kış ayları ise ılık ve yağışlı geçer. Yaz kuraklığının aylarca sürmesi, bitki örtüsünün hayatta kalabilmesi için sıra dışı morfolojik adaptasyonlar geliştirmesini zorunlu kılmıştır. Bu bölgenin karakteristik bitki topluluğu olan makiler (zeytin, zakkum, mersin, defne); bodur boylu, her mevsim yeşil kalan çalı türleridir. Yapraklarının üzeri balmumu benzeri parlak ve kalın bir kütikula tabakasıyla kaplıdır. Bu tabaka güneş ışınlarını yansıtarak aşırı ısınmayı önler ve terlemeyle su kaybını en aza indirir. Ayrıca kökleri su bulabilmek için toprağın metrelerce derinliklerine kadar uzanır; böylece aylar süren kavurucu yaz mevsimini tek damla yağmur almadan atlatabilirler.",
    questions: [
      {
        id: 901,
        questionStem: "Maki bitkilerinin yapraklarının parlak ve balmumsu bir tabakayla kaplı olmasının **asıl yararı** nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Kışın don olaylarından tamamen korunmak",
          "Güneş ışığını yansıtıp terlemeyle gerçekleşen su kaybını en aza indirmek",
          "Otobur hayvanların bitkiyi yemesini engellemek",
          "Bitkinin boyunun ağaçlar kadar uzamasını sağlamak"
        ],
        correctAnswer: 1,
        explanation: "Metinde bu tabakanın güneş ışığını yansıtarak aşırı ısınmayı önlediği ve terlemeyle su kaybını asgariye indirdiği açıkça ifade edilmiştir."
      },
      {
        id: 902,
        questionStem: "Bu metne en uygun başlık aşağıdakilerden hangisidir?",
        questionType: "Konu / Başlık",
        options: [
          "Kutup Bölgelerindeki Tundra Bitkileri",
          "Maki Bitki Örtüsü ve Kuraklığa Uyum Mekanizmaları",
          "Akdeniz'de Balıkçılığın Gelişimi",
          "Orman Yangınlarının Söndürülme Yolları"
        ],
        correctAnswer: 1,
        explanation: "Parça Akdeniz iklimindeki makilerin yaz kuraklığına karşı geliştirdiği yaprak ve kök adaptasyonlarını ele almaktadır."
      }
    ]
  },
  {
    id: 10,
    title: "Mercan Resifleri: Denizlerin Yağmur Ormanları",
    category: "Coğrafya",
    kur: "Kur 2: Orta",
    paragraphText: "Mercan resifleri, okyanus tabanlarının yalnızca binde birinden daha az bir alanını kaplamasına rağmen bilinen tüm deniz canlısı türlerinin yaklaşık dörtte birine ev sahipliği yapar. Bu inanılmaz biyoçeşitlilik nedeniyle mercanlar 'denizlerin yağmur ormanları' olarak adlandırılır. Mercan polipleri, dokularında yaşayan mikroskobik alglerle (zooxanthellae) kusursuz bir simbiyotik (ortak yaşam) ilişki kurar. Algler fotosentezle mercana besin ve göz alıcı renklerini sağlarken, mercan da alge güvenli bir kalsiyum karbonat yuva sunar. Ancak küresel ısınma sonucu deniz suyu sıcaklığının kritik 1-2 derece yükselmesi bu ortaklığı bozar. Stres altındaki mercan algleri dışarı atar, bu da mercanın bembeyaz kesilerek ölmesine (mercan ağarması) ve koskoca denizel ekosistemlerin çökmesine yol açar.",
    questions: [
      {
        id: 1001,
        questionStem: "Mercan resiflerinin 'denizlerin yağmur ormanları' olarak adlandırılmasının **nedeni** nedir?",
        questionType: "Çıkarım",
        options: [
          "Aşırı yağış alan tropikal bölgelerde bulunmaları",
          "Okyanuslarda çok küçük alan kaplamalarına rağmen denizel biyoçeşitliliğin dörtte birini barındırmaları",
          "Ağaçlar gibi odunsu gövdelere sahip olmaları",
          "Sadece tatlı su göllerinde yetişmeleri"
        ],
        correctAnswer: 1,
        explanation: "Metinde 'okyanus tabanının binde birinden azını kaplamasına rağmen tüm deniz canlılarının dörtte birine ev sahipliği yapması nedeniyle' bu unvanın verildiği belirtilmiştir."
      },
      {
        id: 1002,
        questionStem: "Deniz suyunun ısınması mercanlarda hangi doğrudan sonuca yol açar?",
        questionType: "Yardımcı Fikir",
        options: [
          "Mercanların daha hızlı büyümesine",
          "Alglerin dışarı atılmasıyla mercanların ağarıp ölmesine",
          "Mercanların balık avlamayı öğrenmesine",
          "Kalsiyum karbonat tabakasının altına dönüşmesine"
        ],
        correctAnswer: 1,
        explanation: "Sıcaklık artışı simbiyotik ilişkiyi bozarak alglerin atılmasına, mercanın ağarmasına ve ölümüne neden olur."
      }
    ]
  },

  // EDEBİYAT
  {
    id: 11,
    title: "Şiirde İmge ve Sözcüklerin Yeni Anlamı",
    category: "Edebiyat",
    kur: "Kur 1: Temel",
    paragraphText: "Şiir, düz yazıdan farklı olarak sözcükleri sadece sözlük anlamlarıyla (ilk anlam) yan yana getiren bir metin değildir. Şair; herkesin her gün kullandığı sıradan kelimeleri alır, onları alışılmamış bağdaştırmalar ve imgelerle yoğurarak daha önce duyulmamış yepyeni bir duygu atmosferi yaratır. Örneğin 'hüzün' kelimesi tek başına soyut bir kavramken, şairin dizelerinde 'akşamın omuzlarına dökülen sarı bir yaprak' haline gelebilir. İmge; zihinde bir tablo gibi parıldayan, okurun hayal gücünü harekete geçiren ve dille resim yapma sanatıdır. İyi bir şiir okuru, sözcüklerin sözlükteki manasını aşarak şairin kurduğu bu gizli çağrışım köprülerini keşfedebilen kişidir.",
    questions: [
      {
        id: 1101,
        questionStem: "Bu parçaya göre şiir dilini düz yazıdan ayıran **en temel fark** nedir?",
        questionType: "Ana Fikir",
        options: [
          "Şiirlerin mutlaka kafiyeli ve hece ölçülü yazılması gerektiği",
          "Sözcüklerin salt ilk anlamlarıyla değil, şairin hayal gücüyle yüklediği yeni çağrışım ve imgelerle kullanılması",
          "Düz yazının sadece bilimsel konularda yazılabilmesi",
          "Şiirin sadece yabancı sözcüklerle yazılabilmesi"
        ],
        correctAnswer: 1,
        explanation: "Metinde şiirin sözcükleri ilk anlamlarıyla kullanmayıp alışılmamış bağdaştırmalar ve zengin imgelerle yeni anlamlar ürettiği vurgulanmaktadır."
      },
      {
        id: 1102,
        questionStem: "Yazar bu parçada 'imge' kavramını neye benzetmiştir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Kelimelerle matematik hesabı yapmaya",
          "Dille resim yapma sanatına ve zihinde parıldayan bir tabloya",
          "Tarihsel olayların kronolojik kaydına",
          "Müzik aletlerinin akort edilmesine"
        ],
        correctAnswer: 1,
        explanation: "Metinde imge için 'zihinde bir tablo gibi parıldayan... dille resim yapma sanatıdır' benzetmesi kullanılmıştır."
      }
    ]
  },
  {
    id: 12,
    title: "Fabllar ve Hayvanların Aynasında İnsan Zaafı",
    category: "Edebiyat",
    kur: "Kur 2: Orta",
    paragraphText: "Ezop ve La Fontaine gibi yazarların çağlar öncesinden günümüze ulaşan fabl türü; tilkileri, kargaları, aslanları ve kaplumbağaları konuşturarak aslında insanın zaaflarını sahneye koyar. Hayvanlar alemi sadece alegorik (sembolik) bir maskedir. Kurnaz tilki dalkavukluğu, kibirli karga övgüye aldanan saflığı, ağırbaşlı kaplumbağa azim ve sabrı temsil eder. Bir insanın kibirli veya bencil olduğunu yüzüne doğrudan söylemek savunma mekanizmalarını tetiklerken; bir kurdun kuzuya haksızlık yaptığını anlatan bir fabl, insanı hiç incitmeden kendi bencil vicdanıyla yüzleştirir. Fabl, teşhis (kişileştirme) ve intak (konuşturma) sanatlarını kullanarak ahlaki dersleri sert nutuklar yerine masalsı bir ironiyle sunar.",
    questions: [
      {
        id: 1201,
        questionStem: "Bu metne göre fablların insan terbiyesinde doğrudan nasihat vermekten daha etkili olmasının **sebebi** nedir?",
        questionType: "Çıkarım",
        options: [
          "Çok kısa yazıldıkları için çabuk ezberlenmeleri",
          "İnsanın yüzüne kusurunu vurmak yerine hayvan sembolleriyle dolaylı ve incitmeden vicdan muhasebesi yaptırması",
          "İçlerinde hiçbir olumsuz karakter barındırmaması",
          "Yalnızca çocuk kitaplarında yer alması"
        ],
        correctAnswer: 1,
        explanation: "Metinde doğrudan eleştirinin savunma mekanizmalarını tetiklediği, oysa fablın insanı incitmeden kendi vicdanıyla yüzleştirdiği belirtilmiştir."
      },
      {
        id: 1202,
        questionStem: "Parçada fabllarda yoğun olarak kullanılan hangi iki edebi sanattan söz edilmiştir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Mübalağa ve Tecahülüarif",
          "Teşhis (kişileştirme) ve İntak (konuşturma)",
          "Tezat ve Telmih",
          "Kinaye ve Tariz"
        ],
        correctAnswer: 1,
        explanation: "Metnin son cümlesinde açıkça 'teşhis (kişileştirme) ve intak (konuşturma) sanatlarını kullanarak' ifadesi geçmektedir."
      }
    ]
  }
];
