const fs = require('fs');
const content = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Map, Target, AlertTriangle, TrendingUp, CheckCircle2, ChevronRight, FileText, Send, UploadCloud, Plus, GraduationCap, BarChart3 } from 'lucide-react';

export const AdminMitPanel = ({ state, actions }: any) => {
    const [activeTab, setActiveTab] = useState('asistan');

    const tabs = [
        { id: 'asistan', name: 'Öğretmen Asistanı', icon: AlertTriangle },
        { id: 'lgs', name: 'LGS / Deneme Analizi', icon: BarChart3 },
        { id: 'atama', name: 'Sınav & Görev', icon: Target },
        { id: 'harita', name: 'Kazanım Haritası', icon: Map },
        { id: 'carpan', name: 'Kritik Kazanımlar', icon: TrendingUp },
        { id: 'veli', name: 'Veli Sekreteri', icon: FileText },
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <GraduationCap className="text-indigo-600" size={32} />
                        M.İ.T Yönetim
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Sınıfların gelişimini takip et, LGS hedeflerini belirle.</p>
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
                {activeTab === 'lgs' && <LgsAnalysisView />}
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-slate-900">Öğretmen Asistanı</h2>
                <select className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-700 outline-none hover:border-indigo-300 transition-colors cursor-pointer">
                    <option>8-A Sınıfı (LGS Hazırlık)</option>
                    <option>7-B Sınıfı</option>
                    <option>6-A Sınıfı</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Sınıfın Kritik Eksikleri (8-A)</h3>
                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>Köklü İfadeler</span>
                                    <span className="text-rose-400">%32 Başarı</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '32%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>Çarpanlar ve Katlar</span>
                                    <span className="text-amber-400">%48 Başarı</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>Eşitsizlikler</span>
                                    <span className="text-indigo-400">%55 Başarı</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '55%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-900 mb-2">Doğrudan Müdahale Gereken Öğrenciler</h3>
                    
                    <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6">
                        <div className="flex items-center gap-2 text-rose-700 font-bold mb-4">
                            <AlertTriangle size={20} /> ACİL RİSK (LGS Hedefinden Uzaklaşanlar)
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-rose-100 flex flex-col justify-between shadow-sm">
                                <div>
                                    <div className="font-bold text-slate-900 text-lg">Ali Yılmaz</div>
                                    <div className="text-sm text-slate-500 font-medium mt-1">Yeni nesil sorularda çok fazla boş bırakıyor. Matematik Güven Endeksi düşük.</div>
                                </div>
                                <button className="mt-4 text-sm bg-rose-100 text-rose-700 w-full py-2 rounded-xl font-bold hover:bg-rose-200 transition-colors">Özel Görev Ata</button>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-rose-100 flex flex-col justify-between shadow-sm">
                                <div>
                                    <div className="font-bold text-slate-900 text-lg">Ayşe Demir</div>
                                    <div className="text-sm text-slate-500 font-medium mt-1">İşlem hatası (Yüksek). Basit sorularda süre kaybediyor.</div>
                                </div>
                                <button className="mt-4 text-sm bg-rose-100 text-rose-700 w-full py-2 rounded-xl font-bold hover:bg-rose-200 transition-colors">Zihinden İşlem Ata</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LgsAnalysisView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">LGS & Deneme Sınavı Analizi</h2>
            <p className="text-slate-500 font-medium mb-6">Öğrencilerin LGS net ortalamaları ve gelişim trendleri.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Matematik Net Ortalaması</div>
                    <div className="text-4xl font-black text-indigo-600">11.4 <span className="text-lg text-slate-400">/ 20</span></div>
                    <div className="text-xs font-bold text-emerald-500 mt-2 flex items-center justify-center gap-1"><TrendingUp size={14}/> Geçen aya göre +1.2 net</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Yeni Nesil Soru Başarısı</div>
                    <div className="text-4xl font-black text-amber-500">%42</div>
                    <div className="text-xs font-bold text-slate-400 mt-2">Okuduğunu anlama odaklı</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Ortalama Soru Çözüm Hızı</div>
                    <div className="text-4xl font-black text-emerald-500">2dk 15sn</div>
                    <div className="text-xs font-bold text-slate-400 mt-2">Hedef: 2dk altında kalmak</div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Son Deneme Sınavı En Çok Yanlış Yapılan Konular (8-A)</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Veri Analizi (Daire Grafiği Yorumlama)', wrong: 18, total: 24, ratio: 75 },
                        { title: 'Köklü İfadelerde Çarpma ve Bölme', wrong: 14, total: 24, ratio: 58 },
                        { title: 'Çarpanlar ve Katlar (EBOB-EKOK Problemleri)', wrong: 12, total: 24, ratio: 50 },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="flex-1">
                                <div className="text-sm font-bold text-slate-700 mb-1">{item.title}</div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 rounded-full" style={{ width: \`\${item.ratio}%\` }}></div>
                                </div>
                            </div>
                            <div className="w-32 text-right">
                                <span className="text-rose-600 font-bold text-sm">{item.wrong} Yanlış</span>
                                <span className="text-slate-400 text-xs ml-1">/ {item.total} Öğrenci</span>
                            </div>
                            <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-indigo-200">
                                Tüm Sınıfa Ödev Ata
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const AssignmentView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900">Sınav & Çalışma Atama</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 hover:border-indigo-400 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Target size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Sistemden Çalışma Ata</h3>
                    <p className="text-slate-500 text-sm font-medium mb-6">M.İ.T havuzundaki binlerce yeni nesil ve kazanım kavrama sorusundan otomatik testler oluştur.</p>
                    <div className="flex items-center text-indigo-600 font-bold">
                        Havuzdan Seç <ChevronRight size={18} className="ml-1"/>
                    </div>
                </div>

                <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 hover:border-emerald-400 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <UploadCloud size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Kendi Denemeni Yükle</h3>
                    <p className="text-slate-500 text-sm font-medium mb-6">Kurumunuzda uyguladığınız deneme sınavı PDF lerini sisteme yükleyin, optik sonuçları otomatik analiz edelim.</p>
                    <div className="flex items-center text-emerald-600 font-bold">
                        Sınav Dosyası Yükle <ChevronRight size={18} className="ml-1"/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MapView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Sınıf Kazanım Haritası (8-A LGS)</h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Sayılar ve İşlemler', items: [{n: 'Çarpanlar ve Katlar', val: 75}, {n: 'Üslü İfadeler', val: 68}, {n: 'Kareköklü İfadeler', val: 32}] },
                        { title: 'Veri İşleme ve Cebir', items: [{n: 'Veri Analizi', val: 55}, {n: 'Basit Olayların Olma', val: 82}, {n: 'Cebirsel İfadeler', val: 45}, {n: 'Doğrusal Denklemler', val: 0}] },
                        { title: 'Geometri ve Ölçme', items: [{n: 'Eşitsizlikler', val: 0}, {n: 'Üçgenler', val: 0}, {n: 'Eşlik ve Benzerlik', val: 0}, {n: 'Dönüşüm Geometrisi', val: 0}] }
                    ].map((col, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <h3 className="font-black text-slate-800 text-lg mb-6">{col.title}</h3>
                            <div className="space-y-5">
                                {col.items.map((item, j) => (
                                    <div key={j}>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="text-slate-600">{item.n}</span>
                                            <span className={item.val === 0 ? 'text-slate-400' : item.val < 50 ? 'text-rose-500' : item.val < 75 ? 'text-amber-500' : 'text-emerald-500'}>
                                                {item.val === 0 ? 'İşlenmedi' : \`%\${item.val}\`}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Çarpan Etkisi (LGS Öncelikleri)</h2>
            <p className="text-slate-500 font-medium">Bu konular 8. sınıf LGS sınavının belkemiğini oluşturur. Öncelikli olarak eksikleri kapatılmalıdır.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { name: 'Çarpanlar ve Katlar', success: 75, impact: 'Çok Yüksek', desc: 'EBOB-EKOK problemleri LGS de en çok zorlayan konu tiplerindendir.' },
                    { name: 'Kareköklü İfadeler', success: 32, impact: 'Kritik', desc: 'Geometri ve pisagor bağıntısı soruları için doğrudan şarttır.' },
                    { name: 'Cebirsel İfadeler', success: 45, impact: 'Kritik', desc: 'Doğrusal denklemler ve eşitsizlikler konusunun temelidir.' },
                    { name: 'Veri Analizi', success: 55, impact: 'Orta', desc: 'Daire grafiği ve sütun grafiği dönüşümleri her yıl sorulur.' }
                ].map(t => (
                    <div key={t.name} className="bg-white border-2 border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={\`text-xs font-bold px-3 py-1.5 rounded-lg \${t.impact === 'Kritik' || t.impact === 'Çok Yüksek' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}\`}>
                                    {t.impact} Etki
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">{t.name}</h3>
                            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">{t.desc}</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-slate-400">Sınıf Başarısı</span>
                                <span className={t.success < 50 ? 'text-rose-500' : 'text-emerald-500'}>%{t.success}</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={\`h-full rounded-full \${t.success < 50 ? 'bg-rose-500' : 'bg-emerald-500'}\`} style={{ width: \`\${t.success}%\` }}></div>
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Veli Sekreteri</h2>
                    <p className="text-slate-500 font-medium mt-1">Veliler için karmaşık olmayan, anlaşılır LGS gelişim bültenleri oluştur.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 mb-4">8-A Öğrenci Seçimi</h3>
                    <div className="relative">
                        <input type="text" placeholder="Öğrenci Ara..." className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                    <div className="space-y-2 mt-4 max-h-80 overflow-y-auto pr-2">
                        {['Ali Yılmaz', 'Ayşe Demir', 'Mehmet Can', 'Fatma Nur'].map((n, i) => (
                            <div key={i} className={\`p-3.5 rounded-xl cursor-pointer font-bold text-sm transition-colors \${i===0 ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300'}\`}>
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:w-2/3 p-8 bg-slate-100/50">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                        <div className="text-center mb-8 border-b border-slate-100 pb-6">
                            <h3 className="text-2xl font-black text-slate-900">LGS Aylık Gelişim Bülteni</h3>
                            <div className="text-slate-500 font-bold mt-2">Ali Yılmaz • Ekim 2026</div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                                <h4 className="font-bold text-indigo-900 mb-4 uppercase text-xs tracking-wider">LGS Hazırlık Temposu</h4>
                                <ul className="space-y-3 font-bold text-indigo-700 text-sm">
                                    <li className="flex items-center gap-3"><CheckCircle2 size={18}/> M.İ.T üzerinden toplam 420 soru çözdü.</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 size={18}/> Son Türkiye Geneli Denemesinde 14.5 Net yaptı.</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 size={18}/> "Çarpanlar ve Katlar" konusunda ustalık seviyesine ulaştı.</li>
                                </ul>
                            </div>

                            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
                                <h4 className="font-bold text-rose-900 mb-3 uppercase text-xs tracking-wider">Hedef İçin Kapatılması Gereken Eksikler</h4>
                                <ul className="list-disc list-inside space-y-2 font-bold text-rose-700 text-sm">
                                    <li>Kareköklü İfadelerde Çarpma (Öncelikli)</li>
                                    <li>Yeni Nesil Matematik Sorularında Süre Yönetimi</li>
                                </ul>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                                <h4 className="font-bold text-emerald-900 mb-2 uppercase text-xs tracking-wider">Davranışsal Gelişim (Öğretmen Notu)</h4>
                                <p className="font-medium text-emerald-800 text-sm leading-relaxed">
                                    "Ali bu ay zor sorularla karşılaştığında pes etmeme konusunda büyük bir ilerleme kaydetti. Çözemediği soruları Matematik Antrenörü ile tekrar etme alışkanlığı LGS netlerine olumlu yansıyacaktır."
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
                                <Send size={18}/> WhatsApp ile Veliye İlet
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
console.log('Admin panel updated for LGS');
