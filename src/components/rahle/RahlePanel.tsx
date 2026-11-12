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
import {
  createDefaultRahleProfile,
  calculateHafizlikStats,
  getStatusBadge,
  cleanMockProfile,
  hasMockData,
  resolveStudentProfileKey,
  findStudentRahleProfile
} from '../../utils/rahleData';
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
  isStudent?: boolean;
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
  isStudent,
  selectedClass,
  selectedStudent,
  onSelectStudent,
  onSelectClass,
  classes = {},
  activeSchoolId,
  activeTab,
  onSelectTab
}) => {
  const isStudentRole = Boolean(isStudent || state?.currentUser?.role === 'student' || state?.currentUser?.role === 'öğrenci');
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
    if (isStudentRole) return;
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

  // Persist helper (strips undefined values so Firestore setDoc never rejects nested undefined fields)
  const saveProfiles = async (newProfiles: Record<string, RahleStudentProfile>) => {
    if (isStudentRole) return;
    const sanitized: Record<string, RahleStudentProfile> = JSON.parse(JSON.stringify(newProfiles));
    setProfiles(sanitized);
    localStorage.setItem(storageKey, JSON.stringify(sanitized));
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      await setDoc(doc(db, 'rahle_hafizlik', activeSchoolId || 'default'), {
        profiles: sanitized,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Rahle Firestore save error:", err);
    }
  };

  // Helper to update a student's profile across all matching keys (pool + rahleClass + legacy key) so data never diverges
  const syncStudentProfileKeys = (
    baseProfiles: Record<string, RahleStudentProfile>,
    studentName: string,
    preferredClass: string,
    updatedProf: RahleStudentProfile
  ): Record<string, RahleStudentProfile> => {
    const next = { ...baseProfiles };
    const cleanCls = preferredClass || 'Hafızlık Havuzu';
    const canonicalKey = resolveStudentProfileKey(baseProfiles, cleanCls, studentName);
    const directKey = `${cleanCls}_${studentName}`;
    const poolKey = `Hafızlık Havuzu_${studentName}`;
    const normalizedProf: RahleStudentProfile = {
      ...updatedProf,
      studentName,
      className: cleanCls
    };
    next[canonicalKey] = normalizedProf;
    next[directKey] = normalizedProf;
    next[poolKey] = { ...normalizedProf, className: next[poolKey]?.className || cleanCls };

    Object.keys(next).forEach((k) => {
      if (k.endsWith(`_${studentName}`) || next[k]?.studentName === studentName) {
        next[k] = {
          ...normalizedProf,
          studentName,
          className: next[k]?.className || cleanCls
        };
      }
    });
    return next;
  };

  // Active student key and profile
  const fallbackKey = Object.keys(profiles)[0] || `${selectedClass || 'Hafızlık Havuzu'}_Öğrenci`;
  const studentKey = selectedStudent
    ? resolveStudentProfileKey(profiles, selectedClass || 'Hafızlık Havuzu', selectedStudent)
    : fallbackKey;
  const currentProfile: RahleStudentProfile = selectedStudent
    ? findStudentRahleProfile(profiles, selectedClass || 'Hafızlık Havuzu', selectedStudent)
    : (profiles[fallbackKey] || createDefaultRahleProfile('Öğrenci', selectedClass || 'Hafızlık Havuzu'));

  // Helper to parse className and studentName from targetKey safely (even if className contains underscores)
  const parseTargetStudentKey = (targetKey: string): { clsPart: string; stuName: string } => {
    if (selectedStudent && (targetKey.endsWith(`_${selectedStudent}`) || targetKey === selectedStudent)) {
      return {
        clsPart: selectedClass || currentProfile.className || 'Hafızlık Havuzu',
        stuName: selectedStudent
      };
    }
    const lastIdx = targetKey.lastIndexOf('_');
    if (lastIdx > 0) {
      return {
        clsPart: targetKey.slice(0, lastIdx) || selectedClass || 'Hafızlık Havuzu',
        stuName: targetKey.slice(lastIdx + 1)
      };
    }
    return {
      clsPart: selectedClass || 'Hafızlık Havuzu',
      stuName: selectedStudent || targetKey
    };
  };

  // Handle updates to profile
  const handleUpdateCurrentProfile = (updatedFields: Partial<RahleStudentProfile>) => {
    if (isStudentRole) return;
    const keyToUpdate = studentKey || fallbackKey;
    if (!keyToUpdate) return;
    const targetProf = currentProfile;
    const stuName = selectedStudent || targetProf.studentName;
    const clsName = selectedClass || targetProf.className || 'Hafızlık Havuzu';
    const updated: RahleStudentProfile = {
      ...targetProf,
      ...updatedFields,
      studentName: stuName,
      className: clsName
    };
    const nextProfiles = stuName
      ? syncStudentProfileKeys(profiles, stuName, clsName, updated)
      : { ...profiles, [keyToUpdate]: updated };
    saveProfiles(nextProfiles);
  };

  // Handle single daily entry
  const handleSaveDailyEntry = (targetKey: string, entry: RahleDailyEntry) => {
    if (isStudentRole) return;
    const { clsPart, stuName } = parseTargetStudentKey(targetKey);
    const prof = stuName
      ? findStudentRahleProfile(profiles, clsPart, stuName)
      : (profiles[targetKey] || createDefaultRahleProfile('', clsPart));
    const cleanEntry: RahleDailyEntry = JSON.parse(JSON.stringify(entry));
    const updatedEntries = {
      ...(prof.dailyEntries || {}),
      [cleanEntry.date]: cleanEntry
    };
    const updatedProf: RahleStudentProfile = {
      ...prof,
      studentName: stuName || prof.studentName,
      className: clsPart || prof.className || 'Hafızlık Havuzu',
      dailyEntries: updatedEntries
    };
    const nextProfiles = stuName
      ? syncStudentProfileKeys(profiles, stuName, clsPart, updatedProf)
      : { ...profiles, [targetKey]: updatedProf };
    saveProfiles(nextProfiles);
  };

  // Handle multiple entries for a student (e.g. weekly save)
  const handleSaveMultipleEntries = (targetKey: string, entries: RahleDailyEntry[]) => {
    if (isStudentRole) return;
    const { clsPart, stuName } = parseTargetStudentKey(targetKey);
    const prof = stuName
      ? findStudentRahleProfile(profiles, clsPart, stuName)
      : (profiles[targetKey] || createDefaultRahleProfile('', clsPart));
    const updatedEntries = {
      ...(prof.dailyEntries || {})
    };
    entries.forEach(e => {
      const cleanEntry: RahleDailyEntry = JSON.parse(JSON.stringify(e));
      updatedEntries[cleanEntry.date] = cleanEntry;
    });
    const updatedProf: RahleStudentProfile = {
      ...prof,
      studentName: stuName || prof.studentName,
      className: clsPart || prof.className || 'Hafızlık Havuzu',
      dailyEntries: updatedEntries
    };
    const nextProfiles = stuName
      ? syncStudentProfileKeys(profiles, stuName, clsPart, updatedProf)
      : { ...profiles, [targetKey]: updatedProf };
    saveProfiles(nextProfiles);
  };

  // Handle bulk daily entries
  const handleSaveBulkEntries = (entriesMap: Record<string, RahleDailyEntry>) => {
    if (isStudentRole) return;
    let nextProfiles = { ...profiles };
    Object.entries(entriesMap).forEach(([sKey, entry]) => {
      // sKey can be `${cls}_${stuName}_${date}` or `${cls}_${stuName}`
      const cleanKey = sKey.endsWith(`_${entry.date}`) ? sKey.slice(0, -(entry.date.length + 1)) : sKey;
      const lastIdx = cleanKey.lastIndexOf('_');
      const clsPart = lastIdx > 0 ? cleanKey.slice(0, lastIdx) : (selectedClass || 'Hafızlık Havuzu');
      const stuName = lastIdx > 0 ? cleanKey.slice(lastIdx + 1) : cleanKey;
      const prof = stuName
        ? findStudentRahleProfile(nextProfiles, clsPart, stuName)
        : (nextProfiles[cleanKey] || createDefaultRahleProfile('', clsPart));
      const cleanEntry: RahleDailyEntry = JSON.parse(JSON.stringify(entry));
      const updatedProf: RahleStudentProfile = {
        ...prof,
        studentName: stuName || prof.studentName,
        className: clsPart || prof.className || 'Hafızlık Havuzu',
        dailyEntries: {
          ...(prof.dailyEntries || {}),
          [cleanEntry.date]: cleanEntry
        }
      };
      if (stuName) {
        nextProfiles = syncStudentProfileKeys(nextProfiles, stuName, clsPart, updatedProf);
      } else {
        nextProfiles[cleanKey] = updatedProf;
      }
    });
    saveProfiles(nextProfiles);
  };

  // Handle delete daily entry
  const handleDeleteDailyEntry = (dateStr: string) => {
    if (isStudentRole) return;
    if (!studentKey) return;
    const updatedEntries = { ...(currentProfile.dailyEntries || {}) };
    delete updatedEntries[dateStr];
    handleUpdateCurrentProfile({ dailyEntries: updatedEntries });
  };

  // Handle Donus history
  const handleAddDonusRecord = (record: RahleDonusRecord) => {
    if (isStudentRole) return;
    const history = [...(currentProfile.donusHistory || []), record];
    handleUpdateCurrentProfile({ donusHistory: history });
  };

  const handleUpdateDonusRecord = (index: number, record: RahleDonusRecord) => {
    if (isStudentRole) return;
    const history = [...(currentProfile.donusHistory || [])];
    history[index] = record;
    handleUpdateCurrentProfile({ donusHistory: history });
  };

  // If no student is selected and not in prep/deneme tab: Display Hafız Student Selection Hub
  if (!isStudentRole && !selectedStudent && rahleTab !== 'prep' && rahleTab !== 'yuzunden' && rahleTab !== 'deneme') {
    const rahleClassesMap: Record<string, string[]> = state?.rahleClasses || {};
    const getAssignedRahleClass = (stuName: string): string | null => {
      for (const [rCls, list] of Object.entries(rahleClassesMap)) {
        if (classes[rCls] !== undefined && Array.isArray(list) && list.includes(stuName)) return rCls;
      }
      return null;
    };

    // Build deduplicated master list of Hafızlık students
    const seenStudents = new Set<string>();
    const allStudentsList: { name: string; className: string; assignedRahleClass: string | null; schoolClass: string | null; key: string }[] = [];

    // First iterate over non-pool Rahle classes so assigned Rahle class is captured, then Hafızlık Havuzu
    const orderedEntries = [
      ...Object.entries(classes).filter(([c]) => c !== 'Hafızlık Havuzu'),
      ...Object.entries(classes).filter(([c]) => c === 'Hafızlık Havuzu')
    ];

    orderedEntries.forEach(([cls, stus]) => {
      (stus || []).forEach(s => {
        if (!seenStudents.has(s)) {
          seenStudents.add(s);
          const assignedRCls = getAssignedRahleClass(s) || (cls !== 'Hafızlık Havuzu' ? cls : null);
          const schoolCls = actions?.getStudentSchoolClass ? actions.getStudentSchoolClass(s) : null;
          const effectiveCls = assignedRCls || 'Hafızlık Havuzu';
          allStudentsList.push({
            name: s,
            className: effectiveCls,
            assignedRahleClass: assignedRCls,
            schoolClass: schoolCls,
            key: resolveStudentProfileKey(profiles, effectiveCls, s)
          });
        }
      });
    });

    const filteredStudents = allStudentsList.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(studentSearch.toLowerCase());
      const matchClass =
        !selectedClass ||
        selectedClass === 'Hafızlık Havuzu' ||
        item.assignedRahleClass === selectedClass ||
        (classes[selectedClass] || []).includes(item.name);
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
              Hafızlık Öğrenci Havuzu ve Sınıf Yönetim Paneli
            </h1>
            <p className="text-gray-500 text-sm font-medium max-w-2xl">
              Tüm hafızlık öğrencileri ortak havuzda listelenir. Rahle modülüne özel sınıflar oluşturup havuzdaki öğrencileri bu sınıflara atayabilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-end md:self-center shrink-0">
            <button
              type="button"
              onClick={() => {
                actions?.setAdminTab?.('classes');
                actions?.setActiveTab?.('admin');
              }}
              className="px-4 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-xs font-black text-white transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Layers size={15} />
              <span>Rahle Sınıfları & Havuz Yönetimi</span>
            </button>
            <button
              onClick={handleClearAllMockData}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 hover:text-gray-900 transition-all cursor-pointer flex items-center gap-2 shadow-2xs"
              title="Tüm öğrencilerin örnek/hayali kayıtlarını temizle ve sıfırla"
            >
              <Trash2 size={15} className="text-amber-700" />
              <span>Örnek Verileri Temizle</span>
            </button>
            <div className="px-5 py-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <div className="text-2xl font-black text-amber-950">{allStudentsList.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Hafızlık Havuzu</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={17} />
            <input
              type="text"
              placeholder="Hafızlık havuzunda öğrenci ara..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          {/* Class Tabs: Hafızlık Havuzu + Rahle Classes */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
            <button
              onClick={() => onSelectClass('Hafızlık Havuzu')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                !selectedClass || selectedClass === 'Hafızlık Havuzu'
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span>Hafızlık Havuzu (Tümü)</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                !selectedClass || selectedClass === 'Hafızlık Havuzu' ? 'bg-amber-700 text-white' : 'bg-amber-200/70 text-amber-950'
              }`}>
                {allStudentsList.length}
              </span>
            </button>
            {Object.keys(classes)
              .filter(cls => cls !== 'Hafızlık Havuzu')
              .map(cls => (
                <button
                  key={cls}
                  onClick={() => onSelectClass(cls)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedClass === cls 
                      ? 'bg-amber-600 text-white shadow-xs' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cls.replace('_', '')}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                    selectedClass === cls ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {(classes[cls] || []).length}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* Students Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full py-16 px-6 text-center bg-white rounded-3xl border border-gray-100 space-y-3">
              <div className="text-gray-500 font-bold text-base">
                {allStudentsList.length === 0
                  ? 'Henüz Hafızlık Öğrencisi olarak kayıtlı öğrenci bulunmuyor.'
                  : 'Bu sınıfta veya arama kriterlerine uygun hafız öğrenci bulunamadı.'}
              </div>
              <div className="space-y-3">
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Yönetim Paneli &gt; Hafızlık Havuzu &amp; Rahle Sınıfları ekranından Rahle modülüne özel sınıflar oluşturabilir, havuzdaki öğrencileri sınıflara atayabilir veya yeni öğrenci ekleyebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    actions?.setAdminTab?.('classes');
                    actions?.setActiveTab?.('admin');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  Hafızlık Havuzu &amp; Rahle Sınıflarını Yönet
                </button>
              </div>
            </div>
          ) : (
            filteredStudents.map(item => {
              const prof = findStudentRahleProfile(profiles, item.className, item.name);
              const stats = calculateHafizlikStats(prof);
              const todayEntry = prof.dailyEntries?.[todayStr];
              const badge = todayEntry ? getStatusBadge(todayEntry.status) : null;

              return (
                <div
                  key={item.name}
                  onClick={() => {
                    onSelectClass(selectedClass && selectedClass !== 'Hafızlık Havuzu' ? selectedClass : (item.assignedRahleClass || 'Hafızlık Havuzu'));
                    onSelectStudent(item.name);
                  }}
                  className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group space-y-3.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                        {item.assignedRahleClass ? item.assignedRahleClass.replace('_', '') : 'Hafızlık Havuzu'}
                      </span>
                      {item.schoolClass && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                          Okul: {item.schoolClass.replace('_', '')}
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
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

  // Active Student View - Filter allProfiles to only Hafızlık students present in `classes`, resolved by studentName
  const activeHafizProfiles: Record<string, RahleStudentProfile> = {};
  Object.entries(classes).forEach(([clsName, stus]) => {
    (stus || []).forEach((stuName) => {
      const key = `${clsName}_${stuName}`;
      activeHafizProfiles[key] = findStudentRahleProfile(profiles, clsName, stuName);
    });
  });

  const studentsInActiveClass = (classes[selectedClass || ''] || classes['Hafızlık Havuzu'] || Object.values(classes)[0] || []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-6 pt-4 space-y-4 animate-in fade-in duration-300">
      {/* Render Active Sub-Panel */}
      {rahleTab === 'dashboard' && (
        <RahleDashboard
          profile={currentProfile}
          onUpdateProfile={handleUpdateCurrentProfile}
          classes={classes}
          isStudent={isStudentRole}
        />
      )}

      {(rahleTab === 'monthly' || rahleTab === 'daily' || rahleTab === 'matrix') && (
        <RahleMonthlyTracking
          profile={currentProfile}
          allProfiles={activeHafizProfiles}
          selectedClass={selectedClass}
          onSaveDailyEntry={handleSaveDailyEntry}
          onSaveMultipleEntries={handleSaveMultipleEntries}
          onSaveBulkEntries={handleSaveBulkEntries}
          onDeleteDailyEntry={handleDeleteDailyEntry}
          studentsInClass={studentsInActiveClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
          classes={classes}
          isStudent={isStudentRole}
        />
      )}

      {(rahleTab === 'prep' || rahleTab === 'yuzunden') && (
        <RahleYuzundenPrep
          profile={currentProfile}
          allProfiles={activeHafizProfiles}
          onUpdateProfile={handleUpdateCurrentProfile}
          classes={classes}
          selectedClass={selectedClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
          isStudent={isStudentRole}
        />
      )}

      {rahleTab === 'deneme' && (
        <RahleDenemeCuzu
          profile={currentProfile}
          allProfiles={activeHafizProfiles}
          onUpdateProfile={handleUpdateCurrentProfile}
          classes={classes}
          selectedClass={selectedClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
          isStudent={isStudentRole}
        />
      )}

      {rahleTab === 'history' && (
        <RahleHistory
          profile={currentProfile}
          onAddDonusRecord={handleAddDonusRecord}
          onUpdateDonusRecord={handleUpdateDonusRecord}
          isStudent={isStudentRole}
        />
      )}
    </div>
  );
};
