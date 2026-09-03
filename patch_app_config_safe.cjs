const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "setDevCardConfig({ ...INITIAL_DEV_CARD_CONFIG, ...snap.data() });",
  "const data = snap.data();\n                      setDevCardConfig({ \n                          ...INITIAL_DEV_CARD_CONFIG, \n                          ...data,\n                          manualBadges: (data.manualBadges && data.manualBadges.length > 0) ? data.manualBadges : INITIAL_DEV_CARD_CONFIG.manualBadges\n                      });"
);

fs.writeFileSync('src/App.tsx', code);
