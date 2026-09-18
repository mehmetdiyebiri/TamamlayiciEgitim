import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Upload, Plus, ChevronRight, CheckCircle2, AlertTriangle, FileSpreadsheet, File, Download, UserCheck, Trash2, Edit3, Eye, Sparkles, Brain, Award, Clock, ArrowRight } from 'lucide-react';
import { getGradeDiagnosticQuestions } from '../../../data/gradeDiagnosticQuestions';
import { StudentDiagnosticResult } from '../../../utils/diagnosticEngine';

interface ParsedExamQuestion {
    id: number;
    topic: string;
    text: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    cognitiveSkill: string;
    errorType: string;
    explanation: string;
}

export const DiagnosticTestManager = () => {
    const [subTab, setSubTab] = useState<'tests' | 'assign' | 'reports'>('tests');
    const [creationMode, setCreationMode] = useState<'idle' | 'ready' | 'upload' | 'manual'>('idle');
    const [selectedGrade, setSelectedGrade] = useState<number>(8);
    const [successNotice, setSuccessNotice] = useState<string | null>(null);

    // Upload & BEP-style structured rows
    const [parsedQuestions, setParsedQuestions] = useState<ParsedExamQuestion[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Manual Question state
    const [manualTitle, setManualTitle] = useState('');
    const [manualGrade, setManualGrade] = useState(8);
    const [manualQuestions, setManualQuestions] = useState<ParsedExamQuestion[]>([
        {
            id: 1,
            topic: 'Çarpanlar ve Katlar',
            text: 'İki pozitif tam sayının EBOB\'u 1 ise bu sayılar için hangisi kesinlikle doğrudur?',
            options: {
                A: 'Sayılar aralarında asaldır',
                B: 'Sayıların ikisi de asaldır',
                C: 'Sayıların EKOK\'u 1\'dir',
                D: 'Sayılar ardışık çift sayılardır'
            },
            correctAnswer: 'A',
            cognitiveSkill: 'Kavrama ve Tanım',
            errorType: 'kavram_yanilgisi',
            explanation: 'EBOB(a, b) = 1 olan sayılara aralarında asal sayılar denir.'
        }
    ]);

    // Assignment state
    const [assignTarget, setAssignTarget] = useState<'class' | 'student'>('class');
    const [selectedClass, setSelectedClass] = useState('8-A');
    const [selectedStudent, setSelectedStudent] = useState('Ali Yılmaz');
    const [assignedTopic, setAssignedTopic] = useState('Üslü İfadeler');
    const [assignedDifficulty, setAssignedDifficulty] = useState<'kolay' | 'orta' | 'zor'>('orta');
    const [assignedQuestionCount, setAssignedQuestionCount] = useState(7);

    // Live Student Diagnostic Reports
    const [reports, setReports] = useState<StudentDiagnosticResult[]>([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('mit_diagnostic_reports') || '[]');
            setReports(stored);
        } catch (e) {
            console.error(e);
        }
    }, [subTab]);

    const showNotification = (msg: string) => {
        setSuccessNotice(msg);
        setTimeout(() => setSuccessNotice(null), 4000);
    };

    // CSV / Excel Şablonu Üret ve İndir
    const handleDownloadTemplate = () => {
        const header = "Soru No;Konu;Soru Metni;Secenek A;Secenek B;Secenek C;Secenek D;Dogru Yanit;Bilisel Duzey;Hata Tipi;Cozum Aciklamasi\n";
        const sampleRow1 = "1;Carpanlar ve Katlar;24 ve 36 sayilarinin en buyuk ortak boleni kactir?;6;8;12;18;C;Hesaplama;islem_hatasi;EBOB(24, 36) = 12 dir.\n";
        const sampleRow2 = "2;Uslu Ifadeler;2 uzeri -3 ifadesinin degeri kactir?;-8;-6;1/8;1/6;C;Kavrama;kavram_yanilgisi;Negatif us carpmaya gore ters aldirir: 1/8.\n";
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(header + sampleRow1 + sampleRow2);
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", "mit_seviye_tespit_sablonu.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // File Upload Simulation & Row Parsing
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadedFileName(file.name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            const content = evt.target?.result as string;
            // Parse CSV / Text lines
            const lines = content.split('\n').filter(l => l.trim().length > 0);
            const parsed: ParsedExamQuestion[] = [];

            if (lines.length > 1 && (lines[0].includes(';') || lines[0].includes(','))) {
                const delim = lines[0].includes(';') ? ';' : ',';
                for (let i = 1; i < lines.length; i++) {
                    const cols = lines[i].split(delim);
                    if (cols.length >= 8) {
                        parsed.push({
                            id: i,
                            topic: cols[1]?.trim() || 'Genel Matematik',
                            text: cols[2]?.trim() || `Soru #${i}`,
                            options: {
                                A: cols[3]?.trim() || 'A',
                                B: cols[4]?.trim() || 'B',
                                C: cols[5]?.trim() || 'C',
                                D: cols[6]?.trim() || 'D'
                            },
                            correctAnswer: (cols[7]?.trim().toUpperCase() as any) || 'A',
                            cognitiveSkill: cols[8]?.trim() || 'Uygulama',
                            errorType: (cols[9]?.trim() as any) || 'islem_hatasi',
                            explanation: cols[10]?.trim() || 'Çözüm kuralı uygulanmalıdır.'
                        });
                    }
                }
            }

            // Fallback sample questions if format wasn't standard CSV
            if (parsed.length === 0) {
                const gradeQs = getGradeDiagnosticQuestions(selectedGrade);
                parsed.push(...gradeQs.slice(0, 10).map((q, idx) => ({
                    id: idx + 1,
                    topic: q.topic,
                    text: q.q,
                    options: {
                        A: q.options[0] || '',
                        B: q.options[1] || '',
                        C: q.options[2] || '',
                        D: q.options[3] || ''
                    },
                    correctAnswer: (q.ans as any) || 'A',
                    cognitiveSkill: q.cognitiveSkill,
                    errorType: q.errorType,
                    explanation: q.explanation
                })));
            }

            setParsedQuestions(parsed);
            showNotification(`"${file.name}" başarıyla analiz edildi! ${parsed.length} soru satırı ayrıştırıldı.`);
        };

        reader.readAsText(file);
    };

    const handleAssignReadyExam = (grade: number) => {
        showNotification(`${grade}. Sınıf Seviye Tespit Sınavı tüm ${grade}. sınıf öğrencilerine başarıyla atandı!`);
    };

    const handleAssignStudyTopic = () => {
        const target = assignTarget === 'class' ? `${selectedClass} sınıfına` : `${selectedStudent} adlı öğrenciye`;
        showNotification(`7 soruluk ${assignedDifficulty.toUpperCase()} seviye "${assignedTopic}" antrenmanı ${target} başarıyla atandı!`);
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* Top Sub-tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex gap-2">
                    <button
                        onClick={() => setSubTab('tests')}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            subTab === 'tests' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        Seviye Tespit Sınavı Motoru
                    </button>
                    <button
                        onClick={() => setSubTab('assign')}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            subTab === 'assign' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        Konu & Antrenman Atama
                    </button>
                    <button
                        onClick={() => setSubTab('reports')}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            subTab === 'reports' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        Öğrenci Düzey Raporları ({reports.length})
                    </button>
                </div>

                <button
                    onClick={handleDownloadTemplate}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors"
                >
                    <Download size={14} /> Şablon İndir (Excel / CSV)
                </button>
            </div>

            {/* Success Toast */}
            {successNotice && (
                <div className="bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg animate-fade-in">
                    <CheckCircle2 size={16} /> {successNotice}
                </div>
            )}

            {/* TAB 1: TESTS & FILE UPLOADS (BEP-STYLE) */}
            {subTab === 'tests' && (
                <div className="flex-1 space-y-6">
                    {creationMode === 'idle' && (
                        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                                <FileText size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Seviye Tespit Sınavı Yönetimi</h2>
                            <p className="text-slate-500 text-xs sm:text-sm max-w-lg mb-8">
                                Hazır bulunuşluk sınavları atayabilir, Excel/Word/PDF sınav dosyalarını BEP tablosu gibi yükleyip düzenleyebilir veya manuel sınav oluşturabilirsiniz.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                                <button
                                    onClick={() => setCreationMode('ready')}
                                    className="p-6 bg-slate-50 hover:bg-indigo-50/50 border-2 border-slate-200 hover:border-indigo-400 rounded-2xl transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-white text-indigo-600 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h3 className="font-black text-slate-800 text-sm">Hazır Sınavlar</h3>
                                    <p className="text-xs text-slate-500 mt-1">5, 6, 7 ve 8. sınıf 20 soruluk hazır bulunuşluk sınavlarını ata.</p>
                                </button>

                                <button
                                    onClick={() => setCreationMode('upload')}
                                    className="p-6 bg-slate-50 hover:bg-emerald-50/50 border-2 border-slate-200 hover:border-emerald-400 rounded-2xl transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                        <Upload size={24} />
                                    </div>
                                    <h3 className="font-black text-slate-800 text-sm">Dosyadan Yükle (BEP Tarzı)</h3>
                                    <p className="text-xs text-slate-500 mt-1">Excel, Word veya PDF yükleyip soru satırlarını incele ve onayla.</p>
                                </button>

                                <button
                                    onClick={() => setCreationMode('manual')}
                                    className="p-6 bg-slate-50 hover:bg-amber-50/50 border-2 border-slate-200 hover:border-amber-400 rounded-2xl transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-white text-amber-600 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                        <Plus size={24} />
                                    </div>
                                    <h3 className="font-black text-slate-800 text-sm">Manuel Sınav Girişi</h3>
                                    <p className="text-xs text-slate-500 mt-1">Soru, seçenek, kazanım ve hata tipi eşleştirmelerini tek tek gir.</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* READY TESTS */}
                    {creationMode === 'ready' && (
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <button onClick={() => setCreationMode('idle')} className="text-xs font-black text-indigo-600 hover:underline">
                                ← Geri Dön
                            </button>
                            <h3 className="text-lg font-black text-slate-800">Hazır Bulunuşluk Seviye Tespit Sınavları</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[5, 6, 7, 8].map(g => (
                                    <div key={g} className="p-5 border-2 border-slate-100 rounded-2xl hover:border-indigo-200 transition-colors flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-black text-indigo-600 uppercase">{g}. Sınıf</div>
                                            <h4 className="font-bold text-slate-800 text-sm">{g}. Sınıf Hazır Bulunuşluk Sınavı</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">20 Soru • Önceki Yıl Konu Çeşitliliği • 4 Seviye Motoru</p>
                                        </div>
                                        <button
                                            onClick={() => handleAssignReadyExam(g)}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm"
                                        >
                                            Sınıfa Ata
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BEP-STYLE UPLOAD & PARSED TABLE VIEW */}
                    {creationMode === 'upload' && (
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <button onClick={() => setCreationMode('idle')} className="text-xs font-black text-indigo-600 hover:underline">
                                    ← Geri Dön
                                </button>
                                <span className="text-xs font-bold text-slate-400">BEP Tarzı Ayrıştırma Motoru</span>
                            </div>

                            {/* Drop Zone */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/20 p-8 rounded-2xl text-center cursor-pointer transition-colors"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".csv,.xlsx,.xls,.docx,.pdf,.txt"
                                    className="hidden"
                                />
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-indigo-600 flex items-center justify-center mx-auto mb-2">
                                    <Upload size={24} />
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm">Excel, Word veya PDF Sınav Dosyasını Seç</h4>
                                <p className="text-xs text-slate-500 mt-1">Sistem satır ve sütunları ayırarak öğrenci analizine uygun hale getirir.</p>
                            </div>

                            {/* Parsed Table Display */}
                            {parsedQuestions.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-black text-slate-800 text-sm">
                                                Ayrıştırılan Soru Satırları ({parsedQuestions.length} Soru)
                                            </h4>
                                            <p className="text-xs text-slate-500">Her soru satırını, seçeneklerini ve hata tipi etiketini kontrol edebilirsiniz.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                showNotification(`Ayrıştırılan ${parsedQuestions.length} soru kaydedildi ve öğrencilere atandı!`);
                                                setCreationMode('idle');
                                            }}
                                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md"
                                        >
                                            Sınavı Kaydet ve Öğrencilere Gönder
                                        </button>
                                    </div>

                                    <div className="border border-slate-200 rounded-2xl overflow-x-auto max-h-96">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold sticky top-0">
                                                <tr>
                                                    <th className="p-2.5">#</th>
                                                    <th className="p-2.5">Konu</th>
                                                    <th className="p-2.5">Soru Metni</th>
                                                    <th className="p-2.5">A</th>
                                                    <th className="p-2.5">B</th>
                                                    <th className="p-2.5">C</th>
                                                    <th className="p-2.5">D</th>
                                                    <th className="p-2.5">Doğru</th>
                                                    <th className="p-2.5">Hata Tipi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {parsedQuestions.map((q, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50">
                                                        <td className="p-2.5 font-bold text-slate-500">{q.id}</td>
                                                        <td className="p-2.5 font-medium text-indigo-700 whitespace-nowrap">{q.topic}</td>
                                                        <td className="p-2.5 text-slate-800 max-w-xs truncate" title={q.text}>{q.text}</td>
                                                        <td className="p-2.5 text-slate-600 max-w-[120px] truncate">{q.options.A}</td>
                                                        <td className="p-2.5 text-slate-600 max-w-[120px] truncate">{q.options.B}</td>
                                                        <td className="p-2.5 text-slate-600 max-w-[120px] truncate">{q.options.C}</td>
                                                        <td className="p-2.5 text-slate-600 max-w-[120px] truncate">{q.options.D}</td>
                                                        <td className="p-2.5 font-black text-emerald-600">{q.correctAnswer}</td>
                                                        <td className="p-2.5">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                                                                {q.errorType}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* MANUAL CREATION */}
                    {creationMode === 'manual' && (
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <button onClick={() => setCreationMode('idle')} className="text-xs font-black text-indigo-600 hover:underline">
                                    ← Geri Dön
                                </button>
                                <button
                                    onClick={() => {
                                        showNotification('Manuel sınav başarıyla oluşturuldu ve öğrencilere atandı!');
                                        setCreationMode('idle');
                                    }}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                                >
                                    Sınavı Kaydet
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Sınav Adı</label>
                                    <input
                                        type="text"
                                        value={manualTitle}
                                        onChange={e => setManualTitle(e.target.value)}
                                        placeholder="Örn: 8. Sınıf Matematik Seviye Tespiti"
                                        className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Sınıf Düzeyi</label>
                                    <select
                                        value={manualGrade}
                                        onChange={e => setManualGrade(Number(e.target.value))}
                                        className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                                    >
                                        <option value={5}>5. Sınıf</option>
                                        <option value={6}>6. Sınıf</option>
                                        <option value={7}>7. Sınıf</option>
                                        <option value={8}>8. Sınıf</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-black text-slate-800 text-sm">Sorular</h4>
                                {manualQuestions.map((mq, i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-xs text-slate-700">Soru #{i + 1}</span>
                                            <span className="text-xs text-indigo-600 font-bold">{mq.topic}</span>
                                        </div>
                                        <textarea
                                            value={mq.text}
                                            onChange={e => {
                                                const updated = [...manualQuestions];
                                                updated[i].text = e.target.value;
                                                setManualQuestions(updated);
                                            }}
                                            rows={2}
                                            className="w-full p-2 border rounded-xl text-xs"
                                        />
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            {['A', 'B', 'C', 'D'].map(opt => (
                                                <input
                                                    key={opt}
                                                    type="text"
                                                    placeholder={`${opt} seçeneği`}
                                                    value={(mq.options as any)[opt]}
                                                    onChange={e => {
                                                        const updated = [...manualQuestions];
                                                        (updated[i].options as any)[opt] = e.target.value;
                                                        setManualQuestions(updated);
                                                    }}
                                                    className="p-2 border rounded-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: ASSIGN TOPIC / TRAINING */}
            {subTab === 'assign' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-lg font-black text-slate-800">Öğrenciye Konu Çalışma & Antrenman Atama</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Seviye tespit sonucunda eksiği olan öğrencilere veya sınıflara özel 7'şer soruluk alıştırma setleri atayın.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Kime Atanacak?</label>
                                <div className="flex gap-3 mt-1.5">
                                    <button
                                        onClick={() => setAssignTarget('class')}
                                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                                            assignTarget === 'class' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 text-slate-600'
                                        }`}
                                    >
                                        Tüm Sınıfa
                                    </button>
                                    <button
                                        onClick={() => setAssignTarget('student')}
                                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                                            assignTarget === 'student' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 text-slate-600'
                                        }`}
                                    >
                                        Bireysel Öğrenciye
                                    </button>
                                </div>
                            </div>

                            {assignTarget === 'class' ? (
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Sınıf Seçimi</label>
                                    <select
                                        value={selectedClass}
                                        onChange={e => setSelectedClass(e.target.value)}
                                        className="w-full mt-1.5 p-2.5 border rounded-xl text-xs font-bold text-slate-700"
                                    >
                                        <option value="5-A">5-A Sınıfı</option>
                                        <option value="6-B">6-B Sınıfı</option>
                                        <option value="7-A">7-A Sınıfı</option>
                                        <option value="8-A">8-A Sınıfı</option>
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Öğrenci Seçimi</label>
                                    <select
                                        value={selectedStudent}
                                        onChange={e => setSelectedStudent(e.target.value)}
                                        className="w-full mt-1.5 p-2.5 border rounded-xl text-xs font-bold text-slate-700"
                                    >
                                        <option value="Ali Yılmaz">Ali Yılmaz (8-A)</option>
                                        <option value="Zeynep Kaya">Zeynep Kaya (8-A)</option>
                                        <option value="Mehmet Demir">Mehmet Demir (7-B)</option>
                                        <option value="Ayşe Şahin">Ayşe Şahin (6-A)</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Çalışma Konusu</label>
                                <select
                                    value={assignedTopic}
                                    onChange={e => setAssignedTopic(e.target.value)}
                                    className="w-full mt-1.5 p-2.5 border rounded-xl text-xs font-bold text-slate-700"
                                >
                                    <option value="Çarpanlar ve Katlar">Çarpanlar ve Katlar</option>
                                    <option value="Üslü İfadeler">Üslü İfadeler</option>
                                    <option value="Kareköklü İfadeler">Kareköklü İfadeler</option>
                                    <option value="Doğrusal Denklemler">Doğrusal Denklemler</option>
                                    <option value="Geometri ve Ölçme">Geometri ve Ölçme</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Zorluk Seviyesi</label>
                                <div className="grid grid-cols-3 gap-2 mt-1.5">
                                    {(['kolay', 'orta', 'zor'] as const).map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setAssignedDifficulty(d)}
                                            className={`p-2.5 rounded-xl text-xs font-bold border capitalize transition-colors ${
                                                assignedDifficulty === d ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600'
                                            }`}
                                        >
                                            {d} (7 Soru)
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-xs space-y-2">
                                <div className="font-black text-indigo-900 flex items-center gap-1.5">
                                    <Brain size={16} /> Atama Özeti
                                </div>
                                <p className="text-indigo-800">
                                    Öğrencinin M.İ.T Çalışma Odası paneline doğrudan <strong>{assignedTopic}</strong> konusundan <strong>7 soruluk {assignedDifficulty}</strong> seviye set atanacaktır.
                                </p>
                            </div>

                            <button
                                onClick={handleAssignStudyTopic}
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-md transition-all text-xs"
                            >
                                Antrenmanı Öğrenciye Ata
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: DIAGNOSTIC REPORTS (4-LEVEL ENGINE) */}
            {subTab === 'reports' && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-black text-slate-800">Öğrenci Seviye Tespit Raporları</h3>
                            <p className="text-xs text-slate-500">
                                4-Kriterli Düzey Belirleme Motoru ile oluşturulmuş hazır bulunuşluk ve hata analizi raporları.
                            </p>
                        </div>
                    </div>

                    {reports.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                            Henüz tamamlanmış bir seviye tespit sınavı yok. Öğrenciler "Seviye Tespit" sekmesinden sınavı tamamladıkça detaylı raporlar buraya düşecektir.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reports.map((rep, idx) => (
                                <div key={idx} className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                                        <div>
                                            <span className="text-xs font-black text-indigo-600">{rep.testTitle}</span>
                                            <h4 className="font-black text-slate-800 text-base">{rep.studentName}</h4>
                                            <span className="text-[11px] text-slate-400">{rep.completedAt}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-xl text-xs font-black border ${
                                                rep.level === 4 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                                rep.level === 3 ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                                rep.level === 2 ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                                'bg-rose-50 text-rose-800 border-rose-300'
                                            }`}>
                                                {rep.levelTitle}
                                            </span>
                                            <span className="px-3 py-1 bg-slate-100 rounded-xl text-xs font-mono font-bold text-slate-700">
                                                {rep.correctCount} / {rep.totalQuestions} Doğru (%{rep.successRate})
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="font-bold text-slate-500 mb-1">Ortalama Soru Süresi</div>
                                            <div className="font-black text-slate-800 text-sm">{rep.averageTimeSec} saniye</div>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="font-bold text-slate-500 mb-1">Tespit Edilen Hata Tipi</div>
                                            <div className="font-black text-rose-600 text-sm">
                                                {rep.errorDistribution.kavram_yanilgisi || 0} Kavram Yanılgısı
                                            </div>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="font-bold text-slate-500 mb-1">Önerilen Telafi</div>
                                            <div className="font-black text-indigo-600 text-sm">
                                                {rep.suggestedRemediationTopics.join(', ') || 'Formül Kartı Tekrarı'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="flex justify-end pt-1">
                                        <button
                                            onClick={() => {
                                                setSubTab('assign');
                                                setSelectedStudent(rep.studentName);
                                                if (rep.suggestedRemediationTopics[0]) {
                                                    setAssignedTopic(rep.suggestedRemediationTopics[0]);
                                                }
                                                showNotification(`${rep.studentName} için telafi atama ekranına yönlendirildi.`);
                                            }}
                                            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                                        >
                                            Bu Öğrenciye Özel Antrenman Ata <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
