const fs = require('fs');

function fix(file) {
    let code = fs.readFileSync(file, 'utf-8');
    code = code.replace(/const userColName = activeSchoolId \? `users_\$\{activeSchoolId\}` : 'users';/g, "const userColName = activeSchoolId === 'default' ? 'users' : (activeSchoolId ? `users_${activeSchoolId}` : 'users');");
    fs.writeFileSync(file, code);
}

fix('src/components/AdminTarifPanel.tsx');
fix('src/components/StudentDigitalNotebook.tsx');
