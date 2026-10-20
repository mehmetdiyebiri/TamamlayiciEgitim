import React, { useState, useEffect } from 'react';

export const WorkingMemoryGrid: React.FC = () => {
  const [activeCells, setActiveCells] = useState<number[]>([]);
  const [userSelection, setUserSelection] = useState<number[]>([]);
  const [isMemorizing, setIsMemorizing] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(3); 

  const startRound = () => {
    setUserSelection([]);
    const chosen: number[] = [];
    while (chosen.length < level) {
      const rand = Math.floor(Math.random() * 16);
      if (!chosen.includes(rand)) chosen.push(rand);
    }
    setActiveCells(chosen);
    setIsMemorizing(true);

    setTimeout(() => {
      setIsMemorizing(false);
    }, 1200);
  };

  const handleCellClick = (idx: number) => {
    if (isMemorizing || userSelection.includes(idx) || activeCells.length === 0) return;
    const newSelection = [...userSelection, idx];
    setUserSelection(newSelection);

    if (newSelection.length === activeCells.length) {
      const isSuccess = activeCells.every(c => newSelection.includes(c));
      if (isSuccess) {
        setTimeout(() => {
            alert(`Doğru! Seviye ${level} tamamlandı. Sonraki seviyeye geçiliyor.`);
            setLevel(prev => Math.min(prev + 1, 8));
            setActiveCells([]);
            setUserSelection([]);
        }, 300);
      } else {
        setTimeout(() => {
            alert('Hatalı seçim! Tekrar deneyin.');
            setUserSelection([]);
        }, 300);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-lg mx-auto">
      <div className="text-center">
          <h3 className="text-xl font-bold text-slate-800">Çalışma Belleği (N-Back)</h3>
          <p className="text-slate-500 text-sm mt-1">Yanan karelerin yerini hafızanızda tutun ve sırayla seçin.</p>
      </div>
      <div className="flex justify-between w-full items-center">
          <span className="font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">Seviye: {level}</span>
          <button onClick={startRound} disabled={isMemorizing} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl disabled:opacity-50 hover:bg-indigo-500">
            {activeCells.length > 0 ? (isMemorizing ? 'Ezberle...' : 'Seçim Yapın') : 'Etabı Başlat'}
          </button>
      </div>
      <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        {Array.from({ length: 16 }).map((_, idx) => {
          const isHighlighted = isMemorizing && activeCells.includes(idx);
          const isSelected = userSelection.includes(idx);
          
          let cellStyle = 'bg-white shadow-sm border-2 border-slate-100 hover:border-indigo-300';
          if (isHighlighted) cellStyle = 'bg-indigo-500 border-indigo-600 scale-105 shadow-md shadow-indigo-200';
          else if (isSelected) {
            // Check if it's correct or wrong immediately? Usually we just show selected.
            cellStyle = activeCells.includes(idx) ? 'bg-emerald-400 border-emerald-500' : 'bg-rose-400 border-rose-500';
          }

          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl transition-all ${cellStyle}`}
            />
          );
        })}
      </div>
    </div>
  );
};
