const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/hizliokuma/EyeExercises.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// Add Fullscreen icon
code = code.replace(
    /import \{ Eye, Focus, Maximize, MoveUpRight, Play, Pause, RefreshCw \} from 'lucide-react';/,
    "import { Eye, Focus, Maximize, MoveUpRight, Play, Pause, RefreshCw, Minimize } from 'lucide-react';"
);

// Add isFullscreen state
code = code.replace(
    /const \[activeEx, setActiveEx\] = useState\('menu'\);\s*const \[isPlaying, setIsPlaying\] = useState\(false\);/,
    `const [activeEx, setActiveEx] = useState('menu');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);`
);

// Add fullscreen button next to "Menüye Dön"
code = code.replace(
    /<button \s*onClick=\{\(\) => setIsPlaying\(!isPlaying\)\} /m,
    `<button 
        onClick={() => setIsFullscreen(!isFullscreen)} 
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
    >
        {isFullscreen ? <><Minimize size={16}/> Küçült</> : <><Maximize size={16}/> Tam Ekran</>}
    </button>
    <button 
        onClick={() => setIsPlaying(!isPlaying)} `
);

// Wrap the exercise container in fullscreen logic
code = code.replace(
    /<div className="w-full max-w-\[1200px\] aspect-square mx-auto rounded-2xl relative shadow-inner border border-slate-800">([\s\S]*?)<\/div>/m,
    `{isFullscreen ? (
                <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center p-4">
                    <div className="absolute top-4 right-4 z-50 flex gap-4">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)} 
                            className={\`px-6 py-3 rounded-xl text-lg font-bold flex items-center gap-2 transition-colors shadow-lg \${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}\`}
                        >
                            {isPlaying ? <><Pause size={24}/> Duraklat</> : <><Play size={24}/> Başlat</>}
                        </button>
                        <button 
                            onClick={() => setIsFullscreen(false)} 
                            className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-xl text-lg font-bold transition-colors shadow-lg flex items-center gap-2"
                        >
                            <Minimize size={24}/> Küçült
                        </button>
                    </div>
                    <div className="w-full h-full max-w-[100vh] aspect-square mx-auto relative">
$1
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[1200px] aspect-square mx-auto rounded-2xl relative shadow-inner border border-slate-800">
$1
                </div>
            )}`
);

// Fix the button that resets activeEx to also exit fullscreen
code = code.replace(
    /onClick=\{\(\) => \{ setActiveEx\('menu'\); setIsPlaying\(false\); \}\}/,
    `onClick={() => { setActiveEx('menu'); setIsPlaying(false); setIsFullscreen(false); }}`
);

fs.writeFileSync(filePath, code);
