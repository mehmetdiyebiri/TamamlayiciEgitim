import { ALL_MAKALE_ARTICLES } from './makaleArticles';
import { INITIAL_CLASS_DATA } from '../lib/constants';

export interface MakaleSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  articleId: number;
  articleTitle: string;
  workshopId: 1 | 2; // 1: 5-6. Sınıf, 2: 7-8. Sınıf
  category: string;
  submittedAt: string;
  timeSpentMinutes: number;
  
  // Quiz Evaluation
  quizSelectedOption: {
    letter: string;
    text: string;
    isCorrect: boolean;
    type: string; // "Doğru Cevap" | "Ters Mantık" | "Kapsam Aşımı" | "Çelişkili" | "Öznel Yorum"
  };
  quizExplanation: string;
  isPassed: boolean;
  distractorType?: string; // If failed, e.g. "Ters Mantık"
  neuralWarning?: string; // Cognitive trap advice

  // 10-step Workspace Inputs
  workspaceInput: {
    konuDedektifi: string;
    hizliOzet: string;
    yazarinAmaci: string;
    soru1: string;
    soru2: string;
    soru3: string;
    anaDusunce: string;
    aiScore?: number;
    aiFeedback?: string;
    cikarimYapma: string;
    yardimci1: string;
    yardimci2: string;
    yardimci3: string;
    boslukDoldurma: string;
    anlatimBicimi: string;
    dusunceyiGelistirme: string;
  };

  // Teacher Review
  teacherReview?: {
    teacherName: string;
    score: number;
    comment: string;
    status: 'incelendi' | 'onaylandi' | 'telafi_atandi';
    reviewedAt: string;
  };

  wordsLearned?: string[];
}

const STORAGE_KEY = 'alim_makale_submissions_v2';

