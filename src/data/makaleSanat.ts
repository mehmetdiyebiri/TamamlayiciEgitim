import { MakaleItem } from './makaleTypes';

export const SANAT_ARTICLES: MakaleItem[] = [
  {
    id: 401,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 1,
    title: "İzlenimcilik (Empresyonizm) ve Tuvalde Işığın Devrimi",
    category: "Sanat",
    duration: 8,
    difficulty: "Orta",
    skills: ["Sanat Tarihi", "Görsel Algı"],
    text: "19. yüzyılın ikinci yarısında fotoğraf makinesinin icat edilmesi ve yaygınlaşması, Batı resim sanatını yüzyıllardır sürdürdüğü 'nesneleri ve insanları tuvalde birebir kopyalama' (mimesis) mecburiyetinden kurtardı. Bir portreyi veya manzarayı gerçeğe en yakın biçimde dondurmak artık mekanik bir aletin saniyelik işi haline gelince, ressamlar 'Resim, fotoğrafın yapamadığı neyi yapabilir?' sorusuyla yüzleşti. Bu arayışın öncüleri olan Claude Monet, Auguste Renoir, Camille Pissarro ve Edgar Degas; Paris Kraliyet Akademisi'nin koyu gölgeli, ağır vernikli ve mitolojik temalarla bezeli stüdyo ortamlarını terk ederek şövalelerini açık havaya (en plein air) taşıdılar.\n\nİzlenimciler için tuvaldeki asıl aktör bir katedral, saman balyası ya da nilüfer göleti değildi; günün hızla değişen saatlerinde, rüzgarın estiği anlarda o nesnelerin yüzeyine çarpan güneş ışığının insan retinasında bıraktığı anlık titreşimdi. Işık her dakika değiştiği için ressamların hızla fırça sallaması gerekiyordu. Bu aciliyet, akademik resmin pürüzsüz yüzey işçiliğini yıkarak yerini kalın, belirgin ve spontane fırça darbelerine bıraktı. Üstelik tüp boyanın icadı, ressamların dışarıda çalışmasını kolaylaştırdı. Paletlerinden mutlak siyahı ve kasvetli kahverengileri çıkaran İzlenimciler, gölgeleri dahi mor, lacivert ve mavi tonlarla renklendirdiler. Renkleri palette karıştırıp çamurlaştırmak yerine, saf renk dokunuşlarını tuval üzerinde yan yana bıraktılar; böylece renklerin kaynaşması tuvalde değil, izleyicinin göz bebeğinde optik bir rezonansla (optik karışım) gerçekleşti. Monet'nin 'İzlenim: Gün Doğumu' tablosuyla alaycı bir eleştirmenden adını alan bu akım, modern sanatın kapılarını ardına kadar açtı.",
    idealAnswer: "İzlenimcilik, nesneleri birebir taklit etmek yerine ışığın ve anın yarattığı algısal titreşimi açık havada, saf renk vuruşları ve optik karışımla tuvale aktararak modern resmi başlatmıştır.",
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
      konuDedektifi: "İzlenimcilik akımının ortaya çıkış koşulları, açık hava resmi ve optik renk kaynaşması tekniği.",
      hizliOzet: "Fotoğrafın yayılmasıyla taklitten kurtulan İzlenimciler, açık havada ışığın değişken etkisini saf fırça vuruşlarıyla izleyicinin retinasına emanet etmiştir.",
      yazarinAmaci: "İzlenimciliğin akademik kuralları yıkarak ışık ve an algısını modern resmin merkezine nasıl yerleştirdiğini açıklamak.",
      soruUretimi: [
        "Fotoğrafın icadı ressamları neden açık havaya yöneltti?",
        "Optik karışım tekniği palette karıştırmaktan nasıl farklılaşır?",
        "Tüp boyanın icadı ressamların pratiğini nasıl değiştirdi?"
      ],
      anaDusunce: "İzlenimcilik, resmin amacını nesneleri durağan biçimde kopyalamaktan çıkarıp ışığın gözdeki anlık yansımasını ve rengin optik enerjisini yakalamaya dönüştürmüştür.",
      cikarimYapma: "Sanatsal yenilikler hem teknik icatlarla (fotoğraf, tüp boya) hem de yerleşik akademizme meydan okuyan felsefi bakışlarla beslenir.",
      yardimciDusunceler: [
        "Akademi stüdyoları terk edilip açık havaya çıkıldı.",
        "Asıl konu ışığın nesneler üzerindeki anlık titreşimidir.",
        "Siyah renk dışlanmış, gölgeler renklendirilmiştir.",
        "Renkler tuvalde değil izleyicinin retinasında birleşir."
      ],
      boslukDoldurma: "Renkleri palette karıştırmak yerine saf fırça dokunuşlarını yan yana bırakarak optik kaynaşmayı sağladılar.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Akademi stüdyosu vs Açık hava), Örneklendirme ve Neden-Sonuç",
      neuralWarning: "İzlenimcilerin bitmemiş hissi veren fırça darbelerinin bir eksiklik değil, ışık hızını yakalama tekniği olduğunu unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "İzlenimci ressamların renkleri palette karıştırmak yerine tuvale saf darbeler halinde yan yana koymalarının **asıl amacı** nedir?",
      options: [
        { letter: "A", text: "Boya masraflarını en aza indirmek", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Işığın titreşimini koruyarak rengin izleyicinin retinasında optik olarak kaynaşmasını sağlamak", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Tabloların kuruma süresini geciktirmek", isCorrect: false, type: "detay" },
        { letter: "D", text: "Fotoğraf makineleriyle tam bir uyum yakalamak", isCorrect: false, type: "detay" }
      ],
      explanation: "Metne göre renkler palette karıştırılmayıp tuvalde yan yana getirilmiş; böylece renk karışımı izleyicinin retinasında ve beyninde gerçekleşerek ışığın titreşimi canlı tutulmuştur."
    }
  },
  {
    id: 402,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 2,
    title: "Mimaride Biçim ve İşlev: Bauhaus Okulu ve Modernizm",
    category: "Sanat",
    duration: 8,
    difficulty: "Orta",
    skills: ["Tasarım Analitiği", "Kültürel Dönüşüm"],
    text: "Birinci Dünya Savaşı'nın yarattığı devasa yıkımın ardından 1919 yılında Almanya'nın Weimar kentinde mimar Walter Gropius tarafından kurulan Bauhaus Sanat ve Tasarım Okulu; yalnızca mimarlıkta değil, mobilyadan tipografiye kadar gündelik hayatın tüm nesnelerinde radikal bir estetik devrim gerçekleştirdi. 19. yüzyıl burjuva zevki; binaları, sandalyeleri ve çaydanlıkları işlevsiz alçı kabartmalar, gösterişli oymalar ve altın varaklı süslemelerle donatarak sınıfsal ihtişamı sergilemeyi amaçlıyordu. Bauhaus ise bu süslemeci yaklaşımı 'burjuva kibri ve gereksiz malzeme israfı' olarak nitelendirip mahkum etti.\n\nAmerikalı mimar Louis Sullivan'ın ünlü 'Biçim işlevi izler' (Form follows function) ilkesini temel manifesto edinen Bauhaus; bir yapının ya da nesnenin güzelliğinin ona sonradan yapıştırılan süslerden değil, amacına ne kadar kusursuz hizmet ettiğinden ve malzemesinin dürüstlüğünden kaynaklandığını savundu. Çelik borular, cam cepheler, betonarme taşıyıcılar ve yalın geometrik formlar ilk kez gizlenmeden, estetik birer öğe olarak sergilendi. Marcel Breuer'in çelik borulardan ürettiği hafif ve dayanıklı 'Wassily Sandalyesi', hem seri üretime uygundu hem de her sınıftan insanın evine girebilecek kadar sade ve işlevseldi. Bauhaus'un nihai ülküsü, sanatı zengin elitlerin salonlarından çıkarıp seri üretim teknolojisiyle birleştirerek toplumun geniş kesimleri için aydınlık, havadar, uygun maliyetli ve estetik konutlar ile gündelik eşyalar üretmekti. Bugün oturduğumuz ergonomik ofis koltuklarından yaşadığımız modern camlı binalara kadar çevremizdeki minimalist dünya, Bauhaus'un bu vizyoner mirasını taşır.",
    idealAnswer: "Bauhaus, biçimin işleve hizmet etmesi gerektiğini savunarak süslemeciliği reddetmiş; çelik, cam ve betonu yalın formlarla buluşturarak modern endüstriyel tasarımı doğurmuştur.",
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
      konuDedektifi: "Bauhaus okulunun mimari ve tasarım felsefesi, süse karşı işlevsellik ve malzemenin dürüstlüğü.",
      hizliOzet: "1. Dünya Savaşı sonrası kurulan Bauhaus, süsü reddedip işlev ve seri üretimi birleştirerek modern minimalist mimariyi şekillendirmiştir.",
      yazarinAmaci: "Tasarımda estetiğin gösterişli süslerde değil amaca uygunlukta yattığını Bauhaus felsefesi üzerinden anlatmak.",
      soruUretimi: [
        "'Biçim işlevi izler' ilkesi ne anlama gelir?",
        "Bauhaus'un 19. yüzyıl burjuva zevkine eleştirisi nedir?",
        "Marcel Breuer'in sandalye tasarımındaki devrim nedir?"
      ],
      anaDusunce: "Bir tasarımın gerçek değeri sonradan eklenen süslemelerinde değil; işlevine hizmet etmesinde, malzeme dürüstlüğünde ve insan hayatını kolaylaştırmasında yatar.",
      cikarimYapma: "Endüstriyel üretim sanatı dışlamak zorunda değildir; doğru tasarım felsefesiyle seri üretim estetik ve demokratikleşmeyi sağlar.",
      yardimciDusunceler: [
        "Walter Gropius tarafından 1919'da kuruldu.",
        "Biçim işlevi izler ilkesi benimsendi.",
        "Cam, çelik ve beton gizlenmeden kullanıldı.",
        "Eşyaların halkın geneli için üretilmesi hedeflendi."
      ],
      boslukDoldurma: "Bir nesnenin güzelliği ona sonradan yapıştırılan süslerden değil, amacına ne kadar kusursuz hizmet ettiğinden kaynaklanır.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Karşılaştırma (Süslemeci 19. yy vs Bauhaus), Örneklendirme ve Tanımlama",
      neuralWarning: "Bauhaus'un estetiği yok etmediğini, estetiği işleve ve sadeliğe bağladığını unutmayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Bauhaus tasarım okulunun benimsediği 'Biçim işlevi izler' ilkesi aşağıdakilerden hangisini savunur?",
      options: [
        { letter: "A", text: "Bir yapının veya nesnenin öncelikle dış süslemeleriyle dikkat çekmesi gerektiğini", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Tasarımın görsel biçiminin, o nesnenin kullanım amacına ve pratik işlevine göre şekillenmesi gerektiğini", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "El işçiliğinin seri üretim makinelerinden daima üstün tutulmasını", isCorrect: false, type: "detay" },
        { letter: "D", text: "Geleneksel saray mimarisinin kopyalanmasını", isCorrect: false, type: "detay" }
      ],
      explanation: "İlke uyarınca tasarımın biçimi, süs olsun diye değil nesnenin yerine getireceği amaca ve pratik işleve göre belirlenmelidir."
    }
  },
  {
    id: 403,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 3,
    title: "Dadaizm ve Sanatın Sınırları: Duchamp ve Hazır-Nesne",
    category: "Sanat",
    duration: 8,
    difficulty: "İleri",
    skills: ["Kavramsal Düşünme", "Eleştirel Sanat"],
    text: "1914-1918 yılları arasında yaşanan Birinci Dünya Savaşı, insanlığın aydınlanma aklına, teknolojik ilerleme ülküsüne ve burjuva rasyonalizmine olan inancını yerle bir etti. Milyonlarca gencin siperlerde kimyasal gazlarla ve makineli tüfeklerle katledildiği bu vahşet karşısında Zürih'teki Cabaret Voltaire'de toplanan bir grup şair ve ressam (Tristan Tzara, Hugo Ball, Jean Arp), böylesine akıldışı bir kıyımı doğuran bir medeniyetin sanatını, mantığını ve ahlakını toptan reddederek 'Dadaizm' hareketini başlattılar. Dada, savaşa ve savaşı meşrulaştıran kibirli burjuva kültürüne karşı öfkeli, alaycı, anarşist ve saçmalığı yücelten bir çığlıktı.\n\nBu isyanın en sarsıcı temsilcisi ise Marcel Duchamp oldu. 1917 yılında New York Bağımsız Sanatçılar Sergisi'ne 'R. Mutt' sahte imzasıyla sıradan bir porselen pisuvarı ters çevirip kaideye koyarak 'Çeşme' (Fountain) adıyla gönderen Duchamp, sanat tarihinin akışını sonsuza dek değiştirdi. 'Hazır-nesne' (readymade) kavramını yaratan bu eylem, yüzyıllardır süregelen 'Sanat eseri, sanatçının el becerisiyle ve eşsiz zanaatıyla yarattığı nesnedir' tabusunu yıktı. Duchamp'a göre bir nesneyi sanat yapan şey onun tual üzerindeki boyası, mermer işçiliği ya da pahalı malzemesi değil; sanatçının ona yüklediği yeni düşünsel bağlam ve izleyiciyi kışkırtan zihinsel sorudur. Duchamp, pisuvarı işlevsel yerinden söküp bir galeri mekanına taşıyarak onun pratik değerini silmiş ve geriye saf bir düşünce bırakmıştır. Bu radikal hamle; 20. yüzyılın ikinci yarısında doğacak olan Kavramsal Sanat'ın (Conceptual Art), yerleştirme (enstalasyon) sanatının ve performansların doğum belgesi niteliğindedir.",
    idealAnswer: "Dadaizm savaşın mantıksızlığına karşı sanatı ve aklı sorgulamış; Duchamp'ın 'hazır-nesne' devrimi ise sanatın özünü el becerisinden düşünce ve bağlama taşımıştır.",
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
      konuDedektifi: "Dadaizm akımının savaş karşıtı doğuşu ve Duchamp'ın hazır-nesne ile sanatı düşünsel boyuta taşıması.",
      hizliOzet: "Savaşın yıkımına tepki olarak doğan Dadaizm ve Duchamp'ın 'Çeşme' eseri, sanatı el ustalığı yerine kavramsal düşünceye dönüştürmüştür.",
      yazarinAmaci: "Sanatın fiziksel bir nesne olmaktan çıkıp zihinsel bir soruya ve bağlama nasıl dönüştüğünü sergilemek.",
      soruUretimi: [
        "Dadaizm hangi tarihsel olayın travmasıyla doğmuştur?",
        "Duchamp'ın 'Çeşme' eseri hangi geleneksel kabulü yıkmıştır?",
        "Hazır-nesne kavramı neyi ifade eder?"
      ],
      anaDusunce: "Sanat eseri salt el ustalığı ve estetik bir nesne değil; sanatçının yeni bir bağlam kurarak izleyiciyi düşünmeye sevk ettiği kavramsal bir eylemdir.",
      cikarimYapma: "Bir nesnenin sanat kabul edilmesi, sergilendiği mekan ve ona yüklenen kavramsal niyetle doğrudan ilişkilidir.",
      yardimciDusunceler: [
        "1. Dünya Savaşı vahşeti akılcılığı sorgulattı.",
        "Zürih Cabaret Voltaire'de başladı.",
        "Duchamp sıradan pisuvarı 'Çeşme' adıyla sundu.",
        "Kavramsal sanatın temeli atıldı."
      ],
      boslukDoldurma: "Duchamp'a göre bir nesneyi sanat yapan şey zanaat değil, sanatçının yüklediği yeni düşünsel bağlamdır.",
      anlatimBicimi: "Tartışmacı ve Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Örneklendirme (Çeşme), Tarihsel Bağlam (1. Dünya Savaşı) ve Karşılaştırma",
      neuralWarning: "Duchamp'ın amacının şaka yapmak değil, 'Sanat nedir?' sınırlarını felsefi olarak sorgulamak olduğunu anlayın.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Marcel Duchamp'ın sıradan bir hazır pisuvarı 'Çeşme' adıyla sergiye sunarak sanat dünyasında kanıtlamak istediği **asıl düşünce** nedir?",
      options: [
        { letter: "A", text: "Seramik endüstrisinin resimden daha karlı bir sektör olduğu", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Sanatın el ustalığından ziyade sanatçının nesneye yüklediği kavramsal bağlam ve fikir olduğu", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Müzelerin ve galerilerin tamamen kapatılması gerektiği", isCorrect: false, type: "detay" },
        { letter: "D", text: "Heykel sanatının artık hiçbir değerinin kalmadığı", isCorrect: false, type: "detay" }
      ],
      explanation: "Duchamp, bir nesneyi sanat yapan şeyin teknik el becerisi değil, sanatçının ona yüklediği yeni fikir ve bağlam olduğunu kanıtlamıştır."
    }
  },
  {
    id: 404,
    workshopId: 1,
    workshopTitle: "Okuma Atölyesi",
    articleNumber: 4,
    title: "Müziğin Evrensel Dili ve Beyindeki Nörolojik Rezonans",
    category: "Sanat",
    duration: 8,
    difficulty: "Orta",
    skills: ["Bilişsel Estetik", "Nöro-Müzikoloji"],
    text: "Herhangi bir ortak dil konuşmayan, farklı kıtalarda ve kültürlerde yetişmiş iki insan; hüzünlü bir ney taksimi, neşeli bir Kelt ezgisi ya da görkemli bir Beethoven senfonisi dinlediğinde şaşırtıcı bir biçimde aynı temel duyguları (yas, coşku, gerilim, dinginlik) eş zamanlı olarak deneyimleyebilir. Peki havada titreşen basınç dalgalarından başka fiziksel bir gerçekliği olmayan ses dizilimleri, nasıl olur da insan ruhunun en derin dehlizlerini böylesine sarsabilir? Çağdaş nöromüzikoloji araştırmaları, müziğin beyinde tek bir merkeze hapsolmayıp beynin neredeyse tüm kortikal ve subkortikal loblarını aynı anda harekete geçiren nadir olgulardan biri olduğunu göstermektedir.\n\nKulak zarından geçen ses dalgaları iç kulaktaki salyangozda elektriksel sinyallere dönüştürülüp işitme korteksine ulaştığında; ritim beyincik ve motor korteksi, melodi ve armoni temporal lobları, sözler ise Broca ve Wernicke dil alanlarını uyarır. Ancak müziğin asıl büyüleyici etkisi, beynin en ilkel ödül merkezi olan mezolimbik dopamin yolunu doğrudan tetiklemesidir. Bir müzik parçasında beklenen bir tonik akorun geciktirilip tam vaktinde çözülmesi (gerilim-çözülüm döngüsü), beyinde lezzetli bir yemek yerken veya aşık olduğumuzda salgılanan dopamin patlamalarına ve 'tüylerin ürpermesi' (frisson) hissine yol açar. Evrimsel antropologlar, sözlü dil henüz evrimleşmeden önce atalarımızın kabile içi bağı güçlendirmek, av tehlikelerine karşı ortak ritim tutmak ve empati kurmak için tonlamalı sesler çıkardığını öne sürer. Müzik bu yönüyle sonradan öğrenilen kültürel bir hobi değil; insan türünün biyolojik dokusuna kazınmış en eski ve en birleştirici iletişim protokolüdür.",
    idealAnswer: "Müzik, havada titreşen ses dalgalarını beynin motor, işitme ve dopamin merkezlerinde senkronize ederek türe özgü evrensel bir duygu ve empati bağı kurar.",
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
      konuDedektifi: "Müziğin nörolojik etkileri, dopamin salınımı ve insan türündeki evrimsel birleştirici kökeni.",
      hizliOzet: "Müzik beyinde motor korteksten ödül merkezlerine kadar birçok alanı uyarır, dopamin salgılatır ve dilden önce gelen evrensel bir empati dili oluşturur.",
      yazarinAmaci: "Müziğin sadece kültürel bir sanat dalı değil insan beyni ve evrimiyle kenetlenmiş biyolojik bir güç olduğunu açıklamak.",
      soruUretimi: [
        "Müziğin beyinde yarattığı 'gerilim-çözülüm' döngüsü neyi tetikler?",
        "İşitilen müzik beynin hangi farklı bölgelerini eş zamanlı çalıştırır?",
        "Evrimsel antropologlar müziğin kökenini neye bağlar?"
      ],
      anaDusunce: "Müzik, beynin en ilkel ödül ve motor sistemlerini eş zamanlı uyararak kültürel sınırları aşan evrensel bir biyolojik duygu rezonansı yaratır.",
      cikarimYapma: "Müzikal deneyim sadece estetik bir tercih değil, insanın empati ve sosyal bağ kurma evriminin temel taşıdır.",
      yardimciDusunceler: [
        "Farklı kültürler aynı temel duyguları müzikle hissedebilir.",
        "Ritim motor korteksi, melodi temporal lobu uyarır.",
        "Dopamin salınımı tüylerin ürpermesi hissini doğurur.",
        "Sözlü dilden önce kabile ritimleri iletişimi sağlıyordu."
      ],
      boslukDoldurma: "Müzik, insan türünün biyolojik dokusuna kazınmış en eski ve en birleştirici iletişim protokolüdür.",
      anlatimBicimi: "Açıklayıcı Anlatım",
      dusunceyiGelistirme: "Tanımlama, Neden-Sonuç İlişkisi ve Bilimsel Açıklama (Nöromüzikoloji)",
      neuralWarning: "Müziğin etkisinin sadece kulakla sınırlı kalmayıp kimyasal ve motor sistemleri de tetiklediğini fark edin.",
      cognitiveTime: "8 Dakika"
    },
    quizQuestion: {
      stem: "Metne göre bir müzik eserinin dinleyicide 'tüyler ürperten' güçlü bir haz uyandırmasının **nörolojik nedeni** nedir?",
      options: [
        { letter: "A", text: "Müzik aletlerinin yapımında kullanılan doğal ahşap titreşimleri", isCorrect: false, type: "celdirici" },
        { letter: "B", text: "Ses perdelerindeki gerilim ve çözülüm döngüsünün beynin ödül sisteminde dopamin salgısını tetiklemesi", isCorrect: true, type: "ana_dusunce" },
        { letter: "C", text: "Şarkı sözlerinin her zaman kafiyeli yazılması", isCorrect: false, type: "detay" },
        { letter: "D", text: "Dinleyicinin mutlaka profesyonel bir müzisyen olması", isCorrect: false, type: "detay" }
      ],
      explanation: "Metinde açıkça gerilim-çözülüm döngüsünün mezolimbik dopamin yolunu tetikleyerek haz ve tüylerin ürpermesi hissine yol açtığı belirtilmiştir."
    }
  }
];
