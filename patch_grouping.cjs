const fs = require('fs');
const file = 'src/components/hizliokuma/Grouping.tsx';
let content = fs.readFileSync(file, 'utf-8');

const search = `import React, { useState, useEffect, useRef } from 'react';
import { List, Play, Pause, RotateCcw, Settings, FileText, Info } from 'lucide-react';

const HAZIR_METIN = \`Hızlı okuma eğitimleri sayesinde bireyler sadece okuma hızlarını artırmakla kalmaz, aynı zamanda okuduklarını daha iyi anlama becerisi de geliştirirler. Bu eğitimlerde öğretilen teknikler sayesinde kelimeleri tek tek okumak yerine anlam kümeleri halinde gruplayarak okumak mümkün hale gelir. Bu da hem zaman kazandırır hem de dikkati artırır. Gözlerimiz okuma esnasında metin üzerinde kaymaz, sıçramalar yaparak ilerler. Her sıçramada bir duraklama yaşanır ve beynimiz kelimeleri bu duraklamalar esnasında algılar. Eğer her kelimede duraklama yaparsak okuma hızımız oldukça düşer. Ancak her duraklamada iki, üç veya daha fazla kelimeyi aynı anda görebilirsek, okuma hızımız katlanarak artar. Bu beceriyi kazanmak için göz kaslarını eğitmek ve görme alanını genişletmek gerekir.\`;

export const Grouping = ({ state, actions }: any) => {
    const [textSource, setTextSource] = useState<'hazir' | 'ozel'>('hazir');
    const [customText, setCustomText] = useState('');`;

const replacement = `import React, { useState, useEffect, useRef } from 'react';
import { List, Play, Pause, RotateCcw, Settings, FileText, Info } from 'lucide-react';
import { testTexts } from './speedReadingTexts';

export const Grouping = ({ state, actions }: any) => {
    const [textSource, setTextSource] = useState<'hazir' | 'ozel'>('hazir');
    const [selectedTextIndex, setSelectedTextIndex] = useState(0);
    const [customText, setCustomText] = useState('');`;

content = content.replace(search, replacement);

const search2 = `    const activeText = textSource === 'hazir' ? HAZIR_METIN : (customText || 'Lütfen metin giriniz...');`;
const replacement2 = `    const activeText = textSource === 'hazir' ? testTexts[selectedTextIndex].text : (customText || 'Lütfen metin giriniz...');`;

content = content.replace(search2, replacement2);

const search3 = `                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Metin Kaynağı</label>
                        <select 
                            value={textSource} 
                            onChange={(e) => setTextSource(e.target.value as any)} 
                            className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                        >
                            <option value="hazir">Hazır Metin</option>
                            <option value="ozel">Kendi Metnini Yükle</option>
                        </select>
                    </div>`;

const replacement3 = `                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Metin Kaynağı</label>
                        <div className="flex flex-col gap-2">
                            <select 
                                value={textSource} 
                                onChange={(e) => setTextSource(e.target.value as any)} 
                                className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                            >
                                <option value="hazir">Hazır Metin</option>
                                <option value="ozel">Kendi Metnini Yükle</option>
                            </select>
                            {textSource === 'hazir' && (
                                <select 
                                    value={selectedTextIndex} 
                                    onChange={(e) => setSelectedTextIndex(Number(e.target.value))} 
                                    className="w-full bg-white p-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-purple-500"
                                >
                                    {testTexts.map((t, i) => (
                                        <option key={i} value={i}>{t.title}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>`;

content = content.replace(search3, replacement3);

// We must also add selectedTextIndex to the reset useEffect:
const search4 = `    useEffect(() => {
        setIsPlaying(false);
        setCurrentIndex(-1);
    }, [textSource, customText, level, wordCount, mode]);`;

const replacement4 = `    useEffect(() => {
        setIsPlaying(false);
        setCurrentIndex(-1);
    }, [textSource, selectedTextIndex, customText, level, wordCount, mode]);`;

content = content.replace(search4, replacement4);

fs.writeFileSync(file, content);
console.log('Patched Grouping.tsx');
