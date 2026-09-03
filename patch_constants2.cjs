const fs = require('fs');
let code = fs.readFileSync('src/lib/constants.ts', 'utf-8');

code = code.replace(
  "titles: [",
  "manualBadges: [\n        { id: 1, name: 'Lojistik Sorumlusu' },\n        { id: 2, name: 'Dijital Düzenleyici' },\n        { id: 3, name: 'Zaman Yönetici' },\n        { id: 4, name: 'Nezaket Elçisi' },\n        { id: 5, name: 'Teknik Danışman' }\n    ],\n    titles: ["
);

fs.writeFileSync('src/lib/constants.ts', code);
