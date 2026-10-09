import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CheckCircle2, ChevronRight, Timer, Brain } from 'lucide-react';

const mockText = "Bugün hava çok güzel. Ormanda yürüyüşe çıkmak için harika bir gün. Kuşlar ötüyor ve güneş parlıyor. Hızlı okuma, göz kaslarımızı geliştirerek daha kısa sürede daha çok bilgi edinmemizi sağlar. Bunun için düzenli egzersiz yapmak çok önemlidir.";

export const InitialAssessment = ({ state, actions, onComplete }: any) => {
    const { currentUser } = state;
    const [step, setStep] = useState(0); // 0: Intro, 1: Reading, 2: Comprehension, 3: Attention, 4: Result
    const [startTime, setStartTime] = useState(0);
    const [readTime, setReadTime] = useState(0);
    const [compScore, setCompScore] = useState(0);
    const [attScore, setAttScore] = useState(0);

    const startReading = () => {
        setStartTime(Date.now());
        setStep(1);
    };

    const finishReading = () => {
        const timeSpent = (Date.now() - startTime) / 1000;
        setReadTime(timeSpent);
        setStep(2);
    };

    const finishComprehension = (score: number) => {
        setCompScore(score);
        setStep(3);
    };

    const finishAttention = async (score: number) => {
        setAttScore(score);
        
        // Calculate Level
        const wpm = Math.round((mockText.split(' ').length / readTime) * 60);
        let level = "Başlangıç";
        const totalPoints = (compScore * 0.5) + ((wpm / 300) * 100 * 0.3) + (score * 0.2);
        
        if (totalPoints > 85) level = "İleri";
        else if (totalPoints > 70) level = "İyi";
        else if (totalPoints > 50) level = "Orta";
        else if (totalPoints > 30) level = "Gelişiyor";

        try {
            await addDoc(collection(db, 'hizliOkumaProfiles'), {
                userId: currentUser.id,
                userName: currentUser.name || currentUser.username,
                level,
                initialWpm: wpm,
                initialComp: compScore,
                initialAtt: score,
                date: new Date().toISOString()
            });
        } catch(e) {
            console.error(e);
        }

        setStep(4);
    };

    if (step === 0) return (
        <div className="bg-white p-8 rounded-3xl text-center space-y-6 max-w-xl mx-auto border border-gray-100 shadow-sm mt-10">
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-800">Başlangıç Değerlendirmesi</h2>
            <p className="text-gray-500 font-medium">Hızlı okuma kursuna başlamadan önce seviyeni belirlememiz gerekiyor. Bu test 3 aşamadan oluşur: Okuma Hızı, Anlama ve Dikkat.</p>
            <button onClick={startReading} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Teste Başla</button>
        </div>
    );

    if (step === 1) return (
        <div className="bg-white p-8 rounded-3xl max-w-2xl mx-auto border border-gray-100 shadow-sm mt-10 space-y-6">
            <div className="flex justify-between items-center text-gray-400 font-bold text-sm">
                <span>Aşama 1: Hızlı Okuma</span>
                <span className="flex items-center gap-1"><Timer size={16}/> Süre İşliyor</span>
            </div>
            <div className="text-xl leading-relaxed text-gray-700 font-medium p-6 bg-gray-50 rounded-2xl">
                {mockText}
            </div>
            <button onClick={finishReading} className="w-full bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-colors text-lg">Okumayı Bitirdim</button>
        </div>
    );

    if (step === 2) return (
        <div className="bg-white p-8 rounded-3xl max-w-xl mx-auto border border-gray-100 shadow-sm mt-10 space-y-6 text-center">
            <h3 className="text-xl font-black">Aşama 2: Anlama Testi</h3>
            <p className="text-gray-600">Metinde neyden bahsediliyordu?</p>
            <div className="space-y-3">
                <button onClick={() => finishComprehension(100)} className="w-full p-4 border rounded-xl hover:bg-blue-50 font-semibold">Orman yürüyüşü ve hızlı okumanın faydaları</button>
                <button onClick={() => finishComprehension(50)} className="w-full p-4 border rounded-xl hover:bg-blue-50 font-semibold">Sadece kuşlar</button>
                <button onClick={() => finishComprehension(0)} className="w-full p-4 border rounded-xl hover:bg-blue-50 font-semibold">Matematik problemleri</button>
            </div>
        </div>
    );

    if (step === 3) return (
        <div className="bg-white p-8 rounded-3xl max-w-xl mx-auto border border-gray-100 shadow-sm mt-10 space-y-6 text-center">
            <h3 className="text-xl font-black">Aşama 3: Dikkat Testi</h3>
            <p className="text-gray-600">Farklı olanı bul</p>
            <div className="grid grid-cols-4 gap-4 text-3xl">
                <div>🍎</div><div>🍎</div><div>🍎</div><div>🍎</div>
                <div>🍎</div><div className="cursor-pointer" onClick={() => finishAttention(100)}>🍅</div><div>🍎</div><div>🍎</div>
                <div>🍎</div><div>🍎</div><div>🍎</div><div>🍎</div>
            </div>
        </div>
    );

    return (
        <div className="bg-white p-8 rounded-3xl max-w-xl mx-auto border border-gray-100 shadow-sm mt-10 space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-800">Test Tamamlandı!</h2>
            <p className="text-gray-500 font-medium">Seviyen belirlendi ve sisteme kaydedildi. Artık çalışmalara başlayabilirsin.</p>
            <button onClick={() => onComplete("Başlangıç")} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Panele Git</button>
        </div>
    );
};
