import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { StudentDiagnosticResult } from '../utils/diagnosticEngine';

export interface MitDiagnosticReportRecord extends StudentDiagnosticResult {
    schoolId?: string;
    studentClass?: string;
    timestampIso?: string;
}

export interface MitMentalMathRecord {
    id: string;
    schoolId?: string;
    studentName: string;
    studentClass?: string;
    grade?: number;
    q: string;
    userAns: string;
    correctAns: string | number;
    correct: boolean;
    durationSec: number;
    perf: 'İyi' | 'Normal' | 'Geliştirilmesi Gereken';
    category: string;
    tip?: string;
    timestampIso: string;
}

export interface MitStudySessionRecord {
    id: string;
    schoolId?: string;
    studentName: string;
    studentClass?: string;
    grade: number;
    topic: string;
    difficulty: string;
    score: number;
    totalQuestions: number;
    timestampIso: string;
}

export interface MitStudentOverride {
    studentKey: string;
    studentName: string;
    manualLevel: '1' | '2' | '3' | '4';
    updatedAt: string;
    updatedBy?: string;
}

export interface MitAssignmentRecord {
    id: string;
    schoolId: string;
    targetType: 'student' | 'class';
    targetStudentName?: string;
    targetClass?: string;
    assignMode: 'topic' | 'practice';
    itemTitle: string;
    difficulty?: 'kolay' | 'orta' | 'zor';
    assignedBy?: string;
    createdAt: string;
}

export interface MitSchoolAnalyticsConfig {
    manualLevels: Record<string, MitStudentOverride>;
    assignments: MitAssignmentRecord[];
}

const LOCAL_DIAG_KEY = 'mit_diagnostic_reports';
const LOCAL_MENTAL_KEY = 'mit_mental_math_results';
const LOCAL_STUDY_KEY = 'mit_study_sessions_v1';
const LOCAL_CONFIG_PREFIX = 'mit_analytics_config_v1_';

