import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, ChevronRight, Activity, Target, BookOpen, AlertCircle, Edit3, ShieldAlert, Search, Sparkles, Brain, Table, Clock, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ALL_MAKALE_ARTICLES, WORKSHOPS } from '../../data/makaleArticles';
import { ALL_SOZEL_MANTIK_QUESTIONS, SOZEL_MANTIK_ATOLYELER } from '../../data/sozelMantikIndex';
import { SozelMantikItem } from '../../data/sozelMantikTypes';

interface AdminMakalePanelProps {
    state: any;
    actions: any;
}

export function AdminMakalePanel({ state, actions }: AdminMakalePanelProps) {
    const [activeTab, setActiveTab] = useState<'upload' | 'analytics' | 'library' | 'sozel_mantik'>('library');
    const [selectedAdminWorkshop, setSelectedAdminWorkshop] = useState<number>(0);
    const [searchLibrary, setSearchLibrary] = useState<string>('');
    const [selectedArticleDetail, setSelectedArticleDetail] = useState<number | null>(null);
    const [selectedLogicAtolye, setSelectedLogicAtolye] = useState<number>(0);
    const [searchLogic, setSearchLogic] = useState<string>('');
    const [selectedLogicDetail, setSelectedLogicDetail] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const res = await fetch('/api/parse-question', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setParsedData(data);
        } catch (error) {
            console.error(error);
            // Fallback mock if API fails
            setParsedData({
                questionText: "Yapay zeka, modern eğitim sistemlerinde giderek daha fazla rol oynamaktadır. Bireyselleştirilmiş öğrenme yolları sunarak, öğrencilerin kendi hızlarında ilerlemelerine olanak tanır. Ancak, öğretmen-öğrenci etkileşiminin yerini tamamen alması beklenmemektedir.",
                questionStem: "Bu metne göre aşağıdakilerden hangisi çıkarılamaz?",
                options: [
                    { letter: "A", text: "Yapay zeka eğitime entegre olmaktadır.", type: "Doğru Cevap" },
                    { letter: "B", text: "Öğrenciler kendi hızlarında öğrenebilir.", type: "Kapsam Aşımı" },
                    { letter: "C", text: "Öğretmenlerin yerini tamamen yapay zeka alacaktır.", type: "Ters Mantık" },
                    { letter: "D", text: "Eğitim sistemleri teknolojiye uyum sağlamaktadır.", type: "Çeldirici" }
                ]
            });
        }
        setIsUploading(false);
    };

    const renderUpload = () => (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Upload className="text-indigo-600" /> Soru & Metin Yükleme (OCR/AI)
                </h3>
                
                {!parsedData ? (
                    <div className="space-y-6">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-700 mb-1">
                                {file ? file.name : "Belge Yükleyin (PDF, DOCX)"}
                            </h4>
                            <p className="text-slate-500 text-sm">
                                Akıllı Şablon sistemi, metni ve şıkları otomatik ayırır, çeldirici türlerini etiketler.
                            </p>
                        </div>

                        {file && (
                            <button 
                                onClick={handleUpload} 
                                disabled={isUploading}
                                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isUploading ? 'Yapay Zeka Analiz Ediyor...' : 'Ayrıştır ve Etiketle'}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" /> Başarıyla ayrıştırıldı. Lütfen çeldiricileri kontrol edip onaylayın.
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Soru Metni / Paragraf</label>
                                <textarea 
                                    defaultValue={parsedData.questionText}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 h-32"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Soru Kökü</label>
                                <input 
                                    type="text" 
                                    defaultValue={parsedData.questionStem}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <label className="block text-sm font-bold text-slate-600">Şıklar ve Çeldirici Etiketleri</label>
                                {parsedData.options.map((opt: any, i: number) => (
                                    <div key={i} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700">
                                            {opt.letter}
                                        </div>
                                        <input 
                                            type="text" 
                                            defaultValue={opt.text}
                                            className="flex-1 bg-transparent outline-none font-medium text-slate-700"
                                        />
                                        <select 
                                            defaultValue={opt.type}
                                            className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-indigo-700 outline-none"
                                        >
                                            <option value="Doğru Cevap">Doğru Cevap</option>
                                            <option value="Kapsam Aşımı">Kapsam Aşımı</option>
                                            <option value="Ters Mantık">Ters Mantık</option>
                                            <option value="Alakasız">Alakasız</option>
                                            <option value="Çelişkili">Çelişkili</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-slate-100">
                            <button onClick={() => setParsedData(null)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                İptal Et
                            </button>
                            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> Öğrencilere Ata (LGS Antrenörü)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Sınıf Hata Analizi (Çeldirici Türlerine Göre)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-500 mb-1">En Sık Düşülen Hata</h4>
                    <p className="text-xl font-black text-slate-800">Ters Mantık (%42)</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-500 mb-1">İkinci Sık Hata</h4>
                    <p className="text-xl font-black text-slate-800">Kapsam Aşımı (%28)</p>
                </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-6">
                <h4 className="font-bold text-lg text-slate-800 mb-6">Öğrenci Bazlı Telafi (Kurtarma Görevleri) Önerileri</h4>
                <div className="space-y-4">
                    {['Ahmet Yılmaz', 'Zeynep Kaya', 'Can Demir'].map((student, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                                    {student.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">{student}</div>
                                    <div className="text-sm text-slate-500">Zayıf Nokta: Sözel Mantık Tablolama</div>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-indigo-600 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                                Görev Ata
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderLibrary = () => {
        const filtered = ALL_MAKALE_ARTICLES.filter(a => {
            if (selectedAdminWorkshop !== 0 && a.workshopId !== selectedAdminWorkshop) return false;
            if (searchLibrary.trim()) {
                const q = searchLibrary.toLowerCase();
                return a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.skills.some(s => s.toLowerCase().includes(q));
            }
            return true;
        });

        const activeDetailArticle = ALL_MAKALE_ARTICLES.find(a => a.id === selectedArticleDetail);

        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-indigo-600" />
                            Atölye Müfredat & Soru Havuzu Kütüphanesi
                        </h3>
                        <p className="text-slate-500 text-xs font-medium mt-1">
                            Sistemdeki toplam {ALL_MAKALE_ARTICLES.length} makale, 10 adımlı uzman çözümleri ve çeldirici analizleri
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedAdminWorkshop(0)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                selectedAdminWorkshop === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            Tümü (40)
                        </button>
                        <button
                            onClick={() => setSelectedAdminWorkshop(1)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                selectedAdminWorkshop === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            Atölye 1 (20)
                        </button>
                        <button
                            onClick={() => setSelectedAdminWorkshop(2)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                selectedAdminWorkshop === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            Atölye 2 (20)
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Makale başlığı, kategori veya beceri ara..."
                        value={searchLibrary}
                        onChange={e => setSearchLibrary(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-indigo-500 outline-none shadow-sm"
                    />
                </div>

                {/* Article Detail Modal / Drawer */}
                {activeDetailArticle && (
                    <div className="bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg">
                                    Atölye {activeDetailArticle.workshopId} • Makale #{activeDetailArticle.articleNumber}
                                </span>
                                <h4 className="text-xl font-black text-slate-900 mt-1">{activeDetailArticle.title}</h4>
                            </div>
                            <button
                                onClick={() => setSelectedArticleDetail(null)}
                                className="text-xs px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
                            >
                                Kapat ✕
                            </button>
                        </div>

                        {/* Metin */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-normal">
                            {activeDetailArticle.text}
                        </div>

                        {/* Çeldirici Yapısı */}
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                            <h5 className="text-xs font-bold text-indigo-900 uppercase">Soru & Çeldirici Dağılımı:</h5>
                            <p className="text-xs font-medium text-slate-800">{activeDetailArticle.quizQuestion.stem}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {activeDetailArticle.quizQuestion.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                                        opt.isCorrect ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950' : 'bg-white border-slate-200 text-slate-700'
                                    }`}>
                                        <span><strong>{opt.letter})</strong> {opt.text}</span>
                                        <span className={`text-2xs font-bold px-2 py-0.5 rounded ${
                                            opt.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'
                                        }`}>{opt.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nöral Uyarı */}
                        <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <p className="text-xs font-semibold text-rose-900">
                                <strong>Nöral Uyarı:</strong> {activeDetailArticle.solution.neuralWarning}
                            </p>
                        </div>
                    </div>
                )}

                {/* Articles List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(item => (
                        <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                                        Atölye {item.workshopId} • #{item.articleNumber}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">{item.duration} dk</span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1">{item.title}</h4>
                                <span className="text-2xs font-bold text-slate-500 uppercase">{item.category}</span>
                            </div>
                            <button
                                onClick={() => setSelectedArticleDetail(item.id)}
                                className="mt-4 w-full py-2 bg-slate-50 text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
                            >
                                Detay & Soru Çözümünü İncele
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSozelMantikAdmin = () => {
        const filteredQuestions = ALL_SOZEL_MANTIK_QUESTIONS.filter(q => {
            if (selectedLogicAtolye !== 0 && q.atolyeId !== selectedLogicAtolye) return false;
            if (searchLogic.trim()) {
                const query = searchLogic.toLowerCase();
                const matchTitle = q.title.toLowerCase().includes(query);
                const matchStem = q.questionStem.toLowerCase().includes(query);
                const matchContext = q.context.toLowerCase().includes(query);
                const matchCat = q.category.toLowerCase().includes(query);
                if (!matchTitle && !matchStem && !matchContext && !matchCat) return false;
            }
            return true;
        });

        const activeDetailQuestion = ALL_SOZEL_MANTIK_QUESTIONS.find(q => q.id === selectedLogicDetail);

        return (
            <div className="space-y-6">
                {/* Search & Workshop Filters */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Brain className="text-indigo-600 w-6 h-6" /> Sözel Mantık Soru Havuzu
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                                Toplam 5 Atölye ve 100 Soru: Tablo Kurma, İki Değişkenli, Çoklu Matris, Sıralama ve Kriptoloji
                            </p>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                                type="text"
                                placeholder="Soru, kavram veya öncül ara..."
                                value={searchLogic}
                                onChange={e => setSearchLogic(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                        <button
                            onClick={() => setSelectedLogicAtolye(0)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedLogicAtolye === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                            Tümü ({ALL_SOZEL_MANTIK_QUESTIONS.length})
                        </button>
                        {SOZEL_MANTIK_ATOLYELER.map(a => (
                            <button
                                key={a.id}
                                onClick={() => setSelectedLogicAtolye(a.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedLogicAtolye === a.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                {a.title.split(':')[0]} ({a.questionCount})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detail Modal */}
                {activeDetailQuestion && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                                        Atölye {activeDetailQuestion.atolyeId} • Soru #{activeDetailQuestion.questionNumber}
                                    </span>
                                    <h3 className="text-xl font-black text-slate-800 mt-2">{activeDetailQuestion.title}</h3>
                                    <div className="text-xs text-slate-500 font-bold mt-0.5">{activeDetailQuestion.category}</div>
                                </div>
                                <button
                                    onClick={() => setSelectedLogicDetail(null)}
                                    className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Context & Premises */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                                <p className="font-bold text-slate-900">{activeDetailQuestion.context}</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {activeDetailQuestion.premises.map((p, idx) => (
                                        <li key={idx}>{p}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Question Stem */}
                            <div className="font-bold text-slate-900 text-sm">
                                {activeDetailQuestion.questionStem}
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                                {activeDetailQuestion.options.map((opt, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between ${
                                            opt.isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold' : 'bg-white border-slate-200 text-slate-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-black text-xs text-slate-700">
                                                {opt.letter}
                                            </span>
                                            <span>{opt.text}</span>
                                        </div>
                                        {opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                                    </div>
                                ))}
                            </div>

                            {/* Matrix Table */}
                            {activeDetailQuestion.matrix && (
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                    <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Table className="w-3.5 h-3.5" /> {activeDetailQuestion.matrix.title}
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs bg-white rounded-lg border border-slate-200">
                                            <thead>
                                                <tr className="bg-indigo-600 text-white font-bold">
                                                    {activeDetailQuestion.matrix.headers.map((h, i) => (
                                                        <th key={i} className="p-2 border-r last:border-r-0 border-indigo-500">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeDetailQuestion.matrix.rows.map((r, i) => (
                                                    <tr key={i} className="border-b last:border-b-0 border-slate-100">
                                                        {r.map((c, ci) => (
                                                            <td key={ci} className="p-2 border-r last:border-r-0 border-slate-100 text-slate-700">{c}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Solution Steps */}
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Çözüm Aşamaları
                                </div>
                                <div className="space-y-1.5">
                                    {activeDetailQuestion.solutionSteps.map(step => (
                                        <div key={step.step} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                                            <strong className="text-slate-900 font-bold">{step.step}. {step.title}: </strong>
                                            <span className="text-slate-600">{step.content}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Neural Brake */}
                            {activeDetailQuestion.neuralBrake && (
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                                    <strong className="font-bold flex items-center gap-1 text-amber-800 mb-0.5">
                                        <ShieldAlert className="w-3.5 h-3.5" /> Nöral Fren (Zihinsel Tuzak):
                                    </strong>
                                    {activeDetailQuestion.neuralBrake}
                                </div>
                            )}

                            <div className="pt-2 flex justify-end">
                                <button
                                    onClick={() => setSelectedLogicDetail(null)}
                                    className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900"
                                >
                                    Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredQuestions.map(q => (
                        <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                                        Atölye {q.atolyeId} • #{q.questionNumber}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {q.cognitiveTime || '30 sn'}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1">{q.title}</h4>
                                <span className="text-2xs font-bold text-slate-500 uppercase">{q.category}</span>
                                <p className="text-xs text-slate-600 line-clamp-2 mt-2 font-medium">
                                    {q.questionStem}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLogicDetail(q.id)}
                                className="mt-4 w-full py-2 bg-slate-50 text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                                <Table className="w-3.5 h-3.5" /> Matris ve Çözümü İncele
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 h-full p-2">
            <div className="flex flex-wrap gap-3 mb-6">
                <button 
                    onClick={() => setActiveTab('library')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${activeTab === 'library' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    <BookOpen className="w-4 h-4" /> Makale Kütüphanesi ({ALL_MAKALE_ARTICLES.length})
                </button>
                <button 
                    onClick={() => setActiveTab('sozel_mantik')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${activeTab === 'sozel_mantik' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    <Brain className="w-4 h-4" /> Sözel Mantık Havuzu ({ALL_SOZEL_MANTIK_QUESTIONS.length})
                </button>
                <button 
                    onClick={() => setActiveTab('upload')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${activeTab === 'upload' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    <Upload className="w-4 h-4" /> Soru Yükle & Etiketle
                </button>
                <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    <Activity className="w-4 h-4" /> Çeldirici Analizi
                </button>
            </div>
            
            {activeTab === 'library' 
                ? renderLibrary() 
                : activeTab === 'sozel_mantik'
                ? renderSozelMantikAdmin()
                : activeTab === 'upload' 
                ? renderUpload() 
                : renderAnalytics()}
        </div>
    );
}
