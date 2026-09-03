const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/hizliokuma/EyeExercises.tsx');

const code = `import React, { useState, useEffect } from 'react';
import { Eye, Focus, Maximize, MoveUpRight, Play, Pause, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// 1. 13 Nokta Egzersizi
const Points13Exercise = ({ isPlaying }: { isPlaying: boolean }) => {
    const [currentPoint, setCurrentPoint] = useState(0);
    const points = [
        { x: '50%', y: '50%' }, // 1. Merkez
        { x: '10%', y: '10%' }, // 2. Sol üst
        { x: '50%', y: '10%' }, // 3. Orta üst
        { x: '90%', y: '10%' }, // 4. Sağ üst
        { x: '90%', y: '50%' }, // 5. Sağ orta
        { x: '90%', y: '90%' }, // 6. Sağ alt
        { x: '50%', y: '90%' }, // 7. Orta alt
        { x: '10%', y: '90%' }, // 8. Sol alt
        { x: '10%', y: '50%' }, // 9. Sol orta
        { x: '25%', y: '25%' }, // 10. İç sol üst
        { x: '75%', y: '25%' }, // 11. İç sağ üst
        { x: '75%', y: '75%' }, // 12. İç sağ alt
        { x: '25%', y: '75%' }  // 13. İç sol alt
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentPoint((prev) => (prev + 1) % points.length);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, points.length]);

    return (
        <div className="w-full h-full relative bg-slate-900 rounded-2xl overflow-hidden">
            {/* Background points for reference */}
            {points.map((p, i) => (
                <div key={i} className="absolute w-2 h-2 rounded-full bg-slate-700/30 -ml-1 -mt-1" style={{ left: p.x, top: p.y }} />
            ))}
            {/* Active Point */}
            <motion.div
                className="absolute w-6 h-6 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] -ml-3 -mt-3"
                animate={{
                    left: points[currentPoint].x,
                    top: points[currentPoint].y
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        </div>
    );
};

// 2. Zigzag Takip
const ZigzagExercise = ({ isPlaying }: { isPlaying: boolean }) => {
    const [pathIndex, setPathIndex] = useState(0);
    // Defines a zigzag path from top to bottom
    const points = [
        { x: '10%', y: '10%' },
        { x: '90%', y: '20%' },
        { x: '10%', y: '30%' },
        { x: '90%', y: '40%' },
        { x: '10%', y: '50%' },
        { x: '90%', y: '60%' },
        { x: '10%', y: '70%' },
        { x: '90%', y: '80%' },
        { x: '10%', y: '90%' }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setPathIndex((prev) => {
                    const next = prev + 1;
                    if (next >= points.length) return 0;
                    return next;
                });
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isPlaying, points.length]);

    return (
        <div className="w-full h-full relative bg-slate-900 rounded-2xl overflow-hidden">
             <motion.div
                className="absolute w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] -ml-3 -mt-3"
                animate={{
                    left: points[pathIndex].x,
                    top: points[pathIndex].y
                }}
                transition={{ duration: 0.8, ease: "linear" }}
            />
        </div>
    );
};

// 3. Dairesel Odak
const CircularExercise = ({ isPlaying }: { isPlaying: boolean }) => {
    const [circles, setCircles] = useState<number[]>([0]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCircles(prev => [...prev, Date.now()]);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (circles.length > 5) {
            setCircles(prev => prev.slice(prev.length - 5));
        }
    }, [circles]);

    return (
        <div className="w-full h-full relative bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full z-10" />
            <AnimatePresence>
                {circles.map(id => (
                    <motion.div
                        key={id}
                        initial={{ width: 20, height: 20, opacity: 0.8 }}
                        animate={{ width: 400, height: 400, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="absolute rounded-full border-4 border-emerald-500"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

// 4. Kare Görme Alanı
const SquareExercise = ({ isPlaying }: { isPlaying: boolean }) => {
    const [activeCorner, setActiveCorner] = useState<number | null>(null);
    const [symbol, setSymbol] = useState('');
    
    const corners = [
        { top: '15%', left: '15%' },
        { top: '15%', right: '15%' },
        { bottom: '15%', left: '15%' },
        { bottom: '15%', right: '15%' }
    ];

    const symbols = ['A', '5', 'X', '9', 'M', '3', 'K', '7', 'P', '2'];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveCorner(Math.floor(Math.random() * 4));
                setSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
                
                // Hide after short duration to flash it
                setTimeout(() => {
                    setActiveCorner(null);
                }, 600);
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full h-full relative bg-slate-900 rounded-2xl overflow-hidden">
            {/* Center Focus Point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full" />
            
            {/* Flash Corners */}
            {corners.map((pos, idx) => (
                <div key={idx} className="absolute w-12 h-12 flex items-center justify-center" style={pos}>
                    <AnimatePresence>
                        {activeCorner === idx && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.1 }}
                                className="text-3xl font-bold text-white"
                            >
                                {symbol}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
            
            {!isPlaying && (
                 <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
                     <p className="text-white/70 font-medium mb-4 mt-16">Merkezdeki kırmızı noktaya odaklanın ve köşelerde beliren sembolleri görmeye çalışın (gözlerinizi merkezden ayırmayın).</p>
                 </div>
            )}
        </div>
    );
};

export const EyeExercises = ({ state, actions }: any) => {
    const [activeEx, setActiveEx] = useState('menu');
    const [isPlaying, setIsPlaying] = useState(false);

    const exercises = [
        { id: '13points', name: '13 Nokta Egzersizi', icon: <Maximize />, desc: 'Gözlerinizi sırayla noktalara odaklayın.' },
        { id: 'zigzag', name: 'Zigzag Takip', icon: <MoveUpRight />, desc: 'Dikey ve yatay zikzak çizen nesneyi takip edin.' },
        { id: 'circular', name: 'Dairesel Odak', icon: <Focus />, desc: 'Merkezden dışa doğru genişleyen daireleri takip edin.' },
        { id: 'square', name: 'Kare Görme Alanı', icon: <Eye />, desc: 'Merkeze bakarken köşelerde beliren sembolleri yakalayın.' }
    ];

    if (activeEx === 'menu') {
        return (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                    <Eye className="text-emerald-600" /> Göz Egzersizleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exercises.map(ex => (
                        <button key={ex.id} onClick={() => { setActiveEx(ex.id); setIsPlaying(true); }} className="p-6 text-left border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 rounded-2xl transition-all group flex flex-col gap-3 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                {ex.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 group-hover:text-emerald-700">{ex.name}</h4>
                                <p className="text-sm text-gray-500 font-medium mt-1">{ex.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {exercises.find(e => e.id === activeEx)?.icon}
                    {exercises.find(e => e.id === activeEx)?.name}
                </h3>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)} 
                        className={\`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors \${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}\`}
                    >
                        {isPlaying ? <><Pause size={16}/> Duraklat</> : <><Play size={16}/> Başlat</>}
                    </button>
                    <button 
                        onClick={() => { setActiveEx('menu'); setIsPlaying(false); }} 
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors"
                    >
                        Menüye Dön
                    </button>
                </div>
            </div>
            
            <div className="h-[400px] rounded-2xl relative">
                {activeEx === '13points' && <Points13Exercise isPlaying={isPlaying} />}
                {activeEx === 'zigzag' && <ZigzagExercise isPlaying={isPlaying} />}
                {activeEx === 'circular' && <CircularExercise isPlaying={isPlaying} />}
                {activeEx === 'square' && <SquareExercise isPlaying={isPlaying} />}
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
                <div className="mt-0.5"><Eye size={18} /></div>
                <p>{exercises.find(e => e.id === activeEx)?.desc}</p>
            </div>
        </div>
    );
};
`;

fs.writeFileSync(filePath, code);
