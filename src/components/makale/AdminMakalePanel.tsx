import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
    Upload, FileText, CheckCircle2, ChevronRight, Activity, Target, 
    BookOpen, AlertCircle, Edit3, ShieldAlert, Search, Sparkles, Brain, 
    Table, Clock, HelpCircle, Check, X, Filter, User, Eye, Award, 
    BarChart2, RefreshCw, Send, MessageSquare, Download, CheckSquare, Zap, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_MAKALE_ARTICLES, WORKSHOPS } from '../../data/makaleArticles';
import { ALL_SOZEL_MANTIK_QUESTIONS, SOZEL_MANTIK_ATOLYELER, getSozelMantikAtolyeLabel } from '../../data/sozelMantikIndex';
import { SozelMantikItem } from '../../data/sozelMantikTypes';
import { 
    loadMakaleSubmissions, 
    saveMakaleSubmissions, 
    updateTeacherReview, 
    MakaleSubmission 
} from '../../data/makaleSubmissionsService';

interface AdminMakalePanelProps {
    state: any;
    actions: any;
}

export function AdminMakalePanel({ state, actions }: AdminMakalePanelProps) {
    const [activeTab, setActiveTab] = useState<'library' | 'reports' | 'analytics' | 'sozel_mantik' | 'upload'>('library');
    
    // Submissions State (Live Sync)
    const [submissions, setSubmissions] = useState<MakaleSubmission[]>(() => loadMakaleSubmissions());
    useEffect(() => {
        const handleUpdate = (e: any) => {
            if (e.detail) setSubmissions(e.detail);
            else setSubmissions(loadMakaleSubmissions());
        };
        window.addEventListener('makale_submissions_updated', handleUpdate);
        return () => window.removeEventListener('makale_submissions_updated', handleUpdate);
    }, []);

    // Reports Filters
    const [reportClassFilter, setReportClassFilter] = useState<string>('Tümü');
    const [reportWorkshopFilter, setReportWorkshopFilter] = useState<number>(0);
    const [reportStatusFilter, setReportStatusFilter] = useState<'all' | 'passed' | 'failed' | 'reviewed'>('all');
    const [reportSearchQuery, setReportSearchQuery] = useState<string>('');
    
    // Inspector Modal
    const [selectedSubmissionForInspect, setSelectedSubmissionForInspect] = useState<MakaleSubmission | null>(null);
    const [inspectSection, setInspectSection] = useState<'celdirici' | 'workspace' | 'review'>('celdirici');
    
    // Teacher Review Form State
    const [reviewScore, setReviewScore] = useState<number>(85);
    const [reviewComment, setReviewComment] = useState<string>('');
    const [reviewStatus, setReviewStatus] = useState<'incelendi' | 'onaylandi' | 'telafi_atandi'>('onaylandi');
    const [reviewSavedSuccess, setReviewSavedSuccess] = useState(false);

    // Sync inspection modal review form when selected submission changes
    useEffect(() => {
        if (selectedSubmissionForInspect) {
            setReviewScore(selectedSubmissionForInspect.teacherReview?.score ?? (selectedSubmissionForInspect.isPassed ? 90 : 75));
            setReviewComment(selectedSubmissionForInspect.teacherReview?.comment || '');
            setReviewStatus(selectedSubmissionForInspect.teacherReview?.status || (selectedSubmissionForInspect.isPassed ? 'onaylandi' : 'telafi_atandi'));
            setReviewSavedSuccess(false);
            setInspectSection('celdirici');
        }
    }, [selectedSubmissionForInspect]);

    // Library Tab States
    const [selectedAdminWorkshop, setSelectedAdminWorkshop] = useState<number>(0);
    const [searchLibrary, setSearchLibrary] = useState<string>('');
    const [selectedArticleDetail, setSelectedArticleDetail] = useState<number | null>(null);

    // Sözel Mantık Tab States
    const [selectedLogicAtolye, setSelectedLogicAtolye] = useState<number>(0);
    const [searchLogic, setSearchLogic] = useState<string>('');
    const [selectedLogicDetail, setSelectedLogicDetail] = useState<number | null>(null);

    // Upload Tab States
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Available classes from state or fallback
    const availableClasses = useMemo(() => {
        if (state?.classes && typeof state.classes === 'object') {
            const keys = Object.keys(state.classes);
            if (keys.length > 0) return keys;
        }
        return ['5A', '6A', '7A', '8A'];
    }, [state?.classes]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const res = await fetch('/api/parse-question', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setParsedData(data);
        } catch (error) {
            console.error(error);
            setParsedData({
                questionText: "Yapay zeka, modern eğitim sistemlerinde giderek daha fazla rol oynamaktadır. Bireyselleştirilmiş öğrenme yolları sunarak, öğrencilerin kendi hızlarında ilerlemelerine olanak tanır. Ancak, öğretmen-öğrenci etkileşiminin yerini tamamen alması beklenmemektedir.",
                questionStem: "Bu metne göre aşağıdakilerden hangisi çıkarılamaz?",
                options: [
                    { letter: "A", text: "Yapay zeka eğitime entegre olmaktadır.", type: "Doğru Cevap" },
                    { letter: "B", text: "Öğrenciler kendi hızlarında öğrenebilir.", type: "Kapsam Aşımı" },
                    { letter: "C", text: "Öğretmenlerin yerini tamamen yapay zeka alacaktır.", type: "Ters Mantık" },
                    { letter: "D", text: "Eğitim sistemleri teknolojiye uyum sağlamaktadır.", type: "Çeldirici" }
                ]
            });
        }
        setIsUploading(false);
    };

    const handleSaveReviewAction = () => {
        if (!selectedSubmissionForInspect) return;
        const teacherName = state?.currentUser?.name || state?.currentUser?.username || 'Öğretmen';
        const updated = updateTeacherReview(selectedSubmissionForInspect.id, {
            teacherName,
            score: Number(reviewScore),
            comment: reviewComment,
            status: reviewStatus
        });
        if (updated) {
            setSelectedSubmissionForInspect(updated);
            setReviewSavedSuccess(true);
            setTimeout(() => setReviewSavedSuccess(false), 2500);
            actions?.showToast?.("Öğrenci değerlendirmesi ve geri bildirim notu kaydedildi!", "success");
        }
    };

    const handleAssignRemedial = (sub: MakaleSubmission) => {
        const teacherName = state?.currentUser?.name || 'Öğretmen';
        const updated = updateTeacherReview(sub.id, {
            teacherName,
            score: sub.teacherReview?.score ?? 70,
            comment: (sub.teacherReview?.comment ? sub.teacherReview.comment + " | " : "") + "Çeldirici analizi için telafi antrenmanı atandı.",
            status: 'telafi_atandi'
        });
        if (updated && selectedSubmissionForInspect?.id === sub.id) {
            setSelectedSubmissionForInspect(updated);
        }
        actions?.showToast?.(`${sub.studentName} (${sub.studentClass}) için telafi paragraf görevi başarıyla atandı!`, "success");
    };

    // Filtered submissions
    const filteredSubmissions = useMemo(() => {
        return submissions.filter(s => {
            // Class filter
            if (reportClassFilter !== 'Tümü' && s.studentClass !== reportClassFilter) {
                return false;
            }
            // Workshop filter
            if (reportWorkshopFilter !== 0 && s.workshopId !== reportWorkshopFilter) {
                return false;
            }
            // Status filter
            if (reportStatusFilter === 'passed' && !s.isPassed) return false;
            if (reportStatusFilter === 'failed' && s.isPassed) return false;
            if (reportStatusFilter === 'reviewed' && !s.teacherReview) return false;
            // Search query
            if (reportSearchQuery.trim()) {
                const q = reportSearchQuery.toLowerCase();
                const matchName = s.studentName.toLowerCase().includes(q);
                const matchArticle = s.articleTitle.toLowerCase().includes(q);
                const matchClass = s.studentClass.toLowerCase().includes(q);
                const matchDistractor = (s.distractorType || '').toLowerCase().includes(q);
                if (!matchName && !matchArticle && !matchClass && !matchDistractor) {
                    return false;
                }
            }
            return true;
        });
    }, [submissions, reportClassFilter, reportWorkshopFilter, reportStatusFilter, reportSearchQuery]);

    // Statistics calculations
    const stats = useMemo(() => {
        const total = submissions.length;
        const passedCount = submissions.filter(s => s.isPassed).length;
        const failedCount = submissions.filter(s => !s.isPassed).length;
        const passRate = total > 0 ? Math.round((passedCount / total) * 100) : 0;
        const reviewedCount = submissions.filter(s => s.teacherReview?.status === 'onaylandi' || s.teacherReview?.status === 'incelendi').length;

        // Distractor Breakdown
        const distractorCounts: Record<string, number> = {
            'Ters Mantık': 0,
            'Kapsam Aşımı': 0,
            'Çelişkili Seçenek': 0,
            'Öznel Yorum / Alakasız': 0
        };

        submissions.forEach(s => {
            if (!s.isPassed && s.distractorType) {
                if (s.distractorType.includes('Ters')) distractorCounts['Ters Mantık']++;
                else if (s.distractorType.includes('Kapsam')) distractorCounts['Kapsam Aşımı']++;
                else if (s.distractorType.includes('Çelişkili')) distractorCounts['Çelişkili Seçenek']++;
                else distractorCounts['Öznel Yorum / Alakasız']++;
            }
        });

        // Workshop 1 vs 2
        const ws1 = submissions.filter(s => s.workshopId === 1);
        const ws2 = submissions.filter(s => s.workshopId === 2);
        const ws1PassRate = ws1.length > 0 ? Math.round((ws1.filter(s => s.isPassed).length / ws1.length) * 100) : 0;
        const ws2PassRate = ws2.length > 0 ? Math.round((ws2.filter(s => s.isPassed).length / ws2.length) * 100) : 0;

        return {
            total,
            passedCount,
            failedCount,
            passRate,
            reviewedCount,
            distractorCounts,
            ws1Count: ws1.length,
            ws2Count: ws2.length,
            ws1PassRate,
            ws2PassRate
        };
    }, [submissions]);

    // RENDER: Öğrenci Çözüm Raporları Sekmesi
    const renderReports = () => (
        <div className="space-y-6">
            {/* Top Stat Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toplam Çözüm</div>
                        <div className="text-2xl font-black text-slate-800">{stats.total}</div>
                        <div className="text-2xs font-semibold text-slate-500">Öğrenci Analiz Kağıdı</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Başarılı Çözüm</div>
                        <div className="text-2xl font-black text-emerald-600">{stats.passedCount} <span className="text-sm font-bold text-slate-400">(%{stats.passRate})</span></div>
                        <div className="text-2xs font-semibold text-emerald-700">Tam Doğruluk</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Çeldiriciye Takılan</div>
                        <div className="text-2xl font-black text-amber-600">{stats.failedCount} <span className="text-sm font-bold text-slate-400">(%{100 - stats.passRate})</span></div>
                        <div className="text-2xs font-semibold text-amber-700">Tuzağa Düşenler</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Öğretmen İncelemesi</div>
                        <div className="text-2xl font-black text-purple-600">{stats.reviewedCount} / {stats.total}</div>
                        <div className="text-2xs font-semibold text-purple-700">Geri Bildirim Verildi</div>
                    </div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-black text-slate-800 text-sm">Rapor Filtreleri</h4>
                        <span className="text-xs text-slate-400">({filteredSubmissions.length} kayıt listeleniyor)</span>
                    </div>

                    {/* Sınıf Filtresi */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Sınıf:</span>
                        <button
                            onClick={() => setReportClassFilter('Tümü')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                reportClassFilter === 'Tümü' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Tümü
                        </button>
                        {availableClasses.map(cls => (
                            <button
                                key={cls}
                                onClick={() => setReportClassFilter(cls)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                    reportClassFilter === cls ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {cls}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-100 items-center">
                    {/* Search */}
                    <div className="md:col-span-5 relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Öğrenci adı, makale veya çeldirici türü ara..."
                            value={reportSearchQuery}
                            onChange={(e) => setReportSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>

                    {/* Workshop Filter */}
                    <div className="md:col-span-4 flex items-center gap-1.5">
                        <button
                            onClick={() => setReportWorkshopFilter(0)}
                            className={`px-2.5 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                                reportWorkshopFilter === 0 ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Tüm Atölyeler
                        </button>
                        <button
                            onClick={() => setReportWorkshopFilter(1)}
                            className={`px-2.5 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                                reportWorkshopFilter === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Atölye 1 (5-6. Sınıf)
                        </button>
                        <button
                            onClick={() => setReportWorkshopFilter(2)}
                            className={`px-2.5 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                                reportWorkshopFilter === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Atölye 2 (7-8. Sınıf)
                        </button>
                    </div>

                    {/* Status Filter */}
                    <div className="md:col-span-3 flex justify-end gap-1.5">
                        <button
                            onClick={() => setReportStatusFilter('all')}
                            className={`px-2.5 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                                reportStatusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Tüm Sonuçlar
                        </button>
                        <button
                            onClick={() => setReportStatusFilter('passed')}
                            className={`px-2.5 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                                reportStatusFilter === 'passed' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Doğrular
                        </button>
                        <button
                            onClick={() => setReportStatusFilter('failed')}
                            className={`px-2.5 py-1.5 rounded-xl text-2xs font-bold transition-all ${
                                reportStatusFilter === 'failed' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Çeldiriciler
                        </button>
                    </div>
                </div>
            </div>

            {/* Submissions List */}
            {filteredSubmissions.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                    <Search className="w-12 h-12 text-slate-300 mx-auto" />
                    <h4 className="font-bold text-slate-700 text-base">Filtreye uygun çözüm raporu bulunamadı</h4>
                    <p className="text-xs text-slate-500">Lütfen sınıf veya arama filtrelerinizi değiştirin.</p>
                    <button
                        onClick={() => { setReportClassFilter('Tümü'); setReportWorkshopFilter(0); setReportStatusFilter('all'); setReportSearchQuery(''); }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors inline-block"
                    >
                        Filtreleri Sıfırla
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredSubmissions.map(sub => {
                        const article = ALL_MAKALE_ARTICLES.find(a => a.id === sub.articleId);
                        return (
                            <div
                                key={sub.id}
                                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                            >
                                {/* Left: Student and Article Info */}
                                <div className="flex items-start sm:items-center gap-4 flex-1">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                                        sub.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {sub.studentName.charAt(0)}
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-black text-slate-900 text-base">{sub.studentName}</span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-black rounded-lg">
                                                {sub.studentClass}
                                            </span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-2xs font-bold rounded-md border border-indigo-100">
                                                {sub.workshopId === 1 ? 'Atölye 1 (5-6. Sınıf)' : 'Atölye 2 (7-8. Sınıf)'}
                                            </span>
                                            <span className="text-2xs text-slate-400 font-medium">
                                                • {sub.submittedAt}
                                            </span>
                                        </div>

                                        <div className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                                            <span>{sub.articleTitle}</span>
                                            <span className="text-2xs text-slate-400 font-medium">({sub.category})</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                            <span className="text-2xs font-bold text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-slate-400" /> {sub.timeSpentMinutes} dk süre
                                            </span>
                                            <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                                                10 Adımlı Analiz: {sub.workspaceInput.aiScore ? `%${sub.workspaceInput.aiScore} AI Uyumu` : 'Tamamlandı'}
                                            </span>
                                            {sub.wordsLearned && sub.wordsLearned.length > 0 && (
                                                <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                                                    +{sub.wordsLearned.length} Yeni Kelime
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Result Badge & Actions */}
                                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                                    {/* Test Outcome Badge */}
                                    <div className="text-left sm:text-right">
                                        {sub.isPassed ? (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                <span>Doğru Çözüm ({sub.quizSelectedOption.letter} Şıkkı)</span>
                                            </div>
                                        ) : (
                                            <div className="inline-flex flex-col sm:items-end">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-xs font-black">
                                                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                                                    <span>{sub.distractorType || 'Çeldirici'} Tuzağı ({sub.quizSelectedOption.letter} Şıkkı)</span>
                                                </div>
                                                <span className="text-3xs font-bold text-rose-600 mt-0.5">Öğretmen İncelemesi Önerilir</span>
                                            </div>
                                        )}
                                        
                                        {/* Teacher Review Status */}
                                        <div className="mt-1">
                                            {sub.teacherReview ? (
                                                <span className="text-2xs font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                                                    ✓ Not: {sub.teacherReview.score}/100 • {sub.teacherReview.teacherName}
                                                </span>
                                            ) : (
                                                <span className="text-2xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                                                    İnceleme Bekliyor
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedSubmissionForInspect(sub)}
                                            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-colors font-bold text-xs flex items-center gap-1.5 shadow-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Detay & Çeldirici Analizini İncele</span>
                                        </button>
                                        
                                        {!sub.isPassed && (
                                            <button
                                                onClick={() => handleAssignRemedial(sub)}
                                                className="px-3 py-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors font-bold text-xs flex items-center gap-1"
                                                title="Bu öğrenciye telafi antrenmanı ata"
                                            >
                                                <Zap className="w-3.5 h-3.5 text-amber-700" />
                                                <span className="hidden sm:inline">Telafi Ata</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Submission Inspector Modal */}
            {selectedSubmissionForInspect && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 bg-slate-900 text-white flex justify-between items-start">
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className="px-2.5 py-0.5 bg-indigo-500 text-white text-xs font-black rounded-lg">
                                        {selectedSubmissionForInspect.studentClass}
                                    </span>
                                    <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-bold rounded-lg">
                                        {selectedSubmissionForInspect.workshopId === 1 ? 'Atölye 1 (5 ve 6. Sınıf)' : 'Atölye 2 (7 ve 8. Sınıf)'}
                                    </span>
                                    <span className="text-xs text-slate-300 font-medium">
                                        • Çözüm: {selectedSubmissionForInspect.submittedAt}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <span>{selectedSubmissionForInspect.studentName}</span>
                                    <span className="text-sm font-normal text-slate-400">— {selectedSubmissionForInspect.articleTitle}</span>
                                </h3>
                            </div>

                            <button
                                onClick={() => setSelectedSubmissionForInspect(null)}
                                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Inspector Navigation Tabs */}
                        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2">
                            <button
                                onClick={() => setInspectSection('celdirici')}
                                className={`py-3.5 px-4 font-black text-xs border-b-2 flex items-center gap-2 transition-all ${
                                    inspectSection === 'celdirici'
                                        ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl'
                                        : 'border-transparent text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <ShieldAlert className="w-4 h-4 text-amber-600" />
                                <span>Test & Çeldirici Analiz Raporu</span>
                            </button>

                            <button
                                onClick={() => setInspectSection('workspace')}
                                className={`py-3.5 px-4 font-black text-xs border-b-2 flex items-center gap-2 transition-all ${
                                    inspectSection === 'workspace'
                                        ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl'
                                        : 'border-transparent text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <BookOpen className="w-4 h-4 text-indigo-600" />
                                <span>10 Adımlı Analitik Kağıdı ({selectedSubmissionForInspect.workspaceInput.aiScore ? `%${selectedSubmissionForInspect.workspaceInput.aiScore}` : 'Dolduruldu'})</span>
                            </button>

                            <button
                                onClick={() => setInspectSection('review')}
                                className={`py-3.5 px-4 font-black text-xs border-b-2 flex items-center gap-2 transition-all ${
                                    inspectSection === 'review'
                                        ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl'
                                        : 'border-transparent text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <Award className="w-4 h-4 text-purple-600" />
                                <span>Öğretmen Değerlendirmesi & Not</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
                            {/* SECTION 1: ÇELDIRICI & TEST ANALIZI */}
                            {inspectSection === 'celdirici' && (() => {
                                const art = ALL_MAKALE_ARTICLES.find(a => a.id === selectedSubmissionForInspect.articleId);
                                if (!art) return <div>Makale bulunamadı.</div>;

                                return (
                                    <div className="space-y-6">
                                        {/* Status Alert */}
                                        {selectedSubmissionForInspect.isPassed ? (
                                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-black text-emerald-900 text-sm">Öğrenci Doğru Seçeneğe Ulaştı</h4>
                                                    <p className="text-xs text-emerald-800 font-medium mt-0.5">
                                                        {selectedSubmissionForInspect.studentName}, soru kökündeki temel kazanımı başarıyla teşhis etmiş ve çeldirici tuzaklara düşmeden doğru seçeneği işaretlemiştir.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-300 flex items-start gap-3">
                                                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-0.5 bg-rose-600 text-white text-2xs font-black rounded uppercase">
                                                            Hatalı Seçim
                                                        </span>
                                                        <h4 className="font-black text-rose-950 text-sm">
                                                            {selectedSubmissionForInspect.distractorType || 'Çeldirici'} Tuzağına Yakalandı!
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs text-rose-900 font-medium">
                                                        Öğrenci <strong>{selectedSubmissionForInspect.quizSelectedOption.letter}</strong> seçeneğini tercih etti. Bu seçenek soru yazarı tarafından <em>{selectedSubmissionForInspect.distractorType}</em> mantığıyla kurgulanmış bir çeldiricidir.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Question Stem */}
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                                            <div className="text-2xs font-bold text-indigo-700 uppercase tracking-wider">LGS / Beceri Temelli Çoktan Seçmeli Soru</div>
                                            <p className="text-sm font-bold text-slate-900 leading-relaxed">
                                                {art.quizQuestion.stem}
                                            </p>
                                        </div>

                                        {/* Options Grid */}
                                        <div className="space-y-2.5">
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Şıklar ve Öğrencinin Tercihi:</div>
                                            {art.quizQuestion.options.map((opt, i) => {
                                                const isStudentPick = selectedSubmissionForInspect.quizSelectedOption.letter === opt.letter;
                                                const isCorrect = opt.isCorrect;

                                                let cardStyle = "bg-white border-slate-200 text-slate-700";
                                                if (isStudentPick && isCorrect) {
                                                    cardStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold shadow-sm";
                                                } else if (isStudentPick && !isCorrect) {
                                                    cardStyle = "bg-rose-50 border-2 border-rose-500 text-rose-950 font-bold shadow-sm";
                                                } else if (isCorrect) {
                                                    cardStyle = "bg-emerald-50/50 border border-emerald-300 text-emerald-900";
                                                }

                                                return (
                                                    <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${cardStyle}`}>
                                                        <div className="flex items-center gap-3">
                                                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                                                                isStudentPick && isCorrect
                                                                    ? 'bg-emerald-600 text-white'
                                                                    : isStudentPick && !isCorrect
                                                                    ? 'bg-rose-600 text-white'
                                                                    : isCorrect
                                                                    ? 'bg-emerald-200 text-emerald-900'
                                                                    : 'bg-slate-100 text-slate-700'
                                                            }`}>
                                                                {opt.letter}
                                                            </span>
                                                            <span className="text-xs sm:text-sm">{opt.text}</span>
                                                        </div>

                                                        <div className="flex items-center gap-2 shrink-0">
                                                            {isStudentPick && (
                                                                <span className={`px-2.5 py-1 rounded-lg text-2xs font-black uppercase ${
                                                                    isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                                                                }`}>
                                                                    Öğrencinin Seçimi
                                                                </span>
                                                            )}
                                                            <span className={`px-2 py-0.5 rounded text-2xs font-bold ${
                                                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                                                            }`}>
                                                                {opt.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Çeldirici Deşifresi ve Soru Açıklaması */}
                                        <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-200 space-y-2">
                                            <h5 className="text-xs font-black text-indigo-900 uppercase flex items-center gap-1.5">
                                                <Target className="w-4 h-4 text-indigo-600" /> Soru Yazarı Çözüm Notu & Çeldirici Açıklaması
                                            </h5>
                                            <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                                                {selectedSubmissionForInspect.quizExplanation || art.quizQuestion.explanation}
                                            </p>
                                        </div>

                                        {/* Nöral Fren (Zihinsel Tuzak Uyarısı) */}
                                        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-300 flex items-start gap-3">
                                            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                                            <div>
                                                <h5 className="text-xs font-black text-amber-900 uppercase">Nöral Fren / Zihinsel Tuzak Tavsiyesi (Öğretmen İçin)</h5>
                                                <p className="text-xs text-amber-950 font-medium mt-1 leading-relaxed">
                                                    {art.solution.neuralWarning || selectedSubmissionForInspect.neuralWarning}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* SECTION 2: 10 ADIMLI ANALİTİK ÇALIŞMA KAĞIDI */}
                            {inspectSection === 'workspace' && (() => {
                                const art = ALL_MAKALE_ARTICLES.find(a => a.id === selectedSubmissionForInspect.articleId);
                                const ws = selectedSubmissionForInspect.workspaceInput;

                                return (
                                    <div className="space-y-5">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                                            <div>
                                                <h4 className="font-black text-slate-900 text-sm">Öğrencinin 10 Adımlı Metin Çözümleme Formu</h4>
                                                <p className="text-xs text-slate-500">Öğrencinin metni okurken adım adım kaydettiği analitik düşünce basamakları</p>
                                            </div>
                                            {ws.aiScore && (
                                                <div className="text-right">
                                                    <span className="text-xs font-black px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl">
                                                        AI Uyumu: %{ws.aiScore}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Step 1: Konu Dedektifi */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-indigo-700 uppercase">1. Adım: Konu Dedektifi (Öğrenci Yanıtı)</span>
                                            </div>
                                            <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                                                {ws.konuDedektifi || '— Yanıt verilmedi —'}
                                            </p>
                                            {art && (
                                                <div className="text-2xs text-slate-400 font-medium italic pl-1">
                                                    Uzman Referansı: {art.solution.konuDedektifi}
                                                </div>
                                            )}
                                        </div>

                                        {/* Step 2: Hızlı Özet */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                                            <span className="text-xs font-black text-indigo-700 uppercase">2. Adım: 1 Cümlelik Hızlı Özet</span>
                                            <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                                                {ws.hizliOzet || '— Yanıt verilmedi —'}
                                            </p>
                                        </div>

                                        {/* Step 3: Yazarın Amacı */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                                            <span className="text-xs font-black text-indigo-700 uppercase">3. Adım: Yazarın Amacı</span>
                                            <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                                                {ws.yazarinAmaci || '— Yanıt verilmedi —'}
                                            </p>
                                        </div>

                                        {/* Step 4: Soru Üretimi (3 Soru) */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
                                            <span className="text-xs font-black text-indigo-700 uppercase">4. Adım: Öğrencinin Ürettiği 3 Soru</span>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                    <strong className="text-slate-900 block font-bold mb-1">Soru 1:</strong>
                                                    <span className="text-slate-700">{ws.soru1 || '—'}</span>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                    <strong className="text-slate-900 block font-bold mb-1">Soru 2:</strong>
                                                    <span className="text-slate-700">{ws.soru2 || '—'}</span>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                    <strong className="text-slate-900 block font-bold mb-1">Soru 3:</strong>
                                                    <span className="text-slate-700">{ws.soru3 || '—'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 5: Ana Düşünce & AI Analizi */}
                                        <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200 space-y-2 shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-indigo-900 uppercase">5. Adım: Ana Düşünce & Yapay Zekâ Uyumu</span>
                                                {ws.aiScore && (
                                                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-2xs font-black rounded-lg">
                                                        AI Puanı: %{ws.aiScore}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-800 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 font-bold">
                                                {ws.anaDusunce || '— Yanıt verilmedi —'}
                                            </p>
                                            {ws.aiFeedback && (
                                                <div className="text-2xs text-indigo-700 font-semibold bg-white p-2.5 rounded-lg border border-indigo-100">
                                                    🤖 AI Geri Bildirimi: {ws.aiFeedback}
                                                </div>
                                            )}
                                        </div>

                                        {/* Step 6: Çıkarım Yapma */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                                            <span className="text-xs font-black text-indigo-700 uppercase">6. Adım: Çıkarım Yapma (Derin Anlam)</span>
                                            <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                                                {ws.cikarimYapma || '— Yanıt verilmedi —'}
                                            </p>
                                        </div>

                                        {/* Step 7: Yardımcı Düşünceler */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
                                            <span className="text-xs font-black text-indigo-700 uppercase">7. Adım: Yardımcı Düşünceler</span>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                    <strong className="text-slate-800 font-bold block mb-0.5">• Madde 1:</strong>
                                                    <span className="text-slate-600">{ws.yardimci1 || '—'}</span>
                                                </div>
                                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                    <strong className="text-slate-800 font-bold block mb-0.5">• Madde 2:</strong>
                                                    <span className="text-slate-600">{ws.yardimci2 || '—'}</span>
                                                </div>
                                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                    <strong className="text-slate-800 font-bold block mb-0.5">• Madde 3:</strong>
                                                    <span className="text-slate-600">{ws.yardimci3 || '—'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 8: Boşluk Doldurma */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                                            <span className="text-xs font-black text-indigo-700 uppercase">8. Adım: Metin Sonu Boşluk Doldurma Cümlesi</span>
                                            <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                                                {ws.boslukDoldurma || '— Yanıt verilmedi —'}
                                            </p>
                                        </div>

                                        {/* Step 9 & 10 */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                                                <span className="text-xs font-black text-indigo-700 uppercase">9. Adım: Anlatım Biçimi</span>
                                                <p className="text-xs text-slate-800 font-bold">{ws.anlatimBicimi || 'Belirtilmedi'}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                                                <span className="text-xs font-black text-indigo-700 uppercase">10. Adım: Düşünceyi Geliştirme Yolu</span>
                                                <p className="text-xs text-slate-800 font-bold">{ws.dusunceyiGelistirme || 'Belirtilmedi'}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* SECTION 3: ÖĞRETMEN DEĞERLENDİRMESİ & NOT */}
                            {inspectSection === 'review' && (
                                <div className="space-y-6 max-w-2xl mx-auto">
                                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                                        <h4 className="font-black text-purple-900 text-sm flex items-center gap-2">
                                            <Award className="w-5 h-5 text-purple-600" /> Öğretmen Geri Bildirimi & Notlandırma
                                        </h4>
                                        <p className="text-xs text-purple-800 mt-1">
                                            Bu analiz kağıdını inceleyip öğrenciye not ve tavsiye notu kaydedebilirsiniz. Not öğrencinin gelişim karnesine yansır.
                                        </p>
                                    </div>

                                    {reviewSavedSuccess && (
                                        <div className="p-3 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            Değerlendirme başarıyla kaydedildi!
                                        </div>
                                    )}

                                    {/* Score Input */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-slate-700 uppercase">Öğrenci Analiz Puanı (0 - 100):</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={reviewScore}
                                                onChange={(e) => setReviewScore(Number(e.target.value))}
                                                className="w-28 p-3 bg-white border border-slate-300 rounded-xl text-lg font-black text-indigo-700 text-center outline-none focus:border-indigo-500"
                                            />
                                            <span className="text-xs text-slate-400 font-semibold">/ 100 Tam Puan</span>
                                        </div>
                                    </div>

                                    {/* Status selection */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-slate-700 uppercase">Değerlendirme Durumu:</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setReviewStatus('onaylandi')}
                                                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                                                    reviewStatus === 'onaylandi'
                                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                ✓ Onaylandı (Başarılı)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setReviewStatus('telafi_atandi')}
                                                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                                                    reviewStatus === 'telafi_atandi'
                                                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                ⚠️ Telafi Görevi Ata
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setReviewStatus('incelendi')}
                                                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                                                    reviewStatus === 'incelendi'
                                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                👁 İncelendi
                                            </button>
                                        </div>
                                    </div>

                                    {/* Comment Textarea */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-slate-700 uppercase">Öğretmen Geri Bildirim Notu:</label>
                                        <textarea
                                            rows={4}
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            placeholder="Öğrencinin güçlü yanlarını ve dikkat etmesi gereken çeldirici tuzaklarını yazın (örn: Çıkarım adımın çok başarılı ancak ters mantık şıkkına dikkat et)..."
                                            className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-xs font-medium outline-none focus:border-indigo-500 shadow-sm"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={handleSaveReviewAction}
                                            className="flex-1 py-3.5 bg-indigo-600 text-white font-black text-xs rounded-xl hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-4 h-4" /> Değerlendirmeyi Kaydet
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAssignRemedial(selectedSubmissionForInspect)}
                                            className="px-5 py-3.5 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl hover:bg-amber-200 transition-colors flex items-center gap-1.5"
                                        >
                                            <Zap className="w-4 h-4 text-amber-700" /> Telafi Paragrafı Ata
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={() => setSelectedSubmissionForInspect(null)}
                                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // RENDER: Çeldirici Analizi Sekmesi
    const renderAnalytics = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-indigo-600" />
                        Bölgesel & Okul Geneli Çeldirici Hata Analizi
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        Öğrencilerin makale sorularında en sık takıldığı LGS çeldirici tuzakları ve bilişsel zayıf noktalar
                    </p>
                </div>
                <button
                    onClick={() => setActiveTab('reports')}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                >
                    <FileText className="w-4 h-4" /> Bütün Öğrenci Raporlarına Git
                </button>
            </div>

            {/* Distractor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-rose-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                            <ShieldAlert className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                            1. Sırada (%42)
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900">Ters Mantık Tuzağı</h4>
                        <p className="text-2xs text-slate-500 mt-0.5">Zıt anlamları, olumsuzluk eklerini veya özne-nesne ilişkisini ters algılama</p>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: '42%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                            <Target className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            2. Sırada (%28)
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900">Kapsam Aşımı Tuzağı</h4>
                        <p className="text-2xs text-slate-500 mt-0.5">Metindeki dar bir detayı bütün metnin genel ana fikriymiş gibi genelleme</p>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                            <AlertCircle className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            3. Sırada (%18)
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900">Çelişkili Seçenek Tuzağı</h4>
                        <p className="text-2xs text-slate-500 mt-0.5">Mecaz anlamları gerçek anlam sanarak metinle çatışan yargıya kapılma</p>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-blue-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                            <HelpCircle className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            4. Sırada (%12)
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900">Öznel / Alakasız Yorum</h4>
                        <p className="text-2xs text-slate-500 mt-0.5">Metinde bulunmayan kendi kişisel düşüncesini şıklarda doğru kabul etme</p>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '12%' }}></div>
                    </div>
                </div>
            </div>

            {/* Atölye Karşılaştırma & Sınıf Dağılımı */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-indigo-600" /> Atölye Başarı Kıyaslaması
                    </h4>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                            <div className="flex justify-between items-center text-xs font-black">
                                <span className="text-indigo-900">Atölye 1 (5 ve 6. Sınıf Seviyesi)</span>
                                <span className="text-indigo-700">%{stats.ws1PassRate} Başarı</span>
                            </div>
                            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-indigo-200">
                                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${stats.ws1PassRate || 80}%` }}></div>
                            </div>
                            <div className="text-2xs text-slate-500 font-medium">
                                20 Temel Metin • Toplam {stats.ws1Count} Çözüm Yapıldı
                            </div>
                        </div>

                        <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                            <div className="flex justify-between items-center text-xs font-black">
                                <span className="text-purple-900">Atölye 2 (7 ve 8. Sınıf / LGS Odaklı)</span>
                                <span className="text-purple-700">%{stats.ws2PassRate} Başarı</span>
                            </div>
                            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-purple-200">
                                <div className="bg-purple-600 h-full rounded-full" style={{ width: `${stats.ws2PassRate || 65}%` }}></div>
                            </div>
                            <div className="text-2xs text-slate-500 font-medium">
                                20 İleri Metin • Toplam {stats.ws2Count} Çözüm Yapıldı (LGS Çeldirici Tuzağı Odaklı)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-600" /> Sınıf Çeldirici Risk Karnesi
                    </h4>
                    
                    <div className="space-y-2.5">
                        {availableClasses.map(cls => {
                            const classSubs = submissions.filter(s => s.studentClass === cls);
                            const classPass = classSubs.filter(s => s.isPassed).length;
                            const classRate = classSubs.length > 0 ? Math.round((classPass / classSubs.length) * 100) : 75;
                            return (
                                <div key={cls} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <span className="w-9 h-9 rounded-lg bg-white border border-slate-200 font-black text-xs text-indigo-700 flex items-center justify-center">
                                            {cls}
                                        </span>
                                        <div>
                                            <div className="text-xs font-black text-slate-800">{cls} Şubesi</div>
                                            <div className="text-2xs text-slate-400">{classSubs.length} Çözüm İncelendi</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-md ${
                                            classRate >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            %{classRate} Doğruluk
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Telafi & Kurtarma Görevleri Listesi */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-black text-slate-800 text-base">Çeldiriciye Takılan Öğrenciler ve Telafi Görevleri</h4>
                        <p className="text-xs text-slate-500">Sorularda zihinsel tuzaklara düşen öğrencilere özel telafi paragraf antrenmanı tanımlayabilirsiniz.</p>
                    </div>
                    <span className="text-xs font-black px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
                        {submissions.filter(s => !s.isPassed).length} Öğrenci Destek Bekliyor
                    </span>
                </div>

                <div className="space-y-3">
                    {submissions.filter(s => !s.isPassed).map(sub => (
                        <div key={sub.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                                    {sub.studentName.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                        <span>{sub.studentName}</span>
                                        <span className="text-2xs px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-bold">{sub.studentClass}</span>
                                    </div>
                                    <div className="text-xs text-amber-800 font-medium">
                                        Zayıf Nokta: <strong>{sub.distractorType || 'Çeldirici Tuzağı'}</strong> ({sub.articleTitle})
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    onClick={() => setSelectedSubmissionForInspect(sub)}
                                    className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
                                >
                                    Cevabını İncele
                                </button>
                                <button
                                    onClick={() => handleAssignRemedial(sub)}
                                    className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
                                >
                                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Telafi Görevi Ata</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // RENDER: Makale Kütüphanesi Sekmesi
    const renderLibrary = () => {
        const filtered = ALL_MAKALE_ARTICLES.filter(a => {
            if (selectedAdminWorkshop !== 0 && a.workshopId !== selectedAdminWorkshop) return false;
            if (searchLibrary.trim()) {
                const q = searchLibrary.toLowerCase();
                return a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.skills.some(s => s.toLowerCase().includes(q));
            }
            return true;
        });

        const activeDetailArticle = ALL_MAKALE_ARTICLES.find(a => a.id === selectedArticleDetail);
        const articleSubmissions = selectedArticleDetail ? submissions.filter(s => s.articleId === selectedArticleDetail) : [];

        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-indigo-600" />
                            Atölye Müfredat & Soru Havuzu Kütüphanesi
                        </h3>
                        <p className="text-slate-500 text-xs font-medium mt-1">
                            Sistemdeki toplam {ALL_MAKALE_ARTICLES.length} makale, 10 adımlı uzman çözümleri ve çeldirici analizleri
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setSelectedAdminWorkshop(0)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                selectedAdminWorkshop === 0 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Tümü ({ALL_MAKALE_ARTICLES.length})
                        </button>
                        <button
                            onClick={() => setSelectedAdminWorkshop(1)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                selectedAdminWorkshop === 1 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            <span>Atölye 1 (5 ve 6. Sınıf)</span>
                            <span className={`px-1.5 py-0.5 rounded-md text-2xs font-black ${selectedAdminWorkshop === 1 ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600'}`}>
                                {ALL_MAKALE_ARTICLES.filter(a => a.workshopId === 1).length}
                            </span>
                        </button>
                        <button
                            onClick={() => setSelectedAdminWorkshop(2)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                selectedAdminWorkshop === 2 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            <span>Atölye 2 (7 ve 8. Sınıf)</span>
                            <span className={`px-1.5 py-0.5 rounded-md text-2xs font-black ${selectedAdminWorkshop === 2 ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600'}`}>
                                {ALL_MAKALE_ARTICLES.filter(a => a.workshopId === 2).length}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Makale başlığı, kategori veya beceri ara..."
                        value={searchLibrary}
                        onChange={e => setSearchLibrary(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-indigo-500 outline-none shadow-sm"
                    />
                </div>

                {/* Article Detail Modal / Drawer */}
                {activeDetailArticle && (
                    <div className="bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg">
                                    {activeDetailArticle.workshopTitle} • Makale #{activeDetailArticle.articleNumber}
                                </span>
                                <h4 className="text-xl font-black text-slate-900 mt-1">{activeDetailArticle.title}</h4>
                            </div>
                            <button
                                onClick={() => setSelectedArticleDetail(null)}
                                className="text-xs px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
                            >
                                Kapat ✕
                            </button>
                        </div>

                        {/* Metin */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-normal">
                            {activeDetailArticle.text}
                        </div>

                        {/* Bu Makaleyi Çözen Öğrenciler & Rapor Bağlantısı */}
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <h5 className="text-xs font-black text-indigo-900 uppercase flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-indigo-600" /> Bu Makaleyi Çözen Öğrenciler ({articleSubmissions.length})
                                </h5>
                                <button
                                    onClick={() => {
                                        setReportSearchQuery(activeDetailArticle.title);
                                        setActiveTab('reports');
                                        setSelectedArticleDetail(null);
                                    }}
                                    className="text-2xs font-bold text-indigo-700 hover:underline"
                                >
                                    Raporlar Sayfasında İncele →
                                </button>
                            </div>

                            {articleSubmissions.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Henüz bu makaleyi tamamlayan öğrenci bulunmuyor.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {articleSubmissions.map(sub => (
                                        <div
                                            key={sub.id}
                                            onClick={() => {
                                                setSelectedSubmissionForInspect(sub);
                                                setSelectedArticleDetail(null);
                                            }}
                                            className="p-2.5 bg-white rounded-xl border border-indigo-100 flex items-center justify-between cursor-pointer hover:border-indigo-300 hover:shadow-xs transition-all"
                                        >
                                            <div>
                                                <div className="text-xs font-bold text-slate-800">{sub.studentName} ({sub.studentClass})</div>
                                                <div className="text-3xs text-slate-400">{sub.submittedAt}</div>
                                            </div>
                                            <span className={`text-3xs font-black px-2 py-0.5 rounded ${
                                                sub.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {sub.isPassed ? '✓ Doğru' : `⚠️ ${sub.distractorType || 'Hata'}`}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Çeldirici Yapısı */}
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                            <h5 className="text-xs font-bold text-indigo-900 uppercase">Soru & Çeldirici Dağılımı:</h5>
                            <p className="text-xs font-medium text-slate-800">{activeDetailArticle.quizQuestion.stem}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {activeDetailArticle.quizQuestion.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                                        opt.isCorrect ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950' : 'bg-white border-slate-200 text-slate-700'
                                    }`}>
                                        <span><strong>{opt.letter})</strong> {opt.text}</span>
                                        <span className={`text-2xs font-bold px-2 py-0.5 rounded ${
                                            opt.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'
                                        }`}>{opt.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nöral Uyarı */}
                        <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <p className="text-xs font-semibold text-rose-900">
                                <strong>Nöral Uyarı:</strong> {activeDetailArticle.solution.neuralWarning}
                            </p>
                        </div>
                    </div>
                )}

                {/* Articles List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(item => {
                        const count = submissions.filter(s => s.articleId === item.id).length;
                        return (
                            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                                            {item.workshopId === 1 ? 'Atölye 1 (5-6. Sınıf)' : 'Atölye 2 (7-8. Sınıf)'} • #{item.articleNumber}
                                        </span>
                                        <span className="text-xs font-medium text-slate-400">{item.duration} dk</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1">{item.title}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-2xs font-bold text-slate-500 uppercase">{item.category}</span>
                                        <span className="text-2xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                            {count} Öğrenci Çözümü
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedArticleDetail(item.id)}
                                    className="mt-4 w-full py-2 bg-slate-50 text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
                                >
                                    Detay & Soru Çözümünü İncele
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // RENDER: Sözel Mantık Sekmesi
    const renderSozelMantikAdmin = () => {
        const filteredQuestions = ALL_SOZEL_MANTIK_QUESTIONS.filter(q => {
            if (selectedLogicAtolye !== 0 && q.atolyeId !== selectedLogicAtolye) return false;
            if (searchLogic.trim()) {
                const query = searchLogic.toLowerCase();
                const matchTitle = q.title.toLowerCase().includes(query);
                const matchStem = q.questionStem.toLowerCase().includes(query);
                const matchContext = q.context.toLowerCase().includes(query);
                const matchCat = q.category.toLowerCase().includes(query);
                if (!matchTitle && !matchStem && !matchContext && !matchCat) return false;
            }
            return true;
        });

        const activeDetailQuestion = ALL_SOZEL_MANTIK_QUESTIONS.find(q => q.id === selectedLogicDetail);
        const activeAtolyeMeta = SOZEL_MANTIK_ATOLYELER.find(a => a.id === selectedLogicAtolye);

        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <Brain className="w-6 h-6 text-indigo-600" />
                                Sözel Mantık Soru Havuzu
                            </h3>
                            <p className="text-slate-500 text-xs font-medium mt-1">
                                Toplam 5 Atölye ve {ALL_SOZEL_MANTIK_QUESTIONS.length} Soru: Tablo Kurma, İki Değişkenli, Çoklu Matris, Sıralama ve Kriptoloji
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-80">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Soru, kavram veya öncül ara..."
                                value={searchLogic}
                                onChange={e => setSearchLogic(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                        <button
                            onClick={() => setSelectedLogicAtolye(0)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                selectedLogicAtolye === 0
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Tümü ({ALL_SOZEL_MANTIK_QUESTIONS.length})
                        </button>
                        {SOZEL_MANTIK_ATOLYELER.map(at => {
                            const isSelected = selectedLogicAtolye === at.id;
                            return (
                                <button
                                    key={at.id}
                                    onClick={() => setSelectedLogicAtolye(at.id)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        isSelected
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    <span>{at.shortLabel}</span>
                                    <span className={`px-1.5 py-0.5 rounded-md text-2xs font-black ${
                                        isSelected ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600'
                                    }`}>
                                        {at.questionCount}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {activeAtolyeMeta && (
                        <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <div className="text-xs font-black text-indigo-900">
                                    {activeAtolyeMeta.title}
                                </div>
                                <div className="text-2xs font-medium text-indigo-700 mt-0.5">
                                    {activeAtolyeMeta.subtitle}
                                </div>
                            </div>
                            <span className="px-2.5 py-1 bg-white text-indigo-700 border border-indigo-200 rounded-xl text-2xs font-black shrink-0 self-start sm:self-center">
                                {activeAtolyeMeta.difficulty}
                            </span>
                        </div>
                    )}
                </div>

                {/* Logic Question Detail Drawer */}
                {activeDetailQuestion && (
                    <div className="bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg">
                                    {getSozelMantikAtolyeLabel(activeDetailQuestion.atolyeId)} • Soru #{activeDetailQuestion.questionNumber}
                                </span>
                                <h4 className="text-xl font-black text-slate-900 mt-1">{activeDetailQuestion.title}</h4>
                            </div>
                            <button
                                onClick={() => setSelectedLogicDetail(null)}
                                className="text-xs px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
                            >
                                Kapat ✕
                            </button>
                        </div>

                        {/* Olay / İpuçları */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                            {activeDetailQuestion.context}
                        </div>

                        {/* Soru Kökü */}
                        <div className="p-3 bg-indigo-50 text-indigo-950 font-bold text-xs rounded-xl">
                            {activeDetailQuestion.questionStem}
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                            {activeDetailQuestion.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between ${
                                        opt.isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold' : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-black text-xs text-slate-700">
                                            {opt.letter}
                                        </span>
                                        <span>{opt.text}</span>
                                    </div>
                                    {opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                                </div>
                            ))}
                        </div>

                        {/* Matrix Table */}
                        {activeDetailQuestion.matrix && (
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Table className="w-3.5 h-3.5" /> {activeDetailQuestion.matrix.title}
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs bg-white rounded-lg border border-slate-200">
                                        <thead>
                                            <tr className="bg-indigo-600 text-white font-bold">
                                                {activeDetailQuestion.matrix.headers.map((h, i) => (
                                                    <th key={i} className="p-2 border-r last:border-r-0 border-indigo-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activeDetailQuestion.matrix.rows.map((r, i) => (
                                                <tr key={i} className="border-b last:border-b-0 border-slate-100">
                                                    {r.map((c, ci) => (
                                                        <td key={ci} className="p-2 border-r last:border-r-0 border-slate-100 text-slate-700">{c}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Solution Steps */}
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Çözüm Aşamaları
                            </div>
                            <div className="space-y-1.5">
                                {activeDetailQuestion.solutionSteps.map(step => (
                                    <div key={step.step} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                                        <strong className="text-slate-900 font-bold">{step.step}. {step.title}: </strong>
                                        <span className="text-slate-600">{step.content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Neural Brake */}
                        {activeDetailQuestion.neuralBrake && (
                            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                                <strong className="font-bold flex items-center gap-1 text-amber-800 mb-0.5">
                                    <ShieldAlert className="w-3.5 h-3.5" /> Nöral Fren (Zihinsel Tuzak):
                                </strong>
                                {activeDetailQuestion.neuralBrake}
                            </div>
                        )}

                        <div className="pt-2 flex justify-end">
                            <button
                                onClick={() => setSelectedLogicDetail(null)}
                                className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                )}

                {/* Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredQuestions.map(q => (
                        <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors">
                            <div>
                                <div className="flex justify-between items-center mb-2 gap-2">
                                    <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                                        {getSozelMantikAtolyeLabel(q.atolyeId)} • #{q.questionNumber}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0">
                                        <Clock className="w-3 h-3" /> {q.cognitiveTime || '30 sn'}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1">{q.title}</h4>
                                <span className="text-2xs font-bold text-slate-500 uppercase">{q.category}</span>
                                <p className="text-xs text-slate-600 line-clamp-2 mt-2 font-medium">
                                    {q.questionStem}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLogicDetail(q.id)}
                                className="mt-4 w-full py-2 bg-slate-50 text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                                <Table className="w-3.5 h-3.5" /> Matris ve Çözümü İncele
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // RENDER: Soru Yükle & Etiketle
    const renderUpload = () => (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Upload className="text-indigo-600" /> Soru & Metin Yükleme (OCR/AI)
                </h3>
                
                {!parsedData ? (
                    <div className="space-y-6">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-700 mb-1">
                                {file ? file.name : "Belge Yükleyin (PDF, DOCX)"}
                            </h4>
                            <p className="text-slate-500 text-sm">
                                Akıllı Şablon sistemi, metni ve şıkları otomatik ayırır, çeldirici türlerini etiketler.
                            </p>
                        </div>

                        {file && (
                            <button 
                                onClick={handleUpload} 
                                disabled={isUploading}
                                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isUploading ? 'Yapay Zeka Analiz Ediyor...' : 'Ayrıştır ve Etiketle'}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" /> Başarıyla ayrıştırıldı. Lütfen çeldiricileri kontrol edip onaylayın.
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Soru Metni / Paragraf</label>
                                <textarea 
                                    defaultValue={parsedData.questionText}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 h-32"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Soru Kökü</label>
                                <input 
                                    type="text" 
                                    defaultValue={parsedData.questionStem}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-slate-600">Seçenekler ve Çeldirici Etiketleri</label>
                                {parsedData.options.map((opt: any, i: number) => (
                                    <div key={i} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700">
                                            {opt.letter}
                                        </div>
                                        <input 
                                            type="text" 
                                            defaultValue={opt.text}
                                            className="flex-1 bg-transparent outline-none font-medium text-slate-700"
                                        />
                                        <select 
                                            defaultValue={opt.type}
                                            className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-indigo-700 outline-none"
                                        >
                                            <option value="Doğru Cevap">Doğru Cevap</option>
                                            <option value="Kapsam Aşımı">Kapsam Aşımı</option>
                                            <option value="Ters Mantık">Ters Mantık</option>
                                            <option value="Alakasız">Alakasız</option>
                                            <option value="Çelişkili">Çelişkili</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-slate-100">
                            <button onClick={() => setParsedData(null)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                İptal Et
                            </button>
                            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> Öğrencilere Ata (LGS Antrenörü)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 h-full p-2">
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button 
                    onClick={() => setActiveTab('library')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${
                        activeTab === 'library' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <BookOpen className="w-4 h-4" /> Makale Kütüphanesi ({ALL_MAKALE_ARTICLES.length})
                </button>

                <button 
                    onClick={() => setActiveTab('reports')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${
                        activeTab === 'reports' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <FileText className="w-4 h-4" /> Öğrenci Çözüm Raporları ({submissions.length})
                </button>

                <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${
                        activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Activity className="w-4 h-4" /> Çeldirici Analizi & İstatistik
                </button>

                <button 
                    onClick={() => setActiveTab('sozel_mantik')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${
                        activeTab === 'sozel_mantik' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Brain className="w-4 h-4" /> Sözel Mantık Havuzu ({ALL_SOZEL_MANTIK_QUESTIONS.length})
                </button>

                <button 
                    onClick={() => setActiveTab('upload')}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm ${
                        activeTab === 'upload' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <Upload className="w-4 h-4" /> Soru Yükle & Etiketle
                </button>
            </div>
            
            {activeTab === 'library' 
                ? renderLibrary() 
                : activeTab === 'reports'
                ? renderReports()
                : activeTab === 'analytics'
                ? renderAnalytics()
                : activeTab === 'sozel_mantik'
                ? renderSozelMantikAdmin()
                : renderUpload()}
        </div>
    );
}
