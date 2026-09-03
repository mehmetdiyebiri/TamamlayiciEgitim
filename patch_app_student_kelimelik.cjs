const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet/src/App.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(
    /case 'kelimelik': return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">Kelimelik Modülü<\/h2><p className="text-gray-500 mt-2">Öğrenci arayüzü yapım aşamasında\.\.\.<\/p><\/div>;/g,
    'case \'kelimelik\': return <StudentHomePanel state={state} actions={actions} section="kelimelik" />;'
);

code = code.replace(
    /default: return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">Kelimelik Modülü<\/h2><p className="text-gray-500 mt-2">Öğrenci arayüzü yapım aşamasında\.\.\.<\/p><\/div>;/g,
    'default: return <StudentHomePanel state={state} actions={actions} section="kelimelik" />;'
);

fs.writeFileSync(filePath, code);
