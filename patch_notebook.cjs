const fs = require('fs');
const path = '/app/applet/src/components/StudentDigitalNotebook.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
    /if \(snap\.exists\(\)\) \{\s*if \(snap\.data\(\)\.messages\) \{\s*setMessages\(snap\.data\(\)\.messages\);\s*\} else \{\s*setMessages\(\[\{ role: 'model', text: 'Merhaba! Ben senin eğitim ve araştırma asistanınım. Hangi konuda araştırma yapmak istersin\?' \}\]\);\s*\}\s*if \(snap\.data\(\)\.savedResearches\) \{/m,
    `if (snap.exists()) {
          setMessages([{ role: 'model', text: 'Merhaba! Ben senin eğitim ve araştırma asistanınım. Hangi konuda araştırma yapmak istersin?' }]);
          if (snap.data().savedResearches) {`
);

fs.writeFileSync(path, code);
