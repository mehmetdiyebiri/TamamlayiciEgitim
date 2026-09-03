const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/components/StudentHomePanel.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// Update myAssignments filtering
code = code.replace(
    /const myAssignments = assignments\.filter\(\(a: any\) => \{\s*if \(\!a \|\| \!a\.classes \|\| \!currentUser \|\| \!currentUser\.classLevel\) return false;/,
    `const myAssignments = assignments.filter((a: any) => {
      if (!a || !a.classes || !currentUser || !currentUser.classLevel) return false;
      if (section === 'homework' && a.type === 'kelime') return false;
      if (section === 'kelimelik' && a.type !== 'kelime') return false;`
);

// Update section === 'homework' && studentHomework
code = code.replace(
    /if \(section === 'homework' && studentHomework\) \{/,
    "if ((section === 'homework' || section === 'kelimelik') && studentHomework) {"
);

// Update {section === 'homework' && (
code = code.replace(
    /\{section === 'homework' && \(\s*<div className="space-y-8">\s*<div className="flex items-center justify-between px-4">\s*<h3 className="text-2xl font-black text-blue-900 tracking-tight">Atanan Ödevler<\/h3>/m,
    `{(section === 'homework' || section === 'kelimelik') && (
            <div className="space-y-8">
                <div className="flex items-center justify-between px-4">
                    <h3 className="text-2xl font-black text-blue-900 tracking-tight">
                        {section === 'kelimelik' ? 'Kelimelik Görevleri' : 'Atanan Ödevler'}
                    </h3>`
);

fs.writeFileSync(filePath, code);
