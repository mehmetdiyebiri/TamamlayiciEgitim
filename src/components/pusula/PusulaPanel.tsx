import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Calendar, 
  FileText, 
  Users, 
  Search, 
  ChevronRight, 
  Target, 
  Sparkles,
  Printer,
  Plus
} from 'lucide-react';
import { PusulaStudentProfile, PusulaExam, PusulaPlanItem, PusulaCoachingNote } from '../../types/pusula';
import { PusulaDashboard } from './PusulaDashboard';
import { PusulaResources } from './PusulaResources';
import { PusulaExams } from './PusulaExams';
import { PusulaPlan } from './PusulaPlan';
import { PusulaNotes } from './PusulaNotes';
import { PusulaPdfExamImportModal, PdfImportMode } from './PusulaPdfExamImportModal';

interface PusulaPanelProps {
  state: any;
  actions: any;
  selectedClass: string | null;
  selectedStudent: string | null;
  onSelectStudent: (student: string) => void;
  onSelectClass: (className: string) => void;
  classes: Record<string, string[]>;
  activeSchoolId: string;
  activeTab?: string;
  onSelectTab?: (tab: 'dashboard' | 'resources' | 'exams' | 'plan' | 'notes') => void;
  isStudent?: boolean;
  readOnly?: boolean;
  strictClassesOnly?: boolean;
}

