import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Plus, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown,
  ChevronRight,
  Sparkles,
  BarChart3,
  BookOpen,
  Target,
  CalendarDays,
  MessageSquare,
  Copy,
  Check,
  Printer,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Clock,
  Send,
  Zap,
  RefreshCw,
  Sliders,
  Flame,
  FileCheck,
  FileText
} from 'lucide-react';
import { PusulaStudentProfile, PusulaExam, PusulaPlanItem, PusulaCoachingNote, PusulaExamOutcome } from '../../types/pusula';
import { PusulaExamOutcomesTable } from './PusulaExamOutcomesTable';

interface PusulaExamsProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
  isOpenNewExamModal?: boolean;
  onCloseNewExamModal?: () => void;
  readOnly?: boolean;
  onOpenPdfModal?: (mode: 'okul' | 'sinif' | 'ogrenci') => void;
  classes?: Record<string, string[]>;
  allProfiles?: Record<string, PusulaStudentProfile>;
  activeClass?: string | null;
  activeSchoolId?: string;
  schoolInfo?: any;
}

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'] as const;

// Standard question counts per subject for each exam type
const EXAM_SUBJECT_MAX: Record<string, Record<string, number>> = {
  TYT: {
    'Türkçe': 40,
    'Temel Matematik': 40,
    'Fen Bilimleri': 20,
    'Sosyal Bilgiler': 20
  },
  AYT: {
    'Matematik': 40,
    'Fizik': 14,
    'Kimya': 13,
    'Biyoloji': 13,
    'Edebiyat': 24,
    'Tarih-1': 10,
    'Coğrafya-1': 6
  },
  LGS: {
    'Türkçe': 20,
    'Matematik': 20,
    'Fen Bilimleri': 20,
    'İnkılap Tarihi': 10,
    'İngilizce': 10,
    'Din Kültürü': 10
  },
  KPSS: {
    'Genel Yetenek (Türkçe-Mat)': 60,
    'Genel Kültür (Tarih-Coğrafya-Vatandaşlık)': 60
  },
  AGS: {
    'Sözel Yetenek': 30,
    'Sayısal Yetenek': 30,
    'Tarih': 15,
    'Türkiye Coğrafyası': 15,
    'Mevzuat': 10
  }
};

