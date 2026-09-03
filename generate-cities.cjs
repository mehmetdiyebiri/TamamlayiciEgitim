const fs = require('fs');
fetch('https://turkiyeapi.dev/api/v1/provinces').then(r => r.json()).then(d => {
  const data = d.data.map(p => ({
    name: p.name,
    districts: p.districts.map(dist => dist.name).sort()
  })).sort((a,b) => a.name.localeCompare(b.name, 'tr'));
  
  const content = 'export const CITIES = ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync('./src/lib/cities.ts', content);
  console.log("cities.ts generated!");
});
