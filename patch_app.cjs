const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "case 'socialclubs': return <StudentHomePanel state={state} actions={actions} section=\"socialclubs\" />;",
  "case 'socialclubs': return <SocialClubsPanel state={state} actions={actions} />;"
);

fs.writeFileSync('src/App.tsx', code);
