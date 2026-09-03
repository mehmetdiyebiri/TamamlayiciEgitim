const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/App.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// Add imports
code = code.replace(
    /import \{ HızlıOkumaPanel \} from '\.\/components\/hizliokuma\/HızlıOkumaPanel';/,
    `import { HızlıOkumaPanel } from './components/hizliokuma/HızlıOkumaPanel';
import { AdminMitPanel } from './components/mit/AdminMitPanel';
import { StudentMitPanel } from './components/mit/StudentMitPanel';`
);

// Update Admin MIT tab
code = code.replace(
    /case 'mit':\s*return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">MİT Modülü<\/h2><p className="text-gray-500 mt-2">Öğrenci arayüzü yapım aşamasında...<\/p><\/div>;/,
    `case 'mit':
                                        return <AdminMitPanel state={state} actions={actions} />;`
);

// Update Student MIT tab
code = code.replace(
    /case 'mit':\s*return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">MİT Modülü<\/h2><p className="text-gray-500 mt-2">Öğrenci arayüzü yapım aşamasında...<\/p><\/div>;/,
    `case 'mit':
                                    return <StudentMitPanel state={state} actions={actions} />;`
);

fs.writeFileSync(filePath, code);
