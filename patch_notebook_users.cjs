const fs = require('fs');
let code = fs.readFileSync('src/components/StudentDigitalNotebook.tsx', 'utf-8');

code = code.replace(
/const fetchStudent = async \(\) => \{\s*const \{ collection, query, where, getDocs \} = await import\('firebase\/firestore'\);\s*const userColName = activeSchoolId === 'default' \? 'users' : \(activeSchoolId \? `users_\$\{activeSchoolId\}` : 'users'\);\s*const q = query\(collection\(db, userColName\), where\('role', '==', 'student'\)\);\s*const snap = await getDocs\(q\);\s*let foundId = null;\s*let foundName = null;\s*snap\.forEach\(d => \{\s*const ud = d\.data\(\);\s*if \(ud\.name === selectedStudent \|\| ud\.username === selectedStudent\) \{\s*foundId = d\.id;\s*foundName = ud\.name \|\| ud\.username;\s*\}\s*\}\);\s*setStudentId\(foundId\);\s*setStudentName\(foundName\);\s*\};/m,
`const fetchStudent = async () => {
            let foundId = null;
            let foundName = null;
            
            if (state.users) {
                const user = state.users.find((u: any) => (u.name === selectedStudent || u.username === selectedStudent) && u.role === 'student');
                if (user) {
                    foundId = user.id;
                    foundName = user.name || user.username;
                }
            }
            
            if (!foundId) {
                const { collection, query, where, getDocs } = await import('firebase/firestore');
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
            }
            
            setStudentId(foundId);
            setStudentName(foundName);
        };`
);

fs.writeFileSync('src/components/StudentDigitalNotebook.tsx', code);
