const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/hizliokuma/EyeExercises.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(
    /className="fixed inset-0 z-50 bg-slate-900/g,
    'className="fixed inset-0 z-[100] bg-slate-900'
);

fs.writeFileSync(filePath, code);
