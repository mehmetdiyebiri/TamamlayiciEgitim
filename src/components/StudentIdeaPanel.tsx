import React, { useState } from 'react';
import { Lightbulb, Send } from 'lucide-react';

export const StudentIdeaPanel = ({ state, actions }: { state: any, actions: any }) => {
  const [ideaText, setIdeaText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;
    actions.submitIdea(ideaText);
    setIdeaText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Lightbulb size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-md mb-4 border border-white/20">
            <Lightbulb size={16} /> Bir Fikrim Var
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">Okulumuz İçin Bir Fikrin Mi Var?</h2>
          <p className="text-indigo-100 font-medium">
            Öğrenci olarak senin fikirlerin bizim için çok değerli. Okulumuzu daha iyi bir yer yapmak için aklına gelen her türlü projeyi, öneriyi veya düşünceyi buradan bizimle paylaşabilirsin.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 block">Fikrini Yaz</label>
            <textarea
              className="w-full h-48 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none shadow-sm"
              placeholder="Öğretmenim, bence okulumuzda şöyle bir etkinlik yapabiliriz..."
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!ideaText.trim()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black transition-all hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <Send size={18} /> İlet
            </button>
          </div>
        </form>
      </div>
      
      {state.ideas && state.ideas.filter((i:any) => i.studentId === state.currentUser?.id).length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-4xl mt-8">
            <h3 className="text-lg font-black text-gray-800 mb-6">Gönderdiğin Fikirler</h3>
            <div className="space-y-4">
                {state.ideas.filter((i:any) => i.studentId === state.currentUser?.id)
                    .sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((idea:any) => (
                    <div key={idea.id} className="p-5 border border-gray-100 rounded-2xl bg-gray-50 flex gap-4">
                        <div className="shrink-0 pt-1">
                            <div className={`w-3 h-3 rounded-full ${idea.status === 'read' ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">{idea.text}</div>
                            <div className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-wider flex items-center gap-2">
                                <span>{new Date(idea.createdAt).toLocaleString('tr-TR')}</span>
                                <span>•</span>
                                <span className={idea.status === 'read' ? 'text-green-600' : 'text-amber-500'}>
                                    {idea.status === 'read' ? 'Okundu' : 'İletildi (Bekliyor)'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
