import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, CheckCircle2, AlertTriangle, ArrowRight, Award, BookOpen, Brain, Sparkles, Filter, Layers, Target, Compass, ChevronRight, Zap, ShieldAlert, Star } from 'lucide-react';
import { MIT_CURRICULUM } from '../../../data/mitCurriculum';

interface VisualLearningMapProps {
    grade: number;
    onSelectTopicForStudy?: (topic: string) => void;
}

// Kazanım metadata with MEB codes, exam weight, and critical hints
interface KazanımMeta {
    code: string;
    examWeight: 'Çok Yüksek' | 'Yüksek' | 'Orta' | 'Temel';
    description: string;
    keySkills: string[];
    typicalQuestions: string;
}

const KAZANIM_INFO: Record<string, KazanımMeta> = {
    // 5. Sınıf
    "Doğal Sayılar": {
        code: "M.5.1.1.1",
        examWeight: "Yüksek",
        description: "En çok dokuz basamaklı doğal sayıları okur, yazar ve basamak değerlerini belirler.",
        keySkills: ["Bölükler ve basamaklar", "Basamak değeri çözümleme", "Örüntüler"],
        typicalQuestions: "Bursluluk sınavında basamak değeri farkı ve kuralı verilen sayı örüntüleri sorulur."
    },
    "Doğal Sayılarla İşlemler": {
        code: "M.5.1.2.1",
        examWeight: "Çok Yüksek",
        description: "Dört işlem gerektiren problemleri çözer ve zihinden işlem stratejilerini uygular.",
        keySkills: ["Çok basamaklı çarpma/bölme", "Kalanlı bölme yorumu", "Parantezli işlemler"],
        typicalQuestions: "Gerçek hayat kurgulu çok adımlı problem ve eksik rakam bulma soruları."
    },
    "Kesirler": {
        code: "M.5.1.3.1",
        examWeight: "Çok Yüksek",
        description: "Birim kesirleri sıralar, tam sayılı ve bileşik kesirleri birbirine dönüştürür, denk kesirleri kavrar.",
        keySkills: ["Sayı doğrusunda gösterme", "Sadeleştirme ve genişletme", "Bileşik-Tam sayılı dönüşümü"],
        typicalQuestions: "Modelleme ve sayı doğrusunda sıralama kurguları."
    },
    "Kesirlerle İşlemler": {
        code: "M.5.1.4.1",
        examWeight: "Çok Yüksek",
        description: "Paydaları eşit veya birinin paydası diğerinin katı olan kesirlerle toplama ve çıkarma yapar.",
        keySkills: ["Payda eşitleme", "Bütün-parça ilişkisi", "Kesir problemleri"],
        typicalQuestions: "Bir miktar paranın veya yolun belirli kesirlerle harcanması problemleri."
    },
    "Ondalık Gösterim": {
        code: "M.5.1.5.1",
        examWeight: "Yüksek",
        description: "Paydası 10, 100 veya 1000 olan kesirleri ondalık gösterimle yazar ve basamak değerlerini açıklar.",
        keySkills: ["Virgül basamakları", "Ondalık sıralama", "Toplama ve çıkarma"],
        typicalQuestions: "Market fişi veya ölçüm cetveli üzerinden hesaplama soruları."
    },
    "Yüzdeler": {
        code: "M.5.1.6.1",
        examWeight: "Yüksek",
        description: "Paydası 100 olan kesirleri yüzde sembolü ile gösterir; kesir, ondalık ve yüzde gösterimlerini karşılaştırır.",
        keySkills: ["% sembolü", "Çokluğun yüzdesini bulma", "Gösterim dönüşümü"],
        typicalQuestions: "İndirim, kâr ve oran karşılaştırma problemleri."
    },
    "Temel Geometrik Kavramlar ve Çizimler": {
        code: "M.5.2.1.1",
        examWeight: "Orta",
        description: "Doğru, doğru parçası, ışın, dikme çizimi ve paralel doğruları ayırt eder.",
        keySkills: ["Noktanın noktaya göre konumu", "Eşit uzunlukta parçalar", "Açı çeşitleri"],
        typicalQuestions: "Kareli zeminde konum ve paralel doğru çizimleri."
    },
    "Üçgenler ve Dörtgenler": {
        code: "M.5.2.2.1",
        examWeight: "Yüksek",
        description: "Açılarına ve kenarlarına göre üçgenleri sınıflandırır; iç açılar toplamını keşfeder.",
        keySkills: ["İç açılar toplamı 180°", "Dörtgenlerin iç açıları 360°", "İkizkenar ve eşkenar özellikler"],
        typicalQuestions: "Bilinmeyen açı bulma ve üçgen eşitsizliği başlangıç kurguları."
    },
    "Uzunluk ve Zaman Ölçme": {
        code: "M.5.2.3.1",
        examWeight: "Orta",
        description: "Uzunluk ve zaman ölçü birimlerini birbirine dönüştürür ve çevre uzunluklarını hesaplar.",
        keySkills: ["m, cm, mm dönüşümleri", "Saat-dakika-saniye hesapları", "Çevre problemleri"],
        typicalQuestions: "Otobüs sefer tarifeleri ve tel çerçeve çevre hesapları."
    },
    "Alan Ölçme": {
        code: "M.5.2.4.1",
        examWeight: "Yüksek",
        description: "Dikdörtgenin alanını hesaplar; aynı alana sahip farklı dikdörtgenler oluşturur.",
        keySkills: ["Kare ve dikdörtgen alanı", "Birim kare sayma", "Alan-çevre ilişkisi"],
        typicalQuestions: "Parke döşeme, tarla bölme ve kenar uzunlukları tam sayı olan dikdörtgenler."
    },
    "Geometrik Cisimler": {
        code: "M.5.2.5.1",
        examWeight: "Temel",
        description: "Dikdörtgenler prizmasını tanır ve temel elemanlarını belirler.",
        keySkills: ["Ayrıt, köşe, yüz sayısı", "Açınım kavrama"],
        typicalQuestions: "Küp ve prizma açınımından cisim oluşturma."
    },
    "Veri Toplama ve Değerlendirme": {
        code: "M.5.3.1.1",
        examWeight: "Yüksek",
        description: "Verileri sıklık tablosu ve sütun grafiği ile gösterir, yorumlar.",
        keySkills: ["Sütun grafiği okuma", "Çetele ve sıklık tablosu"],
        typicalQuestions: "Tablo ve grafik arası dönüşüm, karşılaştırma soruları."
    },

    // 6. Sınıf
    "Kümeler": {
        code: "M.6.1.3.1",
        examWeight: "Orta",
        description: "Kümeler ile ilgili temel kavramları açıklar; kesişim ve birleşim işlemlerini yapar.",
        keySkills: ["Liste ve Venn şeması", "Eleman sayısı", "Kesişim ve birleşim"],
        typicalQuestions: "Ortak bölenler veya ortak katlar kümesi oluşturma soruları."
    },
    "Tam Sayılar": {
        code: "M.6.1.4.1",
        examWeight: "Çok Yüksek",
        description: "Tam sayıları tanır, sayı doğrusunda gösterir ve mutlak değerini açıklar.",
        keySkills: ["Pozitif ve negatif yön", "Mutlak değer", "Tam sayılarda sıralama"],
        typicalQuestions: "Termometre, deniz seviyesi ve asansör senaryoları."
    },
    "Oran": {
        code: "M.6.1.7.1",
        examWeight: "Yüksek",
        description: "İki çokluğun oranını belirler; birimli ve birimsiz oranları ayırt eder.",
        keySkills: ["Oran yazımı", "Sadeleştirme", "Birim dönüştürme (km/sa -> m/sn)"],
        typicalQuestions: "Karışım oranları ve araç hız karşılaştırmaları."
    },
    "Cebirsel İfadeler": {
        code: "M.6.2.1.1",
        examWeight: "Çok Yüksek",
        description: "Cebirsel ifadeleri yazar, katsayı ve terimlerini belirler, değişkenin değerine göre sonucunu bulur.",
        keySkills: ["Sözel durumu cebirsel yazma", "Terim, katsayı, sabit terim", "Değişken yerine sayı yazma"],
        typicalQuestions: "Ücret tarifeleri ve geometri kenar formüllerini cebirsel modelleme."
    },
    "Açılar": {
        code: "M.6.3.1.1",
        examWeight: "Yüksek",
        description: "Komşu, tümler, bütünler ve ters açıların özelliklerini belirler ve problemler çözer.",
        keySkills: ["Tümler açı (90°)", "Bütünler açı (180°)", "Ters açılar"],
        typicalQuestions: "Kesişen doğrular ve saat akrep-yelkovan açıları."
    },

    // 7. Sınıf
    "Tam Sayılarla İşlemler": {
        code: "M.7.1.1.1",
        examWeight: "Çok Yüksek",
        description: "Tam sayılarla toplama, çıkarma, çarpma, bölme işlemlerini ve üslü nicelikleri hesaplar.",
        keySkills: ["İşaret kuralları (+, -)", "İşlem önceliği", "Tam sayı problemleri"],
        typicalQuestions: "Hedef tahtası puanlama, sınav net hesabı ve hava sıcaklığı farkları."
    },
    "Rasyonel Sayılar": {
        code: "M.7.1.2.1",
        examWeight: "Yüksek",
        description: "Rasyonel sayıları tanır, sayı doğrusunda gösterir ve devirli ondalık açılımları inceler.",
        keySkills: ["a/b gösterimi", "Devirli ondalık sayılar", "Sayı doğrusunda sıralama"],
        typicalQuestions: "Sayı doğrusunda harflere karşılık gelen kesirleri bulma."
    },
    "Rasyonel Sayılarla İşlemler": {
        code: "M.7.1.3.1",
        examWeight: "Çok Yüksek",
        description: "Rasyonel sayılarla çok adımlı işlemleri ve üslü ifadeleri çözer.",
        keySkills: ["Çok adımlı merdivenli işlemler", "Rasyonel sayıların kare ve küpü", "Problem çözme"],
        typicalQuestions: "Adım adım kesir işlemleri ve kurgulu para/ürün paylaşım problemleri."
    },
    "Oran ve Orantı": {
        code: "M.7.1.4.1",
        examWeight: "Çok Yüksek",
        description: "Doğru ve ters orantıyı kavrar; orantı sabiti ve ölçek problemlerini çözer.",
        keySkills: ["İçler-dışlar çarpımı", "Ters orantı mantığı", "Harita ölçeği"],
        typicalQuestions: "İşçi-zaman, dişli çarklar ve tarifelerde orantı."
    },
    "Eşitlik ve Denklem": {
        code: "M.7.2.2.1",
        examWeight: "Çok Yüksek",
        description: "Birinci dereceden bir bilinmeyenli denklemleri kurar ve çözer.",
        keySkills: ["Bilinmeyeni yalnız bırakma", "Parantezli denklem dağıtma", "Denklem kurma problemleri"],
        typicalQuestions: "LGS'nin temel taşı: Yaş, sayı, sıra ve kesir problemleri."
    },
    "Doğrular ve Açılar": {
        code: "M.7.3.1.1",
        examWeight: "Yüksek",
        description: "İki paralel doğrunun bir kesenle yaptığı yöndeş, iç ters, dış ters ve karşı durumlu açıları inceler.",
        keySkills: ["Z, M, U, Kalem ucu kuralları", "Açıortay"],
        typicalQuestions: "Yol ve boru hatları krokisi üzerinde paralel doğru açıları."
    },
    "Çokgenler": {
        code: "M.7.3.2.1",
        examWeight: "Yüksek",
        description: "Düzgün çokgenlerin iç ve dış açılarını hesaplar; paralelkenar, eşkenar dörtgen ve yamuğun alanını bulur.",
        keySkills: ["(n-2)×180° formülü", "Yamuk ve eşkenar dörtgen alanı", "Düzgün altıgen/sekizgen"],
        typicalQuestions: "Karo döşeme, açı tamamlama ve park bahçe alanı hesapları."
    },
    "Çember ve Daire": {
        code: "M.7.3.3.1",
        examWeight: "Yüksek",
        description: "Çemberde merkez açı ve gördüğü yayı belirler; dairenin alanını ve dilim alanını hesaplar.",
        keySkills: ["Çevre = 2πr", "Alan = πr²", "Daire dilimi alanı ve yay uzunluğu"],
        typicalQuestions: "Tekerlek dönme tur sayısı ve pizza dilimi alanı soruları."
    },

    // 8. Sınıf (LGS)
    "Çarpanlar ve Katlar": {
        code: "M.8.1.1.1",
        examWeight: "Çok Yüksek",
        description: "Pozitif tam sayıların çarpanlarını, asal çarpanlarını bulur; EBOB ve EKOK problemlerini çözer.",
        keySkills: ["EBOB (Bütünden parçaya)", "EKOK (Parçadan bütüne)", "Aralarında asallık"],
        typicalQuestions: "LGS'de garanti 1-2 soru: Fayans döşeme, nöbet tutma, paketleme ve ortak kenarlı tarlalar."
    },
    "Üslü İfadeler": {
        code: "M.8.1.2.1",
        examWeight: "Çok Yüksek",
        description: "Tam sayıların tam sayı kuvvetlerini hesaplar; üslü ifadelerle çarpma, bölme, bilimsel gösterim ve çok küçük/büyük sayıları çözer.",
        keySkills: ["Negatif üs", "Üssün üssü", "Bilimsel gösterim (1 ≤ |a| < 10)"],
        typicalQuestions: "LGS'de garanti 2-3 soru: Mikroorganizma üremesi, veri depolama ve nano ölçekli ölçümler."
    },
    "Kareköklü İfadeler": {
        code: "M.8.1.3.1",
        examWeight: "Çok Yüksek",
        description: "Tam kare sayıların kareköklerini belirler; kareköklü ifadelerde dört işlem, a√b biçimi ve gerçek sayıları sınıflandırır.",
        keySkills: ["Tam kareler (1..400)", "a√b biçiminde yazma", "Kök içine alma", "Ondalık karekök"],
        typicalQuestions: "LGS'de garanti 3 soru: Kenar uzunluğu tahmini, kareli zemin alanları ve cetvel üstünde uzunluk."
    },
    "Veri Analizi": {
        code: "M.8.4.1.1",
        examWeight: "Çok Yüksek",
        description: "En fazla üç veri grubuna ait verileri daire, sütun veya çizgi grafiği ile gösterir ve birbirine dönüştürür.",
        keySkills: ["Daire grafiği (360° orantısı)", "Grafikler arası dönüşüm", "Yorumlama"],
        typicalQuestions: "LGS'de kesin soru: Daire grafiğindeki derece dağılımını sütun grafiğindeki adetlere dönüştürme."
    },
    "Basit Olayların Olma Olasılığı": {
        code: "M.8.5.1.1",
        examWeight: "Yüksek",
        description: "Bir olayın olma olasılığını hesaplar; kesin olay, imkansız olay ve eş olasılığı açıklar.",
        keySkills: ["İstenen durum / Tüm durumlar", "Olasılık değeri (0..1)", "Kombinasyonlu seçim"],
        typicalQuestions: "Kutuya atılan kartlar, torbadan çekilen bilyeler ve koşullu olasılık kurguları."
    },
    "Cebirsel İfadeler ve Özdeşlikler": {
        code: "M.8.2.1.1",
        examWeight: "Çok Yüksek",
        description: "Özdeşlikleri modeller ve cebirsel ifadeleri çarpanlarına ayırır.",
        keySkills: ["(a+b)²", "(a-b)²", "a²-b² (İki kare farkı)", "Ortak çarpan parantezi"],
        typicalQuestions: "LGS'de garanti 2 soru: Katlanan kağıtların kesilip açılması, boyalı bölge alanı modellemesi."
    },
    "Doğrusal Denklemler": {
        code: "M.8.2.2.1",
        examWeight: "Çok Yüksek",
        description: "Doğrusal ilişkiyi inceler, grafik çizer, eğimi açıklar ve denklem sistemlerini çözer.",
        keySkills: ["Eğim = Dikey / Yatay", "Doğru grafiği çizimi", "Bağımlı ve bağımsız değişken"],
        typicalQuestions: "LGS'de garanti 2-3 soru: Rampa eğimi, su deposu dolum grafiği, taksimetre ve fidan boyu."
    },
    "Eşitsizlikler": {
        code: "M.8.2.3.1",
        examWeight: "Yüksek",
        description: "Birinci dereceden bir bilinmeyenli eşitsizlikleri kurar, sayı doğrusunda gösterir ve çözer.",
        keySkills: ["Eşitsizlik işaretleri (≤, ≥, <, >)", "Negatif sayı ile çarpma/bölmede yön değişimi"],
        typicalQuestions: "Kargo ağırlık sınırları, asansör taşıma kapasitesi ve karlı alışveriş şartı."
    },
    "Üçgenler": {
        code: "M.8.3.1.1",
        examWeight: "Çok Yüksek",
        description: "Üçgende kenarortay, açıortay, yükseklik çizer; üçgen eşitsizliği, açı-kenar bağıntıları ve Pisagor teoremini uygular.",
        keySkills: ["Üçgen eşitsizliği", "Pisagor: a² + b² = c²", "Özel üçgenler (3-4-5, 5-12-13, 8-15-17)"],
        typicalQuestions: "LGS'de garanti 2-3 soru: Katlanan üçgen açıortayı, kaydırak ve merdiven Pisagor bağıntısı."
    },
    "Eşlik ve Benzerlik": {
        code: "M.8.3.3.1",
        examWeight: "Yüksek",
        description: "Eş ve benzer çokgenlerin benzerlik oranını belirler; alanları ve kenarları arasındaki ilişkiyi kurar.",
        keySkills: ["Benzerlik oranı (k)", "Alanlar oranı (k²)", "Gölge boyu ve fener mesafesi"],
        typicalQuestions: "Fotoğraf büyütme, gölge boyu hesabı ve benzer üçgen oranları."
    },
    "Dönüşüm Geometrisi": {
        code: "M.8.3.2.1",
        examWeight: "Orta",
        description: "Öteleme ve yansıma hareketlerini koordinat düzleminde inceler.",
        keySkills: ["x ve y eksenine göre yansıma", "Öteleme (sağa/sola/yukarı/aşağı)", "Simetri doğrusu"],
        typicalQuestions: "Koordinat düzleminde şekil ötelemesi ve ayna yansıması."
    },
    "Geometrik Cisimler (8)": {
        code: "M.8.3.4.1",
        examWeight: "Yüksek",
        description: "Dik prizma, dik dairesel silindir, piramit ve koniyi tanır; yüzey alanı ve hacim hesaplarını yapar.",
        keySkills: ["Silindirin açınımı", "Silindir yanal alanı = 2πrh", "Hacim = Taban Alanı × Yükseklik"],
        typicalQuestions: "Kutu ve su borusu boyama, rulo etiket açınımı ve paketleme problemleri."
    }
};

