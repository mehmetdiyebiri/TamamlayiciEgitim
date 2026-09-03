const fs = require('fs');
const file = 'src/components/hizliokuma/ShadowReading.tsx';
let content = fs.readFileSync(file, 'utf-8');

const search = `<select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={1500}>Yavaş (1.5s)</option>
                        <option value={1000}>Normal (1.0s)</option>
                        <option value={600}>Hızlı (0.6s)</option>
                        <option value={300}>Çok Hızlı (0.3s)</option>
                    </select>`;
const replacement = `<select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">
                        <option value={1500}>1.50 Saniye</option>
                        <option value={1250}>1.25 Saniye</option>
                        <option value={1000}>1 Saniye</option>
                        <option value={750}>0.75 Saniye</option>
                        <option value={500}>0.50 Saniye</option>
                        <option value={250}>0.25 Saniye</option>
                    </select>`;

content = content.replace(search, replacement);
fs.writeFileSync(file, content);
console.log('Patched speed options');