export const PusulaExams: React.FC<PusulaExamsProps> = ({
  profile,
  onUpdateProfile,
  isOpenNewExamModal = false,
  onCloseNewExamModal,
  readOnly = false,
  onOpenPdfModal,
  classes = {},
  allProfiles = {},
  activeClass = null,
  activeSchoolId = 'default',
  schoolInfo = null
}) => {
  const [showModal, setShowModal] = useState(isOpenNewExamModal);
  const [filterType, setFilterType] = useState<string>('Hepsi');

  // Active selected exam for the 5-Step Deep Diagnostic & Action Engine
  const [selectedExamId, setSelectedExamId] = useState<string | null>(() => {
    return profile.exams && profile.exams.length > 0 ? profile.exams[0].id : null;
  });

  // Active Step Tab inside the Diagnostic Engine (1 to 5)
  const [activeStepTab, setActiveStepTab] = useState<'step1' | 'step2' | 'step3' | 'step4' | 'step5'>('step1');

  // Form State for Adding/Editing Exam
  const [examType, setExamType] = useState<'TYT' | 'AYT' | 'LGS' | 'KPSS' | 'AGS'>('LGS');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [scoresInput, setScoresInput] = useState<Record<string, { d: string; y: string; net: string }>>({});
  const [mistakeTopicInput, setMistakeTopicInput] = useState('');
  const [selectedMistakes, setSelectedMistakes] = useState<string[]>([]);
  const [selectedSubjectForTopic, setSelectedSubjectForTopic] = useState<string>('Türkçe');
  const [subjectMistakesMap, setSubjectMistakesMap] = useState<Record<string, string[]>>({});

  // Manual Kazanım (Outcome) Builder State for New Exam Modal
  const [manualOutcomes, setManualOutcomes] = useState<PusulaExamOutcome[]>([]);
  const [outcomeSubject, setOutcomeSubject] = useState<string>('Türkçe');
  const [outcomeText, setOutcomeText] = useState<string>('');
  const [outcomeS, setOutcomeS] = useState<string>('2');
  const [outcomeD, setOutcomeD] = useState<string>('1');
  const [outcomeY, setOutcomeY] = useState<string>('1');

  // Expanded exam ID in the bottom "Tüm Kayıtlı Deneme Sınavları" table
  const [expandedTableExamId, setExpandedTableExamId] = useState<string | null>(null);

  // Feedback Tone State
  const [feedbackTone, setFeedbackTone] = useState<'motive' | 'discipline' | 'solution'>('motive');
  const [customFeedbackText, setCustomFeedbackText] = useState<string>('');
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [planAddedToast, setPlanAddedToast] = useState(false);
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Open modal if prop changes
  React.useEffect(() => {
    if (isOpenNewExamModal) setShowModal(true);
  }, [isOpenNewExamModal]);

  // Keep selected exam updated whenever a new exam is added/updated or student changes
  const firstExamId = profile.exams && profile.exams.length > 0 ? profile.exams[0].id : null;
  const prevFirstExamIdRef = React.useRef<string | null>(firstExamId);

  React.useEffect(() => {
    if (!profile.exams || profile.exams.length === 0) {
      if (selectedExamId !== null) setSelectedExamId(null);
      prevFirstExamIdRef.current = null;
      return;
    }
    const exists = profile.exams.some(e => e.id === selectedExamId);
    const firstChanged = firstExamId !== prevFirstExamIdRef.current;
    prevFirstExamIdRef.current = firstExamId;

    if (!selectedExamId || !exists || firstChanged) {
      setSelectedExamId(profile.exams[0].id);
    }
  }, [profile.exams, firstExamId, selectedExamId]);

  const handleClose = () => {
    setShowModal(false);
    if (onCloseNewExamModal) onCloseNewExamModal();
  };

  // Determine subjects based on examType
  const getSubjectsForType = (type: string) => {
    switch (type) {
      case 'TYT':
        return ['Türkçe', 'Sosyal Bilgiler', 'Temel Matematik', 'Fen Bilimleri'];
      case 'AYT':
        return ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Edebiyat', 'Tarih-1', 'Coğrafya-1'];
      case 'LGS':
        return ['Türkçe', 'Sosyal Bilgiler', 'Din K.ve A.B.', 'İngilizce', 'Matematik', 'Fen'];
      case 'KPSS':
        return ['Genel Yetenek (Türkçe-Mat)', 'Genel Kültür (Tarih-Coğrafya-Vatandaşlık)'];
      case 'AGS':
        return ['Sözel Yetenek', 'Sayısal Yetenek', 'Tarih', 'Türkiye Coğrafyası', 'Mevzuat'];
      default:
        return ['Türkçe', 'Matematik', 'Fen'];
    }
  };

  const currentSubjects = getSubjectsForType(examType);

  // Handle score change (Doğru / Yanlış / Net)
  const handleScoreChange = (sub: string, field: 'd' | 'y' | 'net', val: string) => {
    const existing = scoresInput[sub] || { d: '0', y: '0', net: '0' };
    const updated = { ...existing, [field]: val };

    if (field === 'd' || field === 'y') {
      const dVal = parseFloat(field === 'd' ? val : updated.d) || 0;
      const yVal = parseFloat(field === 'y' ? val : updated.y) || 0;
      const divisor = examType === 'LGS' ? 3 : 4;
      const calcNet = Math.max(0, dVal - (yVal / divisor));
      updated.net = calcNet.toFixed(2).replace(/\.00$/, '');
    }

    setScoresInput(prev => ({ ...prev, [sub]: updated }));
  };

  // Add mistake topic with subject tag
  const handleAddMistakeTopic = () => {
    const topic = mistakeTopicInput.trim();
    if (!topic) return;

    if (!selectedMistakes.includes(topic)) {
      setSelectedMistakes(prev => [...prev, topic]);
      setSubjectMistakesMap(prev => {
        const list = prev[selectedSubjectForTopic] || [];
        return {
          ...prev,
          [selectedSubjectForTopic]: [...list, topic]
        };
      });
    }
    setMistakeTopicInput('');
  };

  // Add a manual outcome row (S, D, Y, B%) in the New Exam Modal
  const handleAddManualOutcome = () => {
    const text = outcomeText.trim();
    if (!text) return;
    const s = Math.max(1, parseInt(outcomeS, 10) || 1);
    const d = Math.max(0, Math.min(s, parseInt(outcomeD, 10) || 0));
    const y = Math.max(0, Math.min(s - d, parseInt(outcomeY, 10) || 0));
    const empty = Math.max(0, s - (d + y));
    const bPct = s > 0 ? Math.round((d / s) * 100) : 0;

    const newOutcome: PusulaExamOutcome = {
      subject: outcomeSubject || currentSubjects[0] || 'Türkçe',
      outcome: text,
      totalQuestions: s,
      correct: d,
      wrong: y,
      empty,
      successPercent: bPct
    };

    setManualOutcomes(prev => [...prev, newOutcome]);
    setOutcomeText('');
  };

  // Save new exam with full 5-step analysis generated
  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim()) {
      alert('Lütfen deneme adını girin.');
      return;
    }

    const scoresMap: Record<string, number> = {};
    const detailedScoresMap: Record<string, { d: number; y: number; net: number }> = {};
    let total = 0;

    currentSubjects.forEach(sub => {
      const input = scoresInput[sub] || { d: '0', y: '0', net: '0' };
      const d = parseFloat(input.d) || 0;
      const y = parseFloat(input.y) || 0;
      const net = parseFloat(input.net) || 0;

      scoresMap[sub] = net;
      detailedScoresMap[sub] = { d, y, net };
      total += net;
    });

    const autoMistakesFromOutcomes = manualOutcomes
      .filter(o => o.successPercent < 60 || o.wrong > 0)
      .map(o => `${o.subject}: ${o.outcome}`);
    const combinedMistakes = Array.from(new Set([...selectedMistakes, ...autoMistakesFromOutcomes]));

    const newExamId = 'ex_' + Date.now();
    const newExam: PusulaExam = {
      id: newExamId,
      name: examName.trim(),
      date: examDate,
      type: examType,
      scores: scoresMap,
      detailedScores: detailedScoresMap,
      mistakeTopics: combinedMistakes,
      topicMistakesBySubject: subjectMistakesMap,
      outcomes: manualOutcomes.length > 0 ? manualOutcomes : undefined,
      totalNet: parseFloat(total.toFixed(2))
    };

    const updatedExams = [newExam, ...(profile.exams || [])];
    onUpdateProfile({ exams: updatedExams });

    // Set as active selected exam for the 5-step analysis view
    setSelectedExamId(newExamId);
    setActiveStepTab('step1');

    // Reset & Close
    setExamName('');
    setScoresInput({});
    setSelectedMistakes([]);
    setSubjectMistakesMap({});
    setManualOutcomes([]);
    handleClose();
  };

  // Delete Exam
  const handleDeleteExam = (id: string) => {
    if (confirm('Bu deneme sınavı kaydını silmek istediğinize emin misiniz?')) {
      const filtered = (profile.exams || []).filter(ex => ex.id !== id);
      onUpdateProfile({ exams: filtered });
      if (selectedExamId === id) {
        setSelectedExamId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  // Filtered exams list
  const filteredExams = (profile.exams || []).filter(ex => {
    if (filterType === 'Hepsi') return true;
    return ex.type === filterType;
  });

  // Calculate Net stats
  const totalNets = (profile.exams || []).map(ex => ex.totalNet);
  const maxNet = totalNets.length > 0 ? Math.max(...totalNets) : 0;
  const avgNet = totalNets.length > 0 ? (totalNets.reduce((a, b) => a + b, 0) / totalNets.length).toFixed(1) : '0';
  const latestNet = profile.exams?.[0]?.totalNet || 0;

  // Active Exam Object
  const activeExam = useMemo(() => {
    if (!profile.exams || profile.exams.length === 0) return null;
    return profile.exams.find(e => e.id === selectedExamId) || profile.exams[0];
  }, [profile.exams, selectedExamId]);

  // Index of active exam in array (for previous comparison)
  const activeExamIndex = useMemo(() => {
    if (!profile.exams || !activeExam) return -1;
    return profile.exams.findIndex(e => e.id === activeExam.id);
  }, [profile.exams, activeExam]);

  const previousExam = useMemo(() => {
    if (!profile.exams || activeExamIndex === -1 || activeExamIndex >= profile.exams.length - 1) return null;
    return profile.exams[activeExamIndex + 1];
  }, [profile.exams, activeExamIndex]);

  // ---------------------------------------------------------------------------
  // 5-STEP EVALUATION ENGINE COMPUTATIONS
  // ---------------------------------------------------------------------------

  // STEP 1: NET ANALİZİ
  const step1NetAnalysis = useMemo(() => {
    if (!activeExam) return null;

    const netChange = previousExam ? activeExam.totalNet - previousExam.totalNet : 0;
    const maxScores: Record<string, number> = {
      ...(EXAM_SUBJECT_MAX[activeExam.type] || {}),
      'Fen': 20,
      'Sosyal Bilgiler': 10,
      'SOSYAL BİLGİLER': 10,
      'Tarih': 10,
      'Din K.ve A.B.': 10,
      'Din Kültürü': 10
    };

    // Subject breakdown
    const subjectList = Object.entries(activeExam.scores || {}).map(([subject, net]) => {
      const detailed = activeExam.detailedScores?.[subject] as { d: number; y: number; b?: number; net: number } | undefined;
      const detailedSum = detailed && typeof detailed.b === 'number' ? (detailed.d + detailed.y + detailed.b) : 0;
      // Also check if outcomes exist for this subject to get exact question count
      const outcomeSum = (activeExam.outcomes || [])
        .filter(o => o.subject.toLocaleLowerCase('tr-TR') === subject.toLocaleLowerCase('tr-TR'))
        .reduce((acc, o) => acc + (o.totalQuestions || 0), 0);
      const maxQ = detailedSum > 0 ? detailedSum : (outcomeSum > 0 ? outcomeSum : (maxScores[subject] || 20));
      const d = detailed?.d ?? net;
      const y = detailed?.y ?? 0;
      const b = detailed?.b !== undefined ? detailed.b : Math.max(0, maxQ - (d + y));
      const successRate = maxQ > 0 ? Math.round((net / maxQ) * 100) : 0;
      const penaltyLost = detailed ? (detailed.y / (activeExam.type === 'LGS' ? 3 : 4)) : 0;

      return {
        subject,
        net,
        d,
        y,
        b,
        maxQ,
        successRate: Math.max(0, Math.min(100, successRate)),
        penaltyLost: Math.round(penaltyLost * 10) / 10
      };
    });

    const totalMaxExamQuestions = subjectList.length > 0
      ? subjectList.reduce((acc, s) => acc + s.maxQ, 0)
      : (activeExam.type === 'LGS' ? 90 : 120);
    const totalD = subjectList.reduce((acc, s) => acc + s.d, 0);
    const totalY = subjectList.reduce((acc, s) => acc + s.y, 0);
    const totalB = subjectList.reduce((acc, s) => acc + s.b, 0);
    const overallSuccessPercent = totalMaxExamQuestions > 0
      ? Math.max(0, Math.min(100, Math.round((activeExam.totalNet / totalMaxExamQuestions) * 100)))
      : 0;

    return {
      totalNet: activeExam.totalNet,
      netChange,
      totalMaxExamQuestions,
      totalD,
      totalY,
      totalB,
      overallSuccessPercent,
      subjectList
    };
  }, [activeExam, previousExam]);

  // STEP 2: KONU ANALİZİ
  const step2TopicAnalysis = useMemo(() => {
    if (!activeExam) return { topics: [], bySubject: {} };

    const topics = activeExam.mistakeTopics || [];
    const bySubject = activeExam.topicMistakesBySubject || {};

    // Group topics by subject
    const subjectTopicMap: Record<string, string[]> = { ...bySubject };
    
    // If there are unmapped topics, assign them cleanly
    topics.forEach(t => {
      let found = false;
      for (const [sub, tList] of Object.entries(subjectTopicMap)) {
        if (tList.includes(t)) {
          found = true;
          break;
        }
      }
      if (!found) {
        const defaultSub = Object.keys(activeExam.scores || {})[0] || 'Genel';
        subjectTopicMap[defaultSub] = [...(subjectTopicMap[defaultSub] || []), t];
      }
    });

    return {
      topics,
      bySubject: subjectTopicMap
    };
  }, [activeExam]);

  // STEP 3: ZAYIF ALAN TESPİTİ (Priority & Risk Matrix)
  const step3WeakAreas = useMemo(() => {
    if (!activeExam || !step1NetAnalysis) return { critical: [], moderate: [], strong: [] };

    const critical: Array<{ title: string; subject: string; reason: string; severity: 'critical' }> = [];
    const moderate: Array<{ title: string; subject: string; reason: string; severity: 'moderate' }> = [];
    const strong: Array<{ title: string; subject: string; net: number }> = [];

    // Analyze subjects
    step1NetAnalysis.subjectList.forEach(sub => {
      if (sub.successRate < 45) {
        critical.push({
          title: `${sub.subject} Dersi Genel Net Kaybı`,
          subject: sub.subject,
          reason: `Başarı oranı %${sub.successRate} (${sub.net}/${sub.maxQ} Net, D:${sub.d} Y:${sub.y}). Temel kavram ve konu tekrarı gerektiriyor.`,
          severity: 'critical'
        });
      } else if (sub.successRate < 70) {
        moderate.push({
          title: `${sub.subject} Dersi Pekiştirme Alanı`,
          subject: sub.subject,
          reason: `Başarı oranı %${sub.successRate} (${sub.net}/${sub.maxQ} Net, D:${sub.d} Y:${sub.y}). Soru bankası ve hız denemesiyle güçlendirilmeli.`,
          severity: 'moderate'
        });
      } else {
        strong.push({
          title: sub.subject,
          subject: sub.subject,
          net: sub.net
        });
      }
    });

    // Analyze official outcomes (kazanımlar) from PDF karne if available
    if (activeExam.outcomes && activeExam.outcomes.length > 0) {
      activeExam.outcomes.forEach(o => {
        if (o.successPercent < 50) {
          critical.push({
            title: `[${o.subject}] ${o.outcome}`,
            subject: o.subject,
            reason: `Kazanım Başarısı: %${o.successPercent} (S:${o.totalQuestions} • D:${o.correct} • Y:${o.wrong}). Acil konu tekrarı ve kazanım testi çözülmeli.`,
            severity: 'critical'
          });
        } else if (o.successPercent < 100) {
          moderate.push({
            title: `[${o.subject}] ${o.outcome}`,
            subject: o.subject,
            reason: `Kazanım Başarısı: %${o.successPercent} (S:${o.totalQuestions} • D:${o.correct} • Y:${o.wrong}). Pekiştirme sorusu çözülmeli.`,
            severity: 'moderate'
          });
        }
      });
    } else {
      // Fallback: Add mistake topics as critical/moderate
      (activeExam.mistakeTopics || []).forEach(topic => {
        critical.push({
          title: topic,
          subject: 'Hata Yapılan Konu',
          reason: 'Denemede yanlış / boş bırakılan kritik konu. Bu hafta soru çözümü planlanmalıdır.',
          severity: 'critical'
        });
      });
    }

    return { critical, moderate, strong };
  }, [activeExam, step1NetAnalysis]);

  // STEP 4: ÇALIŞMA PLANI ÜRET (Generated Remediation Tasks)
  const defaultGeneratedPlanTasks: PusulaPlanItem[] = useMemo(() => {
    if (!activeExam) return [];

    const tasks: PusulaPlanItem[] = [];
    const weakOutcomes = (activeExam.outcomes || []).filter(o => o.successPercent < 60);
    const topics = activeExam.mistakeTopics || [];
    const weakSubjects = step1NetAnalysis?.subjectList.filter(s => s.successRate < 60) || [];

    // Assign tasks across the days
    let dayIdx = 0;

    if (weakOutcomes.length > 0) {
      weakOutcomes.slice(0, 10).forEach((o, idx) => {
        const day = DAYS[dayIdx % DAYS.length];
        dayIdx++;
        tasks.push({
          id: `plan-gen-outcome-${activeExam.id}-${idx}`,
          day,
          subject: o.subject,
          topic: `${o.outcome} (Kazanım Telafisi)`,
          targetCount: o.successPercent === 0 ? 40 : 25,
          type: 'study',
          completed: false,
          notes: `${activeExam.name} kazanım analizi: S:${o.totalQuestions} D:${o.correct} Y:${o.wrong} (B%:${o.successPercent})`
        });
      });
    } else {
      // 1. Topic-specific remediation tasks
      topics.forEach((topic, idx) => {
        const day = DAYS[dayIdx % DAYS.length];
        dayIdx++;
        tasks.push({
          id: `plan-gen-topic-${activeExam.id}-${idx}`,
          day,
          subject: 'Eksik Konu Telafisi',
          topic: `${topic} - Konu Tekrarı ve Soru Çözümü`,
          targetCount: 35,
          type: 'study',
          completed: false,
          notes: `${activeExam.name} denemesinde tespit edilen zayıf alan telafisi.`
        });
      });
    }

    // 2. Subject-level boost tasks
    weakSubjects.forEach((sub, idx) => {
      const day = DAYS[dayIdx % DAYS.length];
      dayIdx++;
      tasks.push({
        id: `plan-gen-sub-${activeExam.id}-${idx}`,
        day,
        subject: sub.subject,
        topic: `${sub.subject} - Soru Bankası Tarama`,
        targetCount: 40,
        type: 'study',
        completed: false,
        notes: `Net hedefi: %${sub.successRate} → %75 seviyesine çıkarma.`
      });
    });

    // 3. Routine reinforcement
    if (tasks.length < 5) {
      tasks.push({
        id: `plan-gen-routine-${activeExam.id}-1`,
        day: 'Çarşamba',
        subject: 'Günlük Rutin',
        topic: 'Paragraf & Problem Çözümü',
        targetCount: 30,
        type: 'routine',
        completed: false
      });
      tasks.push({
        id: `plan-gen-routine-${activeExam.id}-2`,
        day: 'Cumartesi',
        subject: weakSubjects[0]?.subject || 'Matematik',
        topic: `${weakSubjects[0]?.subject || 'Matematik'} Branş Denemesi + Yanlış Analizi`,
        targetCount: 40,
        type: 'exam',
        completed: false
      });
    }

    return tasks;
  }, [activeExam, step1NetAnalysis]);

  // Editable state for generated study plan tasks so teachers can customize Ders, Konu, Soru Sayısı, Gün
  const [editablePlanTasks, setEditablePlanTasks] = useState<PusulaPlanItem[]>([]);

  React.useEffect(() => {
    setEditablePlanTasks(defaultGeneratedPlanTasks);
  }, [defaultGeneratedPlanTasks]);

  const handleUpdateGeneratedTask = (id: string, patch: Partial<PusulaPlanItem>) => {
    setEditablePlanTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const handleDeleteGeneratedTask = (id: string) => {
    setEditablePlanTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddCustomGeneratedTask = () => {
    const nextDay = DAYS[editablePlanTasks.length % DAYS.length];
    const defaultSub = step1NetAnalysis?.subjectList?.[0]?.subject || 'Türkçe';
    const newTask: PusulaPlanItem = {
      id: `plan-gen-custom-${Date.now()}`,
      day: nextDay,
      subject: defaultSub,
      topic: `${defaultSub} Konu Tekrarı ve Soru Çözümü`,
      targetCount: 30,
      type: 'study',
      completed: false,
      notes: 'Öğretmen tarafından eklendi'
    };
    setEditablePlanTasks(prev => [...prev, newTask]);
  };

  const handleResetGeneratedTasks = () => {
    setEditablePlanTasks(defaultGeneratedPlanTasks);
  };

  // STEP 5: ÖĞRENCİYE GERİ BİLDİRİM YAZ
  const generatedFeedback = useMemo(() => {
    if (!activeExam || !step1NetAnalysis) return '';

    const studentName = profile.studentName || 'Öğrencimiz';
    const examTitle = activeExam.name;
    const net = activeExam.totalNet;
    const strongList = step3WeakAreas.strong.map(s => s.subject).join(', ') || 'belirli derslerdeki';
    const weakList = activeExam.mistakeTopics && activeExam.mistakeTopics.length > 0 
      ? activeExam.mistakeTopics.slice(0, 3).join(', ') 
      : (step3WeakAreas.critical[0]?.title || 'bazı kritik soru tiplerinde');

    if (feedbackTone === 'motive') {
      return `Sevgili ${studentName},\n\n` +
        `Tebrikler! ${examTitle} denemesinde elde ettiğin ${net} Net ile çalışmalarının karşılığını almaya devam ediyorsun. ` +
        `Özellikle ${strongList} derslerindeki başarın ve disiplinli yaklaşımın çok sevindirici.\n\n` +
        `Bu denemede belirlediğimiz ${weakList} konularındaki eksiklerini bu hafta hazırladığımız telafi programıyla tamamlayacağız. ` +
        `Kendine güven, potansiyelin çok yüksek ve her geçen hafta hedefine bir adım daha yaklaşıyorsun! 🚀`;
    } else if (feedbackTone === 'discipline') {
      return `Sayın ${studentName},\n\n` +
        `${examTitle} deneme sınavı sonuçların incelenmiştir. Toplam netin: ${net} Net.\n` +
        `Analiz sonucunda ${strongList} derslerinde hedeflenen performans yakalanmış olsa da, ` +
        `${weakList} konularında soru kayıpları tespit edilmiştir.\n\n` +
        `Hedefine ulaşabilmek için bu haftaki çalışma planında yer alan eksik konu tekrarlarını ve günlük soru hedeflerini eksiksiz tamamlaman kritik önem taşımaktadır. Disiplini elden bırakmıyoruz.`;
    } else {
      return `Sevgili ${studentName},\n\n` +
        `${examTitle} Deneme Analiz Özeti ve Eylem Planı:\n` +
        `• Mevcut Net: ${net} Net\n` +
        `• Güçlü Alanlar: ${strongList}\n` +
        `• Telafi Edilecek Öncelikli Konular: ${weakList}\n\n` +
        `Bu hafta odaklanacağımız 3 ana adım:\n` +
        `1. ${weakList} konularında video/özet tekrarı yapmak.\n` +
        `2. Haftalık plana eklenen hedef soruları çözüp yapamadığın soruların çözümünü öğrenmek.\n` +
        `3. Hafta sonu yapılacak branş denemesiyle net artışını teyit etmek. Başarılar dilerim! ✨`;
    }
  }, [activeExam, step1NetAnalysis, step3WeakAreas, profile.studentName, feedbackTone]);

  // Apply custom text or generated
  const currentFeedback = customFeedbackText || generatedFeedback;

  // Add generated tasks to student's weekly plan
  const handleApplyTasksToWeeklyPlan = () => {
    if (editablePlanTasks.length === 0) return;
    const existingPlan = profile.weeklyPlan || [];
    const tasksToTransfer = editablePlanTasks.map((t, idx) => ({
      ...t,
      id: `plan-transfer-${Date.now()}-${idx}`
    }));
    const mergedPlan = [...existingPlan, ...tasksToTransfer];
    onUpdateProfile({ weeklyPlan: mergedPlan });
    setPlanAddedToast(true);
    setTimeout(() => setPlanAddedToast(false), 3000);
  };

  // Save feedback as coaching note
  const handleSaveFeedbackAsCoachingNote = () => {
    if (!activeExam) return;

    const newNote: PusulaCoachingNote = {
      id: `note-exam-${activeExam.id}-${Date.now()}`,
      date: activeExam.date || new Date().toISOString().split('T')[0],
      title: `${activeExam.name} (${activeExam.type}) - Deneme Analizi & Geri Bildirim`,
      sessionType: 'Deneme Değerlendirmesi',
      summary: currentFeedback,
      actionItems: editablePlanTasks.map(t => `${t.day} (${t.subject}): ${t.topic} (${t.targetCount || 0} Soru)`)
    };

    const updatedNotes = [newNote, ...(profile.coachingNotes || [])];
    onUpdateProfile({ coachingNotes: updatedNotes });
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 3000);
  };

  // Copy feedback to clipboard
  const handleCopyFeedback = () => {
    navigator.clipboard.writeText(currentFeedback);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  // Print diagnostic report
  const handlePrintDiagnostic = () => {
    window.print();
  };

  // Add a specific weak outcome from exam analysis to student's weekly study plan
  const handlePlanOutcome = (outcome: PusulaExamOutcome) => {
    const nextDay = DAYS[Math.floor(Math.random() * 5)];
    const newTask: PusulaPlanItem = {
      id: `task-outcome-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      day: nextDay,
      subject: outcome.subject,
      topic: outcome.outcome,
      resource: 'Kazanım Pekiştirme & Soru Bankası',
      targetCount: outcome.successPercent < 40 ? 40 : 25,
      targetMinutes: 45,
      completed: false,
      type: 'study',
      notes: `Deneme Analizinden: %${outcome.successPercent} başarı (D:${outcome.correct}, Y:${outcome.wrong}). Eksik konu telafisi.`
    };
    const existingPlan = profile.weeklyPlan || [];
    onUpdateProfile({ weeklyPlan: [...existingPlan, newTask] });
    setPlanAddedToast(true);
    setTimeout(() => setPlanAddedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* TOP KPI STATS SUMMARY CARDS                                         */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kayıtlı Deneme</span>
          <div className="text-2xl font-black text-gray-900">{profile.exams?.length || 0} Adet</div>
          <p className="text-xs text-purple-600 font-semibold">Tüm denemeler kayıt altında</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">En Yüksek Net</span>
          <div className="text-2xl font-black text-emerald-600">{maxNet} Net</div>
          <p className="text-xs text-gray-500 font-medium">Kişisel en iyi performans</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ortalama Net</span>
          <div className="text-2xl font-black text-blue-600">{avgNet} Net</div>
          <p className="text-xs text-gray-500 font-medium">Genel sınav net ortalaması</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Son Deneme Neti</span>
          <div className="text-2xl font-black text-purple-700">{latestNet} Net</div>
          <p className="text-xs text-gray-500 font-medium">{profile.exams?.[0]?.date || '-'}</p>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 5-AŞAMALI AKILLI DENEME DEĞERLENDİRME & ÇALIŞMA PLANI MOTORU       */}
      {/* ------------------------------------------------------------------- */}
      {activeExam && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200/80 shadow-md space-y-6 animate-in fade-in duration-300">
          {/* Engine Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-200">
                    {activeExam.type}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{activeExam.date}</span>
                  {activeExam.outcomes && activeExam.outcomes.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Target size={12} className="text-emerald-700" />
                      {activeExam.outcomes.length} Ders Kazanım Detayı Mevcut
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  {activeExam.name}
                </h2>

                {/* Official Exam Document Ranks & Score from Result Document */}
                {(activeExam.score || activeExam.rankInSchool || activeExam.rankInClass || activeExam.rankGeneral) && (
                  <div className="flex items-center gap-2 flex-wrap pt-2 text-xs">
                    {activeExam.score !== undefined && activeExam.score > 0 && (
                      <span className="font-black text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                        Puan: <strong>{activeExam.score}</strong>
                      </span>
                    )}
                    {activeExam.rankInClass && (
                      <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-200">
                        Snf: <strong>{activeExam.rankInClass}</strong>
                      </span>
                    )}
                    {activeExam.rankInSchool && (
                      <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-200">
                        Kurum: <strong>{activeExam.rankInSchool}</strong>
                      </span>
                    )}
                    {activeExam.rankInDistrict && (
                      <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-200">
                        İlçe: <strong>{activeExam.rankInDistrict}</strong>
                      </span>
                    )}
                    {activeExam.rankInProvince && (
                      <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-200">
                        İl: <strong>{activeExam.rankInProvince}</strong>
                      </span>
                    )}
                    {activeExam.rankGeneral && (
                      <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-200">
                        Genel: <strong>{activeExam.rankGeneral}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions for Active Exam */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handlePrintDiagnostic}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Deneme Raporunu Yazdır / PDF Al"
              >
                <Printer size={15} /> Yazdır
              </button>

              {!readOnly && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus size={15} /> Yeni Deneme
                </button>
              )}
            </div>
          </div>

          {/* 5-Step Process Tab Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-purple-50/70 p-1.5 rounded-2xl border border-purple-100">
            <button
              onClick={() => setActiveStepTab('step1')}
              className={`p-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeStepTab === 'step1' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-purple-900 hover:bg-purple-100/80'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>Net Analizi</span>
            </button>

            <button
              onClick={() => setActiveStepTab('step2')}
              className={`p-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeStepTab === 'step2' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-purple-900 hover:bg-purple-100/80'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>Kazanım &amp; Konu Analizi</span>
            </button>

            <button
              onClick={() => setActiveStepTab('step3')}
              className={`p-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeStepTab === 'step3' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-purple-900 hover:bg-purple-100/80'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>Zayıf Alan Tespiti</span>
            </button>

            <button
              onClick={() => setActiveStepTab('step4')}
              className={`p-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeStepTab === 'step4' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-purple-900 hover:bg-purple-100/80'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">4</span>
              <span>Çalışma Planı Üret</span>
            </button>

            <button
              onClick={() => setActiveStepTab('step5')}
              className={`p-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeStepTab === 'step5' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-purple-900 hover:bg-purple-100/80'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">5</span>
              <span>Öğrenci Geri Bildirimi</span>
            </button>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* STEP 1: NET ANALİZİ & DERSLERE GÖRE KAZANIM ANALİZİ VIEW          */}
          {/* ----------------------------------------------------------------- */}
          {activeStepTab === 'step1' && step1NetAnalysis && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Highlights bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 space-y-1">
                  <div className="text-xs font-bold text-purple-700 uppercase">Toplam Sınav Neti</div>
                  <div className="text-3xl font-black text-purple-950">
                    {step1NetAnalysis.totalNet} <span className="text-sm font-bold text-purple-600">/ {step1NetAnalysis.totalMaxExamQuestions}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-purple-800">
                    Toplam: {step1NetAnalysis.totalD} Doğru • {step1NetAnalysis.totalY} Yanlış • Başarı: %{step1NetAnalysis.overallSuccessPercent}
                  </div>
                </div>

                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <div className="text-xs font-bold text-emerald-700 uppercase">Önceki Denemeye Göre Değişim</div>
                  <div className="text-3xl font-black text-emerald-950 flex items-center gap-2">
                    {step1NetAnalysis.netChange >= 0 ? (
                      <>
                        <ArrowUpRight className="text-emerald-600" size={28} />
                        +{step1NetAnalysis.netChange.toFixed(2)} Net
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="text-rose-600" size={28} />
                        {step1NetAnalysis.netChange.toFixed(2)} Net
                      </>
                    )}
                  </div>
                  <div className="text-[11px] font-semibold text-gray-500">
                    {previousExam ? `Önceki: ${previousExam.name} (${previousExam.totalNet} Net)` : 'İlk kayıtlı deneme'}
                  </div>
                </div>

                <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 space-y-1">
                  <div className="text-xs font-bold text-blue-700 uppercase">Hedefe Kalan Net</div>
                  <div className="text-3xl font-black text-blue-950">
                    {profile.targetScoreOrNet ? profile.targetScoreOrNet : 'Hedef Belirlenmedi'}
                  </div>
                  <div className="text-[11px] font-semibold text-blue-800">
                    Öğrenci Hedefi: {profile.targetSchool || 'Belirlenmedi'}
                  </div>
                </div>
              </div>

              {/* Official SONUÇ BELGESİ Subject Summary Table + Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Official SONUÇ BELGESİ Ders Tablosu (Ders | Soru | Doğru | Yanlış | Net | Başarı %) */}
                <div className={`${activeExam.outcomes && activeExam.outcomes.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
                  <div className="border-2 border-gray-800 rounded-xl overflow-hidden bg-white shadow-xs">
                    <div className="bg-gray-100 border-b-2 border-gray-800 py-2 px-4 flex items-center justify-between">
                      <span className="text-xs font-black tracking-wider text-gray-900 uppercase">
                        SONUÇ BELGESİ — DERS BAZLI NET TABLOSU
                      </span>
                      <span className="text-[11px] font-bold text-purple-800">
                        {activeExam.type}
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b-2 border-gray-800 bg-gray-50 text-gray-900 font-black text-[11px]">
                            <th className="py-2 px-3 border-r border-gray-300">Ders</th>
                            <th className="py-2 px-2 text-center border-r border-gray-300">Soru</th>
                            <th className="py-2 px-2 text-center border-r border-gray-300 text-emerald-800">Doğru</th>
                            <th className="py-2 px-2 text-center border-r border-gray-300 text-rose-700">Yanlış</th>
                            <th className="py-2 px-2 text-center border-r border-gray-300 text-purple-900">Net</th>
                            <th className="py-2 px-2 text-center">Başarı %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          {step1NetAnalysis.subjectList.map((sub, idx) => (
                            <tr key={sub.subject} className={idx % 2 === 0 ? 'bg-gray-200/60' : 'bg-white'}>
                              <td className="py-2 px-3 font-bold text-gray-900 border-r border-gray-300">
                                {sub.subject}
                              </td>
                              <td className="py-2 px-2 text-center font-bold text-gray-900 border-r border-gray-300 tabular-nums">
                                {sub.maxQ}
                              </td>
                              <td className="py-2 px-2 text-center font-bold text-emerald-800 border-r border-gray-300 tabular-nums">
                                {sub.d}
                              </td>
                              <td className="py-2 px-2 text-center font-bold text-rose-700 border-r border-gray-300 tabular-nums">
                                {sub.y}
                              </td>
                              <td className="py-2 px-2 text-center font-black text-purple-950 border-r border-gray-300 tabular-nums">
                                {Number(sub.net).toFixed(2).replace('.', ',')}
                              </td>
                              <td className="py-2 px-2 text-center font-black text-gray-900 tabular-nums">
                                {sub.successRate}
                              </td>
                            </tr>
                          ))}
                          {/* Toplam Row */}
                          <tr className="border-t-2 border-gray-800 bg-gray-100 font-black text-gray-950">
                            <td className="py-2.5 px-3 text-right border-r border-gray-300 uppercase">
                              Toplam:
                            </td>
                            <td className="py-2.5 px-2 text-center border-r border-gray-300 tabular-nums">
                              {step1NetAnalysis.totalMaxExamQuestions}
                            </td>
                            <td className="py-2.5 px-2 text-center text-emerald-800 border-r border-gray-300 tabular-nums">
                              {step1NetAnalysis.totalD}
                            </td>
                            <td className="py-2.5 px-2 text-center text-rose-700 border-r border-gray-300 tabular-nums">
                              {step1NetAnalysis.totalY}
                            </td>
                            <td className="py-2.5 px-2 text-center text-purple-950 border-r border-gray-300 tabular-nums">
                              {Number(step1NetAnalysis.totalNet).toFixed(2).replace('.', ',')}
                            </td>
                            <td className="py-2.5 px-2 text-center tabular-nums">
                              {step1NetAnalysis.overallSuccessPercent}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Subject Breakdown Visual Progress Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step1NetAnalysis.subjectList.map(sub => (
                      <div key={sub.subject} className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-gray-900 truncate">{sub.subject}</span>
                          <span className="font-black text-xs text-purple-900 bg-purple-100 px-2 py-0.5 rounded-lg">
                            {sub.net} Net
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              sub.successRate >= 65 ? 'bg-emerald-500' : sub.successRate >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${sub.successRate}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-600">
                          <span>S: <b>{sub.maxQ}</b></span>
                          <span>D: <b className="text-emerald-700">{sub.d}</b></span>
                          <span>Y: <b className="text-rose-700">{sub.y}</b></span>
                          <span>B%: <b>%{sub.successRate}</b></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Official DERSLERE GÖRE ANALİZ (Kazanım S / D / Y / B%) directly visible on Step 1! */}
                {activeExam.outcomes && activeExam.outcomes.length > 0 && (
                  <div className="lg:col-span-7">
                    <PusulaExamOutcomesTable 
                      outcomes={activeExam.outcomes}
                      onAddToWeeklyPlan={!readOnly ? handlePlanOutcome : undefined}
                      readOnly={readOnly}
                      title="DERSLERE GÖRE ANALİZ (Kazanım Detayları)"
                      showSummaryCards={true}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* STEP 2: KAZANIM & KONU ANALİZİ VIEW (DERSLERE GÖRE ANALİZ)        */}
          {/* ----------------------------------------------------------------- */}
          {activeStepTab === 'step2' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* If official Kazanım Analysis (outcomes) exists */}
              {activeExam.outcomes && activeExam.outcomes.length > 0 ? (
                <div className="space-y-6">
                  <PusulaExamOutcomesTable 
                    outcomes={activeExam.outcomes}
                    onAddToWeeklyPlan={!readOnly ? handlePlanOutcome : undefined}
                    readOnly={readOnly}
                    title="DERSLERE GÖRE KAZANIM ANALİZİ"
                    showSummaryCards={true}
                  />

                  {/* Supplementary Topic Mistakes if available */}
                  {step2TopicAnalysis.topics.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle size={15} className="text-amber-600" />
                        Ek Tespit Edilen Kritik Yanlış Konular
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(step2TopicAnalysis.bySubject).map(([sub, topics]) => {
                          if (!topics || topics.length === 0) return null;
                          return (
                            <div key={sub} className="bg-amber-50/40 p-3.5 rounded-2xl border border-amber-200/80 space-y-2">
                              <span className="text-xs font-black text-purple-900">{sub}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {topics.map((t, idx) => (
                                  <span key={idx} className="text-xs px-2.5 py-1 rounded-xl bg-white text-amber-900 border border-amber-200 font-bold">
                                    ⚠️ {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-black text-amber-950">Denemede Kayıp Yaşanan ve Boş Bırakılan Konular</h4>
                        <p className="text-xs text-amber-800 mt-0.5">
                          Bu deneme sınavı için soru bazlı ders kazanım analizi (S, D, Y, B%) henüz eklenmemiş.
                        </p>
                      </div>
                    </div>
                    {onOpenPdfModal && !readOnly && (
                      <button
                        onClick={() => onOpenPdfModal('ogrenci')}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText size={14} /> PDF Karne Yükle &amp; Kazanımları Çıkar
                      </button>
                    )}
                  </div>

                  {step2TopicAnalysis.topics.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
                      <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                      <div className="font-bold text-gray-700">Bu denemede özel bir eksik konu girilmedi.</div>
                      <p className="text-xs text-gray-400">PDF karne yükleyerek ders kazanım detaylarını otomatik aktarabilirsiniz.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {Object.entries(step2TopicAnalysis.bySubject).map(([sub, topics]) => {
                        if (!topics || topics.length === 0) return null;
                        return (
                          <div key={sub} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                              <span className="text-xs font-black text-purple-900">{sub}</span>
                              <span className="text-[10px] font-bold text-gray-400">{topics.length} Konu</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {topics.map((t, idx) => (
                                <span key={idx} className="text-xs px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold flex items-center gap-1.5">
                                  <span>⚠️</span> {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* STEP 3: ZAYIF ALAN TESPİTİ VIEW (Risk & Priority Matrix)          */}
          {/* ----------------------------------------------------------------- */}
          {activeStepTab === 'step3' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Critical Alarm Column */}
                <div className="bg-rose-50/70 p-5 rounded-3xl border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame size={16} className="text-rose-600" />
                      Kritik Zayıf Alanlar (Öncelik 1)
                    </span>
                    <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-800 text-xs font-black flex items-center justify-center">
                      {step3WeakAreas.critical.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-700">Acil konu tekrarı ve telafi soru çözümü gerektiren başlıklar.</p>

                  <div className="space-y-2 pt-1 max-h-96 overflow-y-auto pr-1">
                    {step3WeakAreas.critical.length === 0 ? (
                      <div className="text-xs text-gray-400 italic p-3 bg-white/70 rounded-xl">Kritik zayıf alan tespit edilmedi.</div>
                    ) : (
                      step3WeakAreas.critical.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200/80 shadow-2xs space-y-1">
                          <div className="text-xs font-black text-rose-950">{item.title}</div>
                          <div className="text-[11px] text-gray-600">{item.reason}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Moderate Review Column */}
                <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap size={16} className="text-amber-600" />
                      Pekiştirme Alanları (Öncelik 2)
                    </span>
                    <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 text-xs font-black flex items-center justify-center">
                      {step3WeakAreas.moderate.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-700">Temeli olan ancak pratik ve hız denemesi gereken konular.</p>

                  <div className="space-y-2 pt-1 max-h-96 overflow-y-auto pr-1">
                    {step3WeakAreas.moderate.length === 0 ? (
                      <div className="text-xs text-gray-400 italic p-3 bg-white/70 rounded-xl">Orta seviye alan bulunmuyor.</div>
                    ) : (
                      step3WeakAreas.moderate.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                          <div className="text-xs font-black text-amber-950">{item.title}</div>
                          <div className="text-[11px] text-gray-600">{item.reason}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Strong Mastery Column */}
                <div className="bg-emerald-50/70 p-5 rounded-3xl border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      Güçlü Alanlar &amp; Sağlam Kaleler
                    </span>
                    <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 text-xs font-black flex items-center justify-center">
                      {step3WeakAreas.strong.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700">Yüksek başarı sağlanan ve net getiren güvenilir dersler.</p>

                  <div className="space-y-2 pt-1">
                    {step3WeakAreas.strong.length === 0 ? (
                      <div className="text-xs text-gray-400 italic p-3 bg-white/70 rounded-xl">Güçlü alan kaydı henüz oluşmadı.</div>
                    ) : (
                      step3WeakAreas.strong.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs space-y-1 flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-950">{item.subject}</span>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {item.net} Net
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* STEP 4: ÇALIŞMA PLANI ÜRET VIEW                                   */}
          {/* ----------------------------------------------------------------- */}
          {activeStepTab === 'step4' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 bg-purple-50/90 p-4 rounded-2xl border border-purple-200">
                <div>
                  <h4 className="text-sm font-black text-purple-950 flex items-center gap-2">
                    <CalendarDays size={18} className="text-purple-600" />
                    Bu Denemenin Eksiklerine Özel Üretilen Telafi Çalışma Planı
                  </h4>
                  <p className="text-xs text-purple-700 mt-0.5">
                    {readOnly
                      ? 'Deneme analizi sonuçlarına göre otomatik oluşturulan haftalık telafi görevleri.'
                      : 'Deneme analizine göre üretilen görevlerin ders, konu/kazanım ve soru sayılarını doğrudan kart üzerinden güncelleyip haftalık plana aktarabilirsiniz.'}
                  </p>
                </div>

                {!readOnly && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleResetGeneratedTasks}
                      className="px-3 py-2 bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Otomatik üretilen varsayılan görevlere sıfırla"
                    >
                      <RefreshCw size={14} />
                      Sıfırla
                    </button>
                    <button
                      type="button"
                      onClick={handleAddCustomGeneratedTask}
                      className="px-3.5 py-2 bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus size={15} />
                      Görev Ekle
                    </button>
                    <button
                      type="button"
                      onClick={handleApplyTasksToWeeklyPlan}
                      disabled={editablePlanTasks.length === 0}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Zap size={16} />
                      ⚡ Haftalık Plana Aktar ({editablePlanTasks.length} Görev)
                    </button>
                  </div>
                )}
              </div>

              {planAddedToast && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 size={16} /> Güncellenen görevler öğrencinin Haftalık Çalışma Planı çizelgesine başarıyla aktarıldı!
                </div>
              )}

              {/* Datalist for quick subject suggestions while allowing any custom subject name */}
              <datalist id="pusula-plan-subjects-list">
                {Array.from(
                  new Set([
                    ...(step1NetAnalysis?.subjectList.map(s => s.subject) || []),
                    'Türkçe',
                    'Matematik',
                    'Fen Bilimleri',
                    'Sosyal Bilgiler',
                    'İnkılap Tarihi',
                    'İngilizce',
                    'Din Kültürü ve Ahlak Bilgisi',
                    'Paragraf & Rutin',
                    'Branş Denemesi',
                    'Genel Tekrar'
                  ])
                ).map(subName => (
                  <option key={subName} value={subName} />
                ))}
              </datalist>

              {/* Generated & Editable Task List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {editablePlanTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3 hover:border-purple-300 transition-colors flex flex-col justify-between"
                  >
                    {!readOnly ? (
                      <>
                        {/* Top Bar: Day Selector + Question Count Editor + Delete */}
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
                          <select
                            value={task.day}
                            onChange={(e) => handleUpdateGeneratedTask(task.id, { day: e.target.value as any })}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-200 outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                            title="Günü Değiştir"
                          >
                            {DAYS.map(d => (
                              <option key={d} value={d}>
                                {d.toLocaleUpperCase('tr-TR')}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1.5">
                            <div
                              className="flex items-center gap-1 bg-purple-50/90 border border-purple-200 rounded-xl px-2 py-1"
                              title="Hedef soru sayısını güncelle"
                            >
                              <span className="text-xs">🎯</span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateGeneratedTask(task.id, {
                                    targetCount: Math.max(0, (task.targetCount || 0) - 5)
                                  })
                                }
                                className="w-5 h-5 rounded-md bg-white hover:bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center border border-purple-200/80 cursor-pointer"
                                title="5 Soru Azalt"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min={0}
                                max={500}
                                step={5}
                                value={task.targetCount ?? 0}
                                onChange={(e) =>
                                  handleUpdateGeneratedTask(task.id, {
                                    targetCount: Math.max(0, parseInt(e.target.value, 10) || 0)
                                  })
                                }
                                className="w-12 text-center font-black text-xs text-purple-950 bg-white border border-purple-200 rounded-md py-0.5 outline-none focus:border-purple-500"
                              />
                              <span className="text-[11px] font-extrabold text-purple-900">Soru</span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateGeneratedTask(task.id, {
                                    targetCount: (task.targetCount || 0) + 5
                                  })
                                }
                                className="w-5 h-5 rounded-md bg-white hover:bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center border border-purple-200/80 cursor-pointer"
                                title="5 Soru Artır"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteGeneratedTask(task.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Bu görevi listeden kaldır"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Editable Subject (Ders) */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Ders Adı
                          </label>
                          <input
                            type="text"
                            list="pusula-plan-subjects-list"
                            value={task.subject}
                            onChange={(e) => handleUpdateGeneratedTask(task.id, { subject: e.target.value })}
                            placeholder="Ders seçin veya yazın (Örn: Türkçe)"
                            className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-3 py-1.5 text-xs font-extrabold text-purple-900 outline-none transition-all"
                          />
                        </div>

                        {/* Editable Topic / Outcome (Konu / Kazanım) */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Konu / Kazanım &amp; Çalışma İçeriği
                          </label>
                          <textarea
                            rows={2}
                            value={task.topic}
                            onChange={(e) => handleUpdateGeneratedTask(task.id, { topic: e.target.value })}
                            placeholder="Konu veya kazanım açıklaması girin..."
                            className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 leading-snug outline-none resize-none transition-all"
                          />
                        </div>

                        {task.notes && (
                          <div className="text-[11px] text-gray-500 italic pt-1 border-t border-gray-100">
                            {task.notes}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-100 text-purple-800">
                              {task.day}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-700">
                              {task.subject}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-gray-500">
                            🎯 {task.targetCount} Soru
                          </span>
                        </div>
                        <div className="text-xs font-black text-gray-900">{task.topic}</div>
                        {task.notes && (
                          <div className="text-[11px] text-gray-500 italic">{task.notes}</div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* STEP 5: ÖĞRENCİYE GERİ BİLDİRİM YAZ VIEW                          */}
          {/* ----------------------------------------------------------------- */}
          {activeStepTab === 'step5' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                    <MessageSquare size={18} className="text-purple-600" />
                    Kişiselleştirilmiş Öğrenci &amp; Veli Koçluk Geri Bildirimi
                  </h4>
                  <p className="text-xs text-gray-400">
                    Deneme sonuçlarına ve telafi planına göre otomatik hazırlanan motivasyon ve değerlendirme metni.
                  </p>
                </div>

                {/* Tone Selectors */}
                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => {
                      setFeedbackTone('motive');
                      setCustomFeedbackText('');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      feedbackTone === 'motive' ? 'bg-white text-purple-900 shadow-xs font-black' : 'text-gray-600'
                    }`}
                  >
                    ✨ Motive Edici
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackTone('discipline');
                      setCustomFeedbackText('');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      feedbackTone === 'discipline' ? 'bg-white text-purple-900 shadow-xs font-black' : 'text-gray-600'
                    }`}
                  >
                    🎯 Hedef Odaklı
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackTone('solution');
                      setCustomFeedbackText('');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      feedbackTone === 'solution' ? 'bg-white text-purple-900 shadow-xs font-black' : 'text-gray-600'
                    }`}
                  >
                    🛠️ Telafi Planı
                  </button>
                </div>
              </div>

              {/* Feedback Editor Textarea */}
              <div className="space-y-2">
                <textarea
                  rows={7}
                  value={currentFeedback}
                  onChange={(e) => setCustomFeedbackText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs font-medium text-gray-800 leading-relaxed outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {/* Action Buttons: Copy, Save Note, WhatsApp */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyFeedback}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedFeedback ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    {copiedFeedback ? 'Kopyalandı!' : 'Metni Kopyala'}
                  </button>

                  {!readOnly && (
                    <button
                      onClick={handleSaveFeedbackAsCoachingNote}
                      className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileCheck size={16} className="text-purple-600" />
                      💾 Koçluk Notlarına Kaydet
                    </button>
                  )}
                </div>

                {noteSavedToast && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 size={15} /> Koçluk görüşme notu olarak eklendi!
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* REGISTERED MOCK EXAMS TABLE                                         */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Award size={22} className="text-purple-600" />
              Tüm Kayıtlı Deneme Sınavları
            </h3>
            <p className="text-xs font-semibold text-gray-400">
              Kayıtlı denemeleri, ders kazanım analizlerini (S, D, Y, B%) inceleyin ve yeni netler ekleyin.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {!readOnly && (
              <div className="flex items-center gap-2">
                {onOpenPdfModal && (
                  <button 
                    onClick={() => onOpenPdfModal('ogrenci')}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
                    title="PDF formatındaki deneme sınavı veya karne belgesini yükleyin"
                  >
                    <FileText size={16} className="text-purple-600" />
                    PDF Karne / Deneme Yükle
                  </button>
                )}
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
                >
                  <Plus size={16} />
                  Yeni Deneme Ekle
                </button>
              </div>
            )}
          </div>
        </div>

        {filteredExams.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
            <Award size={40} className="mx-auto text-gray-300" />
            <h4 className="font-bold text-gray-700">Kayıtlı Deneme Sınavı Bulunamadı</h4>
            <p className="text-xs text-gray-400">
              {readOnly 
                ? 'Öğretmeniniz deneme sınavı sonuçlarınızı girdiğinde 5 aşamalı ayrıntılı analiz burada görüntülenecektir.' 
                : 'Öğrencinin çözdüğü ilk deneme sınavının sonuçlarını ekleyerek veya PDF karne yükleyerek 5 aşamalı analizi başlatın.'}
            </p>
            {!readOnly && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-md inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  + Deneme Ekle
                </button>
                {onOpenPdfModal && (
                  <button 
                    onClick={() => onOpenPdfModal('okul')}
                    className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold cursor-pointer inline-flex items-center gap-2"
                  >
                    <FileText size={16} className="text-purple-600" />
                    📄 PDF Karne / Deneme Yükle
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-black text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Deneme Sınavı</th>
                  <th className="pb-3">Tarih</th>
                  <th className="pb-3">Ders Netleri (D / Y / Net)</th>
                  <th className="pb-3">Kazanım &amp; Eksik Analizi</th>
                  <th className="pb-3 text-right">Toplam Net</th>
                  <th className="pb-3 text-center">İşlem &amp; Analiz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExams.map(ex => {
                  const isSelected = selectedExamId === ex.id;
                  const hasOutcomes = Boolean(ex.outcomes && ex.outcomes.length > 0);
                  const isExpanded = expandedTableExamId === ex.id || (expandedTableExamId === null && isSelected && hasOutcomes);

                  return (
                    <React.Fragment key={ex.id}>
                      <tr 
                        className={`transition-colors cursor-pointer ${isSelected ? 'bg-purple-50/60' : 'hover:bg-gray-50/80'}`}
                        onClick={() => {
                          setSelectedExamId(ex.id);
                          setExpandedTableExamId(prev => prev === ex.id ? null : ex.id);
                        }}
                      >
                        <td className="py-4 pl-2 font-bold text-gray-900">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-50 text-purple-800 border border-purple-200">
                              {ex.type}
                            </span>
                            <span className="text-sm">{ex.name}</span>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-purple-600 text-white">
                                Seçili
                              </span>
                            )}
                            {hasOutcomes && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <Target size={11} className="text-emerald-700" /> {ex.outcomes!.length} Kazanım (S/D/Y/B%)
                              </span>
                            )}
                          </div>
                          {ex.score !== undefined && ex.score > 0 && (
                            <div className="text-[10px] font-semibold text-gray-500 mt-0.5">
                              Puan: <b className="text-purple-900">{ex.score}</b>
                              {ex.rankInClass && ` • Sınıf Sırası: ${ex.rankInClass}`}
                              {ex.rankInSchool && ` • Kurum Sırası: ${ex.rankInSchool}`}
                            </div>
                          )}
                        </td>
                        <td className="py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                          {ex.date}
                        </td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-1.5 max-w-md">
                            {Object.entries(ex.scores || {}).map(([sub, score]) => {
                              const det = ex.detailedScores?.[sub];
                              return (
                                <span key={sub} className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 font-semibold border border-gray-200/60">
                                  {sub}: <b className="text-purple-900 font-black">{score}</b>
                                  {det && (
                                    <span className="text-[10px] text-gray-500 ml-1">
                                      ({det.d}D/{det.y}Y)
                                    </span>
                                  )}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-4">
                          {hasOutcomes ? (
                            <div className="space-y-1">
                              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                                <CheckCircle2 size={11} /> Derslere Göre Kazanım Analizi Mevcut
                              </span>
                              <div className="text-[10px] text-gray-500 font-semibold">
                                Toplam {ex.outcomes!.reduce((a, b) => a + (b.totalQuestions || 0), 0)} Soru • {ex.outcomes!.filter(o => o.successPercent < 50).length} Telafi Kazanımı
                              </div>
                            </div>
                          ) : ex.mistakeTopics && ex.mistakeTopics.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {ex.mistakeTopics.map(m => (
                                <span key={m} className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                                  {m}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Eksik konu belirtilmedi</span>
                          )}
                        </td>
                        <td className="py-4 text-right whitespace-nowrap">
                          <span className="inline-block px-3 py-1 rounded-xl bg-purple-50 text-purple-800 font-black text-base border border-purple-200">
                            {ex.totalNet} <span className="text-xs font-bold text-purple-600">Net</span>
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            {hasOutcomes && (
                              <button
                                onClick={() => {
                                  setSelectedExamId(ex.id);
                                  setExpandedTableExamId(prev => prev === ex.id ? '__closed__' : ex.id);
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                                  isExpanded
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                                }`}
                                title="Derslerin kazanımlarına göre soru, doğru, yanlış analizini göster/gizle"
                              >
                                <Target size={13} />
                                {isExpanded ? 'Kazanımları Gizle' : 'Kazanım Detayı'}
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedExamId(ex.id);
                                setActiveStepTab('step1');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <Sparkles size={13} /> Analiz
                            </button>
                            {!readOnly && (
                              <button 
                                onClick={() => handleDeleteExam(ex.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                                title="Denemeyi Sil"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Row: Official DERSLERE GÖRE ANALİZ (S / D / Y / B%) directly inside the student's exam result row */}
                      {hasOutcomes && isExpanded && (
                        <tr className="bg-slate-50/70">
                          <td colSpan={6} className="p-4 sm:p-6 border-b-2 border-purple-100">
                            <PusulaExamOutcomesTable
                              outcomes={ex.outcomes!}
                              onAddToWeeklyPlan={!readOnly ? handlePlanOutcome : undefined}
                              readOnly={readOnly}
                              title={`${ex.name} — DERSLERE GÖRE ANALİZ (Kazanım Soru, Doğru, Yanlış ve Başarı %)`}
                              showSummaryCards={true}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* ŞUBE ANALİZİ & ŞUBE KARNESİ (Önceki Sınava Göre Kıyaslamalı)         */}
      {/* ------------------------------------------------------------------- */}
      <PusulaBranchReportSection
        profile={profile}
        classes={classes}
        allProfiles={allProfiles}
        activeClass={activeClass || profile.className}
        activeSchoolId={activeSchoolId}
        schoolInfo={schoolInfo}
        readOnly={readOnly}
      />

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: YENİ DENEME EKLE                                             */}
      {/* ------------------------------------------------------------------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Award size={22} className="text-purple-600" />
                  Yeni Deneme Sınavı, Net ve Kazanım Girişi
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  Deneme netlerini ve varsa ders kazanımlarına göre soru/doğru/yanlış (S, D, Y, B%) detaylarını ekleyin.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onOpenPdfModal && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onOpenPdfModal('ogrenci');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText size={14} className="text-purple-600" /> PDF Karne Yükle
                  </button>
                )}
                <button 
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-5">
              {/* Type, Name, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Sınav Türü</label>
                  <select 
                    value={examType}
                    onChange={(e) => {
                      const nextType = e.target.value as any;
                      setExamType(nextType);
                      setScoresInput({});
                      const subs = getSubjectsForType(nextType);
                      setOutcomeSubject(subs[0] || 'Türkçe');
                    }}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                  >
                    <option value="LGS">LGS (Ortaokul 5-6-7-8)</option>
                    <option value="TYT">TYT</option>
                    <option value="AYT">AYT</option>
                    <option value="KPSS">KPSS</option>
                    <option value="AGS">AGS</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Deneme Adı / Yayın</label>
                  <input 
                    type="text"
                    required
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="Örn: BH-6. SINIF(DEVLET)-SDS-1"
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Sınav Tarihi</label>
                <input 
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full sm:w-60 bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              {/* Subject scores grid */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wider">
                  Ders Netleri (Doğru - Yanlış / {examType === 'LGS' ? '3' : '4'})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {currentSubjects.map(sub => {
                    const current = scoresInput[sub] || { d: '', y: '', net: '' };
                    return (
                      <div key={sub} className="bg-white p-3 rounded-xl border border-gray-100 space-y-1.5 shadow-2xs">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-800">{sub}</span>
                          <span className="text-xs font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                            {current.net || '0'} Net
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Doğru (D)"
                            value={current.d}
                            onChange={(e) => handleScoreChange(sub, 'd', e.target.value)}
                            className="bg-gray-50 border border-gray-200 p-1.5 rounded-lg text-xs font-semibold outline-none text-center"
                          />
                          <input 
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Yanlış (Y)"
                            value={current.y}
                            onChange={(e) => handleScoreChange(sub, 'y', e.target.value)}
                            className="bg-gray-50 border border-gray-200 p-1.5 rounded-lg text-xs font-semibold outline-none text-center"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DERSLERE GÖRE ANALİZ (Kazanım Bazlı S / D / Y / B%) Builder */}
              <div className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Target size={15} className="text-purple-600" />
                      DERSLERE GÖRE ANALİZ — Kazanım Detayları Ekle (S / D / Y / B%)
                    </label>
                    <p className="text-[11px] text-gray-500">
                      İsterseniz derslerin kazanımlarına göre soru sayısı (S), doğru (D) ve yanlış (Y) sayılarını buradan ekleyebilirsiniz.
                    </p>
                  </div>
                  {manualOutcomes.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black">
                      {manualOutcomes.length} Kazanım Eklendi
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-gray-600">Ders</label>
                    <select
                      value={outcomeSubject}
                      onChange={(e) => setOutcomeSubject(e.target.value)}
                      className="w-full bg-white border border-gray-200 p-2 rounded-xl text-xs font-bold outline-none"
                    >
                      {currentSubjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-gray-600">Kazanım / Konu Açıklaması</label>
                    <input
                      type="text"
                      value={outcomeText}
                      onChange={(e) => setOutcomeText(e.target.value)}
                      placeholder="Örn: Metnin yüzey anlamını belirleyebilme"
                      className="w-full bg-white border border-gray-200 p-2 rounded-xl text-xs font-semibold outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="sm:col-span-1 space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 text-center block">Soru (S)</label>
                    <input
                      type="number"
                      min="1"
                      value={outcomeS}
                      onChange={(e) => setOutcomeS(e.target.value)}
                      className="w-full bg-white border border-gray-200 p-2 rounded-xl text-xs font-bold text-center outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1 space-y-1">
                    <label className="text-[10px] font-bold text-emerald-700 text-center block">Doğru (D)</label>
                    <input
                      type="number"
                      min="0"
                      value={outcomeD}
                      onChange={(e) => setOutcomeD(e.target.value)}
                      className="w-full bg-white border border-gray-200 p-2 rounded-xl text-xs font-bold text-emerald-700 text-center outline-none"
                    />
                  </div>
                  <div className="sm:col-span-1 space-y-1">
                    <label className="text-[10px] font-bold text-rose-700 text-center block">Yanlış (Y)</label>
                    <input
                      type="number"
                      min="0"
                      value={outcomeY}
                      onChange={(e) => setOutcomeY(e.target.value)}
                      className="w-full bg-white border border-gray-200 p-2 rounded-xl text-xs font-bold text-rose-700 text-center outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddManualOutcome}
                      className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                    >
                      + Kazanım Ekle
                    </button>
                  </div>
                </div>

                {manualOutcomes.length > 0 && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 font-black text-[10px] text-gray-600 uppercase">
                        <tr>
                          <th className="py-1.5 px-2.5">Ders</th>
                          <th className="py-1.5 px-2.5">Kazanım</th>
                          <th className="py-1.5 px-2 text-center">S</th>
                          <th className="py-1.5 px-2 text-center text-emerald-700">D</th>
                          <th className="py-1.5 px-2 text-center text-rose-700">Y</th>
                          <th className="py-1.5 px-2 text-center">B%</th>
                          <th className="py-1.5 px-2 text-center">Sil</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {manualOutcomes.map((item, i) => (
                          <tr key={i}>
                            <td className="py-1.5 px-2.5 font-bold text-purple-900">{item.subject}</td>
                            <td className="py-1.5 px-2.5 text-gray-800">{item.outcome}</td>
                            <td className="py-1.5 px-2 text-center font-bold">{item.totalQuestions}</td>
                            <td className="py-1.5 px-2 text-center font-bold text-emerald-700">{item.correct}</td>
                            <td className="py-1.5 px-2 text-center font-bold text-rose-700">{item.wrong}</td>
                            <td className="py-1.5 px-2 text-center font-black">%{item.successPercent}</td>
                            <td className="py-1.5 px-2 text-center">
                              <button
                                type="button"
                                onClick={() => setManualOutcomes(prev => prev.filter((_, idx) => idx !== i))}
                                className="text-gray-400 hover:text-rose-600 font-black cursor-pointer"
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Mistake Topics Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">
                  Bu Sınavda Hata Yapılan / Boş Bırakılan Ek Konular (Opsiyonel)
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedSubjectForTopic}
                    onChange={(e) => setSelectedSubjectForTopic(e.target.value)}
                    className="w-36 bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                  >
                    {currentSubjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <input 
                    type="text"
                    value={mistakeTopicInput}
                    onChange={(e) => setMistakeTopicInput(e.target.value)}
                    placeholder="Örn: Paragrafta Anlam, Fonksiyonlar, Optik..."
                    className="flex-1 bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-semibold outline-none focus:border-purple-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddMistakeTopic();
                      }
                    }}
                  />
                  <button 
                    type="button"
                    onClick={handleAddMistakeTopic}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Ekle
                  </button>
                </div>

                {selectedMistakes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedMistakes.map((m, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                        {m}
                        <button 
                          type="button" 
                          onClick={() => setSelectedMistakes(selectedMistakes.filter((_, i) => i !== idx))}
                          className="hover:text-red-600 font-black cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Vazgeç
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Kaydet ve Analizi Başlat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ŞUBE ANALİZİ & ŞUBE KARNESİ BİLEŞENİ
// ============================================================================
interface PusulaBranchReportSectionProps {
  profile: PusulaStudentProfile;
  classes: Record<string, string[]>;
  allProfiles: Record<string, PusulaStudentProfile>;
  activeClass?: string | null;
  activeSchoolId?: string;
  schoolInfo?: any;
  readOnly?: boolean;
}

const LGS_BRANCH_COLUMNS = [
  { key: 'tur', groupLabel: 'Sözel (TÜR)', title: 'Türkçe', matchKeys: ['türkçe', 'turkce', 'tür', 'tur'] },
  { key: 'sos', groupLabel: 'Sözel (SOS)', title: 'SOSYAL BİLGİLER', matchKeys: ['sosyal', 'inkılap', 'inkilap', 'tarih', 'sos'] },
  { key: 'din', groupLabel: 'Sözel (DİN)', title: 'Din K.ve A.B.', matchKeys: ['din', 'dkab'] },
  { key: 'ing', groupLabel: 'Sözel (İNG)', title: 'İngilizce', matchKeys: ['ingilizce', 'yabancı', 'ing'] },
  { key: 'mat', groupLabel: 'Sayısal (MAT)', title: 'Matematik', matchKeys: ['matematik', 'mat'] },
  { key: 'fen', groupLabel: 'Sayısal (FEN)', title: 'Fen', matchKeys: ['fen'] }
];

const normalizeBranchStr = (str: string) =>
  (str || '')
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/Ğ/g, 'g')
    .replace(/ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/ş/g, 's')
    .replace(/Ö/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/Ç/g, 'c')
    .replace(/ç/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();

const formatTrDecimal = (val: number | undefined | null, digits = 2): string => {
  if (val === undefined || val === null || Number.isNaN(val)) return '0,00';
  return Number(val).toFixed(digits).replace('.', ',');
};

const getSubjectNetFromExam = (exam: PusulaExam, colKey: string, matchKeys: string[]): number => {
  const scores = exam.scores || {};
  for (const [subName, netVal] of Object.entries(scores)) {
    const low = subName.toLocaleLowerCase('tr-TR');
    if (matchKeys.some(mk => low.includes(mk))) {
      return Number(netVal || 0);
    }
  }
  return 0;
};

const estimateLgsScore = (exam: PusulaExam): number => {
  if (exam.score && Number(exam.score) > 0) return Number(exam.score);
  // Standart yaklaşık LGS puan hesaplama (baz 194.7 + ders katsayıları)
  const tur = getSubjectNetFromExam(exam, 'tur', LGS_BRANCH_COLUMNS[0].matchKeys);
  const sos = getSubjectNetFromExam(exam, 'sos', LGS_BRANCH_COLUMNS[1].matchKeys);
  const din = getSubjectNetFromExam(exam, 'din', LGS_BRANCH_COLUMNS[2].matchKeys);
  const ing = getSubjectNetFromExam(exam, 'ing', LGS_BRANCH_COLUMNS[3].matchKeys);
  const mat = getSubjectNetFromExam(exam, 'mat', LGS_BRANCH_COLUMNS[4].matchKeys);
  const fen = getSubjectNetFromExam(exam, 'fen', LGS_BRANCH_COLUMNS[5].matchKeys);
  const raw = 194.75 + tur * 4.34 + mat * 4.25 + fen * 4.12 + sos * 1.66 + din * 1.89 + ing * 1.5;
  return Math.max(100, Math.min(500, Number(raw.toFixed(3))));
};

const PusulaBranchReportSection: React.FC<PusulaBranchReportSectionProps> = ({
  profile,
  classes,
  allProfiles,
  activeClass,
  activeSchoolId = 'default',
  schoolInfo,
  readOnly = false
}) => {
  // Mevcut tüm şubeleri topla
  const branchList = useMemo(() => {
    const map = new Map<string, string>();
    Object.keys(classes || {}).forEach(c => {
      const n = normalizeBranchStr(c);
      if (n && !map.has(n)) map.set(n, c);
    });
    Object.values(allProfiles || {}).forEach(p => {
      if (p?.className) {
        const n = normalizeBranchStr(p.className);
        if (n && !map.has(n)) map.set(n, p.className);
      }
    });
    if (profile?.className) {
      const n = normalizeBranchStr(profile.className);
      if (n && !map.has(n)) map.set(n, profile.className);
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'tr-TR', { numeric: true }));
  }, [classes, allProfiles, profile?.className]);

  const [selectedBranch, setSelectedBranch] = useState<string>(() => {
    const init = activeClass || profile?.className || branchList[0] || '6-A';
    const matched = branchList.find(b => normalizeBranchStr(b) === normalizeBranchStr(init));
    return matched || init;
  });

  React.useEffect(() => {
    if (activeClass) {
      const matched = branchList.find(b => normalizeBranchStr(b) === normalizeBranchStr(activeClass));
      if (matched) setSelectedBranch(matched);
    }
  }, [activeClass, branchList]);

  // Tüm profilleri tekil öğrenci bazında birleştir
  const mergedProfilesList = useMemo(() => {
    const byStudent = new Map<string, PusulaStudentProfile>();
    const addProf = (p: PusulaStudentProfile | null | undefined) => {
      if (!p || !p.studentName) return;
      const cleanName = p.studentName.replace(/^\d+\s*[-–.]+\s*/, '').trim();
      const key = `${normalizeBranchStr(p.className || '')}_${normalizeBranchStr(cleanName)}`;
      const existing = byStudent.get(key);
      if (!existing) {
        byStudent.set(key, p);
      } else {
        const examMap = new Map<string, PusulaExam>();
        (existing.exams || []).forEach(e => { if (e) examMap.set(e.name, e); });
        (p.exams || []).forEach(e => { if (e) examMap.set(e.name, e); });
        byStudent.set(key, { ...existing, ...p, exams: Array.from(examMap.values()) });
      }
    };
    Object.values(allProfiles || {}).forEach(addProf);
    addProf(profile);
    return Array.from(byStudent.values());
  }, [allProfiles, profile]);

  // Okuldaki tüm sınav isimlerini (kronolojik / en son eklenen ilk) listele
  const allExamNames = useMemo(() => {
    const examMetaMap = new Map<string, { name: string; date: string; count: number }>();
    mergedProfilesList.forEach(p => {
      (p.exams || []).forEach(ex => {
        if (!ex?.name) return;
        const cur = examMetaMap.get(ex.name);
        if (!cur) {
          examMetaMap.set(ex.name, { name: ex.name, date: ex.date || '', count: 1 });
        } else {
          cur.count += 1;
          if (ex.date && (!cur.date || ex.date > cur.date)) cur.date = ex.date;
        }
      });
    });
    return Array.from(examMetaMap.values())
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .map(x => x.name);
  }, [mergedProfilesList]);

  const [selectedExamName, setSelectedExamName] = useState<string>(() => allExamNames[0] || '');
  const [compareExamName, setCompareExamName] = useState<string>(() => allExamNames[1] || '');
  const [isEditingBenchmarks, setIsEditingBenchmarks] = useState(false);

  React.useEffect(() => {
    if (allExamNames.length > 0 && (!selectedExamName || !allExamNames.includes(selectedExamName))) {
      setSelectedExamName(allExamNames[0]);
      setCompareExamName(allExamNames[1] || '');
    }
  }, [allExamNames, selectedExamName]);

  // Seçili sınav değiştiğinde otomatik bir önceki sınavı kıyaslama olarak seç
  const handleSelectActiveExam = (examName: string) => {
    setSelectedExamName(examName);
    const idx = allExamNames.indexOf(examName);
    if (idx >= 0 && idx + 1 < allExamNames.length) {
      setCompareExamName(allExamNames[idx + 1]);
    } else if (allExamNames.length > 1) {
      const other = allExamNames.find(n => n !== examName) || '';
      setCompareExamName(other);
    }
  };

  // İlçe / İl / Genel karşılaştırma verileri (kullanıcı düzenleyebilir, localStorage'da saklanır)
  const benchmarkStorageKey = `pusula_branch_benchmarks_${activeSchoolId}`;
  const [customBenchmarks, setCustomBenchmarks] = useState<Record<string, any>>(() => {
    try {
      const raw = localStorage.getItem(benchmarkStorageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const saveBenchmarkOverride = (examName: string, data: any) => {
    const next = { ...customBenchmarks, [examName]: data };
    setCustomBenchmarks(next);
    try {
      localStorage.setItem(benchmarkStorageKey, JSON.stringify(next));
    } catch {}
  };

  // Verilen bir sınav adı için tüm şubelerin ortalamalarını ve okul ortalamasını hesapla
  const computeExamBranchStats = (targetExamName: string) => {
    if (!targetExamName) return null;

    type BranchAgg = {
      branchName: string;
      studentCount: number;
      subjects: Record<string, number>;
      totalNet: number;
      score: number;
      maxDistrictTotal?: number;
      maxProvinceTotal?: number;
      maxGeneralTotal?: number;
    };

    const byBranch = new Map<string, PusulaExam[]>();
    const allSchoolExams: PusulaExam[] = [];

    mergedProfilesList.forEach(p => {
      const ex = (p.exams || []).find(e => e.name === targetExamName);
      if (!ex) return;
      const bKey = normalizeBranchStr(p.className || 'Genel');
      const list = byBranch.get(bKey) || [];
      list.push(ex);
      byBranch.set(bKey, list);
      allSchoolExams.push(ex);
    });

    const calcAverageForList = (bName: string, list: PusulaExam[]): BranchAgg => {
      const count = list.length;
      if (count === 0) {
        return {
          branchName: bName,
          studentCount: 0,
          subjects: { tur: 0, sos: 0, din: 0, ing: 0, mat: 0, fen: 0 },
          totalNet: 0,
          score: 0
        };
      }
      const sums: Record<string, number> = { tur: 0, sos: 0, din: 0, ing: 0, mat: 0, fen: 0 };
      let totalNetSum = 0;
      let scoreSum = 0;
      let maxDist = 0;
      let maxProv = 0;
      let maxGen = 0;

      list.forEach(e => {
        LGS_BRANCH_COLUMNS.forEach(col => {
          sums[col.key] += getSubjectNetFromExam(e, col.key, col.matchKeys);
        });
        totalNetSum += Number(e.totalNet || 0);
        scoreSum += estimateLgsScore(e);
        if (e.rankInDistrict) {
          const m = String(e.rankInDistrict).match(/\/\s*(\d+)/);
          if (m) maxDist = Math.max(maxDist, parseInt(m[1]));
        }
        if (e.rankInProvince) {
          const m = String(e.rankInProvince).match(/\/\s*(\d+)/);
          if (m) maxProv = Math.max(maxProv, parseInt(m[1]));
        }
        if (e.rankGeneral) {
          const m = String(e.rankGeneral).match(/\/\s*(\d+)/);
          if (m) maxGen = Math.max(maxGen, parseInt(m[1]));
        }
      });

      const avgs: Record<string, number> = {};
      LGS_BRANCH_COLUMNS.forEach(col => {
        avgs[col.key] = Number((sums[col.key] / count).toFixed(2));
      });

      return {
        branchName: bName,
        studentCount: count,
        subjects: avgs,
        totalNet: Number((totalNetSum / count).toFixed(2)),
        score: Number((scoreSum / count).toFixed(3)),
        maxDistrictTotal: maxDist || count,
        maxProvinceTotal: maxProv || count,
        maxGeneralTotal: maxGen || count
      };
    };

    const normSelBranch = normalizeBranchStr(selectedBranch);
    const branchExams = byBranch.get(normSelBranch) || [];
    const selectedBranchAgg = calcAverageForList(selectedBranch, branchExams);
    const schoolAgg = calcAverageForList('Okul', allSchoolExams);

    // Şubenin okul içi sıralamasını her ders ve toplam net için hesapla
    const allBranchAggs: BranchAgg[] = [];
    byBranch.forEach((exList, normKey) => {
      if (exList.length > 0) {
        allBranchAggs.push(calcAverageForList(normKey, exList));
      }
    });

    const getRankInSchool = (metricGetter: (b: BranchAgg) => number): number => {
      if (allBranchAggs.length <= 1) return 1;
      const sorted = [...allBranchAggs].sort((a, b) => metricGetter(b) - metricGetter(a));
      const idx = sorted.findIndex(x => normalizeBranchStr(x.branchName) === normSelBranch);
      return idx >= 0 ? idx + 1 : 1;
    };

    const schoolRanks: Record<string, number> = {};
    LGS_BRANCH_COLUMNS.forEach(col => {
      schoolRanks[col.key] = getRankInSchool(b => b.subjects[col.key] || 0);
    });
    schoolRanks.totalNet = getRankInSchool(b => b.totalNet);
    schoolRanks.score = getRankInSchool(b => b.score);

    return {
      selectedBranchAgg,
      schoolAgg,
      schoolRanks,
      totalBranchesInSchool: Math.max(1, allBranchAggs.length)
    };
  };

  const currentStats = useMemo(
    () => computeExamBranchStats(selectedExamName),
    [selectedExamName, selectedBranch, mergedProfilesList]
  );

  const previousStats = useMemo(
    () => (compareExamName ? computeExamBranchStats(compareExamName) : null),
    [compareExamName, selectedBranch, mergedProfilesList]
  );

  const activeBenchmark = customBenchmarks[selectedExamName] || null;

  // Okul il/ilçe/kurum başlık bilgileri
  const provinceName = (activeBenchmark?.province || schoolInfo?.province || schoolInfo?.city || 'BOLU').toLocaleUpperCase('tr-TR');
  const districtName = (activeBenchmark?.district || schoolInfo?.district || 'GÖYNÜK').toLocaleUpperCase('tr-TR');
  const schoolTitle = (schoolInfo?.name || 'GÖYNÜK İMAM HATİP ORTAOKULU').toLocaleUpperCase('tr-TR');
  const displayBranchTitle = (selectedBranch || '6-A').replace('_', '-').toLocaleUpperCase('tr-TR');

  const handlePrintBranchReport = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
      {/* Üst Başlık ve Filtre Kontrolleri */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-[11px] font-black uppercase tracking-widest mb-1.5">
            <BarChart3 size={13} className="text-purple-600" />
            ŞUBE ANALİZİ &amp; KARŞILAŞTIRMALI ŞUBE KARNESİ
          </div>
          <h3 className="text-xl font-black text-gray-900">
            {displayBranchTitle} Şube Karnesi ve Önceki Sınava Göre Kıyaslama
          </h3>
          <p className="text-xs font-semibold text-gray-400">
            Şube ders net ortalamalarını Okul, İlçe, İl, Genel ortalamalarıyla ve bir önceki deneme sınavıyla karşılaştırın.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Şube Seçimi */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
            <span className="text-[11px] font-black text-gray-500 uppercase">Şube:</span>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className="bg-transparent text-xs font-black text-purple-900 outline-none cursor-pointer"
            >
              {branchList.map(b => (
                <option key={b} value={b}>{b.replace('_', '-')}</option>
              ))}
            </select>
          </div>

          {/* Aktif Sınav Seçimi */}
          <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5">
            <span className="text-[11px] font-black text-purple-700 uppercase">Sınav:</span>
            <select
              value={selectedExamName}
              onChange={e => handleSelectActiveExam(e.target.value)}
              className="bg-transparent text-xs font-black text-purple-950 outline-none cursor-pointer max-w-[220px]"
            >
              {allExamNames.length === 0 ? (
                <option value="">Kayıtlı Sınav Yok</option>
              ) : (
                allExamNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))
              )}
            </select>
          </div>

          {/* Kıyaslanacak Önceki Sınav Seçimi */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
            <span className="text-[11px] font-black text-amber-800 uppercase">Önceki Sınav:</span>
            <select
              value={compareExamName}
              onChange={e => setCompareExamName(e.target.value)}
              className="bg-transparent text-xs font-black text-amber-950 outline-none cursor-pointer max-w-[200px]"
            >
              <option value="">Kıyaslama Yok</option>
              {allExamNames
                .filter(n => n !== selectedExamName)
                .map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
            </select>
          </div>

          {!readOnly && selectedExamName && (
            <button
              type="button"
              onClick={() => setIsEditingBenchmarks(prev => !prev)}
              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="İlçe, İl ve Genel ortalama değerlerini düzenle"
            >
              <Sliders size={14} />
              {isEditingBenchmarks ? 'Düzenlemeyi Kapat' : 'İlçe/İl/Genel Ort. Düzenle'}
            </button>
          )}

          <button
            type="button"
            onClick={handlePrintBranchReport}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Printer size={14} />
            Şube Karnesi Yazdır
          </button>
        </div>
      </div>

      {/* İlçe / İl / Genel Ortalama Düzenleme Paneli (Opsiyonel) */}
      {!readOnly && isEditingBenchmarks && selectedExamName && currentStats && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {selectedExamName} — Kurum Dışı (İlçe / İl / Genel) Ortalama ve Sıralama Değerleri
              </h4>
              <p className="text-[11px] text-slate-500">
                Okul satırı sistemdeki öğrenci sonuçlarından otomatik hesaplanır. İsterseniz resmi karnedeki İlçe, İl ve Genel ortalamalarını buradan girebilirsiniz.
              </p>
            </div>
          </div>

          {(['ilce', 'il', 'genel'] as const).map(levelKey => {
            const levelLabel = levelKey === 'ilce' ? 'İlçe' : levelKey === 'il' ? 'İl' : 'Genel';
            const curRow = activeBenchmark?.[levelKey] || {};
            return (
              <div key={levelKey} className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-900">{levelLabel} Satırı Değerleri</span>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-500">Katılımcı Sayısı:</label>
                    <input
                      type="number"
                      placeholder="Örn: 5830"
                      value={curRow.count ?? ''}
                      onChange={e => {
                        const nextRow = { ...curRow, count: e.target.value };
                        saveBenchmarkOverride(selectedExamName, { ...activeBenchmark, [levelKey]: nextRow });
                      }}
                      className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {LGS_BRANCH_COLUMNS.map(col => (
                    <div key={col.key}>
                      <label className="text-[10px] font-bold text-gray-500 block">{col.title} Net (Sıra)</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Net"
                          value={curRow[col.key] ?? ''}
                          onChange={e => {
                            const nextRow = { ...curRow, [col.key]: e.target.value };
                            saveBenchmarkOverride(selectedExamName, { ...activeBenchmark, [levelKey]: nextRow });
                          }}
                          className="w-full border border-gray-200 rounded-lg px-1.5 py-1 text-xs font-bold"
                        />
                        <input
                          type="number"
                          placeholder="Sıra"
                          value={curRow[`${col.key}_rank`] ?? ''}
                          onChange={e => {
                            const nextRow = { ...curRow, [`${col.key}_rank`]: e.target.value };
                            saveBenchmarkOverride(selectedExamName, { ...activeBenchmark, [levelKey]: nextRow });
                          }}
                          className="w-12 border border-gray-200 rounded-lg px-1 py-1 text-xs font-bold text-center"
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 block">Toplam Net (Sıra)</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Toplam"
                        value={curRow.totalNet ?? ''}
                        onChange={e => {
                          const nextRow = { ...curRow, totalNet: e.target.value };
                          saveBenchmarkOverride(selectedExamName, { ...activeBenchmark, [levelKey]: nextRow });
                        }}
                        className="w-full border border-gray-200 rounded-lg px-1.5 py-1 text-xs font-bold"
                      />
                      <input
                        type="number"
                        placeholder="Sıra"
                        value={curRow.totalNet_rank ?? ''}
                        onChange={e => {
                          const nextRow = { ...curRow, totalNet_rank: e.target.value };
                          saveBenchmarkOverride(selectedExamName, { ...activeBenchmark, [levelKey]: nextRow });
                        }}
                        className="w-12 border border-gray-200 rounded-lg px-1 py-1 text-xs font-bold text-center"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 block">LGS Puan</label>
                    <input
                      type="number"
                      step="0.001"
                      placeholder="Puan"
                      value={curRow.score ?? ''}
                      onChange={e => {
                        const nextRow = { ...curRow, score: e.target.value };
                        saveBenchmarkOverride(selectedExamName, { ...activeBenchmark, [levelKey]: nextRow });
                      }}
                      className="w-full border border-gray-200 rounded-lg px-1.5 py-1 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Resmi ŞUBE KARNESİ Tablosu (Eklenen Görsel Formatında) */}
      {!selectedExamName || !currentStats ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-xs font-semibold">
          Şube analizi görüntülenecek kayıtlı deneme sınavı bulunamadı.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <div className="min-w-[920px] border-2 border-gray-900 bg-white text-gray-900 font-sans">
              {/* 1. Üst Başlık: 6-A ŞUBE KARNESİ */}
              <div className="border-b-2 border-gray-900 py-2.5 px-4 text-center font-black text-xl tracking-wide uppercase">
                {displayBranchTitle} ŞUBE KARNESİ
              </div>

              {/* 2. İL / İLÇE / OKUL / SINAV Bilgi Satırı */}
              <div className="grid grid-cols-12 border-b border-gray-900 text-center text-xs font-black uppercase bg-gray-50/60">
                <div className="col-span-2 border-r border-gray-900 py-1.5 px-2">İL</div>
                <div className="col-span-2 border-r border-gray-900 py-1.5 px-2">İLÇE</div>
                <div className="col-span-4 border-r border-gray-900 py-1.5 px-2">OKUL</div>
                <div className="col-span-4 py-1.5 px-2">SINAV</div>
              </div>
              <div className="grid grid-cols-12 border-b-2 border-gray-900 text-center text-xs font-black uppercase">
                <div className="col-span-2 border-r border-gray-900 py-2 px-2">{provinceName}</div>
                <div className="col-span-2 border-r border-gray-900 py-2 px-2">{districtName}</div>
                <div className="col-span-4 border-r border-gray-900 py-2 px-2">{schoolTitle}</div>
                <div className="col-span-4 py-2 px-2 truncate" title={selectedExamName}>{selectedExamName}</div>
              </div>

              {/* 3. Ders Başlıkları & Şube Ortalamaları Tablosu */}
              {(() => {
                const branchRow = currentStats.selectedBranchAgg;
                const schoolRow = currentStats.schoolAgg;
                const ranks = currentStats.schoolRanks;

                // Genel (veya Okul) karşılaştırma referansı (okların yönü için)
                const getComparisonTarget = (colKey: string): number => {
                  const genVal = activeBenchmark?.genel?.[colKey];
                  if (genVal !== undefined && genVal !== '') return Number(genVal);
                  const ilVal = activeBenchmark?.il?.[colKey];
                  if (ilVal !== undefined && ilVal !== '') return Number(ilVal);
                  if (previousStats && previousStats.selectedBranchAgg.studentCount > 0) {
                    if (colKey === 'totalNet') return previousStats.selectedBranchAgg.totalNet;
                    if (colKey === 'score') return previousStats.selectedBranchAgg.score;
                    return previousStats.selectedBranchAgg.subjects[colKey] || 0;
                  }
                  if (colKey === 'totalNet') return schoolRow.totalNet;
                  if (colKey === 'score') return schoolRow.score;
                  return schoolRow.subjects[colKey] || 0;
                };

                const benchmarkRows = [
                  {
                    id: 'okul',
                    label: 'Okul',
                    count: schoolRow.studentCount,
                    getVal: (k: string) => (k === 'totalNet' ? schoolRow.totalNet : k === 'score' ? schoolRow.score : schoolRow.subjects[k] || 0),
                    getRank: (k: string) => ranks[k] || 1
                  },
                  {
                    id: 'ilce',
                    label: 'İlçe',
                    count: activeBenchmark?.ilce?.count || branchRow.maxDistrictTotal || schoolRow.studentCount,
                    getVal: (k: string) => {
                      const v = activeBenchmark?.ilce?.[k];
                      if (v !== undefined && v !== '') return Number(v);
                      return k === 'totalNet' ? schoolRow.totalNet : k === 'score' ? schoolRow.score : schoolRow.subjects[k] || 0;
                    },
                    getRank: (k: string) => activeBenchmark?.ilce?.[`${k}_rank`] || ranks[k] || 1
                  },
                  {
                    id: 'il',
                    label: 'İl',
                    count: activeBenchmark?.il?.count || branchRow.maxProvinceTotal || schoolRow.studentCount,
                    getVal: (k: string) => {
                      const v = activeBenchmark?.il?.[k];
                      if (v !== undefined && v !== '') return Number(v);
                      return k === 'totalNet' ? schoolRow.totalNet : k === 'score' ? schoolRow.score : schoolRow.subjects[k] || 0;
                    },
                    getRank: (k: string) => activeBenchmark?.il?.[`${k}_rank`] || ranks[k] || 1
                  },
                  {
                    id: 'genel',
                    label: 'Genel',
                    count: activeBenchmark?.genel?.count || branchRow.maxGeneralTotal || schoolRow.studentCount,
                    getVal: (k: string) => {
                      const v = activeBenchmark?.genel?.[k];
                      if (v !== undefined && v !== '') return Number(v);
                      return k === 'totalNet' ? schoolRow.totalNet : k === 'score' ? schoolRow.score : schoolRow.subjects[k] || 0;
                    },
                    getRank: (k: string) => activeBenchmark?.genel?.[`${k}_rank`] || ranks[k] || 1
                  }
                ];

                return (
                  <table className="w-full border-collapse text-center text-xs">
                    <thead>
                      {/* Grup Başlığı: Sözel / Sayısal */}
                      <tr className="border-b border-gray-900">
                        <th className="w-20 border-r border-gray-900 bg-white"></th>
                        {LGS_BRANCH_COLUMNS.map(col => (
                          <th key={col.key} className="border-r border-gray-900 py-1.5 px-2 font-semibold text-gray-800">
                            {col.groupLabel}
                          </th>
                        ))}
                        <th className="border-r border-gray-900 bg-white"></th>
                        <th className="bg-white"></th>
                      </tr>
                      {/* Ders Adı Başlığı */}
                      <tr className="border-b border-gray-900">
                        <th className="border-r border-gray-900 bg-white"></th>
                        {LGS_BRANCH_COLUMNS.map(col => (
                          <th key={col.key} className="border-r border-gray-900 py-1.5 px-2 font-semibold text-gray-900">
                            {col.title}
                          </th>
                        ))}
                        <th className="border-r border-gray-900 py-1.5 px-2 font-semibold text-gray-900">Toplam</th>
                        <th className="py-1.5 px-2 font-semibold text-gray-900">LGS</th>
                      </tr>
                      {/* Net / Puan Alt Başlığı */}
                      <tr className="border-b border-gray-900">
                        <th className="border-r border-gray-900 bg-white"></th>
                        {LGS_BRANCH_COLUMNS.map(col => (
                          <th key={col.key} className="border-r border-gray-900 py-1 px-2 font-medium text-gray-700">
                            Net
                          </th>
                        ))}
                        <th className="border-r border-gray-900 py-1 px-2 font-medium text-gray-700">Net</th>
                        <th className="py-1 px-2 font-medium text-gray-700">Puan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Şube Ortalama Satırı (Örn: 6-A (13)) */}
                      <tr className="border-b border-gray-900 font-bold text-sm">
                        <td className="border-r border-gray-900 py-2 px-1 text-center leading-tight">
                          <div className="font-black text-xs">{displayBranchTitle}</div>
                          <div className="text-[10px] font-semibold text-gray-600">({branchRow.studentCount})</div>
                        </td>
                        {LGS_BRANCH_COLUMNS.map(col => (
                          <td key={col.key} className="border-r border-gray-900 py-2 px-2 font-bold">
                            {formatTrDecimal(branchRow.subjects[col.key], 2)}
                          </td>
                        ))}
                        <td className="border-r border-gray-900 py-2 px-2 font-bold">
                          {formatTrDecimal(branchRow.totalNet, 2)}
                        </td>
                        <td className="py-2 px-2 font-bold">
                          {formatTrDecimal(branchRow.score, 3)}
                        </td>
                      </tr>

                      {/* Ok (▲ / ▼) Gösterge Satırı */}
                      <tr className="border-b-2 border-gray-900">
                        <td className="border-r border-gray-900 py-1.5"></td>
                        {LGS_BRANCH_COLUMNS.map(col => {
                          const branchVal = branchRow.subjects[col.key] || 0;
                          const targetVal = getComparisonTarget(col.key);
                          const isUp = branchVal >= targetVal;
                          return (
                            <td key={col.key} className="border-r border-gray-900 py-1.5 text-base font-black">
                              {isUp ? (
                                <span className="text-lime-600">▲</span>
                              ) : (
                                <span className="text-red-600">▼</span>
                              )}
                            </td>
                          );
                        })}
                        {(() => {
                          const isTotalUp = branchRow.totalNet >= getComparisonTarget('totalNet');
                          const isScoreUp = branchRow.score >= getComparisonTarget('score');
                          return (
                            <>
                              <td className="border-r border-gray-900 py-1.5 text-base font-black">
                                {isTotalUp ? <span className="text-lime-600">▲</span> : <span className="text-red-600">▼</span>}
                              </td>
                              <td className="py-1.5 text-base font-black">
                                {isScoreUp ? <span className="text-lime-600">▲</span> : <span className="text-red-600">▼</span>}
                              </td>
                            </>
                          );
                        })()}
                      </tr>

                      {/* Okul / İlçe / İl / Genel Satırları */}
                      {benchmarkRows.map(bRow => (
                        <tr key={bRow.id} className="border-b border-gray-900 font-semibold text-sm">
                          <td className="border-r border-gray-900 py-1.5 px-1 text-center leading-tight text-gray-900">
                            <div className="font-bold text-xs">{bRow.label}</div>
                            <div className="text-[10px] text-gray-600">({bRow.count})</div>
                          </td>
                          {LGS_BRANCH_COLUMNS.map(col => {
                            const val = bRow.getVal(col.key);
                            const rnk = bRow.getRank(col.key);
                            const branchVal = branchRow.subjects[col.key] || 0;
                            const isBranchAbove = branchVal >= val;
                            return (
                              <td
                                key={col.key}
                                className={`border-r border-gray-900 py-1.5 px-2 font-semibold ${
                                  isBranchAbove ? 'text-green-700' : 'text-red-600'
                                }`}
                              >
                                {formatTrDecimal(val, 2)} ({rnk})
                              </td>
                            );
                          })}
                          {(() => {
                            const totVal = bRow.getVal('totalNet');
                            const totRnk = bRow.getRank('totalNet');
                            const scrVal = bRow.getVal('score');
                            const isTotAbove = branchRow.totalNet >= totVal;
                            const isScrAbove = branchRow.score >= scrVal;
                            return (
                              <>
                                <td
                                  className={`border-r border-gray-900 py-1.5 px-2 font-semibold ${
                                    isTotAbove ? 'text-green-700' : 'text-red-600'
                                  }`}
                                >
                                  {formatTrDecimal(totVal, 2)} ({totRnk})
                                </td>
                                <td
                                  className={`py-1.5 px-2 font-semibold ${
                                    isScrAbove ? 'text-green-700' : 'text-red-600'
                                  }`}
                                >
                                  {formatTrDecimal(scrVal, 3)}
                                </td>
                              </>
                            );
                          })()}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}

              {/* 4. Alt Açıklama Notu */}
              <div className="p-2 text-[11px] text-gray-700 text-center border-t border-gray-900 bg-gray-50/40">
                Yukarıdaki tabloda şube isminin yazdığı satırda yazan değerler şubenize ait ortalamalardır. Bu satırın altındaki oklar, şube ortalamanızın genel ortalamaya göre durumunu gösterir. Parantez içindeki sayılar şube sırasını gösterir.
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* BİR ÖNCEKİ SINAVA GÖRE ŞUBE KIYASLAMA TABLOSU                     */}
          {/* ----------------------------------------------------------------- */}
          <div className="bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 rounded-2xl border border-purple-100 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-black text-purple-950 flex items-center gap-2 uppercase tracking-wider">
                  <RefreshCw size={16} className="text-purple-600" />
                  {displayBranchTitle} Şubesi — Bir Önceki Sınava Göre Değişim &amp; Kıyaslama Analizi
                </h4>
                <p className="text-xs font-semibold text-gray-500">
                  {compareExamName
                    ? `"${selectedExamName}" sınavı ile "${compareExamName}" sınavı arasındaki ders bazlı net ve puan farkları`
                    : 'Kıyaslama yapmak için yukarıdaki "Önceki Sınav" menüsünden bir deneme sınavı seçin.'}
                </p>
              </div>
              {compareExamName && previousStats && (
                <div className="flex items-center gap-2">
                  {(() => {
                    const netDiff = currentStats.selectedBranchAgg.totalNet - previousStats.selectedBranchAgg.totalNet;
                    const scoreDiff = currentStats.selectedBranchAgg.score - previousStats.selectedBranchAgg.score;
                    const isPositive = netDiff >= 0;
                    return (
                      <div className={`px-3.5 py-1.5 rounded-xl text-xs font-black border flex items-center gap-2 ${
                        isPositive
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}>
                        <span>{isPositive ? '▲' : '▼'} Toplam Net Farkı: {netDiff >= 0 ? '+' : ''}{formatTrDecimal(netDiff, 2)} Net</span>
                        <span>•</span>
                        <span>Puan Farkı: {scoreDiff >= 0 ? '+' : ''}{formatTrDecimal(scoreDiff, 3)}</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {!compareExamName || !previousStats ? (
              <div className="text-center py-6 bg-white/80 rounded-xl border border-dashed border-purple-200 text-gray-400 text-xs font-semibold">
                Kıyaslanacak ikinci bir deneme sınavı seçildiğinde ders bazlı gelişim tablosu burada gösterilir.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs bg-white rounded-xl overflow-hidden border border-purple-100 shadow-2xs">
                  <thead className="bg-purple-900 text-white font-black uppercase">
                    <tr>
                      <th className="py-2.5 px-3 text-left">Sınav / Kriter</th>
                      {LGS_BRANCH_COLUMNS.map(col => (
                        <th key={col.key} className="py-2.5 px-2">{col.title} Net</th>
                      ))}
                      <th className="py-2.5 px-3">Toplam Net</th>
                      <th className="py-2.5 px-3">LGS Puan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Önceki Sınav Satırı */}
                    <tr className="bg-gray-50/70 font-semibold text-gray-600">
                      <td className="py-2.5 px-3 text-left font-bold text-gray-700">
                        Önceki: {compareExamName} ({previousStats.selectedBranchAgg.studentCount} Öğr.)
                      </td>
                      {LGS_BRANCH_COLUMNS.map(col => (
                        <td key={col.key} className="py-2.5 px-2">
                          {formatTrDecimal(previousStats.selectedBranchAgg.subjects[col.key], 2)}
                        </td>
                      ))}
                      <td className="py-2.5 px-3 font-bold">
                        {formatTrDecimal(previousStats.selectedBranchAgg.totalNet, 2)}
                      </td>
                      <td className="py-2.5 px-3 font-bold">
                        {formatTrDecimal(previousStats.selectedBranchAgg.score, 3)}
                      </td>
                    </tr>

                    {/* Mevcut Sınav Satırı */}
                    <tr className="font-black text-gray-900 bg-white">
                      <td className="py-2.5 px-3 text-left text-purple-950">
                        Aktif: {selectedExamName} ({currentStats.selectedBranchAgg.studentCount} Öğr.)
                      </td>
                      {LGS_BRANCH_COLUMNS.map(col => (
                        <td key={col.key} className="py-2.5 px-2">
                          {formatTrDecimal(currentStats.selectedBranchAgg.subjects[col.key], 2)}
                        </td>
                      ))}
                      <td className="py-2.5 px-3 text-purple-900">
                        {formatTrDecimal(currentStats.selectedBranchAgg.totalNet, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-purple-900">
                        {formatTrDecimal(currentStats.selectedBranchAgg.score, 3)}
                      </td>
                    </tr>

                    {/* Değişim (Fark) Satırı */}
                    <tr className="font-black bg-purple-50/40">
                      <td className="py-2.5 px-3 text-left text-purple-900">
                        Önceki Sınava Göre Değişim (Fark)
                      </td>
                      {LGS_BRANCH_COLUMNS.map(col => {
                        const cur = currentStats.selectedBranchAgg.subjects[col.key] || 0;
                        const prev = previousStats.selectedBranchAgg.subjects[col.key] || 0;
                        const diff = cur - prev;
                        const isUp = diff >= 0;
                        return (
                          <td
                            key={col.key}
                            className={`py-2.5 px-2 ${isUp ? 'text-emerald-700' : 'text-rose-600'}`}
                          >
                            {isUp ? '▲ +' : '▼ '}
                            {formatTrDecimal(diff, 2)}
                          </td>
                        );
                      })}
                      {(() => {
                        const totDiff = currentStats.selectedBranchAgg.totalNet - previousStats.selectedBranchAgg.totalNet;
                        const scrDiff = currentStats.selectedBranchAgg.score - previousStats.selectedBranchAgg.score;
                        return (
                          <>
                            <td className={`py-2.5 px-3 ${totDiff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                              {totDiff >= 0 ? '▲ +' : '▼ '}
                              {formatTrDecimal(totDiff, 2)}
                            </td>
                            <td className={`py-2.5 px-3 ${scrDiff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                              {scrDiff >= 0 ? '▲ +' : '▼ '}
                              {formatTrDecimal(scrDiff, 3)}
                            </td>
                          </>
                        );
                      })()}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

