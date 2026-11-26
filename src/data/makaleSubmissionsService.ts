import { db } from '../lib/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export interface MakaleSubmission {
  id: string;
  schoolId?: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  articleId: number;
  articleTitle: string;
  workshopId: 1 | 2; // 1: 5-6. Sınıf, 2: 7-8. Sınıf
  category: string;
  submittedAt: string;
  createdAtIso?: string;
  timeSpentMinutes: number;

  // Quiz Evaluation
  quizSelectedOption: {
    letter: string;
    text: string;
    isCorrect: boolean;
    type: string; // "Doğru Cevap" | "Ters Mantık" | "Kapsam Aşımı" | "Çelişkili" | "Öznel Yorum"
  };
  quizExplanation: string;
  isPassed: boolean;
  distractorType?: string; // If failed, e.g. "Ters Mantık"
  neuralWarning?: string; // Cognitive trap advice

  // 10-step Workspace Inputs
  workspaceInput: {
    konuDedektifi: string;
    hizliOzet: string;
    yazarinAmaci: string;
    soru1: string;
    soru2: string;
    soru3: string;
    anaDusunce: string;
    aiScore?: number;
    aiFeedback?: string;
    cikarimYapma: string;
    yardimci1: string;
    yardimci2: string;
    yardimci3: string;
    boslukDoldurma: string;
    anlatimBicimi: string;
    dusunceyiGelistirme: string;
  };

  // Teacher Review
  teacherReview?: {
    teacherName: string;
    score: number;
    comment: string;
    status: 'incelendi' | 'onaylandi' | 'telafi_atandi';
    reviewedAt: string;
  };

  wordsLearned?: string[];
}

const STORAGE_KEY = 'alim_makale_submissions_v2';
const LEGACY_SEED_IDS = new Set([
  'sub-seed-1',
  'sub-seed-2',
  'sub-seed-3',
  'sub-seed-4',
  'sub-seed-5',
  'sub-seed-6',
  'sub-seed-7'
]);

const isLegacySeedRecord = (sub: any): boolean => {
  if (!sub || typeof sub !== 'object') return true;
  if (typeof sub.id === 'string' && LEGACY_SEED_IDS.has(sub.id)) return true;
  if (typeof sub.id === 'string' && sub.id.startsWith('sub-seed-')) return true;
  return false;
};

const sanitizeForFirestore = <T,>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map(item => sanitizeForFirestore(item)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, any> = {};
    Object.entries(value as Record<string, any>).forEach(([k, v]) => {
      if (v !== undefined) {
        out[k] = sanitizeForFirestore(v);
      }
    });
    return out as T;
  }
  return value;
};

const readAllLocalSubmissions = (): MakaleSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cleaned = parsed.filter(s => !isLegacySeedRecord(s));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    console.error('Failed to load makale submissions', e);
    return [];
  }
};

// No fake seed records are injected anymore; real student submissions come from Firestore & localStorage
export function getInitialSeedSubmissions(): MakaleSubmission[] {
  return [];
}

export function loadMakaleSubmissions(schoolId?: string): MakaleSubmission[] {
  const all = readAllLocalSubmissions();
  if (!schoolId) return all;
  return all.filter(s => !s.schoolId || s.schoolId === schoolId);
}

export function saveMakaleSubmissions(subs: MakaleSubmission[], notify = true): void {
  try {
    const cleaned = subs.filter(s => !isLegacySeedRecord(s));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    if (notify) {
      window.dispatchEvent(new CustomEvent('makale_submissions_updated', { detail: cleaned }));
    }
  } catch (e) {
    console.error('Failed to save makale submissions', e);
  }
}

export async function fetchMakaleSubmissionsFromFirestore(schoolId?: string): Promise<MakaleSubmission[]> {
  const localAll = readAllLocalSubmissions();
  const byId = new Map<string, MakaleSubmission>();

  localAll.forEach(item => {
    if (item?.id && !isLegacySeedRecord(item)) {
      byId.set(item.id, item);
    }
  });

  try {
    if (db) {
      const snap = await getDocs(collection(db, 'makale_submissions'));
      snap.forEach(d => {
        const data = d.data() as MakaleSubmission;
        if (data && data.id && !isLegacySeedRecord(data)) {
          const existing = byId.get(data.id);
          // Prefer Firestore data when present, or whichever has newer teacherReview / createdAtIso
          if (!existing) {
            byId.set(data.id, data);
          } else {
            const existingIso = existing.createdAtIso || '';
            const remoteIso = data.createdAtIso || '';
            const hasRemoteReview = Boolean(data.teacherReview && !existing.teacherReview);
            if (hasRemoteReview || remoteIso >= existingIso) {
              byId.set(data.id, data);
            }
          }
        }
      });
    }
  } catch (e) {
    console.warn('Firestore fetch makale_submissions failed:', e);
  }

  const mergedAll = Array.from(byId.values()).sort((a, b) => {
    const ta = a.createdAtIso ? Date.parse(a.createdAtIso) : 0;
    const tb = b.createdAtIso ? Date.parse(b.createdAtIso) : 0;
    return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
  });

  saveMakaleSubmissions(mergedAll, false);

  const filtered = schoolId
    ? mergedAll.filter(s => !s.schoolId || s.schoolId === schoolId)
    : mergedAll;

  window.dispatchEvent(new CustomEvent('makale_submissions_updated', { detail: mergedAll }));
  return filtered;
}

export function addOrUpdateSubmission(sub: MakaleSubmission): void {
  const prepared: MakaleSubmission = sanitizeForFirestore({
    ...sub,
    schoolId: sub.schoolId || 'default',
    createdAtIso: sub.createdAtIso || new Date().toISOString()
  });

  const current = readAllLocalSubmissions();
  const index = current.findIndex(
    s =>
      s.id === prepared.id ||
      (s.studentId === prepared.studentId &&
        s.articleId === prepared.articleId &&
        (s.schoolId || 'default') === (prepared.schoolId || 'default'))
  );

  let updated: MakaleSubmission[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = sanitizeForFirestore({ ...updated[index], ...prepared });
  } else {
    updated = [prepared, ...current];
  }
  saveMakaleSubmissions(updated);

  if (db) {
    const recordToPersist = index >= 0 ? updated[index] : prepared;
    void setDoc(doc(db, 'makale_submissions', recordToPersist.id), recordToPersist, { merge: true }).catch(err => {
      console.warn('Firestore save makale_submissions failed:', err);
    });
  }
}

export function updateTeacherReview(
  submissionId: string,
  review: { teacherName: string; score: number; comment: string; status: 'incelendi' | 'onaylandi' | 'telafi_atandi' }
): MakaleSubmission | null {
  const current = readAllLocalSubmissions();
  const index = current.findIndex(s => s.id === submissionId);
  if (index >= 0) {
    const updatedSub: MakaleSubmission = sanitizeForFirestore({
      ...current[index],
      teacherReview: {
        ...review,
        reviewedAt: new Date().toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    });
    current[index] = updatedSub;
    saveMakaleSubmissions(current);

    if (db) {
      void setDoc(doc(db, 'makale_submissions', updatedSub.id), updatedSub, { merge: true }).catch(err => {
        console.warn('Firestore update teacherReview failed:', err);
      });
    }
    return updatedSub;
  }
  return null;
}
