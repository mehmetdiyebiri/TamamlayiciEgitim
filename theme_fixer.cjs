const fs = require('fs');

const filesToFix = [
    '/app/applet/src/components/mit/StudentMitPanel.tsx',
    '/app/applet/src/components/mit/AdminMitPanel.tsx',
    '/app/applet/src/components/makale/StudentMakalePanel.tsx'
];

for (const filePath of filesToFix) {
    if (!fs.existsSync(filePath)) continue;
    let code = fs.readFileSync(filePath, 'utf-8');

    // Replace background colors
    code = code.replace(/bg-slate-950/g, 'bg-slate-50');
    code = code.replace(/bg-slate-900/g, 'bg-white');
    code = code.replace(/bg-slate-800/g, 'bg-slate-50');
    code = code.replace(/bg-slate-700/g, 'bg-slate-100');
    
    // Replace border colors
    code = code.replace(/border-slate-800/g, 'border-slate-200');
    code = code.replace(/border-slate-700/g, 'border-slate-200');
    
    // Replace text colors
    code = code.replace(/text-slate-100/g, 'text-slate-800');
    code = code.replace(/text-slate-200/g, 'text-slate-700');
    code = code.replace(/text-slate-300/g, 'text-slate-600');
    code = code.replace(/text-slate-400/g, 'text-slate-500');
    code = code.replace(/text-slate-500/g, 'text-slate-400');
    code = code.replace(/text-white/g, 'text-slate-900');
    
    // Fix shadows for dark theme
    code = code.replace(/shadow-blue-900\/50/g, 'shadow-blue-500/20');
    code = code.replace(/shadow-indigo-900\/50/g, 'shadow-indigo-500/20');
    code = code.replace(/shadow-indigo-900\/20/g, 'shadow-indigo-500/10');
    
    // Makale panel specific fixes
    code = code.replace(/prose-invert/g, ''); // remove dark mode prose
    code = code.replace(/bg-slate-950\/50/g, 'bg-slate-50/50'); 
    code = code.replace(/bg-indigo-900\/50/g, 'bg-indigo-50/50');
    code = code.replace(/bg-indigo-900\/40/g, 'bg-indigo-50');
    code = code.replace(/bg-purple-900\/40/g, 'bg-purple-50');
    code = code.replace(/bg-indigo-900\/20/g, 'bg-indigo-50');
    code = code.replace(/from-blue-900/g, 'from-blue-100');
    code = code.replace(/to-slate-900/g, 'to-white');
    code = code.replace(/bg-black\/30/g, 'bg-slate-100');

    // Fix some hover states
    code = code.replace(/hover:text-slate-200/g, 'hover:text-slate-900');
    code = code.replace(/hover:bg-slate-800/g, 'hover:bg-slate-100');
    code = code.replace(/hover:bg-slate-700/g, 'hover:bg-slate-200');
    code = code.replace(/hover:bg-slate-600/g, 'hover:bg-slate-300');
    
    fs.writeFileSync(filePath, code);
}
