export const generateTurkishEnglishStr = (str: string) => {
    if (!str) return '';
    return String(str).toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/İ/g, 'i').replace(/Ş/g, 's').replace(/Ğ/g, 'g')
        .replace(/Ü/g, 'u').replace(/Ö/g, 'o').replace(/Ç/g, 'c')
        .replace(/[^a-z0-9]/g, '');
};

export const generateCredentials = (fullName: string, studentNo?: string) => {
    if (!fullName) {
        return { username: 'user_' + Math.floor(Math.random() * 10000), password: Math.floor(100000 + Math.random() * 900000).toString() };
    }
    // If studentNo is embedded in fullName (e.g. "123 - Name"), extract it if not provided
    let pureName = String(fullName);
    let sn = studentNo;
    
    const match = pureName.match(/^(\d+)\s*[-]\s*(.+)$/);
    if (match) {
        sn = sn || match[1];
        pureName = match[2];
    }

    const baseName = generateTurkishEnglishStr(pureName) || 'user';
    const random4 = Math.floor(1000 + Math.random() * 9000);
    
    let username;
    if (sn) {
        username = `${baseName}${sn}`;
    } else {
        const random3 = Math.floor(100 + Math.random() * 900);
        username = `${baseName}${random3}`;
    }

    return {
        username,
        password: `${random4}`
    };
};

export const formatClassLabel = (cls: any): string => {
    if (!cls || typeof cls === 'boolean') return '';
    if (Array.isArray(cls)) return cls.map(c => String(c || '').replace('_', '')).join(', ');
    if (typeof cls === 'object') return '';
    return String(cls).replace('_', '');
};

