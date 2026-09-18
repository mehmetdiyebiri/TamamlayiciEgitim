import React, { useEffect, useState } from 'react';
import { Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FatigueDetector = () => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Show alert after 25 minutes (25 * 60 * 1000 ms)
        const timer = setTimeout(() => {
            setShowAlert(true);
        }, 25 * 60 * 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {showAlert && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl z-50 max-w-sm flex gap-4 items-start"
                >
                    <div className="bg-orange-500/20 text-orange-400 p-3 rounded-xl">
                        <Coffee size={28} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">Mola Zamanı (20-20-20)</h4>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            25 dakikadır çalışıyorsunuz. Gözlerinizi dinlendirmek için 20 saniye boyunca 20 fit (6 metre) uzağa bakın.
                        </p>
                        <button onClick={() => setShowAlert(false)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors w-full">
                            Anladım
                        </button>
                    </div>
                    <button onClick={() => setShowAlert(false)} className="text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
