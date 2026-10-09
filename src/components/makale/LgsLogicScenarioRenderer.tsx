import React from 'react';
import { Compass, BookOpen, Users, Layers, Sparkles } from 'lucide-react';
import { LgsQuestion } from '../../data/lgsMebiAnd2026Data';

interface LgsLogicScenarioRendererProps {
  question: LgsQuestion;
  compact?: boolean;
}

export function LgsLogicScenarioRenderer({ question, compact = false }: LgsLogicScenarioRendererProps) {
  const ls = question.logicScenario;

  // Extract items & rules from logicScenario or fallback to tableOrPremises
  let items: string[] = ls?.items ? [...ls.items] : [];
  let rules: string[] = ls?.rules ? [...ls.rules] : question.tableOrPremises ? [...question.tableOrPremises] : [];
  let ruleIntro: string | undefined = ls?.ruleIntro;
  let itemsTitle: string = ls?.itemsTitle || '';

  // Filter out any rule that is actually an introductory headline
  const cleanedRules: string[] = [];
  for (const raw of rules) {
    const trimmed = raw.trim().replace(/^[-•*]\s*/, '');
    if (!trimmed) continue;

    const introMatch = trimmed.match(/^(?:.*?\n)?(Diziliş kuralları[^\n:]*|Yerleşimle ilgili[^\n:]*|Stantların[^\n:]*|Yerleştirme kuralları[^\n:]*|Bilinenler[^\n:]*|Kurallar[^\n:]*|Koşullar[^\n:]*):?$/i);
    if (introMatch) {
      if (!ruleIntro) {
        ruleIntro = introMatch[1].trim();
      }
      continue;
    }
    cleanedRules.push(trimmed);
  }
  rules = cleanedRules;

  // Heuristic safety net: If logicScenario is missing or items is empty, parse from raw premises if mixed
  if (items.length === 0 && rules.length > 0) {
    const extractedItems: string[] = [];
    const extractedRules: string[] = [];
    let splitFound = false;

    for (let i = 0; i < rules.length; i++) {
      const r = rules[i].trim();
      const transMatch = r.match(/^(.*?)(Diziliş kuralları[^\n]*|Yerleşimle ilgili[^\n]*|Stantların[^\n]*|Yerleştirme kuralları[^\n]*|Bilinenler[^\n]*|Kurallar[^\n]*|Koşullar[^\n]*)/i);

      if (transMatch && !splitFound) {
        splitFound = true;
        const itemBefore = transMatch[1].trim();
        if (itemBefore) extractedItems.push(itemBefore);
        if (!ruleIntro) ruleIntro = transMatch[2].trim();
      } else if (!splitFound) {
        const isEntity = /^[A-ZÇĞİÖŞÜ][\w\sÇĞİÖŞÜçğıöşü\.]*?\([A-Za-z0-9\.]+\)$/.test(r) ||
          /^[A-ZÇĞİÖŞÜ]:\s+[A-ZÇĞİÖŞÜ]/.test(r) ||
          (!r.includes('solundadır') && !r.includes('sağındadır') && !r.includes('değildir') && !r.includes('önce') && !r.includes('sonra') && !r.includes('arasında') && !r.includes('yanında') && !r.includes('bitirmiştir') && !r.includes('seçmiştir') && r.length < 32);
        
        if (isEntity) {
          const cleanedItem = r.replace(/^[A-ZÇĞİÖŞÜ]:\s*/, '').trim();
          extractedItems.push(cleanedItem);
        } else {
          extractedRules.push(r);
        }
      } else {
        extractedRules.push(r);
      }
    }

    if (extractedItems.length >= 2 && extractedRules.length >= 2) {
      items = extractedItems;
      rules = extractedRules;
    }
  }

  // If items is still empty, scan question context for entity names or list items
  if (items.length === 0 && question.context) {
    const namesMatch = question.context.match(/(?:öğrencileri|kişiler|arkadaşlar|isimli\s+\w+|katılan)?\s*olan\s+([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s*,\s*[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)+(?:\s+ve\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+))/i) ||
      question.context.match(/([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s*,\s*[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)+(?:\s+ve\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+))\s+(?:isimli|adlı|adındaki|ilk)/i);
    
    if (namesMatch) {
      const full = namesMatch[1];
      const parsed = full.replace(/\s+ve\s+/g, ', ').split(',').map(s => s.trim()).filter(Boolean);
      if (parsed.length >= 3) {
        items = parsed;
        itemsTitle = 'Katılımcı Kişiler / Öğrenciler';
      }
    }
  }

  // Clean any remaining rules that look like items or empty lines
  rules = rules.filter(r => r && r.trim().length > 0);

  // Clean up item titles if default or missing
  if (!itemsTitle && items.length > 0) {
    const contextLower = (question.context || '').toLowerCase();
    if (contextLower.includes('kitap') || contextLower.includes('roman')) {
      itemsTitle = 'Sıralanacak Romanlar & Kitap Türleri';
    } else if (contextLower.includes('öğrenci') || contextLower.includes('konuşma') || contextLower.includes('münazara') || contextLower.includes('sunum')) {
      itemsTitle = 'Katılımcı Kişiler & Konuşmacılar';
    } else if (contextLower.includes('atölye')) {
      itemsTitle = 'Sıralanacak STEM Atölyeleri';
    } else if (contextLower.includes('stant')) {
      itemsTitle = 'Sıralanacak Stantlar / Bölümler';
    } else if (contextLower.includes('ürün') || contextLower.includes('cihaz') || contextLower.includes('teknolojik')) {
      itemsTitle = 'Sıralanacak Teknolojik Ürünler';
    } else {
      itemsTitle = 'Sıralanacak Ögeler & Unsurlar';
    }
  }

  // Pick suitable icon for items
  const getItemsIcon = () => {
    const t = itemsTitle.toLowerCase();
    if (t.includes('kitap') || t.includes('roman')) return <BookOpen size={compact ? 13 : 15} className="text-indigo-600" />;
    if (t.includes('kişi') || t.includes('öğrenci') || t.includes('konuşmacı')) return <Users size={compact ? 13 : 15} className="text-indigo-600" />;
    return <Layers size={compact ? 13 : 15} className="text-indigo-600" />;
  };

  if (items.length === 0 && rules.length === 0) return null;

  return (
    <div className={`space-y-4 my-4 ${compact ? 'text-xs' : ''}`}>
      {/* ======================================================== */}
      {/* GRUP 1: SIRALANACAK / EŞLEŞTİRİLECEK ÖGELER (ENTITIES) */}
      {/* ======================================================== */}
      {items.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50/90 via-slate-50/90 to-blue-50/70 rounded-2xl border border-indigo-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                {getItemsIcon()}
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-indigo-950 uppercase tracking-wide">
                  {itemsTitle || 'Sıralanacak Ögeler / Unsurlar'}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Soru kurgusunda yerleştirilecek {items.length} temel unsur:
                </p>
              </div>
            </div>
            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shadow-2xs">
              {items.length} Öğe
            </span>
          </div>

          {/* Entity Grid: flexible, wraps cleanly, never truncated */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 pt-1">
            {items.map((item, itIdx) => {
              // Parse optional abbreviation e.g. "Macera (M)" -> name: "Macera", code: "M"
              // or "M: Macera" -> name: "Macera", code: "M"
              let cleanItem = item.replace(/^[A-ZÇĞİÖŞÜ0-9]+:\s*/, '').replace(/^\d+[\.\)]\s*/, '').trim();
              const codeMatch = cleanItem.match(/^(.*?)\s*\(([^)]+)\)$/);
              const name = codeMatch ? codeMatch[1].trim() : cleanItem;
              const code = codeMatch ? codeMatch[2].trim() : (name.length <= 3 ? name : null);

              return (
                <div 
                  key={itIdx}
                  className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-indigo-200/80 shadow-2xs group hover:border-indigo-400 hover:shadow-xs transition-all min-w-0"
                >
                  {code ? (
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {code}
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] flex items-center justify-center shrink-0">
                      {itIdx + 1}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 break-words leading-tight flex-1">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* GRUP 2: DİZİLİŞ KURALLARI & ÖNCÜLLER (RULES & CONDITIONS) */}
      {/* ======================================================== */}
      {rules.length > 0 && (
        <div className="bg-slate-50/90 rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-slate-200/70 text-slate-700">
                <Compass size={compact ? 14 : 16} className="text-indigo-600" />
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                  Diziliş Kuralları &amp; Öncüller
                </h4>
                {ruleIntro ? (
                  <p className="text-[11px] text-slate-600 font-semibold italic">
                    📌 {ruleIntro}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 font-medium">
                    Sıralama ve yerleştirmede geçerli olan kesin koşullar:
                  </p>
                )}
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
              {rules.length} Kural
            </span>
          </div>

          {/* Numbered Rule Cards: full width, spacious, never truncated */}
          <div className="space-y-2 pt-0.5">
            {rules.map((rule, rIdx) => (
              <div 
                key={rIdx} 
                className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 bg-white p-3 sm:p-3.5 rounded-xl border border-gray-200/90 shadow-2xs font-medium hover:border-indigo-300 hover:bg-slate-50/40 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200 shadow-2xs">
                  {rIdx + 1}
                </span>
                <span className="leading-relaxed flex-1 text-slate-800 font-medium break-words">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
