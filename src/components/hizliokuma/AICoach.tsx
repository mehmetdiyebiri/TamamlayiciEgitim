import React from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';

export const AICoach = ({ state, actions }: any) => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <BrainCircuit className="text-cyan-600" /> Yapay Zeka Koçu
            </h3>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border border-cyan-100 relative overflow-hidden shadow-inner">
                <Sparkles className="absolute top-4 right-4 text-cyan-200" size={64} />
                <div className="relative z-10 space-y-4">
                    <p className="font-bold text-gray-800 text-lg">Merhaba!</p>
                    <p className="text-gray-700 font-medium leading-relaxed">
                        Son test sonuçlarını inceledim. Okuma hızın 240 WPM'e yükselmiş, bu harika bir gelişme! 
                        Ancak anlama oranında (%60) hafif bir düşüş gözlemledim. Hızlanırken anlam bütünlüğünü 
                        kaybetmemek çok önemlidir.
                    </p>
                    <p className="text-gray-700 font-medium leading-relaxed">
                        Önümüzdeki 3 gün boyunca <strong className="text-cyan-700">"Gruplama Çalışması"na</strong> ağırlık vermeni 
                        öneriyorum. Blok okuma yaparken kümeleri genişletmek, anlamı korumana yardımcı olacaktır. 
                        Ayrıca göz kaslarını güçlendirmek için her sabah 2 dakika <strong className="text-cyan-700">Dairesel Odak</strong> egzersizi yapmalısın.
                        Harika gidiyorsun, aynen devam!
                    </p>
                    
                    <button 
                        onClick={() => actions.setActiveTab && actions.setActiveTab('grouping')}
                        className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-cyan-700 transition-colors shadow-sm"
                    >
                        Önerilen Çalışmaya Git
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-gray-800">240</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Son Hız</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-gray-800">%60</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Son Anlama</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-black text-gray-800">+12</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Gelişim Puanı</div>
                </div>
            </div>
        </div>
    );
};
