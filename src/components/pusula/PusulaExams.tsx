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
  FileCheck
} from 'lucide-react';
import { PusulaStudentProfile, PusulaExam, PusulaPlanItem, PusulaCoachingNote } from '../../types/pusula';

interface PusulaExamsProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
  isOpenNewExamModal?: boolean;
  onCloseNewExamModal?: () => void;
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
  onCloseNewExamModal
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
  const [examType, setExamType] = useState<'TYT' | 'AYT' | 'LGS' | 'KPSS' | 'AGS'>('TYT');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [scoresInput, setScoresInput] = useState<Record<string, { d: string; y: string; net: string }>>({});
  const [mistakeTopicInput, setMistakeTopicInput] = useState('');
  const [selectedMistakes, setSelectedMistakes] = useState<string[]>([]);
  const [selectedSubjectForTopic, setSelectedSubjectForTopic] = useState<string>('Türkçe');
  const [subjectMistakesMap, setSubjectMistakesMap] = useState<Record<string, string[]>>({});

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

  // Keep selected exam updated
  React.useEffect(() => {
    if (!selectedExamId && profile.exams && profile.exams.length > 0) {
      setSelectedExamId(profile.exams[0].id);
    }
  }, [profile.exams, selectedExamId]);

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
        return ['Türkçe', 'Matematik', 'Fen Bilimleri', 'İnkılap Tarihi', 'İngilizce', 'Din Kültürü'];
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

    const newExamId = 'ex_' + Date.now();
    const newExam: PusulaExam = {
      id: newExamId,
      name: examName.trim(),
      date: examDate,
      type: examType,
      scores: scoresMap,
      detailedScores: detailedScoresMap,
      mistakeTopics: selectedMistakes,
      topicMistakesBySubject: subjectMistakesMap,
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
    const maxScores = EXAM_SUBJECT_MAX[activeExam.type] || {};
    const totalMaxExamQuestions = Object.values(maxScores).reduce((a, b) => a + b, 0) || 120;
    const overallSuccessPercent = totalMaxExamQuestions > 0 ? (activeExam.totalNet / totalMaxExamQuestions) * 100 : 0;

    // Subject breakdown
    const subjectList = Object.entries(activeExam.scores || {}).map(([subject, net]) => {
      const detailed = activeExam.detailedScores?.[subject];
      const maxQ = maxScores[subject] || 30;
      const successRate = (net / maxQ) * 100;
      const penaltyLost = detailed ? (detailed.y / (activeExam.type === 'LGS' ? 3 : 4)) : 0;

      return {
        subject,
        net,
        d: detailed?.d ?? net,
        y: detailed?.y ?? 0,
        maxQ,
        successRate: Math.max(0, Math.min(100, successRate)),
        penaltyLost: Math.round(penaltyLost * 10) / 10
      };
    });

    return {
      totalNet: activeExam.totalNet,
      netChange,
      totalMaxExamQuestions,
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
          reason: `Başarı oranı %${sub.successRate.toFixed(0)} (${sub.net}/${sub.maxQ} Net). Temel kavram ve konu tekrarı gerektiriyor.`,
          severity: 'critical'
        });
      } else if (sub.successRate < 70) {
        moderate.push({
          title: `${sub.subject} Dersi Pekiştirme Alanı`,
          subject: sub.subject,
          reason: `Başarı oranı %${sub.successRate.toFixed(0)} (${sub.net}/${sub.maxQ} Net). Soru bankası ve hız denemesiyle güçlendirilmeli.`,
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

    // Add mistake topics as critical/moderate
    (activeExam.mistakeTopics || []).forEach(topic => {
      critical.push({
        title: topic,
        subject: 'Hata Yapılan Konu',
        reason: 'Denemede yanlış / boş bırakılan kritik konu. Bu hafta soru çözümü planlanmalıdır.',
        severity: 'critical'
      });
    });

    return { critical, moderate, strong };
  }, [activeExam, step1NetAnalysis]);

  // STEP 4: ÇALIŞMA PLANI ÜRET (Generated Remediation Tasks)
  const generatedPlanTasks: PusulaPlanItem[] = useMemo(() => {
    if (!activeExam) return [];

    const tasks: PusulaPlanItem[] = [];
    const topics = activeExam.mistakeTopics || [];
    const weakSubjects = step1NetAnalysis?.subjectList.filter(s => s.successRate < 60) || [];

    // Assign tasks across the days
    let dayIdx = 0;

    // 1. Topic-specific remediation tasks
    topics.forEach((topic, idx) => {
      const day = DAYS[dayIdx % DAYS.length];
      dayIdx++;
      tasks.push({
        id: `plan-gen-topic-${idx}-${Date.now()}`,
        day,
        subject: 'Eksik Konu Telafisi',
        topic: `${topic} - Konu Tekrarı & 35 Soru`,
        targetCount: 35,
        type: 'study',
        completed: false,
        notes: `${activeExam.name} denemesinde tespit edilen zayıf alan telafisi.`
      });
    });

    // 2. Subject-level boost tasks
    weakSubjects.forEach((sub, idx) => {
      const day = DAYS[dayIdx % DAYS.length];
      dayIdx++;
      tasks.push({
        id: `plan-gen-sub-${idx}-${Date.now()}`,
        day,
        subject: sub.subject,
        topic: `${sub.subject} - Soru Bankası Tarama (40 Soru)`,
        targetCount: 40,
        type: 'study',
        completed: false,
        notes: `Net hedefi: %${sub.successRate.toFixed(0)} → %75 seviyesine çıkarma.`
      });
    });

    // 3. Routine reinforcement
    if (tasks.length < 5) {
      tasks.push({
        id: `plan-gen-routine-1`,
        day: 'Çarşamba',
        subject: 'Günlük Rutin',
        topic: '30 Paragraf & Problem Çözümü',
        targetCount: 30,
        type: 'routine',
        completed: false
      });
      tasks.push({
        id: `plan-gen-routine-2`,
        day: 'Cumartesi',
        subject: 'Branş Denemesi',
        topic: `${weakSubjects[0]?.subject || 'Matematik'} Branş Denemesi + Yanlış Analizi`,
        targetCount: 40,
        type: 'exam',
        completed: false
      });
    }

    return tasks;
  }, [activeExam, step1NetAnalysis]);

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
    const existingPlan = profile.weeklyPlan || [];
    const mergedPlan = [...existingPlan, ...generatedPlanTasks];
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
      actionItems: generatedPlanTasks.map(t => `${t.day}: ${t.topic}`)
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
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-200">
                    {activeExam.type}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{activeExam.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  {activeExam.name} — 5 Aşamalı Akıllı Analiz
                </h2>
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

              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus size={15} /> Yeni Deneme
              </button>
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
              <span>Konu Analizi</span>
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
          {/* STEP 1: NET ANALİZİ VIEW                                          */}
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
                    Genel Sınav Başarı Oranı: %{step1NetAnalysis.overallSuccessPercent.toFixed(1)}
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

              {/* Subject Breakdown Cards & Visual Bars */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 size={16} className="text-purple-600" />
                  Ders Bazlı Net ve Doğru / Yanlış Dağılımı
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {step1NetAnalysis.subjectList.map(sub => (
                    <div key={sub.subject} className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-gray-900 truncate">{sub.subject}</span>
                        <span className="font-black text-sm text-purple-900 bg-purple-100 px-2 py-0.5 rounded-lg">
                          {sub.net} Net
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              sub.successRate >= 65 ? 'bg-emerald-500' : sub.successRate >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${sub.successRate}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-500">
                          <span>Başarı: %{sub.successRate.toFixed(0)}</span>
                          <span>Azami: {sub.maxQ} Soru</span>
                        </div>
                      </div>

                      {/* D/Y/Penalty Stats */}
                      <div className="flex justify-between items-center text-[10px] font-bold pt-1 border-t border-gray-200/60 text-gray-600">
                        <span>D: <b className="text-emerald-700">{sub.d}</b></span>
                        <span>Y: <b className="text-rose-700">{sub.y}</b></span>
                        <span>Silinen: <b className="text-amber-700">-{sub.penaltyLost}</b></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* STEP 2: KONU ANALİZİ VIEW                                         */}
          {/* ----------------------------------------------------------------- */}
          {activeStepTab === 'step2' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-black text-amber-950">Denemede Kayıp Yaşanan ve Boş Bırakılan Konular</h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Bu sınavda yapılan yanlışlar ve boş sorular üzerinden tespit edilen konu listesi.
                  </p>
                </div>
              </div>

              {step2TopicAnalysis.topics.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                  <div className="font-bold text-gray-700">Bu denemede özel bir eksik konu girilmedi.</div>
                  <p className="text-xs text-gray-400">Aşağıdan hızlıca hata yapılan konuları ekleyebilirsiniz.</p>
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

                  <div className="space-y-2 pt-1">
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

                  <div className="space-y-2 pt-1">
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-purple-50/90 p-4 rounded-2xl border border-purple-200">
                <div>
                  <h4 className="text-sm font-black text-purple-950 flex items-center gap-2">
                    <CalendarDays size={18} className="text-purple-600" />
                    Bu Denemenin Eksiklerine Özel Üretilen Telafi Çalışma Planı
                  </h4>
                  <p className="text-xs text-purple-700 mt-0.5">
                    Deneme analizi sonuçlarına göre otomatik oluşturulan haftalık görevler. Tek tıkla öğrencinin haftalık çalışma planına aktarabilirsiniz.
                  </p>
                </div>

                <button
                  onClick={handleApplyTasksToWeeklyPlan}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
                >
                  <Zap size={16} />
                  ⚡ Haftalık Plana Aktar ({generatedPlanTasks.length} Görev)
                </button>
              </div>

              {planAddedToast && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 size={16} /> Görevler öğrencinin Haftalık Çalışma Planı çizelgesine başarıyla aktarıldı!
                </div>
              )}

              {/* Generated Task List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {generatedPlanTasks.map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-100 text-purple-800">
                        {task.day}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500">
                        🎯 {task.targetCount} Soru
                      </span>
                    </div>
                    <div className="text-xs font-black text-gray-900">{task.topic}</div>
                    {task.notes && (
                      <div className="text-[11px] text-gray-500 italic">{task.notes}</div>
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

                  <button
                    onClick={handleSaveFeedbackAsCoachingNote}
                    className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck size={16} className="text-purple-600" />
                    💾 Koçluk Notlarına Kaydet
                  </button>
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
              Sınav türüne göre denemeleri filtreleyin, analizleri inceleyin ve yeni netler ekleyin.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter buttons */}
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 text-xs font-bold">
              {(['Hepsi', 'TYT', 'AYT', 'LGS', 'KPSS', 'AGS'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    filterType === t ? 'bg-purple-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <Plus size={16} />
              Yeni Deneme Ekle
            </button>
          </div>
        </div>

        {filteredExams.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
            <Award size={40} className="mx-auto text-gray-300" />
            <h4 className="font-bold text-gray-700">Kayıtlı Deneme Sınavı Bulunamadı</h4>
            <p className="text-xs text-gray-400">
              Öğrencinin çözdüğü ilk deneme sınavının sonuçlarını ekleyerek 5 aşamalı analizi başlatın.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-md"
            >
              + Deneme Ekle
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-black text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Deneme Sınavı</th>
                  <th className="pb-3">Tarih</th>
                  <th className="pb-3">Ders Netleri</th>
                  <th className="pb-3">Kritik Yanlışlar</th>
                  <th className="pb-3 text-right">Toplam Net</th>
                  <th className="pb-3 text-center">İşlem &amp; Analiz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExams.map(ex => {
                  const isSelected = selectedExamId === ex.id;
                  return (
                    <tr 
                      key={ex.id} 
                      className={`transition-colors cursor-pointer ${isSelected ? 'bg-purple-50/60' : 'hover:bg-gray-50/80'}`}
                      onClick={() => {
                        setSelectedExamId(ex.id);
                      }}
                    >
                      <td className="py-4 pl-2 font-bold text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-50 text-purple-800 border border-purple-200">
                            {ex.type}
                          </span>
                          <span className="text-sm">{ex.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black bg-purple-600 text-white">
                              Seçili
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                        {ex.date}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          {Object.entries(ex.scores || {}).map(([sub, score]) => (
                            <span key={sub} className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 font-semibold border border-gray-200/60">
                              {sub}: <b className="text-purple-900 font-black">{score}</b>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4">
                        {ex.mistakeTopics && ex.mistakeTopics.length > 0 ? (
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
                          <button
                            onClick={() => {
                              setSelectedExamId(ex.id);
                              setActiveStepTab('step1');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                          >
                            <Sparkles size={13} /> Analiz
                          </button>
                          <button 
                            onClick={() => handleDeleteExam(ex.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                            title="Denemeyi Sil"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: YENİ DENEME EKLE                                             */}
      {/* ------------------------------------------------------------------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Award size={22} className="text-purple-600" />
                  Yeni Deneme Sınavı ve Net Girişi
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  Deneme netlerini girin; sistem anında 5 aşamalı analiz ve çalışma planını oluştursun.
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-5">
              {/* Type, Name, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Sınav Türü</label>
                  <select 
                    value={examType}
                    onChange={(e) => {
                      setExamType(e.target.value as any);
                      setScoresInput({});
                    }}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                  >
                    <option value="TYT">TYT</option>
                    <option value="AYT">AYT</option>
                    <option value="LGS">LGS</option>
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
                    placeholder="Örn: 3D Türkiye Geneli Denemesi 1"
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
                  Ders Netleri (Doğru - Yanlış / 4)
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
                            placeholder="Doğru"
                            value={current.d}
                            onChange={(e) => handleScoreChange(sub, 'd', e.target.value)}
                            className="bg-gray-50 border border-gray-200 p-1.5 rounded-lg text-xs font-semibold outline-none text-center"
                          />
                          <input 
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Yanlış"
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

              {/* Mistake Topics Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">
                  Bu Sınavda Hata Yapılan / Boş Bırakılan Konular (Opsiyonel)
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
                  Kaydet ve 5 Aşamalı Analizi Başlat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
