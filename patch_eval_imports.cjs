const fs = require('fs');
let code = fs.readFileSync('src/components/EvaluationPanel.tsx', 'utf-8');

code = code.replace("import { User, Download, PenTool, School, Loader2 } from 'lucide-react';", "import { User, Download, PenTool, School, Loader2, Award } from 'lucide-react';");

fs.writeFileSync('src/components/EvaluationPanel.tsx', code);
console.log("Patched EvaluationPanel imports");
