import { MakaleItem } from './makaleTypes';

export const ATOLYE_1_ARTICLES: MakaleItem[] = [
  {
    id: 101,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 1,
    title: "Roman Türünün Doğuşu ve Epikten Ayrılışı",
    category: "Roman ve Anlatı",
    duration: 6,
    difficulty: "İleri",
    skills: ["Konu Dedektifi", "Epik vs Roman", "Ian Watt", "Tarihsel Bağlam"],
    text: `Roman, modern dünyanın “destanı” olarak kabul edilir. Ancak kadim destanlardan (epik) farklı olarak roman, tanrıların veya yarı-tanrı soylu kahramanların değil; hataları, çelişkileri ve iç dünyasıyla “sıradan bireyin” hikayesidir. Roman tarihinin kökleri 17. yüzyılın başlarında Cervantes’in “Don Kişot”u ile atılsa da, türün asıl yükselişi 18. yüzyıl İngiltere’sinde burjuvazinin doğuşuyla gerçekleşmiştir. Epik anlatıdaki “statik ve kusursuz” kahramanın yerini, romanın “dinamik ve dönüşen” karakteri almıştır. Ian Watt'a göre romanın yükselişi, felsefi bireycilik ve deneyimcilikle paralel ilerler. Roman artık dışsal bir kaderin değil, içsel bir çatışmanın alanıdır. Karakter, dış dünyadaki toplumsal yapıyla çarpışırken kendi kimliğini inşa eder. Bu durum, “roman eleştirisi” geleneğinin de temelini oluşturur: Bir metni sadece dil bilgisi açısından değil, toplumsal ve psikolojik bağlamları içinde değerlendirmek. (—-)`,
    idealAnswer: "Roman, destanlardaki kusursuz kahramanların yerine sıradan ve gelişen bireyi koyarak, modern dünyanın ve burjuva sınıfının yükselişiyle birlikte şekillenmiş edebi bir türdür.",
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
      konuDedektifi: "Roman türünün tarihsel gelişimi, epik anlatıdan farkı ve bireyin merkeze alınma süreci.",
      hizliOzet: "Roman, destanlardaki kusursuz kahramanların yerine sıradan ve gelişen bireyi koyarak, modern dünyanın ve burjuva sınıfının yükselişiyle birlikte şekillenmiş edebi bir türdür.",
      yazarinAmaci: "Romanın sadece bir kurgu olmadığını, felsefi ve toplumsal bir değişimle (bireycilik) doğan, karakterin iç dünyasına odaklanan yeni bir anlatı biçimi olduğunu vurgulamak.",
      soruUretimi: [
        "Destan (epik) kahramanı ile roman karakteri arasındaki temel fark nedir?",
        "Ian Watt'a göre romanın yükselişi hangi felsefi akımlarla ilişkilidir?",
        "Roman neden 'modern dünyanın destanı' olarak adlandırılır?"
      ],
      anaDusunce: "Roman, kolektif mitolojilerden bireysel yaşantıya geçişin edebi temsilidir ve gücünü karakterin çevresiyle yaşadığı çatışmadan alır.",
      cikarimYapma: "Romanın doğuşu, insanın kendi kaderini tanrısal güçlerden alıp kendi ellerine (veya çatışmalarına) bırakmasının sanatsal bir yansımasıdır.",
      yardimciDusunceler: [
        "Don Kişot türün miladı kabul edilir.",
        "Roman eleştirisi, toplumsal ve psikolojik analizleri içerir.",
        "Epik anlatıdaki statik kahramanın yerini dönüşen karakter almıştır."
      ],
      boslukDoldurma: "Dolayısıyla roman, insanın kendi sıradanlığında keşfettiği o devasa ve karmaşık evrenin kağıda dökülmüş halidir.",
      anlatimBicimi: "Açıklayıcı ve Karşılaştırmalı Anlatım.",
      dusunceyiGelistirme: "Karşılaştırma (Epik vs. Roman), Tanık Gösterme (Ian Watt), Örneklendirme (Don Kişot).",
      neuralWarning: "Metin, 'şiir tekniklerinden' veya 'tiyatro sahnelerinden' bahsetmez. Odak noktanız 'roman türünün tarihsel evrimi' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Metne göre, epik destan kahramanı ile modern roman karakteri arasındaki en temel yapısal fark aşağıdakilerden hangisidir?",
      options: [
        { letter: "A", text: "Destan kahramanı statik ve kusursuzken, roman karakteri hatalarıyla dinamik ve dönüşen bir yapıdadır.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Roman karakterleri daima soylu ailelerden seçilirken destan kahramanları sıradan halktandır.", isCorrect: false, type: "Ters Mantık" },
        { letter: "C", text: "Destanlar yalnızca bireysel çatışmalara odaklanırken romanlar kolektif mitleri işler.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Roman türü felsefi bireycilikten tamamen bağımsız olarak gelişmiştir.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Epik anlatıdaki 'statik ve kusursuz' kahramanın yerini, romanın 'dinamik ve dönüşen' karakteri almıştır."
    }
  },
  {
    id: 102,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 2,
    title: "Don Kişot ve Edebiyatta Perspektivizm",
    category: "Roman ve Anlatı",
    duration: 6,
    difficulty: "İleri",
    skills: ["Perspektivizm", "Gerçeklik vs Kurmaca", "Karakter Evrimi"],
    text: `1605 yılında Miguel de Cervantes tarafından kaleme alınan “Don Kişot”, sadece bir şövalye parodisi değil, modern romanın doğuşunu müjdeleyen devrimci bir metindir. Eserin büyüklüğü, “gerçeklik” ile “kurmaca” arasındaki sınırı ilk kez bu kadar net bir şekilde bulanıklaştırmasından gelir. Don Kişot, okuduğu şövalye romanlarının etkisiyle zihninde yarattığı “idealist” dünya ile İspanya’nın tozlu ve “materyalist” gerçekliği arasında sıkışıp kalmıştır. Bu çatışma, edebiyat eleştirisinde “Perspektivizm” kavramının doğmasına yol açar: Bir yanda şövalye olduğunu sanan Alonso Quijano, diğer yanda yel değirmenlerini dev gören bir hayalperest. Cervantes, karakterini sadece bir komedi unsuru olarak değil, inançları uğruna dünyaya meydan okuyan trajik bir kahraman olarak kurgulamıştır. Roman boyunca Don Kişot’un “şövalyeleşmesi” ve yardımcısı Sancho Panza’nın “gerçekçileşmesi” (ve bazen birbirlerine dönüşmeleri), karakter gelişiminin edebiyattaki en erken ve en derin örneklerinden biridir. (—-)`,
    idealAnswer: "Don Kişot, hayal dünyasıyla sert gerçeklik arasındaki çatışmayı işleyerek perspektivizm kavramını edebiyata sokan ve karakterlerin süreç içinde değişebileceğini gösteren ilk modern romandır.",
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
      konuDedektifi: "“Don Kişot” romanının modern edebiyattaki yeri, gerçeklik-kurmaca çatışması ve karakter gelişimi.",
      hizliOzet: "“Don Kişot”, hayal dünyasıyla sert gerçeklik arasındaki çatışmayı işleyerek “perspektivizm” kavramını edebiyata sokan ve karakterlerin süreç içinde değişebileceğini gösteren ilk modern romandır.",
      yazarinAmaci: "Cervantes’in eserinin sadece bir hiciv olmadığını, bireyin öznel gerçekliğinin toplumsal gerçeklikle çarpışmasını anlatan derin bir felsefi altyapıya sahip olduğunu vurgulamak.",
      soruUretimi: [
        "“Don Kişot” romanı neden modern romanın başlangıcı kabul edilir?",
        "Karakterin “idealist” dünyası ile İspanya’nın “materyalist” gerçekliği arasındaki çatışma neyi temsil eder?",
        "Sancho Panza ve Don Kişot arasındaki etkileşim, karakter dönüşümü açısından ne ifade eder?"
      ],
      anaDusunce: "Modern roman, dış dünyayı olduğu gibi yansıtmaktan ziyade, bireyin o dünyayı nasıl “algıladığı” ve bu algının yarattığı çatışmalar üzerine kuruludur.",
      cikarimYapma: "Edebiyatta bir karakterin başına gelenler kadar, o karakterin bu olaylar karşısında geçirdiği zihinsel ve ruhsal değişim, metnin edebi değerini belirleyen temel unsurdur.",
      yardimciDusunceler: [
        "Perspektivizm, hakikatin kişiden kişiye değişebileceğini savunur.",
        "Sancho Panza, sağduyu ve gerçekliğin sembolü olarak Don Kişot’u dengeler.",
        "Karakterler salt komedi değil trajik bir boyut taşır."
      ],
      boslukDoldurma: "Sonuç olarak Cervantes, okura şu soruyu miras bırakmıştır: Gerçek, gözle görülen yel değirmenleri midir, yoksa zihnimizde devleştirdiğimiz ideallerimiz mi?",
      anlatimBicimi: "Açıklayıcı ve Çözümleyici Anlatım.",
      dusunceyiGelistirme: "Tanımlama (“Perspektivizm”), Karşılaştırma (İdealizm vs. Materyalizm), Örneklendirme (Don Kişot ve Sancho Panza).",
      neuralWarning: "Metin, 'orta çağ şövalyelik sisteminden' veya 'Cervantes’in biyografisinden' derinlemesine bahsetmez. Odak noktanız 'roman tekniği' ve 'gerçeklik algısı' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Don Kişot metninde vurgulanan 'Perspektivizm' kavramı aşağıdakilerden hangisiyle doğrudan örtüşür?",
      options: [
        { letter: "A", text: "Hakikatin nesnel tek bir doğrudan ibaret olmayıp bireyin algı süzgecine göre şekillenmesi.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Edebi eserlerin sadece tarihsel belgeler üzerinden yazılma zorunluluğu.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Kahramanların hiçbir zaman yanılmaz ve kusursuz olduğunu kabul etme ilkesi.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Yalnızca materyalist dünya görüşünün edebiyata yansıtılması.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Perspektivizm; zihinde yaratılan idealist dünya ile dış gerçeklik arasındaki algı farklılıklarını ve hakikatin öznel boyutunu temsil eder."
    }
  },
  {
    id: 103,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 3,
    title: "Roman Karakterlerinin Felsefi Boyutu",
    category: "Karakter ve Felsefe",
    duration: 5,
    difficulty: "İleri",
    skills: ["Ontolojik Tutarlılık", "Felsefi Roman", "Raskolnikov & Meursault"],
    text: `Modern romanda karakter, sadece olay örgüsünü sürükleyen bir figür değildir; o, yazarın dünya görüşünü veya bir felsefi sorunsalı sınadığı “canlı bir laboratuvar”dır. Roman karakterlerinin felsefi derinliği, onların “karar anlarında” ve “varoluşsal krizlerinde” gizlidir. Örneğin, Dostoyevski’nin Raskolnikov’u sadece bir katil değil, “üstün insanın ahlak sınırlarını” sorgulayan bir nitzscheyen öncüldür. Benzer şekilde, Albert Camus’nün Meursault’su “saçma” (absürd) felsefesinin ete kemiğe bürünmüş halidir. “Roman eleştirisi” yaparken bir karakterin derinliğini ölçmek için onun “ontolojik tutarlılığına” bakılır. Karakterin iç konuşmaları, sadece duygularını değil, evrenle ve tanrıyla olan kavgasını yansıtır. Felsefi romanlarda karakterler, statik birer temsil olmaktan çıkıp süreç içinde kendi hakikatlerini inşa ederler. Bu bağlamda roman, felsefenin soyut kavramlarını, bireyin somut yaşam deneyimine indirgeyerek onları “hissedilir” kılan en güçlü disiplindir. (—-)`,
    idealAnswer: "Roman karakterleri, soyut felsefi fikirlerin somut yaşantılar üzerinden test edildiği canlı laboratuvarlardır.",
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
      konuDedektifi: "Roman karakterlerinin felsefi temsil gücü ve kurgusal figürlerin düşünce dünyasındaki işlevi.",
      hizliOzet: "Roman karakterleri, soyut felsefi fikirlerin somut yaşantılar üzerinden test edildiği araçlardır; bu sayede okur, teorik kavramları bir bireyin varoluşsal krizleri üzerinden deneyimler.",
      yazarinAmaci: "Karakter analizinin sadece psikolojik bir tahlil olmadığını, karakterlerin taşıdığı “felsefi yükü” anlamanın romanı gerçek manada çözümlemek için şart olduğunu göstermek.",
      soruUretimi: [
        "Bir roman karakterini “canlı bir laboratuvar” yapan unsurlar nelerdir?",
        "Raskolnikov ve Meursault karakterleri hangi felsefi akımların taşıyıcısıdır?",
        "Romanın felsefeye sağladığı “hissedilebilirlik” avantajı ne anlama gelir?"
      ],
      anaDusunce: "Büyük roman karakterleri, sadece birer hayal ürünü değil; insanlığın temel felsefi sorularına verilmiş (veya sorulmuş) kanlı canlı yanıtlardır.",
      cikarimYapma: "Felsefi bir derinliğe sahip olmayan karakterler olay örgüsü içinde savrulan karton figürler olarak kalırken; düşünsel temeli olan karakterler metin bitse bile okurun zihninde var olmaya devam eder.",
      yardimciDusunceler: [
        "Karakterin iç dünyası, evrensel hakikatlerin sorgulandığı bir sahnedir.",
        "“Ontolojik tutarlılık”, karakterin felsefi inandırıcılığı için esastır.",
        "Roman soyut düşünceleri somut yaşam deneyimine tercüme eder."
      ],
      boslukDoldurma: "Bu yüzden iyi bir roman okumak, bir filozofun zihninde misafir olmak değil; o felsefeyle sokakta yürümek, acı çekmek ve hatta onunla birlikte ölmek demektir.",
      anlatimBicimi: "Açıklayıcı ve Örneklendirmeci Anlatım.",
      dusunceyiGelistirme: "Örneklendirme (Raskolnikov, Meursault), Tanımlama (“Ontolojik tutarlılık”), Benzetme (Karakteri “laboratuvar”a benzetme).",
      neuralWarning: "Metin, 'felsefe tarihinin kronolojik sıralamasından' veya 'yazarların biyografilerinden' bahsetmez. Odak noktanız 'karakter-düşünce ilişkisi' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Yazarın romanı felsefeyi 'hissedilir kılan' en güçlü disiplin olarak nitelemesinin temel nedeni nedir?",
      options: [
        { letter: "A", text: "Soyut felsefi kuramları somut bireylerin karar anları ve varoluşsal sancıları üzerinden yaşatması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Felsefe metinlerindeki tüm teorik terimleri basitleştirip yok etmesi.", isCorrect: false, type: "Kapsam Aşımı" },
        { letter: "C", text: "Karakterlerin hiçbir zaman ahlaki ve ontolojik ikilem yaşamaması.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Yalnızca tarihi olayları kronolojik olarak belgelemesi.", isCorrect: false, type: "Alakasız" }
      ],
      explanation: "Roman, felsefenin soyut kavramlarını bireyin somut varoluşsal krizleri üzerinden aktararak onları hissedilir kılar."
    }
  },
  {
    id: 104,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 4,
    title: "Edebiyat Eleştirisi ve Metin Deşifre Etme Kuramları",
    category: "Eleştiri Kuramları",
    duration: 5,
    difficulty: "İleri",
    skills: ["Yeni Eleştiri", "Psikanalitik", "Marksist Eleştiri", "Aktif Okuma"],
    text: `Bir romanı okumak “pasif” bir eylemken, onu “eleştirmek” metnin katmanlarını soymayı gerektiren aktif bir süreçtir. “Edebiyat Eleştirisi”, metne farklı açılardan ışık tutan çeşitli kuramsal çerçevelere (gözlüklere) dayanır. Örneğin; “Biyografik Eleştiri” eseri yazarın hayatıyla anlamlandırırken, “Toplumsal (Marksist) Eleştiri” eserdeki sınıf çatışmalarına ve ekonomik altyapıya odaklanır. “Psikanalitik Eleştiri”, Freudyen bir yaklaşımla karakterlerin bilinçaltını ve bastırılmış arzularını inceler. Modern dönemde yükselen “Yeni Eleştiri” ise yazarın niyetini veya dönemin şartlarını tamamen dışarıda bırakarak, metni kendi içinde kapalı ve bağımsız bir yapı olarak ele alır. Bir romanı değerlendirirken hangi kuramı seçtiğimiz, metinden alacağımız “anlam hasadını” doğrudan etkiler. Eleştiri, eseri yargılamak değil; onun nasıl inşa edildiğini ve hangi görünmez mekanizmalarla okuru etkilediğini “deşifre etmek” sanatıdır. (—-)`,
    idealAnswer: "Roman eleştirisi, eseri farklı bilimsel ve kuramsal mercekler altında inceleyerek metnin görünmeyen mekanizmalarını deşifre etme sürecidir.",
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
      konuDedektifi: "Edebiyat eleştirisi kuramları, metne yaklaşım yöntemleri ve eleştirinin işlevi.",
      hizliOzet: "Roman eleştirisi; eseri biyografik, toplumsal veya yapısal gibi farklı bilimsel/kuramsal mercekler altında inceleyerek, metnin derin anlam katmanlarını ortaya çıkarma sürecidir.",
      yazarinAmaci: "Eleştirinin sadece bir beğeni ifadesi olmadığını, metni “deşifre etmek” için kullanılan disiplinler arası bir yöntemler bütünü olduğunu göstermek.",
      soruUretimi: [
        "“Yeni Eleştiri” akımını diğer kuramlardan ayıran temel “bağımsızlık” unsuru nedir?",
        "Bir karakterin çocukluk travmalarına odaklanan bir inceleme hangi eleştiri türüne girer?",
        "Eleştirel yaklaşım, okurun metinle kurduğu “pasif” bağı nasıl “aktif” hale getirir?"
      ],
      anaDusunce: "Bir edebi metin, ona yöneltilen eleştirel sorular ve kuramsal yaklaşımlar ölçüsünde derinleşir; eleştiri, metnin görünmeyen iskeletini görünür kılar.",
      cikarimYapma: "Aynı romanı okuyan iki eleştirmenden birinin sınıf ayrımını, diğerinin bilinçaltı travmalarını görmesi metnin kusurundan değil, kullanılan kuramsal çerçevenin zenginliğindendir.",
      yardimciDusunceler: [
        "Eleştiri bir 'yargılama' değil, bir 'çözümleme' eylemidir.",
        "Seçilen kuram metinden elde edilecek anlam hasadını belirler.",
        "Yeni Eleştiri metni dışsal faktörlerden bağımsız, kapalı bir yapı olarak görür."
      ],
      boslukDoldurma: "Dolayısıyla, iyi bir eleştirmen metne bir ayna tutmakla kalmaz, o aynanın arkasındaki sırı da okura gösterir.",
      anlatimBicimi: "Açıklayıcı ve Sınıflandırıcı Anlatım.",
      dusunceyiGelistirme: "Örneklendirme (Marksist, Psikanalitik vb.), Karşılaştırma (Pasif okuma vs. Aktif eleştiri), Tanımlama (“Yeni Eleştiri”).",
      neuralWarning: "Metin, 'kitap satış rakamlarından' veya 'gazetelerdeki tanıtım yazılarından' bahsetmez. Odak noktanız 'kuramsal eleştiri metodolojisi' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "'Yeni Eleştiri' (New Criticism) anlayışının edebi metne yaklaşımındaki en belirgin özellik hangisidir?",
      options: [
        { letter: "A", text: "Yazarın biyografisini ve dönemin ekonomik koşullarını merkeze alması.", isCorrect: false, type: "Ters Mantık" },
        { letter: "B", text: "Yazarın niyetini ve dış etkenleri dışarıda bırakarak metni kendi içinde bağımsız bir yapı sayması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "C", text: "Karakterlerin bastırılmış rüyalarını psikanaliz testleriyle ölçmesi.", isCorrect: false, type: "Alakasız" },
        { letter: "D", text: "Eseri yalnızca okur satış rakamlarına göre değerlendirmesi.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Yeni Eleştiri, yazarın niyetini ve dış koşulları göz ardı edip metni kendi içinde kapalı ve bağımsız bir yapı olarak inceler."
    }
  },
  {
    id: 105,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 5,
    title: "Anlatıcı Türleri ve Güvenilmez Anlatıcı Stratejisi",
    category: "Anlatı Teknikleri",
    duration: 5,
    difficulty: "İleri",
    skills: ["Güvenilmez Anlatıcı", "Bakış Açısı", "Kurgusal Manipülasyon"],
    text: `Bir romanın dünyasına girdiğimizde karşılaştığımız ilk ve en önemli güç “Anlatıcı”dır. Anlatıcı, yazarın kendisi değil, hikayeyi aktarmak için seçtiği bir “maske”dir. Geleneksel romanda sıkça rastlanan “Hakim (Tanrısal) Bakış Açısı”, karakterlerin zihninden geçen en gizli düşünceleri, geçmişi ve geleceği bilir. Ancak modern edebiyatla birlikte bu otorite sarsılmış; yerini daha sınırlı, öznel ve hatta “Güvenilmez Anlatıcı” türlerine bırakmıştır. Güvenilmez anlatıcı; ya akıl sağlığı yerinde olmadığı için, ya çocuk olduğu için ya da gerçekleri kasten gizlediği için okuru manipüle eder. Bakış açısının değişmesi, okurun metne katılımını da değiştirir. Birinci tekil şahıs anlatıcı (“Ben”) bizi karakterin iç dünyasına hapsederken, gözlemci bakış açısı bizi bir kamera gibi dışarıda bırakır. Romanın “eleştirel analizi” yapılırken sorulacak ilk soru şudur: “Bu sesi kim duyuyor ve ona ne kadar güvenebilirim?” Çünkü anlatıcının sınırlılıkları, aslında romanın evreninin de sınırlarını çizer. (—-)`,
    idealAnswer: "Hikayeyi aktaran anlatıcının konumu ve güvenilirliği, okurun olayları algılama biçimini ve kurgusal gerçeği doğrudan belirler.",
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
      konuDedektifi: "Anlatıcı türleri, bakış açısı teknikleri ve anlatıcının okur üzerindeki manipülatif etkisi.",
      hizliOzet: "Hikayeyi aktaran sesin konumu (tanrısal, sınırlı veya güvenilmez oluşu), okurun olayları algılama biçimini ve metne duyduğu güveni doğrudan belirler.",
      yazarinAmaci: "Anlatıcının sadece bir ses değil, kurgunun dokusunu ve gerçeklik algısını inşa eden stratejik bir teknik olduğunu kavratmak.",
      soruUretimi: [
        "“Hakim Bakış Açısı” ile “Gözlemci Bakış Açısı” arasındaki temel epistemolojik fark nedir?",
        "Bir anlatıcıyı “Güvenilmez” yapan temel unsurlar neler olabilir?",
        "Birinci şahıs anlatımın okurda yarattığı “karakterle özdeşleşme” hissinin riskleri nelerdir?"
      ],
      anaDusunce: "Roman sanatı, sadece ne anlatıldığıyla değil, o anlatının kimin süzgecinden (bakış açısından) geçerek bize ulaştığıyla anlam kazanır.",
      cikarimYapma: "Eğer bir roman güvenilmez anlatıcı tekniğiyle yazılmışsa, okurun görevi pasif bir alıcı olmak değil, anlatılanların arkasındaki gizli gerçeği arayan bir dedektife dönüşmektir.",
      yardimciDusunceler: [
        "Anlatıcı ve yazar aynı kişi değildir.",
        "Modern roman, anlatıcının mutlak otoritesini sorgulamıştır.",
        "Anlatıcının sınırları romanın evreninin de sınırlarını belirler."
      ],
      boslukDoldurma: "Sonuç itibarıyla, her anlatıcı bize bir pencere sunar; ancak o pencerenin camının ne kadar kirli veya renkli olduğuna karar verecek olan tek kişi okurdur.",
      anlatimBicimi: "Açıklayıcı ve Tasnif Edici (Sınıflandırma).",
      dusunceyiGelistirme: "Karşılaştırma (Tanrısal vs. Güvenilmez), Tanımlama (Unreliable Narrator), Metafor (Anlatıcıyı 'maske' veya 'kamera'ya benzetme).",
      neuralWarning: "Metin, 'roman yazma kurslarından' veya 'yazarların biyolojik ses tonlarından' bahsetmez. Odak noktanız 'anlatı teknikleri' ve 'bakış açısı' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Metinde geçen 'Güvenilmez Anlatıcı' tekniğinin okur üzerinde yarattığı en temel etki nedir?",
      options: [
        { letter: "A", text: "Okuru anlatılan her şeye şüpheyle yaklaşan ve gizli hakikati arayan aktif bir dedektife dönüştürmesi.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Okurun olayların geleceğini kesin olarak öngörebilmesini sağlaması.", isCorrect: false, type: "Ters Mantık" },
        { letter: "C", text: "Romandaki tüm karakterlerin yazarın birebir kopyası olmasını garantilemesi.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Metnin edebi değerini ve psikolojik derinliğini tamamen yok etmesi.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Güvenilmez anlatıcı, kasten ya da kusurları yüzünden okuru manipüle ettiği için okur olayları sorgulayan bir araştırmacıya dönüşür."
    }
  },
  {
    id: 106,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 6,
    title: "Dostoyevski ve Polifonik (Çok Sesli) Anlatım",
    category: "Roman ve Anlatı",
    duration: 6,
    difficulty: "Akademik",
    skills: ["Polifoni", "Mihail Bahtin", "Etik Sorumluluk", "Diyalektik"],
    text: `Rus edebiyatı, özellikle de Fyodor Dostoyevski, romanı sadece bir hikaye anlatma aracı olmaktan çıkarıp insan ruhunun en uç sınırlarını zorlayan bir “metafizik arenaya” dönüştürmüştür. Dostoyevski külliyatının kalbinde, “insanın özgürlüğü” ve bu özgürlüğün getirdiği “etik sorumluluk” yatar. Onun karakterleri —başta Raskolnikov ve İvan Karamazov olmak üzere— sadece fiziksel dünyada değil, zihinlerindeki fikirler arasında yaşarlar. Dostoyevski için bir “suç”, sadece yasaların çiğnenmesi değil, insanın Tanrı ve kendi vicdanıyla girdiği amansız bir kavgadır. Romanlarında uyguladığı “Polifonik (Çok Sesli) Anlatım”, yazarın sesinin karakterlerin sesini bastırmadığı, her fikrin kendi hakikatini savunduğu bir yapı sunar. Bu durum, okuru tek bir doğruya yönlendirmek yerine, karakterlerin yaşadığı “ikilemlerin” ve “ruhsal parçalanmaların” içine iter. Dostoyevski’nin romanları, bireyin içindeki “aydınlık” ve “karanlık” arasındaki bitmek bilmeyen diyalektik mücadelenin belgesidir. (—-)`,
    idealAnswer: "Dostoyevski, romanı çok sesli bir alana dönüştürerek suçu, vicdanı ve insan ruhundaki aydınlık-karanlık çatışmasını metafizik bir çerçevede sorgulamıştır.",
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
      konuDedektifi: "Dostoyevski’nin romancılığı, insanın etik sorumluluğu ve Rus edebiyatındaki psikolojik/metafizik derinlik.",
      hizliOzet: "Dostoyevski, romanı bireyin vicdanıyla ve idealleriyle hesaplaştığı çok sesli bir alana dönüştürerek; suçu, özgürlüğü ve insan doğasındaki dualiteyi metafizik bir çerçevede sorgulamıştır.",
      yazarinAmaci: "Rus edebiyatının (ve özellikle Dostoyevski’nin) insan ruhunu çözümlemedeki eşsiz gücünü ve “polifonik anlatım” gibi teknik devrimlerini edebi bir perspektifle açıklamak.",
      soruUretimi: [
        "Dostoyevski’nin romanlarında “suç” kavramı yasal sınırların ötesinde nasıl bir anlam taşır?",
        "Mihail Bahtin tarafından ortaya atılan “Polifonik Anlatım” tekniği okurun metne katılımını nasıl etkiler?",
        "Karakterlerin “fikirler arasında yaşaması” ifadesi, Dostoyevski’nin anlatı tarzı hakkında ne söyler?"
      ],
      anaDusunce: "İnsan doğası, mutlak iyilik veya kötülükten ibaret değildir; Dostoyevski’nin romanları bu iki zıt kutup arasındaki gerilimi, bireyin özgürlük sancısı üzerinden evrensel bir boyuta taşır.",
      cikarimYapma: "Bir Dostoyevski romanı okumak, bir cinayeti çözmek değil; o cinayeti işleyen zihnin vicdan azabıyla nasıl parçalandığına şahitlik ederek kendi ahlaki pusulanı sorgulamaktır.",
      yardimciDusunceler: [
        "Yazar, karakterlerin sesini bastırmaz; onları kendi hakikatleriyle baş başa bırakır.",
        "İnsanın özgürlüğü, beraberinde ağır bir “etik sorumluluk” getirir.",
        "Roman aydınlık ve karanlık arasındaki diyalektik mücadeleyi belgeler."
      ],
      boslukDoldurma: "Bu yüzden Dostoyevski’yi okumak, sadece bir hikayeyi takip etmek değil; insanın kendi iç dünyasındaki uçurumlara korkusuzca bakma cesaretini göstermektir.",
      anlatimBicimi: "Açıklayıcı ve Çözümleyici (Analitik) Anlatım.",
      dusunceyiGelistirme: "Tanımlama (“Polifonik Anlatım”), Örneklendirme (Raskolnikov, İvan Karamazov), Terim Kullanımı (“Dualite”, “Metafizik”).",
      neuralWarning: "Metin, 'Rusya’nın coğrafi özelliklerinden' veya '19. yüzyıl siyasi tarihinden' doğrudan bahsetmez. Odak noktanız 'insan doğası' ve 'edebi metafizik' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Dostoyevski'nin romancılığında 'Polifonik Anlatım' tekniğinin varlığı ne anlama gelmektedir?",
      options: [
        { letter: "A", text: "Yazarın kendi dünya görüşünü karakterlere zorla dayatıp tek bir ses oluşturması.", isCorrect: false, type: "Ters Mantık" },
        { letter: "B", text: "Yazarın sesinin karakterleri bastırmadığı, her fikrin kendi hakikatini eşit güçle savunduğu çok sesli yapı.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "C", text: "Sadece müzik aletlerinin betimlendiği sahnelerin kullanılması.", isCorrect: false, type: "Alakasız" },
        { letter: "D", text: "Karakterlerin hiçbir içsel veya ahlaki çatışma yaşamaması.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Polifonik romanda yazar tek bir mutlak doğru dikte etmez; her karakter kendi hakikatinin bağımsız bir sesidir."
    }
  },
  {
    id: 107,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 7,
    title: "Romanda Kronotop: Mekan ve Psikolojik Zaman",
    category: "Anlatı Teknikleri",
    duration: 5,
    difficulty: "İleri",
    skills: ["Kronotop", "Bakhtin", "Psikolojik Zaman", "Mekan Algısı"],
    text: `Roman sanatı, karakterlerini boşlukta değil; belirli bir “zaman” ve “mekan” düzleminde var eder. Mikhail Bakhtin tarafından ortaya atılan “Kronotop” kavramı, bu iki unsurun metin içindeki ayrılmaz bütünlüğünü ifade eder. Mekan, sadece bir dekor değil; karakterin ruh halini yansıtan veya toplumsal baskıyı somutlaştıran bir “anlatı öznesidir”. Örneğin, dar bir çatı katı karakterin klostrofobik iç dünyasını simgelerken; geniş bozkırlar sonsuz bir özgürlük ya da belirsizlik hissi verir. “Zaman” ise romanda doğrusal (kronolojik) akmak zorunda değildir. “Oyunbaz Zaman” teknikleriyle geçmiş, gelecek ve şimdiki an iç içe geçebilir. Özellikle modern romanda “psikolojik zaman”, saatlerin ölçtüğü nesnel süreden koparak karakterin bilincindeki yoğunluğa göre genişler veya daralır. Bir romanın “eleştirel okuması” yapılırken, yazarın mekanı nasıl “kişiselleştirdiği” ve zamanı nasıl “büktüğü”, eserin derin yapısını anlamak için hayati önem taşır. (—-)`,
    idealAnswer: "Romanda mekan karakterin ruh halini yansıtan bir anlatı öznesi, zaman ise karakterin bilincine göre esneyen psikolojik bir boyuttur.",
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
      konuDedektifi: "Romanda zaman ve mekanın işlevi, Kronotop kavramı ve psikolojik zamanın anlatıdaki yeri.",
      hizliOzet: "Roman, mekanı bir karakter yansıtıcısı, zamanı ise karakterin bilincine göre şekillenen esnek bir yapı olarak kullanarak kurgunun koordinatlarını belirler.",
      yazarinAmaci: "Zaman ve mekanın kurguda sadece pasif birer arka plan olmadığını, anlatının felsefi ve psikolojik derinliğini inşa eden aktif bileşenler olduğunu göstermek.",
      soruUretimi: [
        "Mikhail Bakhtin'in “Kronotop” terimiyle edebiyat eleştirisine kattığı yenilik nedir?",
        "“Psikolojik zaman” ile “nesnel zaman” arasındaki fark karakter tahlillerine nasıl yansır?",
        "Mekanın bir “anlatı öznesi” olarak kullanılması, klasik betimlemelerden nasıl ayrılır?"
      ],
      anaDusunce: "Romanın gücü, fiziksel sınırları (mekan) ve akışı (zaman) karakterin içsel gerçekliğine göre yeniden kurgulayabilme esnekliğinde yatar.",
      cikarimYapma: "Bir romanda mekanın sürekli daralması veya labirentleşmesi, çoğu zaman karakterin çıkışsızlığını ve zihinsel sıkışmışlığını ifade eden bilinçli bir teknik tercihtir.",
      yardimciDusunceler: [
        "Mekan ve zaman birbirinden ayrı düşünülemez bir bütünlük (Kronotop) arz eder.",
        "Zamanın kırılması okuru doğrusal düşünceden uzaklaştırıp karakterin algı dünyasına yaklaştırır.",
        "Mekan pasif bir fon değil, aktif bir anlatı öznesidir."
      ],
      boslukDoldurma: "Öyleyse roman okumak, sadece bir hikayeyi takip etmek değil; yazarın inşa ettiği o özel zaman ve mekan mimarisinin içinde bir yolculuğa çıkmaktır.",
      anlatimBicimi: "Açıklayıcı ve Tanımlayıcı Anlatım.",
      dusunceyiGelistirme: "Terim Kullanımı (“Kronotop”, “Oyunbaz Zaman”), Örneklendirme (Çatı katı, Bozkır), Tanık Gösterme (Mikhail Bakhtin).",
      neuralWarning: "Metin, 'mimari tekniklerden' veya 'astronomik zaman hesaplarından' bahsetmez. Odak noktanız 'kurgusal koordinatlar' ve 'anlatı mimarisi' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Mikhail Bakhtin'in 'Kronotop' kavramı edebiyat kuramında hangi ilişkiyi açıklar?",
      options: [
        { letter: "A", text: "Metindeki zaman ve mekan unsurlarının birbirinden ayrılamaz kurgusal bütünlüğünü.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Şiirlerdeki aruz ölçüsü ile hece ölçüsünün matematiksel toplamını.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Yalnızca nesnel saat zamanına bağlı kalma kuralını.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Kitapların sayfa sayısı ile basım yılı arasındaki bağı.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Kronotop; romanda zaman ve mekanın kurgusal olarak iç içe geçtiği ve birbirini koşulladığı yapısal alanı tanımlar."
    }
  },
  {
    id: 108,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 8,
    title: "Modernizm ve Bilinç Akışı Tekniği",
    category: "Anlatı Teknikleri",
    duration: 6,
    difficulty: "İleri",
    skills: ["Bilinç Akışı", "James Joyce", "Virginia Woolf", "Öznel Gerçeklik"],
    text: `20. yüzyılın başında, geleneksel gerçekçilik anlayışının insanı anlatmada yetersiz kaldığını savunan modernistler, bakışlarını dış dünyadan “iç dünyaya” çevirdiler. Bu devrimin en güçlü silahı “Bilinç Akışı” tekniğidir. Bu teknik, karakterin zihninden geçen düşünceleri; mantıksal bir sıra, noktalama işareti veya gramer kısıtlaması gözetmeksizin, tıpkı zihinde belirdikleri o kaotik ve kesintisiz biçimiyle kağıda dökmeyi amaçlar. James Joyce’un Ulysses romanında doruk noktasına ulaşan bu yöntem, okuru karakterin mahrem zihinsel labirentine hapseder. Virginia Woolf ise bu akışı daha lirik ve duyusal bir boyuta taşıyarak, anlık algıların ve anıların insan kimliğini nasıl inşa ettiğini sorgular. “Roman eleştirisi” açısından bilinç akışı, sadece bir teknik değil; aynı zamanda modern insanın parçalanmış, huzursuz ve her an değişen psikolojisinin edebi bir yansımasıdır. Okur için bu metinler zorlayıcıdır; çünkü dışarıda olup biten olaylardan ziyade, zihnin içinde yankılanan serbest çağrışımları takip etmek zorundadır. (—-)`,
    idealAnswer: "Bilinç akışı, insan zihninin kaotik doğasını yansıtarak dış dünyadan iç dünyaya yönelen modernizmin en devrimci anlatım tekniğidir.",
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
      konuDedektifi: "Modernizmde bilinç akışı tekniği, James Joyce ve Virginia Woolf’un anlatım tarzları ve iç dünyayı yansıtma yöntemleri.",
      hizliOzet: "Bilinç akışı, insan zihninin kaotik ve serbest çağrışımlara dayalı doğasını yansıtmak için noktalama ve gramer kurallarını yıkan, modern insanın parçalanmışlığını iç sesler üzerinden anlatan bir tekniktir.",
      yazarinAmaci: "Geleneksel romanın dışsal gerçekliğine karşı, modernist yazarların “zihinsel gerçekliği” nasıl yeni ve devrimci bir dil ile inşa ettiklerini açıklamak.",
      soruUretimi: [
        "“Bilinç Akışı” tekniğinin geleneksel “İç Diyalog” yönteminden temel farkı nedir?",
        "James Joyce ve Virginia Woolf’un bu tekniği kullanış biçimlerindeki karakteristik ayrım nedir?",
        "Okur neden bu tür metinleri okurken “pasif bir alıcı” olmaktan çıkıp “aktif bir inşa ediciye” dönüşmek zorundadır?"
      ],
      anaDusunce: "Modern roman, insanı sadece eylemleriyle değil, zihnindeki kesintisiz ve düzensiz düşünce nehriyle tanımlayarak “gerçeklik” kavramını nesnellikten öznelliğe taşımıştır.",
      cikarimYapma: "Bilinç akışı tekniğiyle yazılmış bir eserde anlam aramak, bir bulmacayı çözmekten ziyade; karakterin zihinsel dalgalarına kapılıp onun duygu dünyasını hissetmeye çalışmaktır.",
      yardimciDusunceler: [
        "Modernist edebiyat, klasik olay örgüsünü ikinci plana atar.",
        "Dilin sınırları, karakterin zihninin sınırlarını temsil eder.",
        "Serbest çağrışımlar mantıksal ve gramatikal sıralamayı aşar."
      ],
      boslukDoldurma: "Kısacası, bilinç akışı sayesinde roman, bir ayna olmaktan çıkıp doğrudan insan beyninin içindeki nöronların dansına dönüşmüştür.",
      anlatimBicimi: "Açıklayıcı ve Karşılaştırmalı Anlatım.",
      dusunceyiGelistirme: "Tanımlama (“Bilinç Akışı”), Karşılaştırma (Joyce vs. Woolf), Metafor (Zihni bir “nehir” veya “labirent”e benzetme).",
      neuralWarning: "Metin, 'psikiyatrik tedavi yöntemlerinden' veya 'modern sanatın resimdeki yansımalarından' bahsetmez. Odak noktanız 'edebi teknik' ve 'zihinsel kurgu' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Bilinç akışı tekniğini klasik iç diyalogdan ayıran temel yapısal fark nedir?",
      options: [
        { letter: "A", text: "Düşüncelerin mantıksal sıra, gramer kuralları ve noktalama kısıtlaması olmadan serbest çağrışımlarla aktarılması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Yalnızca geçmişte yaşanmış savaşları kronolojik aktarması.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Metinde yazarın tüm kararları doğrudan dikte etmesi.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Sadece kafiyeli beyitlerle yazılmış olması.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Bilinç akışı; mantıksal sıra ve noktalama kısıtlaması olmaksızın zihnin kaotik düşünce zincirini olduğu gibi aktarır."
    }
  },
  {
    id: 109,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 9,
    title: "Distopik Edebiyat ve Uyarı Metinleri",
    category: "Edebi Türler",
    duration: 5,
    difficulty: "İleri",
    skills: ["Distopya", "1984 & Huxley", "Uyarı Edebiyatı", "Dil Manipülasyonu"],
    text: `Distopya, kelime anlamı olarak “kötü yer” demektir ve genellikle otoriter bir yönetimin, teknolojik denetimin veya çevresel felaketlerin hüküm sürdüğü “karşı-ütopik” toplumları tasvir eder. Roman türünde distopyalar, sadece gelecek tahmini yapmakla kalmaz; yazıldıkları dönemin toplumsal korkularını bir büyüteç altına alarak büyütürler. George Orwell’in “1984”ü “gözetleme ve dil manipülasyonunu”, Aldous Huxley’nin “Cesur Yeni Dünya”sı “haz odaklı uyuşturulmuş bir toplumu”, Ray Bradbury’nin “Fahrenheit 451″i ise “entelektüel yıkımı ve sansürü” işler. “Roman eleştirisi” açısından distopya, bir “uyarı edebiyatı”dır. Bu eserlerdeki karakterler genellikle sistemin dışına çıkmaya çalışan, “hatırlayan” ve “hisseden” aykırı bireylerdir. Distopik kurgunun başarısı, okura “Eğer böyle devam edersek sonumuz burası olacak” dedirtebilmesinden gelir. Bu metinler; özgürlük, hafıza ve insan onuru gibi kavramların yokluğunda insanın neye dönüşeceğini sorgulayan felsefi laboratuvarlardır. (—-)`,
    idealAnswer: "Distopya, günümüzün tehlikeli toplumsal eğilimlerini büyüterek geleceğe dair karanlık senaryolar kuran felsefi bir uyarı edebiyatıdır.",
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
      konuDedektifi: "Distopik edebiyatın tanımı, temel temaları ve toplumsal uyarı işlevi.",
      hizliOzet: "Distopya, günümüzün olumsuz eğilimlerini uç noktalara taşıyarak geleceğe dair karanlık senaryolar üreten ve insan özgürlüğünün yok oluşuna karşı okuru uyaran bir türdür.",
      yazarinAmaci: "Distopik romanların sadece karamsar birer kurgu olmadığını, aksine toplumsal farkındalık yaratan ve temel insan haklarını savunan felsefi birer eleştiri aracı olduğunu açıklamak.",
      soruUretimi: [
        "Bir metnin “Distopya” olarak sınıflandırılması için hangi temel yapısal unsurlara sahip olması gerekir?",
        "Orwell ve Huxley’nin kurguladığı denetim mekanizmaları arasındaki temel fark nedir?",
        "Distopik kahramanların ortak özelliği olan “hatırlama” ve “hissetme” yetisi sistem için neden tehlikelidir?"
      ],
      anaDusunce: "Distopik romanlar, gelecekteki hayali bir baskı rejiminden ziyade, bugünün dünyasında filizlenen tehlikeli eğilimlerin birer yansıması ve önleyici uyarısıdır.",
      cikarimYapma: "Distopyalarda dilin kısıtlanması veya kitapların yakılması düşünceyi yok etmenin ilk adımıdır; çünkü kavramları olmayan insan köleliğine karşı çıkacak bir fikir de üretemez.",
      yardimciDusunceler: [
        "Distopya, “Ütopya” kavramının karanlık ikizidir.",
        "Teknoloji ve siyaset, bu türde genellikle birer baskı aracı olarak kurgulanır.",
        "Karakterler sistemin dışına çıkan aykırı bireylerdir."
      ],
      boslukDoldurma: "Öyleyse distopya okumak, geleceğin karanlığından korkmak değil; bugünün ışığını korumak için gereken uyanıklığı kazanmaktır.",
      anlatimBicimi: "Açıklayıcı ve Betimleyici Analiz.",
      dusunceyiGelistirme: "Karşılaştırma (Ütopya vs. Distopya), Örneklendirme (1984, Cesur Yeni Dünya), Tanımlama (“Karşı-ütopya”).",
      neuralWarning: "Metin, 'bilim kurgu filmlerindeki görsel efektlerden' veya 'siyasi parti ideolojilerinden' bahsetmez. Odak noktanız 'edebi tür analizi' ve 'toplumsal eleştiri' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Distopik romanların bir 'uyarı edebiyatı' olarak nitelendirilmesinin temel nedeni hangisidir?",
      options: [
        { letter: "A", text: "Günümüzde filizlenen tehlikeli eğilimleri büyüterek gelecekteki insani çöküşe karşı farkındalık yaratması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Sadece teknolojik aletlerin nasıl çalıştığını tarif etmesi.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Kusursuz ve mutlu bir dünya vaat eden ütopyalar kurması.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Bütün dillerin tamamen ortadan kalktığını savunması.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Distopya bugünün korkularını büyüterek okura 'eğer böyle devam edersek sonumuz bu olur' uyarısını verir."
    }
  },
  {
    id: 110,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 10,
    title: "Kolektif Bilinçdışı, Arketipler ve Kahramanın Yolculuğu",
    category: "Mitoloji ve Psikoloji",
    duration: 6,
    difficulty: "İleri",
    skills: ["Carl Jung", "Arketip", "Joseph Campbell", "Monomyth"],
    text: `Modern roman, ne kadar özgün görünürse görünsün, temelinde Carl Jung’un tanımladığı “Kolektif Bilinçdışı”ndan beslenen “Arketip” yapıları taşır. Arketipler; “Kahraman”, “Bilge Yaşlı”, “Gölge” veya “Hilebaz” gibi, insanlık tarihi boyunca tüm kültürlerde ortak olan sembolik karakter kalıplarıdır. Joseph Campbell’in “Kahramanın Sonsuz Yolculuğu” kuramı, bir karakterin evden ayrılışı, sınavlarla karşılaşışı ve dönüşüm geçirerek geri dönüşü üzerine kurulu o sarsılmaz şablonu açıklar. Roman eleştirisinde bir karakteri “arketipsel” olarak incelemek, onun sadece o kitaba ait bir birey olmadığını, insan ruhunun evrensel bir yönünü temsil ettiğini anlamaktır. Örneğin; Harry Potter’dan Frodo’ya, Raskolnikov’dan Don Kişot’a kadar pek çok figür, bu kadim döngünün farklı duraklarında nefes alır. Arketip kullanımı, yazara okurla anında ve derinden bir bağ kurma imkanı verir; çünkü okur, karakterin ismini ilk kez duysa da onun ruhundaki “kadim yankıyı” tanır. (—-)`,
    idealAnswer: "Roman karakterleri, insanlığın ortak hafızasındaki arketipsel kalıplardan beslenerek zamansız ve evrensel bir bağ kurar.",
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
      konuDedektifi: "Romanlarda arketip kullanımı, kolektif bilinçdışı ve kahramanın yolculuğu döngüsü.",
      hizliOzet: "Roman karakterleri, insanlığın ortak hafızasındaki arketipsel kalıplardan (kahraman, bilge vb.) beslenir ve bu sayede okurla zamansız, evrensel bir bağ kurar.",
      yazarinAmaci: "Kurgusal karakterlerin özgünlüğünün arkasındaki o “kadim iskeleti” göstererek, edebiyatın mitoloji ve psikolojiyle olan derin bağını açıklamak.",
      soruUretimi: [
        "Carl Jung'un “Kolektif Bilinçdışı” kavramı roman karakterlerinin inşasını nasıl etkiler?",
        "Joseph Campbell'in “Monomyth” (Tek-mit) kuramı neden tüm hikayeler için bir anahtar görevi görür?",
        "Bir karakterin hem “özgün bir birey” hem de “bir arketip” olması çelişkili bir durum mudur?"
      ],
      anaDusunce: "Hikayeler değişse de, o hikayeleri taşıyan karakterlerin ruhsal kökenleri ve geçtikleri zorlu yollar, insanlığın ortak sembolik dili olan arketiplere dayanır.",
      cikarimYapma: "Modern bir romanda bir figürü okurken aslında ejderhayı öldüren kadim şövalye arketipinin güncel bir versiyonunu izliyor olabiliriz; zihin yeni isimleri eski kalıplarla anlamlandırır.",
      yardimciDusunceler: [
        "Arketip kullanımı okurda aşinalık ve güven duygusu yaratır.",
        "Kahramanın yolculuğu fiziksel bir seyahat kadar içsel bir olgunlaşma sürecidir.",
        "Kolektif bilinçdışı tüm kültürlerin ortak sembol deposudur."
      ],
      boslukDoldurma: "Dolayısıyla her yeni roman, aslında insanlığın o bitmek bilmeyen ve binlerce yıldır anlatılan ‘tek bir büyük hikayesinin’ yeni bir bölümüdür.",
      anlatimBicimi: "Açıklayıcı ve Kuramsal Analiz.",
      dusunceyiGelistirme: "Tanımlama (“Arketip”), Örneklendirme (Don Kişot, Harry Potter), Tanık Gösterme (Carl Jung, Joseph Campbell).",
      neuralWarning: "Metin, 'fantastik edebiyatın popülaritesinden' veya 'film senaryosu yazma tekniklerinden' doğrudan bahsetmez. Odak noktanız 'karakter psikolojisi' ve 'mitolojik temeller' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Yazarın belirttiği 'arketip kullanımı'nın edebi kurguya sağladığı en büyük avantaj nedir?",
      options: [
        { letter: "A", text: "Okurun ilk kez karşılaştığı karakterde bile kadim bir insanlık yankısı bularak anında derin bağ kurması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Romanın sayfa sayısını yarı yarıya azaltması.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Karakterlerin psikolojik derinlikten yoksun kalmasını sağlaması.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Yalnızca masal türünde kullanılabilmesi.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Arketipler insanlığın kolektif hafızasından beslendiği için okurda tanıdık ve derin bir evrensel duygu uyandırır."
    }
  },
  {
    id: 111,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 11,
    title: "Fransız Realizmi ve Balzac'ın Sosyolojik Aynası",
    category: "Edebi Akımlar",
    duration: 5,
    difficulty: "İleri",
    skills: ["Realizm", "Balzac", "İnsanlık Komedyası", "Toplumsal Belge"],
    text: `19. yüzyılın ortalarında Fransa’da filizlenen “Realizm” (Gerçekçilik), romantizmin duygusal taşkınlığına ve idealize edilmiş dünyasına bir tepki olarak doğmuştur. Bu akımın tartışmasız devi Honoré de Balzac, “İnsanlık Komedyası” adını verdiği devasa eserler bütünüyle, Fransız toplumunun adeta bir “envanterini” çıkarmıştır. Balzac’a göre romancı, toplumun “sekreteri” olmalıdır. Onun romanlarında karakterler, sadece bireysel arzularıyla değil; giydikleri kıyafetlerden yaşadıkları evin mobilyalarına, sosyal sınıflarından ekonomik hırslarına kadar her detayla gerçeğin birer parçasıdır. Realizmde mekan tasvirleri, karakterin kaderini belirleyen sosyo-ekonomik birer hapishanedir. Para, miras ve statü kavgası, realist romanın motor gücüdür. Bu dönemde roman, bilimsel bir titizlikle toplumu gözlemleyen, sınıflar arası geçişleri ve ahlaki çürümeyi belgeleyen bir “sosyolojik belge” niteliği kazanmıştır. (—-)`,
    idealAnswer: "Realizm, bireyi maddi ve sınıfsal koşullarıyla ele alarak romanı toplumun işleyişini belgeleyen sosyolojik bir ayna kılmıştır.",
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
      konuDedektifi: "Fransız Realizmi, Balzac’ın toplumsal gözlem yöntemi ve romanın sosyolojik işlevi.",
      hizliOzet: "Realizm, bireyi tüm maddi ve toplumsal koşullarıyla ele alarak romanı, toplumun işleyişini ve sınıfsal çatışmalarını belgeleyen bilimsel bir ayna haline getirmiştir.",
      yazarinAmaci: "Balzac ve realist ekolün, edebiyatı romantik hayallerden kurtarıp somut toplumsal gerçeklerin, paranın ve statünün yönettiği bir “gerçeklik laboratuvarına” nasıl dönüştürdüğünü açıklamak.",
      soruUretimi: [
        "Balzac’ın kendisini toplumun “sekreteri” olarak tanımlaması, yazarlık görevi hakkında ne söyler?",
        "Realist romanlarda mekan tasvirlerinin sadece “süs” olmamasının sebebi nedir?",
        "Romantizm ve Realizm arasındaki temel fark, karakterlerin “arzuları” noktasında nasıl şekillenir?"
      ],
      anaDusunce: "Realist roman, bireyin hikayesini toplumsal yapının kaçınılmaz bir sonucu olarak kurgulayarak edebiyata nesnel ve gözlemci bir kimlik kazandırmıştır.",
      cikarimYapma: "Bir realist roman okurken karakterin oturduğu koltuğun kumaşından veya eşyalarından bahsetmek, aslında onun toplumsal piramitteki yerini ve ahlaki kaderini haber vermektir.",
      yardimciDusunceler: [
        "Para ve miras hırsı, realist kurgunun temel çatışma alanıdır.",
        "“İnsanlık Komedyası”, toplumun bütüncül bir panoramasını sunmayı hedefler.",
        "Mekan tasvirleri sosyo-ekonomik belirleyicilerdir."
      ],
      boslukDoldurma: "Kısacası Balzac için roman, hayal kurmanın değil; çıplak gözle görülen o acımasız ve karmaşık gerçeği kağıda hapsetmenin sanatıdır.",
      anlatimBicimi: "Açıklayıcı ve Betimleyici Analiz.",
      dusunceyiGelistirme: "Karşılaştırma (Romantizm vs. Realizm), Tanımlama (“Realizm”), Metafor (Yazarı “sekreter”e benzetme).",
      neuralWarning: "Metin, 'Fransız İhtilali’nin askeri detaylarından' veya 'Balzac’ın kahve içme alışkanlıklarından' bahsetmez. Odak noktanız 'edebi akım' ve 'sosyolojik kurgu' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Balzac'ın romancıyı 'toplumun sekreteri' olarak nitelendirmesi, yazarlık anlayışına dair neyi vurgular?",
      options: [
        { letter: "A", text: "Romancının sadece kendi hayal gücünü yüceltmesi gerektiğini.", isCorrect: false, type: "Ters Mantık" },
        { letter: "B", text: "Yazarın toplumsal gerçekleri, sınıfsal dinamikleri ve ahlaki dönüşümü tarafsız bir gözlemci titizliğiyle kaydetme görevini.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "C", text: "Romanın tamamen masalsı ve doğaüstü unsurlarla donatılmasını.", isCorrect: false, type: "Alakasız" },
        { letter: "D", text: "Yazarların yalnızca resmi devlet belgelerini kopyalamasını.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Balzac için yazar, toplumsal hayatın, sınıfsal çatışmaların ve maddi koşulların tarafsız bir kâtibi gibi çalışmalıdır."
    }
  },
  {
    id: 112,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 12,
    title: "Romanda Karakter Analizi ve Buzdağı Teorisi",
    category: "Karakter Analitiği",
    duration: 5,
    difficulty: "İleri",
    skills: ["Buzdağı Teorisi", "Madame Bovary", "Raskolnikov", "Psikolojik Derinlik"],
    text: `Romanın gücü, olayların akışından ziyade, o olayların karakterin ruhunda yarattığı “tahribatta” gizlidir. Karakter analizi yaparken iki dev isim yol göstericidir: Gustave Flaubert ve Fyodor Dostoyevski. Flaubert’in “Madame Bovary”si, kendi sıradan hayatından duyduğu tiksintiyi romantik hayallerle bastırmaya çalışan, ancak bu hayallerin gerçekliğe çarpmasıyla parçalanan bir “arzu trajedisi”dir. Burada psikolojik derinlik, karakterin dış dünyayı kendi beklentileriyle “çarpıtması” üzerinden verilir. Öte yandan Dostoyevski, karakteri bir “fikrin mahkumu” olarak kurgular. “Suç ve Ceza”nın Raskolnikov’u, sadece bir cinayet işlemez; o cinayetin teorik haklılığı ile vicdanının irrasyonel baskısı arasında ruhsal bir “diseksiyon” (otopsi) geçirir. Modern roman eleştirisi, bir karakteri incelerken onun “psikolojik tutarlılığına” ve çevresel faktörlerin zihinsel süreçlerini nasıl dönüştürdüğüne odaklanır. Karakterin derinliği, okura sunulan “buzdağının altındaki” o görünmeyen duygu ve travma kütlesidir. (—-)`,
    idealAnswer: "Büyük romanlar, karakterlerini sadece eylemleriyle değil, buzdağının altındaki görünmeyen zihinsel çatışmalar ve arzular üzerinden inşa eder.",
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
      konuDedektifi: "Romanda karakter analizi, psikolojik derinlik oluşturma yöntemleri ve Flaubert ile Dostoyevski’nin yaklaşımları.",
      hizliOzet: "Büyük romanlar, karakterlerini sadece eylemleriyle değil, bu eylemlerin arkasındaki derin arzular, vicdan azapları ve zihinsel çatışmalar üzerinden inşa ederek onlara psikolojik bir gerçeklik kazandırır.",
      yazarinAmaci: "Karakterin iç dünyasının, olay örgüsünden daha önemli bir “anlatı katmanı” olduğunu ve edebi derinliğin karakterin zihinsel dönüşümünde yattığını açıklamak.",
      soruUretimi: [
        "“Madame Bovary” karakterinin yaşadığı trajedinin temelindeki “arzu ve gerçeklik çatışması” nedir?",
        "Dostoyevski'nin karakterlerini bir “fikrin mahkumu” olarak kurgulaması ne anlama gelir?",
        "Karakter analizinde kullanılan “buzdağı teorisi” edebi metne nasıl uygulanır?"
      ],
      anaDusunce: "Edebi başarı, karakterin sadece ne yaptığını anlatmak değil; neden yaptığını, yaparken ne hissettiğini ve bu hissin onu nasıl dönüştürdüğünü okura duyumsatabilmektir.",
      cikarimYapma: "Bir karakterin “psikolojik tutarlılığı”, onun her zaman mantıklı davranması değil; kendi içsel travmaları çerçevesinde okuru hatalarına bile ikna edebilmesidir.",
      yardimciDusunceler: [
        "Dış dünyadaki olaylar, iç dünyadaki fırtınaların sadece birer tetikleyicisidir.",
        "Karakter derinliği, yazarın karakterini bir 'laboratuvar deneği' gibi titizlikle incelemesiyle oluşur.",
        "Buzdağının altı görünmeyen travma kütlesini temsil eder."
      ],
      boslukDoldurma: "Öyleyse karakteri tanımak, onun ismini öğrenmek değil; onun zihnindeki karanlık dehlizlerde el yordamıyla ilerlemeyi göze almaktır.",
      anlatimBicimi: "Açıklayıcı ve Karşılaştırmalı Analiz.",
      dusunceyiGelistirme: "Karşılaştırma (Flaubert vs. Dostoyevski), Metafor (“Buzdağı”, “Laboratuvar”), Örneklendirme (Emma Bovary, Raskolnikov).",
      neuralWarning: "Metin, 'psikiyatrik klinik vaka analizlerinden' veya 'yazarların özel hayatlarındaki trajedilerden' bahsetmez. Odak noktanız 'edebi karakter inşası' ve 'analitik eleştiri' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Metinde 'buzdağının altındaki görünmeyen kütle' metaforu ile ne anlatılmak istenmiştir?",
      options: [
        { letter: "A", text: "Karakterin sadece fiziksel hareketlerinin ardında yatan bastırılmış travmaları, içsel çatışmaları ve görünmeyen ruhsal derinliği.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Romanın kutup bölgelerinde geçen soğuk iklim tasvirlerini.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Yazarın kitabın son sayfasını gizleme isteğini.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Tüm roman karakterlerinin kötü kalpli olduğunu.", isCorrect: false, type: "Ters Mantık" }
      ],
      explanation: "Buzdağı metaforu, görünen eylemlerin altında yatan devasa psikolojik arka planı ve bilinçdışı süreçleri ifade eder."
    }
  },
  {
    id: 113,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 13,
    title: "Büyülü Gerçekçilik ve Latin Amerika Anlatısı",
    category: "Edebi Akımlar",
    duration: 5,
    difficulty: "İleri",
    skills: ["Büyülü Gerçekçilik", "Márquez", "Yüzyıllık Yalnızlık", "Mit & Hakikat"],
    text: `“Büyülü Gerçekçilik”, gerçekçi bir anlatı içine doğaüstü veya büyülü unsurların, hiçbir şaşkınlık yaratmadan, hayatın doğal bir parçasıymış gibi yerleştirildiği edebi bir akımdır. Özellikle Latin Amerika edebiyatında Gabriel García Márquez, Isabel Allende ve Jorge Luis Borges gibi isimlerle devleşen bu tür, sömürgecilik sonrası toplumların karmaşık kimliğini ve efsanelerle örülü tarihini anlatmak için bir araçtır. Márquez’in “Yüzyıllık Yalnızlık” romanında havada uçan halılar veya yıllarca süren yağmurlar, karakterler tarafından bir doğa olayı kadar sakin karşılanır. Bu akımda “büyü”, gerçeği gizlemez; aksine rasyonel dilin anlatamadığı toplumsal travmaları, tutkuları ve kaderi daha görünür kılar. “Roman eleştirisi” perspektifinden bakıldığında, büyülü gerçekçilikte mantık aranmaz; onun yerine sembollerin ve mitlerin “duygusal hakikati” sorgulanır. Burada dünya hem çok somut hem de bir rüya kadar akışkandır. (—-)`,
    idealAnswer: "Büyülü gerçekçilik, olağanüstü olayları gündelik hayatın sıradanlığı içinde eriterek rasyonel aklın anlatamadığı toplumsal travmaları ve efsaneleri yansıtır.",
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
      konuDedektifi: "Büyülü gerçekçilik akımı, Latin Amerika edebiyatındaki işlevi ve gerçeklik ile mucizenin iç içe geçişi.",
      hizliOzet: "Büyülü gerçekçilik; olağanüstü olayları gündelik hayatın sıradanlığı içinde eriten, toplumsal gerçekleri mitler ve semboller aracılığıyla daha derinlemesine yansıtan özgün bir anlatı biçimidir.",
      yazarinAmaci: "“Büyü” unsurlarının bu türde bir kaçış değil, aksine rasyonel aklın yetersiz kaldığı alanlarda “hakikati” ifade etmenin bir yolu olduğunu açıklamak.",
      soruUretimi: [
        "Büyülü gerçekçilikte fantastik olayların karakterler tarafından “normal” karşılanması okurda nasıl bir etki yaratır?",
        "Gabriel García Márquez’in eserlerinde kullandığı doğaüstü imgeler toplumsal tarihle nasıl bir bağ kurar?",
        "Bu akımı “Fantastik Edebiyat”tan ayıran en temel “gerçeklik” eşiği nedir?"
      ],
      anaDusunce: "Büyülü gerçekçilik, mantığın sınırlarını zorlayarak hayatın sadece görünen yüzünden ibaret olmadığını, rüyaların ve efsanelerin de toplumsal hafızanın ayrılmaz bir parçası olduğunu savunur.",
      cikarimYapma: "Bir metinde uçan bir halı görüp kimse şaşırmıyorsa, yazarın amacı bizi şaşırtmak değil; o halının temsil ettiği özgürlük veya gelenek gibi soyut kavramları yaşamın merkezine oturtmaktır.",
      yardimciDusunceler: [
        "Akım, sömürgecilik sonrası toplumların sesini duyurma biçimidir.",
        "Semboller, rasyonel dilin anlatamadığı travmaları aktarır.",
        "Karakterler doğaüstü olayları gündelik bir doğallıkla karşılar."
      ],
      boslukDoldurma: "Öyleyse büyülü gerçekçilik, dünyayı bir laboratuvar titizliğiyle değil, bir masalın bilgeliğiyle okuma sanatıdır.",
      anlatimBicimi: "Açıklayıcı ve Betimleyici Analiz.",
      dusunceyiGelistirme: "Örneklendirme (Yüzyıllık Yalnızlık), Tanımlama (“Büyülü Gerçekçilik”), Karşılaştırma (Rasyonel dil vs. Sembolik dil).",
      neuralWarning: "Metin, 'okültizm (gizlicilik) pratiklerinden' veya 'Latin Amerika’nın turizm haritasından' bahsetmez. Odak noktanız 'edebi teknik' ve 'kültürel anlatı' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Büyülü Gerçekçilik akımını fantastik edebiyattan ayıran en belirgin anlatı tavrı nedir?",
      options: [
        { letter: "A", text: "Doğaüstü ve mucizevi olayların karakterler ve anlatıcı tarafından hiçbir şaşkınlık duyulmadan hayatın olağan akışı gibi karşılanması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Bütün karakterlerin robotlardan oluşması.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Metinde hiçbir sembol veya metafora yer verilmemesi.", isCorrect: false, type: "Ters Mantık" },
        { letter: "D", text: "Yalnızca gelecekte geçen uzay yolculuklarını konu alması.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Büyülü gerçekçilikte doğaüstü olaylar yadırganmaz; sıradan bir tabiat olayı gibi doğal kabul edilir."
    }
  },
  {
    id: 114,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 14,
    title: "Postmodern Roman, Üstkurgu ve Metinlerarasılık",
    category: "Modernizm & Postmodernizm",
    duration: 6,
    difficulty: "Akademik",
    skills: ["Üstkurgu", "Metinlerarasılık", "İroni & Parodi", "Umberto Eco"],
    text: `“Postmodern Roman”, modernizmin ciddiyetini ve “anlam arayışını” bir kenara bırakarak, kurgunun bir “oyun” olduğunu ilan eder. Bu türün en belirgin özelliği, bir metnin başka metinlere gönderme yapması veya onlardan beslenmesi anlamına gelen “Metinlerarasılık” kavramıdır. Postmodern yazarlar —Umberto Eco, Italo Calvino, Orhan Pamuk gibi— okuru sürekli şaşırtan “Üstkurgu” tekniğini kullanırlar. Bu teknikte yazar, anlattığı hikayenin bir “kurgu” olduğunu metnin içinde açıkça belirtir, hatta anlatıcı olarak okurla doğrudan konuşur. İroni, parodi ve pastiş (öykünme), postmodern anlatının temel yapı taşlarıdır. Roman artık dünyayı yansıtan bir ayna değil, aynaların birbirine baktığı bir “labirent”tir. “Roman eleştirisi” açısından postmodernizm, bütüncül ve mutlak bir anlamı reddeder; her okuma, metnin yeniden inşa edildiği öznel bir süreçtir. (—-)`,
    idealAnswer: "Postmodern edebiyat, kurguyu oyun olarak görerek metinlerarasılık ve üstkurguyla mutlak gerçeklik iddiasını yıkar.",
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
      konuDedektifi: "Postmodern romanın özellikleri, metinlerarasılık, üstkurgu tekniği ve anlamın çoğulluğu.",
      hizliOzet: "Postmodern edebiyat, kurguyu bir oyun alanı olarak görür; metinlerarası ilişkiler ve üstkurgu teknikleriyle okuru anlatının bir parçası yaparak mutlak gerçeklik iddiasını yıkar.",
      yazarinAmaci: "Postmodernizmin karmaşık görünen yapısının aslında edebiyatın kendi sınırlarıyla oynadığı, ironik ve çok katmanlı bir “özgürleşme” süreci olduğunu açıklamak.",
      soruUretimi: [
        "“Üstkurgu” tekniği okurun hikayeye duyduğu “inandırıcılık” hissini nasıl dönüştürür?",
        "“Metinlerarasılık”, bir okurun genel kültür birikimini metne nasıl dahil eder?",
        "Postmodern romanın bir “ayna” yerine “labirent”e benzetilmesinin sebebi nedir?"
      ],
      anaDusunce: "Postmodern roman, yazarın otoritesini sarsarak anlamı okur ile metin arasındaki oyunbaz etkileşime bırakır; tek bir doğru hikaye yoktur, farklı anlatım katmanları vardır.",
      cikarimYapma: "Bir postmodern romanda yazarın 'bu karakteri öldürüyorum çünkü hikaye böyle gerektiriyor' demesi, kurgunun yapaylığını gösterip okuru daha derin bir düşünme oyununa davet etmek içindir.",
      yardimciDusunceler: [
        "İroni ve parodi, klasik anlatı kalıplarıyla dalga geçmek için kullanılır.",
        "Metinler, kendilerinden önceki edebi eserlerin birer birleşimi veya yankısıdır.",
        "Tek ve mutlak bir anlam reddedilir."
      ],
      boslukDoldurma: "Sonuç olarak postmodernizmde roman, dünyayı anlatmak için değil; anlatılamayacak kadar karmaşık olan o dünyayı bir parça ironiyle karşılamak için yazılır.",
      anlatimBicimi: "Açıklayıcı ve Tanımlayıcı Analiz.",
      dusunceyiGelistirme: "Tanımlama (“Metinlerarasılık”, “Üstkurgu”), Örneklendirme (Eco, Pamuk), Metafor (Romanı bir “labirent”e benzetme).",
      neuralWarning: "Metin, 'modernizm sonrası mimari akımlardan' veya 'postmodern felsefenin siyasi sonuçlarından' bahsetmez. Odak noktanız 'edebi teknik' ve 'kurgusal oyunbazlık' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Postmodern romanda 'Üstkurgu' (Metafiction) tekniği uygulandığında aşağıdakilerden hangisi gerçekleşir?",
      options: [
        { letter: "A", text: "Yazar metnin bir kurgu olduğunu gizlemez, kurgunun inşa sürecini okura açık eder ve metne dahil olur.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Roman tamamen gerçek bir mahkeme tutanağına dönüşür.", isCorrect: false, type: "Ters Mantık" },
        { letter: "C", text: "Yazar hiçbir zaman kendi varlığından söz etmez.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Metin sadece tek bir mutlak doğruyu dikte eder.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Üstkurgu; yazarın anlatının bir kurmaca olduğunu okura hissettirmesi ve anlatı mimarisiyle açıkça oynamasıdır."
    }
  },
  {
    id: 115,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 15,
    title: "Bir Başyapıtın Anatomisi ve Edebi Ölçütler",
    category: "Eleştiri Kuramları",
    duration: 5,
    difficulty: "İleri",
    skills: ["Estetik Bütünlük", "Evrensellik", "Yenilikçilik", "Kanon"],
    text: `Bir romanın “başyapıt” olarak kabul edilmesi, sadece geniş kitleler tarafından okunmasıyla değil, zamanın aşındırıcı etkisine karşı direnebilmesiyle ölçülür. Edebi bir eseri değerlendirirken kullanılan ilk kriter “Estetik Bütünlük”tür; yani dilin, kurgunun ve temanın birbirini kusursuz bir mimariyle tamamlamasıdır. İkinci olarak, eserin “Evrensellik” boyutu sorgulanır: Anlatılan hikaye yerel bir dokuya sahip olsa bile, insanlığın ortak sancılarına (aşk, ölüm, adalet, yalnızlık) dokunabiliyor mu? Modern “roman eleştirisi”, ayrıca “Yenilikçilik” kriterine odaklanır; yazar kendinden önceki teknikleri mi tekrarlıyor, yoksa edebiyat diline yeni bir soluk mu getiriyor? Başyapıtlar genellikle “çok katmanlı” bir yapıya sahiptir; yani hem sıradan bir okura sürükleyici bir macera sunar hem de derinlemesine inceleme yapan bir eleştirmene felsefi keşif alanları açar. Son olarak, bir eserin “etki gücü”, kendinden sonra gelen yazarları ne ölçüde dönüştürdüğüyle sabittir. (—-)`,
    idealAnswer: "Bir romanın başyapıt niteliği; estetik bütünlüğü, evrensel temaları işlemesi, teknik yenilikçiliği ve kalıcı etki gücüyle belirlenir.",
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
      konuDedektifi: "Edebi eserlerin değerlendirilme kriterleri ve bir romanı başyapıt kılan temel nitelikler.",
      hizliOzet: "Bir romanın kalıcılığı ve “başyapıt” niteliği; estetik bütünlüğü, evrensel temaları işlemesi, teknik yenilikçiliği ve çok katmanlı anlam dünyasıyla belirlenir.",
      yazarinAmaci: "Edebi kalitenin öznel bir beğeniden ibaret olmadığını, bir eserin değerini saptamak için kullanılan nesnel ve kuramsal “ölçütleri” ortaya koymak.",
      soruUretimi: [
        "“Estetik Bütünlük” kavramı bir romanda neyi ifade eder?",
        "Bir eserin “Çok Katmanlı” olması, farklı okur profilleri için ne anlam ifade eder?",
        "Yenilikçilik (inovasyon), bir yazarın edebi kanondaki yerini nasıl belirler?"
      ],
      anaDusunce: "Gerçek bir başyapıt, zamanın sınırlarını aşarak her nesilde yeni bir anlam kazanan ve edebiyatın gelişim yönünü değiştiren estetik ve düşünsel bir anıttır.",
      cikarimYapma: "Bir kitabın çok satması (best-seller) onun başyapıt olduğu anlamına gelmez; çünkü popülerlik anlık bir ilgiye dayanırken, başyapıtlık kalıcı bir etkiye dayanır.",
      yardimciDusunceler: [
        "Evrensellik, yerelliği reddetmek değil, onu insanlık paydasında eritebilmektir.",
        "Etki gücü, eserin kendinden sonraki edebiyatı dönüştürme yeteneğidir.",
        "Başyapıtlar çok katmanlı anlam dünyaları sunar."
      ],
      boslukDoldurma: "Bu bağlamda bir başyapıt okumak, sadece bir hikayeyi bitirmek değil; bitmeyen bir tartışmaya ve bitmeyen bir keşfe ortak olmaktır.",
      anlatimBicimi: "Açıklayıcı ve Kanıtlayıcı Anlatım.",
      dusunceyiGelistirme: "Tanımlama (“Estetik Bütünlük”, “Evrensellik”), Sınıflandırma (Kriterlerin sıralanması), Metafor (Romanı bir “mimari yapı”ya benzetme).",
      neuralWarning: "Metin, 'kitap fiyatlarından' veya 'yayınevlerinin pazarlama stratejilerinden' bahsetmez. Odak noktanız 'estetik ve kuramsal değer takdiri' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Metne göre, bir eserin 'çok satan' (best-seller) olması ile 'başyapıt' olması arasındaki temel fark nedir?",
      options: [
        { letter: "A", text: "Çok satarlığın geçici ve anlık bir popülerliğe, başyapıtlığın ise zamana direnen kalıcı bir etki ve estetik bütünlüğe dayanması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Başyapıtların hiçbir zaman kütüphanelerde bulunamaması.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Çok satan kitapların daima ödül alması.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Başyapıtların yalnızca yerel konuları işlemesi.", isCorrect: false, type: "Ters Mantık" }
      ],
      explanation: "Popülerlik konjonktürel bir ilgiye dayanırken; başyapıtlık nesiller boyu süren evrensel derinlik ve kalıcılık gerektirir."
    }
  },
  {
    id: 116,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 16,
    title: "Varoluşçuluk (Existentialism) ve Karar Mekanizması",
    category: "Karakter ve Felsefe",
    duration: 6,
    difficulty: "İleri",
    skills: ["Varoluşçuluk", "Sartre Bulantı", "Camus Yabancı", "Absürd"],
    text: `“Varoluşçuluk” (Existentialism), 20. yüzyılın ortalarında sadece bir felsefe olarak kalmamış, roman türünü bireyin içsel krizlerini anlatan bir “etik laboratuvara” dönüştürmüştür. Bu akımın temel mottosu olan “varoluş özden önce gelir” ilkesi, roman karakterlerinin hazır bir kaderle değil, kendi seçimleriyle kendilerini inşa ettikleri anlamına gelir. Jean-Paul Sartre’ın “Bulantı”sındaki Roquentin, nesnelerin ve varlığın anlamsızlığı karşısında fiziksel bir tiksinti duyarken; Albert Camus’nün “Yabancı”sındaki Meursault, toplumsal normlara ve ölüme karşı sergilediği mutlak “kayıtsızlık” ile “saçma” (absürd) kavramının temsilcisi olur. Varoluşçu romanlarda olay örgüsü, karakterin “seçim yapma” zorunluluğu etrafında döner. Karakter, tanrının veya ideolojilerin yokluğunda, kendi ahlaki pusulasını bulmak zorundadır. “Roman eleştirisi” açısından bu eserler, bireyin toplum içindeki “yalnızlığını” ve anlamsız bir evrende anlam yaratma sorumluluğunun getirdiği o meşhur “kaygıyı” (anguish) belgeler. (—-)`,
    idealAnswer: "Varoluşçu roman, bireyin hazır kalıpların dışında kendi seçimleriyle özünü inşa etme sürecini ve anlamsızlık karşısındaki yabancılaşmasını işler.",
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
      konuDedektifi: "Varoluşçu romanın özellikleri, “saçma” kavramı ve bireyin anlamsızlık karşısındaki tutumu.",
      hizliOzet: "Varoluşçu roman, bireyi hazır kalıpların dışında ele alarak; onun anlamsız bir dünyada kendi değerlerini yaratma sürecini, özgürlük sancısını ve topluma yabancılaşmasını işler.",
      yazarinAmaci: "Edebiyatın felsefi bir sorgulama alanı olarak nasıl kullanıldığını ve varoluşçuluğun roman karakterini bir “karar mekanizması” olarak nasıl yeniden tanımladığını açıklamak.",
      soruUretimi: [
        "“Varoluşun özden önce gelmesi” ilkesi bir roman karakterinin gelişimini nasıl etkiler?",
        "Sartre’ın “Bulantı”sı ile Camus’nün “Yabancı”sı arasındaki “anlam” farkı nedir?",
        "Varoluşçu edebiyatta “kaygı” (anguish) neden olumsuz bir histen ziyade bir “farkındalık” olarak görülür?"
      ],
      anaDusunce: "İnsan, hiçbir önceden belirlenmiş anlamı olmayan bir evrende, kendi seçimlerinin toplamından ibarettir; varoluşçu roman bu ağır sorumluluğun sanatsal yansımasıdır.",
      cikarimYapma: "Bir karakter kurallara uymadığı için değil, o kuralların temelindeki anlamsızlığı gördüğü için dışlanıyorsa; o karakter edebi anlamda bir varoluşçu anti-kahramandır.",
      yardimciDusunceler: [
        "Seçim yapmak, özgürlüğün en ağır bedelidir.",
        "“Yabancılaşma”, hem topluma hem de kişinin kendi varlığına karşı olabilir.",
        "Karakter kendi ahlaki pusulasını kendisi bulmak zorundadır."
      ],
      boslukDoldurma: "Bu bağlamda varoluşçu bir roman okumak, okuru güvenli kıyılarından ayırıp kendi hayatının mimarı olması gerektiği gerçeğiyle yüzleştirir.",
      anlatimBicimi: "Açıklayıcı ve Tartışmacı Analiz.",
      dusunceyiGelistirme: "Örneklendirme (Bulantı, Yabancı), Tanımlama (“Varoluşçuluk”, “Saçma”), Tanık Gösterme (Sartre, Camus).",
      neuralWarning: "Metin, 'İkinci Dünya Savaşı’nın askeri stratejilerinden' veya 'karamsarlığın klinik psikolojisinden' bahsetmez. Odak noktanız 'edebi varoluşçuluk' ve 'karakter felsefesi' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Varoluşçu romandaki 'varoluş özden önce gelir' ilkesi karakter kurgusunda neyi ifade eder?",
      options: [
        { letter: "A", text: "Karakterin önceden belirlenmiş sabit bir kaderi olmayıp kendi kimliğini yaptığı seçimlerle inşa etmesini.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Karakterlerin hiçbir zaman hata yapmayan kusursuz varlıklar olduğunu.", isCorrect: false, type: "Ters Mantık" },
        { letter: "C", text: "Romanın yalnızca mitolojik yaratıklarla dolu bir dünyada geçmesini.", isCorrect: false, type: "Alakasız" },
        { letter: "D", text: "Bireyin toplumsal kurallara körü körüne itaat etmesi zorunluluğunu.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Varoluşçulukta insan hazır bir kalıpla doğmaz; yaptığı eylemler ve kararlarla kendi varoluşsal özünü yaratır."
    }
  },
  {
    id: 117,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 17,
    title: "Tarihsel Roman, Zamanın Ruhu ve Anakronizm",
    category: "Edebi Türler",
    duration: 5,
    difficulty: "İleri",
    skills: ["Zeitgeist", "Anakronizm", "Tolstoy", "Georg Lukács"],
    text: `Tarihsel roman, geçmişin “nesnel verilerini” kurmacanın “öznel dünyasıyla” harmanlayan zorlu bir türdür. Bu türün temel amacı, tarihi sadece kronolojik bir olaylar dizisi olarak sunmak değil; o dönemin ruhunu (Zeitgeist), insan ilişkilerini ve zihniyetini yeniden canlandırmaktır. Walter Scott ile temelleri atılan modern tarihsel roman, Leo Tolstoy’un “Savaş ve Barış” eserinde olduğu gibi, büyük tarihi olayların (savaşlar, devrimler) ortasındaki “küçük insanın” hikayesine odaklanır. “Roman eleştirisi” yaparken tarihsel romanlarda iki temel sınır sorgulanır: “Anakronizm” (tarihsel hata) ve “Kurgusal Sapma”. Yazar, tarihsel gerçekliğe ne kadar sadık kalmalı, ne kadarını hayal gücüyle doldurmalıdır? Georg Lukács’a göre, başarılı bir tarihsel roman, geçmişi bugünün gözlüğüyle çarpıtmak yerine, geçmişin kendi iç çelişkilerini bugüne taşıyabilen metindir. Karakterler, sadece tarihi figürlerin birer kopyası değil, o dönemin toplumsal dinamiklerinin ete kemiğe bürünmüş temsilcileri olmalıdır. (—-)`,
    idealAnswer: "Tarihsel roman, geçmişin somut verilerini kurgusal derinlikle birleştirerek dönemin ruhunu (Zeitgeist) ve küçük insanın hikayesini canlandırır.",
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
      konuDedektifi: "Tarihsel roman türünün tanımı, gerçeklik-kurgu ilişkisi ve türün yapısal sınırları.",
      hizliOzet: "Tarihsel roman, geçmişin somut verilerini kurgusal bir derinlikle birleştirerek; tarihi sadece bir bilgi yığını olmaktan çıkarıp, yaşanmış bir duygu ve zihniyet alanı haline getirir.",
      yazarinAmaci: "Tarihsel romanın başarısının sadece “doğru bilgi” aktarmakta değil, o bilgiyi kurgusal bir tutarlılıkla “insanileştirmekte” olduğunu vurgulamak.",
      soruUretimi: [
        "Tarihsel romanda “küçük insanın hikayesi”, büyük tarihi olayları anlamamıza nasıl yardımcı olur?",
        "“Anakronizm” bir tarihsel romanın edebi değerini nasıl etkiler?",
        "Georg Lukács'ın tarihsel roman hakkındaki temel ölçütü nedir?"
      ],
      anaDusunce: "İyi bir tarihsel roman, geçmişe sadece bir pencere açmakla kalmaz; okuru o pencereden içeri sokarak geçmişin atmosferini, çelişkilerini ve ruhunu duyumsatır.",
      cikarimYapma: "Bir yazar tarihi karakterlere günümüzün modern değerlerini (örneğin 12. yüzyıl şövalyesine 21. yüzyıl demokrasisini) söyletiyorsa bu bir anakronizmdir ve inandırıcılığı zedeler.",
      yardimciDusunceler: [
        "Karakterler, temsil ettikleri dönemin sosyal yapısından bağımsız düşünülemez.",
        "Kurgu, tarihin boş bıraktığı duygusal boşlukları doldurma sanatıdır.",
        "Zeitgeist (zamanın ruhu) eserin temel omurgasıdır."
      ],
      boslukDoldurma: "Dolayısıyla tarihsel roman, geçmişi bir müze gibi seyretmek değil; o müzedeki heykellerin damarlarında kanın aktığını hissetmektir.",
      anlatimBicimi: "Açıklayıcı ve Tanımlayıcı Analiz.",
      dusunceyiGelistirme: "Karşılaştırma (Nesnel veri vs. Öznel dünya), Tanımlama (“Anakronizm”, “Zeitgeist”), Örneklendirme (Savaş ve Barış).",
      neuralWarning: "Metin, 'tarih dersi müfredatından' veya 'arkeolojik kazı yöntemlerinden' bahsetmez. Odak noktanız 'kurgu sanatı' ve 'tarihsel temsil' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Tarihsel romanda 'Anakronizm' kavramı neyi ifade eder?",
      options: [
        { letter: "A", text: "Tarihsel dönemle uyuşmayan nesne, kavram veya düşüncelerin zamansal bir hata olarak esere sokulmasını.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Tarih kitaplarındaki dipnotların romanın sonuna eklenmesini.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Bütün karakterlerin gerçek tarihteki isimleriyle anılmasını.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Romanın tamamen hayali bir gelecekte geçmesini.", isCorrect: false, type: "Ters Mantık" }
      ],
      explanation: "Anakronizm, bir döneme ait olmayan unsurların tarihsel uyumsuzluk yaratacak şekilde o döneme taşınmasıdır."
    }
  },
  {
    id: 118,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 18,
    title: "Edebiyat Sosyolojisi ve Yapısal Benzerlik (Homoloji)",
    category: "Toplum ve Edebiyat",
    duration: 5,
    difficulty: "İleri",
    skills: ["Edebiyat Sosyolojisi", "Lucien Goldmann", "Homoloji", "Toplumsal Tanıklık"],
    text: `Roman, sadece bireysel bir yaratıcılığın ürünü değil; aynı zamanda üretildiği dönemin sosyal, ekonomik ve kültürel yapısının bir yansımasıdır. Edebiyat sosyolojisi açısından bakıldığında roman, toplumun “kolektif bilincini” ve sınıfsal çatışmalarını en net görebildiğimiz alanlardan biridir. Lucien Goldmann’ın “Roman Sosyolojisi” kuramına göre, romanın yapısı ile toplumun ekonomik yapısı arasında “yapısal bir benzerlik” (homoloji) bulunur. Örneğin, sanayi devrimi sonrası yükselen “bireycilik”, roman türünün odak noktasını topluluktan kişisel başarı ve başarısızlıklara kaydırmıştır. Roman; göç, kadın hakları, sınıfsal sömürü ve kültürel yozlaşma gibi meseleleri bir istatistik verisi gibi değil, bu süreçleri yaşayan “insan yüzleri” üzerinden anlatarak toplumsal bir “tanıklık” görevi üstlenir. Bu bağlamda “roman eleştirisi”, metni sadece edebi bir oyun olarak değil; toplumun geçirdiği dönüşümlerin, krizlerin ve umutların sessiz bir arşivi olarak değerlendirir. (—-)`,
    idealAnswer: "Roman, toplumun ekonomik ve sosyal dönüşümlerini kurgusal düzlemde yansıtan yaşayan bir arşividir.",
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
      konuDedektifi: "Romanın toplumsal yapıyla ilişkisi, edebiyat sosyolojisi ve romanın tanıklık işlevi.",
      hizliOzet: "Roman, içinde bulunduğu toplumun ekonomik ve sosyal değişimlerini kurgusal bir düzlemde yansıtan, toplumsal gerçekliği insan hikayeleriyle belgeleyen yaşayan bir arşividir.",
      yazarinAmaci: "Romanın sanatsal değerinin yanı sıra, toplumsal süreçleri anlama ve anlamlandırmadaki “sosyolojik değerini” ve tanıklık gücünü vurgulamak.",
      soruUretimi: [
        "Lucien Goldmann'ın “Homoloji” (yapısal benzerlik) kavramı roman ve toplum ilişkisini nasıl açıklar?",
        "Romanın toplumsal olayları bir “istatistik” yerine “insan yüzleri” üzerinden anlatması neyi değiştirir?",
        "Sanayi Devrimi gibi büyük kırılmalar romanın “konu ve yapı” tercihlerini nasıl etkilemiştir?"
      ],
      anaDusunce: "Edebiyat, toplumdan bağımsız bir ada değildir; her roman, yazıldığı dönemin sosyal DNA’sını ve sınıfsal gerilimlerini satır aralarında taşır.",
      cikarimYapma: "Bir dönemde yoksulluk ve göç temalı romanlarda artış görülüyorsa, bu salt bir moda değil; o toplumun yaşadığı gerçek sarsıntının kurgusal bir haykırışıdır.",
      yardimciDusunceler: [
        "Roman, toplumsal meseleleri duygusal bir hakikat ile sunar.",
        "Eleştirel okuma, metnin arkasındaki sosyal manzarayı görmeyi gerektirir.",
        "Goldmann'a göre ekonomik yapı ile roman formu arasında homoloji vardır."
      ],
      boslukDoldurma: "Öyleyse roman okumak, sadece bir hikayeye ortak olmak değil; o toplumun ruhunun nerede yaralandığını ve nereye doğru evrildiğini keşfetmektir.",
      anlatimBicimi: "Açıklayıcı ve Kanıtlayıcı Anlatım.",
      dusunceyiGelistirme: "Tanımlama (“Homoloji”), Örneklendirme (Sanayi Devrimi), Tanık Gösterme (Lucien Goldmann).",
      neuralWarning: "Metin, 'sosyoloji dersi metodolojisinden' veya 'siyasi propaganda tekniklerinden' bahsetmez. Odak noktanız 'edebi sosyoloji' ve 'toplumsal yansıma' olmalıdır!",
      cognitiveTime: "5 Dakika"
    },
    quizQuestion: {
      stem: "Lucien Goldmann'ın 'Homoloji' (yapısal benzerlik) kuramına göre roman ile toplum arasındaki ilişki nasıl tanımlanır?",
      options: [
        { letter: "A", text: "Romanın kurgusal yapısı ile toplumun ekonomik/sosyal yapısı arasında derin bir biçimsel ve yapısal paralellik bulunması.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Edebiyatın toplumdaki tüm ekonomik gelişmeleri tamamen görmezden gelmesi.", isCorrect: false, type: "Ters Mantık" },
        { letter: "C", text: "Yazarların yalnızca istatistik tabloları yayınlaması.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Romanların hiçbir toplumsal tanıklık görevi üstlenmemesi.", isCorrect: false, type: "Kapsam Aşımı" }
      ],
      explanation: "Homoloji kuramı, edebi form ile toplumun maddi/ekonomik altyapısı arasında yapısal bir örtüşme olduğunu savunur."
    }
  },
  {
    id: 119,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 19,
    title: "Oğuz Atay ve Türk Romanında İronik Kırılma",
    category: "Türk Edebiyatı",
    duration: 6,
    difficulty: "İleri",
    skills: ["Oğuz Atay", "Tutunamayanlar", "İroni", "Kimlik Krizi"],
    text: `Türk romanı, 1970’lere kadar genellikle toplumsal gerçekçi bir çizgide ilerlerken; Oğuz Atay, “Tutunamayanlar” ile bu gidişatı kökten değiştirmiştir. Atay, odağı dış dünyadaki sınıfsal çatışmalardan alıp bireyin “iç parçalanmışlığına”, kimlik bunalımına ve entelektüel yabancılaşmasına çevirmiştir. Onun romanlarında ironi, sadece bir mizah unsuru değil; katı toplumsal kurallara ve samimiyetsiz aydın tipine karşı bir “savunma mekanizması”dır. Atay; bilinç akışı, üstkurgu ve ansiklopedik anlatım gibi teknikleri kullanarak Türk edebiyatında postmodernizmin kapılarını aralamıştır. Karakterleri —Selim Işık veya Turgut Özben— ne tam Batılı ne de tam Doğulu olabilen, arafta kalmış, “kelimelerle yaşayan” ve bu yüzden hayata “tutunamayan” figürlerdir. “Roman eleştirisi” açısından Oğuz Atay, Türk insanının modernleşme sürecindeki ruhsal röntgenini çekmiş; bireyi kuşatan o boğucu “gelenek-modernite” kıskacını deşifre etmiştir. (—-)`,
    idealAnswer: "Oğuz Atay, Türk edebiyatında toplumsal gerçekçilikten bireysel varoluş sorgulamasına geçişi sağlayarak modern bireyin kimlik krizini ironiyle anlatmıştır.",
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
      konuDedektifi: "Oğuz Atay’ın Türk romanındaki önemi, bireyin iç dünyasına yöneliş, ironi ve “tutunamama” kavramı.",
      hizliOzet: "Oğuz Atay, Türk edebiyatında toplumsal gerçekçilikten bireysel varoluş sorgulamasına geçişi sağlayan; ironi ve yenilikçi tekniklerle modern bireyin kimlik krizini anlatan devrimci bir yazardır.",
      yazarinAmaci: "Oğuz Atay’ın sadece bir romancı değil, Türk aydınının ve bireyinin psikolojik derinliğini “iç sesler” ve “ironi” üzerinden keşfeden bir dil mimarı olduğunu göstermek.",
      soruUretimi: [
        "Oğuz Atay’ın eserlerinde “İroni” neden bir mizah öğesinden ziyade bir savunma mekanizmasıdır?",
        "“Tutunamayan” karakterlerin ortak özelliği olan “kelimelerle yaşama” durumu, gerçek hayatla bağlarını nasıl etkiler?",
        "Atay’ın kullandığı “Üstkurgu” ve “Bilinç Akışı” teknikleri Türk romanına ne tür bir özgürlük kazandırmıştır?"
      ],
      anaDusunce: "Oğuz Atay’ın eserleri; toplumsal kalıplara sığamayan, kendi iç dünyasının zenginliği içinde yalnızlaşan modern bireyin trajikomik destanıdır.",
      cikarimYapma: "Bir karakter toplumun sunduğu başarı kriterlerini reddedip zihnindeki oyunlarla meşgul oluyorsa, bu bir tembellik değil; sığ bulduğu dış dünyaya karşı pasif bir direniştir.",
      yardimciDusunceler: [
        "Oğuz Atay, Türk edebiyatında postmodernizmin öncüsüdür.",
        "Karakterleri Doğu ve Batı değerleri arasında sıkışmışlığın acısını çeker.",
        "İroni, samimiyetsiz aydın tipine karşı bir kalkan vazifesi görür."
      ],
      boslukDoldurma: "Dolayısıyla Oğuz Atay okumak, aynada kendimize bakıp gülerken aynı zamanda o aynanın arkasındaki boşluğun derinliğini fark etmektir.",
      anlatimBicimi: "Açıklayıcı ve Çözümleyici Analiz.",
      dusunceyiGelistirme: "Karşılaştırma (Toplumsal gerçekçilik vs. Bireyin iç dünyası), Tanımlama (“Tutunamayan”, “İroni”), Örneklendirme (Selim Işık, Turgut Özben).",
      neuralWarning: "Metin, 'yazarın mühendislik kariyerinden' veya 'kitabın yayınlandığı dönemdeki siyasi olaylardan' bahsetmez. Odak noktanız 'edebi kimlik' ve 'iç dünya kurgusu' olmalıdır!",
      cognitiveTime: "6 Dakika"
    },
    quizQuestion: {
      stem: "Oğuz Atay'ın eserlerinde 'İroni' kavramı temelde hangi işlevi üstlenir?",
      options: [
        { letter: "A", text: "Katı toplumsal kurallara ve samimiyetsiz aydın tipine karşı zihinsel bir savunma mekanizması ve direnme biçimi oluşturmayı.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "B", text: "Yalnızca basit komedi fıkraları anlatmayı.", isCorrect: false, type: "Alakasız" },
        { letter: "C", text: "Tüm yabancı kelimeleri Türkçeden çıkarmayı.", isCorrect: false, type: "Çelişkili" },
        { letter: "D", text: "Bilinç akışı tekniğini kullanmayı yasaklamayı.", isCorrect: false, type: "Ters Mantık" }
      ],
      explanation: "İroni Atay'da basit bir mizah değil; sahte değerlere ve dayatılan rollere karşı bireyin korunaklı zırhıdır."
    }
  },
  {
    id: 120,
    workshopId: 1,
    workshopTitle: "İleri Düzey Paragraf ve Metin Analitiği Atölyesi 1",
    articleNumber: 20,
    title: "Eleştirel Okuma Stratejileri ve Metnin Geleceği",
    category: "Eleştiri Kuramları",
    duration: 7,
    difficulty: "Akademik",
    skills: ["Hipermetin", "Derin Yapı", "Okur Özerkliği", "Bilişsel Analiz"],
    text: `“Eleştirel Okuma”, bir metni sadece tüketmek değil, onu yeniden inşa etmektir. Bu serinin başından beri incelediğimiz her durak —anlatıcı türlerinden arketiplere, bilinç akışından sosyolojik tanıklığa kadar— aslında okurun eline verilmiş birer “analiz anahtarıdır”. Modern dünyada metnin geleceği, dijitalleşen anlatılar ve hipermetinler (hypertext) ile yeni bir evreye girmektedir. Ancak temel ilke değişmez: Okur, metnin yüzeyindeki olay örgüsünden sıyrılıp “anlamın derin yapısına” inebildiği ölçüde özgürleşir. Eleştirel bir okur, metne şu üç temel soruyla yaklaşır: “Yazar bu dünyayı nasıl kurdu?”, “Hangi ideolojik veya psikolojik alt metinleri gizledi?” ve “Bu metin benim dünyamda hangi boşluğu dolduruyor?”. Romanın geleceği, yapay zeka tarafından üretilen metinlerde bile, insanın “anlamlandırma” yetisiyle şekillenmeye devam edecektir. Metin bir son değil, yazar ve okur arasındaki bitmek bilmeyen bir diyalogdur. (—-)`,
    idealAnswer: "Eleştirel okuma, okurun teknik donanımıyla metnin derin yapısına sızıp anlamı yeniden üretme ve sorgulama sürecidir.",
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
      konuDedektifi: "Eleştirel okuma stratejileri, okurun aktif rolü ve metnin teknolojik geleceği.",
      hizliOzet: "Eleştirel okuma, okurun teknik donanımıyla metnin derin yapısına sızıp anlamı yeniden üretmesi sürecidir ve bu yetenek, anlatı biçimleri değişse de edebi değerin merkezinde kalacaktır.",
      yazarinAmaci: "Atölye boyunca öğrenilen tekniklerin birer araç olduğunu hatırlatarak, okuru metin karşısında pasif bir alıcı olmaktan çıkarıp “aktif bir eleştirmene” dönüştürmek.",
      soruUretimi: [
        "“Hipermetin” ve dijitalleşme, geleneksel roman okuma deneyimini nasıl dönüştürebilir?",
        "Okurun metne yönelttiği “alt metin” sorgulaması neden bir “özgürleşme” eylemidir?",
        "Yapay zeka metin üretiminde insanın “anlamlandırma” gücünün yerini alabilir mi?"
      ],
      anaDusunce: "Roman, durağan bir yapı değil; okurun analiz ve yorum yeteneğiyle her okumada yeniden canlanan, zamansız ve dinamik bir diyalog alanıdır.",
      cikarimYapma: "Bir okur anlatıcının güvenilirliğini sorgulamaya ve mekanın psikolojik işlevini görmeye başlıyorsa, artık sadece bir hikaye okumuyor; sanat eserinin şifrelerini çözüyor demektir.",
      yardimciDusunceler: [
        "Teknoloji değişse de insani “anlam arayışı” edebiyatın motor gücü olmaya devam eder.",
        "Eleştirel okuma, yazarın manipülasyonuna karşı bir zihinsel savunmadır.",
        "Metin yazar ve okur arasındaki dinamik bir diyalogdur."
      ],
      boslukDoldurma: "Öyleyse gerçek okuma, kitabın son sayfasını kapatınca bitmez; o sayfanın zihninizde açtığı yeni pencerelerden dünyaya bakmaya başladığınızda asıl okuma başlar.",
      anlatimBicimi: "Özetleyici, Kanıtlayıcı ve Gelecek Odaklı Analiz.",
      dusunceyiGelistirme: "Soru Yoluyla Düşündürme, Tanımlama (“Eleştirel Okuma”), Metafor (Okuru bir “mimar”a, analizi bir “anahtar”a benzetme).",
      neuralWarning: "Metin, 'hızlı okuma tekniklerinden' veya 'kitap kağıdı maliyetlerinden' bahsetmez. Odak noktanız 'bilişsel analiz' ve 'edebi sentez' olmalıdır!",
      cognitiveTime: "7 Dakika"
    },
    quizQuestion: {
      stem: "Eleştirel bir okurun metin karşısındaki konumunu en iyi özetleyen yaklaşım hangisidir?",
      options: [
        { letter: "A", text: "Yalnızca olay örgüsünü ezberleyip yazarın dediklerini sorgulamadan kabul etmek.", isCorrect: false, type: "Ters Mantık" },
        { letter: "B", text: "Metnin alt metinlerini, anlatı stratejilerini ve ideolojik yapısını sorgulayarak anlamı aktif biçimde yeniden inşa etmek.", isCorrect: true, type: "Doğru Cevap" },
        { letter: "C", text: "Kitabı mümkün olan en kısa sürede hiç düşünmeden bitirmek.", isCorrect: false, type: "Alakasız" },
        { letter: "D", text: "Tüm kurgusal metinleri tarihi gerçek belgeler saymak.", isCorrect: false, type: "Çelişkili" }
      ],
      explanation: "Eleştirel okur; yüzeydeki olay örgüsünün altına inerek metnin derin yapısını deşifre eden ve anlamı yeniden üreten aktif bir özne konumundadır."
    }
  }
];
