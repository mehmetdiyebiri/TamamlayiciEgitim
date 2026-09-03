import fs from 'fs';

const curriculum = {
    5: {
        "Sayılar ve İşlemler": ["Doğal Sayılar", "Doğal Sayılarla İşlemler", "Kesirler", "Kesirlerle İşlemler", "Ondalık Gösterim", "Yüzdeler"],
        "Geometri ve Ölçme": ["Temel Geometrik Kavramlar ve Çizimler", "Üçgenler ve Dörtgenler", "Uzunluk ve Zaman Ölçme", "Alan Ölçme", "Geometrik Cisimler"]
    },
    6: {
        "Sayılar ve İşlemler": ["Doğal Sayılarla İşlemler", "Çarpanlar ve Katlar", "Kümeler", "Tam Sayılar", "Kesirlerle İşlemler", "Ondalık Gösterim", "Oran"],
        "Cebir": ["Cebirsel İfadeler"],
        "Geometri ve Ölçme": ["Açılar", "Alan Ölçme", "Çember", "Geometrik Cisimler", "Sıvı Ölçme"]
    },
    7: {
        "Sayılar ve İşlemler": ["Tam Sayılarla İşlemler", "Rasyonel Sayılar", "Rasyonel Sayılarla İşlemler", "Oran ve Orantı", "Yüzdeler"],
        "Cebir": ["Cebirsel İfadeler", "Eşitlik ve Denklem"],
        "Geometri ve Ölçme": ["Doğrular ve Açılar", "Çokgenler", "Çember ve Daire", "Cisimlerin Farklı Yönlerden Görünümleri"]
    },
    8: {
        "Sayılar ve İşlemler": ["Çarpanlar ve Katlar", "Üslü İfadeler", "Kareköklü İfadeler"],
        "Cebir": ["Cebirsel İfadeler ve Özdeşlikler", "Doğrusal Denklemler", "Eşitsizlikler"],
        "Geometri ve Ölçme": ["Üçgenler", "Dönüşüm Geometrisi", "Eşlik ve Benzerlik", "Geometrik Cisimler"]
    }
};

