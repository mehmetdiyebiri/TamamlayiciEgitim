import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { CustomMitQuestion } from '../../../types/customMitExam';
import {
    parseClassicTestText,
    parseClassicAnswerKey,
    parseBulkQuestionsInput
} from '../../../services/customMitExamService';
import {
    Upload,
    FileText,
    FileSpreadsheet,
    Download,
    Plus,
    Trash2,
    CheckCircle2,
    Image as ImageIcon,
    Sparkles,
    KeyRound,
    ClipboardPaste,
    X
} from 'lucide-react';

interface ClassicTestUploaderProps {
    grade: 5 | 6 | 7 | 8;
    questions: CustomMitQuestion[];
    onChangeQuestions: (questions: CustomMitQuestion[]) => void;
    showToast?: (msg: string) => void;
}

const SAMPLE_CLASSIC_TEST = `1. 24 ve 36 sayılarının en büyük ortak böleni (EBOB) kaçtır?
A) 6
B) 8
C) 12
D) 18
Cevap: C

2. Bir dikdörtgenin kısa kenarı 7 cm, uzun kenarı 12 cm olduğuna göre alanı kaç cm²'dir?
A) 38
B) 72
C) 84
D) 96
Cevap: C

3. 3/4 + 5/8 işleminin sonucu aşağıdakilerden hangisidir?
A) 8/12
B) 11/8
C) 9/8
D) 13/8
Cevap: B`;

