const fs = require('fs');

function updateMetronomeButton(filePath, size) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const regex = /<button onClick=\{\(\) => \{ setUseMetronome\(!useMetronome\); if\(!useMetronome\) metronome\.initContext\(\); \}\} className=\{`([^`]+)`\}(?: title="Metronom")?>[\s\S]*?<\/button>/;
    content = content.replace(regex, (match, className) => {
        return `<button onClick={() => { setUseMetronome(!useMetronome); if(!useMetronome) metronome.initContext(); }} className={\`${className}\`}>
            Metronom {useMetronome ? <Volume2 size={${size}}/> : <VolumeX size={${size}}/>}
        </button>`;
    });
    fs.writeFileSync(filePath, content);
}

try {
    updateMetronomeButton('src/components/hizliokuma/BlockReading.tsx', 16);
    updateMetronomeButton('src/components/hizliokuma/ShadowReading.tsx', 16);
    updateMetronomeButton('src/components/hizliokuma/Grouping.tsx', 18);
    updateMetronomeButton('src/components/hizliokuma/Tachistoscope.tsx', 16);
    
    let blockContent = fs.readFileSync('src/components/hizliokuma/BlockReading.tsx', 'utf-8');
    const oldSelect = `<select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">\n                        <option value={1500}>Kolay (1.5 sn)</option>\n                        <option value={1000}>Orta (1.0 sn)</option>\n                        <option value={500}>Zor (0.5 sn)</option>\n                        <option value={300}>Çok Zor (0.3 sn)</option>\n                    </select>`;
    const newSelect = `<select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 outline-none">\n                        <option value={1000}>1 Saniye</option>\n                        <option value={750}>0.75 Saniye</option>\n                        <option value={500}>0.50 Saniye</option>\n                        <option value={250}>0.25 Saniye</option>\n                    </select>`;
    
    // Using Regex to be safe against spacing issues
    const regexSelect = /<select value=\{speed\}[\s\S]*?<\/select>/;
    blockContent = blockContent.replace(regexSelect, newSelect);

    fs.writeFileSync('src/components/hizliokuma/BlockReading.tsx', blockContent);
    
    console.log("Success");
} catch(e) {
    console.error(e);
}
