import React, { useState, useMemo, useRef } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  PieChart,
  Check, 
  Edit3, 
  TrendingUp,
  Activity,
  Layers,
  FileText,
  Sliders,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Percent,
  HelpCircle,
  Clock,
  CheckCheck
} from 'lucide-react';
import { 
  PusulaSinavAnaliziDoc, 
  PusulaQuestionAnalysisDef, 
  PusulaStudentExamRow 
} from '../../types/pusula';

interface PusulaSinavAnaliziProps {
  state: any;
  actions: any;
  activeSchoolId: string;
  selectedClass?: string | null;
  classes?: Record<string, string[]>;
}

// Sample Exam Data from user's Excel: Göynük İmam Hatip Ortaokulu 2025-2026 2. Dönem Temel Dini Bilgiler 1. Sınav
const SAMPLE_EXAM_DATA: PusulaSinavAnaliziDoc = {
  id: 'sample-goynuk-tdb-1',
  schoolName: 'GÖYNÜK İMAM HATİP ORTAOKULU',
  academicYear: '2025-2026',
  term: '2',
  className: '8/A',
  subject: 'Temel Dini Bilgiler',
  teacherName: 'FARUK KAHRAMAN',
  examNumber: 1,
  principalName: 'FARUK KAHRAMAN',
  scenarioNumber: '1',
  questionCount: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  teacherComment: 'Öğrencilerimiz temel kavram ve tanımlarda yüksek başarı göstermiş; ancak infak ilkeleri ve ibadetlerin şartları konularındaki açık uçlu sorularda kısmi eksiklikler görülmüştür. Bu kazanımlara yönelik soru çözümü ve telafi etkinliği planlanmıştır.',
  questions: [
    { questionNumber: 1, outcome: 'Müminlerin sahip olması gereken temel özellikleri bilir.', maxScore: 12 },
    { questionNumber: 2, outcome: 'Namazı özenle kılmak için yapılması gerekenleri bilir.', maxScore: 9 },
    { questionNumber: 3, outcome: 'İyiliğin yaygınlaşıp kötülüklerin engellenmesi için yapılabilecekleri söyler.', maxScore: 9 },
    { questionNumber: 4, outcome: 'Müminlerin özellikleriyle ilgili kavramları bilir. (İsraf, Sıdk, Tadil-i erkan)', maxScore: 10 },
    { questionNumber: 5, outcome: 'Yoksula yardım ederken Kur\'an\'a uygun infak etmeyi bilir.', maxScore: 9 },
    { questionNumber: 6, outcome: 'Emr-i bi\'l-maruf nehy-i ani\'l-münkerin nasıl yapılacağına örnek verir.', maxScore: 9 },
    { questionNumber: 7, outcome: 'Esmâ-i Hüsnâ\'yı tanır ve anlamlarını açıklar.', maxScore: 7 },
    { questionNumber: 8, outcome: 'İbadetlerin kabul şartlarını ve rükünlerini bilir.', maxScore: 9 },
    { questionNumber: 9, outcome: 'Doğruluk, zekât, emr-i bi\'l-maruf ve mümin kavramlarını analiz eder.', maxScore: 16 },
    { questionNumber: 10, outcome: 'İsraf ve cimriliği önleme konusunda günlük hayattan örnekler verir.', maxScore: 10 }
  ],
  students: [
    { id: 'st-1', studentNumber: '15', studentName: 'ONUR KAZAN', status: 'girdi', scores: { 1: 8, 2: 6, 3: 9, 4: 7, 5: 6, 6: 9, 7: 7, 8: 0, 9: 10, 10: 0 }, totalScore: 62 },
    { id: 'st-2', studentNumber: '16', studentName: 'YEKTA FIRAT', status: 'girdi', scores: { 1: 10, 2: 6, 3: 9, 4: 10, 5: 9, 6: 9, 7: 7, 8: 6, 9: 12, 10: 8 }, totalScore: 86 },
    { id: 'st-3', studentNumber: '19', studentName: 'BERAT SOY', status: 'girdi', scores: { 1: 8, 2: 6, 3: 8, 4: 3, 5: 6, 6: 6, 7: 7, 8: 0, 9: 8, 10: 8 }, totalScore: 60 },
    { id: 'st-4', studentNumber: '20', studentName: 'EFE TUÇDOĞAN', status: 'girdi', scores: { 1: 5, 2: 5, 3: 8, 4: 5, 5: 0, 6: 6, 7: 0, 8: 3, 9: 15, 10: 4 }, totalScore: 51 },
    { id: 'st-5', studentNumber: '23', studentName: 'MİRAÇ EROL', status: 'girdi', scores: { 1: 5, 2: 9, 3: 9, 4: 3, 5: 6, 6: 3, 7: 0, 8: 0, 9: 8, 10: 4 }, totalScore: 47 },
    { id: 'st-6', studentNumber: '25', studentName: 'OSMAN TALHA AKTAŞ', status: 'girdi', scores: { 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 8, 7: 7, 8: 3, 9: 16, 10: 8 }, totalScore: 87 },
    { id: 'st-7', studentNumber: '26', studentName: 'SEFA TUNCA', status: 'girdi', scores: { 1: 5, 2: 9, 3: 9, 4: 0, 5: 6, 6: 6, 7: 0, 8: 0, 9: 4, 10: 2 }, totalScore: 41 },
    { id: 'st-8', studentNumber: '27', studentName: 'MUSTAFA AYKUT CANSIZ', status: 'girdi', scores: { 1: 11, 2: 3, 3: 3, 4: 5, 5: 3, 6: 3, 7: 7, 8: 0, 9: 10, 10: 4 }, totalScore: 49 },
    { id: 'st-9', studentNumber: '28', studentName: 'ENSAR BALER', status: 'girdi', scores: { 1: 5, 2: 9, 3: 6, 4: 5, 5: 0, 6: 3, 7: 7, 8: 2, 9: 12, 10: 4 }, totalScore: 53 },
    { id: 'st-10', studentNumber: '35', studentName: 'ÖMER FARUK NURAL', status: 'girdi', scores: { 1: 11, 2: 6, 3: 6, 4: 0, 5: 0, 6: 9, 7: 7, 8: 0, 9: 0, 10: 10 }, totalScore: 49 },
    { id: 'st-11', studentNumber: '37', studentName: 'MELİH EMRE ÖZKAYA', status: 'girdi', scores: { 1: 11, 2: 0, 3: 3, 4: 4, 5: 0, 6: 9, 7: 7, 8: 0, 9: 13, 10: 8 }, totalScore: 55 },
    { id: 'st-12', studentNumber: '41', studentName: 'EMİR EKREM AKGÜN', status: 'girdi', scores: { 1: 11, 2: 6, 3: 0, 4: 6, 5: 3, 6: 3, 7: 7, 8: 0, 9: 16, 10: 2 }, totalScore: 54 },
    { id: 'st-13', studentNumber: '45', studentName: 'MEHMET SALİH BAŞKAN', status: 'girdi', scores: { 1: 11, 2: 6, 3: 9, 4: 5, 5: 9, 6: 9, 7: 7, 8: 6, 9: 16, 10: 6 }, totalScore: 84 },
    { id: 'st-14', studentNumber: '46', studentName: 'MUHAMMED YUSUF BAŞKAN', status: 'girdi', scores: { 1: 11, 2: 6, 3: 9, 4: 5, 5: 9, 6: 9, 7: 7, 8: 0, 9: 10, 10: 0 }, totalScore: 66 },
    { id: 'st-15', studentNumber: '52', studentName: 'EFE ERSÖZ', status: 'girdi', scores: { 1: 8, 2: 3, 3: 6, 4: 1, 5: 3, 6: 6, 7: 7, 8: 3, 9: 9, 10: 6 }, totalScore: 52 },
    { id: 'st-16', studentNumber: '66', studentName: 'ZEYNEP NUR AKTI', status: 'girdi', scores: { 1: 9, 2: 6, 3: 9, 4: 6, 5: 9, 6: 8, 7: 0, 8: 3, 9: 10, 10: 8 }, totalScore: 68 },
    { id: 'st-17', studentNumber: '67', studentName: 'İSMAİL EFE KARATAŞ', status: 'girdi', scores: { 1: 8, 2: 6, 3: 9, 4: 3, 5: 3, 6: 3, 7: 7, 8: 6, 9: 10, 10: 8 }, totalScore: 63 },
    { id: 'st-18', studentNumber: '72', studentName: 'MUHAMMED ENES KON', status: 'girdi', scores: { 1: 11, 2: 3, 3: 9, 4: 8, 5: 9, 6: 6, 7: 7, 8: 6, 9: 14, 10: 8 }, totalScore: 81 },
    { id: 'st-19', studentNumber: '73', studentName: 'MUHAMMED ZAHİD KAHRAMAN', status: 'girdi', scores: { 1: 8, 2: 9, 3: 9, 4: 6, 5: 9, 6: 9, 7: 7, 8: 3, 9: 15, 10: 10 }, totalScore: 85 },
    { id: 'st-20', studentNumber: '76', studentName: 'MUHAMMET ALİ YANIK', status: 'girdi', scores: { 1: 0, 2: 9, 3: 6, 4: 4, 5: 0, 6: 8, 7: 7, 8: 0, 9: 8, 10: 6 }, totalScore: 48 },
    { id: 'st-21', studentNumber: '77', studentName: 'TALHA KADİR ATEŞ', status: 'girdi', scores: { 1: 11, 2: 9, 3: 9, 4: 6, 5: 6, 6: 9, 7: 0, 8: 3, 9: 16, 10: 4 }, totalScore: 73 },
    { id: 'st-22', studentNumber: '80', studentName: 'HAYRUNNİSA ADALAN', status: 'girdi', scores: { 1: 11, 2: 6, 3: 9, 4: 8, 5: 9, 6: 9, 7: 7, 8: 3, 9: 10, 10: 10 }, totalScore: 82 }
  ]
};

