import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
    Users,
    TrendingUp,
    AlertTriangle,
    BookOpen,
    Brain,
    Map as MapIcon,
    Send,
    Save,
    Search,
    RefreshCw,
    CheckCircle2,
    Clock,
    Award
} from 'lucide-react';
import { MIT_CURRICULUM } from '../../../data/mitCurriculum';
import { getCustomExamSubmissions } from '../../../services/customMitExamService';
import { CustomMitExamResult } from '../../../types/customMitExam';
import {
    getDiagnosticReports,
    getMentalMathResults,
    getSchoolMitAnalyticsConfig,
    getStudySessions,
    MitAssignmentRecord,
    MitDiagnosticReportRecord,
    MitMentalMathRecord,
    MitSchoolAnalyticsConfig,
    MitStudySessionRecord,
    saveMitAssignment,
    saveStudentManualLevel
} from '../../../services/mitAnalyticsService';
import {
    extractStudentNoAndName,
    formatClassLabel,
    isSameStudent,
    normStudentIdentityStr
} from '../../../lib/utils';

interface WeakTopicSummary {
    topic: string;
    wrongCount: number;
    avgDurationSec: number | null;
    source: string;
    detail?: string;
}

interface RealMitStudentAnalytics {
    id: string;
    key: string;
    name: string;
    className: string;
    classLabel: string;
    grade: 5 | 6 | 7 | 8;
    score: number | null;
    avgTimeSec: number | null;
    calcLevel: '1' | '2' | '3' | '4' | null;
    manualLevel: '1' | '2' | '3' | '4' | null;
    effectiveLevel: '1' | '2' | '3' | '4' | null;
    weakTopics: WeakTopicSummary[];
    totalSolved: number;
    weeklySolved: number;
    examCount: number;
    studyCount: number;
    mentalCount: number;
    recentExams: Array<{
        id: string;
        title: string;
        score: number;
        correct: number;
        total: number;
        dateLabel: string;
        durationSec: number;
        typeLabel: string;
    }>;
    assignments: MitAssignmentRecord[];
}

const MENTAL_DRILLS_BY_GRADE: Record<5 | 6 | 7 | 8, string[]> = {
    5: [
        'Çarpım Tablosu (2–9) Hız Antrenmanı',
        '2 Basamaklı Zihinden Toplama & Çıkarma',
        '2 Basamaklı Çarpma',
        '3 Basamaklı Toplama',
        'Kesir ve Yüzde Temel Hesapları'
    ],
    6: [
        'Üslü Nicelikler (Kare & Küp)',
        'Kesirlerle Zihinden İşlem',
        'Ondalık Çarpma & Bölme',
        '2 Basamaklı Çarpma',
        '3 Basamaklı Toplama'
    ],
    7: [
        'Tam Sayılarda İşaretli İşlemler',
        'Rasyonel Sayılarda Hızlı İşlem',
        'Yüzde & Orantı Hesabı',
        'Üslü Sayı Değerleri',
        '2 Basamaklı Çarpma'
    ],
    8: [
        'Tam Kare Kökler (√4 – √400)',
        'Köklü Çarpma, Bölme & Toplama',
        'Üslü İşlem Kuralları',
        'Negatif Taban ve Parantez',
        '2 Basamaklı Çarpma'
    ]
};

const parseGradeFromClass = (cls: string): 5 | 6 | 7 | 8 => {
    const match = String(cls || '').trim().match(/^([5-8])/);
    if (match) {
        const n = Number(match[1]);
        if (n === 5 || n === 6 || n === 7 || n === 8) return n;
    }
    return 8;
};

