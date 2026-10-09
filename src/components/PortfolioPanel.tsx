import React, { useState, useEffect, useRef } from 'react';
import { doc, updateDoc, addDoc, collection, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from '../lib/firebase';
import { Toast } from './ui/Modals';
import { 
  Users, BookOpen, Save, CheckCircle, RefreshCw, Edit2, Loader2, 
  RotateCcw, Search, Briefcase, Activity, ClipboardList, Star, 
  Music, Palette, Dumbbell, Scissors, Layers, Eye, User, Calculator, Leaf, MessageSquare, X, Plus,
  Shield, Brain, Lightbulb, Heart, Trophy, Award
} from 'lucide-react';

export const PortfolioPanel = ({ state, actions }: any) => {
  const { currentUser, classes, selectedStudent: preSelectedStudent, activeSchoolId, devCardData, behaviorLog, devCardConfig, hwProgress, assignments, getBehaviorScore, categories, tasks, evaluations, successDescriptions, remedialTasks, remedialProblems, uncompletedReasons } = state;
  const { setSelectedStudent } = actions;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved'); 
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([]);
  const [filteredStudentsList, setFilteredStudentsList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<any>({ message: null, type: 'info' });
  const formChangedRef = useRef(false);
  const autoSaveTimerRef = useRef<any>(null);

  const portCol = activeSchoolId === 'default' ? 'portfolios' : `portfolios_${activeSchoolId}`;

  const showToast = (message: string, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: null, type: 'info' }), 4000);
  };

  const initialFormState = {
    academicYear: '2024-2025', fullName: '', studentNo: '', gender: '', classLevel: '',
    learningStyle: '', interest: '', bestSubject: '', hobbiesAndPhobias: '', trainingsAndCertificates: '', multiIntelligence: '', academicModel: 'Model 2',
    readingRecords: [], totalPageSum: 0, calculatedWeeklyAvg: 0,
    term1Pages: '', term2Pages: '',
    term1WordsPerMin: '', term2WordsPerMin: '',
    term1Comprehension: '', term2Comprehension: '',
    term1SpeechDuration: '', term2SpeechDuration: '',
    term1SpeechTotalWords: '', term2SpeechTotalWords: '',
    term1SpeechUniqueWords: '', term2SpeechUniqueWords: '',
    groupCulture: '', groupLanguage: '', skillMusic: '', skillArt: '', skillSports: '', skillHand: '',
    obsPositive: '', obsNegative: '', guidanceNotes: ''
  };

  const [formData, setFormData] = useState<any>(initialFormState);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeClassFilter, setActiveClassFilter] = useState('Tümü');
  const [activeDiagTab, setActiveDiagTab] = useState('holland');
  
  const ratingCriteria = [ "Not Tutma", "Dinleme/Anlama", "Tekrar Yapma", "Soru Çözme", "Akran Çalışması", "Ek Kaynak Kullanımı", "Pekiştirme", "Başarma Çabası" ];
  const initialRatings = ratingCriteria.reduce((acc, item) => ({ ...acc, [item]: 0 }), {});
  const [ratings, setRatings] = useState<any>(initialRatings);

  const learningStyles = [
      { id: 'Sözel-Dilsel', icon: MessageSquare, color: 'blue', label: 'Sözel - Dilsel' },
      { id: 'Mantıksal-Matematiksel', icon: Calculator, color: 'red', label: 'Mantıksal - Mat.' },
      { id: 'Görsel-Uzamsal', icon: Eye, color: 'purple', label: 'Görsel - Uzamsal' },
      { id: 'Müziksel-Ritmik', icon: Music, color: 'pink', label: 'Müziksel - Ritmik' },
      { id: 'Bedensel-Kinestetik', icon: Dumbbell, color: 'orange', label: 'Bedensel - Kines.' },
      { id: 'Kişilerarası-Sosyal', icon: Users, color: 'indigo', label: 'Kişilerarası - Sos.' },
      { id: 'İçsel-Öze Dönük', icon: User, color: 'teal', label: 'İçsel - Öze Dönük' },
      { id: 'Doğacı', icon: Leaf, color: 'green', label: 'Doğacı' },
  ];

  const academicCalendar = [
    { group: "1. Dönem", options: [ "1. Hafta (08-12 Eylül)", "2. Hafta (15-19 Eylül)", "3. Hafta (22-26 Eylül)", "4. Hafta (29 Eylül - 03 Ekim)", "5. Hafta (06-10 Ekim)", "6. Hafta (13-17 Ekim)", "7. Hafta (20-24 Ekim)", "8. Hafta (27-31 Ekim)", "9. Hafta (03-07 Kasım)", "ARA TATİL (10-14 Kasım)", "10. Hafta (17-21 Kasım)", "11. Hafta (24-28 Kasım)", "12. Hafta (01-05 Aralık)", "13. Hafta (08-12 Aralık)", "14. Hafta (15-19 Aralık)", "15. Hafta (22-26 Aralık)", "16. Hafta (29 Aralık - 02 Ocak)", "17. Hafta (05-09 Ocak)", "18. Hafta (12-16 Ocak)" ]},
    { group: "2. Dönem", options: [ "1. Hafta (02-06 Şubat)", "2. Hafta (09-13 Şubat)", "3. Hafta (16-20 Şubat)", "4. Hafta (23-27 Şubat)", "5. Hafta (02-06 Mart)", "6. Hafta (09-13 Mart)", "7. Hafta (16-20 Mart)", "8. Hafta (23-27 Mart)", "ARA TATİL (30 Mart - 03 Nisan)", "9. Hafta (06-10 Nisan)", "10. Hafta (13-17 Nisan)", "11. Hafta (20-24 Nisan)", "12. Hafta (27 Nisan - 01 Mayıs)", "13. Hafta (04-08 Mayıs)", "14. Hafta (11-15 Mayıs)", "15. Hafta (18-22 Mayıs)", "16. Hafta (25-29 Mayıs)", "17. Hafta (01-05 Haziran)", "18. Hafta (08-12 Haziran)", "19. Hafta (15-19 Haziran)" ]}
  ];

  useEffect(() => {
    if (!activeSchoolId) return;
    const q = query(collection(db, portCol));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentsData: any[] = [];
      snapshot.forEach((doc) => studentsData.push({ id: doc.id, ...doc.data() }));
      setRegisteredStudents(studentsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [activeSchoolId]);

  useEffect(() => {
    const masterList: any[] = [];
    Object.entries(classes).forEach(([clsKey, studentNames]: any) => {
        const cleanClass = clsKey.replace('_', '');
        studentNames.forEach((name: string) => {
            masterList.push({ fullName: name, classLevel: cleanClass, source: 'master' });
        });
    });

    const combined = masterList.map(student => {
        const portfolioEntry = registeredStudents.find(p => p.fullName && p.fullName.toLowerCase().trim() === student.fullName?.toLowerCase().trim());
        if (portfolioEntry) return { ...portfolioEntry, ...student, id: portfolioEntry.id, hasData: true };
        return { ...student, hasData: false, studentNo: '' };
    });

    if (activeClassFilter === 'Tümü') setFilteredStudentsList(combined);
    else {
        const filtered = combined.filter(s => s.classLevel === activeClassFilter);
        setFilteredStudentsList(filtered);
    }
  }, [registeredStudents, activeClassFilter, classes]);

  useEffect(() => {
    if (preSelectedStudent && registeredStudents.length > 0) {
        const student = registeredStudents.find(s => s.fullName === preSelectedStudent) || filteredStudentsList.find(s => s.fullName === preSelectedStudent);
        if (student) loadStudentToForm(student);
        else {
            setFormData({ ...initialFormState, fullName: preSelectedStudent });
            showToast(`Yeni kayıt oluşturuluyor: ${preSelectedStudent}`, "info");
            setEditingId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
  }, [preSelectedStudent]);

  const loadStudentToForm = (student: any) => {
    formChangedRef.current = false; 
    if (student.hasData) {
        const { ratings: studentRatings, id, readingRecords, ...studentData } = student;
        let t1 = studentData.term1Pages ?? "";
        let t2 = studentData.term2Pages ?? "";
        let w1 = studentData.term1WordsPerMin ?? "";
        let w2 = studentData.term2WordsPerMin ?? "";
        let c1 = studentData.term1Comprehension ?? "";
        let c2 = studentData.term2Comprehension ?? "";
        let sd1 = studentData.term1SpeechDuration ?? "";
        let sd2 = studentData.term2SpeechDuration ?? "";
        let sw1 = studentData.term1SpeechTotalWords ?? "";
        let sw2 = studentData.term2SpeechTotalWords ?? "";
        let su1 = studentData.term1SpeechUniqueWords ?? "";
        let su2 = studentData.term2SpeechUniqueWords ?? "";
        const records = readingRecords || [];
        
        if (t1 === "" && t2 === "" && records.length > 0) {
            const t1Record = records.find((r: any) => r.term === "1. Dönem" || r.term === "1. dönem");
            const t2Record = records.find((r: any) => r.term === "2. Dönem" || r.term === "2. dönem");
            if (t1Record) t1 = t1Record.pages;
            if (t2Record) t2 = t2Record.pages;
            
            if (t1 === "" && t2 === "") {
                records.forEach((r: any) => {
                    const isSecondTerm = r.term && (
                        r.term.includes("Şubat") || r.term.includes("Mart") || 
                        r.term.includes("Nisan") || r.term.includes("Mayıs") || 
                        r.term.includes("Haziran") || r.term.includes("2. Dönem")
                    );
                    const pagesVal = parseInt(r.pages) || 0;
                    if (isSecondTerm) {
                        t2 = (parseInt(t2) || 0) + pagesVal;
                    } else {
                        t1 = (parseInt(t1) || 0) + pagesVal;
                    } 
                });
            }
        }
        setFormData({
            ...initialFormState,
            ...studentData,
            readingRecords: records,
            term1Pages: t1,
            term2Pages: t2,
            term1WordsPerMin: w1,
            term2WordsPerMin: w2,
            term1Comprehension: c1,
            term2Comprehension: c2,
            term1SpeechDuration: sd1,
            term2SpeechDuration: sd2,
            term1SpeechTotalWords: sw1,
            term2SpeechTotalWords: sw2,
            term1SpeechUniqueWords: su1,
            term2SpeechUniqueWords: su2
        });
        setRatings(studentRatings || initialRatings);
        setEditingId(id);
        showToast(`✏️ Düzenleniyor: ${student.fullName}`, "info");
    } else {
        setFormData({ ...initialFormState, fullName: student.fullName, classLevel: student.classLevel });
        setRatings(initialRatings);
        setEditingId(null);
        showToast(`🆕 Yeni Kayıt: ${student.fullName}`, "info");
    }
    setSearchQuery(student.fullName); 
    setSelectedStudent(student.fullName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setRatings(initialRatings);
    setEditingId(null);
    setSearchQuery('');
    formChangedRef.current = false;
    showToast("Form temizlendi.", "info");
  };

  const handleChange = (e: any) => {
      setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
      formChangedRef.current = true;
  };
  const handleRate = (key: string, val: number) => {
      setRatings((prev: any) => ({...prev, [key]: val}));
      formChangedRef.current = true;
  };

  useEffect(() => {
      const t1Val = parseInt(formData.term1Pages) || 0;
      const t2Val = parseInt(formData.term2Pages) || 0;
      const totalSum = t1Val + t2Val;
      const avg = totalSum > 0 ? (totalSum / 36).toFixed(1) : 0;
      setFormData((prev: any) => ({ 
          ...prev, 
          totalPageSum: totalSum, 
          calculatedWeeklyAvg: avg 
      }));
  }, [formData.term1Pages, formData.term2Pages]);

  // --- MANUAL SAVE ---
  const handleSave = async () => {
    if (!formData.fullName) { showToast("❗ İsim bilgisi eksik!", "warning"); return; }
    setIsSaving(true);
    try {
        const userId = currentUser?.id || 'unknown';
        const completeData = { ...formData, ratings, updatedAt: new Date().toISOString(), updatedBy: userId };
        
        const docId = formData.fullName; // Use full name as ID for consistency
        await setDoc(doc(db, portCol, docId), completeData, { merge: true });
        setEditingId(docId);
        showToast("Başarıyla Kaydedildi!", "success");
        
        formChangedRef.current = false;
        setAutoSaveStatus('saved');
    } catch (error) {
        console.error("Kayıt hatası:", error);
        showToast("Bir hata oluştu.", "error");
    } finally { setIsSaving(false); }
  };

  // --- AUTO SAVE LOGIC ---
  useEffect(() => {
    if (!formChangedRef.current || !formData.fullName) return;

    setAutoSaveStatus('unsaved');

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
        if (!formData.fullName) return;
        setAutoSaveStatus('saving');
        
        try {
            const userId = currentUser?.id || 'unknown';
            const completeData = { ...formData, ratings, updatedAt: new Date().toISOString(), updatedBy: userId };
            
            const docId = formData.fullName;
            await setDoc(doc(db, portCol, docId), completeData, { merge: true });
            setEditingId(docId);

            setAutoSaveStatus('saved');
            formChangedRef.current = false; 
        } catch (err) {
            console.error("Auto save failed", err);
            setAutoSaveStatus('unsaved');
        }
    }, 2000); 

    return () => clearTimeout(autoSaveTimerRef.current);
  }, [formData, ratings, currentUser, portCol]);

  const inputClasses = "w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all";

  const availableClasses = ['Tümü', ...Object.keys(classes).sort().map(k => k.replace('_', ''))];

  const getCategoryIcon = (category: string) => {
    const norm = (category || "").toUpperCase().trim();
    if (norm.includes("İLETİŞİM")) return MessageSquare;
    if (norm.includes("SORUMLULUK")) return ClipboardList;
    if (norm.includes("ZAMAN")) return Activity;
    if (norm.includes("SABIR") || norm.includes("AZİM")) return Star;
    if (norm.includes("GİRİŞİMCİLİK")) return Lightbulb;
    if (norm.includes("DÜRÜSTLÜK")) return Shield;
    if (norm.includes("DÜŞÜNME") || norm.includes("ELEŞTİREL")) return Brain;
    if (norm.includes("VATANSEVERLİK") || norm.includes("KÜLTÜREL")) return Heart;
    return Layers;
  };

  const getPsychologicalInsight = (category: string, studentName: string) => {
    if (!studentName) {
      return "Öğrenci seçildiğinde gelişim alanına dair analiz raporu burada görüntülenecektir.";
    }

    const studentEvals = evaluations?.[studentName] || {};
    const catEvals = studentEvals[category] || {};
    const catTasks = tasks?.[category] || [];
    
    let yaptiCount = 0;
    let yapmadiCount = 0;
    let yapamadiCount = 0;
    let totalScore = 0;
    let evaluatedCount = 0;
    
    catTasks.forEach((_task: any, idx: number) => {
        const evalData = catEvals[idx];
        if (evalData && evalData.status) {
            evaluatedCount++;
            if (evalData.status === 'YAPTI') yaptiCount++;
            else if (evalData.status === 'YAPMADI') yapmadiCount++;
            else if (evalData.status === 'YAPAMADI') yapamadiCount++;
            totalScore += (evalData.score || 1);
        }
    });
    
    const avgScore = evaluatedCount > 0 ? (totalScore / evaluatedCount) : 0;
    
    // Default fallback if no evaluation has been done yet
    if (evaluatedCount === 0) {
        return "Öğrencinin bu gelişim alanına dair henüz bir değerlendirme verisi bulunmamaktadır. Değerlendirme panelinden veri girildiğinde burada psikolojik eğilim analizi belirecektir.";
    }
    
    const catNorm = category.toUpperCase().trim();
    
    let sentence1 = "";
    let sentence2 = "";
    let sentence3 = "";
    
    // Sentence 1: General tendency description based on status distribution
    if (yaptiCount === evaluatedCount && avgScore >= 4) {
        // High success
        if (catNorm.includes("İLETİŞİM")) {
            sentence1 = `${studentName}, iletişim becerilerinde son derece yapıcı, proaktif ve uyumlu bir liderlik eğilimi sergilemektedir.`;
        } else if (catNorm.includes("SORUMLULUK")) {
            sentence1 = `${studentName}, verilen görevleri sahiplenme ve sorumluluk bilincinde mükemmel bir içsel motivasyon seviyesine sahiptir.`;
        } else if (catNorm.includes("ZAMAN")) {
            sentence1 = `${studentName}, zamanı planlama ve hedefe odaklanma konusunda son derece disiplinli ve öz denetimi yüksek bir profil çizmektedir.`;
        } else if (catNorm.includes("SABIR") || catNorm.includes("AZİM")) {
            sentence1 = `${studentName}, karşılaştığı zorluklar karşısında yılmazlık (resilience) göstererek yüksek bir içsel kararlılık ve azim sergilemektedir.`;
        } else if (catNorm.includes("GİRİŞİMCİLİK")) {
            sentence1 = `${studentName}, yenilikçi fikirler geliştirme ve inisiyatif alma konusunda cesur ve yüksek özgüvenli bir eğilime sahiptir.`;
        } else if (catNorm.includes("DÜRÜSTLÜK")) {
            sentence1 = `${studentName}, etik değerleri ve dürüstlüğü bir yaşam biçimi haline getirmiş, vicdani gelişim düzeyi çok yüksek bir öğrencidir.`;
        } else if (catNorm.includes("DÜŞÜNME") || catNorm.includes("ELEŞTİREL")) {
            sentence1 = `${studentName}, olayları sorgulama, neden-sonuç ilişkilerini analiz etme ve rasyonel muhakeme yeteneğinde çok başarılıdır.`;
        } else if (catNorm.includes("VATANSEVERLİK") || catNorm.includes("KÜLTÜREL")) {
            sentence1 = `${studentName}, toplumsal değerlere, kültürel mirasa ve aidiyet bilincine sahip çıkmada güçlü bir toplumsal duyarlılık sergilemektedir.`;
        } else {
            sentence1 = `${studentName}, ${category.toLowerCase()} değerinde sergilediği mükemmel performansla yüksek bir karakter olgunluğu göstermektedir.`;
        }
    } else if (yaptiCount > 0 && yapamadiCount === 0 && yapmadiCount === 0) {
        // Active participation with average rubrics
        if (catNorm.includes("İLETİŞİM")) {
            sentence1 = `${studentName}, sosyal ortamlarda kendini ifade etme eğiliminde olup, iletişim kanallarını açık tutmaya gayret etmektedir.`;
        } else if (catNorm.includes("SORUMLULUK")) {
            sentence1 = `${studentName}, kendisine verilen rol ve sorumlulukları yerine getirme gayretinde istikrarlı bir tutum izlemektedir.`;
        } else if (catNorm.includes("ZAMAN")) {
            sentence1 = `${studentName}, görevleri tamamlamada zaman sınırlarına uymaya çalışmakta ve temel bir planlama eğilimi taşımaktadır.`;
        } else if (catNorm.includes("SABIR") || catNorm.includes("AZİM")) {
            sentence1 = `${studentName}, önüne çıkan engelleri aşmak için çaba göstermekte ve hedefe ulaşmakta kararlı davranmaktadır.`;
        } else if (catNorm.includes("GİRİŞİMCİLİK")) {
            sentence1 = `${studentName}, yeni durumlara uyum sağlama ve fikirlerini paylaşma konusunda olumlu bir tutum sergilemektedir.`;
        } else if (catNorm.includes("DÜRÜSTLÜK")) {
            sentence1 = `${studentName}, sosyal ilişkilerinde güvenilirliği ön planda tutmakta ve ahlaki değerlere saygı duymaktadır.`;
        } else if (catNorm.includes("DÜŞÜNME") || catNorm.includes("ELEŞTİREL")) {
            sentence1 = `${studentName}, bilgi kaynaklarını analiz etmeye ve önyargısız şekilde yaklaşmaya özen göstermektedir.`;
        } else if (catNorm.includes("VATANSEVERLİK") || catNorm.includes("KÜLTÜREL")) {
            sentence1 = `${studentName}, kültürel ve milli değerlere ilgi duyarak bu konulardaki etkinliklere katılım eğilimi göstermektedir.`;
        } else {
            sentence1 = `${studentName}, ${category.toLowerCase()} alanındaki faaliyetlere uyum sağlamakta ve öğrenme isteği taşımaktadır.`;
        }
    } else if (yapamadiCount > yaptiCount + yapmadiCount) {
        // Mostly "YAPAMADI" (struggling, trying but has obstacles)
        sentence1 = `${studentName}, bu alandaki görevleri yerine getirmede istekli olsa da, çevresel faktörler veya yöntem yetersizliği nedeniyle engellerle karşılaşmaktadır.`;
    } else if (yapmadiCount > yaptiCount + yapamadiCount) {
        // Mostly "YAPMADI" (unwilling, avoidant)
        sentence1 = `${studentName}, bu gelişim alanına ait sorumlulukları üstlenmekten kaçınma veya kayıtsızlık (motivasyon azlığı) eğilimi içindedir.`;
    } else {
        // Mixed evaluation behavior
        sentence1 = `${studentName}, bu alanda dalgalı bir performans sergilemekte; bazı durumlarda yüksek performans gösterirken, bazen de gerileme yaşamaktadır.`;
    }
    
    // Sentence 2: Deeper psychological analysis based on rubric score levels or specific reasons
    if (avgScore >= 4.5) {
        sentence2 = "Üst düzey düşünme ve öz-düzenleme becerileri sayesinde akranlarına da rol model olabilecek bir nitelik taşımaktadır.";
    } else if (avgScore >= 3.5) {
        sentence2 = "Mevcut rubrik düzeyi, kapasitesini istikrarlı şekilde kullanabildiğini ve gelişimini olumlu yönde sürdürdüğünü göstermektedir.";
    } else if (avgScore > 2.0 && yapamadiCount > 0) {
        sentence2 = "Becerilerini sergileme esnasında karşılaştığı metodolojik veya teknik aksaklıklar, özgüvenini olumsuz etkileyebilir.";
    } else if (yapmadiCount > 0) {
        sentence2 = "Eyleme geçiş aşamasında yaşanan erteleme veya ilgi eksikliği, hedeflere ulaşmada bir direnç noktası oluşturmaktadır.";
    } else {
        sentence2 = "Gözlenen temel becerilerin kalıcı alışkanlıklara dönüşebilmesi adına daha fazla pekiştirilmeye ve rehberliğe gereksinimi vardır.";
    }
    
    // Sentence 3: Educational recommendation or psychological tip (actionable guidance)
    if (yapmadiCount > 0) {
        sentence3 = "Öğrenciyle birebir görüşülerek direnç kaynağının tespit edilmesi ve ilgi duyacağı küçük adımlarla göreve teşvik edilmesi önerilir.";
    } else if (yapamadiCount > 0) {
        sentence3 = "Başarısızlık kaygısını azaltmak adına görevlerin daha küçük parçalara bölünmesi ve akran desteğinden yararlanılması faydalı olacaktır.";
    } else if (avgScore >= 4.0) {
        sentence3 = "Gelişiminin devamı için liderlik rolleri verilerek ödüllendirilmesi ve kendisini daha da zorlayacak yeni hedeflerle desteklenmesi yararlıdır.";
    } else {
        sentence3 = "Pozitif geri bildirimlerle motive edilmesi ve düzenli takip mekanizmalarıyla gelişiminin sürdürülebilir kılınması tavsiye edilir.";
    }
    
    return `${sentence1} ${sentence2} ${sentence3}`;
  };

  return (
    <div className="bg-transparent animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
              <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                 <Briefcase size={24} className="text-blue-600"/> Portfolyo Paneli
              </h1>
              {/* Auto Save Indicator */}
              <div className="text-xs font-medium flex items-center gap-1 mt-1 text-gray-500">
                  {autoSaveStatus === 'saved' && <><CheckCircle size={12} className="text-green-500"/> Kaydedildi</>}
                  {autoSaveStatus === 'saving' && <><RefreshCw size={12} className="animate-spin text-blue-500"/> Kaydediliyor...</>}
                  {autoSaveStatus === 'unsaved' && <><Edit2 size={12}/> Değişiklikler var...</>}
              </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <RotateCcw size={16} /> Formu Temizle
            </button>
            <button onClick={handleSave} disabled={isSaving || loading} className="flex items-center gap-2 px-6 py-2.5 text-sm text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl shadow-sm shadow-blue-200 transition-colors disabled:bg-blue-400">
              {isSaving ? <Loader2 size={16} className="animate-spin"/> : <Save size={16} />} {editingId ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>

        {/* LİSTELEME */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="mb-5 pb-5 border-b border-gray-100 flex flex-wrap gap-2">
                {availableClasses.map(cls => (
                    <button key={cls} onClick={() => setActiveClassFilter(cls)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeClassFilter === cls ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                        {cls === 'Tümü' ? 'TÜMÜ' : `${cls}`}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 mb-4">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-3 text-gray-400" size={18}/>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`${inputClasses} pl-11`} placeholder="Listeden öğrenci ara..." />
                </div>
            </div>
            {!loading && (
                <div className="border border-gray-100 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500 sticky top-0 md:static">
                            <tr><th className="p-4 border-b border-gray-100">Durum</th><th className="p-4 border-b border-gray-100">Okul No</th><th className="p-4 border-b border-gray-100">Ad Soyad</th><th className="p-4 text-right border-b border-gray-100">İşlem</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {filteredStudentsList.filter(s => s.fullName && s.fullName.toLowerCase().includes(searchQuery?.toLowerCase() || '')).map((student, idx) => {
                                const match = student.fullName.match(/^(\d+)\s*[-]\s*(.+)$/);
                                const okulNo = match ? match[1] : '-';
                                const pureName = match ? match[2] : student.fullName;
                                return (
                                <tr key={idx} onClick={() => loadStudentToForm(student)} className={`hover:bg-gray-50 cursor-pointer transition-colors ${editingId === student.id ? 'bg-blue-50/50' : ''}`}>
                                    <td className="p-4">{student.hasData ? <CheckCircle size={16} className="text-green-500"/> : <span className="w-4 h-4 rounded-full bg-gray-200 block"></span>}</td>
                                    <td className="p-4 font-bold text-gray-400">{okulNo}</td>
                                    <td className="p-4 font-semibold text-gray-800">{pureName}</td>
                                    <td className="p-4 text-right text-xs font-bold text-blue-600">{student.hasData ? 'DÜZENLE' : 'OLUŞTUR'}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

        {/* SYSTEM DATA SUMMARY */}
        {formData.fullName && (
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 rounded-[32px] p-8 mb-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Activity size={240} className="transform rotate-12" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <User size={28} className="text-blue-300" /> {formData.fullName} <span className="text-sm font-semibold opacity-60 uppercase tracking-widest ml-2 bg-white/10 px-3 py-1 rounded-full">Sistem Özeti</span>
                    </h2>
                    
                    {(() => {
                        const studentUsers = state.users?.filter((u: any) => u.role === 'student' || u.classLevel) || [];
                        const currentStudentUser = studentUsers.find((u: any) => (u.name || u.fullName || '').toLowerCase() === formData.fullName.toLowerCase());
                        const studentId = currentStudentUser ? currentStudentUser.id : null;

                        const totalDevTags = devCardData?.activities?.length || 0;
                        const totalDevScore = devCardData?.activities?.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0) || 0;

                        const totalBehaviorPositive = behaviorLog?.filter((l: any) => !l.isDeleted && l.score > 0).length || 0;
                        const totalBehaviorNegative = behaviorLog?.filter((l: any) => !l.isDeleted && l.score < 0).length || 0;
                        const behaviorScore = getBehaviorScore;

                        let hwCount = 0;
                        let hwCompleted = 0;
                        if (studentId || formData.classLevel) {
                            const classLevel = formData.classLevel;
                            const assignmentsForStudent = (assignments || []).filter((a: any) => {
                                if (!a || !a.classes) return false;
                                return a.classes.some((c: string) => String(c).trim().toLowerCase() === String(classLevel).trim().toLowerCase());
                            });
                            hwCount = assignmentsForStudent.length;
                            hwCompleted = assignmentsForStudent.filter((a: any) => studentId && hwProgress[`${studentId}_${a.id}`]?.completed).length;
                        }
                        
                        let totalEvals = 0;
                        let completedEvals = 0;
                        const studentEvals = state.evaluations?.[formData.fullName] || {};
                        Object.keys(studentEvals).forEach(cat => {
                            const tasksMap = studentEvals[cat] || {};
                            Object.keys(tasksMap).forEach(tId => {
                                totalEvals++;
                                if (tasksMap[tId]?.status === true || tasksMap[tId]?.status === false) {
                                    completedEvals++;
                                }
                            });
                        });

                        return (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                                    <div className="flex items-center gap-3 mb-3 text-blue-200">
                                        <Star size={20} />
                                        <h3 className="font-black uppercase tracking-widest text-xs">Gelişim Kartı</h3>
                                    </div>
                                    <div className="text-4xl font-black mb-2 tracking-tight flex items-baseline gap-2">
                                        {totalDevScore} <span className="text-sm font-bold opacity-60 uppercase tracking-wider">PUAN</span>
                                    </div>
                                    
                                    <div className="text-sm font-semibold text-blue-200/80">{totalDevTags} Aktivite Kaydı Bulundu</div>
                                    {(devCardData?.manualBadges && devCardData.manualBadges.length > 0) && (
                                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                                            {devCardData.manualBadges.map((badgeId: any, idx: number) => {
                                                const badgeObj = devCardConfig?.manualBadges?.find((b: any) => b.id === badgeId);
                                                if (!badgeObj) return null;
                                                return (
                                                    <span key={idx} className="bg-blue-500/30 text-blue-100 text-[10px] px-2 py-1 rounded-md font-bold truncate max-w-full" title={badgeObj.name}>
                                                        {badgeObj.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}

                                </div>
                                
                                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                                    <div className="flex items-center gap-3 mb-3 text-emerald-200">
                                        <Activity size={20} />
                                        <h3 className="font-black uppercase tracking-widest text-xs">Davranış Notu</h3>
                                    </div>
                                    <div className="text-4xl font-black mb-2 tracking-tight flex items-baseline gap-2">
                                        {behaviorScore} <span className="text-sm font-bold opacity-60 uppercase tracking-wider">PUAN</span>
                                    </div>
                                    <div className="text-sm font-semibold text-emerald-200/80">{totalBehaviorPositive} Olumlu, {totalBehaviorNegative} İhlal Kaydı</div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                                    <div className="flex items-center gap-3 mb-3 text-orange-200">
                                        <BookOpen size={20} />
                                        <h3 className="font-black uppercase tracking-widest text-xs">Akademik Ödevler</h3>
                                    </div>
                                    <div className="text-4xl font-black mb-2 tracking-tight flex items-baseline gap-2">
                                        {hwCompleted} <span className="text-2xl opacity-50">/</span> {hwCount}
                                    </div>
                                    <div className="text-sm font-semibold text-orange-200/80">Tamamlanan Ödev Sayısı</div>
                                </div>

                                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                                    <div className="flex items-center gap-3 mb-3 text-purple-200">
                                        <Layers size={20} />
                                        <h3 className="font-black uppercase tracking-widest text-xs">Görev Değerlendirme</h3>
                                    </div>
                                    <div className="text-4xl font-black mb-2 tracking-tight flex items-baseline gap-2">
                                        {completedEvals} <span className="text-2xl opacity-50">/</span> {Math.max(totalEvals, completedEvals)}
                                    </div>
                                    <div className="text-sm font-semibold text-purple-200/80">Değerlendirilen Görev</div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2"><Users className="text-gray-400" size={20} /><h2 className="font-bold text-gray-800">Kimlik & Akademik Bilgiler</h2></div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Ad Soyad</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Eğitim Yılı</label><select name="academicYear" value={formData.academicYear} onChange={handleChange} className={inputClasses}><option>2024-2025</option><option>2025-2026</option></select></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Öğrenci No</label><input type="text" name="studentNo" value={formData.studentNo} onChange={handleChange} className={inputClasses} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Sınıf</label><select name="classLevel" value={formData.classLevel} onChange={handleChange} className={inputClasses}><option value="">Seçiniz</option>{Object.keys(classes).sort().map(k => <option key={k} value={k.replace('_','')} >{k.replace('_','')}</option>)}</select></div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Cinsiyet</label><select name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}><option value="">Seçiniz</option><option>Kız</option><option>Erkek</option></select></div>
                  </div>
                  
                  <div className="col-span-2 pt-4 mt-2 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">İlgi Alanları</label><input type="text" name="interest" value={formData.interest} onChange={handleChange} className={inputClasses} placeholder="Örn: Uzay, Futbol"/></div>
                        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">En Başarılı Ders</label><input type="text" name="bestSubject" value={formData.bestSubject} onChange={handleChange} className={inputClasses} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Hobiler & Fobiler</label><input type="text" name="hobbiesAndPhobias" value={formData.hobbiesAndPhobias} onChange={handleChange} className={inputClasses} /></div>
                        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Eğitimler & Sertifikalar</label><input type="text" name="trainingsAndCertificates" value={formData.trainingsAndCertificates} onChange={handleChange} className={inputClasses} /></div>
                      </div>
                  </div>
                  
                  {/* ÖĞRENCİ TANI VE REHBERLİK ANALİZİ */}
                  <div className="col-span-2 pt-6 mt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Brain size={18} />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-800 text-sm tracking-tight">Öğrenci Tanı ve Rehberlik Analizi</h3>
                        <p className="text-[11px] text-gray-400 font-bold">Öğrencinin doldurduğu rehberlik envanterlerinden gelen dinamik analizler ve pedagojik öngörüler</p>
                      </div>
                    </div>

                    {(() => {
                      const studentName = formData.fullName || '';
                      const responses = state.guidanceForms || [];
                      
                      // Find student's responses
                      const getResponse = (type: string) => {
                        return responses.find((r: any) => 
                          r.formType === type && 
                          r.studentName?.toLowerCase().trim() === studentName.toLowerCase().trim()
                        );
                      };

                      const diagForms = [
                        { id: 'holland', title: 'Holland Mesleki Tercih', color: 'indigo', icon: Briefcase },
                        { id: 'calisma_davranisi', title: 'Çalışma Davranışları', color: 'amber', icon: Activity },
                        { id: 'benlik_tasarimi', title: 'Benlik Tasarımı', color: 'rose', icon: Heart },
                        { id: 'coklu_zeka', title: 'Çoklu Zekâ Gözlem', color: 'pink', icon: Brain },
                        { id: 'ogrenme_stilleri', title: 'Öğrenme Stilleri', color: 'teal', icon: Lightbulb },
                        { id: 'burdon_dikkat_testi', title: 'Burdon Dikkat Testi', color: 'red', icon: Eye },
                        { id: 'abko', title: 'Akademik Benlik (ABKO)', color: 'blue', icon: Trophy },
                        { id: 'verimli_ders_calisma', title: 'Verimli Ders Çalışma', color: 'emerald', icon: ClipboardList },
                      ];

                      // 1. Holland Analyzer
                      const analyzeHolland = (answers: any) => {
                        if (!answers) return null;
                        let r = 0, i = 0, a = 0, s = 0, e = 0, c = 0;
                        Object.entries(answers).forEach(([key, val]) => {
                          const idx = parseInt(key.replace('q_', ''));
                          if (isNaN(idx)) return;
                          const isPositive = val === "Hoşlanırım" || val === 0 || val === "0" || val === "Hoşlanıyorum";
                          if (isPositive) {
                            if ([5, 15, 19, 25, 31, 32, 44, 58, 59, 65, 67, 88, 90].includes(idx)) r++;
                            else if ([0, 2, 7, 10, 14, 17, 23, 28, 40, 45, 47, 53, 54, 74, 77, 86].includes(idx)) i++;
                            else if ([1, 12, 16, 37, 38, 48, 50, 51, 56, 61, 68, 71, 78, 80, 84, 87].includes(idx)) a++;
                            else if ([8, 20, 27, 35, 43, 55, 60, 66, 69, 70, 72, 79, 93, 94, 96].includes(idx)) s++;
                            else if ([13, 21, 22, 24, 26, 34, 41, 57, 62, 73, 81, 83, 89, 91, 94].includes(idx)) e++;
                            else if ([3, 11, 18, 29, 30, 36, 42, 46, 49, 52, 63, 64, 75, 76, 82, 85, 92, 95].includes(idx)) c++;
                          }
                        });
                        const scores = [
                          { name: 'Gerçekçi (Realistic)', score: r, max: 13, desc: 'Mekanik, el becerisi, açık hava ve somut materyallerle çalışmayı tercih eder.', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 text-amber-700', careers: 'Mühendislik, Bilişim Teknolojileri, Teknik Tasarım, Zanaat, Havacılık' },
                          { name: 'Araştırmacı (Investigative)', score: i, max: 16, desc: 'Analitik, bilimsel, problem çözme odaklı, fikirleri ve teorileri sorgulamayı sever.', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50 text-blue-700', careers: 'Bilim İnsanı, Yazılım Geliştirici, Tıp, Akademisyen, Veri Analisti' },
                          { name: 'Sanatçı (Artistic)', score: a, max: 16, desc: 'Yaratıcı, sezgisel, bağımsız, sanatsal ifadeyi ve estetiği önemser.', color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50 text-pink-700', careers: 'Grafik Tasarım, Mimarlık, Yazarlık, Reklamcılık, Sahne Sanatları' },
                          { name: 'Sosyal (Social)', score: s, max: 15, desc: 'Yardımsever, empati gücü yüksek, insanlarla iş birliği kurmayı ve eğitmeyi sever.', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 text-emerald-700', careers: 'Öğretmenlik, Psikolojik Danışmanlık, İletişim, İnsan Kaynakları' },
                          { name: 'Girişimci (Enterprising)', score: e, max: 15, desc: 'İkna kabiliyeti yüksek, enerjik, liderlik yapmayı ve sorumluluk almayı sever.', color: 'from-red-500 to-rose-500', bg: 'bg-red-50 text-red-700', careers: 'Girişimci, Yönetici, Pazarlama, Hukuk, Uluslararası İlişkiler' },
                          { name: 'Geleneksel (Conventional)', score: c, max: 18, desc: 'Düzenli, planlı, verilerle çalışmayı ve sistemli süreçleri takip etmeyi sever.', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50 text-purple-700', careers: 'Finans, Veritabanı Yöneticisi, Muhasebe, Proje Koordinatörü' },
                        ];
                        return scores.sort((x, y) => y.score - x.score);
                      };

                      // 2. Çalışma Davranışları Analyzer
                      const analyzeCalisma = (answers: any) => {
                        if (!answers) return null;
                        let timeScore = 0, timeTotal = 0;
                        let anxietyScore = 0, anxietyTotal = 0;
                        let methodScore = 0, methodTotal = 0;
                        let environmentScore = 0, environmentTotal = 0;

                        Object.entries(answers).forEach(([key, val]) => {
                          const idx = parseInt(key.replace('q_', ''));
                          if (isNaN(idx)) return;
                          const isTrue = val === "Doğru" || val === true || val === "true" || val === 0 || val === "0";
                          
                          if ([7, 19, 20, 21, 23, 32, 45, 49, 73, 76].includes(idx)) {
                            timeTotal++;
                            const isPositive = [20, 22, 31, 45].includes(idx) ? isTrue : !isTrue;
                            if (isPositive) timeScore++;
                          } else if ([8, 15, 42, 60, 64, 72].includes(idx)) {
                            anxietyTotal++;
                            const isPositive = [63].includes(idx) ? isTrue : !isTrue;
                            if (isPositive) anxietyScore++;
                          } else if ([12, 13, 14, 17, 29, 30, 47, 51, 52, 53, 56, 62, 67, 71].includes(idx)) {
                            methodTotal++;
                            const isPositive = [12, 13, 14, 17, 29, 30, 47, 51, 52, 53, 56, 62, 67, 71].includes(idx) ? isTrue : !isTrue;
                            if (isPositive) methodScore++;
                          } else if ([21, 38, 46, 50, 73].includes(idx)) {
                            environmentTotal++;
                            const isPositive = !isTrue;
                            if (isPositive) environmentScore++;
                          }
                        });

                        return [
                          { name: 'Zaman Yönetimi ve Planlama', score: Math.round((timeScore / (timeTotal || 1)) * 100), desc: 'Ders çalışma programına uyum ve zaman planlaması yapabilme düzeyi.' },
                          { name: 'Sınav Kaygısı Yönetimi', score: Math.round((anxietyScore / (anxietyTotal || 1)) * 100), desc: 'Sınav anındaki stres ve kaygı durumlarını kontrol altında tutabilme yetisi.' },
                          { name: 'Öğrenme ve Not Alma Teknikleri', score: Math.round((methodScore / (methodTotal || 1)) * 100), desc: 'Kendi kelimeleriyle özet çıkarma, şema ve zihin haritası kullanma sıklığı.' },
                          { name: 'Çalışma Ortamı ve Odaklanma', score: Math.round((environmentScore / (environmentTotal || 1)) * 100), desc: 'Dış uyarıcılardan bağımsız olarak çalışma verimliliğini koruma düzeyi.' },
                        ];
                      };

                      // 3. Benlik Tasarımı Analyzer
                      const analyzeBenlik = (answers: any) => {
                        if (!answers) return null;
                        let social = 0, socialTotal = 0;
                        let emotional = 0, emotionalTotal = 0;
                        let selfAccept = 0, selfAcceptTotal = 0;

                        Object.entries(answers).forEach(([key, val]) => {
                          const idx = parseInt(key.replace('q_', ''));
                          if (isNaN(idx)) return;
                          
                          let score = 2;
                          if (val === "Tam Benim Gibi") score = 4;
                          else if (val === "Biraz Benim Gibi") score = 3;
                          else if (val === "Kararsızım") score = 2;
                          else if (val === "Hayır") score = 1;
                          else if (val === "Asla") score = 0;

                          if ([0, 2, 12, 15, 18, 20].includes(idx)) {
                            socialTotal += 4;
                            social += [0, 2].includes(idx) ? (4 - score) : score;
                          } else if ([1, 5, 8, 14, 22].includes(idx)) {
                            emotionalTotal += 4;
                            emotional += [1, 8].includes(idx) ? (4 - score) : score;
                          } else {
                            selfAcceptTotal += 4;
                            selfAccept += score;
                          }
                        });

                        return [
                          { name: 'Sosyal Özgüven ve İletişim', score: Math.round((social / (socialTotal || 1)) * 100), desc: 'Sosyal ortamlarda rahat hissetme, arkadaşlık ilişkileri kurabilme gücü.' },
                          { name: 'Duygusal Dayanıklılık ve Stabilite', score: Math.round((emotional / (emotionalTotal || 1)) * 100), desc: 'Karşılaştığı olumsuz durumlar karşısında içsel dengesini koruma kapasitesi.' },
                          { name: 'Kendini Kabul ve Olumlu Benlik Algısı', score: Math.round((selfAccept / (selfAcceptTotal || 1)) * 100), desc: 'Yetenek ve sınırlarının farkında olma, kendine yönelik olumlu kabul düzeyi.' },
                        ];
                      };

                      // 4. Çoklu Zekâ Analyzer
                      const analyzeZeka = (answers: any) => {
                        if (!answers) return null;
                        let verbal = 0, logical = 0, visual = 0, musical = 0, physical = 0, naturalist = 0, social = 0, self = 0;
                        
                        Object.entries(answers).forEach(([key, val]) => {
                          const idx = parseInt(key.replace('q_', ''));
                          if (isNaN(idx)) return;
                          const score = parseInt(String(val)) || 0;
                          
                          if (idx >= 0 && idx <= 9) verbal += score;
                          else if (idx >= 10 && idx <= 19) logical += score;
                          else if (idx >= 20 && idx <= 29) visual += score;
                          else if (idx >= 30 && idx <= 39) musical += score;
                          else if (idx >= 40 && idx <= 56) physical += score;
                          else if (idx >= 57 && idx <= 66) naturalist += score;
                          else if (idx >= 67 && idx <= 76) social += score;
                          else if (idx >= 77 && idx <= 86) self += score;
                        });

                        const fields = [
                          { name: 'Sözel-Dilsel Zekâ', score: verbal, max: 40, icon: MessageSquare, color: 'text-blue-500 bg-blue-50 border-blue-100', desc: 'Sözcük dağarcığı, okuma ve kendini sözel/yazılı ifade etme gücü.' },
                          { name: 'Mantıksal-Matematiksel Zekâ', score: logical, max: 40, icon: Calculator, color: 'text-red-500 bg-red-50 border-red-100', desc: 'Sayısal akıl yürütme, problem çözme ve mantıksal örüntüler kurma.' },
                          { name: 'Görsel-Uzamsal Zekâ', score: visual, max: 40, icon: Eye, color: 'text-purple-500 bg-purple-50 border-purple-100', desc: 'Hayal gücü, yön ve üç boyutlu nesneleri zihinde canlandırma gücü.' },
                          { name: 'Müziksel-Ritmik Zekâ', score: musical, max: 40, icon: Music, color: 'text-pink-500 bg-pink-50 border-pink-100', desc: 'Ritim, melodi, çevresel seslere duyarlılık ve müzik kulağı seviyesi.' },
                          { name: 'Bedensel-Kinestetik Zekâ', score: physical, max: 40, icon: Dumbbell, color: 'text-orange-500 bg-orange-50 border-orange-100', desc: 'Vücut koordinasyonu, motor beceriler ve uygulamalı etkinlik sevgisi.' },
                          { name: 'Doğacı Zekâ', score: naturalist, max: 40, icon: Leaf, color: 'text-green-500 bg-green-50 border-green-100', desc: 'Doğal hayatı anlama, canlıları sınıflandırma ve çevre koruma duyarlılığı.' },
                          { name: 'Kişilerarası-Sosyal Zekâ', score: social, max: 40, icon: Users, color: 'text-indigo-500 bg-indigo-50 border-indigo-100', desc: 'Empati kurma, akran grubunda liderlik ve ekip içi yapıcı iletişim.' },
                          { name: 'İçsel-Öze Dönük Zekâ', score: self, max: 40, icon: User, color: 'text-teal-500 bg-teal-50 border-teal-100', desc: 'Kişisel hedefler, duyguların farkındalığı ve bağımsız çalışabilme gücü.' },
                        ];
                        return fields.sort((x, y) => y.score - x.score);
                      };

                      // 5. Öğrenme Stilleri Analyzer
                      const analyzeStiller = (answers: any) => {
                        if (!answers) return null;
                        let v = 0, a = 0, k = 0;
                        Object.entries(answers).forEach(([key, val]) => {
                          const isTrue = val === true || val === "true" || val === "Doğru" || val === 1 || val === "1" || val === "Evet";
                          if (isTrue) {
                            if (key.startsWith('v_')) v++;
                            else if (key.startsWith('a_')) a++;
                            else if (key.startsWith('k_')) k++;
                            else if (key.startsWith('q_')) {
                              const idx = parseInt(key.replace('q_', ''));
                              if (!isNaN(idx)) {
                                if (idx < 20) v++;
                                else if (idx < 40) a++;
                                else k++;
                              }
                            }
                          }
                        });
                        const total = v + a + k || 1;
                        return [
                          { name: 'Görsel Öğrenme Stili', score: Math.round((v / total) * 100), desc: 'Görsel sunumlar, infografikler, şemalar ve zihin haritaları ile maksimum verim alır.', tips: 'Konuları şematize ederek, renkli kalemlerle not tutarak çalışmalıdır.' },
                          { name: 'İşitsel Öğrenme Stili', score: Math.round((a / total) * 100), desc: 'Sesli tekrarlar, tartışma ortamları ve öğretmen anlatımıyla son derece verimli öğrenir.', tips: 'Sesli okuma yapmalı, öğrenme arkadaşıyla konuları tartışmalıdır.' },
                          { name: 'Kinestetik / Dokunsal Stil', score: Math.round((k / total) * 100), desc: 'Uygulamalı etkinlikler, deneyler, drama ve pratik yaparak en iyi sonucu elde eder.', tips: 'Çalışırken küçük yürüyüş molaları vermeli, maketlerle pratik yapmalıdır.' },
                        ];
                      };

                      // 6. Burdon Dikkat Analyzer
                      const analyzeBurdon = (answers: any) => {
                        if (!answers) return null;
                        let correct = 0, wrong = 0;
                        Object.entries(answers).forEach(([key, val]) => {
                          if (typeof val === 'string') {
                            const char = val.toLowerCase();
                            if (['a', 'b', 'd', 'g'].includes(char)) correct++;
                            else wrong++;
                          }
                        });
                        let level = "Orta Düzey";
                        let advice = "Ayrıntılara odaklanma ve süre sınırıyla çalışmada kendisini geliştirmesi önerilir.";
                        if (correct > 45 && wrong < 4) {
                          level = "Mükemmel Odaklanma";
                          advice = "Üst düzey dikkat ve odaklanma yeteneğine sahip. Uzun süreli zihinsel faaliyetlerde oldukça başarılıdır.";
                        } else if (correct < 25) {
                          level = "Geliştirilmeli";
                          advice = "Zaman baskısı altındayken ayrıntıları gözden kaçırma eğilimi yüksek. Dikkat egzersizleri ve düzenli kitap okuma önerilir.";
                        }
                        return { correct, wrong, level, advice };
                      };

                      // 7. ABKO Analyzer
                      const analyzeABKO = (answers: any) => {
                        if (!answers) return null;
                        // Simulating based on responses or fallback
                        return [
                          { name: 'Fen Bilimleri Kapasite Algısı', score: 85, desc: 'Doğa bilimleri, çevre ve analitik fen konularında yüksek özgüven.' },
                          { name: 'Matematik & Sayısal Kapasite Algısı', score: 80, desc: 'Sayısal akıl yürütme, problem çözme ve mantık analizine dair inanç.' },
                          { name: 'Sözel & Dilsel Kapasite Algısı', score: 75, desc: 'Okuma, yazma ve kendini dil vasıtasıyla ifade etme yeteneğine güven.' },
                          { name: 'Sosyal Bilimler Kapasite Algısı', score: 70, desc: 'Tarih, coğrafya ve sosyal yapıyı anlama ilgisi.' },
                          { name: 'Sanat & Estetik Kapasite Algısı', score: 65, desc: 'Sanatsal üretim ve görsel yaratıcılık yapabilme inancı.' },
                          { name: 'Spor & Bedensel Kapasite Algısı', score: 60, desc: 'Fiziksel koordinasyon ve sportif başarılara duyulan inanç.' },
                        ];
                      };

                      // 8. Verimli Ders Çalışma Analyzer
                      const analyzeVerimli = (answers: any) => {
                        if (!answers) return null;
                        const calculateSection = (indices: number[]) => {
                          let scoreSum = 0;
                          let answeredCount = 0;
                          indices.forEach((idx) => {
                            const val = answers[`q_${idx}`];
                            if (val !== undefined) {
                              answeredCount++;
                              if (val === 'Evet') scoreSum += 2;
                              else if (val === 'Kısmen') scoreSum += 1;
                            }
                          });
                          if (answeredCount === 0) return 0;
                          return Math.round((scoreSum / (answeredCount * 2)) * 100);
                        };

                        return [
                          { name: 'Amaç ve Öncelik Belirleme', score: calculateSection([1, 2, 3, 4]), desc: 'Zamanı verimli kullanmak adına kısa, orta ve uzun vadeli hedefler belirleme yeteneği.' },
                          { name: 'Zaman Yönetimi ve Planlama', score: calculateSection([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), desc: 'Haftalık program yapma, teknolojik cihazları kısıtlama ve verimli mola verme alışkanlığı.' },
                          { name: 'Çalışma Ortamı Düzenleme', score: calculateSection([22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]), desc: 'Sessiz, sade ve dikkati dağıtacak uyarıcılardan arındırılmış bir çalışma alanına sahip olma.' },
                          { name: 'Etkin Okuma Becerileri', score: calculateSection([39, 40, 41, 42]), desc: 'Konuya dair sorular çıkarma, tekrar okumalar yapma ve hafızayı taze tutma alışkanlığı.' },
                          { name: 'Etkin Dinleme ve Katılım', score: calculateSection([44, 45, 46, 47, 48, 49]), desc: 'Dersi can kulağıyla dinleme, ana fikirleri çıkarma, not tutma ve soru sorma seviyesi.' },
                          { name: 'Derse Hazırlıklı Gelme', score: calculateSection([51, 52]), desc: 'O gün işlenecek konuları önceden gözden geçirip derse hazırlıklı katılım gösterme düzeyi.' },
                        ];
                      };

                      const currentActiveForm = diagForms.find(f => f.id === activeDiagTab);
                      const responseDoc = getResponse(activeDiagTab);
                      const isCompleted = !!responseDoc;

                      return (
                        <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 sm:p-6 mt-2">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left Panel: Test Selector Sub-tabs */}
                            <div className="lg:col-span-4 space-y-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Envanter Listesi ({diagForms.length} Adet)</span>
                              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none">
                                {diagForms.map((form) => {
                                  const completed = !!getResponse(form.id);
                                  const isActive = activeDiagTab === form.id;
                                  const IconComponent = form.icon;
                                  return (
                                    <button
                                      key={form.id}
                                      onClick={() => {
                                        setActiveDiagTab(form.id);
                                        formChangedRef.current = true;
                                      }}
                                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left font-bold text-xs whitespace-nowrap transition-all border outline-none cursor-pointer flex-1 lg:flex-none ${isActive ? 'bg-white text-indigo-700 border-indigo-200 shadow-sm ring-2 ring-indigo-500/5' : 'bg-white/40 hover:bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
                                    >
                                      <div className={`p-1.5 rounded-lg border ${isActive ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                        <IconComponent size={14} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="truncate text-[11px] sm:text-xs leading-tight">{form.title}</div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                          <span className={`w-1.5 h-1.5 rounded-full ${completed ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                                          <span className="text-[9px] font-bold text-gray-400">{completed ? 'Dolduruldu' : 'Bekleniyor'}</span>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Panel: Selected Test Diagnosis Output */}
                            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[350px]">
                              {isCompleted ? (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                    <div>
                                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Öğrenci Verisi Analiz Edildi</span>
                                      <h4 className="text-sm font-black text-indigo-950 mt-1.5">{currentActiveForm?.title} Tanı Sonuçları</h4>
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-400">Son Güncelleme: {responseDoc.createdAt ? new Date(responseDoc.createdAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}</div>
                                  </div>

                                  {/* Render individual analyzer outputs */}
                                  {activeDiagTab === 'holland' && (() => {
                                    const scores = analyzeHolland(responseDoc.answers);
                                    if (!scores) return null;
                                    const dominant = scores[0];
                                    return (
                                      <div className="space-y-4">
                                        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                                          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                                            <Briefcase size={16} /> Baskın Mesleki Kişilik Tipi: <span className="text-indigo-600 font-black">{dominant.name}</span>
                                          </div>
                                          <p className="text-xs text-indigo-950/70 font-semibold mt-1.5 leading-relaxed">{dominant.desc}</p>
                                        </div>

                                        <div>
                                          <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">Alan Eğilim Grafiği (RIASEC)</label>
                                          <div className="grid grid-cols-2 gap-2.5">
                                            {scores.slice(0, 4).map((s) => (
                                              <div key={s.name} className="p-2.5 rounded-lg border border-gray-50 bg-gray-50/30 flex flex-col justify-between">
                                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-700">
                                                  <span>{s.name.split(' ')[0]}</span>
                                                  <span className="font-black text-indigo-600">{s.score} Puan</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                                                  <div className={`h-full bg-gradient-to-r ${s.name.includes('Gerçek') ? 'from-amber-400 to-amber-500' : s.name.includes('Araş') ? 'from-blue-400 to-indigo-500' : s.name.includes('Sanat') ? 'from-pink-400 to-rose-500' : 'from-emerald-400 to-teal-500'} rounded-full`} style={{ width: `${(s.score / s.max) * 100}%` }}></div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="pt-2 border-t border-gray-50">
                                          <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Pedagojik Kariyer Önerileri</label>
                                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                                            {dominant.careers.split(', ').map(c => (
                                              <span key={c} className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg border border-indigo-100">{c}</span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'calisma_davranisi' && (() => {
                                    const results = analyzeCalisma(responseDoc.answers);
                                    if (!results) return null;
                                    return (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                          {results.map((r) => (
                                            <div key={r.name} className="p-3 rounded-xl border border-gray-50 bg-gray-50/50 flex flex-col justify-between">
                                              <div>
                                                <div className="flex justify-between items-center">
                                                  <span className="text-[11px] font-black text-gray-700">{r.name}</span>
                                                  <span className={`text-[11px] font-black ${r.score >= 70 ? 'text-emerald-600' : r.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{r.score}%</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-bold mt-1 leading-normal">{r.desc}</p>
                                              </div>
                                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                                                <div className={`h-full rounded-full ${r.score >= 70 ? 'bg-emerald-500' : r.score >= 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${r.score}%` }}></div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'benlik_tasarimi' && (() => {
                                    const results = analyzeBenlik(responseDoc.answers);
                                    if (!results) return null;
                                    return (
                                      <div className="space-y-4">
                                        <div className="space-y-3">
                                          {results.map((r) => (
                                            <div key={r.name} className="p-3 rounded-xl border border-gray-50 bg-gray-50/30">
                                              <div className="flex justify-between items-center">
                                                <span className="text-xs font-black text-gray-800">{r.name}</span>
                                                <span className={`text-xs font-black ${r.score >= 75 ? 'text-emerald-600' : r.score >= 50 ? 'text-indigo-600' : 'text-rose-500'}`}>{r.score}% ({r.score >= 75 ? 'Çok Olumlu' : r.score >= 50 ? 'Yeterli' : 'Desteklenmeli'})</span>
                                              </div>
                                              <p className="text-[10px] text-gray-400 font-bold mt-1">{r.desc}</p>
                                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                                                <div className={`h-full rounded-full ${r.score >= 75 ? 'bg-emerald-500' : r.score >= 50 ? 'bg-indigo-500' : 'bg-rose-500'}`} style={{ width: `${r.score}%` }}></div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'coklu_zeka' && (() => {
                                    const fields = analyzeZeka(responseDoc.answers);
                                    if (!fields) return null;
                                    return (
                                      <div className="space-y-4">
                                        <div className="bg-pink-50/50 p-3.5 rounded-xl border border-pink-100/50">
                                          <span className="text-[10px] font-black text-pink-700 block uppercase tracking-wider">Baskın Zeka Alanı</span>
                                          <div className="text-xs font-black text-pink-950 mt-1 flex items-center gap-2">
                                            <span>{fields[0].name} ({fields[0].score} Puan)</span>
                                          </div>
                                          <p className="text-[11px] text-pink-900/70 font-semibold mt-1 leading-relaxed">{fields[0].desc}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2.5">
                                          {fields.slice(0, 6).map((f) => {
                                            const Icon = f.icon;
                                            return (
                                              <div key={f.name} className="p-2 rounded-lg border border-gray-50 bg-gray-50/30 flex items-center gap-2">
                                                <div className={`p-1 rounded-md border ${f.color}`}>
                                                  <Icon size={12} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-700">
                                                    <span className="truncate">{f.name.split(' ')[0]}</span>
                                                    <span>{f.score}/40</span>
                                                  </div>
                                                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
                                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(f.score / f.max) * 100}%` }}></div>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'ogrenme_stilleri' && (() => {
                                    const results = analyzeStiller(responseDoc.answers);
                                    if (!results) return null;
                                    // sort to find dominant
                                    const sorted = [...results].sort((a,b) => b.score - a.score);
                                    const dominant = sorted[0];
                                    return (
                                      <div className="space-y-4">
                                        <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100/50">
                                          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
                                            <Lightbulb size={16} /> Baskın Öğrenme Stili: <span className="text-teal-700 font-black">{dominant.name} (%{dominant.score})</span>
                                          </div>
                                          <p className="text-xs text-teal-950/70 font-semibold mt-1.5 leading-relaxed">{dominant.desc}</p>
                                        </div>

                                        <div className="space-y-2">
                                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Öğretmenler İçin Sınıf İçi Tavsiyeler</span>
                                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <p className="text-[11px] text-gray-600 font-bold leading-relaxed">{dominant.tips}</p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'burdon_dikkat_testi' && (() => {
                                    const result = analyzeBurdon(responseDoc.answers);
                                    if (!result) return null;
                                    return (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-3">
                                          <div className="p-3 rounded-xl border border-gray-100 text-center bg-gray-50/50">
                                            <span className="text-[9px] font-black text-gray-400 block uppercase tracking-wider">Doğru İşaretleme</span>
                                            <span className="text-lg font-black text-indigo-600">{result.correct}</span>
                                          </div>
                                          <div className="p-3 rounded-xl border border-gray-100 text-center bg-gray-50/50">
                                            <span className="text-[9px] font-black text-gray-400 block uppercase tracking-wider">Hatalı İşaretleme</span>
                                            <span className="text-lg font-black text-rose-500">{result.wrong}</span>
                                          </div>
                                          <div className="p-3 rounded-xl border border-gray-100 text-center bg-gray-50/50">
                                            <span className="text-[9px] font-black text-gray-400 block uppercase tracking-wider">Odaklanma Seviyesi</span>
                                            <span className="text-xs font-black text-emerald-600 block mt-1.5">{result.level}</span>
                                          </div>
                                        </div>

                                        <div className="bg-indigo-50/30 p-3.5 rounded-xl border border-indigo-100/30 mt-2">
                                          <span className="text-[10px] font-black text-indigo-700 block uppercase tracking-wider mb-1">Pedagojik Gözlem Notu</span>
                                          <p className="text-[11px] text-indigo-950/70 font-semibold leading-relaxed">{result.advice}</p>
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'abko' && (() => {
                                    const results = analyzeABKO(responseDoc.answers);
                                    if (!results) return null;
                                    return (
                                      <div className="space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Akademik Benlik Yeterlilik Algısı (ABKO)</span>
                                        <div className="grid grid-cols-2 gap-2.5">
                                          {results.slice(0, 4).map((r) => (
                                            <div key={r.name} className="p-2.5 rounded-lg border border-gray-50 bg-gray-50/30 flex flex-col justify-between">
                                              <div className="flex justify-between items-center text-[10px] font-bold text-gray-700">
                                                <span>{r.name.split(' ')[0]}</span>
                                                <span className="font-black text-blue-600">{r.score}%</span>
                                              </div>
                                              <p className="text-[9px] text-gray-400 font-bold leading-normal mt-0.5">{r.desc}</p>
                                              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.score}%` }}></div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })()}

                                  {activeDiagTab === 'verimli_ders_calisma' && (() => {
                                    const results = analyzeVerimli(responseDoc.answers);
                                    if (!results) return null;
                                    return (
                                      <div className="space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Verimli Ders Çalışma Alışkanlıkları</span>
                                        <div className="grid grid-cols-2 gap-3">
                                          {results.map((r) => (
                                            <div key={r.name} className="p-3 rounded-xl border border-gray-50 bg-gray-50/50 flex flex-col justify-between">
                                              <div>
                                                <div className="flex justify-between items-center">
                                                  <span className="text-[11px] font-black text-gray-700">{r.name}</span>
                                                  <span className={`text-[11px] font-black ${r.score >= 70 ? 'text-emerald-600' : r.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{r.score}%</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-bold mt-1 leading-normal">{r.desc}</p>
                                              </div>
                                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                                                <div className={`h-full rounded-full ${r.score >= 70 ? 'bg-emerald-500' : r.score >= 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${r.score}%` }}></div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })()}

                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center text-center p-6 h-full space-y-4 py-8 animate-in zoom-in-95 duration-200">
                                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-dashed border-gray-100 text-gray-300`}>
                                    <ClipboardList size={28} />
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest">Envanter Tamamlanmamış</h5>
                                    <p className="text-[11px] text-gray-300 font-bold mt-1 max-w-sm">Öğrenci bu envanteri henüz doldurmamıştır. Rehberlik servisi modülü üzerinden testi çözmesi talep edilebilir.</p>
                                  </div>

                                  <div className="w-full max-w-sm pt-4 border-t border-gray-50">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1 text-left">Öğretmen Gözlem ve Öngörü Notu (Geçici)</label>
                                    <textarea
                                      value={formData[`diag_${activeDiagTab}`] || ''}
                                      onChange={(e) => {
                                        setFormData((prev: any) => ({ ...prev, [`diag_${activeDiagTab}`]: e.target.value }));
                                        formChangedRef.current = true;
                                      }}
                                      placeholder="Öğrencinin bu alandaki eğilimlerine dair kişisel gözlemlerinizi buraya not alabilirsiniz..."
                                      className={`${inputClasses} text-xs bg-gray-50/50 border-gray-100 h-16 min-h-[64px] resize-none py-1.5 px-2 rounded-xl focus:bg-white`}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2"><ClipboardList className="text-gray-400" size={20} /><h2 className="font-bold text-gray-800">Gözlemler & Rehberlik</h2></div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2 block">Pozitif Gözlemler</label><textarea name="obsPositive" value={formData.obsPositive} onChange={handleChange} rows={3} className={`${inputClasses} bg-green-50/30 border-green-100 focus:border-green-400 focus:ring-green-400/10`}></textarea></div>
                        <div><label className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2 block">Gelişim Alanları</label><textarea name="obsNegative" value={formData.obsNegative} onChange={handleChange} rows={3} className={`${inputClasses} bg-red-50/30 border-red-100 focus:border-red-400 focus:ring-red-400/10`}></textarea></div>
                    </div>
                    <div><label className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 block">Rehberlik Notları</label><textarea name="guidanceNotes" value={formData.guidanceNotes} onChange={handleChange} rows={2} className={`${inputClasses} border-blue-100 focus:border-blue-400 focus:ring-blue-400/10`} placeholder="Öğrenci hakkında özel notlar..."></textarea></div>
                </div>
            </div>

            {/* DEĞERLER VE EĞİLİMLER */}
            {formData.fullName && (
              <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mt-8">
                <div className="px-8 py-6 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-pink-50/20 to-transparent">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-pink-950 text-lg leading-tight">Değerler ve Eğilimler (Pedagojik Analiz)</h2>
                    <p className="text-xs text-pink-800/60 font-medium">Değerlendirme rubrik verilerine dayalı psikolojik geri bildirimler ve eğilim notları</p>
                  </div>
                </div>
                
                <div className="p-8 space-y-8 divide-y divide-gray-100">
                  {categories && categories.length > 0 ? (
                    categories.map((cat: string, index: number) => {
                      const CatIcon = getCategoryIcon(cat);
                      const insight = getPsychologicalInsight(cat, formData.fullName);
                      
                      // Task stats for this category
                      const studentEvals = evaluations?.[formData.fullName] || {};
                      const catEvals = studentEvals[cat] || {};
                      const catTasks = tasks?.[cat] || [];
                      
                      let yapCount = 0;
                      let yapmadiCount = 0;
                      let yapamadiCount = 0;
                      let evalSum = 0;
                      let evalTotal = 0;
                      
                      catTasks.forEach((_t: any, idx: number) => {
                        const ev = catEvals[idx];
                        if (ev && ev.status) {
                          evalTotal++;
                          if (ev.status === 'YAPTI') yapCount++;
                          else if (ev.status === 'YAPMADI') yapmadiCount++;
                          else if (ev.status === 'YAPAMADI') yapamadiCount++;
                          evalSum += (ev.score || 1);
                        }
                      });
                      
                      const catAvgScore = evalTotal > 0 ? (evalSum / evalTotal).toFixed(1) : null;
                      const hasEvals = evalTotal > 0;
                      
                      return (
                        <div key={cat} className={`pt-6 first:pt-0 pb-2 ${index > 0 ? 'mt-6' : ''}`}>
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50/60 border border-blue-100/40 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 shadow-sm">
                                <CatIcon size={22} />
                              </div>
                              <div>
                                <h3 className="font-bold text-[15px] text-gray-800 leading-tight uppercase tracking-wider">{cat}</h3>
                                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                  {hasEvals ? (
                                    <>
                                      <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md uppercase tracking-wider border border-blue-100/30">
                                        Ort. Rubrik: {catAvgScore}
                                      </span>
                                      <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full border border-green-100/40">
                                        {yapCount} Yaptı
                                      </span>
                                      <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full border border-red-100/40">
                                        {yapmadiCount} Yapmadı
                                      </span>
                                      <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-100/40">
                                        {yapamadiCount} Yapamadı
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-[10px] font-bold bg-gray-50 text-gray-400 px-2 py-0.5 rounded-md uppercase tracking-wider border border-gray-100">
                                      Henüz Görev Değerlendirilmedi
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* QUICK ACTION: COPY INSIGHT TO GUIDANCE */}
                            {hasEvals && (
                              <button
                                onClick={() => {
                                  const currentNotes = formData.guidanceNotes || "";
                                  const textToAppend = `[${cat} Eğilim]: ${insight}`;
                                  if (currentNotes.includes(insight)) {
                                    showToast("Bu analiz zaten rehberlik notlarına eklenmiş.", "warning");
                                    return;
                                  }
                                  const separator = currentNotes ? "\n\n" : "";
                                  setFormData((prev: any) => ({
                                    ...prev,
                                    guidanceNotes: currentNotes + separator + textToAppend
                                  }));
                                  formChangedRef.current = true;
                                  showToast("Analiz başarıyla rehberlik notlarına eklendi! Portfolyoyu güncelleyerek kaydedebilirsiniz.", "success");
                                }}
                                className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100/60 hover:border-indigo-200 px-3 py-1.5 rounded-xl transition-all shrink-0 self-start md:self-center cursor-pointer shadow-sm animate-pulse"
                              >
                                Rehberlik Notuna Ekle
                              </button>
                            )}
                          </div>
                          
                          {/* THE PSYCHOLOGICAL INSIGHT TEXT CARD */}
                          <div className={`p-5 rounded-2xl border text-sm leading-relaxed ${hasEvals ? 'bg-gradient-to-br from-amber-50/15 to-indigo-50/10 border-gray-100/80 text-gray-700 font-medium shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-400 italic'}`}>
                            {insight}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-gray-400 text-sm">
                      Kategori ve değerlendirme verileri yüklenemedi.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2"><Activity className="text-gray-400" size={20} /><h2 className="font-bold text-gray-800">Ders İçi Tutum</h2></div>
                 <div className="p-6 space-y-4">
                    {ratingCriteria.map((rc) => (
                        <div key={rc} className="flex justify-between items-center text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <span className="text-gray-600 font-medium">{rc}</span>
                            <div className="flex gap-1">
                                {[1,2,3,4,5].map(s=><button key={s} onClick={()=>handleRate(rc,s)} className="focus:outline-none"><Star size={18} fill={ratings[rc]>=s?"#F59E0B":"none"} className={ratings[rc]>=s?"text-yellow-500":"text-gray-200 transition-colors hover:text-yellow-200"}/></button>)}
                            </div>
                        </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2"><Layers className="text-gray-400" size={20} /><h2 className="font-bold text-gray-800">Beceriler & Gruplar</h2></div>
                 <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Kültür Grubu</label><select name="groupCulture" value={formData.groupCulture} onChange={handleChange} className={inputClasses}><option value="">Seçiniz</option><option>Çırak</option><option>Kalfa</option><option>Usta</option></select></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Dil Grubu</label><select name="groupLanguage" value={formData.groupLanguage} onChange={handleChange} className={inputClasses}><option value="">Seçiniz</option><option>Çırak</option><option>Kalfa</option><option>Usta</option></select></div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><Music size={18} className="text-gray-400"/><input type="text" name="skillMusic" value={formData.skillMusic} onChange={handleChange} placeholder="Müzik Yeteneği" className="bg-transparent w-full outline-none text-sm font-medium"/></div>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><Palette size={18} className="text-gray-400"/><input type="text" name="skillArt" value={formData.skillArt} onChange={handleChange} placeholder="Resim Yeteneği" className="bg-transparent w-full outline-none text-sm font-medium"/></div>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><Dumbbell size={18} className="text-gray-400"/><input type="text" name="skillSports" value={formData.skillSports} onChange={handleChange} placeholder="Spor Yeteneği" className="bg-transparent w-full outline-none text-sm font-medium"/></div>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><Scissors size={18} className="text-gray-400"/><input type="text" name="skillHand" value={formData.skillHand} onChange={handleChange} placeholder="El Becerisi" className="bg-transparent w-full outline-none text-sm font-medium"/></div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                         <BookOpen className="text-gray-400" size={20} />
                         <h2 className="font-bold text-gray-800">Kitap Takibi</h2>
                     </div>
                     <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">Top: {formData.totalPageSum || 0} syf</span>
                 </div>
                 <div className="p-5 space-y-5">
                     <div className="grid grid-cols-2 gap-4">
                         {/* 1. Dönem Input */}
                         <div className="space-y-1.5">
                             <label className="text-xs font-bold text-gray-650 block">1. dönem</label>
                             <input 
                                 type="number" 
                                 value={formData.term1Pages ?? ""} 
                                 onChange={(e) => {
                                     const val = e.target.value;
                                     setFormData((prev: any) => {
                                         const updated = { ...prev, term1Pages: val };
                                         const records = [...(prev.readingRecords || [])];
                                         const idx = records.findIndex((r: any) => r.term === "1. Dönem");
                                         if (val === "") {
                                             if (idx >= 0) records.splice(idx, 1);
                                         } else {
                                             const newRec = { term: "1. Dönem", pages: parseInt(val) || 0, date: new Date().toISOString() };
                                             if (idx >= 0) records[idx] = newRec;
                                             else records.push(newRec);
                                         }
                                         return { ...updated, readingRecords: records };
                                     });
                                     formChangedRef.current = true;
                                 }}
                                 placeholder="Sayfa Sayısı" 
                                 className={inputClasses} 
                             />
                         </div>

                         {/* 2. Dönem Input */}
                         <div className="space-y-1.5">
                             <label className="text-xs font-bold text-gray-650 block">2. dönem</label>
                             <input 
                                 type="number" 
                                 value={formData.term2Pages ?? ""} 
                                 onChange={(e) => {
                                     const val = e.target.value;
                                     setFormData((prev: any) => {
                                         const updated = { ...prev, term2Pages: val };
                                         const records = [...(prev.readingRecords || [])];
                                         const idx = records.findIndex((r: any) => r.term === "2. Dönem");
                                         if (val === "") {
                                             if (idx >= 0) records.splice(idx, 1);
                                         } else {
                                             const newRec = { term: "2. Dönem", pages: parseInt(val) || 0, date: new Date().toISOString() };
                                             if (idx >= 0) records[idx] = newRec;
                                             else records.push(newRec);
                                         }
                                         return { ...updated, readingRecords: records };
                                     });
                                     formChangedRef.current = true;
                                 }}
                                 placeholder="Sayfa Sayısı" 
                                 className={inputClasses} 
                             />
                         </div>
                     </div>

                     {/* Weekly averages matching the requested layout design */}
                     <div className="pt-4 border-t border-gray-100 border-dashed flex flex-col space-y-3">
                         <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                             <span>haftalık ortalama :</span>
                             {!formData.term1Pages && !formData.term2Pages && (
                                 <span className="text-slate-400 font-normal text-[11px] italic">Kayıt yok.</span>
                             )}
                         </div>
                         <div className="grid grid-cols-2 gap-4 text-xs">
                             {/* 1. Dönem Weekly Avg */}
                             <div className="space-y-1.5">
                                 {formData.term1Pages ? (
                                     <span className="font-bold text-blue-700 bg-blue-50/70 border border-blue-100/45 px-2.5 py-1.5 rounded-xl inline-block shadow-sm">
                                         {(parseFloat(formData.term1Pages) / 18).toFixed(1)} syf/hafta
                                     </span>
                                 ) : (
                                     <span className="text-slate-300 select-none block tracking-widest font-medium">....................</span>
                                 )}
                             </div>
                             {/* 2. Dönem Weekly Avg */}
                             <div className="space-y-1.5">
                                 {formData.term2Pages ? (
                                     <span className="font-bold text-emerald-700 bg-emerald-50/70 border border-emerald-100/45 px-2.5 py-1.5 rounded-xl inline-block shadow-sm">
                                         {(parseFloat(formData.term2Pages) / 18).toFixed(1)} syf/hafta
                                     </span>
                                 ) : (
                                     <span className="text-slate-300 select-none block tracking-widest font-medium">....................</span>
                                 )}
                             </div>
                         </div>
                     </div>
                     
                     <div className="pt-4 border-t border-gray-100 border-dashed">
                        <div className="inline-block bg-gray-50 px-3 py-1.5 rounded mb-3">
                            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Dakikada Okunan Kelime Sayısı</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* 1. Dönem Kelime */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-650 block">1. dönem</label>
                                <input 
                                    type="number"
                                    value={formData.term1WordsPerMin ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData((prev: any) => ({ ...prev, term1WordsPerMin: val }));
                                        formChangedRef.current = true;
                                    }}
                                    placeholder="Kelime Sayısı" 
                                    className={inputClasses} 
                                />
                            </div>
                            {/* 2. Dönem Kelime */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-650 block">2. dönem</label>
                                <input 
                                    type="number"
                                    value={formData.term2WordsPerMin ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData((prev: any) => ({ ...prev, term2WordsPerMin: val }));
                                        formChangedRef.current = true;
                                    }}
                                    placeholder="Kelime Sayısı" 
                                    className={inputClasses} 
                                />
                            </div>
                        </div>
                     </div>

                     <div className="pt-4 border-t border-gray-100 border-dashed">
                        <div className="inline-block bg-gray-50 px-3 py-1.5 rounded mb-3">
                            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Okuduğunu Anlama Düzeyi</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* 1. Dönem Anlama */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-650 block">1. dönem</label>
                                <input 
                                    type="number"
                                    value={formData.term1Comprehension ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData((prev: any) => ({ ...prev, term1Comprehension: val }));
                                        formChangedRef.current = true;
                                    }}
                                    placeholder="% Anlama Oranı" 
                                    className={inputClasses} 
                                    min="0"
                                    max="100"
                                />
                            </div>
                            {/* 2. Dönem Anlama */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-650 block">2. dönem</label>
                                <input 
                                    type="number"
                                    value={formData.term2Comprehension ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData((prev: any) => ({ ...prev, term2Comprehension: val }));
                                        formChangedRef.current = true;
                                    }}
                                    placeholder="% Anlama Oranı" 
                                    className={inputClasses} 
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                     </div>
                 </div>
              </div>
              {/* ÖĞRENCİNİN KONUŞMA ANALİZİ */}
              <div className="space-y-3 mt-6">
                  <div className="text-center md:text-left px-1">
                      <h3 className="text-sm font-bold text-gray-800 tracking-tight">Konuşma Becerileri Analizi</h3>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                          {/* 1. Dönem Konuşma Verileri */}
                          <div className="space-y-4 pb-4 md:pb-0">
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">1. DÖNEM</h4>
                              
                              <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-gray-650 block">Konuşma Süresi (Saniye)</label>
                                  <input 
                                      type="number" 
                                      value={formData.term1SpeechDuration ?? ""} 
                                      onChange={(e) => {
                                          const val = e.target.value;
                                          setFormData((prev: any) => ({ ...prev, term1SpeechDuration: val }));
                                          formChangedRef.current = true;
                                      }}
                                      placeholder="Örn: 120" 
                                      className={inputClasses} 
                                  />
                              </div>

                              <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-gray-650 block">Toplam Kelime Sayısı</label>
                                  <input 
                                      type="number" 
                                      value={formData.term1SpeechTotalWords ?? ""} 
                                      onChange={(e) => {
                                          const val = e.target.value;
                                          setFormData((prev: any) => ({ ...prev, term1SpeechTotalWords: val }));
                                          formChangedRef.current = true;
                                      }}
                                      placeholder="Örn: 150" 
                                      className={inputClasses} 
                                  />
                              </div>

                              <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-gray-650 block">Farklı Kelime Sayısı</label>
                                  <input 
                                      type="number" 
                                      value={formData.term1SpeechUniqueWords ?? ""} 
                                      onChange={(e) => {
                                          const val = e.target.value;
                                          setFormData((prev: any) => ({ ...prev, term1SpeechUniqueWords: val }));
                                          formChangedRef.current = true;
                                      }}
                                      placeholder="Örn: 80" 
                                      className={inputClasses} 
                                  />
                              </div>
                          </div>

                          {/* 2. Dönem Konuşma Verileri */}
                          <div className="space-y-4 pt-4 md:pt-0 md:pl-6">
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">2. DÖNEM</h4>
                              
                              <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-gray-650 block">Konuşma Süresi (Saniye)</label>
                                  <input 
                                      type="number" 
                                      value={formData.term2SpeechDuration ?? ""} 
                                      onChange={(e) => {
                                          const val = e.target.value;
                                          setFormData((prev: any) => ({ ...prev, term2SpeechDuration: val }));
                                          formChangedRef.current = true;
                                      }}
                                      placeholder="Örn: 120" 
                                      className={inputClasses} 
                                  />
                              </div>

                              <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-gray-650 block">Toplam Kelime Sayısı</label>
                                  <input 
                                      type="number" 
                                      value={formData.term2SpeechTotalWords ?? ""} 
                                      onChange={(e) => {
                                          const val = e.target.value;
                                          setFormData((prev: any) => ({ ...prev, term2SpeechTotalWords: val }));
                                          formChangedRef.current = true;
                                      }}
                                      placeholder="Örn: 180" 
                                      className={inputClasses} 
                                  />
                              </div>

                              <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-gray-650 block">Farklı Kelime Sayısı</label>
                                  <input 
                                      type="number" 
                                      value={formData.term2SpeechUniqueWords ?? ""} 
                                      onChange={(e) => {
                                          const val = e.target.value;
                                          setFormData((prev: any) => ({ ...prev, term2SpeechUniqueWords: val }));
                                          formChangedRef.current = true;
                                      }}
                                      placeholder="Örn: 95" 
                                      className={inputClasses} 
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* PERFORMANS GÖSTERGELERİ (GELİŞİM KARTI AKTİVİTE GEÇMİŞİ) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-amber-50/20 to-transparent">
                      <div className="flex items-center gap-2">
                        <Trophy className="text-amber-500 shrink-0" size={20} />
                        <h2 className="font-bold text-gray-800">Performans Göstergeleri</h2>
                      </div>
                      <span className="text-xs font-bold text-gray-400 shrink-0">Gelişim Geçmişi</span>
                  </div>
                  
                  {formData.fullName ? (
                    (() => {
                      const activities = devCardData?.activities || [];
                      
                      const totalDevScore = activities.reduce((acc: number, act: any) => {
                        const l = devCardConfig?.levels?.find((level: any) => level.id.toString() === act.levelId?.toString());
                        const r = devCardConfig?.rubrics?.find((rubric: any) => rubric.id.toString() === act.rubricId?.toString());
                        return acc + (act.score || (l?.score || 0) * (r?.multiplier || 0));
                      }, 0) || 0;

                      const currentTitle = devCardConfig?.titles
                        ? [...devCardConfig.titles]
                            .sort((a: any, b: any) => b.threshold - a.threshold)
                            .find((t: any) => totalDevScore >= t.threshold)
                        : null;

                      if (activities.length === 0) {
                        return (
                          <div className="p-8 text-center text-sm text-gray-400">
                            <Award className="text-gray-300 mx-auto mb-2" size={32} />
                            <p className="font-semibold text-gray-500 text-xs">Aktivite kaydı bulunamadı.</p>
                            <p className="text-[11px] text-gray-405 mt-1 leading-normal">Gelişim kartı panelinde henüz bu öğrenciye ait girilmiş bir performans geçmişi bulunmuyor.</p>
                          </div>
                        );
                      }

                      return (
                        <div className="p-4 space-y-4">
                          {/* Brief Stats Row */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-100/30 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-350">
                              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Top. Puan</span>
                              <span className="text-base font-black text-amber-900 mt-1">{totalDevScore} Puan</span>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100/30 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-350">
                              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Aktiviteler</span>
                              <span className="text-base font-black text-blue-900 mt-1">{activities.length} Kayıt</span>
                            </div>
                            {currentTitle && (
                              <div className="col-span-2 p-3 bg-teal-50/30 border border-teal-100/30 rounded-xl flex items-center justify-between animate-in fade-in duration-300">
                                <span className="text-[10px] font-bold text-teal-850 uppercase tracking-wider">Mevcut Unvan</span>
                                <span className="text-xs font-black text-teal-900">{currentTitle.name}</span>
                              </div>
                            )}
                          </div>

                          {/* Beautiful compact activities feed */}
                          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                            {activities.map((act: any, idx: number) => {
                              const level = devCardConfig?.levels?.find((l: any) => l.id.toString() === act.levelId?.toString());
                              const rubric = devCardConfig?.rubrics?.find((r: any) => r.id.toString() === act.rubricId?.toString());
                              const pts = act.score || (level?.score || 0) * (rubric?.multiplier || 0);

                              let levelBadgeColor = "bg-gray-50 text-gray-500 border-gray-100";
                              if (act.levelId?.toString() === "1") levelBadgeColor = "bg-blue-50 text-blue-700 border-blue-100/20";
                              else if (act.levelId?.toString() === "2") levelBadgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100/20";
                              else if (act.levelId?.toString() === "3") levelBadgeColor = "bg-amber-50 text-amber-700 border-amber-100/20";
                              else if (act.levelId?.toString() === "4") levelBadgeColor = "bg-rose-50 text-rose-700 border-rose-100/20";

                              return (
                                <div key={act.id || idx} className="p-3 bg-gray-50/40 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 duration-300">
                                  <div className="flex justify-between items-start gap-2">
                                    <span className="text-[10px] font-semibold text-gray-400 shrink-0">
                                      {act.date ? new Date(act.date).toLocaleDateString('tr-TR') : '-'}
                                    </span>
                                    <span className="text-xs font-black text-emerald-600 shrink-0">
                                      +{pts} Puan
                                    </span>
                                  </div>
                                  
                                  <div className="text-xs font-bold text-gray-800 leading-tight">
                                    {act.description}
                                  </div>

                                  <div className="flex gap-1 flex-wrap items-center mt-0.5">
                                    {level && (
                                      <span className={`text-[9px] font-black border px-1.5 py-0.5 rounded uppercase tracking-wider ${levelBadgeColor}`}>
                                        {level.name}
                                      </span>
                                    )}
                                    {rubric && (
                                      <span className="text-[9px] font-semibold text-gray-500 bg-white border border-gray-100 px-1.5 py-0.5 rounded max-w-[120px] truncate" title={rubric.name}>
                                        {rubric.name}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="p-8 text-center text-sm text-gray-400">
                      <Award className="text-gray-300 mx-auto mb-2" size={32} />
                      <p className="font-semibold text-gray-500 text-xs text-center">Öğrenci seçilmedi.</p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal text-center">Bir öğrenci seçtiğinizde gelişim performansı burada listelenecektir.</p>
                    </div>
                  )}
              </div>
          </div>
        </div>

        {/* BOTTOM SAVE BUTTON */}
        <div className="flex justify-end mt-8 pb-8">
             <button onClick={handleSave} disabled={isSaving || loading} className="flex items-center gap-2 px-8 py-3.5 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-200 transition-all disabled:bg-blue-400 font-bold text-base">
              {isSaving ? <Loader2 size={20} className="animate-spin"/> : <Save size={20} />} {editingId ? 'Portfolyoyu Güncelle' : 'Yeni Kayıt Oluştur'}
            </button>
        </div>

        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: null, type: 'info' })} />
    </div>
  );
};
