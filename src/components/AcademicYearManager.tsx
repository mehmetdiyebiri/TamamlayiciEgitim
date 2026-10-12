import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Archive, 
  Lock, 
  Unlock, 
  ShieldAlert, 
  Sparkles, 
  RotateCcw,
  Users,
  Clock,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { 
  checkJulyFirstEligibility, 
  getNextAcademicYear, 
  planClassAdvancement,
  ClassAdvancementPlan
} from '../lib/academicYearService';

interface AcademicYearManagerProps {
  activeSchoolId: string;
  currentSchool?: any;
  classes: Record<string, string[]>;
  users: any[];
  activeAcademicYear: string;
  pastAcademicYears: string[];
  viewingAcademicYear: string;
  onSetViewingAcademicYear: (year: string) => void;
  onUpdateAcademicYearConfig: (newActiveYear: string, newPastYears: string[]) => Promise<void>;
  onExecuteYearCloseAndAdvancement: (params: {
    closedYear: string;
    nextYear: string;
    newClasses: Record<string, string[]>;
    plans: ClassAdvancementPlan[];
  }) => Promise<void>;
  archives?: Record<string, any>;
  currentUser?: any;
}

export const AcademicYearManager: React.FC<AcademicYearManagerProps> = ({
  activeSchoolId,
  currentSchool,
  classes,
  users,
  activeAcademicYear,
  pastAcademicYears,
  viewingAcademicYear,
  onSetViewingAcademicYear,
  onUpdateAcademicYearConfig,
  onExecuteYearCloseAndAdvancement,
  archives = {},
  currentUser
}) => {
  // Test/Simulation Mode for bypassing 1 Temmuz for immediate testing
  const [bypassJulyRule, setBypassJulyRule] = useState(false);

  // New Academic Year Input (for manual customization)
  const [manualYearInput, setManualYearInput] = useState('');
  const [isEditingYear, setIsEditingYear] = useState(false);

  // 3-Step Confirmation Modal State
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [confirmationInput, setConfirmationInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccessMessage, setProcessSuccessMessage] = useState<string | null>(null);

  // Selected archive view inside this tab
  const [selectedArchiveDetail, setSelectedArchiveDetail] = useState<any | null>(null);

  // Calculate 1 Temmuz status
  const julyCheck = useMemo(() => {
    return checkJulyFirstEligibility(activeAcademicYear);
  }, [activeAcademicYear]);

  // Is close button enabled
  const canInitiateClose = julyCheck.canClose || bypassJulyRule;

  // Plan class advancements and graduations
  const nextYear = useMemo(() => getNextAcademicYear(activeAcademicYear), [activeAcademicYear]);

  const advancementPlan = useMemo(() => {
    return planClassAdvancement(classes, currentSchool?.type || '', activeAcademicYear);
  }, [classes, currentSchool, activeAcademicYear]);

  // Handle 3-Step Execution
  const handleFinalSubmit = async () => {
    if (confirmationInput.trim().toUpperCase() !== 'ONAYLIYORUM') {
      alert("Lütfen onay kutusuna 'ONAYLIYORUM' yazınız.");
      return;
    }

    setIsProcessing(true);
    try {
      // Build new classes object
      const newClasses: Record<string, string[]> = {};

      // 1. Add graduating classes with students
      advancementPlan.graduatingClasses.forEach(plan => {
        newClasses[plan.newClassName] = [...plan.students];
      });

      // 2. Add advancing classes with students
      advancementPlan.advancingClasses.forEach(plan => {
        newClasses[plan.newClassName] = [...plan.students];
      });

      // 3. Add fresh empty classes for incoming students
      advancementPlan.newIncomingClasses.forEach(baseClass => {
        if (!newClasses[baseClass]) {
          newClasses[baseClass] = [];
        }
      });

      await onExecuteYearCloseAndAdvancement({
        closedYear: activeAcademicYear,
        nextYear,
        newClasses,
        plans: advancementPlan.plans
      });

      setIsCloseModalOpen(false);
      setCurrentStep(1);
      setConfirmationInput('');
      setProcessSuccessMessage(`${activeAcademicYear} eğitim-öğretim yılı başarıyla kapatıldı, arşivlendi ve ${nextYear} yılına sene atlatıldı!`);
      setTimeout(() => setProcessSuccessMessage(null), 6000);
    } catch (err: any) {
      console.error("Year close error:", err);
      alert(`İşlem sırasında bir hata oluştu: ${err?.message || err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveManualYear = async () => {
    if (!manualYearInput.trim()) return;
    try {
      await onUpdateAcademicYearConfig(manualYearInput.trim(), pastAcademicYears);
      setIsEditingYear(false);
      setManualYearInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Success Notification */}
      {processSuccessMessage && (
        <div className="bg-emerald-50 border-2 border-emerald-500/20 text-emerald-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm animate-in slide-in-from-top-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="font-black text-sm">İşlem Başarıyla Tamamlandı</h4>
            <p className="text-xs text-emerald-700 mt-0.5">{processSuccessMessage}</p>
          </div>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-7 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <GraduationCap size={220} />
        </div>
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
            <Calendar size={13} /> Eğitim Öğretim Yılı Yönetimi
          </div>
          <h2 className="text-2xl md:text-3xl font-[950] tracking-tight">
            Sene Sonu İşlemleri & Sene Atlatma
          </h2>
          <p className="text-xs md:text-sm text-blue-200/80 max-w-2xl font-medium leading-relaxed">
            Kurumunuzun aktif eğitim-öğretim yılını takip edin, 1 Temmuz sonrası sene sonu işlemlerini güvenle tamamlayın, tüm öğrencileri bir üst sınıfa devredin ve geçmiş dönemleri arşivleyin.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shrink-0 text-center z-10">
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-200 block">
            Aktif Eğitim-Öğretim Yılı
          </span>
          <div className="text-3xl font-black text-white mt-1">
            {activeAcademicYear}
          </div>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase">
            Devam Ediyor
          </span>
        </div>
      </div>

      {/* Main Grid: Active Year Controls & July 1st Rule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 1 Temmuz Kuralı & Kapatma Kartı */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${canInitiateClose ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {canInitiateClose ? <Unlock size={24} /> : <Lock size={24} />}
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    Sene Sonu Kapatma Şartı (1 Temmuz Kuralı)
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Mevzuat gereği eğitim-öğretim yılı 1 Temmuz tarihinden önce kapatılamaz.
                  </p>
                </div>
              </div>

              <div className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${canInitiateClose ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {canInitiateClose ? (
                  <>
                    <CheckCircle2 size={14} /> Kapatmaya Uygun
                  </>
                ) : (
                  <>
                    <Lock size={14} /> Kilitli (1 Temmuz Bekleniyor)
                  </>
                )}
              </div>
            </div>

            {/* Status Information Box */}
            <div className={`p-5 rounded-2xl border ${canInitiateClose ? 'bg-emerald-50/60 border-emerald-200/70 text-emerald-950' : 'bg-amber-50/60 border-amber-200/70 text-amber-950'}`}>
              <div className="flex items-start gap-3.5">
                {canInitiateClose ? (
                  <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={22} className="text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="text-sm font-black">
                    {canInitiateClose
                      ? `Kapatma İzni Aktif (${julyCheck.formattedTargetDate} Tarihi Geçildi veya Test Modu Devrede)`
                      : `Kapatma Tarihi Gelmedi (İzin Verilen Tarih: ${julyCheck.formattedTargetDate})`}
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {canInitiateClose
                      ? `${activeAcademicYear} dönemini şimdi kapatabilir, sınıfları bir üst dereceye yükseltebilir ve ${nextYear} dönemini başlatabilirsiniz.`
                      : `Eğitim-öğretim yılını kapatabilmeniz için sistem tarihinin en erken ${julyCheck.formattedTargetDate} olması gerekmektedir. Kalan tahmini süre: ${julyCheck.daysRemaining} gün.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Test Simulation Switch (Allows user/tester to test without waiting for calendar July 1st) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  🧪 Test & Simülasyon Kilidi
                </span>
                <p className="text-[11px] text-slate-500 font-medium">
                  Geliştirme ve test süreçlerinde 1 Temmuz tarihini beklemeden hemen denemek için kilidi açabilirsiniz.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBypassJulyRule(!bypassJulyRule)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  bypassJulyRule
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {bypassJulyRule ? (
                  <>
                    <Unlock size={14} /> Test Kilidi Açık
                  </>
                ) : (
                  <>
                    <Lock size={14} /> Test Kilidini Aç
                  </>
                )}
              </button>
            </div>

            {/* Action Button: Open 3-Step Confirmation */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!canInitiateClose}
                onClick={() => {
                  setCurrentStep(1);
                  setConfirmationInput('');
                  setIsCloseModalOpen(true);
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-3 shadow-lg ${
                  canInitiateClose
                    ? 'bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white shadow-rose-600/20 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                }`}
              >
                <Calendar size={18} />
                <span>Eğitim-Öğretim Yılını Kapat ve Sene Atlat (3 Aşamalı Onay)</span>
                <ArrowRight size={18} />
              </button>
              {!canInitiateClose && (
                <p className="text-center text-[11px] font-bold text-rose-500 mt-2">
                  * Buton 1 Temmuz tarihine kadar kilitlidir. Test etmek için yukarıdaki "Test Kilidini Aç" düğmesini kullanabilirsiniz.
                </p>
              )}
            </div>
          </div>

          {/* Sene Atlatma Önizleme Tablosu */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Layers size={18} className="text-blue-600" /> Sene Atlatma Planı & Önizleme
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Yıl kapatıldığında gerçekleşecek sınıf geçişleri ve mezuniyet işlemleri:
                </p>
              </div>
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                {advancementPlan.plans.length} Şube İncelendi
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ara Sınıflar (Üst sınıfa geçecekler) */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ArrowRight size={14} className="text-blue-600" /> Üst Sınıfa Geçecekler
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-lg">
                    {advancementPlan.advancingClasses.length} Sınıf
                  </span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {advancementPlan.advancingClasses.map((item, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-blue-100/80 flex items-center justify-between text-xs font-bold shadow-2xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">{item.oldClassName}</span>
                        <ArrowRight size={12} className="text-gray-400" />
                        <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{item.newClassName}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">{item.studentCount} Öğrenci</span>
                    </div>
                  ))}
                  {advancementPlan.advancingClasses.length === 0 && (
                    <p className="text-xs text-gray-400 italic">Üst sınıfa geçecek ara sınıf bulunamadı.</p>
                  )}
                </div>
              </div>

              {/* Mezun Olacak Son Sınıflar */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap size={15} className="text-amber-600" /> Mezun Olup Arşivlenecekler
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                    {advancementPlan.graduatingClasses.length} Sınıf
                  </span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {advancementPlan.graduatingClasses.map((item, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-amber-200/70 flex items-center justify-between text-xs font-bold shadow-2xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-black text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md">{item.oldClassName}</span>
                        <ArrowRight size={12} className="text-gray-400" />
                        <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md text-[11px]">{item.newClassName}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">{item.studentCount} Mezun</span>
                    </div>
                  ))}
                  {advancementPlan.graduatingClasses.length === 0 && (
                    <p className="text-xs text-gray-400 italic">Mezuniyet seviyesinde son sınıf bulunamadı.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Yeni Açılacak Boş Başlangıç Şubeleri */}
            {advancementPlan.newIncomingClasses.length > 0 && (
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs font-medium text-gray-600">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-blue-500" />
                  <span>Yeni kayıtlar için açılacak başlangıç şubeleri:</span>
                  <strong className="text-gray-900 font-bold">
                    {advancementPlan.newIncomingClasses.join(', ')}
                  </strong>
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Yeni Dönem Hazırlığı</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Past Archives & History */}
        <div className="space-y-6">
          {/* Quick Academic Year Config */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" /> Eğitim Yılı Tanımı
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Sistem varsayılan olarak cari yılı kullanır. Gerekirse aktif yılı manuel olarak düzenleyebilirsiniz.
            </p>

            {isEditingYear ? (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  value={manualYearInput}
                  onChange={(e) => setManualYearInput(e.target.value)}
                  placeholder="Örn: 2026-2027"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:border-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveManualYear}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer"
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingYear(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 cursor-pointer"
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setManualYearInput(activeAcademicYear);
                  setIsEditingYear(true);
                }}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Eğitim Yılı İsmini Düzenle
              </button>
            )}
          </div>

          {/* Arşivler Listesi (Geçmiş Yıllar) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Archive size={16} className="text-indigo-600" /> Arşivlenmiş Yıllar
              </h3>
              <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                {pastAcademicYears.length} Arşiv
              </span>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Kapatılan dönemlerin verileri dondurulur ve istendiğinde arşivden incelenebilir.
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {pastAcademicYears.map((year) => {
                const archiveData = archives[year];
                const isCurrentlyViewing = viewingAcademicYear === year;

                return (
                  <div
                    key={year}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrentlyViewing
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/20'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-gray-800">{year}</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                            Arşiv
                          </span>
                        </div>
                        {archiveData?.closedAt && (
                          <span className="text-[10px] text-gray-400 block font-medium">
                            Kapanış: {new Date(archiveData.closedAt).toLocaleDateString('tr-TR')}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (isCurrentlyViewing) {
                            onSetViewingAcademicYear(activeAcademicYear);
                          } else {
                            onSetViewingAcademicYear(year);
                            setSelectedArchiveDetail(archiveData || { year });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          isCurrentlyViewing
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
                        }`}
                      >
                        {isCurrentlyViewing ? 'Aktif Yıla Dön' : 'Arşivi İncele'}
                      </button>
                    </div>

                    {isCurrentlyViewing && (
                      <div className="mt-3 pt-3 border-t border-amber-200/60 text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
                        <Archive size={13} /> Bu dönemin arşivi şu anda inceleniyor (Salt Okunur).
                      </div>
                    )}
                  </div>
                );
              })}

              {pastAcademicYears.length === 0 && (
                <div className="p-6 text-center rounded-2xl bg-gray-50 border border-dashed border-gray-200">
                  <Archive size={28} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-xs font-bold text-gray-500">Henüz arşivlenmiş bir dönem yok.</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">İlk sene sonu kapatma işlemi yapıldığında buraya kaydedilecektir.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3-STEP CONFIRMATION MODAL ("3 Kere 'Emin misiniz?'") */}
      {isCloseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[36px] max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-rose-50 to-white border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/20">
                  <ShieldAlert size={26} />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-rose-600">
                    Sene Sonu Kapatma Güvenlik Onayı
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mt-0.5">
                    Adım {currentStep} / 3: {currentStep === 1 ? '1. Onay' : currentStep === 2 ? '2. Onay' : 'Son Onay'}
                  </h3>
                </div>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-all ${
                      currentStep === step
                        ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                        : currentStep > step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {currentStep > step ? '✓' : step}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Step Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* STEP 1: Yılı Kapatma Onayı */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
                    <h4 className="text-sm font-black text-amber-900 flex items-center gap-2">
                      <HelpCircle size={18} className="text-amber-600" />
                      1. Onay: Eğitim-Öğretim Yılını Kapatmak İstediğinize Emin Misiniz?
                    </h4>
                    <p className="text-xs text-amber-800/90 leading-relaxed font-medium">
                      <strong>{activeAcademicYear}</strong> eğitim-öğretim yılı sonlandırılacaktır. Bu döneme ait mevcut sınıflar ve öğrenci dağılımları mühürlenerek kalıcı olarak arşive kaydedilecektir.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between font-bold">
                      <span>Kapatılacak Dönem:</span>
                      <span className="text-gray-900">{activeAcademicYear}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Arşivlenecek Sınıf Sayısı:</span>
                      <span className="text-gray-900">{Object.keys(classes).length} Sınıf</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Etkilenecek Öğrenci Sayısı:</span>
                      <span className="text-gray-900">{users.filter((u: any) => u.role === 'student').length} Öğrenci</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Sınıf Atlatma ve Mezuniyet Onayı */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2">
                    <h4 className="text-sm font-black text-blue-900 flex items-center gap-2">
                      <HelpCircle size={18} className="text-blue-600" />
                      2. Onay: Sınıfların ve Öğrencilerin Bir Üst Sınıfa Aktarılmasını Onaylıyor Musunuz?
                    </h4>
                    <p className="text-xs text-blue-800/90 leading-relaxed font-medium">
                      Tüm öğrenciler bir üst kademeye (örn: 5A → 6A, 6A → 7A) aktarılacaktır. Son sınıflar ise mezun edilerek <strong>"{advancementPlan.endYear} [Sınıf] Mezunları"</strong> şubesine devredilecektir.
                    </p>
                  </div>

                  {/* Summary of Advancements */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-h-48 overflow-y-auto space-y-2">
                    <div className="text-[11px] font-black uppercase text-gray-500 mb-1">Geçiş Özeti:</div>
                    {advancementPlan.plans.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-200/50 last:border-0 font-bold">
                        <span className="text-gray-700">{p.oldClassName} → <span className={p.isGraduating ? 'text-amber-700 font-black' : 'text-blue-700 font-black'}>{p.newClassName}</span></span>
                        <span className="text-[10px] text-gray-400">{p.isGraduating ? 'Mezuniyet' : `${p.studentCount} Öğrenci`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Son Onay ve ONAYLIYORUM Yazma */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                    <h4 className="text-sm font-black text-rose-900 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-rose-600" />
                      3. Onay: BU İŞLEM GERİ ALINAMAZ! Kesinlikle Emin Misiniz?
                    </h4>
                    <p className="text-xs text-rose-800/90 leading-relaxed font-medium">
                      {activeAcademicYear} dönemi arşive kaldırılacak ve <strong>{nextYear}</strong> eğitim-öğretim yılı başlatılacaktır. Bu işlem geri alınamaz.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-700 block">
                      Onaylamak için lütfen büyük harflerle <strong>ONAYLIYORUM</strong> yazınız:
                    </label>
                    <input
                      type="text"
                      value={confirmationInput}
                      onChange={(e) => setConfirmationInput(e.target.value)}
                      placeholder="ONAYLIYORUM"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-rose-200 focus:border-rose-600 focus:ring-4 focus:ring-rose-500/10 text-center font-black tracking-widest text-rose-900 outline-none uppercase placeholder:text-gray-300"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep((prev) => (prev - 1) as any);
                  } else {
                    setIsCloseModalOpen(false);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-100 transition-all cursor-pointer"
              >
                {currentStep > 1 ? 'Geri Dön' : 'Vazgeç'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <span>Evet, {currentStep}. Adımı Onaylıyorum</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessing || confirmationInput.trim().toUpperCase() !== 'ONAYLIYORUM'}
                  onClick={handleFinalSubmit}
                  className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 shadow-lg ${
                    confirmationInput.trim().toUpperCase() === 'ONAYLIYORUM' && !isProcessing
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 cursor-pointer animate-pulse'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isProcessing ? (
                    <span>İşleniyor, Lütfen Bekleyiniz...</span>
                  ) : (
                    <>
                      <FileCheck size={16} />
                      <span>KESİNLİKLE EMİNİM, YILI KAPAT VE SENE ATLAT</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
