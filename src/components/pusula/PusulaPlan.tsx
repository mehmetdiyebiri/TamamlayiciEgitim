import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Clock, 
  RotateCcw,
  Check,
  Award
} from 'lucide-react';
import { PusulaStudentProfile, PusulaPlanItem } from '../../types/pusula';

interface PusulaPlanProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
}

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'] as const;

export const PusulaPlan: React.FC<PusulaPlanProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Pazartesi');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [taskSubject, setTaskSubject] = useState('Matematik');
  const [taskTopic, setTaskTopic] = useState('');
  const [taskTargetCount, setTaskTargetCount] = useState<number>(30);
  const [taskType, setTaskType] = useState<'study' | 'routine' | 'exam' | 'custom'>('study');
  const [customText, setCustomText] = useState('');

  // Weekly items
  const items = profile.weeklyPlan || [];

  // Toggle item completed
  const handleToggleComplete = (id: string) => {
    const updated = items.map(it => it.id === id ? { ...it, completed: !it.completed } : it);
    onUpdateProfile({ weeklyPlan: updated });
  };

  // Add new plan item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    let displaySubject = taskSubject;
    let displayTopic = taskTopic.trim();

    if (taskType === 'routine') {
      displaySubject = 'Günlük Rutin';
      displayTopic = customText || '30 Paragraf Sorusu';
    } else if (taskType === 'custom') {
      displaySubject = 'Özel Görev';
      displayTopic = customText || 'Konu Tekrarı & Video İzleme';
    } else if (taskType === 'exam') {
      displaySubject = 'Deneme Sınavı';
      displayTopic = customText || 'Genel Deneme Çözümü & Analiz';
    }

    const newItem: PusulaPlanItem = {
      id: 'plan_' + Date.now(),
      day: selectedDay,
      subject: displaySubject,
      topic: displayTopic,
      targetCount: taskTargetCount || undefined,
      completed: false,
      type: taskType
    };

    onUpdateProfile({ weeklyPlan: [...items, newItem] });
    setTaskTopic('');
    setCustomText('');
    setShowAddModal(false);
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    const filtered = items.filter(it => it.id !== id);
    onUpdateProfile({ weeklyPlan: filtered });
  };

  // Quick routine shortcuts
  const addRoutinePreset = (routineName: string, count: number) => {
    const newItem: PusulaPlanItem = {
      id: 'plan_' + Date.now() + Math.random(),
      day: selectedDay,
      subject: 'Günlük Rutin',
      topic: routineName,
      targetCount: count,
      completed: false,
      type: 'routine'
    };
    onUpdateProfile({ weeklyPlan: [...items, newItem] });
  };

  // Print schedule
  const handlePrint = () => {
    window.print();
  };

  // Calculate completed count
  const completedCount = items.filter(it => it.completed).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Print Controls (Hidden on Print) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Calendar size={22} className="text-purple-600" />
            Haftalık Ders Çalışma &amp; Koçluk Programı
          </h2>
          <p className="text-xs font-semibold text-gray-400">
            Öğrenciye özel haftalık çalışma takvimi hazırlayın, rutinler ekleyin ve yazdırın.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            Tamamlanan: <b className="text-purple-600 font-black">{completedCount}</b> / {items.length} Görev
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-md cursor-pointer"
          >
            <Printer size={16} />
            Yazdır / PDF İndir
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
          >
            <Plus size={16} />
            Görev Ekle
          </button>
        </div>
      </div>

      {/* Routine Quick Presets (Hidden on Print) */}
      <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 flex flex-wrap items-center gap-2 print:hidden">
        <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5 mr-2">
          <Sparkles size={14} className="text-purple-600" />
          {selectedDay} Gününe Hızlı Rutin Ekle:
        </span>
        <button
          onClick={() => addRoutinePreset('20 Paragraf Sorusu', 20)}
          className="px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
        >
          + 20 Paragraf
        </button>
        <button
          onClick={() => addRoutinePreset('30 Paragraf Sorusu', 30)}
          className="px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
        >
          + 30 Paragraf
        </button>
        <button
          onClick={() => addRoutinePreset('10 Problem Sorusu', 10)}
          className="px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
        >
          + 10 Problem
        </button>
        <button
          onClick={() => addRoutinePreset('15 Geometri Sorusu', 15)}
          className="px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
        >
          + 15 Geometri
        </button>
        <button
          onClick={() => addRoutinePreset('Haftalık Branş Denemesi', 40)}
          className="px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
        >
          + Branş Denemesi
        </button>
      </div>

      {/* Day Selector Pills for Mobile / Filter (Hidden on Print) */}
      <div className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto scrollbar-hide flex gap-2 print:hidden">
        {DAYS.map(day => {
          const dayItems = items.filter(it => it.day === day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span>{day}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                isSelected ? 'bg-purple-800 text-purple-100' : 'bg-gray-200 text-gray-600'
              }`}>
                {dayItems.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* 7-DAY WEEKLY SCHEDULE GRID (Screen & Print Friendly) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 print:shadow-none print:border-none print:p-0">
        {/* Header visible ONLY when printing */}
        <div className="hidden print:block text-center border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-2xl font-black text-gray-900">MaarifMerkezi.Com - Pusula Öğrenci Koçluk Sistemi</h1>
          <h2 className="text-lg font-bold text-gray-700 mt-1">Haftalık Bireysel Çalışma ve Takip Programı</h2>
          <div className="flex justify-center gap-6 mt-2 text-xs font-semibold text-gray-600">
            <span>Öğrenci: <b className="text-black font-bold">{profile.studentName}</b></span>
            <span>Sınıf: <b className="text-black font-bold">{profile.className}</b></span>
            <span>Hedef: <b className="text-black font-bold">{profile.targetSchool || '-'}</b></span>
            <span>Tarih: <b className="text-black font-bold">{new Date().toLocaleDateString('tr-TR')}</b></span>
          </div>
        </div>

        {/* 7 Columns: Pazartesi to Pazar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5 print:grid-cols-7 print:gap-2">
          {DAYS.map(day => {
            const dayItems = items.filter(it => it.day === day);
            const isToday = selectedDay === day;

            return (
              <div 
                key={day} 
                className={`flex flex-col rounded-2xl border transition-all ${
                  isToday 
                    ? 'border-purple-500 bg-purple-50/20' 
                    : 'border-gray-200/80 bg-gray-50/50'
                } print:border-gray-400 print:bg-white`}
              >
                {/* Day Header */}
                <div className={`p-3 rounded-t-2xl font-black text-xs text-center border-b flex items-center justify-between ${
                  isToday 
                    ? 'bg-purple-600 text-white border-purple-600' 
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                } print:bg-gray-200 print:text-black print:border-gray-400`}>
                  <span>{day}</span>
                  <span className="text-[10px] opacity-80">{dayItems.length}</span>
                </div>

                {/* Items container */}
                <div className="p-2.5 flex-1 space-y-2 min-h-[160px] print:min-h-[120px]">
                  {dayItems.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-gray-400 italic py-6 print:hidden">
                      Görev yok
                    </div>
                  ) : (
                    dayItems.map(item => (
                      <div 
                        key={item.id}
                        className={`p-2.5 rounded-xl border text-xs transition-all ${
                          item.completed 
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 line-through opacity-75' 
                            : 'bg-white border-gray-200 shadow-2xs hover:border-purple-400'
                        } print:border-gray-300`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                            item.type === 'routine' 
                              ? 'bg-blue-50 text-blue-700' 
                              : item.type === 'exam'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-purple-50 text-purple-800'
                          }`}>
                            {item.subject}
                          </span>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-gray-300 hover:text-red-600 print:hidden cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="font-bold text-gray-900 mt-1 leading-tight">
                          {item.topic}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100">
                          {item.targetCount ? (
                            <span className="text-[10px] font-extrabold text-purple-700">
                              🎯 {item.targetCount} Soru
                            </span>
                          ) : <span />}

                          <button
                            onClick={() => handleToggleComplete(item.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors print:border print:border-black cursor-pointer ${
                              item.completed 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
                            }`}
                            title={item.completed ? 'Tamamlandı olarak işaretli' : 'Tamamla'}
                          >
                            {item.completed && <Check size={12} strokeWidth={3} />}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Add shortcut at bottom of column */}
                <div className="p-2 border-t border-gray-200/60 print:hidden">
                  <button
                    onClick={() => {
                      setSelectedDay(day);
                      setShowAddModal(true);
                    }}
                    className="w-full py-1 text-[11px] font-bold text-purple-700 hover:bg-purple-100/60 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} /> Ekle
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes & Motivation for Print */}
        <div className="hidden print:block border-t border-gray-300 pt-4 mt-6 text-xs text-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-300 p-3 rounded-lg h-24">
              <b>Koçun Notu &amp; Motivasyon:</b>
            </div>
            <div className="border border-gray-300 p-3 rounded-lg h-24">
              <b>Öğrencinin Haftalık Değerlendirmesi:</b>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Görev Ekle */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Plus size={20} className="text-purple-600" />
                  {selectedDay} Gününe Görev Ekle
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  Çalışma görevi, rutin veya deneme sınavı planlayın.
                </p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Gün</label>
                <select 
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                >
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Görev Türü</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'study', label: 'Ders' },
                    { id: 'routine', label: 'Rutin' },
                    { id: 'exam', label: 'Deneme' },
                    { id: 'custom', label: 'Özel' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTaskType(t.id as any)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        taskType === t.id ? 'bg-purple-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {taskType === 'study' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Ders</label>
                    <select 
                      value={taskSubject}
                      onChange={(e) => setTaskSubject(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                    >
                      {['Matematik', 'Geometri', 'Türkçe', 'Edebiyat', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Coğrafya', 'Felsefe', 'Din Kültürü', 'İngilizce'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Konu Adı &amp; Kaynak</label>
                    <input 
                      type="text"
                      required
                      value={taskTopic}
                      onChange={(e) => setTaskTopic(e.target.value)}
                      placeholder="Örn: Fonksiyonlar (3D Soru Bankası Test 1-4)"
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Görev Açıklaması</label>
                  <input 
                    type="text"
                    required
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Örn: 30 Paragraf Sorusu veya Kitap Okuma"
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Hedef Soru Sayısı</label>
                <input 
                  type="number"
                  min="0"
                  step="5"
                  value={taskTargetCount}
                  onChange={(e) => setTaskTargetCount(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Vazgeç
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Görev Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
