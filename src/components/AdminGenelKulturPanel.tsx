import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, CheckCircle2, XCircle, Search, Target, Users, Book, Award, Clock, Settings, Edit2, Save } from 'lucide-react';
import { genelKulturTests } from '../data/genelKulturTests';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const AdminGenelKulturPanel = ({ state, actions }: any) => {
    const { currentUser, classes, gkAssignments, gkProgress, activeSchoolId } = state;
    const { showToast } = actions;
    const [tab, setTab] = useState('assign'); // assign, list, reports
    
    // Assign form
    const [selectedLevel, setSelectedLevel] = useState('5');
    const [selectedTestId, setSelectedTestId] = useState('');
    const [targetType, setTargetType] = useState('class'); // class or student
    const [targetClass, setTargetClass] = useState('');
    const [targetStudent, setTargetStudent] = useState('');

    // Report filters
    const [reportTestId, setReportTestId] = useState('');
    const [reportClass, setReportClass] = useState('');

    // Manage Test state
    const [manageLevel, setManageLevel] = useState('5');
    const [manageTestId, setManageTestId] = useState('');
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const availableTests = genelKulturTests.filter(t => t.classLevel === selectedLevel);
    const availableManageTests = genelKulturTests.filter(t => t.classLevel === manageLevel);

    const handleAssign = async () => {
        if (!selectedTestId) {
            showToast("Lütfen bir test seçin.", "error");
            return;
        }
        if (targetType === 'class' && !targetClass) {
            showToast("Lütfen hedef sınıfı seçin.", "error");
            return;
        }
        if (targetType === 'student' && (!targetClass || !targetStudent)) {
            showToast("Lütfen hedef sınıf ve öğrenciyi seçin.", "error");
            return;
        }

        const testInfo = genelKulturTests.find(t => t.id === selectedTestId);

        try {
            const colName = activeSchoolId === 'default' ? 'gk_assignments' : `gk_assignments_${activeSchoolId}`;
            await addDoc(collection(db, colName), {
                testId: selectedTestId,
                testTitle: testInfo?.title,
                targetType,
                targetClass,
                targetStudent,
                createdAt: new Date().toISOString(),
                createdBy: currentUser.name || currentUser.username
            });
            showToast("Test başarıyla atandı.", "success");
            setTargetStudent('');
            setTargetClass('');
        } catch (error) {
            console.error("Error assigning GK test:", error);
            showToast("Test atanırken hata oluştu.", "error");
        }
    };

    const handleDelete = async (id: string) => {
        if (true) {
            try {
                const colName = activeSchoolId === 'default' ? 'gk_assignments' : `gk_assignments_${activeSchoolId}`;
                await deleteDoc(doc(db, colName, id));
                showToast("Atama başarıyla silindi.", "success");
            } catch (error) {
                console.error("Error deleting GK assignment:", error);
                showToast("Silme işlemi başarısız.", "error");
            }
        }
    };

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
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-indigo-900 tracking-tight flex items-center gap-3">
                        <Globe size={32} className="text-indigo-600" /> Genel Kültür Modülü
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Öğrencilerin genel kültür seviyelerini test edin ve geliştirin.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-gray-200 shadow-sm inline-flex">
                <button onClick={() => setTab('assign')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'assign' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Yeni Atama</button>
                <button onClick={() => setTab('list')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Aktif Atamalar</button>
                <button onClick={() => setTab('reports')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'reports' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Raporlar</button>
                <button onClick={() => setTab('manage')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'manage' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Test Yönetimi</button>
            </div>

            {tab === 'assign' && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-indigo-900/5">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Plus className="text-indigo-600"/> Test Ata</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Test Sınıf Düzeyi</label>
                            <select value={selectedLevel} onChange={(e) => { setSelectedLevel(e.target.value); setSelectedTestId(''); }} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                                {['5','6','7','8','9','10','11','12'].map(lvl => (
                                    <option key={lvl} value={lvl}>{lvl}. Sınıf Testleri</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Test Seçimi</label>
                            <select value={selectedTestId} onChange={(e) => setSelectedTestId(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                                <option value="">Test Seçin</option>
                                {availableTests.map(t => (
                                    <option key={t.id} value={t.id}>{t.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hedef Tipi</label>
                            <select value={targetType} onChange={(e) => setTargetType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                                <option value="class">Tüm Sınıf</option>
                                <option value="student">Belirli Öğrenci</option>
                            </select>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hedef Sınıf</label>
                            <select value={targetClass} onChange={(e) => { setTargetClass(e.target.value); setTargetStudent(''); }} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                                <option value="">Sınıf Seçin</option>
                                {Object.keys(classes).sort().map(k => (
                                    <option key={k} value={k}>{k.replace('_', '')}</option>
                                ))}
                            </select>
                        </div>

                        {targetType === 'student' && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hedef Öğrenci</label>
                                <select value={targetStudent} onChange={(e) => setTargetStudent(e.target.value)} disabled={!targetClass} className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">
                                    <option value="">Öğrenci Seçin</option>
                                    {classes[targetClass]?.map((s: string, idx: number) => (
                                        <option key={s || idx} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <button onClick={handleAssign} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30">
                            <CheckCircle2 size={20} /> Testi Ata
                        </button>
                    </div>
                </div>
            )}

            {tab === 'list' && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-indigo-900/5 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800">Aktif Atamalar</h2>
                    </div>
                    {gkAssignments.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 font-medium">Henüz test ataması yapılmamış.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {gkAssignments.map((a: any) => (
                                <div key={a.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-lg font-bold text-gray-900">{a.testTitle}</div>
                                        <div className="text-sm font-semibold text-gray-500 flex flex-wrap items-center gap-3">
                                            <span className="flex items-center gap-1.5"><Users size={14}/> Hedef: {a.targetType === 'class' ? `Sınıf: ${a.targetClass}` : `Öğrenci: ${a.targetStudent} (${a.targetClass})`}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={14}/> Atanma: {new Date(a.createdAt).toLocaleDateString('tr-TR')}</span>
                                            <span className="flex items-center gap-1.5"><User size={14}/> Atayan: {a.createdBy}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(a.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {tab === 'reports' && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-indigo-900/5 space-y-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <select value={reportTestId} onChange={e => setReportTestId(e.target.value)} className="w-full md:w-auto flex-1 bg-gray-50 border border-gray-200 p-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500">
                            <option value="">Tüm Testler</option>
                            {genelKulturTests.map(t => (
                                <option key={t.id} value={t.id}>{t.title}</option>
                            ))}
                        </select>
                        <select value={reportClass} onChange={e => setReportClass(e.target.value)} className="w-full md:w-auto bg-gray-50 border border-gray-200 p-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500">
                            <option value="">Tüm Sınıflar</option>
                            {Object.keys(classes).sort().map(k => (
                                <option key={k} value={k}>{k.replace('_', '')}</option>
                            ))}
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wider">
                                    <th className="p-4 rounded-tl-2xl">Öğrenci</th>
                                    <th className="p-4">Sınıf</th>
                                    <th className="p-4">Test</th>
                                    <th className="p-4">Skor</th>
                                    <th className="p-4">Tarih</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm font-bold text-gray-700">
                                {Object.values(gkProgress).filter((p: any) => {
                                    if (reportTestId && p.testId !== reportTestId) return false;
                                    if (reportClass && p.classLevel !== reportClass) return false;
                                    return true;
                                }).map((p: any) => (
                                    <tr key={`${p.studentId}_${p.testId}`} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                                                {p.studentName?.charAt(0).toUpperCase()}
                                            </div>
                                            {p.studentName}
                                        </td>
                                        <td className="p-4">{p.classLevel}</td>
                                        <td className="p-4 text-gray-500">{p.testTitle}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-black ${p.score >= 80 ? 'bg-green-100 text-green-700' : p.score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {p.score}%
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-xs">
                                            {new Date(p.completedAt).toLocaleDateString('tr-TR')}
                                        </td>
                                    </tr>
                                ))}
                                {Object.values(gkProgress).filter((p: any) => {
                                    if (reportTestId && p.testId !== reportTestId) return false;
                                    if (reportClass && p.classLevel !== reportClass) return false;
                                    return true;
                                }).length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-gray-400 font-medium">Bu kriterlere uygun sonuç bulunamadı.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {tab === 'manage' && (
                <div key={`manage-${refreshKey}`} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-indigo-900/5 space-y-8 animate-in fade-in">
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
                                            <div className="font-bold text-gray-800"><span className="text-indigo-600 mr-2">{idx + 1}.</span> {q.text}</div>
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

const User = ({ size }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Globe = ({ size, className }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
