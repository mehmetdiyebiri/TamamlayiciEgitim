import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  Award, 
  Users, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  BookCheck,
  CheckCircle2,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { RahleStudentProfile, RahleDailyEntry, RahleDonusRecord } from '../../types/rahle';
import { createDefaultRahleProfile, calculateHafizlikStats, getStatusBadge, cleanMockProfile, hasMockData } from '../../utils/rahleData';
import { RahleDashboard } from './RahleDashboard';
import { RahleDailyEntryPanel } from './RahleDailyEntry';
import { RahleMatrixCalendar } from './RahleMatrixCalendar';
import { RahleMonthlyTracking } from './RahleMonthlyTracking';
import { RahleHistory } from './RahleHistory';
import { RahleYuzundenPrep } from './RahleYuzundenPrep';
import { RahleDenemeCuzu } from './RahleDenemeCuzu';
import { RahleIcon } from './RahleIcon';

interface RahlePanelProps {
  state: any;
  actions: any;
  selectedClass: string | null;
  selectedStudent: string | null;
  onSelectStudent: (student: string) => void;
  onSelectClass: (className: string) => void;
  classes: Record<string, string[]>;
  activeSchoolId: string;
  activeTab?: string;
  onSelectTab?: (tab: 'dashboard' | 'monthly' | 'daily' | 'prep' | 'deneme' | 'matrix' | 'history') => void;
}

