import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, ChevronRight, Activity, Target, BookOpen, AlertCircle, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminMakalePanelProps {
    state: any;
    actions: any;
}

export function AdminMakalePanel({ state, actions }: AdminMakalePanelProps) {
    const [activeTab, setActiveTab] = useState<'upload' | 'analytics'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const res = await fetch('/api/parse-question', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setParsedData(data);
        } catch (error) {
            console.error(error);
            // Fallback mock if API fails
            setParsedData({
                questionText: "Yapay zeka, modern eğitim sistemlerinde giderek daha fazla rol oynamaktadır. Bireyselleştirilmiş öğrenme yolları sunarak, öğrencilerin kendi hızlarında ilerlemelerine olanak tanır. Ancak, öğretmen-öğrenci etkileşiminin yerini tamamen alması beklenmemektedir.",
                questionStem: "Bu metne göre aşağıdakilerden hangisi çıkarılamaz?",
                options: [
                    { letter: "A", text: "Yapay zeka eğitime entegre olmaktadır.", type: "Doğru Cevap" },
                    { letter: "B", text: "Öğrenciler kendi hızlarında öğrenebilir.", type: "Kapsam Aşımı" },
                    { letter: "C", text: "Öğretmenlerin yerini tamamen yapay zeka alacaktır.", type: "Ters Mantık" },
                    { letter: "D", text: "Eğitim sistemleri teknolojiye uyum sağlamaktadır.", type: "Çeldirici" }
                ]
            });
        }
        setIsUploading(false);
    };

    const renderUpload = () => (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Upload className="text-indigo-600" /> Soru & Metin Yükleme (OCR/AI)
                </h3>
                
                {!parsedData ? (
                    <div className="space-y-6">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-700 mb-1">
                                {file ? file.name : "Belge Yükleyin (PDF, DOCX)"}
                            </h4>
                            <p className="text-slate-500 text-sm">
                                Akıllı Şablon sistemi, metni ve şıkları otomatik ayırır, çeldirici türlerini etiketler.
                            </p>
                        </div>

                        {file && (
                            <button 
                                onClick={handleUpload} 
                                disabled={isUploading}
                                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isUploading ? 'Yapay Zeka Analiz Ediyor...' : 'Ayrıştır ve Etiketle'}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" /> Başarıyla ayrıştırıldı. Lütfen çeldiricileri kontrol edip onaylayın.
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Soru Metni / Paragraf</label>
                                <textarea 
                                    defaultValue={parsedData.questionText}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 h-32"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Soru Kökü</label>
                                <input 
                                    type="text" 
                                    defaultValue={parsedData.questionStem}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <label className="block text-sm font-bold text-slate-600">Şıklar ve Çeldirici Etiketleri</label>
                                {parsedData.options.map((opt: any, i: number) => (
                                    <div key={i} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700">
                                            {opt.letter}
                                        </div>
                                        <input 
                                            type="text" 
                                            defaultValue={opt.text}
                                            className="flex-1 bg-transparent outline-none font-medium text-slate-700"
                                        />
                                        <select 
                                            defaultValue={opt.type}
                                            className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-indigo-700 outline-none"
                                        >
                                            <option value="Doğru Cevap">Doğru Cevap</option>
                                            <option value="Kapsam Aşımı">Kapsam Aşımı</option>
                                            <option value="Ters Mantık">Ters Mantık</option>
                                            <option value="Alakasız">Alakasız</option>
                                            <option value="Çelişkili">Çelişkili</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-slate-100">
                            <button onClick={() => setParsedData(null)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                İptal Et
                            </button>
                            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> Öğrencilere Ata (LGS Antrenörü)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Sınıf Hata Analizi (Çeldirici Türlerine Göre)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-500 mb-1">En Sık Düşülen Hata</h4>
                    <p className="text-xl font-black text-slate-800">Ters Mantık (%42)</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-500 mb-1">İkinci Sık Hata</h4>
                    <p className="text-xl font-black text-slate-800">Kapsam Aşımı (%28)</p>
                </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-6">
                <h4 className="font-bold text-lg text-slate-800 mb-6">Öğrenci Bazlı Telafi (Kurtarma Görevleri) Önerileri</h4>
                <div className="space-y-4">
                    {['Ahmet Yılmaz', 'Zeynep Kaya', 'Can Demir'].map((student, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                                    {student.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">{student}</div>
                                    <div className="text-sm text-slate-500">Zayıf Nokta: Sözel Mantık Tablolama</div>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-indigo-600 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                                Görev Ata
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 h-full p-2">
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setActiveTab('upload')}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors \${activeTab === 'upload' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    <Upload className="w-5 h-5" /> Soru Yükle & Etiketle
                </button>
                <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors \${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    <Activity className="w-5 h-5" /> Çeldirici Analizi
                </button>
            </div>
            
            {activeTab === 'upload' ? renderUpload() : renderAnalytics()}
        </div>
    );
}
