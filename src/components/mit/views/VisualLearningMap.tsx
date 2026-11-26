import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    CheckCircle2,
    ArrowRight,
    Filter,
    Layers,
    Compass,
    ChevronRight,
    Star
} from 'lucide-react';
import { MIT_CURRICULUM } from '../../../data/mitCurriculum';

interface VisualLearningMapProps {
    grade: number;
    onSelectTopicForStudy?: (topic: string) => void;
}

interface KazanimMeta {
    code: string;
    examWeight: 'Çok Yüksek' | 'Yüksek' | 'Orta' | 'Temel';
    description: string;
    keySkills: string[];
    typicalQuestions: string;
}

// Grade-scoped MEB / Maarif Modeli & LGS metadata matching the exact 37 PUSULA topics
const KAZANIM_INFO_BY_GRADE: Record<5 | 6 | 7 | 8, Record<string, KazanimMeta>> = {
    5: {
        'Sayılar ve Nicelikler (1)': {
            code: 'MAT.5.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Çok basamaklı doğal sayıları okur, bölük ve basamak değerlerini belirler; dört işlem, kalanlı bölme ile doğal sayının karesi ve küpünü hesaplar.',
            keySkills: ['Milyonlar ve binler bölüğü', 'Tahmin ve yuvarlama', 'Kalanlı bölme', 'Kare (a²) ve küp (a³)'],
            typicalQuestions: 'Bursluluk sınavında basamak değeri farkı, kalanlı bölme yorumu ve çok adımlı doğal sayı problemleri çıkar.'
        },
        'Sayılar ve Nicelikler (2)': {
            code: 'MAT.5.1.2',
            examWeight: 'Çok Yüksek',
            description: 'Kesir, ondalık gösterim ve yüzde temsillerini birbirine dönüştürür; paydaları eşit/katı kesirlerle ve ondalık sayılarla işlem yapar.',
            keySkills: ['Denk kesir ve sadeleştirme', 'Kesir-ondalık-yüzde dönüşümü', 'Çokluğun yüzdesini bulma'],
            typicalQuestions: 'Alışveriş indirimi, kesir parçası ve ondalık cetvel/fiş hesaplama problemleri sorulur.'
        },
        'İşlemlerle Cebirsel Düşünme': {
            code: 'MAT.5.2.1',
            examWeight: 'Yüksek',
            description: 'İşlem önceliğini uygular, eşitliğin korunumunu terazi modeliyle yorumlar, sayı/şekil örüntülerini ve basit akış algoritmalarını çözer.',
            keySkills: ['İşlem önceliği sırası', 'Eşitlikte verilmeyeni bulma', 'Örüntü kuralı ve akış şeması'],
            typicalQuestions: 'Parantezli işlem önceliği, terazi dengesi ve belirli adımdaki örüntü sayısı sorulur.'
        },
        'Geometrik Şekiller': {
            code: 'MAT.5.3.1',
            examWeight: 'Yüksek',
            description: 'Temel geometrik kavramları (nokta, doğru, ışın, doğru parçası), açı çeşitlerini, üçgen ve dörtgenlerin temel özelliklerini inceler.',
            keySkills: ['Paralel ve dik doğrular', 'Dar, dik, geniş, doğru açı', 'Üçgen (180°) ve dörtgen (360°) iç açıları'],
            typicalQuestions: 'Kareli zeminde konum belirleme, pergel ile üçgen çizimi ve eksik açı bulma soruları.'
        },
        'Geometrik Nicelikler': {
            code: 'MAT.5.3.2',
            examWeight: 'Yüksek',
            description: 'Dikdörtgen ve karenin çevre uzunluğu ile alanını hesaplar; aynı çevreye veya alana sahip farklı dikdörtgenleri karşılaştırır.',
            keySkills: ['Çevre = 2(a+b)', 'Alan = a × b', 'Birim kare sayma ve bileşik alanlar'],
            typicalQuestions: 'Bahçeye tel çekme (çevre) ve zemin parke döşeme (alan) kurgulu problemler.'
        },
        'İstatistiksel Araştırma Süreci': {
            code: 'MAT.5.4.1',
            examWeight: 'Orta',
            description: 'İstatistiksel araştırma sorusu oluşturur, veri toplar; sıklık tablosu, çetele ve sütun grafiği ile verileri düzenleyip yorumlar.',
            keySkills: ['Geçerli araştırma sorusu', 'Çetele ve sıklık tablosu', 'Sütun grafiği okuma'],
            typicalQuestions: 'Verilen sütun grafiğinden toplam, fark ve en yüksek/en düşük kategori yorumu istenir.'
        },
        'Veriden Olasılığa': {
            code: 'MAT.5.4.2',
            examWeight: 'Temel',
            description: 'Bir olayın imkânsız, az olası, eşit olası, çok olası veya kesin olma durumlarını olasılık ölçeği üzerinde (0 ile 1 arasında) değerlendirir.',
            keySkills: ['Kesin (1) ve imkânsız (0) olay', 'Eş olasılıklı çıktılar', 'Basit olasılık karşılaştırması'],
            typicalQuestions: 'Torbadan top çekme veya çark çevirme senaryolarında şans karşılaştırması sorulur.'
        }
    },

    6: {
        'Sayılar ve Nicelikler (1)': {
            code: 'MAT.6.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Doğal sayıların çarpan ve katlarını, 2, 3, 4, 5, 6, 9, 10 ile bölünebilme kurallarını, asal sayıları ve ortak bölen/kat kavramlarını kavrar.',
            keySkills: ['Bölünebilme kuralları', 'Asal çarpanlara ayırma', 'Ortak bölen ve ortak kat'],
            typicalQuestions: 'Burslulukta eksik rakamlı bölünebilme (örn: 3A4 sayısı 9 ile bölünüyorsa) ve ortak kat soruları.'
        },
        'Sayılar ve Nicelikler (2)': {
            code: 'MAT.6.1.2',
            examWeight: 'Çok Yüksek',
            description: 'Kesirlerle çarpma ve bölme işlemlerini, ondalık gösterimlerle dört işlemi ve 10, 100, 1000 ile kısa yolları uygular.',
            keySkills: ['Kesirlerde çarpma ve ters çevirip bölme', 'Ondalık çarpma/bölme', 'Çok adımlı kesir problemleri'],
            typicalQuestions: 'Kalanın belirli kesrini hesaplama, ondalık birim fiyat ve paketleme problemleri.'
        },
        'İşlemlerle Cebirsel Düşünme ve Değişimler': {
            code: 'MAT.6.2.1',
            examWeight: 'Çok Yüksek',
            description: 'Doğal sayıların üslü gösterimini, dağılma özelliğini, cebirsel ifadelerde terim-katsayı-değer bulmayı ve oran kavramını uygular.',
            keySkills: ['Üslü nicelik ve işlem önceliği', 'Cebirsel ifade yazma ve değer bulma', 'Birimli ve birimsiz oran'],
            typicalQuestions: 'Sözel ifadeyi cebirsel yazma, değişken yerine değer koyma ve hız/karışım oranı soruları.'
        },
        'Geometrik Şekiller': {
            code: 'MAT.6.3.1',
            examWeight: 'Yüksek',
            description: 'Açı kavramını genişletir; komşu, tümler (90°), bütünler (180°) ve ters açıların özelliklerini kullanarak problem çözer.',
            keySkills: ['Tümler açılar (90°)', 'Bütünler açılar (180°)', 'Ters açılar ve kesişen doğrular'],
            typicalQuestions: 'Bir açının tümleri ile bütünleri arasındaki ilişki ve kesişen doğrularda bilinmeyen açı.'
        },
        'Geometrik Nicelikler': {
            code: 'MAT.6.3.2',
            examWeight: 'Çok Yüksek',
            description: 'Üçgen ve paralelkenarın yüksekliklerini çizer, alanlarını hesaplar; alan (m², cm²) ve arazi (ar, dönüm, hektar) ölçü birimlerini dönüştürür.',
            keySkills: ['Üçgen alanı = (a×h)/2', 'Paralelkenar alanı = a×h', 'Alan (×100) ve arazi dönüşümleri'],
            typicalQuestions: 'Tarla bölme, paralelkenardan üçgen kesme ve dönüm/hektar metrekare çevirme soruları.'
        },
        'İstatistiksel Araştırma Süreci': {
            code: 'MAT.6.4.1',
            examWeight: 'Yüksek',
            description: 'İki veri grubunu ikili sütun grafiği ile karşılaştırır; aritmetik ortalama ve açıklık hesaplayarak grupları yorumlar.',
            keySkills: ['İkili sütun grafiği', 'Aritmetik ortalama', 'Açıklık (En büyük − En küçük)'],
            typicalQuestions: 'Yeni veri eklendiğinde değişen ortalama ve açıklığa göre tutarlılık karşılaştırması.'
        },
        'Veriden Olasılığa': {
            code: 'MAT.6.4.2',
            examWeight: 'Orta',
            description: 'Tekrarlı rastgele deneylerde olayların sıklığını ve göreli sıklığını (deneysel olasılık) hesaplar, gelecek denemeler için tahminde bulunur.',
            keySkills: ['Sıklık ve göreli sıklık', 'Deney sayısı ve tahmin güvenilirliği', 'Beklenen sonuç hesabı'],
            typicalQuestions: 'Yapılan deneme tablosundan göreli sıklık yüzdesi ve yeni denemede beklenen adet hesabı.'
        }
    },

    7: {
        'Tam Sayılar ve Mutlak Değer': {
            code: 'MAT.7.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Tam sayılarla toplama, çıkarma, çarpma, bölme işlemlerini, mutlak değeri ve tam sayıların pozitif tam sayı kuvvetlerini hesaplar.',
            keySkills: ['İşaret kuralları', 'Mutlak değer ve sıralama', 'Parantezli ve parantezsiz kuvvetler'],
            typicalQuestions: 'Sıcaklık değişimi, hedef tahtası puanlama, sınav net hesabı ve (−a)² ile −a² farkı.'
        },
        'Rasyonel Sayılarda İşlemler': {
            code: 'MAT.7.1.2',
            examWeight: 'Çok Yüksek',
            description: 'Rasyonel sayıları sayı doğrusunda gösterir, devirli ondalıkları kesre çevirir; çok adımlı işlemler ile kare/küp hesaplarını yapar.',
            keySkills: ['Devirli ondalık dönüşümü', 'Çok adımlı (merdivenli) işlemler', 'Rasyonel sayıların kare ve küpü'],
            typicalQuestions: 'Merdivenli kesir işlemleri, negatif rasyonel sıralama ve kurgulu paylaştırma problemleri.'
        },
        'Oran-Orantı': {
            code: 'MAT.7.1.3',
            examWeight: 'Çok Yüksek',
            description: 'Orantı sabitini belirler; doğru orantı, ters orantı ve harita ölçeği gerektiren günlük hayat problemlerini çözer.',
            keySkills: ['İçler-dışlar çarpımı', 'Doğru orantı (y/x=k)', 'Ters orantı (x·y=k)', 'Ölçek hesabı'],
            typicalQuestions: 'İşçi-gün, hız-zaman, dişli çark tur sayısı ve oranla para/ürün paylaşımı problemleri.'
        },
        'Yüzde Problemleri': {
            code: 'MAT.7.1.4',
            examWeight: 'Çok Yüksek',
            description: 'Bir çokluğun belirli yüzdesini, yüzdesi verilen bütünü, kâr-zarar, indirim-zam, KDV ve ardışık yüzde değişimlerini hesaplar.',
            keySkills: ['Maliyet–satış–kâr/zarar', 'Ardışık indirim ve zam', 'Satıştan maliyeti bulma'],
            typicalQuestions: 'Etiket fiyatı üzerinden önce zam sonra indirim, KDV ekleme ve yüzdelik karşılaştırma.'
        },
        'İşlemsel Cebirsel İfadeler': {
            code: 'MAT.7.2.1',
            examWeight: 'Çok Yüksek',
            description: 'Cebirsel ifadelerle toplama, çıkarma ve doğal sayıyla çarpma yapar; sayı örüntülerinin genel terimini ve 1. dereceden denklemleri çözer.',
            keySkills: ['Benzer terim ve parantez dağıtma', 'Örüntü genel terimi (an+b)', '1. dereceden denklem kurma'],
            typicalQuestions: 'Yaş, sayı, sıra, terazi dengesi ve geometri çevresi üzerinden denklem kurma soruları.'
        },
        'Geometrik Şekiller': {
            code: 'MAT.7.3.1',
            examWeight: 'Yüksek',
            description: 'Açıortayı tanır; iki paralel doğrunun bir kesenle oluşturduğu yöndeş, iç ters, dış ters ve karşı durumlu açıları çözer.',
            keySkills: ['Açıortay', 'Z kuralı (İç ters)', 'U kuralı (Karşı durumlu = 180°)', 'M ve kalem ucu kuralları'],
            typicalQuestions: 'Kırık yollar ve paralel doğrular arasında yardımcı paralel çizerek bilinmeyen açı bulma.'
        },
        'Geometrik Nicelikler (1)': {
            code: 'MAT.7.3.2',
            examWeight: 'Yüksek',
            description: 'Çokgenlerin ve düzgün çokgenlerin iç/dış açılarını hesaplar; eşkenar dörtgen ve yamuğun alan bağıntılarını uygular.',
            keySkills: ['(n−2)×180° ve 360°/n', 'Eşkenar dörtgen = (e×f)/2', 'Yamuk = ((a+c)×h)/2'],
            typicalQuestions: 'Düzgün beşgen/altıgen birleştirme açıları, uçurtma ve yamuk bahçe alanı problemleri.'
        },
        'Geometrik Nicelikler (2)': {
            code: 'MAT.7.3.3',
            examWeight: 'Yüksek',
            description: 'Çemberde merkez açı ile gördüğü yay ilişkisini kurar; yay uzunluğu, daire alanı ve daire dilimi alanını hesaplar.',
            keySkills: ['Çevre = 2πr ve yay uzunluğu', 'Daire alanı = πr²', 'Daire dilimi = πr²·(α/360°)'],
            typicalQuestions: 'Silecek, fıskiye, pizza dilimi alanı, halka alanı ve tekerlek tur sayısı soruları.'
        },
        'Dönüşüm': {
            code: 'MAT.7.3.4',
            examWeight: 'Orta',
            description: 'Kareli zeminde ve koordinat düzleminde öteleme, yansıma ve simetri doğrusu kavramlarını uygular.',
            keySkills: ['Sağa/sola/yukarı/aşağı öteleme', 'Eksenlere göre yansıma', 'Çokgen simetri doğruları'],
            typicalQuestions: 'Koordinat üzerinde ardışık öteleme-yansıma sonrası yeni nokta veya desen adımı.'
        },
        'İstatistiksel Araştırma Süreci': {
            code: 'MAT.7.4.1',
            examWeight: 'Yüksek',
            description: 'Çizgi ve daire grafiği oluşturup yorumlar; aritmetik ortalama, ortanca (medyan) ve tepe değer (mod) hesaplayıp karşılaştırır.',
            keySkills: ['Daire grafiği (360° orantısı)', 'Çizgi grafiği', 'Ortalama, Ortanca (Medyan), Mod'],
            typicalQuestions: 'Uç değer olduğunda uygun ölçü seçimi ve daire grafiğinden kategori adedi bulma.'
        },
        'Veriden Olasılığa': {
            code: 'MAT.7.4.2',
            examWeight: 'Orta',
            description: 'Basit olayların teorik ve deneysel olasılığını hesaplar, karşılaştırır ve olma/olmama olasılığı ilişkisini kullanır.',
            keySkills: ['Teorik olasılık', 'Deneysel olasılık', 'P(A) + P(A′) = 1'],
            typicalQuestions: 'Deney tablosundan olasılık yüzdesi ve torbaya top ekleme/çıkarma soruları.'
        }
    },

    8: {
        'Çarpanlar ve Katlar': {
            code: 'M.8.1.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Pozitif tam sayıların asal çarpanlarını bulur; EBOB, EKOK ve aralarında asallık kavramlarını problem çözmede kullanır.',
            keySkills: ['Asal çarpan algoritması', 'EBOB (Bütünden parçaya)', 'EKOK (Parçadan bütüne)', 'Aralarında asallık'],
            typicalQuestions: 'LGS’de garanti 1–2 soru: Fayans döşeme, aydınlatma direği hizalanması, paketleme ve raf sığdırma.'
        },
        'Üslü Sayılar': {
            code: 'M.8.1.2.1',
            examWeight: 'Çok Yüksek',
            description: 'Tam sayıların tam sayı (negatif dahil) kuvvetlerini, üslü çarpma/bölme/üssün üssü kurallarını, ondalık çözümleme ve bilimsel gösterimi uygular.',
            keySkills: ['Negatif üs (a⁻ⁿ)', 'Ortak taban / ortak üs işlemleri', 'Bilimsel gösterim (1 ≤ |a| < 10)'],
            typicalQuestions: 'LGS’de garanti 2–3 soru: Bakteri çoğalması, veri depolama (GB/TB) ve astronomik/mikro bilimsel gösterim.'
        },
        'Köklü Sayılar': {
            code: 'M.8.1.3.1',
            examWeight: 'Çok Yüksek',
            description: 'Tam kare sayıları ve karekök tahminini yapar; a√b biçimi, kareköklü dört işlem, ondalık karekök ve gerçek sayılar kümesini kavrar.',
            keySkills: ['Yaklaşık değer tahmini', 'a√b ve kök içine alma', 'Dört işlem ve doğal sayı yapan çarpan', 'İrrasyonel sayılar'],
            typicalQuestions: 'LGS’de garanti 2–3 soru: Alanı verilen karelerin birleşimi, sayı doğrusunda konum ve cetvel ölçümü.'
        },
        'Cebirsel İfadeler': {
            code: 'M.8.2.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Cebirsel ifadeleri çarpar; (a+b)², (a−b)² ve a²−b² özdeşliklerini geometrik olarak modeller ve çarpanlara ayırır.',
            keySkills: ['Tam kare özdeşlikleri', 'İki kare farkı (a²−b²)', 'Ortak çarpan parantezi', 'Alan modellemesi'],
            typicalQuestions: 'LGS’de garanti 2 soru: Kare kağıttan parça kesme/katlama ve boyalı bölge alanı modellemesi.'
        },
        'Doğrusal Denklemler ve Eğim': {
            code: 'M.8.2.2.1',
            examWeight: 'Çok Yüksek',
            description: 'Rasyonel katsayılı denklemleri çözer, koordinat sisteminde doğru grafiği çizer, doğrusal ilişki kurar ve eğim hesaplar.',
            keySkills: ['Koordinat bölgeleri', 'y = mx + n grafiği', 'Eğim = Dikey / Yatay', 'Doğrusal değişim modelleri'],
            typicalQuestions: 'LGS’de garanti 2–3 soru: Engelli rampası eğimi, fidan uzama/yakıt tüketim grafiği ve tarife eşitliği.'
        },
        'Eşitsizlikler': {
            code: 'M.8.2.3.1',
            examWeight: 'Yüksek',
            description: 'Birinci dereceden bir bilinmeyenli eşitsizlikleri kurar, sayı doğrusunda gösterir ve negatifle çarpma/bölme yön değişimini uygular.',
            keySkills: ['En az (≥) / En fazla (≤)', 'Sayı doğrusunda içi dolu/boş gösterim', 'Negatifle yön değiştirme'],
            typicalQuestions: 'Asansör yük sınırı, ekonomik tarife karşılaştırması ve kargo/tolerans aralığı soruları.'
        },
        'Üçgenler': {
            code: 'M.8.3.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Üçgende kenarortay, açıortay, yükseklik çizer; üçgen eşitsizliği, açı-kenar bağıntısı ve Pisagor teoremini uygular.',
            keySkills: ['Yardımcı elemanlar ve katlama', 'Üçgen eşitsizliği', 'Pisagor: a² + b² = c²', 'Özel dik üçgenler'],
            typicalQuestions: 'LGS’de garanti 2–3 soru: Kırılan direk, duvara yaslı merdiven, katlama açıortayı ve kuş uçuşu mesafe.'
        },
        'Eşlik ve Benzerlik': {
            code: 'M.8.3.3.1',
            examWeight: 'Yüksek',
            description: 'Eş ve benzer çokgenleri belirler; benzerlik oranı (k), çevreler oranı (k) ve alanlar oranı (k²) ilişkilerini uygular.',
            keySkills: ['Benzerlik oranı (k)', 'Temel benzerlik ve kelebek', 'Alanlar oranı = k²'],
            typicalQuestions: 'Gölge boyu, projeksiyon perdesi, maket/fotoğraf ölçekleme ve benzer üçgen alan oranları.'
        },
        'Dönüşüm Geometrisi': {
            code: 'M.8.3.2.1',
            examWeight: 'Orta',
            description: 'Koordinat sisteminde öteleme, eksenlere ve eksenlere paralel doğrulara göre yansıma ile ardışık dönüşümleri uygular.',
            keySkills: ['Koordinatta öteleme', 'x, y ekseni ve x=a, y=b yansıması', 'Ötelemeli yansıma'],
            typicalQuestions: 'Koordinat sisteminde çokgenlerin ardışık yansıma ve öteleme sonrası köşe konumları.'
        },
        'Geometrik Cisimler': {
            code: 'M.8.3.4.1',
            examWeight: 'Yüksek',
            description: 'Dik prizma, dik dairesel silindir, dik piramit ve dik koninin temel elemanlarını, açınımlarını, alan ve hacimlerini hesaplar.',
            keySkills: ['Silindir yanal alanı (2πrh)', 'Silindir hacmi (πr²h)', 'Piramit ve koni açınımı + Pisagor'],
            typicalQuestions: 'Boya rulosu, konserve etiketi, karton kıvırarak silindir yapma ve sıvı aktarma problemleri.'
        },
        'Veri Analizi': {
            code: 'M.8.4.1.1',
            examWeight: 'Çok Yüksek',
            description: 'Veri gruplarını daire, sütun ve çizgi grafiğiyle gösterir; grafikler arasında açı, yüzde ve adet dönüşümleri yapar.',
            keySkills: ['360° daire grafiği orantısı', 'Sütun ↔ Daire dönüşümü', 'Farklı toplamlı grafik yorumu'],
            typicalQuestions: 'LGS’de kesin soru: Daire ve sütun grafiği birleştirilerek kusurlu ürün veya yıl bazlı değişim hesabı.'
        },
        'Olasılık': {
            code: 'M.8.5.1.1',
            examWeight: 'Yüksek',
            description: 'Basit bir olayın olma olasılığını hesaplar; üslü, köklü, çarpanlar veya veri grafiğiyle birleştirilmiş olasılık sorularını çözer.',
            keySkills: ['İstenen / Tüm durumlar', '0 ≤ P(A) ≤ 1', 'Diğer konularla birleşik olasılık'],
            typicalQuestions: 'LGS’de garanti 1–2 soru: Daire grafiği, kareköklü kartlar veya tam kare sayılarla olasılık hesabı.'
        }
    }
};

