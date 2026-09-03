const fs = require('fs');

// Patch App.tsx
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. handleAddBehavior
const addBehaviorFind = `          let updatedLog = [...behaviorLog, logEntry];
          updatedLog = checkAutoAwards(updatedLog);`;
const addBehaviorReplace = `          let updatedLog = [...behaviorLog, logEntry];
          updatedLog = checkAutoAwards(updatedLog);
          
          setBehaviorLog(updatedLog);
          setSchoolPortfolios((prev: any) => {
              const newList = [...prev];
              const idx = newList.findIndex((s: any) => s.fullName === selectedStudent);
              if (idx !== -1) {
                  newList[idx] = { ...newList[idx], behaviorLog: updatedLog };
              } else {
                  newList.push({ id: selectedStudent, fullName: selectedStudent, activities: [], behaviorLog: updatedLog });
              }
              return newList;
          });`;
code = code.replace(addBehaviorFind, addBehaviorReplace);


// 2. handleAddCompensation
const addCompFind = `          const updatedLog = [...behaviorLog, logEntry];`;
const addCompReplace = `          const updatedLog = [...behaviorLog, logEntry];
          
          setBehaviorLog(updatedLog);
          setSchoolPortfolios((prev: any) => {
              const newList = [...prev];
              const idx = newList.findIndex((s: any) => s.fullName === selectedStudent);
              if (idx !== -1) {
                  newList[idx] = { ...newList[idx], behaviorLog: updatedLog };
              } else {
                  newList.push({ id: selectedStudent, fullName: selectedStudent, activities: [], behaviorLog: updatedLog });
              }
              return newList;
          });`;
code = code.replace(addCompFind, addCompReplace);

// 3. handleSoftDeleteBehavior
const delBehaviorFind = `              const updatedLog = behaviorLog.map((l: any) => l.id === logId ? { ...l, isDeleted: true } : l);`;
const delBehaviorReplace = `              const updatedLog = behaviorLog.map((l: any) => l.id === logId ? { ...l, isDeleted: true } : l);
              
              setBehaviorLog(updatedLog);
              setSchoolPortfolios((prev: any) => {
                  const newList = [...prev];
                  const idx = newList.findIndex((s: any) => s.fullName === selectedStudent);
                  if (idx !== -1) {
                      newList[idx] = { ...newList[idx], behaviorLog: updatedLog };
                  }
                  return newList;
              });`;
code = code.replace(delBehaviorFind, delBehaviorReplace);

fs.writeFileSync('src/App.tsx', code);


// Patch BehaviorEvalPanel.tsx
let panelCode = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

panelCode = panelCode.replace('group1.length > 0 ? group1.map', 'group1.length > 0 ? group1.sort((a,b) => a.score - b.score).map');
panelCode = panelCode.replace('group2.length > 0 ? group2.map', 'group2.length > 0 ? group2.sort((a,b) => a.score - b.score).map');
panelCode = panelCode.replace('group3.length > 0 ? group3.map', 'group3.length > 0 ? group3.sort((a,b) => a.score - b.score).map');
panelCode = panelCode.replace('group4.length > 0 ? group4.map', 'group4.length > 0 ? group4.sort((a,b) => a.score - b.score).map');
panelCode = panelCode.replace('group5.length > 0 ? group5.map', 'group5.length > 0 ? group5.sort((a,b) => a.score - b.score).map');

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', panelCode);

console.log("Patched App.tsx and BehaviorEvalPanel.tsx");