export const ClassicTestUploader: React.FC<ClassicTestUploaderProps> = ({
    grade,
    questions,
    onChangeQuestions,
    showToast
}) => {
    const [rawText, setRawText] = useState('');
    const [bulkAnswerKey, setBulkAnswerKey] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [activeImageQId, setActiveImageQId] = useState<number | null>(null);
    const [uploadMode, setUploadMode] = useState<'file_or_paste' | 'manual'>('file_or_paste');

    const docFileInputRef = useRef<HTMLInputElement>(null);
    const imgFileInputRef = useRef<HTMLInputElement>(null);

    // Klasik Test Excel (.xlsx) Şablonu İndir
    const handleDownloadClassicExcelTemplate = () => {
        const rows = [
            ['Soru No', 'Konu', 'Soru Metni', 'A', 'B', 'C', 'D', 'Doğru Cevap', 'Puan'],
            [1, 'Sayılar ve İşlemler', '24 ve 36 sayılarının en büyük ortak böleni (EBOB) kaçtır?', '6', '8', '12', '18', 'C', 20],
            [2, 'Geometrik Nicelikler', 'Kısa kenarı 7 cm, uzun kenarı 12 cm olan dikdörtgenin alanı kaç cm²\'dir?', '38', '72', '84', '96', 'C', 20],
            [3, 'Kesirler', '3/4 + 5/8 işleminin sonucu kaçtır?', '8/12', '11/8', '9/8', '13/8', 'B', 20]
        ];
        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = [
            { wch: 9 },
            { wch: 22 },
            { wch: 52 },
            { wch: 16 },
            { wch: 16 },
            { wch: 16 },
            { wch: 16 },
            { wch: 14 },
            { wch: 8 }
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Klasik Test');
        XLSX.writeFile(wb, `MIT_${grade}_Sinif_Klasik_Test_Sablonu.xlsx`);
        showToast?.('Klasik test Excel şablonu indirildi.');
    };

    // Dosyadan Yükle (.docx, .xlsx, .xls, .csv, .txt)
    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedFileName(file.name);
        const lowerName = file.name.toLowerCase();

        try {
            if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
                const buffer = await file.arrayBuffer();
                const wb = XLSX.read(buffer, { type: 'array' });
                const sheetName = wb.SheetNames[0];
                const sheet = wb.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });

                const parsed: CustomMitQuestion[] = [];
                rows.forEach((row) => {
                    if (!Array.isArray(row) || row.length < 5) return;
                    const c0 = String(row[0] ?? '').trim();
                    const c0Low = c0.toLowerCase();
                    if (!c0 && !String(row[2] ?? '').trim()) return;
                    if (c0Low.includes('soru no') || c0Low.includes('soru metni') || c0Low === 'no') return;

                    let topic = `${grade}. Sınıf Matematik`;
                    let qText = '';
                    let optA = '';
                    let optB = '';
                    let optC = '';
                    let optD = '';
                    let ans: 'A' | 'B' | 'C' | 'D' = 'A';
                    let pts: number | undefined;

                    if (!isNaN(Number(c0)) && row.length >= 8) {
                        topic = String(row[1] ?? '').trim() || topic;
                        qText = String(row[2] ?? '').trim();
                        optA = String(row[3] ?? '').trim();
                        optB = String(row[4] ?? '').trim();
                        optC = String(row[5] ?? '').trim();
                        optD = String(row[6] ?? '').trim();
                        const rawAns = String(row[7] ?? 'A').trim().toUpperCase().slice(0, 1);
                        if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
                        if (row[8] !== undefined && String(row[8]).trim() !== '' && !isNaN(Number(row[8]))) {
                            pts = Number(row[8]);
                        }
                    } else if (!isNaN(Number(c0)) && row.length >= 6) {
                        qText = String(row[1] ?? '').trim();
                        optA = String(row[2] ?? '').trim();
                        optB = String(row[3] ?? '').trim();
                        optC = String(row[4] ?? '').trim();
                        optD = String(row[5] ?? '').trim();
                        const rawAns = String(row[6] ?? 'A').trim().toUpperCase().slice(0, 1);
                        if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
                    } else {
                        qText = c0;
                        optA = String(row[1] ?? '').trim();
                        optB = String(row[2] ?? '').trim();
                        optC = String(row[3] ?? '').trim();
                        optD = String(row[4] ?? '').trim();
                        const rawAns = String(row[5] ?? 'A').trim().toUpperCase().slice(0, 1);
                        if (['A', 'B', 'C', 'D'].includes(rawAns)) ans = rawAns as any;
                    }

                    if (!qText) return;
                    parsed.push({
                        id: parsed.length + 1,
                        questionText: qText,
                        options: {
                            A: optA || 'A Seçeneği',
                            B: optB || 'B Seçeneği',
                            C: optC || 'C Seçeneği',
                            D: optD || 'D Seçeneği'
                        },
                        correctAnswer: ans,
                        learningArea: topic,
                        outcomeCode: `M.${grade}.1`,
                        outcomeDescription: 'Klasik test sorusu.',
                        distractorAnalysis: {
                            A: ans === 'A' ? 'Doğru Cevap' : 'Yanlış seçenek',
                            B: ans === 'B' ? 'Doğru Cevap' : 'Yanlış seçenek',
                            C: ans === 'C' ? 'Doğru Cevap' : 'Yanlış seçenek',
                            D: ans === 'D' ? 'Doğru Cevap' : 'Yanlış seçenek'
                        },
                        cognitiveLevel: 'Klasik Test',
                        ...(pts ? { points: pts } : {})
                    });
                });

                if (parsed.length > 0) {
                    onChangeQuestions(parsed);
                    showToast?.(`"${file.name}" dosyasından ${parsed.length} klasik test sorusu başarıyla yüklendi.`);
                } else {
                    showToast?.('Excel dosyasında geçerli soru satırı bulunamadı. Lütfen şablon sütunlarını kontrol edin.');
                }
            } else if (lowerName.endsWith('.docx')) {
                const buffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer: buffer });
                const text = result.value || '';
                setRawText(text);
                const parsed = parseClassicTestText(text, grade, bulkAnswerKey);
                if (parsed.length > 0) {
                    onChangeQuestions(parsed);
                    showToast?.(`Word belgesinden ${parsed.length} soru ayrıştırıldı. Aşağıdan kontrol edebilirsiniz.`);
                } else {
                    showToast?.('Word içeriği metin kutusuna aktarıldı; soru numaralarını kontrol edip "Soruları Ayrıştır"a basın.');
                }
            } else {
                const text = await file.text();
                setRawText(text);
                const parsed = lowerName.endsWith('.csv')
                    ? parseBulkQuestionsInput(text, 1, grade)
                    : parseClassicTestText(text, grade, bulkAnswerKey);
                if (parsed.length > 0) {
                    onChangeQuestions(parsed);
                    showToast?.(`"${file.name}" dosyasından ${parsed.length} soru yüklendi.`);
                } else {
                    showToast?.('Dosya içeriği metin alanına aktarıldı, ayrıştırma için formatı kontrol edin.');
                }
            }
        } catch (err) {
            console.error('Classic test upload error:', err);
            showToast?.('Dosya okunurken bir hata oluştu. Lütfen .xlsx, .docx, .csv veya .txt formatı deneyin.');
        } finally {
            e.target.value = '';
        }
    };

    const handleParseRawText = () => {
        if (!rawText.trim()) {
            showToast?.('Lütfen önce klasik test metnini yapıştırın.');
            return;
        }
        const parsed = parseClassicTestText(rawText, grade, bulkAnswerKey);
        if (parsed.length === 0) {
            showToast?.('Soru ayrıştırılamadı. Örnek formatı (1. Soru... A) ... B) ... C) ... D) ...) kullanın.');
            return;
        }
        onChangeQuestions(parsed);
        showToast?.(`${parsed.length} klasik test sorusu başarıyla ayrıştırıldı!`);
    };

    const handleApplyBulkAnswerKey = () => {
        if (!bulkAnswerKey.trim()) {
            showToast?.('Lütfen cevap anahtarını girin (örn: 1-A 2-C 3-B veya ACBD).');
            return;
        }
        const map = parseClassicAnswerKey(bulkAnswerKey);
        const keyCount = Object.keys(map).length;
        if (keyCount === 0) {
            showToast?.('Geçerli cevap anahtarı bulunamadı (A, B, C veya D harfleri kullanın).');
            return;
        }
        let applied = 0;
        const updated = questions.map((q, idx) => {
            const ans = map[q.id] || map[idx + 1];
            if (!ans) return q;
            applied++;
            return {
                ...q,
                correctAnswer: ans,
                distractorAnalysis: {
                    A: ans === 'A' ? 'Doğru Cevap' : 'Yanlış seçenek',
                    B: ans === 'B' ? 'Doğru Cevap' : 'Yanlış seçenek',
                    C: ans === 'C' ? 'Doğru Cevap' : 'Yanlış seçenek',
                    D: ans === 'D' ? 'Doğru Cevap' : 'Yanlış seçenek'
                }
            };
        });
        onChangeQuestions(updated);
        showToast?.(`${applied} sorunun doğru cevabı anahtardan güncellendi.`);
    };

    const handleAddClassicQuestion = () => {
        const nextId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        const newQ: CustomMitQuestion = {
            id: nextId,
            questionText: '',
            options: { A: '', B: '', C: '', D: '' },
            correctAnswer: 'A',
            learningArea: `${grade}. Sınıf Matematik`,
            outcomeCode: `M.${grade}.1`,
            outcomeDescription: 'Klasik test sorusu.',
            distractorAnalysis: {
                A: 'Doğru Cevap',
                B: 'Yanlış seçenek',
                C: 'Yanlış seçenek',
                D: 'Yanlış seçenek'
            },
            cognitiveLevel: 'Klasik Test'
        };
        onChangeQuestions([...questions, newQ]);
    };

    const handleDeleteQuestion = (id: number) => {
        if (questions.length <= 1) {
            showToast?.('Testte en az 1 soru bulunmalıdır.');
            return;
        }
        const reindexed = questions.filter(q => q.id !== id).map((q, idx) => ({ ...q, id: idx + 1 }));
        onChangeQuestions(reindexed);
    };

    const handleUpdateField = (id: number, field: keyof CustomMitQuestion, value: any) => {
        onChangeQuestions(
            questions.map(q => {
                if (q.id !== id) return q;
                const next = { ...q, [field]: value };
                if (field === 'correctAnswer') {
                    const ans = value as 'A' | 'B' | 'C' | 'D';
                    next.distractorAnalysis = {
                        A: ans === 'A' ? 'Doğru Cevap' : 'Yanlış seçenek',
                        B: ans === 'B' ? 'Doğru Cevap' : 'Yanlış seçenek',
                        C: ans === 'C' ? 'Doğru Cevap' : 'Yanlış seçenek',
                        D: ans === 'D' ? 'Doğru Cevap' : 'Yanlış seçenek'
                    };
                }
                return next;
            })
        );
    };

    const handleUpdateOption = (id: number, optKey: 'A' | 'B' | 'C' | 'D', value: string) => {
        onChangeQuestions(
            questions.map(q =>
                q.id === id ? { ...q, options: { ...q.options, [optKey]: value } } : q
            )
        );
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || activeImageQId === null) return;
        const reader = new FileReader();
        reader.onload = evt => {
            handleUpdateField(activeImageQId, 'imageUrl', evt.target?.result as string);
            setActiveImageQId(null);
            showToast?.('Soru görseli eklendi.');
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    return (
        <div className="space-y-6">
            <input
                type="file"
                ref={docFileInputRef}
                onChange={handleDocumentUpload}
                accept=".xlsx,.xls,.docx,.csv,.txt"
                className="hidden"
            />
            <input
                type="file"
                ref={imgFileInputRef}
                onChange={handleImageFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Header Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5" />
                        Klasik Çoktan Seçmeli Test Formatı
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                        Klasik Test Yükle &amp; Düzenle
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                        Hazır Word (.docx), Excel (.xlsx), CSV veya düz metin testlerinizi klasik test formatında (1. Soru... A) B) C) D) Cevap: ...) doğrudan yükleyin ya da yapıştırın.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleDownloadClassicExcelTemplate}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                        <Download className="w-4 h-4" />
                        Klasik Test Excel Şablonu
                    </button>
                    <button
                        type="button"
                        onClick={() => docFileInputRef.current?.click()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                        <Upload className="w-4 h-4" />
                        Word / Excel / TXT Yükle
                    </button>
                </div>
            </div>

            {/* Yükleme / Yapıştırma Alanı */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setUploadMode('file_or_paste')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                                uploadMode === 'file_or_paste'
                                    ? 'bg-white text-indigo-700 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <ClipboardPaste className="w-3.5 h-3.5" />
                            Dosyadan Yükle / Metin Yapıştır
                        </button>
                        <button
                            type="button"
                            onClick={() => setUploadMode('manual')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                                uploadMode === 'manual'
                                    ? 'bg-white text-indigo-700 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Sadece Soru Listesi ({questions.length})
                        </button>
                    </div>

                    {uploadedFileName && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yüklendi: {uploadedFileName}
                        </span>
                    )}
                </div>

                {uploadMode === 'file_or_paste' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Sol: Metin Yapıştırma */}
                        <div className="lg:col-span-2 space-y-2.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-black text-slate-700">
                                    Klasik Test Metni (Word / PDF'den Kopyala-Yapıştır)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setRawText(SAMPLE_CLASSIC_TEST)}
                                    className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <Sparkles className="w-3 h-3" /> Örnek Format Doldur
                                </button>
                            </div>
                            <textarea
                                rows={8}
                                value={rawText}
                                onChange={e => setRawText(e.target.value)}
                                placeholder={`1. Soru metnini buraya yazın veya yapıştırın...\nA) Birinci seçenek\nB) İkinci seçenek\nC) Üçüncü seçenek\nD) Dördüncü seçenek\nCevap: B`}
                                className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            />
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-[11px] text-slate-500">
                                    Desteklenen biçimler: <b>1. / 1) / Soru 1:</b> ve <b>A) B) C) D)</b> (satır satır veya yan yana).
                                </p>
                                <button
                                    type="button"
                                    onClick={handleParseRawText}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                                >
                                    <FileSpreadsheet className="w-4 h-4" />
                                    Metinden Soruları Ayrıştır
                                </button>
                            </div>
                        </div>

                        {/* Sağ: Dosya Bırakma + Toplu Cevap Anahtarı */}
                        <div className="space-y-4">
                            <div
                                onClick={() => docFileInputRef.current?.click()}
                                className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 p-5 rounded-2xl text-center cursor-pointer transition-colors space-y-2"
                            >
                                <div className="w-10 h-10 bg-white rounded-xl shadow-xs text-indigo-600 flex items-center justify-center mx-auto">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-black text-slate-800">
                                    Dosya Seç ve Yükle
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Word (<b>.docx</b>), Excel (<b>.xlsx</b>), <b>.csv</b> veya <b>.txt</b> klasik test dosyası
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                                <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                                    <KeyRound className="w-4 h-4 text-amber-600" />
                                    Toplu Cevap Anahtarı (İsteğe Bağlı)
                                </div>
                                <input
                                    type="text"
                                    value={bulkAnswerKey}
                                    onChange={e => setBulkAnswerKey(e.target.value)}
                                    placeholder="Örn: 1-C 2-A 3-B 4-D veya CABD"
                                    className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyBulkAnswerKey}
                                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black transition-colors cursor-pointer"
                                >
                                    Cevap Anahtarını Sorulara Uygula
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Ayrıştırılan / Düzenlenebilir Klasik Soru Listesi */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-black text-slate-900">
                            Test Soruları ({questions.length} Soru)
                        </h3>
                        <p className="text-xs text-slate-500">
                            Her sorunun metnini, A-B-C-D şıklarını, görselini ve doğru cevabını son kez kontrol edip düzenleyebilirsiniz.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddClassicQuestion}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Yeni Klasik Soru Ekle
                    </button>
                </div>

                <div className="space-y-4">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                                        {q.id}
                                    </span>
                                    <input
                                        type="text"
                                        value={q.learningArea}
                                        onChange={e => handleUpdateField(q.id, 'learningArea', e.target.value)}
                                        placeholder="Konu / Ünite adı (isteğe bağlı)"
                                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                                        <span className="text-[11px] font-bold text-slate-500 px-1.5">Doğru:</span>
                                        {(['A', 'B', 'C', 'D'] as const).map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => handleUpdateField(q.id, 'correctAnswer', opt)}
                                                className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                                    q.correctAnswer === opt
                                                        ? 'bg-emerald-600 text-white shadow-xs'
                                                        : 'text-slate-600 hover:bg-white'
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveImageQId(q.id);
                                            imgFileInputRef.current?.click();
                                        }}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                                        title="Soruya Görsel Ekle"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(q.id)}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                        title="Soruyu Sil"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Soru Metni */}
                            <textarea
                                rows={2}
                                value={q.questionText}
                                onChange={e => handleUpdateField(q.id, 'questionText', e.target.value)}
                                placeholder={`${q.id}. soru metnini yazın...`}
                                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            {/* Görsel Önizleme */}
                            {q.imageUrl && (
                                <div className="relative inline-block border border-slate-200 rounded-2xl p-2 bg-slate-50">
                                    <img
                                        src={q.imageUrl}
                                        alt={`Soru ${q.id}`}
                                        className="max-h-40 rounded-xl object-contain"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleUpdateField(q.id, 'imageUrl', undefined)}
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-sm cursor-pointer"
                                        title="Görseli Kaldır"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}

                            {/* A, B, C, D Şıkları */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                                    const isCorrect = q.correctAnswer === opt;
                                    return (
                                        <div
                                            key={opt}
                                            className={`flex items-center gap-2 p-2 rounded-xl border transition-colors ${
                                                isCorrect
                                                    ? 'border-emerald-300 bg-emerald-50/50'
                                                    : 'border-slate-200 bg-white'
                                            }`}
                                        >
                                            <span
                                                className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                                    isCorrect
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}
                                            >
                                                {opt}
                                            </span>
                                            <input
                                                type="text"
                                                value={q.options[opt]}
                                                onChange={e => handleUpdateOption(q.id, opt, e.target.value)}
                                                placeholder={`${opt} seçeneği`}
                                                className="flex-1 text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
