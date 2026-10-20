import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Search,
  Save,
  ShieldCheck,
  Sliders,
  BarChart3,
  AlertTriangle,
  UserCheck,
  Clock,
  Target,
  Layers
} from 'lucide-react';
import { RahleStudentProfile, RahleDenemeSettings } from '../../types/rahle';
import {
  createDefaultRahleProfile,
  calculateHafizlikStats,
  cleanMockProfile,
  hasMockData
} from '../../utils/rahleData';
import { formatClassLabel } from '../../lib/utils';

export interface RahleInstitutionCriteria {
  targetReadingSeconds: number;
  minReadinessIndex: number;
  minMahrecScore: number;
  minTecvidScore: number;
  recommendedDailyReadingPages: number;
  defaultTargetJuz: number;
  defaultEvaluationMonth: string;
  defaultStudyDaysPerWeek: number;
  defaultDailyTargetPages: number;
  maxAcceptableGalatAvg: number;
  defaultCommissionNote: string;
}

const DEFAULT_CRITERIA: RahleInstitutionCriteria = {
  targetReadingSeconds: 120,
  minReadinessIndex: 85,
  minMahrecScore: 4,
  minTecvidScore: 4,
  recommendedDailyReadingPages: 5,
  defaultTargetJuz: 30,
  defaultEvaluationMonth: new Date().toISOString().slice(0, 7),
  defaultStudyDaysPerWeek: 6,
  defaultDailyTargetPages: 1,
  maxAcceptableGalatAvg: 1.5,
  defaultCommissionNote: 'Komisyonumuzca yapılan 1 aylık deneme cüzü ve yüzünden okuma değerlendirmesi sonucunda öğrencimizin hafızlık esas ezber programına başlaması uygun görülmüştür.'
};

interface RahleAdminModulesProps {
  activeSubTab: 'rahle_students' | 'rahle_planning' | 'rahle_criteria' | 'rahle_stats';
  classes: Record<string, string[]>;
  users: any[];
  activeSchoolId: string;
  showToast?: (msg: string, type?: string) => void;
}

