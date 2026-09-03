const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/hizliokuma/EyeExercises.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(
    /animate=\{\{ width: 800, height: 800, opacity: 0 \}\}/,
    'animate={{ width: 1600, height: 1600, opacity: 0 }}'
);

fs.writeFileSync(filePath, code);
