const fs = require('fs');

// We will also enforce it in the UI just in case it doesn't immediately reflect or it's for another school
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

const compFind = `              {activeCardObj?.compensation !== undefined && activeCardObj?.compensation !== 0 && (
                  <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-100 p-5 flex justify-between items-center">
                      <div>
                          <h4 className="font-bold text-orange-800 text-sm flex items-center gap-2"><Undo2 size={16}/> Telafi Görevi</h4>
                          <p className="text-xs text-orange-600 mt-1">Öğrenci telafi görevini tamamladığında puanı iade edilir.</p>
                      </div>
                      <button onClick={() => handleAddCompensation(activeCardObj)} className="bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-orange-200 hover:bg-orange-600 transition-colors">
                          Telafi Ekle (+{activeCardObj.compensation})
                      </button>
                  </div>
              )}`;

const compReplace = `              {activeCardObj?.compensation !== undefined && activeCardObj?.compensation !== 0 && (
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
              )}`;

code = code.replace(compFind, compReplace);
fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
