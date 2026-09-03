const fs = require('fs');
const file = 'src/components/hizliokuma/EyeExercises.tsx';
let content = fs.readFileSync(file, 'utf-8');

// 1. Add Timer to lucide-react imports if not there
if (!content.includes('Timer')) {
    content = content.replace(/import \{ Eye, Play, Pause, Minimize, Maximize, MoveUpRight, Focus, Grid, Activity, ArrowRightLeft, ArrowUpDown, GripVertical, Waves, Target, CheckCircle2 \} from 'lucide-react';/, 
    "import { Eye, Play, Pause, Minimize, Maximize, MoveUpRight, Focus, Grid, Activity, ArrowRightLeft, ArrowUpDown, GripVertical, Waves, Target, CheckCircle2, Timer } from 'lucide-react';");
}

// 2. Add duration and timeLeft states to EyeExercises
const searchStr = `    const [shapeType, setShapeType] = useState<'kare' | 'elips' | 'dikdortgen' | 'daire' | 'altigen'>('kare');`;

const newStates = `    const [shapeType, setShapeType] = useState<'kare' | 'elips' | 'dikdortgen' | 'daire' | 'altigen'>('kare');

    const [duration, setDuration] = useState(60);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    useEffect(() => {
        setTimeLeft(duration);
        setIsPlaying(false);
    }, [duration, activeEx]);`;

content = content.replace(searchStr, newStates);

// 3. Update the controls in the header
const controlsStr = `                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsFullscreen(!isFullscreen)}`;

const newControls = `                <div className="flex items-center gap-3">
                    {activeEx !== 'menu' && (
                        <>
                            <select 
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500"
                            >
                                <option value={30}>30 Saniye</option>
                                <option value={60}>60 Saniye</option>
                                <option value={90}>90 Saniye</option>
                                <option value={120}>120 Saniye</option>
                                <option value={150}>150 Saniye</option>
                            </select>
                            <div className="px-3 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm border border-indigo-100 flex items-center gap-2">
                                <Timer size={16} />
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </div>
                        </>
                    )}
                    <button 
                        onClick={() => setIsFullscreen(!isFullscreen)}`;

content = content.replace(controlsStr, newControls);

// 4. Update the controls in the fullscreen mode
const fullscreenControlsStr = `                    <div className="absolute top-4 right-4 z-50 flex gap-4">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}`;

const newFullscreenControls = `                    <div className="absolute top-4 right-4 z-50 flex gap-4 items-center">
                        <div className="px-4 py-3 bg-white text-indigo-700 font-bold rounded-xl text-lg border border-indigo-100 flex items-center gap-2 shadow-lg">
                            <Timer size={24} />
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}`;

content = content.replace(fullscreenControlsStr, newFullscreenControls);

fs.writeFileSync(file, content);
console.log('Patched EyeExercises.tsx');
