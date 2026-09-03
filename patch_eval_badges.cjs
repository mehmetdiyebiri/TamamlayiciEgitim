const fs = require('fs');
let code = fs.readFileSync('src/components/EvaluationPanel.tsx', 'utf-8');

const importReplacement = `const { selectedStudent, categories, tasks, evaluations, successDescriptions, remedialTasks, remedialProblems, uncompletedReasons, currentUser, activeSchoolId, schools, selectedClass, users, devCardData, devCardConfig } = state;`;
code = code.replace(/const { selectedStudent.*? } = state;/, importReplacement);

const badgeInjection = `
                  <div className="flex justify-between items-center border-b border-gray-100 pb-8 mb-10">
                      <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                              <School size={36} strokeWidth={2.5} />
                          </div>
                          <div>
                              <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-2">{selectedStudent}</h1>
                              <div className="text-sm text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                  <span>SINIF: {selectedClass || '-'}</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                  <span>DEĞERLER EĞİTİMİ RAPORU</span>
                              </div>
                          </div>
                      </div>
                      <div className="text-right shrink-0">
                          <div className="text-base font-black text-gray-800">{new Date().toLocaleDateString('tr-TR')}</div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1.5">{schoolName}</div>
                      </div>
                  </div>

                  {/* Badge Section in PDF */}
                  {(devCardData?.manualBadges && devCardData.manualBadges.length > 0) && (
                      <div className="mb-8 p-6 bg-blue-50/50 rounded-[1.5rem] border border-blue-100 shrink-0">
                          <h2 className="text-sm font-black text-blue-900 tracking-wider uppercase mb-4 flex items-center gap-2">
                             <Award size={16} /> KAZANILAN ROZETLER
                          </h2>
                          <div className="flex flex-wrap gap-2">
                              {devCardData.manualBadges.map((badgeId: any, idx: number) => {
                                  const badgeObj = devCardConfig?.manualBadges?.find((b: any) => b.id === badgeId);
                                  if (!badgeObj) return null;
                                  return (
                                      <span key={idx} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold">
                                          {badgeObj.name}
                                      </span>
                                  );
                              })}
                          </div>
                      </div>
                  )}
`;

code = code.replace(/<div className="flex justify-between items-center border-b border-gray-100 pb-8 mb-10">[\s\S]*?<div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1.5">\{schoolName\}<\/div>\s*<\/div>\s*<\/div>/, badgeInjection);
fs.writeFileSync('src/components/EvaluationPanel.tsx', code);
console.log("Patched EvaluationPanel.tsx");
