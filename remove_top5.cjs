const fs = require('fs');
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

// The block to remove:
const statsAndTop5 = `  const studentStats = schoolPortfolios.map((student: any) => {
    const bLogs = student.behaviorLog || [];
    let yesil = 0, sari = 0, kirmizi = 0;
    bLogs.forEach((log: any) => {
      if (!log.isDeleted) {
        if (log.card === 'white') yesil += Math.abs(Number(log.score) || 0);
        if (log.card === 'yellow') sari += Math.abs(Number(log.score) || 0);
        if (log.card === 'red') kirmizi += Math.abs(Number(log.score) || 0);
      }
    });
    return { fullName: student.fullName, yesil, sari, kirmizi };
  });

  const topYesil = [...studentStats].sort((a,b) => b.yesil - a.yesil).slice(0, 5).filter(s => s.yesil > 0);
  const topSari = [...studentStats].sort((a,b) => b.sari - a.sari).slice(0, 5).filter(s => s.sari > 0);
  const topKirmizi = [...studentStats].sort((a,b) => b.kirmizi - a.kirmizi).slice(0, 5).filter(s => s.kirmizi > 0);

  const renderTop5 = () => (
    <div className="mt-8 animate-in fade-in">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Award className="text-blue-600" size={24} />
          Davranış Notu Öne Çıkanlar (İlk 5)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Yeşil Kart */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
             <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                 <h4 className="font-bold text-emerald-800 flex items-center gap-2"><Award size={18} /> YEŞİL KART</h4>
             </div>
             <div className="p-4 space-y-2">
                 {topYesil.length > 0 ? topYesil.map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-sm p-2 hover:bg-emerald-50 rounded-xl transition-colors">
                       <span className="font-semibold text-gray-700">{i + 1}. {s.fullName}</span>
                       <span className="font-black text-emerald-600">{s.yesil} Puan</span>
                    </div>
                 )) : <div className="text-sm text-gray-400 text-center py-4 italic">Kayıt Yok</div>}
             </div>
          </div>
          {/* Sarı Kart */}
          <div className="bg-white rounded-3xl border border-yellow-100 shadow-sm overflow-hidden">
             <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
                 <h4 className="font-bold text-yellow-800 flex items-center gap-2"><AlertTriangle size={18} /> SARI KART</h4>
             </div>
             <div className="p-4 space-y-2">
                 {topSari.length > 0 ? topSari.map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-sm p-2 hover:bg-yellow-50 rounded-xl transition-colors">
                       <span className="font-semibold text-gray-700">{i + 1}. {s.fullName}</span>
                       <span className="font-black text-yellow-600">{-s.sari} Puan</span>
                    </div>
                 )) : <div className="text-sm text-gray-400 text-center py-4 italic">Kayıt Yok</div>}
             </div>
          </div>
          {/* Kırmızı Kart */}
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
             <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                 <h4 className="font-bold text-red-800 flex items-center gap-2"><AlertOctagon size={18} /> KIRMIZI KART</h4>
             </div>
             <div className="p-4 space-y-2">
                 {topKirmizi.length > 0 ? topKirmizi.map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-sm p-2 hover:bg-red-50 rounded-xl transition-colors">
                       <span className="font-semibold text-gray-700">{i + 1}. {s.fullName}</span>
                       <span className="font-black text-red-600">{-s.kirmizi} Puan</span>
                    </div>
                 )) : <div className="text-sm text-gray-400 text-center py-4 italic">Kayıt Yok</div>}
             </div>
          </div>
      </div>
    </div>
  );`;

code = code.replace(statsAndTop5, '');
code = code.replace('{renderTop5()}', '');

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
