const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const newFunc = `      handleToggleBadge: async (badgeId: string | number) => {
          if (!selectedStudent || !activeSchoolId) return;
          try {
              const currentBadges = devCardData.manualBadges || [];
              let updatedBadges = [...currentBadges];
              if (updatedBadges.includes(badgeId)) {
                  updatedBadges = updatedBadges.filter(id => id !== badgeId);
              } else {
                  updatedBadges.push(badgeId);
              }
              const { doc, updateDoc, setDoc, getDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = \`portfolios_\${activeSchoolId}\`;
              const docRef = doc(db, colName, selectedStudent);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  await updateDoc(docRef, { manualBadges: updatedBadges });
              } else {
                  await setDoc(docRef, { manualBadges: updatedBadges });
              }
              showToast("Rozet güncellendi.", "success");
          } catch (error) {
              console.error("Error toggling badge:", error);
              showToast("Rozet güncellenirken bir hata oluştu.", "error");
          }
      },
`;

code = code.replace(
  "handleDeleteActivity: async (activityId: string) => {",
  newFunc + "      handleDeleteActivity: async (activityId: string) => {"
);

fs.writeFileSync('src/App.tsx', code);
console.log("handleToggleBadge added!");