const AREA_BADGE_CLASSES = [
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200'
];

export const VisualLearningMap = ({ grade, onSelectTopicForStudy }: VisualLearningMapProps) => {
    const safeGrade = (grade === 5 || grade === 6 || grade === 7 || grade === 8 ? grade : 8) as 5 | 6 | 7 | 8;

    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [viewStyle, setViewStyle] = useState<'roadmap' | 'cards'>('roadmap');

    useEffect(() => {
        setSelectedTopic(null);
        setFilterCategory('all');
    }, [safeGrade]);

    const curriculum = useMemo(() => MIT_CURRICULUM[safeGrade] || [], [safeGrade]);

    // Real earned badges from localStorage (scoped by `${grade}::${topic}`)
    const savedBadges: Record<string, string[]> = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('mit_study_badges') || '{}');
        } catch {
            return {};
        }
    }, [safeGrade]);

    const getTopicStats = (topic: string) => {
        const badges = savedBadges[`${safeGrade}::${topic}`] || [];
        const uniqueStages = ['Çırak', 'Kalfa', 'Usta', 'Uzman'].filter((stage) => badges.includes(stage));
        const progress = uniqueStages.length * 25;

        const meta = KAZANIM_INFO_BY_GRADE[safeGrade]?.[topic] || {
            code: safeGrade === 8 ? 'M.8.0.0' : `MAT.${safeGrade}.0.0`,
            examWeight: 'Yüksek' as const,
            description: `${safeGrade}. sınıf ${topic} kazanımlarını kavrar ve problem çözer.`,
            keySkills: ['Temel Kavramlar', 'İşlem Becerisi', 'Problem Çözme'],
            typicalQuestions: 'Sınavda çok adımlı ve günlük hayat kurgulu problem olarak sorulur.'
        };

        return {
            progress,
            badges: uniqueStages,
            meta,
            status: progress >= 75 ? 'mastered' : progress >= 25 ? 'learning' : 'needs_work'
        };
    };

    const allTopics = useMemo(() => {
        const list: { topic: string; area: string }[] = [];
        curriculum.forEach((c) => {
            c.topics.forEach((t) => list.push({ topic: t, area: c.area }));
        });
        return list;
    }, [curriculum]);

    const totalTopics = allTopics.length;
    const statsList = useMemo(
        () => allTopics.map((item) => ({ ...item, ...getTopicStats(item.topic) })),
        [allTopics, savedBadges, safeGrade]
    );

    const averageProgress = Math.round(
        statsList.reduce((acc, curr) => acc + curr.progress, 0) / Math.max(1, totalTopics)
    );
    const masteredCount = statsList.filter((s) => s.status === 'mastered').length;
    const learningCount = statsList.filter((s) => s.status === 'learning').length;

    const filteredAreas = useMemo(() => {
        if (filterCategory === 'all') return curriculum;
        return curriculum.filter((c) => c.area === filterCategory);
    }, [curriculum, filterCategory]);

    const activeModalInfo = selectedTopic ? getTopicStats(selectedTopic) : null;

    return (
        <div className="space-y-6">
            {/* Top Navigation & Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/60 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-500/30">
                            <Compass size={14} className="text-indigo-400" />
                            <span>
                                {safeGrade}. Sınıf {safeGrade === 8 ? 'MEB LGS' : 'MEB Maarif'} Kazanım Matrisi
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Görsel Matematik Kazanım Haritası
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {safeGrade}. sınıf PUSULA müfredatındaki {totalTopics} ana konuyu şematik yol haritası üzerinde takip edin. Her konunun gerçek kazanım kodu, sınav ağırlığı ve 4 aşamalı rozet ilerlemesi senkronize çalışır.
                        </p>
                    </div>

                    {/* Overall Progress Gauge Widget */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex items-center gap-5 shrink-0">
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-white/10"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-emerald-400 transition-all duration-700"
                                    strokeDasharray={`${averageProgress}, 100`}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <span className="absolute text-lg font-black text-white tabular-nums">%{averageProgress}</span>
                        </div>
                        <div className="space-y-1 text-xs">
                            <div className="font-extrabold text-white text-sm">Müfredat Hakimiyeti</div>
                            <div className="text-emerald-300 font-bold flex items-center gap-1">
                                <CheckCircle2 size={12} /> {masteredCount} Konuda Usta
                            </div>
                            <div className="text-amber-300 font-bold flex items-center gap-1">
                                <Star size={12} /> {learningCount} Konu Gelişiyor
                            </div>
                            <div className="text-slate-300">Toplam {totalTopics} Temel Kazanım</div>
                        </div>
                    </div>
                </div>

                {/* Filter and View Toggles */}
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-slate-400 font-bold mr-1 flex items-center gap-1">
                            <Filter size={12} /> Alan Filtresi:
                        </span>
                        <button
                            type="button"
                            onClick={() => setFilterCategory('all')}
                            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                                filterCategory === 'all'
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                            }`}
                        >
                            Tümü ({totalTopics})
                        </button>
                        {curriculum.map((c) => (
                            <button
                                key={c.area}
                                type="button"
                                onClick={() => setFilterCategory(c.area)}
                                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                                    filterCategory === c.area
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                                }`}
                            >
                                {c.area} ({c.topics.length})
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl border border-white/10">
                        <button
                            type="button"
                            onClick={() => setViewStyle('roadmap')}
                            className={`px-3 py-1 rounded-lg font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                                viewStyle === 'roadmap' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Compass size={13} /> Şematik Yol Haritası
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewStyle('cards')}
                            className={`px-3 py-1 rounded-lg font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                                viewStyle === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Layers size={13} /> Detaylı Kart Görünümü
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            {viewStyle === 'roadmap' ? (
                <div className="space-y-8">
                    {filteredAreas.map((areaItem, areaIdx) => {
                        const badgeCls = AREA_BADGE_CLASSES[areaIdx % AREA_BADGE_CLASSES.length];
                        return (
                            <div key={areaItem.area} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                                {/* Area Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border ${badgeCls}`}>
                                            0{areaIdx + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">{areaItem.area}</h3>
                                            <p className="text-xs text-slate-500 font-medium">
                                                {areaItem.topics.length} Ana Konu &amp; {safeGrade}. Sınıf Kazanım Kümesi
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Usta (%75+)
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> Gelişiyor (%25–50)
                                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 ml-2" /> Başlangıç (%0)
                                    </div>
                                </div>

                                {/* Roadmap Track Nodes */}
                                <div className="relative">
                                    <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 z-0" />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
                                        {areaItem.topics.map((topicName) => {
                                            const { progress, badges, meta, status } = getTopicStats(topicName);
                                            const isSelected = selectedTopic === topicName;

                                            return (
                                                <motion.div
                                                    key={`${safeGrade}-${topicName}`}
                                                    whileHover={{ y: -4 }}
                                                    onClick={() => setSelectedTopic(topicName)}
                                                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-48 relative bg-white ${
                                                        isSelected
                                                            ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-lg'
                                                            : 'border-slate-200 hover:border-indigo-300 shadow-sm'
                                                    }`}
                                                >
                                                    {/* Top Tag & Code */}
                                                    <div className="flex items-center justify-between gap-1">
                                                        <span className="font-mono text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                                                            {meta.code}
                                                        </span>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                                            meta.examWeight === 'Çok Yüksek'
                                                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                                : meta.examWeight === 'Yüksek'
                                                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                                : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                            {meta.examWeight} Ağırlık
                                                        </span>
                                                    </div>

                                                    {/* Topic Title */}
                                                    <div>
                                                        <h4 className="font-black text-slate-900 text-sm leading-snug line-clamp-2 mt-2">
                                                            {topicName}
                                                        </h4>
                                                        <div className="flex gap-1 mt-2">
                                                            {badges.length > 0 ? (
                                                                badges.map((b, bi) => (
                                                                    <span key={bi} className="text-xs" title={b}>
                                                                        {b === 'Çırak' ? '🥉' : b === 'Kalfa' ? '🥈' : b === 'Usta' ? '🥇' : '🏆'}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="text-[10px] text-slate-400 font-medium">Henüz rozet yok</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Progress Indicator */}
                                                    <div className="pt-2 border-t border-slate-100 space-y-1">
                                                        <div className="flex justify-between items-center text-[11px] font-bold">
                                                            <span className="text-slate-500">Ustalık</span>
                                                            <span className={status === 'mastered' ? 'text-emerald-600' : status === 'learning' ? 'text-amber-600' : 'text-slate-500'}>
                                                                %{progress}
                                                            </span>
                                                        </div>
                                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full transition-all duration-500 ${
                                                                    status === 'mastered' ? 'bg-emerald-500' : status === 'learning' ? 'bg-amber-500' : 'bg-slate-300'
                                                                }`}
                                                                style={{ width: `${progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* DETAYLI KART GÖRÜNÜMÜ */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {allTopics
                        .filter((item) => filterCategory === 'all' || item.area === filterCategory)
                        .map((item) => {
                            const { progress, badges, meta } = getTopicStats(item.topic);
                            return (
                                <div
                                    key={`${safeGrade}-${item.topic}`}
                                    onClick={() => setSelectedTopic(item.topic)}
                                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-400 cursor-pointer transition-all space-y-4"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                                    {item.area}
                                                </span>
                                                <span className="text-[10px] font-mono font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                                    {meta.code}
                                                </span>
                                            </div>
                                            <h3 className="font-black text-slate-900 text-base">{item.topic}</h3>
                                        </div>
                                        <span className={`text-xs font-black px-2.5 py-1 rounded-xl border shrink-0 ${
                                            meta.examWeight === 'Çok Yüksek'
                                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                : meta.examWeight === 'Yüksek'
                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                : 'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                            {meta.examWeight}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>

                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-slate-500">Kazanım İlerlemesi ({badges.length}/4 Aşama)</span>
                                            <span className="text-indigo-600">%{progress}</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${progress >= 75 ? 'bg-emerald-500' : progress >= 25 ? 'bg-amber-500' : 'bg-slate-300'}`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-1 text-xs">
                                        <div className="flex gap-1">
                                            {badges.length > 0 ? (
                                                badges.map((b, i) => (
                                                    <span key={i} title={b}>{b === 'Çırak' ? '🥉' : b === 'Kalfa' ? '🥈' : b === 'Usta' ? '🥇' : '🏆'}</span>
                                                ))
                                            ) : (
                                                <span className="text-[11px] text-slate-400">Rozet kazanmak için çalış</span>
                                            )}
                                        </div>
                                        <span className="text-indigo-600 font-bold flex items-center gap-1">
                                            Detayları Gör <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}

            {/* TOPIC DETAIL MODAL */}
            <AnimatePresence>
                {selectedTopic && activeModalInfo && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setSelectedTopic(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-6 relative"
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedTopic(null)}
                                className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors font-bold cursor-pointer"
                            >
                                ✕
                            </button>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg">
                                        {activeModalInfo.meta.code}
                                    </span>
                                    <span className="text-xs font-bold text-slate-500">{safeGrade}. Sınıf Müfredatı</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{selectedTopic}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                                    {activeModalInfo.meta.description}
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="font-bold text-slate-500">Sınav Ağırlığı:</span>
                                    <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                        {activeModalInfo.meta.examWeight} Öncelikli
                                    </span>
                                </div>

                                <div>
                                    <span className="font-bold text-slate-700 block mb-1">Gereken Temel Beceriler:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeModalInfo.meta.keySkills.map((sk, idx) => (
                                            <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                                                ✓ {sk}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-200">
                                    <span className="font-bold text-indigo-900 block mb-0.5">Sınavda Nasıl Çıkar?</span>
                                    <p className="text-slate-600 leading-relaxed">{activeModalInfo.meta.typicalQuestions}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                                    4 Aşamalı İlerleme Durumu ({activeModalInfo.badges.length}/4):
                                </span>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                    {[
                                        { badge: 'Çırak', label: '1. Kolay', icon: '🥉', cls: 'bg-amber-100 border-amber-300 text-amber-900' },
                                        { badge: 'Kalfa', label: '2. Orta', icon: '🥈', cls: 'bg-blue-100 border-blue-300 text-blue-900' },
                                        { badge: 'Usta', label: '3. Zor', icon: '🥇', cls: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
                                        { badge: 'Uzman', label: '4. Sınav', icon: '🏆', cls: 'bg-purple-100 border-purple-300 text-purple-900' }
                                    ].map((st) => {
                                        const earned = activeModalInfo.badges.includes(st.badge);
                                        return (
                                            <div
                                                key={st.badge}
                                                className={`p-2.5 rounded-xl border font-bold ${
                                                    earned ? st.cls : 'bg-slate-50 border-slate-200 text-slate-400'
                                                }`}
                                            >
                                                <div className="text-lg">{st.icon}</div>
                                                <div className="text-[10px] font-black">{st.label}</div>
                                                <div className="text-[9px]">{earned ? 'Kazanıldı' : 'Bekliyor'}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {onSelectTopicForStudy && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const target = selectedTopic;
                                        setSelectedTopic(null);
                                        onSelectTopicForStudy(target);
                                    }}
                                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>4 Aşamalı Çalışma Odasında Çöz</span>
                                    <ArrowRight size={16} />
                                </button>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