export const RahleAdminModules: React.FC<RahleAdminModulesProps> = ({
  activeSubTab,
  classes = {},
  users = [],
  activeSchoolId,
  showToast
}) => {
  const storageKey = `rahle_profiles_${activeSchoolId || 'default'}`;
  const criteriaKey = `rahle_criteria_${activeSchoolId || 'default'}`;

  const [profiles, setProfiles] = useState<Record<string, RahleStudentProfile>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    const initial: Record<string, RahleStudentProfile> = {};
    Object.entries(classes).forEach(([clsName, students]) => {
      (students || []).forEach((stuName) => {
        const sKey = `${clsName}_${stuName}`;
        initial[sKey] = createDefaultRahleProfile(stuName, clsName);
      });
    });
    return initial;
  });

  const [criteria, setCriteria] = useState<RahleInstitutionCriteria>(() => {
    try {
      const stored = localStorage.getItem(criteriaKey);
      if (stored) {
        return { ...DEFAULT_CRITERIA, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_CRITERIA;
  });

  const [filterClass, setFilterClass] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Bulk state for student assignment tab
  const [bulkAdvisor, setBulkAdvisor] = useState<string>('');
  const [bulkStatus, setBulkStatus] = useState<RahleStudentProfile['status'] | ''>('');
  const [bulkStartDate, setBulkStartDate] = useState<string>('');

  // Bulk state for turn/page planning tab
  const [bulkDonus, setBulkDonus] = useState<number | ''>('');
  const [bulkSayfaUsulu, setBulkSayfaUsulu] = useState<number | ''>('');
  const [bulkDonusStart, setBulkDonusStart] = useState<string>('');
  const [bulkTargetEnd, setBulkTargetEnd] = useState<string>('');

  // Criteria target class for applying Deneme settings
  const [criteriaTargetClass, setCriteriaTargetClass] = useState<string>('all');

  // Reset confirmation states
  const [confirmResetClass, setConfirmResetClass] = useState<string | null>(null);
  const [confirmFullReset, setConfirmFullReset] = useState<boolean>(false);

  // Sync with Firestore
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const { db } = await import('../../lib/firebase');
        const docRef = doc(db, 'rahle_hafizlik', activeSchoolId || 'default');

        const unsub = onSnapshot(
          docRef,
          (snap) => {
            if (!isSubscribed) return;
            if (snap.exists()) {
              const data = snap.data();
              if (data?.profiles) {
                setProfiles(data.profiles);
                localStorage.setItem(storageKey, JSON.stringify(data.profiles));
              }
              if (data?.criteriaSettings) {
                const mergedCriteria = { ...DEFAULT_CRITERIA, ...data.criteriaSettings };
                setCriteria(mergedCriteria);
                localStorage.setItem(criteriaKey, JSON.stringify(mergedCriteria));
              }
            }
          },
          (err) => {
            console.warn('Rahle Admin Firestore listener:', err);
          }
        );

        return () => {
          unsub();
        };
      } catch (e) {
        console.warn('Rahle Admin init error:', e);
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, [activeSchoolId, storageKey, criteriaKey]);

  const saveProfilesToStore = async (nextProfiles: Record<string, RahleStudentProfile>, toastMessage?: string) => {
    setProfiles(nextProfiles);
    localStorage.setItem(storageKey, JSON.stringify(nextProfiles));
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      await setDoc(
        doc(db, 'rahle_hafizlik', activeSchoolId || 'default'),
        {
          profiles: nextProfiles,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
      if (toastMessage) {
        showToast?.(toastMessage, 'success');
      }
    } catch (err) {
      console.warn('Rahle Admin Firestore save error:', err);
      if (toastMessage) {
        showToast?.(toastMessage, 'success');
      }
    }
  };

  const saveCriteriaToStore = async (nextCriteria: RahleInstitutionCriteria, toastMessage?: string) => {
    setCriteria(nextCriteria);
    localStorage.setItem(criteriaKey, JSON.stringify(nextCriteria));
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      await setDoc(
        doc(db, 'rahle_hafizlik', activeSchoolId || 'default'),
        {
          criteriaSettings: nextCriteria,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
      if (toastMessage) {
        showToast?.(toastMessage, 'success');
      }
    } catch (err) {
      console.warn('Rahle Criteria save error:', err);
      if (toastMessage) {
        showToast?.(toastMessage, 'success');
      }
    }
  };

  // List of teachers/admins for advisor dropdown
  const teacherOptions = useMemo(() => {
    return (users || []).filter((u: any) => u.role === 'teacher' || u.role === 'admin' || u.role === 'öğretmen');
  }, [users]);

  // Flatten all students across classes
  const allStudentRows = useMemo(() => {
    const rows: {
      key: string;
      studentName: string;
      className: string;
      profile: RahleStudentProfile;
      stats: ReturnType<typeof calculateHafizlikStats>;
    }[] = [];

    Object.entries(classes)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([clsName, stus]) => {
        (stus || []).forEach((stuName) => {
          const key = `${clsName}_${stuName}`;
          const prof = profiles[key] || createDefaultRahleProfile(stuName, clsName);
          const stats = calculateHafizlikStats(prof);
          rows.push({
            key,
            studentName: stuName,
            className: clsName,
            profile: prof,
            stats
          });
        });
      });

    return rows;
  }, [classes, profiles]);

  const filteredRows = useMemo(() => {
    return allStudentRows.filter((row) => {
      const matchClass = !filterClass || row.className === filterClass;
      const matchStatus = filterStatus === 'all' || (row.profile.status || 'devam_ediyor') === filterStatus;
      const matchSearch =
        !searchQuery.trim() ||
        row.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.profile.advisorTeacher || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchStatus && matchSearch;
    });
  }, [allStudentRows, filterClass, filterStatus, searchQuery]);

  const handleToggleSelectAll = () => {
    const visibleKeys = filteredRows.map((r) => r.key);
    const allSelected = visibleKeys.length > 0 && visibleKeys.every((k) => selectedKeys.includes(k));
    if (allSelected) {
      setSelectedKeys(selectedKeys.filter((k) => !visibleKeys.includes(k)));
    } else {
      const merged = Array.from(new Set([...selectedKeys, ...visibleKeys]));
      setSelectedKeys(merged);
    }
  };

  const handleToggleRow = (key: string) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  const handleUpdateSingleProfile = (key: string, studentName: string, className: string, patch: Partial<RahleStudentProfile>, msg?: string) => {
    const existing = profiles[key] || createDefaultRahleProfile(studentName, className);
    const nextProfiles = {
      ...profiles,
      [key]: {
        ...existing,
        ...patch
      }
    };
    saveProfilesToStore(nextProfiles, msg);
  };

  const handleApplyBulkStudentAssignment = () => {
    const targetKeys = selectedKeys.length > 0 ? selectedKeys : filteredRows.map((r) => r.key);
    if (targetKeys.length === 0) {
      showToast?.('Uygulanacak öğrenci bulunamadı.', 'error');
      return;
    }
    if (!bulkAdvisor && !bulkStatus && !bulkStartDate) {
      showToast?.('Lütfen toplu atama için en az bir alan (Danışman Hoca, Durum veya Başlama Tarihi) seçin.', 'error');
      return;
    }

    const nextProfiles = { ...profiles };
    targetKeys.forEach((key) => {
      const row = allStudentRows.find((r) => r.key === key);
      const base = nextProfiles[key] || createDefaultRahleProfile(row?.studentName || '', row?.className || '');
      nextProfiles[key] = {
        ...base,
        ...(bulkAdvisor ? { advisorTeacher: bulkAdvisor } : {}),
        ...(bulkStatus ? { status: bulkStatus } : {}),
        ...(bulkStartDate ? { hafizlikBaslamaTarihi: bulkStartDate } : {})
      };
    });

    saveProfilesToStore(nextProfiles, `${targetKeys.length} hafız öğrencinin atama bilgileri güncellendi.`);
    setBulkAdvisor('');
    setBulkStatus('');
    setBulkStartDate('');
  };

  const handleApplyBulkPlanning = () => {
    const targetKeys = selectedKeys.length > 0 ? selectedKeys : filteredRows.map((r) => r.key);
    if (targetKeys.length === 0) {
      showToast?.('Uygulanacak öğrenci bulunamadı.', 'error');
      return;
    }
    if (!bulkDonus && !bulkSayfaUsulu && !bulkDonusStart && !bulkTargetEnd) {
      showToast?.('Lütfen toplu planlama için en az bir parametre seçin.', 'error');
      return;
    }

    const nextProfiles = { ...profiles };
    targetKeys.forEach((key) => {
      const row = allStudentRows.find((r) => r.key === key);
      const base = nextProfiles[key] || createDefaultRahleProfile(row?.studentName || '', row?.className || '');
      nextProfiles[key] = {
        ...base,
        ...(bulkDonus !== '' ? { kacinciDonuste: Number(bulkDonus) } : {}),
        ...(bulkSayfaUsulu !== '' ? { kacSayfaylaGidiyor: Number(bulkSayfaUsulu) } : {}),
        ...(bulkDonusStart ? { donusBaslamaTarihi: bulkDonusStart } : {}),
        ...(bulkTargetEnd ? { targetCompletionDate: bulkTargetEnd } : {})
      };
    });

    saveProfilesToStore(nextProfiles, `${targetKeys.length} hafız öğrencinin dönüş ve sayfa planlaması güncellendi.`);
    setBulkDonus('');
    setBulkSayfaUsulu('');
    setBulkDonusStart('');
    setBulkTargetEnd('');
  };

  const handleApplyCriteriaToStudents = () => {
    const targetRows =
      criteriaTargetClass === 'all'
        ? allStudentRows
        : allStudentRows.filter((r) => r.className === criteriaTargetClass);

    if (targetRows.length === 0) {
      showToast?.('Hedef sınıfta kayıtlı öğrenci bulunamadı.', 'error');
      return;
    }

    const nextProfiles = { ...profiles };
    targetRows.forEach((row) => {
      const base = nextProfiles[row.key] || createDefaultRahleProfile(row.studentName, row.className);
      const nextDenemeSettings: RahleDenemeSettings = {
        targetJuz: criteria.defaultTargetJuz,
        evaluationMonth: criteria.defaultEvaluationMonth,
        studyDaysPerWeek: criteria.defaultStudyDaysPerWeek,
        dailyTargetPages: criteria.defaultDailyTargetPages,
        teacherOverallNote: base.denemeCuzuSettings?.teacherOverallNote || '',
        commissionNote: criteria.defaultCommissionNote
      };
      nextProfiles[row.key] = {
        ...base,
        denemeCuzuSettings: nextDenemeSettings
      };
    });

    saveCriteriaToStore(criteria);
    saveProfilesToStore(
      nextProfiles,
      `Kurum kriterleri kaydedildi ve ${targetRows.length} öğrencinin Deneme Cüzü ayarlarına uygulandı.`
    );
  };

  const handleClearMockRecords = () => {
    const nextProfiles: Record<string, RahleStudentProfile> = {};
    Object.entries(profiles).forEach(([key, prof]) => {
      nextProfiles[key] = cleanMockProfile(prof);
    });
    saveProfilesToStore(nextProfiles, 'Tüm öğrencilerdeki örnek/test kayıtları temizlendi.');
  };

  const handleResetClassData = (clsName: string) => {
    const nextProfiles = { ...profiles };
    (classes[clsName] || []).forEach((stuName) => {
      const key = `${clsName}_${stuName}`;
      const existing = nextProfiles[key] || createDefaultRahleProfile(stuName, clsName);
      nextProfiles[key] = {
        ...createDefaultRahleProfile(stuName, clsName),
        advisorTeacher: existing.advisorTeacher || ''
      };
    });
    saveProfilesToStore(nextProfiles, `${formatClassLabel(clsName)} sınıfının hafızlık takip kayıtları sıfırlandı.`);
    setConfirmResetClass(null);
  };

  const handleResetAllInstitutionData = () => {
    const nextProfiles: Record<string, RahleStudentProfile> = {};
    Object.entries(classes).forEach(([clsName, stus]) => {
      (stus || []).forEach((stuName) => {
        const key = `${clsName}_${stuName}`;
        nextProfiles[key] = createDefaultRahleProfile(stuName, clsName);
      });
    });
    saveProfilesToStore(nextProfiles, 'Kurumdaki tüm hafız öğrencilerin ezber ve ders verileri sıfırlandı.');
    setConfirmFullReset(false);
  };

  // Institution-wide KPI calculations
  const institutionStats = useMemo(() => {
    const totalStudents = allStudentRows.length;
    const activeCount = allStudentRows.filter((r) => (r.profile.status || 'devam_ediyor') === 'devam_ediyor').length;
    const graduateCount = allStudentRows.filter((r) => r.profile.status === 'mezun').length;
    const pendingCount = allStudentRows.filter((r) => r.profile.status === 'onay_bekliyor').length;
    const totalHam = allStudentRows.reduce((acc, r) => acc + r.stats.totalHam, 0);
    const totalHas = allStudentRows.reduce((acc, r) => acc + r.stats.totalHas, 0);
    const avgPercentage =
      totalStudents > 0
        ? Math.round(allStudentRows.reduce((acc, r) => acc + r.stats.percentage, 0) / totalStudents)
        : 0;

    return {
      totalStudents,
      activeCount,
      graduateCount,
      pendingCount,
      totalHam,
      totalHas,
      avgPercentage
    };
  }, [allStudentRows]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Shared Filter Bar for Student & Planning Tabs */}
      {(activeSubTab === 'rahle_students' || activeSubTab === 'rahle_planning') && (
        <div className="bg-amber-50/40 rounded-3xl p-5 border border-amber-200/70 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterClass('')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                !filterClass
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300'
              }`}
            >
              Tüm Sınıflar ({allStudentRows.length})
            </button>
            {Object.keys(classes)
              .sort()
              .map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterClass === cls
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300'
                  }`}
                >
                  {formatClassLabel(cls)} ({classes[cls]?.length || 0})
                </button>
              ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="devam_ediyor">Devam Ediyor</option>
              <option value="onay_bekliyor">Komisyon Onayı Bekliyor</option>
              <option value="mezun">Mezun (Hafızlığını Tamamladı)</option>
              <option value="ayrildi">Ayrıldı / Kayıt Dondurdu</option>
            </select>

            <div className="relative min-w-[240px]">
              <Search size={15} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hafız öğrenci veya danışman hoca ara..."
                className="w-full bg-white pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 1. HAFIZ ÖĞRENCİ DURUM VE DANIŞMAN HOCA ATAMASI */}
      {activeSubTab === 'rahle_students' && (
        <div className="space-y-6">
          {/* Bulk Assignment Toolbar */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <UserCheck size={18} className="text-amber-600" />
                  Toplu Danışman Hoca ve Hafızlık Durumu Atama
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Tablodan seçtiğiniz ({selectedKeys.length > 0 ? `${selectedKeys.length} seçili öğrenci` : `filtrelenen ${filteredRows.length} öğrenci`}) için tek seferde danışman hoca, durum veya başlama tarihi atayın.
                </p>
              </div>
              {selectedKeys.length > 0 && (
                <button
                  onClick={() => setSelectedKeys([])}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer self-start sm:self-center"
                >
                  Seçimi Temizle ({selectedKeys.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Danışman Hafızlık Hocası</label>
                <input
                  list="rahle-advisor-list"
                  value={bulkAdvisor}
                  onChange={(e) => setBulkAdvisor(e.target.value)}
                  placeholder="Hoca seçin veya yazın..."
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                />
                <datalist id="rahle-advisor-list">
                  {teacherOptions.map((t: any, i: number) => (
                    <option key={i} value={t.name || t.username} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Hafızlık Durumu</label>
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  <option value="">Değiştirme</option>
                  <option value="devam_ediyor">Devam Ediyor</option>
                  <option value="onay_bekliyor">Onay Bekliyor</option>
                  <option value="mezun">Mezun</option>
                  <option value="ayrildi">Ayrıldı</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Hafızlığa Başlama Tarihi</label>
                <input
                  type="date"
                  value={bulkStartDate}
                  onChange={(e) => setBulkStartDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <button
                onClick={handleApplyBulkStudentAssignment}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs h-[38px]"
              >
                <Save size={15} />
                Toplu Uygula
              </button>
            </div>
          </div>

          {/* Students Assignment Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs tabular-nums">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={filteredRows.length > 0 && filteredRows.every((r) => selectedKeys.includes(r.key))}
                        onChange={handleToggleSelectAll}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="p-4">Sınıf</th>
                    <th className="p-4">Hafız Öğrenci</th>
                    <th className="p-4">Hafızlık Durumu</th>
                    <th className="p-4">Danışman Hoca</th>
                    <th className="p-4">Başlama Tarihi</th>
                    <th className="p-4">Mevcut İlerleme</th>
                    <th className="p-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRows.map((row) => {
                    const isSelected = selectedKeys.includes(row.key);
                    return (
                      <tr key={row.key} className={`hover:bg-amber-50/20 transition-colors ${isSelected ? 'bg-amber-50/40' : ''}`}>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleRow(row.key)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-bold text-amber-900 whitespace-nowrap">
                          {formatClassLabel(row.className)}
                        </td>
                        <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                          {row.studentName}
                        </td>
                        <td className="p-4">
                          <select
                            value={row.profile.status || 'devam_ediyor'}
                            onChange={(e) =>
                              handleUpdateSingleProfile(
                                row.key,
                                row.studentName,
                                row.className,
                                { status: e.target.value as any },
                                `${row.studentName} durumu güncellendi.`
                              )
                            }
                            className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="devam_ediyor">Devam Ediyor</option>
                            <option value="onay_bekliyor">Onay Bekliyor</option>
                            <option value="mezun">Mezun (Hafız)</option>
                            <option value="ayrildi">Ayrıldı</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <input
                            list="rahle-advisor-list"
                            value={row.profile.advisorTeacher || ''}
                            onChange={(e) =>
                              handleUpdateSingleProfile(row.key, row.studentName, row.className, {
                                advisorTeacher: e.target.value
                              })
                            }
                            placeholder="Danışman hoca ata..."
                            className="w-44 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="date"
                            value={row.profile.hafizlikBaslamaTarihi || ''}
                            onChange={(e) =>
                              handleUpdateSingleProfile(row.key, row.studentName, row.className, {
                                hafizlikBaslamaTarihi: e.target.value
                              })
                            }
                            className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                          />
                        </td>
                        <td className="p-4 text-gray-600 font-semibold whitespace-nowrap">
                          {row.profile.kacinciDonuste}. Dönüş · %{row.stats.percentage} ({row.stats.totalMemorizedPages}/600 syf)
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              handleUpdateSingleProfile(
                                row.key,
                                row.studentName,
                                row.className,
                                {
                                  dailyEntries: {},
                                  cuzPageProgress: {},
                                  donusHistory: [],
                                  yuzundenRecords: [],
                                  denemeCuzuRecords: [],
                                  hamSayisi: 0,
                                  hasSayisi: 0,
                                  kacinciDonuste: 1
                                },
                                `${row.studentName} ezber kayıtları sıfırlandı.`
                              );
                            }}
                            className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Öğrencinin Ezber Kayıtlarını Sıfırla"
                          >
                            <RefreshCw size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-gray-400 font-medium">
                        Seçili filtrelere uygun hafız öğrenci bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. DÖNÜŞ, SAYFA USULÜ VE HEDEF BİTİŞ AYARLARI */}
      {activeSubTab === 'rahle_planning' && (
        <div className="space-y-6">
          {/* Bulk Turn & Page Planning Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Layers size={18} className="text-amber-600" />
                  Toplu Dönüş, Sayfa Usulü ve Hedef Bitiş Planlama
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Hafız öğrencilerin kaçıncı dönüşte olduğunu, kaç sayfa usulüyle ilerlediğini ve hedef bitiş tarihlerini toplu veya bireysel yapılandırın.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Kaçıncı Dönüşte (1-30)</label>
                <select
                  value={bulkDonus}
                  onChange={(e) => setBulkDonus(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  <option value="">Değiştirme</option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}. Dönüş
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Sayfa Usulü (1-20 Sayfa)</label>
                <select
                  value={bulkSayfaUsulu}
                  onChange={(e) => setBulkSayfaUsulu(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  <option value="">Değiştirme</option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} Sayfa Usulü
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Dönüş Başlama Tarihi</label>
                <input
                  type="date"
                  value={bulkDonusStart}
                  onChange={(e) => setBulkDonusStart(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500">Hedef Bitirme Tarihi</label>
                <input
                  type="date"
                  value={bulkTargetEnd}
                  onChange={(e) => setBulkTargetEnd(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <button
                onClick={handleApplyBulkPlanning}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs h-[38px]"
              >
                <Save size={15} />
                Planlamayı Uygula
              </button>
            </div>
          </div>

          {/* Individual Turn & Page Planning Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs tabular-nums">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={filteredRows.length > 0 && filteredRows.every((r) => selectedKeys.includes(r.key))}
                        onChange={handleToggleSelectAll}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </th>
                    <th className="p-4">Sınıf</th>
                    <th className="p-4">Hafız Öğrenci</th>
                    <th className="p-4">Aktif Dönüş</th>
                    <th className="p-4">Sayfa Usulü</th>
                    <th className="p-4">Dönüş Başlangıç</th>
                    <th className="p-4">Hedef Bitirme</th>
                    <th className="p-4">Ham / Has Özeti</th>
                    <th className="p-4">Komisyon / İdare Notu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRows.map((row) => {
                    const isSelected = selectedKeys.includes(row.key);
                    return (
                      <tr key={row.key} className={`hover:bg-amber-50/20 transition-colors ${isSelected ? 'bg-amber-50/40' : ''}`}>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleRow(row.key)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-bold text-amber-900 whitespace-nowrap">
                          {formatClassLabel(row.className)}
                        </td>
                        <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                          {row.studentName}
                        </td>
                        <td className="p-4">
                          <select
                            value={row.profile.kacinciDonuste || 1}
                            onChange={(e) =>
                              handleUpdateSingleProfile(
                                row.key,
                                row.studentName,
                                row.className,
                                { kacinciDonuste: Number(e.target.value) },
                                `${row.studentName} dönüş bilgisi güncellendi.`
                              )
                            }
                            className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 outline-none focus:border-amber-500 cursor-pointer"
                          >
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                {n}. Dönüş
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <select
                            value={row.profile.kacSayfaylaGidiyor || 1}
                            onChange={(e) =>
                              handleUpdateSingleProfile(
                                row.key,
                                row.studentName,
                                row.className,
                                { kacSayfaylaGidiyor: Number(e.target.value) },
                                `${row.studentName} sayfa usulü güncellendi.`
                              )
                            }
                            className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 outline-none focus:border-amber-500 cursor-pointer"
                          >
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                {n} Sayfa
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <input
                            type="date"
                            value={row.profile.donusBaslamaTarihi || ''}
                            onChange={(e) =>
                              handleUpdateSingleProfile(row.key, row.studentName, row.className, {
                                donusBaslamaTarihi: e.target.value
                              })
                            }
                            className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="date"
                            value={row.profile.targetCompletionDate || ''}
                            onChange={(e) =>
                              handleUpdateSingleProfile(row.key, row.studentName, row.className, {
                                targetCompletionDate: e.target.value
                              })
                            }
                            className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-amber-500"
                          />
                        </td>
                        <td className="p-4 whitespace-nowrap font-semibold text-gray-600">
                          {row.stats.totalHam} Ham · {row.stats.totalHas} Has
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={row.profile.notes || ''}
                            onChange={(e) =>
                              handleUpdateSingleProfile(row.key, row.studentName, row.className, {
                                notes: e.target.value
                              })
                            }
                            placeholder="Özel hedef / komisyon notu..."
                            className="w-52 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 outline-none focus:bg-white focus:border-amber-500"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. DENEME CÜZÜ VE YÜZÜNDEN OKUMA KRİTER AYARLARI */}
      {activeSubTab === 'rahle_criteria' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Yüzünden Okuma & Hazırlık Kriterleri */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Clock size={20} className="text-amber-600" />
                  Yüzünden Okuma &amp; Hazırlık Baraj Kriterleri
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Öğrencinin esas hafızlığa geçiş öncesi yüzünden okuma akıcılığı, mahreç ve tecvid baraj standartları.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 tabular-nums">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">1 Sayfa Hedef Okuma Süresi (Saniye)</label>
                <input
                  type="number"
                  min={60}
                  max={600}
                  value={criteria.targetReadingSeconds}
                  onChange={(e) => setCriteria({ ...criteria, targetReadingSeconds: Number(e.target.value) || 120 })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500"
                />
                <p className="text-[11px] text-gray-400">Standart HETS tavsiyesi: 90 - 120 sn (1.5 - 2 dk)</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Minimum Hazırlık Endeks Barajı (0-100)</label>
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={criteria.minReadinessIndex}
                  onChange={(e) => setCriteria({ ...criteria, minReadinessIndex: Number(e.target.value) || 85 })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500"
                />
                <p className="text-[11px] text-gray-400">Hız (40p) + Mahreç (30p) + Tecvid (30p) toplamı</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Minimum Mahreç Puanı (1-5 Ölçek)</label>
                <select
                  value={criteria.minMahrecScore}
                  onChange={(e) => setCriteria({ ...criteria, minMahrecScore: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <option key={s} value={s}>
                      En Az {s} / 5 Puan
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Minimum Tecvid Puanı (1-5 Ölçek)</label>
                <select
                  value={criteria.minTecvidScore}
                  onChange={(e) => setCriteria({ ...criteria, minTecvidScore: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <option key={s} value={s}>
                      En Az {s} / 5 Puan
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-700">Tavsiye Edilen Günlük Yüzünden Tekrar Sayfası</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={criteria.recommendedDailyReadingPages}
                  onChange={(e) => setCriteria({ ...criteria, recommendedDailyReadingPages: Number(e.target.value) || 5 })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => saveCriteriaToStore(DEFAULT_CRITERIA, 'Varsayılan hazırlık ve deneme kriterleri yüklendi.')}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Varsayılanlara Sıfırla
              </button>
              <button
                onClick={() => saveCriteriaToStore(criteria, 'Yüzünden okuma hazırlık kriterleri kaydedildi.')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Save size={15} />
                Hazırlık Kriterlerini Kaydet
              </button>
            </div>
          </div>

          {/* Card B: Deneme Cüzü & Potansiyel Simülasyon Kriterleri */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-amber-600" />
                  Deneme Cüzü &amp; Komisyon Kriterleri
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  1 aylık Deneme Cüzü (Amme Cüzü vb.) takip parametrelerini yapılandırın ve sınıflara topluca uygulayın.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 tabular-nums">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Varsayılan Deneme Cüzü (1-30)</label>
                <select
                  value={criteria.defaultTargetJuz}
                  onChange={(e) => setCriteria({ ...criteria, defaultTargetJuz: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((j) => (
                    <option key={j} value={j}>
                      {j}. Cüz {j === 30 ? '(Amme Cüzü)' : j === 1 ? '(Elif-Lam-Mim)' : j === 29 ? '(Tebareke Cüzü)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Değerlendirme Dönemi (Ay)</label>
                <input
                  type="month"
                  value={criteria.defaultEvaluationMonth}
                  onChange={(e) => setCriteria({ ...criteria, defaultEvaluationMonth: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Haftalık Ders Günü Sayısı</label>
                <select
                  value={criteria.defaultStudyDaysPerWeek}
                  onChange={(e) => setCriteria({ ...criteria, defaultStudyDaysPerWeek: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  <option value={5}>Haftada 5 Gün (Hafta İçi)</option>
                  <option value={6}>Haftada 6 Gün (Cumartesi Dahil)</option>
                  <option value={7}>Haftada 7 Gün (Kesintisiz)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Günlük Hedef Ezber Sayfası</label>
                <select
                  value={criteria.defaultDailyTargetPages}
                  onChange={(e) => setCriteria({ ...criteria, defaultDailyTargetPages: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                >
                  <option value={1}>Günde 1 Sayfa (Standart)</option>
                  <option value={2}>Günde 2 Sayfa (Hızlı Program)</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-gray-700">Komisyon / İdare Onay Notu Şablonu</label>
                <textarea
                  rows={3}
                  value={criteria.defaultCommissionNote}
                  onChange={(e) => setCriteria({ ...criteria, defaultCommissionNote: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-800 outline-none focus:bg-white focus:border-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <select
                value={criteriaTargetClass}
                onChange={(e) => setCriteriaTargetClass(e.target.value)}
                className="bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="all">Tüm Sınıflardaki Öğrencilere Uygula</option>
                {Object.keys(classes)
                  .sort()
                  .map((cls) => (
                    <option key={cls} value={cls}>
                      Sadece {formatClassLabel(cls)} Sınıfına Uygula
                    </option>
                  ))}
              </select>

              <button
                onClick={handleApplyCriteriaToStudents}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
              >
                <ShieldCheck size={16} />
                Kaydet ve Öğrencilere Uygula
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. KURUM GENEL HAFIZLIK İSTATİSTİKLERİ VE VERİ SIFIRLAMA */}
      {activeSubTab === 'rahle_stats' && (
        <div className="space-y-6">
          {/* Summary KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 tabular-nums">
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400">Toplam Hafız Öğrenci</div>
              <div className="text-3xl font-black text-gray-900 mt-1">{institutionStats.totalStudents}</div>
              <div className="text-[11px] font-semibold text-amber-700 mt-1">
                {Object.keys(classes).length} aktif sınıf
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400">Devam Eden Hafız</div>
              <div className="text-3xl font-black text-amber-600 mt-1">{institutionStats.activeCount}</div>
              <div className="text-[11px] font-semibold text-gray-500 mt-1">
                {institutionStats.pendingCount} komisyon onayında
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400">Mezun Hafız Sayısı</div>
              <div className="text-3xl font-black text-emerald-600 mt-1">{institutionStats.graduateCount}</div>
              <div className="text-[11px] font-semibold text-gray-500 mt-1">
                Hafızlığını tamamlayan
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400">Kurum Ezber Ortalaması</div>
              <div className="text-3xl font-black text-gray-900 mt-1">%{institutionStats.avgPercentage}</div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${institutionStats.avgPercentage}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold text-gray-400">Toplam Okunan Sayfa</div>
              <div className="text-3xl font-black text-gray-900 mt-1">
                {institutionStats.totalHam + institutionStats.totalHas}
              </div>
              <div className="text-[11px] font-semibold text-gray-500 mt-1">
                {institutionStats.totalHam} Ham · {institutionStats.totalHas} Has
              </div>
            </div>
          </div>

          {/* Class Breakdown Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <BarChart3 size={18} className="text-amber-600" />
                  Sınıf Bazlı Hafızlık İlerleme ve Veri Tablosu
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Her sınıfın ortalama dönüş, Ham/Has sayfa toplamı ve mezuniyet dağılımı.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs tabular-nums">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4">Sınıf</th>
                    <th className="p-4">Öğrenci Sayısı</th>
                    <th className="p-4">Devam Eden / Mezun</th>
                    <th className="p-4">Ortalama Dönüş</th>
                    <th className="p-4">Toplam Ham / Has</th>
                    <th className="p-4">Ortalama İlerleme</th>
                    <th className="p-4 text-right">Sınıf Verisi İşlemi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Object.keys(classes)
                    .sort()
                    .map((cls) => {
                      const clsRows = allStudentRows.filter((r) => r.className === cls);
                      const count = clsRows.length;
                      const active = clsRows.filter((r) => (r.profile.status || 'devam_ediyor') === 'devam_ediyor').length;
                      const grad = clsRows.filter((r) => r.profile.status === 'mezun').length;
                      const avgDonus =
                        count > 0
                          ? (clsRows.reduce((a, r) => a + (r.profile.kacinciDonuste || 1), 0) / count).toFixed(1)
                          : '1.0';
                      const ham = clsRows.reduce((a, r) => a + r.stats.totalHam, 0);
                      const has = clsRows.reduce((a, r) => a + r.stats.totalHas, 0);
                      const avgPct =
                        count > 0 ? Math.round(clsRows.reduce((a, r) => a + r.stats.percentage, 0) / count) : 0;

                      return (
                        <tr key={cls} className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 font-black text-amber-900">{formatClassLabel(cls)}</td>
                          <td className="p-4 font-bold text-gray-800">{count} Öğrenci</td>
                          <td className="p-4 font-semibold text-gray-600">
                            {active} Aktif · {grad} Mezun
                          </td>
                          <td className="p-4 font-bold text-gray-800">{avgDonus}. Dönüş</td>
                          <td className="p-4 font-semibold text-gray-600">
                            {ham} Ham · {has} Has
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${avgPct}%` }} />
                              </div>
                              <span className="font-bold text-gray-900">%{avgPct}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            {confirmResetClass === cls ? (
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => handleResetClassData(cls)}
                                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-black cursor-pointer"
                                >
                                  Onayla Sıfırla
                                </button>
                                <button
                                  onClick={() => setConfirmResetClass(null)}
                                  className="px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-bold cursor-pointer"
                                >
                                  Vazgeç
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmResetClass(cls)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50 text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Sınıf Ezberlerini Sıfırla
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Safe Data Reset & Maintenance Center */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-600" />
                Hafızlık Veri Temizleme ve Sıfırlama Merkezi
              </h3>
              <p className="text-xs text-gray-500 font-medium max-w-2xl">
                Sistemdeki örnek/deneme verilerini temizleyebilir veya yeni dönem başlangıcında tüm hafızlık takip kayıtlarını sıfırlayabilirsiniz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleClearMockRecords}
                className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCw size={14} />
                Örnek Verileri Temizle
              </button>

              {confirmFullReset ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetAllInstitutionData}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-colors cursor-pointer"
                  >
                    Tüm Kayıtları Kalıcı Sıfırla
                  </button>
                  <button
                    onClick={() => setConfirmFullReset(false)}
                    className="px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold cursor-pointer"
                  >
                    İptal
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmFullReset(true)}
                  className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Tüm Kurum Verilerini Sıfırla
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