export const RahlePanel: React.FC<RahlePanelProps> = ({
  state,
  actions,
  selectedClass,
  selectedStudent,
  onSelectStudent,
  onSelectClass,
  classes = {},
  activeSchoolId,
  activeTab,
  onSelectTab
}) => {
  const [internalTab, setInternalTab] = useState<'dashboard' | 'monthly' | 'daily' | 'prep' | 'deneme' | 'matrix' | 'history'>('dashboard');
  const rahleTab = (activeTab && ['dashboard', 'monthly', 'daily', 'prep', 'yuzunden', 'deneme', 'matrix', 'history'].includes(activeTab))
    ? (activeTab as any)
    : internalTab;

  const setRahleTab = (tab: 'dashboard' | 'monthly' | 'daily' | 'prep' | 'deneme' | 'matrix' | 'history') => {
    setInternalTab(tab);
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  const [studentSearch, setStudentSearch] = useState('');
  const storageKey = `rahle_profiles_${activeSchoolId || 'default'}`;

  // Database of student profiles
  const [profiles, setProfiles] = useState<Record<string, RahleStudentProfile>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const cleaned: Record<string, RahleStudentProfile> = {};
        let hadMock = false;
        Object.entries(parsed).forEach(([key, prof]: [string, any]) => {
          if (hasMockData(prof)) hadMock = true;
          cleaned[key] = cleanMockProfile(prof);
        });
        if (hadMock) {
          localStorage.setItem(storageKey, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    } catch {}

    // Seed initial profiles for students in classes (all clean)
    const initial: Record<string, RahleStudentProfile> = {};
    Object.entries(classes).forEach(([clsName, students]) => {
      (students || []).forEach((stuName) => {
        const sKey = `${clsName}_${stuName}`;
        initial[sKey] = createDefaultRahleProfile(stuName, clsName);
      });
    });
    return initial;
  });

  // Sync with Firestore
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const { db } = await import('../../lib/firebase');
        const docRef = doc(db, 'rahle_hafizlik', activeSchoolId || 'default');

        const unsub = onSnapshot(docRef, (snap) => {
          if (!isSubscribed) return;
          if (snap.exists()) {
            const data = snap.data();
            if (data?.profiles) {
              const cleaned: Record<string, RahleStudentProfile> = {};
              Object.entries(data.profiles).forEach(([key, prof]: [string, any]) => {
                cleaned[key] = cleanMockProfile(prof);
              });
              setProfiles(cleaned);
              localStorage.setItem(storageKey, JSON.stringify(cleaned));
            }
          }
        }, (err) => {
          console.warn("Rahle Firestore listener:", err);
        });

        return () => { unsub(); };
      } catch (e) {
        console.warn("Rahle init error:", e);
      }
    })();

    return () => { isSubscribed = false; };
  }, [activeSchoolId]);

  // Clear all mock / sample data across all students
  const handleClearAllMockData = () => {
    if (window.confirm("Tüm öğrencilerin örnek / hayali değerlendirme ve ders kayıtlarını silmek istediğinize emin misiniz? Tüm öğrenciler tertemiz başlangıç durumuna getirilecektir.")) {
      const cleaned: Record<string, RahleStudentProfile> = {};
      Object.entries(profiles).forEach(([key, prof]) => {
        cleaned[key] = {
          ...cleanMockProfile(prof),
          yuzundenRecords: [],
          dailyEntries: {},
          cuzPageProgress: {},
          donusHistory: [],
          hamSayisi: 0,
          hasSayisi: 0,
          kacinciDonuste: 1
        };
      });
      saveProfiles(cleaned);
      actions?.showToast?.("Tüm öğrencilerin örnek / hayali verileri silindi. Sistem tertemiz duruma getirildi.", "success");
    }
  };

  // Persist helper
  const saveProfiles = async (newProfiles: Record<string, RahleStudentProfile>) => {
    setProfiles(newProfiles);
    localStorage.setItem(storageKey, JSON.stringify(newProfiles));
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      await setDoc(doc(db, 'rahle_hafizlik', activeSchoolId || 'default'), {
        profiles: newProfiles,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Rahle Firestore save error:", err);
    }
  };

  // Active student key and profile
  const fallbackKey = Object.keys(profiles)[0] || `${selectedClass || 'Genel'}_Öğrenci`;
  const studentKey = selectedStudent ? `${selectedClass || 'Genel'}_${selectedStudent}` : fallbackKey;
  const currentProfile: RahleStudentProfile = (studentKey && profiles[studentKey])
    ? profiles[studentKey]
    : createDefaultRahleProfile(selectedStudent || studentKey?.split('_')[1] || 'Öğrenci', selectedClass || studentKey?.split('_')[0] || 'Genel');

  // Handle updates to profile
  const handleUpdateCurrentProfile = (updatedFields: Partial<RahleStudentProfile>) => {
    const keyToUpdate = studentKey || fallbackKey;
    if (!keyToUpdate) return;
    const targetProf = profiles[keyToUpdate] || currentProfile;
    const updated = {
      ...targetProf,
      ...updatedFields
    };
    saveProfiles({
      ...profiles,
      [keyToUpdate]: updated
    });
  };

  // Handle single daily entry
  const handleSaveDailyEntry = (targetKey: string, entry: RahleDailyEntry) => {
    const prof = profiles[targetKey] || createDefaultRahleProfile(targetKey.split('_')[1] || '', targetKey.split('_')[0] || '');
    const updatedEntries = {
      ...(prof.dailyEntries || {}),
      [entry.date]: entry
    };
    const updatedProf = {
      ...prof,
      dailyEntries: updatedEntries
    };
    saveProfiles({
      ...profiles,
      [targetKey]: updatedProf
    });
  };

  // Handle multiple entries for a student (e.g. weekly save)
  const handleSaveMultipleEntries = (targetKey: string, entries: RahleDailyEntry[]) => {
    const prof = profiles[targetKey] || createDefaultRahleProfile(targetKey.split('_')[1] || '', targetKey.split('_')[0] || '');
    const updatedEntries = {
      ...(prof.dailyEntries || {})
    };
    entries.forEach(e => {
      updatedEntries[e.date] = e;
    });
    const updatedProf = {
      ...prof,
      dailyEntries: updatedEntries
    };
    saveProfiles({
      ...profiles,
      [targetKey]: updatedProf
    });
  };

  // Handle bulk daily entries
  const handleSaveBulkEntries = (entriesMap: Record<string, RahleDailyEntry>) => {
    const nextProfiles = { ...profiles };
    Object.entries(entriesMap).forEach(([sKey, entry]) => {
      const prof = nextProfiles[sKey] || createDefaultRahleProfile(sKey.split('_')[1] || '', sKey.split('_')[0] || '');
      nextProfiles[sKey] = {
        ...prof,
        dailyEntries: {
          ...(prof.dailyEntries || {}),
          [entry.date]: entry
        }
      };
    });
    saveProfiles(nextProfiles);
  };

  // Handle delete daily entry
  const handleDeleteDailyEntry = (dateStr: string) => {
    if (!studentKey) return;
    const updatedEntries = { ...(currentProfile.dailyEntries || {}) };
    delete updatedEntries[dateStr];
    handleUpdateCurrentProfile({ dailyEntries: updatedEntries });
  };

  // Handle Donus history
  const handleAddDonusRecord = (record: RahleDonusRecord) => {
    const history = [...(currentProfile.donusHistory || []), record];
    handleUpdateCurrentProfile({ donusHistory: history });
  };

  const handleUpdateDonusRecord = (index: number, record: RahleDonusRecord) => {
    const history = [...(currentProfile.donusHistory || [])];
    history[index] = record;
    handleUpdateCurrentProfile({ donusHistory: history });
  };

  // If no student is selected and not in prep/deneme tab: Display Hafız Student Selection Hub
  if (!selectedStudent && rahleTab !== 'prep' && rahleTab !== 'yuzunden' && rahleTab !== 'deneme') {
    const allStudentsList: { name: string; className: string; key: string }[] = [];
    Object.entries(classes).forEach(([cls, stus]) => {
      (stus || []).forEach(s => {
        allStudentsList.push({ name: s, className: cls, key: `${cls}_${s}` });
      });
    });

    const filteredStudents = allStudentsList.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(studentSearch.toLowerCase());
      const matchClass = !selectedClass || item.className === selectedClass;
      return matchSearch && matchClass;
    });

    const todayStr = new Date().toISOString().split('T')[0];

    return (
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-300">
        {/* Hub Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-xs font-bold tracking-wide text-amber-900 border border-amber-200">
              <RahleIcon size={16} className="text-amber-700" />
              <span>RAHLE • HAFIZLIK TAKİP SİSTEMİ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Hafızlık Öğrenci ve Sınıf Yönetim Paneli
            </h1>
            <p className="text-gray-500 text-sm font-medium max-w-2xl">
              Diyanet HETS (Hafızlık Ezber Takip Sistemi) standartlarında 30 cüz dönüşlü klasik hafızlık takibi, günlük ders çizelgeleri ve sarmal has planlaması.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center shrink-0">
            <button
              onClick={handleClearAllMockData}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 hover:text-gray-900 transition-all cursor-pointer flex items-center gap-2 shadow-2xs"
              title="Tüm öğrencilerin örnek/hayali kayıtlarını temizle ve sıfırla"
            >
              <Trash2 size={15} className="text-amber-700" />
              <span>Örnek Verileri Temizle</span>
            </button>
            <div className="px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-center">
              <div className="text-2xl font-black text-gray-900">{allStudentsList.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kayıtlı Hafız</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={17} />
            <input
              type="text"
              placeholder="Hafız öğrenci ara..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          {/* Class Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
            <button
              onClick={() => onSelectClass('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                !selectedClass 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tüm Sınıflar
            </button>
            {Object.keys(classes).map(cls => (
              <button
                key={cls}
                onClick={() => onSelectClass(cls)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedClass === cls 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cls.replace('_', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Students Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-400 font-semibold bg-white rounded-3xl border border-gray-100">
              Arama kriterlerine uygun hafız öğrenci bulunamadı.
            </div>
          ) : (
            filteredStudents.map(item => {
              const prof = profiles[item.key] || createDefaultRahleProfile(item.name, item.className);
              const stats = calculateHafizlikStats(prof);
              const todayEntry = prof.dailyEntries?.[todayStr];
              const badge = todayEntry ? getStatusBadge(todayEntry.status) : null;

              return (
                <div
                  key={item.key}
                  onClick={() => {
                    onSelectClass(item.className);
                    onSelectStudent(item.name);
                  }}
                  className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group space-y-3.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                      {item.className.replace('_', '')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-gray-900 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">
                      {prof.kacinciDonuste}. Dönüş • {prof.kacSayfaylaGidiyor} Sayfa Usulü
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-gray-500">
                      <span>Ezber İlerlemesi</span>
                      <span className="font-black text-gray-900">%{stats.percentage} ({stats.totalMemorizedPages}/600)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-600 h-full rounded-full transition-all" 
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Stats & Today's Status */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <span className="text-blue-600 font-black">{stats.totalHam} Ham</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-black">{stats.totalHas} Has</span>
                    </div>

                    {badge ? (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${badge.bg}`}>
                        {badge.label}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px]">Bugün Girilmedi</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // Active Student View
  const studentsInActiveClass = (classes[selectedClass || ''] || Object.values(classes)[0] || []);

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-300">
      {/* Render Active Sub-Panel */}
      {rahleTab === 'dashboard' && (
        <RahleDashboard
          profile={currentProfile}
          onUpdateProfile={handleUpdateCurrentProfile}
          classes={classes}
        />
      )}

      {(rahleTab === 'monthly' || rahleTab === 'daily' || rahleTab === 'matrix') && (
        <RahleMonthlyTracking
          profile={currentProfile}
          allProfiles={profiles}
          selectedClass={selectedClass}
          onSaveDailyEntry={handleSaveDailyEntry}
          onSaveMultipleEntries={handleSaveMultipleEntries}
          onSaveBulkEntries={handleSaveBulkEntries}
          onDeleteDailyEntry={handleDeleteDailyEntry}
          studentsInClass={studentsInActiveClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
          classes={classes}
        />
      )}

      {(rahleTab === 'prep' || rahleTab === 'yuzunden') && (
        <RahleYuzundenPrep
          profile={currentProfile}
          allProfiles={profiles}
          onUpdateProfile={handleUpdateCurrentProfile}
          classes={classes}
          selectedClass={selectedClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
        />
      )}

      {rahleTab === 'deneme' && (
        <RahleDenemeCuzu
          profile={currentProfile}
          allProfiles={profiles}
          onUpdateProfile={handleUpdateCurrentProfile}
          classes={classes}
          selectedClass={selectedClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
        />
      )}

      {rahleTab === 'history' && (
        <RahleHistory
          profile={currentProfile}
          onAddDonusRecord={handleAddDonusRecord}
          onUpdateDonusRecord={handleUpdateDonusRecord}
        />
      )}
    </div>
  );
};
