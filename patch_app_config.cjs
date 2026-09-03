const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "setDevCardConfig(snap.data());",
  "setDevCardConfig({ ...INITIAL_DEV_CARD_CONFIG, ...snap.data() });"
);

fs.writeFileSync('src/App.tsx', code);
