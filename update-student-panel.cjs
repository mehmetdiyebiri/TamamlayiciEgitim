const fs = require('fs');
let content = fs.readFileSync('src/components/makale/StudentMakalePanel.tsx', 'utf8');

const paragrafAndLogicCode = `
    const renderParagraf = () => {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Book className="text-indigo-600" /> Paragraf Okuma
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">Sınavlarda çıkan paragraf soru tipleri, anlatım biçimleri ve çeldirici analizi.</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold text-sm">Kur 1: Temel</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-bold text-sm">Ana Fikir Bulma</span>
                        </div>
                        <div className="text-sm font-bold text-slate-500">Soru 1 / 7</div>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 text-slate-700 leading-relaxed font-medium">
                        "İklim değişikliği, günümüzde sadece kutup ayılarını değil, hepimizi etkileyen küresel bir krizdir. Tarım alanlarının verimsizleşmesi, aşırı hava olayları ve su kaynaklarının tükenmesi doğrudan insan yaşamını tehdit etmektedir."
                    </div>

                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Bu metnin ana fikri aşağıdakilerden hangisidir?</h3>

                    <div className="space-y-3">
                        {['İklim değişikliği en çok kutup ayılarını etkilemektedir.', 'Küresel ısınma tarım alanlarını verimsizleştirir.', 'İklim değişikliği tüm insanlığı tehdit eden kapsamlı bir sorundur.', 'Su kaynaklarının tükenmesi aşırı hava olaylarına yol açar.'].map((opt, i) => (
                            <button key={i} className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors font-medium text-slate-700 flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 font-bold text-sm text-slate-600">{String.fromCharCode(65 + i)}</span>
                                <span>{opt}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-sm text-slate-500 font-medium">Bu kuru geçmek için en fazla 1 yanlış yapabilirsiniz.</p>
                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md">
                            Cevapla ve İlerle
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderSozelMantik = () => {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Brain className="text-indigo-600" /> Sözel Mantık Atölyesi
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">4 soruluk senaryolarla mantıksal çıkarım ve tablolama pratiği.</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg font-bold text-sm">Kur 2: Orta</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-bold text-sm">Sıralama / Yerleştirme</span>
                        </div>
                        <div className="text-sm font-bold text-slate-500">Bağlam 1 - Soru 1 / 4</div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-6 text-slate-700 leading-relaxed font-medium">
                        <strong>Bağlam:</strong> Bir müzik yarışmasına Ali, Burak, Can, Deniz ve Emre katılmıştır. Yarışmacıların sahneye çıkış sıralarıyla ilgili şunlar bilinmektedir:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Ali, Can'dan hemen sonra sahneye çıkmıştır.</li>
                            <li>Deniz 3. sırada sahneye çıkmıştır.</li>
                            <li>Burak son sırada sahneye çıkmamıştır.</li>
                        </ul>
                    </div>

                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Buna göre, Burak kaçıncı sırada sahneye çıkmış olabilir?</h3>

                    <div className="space-y-3">
                        {['Sadece 1', 'Sadece 2', '1 veya 4', '1, 2 veya 4'].map((opt, i) => (
                            <button key={i} className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-colors font-medium text-slate-700 flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 font-bold text-sm text-slate-600">{String.fromCharCode(65 + i)}</span>
                                <span>{opt}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-sm text-slate-500 font-medium">Bir sonraki soruya geçmeden önce bağlamı iyi analiz edin.</p>
                        <button className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-md">
                            Cevapla ve İlerle
                        </button>
                    </div>
                </div>
            </div>
        );
    };
`;

content = content.replace("case 'makale_okulu': return renderMakaleOkulu();", "case 'makale_okulu': return renderMakaleOkulu();\n            case 'paragraf': return renderParagraf();\n            case 'sozel_mantik': return renderSozelMantik();");
content = content.replace("const renderContent = () => {", paragrafAndLogicCode + "\n\n    const renderContent = () => {");

fs.writeFileSync('src/components/makale/StudentMakalePanel.tsx', content);
