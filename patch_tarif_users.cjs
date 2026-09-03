const fs = require('fs');
let code = fs.readFileSync('src/components/AdminTarifPanel.tsx', 'utf-8');

code = code.replace(
/const fetchStudent = async \(\) => \{\s*setLoading\(true\);\s*try \{\s*const userColName = activeSchoolId === 'default' \? 'users' : \(activeSchoolId \? `users_\$\{activeSchoolId\}` : 'users'\);\s*const q = query\(collection\(db, userColName\), where\('role', '==', 'student'\)\);\s*const snap = await getDocs\(q\);\s*let foundId = null;\s*let foundName = null;\s*snap\.forEach\(d => \{\s*const ud = d\.data\(\);\s*if \(ud\.name === selectedStudent \|\| ud\.username === selectedStudent\) \{\s*foundId = d\.id;\s*foundName = ud\.name \|\| ud\.username;\s*\}\s*\}\);/m,
`const fetchStudent = async () => {
      setLoading(true);
      try {
        let foundId = null;
        let foundName = null;
        
        // Use state.users directly which handles superadmin and regular admin context correctly
        if (state.users) {
            const user = state.users.find((u: any) => (u.name === selectedStudent || u.username === selectedStudent) && u.role === 'student');
            if (user) {
                foundId = user.id;
                foundName = user.name || user.username;
            }
        }
        
        if (!foundId) {
            // Fallback just in case
            const userColName = activeSchoolId === 'default' ? 'users' : (activeSchoolId ? \`users_\${activeSchoolId}\` : 'users');
            const q = query(collection(db, userColName), where('role', '==', 'student'));
            const snap = await getDocs(q);
            snap.forEach(d => {
              const ud = d.data();
              if (ud.name === selectedStudent || ud.username === selectedStudent) {
                foundId = d.id;
                foundName = ud.name || ud.username;
              }
            });
        }`
);

fs.writeFileSync('src/components/AdminTarifPanel.tsx', code);
