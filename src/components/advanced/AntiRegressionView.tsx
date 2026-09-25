import React, { useState } from 'react';
import { AntiRegressionReader } from './AntiRegressionReader';

export const AntiRegressionView = () => {
  const [text, setText] = useState("Hızlı okumada geriye dönüşler en büyük zaman kaybıdır. Bu egzersiz geriye dönme alışkanlığınızı silinen kelimelerle kırar.");
  const [wpm, setWpm] = useState(250);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <h2 className="text-2xl font-bold mb-4">Anti-Regression (Kaybolan Metin)</h2>
      <p className="mb-4 text-slate-500">Geriye dönüşleri engellemek için kelimeler okundukça silinir.</p>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1">Okuma Hızı (WPM)</label>
          <input type="number" value={wpm} onChange={e => setWpm(Number(e.target.value))} className="w-full p-3 border rounded-xl" />
        </div>
      </div>

      <textarea 
        className="w-full p-4 border rounded-xl mb-4 h-32"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Okunacak metni buraya girin..."
      />
      <AntiRegressionReader text={text} wpm={wpm} mode="hide" />
    </div>
  );
};
