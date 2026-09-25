import React, { useState, useEffect } from 'react';
import { CustomMitExam } from '../../../types/customMitExam';
import { getCustomMitExams, deleteCustomMitExam } from '../../../services/customMitExamService';
import { CustomExamSubmissionsModal } from './CustomExamSubmissionsModal';
import { Plus, FileText, Users, Clock, Award, Trash2, Edit3, BarChart2, CheckCircle2, Send, Sparkles, BookOpen } from 'lucide-react';

interface CustomExamListProps {
    onCreateNew: () => void;
    onEditExam: (exam: CustomMitExam) => void;
    state?: any;
    showToast?: (msg: string) => void;
}

export const CustomExamList: React.FC<CustomExamListProps> = ({
    onCreateNew,
    onEditExam,
    state,
    showToast
}) => {
    const [exams, setExams] = useState<CustomMitExam[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedExamForResults, setSelectedExamForResults] = useState<CustomMitExam | null>(null);

    const loadExams = async () => {
        setLoading(true);
        const data = await getCustomMitExams();
        setExams(data);
        setLoading(false);
    };

    useEffect(() => {
        loadExams();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`"${title}" adlı sınavı silmek istediğinize emin misiniz?`)) {
            const success = await deleteCustomMitExam(id);
            if (success) {
                showToast?.('Sınav başarıyla silindi.');
                loadExams();
            } else {
                showToast?.('Sınav silinirken hata oluştu.');
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5" />
                        Öğretmen Özel Sınavları & Dağıtım
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                        Hazırlanan Seviye Tespit Sınavları
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Form 1 ve Form 2 şablonlarıyla hazırlayıp sınıflara veya öğrencilere gönderdiğiniz sınavlar.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreateNew}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Yeni Sınav Oluştur (Form 1 & 2)
                </button>
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
                        PDF şablonuna uygun Form 1 (Soru Şablonu) ve Form 2 (Tanılama Matrisi) kullanarak ilk seviye tespit sınavınızı hazırlayın.
                    </p>
                    <button
                        type="button"
                        onClick={onCreateNew}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
                    >
                        İlk Sınavı Oluştur
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {exams.map((exam) => {
                        const targetLabel = exam.targetType === 'class'
                            ? `${exam.targetClasses.join(', ')} Sınıfı`
                            : `${exam.targetStudents.length} Özel Öğrenci`;

                        return (
                            <div
                                key={exam.id}
                                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-[11px] font-black">
                                            {exam.grade}. Sınıf
                                        </span>
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
                                <div className="pt-2 flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedExamForResults(exam)}
                                        className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                        <BarChart2 className="w-3.5 h-3.5" />
                                        Sonuçlar & Tanı
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
                                        onClick={() => handleDelete(exam.id, exam.title)}
                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                        title="Sınavı Sil"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Öğrenci Sonuçları ve Çeldirici Raporu Modalı */}
            {selectedExamForResults && (
                <CustomExamSubmissionsModal
                    exam={selectedExamForResults}
                    onClose={() => setSelectedExamForResults(null)}
                />
            )}
        </div>
    );
};
