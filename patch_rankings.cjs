const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
`                              if (data.behaviorLog) {
                                pMap[studentName].behaviorLog = data.behaviorLog;
                              }
                              if (data.behaviorLog) {
                                pMap[studentName].behaviorLog = data.behaviorLog;
                              }`,
`                              if (data.behaviorLog) {
                                pMap[studentName].behaviorLog = data.behaviorLog;
                              }`
);

fs.writeFileSync('src/App.tsx', code);
