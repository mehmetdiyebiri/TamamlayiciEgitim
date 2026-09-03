const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const socialClubNav = `
                              <button onClick={() => setActiveTab('socialclubs')} className={\`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 \${activeTab === 'socialclubs' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}\`}>
                                  <Users size={18} className={activeTab === 'socialclubs' ? 'text-blue-600' : 'text-gray-400'}/> Sosyal Kulüpler
                              </button>
`;

// Insert it right after the `Rehberlik` tab in the student branch.
// We can just find the end of the `Rehberlik` button.
// But we need to make sure we don't mess up the braces.
code = code.replace(
  "                                    </span>\n                                  )}\n                              </button>\n                              <button onClick={() => setActiveTab('idea')}",
  "                                    </span>\n                                  )}\n                              </button>\n" + socialClubNav + "                              <button onClick={() => setActiveTab('idea')}"
);

fs.writeFileSync('src/App.tsx', code);
