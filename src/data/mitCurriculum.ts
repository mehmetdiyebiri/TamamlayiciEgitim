export interface MitCurriculumArea {
    area: string;
    topics: string[];
}

export const MIT_CURRICULUM: Record<5 | 6 | 7 | 8, MitCurriculumArea[]> = {
    5: [
        {
            area: "Sayılar ve Nicelikler",
            topics: [
                "Sayılar ve Nicelikler (1)",
                "Sayılar ve Nicelikler (2)"
            ]
        },
        {
            area: "Cebirsel Düşünme",
            topics: [
                "İşlemlerle Cebirsel Düşünme"
            ]
        },
        {
            area: "Geometri ve Ölçme",
            topics: [
                "Geometrik Şekiller",
                "Geometrik Nicelikler"
            ]
        },
        {
            area: "Veri İşleme ve Olasılık",
            topics: [
                "İstatistiksel Araştırma Süreci",
                "Veriden Olasılığa"
            ]
        }
    ],
    6: [
        {
            area: "Sayılar ve Nicelikler",
            topics: [
                "Sayılar ve Nicelikler (1)",
                "Sayılar ve Nicelikler (2)"
            ]
        },
        {
            area: "Cebirsel Düşünme",
            topics: [
                "İşlemlerle Cebirsel Düşünme ve Değişimler"
            ]
        },
        {
            area: "Geometri ve Ölçme",
            topics: [
                "Geometrik Şekiller",
                "Geometrik Nicelikler"
            ]
        },
        {
            area: "Veri İşleme ve Olasılık",
            topics: [
                "İstatistiksel Araştırma Süreci",
                "Veriden Olasılığa"
            ]
        }
    ],
    7: [
        {
            area: "Sayılar ve Nicelikler",
            topics: [
                "Tam Sayılar ve Mutlak Değer",
                "Rasyonel Sayılarda İşlemler",
                "Oran-Orantı",
                "Yüzde Problemleri"
            ]
        },
        {
            area: "Cebirsel Düşünme",
            topics: [
                "İşlemsel Cebirsel İfadeler"
            ]
        },
        {
            area: "Geometri ve Ölçme",
            topics: [
                "Geometrik Şekiller",
                "Geometrik Nicelikler (1)",
                "Geometrik Nicelikler (2)",
                "Dönüşüm"
            ]
        },
        {
            area: "Veri İşleme ve Olasılık",
            topics: [
                "İstatistiksel Araştırma Süreci",
                "Veriden Olasılığa"
            ]
        }
    ],
    8: [
        {
            area: "Sayılar ve İşlemler",
            topics: [
                "Çarpanlar ve Katlar",
                "Üslü Sayılar",
                "Köklü Sayılar"
            ]
        },
        {
            area: "Cebir",
            topics: [
                "Cebirsel İfadeler",
                "Doğrusal Denklemler ve Eğim",
                "Eşitsizlikler"
            ]
        },
        {
            area: "Geometri ve Ölçme",
            topics: [
                "Üçgenler",
                "Eşlik ve Benzerlik",
                "Dönüşüm Geometrisi",
                "Geometrik Cisimler"
            ]
        },
        {
            area: "Veri İşleme ve Olasılık",
            topics: [
                "Veri Analizi",
                "Olasılık"
            ]
        }
    ]
};