// Realistic sample submissions for teachers and admins to examine right away
export function getInitialSeedSubmissions(): MakaleSubmission[] {
  return [
    {
      id: 'sub-seed-1',
      studentId: 'stu-6a-efe',
      studentName: 'Efe Ersöz',
      studentClass: '6A',
      articleId: 101, // Arıların Dansı
      articleTitle: 'Arıların Dansı ve Doğadaki İletişim Mucizesi',
      workshopId: 1,
      category: 'Doğa & Canlılar',
      submittedAt: '28 Ekim 2026, 14:25',
      timeSpentMinutes: 5,
      isPassed: true,
      quizSelectedOption: {
        letter: 'A',
        text: 'Peteğin üzerinde kuyruğunu sallama süresini uzatıp kısaltması.',
        isCorrect: true,
        type: 'Doğru Cevap'
      },
      quizExplanation: "Metinde 'sallanma süresi ise çiçeğin kovana olan uzaklığını gösterir' ifadesi açıkça yer almaktadır.",
      workspaceInput: {
        konuDedektifi: 'Bal arılarının çiçeklerin yönünü ve mesafesini dans ederek diğer arılara bildirmesi.',
        hizliOzet: 'Arılar petek üzerinde sekiz çizerek ve kuyruk sallayarak nektarın yerini haber verir.',
        yazarinAmaci: 'Doğadaki hayvanların aralarında konuşmadan da çok düzenli haberleşebildiğini göstermek.',
        soru1: 'Yakındaki çiçekler için arılar hangi dansı yapar?',
        soru2: 'Kuyruk sallama dansında yön neye göre belirlenir?',
        soru3: 'Kovandaki diğer arılar çiçeği nasıl bulur?',
        anaDusunce: 'Doğada canlılar birbirleriyle mükemmel bir yardımlaşma ve iletişim ağı içinde yaşarlar.',
        aiScore: 92,
        aiFeedback: 'Tebrikler! Ana fikri ve yazarın vermek istediği temel mesajı eksiksiz yakaladınız.',
        cikarimYapma: 'Arılar arasında bu iletişim olmasaydı kovan yeterli bal toplayamaz ve kışın aç kalırdı.',
        yardimci1: 'Kısa mesafe için daire dansı yapılır.',
        yardimci2: 'Güneşin açısı yön tayininde kullanılır.',
        yardimci3: 'Tek bir kelime konuşmadan kilometrelerce uzağı tarif edebilirler.',
        boslukDoldurma: 'Doğa, içinde keşfedilmeyi bekleyen binbir türlü gizli alfabe ve muazzam bir yardımlaşma barındırmaktadır.',
        anlatimBicimi: 'Açıklayıcı Anlatım',
        dusunceyiGelistirme: 'Örneklendirme ve Karşılaştırma'
      },
      teacherReview: {
        teacherName: 'Ahmet Öğretmen',
        score: 95,
        comment: 'Harika bir çözümleme! Özellikle çıkarım yapma ve soru üretimi adımlarında çok başarılısın.',
        status: 'onaylandi',
        reviewedAt: '28 Ekim 2026, 16:10'
      },
      wordsLearned: ['Nektar', 'Koloni', 'İletişim']
    },
    {
      id: 'sub-seed-2',
      studentId: 'stu-7a-kaan',
      studentName: 'Kaan Aktı',
      studentClass: '7A',
      articleId: 201, // Yapay Zeka
      articleTitle: 'Yapay Zekâ ve İnsan Zihninin Karşılaştırmalı Analizi',
      workshopId: 2,
      category: 'Bilişim & Nörobilim',
      submittedAt: '29 Ekim 2026, 11:40',
      timeSpentMinutes: 7,
      isPassed: false,
      distractorType: 'Ters Mantık',
      neuralWarning: "Metin robotların ayaklanması gibi distopik temalardan bahsetmez; zihinsel kapasite ve anlam farkını inceler.",
      quizSelectedOption: {
        letter: 'B',
        text: 'Milyonlarca veriyi saniyeler içinde tarayıp depolayabilmesi.',
        isCorrect: false,
        type: 'Ters Mantık'
      },
      quizExplanation: "Öğrenci hızlı veri taramayı yapay zekanın değil, insan zihninin üstünlüğü sanarak 'Ters Mantık' tuzağına düştü. Metne göre insan zihnini eşsiz kılan empati, vicdan ve sezgisel anlamlandırmadır.",
      workspaceInput: {
        konuDedektifi: 'Yapay zekanın işlem gücü ile insan zihninin duygusal ve vicdani zekasının farkları.',
        hizliOzet: 'Yapay zeka çok hızlı işlem yapar ama insan gibi hissedemez ve şiirdeki duyguyu anlayamaz.',
        yazarinAmaci: 'Teknolojinin gücünü anlatırken insanın yerinin doldurulamayacağını hatırlatmak.',
        soru1: 'Yapay zeka şiir okurken neyi eksik bırakır?',
        soru2: 'Büyük dil modelleri nasıl eğitilir?',
        soru3: 'Makineler neden vicdani muhakeme yapamaz?',
        anaDusunce: 'Bilgisayarlar veriyi ne kadar hızlı işlerse işlesin, duygu ve empati sadece insan zihnine aittir.',
        aiScore: 84,
        aiFeedback: 'Ana fikir doğru ancak soru kökündeki insan-makine ayrımında şıkkı ters okudunuz.',
        cikarimYapma: 'Gelecekte makinelerin yapamayacağı meslekler duygu ve empati gerektirenler olacaktır.',
        yardimci1: 'Yapay zeka istatistiki olasılıkları hesaplar.',
        yardimci2: 'İnsan anıları ve hisleriyle anlam üretir.',
        yardimci3: 'İşlem gücü anlamak anlamına gelmez.',
        boslukDoldurma: 'Geleceğin dünyasında insanı insan yapan değerler, mekanik hızdan çok daha kıymetli bir meşale olarak parlayacaktır.',
        anlatimBicimi: 'Tartışmacı ve Karşılaştırmalı Anlatım',
        dusunceyiGelistirme: 'Karşılaştırma ve Somutlaştırma'
      },
      teacherReview: {
        teacherName: 'Zeynep Öğretmen',
        score: 75,
        comment: '10 adımlı analiz kağıdın çok başarılı fakat test sorusunda ters mantık çeldiricisine dikkat etmelisin. Soru kökünü bir kez daha oku!',
        status: 'telafi_atandi',
        reviewedAt: '29 Ekim 2026, 14:00'
      },
      wordsLearned: ['Empati', 'Muhakeme', 'Parametre']
    },
    {
      id: 'sub-seed-3',
      studentId: 'stu-8a-azra',
      studentName: 'Azra Nur Karakaş',
      studentClass: '8A',
      articleId: 209, // Paragrafta Ana Düşünce ve Çeldiriciler
      articleTitle: 'Paragrafta Ana Düşünce ve Çeldiricileri Ayırt Etme Sanatı',
      workshopId: 2,
      category: 'Metin Analitiği',
      submittedAt: '30 Ekim 2026, 16:15',
      timeSpentMinutes: 6,
      isPassed: true,
      quizSelectedOption: {
        letter: 'A',
        text: 'Metinde geçen dar bir detayı alıp bütün metnin ana fikriymiş gibi aşırı genelleştirmek.',
        isCorrect: true,
        type: 'Doğru Cevap'
      },
      quizExplanation: "Metinde 'Kapsam aşımı çeldiricisi metinde yalnızca küçük bir bölümden bahsederken bunu tüm metin gibi geneller' denmektedir.",
      workspaceInput: {
        konuDedektifi: 'LGS paragraf sorularında ana düşünce bulma taktikleri ve çeldirici tuzak türleri.',
        hizliOzet: 'Soru yazarları kapsam aşımı ve ters mantık gibi çeldiricilerle öğrencileri yanıltır; ana fikir için yazarın amacına bakılmalıdır.',
        yazarinAmaci: 'Öğrencilere paragraf sorularında tuzak şıkları nasıl eleyeceklerini öğretmek.',
        soru1: 'Kapsam aşımı çeldiricisi öğrenciyi nasıl yanıltır?',
        soru2: 'Yardımcı düşünceler neden ana düşünceyle karıştırılır?',
        soru3: 'Paragrafta ana düşünceyi bulmak için hangi soru sorulmalıdır?',
        anaDusunce: 'Doğru şıkka ulaşmak metindeki detaylara değil, metnin ana omurgasına odaklanmakla mümkündür.',
        aiScore: 95,
        aiFeedback: 'Kusursuz özetleme! Çeldirici mekanizmasını çok net kavramışsınız.',
        cikarimYapma: 'Bir şıkta metinden çok tanıdık kelimeler geçiyorsa hemen atlamamalı, genelleme yapıp yapmadığı kontrol edilmelidir.',
        yardimci1: 'Ters mantık çeldiricisi kelimeyi zıddıyla sunar.',
        yardimci2: 'Ana düşünce yazarın metni yazma sebebidir.',
        yardimci3: 'Soru yazarları bilinçli tuzaklar kurar.',
        boslukDoldurma: 'Doğru şık, metnin kalbine giden en doğrudan ve dürüst yoldur.',
        anlatimBicimi: 'Açıklayıcı ve Öğretici Anlatım',
        dusunceyiGelistirme: 'Tanımlama ve Benzetme'
      },
      teacherReview: {
        teacherName: 'Ahmet Öğretmen',
        score: 100,
        comment: 'Harika bir LGS hazırlık analitiği. Çeldirici türlerini çok iyi kavramışsın.',
        status: 'onaylandi',
        reviewedAt: '30 Ekim 2026, 17:30'
      },
      wordsLearned: ['Çeldirici', 'Kapsam Aşımı', 'Omurga']
    },
    {
      id: 'sub-seed-4',
      studentId: 'stu-5a-ali',
      studentName: 'Ali Çil',
      studentClass: '5A',
      articleId: 102, // Göbeklitepe
      articleTitle: 'Göbeklitepe: Tarihin Sıfır Noktası',
      workshopId: 1,
      category: 'Tarih & Arkeoloji',
      submittedAt: '31 Ekim 2026, 09:15',
      timeSpentMinutes: 5,
      isPassed: true,
      quizSelectedOption: {
        letter: 'A',
        text: 'İnsanların tarımdan önce de inanç amacıyla bir araya gelip anıtsal yapılar kurabildiğini kanıtlaması.',
        isCorrect: true,
        type: 'Doğru Cevap'
      },
      quizExplanation: "Metinde Göbeklitepe'nin henüz tarıma geçmemiş avcı-toplayıcı insanların tapınak kurabildiğini ispatladığı vurgulanır.",
      workspaceInput: {
        konuDedektifi: 'Göbeklitepe tapınakları ve insanlık tarihine dair eski bilgileri değiştirmesi.',
        hizliOzet: 'Şanlıurfa’daki 12 bin yıllık Göbeklitepe, insanların tarımdan önce tapınak yaptığını gösterir.',
        yazarinAmaci: 'Tarihin sıfır noktası olan bu önemli yapıyı öğrencilere tanıtmak.',
        soru1: 'Göbeklitepe piramitlerden kaç yıl daha eskidir?',
        soru2: 'T biçimli taşların üzerinde hangi hayvanlar vardır?',
        soru3: 'Göbeklitepe hangi ilimizde yer alır?',
        anaDusunce: 'İnanç ve ibadet duygusu, insanları şehirlerden ve tarımdan bile önce büyük yapılar inşa etmeye yöneltmiştir.',
        aiScore: 88,
        aiFeedback: 'Çok iyi! Göbeklitepe’nin arkeolojik önemini doğru ifade etmişsiniz.',
        cikarimYapma: 'Yeni tarihi keşifler eski ders kitaplarında yazan kesin bilgileri değiştirebilir.',
        yardimci1: 'Piramitlerden 7 bin yıl daha eskidir.',
        yardimci2: 'Avcı-toplayıcı insanlar tarafından yapılmıştır.',
        yardimci3: 'Şanlıurfa yakınlarındadır.',
        boslukDoldurma: 'Bu tarihi keşif, Anadolu topraklarının dünya medeniyetinin beşiği olduğunu bir kez daha kanıtlamaktadır.',
        anlatimBicimi: 'Açıklayıcı Anlatım',
        dusunceyiGelistirme: 'Karşılaştırma ve Sayısal Veriler'
      },
      teacherReview: {
        teacherName: 'Zeynep Öğretmen',
        score: 90,
        comment: 'Aferin Ali! Tarihsel çıkarımların 5. sınıf seviyesi için gayet açık ve net.',
        status: 'onaylandi',
        reviewedAt: '31 Ekim 2026, 11:00'
      },
      wordsLearned: ['Arkeoloji', 'Avcı-Toplayıcı', 'Kabartma']
    },
    {
      id: 'sub-seed-5',
      studentId: 'stu-6a-yekta',
      studentName: 'Yekta Fırat',
      studentClass: '6A',
      articleId: 104, // Mimar Sinan ve Süleymaniye
      articleTitle: "Mimar Sinan ve Süleymaniye'nin Akustik Sırrı",
      workshopId: 1,
      category: 'Sanat & Mimari',
      submittedAt: '1 Kasım 2026, 13:20',
      timeSpentMinutes: 6,
      isPassed: false,
      distractorType: 'Kapsam Aşımı',
      neuralWarning: "Metin Sinan'ın köprülerinden veya saraylarından bahsetmez; ana tema Süleymaniye kubbesindeki akustik küplerdir.",
      quizSelectedOption: {
        letter: 'C',
        text: 'İçinde yağmur sularını depolamak.',
        isCorrect: false,
        type: 'Kapsam Aşımı'
      },
      quizExplanation: "Öğrenci toprak küpleri su sarnıcıyla karıştırarak 'Kapsam Aşımı' tuzağına düştü. Küpler yağmur suyu için değil, ses akustiğini sağlayıp yankıyı önlemek için kullanılmıştır.",
      workspaceInput: {
        konuDedektifi: 'Mimar Sinan’ın Süleymaniye Camii’nde uyguladığı ses akustiği ve hava dolaşımı dehası.',
        hizliOzet: 'Sinan kubbedeki küplerle sesi dağıtmış, kandil dumanlarını da hava akımıyla toplayıp mürekkep yapmıştır.',
        yazarinAmaci: 'Tarihimizdeki mühendislik ve mimari zekayı anlatmak.',
        soru1: 'Kubbede kaç adet toprak küp vardır?',
        soru2: 'Kandil islerinden ne üretilmiştir?',
        soru3: 'Mimar Sinan hoparlör olmadan sesi nasıl iletmiştir?',
        anaDusunce: 'Büyük sanat eserleri mimari güzellik kadar ardındaki bilim ve mühendislikle ölümsüzleşir.',
        aiScore: 82,
        aiFeedback: 'Özet başarılı ancak test şıkkında küplerin akustik görevini gözden kaçırdınız.',
        cikarimYapma: 'Mimar Sinan çevre kirliliğini önleme ve geri dönüşüm konusunda asırlar önce öncü olmuştur.',
        yardimci1: '64 adet pişmiş toprak küp yerleştirilmiştir.',
        yardimci2: 'Hava akımı isleri özel bir odada toplar.',
        yardimci3: 'Ses caminin en arka köşesine kadar net duyulur.',
        boslukDoldurma: 'Sinan’ın bu benzersiz dehası, çağının çok ötesinde bir mimarlık ve mühendislik ufku ortaya koymaktadır.',
        anlatimBicimi: 'Açıklayıcı Anlatım',
        dusunceyiGelistirme: 'Sayısal Veri ve Somutlaştırma'
      },
      teacherReview: {
        teacherName: 'Ahmet Öğretmen',
        score: 80,
        comment: 'Analiz kağıdın güzel ancak küplerin fonksiyonunu sarnıçla karıştırdın. Akustik kavramını tekrar gözden geçir.',
        status: 'incelendi',
        reviewedAt: '1 Kasım 2026, 15:45'
      },
      wordsLearned: ['Akustik', 'Kandil İsi', 'Mimari']
    },
    {
      id: 'sub-seed-6',
      studentId: 'stu-7a-elif',
      studentName: 'Elif Saliha Güz',
      studentClass: '7A',
      articleId: 203, // Biyoçeşitlilik Kaybı
      articleTitle: 'Biyoçeşitlilik Kaybı ve Ekosistem Dengesinin Kırılganlığı',
      workshopId: 2,
      category: 'Ekoloji & Çevre',
      submittedAt: '1 Kasım 2026, 15:30',
      timeSpentMinutes: 6,
      isPassed: true,
      quizSelectedOption: {
        letter: 'A',
        text: 'Tek bir türün yok olmasının ona bağlı diğer canlı türlerinin dengesini de ardı ardına bozması.',
        isCorrect: true,
        type: 'Doğru Cevap'
      },
      quizExplanation: "Metinde türlerin birbirine bağlılığı ve birinin çekilmesinin domino etkisi yaratarak besin zincirini çökerteceği anlatılmıştır.",
      workspaceInput: {
        konuDedektifi: 'Ekosistemde biyoçeşitliliğin önemi ve bir türün yok oluşunun domino etkisi yaratması.',
        hizliOzet: 'Her canlının doğada bir rolü vardır, aralarından biri kaybolursa bütün ekosistem zincirleme bozulur.',
        yazarinAmaci: 'Doğadaki hiçbir canlının gereksiz olmadığını ve türleri korumanın insanlık için zorunlu olduğunu göstermek.',
        soru1: 'Biyoçeşitliliğin azalmasına sebep olan insan faktörleri nelerdir?',
        soru2: 'Bataklıklar kurutulunca hangi canlılar zarar görür?',
        soru3: 'Domino etkisi benzetmesi neyi açıklar?',
        anaDusunce: 'Doğadaki denge bir bütündür; tek bir parça koptuğunda bütün sistem tehlikeye girer.',
        aiScore: 94,
        aiFeedback: 'Harika bir kavrayış! Ekolojik zincir mantığını tam olarak ifade ettiniz.',
        cikarimYapma: 'Biyoçeşitliliği korumak insanın kendi gıda ve su güvenliğini sağlaması demektir.',
        yardimci1: 'Tek hücreli yosunlardan balinalara kadar her canlının rolü vardır.',
        yardimci2: 'Sanayileşme türlerin yok oluşunu hızlandırır.',
        yardimci3: 'Gıda güvenliği doğrudan tehdit altındadır.',
        boslukDoldurma: 'Doğayı korumak bir lüks değil, yeryüzünde var olabilmemizin tek teminatıdır.',
        anlatimBicimi: 'Tartışmacı ve Açıklayıcı Anlatım',
        dusunceyiGelistirme: 'Örneklendirme ve Benzetme'
      },
      teacherReview: {
        teacherName: 'Zeynep Öğretmen',
        score: 98,
        comment: 'Tebrik ederim Elif, çok olgun ve kapsamlı bir çalışma olmuş.',
        status: 'onaylandi',
        reviewedAt: '1 Kasım 2026, 17:00'
      },
      wordsLearned: ['Biyoçeşitlilik', 'Ekosistem', 'Domino Etkisi']
    },
    {
      id: 'sub-seed-7',
      studentId: 'stu-8a-muhammed',
      studentName: 'Muhammed Emin Atik',
      studentClass: '8A',
      articleId: 214, // Dijital Ayak İzi
      articleTitle: 'Dijital Ayak İzi ve Sosyal Medya Algoritmaları',
      workshopId: 2,
      category: 'Dijital Çağ',
      submittedAt: '2 Kasım 2026, 08:45',
      timeSpentMinutes: 5,
      isPassed: false,
      distractorType: 'Çelişkili Seçenek',
      neuralWarning: "Metin telefon donanımlarından bahsetmez; dijital veri izi ve algoritmaların manipülasyonunu inceler.",
      quizSelectedOption: {
        letter: 'C',
        text: 'Telefonun hoparlörünün bozulup yankı yapmasını.',
        isCorrect: false,
        type: 'Çelişkili'
      },
      quizExplanation: "Öğrenci 'yankı odası' mecazını somut ses yankısıyla karıştırarak mecaz anlam tuzağına düştü. Yankı odası zihinsel olarak tek tip fikirlere hapsolmayı ifade eder.",
      workspaceInput: {
        konuDedektifi: 'İnternetteki dijital ayak izi, algoritmaların bizi ekranda tutma yöntemleri ve yankı odaları.',
        hizliOzet: 'Sosyal medya her hareketimizi izleyerek sadece sevdiğimiz şeyleri gösterir ve bizi tek tip düşünceye iter.',
        yazarinAmaci: 'Gençleri algoritmaların yönlendirmesine karşı bilinçli ve uyanık olmaya çağırmak.',
        soru1: 'Dijital ayak izi nasıl oluşur?',
        soru2: 'Algoritmalar neden ekranda kalma süresini uzatmak ister?',
        soru3: 'Yankı odası bireyin fikirlerini nasıl etkiler?',
        anaDusunce: 'Sosyal medyadaki içeriklerin algoritmalar tarafından belirlendiğini bilmeli ve eleştirel sorgulamayı bırakmamalıyız.',
        aiScore: 80,
        aiFeedback: 'Konu analizi başarılı ancak yankı odası mecazına dikkat ediniz.',
        cikarimYapma: 'Farklı görüşleri okumayan insanlar zamanla kutuplaşır.',
        yardimci1: 'Tıklamalar ve aramalar kaydedilir.',
        yardimci2: 'Milisaniyelik duraklamalar bile ölçülür.',
        yardimci3: 'Kutuplaşma eleştirel düşünceyi köreltir.',
        boslukDoldurma: 'Ekranların parıltısı arkasındaki algoritmaları fark etmek, zihinsel bağımsızlığımızın en temel şartıdır.',
        anlatimBicimi: 'Tartışmacı ve Açıklayıcı Anlatım',
        dusunceyiGelistirme: 'Tanımlama ve Metafor'
      },
      teacherReview: {
        teacherName: 'Ahmet Öğretmen',
        score: 78,
        comment: 'Mecaz anlamları gerçek anlamla karıştırmamaya özen göster. "Yankı odası" zihinsel bir metafordur.',
        status: 'telafi_atandi',
        reviewedAt: '2 Kasım 2026, 10:00'
      },
      wordsLearned: ['Yankı Odası', 'Algoritma', 'Dijital Ayak İzi']
    }
  ];
}

