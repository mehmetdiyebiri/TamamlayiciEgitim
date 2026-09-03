const fs = require('fs');
const path = '/app/applet/src/components/AdminHizliOkumaPanel.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
    /\{classes\?\.map\(\(c: any\) => \(\s*<option key=\{c\.id\} value=\{c\.id\}>\{c\.name\}<\/option>\s*\)\)\}/m,
    `{classes && Object.keys(classes).map((c: any) => (
                            <option key={c} value={c}>{c}</option>
                        ))}`
);

fs.writeFileSync(path, code);
