const fs = require('fs');
const file = 'src/components/hizliokuma/AICoach.tsx';
let content = fs.readFileSync(file, 'utf-8');

const buttonStr = `<button className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-cyan-700 transition-colors shadow-sm">
                        Önerilen Çalışmaya Git
                    </button>`;

const newButtonStr = `<button 
                        onClick={() => actions.setActiveTab && actions.setActiveTab('grouping')}
                        className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-cyan-700 transition-colors shadow-sm"
                    >
                        Önerilen Çalışmaya Git
                    </button>`;

content = content.replace(buttonStr, newButtonStr);
fs.writeFileSync(file, content);
console.log('Patched AICoach');
