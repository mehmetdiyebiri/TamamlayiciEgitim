const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

// Find the Manuel Rozetler section
const badgeSectionMatch = code.match(/\{\/\* Bottom Section: Achievements & Titles \*\/\}\s*<div className="bg-white p-10 rounded-\[40px\] border border-gray-200 shadow-sm space-y-10">[\s\S]*?(?=<div className="bg-white p-10 rounded-\[40px\] border border-gray-200 shadow-sm space-y-10">\s*<div className="flex items-center gap-4">\s*<div className="w-12 h-12 rounded-2xl bg-orange-50)/);

if (badgeSectionMatch) {
    let badgeSection = badgeSectionMatch[0];
    code = code.replace(badgeSection, ""); // Remove from bottom

    // Insert at the top of devcard settings
    const insertTarget = `<h2 className="text-3xl font-black text-gray-800 tracking-tight">Gelişim Kartı Konfigürasyonu</h2>\n                    <p className="text-gray-500 font-medium mt-1">Seviyeler, çarpanlar ve puanlama kurallarını yönetin.</p>\n                </div>`;
    
    badgeSection = badgeSection.replace("Manuel Rozetler", "Gelişim Kartı Rozet Ayarları (Örn: Lojistik Sorumlusu)");
    badgeSection = badgeSection.replace("{/* Bottom Section: Achievements & Titles */}", "{/* Rozet Ayarları */}");
    
    code = code.replace(insertTarget, insertTarget + "\n\n" + badgeSection);
    
    fs.writeFileSync('src/components/AdminPanel.tsx', code);
    console.log("Patched AdminPanel.tsx");
} else {
    console.log("Could not find badge section in AdminPanel.tsx");
}
