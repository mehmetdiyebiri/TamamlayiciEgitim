const fs = require('fs');
const path = '/app/applet/src/components/AdminHizliOkumaPanel.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
    "const [selectedClass, setSelectedClass] = useState(classes && classes.length > 0 ? classes[0].id : 'Tümü');",
    "const [selectedClass, setSelectedClass] = useState(classes && Object.keys(classes).length > 0 ? Object.keys(classes)[0] : 'Tümü');"
);

code = code.replace(
    "{classes?.map((c: any) => (\\n                            <option key={c.id} value={c.id}>{c.name}</option>\\n                        ))}",
    "{classes && Object.keys(classes).map((c: any) => (\\n                            <option key={c} value={c}>{c}</option>\\n                        ))}"
);

fs.writeFileSync(path, code);
