import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, TrendingUp, AlertTriangle, BookOpen, Brain, Map, Send, Save } from 'lucide-react';
import { MIT_CURRICULUM } from '../../../data/mitCurriculum';

export const AnalyticsDashboard = () => {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [assignMode, setAssignMode] = useState<string | null>(null);
    const [manualLevel, setManualLevel] = useState<string>('');

    const students = [
        { id: 1, name: 'Ali Yılmaz', grade: 8, level: '2', calcLevel: '2', score: 76, weakTopics: ['Üslü İfadeler', 'Kareköklü İfadeler'], time: 'Ort. 12sn' },
        { id: 2, name: 'Ayşe Demir', grade: 8, level: '4', calcLevel: '3', score: 92, weakTopics: ['Eşitsizlikler'], time: 'Ort. 6sn' },
        { id: 3, name: 'Can Özkan', grade: 8, level: '1', calcLevel: '1', score: 45, weakTopics: ['Çarpanlar ve Katlar', 'Doğrusal Denklemler', 'Pisagor Bağıntısı'], time: 'Ort. 22sn' },
        { id: 4, name: 'Zeynep Çelik', grade: 7, level: '3', calcLevel: '3', score: 81, weakTopics: ['Rasyonel Sayılarla İşlemler'], time: 'Ort. 9sn' },
    ];

    const handleAssign = () => {
        alert("Atama işlemi başarıyla gerçekleştirildi.");
        setAssignMode(null);
    };

    const handleLevelSave = () => {
        alert("Manuel seviye başarıyla kaydedildi.");
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Toplam Öğrenci</div>
                        <div className="text-2xl font-black text-slate-800">42</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Sınıf Ortalaması</div>
                        <div className="text-2xl font-black text-slate-800">%78</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Kritik Seviye 1</div>
                        <div className="text-2xl font-black text-slate-800">5 Öğrenci</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <Brain size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Antrenman (Haftalık)</div>
                        <div className="text-2xl font-black text-slate-800">1,420 Soru</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 min-h-[500px]">
                {/* Students List */}
                <div className="w-1/3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-black text-slate-800">Öğrenci Listesi</h3>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {students.map(s => (
                            <button 
                                key={s.id}
                                onClick={() => { setSelectedStudent(s); setManualLevel(s.level); setAssignMode(null); }}
                                className={`w-full text-left p-4 rounded-2xl transition-all ${selectedStudent?.id === s.id ? 'bg-indigo-50 border border-indigo-200 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className={`font-bold ${selectedStudent?.id === s.id ? 'text-indigo-800' : 'text-slate-700'}`}>{s.name}</div>
                                    <div className="bg-white px-2 py-1 rounded-md text-xs font-bold text-slate-500 border border-slate-200">
                                        Seviye {s.level}
                                    </div>
                                </div>
                                <div className="text-xs font-medium text-slate-400 flex items-center gap-2">
                                    <span>Skor: {s.score}</span>
                                    <span>•</span>
                                    <span>Süre: {s.time}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Student Details */}
                <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
                    {selectedStudent ? (
                        <div className="p-8 overflow-y-auto">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800">{selectedStudent.name}</h2>
                                    <p className="text-slate-500 font-medium">{selectedStudent.grade}. Sınıf • Gelişim Raporu</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setAssignMode('topic')} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                                        <BookOpen size={16} /> Konu Ata
                                    </button>
                                    <button onClick={() => setAssignMode('practice')} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                                        <Brain size={16} /> Antrenman Ata
                                    </button>
                                </div>
                            </div>

                            {assignMode && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                                    <h3 className="font-bold text-slate-800 mb-4">{assignMode === 'topic' ? 'Konu Çalışması Ata' : 'Zihinsel Antrenman Ata'}</h3>
                                    <div className="flex gap-4 items-center">
                                        <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none">
                                            {assignMode === 'topic' ? (
                                                <>
                                                    <option>Üslü İfadeler (Önerilen)</option>
                                                    <option>Kareköklü İfadeler</option>
                                                    <option>Eşitsizlikler</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option>2 Basamaklı Çarpma (Önerilen)</option>
                                                    <option>3 Basamaklı Toplama</option>
                                                </>
                                            )}
                                        </select>
                                        <button onClick={handleAssign} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
                                            <Send size={18} /> Gönder
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                    <div className="text-sm font-bold text-indigo-400 uppercase mb-2">Genel Durum Skoru</div>
                                    <div className="text-4xl font-black text-indigo-700 mb-2">{selectedStudent.score} <span className="text-xl text-indigo-400">/ 100</span></div>
                                    <p className="text-sm text-indigo-600/80 font-medium">Test cevapları, süre ve hata oranına göre hesaplandı.</p>
                                </div>
                                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                    <div className="text-sm font-bold text-amber-500 uppercase mb-4">Manuel Seviye Ayarı</div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <p className="text-xs text-amber-700 mb-1">Oto: <b>Seviye {selectedStudent.calcLevel}</b></p>
                                            <select value={manualLevel} onChange={e => setManualLevel(e.target.value)} className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 font-bold text-amber-900 outline-none">
                                                <option value="1">Seviye 1 (Temel)</option>
                                                <option value="2">Seviye 2 (Gelişen)</option>
                                                <option value="3">Seviye 3 (Yetkin)</option>
                                                <option value="4">Seviye 4 (İleri)</option>
                                            </select>
                                        </div>
                                        <button onClick={handleLevelSave} className="bg-amber-500 hover:bg-amber-400 text-white p-3 rounded-xl shadow-sm transition-colors mt-4">
                                            <Save size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Map size={20}/> Zayıf Kazanımlar & Öneriler</h3>
                            <div className="space-y-4">
                                {selectedStudent.weakTopics.map((wt: string, idx: number) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-slate-700">{wt}</div>
                                            <div className="text-sm text-rose-500 font-medium mt-1">Soru Tekrarı: Yüksek • Süre: Yavaş</div>
                                        </div>
                                        <button onClick={() => setAssignMode('topic')} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                                            Çalışma Ata
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <Users size={64} className="mb-4 opacity-20" />
                            <h3 className="text-xl font-bold">Öğrenci Seçin</h3>
                            <p className="text-sm font-medium mt-2">Detaylı analizleri görmek için listeden bir öğrenci seçin.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