const TURKISH_FEMALE_NAMES = new Set([
    'acelya', 'ada', 'adalet', 'adile', 'afife', 'afra', 'ahu', 'ajda', 'akay', 'aksel', 'alara', 'alev', 'aleyna', 'ergul',
    'alime', 'almila', 'alya', 'amine', 'anil', 'arife', 'arzu', 'asena', 'asil', 'asiye', 'asli', 'aslihan', 'aslinur', 'asu',
    'asude', 'asuman', 'asya', 'ata', 'atike', 'ayben', 'aybuke', 'ayca', 'aycan', 'aycin', 'ayda', 'aydan', 'ayfer', 'aygul',
    'ayla', 'aylin', 'aynur', 'aysel', 'aysen', 'aysenur', 'aysima', 'aysu', 'aysun', 'ayse', 'aysegul', 'ayten', 'azize', 'azra',
    'bahar', 'bahriye', 'balim', 'banu', 'basak', 'edia', 'bedriye', 'begum', 'behice', 'behiye', 'belgin', 'belinay', 'belkis',
    'belma', 'benan', 'bengisu', 'bengu', 'bennu', 'beray', 'beren', 'berfin', 'bergüzar', 'berguzar', 'beril', 'berin', 'berk',
    'berna', 'berrak', 'berrin', 'beste', 'betul', 'beyhan', 'beyza', 'beyzanur', 'bihter', 'bilge', 'bilgen', 'bilgin', 'binnaz',
    'binnur', 'birgul', 'birsen', 'buket', 'burcu', 'burcin', 'busra', 'busranur', 'buse', 'busenur',
    'cahide', 'canan', 'candan', 'cansel', 'cansin', 'cansu', 'cavidan', 'cemile', 'cemre', 'cennet', 'ceren', 'cevriye', 'ceyda',
    'ceylan', 'ceylin', 'cigdem', 'cihan', 'ciler', 'isil',
    'damla', 'defne', 'demet', 'deniz', 'deren', 'derin', 'derya', 'destan', 'devrim', 'dicle', 'didar', 'didem', 'dilan', 'dilara',
    'dilay', 'dilber', 'dilek', 'dilruba', 'dilsad', 'doga', 'dolunay', 'idil', 'duha', 'duru', 'duygu', 'dondü', 'dondu', 'duriye',
    'ebrar', 'ebru', 'ece', 'ecem', 'ecrin', 'eda', 'edanur', 'edibe', 'efsa', 'efsun', 'ekin', 'ela', 'elanur', 'elcin', 'elif',
    'elifnur', 'elmas', 'elvan', 'emel', 'emine', 'emire', 'enise', 'eray', 'erva', 'ervanur', 'esila', 'esin', 'eslem', 'esma',
    'esmanur', 'esmeray', 'esra', 'esranur', 'evrim', 'eylul', 'eylem', 'eyup', 'ezgi',
    'fadime', 'fahriye', 'fatima', 'fatma', 'fatmanur', 'fazilet', 'fehime', 'ferah', 'feray', 'ferda', 'feride', 'feriha', 'feryal',
    'fevziye', 'feyza', 'feyzanur', 'fidan', 'figen', 'fikriye', 'filiz', 'firdevs', 'fulden', 'fulya', 'funda', 'furuzan',
    'gamze', 'gazel', 'gizem', 'gonca', 'gonul', 'gozde', 'gul', 'gulay', 'gulbahar', 'gulben', 'gulcan', 'gulcin', 'gulden',
    'gulderen', 'guler', 'gulfem', 'gulfer', 'gulhan', 'gulizar', 'gullu', 'gulnaz', 'gulnihal', 'gulnur', 'gulperi', 'gulru',
    'gulsen', 'gulseren', 'gulsum', 'gulsun', 'gulten', 'gunay', 'gunes', 'guniz', 'gunseli', 'guzin', 'gokce', 'gokcen', 'goksu',
    'habibe', 'hacer', 'hafize', 'hafsa', 'hale', 'halide', 'halime', 'hamide', 'handan', 'hande', 'hanife', 'hanim', 'harika',
    'hasibe', 'hasret', 'hatice', 'havva', 'havvanur', 'hayal', 'hayat', 'hayriye', 'hayrunnisa', 'hazal', 'hazan', 'hediye',
    'helin', 'hilal', 'hiranur', 'hira', 'hulya', 'humeyra', 'huri', 'huriye', 'hurrem', 'husniye', 'huzur',
    'irmak', 'isik', 'isil', 'isilay', 'itir', 'iffet', 'ikbal', 'iklim', 'ikra', 'ikranur', 'ilay', 'ilayda', 'ilgin', 'ilknur',
    'ilkay', 'ilke', 'ilkim', 'imge', 'imran', 'inci', 'incinur', 'inayet', 'ipek', 'irem', 'iremnur', 'irfan',
    'jale', 'julide',
    'kader', 'kadriye', 'kamile', 'ardelen', 'kardelen', 'ucuk', 'umran', 'kevser', 'kezban', 'kibar', 'kiymet', 'kiraz', 'kubra', 'kumru',
    'lale', 'lamia', 'latife', 'leman', 'letafet', 'leyla', 'lutfiye', 'lina', 'liya',
    'macide', 'mahinur', 'makbule', 'manolya', 'maral', 'medine', 'meftune', 'mehtap', 'melahat', 'melda', 'melek', 'meliha',
    'melike', 'melis', 'melisa', 'meltem', 'bennur', 'menekse', 'eral', 'meral', 'mercan', 'meriç', 'merve', 'mervenur', 'meryem',
    'mesude', 'munevver', 'müge', 'muge', 'mujde', 'mujgan', 'mukadder', 'mukaddes', 'munevver', 'munire', 'murselin', 'muserref',
    'mutlu', 'mualla', 'muazzez', 'muberra', 'mubeyyen', 'mufide', 'muhibe', 'muhterem', 'mumina', 'mumine', 'muntaha', 'muruvet',
    'muruvvet', 'muslime', 'lina', 'mira', 'miray', 'ina', 'mina', 'mine', 'mihriban', 'mihrimah',
    'aciye', 'naciye', 'ide', 'nadide', 'nadiye', 'afiye', 'nafiye', 'nagihan', 'nahide', 'naile', 'naime', 'nalan', 'arin',
    'narin', 'nasibe', 'az', 'naz', 'nazan', 'nazife', 'nazire', 'nazli', 'nazlican', 'nazmiye', 'nebahat', 'necla', 'necmiye',
    'nedret', 'nefes', 'nehir', 'nergis', 'neriman', 'nermin', 'neslihan', 'neslisah', 'nesrin', 'nese', 'nesibe', 'neval',
    'nevin', 'nevra', 'neyyire', 'nezahat', 'nezihe', 'nida', 'nidanur', 'igar', 'nigar', 'nihal', 'nihan', 'nil', 'nilay',
    'nilgun', 'nilufer', 'nimet', 'nisa', 'nisan', 'nisanur', 'nuran', 'nuray', 'nurcan', 'nurdan', 'nurgul', 'nurhan', 'nuriye',
    'nursel', 'nurseli', 'nursen', 'nursena', 'nurten', 'nur', 'nuseybe',
    'oksan', 'olcay', 'oya', 'oyku', 'ozden', 'ozge', 'ozlem', 'oznur', 'ozgul', 'ozgun',
    'pakize', 'apatya', 'papatya', 'pelin', 'pelinsu', 'pembe', 'perihan', 'pervin', 'petek', 'pinar', 'piril', 'püren',
    'rabia', 'rahsan', 'rahime', 'rana', 'aziye', 'raziye', 'rebia', 'refika', 'remziye', 'rengin', 'resmiye', 'reyhan', 'rezzan',
    'rukiye', 'rumeysa', 'ruveyda', 'ruya', 'ruzgar',
    'saadet', 'sabahat', 'sabiha', 'sabriye', 'sacide', 'sadiye', 'safiye', 'sahra', 'sakine', 'saliha', 'samime', 'sanem',
    'saniye', 'sara', 'sare', 'satı', 'sati', 'sebahat', 'sebnem', 'seda', 'sedanur', 'sedef', 'seher', 'selcan', 'selda',
    'selen', 'selin', 'selina', 'selma', 'selvi', 'sema', 'semanur', 'semiha', 'semra', 'sena', 'senanur', 'senay', 'senem',
    'seniha', 'serap', 'seray', 'seren', 'sermin', 'serpil', 'serra', 'sertap', 'servet', 'sevcan', 'sevda', 'sevde', 'sevdenur',
    'sevgi', 'sevil', 'sevilay', 'sevim', 'sevinc', 'seval', 'sevval', 'seyda', 'seydanur', 'seyhan', 'seyma', 'seymanur',
    'seyyide', 'sezen', 'sezer', 'sezgi', 'sibel', 'sidika', 'sila', 'silanur', 'simay', 'simge', 'sinem', 'siren', 'sirin',
    'solmaz', 'songul', 'su', 'suat', 'sueda', 'suheyla', 'sukran', 'sukriye', 'sule', 'sultan', 'sumeyra', 'sumeyye', 'suna',
    'sunay', 'reyya', 'sureyya', 'suzan', 'suzidil',
    'taciser', 'tahire', 'taliha', 'tansu', 'tanyeli', 'tuba', 'tugba', 'tugce', 'tulay', 'tulin', 'tulinhan', 'tumay', 'turkan',
    'turna', 'tutku', 'tuana', 'tuananur',
    'ufuk', 'ulku', 'ulviye', 'ummuhan', 'ummu', 'umran', 'umut',
    'vahide', 'vasfiye', 'vecibe', 'vedia', 'vesile', 'ildan', 'vildan', 'vuslat',
    'yagmur', 'yaprak', 'yaren', 'yasemin', 'yelda', 'yeliz', 'yesim', 'yeter', 'yildiz', 'yonca', 'yuksel', 'yusra',
    'zahide', 'zafer', 'zambak', 'zarife', 'zehra', 'zekiye', 'zeliha', 'zennube', 'zerrin', 'zeynep', 'zeynepnur', 'zisan',
    'ziynet', 'zübeyde', 'zubeyde', 'zuhal', 'zuleyha', 'zulal', 'zumra', 'zumrut'
]);

