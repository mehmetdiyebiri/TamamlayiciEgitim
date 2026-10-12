import { MakaleItem } from './makaleTypes';

export const TEKNOLOJI_ARTICLES: MakaleItem[] = [
  {
    id: 301,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 1,
    title: "Yapay Zeka ve İnsan Doğası: Zeka ile Bilincin Ayrımı",
    category: "Teknoloji",
    duration: 8,
    difficulty: "İleri",
    skills: ["Felsefi Teknoloji", "Kavramsal Analiz"],
    text: "Günümüzde derin öğrenme algoritmaları, sinir ağları ve milyarlarca parametreli büyük dil modellerinin ulaştığı hayret verici başarılar; yalnızca teknolojik bir ilerleme tablosu çizmekle kalmayıp insanlık tarihinin en köklü felsefi sorusunu yeniden alevlendirmiştir: 'Düşünmek nedir ve makineler bilinç kazanabilir mi?' Yapay zeka sistemleri bugün tıp alanında radyoloji taramalarını insan hekimlerden daha yüksek hassasiyetle okuyabilmekte, satranç ve Go gibi antik strateji oyunlarında dünya şampiyonlarını çaresiz bırakmakta, hatta hüzünlü şiirler ve karmaşık bilgisayar yazılımları üretebilmektedir. Ancak bilişsel bilimciler ve analitik zihin felsefecileri, 'zeka' ile 'bilinç' arasında aşılması imkansız görünen ontolojik bir uçurum bulunduğuna dikkat çekerler.\n\nZeka; veriyi hızla işleme, kalıpları ve örüntüleri tanıma, olasılık hesaplama ve belirli bir hedef doğrultusunda problem çözme kapasitesidir. Bilinç (consciousness) ise 'öznel deneyim' (qualia), yani acıyı hissetme, gün batımının kırmızılığını duyumsama, sevinç ya da varoluşsal kaygı duyma yetisidir. Amerikalı filozof John Searle'ün meşhur 'Çin Odası' düşünce deneyi tam da bu ayrımı kristalleştirir: Çince bilmeyen bir insanı kapalı bir odaya koyup eline Çince sembolleri hangi kurallarla eşleştireceğini gösteren bir İngilizce kılavuz verirseniz; dışarıdan gelen Çince sorulara içerideki kuralları uygulayarak kusursuz Çince yanıtlar verebilir. Dışarıdan bakan bir gözlemci odadaki kişinin akıcı biçimde Çince bildiğini zanneder; oysa içerideki kişi sembollerin anlamından (semantik) habersiz, sadece biçimsel dizilimleri (sentaks) manipüle etmektedir. Günümüz yapay zekaları da muazzam bir istatistiksel hesaplama gücüyle dili ve mantığı taklit ederken, ne söylediğinin anlamını bilmemekte; 'Ben kimim?' sorusunun öznel sancısını asla yaşayamamaktadır.",
    idealAnswer: "Yapay zeka veriyi analiz edip problem çözmede üstün zeka sergilese de sembolleri anlamlandıran ve öznel farkındalığı olan bilinçten yoksundur.",
    workspace: {
      konuDedektifi: "",
      hizliOzet: "",
      yazarinAmaci: "",
      soruUretimi: ["", "", ""],
      anaDusunce: "",
      cikarimYapma: "",
      yardimciDusunceler: ["", "", ""],
      boslukDoldurma: "",
      anlatimBicimi: "",
      dusunceyiGelistirme: ""
    },
    solution: {
      konuDedektifi: "Yapay zekanın problem çözme yetisi (zeka) ile insanın öznel iç dünyası ve anlam kavrayışı (bilinç) arasındaki temel fark.",
      hizliOzet: "Makineler insan zekasını istatistiksel örüntülerle taklit edebilse de Çin Odası örneğinde olduğu gibi anlamdan ve öznel bilinçten yoksundur.",
      yazarinAmaci: "Okuyucunun yapay zekayı aşırı insansılaştırmasını engelleyerek zeka ile bilinç arasındaki felsefi farkı açıklamak.",
      soruUretimi: [
        "Zeka ile bilinç arasındaki temel kavramsal fark nedir?",
        "Çin Odası düşünce deneyi yapay zekanın sentaks-semantik ilişkisini nasıl açıklar?",
        "Yapay zeka neden öznel deneyim (qualia) yaşayamaz?"
      ],
      anaDusunce: "Yapay zeka modelleri muazzam hesaplama yeteneklerine sahip olsa da insan bilincine, duygu dünyasına ve gerçek anlama yetisine sahip değildir.",
      cikarimYapma: "Bir sistemin dilbilgisi kurallarını ve mantıksal çıktıları hatasız üretmesi, onun zihinsel bir bilince ulaştığı anlamına gelmez.",
      yardimciDusunceler: [
        "Yapay zeka teşhis koyabilir ve Go oynayabilir.",
        "Zeka hedef odaklı veri işlemedir.",
        "Bilinç öznel hisler ve anlamlandırmadır.",
        "Çin Odası sembol manipülasyonunun gerçek anlama olmadığını kanıtlar."
      ],
      boslukDoldurma: "Yapay zeka dili ve mantığı simüle ederken, ne söylediğinin anlamından ve öznel deneyimden yoksundur.",
      anlatimBicimi: "Tartışmacı ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Düşünce Deneyi (Çin Odası), Tanımlama (Zeka ve Bilinç) ve Karşılaştırma",
      neuralWarning: "Yapay zekanın kusursuz metin yazabilmesini gerçek bir bilinç veya duygu göstergesi zannetmeyin.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Metinde geçen 'Çin Odası' deneyinin yapay zeka tartışmalarındaki **ana işlevi** nedir?",
      options: [
        { letter: "A", text: "Yabancı dil öğreniminde algoritmaların insanlardan daha verimli olduğunu ispatlamak", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Kuralları kusursuz uygulamanın o kuralların anlamına vakıf olmak (semantik) anlamına gelmediğini göstermek", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Donanımsal hızın bilinç gelişimini tetikleyeceğini ortaya koymak", isCorrect: false, type: "detay" },
        { letter: "D", text: "Satranç yazılımlarının insan beynini birebir modellediğini savunmak", isCorrect: false, type: "detay" }
      ],
      explanation: "Çin Odası deneyi, kurallara bakarak sembolleri eşleştirmenin o dili anlamak olmadığını göstererek yapay zekanın anlam ve bilinçten yoksun olduğunu kanıtlar."
    }
  },
  {
    id: 302,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 2,
    title: "Nesnelerin İnterneti (IoT) ve Akıllı Şehirlerin Dijital Omurgası",
    category: "Teknoloji",
    duration: 8,
    difficulty: "Orta",
    skills: ["Sistemik Düşünme", "Veri Analitiği"],
    text: "Tarih boyunca kentler; su kemerleri, kanalizasyon hatları, elektrik şebekeleri ve otoyollar gibi fiziksel altyapılar üzerinde yükselmiştir. Ancak 21. yüzyılda mega kentlerin nüfus yoğunluğu, enerji tüketimi ve trafik tıkanıklığı gibi krizlerle baş edebilmesi, fiziksel altyapıların üzerine 'dijital bir sinir sistemi' örülmesini zorunlu kılmıştır. İşte bu dönüşümün kalbinde Nesnelerin İnterneti (IoT) yer alır. IoT; sokak lambalarından çöp konteynerlerine, su sayaçlarından akıllı kavşaklara kadar çevremizdeki fiziksel nesnelerin mikroişlemciler, sensörler ve kablosuz iletişim modülleriyle donatılarak internet üzerinden birbirleriyle ve merkezi sunucularla veri alışverişi yapabilmesidir.\n\nAkıllı şehir vizyonu, bu devasa veri akışının yapay zeka tarafından gerçek zamanlı analiz edilmesiyle somutlaşır. Örneğin Amsterdam ve Singapur gibi şehirlerde sokak lambaları üzerindeki sensörler sadece yoldan bir araç veya yaya geçtiğinde aydınlatma düzeyini artırarak %40'a varan enerji tasarrufu sağlamaktadır. Akıllı trafik sinyalizasyon sistemleri, kavşaklardaki yoğunluk kameralarından gelen verileri saniyelik olarak işleyerek yeşil ışık sürelerini dinamik biçimde ayarlar; böylece karbon salınımını ve bekleme sürelerini asgari düzeye indirir. Benzer şekilde atık toplama araçları, doluluk sensörüne sahip konteynerleri rota optimizasyonuyla toplayarak yakıt israfını engeller. Ne var ki her nesnenin birbiriyle konuştuğu ve milyarlarca sensörün kesintisiz veri ürettiği bir metropolde siber güvenlik ve vatandaşların konum mahremiyeti hayati bir risk alanına dönüşür. Akıllı şehirlerin güvenliği, toplanan verilerin şifrelenmesi ve siber saldırılara karşı korunmasıyla doğrudan bağlantılıdır.",
    idealAnswer: "IoT teknolojisi fiziksel nesneleri sensörlerle donatıp birbirine bağlayarak akıllı şehirlerde enerji, trafik ve kaynak yönetimini optimize ederken veri güvenliği zorluklarını da beraberinde getirir.",
    workspace: {
      konuDedektifi: "",
      hizliOzet: "",
      yazarinAmaci: "",
      soruUretimi: ["", "", ""],
      anaDusunce: "",
      cikarimYapma: "",
      yardimciDusunceler: ["", "", ""],
      boslukDoldurma: "",
      anlatimBicimi: "",
      dusunceyiGelistirme: ""
    },
    solution: {
      konuDedektifi: "Nesnelerin İnterneti (IoT) teknolojisinin akıllı kent altyapılarında enerji ve trafik verimliliği sağlaması.",
      hizliOzet: "Sensörlerle birbirine bağlanan nesneler kentleri optimize ederek karbon salınımını azaltır ancak siber güvenlik risklerini büyütür.",
      yazarinAmaci: "IoT'nin akıllı şehircilikteki pratik faydalarını somut örneklerle gösterip güvenlik boyutuna dikkat çekmek.",
      soruUretimi: [
        "Akıllı aydınlatma sistemleri nasıl enerji tasarrufu sağlar?",
        "Trafik optimizasyonunda IoT sensörleri nasıl kullanılır?",
        "Akıllı şehirlerin karşılaştığı en büyük risk nedir?"
      ],
      anaDusunce: "IoT tabanlı akıllı şehir sistemleri kentsel yaşamı sürdürülebilir ve verimli kılmanın en güçlü aracı olmakla birlikte yüksek siber güvenlik gerektirir.",
      cikarimYapma: "Bir şehrin teknolojik altyapısı dijitalleştikçe fiziksel hizmetlerin güvenliği de siber korumanın başarısına bağımlı hale gelir.",
      yardimciDusunceler: [
        "Fiziksel nesneler sensörlerle donatılır.",
        "Sokak lambaları enerji tasarrufu sağlar.",
        "Trafik ışıkları yoğunluğa göre dinamik değişir.",
        "Veri mahremiyeti ve siber güvenlik temel kaygılardır."
      ],
      boslukDoldurma: "Her nesnenin birbiriyle konuştuğu bir metropolde siber güvenlik ve konum mahremiyeti hayati bir risk alanına dönüşür.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Örneklendirme (Singapur, Amsterdam), Sayısal Veri (%40) ve Tanımlama",
      neuralWarning: "IoT'nin sadece cep telefonu ve bilgisayarlardan ibaret olmadığını, ev ve sokak eşyalarını kapsadığını unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre akıllı şehirlerde uygulanan IoT sistemlerinin en belirgin çevresel ve ekonomik kazanımı nedir?",
      options: [
        { letter: "A", text: "Şehirlerdeki binaların yüksekliğini sınırlandırması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Enerji tüketimini, karbon salınımını ve kaynak israfını veri odaklı optimizasyonla asgari düzeye indirmesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Tüm toplu taşıma araçlarını tamamen ücretsiz hale getirmesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Geleneksel internet kablolarının kullanımını zorunlu kılması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde sokak lambalarından trafiğe ve atık yönetimine kadar kaynakların sensörlerle optimize edilerek yakıt, enerji ve karbon israfının önlendiği belirtilmiştir."
    }
  },
  {
    id: 303,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 3,
    title: "Blokzincir Teknolojisi: Merkeziyetsizlik ve Güven Protokolleri",
    category: "Teknoloji",
    duration: 8,
    difficulty: "İleri",
    skills: ["Sistem Mimarisi", "Mantıksal Çıkarım"],
    text: "İnsanlık tarihi boyunca ticaret, bankacılık, tapu kayıtları ve sözleşmeler; güveni tesis etmek için hep 'merkezi üçüncü taraflara' (devletler, noterler, bankalar) ihtiyaç duymuştur. İki birey arasında gerçekleşen bir para transferinin geçerli sayılabilmesi için bir bankanın defter-i kebirinde (ledger) bakiyelerin güncellenmesi zorunludur. Ancak bu merkezi mimari; tek bir hata noktası (single point of failure) içermesi, yüksek işlem komisyonları talep etmesi, sansüre açık olması ve merkezi veritabanlarının korsanlarca ele geçirilebilmesi gibi yapısal zaaflar barındırır.\n\nSatoshi Nakamoto rumuzlu geliştiricinin 2008 yılında dünyaya armağan ettiği blokzincir (blockchain) mimarisi; güveni merkezi bir otoritenin tekelinden alıp matematiksel ve kriptografik kurallara dayalı dağıtık bir ağa teslim etmiştir. Blokzincir; ağdaki binlerce bağımsız düğüm (node) tarafından eş zamanlı tutulan, geriye dönük olarak değiştirilemeyen ya da silinemeyen dağıtık bir defterdir. Her blok kendisinden önceki bloğun kriptografik özetini (kriptografik hash) içerir. Bu zincirleme yapı sayesinde kötü niyetli bir aktör geçmişteki tek bir kaydı değiştirmek isterse, kendisinden sonra gelen tüm blokların matematiksel iş kanıtını (Proof of Work) ağdaki tüm bilgisayarlardan daha hızlı hesaplamak zorunda kalır ki bu pratikte imkansızdır. Blokzincir yalnızca kripto paralarla sınırlı kalmayıp; aracısız çalışan akıllı sözleşmeler (smart contracts), tedarik zincirinde ürünlerin orijinallik takibi, seçimlerde hilesiz dijital oy verme sistemleri ve telif haklarının şeffaf dağıtımı gibi alanlarda güven kavramını yeniden tanımlamaktadır.",
    idealAnswer: "Blokzincir, merkezi aracıları devreden çıkarıp şifreli ve değiştirilemez dağıtık defter yapısıyla güveni matematiksel protokoller üzerinden kuran devrimsel bir mimaridir.",
    workspace: {
      konuDedektifi: "",
      hizliOzet: "",
      yazarinAmaci: "",
      soruUretimi: ["", "", ""],
      anaDusunce: "",
      cikarimYapma: "",
      yardimciDusunceler: ["", "", ""],
      boslukDoldurma: "",
      anlatimBicimi: "",
      dusunceyiGelistirme: ""
    },
    solution: {
      konuDedektifi: "Blokzincirin çalışma mantığı, merkezi otorite ihtiyacını ortadan kaldıran kriptografik mimarisi.",
      hizliOzet: "Merkezi bankalar yerine dağıtık düğümler ve kriptografik hash fonksiyonları kullanarak kayıtların değiştirilmesini imkansız kılan güven protokolüdür.",
      yazarinAmaci: "Blokzinciri finansal spekülasyonun ötesinde güveni dağıtık kılan bir veri devrimi olarak anlatmak.",
      soruUretimi: [
        "Merkezi güven modellerinin en belirgin açıkları nelerdir?",
        "Blokların zincirleme bağlanmasını sağlayan kriptografik mekanizma nedir?",
        "Akıllı sözleşmeler hangi alanlarda kullanılabilir?"
      ],
      anaDusunce: "Blokzincir teknolojisi, güveni şahıslara veya kurumlara değil matematiksel konsensüs algoritmalarına devrederek şeffaf ve manipüle edilemez bir kayıt sistemi sağlar.",
      cikarimYapma: "Aracı kurumların devreden çıkması işlem maliyetlerini düşürürken bireyler arası doğrudan doğrulanabilir anlaşmaları mümkün kılar.",
      yardimciDusunceler: [
        "Geleneksel sistemler noter ve bankalara dayanır.",
        "Blokzincir binlerce bağımsız düğümde eş zamanlı tutulur.",
        "Önceki bloğun hash kodu zinciri kırılmaz yapar.",
        "Tedarik, telif ve seçim sistemlerinde devrim potansiyeli taşır."
      ],
      boslukDoldurma: "Blokzincir, güveni merkezi bir otoritenin tekelinden alıp matematiksel ve dağıtık bir ağa teslim etmiştir.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Merkezi vs Dağıtık sistemler) ve Tanımlama",
      neuralWarning: "Blokzincir ile Bitcoin'in aynı şey olmadığını; blokzincirin temel bir teknoloji olduğunu ayırt edin.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Blokzincir mimarisinde kayıtların geriye dönük olarak silinmesini veya değiştirilmesini engelleyen **temel unsur** nedir?",
      options: [
        { letter: "A", text: "Tek bir merkezi süper bilgisayarın tüm ağı kontrol etmesi", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Her bloğun bir önceki bloğun kriptografik özetini içermesi ve ağdaki çoğunluk onayı olmadan değiştirilememesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Sistemde hiçbir şifreleme algoritmasının kullanılmaması", isCorrect: false, type: "detay" },
        { letter: "D", text: "İnternet bağlantısı kesildiğinde kayıtların dondurulması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metne göre her blok bir öncekinin kriptografik hash'ini içerir; geçmişteki bir kaydı değiştirmek sonraki tüm blokları yeniden hesaplamayı gerektirdiğinden sistem manipülasyona kapalıdır."
    }
  },
  {
    id: 304,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 4,
    title: "Biyomimetik Teknoloji: Doğanın Milyon Yıllık Tasarımları",
    category: "Teknoloji",
    duration: 8,
    difficulty: "Orta",
    skills: ["Disiplinlerarası Analiz", "İnovasyon"],
    text: "Gezegenimiz Dünya, yaklaşık 3,8 milyar yıldır süregelen amansız bir araştırma-geliştirme laboratuvarıdır. Doğadaki tüm canlı türleri; kuraklık, aşırı basınç, soğuk, sürtünme ve enerji kıtlığı gibi zorluklara karşı sayısız mutasyon ve doğal seçilim filtresinden geçerek mükemmelleşmiş anatomik ve davranışsal çözümler geliştirmiştir. İşte doğanın bu eşsiz hayatta kalma stratejilerini ve tasarımlarını inceleyerek insan yapımı mühendislik problemlerine uyarlama disiplinine 'Biyomimetik' (Biyomimikri) adı verilir. Biyomimetik mühendislik; doğayı sömürülecek bir hammadde deposu olarak görmek yerine, ona usta bir başöğretmen ve danışman gözüyle yaklaşır.\n\nBunun dünyadaki en çarpıcı örneklerinden biri Japonya'nın efsanevi hızlı treni Şinkansen'in hikayesidir. Trenler tünellere yüksek hızla (300 km/s) girdiğinde havanın aniden sıkışması yüzünden tünel çıkışlarında mahalleleri sarsan bir patlama sesi (sonik patlama) oluşuyordu. Başmühendis Eiji Nakatsu, kendisi de bir kuş gözlemcisi olarak, yalıçapkını kuşunun havadan suya dalarken tek bir su damlası bile sıçratmadan avını yakaladığını fark etti. Kuşun sivri ve basık gaga anatomisi incelenerek trenin burun konisi aynı geometriyle yeniden tasarlandı; sonuçta patlama sesi tamamen ortadan kalktı, tren %10 daha hızlandı ve elektrik tüketimi %15 azaldı. Benzer biçimde lotus çiçeğinin yapraklarındaki mikroskobik pürüzler suyu ve kiri tutmayan kendini temizleyen akıllı cephe boyalarını doğurdu. Köpekbalığı derisinin diş benzeri pulları (dentikül) ise denizaltılarda sürtünmeyi azaltıp bakterilerin yapışmasını engelleyen antibakteriyel kaplamalara ilham kaynağı oldu. Doğa, milyarlarca yıllık deneyimiyle en karmaşık insan teknolojilerine en zarif çözümleri fısıldamaya devam etmektedir.",
    idealAnswer: "Biyomimetik, milyonlarca yıllık evrimsel seçilimle mükemmelleşmiş canlı anatomilerini taklit ederek enerji tasarruflu ve çevre dostu mühendislik çözümleri üreten yenilikçi bir bilimdir.",
    workspace: {
      konuDedektifi: "",
      hizliOzet: "",
      yazarinAmaci: "",
      soruUretimi: ["", "", ""],
      anaDusunce: "",
      cikarimYapma: "",
      yardimciDusunceler: ["", "", ""],
      boslukDoldurma: "",
      anlatimBicimi: "",
      dusunceyiGelistirme: ""
    },
    solution: {
      konuDedektifi: "Doğadaki canlı mekanizmalarının mühendislik ve tasarıma uyarlanması (Biyomimetik).",
      hizliOzet: "Canlıların 3,8 milyar yıllık evrimsel tasarımları incelenerek hızlı trenlerden akıllı boyalara kadar verimli çözümler geliştirilmektedir.",
      yazarinAmaci: "Okuyucuya doğadaki tasarımların ileri teknolojinin karşılaştığı problemlere nasıl rehberlik ettiğini somut vakalarla göstermek.",
      soruUretimi: [
        "Şinkansen hızlı treninin burun tasarımında hangi kuştan esinlenilmiştir?",
        "Lotus çiçeğinin yaprak yapısı hangi sanayi ürününü geliştirmiştir?",
        "Biyomimetik doğaya nasıl bir bakış açısıyla yaklaşır?"
      ],
      anaDusunce: "İnsan mühendisliği, doğanın milyarlarca yıllık evrimsel optimizasyonunu taklit ederek daha az enerji tüketen, zarif ve dayanıklı teknolojiler geliştirebilir.",
      cikarimYapma: "Doğal yaşamı ve biyoçeşitliliği korumak aynı zamanda geleceğin teknolojik inovasyon kaynaklarını da korumak anlamına gelir.",
      yardimciDusunceler: [
        "Doğa 3,8 milyar yıldır Ar-Ge laboratuvarıdır.",
        "Yalıçapkını gagası hızlı tren patlama sesini çözmüştür.",
        "Lotus yaprağı kendi kendini temizleyen boyalara ilham olmuştur.",
        "Köpekbalığı derisi sürtünme ve bakteri direncini sağlamıştır."
      ],
      boslukDoldurma: "Biyomimetik doğayı sömürülecek bir hammadde değil, usta bir başöğretmen gözüyle inceler.",
      anlatimBicimi: "Öyküleyici ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Örneklendirme (Yalıçapkını, Lotus, Köpekbalığı) ve Sayısal Veri (%10 hız, %15 tasarruf)",
      neuralWarning: "Biyomimetiğin sadece mekanik taklit değil, biyolojik prensiplerin analitik olarak modellenmesi olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Şinkansen hızlı treninde yalıçapkını kuşunun gagasının taklit edilmesiyle elde edilen **temel kazanımlar** hangisinde bir arada verilmiştir?",
      options: [
        { letter: "A", text: "Yolcu kapasitesinin iki katına çıkması ve bilet fiyatlarının düşmesi", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Sonik patlama sesinin engellenmesi, hızın artması ve enerji tüketiminin düşmesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Trenin su altında da gidebilir hale getirilmesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Tünellerin tamamen genişletilmesine gerek kalmadan sefer sayısının artırılması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde açıkça patlama sesinin yok olduğu, trenin %10 hızlandığı ve elektrik tüketiminin %15 azaldığı bir arada ifade edilmiştir."
    }
  }
];
