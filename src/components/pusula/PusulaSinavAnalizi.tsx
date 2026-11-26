import React, { useState, useMemo, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { 
  FileSpreadsheet, 
  Plus, 
  Minus,
  Trash2, 
  Download, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  PieChart,
  Check, 
  Edit3, 
  TrendingUp,
  Activity,
  Layers,
  FileText,
  Sliders,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Percent,
  HelpCircle,
  Clock,
  CheckCheck,
  Save,
  FolderOpen,
  Search,
  Loader2,
  Calendar,
  Send,
  X
} from 'lucide-react';
import { collection, doc, onSnapshot, setDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  PusulaSinavAnaliziDoc, 
  PusulaQuestionAnalysisDef, 
  PusulaStudentExamRow,
  PusulaStudentOutcomeFeedbackDoc,
  PusulaStudentOutcomeFeedbackItem
} from '../../types/pusula';
import {
  doesExamFeedbackMatchStudent,
  extractStudentNoAndName,
  normStudentIdentityStr
} from '../../lib/utils';

// Firestore rejects nested undefined fields; normalize before writing
const sanitizeForFirestore = (val: any): any => {
  if (val === undefined) return null;
  if (Array.isArray(val)) return val.map(sanitizeForFirestore);
  if (val && typeof val === 'object') {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        out[k] = sanitizeForFirestore(v);
      }
    }
    return out;
  }
  return val;
};

interface PusulaSinavAnaliziProps {
  state: any;
  actions: any;
  activeSchoolId: string;
  selectedClass?: string | null;
  classes?: Record<string, string[]>;
  readOnly?: boolean;
}

const getDefaultAcademicTerm = (): '1' | '2' => {
  const month = new Date().getMonth(); // 0=Jan..11=Dec
  return month >= 8 || month === 0 ? '1' : '2';
};

const createEmptyExamDoc = (
  id = 'blank-sinav-1',
  defaults?: { schoolName?: string; academicYear?: string; term?: '1' | '2' | '' }
): PusulaSinavAnaliziDoc => ({
  id,
  schoolName: defaults?.schoolName || '',
  academicYear: defaults?.academicYear || '',
  term: (defaults?.term ?? '') as any,
  className: '',
  subject: '',
  teacherName: '',
  examNumber: '' as any,
  principalName: '',
  scenarioNumber: '',
  questionCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  teacherComment: '',
  questions: [],
  students: []
});

