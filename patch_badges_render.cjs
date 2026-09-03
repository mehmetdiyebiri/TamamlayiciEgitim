const fs = require('fs');
let code = fs.readFileSync('src/components/DevCardPanel.tsx', 'utf-8');

code = code.replace(
  "(devCardConfig.manualBadges || []).length > 0",
  "true" // Just to force it to render for debugging, or we just fix the array
);

fs.writeFileSync('src/components/DevCardPanel.tsx', code);
