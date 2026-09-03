const fs = require('fs');
let code = fs.readFileSync('src/components/AdminTarifPanel.tsx', 'utf-8');

code = code.replace(/setDebugMsg\('Doc exists:[^;]+;\n?/g, "");
code = code.replace(/\{debugMsg && <div className="text-xs text-red-300 absolute top-0 left-0 bg-black p-2">\{debugMsg\}<\/div>\}/g, "");

fs.writeFileSync('src/components/AdminTarifPanel.tsx', code);
