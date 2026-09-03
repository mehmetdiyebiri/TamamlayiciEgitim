const fs = require('fs');
let code = fs.readFileSync('src/components/SocialClubsPanel.tsx', 'utf-8');

code = code.replace(
  "                                    <div className=\"bg-white p-4 rounded-2xl border border-blue-100 mt-4\">",
  "                                    </div>\n                                    <div className=\"bg-white p-4 rounded-2xl border border-blue-100 mt-4\">"
);

fs.writeFileSync('src/components/SocialClubsPanel.tsx', code);
