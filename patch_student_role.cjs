const fs = require('fs');
let code = fs.readFileSync('src/components/StudentDigitalNotebook.tsx', 'utf-8');

code = code.replace(
  "const isStudent = currentUser?.role === 'student';",
  "const isStudent = currentUser?.role === 'student' || currentUser?.role === 'öğrenci';"
);

fs.writeFileSync('src/components/StudentDigitalNotebook.tsx', code);
