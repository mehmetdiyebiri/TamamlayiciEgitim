const fs = require('fs');
const file = 'src/components/hizliokuma/ParentReport.tsx';
let content = fs.readFileSync(file, 'utf-8');

// The file does not import window.print, but we can easily use a browser print dialog that allows saving as PDF
const buttonStr = `<button className="text-sm font-bold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100">
                    PDF İndir
                </button>`;

const newButtonStr = `<button onClick={() => window.print()} className="text-sm font-bold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100">
                    PDF İndir
                </button>`;

content = content.replace(buttonStr, newButtonStr);
fs.writeFileSync(file, content);
console.log('Patched ParentReport to allow print/PDF save');
