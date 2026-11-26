import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  Clock,
  BookOpen,
  Award,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Calendar,
  UserCheck
} from 'lucide-react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PusulaStudentOutcomeFeedbackDoc } from '../types/pusula';
import { doesExamFeedbackMatchStudent } from '../lib/utils';

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

interface StudentSinavDonutPanelProps {
  state: any;
  actions?: any;
}

export const StudentSinavDonutPanel: React.FC<StudentSinavDonutPanelProps> = ({ state, actions }) => {
  const currentUser = state?.currentUser;
  const activeSchoolId = state?.activeSchoolId || 'default';
  const donutsColName =
    activeSchoolId && activeSchoolId !== 'default'
      ? `sinav_donuts_${activeSchoolId}`
      : 'sinav_donuts';
  const analizColName =
    activeSchoolId && activeSchoolId !== 'default'
      ? `sinav_analizleri_${activeSchoolId}`
      : 'sinav_analizleri';
  const localCacheKey = `pusula_sinav_donuts_${activeSchoolId}`;

  const [remoteDocs, setRemoteDocs] = useState<PusulaStudentOutcomeFeedbackDoc[]>(() => {
    if (Array.isArray(state?.sinavDonutleri) && state.sinavDonutleri.length > 0) {
      return state.sinavDonutleri;
    }
    try {
      const cached = localStorage.getItem(localCacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        return Array.isArray(parsed) ? parsed : Object.values(parsed || {});
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [activeExamIds, setActiveExamIds] = useState<Set<string> | null>(() =>
    Array.isArray(state?.activeSinavAnaliziIds) ? new Set(state.activeSinavAnaliziIds) : null
  );
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(state?.sinavDonutleri)) {
      setRemoteDocs(state.sinavDonutleri);
      setLoading(false);
    }
  }, [state?.sinavDonutleri]);

  useEffect(() => {
    if (Array.isArray(state?.activeSinavAnaliziIds)) {
      setActiveExamIds(new Set(state.activeSinavAnaliziIds));
    }
  }, [state?.activeSinavAnaliziIds]);

  useEffect(() => {
    if (!activeSchoolId) {
      setLoading(false);
      return;
    }
    const unsubDonuts = onSnapshot(
      collection(db, donutsColName),
      (snap) => {
        const list: PusulaStudentOutcomeFeedbackDoc[] = [];
        snap.forEach((d) => {
          list.push({ ...(d.data() as PusulaStudentOutcomeFeedbackDoc), id: d.id });
        });
        setRemoteDocs(list);
        setLoading(false);
        try {
          localStorage.setItem(localCacheKey, JSON.stringify(list));
        } catch {
          // ignore
        }
      },
      (err) => {
        console.error('Student exam feedback subscription error:', err);
        setLoading(false);
      }
    );

    const unsubExams = onSnapshot(
      collection(db, analizColName),
      (snap) => {
        const ids = new Set<string>();
        snap.forEach((d) => {
          if (d.id) ids.add(d.id);
        });
        setActiveExamIds(ids);
      },
      (err) => {
        console.error('Student active exam analyses check error:', err);
        setActiveExamIds((prev) => prev ?? new Set());
      }
    );

    return () => {
      unsubDonuts();
      unsubExams();
    };
  }, [activeSchoolId, donutsColName, analizColName, localCacheKey]);

  const myFeedbackDocs = useMemo(() => {
    if (!activeExamIds) return [];
    return (remoteDocs || [])
      .filter((d) => {
        if (!d || !Array.isArray(d.items) || d.items.length === 0) return false;
        if (!d.examId || !activeExamIds.has(d.examId)) {
          return false;
        }
        return doesExamFeedbackMatchStudent(d, currentUser);
      })
      .sort((a, b) => new Date(b.updatedAt || b.sentAt || 0).getTime() - new Date(a.updatedAt || a.sentAt || 0).getTime());
  }, [remoteDocs, activeExamIds, currentUser]);

  const summary = useMemo(() => {
    let totalOutcomes = 0;
    let studiedOutcomes = 0;
    myFeedbackDocs.forEach((d) => {
      (d.items || []).forEach((item) => {
        totalOutcomes += 1;
        if (item.studied) studiedOutcomes += 1;
      });
    });
    return {
      totalExams: myFeedbackDocs.length,
      totalOutcomes,
      studiedOutcomes,
      pendingOutcomes: totalOutcomes - studiedOutcomes
    };
  }, [myFeedbackDocs]);

  const visibleDocs = useMemo(() => {
    if (filterStatus === 'all') return myFeedbackDocs;
    return myFeedbackDocs.filter((d) => {
      const hasPending = (d.items || []).some((it) => !it.studied);
      if (filterStatus === 'pending') return hasPending;
      return !hasPending;
    });
  }, [myFeedbackDocs, filterStatus]);

  const handleToggleOutcomeStudied = async (
    feedbackDoc: PusulaStudentOutcomeFeedbackDoc,
    itemId: string,
    nextStudied: boolean
  ) => {
    const key = `${feedbackDoc.id}_${itemId}`;
    setUpdatingKey(key);
    const nowIso = new Date().toISOString();

    const updatedItems = (feedbackDoc.items || []).map((it) => {
      if (it.id !== itemId) return it;
      return {
        ...it,
        studied: nextStudied,
        studiedAt: nextStudied ? nowIso : undefined
      };
    });

    const updatedDoc: PusulaStudentOutcomeFeedbackDoc = {
      ...feedbackDoc,
      items: updatedItems,
      updatedAt: nowIso
    };

    try {
      await setDoc(doc(db, donutsColName, feedbackDoc.id), sanitizeForFirestore(updatedDoc));
      setRemoteDocs((prev) => prev.map((d) => (d.id === feedbackDoc.id ? updatedDoc : d)));
      try {
        const nextList = remoteDocs.map((d) => (d.id === feedbackDoc.id ? updatedDoc : d));
        localStorage.setItem(localCacheKey, JSON.stringify(nextList));
      } catch {
        // ignore
      }
      if (nextStudied) {
        actions?.showToast?.('Harika! Konuya tekrar çalıştığın öğretmenine bildirildi.', 'success');
      } else {
        actions?.showToast?.('Çalışma durumu güncellendi.', 'info');
      }
    } catch (error) {
      console.error('Update studied status error:', error);
      // Fallback update locally
      setRemoteDocs((prev) => prev.map((d) => (d.id === feedbackDoc.id ? updatedDoc : d)));
      actions?.showToast?.('Bulut bağlantısı kurulamadı, durum geçici olarak güncellendi.', 'warning');
    } finally {
      setUpdatingKey(null);
    }
  };

  const formatTrDate = (iso?: string) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            <ClipboardCheck size={24} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider mb-1">
              <Sparkles size={11} /> Kişisel Sınav Geri Bildirimleri
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Yazılı Sınav Analiz Dönütleri
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1 max-w-2xl">
              Yazılı sınav analizlerinize göre öğretmenleriniz tarafından size yönlendirilen eksik kazanımlar aşağıdadır. İlgili konuya tekrar çalıştıktan sonra <strong>&ldquo;Konuya Tekrar Çalıştım&rdquo;</strong> butonuna basarak dönüt verebilirsiniz.
            </p>
          </div>
        </div>

        {/* Summary KPI Pills */}
        <div className="grid grid-cols-3 gap-2.5 shrink-0">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Sınav Sayısı</div>
            <div className="text-lg font-black text-slate-800 mt-0.5">{summary.totalExams}</div>
          </div>
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl px-3.5 py-2.5 text-center">
            <div className="text-[10px] font-bold text-amber-600 uppercase">Çalışılacak</div>
            <div className="text-lg font-black text-amber-700 mt-0.5">{summary.pendingOutcomes}</div>
          </div>
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl px-3.5 py-2.5 text-center">
            <div className="text-[10px] font-bold text-emerald-600 uppercase">Tamamlanan</div>
            <div className="text-lg font-black text-emerald-700 mt-0.5">{summary.studiedOutcomes}</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {myFeedbackDocs.length > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm gap-1">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Tümü ({myFeedbackDocs.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('pending')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterStatus === 'pending'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Çalışılacaklar ({myFeedbackDocs.filter((d) => d.items.some((i) => !i.studied)).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('completed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterStatus === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Tamamlananlar ({myFeedbackDocs.filter((d) => d.items.every((i) => i.studied)).length})
            </button>
          </div>
        </div>
      )}

      {/* Loading / Empty / Cards */}
      {(loading || activeExamIds === null) && myFeedbackDocs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center text-gray-400 font-bold text-sm">
          Sınav analiz dönütleriniz yükleniyor...
        </div>
      ) : visibleDocs.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-dashed border-gray-300 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <BookOpen size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-black text-gray-800">
            {myFeedbackDocs.length === 0
              ? 'Henüz Gönderilmiş Sınav Dönütü Bulunmuyor'
              : 'Bu Filtreye Uygun Sınav Dönütü Yok'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            {myFeedbackDocs.length === 0
              ? 'Öğretmenleriniz yazılı sınav analizlerini değerlendirdikten sonra tekrar çalışmanız gereken kazanımları size gönderdiğinde burada görüntülenecektir.'
              : 'Diğer filtre sekmesini seçerek tüm sınav dönütlerinizi inceleyebilirsiniz.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {visibleDocs.map((feedbackDoc) => {
            const totalItems = feedbackDoc.items.length;
            const doneItems = feedbackDoc.items.filter((i) => i.studied).length;
            const allDone = totalItems > 0 && doneItems === totalItems;

            return (
              <div
                key={feedbackDoc.id}
                className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all ${
                  allDone ? 'border-emerald-200' : 'border-gray-200'
                }`}
              >
                {/* Exam Card Header */}
                <div
                  className={`px-5 sm:px-7 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    allDone
                      ? 'bg-emerald-50/60 border-emerald-100'
                      : 'bg-gradient-to-r from-slate-50 to-blue-50/40 border-gray-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-base sm:text-lg font-black text-gray-900">
                        {feedbackDoc.subject || 'Yazılı Sınav'}
                      </span>
                      {feedbackDoc.examNumber && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-[11px] font-black">
                          {feedbackDoc.examNumber}. Sınav
                        </span>
                      )}
                      {feedbackDoc.className && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-200/80 text-slate-700 text-[11px] font-bold">
                          {feedbackDoc.className}
                        </span>
                      )}
                      {allDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-[11px] font-black">
                          <CheckCircle2 size={12} /> Tüm Kazanımlar Çalışıldı
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 text-[11px] font-black">
                          <Clock size={12} /> {totalItems - doneItems} Kazanım Bekliyor
                        </span>
                      )}
                    </div>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-gray-500">
                      {feedbackDoc.teacherName && (
                        <span className="flex items-center gap-1">
                          <UserCheck size={13} className="text-blue-500" />
                          Öğretmen: <strong className="text-gray-700">{feedbackDoc.teacherName}</strong>
                        </span>
                      )}
                      {(feedbackDoc.academicYear || feedbackDoc.term) && (
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-indigo-500" />
                          {feedbackDoc.academicYear}
                          {feedbackDoc.term ? ` • ${feedbackDoc.term}. Dönem` : ''}
                        </span>
                      )}
                      {feedbackDoc.sentAt && (
                        <span className="text-gray-400">
                          Gönderim: {formatTrDate(feedbackDoc.sentAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="bg-white border border-gray-200 rounded-2xl px-3.5 py-2 text-center shadow-xs">
                      <div className="text-[10px] font-bold text-gray-400 uppercase flex items-center justify-center gap-1">
                        <Award size={11} className="text-amber-500" /> Sınav Puanın
                      </div>
                      <div className="text-base font-black text-gray-900">
                        {feedbackDoc.totalScore ?? 0} <span className="text-xs font-bold text-gray-400">/ 100</span>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-3.5 py-2 text-center shadow-xs">
                      <div className="text-[10px] font-bold text-gray-400 uppercase">İlerleme</div>
                      <div className="text-base font-black text-blue-700">
                        {doneItems} / {totalItems}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outcomes List */}
                <div className="divide-y divide-gray-100">
                  {feedbackDoc.items.map((item, idx) => {
                    const isUpdating = updatingKey === `${feedbackDoc.id}_${item.id}`;
                    const hasScoreInfo =
                      item.maxScore !== undefined && item.maxScore !== null && item.maxScore > 0;
                    const ratioPct =
                      hasScoreInfo && item.studentScore !== undefined
                        ? Math.round((item.studentScore / (item.maxScore || 1)) * 100)
                        : null;

                    return (
                      <div
                        key={item.id || idx}
                        className={`p-4 sm:px-7 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                          item.studied ? 'bg-emerald-50/25' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center flex-wrap gap-2">
                            {item.questionNumber ? (
                              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[11px] font-black">
                                Soru {item.questionNumber}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-black">
                                Kazanım {idx + 1}
                              </span>
                            )}
                            {hasScoreInfo && (
                              <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold">
                                Alınan Puan: {item.studentScore ?? 0} / {item.maxScore}
                                {ratioPct !== null ? ` (%${ratioPct})` : ''}
                              </span>
                            )}
                            {!item.studied && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                                <AlertCircle size={12} /> Tekrar Çalışılması Öneriliyor
                              </span>
                            )}
                          </div>

                          <p className="text-sm font-bold text-gray-900 leading-relaxed">
                            {item.outcome}
                          </p>

                          {item.studied && item.studiedAt && (
                            <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              {formatTrDate(item.studiedAt)} tarihinde &ldquo;Konuya Tekrar Çalıştım&rdquo; dönütü verildi.
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.studied ? (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black">
                                <CheckCircle2 size={15} />
                                Konuya Tekrar Çalıştım ✓
                              </span>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleToggleOutcomeStudied(feedbackDoc, item.id, false)}
                                title="Durumu geri al"
                                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                              >
                                <RotateCcw size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleToggleOutcomeStudied(feedbackDoc, item.id, true)}
                              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-black shadow-sm shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                            >
                              <CheckCircle2 size={15} />
                              {isUpdating ? 'Kaydediliyor...' : 'Konuya Tekrar Çalıştım'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
