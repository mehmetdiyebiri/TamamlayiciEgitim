import React, { useState } from 'react';
import { Lightbulb, Check, Trash2, Search, Filter } from 'lucide-react';

export const AdminIdeasPanel = ({ state, actions }: { state: any, actions: any }) => {
  const { ideas } = state;
  const [filter, setFilter] = useState('all'); // all, new, read
  const [search, setSearch] = useState('');

  const filteredIdeas = (ideas || [])
    .filter((idea: any) => {
      if (filter !== 'all' && idea.status !== filter) return false;
      if (search && !idea.text.toLowerCase().includes(search.toLowerCase()) && 
          !idea.studentName?.toLowerCase().includes(search.toLowerCase()) &&
          !idea.studentClass?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Ara (Öğrenci, sınıf, metin)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === 'new' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Yeni
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === 'read' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Okundu
            </button>
          </div>
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb size={14} className="text-amber-500" /> Toplam {filteredIdeas.length} Fikir
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredIdeas.map((idea: any) => (
          <div key={idea.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{idea.studentName || 'Bilinmiyor'}</h4>
                <div className="text-[11px] font-black uppercase text-gray-400 mt-1">{idea.studentClass || 'Sınıf Yok'}</div>
              </div>
              <div className={`text-[10px] uppercase font-black px-2 py-1 rounded-md ${idea.status === 'read' ? 'bg-gray-100 text-gray-500' : 'bg-rose-100 text-rose-600'}`}>
                {idea.status === 'read' ? 'Okundu' : 'Yeni'}
              </div>
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap flex-1 mb-6">
              {idea.text}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="text-xs font-medium text-gray-400">
                {new Date(idea.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="flex items-center gap-2">
                {idea.status !== 'read' && (
                  <button
                    onClick={() => actions.markIdeaRead(idea.id)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Okundu Olarak İşaretle"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => actions.deleteIdea(idea.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredIdeas.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400 flex flex-col items-center justify-center">
            <Lightbulb size={48} className="mb-4 text-gray-200" />
            <p className="font-medium text-gray-500">Gösterilecek fikir bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};
