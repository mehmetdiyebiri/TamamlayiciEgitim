import React, { useState } from 'react';
import { Timer, Zap, BarChart2 } from 'lucide-react';

import { testTexts } from './speedReadingTexts';


export const SpeedReadingTest = ({ state, actions }: any) => {
    const [status, setStatus] = useState('idle'); // idle, reading, comprehension, result
    const [selectedText, setSelectedText] = useState(testTexts[0]);
    const [startTime, setStartTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [compScore, setCompScore] = useState(0);

    const startTest = () => {
        setStartTime(Date.now());
        setStatus('reading');
    };

    const finishReading = () => {
        const timeInMins = (Date.now() - startTime) / 60000;
        const calculatedWpm = Math.round(selectedText.words / timeInMins);
        setWpm(calculatedWpm);
        setStatus('comprehension');
    };

    const finishComprehension = (score: number) => {
        setCompScore(score);
        setStatus('result');
    };

    if (status === 'idle') return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="text-center space-y-4 border-b border-gray-100 pb-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">HIZLI OKUMA TESTİ</h3>
                <p className="text-gray-600 font-medium">Bu sayfa okuma hızınızı ölçme amacıyla oluşturulmuştur. Hızlı okuma testi 2 farklı kütüphane üzerinde 93 farklı metin içermektedir, dilediğiniz metni seçerek okuma hızınızı ölçebilirsiniz. Okuma hızınız metin konusuna ve içeriğine bağlı olarak değişiklik gösterebilir. Okuma hızınızı ölçmek için "Okuma Testini Başlat" butonuna tıklayın. Gösterilen metini okumaya başlayın ve okumanız bittiğinde "Okuma Testini Bitir" butonuna tıklayarak sonucunuzu görüntüleyin.</p>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-600 block mb-2">Metin Seçimi</label>
                    <select className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-100 outline-none" onChange={(e) => setSelectedText(testTexts[parseInt(e.target.value)])}>
                        {testTexts.map((t, idx) => <option key={idx} value={idx}>{t.title} ({t.words} kelime)</option>)}
                    </select>
                </div>
                <div className="relative h-64 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white opacity-50 blur-sm pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><text y=%2220%22 font-size=%2214%22 fill=%22%23cbd5e1%22>Lorem ipsum dolor sit amet...</text><text y=%2240%22 font-size=%2214%22 fill=%22%23cbd5e1%22>consectetur adipiscing elit...</text></svg>')" }}></div>
                    <button onClick={startTest} className="z-10 bg-blue-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
                        Okuma Testini Başlat
                    </button></div>
            </div>
        </div>
    );

    if (status === 'reading') return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center text-gray-400 font-bold text-sm border-b pb-4">
                <span>{selectedText.title}</span>
                <span className="flex items-center gap-1 text-red-500 animate-pulse"><Timer size={16}/> Kronometre Çalışıyor</span>
            </div>
            <div className="text-lg md:text-xl leading-loose text-gray-700 font-medium">
                {selectedText.text}
            </div>
            <button onClick={finishReading} className="w-full bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-colors text-lg">Bitir (Süreyi Durdur)</button>
        </div>
    );

    if (status === 'comprehension') return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-center mb-6">Anlama Testi</h3>
            <div className="space-y-4 max-w-lg mx-auto">
                <p className="font-semibold text-gray-700 text-lg mb-4 text-center">Metnin ana düşüncesi nedir?</p>
                <button onClick={() => finishComprehension(100)} className="w-full p-4 border rounded-xl hover:bg-blue-50 font-medium text-left">Genel bir ana düşünce cümlesi</button>
                <button onClick={() => finishComprehension(50)} className="w-full p-4 border rounded-xl hover:bg-blue-50 font-medium text-left">Sadece ufak bir detayı anlatan cümle</button>
                <button onClick={() => finishComprehension(0)} className="w-full p-4 border rounded-xl hover:bg-blue-50 font-medium text-left">Konuyla ilgisi olmayan cümle</button>
            </div>
        </div>
    );

    const perfScore = Math.round((wpm / 300) * 100 * 0.7 + compScore * 0.3);

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-800">Test Sonuçları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-2">Okuma Hızı</div>
                    <div className="text-4xl font-black text-blue-700">{wpm}</div>
                    <div className="text-sm text-blue-600 font-medium mt-1">Kelime / Dakika</div>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="text-emerald-500 text-sm font-bold uppercase tracking-wider mb-2">Anlama Oranı</div>
                    <div className="text-4xl font-black text-emerald-700">%{compScore}</div>
                    <div className="text-sm text-emerald-600 font-medium mt-1">Başarı</div>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <div className="text-purple-500 text-sm font-bold uppercase tracking-wider mb-2">Performans</div>
                    <div className="text-4xl font-black text-purple-700">{perfScore}</div>
                    <div className="text-sm text-purple-600 font-medium mt-1">Puan</div>
                </div>
            </div>

            <button onClick={() => setStatus('idle')} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Yeni Test Yap</button>
        </div>
    );
};
