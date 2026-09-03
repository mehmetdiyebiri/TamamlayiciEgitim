const fs = require('fs');

const code = `import React, { useState, useMemo } from 'react';
import { BookOpen, Brain, Target, Book, Edit3, BarChart2, Award, ChevronRight, CheckCircle2, AlertCircle, RefreshCw, Star, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentMakalePanelProps {
    state: any;
    actions: any;
}

const CATEGORIES = ['Bilim', 'Tarih', 'Teknoloji', 'Sanat', 'Coğrafya', 'Edebiyat'];

// Generate 24 articles, 4 for each category
const ALL_ARTICLES = CATEGORIES.flatMap((cat, cIdx) => 
    Array.from({ length: 4 }).map((_, i) => ({
        id: cIdx * 4 + i + 1,
        title: \`\${cat} Üzerine Kapsamlı Makale \${i + 1}\`,
        theme: cat,
        duration: 10 + i * 2,
        difficulty: i === 0 ? 'Kolay' : i < 3 ? 'Orta' : 'Zor',
        status: (cIdx === 0 && i === 0) ? 'completed' : 'active',
        skills: ['Ana Fikir', 'Çıkarım'],
        text: \`Bu makale \${cat} alanındaki gelişmeleri incelemektedir. Yapay zekanın gelişimi ile birlikte insanlık yeni bir çağa adım atmıştır. Sadece algoritmalar değil, karar verebilen sistemler hayatımızın bir parçası oldu. Ancak bu, etiğin ve insan sorumluluğunun ortadan kalktığı anlamına gelmez. Teknoloji bizi nereye götürürse götürsün, nihai karar insanda kalmalıdır. Bu süreçte inovasyon ve etik arasında hassas bir denge kurmak zorundayız. (\${cat} konusu detayları...)\`,
        idealAnswer: \`\${cat} alanındaki gelişmeler ve etik değerler arasındaki denge.\`
    }))
);

export function StudentMakalePanel({ state, actions }: StudentMakalePanelProps) {
    const [activeSection, setActiveSection] = useState('makale_okulu');
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
    const [wordPool, setWordPool] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Bilim');
    
    // States for Paragraf
    const [paraQIndex, setParaQIndex] = useState(0);
    const [paraSelectedOption, setParaSelectedOption] = useState<number | null>(null);
    const [paraIsAnswered, setParaIsAnswered] = useState(false);
    
    // States for Sözel Mantık
    const [logicQIndex, setLogicQIndex] = useState(0);
    const [logicSelectedOption, setLogicSelectedOption] = useState<number | null>(null);
    const [logicIsAnswered, setLogicIsAnswered] = useState(false);
    
    // States for Kelime Egzersizi / LGS
    const [subView, setSubView] = useState<'main' | 'kelime_test' | 'lgs_test'>('main');

    const sections = [
        { id: 'makale_okulu', title: 'Makale Okulu', icon: BookOpen, desc: 'Akademik makaleler ve analizler' },
        { id: 'paragraf', title: 'Paragraf Okuma', icon: Book, desc: 'Soru tipleri ve anlam çözümleme' },
        { id: 'sozel_mantik', title: 'Sözel Mantık', icon: Brain, desc: 'Mantık ve muhakeme gelişimi' },
        { id: 'kelime_defteri', title: 'Sözcük Havuzu', icon: Edit3, desc: 'Kavramlar ve aralıklı tekrar' },
        { id: 'lgs_antrenoru', title: 'LGS Antrenörü', icon: Target, desc: 'Yeni nesil paragraf soruları' },
        { id: 'gelisim_analizi', title: 'Gelişim Analizi', icon: BarChart2, desc: 'Makale DNA ve analiz' },
        { id: 'gorevler', title: 'Rozetler', icon: Award, desc: 'Kazanımlar ve ödüller' }
    ];

    const badges = [
        { title: 'Çırak (Bronz)', desc: 'Makale bölümü tamamlandı', achieved: true, color: 'text-amber-600', bg: 'bg-amber-100' },
        { title: 'Kalfa (Gümüş)', desc: 'Sözel mantık tamamlandı', achieved: false, color: 'text-slate-400', bg: 'bg-slate-100' },
        { title: 'Usta (Altın)', desc: 'Paragraf bölümü tamamlandı', achieved: false, color: 'text-amber-400', bg: 'bg-amber-50' },
        { title: 'Uzman (Platin)', desc: 'Tüm bölümler tamamlandı', achieved: false, color: 'text-indigo-400', bg: 'bg-indigo-50' },
    ];

    const handleWordClick = (word: string) => {
        const cleanWord = word.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, '');
        if (cleanWord && !wordPool.find(w => w.word === cleanWord)) {
            setWordPool([...wordPool, { word: cleanWord, context: 'Makaleden eklendi.' }]);
        }
    };

    const MakaleReader = () => {
        const [studentAnswer, setStudentAnswer] = useState('');
        const [feedback, setFeedback] = useState<any>(null);
        const [loading, setLoading] = useState(false);
        const article = ALL_ARTICLES.find(a => a.id === selectedArticleId);

        if (!article) return null;

        const checkAnswer = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/semantic-match', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentAnswer,
                        idealAnswer: article.idealAnswer
                    })
                });
                const data = await res.json();
                setFeedback(data);
            } catch(e) {
                console.error(e);
            }
            setLoading(false);
        };

        return (
            <div className="space-y-6">
                <button 
                    onClick={() => setSelectedArticleId(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Makale Listesine Dön</span>
                </button>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h2 className="text-3xl font-black text-slate-800 mb-6">{article.title}</h2>
                    <div className="prose prose-lg text-slate-700 max-w-none leading-relaxed">
                        {article.text.split(' ').map((word, i) => (
                            <span key={i} onClick={() => handleWordClick(word)} className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-800 rounded px-1 transition-colors">
                                {word}{' '}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <Brain className="w-6 h-6" /> Ana Fikir Çıkarımı
                    </h3>
                    <p className="text-indigo-700 mb-4 font-medium">Okuduğunuz metnin ana fikrini kendi cümlelerinizle bir cümlede özetleyiniz.</p>
                    <textarea
                        value={studentAnswer}
                        onChange={e => setStudentAnswer(e.target.value)}
                        placeholder="Ana fikir cümlesini buraya yazın..."
                        className="w-full h-32 p-4 rounded-2xl border-2 border-indigo-200 focus:border-indigo-500 outline-none resize-none mb-4"
                    />
                    <div className="flex justify-end">
                        <button onClick={checkAnswer} disabled={loading || !studentAnswer.trim()} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50">
                            {loading ? 'Analiz Ediliyor...' : 'Yapay Zekaya Gönder'}
                        </button>
                    </div>

                    {feedback && (
                        <div className={\`mt-6 p-6 rounded-2xl border \${feedback.isAcceptable ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}\`}>
                            <div className="flex items-center gap-3 mb-2">
                                {feedback.isAcceptable ? <CheckCircle2 className="text-emerald-600 w-6 h-6" /> : <AlertCircle className="text-amber-600 w-6 h-6" />}
                                <h4 className={\`font-bold text-lg \${feedback.isAcceptable ? 'text-emerald-800' : 'text-amber-800'}\`}>
                                    {feedback.isAcceptable ? 'Tebrikler! Ana Fikir Doğru.' : 'Eksik Noktalar Var'}
                                </h4>
                            </div>
                            <p className="text-slate-700 font-medium mb-3">{feedback.feedback}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-500 uppercase">Eşleşme Skoru:</span>
                                <div className="w-48 bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className={\`h-full \${feedback.isAcceptable ? 'bg-emerald-500' : 'bg-amber-500'}\`} style={{width: \`\${feedback.score}%\`}}></div>
                                </div>
                                <span className="font-bold text-slate-700">%{feedback.score}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderMakaleOkulu = () => {
        if (selectedArticleId) return <MakaleReader />;

        const filteredArticles = ALL_ARTICLES.filter(a => a.theme === selectedCategory);

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen className="text-indigo-600" /> Makale Okulu
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">Bilimsel makale okuma ve anlama becerilerinizi geliştirin. (6 Kategori, 24 Makale)</p>
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setSelectedCategory(cat)}
                            className={\`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all \${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}\`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredArticles.map(article => (
                        <div key={article.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">{article.theme}</span>
                                    <span className={\`flex items-center gap-1 text-xs font-bold \${article.status === 'completed' ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg' : 'text-slate-400'}\`}>
                                        {article.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                                        {article.status === 'completed' ? 'Tamamlandı' : article.difficulty}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-800 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{article.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.skills.map((s, i) => (
                                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedArticleId(article.id)}
                                className={\`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors \${article.status === 'completed' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-800'}\`}
                            >
                                {article.status === 'completed' ? 'Tekrar İncele' : 'Makaleyi Oku'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderParagraf = () => {
        const handleParaOptionClick = (i: number) => {
            if (paraIsAnswered) return;
            setParaSelectedOption(i);
            setParaIsAnswered(true);
        };

        const handleParaNext = () => {
            setParaSelectedOption(null);
            setParaIsAnswered(false);
            setParaQIndex(q => q + 1);
        };

        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Book className="text-indigo-600" /> Paragraf Okuma
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Sınavlarda çıkan paragraf soru tipleri ve anlam çözümleme.</p>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold text-sm">Kur 1: Temel</span>
                        </div>
                        <div className="text-sm font-bold text-slate-500">Soru {paraQIndex + 1} / 7</div>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 text-slate-700 leading-relaxed font-medium">
                        "İklim değişikliği, günümüzde sadece kutup ayılarını değil, hepimizi etkileyen küresel bir krizdir. Tarım alanlarının verimsizleşmesi, aşırı hava olayları ve su kaynaklarının tükenmesi doğrudan insan yaşamını tehdit etmektedir."
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Bu metnin ana fikri aşağıdakilerden hangisidir?</h3>
                    <div className="space-y-3">
                        {['İklim değişikliği en çok kutup ayılarını etkilemektedir.', 'Küresel ısınma tarım alanlarını verimsizleştirir.', 'İklim değişikliği tüm insanlığı tehdit eden kapsamlı bir sorundur.', 'Su kaynaklarının tükenmesi aşırı hava olaylarına yol açar.'].map((opt, i) => {
                            let btnClass = "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700";
                            if (paraIsAnswered) {
                                if (i === 2) btnClass = "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold";
                                else if (paraSelectedOption === i) btnClass = "bg-rose-50 border-rose-400 text-rose-700";
                                else btnClass = "border-slate-200 opacity-50";
                            }
                            return (
                                <button key={i} onClick={() => handleParaOptionClick(i)} className={\`w-full text-left p-4 rounded-xl border transition-colors font-medium flex items-start gap-3 \${btnClass}\`}>
                                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 font-bold text-sm text-slate-600">{String.fromCharCode(65 + i)}</span>
                                    <span>{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-sm text-slate-500 font-medium">Bu kuru geçmek için en fazla 1 yanlış yapabilirsiniz.</p>
                        {paraIsAnswered && (
                            <button onClick={handleParaNext} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md">
                                İlerle
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderSozelMantik = () => {
        const handleLogicOptionClick = (i: number) => {
            if (logicIsAnswered) return;
            setLogicSelectedOption(i);
            setLogicIsAnswered(true);
        };

        const handleLogicNext = () => {
            setLogicSelectedOption(null);
            setLogicIsAnswered(false);
            setLogicQIndex(q => q + 1);
        };

        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Brain className="text-indigo-600" /> Sözel Mantık Atölyesi
                    </h2>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg font-bold text-sm">Kur 2: Orta</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-bold text-sm">Sıralama / Yerleştirme</span>
                        </div>
                        <div className="text-sm font-bold text-slate-500">Bağlam 1 - Soru {logicQIndex + 1} / 4</div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-6 text-slate-700 leading-relaxed font-medium">
                        <strong>Bağlam:</strong> Bir müzik yarışmasına Ali, Burak, Can, Deniz ve Emre katılmıştır. Yarışmacıların sahneye çıkış sıralarıyla ilgili şunlar bilinmektedir:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Ali, Can'dan hemen sonra sahneye çıkmıştır.</li>
                            <li>Deniz 3. sırada sahneye çıkmıştır.</li>
                            <li>Burak son sırada sahneye çıkmamıştır.</li>
                        </ul>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Buna göre, Burak kaçıncı sırada sahneye çıkmış olabilir?</h3>
                    <div className="space-y-3">
                        {['Sadece 1', 'Sadece 2', '1 veya 4', '1, 2 veya 4'].map((opt, i) => {
                            let btnClass = "border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700";
                            if (logicIsAnswered) {
                                if (i === 3) btnClass = "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold";
                                else if (logicSelectedOption === i) btnClass = "bg-rose-50 border-rose-400 text-rose-700";
                                else btnClass = "border-slate-200 opacity-50";
                            }
                            return (
                                <button key={i} onClick={() => handleLogicOptionClick(i)} className={\`w-full text-left p-4 rounded-xl border transition-colors font-medium flex items-start gap-3 \${btnClass}\`}>
                                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 font-bold text-sm text-slate-600">{String.fromCharCode(65 + i)}</span>
                                    <span>{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-sm text-slate-500 font-medium">Bir sonraki soruya geçmeden önce bağlamı iyi analiz edin.</p>
                        {logicIsAnswered && (
                            <button onClick={handleLogicNext} className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-md">
                                İlerle
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderWordPool = () => {
        if (subView === 'kelime_test') {
            return (
                <div className="space-y-6">
                    <button onClick={() => setSubView('main')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium mb-4">
                        <ArrowLeft className="w-5 h-5" /> Geri Dön
                    </button>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Kelime Egzersizi: Eşleştirme</h2>
                        <p className="text-slate-600 mb-8">Havuzunuzdaki kelimeleri anlamlarıyla eşleştirin.</p>
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 font-bold text-indigo-900 cursor-pointer hover:bg-indigo-100">İnovasyon</div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-medium text-slate-700 cursor-pointer hover:bg-slate-100">Yenilikçilik, yeni yaklaşımlar</div>
                        </div>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Edit3 className="text-indigo-600" /> Sözcük Havuzu
                </h2>
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-indigo-900 mb-1">Aralıklı Tekrar (Spaced Repetition)</h3>
                        <p className="text-sm text-indigo-700">Öğrendiğiniz kelimeleri düzenli olarak test edin.</p>
                    </div>
                    <button onClick={() => setSubView('kelime_test')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                        Teste Başla
                    </button>
                </div>
                {wordPool.length === 0 ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 flex flex-col items-center text-center">
                        <Edit3 className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-slate-500 font-medium">Havuzunuzda henüz sözcük yok. Makale okurken kelimelerin üzerine tıklayarak ekleyebilirsiniz.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wordPool.map((w, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-slate-800 text-lg mb-1">{w.word}</h4>
                                <p className="text-sm text-slate-600 mb-3">{w.context}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderLGSCoach = () => {
        if (subView === 'lgs_test') {
            return (
                <div className="space-y-6">
                    <button onClick={() => setSubView('main')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium mb-4">
                        <ArrowLeft className="w-5 h-5" /> Geri Dön
                    </button>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                        <h2 className="text-2xl font-bold text-rose-900 mb-6">LGS Telafi Testi</h2>
                        <p className="text-slate-600 mb-8">Eksik olduğunuz konulardan özel olarak hazırlanan 10 soruluk telafi denemesi.</p>
                        <button className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-rose-700 transition-all text-xl">
                            Teste Şimdi Başla
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Target className="text-rose-600" /> LGS Antrenörü & Hata Analizi
                </h2>
                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-rose-900 mb-2">3 Kere Başarısız Olduğun Kur: Sözel Mantık</h3>
                        <p className="text-rose-700 font-medium mb-4">Eksik puanlarını telafi etmek için test çöz.</p>
                        <button onClick={() => setSubView('lgs_test')} className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-rose-700 transition-colors flex items-center gap-2">
                            <RefreshCw className="w-5 h-5" /> Telafi Testine Başla
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderGelisimAnalizi = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <BarChart2 className="text-indigo-600" /> Gelişim Analizi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Makale DNA & Başarı Grafiği</h3>
                    <div className="h-48 flex items-end justify-between gap-2 px-2">
                        {[40, 70, 55, 90, 65, 80].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-100 rounded-t-lg relative group">
                                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all" style={{ height: \`\${h}%\` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-sm font-bold text-slate-400">
                        <span>Oca</span><span>Şub</span><span>Mar</span><span>Nis</span><span>May</span><span>Haz</span>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">En Çok Yapılan Hata Tipleri</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-1"><span className="text-slate-600">Ana Fikir Bulma</span><span className="text-slate-800">%45 Hata</span></div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-rose-500 h-full" style={{width: '45%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-1"><span className="text-slate-600">Sıralama Çıkarımı</span><span className="text-slate-800">%30 Hata</span></div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-amber-500 h-full" style={{width: '30%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-1"><span className="text-slate-600">Kelime Anlamı</span><span className="text-slate-800">%10 Hata</span></div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full" style={{width: '10%'}}></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderBadges = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Award className="text-amber-500" /> Görevler ve Rozetler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((b, i) => (
                    <div key={i} className={\`p-6 rounded-2xl border \${b.achieved ? 'bg-white border-amber-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}\`}>
                        <div className={\`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 \${b.bg} \${b.color}\`}>
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-center font-bold text-slate-800 mb-1">{b.title}</h3>
                        <p className="text-center text-sm text-slate-500">{b.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeSection) {
            case 'makale_okulu': return renderMakaleOkulu();
            case 'paragraf': return renderParagraf();
            case 'sozel_mantik': return renderSozelMantik();
            case 'kelime_defteri': return renderWordPool();
            case 'gorevler': return renderBadges();
            case 'lgs_antrenoru': return renderLGSCoach();
            case 'gelisim_analizi': return renderGelisimAnalizi();
            default: return null;
        }
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Top Horizontal Navigation */}
            <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-4 overflow-hidden">
                <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setSelectedArticleId(null);
                                setSubView('main');
                            }}
                            className={\`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all \${activeSection === section.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}\`}
                        >
                            <section.icon className={\`w-5 h-5 \${activeSection === section.id ? 'text-white' : ''}\`} />
                            <span className="font-bold text-sm">{section.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="flex-1 min-w-0">
                {renderContent()}
            </div>
        </div>
    );
}
`

fs.writeFileSync('src/components/makale/StudentMakalePanel.tsx', code);
console.log("Done");
