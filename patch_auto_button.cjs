const fs = require('fs');
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

// For OTOMATİK buttons, they have a lighter styling in the screenshot.
const buttonFind = `                                      <button 
                                          onClick={() => handleAddBehavior(b, activeCardObj)} 
                                          disabled={isAutoBehavior}
                                          className={\`shrink-0 ml-4 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm \${isAutoBehavior ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'}\`}
                                      >
                                          {isAutoBehavior ? 'OTOMATİK' : 'UYGULA'}
                                      </button>`;

const buttonReplace = `                                      <button 
                                          onClick={() => handleAddBehavior(b, activeCardObj)} 
                                          disabled={isAutoBehavior}
                                          className={\`shrink-0 ml-4 px-5 py-2.5 rounded-[12px] text-xs font-bold transition-all \${isAutoBehavior ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 shadow-sm'}\`}
                                      >
                                          {isAutoBehavior ? 'OTOMATİK' : 'UYGULA'}
                                      </button>`;

code = code.replace(buttonFind, buttonReplace);

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
