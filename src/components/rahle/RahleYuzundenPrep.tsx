import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Clock, 
  Timer, 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Printer, 
  Copy, 
  Check, 
  ChevronRight, 
  User, 
  HelpCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Play, 
  Pause, 
  RotateCcw, 
  BarChart3, 
  Layers,
  Star,
  Zap,
  Info,
  ShieldCheck,
  FileText,
  Download,
  X
} from 'lucide-react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { RahleStudentProfile, RahleYuzundenRecord } from '../../types/rahle';
import { 
  calculateYuzundenIndex, 
  calculateSpeedPoints, 
  formatDurationSeconds 
} from '../../utils/rahleData';

interface RahleYuzundenPrepProps {
  profile: RahleStudentProfile;
  allProfiles?: Record<string, RahleStudentProfile>;
  onUpdateProfile: (updatedFields: Partial<RahleStudentProfile>) => void;
  classes?: Record<string, string[]>;
  selectedClass?: string | null;
  onSelectStudent?: (student: string) => void;
  onSelectClass?: (cls: string) => void;
}

export const RahleYuzundenPrep: React.FC<RahleYuzundenPrepProps> = ({
  profile,
  allProfiles = {},
  onUpdateProfile,
  classes = {},
  selectedClass,
  onSelectStudent,
  onSelectClass
}) => {
  // Records list (sorted chronologically)
  const records: RahleYuzundenRecord[] = useMemo(() => {
    const list = profile.yuzundenRecords || [];
    return [...list].sort((a, b) => a.date.localeCompare(b.date));
  }, [profile.yuzundenRecords]);

  // Modal / Form state for Add or Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);

  // Form Fields
  const [monthPeriod, setMonthPeriod] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [recordDate, setRecordDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  
  // Duration state: both as min+sec and decimal
  const [durationMin, setDurationMin] = useState<number>(2);
  const [durationSec, setDurationSec] = useState<number>(0);
  const [decimalInput, setDecimalInput] = useState<string>('2.00');

  // Qualitative scores: 1 to 5
  const [mahrecScore, setMahrecScore] = useState<number>(4);
  const [tecvidScore, setTecvidScore] = useState<number>(4);
  const [teacherNotes, setTeacherNotes] = useState<string>('');

  // Built-in classroom stopwatch for measuring 1 page
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const stopwatchIntervalRef = useRef<any>(null);

  // Copy report state
  const [copiedReport, setCopiedReport] = useState(false);

  // Veli Report Modal & PDF Export
  const [isVeliReportModalOpen, setIsVeliReportModalOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [reportPrintMode, setReportPrintMode] = useState<'2_page' | '1_page'>('2_page');
  const veliReportRef = useRef<HTMLDivElement>(null);
  const veliPage1Ref = useRef<HTMLDivElement>(null);
  const veliPage2Ref = useRef<HTMLDivElement>(null);

  // Customizable report metadata
  const [reportStudentNo, setReportStudentNo] = useState('142');
  const [reportAdvisorName, setReportAdvisorName] = useState(profile.advisorTeacher || 'Kur\'an Kursu Öğreticisi');
  const [reportPrincipalName, setReportPrincipalName] = useState('Kurs / Okul Müdürü');
  const [reportParentName, setReportParentName] = useState('Öğrenci Velisi');
  const [reportDate, setReportDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [isEditingReportFields, setIsEditingReportFields] = useState(false);

  // Sync advisor name if profile updates
  useEffect(() => {
    if (profile.advisorTeacher) {
      setReportAdvisorName(profile.advisorTeacher);
    }
  }, [profile.advisorTeacher]);

  // Tab view within prep: 'detail' (student progress) or 'class_summary'
  const [viewMode, setViewMode] = useState<'student' | 'class'>('student');

  // Synchronize stopwatch
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    }
    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    };
  }, [isStopwatchRunning]);

  // Apply stopwatch to inputs
  const handleApplyStopwatch = () => {
    if (stopwatchSeconds < 30) return;
    const mins = Math.floor(stopwatchSeconds / 60);
    const secs = stopwatchSeconds % 60;
    const clampedMins = Math.max(1, Math.min(10, mins));
    setDurationMin(clampedMins);
    setDurationSec(secs);
    const dec = (clampedMins + secs / 60).toFixed(2);
    setDecimalInput(dec);
  };

  const handleResetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchSeconds(0);
  };

  // Convert Min + Sec to Decimal
  const handleMinSecChange = (m: number, s: number) => {
    const validM = Math.max(1, Math.min(10, m));
    const validS = Math.max(0, Math.min(59, s));
    setDurationMin(validM);
    setDurationSec(validS);
    const dec = (validM + validS / 60).toFixed(2);
    setDecimalInput(dec);
  };

  // Convert Decimal to Min + Sec
  const handleDecimalChange = (valStr: string) => {
    setDecimalInput(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val) && val >= 0.5 && val <= 10) {
      const mins = Math.floor(val);
      const secs = Math.round((val - mins) * 60);
      setDurationMin(Math.max(1, Math.min(10, mins)));
      setDurationSec(Math.min(59, secs));
    }
  };

  // Live computed preview for current form inputs
  const totalFormSeconds = durationMin * 60 + durationSec;
  const livePreview = useMemo(() => {
    return calculateYuzundenIndex(totalFormSeconds, mahrecScore, tecvidScore);
  }, [totalFormSeconds, mahrecScore, tecvidScore]);

  // Open modal for new record
  const handleOpenNewModal = () => {
    setEditingRecordId(null);
    const now = new Date();
    setMonthPeriod(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    setRecordDate(now.toISOString().split('T')[0]);
    setPageNumber(records.length > 0 ? (records[records.length - 1].pageNumber || 1) + 1 : 1);
    setDurationMin(2);
    setDurationSec(0);
    setDecimalInput('2.00');
    setMahrecScore(4);
    setTecvidScore(4);
    setTeacherNotes('');
    handleResetStopwatch();
    setIsModalOpen(true);
  };

  // Open modal for editing record
  const handleOpenEditModal = (rec: RahleYuzundenRecord) => {
    setEditingRecordId(rec.id);
    setMonthPeriod(rec.monthPeriod);
    setRecordDate(rec.date);
    setPageNumber(rec.pageNumber || 1);
    setDurationMin(rec.durationMinutesPart);
    setDurationSec(rec.durationSecondsPart);
    setDecimalInput(rec.durationMinutes.toFixed(2));
    setMahrecScore(rec.mahrecScore);
    setTecvidScore(rec.tecvidScore);
    setTeacherNotes(rec.teacherNotes || '');
    handleResetStopwatch();
    setIsModalOpen(true);
  };

  // Save Record
  const handleSaveRecord = () => {
    const totalSecs = durationMin * 60 + durationSec;
    const decMins = parseFloat((durationMin + durationSec / 60).toFixed(2));
    const calculated = calculateYuzundenIndex(totalSecs, mahrecScore, tecvidScore);

    const newRecord: RahleYuzundenRecord = {
      id: editingRecordId || `prep_${Date.now()}`,
      monthPeriod,
      date: recordDate,
      durationMinutes: decMins,
      durationSeconds: totalSecs,
      durationMinutesPart: durationMin,
      durationSecondsPart: durationSec,
      pageNumber,
      mahrecScore,
      tecvidScore,
      indexScore: calculated.indexScore,
      speedPoints: calculated.speedPoints,
      mahrecPoints: calculated.mahrecPoints,
      tecvidPoints: calculated.tecvidPoints,
      readinessStatus: calculated.readinessStatus,
      estimatedTimeToReady: calculated.estimatedTimeToReady,
      feedback: calculated.feedback,
      teacherNotes: teacherNotes.trim(),
      createdAt: new Date().toISOString()
    };

    let updatedList: RahleYuzundenRecord[];
    if (editingRecordId) {
      updatedList = records.map(r => r.id === editingRecordId ? newRecord : r);
    } else {
      updatedList = [...records, newRecord];
    }

    onUpdateProfile({ yuzundenRecords: updatedList });
    setIsModalOpen(false);
  };

  // Delete Record
  const handleDeleteRecord = (id: string) => {
    if (window.confirm("Bu aylık yüzünden okuma değerlendirmesini silmek istediğinize emin misiniz?")) {
      const updatedList = records.filter(r => r.id !== id);
      onUpdateProfile({ yuzundenRecords: updatedList });
    }
  };

  // Export Veli Report to high-res A4 PDF via html-to-image & jsPDF
  const handleExportVeliPdf = async () => {
    setIsExportingPdf(true);
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const renderWidth = pdfWidth - (margin * 2);
      const pageUsableHeight = pdfHeight - (margin * 2);

      if (reportPrintMode === '2_page' && veliPage1Ref.current && veliPage2Ref.current) {
        // --- SAYFA 1: Künye, Genel Endeks & Performans Kriterleri ---
        const dataUrl1 = await toPng(veliPage1Ref.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        const imgProps1 = pdf.getImageProperties(dataUrl1);
        const renderHeight1 = (imgProps1.height * renderWidth) / imgProps1.width;
        pdf.addImage(dataUrl1, 'PNG', margin, margin, renderWidth, Math.min(renderHeight1, pageUsableHeight));

        // --- SAYFA 2: Aylık Çizelge, Öğretici Görüşü & Resmî İmzalar ---
        const dataUrl2 = await toPng(veliPage2Ref.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        const imgProps2 = pdf.getImageProperties(dataUrl2);
        const renderHeight2 = (imgProps2.height * renderWidth) / imgProps2.width;
        
        pdf.addPage();
        pdf.addImage(dataUrl2, 'PNG', margin, margin, renderWidth, Math.min(renderHeight2, pageUsableHeight));
      } else if (veliReportRef.current) {
        // --- TEK SAYFA MODU VEYA TEK BLOK ÇIKTI ---
        const dataUrl = await toPng(veliReportRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        const imgProps = pdf.getImageProperties(dataUrl);
        const renderHeight = (imgProps.height * renderWidth) / imgProps.width;

        if (renderHeight <= pageUsableHeight) {
          pdf.addImage(dataUrl, 'PNG', margin, margin, renderWidth, renderHeight);
        } else {
          // Sayfaya orantılı tam sığdırma (hiçbir bilgi kesilmez veya kaybolmaz)
          const scale = pageUsableHeight / renderHeight;
          const fittedWidth = renderWidth * scale;
          const xOffset = margin + (renderWidth - fittedWidth) / 2;
          pdf.addImage(dataUrl, 'PNG', xOffset, margin, fittedWidth, pageUsableHeight);
        }
      }

      const cleanStudent = (profile.studentName || 'Ogrenci').replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '_');
      const cleanMonth = (latestRecord?.monthPeriod || 'Donem').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Hafizlik_Hazirlik_Veli_Raporu_${cleanStudent}_${cleanMonth}.pdf`;

      pdf.save(filename);
    } catch (err) {
      console.error('PDF export error:', err);
      // Graceful fallback to browser print
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrintVeliReport = () => {
    window.print();
  };

  // Latest record & Previous record for comparison
  const latestRecord: RahleYuzundenRecord | null = records.length > 0 ? records[records.length - 1] : null;
  const previousRecord: RahleYuzundenRecord | null = records.length > 1 ? records[records.length - 2] : null;

  // Differences
  const durationDiff = (latestRecord && previousRecord) 
    ? previousRecord.durationSeconds - latestRecord.durationSeconds 
    : null; // Positive means faster!
  const indexDiff = (latestRecord && previousRecord) 
    ? latestRecord.indexScore - previousRecord.indexScore 
    : null; // Positive means higher score!

  // Helpers for Status Badges
  const getReadinessBadge = (status: 'hazir' | 'yakinda' | 'gelismekte' | 'hazir_degil') => {
    switch (status) {
      case 'hazir':
        return {
          label: 'Hafızlığa Hazır',
          color: 'bg-emerald-500 text-white shadow-emerald-500/20',
          border: 'border-emerald-200 bg-emerald-50 text-emerald-800',
          dot: 'bg-emerald-500'
        };
      case 'yakinda':
        return {
          label: 'Yakında Hazır Olabilir',
          color: 'bg-amber-500 text-white shadow-amber-500/20',
          border: 'border-amber-200 bg-amber-50 text-amber-800',
          dot: 'bg-amber-500'
        };
      case 'gelismekte':
        return {
          label: 'Gelişme Aşamasında',
          color: 'bg-blue-500 text-white shadow-blue-500/20',
          border: 'border-blue-200 bg-blue-50 text-blue-800',
          dot: 'bg-blue-500'
        };
      default:
        return {
          label: 'Hazır Değil (Hazırlık Gerekir)',
          color: 'bg-rose-500 text-white shadow-rose-500/20',
          border: 'border-rose-200 bg-rose-50 text-rose-800',
          dot: 'bg-rose-500'
        };
    }
  };

  // Copy full coaching and evaluation report
  const handleCopyReport = () => {
    if (!latestRecord) return;
    const text = `📖 RAHLE HAFIZLIK HAZIRLIK & YÜZÜNDEN OKUMA RAPORU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Öğrenci: ${profile.studentName} (${profile.className})
📅 Değerlendirme Ayı: ${latestRecord.monthPeriod} (${latestRecord.date})
⏱️ 1 Sayfa Okuma Süresi: ${formatDurationSeconds(latestRecord.durationSeconds)} (${latestRecord.durationMinutes} dk)
🎯 Hafızlık Hedef Eşiği: 90 - 120 saniye (1.5 - 2.0 dk)

⭐ Mahreç Durumu: ${latestRecord.mahrecScore} / 5
⭐ Tecvid Uygulama: ${latestRecord.tecvidScore} / 5
🏆 Hazırlık Endeks Puanı: ${latestRecord.indexScore} / 100
(Hız: ${latestRecord.speedPoints}/40 + Mahreç: ${latestRecord.mahrecPoints}/30 + Tecvid: ${latestRecord.tecvidPoints}/30)

📊 HAZIRLIK DURUMU: ${getReadinessBadge(latestRecord.readinessStatus).label.toUpperCase()}
⏳ Tahmini Başlama Süresi: ${latestRecord.estimatedTimeToReady}

💬 Pedagojik Değerlendirme & Dönüt:
"${latestRecord.feedback}"
${latestRecord.teacherNotes ? `\n📝 Öğretmen Gözlem Notu: ${latestRecord.teacherNotes}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Maarif Merkezi • Rahle Hafızlık Takip Sistemi`;

    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  // Class students list for class summary tab
  const classStudentsList = useMemo(() => {
    const list: { name: string; key: string; latest?: RahleYuzundenRecord }[] = [];
    Object.entries(allProfiles).forEach(([k, prof]) => {
      if (!selectedClass || prof.className === selectedClass) {
        const pRecords = prof.yuzundenRecords || [];
        const sorted = [...pRecords].sort((a, b) => a.date.localeCompare(b.date));
        list.push({
          name: prof.studentName,
          key: k,
          latest: sorted[sorted.length - 1]
        });
      }
    });
    return list;
  }, [allProfiles, selectedClass]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-950/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-black tracking-wide text-amber-200 border border-white/20">
            <BookOpen size={15} className="text-amber-300" />
            <span>RAHLE • YÜZÜNDEN OKUMA & HAZIRLIK MODÜLÜ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Yüzünden Okuma & Hafızlık Hazırlık</span>
            <span className="text-amber-300 text-lg font-bold px-3 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/40">
              {profile.studentName}
            </span>
          </h1>

          <p className="text-amber-100/90 text-sm font-medium leading-relaxed">
            Kur'an-ı Kerim'in 1 sayfasını okuma süresi (dakika:saniye), harf mahreçleri ve tecvid tatbikini aylık periyotlarla takip edin. 
            <strong className="text-white ml-1 font-bold">Hafızlığa Hazırlık Endeks Puanı</strong> ve öngörülen başlama takvimini anlık olarak hesaplayın.
          </p>

          {/* Quick Guidance Reference */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold">
            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-300" />
              <span>Hafızlığa Hazır Eşik: 1 Sayfa ≈ 90 - 120 sn (1.5 - 2.0 dk)</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/30 flex items-center gap-1.5">
              <Clock size={13} className="text-amber-300" />
              <span>Yeni Başlayan Seviye: 1 Sayfa ≈ 8 dakika</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0 self-stretch sm:self-auto justify-end">
          <div className="bg-amber-900/60 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode('student')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'student' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-200 hover:text-white'
              }`}
            >
              Öğrenci Gelişimi
            </button>
            <button
              onClick={() => setViewMode('class')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'class' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-200 hover:text-white'
              }`}
            >
              Sınıf Genel Özeti
            </button>
          </div>

          <button
            onClick={() => setIsVeliReportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-amber-300"
            title="Öğrencinin velisine verilmek üzere resmî A4 gelişim ve hazırlık raporu aç / PDF indir"
          >
            <FileText size={18} className="text-amber-700" />
            <span>Veli Raporu (PDF)</span>
          </button>

          <button
            onClick={handleOpenNewModal}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <Plus size={18} />
            <span>Yeni Aylık Değerlendirme Gir</span>
          </button>
        </div>
      </div>

      {viewMode === 'class' ? (
        /* =================================================================== */
        /* SINIF GENEL ÖZETİ TABLOSU                                          */
        /* =================================================================== */
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Layers className="text-amber-600" size={20} />
                <span>Sınıf Yüzünden Okuma & Hazırlık Sıralaması</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Seçili sınıftaki tüm öğrencilerin en son 1 sayfa okuma süresi ve hafızlığa hazırlık endeks puanları
              </p>
            </div>

            {classes && Object.keys(classes).length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">Sınıf:</span>
                <select
                  value={selectedClass || ''}
                  onChange={(e) => onSelectClass?.(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 bg-white"
                >
                  <option value="">Tüm Sınıflar</option>
                  {Object.keys(classes).map(c => (
                    <option key={c} value={c}>{c.replace('_', '')}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-black uppercase text-gray-400 bg-gray-50/50">
                  <th className="py-3 px-4">Öğrenci Adı</th>
                  <th className="py-3 px-4">Son Ölçüm Ayı</th>
                  <th className="py-3 px-4">1 Sayfa Süresi</th>
                  <th className="py-3 px-4">Mahreç</th>
                  <th className="py-3 px-4">Tecvid</th>
                  <th className="py-3 px-4">Endeks Puanı</th>
                  <th className="py-3 px-4">Hazırlık Durumu</th>
                  <th className="py-3 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                {classStudentsList.map((stu) => {
                  const lat = stu.latest;
                  const isCurrent = stu.name === profile.studentName;
                  const b = lat ? getReadinessBadge(lat.readinessStatus) : null;

                  return (
                    <tr 
                      key={stu.key}
                      className={`hover:bg-amber-50/40 transition-colors ${isCurrent ? 'bg-amber-50/60 font-black' : ''}`}
                    >
                      <td className="py-3.5 px-4 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                          {stu.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-gray-900">{stu.name}</div>
                          {isCurrent && <span className="text-[10px] text-amber-600 font-bold">(Seçili Öğrenci)</span>}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {lat ? lat.monthPeriod : <span className="text-gray-300">Girilmedi</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        {lat ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-gray-900">{formatDurationSeconds(lat.durationSeconds)}</span>
                            <span className="text-[10px] text-gray-400 font-normal">({lat.durationMinutes} dk)</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        {lat ? (
                          <div className="flex items-center text-amber-500 gap-0.5">
                            {lat.mahrecScore} <Star size={11} className="fill-amber-400 text-amber-500 inline" />
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        {lat ? (
                          <div className="flex items-center text-amber-500 gap-0.5">
                            {lat.tecvidScore} <Star size={11} className="fill-amber-400 text-amber-500 inline" />
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        {lat ? (
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-amber-600 h-full rounded-full" 
                                style={{ width: `${lat.indexScore}%` }}
                              />
                            </div>
                            <span className="font-black text-amber-700">{lat.indexScore} p</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        {b ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${b.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${b.dot}`} />
                            {b.label}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">Değerlendirilmedi</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            onSelectStudent?.(stu.name);
                            setViewMode('student');
                          }}
                          className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-amber-600 hover:text-white text-gray-700 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Detay &amp; Giriş
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* ÖĞRENCİ GELİŞİM DETAYI                                              */
        /* =================================================================== */
        <>
          {/* Latest Metric Cards */}
          {latestRecord ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Card 1: Okuma Süresi */}
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                      Son 1 Sayfa Süresi ({latestRecord.monthPeriod})
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900">
                        {formatDurationSeconds(latestRecord.durationSeconds)}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        ({latestRecord.durationMinutes.toFixed(2)} dk)
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="text-gray-500 font-medium">Hedef: ≤ 90-120 sn</div>
                  {durationDiff !== null && (
                    <div className={`font-black flex items-center gap-1 ${durationDiff > 0 ? 'text-emerald-600' : durationDiff < 0 ? 'text-rose-600' : 'text-gray-500'}`}>
                      {durationDiff > 0 ? (
                        <>
                          <ArrowDownRight size={14} />
                          <span>{durationDiff} sn hızlandı ⚡</span>
                        </>
                      ) : durationDiff < 0 ? (
                        <>
                          <ArrowUpRight size={14} />
                          <span>{Math.abs(durationDiff)} sn uzadı</span>
                        </>
                      ) : (
                        <span>Aynı süre</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: Mahreç & Tecvid */}
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                      Mahreç &amp; Tecvid Skoru
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                        <span className="text-[11px] font-bold text-amber-800">Mahreç:</span>
                        <span className="text-lg font-black text-amber-900">{latestRecord.mahrecScore}</span>
                        <span className="text-[10px] text-amber-600">/5</span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200/60">
                        <span className="text-[11px] font-bold text-blue-800">Tecvid:</span>
                        <span className="text-lg font-black text-blue-900">{latestRecord.tecvidScore}</span>
                        <span className="text-[10px] text-blue-600">/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Star size={20} className="fill-amber-400 text-amber-600" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Mahreç: {latestRecord.mahrecPoints}/30 Puan</span>
                  <span>Tecvid: {latestRecord.tecvidPoints}/30 Puan</span>
                </div>
              </div>

              {/* Card 3: Endeks Puanı */}
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                      Hafızlığa Hazırlık Endeksi
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-amber-700">
                        {latestRecord.indexScore}
                      </span>
                      <span className="text-xs font-bold text-gray-400">/ 100 Puan</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-700 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${latestRecord.indexScore}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-400 text-[10px]">Hız: {latestRecord.speedPoints}/40p</span>
                    {indexDiff !== null && (
                      <span className={`text-[11px] ${indexDiff > 0 ? 'text-emerald-600' : indexDiff < 0 ? 'text-rose-600' : 'text-gray-500'}`}>
                        {indexDiff > 0 ? `+${indexDiff} puan artış 🚀` : `${indexDiff} puan`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 4: Hazırlık Durumu & Tahmin */}
              {(() => {
                const badge = getReadinessBadge(latestRecord.readinessStatus);
                return (
                  <div className={`rounded-3xl p-5 border shadow-xs flex flex-col justify-between ${badge.border}`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase tracking-wider opacity-75">
                          Hazırlık Durumu
                        </span>
                        <div className="text-lg font-black leading-tight flex items-center gap-1.5 mt-0.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${badge.dot}`} />
                          <span>{badge.label}</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-xs">
                        <ShieldCheck size={20} className="text-amber-800" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-current/15 text-xs font-bold flex items-center justify-between">
                      <span>Tahmini Süre:</span>
                      <span className="underline decoration-current/30">{latestRecord.estimatedTimeToReady}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <BookOpen size={30} />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-black text-amber-950">Henüz Yüzünden Okuma Kaydı Girilmedi</h3>
                <p className="text-xs text-amber-800 font-medium">
                  {profile.studentName} için ilk aylık periyot değerlendirmesini girerek 1 sayfa okuma süresini ve hazırlık endeksini ölçün.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleOpenNewModal}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md shadow-amber-600/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span>İlk Aylık Değerlendirmeyi Gir</span>
                </button>
              </div>
            </div>
          )}

          {/* Pedagojik Dönüt & Veli Bilgilendirme Kartı */}
          {latestRecord && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900">
                      Öğrenciye Özel Pedagojik Değerlendirme &amp; Hazırlık Dönütü
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Son periyotta ({latestRecord.monthPeriod}) elde edilen süre, mahreç ve tecvid verilerine dayalı tavsiyeler
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVeliReportModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    title="Veliye vermek üzere resmî gelişim raporunu aç / PDF indir"
                  >
                    <FileText size={14} />
                    <span>Veli Raporu (PDF)</span>
                  </button>

                  <button
                    onClick={handleCopyReport}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all cursor-pointer"
                    title="Veli/Öğrenciye göndermek için metni kopyala"
                  >
                    {copiedReport ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedReport ? 'Kopyalandı!' : 'Metni Kopyala'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 rounded-2xl p-5 border border-amber-100 space-y-3">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 flex-1">
                    <div className="text-xs font-black text-amber-950 uppercase tracking-wide">
                      Akıllı Hazırlık Değerlendirmesi:
                    </div>
                    <p className="text-sm text-gray-800 font-semibold leading-relaxed">
                      "{latestRecord.feedback}"
                    </p>
                  </div>
                </div>

                {latestRecord.teacherNotes && (
                  <div className="pt-3 border-t border-amber-200/50 flex items-start gap-3 text-xs">
                    <Edit3 size={15} className="text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-950 font-black">Hoca Gözlem Notu: </strong>
                      <span className="text-gray-700 font-medium">{latestRecord.teacherNotes}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Aylık İlerleme Grafiği ve Karşılaştırma */}
          {records.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grafik 1: 1 Sayfa Okuma Süresi Değişimi (Dakika & Saniye Düşüşü) */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                      <TrendingDown className="text-emerald-600" size={18} />
                      <span>Aylık 1 Sayfa Okuma Süresi İlerlemesi</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Süre azaldıkça hızlanma ve hafızlık kondisyonu artar (Hedef: 90 - 120 sn)
                    </p>
                  </div>
                  <span className="text-[11px] font-black text-emerald-700 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                    Hızlanma Eğrisi
                  </span>
                </div>

                {/* Bar chart representation */}
                <div className="space-y-4 pt-2">
                  {records.map((rec, index) => {
                    // Max duration for visual scale: 10 mins (600s)
                    const percentOfMax = Math.min(100, Math.max(10, (rec.durationSeconds / 600) * 100));
                    const isTargetMet = rec.durationSeconds <= 120;
                    const prevRec = index > 0 ? records[index - 1] : null;
                    const diffSec = prevRec ? prevRec.durationSeconds - rec.durationSeconds : null;

                    return (
                      <div key={rec.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900 font-black">{rec.monthPeriod}</span>
                            <span className="text-gray-400 font-normal">({rec.date})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-black ${isTargetMet ? 'text-emerald-600' : 'text-gray-800'}`}>
                              {formatDurationSeconds(rec.durationSeconds)} ({rec.durationMinutes.toFixed(2)} dk)
                            </span>
                            {diffSec !== null && diffSec > 0 && (
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                                -{diffSec} sn ⚡
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress track */}
                        <div className="w-full bg-gray-100 rounded-xl h-5 p-0.5 relative overflow-hidden flex items-center">
                          {/* Ideal Zone line at 120 seconds (20% of 600s) */}
                          <div 
                            className="absolute top-0 bottom-0 left-[20%] w-0.5 bg-emerald-500 z-10 opacity-70 border-r border-dashed"
                            title="120 Saniye Hafızlık Başlama Eşiği"
                          />

                          <div 
                            className={`h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-black text-white ${
                              isTargetMet 
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-xs' 
                                : rec.durationSeconds <= 240
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                                : 'bg-gradient-to-r from-rose-500 to-orange-500'
                            }`}
                            style={{ width: `${percentOfMax}%` }}
                          >
                            {percentOfMax > 25 && `${formatDurationSeconds(rec.durationSeconds)}`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Hedef Eşik: ≤ 120 sn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>2 - 4 dk (Gelişiyor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>&gt; 4 dk (Başlangıç)</span>
                  </div>
                </div>
              </div>

              {/* Grafik 2: Hazırlık Endeks Puanı Gelişimi (0 - 100 Puan) */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                      <TrendingUp className="text-amber-600" size={18} />
                      <span>Aylık Hafızlık Hazırlık Endeks Puanı (0 - 100)</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Hız (40p) + Mahreç (30p) + Tecvid (30p) bileşenleri toplamı
                    </p>
                  </div>
                  <span className="text-[11px] font-black text-amber-700 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200">
                    Başarı İndeksi
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  {records.map((rec, index) => {
                    const prevRec = index > 0 ? records[index - 1] : null;
                    const diffScore = prevRec ? rec.indexScore - prevRec.indexScore : null;

                    return (
                      <div key={rec.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-gray-900 font-black">{rec.monthPeriod}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 font-normal text-[11px]">
                              (Hız: {rec.speedPoints}p | M: {rec.mahrecPoints}p | T: {rec.tecvidPoints}p)
                            </span>
                            <span className="font-black text-amber-800 text-sm">{rec.indexScore} p</span>
                            {diffScore !== null && diffScore > 0 && (
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                                +{diffScore} 🚀
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-full bg-gray-100 rounded-xl h-5 p-0.5 relative overflow-hidden flex items-center">
                          {/* Ready threshold at 85% */}
                          <div 
                            className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-emerald-600 z-10 opacity-70 border-r border-dashed"
                            title="85 Puan Hazır Barajı"
                          />

                          <div 
                            className={`h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-black text-white ${
                              rec.indexScore >= 85 
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                                : rec.indexScore >= 70
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                                : rec.indexScore >= 50
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                : 'bg-gradient-to-r from-rose-500 to-orange-500'
                            }`}
                            style={{ width: `${rec.indexScore}%` }}
                          >
                            {rec.indexScore > 15 && `${rec.indexScore} Puan`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>85 - 100: Hafızlığa Hazır</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>70 - 84: Yakında Hazır</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>50 - 69: Gelişmekte</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aylık Değerlendirme Geçmiş Kayıtları Tablosu */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Calendar className="text-amber-600" size={18} />
                  <span>Aylık Yüzünden Okuma Değerlendirme Çizelgesi</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Öğretmen tarafından girilmiş tüm geçmiş aylık kayıtlar ve pedagojik dönütler
                </p>
              </div>

              <button
                onClick={handleOpenNewModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                <Plus size={15} />
                <span>Ay Ekle</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-black uppercase text-gray-400 bg-gray-50/50">
                    <th className="py-3 px-3">Dönem / Tarih</th>
                    <th className="py-3 px-3">Sayfa</th>
                    <th className="py-3 px-3">1 Sayfa Okuma Süresi</th>
                    <th className="py-3 px-3">Mahreç</th>
                    <th className="py-3 px-3">Tecvid</th>
                    <th className="py-3 px-3">Endeks Puanı</th>
                    <th className="py-3 px-3">Hazırlık Durumu &amp; Tahmin</th>
                    <th className="py-3 px-3">Gözlem Notu</th>
                    <th className="py-3 px-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-400">
                        Kayıtlı periyot bulunmamaktadır.
                      </td>
                    </tr>
                  ) : (
                    records.map((rec, idx) => {
                      const b = getReadinessBadge(rec.readinessStatus);
                      return (
                        <tr key={rec.id} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-3.5 px-3">
                            <div className="font-black text-gray-900">{rec.monthPeriod}</div>
                            <div className="text-[10px] text-gray-400">{rec.date}</div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px]">
                              {rec.pageNumber ? `${rec.pageNumber}. Sayfa` : '1. Sayfa'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="font-black text-gray-900 flex items-center gap-1">
                              <span>{formatDurationSeconds(rec.durationSeconds)}</span>
                              <span className="text-[10px] text-gray-400">({rec.durationMinutes.toFixed(2)} dk)</span>
                            </div>
                            <div className="text-[10px] text-amber-700 font-semibold">
                              Hız Puanı: {rec.speedPoints} / 40
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1 text-amber-500 font-black">
                              {rec.mahrecScore}
                              <Star size={12} className="fill-amber-400 text-amber-500 inline" />
                              <span className="text-[10px] text-gray-400 font-normal">({rec.mahrecPoints}p)</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1 text-blue-600 font-black">
                              {rec.tecvidScore}
                              <Star size={12} className="fill-blue-400 text-blue-500 inline" />
                              <span className="text-[10px] text-gray-400 font-normal">({rec.tecvidPoints}p)</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="font-black text-amber-800 text-sm">
                              {rec.indexScore} / 100
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="space-y-1">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${b.border}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${b.dot}`} />
                                {b.label}
                              </span>
                              <div className="text-[10px] text-gray-500 font-medium">
                                {rec.estimatedTimeToReady}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 max-w-xs truncate text-gray-500 text-[11px]" title={rec.teacherNotes || ''}>
                            {rec.teacherNotes || '-'}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditModal(rec)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                                title="Düzenle"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteRecord(rec.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Sil"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* MODAL: AYLIK YÜZÜNDEN OKUMA & HAZIRLIK DEĞERLENDİRME FORMU          */}
      {/* =================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                  <BookOpen size={13} />
                  <span>Aylık Değerlendirme</span>
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  {editingRecordId ? 'Değerlendirmeyi Düzenle' : 'Yeni Aylık Yüzünden Okuma Değerlendirmesi'}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {profile.studentName} için süre, mahreç ve tecvid ölçümlerini girin
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form inputs */}
            <div className="space-y-5">
              {/* Row 1: Dönem, Tarih, Sayfa No */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">
                    Değerlendirme Ayı (Dönem)
                  </label>
                  <input
                    type="month"
                    value={monthPeriod}
                    onChange={(e) => setMonthPeriod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">
                    Ölçüm Tarihi
                  </label>
                  <input
                    type="date"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">
                    Okunan Sayfa No
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={604}
                    value={pageNumber}
                    onChange={(e) => setPageNumber(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* Row 2: 1 Sayfa Okuma Süresi Girişleri (Dk:Sn / Ondalıklı Dk / Kronometre) */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Clock size={15} className="text-amber-700" />
                      <span>1 Sayfayı Okuma Süresi (1 - 10 Dakika Arası)</span>
                    </label>
                    <span className="text-[11px] text-amber-800/80 font-medium">
                      Hafızlığa hazır öğrenci: 90-120 saniye • Yeni başlayan: ~8 dakika
                    </span>
                  </div>

                  {/* Built-in Stopwatch Trigger */}
                  <div className="flex items-center gap-1.5">
                    {isStopwatchRunning ? (
                      <button
                        type="button"
                        onClick={() => setIsStopwatchRunning(false)}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer animate-pulse"
                      >
                        <Pause size={12} /> Durdur ({formatDurationSeconds(stopwatchSeconds)})
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsStopwatchRunning(true)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer hover:bg-amber-700"
                      >
                        <Play size={12} /> {stopwatchSeconds > 0 ? 'Devam Et' : 'Kronometreyle Ölç'}
                      </button>
                    )}

                    {stopwatchSeconds > 0 && !isStopwatchRunning && (
                      <>
                        <button
                          type="button"
                          onClick={handleApplyStopwatch}
                          className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                          title="Ölçülen süreyi forma aktar"
                        >
                          <Check size={12} /> Süreyi Aktar ({formatDurationSeconds(stopwatchSeconds)})
                        </button>
                        <button
                          type="button"
                          onClick={handleResetStopwatch}
                          className="p-1 rounded-lg text-gray-500 hover:text-gray-800 bg-gray-200"
                          title="Sıfırla"
                        >
                          <RotateCcw size={12} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Dakika : Saniye Girişi */}
                  <div className="bg-white rounded-xl p-3 border border-amber-200">
                    <span className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">
                      Seçenek 1: Dakika : Saniye Olarak Gir
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] text-gray-400 font-bold block mb-0.5">Dakika (1-10)</label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={durationMin}
                          onChange={(e) => handleMinSecChange(parseInt(e.target.value) || 1, durationSec)}
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-black text-gray-800 outline-none focus:border-amber-500"
                        />
                      </div>
                      <span className="text-lg font-black text-gray-400 mt-4">:</span>
                      <div className="flex-1">
                        <label className="text-[10px] text-gray-400 font-bold block mb-0.5">Saniye (0-59)</label>
                        <input
                          type="number"
                          min={0}
                          max={59}
                          value={durationSec}
                          onChange={(e) => handleMinSecChange(durationMin, parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-black text-gray-800 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ondalıklı Dakika Girişi */}
                  <div className="bg-white rounded-xl p-3 border border-amber-200">
                    <span className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">
                      Seçenek 2: Ondalıklı Dakika Olarak Gir
                    </span>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-0.5">Örn: 1.50 dk, 1.75 dk, 8.00 dk</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.05"
                          min={0.5}
                          max={10}
                          value={decimalInput}
                          onChange={(e) => handleDecimalChange(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-black text-gray-800 outline-none focus:border-amber-500"
                        />
                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">dakika</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Özet ve Slider */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-600">Ayarlanan Süre:</span>
                    <span className="text-amber-900 font-black text-sm">
                      {formatDurationSeconds(totalFormSeconds)} ({totalFormSeconds} saniye)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={600}
                    step={5}
                    value={totalFormSeconds}
                    onChange={(e) => {
                      const total = parseInt(e.target.value);
                      const m = Math.floor(total / 60);
                      const s = total % 60;
                      handleMinSecChange(m, s);
                    }}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-400">
                    <span>1 dk (Hızlı)</span>
                    <span className="text-emerald-700 font-black">2 dk (Hazır Eşiği)</span>
                    <span>5 dk</span>
                    <span className="text-rose-700 font-black">8 dk (Başlangıç)</span>
                    <span>10 dk</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Mahreç & Tecvid Değerlendirmesi (1 - 5 Ölçekli) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mahreç Değerlendirmesi */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-800 uppercase tracking-wide">
                      Mahreç Durumu (1 - 5)
                    </label>
                    <span className="text-xs font-black text-amber-700">
                      {mahrecScore} / 5 ({Math.round((mahrecScore / 5) * 30)}p)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setMahrecScore(val)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                          mahrecScore === val
                            ? 'bg-amber-600 text-white shadow-xs scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star size={13} className={mahrecScore === val ? 'fill-white text-white' : 'text-gray-400'} />
                        <span>{val}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {mahrecScore === 1 && '1: Çok Zayıf - Harf çıkışları hatalı'}
                    {mahrecScore === 2 && '2: Geliştirilmeli - Boğaz/dil harfleri eksik'}
                    {mahrecScore === 3 && '3: Orta Düzey - Temel mahreçler iyi'}
                    {mahrecScore === 4 && '4: İyi - Harf sıfatları ve çıkışları başarılı'}
                    {mahrecScore === 5 && '5: Mükemmel (Fasih) - Kusursuz telaffuz'}
                  </p>
                </div>

                {/* Tecvid Değerlendirmesi */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-800 uppercase tracking-wide">
                      Tecvid Uygulaması (1 - 5)
                    </label>
                    <span className="text-xs font-black text-blue-700">
                      {tecvidScore} / 5 ({Math.round((tecvidScore / 5) * 30)}p)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTecvidScore(val)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                          tecvidScore === val
                            ? 'bg-blue-600 text-white shadow-xs scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star size={13} className={tecvidScore === val ? 'fill-white text-white' : 'text-gray-400'} />
                        <span>{val}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {tecvidScore === 1 && '1: Yetersiz - Kurallar tatbik edilmiyor'}
                    {tecvidScore === 2 && '2: Temel Eksikler - Med ve ihfa zayıf'}
                    {tecvidScore === 3 && '3: Orta - Kurallar biliniyor, pratikte hata var'}
                    {tecvidScore === 4 && '4: Başarılı - Seri okuyuşta tecvid korunuyor'}
                    {tecvidScore === 5 && '5: Kusursuz - Tam tecvid ve vakıf tatbiki'}
                  </p>
                </div>
              </div>

              {/* Live Computed Index Card */}
              <div className="bg-gradient-to-r from-gray-900 to-amber-950 text-white rounded-2xl p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="text-amber-400" size={18} />
                    <span className="text-xs font-black uppercase tracking-wide">
                      Hesaplanan Hazırlık Endeksi:
                    </span>
                  </div>
                  <span className="text-2xl font-black text-amber-300">
                    {livePreview.indexScore} / 100
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-white/10 text-gray-300 font-medium">
                  <div>
                    Hız: <strong className="text-white">{livePreview.speedPoints}p</strong> + Mahreç: <strong className="text-white">{livePreview.mahrecPoints}p</strong> + Tecvid: <strong className="text-white">{livePreview.tecvidPoints}p</strong>
                  </div>
                  <div className="text-amber-200 font-black">
                    {livePreview.estimatedTimeToReady}
                  </div>
                </div>
              </div>

              {/* Öğretmen Gözlem Notu */}
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">
                  Öğretmen Gözlem &amp; Rehberlik Notu (Opsiyonel)
                </label>
                <textarea
                  rows={2}
                  value={teacherNotes}
                  onChange={(e) => setTeacherNotes(e.target.value)}
                  placeholder="Örn: Ayn ve Ha harfleri üzerinde duruldu. Medd-i munfasıl süreleri iyi. Seri okuma egzersizi verildi..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSaveRecord}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer"
              >
                {editingRecordId ? 'Değerlendirmeyi Güncelle' : 'Değerlendirmeyi Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: VELİ BİLGİLENDİRME VE GELİŞİM RAPORU (A4 & PDF)               */}
      {/* =================================================================== */}
      {isVeliReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
          {/* Print CSS Rules */}
          <style>{`
            @media print {
              @page {
                size: A4 portrait;
                margin: 6mm;
              }
              body {
                background: #ffffff !important;
                color: #000000 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body * {
                visibility: hidden !important;
              }
              #veli-report-page-1, #veli-report-page-1 *,
              #veli-report-page-2, #veli-report-page-2 *,
              #veli-report-printable, #veli-report-printable * {
                visibility: visible !important;
              }
              #veli-report-page-1, #veli-report-page-2, #veli-report-printable {
                position: relative !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding: 6mm !important;
                box-shadow: none !important;
                border: none !important;
              }
              .veli-page-1 {
                page-break-after: always !important;
                break-after: page !important;
              }
              .veli-page-2 {
                page-break-before: always !important;
                break-before: page !important;
              }
            }
          `}</style>

          <div className="bg-slate-100 rounded-3xl max-w-4xl w-full max-h-[96vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden my-auto">
            {/* Modal Top Action Toolbar */}
            <div className="bg-white px-5 py-3.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 leading-tight">
                    Veli Bilgilendirme ve Gelişim Raporu
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {profile.studentName} ({profile.className}) • Hafızlığa Hazırlık ve Yüzünden Okuma Karnesi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Format Toggle: 2-Page (Complete) vs 1-Page (Compact) */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setReportPrintMode('2_page')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      reportPrintMode === '2_page'
                        ? 'bg-white text-gray-900 shadow-xs font-black'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="Eksiksiz 2 Sayfalı A4 Rapor (Tüm detaylar, tablolar ve imzalar)"
                  >
                    📄 2 Sayfa (Eksiksiz)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportPrintMode('1_page')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      reportPrintMode === '1_page'
                        ? 'bg-white text-gray-900 shadow-xs font-black'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="Tek Sayfaya Sığdırılmış Kompakt A4 Karne"
                  >
                    📑 Tek Sayfa
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingReportFields(!isEditingReportFields)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isEditingReportFields 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  title="Kurum, okul, danışman öğretmen ve veli bilgilerini düzenle"
                >
                  <Edit3 size={14} />
                  <span>{isEditingReportFields ? 'Bilgi Panelini Kapat' : 'Bilgileri Düzenle'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportVeliPdf}
                  disabled={isExportingPdf}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
                  title="A4 formatında yüksek çözünürlüklü eksiksiz PDF indir"
                >
                  <Download size={15} />
                  <span>{isExportingPdf ? 'PDF Hazırlanıyor...' : (reportPrintMode === '2_page' ? 'PDF İndir (2 Sayfa A4)' : 'PDF İndir (Tek Sayfa)')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintVeliReport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
                  title="Yazıcıdan yazdır"
                >
                  <Printer size={15} />
                  <span>Yazdır</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVeliReportModalOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Kapat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Editable Künye Fields Drawer */}
            {isEditingReportFields && (
              <div className="bg-amber-50/90 border-b border-amber-200 p-4 shrink-0 animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-2">
                    <Edit3 size={14} className="text-amber-700" />
                    <span>Rapor Bilgilerini Düzenle (Değişiklikler Aşağıdaki Rapora Anında Yansır)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (reportAdvisorName && reportAdvisorName !== profile.advisorTeacher) {
                        onUpdateProfile({ advisorTeacher: reportAdvisorName });
                      }
                      setIsEditingReportFields(false);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-amber-300"
                  >
                    Kaydet &amp; Kapat
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">Öğrenci / Okul No</label>
                    <input
                      type="text"
                      value={reportStudentNo}
                      onChange={(e) => setReportStudentNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">Rapor Tarihi</label>
                    <input
                      type="date"
                      value={reportDate}
                      onChange={(e) => setReportDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">Danışman Öğretici</label>
                    <input
                      type="text"
                      value={reportAdvisorName}
                      onChange={(e) => setReportAdvisorName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">Okul / Kurs Müdürü</label>
                    <input
                      type="text"
                      value={reportPrincipalName}
                      onChange={(e) => setReportPrincipalName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">Öğrenci Velisi</label>
                    <input
                      type="text"
                      value={reportParentName}
                      onChange={(e) => setReportParentName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Empty records notice */}
            {records.length === 0 && (
              <div className="bg-amber-100/90 border-b border-amber-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                <span className="text-amber-950 font-bold flex items-center gap-2">
                  <Info size={15} className="text-amber-700 shrink-0" />
                  Öğrenciye ait sisteme kaydedilmiş ölçüm bulunmuyor. Aşağıda taslak boş karne gösterilmektedir.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsVeliReportModalOpen(false);
                    handleOpenNewModal();
                  }}
                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] cursor-pointer shadow-xs"
                >
                  + İlk Değerlendirmeyi Gir
                </button>
              </div>
            )}

            {/* Scrollable Document Container */}
            <div className="overflow-y-auto p-3 sm:p-6 flex justify-center bg-slate-200/60">
              {reportPrintMode === '2_page' ? (
                /* ========================================================== */
                /* 2-PAGE DEDICATED COMPLETE REPORT (SAYFA 1 & SAYFA 2)       */
                /* ========================================================== */
                <div className="space-y-8 w-full max-w-[820px] flex flex-col items-center">
                  {/* SAYFA 1 BANNER */}
                  <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600 px-1 print:hidden">
                    <span className="flex items-center gap-1.5 text-amber-900 bg-amber-100/90 px-3 py-1 rounded-lg border border-amber-200">
                      <FileText size={14} className="text-amber-700" />
                      <strong>SAYFA 1 / 2:</strong> Künye, Genel Endeks &amp; Performans Kriterleri
                    </span>
                    <span className="text-[11px] text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-md border border-slate-200">A4 Standart Boyut</span>
                  </div>

                  {/* PRINTABLE SAYFA 1 */}
                  <div
                    id="veli-report-page-1"
                    ref={veliPage1Ref}
                    style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '820px' }}
                    className="bg-white text-slate-900 p-6 sm:p-8 shadow-xl rounded-xl border border-slate-300 font-sans space-y-4 veli-page-1"
                  >
                    {/* 1. BAŞLIK ALANI */}
                    <div className="border-b-2 border-amber-700/80 pb-3 space-y-2 text-center">
                      <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                        <span className="text-amber-800">MaarifMerkezi.Com</span> • RAHLE SİSTEMİ
                      </h1>

                      <div className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wide bg-amber-50/80 py-1 rounded-lg border border-amber-200/80 inline-block px-5">
                        YÜZÜNDEN OKUMA &amp; HAFIZLIĞA HAZIRLIK VELİ GELİŞİM RAPORU (SAYFA 1 / 2)
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold px-2 pt-1 border-t border-slate-100">
                        <span>Belge No: RAHLE-PRP-{profile.className || 'HZ'}-{(profile.studentName || 'OGR').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase()}</span>
                        <span>Rapor Düzenleme Tarihi: {reportDate}</span>
                      </div>
                    </div>

                    {/* 2. EKSİKSİZ ÖĞRENCİ VE DEĞERLENDİRME KÜNYESİ (6 KUTU) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase">Öğrenci Adı Soyadı</span>
                        <strong className="text-xs font-black text-slate-900 truncate block">{profile.studentName}</strong>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase">Öğrenci / Okul No</span>
                        <strong className="text-xs font-black text-slate-800">{reportStudentNo}</strong>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase">Sınıfı / Şubesi</span>
                        <strong className="text-xs font-black text-slate-800">{profile.className}</strong>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase">Değerlendirme Ayı</span>
                        <strong className="text-xs font-black text-amber-900">
                          {latestRecord ? latestRecord.monthPeriod : 'Dönem Sonu'}
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase">Ölçülen Kur'an Sayfası</span>
                        <strong className="text-xs font-black text-emerald-800">
                          {latestRecord?.pageNumber ? `Sayfa ${latestRecord.pageNumber}` : '1 Standart Sayfa'}
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-500 uppercase">Danışman Öğretici</span>
                        <strong className="text-xs font-black text-slate-800 truncate block">
                          {reportAdvisorName}
                        </strong>
                      </div>
                    </div>

                    {/* 3. ÖZET GENEL DURUM & ENDEKS ROZETİ */}
                    {latestRecord ? (
                      <div className="bg-white text-gray-900 rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="space-y-1 text-center sm:text-left">
                          <div className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                            GENEL DEĞERLENDİRME VE HAZIRLIK ENDEKSİ
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                            <span>Hafızlık Hazırlık Endeksi:</span>
                            <span className="text-amber-700 underline decoration-amber-400">
                              {latestRecord.indexScore} / 100
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium flex flex-wrap items-center gap-2">
                            <span>Hız Puanı: <strong className="text-gray-800">{latestRecord.speedPoints}/40</strong></span>
                            <span>+ Mahreç: <strong className="text-gray-800">{latestRecord.mahrecPoints}/30</strong></span>
                            <span>+ Tecvid: <strong className="text-gray-800">{latestRecord.tecvidPoints}/30</strong></span>
                          </div>
                        </div>

                        <div className="text-center sm:text-right shrink-0 bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200">
                          <div className="text-[10px] font-bold text-amber-900 uppercase">Hazırlık Durumu:</div>
                          <div className="text-sm sm:text-base font-black text-amber-950 uppercase">
                            {getReadinessBadge(latestRecord.readinessStatus).label}
                          </div>
                          <div className="text-[11px] font-bold text-amber-800 mt-0.5">
                            {latestRecord.estimatedTimeToReady}
                          </div>
                          {durationDiff !== null && (
                            <div className="text-[10px] font-extrabold text-emerald-300 mt-1 border-t border-white/15 pt-1">
                              {durationDiff > 0 ? `⚡ Önceki aya göre +${durationDiff} sn Hızlandı` : `Önceki aya göre ${Math.abs(durationDiff)} sn fark`}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center text-xs font-bold text-amber-900">
                        Öğrenciye ait henüz bir ölçüm kaydı bulunmamaktadır. Aşağıda taslak gösterilmektedir.
                      </div>
                    )}

                    {/* 4. TEMEL DEĞERLENDİRME KRİTERLERİ (3 ANA SÜTUN) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                          1 Sayfa Kur'an-ı Kerim Okuma Performans Kriterleri
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500">
                          Ölçülen Sayfa: {latestRecord?.pageNumber ? `Sayfa ${latestRecord.pageNumber}` : '1 Sayfa'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {/* Sütun 1: Hız ve Süre */}
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                          <div className="flex items-center justify-between text-xs font-black">
                            <span className="text-slate-700">1 Sayfa Okuma Süresi</span>
                            <span className="text-amber-800">{latestRecord ? `${latestRecord.speedPoints}/40 P` : '0/40 P'}</span>
                          </div>
                          <div className="text-base sm:text-lg font-black text-slate-900">
                            {latestRecord ? formatDurationSeconds(latestRecord.durationSeconds) : '- dk : - sn'}
                            {latestRecord && (
                              <span className="text-xs font-semibold text-slate-500 ml-1.5">
                                ({latestRecord.durationMinutes.toFixed(2)} dk)
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-600 font-medium leading-tight">
                            <strong>Kılavuz Normu:</strong> Hafızlığa başlama eşiği: <strong>90 - 120 sn</strong> (1.5-2 dk). Başlangıç ortalaması: ~8 dk.
                          </div>
                          {durationDiff !== null && (
                            <div className="text-[10px] font-black text-emerald-700 pt-0.5">
                              {durationDiff > 0 ? `▲ Önceki aya göre ${durationDiff} sn hızlanma` : `▼ Önceki aya göre ${Math.abs(durationDiff)} sn fark`}
                            </div>
                          )}
                        </div>

                        {/* Sütun 2: Mahreç */}
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                          <div className="flex items-center justify-between text-xs font-black">
                            <span className="text-slate-700">Mahreç &amp; Harf Telaffuzu</span>
                            <span className="text-amber-800">{latestRecord ? `${latestRecord.mahrecPoints}/30 P` : '0/30 P'}</span>
                          </div>
                          <div className="text-base sm:text-lg font-black text-amber-700">
                            {latestRecord ? `${latestRecord.mahrecScore} / 5 Yıldız` : '- / 5'}
                          </div>
                          <div className="text-[10px] text-slate-600 font-medium leading-tight">
                            Boğaz, dil ve dudak harflerinin fasih ve doğru çıkışı (sıfat-ı lâzime ve ârızalar) değerlendirilmiştir.
                          </div>
                          <div className="text-[10px] font-bold text-amber-900 pt-0.5">
                            {latestRecord?.mahrecScore === 5 && 'Mükemmel (Fasih sesletim)'}
                            {latestRecord?.mahrecScore === 4 && 'İyi (Harf sıfatları başarılı)'}
                            {latestRecord?.mahrecScore === 3 && 'Orta Düzey (Temel mahreçler iyi)'}
                            {latestRecord?.mahrecScore === 2 && 'Geliştirilmeli'}
                            {latestRecord?.mahrecScore === 1 && 'Zayıf (Temel harf hataları)'}
                          </div>
                        </div>

                        {/* Sütun 3: Tecvid */}
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                          <div className="flex items-center justify-between text-xs font-black">
                            <span className="text-slate-700">Tecvid &amp; Vakıf Tatbikatı</span>
                            <span className="text-blue-800">{latestRecord ? `${latestRecord.tecvidPoints}/30 P` : '0/30 P'}</span>
                          </div>
                          <div className="text-base sm:text-lg font-black text-blue-700">
                            {latestRecord ? `${latestRecord.tecvidScore} / 5 Yıldız` : '- / 5'}
                          </div>
                          <div className="text-[10px] text-slate-600 font-medium leading-tight">
                            Seri okuyuşta medd, ihfa, izhar, tenvin, kalkale ve durak/vakıf-ibtida kaidelerinin korunması.
                          </div>
                          <div className="text-[10px] font-bold text-blue-900 pt-0.5">
                            {latestRecord?.tecvidScore === 5 && 'Kusursuz Tatbikat'}
                            {latestRecord?.tecvidScore === 4 && 'Başarılı (Seri okuyuşta korunuyor)'}
                            {latestRecord?.tecvidScore === 3 && 'Orta Düzey'}
                            {latestRecord?.tecvidScore === 2 && 'Temel Eksikler Var'}
                            {latestRecord?.tecvidScore === 1 && 'Yetersiz'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 5. HAFIZLIK HAZIRLIK ENDEKS KILAVUZU & RUBRİK CETVELİ */}
                    <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200 text-[10px]">
                      <div className="font-black text-amber-950 uppercase mb-1 flex items-center justify-between">
                        <span>Hafızlık Hazırlık Endeks Dereceleri &amp; Kılavuz Normu</span>
                        <span className="text-[9px] text-slate-500 font-normal">Toplam 100 Puan Üzerinden</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center font-bold">
                        <div className="p-1 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-950">
                          <div className="font-black">85 - 100 Puan</div>
                          <div className="text-[9px]">Hafızlığa Başlamaya Hazır</div>
                        </div>
                        <div className="p-1 rounded-lg bg-blue-100/70 border border-blue-300 text-blue-950">
                          <div className="font-black">70 - 84 Puan</div>
                          <div className="text-[9px]">1 - 2 Ay İçinde Hazır Olur</div>
                        </div>
                        <div className="p-1 rounded-lg bg-amber-100/70 border border-amber-300 text-amber-950">
                          <div className="font-black">50 - 69 Puan</div>
                          <div className="text-[9px]">Gelişme Aşamasında (3-5 Ay)</div>
                        </div>
                        <div className="p-1 rounded-lg bg-rose-100/70 border border-rose-300 text-rose-950">
                          <div className="font-black">0 - 49 Puan</div>
                          <div className="text-[9px]">Temel Hazırlık Sürüyor</div>
                        </div>
                      </div>
                    </div>

                    {/* Sayfa 1 Alt Dipnotu */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                      <span>MaarifMerkezi.Com • Rahle Hafızlık ve Kur&apos;an Takip Sistemi</span>
                      <span className="font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                        Sayfa 1 / 2 • Devamı Sayfa 2&apos;de &rarr;
                      </span>
                    </div>
                  </div>

                  {/* SAYFA 2 BANNER */}
                  <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600 px-1 pt-2 print:hidden">
                    <span className="flex items-center gap-1.5 text-amber-900 bg-amber-100/90 px-3 py-1 rounded-lg border border-amber-200">
                      <FileText size={14} className="text-amber-700" />
                      <strong>SAYFA 2 / 2:</strong> Aylık Süreç Çizelgesi, Öğretici Değerlendirmesi &amp; Resmî İmzalar
                    </span>
                    <span className="text-[11px] text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-md border border-slate-200">A4 Standart Boyut</span>
                  </div>

                  {/* PRINTABLE SAYFA 2 */}
                  <div
                    id="veli-report-page-2"
                    ref={veliPage2Ref}
                    style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '820px' }}
                    className="bg-white text-slate-900 p-6 sm:p-8 shadow-xl rounded-xl border border-slate-300 font-sans space-y-4 veli-page-2"
                  >
                    {/* SAYFA 2 ÜST BİLGİ BAŞLIĞI */}
                    <div className="border-b-2 border-amber-700/80 pb-2.5 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
                          MaarifMerkezi.Com • RAHLE SİSTEMİ
                        </div>
                        <div className="text-sm font-black uppercase text-slate-900">
                          YÜZÜNDEN OKUMA &amp; HAFIZLIĞA HAZIRLIK VELİ GELİŞİM RAPORU (SAYFA 2 / 2)
                        </div>
                      </div>
                      <div className="text-right text-[11px]">
                        <div className="font-black text-amber-900">{profile.studentName} ({profile.className})</div>
                        <div className="text-slate-500 font-semibold text-[10px]">
                          Öğrenci No: {reportStudentNo} • Belge No: RAHLE-PRP-{profile.className || 'HZ'}-{(profile.studentName || 'OGR').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* 6. AYLIK İLERLEME ÇİZELGESİ (GEÇMİŞ PERİYOTLAR) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                          Aylık Süreç ve Gelişim Karşılaştırması
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500">
                          Toplam {records.length} Aylık Ölçüm Kayıtlı
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 text-[9px] font-black uppercase text-slate-600 border-b border-slate-200">
                              <th className="py-2 px-2.5">Dönem</th>
                              <th className="py-2 px-2.5">Ölçüm Tarihi</th>
                              <th className="py-2 px-2.5">Ölçülen Sayfa</th>
                              <th className="py-2 px-2.5">1 Sayfa Süresi</th>
                              <th className="py-2 px-2.5">Aylık Hız Farkı</th>
                              <th className="py-2 px-2.5">Mahreç</th>
                              <th className="py-2 px-2.5">Tecvid</th>
                              <th className="py-2 px-2.5">Endeks Puanı</th>
                              <th className="py-2 px-2.5">Hazırlık Durumu</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-800 font-semibold text-[11px]">
                            {records.length > 0 ? (
                              records.map((rec, idx) => {
                                const prev = idx > 0 ? records[idx - 1] : null;
                                const diffSec = prev ? prev.durationSeconds - rec.durationSeconds : null;
                                const diffIdx = prev ? rec.indexScore - prev.indexScore : null;

                                return (
                                  <tr key={rec.id} className="hover:bg-slate-50/50">
                                    <td className="py-2 px-2.5 font-black text-slate-900">{rec.monthPeriod}</td>
                                    <td className="py-2 px-2.5 text-slate-500">{rec.date}</td>
                                    <td className="py-2 px-2.5 text-emerald-800 font-bold">
                                      {rec.pageNumber ? `Sayfa ${rec.pageNumber}` : '1 Sayfa'}
                                    </td>
                                    <td className="py-2 px-2.5 font-bold text-amber-900">
                                      {formatDurationSeconds(rec.durationSeconds)} ({rec.durationMinutes.toFixed(2)} dk)
                                    </td>
                                    <td className="py-2 px-2.5">
                                      {diffSec !== null ? (
                                        <span className={diffSec > 0 ? 'text-emerald-700 font-black' : 'text-slate-500 font-bold'}>
                                          {diffSec > 0 ? `-${diffSec} sn hızlandı` : `${Math.abs(diffSec)} sn`}
                                        </span>
                                      ) : (
                                        <span className="text-slate-400 font-medium">Başlangıç</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-2.5 text-amber-700">{rec.mahrecScore} / 5 ({rec.mahrecPoints}p)</td>
                                    <td className="py-2 px-2.5 text-blue-700">{rec.tecvidScore} / 5 ({rec.tecvidPoints}p)</td>
                                    <td className="py-2 px-2.5 font-black text-slate-900">
                                      {rec.indexScore} p
                                      {diffIdx !== null && (
                                        <span className={`text-[10px] ml-1 ${diffIdx >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                                          ({diffIdx >= 0 ? `+${diffIdx}` : diffIdx})
                                        </span>
                                      )}
                                    </td>
                                    <td className="py-2 px-2.5 text-[10px] font-bold">
                                      {getReadinessBadge(rec.readinessStatus).label}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={9} className="py-4 px-3 text-center text-slate-400 italic">
                                  Henüz aylık periyot ölçümü girilmemiştir. Ölçümler yapıldıkça aylık gelişim çizelgesi burada listelenecektir.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 7. ÖĞRETMEN DEĞERLENDİRMESİ & DÖNÜT */}
                    <div className="space-y-1.5 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                      <div className="text-[10px] font-black uppercase tracking-wider text-amber-950">
                        Öğretici Pedagojik Değerlendirmesi &amp; Dönüt:
                      </div>
                      <p className="text-[11px] text-slate-800 font-medium leading-relaxed italic">
                        &ldquo;{latestRecord?.feedback || 'Öğrencinin yüzünden okuma akıcılığı, harf mahreçleri ve tecvid tatbikatı düzenli periyodik ölçümlerle takip edilmekte olup gayreti takdir edilmektedir.'}&rdquo;
                      </p>
                      {latestRecord?.teacherNotes && (
                        <p className="text-[10px] text-amber-900 font-bold pt-1 border-t border-amber-200/60">
                          <strong>Öğretmen Gözlemi:</strong> {latestRecord.teacherNotes}
                        </p>
                      )}
                    </div>

                    {/* 8. VELİYE REHBERLİK & EVDE ÇALIŞMA TAVSİYELERİ */}
                    <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                        Sayın Veliye Rehberlik &amp; Evde Takip Önerileri:
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 text-[10.5px] font-medium leading-normal">
                        <li>Öğrencinin her gün evde en az <strong>15-20 dakika</strong> sesli ve tempolu Kur&apos;an-ı Kerim okumasını düzenli dinleyiniz.</li>
                        <li>Süre hızlandıkça harf mahreçlerinin bozulmamasına ve tecvid kurallarının atlanmamasına özen gösteriniz.</li>
                        <li>Hafızlık uzun soluklu bir yolculuktur. Öğrencinin gayretini takdir ederek manevi motivasyonunu ve çalışma şevkini destekleyiniz.</li>
                      </ul>
                    </div>

                    {/* 9. RESMÎ İMZA & ONAY ALANI */}
                    <div className="pt-5 border-t-2 border-slate-300 grid grid-cols-3 gap-3 text-center text-xs">
                      <div className="space-y-7">
                        <div>
                          <div className="font-bold text-slate-900">{reportAdvisorName}</div>
                          <div className="text-[9px] text-slate-500 font-medium">Danışman Öğretici (Hafızlık Eğitmeni)</div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold border-t border-dashed border-slate-300 pt-1.5 mx-3">
                          İmza
                        </div>
                      </div>

                      <div className="space-y-7">
                        <div>
                          <div className="font-bold text-slate-900">{reportPrincipalName}</div>
                          <div className="text-[9px] text-slate-500 font-medium">Kurs / Okul Müdürü</div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold border-t border-dashed border-slate-300 pt-1.5 mx-3">
                          Mühür / İmza
                        </div>
                      </div>

                      <div className="space-y-7">
                        <div>
                          <div className="font-bold text-slate-900">{reportParentName}</div>
                          <div className="text-[9px] text-slate-500 font-medium">Öğrenci Velisi (Teslim Aldım)</div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold border-t border-dashed border-slate-300 pt-1.5 mx-3">
                          İmza / Tarih: {reportDate}
                        </div>
                      </div>
                    </div>

                    {/* Sayfa 2 Alt Not */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
                      <span>Bu belge MaarifMerkezi.Com Rahle Hafızlık ve Kur&apos;an Takip Sistemi tarafından üretilmiştir.</span>
                      <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Sayfa 2 / 2</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ========================================================== */
                /* TEK SAYFA KOMPAKT FORMAT (1-PAGE MODE)                     */
                /* ========================================================== */
                <div
                  id="veli-report-printable"
                  ref={veliReportRef}
                  style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '820px' }}
                  className="bg-white text-slate-900 p-5 sm:p-6 shadow-xl rounded-xl border border-slate-300 font-sans space-y-3"
                >
                  {/* 1. BAŞLIK ALANI */}
                  <div className="border-b-2 border-amber-700/80 pb-2 space-y-1.5 text-center">
                    <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase">
                      <span className="text-amber-800">MaarifMerkezi.Com</span> • RAHLE SİSTEMİ
                    </h1>

                    <div className="text-xs font-black text-amber-900 uppercase tracking-wide bg-amber-50/80 py-0.5 rounded-lg border border-amber-200/80 inline-block px-4">
                      YÜZÜNDEN OKUMA &amp; HAFIZLIĞA HAZIRLIK VELİ GELİŞİM RAPORU (TEK SAYFA A4)
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-semibold px-2 pt-0.5 border-t border-slate-100">
                      <span>Belge No: RAHLE-PRP-{profile.className || 'HZ'}-{(profile.studentName || 'OGR').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase()}</span>
                      <span>Rapor Düzenleme Tarihi: {reportDate}</span>
                    </div>
                  </div>

                  {/* 2. EKSİKSİZ ÖĞRENCİ VE DEĞERLENDİRME KÜNYESİ (6 KUTU) */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px]">
                    <div>
                      <span className="block text-[8px] font-bold text-slate-500 uppercase">Öğrenci Adı Soyadı</span>
                      <strong className="text-xs font-black text-slate-900 truncate block">{profile.studentName}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-500 uppercase">Öğrenci / Okul No</span>
                      <strong className="text-xs font-black text-slate-800">{reportStudentNo}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-500 uppercase">Sınıfı / Şubesi</span>
                      <strong className="text-xs font-black text-slate-800">{profile.className}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-500 uppercase">Değerlendirme Ayı</span>
                      <strong className="text-xs font-black text-amber-900">
                        {latestRecord ? latestRecord.monthPeriod : 'Dönem Sonu'}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-500 uppercase">Ölçülen Sayfa</span>
                      <strong className="text-xs font-black text-emerald-800">
                        {latestRecord?.pageNumber ? `Sayfa ${latestRecord.pageNumber}` : '1 Sayfa'}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-slate-500 uppercase">Danışman Öğretici</span>
                      <strong className="text-xs font-black text-slate-800 truncate block">
                        {reportAdvisorName}
                      </strong>
                    </div>
                  </div>

                  {/* 3. ÖZET GENEL DURUM & ENDEKS ROZETİ */}
                  {latestRecord ? (
                    <div className="bg-white text-gray-900 rounded-xl p-3 border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                      <div className="space-y-0.5 text-center sm:text-left">
                        <div className="text-[9px] font-black uppercase tracking-wider text-amber-800">
                          GENEL DEĞERLENDİRME VE HAZIRLIK ENDEKSİ
                        </div>
                        <div className="text-lg font-black text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                          <span>Endeks Puanı:</span>
                          <span className="text-amber-700 underline decoration-amber-400">
                            {latestRecord.indexScore} / 100
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium flex flex-wrap items-center gap-2">
                          <span>Hız: <strong className="text-gray-800">{latestRecord.speedPoints}/40</strong></span>
                          <span>+ Mahreç: <strong className="text-gray-800">{latestRecord.mahrecPoints}/30</strong></span>
                          <span>+ Tecvid: <strong className="text-gray-800">{latestRecord.tecvidPoints}/30</strong></span>
                        </div>
                      </div>

                      <div className="text-center sm:text-right shrink-0 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                        <div className="text-[9px] font-bold text-amber-900 uppercase">Hazırlık Durumu:</div>
                        <div className="text-xs sm:text-sm font-black text-amber-950 uppercase">
                          {getReadinessBadge(latestRecord.readinessStatus).label}
                        </div>
                        <div className="text-[10px] font-bold text-amber-800">
                          {latestRecord.estimatedTimeToReady}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-center text-xs font-bold text-amber-900">
                      Öğrenciye ait henüz bir ölçüm kaydı bulunmamaktadır.
                    </div>
                  )}

                  {/* 4. TEMEL DEĞERLENDİRME KRİTERLERİ (3 SÜTUN) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
                      <div className="flex items-center justify-between font-black text-[11px]">
                        <span className="text-slate-700">1 Sayfa Süresi</span>
                        <span className="text-amber-800">{latestRecord ? `${latestRecord.speedPoints}/40 P` : '0/40 P'}</span>
                      </div>
                      <div className="text-base font-black text-slate-900">
                        {latestRecord ? formatDurationSeconds(latestRecord.durationSeconds) : '- dk : - sn'}
                      </div>
                      <div className="text-[9px] text-slate-600 font-medium leading-tight">
                        Eşik: 90-120 sn. Başlangıç: ~8 dk.
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
                      <div className="flex items-center justify-between font-black text-[11px]">
                        <span className="text-slate-700">Mahreç &amp; Harf</span>
                        <span className="text-amber-800">{latestRecord ? `${latestRecord.mahrecPoints}/30 P` : '0/30 P'}</span>
                      </div>
                      <div className="text-base font-black text-amber-700">
                        {latestRecord ? `${latestRecord.mahrecScore} / 5 Yıldız` : '- / 5'}
                      </div>
                      <div className="text-[9px] text-slate-600 font-medium leading-tight">
                        Boğaz, dil ve dudak harflerinin fasih çıkışı.
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-0.5">
                      <div className="flex items-center justify-between font-black text-[11px]">
                        <span className="text-slate-700">Tecvid &amp; Vakıf</span>
                        <span className="text-blue-800">{latestRecord ? `${latestRecord.tecvidPoints}/30 P` : '0/30 P'}</span>
                      </div>
                      <div className="text-base font-black text-blue-700">
                        {latestRecord ? `${latestRecord.tecvidScore} / 5 Yıldız` : '- / 5'}
                      </div>
                      <div className="text-[9px] text-slate-600 font-medium leading-tight">
                        Medd, ihfa, izhar ve durak kaideleri.
                      </div>
                    </div>
                  </div>

                  {/* 5. RUBRİK CETVELİ */}
                  <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-200 text-[9px] grid grid-cols-4 gap-1 text-center font-bold">
                    <div className="p-1 rounded bg-emerald-100/70 border border-emerald-300 text-emerald-950">
                      <div className="font-black">85 - 100 P</div>
                      <div className="text-[8px]">Hazır</div>
                    </div>
                    <div className="p-1 rounded bg-blue-100/70 border border-blue-300 text-blue-950">
                      <div className="font-black">70 - 84 P</div>
                      <div className="text-[8px]">1-2 Ay</div>
                    </div>
                    <div className="p-1 rounded bg-amber-100/70 border border-amber-300 text-amber-950">
                      <div className="font-black">50 - 69 P</div>
                      <div className="text-[8px]">Gelişme (3-5 Ay)</div>
                    </div>
                    <div className="p-1 rounded bg-rose-100/70 border border-rose-300 text-rose-950">
                      <div className="font-black">0 - 49 P</div>
                      <div className="text-[8px]">Temel Sürüyor</div>
                    </div>
                  </div>

                  {/* 6. AYLIK İLERLEME ÇİZELGESİ */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase text-slate-700">
                      Aylık Süreç ve Gelişim Karşılaştırması
                    </div>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <table className="w-full text-left text-[10px] border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-[8.5px] font-black uppercase text-slate-600 border-b border-slate-200">
                            <th className="py-1 px-2">Dönem</th>
                            <th className="py-1 px-2">Tarih</th>
                            <th className="py-1 px-2">Ölçülen Sayfa</th>
                            <th className="py-1 px-2">1 Sayfa Süresi</th>
                            <th className="py-1 px-2">Aylık Hız Farkı</th>
                            <th className="py-1 px-2">Mahreç</th>
                            <th className="py-1 px-2">Tecvid</th>
                            <th className="py-1 px-2">Endeks Puanı</th>
                            <th className="py-1 px-2">Durum</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800 font-semibold">
                          {records.length > 0 ? (
                            records.map((rec, idx) => {
                              const prev = idx > 0 ? records[idx - 1] : null;
                              const diffSec = prev ? prev.durationSeconds - rec.durationSeconds : null;
                              return (
                                <tr key={rec.id}>
                                  <td className="py-1 px-2 font-black">{rec.monthPeriod}</td>
                                  <td className="py-1 px-2 text-slate-500">{rec.date}</td>
                                  <td className="py-1 px-2 text-emerald-800">{rec.pageNumber ? `Sayfa ${rec.pageNumber}` : '1 Sayfa'}</td>
                                  <td className="py-1 px-2 font-bold text-amber-900">{formatDurationSeconds(rec.durationSeconds)}</td>
                                  <td className="py-1 px-2">{diffSec !== null ? (diffSec > 0 ? `-${diffSec} sn` : `${Math.abs(diffSec)} sn`) : '-'}</td>
                                  <td className="py-1 px-2 text-amber-700">{rec.mahrecScore}/5</td>
                                  <td className="py-1 px-2 text-blue-700">{rec.tecvidScore}/5</td>
                                  <td className="py-1 px-2 font-black">{rec.indexScore} p</td>
                                  <td className="py-1 px-2 text-[9px] font-bold">{getReadinessBadge(rec.readinessStatus).label}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={9} className="py-2 px-2 text-center text-slate-400 italic">
                                Ölçüm kaydı girilmemiştir.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 7. ÖĞRETMEN DEĞERLENDİRMESİ */}
                  <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80 text-[10px]">
                    <span className="font-black text-amber-950 uppercase block mb-0.5">Öğretici Pedagojik Dönütü:</span>
                    <p className="text-slate-800 italic leading-snug">
                      &ldquo;{latestRecord?.feedback || 'Öğrencinin yüzünden okuma akıcılığı, harf mahreçleri ve tecvid tatbikatı düzenli periyodik ölçümlerle takip edilmektedir.'}&rdquo;
                    </p>
                  </div>

                  {/* 8. VELİ REHBERLİĞİ */}
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-[9.5px] text-slate-600 leading-tight">
                    <strong>Veliye Rehberlik:</strong> Günlük en az 15-20 dakika tempolu sesli okuma dinleyiniz, mahreç ve tecvid disiplinini destekleyiniz.
                  </div>

                  {/* 9. İMZA ALANI */}
                  <div className="pt-3 border-t border-slate-300 grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div>
                      <div className="font-bold text-slate-900">{reportAdvisorName}</div>
                      <div className="text-[8px] text-slate-500">Danışman Öğretici</div>
                      <div className="text-[9px] text-slate-400 border-t border-dashed border-slate-300 pt-1 mt-4">İmza</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{reportPrincipalName}</div>
                      <div className="text-[8px] text-slate-500">Okul Müdürü</div>
                      <div className="text-[9px] text-slate-400 border-t border-dashed border-slate-300 pt-1 mt-4">Mühür / İmza</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{reportParentName}</div>
                      <div className="text-[8px] text-slate-500">Öğrenci Velisi</div>
                      <div className="text-[9px] text-slate-400 border-t border-dashed border-slate-300 pt-1 mt-4">İmza / {reportDate}</div>
                    </div>
                  </div>

                  {/* Alt Not */}
                  <div className="text-center text-[8.5px] text-slate-400 pt-1 border-t border-slate-100">
                    Bu belge MaarifMerkezi.Com Rahle Hafızlık ve Kur&apos;an Takip Sistemi tarafından üretilmiştir.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
