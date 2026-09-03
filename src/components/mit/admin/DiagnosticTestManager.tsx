import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Upload, Plus, ChevronRight, CheckCircle2, AlertTriangle, FileSpreadsheet, File } from 'lucide-react';

export const DiagnosticTestManager = () => {
    const [creationMode, setCreationMode] = useState<'idle' | 'ready' | 'upload' | 'manual'>('idle');
    const [isAssigned, setIsAssigned] = useState(false);

    const handleAssign = () => {
        setIsAssigned(true);
        setTimeout(() => {
            setIsAssigned(false);
            setCreationMode('idle');
        }, 3000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col space-y-6">
            {creationMode === 'idle' && (
                <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                        <FileText size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Seviye Tespit Sınavı Oluştur</h2>
                    <p className="text-slate-500 font-medium max-w-lg mb-10">Öğrencilerin mevcut matematik seviyelerini belirlemek için bir seviye tespit sınavı ata veya oluştur.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        <button onClick={() => setCreationMode('ready')} className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-indigo-400 p-8 rounded-3xl transition-all hover:shadow-lg flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Hazır Sınav Kullan</h3>
                            <p className="text-sm text-slate-500 font-medium">Sistemdeki M.İ.T onaylı seviye tespit sınavlarını ata.</p>
                        </button>
                        
                        <button onClick={() => setCreationMode('upload')} className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-emerald-400 p-8 rounded-3xl transition-all hover:shadow-lg flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <Upload size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Dosyadan Yükle</h3>
                            <p className="text-sm text-slate-500 font-medium">Excel, Word veya PDF formatındaki sınavlarını sisteme yükle.</p>
                        </button>

                        <button onClick={() => setCreationMode('manual')} className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-amber-400 p-8 rounded-3xl transition-all hover:shadow-lg flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                                <Plus size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Manuel Oluştur</h3>
                            <p className="text-sm text-slate-500 font-medium">Sistem üzerinden soruları tek tek girerek kendi sınavını oluştur.</p>
                        </button>
                    </div>
                </div>
            )}

            {creationMode === 'ready' && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex-1">
                    <button onClick={() => setCreationMode('idle')} className="text-slate-400 hover:text-slate-600 font-bold mb-6 flex items-center gap-1">← Geri Dön</button>
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Hazır Sınavlar</h2>
                    
                    <div className="space-y-4">
                        {[5, 6, 7, 8].map(grade => (
                            <div key={grade} className="border-2 border-slate-100 p-6 rounded-2xl hover:border-indigo-200 transition-colors flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
                                        {grade}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">{grade}. Sınıf Genel Seviye Tespiti</h3>
                                        <p className="text-slate-500 text-sm font-medium">20 Soru • 40 Dakika • Tüm kazanımları içerir</p>
                                    </div>
                                </div>
                                <button onClick={handleAssign} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap w-full md:w-auto">
                                    Öğrencilere Ata
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {creationMode === 'upload' && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex-1">
                    <button onClick={() => setCreationMode('idle')} className="text-slate-400 hover:text-slate-600 font-bold mb-6 flex items-center gap-1">← Geri Dön</button>
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Dosyadan Sınav Yükle</h2>
                    
                    <div className="border-4 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-slate-50">
                        <div className="flex gap-4 mb-6">
                            <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-emerald-600"><FileSpreadsheet size={32} /></div>
                            <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-blue-600"><FileText size={32} /></div>
                            <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-rose-600"><File size={32} /></div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Dosyalarınızı buraya sürükleyin</h3>
                        <p className="text-slate-500 font-medium mb-8 max-w-md">Excel, Word veya PDF formatındaki sınav belgelerinizi yükleyin. Sistemimiz soruları otomatik olarak analiz edip dijitalleştirecektir.</p>
                        
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
                            <Upload size={20} /> Bilgisayardan Seç
                        </button>
                    </div>

                    <div className="mt-8 bg-amber-50 border border-amber-200 p-6 rounded-2xl flex gap-4">
                        <AlertTriangle className="text-amber-500 shrink-0" />
                        <div>
                            <h4 className="font-bold text-amber-800">Yapay Zeka Destekli Aktarım</h4>
                            <p className="text-amber-700/80 text-sm font-medium mt-1">Yüklediğiniz dosyalardaki sorular yapay zeka tarafından okunarak MEB kazanımlarıyla otomatik eşleştirilmeye çalışılır. Aktarım sonrası eşleştirmeleri manuel olarak düzeltebilirsiniz.</p>
                        </div>
                    </div>
                </div>
            )}

            {creationMode === 'manual' && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex-1">
                    <button onClick={() => setCreationMode('idle')} className="text-slate-400 hover:text-slate-600 font-bold mb-6 flex items-center gap-1">← Geri Dön</button>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-slate-800">Manuel Sınav Oluşturucu</h2>
                        <button onClick={handleAssign} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
                            Sınavı Kaydet ve Ata
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Sınav Adı</label>
                            <input type="text" placeholder="Örn: 8. Sınıf 1. Dönem Seviye Tespiti" className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-800 outline-none focus:border-indigo-500" />
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Sorular (1)</h3>
                            </div>
                            
                            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Soru Metni</label>
                                    <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 outline-none focus:border-indigo-500 resize-none"></textarea>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['A', 'B', 'C', 'D'].map(opt => (
                                        <div key={opt} className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 shrink-0">{opt}</div>
                                            <input type="text" placeholder={`${opt} seçeneği...`} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-medium text-slate-700 outline-none focus:border-indigo-500" />
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex gap-4">
                                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-bold text-slate-600 outline-none focus:border-indigo-500 flex-1">
                                        <option value="">İlgili Kazanımı Seçin</option>
                                        <option value="1">Çarpanlar ve Katlar</option>
                                        <option value="2">Üslü İfadeler</option>
                                    </select>
                                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-bold text-emerald-600 outline-none focus:border-emerald-500">
                                        <option value="">Doğru Cevap</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-4 border-2 border-dashed border-slate-300 rounded-xl font-bold text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                <Plus size={20} /> Yeni Soru Ekle
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isAssigned && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50">
                        <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Sınav Başarıyla Atandı!</h4>
                            <p className="text-slate-400 text-sm font-medium">Öğrenciler kendi panellerinden sınava erişebilirler.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
