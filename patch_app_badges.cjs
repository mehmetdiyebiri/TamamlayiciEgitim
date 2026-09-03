const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/App.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// For "Ödevlerim" tab in both places:
code = code.replace(
    /if \(!isClassMatch\) return false;\s*if \(a\.targetType === 'student'\) \{/g,
    `if (!isClassMatch) return false;
                                      if (a.type === 'kelime') return false;
                                      if (a.targetType === 'student') {`
);

code = code.replace(
    /return a\.classes\.some\(\(c: string\) => normalize\(c\) === normalize\(currentUser\.classLevel\)\) && !hwProgress\[\`\$\{currentUser\.id\}_\$\{a\.id\}\`\]\?\.completed;/g,
    `return a.type !== 'kelime' && a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel)) && !hwProgress[\`\${currentUser.id}_\${a.id}\`]?.completed;`
);

// Now for Kelimelik tabs - add the badge
const kelimelikBadge = `
                                  {assignments.filter((a: any) => {
                                      if (!a || !a.classes || !currentUser || !currentUser.classLevel || a.type !== 'kelime') return false;
                                      const normalize = (s: any) => String(s || '').replace(/[\\s_\\\\/-]/g, '').toLowerCase();
                                      const isClassMatch = a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel));
                                      if (!isClassMatch) return false;
                                      if (a.targetType === 'student') {
                                          return (normalize(a.targetStudent) === normalize(currentUser.username) || normalize(a.targetStudent) === normalize(currentUser.name)) && !hwProgress[\`\${currentUser.id}_\${a.id}\`]?.completed;
                                      }
                                      return !hwProgress[\`\${currentUser.id}_\${a.id}\`]?.completed;
                                  }).length > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black ml-1">
                                      {assignments.filter((a: any) => {
                                          if (!a || !a.classes || !currentUser || !currentUser.classLevel || a.type !== 'kelime') return false;
                                          const normalize = (s: any) => String(s || '').replace(/[\\s_\\\\/-]/g, '').toLowerCase();
                                          const isClassMatch = a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel));
                                          if (!isClassMatch) return false;
                                          if (a.targetType === 'student') {
                                              return (normalize(a.targetStudent) === normalize(currentUser.username) || normalize(a.targetStudent) === normalize(currentUser.name)) && !hwProgress[\`\${currentUser.id}_\${a.id}\`]?.completed;
                                          }
                                          return !hwProgress[\`\${currentUser.id}_\${a.id}\`]?.completed;
                                      }).length}
                                    </span>
                                  )}`;

code = code.replace(
    /<BookOpen size=\{18\} className=\{activeTab === 'kelimelik' \? 'text-indigo-600' : 'text-gray-400'\}\/> Kelimelik/g,
    `<BookOpen size={18} className={activeTab === 'kelimelik' ? 'text-indigo-600' : 'text-gray-400'}/> Kelimelik ${kelimelikBadge}`
);

fs.writeFileSync(filePath, code);
