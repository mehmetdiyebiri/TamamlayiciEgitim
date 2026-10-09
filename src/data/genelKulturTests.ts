import pdf6Data from './pdf6.json';
import pdf7Data from './pdf7.json';
import pdf8Data from './pdf8.json';
export interface GKQuestion {
    didYouKnow?: string;
    contextId?: string;
    id: string;
    text: string;
    options: { A: string; B: string; C: string; D: string; };
    correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface GKContext {
    id: string;
    type: 'text' | 'table';
    content: string;
}

export interface GKTest {
    introText?: string;
    contexts?: GKContext[];
    id: string;
    title: string;
    classLevel: string;
    difficulty: number;
    questions: GKQuestion[];
}

export const genelKulturTests: GKTest[] = [];

class PRNG {
    seed: number;
    constructor(seed: number) {
        this.seed = seed;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    nextInt(min: number, max: number) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    pick<T>(arr: T[]): T {
        return arr[this.nextInt(0, arr.length - 1)];
    }
    shuffle<T>(arr: T[]): T[] {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }
}

const rng = new PRNG(1453); // Fixed seed to maintain consistency

function generateOptions(correct: string, wrongs: string[]) {
    const uniqueWrongs = Array.from(new Set(wrongs)).filter(w => w !== correct);
    let all = [correct, ...uniqueWrongs].slice(0, 4);
    
    const genericWrongs = ["Hiçbiri", "Bilinmiyor", "Diğer", "Farklı"];
    let gi = 0;
    while(all.length < 4) {
        all.push(genericWrongs[gi++] || "Bilinmiyor");
    }
    all = rng.shuffle(all);
    const letters = ['A', 'B', 'C', 'D'] as const;
    const options: any = {};
    let correctAnswer: any = 'A';
    all.forEach((val, idx) => {
        options[letters[idx]] = val;
        if (val === correct) correctAnswer = letters[idx];
    });
    return { options, correctAnswer };
}

// ----------------------------------------------------------------------
// KAPSAMLI GENEL KÜLTÜR VERİ TABANI
// ----------------------------------------------------------------------

const countries = [
    { name: "Türkiye", capital: "Ankara", continent: "Avrasya", currency: "Türk Lirası" },
    { name: "Almanya", capital: "Berlin", continent: "Avrupa", currency: "Euro" },
    { name: "Fransa", capital: "Paris", continent: "Avrupa", currency: "Euro" },
    { name: "İtalya", capital: "Roma", continent: "Avrupa", currency: "Euro" },
    { name: "İspanya", capital: "Madrid", continent: "Avrupa", currency: "Euro" },
    { name: "Japonya", capital: "Tokyo", continent: "Asya", currency: "Yen" },
    { name: "İngiltere", capital: "Londra", continent: "Avrupa", currency: "Sterlin" },
    { name: "Rusya", capital: "Moskova", continent: "Avrasya", currency: "Ruble" },
    { name: "Mısır", capital: "Kahire", continent: "Afrika", currency: "Mısır Lirası" },
    { name: "Yunanistan", capital: "Atina", continent: "Avrupa", currency: "Euro" },
    { name: "Azerbaycan", capital: "Bakü", continent: "Asya", currency: "Manat" },
    { name: "Çin", capital: "Pekin", continent: "Asya", currency: "Yuan" },
    { name: "ABD", capital: "Washington", continent: "Kuzey Amerika", currency: "Dolar" },
    { name: "Brezilya", capital: "Brasilia", continent: "Güney Amerika", currency: "Real" },
    { name: "Arjantin", capital: "Buenos Aires", continent: "Güney Amerika", currency: "Peso" },
    { name: "Hindistan", capital: "Yeni Delhi", continent: "Asya", currency: "Rupi" },
    { name: "Avustralya", capital: "Kanberra", continent: "Okyanusya", currency: "Avustralya Doları" },
    { name: "Kanada", capital: "Ottawa", continent: "Kuzey Amerika", currency: "Kanada Doları" },
    { name: "Meksika", capital: "Meksiko", continent: "Kuzey Amerika", currency: "Meksika Pesosu" },
    { name: "Güney Kore", capital: "Seul", continent: "Asya", currency: "Won" },
    { name: "Suudi Arabistan", capital: "Riyad", continent: "Asya", currency: "Riyal" },
    { name: "İran", capital: "Tahran", continent: "Asya", currency: "Riyal" },
    { name: "Irak", capital: "Bağdat", continent: "Asya", currency: "Dinar" },
    { name: "Suriye", capital: "Şam", continent: "Asya", currency: "Suriye Lirası" },
    { name: "İsveç", capital: "Stokholm", continent: "Avrupa", currency: "Krona" },
    { name: "Norveç", capital: "Oslo", continent: "Avrupa", currency: "Krone" },
    { name: "Finlandiya", capital: "Helsinki", continent: "Avrupa", currency: "Euro" },
    { name: "Danimarka", capital: "Kopenhag", continent: "Avrupa", currency: "Krone" },
    { name: "İsviçre", capital: "Bern", continent: "Avrupa", currency: "İsviçre Frangı" },
    { name: "Hollanda", capital: "Amsterdam", continent: "Avrupa", currency: "Euro" }
];

const elements = [
    { n: "Hidrojen", s: "H", num: "1" }, { n: "Helyum", s: "He", num: "2" }, 
    { n: "Lityum", s: "Li", num: "3" }, { n: "Berilyum", s: "Be", num: "4" },
    { n: "Bor", s: "B", num: "5" }, { n: "Karbon", s: "C", num: "6" },
    { n: "Azot", s: "N", num: "7" }, { n: "Oksijen", s: "O", num: "8" },
    { n: "Flor", s: "F", num: "9" }, { n: "Neon", s: "Ne", num: "10" },
    { n: "Sodyum", s: "Na", num: "11" }, { n: "Magnezyum", s: "Mg", num: "12" },
    { n: "Alüminyum", s: "Al", num: "13" }, { n: "Silisyum", s: "Si", num: "14" },
    { n: "Fosfor", s: "P", num: "15" }, { n: "Kükürt", s: "S", num: "16" },
    { n: "Klor", s: "Cl", num: "17" }, { n: "Argon", s: "Ar", num: "18" },
    { n: "Potasyum", s: "K", num: "19" }, { n: "Kalsiyum", s: "Ca", num: "20" },
    { n: "Demir", s: "Fe", num: "26" }, { n: "Bakır", s: "Cu", num: "29" },
    { n: "Çinko", s: "Zn", num: "30" }, { n: "Gümüş", s: "Ag", num: "47" },
    { n: "Altın", s: "Au", num: "79" }, { n: "Cıva", s: "Hg", num: "80" }
];

const historyEvents = [
    { e: "Cumhuriyet'in İlanı", y: "1923" }, { e: "İstanbul'un Fethi", y: "1453" },
    { e: "Malazgirt Zaferi", y: "1071" }, { e: "TBMM'nin Açılışı", y: "1920" },
    { e: "Fransız İhtilali", y: "1789" }, { e: "Ankara Savaşı", y: "1402" },
    { e: "Amerika'nın Keşfi", y: "1492" }, { e: "Kavimler Göçü", y: "375" },
    { e: "1. Dünya Savaşı Başlangıcı", y: "1914" }, { e: "1. Dünya Savaşı Bitişi", y: "1918" },
    { e: "2. Dünya Savaşı Başlangıcı", y: "1939" }, { e: "2. Dünya Savaşı Bitişi", y: "1945" },
    { e: "Lozan Barış Antlaşması", y: "1923" }, { e: "Mudanya Mütarekesi", y: "1922" },
    { e: "Çanakkale Zaferi", y: "1915" }, { e: "Sakarya Meydan Muharebesi", y: "1921" },
    { e: "Büyük Taarruz", y: "1922" }, { e: "Amasya Genelgesi", y: "1919" },
    { e: "Erzurum Kongresi", y: "1919" }, { e: "Sivas Kongresi", y: "1919" },
    { e: "Saltanatın Kaldırılması", y: "1922" }, { e: "Halifeliğin Kaldırılması", y: "1924" },
    { e: "Soyadı Kanunu", y: "1934" }, { e: "Harf İnkılabı", y: "1928" },
    { e: "Preveze Deniz Zaferi", y: "1538" }, { e: "Kıbrıs'ın Fethi", y: "1571" }
];

const literature = [
    { a: "Mehmet Akif Ersoy", b: "Safahat" }, { a: "Necip Fazıl Kısakürek", b: "Çile" },
    { a: "Yahya Kemal Beyatlı", b: "Kendi Gök Kubbemiz" }, { a: "Reşat Nuri Güntekin", b: "Çalıkuşu" },
    { a: "Orhan Pamuk", b: "Kar" }, { a: "Yakup Kadri Karaosmanoğlu", b: "Yaban" },
    { a: "Sabahattin Ali", b: "Kürk Mantolu Madonna" }, { a: "Dostoyevski", b: "Suç ve Ceza" },
    { a: "Victor Hugo", b: "Sefiller" }, { a: "Tolstoy", b: "Savaş ve Barış" },
    { a: "Halide Edip Adıvar", b: "Ateşten Gömlek" }, { a: "Oğuz Atay", b: "Tutunamayanlar" },
    { a: "Namık Kemal", b: "İntibah" }, { a: "Şinasi", b: "Şair Evlenmesi" },
    { a: "Ahmet Hamdi Tanpınar", b: "Saatleri Ayarlama Enstitüsü" }, { a: "Peyami Safa", b: "Dokuzuncu Hariciye Koğuşu" },
    { a: "Halit Ziya Uşaklıgil", b: "Aşk-ı Memnu" }, { a: "Cervantes", b: "Don Kişot" },
    { a: "Shakespeare", b: "Hamlet" }, { a: "Goethe", b: "Faust" },
    { a: "Gabriel Garcia Marquez", b: "Yüzyıllık Yalnızlık" }, { a: "George Orwell", b: "1984" },
    { a: "Antoine de Saint-Exupéry", b: "Küçük Prens" }, { a: "Franz Kafka", b: "Dönüşüm" },
    { a: "Orhan Veli Kanık", b: "Garip" }, { a: "Cemal Süreya", b: "Üvercinka" }
];

const inventions = [
    { inventor: "Thomas Edison", invention: "Ampul" }, { inventor: "Alexander Graham Bell", invention: "Telefon" },
    { inventor: "Guglielmo Marconi", invention: "Radyo" }, { inventor: "Wright Kardeşler", invention: "Uçak" },
    { inventor: "Karl Benz", invention: "Otomobil" }, { inventor: "Johannes Gutenberg", invention: "Matbaa" },
    { inventor: "Alexander Fleming", invention: "Penisilin" }, { inventor: "John Logie Baird", invention: "Televizyon" },
    { inventor: "James Watt", invention: "Buhar Makinesi" }, { inventor: "Tim Berners-Lee", invention: "World Wide Web" },
    { inventor: "Louis Pasteur", invention: "Kuduz Aşısı" }, { inventor: "Isaac Newton", invention: "Yerçekimi Kanunu" },
    { inventor: "Albert Einstein", invention: "İzafiyet Teorisi" }, { inventor: "Marie Curie", invention: "Radyoaktivite" },
    { inventor: "Galileo Galilei", invention: "Teleskop" }, { inventor: "Nikola Tesla", invention: "Alternatif Akım" }
];

const planets = [
    { p: "Merkür", f: "Güneş'e en yakın gezegen" },
    { p: "Venüs", f: "Çoban Yıldızı olarak da bilinen gezegen" },
    { p: "Dünya", f: "Üzerinde yaşam olduğu bilinen tek gezegen" },
    { p: "Mars", f: "Kızıl Gezegen olarak bilinen gezegen" },
    { p: "Jüpiter", f: "Güneş sisteminin en büyük gezegeni" },
    { p: "Satürn", f: "Halkalarıyla ünlü gezegen" },
    { p: "Uranüs", f: "Yana yatmış bir varil gibi dönen gezegen" },
    { p: "Neptün", f: "Güneş sisteminin en uzak gezegeni" }
];

const trCities = [
    { city: "Adana", plate: "01", region: "Akdeniz" }, { city: "Adıyaman", plate: "02", region: "Güneydoğu Anadolu" },
    { city: "Afyonkarahisar", plate: "03", region: "Ege" }, { city: "Ağrı", plate: "04", region: "Doğu Anadolu" },
    { city: "Amasya", plate: "05", region: "Karadeniz" }, { city: "Ankara", plate: "06", region: "İç Anadolu" },
    { city: "Antalya", plate: "07", region: "Akdeniz" }, { city: "Artvin", plate: "08", region: "Karadeniz" },
    { city: "Aydın", plate: "09", region: "Ege" }, { city: "Balıkesir", plate: "10", region: "Marmara" },
    { city: "Bilecik", plate: "11", region: "Marmara" }, { city: "Bingöl", plate: "12", region: "Doğu Anadolu" },
    { city: "Bitlis", plate: "13", region: "Doğu Anadolu" }, { city: "Bolu", plate: "14", region: "Karadeniz" },
    { city: "Burdur", plate: "15", region: "Akdeniz" }, { city: "Bursa", plate: "16", region: "Marmara" },
    { city: "Çanakkale", plate: "17", region: "Marmara" }, { city: "Çankırı", plate: "18", region: "İç Anadolu" },
    { city: "Çorum", plate: "19", region: "Karadeniz" }, { city: "Denizli", plate: "20", region: "Ege" },
    { city: "Diyarbakır", plate: "21", region: "Güneydoğu Anadolu" }, { city: "Edirne", plate: "22", region: "Marmara" },
    { city: "Elazığ", plate: "23", region: "Doğu Anadolu" }, { city: "Erzincan", plate: "24", region: "Doğu Anadolu" },
    { city: "Erzurum", plate: "25", region: "Doğu Anadolu" }, { city: "Eskişehir", plate: "26", region: "İç Anadolu" },
    { city: "Gaziantep", plate: "27", region: "Güneydoğu Anadolu" }, { city: "Giresun", plate: "28", region: "Karadeniz" },
    { city: "Gümüşhane", plate: "29", region: "Karadeniz" }, { city: "Hakkari", plate: "30", region: "Doğu Anadolu" },
    { city: "Hatay", plate: "31", region: "Akdeniz" }, { city: "Isparta", plate: "32", region: "Akdeniz" },
    { city: "Mersin", plate: "33", region: "Akdeniz" }, { city: "İstanbul", plate: "34", region: "Marmara" },
    { city: "İzmir", plate: "35", region: "Ege" }, { city: "Kars", plate: "36", region: "Doğu Anadolu" },
    { city: "Kastamonu", plate: "37", region: "Karadeniz" }, { city: "Kayseri", plate: "38", region: "İç Anadolu" },
    { city: "Kırklareli", plate: "39", region: "Marmara" }, { city: "Kırşehir", plate: "40", region: "İç Anadolu" },
    { city: "Kocaeli", plate: "41", region: "Marmara" }, { city: "Konya", plate: "42", region: "İç Anadolu" },
    { city: "Kütahya", plate: "43", region: "Ege" }, { city: "Malatya", plate: "44", region: "Doğu Anadolu" },
    { city: "Manisa", plate: "45", region: "Ege" }, { city: "Kahramanmaraş", plate: "46", region: "Akdeniz" },
    { city: "Mardin", plate: "47", region: "Güneydoğu Anadolu" }, { city: "Muğla", plate: "48", region: "Ege" },
    { city: "Muş", plate: "49", region: "Doğu Anadolu" }, { city: "Nevşehir", plate: "50", region: "İç Anadolu" },
    { city: "Niğde", plate: "51", region: "İç Anadolu" }, { city: "Ordu", plate: "52", region: "Karadeniz" },
    { city: "Rize", plate: "53", region: "Karadeniz" }, { city: "Sakarya", plate: "54", region: "Marmara" },
    { city: "Samsun", plate: "55", region: "Karadeniz" }, { city: "Siirt", plate: "56", region: "Güneydoğu Anadolu" },
    { city: "Sinop", plate: "57", region: "Karadeniz" }, { city: "Sivas", plate: "58", region: "İç Anadolu" },
    { city: "Tekirdağ", plate: "59", region: "Marmara" }, { city: "Tokat", plate: "60", region: "Karadeniz" },
    { city: "Trabzon", plate: "61", region: "Karadeniz" }, { city: "Tunceli", plate: "62", region: "Doğu Anadolu" },
    { city: "Şanlıurfa", plate: "63", region: "Güneydoğu Anadolu" }, { city: "Uşak", plate: "64", region: "Ege" },
    { city: "Van", plate: "65", region: "Doğu Anadolu" }, { city: "Yozgat", plate: "66", region: "İç Anadolu" },
    { city: "Zonguldak", plate: "67", region: "Karadeniz" }, { city: "Aksaray", plate: "68", region: "İç Anadolu" },
    { city: "Bayburt", plate: "69", region: "Karadeniz" }, { city: "Karaman", plate: "70", region: "İç Anadolu" },
    { city: "Kırıkkale", plate: "71", region: "İç Anadolu" }, { city: "Batman", plate: "72", region: "Güneydoğu Anadolu" },
    { city: "Şırnak", plate: "73", region: "Güneydoğu Anadolu" }, { city: "Bartın", plate: "74", region: "Karadeniz" },
    { city: "Ardahan", plate: "75", region: "Doğu Anadolu" }, { city: "Iğdır", plate: "76", region: "Doğu Anadolu" },
    { city: "Yalova", plate: "77", region: "Marmara" }, { city: "Karabük", plate: "78", region: "Karadeniz" },
    { city: "Kilis", plate: "79", region: "Güneydoğu Anadolu" }, { city: "Osmaniye", plate: "80", region: "Akdeniz" },
    { city: "Düzce", plate: "81", region: "Karadeniz" }
];

const generalFacts = [
    { q: "Türkiye'nin uluslararası telefon kodu nedir?", a: "+90", w: ["+1", "+49", "+44"] },
    { q: "Bir gün kaç dakikadır?", a: "1440", w: ["1200", "1600", "1800"] },
    { q: "İstiklal Marşı'nın bestecisi kimdir?", a: "Osman Zeki Üngör", w: ["Mehmet Akif Ersoy", "Cemal Reşit Rey", "Ahmet Adnan Saygun"] },
    { q: "Türkiye Büyük Millet Meclisi hangi şehirde bulunmaktadır?", a: "Ankara", w: ["İstanbul", "İzmir", "Bursa"] },
    { q: "Dünya'nın şekli nasıldır?", a: "Geoit", w: ["Küre", "Düz", "Elips"] },
    { q: "Türkiye'de kaç coğrafi bölge bulunmaktadır?", a: "7", w: ["5", "6", "8"] },
    { q: "Mustafa Kemal Atatürk hangi yılda doğmuştur?", a: "1881", w: ["1938", "1880", "1890"] },
    { q: "Suyun kimyasal formülü nedir?", a: "H2O", w: ["CO2", "O2", "NaCl"] },
    { q: "İnsan vücudundaki en büyük organ hangisidir?", a: "Deri", w: ["Karaciğer", "Kalp", "Beyin"] },
    { q: "Hangi kan grubu 'Genel Alıcı' olarak bilinir?", a: "AB", w: ["0", "A", "B"] },
    { q: "Hangi kan grubu 'Genel Verici' olarak bilinir?", a: "0", w: ["AB", "A", "B"] },
    { q: "Olimpiyat oyunlarının sembolündeki 5 halka neyi temsil eder?", a: "Kıtaları", w: ["Okyanusları", "Ülkeleri", "Spor Dallarını"] },
    { q: "Nobel ödülleri hangi ülkede verilmektedir?", a: "İsveç", w: ["Norveç", "İsviçre", "Danimarka"] },
    { q: "Güneş sistemimizde üzerinde yaşadığımız gezegen hangisidir?", a: "Dünya", w: ["Mars", "Venüs", "Jüpiter"] },
    { q: "Işık hızı saniyede yaklaşık kaç kilometredir?", a: "300.000", w: ["30.000", "3.000.000", "3.000"] }
];

// Combinatorial Generator
function genPairQuestion(data: any[], key1: string, key2: string, typeLabel: string, isFindWrong: boolean) {
    let items: any[] = [];
    while (items.length < 4) {
        let candidate = rng.pick(data);
        if (!items.find(i => i[key1] === candidate[key1])) {
            items.push(candidate);
        }
    }
    
    if (isFindWrong) {
        let wrongVal;
        while(true) {
            let alt = rng.pick(data);
            if (alt[key2] !== items[0][key2]) {
                wrongVal = alt[key2];
                break;
            }
        }
        let correct = `${items[0][key1]} - ${wrongVal}`;
        let wrongs = [
            `${items[1][key1]} - ${items[1][key2]}`,
            `${items[2][key1]} - ${items[2][key2]}`,
            `${items[3][key1]} - ${items[3][key2]}`
        ];
        return { 
            text: `Aşağıdaki ${typeLabel} eşleştirmelerinden hangisi yanlıştır?`, 
            correct, 
            wrongs 
        };
    } else {
        let wrongs = [];
        for(let i=1; i<=3; i++) {
            let wrongVal;
            while(true) {
                let alt = rng.pick(data);
                if (alt[key2] !== items[i][key2]) {
                    wrongVal = alt[key2];
                    break;
                }
            }
            wrongs.push(`${items[i][key1]} - ${wrongVal}`);
        }
        return { 
            text: `Aşağıdaki ${typeLabel} eşleştirmelerinden hangisi doğrudur?`, 
            correct: `${items[0][key1]} - ${items[0][key2]}`, 
            wrongs 
        };
    }
}

// All Generators
const generators = [
    // Direct Questions
    () => {
        const q = rng.pick(countries);
        const wrongs = countries.filter(c => c.capital !== q.capital).map(c => c.capital);
        return { text: `${q.name} ülkesinin başkenti neresidir?`, correct: q.capital, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(countries);
        const wrongs = countries.filter(c => c.currency !== q.currency).map(c => c.currency);
        return { text: `${q.name} ülkesinin resmi para birimi nedir?`, correct: q.currency, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(elements);
        const wrongs = elements.filter(e => e.s !== q.s).map(e => e.s);
        return { text: `Kimyada '${q.s}' sembolü ile gösterilen element hangisidir?`, correct: q.n, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(historyEvents);
        const wrongs = historyEvents.filter(h => h.y !== q.y).map(h => h.y);
        return { text: `'${q.e}' tarihi olayı hangi yılda gerçekleşmiştir?`, correct: q.y, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(historyEvents);
        const wrongs = historyEvents.filter(h => h.e !== q.e).map(h => h.e);
        return { text: `${q.y} yılında gerçekleşen önemli tarihi olay aşağıdakilerden hangisidir?`, correct: q.e, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(literature);
        const wrongs = literature.filter(l => l.a !== q.a).map(l => l.a);
        return { text: `Türk ve Dünya edebiyatının önemli eserlerinden '${q.b}' kitabının yazarı kimdir?`, correct: q.a, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(inventions);
        const wrongs = inventions.filter(i => i.inventor !== q.inventor).map(i => i.inventor);
        return { text: `'${q.invention}' icadını yapan ünlü bilim insanı / mucit kimdir?`, correct: q.inventor, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(planets);
        const wrongs = planets.filter(p => p.p !== q.p).map(p => p.p);
        return { text: `${q.f} aşağıdakilerden hangisidir?`, correct: q.p, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(trCities);
        const wrongs = trCities.filter(c => c.plate !== q.plate).map(c => c.plate);
        return { text: `Plaka kodu '${q.plate}' olan ilimiz hangisidir?`, correct: q.city, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(trCities);
        const wrongs = ["Marmara", "Ege", "Akdeniz", "Karadeniz", "İç Anadolu", "Doğu Anadolu", "Güneydoğu Anadolu"].filter(r => r !== q.region);
        return { text: `${q.city} ilimiz hangi coğrafi bölgemizde yer almaktadır?`, correct: q.region, wrongs: rng.shuffle(wrongs).slice(0, 3) };
    },
    () => {
        const q = rng.pick(generalFacts);
        return { text: q.q, correct: q.a, wrongs: q.w };
    },
    
    // Combinatorial Questions (Virtually infinite combinations)
    () => genPairQuestion(countries, "name", "capital", "ülke - başkent", true),
    () => genPairQuestion(countries, "name", "capital", "ülke - başkent", false),
    () => genPairQuestion(countries, "name", "currency", "ülke - para birimi", true),
    () => genPairQuestion(countries, "name", "currency", "ülke - para birimi", false),
    () => genPairQuestion(trCities, "city", "plate", "il - plaka", true),
    () => genPairQuestion(trCities, "city", "plate", "il - plaka", false),
    () => genPairQuestion(trCities, "city", "region", "il - bölge", true),
    () => genPairQuestion(trCities, "city", "region", "il - bölge", false),
    () => genPairQuestion(elements, "n", "s", "element - sembol", true),
    () => genPairQuestion(elements, "n", "s", "element - sembol", false),
    () => genPairQuestion(historyEvents, "e", "y", "tarihi olay - yıl", true),
    () => genPairQuestion(historyEvents, "e", "y", "tarihi olay - yıl", false),
    () => genPairQuestion(literature, "a", "b", "yazar - eser", true),
    () => genPairQuestion(literature, "a", "b", "yazar - eser", false),
    () => genPairQuestion(inventions, "inventor", "invention", "mucit - icat", true),
    () => genPairQuestion(inventions, "inventor", "invention", "mucit - icat", false)
];

// Generate exactly unique questions

const classLevels = ['5', '6', '7', '8', '9', '10', '11', '12'];

let globalUsedTexts = new Set<string>();

// Pre-load pdf data
const pdfData = {
  "questions": [
    {
      "num": 11,
      "text": "Aşağıdaki hayvanlardan hangisi omurgalıdır?",
      "options": {
        "A": "Ahtapot",
        "B": "Solucan",
        "C": "Serçe",
        "D": "Kelebek"
      },
      "correctAnswer": "C",
      "didYouKnow": "Biliyor muydun?\nOmurgalı hayvanların vücutlarında omurga bulunur. Kuşlar, memeliler, balıklar, sürüngenler\nve iki yaşamlılar omurgalıdır.",
      "contextId": null
    },
    {
      "num": 12,
      "text": "Türkiye'nin en uzun nehri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Kızılırmak",
        "B": "Fırat",
        "C": "Sakarya",
        "D": "Yeşilırmak"
      },
      "correctAnswer": "A",
      "didYouKnow": "Kızılırmak tamamen Türkiye sınırları içinde doğup denize dökülen en uzun nehirdir.",
      "contextId": null
    },
    {
      "num": 13,
      "text": "Aşağıdakilerden hangisi yenilenebilir enerji kaynağıdır?",
      "options": {
        "A": "Petrol",
        "B": "Kömür",
        "C": "Güneş",
        "D": "Doğal gaz"
      },
      "correctAnswer": "C",
      "didYouKnow": "Güneş enerjisi çevreye daha az zarar veren temiz enerji kaynaklarından biridir.",
      "contextId": null
    },
    {
      "num": 14,
      "text": "Aşağıdakilerden hangisi bir iletişim aracıdır?",
      "options": {
        "A": "Mikroskop",
        "B": "Telefon",
        "C": "Termometre",
        "D": "Pusula"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 15,
      "text": "Bir yılda kaç ay vardır?",
      "options": {
        "A": "10",
        "B": "11",
        "C": "12",
        "D": "13"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 16,
      "text": "Metne göre arılar aşağıdakilerden hangisine katkı sağlar?",
      "options": {
        "A": "Toprağın oluşmasına",
        "B": "Bitkilerin çoğalmasına",
        "C": "Denizlerin temizlenmesine",
        "D": "Dağların oluşmasına"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_16_17"
    },
    {
      "num": 17,
      "text": "Metne göre arılar neden önemlidir?",
      "options": {
        "A": "Sadece bal yaptıkları için",
        "B": "İnsanlardan korkmadıkları için",
        "C": "Bitkilerin yaşam döngüsüne katkı sağladıkları için",
        "D": "Çok hızlı uçtukları için"
      },
      "correctAnswer": "C",
      "didYouKnow": "Dünya üzerindeki birçok meyve ve sebzenin yetişmesinde arılar önemli rol oynar.",
      "contextId": "ctx_16_17"
    },
    {
      "num": 18,
      "text": "Aşağıdaki gezegenlerden hangisi \"Kızıl Gezegen\" olarak bilinir?",
      "options": {
        "A": "Venüs",
        "B": "Mars",
        "C": "Satürn",
        "D": "Merkür"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 19,
      "text": "Metne göre geri dönüşümün amacı aşağıdakilerden hangisi değildir?",
      "options": {
        "A": "Doğal kaynakları korumak",
        "B": "Enerji tasarrufu sağlamak",
        "C": "Çevreyi kirletmek",
        "D": "Atıkları yeniden değerlendirmek"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_19_20"
    },
    {
      "num": 20,
      "text": "Metne göre aşağıdakilerden hangisi geri dönüştürülebilir?",
      "options": {
        "A": "Cam şişe",
        "B": "Islak mendil",
        "C": "Yemek artığı",
        "D": "Kirli peçete"
      },
      "correctAnswer": "A",
      "didYouKnow": "Cam, kalite kaybı yaşamadan defalarca geri dönüştürülebilen malzemelerden biridir.",
      "contextId": "ctx_19_20"
    },
    {
      "num": 21,
      "text": "Aşağıdaki doğal afetlerden hangisi önceden kesin olarak tahmin edilemez?",
      "options": {
        "A": "Sel",
        "B": "Kuraklık",
        "C": "Deprem",
        "D": "Fırtına"
      },
      "correctAnswer": "C",
      "didYouKnow": "Biliyor muydun? Günümüzde depremlerin tam olarak ne zaman olacağını önceden\nsöyleyen bir yöntem bulunmamaktadır.",
      "contextId": null
    },
    {
      "num": 22,
      "text": "Aşağıdaki mesleklerden hangisi insanların sağlıklarını korumak ve tedavi etmek için çalışır?",
      "options": {
        "A": "Mimar",
        "B": "Doktor",
        "C": "Pilot",
        "D": "Avukat"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 23,
      "text": "Aşağıdaki ülkelerden hangisi hem Asya hem de Avrupa kıtasında topraklara sahiptir?",
      "options": {
        "A": "Brezilya",
        "B": "Japonya",
        "C": "Türkiye",
        "D": "Mısır"
      },
      "correctAnswer": "C",
      "didYouKnow": "Türkiye iki kıta üzerinde yer alan ender ülkelerden biridir.",
      "contextId": null
    },
    {
      "num": 24,
      "text": "Aşağıdaki canlılardan hangisi fotosentez yapabilir?",
      "options": {
        "A": "Mantar",
        "B": "Çam ağacı",
        "C": "Kedi",
        "D": "Solucan"
      },
      "correctAnswer": "B",
      "didYouKnow": "25 ve 26. soruları aşağıdaki metne göre cevaplayınız.\nKapadokya, milyonlarca yıl önce meydana gelen volkanik patlamalar sonucunda oluşmuştur.\nRüzgâr ve yağmurun etkisiyle şekillenen peribacaları, dünyanın birçok yerinden gelen\nturistlerin ilgisini çeker. Bölgede kayalara oyulmuş evler ve yer altı şehirleri de\nbulunmaktadır.",
      "contextId": null
    },
    {
      "num": 25,
      "text": "Metne göre Kapadokya'nın en dikkat çekici doğal oluşumu hangisidir?",
      "options": {
        "A": "Şelaleler",
        "B": "Peribacaları",
        "C": "Buzullar",
        "D": "Mağara gölleri"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 26,
      "text": "Metne göre aşağıdakilerden hangisi söylenebilir?",
      "options": {
        "A": "Kapadokya tamamen insanlar tarafından yapılmıştır.",
        "B": "Kapadokya yalnızca Türkiye'den ziyaretçi alır.",
        "C": "Doğal olaylar bölgenin şekillenmesinde etkili olmuştur.",
        "D": "Bölgede hiçbir tarihî yapı bulunmamaktadır."
      },
      "correctAnswer": "C",
      "didYouKnow": "Kapadokya, UNESCO Dünya Mirası Listesi'nde yer alan önemli bölgelerden biridir.",
      "contextId": null
    },
    {
      "num": 27,
      "text": "Aşağıdakilerden hangisi su tasarrufu sağlamaya yardımcı olur?",
      "options": {
        "A": "Diş fırçalarken musluğu açık bırakmak",
        "B": "Bozuk muslukları tamir ettirmek",
        "C": "Arabayı her gün hortumla yıkamak",
        "D": "Gereksiz yere uzun süre duş almak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 28,
      "text": "Metne göre deniz kaplumbağalarının yavruları nereye gitmeye çalışır?",
      "options": {
        "A": "Ormana",
        "B": "Dağa",
        "C": "Denize",
        "D": "Göllere"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_28_30"
    },
    {
      "num": 29,
      "text": "Yapay ışıkların deniz kaplumbağalarına etkisi nedir?",
      "options": {
        "A": "Daha hızlı yüzmelerini sağlar.",
        "B": "Yumurtalarını büyütür.",
        "C": "Yönlerini şaşırmalarına neden olabilir.",
        "D": "Daha uzun yaşamalarını sağlar."
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_28_30"
    },
    {
      "num": 30,
      "text": "Bu metinden çıkarılabilecek en uygun sonuç aşağıdakilerden hangisidir?",
      "options": {
        "A": "Deniz kaplumbağaları sadece kışın yaşar.",
        "B": "Sahillerde çevre düzenlemesi yapılırken doğal yaşam da düşünülmelidir.",
        "C": "Deniz kaplumbağaları karada yaşamayı sever.",
        "D": "Yapay ışıklar tüm hayvanlara faydalıdır."
      },
      "correctAnswer": "B",
      "didYouKnow": "Birçok sahilde, yumurtlama dönemlerinde ışık kullanımı sınırlandırılarak deniz\nkaplumbağalarının korunmasına katkı sağlanmaktadır.",
      "contextId": "ctx_28_30"
    },
    {
      "num": 31,
      "text": "Aşağıdaki icatlardan hangisi iletişim kurmayı kolaylaştırmıştır?",
      "options": {
        "A": "Mikroskop",
        "B": "Telefon",
        "C": "Termometre",
        "D": "Dürbün"
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Telefonun ilk örnekleri 19. yüzyılda kullanılmaya başlanmıştır.\nGünümüzde akıllı telefonlar iletişimin yanı sıra eğitim ve araştırma amacıyla da\nkullanılmaktadır.",
      "contextId": null
    },
    {
      "num": 32,
      "text": "Aşağıdaki şehirlerden hangisi deniz kıyısında değildir?",
      "options": {
        "A": "Antalya",
        "B": "İzmir",
        "C": "Konya",
        "D": "Samsun"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 33,
      "text": "Bir bitkinin sağlıklı büyüyebilmesi için aşağıdakilerden hangisine en az ihtiyaç duyar?",
      "options": {
        "A": "Su",
        "B": "Güneş ışığı",
        "C": "Hava",
        "D": "Plastik"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 34,
      "text": "Metne göre okul yönetimi hangi uygulamayı yapmıştır?",
      "options": {
        "A": "Kantini kapatmıştır.",
        "B": "Koridorlara su sebilleri yerleştirmiştir.",
        "C": "Ders saatlerini uzatmıştır.",
        "D": "Plastik şişe satışını artırmıştır."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_34_35"
    },
    {
      "num": 35,
      "text": "Bu metinden çıkarılabilecek en uygun sonuç aşağıdakilerden hangisidir?",
      "options": {
        "A": "Çevreyi korumak için küçük değişiklikler etkili olabilir.",
        "B": "Mataralar plastikten daha ağırdır.",
        "C": "Okulda su içmek yasaktır.",
        "D": "Plastik şişeler tekrar doldurulamaz."
      },
      "correctAnswer": "A",
      "didYouKnow": "Tek kullanımlık plastiklerin azaltılması çevre kirliliğini önlemeye katkı sağlar.",
      "contextId": "ctx_34_35"
    },
    {
      "num": 36,
      "text": "Öğrenci en fazla hangi gün kitap okumuştur?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Çarşamba",
        "D": "Perşembe"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": "ctx_36_38"
    },
    {
      "num": 37,
      "text": "Öğrenci cuma günü kaç sayfa kitap okumuştur?",
      "options": {
        "A": "8",
        "B": "10",
        "C": "12",
        "D": "15"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_36_38"
    },
    {
      "num": 38,
      "text": "Öğrenci beş günde toplam kaç sayfa kitap okumuştur?",
      "options": {
        "A": "65",
        "B": "70",
        "C": "75",
        "D": "80"
      },
      "correctAnswer": "C",
      "didYouKnow": "12 + 18 + 15 + 20 + 10 = 75",
      "contextId": "ctx_36_38"
    },
    {
      "num": 39,
      "text": "Aşağıdaki hayvanlardan hangisi göç eden kuşlardan biridir?",
      "options": {
        "A": "Leylek",
        "B": "Kedi",
        "C": "Tavşan",
        "D": "Kirpi"
      },
      "correctAnswer": "A",
      "didYouKnow": "Leylekler her yıl binlerce kilometre yol katederek mevsimlere göre göç ederler.\n40. soruyu aşağıdaki metne göre cevaplayınız.\nBilim insanları yeni bilgiler elde etmek için gözlem yapar, deneyler gerçekleştirir ve elde\nettikleri sonuçları dikkatle inceler. Aynı deneyi gerektiğinde tekrar ederek sonuçların\ndoğruluğunu kontrol ederler.",
      "contextId": null
    },
    {
      "num": 40,
      "text": "Metne göre bilim insanlarının ortak özelliklerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Tahminlerini kanıtlamadan doğru kabul etmeleri",
        "B": "Sonuçları dikkatle incelemeleri",
        "C": "Deney yapmadan karar vermeleri",
        "D": "Sadece kitap okuyarak araştırma yapmaları"
      },
      "correctAnswer": "B",
      "didYouKnow": "Bilimsel çalışmaların temelinde gözlem, deney, kanıt ve tekrar edilebilirlik bulunur.",
      "contextId": null
    },
    {
      "num": 41,
      "text": "Aşağıdaki doğal kaynaklardan hangisi tükenmeyen enerji kaynakları arasında yer alır?",
      "options": {
        "A": "Kömür",
        "B": "Petrol",
        "C": "Rüzgâr",
        "D": "Doğal gaz"
      },
      "correctAnswer": "C",
      "didYouKnow": "Biliyor muydun? Rüzgâr enerjisi, elektrik üretiminde kullanılan temiz ve yenilenebilir\nenerji kaynaklarından biridir.",
      "contextId": null
    },
    {
      "num": 42,
      "text": "Aşağıdaki ülkelerden hangisi dünyanın en büyük yüzölçümüne sahiptir?",
      "options": {
        "A": "Kanada",
        "B": "Çin",
        "C": "Rusya",
        "D": "ABD"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 43,
      "text": "Aşağıdaki davranışlardan hangisi dijital ortamda güvenli kullanım için doğrudur?",
      "options": {
        "A": "Şifremizi arkadaşlarımızla paylaşmak",
        "B": "Tanımadığımız kişilere kişisel bilgilerimizi vermek",
        "C": "Güçlü ve tahmin edilmesi zor şifreler kullanmak",
        "D": "Her bağlantıya tıklamak"
      },
      "correctAnswer": "C",
      "didYouKnow": "Güçlü bir şifre; büyük-küçük harf, rakam ve özel karakterlerden oluşabilir.",
      "contextId": null
    },
    {
      "num": 44,
      "text": "Metne göre besin zincirindeki değişiklikler neye yol açabilir?",
      "options": {
        "A": "Sadece bitkileri etkiler.",
        "B": "Diğer canlıları da etkileyebilir.",
        "C": "Hiçbir değişikliğe neden olmaz.",
        "D": "Sadece insanları etkiler."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_44_45"
    },
    {
      "num": 45,
      "text": "Metne göre bitkilerin temel görevi aşağıdakilerden hangisidir?",
      "options": {
        "A": "Avlanmak",
        "B": "Besin üretmek",
        "C": "Göç etmek",
        "D": "Toprağı kazmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "Bitkiler fotosentez sayesinde besin üretir ve birçok canlının yaşamını dolaylı olarak\ndestekler.",
      "contextId": "ctx_44_45"
    },
    {
      "num": 46,
      "text": "Öğrenci en fazla zamanı hangi etkinliğe ayırmıştır?",
      "options": {
        "A": "Kitap okumaya",
        "B": "Bisiklet sürmeye",
        "C": "Televizyon izlemeye",
        "D": "Ödev yapmaya"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_46_48"
    },
    {
      "num": 47,
      "text": "Öğrenci kitap okumaya kaç dakika ayırmıştır?",
      "options": {
        "A": "40",
        "B": "50",
        "C": "60",
        "D": "70"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_46_48"
    },
    {
      "num": 48,
      "text": "Tabloya göre öğrenci toplam kaç dakika etkinlik yapmıştır?",
      "options": {
        "A": "220",
        "B": "240",
        "C": "260",
        "D": "280"
      },
      "correctAnswer": "C",
      "didYouKnow": "60 + 90 + 40 + 70 = 260 dakika",
      "contextId": "ctx_46_48"
    },
    {
      "num": 49,
      "text": "Metne göre 23 Nisan'ın önemli özelliklerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Sadece Türkiye'de kutlanan bir spor günü olması",
        "B": "Çocuklara armağan edilen ilk ve tek bayram olması",
        "C": "Yalnızca yetişkinler için düzenlenmesi",
        "D": "Her ay kutlanması"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_49_50"
    },
    {
      "num": 50,
      "text": "Metne göre aşağıdaki yargılardan hangisine ulaşılabilir?",
      "options": {
        "A": "23 Nisan kutlamalarına farklı ülkelerden çocuklar da katılabilir.",
        "B": "23 Nisan sadece okullarda kutlanır.",
        "C": "Bayram yalnızca bir şehirde yapılır.",
        "D": "Kutlamalara çocuklar katılamaz."
      },
      "correctAnswer": "A",
      "didYouKnow": "23 Nisan, çocuklar arasında dostluk ve barış duygularını güçlendirmeyi amaçlayan özel bir\nbayramdır.",
      "contextId": "ctx_49_50"
    },
    {
      "num": 51,
      "text": "Metne göre arıların doğadaki en önemli görevlerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Toprağı kazmak",
        "B": "Bitkilerin çoğalmasına yardımcı olmak",
        "C": "Yağmur oluşturmak",
        "D": "Tohum üretmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_51_53"
    },
    {
      "num": 52,
      "text": "Metne göre arıların azalması aşağıdakilerden hangisini etkileyebilir?",
      "options": {
        "A": "Sadece bal üretimini",
        "B": "Bitkilerin çoğalmasını ve insanların beslenmesini",
        "C": "Deniz seviyesini",
        "D": "Mevsimlerin oluşumunu"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_51_53"
    },
    {
      "num": 53,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Arılar yalnızca bal üretir.",
        "B": "Arılar doğa ve insanlar için önemli canlılardır.",
        "C": "Bütün böcekler bal yapar.",
        "D": "Çiçekler sadece ilkbaharda açar."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Dünya genelinde yetiştirilen tarım ürünlerinin önemli bir bölümü arılar\nve diğer tozlaştırıcı canlılar sayesinde verimli şekilde üretilebilmektedir.",
      "contextId": "ctx_51_53"
    },
    {
      "num": 54,
      "text": "Aşağıdaki ülkelerden hangisinin bayrağında kırmızı daire bulunur?",
      "options": {
        "A": "Türkiye",
        "B": "Japonya",
        "C": "İtalya",
        "D": "Brezilya"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 55,
      "text": "Aşağıdakilerden hangisi çevreyi korumaya yardımcı olan bir davranıştır?",
      "options": {
        "A": "Çöpleri yere atmak",
        "B": "Gereksiz yere elektrik kullanmak",
        "C": "Atıkları geri dönüşüm kutusuna atmak",
        "D": "Musluğu açık bırakmak"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 56,
      "text": "Öğrenci en uzun süre hangi gün spor yapmıştır?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Perşembe",
        "D": "Cuma"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_56_58"
    },
    {
      "num": 57,
      "text": "Öğrenci cuma günü kaç dakika spor yapmıştır?",
      "options": {
        "A": "25",
        "B": "30",
        "C": "35",
        "D": "40"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_56_58"
    },
    {
      "num": 58,
      "text": "Öğrenci toplam kaç dakika spor yapmıştır?",
      "options": {
        "A": "150",
        "B": "160",
        "C": "170",
        "D": "180"
      },
      "correctAnswer": "C",
      "didYouKnow": "30 + 45 + 20 + 40 + 35 = 170 dakika",
      "contextId": "ctx_56_58"
    },
    {
      "num": 59,
      "text": "Aşağıdaki gezegenlerden hangisinin belirgin halkalarıyla tanındığı söylenebilir?",
      "options": {
        "A": "Dünya",
        "B": "Mars",
        "C": "Satürn",
        "D": "Merkür"
      },
      "correctAnswer": "C",
      "didYouKnow": "Satürn'ün halkaları büyük ölçüde buz ve kaya parçalarından oluşur.",
      "contextId": null
    },
    {
      "num": 60,
      "text": "Bilim insanları yeni bir buluş yaparken aşağıdakilerden hangisini öncelikle kullanırlar?",
      "options": {
        "A": "Tahminlerini kanıtlamadan kabul etmeyi",
        "B": "Gözlem yapmayı ve kanıt toplamayı",
        "C": "Şansa güvenmeyi",
        "D": "Başkalarının fikirlerini araştırmadan reddetmeyi"
      },
      "correctAnswer": "B",
      "didYouKnow": "Bilimsel çalışmaların temelinde merak etmek, gözlem yapmak, araştırmak ve\nkanıtlarla sonuca ulaşmak yer alır.",
      "contextId": null
    },
    {
      "num": 61,
      "text": "Metne göre yağmur suyunu depolayan insanlar bununla ne yapmaktadır?",
      "options": {
        "A": "Elektrik üretmektedir.",
        "B": "Bahçelerini sulamaktadır.",
        "C": "Denizleri doldurmaktadır.",
        "D": "Arabalarını yıkamaktadır."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_61_63"
    },
    {
      "num": 62,
      "text": "Metne göre yağmur suyunun depolanmasının yararlarından biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Hava sıcaklığını artırması",
        "B": "Su tasarrufu sağlaması",
        "C": "Güneş ışığını azaltması",
        "D": "Mevsimleri değiştirmesi"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_61_63"
    },
    {
      "num": 63,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Yağmur sadece kışın yağar.",
        "B": "Yağmur suyu doğru kullanıldığında doğal kaynakların korunmasına katkı sağlar.",
        "C": "Barajlar yalnızca yazın dolar.",
        "D": "Çatılar su geçirmez yapılardır."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Bazı ülkelerde yağmur suyunu depolamak, su tasarrufu amacıyla teşvik\nedilmektedir.",
      "contextId": "ctx_61_63"
    },
    {
      "num": 64,
      "text": "Aşağıdaki seçeneklerden hangisi bir yenilenebilir enerji kaynağı değildir?",
      "options": {
        "A": "Güneş",
        "B": "Rüzgâr",
        "C": "Jeotermal enerji",
        "D": "Kömür"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 65,
      "text": "Aşağıdaki ulaşım araçlarından hangisi raylar üzerinde hareket eder?",
      "options": {
        "A": "Gemi",
        "B": "Tren",
        "C": "Uçak",
        "D": "Helikopter"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 66,
      "text": "Öğrenci en fazla soruyu hangi gün çözmüştür?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Perşembe",
        "D": "Cuma"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_66_68"
    },
    {
      "num": 67,
      "text": "Öğrenci cuma günü kaç soru çözmüştür?",
      "options": {
        "A": "10",
        "B": "15",
        "C": "20",
        "D": "25"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_66_68"
    },
    {
      "num": 68,
      "text": "Tabloya göre öğrenci toplam kaç soru çözmüştür?",
      "options": {
        "A": "90",
        "B": "95",
        "C": "100",
        "D": "105"
      },
      "correctAnswer": "C",
      "didYouKnow": "20 + 25 + 15 + 30 + 10 = 100 soru",
      "contextId": "ctx_66_68"
    },
    {
      "num": 69,
      "text": "Aşağıdaki seçeneklerden hangisi Dünya'nın kendi ekseni etrafında dönmesinin sonucudur?",
      "options": {
        "A": "Mevsimlerin oluşması",
        "B": "Gece ve gündüzün oluşması",
        "C": "Ay'ın evrelerinin oluşması",
        "D": "Depremlerin meydana gelmesi"
      },
      "correctAnswer": "B",
      "didYouKnow": "Dünya kendi ekseni etrafındaki dönüşünü yaklaşık 24 saatte tamamlar.",
      "contextId": null
    },
    {
      "num": 70,
      "text": "Aşağıdakilerden hangisi iyi bir kitap okuma alışkanlığı geliştirmek için uygun bir davranıştır?",
      "options": {
        "A": "Her gün belirli bir süre kitap okumak",
        "B": "Kitapları yarım bırakmak",
        "C": "Sadece kapaklarını incelemek",
        "D": "Hiç not almadan okumak zorunda olduğunu düşünmek"
      },
      "correctAnswer": "A",
      "didYouKnow": "Düzenli okuma alışkanlığı, kelime dağarcığını ve okuduğunu anlama becerisini geliştirir.",
      "contextId": null
    },
    {
      "num": 71,
      "text": "Metne göre midyelerin önemli özelliklerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Deniz suyunu dondurmaları",
        "B": "Suyu süzerek beslenmeleri",
        "C": "Bal üretmeleri",
        "D": "Mercan oluşturmaları"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_71_73"
    },
    {
      "num": 72,
      "text": "Metne göre denizlerin kirlenmesi aşağıdakilerden hangisine neden olabilir?",
      "options": {
        "A": "Midyelerin yaşamının olumsuz etkilenmesine",
        "B": "Denizlerin tamamen kurumasına",
        "C": "Güneş'in daha az parlamasına",
        "D": "Yağmurun hiç yağmamasına"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_71_73"
    },
    {
      "num": 73,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Midyeler sadece yemek olarak tüketilir.",
        "B": "Midyeler deniz ekosisteminde önemli görevler üstlenir.",
        "C": "Denizlerde yalnızca midyeler yaşar.",
        "D": "Midyeler tatlı suda yaşar."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Deniz ekosisteminde her canlının farklı bir görevi vardır ve bu denge\nbozulduğunda birçok canlı etkilenebilir.",
      "contextId": "ctx_71_73"
    },
    {
      "num": 74,
      "text": "Aşağıdaki seçeneklerden hangisi gözlem yapmaya örnektir?",
      "options": {
        "A": "Bir bitkinin her gün boyunu ölçmek",
        "B": "Kitabın kapağını değiştirmek",
        "C": "Oyuncak toplamak",
        "D": "Televizyonun sesini açmak"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 75,
      "text": "Aşağıdaki davranışlardan hangisi trafik güvenliğine uygundur?",
      "options": {
        "A": "Kırmızı ışıkta karşıya geçmek",
        "B": "Emniyet kemeri takmak",
        "C": "Hareket hâlindeki araçtan inmek",
        "D": "Bisiklet sürerken kulaklıkla yüksek sesle müzik dinlemek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 76,
      "text": "Öğrenci en fazla suyu hangi gün içmiştir?",
      "options": {
        "A": "Pazartesi",
        "B": "Çarşamba",
        "C": "Perşembe",
        "D": "Cuma"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": "ctx_76_78"
    },
    {
      "num": 77,
      "text": "Öğrenci cuma günü kaç bardak su içmiştir?",
      "options": {
        "A": "8",
        "B": "9",
        "C": "10",
        "D": "11"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_76_78"
    },
    {
      "num": 78,
      "text": "Öğrenci beş günde toplam kaç bardak su içmiştir?",
      "options": {
        "A": "38",
        "B": "39",
        "C": "40",
        "D": "41"
      },
      "correctAnswer": "C",
      "didYouKnow": "8 + 6 + 7 + 9 + 10 = 40 bardak",
      "contextId": "ctx_76_78"
    },
    {
      "num": 79,
      "text": "Aşağıdakilerden hangisi Güneş Sistemi'ndeki bir cüce gezegendir?",
      "options": {
        "A": "Merkür",
        "B": "Dünya",
        "C": "Plüton",
        "D": "Venüs"
      },
      "correctAnswer": "C",
      "didYouKnow": "Plüton uzun yıllar gezegen olarak kabul edilmiş, daha sonra cüce gezegen sınıfına\nalınmıştır.",
      "contextId": null
    },
    {
      "num": 80,
      "text": "Bir öğrenci araştırma ödevi hazırlarken aşağıdakilerden hangisini yapmalıdır?",
      "options": {
        "A": "Tek bir kaynağa bakıp araştırmayı bitirmelidir.",
        "B": "Güvenilir kaynaklardan bilgi toplayıp bilgileri karşılaştırmalıdır.",
        "C": "İnternette gördüğü her bilgiyi doğru kabul etmelidir.",
        "D": "Kaynak göstermeye gerek olmadığını düşünmelidir."
      },
      "correctAnswer": "B",
      "didYouKnow": "Araştırma yaparken kitaplar, ansiklopediler, güvenilir eğitim siteleri ve resmî kurumların\nyayınları kullanılmalıdır.",
      "contextId": null
    },
    {
      "num": 81,
      "text": "Metne göre ormanların görevlerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Denizlerin tuzluluk oranını artırmak",
        "B": "Canlılara yaşam alanı sağlamak",
        "C": "Mevsimleri değiştirmek",
        "D": "Depremleri önlemek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_81_83"
    },
    {
      "num": 82,
      "text": "Metne göre aşağıdakilerden hangisi doğal dengeyi bozabilir?",
      "options": {
        "A": "Fidan dikmek",
        "B": "Bilinçsiz ağaç kesimi",
        "C": "Geri dönüşüm yapmak",
        "D": "Su tasarrufu sağlamak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_81_83"
    },
    {
      "num": 83,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Ormanlar yalnızca hayvanlar için önemlidir.",
        "B": "Ormanların korunması hem insanlar hem de diğer canlılar için gereklidir.",
        "C": "Ormanlar sadece dağlık bölgelerde bulunur.",
        "D": "Ormanlarda hiçbir bitki yetişmez."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Bir yetişkin ağaç, bulunduğu ortama ve türüne bağlı olarak yılda önemli\nmiktarda karbondioksitin tutulmasına katkı sağlayabilir.",
      "contextId": "ctx_81_83"
    },
    {
      "num": 84,
      "text": "Aşağıdaki araçlardan hangisi yenilenebilir enerji ile çalışacak şekilde tasarlanabilir?",
      "options": {
        "A": "Güneş enerjili hesap makinesi",
        "B": "Kömürle çalışan bisiklet",
        "C": "Benzinle çalışan kalem",
        "D": "Taşla çalışan bilgisayar"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 85,
      "text": "Aşağıdakilerden hangisi ilk yardım amacıyla yapılması uygun olan davranışlardan biridir?",
      "options": {
        "A": "Yaralı kişiyi gereksiz yere hareket ettirmek",
        "B": "Durumu değerlendirip gerektiğinde yardım çağırmak",
        "C": "Bilinçsiz kişiye zorla su içirmek",
        "D": "Kırık olabilecek bölgeyi hareket ettirmeye çalışmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "Acil durumlarda önce kendi güvenliğinizi sağlayın ve gerekiyorsa yetişkinlerden veya acil\nyardım ekiplerinden destek isteyin.",
      "contextId": null
    },
    {
      "num": 86,
      "text": "Öğrenci en fazla hangi tür kitabı okumuştur?",
      "options": {
        "A": "Bilim",
        "B": "Masal",
        "C": "Hikâye",
        "D": "Biyografi"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_86_88"
    },
    {
      "num": 87,
      "text": "Öğrenci toplam kaç kitap okumuştur?",
      "options": {
        "A": "8",
        "B": "9",
        "C": "10",
        "D": "11"
      },
      "correctAnswer": "C",
      "didYouKnow": "4 + 2 + 1 + 3 = 10 kitap",
      "contextId": "ctx_86_88"
    },
    {
      "num": 88,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Öğrenci hiç bilim kitabı okumamıştır.",
        "B": "Hikâye kitaplarının sayısı biyografi kitaplarından fazladır.",
        "C": "Masal kitapları en fazla okunan türdür.",
        "D": "Bilim kitapları hikâye kitaplarından fazladır."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_86_88"
    },
    {
      "num": 89,
      "text": "Aşağıdaki bilim insanlarından hangisi ampulün geliştirilmesiyle tanınır?",
      "options": {
        "A": "Thomas Edison",
        "B": "Isaac Newton",
        "C": "Marie Curie",
        "D": "Galileo Galilei"
      },
      "correctAnswer": "A",
      "didYouKnow": "Ampul üzerinde birçok bilim insanı çalışmıştır. Edison, uzun ömürlü ve günlük kullanıma\nuygun ampullerin geliştirilmesine yaptığı katkılarla tanınır.",
      "contextId": null
    },
    {
      "num": 90,
      "text": "Bir öğrenci internette araştırma yaparken aynı bilgiye farklı güvenilir kaynaklarda da\nulaşıyorsa aşağıdakilerden hangisini yapmış olur?",
      "options": {
        "A": "Bilgiyi doğrulamış olur.",
        "B": "Zaman kaybetmiş olur.",
        "C": "Araştırmayı yanlış yapmış olur.",
        "D": "Kaynaklara ihtiyaç duymamış olur."
      },
      "correctAnswer": "A",
      "didYouKnow": "Bilgileri birden fazla güvenilir kaynaktan kontrol etmek, doğru bilgiye ulaşmanın önemli\nyollarından biridir.",
      "contextId": null
    },
    {
      "num": 91,
      "text": "Metne göre kütüphanelerin temel amacı aşağıdakilerden hangisidir?",
      "options": {
        "A": "Spor etkinlikleri düzenlemek",
        "B": "İnsanların bilgiye ulaşmasını sağlamak",
        "C": "Yalnızca kitap satmak",
        "D": "Eğlence merkezi olmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_91_93"
    },
    {
      "num": 92,
      "text": "Kütüphanede aşağıdaki davranışlardan hangisi uygundur?",
      "options": {
        "A": "Yüksek sesle konuşmak",
        "B": "Kitapların sayfalarını yırtmak",
        "C": "Sessiz olmak ve kitapları özenle kullanmak",
        "D": "Kitapları izinsiz dışarı çıkarmak"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_91_93"
    },
    {
      "num": 93,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Kütüphaneler sadece yetişkinler içindir.",
        "B": "Kütüphaneler araştırma yapmayı kolaylaştırır.",
        "C": "Kütüphanelerde yalnızca roman bulunur.",
        "D": "Kütüphaneler sadece hafta sonu açıktır."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Günümüzde birçok kütüphane, e-kitap ve çevrim içi veri tabanlarına da\nerişim sağlamaktadır.",
      "contextId": "ctx_91_93"
    },
    {
      "num": 94,
      "text": "Aşağıdakilerden hangisi bir pusulanın kullanım amacıdır?",
      "options": {
        "A": "Hava sıcaklığını ölçmek",
        "B": "Yön bulmak",
        "C": "Zamanı göstermek",
        "D": "Yağışı ölçmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 95,
      "text": "Aşağıdaki canlılardan hangisi hem karada hem suda yaşayabilir?",
      "options": {
        "A": "Balık",
        "B": "Kurbağa",
        "C": "Serçe",
        "D": "Tavşan"
      },
      "correctAnswer": "B",
      "didYouKnow": "Kurbağalar, yaşam döngülerinin farklı evrelerinde hem suda hem karada yaşayabilir.",
      "contextId": null
    },
    {
      "num": 96,
      "text": "Öğrenci en fazla soruyu hangi dersten çözmüştür?",
      "options": {
        "A": "Matematik",
        "B": "Fen Bilimleri",
        "C": "Türkçe",
        "D": "Sosyal Bilgiler"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_96_98"
    },
    {
      "num": 97,
      "text": "Öğrenci toplam kaç soru çözmüştür?",
      "options": {
        "A": "80",
        "B": "90",
        "C": "100",
        "D": "110"
      },
      "correctAnswer": "C",
      "didYouKnow": "40 + 30 + 20 + 10 = 100 soru",
      "contextId": "ctx_96_98"
    },
    {
      "num": 98,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Fen Bilimleri soru sayısı Matematikten fazladır.",
        "B": "Sosyal Bilgiler en fazla çözülen derstir.",
        "C": "Türkçe soru sayısı Fen Bilimlerinin iki katıdır.",
        "D": "Tüm derslerde eşit sayıda soru çözülmüştür."
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_96_98"
    },
    {
      "num": 99,
      "text": "Aşağıdakilerden hangisi iyi bir dinleyicinin özelliklerinden biridir?",
      "options": {
        "A": "Konuşanın sözünü sürekli kesmek",
        "B": "Dikkatini konuşana vermek",
        "C": "Başka işlerle ilgilenmek",
        "D": "Dinlemeden cevap vermek"
      },
      "correctAnswer": "B",
      "didYouKnow": "İyi dinleme, hem okul başarısını hem de iletişim becerilerini geliştirir.",
      "contextId": null
    },
    {
      "num": 100,
      "text": "Bir öğrenci araştırma yaparken farklı kaynaklardan elde ettiği bilgileri karşılaştırıyor ve doğru\nolduğundan emin olduktan sonra ödevine ekliyor.\nBu öğrencinin yaptığı çalışma aşağıdaki becerilerden hangisini gösterir?",
      "options": {
        "A": "Ezber yapma",
        "B": "Bilgiyi sorgulama ve doğrulama",
        "C": "Tahminde bulunma",
        "D": "Rastgele seçim yapma"
      },
      "correctAnswer": "B",
      "didYouKnow": "Bilgiyi farklı güvenilir kaynaklardan kontrol etmek, doğru ve güvenilir bilgiye ulaşmanın\nönemli bir yoludur.",
      "contextId": null
    },
    {
      "num": 101,
      "text": "Metne göre deniz fenerlerinin temel görevi nedir?",
      "options": {
        "A": "Balıkçılara ağ örmek",
        "B": "Gemilere yön göstermek",
        "C": "Deniz suyunu temizlemek",
        "D": "Dalgaları durdurmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_101_103"
    },
    {
      "num": 102,
      "text": "Metne göre deniz fenerleri en çok hangi durumda önem kazanır?",
      "options": {
        "A": "Güneşli günlerde",
        "B": "Sisli havalarda ve geceleri",
        "C": "Yaz mevsiminde",
        "D": "Yağmur yağmadığında"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_101_103"
    },
    {
      "num": 103,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Deniz fenerleri artık kullanılmamaktadır.",
        "B": "Teknoloji gelişse de deniz fenerleri önemini tamamen kaybetmemiştir.",
        "C": "Gemiler yalnızca gündüz yolculuk yapar.",
        "D": "Deniz fenerleri sadece turistik amaçla yapılmıştır."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Bazı deniz fenerleri yüz yılı aşkın süredir hizmet vermekte ve tarihî yapı\nolarak korunmaktadır.",
      "contextId": "ctx_101_103"
    },
    {
      "num": 104,
      "text": "Aşağıdakilerden hangisi doğal kaynakların bilinçli kullanımına örnektir?",
      "options": {
        "A": "Gereksiz yere elektrikli cihazları açık bırakmak",
        "B": "Musluğu açık unutarak evden çıkmak",
        "C": "İhtiyaç kadar su kullanmak",
        "D": "Kâğıtları tek kullanımdan sonra çöpe atmak"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 105,
      "text": "Bir öğrencinin deney yaparken gözlük ve eldiven kullanmasının temel amacı nedir?",
      "options": {
        "A": "Deneyi daha kısa sürede bitirmek",
        "B": "Güvenliğini sağlamak",
        "C": "Daha yüksek not almak",
        "D": "Deneyi daha eğlenceli hâle getirmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 106,
      "text": "Öğrenci en fazla zamanı hangi etkinliğe ayırmıştır?",
      "options": {
        "A": "Kitap okumaya",
        "B": "Spora",
        "C": "Resim yapmaya",
        "D": "Müzik çalışmasına"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_106_108"
    },
    {
      "num": 107,
      "text": "Öğrenci toplam kaç dakika etkinlik yapmıştır?",
      "options": {
        "A": "270",
        "B": "290",
        "C": "300",
        "D": "320"
      },
      "correctAnswer": "C",
      "didYouKnow": "90 + 120 + 60 + 30 = 300 dakika",
      "contextId": "ctx_106_108"
    },
    {
      "num": 108,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Resim yapmaya ayrılan süre, müzik çalışmasına ayrılan sürenin iki katıdır.",
        "B": "Kitap okumaya en az zaman ayrılmıştır.",
        "C": "Spor süresi ile kitap okuma süresi eşittir.",
        "D": "Müzik çalışmasına en fazla zaman ayrılmıştır."
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_106_108"
    },
    {
      "num": 109,
      "text": "Aşağıdaki davranışlardan hangisi dijital vatandaşlık kurallarına uygundur?",
      "options": {
        "A": "Başkalarının kişisel bilgilerini izinsiz paylaşmak",
        "B": "İnternette nazik ve saygılı bir dil kullanmak",
        "C": "Güçlü şifreleri arkadaşlara söylemek",
        "D": "Kaynağı belli olmayan dosyaları indirmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "Dijital vatandaşlık, teknolojiyi güvenli, saygılı ve sorumlu bir şekilde kullanmayı ifade\neder.",
      "contextId": null
    },
    {
      "num": 110,
      "text": "Bir öğrenci, araştırma ödevi hazırlarken ulaştığı bilgilerin doğru olup olmadığını kontrol\netmek için aynı konuyu farklı güvenilir kaynaklardan inceliyor.\nBu öğrencinin yaptığı çalışma aşağıdaki becerilerden hangisini geliştirir?",
      "options": {
        "A": "Ezber yapma",
        "B": "Eleştirel düşünme",
        "C": "Rastgele karar verme",
        "D": "Tahminde bulunma"
      },
      "correctAnswer": "B",
      "didYouKnow": "Eleştirel düşünme; bilgileri sorgulama, karşılaştırma ve kanıtlara göre değerlendirme\nbecerisidir.",
      "contextId": null
    },
    {
      "num": 111,
      "text": "Metne göre göçmen kuşlar neden göç eder?",
      "options": {
        "A": "Daha fazla oyun oynamak için",
        "B": "Daha sıcak bölgelere ulaşmak için",
        "C": "Denizlerde yaşamak için",
        "D": "Ağaç kesmek için"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_111_113"
    },
    {
      "num": 112,
      "text": "Metne göre göçmen kuşların karşılaştığı sorunlardan biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Denizlerin donması",
        "B": "Sulak alanların azalması",
        "C": "Güneş'in batmaması",
        "D": "Dağların yükselmesi"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_111_113"
    },
    {
      "num": 113,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Göçmen kuşların korunması için doğal yaşam alanları önemlidir.",
        "B": "Kuşlar yalnızca kışın uçar.",
        "C": "Bütün kuşlar göç eder.",
        "D": "Kuşlar sadece geceleri yolculuk yapar."
      },
      "correctAnswer": "A",
      "didYouKnow": "Biliyor muydun? Bazı leylekler göç sırasında 5.000 kilometreden fazla yol kat edebilir.",
      "contextId": "ctx_111_113"
    },
    {
      "num": 114,
      "text": "Aşağıdakilerden hangisi enerji tasarrufu sağlayan bir davranıştır?",
      "options": {
        "A": "Boş odada lambaları açık bırakmak",
        "B": "Kullanılmayan elektronik cihazları kapatmak",
        "C": "Musluğu açık bırakmak",
        "D": "Gereksiz yere kaloriferi sonuna kadar açmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 115,
      "text": "Aşağıdaki ulaşım araçlarından hangisi hava yolu ulaşımı için kullanılır?",
      "options": {
        "A": "Metro",
        "B": "Uçak",
        "C": "Gemi",
        "D": "Tramvay"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 116,
      "text": "Öğrenci en fazla sayfayı hangi gün okumuştur?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Çarşamba",
        "D": "Perşembe"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": "ctx_116_118"
    },
    {
      "num": 117,
      "text": "Öğrenci toplam kaç sayfa kitap okumuştur?",
      "options": {
        "A": "90",
        "B": "95",
        "C": "100",
        "D": "105"
      },
      "correctAnswer": "C",
      "didYouKnow": "18 + 22 + 20 + 25 + 15 = 100 sayfa",
      "contextId": "ctx_116_118"
    },
    {
      "num": 118,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Salı günü Pazartesi gününden daha fazla sayfa okunmuştur.",
        "B": "Cuma günü en fazla sayfa okunmuştur.",
        "C": "Çarşamba günü hiç kitap okunmamıştır.",
        "D": "Pazartesi ve Perşembe günü aynı sayıda sayfa okunmuştur."
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_116_118"
    },
    {
      "num": 119,
      "text": "Aşağıdakilerden hangisi bilimsel araştırmanın ilk basamaklarından biridir?",
      "options": {
        "A": "Gözlem yapmak",
        "B": "Sonucu ezberlemek",
        "C": "Deneyi yapmadan bitirmek",
        "D": "Tahminleri kanıt kabul etmek"
      },
      "correctAnswer": "A",
      "didYouKnow": "Bilimsel araştırmalar çoğu zaman bir soru veya merak edilen bir durumun\ngözlemlenmesiyle başlar.",
      "contextId": null
    },
    {
      "num": 120,
      "text": "Bir öğrenci internette bulduğu bilgiyi kitabındaki bilgilerle karşılaştırıyor ve ikisi de aynı\nsonucu veriyorsa aşağıdakilerden hangisini yapmış olur?",
      "options": {
        "A": "Bilgiyi doğrulamıştır.",
        "B": "Tahminde bulunmuştur.",
        "C": "Yanlış araştırma yapmıştır.",
        "D": "Bilgiyi ezberlemiştir."
      },
      "correctAnswer": "A",
      "didYouKnow": "Bilgiyi farklı güvenilir kaynaklardan karşılaştırmak, doğru bilgiye ulaşmanın etkili\nyollarından biridir.",
      "contextId": null
    },
    {
      "num": 121,
      "text": "Metne göre aşağıdakilerden hangisi toprağın özelliklerinden biridir?",
      "options": {
        "A": "İçinde hiçbir canlı yaşamaz.",
        "B": "Sadece taşlardan oluşur.",
        "C": "Birçok canlıya yaşam alanı sağlar.",
        "D": "Sadece yaz aylarında oluşur."
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_121_123"
    },
    {
      "num": 122,
      "text": "Metne göre küçük canlılar toprağa nasıl katkı sağlar?",
      "options": {
        "A": "Toprağı dondururlar.",
        "B": "Toprağın havalanmasına yardımcı olurlar.",
        "C": "Bitkilerin büyümesini engellerler.",
        "D": "Yağmurun yağmasını sağlarlar."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_121_123"
    },
    {
      "num": 123,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Toprak yalnızca tarım için önemlidir.",
        "B": "Toprağın korunması, doğadaki yaşam için gereklidir.",
        "C": "Toprak sadece solucanlardan oluşur.",
        "D": "Bitkiler topraksız yaşayabilir."
      },
      "correctAnswer": "B",
      "didYouKnow": "Biliyor muydun? Bir avuç sağlıklı toprakta milyonlarca mikroskobik canlı bulunabilir.",
      "contextId": "ctx_121_123"
    },
    {
      "num": 124,
      "text": "Aşağıdaki davranışlardan hangisi su tasarrufuna örnek gösterilebilir?",
      "options": {
        "A": "Bahçeyi öğle sıcağında uzun süre sulamak",
        "B": "Diş fırçalarken musluğu kapatmak",
        "C": "Bozuk musluğu tamir ettirmemek",
        "D": "Arabayı her gün hortumla yıkamak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 125,
      "text": "Aşağıdakilerden hangisi yerel yönetimlerin görevlerinden biridir?",
      "options": {
        "A": "Pasaport düzenlemek",
        "B": "Mahalle parklarının bakımını yapmak",
        "C": "Üniversite sınavını hazırlamak",
        "D": "Hava tahmini yapmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "Belediyeler; parklar, yollar, temizlik hizmetleri ve çevre düzenlemesi gibi birçok yerel\nhizmeti yürütür.",
      "contextId": null
    },
    {
      "num": 126,
      "text": "Öğrenci en sık hangi etkinliği yapmıştır?",
      "options": {
        "A": "Spor",
        "B": "Müzik çalışması",
        "C": "Kitap okuma",
        "D": "Resim yapma"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_126_128"
    },
    {
      "num": 127,
      "text": "Öğrenci kaç gün müzik çalışmıştır?",
      "options": {
        "A": "2",
        "B": "3",
        "C": "4",
        "D": "5"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_126_128"
    },
    {
      "num": 128,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Spor, resim yapmaktan daha fazla gün yapılmıştır.",
        "B": "Resim yapma en sık yapılan etkinliktir.",
        "C": "Kitap okuma ile spor aynı gün sayısına sahiptir.",
        "D": "Müzik çalışması yalnızca 1 gün yapılmıştır."
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_126_128"
    },
    {
      "num": 129,
      "text": "Aşağıdaki bilim insanlarından hangisi yerçekimi üzerine yaptığı çalışmalarıyla tanınır?",
      "options": {
        "A": "Isaac Newton",
        "B": "Marie Curie",
        "C": "Nikola Tesla",
        "D": "Louis Pasteur"
      },
      "correctAnswer": "A",
      "didYouKnow": "Anlatılan elma hikâyesi tarihsel olarak kesin doğrulanmış değildir; ancak Newton'un\nyerçekimi üzerine geliştirdiği çalışmalar bilimin önemli dönüm noktalarındandır.",
      "contextId": null
    },
    {
      "num": 130,
      "text": "Bir öğrenci proje hazırlarken farklı arkadaşlarının fikirlerini dinliyor, görev paylaşımı yapıyor\nve ortak karar alıyor.\nBu öğrencinin geliştirdiği beceri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Ezber yapma",
        "B": "İş birliği ve takım çalışması",
        "C": "Yalnız çalışma",
        "D": "Tahmin yürütme"
      },
      "correctAnswer": "B",
      "didYouKnow": "Takım çalışması, farklı fikirlerin bir araya gelmesini sağlar ve daha etkili çözümler\nüretmeye yardımcı olur.",
      "contextId": null
    },
    {
      "num": 131,
      "text": "Metne göre aşağıdakilerden hangisi yapay uyduların görevlerinden biridir?",
      "options": {
        "A": "Deprem oluşturmak",
        "B": "Hava tahmini yapılmasına yardımcı olmak",
        "C": "Deniz suyunu temizlemek",
        "D": "Yağmur yağdırmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_131_134"
    },
    {
      "num": 132,
      "text": "Bilim insanları neden Dünya'nın fotoğraflarını çeken uydular kullanmaktadır?",
      "options": {
        "A": "Oyun geliştirmek için",
        "B": "Doğadaki değişimleri takip etmek için",
        "C": "Yeni şehirler kurmak için",
        "D": "Güneş'i soğutmak için"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_131_134"
    },
    {
      "num": 133,
      "text": "Metne göre \"uzay çöpü\" neyi ifade etmektedir?",
      "options": {
        "A": "Ay yüzeyindeki taşları",
        "B": "Görevini tamamlamış bazı uyduları",
        "C": "Meteorları",
        "D": "Roket yakıtını"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_131_134"
    },
    {
      "num": 134,
      "text": "Bu metinden çıkarılabilecek en doğru sonuç aşağıdakilerden hangisidir?",
      "options": {
        "A": "Uydular yalnızca televizyon izlemek için kullanılır.",
        "B": "Uzay teknolojileri günlük yaşamı ve bilimsel araştırmaları desteklemektedir.",
        "C": "Uzayda hiçbir sorun yaşanmamaktadır.",
        "D": "Bilim insanları artık uydu üretmemektedir."
      },
      "correctAnswer": "B",
      "didYouKnow": "Türkiye'nin de haberleşme ve gözlem amacıyla kullandığı çeşitli yapay\nuyduları bulunmaktadır.",
      "contextId": "ctx_131_134"
    },
    {
      "num": 135,
      "text": "En fazla hangi atık türü toplanmıştır?",
      "options": {
        "A": "Plastik",
        "B": "Cam",
        "C": "Kağıt",
        "D": "Metal"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_135_137"
    },
    {
      "num": 136,
      "text": "Toplam kaç kilogram geri dönüştürülebilir atık toplanmıştır?",
      "options": {
        "A": "110",
        "B": "115",
        "C": "120",
        "D": "125"
      },
      "correctAnswer": "C",
      "didYouKnow": "48 + 35 + 22 + 15 = 120 kg",
      "contextId": "ctx_135_137"
    },
    {
      "num": 137,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Metal, camdan daha fazla toplanmıştır.",
        "B": "Kağıt miktarı plastikten fazladır.",
        "C": "Plastik en az toplanan atıktır.",
        "D": "Cam ile metal eşittir."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_135_137"
    },
    {
      "num": 138,
      "text": "Aşağıdaki kısa haberi okuyunuz.\nBelediye, okul çevresine 250 yeni fidan dikti. Yetkililer, öğrencilerin de bakım çalışmalarına\nkatılacağını açıkladı.\nHabere göre aşağıdaki amaçlardan hangisine ulaşılmak istenmektedir?",
      "options": {
        "A": "Trafiği artırmak",
        "B": "Çevreyi güzelleştirmek ve öğrencilerde çevre bilinci oluşturmak",
        "C": "Okulun ders saatlerini uzatmak",
        "D": "Yeni bina yapmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 139,
      "text": "Bir kutuda kırmızı, mavi ve yeşil renkli bilyeler bulunmaktadır.\n Kırmızı bilye sayısı, mavi bilye sayısından fazladır.\n Yeşil bilye sayısı, kırmızı bilye sayısından azdır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
      "options": {
        "A": "En fazla bilye yeşildir.",
        "B": "Mavi bilye sayısı kırmızıdan fazladır.",
        "C": "Kırmızı bilye sayısı yeşilden fazladır.",
        "D": "Tüm renklerden eşit sayıda vardır."
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 140,
      "text": "Bir öğrenci hazırladığı sunumda kullandığı görsellerin kaynaklarını da yazmıştır.\nBu davranış aşağıdakilerden hangisini gösterir?",
      "options": {
        "A": "Zaman kaybettiğini",
        "B": "Bilimsel ve etik kurallara uygun davrandığını",
        "C": "Sunumunun eksik olduğunu",
        "D": "İnterneti yanlış kullandığını"
      },
      "correctAnswer": "B",
      "didYouKnow": "Kaynak göstermek, bilgiye ve emeğe saygı göstermenin önemli bir parçasıdır.",
      "contextId": null
    },
    {
      "num": 141,
      "text": "Metne göre tohum bankalarının kurulmasının temel amacı aşağıdakilerden hangisidir?",
      "options": {
        "A": "Yeni şehirler kurmak",
        "B": "Bitki türlerini korumak",
        "C": "Elektrik üretmek",
        "D": "Hava tahmini yapmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_141_144"
    },
    {
      "num": 142,
      "text": "Aşağıdakilerden hangisi metinde bitki türlerini tehdit eden durumlardan biri olarak\nverilmiştir?",
      "options": {
        "A": "Güneş'in doğması",
        "B": "Kuraklık",
        "C": "Rüzgâr",
        "D": "Mevsimlerin değişmesi"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_141_144"
    },
    {
      "num": 143,
      "text": "Metne göre tohumlar neden uygun koşullarda saklanmaktadır?",
      "options": {
        "A": "Daha ağır olmaları için",
        "B": "Uzun yıllar kullanılabilmeleri için",
        "C": "Renklerinin değişmesi için",
        "D": "Daha hızlı büyümeleri için"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_141_144"
    },
    {
      "num": 144,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Tohum bankaları geleceğe yönelik önemli bir güvence oluşturur.",
        "B": "Tohumlar yalnızca yazın saklanır.",
        "C": "Dünyadaki bütün bitkiler aynı özelliktedir.",
        "D": "Bitkiler korunmaya ihtiyaç duymaz."
      },
      "correctAnswer": "A",
      "didYouKnow": "Dünyanın farklı bölgelerinde kurulan tohum bankaları, tarımsal çeşitliliğin\nkorunmasına katkı sağlamaktadır.",
      "contextId": "ctx_141_144"
    },
    {
      "num": 145,
      "text": "En fazla kitabı hangi sınıf okumuştur?",
      "options": {
        "A": "5. sınıf",
        "B": "6. sınıf",
        "C": "7. sınıf",
        "D": "8. sınıf"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_145_147"
    },
    {
      "num": 146,
      "text": "Tüm sınıflar toplam kaç kitap okumuştur?",
      "options": {
        "A": "730",
        "B": "740",
        "C": "750",
        "D": "760"
      },
      "correctAnswer": "C",
      "didYouKnow": "180 + 165 + 210 + 195 = 750 kitap",
      "contextId": "ctx_145_147"
    },
    {
      "num": 147,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "6. sınıf en fazla kitap okumuştur.",
        "B": "8. sınıf, 5. sınıftan daha fazla kitap okumuştur.",
        "C": "5. ve 6. sınıflar eşit sayıda kitap okumuştur.",
        "D": "7. sınıf en az kitap okumuştur."
      },
      "correctAnswer": "B",
      "didYouKnow": "148. Harita Yorumu\nBir öğrenci, Türkiye haritasında aşağıdaki şehirleri incelemiştir:\n Trabzon (Karadeniz kıyısı)\n Antalya (Akdeniz kıyısı)\n Konya (İç Anadolu)\n Erzurum (Doğu Anadolu)\n\n\n\n\nBuna göre aşağıdaki şehirlerden hangisi denize kıyısı olmayan bir şehirdir?\nA) Trabzon\nB) Antalya\nC) Konya\nD) Hepsi\n✅ Doğru Cevap: C\n149. Haber Yorumu\nBir belediye, okul bahçelerine yağmur suyu toplama sistemi kurdu. Toplanan suların bahçe\nsulamasında kullanılacağı açıklandı.\nBu uygulamanın temel amacı aşağıdakilerden hangisidir?\nA) Elektrik üretmek\nB) Su tasarrufu sağlamak\nC) Trafiği azaltmak\nD) Hava sıcaklığını düşürmek\n✅ Doğru Cevap: B\n150. Mantık Sorusu\nBir yarışmada;\n Elif, Ahmet'ten daha fazla puan almıştır.\n Ahmet, Zeynep'ten daha fazla puan almıştır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Zeynep en yüksek puanı almıştır.\nB) Elif, Zeynep'ten daha fazla puan almıştır.\nC) Ahmet en düşük puanı almıştır.\nD) Üçü de eşit puan almıştır.\n✅ Doğru Cevap: B\nSıralama: Elif > Ahmet > Zeynep olduğundan Elif'in Zeynep'ten daha fazla puan aldığı\nkesin olarak söylenebilir.",
      "contextId": "ctx_145_147"
    },
    {
      "num": 151,
      "text": "Metne göre sulak alanların görevlerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Dağların yüksekliğini artırmak",
        "B": "Taşkın riskini azaltmaya yardımcı olmak",
        "C": "Deprem oluşmasını engellemek",
        "D": "Denizleri tuzsuz hâle getirmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_151_154"
    },
    {
      "num": 152,
      "text": "Metne göre sulak alanların küçülmesine neden olan durumlardan biri aşağıdakilerden\nhangisidir?",
      "options": {
        "A": "Ağaçların büyümesi",
        "B": "Yanlış su kullanımı",
        "C": "Güneş'in doğması",
        "D": "Mevsimlerin değişmesi"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_151_154"
    },
    {
      "num": 153,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Sulak alanların korunması hem insanlar hem de diğer canlılar için önemlidir.",
        "B": "Sulak alanlarda hiçbir canlı yaşamaz.",
        "C": "Sulak alanlar yalnızca balıkçılar için önemlidir.",
        "D": "Sulak alanlar sadece yaz aylarında oluşur."
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_151_154"
    },
    {
      "num": 154,
      "text": "Metindeki \"filtreleyerek\" sözcüğü aşağıdaki anlamlardan hangisinde kullanılmıştır?",
      "options": {
        "A": "Suyu doğal yollarla temizlemek",
        "B": "Suyu ısıtmak",
        "C": "Suyu dondurmak",
        "D": "Suyu renklendirmek"
      },
      "correctAnswer": "A",
      "didYouKnow": "Bir kelimenin anlamını metindeki kullanımından çıkarmaya\nbağlamdan anlam çıkarma denir. LGS'de bu beceri sıkça ölçülmektedir.\n155–157. soruları aşağıdaki infografiğe göre cevaplayınız.\nBir okulun enerji tasarrufu çalışmaları sonucunda aylık elektrik tüketimi:\nAy Elektrik Tüketimi (kWh)\nOcak 1200\nŞubat 1100\nAy Elektrik Tüketimi (kWh)\nMart 950\nNisan 900",
      "contextId": "ctx_151_154"
    },
    {
      "num": 155,
      "text": "Elektrik tüketiminin en düşük olduğu ay hangisidir?",
      "options": {
        "A": "Ocak",
        "B": "Şubat",
        "C": "Mart",
        "D": "Nisan"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 156,
      "text": "Dört ayda toplam kaç kWh elektrik tüketilmiştir?",
      "options": {
        "A": "4050",
        "B": "4100",
        "C": "4150",
        "D": "4200"
      },
      "correctAnswer": "C",
      "didYouKnow": "1200 + 1100 + 950 + 900 = 4150 kWh",
      "contextId": null
    },
    {
      "num": 157,
      "text": "Tablodaki verilere göre aşağıdaki yorumlardan hangisi yapılabilir?",
      "options": {
        "A": "Elektrik tüketimi her ay bir önceki aya göre azalmıştır.",
        "B": "Mart ayında tüketim en yüksektir.",
        "C": "Şubat ayında tüketim artmıştır.",
        "D": "Nisan ayında en fazla elektrik kullanılmıştır."
      },
      "correctAnswer": "A",
      "didYouKnow": "158. Haber Metni\nBir ilde öğrenciler, kullanılmayan oyuncaklarını toplayarak ihtiyaç sahibi çocuklara ulaştırdı.\nKampanyaya yüzlerce öğrenci destek verdi.\nHabere göre öğrencilerin bu çalışmayla geliştirdiği değer aşağıdakilerden hangisidir?\nA) Rekabet\nB) Yardımlaşma ve paylaşma\nC) Zaman yönetimi\nD) Tasarruf\n✅ Doğru Cevap: B\n159. Mantık Sorusu\nBir kitaplıkta üç raf vardır.\n Bilim kitapları, hikâye kitaplarının üst rafındadır.\n Şiir kitapları, bilim kitaplarının alt rafındadır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Hikâye kitapları en üst raftadır.\nB) Bilim kitapları şiir kitaplarının üstündedir.\nC) Şiir kitapları en üst raftadır.\nD) Hikâye kitapları ile şiir kitapları aynı raftadır.\n✅ Doğru Cevap: B\n160. Genel Kültür\nAşağıdaki doğal oluşumlardan hangisi UNESCO Dünya Mirası Listesi'nde yer alan ve beyaz\ntravertenleriyle tanınan bir bölgedir?\nA) Kapadokya\nB) Nemrut Dağı\nC) Pamukkale\nD) Uludağ\n✅ Doğru Cevap: C\nPamukkale'nin travertenleri, kalsiyum bakımından zengin sıcak suların zamanla\noluşturduğu doğal yapılardır.",
      "contextId": null
    },
    {
      "num": 161,
      "text": "Metne göre mercan resiflerinin önemli görevlerinden biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Yağmur oluşturmak",
        "B": "Deniz canlılarına yaşam alanı sağlamak",
        "C": "Deniz suyunu tatlı suya dönüştürmek",
        "D": "Adaları büyütmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_161_164"
    },
    {
      "num": 162,
      "text": "Metne göre aşağıdakilerden hangisi mercan resiflerine zarar verebilir?",
      "options": {
        "A": "Deniz suyunun ısınması",
        "B": "Ağaç dikilmesi",
        "C": "Geri dönüşüm yapılması",
        "D": "Yağmur yağması"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_161_164"
    },
    {
      "num": 163,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Mercan resifleri yalnızca balıklar için önemlidir.",
        "B": "Deniz ekosisteminin korunması birçok canlı için gereklidir.",
        "C": "Mercanlar karada yaşar.",
        "D": "Bilim insanları mercanlarla ilgilenmemektedir."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_161_164"
    },
    {
      "num": 164,
      "text": "Metindeki \"ekosistem\" sözcüğü aşağıdakilerden hangisini ifade eder?",
      "options": {
        "A": "Bir bölgede yaşayan canlılar ile çevrelerinin oluşturduğu doğal düzen",
        "B": "Deniz suyunun sıcaklığı",
        "C": "Okyanusların derinliği",
        "D": "Balıkçı tekneleri"
      },
      "correctAnswer": "A",
      "didYouKnow": "Bilmediğiniz bir kelimenin anlamını metindeki ipuçlarından tahmin\netmek, okuduğunu anlama becerisini geliştirir.",
      "contextId": "ctx_161_164"
    },
    {
      "num": 165,
      "text": "Etkinliğe en fazla katılım hangi gün olmuştur?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Çarşamba",
        "D": "Perşembe"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_165_167"
    },
    {
      "num": 166,
      "text": "Dört günde etkinliğe toplam kaç öğrenci katılmıştır?",
      "options": {
        "A": "108",
        "B": "110",
        "C": "112",
        "D": "114"
      },
      "correctAnswer": "D",
      "didYouKnow": "24 + 28 + 32 + 30 = 114 öğrenci",
      "contextId": "ctx_165_167"
    },
    {
      "num": 167,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Katılım her gün bir önceki güne göre artmıştır.",
        "B": "Perşembe günü katılım, Çarşamba gününden azdır.",
        "C": "Pazartesi günü en yüksek katılım olmuştur.",
        "D": "Salı ve Perşembe günleri eşit katılım olmuştur."
      },
      "correctAnswer": "B",
      "didYouKnow": "168. Haber Metni\nBir okulda öğrenciler, eski defterlerin boş sayfalarını bir araya getirerek taslak defterler\nhazırladı. Hazırlanan defterler okulda ücretsiz olarak kullanılmaya başlandı.\nBu uygulamanın temel amacı aşağıdakilerden hangisidir?\nA) Kâğıt israfını azaltmak\nB) Ders sürelerini uzatmak\nC) Daha fazla ödev vermek\nD) Okul binasını büyütmek\n✅ Doğru Cevap: A\n169. Mantık Sorusu\nDört arkadaş farklı sporlarla ilgilenmektedir.\n Ayşe yüzme yapmaktadır.\n Berk futbol oynamaktadır.\n Elif, Berk ile aynı sporu yapmamaktadır.\n Can yüzme yapmamaktadır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Elif yüzme yapmaktadır.\nB) Can futbol oynamaktadır.\nC) Elif futbol oynamamaktadır.\nD) Can basketbol oynamaktadır.\n✅ Doğru Cevap: C\nAçıklama: Berk futbol oynadığına göre Elif onunla aynı sporu yapmadığı için futbol\noynamamaktadır. Diğer sporu kesin olarak belirlenemez.\n170. Genel Kültür\nAşağıdaki yapılardan hangisi, Osmanlı döneminde su kemeri olarak inşa edilmiş ve\ngünümüzde de İstanbul'un önemli tarihî eserlerinden biri olarak bilinmektedir?\nA) Galata Kulesi\nB) Valens (Bozdoğan) Kemeri\nC) Kız Kulesi\nD) Rumeli Hisarı\n✅ Doğru Cevap: B\nBozdoğan Kemeri'nin ilk yapımı Valens Aqueduct dönemine kadar uzanır; yapı sonraki\ndönemlerde de kullanılmış ve onarılmıştır. Bu nedenle farklı uygarlıkların izlerini taşıyan\nönemli tarihî eserlerden biridir.",
      "contextId": "ctx_165_167"
    },
    {
      "num": 171,
      "text": "Metne göre bambunun kullanılabileceği alanlardan biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Yakıt üretimi",
        "B": "Mobilya üretimi",
        "C": "Petrol çıkarılması",
        "D": "Elektrik depolanması"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_171_174"
    },
    {
      "num": 172,
      "text": "Metne göre bambunun toprağa sağladığı katkı aşağıdakilerden hangisidir?",
      "options": {
        "A": "Toprağı tuzlandırması",
        "B": "Erozyonu azaltmaya yardımcı olması",
        "C": "Yağışı artırması",
        "D": "Toprağı ısıtması"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_171_174"
    },
    {
      "num": 173,
      "text": "Aşağıdakilerden hangisi bambunun büyümesini etkileyen faktörlerden biri olarak metinde\nverilmiştir?",
      "options": {
        "A": "İklim",
        "B": "Ay'ın evreleri",
        "C": "Rüzgârın yönü",
        "D": "Günlerin adı"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_171_174"
    },
    {
      "num": 174,
      "text": "Bu metinden aşağıdaki sonuçlardan hangisi çıkarılabilir?",
      "options": {
        "A": "Tüm bambular aynı hızda büyür.",
        "B": "Bambu hem doğaya hem de insan yaşamına katkı sağlayabilir.",
        "C": "Bambu yalnızca Asya'da yetişir.",
        "D": "Bambunun kullanım alanı yoktur."
      },
      "correctAnswer": "B",
      "didYouKnow": "Bazı bambu türleri dünyanın en hızlı büyüyen bitkileri arasında gösterilir.",
      "contextId": "ctx_171_174"
    },
    {
      "num": 175,
      "text": "Öğrenci en fazla kitabı hangi ay okumuştur?",
      "options": {
        "A": "Ocak",
        "B": "Şubat",
        "C": "Mart",
        "D": "Nisan"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_175_177"
    },
    {
      "num": 176,
      "text": "Dört ayda toplam kaç kitap okunmuştur?",
      "options": {
        "A": "12",
        "B": "13",
        "C": "14",
        "D": "15"
      },
      "correctAnswer": "C",
      "didYouKnow": "2 + 4 + 5 + 3 = 14 kitap",
      "contextId": "ctx_175_177"
    },
    {
      "num": 177,
      "text": "Tablodaki verilere göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Kitap sayısı her ay düzenli olarak artmıştır.",
        "B": "Nisan ayında okunan kitap sayısı Şubat ayından azdır.",
        "C": "Ocak ayında en fazla kitap okunmuştur.",
        "D": "Mart ve Nisan aylarında eşit sayıda kitap okunmuştur."
      },
      "correctAnswer": "B",
      "didYouKnow": "178. Harita Bilgisi\nTürkiye haritasında aşağıdaki şehirler işaretlenmiştir:\n Rize\n İzmir\n Kayseri\n Mersin\nBu şehirlerden hangisi Karadeniz Bölgesi'nde yer alır?\nA) İzmir\nB) Kayseri\nC) Rize\nD) Mersin\n✅ Doğru Cevap: C\n179. Mantık Sorusu\nBir okul yarışmasında dört öğrenci farklı dereceler almıştır.\n Ece, Mert'ten daha başarılıdır.\n Mert, Deniz'den daha başarılıdır.\n Deniz, Zeynep'ten daha başarılıdır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Zeynep birincidir.\nB) Ece, Deniz'den daha başarılıdır.\nC) Mert sonuncudur.\nD) Deniz, Ece'den daha başarılıdır.\n✅ Doğru Cevap: B\n180. Günlük Yaşam ve Dijital Okuryazarlık\nBir öğrenci internette araştırma yaparken ulaştığı bilgilerin sonunda kaynakça bulunduğunu,\nbilgilerin güncel olduğunu ve farklı güvenilir sitelerde de aynı bilgilerin yer aldığını görüyor.\nBu durumda öğrencinin aşağıdaki sonuçlardan hangisine ulaşması daha uygundur?\nA) Bilgilerin güvenilir olma olasılığı yüksektir.\nB) Kaynakçaya bakmaya gerek yoktur.\nC) İnternetteki bütün bilgiler doğrudur.\nD) Tek bir site her zaman yeterlidir.\n✅ Doğru Cevap: A\nGüvenilir bilgiye ulaşmak için farklı kaynakları karşılaştırmak ve bilgilerin güncel olup\nolmadığını kontrol etmek önemlidir.",
      "contextId": "ctx_175_177"
    },
    {
      "num": 181,
      "text": "Metne göre rüzgâr türbinlerinin dönmesini sağlayan nedir?",
      "options": {
        "A": "Güneş ışınları",
        "B": "Akan su",
        "C": "Esen rüzgâr",
        "D": "Toprak hareketleri"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_181_184"
    },
    {
      "num": 182,
      "text": "Rüzgâr santrallerinin önemli avantajlarından biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Petrol üretmesi",
        "B": "Daha az zararlı gaz salması",
        "C": "Yağmur oluşturması",
        "D": "Depremi önlemesi"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_181_184"
    },
    {
      "num": 183,
      "text": "Metne göre türbin kurulurken aşağıdakilerden hangisi dikkate alınmalıdır?",
      "options": {
        "A": "Yalnızca yol genişliği",
        "B": "Kuş göç yolları ve doğal yaşam",
        "C": "Sadece şehir merkezleri",
        "D": "Deniz suyu sıcaklığı"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_181_184"
    },
    {
      "num": 184,
      "text": "Bu metinden çıkarılabilecek en uygun sonuç aşağıdakilerden hangisidir?",
      "options": {
        "A": "Yenilenebilir enerji kullanılırken çevresel etkiler de değerlendirilmelidir.",
        "B": "Rüzgâr enerjisi yalnızca yazın kullanılabilir.",
        "C": "Türbinler elektrik tüketir.",
        "D": "Rüzgâr santralleri yalnızca denizlerde kurulabilir."
      },
      "correctAnswer": "A",
      "didYouKnow": "Yenilenebilir enerji kaynakları çevreye daha az zarar verme potansiyeline\nsahip olsa da kurulacak tesislerin doğal yaşam üzerindeki etkileri planlama aşamasında\ndeğerlendirilir.",
      "contextId": "ctx_181_184"
    },
    {
      "num": 185,
      "text": "Öğrenci en fazla soruyu hangi gün çözmüştür?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Çarşamba",
        "D": "Perşembe"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": "ctx_185_187"
    },
    {
      "num": 186,
      "text": "Öğrenci dört günde toplam kaç soru çözmüştür?",
      "options": {
        "A": "120",
        "B": "125",
        "C": "130",
        "D": "135"
      },
      "correctAnswer": "C",
      "didYouKnow": "25 + 35 + 30 + 40 = 130 soru",
      "contextId": "ctx_185_187"
    },
    {
      "num": 187,
      "text": "Grafiğe göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Her gün bir önceki günden daha fazla soru çözülmüştür.",
        "B": "Salı günü, Pazartesi gününden daha fazla soru çözülmüştür.",
        "C": "Çarşamba günü en yüksek soru sayısına ulaşılmıştır.",
        "D": "Pazartesi ve Perşembe günleri eşit sayıda soru çözülmüştür."
      },
      "correctAnswer": "B",
      "didYouKnow": "188. Haber Yorumu\nBir ilkokulda öğrenciler, okul bahçesine sebze fideleri dikerek yıl boyunca gelişimlerini\ngözlemledi. Hasat edilen ürünler okul yemekhanesinde değerlendirildi.\nHaberde anlatılan çalışmanın öğrencilerde geliştirmesi beklenen becerilerden biri\naşağıdakilerden hangisidir?\nA) Doğayı gözlemleme ve sorumluluk alma\nB) Trafik kurallarını öğrenme\nC) Yabancı dil konuşma\nD) Harita çizme\n✅ Doğru Cevap: A\n189. Mantık Sorusu\nBir rafta dört kitap soldan sağa doğru dizilmiştir.\n Kırmızı kitap, mavi kitabın solundadır.\n Yeşil kitap, kırmızı kitabın sağındadır.\n Sarı kitap, en sağdadır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Mavi kitap en soldadır.\nB) Yeşil kitap, kırmızı kitabın sağındadır.\nC) Sarı kitap en soldadır.\nD) Kırmızı kitap en sağdadır.\n✅ Doğru Cevap: B\n190. Genel Kültür\nAşağıdaki yapılardan hangisi, insanların gökyüzünü incelemek amacıyla kullanılan bir\ngözlem merkezidir?\nA) Kütüphane\nB) Gözlemevi\nC) Müze\nD) Stadyum\n✅ Doğru Cevap: B\nGözlemevlerinde teleskoplar ve çeşitli bilimsel araçlar kullanılarak gök cisimleri incelenir.",
      "contextId": "ctx_185_187"
    },
    {
      "num": 191,
      "text": "211–214. soruları aşağıdaki metne göre cevaplayınız.\nGeri Dönüşümün Yolculuğu\nHer gün kullandığımız plastik şişeler, cam kavanozlar, metal kutular ve kâğıtlar doğru şekilde\nayrıştırıldığında yeniden kullanılabilir. Bu işleme geri dönüşüm denir. Geri dönüşüm\nsayesinde doğal kaynakların daha az tüketilmesi, enerji tasarrufu sağlanması ve atık\nmiktarının azaltılması mümkün olur.\nÖrneğin, geri dönüştürülen bir alüminyum kutunun yeniden üretilmesi, aynı kutunun ham\nmaddeden üretilmesine göre daha az enerji gerektirir. Ancak geri dönüşümün başarılı\nolabilmesi için atıkların doğru kutulara atılması ve kirletilmeden toplanması gerekir.",
      "options": {},
      "correctAnswer": "",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 211,
      "text": "Metne göre geri dönüşümün amaçlarından biri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Atık miktarını artırmak",
        "B": "Doğal kaynakları daha verimli kullanmak",
        "C": "Daha fazla çöp üretmek",
        "D": "Elektrik tüketimini artırmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 212,
      "text": "Metne göre geri dönüşümün başarılı olabilmesi için aşağıdakilerden hangisi gereklidir?",
      "options": {
        "A": "Atıkları rastgele çöpe atmak",
        "B": "Atıkları doğru şekilde ayrıştırmak",
        "C": "Camları kırarak toplamak",
        "D": "Kâğıtları yakmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 213,
      "text": "Aşağıdakilerden hangisi metinden çıkarılabilecek bir sonuçtur?",
      "options": {
        "A": "Geri dönüşüm yalnızca plastikler için yapılır.",
        "B": "Geri dönüşüm çevrenin korunmasına katkı sağlar.",
        "C": "Atıklar hiçbir zaman tekrar kullanılamaz.",
        "D": "Geri dönüşüm enerji tüketimini artırır."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": null
    },
    {
      "num": 214,
      "text": "Metindeki \"ayrıştırmak\" sözcüğü aşağıdaki anlamlardan hangisinde kullanılmıştır?",
      "options": {
        "A": "Bir araya getirmek",
        "B": "Türlerine göre ayırmak",
        "C": "Boyamak",
        "D": "Yok etmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "Bilmediğiniz sözcüklerin anlamını, cümledeki kullanımına bakarak\ntahmin etmeye çalışın.",
      "contextId": null
    },
    {
      "num": 215,
      "text": "Öğrenci en fazla zamanı hangi etkinliğe ayırmıştır?",
      "options": {
        "A": "Spor",
        "B": "Kitap okuma",
        "C": "Bilgisayar kullanımı",
        "D": "Müzik çalışması"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_215_217"
    },
    {
      "num": 216,
      "text": "Öğrenci toplam kaç dakika etkinlik yapmıştır?",
      "options": {
        "A": "340",
        "B": "350",
        "C": "360",
        "D": "370"
      },
      "correctAnswer": "C",
      "didYouKnow": "140 + 90 + 70 + 60 = 360 dakika",
      "contextId": "ctx_215_217"
    },
    {
      "num": 217,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Spor için ayrılan süre, bilgisayar kullanımından fazladır.",
        "B": "Müzik çalışmasına en fazla zaman ayrılmıştır.",
        "C": "Kitap okumaya ayrılan süre ile spor süresi eşittir.",
        "D": "Bilgisayar kullanımına 90 dakika ayrılmıştır."
      },
      "correctAnswer": "A",
      "didYouKnow": "218. Haber Yorumu\nBir okulda öğrenciler, kullanılmayan pilleri toplamak amacıyla sınıflara geri dönüşüm\nkutuları yerleştirdi. Kampanya sonunda yüzlerce atık pil geri dönüşüme gönderildi.\nBu kampanyanın temel amacı aşağıdakilerden hangisidir?\nA) Zararlı atıkların çevreye zarar vermesini önlemek\nB) Daha fazla pil üretmek\nC) Elektrik tüketimini artırmak\nD) Sınıfları yeniden düzenlemek\n✅ Doğru Cevap: A\n219. Mantık Sorusu\nDört arkadaş farklı günlerde kütüphaneye gitmiştir.\n Elif, Ahmet'ten önce gitmiştir.\n Ahmet, Can'dan sonra gitmiştir.\n Can, Zeynep'ten sonra gitmiştir.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Elif ilk gitmiştir.\nB) Zeynep, Can'dan önce gitmiştir.\nC) Ahmet son gitmiştir.\nD) Can, Elif'ten önce gitmiştir.\n✅ Doğru Cevap: B\nAçıklama: Verilenlere göre sıralama kesin olarak Zeynep → Can → Ahmet şeklindedir.\nElif'in yeri yalnızca Ahmet'ten önce olduğu için kesin belirlenemez.\n220. Genel Kültür\nAşağıdaki icatlardan hangisi yazıların ve kitapların daha hızlı çoğaltılmasını sağlayarak\nbilgiye erişimi kolaylaştırmıştır?\nA) Pusula\nB) Matbaa\nC) Teleskop\nD) Mikroskop\n✅ Doğru Cevap: B\nPrinting press, kitapların daha hızlı basılmasını sağlayarak bilginin geniş kitlelere\nulaşmasında önemli bir rol oynamıştır.",
      "contextId": "ctx_215_217"
    },
    {
      "num": 221,
      "text": "Metne göre kutup hayvanlarının kalın yağ tabakasına sahip olmasının temel nedeni\naşağıdakilerden hangisidir?",
      "options": {
        "A": "Daha hızlı koşabilmek",
        "B": "Vücut sıcaklığını koruyabilmek",
        "C": "Daha iyi yüzebilmek",
        "D": "Daha fazla beslenebilmek"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_221_224"
    },
    {
      "num": 222,
      "text": "Bilim insanları kutuplardaki değişimleri nasıl takip etmektedir?",
      "options": {
        "A": "Yalnızca gazete okuyarak",
        "B": "Uydu görüntüleri ve ölçümlerle",
        "C": "Sadece tahmin yürüterek",
        "D": "Sadece turistlerden bilgi alarak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_221_224"
    },
    {
      "num": 223,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Kutup bölgeleri yalnızca araştırmacılar için önemlidir.",
        "B": "Kutup bölgeleri ve burada yaşayan canlılar korunması gereken önemli doğal alanlardır.",
        "C": "Kutuplarda hiçbir canlı yaşamaz.",
        "D": "Bütün buzullar aynı hızla erir."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_221_224"
    },
    {
      "num": 224,
      "text": "Metindeki \"uyum sağlamak\" ifadesi aşağıdakilerden hangisini anlatmaktadır?",
      "options": {
        "A": "Bulunulan koşullara uygun özellikler geliştirmek",
        "B": "Sürekli yer değiştirmek",
        "C": "Daha hızlı büyümek",
        "D": "Yiyecek depolamak"
      },
      "correctAnswer": "A",
      "didYouKnow": "Bir ifadenin anlamını bulunduğu cümle ve metnin tamamını dikkate\nalarak belirlemek, güçlü bir okuma becerisidir.",
      "contextId": "ctx_221_224"
    },
    {
      "num": 225,
      "text": "En fazla proje hangi alanda hazırlanmıştır?",
      "options": {
        "A": "Çevre",
        "B": "Robotik",
        "C": "Astronomi",
        "D": "Geri Dönüşüm"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": "ctx_225_227"
    },
    {
      "num": 226,
      "text": "Toplam kaç proje hazırlanmıştır?",
      "options": {
        "A": "40",
        "B": "41",
        "C": "42",
        "D": "43"
      },
      "correctAnswer": "C",
      "didYouKnow": "12 + 9 + 7 + 14 = 42 proje",
      "contextId": "ctx_225_227"
    },
    {
      "num": 227,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Robotik projeleri çevre projelerinden fazladır.",
        "B": "Astronomi projeleri en az sayıdadır.",
        "C": "Geri dönüşüm ile robotik proje sayısı eşittir.",
        "D": "Çevre projeleri en az sayıdadır."
      },
      "correctAnswer": "B",
      "didYouKnow": "228. Haber Yorumu\nBir ilçede düzenlenen \"Kitapsız Gün Yok\" kampanyasında öğrenciler, evlerinde okumadıkları\nkitapları okul kütüphanesine bağışladı. Kütüphanedeki kitap sayısı kısa sürede iki katına çıktı.\nBu haberde anlatılan kampanyanın öğrenciler üzerindeki en önemli etkisi aşağıdakilerden\nhangisi olabilir?\nA) Kitap paylaşma ve okuma kültürünü geliştirmek\nB) Ders saatlerini artırmak\nC) Kütüphane girişlerini ücretli yapmak\nD) Kitap satışını artırmak\n✅ Doğru Cevap: A\n229. Mantık Sorusu\nDört öğrenci farklı bilim dallarını seçmiştir.\n Ayşe biyolojiyi seçmiştir.\n Mehmet fiziği seçmemiştir.\n Elif kimyayı seçmiştir.\n Mehmet, Ayşe ile aynı alanı da seçmemiştir.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Mehmet biyolojiyi seçmiştir.\nB) Mehmet fizik seçmemiştir.\nC) Elif biyolojiyi seçmiştir.\nD) Mehmet kimyayı seçmiştir.\n✅ Doğru Cevap: B\n230. Genel Kültür\nAşağıdaki araçlardan hangisi, çok küçük canlıları veya hücreleri incelemek amacıyla\nkullanılır?\nA) Dürbün\nB) Teleskop\nC) Mikroskop\nD) Termometre\n✅ Doğru Cevap: C\nMikroskop sayesinde çıplak gözle görülemeyecek kadar küçük yapılar incelenebilir.",
      "contextId": "ctx_225_227"
    },
    {
      "num": 231,
      "text": "Metne göre bilim merkezindeki etkinliklerin öğrenciler için en önemli katkısı aşağıdakilerden\nhangisidir?",
      "options": {
        "A": "Sadece eğlenmelerini sağlamak",
        "B": "Bilimi uygulayarak öğrenmelerine yardımcı olmak",
        "C": "Ders çalışmadan başarılı olmalarını sağlamak",
        "D": "Deney yapmayı yasaklamak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_231_234"
    },
    {
      "num": 232,
      "text": "Rehberlerin öğrencilerin tahminlerini dinlemesi aşağıdaki becerilerden hangisini geliştirmeyi\namaçlamaktadır?",
      "options": {
        "A": "Ezber yapmayı",
        "B": "Bilimsel düşünmeyi ve sorgulamayı",
        "C": "Sessiz kalmayı",
        "D": "Hızlı yazmayı"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_231_234"
    },
    {
      "num": 233,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Bilim yalnızca laboratuvarlarda yapılır.",
        "B": "Bilim öğrenirken gözlem yapmak, soru sormak ve deney yapmak önemlidir.",
        "C": "Bilim merkezleri yalnızca yetişkinler içindir.",
        "D": "Deney yapmak gereksizdir."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_231_234"
    },
    {
      "num": 234,
      "text": "Metindeki \"etkileşimli düzenek\" ifadesi aşağıdakilerden hangisini anlatmaktadır?",
      "options": {
        "A": "Öğrencilerin kullanarak deneyim kazanabildiği eğitim araçları",
        "B": "Sadece öğretmenlerin kullandığı araçlar",
        "C": "Bozuk deney malzemeleri",
        "D": "Kitap rafları"
      },
      "correctAnswer": "A",
      "didYouKnow": "Metindeki yeni kavramların anlamını, cümlenin bütünü ve verilen\nörneklerden yararlanarak çıkarabilirsiniz.",
      "contextId": "ctx_231_234"
    },
    {
      "num": 235,
      "text": "En fazla ziyaretçi hangi gün gelmiştir?",
      "options": {
        "A": "Pazartesi",
        "B": "Salı",
        "C": "Çarşamba",
        "D": "Perşembe"
      },
      "correctAnswer": "D",
      "didYouKnow": "",
      "contextId": "ctx_235_237"
    },
    {
      "num": 236,
      "text": "Dört günde toplam kaç ziyaretçi bilim şenliğini ziyaret etmiştir?",
      "options": {
        "A": "780",
        "B": "790",
        "C": "800",
        "D": "810"
      },
      "correctAnswer": "C",
      "didYouKnow": "180 + 210 + 195 + 215 = 800 kişi",
      "contextId": "ctx_235_237"
    },
    {
      "num": 237,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Pazartesi günü en fazla ziyaretçi gelmiştir.",
        "B": "Çarşamba günü ziyaretçi sayısı Salı gününden azdır.",
        "C": "Salı ve Perşembe günü ziyaretçi sayısı aynıdır.",
        "D": "Her gün eşit sayıda ziyaretçi gelmiştir."
      },
      "correctAnswer": "B",
      "didYouKnow": "238. Afiş Yorumu\nOKUL BİLİM ŞENLİĞİ\nTarih: 15 Mayıs\nSaat: 09.30 – 16.00\nYer: Okul Spor Salonu\nEtkinlikler:\n Robot gösterileri\n Fen deneyleri\n Gökyüzü gözlemi\n Geri dönüşüm atölyesi\nKatılım ücretsizdir.\nAfişe göre aşağıdakilerden hangisi yanlıştır?\nA) Etkinlik okul spor salonunda yapılacaktır.\nB) Giriş için ücret alınacaktır.\nC) Robot gösterileri düzenlenecektir.\nD) Gökyüzü gözlemi yapılacaktır.\n✅ Doğru Cevap: B\n239. Mantık Sorusu\nDört öğrenci farklı kitap türlerini tercih etmektedir.\n Ali, hikâye kitabı okumaktadır.\n Zeynep şiir kitabı okumamaktadır.\n Elif, Ali ile aynı tür kitabı okumamaktadır.\n Mehmet bilim kitabı okumaktadır.\n\n\n\n\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?\nA) Elif hikâye kitabı okumamaktadır.\nB) Zeynep bilim kitabı okumaktadır.\nC) Mehmet şiir kitabı okumaktadır.\nD) Ali bilim kitabı okumaktadır.\n✅ Doğru Cevap: A\n240. Genel Kültür\nAşağıdaki doğal olaylardan hangisi, Dünya'nın kendi ekseni etrafında dönmesi sonucu oluşur?\nA) Mevsimlerin oluşması\nB) Gece ve gündüzün oluşması\nC) Depremler\nD) Gelgit olayları\n✅ Doğru Cevap: B\nDünya'nın kendi ekseni etrafındaki dönüşü yaklaşık 24 saat sürer ve gece ile gündüzün\noluşmasını sağlar.",
      "contextId": "ctx_235_237"
    },
    {
      "num": 241,
      "text": "Metne göre geleceğin şehirlerinde ulaşılmak istenen amaçlardan biri aşağıdakilerden\nhangisidir?",
      "options": {
        "A": "Fosil yakıt kullanımını artırmak",
        "B": "Çevre dostu uygulamaları yaygınlaştırmak",
        "C": "Park alanlarını azaltmak",
        "D": "Trafik ışıklarını kaldırmak"
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_241_244"
    },
    {
      "num": 242,
      "text": "Metne göre aşağıdakilerden hangisi geleceğin şehirlerinde planlanan uygulamalardan biridir?",
      "options": {
        "A": "Yağmur sularını yeniden değerlendirmek",
        "B": "Ormanları azaltmak",
        "C": "Geri dönüşümü durdurmak",
        "D": "Bütün yolları kapatmak"
      },
      "correctAnswer": "A",
      "didYouKnow": "",
      "contextId": "ctx_241_244"
    },
    {
      "num": 243,
      "text": "Bu metnin ana fikri aşağıdakilerden hangisidir?",
      "options": {
        "A": "Şehirlerde teknoloji kullanılmamalıdır.",
        "B": "Geleceğin şehirleri çevreyi koruyan ve yaşamı kolaylaştıran özelliklerle planlanmaktadır.",
        "C": "Ulaşım yalnızca otomobillerle yapılmalıdır.",
        "D": "Yenilenebilir enerji gereksizdir."
      },
      "correctAnswer": "B",
      "didYouKnow": "",
      "contextId": "ctx_241_244"
    },
    {
      "num": 244,
      "text": "Metindeki \"yaşam kalitesi\" ifadesi aşağıdakilerden hangisini anlatmaktadır?",
      "options": {
        "A": "İnsanların daha sağlıklı, güvenli ve rahat yaşayabilmesi",
        "B": "Evlerin büyüklüğü",
        "C": "Şehir nüfusunun artması",
        "D": "Binaların yüksekliği"
      },
      "correctAnswer": "A",
      "didYouKnow": "Bir kavramın anlamını, metindeki örnekler ve açıklamalardan\nyararlanarak belirlemek okuduğunu anlama becerisini güçlendirir.",
      "contextId": "ctx_241_244"
    },
    {
      "num": 245,
      "text": "En fazla katılım hangi etkinlikte gerçekleşmiştir?",
      "options": {
        "A": "Kitap Bağışı",
        "B": "Fidan Dikimi",
        "C": "Atık Pil Toplama",
        "D": "Sokak Hayvanlarına Destek"
      },
      "correctAnswer": "C",
      "didYouKnow": "",
      "contextId": "ctx_245_247"
    },
    {
      "num": 246,
      "text": "Etkinliklere toplam kaç öğrenci katılmıştır?",
      "options": {
        "A": "340",
        "B": "345",
        "C": "350",
        "D": "355"
      },
      "correctAnswer": "C",
      "didYouKnow": "95 + 80 + 110 + 65 = 350 öğrenci",
      "contextId": "ctx_245_247"
    },
    {
      "num": 247,
      "text": "Tabloya göre aşağıdaki yorumlardan hangisi doğrudur?",
      "options": {
        "A": "Sokak Hayvanlarına Destek etkinliğine katılım en fazladır.",
        "B": "Kitap Bağışı etkinliğine katılım, Fidan Dikimi etkinliğinden fazladır.",
        "C": "Fidan Dikimi etkinliğine 110 öğrenci katılmıştır.",
        "D": "Tüm etkinliklere eşit sayıda öğrenci katılmıştır."
      },
      "correctAnswer": "B",
      "didYouKnow": "248. Haber Yorumu\nBir ilde öğrenciler, kullanılmayan elektronik cihazların geri dönüşüme kazandırılması için\nkampanya başlattı. Toplanan elektronik atıklar lisanslı geri dönüşüm tesislerine gönderildi.\nBöylece çevreye zarar verebilecek maddelerin doğaya karışmasının önüne geçilmesi\nhedeflendi.\nBu haberde anlatılan çalışmanın temel amacı aşağıdakilerden hangisidir?\nA) Elektronik atıkların çevreye zarar vermesini önlemek\nB) Daha fazla elektronik ürün satmak\nC) Elektrik tüketimini artırmak\nD) Yeni telefon üretmek\n✅ Doğru Cevap: A\n249. Mantık Sorusu\nDört arkadaş farklı şehirlerde yaşamaktadır.\n Ayşe Ankara'da yaşamamaktadır.\n Berk İzmir'de yaşamaktadır.\n Can, Berk ile aynı şehirde yaşamamaktadır.\n Elif Bursa'da yaşamaktadır.\nAşağıdakilerden hangisi kesin olarak söylenebilir?\nA) Ayşe Bursa'da yaşamaktadır.\nB) Can Ankara'da yaşamaktadır.\nC) Berk İzmir'de yaşamaktadır.\nD) Elif Ankara'da yaşamaktadır.\n✅ Doğru Cevap: C\n250. Genel Kültür\nAşağıdaki davranışlardan hangisi dijital vatandaşlığın doğru bir örneğidir?\nA) Güçlü şifre kullanmak ve kişisel bilgileri paylaşmamak\nB) Tanımadığı kişilere şifresini vermek\nC) İnternette gördüğü her bilgiyi doğru kabul etmek\nD) Başkalarının hesaplarını izinsiz kullanmak\n✅ Doğru Cevap: A\nGüvenli internet kullanımı; güçlü parola oluşturmayı, kişisel bilgileri korumayı ve çevrim\niçi ortamda saygılı davranmayı içerir.",
      "contextId": "ctx_245_247"
    }
  ],
  "contexts": [
    {
      "id": "ctx_16_17",
      "type": "text",
      "content": "Arılar çiçeklerden topladıkları nektarı kovana taşıyarak bal üretirler. Bu sırada çiçeklerin\npolenlerini de başka çiçeklere ulaştırırlar. Böylece birçok bitkinin çoğalmasına yardımcı\nolurlar. Bu nedenle arılar doğadaki canlılar için büyük önem taşır.",
      "start": 16,
      "end": 17
    },
    {
      "id": "ctx_19_20",
      "type": "text",
      "content": "Geri dönüşüm; kâğıt, cam, plastik ve metal gibi atıkların yeniden işlenerek kullanılabilir hâle\ngetirilmesidir. Bu sayede doğal kaynaklar korunur, enerji tasarrufu sağlanır ve çevre kirliliği\nazalır.",
      "start": 19,
      "end": 20
    },
    {
      "id": "ctx_28_30",
      "type": "text",
      "content": "Deniz kaplumbağaları yumurtalarını kumsallara bırakır. Yumurtadan çıkan yavrular,\niçgüdüleri sayesinde denize doğru hareket eder. Ancak sahillerdeki güçlü yapay ışıklar bazen\nyavruların yönlerini şaşırmasına neden olur. Bu durum, denize ulaşmalarını zorlaştırabilir.",
      "start": 28,
      "end": 30
    },
    {
      "id": "ctx_34_35",
      "type": "text",
      "content": "Bir okulda öğrenciler, plastik şişe kullanımını azaltmak amacıyla yanlarında matara getirmeye\nbaşlamıştır. Okul yönetimi de koridorlara su sebilleri yerleştirmiştir. Bir ay sonunda çöpe\natılan plastik şişe sayısının belirgin şekilde azaldığı görülmüştür.",
      "start": 34,
      "end": 35
    },
    {
      "id": "ctx_36_38",
      "type": "table",
      "content": "Bir öğrencinin bir haftada okuduğu kitap sayfaları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayfa</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">12</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">18</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">15</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">20</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Cuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">10</td>\n</tr>\n</tbody></table></div>",
      "start": 36,
      "end": 38
    },
    {
      "id": "ctx_44_45",
      "type": "text",
      "content": "Bir ormanda yaşayan canlılar birbirleriyle ve çevreleriyle sürekli etkileşim içindedir. Bitkiler\ngüneşten aldıkları enerjiyle besin üretirken, otçullar bitkilerle, etçiller ise diğer hayvanlarla\nbeslenir. Böylece doğada bir besin zinciri oluşur. Bu zincirdeki herhangi bir canlının azalması\ndiğer canlıları da etkileyebilir.",
      "start": 44,
      "end": 45
    },
    {
      "id": "ctx_46_48",
      "type": "table",
      "content": "Bir öğrencinin hafta sonu yaptığı etkinlikler:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Etkinlik</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Süre</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Kitap okuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">60 dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Bisiklet sürme</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">90 dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Televizyon izleme</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">40 dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Ödev yapma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">70 dk</td>\n</tr>\n</tbody></table></div>",
      "start": 46,
      "end": 48
    },
    {
      "id": "ctx_49_50",
      "type": "text",
      "content": "Mustafa Kemal Atatürk, çocuklara büyük önem vermiştir. Dünyada çocuklara armağan edilen\nilk ve tek bayram olan 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı, geleceğin çocukların\nelinde yükseleceğine olan inancını gösterir. Her yıl farklı ülkelerden çocuklar da bu\nkutlamalara katılır.",
      "start": 49,
      "end": 50
    },
    {
      "id": "ctx_51_53",
      "type": "text",
      "content": "Arılar ve Doğadaki Görevleri\nArılar yalnızca bal üreten canlılar değildir. Çiçeklerden topladıkları polenleri başka çiçeklere\ntaşıyarak bitkilerin çoğalmasına yardımcı olurlar. Bu olaya tozlaşma denir. Dünyada\nyetiştirilen birçok meyve ve sebze, arılar sayesinde ürün verebilir. Bu nedenle arıların\nsayısının azalması, doğadaki canlıları ve insanların beslenmesini de olumsuz etkileyebilir.",
      "start": 51,
      "end": 53
    },
    {
      "id": "ctx_56_58",
      "type": "table",
      "content": "Bir öğrencinin bir haftada yaptığı spor etkinlikleri:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Süre</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi 30</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı 45</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba 20</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe 40</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">dk</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Cuma 35</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">dk</td>\n</tr>\n</tbody></table></div>",
      "start": 56,
      "end": 58
    },
    {
      "id": "ctx_61_63",
      "type": "text",
      "content": "Yağmur Suyu Neden Önemlidir?\nYağmur, doğadaki su döngüsünün önemli bir parçasıdır. Yağan yağmur sayesinde göller,\nbarajlar ve yer altı suları beslenir. Bazı insanlar, bahçelerini sulamak için çatılarında biriken\nyağmur sularını depolayarak kullanır. Bu yöntem hem su tasarrufu sağlar hem de doğal\nkaynakların korunmasına katkıda bulunur.",
      "start": 61,
      "end": 63
    },
    {
      "id": "ctx_66_68",
      "type": "table",
      "content": "Bir öğrencinin hafta boyunca çözdüğü soru sayıları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün Soru</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">20</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">25</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">15</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">30</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Cuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">10</td>\n</tr>\n</tbody></table></div>",
      "start": 66,
      "end": 68
    },
    {
      "id": "ctx_71_73",
      "type": "text",
      "content": "Denizlerin Sessiz Temizlik Ekibi\nDenizlerde yaşayan bazı canlılar, suyun temiz kalmasına katkı sağlar. Midyeler bunlardan\nbiridir. Midyeler, suyu süzerek beslenir ve bu sırada sudaki bazı küçük parçacıkları da\ntutarlar. Bu özellikleri sayesinde suyun daha temiz olmasına yardımcı olurlar. Ancak\ndenizlerin kirlenmesi midyelerin yaşamını olumsuz etkileyebilir.",
      "start": 71,
      "end": 73
    },
    {
      "id": "ctx_76_78",
      "type": "table",
      "content": "Bir öğrencinin hafta boyunca içtiği su miktarı:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün Bardak</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">8</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">6</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">7</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">9</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Cuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">10</td>\n</tr>\n</tbody></table></div>",
      "start": 76,
      "end": 78
    },
    {
      "id": "ctx_81_83",
      "type": "text",
      "content": "Ormanlar Neden Önemlidir?\nOrmanlar; birçok canlıya yaşam alanı sağlar, havadaki karbondioksiti azaltmaya yardımcı olur\nve oksijen üretir. Ayrıca yağmur sularının toprağa daha kolay karışmasını sağlayarak sel\nriskini azaltabilir. Ancak bilinçsiz ağaç kesimi ve orman yangınları bu doğal dengeyi\nbozabilir.",
      "start": 81,
      "end": 83
    },
    {
      "id": "ctx_86_88",
      "type": "table",
      "content": "Bir öğrencinin bir haftada okuduğu kitap türleri:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Tür Kitap</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Hikâye</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">4</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Bilim</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">2</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Masal</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">1</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Biyografi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">3</td>\n</tr>\n</tbody></table></div>",
      "start": 86,
      "end": 88
    },
    {
      "id": "ctx_91_93",
      "type": "text",
      "content": "Kütüphaneler Bilginin Evi\nKütüphaneler, insanların bilgiye ulaşmasını sağlayan önemli yerlerdir. Kitapların yanı sıra\ndergi, ansiklopedi ve dijital kaynaklar da bulunabilir. Sessiz bir ortam sunmaları, öğrencilerin\nders çalışmasına ve araştırma yapmasına yardımcı olur. Kütüphanelerden yararlanırken\nkitaplara zarar vermemek ve sessiz olmak gerekir.",
      "start": 91,
      "end": 93
    },
    {
      "id": "ctx_96_98",
      "type": "table",
      "content": "Bir öğrencinin bir haftada çözdüğü deneme soruları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Ders Soru</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Türkçe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">40</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Matematik</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">30</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Fen Bilimleri</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">20</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Sosyal Bilgiler</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">10</td>\n</tr>\n</tbody></table></div>",
      "start": 96,
      "end": 98
    },
    {
      "id": "ctx_101_103",
      "type": "text",
      "content": "Deniz Fenerlerinin Görevi\nDeniz fenerleri, özellikle geceleri ve sisli havalarda gemilere yol göstermek amacıyla inşa\nedilir. Güçlü ışıkları sayesinde kaptanlar kıyıya ne kadar yaklaştıklarını anlayabilir ve güvenli\nrotalarını belirleyebilirler. Günümüzde gelişmiş navigasyon sistemleri kullanılmasına rağmen\nbirçok deniz feneri hâlâ aktif olarak hizmet vermektedir.",
      "start": 101,
      "end": 103
    },
    {
      "id": "ctx_106_108",
      "type": "table",
      "content": "Bir öğrencinin hafta boyunca yaptığı etkinlikler:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Etkinlik Süre</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">(Dakika)</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Kitap okuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">90</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Spor</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">120</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Etkinlik Süre</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">(Dakika)</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Resim yapma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">60</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Müzik çalışması</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">30</td>\n</tr>\n</tbody></table></div>",
      "start": 106,
      "end": 108
    },
    {
      "id": "ctx_111_113",
      "type": "text",
      "content": "Göç Eden Kuşların Zorlu Yolculuğu\nHer sonbaharda leylekler ve birçok göçmen kuş, havaların soğumasıyla birlikte daha sıcak\nbölgelere doğru uzun bir yolculuğa çıkar. İlkbaharda ise yeniden yuvalarına dönerler. Bu\nyolculuk sırasında binlerce kilometre uçar, dinlenmek için güvenli alanlara ihtiyaç duyarlar.\nSulak alanların azalması ve çevre kirliliği göçmen kuşların yaşamını zorlaştırmaktadır.",
      "start": 111,
      "end": 113
    },
    {
      "id": "ctx_116_118",
      "type": "table",
      "content": "Bir öğrencinin bir haftada çözdüğü kitap okuma etkinlikleri:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün Okunan</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayfa</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">18</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">22</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">20</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">25</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Cuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">15</td>\n</tr>\n</tbody></table></div>",
      "start": 116,
      "end": 118
    },
    {
      "id": "ctx_121_123",
      "type": "text",
      "content": "Yaşayan Toprak\nToprak, yalnızca bitkilerin yetiştiği bir alan değildir. İçinde solucanlar, böcekler, mantarlar ve\ngözle görülemeyecek kadar küçük canlılar yaşar. Bu canlılar, toprağın havalanmasına ve bitki\nartıklarının parçalanmasına yardımcı olur. Sağlıklı bir toprak, bitkilerin daha iyi büyümesini\nsağlar. Bu nedenle toprağı kirletmemek ve korumak büyük önem taşır.",
      "start": 121,
      "end": 123
    },
    {
      "id": "ctx_126_128",
      "type": "table",
      "content": "Bir öğrencinin hafta boyunca yaptığı etkinlikler:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Etkinlik Gün</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Kitap okuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">5</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Spor</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">3</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Resim yapma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">2</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Müzik çalışması</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">4</td>\n</tr>\n</tbody></table></div>",
      "start": 126,
      "end": 128
    },
    {
      "id": "ctx_131_134",
      "type": "text",
      "content": "Dünyayı Uzaydan İzleyen Uydular\nHer gün kullandığımız birçok teknolojide yapay uydular görev alır. Televizyon yayınları,\ntelefon görüşmeleri, internet bağlantıları ve hava tahminleri bu uydular sayesinde daha\ngüvenilir şekilde yapılabilir. Bazı uydular ise Dünya'nın fotoğraflarını çekerek orman\nyangınlarını, sel bölgelerini ve buzulların durumunu takip eder. Böylece bilim insanları\ndoğada meydana gelen değişimleri daha kolay inceleyebilir.\nAncak uyduların görev süreleri sınırsız değildir. Kullanım ömrü dolan bazı uydular kontrollü\nolarak Dünya atmosferine yönlendirilirken bazıları uzayda \"uzay çöpü\" olarak kalabilir. Bu\nnedenle bilim insanları hem yeni uydular geliştirirken hem de eski uyduların güvenli şekilde\ngörevden ayrılması için çalışmalar yapmaktadır.",
      "start": 131,
      "end": 134
    },
    {
      "id": "ctx_135_137",
      "type": "table",
      "content": "Bir okulun geri dönüşüm kampanyasında bir haftada toplanan atık miktarı:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Atık Türü</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Kilogram</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Kağıt</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">48</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Plastik</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">35</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Cam</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">22</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Metal</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">15</td>\n</tr>\n</tbody></table></div>",
      "start": 135,
      "end": 137
    },
    {
      "id": "ctx_141_144",
      "type": "text",
      "content": "Tohum Bankaları Neden Kurulur?\nDünyada yetişen bitki türlerinin korunması, gelecekte insanların beslenmesi ve doğanın\ndevamlılığı açısından büyük önem taşır. Kuraklık, sel, yangın ve hastalıklar bazı bitki\ntürlerinin azalmasına neden olabilir. Bu nedenle birçok ülkede tohum bankaları kurulmuştur.\nBu merkezlerde bitki tohumları uygun sıcaklık ve nem koşullarında uzun yıllar saklanır.\nGerektiğinde bu tohumlar yeniden ekilerek bitki türlerinin korunmasına katkı sağlanır.\nTohum bankaları yalnızca tarım için değil, biyolojik çeşitliliğin korunması açısından da\nönemlidir. Bilim insanları, gelecekte ortaya çıkabilecek sorunlara karşı bu tohumları önemli\nbir güvence olarak görmektedir.",
      "start": 141,
      "end": 144
    },
    {
      "id": "ctx_145_147",
      "type": "table",
      "content": "Bir okulun \"Kitap Okuma Haftası\" etkinliğinde öğrencilerin okuduğu kitap sayıları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sınıf Kitap</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">5. Sınıf</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">180</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">6. Sınıf</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">165</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">7. Sınıf</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">210</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">8. Sınıf</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">195</td>\n</tr>\n</tbody></table></div>",
      "start": 145,
      "end": 147
    },
    {
      "id": "ctx_151_154",
      "type": "text",
      "content": "Sessiz Kahramanlar: Sulak Alanlar\nSulak alanlar; göller, sazlıklar, deltalar ve bataklıklar gibi suyun etkili olduğu doğal yaşam\nalanlarıdır. Bu bölgelerde balıklar, kurbağalar, su kuşları ve birçok bitki türü yaşar. Sulak\nalanlar yalnızca canlılara yuva olmakla kalmaz, aynı zamanda yağışlı dönemlerde fazla suyu\ndepolayarak taşkın riskini azaltabilir. Ayrıca suyu doğal yollarla filtreleyerek temizlenmesine\nde katkı sağlar.\nSon yıllarda bazı sulak alanlar kuraklık, yanlış su kullanımı ve kirlilik nedeniyle\nküçülmektedir. Bu durum hem burada yaşayan canlıları hem de insanların yaşamını olumsuz\netkileyebilir.",
      "start": 151,
      "end": 154
    },
    {
      "id": "ctx_161_164",
      "type": "text",
      "content": "Mercan Resifleri: Denizlerin Renkli Şehirleri\nMercan resifleri, denizlerde yaşayan çok küçük canlıların zaman içinde oluşturduğu\nyapılardır. Bu resifler; balıklar, deniz kaplumbağaları ve birçok deniz canlısı için barınma ve\nbeslenme alanı sağlar. Aynı zamanda kıyıları büyük dalgaların etkisinden korumaya yardımcı\nolur.\nAncak deniz suyunun ısınması, kirlilik ve bilinçsiz avlanma gibi nedenlerle mercan resifleri\nzarar görebilmektedir. Bilim insanları, bu değerli yaşam alanlarını koruyabilmek için birçok\nülkede araştırmalar yürütmektedir.",
      "start": 161,
      "end": 164
    },
    {
      "id": "ctx_165_167",
      "type": "table",
      "content": "Bir okulun \"Bisikletle Okula Geliyorum\" etkinliğine katılan öğrenci sayıları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün Öğrenci</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">24</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">28</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">32</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">30</td>\n</tr>\n</tbody></table></div>",
      "start": 165,
      "end": 167
    },
    {
      "id": "ctx_171_174",
      "type": "text",
      "content": "Bambu: Hızlı Büyüyen Bir Bitki\nBambu, dünyanın birçok bölgesinde yetişen dayanıklı bir bitkidir. Bazı bambu türleri uygun\nkoşullarda bir günde onlarca santimetre uzayabilir. Bambu; mobilya, kâğıt, müzik aleti ve\nyapı malzemesi üretiminde kullanılabilir. Kök sistemi toprağı tutmaya yardımcı olduğu için\nerozyonun azaltılmasına da katkı sağlar.\nAncak her bambu türü aynı hızda büyümez. İklim, toprak yapısı ve su miktarı bambunun\ngelişimini etkileyen önemli faktörlerdir.",
      "start": 171,
      "end": 174
    },
    {
      "id": "ctx_175_177",
      "type": "graphic",
      "content": "Bir öğrencinin dört ay boyunca okuduğu kitap sayısı:\nAy Kitap Sayısı\nOcak 2\nŞubat 4\nMart 5\nNisan 3",
      "start": 175,
      "end": 177
    },
    {
      "id": "ctx_181_184",
      "type": "text",
      "content": "Rüzgâr Enerjisiyle Elektrik Üretimi\nRüzgâr, yenilenebilir enerji kaynaklarından biridir. Rüzgâr türbinlerinin büyük kanatları, esen\nrüzgârın etkisiyle dönmeye başlar. Bu hareket sayesinde jeneratörler elektrik üretir. Rüzgâr\nsantralleri çalışırken kömür veya petrol gibi yakıtlar kullanılmadığı için havaya daha az\nzararlı gaz salınır. Ancak türbinlerin kurulacağı yer seçilirken çevrede yaşayan insanlar, kuş\ngöç yolları ve doğal yaşam alanları da dikkate alınmalıdır.",
      "start": 181,
      "end": 184
    },
    {
      "id": "ctx_185_187",
      "type": "graphic",
      "content": "Bir öğrencinin hafta boyunca çözdüğü soru sayıları:\nGün Soru Sayısı\nPazartesi 25\nSalı 35\nÇarşamba 30\nPerşembe 40",
      "start": 185,
      "end": 187
    },
    {
      "id": "ctx_215_217",
      "type": "table",
      "content": "Bir öğrencinin bir hafta boyunca yaptığı etkinlikler:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Etkinlik Süre</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">(Dakika)</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Kitap okuma</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">140</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Spor</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">90</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Bilgisayar kullanımı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">70</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Müzik çalışması</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">60</td>\n</tr>\n</tbody></table></div>",
      "start": 215,
      "end": 217
    },
    {
      "id": "ctx_221_224",
      "type": "text",
      "content": "Kutup Bölgelerinde Yaşam\nDünya'nın kuzey ve güney kutup bölgeleri yılın büyük bölümünde oldukça soğuktur. Bu\nbölgelerde yaşayan canlılar, zorlu iklim koşullarına uyum sağlayacak özellikler geliştirmiştir.\nÖrneğin bazı hayvanların kalın yağ tabakaları ve yoğun kürkleri vardır. Bu özellikler, vücut\nısılarını korumalarına yardımcı olur.\nKutup bölgelerindeki buzullar, Dünya'nın iklim sistemi açısından da önemlidir. Ancak son\nyıllarda küresel sıcaklık artışı nedeniyle bazı buzulların erime hızı artmıştır. Bilim insanları bu\ndeğişimi uydu görüntüleri ve uzun süreli ölçümlerle takip etmektedir.",
      "start": 221,
      "end": 224
    },
    {
      "id": "ctx_225_227",
      "type": "table",
      "content": "Bir okulun bilim kulübü öğrencilerinin yıl içinde gerçekleştirdiği proje sayıları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Proje Türü</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Proje Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çevre</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">12</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Robotik</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">9</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Astronomi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">7</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Geri Dönüşüm</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">14</td>\n</tr>\n</tbody></table></div>",
      "start": 225,
      "end": 227
    },
    {
      "id": "ctx_231_234",
      "type": "text",
      "content": "Bilim Merkezinde Bir Gün\nBir grup öğrenci, öğretmenleriyle birlikte bir bilim merkezini ziyaret etti. Burada elektrik,\nuzay, robotik, enerji ve doğa olaylarıyla ilgili etkileşimli düzenekleri incelediler. Öğrenciler,\nbazı deneyleri kendileri yaparak sonuçlarını gözlemledi. Rehberler ise her deneyin neden o\nşekilde gerçekleştiğini açıklayarak öğrencilerin tahminlerini dinledi.\nZiyaret sonunda öğrenciler, bilimin yalnızca kitaplardan öğrenilen bilgilerden ibaret\nolmadığını; gözlem yapmanın, soru sormanın ve denemeler yapmanın da bilimsel öğrenmenin\nönemli parçaları olduğunu fark ettiler.",
      "start": 231,
      "end": 234
    },
    {
      "id": "ctx_235_237",
      "type": "table",
      "content": "Bir okulun \"Bilim Şenliği\"ne katılan ziyaretçi sayıları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Gün Ziyaretçi</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Pazartesi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">180</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Salı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">210</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Gün Ziyaretçi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Sayısı</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Çarşamba</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">195</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Perşembe</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">215</td>\n</tr>\n</tbody></table></div>",
      "start": 235,
      "end": 237
    },
    {
      "id": "ctx_241_244",
      "type": "text",
      "content": "Geleceğin Şehirleri\nBilim insanları ve şehir plancıları, gelecekte şehirlerin daha çevreci, güvenli ve yaşanabilir\nolması için yeni projeler geliştirmektedir. Bu şehirlerde güneş ve rüzgâr gibi yenilenebilir\nenerji kaynaklarının daha fazla kullanılması, yağmur sularının depolanarak yeniden\ndeğerlendirilmesi ve ulaşımda çevre dostu araçların yaygınlaştırılması hedeflenmektedir.\nAyrıca akıllı trafik sistemleri sayesinde gereksiz beklemelerin azaltılması, parkların\nartırılması ve geri dönüşüm uygulamalarının geliştirilmesi planlanmaktadır. Böylece hem\ndoğal kaynakların korunması hem de insanların yaşam kalitesinin yükseltilmesi\namaçlanmaktadır.",
      "start": 241,
      "end": 244
    },
    {
      "id": "ctx_245_247",
      "type": "table",
      "content": "Bir okulun yıl boyunca gerçekleştirdiği sosyal sorumluluk etkinliklerine katılan öğrenci\nsayıları:\n<div class=\"overflow-x-auto my-4\"><table class=\"min-w-full divide-y divide-gray-200 border rounded-lg\">\n<thead class=\"bg-gray-50\"><tr>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Etkinlik Öğrenci</th>\n<th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Sayısı</th>\n</tr></thead>\n<tbody class=\"bg-white divide-y divide-gray-200\">\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Kitap Bağışı</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">95</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Fidan Dikimi</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">80</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Atık Pil Toplama</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">110</td>\n</tr>\n<tr>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">Sokak Hayvanlarına Destek</td>\n<td class=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">65</td>\n</tr>\n</tbody></table></div>",
      "start": 245,
      "end": 247
    }
  ]
};
const pdfQuestions = pdfData.questions;
const pdfContexts = pdfData.contexts;

classLevels.forEach(level => {
    const testCount = 25;
    
    for (let i = 1; i <= testCount; i++) {
        let diffLabel = 'Kolay';
        if (i > 3 && i <= 7) diffLabel = 'Orta';
        if (i > 7) diffLabel = 'Zor';
        
        let finalQuestions: GKQuestion[] = [];
        let finalContexts: GKContext[] = [];
        let introText: string | undefined = undefined;
        
        if (level === '5' || level === '6') {
            introText = "Bu bölümde öğrencilerin okuma-anlama, bilimsel düşünme, grafik yorumlama, harita bilgisi ve mantıksal akıl yürütme becerilerini birlikte kullanmaları hedeflenmiştir. Sorular MEB'in yeni nesil soru yaklaşımına uygun olarak hazırlanmıştır.";
            
            if (level === '5') {
                // Try to pull 10 questions from PDF
                const startIdx = (i - 1) * 10;
                const endIdx = startIdx + 10;
                const slice = pdfQuestions.slice(startIdx, endIdx);
                
                for (let sq of slice) {
                    finalQuestions.push({
                        id: `q_5_${i}_${sq.num}`,
                        text: sq.text,
                        options: sq.options as any,
                        correctAnswer: sq.correctAnswer as any,
                        didYouKnow: sq.didYouKnow,
                        contextId: sq.contextId
                    });
                }
                
                // Add relevant contexts
                const neededCtxIds = new Set(slice.map(q => q.contextId).filter(Boolean));
                for (let ctxId of neededCtxIds) {
                    const ctx = pdfContexts.find(c => c.id === ctxId);
                    if (ctx) finalContexts.push(ctx as GKContext);
                }
            } else if (level === '6') {
                // Pull questions for level 6
                const startIdx = (i - 1) * 10;
                const endIdx = startIdx + 10;
                const slice = pdf6Data.questions.slice(startIdx, endIdx);
                
                for (let sq of slice) {
                    finalQuestions.push({
                        id: `q_6_${i}_${sq.num}`,
                        text: sq.text,
                        options: sq.options as any,
                        correctAnswer: sq.correctAnswer as any,
                        didYouKnow: sq.didYouKnow,
                        contextId: sq.contextId
                    });
                }
                
                // Add relevant contexts
                const neededCtxIds = new Set(slice.map(q => q.contextId).filter(Boolean));
                for (let ctxId of neededCtxIds) {
                    const ctx = pdf6Data.contexts.find(c => c.id === ctxId);
                    if (ctx) finalContexts.push(ctx as GKContext);
                }
            }
            
            } else if (level === '7') {
                // Pull questions for level 7
                const startIdx = (i - 1) * 10;
                const endIdx = startIdx + 10;
                const slice = pdf7Data.questions.slice(startIdx, endIdx);
                
                for (let sq of slice) {
                    finalQuestions.push({
                        id: `q_7_${i}_${sq.num}`,
                        text: sq.text,
                        options: sq.options as any,
                        correctAnswer: sq.correctAnswer as any,
                        didYouKnow: sq.didYouKnow,
                        contextId: sq.contextId
                    });
                }
                
                // Add relevant contexts
                const neededCtxIds = new Set(slice.map(q => q.contextId).filter(Boolean));
                for (let ctxId of neededCtxIds) {
                    const ctx = pdf7Data.contexts.find(c => c.id === ctxId);
                    if (ctx) finalContexts.push(ctx as GKContext);
                }

            } else if (level === '8') {
                const startIdx = (i - 1) * 10;
                const endIdx = startIdx + 10;
                const slice = pdf8Data.questions.slice(startIdx, endIdx);
                
                for (let sq of slice) {
                    finalQuestions.push({
                        id: `q_8_${i}_${sq.num}`,
                        text: sq.text,
                        options: sq.options as any,
                        correctAnswer: sq.correctAnswer as any,
                        didYouKnow: sq.didYouKnow,
                        contextId: sq.contextId
                    });
                }
                
                const neededCtxIds = new Set(slice.map(q => q.contextId).filter(Boolean));
                for (let ctxId of neededCtxIds) {
                    const ctx = pdf8Data.contexts.find(c => c.id === ctxId);
                    if (ctx) finalContexts.push(ctx as GKContext);
                }

            // If less than 10, fill with generated
            if (finalQuestions.length < 10) {
                const needed = 10 - finalQuestions.length;
                for (let qNum = finalQuestions.length + 1; qNum <= 10; qNum++) {
                    let rawQ: any = null;
                    let attempts = 0;
                    
                    while (!rawQ && attempts < 2000) {
                        const gen = rng.pick(generators);
                        const maybeQ = gen();
                        if (maybeQ) {
                            const sortedWrongs = [...maybeQ.wrongs].sort().join('|');
                            const uniqueKey = `${maybeQ.text}|${maybeQ.correct}|${sortedWrongs}`;
                            
                            if (!globalUsedTexts.has(uniqueKey)) {
                                rawQ = maybeQ;
                                globalUsedTexts.add(uniqueKey);
                            }
                        }
                        attempts++;
                    }
                    if (!rawQ) {
                        rawQ = {
                            text: `Benzersiz Soru (Yedek) - Sınıf ${level} - Test ${i} - No ${qNum} - Seed ${rng.nextInt(1, 999999)}`,
                            correct: "Doğru",
                            wrongs: ["Yanlış 1", "Yanlış 2", "Yanlış 3"]
                        };
                    }
                    const { options, correctAnswer } = generateOptions(rawQ.correct, rawQ.wrongs);
                    finalQuestions.push({
                        id: `q_${level}_${i}_gen_${qNum}`,
                        text: rawQ.text,
                        options,
                        correctAnswer,
                        didYouKnow: "Bu konuyla ilgili ilginç bir bilgi: " + correctAnswer + " hakkında daha fazla araştırma yapabilirsin!"
                    });
                }
            }
        } else {
            // Level != 5 (Original generator logic)
            const questions: GKQuestion[] = [];
            
            for (let qNum = 1; qNum <= 10; qNum++) {
                let rawQ: any = null;
                let attempts = 0;
                
                while (!rawQ && attempts < 2000) {
                    const gen = rng.pick(generators);
                    const maybeQ = gen();
                    if (maybeQ) {
                        const sortedWrongs = [...maybeQ.wrongs].sort().join('|');
                        const uniqueKey = `${maybeQ.text}|${maybeQ.correct}|${sortedWrongs}`;
                        
                        if (!globalUsedTexts.has(uniqueKey)) {
                            rawQ = maybeQ;
                            globalUsedTexts.add(uniqueKey);
                        }
                    }
                    attempts++;
                }
                if (!rawQ) {
                    rawQ = {
                        text: `Benzersiz Soru (Yedek) - Sınıf ${level} - Test ${i} - No ${qNum} - Seed ${rng.nextInt(1, 999999)}`,
                        correct: "Doğru",
                        wrongs: ["Yanlış 1", "Yanlış 2", "Yanlış 3"]
                    };
                }
                
                const { options, correctAnswer } = generateOptions(rawQ.correct, rawQ.wrongs);
                questions.push({
                    id: `q_${level}_${i}_${qNum}`,
                    text: rawQ.text,
                    options,
                    correctAnswer
                });
            }
            finalQuestions = questions;
        }

        genelKulturTests.push({
            id: `gk_${level}_${i}`,
            title: `${level}. Sınıf - Test ${i} (${diffLabel})`,
            classLevel: level,
            difficulty: i,
            introText: introText,
            contexts: finalContexts.length > 0 ? finalContexts : undefined,
            questions: finalQuestions
        });
    }
});
