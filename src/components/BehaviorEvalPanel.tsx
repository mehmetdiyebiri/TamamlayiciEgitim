import React from 'react';
import { Frown, Award, PlusCircle, MinusCircle, Meh, AlertTriangle, AlertOctagon, Undo2, Activity, X, FileText, Printer } from 'lucide-react';
import { INITIAL_FORM_CONFIGS } from '../lib/constants';

export const BehaviorEvalPanel = ({ state, actions }: any) => {
  const { selectedStudent, behaviorConfig, activeBehaviorCard, behaviorLog, getBehaviorScore, schoolPortfolios = [] } = state;
  const { setActiveBehaviorCard, handleAddBehavior, handleAddCompensation, handleSoftDeleteBehavior } = actions;

  



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
                   {group1.length > 0 ? group1.sort((a,b) => a.score - b.score).map((s: any, i: number) => (
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
                   {group2.length > 0 ? group2.sort((a,b) => a.score - b.score).map((s: any, i: number) => (
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
                   {group3.length > 0 ? group3.sort((a,b) => a.score - b.score).map((s: any, i: number) => (
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
                   {group4.length > 0 ? group4.sort((a,b) => a.score - b.score).map((s: any, i: number) => (
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
                   {group5.length > 0 ? group5.sort((a,b) => a.score - b.score).map((s: any, i: number) => (
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

  if (!selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Frown className="text-gray-300" size={32} /></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Öğrenci Seçiniz</h3>
          <p className="text-gray-500 text-sm mb-6">Davranış notunu görüntülemek ve değerlendirmek için bir öğrenci seçiniz.</p>
        </div>
        
        {renderNegativeStatus()}
      </div>
    );
  }

  const activeCardObj = behaviorConfig.cards.find((c: any) => c.id === activeBehaviorCard);
  const activeBehaviors = behaviorConfig.behaviors[activeBehaviorCard] || [];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-black text-blue-900">Davranış Değerlendirmesi: {selectedStudent}</h2>
         <div className="bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm font-bold text-sm">
             Davranış Puanı: <span className={getBehaviorScore >= 0 ? 'text-green-600' : 'text-red-600'}>{getBehaviorScore}</span>
         </div>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-y-4 gap-x-2 pb-4 mt-2 w-full overflow-visible">
          <div className="flex flex-wrap gap-3 p-1">
              {behaviorConfig.cards.filter((c:any) => ['struggle_pos', 'struggle_neg'].includes(c.id)).map((card: any) => {
                  const isActive = activeBehaviorCard === card.id;
                  return (
                      <button 
                          key={card.id} 
                          onClick={() => setActiveBehaviorCard(card.id)} 
                          className={`flex items-center gap-2 px-5 py-3 rounded-[20px] font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${isActive ? 'bg-white text-gray-800 border-gray-300 ring-2 ring-gray-100 scale-105 transform' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                          {card.id === 'struggle_pos' && <PlusCircle size={16}/>}
                          {card.id === 'struggle_neg' && <MinusCircle size={16}/>}
                          {card.name}
                      </button>
                  )
              })}
          </div>
          <div className="flex flex-wrap gap-3 p-1 justify-end">
              {behaviorConfig.cards.filter((c:any) => ['white', 'yellow', 'red'].includes(c.id)).map((card: any) => {
                  const isActive = activeBehaviorCard === card.id;
                  let activeClass = '';
                  if (card.id === 'white') activeClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-200 scale-105 transform';
                  if (card.id === 'yellow') activeClass = 'bg-yellow-400 text-yellow-900 border-yellow-500 shadow-md shadow-yellow-200 scale-105 transform';
                  if (card.id === 'red') activeClass = 'bg-red-500 text-white border-red-600 shadow-md shadow-red-200 scale-105 transform';

                  return (
                      <button 
                          key={card.id} 
                          onClick={() => setActiveBehaviorCard(card.id)} 
                          className={`flex items-center gap-2 px-5 py-3 rounded-[20px] font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${isActive ? activeClass : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                      >
                          {card.id === 'white' && <Award size={16}/>}
                          {card.id === 'yellow' && <AlertTriangle size={16}/>}
                          {card.id === 'red' && <AlertOctagon size={16}/>}
                          {card.name}
                      </button>
                  )
              })}
          </div>
      </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">Değerlendirme Kriterleri</h3>
                      <span className="text-xs font-black text-gray-800 px-2 py-1">Taban Puan: {activeCardObj?.score}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                      {activeBehaviors.map((b: any, idx: number) => (
                          <div key={b.id || idx} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                              <div>
                                  <div className="font-bold text-gray-800 text-sm mb-1">{b.text}</div>
                                  <div className="text-xs text-gray-500">{b.task}</div>
                              </div>
                              {(() => {
                                  const textVal = b.text || '';
                                  const taskVal = b.task || '';
                                  const isAutoBehavior = b.isAuto || textVal.includes("Haftalık +20 Puan Başarısı") || textVal.includes("Aylık +50 Puan Başarısı") || taskVal.includes("Otomatik Alır");
                                  return (
                                      <button 
                                          onClick={() => handleAddBehavior(b, activeCardObj)} 
                                          disabled={isAutoBehavior}
                                          className={`shrink-0 ml-4 px-5 py-2.5 rounded-[12px] text-xs font-bold transition-all ${isAutoBehavior ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 shadow-sm'}`}
                                      >
                                          {isAutoBehavior ? 'OTOMATİK' : 'UYGULA'}
                                      </button>
                                  );
                              })()}
                          </div>
                      ))}
                      {activeBehaviors.length === 0 && (
                          <div className="p-8 text-center text-gray-400 text-sm font-medium">Bu karta ait davranış kriteri bulunmuyor.</div>
                      )}
                  </div>
              </div>
              
              {activeCardObj?.compensation !== undefined && activeCardObj?.compensation !== 0 && (
                  <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-100 p-5 flex justify-between items-center">
                      <div>
                          <h4 className="font-bold text-orange-800 text-sm flex items-center gap-2"><Undo2 size={16}/> Telafi Görevi</h4>
                          <p className="text-xs text-orange-600 mt-1">Öğrenci telafi görevini tamamladığında puanı iade edilir.</p>
                      </div>
                      <button onClick={() => {
                          const enforcedCard = { ...activeCardObj };
                          if (enforcedCard.id === 'yellow') enforcedCard.compensation = 2;
                          if (enforcedCard.id === 'red') enforcedCard.compensation = 5;
                          handleAddCompensation(enforcedCard);
                      }} className="bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-orange-200 hover:bg-orange-600 transition-colors">
                          Telafi Ekle (+{activeCardObj.id === 'yellow' ? 2 : activeCardObj.id === 'red' ? 5 : activeCardObj.compensation})
                      </button>
                  </div>
              )}
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={16} className="text-gray-400"/> Davranış Formları</h3>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                      {Object.entries(behaviorConfig?.forms || INITIAL_FORM_CONFIGS).map(([key, form]: [string, any]) => (
                          <button 
                              key={key}
                              onClick={() => {
                                  // Minimal Form Print Preview
                                  const renderPreview = () => `
                                      <html>
                                          <head>
                                              <title>${form.title}</title>
                                              <style>
                                                  body { font-family: sans-serif; padding: 40px; color: #111827; }
                                                  h1 { text-align: center; font-size: 24px; margin-bottom: 20px; text-transform: uppercase; }
                                                  .content { font-size: 16px; line-height: 1.6; margin-bottom: 40px; white-space: pre-wrap; }
                                                  .desc { font-size: 14px; margin-bottom: 30px; font-style: italic; color: #4B5563; }
                                                  .list { margin-bottom: 30px; }
                                                  .list h3 { font-size: 16px; margin-bottom: 10px; text-transform: uppercase; }
                                                  .list ul { list-style-type: none; padding-left: 0; }
                                                  .list li { margin-bottom: 8px; padding-left: 20px; position: relative; }
                                                  .list li::before { content: "•"; position: absolute; left: 0; }
                                                  .footer { margin-top: 50px; font-size: 14px; font-weight: bold; border-top: 1px solid #E5E7EB; padding-top: 20px; }
                                                  .signatures { display: flex; justify-content: space-between; margin-top: 80px; }
                                                  .sig-box { text-align: center; }
                                                  .sig-title { font-weight: bold; margin-bottom: 30px; }
                                                  .sig-line { width: 150px; border-bottom: 1px solid #111827; margin: 0 auto; }
                                                  @media print {
                                                      .page-break { page-break-before: always; }
                                                  }
                                              </style>
                                          </head>
                                          <body>
                                              <div style="text-align: center; margin-bottom: 20px;">
                                                  <div style="font-weight: bold; font-size: 14px;">T.C.</div>
                                                  <div style="font-weight: bold; font-size: 14px;">MİLLİ EĞİTİM BAKANLIĞI</div>
                                                  <div style="font-weight: bold; font-size: 14px; margin-top: 5px;">Göynük İmam Hatip Ortaokulu Müdürlüğü</div>
                                              </div>
                                              <h1>${form.title}</h1>
                                              ${form.description ? `<div class="desc">${form.description}</div>` : ''}
                                              ${form.content ? `<div class="content">${
                                                form.content.replace('{studentName}', selectedStudent)
                                                            .replace('{date}', new Date().toLocaleDateString('tr-TR'))
                                                            .replace('{teacherName}', '.......................................................')
                                              }</div>` : ''}
                                              ${form.schoolRights || form.schoolResponsibilities ? `
                                                  <div class="list">
                                                      <h2 style="font-size: 18px; border-bottom: 2px solid #3B82F6; padding-bottom: 5px; margin-top: 30px;">OKULUN HAK VE SORUMLULUKLARI</h2>
                                                      ${form.schoolRights ? `<h3>HAKLAR</h3><ul>${form.schoolRights.map((r:string) => `<li>${r}</li>`).join('')}</ul>` : ''}
                                                      ${form.schoolResponsibilities ? `<h3>SORUMLULUKLAR</h3><ul>${form.schoolResponsibilities.map((r:string) => `<li>${r}</li>`).join('')}</ul>` : ''}
                                                  </div>
                                               ` : ''}
                                               ${form.studentRights || form.studentResponsibilities ? `
                                                  <div class="list">
                                                      <h2 style="font-size: 18px; border-bottom: 2px solid #3B82F6; padding-bottom: 5px; margin-top: 30px;">ÖĞRENCİNİN HAK VE SORUMLULUKLARI</h2>
                                                      ${form.studentRights ? `<h3>HAKLAR</h3><ul>${form.studentRights.map((r:string) => `<li>${r}</li>`).join('')}</ul>` : ''}
                                                      ${form.studentResponsibilities ? `<h3>SORUMLULUKLAR</h3><ul>${form.studentResponsibilities.map((r:string) => `<li>${r}</li>`).join('')}</ul>` : ''}
                                                  </div>
                                               ` : ''}
                                               ${form.parentRights || form.parentResponsibilities ? `
                                                  <div class="list">
                                                      <h2 style="font-size: 18px; border-bottom: 2px solid #3B82F6; padding-bottom: 5px; margin-top: 30px;">VELİNİN HAK VE SORUMLULUKLARI</h2>
                                                      ${form.parentRights ? `<h3>HAKLAR</h3><ul>${form.parentRights.map((r:string) => `<li>${r}</li>`).join('')}</ul>` : ''}
                                                      ${form.parentResponsibilities ? `<h3>SORUMLULUKLAR</h3><ul>${form.parentResponsibilities.map((r:string) => `<li>${r}</li>`).join('')}</ul>` : ''}
                                                  </div>
                                               ` : ''}
                                              ${form.footer ? `<div class="footer">${form.footer}</div>` : ''}
                                              <div class="signatures">
                                                  <div class="sig-box"><div class="sig-title">Öğrenci</div><div class="sig-line"></div></div>
                                                  <div class="sig-box"><div class="sig-title">Veli</div><div class="sig-line"></div></div>
                                                  <div class="sig-box"><div class="sig-title">Okul Müdürü</div><div class="sig-line"></div></div>
                                              </div>

                                              ${form.page2 ? `
                                                  <div class="page-break"></div>
                                                  <div style="text-align: center; margin-bottom: 20px;">
                                                      <div style="font-weight: bold; font-size: 14px;">T.C.</div>
                                                      <div style="font-weight: bold; font-size: 14px;">MİLLİ EĞİTİM BAKANLIĞI</div>
                                                      <div style="font-weight: bold; font-size: 14px; margin-top: 5px;">Göynük İmam Hatip Ortaokulu Müdürlüğü</div>
                                                  </div>
                                                  ${form.page2}
                                              ` : ''}

                                              <script>window.print();</script>
                                          </body>
                                      </html>
                                  `;
                                  const win = window.open();
                                  if (win) {
                                      win.document.write(renderPreview());
                                      win.document.close();
                                  }
                              }}
                              className="w-full text-left bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all rounded-xl p-3 flex items-center justify-between group"
                          >
                              <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700">{form.title}</span>
                              <Printer size={16} className="text-gray-400 group-hover:text-blue-500" />
                          </button>
                      ))}
                  </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col min-h-[300px]">
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2"><Activity size={16} className="text-gray-400"/> Davranış Geçmişi</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {behaviorLog.filter((l: any) => !l.isDeleted).slice().reverse().map((log: any) => {
                          const c = behaviorConfig.cards.find((card: any) => card.id === log.card);
                          const isComp = log.type === 'compensation';
                          return (
                              <div key={log.id} className={`p-3 rounded-xl border text-sm relative group ${isComp ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                                  <div className="flex justify-between items-start mb-1.5">
                                      <div className={`font-bold text-xs ${isComp ? 'text-orange-600' : 'text-gray-800'}`}>
                                          {isComp ? 'TELAFİ' : c?.name || 'Kayıt'}
                                      </div>
                                      <div className={`font-black ${log.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                          {log.score > 0 ? '+' : ''}{log.score}
                                      </div>
                                  </div>
                                  <div className="text-gray-600 font-medium leading-tight mb-2">{log.description}</div>
                                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold">
                                      <span>{new Date(log.date).toLocaleDateString('tr-TR')}</span>
                                      <span>{log.addedBy}</span>
                                  </div>
                                  <button onClick={() => handleSoftDeleteBehavior(log.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all"><X size={12}/></button>
                              </div>
                          )
                      })}
                      {behaviorLog.filter((l: any) => !l.isDeleted).length === 0 && (
                          <div className="text-center text-gray-400 text-sm py-8 font-medium italic">Kayıt bulunmuyor.</div>
                      )}
                  </div>
              </div>
          </div>
      </div>
      
      {renderNegativeStatus()}
    </div>
  );
};
