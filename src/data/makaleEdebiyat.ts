import { MakaleItem } from './makaleTypes';

export const EDEBIYAT_ARTICLES: MakaleItem[] = [
  {
    id: 601,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 1,
    title: "Distopya: Uyarıcı Metinler ve Gelecek Kaygısının Anatomisi",
    category: "Edebiyat",
    duration: 8,
    difficulty: "İleri",
    skills: ["Edebi Eleştiri", "Sosyolojik Tahlil"],
    text: "Distopik edebiyat türü, popüler kültürde sıkça sanıldığı gibi mistik bir geleceği önceden haber veren kristal bir kehanet küresi değildir. Aksine distopya; yazarının bizzat içinde yaşadığı dönemin politik, teknolojik ve ahlaki kırılma noktalarını alıp bunları aşırı uçlarına kadar büyüterek 'Eğer bu gidişatı durdurmazsanız varacağınız uçurum burasıdır' diyen sarsıcı bir acil durum sirenidir. Edebi türün iki büyük kutup yıldızı olan George Orwell ile Aldous Huxley, totaliter tahakkümün insan ruhunu ve toplumunu iki zıt yoldan nasıl tutsak alabileceğini dâhice ortaya koymuşlardır.\n\nOrwell'ın 1948 yılında kaleme aldığı '1984' başyapıtı, açık bir fiziksel şiddet ve gözetim mimarisi üzerine kuruludur. 'Büyük Birader'in tele-ekranlarla her odayı ve her saniyeyi izlediği Okyanusya rejiminde; düşünceyi sınırlandırmak için dil sistematik olarak budanır ('Yenisöylem'). Kelimeler azaldıkça muhalif kavramlar telaffuz edilemez hale gelir, geçmiş arşivler her gün partinin yeni politikalarına göre yakılıp yeniden yazılır ve insan korkuyla, acıyla, işkenceyle boyun eğer. Buna taban tabana zıt bir yöntem kurgulayan Aldous Huxley ise 'Cesur Yeni Dünya'da korkuya hiç ihtiyaç duymaz. Huxley'nin dünyasında insanlar laboratuvar tüplerinde sınıflara ayrılarak üretilir, 'soma' adlı uyuşturucu haplarla acı ve yas hissi silinir, sınırsız cinsellik ve çılgınca tüketimle zihinler sürekli meşgul edilir. Orwell kitapların yasaklandığı bir dünyadan korkarken, Huxley insanların kitap okumak istemeyecek kadar sığ eğlencelerle uyuşturulduğu bir geleceğe dikkat çeker. Günümüzde algoritmik yankı odaları, beğeni butonlarına bağımlılık ve veri gözetimi çağında her iki distopya da edebiyatın en keskin sosyolojik savunma kalkanı olmayı sürdürmektedir.",
    idealAnswer: "Distopya, baskı veya sahte haz mekanizmalarıyla bireyin özgürlüğünü elinden alan sistemleri hicvederek bugünün insanını uyaran eleştirel bir türdür.",
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
      konuDedektifi: "Distopik edebiyatın mahiyeti, Orwell'ın korku temelli baskısı ile Huxley'nin haz temelli uyuşturması arasındaki karşılaştırma.",
      hizliOzet: "Distopyalar kehanet değil ikazdır; 1984 korku ve dille köleleştirirken Cesur Yeni Dünya insanı haz ve tüketimle teslim alır.",
      yazarinAmaci: "Distopya türünün toplumsal farkındalık ve eleştirel bilinç aşılayan felsefi derinliğini ortaya koymak.",
      soruUretimi: [
        "Distopya yazarlarının asıl amacı nedir?",
        "Orwell'ın 'Yenisöylem'i düşünceyi nasıl ortadan kaldırır?",
        "Huxley ile Orwell'ın insan kontrolüne yaklaşımları nasıl çatışır?"
      ],
      anaDusunce: "Distopik edebiyat, bireysel özgürlükleri yok eden otoriter korku düzenlerine ve uyuşturucu tüketim kültürüne karşı insanlığı uyaran felsefi bir aynadır.",
      cikarimYapma: "Bir toplum düşünme araçları olan dili ve kitapları terk ettiğinde, dışarıdan bir diktatör olmasa bile kendi rızasıyla köleleşebilir.",
      yardimciDusunceler: [
        "Distopya yazıldığı dönemin tehlikelerini abartarak gösterir.",
        "1984 korku, gözetim ve dilin budanmasıyla yönetir.",
        "Cesur Yeni Dünya sınırsız haz ve tüketimle uyuşturur.",
        "Her iki eser de günümüz dijital dünyasını aydınlatır."
      ],
      boslukDoldurma: "Orwell kitapların yasaklandığı bir dünyadan, Huxley ise insanların kitap okumak istemeyeceği bir gelecekten korkmuştur.",
      anlatimBicimi: "Tartışmacı ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Orwell vs Huxley), Örneklendirme ve Tanımlama",
      neuralWarning: "Distopyanın geleceğe dair bir tahmin değil bugünün hastalıklarına yazılmış bir reçete olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Parçaya göre Aldous Huxley'nin 'Cesur Yeni Dünya'da kurguladığı kontrol mekanizmasının George Orwell'ın '1984'ünden **en belirgin farkı** nedir?",
      options: [
        { letter: "A", text: "İnsanları polis şiddeti ve korkuyla değil, kesintisiz haz ve tüketimle uyuşturup teslim alması", isCorrect: true, type: "ana_dusunce" },
        { letter: "B", text: "Teknolojiyi ve fabrikaları tamamen yasaklayıp orta çağ düzenine dönmesi", isCorrect: false, type: "celdirici" },
        { letter: "C", text: "Tüm kitapların okunmasını zorunlu kılan bir eğitim sistemi kurması", isCorrect: false, type: "detay" },
        { letter: "D", text: "Yalnızca uzay kolonilerinde geçen bir hikaye olması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde açıkça Orwell'ın korku ve baskıyı, Huxley'nin ise kesintisiz haz, tüketim çılgınlığı ve genetik programlamayı öne çıkardığı belirtilmiştir."
    }
  },
  {
    id: 602,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 2,
    title: "Modern Roman ve Bilinç Akışı: İnsan Zihninin Filtresiz Aynası",
    category: "Edebiyat",
    duration: 8,
    difficulty: "İleri",
    skills: ["Anlatım Teknikleri", "Edebi Yenilik"],
    text: "19. yüzyılın klasik Balzac ve Tolstoy romanlarında anlatıcı; her şeyi bilen, gören ve yargılayan 'tanrısal' (hâkim) bir gözle olayları sebep-sonuç zincirinde ve takvimsel bir kronolojiyle okura sunardı. Zaman cetvel gibi düz bir çizgiydi; kahramanın geçmişi, şimdisi ve geleceği nizam içinde akardı. Ancak Sigmund Freud'un psikanaliz alanında bilinçdışının karmaşık dehlizlerini aydınlatması ve Henri Bergson'un zamanın saatle ölçülen mekanik süre değil, zihinde birbirine karışan sübjektif bir yaşantı ('la durée') olduğunu öne sürmesi; 20. yüzyıl başı edebiyatında sarsıcı bir tektonik kırılma yarattı.\n\nBu kırılmanın en radikal edebi meyvesi, Virginia Woolf ve James Joyce'un başını çektiği 'Bilinç Akışı' (Stream of Consciousness) tekniğidir. Bu teknikte yazar, anlatıcının tarafsız ve düzenleyici filtresini aradan tamamen çeker. Karakterin zihninden o anda geçen serbest çağrışımlar, anlık kokuların tetiklediği çocukluk travmaları, bastırılmış korkular, yarım kalmış cümleler ve dilbilgisi kurallarını hiçe sayan kaotik düşünce sıçramaları ham haliyle sayfaya dökülür. Woolf'un 'Mrs. Dalloway'inde Clarissa'nın Londra sokaklarında bir çiçekçiye giderken saat kulesinin çan sesini duymasıyla zihninin gençlik aşklarına ve ölüm korkusuna savrulması; Joyce'un 'Ulysses'inin sonundaki meşhur noktalama işaretsiz Molly Bloom monoloğu bu tekniğin anıtlarıdır. Bilinç akışı, insanın dış dünyadaki eylemlerinden ziyade iç dünyasındaki karmaşayı yakalayarak modern edebiyatı nesnel olaylardan öznel psikolojik derinliğe taşımıştır.",
    idealAnswer: "Bilinç akışı tekniği; mantıksal sıralama ve dilbilgisi kalıplarını kırarak insan zihnindeki serbest çağrışımları ve anlık düşünce sıçramalarını filtresiz biçimde aktaran modern anlatım biçimidir.",
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
      konuDedektifi: "Modern romanda bilinç akışı tekniği, klasik roman anlatıcısından kopuş ve zihinsel zamanın özgürleşmesi.",
      hizliOzet: "Freud ve Bergson'un etkisiyle doğan bilinç akışı, dış olayları değil karakterin zihnindeki kaotik çağrışımları filtresiz biçimde aktarır.",
      yazarinAmaci: "Okura bilinç akışı tekniğinin edebi gerekçelerini ve klasik anlatımdan farklarını kavratmak.",
      soruUretimi: [
        "Bergson'un zaman anlayışı romanı nasıl etkilemiştir?",
        "Bilinç akışı tekniğinde anlatıcının konumu nasıldır?",
        "Virginia Woolf ve James Joyce bu tekniği nasıl kullanmıştır?"
      ],
      anaDusunce: "Bilinç akışı tekniği, insanın içsel hakikatini dış olayların kronolojisinden kurtararak zihnin filtresiz, karmaşık ve çok katmanlı yapısını edebiyata kazandırmıştır.",
      cikarimYapma: "İnsan düşüncesi doğrusal bir çizgide ilerlemez; geçmiş, an ve gelecek çağrışımlarla iç içe geçer.",
      yardimciDusunceler: [
        "Klasik romanda hakim anlatıcı olayları sırayla aktarır.",
        "Freud ve Bergson zihinsel algıyı değiştirmiştir.",
        "Bilinç akışında mantıksal dilbilgisi kuralları esnetilir.",
        "Mrs. Dalloway ve Ulysses bu akımın başyapıtlarıdır."
      ],
      boslukDoldurma: "Bilinç akışı tekniğinde anlatıcının düzenleyici filtresi aradan tamamen çekilerek serbest çağrışımlar ham haliyle sayfaya dökülür.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Klasik roman vs Modern roman), Örneklendirme ve Tanımlama",
      neuralWarning: "Bilinç akışının sıradan bir iç konuşma olmadığını, mantık süzgecinden geçmeyen çağrışım zinciri olduğunu kavrayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Bilinç akışı tekniğinin klasik romandaki kronolojik anlatımdan **en belirgin ayrımı** aşağıdakilerden hangisidir?",
      options: [
        { letter: "A", text: "Romanın her zaman mutlu bir sonla bitmek zorunda olması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Olayları dışarıdan bir mantık sırasıyla aktarmak yerine, karakterin zihnindeki serbest çağrışımları ve kaotik duygu sıçramalarını filtresiz yansıtması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Sadece tarihi savaşların ve kralların hayatının anlatılması", isCorrect: false, type: "detay" },
        { letter: "D", text: "Diyalogların tamamen kaldırılıp sadece doğa betimlemelerine yer verilmesi", isCorrect: false, type: "detay" }
      ],
      explanation: "Metne göre bilinç akışı, anlatıcı filtresini kaldırıp karakterin anlık çağrışımlarını, dilbilgisi sınırlarını zorlayarak doğrudan okura aktarır."
    }
  },
  {
    id: 603,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 3,
    title: "Büyülü Gerçekçilik: Sıradan Olanın İçindeki Mucize",
    category: "Edebiyat",
    duration: 8,
    difficulty: "Orta",
    skills: ["Tür Tahlili", "İmgesel Yorum"],
    text: "Edebiyat tarihinde fantastik türler genellikle ejderhaların uçtuğu, elflerin savaştığı ya da büyülü asaların parıldadığı gerçek dışı kurmaca evrenler inşa eder. Oysa 20. yüzyılın ikinci yarısında Latin Amerika coğrafyasında Gabriel García Márquez, Jorge Luis Borges ve Isabel Allende gibi yazarların öncülüğünde küresel bir fenomen haline gelen 'Büyülü Gerçekçilik' (Realismo Mágico), apayrı bir poetik zemin üzerinde yükselir. Büyülü gerçekçilikte dünya bizim bildiğimiz, ayak bastığımız, siyasal darbelerin yaşandığı, kahve kokan ve yoksullukla boğuşan gündelik gerçek dünyadır. Ancak bu sıradan dünyanın dokusuna olağanüstü, mucizevi ve doğaüstü olaylar öyle doğal bir şekilde iliştirilmiştir ki metindeki hiçbir karakter bu duruma şaşırmaz.\n\nMárquez'in başyapıtı 'Yüzyıllık Yalnızlık'ta sarı kelebeklerin aşık bir adamı bulut gibi takip etmesi, rahibin sıcak çikolata içtikten sonra havada süzülerek yerden yükselmesi veya bir genç kızın çarşafları asarken göğe doğru uçup kaybolması; sabah kahvaltısında ekmek yemek kadar sıradan bir kabullenişle anlatılır. Ne anlatıcı ne de kasaba halkı 'Bu nasıl olur?' diye bir soru sormaz. Bu edebi stratejinin ardında, Latin Amerika'nın sömürgecilik tarihi, yerli kabile mitleri, diktatörlüklerin akıl almaz zulümleri ve gerçekliğin zaten absürt olduğu bir kıtanın çığlığı yatar. Márquez'e göre Latin Amerika'da gerçeklik o kadar inanılmazdır ki onu ancak mucizeler diliyle ifade edebilirsiniz. Büyülü gerçekçilik, Batı'nın katı pozitivist rasyonalizmine karşı üçüncü dünyanın masalsı, mitolojik ve şiirsel bir edebi başkaldırısıdır.",
    idealAnswer: "Büyülü gerçekçilik, olağanüstü olayları fantastik bir dünyada değil gerçek dünyada hiçbir karakterin yadırgamadığı mutlak bir doğallıkla anlatarak katı rasyonalizme meydan okuyan edebi bir akımdır.",
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
      konuDedektifi: "Büyülü gerçekçilik türünün tanımı, fantastik edebiyattan farkı ve Latin Amerika'nın gerçekliğiyle bağı.",
      hizliOzet: "Mucizevi olayları gündelik hayatın sıradan bir parçası gibi anlatan büyülü gerçekçilik, Latin Amerika'nın çalkantılı tarihine ve efsanelerine yaslanır.",
      yazarinAmaci: "Büyülü gerçekçiliğin fanteziden farkını ortaya koyup kültürel ve edebi arka planını aydınlatmak.",
      soruUretimi: [
        "Büyülü gerçekçilik ile saf fantastik kurgu arasındaki fark nedir?",
        "Yüzyıllık Yalnızlık romanında olağanüstü olaylar nasıl karşılanır?",
        "Latin Amerika gerçekliği ile büyülü gerçekçilik arasında nasıl bir bağ vardır?"
      ],
      anaDusunce: "Büyülü gerçekçilik, doğaüstü unsurları gündelik hayatın olağan bir parçası gibi kurgulayarak katı akılcılığa karşı halkların mitolojik hafızasını canlandıran özgün bir edebiyat dilidir.",
      cikarimYapma: "Bir coğrafyanın trajik ve akıl almaz tarihi, sanatçıları sıradan gerçekçilik yerine metaforik ve mucizevi anlatımlara sevk eder.",
      yardimciDusunceler: [
        "Latin Amerika'da Márquez ve Borges öncüdür.",
        "Olaylar hayali bir diyarda değil gerçek dünyada geçer.",
        "Karakterler mucizeleri şaşırmadan karşılar.",
        "Sömürgecilik ve mitler bu türü beslemiştir."
      ],
      boslukDoldurma: "Büyülü gerçekçilikte olağanüstü olaylar metne öyle iliştirilmiştir ki hiçbir karakter bu duruma şaşırmaz.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Fantastik edebiyat vs Büyülü gerçekçilik) ve Somut Örnekler (Yüzyıllık Yalnızlık)",
      neuralWarning: "Karakterlerin tepkisizliğinin bu türün ayırt edici temel anahtarı olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Büyülü gerçekçilik akımını saf fantastik edebiyattan (örneğin peri masallarından veya Yüzüklerin Efendisi'nden) ayıran **en temel özellik** nedir?",
      options: [
        { letter: "A", text: "Yalnızca tiyatro sahnelerinde oynanmak üzere yazılması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Mucizelerin gerçek dünyada cereyan etmesi ve anlatıcı ile karakterler tarafından hiç yadırganmadan tamamen sıradan karşılanması", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Hiçbir aşk ve macera konusuna yer vermemesi", isCorrect: false, type: "detay" },
        { letter: "D", text: "Metinlerde sadece hayvan kahramanların konuşturulması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metne göre büyülü gerçekçilik hayali diyarlarda değil gerçek dünyada geçer ve en akıl almaz mucizeler dahi karakterler tarafından şaşkınlıkla değil gündelik bir doğallıkla karşılanır."
    }
  },
  {
    id: 604,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 4,
    title: "Kahramanın Sonsuz Yolculuğu ve Evrensel Mitolojik Arketipler",
    category: "Edebiyat",
    duration: 8,
    difficulty: "İleri",
    skills: ["Mitolojik Tahlil", "Anlatı Yapısı"],
    text: "Sümerlerin Gılgamış Destanı'ndan Antik Yunan'ın Odysseia'sına, Orta Çağ Kral Arthur efsanelerinden modern sinemanın Yıldız Savaşları (Star Wars), Yüzüklerin Efendisi ve Matrix hikayelerine kadar binlerce yıllık insanlık hafızası neden temelde hep aynı anlatı yapısını tekrar tekrar dinlemekten bıkmaz? Karşılaştırmalı mitoloji uzmanı Joseph Campbell, 1949 yılında yayımladığı çığır açıcı 'Bin Yüzlü Kahraman' (The Hero with a Thousand Faces) adlı eserinde, dünya üzerindeki tüm kültürlerin mitlerinde ortak olan bu evrensel döngüsel yapıyı keşfetmiş ve ona 'Monomit' (Kahramanın Sonsuz Yolculuğu) adını vermiştir.\n\nCampbell'ın şemasına göre kahramanın yolculuğu üç büyük ana evreden ve yaklaşık on iki adımdan oluşur: Ayrılış, Erginlenme ve Dönüş. Yolculuk daima kahramanın sıradan ve güvenli dünyasında başlar; derken huzuru bozan bir 'Maceraya Çağrı' gelir. Kahraman başlangıçta korkuyla bu çağrıyı reddetse de bilge bir akıl hocasının (Gandalf, Yoda vb.) rehberliğinde ilk eşiği aşarak bilinmeyen, tekinsiz ve büyüleyici bir macera alemine adım atar. Burada zorlu sınavlardan geçer, sadık dostlar edinir ve en büyük korkusuyla yüzleştiği 'En Derin Mağara'da sembolik bir ölüm ve yeniden doğum (Çile) yaşar. Ejderhayı alt edip 'İksir'i (bilgelik, kutsal kase, kurtuluş gücü) kazanan kahraman, artık değişmiş ve olgunlaşmış olarak kendi toplumunu kurtarmak üzere sıradan dünyasına geri döner. Psikanalist Carl Gustav Jung'un arketipler teorisiyle de örtüşen bu yolculuk; aslında insanın çocukluktan yetişkinliğe geçerken kendi gölgesiyle yüzleştiği, korkularını yendiği ve kendi benliğini inşa ettiği (bireyleşme) evrensel psikolojik olgunlaşma serüveninin mitolojik bir aynasıdır.",
    idealAnswer: "Kahramanın sonsuz yolculuğu (monomit); kültürler ötesi mitlerin ve modern hikayelerin ortak omurgasını oluşturan, insanın içsel olgunlaşma ve kendini bulma sürecini sembolize eden evrensel bir anlatı modelidir.",
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
      konuDedektifi: "Joseph Campbell'ın monomit teorisi, kahramanın sonsuz yolculuğu ve evrensel anlatı evreleri.",
      hizliOzet: "Gılgamış'tan Star Wars'a tüm büyük anlatılar Ayrılış, Erginlenme ve Dönüş adımlarını izler; bu yolculuk insanın olgunlaşma serüvenidir.",
      yazarinAmaci: "Edebiyat ve sinemadaki hikaye kalıplarının ardındaki evrensel mitolojik şablonu ve psikolojik derinliği göstermek.",
      soruUretimi: [
        "Joseph Campbell'ın 'Monomit' teorisi neyi açıklar?",
        "Kahramanın yolculuğunun üç ana evresi nedir?",
        "Monomit yapısı Jung'un bireyleşme süreciyle nasıl örtüşür?"
      ],
      anaDusunce: "Kahramanın Sonsuz Yolculuğu modeli, tüm insan hikayelerinin ortak arketipler üzerinden bireyin içsel korkularını yenip olgunlaşmasını anlatan evrensel bir mitos olduğunu kanıtlar.",
      cikarimYapma: "Mitolojik hikayeler tarih öncesi masallar değil, insanın psikolojik büyüme sancılarını anlatan sembolik rehberlerdir.",
      yardimciDusunceler: [
        "Campbell 'Bin Yüzlü Kahraman'da teoriyi kurdu.",
        "Ayrılış, Erginlenme ve Dönüş üç temel evredir.",
        "Bilge akıl hocası ve derin mağara sınavı evrenseldir.",
        "Jung'un bireyleşme teorisiyle tam uyumludur."
      ],
      boslukDoldurma: "Bu yolculuk, insanın kendi korkularını yenip benliğini inşa ettiği evrensel olgunlaşma serüveninin aynasıdır.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Örneklendirme (Gılgamış, Star Wars, Matrix) ve Tanımlama (Monomit)",
      neuralWarning: "Monomitin sadece fantastik filmlere özgü olmadığını, antik destanlardan beri süren bir insanlık şablonu olduğunu kavrayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Joseph Campbell'ın 'Monomit' kuramına göre kahramanın yolculuğu psikolojik açıdan **neyi simgeler**?",
      options: [
        { letter: "A", text: "Maddi zenginliğe ulaşmak için diğer insanları geride bırakma hırsını", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Bireyin korkularıyla yüzleşip kendi gölgesini yenerek olgunlaşması ve benliğini bulması (bireyleşme) serüvenini", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Askeri bir ordunun fethettiği yeni toprakları yönetme biçimini", isCorrect: false, type: "detay" },
        { letter: "D", text: "Doğa olaylarının bilimsel formüllerle açıklanmasını", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde monomitin Carl Gustav Jung'un arketipler teorisiyle örtüşerek 'insanın korkularını yendiği ve kendi benliğini inşa ettiği bireyleşme serüveninin mitolojik aynası' olduğu açıkça belirtilmiştir."
    }
  }
];
