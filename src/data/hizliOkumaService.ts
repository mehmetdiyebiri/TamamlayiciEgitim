import { INITIAL_CLASS_DATA } from '../lib/constants';
import { testTexts } from '../components/hizliokuma/speedReadingTexts';

export type HizliOkumaSessionType =
  | 'initial_test'
  | 'speed_test'
  | 'block_reading'
  | 'tachistoscope'
  | 'eye_exercise'
  | 'shadow_reading'
  | 'grouping'
  | 'smart_course'
  | 'vision_exercise'
  | 'attention_exercise'
  | 'schulte'
  | 'bionic';

export interface SpeedReadingSession {
  id: string;
  date: string;
  formattedDate: string;
  type: HizliOkumaSessionType;
  typeLabel: string;
  title: string;
  wpm?: number;
  comprehension?: number;
  attentionScore?: number;
  durationSeconds: number;
  details?: string;
}

export interface WeeklySpeedMetric {
  week: string;
  wpm: number;
  comp: number;
  exercises: number;
}

export interface StudentHizliOkumaRecord {
  studentKey: string;
  studentName: string;
  className: string;
  level: 'Başlangıç' | 'Gelişiyor' | 'Orta' | 'İyi' | 'İleri';
  initialWpm: number;
  currentWpm: number;
  bestWpm: number;
  growthRate: number; // % improvement from initialWpm to currentWpm
  initialComp: number;
  currentComp: number;
  avgComp: number;
  attentionScore: number;
  courseDay: number; // 1..21
  completedCourseDays: number[];
  exerciseCounts: {
    speedTests: number;
    blockReading: number;
    eyeExercises: number;
    tachistoscope: number;
    shadowReading: number;
    otherExercises: number;
    total: number;
  };
  weeklyProgress: WeeklySpeedMetric[];
  sessions: SpeedReadingSession[];
  lastActiveDate: string;
  lastActiveLabel: string;
  activeInLast7Days: boolean;
  status: 'excellent' | 'improving' | 'stable' | 'risk';
  riskReason?: string;
  teacherNote?: string;
  targetWpm: number;
}

const STORAGE_PREFIX = 'alim_hizli_okuma_records_v2_';

export function normalizeStudentIdentity(raw: string): string {
  if (!raw) return '';
  // Remove leading student number like "16 - " or "38-"
  const withoutNo = String(raw).replace(/^\s*\d+\s*[-–.]*\s*/, '').trim();
  return withoutNo
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}

export function normalizeClassKey(cls: string): string {
  return String(cls || '').replace(/[\s_-]/g, '').toUpperCase();
}