export const PusulaPanel: React.FC<PusulaPanelProps> = ({
  state,
  actions,
  selectedClass,
  selectedStudent,
  onSelectStudent,
  onSelectClass,
  classes = {},
  activeSchoolId,
  activeTab,
  onSelectTab,
  isStudent = false,
  readOnly = false,
  strictClassesOnly: _strictClassesOnly = false
}) => {
  const isReadOnly = Boolean(isStudent || readOnly);
  const canEditGoal = !readOnly;
  const [internalTab, setInternalTab] = useState<'dashboard' | 'resources' | 'exams' | 'plan' | 'notes'>('dashboard');
  const pusulaTab: 'dashboard' | 'resources' | 'exams' | 'plan' | 'notes' = 
    (activeTab && ['dashboard', 'resources', 'exams', 'plan', 'notes'].includes(activeTab))
      ? (activeTab as any)
      : internalTab;

  const setPusulaTab = (tab: 'dashboard' | 'resources' | 'exams' | 'plan' | 'notes') => {
    setInternalTab(tab);
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  const [studentSearch, setStudentSearch] = useState('');
  
  // Modals triggerable from anywhere
  const [isOpenExamModal, setIsOpenExamModal] = useState(false);
  const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
  const [isOpenGoalModal, setIsOpenGoalModal] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfModalMode, setPdfModalMode] = useState<PdfImportMode>('okul');

  const handleOpenPdfModal = (m: PdfImportMode) => {
    if (isReadOnly) return;
    setPdfModalMode(m);
    setIsPdfModalOpen(true);
  };

  // Goal modal state
  const [targetSchoolInput, setTargetSchoolInput] = useState('');
  const [targetScoreInput, setTargetScoreInput] = useState('');
  const [weeklyGoalInput, setWeeklyGoalInput] = useState<number>(750);

  interface DeletedExamTombstone {
    name: string;
    date: string;
    deletedAt?: string;
  }

  const LEGACY_DELETED_EXAMS: DeletedExamTombstone[] = [
    { name: 'BH Kurumsal Deneme Sınavı - SDS-1 (Tüm Sınıflar)', date: '2026-11-03' },
    { name: 'BH-6. SINIF(DEVLET)-SDS-1', date: '2026-11-02' },
    { name: 'ABC YAYINLARI', date: '2026-10-07' }
  ];

  // Pusula Profiles Database in memory / Firestore / localStorage
  const storageKey = `pusula_profiles_${activeSchoolId || 'default'}`;
  const deletedStorageKey = `pusula_deleted_exams_${activeSchoolId || 'default'}`;
  const legacyPurgeStorageKey = `pusula_legacy_purge_v1_${activeSchoolId || 'default'}`;

  const [deletedExams, setDeletedExams] = useState<DeletedExamTombstone[]>(() => {
    try {
      const stored = localStorage.getItem(deletedStorageKey);
      const parsed: DeletedExamTombstone[] = stored ? JSON.parse(stored) : [];
      const legacyDone = localStorage.getItem(legacyPurgeStorageKey) === '1';
      if (legacyDone) return Array.isArray(parsed) ? parsed : [];
      const merged = [...(Array.isArray(parsed) ? parsed : [])];
      LEGACY_DELETED_EXAMS.forEach(item => {
        const exists = merged.some(
          m => m.name === item.name && (m.date || '') === (item.date || '')
        );
        if (!exists) merged.push(item);
      });
      return merged;
    } catch {
      return [...LEGACY_DELETED_EXAMS];
    }
  });

  const deletedExamsRef = React.useRef<DeletedExamTombstone[]>(deletedExams);
  React.useEffect(() => {
    deletedExamsRef.current = deletedExams;
  }, [deletedExams]);

  const legacyPurgeDoneRef = React.useRef<boolean>(
    (() => {
      try {
        return localStorage.getItem(legacyPurgeStorageKey) === '1';
      } catch {
        return false;
      }
    })()
  );

  const [profiles, setProfiles] = useState<Record<string, PusulaStudentProfile>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const profilesRef = React.useRef<Record<string, PusulaStudentProfile>>(profiles);
  React.useEffect(() => {
    profilesRef.current = profiles;
  }, [profiles]);

  const lastLocalSaveTimeRef = React.useRef<number>(0);

  // Safe localStorage writer that never throws QuotaExceededError
  const safeWriteLocalStorage = (key: string, data: Record<string, PusulaStudentProfile>) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      try {
        // Free up space from old school keys if needed
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('pusula_profiles_') && k !== key) {
            localStorage.removeItem(k);
          }
        });
        localStorage.setItem(key, JSON.stringify(data));
      } catch (innerErr) {
        console.warn("Pusula localStorage quota warning:", innerErr);
      }
    }
  };

  // Helper: Normalize Turkish strings for student/class matching
  const normalizeStr = (str: string) => {
    return (str || '')
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .replace(/ı/g, 'i')
      .replace(/Ğ/g, 'g')
      .replace(/ğ/g, 'g')
      .replace(/Ü/g, 'u')
      .replace(/ü/g, 'u')
      .replace(/Ş/g, 's')
      .replace(/ş/g, 's')
      .replace(/Ö/g, 'o')
      .replace(/ö/g, 'o')
      .replace(/Ç/g, 'c')
      .replace(/ç/g, 'c')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  const extractNameAndNo = (raw: string) => {
    const trimmed = (raw || '').trim();
    const m = trimmed.match(/^(\d+)\s*[-–.]+\s*(.+)$/);
    if (m) return { no: m[1].trim(), nameOnly: m[2].trim() };
    return { no: '', nameOnly: trimmed };
  };

  const cleanPlaceholderGoal = (val?: string): string => {
    const t = (val || '').trim();
    if (!t || t === 'Hedef Belirlenmedi' || t === 'Belirlenmedi') return '';
    return t;
  };

  const isExamMatchingTombstone = (ex: PusulaExam | null | undefined, tomb: DeletedExamTombstone): boolean => {
    if (!ex || !ex.name || !tomb.name) return false;
    const exName = ex.name.trim();
    const tName = tomb.name.trim();
    const nameMatch = exName === tName || normalizeStr(exName) === normalizeStr(tName);
    if (!nameMatch) return false;
    const tDate = (tomb.date || '').trim();
    if (tDate) {
      const exDate = (ex.date || '').trim();
      return exDate === tDate;
    }
    return true;
  };

  const mergeTombstones = (
    a: DeletedExamTombstone[],
    b: DeletedExamTombstone[]
  ): DeletedExamTombstone[] => {
    const map = new Map<string, DeletedExamTombstone>();
    [...(a || []), ...(b || [])].forEach(t => {
      if (!t || !t.name) return;
      const key = `${normalizeStr(t.name)}__${(t.date || '').trim()}`;
      if (!map.has(key)) {
        map.set(key, { name: t.name.trim(), date: (t.date || '').trim(), deletedAt: t.deletedAt });
      }
    });
    return Array.from(map.values());
  };

  const stripDeletedExamsFromProfiles = (
    rawMap: Record<string, PusulaStudentProfile>,
    tombstones: DeletedExamTombstone[]
  ): Record<string, PusulaStudentProfile> => {
    if (!tombstones || tombstones.length === 0) return rawMap;
    const cleaned: Record<string, PusulaStudentProfile> = {};
    Object.entries(rawMap || {}).forEach(([k, prof]) => {
      if (!prof) return;
      const filteredExams = (prof.exams || []).filter(
        ex => !tombstones.some(t => isExamMatchingTombstone(ex, t))
      );
      cleaned[k] = filteredExams.length === (prof.exams?.length || 0)
        ? prof
        : { ...prof, exams: filteredExams };
    });
    return cleaned;
  };

  // Deduplicate alias keys (e.g. "7-A_EFE TUÇDOĞAN" and "7A_20 - EFE TUÇDOĞAN") and strip redundant fields so Firestore documents stay compact
  const deduplicateProfilesMap = (
    rawMap: Record<string, PusulaStudentProfile>
  ): Record<string, PusulaStudentProfile> => {
    const byIdentity = new Map<string, { key: string; profile: PusulaStudentProfile }>();

    const resolveCanonicalTarget = (rawKey: string, prof: PusulaStudentProfile) => {
      const fallbackClass = rawKey.includes('_') ? rawKey.split('_')[0] : 'Genel';
      const fallbackName = rawKey.includes('_') ? rawKey.split('_').slice(1).join('_') : rawKey;
      const stuName = (prof.studentName || fallbackName).trim();
      const clsName = (prof.className || fallbackClass).trim();
      const parts = extractNameAndNo(stuName);
      const normName = normalizeStr(parts.nameOnly);
      const normCls = normalizeStr(clsName);

      for (const [sysCls, stList] of Object.entries(classes || {})) {
        if (normalizeStr(sysCls) !== normCls) continue;
        for (const sysStu of stList || []) {
          const sysParts = extractNameAndNo(sysStu);
          if (
            normalizeStr(sysParts.nameOnly) === normName ||
            (parts.no && parts.no !== '0' && sysParts.no === parts.no)
          ) {
            return {
              canonicalKey: `${sysCls}_${sysStu}`,
              studentName: sysStu,
              className: sysCls,
              identityKey: `${normalizeStr(sysCls)}_${normalizeStr(sysParts.nameOnly)}`
            };
          }
        }
      }

      // If class was generic/empty, try resolving against a unique registered student by exact name
      if (!normCls || normCls === 'genel') {
        const nameMatches: Array<{ sysCls: string; sysStu: string; nameOnly: string }> = [];
        for (const [sysCls, stList] of Object.entries(classes || {})) {
          if (sysCls === 'Hafızlık Havuzu') continue;
          for (const sysStu of stList || []) {
            const sysParts = extractNameAndNo(sysStu);
            if (normalizeStr(sysParts.nameOnly) === normName) {
              nameMatches.push({ sysCls, sysStu, nameOnly: sysParts.nameOnly });
            }
          }
        }
        if (nameMatches.length === 1) {
          const m = nameMatches[0];
          return {
            canonicalKey: `${m.sysCls}_${m.sysStu}`,
            studentName: m.sysStu,
            className: m.sysCls,
            identityKey: `${normalizeStr(m.sysCls)}_${normalizeStr(m.nameOnly)}`
          };
        }
      }

      return {
        canonicalKey: `${clsName}_${stuName}`,
        studentName: stuName,
        className: clsName,
        identityKey: `${normCls}_${normName}`
      };
    };

    const sanitizeExam = (ex: PusulaExam): PusulaExam => {
      const copy: any = { ...ex };
      delete copy.weakAreas;
      return copy as PusulaExam;
    };

    Object.entries(rawMap || {}).forEach(([rawKey, prof]) => {
      if (!prof) return;
      const { canonicalKey, studentName, className, identityKey } = resolveCanonicalTarget(rawKey, prof);
      if (!identityKey || identityKey === '_') return;

      const existingEntry = byIdentity.get(identityKey);
      if (!existingEntry) {
        const examMap = new Map<string, PusulaExam>();
        (prof.exams || []).forEach(ex => {
          if (!ex) return;
          examMap.set(`${(ex.name || '').trim()}_${(ex.date || '').trim()}`, sanitizeExam(ex));
        });
        byIdentity.set(identityKey, {
          key: canonicalKey,
          profile: {
            ...prof,
            studentName,
            className,
            targetSchool: cleanPlaceholderGoal(prof.targetSchool),
            targetScoreOrNet: cleanPlaceholderGoal(prof.targetScoreOrNet),
            exams: Array.from(examMap.values())
          }
        });
      } else {
        const prev = existingEntry.profile;
        const examMap = new Map<string, PusulaExam>();
        (prev.exams || []).forEach(ex => {
          if (!ex) return;
          examMap.set(`${(ex.name || '').trim()}_${(ex.date || '').trim()}`, sanitizeExam(ex));
        });
        (prof.exams || []).forEach(ex => {
          if (!ex) return;
          const dKey = `${(ex.name || '').trim()}_${(ex.date || '').trim()}`;
          const cur = examMap.get(dKey);
          if (!cur || (ex.outcomes?.length || 0) > (cur.outcomes?.length || 0)) {
            examMap.set(dKey, sanitizeExam(ex));
          }
        });

        const preferNewKey =
          canonicalKey.includes(' - ') || !existingEntry.key.includes(' - ');

        byIdentity.set(identityKey, {
          key: preferNewKey ? canonicalKey : existingEntry.key,
          profile: {
            ...prev,
            ...prof,
            studentName: preferNewKey ? studentName : prev.studentName,
            className: preferNewKey ? className : prev.className,
            targetSchool: cleanPlaceholderGoal(prof.targetSchool) || cleanPlaceholderGoal(prev.targetSchool),
            targetScoreOrNet: cleanPlaceholderGoal(prof.targetScoreOrNet) || cleanPlaceholderGoal(prev.targetScoreOrNet),
            weeklyQuestionGoal: prof.weeklyQuestionGoal || prev.weeklyQuestionGoal || 750,
            weeklyPlan:
              (prof.weeklyPlan?.length || 0) >= (prev.weeklyPlan?.length || 0)
                ? prof.weeklyPlan || []
                : prev.weeklyPlan || [],
            coachingNotes:
              (prof.coachingNotes?.length || 0) >= (prev.coachingNotes?.length || 0)
                ? prof.coachingNotes || []
                : prev.coachingNotes || [],
            exams: Array.from(examMap.values())
          }
        });
      }
    });

    const result: Record<string, PusulaStudentProfile> = {};
    byIdentity.forEach(({ key, profile }) => {
      result[key] = profile;
    });
    return result;
  };

  const countTotalExamsInMap = (map: Record<string, PusulaStudentProfile> | null | undefined) => {
    if (!map) return 0;
    return Object.values(map).reduce((sum, p) => sum + (p?.exams?.length || 0), 0);
  };

  const safeWriteMetaStorage = (tombstones: DeletedExamTombstone[], legacyDone: boolean) => {
    try {
      localStorage.setItem(deletedStorageKey, JSON.stringify(tombstones));
      if (legacyDone) {
        localStorage.setItem(legacyPurgeStorageKey, '1');
      }
    } catch {
      // ignore quota errors for small metadata
    }
  };

  // Persist helper (uses serialized JSON chunks + multi-document overflow sharding to avoid 1 MiB and 20,000 index-entry limits)
  const saveProfiles = async (
    newProfiles: Record<string, PusulaStudentProfile>,
    nextDeletedExams?: DeletedExamTombstone[],
    options?: { legacyPurgeDone?: boolean }
  ) => {
    lastLocalSaveTimeRef.current = Date.now();
    const activeTombstones = nextDeletedExams ?? deletedExamsRef.current;
    const legacyDone = options?.legacyPurgeDone ?? legacyPurgeDoneRef.current;
    const stripped = stripDeletedExamsFromProfiles(newProfiles, activeTombstones);
    const cleanedProfiles = deduplicateProfilesMap(stripped);

    deletedExamsRef.current = activeTombstones;
    setDeletedExams(activeTombstones);
    if (legacyDone) {
      legacyPurgeDoneRef.current = true;
    }

    profilesRef.current = cleanedProfiles;
    setProfiles(cleanedProfiles);
    safeWriteLocalStorage(storageKey, cleanedProfiles);
    safeWriteMetaStorage(activeTombstones, legacyDone);

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      const schoolDocId = activeSchoolId || 'default';
      const serialized = JSON.stringify(cleanedProfiles);
      const chunkSize = 200000;
      const chunks: string[] = [];
      for (let i = 0; i < serialized.length; i += chunkSize) {
        chunks.push(serialized.slice(i, i + chunkSize));
      }

      // Store up to 4 chunks (800KB) in main document; shard any additional chunks into _part_1, _part_2, ...
      const mainChunks = chunks.slice(0, 4);
      const extraChunks = chunks.slice(4);
      const chunksPerExtraDoc = 3;
      const overflowDocCount = Math.ceil(extraChunks.length / chunksPerExtraDoc);

      for (let pIdx = 0; pIdx < overflowDocCount; pIdx++) {
        const partSlice = extraChunks.slice(
          pIdx * chunksPerExtraDoc,
          (pIdx + 1) * chunksPerExtraDoc
        );
        await setDoc(doc(db, 'pusula_coaching', `${schoolDocId}_part_${pIdx + 1}`), {
          profilesChunks: partSlice,
          updatedAt: new Date().toISOString()
        });
      }

      await setDoc(doc(db, 'pusula_coaching', schoolDocId), {
        profilesChunks: mainChunks,
        overflowDocCount,
        deletedExams: activeTombstones,
        legacyPurge20261126Done: legacyDone,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Pusula Firestore save error:", err);
    }
  };

  // Strip any tombstoned/legacy-deleted exams from initial localStorage cache immediately on mount
  React.useEffect(() => {
    const activeTombstones = legacyPurgeDoneRef.current
      ? deletedExamsRef.current
      : mergeTombstones(deletedExamsRef.current, LEGACY_DELETED_EXAMS);
    const cleaned = deduplicateProfilesMap(
      stripDeletedExamsFromProfiles(profilesRef.current, activeTombstones)
    );
    if (countTotalExamsInMap(cleaned) !== countTotalExamsInMap(profilesRef.current)) {
      profilesRef.current = cleaned;
      setProfiles(cleaned);
      safeWriteLocalStorage(storageKey, cleaned);
    }
  }, [storageKey]);

  // Sync with Firestore (Firestore is authoritative so deleted exams are never resurrected from stale localStorage)
  useEffect(() => {
    let isSubscribed = true;
    let hasPersistedLegacyPurge = false;
    let hasAutoSyncedInitial = false;
    (async () => {
      try {
        const { doc, getDoc, onSnapshot } = await import('firebase/firestore');
        const { db } = await import('../../lib/firebase');
        const schoolDocId = activeSchoolId || 'default';
        const docRef = doc(db, 'pusula_coaching', schoolDocId);
        
        const unsub = onSnapshot(docRef, async (snap) => {
          if (!isSubscribed) return;
          // Ignore snapshots that arrive right after a local save to prevent rollback overwrites
          if (Date.now() - lastLocalSaveTimeRef.current < 4000) return;

          if (snap.exists()) {
            const data = snap.data();
            let remoteProfiles: Record<string, PusulaStudentProfile> | null = null;

            if (Array.isArray(data?.profilesChunks) && data.profilesChunks.length > 0) {
              try {
                const allChunks: string[] = [...data.profilesChunks];
                const overflowCount = Number(data?.overflowDocCount || 0);
                for (let pIdx = 1; pIdx <= overflowCount; pIdx++) {
                  const partSnap = await getDoc(
                    doc(db, 'pusula_coaching', `${schoolDocId}_part_${pIdx}`)
                  );
                  if (partSnap.exists() && Array.isArray(partSnap.data()?.profilesChunks)) {
                    allChunks.push(...partSnap.data()!.profilesChunks);
                  }
                }
                remoteProfiles = JSON.parse(allChunks.join(''));
              } catch (e) {
                console.warn("Pusula profilesChunks parse error:", e);
              }
            } else if (typeof data?.profilesJson === 'string' && data.profilesJson) {
              try {
                remoteProfiles = JSON.parse(data.profilesJson);
              } catch (e) {
                console.warn("Pusula profilesJson parse error:", e);
              }
            } else if (data?.profiles && typeof data.profiles === 'object') {
              remoteProfiles = data.profiles;
            }

            const remoteDeletedExams: DeletedExamTombstone[] = Array.isArray(data?.deletedExams)
              ? data.deletedExams
              : [];
            const remoteLegacyDone = Boolean(data?.legacyPurge20261126Done);
            const effectiveTombstones = remoteLegacyDone
              ? remoteDeletedExams
              : mergeTombstones(remoteDeletedExams, LEGACY_DELETED_EXAMS);

            deletedExamsRef.current = effectiveTombstones;
            setDeletedExams(effectiveTombstones);
            if (remoteLegacyDone) {
              legacyPurgeDoneRef.current = true;
            }
            safeWriteMetaStorage(effectiveTombstones, remoteLegacyDone);

            if (remoteProfiles) {
              const rawCount = countTotalExamsInMap(remoteProfiles);
              const cleanedRemote = deduplicateProfilesMap(
                stripDeletedExamsFromProfiles(remoteProfiles, effectiveTombstones)
              );
              const cleanedCount = countTotalExamsInMap(cleanedRemote);

              profilesRef.current = cleanedRemote;
              setProfiles(cleanedRemote);
              safeWriteLocalStorage(storageKey, cleanedRemote);

              // Persist legacy/tombstone purge to Firestore once when a writable user opens PUSULA
              if (
                !isReadOnly &&
                !hasPersistedLegacyPurge &&
                (!remoteLegacyDone || cleanedCount < rawCount)
              ) {
                hasPersistedLegacyPurge = true;
                legacyPurgeDoneRef.current = true;
                await saveProfiles(cleanedRemote, effectiveTombstones, { legacyPurgeDone: true });
              }
            }
          } else if (!isReadOnly && !hasAutoSyncedInitial && countTotalExamsInMap(profilesRef.current) > 0) {
            hasAutoSyncedInitial = true;
            const effectiveTombstones = mergeTombstones(deletedExamsRef.current, LEGACY_DELETED_EXAMS);
            const cleanedLocal = deduplicateProfilesMap(
              stripDeletedExamsFromProfiles(profilesRef.current, effectiveTombstones)
            );
            legacyPurgeDoneRef.current = true;
            await saveProfiles(cleanedLocal, effectiveTombstones, { legacyPurgeDone: true });
          }
        }, (err) => {
          console.warn("Pusula firestore listener note:", err);
        });

        return () => { unsub(); };
      } catch (e) {
        console.warn("Pusula init error:", e);
      }
    })();

    return () => { isSubscribed = false; };
  }, [activeSchoolId, storageKey, isReadOnly]);

  // Find profile by exact key or normalized student name / class
  const findProfileForStudent = (stuName?: string | null, clsName?: string | null): PusulaStudentProfile | null => {
    if (!stuName) return null;
    const exactKey = `${clsName || 'Genel'}_${stuName}`;
    const targetParts = extractNameAndNo(stuName);
    const normTargetName = normalizeStr(targetParts.nameOnly);
    const normTargetCls = normalizeStr(clsName || '');

    // Collect all matching profiles (in case exams were saved under both "6-A_ALİ KAAN TERLİ" and "6A_39 - ALİ KAAN TERLİ")
    const matchingProfiles: PusulaStudentProfile[] = [];
    if (profiles[exactKey]) {
      matchingProfiles.push(profiles[exactKey]);
    }

    Object.entries(profiles).forEach(([k, p]) => {
      if (k === exactKey || !p) return;
      const pParts = extractNameAndNo(p.studentName || k.split('_').slice(1).join('_'));
      const normPName = normalizeStr(pParts.nameOnly);
      const normPCls = normalizeStr(p.className || k.split('_')[0] || '');

      if (normPName && normPName === normTargetName) {
        if (!normTargetCls || !normPCls || normPCls === normTargetCls) {
          matchingProfiles.push(p);
        }
      }
    });

    if (matchingProfiles.length === 0) {
      // Fallback: match by name regardless of class
      const anyMatch = Object.values(profiles).find(p => {
        const pParts = extractNameAndNo(p?.studentName || '');
        return normalizeStr(pParts.nameOnly) === normTargetName;
      });
      return anyMatch || null;
    }

    if (matchingProfiles.length === 1) return matchingProfiles[0];

    // Merge exams across matching profile entries, preferring exams with richer outcomes
    const base = { ...matchingProfiles[0] };
    const examMap = new Map<string, PusulaExam>();
    matchingProfiles.forEach(mp => {
      (mp.exams || []).forEach(ex => {
        if (!ex) return;
        const dedupKey = `${ex.name}_${ex.date}`;
        const existing = examMap.get(dedupKey);
        if (!existing) {
          examMap.set(dedupKey, ex);
        } else if ((ex.outcomes?.length || 0) >= (existing.outcomes?.length || 0)) {
          examMap.set(dedupKey, ex);
        }
      });
    });
    base.exams = Array.from(examMap.values());
    return base;
  };

  const studentKey = selectedStudent ? `${selectedClass || 'Genel'}_${selectedStudent}` : null;
  const foundProfile = findProfileForStudent(selectedStudent, selectedClass);

  const currentProfile: PusulaStudentProfile = foundProfile || {
    studentName: selectedStudent || '',
    className: selectedClass || '',
    targetSchool: '',
    targetScoreOrNet: '',
    weeklyQuestionGoal: 750,
    currentCategory: 'LGS',
    exams: [],
    weeklyPlan: [],
    curriculumProgress: {},
    coachingNotes: [],
    testResults: {}
  };

  // Helper: sync updates across any matching alias keys for the active student
  const applyFieldsToMatchingStudentKeys = (
    baseMap: Record<string, PusulaStudentProfile>,
    targetKey: string,
    updatedProfile: PusulaStudentProfile,
    updatedFields: Partial<PusulaStudentProfile>
  ): Record<string, PusulaStudentProfile> => {
    const nextProfiles = { ...baseMap, [targetKey]: updatedProfile };
    const normTargetName = normalizeStr(extractNameAndNo(updatedProfile.studentName || selectedStudent || '').nameOnly);
    const normTargetCls = normalizeStr(updatedProfile.className || selectedClass || '');

    Object.entries(nextProfiles).forEach(([k, p]) => {
      if (k === targetKey || !p) return;
      const pName = normalizeStr(extractNameAndNo(p.studentName || k.split('_').slice(1).join('_')).nameOnly);
      const pCls = normalizeStr(p.className || k.split('_')[0] || '');
      if (normTargetName && pName === normTargetName && (!normTargetCls || !pCls || pCls === 'genel' || pCls === normTargetCls)) {
        nextProfiles[k] = {
          ...p,
          ...updatedFields
        };
      }
    });
    return nextProfiles;
  };

  // Update active student profile (only non-readOnly teachers/admins allowed to modify)
  const handleUpdateProfile = (updatedFields: Partial<PusulaStudentProfile>) => {
    if (isReadOnly) return;
    const targetKey = studentKey || (foundProfile ? `${foundProfile.className || 'Genel'}_${foundProfile.studentName}` : null);
    if (!targetKey) return;
    const updated = {
      ...currentProfile,
      ...updatedFields
    };
    const newProfiles = applyFieldsToMatchingStudentKeys(
      profilesRef.current,
      targetKey,
      updated,
      updatedFields
    );

    // If a new exam was explicitly added via manual entry, ensure it isn't blocked by a previous tombstone
    let nextDeleted = deletedExamsRef.current;
    if (Array.isArray(updatedFields.exams) && updatedFields.exams.length > (currentProfile.exams?.length || 0)) {
      nextDeleted = nextDeleted.filter(
        t => !updatedFields.exams!.some(ex => isExamMatchingTombstone(ex, t))
      );
    }
    saveProfiles(newProfiles, nextDeleted);
  };

  // Update student goal (teachers, admins, AND the student themselves can edit their own goal unless readOnly=true)
  const handleUpdateStudentGoal = async (goalPatch: {
    targetSchool?: string;
    targetScoreOrNet?: string;
    weeklyQuestionGoal?: number;
  }) => {
    if (!canEditGoal) return;
    const targetKey = studentKey || (foundProfile ? `${foundProfile.className || 'Genel'}_${foundProfile.studentName}` : null);
    if (!targetKey) return;

    const sanitizedFields: Partial<PusulaStudentProfile> = {};
    if (goalPatch.targetSchool !== undefined) {
      sanitizedFields.targetSchool = cleanPlaceholderGoal(goalPatch.targetSchool);
    }
    if (goalPatch.targetScoreOrNet !== undefined) {
      sanitizedFields.targetScoreOrNet = cleanPlaceholderGoal(goalPatch.targetScoreOrNet);
    }
    if (goalPatch.weeklyQuestionGoal !== undefined) {
      sanitizedFields.weeklyQuestionGoal = Math.max(50, Number(goalPatch.weeklyQuestionGoal) || 750);
    }

    const updated: PusulaStudentProfile = {
      ...currentProfile,
      ...sanitizedFields
    };
    const newProfiles = applyFieldsToMatchingStudentKeys(
      profilesRef.current,
      targetKey,
      updated,
      sanitizedFields
    );

    const activeTombstones = legacyPurgeDoneRef.current
      ? deletedExamsRef.current
      : mergeTombstones(deletedExamsRef.current, LEGACY_DELETED_EXAMS);

    await saveProfiles(newProfiles, activeTombstones, { legacyPurgeDone: true });
    if (actions?.showToast) {
      actions.showToast('Öğrenci hedefi başarıyla güncellendi.', 'success');
    }
  };

  // Batch save multiple students' exam results from PDF
  const handleBatchSaveExams = async (
    items: Array<{
      studentKey: string;
      studentName: string;
      className: string;
      studentNo?: string;
      exam: PusulaExam;
    }>
  ) => {
    if (isReadOnly || !items || items.length === 0) return;
    const newProfiles: Record<string, PusulaStudentProfile> = { ...profilesRef.current };

    const upsertExamToKey = (key: string, sName: string, cName: string, exam: PusulaExam) => {
      const existing = newProfiles[key] || {
        studentName: sName,
        className: cName,
        targetSchool: '',
        targetScoreOrNet: '',
        weeklyQuestionGoal: 750,
        currentCategory: exam.type === 'LGS' ? 'LGS' : 'YKS',
        exams: [],
        weeklyPlan: [],
        curriculumProgress: {},
        coachingNotes: [],
        testResults: {}
      };

      const existingExams = existing.exams || [];
      const filtered = existingExams.filter(
        e => e.id !== exam.id && !(e.name === exam.name && e.date === exam.date)
      );

      newProfiles[key] = {
        ...existing,
        studentName: existing.studentName || sName,
        className: existing.className || cName,
        exams: [exam, ...filtered]
      };
    };

    items.forEach(({ studentKey: itemKey, studentName, className, studentNo, exam }) => {
      const normName = normalizeStr(extractNameAndNo(studentName).nameOnly);
      const normCls = normalizeStr(className);
      let matchedCanonicalKey = false;

      // 1. Sync to any matching registered student keys in `classes` (e.g. "39 - ALİ KAAN TERLİ" in "6A" or "6-A")
      Object.entries(classes || {}).forEach(([clsKey, stList]) => {
        if (normalizeStr(clsKey) !== normCls) return;
        (stList || []).forEach(sysStuName => {
          const sysParts = extractNameAndNo(sysStuName);
          const normSys = normalizeStr(sysParts.nameOnly);
          if (normSys === normName || (studentNo && studentNo !== '0' && sysParts.no === studentNo)) {
            const sysKey = `${clsKey}_${sysStuName}`;
            upsertExamToKey(sysKey, sysStuName, clsKey, exam);
            matchedCanonicalKey = true;
          }
        });
      });

      // 2. Also update itemKey if no canonical class key matched or if itemKey already exists
      if (!matchedCanonicalKey || newProfiles[itemKey]) {
        upsertExamToKey(itemKey, studentName, className, exam);
      }

      // 3. Also update any existing profile key in `newProfiles` that belongs to this same student
      Object.keys(newProfiles).forEach(existingKey => {
        const p = newProfiles[existingKey];
        if (!p) return;
        const pParts = extractNameAndNo(p.studentName || existingKey.split('_').slice(1).join('_'));
        const normPName = normalizeStr(pParts.nameOnly);
        const normPCls = normalizeStr(p.className || existingKey.split('_')[0] || '');
        if (normPName && normPName === normName && (!normCls || !normPCls || normPCls === normCls)) {
          upsertExamToKey(existingKey, p.studentName || studentName, p.className || className, exam);
        }
      });
    });

    // If a teacher explicitly re-uploads an exam, remove its matching tombstone so it isn't immediately stripped
    const nextDeleted = deletedExamsRef.current.filter(
      t => !items.some(it => isExamMatchingTombstone(it.exam, t))
    );

    await saveProfiles(newProfiles, nextDeleted, { legacyPurgeDone: true });

    // If no student is currently selected, select the first saved student so the user sees the result immediately
    if (!selectedStudent && items[0]) {
      onSelectClass(items[0].className);
      onSelectStudent(items[0].studentName);
    }

    if (actions?.showToast) {
      actions.showToast(
        `${items.length} öğrencinin profiline "${items[0]?.exam?.name || 'Deneme Sınavı'}" sonuçları ve kazanım analizleri kaydedildi.`,
        'success'
      );
    }
  };

  // Delete an exam across ALL students in the institution (localStorage + Firestore + Tombstone)
  const handleDeleteExamGlobally = async (examName: string, examDate?: string) => {
    if (isReadOnly || !examName) return;
    const targetNameNorm = normalizeStr(examName);
    const hasDateFilter = typeof examDate === 'string' && examDate.trim().length > 0;
    const targetDate = (examDate || '').trim();

    const newProfiles: Record<string, PusulaStudentProfile> = { ...profilesRef.current };
    let affectedStudents = 0;
    let removedEntries = 0;

    Object.entries(newProfiles).forEach(([key, prof]) => {
      if (!prof || !Array.isArray(prof.exams) || prof.exams.length === 0) return;
      const filteredExams = prof.exams.filter(ex => {
        if (!ex) return false;
        const nameMatch =
          (ex.name || '').trim() === examName.trim() ||
          normalizeStr(ex.name || '') === targetNameNorm;
        if (!nameMatch) return true;
        if (hasDateFilter) {
          const exDate = (ex.date || '').trim();
          if (exDate && exDate !== targetDate) return true;
        }
        removedEntries += 1;
        return false;
      });

      if (filteredExams.length !== prof.exams.length) {
        affectedStudents += 1;
        newProfiles[key] = {
          ...prof,
          exams: filteredExams
        };
      }
    });

    const newTombstone: DeletedExamTombstone = {
      name: examName.trim(),
      date: targetDate,
      deletedAt: new Date().toISOString()
    };
    const nextDeleted = mergeTombstones(deletedExamsRef.current, [newTombstone]);

    await saveProfiles(newProfiles, nextDeleted, { legacyPurgeDone: true });

    if (actions?.showToast) {
      actions.showToast(
        `"${examName}" denemesi ${affectedStudents} öğrenciden (${removedEntries} kayıt) kalıcı olarak silindi.`,
        'info'
      );
    }
  };

  // Save Goal from Modal
  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditGoal) return;
    await handleUpdateStudentGoal({
      targetSchool: targetSchoolInput.trim(),
      targetScoreOrNet: targetScoreInput.trim(),
      weeklyQuestionGoal: weeklyGoalInput || 750
    });
    setIsOpenGoalModal(false);
  };

  const [directoryClassFilter, setDirectoryClassFilter] = useState<string>('ALL');
  const [quickSearchQuery, setQuickSearchQuery] = useState<string>('');
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);

  // List all active students strictly from the authoritative class list (ARİF / ALİM / RAHLE)
  const allStudentsList: Array<{ student: string; className: string }> = useMemo(() => {
    const list: Array<{ student: string; className: string }> = [];
    const seenNorm = new Set<string>();
    const canonicalClassMap = new Map<string, string>();

    Object.keys(classes || {}).forEach(className => {
      if (className === 'Hafızlık Havuzu') return;
      const normCls = normalizeStr(className);
      if (normCls && !canonicalClassMap.has(normCls)) {
        canonicalClassMap.set(normCls, className);
      }
    });

    Object.entries(classes || {}).forEach(([className, studentNames]) => {
      if (className === 'Hafızlık Havuzu') return;
      const canonicalCls = canonicalClassMap.get(normalizeStr(className)) || className;
      (studentNames || []).forEach(name => {
        const parts = extractNameAndNo(name);
        const normKey = `${normalizeStr(canonicalCls)}_${normalizeStr(parts.nameOnly)}`;
        if (!seenNorm.has(normKey)) {
          seenNorm.add(normKey);
          list.push({ student: name, className: canonicalCls });
        }
      });
    });

    return list;
  }, [classes]);

  // Filter profiles to active students currently registered in classes so deleted students do not appear in reports
  const activeProfilesMap = useMemo(() => {
    const classKeys = Object.keys(classes || {}).filter(k => k !== 'Hafızlık Havuzu');
    if (classKeys.length === 0) return profiles;
    const activeNameSet = new Set(
      allStudentsList.map(item => normalizeStr(extractNameAndNo(item.student).nameOnly))
    );
    const filtered: Record<string, PusulaStudentProfile> = {};
    Object.entries(profiles || {}).forEach(([k, prof]) => {
      if (!prof || !prof.studentName) return;
      const normPName = normalizeStr(extractNameAndNo(prof.studentName).nameOnly);
      if (activeNameSet.has(normPName)) {
        filtered[k] = prof;
      }
    });
    return filtered;
  }, [profiles, classes, allStudentsList]);

  // Canonical list of available classes sorted naturally (5-A, 6-A, 7-A, 8-A...)
  const availableClassList: string[] = useMemo(() => {
    const classSet = new Map<string, string>();
    Object.keys(classes || {}).forEach(cls => {
      const norm = normalizeStr(cls);
      if (norm && !classSet.has(norm)) classSet.set(norm, cls);
    });
    allStudentsList.forEach(item => {
      const norm = normalizeStr(item.className);
      if (norm && !classSet.has(norm)) classSet.set(norm, item.className);
    });
    return Array.from(classSet.values()).sort((a, b) =>
      a.localeCompare(b, 'tr-TR', { numeric: true })
    );
  }, [classes, allStudentsList]);

  // Active class for the quick switcher bar (resolves normalized match against availableClassList)
  const activeBarClass = useMemo(() => {
    const rawActive = selectedClass || currentProfile.className || '';
    if (!rawActive) return availableClassList[0] || 'ALL';
    const matched = availableClassList.find(c => normalizeStr(c) === normalizeStr(rawActive));
    return matched || rawActive;
  }, [selectedClass, currentProfile.className, availableClassList]);

  // Students belonging only to the currently selected class in the top bar
  const activeClassStudents = useMemo(() => {
    if (!activeBarClass || activeBarClass === 'ALL') return allStudentsList;
    const filtered = allStudentsList.filter(
      s => normalizeStr(s.className) === normalizeStr(activeBarClass)
    );
    return filtered.length > 0 ? filtered : allStudentsList;
  }, [allStudentsList, activeBarClass]);

  // Quick search results across all students
  const quickSearchResults = useMemo(() => {
    const q = quickSearchQuery.trim();
    if (!q) return [];
    const normQ = normalizeStr(q);
    const lowerQ = q.toLocaleLowerCase('tr-TR');
    return allStudentsList.filter(s => {
      const matchName =
        s.student.toLocaleLowerCase('tr-TR').includes(lowerQ) ||
        normalizeStr(s.student).includes(normQ);
      const matchCls =
        s.className.toLocaleLowerCase('tr-TR').includes(lowerQ) ||
        normalizeStr(s.className).includes(normQ);
      return matchName || matchCls;
    });
  }, [allStudentsList, quickSearchQuery]);

  const filteredStudents = useMemo(() => {
    return allStudentsList.filter(s => {
      if (directoryClassFilter !== 'ALL' && normalizeStr(s.className) !== normalizeStr(directoryClassFilter)) {
        return false;
      }
      if (studentSearch.trim()) {
        const q = studentSearch.toLocaleLowerCase('tr-TR');
        const normQ = normalizeStr(studentSearch);
        const matchName = s.student.toLocaleLowerCase('tr-TR').includes(q) || normalizeStr(s.student).includes(normQ);
        const matchCls = s.className.toLocaleLowerCase('tr-TR').includes(q) || normalizeStr(s.className).includes(normQ);
        if (!matchName && !matchCls) return false;
      }
      return true;
    });
  }, [allStudentsList, studentSearch, directoryClassFilter]);

  // If a class is selected, ensure the active student belongs to that class
  useEffect(() => {
    if (!isStudent && selectedClass && classes && classes[selectedClass]) {
      const classStudents = classes[selectedClass] || [];
      const inAllForClass = allStudentsList.some(
        s => normalizeStr(s.className) === normalizeStr(selectedClass) && s.student === selectedStudent
      );
      if (selectedStudent && !classStudents.includes(selectedStudent) && !inAllForClass) {
        if (classStudents.length > 0) {
          onSelectStudent(classStudents[0]);
        }
      }
    }
  }, [selectedClass, selectedStudent, classes, allStudentsList, isStudent, onSelectStudent]);

  // Auto-select student if teacher directly clicked a specific student tab while no student was active
  useEffect(() => {
    if (!selectedStudent && !isStudent && allStudentsList.length > 0) {
      if (pusulaTab !== 'dashboard') {
        const classStudents = (selectedClass && classes && classes[selectedClass]) || [];
        if (selectedClass && classStudents.length > 0) {
          onSelectStudent(classStudents[0]);
        } else {
          const first = allStudentsList[0];
          if (!selectedClass) onSelectClass(first.className);
          onSelectStudent(first.student);
        }
      }
    }
  }, [pusulaTab, selectedStudent, selectedClass, isStudent, classes, allStudentsList, onSelectClass, onSelectStudent]);

  // If no student is selected yet (and not a student account) on student-specific tabs: show Teacher Coaching Student Directory
  if (!selectedStudent && !isStudent && pusulaTab !== 'dashboard') {
    return (
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-300">
        {/* Hero Header */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 text-gray-900 border border-purple-100 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-50/80 via-slate-50/40 to-transparent pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 z-10 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black uppercase tracking-widest">
              <Compass size={14} className="text-purple-600" />
              PUSULA ÖĞRENCİ KOÇLUK SİSTEMİ
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Öğrenci Koçluk &amp; Bireysel Takip Portalı
            </h1>
            <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
              Milli Eğitim ve YKS / LGS / KPSS sınavlarına hazırlık sürecinde öğrencilerinize hedef belirleyin, 
              deneme sınavı netlerini analiz edin, haftalık çalışma planları oluşturun ve koçluk seanslarını kayıt altına alın.
            </p>

            {!isReadOnly && (
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => handleOpenPdfModal('okul')}
                  className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-black text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} className="text-purple-600" />
                  + Okul Karnesi Ekle (PDF)
                </button>
                <button
                  onClick={() => handleOpenPdfModal('sinif')}
                  className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-black text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} className="text-purple-600" />
                  + Sınıf Karnesi Ekle (PDF)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Student Selector Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Users size={22} className="text-purple-600" />
                Koçluk Yapılacak Öğrenciyi Seçin
              </h2>
              <p className="text-xs font-semibold text-gray-400">
                Önce sınıf seçebilir veya arama kutusundan öğrenci adını/numarasını yazarak doğrudan filtreleyebilirsiniz.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
              <input 
                type="text" 
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Öğrenci adı, numara veya sınıf ara..."
                className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Class Filter Pills */}
          {availableClassList.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 mr-1">Sınıf Seçimi:</span>
              <button
                onClick={() => setDirectoryClassFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  directoryClassFilter === 'ALL'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tüm Sınıflar ({allStudentsList.length})
              </button>
              {availableClassList.map(cls => {
                const count = allStudentsList.filter(s => normalizeStr(s.className) === normalizeStr(cls)).length;
                const isSelected = normalizeStr(directoryClassFilter) === normalizeStr(cls) && directoryClassFilter !== 'ALL';
                return (
                  <button
                    key={cls}
                    onClick={() => setDirectoryClassFilter(cls)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cls.replace('_', '')} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Student Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
                Kayıtlı öğrenci bulunamadı. Lütfen sınıf filtresini veya arama kelimesini değiştirin.
              </div>
            ) : (
              filteredStudents.map(({ student, className }) => {
                const sKey = `${className}_${student}`;
                const prof = findProfileForStudent(student, className);
                const examCount = prof?.exams?.length || 0;
                const noteCount = prof?.coachingNotes?.length || 0;

                return (
                  <div
                    key={sKey}
                    onClick={() => {
                      onSelectClass(className);
                      onSelectStudent(student);
                    }}
                    className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                        {className.replace('_', '')}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ChevronRight size={16} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-gray-900 group-hover:text-purple-700 transition-colors">
                        {student}
                      </h3>
                      <p className="text-xs text-gray-400 font-semibold truncate mt-0.5">
                        {cleanPlaceholderGoal(prof?.targetSchool) ? `🎯 ${cleanPlaceholderGoal(prof?.targetSchool)}` : 'Hedef belirlenmedi'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
                      <span>{examCount} Deneme</span>
                      <span>•</span>
                      <span>{noteCount} Görüşme</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Student Coaching Panel
  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-300">
      {/* PDF Deneme & Karne Yükleme Butonları (Okul, Sınıf, Öğrenci Karnesi) */}
      {!isReadOnly && (
        <div className="flex items-center gap-3 flex-wrap print:hidden">
          <button
            onClick={() => handleOpenPdfModal('okul')}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
            title="Tüm okul genel deneme listesi PDF'ini yükleyin"
          >
            <Plus size={16} /> Okul Karnesi Ekle
          </button>
          <button
            onClick={() => handleOpenPdfModal('sinif')}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
            title="Sınıf deneme listesi PDF'ini yükleyin"
          >
            <Plus size={16} /> Sınıf Karnesi Ekle
          </button>
          <button
            onClick={() => handleOpenPdfModal('ogrenci')}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
            title="Öğrencinin bireysel karne PDF'ini yükleyin"
          >
            <Plus size={16} /> Öğrenci Karnesi Ekle
          </button>
        </div>
      )}

      {/* Teacher Top Bar for Quick Student Switching: 1) Sınıf Seçimi -> 2) Öğrenci Seçimi -> 3) Hızlı Öğrenci Arama */}
      {!isStudent && selectedStudent && allStudentsList.length > 0 && pusulaTab !== 'dashboard' && (
        <div className="bg-white px-5 py-3.5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 print:hidden">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5 shrink-0">
              <Users size={16} className="text-purple-600" />
              Aktif Koçluk Öğrencisi:
            </span>

            {/* 1. Adım: Sınıf Seçimi */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">1. Sınıf:</span>
              <select
                value={activeBarClass}
                onChange={(e) => {
                  const newCls = e.target.value;
                  onSelectClass(newCls);
                  const studentsInClass = allStudentsList.filter(
                    s => normalizeStr(s.className) === normalizeStr(newCls)
                  );
                  if (studentsInClass.length > 0) {
                    onSelectStudent(studentsInClass[0].student);
                  }
                }}
                className="bg-purple-50 text-purple-900 border border-purple-200 text-xs font-black py-2 pl-3 pr-7 rounded-xl outline-none cursor-pointer focus:ring-2 focus:ring-purple-400 transition-all"
              >
                {availableClassList.map(cls => {
                  const count = allStudentsList.filter(s => normalizeStr(s.className) === normalizeStr(cls)).length;
                  return (
                    <option key={cls} value={cls}>
                      {cls.replace('_', '')} ({count} Öğrenci)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 2. Adım: Seçilen Sınıftaki Öğrenciler */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">2. Öğrenci:</span>
              <select
                value={selectedStudent}
                onChange={(e) => {
                  const chosenStudent = e.target.value;
                  const item = activeClassStudents.find(s => s.student === chosenStudent) ||
                    allStudentsList.find(s => s.student === chosenStudent);
                  if (item) {
                    onSelectClass(item.className);
                    onSelectStudent(item.student);
                  }
                }}
                className="bg-purple-50 text-purple-900 border border-purple-200 text-xs font-black py-2 pl-3 pr-8 rounded-xl outline-none cursor-pointer focus:ring-2 focus:ring-purple-400 transition-all max-w-[260px] sm:max-w-[320px]"
              >
                {activeClassStudents.map(s => (
                  <option key={`${s.className}_${s.student}`} value={s.student}>
                    {s.student} ({s.className.replace('_', '')})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Adım: Hızlı Öğrenci Arama Kutusu */}
            <div className="relative flex-1 min-w-[220px] sm:min-w-[260px] max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none" />
              <input
                type="text"
                value={quickSearchQuery}
                onFocus={() => setIsQuickSearchOpen(true)}
                onBlur={() => setTimeout(() => setIsQuickSearchOpen(false), 180)}
                onChange={(e) => {
                  setQuickSearchQuery(e.target.value);
                  setIsQuickSearchOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && quickSearchResults.length > 0) {
                    const topMatch = quickSearchResults[0];
                    onSelectClass(topMatch.className);
                    onSelectStudent(topMatch.student);
                    setQuickSearchQuery('');
                    setIsQuickSearchOpen(false);
                  }
                }}
                placeholder="Öğrenci adı veya numarası ara..."
                className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-purple-400 rounded-xl pl-8 pr-7 py-1.5 text-xs font-bold text-gray-800 outline-none transition-all"
              />
              {quickSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setQuickSearchQuery('');
                    setIsQuickSearchOpen(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-black cursor-pointer"
                >
                  ✕
                </button>
              )}

              {/* Arama Sonuçları Açılır Listesi */}
              {isQuickSearchOpen && quickSearchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-purple-200 rounded-2xl shadow-xl z-40 max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {quickSearchResults.length === 0 ? (
                    <div className="p-3 text-center text-xs font-semibold text-gray-400">
                      "{quickSearchQuery}" ile eşleşen öğrenci bulunamadı.
                    </div>
                  ) : (
                    quickSearchResults.slice(0, 15).map(item => {
                      const isCurrent =
                        item.student === selectedStudent &&
                        normalizeStr(item.className) === normalizeStr(activeBarClass);
                      const prof = findProfileForStudent(item.student, item.className);
                      const examCount = prof?.exams?.length || 0;
                      return (
                        <button
                          key={`${item.className}_${item.student}`}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            onSelectClass(item.className);
                            onSelectStudent(item.student);
                            setQuickSearchQuery('');
                            setIsQuickSearchOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-2 hover:bg-purple-50 transition-colors cursor-pointer ${
                            isCurrent ? 'bg-purple-50/80 font-black text-purple-900' : 'text-gray-800 font-bold'
                          }`}
                        >
                          <div className="truncate text-xs">
                            <span>{item.student}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {examCount > 0 && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {examCount} Deneme
                              </span>
                            )}
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                              {item.className.replace('_', '')}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
            {canEditGoal && (
              <button
                type="button"
                onClick={() => {
                  setTargetSchoolInput(cleanPlaceholderGoal(currentProfile.targetSchool));
                  setTargetScoreInput(cleanPlaceholderGoal(currentProfile.targetScoreOrNet));
                  setWeeklyGoalInput(currentProfile.weeklyQuestionGoal || 750);
                  setIsOpenGoalModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-black transition-all cursor-pointer"
                title="Seçili öğrenci için hedef okul/net belirle"
              >
                <Target size={14} className="text-blue-600" />
                {cleanPlaceholderGoal(currentProfile.targetScoreOrNet) || cleanPlaceholderGoal(currentProfile.targetSchool)
                  ? 'Hedefi Düzenle'
                  : 'Hedef Belirle'}
              </button>
            )}
            <button
              onClick={() => {
                onSelectStudent(null as any);
                setPusulaTab('dashboard');
              }}
              className="text-xs text-purple-700 hover:text-purple-900 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              ← Tüm Öğrencilere Dön
            </button>
          </div>
        </div>
      )}

      {/* Render Active View */}
      {pusulaTab === 'dashboard' && (
        <PusulaDashboard 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          onNavigateTab={(tab) => setPusulaTab(tab as any)}
          onOpenExamModal={() => {
            if (isReadOnly) return;
            setPusulaTab('exams');
            setIsOpenExamModal(true);
          }}
          onOpenNoteModal={() => {
            if (isReadOnly) return;
            setPusulaTab('notes');
            setIsOpenNoteModal(true);
          }}
          onOpenGoalModal={() => {
            if (!canEditGoal) return;
            setTargetSchoolInput(cleanPlaceholderGoal(currentProfile.targetSchool));
            setTargetScoreInput(cleanPlaceholderGoal(currentProfile.targetScoreOrNet));
            setWeeklyGoalInput(currentProfile.weeklyQuestionGoal || 750);
            setIsOpenGoalModal(true);
          }}
          readOnly={isReadOnly}
          canEditGoal={canEditGoal}
          activeSchoolId={activeSchoolId}
          allStudentsList={allStudentsList}
          findProfileForStudent={findProfileForStudent}
          selectedStudent={selectedStudent}
          selectedClass={selectedClass}
          onSelectStudent={onSelectStudent}
          onSelectClass={onSelectClass}
          availableClassList={availableClassList}
          getStudentAttendanceStatus={actions?.getStudentAttendanceStatus}
          studentAttendanceStatuses={state?.studentAttendanceStatuses}
        />
      )}

      {pusulaTab === 'resources' && (
        <PusulaResources 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          readOnly={isReadOnly}
        />
      )}

      {pusulaTab === 'exams' && (
        <PusulaExams 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          onUpdateGoal={handleUpdateStudentGoal}
          canEditGoal={canEditGoal}
          onDeleteExamGlobally={handleDeleteExamGlobally}
          isOpenNewExamModal={isOpenExamModal}
          onCloseNewExamModal={() => setIsOpenExamModal(false)}
          readOnly={isReadOnly}
          onOpenPdfModal={handleOpenPdfModal}
          classes={classes}
          allProfiles={activeProfilesMap}
          activeClass={selectedClass || currentProfile.className}
          activeSchoolId={activeSchoolId}
          schoolInfo={state?.schools?.find((s: any) => s.id === activeSchoolId)}
        />
      )}

      {pusulaTab === 'plan' && (
        <PusulaPlan 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          readOnly={isReadOnly}
        />
      )}

      {pusulaTab === 'notes' && (
        <PusulaNotes 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          isOpenNewNoteModal={isOpenNoteModal}
          onCloseNewNoteModal={() => setIsOpenNoteModal(false)}
          readOnly={isReadOnly}
        />
      )}

      {/* Modal: Hedef Güncelle */}
      {canEditGoal && isOpenGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Target size={22} className="text-purple-600" />
                  Öğrenci Hedef Belirleme Kartı
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  {currentProfile.studentName} için hedef okul, net/puan ve soru hedefini güncelleyin.
                </p>
              </div>
              <button 
                onClick={() => setIsOpenGoalModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Hedef Kurum / Lise / Üniversite / Bölüm</label>
                <input 
                  type="text"
                  value={targetSchoolInput}
                  onChange={(e) => setTargetSchoolInput(e.target.value)}
                  placeholder="Örn: Bolu Fen Lisesi veya Hacettepe Tıp"
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Hedef Net veya Puan</label>
                <input 
                  type="text"
                  value={targetScoreInput}
                  onChange={(e) => setTargetScoreInput(e.target.value)}
                  placeholder="Örn: 75 Net veya 465 Puan"
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Haftalık Soru Çözüm Hedefi</label>
                <input 
                  type="number"
                  min="100"
                  step="50"
                  value={weeklyGoalInput}
                  onChange={(e) => setWeeklyGoalInput(parseInt(e.target.value) || 750)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsOpenGoalModal(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Vazgeç
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer"
                >
                  Hedefi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: PDF Deneme Sonucu / Karne Yükleyici */}
      {!isReadOnly && (
        <PusulaPdfExamImportModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          initialMode={pdfModalMode}
          classes={classes}
          profiles={profiles}
          activeClass={selectedClass || currentProfile.className}
          activeStudent={selectedStudent || currentProfile.studentName}
          onSaveBatchExams={handleBatchSaveExams}
        />
      )}
    </div>
  );
};