const TURKISH_MALE_NAMES = new Set([
    'abbas', 'abdi', 'abdulaziz', 'abdulbaki', 'abdulhamit', 'abdulkadir', 'abdulkerim', 'abdullah', 'abdulmecit', 'abdulmuttalip',
    'abdurrahim', 'abdurrahman', 'abidin', 'acar', 'adem', 'adil', 'adnan', 'affan', 'agah', 'ahmet', 'akif', 'akin', 'alattin',
    'alaaddin', 'ali', 'alihan', 'alim', 'alican', 'alkim', 'alp', 'alparslan', 'alper', 'alperen', 'alpay', 'altan', 'altay',
    'altug', 'anil', 'araf', 'aras', 'arda', 'arif', 'arkan', 'armagan', 'arvas', 'asaf', 'aslan', 'asim', 'askin', 'ata',
    'ataberk', 'atacan', 'atakan', 'atalay', 'atilla', 'atilla', 'avni', 'ayaz', 'ayberk', 'aydin', 'ayhan', 'aykan', 'aykut',
    'aytac', 'ayvaz', 'azad', 'azam', 'azer', 'aziz', 'azmi',
    'baha', 'bahadir', 'bahattin', 'bahri', 'baki', 'baran', 'barbaros', 'baris', 'ugur', 'bartu', 'basri', 'bati', 'batikan',
    'batu', 'batuhan', 'batur', 'baybars', 'bayram', 'bedir', 'bedirhan', 'bedri', 'behcet', 'behlul', 'behzat', 'bekir',
    'berat', 'berk', 'berkan', 'berkant', 'berkay', 'berke', 'besim', 'besir', 'beyazit', 'beytullah', 'bilal', 'bilgehan',
    'bilgin', 'birol', 'bora', 'boran', 'bugra', 'bugrahan', 'bulent', 'bulut', 'bunyamin', 'burak', 'burhan', 'burhanettin',
    'cafer', 'cahit', 'can', 'canberk', 'caner', 'cankat', 'cansin', 'celal', 'celalettin', 'celil', 'cem', 'cemal', 'cemalettin',
    'cemil', 'cenap', 'cengiz', 'cengizhan', 'cenk', 'cevahir', 'cevdet', 'cevat', 'ceyhun', 'cezmi', 'cihan', 'cihangir',
    'cihat', 'civan', 'coskun', 'cuma', 'cumali', 'cuneyt', 'cagan', 'cagatay', 'cagdas', 'caglar', 'cagri', 'cinar',
    'davut', 'demir', 'demirhan', 'deniz', 'denizhan', 'dervis', 'devlet', 'devran', 'dilaver', 'dincer', 'dogan', 'dogukan',
    'dogus', 'doruk', 'dorukhan', 'duran', 'durmus', 'dursun', 'dundar',
    'ebubekir', 'ecevit', 'edip', 'ediz', 'efe', 'efekan', 'efehan', 'egemen', 'ekrem', 'elvan', 'emin', 'emir', 'emirhan',
    'emrah', 'emre', 'emrullah', 'ender', 'enes', 'engin', 'enis', 'ensar', 'enver', 'eralp', 'eray', 'ercan', 'ercument',
    'erdal', 'erdem', 'erden', 'erdinc', 'erdogan', 'eren', 'ergin', 'ergun', 'erhan', 'erkan', 'erkin', 'erman', 'erol',
    'ersan', 'ersen', 'ersin', 'ertan', 'erten', 'ertugrul', 'esat', 'esref', 'etem', 'ethem', 'evren', 'eymen', 'eyup', 'ezel',
    'fadil', 'fahir', 'fahrettin', 'fahri', 'faik', 'faruk', 'fatih', 'fazil', 'fehmi', 'ferdi', 'ferhat', 'feridun', 'ferit',
    'ferman', 'ferruh', 'fethi', 'fetullah', 'fevzi', 'feyyaz', 'feyzullah', 'fikret', 'fikri', 'firat', 'fuat', 'furkan',
    'galip', 'gani', 'gazi', 'gediz', 'gencay', 'giray', 'gokalp', 'gokberk', 'gokhan', 'gokmen', 'goksel', 'goktug', 'gokturk',
    'gurol', 'gurkan', 'gursel', 'guven', 'guvenc',
    'habip', 'haci', 'hakan', 'hakki', 'haldun', 'halil', 'halim', 'halis', 'halit', 'haluk', 'hamdi', 'hamdullah', 'hamit',
    'hamza', 'harun', 'hasan', 'hasim', 'hasmet', 'hatip', 'hayati', 'haydar', 'hayrettin', 'hayri', 'hayrullah', 'hidayet',
    'hikmet', 'hilmi', 'himmet', 'hizir', 'hulusi', 'hursit', 'huseyin', 'husnu', 'huzeyfe',
    'ibrahim', 'idris', 'ihsan', 'ikram', 'ilbey', 'ilgar', 'ilhami', 'ilhan', 'ilker', 'il체', 'ilyas', 'imdat', 'inanc',
    'irfan', 'isa', 'ishak', 'islam', 'ismail', 'ismet', 'izzet', 'izzettin',
    'kaan', 'kadir', 'kadri', 'kagan', 'kahraman', 'kamber', 'kamil', 'ani', 'kartal', 'kasim', 'kaya', 'kayahan', 'kayra',
    'kazim', 'kemal', 'kemalettin', 'kenan', 'kerem', 'kerim', 'kilic', 'ivanc', 'kivanc', 'koray', 'korcan', 'korhan',
    'korkmaz', 'korkut', 'köksal', 'koksal', 'kubat', 'kubilay', 'kudret', 'kursat', 'kutay', 'kutlu', 'kutluhan', 'kuzey',
    'latif', 'levent', 'lokman', 'lutfi', 'lutfu',
    'macit', 'mahir', 'mahmut', 'mahzun', 'mazhar', 'mazlum', 'mecit', 'medet', 'mehmet', 'melih', 'memduh', 'menderes',
    'mert', 'mertcan', 'merthan', 'mesut', 'mete', 'metehan', 'metin', 'mevlut', 'mikail', 'mirac', 'miran', 'mirza',
    'mithat', 'muammer', 'mucahit', 'muhammed', 'muhammet', 'muharrem', 'muhittin', 'muhlis', 'muhsin', 'muhterem', 'mujdat',
    'mukerrem', 'mumin', 'mumtaz', 'munir', 'murat', 'murathan', 'mursel', 'murtaza', 'musa', 'muslum', 'mustafa', 'mutlu',
    'muzaffer',
    'aci', 'naci', 'adir', 'nadir', 'afiz', 'nafiz', 'nahit', 'nail', 'naim', 'namik', 'nasuh', 'nasuhi', 'azif', 'nazif',
    'nazim', 'nazmi', 'nebi', 'necati', 'necdet', 'necip', 'necmettin', 'necmi', 'nedim', 'nejat', 'neset', 'nevzat', 'nezih',
    'nihat', 'niyazi', 'nizam', 'nizamettin', 'nuh', 'numan', 'nurettin', 'nuri', 'nurullah', 'nusret',
    'oguz', 'oguzhan', 'okan', 'oktay', 'olcay', 'olgün', 'omer', 'omur', 'onur', 'onurcan', 'orhan', 'orkun', 'oruc', 'osman',
    'ozan', 'ozcan', 'ozdemir', 'ozden', 'ozer', 'ozgur', 'ozhan', 'ozkan', 'ozmen', 'ozyurek',
    'polat', 'poyraz',
    'rafet', 'ragip', 'rahim', 'rahmi', 'raif', 'ramazan', 'ramiz', 'rasim', 'rasit', 'rauf', 'recai', 'recep', 'refik',
    'reha', 'remzi', 'resat', 'resit', 'resul', 'ridvan', 'rifat', 'rifki', 'riza', 'ruhi', 'rusen', 'rustem', 'rustu', 'ruzgar',
    'sabahattin', 'saban', 'sabri', 'sacit', 'sadettin', 'sadi', 'sadik', 'sadri', 'safa', 'saffet', 'sahin', 'said', 'sait',
    'sakir', 'salih', 'salim', 'samet', 'sami', 'samil', 'sancar', 'sarp', 'sarper', 'savas', 'sebahattin', 'seckin', 'sedat',
    'sefa', 'sefer', 'sehmus', 'selahattin', 'selami', 'selcuk', 'selim', 'selman', 'semih', 'sercan', 'serdar', 'serhan',
    'serhat', 'serkan', 'sermet', 'sertac', 'sertan', 'servet', 'server', 'seyfettin', 'seyfi', 'seyfullah', 'seyhan', 'seyit',
    'seyyit', 'seza', 'sezai', 'sezer', 'sezgin', 'aban', 'sidik', 'sinan', 'sinasi', 'sirac', 'sirri', 'soner', 'suat',
    'subhi', 'suha', 'sukru', 'suleyman', 'suphi', 'sureyya',
    'tacettin', 'taha', 'tahir', 'tahsin', 'talat', 'talha', 'talip', 'tamer', 'taner', 'tanju', 'tarik', 'tarkan', 'taskin',
    'tayfun', 'tayfur', 'taylan', 'tayyar', 'tayyip', 'tekin', 'temel', 'oman', 'teoman', 'tevfik', 'oman', 'timucin', 'timur',
    'tolga', 'tolgahan', 'toprak', 'toygar', 'tufan', 'tugay', 'tugberk', 'tugrul', 'tuna', 'tunahan', 'tunc', 'tuncay',
    'tuncer', 'turan', 'turgay', 'turgut', 'turhan', 'turkay', 'turker',
    'ufuk', 'ugur', 'ugurcan', 'ulas', 'ulvi', 'umit', 'umut', 'unal', 'unay', 'unsal', 'utku', 'uzeyir',
    'vahap', 'vahdet', 'vahdettin', 'vahit', 'ural', 'vatan', 'vecdi', 'vedat', 'vefa', 'vefik', 'vehbi', 'veli', 'ural',
    'veysel', 'veysi', 'volkan', 'vural',
    'yahya', 'yakup', 'yalcin', 'yalin', 'yamac', 'yaman', 'yasar', 'yasin', 'yavuz', 'yekta', 'yener', 'yigit', 'yigitcan',
    'yildiray', 'yildirim', 'yilmaz', 'yunus', 'yurdakul', 'yusuf', 'yucel', 'yuksel',
    'zafer', 'zahit', 'zahir', 'zekai', 'zekeriya', 'zeki', 'zeynel', 'zey빌', 'zihni', 'ziya', 'zubeyir', 'zulfikar', 'zulkuf'
]);

