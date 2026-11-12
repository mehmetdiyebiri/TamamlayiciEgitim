import { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { INITIAL_BEHAVIOR_CONFIG } from '../lib/constants';

export function DBPatches({ activeSchoolId }) {
  useEffect(() => {
    const patch = async () => {
      if (!activeSchoolId) return;
      const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
      const docRef = doc(db, sysColName, 'behaviorConfig');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        let updated = false;
        
        // 1. Rename BEYAZ KART to YEŞİL KART
        const whiteCard = data.cards.find(c => c.id === 'white');
        if (whiteCard && whiteCard.name === 'BEYAZ KART') {
          whiteCard.name = 'YEŞİL KART';
          whiteCard.score = 5;
          updated = true;
        }

        // 2. Remove YEŞİL KART (green)
        const initialLen = data.cards.length;
        data.cards = data.cards.filter(c => c.id !== 'green');
        if (data.cards.length !== initialLen) updated = true;

        // 3. Update SARI KART (yellow) to -2
        const yellowCard = data.cards.find(c => c.id === 'yellow');
        if (yellowCard && yellowCard.score !== -2) {
          yellowCard.score = -2;
          updated = true;
        }

        // 4. Update KIRMIZI KART (red) to -5
        const redCard = data.cards.find(c => c.id === 'red');
        if (redCard && redCard.score !== -5) {
          redCard.score = -5;
          updated = true;
        }

        // behaviors array updates
        if (data.behaviors) {
           if (data.behaviors.white) {
             data.behaviors.white.forEach(b => {
               if (b.text === "Haftalık +20 Puan Başarısı") {
                 b.text = "Haftalık +10 Puan Başarısı";
                 b.points = 5;
                 updated = true;
               }
               if (b.text === "Aylık +50 Puan Başarısı") {
                 b.text = "Aylık +25 Puan Başarısı";
                 b.points = 5;
                 updated = true;
               }
             });
           }

           // merge green into yellow
           if (data.behaviors.green) {
             if (!data.behaviors.yellow) data.behaviors.yellow = [];
             
             let maxId = data.behaviors.yellow.length > 0 ? Math.max(...data.behaviors.yellow.map(b => b.id)) : 0;
             data.behaviors.green.forEach(g => {
               maxId++;
               g.id = maxId;
               g.points = -2;
               data.behaviors.yellow.push(g);
             });
             delete data.behaviors.green;
             updated = true;
           }

           if (data.behaviors.yellow) {
             data.behaviors.yellow.forEach(y => {
                if (y.points === -3 || y.points === -1) {
                  y.points = -2;
                  updated = true;
                }
             });
           }

           if (data.behaviors.red) {
             data.behaviors.red.forEach(r => {
                if (r.points === -10) {
                  r.points = -5;
                  updated = true;
                }
             });
           }
        }

        if (updated) {
          console.log("Patching db behavior config", data);
          await setDoc(docRef, data);
        }
      }
    };
    patch();
  }, [activeSchoolId]);
  return null;
}
