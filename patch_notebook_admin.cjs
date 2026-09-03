const fs = require('fs');
let code = fs.readFileSync('src/components/StudentDigitalNotebook.tsx', 'utf-8');

code = code.replace(
`  if (loading) {
    return <div className="p-12 text-center text-emerald-600 font-bold flex items-center justify-center gap-3">
        <Loader2 className="animate-spin" size={24} />
        Asistan Yükleniyor...
    </div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-6 pb-12 animate-in fade-in duration-500">
        <div className="flex flex-col h-[700px] max-h-[80vh] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">`,
`  if (loading) {
    return <div className="p-12 text-center text-emerald-600 font-bold flex items-center justify-center gap-3">
        <Loader2 className="animate-spin" size={24} />
        Asistan Yükleniyor...
    </div>;
  }

  if (!isStudent && selectedStudent) {
    return (
        <div className="max-w-5xl mx-auto mt-6 space-y-6 pb-12 animate-in fade-in duration-500">
          <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FileText className="text-indigo-600" size={24} />
                Öğrencinin Yaptığı Araştırmalar (Dijital Defter)
            </h3>
            {savedResearches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedResearches.map((r, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="font-bold text-gray-800 mb-1">{r.title || 'İsimsiz Araştırma'}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(r.date).toLocaleDateString('tr-TR')}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 text-center py-6 border border-dashed border-gray-200 rounded-2xl">
                    Öğrencinin henüz dijital defterde kaydettiği bir araştırma başlığı bulunmuyor.
                </div>
            )}
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-6 pb-12 animate-in fade-in duration-500">
        <div className="flex flex-col h-[700px] max-h-[80vh] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">`
);

fs.writeFileSync('src/components/StudentDigitalNotebook.tsx', code);