export function loadMakaleSubmissions(): MakaleSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load makale submissions', e);
  }
  const initial = getInitialSeedSubmissions();
  saveMakaleSubmissions(initial);
  return initial;
}

export function saveMakaleSubmissions(subs: MakaleSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
    window.dispatchEvent(new CustomEvent('makale_submissions_updated', { detail: subs }));
  } catch (e) {
    console.error('Failed to save makale submissions', e);
  }
}

export function addOrUpdateSubmission(sub: MakaleSubmission): void {
  const current = loadMakaleSubmissions();
  const index = current.findIndex(s => s.id === sub.id || (s.studentId === sub.studentId && s.articleId === sub.articleId));
  let updated: MakaleSubmission[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...sub };
  } else {
    updated = [sub, ...current];
  }
  saveMakaleSubmissions(updated);
}

export function updateTeacherReview(
  submissionId: string, 
  review: { teacherName: string; score: number; comment: string; status: 'incelendi' | 'onaylandi' | 'telafi_atandi' }
): MakaleSubmission | null {
  const current = loadMakaleSubmissions();
  const index = current.findIndex(s => s.id === submissionId);
  if (index >= 0) {
    const updatedSub: MakaleSubmission = {
      ...current[index],
      teacherReview: {
        ...review,
        reviewedAt: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      }
    };
    current[index] = updatedSub;
    saveMakaleSubmissions(current);
    return updatedSub;
  }
  return null;
}