const normalizeNameForLookup = (str: string): string => {
    return String(str || '')
        .trim()
        .replace(/İ/g, 'i')
        .replace(/I/g, 'i')
        .replace(/ı/g, 'i')
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z]/g, '');
};

export const parseStudentGenderToken = (raw: any): 'K' | 'E' | null => {
    if (!raw) return null;
    const cleaned = normalizeNameForLookup(String(raw));
    if (!cleaned) return null;
    if (cleaned === 'k' || cleaned === 'kiz' || cleaned === 'kadin' || cleaned === 'bayan' || cleaned === 'female') {
        return 'K';
    }
    if (cleaned === 'e' || cleaned === 'erkek' || cleaned === 'bay' || cleaned === 'male') {
        return 'E';
    }
    return null;
};

export const inferStudentGender = (fullName: string): 'K' | 'E' => {
    if (!fullName) return 'E';
    // Strip optional student number prefix e.g. "123 - AD SOYAD"
    const pure = String(fullName)
        .replace(/^\s*\d+\s*[-–—:.\s]+\s*/, '')
        .replace(/\s*[-–—]\s*(K|E|KIZ|ERKEK|KADIN)\s*$/i, '')
        .trim();
    const parts = pure.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'E';

    // Check first name and second given name (if student has 2 given names + 1 surname)
    const givenNames = parts.length > 2 ? [parts[0], parts[1]] : [parts[0]];

    for (let i = givenNames.length - 1; i >= 0; i--) {
        const token = normalizeNameForLookup(givenNames[i]);
        if (!token) continue;
        if (TURKISH_FEMALE_NAMES.has(token) && !TURKISH_MALE_NAMES.has(token)) return 'K';
        if (TURKISH_MALE_NAMES.has(token) && !TURKISH_FEMALE_NAMES.has(token)) return 'E';
    }

    const firstToken = normalizeNameForLookup(parts[0]);
    if (TURKISH_FEMALE_NAMES.has(firstToken)) return 'K';
    if (TURKISH_MALE_NAMES.has(firstToken)) return 'E';

    // Suffix heuristics for compound Turkish names
    if (/(nur|gul|su|naz|nisan|nisa|sima|hanim|kiz|peri)$/.test(firstToken)) return 'K';
    if (/(han|can|berk|alp|bey|kan|ullah|ettin|iddin)$/.test(firstToken)) return 'E';

    return 'E';
};

