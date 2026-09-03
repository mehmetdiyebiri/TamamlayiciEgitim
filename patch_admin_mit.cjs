const fs = require('fs');
const content = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Map, Target, AlertTriangle, TrendingUp, CheckCircle2, ChevronRight, FileText, Send, UploadCloud, Plus } from 'lucide-react';

export const AdminMitPanel = ({ state, actions }: any) => {
    const [activeTab, setActiveTab] = useState('asistan');

    const tabs = [
        { id: 'asistan', name: 'Öğretmen Asistanı', icon: AlertTriangle },
        { id: 'atama', name: 'Sınav & Görev Atama', icon: Target },
        { id: 'harita', name: 'Kazanım Haritası', icon: Map },
        { id: 'carpan', name: 'Çarpan Etkisi', icon: TrendingUp },
        { id: 'veli', name: 'Veli Sekreteri', icon: FileText },
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">M.İ.T Yönetim</h1>
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
                {activeTab === 'asistan' && <TeacherAssistantView />}
                {activeTab === 'atama' && <AssignmentView />}
                {activeTab === 'harita' && <MapView />}
                {activeTab === 'carpan' && <MultiplierView />}
                {activeTab === 'veli' && <ParentSecretaryView />}
            </div>
        </div>
    );
};

const TeacherAssistantView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-slate-900">Öğretmen Asistanı</h2>
                <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 font-bold text-slate-700 outline-none">
                    <option>5-A Sınıfı</option>
                    <option>6-B Sınıfı</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Kritik Eksikler</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span>Kesirler</span>
                                    <span className="text-rose-400">%38</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '38%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span>Oran</span>
                                    <span className="text-amber-400">%42</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span>Denklem</span>
                                    <span className="text-indigo-400">%47</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '47%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-900 mb-2">Doğrudan Müdahale Gereken Öğrenciler</h3>
                    
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 text-rose-700 font-bold mb-4">
                            <AlertTriangle size={18} /> ACİL RİSK (2 Hafta İçinde Destek)
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white p-4 rounded-xl border border-rose-100 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-slate-900">Ali Yılmaz</div>
                                    <div className="text-xs text-slate-500 font-medium">Kesirlerde zorlanıyor</div>
                                </div>
                                <button className="text-xs bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg font-bold hover:bg-rose-200 transition-colors">Görev Ata</button>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-rose-100 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-slate-900">Ayşe Demir</div>
                                    <div className="text-xs text-slate-500 font-medium">İşlem hatası (Yüksek)</div>
                                </div>
                                <button className="text-xs bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg font-bold hover:bg-rose-200 transition-colors">Görev Ata</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 text-amber-700 font-bold mb-4">
                            <AlertTriangle size={18} /> ORTA RİSK (Takip ve Ek Çalışma)
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white p-4 rounded-xl border border-amber-100 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-slate-900">Mehmet Can</div>
                                    <div className="text-xs text-slate-500 font-medium">Oran-Orantı eksiği</div>
                                </div>
                                <button className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-200 transition-colors">Görev Ata</button>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-amber-100 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-slate-900">Fatma Nur</div>
                                    <div className="text-xs text-slate-500 font-medium">Problem çözme yavaş</div>
                                </div>
                                <button className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-200 transition-colors">Görev Ata</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AssignmentView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900">Sınav & Çalışma Atama</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Target size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Hazır Çalışma Ata</h3>
                    <p className="text-slate-500 text-sm font-medium mb-4">Sistemdeki hazır seviye tespit sınavlarını veya 7 soruluk antrenmanları öğrencilere gönder.</p>
                    <div className="flex items-center text-indigo-600 font-bold text-sm">
                        Seç ve İlerle <ChevronRight size={16} className="ml-1"/>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-300 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Kendi Sınavını Yükle</h3>
                    <p className="text-slate-500 text-sm font-medium mb-4">Word, PDF veya Excel formatındaki sınavlarını yükle, sistem otomatik kazanım eşleştirmesi yapsın.</p>
                    <div className="flex items-center text-emerald-600 font-bold text-sm">
                        Dosya Yükle <ChevronRight size={16} className="ml-1"/>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Manuel Görev Oluştur</h3>
                <div className="flex gap-4">
                    <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none">
                        <option>Sınıf/Öğrenci Seç</option>
                    </select>
                    <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none">
                        <option>Görev Türü (Konu, Zihinden İşlem vb.)</option>
                    </select>
                    <button className="bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-500 transition-colors flex items-center gap-2">
                        <Plus size={18}/> Oluştur
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const MapView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Sınıf Kazanım Haritası (5-A)</h2>
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Sayılar', items: [{n: 'Doğal Sayılar', val: 85}, {n: 'Kesirler', val: 38}, {n: 'Ondalık Gösterim', val: 65}, {n: 'Yüzdeler', val: 54}] },
                        { title: 'Cebir', items: [{n: 'Örüntüler', val: 72}, {n: 'Denklem', val: 47}, {n: 'Eşitsizlik', val: 0}, {n: 'Doğrusal İlş.', val: 0}] },
                        { title: 'Geometri', items: [{n: 'Açılar', val: 0}, {n: 'Üçgenler', val: 0}, {n: 'Alan', val: 0}, {n: 'Çevre', val: 0}] }
                    ].map((col, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h3 className="font-black text-slate-800 text-lg mb-4 pb-2 border-b border-slate-200">{col.title}</h3>
                            <div className="space-y-4">
                                {col.items.map((item, j) => (
                                    <div key={j}>
                                        <div className="flex justify-between text-sm font-bold mb-1">
                                            <span className="text-slate-600">{item.n}</span>
                                            <span className={item.val === 0 ? 'text-slate-400' : item.val < 50 ? 'text-rose-500' : item.val < 75 ? 'text-amber-500' : 'text-emerald-500'}>
                                                {item.val === 0 ? '-' : \`%\${item.val}\`}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className={\`h-full rounded-full \${item.val < 50 ? 'bg-rose-500' : item.val < 75 ? 'bg-amber-500' : 'bg-emerald-500'}\`} style={{ width: \`\${item.val}%\` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const MultiplierView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Kritik Kazanımlar & Çarpan Etkisi</h2>
            <p className="text-slate-500 font-medium">Sonraki öğrenmeleri doğrudan etkileyen zincirleme konuların analizi.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { name: 'Kesirler', success: 38, impact: 'Çok Yüksek', desc: 'Rasyonel sayılar ve denklemler için kritik ön koşul.' },
                    { name: 'Ondalık Gösterim', success: 65, impact: 'Yüksek', desc: 'Yüzdeler konusunun temelini oluşturur.' },
                    { name: 'Yüzdeler', success: 54, impact: 'Kritik', desc: 'Problem çözme ve LGS için doğrudan belirleyicidir.' },
                    { name: 'Örüntüler', success: 72, impact: 'Orta', desc: 'Cebirsel ifadelere giriş sağlar.' }
                ].map(t => (
                    <div key={t.name} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={\`text-xs font-bold px-2 py-1 rounded \${t.impact === 'Kritik' || t.impact === 'Çok Yüksek' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}\`}>
                                    {t.impact} Etki
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.name}</h3>
                            <p className="text-sm text-slate-500 font-medium mb-4">{t.desc}</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-1">
                                <span className="text-slate-400">Sınıf Ortalaması</span>
                                <span className="text-slate-700">%{t.success}</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={\`h-full rounded-full \${t.success < 50 ? 'bg-rose-500' : 'bg-indigo-500'}\`} style={{ width: \`\${t.success}%\` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const ParentSecretaryView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Veli Sekreteri</h2>
                    <p className="text-slate-500 font-medium mt-1">Veliler için karmaşık olmayan, anlaşılır gelişim raporları oluştur.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 mb-4">Öğrenci Seçimi</h3>
                    <div className="relative">
                        <input type="text" placeholder="Öğrenci Ara..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium outline-none" />
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {['Ali Yılmaz', 'Ayşe Demir', 'Mehmet Can', 'Fatma Nur'].map((n, i) => (
                            <div key={i} className={\`p-3 rounded-xl cursor-pointer font-bold text-sm \${i===0 ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}\`}>
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:w-2/3 p-8 bg-slate-100/50">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div className="text-center mb-8 border-b border-slate-100 pb-6">
                            <h3 className="text-2xl font-black text-slate-900">Aylık Gelişim Raporu</h3>
                            <div className="text-slate-500 font-bold mt-1">Ali Yılmaz • Ekim 2026</div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                                <h4 className="font-bold text-indigo-900 mb-3 uppercase text-xs tracking-wider">Bu Ay Çocuğunuz</h4>
                                <ul className="space-y-2 font-bold text-indigo-700 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16}/> 124 soru çözdü.</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16}/> 18 çalışma oturumuna katıldı.</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16}/> 4 eğitici video izledi.</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16}/> 3 yeni kazanımı tamamladı.</li>
                                </ul>
                            </div>

                            <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                                <h4 className="font-bold text-rose-900 mb-3 uppercase text-xs tracking-wider">Geliştirilmesi Gereken Konular</h4>
                                <ul className="list-disc list-inside space-y-1 font-bold text-rose-700 text-sm">
                                    <li>Oran</li>
                                    <li>Problemler</li>
                                </ul>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                                <h4 className="font-bold text-emerald-900 mb-1 uppercase text-xs tracking-wider">Davranışsal Gelişim</h4>
                                <p className="font-medium text-emerald-800 text-sm">
                                    "Bu ay çocuğunuzun düzenli çalışma oranı %22 arttı. Hatalarından sonra tekrar deneme kararlılığı çok iyi durumda."
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
                                <Send size={18}/> Veliye Gönder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
`
fs.writeFileSync('src/components/mit/AdminMitPanel.tsx', content);
