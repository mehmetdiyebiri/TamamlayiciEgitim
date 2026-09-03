const fs = require('fs');
let code = fs.readFileSync('src/components/mit/StudentMitPanel.tsx', 'utf8');

code = code.replace(
    "import confetti from 'canvas-confetti';",
    "import confetti from 'canvas-confetti';\nimport { MIT_CURRICULUM } from '../../data/mitCurriculum';"
);

code = code.replace(
    "{ id: 'formul', name: 'Formül Kartları', icon: BookOpen }",
    "{ id: 'formul', name: 'Formül Kartları', icon: BookOpen },\n        { id: 'harita', name: 'Kazanım Haritası', icon: Map }"
);

code = code.replace(
    "{activeTab === 'formul' && <FormulaCardsView key=\"formul\" grade={grade} />}",
    "{activeTab === 'formul' && <FormulaCardsView key=\"formul\" grade={grade} />}\n                    {activeTab === 'harita' && <StudentMapView key=\"harita\" grade={grade} />}"
);

code += `\n
const StudentMapView = ({ grade }: { grade: number }) => {
    const curriculum = (MIT_CURRICULUM as any)[grade] || [];
    
    // Rastgele bir ilerleme simülasyonu (öğrencinin bitirdiği konular)
    const generateProgress = (val: string) => {
        let hash = 0;
        for (let i = 0; i < val.length; i++) hash = val.charCodeAt(i) + ((hash << 5) - hash);
        return Math.abs(hash % 100);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">{grade}. Sınıf Kazanım Haritası</h2>
            <p className="text-slate-500 font-medium">Bu ekranda {grade}. sınıf müfredatındaki tüm konuları ve senin hangi konuda ne kadar ilerlediğini görebilirsin.</p>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {curriculum.map((area: any, i: number) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <h3 className="font-black text-slate-800 text-lg mb-6">{area.area}</h3>
                            <div className="space-y-5">
                                {area.topics.map((topic: string, j: number) => {
                                    const progress = generateProgress(topic + grade);
                                    return (
                                        <div key={j}>
                                            <div className="flex justify-between text-sm font-bold mb-2">
                                                <span className="text-slate-600 line-clamp-1 flex-1 pr-2" title={topic}>{topic}</span>
                                                <span className={progress === 0 ? 'text-slate-400' : progress < 50 ? 'text-rose-500' : progress < 75 ? 'text-amber-500' : 'text-emerald-500'}>
                                                    {progress === 0 ? 'İşlenmedi' : \`%\${progress}\`}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div className={\`h-full rounded-full \${progress < 50 ? 'bg-rose-500' : progress < 75 ? 'bg-amber-500' : 'bg-emerald-500'}\`} style={{ width: \`\${progress}%\` }}></div>
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

fs.writeFileSync('src/components/mit/StudentMitPanel.tsx', code);
console.log('Patched StudentMitPanel.tsx');
