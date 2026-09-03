const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const importAdminKelimelik = `import { AdminKelimelikPanel } from './components/AdminKelimelikPanel';`;
const newImports = `import { AdminKelimelikPanel } from './components/AdminKelimelikPanel';
import { StudentHizliOkumaPanel } from './components/StudentHizliOkumaPanel';
import { AdminHizliOkumaPanel } from './components/AdminHizliOkumaPanel';`;

code = code.replace(importAdminKelimelik, newImports);

code = code.replace(
    `case 'hizliokuma': return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">Hızlı Okuma Modülü</h2><p className="text-gray-500 mt-2">Öğrenci arayüzü yapım aşamasında...</p></div>;`,
    `case 'hizliokuma': return <StudentHizliOkumaPanel state={state} actions={actions} />;`
);

code = code.replace(
    `case 'hizliokuma': return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">Hızlı Okuma Modülü</h2><p className="text-gray-500 mt-2">Yapım aşamasında...</p></div>;`,
    `case 'hizliokuma': return <AdminHizliOkumaPanel state={state} actions={actions} />;`
);

fs.writeFileSync('src/App.tsx', code);
