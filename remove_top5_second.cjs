const fs = require('fs');
let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

code = code.replace('{renderTop5()}', '');

fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
