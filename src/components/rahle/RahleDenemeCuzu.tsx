import React, { useState, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Printer, 
  Download, 
  X, 
  ChevronRight, 
  User, 
  Sliders, 
  RotateCcw, 
  Layers, 
  Clock, 
  Zap, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight,
  BookOpen,
  Info,
  Check
} from 'lucide-react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { 
  RahleStudentProfile, 
  RahleDenemeDailyRecord, 
  RahleDenemeSettings, 
  RahleDenemeSimulationResult 
} from '../../types/rahle';
import { 
  calculateDenemeSimulation, 
  generateMockDenemeRecords 
} from '../../utils/rahleData';

interface RahleDenemeCuzuProps {
  profile: RahleStudentProfile;
  allProfiles?: Record<string, RahleStudentProfile>;
  onUpdateProfile: (updatedFields: Partial<RahleStudentProfile>) => void;
  classes?: Record<string, string[]>;
  selectedClass?: string | null;
  onSelectStudent?: (student: string) => void;
  onSelectClass?: (cls: string) => void;
}

export const RahleDenemeCuzu: React.FC<RahleDenemeCuzuProps> = ({
  profile,
  allProfiles = {},
  onUpdateProfile,
  classes = {},
  selectedClass,
  onSelectStudent,
  onSelectClass
}) => {
  const records = useMemo(() => profile.denemeCuzuRecords || [], [profile.denemeCuzuRecords]);
  const settings: RahleDenemeSettings = useMemo(() => profile.denemeCuzuSettings || {
    targetJuz: 30,
    evaluationMonth: new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
    studyDaysPerWeek: 6,
    dailyTargetPages: 1
  }, [profile.denemeCuzuSettings]);

  // Main simulation based on saved 1-month records
  const simulation = useMemo<RahleDenemeSimulationResult>(() => {
    return calculateDenemeSimulation(records, settings);
  }, [records, settings]);

  // Modals & Panels state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RahleDenemeDailyRecord | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'records' | 'simulator'>('dashboard');

  // Teacher note state for parent report
  const initialTeacherNote = useMemo(() => {
    if (profile.denemeCuzuSettings?.teacherOverallNote) {
      return profile.denemeCuzuSettings.teacherOverallNote;
    }
    if (simulation.overallPotentialScore >= 85) {
      return `Öğrencimiz ${profile.studentName}, 1 aylık Amme Cüzü deneme sürecini üstün bir gayret, akıcı telaffuz ve yüksek kavrayışla tamamlamıştır. Günlük ezber verme hızı ve dünü hatırlama (has) düzeyi takdire şayandır. Belirlenen disiplin korunduğu takdirde ${simulation.estimatedCompletionMonthsMin}-${simulation.estimatedCompletionMonthsMax} ay içerisinde hafızlığını kemale erdirebileceği öngörülmektedir. Ailemizin evdeki manevi desteği ve dinleme takibi sürece büyük güç katacaktır.`;
    } else if (simulation.overallPotentialScore >= 70) {
      return `Öğrencimiz ${profile.studentName}, deneme sürecinde temel ezberleme kabiliyetini başarıyla ortaya koymuştur. Güçlü bir odaklanma ile hafızlık sürecine intibak edebilecek durumdadır. Has (önceki gün) tekrarlarına ve telaffuz inceliklerine özen gösterilirse ${simulation.estimatedCompletionMonthsMin}-${simulation.estimatedCompletionMonthsMax} ayda mezuniyet öngörülmektedir. Evde düzenli sesli tekrar dinlenmesi önemle tavsiye olunur.`;
    } else {
      return `Öğrencimiz ${profile.studentName}'nin deneme cüzü verileri değerlendirilmiş olup; ders devamlılığı ve zihinsel hazırlık adımlarında bir süre daha pekiştirme yapılması faydalı olacaktır. Kısa sure ezberleri ve yüzünden okuma hızlandırma çalışmalarıyla desteklenerek hafızlığa geçişi planlanabilir.`;
    }
  }, [profile.denemeCuzuSettings?.teacherOverallNote, profile.studentName, simulation]);

  const [reportTeacherNote, setReportTeacherNote] = useState<string>(initialTeacherNote);
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);

  // Sync when initialChanges or profile changes
  React.useEffect(() => {
    setReportTeacherNote(initialTeacherNote);
  }, [initialTeacherNote]);

  const handleSaveTeacherNote = (noteText?: string) => {
    const textToSave = noteText !== undefined ? noteText : reportTeacherNote;
    onUpdateProfile({
      denemeCuzuSettings: {
        ...settings,
        teacherOverallNote: textToSave
      }
    });
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2500);
  };

  const recentTeacherNotes = useMemo(() => {
    return records
      .filter(r => r.teacherNote && r.teacherNote.trim().length > 0)
      .slice(-4);
  }, [records]);

  // Interactive What-If Simulation State (Sliders)
  const [simEzber, setSimEzber] = useState<number>(() => simulation.dailyEzberAvg || 85);
  const [simHas, setSimHas] = useState<number>(() => simulation.hasRetentionAvg || 85);
  const [simGalat, setSimGalat] = useState<number>(() => simulation.avgGalatCount || 1);
  const [simAttendance, setSimAttendance] = useState<number>(() => simulation.attendanceRate || 95);
  const [simPagesPerTurn, setSimPagesPerTurn] = useState<number>(() => simulation.recommendedPagesPerTurn || 1);

  // Sync sliders when real records change
  React.useEffect(() => {
    if (simulation.totalDaysEvaluated > 0) {
      setSimEzber(simulation.dailyEzberAvg);
      setSimHas(simulation.hasRetentionAvg);
      setSimGalat(simulation.avgGalatCount);
      setSimAttendance(simulation.attendanceRate);
      setSimPagesPerTurn(simulation.recommendedPagesPerTurn);
    }
  }, [simulation.totalDaysEvaluated, simulation.dailyEzberAvg, simulation.hasRetentionAvg, simulation.avgGalatCount, simulation.attendanceRate, simulation.recommendedPagesPerTurn]);

  // Dynamic what-if calculated simulation
  const whatIfResult = useMemo(() => {
    const mockRecs: RahleDenemeDailyRecord[] = [
      {
        id: 'whatif',
        date: new Date().toISOString().split('T')[0],
        dayNumber: 1,
        dailyEzberScore: simEzber,
        dailyEzberStatus: simEzber >= 90 ? 'tam' : 'iyi',
        hasRetentionScore: simHas,
        hasStatus: simHas >= 90 ? 'cok_kuvvetli' : 'iyi',
        galatCount: simGalat,
        attendanceStatus: simAttendance >= 90 ? 'verdi' : (simAttendance >= 70 ? 'eksik' : 'kaldi'),
        createdAt: new Date().toISOString()
      }
    ];
    const base = calculateDenemeSimulation(mockRecs, settings);

    // Adjust months by pages per turn factor
    let monthsMin = base.estimatedCompletionMonthsMin;
    let monthsMax = base.estimatedCompletionMonthsMax;

    if (simPagesPerTurn === 2) {
      monthsMin = Math.max(8, Math.round(monthsMin * 0.7));
      monthsMax = Math.max(11, Math.round(monthsMax * 0.72));
    } else if (simPagesPerTurn === 3) {
      monthsMin = Math.max(6, Math.round(monthsMin * 0.52));
      monthsMax = Math.max(9, Math.round(monthsMax * 0.55));
    }

    const today = new Date();
    const avgM = Math.round((monthsMin + monthsMax) / 2);
    const targetD = new Date(today);
    targetD.setMonth(targetD.getMonth() + avgM);

    return {
      ...base,
      estimatedCompletionMonthsMin: monthsMin,
      estimatedCompletionMonthsMax: monthsMax,
      estimatedCompletionDate: targetD.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
      recommendedPagesPerTurn: simPagesPerTurn
    };
  }, [simEzber, simHas, simGalat, simAttendance, simPagesPerTurn, settings]);

  // New/Edit Entry Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    date: todayStr,
    dayNumber: (records.length + 1) || 1,
    juzNo: 30,
    pageNo: ((records.length % 20) + 1) || 1,
    surahName: 'Nebe Suresi',
    dailyEzberScore: 90,
    dailyEzberStatus: 'tam' as 'tam' | 'iyi' | 'yarim' | 'yapamadi',
    hasRetentionScore: 85,
    hasStatus: 'cok_kuvvetli' as 'cok_kuvvetli' | 'iyi' | 'orta' | 'zayif' | 'okunamadi',
    galatCount: 0,
    galatSeverity: 'yok' as 'yok' | 'hafif' | 'orta' | 'agir',
    galatNotes: '',
    attendanceStatus: 'verdi' as 'verdi' | 'eksik' | 'kaldi' | 'izinli' | 'gelmedi',
    teacherNote: ''
  });

  // Open modal for new entry
  const handleOpenAddModal = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      dayNumber: (records.length + 1) || 1,
      juzNo: 30,
      pageNo: ((records.length % 20) + 1) || 1,
      surahName: getSurahNameByDay(records.length + 1),
      dailyEzberScore: 90,
      dailyEzberStatus: 'tam',
      hasRetentionScore: 85,
      hasStatus: 'cok_kuvvetli',
      galatCount: 0,
      galatSeverity: 'yok',
      galatNotes: '',
      attendanceStatus: 'verdi',
      teacherNote: ''
    });
    setEditingRecord(null);
    setShowAddModal(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (rec: RahleDenemeDailyRecord) => {
    setEditingRecord(rec);
    setFormData({
      date: rec.date,
      dayNumber: rec.dayNumber,
      juzNo: rec.juzNo || 30,
      pageNo: rec.pageNo || 1,
      surahName: rec.surahName || '',
      dailyEzberScore: rec.dailyEzberScore,
      dailyEzberStatus: rec.dailyEzberStatus,
      hasRetentionScore: rec.hasRetentionScore,
      hasStatus: rec.hasStatus,
      galatCount: rec.galatCount,
      galatSeverity: rec.galatSeverity || (rec.galatCount === 0 ? 'yok' : 'hafif'),
      galatNotes: rec.galatNotes || '',
      attendanceStatus: rec.attendanceStatus,
      teacherNote: rec.teacherNote || ''
    });
    setShowAddModal(true);
  };

  // Helper surah names in 30th Juz
  function getSurahNameByDay(day: number): string {
    const list = [
      'Nebe Suresi (1-30)',
      'Nebe (31-40) & Naziat (1-15)',
      'Naziat Suresi (16-46)',
      'Abese Suresi',
      'Tekvir Suresi',
      'İnfitar & Mutaffifin (1-17)',
      'Mutaffifin Suresi (18-36)',
      'İnşikak Suresi',
      'Büruc Suresi',
      'Tarık & A\'la Suresi',
      'Gaşiye & Fecr (1-14)',
      'Fecr Suresi (15-30)',
      'Beled & Şems Suresi',
      'Leyl & Duha Suresi',
      'İnşirah, Tin, Alak',
      'Kadir & Beyyine Suresi',
      'Zilzal, Adiyat, Karia',
      'Tekasür, Asr, Hümeze, Fil',
      'Kureyş, Maun, Kevser, Kafirun',
      'Nasr, Tebbet, İhlas, Felak, Nas'
    ];
    return list[(day - 1) % list.length] || '30. Cüz Sayfası';
  }

  // Save Record
  const handleSaveRecord = () => {
    const newRec: RahleDenemeDailyRecord = {
      id: editingRecord ? editingRecord.id : `deneme_${Date.now()}`,
      date: formData.date,
      dayNumber: Number(formData.dayNumber),
      juzNo: Number(formData.juzNo),
      pageNo: Number(formData.pageNo),
      surahName: formData.surahName,
      dailyEzberScore: Number(formData.dailyEzberScore),
      dailyEzberStatus: formData.dailyEzberStatus,
      hasRetentionScore: Number(formData.hasRetentionScore),
      hasStatus: formData.hasStatus,
      galatCount: Number(formData.galatCount),
      galatSeverity: formData.galatSeverity,
      galatNotes: formData.galatNotes,
      attendanceStatus: formData.attendanceStatus,
      teacherNote: formData.teacherNote,
      evaluatedBy: profile.advisorTeacher || 'Hafızlık Eğiticisi',
      createdAt: editingRecord ? editingRecord.createdAt : new Date().toISOString()
    };

    let updatedRecords: RahleDenemeDailyRecord[];
    if (editingRecord) {
      updatedRecords = records.map(r => r.id === editingRecord.id ? newRec : r);
    } else {
      updatedRecords = [...records, newRec].sort((a, b) => a.dayNumber - b.dayNumber);
    }

    onUpdateProfile({ denemeCuzuRecords: updatedRecords });
    setShowAddModal(false);
    setEditingRecord(null);
  };

  // Delete Record
  const handleDeleteRecord = (id: string) => {
    if (window.confirm("Bu günün deneme değerlendirme kaydını silmek istediğinize emin misiniz?")) {
      const nextRecs = records.filter(r => r.id !== id);
      onUpdateProfile({ denemeCuzuRecords: nextRecs });
    }
  };

  // Load Mock Data
  const handleLoadMockRecords = () => {
    if (window.confirm("Öğrenciye 24 günlük gerçekçi Amme Cüzü (30. Cüz) deneme değerlendirme verisi yüklensin mi? Bu verilerle simülasyon ve süre tahmini hemen hesaplanacaktır.")) {
      const mockData = generateMockDenemeRecords(profile.studentName);
      onUpdateProfile({ denemeCuzuRecords: mockData });
    }
  };

  // Clear Records
  const handleClearRecords = () => {
    if (window.confirm("Öğrencinin tüm Deneme Cüzü kayıtlarını temizlemek istediğinize emin misiniz?")) {
      onUpdateProfile({ denemeCuzuRecords: [] });
    }
  };

  // PDF Export Ref
  const reportPrintRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!reportPrintRef.current) return;
    setIsExportingPdf(true);
    try {
      const element = reportPrintRef.current;
      const originalDisplay = element.style.display;
      element.style.display = 'block';

      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      element.style.display = originalDisplay;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Deneme_Cuzu_Raporu_${profile.studentName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDirectPrint = () => {
    window.print();
  };

  // Level Badge Color & Label Helper
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'ustun':
        return { label: 'ÜSTÜN POTANSİYEL', bg: 'bg-emerald-500 text-white', border: 'border-emerald-600', ring: 'ring-emerald-200' };
      case 'guclu':
        return { label: 'GÜÇLÜ POTANSİYEL', bg: 'bg-blue-600 text-white', border: 'border-blue-700', ring: 'ring-blue-200' };
      case 'dengeli':
        return { label: 'DENGELİ POTANSİYEL', bg: 'bg-amber-500 text-white', border: 'border-amber-600', ring: 'ring-amber-200' };
      case 'destek_gerekli':
        return { label: 'DESTEK GEREKLİ', bg: 'bg-orange-500 text-white', border: 'border-orange-600', ring: 'ring-orange-200' };
      default:
        return { label: 'HAZIRLIK TEKRARI', bg: 'bg-rose-500 text-white', border: 'border-rose-600', ring: 'ring-rose-200' };
    }
  };

  const levelBadge = getLevelBadge(simulation.potentialLevel);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER & STUDENT SWITCHER */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/70 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-100/40 via-orange-50/20 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black tracking-wide border border-amber-200">
              <Sparkles size={14} className="text-amber-600" />
              <span>YÜZÜNDEN SONRASI AŞAMA • DENEME CÜZÜ (30. CÜZ) DEĞERLENDİRMESİ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Deneme Cüzü & Hafızlık Potansiyel Simülasyonu
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl leading-relaxed">
              Öğrencinin 1 aylık deneme cüzü (Amme Cüzü) sürecindeki <strong>Günlük Ezber</strong>, <strong>Has Durumu (Dünü Hatırlama)</strong>, <strong>Galed (Telaffuz Hata) Sayısı</strong> ve <strong>Ders Devamlılığı</strong> verileriyle hafızlığa ulaşma potansiyelini simüle eder ve tahmini bitirme süresini hesaplar.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={handleOpenAddModal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Yeni Gün Girişi</span>
            </button>

            {records.length === 0 ? (
              <button
                onClick={handleLoadMockRecords}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all cursor-pointer"
                title="24 Günlük Örnek Amme Cüzü Verisi Yükle"
              >
                <Sparkles size={14} className="text-amber-600" />
                <span>Örnek 1 Aylık Veri Yükle</span>
              </button>
            ) : (
              <button
                onClick={handleClearRecords}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 font-semibold text-xs transition-all cursor-pointer"
                title="Tüm Deneme Kayıtlarını Temizle"
              >
                <Trash2 size={14} />
                <span>Temizle</span>
              </button>
            )}

            <button
              onClick={() => setShowPrintModal(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <FileText size={15} />
              <span>Veli & Komisyon Raporu</span>
            </button>
          </div>
        </div>

        {/* Student Bar & Sub-Nav Switcher */}
        <div className="mt-6 pt-5 border-t border-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black flex items-center justify-center shadow-sm text-sm">
              {profile.studentName.charAt(0) || 'Ö'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-slate-900">{profile.studentName}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  {profile.className}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${levelBadge.bg}`}>
                  {levelBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Rehber: <strong className="text-slate-700">{profile.advisorTeacher || 'Hafızlık Eğiticisi'}</strong> • Değerlendirilen Gün: <strong className="text-amber-700">{records.length} / 30 Gün</strong>
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp size={14} className={activeTab === 'dashboard' ? 'text-amber-600' : ''} />
              <span>Analiz & Simülasyon</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders size={14} className={activeTab === 'simulator' ? 'text-amber-600' : ''} />
              <span>Canlı Simülatör</span>
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'records'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar size={14} className={activeTab === 'records' ? 'text-amber-600' : ''} />
              <span>Günlük Kayıtlar ({records.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 CORE METRIC CARDS (Requested by User) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kriter 1: Günlük Ezberini Yapabilme (Ham) */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:border-gray-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              Ham Kapasitesi
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Günlük Ezberini Yapabilme
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-gray-900">
                %{simulation.dailyEzberAvg}
              </span>
              <span className="text-xs font-bold text-gray-400">/ 100 Puan</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${simulation.dailyEzberAvg}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-tight">
            Öğrencinin verilen yeni sayfayı (hamı) zamanında ve eksiksiz çıkarma performansı.
          </p>
        </div>

        {/* Kriter 2: Bir Önceki Günkü Ezberini Hatırlama (Has Durumu) */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:border-gray-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              Has Durumu
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Dünü Hatırlama Düzeyi
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-gray-900">
                %{simulation.hasRetentionAvg}
              </span>
              <span className="text-xs font-bold text-gray-400">/ 100 Puan</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${simulation.hasRetentionAvg}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-tight">
            Önceki gün okunan dersin (has) zihinde kalıcılık ve pişme derecesi.
          </p>
        </div>

        {/* Kriter 3: Ezberi Verirken Yaptığı Galed’ler */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:border-gray-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              Galed / Galat
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Ortalama Galed Sayısı
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-gray-900">
                {simulation.avgGalatCount}
              </span>
              <span className="text-xs font-bold text-gray-400">Hata / Sayfa</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(10, Math.min(100, 100 - simulation.avgGalatCount * 20))}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-tight">
            Ezber tesliminde yapılan telaffuz, tecvid ve mahreç takılma sıklığı.
          </p>
        </div>

        {/* Kriter 4: Ders Verebilme Devamlılığı */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:border-gray-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              İstikrar & Disiplin
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Ders Verme Devamlılığı
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-gray-900">
                %{simulation.attendanceRate}
              </span>
              <span className="text-xs font-bold text-gray-400">Firesiz Oran</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${simulation.attendanceRate}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-tight">
            Öğrencinin her gün kendisine verilen ezberi eksiksiz teslim etme disiplini.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB CONTENT 1: DASHBOARD (Analiz & Simülasyon) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* MASTER SIMULATION HERO CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Overall Score & Level */}
              <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                  <Award size={14} className="text-amber-700" />
                  <span>1 AYLIK DENEME CÜZÜ VERİLERİNE GÖRE</span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col items-center justify-center font-black shadow-2xs shrink-0">
                    <span className="text-2xl tracking-tight">%{simulation.overallPotentialScore}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800">Potansiyel</span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                      {simulation.potentialTitle}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      {records.length} günlük gerçek ders verileri işlendi
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-medium leading-relaxed bg-amber-50/40 p-3.5 rounded-2xl border border-amber-200/60">
                  {simulation.verdictSummary}
                </p>
              </div>

              {/* Middle Column: Estimated Completion Time Projection */}
              <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-900 flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-700" />
                  <span>Tahmini Hafızlık Tamamlama Süresi</span>
                </span>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-amber-700">
                      {simulation.estimatedCompletionMonthsMin} - {simulation.estimatedCompletionMonthsMax}
                    </span>
                    <span className="text-lg font-bold text-gray-800">AY</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-between pt-2 border-t border-gray-200">
                    <span>Tahmini Mezuniyet:</span>
                    <strong className="text-gray-900 font-bold">{simulation.estimatedCompletionDate}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-400 block font-semibold">Tavsiye Usul:</span>
                    <strong className="text-gray-900 font-bold">{simulation.recommendedPagesPerTurn} Sayfa Usulü</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-400 block font-semibold">Günlük Çalışma:</span>
                    <strong className="text-gray-900 font-bold">{simulation.recommendedDailyHours} Saat / Gün</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Roadmap & Turn Breakdown */}
              <div className="lg:col-span-3 space-y-3">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-900 flex items-center gap-1.5">
                  <Layers size={14} className="text-amber-700" />
                  <span>Dönüşler Yol Haritası</span>
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-gray-600">1. Tur (Başlangıç):</span>
                    <span className="text-amber-800 font-bold">1 - 2. Ay</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-gray-600">2-5. Tur (Kavrama):</span>
                    <span className="text-amber-800 font-bold">3 - 6. Ay</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-gray-600">6-15. Tur (Seri Hız):</span>
                    <span className="text-amber-800 font-bold">7 - 11. Ay</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-gray-600">16-20. Tur (Pişirme):</span>
                    <span className="text-amber-800 font-bold">12 - {simulation.estimatedCompletionMonthsMax}. Ay</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('simulator')}
                  className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sliders size={13} />
                  <span>Farklı Senaryoları Simüle Et</span>
                </button>
              </div>
            </div>
          </div>

          {/* PEDAGOGICAL STRENGTHS & RISK ANALYSIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Güçlü Yönler */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Tespit Edilen Güçlü Yönler</h3>
                  <p className="text-[11px] text-slate-500 font-medium">1 aylık Amme Cüzü dinletisinde öne çıkan kabiliyetler</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {simulation.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 font-medium">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Riskler ve Eylem Önerileri */}
            <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Gelişim Alanları & Pedagojik Öneriler</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Hafızlığın aksamaması için rehberlik tavsiyeleri</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {simulation.risksAndSuggestions.map((risk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs text-amber-950 font-medium">
                    <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB CONTENT 2: CANLI SİMÜLATÖR (What-If Interactive Simulator) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'simulator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                <Sliders size={14} className="text-amber-700" />
                <span>İNTERAKTİF HAFIZLIK TAMAMLAMA SİMÜLATÖRÜ</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Kriter Değişimlerinin Hafızlık Süresine Etkisi
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Aşağıdaki 4 kriter parametresini değiştirerek öğrencinin temposunu artırdığında hafızlığı ne kadar sürede bitirebileceğini canlı olarak test edin.
              </p>
            </div>

            <button
              onClick={() => {
                setSimEzber(simulation.dailyEzberAvg || 85);
                setSimHas(simulation.hasRetentionAvg || 85);
                setSimGalat(simulation.avgGalatCount || 1);
                setSimAttendance(simulation.attendanceRate || 95);
                setSimPagesPerTurn(simulation.recommendedPagesPerTurn || 1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-all"
            >
              <RotateCcw size={14} />
              <span>Gerçek Değerlere Sıfırla</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sliders Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Günlük Ezber Kapasitesi */}
              <div className="space-y-2 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black inline-flex items-center justify-center text-[10px]">1</span>
                    Günlük Ezberini Yapabilme (Ham Puanı)
                  </span>
                  <span className="font-black text-amber-800 text-sm">%{simEzber}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={simEzber}
                  onChange={(e) => setSimEzber(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>%30 (Zorlanarak)</span>
                  <span>%70 (Orta)</span>
                  <span>%100 (Kusursuz / Hızlı)</span>
                </div>
              </div>

              {/* Slider 2: Has Hatırlama Düzeyi */}
              <div className="space-y-2 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 font-black inline-flex items-center justify-center text-[10px]">2</span>
                    Dünü Hatırlama Düzeyi (Has Durumu)
                  </span>
                  <span className="font-black text-blue-800 text-sm">%{simHas}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={simHas}
                  onChange={(e) => setSimHas(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>%20 (Unutuyor)</span>
                  <span>%60 (Orta Pişmiş)</span>
                  <span>%100 (Çok Kuvvetli)</span>
                </div>
              </div>

              {/* Slider 3: Galed (Telaffuz Hata Sayısı) */}
              <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-black inline-flex items-center justify-center text-[10px]">3</span>
                    Galed Sayısı (Sayfa Başına Ortalama Hata)
                  </span>
                  <span className="font-black text-emerald-800 text-sm">{simGalat} Hata / Sayfa</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={simGalat}
                  onChange={(e) => setSimGalat(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>0 Hata (Kusursuz / Fasih)</span>
                  <span>2 Hata (Kabul Edilebilir)</span>
                  <span>5+ Hata (Riskli)</span>
                </div>
              </div>

              {/* Slider 4: Ders Devamlılığı */}
              <div className="space-y-2 p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 font-black inline-flex items-center justify-center text-[10px]">4</span>
                    Ders Verebilme Devamlılığı (Disiplin)
                  </span>
                  <span className="font-black text-purple-800 text-sm">%{simAttendance}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={simAttendance}
                  onChange={(e) => setSimAttendance(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>%50 (Sık Aksamalı)</span>
                  <span>%80 (Ortalama)</span>
                  <span>%100 (Firesiz Her Gün)</span>
                </div>
              </div>

              {/* Usul Seçimi: 1 Sayfa / 2 Sayfa / 3 Sayfa */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-xs text-slate-800 block">
                  Dönüş Usulü (Günde Kaç Sayfa ile Gidecek?)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSimPagesPerTurn(num)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        simPagesPerTurn === num
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num} Sayfa Usulü
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time What-If Projection Box (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-amber-950 rounded-3xl p-6 sm:p-7 text-white space-y-6 shadow-lg">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  CANLI SİMÜLASYON SONUCU
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center">
                    %{whatIfResult.overallPotentialScore}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{whatIfResult.potentialTitle}</h3>
                    <p className="text-xs text-amber-200/80 mt-0.5">Seçilen parametrelere göre anlık projeksiyon</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">Tahmini Hafızlık Tamamlama Süresi:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-amber-300">
                    {whatIfResult.estimatedCompletionMonthsMin} - {whatIfResult.estimatedCompletionMonthsMax}
                  </span>
                  <span className="text-xl font-bold text-white">AY</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-xs text-slate-300 flex justify-between">
                  <span>Öngörülen Bitiş:</span>
                  <strong className="text-amber-300 font-bold">{whatIfResult.estimatedCompletionDate}</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span>Seçilen Sayfa Usulü:</span>
                  <strong className="text-white">{whatIfResult.recommendedPagesPerTurn} Sayfa</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span>Gereken Günlük Çalışma:</span>
                  <strong className="text-white">{whatIfResult.recommendedDailyHours} Saat</strong>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Hata Toleransı:</span>
                  <strong className="text-emerald-400">{simGalat <= 1 ? 'Çok Temiz' : 'Pekiştirme Şart'}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-200/90 leading-relaxed">
                💡 <strong>Pedagojik Not:</strong> Galed sayısını 0-1 aralığına indirmek ve devamlılığı %95 üzerine çıkarmak, öğrencinin hafızlık sürecini ortalama <strong>4 ila 6 ay</strong> kısaltmaktadır!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB CONTENT 3: GÜNLÜK KAYITLAR (1 Aylık Çizelge) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                1 Aylık Deneme Cüzü Günlük Kayıt Çizelgesi
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Öğrencinin 30. Cüz (Amme Cüzü) ezberinde her gün verdiği derslerin detaylı değerlendirmeleri.
              </p>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
            >
              <Plus size={15} />
              <span>Gün Değerlendirmesi Ekle</span>
            </button>
          </div>

          {records.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-amber-200 rounded-3xl bg-amber-50/40 space-y-3">
              <Sparkles size={36} className="text-amber-500 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">Henüz Deneme Cüzü Kaydı Girilmedi</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Öğrencinin Yüzünden Okuma & Hazırlık sonrası aşamasını değerlendirmek için her günkü dersini kaydedin veya hemen hazır örnek verilerle simülasyonu deneyin.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold cursor-pointer hover:bg-amber-700"
                >
                  İlk Kaydı Ekle
                </button>
                <button
                  onClick={handleLoadMockRecords}
                  className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold cursor-pointer hover:bg-amber-50"
                >
                  Örnek 24 Günlük Veri Yükle
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3 text-center">Gün</th>
                    <th className="p-3">Tarih</th>
                    <th className="p-3">Cüz / Sayfa / Sure</th>
                    <th className="p-3 text-center">1. Günlük Ezber (Ham)</th>
                    <th className="p-3 text-center">2. Dünü Hatırlama (Has)</th>
                    <th className="p-3 text-center">3. Galed (Hata)</th>
                    <th className="p-3 text-center">4. Devamlılık</th>
                    <th className="p-3">Hoca Notu</th>
                    <th className="p-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {records.map((rec) => (
                    <tr key={rec.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3 text-center font-black text-amber-900">
                        #{rec.dayNumber}
                      </td>
                      <td className="p-3 whitespace-nowrap text-slate-600">
                        {rec.date}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{rec.surahName || '30. Cüz'}</div>
                        <div className="text-[10px] text-slate-400">Sayfa {rec.pageNo || '-'}</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-black ${
                          rec.dailyEzberScore >= 85 ? 'bg-amber-100 text-amber-900' : (rec.dailyEzberScore >= 70 ? 'bg-amber-50 text-amber-800' : 'bg-rose-100 text-rose-800')
                        }`}>
                          %{rec.dailyEzberScore}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-black ${
                          rec.hasRetentionScore >= 85 ? 'bg-blue-100 text-blue-900' : (rec.hasRetentionScore >= 70 ? 'bg-blue-50 text-blue-800' : 'bg-rose-100 text-rose-800')
                        }`}>
                          %{rec.hasRetentionScore}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-black ${
                          rec.galatCount === 0 ? 'bg-emerald-100 text-emerald-900' : (rec.galatCount <= 2 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900')
                        }`}>
                          {rec.galatCount} Hata
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          rec.attendanceStatus === 'verdi'
                            ? 'bg-emerald-100 text-emerald-800'
                            : (rec.attendanceStatus === 'eksik' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800')
                        }`}>
                          {rec.attendanceStatus === 'verdi' ? 'Verdi' : (rec.attendanceStatus === 'eksik' ? 'Eksik' : 'Kaldı')}
                        </span>
                      </td>
                      <td className="p-3 max-w-xs truncate text-slate-500 text-[11px]">
                        {rec.teacherNote || '-'}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(rec)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                            title="Düzenle"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(rec.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: YENİ GÜN DEĞERLENDİRMESİ EKLE / DÜZENLE */}
      {/* ------------------------------------------------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-amber-200 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    {editingRecord ? 'Deneme Günü Değerlendirmesini Düzenle' : 'Yeni Deneme Cüzü Günü Girişi'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Öğrenci: {profile.studentName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Tarih, Gün No, Sayfa No */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Tarih</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Gün Sırası</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.dayNumber}
                    onChange={(e) => setFormData({ ...formData, dayNumber: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Sayfa No</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.pageNo}
                    onChange={(e) => setFormData({ ...formData, pageNo: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Sure / Ayet Bilgisi */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Sure / Ayet Aralığı</label>
                <input
                  type="text"
                  value={formData.surahName}
                  onChange={(e) => setFormData({ ...formData, surahName: e.target.value })}
                  placeholder="Örn: Nebe Suresi (1-30) veya Sayfa 582"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              {/* 1. Kriter: Günlük Ezberini Yapabilme (Ham) */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-900">1. Günlük Ezberini Yapabilme (Ham Puanı)</span>
                  <span className="font-black text-amber-900 text-sm">%{formData.dailyEzberScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.dailyEzberScore}
                  onChange={(e) => setFormData({ ...formData, dailyEzberScore: Number(e.target.value) })}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex gap-2 pt-1">
                  {(['tam', 'iyi', 'yarim', 'yapamadi'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormData({ 
                        ...formData, 
                        dailyEzberStatus: st,
                        dailyEzberScore: st === 'tam' ? 95 : (st === 'iyi' ? 80 : (st === 'yarim' ? 50 : 0))
                      })}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                        formData.dailyEzberStatus === st
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {st === 'tam' ? 'Tam' : (st === 'iyi' ? 'İyi' : (st === 'yarim' ? 'Yarım' : 'Yapamadı'))}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Kriter: Dünü Hatırlama Düzeyi (Has Durumu) */}
              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-900">2. Dünü Hatırlama Düzeyi (Has Durumu)</span>
                  <span className="font-black text-blue-900 text-sm">%{formData.hasRetentionScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.hasRetentionScore}
                  onChange={(e) => setFormData({ ...formData, hasRetentionScore: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex gap-2 pt-1">
                  {(['cok_kuvvetli', 'iyi', 'orta', 'zayif'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormData({ 
                        ...formData, 
                        hasStatus: st,
                        hasRetentionScore: st === 'cok_kuvvetli' ? 95 : (st === 'iyi' ? 80 : (st === 'orta' ? 60 : 30))
                      })}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                        formData.hasStatus === st
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {st === 'cok_kuvvetli' ? 'Çok Pişmiş' : (st === 'iyi' ? 'Pişmiş' : (st === 'orta' ? 'Orta' : 'Zayıf'))}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Kriter: Galed'ler & 4. Kriter: Devamlılık */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <span className="font-black text-emerald-900 block">3. Galed (Hata) Sayısı</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={formData.galatCount}
                      onChange={(e) => setFormData({ ...formData, galatCount: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl border border-emerald-300 font-black text-emerald-950 focus:outline-hidden"
                    />
                    <span className="text-[11px] text-emerald-700 font-bold">Hata</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
                  <span className="font-black text-purple-900 block">4. Ders Devamlılığı</span>
                  <select
                    value={formData.attendanceStatus}
                    onChange={(e) => setFormData({ ...formData, attendanceStatus: e.target.value as any })}
                    className="w-full px-3 py-1.5 rounded-xl border border-purple-300 font-bold text-purple-950 focus:outline-hidden"
                  >
                    <option value="verdi">Dersi Verdi (Eksiksiz)</option>
                    <option value="eksik">Eksik Verdi</option>
                    <option value="kaldi">Kaldı (Ezber Çıkmadı)</option>
                    <option value="izinli">İzinli / Mazeretli</option>
                    <option value="gelmedi">Gelmedi / Devamsız</option>
                  </select>
                </div>
              </div>

              {/* Hoca Notu */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Eğitici Gözlem & Notu</label>
                <input
                  type="text"
                  value={formData.teacherNote}
                  onChange={(e) => setFormData({ ...formData, teacherNote: e.target.value })}
                  placeholder="Örn: Telaffuz akıcı, medleri kuvvetli, has tekrarı yapıldı."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleSaveRecord}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-sm"
              >
                {editingRecord ? 'Değişiklikleri Kaydet' : 'Değerlendirmeyi Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: VELİ & KOMİSYON DENEME CÜZÜ RAPORU (PDF & PRINT) */}
      {/* ------------------------------------------------------------- */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 max-h-[92vh] overflow-y-auto">
            {/* Modal Actions Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  Deneme Cüzü Hafızlık Değerlendirme & Potansiyel Raporu
                </h3>
                <p className="text-xs text-slate-500">
                  Veli bilgilendirmesi ve Hafızlık Tespit Komisyonu için A4 formatında resmi rapor.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-sm"
                >
                  <Download size={14} />
                  <span>{isExportingPdf ? 'PDF Hazırlanıyor...' : 'PDF İndir'}</span>
                </button>
                <button
                  onClick={handleDirectPrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
                >
                  <Printer size={14} />
                  <span>Yazdır</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Hoca Notu & Veli Bilgilendirme Editörü (no-print) */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-3 no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs">
                    ✍️ Hoca Notu
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-amber-950 uppercase">
                      Veli Raporu İçin Eğitici / Hoca Kanaat Notu
                    </h4>
                    <p className="text-[11px] text-amber-800">
                      Bu not doğrudan aşağıdaki resmî PDF raporunda veliye ve komisyona gösterilir.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isNoteSaved && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 animate-in fade-in">
                      <Check size={14} /> Kaydedildi
                    </span>
                  )}
                  <button
                    onClick={() => handleSaveTeacherNote()}
                    className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Notu Kaydet &amp; Rapora Yansıt
                  </button>
                </div>
              </div>

              <textarea
                value={reportTeacherNote}
                onChange={(e) => setReportTeacherNote(e.target.value)}
                rows={3}
                placeholder="Öğrencinin ezber gayreti, veliye tavsiyeler ve hafızlık uygunluk kanaati..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
              />

              {/* Hızlı Şablonlar */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-amber-900">Hazır Hoca Notu Şablonları:</span>
                <button
                  type="button"
                  onClick={() => {
                    const text = `Öğrencimiz ${profile.studentName}, 1 aylık Deneme Cüzü sürecinde üstün ezber kabiliyeti ve yüksek devamlılık göstermiştir. Has hatırlama başarısı çok yüksek olup ortalama ${simulation.estimatedCompletionMonthsMin}-${simulation.estimatedCompletionMonthsMax} ayda hafızlığını başarıyla tamamlayacağı öngörülmektedir. Gayreti takdir edilmiştir.`;
                    setReportTeacherNote(text);
                    handleSaveTeacherNote(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-[10px] font-bold text-amber-900 hover:bg-amber-100 cursor-pointer transition-colors"
                >
                  🌟 Üstün Başarı
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text = `Öğrencimiz ${profile.studentName}'nin kavrama ve ezber hızı hafızlık standartlarına uygundur. Özellikle dünkü dersi hatırlama (has) ve tecvid telaffuzlarına odaklanılması halinde ${simulation.estimatedCompletionMonthsMin}-${simulation.estimatedCompletionMonthsMax} ayda hafızlığı tamamlanabilir. Evde veli dinleme desteği süreci ivmelendirecektir.`;
                    setReportTeacherNote(text);
                    handleSaveTeacherNote(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-[10px] font-bold text-amber-900 hover:bg-amber-100 cursor-pointer transition-colors"
                >
                  👍 Dengeli &amp; İstikrarlı
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text = `Öğrencimiz ${profile.studentName} istekli ve gayretli bir öğrencimizdir. Ders devamlılığı ve evde günlük sesli tekrar disiplini güçlendirildiği takdirde hafızlık sürecine tam intibak sağlayacaktır. Ailemizin günlük ders takibini yakından sürdürmesini rica ederiz.`;
                    setReportTeacherNote(text);
                    handleSaveTeacherNote(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-[10px] font-bold text-amber-900 hover:bg-amber-100 cursor-pointer transition-colors"
                >
                  🤝 Veli İşbirliği Vurgulu
                </button>
              </div>
            </div>

            {/* PRINTABLE A4 CONTENT (MaarifMerkezi.Com Standard) */}
            <div 
              ref={reportPrintRef} 
              className="bg-white p-5 sm:p-7 border border-slate-200 rounded-2xl space-y-3.5 sm:space-y-4 text-slate-800 shadow-sm"
              style={{ minHeight: '1050px' }}
            >
              {/* Report Header */}
              <div className="border-b-2 border-amber-700/80 pb-3 text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                  MaarifMerkezi.Com • RAHLE SİSTEMİ
                </h1>
                <p className="text-xs font-black tracking-widest text-amber-800 uppercase">
                  DENEME CÜZÜ HAFIZLIK POTANSİYELİ & SÜRE TAHMİN RAPORU
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Rapor No: MM-DC-{new Date().getFullYear()}-{profile.studentName.replace(/\s+/g, '').substring(0, 4).toUpperCase()} • Düzenleme Tarihi: {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>

              {/* Student Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">ÖĞRENCİ ADI SOYADI</span>
                  <strong className="text-slate-900 text-sm font-black">{profile.studentName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">SINIFI / ŞUBESİ</span>
                  <strong className="text-slate-900 text-sm font-black">{profile.className}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">REHBER EĞİTİCİ</span>
                  <strong className="text-slate-900 font-bold">{profile.advisorTeacher || 'Hafızlık Eğiticisi'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">DEĞERLENDİRME CÜZÜ</span>
                  <strong className="text-amber-800 font-bold">30. Cüz (Amme Cüzü)</strong>
                </div>
              </div>

              {/* 4 Pillars Summary Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                  1. DENEME CÜZÜ 4 TEMEL KRİTER DEĞERLENDİRME SONUÇLARI
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 block">1. Günlük Ezber (Ham)</span>
                    <div className="text-xl font-black text-gray-900">%{simulation.dailyEzberAvg}</div>
                    <p className="text-[10px] text-gray-400">Verilen sayfayı vaktinde ezberleme gücü</p>
                  </div>
                  <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 block">2. Dünü Hatırlama (Has)</span>
                    <div className="text-xl font-black text-gray-900">%{simulation.hasRetentionAvg}</div>
                    <p className="text-[10px] text-gray-400">Önceki günkü ezberi zihinde tutma</p>
                  </div>
                  <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 block">3. Galed (Hata) Oranı</span>
                    <div className="text-xl font-black text-gray-900">{simulation.avgGalatCount} Hata</div>
                    <p className="text-[10px] text-gray-400">Sayfa başı ortalama telaffuz takılması</p>
                  </div>
                  <div className="p-3 rounded-xl border border-gray-200 bg-white space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 block">4. Ders Devamlılığı</span>
                    <div className="text-xl font-black text-gray-900">%{simulation.attendanceRate}</div>
                    <p className="text-[10px] text-gray-400">Firesiz ve kesintisiz ders verme oranı</p>
                  </div>
                </div>
              </div>

              {/* Master Projection Box */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800">HAFIZLIK POTANSİYEL DERECESİ</span>
                    <h4 className="text-base font-black text-gray-900">{simulation.potentialTitle}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400">GENEL ENDEKS SKORU</span>
                    <div className="text-2xl font-black text-amber-600">%{simulation.overallPotentialScore}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="bg-amber-50/50 border border-amber-200/60 p-3 rounded-xl">
                    <span className="text-[10px] text-gray-500 block font-semibold">Tahmini Bitirme Süresi:</span>
                    <strong className="text-amber-800 text-lg font-black">
                      {simulation.estimatedCompletionMonthsMin} - {simulation.estimatedCompletionMonthsMax} AY
                    </strong>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl">
                    <span className="text-[10px] text-gray-500 block font-semibold">Öngörülen Mezuniyet:</span>
                    <strong className="text-gray-900 text-sm font-bold">{simulation.estimatedCompletionDate}</strong>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl">
                    <span className="text-[10px] text-gray-500 block font-semibold">Önerilen Başlangıç Usulü:</span>
                    <strong className="text-gray-900 text-sm font-bold">{simulation.recommendedPagesPerTurn} Sayfa Usulü</strong>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 pt-2 border-t border-gray-100 leading-relaxed font-normal">
                  {simulation.verdictSummary}
                </p>
              </div>

              {/* Strengths & Recommendations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1 p-3 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <strong className="text-emerald-950 font-bold block text-[11px]">Tespit Edilen Güçlü Yönler:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-emerald-900 text-[10.5px]">
                    {simulation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="space-y-1 p-3 rounded-xl border border-amber-200 bg-amber-50/40">
                  <strong className="text-amber-950 font-bold block text-[11px]">Gelişim Alanları &amp; Tavsiyeler:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-900 text-[10.5px]">
                    {simulation.risksAndSuggestions.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>

              {/* 3. HAFIZLIK EĞİTİCİSİ / HOCA GÖZLEM & VELİ REHBERLİK NOTU */}
              <div className="space-y-2 bg-amber-50/70 p-3 sm:p-3.5 rounded-xl border border-amber-200/90 text-xs">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-950">
                    3. EĞİTİCİ / HOCA KANAATİ &amp; VELİYE REHBERLİK DEĞERLENDİRMESİ
                  </div>
                  <span className="text-[10px] font-bold text-amber-800">
                    Eğitici: {profile.advisorTeacher || 'Hafızlık Rehber Eğiticisi'}
                  </span>
                </div>

                <div className="p-2.5 bg-white/95 rounded-lg border border-amber-200/60 text-slate-800 italic leading-relaxed text-[11px] font-medium">
                  &ldquo;{reportTeacherNote}&rdquo;
                </div>

                {recentTeacherNotes.length > 0 && (
                  <div className="pt-1.5 border-t border-amber-200/50 space-y-1">
                    <span className="text-[9px] font-black uppercase text-amber-900 block tracking-wider">
                      Son Günlük Ders Gözlem Notları:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[9.5px]">
                      {recentTeacherNotes.map((rec) => (
                        <div key={rec.id} className="bg-white/80 px-2 py-1 rounded border border-amber-100 text-slate-700">
                          <strong className="text-amber-950">Gün {rec.dayNumber} ({rec.date}):</strong> {rec.teacherNote}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Signatures */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <p className="font-bold text-slate-800">Öğrenci Velisi</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Ad Soyad / İmza</p>
                  <div className="h-12 border-b border-dashed border-slate-300 mt-2" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Hafızlık Eğiticisi</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{profile.advisorTeacher || 'Eğitici İmzası'}</p>
                  <div className="h-12 border-b border-dashed border-slate-300 mt-2" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Kurs Yöneticisi / Komisyon</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Mühür / Onay</p>
                  <div className="h-12 border-b border-dashed border-slate-300 mt-2" />
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>MaarifMerkezi.Com • Rahle Hafızlık ve Kur&apos;an Takip Sistemi</span>
                <span>Sayfa 1 / 1</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
