import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Target, Award, Zap } from 'lucide-react';

export const ProfileView = ({ grade }: { grade: number }) => {
    // Days until LGS (approximate for demo)
    const lgsDate = new Date('2027-06-05');
    const today = new Date();
    const daysLeft = Math.ceil((lgsDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto">
            
            {grade === 8 && (
                <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black flex items-center gap-2"><Target size={24}/> LGS Geri Sayım</h2>
                        <p className="text-rose-100 font-medium opacity-90 mt-1">Hedefe ulaşmak için her gün bir adım daha yaklaş.</p>
                    </div>
                    <div className="flex items-baseline gap-2 bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20">
                        <span className="text-4xl font-black">{daysLeft}</span>
                        <span className="text-rose-100 font-bold uppercase tracking-widest text-sm">Gün Kaldı</span>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
                    <Award size={64} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        Seviye 2
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Matematik Kalfası</h2>
                    <p className="text-slate-500 font-medium mb-6">Orta düzey gelişim seviyesindesin. "Usta" unvanına ulaşmak için çalışmalarına devam et.</p>
                    
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                        <span>Kalfa</span>
                        <span>Usta</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Çözülen Soru</div>
                        <div className="text-2xl font-black text-slate-800">1,248</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <Target size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Doğruluk Oranı</div>
                        <div className="text-2xl font-black text-slate-800">%76</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <Zap size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Zihinden İşlem</div>
                        <div className="text-2xl font-black text-slate-800">2. Kademe</div>
                    </div>
                </div>
            </div>
            
        </motion.div>
    );
};