export const VisualLearningMap = ({ grade, onSelectTopicForStudy }: VisualLearningMapProps) => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [viewStyle, setViewStyle] = useState<'roadmap' | 'cards'>('roadmap');

    const curriculum = useMemo(() => {
        return (MIT_CURRICULUM as any)[grade] || [];
    }, [grade]);

    // Calculate deterministic progress and earned badges from localStorage
    const savedBadges: Record<string, string[]> = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('mit_study_badges') || '{}');
        } catch {
            return {};
        }
    }, []);

    // Deterministic progress based on topic string and saved badges
    const getTopicStats = (topic: string) => {
        const badges = savedBadges[topic] || [];
        const hasUzman = badges.includes('Uzman');
        const hasUsta = badges.includes('Usta');
        const hasKalfa = badges.includes('Kalfa');
        const hasCirak = badges.includes('Çırak');

        let progress = 20;
        if (hasUzman) progress = 100;
        else if (hasUsta) progress = 85;
        else if (hasKalfa) progress = 60;
        else if (hasCirak) progress = 40;
        else {
            // Seeded demo progress for visual satisfaction
            let hash = 0;
            for (let i = 0; i < topic.length; i++) hash = topic.charCodeAt(i) + ((hash << 5) - hash);
            progress = 30 + Math.abs(hash % 50);
        }

        const meta = KAZANIM_INFO[topic] || {
            code: `M.${grade}.1.0`,
            examWeight: 'Yüksek',
            description: `${topic} temel kavramlarını kavrar ve problemler çözer.`,
            keySkills: ['Kavram ve Tanım', 'Çok Adımlı İşlem', 'Beceri Temelli Muhakeme'],
            typicalQuestions: 'Sınavda analitik ve çok adımlı problem olarak karşımıza çıkar.'
        };

        return {
            progress,
            badges,
            meta,
            status: progress >= 80 ? 'mastered' : progress >= 50 ? 'learning' : 'needs_work'
        };
    };

    // Calculate overall stats
    const allTopics = useMemo(() => {
        const list: { topic: string; area: string }[] = [];
        curriculum.forEach((c: any) => {
            c.topics.forEach((t: string) => list.push({ topic: t, area: c.area }));
        });
        return list;
    }, [curriculum]);

    const totalTopics = allTopics.length;
    const statsList = useMemo(() => allTopics.map(item => ({ ...item, ...getTopicStats(item.topic) })), [allTopics, savedBadges]);

    const averageProgress = Math.round(statsList.reduce((acc, curr) => acc + curr.progress, 0) / Math.max(1, totalTopics));
    const masteredCount = statsList.filter(s => s.status === 'mastered').length;
    const learningCount = statsList.filter(s => s.status === 'learning').length;
    const needsWorkCount = statsList.filter(s => s.status === 'needs_work').length;

    const filteredAreas = useMemo(() => {
        if (filterCategory === 'all') return curriculum;
        return curriculum.filter((c: any) => c.area === filterCategory);
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
                            <span>{grade}. Sınıf MEB Kazanım Matrisi</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Görsel Matematik Kazanım Haritası
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {grade}. sınıf müfredatındaki tüm kazanımları şematik yol haritası üzerinde takip edin. Her konunun MEB kodu, sınav ağırlığı ve 4 aşamalı ustalık seviyesini inceleyin.
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
                                    className="text-emerald-400 transition-all duration-1000"
                                    strokeDasharray={`${averageProgress}, 100`}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <span className="absolute text-lg font-black text-white">%{averageProgress}</span>
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
                            onClick={() => setFilterCategory('all')}
                            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                                filterCategory === 'all'
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                            }`}
                        >
                            Tümü ({totalTopics})
                        </button>
                        {curriculum.map((c: any) => (
                            <button
                                key={c.area}
                                onClick={() => setFilterCategory(c.area)}
                                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
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
                            onClick={() => setViewStyle('roadmap')}
                            className={`px-3 py-1 rounded-lg font-black transition-all flex items-center gap-1.5 ${
                                viewStyle === 'roadmap' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Compass size={13} /> Şematik Yol Haritası
                        </button>
                        <button
                            onClick={() => setViewStyle('cards')}
                            className={`px-3 py-1 rounded-lg font-black transition-all flex items-center gap-1.5 ${
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
                /* ŞEMATİK YOL HARİTASI (Visual Subway / Learning Path) */
                <div className="space-y-8">
                    {filteredAreas.map((areaItem: any, areaIdx: number) => {
                        const areaColor =
                            areaItem.area.includes('Sayı') ? 'indigo' :
                            areaItem.area.includes('Cebir') ? 'purple' :
                            areaItem.area.includes('Geometri') ? 'emerald' :
                            areaItem.area.includes('Veri') ? 'amber' : 'rose';

                        return (
                            <div key={areaItem.area} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                                {/* Area Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm bg-${areaColor}-100 text-${areaColor}-800 border border-${areaColor}-200`}>
                                            0{areaIdx + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">{areaItem.area}</h3>
                                            <p className="text-xs text-slate-500 font-medium">
                                                {areaItem.topics.length} Ana Konu & MEB Kazanım Kümesi
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Tamamlandı
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> Gelişiyor
                                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 ml-2" /> Başlangıç
                                    </div>
                                </div>

                                {/* Roadmap Track Nodes */}
                                <div className="relative">
                                    {/* Connecting SVG Path Line for desktop */}
                                    <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 z-0" />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
                                        {areaItem.topics.map((topicName: string, tIdx: number) => {
                                            const { progress, badges, meta, status } = getTopicStats(topicName);
                                            const isSelected = selectedTopic === topicName;

                                            return (
                                                <motion.div
                                                    key={topicName}
                                                    whileHover={{ y: -4 }}
                                                    onClick={() => setSelectedTopic(topicName)}
                                                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between h-48 relative bg-white ${
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
                                                            meta.examWeight === 'Çok Yüksek' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                                            meta.examWeight === 'Yüksek' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                            'bg-slate-100 text-slate-600'
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
                        .filter(item => filterCategory === 'all' || item.area === filterCategory)
                        .map(item => {
                            const { progress, badges, meta, status } = getTopicStats(item.topic);
                            return (
                                <div
                                    key={item.topic}
                                    onClick={() => setSelectedTopic(item.topic)}
                                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-400 cursor-pointer transition-all space-y-4"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                                    {item.area}
                                                </span>
                                                <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                                    {meta.code}
                                                </span>
                                            </div>
                                            <h3 className="font-black text-slate-900 text-base">{item.topic}</h3>
                                        </div>
                                        <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                                            meta.examWeight === 'Çok Yüksek' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                            {meta.examWeight}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>

                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-slate-500">Kazanım İlerlemesi</span>
                                            <span className="text-indigo-600">%{progress}</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${progress >= 80 ? 'bg-emerald-500' : progress >= 50 ? 'bg-amber-500' : 'bg-slate-300'}`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-1 text-xs">
                                        <div className="flex gap-1">
                                            {badges.map((b, i) => (
                                                <span key={i} title={b}>{b === 'Çırak' ? '🥉' : b === 'Kalfa' ? '🥈' : b === 'Usta' ? '🥇' : '🏆'}</span>
                                            ))}
                                        </div>
                                        <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Detayları Gör <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}

            {/* TOPIC DETAIL MODAL / DRAWER */}
            <AnimatePresence>
                {selectedTopic && activeModalInfo && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-6 relative"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedTopic(null)}
                                className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors font-bold"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg">
                                        {activeModalInfo.meta.code}
                                    </span>
                                    <span className="text-xs font-bold text-slate-500">{grade}. Sınıf Müfredatı</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{selectedTopic}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                                    {activeModalInfo.meta.description}
                                </p>
                            </div>

                            {/* Sınav ve Beceri Bilgi Kartı */}
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

                            {/* 4 Aşama Rozet Durumu */}
                            <div className="space-y-2">
                                <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                                    4 Aşamalı İlerleme Durumu:
                                </span>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                    <div className={`p-2.5 rounded-xl border font-bold ${
                                        activeModalInfo.badges.includes('Çırak') ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                                    }`}>
                                        <div className="text-lg">🥉</div>
                                        <div className="text-[10px] font-black">1. Kolay</div>
                                        <div className="text-[9px]">{activeModalInfo.badges.includes('Çırak') ? 'Kazanıldı' : 'Kilitli'}</div>
                                    </div>
                                    <div className={`p-2.5 rounded-xl border font-bold ${
                                        activeModalInfo.badges.includes('Kalfa') ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                                    }`}>
                                        <div className="text-lg">🥈</div>
                                        <div className="text-[10px] font-black">2. Orta</div>
                                        <div className="text-[9px]">{activeModalInfo.badges.includes('Kalfa') ? 'Kazanıldı' : 'Kilitli'}</div>
                                    </div>
                                    <div className={`p-2.5 rounded-xl border font-bold ${
                                        activeModalInfo.badges.includes('Usta') ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                                    }`}>
                                        <div className="text-lg">🥇</div>
                                        <div className="text-[10px] font-black">3. Zor</div>
                                        <div className="text-[9px]">{activeModalInfo.badges.includes('Usta') ? 'Kazanıldı' : 'Kilitli'}</div>
                                    </div>
                                    <div className={`p-2.5 rounded-xl border font-bold ${
                                        activeModalInfo.badges.includes('Uzman') ? 'bg-purple-100 border-purple-300 text-purple-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                                    }`}>
                                        <div className="text-lg">🏆</div>
                                        <div className="text-[10px] font-black">4. Sınav</div>
                                        <div className="text-[9px]">{activeModalInfo.badges.includes('Uzman') ? 'Kazanıldı' : 'Kilitli'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setSelectedTopic(null)}
                                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                                >
                                    Kapat
                                </button>
                                {onSelectTopicForStudy && (
                                    <button
                                        onClick={() => {
                                            const t = selectedTopic;
                                            setSelectedTopic(null);
                                            onSelectTopicForStudy(t);
                                        }}
                                        className="flex-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Brain size={16} /> Çalışma Odasında 4 Aşamayla Çöz
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
