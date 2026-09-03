const fs = require('fs');
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

const tabsFind = `      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {behaviorConfig.cards.map((card: any) => (
              <button 
                  key={card.id} 
                  onClick={() => setActiveBehaviorCard(card.id)} 
                  className={\`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border \${activeBehaviorCard === card.id ? card.color + ' border-transparent scale-105 transform' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}\`}
              >
                  {card.id === 'white' && <Award size={16}/>}
                  {card.id === 'struggle_pos' && <PlusCircle size={16}/>}
                  {card.id === 'struggle_neg' && <MinusCircle size={16}/>}
                  {card.id === 'green' && <Meh size={16}/>}
                  {card.id === 'yellow' && <AlertTriangle size={16}/>}
                  {card.id === 'red' && <AlertOctagon size={16}/>}
                  {card.name}
              </button>
          ))}
      </div>`;

const tabsReplace = `      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4">
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto scrollbar-hide">
              {behaviorConfig.cards.filter((c:any) => ['struggle_pos', 'struggle_neg'].includes(c.id)).map((card: any) => {
                  const isActive = activeBehaviorCard === card.id;
                  return (
                      <button 
                          key={card.id} 
                          onClick={() => setActiveBehaviorCard(card.id)} 
                          className={\`flex items-center gap-2 px-5 py-3 rounded-[20px] font-bold text-sm transition-all whitespace-nowrap shadow-sm border \${isActive ? 'bg-white text-gray-800 border-gray-300 ring-2 ring-gray-100 scale-105 transform' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}\`}
                      >
                          {card.id === 'struggle_pos' && <PlusCircle size={16}/>}
                          {card.id === 'struggle_neg' && <MinusCircle size={16}/>}
                          {card.name}
                      </button>
                  )
              })}
          </div>
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto scrollbar-hide">
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
                          className={\`flex items-center gap-2 px-5 py-3 rounded-[20px] font-bold text-sm transition-all whitespace-nowrap shadow-sm border \${isActive ? activeClass : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}\`}
                      >
                          {card.id === 'white' && <Award size={16}/>}
                          {card.id === 'yellow' && <AlertTriangle size={16}/>}
                          {card.id === 'red' && <AlertOctagon size={16}/>}
                          {card.name}
                      </button>
                  )
              })}
          </div>
      </div>`;

code = code.replace(tabsFind, tabsReplace);

const listHeaderFind = `<div className={\`p-4 border-b flex justify-between items-center \${activeCardObj?.color}\`}>
                      <h3 className="font-bold flex items-center gap-2">Değerlendirme Kriterleri</h3>
                      <span className="text-xs font-black bg-white/20 px-2 py-1 rounded">Taban Puan: {activeCardObj?.score}</span>
                  </div>`;
const listHeaderReplace = `<div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">Değerlendirme Kriterleri</h3>
                      <span className="text-xs font-black text-gray-800 px-2 py-1">Taban Puan: {activeCardObj?.score}</span>
                  </div>`;

code = code.replace(listHeaderFind, listHeaderReplace);

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
console.log("Patched successfully");
