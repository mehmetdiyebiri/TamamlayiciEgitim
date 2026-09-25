import React, { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  wpm: number;
  mode: 'fade' | 'blur' | 'hide';
}

export const AntiRegressionReader: React.FC<Props> = ({ text, wpm, mode }) => {
  const words = useRef(text.split(/\s+/).filter(w => w.trim().length > 0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalMs = (60 / wpm) * 1000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentIndex < words.length) {
      timer = setInterval(() => {
        setCurrentIndex(prev => prev + 1);
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentIndex, intervalMs, words.length]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors"
        >
          {isRunning ? 'Duraklat' : 'Başlat'}
        </button>
        <span className="text-sm self-center text-slate-500 font-medium">Hız: {wpm} WPM</span>
      </div>

      <div className="text-2xl leading-loose font-sans flex flex-wrap gap-x-2">
        {words.map((word, idx) => {
          let styleClass = 'transition-all duration-150 ';
          if (idx < currentIndex) {
            if (mode === 'hide') styleClass += 'opacity-0 select-none';
            else if (mode === 'blur') styleClass += 'filter blur-sm opacity-20';
            else styleClass += 'opacity-10 text-slate-400';
          } else if (idx === currentIndex) {
            styleClass += 'text-indigo-600 font-bold bg-indigo-50 px-1 rounded';
          } else {
            styleClass += 'text-slate-800';
          }

          return (
            <span key={idx} className={styleClass}>
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
