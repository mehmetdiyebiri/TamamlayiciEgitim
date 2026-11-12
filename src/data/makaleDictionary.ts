// Comprehensive Academic & Literary Dictionary for Makale Okulu Word Pool

export const ACADEMIC_DICTIONARY: Record<string, string> = {
  // Bilim ve Teknoloji
  'inovasyon': 'Yenilikçilik, yeni yaklaşımlar geliştirme ve uygulama süreci',
  'paradigma': 'Belli bir dönemde geçerli olan bilimsel veya düşünsel model, değerler dizisi',
  'sentez': 'Ayrık parçaları, fikirleri veya ögeleri bir araya getirerek yeni bir bütün oluşturma',
  'analiz': 'Bir bütünü oluşturan parçaları, ilkeleri ve ilişkileri ayrıntılı inceleme',
  'empirik': 'Deneye, gözleme ve pratik tecrübeye dayalı bilimsel veri',
  'hipotez': 'Bilimsel bir araştırmada doğrulanmak veya çürütülmek üzere öne sürülen varsayım',
  'teori': 'Sistemli biçimde düzenlenmiş, olayları açıklayan doğrulanabilir ilkeler bütünü',
  'bilişsel': 'Zihinsel süreçler; algılama, hatırlama, öğrenme ve muhakeme ile ilgili',
  'sinaps': 'Nöronların birbirleriyle ya da diğer hücrelerle iletişim kurduğu mikroskobik bağlantı noktası',
  'nöron': 'Sinir sisteminde bilgi iletimini sağlayan elektriksel ve kimyasal sinir hücresi',
  'biyoçeşitlilik': 'Belirli bir ekosistemdeki canlı türlerinin, genlerin ve yaşam formlarının çeşitliliği',
  'ekosistem': 'Belirli bir alandaki canlılar ile onların cansız çevrelerinin oluşturduğu etkileşimli sistem',
  'fotosentez': 'Yeşil bitkilerin ışık enerjisini kullanarak karbondioksit ve sudan organik besin üretmesi',
  'klorofil': 'Bitkilerde fotosentezi sağlayan ve bitkiye yeşil renk veren biyolojik pigment',
  'kütikula': 'Bitki yapraklarının yüzeyini örterek su kaybını önleyen koruyucu mumsu tabaka',
  'kriptografi': 'Bilgilerin güvenliğini sağlamak amacıyla şifreleme ve deşifre etme bilimi',
  'algoritma': 'Belirli bir problemi çözmek veya bir hedefe ulaşmak için tasarlanan mantıksal işlem basamakları',
  'otomasyon': 'İşlerin insan müdahalesi olmadan otomatik makineler ve yazılımlarla yürütülmesi',
  'yapayzeka': 'Makinelerin insan benzeri akıl yürütme, öğrenme ve karar alma becerilerini taklit etmesi',
  'simülasyon': 'Gerçek bir sistemin veya sürecin bilgisayar ortamında modelleme yoluyla canlandırılması',
  'genom': 'Bir canlının hücrelerindeki genetik materyalin (DNA/RNA) tamamı',
  'mutasyon': 'Bir canlının DNA diziliminde çevresel veya biyolojik etkenlerle meydana gelen kalıcı değişim',
  'termodinamik': 'Isı, iş, sıcaklık ve enerji dönüşümlerini inceleyen fizik dalı',
  'entropi': 'Bir sistemdeki düzensizlik derecesi veya kullanılamaz enerji miktarı',
  'katalizör': 'Kimyasal bir tepkimeye katılarak tepkimeyi hızlandıran ancak kendisi değişmeyen madde',
  'optik': 'Işığın doğasını, yayılmasını ve maddeyle etkileşimini inceleyen fizik dalı',

  // Felsefe, Mantık ve Edebiyat
  'diyalektik': 'Zıt kutupların, tez ve antitezlerin çatışmasından yeni bir senteze ulaşma yöntemi',
  'epistemoloji': 'Bilginin kaynağını, sınırlarını ve doğruluk ölçütlerini inceleyen bilgi felsefesi',
  'ontoloji': 'Varlığın doğasını, varoluşu ve kategorilerini inceleyen varlık felsefesi',
  'determinizm': 'Her olayın önceki nedenler tarafından belirlendiğini savunan nedensellik öğretisi',
  'akılcı': 'Bilgiye ve hakikate duygulardan ziyade akıl ve mantık ilkeleriyle ulaşılabileceğini savunan',
  'metafor': 'Bir kavramı veya nesneyi aralarındaki benzerlik yoluyla başka bir kelimeyle ifade etme (eğretileme)',
  'imge': 'Zihinde canlandırılan duyusal ve estetik hayal, edebi resim',
  'estetik': 'Güzellik kavramını, sanatın doğasını ve algılanış biçimlerini konu edinen felsefe dalı',
  'öznel': 'Kişisel duygu, beğeni ve kanaatlere dayanan, kanıtlanamaz nitelikte olan (subjektif)',
  'nesnel': 'Kişiden kişiye değişmeyen, ölçülebilir ve somut verilere dayanan (objektif)',
  'ironi': 'Söylenen sözün tersini kastederek oluşturulan ince alay veya örtük tezat',
  'alegori': 'Soyut bir düşünce veya erdemi somut simgeler ve hikâyeler yoluyla canlandırma sanatı',
  'monolog': 'Bir kişinin kendi kendine yaptığı veya tiyatroda tek başına sürdürdüğü uzun konuşma',
  'diyalog': 'İki veya daha fazla kişi arasında gerçekleşen karşılıklı düşünce alışverişi ve konuşma',
  'didaktik': 'Bilgi vermeyi, ahlaki veya düşünsel ders aşılamayı amaçlayan öğretici anlatım tarzı',
  'lirik': 'Coşkulu, yoğun duygusal ve içten bir anlatımla şekillenen edebi üslup',
  'kaside': 'Divan edebiyatında din ve devlet büyüklerini övmek amacıyla yazılan manzum şiir',
  'hiciv': 'Toplumun veya kişilerin kusurlu ve çarpık yönlerini yermek amacıyla yazılan eleştirel eser',
  'üslup': 'Sanatçının duygu ve düşüncelerini anlatırken tercih ettiği kendine has dil ve söyleyiş tarzı',
  'bağlam': 'Bir sözcüğün, cümlenin veya olayın içinde yer aldığı ve ona anlam kazandıran koşullar bütünü',
  'çıkarım': 'Eldeki verilerden ve önermelerden mantıksal bir sonuca ulaşma işlemi',
  'muhakeme': 'Fikirleri ve kanıtları tartarak doğruyu yanlıştan ayırt etme ve akıl yürütme yetisi',
  'tasvir': 'Bir yeri, durumu veya varlığı göz önünde canlandıracak biçimde ayrıntılı betimleme',
  'özümsemek': 'Yeni bilgileri derinlemesine anlayıp zihinsel yapının doğal bir parçası haline getirmek',
  'özdeşleşmek': 'Kendini bir başkasının yerine koyarak onun duygularını ve durumunu bütünüyle paylaşmak',

  // Sanat, Tarih ve Kültür
  'kronoloji': 'Tarihsel olayların zamansal sırasını belirleyen ve inceleyen zaman bilimi',
  'arkeoloji': 'Geçmiş uygarlıkların maddi kalıntılarını kazı ve tahlil yoluyla inceleyen bilim dalı',
  'restorasyon': 'Tarihi veya sanatsal bir eserin aslına uygun biçimde onarılıp korunması işlemi',
  'minyatür': 'Geleneksel doğu sanatında ışık-gölge ve perspektif kullanılmadan yapılan küçük ve ince nakışlı resim',
  'fresk': 'Yaş sıva üzerine suyla karıştırılmış boyalarla yapılan kalıcı duvar resmi',
  'rölyef': 'Taş, ahşap veya metal zemin üzerinde figürlerin kabartılmasıyla oluşturulan heykel sanatı',
  'motif': 'Edebi veya plastik sanatlarda sürekli tekrarlanan ana tema veya bezeme ögesi',
  'mitoloji': 'Bir halkın inançlarını, tanrılarını ve evrenin yaratılışını anlatan efsaneler bütünü',
  'medeniyet': 'Bir toplumun maddi ve manevi varlıklarının, fikir ve bilim düzeyinin oluşturduğu uygarlık bütünü',
  'jeopolitik': 'Bir ülkenin veya bölgenin coğrafi konumunun siyasi ilişkiler üzerindeki belirleyici etkisi',
  'kültür': 'Tarih boyunca üretilen ve kuşaktan kuşağa aktarılan maddi ve manevi değerler bütünü',
  'antropoloji': 'İnsanın biyolojik evrimini, kültürel gelişimini ve toplumsal yapılarını inceleyen bilim dalı',
  'sosyoloji': 'Toplumların yapısını, kurumlarını, değişimini ve insan ilişkilerini inceleyen bilim dalı',
  'ikonografi': 'Sanat eserlerindeki simgelerin, figürlerin ve temaların anlamını çözümleyen inceleme alanı',

  // Coğrafya ve Çevre
  'erozyon': 'Toprağın rüzgar, su ve insan etkisiyle aşınarak başka yerlere taşınması süreci',
  'sedimentasyon': 'Aşınan kayaç ve toprak kırıntılarının çukur alanlarda tortulanarak birikmesi',
  'jeoloji': 'Yerkürenin katmanlarını, yapısını ve tarihsel oluşum süreçlerini inceleyen yer bilimi',
  'tektonik': 'Yerkabuğundaki levha hareketleri, kırılmalar ve dağ oluşumlarıyla ilgili jeolojik süreçler',
  'hidroloji': 'Yeryüzündeki suların dağılımını, dolaşımını ve özelliklerini inceleyen su bilimi',
  'klimatoloji': 'Geniş bölgelerde uzun yıllar boyunca görülen hava olaylarının ortalamasını inceleyen iklim bilimi',
  'biyom': 'Kendine özgü iklim, bitki örtüsü ve hayvan topluluğuna sahip büyük yeryüzü yaşam kuşağı',
  'endemik': 'Dünyada yalnızca belirli bir dar coğrafi bölgeye özgü olan canlı türü',
  'fay': 'Yerkabuğundaki gerilimler sonucu tabakaların kırılarak birbirinden kaymasıyla oluşan hat',
  'atmosfer': 'Dünyayı çepeçevre saran ve yaşamı koruyan gaz katmanı'
};

// Turkish character cleaner and lowercaser
export function cleanTurkishWord(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, '')
    .toLocaleLowerCase('tr-TR');
}

// Find best definition from dictionary or fallback to context
export function resolveWordDefinition(word: string, contextSentence?: string): string {
  const normalized = cleanTurkishWord(word);
  if (!normalized) return 'Kelimelik sözlüğü tanımı.';

  // 1. Direct match
  if (ACADEMIC_DICTIONARY[normalized]) {
    return ACADEMIC_DICTIONARY[normalized];
  }

  // 2. Stem match (check if normalized starts with any dictionary key of length >= 4)
  for (const [key, val] of Object.entries(ACADEMIC_DICTIONARY)) {
    if (normalized.startsWith(key) || key.startsWith(normalized)) {
      return val;
    }
  }

  // 3. Fallback based on sentence context or generic definition
  if (contextSentence && contextSentence.trim().length > 10) {
    const trimmed = contextSentence.trim();
    const shortContext = trimmed.length > 80 ? trimmed.slice(0, 80) + '...' : trimmed;
    return `Metin bağlamında: "${shortContext}"`;
  }

  return 'Akademik metin bağlamında anlamlandırılan kavram.';
}
