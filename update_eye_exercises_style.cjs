const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/hizliokuma/EyeExercises.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(
    /<div className="h-\[400px\] rounded-2xl relative">/,
    '<div className="w-full max-w-[600px] aspect-square mx-auto rounded-2xl relative shadow-inner border border-slate-800">'
);

fs.writeFileSync(filePath, code);
