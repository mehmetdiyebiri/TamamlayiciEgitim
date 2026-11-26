export interface FormulaQuizQuestion {
    id: string;
    question: string;
    options: string[];
    ans: string;
    explanation: string;
    hint: string;
}

type RawFormulaRow = [
    question: string,
    correctAnswer: string,
    wrong1: string,
    wrong2: string,
    wrong3: string,
    explanation: string,
    hint: string
];

function deterministicShuffle(items: string[], seedStr: string): string[] {
    const arr = [...items];
    let hash = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
        hash ^= seedStr.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    let state = hash >>> 0;
    for (let i = arr.length - 1; i > 0; i--) {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        const j = state % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function packQuiz(prefix: string, rows: RawFormulaRow[]): FormulaQuizQuestion[] {
    return rows.map(([question, ans, w1, w2, w3, explanation, hint], idx) => {
        const id = `${prefix}_${idx + 1}`;
        return {
            id,
            question,
            options: deterministicShuffle([ans, w1, w2, w3], `${id}:${question}`),
            ans,
            explanation,
            hint,
        };
    });
}

export const FORMULA_QUIZZES: Record<string, FormulaQuizQuestion[]> = {
    // =========================================================================
    // 5. SINIF FORMÜL PEKİŞTİRME SORULARI
    // =========================================================================
    "Dikdörtgenin Çevresi": packQuiz("g5_dc", [
        [
            "Kısa kenarı 5 cm ve uzun kenarı 9 cm olan bir dikdörtgenin çevresi kaç cm'dir?",
            "28 cm", "14 cm", "45 cm", "24 cm",
            "Çevre = 2 × (5 + 9) = 2 × 14 = 28 cm.",
            "Formül: Çevre = 2 × (a + b)"
        ],
        [
            "Çevresi 36 cm ve uzun kenarı 11 cm olan dikdörtgenin kısa kenarı kaç cm'dir?",
            "7 cm", "14 cm", "8 cm", "6 cm",
            "Kısa + Uzun = 36 ÷ 2 = 18 cm. Kısa kenar = 18 − 11 = 7 cm.",
            "Önce çevreyi 2'ye bölerek kısa + uzun toplamını bulun."
        ],
        [
            "Kenarları 12 m ve 8 m olan dikdörtgen şeklindeki bir bahçenin etrafına 2 sıra tel çekilecektir. Kaç metre tel gerekir?",
            "80 m", "40 m", "96 m", "60 m",
            "1 sıra çevre = 2 × (12 + 8) = 40 m. 2 sıra için 40 × 2 = 80 m tel gerekir.",
            "Önce 1 çevreyi hesaplayın, sonra 2 ile çarpın."
        ],
        [
            "Kısa kenarı 6 cm, uzun kenarı kısa kenarının 3 katı olan dikdörtgenin çevresi kaç cm'dir?",
            "48 cm", "24 cm", "36 cm", "54 cm",
            "Uzun kenar = 6 × 3 = 18 cm. Çevre = 2 × (6 + 18) = 2 × 24 = 48 cm.",
            "Önce uzun kenarı 3 ile çarparak bulun."
        ],
        [
            "Çevresi 30 cm olan bir dikdörtgenin kenar uzunlukları aşağıdakilerden hangisi olabilir?",
            "6 cm ve 9 cm", "10 cm ve 20 cm", "5 cm ve 12 cm", "7 cm ve 9 cm",
            "2 × (6 + 9) = 2 × 15 = 30 cm olduğu için kenarlar 6 cm ve 9 cm olabilir.",
            "Kısa + uzun kenar toplamı 30 ÷ 2 = 15 cm olmalıdır."
        ]
    ]),

    "Dikdörtgenin Alanı": packQuiz("g5_da", [
        [
            "Kısa kenarı 6 cm ve uzun kenarı 9 cm olan bir dikdörtgenin alanı kaç cm²'dir?",
            "54 cm²", "30 cm²", "45 cm²", "60 cm²",
            "Alan = Kısa Kenar × Uzun Kenar = 6 × 9 = 54 cm².",
            "Formül: Alan = a × b"
        ],
        [
            "Alanı 48 cm² ve uzun kenarı 8 cm olan bir dikdörtgenin kısa kenarı kaç cm'dir?",
            "6 cm", "8 cm", "4 cm", "7 cm",
            "Kısa Kenar = Alan ÷ Uzun Kenar = 48 ÷ 8 = 6 cm.",
            "Ters işlem: Alanı verilen kenara bölün."
        ],
        [
            "Kenar uzunlukları 12 m ve 15 m olan dikdörtgen şeklindeki bir bahçenin alanı kaç m²'dir?",
            "180 m²", "54 m²", "160 m²", "200 m²",
            "Alan = 12 × 15 = 180 m².",
            "12 ile 15'i çarpın."
        ],
        [
            "Çevresi 34 cm ve uzun kenarı 10 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "70 cm²", "60 cm²", "80 cm²", "140 cm²",
            "Kısa + Uzun = 34 ÷ 2 = 17 cm → Kısa kenar = 17 − 10 = 7 cm. Alan = 10 × 7 = 70 cm².",
            "Önce kısa kenarı bulun, sonra alan formülünü uygulayın."
        ],
        [
            "Bir dikdörtgenin kısa kenarı 2 katına, uzun kenarı 3 katına çıkarılırsa alanı kaç katına çıkar?",
            "6 katına", "5 katına", "4 katına", "8 katına",
            "Örneğin 2 × 3 = 6 iken yeni kenarlar 4 ve 9 olur: 4 × 9 = 36, yani 36 ÷ 6 = 6 katına çıkar.",
            "Küçük sayılar verip (örneğin 1 ve 2) alanı karşılaştırabilirsiniz."
        ]
    ]),

    "Karenin Alanı ve Çevresi": packQuiz("g5_kac", [
        [
            "Bir kenar uzunluğu 8 cm olan bir karenin alanı kaç cm²'dir?",
            "64 cm²", "32 cm²", "16 cm²", "48 cm²",
            "Karenin alanı = a × a = 8 × 8 = 64 cm².",
            "Alan için bir kenarı kendisiyle çarpın."
        ],
        [
            "Alanı 81 cm² olan bir karenin çevresi kaç cm'dir?",
            "36 cm", "27 cm", "18 cm", "40 cm",
            "9 × 9 = 81 olduğundan karenin bir kenarı 9 cm'dir. Çevre = 4 × 9 = 36 cm.",
            "Hangi doğal sayının kendisiyle çarpımı 81 eder?"
        ],
        [
            "Çevresi 48 cm olan karenin alanı kaç cm²'dir?",
            "144 cm²", "96 cm²", "196 cm²", "121 cm²",
            "Bir kenar = 48 ÷ 4 = 12 cm. Alan = 12 × 12 = 144 cm².",
            "Önce çevreyi 4'e bölerek bir kenarı bulun."
        ],
        [
            "Bir kenarı 5 metre olan kare şeklindeki halının 1 m² fiyatı 40 TL ise bu halı kaç TL'dir?",
            "1000 TL", "800 TL", "1200 TL", "500 TL",
            "Alan = 5 × 5 = 25 m². Toplam tutar = 25 × 40 = 1000 TL.",
            "Önce alanı bulun, sonra m² fiyatıyla çarpın."
        ],
        [
            "Bir karenin her kenar uzunluğu 2 katına çıkarılırsa alanı kaç katına çıkar?",
            "4 katına", "2 katına", "6 katına", "8 katına",
            "Kenar 3 cm iken alan 9 cm²'dir. Kenar 6 cm olunca alan 36 cm² olur; 36 ÷ 9 = 4 katına çıkar.",
            "Kenarı 1 cm olan kareyi 2 cm yapıp alanlarını karşılaştırın."
        ]
    ]),

    "Üçgen ve Dörtgen İç Açıları": packQuiz("g5_udi", [
        [
            "İki iç açısı 55° ve 65° olan bir üçgenin üçüncü iç açısı kaç derecedir?",
            "60°", "50°", "70°", "80°",
            "Üçgenin iç açıları toplamı 180°'dir. 55° + 65° = 120° → 180° − 120° = 60°.",
            "Verilen iki açıyı toplayıp 180°'den çıkarın."
        ],
        [
            "Bir dik üçgenin dar açılarından biri 38° ise diğer dar açısı kaç derecedir?",
            "52°", "42°", "62°", "48°",
            "Dik açı 90°'dir. 90° + 38° = 128° → 180° − 128° = 52°.",
            "Dik üçgende iki dar açının toplamı 90° eder."
        ],
        [
            "Üç iç açısı 85°, 95° ve 110° olan bir dörtgenin dördüncü iç açısı kaç derecedir?",
            "70°", "80°", "60°", "90°",
            "Dörtgenin iç açıları toplamı 360°'dir. 85° + 95° + 110° = 290° → 360° − 290° = 70°.",
            "Üç açıyı toplayıp 360°'den çıkarın."
        ],
        [
            "Eşkenar bir üçgenin her bir iç açısı kaç derecedir?",
            "60°", "45°", "90°", "30°",
            "Eşkenar üçgenin 3 iç açısı da eşittir: 180° ÷ 3 = 60°.",
            "180°'yi 3 eşit parçaya bölün."
        ],
        [
            "İkizkenar bir üçgenin tepe açısı 40° ise eşit taban açılarından her biri kaç derecedir?",
            "70°", "80°", "60°", "50°",
            "180° − 40° = 140°. İki taban açısı eşit olduğu için 140° ÷ 2 = 70°.",
            "180°'den tepe açısını çıkarıp 2'ye bölün."
        ]
    ]),

    "Kesirlerde Genişletme": packQuiz("g5_kg", [
        [
            "3/4 kesri 5 ile genişletildiğinde hangi denk kesir elde edilir?",
            "15/20", "12/20", "15/16", "8/9",
            "(3 × 5) / (4 × 5) = 15/20.",
            "Hem payı hem paydayı 5 ile çarpın."
        ],
        [
            "2/7 = □/28 eşitliğinde □ yerine hangi doğal sayı gelmelidir?",
            "8", "6", "14", "4",
            "Payda 7'den 28'e çıkmış (4 ile çarpılmış). Pay da 2 × 4 = 8 olur.",
            "7'yi kaçla çarparsak 28 eder?"
        ],
        [
            "Aşağıdaki kesirlerden hangisi 3/5 kesrine denk DEĞİLDİR?",
            "12/25", "6/10", "9/15", "18/30",
            "3/5 kesrini 4 ile genişletirsek 12/20 olur; 12/25 denk değildir.",
            "Pay ve paydanın aynı sayıyla çarpılıp çarpılmadığını kontrol edin."
        ],
        [
            "5/6 kesrinin paydası 30 olacak şekilde genişletildiğinde payı kaç olur?",
            "25", "20", "30", "15",
            "30 ÷ 6 = 5 ile genişletilir. Yeni pay = 5 × 5 = 25.",
            "6'yı 30 yapmak için 5 ile çarparız."
        ],
        [
            "4/9 = 20/△ eşitliğinde △ yerine hangi sayı gelmelidir?",
            "45", "36", "54", "25",
            "Pay 4'ten 20'ye 5 ile çarpılarak büyümüş. Payda = 9 × 5 = 45.",
            "Pay kaç katına çıktıysa payda da o kadar katına çıkar."
        ]
    ]),

    "Kesirlerde Sadeleştirme": packQuiz("g5_ks", [
        [
            "18/24 kesrinin en sade hâli aşağıdakilerden hangisidir?",
            "3/4", "6/8", "9/12", "2/3",
            "Pay ve payda 6'ya bölünür: (18 ÷ 6) / (24 ÷ 6) = 3/4.",
            "18 ve 24'ün ortak böleni olan en büyük sayıyı (6) kullanın."
        ],
        [
            "35/45 kesri 5 ile sadeleştirilirse hangi kesir elde edilir?",
            "7/9", "5/9", "7/8", "6/9",
            "(35 ÷ 5) / (45 ÷ 5) = 7/9.",
            "Payı ve paydayı 5'e bölün."
        ],
        [
            "24/36 = □/3 eşitliğinde □ yerine hangi sayı gelmelidir?",
            "2", "3", "4", "6",
            "Payda 36 ÷ 12 = 3 olmuş. Pay da 24 ÷ 12 = 2 olur.",
            "36 kaça bölünürse 3 eder?"
        ],
        [
            "Aşağıdaki kesirlerden hangisi en sade hâldedir?",
            "7/12", "9/15", "8/14", "10/25",
            "7 ve 12'nin 1'den başka ortak böleni yoktur; diğerleri 3, 2 ve 5 ile sadeleşir.",
            "Pay ve paydası ortak bölünemeyen kesri bulun."
        ],
        [
            "40/100 kesrinin en sade hâli aşağıdakilerden hangisidir?",
            "2/5", "4/10", "1/4", "3/5",
            "Pay ve payda 20'ye bölünür: (40 ÷ 20) / (100 ÷ 20) = 2/5.",
            "Önce 10 ile, sonra 2 ile sadeleştirebilirsiniz."
        ]
    ]),

    "Yüzde Hesaplama": packQuiz("g5_yh", [
        [
            "3/5 kesrinin yüzde sembolü ile gösterimi aşağıdakilerden hangisidir?",
            "%60", "%35", "%50", "%75",
            "Paydayı 100 yapmak için 20 ile genişletiriz: (3 × 20) / (5 × 20) = 60/100 = %60.",
            "Paydayı 100 yapacak şekilde genişletin."
        ],
        [
            "80 sayısının %25'i kaçtır?",
            "20", "25", "16", "40",
            "%25 demek 25/100 = 1/4 (çeyrek) demektir. 80 ÷ 4 = 20.",
            "%25 bir bütünün dörtte biridir."
        ],
        [
            "12/25 kesri yüzde olarak nasıl ifade edilir?",
            "%48", "%24", "%36", "%60",
            "4 ile genişletiriz: (12 × 4) / (25 × 4) = 48/100 = %48.",
            "25 × 4 = 100."
        ],
        [
            "200 TL'lik bir çantanın %10'u kaç TL'dir?",
            "20 TL", "10 TL", "40 TL", "25 TL",
            "%10 = 10/100 = 1/10'dur. 200 ÷ 10 = 20 TL.",
            "Bir sayının %10'unu bulmak için 10'a böleriz."
        ],
        [
            "0,7 ondalık gösteriminin yüzde olarak ifadesi hangisidir?",
            "%70", "%7", "%0,7", "%17",
            "0,7 = 0,70 = 70/100 = %70.",
            "0,7 = 7/10 kesrini 10 ile genişletin."
        ]
    ]),

    "Olasılık Değeri (0–1)": packQuiz("g5_od", [
        [
            "Hilesiz bir zar atıldığında üst yüze 7 gelme olayının olasılık değeri kaçtır?",
            "0", "1", "1/2", "1/6",
            "Zarda sadece 1'den 6'ya kadar sayılar vardır. 7 gelmesi imkânsız olaydır, olasılığı 0'dır.",
            "İmkânsız olayın olasılığı kaçtır?"
        ],
        [
            "İçinde yalnızca mavi bilyeler bulunan bir torbadan rastgele mavi bilye çekme olayının olasılığı kaçtır?",
            "1", "0", "1/2", "3/4",
            "Torbadaki tüm bilyeler mavi olduğu için kesin olaydır, olasılık değeri 1'dir.",
            "Kesin olayın olasılığı kaçtır?"
        ],
        [
            "Hilesiz bir madeni para atıldığında yazı gelmesi ile tura gelmesi nasıl olaylardır?",
            "Eş olasılıklı (1/2)", "Kesin olay (1)", "İmkânsız olay (0)", "Az olasılıklı",
            "Yazı ve tura gelme şansı birbirine eşittir; her birinin olasılığı 1/2 (%50) olur.",
            "İki eş sonuç vardır."
        ],
        [
            "Aşağıdaki sayılardan hangisi bir olayın olasılık değeri OLAMAZ?",
            "5/4", "0", "1", "3/5",
            "Bir olayın olasılığı 0 ile 1 arasında (0 ve 1 dâhil) olmalıdır. 5/4 > 1 olduğu için olamaz.",
            "Olasılık 1'den büyük olamaz."
        ],
        [
            "Bir torbada 7 kırmızı, 1 sarı top vardır. Rastgele çekilen topun kırmızı olma durumu nasıl nitelendirilir?",
            "Daha olasılıklı (1'e yakın)", "İmkânsız (0)", "Kesin (1)", "Eş olasılıklı (1/2)",
            "Kırmızı top sayısı sarıdan çok daha fazla ama kesin değildir; olasılığı 1'e yakındır.",
            "Sarı top da olduğu için kesin değildir ama 7 > 1'dir."
        ]
    ]),

    // =========================================================================
    // 6. SINIF FORMÜL PEKİŞTİRME SORULARI
    // =========================================================================
    "2 ile Bölünebilme": packQuiz("g6_b2", [
        [
            "Aşağıdaki sayılardan hangisi 2 ile kalansız bölünür?",
            "3478", "2465", "9103", "5551",
            "Birler basamağı çift (0, 2, 4, 6, 8) olan 3478 sayısı 2'ye tam bölünür.",
            "Sadece birler basamağına bakın."
        ],
        [
            "45▲ üç basamaklı sayısı 2 ile tam bölünebildiğine göre ▲ yerine kaç farklı rakam yazılabilir?",
            "5", "4", "3", "6",
            "▲ yerine 0, 2, 4, 6, 8 olmak üzere 5 farklı çift rakam yazılabilir.",
            "Çift rakamları sayın (0 dâhil!)."
        ],
        [
            "789 sayısının 2 ile bölümünden kalan kaçtır?",
            "1", "0", "2", "3",
            "Tek sayıların 2 ile bölümünden kalan daima 1'dir.",
            "Birler basamağı tek mi, çift mi?"
        ],
        [
            "Rakamları farklı en büyük 3 basamaklı çift doğal sayı kaçtır?",
            "986", "988", "998", "984",
            "En büyük rakamlar 9, 8 ve çift olacak şekilde 6 seçilir: 986.",
            "Rakamları farklı olmasına dikkat edin."
        ],
        [
            "2 ile kalansız bölünebilen 63□ sayısında □ yerine yazılabilecek en büyük rakam kaçtır?",
            "8", "9", "6", "4",
            "En büyük çift rakam 8'dir.",
            "Çift rakamların en büyüğü hangisidir?"
        ]
    ]),

    "3 ile Bölünebilme": packQuiz("g6_b3", [
        [
            "Aşağıdaki sayılardan hangisi 3 ile kalansız bölünür?",
            "528", "412", "731", "805",
            "5 + 2 + 8 = 15 (3'ün katı). Diğerlerinin rakamlar toplamı 7, 11 ve 13'tür.",
            "Rakamların toplamı 3'ün katı olmalıdır."
        ],
        [
            "4■2 üç basamaklı sayısı 3 ile tam bölünebildiğine göre ■ yerine yazılabilecek rakamların toplamı kaçtır?",
            "18", "9", "15", "12",
            "4 + 2 = 6 olduğundan ■ yerine 0, 3, 6 ve 9 yazılabilir. Toplamları: 0 + 3 + 6 + 9 = 18.",
            "4 + ■ + 2 toplamını 3'ün katı yapan tüm rakamları bulun."
        ],
        [
            "715 sayısının 3 ile bölümünden kalan kaçtır?",
            "1", "0", "2", "3",
            "Rakamlar toplamı 7 + 1 + 5 = 13. 13 ÷ 3 işleminden kalan 1'dir.",
            "Rakamlar toplamının 3 ile bölümünden kalana bakın."
        ],
        [
            "25□ sayısı 3 ile kalansız bölünebilen en küçük üç basamaklı sayı olduğuna göre □ kaçtır?",
            "2", "1", "5", "8",
            "2 + 5 = 7. 7'den büyük en küçük 3'ün katı 9'dur; 9 − 7 = 2.",
            "2 + 5 + □ = 9 olmalı."
        ],
        [
            "Rakamları toplamı 21 olan bir sayı için aşağıdakilerden hangisi kesinlikle doğrudur?",
            "3 ile kalansız bölünür", "9 ile kalansız bölünür", "2 ile kalansız bölünür", "6 ile kalansız bölünür",
            "21, 3'ün katıdır (3 × 7 = 21) ama 9'un katı değildir; çift olup olmadığı da bilinmez.",
            "21 hangi sayının katıdır?"
        ]
    ]),

    "4 ile Bölünebilme": packQuiz("g6_b4", [
        [
            "Aşağıdaki sayılardan hangisi 4 ile kalansız bölünür?",
            "1736", "2418", "3522", "4914",
            "1736'nın son iki basamağı 36'dır ve 36 = 4 × 9 olduğu için 4'e tam bölünür.",
            "Son iki basamağın 4'ün katı olup olmadığına bakın."
        ],
        [
            "83▲ üç basamaklı sayısı 4 ile tam bölünebildiğine göre ▲ yerine hangi rakamlar yazılabilir?",
            "2 ve 6", "0 ve 4", "4 ve 8", "2 ve 8",
            "Son iki basamak 3▲ şeklinde: 32 ve 36 sayısı 4'ün katıdır; ▲ = 2 veya 6.",
            "30'lu sayılardan hangileri 4'e bölünür?"
        ],
        [
            "5400 sayısı 4 ile kalansız bölünür mü?",
            "Evet, son iki basamağı 00'dır", "Hayır, 4'e bölünmez", "Kalanı 2 olur", "Rakamlar toplamı 4'ün katı değil",
            "Son iki basamağı 00 olan tüm doğal sayılar 4 ile kalansız bölünür.",
            "4 ile bölünebilmede 00 kuralını hatırlayın."
        ],
        [
            "627 sayısının 4 ile bölümünden kalan kaçtır?",
            "3", "1", "2", "0",
            "Son iki basamak 27'dir. 27 = 4 × 6 + 3 olduğundan kalan 3'tür.",
            "27'yi 4'e bölün."
        ],
        [
            "71□ üç basamaklı sayısı 4 ile tam bölünüyorsa □ yerine yazılabilecek en büyük rakam kaçtır?",
            "6", "8", "4", "2",
            "10'lu sayılarda 4'ün katları 12 ve 16'dır. En büyük rakam 6'dır.",
            "12 ve 16'yı kontrol edin."
        ]
    ]),

    "5 ve 10 ile Bölünebilme": packQuiz("g6_b510", [
        [
            "Hem 5 hem de 10 ile kalansız bölünebilen sayı aşağıdakilerden hangisidir?",
            "4820", "4825", "4805", "4812",
            "10 ile bölünebilmek için birler basamağı 0 olmalıdır; sonu 0 olan her sayı 5'e de tam bölünür.",
            "Birler basamağı 0 olan sayıyı seçin."
        ],
        [
            "5 ile kalansız bölünüp 10 ile bölünemeyen bir sayının birler basamağı kesinlikle kaçtır?",
            "5", "0", "2", "1",
            "5'e bölünenlerin sonu 0 veya 5'tir; 10'a bölünmediğine göre son basamak 5 olmalıdır.",
            "0 olsaydı 10'a da bölünürdü."
        ],
        [
            "348 sayısının 5 ile bölümünden kalan kaçtır?",
            "3", "2", "4", "1",
            "Birler basamağı 8'dir; 8 ÷ 5 işleminden kalan 3 olur.",
            "Birler basamağını 5'e bölün."
        ],
        [
            "76■ sayısı 5 ile tam bölünebilen tek sayı ise ■ kaçtır?",
            "5", "0", "3", "7",
            "5'e bölünmesi için 0 veya 5 olmalı; tek sayı dendiği için ■ = 5'tir.",
            "0 çift, 5 tek rakamdır."
        ],
        [
            "943 sayısının 10 ile bölümünden kalan kaçtır?",
            "3", "4", "0", "7",
            "Bir sayının 10 ile bölümünden kalan her zaman birler basamağındaki rakamdır (3).",
            "Birler basamağına bakın."
        ]
    ]),

    "6 ile Bölünebilme": packQuiz("g6_b6", [
        [
            "Aşağıdaki sayılardan hangisi 6 ile kalansız bölünür?",
            "432", "434", "435", "436",
            "432 çifttir (2'ye bölünür) ve 4 + 3 + 2 = 9 (3'e bölünür), dolayısıyla 6'ya tam bölünür.",
            "Hem çift hem de rakamlar toplamı 3'ün katı olmalı."
        ],
        [
            "52▲ üç basamaklı sayısı 6 ile kalansız bölündüğüne göre ▲ kaç olabilir?",
            "2 veya 8", "0 veya 6", "4 veya 8", "2 veya 6",
            "Çift olmalı (0, 2, 4, 6, 8). 5 + 2 + ▲ = 7 + ▲ toplamını 3'ün katı yapan çift rakamlar 2 (9) ve 8 (15)'tir.",
            "Sadece çift rakamları 5 + 2 + ▲ toplamında deneyin."
        ],
        [
            "Bir sayının 6 ile bölünebilmesi için hangi iki sayıya aynı anda tam bölünmesi gerekir?",
            "2 ve 3", "2 ve 4", "3 ve 4", "2 ve 5",
            "6 = 2 × 3 olduğundan sayı hem 2'ye hem 3'e kalansız bölünmelidir.",
            "6'nın aralarında asal çarpanları nelerdir?"
        ],
        [
            "714 sayısı 6 ile kalansız bölünür mü?",
            "Evet, çünkü hem 2'ye hem 3'e bölünür", "Hayır, 3'e bölünmez", "Hayır, 2'ye bölünmez", "Hayır, son iki basamak 6'nın katı değil",
            "714 çifttir ve rakamları toplamı 7 + 1 + 4 = 12 (3'ün katı) olduğu için 6'ya tam bölünür.",
            "Önce çiftliğine, sonra rakamlar toplamına bakın."
        ],
        [
            "6 ile tam bölünebilen en küçük üç basamaklı doğal sayı kaçtır?",
            "102", "100", "106", "108",
            "100 ve 101 3'e bölünmez; 102 çifttir ve 1 + 0 + 2 = 3 olduğu için 6'ya tam bölünür.",
            "100'den başlayıp hem çift hem 3'ün katı olan ilk sayıyı bulun."
        ]
    ]),

    "9 ile Bölünebilme": packQuiz("g6_b9", [
        [
            "Aşağıdaki sayılardan hangisi 9 ile kalansız bölünür?",
            "756", "753", "745", "762",
            "7 + 5 + 6 = 18 (9'un katı). Diğerlerinin toplamları 15, 16 ve 15'tir.",
            "Rakamlar toplamı 9'un katı olmalı."
        ],
        [
            "6■4 üç basamaklı sayısı 9 ile kalansız bölündüğüne göre ■ kaçtır?",
            "8", "5", "2", "9",
            "6 + 4 = 10. 10'dan büyük en küçük 9'un katı 18'dir; ■ = 18 − 10 = 8.",
            "6 + ■ + 4 = 18 denklemini çözün."
        ],
        [
            "824 sayısının 9 ile bölümünden kalan kaçtır?",
            "5", "4", "3", "2",
            "8 + 2 + 4 = 14. 14 ÷ 9 işleminden kalan 5'tir.",
            "Rakamları toplayıp 9'a bölün."
        ],
        [
            "9 ile kalansız bölünen her doğal sayı aşağıdakilerden hangisine kesinlikle tam bölünür?",
            "3", "2", "6", "4",
            "9'un her katı aynı zamanda 3'ün de katıdır; dolayısıyla 3'e kesinlikle tam bölünür.",
            "9 sayısı hangi sayının katıdır?"
        ],
        [
            "45□0 dört basamaklı sayısı 9 ile kalansız bölündüğüne göre □ yerine hangi rakamlar yazılabilir?",
            "0 veya 9", "3 veya 6", "1 veya 8", "2 veya 7",
            "4 + 5 + 0 = 9 (zaten 9'un katı). Bu yüzden □ yerine 0 veya 9 yazılabilir.",
            "4 + 5 + □ + 0 toplamı 9 veya 18 olmalıdır."
        ]
    ]),

    "Tümler ve Bütünler Açılar": packQuiz("g6_tba", [
        [
            "Ölçüsü 38° olan bir açının tümleri kaç derecedir?",
            "52°", "142°", "62°", "48°",
            "Tümler açılar toplamı 90°'dir. 90° − 38° = 52°.",
            "90°'den verilen açıyı çıkarın."
        ],
        [
            "Ölçüsü 65° olan bir açının bütünleri kaç derecedir?",
            "115°", "25°", "125°", "105°",
            "Bütünler açılar toplamı 180°'dir. 180° − 65° = 115°.",
            "180°'den verilen açıyı çıkarın."
        ],
        [
            "Tümler iki açıdan biri diğerinin 2 katı ise küçük açı kaç derecedir?",
            "30°", "60°", "45°", "20°",
            "Küçük açı 1 kat, büyük açı 2 kat → toplam 3 kat = 90° → 1 kat = 30°.",
            "90°'yi 3 eşit parçaya bölün."
        ],
        [
            "Bütünler iki açının farkı 40° ise büyük açı kaç derecedir?",
            "110°", "70°", "100°", "120°",
            "Toplam 180°, fark 40° → (180° + 40°) ÷ 2 = 110° (küçük açı 70°).",
            "İki açının toplamı 180° ve farkı 40° olmalı."
        ],
        [
            "Bir açının bütünleri ile tümleri arasındaki fark daima kaç derecedir?",
            "90°", "180°", "45°", "60°",
            "(180° − α) − (90° − α) = 90° olduğundan fark her zaman 90°'dir.",
            "Örneğin 30° için bütünler (150°) ve tümler (60°) farkını hesaplayın."
        ]
    ]),

    "Üçgenin Alanı": packQuiz("g6_ua", [
        [
            "Tabanı 10 cm ve bu tabana ait yüksekliği 6 cm olan üçgenin alanı kaç cm²'dir?",
            "30 cm²", "60 cm²", "16 cm²", "24 cm²",
            "Alan = (10 × 6) ÷ 2 = 60 ÷ 2 = 30 cm².",
            "Taban ile yüksekliği çarpıp 2'ye bölmeyi unutmayın."
        ],
        [
            "Dik kenarları 8 cm ve 9 cm olan bir dik üçgenin alanı kaç cm²'dir?",
            "36 cm²", "72 cm²", "17 cm²", "34 cm²",
            "Dik üçgende dik kenarlar taban ve yüksekliktir: (8 × 9) ÷ 2 = 36 cm².",
            "Dik kenarların çarpımının yarısını alın."
        ],
        [
            "Alanı 42 cm² ve taban uzunluğu 12 cm olan üçgenin bu tabana ait yüksekliği kaç cm'dir?",
            "7 cm", "3,5 cm", "14 cm", "6 cm",
            "Taban × Yükseklik = 42 × 2 = 84. Yükseklik = 84 ÷ 12 = 7 cm.",
            "Önce alanı 2 ile çarpın, sonra tabana bölün."
        ],
        [
            "Tabanı 14 m, yüksekliği tabanının yarısı kadar olan üçgen şeklindeki parkın alanı kaç m²'dir?",
            "49 m²", "98 m²", "28 m²", "56 m²",
            "Yükseklik = 14 ÷ 2 = 7 m. Alan = (14 × 7) ÷ 2 = 49 m².",
            "Önce yüksekliği bulun, sonra alan formülünü uygulayın."
        ],
        [
            "Tabanı 15 cm, alanı 60 cm² olan üçgenin yüksekliği kaç cm'dir?",
            "8 cm", "4 cm", "6 cm", "10 cm",
            "(15 × h) ÷ 2 = 60 → 15 × h = 120 → h = 120 ÷ 15 = 8 cm.",
            "2 × Alan ÷ Taban formülünü kullanın."
        ]
    ]),

    "Paralelkenarın Alanı": packQuiz("g6_pa", [
        [
            "Taban uzunluğu 9 cm ve bu tabana ait yüksekliği 7 cm olan paralelkenarın alanı kaç cm²'dir?",
            "63 cm²", "31,5 cm²", "32 cm²", "56 cm²",
            "Paralelkenarın alanı = a × h = 9 × 7 = 63 cm².",
            "Üçgenden farklı olarak 2'ye bölme yoktur."
        ],
        [
            "Alanı 84 cm² ve yüksekliği 6 cm olan paralelkenarın bu yüksekliğe ait kenarı kaç cm'dir?",
            "14 cm", "12 cm", "16 cm", "7 cm",
            "Taban = Alan ÷ Yükseklik = 84 ÷ 6 = 14 cm.",
            "Alanı yüksekliğe bölün."
        ],
        [
            "Kenarları 10 cm ve 15 cm olan paralelkenarda 10 cm'lik kenara ait yükseklik 9 cm ise 15 cm'lik kenara ait yükseklik kaç cm'dir?",
            "6 cm", "9 cm", "12 cm", "5 cm",
            "Alan = 10 × 9 = 90 cm². Diğer yükseklik = 90 ÷ 15 = 6 cm.",
            "İki farklı taban ve yüksekliğin çarpımı aynı alanı verir."
        ],
        [
            "Tabanı 12 cm, yüksekliği tabanından 4 cm kısa olan paralelkenarın alanı kaç cm²'dir?",
            "96 cm²", "48 cm²", "144 cm²", "84 cm²",
            "Yükseklik = 12 − 4 = 8 cm. Alan = 12 × 8 = 96 cm².",
            "Önce yüksekliği (12 − 4) hesaplayın."
        ],
        [
            "Paralelkenar şeklindeki bir fayansın tabanı 20 cm, yüksekliği 15 cm'dir. Bu fayanslardan 10 tanesi toplam kaç cm² alan kaplar?",
            "3000 cm²", "300 cm²", "1500 cm²", "6000 cm²",
            "1 fayans = 20 × 15 = 300 cm². 10 fayans = 300 × 10 = 3000 cm².",
            "Önce 1 fayansın alanını bulup 10 ile çarpın."
        ]
    ]),

    "Alan Ölçme Birimleri": packQuiz("g6_aob", [
        [
            "3 m² kaç cm²'ye eşittir?",
            "30 000 cm²", "300 cm²", "3000 cm²", "300 000 cm²",
            "m² → dm² → cm² (2 basamak aşağı) her adımda 100 ile çarpılır: 3 × 10 000 = 30 000 cm².",
            "Alan birimlerinde her basamak 100 kat değişir."
        ],
        [
            "45 000 mm² kaç cm²'dir?",
            "450 cm²", "45 cm²", "4500 cm²", "4,5 cm²",
            "mm²'den cm²'ye 1 basamak yukarı çıkılır (100'e bölünür): 45 000 ÷ 100 = 450 cm².",
            "Bir basamak yukarı çıkarken 2 sıfır silinir."
        ],
        [
            "2,5 dm² kaç cm²'ye eşittir?",
            "250 cm²", "25 cm²", "2500 cm²", "0,25 cm²",
            "dm²'den cm²'ye 1 basamak aşağı inilir: 2,5 × 100 = 250 cm².",
            "100 ile çarpın."
        ],
        [
            "4000 m² + 60 000 dm² toplamı kaç m² eder?",
            "4600 m²", "10 000 m²", "4060 m²", "460 m²",
            "60 000 dm² = 600 m². Toplam = 4000 + 600 = 4600 m².",
            "Önce dm²'yi 100'e bölerek m²'ye çevirin."
        ],
        [
            "0,04 km² kaç m²'ye eşittir?",
            "40 000 m²", "4000 m²", "400 m²", "400 000 m²",
            "1 km² = 1 000 000 m² olduğundan 0,04 × 1 000 000 = 40 000 m².",
            "km²'den m²'ye 3 basamak (1 000 000) inilir."
        ]
    ]),

    "Aritmetik Ortalama ve Açıklık": packQuiz("g6_aoa", [
        [
            "12, 18, 24 ve 26 sayılarının aritmetik ortalaması kaçtır?",
            "20", "18", "22", "21",
            "Toplam = 12 + 18 + 24 + 26 = 80. Ortalama = 80 ÷ 4 = 20.",
            "Sayıları toplayıp veri adedine (4) bölün."
        ],
        [
            "15, 8, 27, 19, 11 veri grubunun açıklığı kaçtır?",
            "19", "16", "14", "21",
            "En büyük veri 27, en küçük veri 8'dir. Açıklık = 27 − 8 = 19.",
            "Açıklık = En Büyük − En Küçük."
        ],
        [
            "Dört sınavının ortalaması 85 olan bir öğrencinin bu dört sınavdan aldığı puanların toplamı kaçtır?",
            "340", "320", "350", "360",
            "Toplam = Ortalama × Veri Sayısı = 85 × 4 = 340.",
            "Ortalama ile sınav sayısını çarpın."
        ],
        [
            "Yaşları 10, 12, 14 olan 3 arkadaşın arasına 16 yaşında biri katılırsa yeni yaş ortalaması kaç olur?",
            "13", "12", "14", "15",
            "Yeni toplam = 10 + 12 + 14 + 16 = 52. Yeni ortalama = 52 ÷ 4 = 13.",
            "Toplamı 4 kişiye bölün."
        ],
        [
            "En küçük verisi 14 ve açıklığı 23 olan bir veri grubunun en büyük verisi kaçtır?",
            "37", "35", "9", "39",
            "En Büyük − 14 = 23 → En Büyük = 23 + 14 = 37.",
            "En küçük veriye açıklığı ekleyin."
        ]
    ]),

    // =========================================================================
    // 7. SINIF FORMÜL PEKİŞTİRME SORULARI
    // =========================================================================
    "Mutlak Değer": packQuiz("g7_md", [
        [
            "|-14| + |+6| − |-5| işleminin sonucu kaçtır?",
            "15", "25", "-13", "3",
            "|-14| = 14, |+6| = 6, |-5| = 5 → 14 + 6 − 5 = 15.",
            "Önce her mutlak değerin sonucunu yazın."
        ],
        [
            "Mutlak değeri 7 olan tam sayılar aşağıdakilerden hangisidir?",
            "-7 ve +7", "Sadece +7", "Sadece -7", "0 ve 7",
            "Sıfıra 7 birim uzaklıkta olan iki tam sayı vardır: -7 ve +7.",
            "Sayı doğrusunda 0'ın hem solunu hem sağını düşünün."
        ],
        [
            "Mutlak değeri 3'ten küçük olan kaç tane tam sayı vardır?",
            "5", "3", "6", "4",
            "|x| < 3 koşulunu sağlayan tam sayılar: -2, -1, 0, 1, 2 (toplam 5 adet).",
            "Negatif tam sayıları ve 0'ı unutmayın."
        ],
        [
            "Aşağıdaki ifadelerden hangisi YANLIŞTIR?",
            "|0| = 1", "|-9| = |+9|", "|-12| > |-4|", "|x| ≥ 0",
            "0'ın sıfıra uzaklığı 0'dır, yani |0| = 0 olmalıdır.",
            "Sıfırın mutlak değerini kontrol edin."
        ],
        [
            "Sayı doğrusunda -11 ile +5 sayılarının sıfıra olan uzaklıkları farkı kaçtır?",
            "6", "16", "-6", "4",
            "|-11| = 11 ve |+5| = 5. Fark = 11 − 5 = 6.",
            "Uzaklık mutlak değer demektir."
        ]
    ]),

    "Tam Sayılarla Çarpma ve Bölme": packQuiz("g7_tscb", [
        [
            "(−6) × (−7) işleminin sonucu kaçtır?",
            "+42", "-42", "-13", "+13",
            "Aynı işaretli iki tam sayının çarpımı pozitiftir: (−6) × (−7) = +42.",
            "(−) × (−) = (+)"
        ],
        [
            "(−48) ÷ (+6) işleminin sonucu kaçtır?",
            "-8", "+8", "-6", "+6",
            "Zıt işaretli iki tam sayının bölümü negatiftir: (−48) ÷ (+6) = −8.",
            "(−) ÷ (+) = (−)"
        ],
        [
            "(−3) × (+4) × (−2) işleminin sonucu kaçtır?",
            "+24", "-24", "+12", "-12",
            "(−3) × (+4) = −12; (−12) × (−2) = +24.",
            "Soldan sağa işaret kurallarını uygulayın."
        ],
        [
            "[(−36) ÷ (−9)] × (−5) işleminin sonucu kaçtır?",
            "-20", "+20", "-45", "+45",
            "(−36) ÷ (−9) = +4. Ardından (+4) × (−5) = −20.",
            "Önce köşeli parantez içindeki bölmeyi yapın."
        ],
        [
            "İki basamaklı en büyük negatif tam sayı ile rakam olan en büyük pozitif tam sayının çarpımı kaçtır?",
            "-90", "-891", "+90", "-99",
            "İki basamaklı en büyük negatif tam sayı −10, en büyük pozitif rakam +9'dur: (−10) × (+9) = −90.",
            "Negatif sayılarda 0'a yakın olan daha büyüktür (−10 > −99)."
        ]
    ]),

    "Orantı Özelliği (İçler-Dışlar)": packQuiz("g7_oo", [
        [
            "4/6 = x/15 orantısında x kaçtır?",
            "10", "8", "12", "9",
            "İçler-dışlar çarpımı: 6x = 4 × 15 = 60 → x = 10.",
            "Çapraz çarpımları eşitleyin."
        ],
        [
            "a/b = 3/5 ve b = 25 ise a kaçtır?",
            "15", "12", "18", "20",
            "5a = 3 × 25 = 75 → a = 15.",
            "Payda 5 katına çıktığı için pay da 5 katına çıkar."
        ],
        [
            "Aşağıdaki oran çiftlerinden hangisi bir orantı OLUŞTURMAZ?",
            "3/4 ile 9/16", "2/5 ile 6/15", "4/7 ile 12/21", "5/8 ile 10/16",
            "3 × 16 = 48 iken 4 × 9 = 36'dır (48 ≠ 36); dolayısıyla orantı oluşturmaz.",
            "İçler çarpımı = Dışlar çarpımı kontrolü yapın."
        ],
        [
            "Sabit hızla 3 saatte 240 km yol giden bir araç aynı hızla 5 saatte kaç km gider?",
            "400 km", "360 km", "450 km", "320 km",
            "Doğru orantı: 3/240 = 5/x → 3x = 1200 → x = 400 km.",
            "Önce 1 saatte aldığı yolu bulabilirsiniz."
        ],
        [
            "(x + 2)/4 = 9/6 orantısında x kaçtır?",
            "4", "6", "3", "5",
            "6(x + 2) = 4 × 9 = 36 → x + 2 = 6 → x = 4.",
            "9/6 oranını 3/2 olarak sadeleştirmek işi kolaylaştırır."
        ]
    ]),

    "Yüzde Artış ve İndirim": packQuiz("g7_yai", [
        [
            "300 TL etiket fiyatlı bir monta %20 indirim yapılırsa yeni fiyatı kaç TL olur?",
            "240 TL", "280 TL", "260 TL", "60 TL",
            "İndirim = 300 × 20/100 = 60 TL. Yeni fiyat = 300 − 60 = 240 TL.",
            "Önce %20'sini bulup başlangıç fiyatından çıkarın."
        ],
        [
            "250 TL olan bir ürüne %12 zam yapılırsa satış fiyatı kaç TL olur?",
            "280 TL", "262 TL", "275 TL", "290 TL",
            "Zam = 250 × 12/100 = 30 TL. Yeni fiyat = 250 + 30 = 280 TL.",
            "250'nin %12'sini hesaplayıp ekleyin."
        ],
        [
            "%25 indirimle 150 TL'ye satılan bir ayakkabının indirimden önceki fiyatı kaç TL'dir?",
            "200 TL", "187,5 TL", "175 TL", "225 TL",
            "%25 indirimli fiyat %75'e karşılık gelir. %75'i 150 ise %100'ü = (150 ÷ 75) × 100 = 200 TL.",
            "150 TL, başlangıç fiyatının %75'idir."
        ],
        [
            "400 kişilik bir okulun mevcudu bir yılda %15 artarsa yeni mevcut kaç kişi olur?",
            "460", "415", "445", "480",
            "Artış = 400 × 15/100 = 60. Yeni mevcut = 400 + 60 = 460.",
            "Her 100 kişide 15 artış olur."
        ],
        [
            "100 TL'lik bir ürüne önce %20 zam yapılıp ardından zamlı fiyattan %20 indirim yapılırsa son fiyat kaç TL olur?",
            "96 TL", "100 TL", "98 TL", "104 TL",
            "Zamlı fiyat = 120 TL. 120'nin %20'si = 24 TL. Son fiyat = 120 − 24 = 96 TL.",
            "İndirim 100 TL üzerinden değil, 120 TL üzerinden yapılır."
        ]
    ]),

    "Çokgenlerde İç Açılar Toplamı": packQuiz("g7_ciat", [
        [
            "Bir altıgenin iç açıları ölçüleri toplamı kaç derecedir?",
            "720°", "540°", "900°", "1080°",
            "(n − 2) × 180° = (6 − 2) × 180° = 4 × 180° = 720°.",
            "n = 6 için (n − 2) × 180° formülünü uygulayın."
        ],
        [
            "İç açıları toplamı 1080° olan çokgen kaç kenarlıdır?",
            "8", "6", "7", "9",
            "(n − 2) × 180° = 1080° → n − 2 = 6 → n = 8 (sekizgen).",
            "1080'i 180'e bölüp 2 ekleyin."
        ],
        [
            "Bir yedigenin iç açıları toplamı kaç derecedir?",
            "900°", "720°", "1080°", "1260°",
            "(7 − 2) × 180° = 5 × 180° = 900°.",
            "7 − 2 = 5 üçgen oluşur."
        ],
        [
            "Bir beşgenin dört iç açısı 100°, 110°, 105° ve 115° ise beşinci iç açısı kaç derecedir?",
            "110°", "100°", "120°", "95°",
            "Beşgenin iç açıları toplamı (5 − 2) × 180° = 540°. Verilenler toplamı 430° → 540° − 430° = 110°.",
            "Önce beşgenin iç açılar toplamını bulun."
        ],
        [
            "Bir ongenin iç açıları toplamı, bir beşgenin iç açıları toplamından kaç derece fazladır?",
            "900°", "720°", "1080°", "540°",
            "Ongen: (10 − 2) × 180° = 1440°. Beşgen: 540°. Fark = 1440° − 540° = 900°.",
            "(8 − 3) × 180° şeklinde de hesaplayabilirsiniz."
        ]
    ]),

    "Düzgün Çokgenin Bir İç Açısı": packQuiz("g7_dcia", [
        [
            "Düzgün bir beşgenin bir iç açısı kaç derecedir?",
            "108°", "120°", "135°", "100°",
            "[(5 − 2) × 180°] ÷ 5 = 540° ÷ 5 = 108°.",
            "İç açılar toplamını kenar sayısına bölün."
        ],
        [
            "Düzgün bir sekizgenin bir iç açısı kaç derecedir?",
            "135°", "120°", "140°", "144°",
            "[(8 − 2) × 180°] ÷ 8 = 1080° ÷ 8 = 135°.",
            "Dış açısı 360° ÷ 8 = 45° olduğundan iç açı 180° − 45° = 135°."
        ],
        [
            "Bir iç açısı 144° olan düzgün çokgen kaç kenarlıdır?",
            "10", "8", "9", "12",
            "Bir dış açısı = 180° − 144° = 36°. Kenar sayısı = 360° ÷ 36° = 10.",
            "İç açıdan dış açıyı (180° − 144°) bulmak çok hızlıdır."
        ],
        [
            "Düzgün bir onikigenin (12 kenarlı) bir iç açısı kaç derecedir?",
            "150°", "144°", "135°", "160°",
            "Bir dış açısı = 360° ÷ 12 = 30°. Bir iç açısı = 180° − 30° = 150°.",
            "Önce dış açıyı bulup 180°'den çıkarın."
        ],
        [
            "Bir iç açısı bir dış açısının 3 katı olan düzgün çokgen kaç kenarlıdır?",
            "8", "6", "9", "10",
            "Dış açı + İç açı = 180° → 1 kat + 3 kat = 4 kat = 180° → Dış açı = 45° → n = 360° ÷ 45° = 8.",
            "Aynı köşedeki iç ve dış açı bütünlerdir (toplamları 180°)."
        ]
    ]),

    "Çokgenlerde Dış Açılar Toplamı": packQuiz("g7_cdat", [
        [
            "Dışbükey bir onbeşgenin dış açıları ölçüleri toplamı kaç derecedir?",
            "360°", "540°", "720°", "180°",
            "Kenar sayısı ne olursa olsun tüm dışbükey çokgenlerin dış açıları toplamı 360°'dir.",
            "Dış açılar toplamı kenar sayısına bağlı değildir."
        ],
        [
            "Bir dörtgenin üç dış açısı 80°, 95° ve 110° ise dördüncü dış açısı kaç derecedir?",
            "75°", "85°", "65°", "90°",
            "80° + 95° + 110° = 285° → 360° − 285° = 75°.",
            "Verilen dış açıları toplayıp 360°'den çıkarın."
        ],
        [
            "Bir çokgenin kenar sayısı 5'ten 10'a çıkarılırsa dış açıları toplamı nasıl değişir?",
            "Değişmez, yine 360° kalır", "2 katına çıkar", "900° artar", "Yarıya iner",
            "Tüm dışbükey çokgenlerde dış açılar toplamı sabit 360°'dir.",
            "İç açılar toplamı artar ama dış açılar toplamı sabittir."
        ],
        [
            "Dört dış açısı 70° olan bir beşgenin beşinci dış açısı kaç derecedir?",
            "80°", "70°", "90°", "60°",
            "4 × 70° = 280° → 360° − 280° = 80°.",
            "360° − 280° işlemini yapın."
        ],
        [
            "İç açıları toplamı dış açıları toplamına eşit olan çokgen aşağıdakilerden hangisidir?",
            "Dörtgen", "Üçgen", "Beşgen", "Altıgen",
            "Dış açılar toplamı 360°'dir; iç açıları toplamı 360° olan çokgen dörtgendir.",
            "(n − 2) × 180° = 360° denklemini çözün."
        ]
    ]),

    "Düzgün Çokgenin Bir Dış Açısı": packQuiz("g7_dcda", [
        [
            "Düzgün bir dokuzgenin bir dış açısı kaç derecedir?",
            "40°", "45°", "36°", "30°",
            "Bir dış açı = 360° ÷ 9 = 40°.",
            "360°'yi kenar sayısına bölün."
        ],
        [
            "Bir dış açısı 24° olan düzgün çokgen kaç kenarlıdır?",
            "15", "12", "18", "14",
            "n = 360° ÷ 24° = 15 kenarlıdır.",
            "Kenar sayısı = 360° ÷ Bir dış açı."
        ],
        [
            "Düzgün altıgenin bir dış açısı, düzgün beşgenin bir dış açısından kaç derece küçüktür?",
            "12°", "15°", "18°", "10°",
            "Düzgün beşgen: 360° ÷ 5 = 72°. Düzgün altıgen: 360° ÷ 6 = 60°. Fark = 72° − 60° = 12°.",
            "İki dış açıyı ayrı ayrı bulup çıkarın."
        ],
        [
            "Bir dış açısı 20° olan düzgün çokgenin bir iç açısı kaç derecedir?",
            "160°", "150°", "140°", "170°",
            "İç açı + Dış açı = 180° → İç açı = 180° − 20° = 160°.",
            "180°'den dış açıyı çıkarın."
        ],
        [
            "Aşağıdaki açılardan hangisi bir düzgün çokgenin bir dış açısı OLAMAZ?",
            "50°", "45°", "36°", "60°",
            "360 sayısı 50'ye tam bölünmediği için (360 ÷ 50 = 7,2) dış açısı 50° olan düzgün çokgen yoktur.",
            "360'ı tam bölmeyen açıyı bulun."
        ]
    ]),

    "Eşkenar Dörtgen ve Yamuğun Alanı": packQuiz("g7_edya", [
        [
            "Köşegen uzunlukları 10 cm ve 14 cm olan bir eşkenar dörtgenin alanı kaç cm²'dir?",
            "70 cm²", "140 cm²", "48 cm²", "60 cm²",
            "Eşkenar dörtgenin alanı = (e × f) ÷ 2 = (10 × 14) ÷ 2 = 70 cm².",
            "Köşegenleri çarpıp 2'ye bölün."
        ],
        [
            "Alt tabanı 12 cm, üst tabanı 8 cm ve yüksekliği 5 cm olan yamuğun alanı kaç cm²'dir?",
            "50 cm²", "100 cm²", "60 cm²", "40 cm²",
            "Yamuğun alanı = [(12 + 8) × 5] ÷ 2 = (20 × 5) ÷ 2 = 50 cm².",
            "Paralel tabanları toplayın, yükseklikle çarpıp 2'ye bölün."
        ],
        [
            "Alanı 48 cm² ve köşegenlerinden biri 12 cm olan eşkenar dörtgenin diğer köşegeni kaç cm'dir?",
            "8 cm", "4 cm", "6 cm", "10 cm",
            "(12 × f) ÷ 2 = 48 → 6f = 48 → f = 8 cm.",
            "Alanı 2 ile çarpıp bilinen köşegene bölün."
        ],
        [
            "Alanı 63 cm², yüksekliği 7 cm ve üst tabanı 6 cm olan yamuğun alt tabanı kaç cm'dir?",
            "12 cm", "9 cm", "15 cm", "10 cm",
            "[(a + 6) × 7] ÷ 2 = 63 → a + 6 = 126 ÷ 7 = 18 → a = 12 cm.",
            "Önce tabanlar toplamını (2 × Alan ÷ h) bulun."
        ],
        [
            "Bir kenarı 9 cm ve bu kenara ait yüksekliği 6 cm olan eşkenar dörtgenin alanı kaç cm²'dir?",
            "54 cm²", "27 cm²", "36 cm²", "45 cm²",
            "Eşkenar dörtgen aynı zamanda bir paralelkenardır: Alan = taban × yükseklik = 9 × 6 = 54 cm².",
            "Taban ve yükseklik verilmişse 2'ye bölünmez."
        ]
    ]),

    "Çemberin Çevresi": packQuiz("g7_cc", [
        [
            "Yarıçapı 7 cm olan çemberin çevre uzunluğu kaç cm'dir? (π = 3 alınız)",
            "42 cm", "21 cm", "147 cm", "36 cm",
            "Çevre = 2 × π × r = 2 × 3 × 7 = 42 cm.",
            "Formül: Çevre = 2 × π × r"
        ],
        [
            "Çapı 12 cm olan bir çemberin çevresi kaç cm'dir? (π = 3 alınız)",
            "36 cm", "72 cm", "18 cm", "48 cm",
            "Çevre = π × Çap = 3 × 12 = 36 cm.",
            "Çap = 2r olduğu için Çevre = π × R."
        ],
        [
            "Çevresi 54 cm olan bir çemberin yarıçapı kaç cm'dir? (π = 3 alınız)",
            "9 cm", "18 cm", "6 cm", "12 cm",
            "2 × 3 × r = 54 → 6r = 54 → r = 9 cm.",
            "Çevreyi 2π (yani 6)'ya bölün."
        ],
        [
            "Yarıçapı 5 cm olan bir çemberin çevresi (π = 3,14 için) kaç cm'dir?",
            "31,4 cm", "15,7 cm", "62,8 cm", "30 cm",
            "Çevre = 2 × 3,14 × 5 = 10 × 3,14 = 31,4 cm.",
            "2 × 5 = 10 ile çarpmak virgülü 1 basamak sağa kaydırır."
        ],
        [
            "Yarıçapı 20 cm olan bisiklet tekerleği 10 tam tur attığında kaç metre ilerler? (π = 3 alınız)",
            "12 m", "120 m", "6 m", "24 m",
            "1 tur = 2 × 3 × 20 = 120 cm. 10 tur = 1200 cm = 12 m.",
            "Sonucu cm'den m'ye çevirmeyi unutmayın (100 cm = 1 m)."
        ]
    ]),

    "Çember Yayının Uzunluğu": packQuiz("g7_cyu", [
        [
            "Yarıçapı 8 cm olan çemberde 90°'lik merkez açının gördüğü yayın uzunluğu kaç cm'dir? (π = 3 alınız)",
            "12 cm", "24 cm", "48 cm", "6 cm",
            "Yay = 2 × 3 × 8 × (90/360) = 48 × 1/4 = 12 cm.",
            "90° tam çemberin 1/4'üdür."
        ],
        [
            "Yarıçapı 10 cm olan çemberde 72°'lik yayın uzunluğu kaç cm'dir? (π = 3 alınız)",
            "12 cm", "15 cm", "10 cm", "20 cm",
            "Tam çevre = 2 × 3 × 10 = 60 cm. 72/360 = 1/5 → Yay = 60 ÷ 5 = 12 cm.",
            "72° / 360° kesrini sadeleştirin (1/5)."
        ],
        [
            "Yarıçapı 12 cm olan çemberde uzunluğu 24 cm olan yayın merkez açısı kaç derecedir? (π = 3 alınız)",
            "120°", "90°", "60°", "150°",
            "Tam çevre = 2 × 3 × 12 = 72 cm. 24/72 = 1/3 → Merkez açı = 360° ÷ 3 = 120°.",
            "Yay uzunluğunun tam çevreye oranı, açının 360°'ye oranına eşittir."
        ],
        [
            "Merkez açısı 60° ve yay uzunluğu 7 cm olan çemberin yarıçapı kaç cm'dir? (π = 3 alınız)",
            "7 cm", "14 cm", "6 cm", "12 cm",
            "60/360 = 1/6 olduğundan tam çevre = 7 × 6 = 42 cm. 2 × 3 × r = 42 → r = 7 cm.",
            "Önce tam çevreyi (7 × 6) bulun."
        ],
        [
            "Yarıçapı 6 cm olan çemberde 150°'lik merkez açının gördüğü yayın uzunluğu kaç cm'dir? (π = 3 alınız)",
            "15 cm", "18 cm", "12 cm", "20 cm",
            "Yay = 2 × 3 × 6 × (150/360) = 36 × (150/360) = 15 cm.",
            "36 ile 360'ı sadeleştirince paydada 10 kalır."
        ]
    ]),

    "Dairenin Alanı": packQuiz("g7_da7", [
        [
            "Yarıçapı 5 cm olan dairenin alanı kaç cm²'dir? (π = 3 alınız)",
            "75 cm²", "30 cm²", "150 cm²", "45 cm²",
            "Alan = π × r² = 3 × 5² = 3 × 25 = 75 cm².",
            "Önce yarıçapın karesini alın, sonra π ile çarpın."
        ],
        [
            "Çapı 8 cm olan dairenin alanı kaç cm²'dir? (π = 3 alınız)",
            "48 cm²", "192 cm²", "24 cm²", "36 cm²",
            "Yarıçap r = 8 ÷ 2 = 4 cm. Alan = 3 × 4² = 3 × 16 = 48 cm².",
            "Çap verilmiş; önce yarıçapı bulun."
        ],
        [
            "Alanı 108 cm² olan bir dairenin yarıçapı kaç cm'dir? (π = 3 alınız)",
            "6 cm", "12 cm", "9 cm", "18 cm",
            "3 × r² = 108 → r² = 36 → r = 6 cm.",
            "Alanı π'ye bölerek r² değerini bulun."
        ],
        [
            "Çevresi 30 cm olan bir dairenin alanı kaç cm²'dir? (π = 3 alınız)",
            "75 cm²", "50 cm²", "90 cm²", "45 cm²",
            "2 × 3 × r = 30 → r = 5 cm. Alan = 3 × 5² = 75 cm².",
            "Önce çevre formülünden yarıçapı bulun."
        ],
        [
            "Bir dairenin yarıçapı 3 katına çıkarılırsa alanı kaç katına çıkar?",
            "9 katına", "3 katına", "6 katına", "12 katına",
            "Alan r² ile orantılıdır: (3r)² = 9r² olduğu için 9 katına çıkar.",
            "r = 1 ve r = 3 için alanları karşılaştırın."
        ]
    ]),

    "Daire Diliminin Alanı": packQuiz("g7_dda", [
        [
            "Yarıçapı 6 cm ve merkez açısı 120° olan daire diliminin alanı kaç cm²'dir? (π = 3 alınız)",
            "36 cm²", "108 cm²", "18 cm²", "54 cm²",
            "Tam alan = 3 × 6² = 108 cm². Dilim = 108 × (120/360) = 108 ÷ 3 = 36 cm².",
            "120° tam dairenin 1/3'üdür."
        ],
        [
            "Yarıçapı 8 cm ve merkez açısı 45° olan daire diliminin alanı kaç cm²'dir? (π = 3 alınız)",
            "24 cm²", "48 cm²", "32 cm²", "16 cm²",
            "Tam alan = 3 × 64 = 192 cm². 45/360 = 1/8 → Dilim = 192 ÷ 8 = 24 cm².",
            "45° tam açının 1/8'idir."
        ],
        [
            "Yarıçapı 10 cm olan dairede alanı 75 cm² olan daire diliminin merkez açısı kaç derecedir? (π = 3 alınız)",
            "90°", "60°", "120°", "75°",
            "Tam alan = 3 × 100 = 300 cm². 75/300 = 1/4 → Merkez açı = 360° ÷ 4 = 90°.",
            "Dilim alanının tam alana oranını bulun."
        ],
        [
            "Merkez açısı 90° ve alanı 27 cm² olan daire diliminin yarıçapı kaç cm'dir? (π = 3 alınız)",
            "6 cm", "9 cm", "4 cm", "12 cm",
            "90° = 1/4 olduğundan tam daire alanı = 27 × 4 = 108 cm². 3 × r² = 108 → r² = 36 → r = 6 cm.",
            "Önce tam dairenin alanını (4 × 27) hesaplayın."
        ],
        [
            "Yarıçapı 10 cm olan bir pizzanın 36°'lik bir diliminin alanı kaç cm²'dir? (π = 3 alınız)",
            "30 cm²", "60 cm²", "15 cm²", "36 cm²",
            "Tam alan = 3 × 10² = 300 cm². 36/360 = 1/10 → Dilim = 300 ÷ 10 = 30 cm².",
            "36° tam dairenin onda biridir."
        ]
    ]),

    // =========================================================================
    // 8. SINIF (LGS) FORMÜL PEKİŞTİRME SORULARI
    // =========================================================================
    "EBOB-EKOK Özelliği": packQuiz("g8_ee", [
        [
            "EBOB(a, b) = 6 ve EKOK(a, b) = 72 olduğuna göre a × b çarpımı kaçtır?",
            "432", "360", "420", "78",
            "a × b = EBOB(a, b) × EKOK(a, b) = 6 × 72 = 432.",
            "İki sayının çarpımı EBOB ile EKOK'un çarpımına eşittir."
        ],
        [
            "İki doğal sayıdan biri 18, EBOB'ları 6 ve EKOK'ları 90 ise diğer sayı kaçtır?",
            "30", "24", "36", "45",
            "18 × b = 6 × 90 = 540 → b = 540 ÷ 18 = 30.",
            "a × b = EBOB × EKOK eşitliğini kurun."
        ],
        [
            "Aralarında asal iki doğal sayının EKOK'u 84 ve sayılardan biri 12 ise diğer sayı kaçtır?",
            "7", "6", "14", "8",
            "Aralarında asal sayılarda EBOB = 1, EKOK = a × b'dir. 12 × b = 84 → b = 7.",
            "Aralarında asal sayıların çarpımı EKOK'larına eşittir."
        ],
        [
            "EBOB(24, 36) + EKOK(24, 36) işleminin sonucu kaçtır?",
            "84", "72", "96", "60",
            "EBOB(24, 36) = 12, EKOK(24, 36) = 72. Toplam = 12 + 72 = 84.",
            "24 = 2³·3 ve 36 = 2²·3² ayrışımlarını kullanın."
        ],
        [
            "Çarpımları 180 ve EBOB'ları 3 olan iki doğal sayının EKOK'u kaçtır?",
            "60", "90", "45", "30",
            "3 × EKOK = 180 → EKOK = 180 ÷ 3 = 60.",
            "Sayıların çarpımını EBOB'a bölün."
        ]
    ]),

    "Üslü İfadelerde Çarpma (Aynı Taban)": packQuiz("g8_ucat", [
        [
            "2⁵ × 2⁻² × 2⁴ işleminin sonucu aşağıdakilerden hangisidir?",
            "2⁷", "2¹¹", "2⁶", "2⁹",
            "Aynı tabanda üsler toplanır: 5 + (−2) + 4 = 7 → 2⁷.",
            "Üsleri işaretleriyle birlikte toplayın."
        ],
        [
            "3⁻⁴ × 3⁷ işleminin değeri kaçtır?",
            "27", "9", "81", "1/27",
            "3⁻⁴⁺⁷ = 3³ = 27.",
            "−4 + 7 = 3."
        ],
        [
            "5ˣ × 5⁻³ = 5⁶ eşitliğinde x kaçtır?",
            "9", "3", "−3", "2",
            "x + (−3) = 6 → x = 9.",
            "Hangi sayıdan 3 çıkarınca 6 kalır?"
        ],
        [
            "4³ × 2⁵ işleminin sonucu 2 tabanında aşağıdakilerden hangisidir?",
            "2¹¹", "2⁸", "2¹⁵", "2⁹",
            "4³ = (2²)³ = 2⁶. Ardından 2⁶ × 2⁵ = 2¹¹.",
            "Önce 4'ü 2² şeklinde yazıp tabanları eşitleyin."
        ],
        [
            "10⁻⁵ × 10⁸ × 10⁻³ işleminin sonucu kaçtır?",
            "1", "10", "0", "100",
            "Üsler toplamı: −5 + 8 + (−3) = 0 → 10⁰ = 1.",
            "Sıfırdan farklı her sayının 0. kuvveti 1'dir."
        ]
    ]),

    "Üslü İfadelerde Çarpma (Aynı Üs)": packQuiz("g8_ucau", [
        [
            "2⁶ × 5⁶ işleminin sonucu aşağıdakilerden hangisidir?",
            "10⁶", "10¹²", "7⁶", "25⁶",
            "Üsler eşit olduğundan tabanlar çarpılır: (2 × 5)⁶ = 10⁶.",
            "Ortak üssü koruyup tabanları çarpın."
        ],
        [
            "3⁴ × 4⁴ ifadesi aşağıdakilerden hangisine eşittir?",
            "12⁴", "12⁸", "7⁴", "12¹⁶",
            "(3 × 4)⁴ = 12⁴.",
            "aˣ × bˣ = (a × b)ˣ"
        ],
        [
            "2⁸ × 5⁶ sayısı kaç basamaklıdır?",
            "7", "8", "6", "9",
            "2⁸ × 5⁶ = 2² × 2⁶ × 5⁶ = 4 × 10⁶ = 4 000 000 (7 basamaklı).",
            "2⁸'i 2² × 2⁶ diye ayırıp 10⁶ elde edin."
        ],
        [
            "6⁵ ifadesi aşağıdakilerden hangisine eşittir?",
            "2⁵ × 3⁵", "2³ × 3²", "2⁵ + 3⁵", "3⁵ × 3⁵",
            "6 = 2 × 3 olduğundan 6⁵ = (2 × 3)⁵ = 2⁵ × 3⁵.",
            "Tabanı asal çarpanlarına ayırın."
        ],
        [
            "8⁴ × 5¹² işleminin sonucu kaç basamaklıdır?",
            "13", "12", "14", "16",
            "8⁴ = (2³)⁴ = 2¹². Ardından 2¹² × 5¹² = 10¹² (1'in yanında 12 sıfır = 13 basamaklı).",
            "8'i 2³ olarak yazın."
        ]
    ]),

    "Üslü İfadelerde Bölme (Aynı Taban)": packQuiz("g8_ub", [
        [
            "5⁹ ÷ 5⁴ işleminin sonucu aşağıdakilerden hangisidir?",
            "5⁵", "5¹³", "1⁵", "5³⁶",
            "Aynı tabanda bölmede payın üssünden paydanın üssü çıkarılır: 5⁹⁻⁴ = 5⁵.",
            "Üsleri çıkarın."
        ],
        [
            "2⁵ ÷ 2⁻³ işleminin sonucu kaçtır?",
            "2⁸", "2²", "2⁻⁸", "2¹⁵",
            "5 − (−3) = 5 + 3 = 8 → 2⁸.",
            "Negatif üssü çıkarırken işaret artıya döner."
        ],
        [
            "3⁻² ÷ 3⁻⁶ işleminin değeri kaçtır?",
            "81", "1/81", "27", "9",
            "−2 − (−6) = −2 + 6 = 4 → 3⁴ = 81.",
            "−2 − (−6) = +4."
        ],
        [
            "2¹⁰ sayısının yarısı aşağıdakilerden hangisidir?",
            "2⁹", "2⁵", "1¹⁰", "2⁸",
            "Yarısı 2¹'e bölmektir: 2¹⁰ ÷ 2¹ = 2⁹.",
            "Yarıya bölmek 2¹'e bölmek demektir."
        ],
        [
            "27⁴ ÷ 9⁵ işleminin sonucu aşağıdakilerden hangisidir?",
            "9", "3", "27", "81",
            "27⁴ = (3³)⁴ = 3¹² ve 9⁵ = (3²)⁵ = 3¹⁰. 3¹² ÷ 3¹⁰ = 3² = 9.",
            "Her iki ifadeyi 3 tabanında yazın."
        ]
    ]),

    "Üssün Üssü": packQuiz("g8_uu", [
        [
            "(2³)⁵ işleminin sonucu aşağıdakilerden hangisidir?",
            "2¹⁵", "2⁸", "2²", "10³",
            "Üssün üssü alınırken üsler çarpılır: 2³·⁵ = 2¹⁵.",
            "Üsleri toplamayın, çarpın!"
        ],
        [
            "(3⁻²)⁴ ifadesi aşağıdakilerden hangisine eşittir?",
            "3⁻⁸", "3²", "3⁻⁶", "3⁸",
            "(3⁻²)⁴ = 3⁽⁻²⁾·⁴ = 3⁻⁸.",
            "(−2) × 4 = −8."
        ],
        [
            "16³ sayısı 2 tabanında aşağıdakilerden hangisine eşittir?",
            "2¹²", "2⁷", "2⁹", "2¹⁶",
            "16 = 2⁴ olduğundan 16³ = (2⁴)³ = 2¹².",
            "16'yı 2'nin kuvveti olarak yazın."
        ],
        [
            "((−2)²)³ işleminin sonucu kaçtır?",
            "+64", "-64", "+32", "-32",
            "(−2)² = +4 ve (+4)³ = +64.",
            "İçteki çift üs tabanı pozitif yapar."
        ],
        [
            "(5ˣ)³ = 5⁻¹² eşitliğinde x kaçtır?",
            "-4", "4", "-9", "-15",
            "3x = −12 → x = −4.",
            "3 ile kaçı çarparsak −12 eder?"
        ]
    ]),

    "Bilimsel Gösterim": packQuiz("g8_bg", [
        [
            "450 000 000 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?",
            "4,5 × 10⁸", "45 × 10⁷", "0,45 × 10⁹", "4,5 × 10⁷",
            "Virgül 8 basamak sola kaydırılır: 4,5 × 10⁸ (1 ≤ 4,5 < 10).",
            "Katsayı 1 ile 10 arasında olmalıdır."
        ],
        [
            "0,000032 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?",
            "3,2 × 10⁻⁵", "32 × 10⁻⁶", "3,2 × 10⁻⁴", "0,32 × 10⁻⁴",
            "Virgül 5 basamak sağa kaydırıldığı için 10'un kuvveti −5 olur: 3,2 × 10⁻⁵.",
            "Virgülü sağa kaydırırken üs azalır."
        ],
        [
            "Aşağıdakilerden hangisi bir bilimsel gösterim DEĞİLDİR?",
            "12,4 × 10⁵", "1 × 10⁻⁶", "9,99 × 10³", "3,5 × 10⁰",
            "Bilimsel gösterimde katsayı 10'dan küçük olmalıdır; 12,4 ≥ 10 olduğu için bilimsel gösterim değildir.",
            "1 ≤ |a| < 10 kuralını kontrol edin."
        ],
        [
            "64 × 10⁵ sayısının bilimsel gösterimi aşağıdakilerden hangisidir?",
            "6,4 × 10⁶", "6,4 × 10⁴", "0,64 × 10⁷", "6,4 × 10⁵",
            "64 sayısı 1 basamak küçülüp 6,4 olunca 10'un üssü 1 artar: 6,4 × 10⁶.",
            "Katsayı küçülürse üs büyür."
        ],
        [
            "0,08 × 10⁻³ sayısının bilimsel gösterimi aşağıdakilerden hangisidir?",
            "8 × 10⁻⁵", "8 × 10⁻¹", "0,8 × 10⁻⁴", "8 × 10⁻⁴",
            "0,08 sayısı 2 basamak büyüyüp 8 olunca üs 2 azalır: −3 − 2 = −5 → 8 × 10⁻⁵.",
            "Katsayı 2 basamak büyüdü, üs 2 azalmalı."
        ]
    ]),

    "Kareköklü İfadelerde Çarpma": packQuiz("g8_kic", [
        [
            "√3 × √12 işleminin sonucu kaçtır?",
            "6", "√15", "4", "12",
            "√3 × √12 = √(3 × 12) = √36 = 6.",
            "Kök içlerini çarpıp tam kareyi dışarı çıkarın."
        ],
        [
            "2√5 × 3√2 işleminin sonucu aşağıdakilerden hangisidir?",
            "6√10", "5√7", "6√7", "5√10",
            "Katsayılar: 2 × 3 = 6; kök içleri: √(5 × 2) = √10 → 6√10.",
            "Dıştaki dıştakiyle, içteki içtekiyle çarpılır."
        ],
        [
            "√8 × √2 işleminin sonucu kaçtır?",
            "4", "2√2", "8", "16",
            "√(8 × 2) = √16 = 4.",
            "8 × 2 = 16 tam kare sayıdır."
        ],
        [
            "3√6 × 2√6 işleminin sonucu kaçtır?",
            "36", "6√6", "12", "18",
            "3 × 2 = 6 ve √6 × √6 = 6 olduğundan 6 × 6 = 36.",
            "√a × √a = a özelliğini kullanın."
        ],
        [
            "Kenarları 2√3 cm ve 5√3 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "30 cm²", "10√3 cm²", "15 cm²", "20 cm²",
            "Alan = 2√3 × 5√3 = 10 × 3 = 30 cm².",
            "√3 × √3 = 3 eder."
        ]
    ]),

    "Kök Dışına Çıkarma": packQuiz("g8_kdc", [
        [
            "√75 ifadesinin a√b biçimindeki en sade yazılışı hangisidir?",
            "5√3", "3√5", "25√3", "15√5",
            "√75 = √(25 × 3) = 5√3.",
            "75'in içindeki en büyük tam kare çarpan 25'tir."
        ],
        [
            "√72 ifadesinin en sade a√b biçimi aşağıdakilerden hangisidir?",
            "6√2", "3√8", "2√18", "4√3",
            "√72 = √(36 × 2) = 6√2.",
            "72 = 36 × 2 şeklinde ayırın."
        ],
        [
            "4√5 sayısının katsayısı kök içine alınırsa hangi sayı elde edilir?",
            "√80", "√20", "√100", "√45",
            "Kök içine karesi alınarak girer: √(4² × 5) = √(16 × 5) = √80.",
            "Dışarıdaki sayının karesini kök içiyle çarpın."
        ],
        [
            "√108 = a√3 eşitliğinde a pozitif tam sayısı kaçtır?",
            "6", "9", "4", "12",
            "√108 = √(36 × 3) = 6√3 olduğundan a = 6.",
            "108 ÷ 3 = 36."
        ],
        [
            "√50 + √18 işleminin sonucu aşağıdakilerden hangisidir?",
            "8√2", "√68", "6√2", "7√2",
            "√50 = 5√2 ve √18 = 3√2 olduğundan 5√2 + 3√2 = 8√2.",
            "Önce her ikisini a√2 biçiminde yazın."
        ]
    ]),

    "Tam Kare Özdeşliği (Toplam)": packQuiz("g8_tkt", [
        [
            "(x + 5)² ifadesinin açılımı aşağıdakilerden hangisidir?",
            "x² + 10x + 25", "x² + 25", "x² + 5x + 25", "x² + 10x + 10",
            "(x + 5)² = x² + 2·x·5 + 5² = x² + 10x + 25.",
            "Ortadaki 2ab terimini unutmayın!"
        ],
        [
            "(2a + 3)² ifadesinin açılımı aşağıdakilerden hangisidir?",
            "4a² + 12a + 9", "2a² + 12a + 9", "4a² + 6a + 9", "4a² + 9",
            "(2a)² + 2·(2a)·3 + 3² = 4a² + 12a + 9.",
            "(2a)² = 4a² olduğuna dikkat edin."
        ],
        [
            "x² + 14x + k ifadesi bir tam kare özdeşliği olduğuna göre k kaçtır?",
            "49", "14", "28", "64",
            "2ab = 14x → b = 7 → k = 7² = 49.",
            "x'in katsayısının yarısının karesini alın."
        ],
        [
            "a + b = 9 ve a·b = 14 olduğuna göre a² + b² kaçtır?",
            "53", "81", "67", "39",
            "(a + b)² = a² + 2ab + b² → 81 = a² + b² + 28 → a² + b² = 53.",
            "(a + b)² açılımında verilenleri yerine yazın."
        ],
        [
            "Bir kenarı (x + 4) cm olan karenin alanını veren cebirsel ifade hangisidir?",
            "x² + 8x + 16", "4x + 16", "x² + 16", "x² + 4x + 16",
            "Alan = (x + 4)² = x² + 8x + 16.",
            "Karenin alanı kenarın karesidir."
        ]
    ]),

    "Tam Kare Özdeşliği (Fark)": packQuiz("g8_tkf", [
        [
            "(x − 6)² ifadesinin açılımı aşağıdakilerden hangisidir?",
            "x² − 12x + 36", "x² − 36", "x² − 12x − 36", "x² − 6x + 36",
            "(x − 6)² = x² − 2·x·6 + 6² = x² − 12x + 36.",
            "Son terim (+b²) daima pozitiftir."
        ],
        [
            "(3x − 2)² ifadesinin açılımı aşağıdakilerden hangisidir?",
            "9x² − 12x + 4", "9x² − 6x + 4", "3x² − 12x + 4", "9x² − 4",
            "(3x)² − 2·(3x)·2 + 2² = 9x² − 12x + 4.",
            "Ortadaki terim −2 × 3x × 2 = −12x."
        ],
        [
            "4x² − 20x + 25 ifadesinin çarpanlara ayrılmış hâli hangisidir?",
            "(2x − 5)²", "(4x − 5)²", "(2x + 5)²", "(2x − 25)²",
            "4x² = (2x)², 25 = 5² ve −2·(2x)·5 = −20x olduğundan (2x − 5)².",
            "Baştaki ve sondaki karelerin köklerini alın."
        ],
        [
            "a − b = 6 ve a·b = 10 olduğuna göre a² + b² kaçtır?",
            "56", "36", "16", "46",
            "(a − b)² = a² − 2ab + b² → 36 = a² + b² − 20 → a² + b² = 56.",
            "36 + 2·10 = 56."
        ],
        [
            "Bir kenarı x cm olan karenin her kenarı 3 cm kısaltılırsa yeni karenin alanı kaç cm² olur?",
            "x² − 6x + 9", "x² − 9", "x² − 3x + 9", "x² − 6x − 9",
            "Yeni kenar (x − 3) cm → Alan = (x − 3)² = x² − 6x + 9.",
            "(x − 3)² açılımını yapın."
        ]
    ]),

    "İki Kare Farkı Özdeşliği": packQuiz("g8_ikf", [
        [
            "x² − 49 ifadesinin çarpanlara ayrılmış biçimi aşağıdakilerden hangisidir?",
            "(x − 7)(x + 7)", "(x − 7)²", "(x − 49)(x + 1)", "(x + 7)²",
            "x² − 7² = (x − 7)(x + 7).",
            "a² − b² = (a − b)(a + b)"
        ],
        [
            "9a² − 16b² ifadesi aşağıdakilerden hangisine eşittir?",
            "(3a − 4b)(3a + 4b)", "(9a − 16b)(9a + 16b)", "(3a − 4b)²", "(3a − 8b)(3a + 8b)",
            "9a² = (3a)² ve 16b² = (4b)² → (3a − 4b)(3a + 4b).",
            "Katsayıların da karekökünü almayı unutmayın."
        ],
        [
            "53² − 47² işleminin sonucu kaçtır?",
            "600", "36", "500", "640",
            "53² − 47² = (53 − 47)(53 + 47) = 6 × 100 = 600.",
            "Kare almadan (a − b)(a + b) formülünü kullanın."
        ],
        [
            "x − y = 4 ve x + y = 11 olduğuna göre x² − y² kaçtır?",
            "44", "15", "105", "28",
            "x² − y² = (x − y)(x + y) = 4 × 11 = 44.",
            "Verilen iki ifadeyi çarpın."
        ],
        [
            "Bir kenarı a cm olan kareden bir kenarı b cm olan küçük kare kesilip çıkarılırsa kalan alan hangi özdeşlikle ifade edilir?",
            "(a − b)(a + b)", "(a − b)²", "a² + b²", "2(a − b)",
            "Kalan alan = a² − b² = (a − b)(a + b).",
            "Büyük karenin alanından küçük karenin alanını çıkarın."
        ]
    ]),

    "Eğim": packQuiz("g8_egim", [
        [
            "Dikey uzunluğu 6 m ve yatay uzunluğu 15 m olan bir rampanın eğimi yüzde kaçtır?",
            "%40", "%60", "%25", "%45",
            "m = 6/15 = 2/5 = 40/100 = %40.",
            "Dikey ÷ Yatay oranını sadeleştirip paydayı 100 yapın."
        ],
        [
            "y = 4x − 7 doğrusunun eğimi kaçtır?",
            "4", "-7", "7", "-4",
            "y = mx + n biçiminde x'in katsayısı eğimdir: m = 4.",
            "y yalnızken x'in önündeki sayı eğimdir."
        ],
        [
            "2y − 6x + 8 = 0 doğrusunun eğimi kaçtır?",
            "3", "-6", "-3", "6",
            "2y = 6x − 8 → y = 3x − 4 olduğundan eğim m = 3.",
            "Önce y'yi yalnız bırakın."
        ],
        [
            "A(1, 2) ve B(4, 11) noktalarından geçen doğrunun eğimi kaçtır?",
            "3", "2", "4", "1/3",
            "m = (11 − 2) / (4 − 1) = 9 / 3 = 3.",
            "m = (y₂ − y₁) / (x₂ − x₁)"
        ],
        [
            "Eğimi 3/4 ve yatay uzunluğu 12 m olan bir merdivenin çıktığı dikey yükseklik kaç metredir?",
            "9 m", "16 m", "8 m", "6 m",
            "Dikey / 12 = 3/4 → Dikey = (12 × 3) ÷ 4 = 9 m.",
            "Orantı kurarak dikey uzunluğu bulun."
        ]
    ]),

    "Pisagor Bağıntısı": packQuiz("g8_pis", [
        [
            "Dik kenarları 6 cm ve 8 cm olan dik üçgenin hipotenüs uzunluğu kaç cm'dir?",
            "10 cm", "14 cm", "12 cm", "9 cm",
            "6² + 8² = 36 + 64 = 100 → c = √100 = 10 cm (3-4-5 üçgeninin 2 katı).",
            "a² + b² = c²"
        ],
        [
            "Hipotenüsü 13 cm ve bir dik kenarı 5 cm olan dik üçgenin diğer dik kenarı kaç cm'dir?",
            "12 cm", "8 cm", "10 cm", "9 cm",
            "5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12 cm.",
            "5-12-13 özel dik üçgenini hatırlayın."
        ],
        [
            "Dik kenarları 8 cm ve 15 cm olan dik üçgenin hipotenüsü kaç cm'dir?",
            "17 cm", "16 cm", "19 cm", "23 cm",
            "8² + 15² = 64 + 225 = 289 → c = √289 = 17 cm.",
            "8-15-17 özel dik üçgeni."
        ],
        [
            "Kenar uzunlukları 5 cm ve 12 cm olan bir dikdörtgenin köşegen uzunluğu kaç cm'dir?",
            "13 cm", "17 cm", "14 cm", "11 cm",
            "Köşegen dik üçgenin hipotenüsüdür: 5² + 12² = 169 → 13 cm.",
            "Dikdörtgenin köşegeni iki dik üçgen oluşturur."
        ],
        [
            "Dik kenarları 4 cm ve 6 cm olan dik üçgenin hipotenüs uzunluğu aşağıdakilerden hangisidir?",
            "2√13 cm", "10 cm", "√20 cm", "4√3 cm",
            "4² + 6² = 16 + 36 = 52 → c = √52 = √(4 × 13) = 2√13 cm.",
            "√52 sayısını a√b şeklinde yazın."
        ]
    ]),

    "Silindirin Hacmi ve Yüzey Alanı": packQuiz("g8_sil", [
        [
            "Taban yarıçapı 3 cm ve yüksekliği 10 cm olan dik dairesel silindirin hacmi kaç cm³'tür? (π = 3 alınız)",
            "270 cm³", "90 cm³", "180 cm³", "300 cm³",
            "Hacim = π × r² × h = 3 × 3² × 10 = 3 × 9 × 10 = 270 cm³.",
            "Taban alanı (πr²) ile yüksekliği çarpın."
        ],
        [
            "Taban yarıçapı 2 cm, yüksekliği 5 cm olan silindirin yanal alanı kaç cm²'dir? (π = 3 alınız)",
            "60 cm²", "84 cm²", "30 cm²", "48 cm²",
            "Yanal Alan = 2 × π × r × h = 2 × 3 × 2 × 5 = 60 cm².",
            "Yanal yüz taban çevresi × yükseklik dikdörtgenidir."
        ],
        [
            "Taban yarıçapı 2 cm ve yüksekliği 5 cm olan kapalı silindirin toplam yüzey alanı kaç cm²'dir? (π = 3 alınız)",
            "84 cm²", "60 cm²", "72 cm²", "96 cm²",
            "2 taban = 2 × 3 × 2² = 24 cm²; yanal = 60 cm². Toplam = 24 + 60 = 84 cm².",
            "Yüzey Alanı = 2πr² + 2πrh."
        ],
        [
            "Hacmi 375 cm³ ve yüksekliği 5 cm olan dik silindirin taban yarıçapı kaç cm'dir? (π = 3 alınız)",
            "5 cm", "4 cm", "6 cm", "25 cm",
            "3 × r² × 5 = 375 → 15r² = 375 → r² = 25 → r = 5 cm.",
            "Hacmi π × h (yani 15)'e bölerek r²'yi bulun."
        ],
        [
            "Taban yarıçapı 2 katına çıkarılıp yüksekliği sabit tutulan bir silindirin hacmi kaç katına çıkar?",
            "4 katına", "2 katına", "8 katına", "6 katına",
            "Yeni hacim = π(2r)²h = 4πr²h olduğundan 4 katına çıkar.",
            "Hacim formülünde r'nin karesi alınır."
        ]
    ]),

    "Basit Olayların Olma Olasılığı": packQuiz("g8_bol", [
        [
            "Bir torbada 4 sarı, 5 kırmızı ve 3 mavi özdeş top vardır. Rastgele çekilen bir topun mavi olma olasılığı kaçtır?",
            "1/4", "1/3", "3/10", "5/12",
            "Toplam 4 + 5 + 3 = 12 top vardır. Mavi = 3/12 = 1/4.",
            "İstenen durum ÷ Tüm durumlar."
        ],
        [
            "Hilesiz bir zar atıldığında üst yüze asal sayı gelme olasılığı kaçtır?",
            "1/2", "1/3", "2/3", "1/6",
            "Zardaki asal sayılar 2, 3, 5 (3 adet). Olasılık = 3/6 = 1/2.",
            "1 sayısı asal değildir; asallar 2, 3, 5'tir."
        ],
        [
            "“MATEMATİK” kelimesinin harfleri eş kartlara yazılıp torbaya atılıyor. Rastgele çekilen kartın A harfi olma olasılığı kaçtır?",
            "2/9", "1/9", "2/8", "3/9",
            "Toplam 9 harf vardır ve bunların 2'si A'dır: 2/9.",
            "Kelimedeki toplam harf sayısını dikkatle sayın."
        ],
        [
            "Bir olayın olma olasılığı 3/8 ise olmama olasılığı kaçtır?",
            "5/8", "3/8", "1/8", "7/8",
            "Olma ve olmama olasılıkları toplamı 1'dir: 1 − 3/8 = 5/8.",
            "P(A) + P(A') = 1."
        ],
        [
            "1'den 20'ye kadar numaralanmış 20 kart arasından rastgele seçilen kartın tam kare sayı olma olasılığı kaçtır?",
            "1/5", "1/4", "3/20", "1/10",
            "1 ile 20 arasındaki tam kareler: 1, 4, 9, 16 (4 adet). Olasılık = 4/20 = 1/5.",
            "1'in de tam kare (1² = 1) olduğunu unutmayın."
        ]
    ])
};

export const getFormulaQuiz = (formulaTitle: string): FormulaQuizQuestion[] => {
    return FORMULA_QUIZZES[formulaTitle] || [];
};
