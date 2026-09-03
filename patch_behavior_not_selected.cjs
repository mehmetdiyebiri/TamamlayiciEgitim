const fs = require('fs');

let code = fs.readFileSync('src/components/BehaviorEvalPanel.tsx', 'utf-8');

const target = `  if (!selectedStudent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Frown className="text-gray-300" size={32} /></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Öğrenci Seçiniz</h3>
        <p className="text-gray-500 text-sm">Davranış notunu görüntülemek ve değerlendirmek için bir öğrenci seçiniz.</p>
      </div>
    );
  }`;

const replacement = `  if (!selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Frown className="text-gray-300" size={32} /></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Öğrenci Seçiniz</h3>
          <p className="text-gray-500 text-sm mb-6">Davranış notunu görüntülemek ve değerlendirmek için bir öğrenci seçiniz.</p>
        </div>
        {renderTop5()}
      </div>
    );
  }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/BehaviorEvalPanel.tsx', code);
  console.log("Patched!");
} else {
  console.log("Target not found!");
}
