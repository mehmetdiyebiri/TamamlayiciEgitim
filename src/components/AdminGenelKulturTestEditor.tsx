import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Settings, Edit2, XCircle, Save } from 'lucide-react';
import { genelKulturTests } from '../data/genelKulturTests';

export const AdminGenelKulturTestEditor = ({ showToast }: { showToast: (msg: string, type: 'success' | 'error') => void }) => {
    const [manageLevel, setManageLevel] = useState('5');
    const [manageTestId, setManageTestId] = useState('');
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const availableManageTests = genelKulturTests.filter(t => t.classLevel === manageLevel);

    const handleSaveQuestion = () => {
        if (!editingQuestion || !manageTestId) return;
        const test = genelKulturTests.find(t => t.id === manageTestId);
        if (test) {
            const qIndex = test.questions.findIndex(q => q.id === editingQuestion.id);
            if (qIndex > -1) {
                test.questions[qIndex] = { ...editingQuestion };
                showToast("Soru başarıyla güncellendi.", "success");
                setEditingQuestion(null);
                setRefreshKey(prev => prev + 1);
            }
        }
    };

    return (
        <div key={`manage-${refreshKey}`} className="space-y-8 animate-in fade-in">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Settings className="text-indigo-600"/> Test & Soru Yönetimi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Test Sınıf Düzeyi</label>
                    <select value={manageLevel} onChange={(e) => { setManageLevel(e.target.value); setManageTestId(''); setEditingQuestion(null); }} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                        {['5','6','7','8','9','10','11','12'].map(lvl => (
                            <option key={lvl} value={lvl}>{lvl}. Sınıf Testleri</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Test Seçimi</label>
                    <select value={manageTestId} onChange={(e) => { setManageTestId(e.target.value); setEditingQuestion(null); }} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                        <option value="">Test Seçin</option>
                        {availableManageTests.map(t => (
                            <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {manageTestId && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Sorular</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {genelKulturTests.find(t => t.id === manageTestId)?.questions.map((q, idx) => (
                            <div key={q.id} className="p-4 border border-gray-200 rounded-2xl bg-gray-50 flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="font-bold text-gray-800"><span className="text-indigo-600 mr-2">{idx + 1}.</span> <div className="prose max-w-none"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{q.text}</ReactMarkdown></div></div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                                        <div className={`p-2 rounded-lg border ${q.correctAnswer === 'A' ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white border-gray-200'}`}>A) {q.options.A}</div>
                                        <div className={`p-2 rounded-lg border ${q.correctAnswer === 'B' ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white border-gray-200'}`}>B) {q.options.B}</div>
                                        <div className={`p-2 rounded-lg border ${q.correctAnswer === 'C' ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white border-gray-200'}`}>C) {q.options.C}</div>
                                        <div className={`p-2 rounded-lg border ${q.correctAnswer === 'D' ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white border-gray-200'}`}>D) {q.options.D}</div>
                                    </div>
                                </div>
                                <button onClick={() => setEditingQuestion({...q})} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                    <Edit2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit Question Modal */}
            {editingQuestion && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Edit2 className="text-indigo-600" size={24} /> Soru Düzenle
                            </h3>
                            <button onClick={() => setEditingQuestion(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Soru Metni</label>
                                <textarea 
                                    value={editingQuestion.text} 
                                    onChange={e => setEditingQuestion({...editingQuestion, text: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-sm font-medium text-gray-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all min-h-[100px]"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['A', 'B', 'C', 'D'].map(opt => (
                                    <div key={opt} className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                name="correctAnswer" 
                                                checked={editingQuestion.correctAnswer === opt}
                                                onChange={() => setEditingQuestion({...editingQuestion, correctAnswer: opt})}
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            Seçenek {opt} {editingQuestion.correctAnswer === opt && <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md text-[10px]">(Doğru Cevap)</span>}
                                        </label>
                                        <input 
                                            type="text" 
                                            value={editingQuestion.options[opt]} 
                                            onChange={e => setEditingQuestion({...editingQuestion, options: {...editingQuestion.options, [opt]: e.target.value}})}
                                            className={`w-full border p-3 rounded-xl text-sm outline-none transition-all ${editingQuestion.correctAnswer === opt ? 'bg-green-50/50 border-green-200 focus:border-green-500 focus:ring-green-500/10' : 'bg-gray-50 border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500/10'}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setEditingQuestion(null)} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-white hover:bg-gray-100 transition-all shadow-sm border border-gray-200">
                                İptal
                            </button>
                            <button onClick={handleSaveQuestion} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30">
                                <Save size={18} /> Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
