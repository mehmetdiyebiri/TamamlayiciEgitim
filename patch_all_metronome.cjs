const fs = require('fs');

// PATCH BLOCK READING
let blockFile = 'src/components/hizliokuma/BlockReading.tsx';
let blockContent = fs.readFileSync(blockFile, 'utf-8');

if (!blockContent.includes('metronome')) {
    blockContent = blockContent.replace(`import { BookOpen, Play, CheckCircle2 } from 'lucide-react';`, `import { BookOpen, Play, CheckCircle2, Volume2, VolumeX } from 'lucide-react';\nimport { metronome } from '../../utils/metronome';`);
    
    blockContent = blockContent.replace(`const [selectedTextIndex, setSelectedTextIndex] = useState(0);`, `const [selectedTextIndex, setSelectedTextIndex] = useState(0);\n    const [useMetronome, setUseMetronome] = useState(false);`);
    
    // In setInterval:
    blockContent = blockContent.replace(/interval = setInterval\(\(\) => \{([\s\S]*?)setCurrentBlockIndex\(prev => \{/m, (match, p1) => {
        return `interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentBlockIndex(prev => {`;
    });

    // In return UI:
    blockContent = blockContent.replace(`<select value={speed}`, `<button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={\`px-3 py-1.5 rounded-lg border text-sm font-bold flex items-center gap-2 transition-colors \${useMetronome ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}\`} title="Metronom">
                        {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                    </button>\n                    <select value={speed}`);
                    
    fs.writeFileSync(blockFile, blockContent);
    console.log('Patched BlockReading');
}

// PATCH SHADOW READING
let shadowFile = 'src/components/hizliokuma/ShadowReading.tsx';
let shadowContent = fs.readFileSync(shadowFile, 'utf-8');

if (!shadowContent.includes('metronome')) {
    shadowContent = shadowContent.replace(`import { Layers, Play, Pause, RotateCcw } from 'lucide-react';`, `import { Layers, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';\nimport { metronome } from '../../utils/metronome';`);
    
    shadowContent = shadowContent.replace(`const [selectedTextIndex, setSelectedTextIndex] = useState(0);`, `const [selectedTextIndex, setSelectedTextIndex] = useState(0);\n    const [useMetronome, setUseMetronome] = useState(false);`);
    
    shadowContent = shadowContent.replace(/interval = setInterval\(\(\) => \{([\s\S]*?)setCurrentIndex\(prev => \{/m, (match, p1) => {
        return `interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentIndex(prev => {`;
    });

    // Add button next to Reset button or Speed select
    shadowContent = shadowContent.replace(`<select value={speed}`, `<button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={\`px-3 py-1.5 rounded-lg border text-sm font-bold flex items-center gap-2 transition-colors \${useMetronome ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}\`} title="Metronom">
                        {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                    </button>\n                    <select value={speed}`);
    
    // Re-patch speed select if we needed to pass useMetronome into effect deps
    shadowContent = shadowContent.replace(/speed, wordCount\]\);/, `speed, wordCount, useMetronome]);`);

    fs.writeFileSync(shadowFile, shadowContent);
    console.log('Patched ShadowReading');
}

// PATCH GROUPING
let groupingFile = 'src/components/hizliokuma/Grouping.tsx';
let groupingContent = fs.readFileSync(groupingFile, 'utf-8');

if (!groupingContent.includes('metronome')) {
    groupingContent = groupingContent.replace(`import { List, Play, Pause, RotateCcw, Settings, FileText, Info } from 'lucide-react';`, `import { List, Play, Pause, RotateCcw, Settings, FileText, Info, Volume2, VolumeX } from 'lucide-react';\nimport { metronome } from '../../utils/metronome';`);
    
    groupingContent = groupingContent.replace(`const [mode, setMode] = useState<'silinmeden' | 'silinerek'>('silinmeden');`, `const [mode, setMode] = useState<'silinmeden' | 'silinerek'>('silinmeden');\n    const [useMetronome, setUseMetronome] = useState(false);`);
    
    groupingContent = groupingContent.replace(/interval = setInterval\(\(\) => \{([\s\S]*?)setCurrentIndex\(prev => \{/m, (match, p1) => {
        return `interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentIndex(prev => {`;
    });

    groupingContent = groupingContent.replace(/timePerGroup\]\);/, `timePerGroup, useMetronome]);`);

    // Add button next to reset/play in Grouping
    groupingContent = groupingContent.replace(`<button \n                            onClick={handleReset}`, `<button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={\`px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 \${useMetronome ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}\`} title="Metronom">
                            {useMetronome ? <Volume2 size={18}/> : <VolumeX size={18}/>} Metronom
                        </button>\n                        <button \n                            onClick={handleReset}`);

    fs.writeFileSync(groupingFile, groupingContent);
    console.log('Patched Grouping');
}

// PATCH TACHISTOSCOPE
let tFile = 'src/components/hizliokuma/Tachistoscope.tsx';
let tContent = fs.readFileSync(tFile, 'utf-8');

if (!tContent.includes('metronome')) {
    tContent = tContent.replace(`import { Eye, Play, CheckCircle2 } from 'lucide-react';`, `import { Eye, Play, CheckCircle2, Volume2, VolumeX } from 'lucide-react';\nimport { metronome } from '../../utils/metronome';`);
    
    tContent = tContent.replace(`const [speed, setSpeed] = useState(200);`, `const [speed, setSpeed] = useState(200);\n    const [useMetronome, setUseMetronome] = useState(false);`);
    
    tContent = tContent.replace(/interval = setInterval\(\(\) => \{([\s\S]*?)setCurrentWordIndex\(prev => \{/m, (match, p1) => {
        return `interval = setInterval(() => {
                if (useMetronome) metronome.playClick();
                setCurrentWordIndex(prev => {`;
    });

    tContent = tContent.replace(/speed\]\);/, `speed, useMetronome]);`);

    tContent = tContent.replace(`<select value={speed}`, `<button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={\`px-3 py-1.5 rounded-lg border text-sm font-bold flex items-center gap-2 transition-colors \${useMetronome ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}\`} title="Metronom">
                        {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                    </button>\n                    <select value={speed}`);

    fs.writeFileSync(tFile, tContent);
    console.log('Patched Tachistoscope');
}

