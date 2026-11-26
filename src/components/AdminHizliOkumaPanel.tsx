import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Target,
  ChevronDown,
  Search,
  Eye,
  FileText,
  Download,
  Plus,
  X,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  BookOpen,
  Sparkles,
  Filter
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import {
  getSchoolHizliOkumaRecords,
  syncHizliOkumaFromFirestore,
  recordSpeedReadingSession,
  updateStudentTeacherFeedback,
  StudentHizliOkumaRecord,
  normalizeStudentIdentity
} from '../data/hizliOkumaService';
import { testTexts } from './hizliokuma/speedReadingTexts';

export const AdminHizliOkumaPanel = ({ state, actions }: any) => {
  const {
    classes,
    selectedClass: globalSelectedClass,
    selectedStudent: globalSelectedStudent,
    activeSchoolId,
    viewingAcademicYear,
    activeAcademicYear,
    academicArchives
  } = state || {};

  const displayClasses: Record<string, string[]> = useMemo(() => {
    if (
      viewingAcademicYear &&
      viewingAcademicYear !== activeAcademicYear &&
      academicArchives?.[viewingAcademicYear]?.classes
    ) {
      return academicArchives[viewingAcademicYear].classes;
    }
    return classes || {};
  }, [classes, viewingAcademicYear, activeAcademicYear, academicArchives]);

  const classKeys = useMemo(() => Object.keys(displayClasses).sort(), [displayClasses]);

  const [selectedClass, setSelectedClass] = useState<string>(() => {
    if (globalSelectedClass && displayClasses[globalSelectedClass]) {
      return globalSelectedClass;
    }
    return 'Tümü';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'excellent' | 'improving' | 'risk'>('all');
  const [sortBy, setSortBy] = useState<'growth' | 'wpm' | 'comp' | 'name'>('growth');

  const [records, setRecords] = useState<StudentHizliOkumaRecord[]>(() =>
    getSchoolHizliOkumaRecords(activeSchoolId, displayClasses)
  );

  // Detail Modal State
  const [inspectingStudent, setInspectingStudent] = useState<StudentHizliOkumaRecord | null>(null);
  const [teacherNoteInput, setTeacherNoteInput] = useState('');
  const [targetWpmInput, setTargetWpmInput] = useState<number>(250);
  const [noteSavedToast, setNoteSavedToast] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Manual Entry Modal State
  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [manualClass, setManualClass] = useState<string>('');
  const [manualStudent, setManualStudent] = useState<string>('');
  const [manualTextTitle, setManualTextTitle] = useState<string>(
    testTexts?.[0]?.title || 'Okuma Hızı Değerlendirme Metni'
  );
  const [manualWpm, setManualWpm] = useState<number>(195);
  const [manualComp, setManualComp] = useState<number>(80);
  const [manualDuration, setManualDuration] = useState<number>(45);

  // Sync with global header class selection
  useEffect(() => {
    if (globalSelectedClass && displayClasses[globalSelectedClass]) {
      setSelectedClass(globalSelectedClass);
    }
  }, [globalSelectedClass, displayClasses]);

  // Load & sync records when school or classes change
  useEffect(() => {
    const refresh = () => {
      const fresh = getSchoolHizliOkumaRecords(activeSchoolId, displayClasses);
      setRecords(fresh);
      if (inspectingStudent) {
        const updatedInspect = fresh.find((r) => r.studentKey === inspectingStudent.studentKey);
        if (updatedInspect) setInspectingStudent(updatedInspect);
      }
    };
    refresh();
    syncHizliOkumaFromFirestore(activeSchoolId, displayClasses).then((synced) => {
      setRecords(synced);
    });
    window.addEventListener('hizli_okuma_updated', refresh);
    return () => window.removeEventListener('hizli_okuma_updated', refresh);
  }, [activeSchoolId, displayClasses]);

  // Find record for globalSelectedStudent if selected in top header
  const activeHeaderStudentRecord = useMemo(() => {
    if (!globalSelectedStudent) return null;
    const key = normalizeStudentIdentity(globalSelectedStudent);
    return (
      records.find(
        (r) =>
          r.studentKey === key ||
          r.studentName === globalSelectedStudent ||
          normalizeStudentIdentity(r.studentName) === key
      ) || null
    );
  }, [globalSelectedStudent, records]);

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls);
    if (actions?.setSelectedClass) {
      actions.setSelectedClass(cls === 'Tümü' ? null : cls);
    }
    if (cls === 'Tümü' && actions?.setSelectedStudent) {
      actions.setSelectedStudent(null);
    }
  };

  const openStudentReport = (rec: StudentHizliOkumaRecord) => {
    setInspectingStudent(rec);
    setTeacherNoteInput(rec.teacherNote || '');
    setTargetWpmInput(rec.targetWpm || 250);
    setNoteSavedToast(false);
  };

  // Filtered records by class
  const classRecords = useMemo(() => {
    if (selectedClass === 'Tümü') return records;
    return records.filter((r) => r.className === selectedClass);
  }, [records, selectedClass]);

  // Filtered & sorted records for the student table
  const filteredTableRecords = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    const list = classRecords.filter((r) => {
      if (q) {
        const matchName = r.studentName.toLocaleLowerCase('tr-TR').includes(q);
        const matchClass = r.className.toLocaleLowerCase('tr-TR').includes(q);
        if (!matchName && !matchClass) return false;
      }
      if (statusFilter === 'excellent') return r.status === 'excellent';
      if (statusFilter === 'improving') return r.status === 'improving' || r.status === 'stable';
      if (statusFilter === 'risk') return r.status === 'risk';
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'growth') return b.growthRate - a.growthRate;
      if (sortBy === 'wpm') return b.currentWpm - a.currentWpm;
      if (sortBy === 'comp') return b.avgComp - a.avgComp;
      return a.studentName.localeCompare(b.studentName, 'tr');
    });
  }, [classRecords, searchQuery, statusFilter, sortBy]);

  // Dynamic KPI Metrics
  const stats = useMemo(() => {
    if (classRecords.length === 0) {
      return {
        avgWpm: 0,
        avgInitialWpm: 0,
        avgGrowthRate: 0,
        avgComp: 0,
        avgCourseCompletion: 0,
        activeStudents: 0,
        totalStudents: 0,
        totalExercises: 0
      };
    }
    const totalStudents = classRecords.length;
    const sumWpm = classRecords.reduce((acc, r) => acc + r.currentWpm, 0);
    const sumInitWpm = classRecords.reduce((acc, r) => acc + r.initialWpm, 0);
    const sumComp = classRecords.reduce((acc, r) => acc + r.avgComp, 0);
    const sumCourse = classRecords.reduce((acc, r) => acc + Math.round((r.courseDay / 21) * 100), 0);
    const activeStudents = classRecords.filter((r) => r.activeInLast7Days).length;
    const totalExercises = classRecords.reduce((acc, r) => acc + r.exerciseCounts.total, 0);

    const avgWpm = Math.round(sumWpm / totalStudents);
    const avgInitialWpm = Math.round(sumInitWpm / totalStudents);
    const avgGrowthRate = Math.round(((avgWpm - avgInitialWpm) / Math.max(1, avgInitialWpm)) * 100);

    return {
      avgWpm,
      avgInitialWpm,
      avgGrowthRate,
      avgComp: Math.round(sumComp / totalStudents),
      avgCourseCompletion: Math.round(sumCourse / totalStudents),
      activeStudents,
      totalStudents,
      totalExercises
    };
  }, [classRecords]);

  // Top developing students (real students in selected class/school)
  const topStudents = useMemo(() => {
    return [...classRecords]
      .sort((a, b) => b.growthRate - a.growthRate || b.currentWpm - a.currentWpm)
      .slice(0, 5);
  }, [classRecords]);

  // Risk group students (real students in selected class/school)
  const riskStudents = useMemo(() => {
    const explicitRisk = classRecords.filter((r) => r.status === 'risk');
    if (explicitRisk.length > 0) {
      return explicitRisk.sort((a, b) => a.avgComp - b.avgComp || a.currentWpm - b.currentWpm);
    }
    // If no explicit risk in a tiny class, show the lowest 2 students requiring attention
    return [...classRecords]
      .sort((a, b) => a.currentWpm - b.currentWpm)
      .slice(0, 2)
      .map((r) => ({
        ...r,
        riskReason: r.riskReason || 'Sınıf ortalamasının altında hız / ek pratik önerilir'
      }));
  }, [classRecords]);

  // Weekly Trend Data (Aggregated from real student records)
  const weeklyChartData = useMemo(() => {
    const weeks = ['1. Hafta', '2. Hafta', '3. Hafta', '4. Hafta'];
    if (classRecords.length === 0) {
      return weeks.map((w) => ({ week: w, wpm: 0, comp: 0, exercises: 0 }));
    }
    return weeks.map((weekLabel, idx) => {
      const avgWpm = Math.round(
        classRecords.reduce((acc, r) => acc + (r.weeklyProgress?.[idx]?.wpm || r.currentWpm), 0) /
          classRecords.length
      );
      const avgComp = Math.round(
        classRecords.reduce((acc, r) => acc + (r.weeklyProgress?.[idx]?.comp || r.avgComp), 0) /
          classRecords.length
      );
      const totalEx = classRecords.reduce(
        (acc, r) => acc + (r.weeklyProgress?.[idx]?.exercises || 0),
        0
      );
      return { week: weekLabel, wpm: avgWpm, comp: avgComp, exercises: totalEx };
    });
  }, [classRecords]);

  // Class-by-class comparison data
  const classComparisonData = useMemo(() => {
    return classKeys.map((clsKey) => {
      const clsList = records.filter((r) => r.className === clsKey);
      if (clsList.length === 0) {
        return { className: clsKey, studentCount: 0, initWpm: 0, currentWpm: 0, avgComp: 0, coursePct: 0 };
      }
      const initWpm = Math.round(clsList.reduce((a, r) => a + r.initialWpm, 0) / clsList.length);
      const currentWpm = Math.round(clsList.reduce((a, r) => a + r.currentWpm, 0) / clsList.length);
      const avgComp = Math.round(clsList.reduce((a, r) => a + r.avgComp, 0) / clsList.length);
      const coursePct = Math.round(
        clsList.reduce((a, r) => a + (r.courseDay / 21) * 100, 0) / clsList.length
      );
      return {
        className: clsKey,
        studentCount: clsList.length,
        initWpm,
        currentWpm,
        avgComp,
        coursePct
      };
    });
  }, [classKeys, records]);

  // Exercise breakdown across selected class/school
  const exerciseBreakdown = useMemo(() => {
    const totals = classRecords.reduce(
      (acc, r) => {
        acc.speedTests += r.exerciseCounts.speedTests;
        acc.blockReading += r.exerciseCounts.blockReading;
        acc.eyeExercises += r.exerciseCounts.eyeExercises;
        acc.tachistoscope += r.exerciseCounts.tachistoscope;
        acc.shadowReading += r.exerciseCounts.shadowReading;
        return acc;
      },
      { speedTests: 0, blockReading: 0, eyeExercises: 0, tachistoscope: 0, shadowReading: 0 }
    );
    const grandTotal = Math.max(
      1,
      totals.speedTests +
        totals.blockReading +
        totals.eyeExercises +
        totals.tachistoscope +
        totals.shadowReading
    );
    return [
      { label: 'Hızlı Okuma Testleri', count: totals.speedTests, pct: Math.round((totals.speedTests / grandTotal) * 100), color: 'bg-blue-500' },
      { label: 'Göz Kasları & Görme Alanı', count: totals.eyeExercises, pct: Math.round((totals.eyeExercises / grandTotal) * 100), color: 'bg-emerald-500' },
      { label: 'Blok Okuma Çalışmaları', count: totals.blockReading, pct: Math.round((totals.blockReading / grandTotal) * 100), color: 'bg-indigo-500' },
      { label: 'Takistoskop (Kelime Flaş)', count: totals.tachistoscope, pct: Math.round((totals.tachistoscope / grandTotal) * 100), color: 'bg-purple-500' },
      { label: 'Gölgeleme & Gruplama', count: totals.shadowReading, pct: Math.round((totals.shadowReading / grandTotal) * 100), color: 'bg-amber-500' }
    ];
  }, [classRecords]);

  const handleSaveTeacherFeedback = () => {
    if (!inspectingStudent) return;
    const updated = updateStudentTeacherFeedback(
      activeSchoolId,
      inspectingStudent.studentKey,
      {
        targetWpm: Number(targetWpmInput) || 250,
        teacherNote: teacherNoteInput.trim()
      },
      displayClasses
    );
    if (updated) {
      setInspectingStudent(updated);
      setNoteSavedToast(true);
      setTimeout(() => setNoteSavedToast(false), 3000);
    }
  };

  const handleDownloadStudentPdf = (student: StudentHizliOkumaRecord) => {
    try {
      setIsGeneratingPdf(true);
      const pdf = new jsPDF();

      pdf.setFontSize(20);
      pdf.setTextColor(30, 58, 138);
      pdf.text('ALIM - Hizli Okuma Ogrenci Gelisim Karnesi', 20, 22);

      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105);
      pdf.text(
        `Ogrenci: ${student.studentName} | Sinif: ${student.className} | Seviye: ${student.level}`,
        20,
        31
      );

      pdf.setDrawColor(226, 232, 240);
      pdf.line(20, 36, 190, 36);

      // Summary Boxes
      pdf.setFillColor(239, 246, 255);
      pdf.rect(20, 42, 80, 42, 'F');
      pdf.setFillColor(236, 253, 245);
      pdf.rect(110, 42, 80, 42, 'F');

      pdf.setFontSize(10);
      pdf.setTextColor(37, 99, 235);
      pdf.text('OKUMA HIZI GELISIMI', 25, 51);
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`Baslangic Hizi: ${student.initialWpm} Kelime/Dk`, 25, 62);
      pdf.text(`Guncel Hiz: ${student.currentWpm} Kelime/Dk (+%${student.growthRate})`, 25, 71);
      pdf.text(`En Yuksek / Hedef: ${student.bestWpm} / ${student.targetWpm} Kelime/Dk`, 25, 80);

      pdf.setFontSize(10);
      pdf.setTextColor(5, 150, 105);
      pdf.text('ANLAMA VE KURS DURUMU', 115, 51);
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`Ortalama Anlama: %${student.avgComp}`, 115, 62);
      pdf.text(`Dikkat & Odak Skoru: %${student.attentionScore}`, 115, 71);
      pdf.text(`21 Gunluk Kurs: ${student.courseDay} / 21 Gun`, 115, 80);

      // Exercise Counts
      pdf.setFontSize(13);
      pdf.setTextColor(30, 41, 59);
      pdf.text(`Tamamlanan Egzersizler (Toplam ${student.exerciseCounts.total} Calisma)`, 20, 98);
      pdf.setFontSize(10.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text(
        `Hiz Testi: ${student.exerciseCounts.speedTests} | Blok Okuma: ${student.exerciseCounts.blockReading} | Goz Egzersizi: ${student.exerciseCounts.eyeExercises} | Takistoskop: ${student.exerciseCounts.tachistoscope}`,
        20,
        106
      );

      // Recent Sessions
      pdf.setFontSize(13);
      pdf.setTextColor(30, 41, 59);
      pdf.text('Son Test ve Calisma Kayitlari', 20, 120);

      let yPos = 128;
      student.sessions.slice(0, 6).forEach((sess, idx) => {
        pdf.setFontSize(10);
        pdf.setTextColor(51, 65, 85);
        const metricStr = sess.wpm
          ? `${sess.wpm} Kelime/Dk${typeof sess.comprehension === 'number' ? ` - %${sess.comprehension} Anlama` : ''}`
          : sess.details || '';
        pdf.text(`${idx + 1}. [${sess.typeLabel}] ${sess.title} (${metricStr})`, 22, yPos);
        yPos += 8;
      });

      if (student.teacherNote) {
        pdf.setFillColor(254, 243, 199);
        pdf.rect(20, yPos + 4, 170, 32, 'F');
        pdf.setFontSize(11);
        pdf.setTextColor(146, 64, 14);
        pdf.text('Ogretmen Degerlendirme Notu:', 25, yPos + 13);
        pdf.setFontSize(10);
        const lines = pdf.splitTextToSize(student.teacherNote, 160);
        pdf.text(lines, 25, yPos + 21);
      }

      pdf.save(`${student.studentName.replace(/\s+/g, '_')}_Hizli_Okuma_Karnesi.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleOpenManualModal = () => {
    const defaultCls =
      selectedClass !== 'Tümü' ? selectedClass : classKeys[0] || '5A';
    setManualClass(defaultCls);
    const defaultStu =
      globalSelectedStudent && (displayClasses[defaultCls] || []).includes(globalSelectedStudent)
        ? globalSelectedStudent
        : displayClasses[defaultCls]?.[0] || '';
    setManualStudent(defaultStu);
    setShowAddResultModal(true);
  };

  const handleSaveManualResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualStudent || !manualClass) return;

    const updated = recordSpeedReadingSession(
      activeSchoolId,
      manualStudent,
      manualClass,
      {
        type: 'speed_test',
        typeLabel: 'Hızlı Okuma Testi',
        title: manualTextTitle || 'Sınıf İçi Hızlı Okuma Ölçümü',
        wpm: Math.max(40, Number(manualWpm) || 150),
        comprehension: Math.min(100, Math.max(0, Number(manualComp) || 75)),
        durationSeconds: Math.max(10, Number(manualDuration) || 45),
        details: `Öğretmen Ölçümü • ${manualWpm} Kelime/Dk • %${manualComp} Anlama`
      },
      displayClasses
    );

    setShowAddResultModal(false);
    openStudentReport(updated);
  };

  return (
    <div className="p-6 md:p-8 animate-in fade-in space-y-8 pb-20 max-w-[1600px] mx-auto">
      {/* Top Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Zap size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-blue-900 leading-tight">Hızlı Okuma Yönetimi & Öğrenci Raporları</h2>
              <p className="text-gray-500 font-medium text-sm">
                {selectedClass === 'Tümü'
                  ? `Tüm Okul (${records.length} Öğrenci) okuma hızı, anlama oranı ve 21 günlük kurs analizleri`
                  : `${selectedClass} Sınıfı (${classRecords.length} Öğrenci) gerçek zamanlı okuma hızı ve anlama gelişim raporları`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Öğrenci adı veya numarası ara..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-10 pr-8 rounded-xl font-semibold text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Class Selector */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="appearance-none bg-blue-50/80 border border-blue-200 text-blue-900 py-2.5 pl-4 pr-10 rounded-xl font-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer shadow-xs"
            >
              <option value="Tümü">Tüm Sınıflar ({records.length})</option>
              {classKeys.map((c) => (
                <option key={c} value={c}>
                  {c} Sınıfı ({(displayClasses[c] || []).length})
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 text-blue-600 pointer-events-none" />
          </div>

          {/* Add Manual Result Button */}
          <button
            onClick={handleOpenManualModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <Plus size={18} /> Yeni Ölçüm Gir
          </button>
        </div>
      </div>

      {/* Active Header Student Spotlight Banner (when a student is selected in top header like "16 - YEKTA FIRAT") */}
      {activeHeaderStudentRecord && (
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 rounded-3xl p-6 text-white shadow-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-in fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} /> Seçili Öğrenci Hızlı Okuma Karnesi
            </div>
            <h3 className="text-2xl font-black">
              {activeHeaderStudentRecord.studentName}{' '}
              <span className="text-white/80 font-bold text-lg">({activeHeaderStudentRecord.className})</span>
            </h3>
            <p className="text-white/90 text-sm font-medium">
              Seviye: <strong>{activeHeaderStudentRecord.level}</strong> • Son Çalışma:{' '}
              <strong>{activeHeaderStudentRecord.lastActiveLabel}</strong> • Toplam{' '}
              <strong>{activeHeaderStudentRecord.exerciseCounts.total} Egzersiz & Test</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-white/15 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-bold uppercase text-white/75">Başlangıç ➔ Güncel</div>
              <div className="text-lg font-black mt-0.5">
                {activeHeaderStudentRecord.initialWpm} ➔ {activeHeaderStudentRecord.currentWpm} Kelime/Dk
              </div>
              <div className="text-[11px] font-bold text-emerald-200">
                +%{activeHeaderStudentRecord.growthRate} Hızlanma
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-bold uppercase text-white/75">Anlama Oranı</div>
              <div className="text-lg font-black mt-0.5">%{activeHeaderStudentRecord.avgComp}</div>
              <div className="text-[11px] font-bold text-white/80">
                Son Test: %{activeHeaderStudentRecord.currentComp}
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-bold uppercase text-white/75">21 Günlük Kurs</div>
              <div className="text-lg font-black mt-0.5">{activeHeaderStudentRecord.courseDay} / 21 Gün</div>
              <div className="text-[11px] font-bold text-amber-200">
                %{Math.round((activeHeaderStudentRecord.courseDay / 21) * 100)} Tamamlandı
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button
                onClick={() => openStudentReport(activeHeaderStudentRecord)}
                className="bg-white text-blue-900 hover:bg-blue-50 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileText size={15} /> Detaylı Raporu Aç
              </button>
              <button
                onClick={() => handleDownloadStudentPdf(activeHeaderStudentRecord)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Karne PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Stats (Real Calculated Metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-blue-900">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-blue-500 text-xs font-black uppercase tracking-widest mb-1">
              {selectedClass === 'Tümü' ? 'Okul Ortalama Hızı' : `${selectedClass} Ortalama Hızı`}
            </div>
            <div className="text-4xl font-black text-gray-800">
              {stats.avgWpm} <span className="text-base text-gray-400 font-bold">Kelime/Dk</span>
            </div>
            <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md">
              Başlangıç ({stats.avgInitialWpm} Kelime/Dk) göre +%{stats.avgGrowthRate}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-emerald-900">
            <BarChart3 size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-1">
              Anlama Ortalaması
            </div>
            <div className="text-4xl font-black text-gray-800">%{stats.avgComp}</div>
            <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md">
              Hedef: %75 • {stats.avgComp >= 75 ? 'Hedefe Ulaşıldı' : 'Gelişim Sürecinde'}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-purple-900">
            <Target size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-purple-500 text-xs font-black uppercase tracking-widest mb-1">
              21 Günlük Kurs Tamamlama
            </div>
            <div className="text-4xl font-black text-gray-800">%{stats.avgCourseCompletion}</div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.avgCourseCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-orange-900">
            <Users size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-1">
              Aktif Öğrenci & Çalışma
            </div>
            <div className="text-4xl font-black text-gray-800">
              {stats.activeStudents}{' '}
              <span className="text-lg text-gray-400 font-bold">/ {stats.totalStudents}</span>
            </div>
            <div className="mt-2 text-xs font-bold text-orange-700 bg-orange-50 inline-block px-2.5 py-1 rounded-md">
              Toplam {stats.totalExercises} Test & Egzersiz
            </div>
          </div>
        </div>
      </div>

      {/* Top Improvers & Risk Group (Real Students from Selected Class/School) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* En Çok Gelişen Öğrenciler */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-emerald-50/60 flex justify-between items-center">
            <h3 className="font-black text-emerald-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" />
              En Çok Gelişen Öğrenciler ({selectedClass})
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              İlk {topStudents.length} Öğrenci
            </span>
          </div>
          <div className="p-3 divide-y divide-gray-50">
            {topStudents.map((s, idx) => (
              <div
                key={s.studentKey}
                onClick={() => openStudentReport(s)}
                className="flex justify-between items-center p-3.5 hover:bg-emerald-50/40 rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-emerald-800 flex items-center gap-2">
                      <span>{s.studentName}</span>
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                        {s.className}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-semibold mt-0.5">
                      Anlama: %{s.avgComp} • 21 Günlük Kurs: {s.courseDay}/21 Gün
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-600">+%{s.growthRate} Hızlanma</div>
                  <div className="text-xs text-gray-500 font-bold">
                    {s.initialWpm} ➔ {s.currentWpm} Kelime/Dk
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Grubundaki Öğrenciler */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-red-50/60 flex justify-between items-center">
            <h3 className="font-black text-red-900 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              Yakın Takip & Risk Grubundaki Öğrenciler ({selectedClass})
            </h3>
            <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
              {riskStudents.length} Öğrenci
            </span>
          </div>
          <div className="p-3 divide-y divide-gray-50">
            {riskStudents.map((s) => (
              <div
                key={s.studentKey}
                onClick={() => openStudentReport(s)}
                className="flex justify-between items-center p-3.5 hover:bg-red-50/30 rounded-2xl transition-colors cursor-pointer group"
              >
                <div>
                  <div className="font-bold text-gray-800 group-hover:text-red-800 flex items-center gap-2">
                    <span>{s.studentName}</span>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {s.className}
                    </span>
                  </div>
                  <div className="text-xs text-red-500 font-semibold mt-0.5">
                    {s.riskReason || 'Düzenli egzersiz ve anlama takibi önerilir'}
                  </div>
                </div>
                <div className="text-right flex gap-2.5 shrink-0">
                  <div className="bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 text-center min-w-[70px]">
                    <div className="text-[10px] text-red-400 font-bold uppercase">Hız (Kelime/Dk)</div>
                    <div className="text-sm font-black text-red-600">{s.currentWpm}</div>
                  </div>
                  <div className="bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100 text-center min-w-[60px]">
                    <div className="text-[10px] text-orange-400 font-bold uppercase">Anlama</div>
                    <div className="text-sm font-black text-orange-600">%{s.avgComp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gelişmiş Grafikler: Haftalık Gelişim & Sınıflar Arası Karşılaştırma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Haftalık Hız ve Anlama Gelişimi */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600" />
                Haftalık Okuma Hızı (Kelime/Dk) ve Anlama Oranı (%) Gelişimi
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {selectedClass === 'Tümü' ? 'Tüm sınıfların' : `${selectedClass} sınıfının`} son 4 haftalık ortalama dakikadaki kelime sayısı ve anlama yüzdesi değişimi
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span> Okuma Hızı (Kelime/Dk)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span> Anlama Oranı (%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 items-end h-60 border-b border-gray-100 pb-4 px-2">
            {weeklyChartData.map((item, idx) => {
              const wpmHeightPct = Math.min(100, Math.max(18, Math.round((item.wpm / 280) * 100)));
              const compHeightPct = Math.min(100, Math.max(18, item.comp));
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end gap-2">
                  <div className="flex items-end justify-center gap-2.5 w-full h-44">
                    {/* WPM Bar */}
                    <div className="flex flex-col items-center justify-end h-full flex-1 max-w-[42px]">
                      <span className="text-[11px] font-black text-blue-700 mb-1">{item.wpm}</span>
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl transition-all duration-500 shadow-xs"
                        style={{ height: `${wpmHeightPct}%` }}
                        title={`${item.week} Ortalama Hız: ${item.wpm} Kelime/Dakika`}
                      ></div>
                    </div>
                    {/* Comp Bar */}
                    <div className="flex flex-col items-center justify-end h-full flex-1 max-w-[42px]">
                      <span className="text-[11px] font-black text-emerald-700 mb-1">%{item.comp}</span>
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl transition-all duration-500 shadow-xs"
                        style={{ height: `${compHeightPct}%` }}
                        title={`${item.week} Anlama Oranı: %${item.comp}`}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-black text-gray-700">{item.week}</div>
                    <div className="text-[10px] font-bold text-gray-400">{item.exercises} çalışma</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sınıflar Arası Karşılaştırma Özeti */}
          <div className="pt-2">
            <div className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
              Sınıflar Arası Hız & Anlama Karşılaştırması
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {classComparisonData.map((clsItem) => (
                <div
                  key={clsItem.className}
                  onClick={() => handleClassChange(clsItem.className)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedClass === clsItem.className
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'bg-gray-50/70 border-gray-100 hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-sm text-blue-900">{clsItem.className} Sınıfı</span>
                    <span className="text-[10px] font-bold text-gray-500">{clsItem.studentCount} Öğr.</span>
                  </div>
                  <div className="text-lg font-black text-gray-800">
                    {clsItem.currentWpm} <span className="text-xs font-bold text-gray-400">Kelime/Dk</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold mt-1">
                    <span className="text-emerald-600">Anlama: %{clsItem.avgComp}</span>
                    <span className="text-purple-600">Kurs: %{clsItem.coursePct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Egzersiz Türü Dağılımı */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
              <Eye size={20} className="text-purple-600" />
              Çalışma & Egzersiz Türü Dağılımı
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Öğrencilerin tamamladığı toplam {stats.totalExercises} hızlı okuma ve algı egzersizinin modül bazlı dağılımı
            </p>

            <div className="space-y-4 mt-6">
              {exerciseBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="text-gray-900 font-black">
                      {item.count} Adet <span className="text-gray-400">(%{item.pct})</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(6, item.pct)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
            <div className="font-black flex items-center gap-1.5">
              <Award size={15} className="text-blue-600" /> Akademik Hızlı Okuma Analiz Notu
            </div>
            <p className="text-blue-800/90 font-medium leading-relaxed">
              LGS ve bursluluk sınavlarında uzun yeni nesil paragraf sorularını 45 saniyenin altında yüksek anlama oranıyla çözebilmek için hedef okuma hızı <strong>dakikada 220+ kelime (Kelime/Dk)</strong> ve anlama oranı <strong>%75+</strong> olmalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* Öğrenci Hızlı Okuma Sonuçları ve Detaylı Raporlar Tablosu */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div>
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Öğrenci Hızlı Okuma Sonuçları ve Bireysel Raporlar ({filteredTableRecords.length} Öğrenci)
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Öğrencinin tüm test geçmişini, haftalık gelişim grafiğini ve karnesini incelemek için satırdaki <strong>"Detaylı Rapor"</strong> butonuna tıklayın.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter Pills */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-white text-blue-900 shadow-xs font-black' : 'text-gray-600'
                }`}
              >
                Tümü ({classRecords.length})
              </button>
              <button
                onClick={() => setStatusFilter('excellent')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'excellent'
                    ? 'bg-emerald-600 text-white shadow-xs font-black'
                    : 'text-gray-600'
                }`}
              >
                Yüksek Gelişim ({classRecords.filter((r) => r.status === 'excellent').length})
              </button>
              <button
                onClick={() => setStatusFilter('improving')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'improving'
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : 'text-gray-600'
                }`}
              >
                İstikrarlı ({classRecords.filter((r) => r.status === 'improving' || r.status === 'stable').length})
              </button>
              <button
                onClick={() => setStatusFilter('risk')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'risk'
                    ? 'bg-red-600 text-white shadow-xs font-black'
                    : 'text-gray-600'
                }`}
              >
                Risk Grubu ({classRecords.filter((r) => r.status === 'risk').length})
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700">
              <Filter size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent outline-none cursor-pointer font-bold"
              >
                <option value="growth">Sırala: Hız Gelişimi (%)</option>
                <option value="wpm">Sırala: Güncel Hız (Kelime/Dk)</option>
                <option value="comp">Sırala: Anlama Oranı (%)</option>
                <option value="name">Sırala: Öğrenci Adı (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Öğrenci Adı</th>
                <th className="py-3.5 px-4">Sınıf</th>
                <th className="py-3.5 px-4">Seviye</th>
                <th className="py-3.5 px-4">Başlangıç ➔ Güncel Hız (Kelime/Dk)</th>
                <th className="py-3.5 px-4">Hızlanma</th>
                <th className="py-3.5 px-4">Anlama Oranı</th>
                <th className="py-3.5 px-4">21 Günlük Kurs</th>
                <th className="py-3.5 px-4">Çalışma Sayısı</th>
                <th className="py-3.5 px-4">Durum</th>
                <th className="py-3.5 px-6 text-right">Rapor & İnceleme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredTableRecords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400 font-semibold">
                    Arama kriterlerine uygun öğrenci sonucu bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredTableRecords.map((rec) => {
                  const isSelectedInHeader =
                    activeHeaderStudentRecord && activeHeaderStudentRecord.studentKey === rec.studentKey;
                  const coursePct = Math.round((rec.courseDay / 21) * 100);

                  return (
                    <tr
                      key={rec.studentKey}
                      onClick={() => openStudentReport(rec)}
                      className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${
                        isSelectedInHeader ? 'bg-indigo-50/60' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          <span>{rec.studentName}</span>
                          {isSelectedInHeader && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                              Seçili
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          Son çalışma: {rec.lastActiveLabel}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-black text-xs">
                          {rec.className}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                            rec.level === 'İleri'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : rec.level === 'İyi'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : rec.level === 'Orta'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {rec.level}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-black text-gray-800">
                          <span className="text-gray-400 font-bold">{rec.initialWpm}</span> ➔{' '}
                          <span className="text-blue-700 text-base">{rec.currentWpm} Kelime/Dk</span>
                        </div>
                        <div className="text-[11px] text-gray-400 font-semibold">
                          Rekor: {rec.bestWpm} Kelime/Dk
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-black text-xs ${
                            rec.growthRate >= 50
                              ? 'bg-emerald-50 text-emerald-700'
                              : rec.growthRate >= 20
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          <TrendingUp size={13} /> +%{rec.growthRate}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black ${
                              rec.avgComp >= 75
                                ? 'text-emerald-600'
                                : rec.avgComp >= 55
                                ? 'text-blue-600'
                                : 'text-red-600'
                            }`}
                          >
                            %{rec.avgComp}
                          </span>
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                rec.avgComp >= 75
                                  ? 'bg-emerald-500'
                                  : rec.avgComp >= 55
                                  ? 'bg-blue-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${rec.avgComp}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium">
                          Dikkat: %{rec.attentionScore}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-xs font-black text-gray-700">
                          {rec.courseDay} / 21 Gün (%{coursePct})
                        </div>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${coursePct}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-800 text-xs">
                          {rec.exerciseCounts.total} Çalışma
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium">
                          {rec.exerciseCounts.speedTests} Hız Testi
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {rec.status === 'excellent' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                            Çok İyi Gelişim
                          </span>
                        )}
                        {(rec.status === 'improving' || rec.status === 'stable') && (
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                            İstikrarlı
                          </span>
                        )}
                        {rec.status === 'risk' && (
                          <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs border border-red-200">
                            Yakın Takip
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openStudentReport(rec);
                          }}
                          className="bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText size={14} /> Detaylı Rapor
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bireysel Öğrenci Hızlı Okuma Detaylı Rapor Modalı */}
      {inspectingStudent && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectingStudent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 md:p-8 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 font-black text-xs">
                    {inspectingStudent.className} Sınıfı
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-black text-xs">
                    Seviye: {inspectingStudent.level}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    Son Aktif: {inspectingStudent.lastActiveLabel}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mt-2">
                  {inspectingStudent.studentName} — Hızlı Okuma Gelişim Raporu
                </h3>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleDownloadStudentPdf(inspectingStudent)}
                  disabled={isGeneratingPdf}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={15} /> {isGeneratingPdf ? 'Hazırlanıyor...' : 'Karne PDF İndir'}
                </button>
                <button
                  onClick={() => setInspectingStudent(null)}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 4 Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
                <div className="text-[10px] font-black text-blue-500 uppercase tracking-wider">
                  Başlangıç ➔ Güncel Hız
                </div>
                <div className="text-2xl font-black text-blue-900 mt-1">
                  {inspectingStudent.initialWpm} ➔ {inspectingStudent.currentWpm}{' '}
                  <span className="text-xs font-bold">Kelime/Dk</span>
                </div>
                <div className="text-xs font-bold text-emerald-600 mt-1">
                  +%{inspectingStudent.growthRate} Hız Artışı (Rekor: {inspectingStudent.bestWpm})
                </div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                <div className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
                  Anlama Başarısı
                </div>
                <div className="text-2xl font-black text-emerald-900 mt-1">
                  %{inspectingStudent.avgComp}
                </div>
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  İlk: %{inspectingStudent.initialComp} ➔ Son: %{inspectingStudent.currentComp}
                </div>
              </div>

              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100">
                <div className="text-[10px] font-black text-purple-600 uppercase tracking-wider">
                  21 Günlük Akıllı Kurs
                </div>
                <div className="text-2xl font-black text-purple-900 mt-1">
                  {inspectingStudent.courseDay} / 21 <span className="text-xs font-bold">Gün</span>
                </div>
                <div className="text-xs font-bold text-purple-700 mt-1">
                  %{Math.round((inspectingStudent.courseDay / 21) * 100)} Tamamlandı
                </div>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
                <div className="text-[10px] font-black text-amber-600 uppercase tracking-wider">
                  Toplam Egzersiz & Test
                </div>
                <div className="text-2xl font-black text-amber-900 mt-1">
                  {inspectingStudent.exerciseCounts.total}{' '}
                  <span className="text-xs font-bold">Çalışma</span>
                </div>
                <div className="text-xs font-bold text-amber-700 mt-1">
                  Dikkat & Odak: %{inspectingStudent.attentionScore}
                </div>
              </div>
            </div>

            {/* Student Weekly Progress & Exercise Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4">
                <h4 className="font-black text-gray-800 text-sm flex items-center gap-2">
                  <TrendingUp size={16} className="text-blue-600" /> Haftalık Hız (Kelime/Dk) ve Anlama (%) Grafiği
                </h4>
                <div className="grid grid-cols-4 gap-3 items-end h-36 pt-2">
                  {inspectingStudent.weeklyProgress.map((w, i) => {
                    const hPct = Math.min(100, Math.max(20, Math.round((w.wpm / 300) * 100)));
                    return (
                      <div key={i} className="flex flex-col items-center justify-end h-full">
                        <span className="text-[11px] font-black text-blue-700 mb-1">{w.wpm}</span>
                        <div
                          className="w-10 bg-blue-500 rounded-t-lg transition-all"
                          style={{ height: `${hPct}%` }}
                        ></div>
                        <span className="text-[10px] font-bold text-emerald-600 mt-1">%{w.comp}</span>
                        <span className="text-[10px] font-bold text-gray-500">{w.week}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
                <h4 className="font-black text-gray-800 text-sm flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-600" /> Tamamlanan Egzersiz Dağılımı
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Hızlı Okuma Testi</span>
                    <span className="font-black text-blue-700">
                      {inspectingStudent.exerciseCounts.speedTests} kez
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Blok Okuma</span>
                    <span className="font-black text-indigo-700">
                      {inspectingStudent.exerciseCounts.blockReading} kez
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Göz Egzersizleri</span>
                    <span className="font-black text-emerald-700">
                      {inspectingStudent.exerciseCounts.eyeExercises} kez
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Takistoskop</span>
                    <span className="font-black text-purple-700">
                      {inspectingStudent.exerciseCounts.tachistoscope} kez
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center col-span-2">
                    <span className="font-semibold text-gray-600">Gölgeleme & Gruplama Çalışmaları</span>
                    <span className="font-black text-amber-700">
                      {inspectingStudent.exerciseCounts.shadowReading} kez
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session History Log */}
            <div className="space-y-3">
              <h4 className="font-black text-gray-800 text-sm flex items-center gap-2">
                <Clock size={16} className="text-blue-600" /> Öğrencinin Son Test ve Egzersiz Kayıtları ({inspectingStudent.sessions.length})
              </h4>
              <div className="border border-gray-100 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 font-black text-gray-400 uppercase">
                      <th className="py-2.5 px-4">Tarih</th>
                      <th className="py-2.5 px-4">Çalışma Türü</th>
                      <th className="py-2.5 px-4">Metin / Egzersiz Adı</th>
                      <th className="py-2.5 px-4">Okuma Hızı</th>
                      <th className="py-2.5 px-4">Anlama</th>
                      <th className="py-2.5 px-4">Detay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {inspectingStudent.sessions.map((sess) => (
                      <tr key={sess.id} className="hover:bg-gray-50/80">
                        <td className="py-2.5 px-4 font-semibold text-gray-500">{sess.formattedDate}</td>
                        <td className="py-2.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
                            {sess.typeLabel}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-bold text-gray-800">{sess.title}</td>
                        <td className="py-2.5 px-4 font-black text-blue-700">
                          {sess.wpm ? `${sess.wpm} Kelime/Dk` : '-'}
                        </td>
                        <td className="py-2.5 px-4 font-black text-emerald-700">
                          {typeof sess.comprehension === 'number' ? `%${sess.comprehension}` : '-'}
                        </td>
                        <td className="py-2.5 px-4 text-gray-500 font-medium">{sess.details || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Teacher Target & Note Section */}
            <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-indigo-950 text-sm flex items-center gap-2">
                  <Target size={16} className="text-indigo-600" /> Öğretmen Hedef & Yönlendirme Notu
                </h4>
                {noteSavedToast && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={14} /> Öğrenci profiline kaydedildi
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-indigo-900 mb-1">
                    Hedef Okuma Hızı (Kelime/Dk)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={600}
                    step={10}
                    value={targetWpmInput}
                    onChange={(e) => setTargetWpmInput(Number(e.target.value))}
                    className="w-full bg-white border border-indigo-200 rounded-xl px-3 py-2 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-indigo-900 mb-1">
                    Öğrenci ve Veli Raporunda Görünecek Öğretmen Değerlendirmesi
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={teacherNoteInput}
                      onChange={(e) => setTeacherNoteInput(e.target.value)}
                      placeholder="Örn: Blok okuma çalışmalarında 3 kelimelik gruplara geçmeli, her akşam 15 dk pratik yapmalı..."
                      className="flex-1 bg-white border border-indigo-200 rounded-xl px-3.5 py-2 text-sm font-medium text-gray-800 outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleSaveTeacherFeedback}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Hızlı Okuma Ölçümü Ekleme Modalı */}
      {showAddResultModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowAddResultModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-100 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">Yeni Hızlı Okuma Ölçümü Kaydet</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Sınıf içinde yapılan hızlı okuma ve anlama ölçümünü öğrencinin profiline ekleyin.
                </p>
              </div>
              <button
                onClick={() => setShowAddResultModal(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveManualResult} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">1. Sınıf Seçin</label>
                  <select
                    value={manualClass}
                    onChange={(e) => {
                      const cls = e.target.value;
                      setManualClass(cls);
                      setManualStudent(displayClasses[cls]?.[0] || '');
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-bold text-gray-800 outline-none"
                  >
                    {classKeys.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">2. Öğrenci Seçin</label>
                  <select
                    value={manualStudent}
                    onChange={(e) => setManualStudent(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-bold text-gray-800 outline-none"
                  >
                    {(displayClasses[manualClass] || []).map((stu) => (
                      <option key={stu} value={stu}>
                        {stu}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Okunan Metin / Çalışma Adı</label>
                <select
                  value={manualTextTitle}
                  onChange={(e) => setManualTextTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-bold text-gray-800 outline-none"
                >
                  {testTexts.map((t, idx) => (
                    <option key={idx} value={t.title}>
                      {t.title} ({t.words} kelime)
                    </option>
                  ))}
                  <option value="Sınıf İçi Hızlı Okuma Değerlendirmesi">
                    Sınıf İçi Hızlı Okuma Değerlendirmesi
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Okuma Hızı (Kelime/Dk)</label>
                  <input
                    type="number"
                    min={40}
                    max={800}
                    value={manualWpm}
                    onChange={(e) => setManualWpm(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-black text-blue-700 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Anlama Oranı (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={manualComp}
                    onChange={(e) => setManualComp(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-black text-emerald-700 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Süre (Saniye)</label>
                  <input
                    type="number"
                    min={10}
                    max={600}
                    value={manualDuration}
                    onChange={(e) => setManualDuration(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-bold text-gray-700 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddResultModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer"
                >
                  Sonucu Öğrenciye Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
