const fs = require('fs');
let code = fs.readFileSync('src/components/DevCardPanel.tsx', 'utf-8');

code = code.replace(
  "{{(devCardConfig.manualBadges || []).length > 0 && (",
  "{(devCardConfig.manualBadges || []).length > 0 && ("
);

fs.writeFileSync('src/components/DevCardPanel.tsx', code);
