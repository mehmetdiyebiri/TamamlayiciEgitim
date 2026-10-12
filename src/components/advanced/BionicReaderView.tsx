import React, { useState } from 'react';
import { BionicReader } from './BionicReader';

export const BionicReaderView = () => {
  const [text, setText] = useState("Beyin bir kelimeyi okurken tüm harfleri eşit incelemez; kelimenin uzunluğuna göre sol çeyreğinde yer alan bir harfe odaklanarak kelimenin tamamını tahmin eder.");
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <h2 className="text-2xl font-bold mb-4">Bionic / ORP Motoru</h2>
      <p className="mb-4 text-slate-500">Metninizi aşağıya yapıştırın ve Bionic okuma formatında okuyun.</p>
      <textarea 
        className="w-full p-4 border rounded-xl mb-4 h-32"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Okunacak metni buraya girin..."
      />
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        <BionicReader content={text} />
      </div>
    </div>
  );
};
