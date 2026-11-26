import React, { useState, useEffect } from 'react';
import {
  Award,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Layers,
  CheckCircle2,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import {
  PusulaClassificationConfig,
  PusulaClassCategory,
  PusulaLevelClass,
  PusulaCategoryColor,
  DEFAULT_PUSULA_CLASSIFICATION_CONFIG,
  formatClassScoreRangeLabel,
  usePusulaClassificationConfig
} from '../../lib/pusulaClassificationConfig';

interface PusulaAdminClassManagerProps {
  activeSchoolId: string;
  showToast?: (msg: string, type?: string) => void;
}

const COLOR_OPTIONS: Array<{ value: PusulaCategoryColor; label: string; dot: string; badge: string }> = [
  { value: 'emerald', label: 'Yeşil (Akademi)', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { value: 'amber', label: 'Kehribar / Turuncu (Gelişim)', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-800 border-amber-200' },
  { value: 'purple', label: 'Mor (Pusula)', dot: 'bg-purple-500', badge: 'bg-purple-50 text-purple-800 border-purple-200' },
  { value: 'blue', label: 'Mavi', dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
  { value: 'indigo', label: 'İndigo', dot: 'bg-indigo-500', badge: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { value: 'rose', label: 'Kırmızı / Gül', dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-800 border-rose-200' }
];

export const PusulaAdminClassManager: React.FC<PusulaAdminClassManagerProps> = ({
  activeSchoolId,
  showToast
}) => {
  const { config, saveConfig, isSaving } = usePusulaClassificationConfig(activeSchoolId);
  const [draftCategories, setDraftCategories] = useState<PusulaClassCategory[]>(config.categories);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // New Category Form State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState<PusulaCategoryColor>('purple');

  // New Class Form State per Category
  const [newClassInputs, setNewClassInputs] = useState<
    Record<string, { name: string; minScore: string; maxScore: string }>
  >({});

  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setDraftCategories(config.categories);
    setHasUnsavedChanges(false);
  }, [config]);

  const notify = (msg: string, type: string = 'success') => {
    if (showToast) {
      showToast(msg, type);
    } else {
      setSaveSuccessMessage(msg);
      setTimeout(() => setSaveSuccessMessage(null), 3500);
    }
  };

  // --- CATEGORY ACTIONS ---
  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      notify('Lütfen yeni kategori adını girin.', 'error');
      return;
    }

    const newCat: PusulaClassCategory = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed.toLocaleUpperCase('tr-TR'),
      colorTheme: newCategoryColor,
      classes: [
        {
          id: `cls_${Date.now()}_a`,
          name: `${trimmed.toLocaleUpperCase('tr-TR')} A`,
          minScore: 300,
          maxScore: 400,
          includeUnentered: false
        }
      ]
    };

    const updated = [...draftCategories, newCat];
    setDraftCategories(updated);
    setNewCategoryName('');
    setHasUnsavedChanges(true);
    saveConfig({ categories: updated });
    notify(`"${newCat.name}" kategorisi eklendi ve kaydedildi.`);
  };

  const handleUpdateCategoryField = (
    catId: string,
    field: 'name' | 'colorTheme',
    value: string
  ) => {
    setDraftCategories(prev =>
      prev.map(c => (c.id === catId ? { ...c, [field]: value } : c))
    );
    setHasUnsavedChanges(true);
  };

  const handleMoveCategory = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= draftCategories.length) return;
    const copy = [...draftCategories];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    setDraftCategories(copy);
    setHasUnsavedChanges(true);
  };

  const handleDeleteCategory = (catId: string) => {
    if (draftCategories.length <= 1) {
      notify('En az 1 kategori bulunmalıdır.', 'error');
      return;
    }
    const updated = draftCategories.filter(c => c.id !== catId);
    setDraftCategories(updated);
    setHasUnsavedChanges(true);
    saveConfig({ categories: updated });
    notify('Kategori silindi ve kaydedildi.');
  };

  // --- CLASS ACTIONS ---
  const handleAddClassToCategory = (catId: string) => {
    const input = newClassInputs[catId] || { name: '', minScore: '', maxScore: '' };
    const trimmedName = input.name.trim();
    if (!trimmedName) {
      notify('Lütfen yeni sınıf adını girin (Örn: AKADEMİ D).', 'error');
      return;
    }

    const minVal = input.minScore !== '' ? Number(input.minScore) : 0;
    const maxVal = input.maxScore.trim() !== '' ? Number(input.maxScore) : null;

    const newCls: PusulaLevelClass = {
      id: `cls_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: trimmedName,
      minScore: isNaN(minVal) ? 0 : minVal,
      maxScore: maxVal !== null && !isNaN(maxVal) ? maxVal : null,
      includeUnentered: false
    };

    const updated = draftCategories.map(cat =>
      cat.id === catId ? { ...cat, classes: [...cat.classes, newCls] } : cat
    );

    setDraftCategories(updated);
    setNewClassInputs(prev => ({
      ...prev,
      [catId]: { name: '', minScore: '', maxScore: '' }
    }));
    setHasUnsavedChanges(true);
    saveConfig({ categories: updated });
    notify(`"${newCls.name}" sınıfı eklendi ve kaydedildi.`);
  };

  const handleUpdateClassField = (
    catId: string,
    clsId: string,
    field: 'name' | 'minScore' | 'maxScore',
    rawValue: string
  ) => {
    setDraftCategories(prev =>
      prev.map(cat => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          classes: cat.classes.map(cls => {
            if (cls.id !== clsId) return cls;
            if (field === 'name') {
              return { ...cls, name: rawValue };
            }
            if (field === 'minScore') {
              const num = rawValue === '' ? 0 : Number(rawValue);
              return { ...cls, minScore: isNaN(num) ? 0 : num };
            }
            if (field === 'maxScore') {
              if (rawValue.trim() === '') {
                return { ...cls, maxScore: null };
              }
              const num = Number(rawValue);
              return { ...cls, maxScore: isNaN(num) ? null : num };
            }
            return cls;
          })
        };
      })
    );
    setHasUnsavedChanges(true);
  };

  const handleSetUnenteredTargetClass = (targetCatId: string, targetClsId: string) => {
    setDraftCategories(prev =>
      prev.map(cat => ({
        ...cat,
        classes: cat.classes.map(cls => ({
          ...cls,
          includeUnentered: cat.id === targetCatId && cls.id === targetClsId
        }))
      }))
    );
    setHasUnsavedChanges(true);
  };

  const handleMoveClass = (catId: string, clsIdx: number, direction: 'up' | 'down') => {
    setDraftCategories(prev =>
      prev.map(cat => {
        if (cat.id !== catId) return cat;
        const targetIdx = direction === 'up' ? clsIdx - 1 : clsIdx + 1;
        if (targetIdx < 0 || targetIdx >= cat.classes.length) return cat;
        const copy = [...cat.classes];
        const temp = copy[clsIdx];
        copy[clsIdx] = copy[targetIdx];
        copy[targetIdx] = temp;
        return { ...cat, classes: copy };
      })
    );
    setHasUnsavedChanges(true);
  };

  const handleDeleteClass = (catId: string, clsId: string) => {
    const updated = draftCategories.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        classes: cat.classes.filter(c => c.id !== clsId)
      };
    });
    setDraftCategories(updated);
    setHasUnsavedChanges(true);
    saveConfig({ categories: updated });
    notify('Sınıf silindi ve kaydedildi.');
  };

  const handleSaveAll = async () => {
    const newConfig: PusulaClassificationConfig = {
      categories: draftCategories
    };
    await saveConfig(newConfig);
    setHasUnsavedChanges(false);
    notify('Akademi & Gelişim sınıfları ve puan aralıkları başarıyla kaydedildi!');
  };

  const handleResetDefaults = async () => {
    setDraftCategories(DEFAULT_PUSULA_CLASSIFICATION_CONFIG.categories);
    await saveConfig(DEFAULT_PUSULA_CLASSIFICATION_CONFIG);
    setHasUnsavedChanges(false);
    notify('Varsayılan Akademi (A, B, C) ve Gelişim (A, B, C) puan ayarlarına sıfırlandı.');
  };

  return (
    <div className="space-y-8">
      {/* Üst Başlık ve Kaydet Barı */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-emerald-50/40 p-6 rounded-3xl border border-purple-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black uppercase tracking-wider">
            <Sparkles size={13} />
            PUSULA • SINIFLANDIRMA VE PUAN ARALIĞI YÖNETİMİ
          </div>
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Award className="text-purple-600" size={22} />
            Akademi &amp; Gelişim Sınıfları Yönetimi
          </h3>
          <p className="text-xs font-semibold text-gray-500 max-w-3xl">
            Genel Durum &amp; Özet ekranında öğrencilerin son deneme puanlarına göre yerleştirildiği kategorileri (örn. AKADEMİ, GELİŞİM) ve sınıfları (A, B, C...) buradan yönetebilir, yeni kategori ve sınıf ekleyebilir veya mevcut sınıfların alt-üst puan sınırlarını düzenleyebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold text-xs transition-all cursor-pointer shadow-2xs"
            title="Varsayılan Akademi A/B/C ve Gelişim A/B/C puanlarına sıfırla"
          >
            <RotateCcw size={15} />
            Varsayılana Sıfırla
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-xs text-white transition-all cursor-pointer shadow-md ${
              hasUnsavedChanges
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 animate-pulse'
                : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'
            }`}
          >
            <Save size={16} />
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* YENİ KATEGORİ EKLEME KARTI */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-purple-600" />
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">
            Yeni Kategori Ekle
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-6 space-y-1">
            <label className="block text-xs font-bold text-gray-600">Kategori Adı</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Örn: İLERİ AKADEMİ, HAZIRLIK, DERECE GRUBU..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-purple-500 transition-all"
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="block text-xs font-bold text-gray-600">Renk Teması</label>
            <select
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value as PusulaCategoryColor)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-purple-500 cursor-pointer"
            >
              {COLOR_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="button"
              onClick={handleAddCategory}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-black shadow-sm transition-all cursor-pointer"
            >
              <Plus size={16} />
              Kategori Ekle
            </button>
          </div>
        </div>
      </div>

      {/* MEVCUT KATEGORİLER VE SINIFLAR LİSTESİ */}
      <div className="space-y-6">
        {draftCategories.map((cat, catIdx) => {
          const newClsInput = newClassInputs[cat.id] || { name: '', minScore: '', maxScore: '' };

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden"
            >
              {/* Kategori Üst Barı */}
              <div className="bg-gray-50/90 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap flex-1">
                  <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {catIdx + 1}
                  </span>

                  <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
                    <span className="text-xs font-black text-gray-400 uppercase shrink-0">
                      Kategori:
                    </span>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleUpdateCategoryField(cat.id, 'name', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-1.5 text-sm font-black text-gray-900 outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">Tema:</span>
                    <select
                      value={cat.colorTheme || 'emerald'}
                      onChange={(e) => handleUpdateCategoryField(cat.id, 'colorTheme', e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {COLOR_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="text-xs font-bold text-gray-400">
                    ({cat.classes.length} Sınıf)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleMoveCategory(catIdx, 'up')}
                    disabled={catIdx === 0}
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-800 disabled:opacity-40 cursor-pointer"
                    title="Kategoriyi Yukarı Taşı"
                  >
                    <ChevronUp size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveCategory(catIdx, 'down')}
                    disabled={catIdx === draftCategories.length - 1}
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-800 disabled:opacity-40 cursor-pointer"
                    title="Kategoriyi Aşağı Taşı"
                  >
                    <ChevronDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 cursor-pointer ml-1"
                    title="Kategoriyi Sil"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Kategori İçindeki Sınıflar ve Puan Düzenleme Tablosu */}
              <div className="p-6 space-y-5">
                {cat.classes.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-xs font-semibold text-gray-400">
                    Bu kategoride henüz sınıf bulunmuyor. Aşağıdan yeni sınıf ekleyebilirsiniz.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="hidden md:grid md:grid-cols-12 gap-3 px-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                      <div className="col-span-3">Sınıf Adı</div>
                      <div className="col-span-2">Alt Puan (Min)</div>
                      <div className="col-span-2">Üst Puan (Max)</div>
                      <div className="col-span-2">Önizleme Etiketi</div>
                      <div className="col-span-2">Sınava Girmeyenler</div>
                      <div className="col-span-1 text-right">İşlem</div>
                    </div>

                    {cat.classes.map((cls, clsIdx) => (
                      <div
                        key={cls.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3.5 rounded-2xl bg-gray-50/70 border border-gray-200/80 hover:border-purple-200 transition-all"
                      >
                        {/* Sınıf Adı */}
                        <div className="md:col-span-3 space-y-1 md:space-y-0">
                          <label className="md:hidden text-[10px] font-bold text-gray-400 uppercase">Sınıf Adı</label>
                          <div className="flex items-center gap-2">
                            <GraduationCap size={16} className="text-purple-600 shrink-0" />
                            <input
                              type="text"
                              value={cls.name}
                              onChange={(e) =>
                                handleUpdateClassField(cat.id, cls.id, 'name', e.target.value)
                              }
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-gray-900 outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>

                        {/* Alt Puan (Min) */}
                        <div className="md:col-span-2 space-y-1 md:space-y-0">
                          <label className="md:hidden text-[10px] font-bold text-gray-400 uppercase">Alt Puan (Min)</label>
                          <input
                            type="number"
                            step="any"
                            value={cls.minScore ?? 0}
                            onChange={(e) =>
                              handleUpdateClassField(cat.id, cls.id, 'minScore', e.target.value)
                            }
                            placeholder="Örn: 360"
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-gray-800 outline-none focus:border-purple-500"
                          />
                        </div>

                        {/* Üst Puan (Max) */}
                        <div className="md:col-span-2 space-y-1 md:space-y-0">
                          <label className="md:hidden text-[10px] font-bold text-gray-400 uppercase">
                            Üst Puan (Boş = Ve Üzeri)
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={cls.maxScore !== null && cls.maxScore !== undefined ? cls.maxScore : ''}
                            onChange={(e) =>
                              handleUpdateClassField(cat.id, cls.id, 'maxScore', e.target.value)
                            }
                            placeholder="Ve üzeri (Üst sınır yok)"
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-gray-800 placeholder:font-semibold placeholder:text-gray-400 outline-none focus:border-purple-500"
                          />
                        </div>

                        {/* Önizleme Etiketi */}
                        <div className="md:col-span-2">
                          <span className="inline-block px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-[11px] font-black">
                            {formatClassScoreRangeLabel(cls)}
                          </span>
                        </div>

                        {/* Sınava Girmeyenler (GİRMEDİ) Seçimi */}
                        <div className="md:col-span-2">
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="radio"
                              name="unentered_target_class"
                              checked={Boolean(cls.includeUnentered)}
                              onChange={() => handleSetUnenteredTargetClass(cat.id, cls.id)}
                              className="w-4 h-4 accent-purple-600 cursor-pointer"
                            />
                            <span className="text-[11px] font-bold text-gray-600">
                              {cls.includeUnentered ? (
                                <strong className="text-red-600">"GİRMEDİ" Sınıfı</strong>
                              ) : (
                                '"GİRMEDİ" Grubu Yap'
                              )}
                            </span>
                          </label>
                        </div>

                        {/* Sıralama ve Silme */}
                        <div className="md:col-span-1 flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveClass(cat.id, clsIdx, 'up')}
                            disabled={clsIdx === 0}
                            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-800 disabled:opacity-40 cursor-pointer"
                            title="Yukarı Taşı"
                          >
                            <ChevronUp size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveClass(cat.id, clsIdx, 'down')}
                            disabled={clsIdx === cat.classes.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-800 disabled:opacity-40 cursor-pointer"
                            title="Aşağı Taşı"
                          >
                            <ChevronDown size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClass(cat.id, cls.id)}
                            className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 cursor-pointer"
                            title="Sınıfı Sil"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bu Kategoriye Yeni Sınıf Ekleme Satırı */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Plus size={14} className="text-purple-600" />
                    <span>{cat.name} Kategorisine Yeni Sınıf Ekle</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    <div className="sm:col-span-4 space-y-1">
                      <label className="block text-[11px] font-bold text-gray-500">Yeni Sınıf Adı</label>
                      <input
                        type="text"
                        value={newClsInput.name}
                        onChange={(e) =>
                          setNewClassInputs(prev => ({
                            ...prev,
                            [cat.id]: { ...newClsInput, name: e.target.value }
                          }))
                        }
                        placeholder={`Örn: ${cat.name} D`}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="block text-[11px] font-bold text-gray-500">Alt Puan (Min)</label>
                      <input
                        type="number"
                        step="any"
                        value={newClsInput.minScore}
                        onChange={(e) =>
                          setNewClassInputs(prev => ({
                            ...prev,
                            [cat.id]: { ...newClsInput, minScore: e.target.value }
                          }))
                        }
                        placeholder="Örn: 200"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="block text-[11px] font-bold text-gray-500">
                        Üst Puan (Max - Boşsa Ve Üzeri)
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={newClsInput.maxScore}
                        onChange={(e) =>
                          setNewClassInputs(prev => ({
                            ...prev,
                            [cat.id]: { ...newClsInput, maxScore: e.target.value }
                          }))
                        }
                        placeholder="Örn: 240 (veya boş bırakın)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="button"
                        onClick={() => handleAddClassToCategory(cat.id)}
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer"
                      >
                        <Plus size={15} />
                        Sınıf Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
