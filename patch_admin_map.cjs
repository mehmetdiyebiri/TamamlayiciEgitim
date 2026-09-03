const fs = require('fs');
let code = fs.readFileSync('src/components/mit/AdminMitPanel.tsx', 'utf8');

// Add import
code = code.replace(
    "import { Users, Map, Target, AlertTriangle, TrendingUp, CheckCircle2, ChevronRight, FileText, Send, UploadCloud, Plus, GraduationCap, BarChart3 } from 'lucide-react';",
    "import { Users, Map, Target, AlertTriangle, TrendingUp, CheckCircle2, ChevronRight, FileText, Send, UploadCloud, Plus, GraduationCap, BarChart3 } from 'lucide-react';\nimport { MIT_CURRICULUM } from '../../data/mitCurriculum';"
);

// Replace MapView
const mapStart = code.indexOf('const MapView = () => {');
const mapEnd = code.indexOf('const MultiplierView = () => {');
const mapCodeOld = code.substring(mapStart, mapEnd);

const mapCodeNew = `const MapView = () => {
    const curriculum = (MIT_CURRICULUM as any)[8] || [];
    
    // Rastgele bir ilerleme simülasyonu
    const generateProgress = (val: string) => {
        let hash = 0;
        for (let i = 0; i < val.length; i++) hash = val.charCodeAt(i) + ((hash << 5) - hash);
        return Math.abs(hash % 100);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Sınıf Kazanım Haritası (8-A LGS)</h2>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {curriculum.map((area: any, i: number) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <h3 className="font-black text-slate-800 text-lg mb-6">{area.area}</h3>
                            <div className="space-y-5">
                                {area.topics.map((topic: string, j: number) => {
                                    const val = generateProgress(topic + "8A");
                                    return (
                                        <div key={j}>
                                            <div className="flex justify-between text-sm font-bold mb-2">
                                                <span className="text-slate-600 line-clamp-1 flex-1 pr-2" title={topic}>{topic}</span>
                                                <span className={val === 0 ? 'text-slate-400' : val < 50 ? 'text-rose-500' : val < 75 ? 'text-amber-500' : 'text-emerald-500'}>
                                                    {val === 0 ? 'İşlenmedi' : \`%\${val}\`}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div className={\`h-full rounded-full \${val < 50 ? 'bg-rose-500' : val < 75 ? 'bg-amber-500' : 'bg-emerald-500'}\`} style={{ width: \`\${val}%\` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

`;

code = code.substring(0, mapStart) + mapCodeNew + code.substring(mapEnd);
fs.writeFileSync('src/components/mit/AdminMitPanel.tsx', code);
console.log('Patched AdminMitPanel.tsx');
