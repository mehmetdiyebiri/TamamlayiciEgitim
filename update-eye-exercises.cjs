const fs = require('fs');
let content = fs.readFileSync('src/components/hizliokuma/EyeExercises.tsx', 'utf8');

// Import metronome and Volume icons
content = content.replace('import { Eye, Play, Pause, Minimize, Maximize, MoveUpRight, Focus, Grid, Activity, ArrowRightLeft, ArrowUpDown, GripVertical, Waves, Target, CheckCircle2, Timer } from \'lucide-react\';',
    'import { Eye, Play, Pause, Minimize, Maximize, MoveUpRight, Focus, Grid, Activity, ArrowRightLeft, ArrowUpDown, GripVertical, Waves, Target, CheckCircle2, Timer, Volume2, VolumeX } from \'lucide-react\';\nimport { metronome } from \'../../utils/metronome\';');

// Add props to the exercises
const propsToReplace = '{ isPlaying }: { isPlaying: boolean }';
const newProps = '{ isPlaying, speed = 800, useMetronome = false }: { isPlaying: boolean, speed?: number, useMetronome?: boolean }';
content = content.replaceAll(propsToReplace, newProps);

const propsToReplaceShape = '{ isPlaying, shape }: { isPlaying: boolean, shape: \'kare\' | \'elips\' | \'dikdortgen\' | \'daire\' | \'altigen\' }';
const newPropsShape = '{ isPlaying, shape, speed = 800, useMetronome = false }: { isPlaying: boolean, shape: \'kare\' | \'elips\' | \'dikdortgen\' | \'daire\' | \'altigen\', speed?: number, useMetronome?: boolean }';
content = content.replaceAll(propsToReplaceShape, newPropsShape);

// Replace hardcoded intervals with speed and add metronome
content = content.replaceAll('800);', 'speed);\n                if (useMetronome) metronome.playClick();');
content = content.replaceAll('700);', 'speed);\n                if (useMetronome) metronome.playClick();');
content = content.replaceAll('600);', 'speed);\n                if (useMetronome) metronome.playClick();');
content = content.replaceAll('900);', 'speed);\n                if (useMetronome) metronome.playClick();');
// Fix BuyuyenSekiller which might not have an interval
content = content.replace('const scale = 1 - (i * 0.09);', 'const scale = 1 - (i * 0.09);'); // Do nothing here if it doesn't have an interval

// State for speed and metronome
content = content.replace('const [duration, setDuration] = useState(60);', 
    'const [duration, setDuration] = useState(60);\n    const [speed, setSpeed] = useState(800);\n    const [useMetronome, setUseMetronome] = useState(false);');

// Pass speed and useMetronome to rendered exercises
content = content.replace('case \'yatay\': return <YatayZikzak isPlaying={isPlaying} />;', 'case \'yatay\': return <YatayZikzak isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;');
content = content.replace('case \'dikey\': return <DikeyZikzak isPlaying={isPlaying} />;', 'case \'dikey\': return <DikeyZikzak isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;');
content = content.replace('case \'kolon\': return <Kolonlar isPlaying={isPlaying} />;', 'case \'kolon\': return <Kolonlar isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;');
content = content.replace('case \'ponte\': return <Ponte isPlaying={isPlaying} />;', 'case \'ponte\': return <Ponte isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;');
content = content.replace('case \'sekil\': return <BuyuyenSekiller isPlaying={isPlaying} shape={shapeType} />;', 'case \'sekil\': return <BuyuyenSekiller isPlaying={isPlaying} shape={shapeType} speed={speed} useMetronome={useMetronome} />;');
content = content.replace('case \'star\': return <StarPoints isPlaying={isPlaying} />;', 'case \'star\': return <StarPoints isPlaying={isPlaying} speed={speed} useMetronome={useMetronome} />;');

// Add controls for speed and metronome in the top bar (where the timer is)
const controls = `
                        <div className="flex items-center gap-4">
                            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl outline-none font-bold text-sm">
                                <option value={1200}>Yavaş (1.2s)</option>
                                <option value={800}>Normal (0.8s)</option>
                                <option value={600}>Hızlı (0.6s)</option>
                                <option value={400}>Çok Hızlı (0.4s)</option>
                            </select>
                            <button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={\`px-3 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors shadow-sm \${useMetronome ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white text-slate-600 border-slate-200'}\`}>
                                {useMetronome ? <Volume2 size={16}/> : <VolumeX size={16}/>} Metronom
                            </button>
`;
content = content.replace('<div className="flex items-center gap-4">', controls);

fs.writeFileSync('src/components/hizliokuma/EyeExercises.tsx', content);
