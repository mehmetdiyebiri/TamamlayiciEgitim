import React, { useState } from 'react';
import { Users, BarChart3, TrendingUp, AlertTriangle, Target, ChevronDown } from 'lucide-react';

export const AdminHizliOkumaPanel = ({ state, actions }: any) => {
    const { classes } = state;
    const [selectedClass, setSelectedClass] = useState(classes && Object.keys(classes).length > 0 ? Object.keys(classes)[0] : 'Tümü');

    const topStudents = [
        { name: "Ahmet Yılmaz", startWpm: 120, currentWpm: 280, growth: "%133" },
        { name: "Ayşe Kaya", startWpm: 150, currentWpm: 310, growth: "%106" },
        { name: "Mehmet Can", startWpm: 110, currentWpm: 210, growth: "%90" }
    ];

    const riskStudents = [
        { name: "Zeynep Demir", currentWpm: 90, comp: "%40", reason: "Düzenli egzersiz yapmıyor" },
        { name: "Ali Veli", currentWpm: 105, comp: "%30", reason: "Anlama testlerinde zayıf" }
    ];

    return (
        <div className="p-8 animate-in fade-in space-y-8 pb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-blue-900">Hızlı Okuma Yönetimi</h2>
                    <p className="text-gray-500 font-medium mt-1">Öğrencilerin okuma hızlarını ve anlama gelişimlerini takip edin.</p>
                </div>
                <div className="relative">
                    <select 
                        value={selectedClass} 
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm"
                    >
                        <option value="Tümü">Tüm Sınıflar</option>
                        {classes && Object.keys(classes).map((c: any) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-blue-900">
                        <TrendingUp size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-blue-500 text-xs font-black uppercase tracking-widest mb-1">Sınıf Ortalama Hızı</div>
                        <div className="text-4xl font-black text-gray-800">185 <span className="text-lg text-gray-400 font-bold">WPM</span></div>
                        <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">Geçen aya göre +15%</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-emerald-900">
                        <BarChart3 size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-1">Anlama Ortalaması</div>
                        <div className="text-4xl font-black text-gray-800">%68</div>
                        <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">Hedef: %75</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-purple-900">
                        <Target size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-purple-500 text-xs font-black uppercase tracking-widest mb-1">Kurs Tamamlama</div>
                        <div className="text-4xl font-black text-gray-800">%42</div>
                        <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                            <div className="bg-purple-500 h-full w-[42%]"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-orange-900">
                        <Users size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-1">Aktif Öğrenci</div>
                        <div className="text-4xl font-black text-gray-800">124</div>
                        <div className="mt-2 text-xs font-bold text-gray-500">Son 7 günde giriş yapanlar</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* En çok gelişenler */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100 bg-emerald-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                            <TrendingUp size={18} className="text-emerald-600" />
                            En Çok Gelişen Öğrenciler
                        </h3>
                    </div>
                    <div className="p-2">
                        {topStudents.map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="font-bold text-gray-800">{s.name}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-emerald-600">+{s.growth} Hızlanma</div>
                                    <div className="text-xs text-gray-400 font-bold">{s.startWpm} ➔ {s.currentWpm} WPM</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Grubu */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100 bg-red-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-red-900 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-red-500" />
                            Risk Grubundaki Öğrenciler
                        </h3>
                    </div>
                    <div className="p-2">
                        {riskStudents.map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors border-b border-gray-50 last:border-0">
                                <div>
                                    <div className="font-bold text-gray-800">{s.name}</div>
                                    <div className="text-xs text-red-500 font-semibold">{s.reason}</div>
                                </div>
                                <div className="text-right flex gap-3">
                                    <div className="bg-red-50 px-3 py-1 rounded-lg">
                                        <div className="text-[10px] text-red-400 font-bold uppercase">Hız</div>
                                        <div className="text-sm font-black text-red-600">{s.currentWpm}</div>
                                    </div>
                                    <div className="bg-orange-50 px-3 py-1 rounded-lg">
                                        <div className="text-[10px] text-orange-400 font-bold uppercase">Anlama</div>
                                        <div className="text-sm font-black text-orange-600">{s.comp}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={28} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Gelişmiş Grafikler</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Sınıfların haftalık bazdaki okuma hızı ve anlama oranındaki değişim grafikleri (Recharts entegrasyonu ile eklenecektir).</p>
            </div>
            
        </div>
    );
};