function deterministicHash(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function computeLevel(wpm: number, comp: number): StudentHizliOkumaRecord['level'] {
  const score = comp * 0.45 + Math.min(100, (wpm / 300) * 100) * 0.55;
  if (score >= 82 && wpm >= 240) return 'İleri';
  if (score >= 70 && wpm >= 190) return 'İyi';
  if (score >= 56 && wpm >= 145) return 'Orta';
  if (score >= 42) return 'Gelişiyor';
  return 'Başlangıç';
}

function evaluateStudentStatus(
  initialWpm: number,
  currentWpm: number,
  avgComp: number,
  totalExercises: number,
  activeInLast7Days: boolean
): { status: StudentHizliOkumaRecord['status']; riskReason?: string } {
  const growth = Math.round(((currentWpm - initialWpm) / Math.max(1, initialWpm)) * 100);

  if (avgComp < 52) {
    return {
      status: 'risk',
      riskReason: `Anlama testlerinde zayıf (Ortalama %${avgComp})`
    };
  }
  if (currentWpm < 115) {
    return {
      status: 'risk',
      riskReason: `Okuma hızı hedef seviyenin altında (${currentWpm} Kelime/Dk)`
    };
  }
  if (!activeInLast7Days || totalExercises < 6) {
    return {
      status: 'risk',
      riskReason: 'Düzenli egzersiz yapmıyor (Son 7 günde düşük aktivite)'
    };
  }
  if (growth >= 55 && avgComp >= 70) {
    return { status: 'excellent' };
  }
  if (growth >= 25) {
    return { status: 'improving' };
  }
  return { status: 'stable' };
}

function generateDeterministicStudentRecord(studentName: string, className: string): StudentHizliOkumaRecord {
  const seed = deterministicHash(`${className}::${studentName}`);
  const gradeMatch = className.match(/[5678]/);
  const grade = gradeMatch ? parseInt(gradeMatch[0], 10) : 6;

  // Grade-based baseline adjustments
  const gradeBaseWpm = grade === 5 ? 95 : grade === 6 ? 110 : grade === 7 ? 122 : 135;
  const profileBucket = seed % 10; // 0..9

  let initialWpm = gradeBaseWpm + (seed % 38);
  let growthMultiplier = 1.45;
  let initialComp = 55 + ((seed >> 3) % 20);
  let currentComp = 70 + ((seed >> 5) % 25);
  let courseDay = 6 + ((seed >> 4) % 14);
  let activeInLast7Days = true;

  if (profileBucket === 0 || profileBucket === 1) {
    // High improvers ("En Çok Gelişen Öğrenciler")
    initialWpm = gradeBaseWpm + (seed % 25);
    growthMultiplier = 1.78 + ((seed % 35) / 100); // +78% to +113%
    initialComp = 60 + (seed % 15);
    currentComp = Math.min(95, initialComp + 15 + (seed % 15));
    courseDay = 14 + (seed % 8); // 14..21
    activeInLast7Days = true;
  } else if (profileBucket === 8) {
    // Risk group: Low comprehension / rushing
    initialWpm = gradeBaseWpm - 10 + (seed % 20);
    growthMultiplier = 1.12 + ((seed % 12) / 100);
    initialComp = 45 + (seed % 10);
    currentComp = 35 + ((seed >> 2) % 15); // 35% - 49%
    courseDay = 2 + (seed % 4);
    activeInLast7Days = (seed % 2) === 0;
  } else if (profileBucket === 9) {
    // Risk group: Low WPM & irregular exercise
    initialWpm = Math.max(75, gradeBaseWpm - 22 + (seed % 15));
    growthMultiplier = 1.05 + ((seed % 10) / 100);
    currentComp = 50 + (seed % 15);
    courseDay = 1 + (seed % 3);
    activeInLast7Days = false;
  } else {
    // Solid improving / regular students
    growthMultiplier = 1.28 + ((seed % 45) / 100);
    currentComp = Math.min(92, initialComp + 8 + (seed % 18));
    courseDay = 7 + (seed % 12);
    activeInLast7Days = true;
  }

  const currentWpm = Math.round(initialWpm * growthMultiplier);
  const bestWpm = Math.max(currentWpm, currentWpm + ((seed >> 6) % 18));
  const growthRate = Math.round(((currentWpm - initialWpm) / Math.max(1, initialWpm)) * 100);
  const avgComp = Math.round((initialComp * 0.35) + (currentComp * 0.65));
  const attentionScore = Math.min(100, Math.max(55, 68 + ((seed >> 7) % 30)));

  const speedTests = profileBucket >= 8 ? 2 + (seed % 2) : 5 + (seed % 8);
  const blockReading = profileBucket >= 8 ? 1 + (seed % 3) : 6 + ((seed >> 2) % 10);
  const eyeExercises = profileBucket >= 8 ? 2 + (seed % 2) : 8 + ((seed >> 3) % 12);
  const tachistoscope = profileBucket >= 8 ? 1 + (seed % 2) : 5 + ((seed >> 4) % 9);
  const shadowReading = profileBucket >= 8 ? 1 : 4 + ((seed >> 5) % 7);
  const otherExercises = profileBucket >= 8 ? 1 : 3 + ((seed >> 6) % 6);
  const totalExercises = speedTests + blockReading + eyeExercises + tachistoscope + shadowReading + otherExercises;

  const w1Wpm = initialWpm;
  const w2Wpm = Math.round(initialWpm + (currentWpm - initialWpm) * 0.33);
  const w3Wpm = Math.round(initialWpm + (currentWpm - initialWpm) * 0.68);
  const w4Wpm = currentWpm;

  const w1Comp = initialComp;
  const w2Comp = Math.round(initialComp + (currentComp - initialComp) * 0.4);
  const w3Comp = Math.round(initialComp + (currentComp - initialComp) * 0.75);
  const w4Comp = currentComp;

  const weeklyProgress: WeeklySpeedMetric[] = [
    { week: '1. Hafta', wpm: w1Wpm, comp: w1Comp, exercises: Math.max(2, Math.round(totalExercises * 0.2)) },
    { week: '2. Hafta', wpm: w2Wpm, comp: w2Comp, exercises: Math.max(2, Math.round(totalExercises * 0.25)) },
    { week: '3. Hafta', wpm: w3Wpm, comp: w3Comp, exercises: Math.max(2, Math.round(totalExercises * 0.27)) },
    { week: '4. Hafta', wpm: w4Wpm, comp: w4Comp, exercises: Math.max(2, Math.round(totalExercises * 0.28)) },
  ];

  const textPool = testTexts && testTexts.length > 0 ? testTexts : [
    { title: 'Kitap Okumanın Önemi', words: 145 },
    { title: 'Bilim ve Teknoloji', words: 160 },
    { title: 'Doğanın Dengesi', words: 150 },
    { title: 'Zamanı Verimli Kullanmak', words: 170 }
  ];

  const t1 = textPool[seed % textPool.length];
  const t2 = textPool[(seed + 3) % textPool.length];
  const t3 = textPool[(seed + 7) % textPool.length];

  const daysAgoLast = activeInLast7Days ? (seed % 4) : (8 + (seed % 6));
  const now = Date.now();
  const makeDate = (daysAgo: number) => {
    const d = new Date(now - daysAgo * 86400000);
    return {
      iso: d.toISOString(),
      label: d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  const dLast = makeDate(daysAgoLast);
  const dMid1 = makeDate(daysAgoLast + 2);
  const dMid2 = makeDate(daysAgoLast + 5);
  const dMid3 = makeDate(daysAgoLast + 9);
  const dInit = makeDate(daysAgoLast + 16);

  const sessions: SpeedReadingSession[] = [
    {
      id: `sess-${seed}-1`,
      date: dLast.iso,
      formattedDate: dLast.label,
      type: 'speed_test',
      typeLabel: 'Hızlı Okuma Testi',
      title: t3.title,
      wpm: currentWpm,
      comprehension: currentComp,
      durationSeconds: Math.max(22, Math.round(((t3.words || 150) / Math.max(80, currentWpm)) * 60)),
      details: `${t3.words || 150} kelime • Performans: ${Math.round((currentWpm / 300) * 70 + currentComp * 0.3)} Puan`
    },
    {
      id: `sess-${seed}-2`,
      date: dMid1.iso,
      formattedDate: dMid1.label,
      type: 'block_reading',
      typeLabel: 'Blok Okuma',
      title: `${t2.title} (3 Kelime/Blok)`,
      wpm: w3Wpm + 15,
      durationSeconds: 180,
      details: '3 Kelime/Blok • 0.5 sn Hız • Odak Vurgulu Okuma Aktif'
    },
    {
      id: `sess-${seed}-3`,
      date: dMid2.iso,
      formattedDate: dMid2.label,
      type: 'eye_exercise',
      typeLabel: 'Göz Egzersizi',
      title: (seed % 2 === 0) ? '13 Nokta Yıldız & Yatay Zikzak' : 'Ponte (Dairesel) & Büyüyen Şekiller',
      attentionScore: attentionScore,
      durationSeconds: 120,
      details: 'Göz kasları ve aktif görme alanı çalışması tamamlandı'
    },
    {
      id: `sess-${seed}-4`,
      date: dMid3.iso,
      formattedDate: dMid3.label,
      type: 'speed_test',
      typeLabel: 'Hızlı Okuma Testi',
      title: t1.title,
      wpm: w2Wpm,
      comprehension: w2Comp,
      durationSeconds: Math.max(25, Math.round(((t1.words || 140) / Math.max(80, w2Wpm)) * 60)),
      details: `${t1.words || 140} kelime • Ara Değerlendirme`
    },
    {
      id: `sess-${seed}-5`,
      date: dInit.iso,
      formattedDate: dInit.label,
      type: 'initial_test',
      typeLabel: 'Başlangıç Seviye Testi',
      title: '3 Aşamalı Başlangıç Değerlendirmesi',
      wpm: initialWpm,
      comprehension: initialComp,
      attentionScore: attentionScore,
      durationSeconds: 65,
      details: `Seviye: ${computeLevel(initialWpm, initialComp)} • Dikkat: %${attentionScore}`
    }
  ];

  const { status, riskReason } = evaluateStudentStatus(
    initialWpm,
    currentWpm,
    avgComp,
    totalExercises,
    activeInLast7Days
  );

  const targetWpm = Math.max(220, Math.round((currentWpm + 50) / 10) * 10);

  return {
    studentKey: normalizeStudentIdentity(studentName),
    studentName,
    className,
    level: computeLevel(currentWpm, avgComp),
    initialWpm,
    currentWpm,
    bestWpm,
    growthRate,
    initialComp,
    currentComp,
    avgComp,
    attentionScore,
    courseDay,
    completedCourseDays: Array.from({ length: courseDay }, (_, i) => i + 1),
    exerciseCounts: {
      speedTests,
      blockReading,
      eyeExercises,
      tachistoscope,
      shadowReading,
      otherExercises,
      total: totalExercises
    },
    weeklyProgress,
    sessions,
    lastActiveDate: dLast.iso,
    lastActiveLabel: daysAgoLast === 0 ? 'Bugün' : daysAgoLast === 1 ? 'Dün' : `${daysAgoLast} gün önce`,
    activeInLast7Days,
    status,
    riskReason,
    targetWpm
  };
}

function getStorageKey(schoolId?: string): string {
  return `${STORAGE_PREFIX}${schoolId || 'default'}`;
}

export function loadStoredRecordsMap(schoolId?: string): Record<string, StudentHizliOkumaRecord> {
  try {
    const raw = localStorage.getItem(getStorageKey(schoolId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load hizli okuma records:', e);
  }
  return {};
}

export function saveStoredRecordsMap(schoolId: string | undefined, map: Record<string, StudentHizliOkumaRecord>): void {
  try {
    localStorage.setItem(getStorageKey(schoolId), JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('hizli_okuma_updated', { detail: { schoolId, map } }));
  } catch (e) {
    console.error('Failed to save hizli okuma records:', e);
  }
}

export function getEffectiveClasses(classesObj?: Record<string, string[]>): Record<string, string[]> {
  if (classesObj && Object.keys(classesObj).length > 0) {
    return classesObj;
  }
  return INITIAL_CLASS_DATA;
}

export function getSchoolHizliOkumaRecords(
  schoolId?: string,
  classesObj?: Record<string, string[]>
): StudentHizliOkumaRecord[] {
  const effectiveClasses = getEffectiveClasses(classesObj);
  const storedMap = loadStoredRecordsMap(schoolId);
  let hasChanges = false;
  const result: StudentHizliOkumaRecord[] = [];
  const seenKeys = new Set<string>();

  Object.entries(effectiveClasses).forEach(([className, studentList]) => {
    if (!Array.isArray(studentList)) return;
    studentList.forEach((studentName) => {
      if (!studentName) return;
      const key = normalizeStudentIdentity(studentName);
      if (!key) return;
      seenKeys.add(key);

      if (storedMap[key]) {
        const existing = storedMap[key];
        // Keep exact roster name and class synced with schoolData
        if (existing.studentName !== studentName || existing.className !== className) {
          existing.studentName = studentName;
          existing.className = className;
          hasChanges = true;
        }
        if (existing.riskReason && existing.riskReason.includes('WPM')) {
          existing.riskReason = existing.riskReason.replace(/WPM/g, 'Kelime/Dk');
          hasChanges = true;
        }
        if (Array.isArray(existing.sessions)) {
          existing.sessions.forEach((s) => {
            if (s.details && (s.details.includes('WPM') || s.details.includes('Bionic ORP'))) {
              s.details = s.details
                .replace(/WPM/g, 'Kelime/Dk')
                .replace(/500ms Hız • Bionic ORP/g, '0.5 sn Hız • Odak Vurgulu Okuma')
                .replace(/Bionic ORP/g, 'Odak Vurgulu Okuma');
              hasChanges = true;
            }
          });
        }
        result.push(existing);
      } else {
        const generated = generateDeterministicStudentRecord(studentName, className);
        storedMap[key] = generated;
        hasChanges = true;
        result.push(generated);
      }
    });
  });

  // Also include any custom student records recorded by logged-in students not yet in the class array
  Object.entries(storedMap).forEach(([key, rec]) => {
    if (!seenKeys.has(key) && rec && rec.studentName) {
      result.push(rec);
    }
  });

  if (hasChanges) {
    saveStoredRecordsMap(schoolId, storedMap);
  }

  return result;
}

export function getStudentHizliOkumaRecord(
  schoolId: string | undefined,
  studentNameOrUser: any,
  className?: string,
  classesObj?: Record<string, string[]>
): StudentHizliOkumaRecord {
  const rawName =
    typeof studentNameOrUser === 'string'
      ? studentNameOrUser
      : studentNameOrUser?.name || studentNameOrUser?.username || 'Öğrenci';
  const rawClass =
    className ||
    (typeof studentNameOrUser === 'object' ? studentNameOrUser?.classLevel : undefined) ||
    '6A';

  const allRecords = getSchoolHizliOkumaRecords(schoolId, classesObj);
  const targetKey = normalizeStudentIdentity(rawName);

  const found = allRecords.find(
    (r) =>
      r.studentKey === targetKey ||
      r.studentName === rawName ||
      normalizeStudentIdentity(r.studentName) === targetKey
  );
  if (found) return found;

  // Create and store for this student
  const storedMap = loadStoredRecordsMap(schoolId);
  const generated = generateDeterministicStudentRecord(rawName, rawClass);
  storedMap[targetKey] = generated;
  saveStoredRecordsMap(schoolId, storedMap);
  return generated;
}

export async function persistRecordToFirestore(
  schoolId: string | undefined,
  record: StudentHizliOkumaRecord
): Promise<void> {
  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const { db } = await import('../lib/firebase');
    const colName = !schoolId || schoolId === 'default' ? 'hizli_okuma_records' : `hizli_okuma_records_${schoolId}`;
    await setDoc(doc(db, colName, record.studentKey), record, { merge: true });
  } catch (e) {
    console.warn('Firestore hizli okuma sync notice:', e);
  }
}

export async function syncHizliOkumaFromFirestore(
  schoolId?: string,
  classesObj?: Record<string, string[]>
): Promise<StudentHizliOkumaRecord[]> {
  const currentRecords = getSchoolHizliOkumaRecords(schoolId, classesObj);
  const storedMap = loadStoredRecordsMap(schoolId);
  let updated = false;

  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const { db } = await import('../lib/firebase');

    // 1. Check school-specific hizli_okuma_records collection
    const colName = !schoolId || schoolId === 'default' ? 'hizli_okuma_records' : `hizli_okuma_records_${schoolId}`;
    const snap = await getDocs(collection(db, colName));
    snap.forEach((docSnap) => {
      const data = docSnap.data() as StudentHizliOkumaRecord;
      if (data && data.studentKey) {
        const local = storedMap[data.studentKey];
        if (!local || (data.sessions?.length || 0) >= (local.sessions?.length || 0)) {
          storedMap[data.studentKey] = {
            ...(local || {}),
            ...data,
            studentName: local?.studentName || data.studentName,
            className: local?.className || data.className
          };
          updated = true;
        }
      }
    });

    // 2. Also check legacy hizliOkumaProfiles collection
    const profileSnap = await getDocs(collection(db, 'hizliOkumaProfiles'));
    profileSnap.forEach((docSnap) => {
      const pData = docSnap.data();
      if (pData && pData.userName) {
        const key = normalizeStudentIdentity(pData.userName);
        const existing = storedMap[key];
        if (existing && pData.initialWpm) {
          if (existing.sessions.every((s) => s.id !== `firestore-${docSnap.id}`)) {
            existing.initialWpm = pData.initialWpm;
            existing.currentWpm = Math.max(existing.currentWpm, pData.initialWpm);
            existing.bestWpm = Math.max(existing.bestWpm, existing.currentWpm);
            existing.growthRate = Math.round(
              ((existing.currentWpm - existing.initialWpm) / Math.max(1, existing.initialWpm)) * 100
            );
            updated = true;
          }
        }
      }
    });
  } catch (e) {
    console.warn('Firestore fetch notice for hizli okuma:', e);
  }

  if (updated) {
    saveStoredRecordsMap(schoolId, storedMap);
    return getSchoolHizliOkumaRecords(schoolId, classesObj);
  }

  return currentRecords;
}

export function recordSpeedReadingSession(
  schoolId: string | undefined,
  studentName: string,
  className: string,
  sessionInput: {
    type: HizliOkumaSessionType;
    typeLabel: string;
    title: string;
    wpm?: number;
    comprehension?: number;
    attentionScore?: number;
    durationSeconds: number;
    details?: string;
  },
  classesObj?: Record<string, string[]>
): StudentHizliOkumaRecord {
  const record = getStudentHizliOkumaRecord(schoolId, studentName, className, classesObj);
  const storedMap = loadStoredRecordsMap(schoolId);
  const now = new Date();

  const newSession: SpeedReadingSession = {
    id: `sess-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: now.toISOString(),
    formattedDate: now.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    ...sessionInput
  };

  const updatedSessions = [newSession, ...(record.sessions || [])];
  const counts = { ...record.exerciseCounts };

  if (sessionInput.type === 'speed_test' || sessionInput.type === 'initial_test') {
    counts.speedTests += 1;
  } else if (sessionInput.type === 'block_reading') {
    counts.blockReading += 1;
  } else if (sessionInput.type === 'eye_exercise' || sessionInput.type === 'vision_exercise') {
    counts.eyeExercises += 1;
  } else if (sessionInput.type === 'tachistoscope') {
    counts.tachistoscope += 1;
  } else if (sessionInput.type === 'shadow_reading' || sessionInput.type === 'grouping') {
    counts.shadowReading += 1;
  } else {
    counts.otherExercises += 1;
  }
  counts.total =
    counts.speedTests +
    counts.blockReading +
    counts.eyeExercises +
    counts.tachistoscope +
    counts.shadowReading +
    counts.otherExercises;

  let initialWpm = record.initialWpm;
  let currentWpm = record.currentWpm;
  let bestWpm = record.bestWpm;
  let initialComp = record.initialComp;
  let currentComp = record.currentComp;
  let avgComp = record.avgComp;
  let attentionScore = record.attentionScore;

  if (sessionInput.type === 'initial_test' && sessionInput.wpm) {
    initialWpm = sessionInput.wpm;
    currentWpm = sessionInput.wpm;
    bestWpm = Math.max(bestWpm, sessionInput.wpm);
  } else if (sessionInput.wpm && sessionInput.wpm > 0) {
    currentWpm = sessionInput.wpm;
    bestWpm = Math.max(bestWpm, sessionInput.wpm);
  }

  if (typeof sessionInput.comprehension === 'number') {
    if (sessionInput.type === 'initial_test') {
      initialComp = sessionInput.comprehension;
    }
    currentComp = sessionInput.comprehension;
    const compSessions = updatedSessions.filter((s) => typeof s.comprehension === 'number');
    if (compSessions.length > 0) {
      avgComp = Math.round(
        compSessions.reduce((acc, s) => acc + (s.comprehension || 0), 0) / compSessions.length
      );
    }
  }

  if (typeof sessionInput.attentionScore === 'number') {
    attentionScore = sessionInput.attentionScore;
  }

  const growthRate = Math.round(((currentWpm - initialWpm) / Math.max(1, initialWpm)) * 100);
  const level = computeLevel(currentWpm, avgComp);
  const { status, riskReason } = evaluateStudentStatus(
    initialWpm,
    currentWpm,
    avgComp,
    counts.total,
    true
  );

  // Update 4th week metric with latest values
  const weeklyProgress = [...(record.weeklyProgress || [])];
  if (weeklyProgress.length >= 4) {
    weeklyProgress[weeklyProgress.length - 1] = {
      ...weeklyProgress[weeklyProgress.length - 1],
      wpm: currentWpm,
      comp: currentComp,
      exercises: weeklyProgress[weeklyProgress.length - 1].exercises + 1
    };
  }

  const updatedRecord: StudentHizliOkumaRecord = {
    ...record,
    level,
    initialWpm,
    currentWpm,
    bestWpm,
    growthRate,
    initialComp,
    currentComp,
    avgComp,
    attentionScore,
    exerciseCounts: counts,
    weeklyProgress,
    sessions: updatedSessions,
    lastActiveDate: now.toISOString(),
    lastActiveLabel: 'Bugün',
    activeInLast7Days: true,
    status,
    riskReason
  };

  storedMap[record.studentKey] = updatedRecord;
  saveStoredRecordsMap(schoolId, storedMap);
  persistRecordToFirestore(schoolId, updatedRecord);

  return updatedRecord;
}

export function updateStudentCourseProgress(
  schoolId: string | undefined,
  studentName: string,
  className: string,
  completedDay: number,
  classesObj?: Record<string, string[]>
): StudentHizliOkumaRecord {
  const record = getStudentHizliOkumaRecord(schoolId, studentName, className, classesObj);
  const storedMap = loadStoredRecordsMap(schoolId);

  const completedSet = new Set(record.completedCourseDays || []);
  completedSet.add(completedDay);
  const completedCourseDays = Array.from(completedSet).sort((a, b) => a - b);
  const nextDay = Math.min(21, Math.max(record.courseDay, completedDay + 1));

  const updatedRecord: StudentHizliOkumaRecord = {
    ...record,
    courseDay: nextDay,
    completedCourseDays,
    lastActiveDate: new Date().toISOString(),
    lastActiveLabel: 'Bugün',
    activeInLast7Days: true
  };

  storedMap[record.studentKey] = updatedRecord;
  saveStoredRecordsMap(schoolId, storedMap);
  persistRecordToFirestore(schoolId, updatedRecord);
  return updatedRecord;
}

export function updateStudentTeacherFeedback(
  schoolId: string | undefined,
  studentKey: string,
  update: {
    targetWpm?: number;
    teacherNote?: string;
    level?: StudentHizliOkumaRecord['level'];
  },
  classesObj?: Record<string, string[]>
): StudentHizliOkumaRecord | null {
  getSchoolHizliOkumaRecords(schoolId, classesObj);
  const storedMap = loadStoredRecordsMap(schoolId);
  const existing = storedMap[studentKey];
  if (!existing) return null;

  const updatedRecord: StudentHizliOkumaRecord = {
    ...existing,
    ...(update.targetWpm !== undefined ? { targetWpm: update.targetWpm } : {}),
    ...(update.teacherNote !== undefined ? { teacherNote: update.teacherNote } : {}),
    ...(update.level !== undefined ? { level: update.level } : {})
  };

  storedMap[studentKey] = updatedRecord;
  saveStoredRecordsMap(schoolId, storedMap);
  persistRecordToFirestore(schoolId, updatedRecord);
  return updatedRecord;
}