const parseRecordTimestampMs = (iso?: string, fallbackStr?: string): number | null => {
    if (iso) {
        const ms = Date.parse(iso);
        if (!Number.isNaN(ms)) return ms;
    }
    if (fallbackStr) {
        const trMatch = String(fallbackStr).match(/(\d{1,2})[./](\d{1,2})[./](\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
        if (trMatch) {
            const d = Number(trMatch[1]);
            const m = Number(trMatch[2]) - 1;
            const y = Number(trMatch[3]);
            const hh = Number(trMatch[4] || 12);
            const mm = Number(trMatch[5] || 0);
            const ms = new Date(y, m, d, hh, mm).getTime();
            if (!Number.isNaN(ms)) return ms;
        }
        const direct = Date.parse(fallbackStr);
        if (!Number.isNaN(direct)) return direct;
    }
    return null;
};

const LEVEL_NAMES: Record<string, string> = {
    '1': 'Seviye 1 (Temel)',
    '2': 'Seviye 2 (Gelişen)',
    '3': 'Seviye 3 (Yetkin)',
    '4': 'Seviye 4 (İleri)'
};

export const AnalyticsDashboard = ({ state, actions }: { state?: any; actions?: any }) => {
    const schoolId: string = state?.activeSchoolId || 'default';
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [classFilter, setClassFilter] = useState<string>('ALL');

    const [assignMode, setAssignMode] = useState<'topic' | 'practice' | null>(null);
    const [assignItem, setAssignItem] = useState<string>('');
    const [assignDifficulty, setAssignDifficulty] = useState<'kolay' | 'orta' | 'zor'>('orta');
    const [manualLevel, setManualLevel] = useState<string>('1');

    const [loading, setLoading] = useState(true);
    const [savingLevel, setSavingLevel] = useState(false);
    const [savingAssign, setSavingAssign] = useState(false);
    const [inlineFeedback, setInlineFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

    const [customResults, setCustomResults] = useState<CustomMitExamResult[]>([]);
    const [diagnosticReports, setDiagnosticReports] = useState<MitDiagnosticReportRecord[]>([]);
    const [studySessions, setStudySessions] = useState<MitStudySessionRecord[]>([]);
    const [mentalResults, setMentalResults] = useState<MitMentalMathRecord[]>([]);
    const [analyticsConfig, setAnalyticsConfig] = useState<MitSchoolAnalyticsConfig>({
        manualLevels: {},
        assignments: []
    });

    const loadAllData = async () => {
        setLoading(true);
        try {
            const [custom, diag, study, mental, cfg] = await Promise.all([
                getCustomExamSubmissions(),
                getDiagnosticReports(schoolId),
                getStudySessions(schoolId),
                getMentalMathResults(schoolId),
                getSchoolMitAnalyticsConfig(schoolId)
            ]);
            setCustomResults(custom.filter(r => !r.schoolId || r.schoolId === schoolId));
            setDiagnosticReports(diag);
            setStudySessions(study);
            setMentalResults(mental);
            setAnalyticsConfig(cfg);
        } catch (err) {
            console.error('Error loading M.I.T analytics data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadAllData();
    }, [schoolId]);

    // Sync local class filter if global top-bar class filter is changed
    useEffect(() => {
        if (state?.selectedClass) {
            setClassFilter(state.selectedClass);
        } else {
            setClassFilter('ALL');
        }
    }, [state?.selectedClass]);

    const rawClasses: Record<string, string[]> = useMemo(() => {
        const archive = state?.viewingAcademicYear && state?.viewingAcademicYear !== state?.activeAcademicYear
            ? state?.academicArchives?.[state.viewingAcademicYear]?.classes
            : null;
        return archive || state?.classes || {};
    }, [state?.classes, state?.viewingAcademicYear, state?.activeAcademicYear, state?.academicArchives]);

    const activeClassList = useMemo(() => {
        const order: string[] = Array.isArray(state?.classOrder) ? state.classOrder : [];
        const keys = Object.keys(rawClasses || {}).filter(cls => {
            const norm = cls.toLowerCase();
            return norm !== 'hafızlık havuzu' && norm !== 'hafizlik havuzu' && norm !== 'nakil gidenler';
        });
        return keys.sort((a, b) => {
            const ia = order.indexOf(a);
            const ib = order.indexOf(b);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return a.localeCompare(b, 'tr');
        });
    }, [rawClasses, state?.classOrder]);

    const allStudentsAnalytics = useMemo<RealMitStudentAnalytics[]>(() => {
        const studentUsers = (Array.isArray(state?.users) ? state.users : []).filter(
            (u: any) => u && (u.role === 'student' || u.role === 'öğrenci')
        );
        const nowMs = Date.now();
        const weekAgoMs = nowMs - 7 * 24 * 60 * 60 * 1000;
        const seenKeys = new Set<string>();
        const list: RealMitStudentAnalytics[] = [];

        const normCls = (c?: string) => String(c || '').replace(/[\s\-_/]/g, '').toLowerCase();

        activeClassList.forEach(clsName => {
            const classStudents = Array.isArray(rawClasses[clsName]) ? rawClasses[clsName] : [];
            classStudents.forEach(rawName => {
                const fullName = String(rawName || '').trim();
                if (!fullName) return;

                const parsedId = extractStudentNoAndName(fullName);
                const pureNorm = normStudentIdentityStr(parsedId.name);
                const dedupeKey = parsedId.no ? `${parsedId.no}_${pureNorm}` : normStudentIdentityStr(fullName);
                if (!dedupeKey || seenKeys.has(dedupeKey)) return;

                const matchedUser = studentUsers.find((u: any) => isSameStudent(u.name || '', fullName));
                const attendanceStatus = actions?.getStudentAttendanceStatus
                    ? actions.getStudentAttendanceStatus(fullName, matchedUser)
                    : state?.studentAttendanceStatuses?.[fullName] || matchedUser?.attendanceStatus || 'Devam Eden';

                if (
                    attendanceStatus === 'Başka Okula Nakil' ||
                    attendanceStatus === 'Sürekli Devamsız' ||
                    attendanceStatus === 'Kayıt Dondurdu'
                ) {
                    return;
                }

                seenKeys.add(dedupeKey);
                const studentKey = normStudentIdentityStr(fullName);
                const grade = parseGradeFromClass(clsName);

                // Match student's custom exam results
                const myCustom = customResults.filter(r => isSameStudent(r.studentName, fullName));
                const myDiag = diagnosticReports.filter(r => isSameStudent(r.studentName, fullName));
                const myStudy = studySessions.filter(r => isSameStudent(r.studentName, fullName));
                const myMental = mentalResults.filter(r => isSameStudent(r.studentName, fullName));

                let totalSolved = 0;
                let weeklySolved = 0;
                const examScores: number[] = [];
                const timeSamples: number[] = [];
                const weakTopicMap = new Map<string, { wrong: number; durSum: number; durCount: number; source: string; detail?: string }>();
                const recentExams: RealMitStudentAnalytics['recentExams'] = [];

                myCustom.forEach(r => {
                    const qCount = r.totalQuestions || (r.answers ? r.answers.length : 0);
                    totalSolved += qCount;
                    const ts = parseRecordTimestampMs(r.completedAtIso, r.completedAt);
                    if (ts && ts >= weekAgoMs) weeklySolved += qCount;
                    if (typeof r.score === 'number') examScores.push(r.score);
                    if (qCount > 0 && r.timeSpentSeconds > 0) {
                        timeSamples.push(r.timeSpentSeconds / qCount);
                    }

                    (r.answers || []).forEach(ans => {
                        if (!ans.isCorrect) {
                            const topicName = ans.learningArea || ans.outcomeDescription || r.examTitle;
                            const prev = weakTopicMap.get(topicName) || {
                                wrong: 0,
                                durSum: 0,
                                durCount: 0,
                                source: 'Öğretmen Sınavı',
                                detail: ans.distractorDiagnose || ans.outcomeDescription
                            };
                            prev.wrong += 1;
                            if (ans.durationSec > 0) {
                                prev.durSum += ans.durationSec;
                                prev.durCount += 1;
                            }
                            weakTopicMap.set(topicName, prev);
                        }
                    });

                    recentExams.push({
                        id: r.id,
                        title: r.examTitle,
                        score: r.score,
                        correct: r.correctCount,
                        total: qCount,
                        dateLabel: r.completedAt || '—',
                        durationSec: r.timeSpentSeconds || 0,
                        typeLabel: 'Öğretmen Sınavı'
                    });
                });

                myDiag.forEach(r => {
                    const qCount = r.totalQuestions || 20;
                    totalSolved += qCount;
                    const ts = parseRecordTimestampMs(r.timestampIso, r.completedAt);
                    if (ts && ts >= weekAgoMs) weeklySolved += qCount;
                    if (typeof r.successRate === 'number') examScores.push(r.successRate);
                    if (r.averageTimeSec > 0) timeSamples.push(r.averageTimeSec);

                    (r.weakTopics || []).forEach(wt => {
                        const prev = weakTopicMap.get(wt) || {
                            wrong: 0,
                            durSum: 0,
                            durCount: 0,
                            source: 'Seviye Tespit'
                        };
                        prev.wrong += 1;
                        if (r.averageTimeSec > 0) {
                            prev.durSum += r.averageTimeSec;
                            prev.durCount += 1;
                        }
                        weakTopicMap.set(wt, prev);
                    });

                    recentExams.push({
                        id: r.id,
                        title: r.testTitle,
                        score: r.successRate,
                        correct: r.correctCount,
                        total: qCount,
                        dateLabel: r.completedAt || '—',
                        durationSec: (r.averageTimeSec || 0) * qCount,
                        typeLabel: `Seviye Tespit (Sv.${r.level})`
                    });
                });

                let studyCorrect = 0;
                let studyTotal = 0;
                myStudy.forEach(r => {
                    const qCount = r.totalQuestions || 7;
                    totalSolved += qCount;
                    studyTotal += qCount;
                    studyCorrect += r.score || 0;
                    const ts = parseRecordTimestampMs(r.timestampIso);
                    if (ts && ts >= weekAgoMs) weeklySolved += qCount;

                    const pct = qCount > 0 ? Math.round(((r.score || 0) / qCount) * 100) : 0;
                    if (pct < 70 && r.topic) {
                        const prev = weakTopicMap.get(r.topic) || {
                            wrong: 0,
                            durSum: 0,
                            durCount: 0,
                            source: 'Çalışma Odası'
                        };
                        prev.wrong += Math.max(1, qCount - (r.score || 0));
                        weakTopicMap.set(r.topic, prev);
                    }

                    recentExams.push({
                        id: r.id,
                        title: `${r.topic} (${r.difficulty})`,
                        score: pct,
                        correct: r.score || 0,
                        total: qCount,
                        dateLabel: new Date(r.timestampIso).toLocaleDateString('tr-TR'),
                        durationSec: 0,
                        typeLabel: 'Çalışma Odası'
                    });
                });

                let mentalCorrect = 0;
                myMental.forEach(r => {
                    totalSolved += 1;
                    if (r.correct) mentalCorrect += 1;
                    const ts = parseRecordTimestampMs(r.timestampIso);
                    if (ts && ts >= weekAgoMs) weeklySolved += 1;
                    if (r.durationSec > 0) timeSamples.push(r.durationSec);

                    if ((!r.correct || r.perf === 'Geliştirilmesi Gereken') && r.category) {
                        const prev = weakTopicMap.get(r.category) || {
                            wrong: 0,
                            durSum: 0,
                            durCount: 0,
                            source: 'Zihinden İşlem'
                        };
                        if (!r.correct) prev.wrong += 1;
                        if (r.durationSec > 0) {
                            prev.durSum += r.durationSec;
                            prev.durCount += 1;
                        }
                        weakTopicMap.set(r.category, prev);
                    }
                });

                // Calculate overall score (prefer formal exam scores; fallback to study+mental accuracy)
                let score: number | null = null;
                if (examScores.length > 0) {
                    score = Math.round(examScores.reduce((a, b) => a + b, 0) / examScores.length);
                } else if (studyTotal + myMental.length > 0) {
                    score = Math.round(((studyCorrect + mentalCorrect) / (studyTotal + myMental.length)) * 100);
                }

                const avgTimeSec = timeSamples.length > 0
                    ? Math.round(timeSamples.reduce((a, b) => a + b, 0) / timeSamples.length)
                    : null;

                let calcLevel: '1' | '2' | '3' | '4' | null = null;
                if (myDiag.length > 0 && examScores.length === myDiag.length) {
                    calcLevel = String(myDiag[0].level) as '1' | '2' | '3' | '4';
                } else if (score !== null) {
                    if (score >= 85) calcLevel = '4';
                    else if (score >= 70) calcLevel = '3';
                    else if (score >= 50) calcLevel = '2';
                    else calcLevel = '1';
                }

                const override =
                    analyticsConfig.manualLevels?.[studentKey] ||
                    analyticsConfig.manualLevels?.[fullName];
                const manualLvl = override?.manualLevel || null;
                const effectiveLevel = manualLvl || calcLevel;

                const weakTopics: WeakTopicSummary[] = Array.from(weakTopicMap.entries())
                    .map(([topic, info]) => ({
                        topic,
                        wrongCount: info.wrong,
                        avgDurationSec: info.durCount > 0 ? Math.round(info.durSum / info.durCount) : null,
                        source: info.source,
                        detail: info.detail
                    }))
                    .sort((a, b) => b.wrongCount - a.wrongCount);

                const studentAssignments = (analyticsConfig.assignments || []).filter(a => {
                    if (a.targetType === 'student' && a.targetStudentName) {
                        return isSameStudent(a.targetStudentName, fullName);
                    }
                    if (a.targetType === 'class' && a.targetClass) {
                        return normCls(a.targetClass) === normCls(clsName);
                    }
                    return false;
                });

                list.push({
                    id: fullName,
                    key: studentKey,
                    name: fullName,
                    className: clsName,
                    classLabel: formatClassLabel(clsName),
                    grade,
                    score,
                    avgTimeSec,
                    calcLevel,
                    manualLevel: manualLvl,
                    effectiveLevel,
                    weakTopics,
                    totalSolved,
                    weeklySolved,
                    examCount: myCustom.length + myDiag.length,
                    studyCount: myStudy.length,
                    mentalCount: myMental.length,
                    recentExams,
                    assignments: studentAssignments
                });
            });
        });

        return list;
    }, [
        activeClassList,
        rawClasses,
        state?.users,
        state?.studentAttendanceStatuses,
        actions,
        customResults,
        diagnosticReports,
        studySessions,
        mentalResults,
        analyticsConfig
    ]);

    const filteredStudents = useMemo(() => {
        const q = normStudentIdentityStr(searchQuery);
        return allStudentsAnalytics.filter(s => {
            if (classFilter !== 'ALL' && s.className !== classFilter) return false;
            if (q) {
                const nameNorm = normStudentIdentityStr(s.name);
                const clsNorm = normStudentIdentityStr(s.classLabel);
                if (!nameNorm.includes(q) && !clsNorm.includes(q)) return false;
            }
            return true;
        });
    }, [allStudentsAnalytics, classFilter, searchQuery]);

    // Auto-select matching global selectedStudent or keep current selection valid
    useEffect(() => {
        if (state?.selectedStudent) {
            const match = allStudentsAnalytics.find(s => isSameStudent(s.name, state.selectedStudent));
            if (match) {
                setSelectedStudentId(match.id);
                setManualLevel(match.effectiveLevel || '1');
                return;
            }
        }
        if (selectedStudentId) {
            const stillExists = filteredStudents.find(s => s.id === selectedStudentId);
            if (!stillExists && filteredStudents.length > 0) {
                setSelectedStudentId(filteredStudents[0].id);
                setManualLevel(filteredStudents[0].effectiveLevel || '1');
            } else if (!stillExists) {
                setSelectedStudentId(null);
            }
        } else if (filteredStudents.length > 0) {
            setSelectedStudentId(filteredStudents[0].id);
            setManualLevel(filteredStudents[0].effectiveLevel || '1');
        }
    }, [state?.selectedStudent, filteredStudents, allStudentsAnalytics]);

    const selectedStudent = useMemo(
        () => allStudentsAnalytics.find(s => s.id === selectedStudentId) || null,
        [allStudentsAnalytics, selectedStudentId]
    );

    // Real KPI calculations across filteredStudents
    const kpiMetrics = useMemo(() => {
        const totalStudents = filteredStudents.length;
        const assessed = filteredStudents.filter(s => s.score !== null);
        const classAvg = assessed.length > 0
            ? Math.round(assessed.reduce((sum, s) => sum + (s.score || 0), 0) / assessed.length)
            : null;
        const level1Count = filteredStudents.filter(s => s.effectiveLevel === '1').length;
        const weeklyQuestions = filteredStudents.reduce((sum, s) => sum + s.weeklySolved, 0);
        return {
            totalStudents,
            assessedCount: assessed.length,
            classAvg,
            level1Count,
            weeklyQuestions
        };
    }, [filteredStudents]);

    // Available options for Konu Ata / Antrenman Ata based on selected student's grade & weak topics
    const assignOptions = useMemo(() => {
        if (!selectedStudent) return [];
        if (assignMode === 'practice') {
            return MENTAL_DRILLS_BY_GRADE[selectedStudent.grade] || MENTAL_DRILLS_BY_GRADE[8];
        }
        const weakNames = selectedStudent.weakTopics.map(w => w.topic);
        const gradeTopics = (MIT_CURRICULUM[selectedStudent.grade] || []).flatMap(area => area.topics);
        const combined = [...weakNames, ...gradeTopics];
        return Array.from(new Set(combined));
    }, [selectedStudent, assignMode]);

    useEffect(() => {
        if (assignMode && assignOptions.length > 0) {
            setAssignItem(assignOptions[0]);
        }
    }, [assignMode, assignOptions]);

    const showNotice = (msg: string, type: 'success' | 'error' = 'success') => {
        setInlineFeedback({ type, msg });
        actions?.showToast?.(msg, type);
        setTimeout(() => setInlineFeedback(null), 4000);
    };

    const handleSelectStudent = (s: RealMitStudentAnalytics) => {
        setSelectedStudentId(s.id);
        setManualLevel(s.effectiveLevel || '1');
        setAssignMode(null);
    };

    const handleOpenAssign = (mode: 'topic' | 'practice', prefillTopic?: string) => {
        setAssignMode(mode);
        if (prefillTopic) {
            setAssignItem(prefillTopic);
        }
    };

    const handleAssign = async () => {
        if (!selectedStudent || !assignMode || !assignItem) return;
        setSavingAssign(true);
        try {
            const updatedConfig = await saveMitAssignment(schoolId, {
                targetType: 'student',
                targetStudentName: selectedStudent.name,
                assignMode,
                itemTitle: assignItem,
                ...(assignMode === 'topic' ? { difficulty: assignDifficulty } : {}),
                assignedBy: state?.currentUser?.name || 'Öğretmen'
            });
            setAnalyticsConfig(updatedConfig);
            setAssignMode(null);
            showNotice(`${selectedStudent.name} için "${assignItem}" çalışması başarıyla atandı.`, 'success');
        } catch {
            showNotice('Atama kaydedilirken bir hata oluştu.', 'error');
        } finally {
            setSavingAssign(false);
        }
    };

    const handleLevelSave = async () => {
        if (!selectedStudent || !['1', '2', '3', '4'].includes(manualLevel)) return;
        setSavingLevel(true);
        try {
            const updatedConfig = await saveStudentManualLevel(schoolId, {
                studentKey: selectedStudent.key,
                studentName: selectedStudent.name,
                manualLevel: manualLevel as '1' | '2' | '3' | '4',
                updatedAt: new Date().toISOString(),
                updatedBy: state?.currentUser?.name || 'Öğretmen'
            });
            setAnalyticsConfig(updatedConfig);
            showNotice(`${selectedStudent.name} için Seviye ${manualLevel} kaydedildi.`, 'success');
        } catch {
            showNotice('Manuel seviye kaydedilirken bir hata oluştu.', 'error');
        } finally {
            setSavingLevel(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col space-y-6">
            {inlineFeedback && (
                <div className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm border ${
                    inlineFeedback.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                    <CheckCircle2 size={16} />
                    <span>{inlineFeedback.msg}</span>
                </div>
            )}

            {/* KPI Cards (Real Data) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Toplam Öğrenci</div>
                        <div className="text-2xl font-black text-slate-800">{kpiMetrics.totalStudents}</div>
                        <div className="text-[11px] font-medium text-slate-400">
                            {classFilter === 'ALL' ? 'Tüm aktif sınıflar' : `${formatClassLabel(classFilter)} sınıfı`}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Sınıf Ortalaması</div>
                        <div className="text-2xl font-black text-slate-800">
                            {kpiMetrics.classAvg !== null ? `%${kpiMetrics.classAvg}` : 'Veri Yok'}
                        </div>
                        <div className="text-[11px] font-medium text-slate-400">
                            {kpiMetrics.assessedCount} / {kpiMetrics.totalStudents} öğrenci değerlendirildi
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Kritik Seviye 1</div>
                        <div className="text-2xl font-black text-slate-800">{kpiMetrics.level1Count} Öğrenci</div>
                        <div className="text-[11px] font-medium text-slate-400">Destek gerektirenler</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <Brain size={24} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Antrenman (Haftalık)</div>
                        <div className="text-2xl font-black text-slate-800">
                            {kpiMetrics.weeklyQuestions.toLocaleString('tr-TR')} Soru
                        </div>
                        <div className="text-[11px] font-medium text-slate-400">Son 7 günlük çözüm</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 min-h-[540px]">
                {/* Students List */}
                <div className="w-full lg:w-1/3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[680px]">
                    <div className="p-5 border-b border-slate-100 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-black text-slate-800">
                                Öğrenci Listesi ({filteredStudents.length})
                            </h3>
                            <button
                                type="button"
                                onClick={() => loadAllData()}
                                disabled={loading}
                                title="Verileri Yenile"
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Öğrenci adı veya no ara..."
                                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400"
                                />
                            </div>
                            <select
                                value={classFilter}
                                onChange={e => setClassFilter(e.target.value)}
                                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-indigo-400"
                            >
                                <option value="ALL">Tüm Sınıflar</option>
                                {activeClassList.map(cls => (
                                    <option key={cls} value={cls}>{formatClassLabel(cls)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-2 space-y-1.5">
                        {filteredStudents.length === 0 ? (
                            <div className="p-8 text-center text-xs font-semibold text-slate-400">
                                Seçili kriterlere uygun aktif öğrenci bulunamadı.
                            </div>
                        ) : (
                            filteredStudents.map(s => {
                                const isSelected = selectedStudent?.id === s.id;
                                return (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => handleSelectStudent(s)}
                                        className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer ${
                                            isSelected
                                                ? 'bg-indigo-50 border border-indigo-200 shadow-sm'
                                                : 'hover:bg-slate-50 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center gap-2 mb-1">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className={`font-bold text-sm truncate ${isSelected ? 'text-indigo-800' : 'text-slate-700'}`}>
                                                    {s.name}
                                                </span>
                                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-black shrink-0">
                                                    {s.classLabel}
                                                </span>
                                            </div>
                                            <div className={`px-2 py-0.5 rounded-md text-[11px] font-bold border shrink-0 ${
                                                s.effectiveLevel === '1'
                                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                    : s.effectiveLevel === '4'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : s.effectiveLevel
                                                    ? 'bg-white text-slate-600 border-slate-200'
                                                    : 'bg-slate-50 text-slate-400 border-slate-200'
                                            }`}>
                                                {s.effectiveLevel ? `Seviye ${s.effectiveLevel}` : 'Test Yok'}
                                            </div>
                                        </div>
                                        <div className="text-xs font-medium text-slate-400 flex items-center gap-2">
                                            <span>Skor: {s.score !== null ? `%${s.score}` : '—'}</span>
                                            <span>•</span>
                                            <span>Süre: {s.avgTimeSec !== null ? `Ort. ${s.avgTimeSec}sn` : '—'}</span>
                                            {s.totalSolved > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>{s.totalSolved} soru</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Student Details */}
                <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
                    {selectedStudent ? (
                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">{selectedStudent.name}</h2>
                                        <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-black">
                                            {selectedStudent.classLabel}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-medium text-sm mt-1">
                                        {selectedStudent.grade}. Sınıf • M.İ.T Gelişim Raporu
                                        {selectedStudent.totalSolved > 0 ? ` • Toplam ${selectedStudent.totalSolved} soru çözüldü` : ''}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenAssign('topic')}
                                        className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                        <BookOpen size={16} /> Konu Ata
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleOpenAssign('practice')}
                                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                        <Brain size={16} /> Antrenman Ata
                                    </button>
                                </div>
                            </div>

                            {assignMode && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-slate-800">
                                            {assignMode === 'topic' ? 'Konu Çalışması Ata' : 'Zihinsel Antrenman Ata'}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setAssignMode(null)}
                                            className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                                        >
                                            İptal
                                        </button>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                                        <select
                                            value={assignItem}
                                            onChange={e => setAssignItem(e.target.value)}
                                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none"
                                        >
                                            {assignOptions.map((opt, idx) => {
                                                const isWeak = assignMode === 'topic' && selectedStudent.weakTopics.some(w => w.topic === opt);
                                                return (
                                                    <option key={`${opt}_${idx}`} value={opt}>
                                                        {opt}{isWeak ? ' (Önerilen - Zayıf Kazanım)' : ''}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {assignMode === 'topic' && (
                                            <select
                                                value={assignDifficulty}
                                                onChange={e => setAssignDifficulty(e.target.value as 'kolay' | 'orta' | 'zor')}
                                                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 outline-none"
                                            >
                                                <option value="kolay">Kolay</option>
                                                <option value="orta">Orta</option>
                                                <option value="zor">Zor</option>
                                            </select>
                                        )}
                                        <button
                                            type="button"
                                            disabled={savingAssign}
                                            onClick={handleAssign}
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                                        >
                                            <Send size={16} /> {savingAssign ? 'Kaydediliyor...' : 'Gönder'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                    <div className="text-xs font-bold text-indigo-500 uppercase mb-2">Genel Durum Skoru</div>
                                    <div className="text-4xl font-black text-indigo-700 mb-2">
                                        {selectedStudent.score !== null ? (
                                            <>
                                                {selectedStudent.score} <span className="text-xl text-indigo-400">/ 100</span>
                                            </>
                                        ) : (
                                            <span className="text-2xl text-indigo-400">Veri Yok</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-indigo-700/80 font-medium">
                                        {selectedStudent.score !== null
                                            ? `${selectedStudent.examCount} sınav, ${selectedStudent.studyCount} çalışma seti ve ${selectedStudent.mentalCount} zihinden işlem sonucuna göre hesaplandı.`
                                            : 'Bu öğrenci henüz M.İ.T sınavı, çalışma seti veya zihinden işlem tamamlamadı.'}
                                    </p>
                                </div>

                                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                    <div className="text-xs font-bold text-amber-600 uppercase mb-3">Manuel Seviye Ayarı</div>
                                    <div className="flex items-end gap-3">
                                        <div className="flex-1">
                                            <p className="text-xs text-amber-800 mb-1.5">
                                                Oto: <b>{selectedStudent.calcLevel ? `Seviye ${selectedStudent.calcLevel}` : 'Henüz Test Yok'}</b>
                                                {selectedStudent.manualLevel ? ` • Kayıtlı Manuel: Seviye ${selectedStudent.manualLevel}` : ''}
                                            </p>
                                            <select
                                                value={manualLevel}
                                                onChange={e => setManualLevel(e.target.value)}
                                                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-sm font-bold text-amber-900 outline-none"
                                            >
                                                <option value="1">{LEVEL_NAMES['1']}</option>
                                                <option value="2">{LEVEL_NAMES['2']}</option>
                                                <option value="3">{LEVEL_NAMES['3']}</option>
                                                <option value="4">{LEVEL_NAMES['4']}</option>
                                            </select>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={savingLevel}
                                            onClick={handleLevelSave}
                                            title="Manuel Seviyeyi Kaydet"
                                            className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5 font-bold text-xs"
                                        >
                                            <Save size={18} /> Kaydet
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Weak Topics */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <MapIcon size={20} className="text-indigo-600" /> Zayıf Kazanımlar &amp; Öneriler
                                </h3>
                                {selectedStudent.weakTopics.length === 0 ? (
                                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-xs font-semibold text-slate-500">
                                        {selectedStudent.totalSolved > 0
                                            ? 'Öğrencinin mevcut M.İ.T çözümlerinde öne çıkan zayıf kazanım tespit edilmedi.'
                                            : 'Öğrenci M.İ.T sınavı veya alıştırma çözdükçe hatalı/yavaş kaldığı kazanımlar burada otomatik listelenecektir.'}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {selectedStudent.weakTopics.map((wt, idx) => (
                                            <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                <div>
                                                    <div className="font-bold text-slate-800 text-sm">{wt.topic}</div>
                                                    <div className="text-xs text-rose-600 font-medium mt-1">
                                                        Kaynak: {wt.source} • Hatalı/Eksik: {wt.wrongCount} soru
                                                        {wt.avgDurationSec !== null ? ` • Ort. Süre: ${wt.avgDurationSec}sn` : ''}
                                                    </div>
                                                    {wt.detail && wt.detail !== 'Cevaplanmadı' && (
                                                        <div className="text-[11px] text-slate-500 mt-1">{wt.detail}</div>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenAssign('topic', wt.topic)}
                                                    className="text-indigo-600 hover:text-indigo-800 font-bold text-xs bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
                                                >
                                                    Çalışma Ata
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recent Exams & Teacher Assignments */}
                            {(selectedStudent.recentExams.length > 0 || selectedStudent.assignments.length > 0) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {selectedStudent.recentExams.length > 0 && (
                                        <div className="space-y-2.5">
                                            <h4 className="text-sm font-black text-slate-700 flex items-center gap-1.5">
                                                <Award size={16} className="text-emerald-600" /> Tamamlanan Sınav &amp; Setler ({selectedStudent.recentExams.length})
                                            </h4>
                                            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                                {selectedStudent.recentExams.slice(0, 8).map(ex => (
                                                    <div key={ex.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center gap-2 text-xs">
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-slate-800 truncate">{ex.title}</div>
                                                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                                                <span>{ex.typeLabel}</span>
                                                                <span>•</span>
                                                                <span>{ex.correct}/{ex.total} Doğru</span>
                                                                {ex.durationSec > 0 && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span className="inline-flex items-center gap-0.5"><Clock size={11} /> {ex.durationSec}sn</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-lg font-black shrink-0 ${
                                                            ex.score >= 70 ? 'bg-emerald-100 text-emerald-800' :
                                                            ex.score >= 50 ? 'bg-amber-100 text-amber-800' :
                                                            'bg-rose-100 text-rose-800'
                                                        }`}>
                                                            %{ex.score}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudent.assignments.length > 0 && (
                                        <div className="space-y-2.5">
                                            <h4 className="text-sm font-black text-slate-700 flex items-center gap-1.5">
                                                <BookOpen size={16} className="text-indigo-600" /> Atanan Çalışmalar ({selectedStudent.assignments.length})
                                            </h4>
                                            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                                {selectedStudent.assignments.slice(0, 8).map(asg => (
                                                    <div key={asg.id} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex justify-between items-center gap-2 text-xs">
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-indigo-950 truncate">{asg.itemTitle}</div>
                                                            <div className="text-[11px] text-indigo-700/80">
                                                                {asg.assignMode === 'topic' ? `Konu Çalışması (${asg.difficulty || 'orta'})` : 'Zihinsel Antrenman'}
                                                                {' • '}
                                                                {new Date(asg.createdAt).toLocaleDateString('tr-TR')}
                                                            </div>
                                                        </div>
                                                        <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-200 text-indigo-700 font-bold text-[10px] shrink-0">
                                                            {asg.targetType === 'class' ? 'Sınıf' : 'Bireysel'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <Users size={64} className="mb-4 opacity-20" />
                            <h3 className="text-xl font-bold">Öğrenci Seçin</h3>
                            <p className="text-sm font-medium mt-2">
                                Detaylı M.İ.T analizlerini ve gerçek sınav performansını görmek için listeden bir öğrenci seçin.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
