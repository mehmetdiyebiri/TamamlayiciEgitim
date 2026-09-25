import React from 'react';
import { CustomMitQuestion } from '../../../types/customMitExam';
import { Brain, Sparkles, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface Form2DiagnosticMatrixProps {
    questions: CustomMitQuestion[];
    onChangeQuestions: (questions: CustomMitQuestion[]) => void;
    showToast?: (msg: string) => void;
}

export const Form2DiagnosticMatrix: React.FC<Form2DiagnosticMatrixProps> = ({
    questions,
    onChangeQuestions,
    showToast
}) => {
    // Alan Güncelle
    const handleUpdateField = (id: number, field: keyof CustomMitQuestion, value: any) => {
        const updated = questions.map(q => {
            if (q.id === id) {
                return { ...q, [field]: value };
            }
            return q;
        });
        onChangeQuestions(updated);
    };

    // Çeldirici Analizi Güncelle
    const handleUpdateDistractor = (id: number, optKey: 'A' | 'B' | 'C' | 'D', value: string) => {
        const updated = questions.map(q => {
            if (q.id === id) {
                return {
                    ...q,
                    distractorAnalysis: {
                        ...q.distractorAnalysis,
                        [optKey]: value
                    }
                };
            }
            return q;
        });
        onChangeQuestions(updated);
    };

    // Otomatik Pedagojik Çeldirici Şablonu Doldur (Örnek)
    const handleAutoFillDistractors = (id: number) => {
        const updated = questions.map(q => {
            if (q.id === id) {
                const ans = q.correctAnswer;
                return {
                    ...q,
                    distractorAnalysis: {
                        A: ans === 'A' ? 'Doğru Cevap' : 'Kavram yanılgısı (soldan sağa parantezsiz işlem)',
                        B: ans === 'B' ? 'Doğru Cevap' : 'Üs ve katsayı çarpım hatası',
                        C: ans === 'C' ? 'Doğru Cevap' : 'Ters işlem / Dikkatsizlik hatası',
                        D: ans === 'D' ? 'Doğru Cevap' : 'İşlem hatası (toplama/çıkarma karıştırma)'
                    }
                };
            }
            return q;
        });
        onChangeQuestions(updated);
        showToast?.(`Soru #${id} için örnek pedagojik çeldirici haritası oluşturuldu.`);
    };

    return (
        <div className="space-y-6">
            {/* Header / Intro Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                        <Brain className="w-3.5 h-3.5" />
                        Form 2 / Cevap Anahtarı & Tanılama Matrisi
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                        2. Form 2: Cevap Anahtarı & Tanılama Matrisi
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Pedagojik analiz, kazanım ve çeldirici haritası. Öğrencinin seçtiği her yanlış yanıtta hangi kavram yanılgısına veya işlem hatasına düştüğünü tespit eder.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                        Toplam <strong className="text-slate-800">{questions.length}</strong> Soru Matrisi
                    </span>
                </div>
            </div>

            {/* TABLO ŞABLONU (PDF ile birebir uyumlu) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <th className="p-3 w-14 text-center border-r border-slate-200">Soru No</th>
                                <th className="p-3 w-16 text-center border-r border-slate-200">Doğru Cevap</th>
                                <th className="p-3 w-36 border-r border-slate-200">Öğrenme Alanı / Ünite</th>
                                <th className="p-3 w-28 border-r border-slate-200">Kazanım Kodu</th>
                                <th className="p-3 min-w-[200px] border-r border-slate-200">Kazanım İfadesi</th>
                                <th className="p-3 min-w-[150px] border-r border-slate-200">Çeldirici A Tanı Analizi</th>
                                <th className="p-3 min-w-[150px] border-r border-slate-200">Çeldirici B Tanı Analizi</th>
                                <th className="p-3 min-w-[150px] border-r border-slate-200">Çeldirici C Tanı Analizi</th>
                                <th className="p-3 min-w-[150px] border-r border-slate-200">Çeldirici D Tanı Analizi</th>
                                <th className="p-3 w-36 text-center">Zorluk / Bilişsel Seviye</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {questions.map((q) => (
                                <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                                    {/* Soru No */}
                                    <td className="p-3 text-center font-black text-slate-800 border-r border-slate-200 align-top">
                                        <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-xs font-black">
                                            {q.id}
                                        </div>
                                    </td>

                                    {/* Doğru Cevap (Form 1'den senkronize) */}
                                    <td className="p-3 text-center border-r border-slate-200 align-top">
                                        <span className="inline-block px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                                            {q.correctAnswer}
                                        </span>
                                    </td>

                                    {/* Öğrenme Alanı / Ünite */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        <input
                                            type="text"
                                            value={q.learningArea}
                                            onChange={(e) => handleUpdateField(q.id, 'learningArea', e.target.value)}
                                            placeholder="Örn: Doğal Sayılarla İşlemler"
                                            className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </td>

                                    {/* Kazanım Kodu */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        <input
                                            type="text"
                                            value={q.outcomeCode}
                                            onChange={(e) => handleUpdateField(q.id, 'outcomeCode', e.target.value)}
                                            placeholder="Örn: M.5.1.1.2"
                                            className="w-full p-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-indigo-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </td>

                                    {/* Kazanım İfadesi */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        <textarea
                                            rows={2}
                                            value={q.outcomeDescription}
                                            onChange={(e) => handleUpdateField(q.id, 'outcomeDescription', e.target.value)}
                                            placeholder="Örn: İşlem önceliği kurallarını uygular."
                                            className="w-full p-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white resize-y focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </td>

                                    {/* Çeldirici A Tanı Analizi */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        {q.correctAnswer === 'A' ? (
                                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                Doğru Cevap
                                            </div>
                                        ) : (
                                            <textarea
                                                rows={2}
                                                value={q.distractorAnalysis.A}
                                                onChange={(e) => handleUpdateDistractor(q.id, 'A', e.target.value)}
                                                placeholder="Soldan sağa sırayla gitme (parantez yok sayma)..."
                                                className="w-full p-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white resize-y focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        )}
                                    </td>

                                    {/* Çeldirici B Tanı Analizi */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        {q.correctAnswer === 'B' ? (
                                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                Doğru Cevap
                                            </div>
                                        ) : (
                                            <textarea
                                                rows={2}
                                                value={q.distractorAnalysis.B}
                                                onChange={(e) => handleUpdateDistractor(q.id, 'B', e.target.value)}
                                                placeholder="Üssü tabanla/katsayıyla yanlış çarpma..."
                                                className="w-full p-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white resize-y focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        )}
                                    </td>

                                    {/* Çeldirici C Tanı Analizi */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        {q.correctAnswer === 'C' ? (
                                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                Doğru Cevap
                                            </div>
                                        ) : (
                                            <textarea
                                                rows={2}
                                                value={q.distractorAnalysis.C}
                                                onChange={(e) => handleUpdateDistractor(q.id, 'C', e.target.value)}
                                                placeholder="Sadeleştirme veya ters işlem hatası..."
                                                className="w-full p-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white resize-y focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        )}
                                    </td>

                                    {/* Çeldirici D Tanı Analizi */}
                                    <td className="p-2.5 border-r border-slate-200 align-top">
                                        {q.correctAnswer === 'D' ? (
                                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                Doğru Cevap
                                            </div>
                                        ) : (
                                            <textarea
                                                rows={2}
                                                value={q.distractorAnalysis.D}
                                                onChange={(e) => handleUpdateDistractor(q.id, 'D', e.target.value)}
                                                placeholder="İşlem hatası (toplama/çıkarma karıştırma)..."
                                                className="w-full p-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white resize-y focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        )}
                                    </td>

                                    {/* Zorluk / Bilişsel Seviye */}
                                    <td className="p-2.5 text-center align-top">
                                        <select
                                            value={q.cognitiveLevel}
                                            onChange={(e) => handleUpdateField(q.id, 'cognitiveLevel', e.target.value)}
                                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        >
                                            <option value="Kolay / Kavrama">Kolay / Kavrama</option>
                                            <option value="Orta / Uygulama">Orta / Uygulama</option>
                                            <option value="Zor / Problem Çözme">Zor / Problem Çözme</option>
                                            <option value="İleri / Muhakeme">İleri / Muhakeme</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => handleAutoFillDistractors(q.id)}
                                            className="mt-1.5 text-[10px] text-indigo-600 hover:text-indigo-800 hover:underline flex items-center justify-center gap-1 mx-auto"
                                            title="Örnek analiz doldur"
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            Örnek Tanı Doldur
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
