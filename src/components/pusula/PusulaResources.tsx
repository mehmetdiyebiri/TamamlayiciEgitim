import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  Search, 
  Trash2, 
  Layers
} from 'lucide-react';
import { PusulaStudentProfile, PusulaTopicProgress } from '../../types/pusula';
import { PUSULA_ALL_CURRICULUMS, PUSULA_RESOURCE_POOL } from '../../data/pusulaCurriculum';

interface PusulaResourcesProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
}

export const PusulaResources: React.FC<PusulaResourcesProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(profile.currentCategory || 'YKS');
  const availableCurriculums = PUSULA_ALL_CURRICULUMS[selectedCategory] || {};
  const subjectList = Object.keys(availableCurriculums);
  const [activeSubject, setActiveSubject] = useState<string>(subjectList[0] || 'Matematik');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResourceModal, setShowResourceModal] = useState(false);

  // New resource creation toolbar states
  const [resPrefix, setResPrefix] = useState<string>('');
  const [resLevel, setResLevel] = useState<string>('Özel');
  const [newResInput, setNewResInput] = useState<string>('');
  const [showLevelOptions, setShowLevelOptions] = useState<boolean>(false);

  // Current subject topics
  const currentSubjectData = availableCurriculums[activeSubject] || { resources: [], topics: [] };
  const currentTopics = currentSubjectData.topics || [];

  // Active assigned resources for this subject
  const defaultSubjectResources = currentSubjectData.resources || [];
  const assignedResources: string[] = profile.subjectResources?.[activeSubject] || defaultSubjectResources;

  // Filter topics
  const filteredTopics = currentTopics.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.group && t.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get progress for a topic
  const getTopicProgress = (topicName: string): PusulaTopicProgress => {
    return profile.curriculumProgress?.[activeSubject]?.[topicName] || {
      seen: false,
      status: 'unstarted',
      solvedQuestions: 0,
      targetQuestions: 150,
      resources: [],
      resourceStatus: {}
    };
  };

  // Update progress for a topic
  const setTopicProgress = (topicName: string, updates: Partial<PusulaTopicProgress>) => {
    const existing = getTopicProgress(topicName);
    const updatedSub = {
      ...(profile.curriculumProgress?.[activeSubject] || {}),
      [topicName]: { ...existing, ...updates }
    };
    const updatedProgress = {
      ...(profile.curriculumProgress || {}),
      [activeSubject]: updatedSub
    };
    onUpdateProfile({ curriculumProgress: updatedProgress });
  };

  // Update status of an assigned resource on a specific topic
  const setTopicResourceStatus = (topicName: string, resName: string, status: 'done' | 'half' | 'planned' | 'none') => {
    const currentProg = getTopicProgress(topicName);
    const currentStatuses = currentProg.resourceStatus || {};
    const updatedStatuses = {
      ...currentStatuses,
      [resName]: status
    };
    setTopicProgress(topicName, {
      resourceStatus: updatedStatuses
    });
  };

  // Handle adding a new resource to this subject
  const handleAddResource = () => {
    const trimmed = newResInput.trim();
    if (!trimmed) return;
    const fullName = resPrefix ? `${resPrefix} - ${trimmed}` : trimmed;
    if (assignedResources.includes(fullName)) {
      return;
    }
    const updated = [...assignedResources, fullName];
    onUpdateProfile({
      subjectResources: {
        ...(profile.subjectResources || {}),
        [activeSubject]: updated
      }
    });
    setNewResInput('');
    setShowLevelOptions(false);
  };

  // Handle deleting a resource from this subject
  const handleDeleteResource = (resourceName: string) => {
    if (!window.confirm(`"${resourceName}" kaynağını bu dersten kaldırmak istediğinize emin misiniz?`)) return;
    const updated = assignedResources.filter(r => r !== resourceName);
    onUpdateProfile({
      subjectResources: {
        ...(profile.subjectResources || {}),
        [activeSubject]: updated
      }
    });
  };

  // Subject completion stats
  let subjectCompletedCount = 0;
  currentTopics.forEach(t => {
    if (profile.curriculumProgress?.[activeSubject]?.[t.name]?.status === 'completed') {
      subjectCompletedCount++;
    }
  });
  const subjectPercent = currentTopics.length > 0 ? Math.round((subjectCompletedCount / currentTopics.length) * 100) : 0;

  // Resource pool for current subject
  const poolCategory = selectedCategory.includes('LGS') || ['5. Sınıf', '6. Sınıf', '7. Sınıf', '8. Sınıf'].includes(selectedCategory)
    ? 'Ortaokul'
    : selectedCategory.includes('KPSS') 
      ? 'KPSS' 
      : selectedCategory.includes('AGS') 
        ? 'AGS' 
        : 'Lise';
  
  const poolForSubject = PUSULA_RESOURCE_POOL[poolCategory]?.[activeSubject] || {};

  return (
    <div className="space-y-6">
      {/* Category & Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <BookOpen size={22} className="text-purple-600" />
            Konu &amp; Kaynak Takip Sistemi
          </h2>
          <p className="text-xs font-semibold text-gray-400">
            Öğrencinin müfredat tamamlama durumunu, çözdüğü soru sayılarını ve kaynak kitaplarını yönetin.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-500">Müfredat:</span>
          <select 
            value={selectedCategory} 
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              const newSubs = Object.keys(PUSULA_ALL_CURRICULUMS[e.target.value] || {});
              setActiveSubject(newSubs[0] || '');
              onUpdateProfile({ currentCategory: e.target.value as any });
            }}
            className="bg-gray-50 border border-gray-200 py-2 px-3.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:ring-4 focus:ring-purple-500/10 cursor-pointer shadow-sm"
          >
            {Object.keys(PUSULA_ALL_CURRICULUMS).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button 
            onClick={() => setShowResourceModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-purple-800 font-bold text-xs hover:bg-purple-100 transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles size={14} className="text-purple-600" />
            Kaynak Öneri Havuzu
          </button>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto scrollbar-hide flex gap-2">
        {subjectList.map(sub => {
          let countDone = 0;
          const topics = availableCurriculums[sub]?.topics || [];
          topics.forEach(t => {
            if (profile.curriculumProgress?.[sub]?.[t.name]?.status === 'completed') countDone++;
          });
          const pct = topics.length > 0 ? Math.round((countDone / topics.length) * 100) : 0;

          return (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeSubject === sub 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
              }`}
            >
              <span>{sub}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                activeSubject === sub ? 'bg-purple-800 text-purple-100' : 'bg-gray-200 text-gray-600'
              }`}>
                %{pct}
              </span>
            </button>
          );
        })}
      </div>

      {/* Yeni Kaynak Ekleme ve Yönetme Toolbar & Panel */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
              <Plus size={16} className="text-purple-600" />
              <span>{activeSubject} İçin Yeni Kaynak Ekle</span>
            </h3>
          </div>

          {/* Toolbar Form */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-1 lg:max-w-3xl">
            {/* 1. ADIM: Sınav Seçicisi */}
            <select 
              value={resPrefix}
              onChange={(e) => setResPrefix(e.target.value)}
              className="bg-gray-50 border border-gray-200 py-2 px-3 rounded-xl text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 shrink-0 cursor-pointer shadow-2xs"
            >
              <option value="">Sınav Türü...</option>
              <option value="TYT">TYT</option>
              <option value="AYT">AYT</option>
              <option value="TYT-AYT">TYT-AYT</option>
              <option value="LGS">LGS</option>
              <option value="KPSS">KPSS</option>
              <option value="AGS">AGS</option>
            </select>

            {/* 2. ADIM: Akıllı Seviye / Öneri Havuzu */}
            <div className="relative shrink-0">
              <select 
                value={resLevel}
                onChange={(e) => {
                  const val = e.target.value;
                  setResLevel(val);
                  if (val === 'Kolay' || val === 'Orta' || val === 'Zor') {
                    setShowLevelOptions(true);
                  } else {
                    setShowLevelOptions(false);
                  }
                }}
                className="bg-gray-50 border border-gray-200 py-2 px-3 rounded-xl text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-2xs"
              >
                <option value="Özel">Seviye Önerisi...</option>
                <option value="Kolay">🟢 Kolay Seviye</option>
                <option value="Orta">🟡 Orta Seviye</option>
                <option value="Zor">🔴 Zor Seviye</option>
                <option value="Özel">✍️ Manuel Giriş</option>
              </select>
            </div>

            {/* 3. ADIM: Dinamik Kaynak Inputu */}
            <div className="relative flex-1 min-w-[200px]">
              <input 
                type="text" 
                value={newResInput}
                onChange={(e) => setNewResInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddResource();
                  }
                }}
                placeholder="Kaynak kitap yazın (Örn: 3D Soru Bankası, Limit...)"
                className="w-full bg-gray-50 border border-gray-200 py-2 px-3.5 rounded-xl text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-2xs"
              />

              {/* Level Quick Pick Dropdown */}
              {showLevelOptions && (resLevel === 'Kolay' || resLevel === 'Orta' || resLevel === 'Zor') && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-gray-200 rounded-xl shadow-xl p-2 space-y-1 animate-in fade-in duration-150 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold text-gray-400 border-b border-gray-100">
                    <span>{resLevel} Seviye Önerileri ({activeSubject}):</span>
                    <button 
                      type="button" 
                      onClick={() => setShowLevelOptions(false)}
                      className="text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  {(poolForSubject[resLevel as 'Kolay' | 'Orta' | 'Zor'] || []).length === 0 ? (
                    <div className="p-2 text-xs text-gray-400 italic">Bu seviyede öneri listelenmedi, lütfen adını yazın.</div>
                  ) : (
                    (poolForSubject[resLevel as 'Kolay' | 'Orta' | 'Zor'] || []).map(bk => (
                      <button
                        key={bk}
                        type="button"
                        onClick={() => {
                          setNewResInput(bk);
                          setShowLevelOptions(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span>{bk}</span>
                        <span className="text-[10px] text-purple-600 opacity-0 group-hover:opacity-100">Seç</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 4. ADIM: Ekleme Butonu */}
            <button 
              type="button"
              onClick={handleAddResource}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:shadow shrink-0 cursor-pointer"
            >
              <Plus size={15} />
              <span>Ekle</span>
            </button>
          </div>
        </div>

        {/* Bu Dersteki Kaynakları Yönet Kartı */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-dashed border-slate-300 space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700">
              <Layers size={15} className="text-purple-600" />
              <span>Bu Dersteki Kaynakları Yönet ({assignedResources.length})</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Tanımladığınız her kaynak aşağıdaki konularda ayrı buton olarak takip edilir.
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap min-h-[32px]">
            {assignedResources.length === 0 ? (
              <span className="text-xs text-gray-400 italic">
                Bu derse henüz kaynak eklenmemiş. Yukarıdaki alandan sınav türü ve kaynak adı girerek ekleyebilirsiniz.
              </span>
            ) : (
              assignedResources.map(res => (
                <span 
                  key={res} 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-bold text-purple-900 shadow-2xs group hover:border-purple-400 transition-all"
                >
                  <span>{res}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteResource(res)}
                    className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                    title="Kaynağı bu dersten kaldır"
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Progress & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-sm">
            %{subjectPercent}
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">{activeSubject} Konuları İlerlemesi</h4>
            <p className="text-xs text-gray-400 font-semibold">{subjectCompletedCount} / {currentTopics.length} konu tamamlandı</p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Konu ara..."
            className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Topics List with Interactive Assigned Resources */}
      <div className="space-y-3">
        {filteredTopics.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 text-gray-400">
            Aramanıza uygun konu bulunamadı.
          </div>
        ) : (
          filteredTopics.map((topic, idx) => {
            const prog = getTopicProgress(topic.name);

            return (
              <div 
                key={topic.name}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Topic Info & Source Badges (İşaretlenen yer) */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-gray-400">#{idx + 1}</span>
                    <h4 className="font-bold text-base text-gray-900 leading-tight">{topic.name}</h4>
                    {topic.group && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {topic.group}
                      </span>
                    )}
                  </div>

                  {/* Çalışma ve Kaynak Durumu: Konu Çalışması + Eklenen Kaynaklar */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {/* 1. Konu Çalışması Durum Butonu */}
                    <button
                      type="button"
                      onClick={() => {
                        const nextMap: Record<string, PusulaTopicProgress['status']> = {
                          'unstarted': 'in_progress',
                          'in_progress': 'completed',
                          'completed': 'needs_review',
                          'needs_review': 'unstarted'
                        };
                        const next = nextMap[prog.status] || 'unstarted';
                        setTopicProgress(topic.name, { status: next, seen: next !== 'unstarted' });
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border ${
                        prog.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : prog.status === 'in_progress'
                          ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                          : prog.status === 'needs_review'
                          ? 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                      title="Konu Çalışması Durumu: Tıklayarak değiştirin (Başlanmadı -> Çalışılıyor -> Bitti -> Tekrar)"
                    >
                      <BookOpen size={13} className={prog.status === 'completed' ? 'text-emerald-600' : prog.status === 'in_progress' ? 'text-amber-600' : 'text-gray-400'} />
                      <span>Konu Çalışması</span>
                      {prog.status === 'completed' && <CheckCircle2 size={13} className="text-emerald-600 ml-0.5" />}
                      {prog.status === 'in_progress' && <Clock size={13} className="text-amber-600 ml-0.5" />}
                      {prog.status === 'needs_review' && <RotateCcw size={13} className="text-purple-600 ml-0.5" />}
                    </button>

                    {/* 2. Eklenen Kaynaklar (Kullanıcının işaretlediği yere eklenen butonlar) */}
                    {assignedResources.map(res => {
                      const resUpper = res.toUpperCase();
                      const topicGroup = (topic.group || '').toUpperCase();
                      if (!resUpper.includes('TYT-AYT') && !resUpper.includes('TYT/AYT')) {
                        if (resUpper.startsWith('TYT') && topicGroup === 'AYT') return null;
                        if (resUpper.startsWith('AYT') && topicGroup === 'TYT') return null;
                      }

                      const currentResStatus = prog.resourceStatus?.[res] || 'none';

                      return (
                        <button
                          key={res}
                          type="button"
                          onClick={() => {
                            const nextMap: Record<string, 'none' | 'half' | 'done' | 'planned'> = {
                              'none': 'half',
                              'half': 'done',
                              'done': 'planned',
                              'planned': 'none'
                            };
                            const next = nextMap[currentResStatus] || 'half';
                            setTopicResourceStatus(topic.name, res, next);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                            currentResStatus === 'done'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : currentResStatus === 'half'
                              ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                              : currentResStatus === 'planned'
                              ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'
                          }`}
                          title={`${res} kaynağında durumu değiştir: Tıklayın (Çözülüyor 🟡 -> Bitti 🟢 -> Plana Ekle 🔵 -> Temizle ⚪)`}
                        >
                          <span>{res}</span>
                          {currentResStatus === 'done' && <CheckCircle2 size={13} className="text-emerald-600" />}
                          {currentResStatus === 'half' && <span className="text-[11px]" title="Çözülüyor / Yarım">⏳</span>}
                          {currentResStatus === 'planned' && <Clock size={13} className="text-blue-600" />}
                          {currentResStatus === 'none' && <span className="text-[10px] text-gray-300">○</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Soru Sayacı */}
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <span className="text-xs font-bold text-gray-500">Çözülen Soru:</span>
                    <input 
                      type="number"
                      value={prog.solvedQuestions || 0}
                      onChange={(e) => setTopicProgress(topic.name, { solvedQuestions: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-white border border-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-800 outline-none text-center"
                    />
                    <button 
                      type="button"
                      onClick={() => setTopicProgress(topic.name, { solvedQuestions: (prog.solvedQuestions || 0) + 25 })}
                      className="px-2 py-1 rounded bg-purple-100 text-purple-800 font-bold text-[11px] hover:bg-purple-200 cursor-pointer"
                      title="+25 Soru Ekle"
                    >
                      +25
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Kaynak Öneri Havuzu Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-purple-600" />
                  {activeSubject} Kaynak Kitap Öneri Havuzu
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  {poolCategory} kategorisi için seviyelendirilmiş en kaliteli kaynak yayınları
                </p>
              </div>
              <button 
                onClick={() => setShowResourceModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Level Columns: Kolay, Orta, Zor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['Kolay', 'Orta', 'Zor'] as const).map(lvl => {
                const books = poolForSubject[lvl] || [];
                const badgeColor = lvl === 'Kolay' ? 'bg-green-100 text-green-800' : lvl === 'Orta' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
                return (
                  <div key={lvl} className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full uppercase ${badgeColor}`}>
                        {lvl} Seviye
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">{books.length} Kaynak</span>
                    </div>

                    <div className="space-y-1.5">
                      {books.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">Öneri bulunamadı.</p>
                      ) : (
                        books.map(bk => (
                          <div 
                            key={bk}
                            className="bg-white p-2.5 rounded-xl border border-gray-100 text-xs font-bold text-gray-800 flex items-center justify-between gap-2 shadow-2xs hover:border-purple-300 transition-all cursor-pointer"
                            onClick={() => {
                              setNewResInput(bk);
                              setResLevel(lvl);
                              setShowResourceModal(false);
                            }}
                            title="Bu kaynağı ekleme kutusuna aktar"
                          >
                            <span>{bk}</span>
                            <span className="text-[10px] text-purple-600 font-bold">Aktar ➔</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Kitap adına tıklayarak ekleme formuna aktarabilirsiniz.</span>
              <button 
                onClick={() => setShowResourceModal(false)}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 shadow-md cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
