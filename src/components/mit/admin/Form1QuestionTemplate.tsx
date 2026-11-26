import React, { useState, useRef } from 'react';
import { CustomMitQuestion } from '../../../types/customMitExam';
import { PDF_SAMPLE_QUESTIONS, parseBulkQuestionsInput } from '../../../services/customMitExamService';
import { Plus, Trash2, Copy, Image as ImageIcon, Clipboard, FileSpreadsheet, Check, Sparkles, AlertCircle, X } from 'lucide-react';

interface Form1QuestionTemplateProps {
    questions: CustomMitQuestion[];
    onChangeQuestions: (questions: CustomMitQuestion[]) => void;
    showToast?: (msg: string) => void;
}

export const Form1QuestionTemplate: React.FC<Form1QuestionTemplateProps> = ({
    questions,
    onChangeQuestions,
    showToast
}) => {
    const [bulkPasteModalOpen, setBulkPasteModalOpen] = useState(false);
    const [rawBulkText, setRawBulkText] = useState('');
    const [activeImageUploadId, setActiveImageUploadId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Yeni Boş Soru Ekle
    const handleAddQuestion = () => {
        const nextId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        const newQ: CustomMitQuestion = {
            id: nextId,
            questionText: '',
            options: { A: '', B: '', C: '', D: '' },
            correctAnswer: 'A',
            learningArea: 'Genel Matematik',
            outcomeCode: 'M.5.1',
            outcomeDescription: 'Temel kavramları ve işlem kurallarını uygular.',
            distractorAnalysis: {
                A: 'Doğru Cevap',
                B: 'Kavram yanılgısı / Dikkatsizlik',
                C: 'İşlem hatası / Kural karıştırma',
                D: 'Ters mantık / Hatalı hesaplama'
            },
            cognitiveLevel: 'Orta / Uygulama'
        };
        onChangeQuestions([...questions, newQ]);
    };

    // Soruyu Sil
    const handleDeleteQuestion = (id: number) => {
        if (questions.length <= 1) {
            showToast?.('Sınavda en az 1 soru bulunmalıdır.');
            return;
        }
        const filtered = questions.filter(q => q.id !== id);
        // Soru numaralarını 1'den başlayarak yeniden düzenle
        const reindexed = filtered.map((q, idx) => ({ ...q, id: idx + 1 }));
        onChangeQuestions(reindexed);
    };

    // Soruyu Çoğalt
    const handleDuplicateQuestion = (q: CustomMitQuestion) => {
        const nextId = Math.max(...questions.map(x => x.id)) + 1;
        const cloned: CustomMitQuestion = {
            ...q,
            id: nextId,
            questionText: `${q.questionText} (Kopya)`
        };
        onChangeQuestions([...questions, cloned]);
        showToast?.(`Soru #${q.id} çoğaltıldı.`);
    };

    // Soru Alanını Güncelle
    const handleUpdateField = (id: number, field: keyof CustomMitQuestion, value: any) => {
        const updated = questions.map(q => {
            if (q.id === id) {
                const nextQ = { ...q, [field]: value };
                // Eğer doğru cevap değişirse Form 2 çeldirici matrisinde "Doğru Cevap" etiketini güncelle
                if (field === 'correctAnswer') {
                    const newAns = value as 'A' | 'B' | 'C' | 'D';
                    const currentDist = { ...nextQ.distractorAnalysis };
                    (['A', 'B', 'C', 'D'] as const).forEach(opt => {
                        if (opt === newAns) {
                            currentDist[opt] = 'Doğru Cevap';
                        } else if (currentDist[opt] === 'Doğru Cevap') {
                            currentDist[opt] = 'Çeldirici tanı analizi giriniz...';
                        }
                    });
                    nextQ.distractorAnalysis = currentDist;
                }
                return nextQ;
            }
            return q;
        });
        onChangeQuestions(updated);
    };

    // Seçenek Güncelle
    const handleUpdateOption = (id: number, optKey: 'A' | 'B' | 'C' | 'D', value: string) => {
        const updated = questions.map(q => {
            if (q.id === id) {
                return {
                    ...q,
                    options: {
                        ...q.options,
                        [optKey]: value
                    }
                };
            }
            return q;
        });
        onChangeQuestions(updated);
    };

    // PDF Örnek Şablonunu Yükle
    const handleLoadPdfSamples = () => {
        onChangeQuestions(PDF_SAMPLE_QUESTIONS);
        showToast?.('PDF şablonundaki 3 örnek soru başarıyla yüklendi.');
    };

    // Toplu Yapıştır Ayrıştırma
    const handleApplyBulkPaste = () => {
        if (!rawBulkText.trim()) return;
        const parsed = parseBulkQuestionsInput(rawBulkText, 1);
        if (parsed.length > 0) {
            onChangeQuestions(parsed);
            setBulkPasteModalOpen(false);
            setRawBulkText('');
            showToast?.(`${parsed.length} soru tablodan başarıyla ayrıştırıldı.`);
        } else {
            showToast?.('Geçerli soru satırı bulunamadı. Lütfen Excel veya Word formatını kontrol edin.');
        }
    };

    // Görsel Yükleme (Data URL)
    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || activeImageUploadId === null) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const dataUrl = evt.target?.result as string;
            handleUpdateField(activeImageUploadId, 'imageUrl', dataUrl);
            setActiveImageUploadId(null);
            showToast?.('Görsel soruya başarıyla eklendi.');
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6">
            {/* Hidden File Input for Image Uploads */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageFileChange} 
                accept="image/*" 
                className="hidden" 
            />

            {/* Header / Intro Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        Form 1 / Soru ve Uygulama Şablonu
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                        1. Form 1: Soru ve Uygulama Şablonu (Kopyala-Yapıştır Odaklı)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Toplu veri giriş veya arayüz tablo şablonu. Sorularınızı, seçenekleri ve doğru cevapları girin veya Excel'den doğrudan kopyalayıp yapıştırın.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleLoadPdfSamples}
                        className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        PDF Örneklerini Yükle
                    </button>
                    <button
                        type="button"
                        onClick={() => setBulkPasteModalOpen(true)}
                        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                        <Clipboard className="w-4 h-4 text-indigo-600" />
                        Toplu Kopyala-Yapıştır (Excel/Tablo)
                    </button>
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Yeni Soru Ekle
                    </button>
                </div>
            </div>

            {/* TABLE SHABLONU (PDF ile birebir uyumlu) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <th className="p-3.5 w-16 text-center border-r border-slate-200">Soru No</th>
                                <th className="p-3.5 min-w-[280px] border-r border-slate-200">
                                    Soru Kökü / Görsel / Metin (Kopyala-Yapıştır)
                                </th>
                                <th className="p-3.5 w-36 border-r border-slate-200">Seçenek A</th>
                                <th className="p-3.5 w-36 border-r border-slate-200">Seçenek B</th>
                                <th className="p-3.5 w-36 border-r border-slate-200">Seçenek C</th>
                                <th className="p-3.5 w-36 border-r border-slate-200">Seçenek D</th>
                                <th className="p-3.5 w-28 text-center border-r border-slate-200">Doğru Cevap</th>
                                <th className="p-3.5 w-20 text-center">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {questions.map((q, idx) => (
                                <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                                    {/* Soru No */}
                                    <td className="p-3.5 text-center font-black text-slate-800 border-r border-slate-200 align-top">
                                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-sm">
                                            {q.id}
                                        </div>
                                    </td>

                                    {/* Soru Kökü / Görsel / Metin */}
                                    <td className="p-3 border-r border-slate-200 align-top space-y-2">
                                        <textarea
                                            rows={3}
                                            value={q.questionText}
                                            onChange={(e) => handleUpdateField(q.id, 'questionText', e.target.value)}
                                            placeholder="(Soru metnini/görselini buraya yapıştırın veya yazın...)"
                                            className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium text-slate-800 bg-white resize-y"
                                        />

                                        {/* Görsel Önizleme veya Ekleme */}
                                        {q.imageUrl ? (
                                            <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden bg-slate-50 max-w-[200px]">
                                                <img src={q.imageUrl} alt={`Soru ${q.id}`} className="max-h-24 w-auto object-contain" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateField(q.id, 'imageUrl', undefined)}
                                                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-lg hover:bg-rose-700 text-[10px]"
                                                    title="Görseli kaldır"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveImageUploadId(q.id);
                                                    fileInputRef.current?.click();
                                                }}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 bg-slate-50/50 text-[11px] font-medium cursor-pointer"
                                            >
                                                <ImageIcon className="w-3.5 h-3.5" />
                                                Görsel / Şekil Ekle
                                            </button>
                                        )}
                                    </td>

                                    {/* Seçenek A */}
                                    <td className="p-3 border-r border-slate-200 align-top">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400">A</span>
                                            <textarea
                                                rows={2}
                                                value={q.options.A}
                                                onChange={(e) => handleUpdateOption(q.id, 'A', e.target.value)}
                                                placeholder="A seçeneği..."
                                                className={`w-full p-2 rounded-xl border text-xs text-slate-800 resize-none ${
                                                    q.correctAnswer === 'A' ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300' : 'border-slate-200 bg-white'
                                                }`}
                                            />
                                        </div>
                                    </td>

                                    {/* Seçenek B */}
                                    <td className="p-3 border-r border-slate-200 align-top">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400">B</span>
                                            <textarea
                                                rows={2}
                                                value={q.options.B}
                                                onChange={(e) => handleUpdateOption(q.id, 'B', e.target.value)}
                                                placeholder="B seçeneği..."
                                                className={`w-full p-2 rounded-xl border text-xs text-slate-800 resize-none ${
                                                    q.correctAnswer === 'B' ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300' : 'border-slate-200 bg-white'
                                                }`}
                                            />
                                        </div>
                                    </td>

                                    {/* Seçenek C */}
                                    <td className="p-3 border-r border-slate-200 align-top">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400">C</span>
                                            <textarea
                                                rows={2}
                                                value={q.options.C}
                                                onChange={(e) => handleUpdateOption(q.id, 'C', e.target.value)}
                                                placeholder="C seçeneği..."
                                                className={`w-full p-2 rounded-xl border text-xs text-slate-800 resize-none ${
                                                    q.correctAnswer === 'C' ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300' : 'border-slate-200 bg-white'
                                                }`}
                                            />
                                        </div>
                                    </td>

                                    {/* Seçenek D */}
                                    <td className="p-3 border-r border-slate-200 align-top">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400">D</span>
                                            <textarea
                                                rows={2}
                                                value={q.options.D}
                                                onChange={(e) => handleUpdateOption(q.id, 'D', e.target.value)}
                                                placeholder="D seçeneği..."
                                                className={`w-full p-2 rounded-xl border text-xs text-slate-800 resize-none ${
                                                    q.correctAnswer === 'D' ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300' : 'border-slate-200 bg-white'
                                                }`}
                                            />
                                        </div>
                                    </td>

                                    {/* Doğru Cevap Seçici */}
                                    <td className="p-3 text-center border-r border-slate-200 align-middle">
                                        <select
                                            value={q.correctAnswer}
                                            onChange={(e) => handleUpdateField(q.id, 'correctAnswer', e.target.value as any)}
                                            className="px-3 py-2 bg-emerald-50 text-emerald-800 border-2 border-emerald-300 rounded-xl font-black text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </td>

                                    {/* Satır İşlemleri */}
                                    <td className="p-3 text-center align-middle space-y-1">
                                        <button
                                            type="button"
                                            onClick={() => handleDuplicateQuestion(q)}
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                            title="Soruyu çoğalt"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteQuestion(q.id)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                            title="Soruyu sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Alt Bar: Soru Ekle ve Özet */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">
                        Toplam <strong className="text-slate-800">{questions.length}</strong> soru listelendi.
                    </span>
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                        <Plus className="w-4 h-4" /> Soru Satırı Ekle
                    </button>
                </div>
            </div>

            {/* TOPLU KOPYALA-YAPIŞTIR MODALI */}
            {bulkPasteModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <Clipboard className="w-5 h-5 text-indigo-600" />
                                Toplu Soru Yapıştır (Excel / Word / Metin Tablosu)
                            </h3>
                            <button
                                onClick={() => setBulkPasteModalOpen(false)}
                                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                            <p className="font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4 text-amber-600" /> Desteklenen Formatlar:
                            </p>
                            <p>
                                Excel veya Google Sheets tablonuzdan satırları kopyalayıp doğrudan aşağıdaki kutuya yapıştırabilirsiniz.
                            </p>
                            <p className="text-[11px] text-amber-800">
                                <strong>Sıralama:</strong> Soru Kökü [TAB] Seçenek A [TAB] Seçenek B [TAB] Seçenek C [TAB] Seçenek D [TAB] Doğru Cevap
                            </p>
                        </div>

                        <textarea
                            rows={8}
                            value={rawBulkText}
                            onChange={(e) => setRawBulkText(e.target.value)}
                            placeholder={`Örnek:\n36 - 12 : 3 + 2³ işleminin sonucu kaçtır?\t16\t38\t40\t24\tC\n3/7, 5/7 ve 1/7 kesirlerinin sıralanışı?\t1/7 < 3/7 < 5/7\t5/7 < 3/7 < 1/7\t3/7 < 1/7 < 5/7\t1/7 = 3/7 < 5/7\tA`}
                            className="w-full p-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs text-slate-800"
                        />

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setBulkPasteModalOpen(false)}
                                className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                            >
                                İptal
                            </button>
                            <button
                                type="button"
                                onClick={handleApplyBulkPaste}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm"
                            >
                                Soruları Ayrıştır ve Tabloya Aktar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
