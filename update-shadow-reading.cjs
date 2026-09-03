const fs = require('fs');
let content = fs.readFileSync('src/components/hizliokuma/ShadowReading.tsx', 'utf8');

// Add showResult state and CheckCircle2 icon
content = content.replace('import { Layers, Play, Pause, RotateCcw, Volume2, VolumeX } from \'lucide-react\';', 
    'import { Layers, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2 } from \'lucide-react\';');

content = content.replace('const [useAntiRegression, setUseAntiRegression] = useState(false);', 
    'const [useAntiRegression, setUseAntiRegression] = useState(true);\n    const [showResult, setShowResult] = useState(false);');

// Show result when finished
content = content.replace('setIsRunning(false);\n                        return words.length - 1;', 
    'setIsRunning(false);\n                        setShowResult(true);\n                        return words.length - 1;');

// Hide result when changing text
content = content.replace('setIsRunning(false);\n    }, [selectedTextIndex]);', 
    'setIsRunning(false);\n        setShowResult(false);\n    }, [selectedTextIndex]);');

// Hide result on restart
content = content.replace('onClick={() => { setIsRunning(false); setCurrentIndex(-1); }}', 
    'onClick={() => { setIsRunning(false); setCurrentIndex(-1); setShowResult(false); }}');

content = content.replace('onClick={() => setIsRunning(!isRunning)}', 
    'onClick={() => { setIsRunning(!isRunning); setShowResult(false); if(currentIndex === words.length - 1) setCurrentIndex(-1); }}');

// Result modal
const modalCode = `
            {showResult && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-2">Egzersiz Tamamlandı!</h3>
                    <p className="text-slate-500 font-medium mb-6">Harika bir iş çıkardınız.</p>
                    <div className="bg-white px-8 py-6 rounded-2xl border border-slate-200 shadow-sm text-center mb-8">
                        <div className="text-sm font-bold text-slate-400 uppercase mb-2">Ortalama Okuma Hızınız</div>
                        <div className="text-4xl font-black text-indigo-600">{Math.round((60000 / speed) * wordCount)} <span className="text-lg text-slate-500 font-medium">kelime/dk</span></div>
                    </div>
                    <button onClick={() => { setShowResult(false); setCurrentIndex(-1); }} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                        Tekrar Başla
                    </button>
                </div>
            )}
`;

content = content.replace('<div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 relative shadow-inner min-h-[400px] flex flex-col justify-between">', 
    '<div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 relative shadow-inner min-h-[400px] flex flex-col justify-between">' + modalCode);

fs.writeFileSync('src/components/hizliokuma/ShadowReading.tsx', content);
