const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

const injectionCode = `
                        {/* Rozet Ayarları */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Award size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-blue-900 tracking-tight">Gelişim Kartı Rozet Ayarları (Örn: Lojistik Sorumlusu)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(devCardConfig.manualBadges || []).map((badge: any, idx: number) => (
                                    <div key={badge.id} className="bg-white border border-gray-200 p-4 rounded-2xl flex flex-col gap-2 relative group">
                                        <input
                                            type="text"
                                            value={badge.name}
                                            onChange={(e) => {
                                                const newBadges = [...(devCardConfig.manualBadges || [])];
                                                newBadges[idx] = { ...newBadges[idx], name: e.target.value };
                                                handleUpdateDevCardConfig({ ...devCardConfig, manualBadges: newBadges });
                                            }}
                                            className="w-full font-bold text-sm text-gray-800 outline-none bg-transparent"
                                        />
                                        <button
                                            onClick={() => {
                                                const newBadges = (devCardConfig.manualBadges || []).filter((_: any, i: number) => i !== idx);
                                                handleUpdateDevCardConfig({ ...devCardConfig, manualBadges: newBadges });
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newBadges = [...(devCardConfig.manualBadges || []), { id: Date.now(), name: 'Yeni Rozet' }];
                                        handleUpdateDevCardConfig({ ...devCardConfig, manualBadges: newBadges });
                                    }}
                                    className="bg-blue-50/50 border-2 border-dashed border-blue-200 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors text-blue-600 font-bold text-sm"
                                >
                                    <Plus size={16} /> Rozet Ekle
                                </button>
                            </div>
                        </div>
`;

code = code.replace('<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">', injectionCode + '\n                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">');
fs.writeFileSync('src/components/AdminPanel.tsx', code);
console.log("Patched AdminPanel.tsx again");
