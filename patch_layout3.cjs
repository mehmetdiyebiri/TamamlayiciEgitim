const fs = require('fs');
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

const tabsFind = `      <div className="flex flex-wrap items-center gap-3 pb-4 mt-2">
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
      </div>`;

const tabsReplace = `      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 pb-4 mt-2">
          <div className="flex gap-3 overflow-x-auto w-full xl:w-auto scrollbar-hide">
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
          <div className="flex gap-3 overflow-x-auto w-full xl:w-auto scrollbar-hide">
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

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
