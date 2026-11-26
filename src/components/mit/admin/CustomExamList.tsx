import React, { useState, useEffect } from 'react';
import { CustomMitExam, CustomMitExamFormat } from '../../../types/customMitExam';
import { getCustomMitExams, deleteCustomMitExam } from '../../../services/customMitExamService';
import { CustomExamSubmissionsModal } from './CustomExamSubmissionsModal';
import { Plus, FileText, Users, Clock, Trash2, Edit3, BarChart2, BookOpen, Upload, Brain } from 'lucide-react';

interface CustomExamListProps {
    onCreateNew: (format?: CustomMitExamFormat) => void;
    onEditExam: (exam: CustomMitExam) => void;
    state?: any;
    showToast?: (msg: string) => void;
}

export const CustomExamList: React.FC<CustomExamListProps> = ({
    onCreateNew,
    onEditExam,
    showToast
}) => {
    const [exams, setExams] = useState<CustomMitExam[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedExamForResults, setSelectedExamForResults] = useState<CustomMitExam | null>(null);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const loadExams = async () => {
        setLoading(true);
        const data = await getCustomMitExams();
        setExams(data);
        setLoading(false);
    };

    useEffect(() => {
        loadExams();
    }, []);

    const handleConfirmDelete = async (id: string) => {
        const success = await deleteCustomMitExam(id);
        setPendingDeleteId(null);
        if (success) {
            showToast?.('Sınav başarıyla silindi.');
            loadExams();
        } else {
            showToast?.('Sınav silinirken hata oluştu.');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5" />
                        Öğretmen Özel Sınavları &amp; Dağıtım
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                        Hazırlanan Öğretmen Sınavları
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Klasik test formatında (Word/Excel/Metin) veya Form 1 &amp; 2 tanılama şablonuyla sınav hazırlayıp sınıflara gönderin.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onCreateNew('classic')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                        <Upload className="w-4 h-4" />
                        Klasik Test Yükle / Oluştur
                    </button>
                    <button
                        type="button"
                        onClick={() => onCreateNew('diagnostic')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Tanılama Sınavı (Form 1 &amp; 2)
                    </button>
                </div>
            </div>

            {/* Sınav Kartları Grid */}
            {loading ? (
                <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs">
                    Sınavlar yükleniyor...
                </div>
            ) : exams.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-black text-slate-800">Henüz Öğretmen Sınavı Oluşturulmadı</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Klasik test formatında Word/Excel dosyanızı yükleyerek veya Form 1 &amp; 2 şablonunu kullanarak ilk sınavınızı hazırlayın.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => onCreateNew('classic')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                        >
                            Klasik Test Yükle
                        </button>
                        <button
                            type="button"
                            onClick={() => onCreateNew('diagnostic')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                        >
                            Tanılama Sınavı Oluştur
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {exams.map((exam) => {
                        const isClassic = exam.examFormat === 'classic';
                        const targetLabel = exam.targetType === 'class'
                            ? `${exam.targetClasses.join(', ')} Sınıfı`
                            : `${exam.targetStudents.length} Özel Öğrenci`;

                        return (
                            <div
                                key={exam.id}
                                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-[11px] font-black">
                                                {exam.grade}. Sınıf
                                            </span>
                                            <span className={`px-2 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 ${
                                                isClassic
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-purple-50 text-purple-700 border border-purple-200'
                                            }`}>
                                                {isClassic ? <FileText className="w-3 h-3" /> : <Brain className="w-3 h-3" />}
                                                {isClassic ? 'Klasik Test' : 'Form 1 & 2'}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-slate-400 font-medium">
                                            {exam.createdAt}
                                        </span>
                                    </div>

                                    <h3 className="font-black text-slate-900 text-sm leading-snug line-clamp-2">
                                        {exam.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 line-clamp-2">
                                        {exam.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="flex items-center gap-1.5 text-slate-500">
                                            <Users className="w-3.5 h-3.5 text-indigo-600" /> Hedef:
                                        </span>
                                        <strong className="text-slate-800">{targetLabel}</strong>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="flex items-center gap-1.5 text-slate-500">
                                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Soru:
                                        </span>
                                        <strong className="text-slate-800">{exam.questions.length} Soru</strong>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="w-3.5 h-3.5 text-amber-600" /> Süre:
                                        </span>
                                        <strong className="text-slate-800">{exam.durationMinutes} Dakika</strong>
                                    </div>
                                </div>

                                {/* Alt Aksiyon Butonları */}
                                {pendingDeleteId === exam.id ? (
                                    <div className="pt-2 flex items-center justify-between gap-2 bg-rose-50 border border-rose-200 p-2 rounded-xl">
                                        <span className="text-[11px] font-bold text-rose-800 pl-1">Silinsin mi?</span>
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => handleConfirmDelete(exam.id)}
                                                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-black cursor-pointer"
                                            >
                                                Evet, Sil
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPendingDeleteId(null)}
                                                className="px-2.5 py-1 bg-white text-slate-600 border border-slate-200 rounded-lg text-[11px] font-bold cursor-pointer"
                                            >
                                                Vazgeç
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pt-2 flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedExamForResults(exam)}
                                            className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                        >
                                            <BarChart2 className="w-3.5 h-3.5" />
                                            Sonuçlar &amp; Analiz
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onEditExam(exam)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                                            title="Sınavı Düzenle"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPendingDeleteId(exam.id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                            title="Sınavı Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Öğrenci Sonuçları ve Analiz Raporu Modalı */}
            {selectedExamForResults && (
                <CustomExamSubmissionsModal
                    exam={selectedExamForResults}
                    onClose={() => setSelectedExamForResults(null)}
                />
            )}
        </div>
    );
};
