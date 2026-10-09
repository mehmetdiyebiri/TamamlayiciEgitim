import { ParagrafItem } from '../paragrafData';

export const BILIM_PARAGRAFLARI: ParagrafItem[] = [
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
        questionStem: "Bu parçadan aşağıdakilerden hangisi çıkarılamaz?",
        questionType: "Çıkarım",
        options: [
          "Derin uykuda beyin hücreleri arasındaki boşluklarda belirgin bir genişleme gerçekleşir.",
          "Temizlenemeyen toksik atıklar bilişsel fonksiyonlarda ve odaklanmada gerilemeye yol açabilir.",
          "Günün her saatinde uyunması insan zekasını doğrudan iki katına çıkarır.",
          "Amiloid-beta plaklarının birikimi Alzheimer riskiyle ilişkilendirilmektedir."
        ],
        correctAnswer: 2,
        explanation: "Metinde uykunun zekayı iki katına çıkardığına dair hiçbir ifade yer almamaktadır; bu asılsız bir yargıdır."
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
        questionStem: "Bu parçaya göre canlıların kendi ışığını üretmesinin amaçları arasında aşağıdakilerden hangisi yer almaz?",
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
  {
    id: 3,
    title: "Tardigradlar: Evrenin En Dayanıklı Mikroskobik Canlıları",
    category: "Bilim",
    kur: "Kur 2: Orta",
    paragraphText: "Su ayıları olarak da bilinen tardigradlar, mikroskop altında görülebilen sevimli ve tombul yapılarına rağmen gezegenimizin bilinen en dayanıklı canlılarıdır. Aşırı sıcaklık, dondurucu soğuk (-272 °C), ölümcül dozda radyasyon ve hatta uzay boşluğunun oksijensiz ortamında dahi hayatta kalabilirler. Bu sıra dışı direncin sırrı 'kriptobiyoz' adı verilen bir askıya alınmış yaşam evresinde saklıdır. Çevre koşulları yaşanamaz hale geldiğinde tardigrad, vücudundaki suyun yüzde 99'unu dışarı atar, büzüşerek minik bir küreye dönüşür ve metabolizmasını neredeyse sıfıra indirir. Koşullar normale döndüğünde tek bir su damlasıyla birkaç saat içinde yeniden uyanıp yaşamına kaldığı yerden devam eder.",
    questions: [
      {
        id: 301,
        questionStem: "Tardigradların zorlu çevre koşullarında hayatta kalmasını sağlayan temel biyolojik mekanizma nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Vücutlarındaki suyun tamamına yakınını tahliye edip metabolizmayı durdurarak kriptobiyoza girmeleri",
          "Kan dolaşımlarını hızlandırarak vücut sıcaklıklarını sabit tutmaları",
          "Güneş ışığından aldıkları enerjiyle kabuklarını kalınlaştırmaları",
          "Kendi besinlerini kemosentezle üreterek hücrelerini yenilemeleri"
        ],
        correctAnswer: 0,
        explanation: "Parçada tardigradların suyunu atarak büzüştüğü ve metabolizmasını sıfıra indirdiği 'kriptobiyoz' mekanizması açıkça anlatılmıştır."
      },
      {
        id: 302,
        questionStem: "Bu metinden hareketle aşağıdaki yargılardan hangisine ulaşılabilir?",
        questionType: "Çıkarım",
        options: [
          "Bütün mikroskobik canlılar uzay boşluğunda süresiz yaşayabilir.",
          "Yaşamın devamlılığı için aktif metabolik faaliyetlerin her saniye sürmesi zorunlu değildir; canlılık geçici olarak durdurulabilir.",
          "Su ayıları sadece kutup bölgelerinde koloniler halinde yaşarlar.",
          "Kriptobiyoz evresindeki canlılar yalnızca sıcak ortamda uyanabilirler."
        ],
        correctAnswer: 1,
        explanation: "Tardigradların metabolizmalarını neredeyse sıfıra indirip yıllarca askıda kaldıktan sonra bir su damlasıyla uyanabilmesi, canlılığın duraklatılabileceğini kanıtlar."
      }
    ]
  },
  {
    id: 4,
    title: "Bitkilerin Yeraltı İletişim Ağı: Mikoriza Mantarları",
    category: "Bilim",
    kur: "Kur 3: İleri",
    paragraphText: "Ormandaki ağaçlar sanıldığı gibi sadece birbirleriyle rekabet eden izole varlıklar değildir. Toprağın altında mikoriza adı verilen mantar iplikçiklerinin ördüğü devasa bir yeraltı internet ağı uzanır. Bilim insanlarının 'Wood Wide Web' adını verdiği bu biyolojik ağ sayesinde yaşlı ağaçlar, gölgede kaldığı için yeterince güneş alamayan genç fidanlara karbon ve şeker aktarımı yapar. Dahası, bir ağaç zararlı böceklerin saldırısına uğradığında bu mantar köprüleri üzerinden komşu ağaçlara kimyasal alarm sinyalleri gönderir. Uyarıyı alan diğer ağaçlar, zararlılar henüz kendilerine ulaşmadan yapraklarında böcekleri uzaklaştıracak acı tanenler üretmeye başlar.",
    questions: [
      {
        id: 401,
        questionStem: "Bu parçanın ana düşüncesi aşağıdakilerden hangisidir?",
        questionType: "Ana Fikir",
        options: [
          "Mantar türlerinin tümü ağaç köklerine zarar veren parazitlerdir.",
          "Orman ekosisteminde ağaçlar, yeraltı mantar ağları aracılığıyla dayanışma ve haberleşme içinde yaşayan topluluklardır.",
          "Böcek istilalarını engellemenin tek yolu kimyasal ilaçlama yapmaktır.",
          "Yaşlı ağaçlar genç fidanların gelişimini engellemek için onların suyunu emer."
        ],
        correctAnswer: 1,
        explanation: "Metin ağaçların mantar köprüleri sayesinde genç fidanları beslediğini ve tehlike sinyalleriyle birbirini koruduğunu, yani bir dayanışma topluluğu olduğunu anlatmaktadır."
      },
      {
        id: 402,
        questionStem: "Metinde geçen 'Wood Wide Web' benzetmesiyle ne anlatılmak istenmiştir?",
        questionType: "Çıkarım",
        options: [
          "Ağaçların odun üretim kapasitesini artıran fabrikaları",
          "Mantar iplikçiklerinin ağaçlar arasında bilgi ve besin aktarımını sağlayan köklü bir iletişim ağı oluşturmasını",
          "Ormanlardaki yangın erken uyarı uydularını",
          "Ağaç yapraklarının güneş panelleri gibi çalışmasını"
        ],
        correctAnswer: 1,
        explanation: "Dünya çapındaki internet ağı (World Wide Web) kavramına atıfla, mantar iplikçiklerinin ormandaki ağaçlar arasında iletişim ve kaynak paylaşımını sağlaması kastedilmiştir."
      }
    ]
  },
  {
    id: 5,
    title: "James Webb Uzay Teleskobu ve Kızılötesi Evren",
    category: "Bilim",
    kur: "Kur 2: Orta",
    paragraphText: "Hubble Uzay Teleskobu onlarca yıl boyunca bize evrenin büyüleyici optik fotoğraflarını sundu. Ancak evren sürekli genişlediği için milyarlarca yıl önce oluşmuş ilk galaksilerden yola çıkan ışık dalgaları esner, kızıla kayar ve insan gözünün göremeyeceği kızılötesi ışığa dönüşür. 2021 yılında uzaya fırlatılan James Webb Uzay Teleskobu, devasa altın kaplama aynaları ve hassas kızılötesi dedektörleriyle işte bu görünmez evreni tarar. Kızılötesi dalga boyları, uzaydaki yoğun kozmik toz bulutlarının içinden neredeyse hiç engellenmeden geçer. Böylece Webb, yıldızların doğumhaneleri olan gaz ve toz bulutlarının içini bir röntgen gibi aydınlatarak Büyük Patlama'dan hemen sonra doğan ilk galaksileri gözlerimizin önüne serer.",
    questions: [
      {
        id: 501,
        questionStem: "James Webb Teleskobu'nun ilk galaksileri gözlemleyebilmesinde kızılötesi ışığın hangi özelliği kritik rol oynamıştır?",
        questionType: "Yardımcı Fikir",
        options: [
          "Güneş sistemindeki gezegenleri eriterek yaklaştırması",
          "Kozmik toz bulutlarının içinden engellenmeden geçebilmesi ve kızıla kayan dalgaları yakalaması",
          "Hubble teleskobundan daha kısa dalga boyuna sahip olması",
          "Yalnızca gündüz vakti uzayda yayılabilmesi"
        ],
        correctAnswer: 1,
        explanation: "Metinde kızılötesi dalga boylarının yoğun toz bulutlarının içinden engellenmeden geçtiği ve kızıla kayan ışıkları yakaladığı vurgulanmıştır."
      },
      {
        id: 502,
        questionStem: "Bu metinde aşağıdaki sorulardan hangisinin cevabı yoktur?",
        questionType: "Yardımcı Fikir",
        options: [
          "Hubble teleskobu evreni hangi tür ışıkla fotoğraflamıştır?",
          "James Webb Teleskobu ne zaman uzaya fırlatılmıştır?",
          "James Webb Teleskobu'nun üretiminde hangi ülkelerin şirketleri çalışmıştır?",
          "İlk galaksilerden gelen ışık dalgaları neden kızıla kayar?"
        ],
        correctAnswer: 2,
        explanation: "Metinde teleskobun üretiminde çalışan ülkeler veya şirketler hakkında hiçbir bilgi verilmemiştir."
      }
    ]
  },
  {
    id: 6,
    title: "Kemosentez: Güneşsiz Derinliklerde Yeşeren Yaşam",
    category: "Bilim",
    kur: "Kur 3: İleri",
    paragraphText: "Yeryüzündeki neredeyse tüm besin zincirlerinin temeli fotosenteze, yani güneş enerjisine dayanır. Ancak 1977 yılında Pasifik Okyanusu'nun binlerce metre derinliğindeki hidrotermal bacaların çevresi incelendiğinde bilim dünyasını sarsan bir manzarayla karşılaşıldı. Hiçbir güneş ışığının ulaşmadığı, basıncın kemikleri ezecek güçte olduğu bu karanlık tabanda dev tüp solucanları, kör karidesler ve yengeçler kaynıyordu. Bu canlıların var olmasını sağlayan temel üreticiler, bacalardan fışkıran zehirli hidrojen sülfür gazını kimyasal olarak oksitleyerek besin üreten 'kemosentetik' bakterilerdi. Bu keşif, canlılığın var olabilmesi için güneş ışığının mutlak bir şart olmadığını ve Jüpiter'in buzlu uydusu Europa gibi Güneş'ten uzak gök cisimlerinde de yaşam olabileceğini kanıtladı.",
    questions: [
      {
        id: 601,
        questionStem: "Bu parçada hidrotermal bacaların çevresindeki yaşamla ilgili olarak aşağıdakilerden hangisi vurgulanmıştır?",
        questionType: "Ana Fikir",
        options: [
          "Derin deniz canlılarının tümünün görme yeteneğini kaybettiği",
          "Güneş ışığı olmadan da kimyasal tepkimelere (kemosentez) dayalı zengin ekosistemlerin var olabileceği",
          "Pasifik Okyanusu'nun en sıcak su kütlesine sahip olduğu",
          "Tüp solucanlarının yalnızca karada yaşayan canlıları avladığı"
        ],
        correctAnswer: 1,
        explanation: "Metin, fotosentez ve güneş ışığı olmadan da kemosentezle besin üreten bakteriler sayesinde canlılığın sürdürülebileceğini ana fikir olarak sunmaktadır."
      },
      {
        id: 602,
        questionStem: "Kemosentezin keşfi astrobiyoloji (uzay biyolojisi) alanında hangi yeni bakış açısını doğurmuştur?",
        questionType: "Çıkarım",
        options: [
          "Güneş'e yakın gezegenlerde hayat arama çalışmalarının durdurulmasını",
          "Güneş ışığından yoksun buzlu uyduların okyanus tabanlarında da yaşam bulunabileceği ihtimalini",
          "Mars'ta fotosentez yapan ağaçların yetiştirilebileceği inancını",
          "Dünya dışındaki canlıların mutlaka tüp solucanı biçiminde olacağını"
        ],
        correctAnswer: 1,
        explanation: "Metnin son cümlesinde, bu keşfin Güneş'ten uzak ve buzlu gök cisimlerinde (örneğin Europa'da) yaşam olabileceği fikrini güçlendirdiği belirtilmiştir."
      }
    ]
  },
  {
    id: 7,
    title: "İnsan Mikrobiyotası: İkinci Beynimiz Olan Bağırsaklar",
    category: "Bilim",
    kur: "Kur 1: Temel",
    paragraphText: "İnsan vücudu trilyonlarca hücreden oluşur; fakat ilginç olan, vücudumuzda kendi hücrelerimizden daha fazla sayıda mikroskobik bakteri, mantar ve virüs barındırmamızdır. 'Mikrobiyota' adı verilen bu devasa ekosistemin büyük bölümü bağırsaklarımızda yer alır. Bağırsaklarımız, 'vagus' siniri aracılığıyla doğrudan beynimizle çift yönlü bir iletişim hattı kurar. Hatta mutluluk hormonu olarak bilinen serotoninin yaklaşık yüzde 90'ı beyinde değil, bağırsak mikrobiyotası tarafından sentezlenir. Sağlıksız ve dengesiz beslenen kişilerde mikrobiyota çeşitliliği azalır; bu da yalnızca sindirim bozukluklarına değil, anksiyete, depresyon ve odaklanma problemlerine de yol açabilir.",
    questions: [
      {
        id: 701,
        questionStem: "Bu parçaya göre bağırsak sağlığı ile ruh hali arasındaki bağlantıyı sağlayan en önemli biyokimyasal unsur nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Serotonin hormonunun büyük bölümünün bağırsak mikrobiyotası tarafından üretilmesi",
          "Mide asidinin beyindeki sinir hücrelerini eritmesi",
          "Bağırsakların vücuttaki tek kas dokusu olması",
          "Bakterilerin kan basıncını tamamen sıfırlaması"
        ],
        correctAnswer: 0,
        explanation: "Metinde 'serotoninin yaklaşık yüzde 90'ı beyinde değil, bağırsak mikrobiyotası tarafından sentezlenir' ifadesi yer almaktadır."
      },
      {
        id: 702,
        questionStem: "Bu metinden hareketle aşağıdaki tavsiyelerden hangisi metnin içeriğiyle en çok örtüşür?",
        questionType: "Çıkarım",
        options: [
          "Zihinsel sağlığı korumak için bağırsak mikrobiyotasını destekleyen dengeli ve lifli beslenmeye özen gösterilmelidir.",
          "Hafızayı güçlendirmek için vücuttaki tüm bakteriler antibiyotiklerle yok edilmelidir.",
          "Sindirim problemleri yaşayanların uyku sürelerini yarıya indirmesi gerekir.",
          "Mutluluk hormonunu artırmak için şekerli içecekler sınırsız tüketilmelidir."
        ],
        correctAnswer: 0,
        explanation: "Mikrobiyotanın zihinsel odaklanma ve mutlulukla doğrudan ilişkili olması, dengeli beslenmenin zihinsel iyilik halini desteklediğini gösterir."
      }
    ]
  },
  {
    id: 8,
    title: "Göçmen Kuşların Pusulası: Kuantum Pusulası ve Kriptokrom",
    category: "Bilim",
    kur: "Kur 3: İleri",
    paragraphText: "Kızılgerdan gibi minik göçmen kuşlar, her sonbaharda binlerce kilometrelik rotayı hiç şaşırmadan aşarak kışlayacakları sıcak bölgelere ulaşırlar. Peki, ceplerinde bir harita ya da pusula olmayan bu kuşlar Dünya'nın manyetik alanını nasıl hisseder? Son araştırmalar, cevabın kuşların gözlerindeki 'kriptokrom-4' adlı özel bir proteinde yattığını gösteriyor. Mavi ışık bu protein üzerine düştüğünde, kuantum düzeyinde 'dolanık elektron çiftleri' oluşur. Bu dolanık elektronlar, Dünya'nın zayıf jeomanyetik alanındaki en ufak sapmalara dahi aşırı duyarlıdır. Yani göçmen kuşlar manyetik alanı bir pusula iğnesi gibi hissetmekten ziyade, görüş alanlarının üzerine düşen aydınlık ve karanlık desenler şeklinde doğrudan 'görürler'.",
    questions: [
      {
        id: 801,
        questionStem: "Bu parçada göçmen kuşların yön bulma yeteneğiyle ilgili asıl anlatılmak istenen nedir?",
        questionType: "Ana Fikir",
        options: [
          "Kuşların rotalarını sadece yıldızların gece gökyüzündeki konumuna bakarak belirlediği",
          "Kuşların gözlerindeki kriptokrom proteini ve kuantum etkileri sayesinde Dünya'nın manyetik alanını görsel olarak algıladıkları",
          "Göç yollarının rüzgar hızına göre her yıl tamamen rastgele değiştiği",
          "Manyetik alanın sadece büyük memeli hayvanlar tarafından algılanabildiği"
        ],
        correctAnswer: 1,
        explanation: "Metin kuşların gözlerindeki kriptokrom proteinindeki kuantum dolanıklığı sayesinde manyetik alanı bir görsel desen olarak algıladıklarını açıklamaktadır."
      },
      {
        id: 802,
        questionStem: "Metne göre 'kriptokrom-4' proteininin kuantum düzeyinde aktifleşebilmesi için hangi dış faktöre ihtiyaç vardır?",
        questionType: "Yardımcı Fikir",
        options: [
          "Mavi ışığın protein üzerine düşmesine",
          "Havanın sıcaklığının sıfır derecenin altına inmesine",
          "Kuşun çok yüksek hızda uçmasına",
          "Yalnızca dolunay gecelerinde ay ışığı almasına"
        ],
        correctAnswer: 0,
        explanation: "Metinde 'Mavi ışık bu protein üzerine düştüğünde, kuantum düzeyinde dolanık elektron çiftleri oluşur' ifadesi yer almaktadır."
      }
    ]
  },
  {
    id: 9,
    title: "Epigenetik: Genlerimizin Birer Kader Olmadığını Kanıtlayan Alan",
    category: "Bilim",
    kur: "Kur 2: Orta",
    paragraphText: "Klasik genetik anlayış, DNA dizilimimizin doğum anında belirlenen ve değiştirilemez bir kader olduğunu varsayardı. Ancak 'epigenetik' bilimi bu katı kuralı yerle bir etti. DNA'mız bir piyanonun sabit tuşlarına benzetilirse, epigenetik mekanizmalar o tuşlara hangi tempoda ve şiddette basılacağını belirleyen piyanisttir. Yaşadığımız çevre, maruz kaldığımız stres, beslenme alışkanlıklarımız ve spor yapıp yapmadığımız; DNA dizilimindeki harfleri değiştirmeden bazı genlerin üzerine kimyasal etiketler (metil grupları) koyarak onları 'açar' veya 'susturur'. Bu sayede hastalıklara yatkın genlerimiz olsa bile sağlıklı bir yaşam tarzıyla bu genlerin uykuda kalmasını sağlayabiliriz.",
    questions: [
      {
        id: 901,
        questionStem: "Yazar epigenetik mekanizmaları açıklamak için hangi benzetmeden yararlanmıştır?",
        questionType: "Yardımcı Fikir",
        options: [
          "Güneş ile gezegenler arasındaki çekim dengesine",
          "Piyano tuşları ile o tuşlara basan piyanist ilişkisine",
          "Radyo vericisi ile alıcı antenine",
          "Gemi kaptanı ile pusulası arasındaki uyuma"
        ],
        correctAnswer: 1,
        explanation: "Metinde DNA piyano tuşlarına, epigenetik mekanizmalar ise hangi tuşa nasıl basılacağını belirleyen piyaniste benzetilmiştir."
      },
      {
        id: 902,
        questionStem: "Bu parçadan çıkarılabilecek en kapsamlı yargı aşağıdakilerden hangisidir?",
        questionType: "Çıkarım",
        options: [
          "Genetik yapımız yaşam tarzımızdan tamamen bağımsız işler.",
          "Yaşam biçimimiz ve çevresel etkenler genlerimizin aktifleşme durumunu doğrudan etkileyebilir.",
          "DNA dizilimimiz her yıl kendiliğinden tamamen yenilenir.",
          "Spor yapmak genetik hastalıkları bir günde tamamen yok eder."
        ],
        correctAnswer: 1,
        explanation: "Epigenetik, çevre ve yaşam tarzının genlerin açılıp kapanmasını (ifade edilmesini) kontrol ettiğini ortaya koymaktadır."
      }
    ]
  },
  {
    id: 10,
    title: "Plazma Hali: Evrenin Dördüncü ve En Yaygın Maddesi",
    category: "Bilim",
    kur: "Kur 1: Temel",
    paragraphText: "Okullarda maddenin katı, sıvı ve gaz olmak üzere üç temel hali öğretilir. Oysa gözlerimizi gökyüzüne ve derin uzaya çevirdiğimizde evrendeki görünür maddenin yüzde 99'undan fazlasının 'plazma' halinde olduğunu görürüz. Gaz halindeki bir madde aşırı derecede ısıtıldığında atomlarındaki elektronlar çekirdekten kopar; geriye serbest elektronlar ve pozitif yüklü iyonlardan oluşan akışkan bir çorba kalır. İşte bu iyonlaşmış gaza plazma denir. Güneşimiz, pırıl pırıl parlayan yıldızlar, gökyüzünü yırtan şimşekler ve kutup ışıkları (aurora) plazmanın en somut örnekleridir. Plazma serbest yüklere sahip olduğu için elektriği ve manyetik alanları mükemmel biçimde iletir.",
    questions: [
      {
        id: 1001,
        questionStem: "Bu metne göre bir gazın plazma haline dönüşebilmesi için hangi temel fiziksel olay gerçekleşmelidir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Gazın mutlak sıfır noktasına kadar soğutulması",
          "Aşırı ısınma sonucu atomlardaki elektronların çekirdekten kopup serbest kalması",
          "Gazın yüksek basınç altında sıvılaştırılması",
          "Gaz moleküllerinin bir kap içine hapsedilerek dondurulması"
        ],
        correctAnswer: 1,
        explanation: "Metinde 'aşırı derecede ısıtıldığında atomlarındaki elektronlar çekirdekten kopar... serbest elektronlar ve pozitif yüklü iyonlardan oluşan... plazma denir' ifadesi yer alır."
      },
      {
        id: 1002,
        questionStem: "Metinde aşağıdakilerden hangisi plazma haline örnek olarak gösterilmemiştir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Güneş ve parlayan yıldızlar",
          "Şimşek çakması",
          "Kutup ışıkları (auroralar)",
          "Volkanlardan akan sıvı lavlar"
        ],
        correctAnswer: 3,
        explanation: "Metinde Güneş, yıldızlar, şimşekler ve kutup ışıkları sayılmıştır; lavlar ise erimiş kayaç yani sıvı haldedir, metinde plazma örneği olarak geçmez."
      }
    ]
  }
];
