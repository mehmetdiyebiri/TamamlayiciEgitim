const fs = require('fs');
let code = fs.readFileSync('src/components/DevCardPanel.tsx', 'utf-8');

code = code.replace(
  "{devCardConfig.manualBadges.map((badge: any) => {",
  "{(devCardConfig.manualBadges || []).map((badge: any) => {"
);
code = code.replace(
  "true && (",
  "{(devCardConfig.manualBadges || []).length > 0 && ("
);

fs.writeFileSync('src/components/DevCardPanel.tsx', code);
