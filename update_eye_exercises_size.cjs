const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/hizliokuma/EyeExercises.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(
    /max-w-\[600px\]/,
    'max-w-[1200px]'
);

fs.writeFileSync(filePath, code);
