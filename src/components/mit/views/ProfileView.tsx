import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Target, Award, Zap } from 'lucide-react';
import { getCustomExamSubmissions } from '../../../services/customMitExamService';
import {
    getDiagnosticReports,
    getMentalMathResults,
    getSchoolMitAnalyticsConfig,
    getStudySessions
} from '../../../services/mitAnalyticsService';
import { isSameStudent, normStudentIdentityStr } from '../../../lib/utils';

const LEVEL_META: Record<number, { title: string; nextTitle: string; desc: string }> = {
    1: {
        title: 'Matematik Çırağı',
        nextTitle: 'Kalfa',
        desc: 'Temel kazanımları ve işlem hızını güçlendirerek Kalfa aşamasına ilerleyebilirsin.'
    },
    2: {
        title: 'Matematik Kalfası',
        nextTitle: 'Usta',
        desc: 'Orta düzey gelişim seviyesindesin. "Usta" unvanına ulaşmak için çalışmalarına devam et.'
    },
    3: {
        title: 'Matematik Ustası',
        nextTitle: 'Uzman',
        desc: 'Kazanımlara hakimiyetin yüksek. Yeni nesil sorularla Uzman seviyesine çok yakınsın.'
    },
    4: {
        title: 'Matematik Uzmanı',
        nextTitle: 'Zirve',
        desc: 'İleri düzey performans gösteriyorsun. Hız ve tutarlılığını koruyarak zirvede kal.'
    }
};

export const ProfileView = ({
    grade,
    showLgsCountdown = false,
    state
}: {
    grade: number;
    showLgsCountdown?: boolean;
    state?: any;
}) => {
    const today = new Date();
    const currentYearLgs = new Date(today.getFullYear(), 5, 5); // June 5
    const lgsDate = today > currentYearLgs ? new Date(today.getFullYear() + 1, 5, 5) : currentYearLgs;
    const daysLeft = Math.max(0, Math.ceil((lgsDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));

    const studentName = state?.currentUser?.name || state?.currentUser?.username || 'Öğrenci';
    const schoolId = state?.activeSchoolId || 'default';

    const [stats, setStats] = useState<{
        solvedCount: number;
        accuracy: number | null;
        level: number;
        mentalCount: number;
    }>({
        solvedCount: 0,
        accuracy: null,
        level: 1,
        mentalCount: 0
    });

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                const [customSubs, diagReps, studySess, mentalRecs, cfg] = await Promise.all([
                    getCustomExamSubmissions(),
                    getDiagnosticReports(schoolId),
                    getStudySessions(schoolId),
                    getMentalMathResults(schoolId),
                    getSchoolMitAnalyticsConfig(schoolId)
                ]);
                if (!active) return;

                const myCustom = customSubs.filter((r) => isSameStudent(r.studentName, studentName));
                const myDiag = diagReps.filter((r) => isSameStudent(r.studentName, studentName));
                const myStudy = studySess.filter((r) => isSameStudent(r.studentName, studentName));
                const myMental = mentalRecs.filter((r) => isSameStudent(r.studentName, studentName));

                let totalSolved = 0;
                let totalCorrect = 0;

                myCustom.forEach((r) => {
                    totalSolved += r.totalQuestions || 0;
                    totalCorrect += r.correctCount || 0;
                });
                myDiag.forEach((r) => {
                    totalSolved += r.totalQuestions || 0;
                    totalCorrect += r.correctCount || 0;
                });
                myStudy.forEach((r) => {
                    totalSolved += r.totalQuestions || 0;
                    totalCorrect += r.score || 0;
                });
                myMental.forEach((r) => {
                    totalSolved += 1;
                    if (r.correct) totalCorrect += 1;
                });

                const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : null;

                let calcLevel = 1;
                if (myDiag.length > 0) {
                    calcLevel = myDiag[0].level;
                } else if (accuracy !== null) {
                    if (accuracy >= 85) calcLevel = 4;
                    else if (accuracy >= 70) calcLevel = 3;
                    else if (accuracy >= 50) calcLevel = 2;
                    else calcLevel = 1;
                }

                const studentKey = normStudentIdentityStr(studentName);
                const override = cfg.manualLevels?.[studentKey] || cfg.manualLevels?.[studentName];
                const effectiveLevel = override ? Number(override.manualLevel) : calcLevel;

                setStats({
                    solvedCount: totalSolved,
                    accuracy,
                    level: effectiveLevel,
                    mentalCount: myMental.length
                });
            } catch {
                // ignore
            }
        };
        load();
        return () => { active = false; };
    }, [studentName, schoolId]);

    const levelMeta = LEVEL_META[stats.level] || LEVEL_META[1];
    const progressPct = stats.level === 4 ? 100 : Math.min(95, Math.max(15, stats.accuracy ?? stats.level * 20));
    const mentalStage = stats.mentalCount >= 100 ? '4. Kademe' : stats.mentalCount >= 50 ? '3. Kademe' : stats.mentalCount >= 15 ? '2. Kademe' : '1. Kademe';

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto">

            {showLgsCountdown && grade === 8 && (
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-lg shadow-emerald-600/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black flex items-center gap-2"><Target size={24}/> LGS Geri Sayım</h2>
                        <p className="text-emerald-100 font-medium opacity-90 mt-1">Hedefe ulaşmak için her gün bir adım daha yaklaş.</p>
                    </div>
                    <div className="flex items-baseline gap-2 bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20">
                        <span className="text-4xl font-black">{daysLeft}</span>
                        <span className="text-emerald-100 font-bold uppercase tracking-widest text-sm">Gün Kaldı</span>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-emerald-200 shrink-0">
                    <Award size={64} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        Seviye {stats.level}
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">{levelMeta.title}</h2>
                    <p className="text-slate-500 font-medium mb-6">{levelMeta.desc}</p>

                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progressPct}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                        <span>{levelMeta.title.replace('Matematik ', '')}</span>
                        <span>{levelMeta.nextTitle}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Çözülen Soru</div>
                        <div className="text-2xl font-black text-slate-800">{stats.solvedCount.toLocaleString('tr-TR')}</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <Target size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Doğruluk Oranı</div>
                        <div className="text-2xl font-black text-slate-800">{stats.accuracy !== null ? `%${stats.accuracy}` : '—'}</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <Zap size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-400 uppercase">Zihinden İşlem</div>
                        <div className="text-2xl font-black text-slate-800">{mentalStage} ({stats.mentalCount})</div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};
