const fs = require('fs');
const file = 'src/components/hizliokuma/Tachistoscope.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
    /<select value=\{speed\} onChange=\{\(e\) => setSpeed\(Number\(e\.target\.value\)\)\} className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">[\s\S]*?<\/select>/,
    `<select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={100}>0.10 Saniye</option>
                        <option value={250}>0.25 Saniye</option>
                        <option value={500}>0.50 Saniye</option>
                        <option value={750}>0.75 Saniye</option>
                        <option value={1000}>1 Saniye</option>
                    </select>`
);

fs.writeFileSync(file, content);
