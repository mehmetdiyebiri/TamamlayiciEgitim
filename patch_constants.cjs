const fs = require('fs');

let code = fs.readFileSync('src/lib/constants.ts', 'utf-8');

// 1. cards config
code = code.replace(
  "{ id: 'white', name: 'BEYAZ KART', score: 10, color: 'bg-white text-gray-800', border: 'border-blue-200', icon: 'Award', compensation: 0, desc: \"Üstün başarı ve model davranışlar\" },",
  "{ id: 'white', name: 'YEŞİL KART', score: 5, color: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-400', icon: 'Award', compensation: 0, desc: \"Üstün başarı ve model davranışlar\" },"
);

code = code.replace(
  "{ id: 'green', name: 'YEŞİL KART', score: -1, color: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-400', icon: 'Meh', compensation: 1, desc: \"Küçük ihlal / düzeni bozan davranışlar\" },\n",
  ""
);

code = code.replace(
  "{ id: 'yellow', name: 'SARI KART', score: -3, color: 'bg-yellow-50 text-yellow-800', border: 'border-yellow-400', icon: 'AlertTriangle', compensation: 3, desc: \"Tekrarlayan davranışlar / akışı bozanlar\" },",
  "{ id: 'yellow', name: 'SARI KART', score: -2, color: 'bg-yellow-50 text-yellow-800', border: 'border-yellow-400', icon: 'AlertTriangle', compensation: 2, desc: \"İhlal ve düzeni bozan davranışlar\" },"
);

code = code.replace(
  "{ id: 'red', name: 'KIRMIZI KART', score: -10, color: 'bg-red-50 text-red-800', border: 'border-red-400', icon: 'AlertOctagon', compensation: 10, desc: \"Ciddi ihlal / güvenlik riski / kasıtlı eylemler\" }",
  "{ id: 'red', name: 'KIRMIZI KART', score: -5, color: 'bg-red-50 text-red-800', border: 'border-red-400', icon: 'AlertOctagon', compensation: 5, desc: \"Ciddi ihlal / güvenlik riski / kasıtlı eylemler\" }"
);

// 2. behaviors array
code = code.replace(
  "{ id: 1, text: \"Haftalık +20 Puan Başarısı\", points: 10, task: \"Otomatik Alır\", isAuto: true },",
  "{ id: 1, text: \"Haftalık +10 Puan Başarısı\", points: 5, task: \"Otomatik Alır\", isAuto: true },"
);

code = code.replace(
  "{ id: 2, text: \"Aylık +50 Puan Başarısı\", points: 10, task: \"Otomatik Alır\", isAuto: true },",
  "{ id: 2, text: \"Aylık +25 Puan Başarısı\", points: 5, task: \"Otomatik Alır\", isAuto: true },"
);

// merge green into yellow
let greenMatch = code.match(/'green': \[([\s\S]*?)\],/);
let yellowMatch = code.match(/'yellow': \[([\s\S]*?)\],/);

if (greenMatch && yellowMatch) {
  let greenItems = greenMatch[1].trim().split('\n').map(l => l.trim()).filter(l => l);
  let yellowItems = yellowMatch[1].trim().split('\n').map(l => l.trim()).filter(l => l);
  
  // Extract objects and re-id them
  let allItems = [];
  let idCounter = 1;
  const extractItems = (itemsText) => {
    return itemsText.map(line => {
      let match = line.match(/\{ id: \d+, text: "(.*?)", points: (.*?), task: "(.*?)" \}/);
      if (match) {
        return `{ id: ${idCounter++}, text: "${match[1]}", points: -2, task: "${match[3]}" }`;
      }
      return null;
    }).filter(i => i);
  };
  
  allItems = [...extractItems(greenItems), ...extractItems(yellowItems)];
  
  let newYellowStr = `'yellow': [\n            ${allItems.join(',\n            ')}\n        ],`;
  
  // Replace yellow block
  code = code.replace(/'yellow': \[[\s\S]*?\],/, newYellowStr);
  
  // Remove green block
  code = code.replace(/        'green': \[[\s\S]*?\],\n/, "");
}

fs.writeFileSync('src/lib/constants.ts', code);
console.log("constants.ts patched!");
