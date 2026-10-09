import { ParagrafItem } from '../paragrafData';

export const TEKNOLOJI_PARAGRAFLARI: ParagrafItem[] = [
  {
    id: 21,
    title: "Akıllı Algoritmalar ve Yankı Odaları",
    category: "Teknoloji",
    kur: "Kur 1: Temel",
    paragraphText: "Sosyal medya platformları, kullanıcıları ekranda olabildiğince uzun süre tutmak üzere tasarlanmış öneri algoritmalarıyla çalışır. Bu algoritmalar; beğendiğiniz paylaşımları, tıkladığınız haberleri ve durakladığınız videoları analiz ederek önünüze sürekli sizin dünya görüşünüzü doğrulayan içerikler düşürür. İlk bakışta kişiselleştirilmiş hoş bir konfor gibi görünen bu mekanizma, aslında 'yankı odası' (echo chamber) tehlikesini doğurur. Karşıt veya farklı görüşlerle hiç karşılaşmayan birey, kendi fikirlerinin tüm dünya tarafından benimsendiği yanılgısına kapılır. Bu durum toplumsal kutuplaşmayı derinleştirir ve yapıcı eleştiri kültürünü zedeler.",
    questions: [
      {
        id: 2101,
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
        id: 2102,
        questionStem: "Yazara göre algoritmik yankı odalarının ortaya çıkardığı en olumsuz toplumsal sonuç nedir?",
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
    id: 22,
    title: "Otonom Araçlar ve Karar Verme İkilemleri",
    category: "Teknoloji",
    kur: "Kur 2: Orta",
    paragraphText: "Sürücüsüz (otonom) otomobiller; kameraları, radar ve Lidar sensörleriyle insan sürücülere oranla çok daha hızlı tepki vererek dikkatsizlik ve yorgunluk kaynaklı kazaları büyük ölçüde önleme potansiyeline sahiptir. Ancak bu araçların yazılımları, kaçınılmaz kaza anlarında hangi kararı vermesi gerektiği sorusuyla yüzleştiğinde felsefi bir çıkmaza girer. Örneğin frenleri patlayan bir otonom araç; kaldırımdaki beş yayayı kurtarmak için direksiyonu duvara kırıp içindeki tek yolcunun hayatını mı feda etmelidir, yoksa yolcusunu her ne pahasına olursa olsun korumalı mıdır? Bu 'tramvay ikilemi', otonom teknolojilerin sadece bir yazılım meselesi olmadığını; derin bir etik, ahlak ve hukuk felsefesi boyutu taşıdığını kanıtlar.",
    questions: [
      {
        id: 2201,
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
        id: 2202,
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
  {
    id: 23,
    title: "Kuantum Bilgisayarlar ve Süperpozisyon İlkesi",
    category: "Teknoloji",
    kur: "Kur 3: İleri",
    paragraphText: "Geleneksel bilgisayarlar, bilgiyi '0' veya '1' değerini alabilen klasik bitler aracılığıyla işler. Bir transistör ya açıktır ya da kapalıdır. Oysa kuantum bilgisayarları, atom altı parçacıkların kuantum fiziği kurallarına göre davrandığı 'kübit' (kuantum biti) birimlerini kullanır. Kübitler 'süperpozisyon' ilkesi sayesinde aynı anda hem 0 hem de 1 durumunda bulunabilir. Bu durum, kuantum bilgisayarların olasılıkları tek tek sırayla denemek yerine milyarlarca hesaplamayı aynı anda, paralel olarak gerçekleştirmesini sağlar. Günümüzün en güçlü süper bilgisayarlarının çözmesi on bin yıl sürecek karmaşık moleküler simülasyonlar veya şifreleme algoritmaları, kuantum bilgisayarlarla yalnızca birkaç saniye içinde çözülebilecektir.",
    questions: [
      {
        id: 2301,
        questionStem: "Kuantum bilgisayarlarını klasik bilgisayarlardan ayıran temel çalışma prensibi nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Daha az elektrik enerjisiyle çalışan plastik piller kullanmaları",
          "Kübitlerin süperpozisyon sayesinde aynı anda hem 0 hem de 1 olabilmesi ve işlemleri paralel yürütmesi",
          "Yalnızca internet bağlantısı olmadan çalışabilmeleri",
          "Ekranda sadece siyah-beyaz yazı gösterebilmeleri"
        ],
        correctAnswer: 1,
        explanation: "Metinde kübitlerin süperpozisyon ilkesiyle aynı anda hem 0 hem 1 durumunda olabildiği ve milyarlarca olasılığı paralel işlediği belirtilmiştir."
      },
      {
        id: 2302,
        questionStem: "Bu metne göre kuantum bilgisayarlar hangi alanda devrim niteliğinde bir hız sağlayabilir?",
        questionType: "Çıkarım",
        options: [
          "Binaların dış cephe boyalarının seçiminde",
          "Karmaşık moleküler simülasyonların ve ileri şifrelemelerin saniyeler içinde çözülmesinde",
          "Klasik kağıt baskı matbaalarında",
          "Trafik ışıklarının bekleme sürelerinin kısaltılmasında"
        ],
        correctAnswer: 1,
        explanation: "Metnin sonunda süper bilgisayarların on bin yıl sürecek karmaşık moleküler simülasyon ve şifreleme problemlerini kuantumun saniyeler içinde çözebileceği ifade edilmiştir."
      }
    ]
  },
  {
    id: 24,
    title: "Biyometrik Güvenlik ve Yüz Tanıma Sistemleri",
    category: "Teknoloji",
    kur: "Kur 2: Orta",
    paragraphText: "Akıllı telefonların kilidini açmaktan havalimanı pasaport kontrollerine kadar hayatımızın her alanına giren yüz tanıma teknolojisi, derin yapay zeka ağlarıyla çalışır. Sistem; gözler arasındaki mesafe, burun köprüsünün yüksekliği ve elmacık kemiklerinin açısı gibi yüzdeki 80'den fazla nodal noktayı tarayarak eşsiz bir 'yüz haritası' çıkartır. Ancak bu pratik güvenlik çözümü, mahremiyet ve sivil özgürlükler tartışmasını da beraberinde getirmektedir. Kamusal alanlardaki güvenlik kameralarıyla entegre çalışan algoritmalar, yurttaşların her adımının rızaları olmaksızın izlenmesi ve kaydedilmesi riskini doğurur. Dijital konfor ile kişisel gizlilik arasındaki hassas denge, modern bilişim hukukunun en çetin sınavıdır.",
    questions: [
      {
        id: 2401,
        questionStem: "Bu parçaya göre yüz tanıma sistemleri bireyin yüz haritasını nasıl oluşturmaktadır?",
        questionType: "Yardımcı Fikir",
        options: [
          "Yüzdeki kılcal damarların rengini ölçerek",
          "Yüzdeki nodal noktaları ve organlar arası geometrik mesafeleri derin yapay zekayla analiz ederek",
          "Kişinin parmak izini ekrana bastırarak",
          "Kişinin ses tonundaki frekans değişimlerini kaydederek"
        ],
        correctAnswer: 1,
        explanation: "Metinde 'gözler arası mesafe, burun köprüsü, elmacık kemikleri gibi 80'den fazla nodal noktayı tarayarak yüz haritası çıkartır' denilmektedir."
      },
      {
        id: 2402,
        questionStem: "Yazar bu teknolojinin yaygınlaşmasıyla ilgili hangi tehlikeye dikkat çekmektedir?",
        questionType: "Ana Fikir",
        options: [
          "Kameraların pahalı olması nedeniyle kamu bütçesinin iflas etmesine",
          "Bireylerin kamusal alanda rızaları dışında sürekli izlenmesi sonucu kişisel gizlilik ve mahremiyetin aşınmasına",
          "Yüz tanıma yüzünden cep telefonlarının bozulmasına",
          "Güneşli havalarda kameraların yüzleri hiç tanıyamamasına"
        ],
        correctAnswer: 1,
        explanation: "Metin konfor ile mahremiyet çatışmasına ve kamusal alanlarda vatandaşların habersiz izlenmesiyle sivil özgürlüklerin risk altına girmesine odaklanmaktadır."
      }
    ]
  },
  {
    id: 25,
    title: "3 Boyutlu Biyo-Yazıcılar ve Yapay Organ Üretimi",
    category: "Teknoloji",
    kur: "Kur 1: Temel",
    paragraphText: "Tıpta organ nakli bekleyen yüz binlerce hasta, uygun bir donör bulunamaması nedeniyle hayati risk altındadır. Son yıllarda geliştirilen 3 boyutlu biyo-yazıcılar, bu kronik soruna umut verici bir çözüm sunmaktadır. Geleneksel 3D yazıcıların plastik ya da reçine kullandığı mekanizmada, biyo-yazıcılar hastanın kendi kök hücrelerinden üretilen 'biyo-mürekkep' kullanır. Bilgisayar kontrollü nozüller, hücreleri mikron düzeyinde katman katman dizerek canlı doku iskeleleri inşa eder. Hastanın kendi hücreleri kullanıldığı için nakledilen yeni dokunun vücut tarafından reddedilme riski sıfıra yakındır. Karaciğer dokusu, kıkırdak ve kalp kapakçığı gibi yapılar laboratuvar ortamında şimdiden başarıyla üretilmeye başlanmıştır.",
    questions: [
      {
        id: 2501,
        questionStem: "Biyo-yazıcılarda hastanın kendi kök hücrelerinin kullanılmasının en büyük klinik avantajı nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Cihazın daha sessiz çalışmasını sağlamak",
          "Vücudun nakledilen dokuyu yabancı madde olarak görüp reddetme riskini ortadan kaldırmak",
          "Hücrelerin plastikten daha ucuza mal edilmesi",
          "Doku üretiminin sadece bir dakikada tamamlanması"
        ],
        correctAnswer: 1,
        explanation: "Metinde 'Hastanın kendi hücreleri kullanıldığı için nakledilen yeni dokunun vücut tarafından reddedilme riski sıfıra yakındır' ifadesi yer almaktadır."
      },
      {
        id: 2502,
        questionStem: "Bu metne en uygun başlık aşağıdakilerden hangisidir?",
        questionType: "Konu / Başlık",
        options: [
          "Biyo-Yazıcılar ve Organ Naklinde Hücresel Devrim",
          "Plastik Sanayiinde 3 Boyutlu Modelleme",
          "Geleneksel Eczacılık ve İlaç Üretimi",
          "Hastanelerde Enerji Tasarrufu Yolları"
        ],
        correctAnswer: 0,
        explanation: "Metin biyo-yazıcıların çalışma prensibini ve kök hücrelerle yapay doku üreterek organ nakli krizini çözme potansiyelini konu almaktadır."
      }
    ]
  },
  {
    id: 26,
    title: "Blokzincir Teknolojisi: Güvenin Merkeziyetsizleşmesi",
    category: "Teknoloji",
    kur: "Kur 2: Orta",
    paragraphText: "Geleneksel finans ve veri sistemleri bankalar, noterler veya sunucu merkezleri gibi merkezi otoritelere dayanır. Tüm kayıtlar tek bir kurumun veritabanında tutulduğu için bu merkezlerin çökmesi ya da kötü niyetle müdahale edilmesi tüm sistemi çökertebilir. Blokzincir (blockchain) ise verileri tek bir merkezde toplamak yerine, ağa bağlı binlerce bilgisayara (düğümlere) dağıtarak eşzamanlı kopyalar halinde saklar. Her yeni işlem bloğu, matematiksel bir şifre (kriptografik özet) ile kendinden önceki bloğa zincirlenir. Geriye dönük tek bir kaydı bile değiştirmek için ağdaki milyonlarca bilgisayarın aynı anda hacklenmesi gerekir ki bu matematiksel olarak imkansızdır. Blokzincir, aracılara duyulan güven ihtiyacını matematiksel kesinlikle ikame etmiştir.",
    questions: [
      {
        id: 2601,
        questionStem: "Blokzincir mimarisini merkezi veri tabanlarından daha güvenli kılan temel faktör nedir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Sadece devlet başkanları tarafından kullanılabilmesi",
          "Verilerin tek merkez yerine ağdaki binlerce bilgisayarda şifreli bloklar halinde dağıtık ve değiştirilemez biçimde tutulması",
          "İnternet kablolarının yer altında bulunması",
          "Kullanıcıların şifrelerini asla unutmaması"
        ],
        correctAnswer: 1,
        explanation: "Metin blokzincirin dağıtık yapısını ve blokların kriptografik olarak birbirine bağlanıp değiştirilemez oluşunu temel güvenlik dayanağı olarak anlatmaktadır."
      },
      {
        id: 2602,
        questionStem: "Metinde geçen 'aracılara duyulan güven ihtiyacını matematiksel kesinlikle ikame etmiştir' sözüyle ne anlatılmaktadır?",
        questionType: "Çıkarım",
        options: [
          "Artık insanların banka veya noter gibi kurumlara ihtiyaç duymadan kriptografik kurallarla güvenle işlem yapabilmesi",
          "Matematik derslerinin okullarda zorunlu hale getirilmesi",
          "Bütün bilgisayarların klavyelerinin kaldırılması",
          "Hesap makinelerinin finans sektöründen tamamen silinmesi"
        ],
        correctAnswer: 0,
        explanation: "Sistemde banka veya noter gibi üçüncü taraflara gerek kalmadan, kriptografik kurallar sayesinde doğrudan eşler arası güven sağlanmaktadır."
      }
    ]
  },
  {
    id: 27,
    title: "Nesnelerin İnterneti (IoT) ve Akıllı Şehirler",
    category: "Teknoloji",
    kur: "Kur 1: Temel",
    paragraphText: "Eskiden internet yalnızca bilgisayarlar ve akıllı telefonlar arasında veri aktarımı sağlarken günümüzde çöp kutularından sokak lambalarına, su sayaçlarından otobüs duraklarına kadar milyarlarca nesne internete bağlanmaktadır. 'Nesnelerin İnterneti' (IoT) olarak adlandırılan bu dev ekosistem, özellikle metropollerin yönetiminde büyük bir dönüşüm yaratmaktadır. Örneğin akıllı çöp konteynerleri doluluk oranlarını belediye merkezine bildirerek çöp kamyonlarının gereksiz sefer yapmasını ve yakıt israfını önler. Yollardaki trafik sensörleri ise yoğunluğa göre trafik ışıklarının yeşil yanma sürelerini dinamik olarak ayarlar. IoT, şehirleri sadece daha teknolojik değil, aynı zamanda karbon ayak izi düşük ve enerji verimliliği yüksek yaşam alanlarına dönüştürmektedir.",
    questions: [
      {
        id: 2701,
        questionStem: "Bu parçada Nesnelerin İnterneti (IoT) teknolojisinin hangi çevresel faydası doğrudan örneklenmiştir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Binaların renginin değiştirilmesi",
          "Çöp kamyonlarının gereksiz seferlerinin önlenerek yakıt israfı ve karbon salımının azaltılması",
          "İnternet fiyatlarının ucuzlatılması",
          "Telefon ekranlarının daha parlak olması"
        ],
        correctAnswer: 1,
        explanation: "Metinde akıllı çöp kutularının doluluk oranını bildirip gereksiz seferleri ve yakıt israfını önlediği somut bir örnek olarak sunulmuştur."
      },
      {
        id: 2702,
        questionStem: "Bu metnin ana düşüncesi aşağıdakilerden hangisidir?",
        questionType: "Ana Fikir",
        options: [
          "Trafik lambaları insan sağlığına zararlıdır.",
          "Nesnelerin İnterneti, kentsel hizmetleri optimize ederek şehirleri daha verimli, sürdürülebilir ve yaşanabilir kılmaktadır.",
          "Gelecekte insanlar sadece akıllı saatlerle konuşacaktır.",
          "Belediyeler tüm çalışanlarını robotlarla değiştirmelidir."
        ],
        correctAnswer: 1,
        explanation: "Parça IoT'nin şehir yönetiminde enerji verimliliği, yakıt tasarrufu ve dinamik optimizasyon sağlayarak sürdürülebilirliği artırdığını savunmaktadır."
      }
    ]
  },
  {
    id: 28,
    title: "Sanal Gerçeklik (VR) ve Beynin Mekan Yanılsaması",
    category: "Teknoloji",
    kur: "Kur 2: Orta",
    paragraphText: "Başınıza bir sanal gerçeklik (VR) gözlüğü taktığınızda gözleriniz ekranın aslında burnunuzun ucunda durduğunu bilse de beyniniz tamamen farklı bir mekan algısına teslim olur. Sanal ortamda bir uçurumun kenarına yaklaştığınızda kalbinizin hızla çarpması, avuçlarınızın terlemesi ve dizlerinizin titremesi, beynin 'varlık hissi' (presence) üretme mekanizmasından kaynaklanır. Gözlükteki jiroskoplar başınızın milimetrik dönüşlerini gecikmesiz takip ettiğinde, görsel korteks bu yapay uyarıcıyı gerçek kabul eder. Bu büyüleyici bilişsel yanılsama, oyun dünyasının çok ötesinde cerrahların risksiz sanal ameliyatlar yapmasında, pilotların uçuş eğitimlerinde ve fobi tedavilerinde tıp ve eğitim için eşsiz bir laboratuvar sunmaktadır.",
    questions: [
      {
        id: 2801,
        questionStem: "VR gözlüğü takan bir kişinin uçurum kenarında fiziksel korku tepkileri vermesinin sebebi nedir?",
        questionType: "Çıkarım",
        options: [
          "Gözlüğün içine soğuk hava üflenmesi",
          "Jiroskopların hareketi gecikmesiz aktarmasıyla beynin sanal uyarıcıları gerçek bir mekan gibi algılayıp varlık hissi üretmesi",
          "Gözlüğün göz sinirlerine elektrik akımı vermesi",
          "Kullanıcının daha önce uçurumdan düşmüş olması"
        ],
        correctAnswer: 1,
        explanation: "Metinde baş hareketlerinin anlık takibiyle görsel korteksin yapay uyarıcıyı gerçek sanarak 'varlık hissi' ürettiği açıklanmıştır."
      },
      {
        id: 2802,
        questionStem: "Metne göre sanal gerçeklik teknolojisinin eğlence sektörü dışındaki faydalı kullanım alanları hangileridir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Tarım arazilerini sulamak",
          "Cerrahi tıp simülasyonları, pilotluk eğitimleri ve fobi terapileri",
          "Otomobil lastiklerinin havasını ölçmek",
          "Binaların deprem direncini inşaatsız artırmak"
        ],
        correctAnswer: 1,
        explanation: "Metnin son cümlesinde cerrahların sanal ameliyatları, pilot eğitimleri ve fobi tedavileri örnek verilmiştir."
      }
    ]
  },
  {
    id: 29,
    title: "Uzay Madenciliği: Asteroitlerdeki Sonsuz Kaynaklar",
    category: "Teknoloji",
    kur: "Kur 3: İleri",
    paragraphText: "Yeryüzünde yeşil enerji dönüşümü ve elektronik sanayisi için hayati önem taşıyan platin, nikel, kobalt ve lityum gibi nadir madenler hızla tükenmektedir. Karasal madencilik hem doğayı tahrip etmekte hem de jeopolitik gerilimlere yol açmaktadır. Bilim insanları ve özel uzay şirketleri, bu darboğazı aşmak için gözlerini Dünya'ya yakın yörüngedeki asteroitlere çevirmiştir. Örneğin '16 Psyche' adlı tek bir metalik asteroitin içerdiği nikel ve demir rezervinin Dünya ekonomisinin toplam değerinden katbekat fazla olduğu hesaplanmaktadır. Asteroitlerden çıkarılacak madenlerin uzayda kurulan yörünge istasyonlarında işlenmesi, hem Dünya ekosistemini ağır sanayi atıklarından kurtaracak hem de Ay ve Mars üslerinin inşası için gerekli yapı malzemelerini uzayda doğrudan temin edecektir.",
    questions: [
      {
        id: 2901,
        questionStem: "Bu metinde uzay madenciliğinin Dünya açısından en büyük ekolojik avantajı nasıl özetlenmiştir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Güneş patlamalarını tamamen durduracak olması",
          "Ağır sanayi ve madencilik tahribatını Dünya dışına taşıyarak karasal ekosistemleri kirlilikten koruması",
          "Dünya'nın çekim kuvvetini azaltması",
          "Okyanusların seviyesini düşürmesi"
        ],
        correctAnswer: 1,
        explanation: "Metinde madenlerin uzayda işlenmesinin Dünya ekosistemini ağır sanayi atıklarından ve karasal madencilik tahribatından kurtaracağı vurgulanmıştır."
      },
      {
        id: 2902,
        questionStem: "16 Psyche asteroitinden metinde hangi amaçla bahsedilmiştir?",
        questionType: "Çıkarım",
        options: [
          "Dünya'ya çarpma tehlikesi olan bir göktaşı olduğunu göstermek için",
          "Asteroitlerin ne kadar muazzam bir ekonomik ve madeni potansiyel barındırdığını somutlaştırmak için",
          "Üzerinde uzaylı fosillerinin bulunduğunu açıklamak için",
          "Ay'ın yörüngesinden fırlatılan bir füze olduğunu belirtmek için"
        ],
        correctAnswer: 1,
        explanation: "16 Psyche, barındırdığı nikel ve demirin Dünya ekonomisinin toplamından fazla olduğu belirtilerek uzay madenciliğinin devasa potansiyelini somutlaştırmak için örnek verilmiştir."
      }
    ]
  },
  {
    id: 30,
    title: "Beyin-Bilgisayar Arayüzleri (BCI) ve Zihnin Dijital Gücü",
    category: "Teknoloji",
    kur: "Kur 3: İleri",
    paragraphText: "Beynimizdeki milyarlarca nöron düşünürken, karar verirken ve hareket ederken minik elektriksel sinyaller üretir. Beyin-Bilgisayar Arayüzü (BCI) teknolojisi, kafatasına yerleştirilen mikro elektrotlar veya invaziv olmayan kasklar vasıtasıyla bu sinyalleri yakalayarak yapay zeka algoritmalarına iletir. Algoritmalar, 'kolumu kaldır' düşüncesine denk gelen elektriksel voltaj dalgasını deşifre ederek bunu bir robotik proteze ya da bilgisayar imlecine iletir. Bu teknoloji sayesinde omurilik felci nedeniyle hareket edemeyen veya konuşma yetisini yitirmiş (ALS) hastalar, yalnızca düşünce güçleriyle protez kollarını hareket ettirebilmekte ve ekranda yazı yazabilmektedir. BCI, biyolojik sinir sistemi ile dijital dünya arasındaki sınırı tamamen ortadan kaldırmaktadır.",
    questions: [
      {
        id: 3001,
        questionStem: "Beyin-Bilgisayar Arayüzü (BCI) teknolojisinin temel çalışma mantığı nedir?",
        questionType: "Ana Fikir",
        options: [
          "İnsanların hafızasını tamamen silip internetten yeni bilgiler yüklemek",
          "Nöronların ürettiği elektriksel sinyalleri yakalayıp çözerek bunları robotik veya dijital komutlara dönüştürmek",
          "Göz bebeğinin büyüklüğüne göre bilgisayar ekranının parlaklığını kısmak",
          "İnsan beynine yüksek voltajlı elektrik şoku vererek hafızayı tazelemek"
        ],
        correctAnswer: 1,
        explanation: "Metin BCI'ın nöronların elektriksel dalgalarını deşifre edip robotik protez veya ekrana komut olarak aktarmasını ana mekanizma olarak anlatmaktadır."
      },
      {
        id: 3002,
        questionStem: "Bu teknolojinin felçli bireyler için sunduğu en somut kazanım aşağıdakilerden hangisidir?",
        questionType: "Yardımcı Fikir",
        options: [
          "Bedenlerini hareket ettiremeseler dahi yalnızca düşünce gücüyle protez uzuvları yönetebilmeleri ve iletişim kurabilmeleri",
          "Hastanelerdeki tüm ilaç masraflarını karşılaması",
          "Yürürken yorulmalarını tamamen engellemesi",
          "Gözlük takma ihtiyacını ortadan kaldırması"
        ],
        correctAnswer: 0,
        explanation: "Metinde omurilik felçlilerinin sadece düşünce gücüyle protez kollarını hareket ettirip ekranda yazı yazabildiği vurgulanmıştır."
      }
    ]
  }
];
