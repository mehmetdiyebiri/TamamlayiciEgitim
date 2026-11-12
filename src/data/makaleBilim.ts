import { MakaleItem } from './makaleTypes';

export const BILIM_ARTICLES: MakaleItem[] = [
  {
    id: 101,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 1,
    title: "Kuantum Fiziği ve Gerçekliğin Olasılıksal Doğası",
    category: "Bilim",
    duration: 8,
    difficulty: "İleri",
    skills: ["Analitik Düşünme", "Kavramsal Analiz"],
    text: "Kuantum fiziği, 20. yüzyılın başlarında klasik Newton fiziğinin mikroskobik dünyayı açıklamakta tıkandığı noktada doğmuş köklü bir düşünce devrimidir. Max Planck'ın siyah cisim ışımasını açıklarken enerjinin sürekli bir akış değil, 'kuanta' adı verilen kesikli paketler halinde soğurulup yayıldığını keşfetmesi bu dönüşümün ilk kıvılcımı oldu. Kısa bir süre sonra Albert Einstein, fotoelektrik etki deneyleriyle ışığın sadece klasik bir dalga gibi davranmadığını, aynı zamanda foton adı verilen ayrık enerji parçacıkları gibi davrandığını gösterdi. Bu bulgu, modern fiziğin merkezine 'dalga-parçacık ikiliği' kavramını yerleştirdi.\n\nAncak klasik determinizme asıl ölümcül darbeyi Werner Heisenberg'in ortaya koyduğu Belirsizlik İlkesi vurdu. Bu ilkeye göre bir parçacığın konumunu ne kadar yüksek bir hassasiyetle saptamaya çalışırsanız, momentumunu (hızını) o denli belirsizleştirirsiniz; aynı durum tersi için de geçerlidir. Bu durum ölçüm cihazlarının yetersizliğinden değil, evrenin dokusundaki temel fiziksel bir kuraldan kaynaklanmaktadır. Klasik mekaniğin 'bir sistemin başlangıç koşulları tam olarak bilinirse gelecekteki tüm hareketleri kesin olarak hesaplanabilir' şeklindeki saat mekanizması evren anlayışı, atom altı düzeyde yerini Erwin Schrödinger'in dalga denklemleriyle tanımlanan olasılık bulutlarına bıraktı. Artık bir elektronun belirli bir yörüngede kesin olarak nerede olduğu değil, uzayın belirli bir noktasında bulunma olasılığı hesaplanabiliyordu. Gözlemcinin ve ölçüm sürecinin incelenen kuantum durumunu doğrudan çökertmesi (dalga fonksiyonunun çökmesi), nesnel gerçekliğin bağımsız bir biçimde mi var olduğu yoksa gözlem eylemiyle mi şekillendiği yönündeki felsefi tartışmaları bugün de canlı tutmaktadır.",
    idealAnswer: "Kuantum fiziği, enerjinin kesikli paketlerden oluştuğunu, dalga-parçacık ikiliğini ve atom altı düzeyde kesin determinizmin yerini olasılıkların aldığını kanıtlamıştır.",
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
      konuDedektifi: "Kuantum mekaniğinin doğuşu, temel ilkeleri ve klasik determinizmin yerini olasılık dalgalarına bırakması.",
      hizliOzet: "Planck ve Einstein'ın keşifleriyle başlayan kuantum teorisi, Heisenberg belirsizlik ilkesiyle kesinlik yerine olasılığı merkeze koymuştur.",
      yazarinAmaci: "Okuyucuya atom altı dünyadaki kuralların klasik fizik kabullerinden neden radikal biçimde farklı olduğunu açıklamak.",
      soruUretimi: [
        "Belirsizlik İlkesi ölçüm aletlerinin kusurundan mı kaynaklanır?",
        "Dalga-parçacık ikiliği neyi ifade eder?",
        "Kuantum fiziğinde kesin konum yerine neden olasılık bulutları kullanılır?"
      ],
      anaDusunce: "Kuantum fiziği, evrenin en küçük yapı taşlarının belirlenimci kesinliklerle değil, olasılık dalgaları ve gözleme bağlı çöküşlerle çalıştığını ortaya koymuştur.",
      cikarimYapma: "Gözlem eyleminin kendisi, gözlemlenen fiziksel olgunun durumunu değiştiren aktif bir etmendir.",
      yardimciDusunceler: [
        "Enerji kuanta adı verilen paketler halindedir.",
        "Işık hem dalga hem parçacık davranışı sergiler.",
        "Konum ve momentum aynı anda mutlak kesinlikle bilinemez.",
        "Elektronların yeri olasılık bulutlarıyla ifade edilir."
      ],
      boslukDoldurma: "Klasik mekaniğin saat mekanizması evren anlayışı, yerini Schrödinger'in dalga denklemleriyle tanımlanan olasılık bulutlarına bıraktı.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Klasik Fizik vs Kuantum), Tanımlama ve Örneklendirme",
      neuralWarning: "Kuantumdaki belirsizliğin deneysel ölçüm hatası değil doğanın özsel bir kanunu olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Heisenberg'in Belirsizlik İlkesi'nin klasik fizik anlayışında yarattığı en köklü değişim aşağıdakilerden hangisidir?",
      options: [
        { letter: "A", text: "Ölçüm aletlerinin hassasiyetinin doğayı anlamak için yeterli olduğunu kanıtlaması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Evrenin mutlak deterministik kesinlikler yerine olasılıksal kurallarla işlediğini göstermesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Işığın yalnızca dalga boyu üzerinden incelenebileceğini savunması", isCorrect: false, type: "detay" },
        { letter: "D", text: "Enerjinin sürekli bir akış halinde her yere yayıldığını varsayması", isCorrect: false, type: "detay" }
      ],
      explanation: "Belirsizlik İlkesi, konum ve momentumun aynı anda kesin bilinemeyeceğini ortaya koyarak klasik determinizmi yıkmış ve olasılıkları merkeze almıştır."
    }
  },
  {
    id: 102,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 2,
    title: "CRISPR-Cas9 ve Genetik Mühendisliğinde Biyoetik Sınırlar",
    category: "Bilim",
    duration: 8,
    difficulty: "İleri",
    skills: ["Eleştirel Okuma", "Biyoetik"],
    text: "Bakterilerin kendilerini istila eden virüslere karşı geliştirdiği milyonlarca yıllık adaptif bağışıklık sisteminden esinlenen CRISPR-Cas9 teknolojisi, genetik biliminde benzeri görülmemiş bir çığır açmıştır. Cas9 adlı rehber enzim, hedeflenen DNA dizilimini moleküler bir makas gibi yüksek bir hassasiyetle kesebilmekte; bilim insanlarına hatalı genleri çıkarma, onarma veya yeni gen parçacıkları ekleme imkanı tanımaktadır. Bu olağanüstü yöntem; kistik fibrozis, orak hücreli anemi ve Huntington gibi tek gen mutasyonuna dayalı ölümcül kalıtsal hastalıkların tedavisinde insanlık için devasa bir umut ışığı yakmıştır. Tarım ve hayvancılıkta kuraklığa dirençli bitki türlerinin geliştirilmesi de bu teknolojinin diğer pratik faydaları arasındadır.\n\nNe var ki CRISPR'ın insan embriyoları ve üreme hücreleri (germline) üzerinde uygulanabilirliği, modern tıbbın karşılaştığı en çetrefilli biyoetik krizlerden birini doğurmuştur. Somatik hücrelerde yapılan genetik düzeltmeler yalnızca tedavi edilen bireyi ilgilendirirken; üreme hücrelerinde gerçekleştirilen gen düzenlemeleri dölden döle aktarılarak insan türünün gen havuzunu kalıcı biçimde değiştirecektir. Bu durum, 'tasarım bebekler' kavramını bilim kurgudan gerçeğe taşımakta; zeka, fiziksel görünüm veya kas gücü gibi niteliklerin sipariş edildiği bir yapay evrim sürecini tetikleme tehlikesi barındırmaktadır. Genetik teknolojisine yalnızca varlıklı zümrelerin erişebildiği bir dünyada, biyolojik temelli sınıfsal kast sistemlerinin doğabileceği uyarısında bulunan etik kurullar; uluslararası bağlayıcılığı olan yasal düzenlemeler ve şeffaf denetim mekanizmaları oluşturulmadığı takdirde insanlığın telafisi imkansız felaketlerle karşılaşabileceğini vurgulamaktadır.",
    idealAnswer: "CRISPR-Cas9 genetik hastalıkların tedavisinde devrimsel bir olanak sağlarken, kalıtsal üreme hücreleri üzerindeki müdahalelerin etik ve toplumsal eşitliği tehdit etme riski katı kuralları zorunlu kılar.",
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
      konuDedektifi: "CRISPR-Cas9 teknolojisinin çalışma prensibi, tedavi umutları ve kalıtsal müdahalenin getirdiği biyoetik ikilemler.",
      hizliOzet: "CRISPR genetik hastalıkları moleküler düzeyde iyileştirme gücüne sahipken, embriyolar üzerindeki kullanımı insan gen havuzunu ve sosyal eşitliği tehdit eder.",
      yazarinAmaci: "Genetik mühendisliğinin getirdiği bilimsel faydalar ile sorumsuz ve denetimsiz kullanımın doğuracağı ahlaki krizleri dengeli biçimde ele almak.",
      soruUretimi: [
        "Somatik hücre tedavisi ile üreme hücresi müdahalesi arasındaki fark nedir?",
        "CRISPR teknolojisinin doğal kökeni hangi canlılara dayanır?",
        "Tasarım bebekler toplumsal eşitsizliği nasıl biyolojik bir boyuta taşıyabilir?"
      ],
      anaDusunce: "Genom düzenleme teknolojileri büyük tedavi imkanları sunsa da insanlığın ortak biyolojik geleceğini korumak adına katı biyoetik ve hukuki çerçeveler gerektirir.",
      cikarimYapma: "Biyoteknolojik güç ahlaki ve evrensel adalet ilkeleriyle sınırlandırılmadığında toplumları yapay biyolojik sınıflara bölebilir.",
      yardimciDusunceler: [
        "CRISPR bakterilerin antiviral savunmasından türetilmiştir.",
        "Kalıtsal hastalıkların tedavisinde moleküler makas görevi görür.",
        "Embriyolara yapılan müdahaleler sonraki nesillerin gen havuzunu değiştirir.",
        "Tasarım bebekler genetik elitizm kaygılarını büyütmektedir."
      ],
      boslukDoldurma: "Üreme hücrelerinde gerçekleştirilen gen düzenlemeleri dölden döle aktarılarak insan türünün gen havuzunu kalıcı biçimde değiştirir.",
      anlatimBicimi: "Tartışmacı ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Somatik vs Germline), Örneklendirme ve Neden-Sonuç İlişkisi",
      neuralWarning: "Metnin teknolojiyi tümüyle reddetmediğini, tedavi amaçlı kullanım ile yapay evrim arasındaki etik çizgiyi savunduğunu kavrayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Yazarın CRISPR teknolojisiyle ilgili olarak en çok endişe duyduğu husus aşağıdakilerden hangisidir?",
      options: [
        { letter: "A", text: "Laboratuvar maliyetlerinin ilaç şirketleri tarafından karşılanamaması", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Bakteriyel enfeksiyonların bu yöntem yüzünden daha dirençli hale gelmesi", isCorrect: false, type: "detay" },
        { letter: "C", text: "Kalıtsal müdahalelerin etik denetim olmaksızın gelecek nesilleri ve toplumsal eşitliği bilinçsizce şekillendirmesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "D", text: "Orak hücreli anemi gibi hastalıklarda beklenen başarıyı gösterememesi", isCorrect: false, type: "detay" }
      ],
      explanation: "Yazar özellikle embriyolar üzerinde yapılan kalıcı değişikliklerin sonraki nesilleri de etkilediğini ve biyolojik kast sistemleri yaratabileceğini belirterek etik sınırların önemini vurgulamaktadır."
    }
  },
  {
    id: 103,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 3,
    title: "Nöroplastisite: İnsan Beyninin Sürekli Değişen Haritası",
    category: "Bilim",
    duration: 7,
    difficulty: "Orta",
    skills: ["Biyolojik Analiz", "Ana Düşünce"],
    text: "Geçtiğimiz yüzyılın ortalarına kadar tıp dünyasında hakim olan klasik nöroloji paradigması, yetişkin bir insan beyninin katı ve değişmez (statik) bir donanım olduğunu varsayıyordu. Bu eski görüşe göre çocukluk döneminde kritik gelişim pencereleri kapandıktan sonra beyin haritası sabitlenir, ölen nöronların yerine yenisi konamaz ve zedelenen sinirsel devreler onarılamazdı. Oysa son çeyrek asırda fonksiyonel manyetik rezonans görüntüleme (fMRI) ve ileri hücresel biyoloji sayesinde kanıtlanan 'nöroplastisite' gerçeği, bu dogmayı tamamen yerle bir etti. Nöroplastisite; beynin yeni deneyimler, öğrenmeler, çevresel uyaranlar ve hatta fiziksel travmalar karşısında sinir ağlarını yapısal ve işlevsel olarak yeniden organize edebilme kapasitesidir.\n\nBu muazzam dinamizm iki temel mekanizmayla işler: Sinaptik güçlenme ve nöronal budanma. Donald Hebb'in meşhur 'Birlikte ateşlenen nöronlar, birbirine bağlanır' ilkesi uyarınca; yeni bir dil öğrenirken veya bir enstrüman çalarken sık tekrar edilen zihinsel pratikler ilgili sinapsları kalınlaştırıp otoban gibi hızlı iletken yollara dönüştürür. Buna karşılık uzun süre kullanılmayan sinirsel yollar biyolojik enerji tasarrufu sağlamak amacıyla budanarak zayıflatılır. Nöroplastisitenin en dramatik klinik kanıtları inme (felç) geçiren hastalarda görülür: Hasar gören beyin lobunun yürüttüğü konuşma veya hareket görevlerini, sağlam kalan komşu loblar yoğun egzersiz ve rehabilitasyonla zaman içinde üstlenebilmektedir. Bu durum insan beyninin taşlaşmış bir heykel değil, yaşam boyu şekil alabilen canlı bir kil gibi olduğunu ve öğrenmenin hiçbir zaman biyolojik bir yaş engeline takılmadığını müjdelemektedir.",
    idealAnswer: "Nöroplastisite, insan beyninin deneyim, öğrenme ve egzersizlerle sinir ağlarını yaşam boyu yeniden yapılandırıp hasarlı bölgelerin görevlerini devralabildiğini kanıtlar.",
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
      konuDedektifi: "Beynin dinamik esnekliği (nöroplastisite), sinaptik güçlenme ve öğrenmenin yaşam boyu sürmesi.",
      hizliOzet: "Beyin statik bir organ değildir; deneyimlerle sinir devrelerini sürekli yenileyebilir ve hasar gören işlevleri sağlam bölgelerle telafi edebilir.",
      yazarinAmaci: "Beynin değişmez olduğu yönündeki eski miti çürüterek zihinsel pratiklerin beyni fiziksel olarak nasıl dönüştürdüğünü aktarmak.",
      soruUretimi: [
        "Hebb'in sinirbilimsel ilkesi öğrenmeyi nasıl açıklar?",
        "Nöronal budanma mekanizması neden gereklidir?",
        "İnme tedavisinde nöroplastisite nasıl bir rol oynar?"
      ],
      anaDusunce: "İnsan beyni yaşam boyu deneyimlere ve pratiklere bağlı olarak sinirsel devrelerini yeniden inşa edebilen esnek ve uyarlanabilir bir organdır.",
      cikarimYapma: "Zihinsel tembellik sinir ağlarının körelmesine yol açarken, sürekli öğrenme beynin bilişsel rezervini yaşlılıkta da güçlü tutar.",
      yardimciDusunceler: [
        "Eski görüş yetişkin beynini sabit donanım sayıyordu.",
        "Tekrar edilen eylemler sinir bağlantılarını kuvvetlendirir.",
        "Kullanılmayan sinir hatları budanır.",
        "Sağlam beyin lobları hasarlı bölgelerin işlevlerini devralabilir."
      ],
      boslukDoldurma: "İnsan beyni taşlaşmış bir heykel değil, yaşam boyu şekil alabilen canlı bir kil gibidir.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Eski vs Yeni paradigma), Tanımlama ve Benzetme (kil heykeli)",
      neuralWarning: "Nöroplastisitenin sadece çocuklara özgü bir mucize değil, yetişkinlerde de faal bir mekanizma olduğunu unutmayın.",
      cognitiveTime: "7 Dakika"
    },
    quizQuestion: {
      stem: "Bu parçadan nöroplastisite ile ilgili aşağıdakilerden hangisi kesin olarak çıkarılabilir?",
      options: [
        { letter: "A", text: "Yetişkinlikte öğrenilen becerilerin çocukluktakilere göre daha kalıcı olduğu", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Tekrar ve zihinsel pratiklerin beynin sinirsel ağ yapısını somut olarak güçlendirdiği ve yeniden haritalandırdığı", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Beynin hasar gören her bölgesinin ilaçsız olarak kendiliğinden tamamen iyileştiği", isCorrect: false, type: "celdirici" },
        { letter: "D", text: "Genetik faktörlerin beyin gelişiminde hiçbir rol oynamadığı", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde sık tekrar edilen zihinsel pratiklerin ilgili sinapsları kalınlaştırıp otoban gibi güçlü yollara dönüştürdüğü açıkça vurgulanmaktadır."
    }
  },
  {
    id: 104,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 4,
    title: "Karanlık Madde ve Evrenin Görünmeyen İskelesi",
    category: "Bilim",
    duration: 8,
    difficulty: "İleri",
    skills: ["Kozmolojik Çıkarım", "Bilimsel Yöntem"],
    text: "Teleskoplarımızı gece gökyüzüne çevirdiğimizde gördüğümüz milyarlarca parıldayan galaksi, trilyonlarca yıldız, gezegenler ve görkemli gaz bulutları; aslında evrenin toplam kütle-enerji bütçesinin yalnızca %5'lik mütevazı bir dilimini oluşturur. Geriye kalan devasa kozmik mimarinin yaklaşık %27'si, bilimin henüz doğrudan laboratuvar ortamında yakalayamadığı gizemli bir bileşene aittir: Karanlık Madde. Karanlık madde; elektromanyetik kuvvetle etkileşime girmez, ışığı soğurmaz, yaymaz ve yansıtmaz. Bu nedenle ne kadar gelişmiş olursa olsun hiçbir optik, kızılötesi ya da X-ışını teleskobu onu doğrudan görüntüleyemez.\n\nPeki astrofizikçiler göremedikleri bir maddenin varlığından nasıl bu kadar emindir? İlk somut ipucu 1930'larda Fritz Zwicky'nin Coma galaksi kümesini incelerken galaksilerin dağılmadan kalabilmesi için mevcut görünür kütleden yüzlerce kat daha fazla çekim gücüne ihtiyaç olduğunu fark etmesiyle geldi. 1970'lerde ise Amerikalı gökbilimci Vera Rubin, sarmal galaksilerin dış kollarındaki yıldızların dönme hızlarını ölçtüğünde şaşırtıcı bir gerçekle karşılaştı: Klasik yerçekimi yasalarına göre merkezden uzaklaştıkça yıldızların yavaşlaması gerekirken, dış kollardaki yıldızlar da merkeze yakın olanlar kadar yüksek hızla dönüyordu. Bu durum, galaksilerin 'karanlık madde halesi' adı verilen görünmez ve devasa bir kütle bulutu tarafından sarıldığını kesinleştirdi. Dahası Albert Einstein'ın Genel Görelilik kuramında öngördüğü yerçekimsel merceklenme etkisi; uzaktaki galaksilerden gelen ışığın aradaki karanlık madde kümeleri tarafından bükülüp büyütülmesini sağlayarak bu kozmik iskelenin haritasını çıkarmamıza olanak tanır. Karanlık maddenin bu çekim kuvveti olmasaydı, dönen galaksiler savrulup dağılır ve yıldızların oluşabileceği kararlı kozmik yapılar asla meydana gelemezdi.",
    idealAnswer: "Karanlık madde ışıkla etkileşime girmese de yıldızların dönüş hızları ve yerçekimsel merceklenme ile varlığı kanıtlanan, galaksileri bir arada tutan kozmik iskelettir.",
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
      konuDedektifi: "Karanlık maddenin dolaylı keşif tarihi, yerçekimsel merceklenme ve galaksileri bir arada tutucu etkisi.",
      hizliOzet: "Evrenin görünmeyen %27'sini oluşturan karanlık madde, ışık yaymasa da yerçekimsel etkisiyle galaksilerin savrulmasını önleyen kozmik çatıdır.",
      yazarinAmaci: "Görünür evrenin gerisinde devasa bir görünmez çekim kütlesi olduğunu ve bilimin bunu dolaylı kanıtlarla nasıl doğruladığını göstermek.",
      soruUretimi: [
        "Vera Rubin'in galaksi dönüş eğrilerinde bulduğu anormallik nedir?",
        "Yerçekimsel merceklenme nasıl bir gözlem aracı sağlar?",
        "Karanlık madde olmasaydı sarmal galaksilere ne olurdu?"
      ],
      anaDusunce: "Evrenin yapısal bütünlüğü, doğrudan ışık vermeyen ancak yerçekimsel etkisiyle galaksileri bir arada tutan karanlık maddenin kozmik iskelesine dayanır.",
      cikarimYapma: "Bilimsel gerçekler yalnızca doğrudan gözlemlenenlerle sınırlı değildir; dolaylı etkilerin matematiksel analizi de kesin kanıt sağlar.",
      yardimciDusunceler: [
        "Görünür madde evrenin sadece %5'idir.",
        "Karanlık madde elektromanyetik kuvvetle etkileşmez.",
        "Galaksilerin dış kollarındaki yıldızlar beklenenden hızlı döner.",
        "Yerçekimsel merceklenme uzay-zamanın bükülmesiyle ışığı saptırır."
      ],
      boslukDoldurma: "Karanlık maddenin bu çekim kuvveti olmasaydı, dönen galaksiler savrulup dağılır ve kararlı yapılar meydana gelemezdi.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Sayısal Verilerden Yararlanma (%5, %27), Tanıklık ve Tarihsel Sıralama (Zwicky, Rubin, Einstein)",
      neuralWarning: "Karanlık maddenin kara deliklerle aynı şey olmadığını, galaksileri saran yaygın bir halo olduğunu aklınızda tutun.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Bilim insanlarının doğrudan göremedikleri karanlık maddenin varlığından emin olmalarını sağlayan temel kanıt nedir?",
      options: [
        { letter: "A", text: "Kara deliklerin içine düşen ışık dalgalarının frekans değiştirmesi", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Yıldızların dönme hızları ve kütleçekimsel merceklenme gibi çekim etkileri", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Gezegen atmosferlerinde tespit edilen egzotik kimyasal gazlar", isCorrect: false, type: "detay" },
        { letter: "D", text: "Güneş patlamalarının periyodik olarak manyetik alanı etkilemesi", isCorrect: false, type: "detay" }
      ],
      explanation: "Metne göre yıldızların beklenenden hızlı dönmesi ve galaksilerin ışığı bükmesi (kütleçekimsel etki), karanlık maddenin varlığının en kesin kanıtıdır."
    }
  }
];