const safeReadLocalArray = <T,>(key: string): T[] => {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export const saveDiagnosticReport = async (report: MitDiagnosticReportRecord): Promise<boolean> => {
    const record: MitDiagnosticReportRecord = {
        ...report,
        schoolId: report.schoolId || 'default',
        timestampIso: report.timestampIso || new Date().toISOString()
    };

    try {
        const existing = safeReadLocalArray<MitDiagnosticReportRecord>(LOCAL_DIAG_KEY);
        const filtered = existing.filter(r => r.id !== record.id);
        filtered.unshift(record);
        localStorage.setItem(LOCAL_DIAG_KEY, JSON.stringify(filtered.slice(0, 100)));
    } catch (e) {
        console.warn('LocalStorage error saving diagnostic report:', e);
    }

    try {
        if (db) {
            await setDoc(doc(db, 'mit_diagnostic_reports', record.id), record);
        }
        return true;
    } catch (e) {
        console.warn('Firestore save diagnostic report failed:', e);
        return false;
    }
};

export const getDiagnosticReports = async (schoolId?: string): Promise<MitDiagnosticReportRecord[]> => {
    const localList = safeReadLocalArray<MitDiagnosticReportRecord>(LOCAL_DIAG_KEY);
    const map = new Map<string, MitDiagnosticReportRecord>();
    localList.forEach(item => {
        if (item?.id) map.set(item.id, item);
    });

    try {
        if (db) {
            const snap = await getDocs(collection(db, 'mit_diagnostic_reports'));
            snap.forEach(d => {
                const data = d.data() as MitDiagnosticReportRecord;
                if (data?.id) map.set(data.id, data);
            });
        }
    } catch (e) {
        console.warn('Firestore fetch mit_diagnostic_reports failed:', e);
    }

    const merged = Array.from(map.values());
    if (!schoolId) return merged;
    return merged.filter(r => !r.schoolId || r.schoolId === schoolId);
};

export const saveMentalMathRecord = async (record: MitMentalMathRecord): Promise<boolean> => {
    const cleanRecord: MitMentalMathRecord = {
        ...record,
        schoolId: record.schoolId || 'default',
        timestampIso: record.timestampIso || new Date().toISOString()
    };

    try {
        const existing = safeReadLocalArray<MitMentalMathRecord>(LOCAL_MENTAL_KEY);
        const filtered = existing.filter(r => r.id !== cleanRecord.id);
        filtered.unshift(cleanRecord);
        localStorage.setItem(LOCAL_MENTAL_KEY, JSON.stringify(filtered.slice(0, 200)));
    } catch (e) {
        console.warn('LocalStorage error saving mental math:', e);
    }

    try {
        if (db) {
            await setDoc(doc(db, 'mit_mental_math_results', cleanRecord.id), cleanRecord);
        }
        return true;
    } catch (e) {
        console.warn('Firestore save mit_mental_math_results failed:', e);
        return false;
    }
};

export const getMentalMathResults = async (schoolId?: string): Promise<MitMentalMathRecord[]> => {
    const localList = safeReadLocalArray<MitMentalMathRecord>(LOCAL_MENTAL_KEY);
    const map = new Map<string, MitMentalMathRecord>();
    localList.forEach(item => {
        if (item?.id) map.set(item.id, item);
    });

    try {
        if (db) {
            const snap = await getDocs(collection(db, 'mit_mental_math_results'));
            snap.forEach(d => {
                const data = d.data() as MitMentalMathRecord;
                if (data?.id) map.set(data.id, data);
            });
        }
    } catch (e) {
        console.warn('Firestore fetch mit_mental_math_results failed:', e);
    }

    const merged = Array.from(map.values());
    if (!schoolId) return merged;
    return merged.filter(r => !r.schoolId || r.schoolId === schoolId);
};

export const saveStudySessionRecord = async (record: MitStudySessionRecord): Promise<boolean> => {
    const cleanRecord: MitStudySessionRecord = {
        ...record,
        schoolId: record.schoolId || 'default',
        timestampIso: record.timestampIso || new Date().toISOString()
    };

    try {
        const existing = safeReadLocalArray<MitStudySessionRecord>(LOCAL_STUDY_KEY);
        const filtered = existing.filter(r => r.id !== cleanRecord.id);
        filtered.unshift(cleanRecord);
        localStorage.setItem(LOCAL_STUDY_KEY, JSON.stringify(filtered.slice(0, 200)));
    } catch (e) {
        console.warn('LocalStorage error saving study session:', e);
    }

    try {
        if (db) {
            await setDoc(doc(db, 'mit_study_sessions', cleanRecord.id), cleanRecord);
        }
        return true;
    } catch (e) {
        console.warn('Firestore save mit_study_sessions failed:', e);
        return false;
    }
};

export const getStudySessions = async (schoolId?: string): Promise<MitStudySessionRecord[]> => {
    const localList = safeReadLocalArray<MitStudySessionRecord>(LOCAL_STUDY_KEY);
    const map = new Map<string, MitStudySessionRecord>();
    localList.forEach(item => {
        if (item?.id) map.set(item.id, item);
    });

    try {
        if (db) {
            const snap = await getDocs(collection(db, 'mit_study_sessions'));
            snap.forEach(d => {
                const data = d.data() as MitStudySessionRecord;
                if (data?.id) map.set(data.id, data);
            });
        }
    } catch (e) {
        console.warn('Firestore fetch mit_study_sessions failed:', e);
    }

    const merged = Array.from(map.values());
    if (!schoolId) return merged;
    return merged.filter(r => !r.schoolId || r.schoolId === schoolId);
};

export const getSchoolMitAnalyticsConfig = async (schoolId: string = 'default'): Promise<MitSchoolAnalyticsConfig> => {
    const safeSchoolId = schoolId || 'default';
    let localConfig: MitSchoolAnalyticsConfig = { manualLevels: {}, assignments: [] };

    try {
        const raw = localStorage.getItem(`${LOCAL_CONFIG_PREFIX}${safeSchoolId}`);
        if (raw) {
            const parsed = JSON.parse(raw);
            localConfig = {
                manualLevels: parsed?.manualLevels && typeof parsed.manualLevels === 'object' ? parsed.manualLevels : {},
                assignments: Array.isArray(parsed?.assignments) ? parsed.assignments : []
            };
        }
    } catch {
        // ignore
    }

    try {
        if (db) {
            const snap = await getDoc(doc(db, 'mit_analytics_config', safeSchoolId));
            if (snap.exists()) {
                const data = snap.data() as Partial<MitSchoolAnalyticsConfig>;
                const merged: MitSchoolAnalyticsConfig = {
                    manualLevels: { ...localConfig.manualLevels, ...(data.manualLevels || {}) },
                    assignments: Array.isArray(data.assignments) && data.assignments.length >= localConfig.assignments.length
                        ? data.assignments
                        : localConfig.assignments
                };
                try {
                    localStorage.setItem(`${LOCAL_CONFIG_PREFIX}${safeSchoolId}`, JSON.stringify(merged));
                } catch {}
                return merged;
            }
        }
    } catch (e) {
        console.warn('Firestore fetch mit_analytics_config failed:', e);
    }

    return localConfig;
};

export const saveStudentManualLevel = async (
    schoolId: string,
    override: MitStudentOverride
): Promise<MitSchoolAnalyticsConfig> => {
    const safeSchoolId = schoolId || 'default';
    const current = await getSchoolMitAnalyticsConfig(safeSchoolId);
    const updated: MitSchoolAnalyticsConfig = {
        ...current,
        manualLevels: {
            ...current.manualLevels,
            [override.studentKey]: override
        }
    };

    try {
        localStorage.setItem(`${LOCAL_CONFIG_PREFIX}${safeSchoolId}`, JSON.stringify(updated));
    } catch {}

    try {
        if (db) {
            await setDoc(doc(db, 'mit_analytics_config', safeSchoolId), updated, { merge: true });
        }
    } catch (e) {
        console.error('Firestore save manual level failed:', e);
    }

    return updated;
};

export const saveMitAssignment = async (
    schoolId: string,
    assignment: Omit<MitAssignmentRecord, 'id' | 'schoolId' | 'createdAt'>
): Promise<MitSchoolAnalyticsConfig> => {
    const safeSchoolId = schoolId || 'default';
    const current = await getSchoolMitAnalyticsConfig(safeSchoolId);
    const newRecord: MitAssignmentRecord = {
        ...assignment,
        id: `mit_assign_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        schoolId: safeSchoolId,
        createdAt: new Date().toISOString()
    };

    const updated: MitSchoolAnalyticsConfig = {
        ...current,
        assignments: [newRecord, ...current.assignments].slice(0, 200)
    };

    try {
        localStorage.setItem(`${LOCAL_CONFIG_PREFIX}${safeSchoolId}`, JSON.stringify(updated));
    } catch {}

    try {
        if (db) {
            await setDoc(doc(db, 'mit_analytics_config', safeSchoolId), updated, { merge: true });
        }
    } catch (e) {
        console.error('Firestore save assignment failed:', e);
    }

    return updated;
};