export const parseStudentInputEntry = (
    rawLine: string,
    explicitStudentNo?: string
): { formattedName: string; gender: 'K' | 'E'; explicitGender: 'K' | 'E' | null } => {
    let str = String(rawLine || '').trim();
    let explicitGender: 'K' | 'E' | null = null;

    // Check if the line ends with "- K", "- E", "- Kız", "- Erkek"
    const genderSuffixMatch = str.match(/^(.*?)\s*[-–—]\s*(K|E|Kız|KIZ|Erkek|ERKEK|Kadın|KADIN)\s*$/i);
    if (genderSuffixMatch && genderSuffixMatch[1]?.trim()) {
        str = genderSuffixMatch[1].trim();
        explicitGender = parseStudentGenderToken(genderSuffixMatch[2]);
    }

    if (explicitStudentNo?.trim()) {
        const pure = str.replace(/^(\d+)\s*[-–—]*\s*/, '').trim();
        str = `${explicitStudentNo.trim()} - ${pure}`;
    } else {
        const match = str.match(/^(\d+)\s*[-–—]*\s*(.+)$/);
        if (match) {
            str = `${match[1]} - ${match[2].trim()}`;
        }
    }

    const gender = explicitGender || inferStudentGender(str);
    return { formattedName: str, gender, explicitGender };
};

