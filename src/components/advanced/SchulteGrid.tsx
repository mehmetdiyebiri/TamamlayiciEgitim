import React, { useState, useEffect } from 'react';

export const SchulteGrid: React.FC<{ size?: number }> = ({ size = 5 }) => {
  const total = size * size;
  const [grid, setGrid] = useState<number[]>([]);
  const [currentExpected, setCurrentExpected] = useState<number>(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const initGame = () => {
    const numbers = Array.from({ length: total }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setGrid(numbers);
    setCurrentExpected(1);
    setStartTime(Date.now());
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, [size]);

  const handleCellClick = (num: number) => {
    if (num === currentExpected) {
      if (num === total) {
        setIsCompleted(true);
        if (startTime) setElapsedTime((Date.now() - startTime) / 1000);
      } else {
        setCurrentExpected(prev => prev + 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!isCompleted && <div className="text-xl font-bold text-slate-700">Hedef: {currentExpected}</div>}
      <div 
        className="grid gap-2 bg-slate-100 p-4 rounded-xl relative"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-500 rounded-full pointer-events-none z-10 opacity-70" />
        
        {grid.map((num, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(num)}
            className={`w-16 h-16 sm:w-20 sm:h-20 bg-white text-2xl font-bold rounded-lg shadow-sm hover:bg-indigo-50 active:scale-95 transition flex items-center justify-center text-slate-800
               ${num < currentExpected ? 'opacity-30' : ''}`}
          >
            {num}
          </button>
        ))}
      </div>
      {isCompleted && (
        <div className="text-emerald-600 font-bold text-xl mt-4 bg-emerald-50 px-6 py-3 rounded-xl border border-emerald-100">
          Tebrikler! Tamamlama Süresi: {elapsedTime.toFixed(2)} saniye
          <button onClick={initGame} className="block mt-2 mx-auto text-sm bg-white px-4 py-1 rounded shadow-sm text-slate-600">Tekrar Oyna</button>
        </div>
      )}
    </div>
  );
};
