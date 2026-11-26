export interface MindMapStep {
    stepNo: number;
    title: string;
    formula: string;
    points: string[];
}

export interface TopicMindMap {
    id: string;
    grade: 5 | 6 | 7 | 8;
    area: string;
    topic: string;
    subtitle: string;
    accent: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'sky';
    coreRule: string;
    steps: [MindMapStep, MindMapStep, MindMapStep, MindMapStep];
    workedExample: {
        question: string;
        solution: string;
    };
    criticalTip: string;
    quickCheck: {
        question: string;
        answer: string;
        hint: string;
    };
}

export const MIT_MIND_MAPS: Record<5 | 6 | 7 | 8, TopicMindMap[]> = {
    5: [
        {
            id: 'g5_sn1',
            grade: 5,
            area: 'Sayılar ve Nicelikler',
            topic: 'Sayılar ve Nicelikler (1)',
            subtitle: 'Çok Basamaklı Doğal Sayılar, Bölükler ve Dört İşlem',
            accent: 'indigo',
            coreRule: 'Milyonlar Bölüğü | Binler Bölüğü | Birler Bölüğü — Her bölük 3 basamaktan oluşur.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Bölük & Basamak Okuma',
                    formula: 'XXX . XXX . XXX',
                    points: ['Sağdan sola 3’erli bölük ayır', 'Basamak değeri = Rakam × Basamak']
                },
                {
                    stepNo: 2,
                    title: 'Yuvarlama & Tahmin',
                    formula: '0–4 Aşağı | 5–9 Yukarı',
                    points: ['İstenen basamağın sağına bak', 'Sonucu işlem öncesi tahmin et']
                },
                {
                    stepNo: 3,
                    title: 'Dört İşlem & Kalanlı Bölme',
                    formula: 'Bölünen = Bölen × Bölüm + Kalan',
                    points: ['Kalan < Bölen her zaman geçerlidir', 'Bölmede kalan problemde yorumlanır']
                },
                {
                    stepNo: 4,
                    title: 'Kare ve Küp (Üslü Gösterim)',
                    formula: 'a² = a × a  |  a³ = a × a × a',
                    points: ['Üs 2: karesi, Üs 3: küpü', 'Tekrarlı çarpımın kısa yazımıdır']
                }
            ],
            workedExample: {
                question: '4.308.050 sayısında binler bölüğündeki rakamların toplamı ile 5² nin toplamı kaçtır?',
                solution: 'Binler bölüğü: 308 (3+0+8 = 11). 5² = 25 ⇒ 11 + 25 = 36.'
            },
            criticalTip: 'Sayı değeri rakamın kendisidir; basamak değeri ise bulunduğu yerle (10, 100, 1.000...) çarpımıdır.',
            quickCheck: {
                question: '3³ + 4² işleminin sonucu kaçtır?',
                answer: '43',
                hint: '3³ = 27 ve 4² = 16 dır; ikisini topla.'
            }
        },
        {
            id: 'g5_sn2',
            grade: 5,
            area: 'Sayılar ve Nicelikler',
            topic: 'Sayılar ve Nicelikler (2)',
            subtitle: 'Kesirler, Ondalık Gösterim ve Yüzdeler Arası Geçiş',
            accent: 'emerald',
            coreRule: 'Kesir ↔ Ondalık ↔ Yüzde aynı çokluğun üç farklı gösterimidir (1/4 = 0,25 = %25).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Kesir Çeşitleri & Denklik',
                    formula: 'a/b = (a×k)/(b×k)',
                    points: ['Birim kesirde payda büyüdükçe kesir küçülür', 'Genişletme ve sadeleştirme değeri değiştirmez']
                },
                {
                    stepNo: 2,
                    title: 'Kesirlerle Toplama-Çıkarma',
                    formula: 'Paydalar eşitlenir → Paylar işlenir',
                    points: ['Paydası küçük olan genişletilir', 'Tam sayılı kesirler bileşiğe çevrilebilir']
                },
                {
                    stepNo: 3,
                    title: 'Ondalık Gösterim',
                    formula: 'Payda 10, 100, 1000 yapılır',
                    points: ['Toplama/çıkarmada virgüller alt alta gelir', 'Sondaki sıfır ondalık değeri değiştirmez']
                },
                {
                    stepNo: 4,
                    title: 'Yüzde Hesaplama',
                    formula: '%a = a/100',
                    points: ['Çokluğun %a sı = (Sayı ÷ 100) × a', 'İndirim çıkarılır, zam eklenir']
                }
            ],
            workedExample: {
                question: '3/5 kesrini ondalık ve yüzde olarak yazıp 200 ün o kadarını bulalım.',
                solution: '3/5 = 60/100 = 0,60 = %60. 200 ün %60 ı = (200÷100)×60 = 120.'
            },
            criticalTip: 'Ondalık sayıları karşılaştırırken önce tam kısımlara, eşitse soldan sağa onda birler ve yüzde birler basamağına bak.',
            quickCheck: {
                question: '3/4 kesrinin yüzde (%) gösterimi nedir? (Sadece sayı yaz, örn: 75)',
                answer: '75',
                hint: 'Paydayı 25 ile genişletip 100 yap.'
            }
        },
        {
            id: 'g5_cd',
            grade: 5,
            area: 'Cebirsel Düşünme',
            topic: 'İşlemlerle Cebirsel Düşünme',
            subtitle: 'Eşitliğin Korunumu, İşlem Önceliği, Örüntü ve Algoritma',
            accent: 'violet',
            coreRule: 'Eşitliğin iki tarafı terazi kefesi gibidir; iki tarafa aynı işlem yapılırsa denge korunur.',
            steps: [
                {
                    stepNo: 1,
                    title: 'İşlem Önceliği Sırası',
                    formula: '1. Üslü → 2. Parantez → 3. ×,÷ → 4. +,−',
                    points: ['Eş öncelikte soldan sağa ilerle', 'Parantez her zaman önce hesaplanır']
                },
                {
                    stepNo: 2,
                    title: 'Eşitliğin Korunumu',
                    formula: '▲ + 5 = 12 ⇒ ▲ = 12 − 5 = 7',
                    points: ['Verilmeyeni bulmak için ters işlem yap', 'Toplama↔Çıkarma, Çarpma↔Bölme']
                },
                {
                    stepNo: 3,
                    title: 'Sayı & Şekil Örüntüleri',
                    formula: 'Artış miktarı sabit → Kuralı bul',
                    points: ['Ardışık terimler arasındaki farkı bul', 'İstenen adımı kuralla hesapla']
                },
                {
                    stepNo: 4,
                    title: 'Akış Şeması & Algoritma',
                    formula: 'Girdi → İşlem Adımı → Çıktı',
                    points: ['Adımları sırayla ve koşula göre izle', 'Çıktıdan geriye ters işlemle girdi bul']
                }
            ],
            workedExample: {
                question: '4 + 3 × (8 − 2²) işleminin sonucu kaçtır?',
                solution: 'Önce üs: 2²=4 → parantez: 8−4=4 → çarpma: 3×4=12 → toplama: 4+12 = 16.'
            },
            criticalTip: 'Toplama ile çarpma yan yana olduğunda soldan başlama; mutlaka önce çarpma veya bölmeyi yap!',
            quickCheck: {
                question: '20 − 3 × 5 işleminin sonucu kaçtır?',
                answer: '5',
                hint: 'Önce 3 × 5 = 15, sonra 20 − 15.'
            }
        },
        {
            id: 'g5_gs',
            grade: 5,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Şekiller',
            subtitle: 'Temel Kavramlar, Doğrular, Açılar, Üçgen ve Dörtgenler',
            accent: 'sky',
            coreRule: 'Üçgenin iç açıları toplamı 180°, dörtgenin iç açıları toplamı 360° dir.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Nokta, Doğru, Işın, Parça',
                    formula: '• A  |  ⟷ AB  |  [AB  |  [AB]',
                    points: ['Doğru iki yöne, ışın tek yöne sonsuzdur', 'Yalnızca doğru parçasının uzunluğu ölçülür']
                },
                {
                    stepNo: 2,
                    title: 'Doğrular & Açı Çeşitleri',
                    formula: 'Dar (<90°) | Dik (90°) | Geniş (90°–180°)',
                    points: ['Paralel (//) kesişmez, dik (⊥) 90° kesişir', 'Doğru açı 180°, tam açı 360° dir']
                },
                {
                    stepNo: 3,
                    title: 'Üçgen Çeşitleri & İnşası',
                    formula: 'Kenar: Eşkenar / İkizkenar / Çeşitkenar',
                    points: ['Pergelle aynı yarıçap eşkenar üçgen çizer', 'Bir üçgende en fazla 1 dik veya geniş açı olur']
                },
                {
                    stepNo: 4,
                    title: 'Dörtgenlerin Özellikleri',
                    formula: 'İç Açılar Toplamı = 360°',
                    points: ['Kare, dikdörtgen, paralelkenar, eşkenar dörtgen, yamuk', 'Karşılıklı kenar ve köşegen özelliklerini bil']
                }
            ],
            workedExample: {
                question: 'İki açısı 55° ve 75° olan üçgenin 3. açısı kaç derecedir ve üçgen açılarına göre nedir?',
                solution: '180° − (55° + 75°) = 50°. Tüm açıları 90° den küçük olduğu için dar açılı üçgendir.'
            },
            criticalTip: 'Dikdörtgenin köşegenleri eşittir ama dik kesişmez; karenin ve eşkenar dörtgenin köşegenleri dik kesişir.',
            quickCheck: {
                question: 'Bir dörtgenin üç açısı 90°, 100° ve 80° ise dördüncü açısı kaç derecedir?',
                answer: '90',
                hint: '360 − (90 + 100 + 80).'
            }
        },
        {
            id: 'g5_gn',
            grade: 5,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Nicelikler',
            subtitle: 'Çevre Uzunluğu ve Dikdörtgen/Kare Alan Hesabı',
            accent: 'emerald',
            coreRule: 'Çevre şeklin dış kenarları toplamı (cm), Alan şeklin kapladığı yüzeydir (cm²).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Çevre Uzunluğu',
                    formula: 'Ç_dikdörtgen = 2×(a+b) | Ç_kare = 4×a',
                    points: ['Tüm dış kenar uzunluklarını topla', 'Birimleri (m, cm, mm) önce eşitle']
                },
                {
                    stepNo: 2,
                    title: 'Birim Kare ile Alan',
                    formula: 'Alan = Satır × Sütun',
                    points: ['İçindeki 1×1 lik birim kare sayısıdır', 'Alan birimi kareli (cm², m²) yazılır']
                },
                {
                    stepNo: 3,
                    title: 'Dikdörtgen & Kare Alanı',
                    formula: 'A = a × b  |  A_kare = a × a',
                    points: ['Alanı ve bir kenarı verilince bölme ile diğer kenar bulunur', 'Bileşik şekilleri dikdörtgenlere böl']
                },
                {
                    stepNo: 4,
                    title: 'Alan–Çevre İlişkisi',
                    formula: 'Eşit çevre → Karede alan EN BÜYÜK',
                    points: ['Aynı alana sahip farklı çevreler olabilir', 'Kenarlar birbirine yaklaştıkça alan büyür']
                }
            ],
            workedExample: {
                question: 'Çevresi 24 cm olan bir karenin alanı kaç cm² dir?',
                solution: 'Bir kenar = 24 ÷ 4 = 6 cm ⇒ Alan = 6 × 6 = 36 cm².'
            },
            criticalTip: 'Alan ve çevreyi karıştırma: Bahçeye tel çekmek ÇEVRE, çim ekmek veya parke döşemek ALAN hesabıdır.',
            quickCheck: {
                question: 'Kenarları 6 cm ve 9 cm olan dikdörtgenin alanı kaç cm² dir?',
                answer: '54',
                hint: 'Kısa kenar × Uzun kenar = 6 × 9.'
            }
        },
        {
            id: 'g5_ia',
            grade: 5,
            area: 'Veri İşleme ve Olasılık',
            topic: 'İstatistiksel Araştırma Süreci',
            subtitle: 'Araştırma Sorusu, Veri Toplama, Sıklık/Çetele ve Sütun Grafiği',
            accent: 'amber',
            coreRule: '1. Araştırma Sorusu → 2. Veri Toplama → 3. Tablo/Grafik → 4. Yorumlama ve Sonuç.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Araştırma Sorusu Belirleme',
                    formula: 'Grup + Değişkenlik = Geçerli Soru',
                    points: ['Tek kişiye değil bir gruba sorulmalı', 'Farklı yanıtlar (veri çeşitliliği) üretmeli']
                },
                {
                    stepNo: 2,
                    title: 'Veri Toplama & Düzenleme',
                    formula: 'Çetele (||||) → Sıklık Tablosu (Sayı)',
                    points: ['Anket veya gözlemle tarafsız veri topla', '5 li çizgi gruplarıyla sayımı kolaylaştır']
                },
                {
                    stepNo: 3,
                    title: 'Sütun & Nokta Grafiği',
                    formula: 'Yatay: Kategoriler | Dikey: Sıklık',
                    points: ['Eksen aralıkları eşit ölçekli olmalı', 'Grafik başlığı ve eksen adları yazılmalı']
                },
                {
                    stepNo: 4,
                    title: 'Veri Yorumlama',
                    formula: 'En Çok / En Az / Toplam / Fark',
                    points: ['Sütun yüksekliklerini karşılaştır', 'Veriye dayanarak karar ve öneri üret']
                }
            ],
            workedExample: {
                question: 'Sütun grafiğinde Roman 18, Masal 12, Bilim 15 kitap gösteriyorsa toplam kitap sayısı ve en çok-en az farkı nedir?',
                solution: 'Toplam = 18 + 12 + 15 = 45 kitap. Fark = 18 − 12 = 6 kitap.'
            },
            criticalTip: 'Grafik okurken dikey eksenin sıfırdan başlayıp başlamadığını ve kaçar kaçar arttığını mutlaka kontrol et.',
            quickCheck: {
                question: '“Ali’nin boyu kaç cm dir?” istatistiksel araştırma sorusu mudur? (Evet / Hayır)',
                answer: 'Hayır',
                hint: 'Tek kişiye sorulduğu için veri çeşitliliği üretmez.'
            }
        },
        {
            id: 'g5_vo',
            grade: 5,
            area: 'Veri İşleme ve Olasılık',
            topic: 'Veriden Olasılığa',
            subtitle: 'Olayların Olma Olasılığı: İmkânsızdan Kesine Olasılık Ölçeği',
            accent: 'rose',
            coreRule: 'Her olayın gerçekleşme olasılığı 0 (İmkânsız) ile 1 (Kesin) arasındadır.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Deney ve Olası Durumlar',
                    formula: 'Zar: {1,2,3,4,5,6} | Para: {Y, T}',
                    points: ['Sonucu önceden bilinmeyen eylem deneydir', 'Çıkabilecek her sonuç bir çıktıdır']
                },
                {
                    stepNo: 2,
                    title: 'Olasılık Skalası (0 – 1)',
                    formula: 'İmkânsız(0) < Az < Eşit(1/2) < Çok < Kesin(1)',
                    points: ['Asla olmayacak olay → İmkânsız (0)', 'Her zaman olacak olay → Kesin (1)']
                },
                {
                    stepNo: 3,
                    title: 'Olasılık Karşılaştırma',
                    formula: 'Sayısı çok olanın çıkma şansı fazladır',
                    points: ['Aynı sayıda olanlar eş olasılıklıdır', 'Farklı renklerin adetlerini kıyasla']
                },
                {
                    stepNo: 4,
                    title: 'Basit Olasılık Değeri',
                    formula: 'P = İstenen Durum ÷ Tüm Durumlar',
                    points: ['Pay her zaman paydadan küçük veya eşittir', 'Olasılık 1 den büyük veya negatif olamaz']
                }
            ],
            workedExample: {
                question: '4 kırmızı, 4 mavi, 2 sarı top bulunan torbadan hangi rengin gelmesi daha az olasıdır?',
                solution: 'Sarı (2 adet) en az olduğu için daha az olasıdır; kırmızı ve mavi eş olasılıklıdır.'
            },
            criticalTip: 'Bir zar atıldığında 7 gelmesi İMKÂNSIZ (0), 7 den küçük doğal sayı gelmesi KESİN (1) olaydır.',
            quickCheck: {
                question: 'Bir para atıldığında yazı gelme olasılığı kesir olarak kaçtır? (Örn: 1/2)',
                answer: '1/2',
                hint: '2 olası durumdan 1 tanesi yazıdır.'
            }
        }
    ],

    6: [
        {
            id: 'g6_sn1',
            grade: 6,
            area: 'Sayılar ve Nicelikler',
            topic: 'Sayılar ve Nicelikler (1)',
            subtitle: 'Çarpanlar, Katlar, Bölünebilme Kuralları ve Asal Sayılar',
            accent: 'indigo',
            coreRule: 'Her doğal sayı asal çarpanların çarpımıdır; bölünebilme kuralları bölmeyi hızlandırır.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Çarpanlar & Katlar',
                    formula: 'a × b = N ⇒ a ve b, N nin çarpanıdır',
                    points: ['1 her sayının çarpanıdır', 'Bir sayının en büyük çarpanı kendisidir']
                },
                {
                    stepNo: 2,
                    title: 'Bölünebilme Kuralları',
                    formula: '2, 3, 4, 5, 6, 9, 10 kuralları',
                    points: ['2/5/10: son basamak; 4: son iki basamak', '3 ve 9: rakamlar toplamı; 6: hem 2 hem 3']
                },
                {
                    stepNo: 3,
                    title: 'Asal Sayılar & Çarpan Ağacı',
                    formula: 'Asallar: 2, 3, 5, 7, 11, 13, 17, 19...',
                    points: ['1 asal değildir; 2 tek çift asal sayıdır', 'Bölen listesiyle asal çarpanları bul']
                },
                {
                    stepNo: 4,
                    title: 'Ortak Bölen & Ortak Kat',
                    formula: 'Ortak bölenler ≤ küçük sayı ≤ ortak katlar',
                    points: ['İki sayının ortak bölen ve katlarını listele', 'Paylaşım (bölen) ve birleşim (kat) problemleri']
                }
            ],
            workedExample: {
                question: '3A4 sayısı 9 ile tam bölünebildiğine göre A rakamı kaçtır?',
                solution: '3 + A + 4 = 7 + A sayısı 9 un katı olmalı ⇒ 7 + A = 9 ⇒ A = 2.'
            },
            criticalTip: 'En küçük asal sayı 1 değil 2 dir! 6 ile bölünebilme için sayının HEM çift HEM rakamlar toplamının 3 ün katı olması şarttır.',
            quickCheck: {
                question: '36 sayısının kaç tane farklı asal çarpanı vardır?',
                answer: '2',
                hint: '36 = 2 × 2 × 3 × 3 (sadece 2 ve 3).'
            }
        },
        {
            id: 'g6_sn2',
            grade: 6,
            area: 'Sayılar ve Nicelikler',
            topic: 'Sayılar ve Nicelikler (2)',
            subtitle: 'Kesirlerle Çarpma-Bölme ve Ondalık Gösterimle Dört İşlem',
            accent: 'emerald',
            coreRule: 'Kesirde çarpma: pay×pay / payda×payda; bölme: birinci aynen, ikinci ters çevrilip çarpılır.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Kesirlerle Çarpma',
                    formula: '(a/b) × (c/d) = (a×c) / (b×d)',
                    points: ['Tam sayılı kesri önce bileşiğe çevir', 'Çarpmadan önce çapraz sadeleştirme yap']
                },
                {
                    stepNo: 2,
                    title: 'Kesirlerle Bölme',
                    formula: '(a/b) ÷ (c/d) = (a/b) × (d/c)',
                    points: ['İkinci kesri ters çevirip çarp', 'Doğal sayının gizli paydası 1 dir']
                },
                {
                    stepNo: 3,
                    title: 'Ondalık Çarpma & Bölme',
                    formula: 'Virgülsüz çarp → toplam basamak kaydır',
                    points: ['10, 100, 1000 ile çarpmada virgül sağa kayar', 'Ondalık bölmede böleni virgülden kurtar']
                },
                {
                    stepNo: 4,
                    title: 'Çok Adımlı Problemler',
                    formula: 'Kesrin kesri = İki kesrin çarpımı',
                    points: ['“Kalanın 1/3 ü” ifadesine dikkat et', 'Sonucu tahmin ederek kontrol et']
                }
            ],
            workedExample: {
                question: '(3/4) ÷ (3/8) işleminin sonucu kaçtır?',
                solution: '(3/4) × (8/3) = 24/12 = 2.'
            },
            criticalTip: 'Bir sayıyı 1 den küçük pozitif bir kesre böldüğünde sonuç BÜYÜR (Örn: 6 ÷ 1/2 = 12).',
            quickCheck: {
                question: '2,4 ÷ 0,6 işleminin sonucu kaçtır?',
                answer: '4',
                hint: 'Her iki sayıyı 10 ile genişlet: 24 ÷ 6.'
            }
        },
        {
            id: 'g6_cd',
            grade: 6,
            area: 'Cebirsel Düşünme',
            topic: 'İşlemlerle Cebirsel Düşünme ve Değişimler',
            subtitle: 'Üslü Nicelikler, Cebirsel İfadeler, Terim-Katsayı ve Oran',
            accent: 'violet',
            coreRule: 'Cebirsel ifade en az bir değişken (x, n, a) ve işlem içerir; oran iki çokluğun bölümüdür.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Doğal Sayının Üssü & Öncelik',
                    formula: 'aⁿ = a × a × ... × a  (a⁰ = 1, a≠0)',
                    points: ['Üs, tabanın kaç kez çarpılacağını söyler', 'Dağılma özelliği: a×(b+c) = a×b + a×c']
                },
                {
                    stepNo: 2,
                    title: 'Sözelden Cebirsele',
                    formula: '“3 katının 5 fazlası” → 3x + 5',
                    points: ['Önce söylenen işlem önce yazılır', '“5 fazlasının 3 katı” → 3(x + 5)']
                },
                {
                    stepNo: 3,
                    title: 'Terim, Katsayı & Değer Bulma',
                    formula: '4x − 7: Terimler 4x, −7 | Sabit: −7',
                    points: ['Değişken yerine verilen sayıyı yaz', 'Benzer terimlerin katsayılarını topla']
                },
                {
                    stepNo: 4,
                    title: 'Örüntü & Oran İlişkisi',
                    formula: 'Genel terim: a·n + b | Oran: x / y',
                    points: ['Aynı birimli oran birimsiz, farklı birimli birimlidir', 'm/sn ↔ km/sa dönüşümünde birimlere dikkat et']
                }
            ],
            workedExample: {
                question: '5x − 3 cebirsel ifadesinin x = 4 için değeri kaçtır?',
                solution: '5 × 4 − 3 = 20 − 3 = 17.'
            },
            criticalTip: 'Sabit terimi ve katsayıyı belirlerken önündeki eksi (−) işaretini mutlaka birlikte al! (Örn: 3x − 8 de sabit terim −8 dir).',
            quickCheck: {
                question: '2x + 9 ifadesinin x = 6 için değeri kaçtır?',
                answer: '21',
                hint: '2 × 6 + 9.'
            }
        },
        {
            id: 'g6_gs',
            grade: 6,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Şekiller',
            subtitle: 'Komşu, Tümler, Bütünler ve Ters Açılar ile Açı İlişkileri',
            accent: 'sky',
            coreRule: 'Tümler açılar toplamı 90°, Bütünler açılar toplamı 180°, Ters açılar birbirine eşittir.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Açıyı Adlandırma & Eş Açı',
                    formula: 'm(AÔB) = m(BÔA) = m(Ô)',
                    points: ['Köşe harfi her zaman ortaya yazılır', 'Eş açıların ölçüleri eşittir']
                },
                {
                    stepNo: 2,
                    title: 'Komşu & Tümler Açılar',
                    formula: 'α + β = 90°  (Tümler)',
                    points: ['Komşu açıların köşesi ve bir ışını ortaktır', 'x derecenin tümleri 90° − x tir']
                },
                {
                    stepNo: 3,
                    title: 'Bütünler Açılar',
                    formula: 'α + β = 180°  (Bütünler)',
                    points: ['Doğru açı oluşturan komşu açılar bütünlerdir', 'Bir açının bütünleri tümlerinden daima 90° fazladır']
                },
                {
                    stepNo: 4,
                    title: 'Ters Açılar',
                    formula: 'Kesişen 2 doğruda zıt açılar eşittir',
                    points: ['Makas biçiminde karşılıklı açılar eşittir', 'Komşu olanlar ise 180° ye tamamlanır']
                }
            ],
            workedExample: {
                question: 'Ölçüsü 35° olan bir açının tümleri ile bütünlerinin toplamı kaç derecedir?',
                solution: 'Tümleri = 90° − 35° = 55°. Bütünleri = 180° − 35° = 145°. Toplam = 200°.'
            },
            criticalTip: 'Kolay ezber: “Tümler” (T harfi dik köşe gibi 90°), “Bütünler” (Büyük olan 180°)!',
            quickCheck: {
                question: 'Ölçüsü 62° olan açının tümleri kaç derecedir?',
                answer: '28',
                hint: '90 − 62.'
            }
        },
        {
            id: 'g6_gn',
            grade: 6,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Nicelikler',
            subtitle: 'Üçgen ve Paralelkenar Alanı ile Alan/Arazi Ölçü Birimleri',
            accent: 'emerald',
            coreRule: 'Üçgen Alanı = (a × h) / 2  |  Paralelkenar Alanı = a × h  |  Alan birimleri 100 er değişir.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Yükseklik Çizimi',
                    formula: 'Köşeden karşı kenara 90° dikme',
                    points: ['Geniş açılı üçgende yükseklik dışarıya inebilir', 'Her taban kendi yüksekliğiyle çarpılır']
                },
                {
                    stepNo: 2,
                    title: 'Üçgenin Alanı',
                    formula: 'A = (Taban × Yükseklik) ÷ 2',
                    points: ['Dik üçgende dik kenarlar çarpımının yarısıdır', '2 ye bölmeyi asla unutma!']
                },
                {
                    stepNo: 3,
                    title: 'Paralelkenarın Alanı',
                    formula: 'A = a × h_a = b × h_b',
                    points: ['Köşegen paralelkenarı 2 eş üçgene böler', 'İki farklı taban×yükseklik aynı alanı verir']
                },
                {
                    stepNo: 4,
                    title: 'Alan & Arazi Birimleri',
                    formula: '1 ar = 100 m² | 1 dönüm = 1.000 m² | 1 ha = 10.000 m²',
                    points: ['Alan birimlerinde (m², cm²) her basamak ×100 / ÷100', 'Arazi birimlerinde (ha, daa, a) her basamak ×10 / ÷10']
                }
            ],
            workedExample: {
                question: 'Tabanı 12 cm, yüksekliği 7 cm olan üçgenin alanı kaç cm² dir?',
                solution: '(12 × 7) ÷ 2 = 84 ÷ 2 = 42 cm².'
            },
            criticalTip: 'Paralelkenarda yan kenar uzunluğunu yükseklikle karıştırma; yükseklik daima tabana 90° dik inen çizgidir.',
            quickCheck: {
                question: 'Tabanı 10 cm, yüksekliği 6 cm olan paralelkenarın alanı kaç cm² dir?',
                answer: '60',
                hint: 'Paralelkenar alanı = taban × yükseklik (2 ye bölünmez!).'
            }
        },
        {
            id: 'g6_ia',
            grade: 6,
            area: 'Veri İşleme ve Olasılık',
            topic: 'İstatistiksel Araştırma Süreci',
            subtitle: 'İkili Sütun Grafiği, Aritmetik Ortalama ve Açıklık',
            accent: 'amber',
            coreRule: 'Aritmetik Ortalama = Verilerin Toplamı ÷ Veri Sayısı  |  Açıklık = En Büyük − En Küçük.',
            steps: [
                {
                    stepNo: 1,
                    title: 'İki Veri Grubunu Karşılaştırma',
                    formula: 'İkili Sıklık Tablosu & İkili Sütun Grafiği',
                    points: ['İki grubu (örn: 6A ve 6B) aynı eksende kıyasla', 'Renk anahtarına (lejant) dikkat et']
                },
                {
                    stepNo: 2,
                    title: 'Aritmetik Ortalama',
                    formula: 'AO = (x₁ + x₂ + ... + xₙ) / n',
                    points: ['Toplam = Ortalama × Veri Sayısı', 'Ortalamaya eşit veri eklenirse ortalama değişmez']
                },
                {
                    stepNo: 3,
                    title: 'Açıklık (Yayılım Ölçüsü)',
                    formula: 'Açıklık = Maksimum − Minimum',
                    points: ['Verilerin ne kadar dağınık olduğunu gösterir', 'Küçük açıklık = daha tutarlı/istikrarlı grup']
                },
                {
                    stepNo: 4,
                    title: 'Karar Verme & Yorum',
                    formula: 'Yüksek Ortalama + Küçük Açıklık = En İstikrarlı',
                    points: ['İki grubu hem ortalama hem açıklıkla değerlendir', 'Eksik veriyi toplam formülünden bul']
                }
            ],
            workedExample: {
                question: '10, 14, 18, 22 veri grubunun aritmetik ortalaması ve açıklığı kaçtır?',
                solution: 'Ortalama = (10+14+18+22)/4 = 64/4 = 16. Açıklık = 22 − 10 = 12.'
            },
            criticalTip: 'Bir veri grubundaki tüm sayılara aynı k sayısı eklenirse ortalama k artar ama AÇIKLIK değişmez!',
            quickCheck: {
                question: '7, 12, 15, 22 veri grubunun açıklığı kaçtır?',
                answer: '15',
                hint: 'En büyük (22) − En küçük (7).'
            }
        },
        {
            id: 'g6_vo',
            grade: 6,
            area: 'Veri İşleme ve Olasılık',
            topic: 'Veriden Olasılığa',
            subtitle: 'Deneysel Sıklık, Göreli Sıklık ve Olasılık Tahmini',
            accent: 'rose',
            coreRule: 'Göreli Sıklık = Olayın Gözlenme Sayısı ÷ Toplam Deney Sayısı (Deneysel Olasılık).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Rastgele Deney & Gözlem',
                    formula: 'Deneme Sayısı (n) ve Çıktı Kaydı',
                    points: ['Zar, para, çark gibi deneyleri tekrarla', 'Her sonucun gerçekleşme sayısını (sıklık) kaydet']
                },
                {
                    stepNo: 2,
                    title: 'Göreli Sıklık (Oran)',
                    formula: 'Göreli Sıklık = Sıklık / Toplam Deneme',
                    points: ['Kesir, ondalık veya yüzde olarak ifade edilir', 'Tüm çıktıların göreli sıklıkları toplamı 1 (%100) dir']
                },
                {
                    stepNo: 3,
                    title: 'Olasılık Tahmini',
                    formula: 'Deney sayısı ↑ → Tahmin güvenilirliği ↑',
                    points: ['Az denemede sonuçlar sapma gösterebilir', 'Çok denemede göreli sıklık gerçek olasılığa yaklaşır']
                },
                {
                    stepNo: 4,
                    title: 'Gelecek Durum Öngörüsü',
                    formula: 'Beklenen Adet = Toplam × Göreli Sıklık',
                    points: ['Geçmiş verilerden yeni deneme sayısını tahmin et', 'Adil (hilesiz) ve hileli araçları ayırt et']
                }
            ],
            workedExample: {
                question: '50 atışta 15 kez basket atan oyuncunun basket atma göreli sıklığı yüzde kaçtır?',
                solution: '15 / 50 = 30 / 100 = %30.'
            },
            criticalTip: 'Tüm olası çıktıların göreli sıklıklarını topladığında sonuç her zaman 1 e (%100 e) eşit olmalıdır.',
            quickCheck: {
                question: '40 denemede 10 kez mavi gelen çarkta mavinin göreli sıklığı yüzde kaçtır? (Sadece sayı yaz)',
                answer: '25',
                hint: '10 / 40 = 1/4 = %25.'
            }
        }
    ],

    7: [
        {
            id: 'g7_ts',
            grade: 7,
            area: 'Sayılar ve Nicelikler',
            topic: 'Tam Sayılar ve Mutlak Değer',
            subtitle: 'Tam Sayılarda Dört İşlem, Mutlak Değer ve Kuvvetler',
            accent: 'indigo',
            coreRule: 'Aynı işaretli çarpma/bölme (+), zıt işaretli (−) | Parantezli (−a)² > 0, parantezsiz −a² < 0.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Mutlak Değer & Sıralama',
                    formula: '|x| ≥ 0  |  |-7| = 7',
                    points: ['Sıfıra olan uzaklıktır, negatif olamaz', 'Negatiflerde 0 a yakın olan daha büyüktür (−2 > −9)']
                },
                {
                    stepNo: 2,
                    title: 'Toplama ve Çıkarma',
                    formula: 'a − (−b) = a + b',
                    points: ['Çıkarma işlemi eksilen + çıkanın ters işaretlisidir', 'Zıt işaretlilerde büyükten küçüğü çıkar, büyüğün işaretini al']
                },
                {
                    stepNo: 3,
                    title: 'Çarpma ve Bölme İşaretleri',
                    formula: '(+)(+)=(+) | (−)(−)=(+) | (+)(−)=(−)',
                    points: ['Aynı işaret → Pozitif, Zıt işaret → Negatif', '0 a bölme tanımsızdır; 0 ÷ a = 0']
                },
                {
                    stepNo: 4,
                    title: 'Tam Sayıların Kuvvetleri',
                    formula: '(−2)⁴ = +16  ≠  −2⁴ = −16',
                    points: ['Negatif tabanın çift kuvveti (+), tek kuvveti (−)', 'Parantez yoksa eksi işareti kuvvetten etkilenmez']
                }
            ],
            workedExample: {
                question: '(−3)² + (−2)³ − (−5) işleminin sonucu kaçtır?',
                solution: '(+9) + (−8) + (+5) = 1 + 5 = 6.'
            },
            criticalTip: 'En sık hata: −4² ile (−4)² yi eş sanmak! −4² = −16 iken (−4)² = +16 dır.',
            quickCheck: {
                question: '(−6) × (−4) ÷ (−3) işleminin sonucu kaçtır?',
                answer: '-8',
                hint: 'Önce (−6)×(−4) = +24, sonra 24 ÷ (−3).'
            }
        },
        {
            id: 'g7_rs',
            grade: 7,
            area: 'Sayılar ve Nicelikler',
            topic: 'Rasyonel Sayılarda İşlemler',
            subtitle: 'Rasyonel Gösterim, Devirli Ondalık ve Çok Adımlı İşlemler',
            accent: 'emerald',
            coreRule: 'Rasyonel sayı a/b (b≠0) biçimindedir; çok adımlı işlemlerde merdiven en alttan/içten çözülür.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Sayı Doğrusu & Devirli Ondalık',
                    formula: 'Devirli: (Tümü − Devretmeyen) / (9 ve 0 lar)',
                    points: ['−a/b = (−a)/b = a/(−b) eşittir', 'Payda 10, 100, 1000 yapılarak ondalığa çevrilir']
                },
                {
                    stepNo: 2,
                    title: 'Toplama ve Çıkarma',
                    formula: 'Payda eşitle → Payları işaretli topla',
                    points: ['Negatif kesirlerde işareti paya taşı', 'Sonucu en sade hâle getir']
                },
                {
                    stepNo: 3,
                    title: 'Çarpma, Bölme & Kuvvet',
                    formula: '(−a/b)² = +a²/b² | (−a/b)³ = −a³/b³',
                    points: ['Bölmede ikinci rasyonel sayı ters çevrilir', 'Çarpmada işaret kuralını önce belirle']
                },
                {
                    stepNo: 4,
                    title: 'Çok Adımlı (Merdiven) İşlemler',
                    formula: 'Ana kesir çizgisine dikkat et!',
                    points: ['En iç parantez veya en alt kesirden başla', 'İşlem önceliği: üs → parantez → ×,÷ → +,−']
                }
            ],
            workedExample: {
                question: '1 − (1 / (1 + 1/2)) işleminin sonucu kaçtır?',
                solution: '1 + 1/2 = 3/2 ⇒ 1 ÷ (3/2) = 2/3 ⇒ 1 − 2/3 = 1/3.'
            },
            criticalTip: 'Negatif rasyonel sayıları sıralarken önce pozitif gibi sırala, sonra eşitsizliğin yönünü ters çevir!',
            quickCheck: {
                question: '(−2/3) ÷ (4/9) işleminin en sade sonucu nedir? (Örn: -3/2)',
                answer: '-3/2',
                hint: '(−2/3) × (9/4) = −18/12 = −3/2.'
            }
        },
        {
            id: 'g7_oo',
            grade: 7,
            area: 'Sayılar ve Nicelikler',
            topic: 'Oran-Orantı',
            subtitle: 'Orantı Sabiti, Doğru Orantı, Ters Orantı ve Ölçek',
            accent: 'sky',
            coreRule: 'Doğru Orantı: y/x = k (Çapraz çarpım)  |  Ters Orantı: x·y = k (Düz çarpım).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Orantı & İçler-Dışlar',
                    formula: 'a/b = c/d ⇔ a · d = b · c',
                    points: ['İki oranın eşitliğine orantı denir', 'x/3 = y/5 ⇒ x = 3k, y = 5k yaz']
                },
                {
                    stepNo: 2,
                    title: 'Doğru Orantı (DO)',
                    formula: 'Biri ↑ diğeri aynı oranda ↑  (y/x = k)',
                    points: ['Bölümleri sabittir', 'Kurulan tabloda ÇAPRAZ çarpım yapılır']
                },
                {
                    stepNo: 3,
                    title: 'Ters Orantı (TO)',
                    formula: 'Biri ↑ diğeri aynı oranda ↓  (x·y = k)',
                    points: ['İşçi–süre, hız–zaman, dişli–tur sayısı ters orantılıdır', 'Kurulan tabloda DÜZ (yatay) çarpım yapılır']
                },
                {
                    stepNo: 4,
                    title: 'Ölçek & Paylaşım',
                    formula: 'Ölçek = Harita Uzunluğu / Gerçek Uzunluk',
                    points: ['Ölçekte aynı uzunluk birimini (cm) kullan', '1 km = 100.000 cm dönüşümünü unutma']
                }
            ],
            workedExample: {
                question: '6 işçi bir işi 12 günde bitiriyorsa aynı güçteki 9 işçi kaç günde bitirir?',
                solution: 'Ters orantı (işçi artınca gün azalır): 6 × 12 = 9 × x ⇒ 72 = 9x ⇒ x = 8 gün.'
            },
            criticalTip: 'Probleme başlamadan mutlaka “Biri artarken diğeri artıyor mu (DO) yoksa azalıyor mu (TO)?” sorusunu sor!',
            quickCheck: {
                question: '4 kg elma 100 TL ise 7 kg elma kaç TL dir?',
                answer: '175',
                hint: '1 kg = 25 TL, 7 × 25 = 175.'
            }
        },
        {
            id: 'g7_yp',
            grade: 7,
            area: 'Sayılar ve Nicelikler',
            topic: 'Yüzde Problemleri',
            subtitle: 'Kâr-Zarar, İndirim-Zam, KDV ve Ardışık Yüzde Değişimleri',
            accent: 'amber',
            coreRule: '%a Artış = Sayı × (100+a)/100  |  %a İndirim = Sayı × (100−a)/100.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Çokluğun Yüzdesi & Bütünü Bulma',
                    formula: 'Parça = Bütün × (a/100)',
                    points: ['%20 si 30 olan sayı: 30 × (100/20) = 150', 'A sayısı B nin % kaçı: (A/B) × 100']
                },
                {
                    stepNo: 2,
                    title: 'Kâr, Zarar, KDV, İndirim',
                    formula: 'Satış = Maliyet × (1 ± Yüzde)',
                    points: ['%25 kâr = %125 ile satmak demektir', '%20 indirim = %80 ine satmak demektir']
                },
                {
                    stepNo: 3,
                    title: 'Ardışık Yüzdeler',
                    formula: '100x modeli kullan!',
                    points: ['Başlangıç fiyatına 100 TL de', 'İkinci yüzde ilk fiyat üzerinden değil YENİ fiyat üzerinden hesaplanır']
                },
                {
                    stepNo: 4,
                    title: 'Maliyetten Satışa / Satıştan Maliyete',
                    formula: 'Maliyet = Satış ÷ (1 ± Yüzde)',
                    points: ['%20 zamlı 240 TL ise %120 = 240 ⇒ %100 = 200 TL', 'Orantı kurarak hata riskini sıfırla']
                }
            ],
            workedExample: {
                question: '100 TL lik ürüne önce %20 zam, sonra yeni fiyata %20 indirim yapılırsa son fiyat kaç TL olur?',
                solution: 'Zam: 100 → 120 TL. İndirim: 120 × 0,80 = 96 TL (%4 zarar!).'
            },
            criticalTip: '%20 zam yapıp sonra %20 indirim yapmak fiyatı eski hâline getirmez — her zaman başlangıçtan daha düşük çıkar!',
            quickCheck: {
                question: '%30 indirimle 140 TL ye satılan ürünün indirimsiz fiyatı kaç TL dir?',
                answer: '200',
                hint: '%70 i 140 TL ise %100 ü kaçtır?'
            }
        },
        {
            id: 'g7_ci',
            grade: 7,
            area: 'Cebirsel Düşünme',
            topic: 'İşlemsel Cebirsel İfadeler',
            subtitle: 'Cebirsel İşlemler, Örüntü Genel Terimi ve 1. Dereceden Denklemler',
            accent: 'violet',
            coreRule: 'Benzer terimler toplanır; denklemde bilinenler bir tarafa, bilinmeyenler diğer tarafa işaret değiştirerek geçer.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Toplama & Çıkarma',
                    formula: '(3x − 2) − (x − 5) = 2x + 3',
                    points: ['Parantez önündeki (−) içerdeki TÜM işaretleri değiştirir', 'Yalnızca benzer terimler birleştirilir']
                },
                {
                    stepNo: 2,
                    title: 'Doğal Sayı ile Çarpma',
                    formula: 'k(ax + b) = kax + kb',
                    points: ['Dağılma özelliğini her terime uygula', 'Negatif katsayıda işaretlere dikkat et']
                },
                {
                    stepNo: 3,
                    title: 'Örüntü Genel Terimi',
                    formula: 'Artış·n + (1. Terim − Artış)',
                    points: ['Örn: 5, 8, 11... (+3 artış) → 3n + 2', 'n yerine adım numarasını koy']
                },
                {
                    stepNo: 4,
                    title: 'Denklem Kurma ve Çözme',
                    formula: 'ax + b = c ⇒ x = (c − b) / a',
                    points: ['İki tarafa aynı işlem uygulanır', 'Bulduğun x değerini denklemde yerine koyup sağla']
                }
            ],
            workedExample: {
                question: '3(x − 2) = x + 10 denkleminin kökü kaçtır?',
                solution: '3x − 6 = x + 10 ⇒ 2x = 16 ⇒ x = 8.'
            },
            criticalTip: 'Çıkarma işleminde −(2x − 4) ifadesi −2x − 4 DEĞİL, −2x + 4 olur!',
            quickCheck: {
                question: '4x − 7 = 21 denklemini sağlayan x kaçtır?',
                answer: '7',
                hint: '4x = 28 ⇒ x = 7.'
            }
        },
        {
            id: 'g7_gs',
            grade: 7,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Şekiller',
            subtitle: 'Açıortay ve Paralel İki Doğrunun Bir Kesenle Yaptığı Açılar',
            accent: 'sky',
            coreRule: 'Paralel iki doğru kesenle kesildiğinde: Yöndeş = Eşit, İç Ters (Z) = Eşit, Karşı Durumlu (U) = 180°.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Açıortay',
                    formula: 'Açıyı iki eş parçaya böler',
                    points: ['Bütünler iki açının açıortayları arasındaki açı 90° dir', 'Açıortay üzerinde ortak köşe vardır']
                },
                {
                    stepNo: 2,
                    title: 'Yöndeş & Ters Açılar (Z)',
                    formula: 'Z Kuralı: İç ters açılar eşittir',
                    points: ['Aynı yöne bakan yöndeş açılar eşittir', 'İç ters ve dış ters açılar eşittir']
                },
                {
                    stepNo: 3,
                    title: 'Karşı Durumlu Açılar (U)',
                    formula: 'U Kuralı: a + b = 180°',
                    points: ['Paralellerin içinde aynı taraftaki açılar bütünlerdir', 'Kalem ucu kuralında 3 açının toplamı 360° dir']
                },
                {
                    stepNo: 4,
                    title: 'Zikzak (M) Kuralı',
                    formula: 'Sola Bakanlar Toplamı = Sağa Bakanlar Toplamı',
                    points: ['Kırılma noktasından yardımcı paralel doğru çiz', 'M kuralında orta açı iki ucun toplamıdır']
                }
            ],
            workedExample: {
                question: 'd₁ // d₂ olmak üzere U kuralındaki açılar (2x + 10)° ve (3x + 20)° ise x kaçtır?',
                solution: '(2x + 10) + (3x + 20) = 180° ⇒ 5x + 30 = 180 ⇒ 5x = 150 ⇒ x = 30°.'
            },
            criticalTip: 'Z, U ve M kuralları YALNIZCA iki doğru birbirine PARALEL (d₁ // d₂) olduğunda geçerlidir!',
            quickCheck: {
                question: 'Paralel doğrular arasında M kuralında üst açı 35°, alt açı 48° ise ortadaki açı kaç derecedir?',
                answer: '83',
                hint: 'M kuralı: 35 + 48.'
            }
        },
        {
            id: 'g7_gn1',
            grade: 7,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Nicelikler (1)',
            subtitle: 'Çokgenler, Düzgün Çokgen Açıları, Eşkenar Dörtgen ve Yamuk Alanı',
            accent: 'emerald',
            coreRule: 'İç Açılar Toplamı = (n−2)×180°  |  Dış Açılar Toplamı = 360°  |  Yamuk = ((a+c)×h)/2.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Çokgenlerde Açı & Köşegen',
                    formula: 'İç: (n−2)×180° | 1 Köşeden Köşegen: n−3',
                    points: ['Tüm dışbükey çokgenlerin dış açıları toplamı 360° dir', 'Bir köşeden (n−2) üçgen oluşur']
                },
                {
                    stepNo: 2,
                    title: 'Düzgün Çokgenler',
                    formula: '1 Dış Açı = 360°/n  |  1 İç Açı = 180° − Dış',
                    points: ['Önce dış açıyı bulmak en hızlı yoldur', 'Beşgen: 108°, Altıgen: 120°, Sekizgen: 135°']
                },
                {
                    stepNo: 3,
                    title: 'Eşkenar Dörtgen Alanı',
                    formula: 'A = (e × f) / 2   veya   A = a × h',
                    points: ['Köşegenler birbirini dik ortalar', 'Köşegen çarpımının yarısı alanı verir']
                },
                {
                    stepNo: 4,
                    title: 'Yamuk Alanı & Çevre-Alan',
                    formula: 'A_yamuk = ((Alt + Üst) × h) / 2',
                    points: ['Paralel kenarların toplamı × yükseklik ÷ 2', 'Sabit çevrede en büyük alan karede oluşur']
                }
            ],
            workedExample: {
                question: 'Alt tabanı 12 cm, üst tabanı 8 cm, yüksekliği 5 cm olan yamuğun alanı kaç cm² dir?',
                solution: '((12 + 8) × 5) ÷ 2 = (20 × 5) ÷ 2 = 50 cm².'
            },
            criticalTip: 'Düzgün çokgenin kenar sayısını bulurken iç açıdan gitmek yerine dış açıyı (180° − iç açı) bulup 360° yi böl!',
            quickCheck: {
                question: 'Köşegenleri 6 cm ve 14 cm olan eşkenar dörtgenin alanı kaç cm² dir?',
                answer: '42',
                hint: '(6 × 14) / 2.'
            }
        },
        {
            id: 'g7_gn2',
            grade: 7,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Nicelikler (2)',
            subtitle: 'Çemberde Merkez Açı, Yay Uzunluğu, Daire ve Daire Dilimi Alanı',
            accent: 'sky',
            coreRule: 'Çevre = 2πr  |  Alan = πr²  |  Dilim ve Yay için (α / 360°) oranı ile çarp.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Merkez Açı ve Yay Ölçüsü',
                    formula: 'Merkez Açı (α) = Gördüğü Yay Ölçüsü',
                    points: ['Tam çember yayı 360° dir', 'Yarım çember 180°, çeyrek çember 90° dir']
                },
                {
                    stepNo: 2,
                    title: 'Yay Uzunluğu',
                    formula: 'Yay = 2 · π · r · (α / 360°)',
                    points: ['Tam çember çevresinin α/360 lık parçasıdır', 'Tekerlek 1 tam turda 2πr yol alır']
                },
                {
                    stepNo: 3,
                    title: 'Dairenin Alanı',
                    formula: 'Alan = π · r²',
                    points: ['Çap verilmişse önce r = Çap ÷ 2 bul', 'Halka alanı = π(R² − r²)']
                },
                {
                    stepNo: 4,
                    title: 'Daire Diliminin Alanı',
                    formula: 'Dilim = π · r² · (α / 360°)',
                    points: ['Orantı kur: 360° → πr² ise α° → x', 'Dilim çevresi = Yay + 2r (yarıçapları unutma!)']
                }
            ],
            workedExample: {
                question: 'r = 6 cm, α = 60° olan daire diliminin alanı kaç cm² dir? (π = 3)',
                solution: '3 × 6² × (60/360) = 108 × (1/6) = 18 cm².'
            },
            criticalTip: 'Yarım dairenin çevresi sorulduğunda sadece yarım yay (πr) değil, çap (2r) uzunluğunu da ekle!',
            quickCheck: {
                question: 'Yarıçapı 5 cm olan dairenin alanı kaç cm² dir? (π = 3)',
                answer: '75',
                hint: '3 × 5² = 3 × 25.'
            }
        },
        {
            id: 'g7_dn',
            grade: 7,
            area: 'Geometri ve Ölçme',
            topic: 'Dönüşüm',
            subtitle: 'Öteleme, Yansıma ve Simetri Doğruları',
            accent: 'violet',
            coreRule: 'Öteleme ve yansıma eşlik dönüşümüdür: şeklin boyutu, kenarları ve açıları DEĞİŞMEZ.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Öteleme (Kaydırma)',
                    formula: 'Sağa:+x | Sola:−x | Yukarı:+y | Aşağı:−y',
                    points: ['Şeklin duruşu ve yönü değişmez', 'Tüm köşeler aynı yönde eşit birim kayar']
                },
                {
                    stepNo: 2,
                    title: 'Yansıma (Ayna Simetrisi)',
                    formula: 'Nokta ve görüntüsü doğruya EŞİT uzaklıktadır',
                    points: ['Görüntü şekle göre ters (ayna) yönlüdür', 'Doğru üzerindeki noktalar sabit kalır']
                },
                {
                    stepNo: 3,
                    title: 'Eksenlere Göre Yansıma',
                    formula: 'x ekseni: (x, −y)  |  y ekseni: (−x, y)',
                    points: ['Hangi eksene göre yansıma varsa o koordinat sabit kalır', 'Diğer koordinat işaret değiştirir']
                },
                {
                    stepNo: 4,
                    title: 'Simetri Doğruları',
                    formula: 'Düzgün n-genin n simetri doğrusu vardır',
                    points: ['Dikdörtgen: 2, Kare: 4, Eşkenar Üçgen: 3', 'Paralelkenarın (özel değilse) simetri doğrusu yoktur']
                }
            ],
            workedExample: {
                question: 'A(2, −3) noktası x eksenine göre yansıtılıp 4 birim sağa ötelenirse nereye gelir?',
                solution: 'x ekseni yansıması: (2, 3) → 4 sağa öteleme: (6, 3).'
            },
            criticalTip: 'Bir nokta simetri doğrusuna d birim uzaktaysa, nokta ile yansıma görüntüsü arasındaki mesafe 2d birimdir.',
            quickCheck: {
                question: 'K(4, −5) noktasının y eksenine göre yansımasının x (birinci) koordinatı kaçtır?',
                answer: '-4',
                hint: 'y eksenine yansımada x işaret değiştirir: (−4, −5).'
            }
        },
        {
            id: 'g7_ia',
            grade: 7,
            area: 'Veri İşleme ve Olasılık',
            topic: 'İstatistiksel Araştırma Süreci',
            subtitle: 'Çizgi ve Daire Grafiği ile Ortalama, Ortanca (Medyan) ve Tepe Değer (Mod)',
            accent: 'amber',
            coreRule: 'Ortalama = Toplam/n | Ortanca = Sıralı ortadaki değer | Tepe Değer = En çok tekrar eden.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Uygun Grafik Seçimi',
                    formula: 'Zaman: Çizgi | Parça-Bütün: Daire | Kıyas: Sütun',
                    points: ['Daire grafiğinde bütün 360° ye eşittir', 'Açıyı bul: (Parça / Bütün) × 360°']
                },
                {
                    stepNo: 2,
                    title: 'Aritmetik Ortalama',
                    formula: 'AO = Toplam ÷ Veri Sayısı',
                    points: ['Aşırı büyük/küçük uç değerlerden çok etkilenir', 'Dengeli dağılımları en iyi temsil eder']
                },
                {
                    stepNo: 3,
                    title: 'Ortanca (Medyan)',
                    formula: 'Sırala → Tek: ortadaki | Çift: orta ikisinin ortalaması',
                    points: ['Önce MUTLAKA küçükten büyüğe sırala!', 'Uç değer varsa grubu en iyi ortanca temsil eder']
                },
                {
                    stepNo: 4,
                    title: 'Tepe Değer (Mod)',
                    formula: 'En sık tekrar eden veri',
                    points: ['Tüm veriler aynı sıklıktaysa mod YOKTUR', 'Birden fazla tepe değer bulunabilir']
                }
            ],
            workedExample: {
                question: '4, 7, 7, 10, 17 veri grubunun ortanca ve tepe değeri kaçtır?',
                solution: 'Sıralı 5 verinin ortancası 3. eleman = 7; en sık geçen tepe değer = 7.'
            },
            criticalTip: 'Ortancayı bulmadan önce verileri küçükten büyüğe sıralamayı sakın unutma!',
            quickCheck: {
                question: '5, 9, 13, 17 veri grubunun ortancası (medyanı) kaçtır?',
                answer: '11',
                hint: 'Ortadaki iki sayının (9 ve 13) ortalaması.'
            }
        },
        {
            id: 'g7_vo',
            grade: 7,
            area: 'Veri İşleme ve Olasılık',
            topic: 'Veriden Olasılığa',
            subtitle: 'Deneysel Olasılık, Teorik Olasılık ve Olayların Tümleyeni',
            accent: 'rose',
            coreRule: 'P(A) + P(A′) = 1  |  Deney sayısı çok artırıldıkça Deneysel Olasılık → Teorik Olasılığa yaklaşır.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Teorik (Kuramsal) Olasılık',
                    formula: 'P_teorik = İstenen Çıktı / Tüm Eş Olasılıklı Çıktılar',
                    points: ['Deney yapmadan matematiksel hesaplanır', 'Hilesiz zar: P(6) = 1/6 sabittir']
                },
                {
                    stepNo: 2,
                    title: 'Deneysel Olasılık',
                    formula: 'P_deneysel = Gerçekleşme Sayısı / Toplam Deney',
                    points: ['Gerçekleştirilen gözlem verilerine dayanır', 'Her deney serisinde farklı çıkabilir']
                },
                {
                    stepNo: 3,
                    title: 'Olmama Olasılığı (Tümleyen)',
                    formula: 'P(Olmama) = 1 − P(Olma)',
                    points: ['Bir olayın olma + olmama olasılığı 1 dir', 'Kesin: 1, İmkânsız: 0']
                },
                {
                    stepNo: 4,
                    title: 'Büyük Sayılar Yaklaşımı',
                    formula: 'n → ∞  iken  P_deneysel ≈ P_teorik',
                    points: ['10 atışta sapma büyük olabilir', '10.000 atışta oran teorik olasılığa yakınsar']
                }
            ],
            workedExample: {
                question: 'Torbadan kırmızı çekme olasılığı 3/10 ise kırmızı OLMAMA olasılığı kaçtır?',
                solution: '1 − 3/10 = 7/10.'
            },
            criticalTip: 'Bir para 5 kez üst üste tura gelse bile 6. atışta yazı gelme teorik olasılığı hâlâ 1/2 dir!',
            quickCheck: {
                question: '20 atışta 8 kez tura gelen para deneyinde tura gelmenin deneysel olasılığı yüzde kaçtır? (Sadece sayı yaz)',
                answer: '40',
                hint: '8 / 20 = 40 / 100.'
            }
        }
    ],

    8: [
        {
            id: 'g8_ck',
            grade: 8,
            area: 'Sayılar ve İşlemler',
            topic: 'Çarpanlar ve Katlar',
            subtitle: 'Asal Çarpanlar, EBOB, EKOK ve Aralarında Asal Sayılar',
            accent: 'indigo',
            coreRule: 'a × b = EBOB(a,b) × EKOK(a,b)  |  Bütünden Parçaya: EBOB, Parçadan Bütüne: EKOK.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Asal Çarpanlara Ayırma',
                    formula: 'N = 2ᵃ · 3ᵇ · 5ᶜ  |  Çarpan Sayısı: (a+1)(b+1)...',
                    points: ['Bölen algoritmasıyla üslü biçimde yaz', 'En küçük asal sayı 2 dir']
                },
                {
                    stepNo: 2,
                    title: 'EBOB (Bütünden Parçaya)',
                    formula: 'Ortak asal çarpanların EN KÜÇÜK üslüsü',
                    points: ['Fidan dikme, çuval/şişe bölme, fayans kesme', 'Eşit parçalara bölmede kullanılır']
                },
                {
                    stepNo: 3,
                    title: 'EKOK (Parçadan Bütüne)',
                    formula: 'Tüm asal çarpanların EN BÜYÜK üslüsü',
                    points: ['Nöbet/zil buluşması, kutulardan kare yapma', 'Birbirinin katı sayılarda EKOK büyük sayıdır']
                },
                {
                    stepNo: 4,
                    title: 'Aralarında Asallık',
                    formula: 'EBOB(a,b) = 1  ⇒  EKOK(a,b) = a · b',
                    points: ['1 ile tüm pozitif tam sayılar aralarında asaldır', 'Ardışık tam sayılar daima aralarında asaldır']
                }
            ],
            workedExample: {
                question: 'EBOB(a,b) = 6, EKOK(a,b) = 90 ve a = 18 ise b kaçtır?',
                solution: '18 × b = 6 × 90 = 540 ⇒ b = 30.'
            },
            criticalTip: 'Aralarında asal sayıların kendilerinin asal olması GEREKMEZ (Örn: 8 ve 15 aralarında asaldır).',
            quickCheck: {
                question: 'EBOB(12, 18) + EKOK(12, 18) kaçtır?',
                answer: '42',
                hint: 'EBOB = 6, EKOK = 36.'
            }
        },
        {
            id: 'g8_us',
            grade: 8,
            area: 'Sayılar ve İşlemler',
            topic: 'Üslü Sayılar',
            subtitle: 'Tam Sayı Kuvvetleri, Üs Kuralları, Çözümleme ve Bilimsel Gösterim',
            accent: 'violet',
            coreRule: 'a⁻ⁿ = 1/aⁿ  |  aˣ·aʸ = aˣ⁺ʸ  |  (aˣ)ʸ = aˣ·ʸ  |  Bilimsel: a×10ⁿ (1 ≤ |a| < 10).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Negatif Üs & İşaret',
                    formula: 'a⁻ⁿ = 1/aⁿ  |  (a/b)⁻ⁿ = (b/a)ⁿ',
                    points: ['Negatif üs sayıyı negatif yapmaz, ters çevirir!', 'Sıfır hariç a⁰ = 1 dir']
                },
                {
                    stepNo: 2,
                    title: 'Çarpma, Bölme & Üssün Üssü',
                    formula: 'Aynı taban: üs topla/çıkar | Aynı üs: taban çarp/böl',
                    points: ['Farklı tabanları (4, 8, 16) ortak tabana (2) çevir', 'Toplama/çıkarmada ortak üs parantezine al']
                },
                {
                    stepNo: 3,
                    title: '10 un Kuvvetleriyle Çözümleme',
                    formula: '..., 10², 10¹, 10⁰ , 10⁻¹, 10⁻², 10⁻³',
                    points: ['Virgülden sonra üsler −1, −2, −3 diye gider', 'Olmayan basamağa mutlaka 0 yaz']
                },
                {
                    stepNo: 4,
                    title: 'Bilimsel Gösterim',
                    formula: 'a × 10ⁿ   (1 ≤ |a| < 10)',
                    points: ['Katsayı büyürse 10 un üssü azalır (ters hareket)', 'Katsayı küçülürse 10 un üssü artar']
                }
            ],
            workedExample: {
                question: '4⁶ ÷ 8³ işleminin sonucu kaçtır?',
                solution: '(2²)⁶ ÷ (2³)³ = 2¹² ÷ 2⁹ = 2³ = 8.'
            },
            criticalTip: 'Bilimsel gösterimde katsayı 0,5 veya 12 OLAMAZ; her zaman 1 ≤ |a| < 10 aralığında olmalıdır.',
            quickCheck: {
                question: '2⁻² × 16 işleminin sonucu kaçtır?',
                answer: '4',
                hint: '2⁻² × 2⁴ = 2².'
            }
        },
        {
            id: 'g8_ks',
            grade: 8,
            area: 'Sayılar ve İşlemler',
            topic: 'Köklü Sayılar',
            subtitle: 'Tam Kare, a√b, Dört İşlem, Ondalık Karekök ve Gerçek Sayılar',
            accent: 'emerald',
            coreRule: '√(a²·b) = a√b  |  Çarpma-Bölme: Kök içleri işlenir  |  Toplama-Çıkarma: Kök içi AYNI olmalı.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Tam Kare & Yaklaşık Değer',
                    formula: 'a² < x < b² ⇒ a < √x < b',
                    points: ['1²..20² tam karelerini ezbere bil', 'Hangi tam kareye yakınsa o tam sayıya yakındır']
                },
                {
                    stepNo: 2,
                    title: 'a√b ve Kök İçine Alma',
                    formula: 'a√b = √(a²·b)',
                    points: ['Sıralama yaparken katsayıyı kök içine al', 'Kök dışına en büyük tam kare çarpanı çıkar']
                },
                {
                    stepNo: 3,
                    title: 'Dört İşlem Kuralları',
                    formula: '√a·√b = √(ab)  |  m√x ± n√x = (m±n)√x',
                    points: ['Toplamada önce hepsini en sade a√b yap', '√a × √a = a (doğal sayı yapar)']
                },
                {
                    stepNo: 4,
                    title: 'Ondalık Kök & Gerçek Sayılar',
                    formula: 'R = Q (Rasyonel) ∪ I (İrrasyonel)',
                    points: ['Ondalık sayıyı kesre çevirip pay/payda kökü al', 'Kök dışına çıkamayanlar ve π irrasyoneldir']
                }
            ],
            workedExample: {
                question: '√50 + √18 − √8 işleminin sonucu nedir?',
                solution: '5√2 + 3√2 − 2√2 = 6√2.'
            },
            criticalTip: '√9 + √16 ≠ √25! Ayrı köklerin toplamı tek kök içinde toplanamaz: √9 + √16 = 3 + 4 = 7 dir.',
            quickCheck: {
                question: '√3 × √27 işleminin sonucu kaçtır?',
                answer: '9',
                hint: '√(3 × 27) = √81.'
            }
        },
        {
            id: 'g8_ci',
            grade: 8,
            area: 'Cebir',
            topic: 'Cebirsel İfadeler',
            subtitle: 'Cebirsel Çarpma, 3 Temel Özdeşlik ve Çarpanlara Ayırma',
            accent: 'violet',
            coreRule: '(a+b)² = a²+2ab+b²  |  (a−b)² = a²−2ab+b²  |  a²−b² = (a−b)(a+b).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Terim, Katsayı & Çarpma',
                    formula: '(a+b)(c+d) = ac + ad + bc + bd',
                    points: ['Katsayılar çarpılır, aynı değişkenin üsleri toplanır', 'Değişkene 1 yazmak katsayılar toplamını verir']
                },
                {
                    stepNo: 2,
                    title: 'Tam Kare Özdeşlikleri',
                    formula: '(a ± b)² = a² ± 2ab + b²',
                    points: ['Ortadaki “2ab” çarpımının 2 katını asla unutma!', 'Geometrik olarak kare alan modeliyle ispatlanır']
                },
                {
                    stepNo: 3,
                    title: 'İki Kare Farkı Özdeşliği',
                    formula: 'a² − b² = (a − b)(a + b)',
                    points: ['Kareden kare kesilen LGS alan sorularının anahtarıdır', 'Sayısal hız: 52² − 48² = (4)(100) = 400']
                },
                {
                    stepNo: 4,
                    title: 'Çarpanlara Ayırma Sırası',
                    formula: '1. Ortak Parantez → 2. Özdeşlik Kontrolü',
                    points: ['Önce ortak çarpan (örn: 3x²−27 = 3(x²−9)) al', 'Sonra tam kare veya iki kare farkı uygula']
                }
            ],
            workedExample: {
                question: 'a + b = 8 ve a·b = 15 ise a² + b² kaçtır?',
                solution: '(a+b)² = a²+2ab+b² ⇒ 64 = a²+b²+30 ⇒ a²+b² = 34.'
            },
            criticalTip: '(x + 3)² = x² + 9 DEĞİLDİR! Ortadaki +6x terimini mutlaka yaz: x² + 6x + 9.',
            quickCheck: {
                question: '101² − 99² işleminin sonucu kaçtır?',
                answer: '400',
                hint: '(101 − 99)(101 + 99) = 2 × 200.'
            }
        },
        {
            id: 'g8_dd',
            grade: 8,
            area: 'Cebir',
            topic: 'Doğrusal Denklemler ve Eğim',
            subtitle: 'Koordinat Sistemi, Doğrusal İlişkiler, Doğru Grafiği ve Eğim',
            accent: 'indigo',
            coreRule: 'y = mx + n denkleminde m = Eğim (Dikey / Yatay), n = y eksenini kestiği noktadır.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Rasyonel Katsayılı Denklemler',
                    formula: 'Paydaları EKOK ile eşitleyip yok et',
                    points: ['Kesir önündeki eksi tüm paya dağılır', 'İçler-dışlar çarpımıyla sadeleştir']
                },
                {
                    stepNo: 2,
                    title: 'Koordinat Sistemi & Bölgeler',
                    formula: 'I:(+,+) | II:(−,+) | III:(−,−) | IV:(+,−)',
                    points: ['x ekseni üzerinde y=0, y ekseni üzerinde x=0', 'Bir nokta doğrunun üzerindeyse denklemini sağlar']
                },
                {
                    stepNo: 3,
                    title: 'Doğrusal İlişki & Grafik',
                    formula: 'y = Başlangıç + (Değişim Hızı) · x',
                    points: ['x=0 verip y yi, y=0 verip x i bul → çiz', 'y = mx orijinden geçer; x=a dikey, y=b yataydır']
                },
                {
                    stepNo: 4,
                    title: 'Eğim Hesabı',
                    formula: 'm = Dikey / Yatay  |  ax+by+c=0 ⇒ m = −a/b',
                    points: ['Sağa yatık doğru (+), sola yatık doğru (−) eğimlidir', 'Yatay doğrunun eğimi 0, dikey doğrunun tanımsızdır']
                }
            ],
            workedExample: {
                question: '2x − 4y + 8 = 0 doğrusunun eğimi kaçtır?',
                solution: '4y = 2x + 8 ⇒ y = (1/2)x + 2 ⇒ Eğim m = 1/2.'
            },
            criticalTip: 'Eğim formülünde y yalnız değilse (ax+by+c=0) x in katsayısını hemen eğim alma; önce y yi tek başına bırak!',
            quickCheck: {
                question: 'Dikey yüksekliği 3 m, yatay uzunluğu 12 m olan rampanın eğimi yüzde kaçtır? (Sadece sayı yaz)',
                answer: '25',
                hint: '3 / 12 = 1 / 4 = %25.'
            }
        },
        {
            id: 'g8_es',
            grade: 8,
            area: 'Cebir',
            topic: 'Eşitsizlikler',
            subtitle: 'Eşitsizlik Kurma, Sayı Doğrusu ve Çözüm Kuralları',
            accent: 'rose',
            coreRule: 'Negatif bir sayı ile çarpma veya bölme yapıldığında eşitsizlik YÖN DEĞİŞTİRİR!',
            steps: [
                {
                    stepNo: 1,
                    title: 'Sözel İfade → Sembol',
                    formula: 'En az: ≥  |  En fazla: ≤  |  Fazla: >  |  Az: <',
                    points: ['“En çok 500 kg” → m ≤ 500', '“En az 80 puan” → p ≥ 80']
                },
                {
                    stepNo: 2,
                    title: 'Sayı Doğrusunda Gösterim',
                    formula: '≤, ≥ : İçi DOLU (●)  |  <, > : İçi BOŞ (○)',
                    points: ['Sınır dahilsa noktanın içi doldurulur', 'Aralık bileşikse iki uç arası taranır']
                },
                {
                    stepNo: 3,
                    title: 'Eşitsizlik Çözme Kuralları',
                    formula: '−2x ≤ 10 ⇒ x ≥ −5  (Yön ters döner!)',
                    points: ['Toplama/çıkarma ve pozitif çarpma/bölmede yön değişmez', 'Negatif çarpma/bölmede < ↔ > ve ≤ ↔ ≥ olur']
                },
                {
                    stepNo: 4,
                    title: 'Tam Sayı Çözüm & Problemler',
                    formula: 'Çözüm aralığındaki en büyük / en küçük tam sayı',
                    points: ['Bileşik eşitsizlikte işlemi üç tarafa birden uygula', 'Kişi/koli sayısı tam sayı olarak yuvarlanır']
                }
            ],
            workedExample: {
                question: '7 − 3x < 19 eşitsizliğini sağlayan en küçük tam sayı kaçtır?',
                solution: '−3x < 12 ⇒ (her iki tarafı −3 e böl, yön değiştir) ⇒ x > −4 ⇒ en küçük tam sayı −3.'
            },
            criticalTip: 'En büyük tuzak: x in katsayısı negatifken bölerken eşitsizliğin yönünü çevirmeyi unutmak!',
            quickCheck: {
                question: '−4x ≥ 20 eşitsizliğini sağlayan en büyük tam sayı kaçtır?',
                answer: '-5',
                hint: 'Her iki tarafı −4 e böl ve yönü çevir: x ≤ −5.'
            }
        },
        {
            id: 'g8_uc',
            grade: 8,
            area: 'Geometri ve Ölçme',
            topic: 'Üçgenler',
            subtitle: 'Yardımcı Elemanlar, Üçgen Eşitsizliği, Açı-Kenar ve Pisagor Bağıntısı',
            accent: 'sky',
            coreRule: '|b−c| < a < b+c  |  Büyük açı karşısında uzun kenar  |  Dik Üçgende: a² + b² = c².',
            steps: [
                {
                    stepNo: 1,
                    title: 'Yardımcı Elemanlar',
                    formula: 'Yükseklik (h) | Açıortay (n) | Kenarortay (V)',
                    points: ['Katlamada kenar-kenar çakışması → Açıortay', 'Köşe-köşe çakışması → Orta dikme / Kenarortay']
                },
                {
                    stepNo: 2,
                    title: 'Üçgen Eşitsizliği & Çizim',
                    formula: '|b − c| < a < b + c',
                    points: ['Tek üçgen çizimi için: KKK, KAK veya AKA gerekir', 'Sadece 3 açı (AAA) tek üçgen belirlemez']
                },
                {
                    stepNo: 3,
                    title: 'Açı – Kenar Bağıntısı',
                    formula: 'm(A) > m(B) > m(C) ⇔ a > b > c',
                    points: ['Dik üçgende en uzun kenar daima hipotenüstür', 'Geniş açı karşısı √(a²+b²) den büyüktür']
                },
                {
                    stepNo: 4,
                    title: 'Pisagor Bağıntısı',
                    formula: 'a² + b² = c²  (3-4-5, 5-12-13, 8-15-17, 7-24-25)',
                    points: ['Koordinatta iki nokta arası mesafe Pisagorla bulunur', 'Özel üçgenlerin katlarını (6-8-10, 9-12-15...) tanı']
                }
            ],
            workedExample: {
                question: 'Dik kenarları 9 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm dir?',
                solution: '3-4-5 üçgeninin 3 katı ⇒ 9² + 12² = 225 ⇒ c = 15 cm.'
            },
            criticalTip: 'İki üçgenin ortak kenarında iki ayrı üçgen eşitsizliğinin KESİŞİMİNİ (büyük alt sınır, küçük üst sınır) al!',
            quickCheck: {
                question: 'Hipotenüsü 13 cm, bir dik kenarı 5 cm olan dik üçgenin diğer dik kenarı kaç cm dir?',
                answer: '12',
                hint: '5-12-13 özel dik üçgeni.'
            }
        },
        {
            id: 'g8_eb',
            grade: 8,
            area: 'Geometri ve Ölçme',
            topic: 'Eşlik ve Benzerlik',
            subtitle: 'Eş Çokgenler, Benzerlik Oranı (k), Çevre ve Alan Oranları',
            accent: 'emerald',
            coreRule: 'Kenar & Çevre & Yükseklik Oranı = k  |  Alanlar Oranı = k²  |  Eşlikte k = 1.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Eşlik (≅) ve Benzerlik (~)',
                    formula: 'ABC ~ DEF ⇒ m(A)=m(D), |AB|/|DE| = k',
                    points: ['Harf sırası karşılıklı köşeleri gösterir', 'Tüm kareler, daireler ve eşkenar üçgenler benzerdir']
                },
                {
                    stepNo: 2,
                    title: 'Benzerlik Oranı (k)',
                    formula: 'k = |AB|/|DE| = |BC|/|EF| = |AC|/|DF|',
                    points: ['Eş açıların karşısındaki kenarları oranla', 'k = 1 ise şekiller eştir']
                },
                {
                    stepNo: 3,
                    title: 'Temel Benzerlik & Kelebek',
                    formula: 'DE // BC ⇒ |AD|/|AB| = |AE|/|AC| = |DE|/|BC|',
                    points: ['Üçgende küçük kenar / BÜYÜK kenar oranını al!', 'Gölge boyu ve projektör sorularında dik üçgen benzerliği kur']
                },
                {
                    stepNo: 4,
                    title: 'Çevre ve Alan Oranı',
                    formula: 'Çevre₁ / Çevre₂ = k   |   Alan₁ / Alan₂ = k²',
                    points: ['Kenarlar 2 katına çıkarsa alan 4 katına çıkar', 'Alan oranı verilirse k yi bulmak için karekök al']
                }
            ],
            workedExample: {
                question: 'Benzerlik oranı 2/5 olan iki üçgenden küçüğünün alanı 12 cm² ise büyüğünün alanı kaç cm² dir?',
                solution: 'Alanlar oranı = (2/5)² = 4/25 ⇒ 4/25 = 12/A ⇒ A = 75 cm².'
            },
            criticalTip: 'DE // BC iken |DE|/|BC| oranını |AD|/|DB| ile DEĞİL, |AD|/|AB| (parça / bütün) ile eşitle!',
            quickCheck: {
                question: 'Benzer iki karenin alanları oranı 16/25 ise çevreleri oranı kaçtır? (Örn: 4/5)',
                answer: '4/5',
                hint: 'Alanlar oranının karekökü çevreler oranını verir.'
            }
        },
        {
            id: 'g8_dg',
            grade: 8,
            area: 'Geometri ve Ölçme',
            topic: 'Dönüşüm Geometrisi',
            subtitle: 'Koordinat Sisteminde Öteleme, Yansıma ve Ötelemeli Yansıma',
            accent: 'violet',
            coreRule: 'Öteleme: (x±a, y±b)  |  x-yansıması: (x, −y)  |  y-yansıması: (−x, y)  |  Orijin: (−x, −y).',
            steps: [
                {
                    stepNo: 1,
                    title: 'Koordinatta Öteleme',
                    formula: 'Sağa:+a, Sola:−a | Yukarı:+b, Aşağı:−b',
                    points: ['Şeklin tüm köşelerine aynı kuralı uygula', 'Uzunluk, açı ve alan korunur']
                },
                {
                    stepNo: 2,
                    title: 'Eksenlere Göre Yansıma',
                    formula: 'x ekseni → (x, −y)  |  y ekseni → (−x, y)',
                    points: ['x eksenine göre yansıma: x sabit, y zıt işaretli', 'y eksenine göre yansıma: y sabit, x zıt işaretli']
                },
                {
                    stepNo: 3,
                    title: 'Doğrulara Göre Yansıma',
                    formula: 'x = a doğrusuna göre: (2a − x, y)',
                    points: ['Noktanın doğruya uzaklığını sayıp diğer yana aktar', 'y = b doğrusuna göre: (x, 2b − y)']
                },
                {
                    stepNo: 4,
                    title: 'Ardışık Dönüşümler',
                    formula: 'Öteleme + Yansıma (Şerit Desenler)',
                    points: ['Adımları verilen sırayla tek tek uygula', 'Önce x sonra y yansıması orijine simetridir']
                }
            ],
            workedExample: {
                question: 'A(−3, 5) noktası önce y eksenine göre yansıtılıp sonra 2 birim aşağı ötelenirse nereye gelir?',
                solution: 'y yansıması: (3, 5) → 2 birim aşağı: (3, 3).'
            },
            criticalTip: 'Koordinat yansımalarında şekli zihinde karıştırma: x ekseninde y işaret değiştirir, y ekseninde x işaret değiştirir!',
            quickCheck: {
                question: 'P(4, −2) noktasının x eksenine göre yansımasının y (ikinci) koordinatı kaçtır?',
                answer: '2',
                hint: 'x eksenine yansımada y işaret değiştirir: (4, +2).'
            }
        },
        {
            id: 'g8_gc',
            grade: 8,
            area: 'Geometri ve Ölçme',
            topic: 'Geometrik Cisimler',
            subtitle: 'Dik Prizmalar, Dik Dairesel Silindir, Dik Piramit ve Dik Koni',
            accent: 'amber',
            coreRule: 'Silindir Yanal = 2πrh | Yüzey = 2πr²+2πrh | Hacim = πr²h | Prizma Hacim = Taban Alanı × h.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Dik Prizmalar',
                    formula: 'V = Taban Alanı × h  |  Yüz = n+2, Ayrıt = 3n',
                    points: ['Yanal yüzlerin hepsi dikdörtgendir', 'Taban şekline göre adlandırılır (üçgen, kare...)']
                },
                {
                    stepNo: 2,
                    title: 'Dik Dairesel Silindir Alanı',
                    formula: 'Yanal = 2πrh  |  Tüm Alan = 2πr² + 2πrh',
                    points: ['Açınım: 2 eş daire + 1 dikdörtgen (uzun kenar 2πr)', 'Rulo boyama ve etiket soruları yanal alandır']
                },
                {
                    stepNo: 3,
                    title: 'Dik Dairesel Silindir Hacmi',
                    formula: 'V = π · r² · h',
                    points: ['Yarıçap 2 katına çıkarsa hacim 4 katına çıkar', 'Kap aktarma sorularında sıvı hacmi korunur']
                },
                {
                    stepNo: 4,
                    title: 'Dik Piramit ve Dik Koni',
                    formula: 'Koni Açınımı: r / a = α / 360°  |  r² + h² = a²',
                    points: ['Piramitte yan yüz yüksekliği ile cisim yüksekliği Pisagor yapar', 'Konide taban yarıçapı (r), yükseklik (h) ve ana doğru (a) dik üçgendir']
                }
            ],
            workedExample: {
                question: 'r = 3 cm, h = 10 cm olan silindirin hacmi ve yanal alanı kaçtır? (π = 3)',
                solution: 'Hacim = 3 × 3² × 10 = 270 cm³. Yanal alan = 2 × 3 × 3 × 10 = 180 cm².'
            },
            criticalTip: 'Dikdörtgen karton kıvrılarak silindir yapıldığında hangi kenar taban çevresi (2πr) oluyorsa hacim o kenarın karesiyle büyür!',
            quickCheck: {
                question: 'Taban yarıçapı 4 cm, yüksekliği 5 cm olan silindirin hacmi kaç cm³ tür? (π = 3)',
                answer: '240',
                hint: 'V = 3 × 4² × 5 = 3 × 16 × 5.'
            }
        },
        {
            id: 'g8_va',
            grade: 8,
            area: 'Veri İşleme ve Olasılık',
            topic: 'Veri Analizi',
            subtitle: 'Daire, Sütun ve Çizgi Grafikleri Arasında Dönüşüm ve Yorumlama',
            accent: 'sky',
            coreRule: 'Parça / Bütün = Merkez Açı / 360° = Yüzde / 100 — Tüm grafik dönüşümleri bu orantıyla çözülür.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Grafik Türü Seçimi',
                    formula: 'Oran: Daire | Kıyas: Sütun | Zaman: Çizgi',
                    points: ['Birden çok veri grubunu aynı grafikte incele', 'Bütündeki payı daire grafiği en net gösterir']
                },
                {
                    stepNo: 2,
                    title: 'Daire Grafiği Orantısı',
                    formula: '360° ↔ Toplam Adet  |  α° ↔ İstenen Adet',
                    points: ['90° = %25 (1/4), 72° = %20 (1/5), 120° = 1/3', 'Açıları sadeleştirip en küçük ortak kata (k) bağla']
                },
                {
                    stepNo: 3,
                    title: 'Grafikler Arası Dönüşüm',
                    formula: 'Sütun ↔ Daire ↔ Çizgi',
                    points: ['İki farklı daire grafiğinin toplamları farklı olabilir!', 'Açısı küçük olan dilim toplam büyükse daha fazla adet içerebilir']
                },
                {
                    stepNo: 4,
                    title: 'Veri Değişimi & Yüzde',
                    formula: 'Artış/Azalış % = (Fark / İlk Değer) × 100',
                    points: ['Eklenen/çıkarılan ürünle yeni toplamı güncelle', 'İki kategori farkını doğrudan açı farkından oranla']
                }
            ],
            workedExample: {
                question: 'Toplam 720 öğrencili okulda 140° lik dilim kaç öğrenciyi temsil eder?',
                solution: '360° → 720 öğrenci (1° = 2 öğrenci) ⇒ 140° = 280 öğrenci.'
            },
            criticalTip: 'İki farklı daire grafiğinde (örneğin 2024 ve 2025) toplam sayılar verilmeden açılara bakarak “sayı azaldı” deme!',
            quickCheck: {
                question: 'Bir daire grafiğinde 108° lik dilim yüzde kaçı gösterir? (Sadece sayı yaz)',
                answer: '30',
                hint: '(108 / 360) × 100.'
            }
        },
        {
            id: 'g8_ol',
            grade: 8,
            area: 'Veri İşleme ve Olasılık',
            topic: 'Olasılık',
            subtitle: 'Basit Olayların Olma Olasılığı ve LGS Muhakeme Kurguları',
            accent: 'rose',
            coreRule: 'P(A) = İstenen Durum Sayısı / Tüm Olası Durum Sayısı   ve   0 ≤ P(A) ≤ 1.',
            steps: [
                {
                    stepNo: 1,
                    title: 'Örnek Uzay & Eş Olasılık',
                    formula: 'Tüm Olası Durumların Sayısı (n)',
                    points: ['Her çıktının gelme şansı eşitse formül uygulanır', 'İki bağımsız deneyde durum sayıları çarpılır (2×6=12)']
                },
                {
                    stepNo: 2,
                    title: 'Temel Olasılık Hesabı',
                    formula: 'P(A) = s(A) / s(E)',
                    points: ['İmkânsız olay: 0, Kesin olay: 1', 'P(A) + P(A′) = 1 (olmama olasılığı)']
                },
                {
                    stepNo: 3,
                    title: 'Geometrik & Sayısal Kurgular',
                    formula: 'Alan Olasılığı = İstenen Alan / Toplam Alan',
                    points: ['Tam kare, asal, aralarında asal şartlarını tek tek listele', 'Açı dilimi olasılığı = α / 360°']
                },
                {
                    stepNo: 4,
                    title: 'Bilinmeyenli Olasılık Denklemi',
                    formula: 'İstenen / (Toplam + x) = Hedef Olasılık',
                    points: ['Top eklendiğinde hem payı hem paydayı güncelle', 'En az/en çok sorularında eşitsizlik kur']
                }
            ],
            workedExample: {
                question: '1 den 20 ye kadar kartlardan çekilen sayının tam kare olma olasılığı kaçtır?',
                solution: 'Tam kareler: {1, 4, 9, 16} (4 adet) ⇒ P = 4/20 = 1/5.'
            },
            criticalTip: 'Torbaya yeni top eklendiğinde veya çıkarıldığında PAYDADAKİ TOPLAM SAYIYI güncellemeyi asla unutma!',
            quickCheck: {
                question: 'Hilesiz bir zar atıldığında 4 ten büyük sayı gelme olasılığı kesir olarak kaçtır? (En sade hâli, örn: 1/3)',
                answer: '1/3',
                hint: '4 ten büyükler: {5, 6} ⇒ 2 / 6 = 1/3.'
            }
        }
    ]
};
