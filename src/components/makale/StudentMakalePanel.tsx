import React, { useState, useMemo, useEffect } from 'react';
import { 
    BookOpen, Brain, Target, Book, Edit3, BarChart2, Award, ChevronRight, 
    CheckCircle2, AlertCircle, RefreshCw, Star, ArrowLeft, Search, Filter,
    Layers, Clock, Sparkles, Trash2, Plus, PlusCircle, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_MAKALE_ARTICLES, WORKSHOPS, MakaleItem } from '../../data/makaleArticles';
import { MakaleStudyView } from './MakaleStudyView';
import { SozelMantikPanel } from './SozelMantikPanel';
import { ParagrafOkumaPanel } from './ParagrafOkumaPanel';
import { LgsTelafiTestPanel } from './LgsTelafiTestPanel';
import { KelimeEslestirmeGame, WordItem } from './KelimeEslestirmeGame';
import { resolveWordDefinition } from '../../data/makaleDictionary';

interface StudentMakalePanelProps {
    state: any;
    actions: any;
}

export function StudentMakalePanel({ state, actions }: StudentMakalePanelProps) {
    const [activeSection, setActiveSection] = useState('makale_okulu');
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

    // Persistent Word Pool (stored by student id in localStorage so words never get lost)
    const storageKey = useMemo(() => {
        const uid = state?.currentUser?.id || state?.currentUser?.username || 'default';
        return `makale_word_pool_${uid}`;
    }, [state?.currentUser?.id, state?.currentUser?.username]);

    const [wordPool, setWordPool] = useState<WordItem[]>(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Failed to load word pool from localStorage", e);
        }
        return [
            {
                id: 'w-init-1',
                word: 'İnovasyon',
                meaning: 'Yenilikçilik, yeni yaklaşımlar geliştirme ve uygulama süreci',
                context: 'Teknoloji makalesinden eklendi.',
                addedAt: new Date().toLocaleDateString('tr-TR')
            },
            {
                id: 'w-init-2',
                word: 'Paradigma',
                meaning: 'Belli bir dönemde geçerli olan bilimsel veya düşünsel model, değerler dizisi',
                context: 'Felsefe makalesinden eklendi.',
                addedAt: new Date().toLocaleDateString('tr-TR')
            },
            {
                id: 'w-init-3',
                word: 'Sentez',
                meaning: 'Ayrık parçaları bir araya getirerek yeni bir bütün oluşturma',
                context: 'Edebiyat makalesinden eklendi.',
                addedAt: new Date().toLocaleDateString('tr-TR')
            },
            {
                id: 'w-init-4',
                word: 'Bilişsel',
                meaning: 'Zihinsel süreçler; algılama, hatırlama, öğrenme ve muhakeme ile ilgili',
                context: 'Bilişsel psikoloji metninden eklendi.',
                addedAt: new Date().toLocaleDateString('tr-TR')
            }
        ];
    });

    // Save wordPool to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(wordPool));
        } catch (e) {
            console.error("Failed to save word pool to localStorage", e);
        }
    }, [wordPool, storageKey]);

    const [showAddWordModal, setShowAddWordModal] = useState(false);
    const [manualWord, setManualWord] = useState('');
    const [manualMeaning, setManualMeaning] = useState('');
    
    // Makale Okulu Filters
    const [selectedWorkshopId, setSelectedWorkshopId] = useState<number>(0); // 0: All, 1: Workshop 1, 2: Workshop 2
    const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [completedArticleIds, setCompletedArticleIds] = useState<number[]>([101]);
    
    // States for Sözel Mantık
    const [logicQIndex, setLogicQIndex] = useState(0);
    const [logicSelectedOption, setLogicSelectedOption] = useState<number | null>(null);
    const [logicIsAnswered, setLogicIsAnswered] = useState(false);
    
    // States for Kelime Egzersizi / LGS
    const [subView, setSubView] = useState<'main' | 'kelime_test' | 'lgs_test'>('main');
    const [lastTelafiResult, setLastTelafiResult] = useState<{ correct: number; total: number; percent: number } | null>(null);

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

    const handleWordClick = (word: string, contextSentence?: string, articleTitle?: string) => {
        const cleanWord = word.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, '').trim();
        if (!cleanWord || cleanWord.length < 2) return;

        const exists = wordPool.some(w => w.word.toLocaleLowerCase('tr-TR') === cleanWord.toLocaleLowerCase('tr-TR'));
        if (exists) {
            actions?.showToast?.(`"${cleanWord}" zaten sözcük havuzunuzda kayıtlı.`, 'info');
            return;
        }

        const meaning = resolveWordDefinition(cleanWord, contextSentence);
        const capitalized = cleanWord.charAt(0).toLocaleUpperCase('tr-TR') + cleanWord.slice(1);
        const newItem: WordItem = {
            id: `w-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            word: capitalized,
            meaning: meaning,
            context: articleTitle ? `"${articleTitle}" makalesinden eklendi.` : 'Makaleden eklendi.',
            addedAt: new Date().toLocaleDateString('tr-TR')
        };

        setWordPool(prev => [newItem, ...prev]);
        actions?.showToast?.(`"${capitalized}" sözcük havuzunuza eklendi!`, 'success');
    };

    const handleDeleteWord = (id: string, wordName: string) => {
        setWordPool(prev => prev.filter(w => w.id !== id));
        actions?.showToast?.(`"${wordName}" havuzdan çıkarıldı.`, 'info');
    };

    const handleAddManualWord = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = manualWord.trim();
        if (!trimmed) return;

        const exists = wordPool.some(w => w.word.toLocaleLowerCase('tr-TR') === trimmed.toLocaleLowerCase('tr-TR'));
        if (exists) {
            actions?.showToast?.(`"${trimmed}" zaten sözcük havuzunuzda mevcut.`, 'info');
            return;
        }

        const meaning = manualMeaning.trim() || resolveWordDefinition(trimmed);
        const capitalized = trimmed.charAt(0).toLocaleUpperCase('tr-TR') + trimmed.slice(1);
        const newItem: WordItem = {
            id: `w-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            word: capitalized,
            meaning: meaning,
            context: 'Öğrenci tarafından eklendi.',
            addedAt: new Date().toLocaleDateString('tr-TR')
        };

        setWordPool(prev => [newItem, ...prev]);
        setManualWord('');
        setManualMeaning('');
        setShowAddWordModal(false);
        actions?.showToast?.(`"${capitalized}" sözcük havuzunuza eklendi!`, 'success');
    };

    const handleAddSampleWords = () => {
        const samples: WordItem[] = [
            { id: `w-${Date.now()}-1`, word: 'İnovasyon', meaning: 'Yenilikçilik, yeni yaklaşımlar geliştirme ve uygulama süreci', context: 'Teknoloji makalesinden eklendi.', addedAt: new Date().toLocaleDateString('tr-TR') },
            { id: `w-${Date.now()}-2`, word: 'Paradigma', meaning: 'Belli bir dönemde geçerli olan bilimsel veya düşünsel model', context: 'Felsefe makalesinden eklendi.', addedAt: new Date().toLocaleDateString('tr-TR') },
            { id: `w-${Date.now()}-3`, word: 'Sentez', meaning: 'Ayrık parçaları bir araya getirerek yeni bir bütün oluşturma', context: 'Edebiyat makalesinden eklendi.', addedAt: new Date().toLocaleDateString('tr-TR') },
            { id: `w-${Date.now()}-4`, word: 'Bilişsel', meaning: 'Zihinsel süreçler; algılama, hatırlama ve öğrenme ile ilgili', context: 'Psikoloji makalesinden eklendi.', addedAt: new Date().toLocaleDateString('tr-TR') },
            { id: `w-${Date.now()}-5`, word: 'Empirik', meaning: 'Deneye, gözleme ve pratik tecrübeye dayalı bilimsel veri', context: 'Bilimsel araştırma metninden eklendi.', addedAt: new Date().toLocaleDateString('tr-TR') }
        ];

        setWordPool(prev => {
            const existingWords = new Set(prev.map(w => w.word.toLocaleLowerCase('tr-TR')));
            const toAdd = samples.filter(s => !existingWords.has(s.word.toLocaleLowerCase('tr-TR')));
            if (toAdd.length === 0) {
                actions?.showToast?.('Örnek kelimeler zaten havuzunuzda ekli.', 'info');
                return prev;
            }
            actions?.showToast?.(`${toAdd.length} örnek akademik kelime eklendi.`, 'success');
            return [...toAdd, ...prev];
        });
    };

    const handleCompleteArticle = (articleId: number) => {
        if (!completedArticleIds.includes(articleId)) {
            setCompletedArticleIds(prev => [...prev, articleId]);
        }
    };

    // Categories collected from all articles in specific order
    const allCategories = useMemo(() => {
        const preferredOrder = ['Tümü', 'Bilim', 'Tarih', 'Teknoloji', 'Sanat', 'Coğrafya', 'Edebiyat'];
        const cats = Array.from(new Set(ALL_MAKALE_ARTICLES.map(a => a.category)));
        const sorted = preferredOrder.filter(c => c === 'Tümü' || cats.includes(c));
        // Add any remaining categories if not in preferred order
        cats.forEach(c => {
            if (!sorted.includes(c)) sorted.push(c);
        });
        return sorted;
    }, []);

    // Filtered articles
    const filteredArticles = useMemo(() => {
        return ALL_MAKALE_ARTICLES.filter(article => {
            // Workshop filter
            if (selectedWorkshopId !== 0 && article.workshopId !== selectedWorkshopId) {
                return false;
            }
            // Category filter
            if (selectedCategory !== 'Tümü' && article.category !== selectedCategory) {
                return false;
            }
            // Search query
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const matchesTitle = article.title.toLowerCase().includes(query);
                const matchesSkills = article.skills.some(s => s.toLowerCase().includes(query));
                const matchesCat = article.category.toLowerCase().includes(query);
                const matchesText = article.text.toLowerCase().includes(query);
                if (!matchesTitle && !matchesSkills && !matchesCat && !matchesText) {
                    return false;
                }
            }
            return true;
        });
    }, [selectedWorkshopId, selectedCategory, searchQuery]);

    const selectedArticle = useMemo(() => {
        return ALL_MAKALE_ARTICLES.find(a => a.id === selectedArticleId) || null;
    }, [selectedArticleId]);

    const renderMakaleOkulu = () => {
        if (selectedArticle) {
            return (
                <MakaleStudyView
                    article={selectedArticle}
                    onBack={() => setSelectedArticleId(null)}
                    onAddWord={handleWordClick}
                    onCompleteArticle={handleCompleteArticle}
                />
            );
        }

        return (
            <div className="space-y-6">
                {/* Header & Workshop Banner */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                <BookOpen className="text-indigo-600 w-7 h-7" /> Makale Okulu
                            </h2>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-black rounded-full">
                                {ALL_MAKALE_ARTICLES.length} Makale
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium text-sm mt-1">
                            Bilimsel makale okuma ve anlama becerilerinizi geliştirin. (6 Kategori, {ALL_MAKALE_ARTICLES.length} Makale)
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Tamamlanan: {completedArticleIds.length} / {ALL_MAKALE_ARTICLES.length}</span>
                    </div>
                </div>

                {/* Workshop Selection Tabs (shown only when multiple workshops exist) */}
                {WORKSHOPS.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setSelectedWorkshopId(0)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                                selectedWorkshopId === 0
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Tüm Müfredat</span>
                                <span className={`text-xs px-2 py-0.5 rounded font-black ${selectedWorkshopId === 0 ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                    {ALL_MAKALE_ARTICLES.length} Makale
                                </span>
                            </div>
                            <h4 className="font-black text-base">Tüm Makaleler</h4>
                            <p className={`text-xs mt-1 line-clamp-1 ${selectedWorkshopId === 0 ? 'text-indigo-100' : 'text-slate-500'}`}>
                                Tüm bilimsel, edebi ve analitik metinler
                            </p>
                        </button>

                        {WORKSHOPS.map((ws) => (
                            <button
                                key={ws.id}
                                onClick={() => setSelectedWorkshopId(ws.id)}
                                className={`p-4 rounded-2xl border text-left transition-all ${
                                    selectedWorkshopId === ws.id
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Atölye {ws.id}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded font-black ${selectedWorkshopId === ws.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                        {ws.articleCount} Makale
                                    </span>
                                </div>
                                <h4 className="font-black text-base line-clamp-1">{ws.shortTitle}</h4>
                                <p className={`text-xs mt-1 line-clamp-1 ${selectedWorkshopId === ws.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                                    {ws.description}
                                </p>
                            </button>
                        ))}
                    </div>
                )}

                {/* Search and Category Filters */}
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Makale başlığı, yazar, kavram ara (örn: Joyce, Montaigne, Bilinç Akışı)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-indigo-500 outline-none shadow-sm"
                        />
                    </div>

                    <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                        {allCategories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    selectedCategory === cat 
                                        ? 'bg-slate-900 text-white shadow-sm' 
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                {filteredArticles.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                        <Search className="w-12 h-12 text-slate-300 mx-auto" />
                        <h4 className="font-bold text-slate-700 text-base">Aramanıza uygun makale bulunamadı</h4>
                        <p className="text-xs text-slate-500">Lütfen filtreleri veya arama kelimesini değiştirin.</p>
                        <button
                            onClick={() => { setSelectedWorkshopId(0); setSelectedCategory('Tümü'); setSearchQuery(''); }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors inline-block"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredArticles.map(article => {
                            const isCompleted = completedArticleIds.includes(article.id);
                            return (
                                <div 
                                    key={article.id} 
                                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-3 gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg border border-indigo-100">
                                                    Atölye {article.workshopId} • #{article.articleNumber}
                                                </span>
                                                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                                                    {article.category}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {article.duration} dk
                                                </span>
                                                <span className={`flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-lg ${
                                                    isCompleted 
                                                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                                                        : 'text-amber-700 bg-amber-50 border border-amber-200'
                                                }`}>
                                                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                                                    {isCompleted ? 'Tamamlandı' : article.difficulty}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="font-black text-lg text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">
                                            {article.text}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {article.skills.map((s, i) => (
                                                <span key={i} className="text-2xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                                    #{s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setSelectedArticleId(article.id)}
                                        className={`w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all shadow-sm ${
                                            isCompleted 
                                                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                                                : 'bg-slate-900 text-white hover:bg-indigo-600'
                                        }`}
                                    >
                                        <span>{isCompleted ? 'Tekrar Çözümle & İncele' : 'Makaleyi ve Analizi Başlat'}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };


    const renderParagraf = () => {
        return <ParagrafOkumaPanel />;
    };

    const renderSozelMantik = () => {
        return <SozelMantikPanel />;
    };

    const renderWordPool = () => {
        if (subView === 'kelime_test') {
            return (
                <KelimeEslestirmeGame 
                    wordPool={wordPool}
                    onBack={() => setSubView('main')}
                    onAddSampleWords={handleAddSampleWords}
                    showToast={actions?.showToast}
                />
            );
        }
        
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                            <Edit3 className="text-indigo-600" /> Sözcük Havuzu
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Makalelerden kaydettiğiniz kavramlar ve anlamları. ({wordPool.length} Sözcük)
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button 
                            id="btn-open-add-word"
                            onClick={() => setShowAddWordModal(true)}
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer border border-indigo-100"
                        >
                            <Plus className="w-4 h-4" /> Kelime Ekle
                        </button>
                        {wordPool.length < 5 && (
                            <button 
                                id="btn-load-sample-words"
                                onClick={handleAddSampleWords}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                            >
                                <PlusCircle className="w-4 h-4" /> Örnekleri Yükle
                            </button>
                        )}
                    </div>
                </div>

                {/* Banner with Spaced Repetition and Test CTA */}
                <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-indigo-800 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border border-indigo-700/50">
                    <div className="space-y-1.5 max-w-xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-700/70 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            Aralıklı Tekrar & Eşleştirme Egzersizi
                        </div>
                        <h3 className="text-xl font-bold text-white">Havuzunuzdaki Kelimeleri Test Edin</h3>
                        <p className="text-sm text-indigo-200">
                            Öğrendiğiniz sözcüklerin kalıcı hafızaya aktarılması için anlam eşleştirme egzersizini tamamlayın.
                        </p>
                    </div>
                    <button 
                        id="btn-start-kelime-test"
                        onClick={() => setSubView('kelime_test')} 
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                        Teste Başla ({wordPool.length})
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal for adding word manually */}
                {showAddWordModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <PlusCircle className="w-5 h-5 text-indigo-600" /> Yeni Sözcük Ekle
                                </h3>
                                <button 
                                    onClick={() => setShowAddWordModal(false)}
                                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddManualWord} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Kelime</label>
                                    <input 
                                        type="text"
                                        value={manualWord}
                                        onChange={(e) => {
                                            const w = e.target.value;
                                            setManualWord(w);
                                            // Suggest auto definition from dictionary
                                            if (!manualMeaning.trim() || manualMeaning === resolveWordDefinition(manualWord)) {
                                                const autoDef = resolveWordDefinition(w);
                                                if (autoDef && !autoDef.startsWith('Akademik metin')) {
                                                    setManualMeaning(autoDef);
                                                }
                                            }
                                        }}
                                        placeholder="Örn: Paradigma"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800 text-sm"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Anlamı</label>
                                    <textarea 
                                        rows={3}
                                        value={manualMeaning}
                                        onChange={(e) => setManualMeaning(e.target.value)}
                                        placeholder="Kelimenin anlamını yazın..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-700"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button 
                                        type="button"
                                        onClick={() => setShowAddWordModal(false)}
                                        className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-sm cursor-pointer"
                                    >
                                        İptal
                                    </button>
                                    <button 
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm cursor-pointer"
                                    >
                                        Havuzuma Ekle
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Words Grid */}
                {wordPool.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-1">
                            <Edit3 className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">Sözcük Havuzunuz Boş</h4>
                        <p className="text-slate-500 text-sm max-w-md">
                            Makale okurken bilmediğiniz veya önemli gördüğünüz kelimelerin üzerine tıklayarak havuzunuza ekleyebilirsiniz.
                        </p>
                        <div className="pt-2">
                            <button
                                onClick={handleAddSampleWords}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm cursor-pointer"
                            >
                                Örnek Akademik Kelimeleri Yükle
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wordPool.map((w) => (
                            <div 
                                key={w.id} 
                                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
                            >
                                <button
                                    onClick={() => handleDeleteWord(w.id, w.word)}
                                    title="Havuzdan kaldır"
                                    className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="space-y-2 pr-6">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-slate-900 text-lg">{w.word}</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium leading-snug">
                                        {w.meaning}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                    <span className="truncate max-w-[180px]">{w.context || 'Makaleden eklendi.'}</span>
                                    <span>{w.addedAt}</span>
                                </div>
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
                <LgsTelafiTestPanel 
                    onBack={() => setSubView('main')}
                    showToast={actions?.showToast}
                    onComplete={(score) => {
                        setLastTelafiResult(score);
                    }}
                />
            );
        }

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Target className="text-rose-600" /> LGS Antrenörü & Hata Analizi
                </h2>

                {lastTelafiResult && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 text-base">Son Telafi Denemesi Tamamlandı</h4>
                                <p className="text-xs text-emerald-700">
                                    Skor: {lastTelafiResult.correct} / {lastTelafiResult.total} Doğru (%{lastTelafiResult.percent} Başarı) • +50 Telafi Puanı
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSubView('lgs_test')}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
                        >
                            Tekrar Çöz / İncele
                        </button>
                    </div>
                )}

                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-rose-900 mb-2">3 Kere Başarısız Olduğun Kur: Sözel Mantık</h3>
                        <p className="text-rose-700 font-medium mb-4">Eksik puanlarını telafi etmek için 10 soruluk telafi denemesini çöz.</p>
                        <button onClick={() => setSubView('lgs_test')} className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-rose-700 transition-colors flex items-center gap-2 cursor-pointer">
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
                                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
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
                    <div key={i} className={`p-6 rounded-2xl border ${b.achieved ? 'bg-white border-amber-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${b.bg} ${b.color}`}>
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
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all ${activeSection === section.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
                        >
                            <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-white' : ''}`} />
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
