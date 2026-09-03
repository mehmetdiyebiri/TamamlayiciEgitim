import React, { useState, useEffect } from 'react';
import { BookOpen, Activity, Target, BrainCircuit, PlayCircle, BarChart3, ChevronRight, Zap, CheckCircle2, RotateCcw, List, Search, Eye, Maximize, Layers, Grid3X3 } from 'lucide-react';
import { collection, addDoc, doc, setDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { InitialAssessment } from './hizliokuma/InitialAssessment';
import { SpeedReadingTest } from './hizliokuma/SpeedReadingTest';
import { BlockReading } from './hizliokuma/BlockReading';
import { Grouping } from './hizliokuma/Grouping';
import { Tachistoscope } from './hizliokuma/Tachistoscope';
import { EyeExercises } from './hizliokuma/EyeExercises';
import { SmartCourse } from './hizliokuma/SmartCourse';
import { AICoach } from './hizliokuma/AICoach';
import { ParentReport } from './hizliokuma/ParentReport';
import { VisionExercises } from './hizliokuma/VisionExercises';
import { AttentionExercises } from './hizliokuma/AttentionExercises';
import { ShadowReading } from './hizliokuma/ShadowReading';

// Advanced
import { BionicReaderView } from './advanced/BionicReaderView';
import { AntiRegressionView } from './advanced/AntiRegressionView';
import { SchulteView } from './advanced/SchulteView';
import { PdfReaderView } from './advanced/PdfReaderView';
import { WorkingMemoryGrid } from './advanced/WorkingMemoryGrid';
import { FatigueDetector } from './hizliokuma/FatigueDetector';

export const StudentHizliOkumaPanel = ({ state, actions }: any) => {
    const { currentUser } = state;
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Enrich actions with setActiveTab so subcomponents can navigate
    const enrichedActions = {
        ...actions,
        setActiveTab
    };

    const [initialLevel, setInitialLevel] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const q = query(collection(db, 'hizliOkumaProfiles'), where('userId', '==', currentUser.id));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    setInitialLevel(snap.docs[0].data().level);
                }
            } catch (err) {
                console.error("Profil alınamadı", err);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, [currentUser.id]);

    if (isLoading) return <div className="p-8 text-center">Yükleniyor...</div>;

    if (!initialLevel && activeTab !== 'initial_assessment') {
        return <InitialAssessment state={state} actions={enrichedActions} onComplete={(level) => {
            setInitialLevel(level);
            setActiveTab('dashboard');
        }} />;
    }

    const renderTab = () => {
        switch(activeTab) {
            case 'speed_test': return <SpeedReadingTest state={state} actions={enrichedActions} />;
            case 'block': return <BlockReading state={state} actions={enrichedActions} />;
            case 'grouping': return <Grouping state={state} actions={enrichedActions} />;
            case 'tachistoscope': return <Tachistoscope state={state} actions={enrichedActions} />;
            case 'eye_exercises': return <EyeExercises state={state} actions={enrichedActions} />;
            case 'smart_course': return <SmartCourse state={state} actions={enrichedActions} level={initialLevel} />;
            case 'ai_coach': return <AICoach state={state} actions={enrichedActions} />;
            case 'parent_report': return <ParentReport state={state} actions={enrichedActions} />;
            case 'vision_exercises': return <VisionExercises state={state} actions={enrichedActions} />;
            case 'attention_exercises': return <AttentionExercises state={state} actions={enrichedActions} />;
            case 'shadow_reading': return <ShadowReading state={state} actions={enrichedActions} />;
            case 'bionic': return <BionicReaderView />;
            case 'antiregression': return <AntiRegressionView />;
            case 'schulte': return <SchulteView />;
            case 'pdf_reader': return <PdfReaderView />;
            case 'working_memory': return <WorkingMemoryGrid />;
            default:
                return (
                    <div className="space-y-10">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><Zap className="text-amber-500" /> Temel Egzersizler</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <MenuCard title="Hızlı Okuma Testi" desc="Okuma hızını ve anlama oranını ölç." icon={<Zap />} onClick={() => setActiveTab('speed_test')} color="blue" />
                                <MenuCard title="Blok Okuma" desc="2-4 kelimelik gruplarla okuma çalışması." icon={<BookOpen />} onClick={() => setActiveTab('block')} color="indigo" />
                                <MenuCard title="Gölgeleme Çalışması" desc="Gölgeli metin üzerinde okuma pratikleri." icon={<Layers />} onClick={() => setActiveTab('shadow_reading')} color="indigo" />
                                <MenuCard title="Takistoskop" desc="Kelime tanıma hızını artır." icon={<Search />} onClick={() => setActiveTab('tachistoscope')} color="pink" />
                                <MenuCard title="Göz Egzersizleri" desc="13 Nokta, Zigzag, Kolonlar." icon={<Eye />} onClick={() => setActiveTab('eye_exercises')} color="emerald" />
                                <MenuCard title="Görme Alanı" desc="Karel, Kum Saati, Açılan Nesneler." icon={<Maximize />} onClick={() => setActiveTab('vision_exercises')} color="purple" />
                                <MenuCard title="Dikkat ve Odak" desc="Metin/Kelime Arama, Tek/Çift." icon={<Search />} onClick={() => setActiveTab('attention_exercises')} color="pink" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><BrainCircuit className="text-purple-500" /> Gelişmiş Algı Araçları</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <MenuCard title="Bionic / ORP Motoru" desc="Kelime odak noktaları ile hızlı algı." icon={<Zap />} onClick={() => setActiveTab('bionic')} color="purple" />
                                <MenuCard title="Schulte Tabloları" desc="Çevresel görüşü ve odağı maksimize et." icon={<Grid3X3 />} onClick={() => setActiveTab('schulte')} color="indigo" />
                                <MenuCard title="Hafıza Matrisi" desc="Kısa süreli çalışma belleğini geliştir." icon={<BrainCircuit />} onClick={() => setActiveTab('working_memory')} color="cyan" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><BookOpen className="text-emerald-500" /> İçerik Yükleyici & Pratik</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <MenuCard title="PDF Yükle ve Çalış" desc="Kendi PDF dosyalarınla pratik yap." icon={<Layers />} onClick={() => setActiveTab('pdf_reader')} color="emerald" />
                                <MenuCard title="Anti-Regression Okuyucu" desc="Geriye dönüşleri silinen metinle engelle." icon={<List />} onClick={() => setActiveTab('antiregression')} color="rose" />
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><Target className="text-rose-500" /> İlerleme ve Kurs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <MenuCard title="21 Günlük Kurs" desc="Seviyene özel otomatik çalışma programı." icon={<Target />} onClick={() => setActiveTab('smart_course')} color="orange" />
                                <MenuCard title="Yapay Zeka Koçu" desc="Sana özel analiz ve öneriler." icon={<BrainCircuit />} onClick={() => setActiveTab('ai_coach')} color="cyan" />
                                <MenuCard title="Gelişim ve Veli Raporu" desc="İlerlemeni gör, ailene rapor sun." icon={<BarChart3 />} onClick={() => setActiveTab('parent_report')} color="rose" />
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="p-6 md:p-8 animate-in fade-in space-y-6">
            <FatigueDetector />
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                    <Zap className="text-blue-500" size={28} />
                    <h2 className="text-2xl font-black text-gray-800">Hızlı Okuma Merkezi</h2>
                </div>
                {activeTab !== 'dashboard' && (
                    <button onClick={() => setActiveTab('dashboard')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm flex items-center gap-2">
                        <RotateCcw size={16} /> Geri Dön
                    </button>
                )}
            </div>
            {renderTab()}
        </div>
    );
};

const MenuCard = ({ title, desc, icon, onClick, color }: any) => {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 hover:border-blue-200',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100 hover:border-purple-200',
        pink: 'bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100 hover:border-pink-200',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 hover:border-orange-200',
        cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100 hover:border-cyan-200',
        rose: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 hover:border-rose-200',
    };

    return (
        <button onClick={onClick} className={`p-6 rounded-3xl border transition-all shadow-sm text-left group flex flex-col justify-between min-h-[160px] ${colors[color]}`}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h3 className="font-black text-lg mb-1">{title}</h3>
                <p className="text-sm opacity-80 font-medium leading-tight">{desc}</p>
            </div>
        </button>
    );
}

// Append FatigueDetector to StudentHizliOkumaPanel
// Wait, appending directly with cat won't work well in a TSX file because of exports. Let me just inject it into the return statement of StudentHizliOkumaPanel using sed.
