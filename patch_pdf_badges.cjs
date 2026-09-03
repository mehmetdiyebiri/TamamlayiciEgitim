const fs = require('fs');
let code = fs.readFileSync('src/components/DevCardPanel.tsx', 'utf-8');

const badgesPdfBlock = `                <div>
                   <h2 className="text-xl font-black text-gray-800 flex items-center gap-2 mb-6 uppercase tracking-wider">
                       <Award className="text-blue-500 fill-blue-500" size={20} /> KAZANILAN ROZETLER
                   </h2>
                   <div className="flex flex-wrap gap-2">
                       {(devCardConfig.manualBadges || []).map((badge: any, idx: number) => {
                           const hasBadge = devCardData.manualBadges?.includes(badge.id);
                           if (!hasBadge) return null;
                           return (
                               <div key={idx} className="bg-[#1e5cdc] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
                                   <Award size={16} /> {badge.name}
                               </div>
                           );
                       })}
                       {(!devCardData.manualBadges || devCardData.manualBadges.length === 0) && (
                           <div className="text-gray-400 text-sm font-medium">Henüz kazanılan rozet bulunmuyor.</div>
                       )}
                   </div>
                </div>

                <div>`;

code = code.replace("                <div>\n                   <h2 className=\"text-xl font-black text-gray-800 flex items-center gap-2 mb-6 uppercase tracking-wider\">\n                       <Activity className=\"text-blue-500\" size={20} /> AKTİVİTE GEÇMİŞİ\n                   </h2>", badgesPdfBlock + "\n                   <h2 className=\"text-xl font-black text-gray-800 flex items-center gap-2 mb-6 uppercase tracking-wider\">\n                       <Activity className=\"text-blue-500\" size={20} /> AKTİVİTE GEÇMİŞİ\n                   </h2>");

fs.writeFileSync('src/components/DevCardPanel.tsx', code);
