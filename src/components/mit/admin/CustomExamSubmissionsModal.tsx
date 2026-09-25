import React, { useState, useEffect } from 'react';
import { CustomMitExam, CustomMitExamResult } from '../../../types/customMitExam';
import { getCustomExamSubmissions } from '../../../services/customMitExamService';
import { X, Award, Brain, Clock, Users, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface CustomExamSubmissionsModalProps {
    exam: CustomMitExam;
    onClose: () => void;
}

export const CustomExamSubmissionsModal: React.FC<CustomExamSubmissionsModalProps> = ({
    exam,
    onClose
}) => {
    const [submissions, setSubmissions] = useState<CustomMitExamResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await getCustomExamSubmissions(exam.id);
            setSubmissions(data);
            setLoading(false);
        };
        load();
    }, [exam.id]);

    // Ortalama Başarı
    const avgScore = submissions.length > 0
        ? Math.round(submissions.reduce((acc, curr) => acc + curr.score, 0) / submissions.length)
        : 0;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 animate-in fade-in zoom-in-95">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase">
                            Öğrenci Sonuçları & Tanılama Raporu
                        </span>
                        <h2 className="text-xl font-black text-slate-900 mt-1">{exam.title}</h2>
                        <p className="text-xs text-slate-500">
                            Hedef: {exam.targetType === 'class' ? `${exam.targetClasses.join(', ')} Sınıfı` : `${exam.targetStudents.length} Öğrenci`} | Toplam {exam.questions.length} Soru
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center">
                        <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                        <span className="text-xs text-indigo-900 font-bold">Tamamlayan</span>
                        <h4 className="text-xl font-black text-indigo-950">{submissions.length} Öğrenci</h4>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                        <Award className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                        <span className="text-xs text-emerald-900 font-bold">Ortalama Başarı</span>
                        <h4 className="text-xl font-black text-emerald-950">%{avgScore}</h4>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                        <Brain className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                        <span className="text-xs text-amber-900 font-bold">Kazanım Sayısı</span>
                        <h4 className="text-xl font-black text-amber-950">{exam.questions.length}</h4>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <Clock className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                        <span className="text-xs text-slate-600 font-bold">Sınav Süresi</span>
                        <h4 className="text-xl font-black text-slate-800">{exam.durationMinutes} Dk</h4>
                    </div>
                </div>

                {/* Pedagojik Çeldirici Haritası Analizi */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                        <Brain className="w-4 h-4 text-indigo-600" />
                        Soru Bazlı Pedagojik Çeldirici Haritası
                    </h3>
                    <div className="space-y-2">
                        {exam.questions.map((q) => {
                            // Bu soruda kaç öğrenci hangi seçeneği seçti
                            const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
                            submissions.forEach(sub => {
                                const ans = sub.answers.find(a => a.questionId === q.id);
                                if (ans?.selectedOption && counts[ans.selectedOption] !== undefined) {
                                    counts[ans.selectedOption]++;
                                }
                            });

                            return (
                                <div key={q.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-slate-900">Soru #{q.id}:</span>
                                            <span className="text-slate-600 font-medium truncate max-w-md">{q.questionText}</span>
                                        </div>
                                        <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                            {q.outcomeCode} ({q.cognitiveLevel})
                                        </span>
                                    </div>

                                    {/* Seçenekler & Çeldirici Dağılımı */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                        {(['A', 'B', 'C', 'D'] as const).map(opt => {
                                            const isCorrect = q.correctAnswer === opt;
                                            const count = counts[opt] || 0;
                                            const diagnose = q.distractorAnalysis[opt];
                                            return (
                                                <div 
                                                    key={opt}
                                                    className={`p-2 rounded-lg border text-[11px] space-y-0.5 ${
                                                        isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200'
                                                    }`}
                                                >
                                                    <div className="flex justify-between font-bold">
                                                        <span className={isCorrect ? 'text-emerald-800' : 'text-slate-700'}>
                                                            {opt}) {count} Öğrenci
                                                        </span>
                                                        {isCorrect && <span className="text-[10px] text-emerald-600">Doğru</span>}
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 truncate" title={diagnose}>
                                                        {diagnose}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Öğrenci Detay Listesi */}
                <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase text-slate-700">
                        Katılan Öğrenciler ve Bireysel Raporlar ({submissions.length})
                    </h3>

                    {submissions.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                            Henüz bu sınava katılan öğrenci bulunmuyor. Öğrenciler sınavı tamamladıkça sonuçları anlık olarak burada görüntülenecektir.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {submissions.map((sub) => {
                                const isExpanded = expandedStudentId === sub.id;
                                return (
                                    <div key={sub.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                                        <div 
                                            onClick={() => setExpandedStudentId(isExpanded ? null : sub.id)}
                                            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xs">
                                                    {sub.studentName.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black text-slate-900">{sub.studentName}</h4>
                                                    <p className="text-[11px] text-slate-400">
                                                        {sub.studentClass} Sınıfı • {sub.completedAt}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <span className="text-xs font-black text-emerald-600">
                                                        %{sub.score} ({sub.correctCount}D / {sub.wrongCount}Y)
                                                    </span>
                                                    <p className="text-[10px] text-slate-400">Süre: {Math.round(sub.timeSpentSeconds / 60)} dk</p>
                                                </div>
                                                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                            </div>
                                        </div>

                                        {/* Detay Analizler */}
                                        {isExpanded && (
                                            <div className="p-4 bg-slate-50/70 border-t border-slate-100 space-y-2 text-xs">
                                                <h5 className="font-bold text-slate-700 text-[11px]">Soru Bazlı Pedagojik Tanı Çıktısı:</h5>
                                                {sub.answers.map((ans, idx) => (
                                                    <div 
                                                        key={idx}
                                                        className={`p-2.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                                                            ans.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                                                        }`}
                                                    >
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-800">Soru #{ans.questionId}</span>
                                                                {ans.isCorrect ? (
                                                                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Doğru ({ans.selectedOption})
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-rose-700 font-bold flex items-center gap-1 text-[11px]">
                                                                        <XCircle className="w-3.5 h-3.5" /> Yanlış (Seçilen: {ans.selectedOption || 'Boş'})
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-slate-600">
                                                                Kazanım: <strong className="text-indigo-900">{ans.outcomeCode}</strong> - {ans.outcomeDescription}
                                                            </p>
                                                        </div>

                                                        {!ans.isCorrect && ans.distractorDiagnose && (
                                                            <div className="p-1.5 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900 text-[11px] font-medium max-w-sm">
                                                                <strong>Tanı:</strong> {ans.distractorDiagnose}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
