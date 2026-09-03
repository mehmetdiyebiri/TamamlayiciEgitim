const fs = require('fs');
const content = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Map, Play, Award, Zap, BookOpen, Clock, Target, TrendingUp, CheckCircle2, AlertTriangle, ChevronRight, XCircle } from 'lucide-react';

export const StudentMitPanel = ({ state, actions }: any) => {
    const [activeTab, setActiveTab] = useState('profil');

    const tabs = [
        { id: 'profil', name: 'Gelişim Profili', icon: TrendingUp },
        { id: 'harita', name: 'Kazanım Haritası', icon: Map },
        { id: 'calisma', name: 'Çalışma Odası', icon: Target },
        { id: 'zihin', name: 'Zihinden İşlem', icon: Zap },
        { id: 'formul', name: 'Formül Merkezi', icon: BookOpen },
        { id: 'antrenor', name: 'Matematik Antrenörü', icon: Brain },
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">M.İ.T Merkezi</h1>
                    <p className="text-slate-500 font-medium mt-2">Matematik İnovasyon Takip Sistemi</p>
                </div>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={\`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap \${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}\`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 bg-white/50 rounded-3xl overflow-hidden relative">
                {activeTab === 'profil' && <ProfileView />}
                {activeTab === 'harita' && <MapView />}
                {activeTab === 'calisma' && <StudyRoomView />}
                {activeTab === 'zihin' && <MentalMathView />}
                {activeTab === 'formul' && <FormulaCardsView />}
                {activeTab === 'antrenor' && <CoachView />}
            </div>
        </div>
    );
};

const ProfileView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 col-span-1 md:col-span-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white">
                    <div>
                        <div className="text-sm font-bold text-indigo-500 mb-1">Genel Seviye</div>
                        <div className="text-3xl font-black text-slate-900">İleri (Kalfa)</div>
                    </div>
                    <Award size={48} className="text-indigo-600" />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 col-span-1 md:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Map size={18} className="text-emerald-500"/> Kazanım Durumu
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Kesirler', val: 82, color: 'bg-emerald-500' },
                            { name: 'Denklem', val: 74, color: 'bg-indigo-500' },
                            { name: 'Oran', val: 61, color: 'bg-amber-500' },
                            { name: 'Yüzdeler', val: 43, color: 'bg-rose-500' }
                        ].map(t => (
                            <div key={t.name}>
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span className="text-slate-700">{t.name}</span>
                                    <span className="text-slate-500">%{t.val}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={\`h-full \${t.color} rounded-full\`} style={{ width: \`\${t.val}%\` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm">Güçlü Alanlar</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-slate-600 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg font-medium inline-block">İşlem Hızı</li>
                            <li className="text-sm text-slate-600 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg font-medium inline-block">Geometri</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm">Geliştirilmeli</h3>
                        <ul className="space-y-2 flex flex-col items-start">
                            <li className="text-sm text-slate-600 bg-rose-50 text-rose-700 px-3 py-1 rounded-lg font-medium inline-block">Yüzde Problemleri</li>
                            <li className="text-sm text-slate-600 bg-rose-50 text-rose-700 px-3 py-1 rounded-lg font-medium inline-block">Oran-Orantı</li>
                        </ul>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-slate-100 space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm">Hata Profili</h3>
                        <div className="flex gap-2">
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">İşlem Hatası (12)</span>
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">Dikkat Hatası (8)</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MapView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Sarmal Kazanım Ağacı</h2>
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {[
                        { title: 'Sayılar', items: ['Doğal Sayılar', 'Tam Sayılar', 'Kesirler', 'Ondalık Gösterim', 'Yüzdeler'], status: 'active' },
                        { title: 'Cebir', items: ['Örüntüler', 'Denklem', 'Eşitsizlik', 'Doğrusal İlişkiler'], status: 'locked' },
                        { title: 'Geometri', items: ['Açılar', 'Üçgenler', 'Alan', 'Çevre'], status: 'locked' }
                    ].map((node, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                                {i + 1}
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">{node.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {node.items.map((item, j) => (
                                        <span key={j} className={\`text-xs font-bold px-3 py-1.5 rounded-lg \${node.status === 'active' && j < 3 ? 'bg-emerald-100 text-emerald-700' : (node.status === 'active' && j === 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500')}\`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const StudyRoomView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Çalışma Odası</h2>
            <p className="text-slate-500 font-medium">Sistem tarafından sana özel hazırlanan 7 soruluk antrenmanlar.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Kesirlerde İşlemler', diff: 'Basit', q: 7, time: '10 Dk', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
                    { title: 'Ondalık Gösterim', diff: 'Orta', q: 7, time: '15 Dk', color: 'bg-amber-50 text-amber-600 border-amber-200' },
                    { title: 'Yüzde Problemleri', diff: 'Zor', q: 7, time: '20 Dk', color: 'bg-rose-50 text-rose-600 border-rose-200' }
                ].map((s, i) => (
                    <div key={i} className={\`bg-white border rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer \${s.color.split(' ')[2]}\`}>
                        <div>
                            <div className={\`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 \${s.color.split(' ').slice(0,2).join(' ')}\`}>
                                {s.diff} Seviye
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                            <div className="flex gap-4 text-sm font-bold text-slate-500 mb-6">
                                <span className="flex items-center gap-1"><Target size={16}/> {s.q} Soru</span>
                                <span className="flex items-center gap-1"><Clock size={16}/> {s.time}</span>
                            </div>
                        </div>
                        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition-colors">
                            Çalışmaya Başla
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const MentalMathView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black text-slate-900">Zihinden İşlem Merkezi</h2>
                <p className="text-slate-500 font-medium">Günlük 5 dakikalık egzersizle matematiksel düşünme hızını artır.</p>
            </div>

            <div className="bg-indigo-600 text-white rounded-3xl p-10 flex flex-col items-center justify-center min-h-[400px] shadow-xl relative overflow-hidden">
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full font-mono font-bold">
                    <Clock size={16} /> 00:00
                </div>
                
                <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter mb-12 drop-shadow-lg">
                    14 × 5 = ?
                </div>
                
                <div className="w-full max-w-md bg-white p-2 rounded-2xl flex gap-2">
                    <input type="number" placeholder="Cevap..." className="flex-1 bg-slate-100 border-none rounded-xl px-6 py-4 text-2xl font-black text-slate-900 outline-none text-center" />
                    <button className="bg-indigo-500 text-white px-8 rounded-xl font-black text-xl hover:bg-indigo-400 transition-colors">
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <div className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">Bugünün Hızı</div>
                    <div className="text-3xl font-black text-emerald-500">1.8 sn <span className="text-sm text-slate-400 font-medium">/ soru</span></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <div className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">Doğruluk</div>
                    <div className="text-3xl font-black text-indigo-500">%94</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <div className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">Seri</div>
                    <div className="text-3xl font-black text-amber-500">12 <span className="text-sm text-slate-400 font-medium">gün</span></div>
                </div>
            </div>
        </motion.div>
    );
};

const FormulaCardsView = () => {
    const [flipped, setFlipped] = useState(false);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 py-10">
            <div className="text-center space-y-2 mb-4">
                <h2 className="text-2xl font-black text-slate-900">Kalıp Formül Kartları</h2>
                <p className="text-slate-500 font-medium">Kısa tekrarlarla formülleri kalıcı hale getir.</p>
            </div>

            <div className="w-full aspect-[4/3] perspective-1000 cursor-pointer" onClick={() => setFlipped(!flipped)}>
                <motion.div 
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                        <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Geometri</div>
                        <h3 className="text-3xl font-black text-slate-900 mb-6">Karenin Alanı</h3>
                        <div className="text-5xl font-mono font-black text-indigo-600 bg-white border border-indigo-50 px-8 py-6 rounded-2xl shadow-sm">
                            A = a²
                        </div>
                        <div className="absolute bottom-6 text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            <RotateCcw size={14}/> Detaylar için çevir
                        </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-slate-900 text-white rounded-3xl p-8 shadow-xl overflow-y-auto flex flex-col justify-center" style={{ transform: 'rotateY(180deg)' }}>
                        <h4 className="font-bold text-indigo-300 mb-2 uppercase text-sm tracking-wider">Kural</h4>
                        <p className="text-slate-300 font-medium mb-6">Karenin alanı, bir kenar uzunluğunun kendisi ile çarpımına eşittir.</p>
                        
                        <h4 className="font-bold text-emerald-400 mb-2 uppercase text-sm tracking-wider">Çözümlü Örnek</h4>
                        <div className="bg-white/10 p-4 rounded-xl text-slate-200 text-sm font-mono leading-relaxed">
                            Kenarı 5 cm olan karenin alanı:<br/>
                            A = 5 × 5<br/>
                            A = 25 cm²
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="flex gap-4 w-full">
                <button className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Önceki</button>
                <button className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold text-white hover:bg-indigo-500 transition-colors">Sonraki Kart</button>
            </div>
        </motion.div>
    );
};

const CoachView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Brain size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Matematik Antrenörü</h2>
                    <p className="text-slate-500 font-medium">Hatalarını analiz eden yapay zeka asistanın.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Son Hatan</span>
                        <span className="text-slate-400 font-bold text-sm">Bugün, 14:30</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-slate-800 text-center py-4 bg-white rounded-xl border border-slate-200">
                        7/8 + 3/4 = <span className="text-rose-500 line-through">10/12</span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Antrenör Analizi</h4>
                        <p className="text-slate-700 font-medium leading-relaxed">
                            Toplama işlemi yaparken paydaları eşitlemeyi unuttun. Kesirlerde toplama ve çıkarma yapabilmek için alt kısımların (paydaların) aynı olması gerekir.
                        </p>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                        <h4 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2"><Target size={18}/> Antrenörün Önerisi</h4>
                        <p className="text-indigo-700 text-sm mb-4">Önce kısa bir payda eşitleme çalışması yapalım, ardından bu soru tipinden 5 yeni soru çözelim.</p>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto">
                            Mini Çalışmayı Başlat
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
`
fs.writeFileSync('src/components/mit/StudentMitPanel.tsx', content);
