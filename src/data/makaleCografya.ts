import { MakaleItem } from './makaleTypes';

export const COGRAFYA_ARTICLES: MakaleItem[] = [
  {
    id: 501,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 1,
    title: "İklim Krizinde Çölleşme ve Toprak Verimliliğinin Kaybı",
    category: "Coğrafya",
    duration: 8,
    difficulty: "Orta",
    skills: ["Ekolojik Analiz", "Sebep-Sonuç Mantığı"],
    text: "Birleşmiş Milletler Çevre Programı (UNEP), çölleşmeyi 'kurak, yarı kurak ve az yağışlı alanlarda iklim değişkenlikleri ve bilinçsiz insan faaliyetleri neticesinde toprağın biyolojik üretim ve ekolojik taşıma kapasitesini yitirmesi' olarak tanımlamaktadır. Kamuoyundaki yaygın yanılgının aksine çölleşme, Büyük Sahra Çölü'ndeki sarı kum tepelerinin mekanik olarak çevreye doğru genişlemesi demek değildir. Çölleşme; eskiden üzerinde tarım yapılan, hayvan otlatılan ve orman örtüsü barındıran bereketli toprakların; aşırı otlatma, anız yakma, kimyasal gübreleme, yanlış vahşi sulama ve ormansızlaşma yüzünden organik yapısını kaybederek çorak birer biyolojik enkaza dönüşmesidir.\n\nBu facianın gezegenimizdeki en trajik sembolü, bir zamanlar dünyanın en büyük dördüncü kapalı gölü olan Orta Asya'daki Aral Gölü'nün hikayesidir. Sovyetler Birliği döneminde gölü besleyen Seyhun ve Ceyhun nehirlerinin suları devasa pamuk tarlalarını sulamak amacıyla tek taraflı olarak saptırılmış; birkaç on yıl içerisinde koskoca göl %90 oranında kuruyarak yerini 'Aralkum Çölü' adı verilen tuzlu bir kum bataklığına bırakmıştır. Artık o bölgeden yükselen zehirli kimyasal ve tuz tozları binlerce kilometre ötedeki kutup buzullarına kadar taşınmakta, yerel halkta kanser ve solunum yolu hastalıklarını patlatmaktadır. Daha da kötüsü, toprak örtüsü aşındıkça (erozyon), yeryüzünün en büyük karbon yutağı olan üst humus tabakası rüzgarla savrulur. Karbonu tutamayan çıplak toprak atmosfere daha fazla karbondioksit bırakır; bu durum küresel ısınmayı şiddetlendirir, artan sıcaklık ve kuraklık ise çölleşmeyi daha da hızlandırır. Milyonlarca insanı yurtlarından eden 'iklim mültecileri' krizini tetikleyen bu kısırdöngüyü kırmak, toprağın üst katmanını koruyan sürdürülebilir tarım reformlarını acil kılmaktadır.",
    idealAnswer: "Çölleşme; verimli arazilerin insan tahribatıyla biyolojik üretkenliğini kaybetmesi, karbon tutma yeteneğini yitirerek iklim krizini ve kitlesel göçleri tetikleyen küresel bir ekolojik yıkımdır.",
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
      konuDedektifi: "Çölleşmenin gerçek doğası, Aral Gölü trajedisi ve toprağın karbon tutma yetisini kaybetmesinin yarattığı ekolojik kısırdöngü.",
      hizliOzet: "Çölleşme mevcut çöllerin büyümesi değil, verimli toprakların yok edilmesidir; toprağın karbon yutağı özelliğini bozarak küresel ısınmayı besler.",
      yazarinAmaci: "Çölleşmeye dair yanlış inanışları düzeltmek ve yanlış su/tarım politikalarının doğurduğu felaketlerin büyüklüğünü göstermek.",
      soruUretimi: [
        "Çölleşme ile kum tepelerinin ilerlemesi arasındaki fark nedir?",
        "Aral Gölü'nün kuruması hangi yanlış tarım politikasının sonucudur?",
        "Erozyon ile atmosferik karbon birikimi arasındaki ilişki nasıldır?"
      ],
      anaDusunce: "İnsan müdahalesiyle verimli toprakların biyolojik canlılığını yitirmesi anlamına gelen çölleşme, küresel iklim krizini ve kitlesel göçleri besleyen tehlikeli bir ekolojik kısırdöngüdür.",
      cikarimYapma: "Toprak ve su yönetimindeki kısa vadeli ekonomik hırslar, uzun vadede telafisi imkansız biyolojik çöküşlere ve insani krizlere yol açar.",
      yardimciDusunceler: [
        "UNEP çölleşmeyi biyolojik üretim kaybı sayar.",
        "Aşırı otlatma ve vahşi sulama toprağı öldürür.",
        "Aral Gölü pamuk tarlaları yüzünden %90 kurumuştur.",
        "Toprak karbon tutamazsa sera etkisi katlanır."
      ],
      boslukDoldurma: "Çölleşme, verimli toprakların aşırı otlatma ve yanlış sulamayla biyolojik üretim kapasitesini kaybetmesidir.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Tanımlama (UNEP), Somut Örnek (Aral Gölü) ve Neden-Sonuç İlişkisi",
      neuralWarning: "Çölleşmenin sadece sıcak iklimlerin değil, yanlış yönetilen her toprağın başına gelebileceğini unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre çölleşmenin küresel ısınmayı daha da şiddetlendiren bir 'kısırdöngü' yaratmasının **asıl nedeni** nedir?",
      options: [
        { letter: "A", text: "Çölleşen alanlarda rüzgar santrallerinin kurulamaması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Erozyona uğrayan humuslu toprağın karbon tutma kapasitesini kaybederek sera gazlarının atmosferde birikmesine yol açması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Tuz fırtınalarının deniz trafiğini olumsuz etkilemesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Yer altı maden rezervlerinin tükenmesi", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde 'toprak erozyonu arttıkça toprağın karbon tutma yeteneği yok olmakta... atmosfere daha fazla karbondioksit bırakmakta, bu da küresel sera etkisini katlayarak kısırdöngü yaratmaktadır' denilmiştir."
    }
  },
  {
    id: 502,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 2,
    title: "Levha Tektoniği ve Yerkürenin Devingen Jeolojik Dansı",
    category: "Coğrafya",
    duration: 8,
    difficulty: "İleri",
    skills: ["Jeolojik Mekanizma", "Süreç Analizi"],
    text: "Ayaklarımızın altında uzanan yerkabuğunu çoğu zaman sarsılmaz, durağan ve ebedi bir kaya kütlesi olarak algılarız. Oysa 20. yüzyılın başlarında Alfred Wegener'in ortaya attığı 'Kıtaların Kayması' kuramıyla filizlenen ve 1960'larda deniz tabanı yayılması kanıtlarıyla taçlanan Levha Tektoniği teorisi, Dünya'nın dış kabuğunun bir yapbozun parçaları gibi sürekli hareket halinde olan devasa litosferik levhalardan oluştuğunu kanıtlamıştır. Bu levhalar (Avrasya, Pasifik, Afrika, Anadolu vb.), yerin derinliklerindeki akışkan manto tabakasında (astenosfer) gerçekleşen devasa konveksiyonel akımların üzerinde yılda birkaç santimetre hızla (ortalama bir insan tırnağının uzama hızıyla) yüzmektedir.\n\nLevha sınırlarında gerçekleşen jeodinamik etkileşimler gezegenimizin yüzey topoğrafyasını belirler. İki levhanın birbirinden uzaklaştığı Atlantik Ortası Sırtı gibi okyanus tabanlarında magma yüzeye çıkarak yeni okyanusal kabuğu yaratır. İki kıtasal levhanın kafa kafaya çarpıştığı yerlerde ise kabuk bükülüp göğe doğru yükselir; nitekim Hint levhasının Avrasya levhasına bindirmesi, bugün Everest'in de içinde bulunduğu görkemli Himalaya Dağları'nı doğurmuştur ve bu dağlar her yıl birkaç milimetre yükselmeye devam etmektedir. Okyanusal bir levhanın kıtasal bir levhanın altına daldığı yitim zonlarında (örneğin Pasifik 'Ateş Çemberi') ise derin okyanus hendekleri, yıkıcı volkanik püskürmeler ve devasa tsunamiler tetiklenir. Anadolu yarımadası da kuzeydeki devasa Avrasya levhası ile güneyden bastıran Arap levhası arasında sıkışarak her yıl batıya doğru yaklaşık 2-3 santimetre ötelenmekte; bu gerilim Kuzey Anadolu ve Doğu Anadolu Fay Hatları boyunca yıkıcı depremleri kaçınılmaz kılmaktadır. Yerküre, milyarlarca yıllık bu jeolojik devinimle kendini aralıksız yenileyen canlı bir dinamizme sahiptir.",
    idealAnswer: "Levha tektoniği; mantodaki konveksiyon akımlarıyla hareket eden litosfer parçalarının çarpışma, ayrılma ve sürtünmeyle dağları, okyanus sırtlarını, volkanları ve depremleri oluşturduğunu açıklar.",
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
      konuDedektifi: "Levha tektoniğinin mekanizması, mantodaki konveksiyon akımları ve dağ oluşumu ile depremler.",
      hizliOzet: "Yerkabuğu durağan değildir; astenosfer üzerindeki levhaların hareketi Himalayalar'ı, okyanus sırtlarını ve fay hatlarındaki depremleri meydana getirir.",
      yazarinAmaci: "Yerkürenin canlı ve dinamik jeolojik yapısını levha hareketlerinin somut yeryüzü şekilleri üzerindeki etkisiyle açıklamak.",
      soruUretimi: [
        "Himalaya Dağları hangi iki levhanın çarpışmasıyla yükselmiştir?",
        "Mantodaki konveksiyon akımları levhaları nasıl hareket ettirir?",
        "Anadolu levhasının batıya ötelenmesinin sebebi nedir?"
      ],
      anaDusunce: "Dünya'nın litosferik levhaları mantodaki ısı akımlarıyla kesintisiz hareket ederek dağları yükselten, okyanusları açan ve depremleri üreten jeolojik bir mimardır.",
      cikarimYapma: "Depremler gezegenin kusurları değil, canlı ve dinamik bir mantoya sahip olmasının doğal ve kaçınılmaz jeolojik sonuçlarıdır.",
      yardimciDusunceler: [
        "Wegener kıtaların kaymasını öne sürdü.",
        "Levhalar yılda birkaç santimetre hızla hareket eder.",
        "Hint ve Avrasya çarpışması Himalayalar'ı büyütür.",
        "Arap levhası Anadolu'yu batıya iter."
      ],
      boslukDoldurma: "Levhalar, akışkan manto tabakasındaki devasa konveksiyonel akımların üzerinde sürekli hareket eder.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Benzetme (Yapboz parçaları, tırnak uzama hızı), Örneklendirme (Himalayalar, Anadolu) ve Sayısal Veri",
      neuralWarning: "Levhaların sadece kıtaları değil okyanus tabanlarını da kapsadığını aklınızda tutun.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Metne göre Himalaya Dağları'nın oluşumu ve halen yükselmeye devam etmesi hangi levha hareketinin doğrudan bir sonucudur?",
      options: [
        { letter: "A", text: "Atlantik Ortası Sırtı'nın iki yana açılması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Hint levhasının Avrasya kıtasal levhasıyla kafa kafaya çarpışması ve kabuğun yukarı bükülmesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Kutup buzullarının erimesiyle oluşan ağırlık hafiflemesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Arap levhasının Kızıldeniz'e doğru batması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde açıkça 'Hint levhasının Avrasya levhasına bindirmesi, bugün Everest'in de içinde bulunduğu görkemli Himalaya Dağları'nı doğurmuştur' denilmektedir."
    }
  },
  {
    id: 503,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 3,
    title: "Okyanus Akıntıları ve Dünyanın Termal Düzeni (AMOC)",
    category: "Coğrafya",
    duration: 8,
    difficulty: "İleri",
    skills: ["Sistemik Düşünme", "Termodinamik Coğrafya"],
    text: "Gezegenimiz küresel şekli ve eksen eğikliği sebebiyle güneş enerjisini her enleme eşit miktarda alamaz; ekvatoral kuşak yıl boyunca aşırı ısınırken, kutup bölgeleri sürekli bir enerji açığı verir. Dünya'nın yaşanabilir bir sıcaklık dengesinde kalması, fazla ısının kutuplara doğru transfer edildiği devasa bir iklim mekanizmasına bağlıdır. Bu küresel termal pompanın en kritik dişlisi ise 'termohalin dolaşımı' (ısı ve tuzluluk dolaşımı) ve onun Atlantik kolu olan AMOC'tur (Atlantik Meridyenel Devrilme Dolaşımı). Bu akıntı sistemi, okyanusların derinliklerine uzanan devasa bir küresel taşıyıcı bant gibi işler.\n\nMeksika Körfezi'nin tropikal sıcak sularını taşıyan meşhur Gulf Stream akıntısı, kuzeydoğuya yönelerek Kuzeybatı Avrupa kıyılarına (İngiltere, Norveç) ulaşır. Bu sıcak su akıntısı sayesinde aynı enlemdeki Sibirya veya Kanada dondurucu tundralarla kaplıyken, Norveç fiyortları kışın donmaz ve Londra ılıman bir kış geçirir. Kuzeye ulaşan bu su kütlesi soğudukça ve yüzeydeki suyun bir kısmı buharlaşıp geride yoğun tuz bıraktıkça ağırlaşır. Soğuk ve aşırı tuzlu su Grönland açıklarında okyanus tabanına doğru dalarak devasa bir dip şelalesi oluşturur ve güneye doğru geri akar. Ancak küresel ısınma yüzünden Grönland'daki tatlı su buzullarının hızla erimesi, Kuzey Atlantik'in tuzluluk oranını düşürerek suyun yoğunluğunu azaltmaktadır. Yeterince yoğunlaşamayan su dibe dalamadığında, bu küresel taşıyıcı bant yavaşlama tehlikesiyle karşı karşıya kalır. Bilim insanları AMOC'un çökmesi durumunda Avrupa'nın aniden kutup soğuklarına gömüleceği, tropik kuşakta muson döngülerinin felç olacağı ve küresel gıda güvenliğinin çökeceği konusunda uyarmaktadır.",
    idealAnswer: "AMOC ve termohalin dolaşımı; sıcak ve tuzlu suları kutuplara taşıyıp soğuk suları dibe batırarak Dünya'nın iklim dengesini kuran, buzulların erimesiyle çökme riski taşıyan okyanusal taşıyıcı banttır.",
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
      konuDedektifi: "AMOC akıntı döngüsü, termohalin dolaşımı ve Grönland tatlı su erimelerinin küresel iklime tehdidi.",
      hizliOzet: "Okyanuslardaki sıcak-tuzlu su taşıyıcı bandı ekvator ısısını kutuplara taşır; Grönland tatlı suları tuzluluğu azaltırsa bu sistem durup Avrupa'yı dondurabilir.",
      yazarinAmaci: "Okyanus akıntılarının sadece yerel deniz hareketleri değil gezegenin iklim termostatı olduğunu açıklamak.",
      soruUretimi: [
        "Gulf Stream Kuzeybatı Avrupa iklimini nasıl ılımanlaştırır?",
        "Kuzey Atlantik'te suyun dibe batmasını sağlayan iki temel fiziksel etken nedir?",
        "Grönland buzullarının erimesi AMOC'u neden yavaşlatır?"
      ],
      anaDusunce: "Okyanuslardaki termohalin akıntı sistemleri gezegenin termal dengesini sağlar; tatlı su erimeleri yüzünden bu sistemin sekteye uğraması küresel iklim felaketlerine yol açabilir.",
      cikarimYapma: "Bir bölgedeki buzul erimesi, okyanus akıntıları vasıtasıyla binlerce kilometre uzaktaki kıtaların iklimini anında değiştirebilir.",
      yardimciDusunceler: [
        "Ekvator ile kutuplar arasındaki ısı dengesizliği akıntılarla çözülür.",
        "Gulf Stream Norveç ve İngiltere'yi ılıman kılar.",
        "Soğuk ve tuzlu su dibe batarak taşıyıcı bandı yürütür.",
        "Grönland tatlı suyu tuz oranını seyreltmektedir."
      ],
      boslukDoldurma: "Bu sistem, okyanusların derinliklerine uzanan devasa bir küresel taşıyıcı bant gibi işler.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Benzetme (Küresel taşıyıcı bant, termal pompa) ve Karşılaştırma (Norveç vs Sibirya)",
      neuralWarning: "Termohalin akıntısının sadece rüzgarla değil, suyun yoğunluk ve tuzluluk farkıyla çalıştığını fark edin.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre Grönland'daki buzulların erimesinin AMOC akıntı sistemini yavaşlatmasındaki **temel fiziksel mekanizma** nedir?",
      options: [
        { letter: "A", text: "Deniz suyunun buharlaşma hızını artırması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Kuzey Atlantik'e karışan devasa tatlı suyun deniz suyunun tuzluluğunu ve yoğunluğunu düşürerek dibe batmasını engellemesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Okyanus tabanındaki volkanik çatlakları doldurması", isCorrect: false, type: "detay" },
        { letter: "D", text: "Meksika Körfezi'ndeki kasırgaları tamamen durdurması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde Grönland tatlı suyunun tuz oranını düşürdüğü, yeterince yoğunlaşamayan suyun okyanus dibine batamayarak küresel taşıyıcı bandı yavaşlattığı net bir şekilde anlatılmıştır."
    }
  },
  {
    id: 504,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 4,
    title: "Antroposen Çağı: İnsanoğlunun Jeolojik Bir Güce Dönüşmesi",
    category: "Coğrafya",
    duration: 8,
    difficulty: "İleri",
    skills: ["Jeo-Zaman Analizi", "Gezegensel Sorumluluk"],
    text: "Dünya'nın 4,5 milyar yıllık jeolojik tarihi boyunca çağlar; dev meteor çarpmaları, kitlesel süpervolkan patlamaları veya kıtaların tektonik kaymaları gibi doğanın kudretli fiziksel güçleriyle tanımlanıp sınırlandırılmıştır. Yaklaşık 11.700 yıl önce son buzul çağının sona ermesiyle başlayan ve insanlığın yerleşik tarıma geçtiği kararlı iklim evresine jeolojide 'Holosen' adı verilir. Ancak Nobel ödüllü kimyager Paul Crutzen ve jeolog Eugene Stoermer'in milenyum başında ortaya attığı 'Antroposen' (İnsan Çağı) kavramı, artık gezegenin kaderinde en belirleyici jeolojik aktörün doğrudan insan türü (Homo sapiens) olduğunu ilan etmektedir.\n\nİnsan faaliyetleri bugün rüzgar, nehir ve buzul erozyonlarının toplamından daha fazla toprağı ve kayayı yerinden oynatmakta; madencilik, barajlar ve tünellerle yerkabuğunu yeniden oymaktadır. 1950'lerden itibaren başlayan ve 'Büyük İvmelenme' (Great Acceleration) olarak adlandırılan dönem; fosil yakıt kullanımının patlaması, nükleer denemeler sonucu stratosfere yayılan yapay radyoaktif izotoplar (Plütonyum-239), atmosferik karbondioksit birikimi ve sentetik plastiklerin okyanus çökerliklerine kadar karışmasıyla yerkürenin jeolojik katmanlarında silinmez izler bırakmıştır. Bugün okyanus tabanlarında 'plastiglomerat' adı verilen, erimiş plastik ile doğal kayaçların kaynaşmasından oluşan yeni hibrit jeolojik taş türleri bulunmaktadır. Dahası insan türü, doğadaki canlı türlerinin normal arka plan tükenme hızının yüzlerce kat üstünde bir yok oluşa (Altıncı Kitlesel Yok Oluş) sebep olmaktadır. Antroposen, insanın doğanın efendisi olduğu yönündeki kibrine karşı; kendi yarattığı jeolojik ayak izinin altında ezilme tehlikesiyle karşı karşıya olduğunu hatırlatan ağır bir varoluşsal aynadır.",
    idealAnswer: "Antroposen; insanın fosil yakıtlar, plastikler, nükleer kalıntılar ve topoğrafik müdahalelerle yeryüzünün jeolojik katmanlarını kalıcı olarak değiştirdiği yeni insan çağıdır.",
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
      konuDedektifi: "Antroposen (İnsan Çağı) kavramı, insanın jeolojik katmanlar üzerindeki kalıcı izleri ve Büyük İvmelenme.",
      hizliOzet: "İnsan türü radyoaktif kalıntılar, plastikler ve topoğrafik müdahalelerle Dünya'nın jeolojik dengesini değiştiren ana jeolojik aktöre dönüşmüştür.",
      yazarinAmaci: "İnsanın çevreye etkisinin yerel kirliliklerin ötesine geçip yerkürenin jeolojik katmanlarına kazınan kalıcı bir çağa dönüştüğünü vurgulamak.",
      soruUretimi: [
        "Holosen ile Antroposen arasındaki ayrım neye dayanır?",
        "'Plastiglomerat' kavramı neyi sembolize eder?",
        "Büyük İvmelenme dönemi hangi tarihten itibaren başlamıştır?"
      ],
      anaDusunce: "İnsan türünün sanayi, nükleer ve plastik atıkları Dünya'nın litosferik katmanlarına kazınarak insanı gezegen ölçeğinde yeni bir jeolojik güç haline getirmiştir.",
      cikarimYapma: "Gezegene verilen zararlar artık yalnızca biyolojik bir kayıp değil, milyonlarca yıl kalacak jeolojik fosil izleridir.",
      yardimciDusunceler: [
        "Eski çağlar meteor ve volkanlarla ayrılıyordu.",
        "Paul Crutzen Antroposen kavramını önerdi.",
        "1950 Büyük İvmelenmesi nükleer ve plastik izleri başlattı.",
        "İnsan erozyonu doğal erozyonlardan daha fazla toprak taşır."
      ],
      boslukDoldurma: "Antroposen, artık gezegenin kaderinde en belirleyici jeolojik aktörün doğrudan insan türü olduğunu ilan eder.",
      anlatimBicimi: "Tartışmacı ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Tanımlama, Sayısal Veri (11.700 yıl, 1950) ve Yeni Terim Kullanımı (Plastiglomerat)",
      neuralWarning: "Antroposen'in basit bir çevre kirliliği başlığı değil, resmi jeolojik zaman skalası tartışması olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Bilim insanlarının Dünya'nın 'Antroposen' adlı yeni bir jeolojik çağa girdiğini savunmalarındaki **en temel gerekçe** nedir?",
      options: [
        { letter: "A", text: "Güneş patlamalarının periyodik olarak azalması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "İnsan faaliyetlerinin (radyoaktif serpintiler, plastik çöller, fosil yakıtlar) yerkürenin jeolojik katmanlarında kalıcı ve silinmez izler bırakması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Ay'a ve Mars'a uzay araçlarının gönderilmesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Tüm volkanik dağların tamamen sönmesi", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde insanın radyoaktif izotoplar, plastik taşlar (plastiglomerat) ve toprak hareketleriyle jeolojik katmanlara imzasını atarak gezegensel bir jeolojik güce dönüştüğü vurgulanmıştır."
    }
  }
];
