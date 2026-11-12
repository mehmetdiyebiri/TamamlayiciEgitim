import React, { useState } from 'react';
import { SchulteGrid } from './SchulteGrid';

export const SchulteView = () => {
  const [size, setSize] = useState(5);
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
      <h2 className="text-2xl font-bold mb-2">Schulte Tablosu</h2>
      <p className="mb-6 text-slate-500">Gözlerinizi ortadaki kırmızı noktadan ayırmadan sayıları sırasıyla çevresel görüşünüzle bulun.</p>
      
      <div className="flex justify-center gap-2 mb-6">
        {[3,4,5,6].map(s => (
          <button 
            key={s} 
            onClick={() => setSize(s)}
            className={`px-4 py-2 rounded-lg font-bold ${size === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {s}x{s}
          </button>
        ))}
      </div>
      
      <SchulteGrid size={size} />
    </div>
  );
};