function generateMath(subTopic, diff, index) {
    let n1 = index + 2;
    let n2 = index + 3;
    if (diff === 'medium') { n1 += 10; n2 += 5; }
    if (diff === 'hard') { n1 += 25; n2 += 15; }

    let q = "";
    let ans = "";
    let hint = "";
    let others = [];

    if (subTopic.includes("Kesir") || subTopic.includes("Rasyonel")) {
        ans = `${n1}/${n2}`;
        q = `${n1*2}/${n2*2} kesrinin en sade hali aşağıdakilerden hangisidir?`;
        hint = `Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin.`;
        others = [`${n1+1}/${n2}`, `${n1}/${n2+1}`, `${n2}/${n1}`];
    } else if (subTopic.includes("Ondalık")) {
        let val = (n1 / 10).toFixed(1);
        ans = `${val}`;
        q = `${n1}/10 kesrinin ondalık gösterimi nedir?`;
        hint = `Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır.`;
        others = [`${(n1/100).toFixed(2)}`, `${(n1/10 + 1).toFixed(1)}`, `${(n1).toFixed(1)}`];
    } else if (subTopic.includes("Yüzde")) {
        ans = `${n1}`;
        q = `${n1 * 10} sayısının %10'u kaçtır?`;
        hint = `Bir sayının %10'unu bulmak için 10'a bölebilirsiniz.`;
        others = [`${n1 * 2}`, `${n1 + 10}`, `${n1 * 5}`];
    } else if (subTopic.includes("Alan") || subTopic.includes("Çokgen") || subTopic.includes("Üçgen")) {
        ans = `${n1 * n2}`;
        q = `Kenar uzunlukları ${n1} cm ve ${n2} cm olan dikdörtgenin alanı kaç cm²'dir?`;
        hint = `Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (${n1} x ${n2}).`;
        others = [`${n1 * n2 + 2}`, `${n1 * n2 - 2}`, `${n1 * n2 + 4}`];
    } else if (subTopic.includes("Çember") || subTopic.includes("Açı")) {
        ans = `${n1 * 6}`;
        q = `Yarıçapı ${n1} cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)`;
        hint = `Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x ${n1})`;
        others = [`${n1 * 3}`, `${n1 * 2}`, `${n1 * 4}`];
    } else if (subTopic.includes("Cebir") || subTopic.includes("Denklem") || subTopic.includes("Eşitsizlik")) {
        ans = `${n2}`;
        q = `2x - ${n1} = ${n2*2 - n1} denkleminde x kaçtır?`;
        hint = `Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın.`;
        others = [`${n2 + 1}`, `${n2 - 1}`, `${n2 + 2}`];
    } else if (subTopic.includes("Çarpan") || subTopic.includes("Kat")) {
        ans = `${n1 * 2}`;
        q = `EBOB(${n1 * 2}, ${n1 * 4}) kaçtır?`;
        hint = `Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir.`;
        others = [`${n1 * 4}`, `${n1}`, `${n1 * 8}`];
    } else if (subTopic.includes("Üslü")) {
        ans = `${n1 * n1}`;
        q = `${n1}² ifadesinin değeri kaçtır?`;
        hint = `Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (${n1} x ${n1}).`;
        others = [`${n1 * 2}`, `${n1 * n1 + 1}`, `${n1 * n1 - 1}`];
    } else if (subTopic.includes("Kareköklü")) {
        ans = `${n1}`;
        q = `√${n1 * n1} ifadesinin değeri kaçtır?`;
        hint = `Hangi sayının karesinin ${n1 * n1} olduğunu düşünün.`;
        others = [`${n1 + 1}`, `${n1 - 1}`, `${n1 * 2}`];
    } else if (subTopic.includes("Küme")) {
        ans = `${n1}`;
        q = `A = {1, 2, 3, ..., ${n1}} kümesinin eleman sayısı kaçtır?`;
        hint = `Kümenin içinde 1'den ${n1}'e kadar ardışık sayılar bulunmaktadır.`;
        others = [`${n1 + 1}`, `${n1 - 1}`, `${n1 + 2}`];
    } else if (subTopic.includes("Oran")) {
        ans = `${n2 * 2}`;
        q = `Bir sınıftaki kızların sayısının erkeklerin sayısına oranı ${n1}/${n2}'dir. Bu sınıfta ${n1*2} kız varsa kaç erkek vardır?`;
        hint = `Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz.`;
        others = [`${n2 * 3}`, `${n2 + 2}`, `${n2 * 2 + 2}`];
    } else if (subTopic.includes("Geometrik Cisim") || subTopic.includes("Hacim") || subTopic.includes("Sıvı")) {
        ans = `${n1 * n2 * 2}`;
        q = `Ayrıt uzunlukları ${n1} cm, ${n2} cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?`;
        hint = `Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir.`;
        others = [`${n1 * n2 * 3}`, `${n1 * n2}`, `${n1 * n2 * 2 + 5}`];
    } else {
        ans = `${n1 + n2}`;
        q = `${n1} + ${n2} işleminin sonucu kaçtır?`;
        hint = `Sayıları toplayın.`;
        others = [`${n1 + n2 + 1}`, `${n1 + n2 - 1}`, `${n1 + n2 + 2}`];
    }

    let options = [ans, ...others];
    // Simple shuffle
    options = options.sort(() => Math.random() - 0.5);

    return { q, ans, options, hint };
}

const output = { 5: [], 6: [], 7: [], 8: [] };
let idCounter = 1;

for (const [grade, topics] of Object.entries(curriculum)) {
    for (const [mainTopic, subTopics] of Object.entries(topics)) {
        for (const subTopic of subTopics) {
            for (let i = 0; i < 30; i++) {
                let diff = i < 10 ? 'easy' : (i < 20 ? 'medium' : 'hard');
                const mathData = generateMath(subTopic, diff, i);
                
                output[grade].push({
                    id: idCounter++,
                    topic: mainTopic,
                    subTopic: subTopic,
                    difficulty: diff,
                    q: mathData.q,
                    options: mathData.options,
                    ans: mathData.ans,
                    hint: mathData.hint
                });
            }
        }
    }
}

const tsContent = `export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionType {
    id: number;
    topic: string;
    subTopic: string;
    difficulty: Difficulty;
    q: string;
    options: string[];
    ans: string;
    hint: string;
}

export const QUESTIONS: Record<number, QuestionType[]> = ${JSON.stringify(output, null, 4)};
`;

fs.writeFileSync('src/data/questions.ts', tsContent);
console.log('Successfully generated questions!');
