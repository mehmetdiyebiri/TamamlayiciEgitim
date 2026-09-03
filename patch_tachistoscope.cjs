const fs = require('fs');
let content = fs.readFileSync('src/components/hizliokuma/Tachistoscope.tsx', 'utf8');

// Add imports
if (!content.includes('Volume2')) {
    content = content.replace('lucide-react\';', 'lucide-react\';\nimport { Volume2, VolumeX } from \'lucide-react\';');
}
if (!content.includes('import { metronome }')) {
    content = content.replace('import { Volume2, VolumeX } from \'lucide-react\';', 'import { Volume2, VolumeX } from \'lucide-react\';\nimport { metronome } from \'../../utils/metronome\';');
}

// Add state
if (!content.includes('const [useMetronome')) {
    content = content.replace('const [result, setResult] = useState<boolean | null>(null);', 'const [result, setResult] = useState<boolean | null>(null);\n    const [useMetronome, setUseMetronome] = useState(false);');
}

fs.writeFileSync('src/components/hizliokuma/Tachistoscope.tsx', content);