export const PusulaSinavAnalizi: React.FC<PusulaSinavAnaliziProps> = ({
  state,
  actions,
  activeSchoolId,
  selectedClass,
  classes = {},
  readOnly = false
}) => {
  const storageKey = `pusula_sinav_analizleri_${activeSchoolId || 'default'}`;
  const firestoreColName =
    activeSchoolId && activeSchoolId !== 'default'
      ? `sinav_analizleri_${activeSchoolId}`
      : 'sinav_analizleri';

  const editorTopRef = useRef<HTMLDivElement>(null);
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const secHeaderRef = useRef<HTMLDivElement>(null);
  const secOutcomesRef = useRef<HTMLDivElement>(null);
  const secScoresRef = useRef<HTMLDivElement>(null);
  const secMatrixRef = useRef<HTMLDivElement>(null);
  const secChartsRef = useRef<HTMLDivElement>(null);
  const secSignaturesRef = useRef<HTMLDivElement>(null);

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [listSearch, setListSearch] = useState('');
  const [listClassFilter, setListClassFilter] = useState('');
  const [pendingPdfExportId, setPendingPdfExportId] = useState<string | null>(null);
  const dirtyExamIdsRef = useRef<Set<string>>(new Set());
  const autoFilledFieldsRef = useRef<Record<string, { schoolName?: boolean; academicYear?: boolean; term?: boolean }>>({});
  const [dirtyMap, setDirtyMap] = useState<Record<string, boolean>>({});

  // Dispatched student exam outcome feedbacks (Teacher -> Student)
  const donutsColName =
    activeSchoolId && activeSchoolId !== 'default'
      ? `sinav_donuts_${activeSchoolId}`
      : 'sinav_donuts';
  const donutsStorageKey = `pusula_sinav_donuts_${activeSchoolId || 'default'}`;
  const [sentDonuts, setSentDonuts] = useState<PusulaStudentOutcomeFeedbackDoc[]>(() => {
    try {
      const stored = localStorage.getItem(donutsStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackDrafts, setFeedbackDrafts] = useState<
    Array<{
      rowId: string;
      studentUserId?: string;
      studentUsername?: string;
      studentNumber: string;
      studentName: string;
      status: 'girdi' | 'girmedi' | 'kopya';
      totalScore: number;
      selected: boolean;
      hasPreviouslySent: boolean;
      items: PusulaStudentOutcomeFeedbackItem[];
    }>
  >([]);
  const [feedbackSubject, setFeedbackSubject] = useState('');
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [showOnlyWithMissing, setShowOnlyWithMissing] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [newOutcomeInputs, setNewOutcomeInputs] = useState<Record<string, string>>({});
  const [remoteServerExamIds, setRemoteServerExamIds] = useState<Set<string> | null>(null);

  const defaultSchoolName = useMemo(() => {
    const byCurrent = state?.currentSchool?.name;
    const byList = Array.isArray(state?.schools)
      ? state.schools.find((s: any) => s.id === activeSchoolId)?.name
      : '';
    return String(byCurrent || byList || '').trim();
  }, [state?.currentSchool?.name, state?.schools, activeSchoolId]);

  const defaultAcademicYear = useMemo(() => {
    return String(state?.viewingAcademicYear || state?.activeAcademicYear || '').trim();
  }, [state?.viewingAcademicYear, state?.activeAcademicYear]);

  const defaultTerm = useMemo(() => getDefaultAcademicTerm(), []);

  // All exams cache (persisted + active working draft)
  const [savedExams, setSavedExams] = useState<Record<string, PusulaSinavAnaliziDoc>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const keys = Object.keys(parsed || {});
        if (keys.length > 0 && !(keys.length === 1 && keys[0] === 'sample-goynuk-tdb-1')) {
          const normalized: Record<string, PusulaSinavAnaliziDoc> = {};
          for (const [k, rawDoc] of Object.entries(parsed as Record<string, PusulaSinavAnaliziDoc>)) {
            const hasContent =
              Boolean(rawDoc?.subject?.trim()) ||
              Boolean(rawDoc?.students?.some(s => s.scores && Object.keys(s.scores).length > 0));
            normalized[k] = {
              ...rawDoc,
              isSaved: rawDoc?.isSaved !== undefined ? rawDoc.isSaved : (k !== 'blank-sinav-1' || hasContent)
            };
          }
          return normalized;
        }
      }
    } catch (e) {
      console.error(e);
    }
    const blankDoc = createEmptyExamDoc();
    return {
      [blankDoc.id]: { ...blankDoc, isSaved: false }
    };
  });

  const [activeExamId, setActiveExamId] = useState<string>(() => Object.keys(savedExams)[0] || 'blank-sinav-1');
  const [activeChartTab, setActiveChartTab] = useState<'all' | 'questions' | 'distribution' | 'histogram'>('all');

  // Subscribe to Firestore saved exam analyses for the active school
  useEffect(() => {
    if (!activeSchoolId) return;
    const unsubscribe = onSnapshot(
      collection(db, firestoreColName),
      (snapshot) => {
        setSavedExams((prev) => {
          const next: Record<string, PusulaSinavAnaliziDoc> = { ...prev };
          const remoteIds = new Set<string>();

          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as PusulaSinavAnaliziDoc;
            if (!data || !docSnap.id) return;
            remoteIds.add(docSnap.id);
            // Skip overwriting an exam that currently has unsaved local edits
            if (!dirtyExamIdsRef.current.has(docSnap.id)) {
              next[docSnap.id] = {
                ...createEmptyExamDoc(docSnap.id),
                ...data,
                id: docSnap.id,
                isSaved: true
              };
            }
          });

          // Remove locally cached saved items deleted remotely (keep unsaved drafts)
          if (!snapshot.metadata.fromCache) {
            for (const [id, ex] of Object.entries(next)) {
              if (ex.isSaved && !remoteIds.has(id) && !dirtyExamIdsRef.current.has(id)) {
                delete next[id];
              }
            }
          }

          try {
            localStorage.setItem(storageKey, JSON.stringify(next));
          } catch (e) {
            console.error('Local storage sync error', e);
          }
          return next;
        });

        if (!snapshot.metadata.fromCache) {
          const serverIds = new Set<string>();
          snapshot.forEach((d) => {
            if (d.id) serverIds.add(d.id);
          });
          setRemoteServerExamIds(serverIds);
        }
      },
      (err) => {
        console.error('Firestore exam analyses subscription error:', err);
      }
    );
    return () => unsubscribe();
  }, [activeSchoolId, firestoreColName, storageKey]);

  // Subscribe to dispatched student outcome feedbacks so teacher sees student completion status
  useEffect(() => {
    if (!activeSchoolId) return;
    const unsub = onSnapshot(
      collection(db, donutsColName),
      (snap) => {
        const list: PusulaStudentOutcomeFeedbackDoc[] = [];
        snap.forEach((d) => {
          list.push({ ...(d.data() as PusulaStudentOutcomeFeedbackDoc), id: d.id });
        });
        setSentDonuts(list);
        try {
          localStorage.setItem(donutsStorageKey, JSON.stringify(list));
        } catch {
          // ignore
        }
      },
      (err) => {
        console.error('Sent outcome feedbacks subscription error:', err);
      }
    );
    return () => unsub();
  }, [activeSchoolId, donutsColName, donutsStorageKey]);

  // Auto-clean any orphaned student outcome feedbacks whose exam analysis was deleted from Firestore
  useEffect(() => {
    if (readOnly || !remoteServerExamIds || isSendingFeedback || isSaving) return;
    const orphans = sentDonuts.filter(
      (d) =>
        d.examId &&
        !remoteServerExamIds.has(d.examId) &&
        !dirtyExamIdsRef.current.has(d.examId)
    );
    if (orphans.length === 0) return;

    Promise.all(orphans.map((o) => deleteDoc(doc(db, donutsColName, o.id)))).catch((err) => {
      console.error('Orphaned exam feedback cleanup error:', err);
    });
  }, [readOnly, remoteServerExamIds, sentDonuts, donutsColName, isSendingFeedback, isSaving]);

  // Active exam doc
  const currentExam = useMemo(() => {
    return savedExams[activeExamId] || Object.values(savedExams)[0] || createEmptyExamDoc('blank-sinav-1', {
      schoolName: defaultSchoolName,
      academicYear: defaultAcademicYear,
      term: defaultTerm
    });
  }, [savedExams, activeExamId, defaultSchoolName, defaultAcademicYear, defaultTerm]);

  // Auto-populate OKUL ADI, ÖĞRETİM YILI, and DÖNEM when empty (once per exam & field so manual edits are preserved)
  useEffect(() => {
    if (readOnly || !currentExam?.id) return;
    const tracked = autoFilledFieldsRef.current[currentExam.id] || {};
    const patch: Partial<PusulaSinavAnaliziDoc> = {};

    if (!currentExam.schoolName?.trim() && defaultSchoolName && !tracked.schoolName) {
      patch.schoolName = defaultSchoolName;
      tracked.schoolName = true;
    }
    if (!currentExam.academicYear?.trim() && defaultAcademicYear && !tracked.academicYear) {
      patch.academicYear = defaultAcademicYear;
      tracked.academicYear = true;
    }
    if (!currentExam.term && defaultTerm && !tracked.term) {
      patch.term = defaultTerm;
      tracked.term = true;
    }

    if (Object.keys(patch).length > 0) {
      autoFilledFieldsRef.current[currentExam.id] = tracked;
      setSavedExams((prev) => {
        const target = prev[currentExam.id];
        if (!target) return prev;
        const next = {
          ...prev,
          [currentExam.id]: {
            ...target,
            ...patch
          }
        };
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {
          console.error('Local storage auto-fill error', e);
        }
        return next;
      });
    }
  }, [
    readOnly,
    currentExam?.id,
    currentExam?.schoolName,
    currentExam?.academicYear,
    currentExam?.term,
    defaultSchoolName,
    defaultAcademicYear,
    defaultTerm,
    storageKey
  ]);

  const isCurrentExamDirty = Boolean(dirtyMap[currentExam.id]);

  // Saved exam analyses list (only persisted/saved exams, newest first)
  const savedExamList = useMemo(() => {
    return Object.values(savedExams)
      .filter((ex) => ex.isSaved)
      .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime());
  }, [savedExams]);

  const filteredSavedExams = useMemo(() => {
    const q = listSearch.trim().toLowerCase();
    return savedExamList.filter((ex) => {
      if (listClassFilter && ex.className !== listClassFilter) return false;
      if (!q) return true;
      const haystack = [
        ex.subject,
        ex.className,
        ex.teacherName,
        ex.createdByName,
        ex.schoolName,
        ex.academicYear,
        ex.examNumber ? `${ex.examNumber}. Sınav` : '',
        ex.scenarioNumber ? `Senaryo ${ex.scenarioNumber}` : ''
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [savedExamList, listSearch, listClassFilter]);

  // Persist exams locally
  const saveAllExams = (newExams: Record<string, PusulaSinavAnaliziDoc>) => {
    if (readOnly) return;
    setSavedExams(newExams);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newExams));
    } catch (e) {
      console.error("Local storage save error", e);
    }
  };

  // Update field of current active exam
  const handleUpdateExam = (updates: Partial<PusulaSinavAnaliziDoc>) => {
    if (readOnly) return;
    const updated: PusulaSinavAnaliziDoc = {
      ...currentExam,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dirtyExamIdsRef.current.add(currentExam.id);
    setDirtyMap((prev) => (prev[currentExam.id] ? prev : { ...prev, [currentExam.id]: true }));
    const newExams = {
      ...savedExams,
      [currentExam.id]: updated
    };
    saveAllExams(newExams);
  };

  // Explicit Save / Update to Firestore + localStorage
  const handleSaveCurrentExam = async () => {
    if (readOnly) return;
    setIsSaving(true);
    try {
      const wasExistingSaved = Boolean(currentExam.isSaved);
      const targetId = currentExam.id === 'blank-sinav-1' ? `sinav-${Date.now()}` : currentExam.id;
      const nowIso = new Date().toISOString();

      const examToSave: PusulaSinavAnaliziDoc = {
        ...currentExam,
        id: targetId,
        isSaved: true,
        createdBy: currentExam.createdBy || state?.currentUser?.username || '',
        createdByName: currentExam.createdByName || state?.currentUser?.name || '',
        createdAt: currentExam.createdAt || nowIso,
        updatedAt: nowIso
      };

      await setDoc(doc(db, firestoreColName, targetId), sanitizeForFirestore(examToSave));

      dirtyExamIdsRef.current.delete(currentExam.id);
      dirtyExamIdsRef.current.delete(targetId);
      setDirtyMap((prev) => {
        const next = { ...prev };
        delete next[currentExam.id];
        delete next[targetId];
        return next;
      });

      const nextExams = { ...savedExams };
      if (targetId !== currentExam.id && currentExam.id === 'blank-sinav-1') {
        delete nextExams['blank-sinav-1'];
      }
      nextExams[targetId] = examToSave;
      saveAllExams(nextExams);
      if (activeExamId !== targetId) {
        setActiveExamId(targetId);
      }

      actions?.showToast?.(
        wasExistingSaved ? 'Sınav analizi güncellendi.' : 'Sınav analizi başarıyla kaydedildi.',
        'success'
      );
    } catch (error) {
      console.error('Exam save error:', error);
      // Fallback: still mark saved locally so user never loses work
      const targetId = currentExam.id === 'blank-sinav-1' ? `sinav-${Date.now()}` : currentExam.id;
      const localSaved: PusulaSinavAnaliziDoc = {
        ...currentExam,
        id: targetId,
        isSaved: true,
        createdBy: currentExam.createdBy || state?.currentUser?.username || '',
        createdByName: currentExam.createdByName || state?.currentUser?.name || '',
        updatedAt: new Date().toISOString()
      };
      const nextExams = { ...savedExams, [targetId]: localSaved };
      if (targetId !== currentExam.id) delete nextExams[currentExam.id];
      saveAllExams(nextExams);
      setActiveExamId(targetId);
      actions?.showToast?.('Sınav analizi yerel hafızaya kaydedildi (bulut bağlantısı sağlanamadı).', 'warning');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a saved exam analysis and all student outcome feedbacks linked to it
  const handleDeleteSavedExam = (exam: PusulaSinavAnaliziDoc) => {
    if (readOnly) return;
    const label = `${exam.subject || 'İsimsiz Sınav'}${exam.className ? ` (${exam.className})` : ''}`;
    const performDelete = async () => {
      try {
        await deleteDoc(doc(db, firestoreColName, exam.id));
      } catch (e) {
        console.error('Firestore delete error:', e);
      }

      // Cascade delete all student outcome feedbacks sent for this exam
      const feedbackIdsToDelete = new Set<string>(
        sentDonuts
          .filter((d) => d.examId === exam.id || d.id.startsWith(`${exam.id}_`))
          .map((d) => d.id)
      );

      try {
        const snap = await getDocs(
          query(collection(db, donutsColName), where('examId', '==', exam.id))
        );
        snap.forEach((dSnap) => {
          if (dSnap.id) feedbackIdsToDelete.add(dSnap.id);
        });
      } catch (e) {
        console.error('Firestore feedback query error during exam delete:', e);
      }

      if (feedbackIdsToDelete.size > 0) {
        try {
          await Promise.all(
            Array.from(feedbackIdsToDelete).map((fbId) =>
              deleteDoc(doc(db, donutsColName, fbId))
            )
          );
        } catch (e) {
          console.error('Firestore feedback cascade delete error:', e);
        }
      }

      setSentDonuts((prev) => {
        const filtered = prev.filter(
          (d) => d.examId !== exam.id && !feedbackIdsToDelete.has(d.id)
        );
        try {
          localStorage.setItem(donutsStorageKey, JSON.stringify(filtered));
        } catch {
          // ignore
        }
        return filtered;
      });

      dirtyExamIdsRef.current.delete(exam.id);
      setDirtyMap((prev) => {
        const next = { ...prev };
        delete next[exam.id];
        return next;
      });

      const nextExams = { ...savedExams };
      delete nextExams[exam.id];
      if (Object.keys(nextExams).length === 0) {
        const blank = createEmptyExamDoc('blank-sinav-1', {
          schoolName: defaultSchoolName,
          academicYear: defaultAcademicYear,
          term: defaultTerm
        });
        nextExams[blank.id] = { ...blank, isSaved: false };
      }
      saveAllExams(nextExams);
      if (activeExamId === exam.id) {
        setActiveExamId(Object.keys(nextExams)[0]);
      }
      actions?.showToast?.(
        feedbackIdsToDelete.size > 0
          ? 'Sınav analizi ve öğrencilere gönderilmiş analiz dönütleri silindi.'
          : 'Sınav analizi silindi.',
        'success'
      );
    };

    if (actions?.requestConfirm) {
      actions.requestConfirm(
        `"${label}" sınav analizini silmek istediğinize emin misiniz? Bu sınava ait öğrencilere gönderilmiş analiz dönütleri de silinecektir.`,
        performDelete
      );
    } else {
      performDelete();
    }
  };

  // Load saved exam into editor
  const handleEditSavedExam = (examId: string) => {
    setActiveExamId(examId);
    setTimeout(() => {
      editorTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Create new blank exam with default school, academic year, and term filled
  const handleCreateNewExam = () => {
    if (readOnly) return;
    const newId = `sinav-${Date.now()}`;
    const newDoc: PusulaSinavAnaliziDoc = {
      ...createEmptyExamDoc(newId, {
        schoolName: defaultSchoolName,
        academicYear: defaultAcademicYear,
        term: defaultTerm
      }),
      isSaved: false
    };

    const newExams = {
      ...savedExams,
      [newId]: newDoc
    };
    saveAllExams(newExams);
    setActiveExamId(newId);
    actions?.showToast?.('Yeni boş sınav analiz tablosu oluşturuldu.', 'success');
    setTimeout(() => {
      editorTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Helper to retrieve students for any class name variant (8/A, 8_A, 8A, etc.)
  const getStudentsForClass = (className: string): string[] => {
    if (!classes || typeof classes !== 'object') return [];
    if (classes[className] && Array.isArray(classes[className])) {
      return classes[className];
    }
    const norm = (s: string) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
    const targetNorm = norm(className);
    for (const [k, v] of Object.entries(classes)) {
      if (norm(k) === targetNorm && Array.isArray(v)) {
        return v;
      }
    }
    return [];
  };

  const normStudentStr = (s: string) =>
    String(s || '')
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .replace(/ı/g, 'i')
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '');

  const extractNoAndName = (raw: string): { no: string; name: string } => {
    const trimmed = String(raw || '').trim();
    const match = trimmed.match(/^(\d+)\s*(?:[-–—.]\s*|\s+)([a-zA-ZçğıöşüÇĞİÖŞÜ].*)$/);
    if (match) {
      return { no: match[1].trim(), name: match[2].trim() };
    }
    return { no: '', name: trimmed };
  };

  // Resolve real student school number from class string, users list, or schoolPortfolios
  const parseClassStudentEntry = (rawName: string, className?: string) => {
    const base = extractNoAndName(rawName);
    let resolvedNo = base.no;
    let resolvedName = base.name;

    const targetPureNorm = normStudentStr(resolvedName);
    const targetRawNorm = normStudentStr(rawName);
    const targetClsNorm = className ? normStudentStr(className) : '';

    if (!resolvedNo && className) {
      const clsList = getStudentsForClass(className);
      const matchedClsEntry = clsList.find((entry) => {
        const p = extractNoAndName(entry);
        return (
          normStudentStr(entry) === targetRawNorm ||
          (targetPureNorm && normStudentStr(p.name) === targetPureNorm)
        );
      });
      if (matchedClsEntry) {
        const p = extractNoAndName(matchedClsEntry);
        if (p.no) resolvedNo = p.no;
        if (p.name) resolvedName = p.name;
      }
    }

    if (!resolvedNo && Array.isArray(state?.users)) {
      const matchedUser = state.users.find((u: any) => {
        if (!u || (u.role !== 'student' && u.role !== 'öğrenci')) return false;
        if (targetClsNorm && u.classLevel && normStudentStr(u.classLevel) !== targetClsNorm) {
          return false;
        }
        const uParsed = extractNoAndName(u.name || '');
        return (
          normStudentStr(u.name || '') === targetRawNorm ||
          (targetPureNorm && normStudentStr(uParsed.name) === targetPureNorm)
        );
      });
      if (matchedUser) {
        const uParsed = extractNoAndName(matchedUser.name || '');
        resolvedNo = String(
          matchedUser.studentNo || matchedUser.okulNo || matchedUser.schoolNo || uParsed.no || ''
        ).trim();
      }
    }

    if (!resolvedNo && Array.isArray(state?.schoolPortfolios)) {
      const matchedPort = state.schoolPortfolios.find((p: any) => {
        if (!p?.fullName) return false;
        const pParsed = extractNoAndName(p.fullName);
        return (
          normStudentStr(p.fullName) === targetRawNorm ||
          (targetPureNorm && normStudentStr(pParsed.name) === targetPureNorm)
        );
      });
      if (matchedPort) {
        const pParsed = extractNoAndName(matchedPort.fullName || '');
        resolvedNo = String(matchedPort.studentNo || matchedPort.okulNo || pParsed.no || '').trim();
      }
    }

    return {
      studentNumber: resolvedNo,
      studentName: resolvedName
    };
  };

  const buildStudentRowsForClass = (className: string, prefix = 'st'): PusulaStudentExamRow[] => {
    const studentList = getStudentsForClass(className);
    return studentList.map((rawName, idx) => {
      const parsed = parseClassStudentEntry(rawName, className);
      return {
        id: `${prefix}-${className}-${idx + 1}-${Date.now()}`,
        studentNumber: parsed.studentNumber,
        studentName: parsed.studentName,
        status: 'girdi',
        scores: {},
        totalScore: 0
      };
    });
  };

  // Auto-load class student list when top bar selectedClass is set/changed or when className has empty list
  const lastTopClassRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (readOnly) return;
    const norm = (s: string) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
    const hasAnyEnteredScores = currentExam.students.some(
      s => s.scores && Object.keys(s.scores).length > 0
    );

    const topClassChanged =
      lastTopClassRef.current !== undefined && lastTopClassRef.current !== selectedClass;
    lastTopClassRef.current = selectedClass;

    // 1. If exam has no className & no students yet, and top header has selectedClass -> auto load it
    if (!currentExam.className && currentExam.students.length === 0 && selectedClass) {
      const rows = buildStudentRowsForClass(selectedClass, 'auto');
      if (rows.length > 0) {
        handleUpdateExam({
          className: selectedClass.replace('_', '/'),
          students: rows
        });
      }
      return;
    }

    // 2. If user changes selectedClass from the top bar and hasn't entered scores yet -> sync class & students
    if (topClassChanged && selectedClass && !hasAnyEnteredScores) {
      if (norm(currentExam.className) !== norm(selectedClass)) {
        const rows = buildStudentRowsForClass(selectedClass, 'sync');
        handleUpdateExam({
          className: selectedClass.replace('_', '/'),
          students: rows
        });
      }
      return;
    }

    // 3. If className is set on the exam but student list is still empty -> auto-populate students
    if (currentExam.className && currentExam.students.length === 0) {
      const rows = buildStudentRowsForClass(currentExam.className, 'fill');
      if (rows.length > 0) {
        handleUpdateExam({ students: rows });
      }
      return;
    }

    // 4. Reconcile student school numbers (upgrade legacy 1..N index fallback or missing school numbers)
    if (currentExam.students.length > 0) {
      const targetCls = currentExam.className || selectedClass || '';
      const isSequentialFallback = currentExam.students.every(
        (s, i) => String(s.studentNumber || '').trim() === String(i + 1)
      );
      let changed = false;
      const reconciled = currentExam.students.map((st) => {
        const resolved = parseClassStudentEntry(st.studentName, targetCls);
        let nextNo = st.studentNumber;
        const nextName = resolved.studentName || st.studentName;

        if (resolved.studentNumber && (!st.studentNumber || isSequentialFallback)) {
          nextNo = resolved.studentNumber;
        } else if (!resolved.studentNumber && isSequentialFallback) {
          nextNo = '';
        }

        if (nextNo !== st.studentNumber || nextName !== st.studentName) {
          changed = true;
          return { ...st, studentNumber: nextNo, studentName: nextName };
        }
        return st;
      });
      if (changed) {
        handleUpdateExam({ students: reconciled });
      }
    }
  }, [selectedClass, classes, state?.users, state?.schoolPortfolios, currentExam.id, currentExam.className, currentExam.students.length, readOnly]);

  // Class Selection Handler: Updates class and loads its students
  const handleSelectClassAndLoadStudents = (newClassName: string) => {
    const formattedClassName = newClassName ? newClassName.replace('_', '/') : '';
    if (!newClassName) {
      handleUpdateExam({ className: '', students: [] });
      return;
    }
    const newStudents = buildStudentRowsForClass(newClassName, 'cls');
    if (newStudents.length > 0) {
      handleUpdateExam({
        className: formattedClassName,
        students: newStudents
      });
      actions?.showToast?.(`${formattedClassName} sınıfından ${newStudents.length} öğrenci aktarıldı.`, 'success');
    } else {
      handleUpdateExam({ className: formattedClassName, students: [] });
      actions?.showToast?.(`${formattedClassName} sınıfı seçildi.`, 'info');
    }
  };

  // Populate students from class
  const handlePopulateFromClass = () => {
    const targetClass = currentExam.className || selectedClass;
    const newStudents = targetClass ? buildStudentRowsForClass(targetClass, 'imp') : [];
    if (newStudents.length === 0) {
      actions?.showToast?.('Seçili sınıfta öğrenci kaydı bulunamadı.', 'info');
      return;
    }

    handleUpdateExam({
      className: currentExam.className || (targetClass ? targetClass.replace('_', '/') : ''),
      students: newStudents
    });
    actions?.showToast?.(`${newStudents.length} öğrenci sınıftan aktarıldı.`, 'success');
  };

  // Add single student row
  const handleAddStudentRow = () => {
    const newRow: PusulaStudentExamRow = {
      id: `st-${Date.now()}`,
      studentNumber: '',
      studentName: 'YENİ ÖĞRENCİ',
      status: 'girdi',
      scores: {},
      totalScore: 0
    };
    handleUpdateExam({ students: [...currentExam.students, newRow] });
  };

  // Delete student row
  const handleDeleteStudentRow = (id: string) => {
    handleUpdateExam({
      students: currentExam.students.filter(s => s.id !== id)
    });
  };

  // Change student score cell
  const handleScoreChange = (studentId: string, qNum: number, rawVal: string) => {
    const qDef = currentExam.questions.find(q => q.questionNumber === qNum);
    const qMax = qDef && qDef.maxScore > 0 ? qDef.maxScore : 100;

    const updatedStudents = currentExam.students.map(st => {
      if (st.id === studentId) {
        const newScores = { ...st.scores };
        if (rawVal.trim() === '') {
          delete newScores[qNum];
        } else {
          let val = parseFloat(rawVal);
          if (isNaN(val)) val = 0;
          if (val < 0) val = 0;
          if (val > qMax) val = qMax;
          newScores[qNum] = val;
        }
        // Calculate total
        const total = Object.values(newScores).reduce((a, b) => a + (b || 0), 0);
        return {
          ...st,
          scores: newScores,
          totalScore: Math.round(total * 10) / 10
        };
      }
      return st;
    });

    handleUpdateExam({ students: updatedStudents });
  };

  // Conditional formatting helpers (matching MEB Excel grading rules)
  const getQuestionScoreCellClass = (val: number | undefined, maxScore: number, status: string) => {
    if (status !== 'girdi') return 'bg-gray-100 text-gray-400';
    if (val === undefined || val === null) return 'bg-white text-gray-800';
    if (maxScore <= 0) return 'bg-white text-slate-900 font-bold';
    const ratio = val / maxScore;
    if (ratio >= 0.6) {
      return 'bg-[#92D050] text-slate-950 font-black';
    }
    if (ratio >= 0.5) {
      return 'bg-[#FCD5B4] text-slate-950 font-black';
    }
    return 'bg-white text-slate-900 font-bold';
  };

  const getTotalScoreCellClass = (totalScore: number, hasScores: boolean, status: string) => {
    if (status === 'girmedi') return 'bg-gray-100 text-gray-500 font-black';
    if (status === 'kopya') return 'bg-rose-200 text-rose-950 font-black';
    if (!hasScores) return 'bg-white text-gray-400 font-bold';
    if (totalScore >= 60) {
      return 'bg-[#92D050] text-slate-950 font-black';
    }
    if (totalScore >= 50) {
      return 'bg-[#FCD5B4] text-slate-950 font-black';
    }
    return 'bg-rose-200 text-rose-950 font-black';
  };

  // Helper to update a specific question row (creates missing rows up to qNum if needed)
  const updateQuestionField = (qNum: number, updater: (q: PusulaQuestionAnalysisDef) => PusulaQuestionAnalysisDef) => {
    const targetLen = Math.max(
      currentExam.questionCount || 0,
      currentExam.questions.length,
      qNum
    );
    const mapByNum = new Map<number, PusulaQuestionAnalysisDef>();
    currentExam.questions.forEach(q => mapByNum.set(q.questionNumber, q));

    let rebuilt: PusulaQuestionAnalysisDef[] = [];
    for (let i = 1; i <= targetLen; i++) {
      const existing = mapByNum.get(i) || {
        questionNumber: i,
        outcome: '',
        maxScore: 0
      };
      rebuilt.push(i === qNum ? updater(existing) : existing);
    }

    // If questionCount is not explicitly locked (> 0), trim trailing completely empty rows
    if (!currentExam.questionCount || currentExam.questionCount <= 0) {
      while (rebuilt.length > 0) {
        const last = rebuilt[rebuilt.length - 1];
        if (!last.outcome.trim() && (!last.maxScore || last.maxScore <= 0)) {
          rebuilt.pop();
        } else {
          break;
        }
      }
    }

    handleUpdateExam({ questions: rebuilt });
  };

  // Change Question Max Score
  const handleQuestionMaxScoreChange = (qNum: number, rawVal: string) => {
    const val = rawVal === '' ? 0 : Math.max(0, Math.min(100, parseInt(rawVal, 10) || 0));
    updateQuestionField(qNum, (q) => ({ ...q, maxScore: val }));
  };

  // Change Question Outcome text
  const handleQuestionOutcomeChange = (qNum: number, text: string) => {
    updateQuestionField(qNum, (q) => ({ ...q, outcome: text }));
  };

  // Change Question Count (e.g. 0..20)
  const handleQuestionCountChange = (count: number) => {
    const newCount = Math.max(0, Math.min(20, count));
    const mapByNum = new Map<number, PusulaQuestionAnalysisDef>();
    currentExam.questions.forEach(q => mapByNum.set(q.questionNumber, q));

    const newQuestions: PusulaQuestionAnalysisDef[] = [];
    for (let i = 1; i <= newCount; i++) {
      const existing = mapByNum.get(i);
      newQuestions.push(
        existing || {
          questionNumber: i,
          outcome: '',
          maxScore: 0
        }
      );
    }

    // Remove any scores belonging to deleted questions (> newCount) and recalculate totals
    const updatedStudents = currentExam.students.map((st) => {
      if (!st.scores) return st;
      const prunedScores: Record<number, number> = {};
      let removedAny = false;
      for (const [kStr, val] of Object.entries(st.scores)) {
        const qNum = parseInt(kStr, 10);
        if (qNum <= newCount) {
          prunedScores[qNum] = val;
        } else {
          removedAny = true;
        }
      }
      if (!removedAny) return st;
      const total = Object.values(prunedScores).reduce((a, b) => a + (b || 0), 0);
      return {
        ...st,
        scores: prunedScores,
        totalScore: Math.round(total * 10) / 10
      };
    });

    handleUpdateExam({
      questionCount: newCount,
      questions: newQuestions,
      students: updatedStudents
    });
  };

  // -------------------------------------------------------------------------
  // STATISTICAL CALCULATIONS (Matching Excel MEB formulas)
  // -------------------------------------------------------------------------
  const stats = useMemo(() => {
    const students = currentExam.students || [];
    const totalStudents = students.length;
    const takingExam = students.filter(s => s.status === 'girdi');
    const absentCount = students.filter(s => s.status === 'girmedi').length;
    const cheatCount = students.filter(s => s.status === 'kopya').length;
    const n = takingExam.length;

    const scoresList = takingExam.map(s => s.totalScore);
    
    // Distribution Brackets
    const dist85_100 = takingExam.filter(s => s.totalScore >= 85 && s.totalScore <= 100).length;
    const dist70_84 = takingExam.filter(s => s.totalScore >= 70 && s.totalScore < 85).length;
    const dist60_69 = takingExam.filter(s => s.totalScore >= 60 && s.totalScore < 70).length;
    const dist50_59 = takingExam.filter(s => s.totalScore >= 50 && s.totalScore < 60).length;
    const dist0_49 = takingExam.filter(s => s.totalScore < 50).length;

    // 5-Level Histogram (0-20, 21-40, 41-60, 61-80, 81-100)
    const hist0_20 = takingExam.filter(s => s.totalScore >= 0 && s.totalScore <= 20).length;
    const hist21_40 = takingExam.filter(s => s.totalScore > 20 && s.totalScore <= 40).length;
    const hist41_60 = takingExam.filter(s => s.totalScore > 40 && s.totalScore <= 60).length;
    const hist61_80 = takingExam.filter(s => s.totalScore > 60 && s.totalScore <= 80).length;
    const hist81_100 = takingExam.filter(s => s.totalScore > 80 && s.totalScore <= 100).length;

    const successfulCount = takingExam.filter(s => s.totalScore >= 50).length;
    const unsuccessfulCount = takingExam.filter(s => s.totalScore < 50).length;
    const successRate = n > 0 ? (successfulCount / n) * 100 : 0;

    // Arithmetic Mean
    const sumScores = scoresList.reduce((a, b) => a + b, 0);
    const mean = n > 0 ? sumScores / n : 0;

    // Median
    let median = 0;
    if (n > 0) {
      const sorted = [...scoresList].sort((a, b) => a - b);
      const mid = Math.floor(n / 2);
      median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    // Mode (En çok tekrar eden değer)
    let mode = 0;
    if (n > 0) {
      const freq: Record<number, number> = {};
      scoresList.forEach(sc => { freq[sc] = (freq[sc] || 0) + 1; });
      let maxFreq = 0;
      for (const [sc, f] of Object.entries(freq)) {
        if (f > maxFreq) {
          maxFreq = f;
          mode = parseFloat(sc);
        }
      }
    }

    // Range (Ranj)
    const maxScore = scoresList.length > 0 ? Math.max(...scoresList) : 0;
    const minScore = scoresList.length > 0 ? Math.min(...scoresList) : 0;
    const range = scoresList.length > 0 ? maxScore - minScore : 0;

    // Standard Deviation
    let stdDev = 0;
    if (n > 1) {
      const variance = scoresList.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
      stdDev = Math.sqrt(variance);
    }

    // Skewness (Çarpıklık = 3 * (Mean - Median) / StdDev)
    let skewness = 0;
    if (stdDev > 0) {
      skewness = (3 * (mean - median)) / stdDev;
    }

    // Difficulty Evaluation text
    let difficultyTitle = n === 0 ? 'VERİ BEKLENİYOR' : 'DENGELİ / ORTA GÜÇLÜKTE';
    let difficultyColor = n === 0 ? 'text-gray-600 bg-gray-50 border-gray-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let difficultyDesc = n === 0
      ? 'Öğrenci puanları girildiğinde sınav güçlük değerlendirmesi burada görüntülenecektir.'
      : 'Sınav sınıf seviyesine ve hedeflenen kazanım dağılımına uygundur.';
    
    if (n > 0 && skewness > 0.3) {
      difficultyTitle = 'SINAV ÇOK ZOR';
      difficultyColor = 'text-rose-700 bg-rose-50 border-rose-200';
      difficultyDesc = 'Sınav öğrenci seviyesinin üzerindedir ya da beklenen davranışlar tam pekişmemiştir. Puanlar alt bölgede yığılmıştır.';
    } else if (n > 0 && skewness > 0.1) {
      difficultyTitle = 'SINAV ZOR';
      difficultyColor = 'text-amber-700 bg-amber-50 border-amber-200';
      difficultyDesc = 'Sınav ortalamanın üzerinde bir güçlük derecesine sahiptir.';
    } else if (n > 0 && skewness < -0.3) {
      difficultyTitle = 'SINAV ÇOK KOLAY';
      difficultyColor = 'text-blue-700 bg-blue-50 border-blue-200';
      difficultyDesc = 'Sınav soruları öğrenci seviyesine göre oldukça kolay kalmıştır; puanlar üst seviyelerde yoğunlaşmıştır.';
    } else if (n > 0 && skewness < -0.1) {
      difficultyTitle = 'SINAV KOLAY';
      difficultyColor = 'text-teal-700 bg-teal-50 border-teal-200';
      difficultyDesc = 'Sınav genel olarak öğrencilerin rahat yanıtladığı bir seviyededir.';
    }

    // Total Max Score of Exam
    const totalExamMax = currentExam.questions.reduce((a, b) => a + b.maxScore, 0);

    // Per-Question Statistics
    const questionStats = currentExam.questions.map(q => {
      const qNum = q.questionNumber;
      const qMax = q.maxScore;

      const answeredStudents = takingExam.filter(s => s.scores && s.scores[qNum] !== undefined);
      const answeredCount = answeredStudents.length;
      const unansweredCount = Math.max(0, totalStudents - answeredCount);
      const answeredPercent = totalStudents > 0 ? (answeredCount / totalStudents) * 100 : 0;

      const qSum = answeredStudents.reduce((acc, s) => acc + (s.scores[qNum] || 0), 0);
      const qAvg = answeredCount > 0 ? qSum / answeredCount : 0;
      const qSuccessRatio = qMax > 0 && answeredCount > 0 ? (qAvg / qMax) * 100 : 0;

      let statusLabel: 'Anlaşılmış' | 'Geri Bildirim Verilmeli' | 'Bireysel Çalışma Gerekli' | 'Veri Bekleniyor' = 'Veri Bekleniyor';
      let statusColor = 'text-gray-500 bg-gray-50 border-gray-200';
      let barColor = 'bg-gray-300';

      if (answeredCount > 0) {
        if (qSuccessRatio < 40) {
          statusLabel = 'Bireysel Çalışma Gerekli';
          statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
          barColor = 'bg-rose-500';
        } else if (qSuccessRatio < 60) {
          statusLabel = 'Geri Bildirim Verilmeli';
          statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
          barColor = 'bg-amber-500';
        } else {
          statusLabel = 'Anlaşılmış';
          statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
          barColor = 'bg-emerald-500';
        }
      }

      return {
        questionNumber: qNum,
        outcome: q.outcome,
        maxScore: qMax,
        answeredCount,
        unansweredCount,
        answeredPercent,
        qAvg,
        qSuccessRatio,
        statusLabel,
        statusColor,
        barColor
      };
    });

    const avgAnsweredCount = questionStats.length > 0
      ? questionStats.reduce((a, q) => a + q.answeredCount, 0) / questionStats.length
      : 0;
    const avgUnansweredCount = questionStats.length > 0
      ? questionStats.reduce((a, q) => a + q.unansweredCount, 0) / questionStats.length
      : 0;
    const avgAnsweredPercent = questionStats.length > 0
      ? questionStats.reduce((a, q) => a + q.answeredPercent, 0) / questionStats.length
      : 0;
    const avgQuestionScore = questionStats.length > 0
      ? questionStats.reduce((a, q) => a + q.qAvg, 0) / questionStats.length
      : 0;

    // Outcomes needing feedback (sorted from lowest success)
    const feedbackQuestions = [...questionStats]
      .filter(q => q.answeredCount > 0 && q.statusLabel !== 'Anlaşılmış')
      .sort((a, b) => a.qSuccessRatio - b.qSuccessRatio);

    // Top successful questions
    const topQuestions = [...questionStats]
      .sort((a, b) => b.qSuccessRatio - a.qSuccessRatio)
      .slice(0, 3);

    return {
      totalStudents,
      takingExamCount: n,
      absentCount,
      cheatCount,
      successfulCount,
      unsuccessfulCount,
      successRate,
      mean,
      median,
      mode,
      maxScore,
      minScore,
      range,
      stdDev,
      skewness,
      difficultyTitle,
      difficultyColor,
      difficultyDesc,
      totalExamMax,
      avgAnsweredCount,
      avgUnansweredCount,
      avgAnsweredPercent,
      avgQuestionScore,
      dist85_100,
      dist70_84,
      dist60_69,
      dist50_59,
      dist0_49,
      hist0_20,
      hist21_40,
      hist41_60,
      hist61_80,
      hist81_100,
      questionStats,
      feedbackQuestions,
      topQuestions
    };
  }, [currentExam]);

  // Helpers for matching & dispatching failed outcomes to students
  const sentDonutsForCurrentExam = useMemo(() => {
    return sentDonuts.filter((d) => d.examId === currentExam.id);
  }, [sentDonuts, currentExam.id]);

  const feedbackStudySummary = useMemo(() => {
    let totalSentStudents = 0;
    let totalSentItems = 0;
    let totalStudiedItems = 0;
    sentDonutsForCurrentExam.forEach((d) => {
      if (d.items && d.items.length > 0) {
        totalSentStudents += 1;
        d.items.forEach((it) => {
          totalSentItems += 1;
          if (it.studied) totalStudiedItems += 1;
        });
      }
    });
    return { totalSentStudents, totalSentItems, totalStudiedItems };
  }, [sentDonutsForCurrentExam]);

  const resolveMatchedUserForRow = (st: PusulaStudentExamRow) => {
    if (!Array.isArray(state?.users)) return null;
    const targetNameNorm = normStudentIdentityStr(extractStudentNoAndName(st.studentName).name);
    const targetClsNorm = String(currentExam.className || selectedClass || '')
      .replace(/[\s_\\/-]/g, '')
      .toLowerCase();
    const targetNo = String(st.studentNumber || extractStudentNoAndName(st.studentName).no || '').trim();

    return (
      state.users.find((u: any) => {
        if (!u || (u.role !== 'student' && u.role !== 'öğrenci')) return false;
        const uParsed = extractStudentNoAndName(u.name || '');
        const uNameNorm = normStudentIdentityStr(uParsed.name);
        if (!targetNameNorm || uNameNorm !== targetNameNorm) return false;
        const uClsNorm = String(u.classLevel || '').replace(/[\s_\\/-]/g, '').toLowerCase();
        if (targetClsNorm && uClsNorm && targetClsNorm !== uClsNorm) return false;
        const uNo = String(u.studentNo || u.okulNo || u.schoolNo || uParsed.no || '').trim();
        if (targetNo && uNo && targetNo !== uNo) return false;
        return true;
      }) || null
    );
  };

  const studentsWithWeakOutcomesCount = useMemo(() => {
    if (!currentExam.questions.length || !currentExam.students.length) return 0;
    return currentExam.students.filter((st) => {
      if (st.status !== 'girdi') return false;
      const hasAnyScore = Object.keys(st.scores || {}).length > 0;
      if (!hasAnyScore) return false;
      return currentExam.questions.some((q) => {
        const val = st.scores?.[q.questionNumber];
        if (q.maxScore > 0) {
          return (val ?? 0) / q.maxScore < 0.6;
        }
        return q.outcome.trim() !== '' && (val === undefined || val === 0);
      });
    }).length;
  }, [currentExam.questions, currentExam.students]);

  const handleOpenSendOutcomesModal = () => {
    if (readOnly) return;
    if (!currentExam.students.length) {
      actions?.showToast?.('Önce sınıf listesini veya öğrencileri ekleyiniz.', 'warning');
      return;
    }
    if (!currentExam.questions.length) {
      actions?.showToast?.('Önce Öğrenme Çıktıları ve Soru Puan Değerlerini giriniz.', 'warning');
      return;
    }

    const drafts = currentExam.students.map((st) => {
      const matchedUser = resolveMatchedUserForRow(st);
      const existingSentDoc = sentDonutsForCurrentExam.find((d) =>
        doesExamFeedbackMatchStudent(d, {
          id: matchedUser?.id,
          username: matchedUser?.username,
          name: st.studentName,
          classLevel: currentExam.className,
          studentNo: st.studentNumber
        })
      );

      const hasAnyScore = Object.keys(st.scores || {}).length > 0;
      const autoItems: PusulaStudentOutcomeFeedbackItem[] = [];

      if (st.status === 'girdi' && hasAnyScore) {
        currentExam.questions.forEach((q) => {
          const val = st.scores?.[q.questionNumber];
          const isFailed =
            q.maxScore > 0
              ? (val ?? 0) / q.maxScore < 0.6
              : q.outcome.trim() !== '' && (val === undefined || val === 0);

          if (isFailed) {
            const existingMatchedItem = existingSentDoc?.items?.find(
              (it) => it.questionNumber === q.questionNumber
            );
            const outcomeText =
              existingMatchedItem?.outcome?.trim() ||
              q.outcome?.trim() ||
              `${q.questionNumber}. Soru Kazanımı`;
            autoItems.push({
              id: existingMatchedItem?.id || `q-${q.questionNumber}-${st.id}`,
              questionNumber: q.questionNumber,
              outcome: outcomeText,
              studentScore: val ?? 0,
              maxScore: q.maxScore,
              studied: Boolean(existingMatchedItem?.studied),
              studiedAt: existingMatchedItem?.studiedAt
            });
          }
        });
      }

      if (existingSentDoc?.items?.length) {
        existingSentDoc.items.forEach((prevIt) => {
          if (!prevIt.questionNumber && !autoItems.some((a) => a.id === prevIt.id)) {
            autoItems.push({ ...prevIt });
          }
        });
      }

      return {
        rowId: st.id,
        studentUserId: matchedUser?.id,
        studentUsername: matchedUser?.username,
        studentNumber: st.studentNumber,
        studentName: extractStudentNoAndName(st.studentName).name || st.studentName,
        status: st.status,
        totalScore: st.totalScore,
        selected: autoItems.length > 0,
        hasPreviouslySent: Boolean(existingSentDoc),
        items: autoItems
      };
    });

    setFeedbackSubject(currentExam.subject || '');
    setFeedbackDrafts(drafts);
    setFeedbackSearch('');
    setNewOutcomeInputs({});
    setShowOnlyWithMissing(drafts.some((d) => d.items.length > 0));
    setIsFeedbackModalOpen(true);
  };

  const handleDispatchStudentOutcomes = async () => {
    const eligible = feedbackDrafts
      .filter((d) => d.selected)
      .map((d) => ({
        ...d,
        items: d.items
          .map((it) => ({ ...it, outcome: it.outcome.trim() }))
          .filter((it) => it.outcome.length > 0)
      }))
      .filter((d) => d.items.length > 0);

    if (eligible.length === 0) {
      actions?.showToast?.(
        'Gönderilecek en az bir öğrenci ve en az bir kazanım seçili olmalıdır.',
        'warning'
      );
      return;
    }

    setIsSendingFeedback(true);
    try {
      const nowIso = new Date().toISOString();
      const targetExamId =
        currentExam.id === 'blank-sinav-1' ? `sinav-${Date.now()}` : currentExam.id;
      const effectiveSubject = feedbackSubject.trim() || currentExam.subject?.trim() || 'Yazılı Sınav';

      const examToPersist: PusulaSinavAnaliziDoc = {
        ...currentExam,
        id: targetExamId,
        subject: effectiveSubject,
        isSaved: true,
        createdBy: currentExam.createdBy || state?.currentUser?.username || '',
        createdByName: currentExam.createdByName || state?.currentUser?.name || '',
        createdAt: currentExam.createdAt || nowIso,
        updatedAt: nowIso
      };

      // Always persist parent exam analysis in Firestore so student feedbacks remain linked to a valid saved exam
      await setDoc(doc(db, firestoreColName, targetExamId), sanitizeForFirestore(examToPersist));

      dirtyExamIdsRef.current.delete(currentExam.id);
      dirtyExamIdsRef.current.delete(targetExamId);
      setDirtyMap((prev) => {
        const next = { ...prev };
        delete next[currentExam.id];
        delete next[targetExamId];
        return next;
      });

      const nextExams = { ...savedExams, [targetExamId]: examToPersist };
      if (targetExamId !== currentExam.id && currentExam.id === 'blank-sinav-1') {
        delete nextExams['blank-sinav-1'];
      }
      saveAllExams(nextExams);
      if (activeExamId !== targetExamId) {
        setActiveExamId(targetExamId);
      }

      const docsToSave: PusulaStudentOutcomeFeedbackDoc[] = eligible.map((d) => {
        const cleanKey =
          normStudentIdentityStr(d.studentUserId || d.studentUsername || `${d.studentNumber}_${d.studentName}`) ||
          normStudentIdentityStr(d.rowId) ||
          `${Date.now()}`;
        const docId = `${targetExamId}_${cleanKey}`;

        return {
          id: docId,
          schoolId: activeSchoolId || 'default',
          examId: targetExamId,
          subject: effectiveSubject,
          examNumber: currentExam.examNumber,
          academicYear: currentExam.academicYear,
          term: currentExam.term,
          className: currentExam.className,
          teacherName: currentExam.teacherName || state?.currentUser?.name || '',
          studentUserId: d.studentUserId || '',
          studentUsername: d.studentUsername || '',
          studentNumber: d.studentNumber || '',
          studentName: d.studentName,
          totalScore: d.totalScore || 0,
          items: d.items,
          sentAt: nowIso,
          updatedAt: nowIso,
          sentBy: state?.currentUser?.username || '',
          sentByName: state?.currentUser?.name || ''
        };
      });

      await Promise.all(
        docsToSave.map((docObj) =>
          setDoc(doc(db, donutsColName, docObj.id), sanitizeForFirestore(docObj))
        )
      );

      setSentDonuts((prev) => {
        const map = new Map<string, PusulaStudentOutcomeFeedbackDoc>();
        prev.forEach((p) => map.set(p.id, p));
        docsToSave.forEach((d) => map.set(d.id, d));
        const merged = Array.from(map.values());
        try {
          localStorage.setItem(donutsStorageKey, JSON.stringify(merged));
        } catch {
          // ignore
        }
        return merged;
      });

      setIsFeedbackModalOpen(false);
      actions?.showToast?.(
        `${docsToSave.length} öğrenciye çalışması gereken kazanımlar başarıyla gönderildi.`,
        'success'
      );
    } catch (error) {
      console.error('Error dispatching student outcomes:', error);
      actions?.showToast?.(
        'Kazanımlar gönderilirken bir hata oluştu. İnternet bağlantınızı kontrol ediniz.',
        'error'
      );
    } finally {
      setIsSendingFeedback(false);
    }
  };

  // Direct High Quality Paginated PDF Generation (max 2 A4 pages) using html-to-image & jsPDF
  const handleExportPDF = async (examOverride?: PusulaSinavAnaliziDoc) => {
    const targetExam = examOverride || currentExam;
    setIsExportingPdf(true);
    actions?.showToast?.('PDF hazırlanıyor, lütfen bekleyin...', 'info');

    try {
      // Wait for React to expand scrollable containers and reveal all charts before capturing
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 90))
      );

      const sectionEls = [
        secHeaderRef.current,
        secOutcomesRef.current,
        secScoresRef.current,
        secMatrixRef.current,
        secChartsRef.current,
        secSignaturesRef.current
      ];

      const validEls = sectionEls.filter((el): el is HTMLDivElement => Boolean(el));
      if (validEls.length === 0) return;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const marginX = 5;
      const marginY = 5;
      const sectionGap = 2.5;
      const maxRenderWidth = pdfWidth - marginX * 2;
      const maxPageHeight = pdfHeight - marginY * 2;

      type CapturedBlock = {
        dataUrl: string;
        baseWidth: number;
        baseHeight: number;
      };

      const capturedBlocks: CapturedBlock[] = [];
      for (let i = 0; i < validEls.length; i++) {
        const el = validEls[i];
        const dataUrl = await toPng(el, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          skipFonts: true,
          filter: (node) => !(node instanceof HTMLElement && node.classList.contains('print:hidden'))
        });
        const imgProps = pdf.getImageProperties(dataUrl);
        const baseWidth = maxRenderWidth;
        const baseHeight = (imgProps.height * baseWidth) / imgProps.width;
        capturedBlocks.push({ dataUrl, baseWidth, baseHeight });
      }

      const drawGroupOnCurrentPage = (group: CapturedBlock[]) => {
        if (group.length === 0) return;
        const totalGaps = Math.max(0, group.length - 1) * sectionGap;
        const totalBaseHeight = group.reduce((sum, b) => sum + b.baseHeight, 0);
        const availableHeightForContent = Math.max(10, maxPageHeight - totalGaps);
        const scale = Math.min(1, availableHeightForContent / totalBaseHeight);

        let cursorY = marginY;
        for (let i = 0; i < group.length; i++) {
          const b = group[i];
          const drawW = b.baseWidth * scale;
          const drawH = b.baseHeight * scale;
          const drawX = marginX + (maxRenderWidth - drawW) / 2;
          pdf.addImage(b.dataUrl, 'PNG', drawX, cursorY, drawW, drawH);
          cursorY += drawH + sectionGap;
        }
      };

      if (capturedBlocks.length === 1) {
        // Strictly 1 A4 page
        drawGroupOnCurrentPage(capturedBlocks);
      } else {
        // Check if everything already fits comfortably on 1 page without shrinking
        const totalAllH =
          capturedBlocks.reduce((s, b) => s + b.baseHeight, 0) +
          Math.max(0, capturedBlocks.length - 1) * sectionGap;

        if (totalAllH <= maxPageHeight) {
          drawGroupOnCurrentPage(capturedBlocks);
        } else {
          // Find optimal split index across 2 pages to maximize legibility (least downscaling on either page)
          let bestSplitIdx = Math.ceil(capturedBlocks.length / 2);
          let bestWorstRequiredHeight = Infinity;

          for (let k = 1; k < capturedBlocks.length; k++) {
            const p1 = capturedBlocks.slice(0, k);
            const p2 = capturedBlocks.slice(k);
            const h1 =
              p1.reduce((s, b) => s + b.baseHeight, 0) + Math.max(0, p1.length - 1) * sectionGap;
            const h2 =
              p2.reduce((s, b) => s + b.baseHeight, 0) + Math.max(0, p2.length - 1) * sectionGap;
            const worst = Math.max(h1, h2);
            if (worst < bestWorstRequiredHeight) {
              bestWorstRequiredHeight = worst;
              bestSplitIdx = k;
            }
          }

          const page1Blocks = capturedBlocks.slice(0, bestSplitIdx);
          const page2Blocks = capturedBlocks.slice(bestSplitIdx);

          drawGroupOnCurrentPage(page1Blocks);
          pdf.addPage();
          drawGroupOnCurrentPage(page2Blocks);
        }
      }

      const cleanSubject = (targetExam.subject || 'Ders').replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '_');
      const cleanClass = (targetExam.className || 'Sinif').replace(/[^a-zA-Z0-9]/g, '_');
      const examNoLabel = targetExam.examNumber ? `${targetExam.examNumber}_Sinav` : 'Sinav';
      const filename = `Sinav_Analizi_${cleanClass}_${cleanSubject}_${examNoLabel}.pdf`;

      pdf.save(filename);
      actions?.showToast?.('PDF başarıyla indirildi.', 'success');
    } catch (error) {
      console.error('PDF export error:', error);
      actions?.showToast?.('Yazdırma penceresi açılıyor...', 'info');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Trigger PDF export after switching exam from saved list
  useEffect(() => {
    if (!pendingPdfExportId) return;
    if (activeExamId !== pendingPdfExportId) return;
    const examToExport = savedExams[pendingPdfExportId];
    setPendingPdfExportId(null);
    if (examToExport) {
      const timer = setTimeout(() => {
        handleExportPDF(examToExport);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pendingPdfExportId, activeExamId, savedExams]);

  const handleExportSavedExamPDF = (exam: PusulaSinavAnaliziDoc) => {
    if (exam.id === activeExamId) {
      handleExportPDF(exam);
    } else {
      setActiveExamId(exam.id);
      setPendingPdfExportId(exam.id);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 animate-in fade-in duration-300">
      {/* ------------------------------------------------------------------- */}
      {/* PRINT-SPECIFIC CSS RULES (A4 1-2 Pages Compact & High Quality)     */}
      {/* ------------------------------------------------------------------- */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 6mm 6mm 6mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 8.5pt !important;
          }
          .print-hidden, header, nav, .hide-on-print, .no-print {
            display: none !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            border-radius: 6px !important;
            padding: 5px 8px !important;
            margin-bottom: 6px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-only-full {
            display: block !important;
          }
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            font-size: 7.8pt !important;
          }
          th, td {
            padding: 2.5px 3.5px !important;
            border: 1px solid #cbd5e1 !important;
          }
          th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            font-weight: bold !important;
          }
          input, select, textarea {
            border: none !important;
            background: transparent !important;
            font-weight: bold !important;
            color: #000000 !important;
            padding: 0 !important;
            font-size: inherit !important;
          }
        }
      `}</style>

      {/* Top Header & Actions (Hidden on Print) */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-purple-600/20 shrink-0">
            <FileSpreadsheet size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-black text-xs border border-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                <Award size={12} /> MEB UYUMLU SINAV ANALİZ MODÜLÜ
              </span>
              {(currentExam.academicYear || currentExam.term) && (
                <span className="text-xs font-bold text-gray-400">
                  {currentExam.academicYear} {currentExam.term ? `• ${currentExam.term}. Dönem` : ''}
                </span>
              )}
              {currentExam.isSaved && !isCurrentExamDirty && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black flex items-center gap-1">
                  <CheckCircle2 size={12} /> Kayıtlı
                </span>
              )}
              {isCurrentExamDirty && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-black">
                  Kaydedilmemiş Değişiklik
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Yazılı Sınav Değerlendirme &amp; Madde Analiz Grafikleri
            </h1>
          </div>
        </div>

        {/* Action Buttons (Single Clean Top Row) */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {!readOnly && (
            <>
              <button
                onClick={handleSaveCurrentExam}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {currentExam.isSaved ? 'Değişiklikleri Kaydet' : 'Analizi Kaydet'}
              </button>

              <button
                onClick={handleCreateNewExam}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus size={16} /> Yeni Sınav
              </button>
            </>
          )}

          {/* Direct Download PDF Button */}
          <button
            onClick={() => handleExportPDF()}
            disabled={isExportingPdf}
            className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
            title="Aktif sınav analizini PDF dosyası olarak indir"
          >
            {isExportingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isExportingPdf ? 'İndiriliyor...' : 'PDF İndir'}
          </button>
        </div>
      </div>

      {/* Saved Exam Analyses List Panel (Hidden on Print) */}
      <div className="bg-white rounded-[2rem] p-5 sm:p-6 border border-gray-200/80 shadow-sm space-y-4 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center shrink-0">
              <FolderOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-gray-900">Kayıtlı Sınav Analizleri</h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black">
                  {savedExamList.length} Kayıt
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500">
                Kaydettiğiniz sınav analizlerini buradan listeleyebilir, düzenleyebilir veya doğrudan PDF çıktısını alabilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Ders, sınıf veya öğretmen ara..."
                className="pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-purple-500 w-56"
              />
            </div>

            <select
              value={listClassFilter}
              onChange={(e) => setListClassFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 outline-none focus:bg-white focus:border-purple-500 cursor-pointer"
            >
              <option value="">Tüm Sınıflar</option>
              {Array.from(new Set(savedExamList.map((e) => e.className).filter(Boolean)))
                .sort()
                .map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {filteredSavedExams.length === 0 ? (
          <div className="p-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 text-center text-xs font-semibold text-gray-500">
            {savedExamList.length === 0
              ? 'Henüz kaydedilmiş sınav analizi bulunmuyor. Aşağıdaki formu doldurduktan sonra üstteki "Analizi Kaydet" butonuna tıklayarak kaydedebilirsiniz.'
              : 'Arama kriterlerinize uygun kayıtlı sınav analizi bulunamadı.'}
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-black border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Ders / Sınav</th>
                  <th className="py-2.5 px-3">Sınıf / Öğrenci</th>
                  <th className="py-2.5 px-3">Öğretmen</th>
                  <th className="py-2.5 px-3">Dönem / Yıl</th>
                  <th className="py-2.5 px-3 text-center">Sınıf Ort.</th>
                  <th className="py-2.5 px-3">Son Güncelleme</th>
                  <th className="py-2.5 px-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSavedExams.map((ex) => {
                  const isActive = ex.id === activeExamId;
                  const taking = (ex.students || []).filter((s) => s.status === 'girdi');
                  const avgScore =
                    taking.length > 0
                      ? taking.reduce((acc, s) => acc + (s.totalScore || 0), 0) / taking.length
                      : 0;
                  const formattedDate = ex.updatedAt
                    ? new Date(ex.updatedAt).toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : '-';

                  return (
                    <tr
                      key={ex.id}
                      className={`transition-colors ${
                        isActive ? 'bg-purple-50/70' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-gray-900">
                            {ex.subject || 'İsimsiz Sınav'}
                          </span>
                          {ex.examNumber && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black">
                              {ex.examNumber}. Sınav
                            </span>
                          )}
                          {ex.scenarioNumber && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                              Senaryo {ex.scenarioNumber}
                            </span>
                          )}
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                              Düzenleniyor
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-700">
                        {ex.className || '-'}{' '}
                        <span className="text-gray-400 font-semibold">
                          ({(ex.students || []).length} Öğr. • {(ex.questions || []).length} Soru)
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-gray-700">
                        {ex.teacherName || ex.createdByName || '-'}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-gray-600">
                        {[ex.academicYear, ex.term ? `${ex.term}. Dönem` : ''].filter(Boolean).join(' • ') || '-'}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-black border border-blue-200">
                          {avgScore.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 font-semibold whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditSavedExam(ex.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer border ${
                              isActive
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white hover:bg-purple-50 text-purple-800 border-purple-200'
                            }`}
                          >
                            <Edit3 size={13} /> {isActive ? 'Açık' : 'Düzenle'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleExportSavedExamPDF(ex)}
                            disabled={isExportingPdf}
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            title="Bu sınav analizinin PDF çıktısını indir"
                          >
                            <Download size={13} /> PDF
                          </button>

                          {!readOnly && (
                            <button
                              type="button"
                              onClick={() => handleDeleteSavedExam(ex)}
                              className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-gray-400 hover:text-rose-600 border border-gray-200 hover:border-rose-200 transition-all cursor-pointer"
                              title="Kayıtlı sınav analizini sil"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Main Container for Editing, Printing & PDF Generation */}
      <div ref={editorTopRef} className="space-y-5">
        <div ref={reportContainerRef} className="space-y-5 bg-white p-2 rounded-2xl">
          {/* 1. EXAM AND INSTITUTION HEADER */}
          <div ref={secHeaderRef} className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-4 print:p-3 print:rounded-lg print:border-gray-300 print-card">
            <div className="text-center border-b border-gray-100 pb-2.5 print:pb-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase print:text-[13pt]">
                T.C. MİLLÎ EĞİTİM BAKANLIĞI — YAZILI SINAV ANALİZ RAPORU
              </h2>
              <p className="text-xs font-bold text-gray-500 mt-0.5 print:text-[8pt]">
                {currentExam.schoolName ? `${currentExam.schoolName} • ` : ''}Öğrenme Çıktıları, Süreç Bileşenleri ve Madde Başarı Analizi
              </p>
            </div>

            {/* Header Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs font-bold print:grid-cols-3 print:gap-1.5 print:text-[8pt]">
              {/* Column 1 */}
              <div className="space-y-1.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 print:bg-white print:p-1.5 print:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">OKUL ADI:</span>
                  <input
                    type="text"
                    disabled={readOnly}
                    value={currentExam.schoolName}
                    placeholder="Okul adı..."
                    onChange={(e) => handleUpdateExam({ schoolName: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0 disabled:opacity-80"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">ÖĞRETİM YILI:</span>
                  <input
                    type="text"
                    disabled={readOnly}
                    value={currentExam.academicYear}
                    placeholder="Örn: 2025-2026"
                    onChange={(e) => handleUpdateExam({ academicYear: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0 disabled:opacity-80"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">DÖNEM:</span>
                  <select
                    disabled={readOnly}
                    value={currentExam.term || ''}
                    onChange={(e) => handleUpdateExam({ term: e.target.value as any })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 cursor-pointer print:border-0 disabled:opacity-80"
                  >
                    <option value="">Seçiniz</option>
                    <option value="1">1. Dönem</option>
                    <option value="2">2. Dönem</option>
                  </select>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-1.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 print:bg-white print:p-1.5 print:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">DERS ADI:</span>
                  <input
                    type="text"
                    disabled={readOnly}
                    value={currentExam.subject}
                    placeholder="Ders adı..."
                    onChange={(e) => handleUpdateExam({ subject: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0 disabled:opacity-80"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SINIF / ŞUBE:</span>
                  <select
                    disabled={readOnly}
                    value={
                      (currentExam.className &&
                        Object.keys(classes).find(k => k.replace('_', '/') === currentExam.className || k === currentExam.className)) ||
                      currentExam.className ||
                      ''
                    }
                    onChange={(e) => handleSelectClassAndLoadStudents(e.target.value)}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 cursor-pointer print:border-0 disabled:opacity-80"
                  >
                    <option value="">Sınıf Seçiniz</option>
                    {Object.keys(classes).sort().map((clsKey) => (
                      <option key={clsKey} value={clsKey}>
                        {clsKey.replace('_', '/')} ({classes[clsKey]?.length || 0} Öğrenci)
                      </option>
                    ))}
                    {currentExam.className &&
                      !Object.keys(classes).some(k => k.replace('_', '/') === currentExam.className || k === currentExam.className) && (
                        <option value={currentExam.className}>{currentExam.className}</option>
                      )}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">DERS ÖĞRETMENİ:</span>
                  <input
                    type="text"
                    disabled={readOnly}
                    value={currentExam.teacherName}
                    placeholder="Ders öğretmeni..."
                    onChange={(e) => handleUpdateExam({ teacherName: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0 disabled:opacity-80"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-1.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 print:bg-white print:p-1.5 print:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SINAV NO:</span>
                  <select
                    disabled={readOnly}
                    value={currentExam.examNumber || ''}
                    onChange={(e) => handleUpdateExam({ examNumber: (e.target.value ? parseInt(e.target.value, 10) : '') as any })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 cursor-pointer print:border-0 disabled:opacity-80"
                  >
                    <option value="">Seçiniz</option>
                    <option value={1}>1. Sınav</option>
                    <option value={2}>2. Sınav</option>
                    <option value={3}>3. Sınav</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SENARYO NO:</span>
                  <input
                    type="text"
                    disabled={readOnly}
                    value={currentExam.scenarioNumber}
                    placeholder="Senaryo no..."
                    onChange={(e) => handleUpdateExam({ scenarioNumber: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0 disabled:opacity-80"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SORU SAYISI:</span>
                  <div className="flex items-center gap-1.5 justify-end">
                    <input
                      type="number"
                      disabled={readOnly}
                      min={0}
                      max={20}
                      placeholder={currentExam.questions.length > 0 ? String(currentExam.questions.length) : '0'}
                      value={currentExam.questionCount > 0 ? currentExam.questionCount : ''}
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === '') {
                          handleUpdateExam({ questionCount: 0 });
                        } else {
                          handleQuestionCountChange(parseInt(raw, 10) || 0);
                        }
                      }}
                      className="bg-white border border-gray-200 px-2 py-0.5 rounded-lg text-gray-900 font-bold w-14 text-center outline-none focus:border-purple-500 print:w-auto print:border-0 disabled:opacity-80"
                    />
                    <span className="text-[11px] text-gray-400 print:text-gray-600">Soru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* 1.5 SENARYO ÖĞRENME ÇIKTILARI & SORU PUAN DEĞERLERİ GİRİŞ TABLOSU  */}
          {/* ----------------------------------------------------------------- */}
          {(() => {
            const entryRowCount = currentExam.questionCount > 0
              ? Math.max(currentExam.questionCount, currentExam.questions.length)
              : Math.max(10, currentExam.questions.length);

            return (
              <div ref={secOutcomesRef} className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-3 print:p-3 print:rounded-lg print-card print-only-full">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 print:text-xs">
                      <Layers className="text-purple-600" size={18} />
                      Öğrenme Çıktıları / Süreç Bileşenleri ve Soru Puan Değerleri
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-0.5 print:hidden">
                      Soruların ilgili kazanımlarını ve puan değerlerini aşağıya giriniz. Eklediğiniz veriler analiz sayfasına ve not çizelgesine otomatik aktarılır.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-black border ${
                        stats.totalExamMax === 100
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : stats.totalExamMax > 0
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}
                    >
                      Toplam: {stats.totalExamMax} / 100 Puan
                    </span>

                    {!readOnly && entryRowCount < 20 && (
                      <button
                        type="button"
                        onClick={() => handleQuestionCountChange(entryRowCount + 1)}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-black transition-all flex items-center gap-1 cursor-pointer print:hidden"
                      >
                        <Plus size={14} /> Soru Satırı Ekle
                      </button>
                    )}

                    {!readOnly && entryRowCount > 1 && (
                      <button
                        type="button"
                        onClick={() => handleQuestionCountChange(entryRowCount - 1)}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black transition-all flex items-center gap-1 cursor-pointer print:hidden"
                        title="Son soru satırını sil"
                      >
                        <Minus size={14} /> Soru Satırı Sil
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto border-2 border-slate-800 rounded-2xl">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-sky-100/90 text-slate-900 font-black text-center border-b-2 border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3 w-20 border-r border-slate-400 whitespace-nowrap">
                          Soru No
                        </th>
                        <th className="py-2.5 px-4 border-r border-slate-400 leading-snug">
                          DERSİNİZ için yayınlanmış olan Senaryolardan seçtiğiniz Öğrenme Çıktıları / Süreç Bileşenlerini aşağıya ekleyiniz
                        </th>
                        <th className="py-2.5 px-3 w-36 whitespace-nowrap">
                          Soru Puan Değeri
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300 bg-white">
                      {Array.from({ length: entryRowCount }, (_, idx) => {
                        const qNum = idx + 1;
                        const existingQ = currentExam.questions.find(q => q.questionNumber === qNum);
                        const outcomeVal = existingQ?.outcome || '';
                        const maxScoreVal = existingQ?.maxScore || 0;

                        return (
                          <tr key={qNum} className="hover:bg-purple-50/30 transition-colors">
                            <td className="py-1.5 px-3 text-center font-black text-slate-900 bg-slate-200/70 border-r border-slate-300">
                              {qNum}
                            </td>
                            <td className="p-1 border-r border-slate-300">
                              <input
                                type="text"
                                disabled={readOnly}
                                value={outcomeVal}
                                placeholder={`${qNum}. sorunun öğrenme çıktısını / kazanımını giriniz...`}
                                onChange={(e) => handleQuestionOutcomeChange(qNum, e.target.value)}
                                className="w-full bg-transparent px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-200 focus:border-purple-500 focus:bg-white outline-none text-xs font-semibold text-gray-800 placeholder:text-gray-300 disabled:opacity-80"
                              />
                            </td>
                            <td className="p-1 text-center">
                              <input
                                type="number"
                                disabled={readOnly}
                                min={0}
                                max={100}
                                placeholder=""
                                value={maxScoreVal > 0 ? maxScoreVal : ''}
                                onChange={(e) => handleQuestionMaxScoreChange(qNum, e.target.value)}
                                className="w-24 mx-auto bg-gray-50/80 border border-gray-200 px-2 py-1 rounded-lg text-center font-black text-slate-900 outline-none focus:bg-white focus:border-purple-500 disabled:opacity-80"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-yellow-300 border-t-2 border-slate-800 text-slate-950 font-black">
                        <td colSpan={2} className="py-2 px-4 text-right text-sm border-r border-slate-500">
                          Puan Toplamı
                        </td>
                        <td className="py-2 px-3 text-center text-base font-black">
                          {stats.totalExamMax}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* ----------------------------------------------------------------- */}
          {/* 1.6 ÖĞRENCİLERİN SORULARA VERDİĞİ CEVAPLARIN PUAN DEĞERLERİ        */}
          {/* ----------------------------------------------------------------- */}
          <div ref={secScoresRef} className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-3 print:p-3 print:rounded-lg print-card print-only-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight uppercase flex items-center gap-2 print:text-xs">
                  <Users className="text-purple-600 shrink-0" size={18} />
                  ÖĞRENCİLERİN SORULARA VERDİĞİ CEVAPLARIN PUAN DEĞERLERİ
                </h3>
                <div className="flex items-center flex-wrap gap-3 mt-1 text-[11px] font-bold text-gray-500 print:text-[7pt]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#92D050] border border-slate-400 inline-block"></span>
                    ≥%60 (Soru) / ≥60 Puan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#FCD5B4] border border-slate-400 inline-block"></span>
                    %50-59 (Soru) / 50-59 Puan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-200 border border-slate-400 inline-block"></span>
                    &lt;50 Puan (Toplam)
                  </span>
                </div>
              </div>

              {!readOnly && (
                <div className="flex items-center gap-2 flex-wrap print:hidden">
                  <div className="flex items-center gap-1.5 bg-purple-50/90 border border-purple-200 py-1 px-3 rounded-xl">
                    <span className="text-xs font-black text-purple-900 whitespace-nowrap">Sınıf:</span>
                    <select
                      value={
                        (currentExam.className &&
                          Object.keys(classes).find(k => k.replace('_', '/') === currentExam.className || k === currentExam.className)) ||
                        currentExam.className ||
                        ''
                      }
                      onChange={(e) => handleSelectClassAndLoadStudents(e.target.value)}
                      className="bg-white border border-purple-300 text-purple-950 font-black text-xs px-2.5 py-1 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Sınıf Seçiniz</option>
                      {Object.keys(classes).sort().map((clsKey) => (
                        <option key={clsKey} value={clsKey}>
                          {clsKey.replace('_', '/')} ({classes[clsKey]?.length || 0} Öğrenci)
                        </option>
                      ))}
                      {currentExam.className &&
                        !Object.keys(classes).some(k => k.replace('_', '/') === currentExam.className || k === currentExam.className) && (
                          <option value={currentExam.className}>{currentExam.className}</option>
                        )}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddStudentRow}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer border border-gray-200"
                  >
                    <Plus size={14} /> Manuel Ekle
                  </button>
                </div>
              )}
            </div>

            {currentExam.questions.length === 0 && (
              <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold print:hidden">
                Soru sütunları (1, 2, 3...) yukarıdaki tabloya soru puanı/kazanımı eklediğinizde veya üstteki Soru Sayısı alanını doldurduğunuzda otomatik oluşacaktır.
              </div>
            )}

            <div className={`overflow-x-auto border-2 border-slate-800 rounded-2xl ${isExportingPdf ? '' : 'max-h-[540px] overflow-y-auto'} print:max-h-none print:overflow-visible print:border-0`}>
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-200 text-slate-900 font-black sticky top-0 z-10 text-center border-b-2 border-slate-800">
                  <tr>
                    <th className="py-2 px-2 w-12 border-r border-slate-400">SIRA</th>
                    <th className="py-2 px-2 w-14 border-r border-slate-400">NO</th>
                    <th className="py-2 px-3 text-left min-w-[180px] border-r border-slate-400">AD SOYAD</th>
                    <th className="py-2 px-2 w-24 border-r border-slate-400 leading-tight">SINAV<br />DURUM</th>
                    {currentExam.questions.map((q) => (
                      <th
                        key={q.questionNumber}
                        className="py-1.5 px-1.5 min-w-[46px] border-r border-slate-400"
                        title={q.outcome || `${q.questionNumber}. Soru`}
                      >
                        <div>{q.questionNumber}</div>
                        {q.maxScore > 0 && (
                          <div className="text-[9px] font-bold text-slate-600">({q.maxScore}P)</div>
                        )}
                      </th>
                    ))}
                    <th className="py-2 px-2.5 w-16 bg-slate-300 border-l border-slate-500">PUANI</th>
                    {!readOnly && <th className="py-2 px-1 w-8 print:hidden"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 bg-white">
                  {currentExam.students.length === 0 ? (
                    <tr>
                      <td colSpan={currentExam.questions.length + (readOnly ? 5 : 6)} className="p-8 text-center text-gray-400 font-semibold">
                        Henüz sınıf listesi yüklenmedi. Üstten veya sağ üstteki <strong>"Sınıf"</strong> menüsünden sınıf seçtiğinizde öğrenci listesi otomatik gelecektir.
                      </td>
                    </tr>
                  ) : (
                    currentExam.students.map((st, idx) => {
                      const hasEnteredScores = Object.keys(st.scores || {}).length > 0;
                      const totalCellClass = getTotalScoreCellClass(st.totalScore, hasEnteredScores, st.status);

                      return (
                        <tr key={st.id} className="hover:brightness-95 transition-all">
                          <td className="py-1 px-2 text-center font-black text-slate-800 bg-slate-200/70 border-r border-slate-300">
                            {idx + 1}
                          </td>
                          <td className="p-0.5 border-r border-slate-300 bg-white">
                            <input
                              type="text"
                              disabled={readOnly}
                              placeholder="-"
                              value={st.studentNumber}
                              onChange={(e) => {
                                const updated = currentExam.students.map(s => s.id === st.id ? { ...s, studentNumber: e.target.value } : s);
                                handleUpdateExam({ students: updated });
                              }}
                              className="w-full text-center bg-transparent py-1 font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-slate-50 rounded"
                            />
                          </td>
                          <td className="p-0.5 border-r border-slate-300 bg-white">
                            <input
                              type="text"
                              disabled={readOnly}
                              value={st.studentName}
                              onChange={(e) => {
                                const updated = currentExam.students.map(s => s.id === st.id ? { ...s, studentName: e.target.value } : s);
                                handleUpdateExam({ students: updated });
                              }}
                              className="w-full bg-transparent px-2 py-1 font-bold text-slate-900 outline-none focus:bg-slate-50 rounded"
                            />
                          </td>
                          <td className="p-0.5 text-center border-r border-slate-300 bg-white">
                            <select
                              disabled={readOnly}
                              value={st.status}
                              onChange={(e) => {
                                const updated = currentExam.students.map(s => s.id === st.id ? { ...s, status: e.target.value as any } : s);
                                handleUpdateExam({ students: updated });
                              }}
                              className={`w-full py-1 px-1 text-[11px] font-bold outline-none cursor-pointer rounded text-center ${
                                st.status === 'girmedi'
                                  ? 'bg-amber-50 text-amber-800'
                                  : st.status === 'kopya'
                                  ? 'bg-rose-50 text-rose-700'
                                  : 'bg-transparent text-slate-700'
                              }`}
                            >
                              <option value="girdi">Girdi</option>
                              <option value="girmedi">Girmedi</option>
                              <option value="kopya">Kopya</option>
                            </select>
                          </td>

                          {currentExam.questions.map((q) => {
                            const val = st.scores[q.questionNumber];
                            const cellClass = getQuestionScoreCellClass(val, q.maxScore, st.status);

                            return (
                              <td
                                key={q.questionNumber}
                                className={`p-0 border-r border-slate-300 text-center transition-colors ${cellClass}`}
                              >
                                <input
                                  type="number"
                                  disabled={readOnly || st.status !== 'girdi'}
                                  min={0}
                                  max={q.maxScore > 0 ? q.maxScore : 100}
                                  value={val !== undefined ? val : ''}
                                  onChange={(e) => handleScoreChange(st.id, q.questionNumber, e.target.value)}
                                  className="w-full min-w-[44px] h-full text-center py-1.5 px-1 bg-transparent outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 [font-weight:inherit]"
                                />
                              </td>
                            );
                          })}

                          <td className={`py-1 px-2 text-center font-mono text-xs border-l border-slate-500 transition-colors ${totalCellClass}`}>
                            {st.status === 'girdi' ? st.totalScore : st.status === 'girmedi' ? 'G' : 'K'}
                          </td>

                          {!readOnly && (
                            <td className="p-0.5 text-center bg-white print:hidden">
                              <button
                                type="button"
                                onClick={() => handleDeleteStudentRow(st.id)}
                                className="p-1 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Öğrenciyi sil"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {!readOnly && (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100 print:hidden">
                <div className="text-xs font-semibold text-gray-500 flex items-center flex-wrap gap-2">
                  <span>
                    Başarı oranı %60&apos;ın altında kalan sorular ilgili öğrencinin eksik kazanımı olarak otomatik belirlenir.
                    {studentsWithWeakOutcomesCount > 0 && (
                      <strong className="text-purple-800 ml-1">
                        ({studentsWithWeakOutcomesCount} öğrencide eksik kazanım tespit edildi)
                      </strong>
                    )}
                  </span>
                  {feedbackStudySummary.totalSentStudents > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black">
                      <CheckCircle2 size={12} />
                      {feedbackStudySummary.totalSentStudents} öğrenciye gönderildi • {feedbackStudySummary.totalStudiedItems}/{feedbackStudySummary.totalSentItems} kazanım tekrar çalışıldı
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleOpenSendOutcomesModal}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-md shadow-purple-200/70 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send size={14} />
                  Öğrencilere Çalışması Gereken Kazanımları Gönder
                </button>
              </div>
            )}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* 1.7 SINAVA-SINIFA ÖĞRETMENİN YORUMU & SENARYO SORU ANALİZ MATRİSİ */}
          {/* ----------------------------------------------------------------- */}
          {(() => {
            const matrixColCount = Math.max(
              10,
              currentExam.questionCount || 0,
              currentExam.questions.length
            );
            const scenarioQuestionCount = currentExam.questionCount > 0
              ? currentExam.questionCount
              : currentExam.questions.length;
            const formatTrDec = (v: number) => v.toFixed(1).replace('.', ',');

            return (
              <div ref={secMatrixRef} className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-3 print:p-3 print:rounded-lg print-card">
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-red-600 underline uppercase tracking-wide print:text-[8.5pt]">
                    SINAVA-SINIFA ÖĞRETMENİN YORUMU:
                  </div>
                  <div className="border-2 border-slate-800 bg-[#DDD9C4]/55 rounded-xl overflow-hidden">
                    <textarea
                      rows={3}
                      disabled={readOnly}
                      value={currentExam.teacherComment}
                      onChange={(e) => handleUpdateExam({ teacherComment: e.target.value })}
                      placeholder="Öğretmenim, bu sınıfa uyguladığınız sınavla ilgili görüşünüzü rapor niteliğinde bu alana yazabilirsiniz.&#10;Kolay Gelsin&#10;Saygılar"
                      className="w-full bg-transparent p-3 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-600 outline-none resize-y disabled:opacity-85"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border-2 border-slate-800 rounded-xl">
                  <table className="w-full text-[11px] border-collapse">
                    <tbody>
                      {/* Scenario Info Top Row */}
                      {(() => {
                        const totalCols = matrixColCount + 2;
                        const leftLabelSpan = 3;
                        const rightLabelSpan = 3;
                        const scenarioValSpan = Math.max(1, Math.floor((totalCols - leftLabelSpan - rightLabelSpan) / 2));
                        const countValSpan = Math.max(1, totalCols - leftLabelSpan - rightLabelSpan - scenarioValSpan);
                        return (
                          <tr className="border-b-2 border-slate-800 font-black text-slate-900 text-center">
                            <td
                              colSpan={leftLabelSpan}
                              className="py-2 px-3 bg-slate-200 border-r border-slate-400 text-xs"
                            >
                              KONU SORU DAĞILIM TABLOSUNDA SEÇİLEN SENARYO NUMARASI
                            </td>
                            <td
                              colSpan={scenarioValSpan}
                              className="py-2 px-3 bg-[#FFC000] border-r border-slate-400 text-sm"
                            >
                              {currentExam.scenarioNumber || '-'}
                            </td>
                            <td
                              colSpan={rightLabelSpan}
                              className="py-2 px-3 bg-slate-200 border-r border-slate-400 text-xs"
                            >
                              SENARYO SORU SAYISI
                            </td>
                            <td
                              colSpan={countValSpan}
                              className="py-2 px-3 bg-[#FFC000] text-sm"
                            >
                              {scenarioQuestionCount}
                            </td>
                          </tr>
                        );
                      })()}

                      {/* Questions Header Row */}
                      <tr className="border-b border-slate-400 bg-slate-200/80 font-black text-slate-900 text-center">
                        <td className="py-1.5 px-3 border-r border-slate-400 min-w-[230px]">
                          SORULAR
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => (
                          <td
                            key={`hdr-${idx + 1}`}
                            className="py-1.5 px-1.5 min-w-[54px] border-r border-slate-400"
                          >
                            {idx + 1}
                          </td>
                        ))}
                        <td
                          rowSpan={3}
                          className="py-2 px-2 w-16 bg-slate-200 border-l-2 border-slate-800 font-black text-center align-middle"
                        >
                          <div
                            className="mx-auto flex items-center justify-center whitespace-nowrap font-black tracking-wide"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            TOPLAM / ORTALAMA
                          </div>
                        </td>
                      </tr>

                      {/* Merged Left Label + Subheader */}
                      <tr className="border-b border-slate-400 bg-white font-black text-slate-900 text-center">
                        <td
                          rowSpan={2}
                          className="py-3 px-3 bg-slate-200/70 border-r border-slate-400 align-middle text-xs leading-relaxed"
                        >
                          <div>KONU</div>
                          <div className="font-bold text-[11px] mt-0.5">
                            Öğrenme Çıktıları / Süreç Bileşenleri
                          </div>
                        </td>
                        <td
                          colSpan={matrixColCount}
                          className="py-1.5 px-3 border-r border-slate-400 bg-white text-xs font-black"
                        >
                          Öğrenme Çıktıları ve Süreç Bileşenleri
                        </td>
                      </tr>

                      {/* Vertical Rotated Learning Outcomes Row */}
                      <tr className="border-b-2 border-slate-800 bg-white">
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          const outcomeText = qStat?.outcome || '';
                          return (
                            <td
                              key={`out-${qNum}`}
                              className="p-1.5 border-r border-slate-400 h-44 align-bottom text-center"
                              title={outcomeText}
                            >
                              {outcomeText && (
                                <div
                                  className="mx-auto max-h-40 overflow-hidden text-[10px] font-semibold text-slate-800 leading-tight text-left"
                                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                >
                                  {outcomeText}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {/* PUAN DEĞERLERİ Row */}
                      <tr className="border-b border-slate-400 font-black text-slate-900">
                        <td className="py-1.5 px-3 bg-[#FFC000] border-r border-slate-400 text-left">
                          PUAN DEĞERLERİ
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          return (
                            <td
                              key={`pts-${qNum}`}
                              className="py-1.5 px-1 bg-[#FFC000] border-r border-slate-400 text-center"
                            >
                              {qStat && qStat.maxScore > 0 ? qStat.maxScore : ''}
                            </td>
                          );
                        })}
                        <td className="py-1.5 px-2 bg-slate-100 border-l-2 border-slate-800 text-center font-black">
                          {formatTrDec(stats.totalExamMax)}
                        </td>
                      </tr>

                      {/* SORUYA CEVAP VEREN ÖĞRENCİ SAYISI Row */}
                      <tr className="border-b border-slate-400 font-black text-slate-900 bg-[#D8E4BC]">
                        <td className="py-1.5 px-3 border-r border-slate-400 text-left text-[10px]">
                          SORUYA CEVAP VEREN ÖĞRENCİ SAYISI:
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          return (
                            <td
                              key={`ans-${qNum}`}
                              className="py-1.5 px-1 border-r border-slate-400 text-center"
                            >
                              {qStat ? qStat.answeredCount : ''}
                            </td>
                          );
                        })}
                        <td className="py-1.5 px-2 border-l-2 border-slate-800 text-center">
                          {stats.questionStats.length > 0 ? formatTrDec(stats.avgAnsweredCount) : '0,0'}
                        </td>
                      </tr>

                      {/* SORUYA CEVAP VERMEYEN ÖĞRENCİ SAYISI Row */}
                      <tr className="border-b border-slate-400 font-black text-slate-900 bg-[#D9E1F2]">
                        <td className="py-1.5 px-3 border-r border-slate-400 text-left text-[10px]">
                          SORUYA CEVAP VERMEYEN ÖĞRENCİ SAYISI:
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          return (
                            <td
                              key={`unans-${qNum}`}
                              className="py-1.5 px-1 border-r border-slate-400 text-center"
                            >
                              {qStat ? qStat.unansweredCount : ''}
                            </td>
                          );
                        })}
                        <td className="py-1.5 px-2 border-l-2 border-slate-800 text-center">
                          {stats.questionStats.length > 0 ? formatTrDec(stats.avgUnansweredCount) : '0,0'}
                        </td>
                      </tr>

                      {/* SORUNUN CEVAPLANMA YÜZDESİ Row */}
                      <tr className="border-b border-slate-400 font-black text-slate-900 bg-[#D8E4BC]">
                        <td className="py-1.5 px-3 border-r border-slate-400 text-left text-[10px]">
                          SORUNUN CEVAPLANMA YÜZDESİ:
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          return (
                            <td
                              key={`pct-${qNum}`}
                              className="py-1.5 px-1 border-r border-slate-400 text-center"
                            >
                              {qStat ? formatTrDec(qStat.answeredPercent) : ''}
                            </td>
                          );
                        })}
                        <td className="py-1.5 px-2 border-l-2 border-slate-800 text-center">
                          {stats.questionStats.length > 0 ? formatTrDec(stats.avgAnsweredPercent) : '0,0'}
                        </td>
                      </tr>

                      {/* SORUDAN ALINAN ORT. PUAN Row */}
                      <tr className="border-b border-slate-400 font-black text-slate-900 bg-[#D9E1F2]">
                        <td className="py-1.5 px-3 border-r border-slate-400 text-left text-[10px]">
                          SORUDAN ALINAN ORT. PUAN:
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          return (
                            <td
                              key={`avg-${qNum}`}
                              className="py-1.5 px-1 border-r border-slate-400 text-center"
                            >
                              {qStat ? formatTrDec(qStat.qAvg) : ''}
                            </td>
                          );
                        })}
                        <td className="py-1.5 px-2 border-l-2 border-slate-800 text-center">
                          {stats.questionStats.length > 0 ? formatTrDec(stats.avgQuestionScore) : '0,0'}
                        </td>
                      </tr>

                      {/* KONU ANALİZİ Row */}
                      <tr className="font-bold text-slate-900 bg-[#FDE9D9]">
                        <td className="py-2.5 px-3 border-r border-slate-400 text-right font-black text-xs">
                          KONU ANALİZİ
                        </td>
                        {Array.from({ length: matrixColCount }, (_, idx) => {
                          const qNum = idx + 1;
                          const qStat = stats.questionStats.find(q => q.questionNumber === qNum);
                          const showStatus = qStat && qStat.answeredCount > 0;
                          return (
                            <td
                              key={`ana-${qNum}`}
                              className="py-2 px-1 border-r border-slate-400 text-center text-[10px] leading-tight align-middle font-bold"
                            >
                              {showStatus ? qStat.statusLabel : ''}
                            </td>
                          );
                        })}
                        <td className="py-2 px-2 border-l-2 border-slate-800 text-center"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* ----------------------------------------------------------------- */}
          {/* 2. STATISTICAL SUMMARY & VISUAL CHARTS SECTION (GRAFİKLER)         */}
          {/* ----------------------------------------------------------------- */}
          <div ref={secChartsRef} className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-4 print:p-3 print:rounded-lg print-card">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 flex-wrap gap-2 print:pb-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 print:text-xs">
                <BarChart3 className="text-purple-600" size={18} />
                Sınav Başarı İstatistikleri ve Görsel Analiz Grafikleri
              </h3>

              {/* Chart Switcher Buttons (Web Only) */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold print:hidden">
                <button
                  onClick={() => setActiveChartTab('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'all' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  🌟 Tüm Grafikler
                </button>
                <button
                  onClick={() => setActiveChartTab('questions')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'questions' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  📊 Soru Başarı Grafiği
                </button>
                <button
                  onClick={() => setActiveChartTab('distribution')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'distribution' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  🍩 Not Dağılımı (Dilim)
                </button>
                <button
                  onClick={() => setActiveChartTab('histogram')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'histogram' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  📈 Puan Histogramı
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs print:grid-cols-6 print:gap-1.5">
              <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 text-center print:border-gray-200 print:p-1">
                <div className="text-gray-400 font-bold text-[9px] uppercase">Giren Öğrenci</div>
                <div className="text-base font-black text-gray-900 mt-0.5 print:text-[10pt]">{stats.takingExamCount} / {stats.totalStudents}</div>
              </div>

              <div className="p-2.5 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-center print:border-gray-200 print:p-1">
                <div className="text-emerald-700 font-bold text-[9px] uppercase">Başarılı (≥50)</div>
                <div className="text-base font-black text-emerald-800 mt-0.5 print:text-[10pt]">{stats.successfulCount} (%{stats.successRate.toFixed(0)})</div>
              </div>

              <div className="p-2.5 bg-rose-50/80 rounded-2xl border border-rose-100 text-center print:border-gray-200 print:p-1">
                <div className="text-rose-700 font-bold text-[9px] uppercase">Başarısız (&lt;50)</div>
                <div className="text-base font-black text-rose-800 mt-0.5 print:text-[10pt]">{stats.unsuccessfulCount}</div>
              </div>

              <div className="p-2.5 bg-blue-50/80 rounded-2xl border border-blue-100 text-center print:border-gray-200 print:p-1">
                <div className="text-blue-700 font-bold text-[9px] uppercase">Aritmetik Ort.</div>
                <div className="text-base font-black text-blue-900 mt-0.5 print:text-[10pt]">{stats.mean.toFixed(1)} Puan</div>
              </div>

              <div className="p-2.5 bg-indigo-50/80 rounded-2xl border border-indigo-100 text-center print:border-gray-200 print:p-1">
                <div className="text-indigo-700 font-bold text-[9px] uppercase">Medyan (Ortanca)</div>
                <div className="text-base font-black text-indigo-900 mt-0.5 print:text-[10pt]">{stats.median.toFixed(1)}</div>
              </div>

              <div className="p-2.5 bg-teal-50/80 rounded-2xl border border-teal-100 text-center print:border-gray-200 print:p-1">
                <div className="text-teal-700 font-bold text-[9px] uppercase">Standart Sapma</div>
                <div className="text-base font-black text-teal-900 mt-0.5 print:text-[10pt]">{stats.stdDev.toFixed(1)}</div>
              </div>
            </div>

            {/* VISUAL CHARTS SECTION (Rich Interactive & High-res Printable) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1 print:grid-cols-12 print:gap-2">
              {/* Left/Main: Soru ve Kazanım Başarı Grafiği (Bar Chart) */}
              <div className={`${!isExportingPdf && (activeChartTab === 'distribution' || activeChartTab === 'histogram') ? 'hidden print:block' : ''} lg:col-span-7 bg-slate-50/80 p-4 rounded-3xl border border-slate-200 space-y-3 print:col-span-7 print:p-2 print:bg-white print:border-gray-300`}>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 print:text-[8pt]">
                    <TrendingUp size={14} className="text-purple-600" />
                    Soru Bazlı Sınıf Başarı Oranları (%)
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold print:text-[7pt]">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ≥%60 İyi
                    </span>
                    <span className="flex items-center gap-1 text-amber-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span> %40-59 Geri Bildirim
                    </span>
                    <span className="flex items-center gap-1 text-rose-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span> &lt;%40 Telafi
                    </span>
                  </div>
                </div>

                {/* Bar Chart Canvas / SVG */}
                <div className="h-36 sm:h-40 flex items-end justify-between gap-1.5 pt-4 pb-1.5 px-2 bg-white rounded-2xl border border-slate-200/80 relative print:h-28 print:rounded-lg print:border-gray-200">
                  {stats.questionStats.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-400 text-center px-4">
                      Soru sayısı ve öğrenci puanları girildiğinde soru bazlı başarı grafiği burada görüntülenecektir.
                    </div>
                  ) : (
                    <>
                      {/* 50% Threshold Guideline */}
                      <div className="absolute left-0 right-0 top-1/2 border-b border-dashed border-slate-300 pointer-events-none flex items-center justify-end pr-2">
                        <span className="text-[8px] font-black text-slate-400 bg-white/90 px-1 rounded print:text-[6pt]">%50 Geçme Eşiği</span>
                      </div>

                      {stats.questionStats.map((q) => {
                        const barHeight = Math.max(6, Math.min(100, q.qSuccessRatio));
                        return (
                          <div key={q.questionNumber} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                            {/* Tooltip on Hover (Web Only) */}
                            <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-20 pointer-events-none print:hidden">
                              <div className="bg-slate-900 text-white p-2 rounded-xl text-[10px] font-bold whitespace-nowrap shadow-xl border border-slate-700">
                                <div>Soru {q.questionNumber}: %{q.qSuccessRatio.toFixed(1)}</div>
                                <div className="text-slate-300 font-normal">Ortalama: {q.qAvg.toFixed(1)} / {q.maxScore} Puan</div>
                                <div className="text-amber-300 text-[9px] max-w-xs truncate">{q.outcome}</div>
                              </div>
                              <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
                            </div>

                            {/* Percentage Label */}
                            <span className="text-[9px] font-black text-slate-700 mb-0.5 group-hover:text-purple-600 transition-colors print:text-[6.5pt]">
                              %{q.qSuccessRatio.toFixed(0)}
                            </span>

                            {/* Bar Fill */}
                            <div className="w-full max-w-[28px] bg-slate-100 rounded-t-md overflow-hidden flex flex-col justify-end h-full print:border print:border-slate-200">
                              <div 
                                className={`w-full rounded-t-md transition-all duration-700 ${q.barColor} group-hover:brightness-110 shadow-2xs`}
                                style={{ height: `${barHeight}%` }}
                              />
                            </div>

                            {/* X Label */}
                            <span className="text-[9px] font-black text-slate-500 mt-1 print:text-[7pt]">
                              S.{q.questionNumber}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              {/* Right: Not Dağılımı ve Donut Dilim Grafiği (5 cols) */}
              <div className={`${!isExportingPdf && activeChartTab === 'questions' ? 'hidden print:block' : ''} lg:col-span-5 bg-purple-50/40 p-4 rounded-3xl border border-purple-100 space-y-3 print:col-span-5 print:p-2 print:bg-white print:border-gray-300`}>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5 print:text-[8pt]">
                    <PieChart size={14} className="text-purple-600" />
                    Not &amp; Puan Dağılımı
                  </div>
                  <span className="text-[9px] font-black text-purple-700 bg-white px-2 py-0.5 rounded-md border border-purple-200 print:text-[7pt]">
                    {stats.takingExamCount} Öğrenci
                  </span>
                </div>

                {/* Score Brackets Horizontal Progress Bars */}
                <div className="space-y-1.5 text-xs font-bold print:space-y-1 print:text-[7.5pt]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">85-100 (Pekiyi):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist85_100 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-emerald-700">{stats.dist85_100}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">70-84 (İyi):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist70_84 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-blue-700">{stats.dist70_84}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">60-69 (Orta):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist60_69 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-indigo-700">{stats.dist60_69}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">50-59 (Geçer):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist50_59 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-amber-700">{stats.dist50_59}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">0-49 (Başarısız):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist0_49 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-rose-700">{stats.dist0_49}</span>
                  </div>
                </div>

                {/* Sınav Güçlüğü Skalası */}
                <div className="p-2.5 bg-white rounded-2xl border border-purple-100 text-center space-y-0.5 print:p-1 print:border-gray-200">
                  <div className="text-[9px] font-bold text-gray-400 uppercase print:text-[6.5pt]">Sınav Güçlük ve Ayırt Edicilik Düzeyi</div>
                  <div className="text-xs font-black text-purple-900 uppercase print:text-[8pt]">
                    {stats.difficultyTitle}
                  </div>
                  <div className="text-[9.5px] text-gray-500 print:text-[7pt]">
                    Çarpıklık Katsayısı: <strong>{stats.skewness.toFixed(2)}</strong> • Ranj: <strong>{stats.range}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Histogram View (When Histogram tab is selected or in comprehensive report) */}
            {activeChartTab === 'histogram' && (
              <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2 animate-in fade-in duration-200 print:hidden">
                <div className="text-xs font-black text-slate-800 uppercase flex items-center gap-1.5">
                  <Activity size={14} className="text-indigo-600" />
                  Puan Aralıkları Frekans / Histogram Dağılımı
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">0 - 20 Puan</div>
                    <div className="text-base font-black text-rose-600 mt-1">{stats.hist0_20} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">21 - 40 Puan</div>
                    <div className="text-base font-black text-rose-500 mt-1">{stats.hist21_40} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">41 - 60 Puan</div>
                    <div className="text-base font-black text-amber-600 mt-1">{stats.hist41_60} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">61 - 80 Puan</div>
                    <div className="text-base font-black text-blue-600 mt-1">{stats.hist61_80} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">81 - 100 Puan</div>
                    <div className="text-base font-black text-emerald-600 mt-1">{stats.hist81_100} Öğr.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistical Evaluation & Teacher Comments Box */}
            <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-1.5 print:p-2 print:bg-white print:border-gray-300 print:text-[8pt]">
              <div className="font-black text-purple-900 flex items-center gap-1.5 print:text-[8pt]">
                <Sparkles size={14} className="text-purple-600" />
                Sınavın İstatistiksel Madde Değerlendirmesi ve Kazanım Raporu:
              </div>
              <p className="leading-relaxed text-xs print:text-[7.8pt]">
                Sınavın Çarpıklık Değerine ({stats.skewness.toFixed(2)}) göre; <strong>{stats.difficultyTitle}</strong>. {stats.difficultyDesc} 
                {stats.feedbackQuestions.length > 0 ? (
                  <span className="text-rose-800 font-bold block pt-0.5">
                    ⚠️ Öncelikli Telafi Gerektiren Sorular: {stats.feedbackQuestions.map(q => `Soru ${q.questionNumber} (%${q.qSuccessRatio.toFixed(0)})`).join(', ')}
                  </span>
                ) : (
                  <span className="text-emerald-800 font-bold block pt-0.5">
                    ✅ Sınıf genelinde tüm kazanımlarda hedeflenen yeterlilik düzeyine ulaşılmıştır.
                  </span>
                )}
              </p>
            </div>

            {/* Teacher Comment Box */}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5 print:text-[8pt]">
                <Edit3 size={13} className="text-purple-600" />
                DERS ÖĞRETMENİNİN SINAV VE SINIF HAKKINDAKİ GÖRÜŞÜ &amp; TELAFİ PLANI:
              </label>
              <textarea
                rows={2}
                disabled={readOnly}
                value={currentExam.teacherComment}
                onChange={(e) => handleUpdateExam({ teacherComment: e.target.value })}
                placeholder="Öğretmen olarak bu sınav ve sınıfın kazanım durumu hakkındaki görüşlerinizi yazabilirsiniz..."
                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-2xl text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-purple-500 print:bg-white print:border-0 print:p-0 print:text-[8pt] disabled:opacity-80"
              />
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* RESMİ İMZA BÖLÜMÜ (Yazdırma ve Rapor İmzaları)                      */}
          {/* ------------------------------------------------------------------- */}
          <div ref={secSignaturesRef} className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center text-xs font-bold text-gray-700 print:p-3 print:rounded-lg print-card">
            <div className="space-y-1">
              <div className="text-gray-400 uppercase text-[9px]">Ders Öğretmeni</div>
              <div className="font-black text-gray-900 text-sm print:text-xs">{currentExam.teacherName || 'Ders Öğretmeni'}</div>
              <div className="text-gray-400 text-[9px]">İmza: ...........................................</div>
            </div>

            <div className="space-y-1">
              <div className="text-gray-400 uppercase text-[9px]">Okul Müdürü</div>
              <div className="font-black text-gray-900 text-sm print:text-xs">{currentExam.principalName || 'Okul Müdürü'}</div>
              <div className="text-gray-400 text-[9px]">İmza / Mühür: ...........................................</div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* ÖĞRENCİLERE GÖNDERİLECEK KAZANIM LİSTESİ ÖNİZLEME & DÜZENLEME MODALI  */}
      {/* ------------------------------------------------------------------- */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:hidden">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-5 sm:px-7 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider mb-1">
                  <Send size={11} /> Öğrenci Ekranına Otomatik Kazanım Gönderimi
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  Öğrencilere Gönderilecek Çalışma Kazanım Listesi
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Her öğrencinin sınavda zorlandığı kazanımlar otomatik seçildi. Göndermeden önce kazanım metinlerini düzenleyebilir, silebilir veya yeni kazanım ekleyebilirsiniz.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white/80 transition-colors cursor-pointer"
                title="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Controls */}
            <div className="px-5 sm:px-7 py-3 bg-slate-50 border-b border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center flex-wrap gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={feedbackSearch}
                    onChange={(e) => setFeedbackSearch(e.target.value)}
                    placeholder="Öğrenci ara..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-800 outline-none focus:border-purple-500 w-44"
                  />
                </div>
                {!currentExam.subject?.trim() && (
                  <input
                    type="text"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                    placeholder="Ders adını giriniz..."
                    className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-gray-800 outline-none focus:border-purple-500 w-48"
                  />
                )}
                <label className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer select-none px-2.5 py-1.5 rounded-xl bg-white border border-gray-200">
                  <input
                    type="checkbox"
                    checked={showOnlyWithMissing}
                    onChange={(e) => setShowOnlyWithMissing(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  Yalnızca Kazanım Eksiği Olanlar
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackDrafts((prev) =>
                      prev.map((d) => ({ ...d, selected: d.items.length > 0 }))
                    )
                  }
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-[11px] font-bold text-gray-700 cursor-pointer"
                >
                  Eksikleri Seç
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackDrafts((prev) => prev.map((d) => ({ ...d, selected: false })))
                  }
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-[11px] font-bold text-gray-700 cursor-pointer"
                >
                  Seçimi Temizle
                </button>
              </div>
            </div>

            {/* Student Cards List */}
            <div className="flex-1 overflow-y-auto p-4 sm:px-7 sm:py-5 space-y-4 bg-slate-50/40">
              {(() => {
                const qSearch = feedbackSearch.trim().toLowerCase();
                const visibleDrafts = feedbackDrafts.filter((d) => {
                  if (showOnlyWithMissing && d.items.length === 0) return false;
                  if (qSearch) {
                    const text = `${d.studentNumber} ${d.studentName}`.toLowerCase();
                    if (!text.includes(qSearch)) return false;
                  }
                  return true;
                });

                if (visibleDrafts.length === 0) {
                  return (
                    <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-300 text-center text-xs font-bold text-gray-400">
                      {showOnlyWithMissing
                        ? 'Eksik kazanım tespit edilen öğrenci bulunmuyor. Tüm öğrencileri görmek için "Yalnızca Kazanım Eksiği Olanlar" seçeneğini kapatabilirsiniz.'
                        : 'Arama kriterine uygun öğrenci bulunamadı.'}
                    </div>
                  );
                }

                return visibleDrafts.map((draft) => {
                  const studiedCount = draft.items.filter((it) => it.studied).length;
                  const newText = newOutcomeInputs[draft.rowId] || '';

                  return (
                    <div
                      key={draft.rowId}
                      className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                        draft.selected ? 'border-purple-300 shadow-xs' : 'border-gray-200 opacity-85'
                      }`}
                    >
                      {/* Student Row Header */}
                      <div className="px-4 py-3 bg-slate-50/70 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={draft.selected}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFeedbackDrafts((prev) =>
                                prev.map((d) => (d.rowId === draft.rowId ? { ...d, selected: checked } : d))
                              );
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <div className="flex items-center flex-wrap gap-2">
                            {draft.studentNumber && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[11px] font-black">
                                No: {draft.studentNumber}
                              </span>
                            )}
                            <span className="text-sm font-black text-gray-900">
                              {draft.studentName}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                                draft.status === 'girdi'
                                  ? draft.totalScore >= 60
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : draft.totalScore >= 50
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {draft.status === 'girdi'
                                ? `${draft.totalScore} Puan`
                                : draft.status === 'girmedi'
                                ? 'Sınava Girmedi'
                                : 'Kopya'}
                            </span>
                            {draft.hasPreviouslySent && (
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black">
                                Daha Önce Gönderildi {studiedCount > 0 ? `(${studiedCount}/${draft.items.length} Çalışıldı ✓)` : ''}
                              </span>
                            )}
                          </div>
                        </label>

                        <span className="text-[11px] font-bold text-gray-500">
                          {draft.items.length} kazanım
                        </span>
                      </div>

                      {/* Editable Outcome Items */}
                      <div className="p-3.5 sm:px-4 space-y-2">
                        {draft.items.length === 0 ? (
                          <div className="text-xs text-gray-400 font-semibold italic py-1">
                            Bu öğrenci için eksik kazanım tespit edilmedi. Aşağıdan isterseniz manuel kazanım ekleyebilirsiniz.
                          </div>
                        ) : (
                          draft.items.map((item, idx) => (
                            <div
                              key={item.id || idx}
                              className="flex flex-col sm:flex-row sm:items-center gap-2 bg-gray-50/80 border border-gray-200/80 rounded-xl p-2"
                            >
                              <div className="flex items-center gap-1.5 shrink-0">
                                {item.questionNumber ? (
                                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black whitespace-nowrap">
                                    Soru {item.questionNumber}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black whitespace-nowrap">
                                    Ek Kazanım
                                  </span>
                                )}
                                {item.maxScore !== undefined && item.maxScore > 0 && (
                                  <span className="px-1.5 py-0.5 rounded-md bg-white border border-gray-200 text-gray-600 text-[10px] font-bold whitespace-nowrap">
                                    {item.studentScore ?? 0}/{item.maxScore}P
                                  </span>
                                )}
                                {item.studied && (
                                  <span
                                    className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black whitespace-nowrap"
                                    title="Öğrenci Konuya Tekrar Çalıştım butonuna bastı"
                                  >
                                    Çalıştı ✓
                                  </span>
                                )}
                              </div>

                              <input
                                type="text"
                                value={item.outcome}
                                onChange={(e) => {
                                  const nextVal = e.target.value;
                                  setFeedbackDrafts((prev) =>
                                    prev.map((d) =>
                                      d.rowId === draft.rowId
                                        ? {
                                            ...d,
                                            items: d.items.map((it) =>
                                              it.id === item.id ? { ...it, outcome: nextVal } : it
                                            )
                                          }
                                        : d
                                    )
                                  );
                                }}
                                placeholder="Kazanım açıklaması..."
                                className="flex-1 bg-white border border-gray-200 focus:border-purple-500 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-800 outline-none"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  setFeedbackDrafts((prev) =>
                                    prev.map((d) => {
                                      if (d.rowId !== draft.rowId) return d;
                                      const filtered = d.items.filter((it) => it.id !== item.id);
                                      return {
                                        ...d,
                                        items: filtered,
                                        selected: filtered.length > 0 ? d.selected : false
                                      };
                                    })
                                  );
                                }}
                                title="Bu kazanımı listeden çıkar"
                                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer self-end sm:self-center"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))
                        )}

                        {/* Add Custom Outcome for Student */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={newText}
                            onChange={(e) =>
                              setNewOutcomeInputs((prev) => ({
                                ...prev,
                                [draft.rowId]: e.target.value
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newText.trim()) {
                                e.preventDefault();
                                const addedItem: PusulaStudentOutcomeFeedbackItem = {
                                  id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                                  outcome: newText.trim(),
                                  studied: false
                                };
                                setFeedbackDrafts((prev) =>
                                  prev.map((d) =>
                                    d.rowId === draft.rowId
                                      ? { ...d, selected: true, items: [...d.items, addedItem] }
                                      : d
                                  )
                                );
                                setNewOutcomeInputs((prev) => ({ ...prev, [draft.rowId]: '' }));
                              }
                            }}
                            placeholder="Bu öğrenci için ek kazanım / çalışma konusu ekle..."
                            className="flex-1 bg-slate-50 border border-gray-200 focus:bg-white focus:border-purple-500 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-800 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!newText.trim()) return;
                              const addedItem: PusulaStudentOutcomeFeedbackItem = {
                                id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                                outcome: newText.trim(),
                                studied: false
                              };
                              setFeedbackDrafts((prev) =>
                                prev.map((d) =>
                                  d.rowId === draft.rowId
                                    ? { ...d, selected: true, items: [...d.items, addedItem] }
                                    : d
                                )
                              );
                              setNewOutcomeInputs((prev) => ({ ...prev, [draft.rowId]: '' }));
                            }}
                            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-black flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Plus size={13} /> Kazanım Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-7 py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-gray-600">
                Seçili Öğrenci:{' '}
                <strong className="text-purple-700">
                  {feedbackDrafts.filter((d) => d.selected && d.items.some((i) => i.outcome.trim())).length}
                </strong>{' '}
                • Toplam Kazanım:{' '}
                <strong className="text-purple-700">
                  {feedbackDrafts
                    .filter((d) => d.selected)
                    .reduce((acc, d) => acc + d.items.filter((i) => i.outcome.trim()).length, 0)}
                </strong>
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="button"
                  disabled={isSendingFeedback}
                  onClick={handleDispatchStudentOutcomes}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-md shadow-purple-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSendingFeedback ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Seçili Öğrencilere Gönder
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
