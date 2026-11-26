import { MakaleItem } from './makaleTypes';

export const TARIH_ARTICLES: MakaleItem[] = [
  {
    id: 201,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 1,
    title: "Sanayi Devrimi ve Modern Toplumun Doğuşu",
    category: "Tarih",
    duration: 8,
    difficulty: "Orta",
    skills: ["Neden-Sonuç İlişkisi", "Tarihsel Analiz"],
    text: "18. yüzyılın son çeyreğinde İngiltere'nin kömür ve demir havzalarında, James Watt'ın buhar makinesini sanayiye uyarlamasıyla başlayan Sanayi Devrimi; insanlık tarihini tarım toplumundan sanayi medeniyetine taşıyan en sarsıcı dönüm noktasıdır. Binlerce yıldır insan ve hayvan kas gücüne, rüzgar değirmenlerine ve su çarklarına bağımlı olan üretim pratikleri, buharın mekanik enerjiye dönüştürülmesiyle katlanarak hızlandı. Dokuma tezgahlarının makineleşmesi pamuklu tekstil üretimini küresel ölçekte patlatırken, buharlı lokomotiflerin ve demir yolu ağlarının inşası uzak mesafeleri birkaç güne indirerek entegre bir ulusal ve uluslararası pazar meydana getirdi.\n\nFakat bu devasa iktisadi ivme, geleneksel toplumsal dengeleri kökünden sarstı. Tarlaların çitlenmesi (Enclosure Acts) sonucu topraksız kalan milyonlarca köylü, bacalarından kara dumanlar tüten Manchester, Birmingham gibi yeni fabrika kentlerine akın etti. Hızlı ve plansız kentleşme; kanalizasyonsuz sokakları, salgın kolera dalgalarını ve havasız bodrum katlarında yaşayan kalabalık işçi ailelerini doğurdu. Günlük 14-16 saati bulan ağır çalışma koşulları, hiçbir iş güvenliğinin bulunmaması ve özellikle ince parmakları nedeniyle makine aralarına sokulan çocuk işçilerin sömürülmesi derin bir insani drama yol açtı. Fabrika ve sermaye sahibi burjuvazi ile sadece emek gücünü satabilen proletarya (işçi sınıfı) arasındaki kutuplaşma, modern sendikacılığın, grev hakkının ve sosyalist felsefenin zeminini hazırladı. Sanayi Devrimi böylelikle yalnızca makinelerin zaferi değil; modern hukuku, çalışma saatlerini, temel insan haklarını ve çağdaş sosyal devleti doğuran sancılı bir tarihsel mücadeledir.",
    idealAnswer: "Sanayi Devrimi, kas gücünden buhar makinelerine geçerek üretimi ve ticareti katlamış; aynı zamanda işçi sınıfının doğuşu ve kentleşmeyle modern sosyal hak mücadelelerini başlatmıştır.",
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
      konuDedektifi: "Sanayi Devrimi'nin teknolojik temelleri, kentleşme dalgası ve ortaya çıkan yeni sınıfsal mücadeleler.",
      hizliOzet: "Buhar gücüyle hızlanan sanayi, üretimi katlayıp modern kentleri oluştururken ağır çalışma koşulları sendikal hakları ve sosyal devleti doğurmuştur.",
      yazarinAmaci: "Sanayi Devrimi'nin yalnızca ekonomik bir büyüme değil, çağdaş çalışma hayatını ve toplumsal sınıfları şekillendiren tarihsel bir süreç olduğunu aktarmak.",
      soruUretimi: [
        "James Watt'ın buhar makinesi üretimi nasıl dönüştürmüştür?",
        "Tarlaların çitlenmesi göçleri nasıl tetiklemiştir?",
        "Burjuvazi ve proletarya kutuplaşması hangi hakların kazanılmasını sağlamıştır?"
      ],
      anaDusunce: "Sanayi Devrimi, üretimi mekanize ederek dünyayı küreselleştirirken doğurduğu ağır insani bedeller sayesinde modern işçi haklarını ve sosyal devlet anlayışını inşa etmiştir.",
      cikarimYapma: "Toplumsal ilerlemeler sadece teknik icatlarla değil, o icatların yarattığı adaletsizliklere karşı verilen hak mücadeleleriyle dengelenir.",
      yardimciDusunceler: [
        "Kas gücünün yerini buhar almıştır.",
        "Demiryolları küresel ticareti birbirine bağlamıştır.",
        "Plansız kentleşme çocuk işçiliğini ve salgınları getirmiştir.",
        "Burjuvazi ve işçi sınıfı zıtlığı sendikacılığı doğurmuştur."
      ],
      boslukDoldurma: "Sanayi Devrimi yalnızca makinelerin zaferi değil; çalışma saatlerini ve sosyal devleti doğuran sancılı bir mücadeledir.",
      anlatimBicimi: "Açıklayıcı ve Tarihsel Anlatım",
      dusunceyiGelistirme: "Neden-Sonuç, Karşılaştırma ve Örneklendirme",
      neuralWarning: "Metnin sanayileşmenin teknik başarısı kadar sosyal ve sınıfsal maliyetlerine odaklandığını unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Metne göre Sanayi Devrimi'nin sosyal alandaki en belirgin sonucu aşağıdakilerden hangisidir?",
      options: [
        { letter: "A", text: "Tarımsal üretimin tamamen durması ve köylerin yok olması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Yeni sosyal sınıfların (burjuvazi ve işçi sınıfı) ortaya çıkması ve sendikalaşmanın, işçi haklarının temellerinin atılması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Deniz ticaretinin kara ticaretine oranla önemini yitirmesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Uluslararası sınırların tamamen ortadan kalkması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde işçi sınıfının doğuşu ve bu durumun modern sendikacılığın, grev hakkının ve sosyal devletin temelini attığı açıkça belirtilmiştir."
    }
  },
  {
    id: 202,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 2,
    title: "İpek Yolu: Medeniyetlerin Kültürel ve İktisadi Damarı",
    category: "Tarih",
    duration: 8,
    difficulty: "Orta",
    skills: ["Tarihsel Coğrafya", "Kültürel Etkileşim"],
    text: "Tarih boyunca İpek Yolu, Doğu Asya'nın yemyeşil vadilerinden başlayıp Orta Asya bozkırlarını, İran yaylalarını ve Anadolu'yu aşarak Akdeniz limanlarına uzanan yalnızca ticari bir kervan güzergahı olmanın çok ötesindeydi. Çin'in gizli bir devlet sırrı gibi sakladığı ipeğin, porselenin, baharatın ve yeşim taşının Batı aristokrasisine ulaştırılması şüphesiz devasa bir kazanç kapısıydı. Ancak bu çetin yolları katleden kervanlar, yük denklerinde sadece kumaş ve baharat değil; inançları, bilimsel metinleri, felsefi doktrinleri ve dilsel zenginlikleri de taşıyarak kıtalararası bir kültürel alışveriş damarı kurdular.\n\nİpek Yolu'nun en kalıcı mirası, Doğu'nun kurucu buluşlarının Batı dünyasına aktarılması olmuştur. Kağıt yapım tekniğinin Semerkant üzerinden İslam dünyasına, oradan da Endülüs yoluyla Avrupa'ya geçişi; bilginin ucuzlayıp demokratikleşmesini sağlamış, matbaa ve pusula ile birlikte Avrupa'da Coğrafi Keşifler, Rönesans ve Reform hareketlerinin altyapısını hazırlamıştır. Benzer biçimde Budizm'in Hindistan'dan Çin ve Japonya'ya yayılması, İslamiyet'in Türk boyları arasında kabul görmesi bu hat üzerinden gerçekleşti. Yol boyunca yaklaşık bir günlük yürüyüş mesafelerinde (30-40 km) inşa edilen Selçuklu kervansarayları; sadece tüccarların ve binek hayvanlarının güvenliğini sağlayan birer kale değil, farklı din ve ırktan gezginlerin aynı sofrada haritalar, felsefeler ve tıp bilgileri paylaştığı entelektüel buluşma merkezleriydi. Bu yönüyle İpek Yolu, ekonomik çıkarların düşman kültürleri dahi barışçıl ve hoşgörülü bir iş birliğinde buluşturabileceğinin tarihteki en görkemli örneğidir.",
    idealAnswer: "İpek Yolu, ipek ve baharatın ötesinde kağıt, pusula, dinler ve felsefi fikirleri kıtalar arasında taşıyarak modern medeniyetlerin doğuşunu sağlayan küresel bir kültür köprüsüdür.",
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
      konuDedektifi: "İpek Yolu'nun ticari işlevinin ötesindeki kültürel, bilimsel ve dinlerarası taşıyıcı rolü.",
      hizliOzet: "İpek Yolu ticari malların yanı sıra kağıt, pusula ve inançları taşıyarak Rönesans'tan Coğrafi Keşifler'e kadar dünya tarihini kökten değiştirmiştir.",
      yazarinAmaci: "İpek Yolu'nu salt bir kervan güzergahı olarak değil, Doğu ve Batı medeniyetlerini birbirine bağlayan düşünsel bir omurga olarak tanıtmak.",
      soruUretimi: [
        "Kağıdın Doğu'dan Batı'ya taşınması Avrupa'da neyi tetiklemiştir?",
        "Kervansarayların kervan güvenliği dışındaki entelektüel rolü nedir?",
        "İpek Yolu dinlerin yayılışını nasıl etkilemiştir?"
      ],
      anaDusunce: "İpek Yolu, ekonomik bir ticaret kanalı olmanın ötesinde insanlık hafızasını, teknolojisini ve felsefesini küreselleştiren evrensel bir medeniyet damarıdır.",
      cikarimYapma: "Ticari bağımlılık ve ortak ekonomik çıkarlar, kültürel önyargıları yıkarak hoşgörüyü ve bilgi paylaşımını zorunlu kılar.",
      yardimciDusunceler: [
        "İpek ve baharat ticaretin ana mallarıydı.",
        "Kağıt ve pusulanın yayılması Rönesans'ı hazırladı.",
        "Budizm ve İslamiyet bu güzergahla yayıldı.",
        "Kervansaraylar kültürel buluşma merkezleriydi."
      ],
      boslukDoldurma: "İpek Yolu, ekonomik çıkarların düşman kültürleri dahi barışçıl bir iş birliğinde buluşturabileceğinin kanıtıdır.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Örneklendirme (Kağıt, pusula, dinler) ve Tanımlama",
      neuralWarning: "İpek Yolu'nun tek bir çizgiden ibaret olmadığını, çok kollu bir ağ olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre kağıt ve pusula gibi Doğu kökenli icatların Batı'ya ulaşmasının Avrupa tarihindeki en kritik etkisi nedir?",
      options: [
        { letter: "A", text: "Roma İmparatorluğu'nun kuruluşunu hızlandırması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Rönesans, Reform ve Coğrafi Keşifler gibi büyük aydınlanma hareketlerinin koşullarını hazırlaması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Akdeniz ticaretini tamamen sonlandırıp limanları işlevsizleştirmesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Kervansarayların kapatılmasına yol açması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde açıkça kağıdın yayılmasıyla bilginin ucuzladığı, matbaa ve pusula ile birlikte Rönesans, Reform ve Coğrafi Keşifler'in koşullarının hazırlandığı ifade edilmektedir."
    }
  },
  {
    id: 203,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 3,
    title: "Rönesans ve Hümanizma: İnsan Odaklı Evrene Geçiş",
    category: "Tarih",
    duration: 7,
    difficulty: "İleri",
    skills: ["Kavramsal Analiz", "Düşünce Tarihi"],
    text: "14. yüzyılın sonlarında İtalya'nın bağımsız kent devletlerinde (Floransa, Venedik, Cenova) filizlenen Rönesans (Yeniden Doğuş) hareketi; yalnızca resim ve heykelde yeni tekniklerin uygulanması değil, insanın varoluşsal konumunu kökten değiştiren epistemolojik bir devrimdir. Orta Çağ Avrupa'sına egemen olan skolastik düşünce, yeryüzünü sadece cennete veya cehenneme giden geçici bir sınav sahnesi olarak görüyor; insanın dünyevi merakını, bedensel güzelliğini ve bağımsız aklını günahkar sayıyordu. Kilisenin mutlak dogmaları, evrenin merkezine dünyayı ve kilise hiyerarşisini yerleştirirken özgür araştırmayı sınırlandırıyordu.\n\nFrancesco Petrarca ve Desiderius Erasmus gibi öncülerle yükselen Hümanizma akımı, bu dogmatik çemberi Antik Yunan ve Roma'nın unutulmuş el yazmalarını yeniden kütüphanelere taşıyarak kırdı. Hümanizm sanılanın aksine dine karşı topyekun bir savaş değil; insanı, Tanrı'nın yarattığı en yüce ve akıl sahibi varlık olarak kabul edip onun dünyadaki potansiyelini öne çıkarma çabasıydı. Sanatçılar kadavralar üzerinde gizlice diseksiyonlar yaparak insan anatomisini keşfetti; perspektif tekniğiyle resme derinlik katarak dünyaya bakan 'insan gözünün' merkeziliğini ilan etti. Leonardo da Vinci'nin 'Vitruvius Adamı' çizimi, evrenin ve mimarinin ölçüsü olarak insan bedenini konumlandırırken; gözlem ve deneye dayalı ampirik yöntem, Francis Bacon ve Galileo Galilei ile birlikte modern bilimsel metodolojinin temellerini attı. Rönesans böylece, insan aklının dogma karşısındaki egemenlik bildirgesidir.",
    idealAnswer: "Rönesans ve Hümanizma, Orta Çağ'ın baskıcı skolastik anlayışını kırarak insan aklını, anatomi ve gözlemi merkeze alan modern bir zihniyet inşa etmiştir.",
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
      konuDedektifi: "Rönesans ve Hümanizma hareketinin felsefi kökleri, insanı merkeze alması ve modern bilimin doğuşu.",
      hizliOzet: "Orta Çağ'ın dogmatik dünya görüşü yerine Antik mirası canlandıran Rönesans, insan aklını ve gözlemi yücelterek aydınlanmanın kapısını açmıştır.",
      yazarinAmaci: "Rönesans'ın estetik bir üsluptan öte insanın düşünme ve sorgulama biçimini özgürleştiren bir devrim olduğunu vurgulamak.",
      soruUretimi: [
        "Skolastik felsefenin insan aklına bakışı nasıldı?",
        "Hümanizma ile din arasındaki ilişki metne göre nasıl tanımlanır?",
        "Vitruvius Adamı neyin sembolüdür?"
      ],
      anaDusunce: "Rönesans, dogmatik Orta Çağ kabullerine karşı insan iradesini, aklı ve gözlemi yücelterek modern dünyanın temellerini atmıştır.",
      cikarimYapma: "Sanatın ve felsefenin insanı merkeze alması, bilimin ve düşüncenin dogmalardan bağımsızlaşmasını sağlar.",
      yardimciDusunceler: [
        "İtalyan şehir devletlerinde başlamıştır.",
        "Orta Çağ dünyayı sadece geçici bir sınav yeri görüyordu.",
        "Petrarca ve Erasmus hümanizmanın öncüleridir.",
        "Anatomi ve perspektif insan bakışını merkeze aldı."
      ],
      boslukDoldurma: "Rönesans, insan aklının dogma karşısındaki egemenlik bildirgesidir.",
      anlatimBicimi: "Açıklayıcı ve Karşılaştırmalı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Skolastik vs Rönesans) ve Örneklendirme (Da Vinci, Galileo)",
      neuralWarning: "Hümanizmanın dinsizlik demek olmadığını, odağı insana ve akla çevirmek olduğunu fark edin.",
      cognitiveTime: "7 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre Hümanizma akımının skolastik düşünceden ayrıldığı en temel nokta nedir?",
      options: [
        { letter: "A", text: "Sanatsal faaliyetleri tamamen ekonomik kazanca dayandırması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Dünyayı sadece bir sınav yeri saymak yerine insan aklını ve yaratıcılığını merkeze alması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Antik Yunan ve Roma kültürlerini bütünüyle reddetmesi", isCorrect: false, type: "celdirici" },
        { letter: "D", text: "Tüm bilimsel çalışmaları dini otoritelere onaylatması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde skolastik anlayışın dünyayı geçiş yeri görüp insanı ikincilleştirmesine karşılık, Hümanizmanın insan aklını ve yaratıcılığını merkeze aldığı belirtilmiştir."
    }
  },
  {
    id: 204,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 4,
    title: "Tarım Devrimi (Neolitik Çağ) ve Yerleşik Yaşamın Bedelleri",
    category: "Tarih",
    duration: 8,
    difficulty: "İleri",
    skills: ["Eleştirel Tarih", "Antropolojik Bakış"],
    text: "Günümüzden yaklaşık 12 bin yıl önce Bereketli Hilal'de (Güneydoğu Anadolu, Mezopotamya ve Levant) başlayan Neolitik Devrim, avcı-toplayıcı göçebe toplulukların buğday, arpa gibi yabani tahılları ıslah edip yerleşik köyler kurmasıyla insanlık macerasını geri dönülemez bir yola soktu. Geleneksel tarih yazımı bu süreci uzun süre insanın doğaya üstün geldiği ve mutlak bir refah çağına adım attığı büyük bir zafer gibi sundu. Ancak Jared Diamond ve Yuval Noah Harari gibi çağdaş antropolog ve tarihçilerin detaylı bulguları, tarıma geçişin insan türüne ödetiği ağır biyolojik ve sosyolojik bedelleri gün ışığına çıkarmıştır.\n\nAvcı-toplayıcı atalarımız yüzlerce çeşit meyve, kök, yemiş ve av etiyle son derece zengin, dengeli ve mevsimlik bir beslenme rejimine sahipti; üstelik günde ortalama 3-5 saat harcayarak karınlarını doyurabiliyor, geri kalan zamanı sosyal bağlara ve dinlenmeye ayırabiliyorlardı. Oysa yerleşik çiftçiler gün doğumundan gün batımına kadar tarlada belleri bükülerek çalışmak zorunda kaldılar; tek tip karbonhidrata (buğday veya pirinç) dayalı beslenme yüzünden boyları kısaldı, diş çürükleri ve kemik deformasyonları arttı. Hayvanların evcilleştirilip insanlarla dip dibe yaşaması çiçek, kızamık, grip ve veba gibi zoonotik salgın hastalıkları doğurdu. Daha da önemlisi, hasat edilen artı ürünün depolanması zorunluluğu 'özel mülkiyet' kavramını ortaya çıkardı. Ambarları koruma ihtiyacı etrafı surlarla çevrili köyleri, toprak kavgalarını, organize orduları ve savaşları tetikledi. Toplumsal eşitlik yerini efendi-köle, yöneten-yönetilen hiyerarşisine bıraktı. Tarım Devrimi nüfus patlaması yaratarak medeniyetlerin doğmasını sağladıysa da bu başarı bireysel mutluluğun ve sağlığın pahasına elde edilmiş trajik bir uzlaşmaydı.",
    idealAnswer: "Tarım Devrimi nüfus artışını ve uygarlıkların doğuşunu sağlarken, tek tip beslenme, salgın hastalıklar, özel mülkiyet ve sınıfsal eşitsizlik gibi ağır bedeller üretmiştir.",
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
      konuDedektifi: "Tarım Devrimi'nin kazanımları ile insanın biyolojik sağlığı ve toplumsal yapısı üzerindeki olumsuz maliyetleri.",
      hizliOzet: "Tarım nüfusu ve medeniyetleri büyütmüş ancak tek tip beslenme, bulaşıcı hastalıklar, özel mülkiyet savaşları ve sosyal hiyerarşiyi doğurmuştur.",
      yazarinAmaci: "Tarım Devrimi'ne dair romantik ve tek taraflı ilerleme anlatısını eleştirerek olayın insan bedeni ve toplumu üzerindeki çelişkilerini göstermek.",
      soruUretimi: [
        "Avcı-toplayıcı beslenme ile çiftçi beslenmesi arasındaki farklar nelerdir?",
        "Zoonotik hastalıklar yerleşik yaşamda nasıl yayılmıştır?",
        "Özel mülkiyet ve ambarlar toplumsal yapıyı nasıl değiştirmiştir?"
      ],
      anaDusunce: "Yerleşik tarım düzeni insanlığın demografik gücünü artırıp medeniyetleri filizlendirmiş olsa da bireysel sağlık, özgürlük ve eşitlikten feragat edilmesine yol açmıştır.",
      cikarimYapma: "Tarihsel ilerleme her zaman bireysel yaşam kalitesinin artması anlamına gelmez; bazen türün çoğalması bireyin konforu aleyhine işler.",
      yardimciDusunceler: [
        "Bereketli Hilal tarımın başladığı bölgedir.",
        "Avcı-toplayıcılar daha az çalışıp daha çeşitli besleniyordu.",
        "Hayvanlarla bir arada yaşamak salgınları başlattı.",
        "Artı ürünün ambarlanması surları ve orduları doğurdu."
      ],
      boslukDoldurma: "Tarım Devrimi medeniyetleri doğurduysa da bu başarı bireysel mutluluğun pahasına elde edilmiş bir uzlaşmaydı.",
      anlatimBicimi: "Tartışmacı ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Avcı-toplayıcı vs Çiftçi) ve Tanıklık (Diamond, Harari)",
      neuralWarning: "Metnin tarımı tamamen reddetmediğini, tek taraflı zafer anlatısını sorguladığını ayırt edin.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre Neolitik Dönem'de organize savaşların ve sosyal hiyerarşinin ortaya çıkmasındaki **asıl etken** nedir?",
      options: [
        { letter: "A", text: "Yırtıcı hayvan saldırılarının artması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Üretilen tahıl fazlasının depolanması ve bu artı mülkiyetin korunması ihtiyacı", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "İklimin aniden soğuması sonucu su kaynaklarının kuruması", isCorrect: false, type: "detay" },
        { letter: "D", text: "Antik tapınakların inşasında çalışacak köle ihtiyacı", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde 'hasat edilen artı ürünün depolanması zorunluluğu özel mülkiyeti ortaya çıkardı... ambarları koruma ihtiyacı etrafı surlarla çevrili köyleri, toprak kavgalarını, organize orduları ve savaşları tetikledi' denilmiştir."
    }
  }
];