export const PusulaSinavAnalizi: React.FC<PusulaSinavAnaliziProps> = ({
  state,
  actions,
  activeSchoolId,
  selectedClass,
  classes = {}
}) => {
  const storageKey = `pusula_sinav_analizleri_${activeSchoolId || 'default'}`;
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // All saved exams
  const [savedExams, setSavedExams] = useState<Record<string, PusulaSinavAnaliziDoc>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Object.keys(parsed).length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      [SAMPLE_EXAM_DATA.id]: SAMPLE_EXAM_DATA
    };
  });

  const [activeExamId, setActiveExamId] = useState<string>(SAMPLE_EXAM_DATA.id);
  const [printMode, setPrintMode] = useState<'2_page' | '1_page'>('2_page');
  const [activeChartTab, setActiveChartTab] = useState<'all' | 'questions' | 'distribution' | 'histogram'>('all');

  // Active exam doc
  const currentExam = useMemo(() => {
    return savedExams[activeExamId] || SAMPLE_EXAM_DATA;
  }, [savedExams, activeExamId]);

  // Persist exams
  const saveAllExams = (newExams: Record<string, PusulaSinavAnaliziDoc>) => {
    setSavedExams(newExams);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newExams));
    } catch (e) {
      console.error("Local storage save error", e);
    }
  };

  // Update field of current active exam
  const handleUpdateExam = (updates: Partial<PusulaSinavAnaliziDoc>) => {
    const updated: PusulaSinavAnaliziDoc = {
      ...currentExam,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    const newExams = {
      ...savedExams,
      [currentExam.id]: updated
    };
    saveAllExams(newExams);
  };

  // Create new blank exam
  const handleCreateNewExam = () => {
    const newId = `sinav-${Date.now()}`;
    const schoolName = state?.schools?.find((s: any) => s.id === activeSchoolId)?.name || 'OKUL ADI';
    const newDoc: PusulaSinavAnaliziDoc = {
      id: newId,
      schoolName: schoolName,
      academicYear: state?.activeAcademicYear || '2025-2026',
      term: '2',
      className: selectedClass || Object.keys(classes)[0] || '8/A',
      subject: 'Ders Adı',
      teacherName: state?.currentUser?.name || state?.currentUser?.username || 'Ders Öğretmeni',
      examNumber: 1,
      principalName: 'Okul Müdürü',
      scenarioNumber: '1',
      questionCount: 10,
      teacherComment: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: Array.from({ length: 10 }).map((_, i) => ({
        questionNumber: i + 1,
        outcome: `Soru ${i + 1} için öğrenme çıktısı / kazanım açıklaması`,
        maxScore: 10
      })),
      students: []
    };

    const newExams = {
      ...savedExams,
      [newId]: newDoc
    };
    saveAllExams(newExams);
    setActiveExamId(newId);
    actions?.showToast?.('Yeni sınav analiz tablosu oluşturuldu.', 'success');
  };

  // Helper to retrieve students for any class name variant (8/A, 8_A, 8A, etc.)
  const getStudentsForClass = (className: string): string[] => {
    if (!classes || typeof classes !== 'object') return [];
    if (classes[className] && Array.isArray(classes[className])) {
      return classes[className];
    }
    const norm = (s: string) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
    const targetNorm = norm(className);
    for (const [k, v] of Object.entries(classes)) {
      if (norm(k) === targetNorm && Array.isArray(v)) {
        return v;
      }
    }
    return [];
  };

  // Class Selection Handler: Updates class and loads its students
  const handleSelectClassAndLoadStudents = (newClassName: string) => {
    const studentList = getStudentsForClass(newClassName);
    const formattedClassName = newClassName.replace('_', '/');
    
    if (studentList && studentList.length > 0) {
      const newStudents: PusulaStudentExamRow[] = studentList.map((name, idx) => ({
        id: `st-${newClassName}-${idx + 1}-${Date.now()}`,
        studentNumber: String(idx + 1),
        studentName: name,
        status: 'girdi',
        scores: {},
        totalScore: 0
      }));
      handleUpdateExam({ 
        className: formattedClassName,
        students: newStudents 
      });
      actions?.showToast?.(`${formattedClassName} sınıfından ${studentList.length} öğrenci aktarıldı.`, 'success');
    } else {
      handleUpdateExam({ className: formattedClassName });
      actions?.showToast?.(`${formattedClassName} sınıfı seçildi.`, 'info');
    }
  };

  // Populate students from class
  const handlePopulateFromClass = () => {
    const targetClass = currentExam.className || selectedClass;
    const classStudents = targetClass ? getStudentsForClass(targetClass) : [];
    if (!classStudents || classStudents.length === 0) {
      actions?.showToast?.('Seçili sınıfta öğrenci kaydı bulunamadı.', 'info');
      return;
    }

    const newStudents: PusulaStudentExamRow[] = classStudents.map((name, idx) => ({
      id: `st-imp-${idx + 1}-${Date.now()}`,
      studentNumber: String(idx + 1),
      studentName: name,
      status: 'girdi',
      scores: {},
      totalScore: 0
    }));

    handleUpdateExam({ students: newStudents });
    actions?.showToast?.(`${classStudents.length} öğrenci sınıftan aktarıldı.`, 'success');
  };

  // Add single student row
  const handleAddStudentRow = () => {
    const newRow: PusulaStudentExamRow = {
      id: `st-${Date.now()}`,
      studentNumber: String(currentExam.students.length + 1),
      studentName: 'YENİ ÖĞRENCİ',
      status: 'girdi',
      scores: {},
      totalScore: 0
    };
    handleUpdateExam({ students: [...currentExam.students, newRow] });
  };

  // Delete student row
  const handleDeleteStudentRow = (id: string) => {
    handleUpdateExam({
      students: currentExam.students.filter(s => s.id !== id)
    });
  };

  // Change student score cell
  const handleScoreChange = (studentId: string, qNum: number, rawVal: string) => {
    const qMax = currentExam.questions.find(q => q.questionNumber === qNum)?.maxScore || 10;
    let val = parseFloat(rawVal);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > qMax) val = qMax;

    const updatedStudents = currentExam.students.map(st => {
      if (st.id === studentId) {
        const newScores = {
          ...st.scores,
          [qNum]: val
        };
        // Calculate total
        const total = Object.values(newScores).reduce((a, b) => a + (b || 0), 0);
        return {
          ...st,
          scores: newScores,
          totalScore: Math.round(total * 10) / 10
        };
      }
      return st;
    });

    handleUpdateExam({ students: updatedStudents });
  };

  // Change Question Max Score
  const handleQuestionMaxScoreChange = (qNum: number, rawVal: string) => {
    const val = Math.max(1, parseInt(rawVal) || 10);
    const updatedQ = currentExam.questions.map(q => {
      if (q.questionNumber === qNum) {
        return { ...q, maxScore: val };
      }
      return q;
    });
    handleUpdateExam({ questions: updatedQ });
  };

  // Change Question Outcome text
  const handleQuestionOutcomeChange = (qNum: number, text: string) => {
    const updatedQ = currentExam.questions.map(q => {
      if (q.questionNumber === qNum) {
        return { ...q, outcome: text };
      }
      return q;
    });
    handleUpdateExam({ questions: updatedQ });
  };

  // Change Question Count (e.g. 5, 8, 10, 12, 15, 20)
  const handleQuestionCountChange = (count: number) => {
    const newCount = Math.max(1, Math.min(20, count));
    let newQuestions = [...currentExam.questions];
    if (newQuestions.length < newCount) {
      for (let i = newQuestions.length + 1; i <= newCount; i++) {
        newQuestions.push({
          questionNumber: i,
          outcome: `Soru ${i} öğrenme çıktısı`,
          maxScore: 10
        });
      }
    } else {
      newQuestions = newQuestions.slice(0, newCount);
    }
    handleUpdateExam({
      questionCount: newCount,
      questions: newQuestions
    });
  };

  // -------------------------------------------------------------------------
  // STATISTICAL CALCULATIONS (Matching Excel MEB formulas)
  // -------------------------------------------------------------------------
  const stats = useMemo(() => {
    const students = currentExam.students || [];
    const totalStudents = students.length;
    const takingExam = students.filter(s => s.status === 'girdi');
    const absentCount = students.filter(s => s.status === 'girmedi').length;
    const cheatCount = students.filter(s => s.status === 'kopya').length;
    const n = takingExam.length;

    const scoresList = takingExam.map(s => s.totalScore);
    
    // Distribution Brackets
    const dist85_100 = takingExam.filter(s => s.totalScore >= 85 && s.totalScore <= 100).length;
    const dist70_84 = takingExam.filter(s => s.totalScore >= 70 && s.totalScore < 85).length;
    const dist60_69 = takingExam.filter(s => s.totalScore >= 60 && s.totalScore < 70).length;
    const dist50_59 = takingExam.filter(s => s.totalScore >= 50 && s.totalScore < 60).length;
    const dist0_49 = takingExam.filter(s => s.totalScore < 50).length;

    // 5-Level Histogram (0-20, 21-40, 41-60, 61-80, 81-100)
    const hist0_20 = takingExam.filter(s => s.totalScore >= 0 && s.totalScore <= 20).length;
    const hist21_40 = takingExam.filter(s => s.totalScore > 20 && s.totalScore <= 40).length;
    const hist41_60 = takingExam.filter(s => s.totalScore > 40 && s.totalScore <= 60).length;
    const hist61_80 = takingExam.filter(s => s.totalScore > 60 && s.totalScore <= 80).length;
    const hist81_100 = takingExam.filter(s => s.totalScore > 80 && s.totalScore <= 100).length;

    const successfulCount = takingExam.filter(s => s.totalScore >= 50).length;
    const unsuccessfulCount = takingExam.filter(s => s.totalScore < 50).length;
    const successRate = n > 0 ? (successfulCount / n) * 100 : 0;

    // Arithmetic Mean
    const sumScores = scoresList.reduce((a, b) => a + b, 0);
    const mean = n > 0 ? sumScores / n : 0;

    // Median
    let median = 0;
    if (n > 0) {
      const sorted = [...scoresList].sort((a, b) => a - b);
      const mid = Math.floor(n / 2);
      median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    // Mode (En çok tekrar eden değer)
    let mode = 0;
    if (n > 0) {
      const freq: Record<number, number> = {};
      scoresList.forEach(sc => { freq[sc] = (freq[sc] || 0) + 1; });
      let maxFreq = 0;
      for (const [sc, f] of Object.entries(freq)) {
        if (f > maxFreq) {
          maxFreq = f;
          mode = parseFloat(sc);
        }
      }
    }

    // Range (Ranj)
    const maxScore = scoresList.length > 0 ? Math.max(...scoresList) : 0;
    const minScore = scoresList.length > 0 ? Math.min(...scoresList) : 0;
    const range = scoresList.length > 0 ? maxScore - minScore : 0;

    // Standard Deviation
    let stdDev = 0;
    if (n > 1) {
      const variance = scoresList.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
      stdDev = Math.sqrt(variance);
    }

    // Skewness (Çarpıklık = 3 * (Mean - Median) / StdDev)
    let skewness = 0;
    if (stdDev > 0) {
      skewness = (3 * (mean - median)) / stdDev;
    }

    // Difficulty Evaluation text
    let difficultyTitle = 'DENGELİ / ORTA GÜÇLÜKTE';
    let difficultyColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let difficultyDesc = 'Sınav sınıf seviyesine ve hedeflenen kazanım dağılımına uygundur.';
    
    if (skewness > 0.3) {
      difficultyTitle = 'SINAV ÇOK ZOR';
      difficultyColor = 'text-rose-700 bg-rose-50 border-rose-200';
      difficultyDesc = 'Sınav öğrenci seviyesinin üzerindedir ya da beklenen davranışlar tam pekişmemiştir. Puanlar alt bölgede yığılmıştır.';
    } else if (skewness > 0.1) {
      difficultyTitle = 'SINAV ZOR';
      difficultyColor = 'text-amber-700 bg-amber-50 border-amber-200';
      difficultyDesc = 'Sınav ortalamanın üzerinde bir güçlük derecesine sahiptir.';
    } else if (skewness < -0.3) {
      difficultyTitle = 'SINAV ÇOK KOLAY';
      difficultyColor = 'text-blue-700 bg-blue-50 border-blue-200';
      difficultyDesc = 'Sınav soruları öğrenci seviyesine göre oldukça kolay kalmıştır; puanlar üst seviyelerde yoğunlaşmıştır.';
    } else if (skewness < -0.1) {
      difficultyTitle = 'SINAV KOLAY';
      difficultyColor = 'text-teal-700 bg-teal-50 border-teal-200';
      difficultyDesc = 'Sınav genel olarak öğrencilerin rahat yanıtladığı bir seviyededir.';
    }

    // Total Max Score of Exam
    const totalExamMax = currentExam.questions.reduce((a, b) => a + b.maxScore, 0);

    // Per-Question Statistics
    const questionStats = currentExam.questions.map(q => {
      const qNum = q.questionNumber;
      const qMax = q.maxScore;
      
      const answeredCount = takingExam.filter(s => (s.scores[qNum] || 0) > 0).length;
      const unansweredCount = takingExam.length - answeredCount;
      const answeredPercent = n > 0 ? (answeredCount / n) * 100 : 0;

      const qSum = takingExam.reduce((acc, s) => acc + (s.scores[qNum] || 0), 0);
      const qAvg = n > 0 ? qSum / n : 0;
      const qSuccessRatio = qMax > 0 ? (qAvg / qMax) * 100 : 0;

      let statusLabel: 'Anlaşılmış' | 'Geri Bildirim Verilmeli' | 'Bireysel Çalışma Gerekli' = 'Anlaşılmış';
      let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      let barColor = 'bg-emerald-500';

      if (qSuccessRatio < 40) {
        statusLabel = 'Bireysel Çalışma Gerekli';
        statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
        barColor = 'bg-rose-500';
      } else if (qSuccessRatio < 60) {
        statusLabel = 'Geri Bildirim Verilmeli';
        statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
        barColor = 'bg-amber-500';
      }

      return {
        questionNumber: qNum,
        outcome: q.outcome,
        maxScore: qMax,
        answeredCount,
        unansweredCount,
        answeredPercent,
        qAvg,
        qSuccessRatio,
        statusLabel,
        statusColor,
        barColor
      };
    });

    // Outcomes needing feedback (sorted from lowest success)
    const feedbackQuestions = [...questionStats]
      .filter(q => q.statusLabel !== 'Anlaşılmış')
      .sort((a, b) => a.qSuccessRatio - b.qSuccessRatio);

    // Top successful questions
    const topQuestions = [...questionStats]
      .sort((a, b) => b.qSuccessRatio - a.qSuccessRatio)
      .slice(0, 3);

    return {
      totalStudents,
      takingExamCount: n,
      absentCount,
      cheatCount,
      successfulCount,
      unsuccessfulCount,
      successRate,
      mean,
      median,
      mode,
      maxScore,
      minScore,
      range,
      stdDev,
      skewness,
      difficultyTitle,
      difficultyColor,
      difficultyDesc,
      totalExamMax,
      dist85_100,
      dist70_84,
      dist60_69,
      dist50_59,
      dist0_49,
      hist0_20,
      hist21_40,
      hist41_60,
      hist61_80,
      hist81_100,
      questionStats,
      feedbackQuestions,
      topQuestions
    };
  }, [currentExam]);

  // Execute clean print
  const handlePrint = () => {
    window.print();
  };

  // Direct High Quality PDF Generation using html-to-image & jsPDF (compatible with Tailwind OKLCH colors)
  const handleExportPDF = async () => {
    if (!page1Ref.current) return;
    setIsExportingPdf(true);
    actions?.showToast?.('PDF hazırlanıyor, lütfen bekleyin...', 'info');

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Render Page 1
      const dataUrl1 = await toPng(page1Ref.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const imgProps1 = pdf.getImageProperties(dataUrl1);
      const renderHeight1 = (imgProps1.height * (pdfWidth - 12)) / imgProps1.width;
      
      pdf.addImage(dataUrl1, 'PNG', 6, 6, pdfWidth - 12, Math.min(renderHeight1, pdfHeight - 12));

      // Render Page 2 if in 2_page mode and page2Ref is present
      if (printMode === '2_page' && page2Ref.current) {
        const dataUrl2 = await toPng(page2Ref.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        const imgProps2 = pdf.getImageProperties(dataUrl2);
        const renderHeight2 = (imgProps2.height * (pdfWidth - 12)) / imgProps2.width;

        pdf.addPage();
        pdf.addImage(dataUrl2, 'PNG', 6, 6, pdfWidth - 12, Math.min(renderHeight2, pdfHeight - 12));
      }

      const cleanSubject = (currentExam.subject || 'Ders').replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, '_');
      const cleanClass = (currentExam.className || 'Sinif').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Sinav_Analizi_${cleanClass}_${cleanSubject}_${currentExam.examNumber}_Sinav.pdf`;

      pdf.save(filename);
      actions?.showToast?.('PDF başarıyla indirildi.', 'success');
    } catch (error) {
      console.error('PDF export error:', error);
      actions?.showToast?.('Yazdırma penceresi açılıyor...', 'info');
      // Graceful fallback to native browser print
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 animate-in fade-in duration-300">
      {/* ------------------------------------------------------------------- */}
      {/* PRINT-SPECIFIC CSS RULES (A4 1-2 Pages Compact & High Quality)     */}
      {/* ------------------------------------------------------------------- */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 6mm 6mm 6mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 8.5pt !important;
          }
          .print-hidden, header, nav, .hide-on-print, .no-print {
            display: none !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            border-radius: 6px !important;
            padding: 5px 8px !important;
            margin-bottom: 6px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-page-1 {
            page-break-after: ${printMode === '2_page' ? 'always' : 'auto'} !important;
            break-after: ${printMode === '2_page' ? 'page' : 'auto'} !important;
            min-height: ${printMode === '2_page' ? '280mm' : 'auto'} !important;
            box-sizing: border-box !important;
          }
          .print-page-2 {
            display: ${printMode === '1_page' ? 'none' : 'block'} !important;
            page-break-before: always !important;
            break-before: page !important;
            box-sizing: border-box !important;
          }
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            font-size: 7.8pt !important;
          }
          th, td {
            padding: 2.5px 3.5px !important;
            border: 1px solid #cbd5e1 !important;
          }
          th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            font-weight: bold !important;
          }
          input, select, textarea {
            border: none !important;
            background: transparent !important;
            font-weight: bold !important;
            color: #000000 !important;
            padding: 0 !important;
            font-size: inherit !important;
          }
        }
      `}</style>

      {/* Top Header & Actions (Hidden on Print) */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-purple-600/20 shrink-0">
            <FileSpreadsheet size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-black text-xs border border-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                <Award size={12} /> MEB UYUMLU SINAV ANALİZ MODÜLÜ
              </span>
              <span className="text-xs font-bold text-gray-400">
                {currentExam.academicYear} • {currentExam.term}. Dönem
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Yazılı Sınav Değerlendirme &amp; Madde Analiz Grafikleri
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Exam Selector */}
          <div className="relative">
            <select
              value={activeExamId}
              onChange={(e) => setActiveExamId(e.target.value)}
              className="appearance-none bg-purple-50 border border-purple-200 text-purple-900 py-2.5 pl-4 pr-10 rounded-xl text-xs font-black outline-none cursor-pointer focus:bg-white focus:border-purple-500 shadow-2xs"
            >
              {Object.values(savedExams).map((ex) => (
                <option key={ex.id} value={ex.id}>
                  📄 {ex.subject} ({ex.className} - {ex.examNumber}. Sınav)
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-3 text-purple-500 pointer-events-none rotate-90" size={14} />
          </div>

          <button
            onClick={handleCreateNewExam}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus size={16} /> Yeni Sınav
          </button>

          <button
            onClick={handlePopulateFromClass}
            className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Seçili sınıftaki öğrencileri tabloya aktar"
          >
            <Users size={16} /> Sınıftan Doldur
          </button>

          {/* PDF Page Mode Selector */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-bold">
            <button
              onClick={() => setPrintMode('2_page')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                printMode === '2_page' ? 'bg-white text-purple-900 shadow-xs font-black' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Sayfa 1: Kazanım & Grafikler, Sayfa 2: Öğrenci Not Çizelgesi & İmzalar"
            >
              2 Sayfa (Tam Rapor)
            </button>
            <button
              onClick={() => setPrintMode('1_page')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                printMode === '1_page' ? 'bg-white text-purple-900 shadow-xs font-black' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Kompakt tek sayfalık yönetici özeti"
            >
              1 Sayfa (Özet &amp; Grafikler)
            </button>
          </div>

          {/* Direct Download PDF Button */}
          <button
            onClick={handleExportPDF}
            disabled={isExportingPdf}
            className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
            title="PDF dosyası olarak indir"
          >
            <Download size={16} /> {isExportingPdf ? 'İndiriliyor...' : 'PDF İndir'}
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Printer size={16} /> Yazdır
          </button>
        </div>
      </div>

      {/* Main Container for Printing & PDF Generation */}
      <div ref={reportContainerRef} className="space-y-6">

        {/* =================================================================== */}
        {/* SAYFA 1: RESMİ SINAV ÜST BİLGİLERİ, İSTATİSTİK & GRAFİKLER         */}
        {/* =================================================================== */}
        <div ref={page1Ref} className="print-page-1 space-y-5 bg-white p-2 rounded-2xl">
          {/* 1. EXAM AND INSTITUTION HEADER */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-4 print:p-3 print:rounded-lg print:border-gray-300 print-card">
            <div className="text-center border-b border-gray-100 pb-2.5 print:pb-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase print:text-[13pt]">
                T.C. MİLLÎ EĞİTİM BAKANLIĞI — YAZILI SINAV ANALİZ RAPORU
              </h2>
              <p className="text-xs font-bold text-gray-500 mt-0.5 print:text-[8pt]">
                {currentExam.schoolName} • Öğrenme Çıktıları, Süreç Bileşenleri ve Madde Başarı Analizi
              </p>
            </div>

            {/* Header Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs font-bold print:grid-cols-3 print:gap-1.5 print:text-[8pt]">
              {/* Column 1 */}
              <div className="space-y-1.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 print:bg-white print:p-1.5 print:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">OKUL ADI:</span>
                  <input
                    type="text"
                    value={currentExam.schoolName}
                    onChange={(e) => handleUpdateExam({ schoolName: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">ÖĞRETİM YILI:</span>
                  <input
                    type="text"
                    value={currentExam.academicYear}
                    onChange={(e) => handleUpdateExam({ academicYear: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">DÖNEM:</span>
                  <select
                    value={currentExam.term}
                    onChange={(e) => handleUpdateExam({ term: e.target.value as any })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 cursor-pointer print:border-0"
                  >
                    <option value="1">1. Dönem</option>
                    <option value="2">2. Dönem</option>
                  </select>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-1.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 print:bg-white print:p-1.5 print:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">DERS ADI:</span>
                  <input
                    type="text"
                    value={currentExam.subject}
                    onChange={(e) => handleUpdateExam({ subject: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SINIF / ŞUBE:</span>
                  <select
                    value={
                      Object.keys(classes).find(k => k.replace('_', '/') === currentExam.className || k === currentExam.className) || 
                      currentExam.className
                    }
                    onChange={(e) => handleSelectClassAndLoadStudents(e.target.value)}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 cursor-pointer print:border-0"
                  >
                    <option value="" disabled>Sınıf Seçiniz</option>
                    {Object.keys(classes).sort().map((clsKey) => (
                      <option key={clsKey} value={clsKey}>
                        {clsKey.replace('_', '/')} ({classes[clsKey]?.length || 0} Öğrenci)
                      </option>
                    ))}
                    {!Object.keys(classes).some(k => k.replace('_', '/') === currentExam.className || k === currentExam.className) && (
                      <option value={currentExam.className}>{currentExam.className}</option>
                    )}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">DERS ÖĞRETMENİ:</span>
                  <input
                    type="text"
                    value={currentExam.teacherName}
                    onChange={(e) => handleUpdateExam({ teacherName: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-1.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 print:bg-white print:p-1.5 print:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SINAV NO:</span>
                  <select
                    value={currentExam.examNumber}
                    onChange={(e) => handleUpdateExam({ examNumber: parseInt(e.target.value) || 1 })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 cursor-pointer print:border-0"
                  >
                    <option value={1}>1. Sınav</option>
                    <option value={2}>2. Sınav</option>
                    <option value={3}>3. Sınav</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SENARYO NO:</span>
                  <input
                    type="text"
                    value={currentExam.scenarioNumber}
                    onChange={(e) => handleUpdateExam({ scenarioNumber: e.target.value })}
                    className="bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg text-gray-900 font-bold w-3/5 text-right outline-none focus:border-purple-500 print:w-auto print:border-0"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 print:text-gray-700">SORU SAYISI:</span>
                  <div className="flex items-center gap-1.5 justify-end">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={currentExam.questionCount}
                      onChange={(e) => handleQuestionCountChange(parseInt(e.target.value) || 10)}
                      className="bg-white border border-gray-200 px-2 py-0.5 rounded-lg text-gray-900 font-bold w-14 text-center outline-none focus:border-purple-500 print:w-auto print:border-0"
                    />
                    <span className="text-[11px] text-gray-400 print:text-gray-600">Soru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* 2. STATISTICAL SUMMARY & VISUAL CHARTS SECTION (GRAFİKLER)         */}
          {/* ----------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-4 print:p-3 print:rounded-lg print-card">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 flex-wrap gap-2 print:pb-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 print:text-xs">
                <BarChart3 className="text-purple-600" size={18} />
                Sınav Başarı İstatistikleri ve Görsel Analiz Grafikleri
              </h3>

              {/* Chart Switcher Buttons (Web Only) */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold print:hidden">
                <button
                  onClick={() => setActiveChartTab('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'all' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  🌟 Tüm Grafikler
                </button>
                <button
                  onClick={() => setActiveChartTab('questions')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'questions' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  📊 Soru Başarı Grafiği
                </button>
                <button
                  onClick={() => setActiveChartTab('distribution')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'distribution' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  🍩 Not Dağılımı (Dilim)
                </button>
                <button
                  onClick={() => setActiveChartTab('histogram')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeChartTab === 'histogram' ? 'bg-white text-purple-900 font-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  📈 Puan Histogramı
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs print:grid-cols-6 print:gap-1.5">
              <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 text-center print:border-gray-200 print:p-1">
                <div className="text-gray-400 font-bold text-[9px] uppercase">Giren Öğrenci</div>
                <div className="text-base font-black text-gray-900 mt-0.5 print:text-[10pt]">{stats.takingExamCount} / {stats.totalStudents}</div>
              </div>

              <div className="p-2.5 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-center print:border-gray-200 print:p-1">
                <div className="text-emerald-700 font-bold text-[9px] uppercase">Başarılı (≥50)</div>
                <div className="text-base font-black text-emerald-800 mt-0.5 print:text-[10pt]">{stats.successfulCount} (%{stats.successRate.toFixed(0)})</div>
              </div>

              <div className="p-2.5 bg-rose-50/80 rounded-2xl border border-rose-100 text-center print:border-gray-200 print:p-1">
                <div className="text-rose-700 font-bold text-[9px] uppercase">Başarısız (&lt;50)</div>
                <div className="text-base font-black text-rose-800 mt-0.5 print:text-[10pt]">{stats.unsuccessfulCount}</div>
              </div>

              <div className="p-2.5 bg-blue-50/80 rounded-2xl border border-blue-100 text-center print:border-gray-200 print:p-1">
                <div className="text-blue-700 font-bold text-[9px] uppercase">Aritmetik Ort.</div>
                <div className="text-base font-black text-blue-900 mt-0.5 print:text-[10pt]">{stats.mean.toFixed(1)} Puan</div>
              </div>

              <div className="p-2.5 bg-indigo-50/80 rounded-2xl border border-indigo-100 text-center print:border-gray-200 print:p-1">
                <div className="text-indigo-700 font-bold text-[9px] uppercase">Medyan (Ortanca)</div>
                <div className="text-base font-black text-indigo-900 mt-0.5 print:text-[10pt]">{stats.median.toFixed(1)}</div>
              </div>

              <div className="p-2.5 bg-teal-50/80 rounded-2xl border border-teal-100 text-center print:border-gray-200 print:p-1">
                <div className="text-teal-700 font-bold text-[9px] uppercase">Standart Sapma</div>
                <div className="text-base font-black text-teal-900 mt-0.5 print:text-[10pt]">{stats.stdDev.toFixed(1)}</div>
              </div>
            </div>

            {/* VISUAL CHARTS SECTION (Rich Interactive & High-res Printable) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1 print:grid-cols-12 print:gap-2">
              {/* Left/Main: Soru ve Kazanım Başarı Grafiği (Bar Chart) */}
              <div className={`${activeChartTab === 'distribution' || activeChartTab === 'histogram' ? 'hidden print:block' : ''} lg:col-span-7 bg-slate-50/80 p-4 rounded-3xl border border-slate-200 space-y-3 print:col-span-7 print:p-2 print:bg-white print:border-gray-300`}>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 print:text-[8pt]">
                    <TrendingUp size={14} className="text-purple-600" />
                    Soru Bazlı Sınıf Başarı Oranları (%)
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold print:text-[7pt]">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ≥%60 İyi
                    </span>
                    <span className="flex items-center gap-1 text-amber-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span> %40-59 Geri Bildirim
                    </span>
                    <span className="flex items-center gap-1 text-rose-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span> &lt;%40 Telafi
                    </span>
                  </div>
                </div>

                {/* Bar Chart Canvas / SVG */}
                <div className="h-36 sm:h-40 flex items-end justify-between gap-1.5 pt-4 pb-1.5 px-2 bg-white rounded-2xl border border-slate-200/80 relative print:h-28 print:rounded-lg print:border-gray-200">
                  {/* 50% Threshold Guideline */}
                  <div className="absolute left-0 right-0 top-1/2 border-b border-dashed border-slate-300 pointer-events-none flex items-center justify-end pr-2">
                    <span className="text-[8px] font-black text-slate-400 bg-white/90 px-1 rounded print:text-[6pt]">%50 Geçme Eşiği</span>
                  </div>

                  {stats.questionStats.map((q) => {
                    const barHeight = Math.max(6, Math.min(100, q.qSuccessRatio));
                    return (
                      <div key={q.questionNumber} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                        {/* Tooltip on Hover (Web Only) */}
                        <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-20 pointer-events-none print:hidden">
                          <div className="bg-slate-900 text-white p-2 rounded-xl text-[10px] font-bold whitespace-nowrap shadow-xl border border-slate-700">
                            <div>Soru {q.questionNumber}: %{q.qSuccessRatio.toFixed(1)}</div>
                            <div className="text-slate-300 font-normal">Ortalama: {q.qAvg.toFixed(1)} / {q.maxScore} Puan</div>
                            <div className="text-amber-300 text-[9px] max-w-xs truncate">{q.outcome}</div>
                          </div>
                          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
                        </div>

                        {/* Percentage Label */}
                        <span className="text-[9px] font-black text-slate-700 mb-0.5 group-hover:text-purple-600 transition-colors print:text-[6.5pt]">
                          %{q.qSuccessRatio.toFixed(0)}
                        </span>

                        {/* Bar Fill */}
                        <div className="w-full max-w-[28px] bg-slate-100 rounded-t-md overflow-hidden flex flex-col justify-end h-full print:border print:border-slate-200">
                          <div 
                            className={`w-full rounded-t-md transition-all duration-700 ${q.barColor} group-hover:brightness-110 shadow-2xs`}
                            style={{ height: `${barHeight}%` }}
                          />
                        </div>

                        {/* X Label */}
                        <span className="text-[9px] font-black text-slate-500 mt-1 print:text-[7pt]">
                          S.{q.questionNumber}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Not Dağılımı ve Donut Dilim Grafiği (5 cols) */}
              <div className={`${activeChartTab === 'questions' ? 'hidden print:block' : ''} lg:col-span-5 bg-purple-50/40 p-4 rounded-3xl border border-purple-100 space-y-3 print:col-span-5 print:p-2 print:bg-white print:border-gray-300`}>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5 print:text-[8pt]">
                    <PieChart size={14} className="text-purple-600" />
                    Not &amp; Puan Dağılımı
                  </div>
                  <span className="text-[9px] font-black text-purple-700 bg-white px-2 py-0.5 rounded-md border border-purple-200 print:text-[7pt]">
                    {stats.takingExamCount} Öğrenci
                  </span>
                </div>

                {/* Score Brackets Horizontal Progress Bars */}
                <div className="space-y-1.5 text-xs font-bold print:space-y-1 print:text-[7.5pt]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">85-100 (Pekiyi):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist85_100 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-emerald-700">{stats.dist85_100}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">70-84 (İyi):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist70_84 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-blue-700">{stats.dist70_84}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">60-69 (Orta):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist60_69 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-indigo-700">{stats.dist60_69}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">50-59 (Geçer):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist50_59 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-amber-700">{stats.dist50_59}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="w-24 text-gray-600 text-[10px] print:text-[7.5pt]">0-49 (Başarısız):</span>
                    <div className="flex-1 bg-white h-3.5 rounded-full overflow-hidden border border-purple-200/60 p-0.5 print:h-3">
                      <div 
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stats.takingExamCount > 0 ? (stats.dist0_49 / stats.takingExamCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-black text-rose-700">{stats.dist0_49}</span>
                  </div>
                </div>

                {/* Sınav Güçlüğü Skalası */}
                <div className="p-2.5 bg-white rounded-2xl border border-purple-100 text-center space-y-0.5 print:p-1 print:border-gray-200">
                  <div className="text-[9px] font-bold text-gray-400 uppercase print:text-[6.5pt]">Sınav Güçlük ve Ayırt Edicilik Düzeyi</div>
                  <div className="text-xs font-black text-purple-900 uppercase print:text-[8pt]">
                    {stats.difficultyTitle}
                  </div>
                  <div className="text-[9.5px] text-gray-500 print:text-[7pt]">
                    Çarpıklık Katsayısı: <strong>{stats.skewness.toFixed(2)}</strong> • Ranj: <strong>{stats.range}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Histogram View (When Histogram tab is selected or in comprehensive report) */}
            {activeChartTab === 'histogram' && (
              <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2 animate-in fade-in duration-200 print:hidden">
                <div className="text-xs font-black text-slate-800 uppercase flex items-center gap-1.5">
                  <Activity size={14} className="text-indigo-600" />
                  Puan Aralıkları Frekans / Histogram Dağılımı
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">0 - 20 Puan</div>
                    <div className="text-base font-black text-rose-600 mt-1">{stats.hist0_20} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">21 - 40 Puan</div>
                    <div className="text-base font-black text-rose-500 mt-1">{stats.hist21_40} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">41 - 60 Puan</div>
                    <div className="text-base font-black text-amber-600 mt-1">{stats.hist41_60} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">61 - 80 Puan</div>
                    <div className="text-base font-black text-blue-600 mt-1">{stats.hist61_80} Öğr.</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-gray-400 font-bold">81 - 100 Puan</div>
                    <div className="text-base font-black text-emerald-600 mt-1">{stats.hist81_100} Öğr.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistical Evaluation & Teacher Comments Box */}
            <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-1.5 print:p-2 print:bg-white print:border-gray-300 print:text-[8pt]">
              <div className="font-black text-purple-900 flex items-center gap-1.5 print:text-[8pt]">
                <Sparkles size={14} className="text-purple-600" />
                Sınavın İstatistiksel Madde Değerlendirmesi ve Kazanım Raporu:
              </div>
              <p className="leading-relaxed text-xs print:text-[7.8pt]">
                Sınavın Çarpıklık Değerine ({stats.skewness.toFixed(2)}) göre; <strong>{stats.difficultyTitle}</strong>. {stats.difficultyDesc} 
                {stats.feedbackQuestions.length > 0 ? (
                  <span className="text-rose-800 font-bold block pt-0.5">
                    ⚠️ Öncelikli Telafi Gerektiren Sorular: {stats.feedbackQuestions.map(q => `Soru ${q.questionNumber} (%${q.qSuccessRatio.toFixed(0)})`).join(', ')}
                  </span>
                ) : (
                  <span className="text-emerald-800 font-bold block pt-0.5">
                    ✅ Sınıf genelinde tüm kazanımlarda hedeflenen yeterlilik düzeyine ulaşılmıştır.
                  </span>
                )}
              </p>
            </div>

            {/* Teacher Comment Box */}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5 print:text-[8pt]">
                <Edit3 size={13} className="text-purple-600" />
                DERS ÖĞRETMENİNİN SINAV VE SINIF HAKKINDAKİ GÖRÜŞÜ &amp; TELAFİ PLANI:
              </label>
              <textarea
                rows={2}
                value={currentExam.teacherComment}
                onChange={(e) => handleUpdateExam({ teacherComment: e.target.value })}
                placeholder="Öğretmen olarak bu sınav ve sınıfın kazanım durumu hakkındaki görüşlerinizi yazabilirsiniz..."
                className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-2xl text-xs font-semibold text-gray-800 outline-none focus:bg-white focus:border-purple-500 print:bg-white print:border-0 print:p-0 print:text-[8pt]"
              />
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* 3. QUESTION OUTCOMES & DIFFICULTY MATRIX (Kazanım Dağılımı)        */}
          {/* ----------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-3 print:p-3 print:rounded-lg print-card">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 print:text-xs">
                  <BookOpen className="text-purple-600" size={17} />
                  Öğrenme Çıktıları, Süreç Bileşenleri ve Puan Analiz Tablosu
                </h3>
                <p className="text-xs text-gray-400 font-semibold print:text-[7.5pt]">
                  Her sorunun MEB öğrenme çıktısını ve azami puanını belirleyin. Toplam Sınav Puanı: <strong>{stats.totalExamMax} Puan</strong>
                </p>
              </div>

              <div className="text-xs font-bold text-gray-500 print:hidden">
                Senaryo Soru Sayısı: <span className="font-black text-purple-700">{currentExam.questionCount}</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl print:border-0">
              <table className="w-full text-xs text-left">
                <thead className="bg-purple-900 text-white font-black text-center print:bg-gray-100 print:text-gray-900">
                  <tr>
                    <th className="p-2 w-10 border-r border-purple-800 print:border-gray-300">Soru</th>
                    <th className="p-2 text-left border-r border-purple-800 print:border-gray-300">Öğrenme Çıktısı / Süreç Bileşeni (Kazanım)</th>
                    <th className="p-2 w-14 border-r border-purple-800 print:border-gray-300">Puan</th>
                    <th className="p-2 w-16 border-r border-purple-800 print:border-gray-300">Cevaplayan</th>
                    <th className="p-2 w-16 border-r border-purple-800 print:border-gray-300">Başarı %</th>
                    <th className="p-2 w-16 border-r border-purple-800 print:border-gray-300">Ortalama</th>
                    <th className="p-2 w-32">Konu Analizi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold print:divide-gray-300">
                  {stats.questionStats.map((q) => (
                    <tr key={q.questionNumber} className="hover:bg-purple-50/40 transition-colors">
                      <td className="p-1.5 text-center font-black bg-purple-50 text-purple-900 border-r border-gray-100 print:bg-white print:border-gray-300">
                        {q.questionNumber}
                      </td>
                      <td className="p-1 border-r border-gray-100 print:border-gray-300">
                        <input
                          type="text"
                          value={q.outcome}
                          onChange={(e) => handleQuestionOutcomeChange(q.questionNumber, e.target.value)}
                          className="w-full bg-transparent p-0.5 rounded-lg border border-transparent hover:border-gray-200 focus:border-purple-500 focus:bg-white outline-none text-xs font-medium text-gray-800 print:border-0"
                        />
                      </td>
                      <td className="p-1 text-center border-r border-gray-100 print:border-gray-300">
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={q.maxScore}
                          onChange={(e) => handleQuestionMaxScoreChange(q.questionNumber, e.target.value)}
                          className="w-12 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded text-center font-black text-purple-900 outline-none focus:bg-white focus:border-purple-500 print:border-0 print:bg-transparent"
                        />
                      </td>
                      <td className="p-1.5 text-center text-gray-700 border-r border-gray-100 print:border-gray-300">
                        {q.answeredCount} / {stats.takingExamCount}
                      </td>
                      <td className="p-1.5 text-center font-bold text-gray-900 border-r border-gray-100 print:border-gray-300">
                        %{q.qSuccessRatio.toFixed(1)}
                      </td>
                      <td className="p-1.5 text-center font-mono font-black text-indigo-900 border-r border-gray-100 print:border-gray-300">
                        {q.qAvg.toFixed(1)}
                      </td>
                      <td className="p-1 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-lg text-[9.5px] font-black border ${q.statusColor} print:border-0 print:bg-transparent`}>
                          {q.statusLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* In 1-Page summary mode, also render signatures at bottom of Page 1 */}
          {printMode === '1_page' && (
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex items-center justify-between gap-8 text-center text-xs font-bold text-gray-700 print:p-2.5 print:rounded-lg print-card">
              <div className="space-y-1">
                <div className="text-gray-400 uppercase text-[9px]">Ders Öğretmeni</div>
                <div className="font-black text-gray-900 text-xs">{currentExam.teacherName || 'Ders Öğretmeni'}</div>
                <div className="text-gray-400 text-[9px]">İmza: ...........................................</div>
              </div>

              <div className="space-y-1">
                <div className="text-gray-400 uppercase text-[9px]">Okul Müdürü</div>
                <div className="font-black text-gray-900 text-xs">{currentExam.principalName || 'Okul Müdürü'}</div>
                <div className="text-gray-400 text-[9px]">İmza / Mühür: ...........................................</div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* SAYFA 2: ÖĞRENCİ NOT GİRİŞ MATRİSİ VE RESMİ İMZALAR                 */}
        {/* =================================================================== */}
        <div ref={page2Ref} className={`print-page-2 space-y-5 bg-white p-2 rounded-2xl ${printMode === '1_page' ? 'print:hidden' : ''}`}>
          {/* 4. STUDENT SCORING GRID MATRIX */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm space-y-3 print:p-3 print:rounded-lg print-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 print:text-xs">
                  <Users className="text-purple-600" size={17} />
                  Öğrenci Not Çizelgesi &amp; Soru Puan Değerleri
                </h3>
                <p className="text-xs text-gray-400 font-semibold print:text-[7.5pt]">
                  {currentExam.schoolName} — {currentExam.className} Sınıfı {currentExam.subject} Dersi {currentExam.examNumber}. Sınav Not Tablosu
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap print:hidden">
                {/* Sınıf Seç Dropdown */}
                <div className="flex items-center gap-1.5 bg-purple-50/90 border border-purple-200 py-1 px-3 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-purple-900 flex items-center gap-1 whitespace-nowrap">
                    <Users size={14} className="text-purple-700" />
                    Sınıf Seç:
                  </span>
                  <select
                    value={
                      Object.keys(classes).find(k => k.replace('_', '/') === currentExam.className || k === currentExam.className) || 
                      currentExam.className
                    }
                    onChange={(e) => handleSelectClassAndLoadStudents(e.target.value)}
                    className="bg-white border border-purple-300 text-purple-950 font-black text-xs px-2.5 py-1 rounded-xl outline-none cursor-pointer focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="" disabled>Sınıf Seçiniz</option>
                    {Object.keys(classes).sort().map((clsKey) => {
                      const displayLabel = clsKey.replace('_', '/');
                      const count = classes[clsKey]?.length || 0;
                      return (
                        <option key={clsKey} value={clsKey}>
                          {displayLabel} ({count} Öğrenci)
                        </option>
                      );
                    })}
                    {!Object.keys(classes).some(k => k.replace('_', '/') === currentExam.className || k === currentExam.className) && (
                      <option value={currentExam.className}>{currentExam.className}</option>
                    )}
                  </select>
                </div>

                {/* Manuel Öğrenci Ekle */}
                <button
                  onClick={handleAddStudentRow}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer border border-gray-200"
                  title="Listeye manuel öğrenci satırı ekle"
                >
                  <Plus size={14} /> Manuel Ekle
                </button>
              </div>
            </div>

            {/* Grading Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-2xl max-h-[600px] overflow-y-auto print:max-h-none print:border-0">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-white font-black sticky top-0 z-10 text-center print:bg-gray-100 print:text-gray-900">
                  <tr>
                    <th className="p-1.5 w-8 border-r border-slate-800 print:border-gray-300">SIRA</th>
                    <th className="p-1.5 w-14 border-r border-slate-800 print:border-gray-300">NO</th>
                    <th className="p-1.5 text-left w-40 border-r border-slate-800 print:border-gray-300">AD SOYAD</th>
                    <th className="p-1.5 w-16 border-r border-slate-800 print:border-gray-300">DURUM</th>
                    {currentExam.questions.map((q) => (
                      <th key={q.questionNumber} className="p-1 w-10 border-r border-slate-800 print:border-gray-300" title={q.outcome}>
                        <div>S.{q.questionNumber}</div>
                        <div className="text-[8.5px] text-amber-300 font-normal print:text-gray-600">({q.maxScore}P)</div>
                      </th>
                    ))}
                    <th className="p-1.5 w-14 bg-purple-900 text-amber-300 border-l border-purple-800 print:bg-gray-200 print:text-gray-900">PUANI</th>
                    <th className="p-1 w-6 print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium print:divide-gray-300">
                  {currentExam.students.length === 0 ? (
                    <tr>
                      <td colSpan={currentExam.questionCount + 6} className="p-8 text-center text-gray-400">
                        Henüz öğrenci eklenmedi. Yukarıdaki <strong>"Sınıf Seç"</strong> seçeneğinden sınıfınızı yükleyebilirsiniz.
                      </td>
                    </tr>
                  ) : (
                    currentExam.students.map((st, idx) => {
                      const isPassed = st.totalScore >= 50;

                      return (
                        <tr key={st.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="p-1 text-center font-bold text-gray-500 bg-gray-50/50 border-r border-gray-100 print:bg-white print:border-gray-300">
                            {idx + 1}
                          </td>
                          <td className="p-0.5 border-r border-gray-100 print:border-gray-300">
                            <input
                              type="text"
                              value={st.studentNumber}
                              onChange={(e) => {
                                const updated = currentExam.students.map(s => s.id === st.id ? { ...s, studentNumber: e.target.value } : s);
                                handleUpdateExam({ students: updated });
                              }}
                              className="w-full text-center bg-transparent py-0.5 font-bold text-gray-700 outline-none focus:bg-white focus:ring-1 focus:ring-purple-400 rounded-md print:border-0"
                            />
                          </td>
                          <td className="p-0.5 border-r border-gray-100 print:border-gray-300">
                            <input
                              type="text"
                              value={st.studentName}
                              onChange={(e) => {
                                const updated = currentExam.students.map(s => s.id === st.id ? { ...s, studentName: e.target.value } : s);
                                handleUpdateExam({ students: updated });
                              }}
                              className="w-full bg-transparent px-1 py-0.5 font-black text-gray-900 outline-none focus:bg-white focus:ring-1 focus:ring-purple-400 rounded-md print:border-0"
                            />
                          </td>
                          <td className="p-0.5 text-center border-r border-gray-100 print:border-gray-300">
                            <select
                              value={st.status}
                              onChange={(e) => {
                                const updated = currentExam.students.map(s => s.id === st.id ? { ...s, status: e.target.value as any } : s);
                                handleUpdateExam({ students: updated });
                              }}
                              className="bg-transparent py-0.5 px-0.5 text-[10px] font-bold text-gray-700 outline-none cursor-pointer rounded-md border border-gray-200 print:border-0"
                            >
                              <option value="girdi">Girdi</option>
                              <option value="girmedi">Girmedi</option>
                              <option value="kopya">Kopya</option>
                            </select>
                          </td>

                          {/* Question Score Cells */}
                          {currentExam.questions.map((q) => {
                            const val = st.scores[q.questionNumber];
                            const isZero = val === 0;

                            return (
                              <td key={q.questionNumber} className="p-0.5 text-center border-r border-gray-100 print:border-gray-300">
                                <input
                                  type="number"
                                  disabled={st.status !== 'girdi'}
                                  min={0}
                                  max={q.maxScore}
                                  value={val !== undefined ? val : ''}
                                  onChange={(e) => handleScoreChange(st.id, q.questionNumber, e.target.value)}
                                  className={`w-9 text-center py-0.5 font-mono font-bold rounded outline-none transition-all ${
                                    isZero 
                                      ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                                      : val 
                                      ? 'bg-purple-50/60 text-purple-950 border border-purple-200' 
                                      : 'bg-gray-50 text-gray-400 border border-gray-200'
                                  } focus:bg-white focus:border-purple-500 print:border-0 print:bg-transparent`}
                                />
                              </td>
                            );
                          })}

                          {/* Total Score */}
                          <td className={`p-1 text-center font-mono font-black text-xs border-l border-gray-100 print:border-gray-300 ${
                            isPassed ? 'text-emerald-700 bg-emerald-50/60 print:bg-white' : 'text-rose-700 bg-rose-50/60 print:bg-white'
                          }`}>
                            {st.status === 'girdi' ? st.totalScore : st.status === 'girmedi' ? 'G' : 'K'}
                          </td>

                          {/* Delete Button (Web Only) */}
                          <td className="p-0.5 text-center print:hidden">
                            <button
                              onClick={() => handleDeleteStudentRow(st.id)}
                              className="p-1 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Öğrenciyi sil"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                {/* Table Footer with Summary Averages */}
                <tfoot className="bg-purple-950 text-white font-black text-center print:bg-gray-100 print:text-gray-900">
                  <tr>
                    <td colSpan={4} className="p-1.5 text-right pr-3 uppercase text-purple-200 print:text-gray-900 print:border-gray-300">
                      SORUDAN ALINAN ORTALAMA PUAN:
                    </td>
                    {stats.questionStats.map((q) => (
                      <td key={q.questionNumber} className="p-1.5 text-amber-300 font-mono text-xs border-r border-purple-900 print:border-gray-300 print:text-gray-900">
                        {q.qAvg.toFixed(1)}
                      </td>
                    ))}
                    <td className="p-1.5 text-amber-400 font-mono text-xs bg-purple-900 print:bg-gray-200 print:text-gray-900">
                      {stats.mean.toFixed(1)}
                    </td>
                    <td className="print:hidden"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* 5. OFFICIAL SIGNATURE SECTION (Yazdırma ve Rapor İmzaları)         */}
          {/* ------------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center text-xs font-bold text-gray-700 print:p-3 print:rounded-lg print-card">
            <div className="space-y-1">
              <div className="text-gray-400 uppercase text-[9px]">Ders Öğretmeni</div>
              <div className="font-black text-gray-900 text-sm print:text-xs">{currentExam.teacherName || 'Ders Öğretmeni'}</div>
              <div className="text-gray-400 text-[9px]">İmza: ...........................................</div>
            </div>

            <div className="space-y-1">
              <div className="text-gray-400 uppercase text-[9px]">Okul Müdürü</div>
              <div className="font-black text-gray-900 text-sm print:text-xs">{currentExam.principalName || 'Okul Müdürü'}</div>
              <div className="text-gray-400 text-[9px]">İmza / Mühür: ...........................................</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
