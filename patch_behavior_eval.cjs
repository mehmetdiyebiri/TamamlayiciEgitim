const fs = require('fs');
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

const renderNegativeStatus = `
  const renderNegativeStatus = () => {
    const studentStatusList = schoolPortfolios.map((student: any) => {
      const bLogs = student.behaviorLog || [];
      let totalScore = 0;
      bLogs.forEach((log: any) => {
        if (!log.isDeleted) {
          totalScore += Number(log.score) || 0;
        }
      });
      return { fullName: student.fullName, score: totalScore };
    });

    const group1 = studentStatusList.filter((s: any) => s.score <= -5 && s.score > -10);
    const group2 = studentStatusList.filter((s: any) => s.score <= -10 && s.score > -20);
    const group3 = studentStatusList.filter((s: any) => s.score <= -20 && s.score > -30);
    const group4 = studentStatusList.filter((s: any) => s.score <= -30 && s.score > -40);
    const group5 = studentStatusList.filter((s: any) => s.score <= -40);

    return (
      <div className="mt-8 animate-in fade-in">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <AlertOctagon className="text-red-600" size={24} />
            Davranış Takip Uyarı Listesi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden flex flex-col">
               <div className="bg-red-50 px-4 py-3 border-b border-red-100 text-center">
                   <h4 className="font-bold text-red-800 text-sm leading-tight">Sözlü Uyarı Alacaklar</h4>
                   <div className="text-[10px] text-red-600 font-bold opacity-70 mt-1">(-5 ile -10 Arası)</div>
               </div>
               <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-64">
                   {group1.length > 0 ? group1.map((s: any, i: number) => (
                      <div key={i} className="flex flex-col text-xs p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                         <span className="font-semibold text-gray-700">{s.fullName}</span>
                         <span className="font-black text-red-600">{s.score} Puan</span>
                      </div>
                   )) : <div className="text-xs text-gray-400 text-center py-2 italic">Öğrenci Yok</div>}
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden flex flex-col">
               <div className="bg-red-100 px-4 py-3 border-b border-red-200 text-center">
                   <h4 className="font-bold text-red-900 text-sm leading-tight">Öğrenci Sözleşmesi Yapılacaklar</h4>
                   <div className="text-[10px] text-red-700 font-bold opacity-70 mt-1">(-10 ile -20 Arası)</div>
               </div>
               <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-64">
                   {group2.length > 0 ? group2.map((s: any, i: number) => (
                      <div key={i} className="flex flex-col text-xs p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                         <span className="font-semibold text-gray-700">{s.fullName}</span>
                         <span className="font-black text-red-600">{s.score} Puan</span>
                      </div>
                   )) : <div className="text-xs text-gray-400 text-center py-2 italic">Öğrenci Yok</div>}
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-red-300 shadow-sm overflow-hidden flex flex-col">
               <div className="bg-red-200 px-4 py-3 border-b border-red-300 text-center">
                   <h4 className="font-bold text-red-900 text-sm leading-tight">Öğrenci-Veli-Okul Sözleşmesi</h4>
                   <div className="text-[10px] text-red-700 font-bold opacity-70 mt-1">(-20 ile -30 Arası)</div>
               </div>
               <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-64">
                   {group3.length > 0 ? group3.map((s: any, i: number) => (
                      <div key={i} className="flex flex-col text-xs p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                         <span className="font-semibold text-gray-700">{s.fullName}</span>
                         <span className="font-black text-red-600">{s.score} Puan</span>
                      </div>
                   )) : <div className="text-xs text-gray-400 text-center py-2 italic">Öğrenci Yok</div>}
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-red-400 shadow-sm overflow-hidden flex flex-col">
               <div className="bg-red-300 px-4 py-3 border-b border-red-400 text-center">
                   <h4 className="font-bold text-red-950 text-sm leading-tight">İdare Tarafından Son Uyarı</h4>
                   <div className="text-[10px] text-red-800 font-bold opacity-70 mt-1">(-30 ile -40 Arası)</div>
               </div>
               <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-64">
                   {group4.length > 0 ? group4.map((s: any, i: number) => (
                      <div key={i} className="flex flex-col text-xs p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                         <span className="font-semibold text-gray-700">{s.fullName}</span>
                         <span className="font-black text-red-700">{s.score} Puan</span>
                      </div>
                   )) : <div className="text-xs text-gray-400 text-center py-2 italic">Öğrenci Yok</div>}
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-red-500 shadow-sm overflow-hidden flex flex-col">
               <div className="bg-red-500 px-4 py-3 border-b border-red-600 text-center">
                   <h4 className="font-bold text-white text-sm leading-tight">Disiplin Kuruluna Yönlendirilecekler</h4>
                   <div className="text-[10px] text-red-100 font-bold opacity-90 mt-1">(-40 ve altı)</div>
               </div>
               <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-64">
                   {group5.length > 0 ? group5.map((s: any, i: number) => (
                      <div key={i} className="flex flex-col text-xs p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                         <span className="font-semibold text-gray-700">{s.fullName}</span>
                         <span className="font-black text-red-700">{s.score} Puan</span>
                      </div>
                   )) : <div className="text-xs text-gray-400 text-center py-2 italic">Öğrenci Yok</div>}
               </div>
            </div>
        </div>
      </div>
    );
  };
`;

code = code.replace(
  "  if (!selectedStudent) {",
  renderNegativeStatus + "\n  if (!selectedStudent) {"
);

code = code.replace(
  "        {renderTop5()}\n      </div>\n    );",
  "        {renderTop5()}\n        {renderNegativeStatus()}\n      </div>\n    );"
);

code = code.replace(
  "      {renderTop5()}\n    </div>\n  );",
  "      {renderTop5()}\n      {renderNegativeStatus()}\n    </div>\n  );"
);

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
