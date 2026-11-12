import React, { useRef, useState } from 'react';
import { Trophy, Download, PlusCircle, Trash2, CheckCircle, Activity, Award, Star, Check, Loader2, Users, X } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const DevCardPanel = ({ state, actions }: any) => {
  const { selectedStudent, selectedClass, classes, devCardConfig, devCardData, newActivity, schoolPortfolios, users, assignments, hwProgress, classPerformances, currentUser } = state;
  const { setNewActivity, handleAddActivity, handleDeleteActivity, handleUpdateClassPerformances } = actions;
  
  const [activeSubTab, setActiveSubTab] = useState<'student' | 'class'>('student');
  const devCardRef = useRef<HTMLDivElement>(null);
  const pdfDevCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const MONTHS_LIST = [
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran'
  ];

  const getNextMonthName = (monthName: string): string => {
    const idx = MONTHS_LIST.findIndex(m => m.toLowerCase() === (monthName || '').toLowerCase());
    if (idx === -1) return 'Takip Eden Ay';
    if (idx === MONTHS_LIST.length - 1) return 'Yeni Dönem İlk Ay';
    return MONTHS_LIST[idx + 1];
  };

  const currentDefaultMonth = (() => {
    const mIdx = new Date().getMonth();
    const map: Record<number, string> = {
      8: 'Eylül',
      9: 'Ekim',
      10: 'Kasım',
      11: 'Aralık',
      0: 'Ocak',
      1: 'Şubat',
      2: 'Mart',
      3: 'Nisan',
      4: 'Mayıs',
      5: 'Haziran'
    };
    return map[mIdx] || 'Eylül';
  })();

  const [selectedPerfMonthFilter, setSelectedPerfMonthFilter] = useState<string>('ALL');
  const [rewardNoteInputs, setRewardNoteInputs] = useState<Record<string, string>>({});

  // Form state for Manual Class Performance (Aylık 5 Kategori)
  const [perfForm, setPerfForm] = useState({
     classId: '',
     period: currentDefaultMonth,
     cleanliness: 3,        // 1. Temiz Sınıf Puanı (1-3)
     bookScore: 3,          // 2. Kitap Puanı (1-3)
     behaviorScore: 5,      // 3. Davranış Puanı (1-5)
     academicScore: 2,      // 4. Akademik Süreç Takip Puanı (1-3, ilk deneme standart 2)
     academicMode: 'ilk_deneme' as 'ilk_deneme' | 'ortalama_ustu' | 'ortalama_alti' | 'manuel',
     competitions: 3,       // 5. Yarışma - Etkinlik Puanı (1-3)
     competitionRate: '%20' as '%10' | '%15' | '%20' | 'okul_ici' | 'manuel',
     schoolActivityScore: 0, // Okul içi çalışma öğretmen takdiri (opsiyonel ek veya direkt 1-3)
     tasks: 0
  });

  const handleAddClassPerformance = () => {
      if (!perfForm.classId || !perfForm.period) {
          if (actions?.showToast) {
              actions.showToast("Lütfen sınıf ve puan verilecek ayı seçiniz.", "error");
          }
          return;
      }
      
      const newRecord = {
          id: Math.random().toString(36).substring(2, 9),
          classId: perfForm.classId,
          period: perfForm.period,
          cleanliness: Number(perfForm.cleanliness || 0),
          bookScore: Number(perfForm.bookScore || 0),
          behaviorScore: Number(perfForm.behaviorScore || 0),
          academicScore: Number(perfForm.academicScore || 0),
          academicMode: perfForm.academicMode,
          competitions: Number(perfForm.competitions || 0),
          competitionRate: perfForm.competitionRate,
          schoolActivityScore: Number(perfForm.schoolActivityScore || 0),
          tasks: Number(perfForm.tasks || 0),
          evaluator: currentUser?.name || currentUser?.username || 'Bilinmiyor',
          date: new Date().toISOString()
      };
      
      const existingFiltered = (classPerformances || []).filter(
          (r: any) => !(r.classId === perfForm.classId && (r.period || '').toLowerCase() === perfForm.period.toLowerCase())
      );
      handleUpdateClassPerformances([newRecord, ...existingFiltered]);
      setSelectedPerfMonthFilter(perfForm.period);
      if (actions?.showToast) {
          actions.showToast(`${perfForm.classId} sınıfı için ${perfForm.period} ayı puanları kaydedildi.`, "success");
      }
  };

  // İlk deneme için standart bütün sınıflara 2 puan toplu atama yardımcısı
  const handleBulkFirstExamAcademicScore = () => {
      const classList = Object.keys(classes || {});
      if (classList.length === 0) return;
      const targetMonth = perfForm.period || currentDefaultMonth;
      const existingRecords = [...(classPerformances || [])];
      const nowIso = new Date().toISOString();
      const evaluatorName = currentUser?.name || currentUser?.username || 'Yönetici';

      classList.forEach((clsName, idx) => {
          const foundIdx = existingRecords.findIndex(
              (r: any) => r.classId === clsName && (r.period || '').toLowerCase() === targetMonth.toLowerCase()
          );
          if (foundIdx >= 0) {
              existingRecords[foundIdx] = {
                  ...existingRecords[foundIdx],
                  academicScore: 2,
                  academicMode: 'ilk_deneme'
              };
          } else {
              existingRecords.unshift({
                  id: `${Math.random().toString(36).substring(2, 7)}_${idx}`,
                  classId: clsName,
                  period: targetMonth,
                  cleanliness: 2,
                  bookScore: 2,
                  behaviorScore: 3,
                  academicScore: 2,
                  academicMode: 'ilk_deneme',
                  competitions: 1,
                  competitionRate: '%10',
                  schoolActivityScore: 0,
                  tasks: 0,
                  evaluator: evaluatorName,
                  date: nowIso
              });
          }
      });

      handleUpdateClassPerformances(existingRecords);
      setSelectedPerfMonthFilter(targetMonth);
      if (actions?.showToast) {
          actions.showToast(`${targetMonth} ayı için tüm sınıflara İlk Deneme Standart (2 Puan) Akademik Süreç Takip Puanı verildi.`, "success");
      }
  };

  const handleSaveRewardSchedule = (className: string, monthName: string) => {
      const key = `${className}_${monthName}`;
      const val = (rewardNoteInputs[key] || '').trim();
      if (!val) return;
      const updated = (classPerformances || []).map((r: any) => {
          if (r.classId === className && (r.period || '').toLowerCase() === monthName.toLowerCase()) {
              return { ...r, rewardActivitySchedule: val };
          }
          return r;
      });
      handleUpdateClassPerformances(updated);
      if (actions?.showToast) {
          actions.showToast(`${className} sınıfının ${getNextMonthName(monthName)} ayı ödül etkinlik günü ve saati kaydedildi.`, "success");
      }
  };

  const handleDeleteClassPerformance = (id: string) => {
      handleUpdateClassPerformances((classPerformances || []).filter((r: any) => r.id !== id));
  };

  const localHandleDownloadDevCardPDF = async () => {
    if (!pdfDevCardRef.current || !selectedStudent) return;
    
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(pdfDevCardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Gelisim_Karti_${selectedStudent}.pdf`);
    } catch (error) {
      console.error('PDF generate error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const totalScoreByActivities = (activities: any[]) => {
      return (activities || []).reduce((acc: number, act: any) => {
          const level = devCardConfig.levels.find((l: any) => l.id.toString() === act.levelId?.toString());
          const rubric = devCardConfig.rubrics.find((r: any) => r.id.toString() === act.rubricId?.toString());
          const pts = act.score || (level?.score || 0) * (rubric?.multiplier || 0);
          return acc + pts;
      }, 0);
  };

  const totalScore = totalScoreByActivities(devCardData.activities || []);

  const rankedStudents = (schoolPortfolios || [])
    .filter((port: any) => users.some((u: any) => (u.role === 'student' || u.role === 'öğrenci') && u.name === (port.fullName || port.id)))
    .map((port: any) => {
      const acts = port.activities || port.developmentCard?.activities || [];
      const score = totalScoreByActivities(acts);
      return { id: port.id, fullName: port.fullName || port.id, score };
  }).sort((a: any, b: any) => b.score - a.score);

  const top10School = rankedStudents.filter((r: any) => r.score > 0).slice(0, 10);

  const classStudents = selectedClass && classes && classes[selectedClass] ? classes[selectedClass] : [];
  const top5Class = rankedStudents.filter((r: any) => classStudents.includes(r.fullName) && r.score > 0).slice(0, 5);

  const performRecords = classPerformances || [];
  
  // Class Scoring Logic (Aylık 5 Kategori + Geriye Dönük Uyumluluk)
  const classScores = Object.keys(classes || {}).map((cName) => {
      const allRecords = performRecords.filter((r: any) => r.classId === cName);
      const records = selectedPerfMonthFilter === 'ALL'
          ? allRecords
          : allRecords.filter((r: any) => (r.period || '').toLowerCase() === selectedPerfMonthFilter.toLowerCase());
      
      let pCleanliness = 0;
      let pBook = 0;
      let pBehavior = 0;
      let pAcademic = 0;
      let pCompetitions = 0;
      let pTasks = 0;
      
      records.forEach((r: any) => {
          pCleanliness += Number(r.cleanliness || 0);
          pBook += Number(r.bookScore || 0);
          pBehavior += Number(r.behaviorScore || 0);
          pAcademic += Number(r.academicScore || 0);
          pCompetitions += Number(r.competitions || 0) + Number(r.schoolActivityScore || 0);
          pTasks += Number(r.tasks || 0);
      });

      const score = pCleanliness + pBook + pBehavior + pAcademic + pCompetitions + pTasks;

      return { 
          name: cName, 
          score,
          pCleanliness,
          pBook,
          pBehavior,
          pAcademic,
          pCompetitions,
          pTasks,
          records,
          allRecords
      };
  }).sort((a: any, b: any) => b.score - a.score);

  const activeWinnerMonth = selectedPerfMonthFilter === 'ALL' ? (perfForm.period || currentDefaultMonth) : selectedPerfMonthFilter;
  const monthlyRankedForWinner = Object.keys(classes || {}).map((cName) => {
      const mRecords = performRecords.filter(
          (r: any) => r.classId === cName && (r.period || '').toLowerCase() === activeWinnerMonth.toLowerCase()
      );
      let total = 0;
      let rewardSchedule = '';
      mRecords.forEach((r: any) => {
          total += Number(r.cleanliness || 0) + Number(r.bookScore || 0) + Number(r.behaviorScore || 0) + Number(r.academicScore || 0) + Number(r.competitions || 0) + Number(r.schoolActivityScore || 0) + Number(r.tasks || 0);
          if (r.rewardActivitySchedule) rewardSchedule = r.rewardActivitySchedule;
      });
      return { name: cName, score: total, rewardSchedule };
  }).sort((a, b) => b.score - a.score);
  const monthlyFirstPlaceClass = monthlyRankedForWinner[0] && monthlyRankedForWinner[0].score > 0 ? monthlyRankedForWinner[0] : null;

  if (!selectedStudent && activeSubTab === 'student') {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Trophy className="text-gray-300" size={32} /></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Öğrenci Seçiniz</h3>
        <p className="text-gray-500 text-sm">Gelişim kartını görüntülemek için bir öğrenci seçiniz.</p>
        
        {/* Tab Switcher even when no student selected */}
        <div className="mt-8 flex bg-gray-50 p-2 rounded-2xl border border-gray-100">
           <button onClick={() => setActiveSubTab('student')} className={`px-8 py-2 rounded-xl text-sm font-black transition-all ${activeSubTab === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Öğrenci</button>
           <button onClick={() => setActiveSubTab('class')} className={`px-8 py-2 rounded-xl text-sm font-black transition-all ${(activeSubTab as string) === 'class' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Sınıf</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden" data-html2canvas-ignore>
         <div className="flex items-center gap-6">
            <h2 className="text-2xl font-black text-blue-900">Gelişim Kartı</h2>
            <div className="flex bg-gray-100/80 p-1 rounded-2xl border border-gray-200/50">
               <button 
                  onClick={() => setActiveSubTab('student')} 
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'student' ? 'bg-white text-blue-600 shadow-md shadow-blue-500/5 border border-blue-100' : 'text-gray-500 hover:text-gray-700'}`}
               >
                  Öğrenci
               </button>
               <button 
                  onClick={() => setActiveSubTab('class')} 
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'class' ? 'bg-white text-blue-600 shadow-md shadow-blue-500/5 border border-blue-100' : 'text-gray-500 hover:text-gray-700'}`}
               >
                  Sınıf
               </button>
            </div>
         </div>

         {activeSubTab === 'student' && (
           <button 
               onClick={localHandleDownloadDevCardPDF} 
               disabled={isDownloading}
               className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm"
           >
              {isDownloading ? <><Loader2 size={16} className="animate-spin" /> Hazırlanıyor</> : <><Download size={16}/> PDF İndir</>}
           </button>
         )}
      </div>

      {activeSubTab === 'student' ? (
        <>
          <h2 className="text-3xl font-black text-center mb-8 hidden print:block text-blue-900">
            Gelişim Kartı: {selectedStudent}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-600 p-6 rounded-[32px] text-white flex justify-between items-center shadow-xl shadow-blue-200">
               <div>
                  <h3 className="text-2xl font-black">{selectedStudent}</h3>
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mt-1">Sınıf: {selectedClass || '-'}</p>
               </div>
               <div className="text-right">
                  <div className="text-4xl font-black">{totalScore}</div>
                  <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest">Toplam Puan</p>
               </div>
            </div>

                        {/* Badges Section */}
            {(devCardConfig.manualBadges || []).length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Award size={18} className="text-blue-600"/> Rozetler</h3>
                  <div className="flex flex-wrap gap-2">
                      {(devCardConfig.manualBadges || []).map((badge: any) => {
                          const hasBadge = devCardData.manualBadges?.includes(badge.id);
                          return (
                              <button
                                  key={badge.id}
                                  onClick={() => actions.handleToggleBadge && actions.handleToggleBadge(badge.id)}
                                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${hasBadge ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                              >
                                  {badge.name}
                              </button>
                          );
                      })}
                  </div>
              </div>
            )}
            
            {/* Add Activity Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print:hidden" data-html2canvas-ignore>
                <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2"><PlusCircle size={18} className="text-blue-600"/> Yeni Aktivite Ekle</h3>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                   <div className="flex-1 w-full">
                      <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">Aktivite / Görev Açıklaması</label>
                      <input type="text" value={newActivity.description} onChange={e => setNewActivity({...newActivity, description: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Örn: 23 Nisan töreninde şiir okudu" />
                   </div>
                   <div className="w-full md:w-56">
                      <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">Kapsam (Seviye)</label>
                      <select value={newActivity.levelId} onChange={e => setNewActivity({...newActivity, levelId: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                         <option value="">Seçiniz</option>
                         {devCardConfig.levels.map((l: any) => <option key={l.id} value={l.id}>{l.name} ({l.score} Puan)</option>)}
                      </select>
                   </div>
                   <div className="w-full md:w-56">
                      <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">Başarı (Çarpan)</label>
                      <select value={newActivity.rubricId} onChange={e => setNewActivity({...newActivity, rubricId: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                         <option value="">Seçiniz</option>
                         {devCardConfig.rubrics.map((r: any) => <option key={r.id} value={r.id}>{r.name} (x{r.multiplier})</option>)}
                      </select>
                   </div>
                   <button onClick={handleAddActivity} className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 h-[46px] flex items-center justify-center">Ekle</button>
                </div>
            </div>

            {/* Achievements & Titles Section */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold font-display text-gray-800 mb-5 flex items-center gap-3">
                    <Award className="text-blue-600" size={20} /> Kazanımlar & Unvanlar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {devCardConfig.titles.map((title: any, idx: number) => {
                        const isEarned = totalScore >= title.threshold;
                        return (
                            <div key={idx} className={`relative p-4 rounded-[18px] border-2 transition-all duration-300 ${
                                isEarned 
                                ? 'bg-blue-50/30 border-blue-200 shadow-sm' 
                                : 'bg-gray-50/50 border-gray-100 opacity-60'
                            }`}>
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${isEarned ? 'text-blue-600' : 'text-gray-400'}`}>
                                        AŞAMA {idx + 1}
                                    </span>
                                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg border font-black text-[9px] ${
                                        isEarned ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-100'
                                    }`}>
                                        <Star size={8} fill={isEarned ? "currentColor" : "none"} />
                                        {title.threshold}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className={`font-black text-sm leading-tight ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {title.name}
                                    </h4>
                                    <p className={`text-[10px] font-medium leading-normal ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {title.right}
                                    </p>
                                </div>
                                {isEarned && (
                                    <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white p-0.5 rounded-full shadow-md border-2 border-white">
                                        <Check size={10} strokeWidth={4} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Activity List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Trophy size={18} className="text-gray-400"/> Aktivite Geçmişi</h3>
                    <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-lg text-sm font-black border border-blue-200 shadow-sm">Toplam Puan: {totalScore}</span>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                     <thead className="bg-white text-gray-500 border-b border-gray-100 text-[11px] uppercase tracking-wider">
                        <tr>
                          <th className="p-4 font-bold">Tarih</th>
                          <th className="p-4 font-bold">Aktivite</th>
                          <th className="p-4 font-bold">Kapsam</th>
                          <th className="p-4 font-bold">Başarı</th>
                          <th className="p-4 font-bold">Puan</th>
                          <th className="p-4 font-bold text-right print:hidden" data-html2canvas-ignore></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {devCardData.activities.map((act: any) => {
                           const level = devCardConfig.levels.find((l: any) => l.id.toString() === act.levelId?.toString());
                           const rubric = devCardConfig.rubrics.find((r: any) => r.id.toString() === act.rubricId?.toString());
                           const pts = act.score || (level?.score || 0) * (rubric?.multiplier || 0);
                           return (
                             <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500 font-medium whitespace-nowrap">{new Date(act.date).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4 font-semibold text-gray-800">{act.description}</td>
                                <td className="p-4 text-gray-600">{level?.name}</td>
                                <td className="p-4 text-gray-600">{rubric?.name}</td>
                                <td className="p-4 font-black text-green-600">+{pts}</td>
                                <td className="p-4 text-right print:hidden" data-html2canvas-ignore>
                                  <button onClick={() => handleDeleteActivity(act.id)} className="text-gray-400 hover:text-red-600 bg-white border border-gray-200 p-2 rounded-lg hover:border-red-200 hover:bg-red-50 transition-all shadow-sm" title="Sil"><Trash2 size={16}/></button>
                                </td>
                             </tr>
                           );
                        })}
                        {devCardData.activities.length === 0 && (
                            <tr><td colSpan={6} className="p-8 text-center text-gray-400 font-medium">Öğrenciye ait aktivite kaydı bulunamadı.</td></tr>
                        )}
                     </tbody>
                   </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 mt-6">
              {/* School Ranking */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold font-display text-gray-800 mb-6 flex items-center">
                  <Trophy className="text-yellow-500 mr-3" size={24} /> Okul Sıralaması (İlk 10)
                </h3>
                {top10School.length > 0 ? (
                  <div className="space-y-3">
                    {top10School.map((student: any, idx: number) => (
                      <div key={student.id} className={`flex items-center justify-between p-4 rounded-2xl border ${student.fullName === selectedStudent ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100'} transition-all`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-200 text-gray-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-white text-gray-400'}`}>
                            {idx + 1}
                          </div>
                          <span className={`font-semibold ${student.fullName === selectedStudent ? 'text-indigo-800' : 'text-gray-700'}`}>{student.fullName}</span>
                        </div>
                        <span className="font-black text-green-600 px-3 py-1 bg-green-50 rounded-lg">{student.score} Puan</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    Henüz yeterli veri bulunamadı.
                  </div>
                )}
              </div>

              {/* Class Ranking */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold font-display text-gray-800 mb-6 flex items-center">
                  <Activity className="text-indigo-500 mr-3" size={24} /> Sınıf Sıralaması (İlk 5)
                </h3>
                {top5Class.length > 0 ? (
                  <div className="space-y-3">
                    {top5Class.map((student: any, idx: number) => (
                      <div key={student.id} className={`flex items-center justify-between p-4 rounded-2xl border ${student.fullName === selectedStudent ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100'} transition-all`}>
                        <div className="flex items-center space-x-4">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-200 text-gray-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-white text-gray-400'}`}>
                            {idx + 1}
                          </div>
                          <span className={`font-semibold ${student.fullName === selectedStudent ? 'text-indigo-800' : 'text-gray-700'}`}>{student.fullName}</span>
                        </div>
                        <span className="font-black text-green-600 px-3 py-1 bg-green-50 rounded-lg">{student.score} Puan</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    Henüz yeterli veri bulunamadı.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
           {/* Add Class Performance Form (Aylık 5 Kategorili Sistem) */}
           <div className="bg-white p-6 sm:p-8 rounded-[32px] shadow-sm border border-gray-100 print:hidden space-y-6">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                   <div>
                       <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                           <PlusCircle className="text-blue-600" /> Manuel Sınıf Puanı Ekle (Aylık Değerlendirme)
                       </h3>
                       <p className="text-xs font-semibold text-gray-500 mt-1">
                           Puan verilecek ayı seçin ve 5 kategori üzerinden sınıfın aylık gelişim puanlarını kaydedin. Toplamda 1. olan sınıf takip eden ayda bir gün istediği bir saatte etkinlik yapma hakkı kazanır.
                       </p>
                   </div>
                   <button
                       type="button"
                       onClick={handleBulkFirstExamAcademicScore}
                       className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-2xs"
                       title="İlk deneme için standart bütün sınıflara 2 puan tanımla"
                   >
                       <Award size={16} className="text-amber-600" />
                       İlk Deneme Standart Akademik Puanı (Tüm Sınıflara 2 Puan Ver)
                   </button>
               </div>

               {/* 1. Satır: Sınıf ve Puan Verilecek Ay Seçimi */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                   <div>
                       <label className="text-xs font-black text-gray-600 mb-1.5 block uppercase tracking-wider">1. Sınıf Seçimi</label>
                       <select
                           value={perfForm.classId}
                           onChange={e => setPerfForm({ ...perfForm, classId: e.target.value })}
                           className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                       >
                           <option value="">Sınıf Seçiniz...</option>
                           {Object.keys(classes || {}).map(c => (
                               <option key={c} value={c}>{c}</option>
                           ))}
                       </select>
                   </div>

                   <div>
                       <label className="text-xs font-black text-gray-600 mb-1.5 block uppercase tracking-wider">2. Puan Verilecek Ay</label>
                       <select
                           value={perfForm.period}
                           onChange={e => setPerfForm({ ...perfForm, period: e.target.value })}
                           className="w-full border border-blue-200 bg-blue-50/60 text-blue-900 p-3 rounded-xl text-sm font-black outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                       >
                           {MONTHS_LIST.map(m => (
                               <option key={m} value={m}>{m} Ayı</option>
                           ))}
                       </select>
                   </div>

                   <div className="sm:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-3.5 flex items-center justify-between">
                       <div>
                           <div className="text-[11px] font-black uppercase tracking-wider text-blue-600">Seçili Ay İçin Hesaplanan Toplam</div>
                           <div className="text-xs font-semibold text-gray-600 mt-0.5">
                               {perfForm.classId ? `${perfForm.classId} Sınıfı • ${perfForm.period} Ayı` : 'Henüz sınıf seçilmedi'}
                           </div>
                       </div>
                       <div className="flex items-center gap-3">
                           <div className="text-right">
                               <span className="text-2xl font-black text-blue-900">
                                   {Number(perfForm.cleanliness || 0) +
                                    Number(perfForm.bookScore || 0) +
                                    Number(perfForm.behaviorScore || 0) +
                                    Number(perfForm.academicScore || 0) +
                                    Number(perfForm.competitions || 0)}
                               </span>
                               <span className="text-xs font-bold text-blue-700 ml-1">/ 17 Puan</span>
                           </div>
                       </div>
                   </div>
               </div>

               {/* 2. Satır: 5 Kategori Puanlama Kartları */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                   {/* Kategori 1: Temiz Sınıf Puanı (1-3) */}
                   <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex flex-col justify-between space-y-3">
                       <div>
                           <div className="flex items-center justify-between gap-2">
                               <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">1. Temiz Sınıf Puanı</span>
                               <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">1-3 Puan</span>
                           </div>
                           <p className="text-[11px] text-emerald-800/80 font-medium mt-1 leading-snug">
                               Sınıf düzeni ve temizlik değerlendirmesi doğrultusunda 1–3 arası verilir.
                           </p>
                       </div>
                       <select
                           value={perfForm.cleanliness?.toString()}
                           onChange={e => setPerfForm({ ...perfForm, cleanliness: parseInt(e.target.value) })}
                           className="w-full border border-emerald-200 bg-white p-2.5 rounded-xl text-sm font-black text-emerald-900 outline-none focus:border-emerald-500 cursor-pointer"
                       >
                           {[1, 2, 3].map(n => (
                               <option key={n} value={n}>{n} Puan</option>
                           ))}
                       </select>
                   </div>

                   {/* Kategori 2: Kitap Puanı (1 - 1,5 - 2 - 2,5 - 3) */}
                   <div className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 flex flex-col justify-between space-y-3">
                       <div>
                           <div className="flex items-center justify-between gap-2">
                               <span className="text-xs font-black text-indigo-950 uppercase tracking-wide">2. Kitap Puanı</span>
                               <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">1-3 Puan</span>
                           </div>
                           <p className="text-[11px] text-indigo-800/80 font-medium mt-1 leading-snug">
                               Okunan sayfa sayısı ve okuma listesinin düzenli tutulmasına göre 1–3 arası verilir.
                           </p>
                       </div>
                       <select
                           value={perfForm.bookScore?.toString()}
                           onChange={e => setPerfForm({ ...perfForm, bookScore: parseFloat(e.target.value) })}
                           className="w-full border border-indigo-200 bg-white p-2.5 rounded-xl text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 cursor-pointer"
                       >
                           {[1, 1.5, 2, 2.5, 3].map(n => (
                               <option key={n} value={n}>{n.toString().replace('.', ',')} Puan</option>
                           ))}
                       </select>
                   </div>

                   {/* Kategori 3: Davranış Puanı (1-5) */}
                   <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/40 flex flex-col justify-between space-y-3">
                       <div>
                           <div className="flex items-center justify-between gap-2">
                               <span className="text-xs font-black text-purple-950 uppercase tracking-wide">3. Davranış Puanı</span>
                               <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">1-5 Puan</span>
                           </div>
                           <p className="text-[11px] text-purple-800/80 font-medium mt-1 leading-snug">
                               Sınıf toplam puanı ve olumlu davranış oranına göre 1–5 arası verilir.
                           </p>
                       </div>
                       <select
                           value={perfForm.behaviorScore?.toString()}
                           onChange={e => setPerfForm({ ...perfForm, behaviorScore: parseInt(e.target.value) })}
                           className="w-full border border-purple-200 bg-white p-2.5 rounded-xl text-sm font-black text-purple-900 outline-none focus:border-purple-500 cursor-pointer"
                       >
                           {[1, 2, 3, 4, 5].map(n => (
                               <option key={n} value={n}>{n} Puan</option>
                           ))}
                       </select>
                   </div>

                   {/* Kategori 4: Akademik Süreç Takip Puanı (1-3) */}
                   <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/40 flex flex-col justify-between space-y-3">
                       <div>
                           <div className="flex items-center justify-between gap-2">
                               <span className="text-xs font-black text-amber-950 uppercase tracking-wide">4. Akademik Süreç</span>
                               <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">1-3 Puan</span>
                           </div>
                           <p className="text-[11px] text-amber-900/80 font-medium mt-1 leading-snug">
                               İlk deneme standart 2 puan; sonrasında sınıf ortalaması üstüne çıkış / altında kalmaya göre verilir.
                           </p>
                       </div>
                       <select
                           value={perfForm.academicScore?.toString()}
                           onChange={e => setPerfForm({ ...perfForm, academicScore: parseInt(e.target.value) })}
                           className="w-full border border-amber-200 bg-white p-2.5 rounded-xl text-sm font-black text-amber-900 outline-none focus:border-amber-500 cursor-pointer"
                       >
                           {[1, 2, 3].map(n => (
                               <option key={n} value={n}>{n} Puan</option>
                           ))}
                       </select>
                   </div>

                   {/* Kategori 5: Yarışma - Etkinlik Puanı (1-3) */}
                   <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/40 flex flex-col justify-between space-y-3">
                       <div>
                           <div className="flex items-center justify-between gap-2">
                               <span className="text-xs font-black text-blue-950 uppercase tracking-wide">5. Yarışma &amp; Etkinlik</span>
                               <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">1-3 Puan</span>
                           </div>
                           <p className="text-[11px] text-blue-900/80 font-medium mt-1 leading-snug">
                               Katılım %10→1P, %15→2P, %20→3P. Okul içi çalışmada öğretmen takdirine göre 1–3 puan.
                           </p>
                       </div>
                       <select
                           value={perfForm.competitions?.toString()}
                           onChange={e => setPerfForm({ ...perfForm, competitions: parseInt(e.target.value) })}
                           className="w-full border border-blue-200 bg-white p-2.5 rounded-xl text-sm font-black text-blue-900 outline-none focus:border-blue-500 cursor-pointer"
                       >
                           {[1, 2, 3].map(n => (
                               <option key={n} value={n}>{n} Puan</option>
                           ))}
                       </select>
                   </div>
               </div>

               <div className="flex justify-end pt-2">
                   <button
                       onClick={handleAddClassPerformance}
                       className="px-8 bg-blue-600 text-white font-black h-[48px] rounded-2xl shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                   >
                       <PlusCircle size={18} /> Aylık Sınıf Puanını Kaydet
                   </button>
               </div>
           </div>

           {/* Ayın 1. Sınıfı Etkinlik Ödülü Bildirim & Planlama Kartı */}
           {monthlyFirstPlaceClass && (
               <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-amber-500/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                   <div className="flex items-start sm:items-center gap-5">
                       <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0">
                           <Trophy size={34} className="text-white" />
                       </div>
                       <div>
                           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[11px] font-black uppercase tracking-widest mb-2">
                               🏆 {activeWinnerMonth} AYI BİRİNCİSİ ÖDÜL HAKKI
                           </div>
                           <h4 className="text-2xl sm:text-3xl font-black tracking-tight">
                               1. Olan Sınıf: {monthlyFirstPlaceClass.name} ({monthlyFirstPlaceClass.score} Puan)
                           </h4>
                           <p className="text-amber-50 text-xs sm:text-sm font-semibold mt-1 leading-relaxed">
                               Toplamda 1. olan <b>{monthlyFirstPlaceClass.name}</b> sınıfı, <b>{activeWinnerMonth}</b> ayını takip eden <b>{getNextMonthName(activeWinnerMonth)}</b> ayında bir gün istedikleri bir saatte etkinlik yapma hakkı kazanmıştır!
                           </p>
                           {monthlyFirstPlaceClass.rewardSchedule && (
                               <div className="mt-2.5 inline-flex items-center gap-2 bg-white text-amber-900 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs">
                                   📅 Planlanan Ödül Etkinliği ({getNextMonthName(activeWinnerMonth)}): {monthlyFirstPlaceClass.rewardSchedule}
                               </div>
                           )}
                       </div>
                   </div>

                   <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/15 p-3 rounded-2xl border border-white/20">
                       <input
                           type="text"
                           value={rewardNoteInputs[`${monthlyFirstPlaceClass.name}_${activeWinnerMonth}`] ?? monthlyFirstPlaceClass.rewardSchedule ?? ''}
                           onChange={e => setRewardNoteInputs({ ...rewardNoteInputs, [`${monthlyFirstPlaceClass.name}_${activeWinnerMonth}`]: e.target.value })}
                           placeholder={`${getNextMonthName(activeWinnerMonth)} ayı etkinlik günü ve saati...`}
                           className="bg-white text-gray-900 placeholder-gray-400 px-3.5 py-2.5 rounded-xl text-xs font-bold outline-none min-w-[240px]"
                       />
                       <button
                           type="button"
                           onClick={() => handleSaveRewardSchedule(monthlyFirstPlaceClass.name, activeWinnerMonth)}
                           className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0"
                       >
                           Etkinlik Saatini Kaydet
                       </button>
                   </div>
               </div>
           )}

           {/* Class Dashboard Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                 <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6"><Award size={24}/></div>
                 <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">
                     En Başarılı Sınıf ({selectedPerfMonthFilter === 'ALL' ? 'Genel Toplam' : `${selectedPerfMonthFilter} Ayı`})
                 </h4>
                 <div className="text-3xl font-black text-gray-900">{classScores[0]?.name || '-'}</div>
                 <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 w-max px-2 py-1 rounded-lg">+{classScores[0]?.score || 0} Toplam Puan</div>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6"><Activity size={24}/></div>
                 <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">En Düzenli &amp; Olumlu Davranış</h4>
                 <div className="text-3xl font-black text-gray-900">
                     {[...classScores].sort((a,b) => (b.pCleanliness + b.pBehavior) - (a.pCleanliness + a.pBehavior))[0]?.name || '-'}
                 </div>
                 <div className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 w-max px-2 py-1 rounded-lg">Temiz Sınıf &amp; Davranış Lideri</div>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6"><Trophy size={24}/></div>
                 <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Okul Sınıf Ortalaması</h4>
                 <div className="text-3xl font-black text-gray-900">
                    {(classScores.reduce((acc, c) => acc + c.score, 0) / (classScores.length || 1)).toFixed(1)}
                 </div>
                 <div className="mt-2 text-xs font-bold text-gray-400">Genel Puan Ortalaması</div>
              </div>
           </div>

           {/* Detailed Class Scores Table */}
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100 bg-[#FBFBFC] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                    <h3 className="text-xl font-black text-gray-900">Aylık Sınıf Gelişim &amp; Puan Sıralaması</h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        Sınıfların 5 kategoriye göre aylık puanları ve takip eden ay etkinlik ödülü durumu.
                    </p>
                 </div>

                 {/* Ay Filtresi */}
                 <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Ay Filtresi:</span>
                    <button
                        type="button"
                        onClick={() => setSelectedPerfMonthFilter('ALL')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            selectedPerfMonthFilter === 'ALL'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Tüm Aylar
                    </button>
                    {MONTHS_LIST.map(m => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedPerfMonthFilter(m)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                selectedPerfMonthFilter === m
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {m}
                        </button>
                    ))}
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                       <tr>
                          <th className="px-5 py-5">Sıra</th>
                          <th className="px-5 py-5">Sınıf</th>
                          <th className="px-4 py-5 text-center">Temiz Sınıf (1-3)</th>
                          <th className="px-4 py-5 text-center">Kitap P. (1-3)</th>
                          <th className="px-4 py-5 text-center">Davranış P. (1-5)</th>
                          <th className="px-4 py-5 text-center">Akademik Takip (1-3)</th>
                          <th className="px-4 py-5 text-center">Yarışma &amp; Etkinlik (1-3)</th>
                          <th className="px-6 py-5 text-right">Toplam Puan</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {classScores.sort((a,b) => b.score - a.score).map((cls, idx) => (
                          <React.Fragment key={cls.name}>
                             <tr className="hover:bg-gray-50 transition-all group cursor-pointer" onClick={(e) => {
                                 const nextRow = e.currentTarget.nextElementSibling;
                                 if(nextRow) nextRow.classList.toggle('hidden');
                             }}>
                                <td className="px-5 py-5">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-100 text-gray-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'}`}>
                                      {idx + 1}
                                   </div>
                                </td>
                                <td className="px-5 py-5">
                                   <div className="flex items-center gap-2">
                                      <span className="font-black text-gray-900 text-base">{cls.name}</span>
                                      {idx === 0 && cls.score > 0 && (
                                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black">
                                              🏆 1. Sınıf (Sonraki Ay Etkinlik Hakkı)
                                          </span>
                                      )}
                                   </div>
                                </td>
                                <td className="px-4 py-5 text-center text-emerald-600 font-bold">{cls.pCleanliness} Puan</td>
                                <td className="px-4 py-5 text-center text-indigo-600 font-bold">{cls.pBook.toString().replace('.', ',')} Puan</td>
                                <td className="px-4 py-5 text-center text-purple-600 font-bold">{cls.pBehavior} Puan</td>
                                <td className="px-4 py-5 text-center text-amber-600 font-bold">{cls.pAcademic} Puan</td>
                                <td className="px-4 py-5 text-center text-blue-600 font-bold">{cls.pCompetitions} Puan</td>
                                <td className="px-6 py-5 text-right">
                                   <span className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-black text-lg shadow-lg shadow-blue-200">
                                      {cls.score.toString().replace('.', ',')}
                                   </span>
                                </td>
                             </tr>
                             <tr className="hidden bg-gray-50">
                                <td colSpan={8} className="px-6 py-4">
                                   <div className="text-sm font-bold text-gray-800 mb-3">Aylık Puan Kayıt Geçmişi</div>
                                   {cls.records.length > 0 ? (
                                     <table className="w-full text-xs text-left ring-1 ring-gray-200 rounded-lg overflow-hidden bg-white">
                                        <thead className="bg-gray-100 text-gray-500 uppercase tracking-widest">
                                           <tr>
                                              <th className="px-3 py-2">Ay / Dönem</th>
                                              <th className="px-3 py-2">Temiz Sınıf</th>
                                              <th className="px-3 py-2">Kitap</th>
                                              <th className="px-3 py-2">Davranış</th>
                                              <th className="px-3 py-2">Akademik Takip</th>
                                              <th className="px-3 py-2">Yarışma-Etkinlik</th>
                                              <th className="px-3 py-2">Tarih</th>
                                              <th className="px-3 py-2">Değerlendiren</th>
                                              <th className="px-3 py-2 text-right">İşlem</th>
                                           </tr>
                                        </thead>
                                        <tbody>
                                           {cls.records.map((r: any) => (
                                              <tr key={r.id} className="border-t border-gray-100">
                                                 <td className="px-3 py-2 font-black text-blue-900">{r.period}</td>
                                                 <td className="px-3 py-2 font-semibold text-emerald-700">+{r.cleanliness || 0}</td>
                                                 <td className="px-3 py-2 font-semibold text-indigo-700">+{(r.bookScore || 0).toString().replace('.', ',')}</td>
                                                 <td className="px-3 py-2 font-semibold text-purple-700">+{r.behaviorScore || 0}</td>
                                                 <td className="px-3 py-2 font-semibold text-amber-700">
                                                     +{r.academicScore || 0}
                                                 </td>
                                                 <td className="px-3 py-2 font-semibold text-blue-700">
                                                     +{Number(r.competitions || 0)}
                                                 </td>
                                                 <td className="px-3 py-2 text-gray-500">{r.date ? new Date(r.date).toLocaleDateString('tr-TR') : '-'}</td>
                                                 <td className="px-3 py-2 text-gray-600">{r.evaluator || '-'}</td>
                                                 <td className="px-3 py-2 text-right">
                                                    <button onClick={() => handleDeleteClassPerformance(r.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors cursor-pointer"><Trash2 size={14}/></button>
                                                 </td>
                                              </tr>
                                           ))}
                                        </tbody>
                                     </table>
                                   ) : (
                                     <div className="text-gray-400 text-xs">Bu ay için henüz kayıt eklenmemiş.</div>
                                   )}
                                </td>
                             </tr>
                          </React.Fragment>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* 5 Category Scoring Rules Legend */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-emerald-50/50 p-6 rounded-[28px] border border-emerald-100/60">
                 <h5 className="font-black text-emerald-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2"><CheckCircle size={16}/> 1. Temiz Sınıf (1-3 P.)</h5>
                 <p className="text-xs font-semibold text-emerald-800 leading-relaxed">
                    Yapılan sınıf düzeni ve temizlik değerlendirmesi doğrultusunda aylık 1 ile 3 puan arası verilir.
                 </p>
              </div>
              <div className="bg-indigo-50/50 p-6 rounded-[28px] border border-indigo-100/60">
                 <h5 className="font-black text-indigo-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2"><Award size={16}/> 2. Kitap Puanı (1-3 P.)</h5>
                 <p className="text-xs font-semibold text-indigo-800 leading-relaxed">
                    Sınıfta okunan sayfa sayısı ve kitap okuma listesinin düzenli tutulmasına göre 1 ile 3 puan arası verilir.
                 </p>
              </div>
              <div className="bg-purple-50/50 p-6 rounded-[28px] border border-purple-100/60">
                 <h5 className="font-black text-purple-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2"><Users size={16}/> 3. Davranış Puanı (1-5 P.)</h5>
                 <p className="text-xs font-semibold text-purple-800 leading-relaxed">
                    Sınıf toplam puanı ve olumlu davranış oranına göre aylık 1 ile 5 puan arası verilir.
                 </p>
              </div>
              <div className="bg-amber-50/50 p-6 rounded-[28px] border border-amber-100/60">
                 <h5 className="font-black text-amber-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2"><Activity size={16}/> 4. Akademik Süreç (1-3 P.)</h5>
                 <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                    İlk deneme için standart bütün sınıflara 2 puan verilir. Sonrasında sınıf ortalaması üstüne çıkışa veya ortalama altında kalmasına göre 1–3 puan verilir.
                 </p>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-[28px] border border-blue-100/60">
                 <h5 className="font-black text-blue-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2"><Trophy size={16}/> 5. Yarışma &amp; Etkinlik (1-3 P.)</h5>
                 <p className="text-xs font-semibold text-blue-800 leading-relaxed">
                    Okul içi, ilçe, il ve ulusal yarışmalara katılım %10 olunca 1, %15 olunca 2, %20 olunca 3 puan yansır. Ayrıca okul içi çalışmada bulunan sınıf öğretmen takdirine göre 1–3 puan alır.
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* PDF Export Section (Keep hidden for student PDF only) */}
      {activeSubTab === 'student' && (
        <div className="absolute top-0 right-full w-[210mm] opacity-0 pointer-events-none -z-50" style={{ left: '-9999px' }}>
         <div ref={pdfDevCardRef} className="bg-white w-[210mm] min-h-[297mm]">
            <div className="bg-[#1e5cdc] text-white p-12 w-full h-48 flex items-center justify-between relative overflow-hidden">
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-3xl flex items-center justify-center shrink-0">
                        <Award size={40} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                       <h1 className="text-4xl font-black tracking-tight mb-2">{selectedStudent}</h1>
                       <div className="text-sm font-bold uppercase tracking-widest text-[#a5c0ff] flex items-center gap-2">
                           <span>SINIF: {selectedClass || '-'}</span>
                           <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                           <span>KİŞİSEL GELİŞİM VE BAŞARI KARTI</span>
                       </div>
                    </div>
                </div>
                <div className="text-right relative z-10">
                    <div className="text-6xl font-black">{totalScore}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#a5c0ff] mt-1">TOPLAM PUAN</div>
                </div>
            </div>

            <div className="p-12 space-y-8">
                <div>
                   <h2 className="text-xl font-black text-gray-800 flex items-center gap-2 mb-6 uppercase tracking-wider">
                       <Star className="text-blue-500 fill-blue-500" size={20} /> KAZANILAN UNVANLAR
                   </h2>
                   <div className="grid grid-cols-4 gap-3">
                       {devCardConfig.titles.map((title: any, idx: number) => {
                           const isEarned = totalScore >= title.threshold;
                           return (
                               <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between ${isEarned ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-gray-50'}`}>
                                   <div className="flex items-center gap-3 mb-2">
                                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${isEarned ? 'bg-[#1e5cdc] text-white' : 'bg-gray-200 text-gray-400'}`}>
                                           {isEarned ? <Check size={16} strokeWidth={3} /> : title.id}
                                       </div>
                                       <div className={`font-black text-xs leading-tight ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>{title.name}</div>
                                   </div>
                                   <div>
                                       <div className={`text-[9px] font-bold uppercase tracking-wider mb-0.5 ${isEarned ? 'text-gray-500' : 'text-gray-400'}`}>{title.threshold} PUAN</div>
                                       <div className={`text-[10px] leading-tight ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>{title.right}</div>
                                   </div>
                               </div>
                           );
                       })}
                   </div>
                </div>

                <div>
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

                <div>
                   <h2 className="text-xl font-black text-gray-800 flex items-center gap-2 mb-6 uppercase tracking-wider">
                       <Activity className="text-blue-500" size={20} /> AKTİVİTE GEÇMİŞİ
                   </h2>
                   <table className="w-full text-left border-collapse">
                       <thead>
                           <tr className="border-b-2 border-gray-100 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                               <th className="py-4 pl-4 rounded-l-xl w-32">TARİH</th>
                               <th className="py-4">AKTİVİTE / GÖREV</th>
                               <th className="py-4 w-40">KAPSAM</th>
                               <th className="py-4 w-40">BAŞARI</th>
                               <th className="py-4 pr-4 rounded-r-xl w-24 text-center">PUAN</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                           {(devCardData.activities || []).map((act: any, idx: number) => {
                               const level = devCardConfig.levels.find((l: any) => l.id.toString() === act.levelId?.toString());
                               const rubric = devCardConfig.rubrics.find((r: any) => r.id.toString() === act.rubricId?.toString());
                               const pts = act.score || (level?.score || 0) * (rubric?.multiplier || 0);

                               return (
                                   <tr key={idx}>
                                       <td className="py-5 pl-4 text-gray-500 text-sm font-medium">{new Date(act.date).toLocaleDateString('tr-TR')}</td>
                                       <td className="py-5 font-black text-gray-800 text-sm">{act.description}</td>
                                       <td className="py-5 text-gray-600 text-xs pr-2">{level?.name || '-'}</td>
                                       <td className="py-5 text-gray-600 text-xs pr-2">{rubric?.name || '-'}</td>
                                       <td className="py-5 pr-4 text-center font-black text-[#1e5cdc] text-base">+{pts}</td>
                                   </tr>
                               );
                           })}
                       </tbody>
                   </table>
                </div>

                <div className="pt-24 flex justify-between px-12">
                    <div className="text-center w-64">
                        <div className="border-b-2 border-gray-200 mb-3 w-full"></div>
                        <div className="font-bold text-gray-800 text-sm">Sınıf Rehber Öğretmeni</div>
                    </div>
                    <div className="text-center w-64">
                        <div className="border-b-2 border-gray-200 mb-3 w-full"></div>
                        <div className="font-bold text-gray-800 text-sm">Okul Müdürü</div>
                    </div>
                </div>
            </div>
         </div>
        </div>
      )}
    </div>
  );
};
