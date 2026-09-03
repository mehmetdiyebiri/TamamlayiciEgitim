const fs = require('fs');
let code = fs.readFileSync('src/components/AdminTarifPanel.tsx', 'utf-8');

code = code.replace(
    /setDebugMsg\('Doc exists: ' \+ chatSnap.exists\(\) \+ ' keys: ' \+ \(chatSnap.exists\(\) \? Object.keys\(chatSnap.data\(\)\).join\(','\) : ''\)\);/,
    "setDebugMsg('Doc exists: ' + chatSnap.exists() + ' keys: ' + (chatSnap.exists() ? Object.keys(chatSnap.data()).join(',') : '') + ' foundId: ' + foundId + ' selSt: ' + selectedStudent);"
);

fs.writeFileSync('src/components/AdminTarifPanel.tsx', code);
