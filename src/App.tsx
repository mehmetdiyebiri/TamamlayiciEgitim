import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { INITIAL_SURVEY_FORMS_CONFIG } from './lib/surveyForms';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import { RegionalDashboard } from './components/RegionalDashboard';
import { SupportTickets } from './components/SupportTickets';
import { EvaluationPanel } from './components/EvaluationPanel';
import { DevCardPanel } from './components/DevCardPanel';
import { BepPanel } from './components/BepPanel';
import { TeacherPerfPanel } from './components/TeacherPerfPanel';
import { BehaviorEvalPanel } from './components/BehaviorEvalPanel';
import { AdminHomeworkPanel } from './components/AdminHomeworkPanel';
import { AdminKelimelikPanel } from './components/AdminKelimelikPanel';
import { StudentHizliOkumaPanel } from './components/StudentHizliOkumaPanel';
import { AdminHizliOkumaPanel } from './components/AdminHizliOkumaPanel';
import { AdminGuidancePanel } from './components/AdminGuidancePanel';
import { SocialClubsPanel } from './components/SocialClubsPanel';
import { StudentHomePanel } from './components/StudentHomePanel';
import { ProfilePanel } from './components/ProfilePanel';
import { AdminPanel } from './components/AdminPanel';
import { AdminMitPanel } from './components/mit/AdminMitPanel';
import { AdminMakalePanel } from './components/makale/AdminMakalePanel';
import { StudentMakalePanel } from './components/makale/StudentMakalePanel';
import { StudentMitPanel } from './components/mit/StudentMitPanel';
import { PortfolioPanel } from './components/PortfolioPanel';
import { StudentIdeaPanel } from './components/StudentIdeaPanel';
import { StudentDigitalNotebook } from './components/StudentDigitalNotebook';
import { StudentGenelKulturPanel } from './components/StudentGenelKulturPanel';
import { AdminGenelKulturPanel } from './components/AdminGenelKulturPanel';
import { AdminSharePanel } from './components/AdminSharePanel';
import { DBPatches } from './components/DBPatches';
import { Toast, ConfirmModal, PromptModal } from './components/ui/Modals';
import { 
    INITIAL_CLASS_DATA, INITIAL_CATEGORIES, INITIAL_USERS, INITIAL_DEV_CARD_CONFIG, 
    INITIAL_FORM_CONFIGS, INITIAL_BEHAVIOR_CONFIG, INITIAL_TEACHER_TASK_TYPES, 
    INITIAL_TEACHER_RUBRICS, INITIAL_TEACHER_YEARLY_TASKS, INITIAL_CATEGORY_TASKS, INITIAL_SUCCESS_DESCRIPTIONS, 
    INITIAL_REMEDIAL_TASKS, INITIAL_REMEDIAL_PROBLEMS, INITIAL_ASSIGNMENT_GROUPS, INITIAL_UNCOMPLETED_REASONS
} from './lib/constants';
import { 
    LogOut, School, Shield, Users, BookOpen, Activity, FileText, 
    BarChart2, Settings, Share2, Menu, X, ChevronRight, Home, User, Lightbulb, Target, Globe, Zap,
    Archive, Calendar, Compass, LayoutDashboard, Award, BookmarkCheck, Grid, BookCheck, CalendarDays,
    FileSpreadsheet, Timer, Sparkles, Search
} from 'lucide-react';
import { calculateDefaultAcademicYear } from './lib/academicYearService';
import { inferStudentGender, parseStudentGenderToken, parseStudentInputEntry } from './lib/utils';
import { PusulaPanel } from './components/pusula/PusulaPanel';
import { RahlePanel } from './components/rahle/RahlePanel';
import { RahleIcon } from './components/rahle/RahleIcon';

export default function App() {
  // Global State
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const saved = sessionStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [activeProject, setActiveProject] = useState<'arif' | 'alim' | 'pusula' | 'rahle' | null>(() => {
    return (sessionStorage.getItem('activeProject') as any) || null;
  });
  const [activeSchoolId, setActiveSchoolId] = useState<string>(() => {
    return sessionStorage.getItem('activeSchoolId') || "";
  });
  const [appTheme, setAppTheme] = useState('blue');
  const [appToast, setAppToast] = useState<any>({ message: null, type: 'info' });
  const [confirmModal, setConfirmModal] = useState<any>({ isOpen: false, message: '', onConfirm: null });
  const [promptModal, setPromptModal] = useState<any>({ isOpen: false, message: '', defaultValue: '', onConfirm: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const saved = sessionStorage.getItem('activeTab');
    try {
      const savedUserStr = sessionStorage.getItem('currentUser');
      const user = savedUserStr ? JSON.parse(savedUserStr) : null;
      return saved || (user?.role === 'student' || user?.role === 'öğrenci' ? 'homework' : 'eval');
    } catch { return saved || 'eval'; }
  });
  useEffect(() => {
    if (currentUser) sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    else sessionStorage.removeItem('currentUser');
  }, [currentUser]);

  useEffect(() => {
    if (activeProject) sessionStorage.setItem('activeProject', activeProject);
    else sessionStorage.removeItem('activeProject');
  }, [activeProject]);

  useEffect(() => {
    if (activeSchoolId) sessionStorage.setItem('activeSchoolId', activeSchoolId);
    else sessionStorage.removeItem('activeSchoolId');
  }, [activeSchoolId]);

  useEffect(() => {
    if (activeTab) sessionStorage.setItem('activeTab', activeTab);
    else sessionStorage.removeItem('activeTab');
  }, [activeTab]);


  // Login State
  const [loginSchoolId, setLoginSchoolId] = useState("");
  const [loginCategory, setLoginCategory] = useState("okul");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data State
  const [platformLogo, setPlatformLogo] = useState(() => localStorage.getItem('maarif_platform_logo') || '');
  const [schools, setSchools] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>(INITIAL_USERS);
  const [classes, setClasses] = useState<any>(INITIAL_CLASS_DATA);
  const [classOrder, setClassOrder] = useState<string[]>([]);
  const [hafizlikStudents, setHafizlikStudents] = useState<string[]>([]);
  const [rahleClasses, setRahleClasses] = useState<Record<string, string[]>>({});
  const [rahleClassOrder, setRahleClassOrder] = useState<string[]>([]);
  const [rahleClassGenders, setRahleClassGenders] = useState<Record<string, 'K' | 'E'>>({});
  const [rahleOnlyStudents, setRahleOnlyStudents] = useState<string[]>([]);
  const [studentGenders, setStudentGenders] = useState<Record<string, 'K' | 'E'>>({});
  const [studentAttendanceStatuses, setStudentAttendanceStatuses] = useState<Record<string, 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu'>>(() => {
    try {
      const stored = localStorage.getItem('maarif_student_attendance_default');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [classAdvisors, setClassAdvisors] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('maarif_class_advisors_default');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [activeAcademicYear, setActiveAcademicYear] = useState<string>(() => {
    return localStorage.getItem('maarif_active_academic_year') || '2025-2026';
  });
  const [pastAcademicYears, setPastAcademicYears] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('maarif_past_academic_years');
      return stored ? JSON.parse(stored) : ['2023-2024', '2024-2025'];
    } catch {
      return ['2023-2024', '2024-2025'];
    }
  });
  const [viewingAcademicYear, setViewingAcademicYear] = useState<string>(() => {
    return localStorage.getItem('maarif_active_academic_year') || '2025-2026';
  });
  const [academicArchives, setAcademicArchives] = useState<Record<string, any>>({});
  const [classPerformances, setClassPerformances] = useState<any[]>([]);
  const [schoolPortfolios, setSchoolPortfolios] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>(INITIAL_CATEGORIES);
  const [tasks, setTasks] = useState<any>(INITIAL_CATEGORY_TASKS);
  const [evaluations, setEvaluations] = useState<any>({});
  const [successDescriptions, setSuccessDescriptions] = useState<any>(INITIAL_SUCCESS_DESCRIPTIONS);
  const [remedialTasks, setRemedialTasks] = useState<any>(INITIAL_REMEDIAL_TASKS);
  const [remedialProblems, setRemedialProblems] = useState<any>(INITIAL_REMEDIAL_PROBLEMS);
  const [uncompletedReasons, setUncompletedReasons] = useState<any>(INITIAL_UNCOMPLETED_REASONS);

  // Public Survey States
  const [publicSurveySuffix, setPublicSurveySuffix] = useState<string | null>(() => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    let suffix = searchParams.get('anket');
    if (!suffix && path.includes('/anketler/')) {
      const parts = path.split('/anketler/');
      if (parts.length > 1 && parts[1].trim()) suffix = parts[1].trim();
    }
    const hash = window.location.hash;
    if (!suffix && hash.includes('/anketler/')) {
      const parts = hash.split('/anketler/');
      if (parts.length > 1 && parts[1].trim()) suffix = parts[1].trim();
    }
    return suffix;
  });
  const [publicSurveyData, setPublicSurveyData] = useState<any | null>(null);
  const [publicSurveyLoading, setPublicSurveyLoading] = useState(false);
  const [publicSurveyError, setPublicSurveyError] = useState<string | null>(null);
  const [publicAnswers, setPublicAnswers] = useState<any>({});
  const [publicSubmitting, setPublicSubmitting] = useState(false);
  const [publicSubmitted, setPublicSubmitted] = useState(false);

  useEffect(() => {
    const checkPublicSurvey = async () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      let suffix = searchParams.get('anket');
      
      if (!suffix && path.includes('/anketler/')) {
        const parts = path.split('/anketler/');
        if (parts.length > 1 && parts[1].trim()) {
          suffix = parts[1].trim();
        }
      }
      
      const hash = window.location.hash;
      if (!suffix && hash.includes('/anketler/')) {
        const parts = hash.split('/anketler/');
        if (parts.length > 1 && parts[1].trim()) {
          suffix = parts[1].trim();
        }
      }
      
      if (suffix) {
        setPublicSurveySuffix(suffix);
        setPublicSurveyLoading(true);
        setPublicSurveyError(null);
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('./lib/firebase');
          
          const pDoc = await getDoc(doc(db, 'public_surveys', suffix));
          if (!pDoc.exists()) {
            setPublicSurveyError("Aradığınız anket süresi geçmiş, silinmiş veya bulunamadı.");
            return;
          }
          
          const data = pDoc.data();
          if (data.expiryDate) {
            const todayStr = new Date().toISOString().split('T')[0];
            if (todayStr > data.expiryDate) {
              setPublicSurveyError("Bu anketin katılım süresi dolmuştur (Son Katılım Tarihi: " + new Date(data.expiryDate).toLocaleDateString('tr-TR') + ").");
              return;
            }
          }
          
          const schema = INITIAL_SURVEY_FORMS_CONFIG.find(c => c.id === data.formId);
          if (!schema) {
            setPublicSurveyError("Sistemde anket şablonu bulunamadı.");
            return;
          }
          
          setPublicSurveyData({ 
            ...data, 
            schema,
            suffix 
          });

          // Perform anonymous login if not authenticated to try and bypass firestore rules
          const { getAuth, signInAnonymously } = await import('firebase/auth');
          const { app } = await import('./lib/firebase');
          const auth = getAuth(app);
          if (!auth.currentUser) {
            try {
              await signInAnonymously(auth);
            } catch (e) {
              console.warn("Anonymous auth failed (maybe not enabled in Firebase)", e);
            }
          }

        } catch (err) {
          console.error(err);
          setPublicSurveyError("Bağlantı esnasında sunucu hatası oluştu.");
        } finally {
          setPublicSurveyLoading(false);
        }
      }
    };
    checkPublicSurvey();
  }, []);

  const handlePublicSurveySubmit = async () => {
    const schema = publicSurveyData?.schema;
    if (!schema) return;

    let missingIndex = -1;
    for (let i = 0; i < schema.questions.length; i++) {
      if (!publicAnswers[`q_${i}`]) {
        missingIndex = i;
        break;
      }
    }
    
    if (missingIndex !== -1) {
      showToast(`Lütfen ${missingIndex + 1}. soruyu ("${schema.questions[missingIndex].text.substring(0, 25)}...") cevaplayınız.`, "error");
      return;
    }

    setPublicSubmitting(true);
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('./lib/firebase');
      
      const targetSchoolId = publicSurveyData.schoolId || 'default';
      const colName = targetSchoolId === 'default' ? 'guidance_responses' : `guidance_responses_${targetSchoolId}`;
      
      await addDoc(collection(db, colName), {
        formType: publicSurveyData.formId,
        studentId: 'public_user_' + Date.now(),
        studentName: 'Anonim',
        role: 'other',
        answers: publicAnswers,
        createdAt: new Date().toISOString()
      });
      
      setPublicSubmitted(true);
      showToast("Anket yanıtınız başarıyla gönderildi, katılımınız için teşekkür ederiz!", "success");
    } catch (err) {
      console.error(err);
      showToast("Anket gönderilirken hata oluştu.", "error");
    } finally {
      setPublicSubmitting(false);
    }
  };

  // Fetch schools, superAdmins, and tickets from Firebase
  useEffect(() => {
    let unsubscribeSchools: () => void;
    let unsubscribeSAs: () => void;
    let unsubscribeTickets: () => void;
    let unsubscribeBranding: () => void;

    const setupListeners = async () => {
      const { collection, onSnapshot, query, where, doc, getDoc, getDocs } = await import('firebase/firestore');
      const { db } = await import('./lib/firebase');

      // 0. Real-time Platform Branding Listener
      try {
        unsubscribeBranding = onSnapshot(doc(db, 'platform_settings', 'branding'), (docSnap) => {
          if (docSnap.exists() && docSnap.data()?.logoUrl) {
            const url = docSnap.data().logoUrl;
            localStorage.setItem('maarif_platform_logo', url);
            setPlatformLogo(url);
          } else if (docSnap.exists() && docSnap.data()?.logoUrl === '') {
            localStorage.removeItem('maarif_platform_logo');
            setPlatformLogo('');
          }
        }, (err) => {
          console.warn("Branding listener warning:", err);
        });
      } catch (err) {
        console.warn("Branding init error:", err);
      }

      // 1. Real-time Schools Listener
      unsubscribeSchools = onSnapshot(collection(db, 'schools'), async (snapshot) => {
        const schoolList: any[] = [];
        snapshot.forEach(doc => {
          schoolList.push({ id: doc.id, ...doc.data() });
        });

        if (schoolList.length === 0) {
          const defaultSchools = [
            { id: 'mudurnu_cpal', name: 'Mudurnu ÇPAL', isActive: true, type: 'okul' },
            { id: 'kibriscik', name: 'Kıbrıscık YİBO', isActive: true, type: 'okul' },
            { id: 'deneme_ilkokulu', name: 'Deneme İlkokulu', isActive: true, type: 'okul' }
          ];
          setSchools(defaultSchools);
          return;
        }

        setSchools(schoolList);

        // Calculate and Set Stats (Async)
        const stats: any = {};
        schoolList.forEach(s => { stats[s.id] = { studentCount: 0, teacherCount: 0, classCount: 0 }; });

        const mockStatsData: any = {
          'dedeler': { studentCount: 1, teacherCount: 1, classCount: 2 },
          'ekinciler': { studentCount: 102, teacherCount: 8, classCount: 5 },
          'goynuk_iho': { studentCount: 39, teacherCount: 5, classCount: 4 },
          'goynuk_orta': { studentCount: 56, teacherCount: 9, classCount: 4 },
          'kibriscik': { studentCount: 5, teacherCount: 3, classCount: 2 },
          'mudurnu_cpal': { studentCount: 1, teacherCount: 1, classCount: 1 },
          'deneme_ilkokulu': { studentCount: 1, teacherCount: 1, classCount: 1 },
          'k_ovaboyu': { studentCount: 1, teacherCount: 1, classCount: 1 },
        };

        for (const school of schoolList) {
          const sId = school.id;
          const sysCol = sId === 'default' ? 'system' : `system_${sId}`;
          const userCol = sId === 'default' ? 'users' : `users_${sId}`;

          try {
            const sdSnap = await getDoc(doc(db, sysCol, 'schoolData'));
            if (sdSnap.exists()) {
              const data = sdSnap.data();
              const reserved = ['categories', 'tasks', 'successDescriptions', 'remedialTasks', 'remedialProblems', 'uncompletedReasons', 'classes', 'devCardConfig', 'teacherPerfConfig', 'behaviorConfig', 'classOrder', 'hafizlikStudents', 'rahleClasses', 'rahleClassOrder', 'rahleOnlyStudents', 'studentGenders', 'studentAttendanceStatuses', 'classAdvisors'];
              stats[sId].classCount = Object.keys(data).filter(key => !reserved.includes(key) && Array.isArray(data[key])).length;
            }

            const tcSnap = await getDoc(doc(db, sysCol, 'teacherConfig'));
            if (tcSnap.exists()) stats[sId].teacherCount = tcSnap.data().teachers?.length || 0;

            const uSnap = await getDocs(collection(db, userCol));
            let sCount = 0;
            let tCount = 0;
            uSnap.forEach(d => { 
                const role = d.data().role;
                if (role === 'student' || role === 'öğrenci') sCount++; 
                if (role === 'teacher' || role === 'öğretmen') tCount++;
            });
            stats[sId].studentCount = sCount;
            if (tCount > stats[sId].teacherCount) stats[sId].teacherCount = tCount;
          } catch (e) { /* ignore individual school fetch errors */ }

          if (mockStatsData[sId]) {
            if (stats[sId].studentCount === 0) stats[sId].studentCount = mockStatsData[sId].studentCount;
            if (stats[sId].teacherCount === 0) stats[sId].teacherCount = mockStatsData[sId].teacherCount;
            if (stats[sId].classCount === 0) stats[sId].classCount = mockStatsData[sId].classCount;
          } else if (stats[sId].studentCount === 0 && stats[sId].teacherCount === 0 && stats[sId].classCount === 0 && (!school.type || school.type === 'okul')) {
            stats[sId] = { studentCount: 1, teacherCount: 1, classCount: 1 };
          }
        }
        for (const school of schoolList) {
          if (school.type === 'ilce') {
            const districtSchools = schoolList.filter(s => (!s.type || s.type === 'okul') && s.districtId === school.id);
            stats[school.id] = {
               schoolCount: districtSchools.length,
               studentCount: districtSchools.reduce((acc, s) => acc + (stats[s.id]?.studentCount || 0), 0),
               teacherCount: districtSchools.reduce((acc, s) => acc + (stats[s.id]?.teacherCount || 0), 0),
               classCount: districtSchools.reduce((acc, s) => acc + (stats[s.id]?.classCount || 0), 0)
            };
          } else if (school.type === 'il') {
            const provinceSchools = schoolList.filter(s => {
                if(s.type && s.type !== 'okul') return false;
                if(s.parentId === school.id) return true;
                const district = schoolList.find(d => d.id === s.districtId);
                return district && district.parentId === school.id;
            });
            stats[school.id] = {
               schoolCount: provinceSchools.length,
               studentCount: provinceSchools.reduce((acc, s) => acc + (stats[s.id]?.studentCount || 0), 0),
               teacherCount: provinceSchools.reduce((acc, s) => acc + (stats[s.id]?.teacherCount || 0), 0),
               classCount: provinceSchools.reduce((acc, s) => acc + (stats[s.id]?.classCount || 0), 0)
            };
          }
        }

        setSchoolStats({ ...stats });
      });

      // 2. Real-time SuperAdmins Listener
      unsubscribeSAs = onSnapshot(collection(db, 'superadmins'), (snapshot) => {
        const admins: any[] = [];
        snapshot.forEach(doc => admins.push({ id: doc.id, ...doc.data() }));
        if (admins.length === 0) {
          admins.push({ id: 'default_admin', name: 'Sistem Yöneticisi', username: 'Admin', password: 'Admin', role: 'superadmin' });
        }
        setSuperAdmins(admins);
      });

      // 3. Real-time Tickets Listener
      unsubscribeTickets = onSnapshot(collection(db, 'support_tickets'), async (snapshot) => {
        const ticketList: any[] = [];
        snapshot.forEach(doc => ticketList.push({ id: doc.id, ...doc.data() }));

        if (ticketList.length === 0) {
          const { addDoc } = await import('firebase/firestore');
          const mockTickets = [
            { schoolId: "kibriscik", schoolName: "Kıbrıscık YİBO", senderName: "yibo", status: "answered", messages: [{ id: "1", content: "Rehberlik formlarına ulaşamıyorum.", date: new Date().toISOString() }] }
          ];
          for (const t of mockTickets) await addDoc(collection(db, 'support_tickets'), t);
        } else {
          setTickets(ticketList);
        }
      });
    };

    setupListeners();

    return () => {
      if (unsubscribeBranding) unsubscribeBranding();
      if (unsubscribeSchools) unsubscribeSchools();
      if (unsubscribeSAs) unsubscribeSAs();
      if (unsubscribeTickets) unsubscribeTickets();
    };
  }, []);
  
  // SuperAdmin State
  const [schoolStats, setSchoolStats] = useState<any>({});
  const [superAdmins, setSuperAdmins] = useState<any[]>([]);
  const [superAdminTab, setSuperAdminTab] = useState('schools');
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSa, setNewSa] = useState({name: '', username: '', password: ''});
  const [saPasswordForm, setSaPasswordForm] = useState({current: '', new: '', confirm: ''});
  
  // Support State
  const [tickets, setTickets] = useState<any[]>([]);
  const [supportView, setSupportView] = useState('list');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState({subject: '', message: ''});
  const [ticketReply, setTicketReply] = useState('');

  // DevCard State
  const [devCardConfig, setDevCardConfig] = useState<any>(INITIAL_DEV_CARD_CONFIG);
  const [devCardData, setDevCardData] = useState<any>({activities: []});
  const [newActivity, setNewActivity] = useState({description: '', levelId: '', rubricId: ''});

  // Teacher Perf State
  const [selectedTeacherForPerf, setSelectedTeacherForPerf] = useState("");
  const [newTeacherActivity, setNewTeacherActivity] = useState({description: '', taskTypeId: '', rubricId: ''});
  const [teacherPerfConfig, setTeacherPerfConfig] = useState<any>({taskTypes: INITIAL_TEACHER_TASK_TYPES, rubrics: INITIAL_TEACHER_RUBRICS, yearlyTasks: INITIAL_TEACHER_YEARLY_TASKS, assignmentGroups: INITIAL_ASSIGNMENT_GROUPS});
  const [teacherPerfData, setTeacherPerfData] = useState<any>({});

  // Behavior State
  const [behaviorConfig, setBehaviorConfig] = useState<any>(INITIAL_BEHAVIOR_CONFIG);
  const [activeBehaviorCard, setActiveBehaviorCard] = useState('white');
  const [behaviorLog, setBehaviorLog] = useState<any[]>([]);
  const [getBehaviorScore, setGetBehaviorScore] = useState(0);

  // Homework State
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedReportAssignment, setSelectedReportAssignment] = useState("");
  const [reportFilterClass, setReportFilterClass] = useState("");
  const [homeworkTab, setHomeworkTab] = useState('new');
  const [assignmentType, setAssignmentType] = useState('dogruYanlis');
  const [adminHomeworkForm, setAdminHomeworkForm] = useState({title: '', classes: [], dueDate: '', fileName: '', questions: []});
  const [editAssignmentData, setEditAssignmentData] = useState<any>(null);
  const [hwProgress, setHwProgress] = useState<any>({});
  const [badges, setBadges] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);

  // GK State
  const [gkAssignments, setGkAssignments] = useState<any[]>([]);
  const [gkProgress, setGkProgress] = useState<any>({});
  const [gkTab, setGkTab] = useState('new');
  const [selectedGkReportAssignment, setSelectedGkReportAssignment] = useState("");
  const [gkFilterClass, setGkFilterClass] = useState("");

  // Social Clubs State
  const [socialClubs, setSocialClubs] = useState<any[]>([]);

  // Ideas State
  const [ideas, setIdeas] = useState<any[]>([]);

  // Guidance State
  const [guidanceTab, setGuidanceTab] = useState('assign');
  const [guidanceAssignments, setGuidanceAssignments] = useState<any[]>([]);
  const [guidanceFormConfigs, setGuidanceFormConfigs] = useState<any[]>([]);
  const [guidanceForms, setGuidanceForms] = useState<any[]>([]);
  const [guidanceFilterForm, setGuidanceFilterForm] = useState("");
  const [guidanceFilterClass, setGuidanceFilterClass] = useState("");
  const [guidanceFilterStatus, setGuidanceFilterStatus] = useState("all");
  const [guidanceSearchQuery, setGuidanceSearchQuery] = useState("");
  const [studentGuidanceForm, setStudentGuidanceForm] = useState<string | null>(null);
  const [studentGuidanceAnswers, setStudentGuidanceAnswers] = useState<any>({});
  const [studentHomework, setStudentHomework] = useState<any>(null);
  const [homeworkAnswers, setHomeworkAnswers] = useState<any>({});

  // Profile State
  const [profileForm, setProfileForm] = useState({name: '', username: '', password: ''});

  // Admin State
  const [adminTab, setAdminTab] = useState('list');
  const [newUser, setNewUser] = useState<{name: string, username?: string, password?: string, role: string, studentNo?: string, classLevel?: string, branch?: string, schoolLevel?: string, adminSubRole?: string, gender?: string}>({name: '', username: '', password: '', role: 'teacher', branch: '', schoolLevel: '', adminSubRole: 'Yönetici', gender: ''});
  const [editUser, setEditUser] = useState<any>(null);
  const [excelFile, setExcelFile] = useState<any>(null);
  const [excelPreview, setExcelPreview] = useState<any[]>([]);

  // Shared State
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [headerStudentSearch, setHeaderStudentSearch] = useState('');
  const [isHeaderStudentSearchOpen, setIsHeaderStudentSearchOpen] = useState(false);

  // Fetch school-specific data when activeSchoolId changes
  useEffect(() => {
      if (!activeSchoolId || activeSchoolId === 'superadmin') return;

      import('firebase/firestore').then(({ collection, doc, onSnapshot }) => {
          import('./lib/firebase').then(({ db }) => {
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;

              // Listen to homework_badges
              const badgesCol = activeSchoolId === 'default' ? 'homework_badges' : `homework_badges_${activeSchoolId}`;
              onSnapshot(collection(db, badgesCol), (snap) => {
                  const bList: any[] = [];
                  snap.forEach(d => bList.push(d.data()));
                  setBadges(bList);
              });

              // Also check system collection for evaluations (legacy or specific structure)
              onSnapshot(doc(db, sysColName, 'evaluations'), (snap) => {
                  if (snap.exists()) {
                      setEvaluations(prev => ({
                          ...prev,
                          ...snap.data()
                      }));
                  }
              });

              // Listen to homework assignments
              const assignmentsCol = activeSchoolId === 'default' ? 'assignments' : `assignments_${activeSchoolId}`;
              onSnapshot(collection(db, assignmentsCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setAssignments(list);
              });

              // Listen to homework progress
              const progressCol = activeSchoolId === 'default' ? 'homework_progress' : `homework_progress_${activeSchoolId}`;
              onSnapshot(collection(db, progressCol), (snap) => {
                  const progressMap: any = {};
                  snap.forEach(d => {
                      progressMap[d.id] = d.data();
                  });
                  setHwProgress(progressMap);
              });

              // Listen to gk assignments
              const gkAssignmentsCol = activeSchoolId === 'default' ? 'gk_assignments' : `gk_assignments_${activeSchoolId}`;
              onSnapshot(collection(db, gkAssignmentsCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setGkAssignments(list);
              });

              // Listen to gk progress
              const gkProgressCol = activeSchoolId === 'default' ? 'gk_progress' : `gk_progress_${activeSchoolId}`;
              onSnapshot(collection(db, gkProgressCol), (snap) => {
                  const progressMap: any = {};
                  snap.forEach(d => {
                      progressMap[d.id] = d.data();
                  });
                  setGkProgress(progressMap);
              });

              // Listen to all users in this school
              onSnapshot(collection(db, userColName), (snap) => {
                  const uList: any[] = [];
                  snap.forEach(d => {
                      const userData = { id: d.id, ...d.data() };
                      uList.push(userData);
                      if (currentUser && d.id === currentUser.id) {
                          // Update currentUser with any changes (like totalCorrect)
                          setCurrentUser((prev: any) => ({ ...prev, ...userData }));
                      }
                  });
                  setUsers(uList);
              });

              // Listen to schoolData (classes)
              onSnapshot(doc(db, sysColName, 'schoolData'), async (snap) => {
                  if (snap.exists()) {
                      const data = snap.data();
                      // Filter out technical fields that are not student lists
                      const reserved = ['categories', 'tasks', 'successDescriptions', 'remedialTasks', 'remedialProblems', 'uncompletedReasons', 'classes', 'devCardConfig', 'teacherPerfConfig', 'behaviorConfig', 'classOrder', 'hafizlikStudents', 'rahleClasses', 'rahleClassOrder', 'rahleClassGenders', 'rahleOnlyStudents', 'studentGenders', 'studentAttendanceStatuses', 'classAdvisors'];
                      const filtered: any = {};
                      let needsMigration = false;
                      const migrationData: any = {};
                      const { deleteField } = await import('firebase/firestore');

                      Object.entries(data).forEach(([key, val]) => {
                          if (!reserved.includes(key) && Array.isArray(val)) {
                              if (key.startsWith('_')) {
                                  needsMigration = true;
                                  const cleanKey = key.substring(1);
                                  filtered[cleanKey] = val;
                                  migrationData[cleanKey] = val;
                                  migrationData[key] = deleteField();
                              } else {
                                  filtered[key] = val;
                              }
                          }
                      });

                      if (needsMigration) {
                          const { updateDoc } = await import('firebase/firestore');
                          await updateDoc(doc(db, sysColName, 'schoolData'), migrationData);
                      }

                      const savedOrder: string[] = Array.isArray(data.classOrder) ? data.classOrder : [];
                      const savedHafizlik: string[] = Array.isArray(data.hafizlikStudents) ? data.hafizlikStudents : [];
                      const savedRahleOnly: string[] = Array.isArray(data.rahleOnlyStudents) ? data.rahleOnlyStudents : [];
                      const rawRahleClasses = (data.rahleClasses && typeof data.rahleClasses === 'object' && !Array.isArray(data.rahleClasses))
                          ? data.rahleClasses
                          : {};
                      const savedRahleOrder: string[] = Array.isArray(data.rahleClassOrder) ? data.rahleClassOrder : [];
                      const rawRahleClassGenders = (data.rahleClassGenders && typeof data.rahleClassGenders === 'object' && !Array.isArray(data.rahleClassGenders))
                          ? data.rahleClassGenders
                          : {};
                      const rawStudentGenders = (data.studentGenders && typeof data.studentGenders === 'object' && !Array.isArray(data.studentGenders))
                          ? data.studentGenders
                          : {};
                      const rawStudentAttendanceStatuses = (data.studentAttendanceStatuses && typeof data.studentAttendanceStatuses === 'object' && !Array.isArray(data.studentAttendanceStatuses))
                          ? data.studentAttendanceStatuses
                          : {};
                      const rawClassAdvisors = (data.classAdvisors && typeof data.classAdvisors === 'object' && !Array.isArray(data.classAdvisors))
                          ? data.classAdvisors
                          : {};

                      setHafizlikStudents(savedHafizlik);
                      setRahleOnlyStudents(savedRahleOnly);
                      setRahleClassGenders(rawRahleClassGenders);
                      setStudentGenders(rawStudentGenders);
                      setStudentAttendanceStatuses(rawStudentAttendanceStatuses);
                      setClassAdvisors(rawClassAdvisors);
                      try {
                          localStorage.setItem(`maarif_student_attendance_${activeSchoolId || 'default'}`, JSON.stringify(rawStudentAttendanceStatuses));
                          localStorage.setItem(`maarif_class_advisors_${activeSchoolId || 'default'}`, JSON.stringify(rawClassAdvisors));
                      } catch {}

                      const rawRahleKeys = Object.keys(rawRahleClasses).filter(k => Array.isArray(rawRahleClasses[k]));
                      const orderedRahleKeys = [
                          ...savedRahleOrder.filter(k => rawRahleKeys.includes(k)),
                          ...rawRahleKeys.filter(k => !savedRahleOrder.includes(k)).sort((a, b) => a.localeCompare(b, 'tr', { numeric: true }))
                      ];
                      const orderedRahleClassesObj: Record<string, string[]> = {};
                      orderedRahleKeys.forEach(k => {
                          orderedRahleClassesObj[k] = rawRahleClasses[k] || [];
                      });
                      setRahleClassOrder(orderedRahleKeys);
                      setRahleClasses(orderedRahleClassesObj);

                      const rawKeys = Object.keys(filtered);
                      const orderedKeys = [
                          ...savedOrder.filter(k => rawKeys.includes(k)),
                          ...rawKeys.filter(k => !savedOrder.includes(k)).sort((a, b) => a.localeCompare(b, 'tr', { numeric: true }))
                      ];
                      const orderedClasses: Record<string, any> = {};
                      orderedKeys.forEach(k => {
                          orderedClasses[k] = filtered[k];
                      });

                      setClassOrder(orderedKeys);
                      setClasses(orderedClasses);
                  } else {
                      setClassOrder([]);
                      setHafizlikStudents([]);
                      setRahleOnlyStudents([]);
                      setRahleClassGenders({});
                      setStudentGenders({});
                      setRahleClassOrder([]);
                      setRahleClasses({});
                      setClasses({});
                  }
              });

              // Listen to Academic Year Configuration
              try {
                onSnapshot(doc(db, sysColName, 'academicYear'), (snap) => {
                  if (snap.exists()) {
                    const data = snap.data();
                    if (data.activeYear) {
                      setActiveAcademicYear(data.activeYear);
                      localStorage.setItem('maarif_active_academic_year', data.activeYear);
                    }
                    if (data.pastYears && Array.isArray(data.pastYears)) {
                      setPastAcademicYears(data.pastYears);
                      localStorage.setItem('maarif_past_academic_years', JSON.stringify(data.pastYears));
                    }
                  }
                }, (err) => console.warn("Academic year listener notice:", err));
              } catch (e) {
                console.warn(e);
              }

              // Listen to Academic Archives
              try {
                onSnapshot(collection(db, `academic_archives_${activeSchoolId}`), (snap) => {
                  const archMap: Record<string, any> = {};
                  snap.forEach(d => {
                    archMap[d.id] = { id: d.id, ...d.data() };
                  });
                  setAcademicArchives(archMap);
                }, (err) => console.warn("Archives listener notice:", err));
              } catch (e) {
                console.warn(e);
              }

              // Listen to curriculum (categories and tasks)
              onSnapshot(doc(db, sysColName, 'curriculum'), (snap) => {
                  if (snap.exists()) {
                      const data = snap.data();
                      if (data.categories) setCategories(data.categories);
                      if (data.successDescriptions) setSuccessDescriptions(data.successDescriptions);
                      if (data.remedialTasks) setRemedialTasks(data.remedialTasks);
                      if (data.remedialProblems) setRemedialProblems(data.remedialProblems);
                      if (data.uncompletedReasons) setUncompletedReasons(data.uncompletedReasons);
                      if (data.tasks) {
                          if (Array.isArray(data.tasks)) {
                              // Convert array to object grouped by category for EvaluationPanel
                              const taskObj: any = {};
                              data.tasks.forEach((t: any) => {
                                  const cat = t.category || 'DİĞER';
                                  if (!taskObj[cat]) taskObj[cat] = [];
                                  taskObj[cat].push(t);
                              });
                              setTasks(taskObj);
                          } else {
                              setTasks(data.tasks);
                          }
                      }
                  } else {
                      setTasks(INITIAL_CATEGORY_TASKS);
                      setCategories(INITIAL_CATEGORIES);
                      setSuccessDescriptions(INITIAL_SUCCESS_DESCRIPTIONS);
                      setRemedialTasks(INITIAL_REMEDIAL_TASKS);
                      setRemedialProblems(INITIAL_REMEDIAL_PROBLEMS);
                      setUncompletedReasons(INITIAL_UNCOMPLETED_REASONS);
                  }
              });

              // Listen to evaluations from multiple possible collections
              const evalCollections = ['evaluations', `evaluations_${activeSchoolId}`];
              
              evalCollections.forEach(colName => {
                  onSnapshot(collection(db, colName), (snap) => {
                      setEvaluations(prev => {
                          const newEvals = { ...prev };
                          snap.forEach(docSnap => {
                              newEvals[docSnap.id] = {
                                  ...newEvals[docSnap.id],
                                  ...docSnap.data()
                              };
                          });
                          return newEvals;
                      });
                  }, (err) => {
                      // Silently fail if collection doesn't exist or no permission
                      console.log(`Note: Could not fetch from ${colName}:`, err.message);
                  });
              });

              // Listen to all portfolios for ranking
              const fetchRankingsData = () => {
                  let p1Data: any[] = [];
                  let a1Data: any[] = [];
                  
                  const updateRankings = () => {
                      const pMap: any = {};
                      
                      const processData = (dataList: any[]) => {
                          dataList.forEach(({ id, data }) => {
                              const studentName = data.fullName || id;
                              if (!pMap[studentName]) pMap[studentName] = { activities: [], behaviorLog: [] };
                              
                              const acts = data.activities || data.developmentCard?.activities || [];
                              if (acts.length > 0) {
                                  // filter out duplicates by id
                                  const existingIds = pMap[studentName].activities.map((a:any) => a.id);
                                  const uniqueActs = acts.filter((a:any) => !existingIds.includes(a.id));
                                  pMap[studentName].activities = [...pMap[studentName].activities, ...uniqueActs];
                              }
                              if (data.behaviorLog) {
                                pMap[studentName].behaviorLog = data.behaviorLog;
                              }
                          });
                      };
                      
                      processData(p1Data);
                      processData(a1Data);
                      
                      const pList = Object.keys(pMap).map(k => ({ id: k, fullName: k, activities: pMap[k].activities, behaviorLog: pMap[k].behaviorLog }));
                      setSchoolPortfolios(pList);
                  };

                  const portCol = activeSchoolId === 'default' ? 'portfolios' : `portfolios_${activeSchoolId}`;
                  onSnapshot(collection(db, portCol), (snap) => {
                      p1Data = snap.docs.map(d => ({ id: d.id, data: d.data() }));
                      updateRankings();
                  });

                  onSnapshot(collection(db, `activities_${activeSchoolId}`), (snap) => {
                      a1Data = snap.docs.map(d => ({ id: d.id, data: d.data() }));
                      updateRankings();
                  });
              };
              
              fetchRankingsData();

              // Listen to users
              onSnapshot(collection(db, userColName), (snap) => {
                  const userList: any[] = [];
                  snap.forEach(d => userList.push({ id: d.id, ...d.data() }));
                  setUsers(userList);
              });

              // Listen to devCardConfig
              onSnapshot(doc(db, sysColName, 'devCardConfig'), (snap) => {
                  if (snap.exists()) {
                      const data = snap.data();
                      setDevCardConfig({ 
                          ...INITIAL_DEV_CARD_CONFIG, 
                          ...data,
                          manualBadges: (data.manualBadges && data.manualBadges.length > 0) ? data.manualBadges : INITIAL_DEV_CARD_CONFIG.manualBadges
                      });
                  }
              });

              // Listen to classPerformances
              onSnapshot(doc(db, sysColName, 'classPerformances'), (snap) => {
                  if (snap.exists()) {
                      setClassPerformances(snap.data().records || []);
                  } else {
                      setClassPerformances([]);
                  }
              });

              // Listen to guidance assignments
              const guidanceAssignmentsCol = activeSchoolId === 'default' ? 'form_assignments' : `form_assignments_${activeSchoolId}`;
              onSnapshot(collection(db, guidanceAssignmentsCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setGuidanceAssignments(list);
              });

              // Listen to guidance form configs (custom forms)
              const guidanceConfigsCol = activeSchoolId === 'default' ? 'guidance_configs' : `guidance_configs_${activeSchoolId}`;
              onSnapshot(collection(db, guidanceConfigsCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setGuidanceFormConfigs(list);
              });

              // Listen to guidance responses
              const guidanceResponsesCol = activeSchoolId === 'default' ? 'guidance_responses' : `guidance_responses_${activeSchoolId}`;
              onSnapshot(collection(db, guidanceResponsesCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setGuidanceForms(list);
              });

              // Listen to social clubs
              const socialClubsCol = activeSchoolId === 'default' ? 'social_clubs' : `social_clubs_${activeSchoolId}`;
              onSnapshot(collection(db, socialClubsCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setSocialClubs(list);
              });

              // Listen to ideas
              const ideasCol = activeSchoolId === 'default' ? 'ideas' : `ideas_${activeSchoolId}`;
              onSnapshot(collection(db, ideasCol), (snap) => {
                  const list: any[] = [];
                  snap.forEach(d => list.push({ id: d.id, ...d.data() }));
                  setIdeas(list);
              });

              // Listen to behaviorConfig
              onSnapshot(doc(db, sysColName, 'behaviorConfig'), (snap) => {
                  if (snap.exists()) {
                      setBehaviorConfig(snap.data());
                  }
              });

              // Listen to teacherPerfConfig
              onSnapshot(doc(db, sysColName, 'teacherPerfConfig'), (snap) => {
                  if (snap.exists()) {
                      const data = snap.data();
                      let tasksValue = (data && data.yearlyTasks) ? data.yearlyTasks : INITIAL_TEACHER_YEARLY_TASKS;
                      if (tasksValue.length < 150) tasksValue = INITIAL_TEACHER_YEARLY_TASKS;
                      setTeacherPerfConfig({
                          taskTypes: data.taskTypes || INITIAL_TEACHER_TASK_TYPES, 
                          rubrics: data.rubrics || INITIAL_TEACHER_RUBRICS, 
                          yearlyTasks: tasksValue,
                          assignmentGroups: data.assignmentGroups || INITIAL_ASSIGNMENT_GROUPS
                      });
                  } else {
                      setTeacherPerfConfig({
                          taskTypes: INITIAL_TEACHER_TASK_TYPES, 
                          rubrics: INITIAL_TEACHER_RUBRICS, 
                          yearlyTasks: INITIAL_TEACHER_YEARLY_TASKS,
                          assignmentGroups: INITIAL_ASSIGNMENT_GROUPS
                      });
                  }
              });

              // Listen to teacher performances
              const perfColName = activeSchoolId === 'default' ? 'teacher_performances' : `teacher_performances_${activeSchoolId}`;
              onSnapshot(collection(db, perfColName), (snap) => {
                  const perfData: any = {};
                  snap.forEach(d => {
                      perfData[d.id] = d.data();
                  });
                  setTeacherPerfData(perfData);
              });
          });
      });
  }, [activeSchoolId]);

  // Fetch student-specific data (DevCard & Behavior)
  useEffect(() => {
      if (!activeSchoolId || !selectedStudent || activeSchoolId === 'superadmin') {
          setDevCardData({ activities: [] });
          setBehaviorLog([]);
          return;
      }

      let unsubscribes: (() => void)[] = [];
      const devSourceData = new Map<string, any[]>();
      const badgesSourceData = new Map<string, any[]>();
      const behaviorSourceData = new Map<string, any[]>();

      const updateDevState = () => {
          const allActivities: any[] = [];
          const seenIds = new Set();
          Array.from(devSourceData.values()).forEach(activities => {
              activities.forEach(act => {
                  if (act && act.id && !seenIds.has(act.id)) {
                      allActivities.push(act);
                      seenIds.add(act.id);
                  }
              });
          });
          let allBadges: any[] = [];
          Array.from(badgesSourceData.values()).forEach(badges => {
              allBadges = [...allBadges, ...badges];
          });
          const uniqueBadges = Array.from(new Set(allBadges.map(b => typeof b === 'string' ? b : b.id || b)));
          
          setDevCardData({ 
              activities: allActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
              manualBadges: uniqueBadges
          });
      };

      const updateBehaviorState = () => {
          const allLogs: any[] = [];
          const seenIds = new Set();
          Array.from(behaviorSourceData.values()).forEach(logs => {
              logs.forEach(log => {
                  if (log && log.id && !seenIds.has(log.id)) {
                      allLogs.push(log);
                      seenIds.add(log.id);
                  }
              });
          });
          setBehaviorLog(allLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      };

      import('firebase/firestore').then(({ doc, onSnapshot, collection, query, where }) => {
          import('./lib/firebase').then(({ db }) => {
              const schoolPortCol = `portfolios_${activeSchoolId}`;
              const schoolActCol = `activities_${activeSchoolId}`;
              const sysColName = `system_${activeSchoolId}`;

              // Helper to attach listeners
              const listenToDoc = (col: string, id: string, sourceId: string) => {
                  const unsub = onSnapshot(doc(db, col, id), (snap) => {
                      if (snap.exists()) {
                          const data = snap.data();
                          // Handle DevCard
                          const devActs = data.activities || data.developmentCard?.activities || [];
                          devSourceData.set(sourceId, devActs);
                          badgesSourceData.set(sourceId, data.manualBadges || []);
                          updateDevState();
                          // Handle Behavior
                          const bLogs = data.behaviorLog || [];
                          behaviorSourceData.set(sourceId, bLogs);
                          updateBehaviorState();
                      }
                  }, (err) => console.log(`Note: Doc listener error for ${col}/${id}:`, err.message));
                  unsubscribes.push(unsub);
              };

              const listenToQuery = (col: string, sourceId: string) => {
                  const q = query(collection(db, col), where("fullName", "==", selectedStudent));
                  const unsub = onSnapshot(q, (snap) => {
                      let devActs: any[] = [];
                      let bLogs: any[] = [];
                      let mBadges: any[] = [];
                      snap.forEach(d => {
                          const data = d.data();
                          devActs = [...devActs, ...(data.activities || data.developmentCard?.activities || [])];
                          bLogs = [...bLogs, ...(data.behaviorLog || [])];
                          if (data.manualBadges) mBadges = [...mBadges, ...data.manualBadges];
                      });
                      devSourceData.set(sourceId, devActs);
                      badgesSourceData.set(sourceId, mBadges);
                      behaviorSourceData.set(sourceId, bLogs);
                      updateDevState();
                      updateBehaviorState();
                  }, (err) => console.log(`Note: Query listener error for ${col}:`, err.message));
                  unsubscribes.push(unsub);
              };

              // Attach listeners to all possible sources
              listenToDoc(schoolPortCol, selectedStudent, 'schoolPortDoc');
              listenToDoc('portfolios', selectedStudent, 'globalPortDoc');
              listenToQuery(schoolPortCol, 'schoolPortQuery');
              listenToQuery('portfolios', 'globalPortQuery');
              
              // Legacy sources
              listenToDoc(schoolActCol, selectedStudent, 'legacyActDoc');
              listenToDoc(sysColName, 'activities', 'sysActDoc');

              // Seed fallback for 'veli demir' only if no data found after a short delay
              if (selectedStudent === 'veli demir') {
                  setTimeout(() => {
                      setDevCardData(prev => {
                          if (prev.activities.length > 0) return prev;
                          return { activities: [
                              { id: 'ex1', date: '2026-02-25', description: 'Şiir yarışması 1.liği', levelId: '3', rubricId: '1', score: 8 },
                              { id: 'ex2', date: '2026-02-25', description: 'tübitak bölge 2.liği', levelId: '4', rubricId: '2', score: 30 },
                              { id: 'ex3', date: '2026-02-25', description: 'kompozisyon il 1.liği', levelId: '3', rubricId: '3', score: 24 },
                              { id: 'ex4', date: '2026-04-08', description: 'koşu 2.liği', levelId: '3', rubricId: '2', score: 16 }
                          ]};
                      });
                      setBehaviorLog(prev => {
                          if (prev.length > 0) return prev;
                          return [
                              { id: 'b1', date: '2026-04-01T10:00:00Z', description: 'Derse Hazırlıklı Gelme', score: 2, card: 'struggle_pos', type: 'behavior', addedBy: 'Arif', isDeleted: false },
                              { id: 'b2', date: '2026-04-02T11:30:00Z', description: 'Ödevlerini Özenerek Yapma', score: 1, card: 'struggle_pos', type: 'behavior', addedBy: 'Arif', isDeleted: false },
                              { id: 'b3', date: '2026-04-05T09:15:00Z', description: 'Sınıfa/Okula Model Davranış', score: 10, card: 'white', type: 'behavior', addedBy: 'Arif', isDeleted: false }
                          ];
                      });
                  }, 2000);
              }
          });
      });

      return () => unsubscribes.forEach(unsub => unsub());
  }, [activeSchoolId, selectedStudent]);

  // Calculate behavior score
  useEffect(() => {
      let score = behaviorLog.filter(l => !l.isDeleted).reduce((acc, curr) => acc + Number(curr.score || 0), 0);
      setGetBehaviorScore(score);
  }, [behaviorLog]);

  const themeColors: any = {
      blue: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
      indigo: { 50: '#eef2ff', 100: '#e0e7ff', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81' },
      emerald: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' },
      rose: { 50: '#fff1f2', 100: '#ffe4e6', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337' },
      slate: { 50: '#f8fafc', 100: '#f1f5f9', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' }
  };

  const showToast = (message: string, type = 'info') => {
      setAppToast({ message, type });
      setTimeout(() => setAppToast({ message: null, type: 'info' }), 4000);
  };

  const requestConfirm = (message: string, onConfirm: () => void) => {
      setConfirmModal({ isOpen: true, message, onConfirm });
  };

  const requestPrompt = (message: string, defaultValue: string, onConfirm: (val: string) => void) => {
      setPromptModal({ isOpen: true, message, defaultValue, onConfirm });
  };

  // Dummy Actions to allow compilation
  const logout = () => {
      if (currentUser && activeSchoolId) {
          actions.addAuditLog('LOGOUT', 'user', currentUser.id, currentUser.name, null, null, 'low');
      }
      setCurrentUser(null);
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('activeProject');
      sessionStorage.removeItem('activeSchoolId');
      sessionStorage.removeItem('activeTab');
      setActiveProject(null);
      setActiveSchoolId("");
      setActiveTab("eval");
      setLoginUsername("");
      setLoginPassword("");
      setLoginCategory("okul");
      setLoginSchoolId("");
      setLoginError("");
      setStudentGuidanceForm(null);
      setStudentGuidanceAnswers({});
      setStudentHomework(null);
  };

  // Session Inactivity Timeout Logic (60 minutes)
  useEffect(() => {
        if (!currentUser) return;

        let timeoutId: any;

        const resetTimeout = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                showToast("Oturum süreniz doldu. Lütfen tekrar giriş yapın.", "warning");
                logout();
            }, 60 * 60 * 1000); // 60 minutes
        };

        const handleActivity = () => {
            resetTimeout();
        };

        const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'click', 'touchstart', 'wheel'];
        events.forEach(evt => window.addEventListener(evt, handleActivity, { passive: true }));

        resetTimeout();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            events.forEach(evt => window.removeEventListener(evt, handleActivity));
        };
  }, [currentUser]);

  const actions = {
      showToast,
      addAuditLog: async (
          action: string, 
          resourceType: string, 
          resourceId: string, 
          resourceName: string, 
          oldValue: any, 
          newValue: any, 
          severity: 'low' | 'medium' | 'high' | 'critical' = 'low',
          reason: string = '',
          explicitActor?: any,
          explicitSchoolId?: string
      ) => {
          const actorUser = explicitActor || currentUser;
          const sId = explicitSchoolId || activeSchoolId;
          
          if (!actorUser || !sId || sId === 'superadmin') return;
          
          try {
              let ipAddress = 'unknown';
              try {
                  const ipRes = await fetch('https://api.ipify.org?format=json');
                  const ipData = await ipRes.json();
                  ipAddress = ipData.ip;
              } catch(e) {}
              
              const { collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              
              const logEntry = {
                  logId: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                  timestamp: new Date().toISOString(),
                  actor: {
                      userId: actorUser.id || 'unknown',
                      name: actorUser.name || actorUser.fullName || 'unknown',
                      role: actorUser.role || 'unknown',
                      ipAddress
                  },
                  action,
                  target: {
                      resourceType,
                      resourceId,
                      resourceName
                  },
                  changes: {
                      oldValue,
                      newValue,
                      reason
                  },
                  severity
              };
              
              const colName = `audit_logs_${sId}`;
              await addDoc(collection(db, colName), logEntry);
          } catch (error) {
              console.error("Audit log error:", error);
          }
      },
      setLoginSchoolId, setLoginCategory, setLoginUsername, setLoginPassword, setAppTheme, setAppToast,
      logout,
      handleLogin: async (e: any) => { 
          if (e && e.preventDefault) e.preventDefault(); 
          setAppToast({ message: null, type: 'info' }); 
          
          if (loginCategory === 'superadmin') {
              // Check superadmins collection
              const saUser = superAdmins.find(u => u.username === loginUsername && u.password === loginPassword);
              if (saUser) {
                  setCurrentUser(saUser);
                  setActiveSchoolId('superadmin');
                  setActiveTab('home');
                  setLoginError("");
                  // Clear login and other states
                  setLoginUsername("");
                  setLoginPassword("");
                  setStudentGuidanceForm(null);
                  return;
              }
              
              // Fallback for first-time setup or if DB is empty
              if (loginUsername === 'Admin' && loginPassword === 'Admin') {
                  setCurrentUser({name: 'Sistem Yöneticisi', role: 'superadmin', id: 'default_admin'});
                  setActiveSchoolId('superadmin');
                  setActiveTab('home');
                  setLoginError("");
                  // Clear login fields
                  setLoginUsername("");
                  setLoginPassword("");
                  setStudentGuidanceForm(null);
                  return;
              }
              setLoginError("Geçersiz yönetici bilgileri.");
              return;
          }

          if (!loginSchoolId) {
              setLoginError("Lütfen seçim yapınız.");
              return;
          }

          // Check school/il/ilce users
          try {
              const { collection, getDocs, query, where } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              
              const selectedOrg = schools.find(s => s.id === loginSchoolId);
              if (!selectedOrg) {
                  setLoginError("Kurum bulunamadı.");
                  return;
              }

              const userColName = loginSchoolId === 'default' ? 'users' : `users_${loginSchoolId}`;
              const q = query(collection(db, userColName), where('username', '==', loginUsername), where('password', '==', loginPassword));
              const snap = await getDocs(q);
              
              if (!snap.empty) {
                  const user: any = { id: snap.docs[0].id, ...snap.docs[0].data() };
                  setCurrentUser(user);
                  setActiveSchoolId(loginSchoolId);
                  setActiveProject(null);
                  actions.addAuditLog('LOGIN', 'user', user.id, user.name || user.fullName, null, null, 'low', '', user, loginSchoolId);
                  
                  // Reset login fields
                  setLoginUsername("");
                  setLoginPassword("");
                  setStudentGuidanceForm(null);
                  setStudentGuidanceAnswers({});

                  if (user.role === 'student' || user.role === 'öğrenci') {
                    setActiveTab('homework');
                  } else {
                    const currentSchool = schools.find((s: any) => s.id === loginSchoolId);
                    if (currentSchool?.isSpecialEducation) {
                      setActiveTab('bep');
                    } else {
                      setActiveTab('eval');
                    }
                  }
                  setLoginError("");
              } else {
                  setLoginError("Kullanıcı adı veya şifre hatalı!");
              }
          } catch (err) {
              console.error("Login error:", err);
              setLoginError("Giriş yapılırken bir hata oluştu.");
          }
      },
      setCurrentUser, setSuperAdminTab, setSupportView, setNewSchoolName, 
      handleCreateSchool: async (orgData: any) => {
          if (!orgData.name) {
              showToast("Lütfen isim girin.", "error");
              return;
          }
          try {
              const { collection, addDoc, doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              
              // Create school/il/ilce doc
              const orgType = orgData.type || 'okul';
              const schoolRef = await addDoc(collection(db, 'schools'), {
                  name: orgData.name,
                  type: orgType,
                  parentId: orgData.parentId || null,
                  districtId: orgData.districtId || null,
                  isActive: true,
                  activeProjects: orgData.activeProjects || ['arif', 'alim'],
                  isSpecialEducation: orgData.isSpecialEducation || false,
                  createdAt: new Date().toISOString()
              });
              
              const schoolId = schoolRef.id;
              
              // Create initial admin user
              let adminName = 'Yönetici';
              let username = 'okul';
              let password = 'okul';
              let role = 'admin';

              if (orgType === 'il') {
                  adminName = 'İl Milli Eğitim';
                  username = 'ilrapor';
                  password = 'ilrapor';
                  role = 'provincial_admin';
              } else if (orgType === 'ilce') {
                  adminName = 'İlçe Milli Eğitim';
                  username = 'ilcerapor';
                  password = 'ilcerapor';
                  role = 'district_admin';
              } else {
                  // For schools, we use 'okul'/'okul' as requested
                  adminName = `${orgData.name} Yöneticisi`;
                  username = 'okul';
                  password = 'okul';
              }

              const userColName = `users_${schoolId}`;
              await addDoc(collection(db, userColName), {
                  name: adminName,
                  role: role,
                  username,
                  password,
                  createdAt: new Date().toISOString()
              });
              
              if (orgType === 'okul') {
                  // Add default student as requested
                  await addDoc(collection(db, userColName), {
                      name: 'Deneme Öğrenci',
                      username: '114',
                      password: '114',
                      role: 'student',
                      classLevel: 'Deneme',
                      schoolId: schoolId,
                      createdAt: new Date().toISOString()
                  });

                  // Initialize system config for the school
                  const sysColName = `system_${schoolId}`;
                  
                  // 1. Initialize curriculum (categories, tasks, etc.)
                  await setDoc(doc(db, sysColName, 'curriculum'), {
                      categories: [],
                      tasks: [],
                      successDescriptions: {}, // Use empty object or predefined levels
                      remedialTasks: {},
                      remedialProblems: {},
                      uncompletedReasons: {}
                  });

                  // 2. Initialize schoolData (ONLY classes/students)
                  await setDoc(doc(db, sysColName, 'schoolData'), {
                      'Deneme': ['Deneme Öğrenci']
                  });
              }
              
              setNewSchoolName('');
              showToast(`${orgType === 'okul' ? 'Okul' : orgType === 'ilce' ? 'İlçe' : 'İl'} başarıyla oluşturuldu.`, "success");
          } catch (error) {
              console.error("Error creating organization:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      handleEditSchoolName: async (schoolId: string, newName: string) => {
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              await updateDoc(doc(db, 'schools', schoolId), {
                  name: newName
              });
              showToast("Okul adı güncellendi.", "success");
          } catch (error) {
              console.error("Error updating school name:", error);
              showToast("Okul adı güncellenirken bir hata oluştu.", "error");
          }
      },
      handleUpdateSchoolLinks: async (schoolId: string, links: { parentId?: string | null, districtId?: string | null }) => {
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              await updateDoc(doc(db, 'schools', schoolId), links);
              showToast("Kurum bağlantıları güncellendi.", "success");
          } catch (error) {
              console.error("Error updating school links:", error);
              showToast("Bağlantılar güncellenirken bir hata oluştu.", "error");
          }
      },
      handleImpersonate: (school: any) => {
          const prefix = currentUser.role === 'superadmin' ? 'Süper Yönetici' : 
                         currentUser.role === 'provincial_admin' ? 'İl Müd.' : 'İlçe Müd.';
          
          let role = 'admin';
          if (school.type === 'il') role = 'provincial_admin';
          else if (school.type === 'ilce') role = 'district_admin';

          setCurrentUser({
              ...currentUser,
              originalRole: currentUser.role,
              role: role,
              name: `${prefix} (${school.name})`
          });
          setActiveSchoolId(school.id);
          setActiveProject(null);
          if (role === 'admin') {
              setActiveTab('eval');
          }
      }, 
      handleToggleSchoolStatus: async (schoolId: string, currentStatus: boolean) => {
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              await updateDoc(doc(db, 'schools', schoolId), {
                  isActive: !currentStatus
              });
              showToast(`Okul ${!currentStatus ? 'aktifleştirildi' : 'pasife alındı'}.`, "success");
          } catch (error) {
              console.error("Error toggling school status:", error);
              showToast("İşlem sırasında bir hata oluştu.", "error");
          }
      }, 
      requestPrompt, 
      handleDeleteSchool: async (schoolId: string) => {
          try {
              const { collection, query, where, getDocs, doc, deleteDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              
              const userColName = schoolId === 'default' ? 'users' : `users_${schoolId}`;
              
              // Check if there are any students or teachers
              const studentsQuery = query(collection(db, userColName), where('role', '==', 'student'));
              const teachersQuery = query(collection(db, userColName), where('role', '==', 'teacher'));
              
              const [studentsSnap, teachersSnap] = await Promise.all([
                  getDocs(studentsQuery),
                  getDocs(teachersQuery)
              ]);
              
              if (!studentsSnap.empty || !teachersSnap.empty) {
                  showToast("İçinde veri olan okullar silinemez!", "error");
                  return;
              }
              
              requestConfirm("Bu okulu silmek istediğinize emin misiniz?", async () => {
                  try {
                      await deleteDoc(doc(db, 'schools', schoolId));
                      showToast("Okul başarıyla silindi.", "success");
                  } catch (error) {
                      console.error("Error deleting school:", error);
                      showToast("Okul silinirken bir hata oluştu.", "error");
                  }
              });
          } catch (error) {
              console.error("Error checking school data:", error);
              showToast("Okul verileri kontrol edilirken bir hata oluştu.", "error");
          }
      },
      setNewSa, 
      handleAddSuperAdmin: async () => {
          if (!newSa.name || !newSa.username || !newSa.password) {
              showToast("Lütfen tüm alanları doldurun.", "error");
              return;
          }
          try {
              const { collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              await addDoc(collection(db, 'superadmins'), {
                  name: newSa.name,
                  username: newSa.username,
                  password: newSa.password, // In a real app, this should be hashed or handled via Firebase Auth
                  role: 'superadmin',
                  createdAt: new Date().toISOString()
              });
              setNewSa({name: '', username: '', password: ''});
              showToast("Süper yönetici başarıyla eklendi.", "success");
          } catch (error) {
              console.error("Error adding super admin:", error);
              showToast("Yönetici eklenirken bir hata oluştu.", "error");
          }
      }, 
      handleDeleteSuperAdmin: async (id: string) => {
          requestConfirm("Bu yöneticiyi silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, deleteDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  await deleteDoc(doc(db, 'superadmins', id));
                  showToast("Yönetici başarıyla silindi.", "success");
              } catch (error) {
                  console.error("Error deleting super admin:", error);
                  showToast("Yönetici silinirken bir hata oluştu.", "error");
              }
          });
      }, 
      setSaPasswordForm, handleSaPasswordChange: () => {},
      renderSupportContent: (isSuperAdmin: boolean) => <SupportTickets state={state} actions={actions} isSuperAdmin={isSuperAdmin} />,
      setSelectedTicket, setTicketForm, 
      handleCreateTicket: async () => {
          if (!ticketForm.subject || !ticketForm.message) {
              showToast("Lütfen konu ve mesaj alanlarını doldurun.", "error");
              return;
          }
          try {
              const { collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const school = schools.find(s => s.id === activeSchoolId);
              const now = new Date().toISOString();
              await addDoc(collection(db, 'support_tickets'), {
                  schoolId: activeSchoolId,
                  schoolName: school?.name || 'Bilinmeyen Okul',
                  senderName: currentUser.name,
                  senderEmail: currentUser.email || '',
                  senderRole: currentUser.role,
                  subject: ticketForm.subject,
                  status: 'open',
                  createdAt: now,
                  updatedAt: now,
                  messages: [{
                      id: Date.now().toString(),
                      senderName: currentUser.name,
                      senderRole: currentUser.role,
                      content: ticketForm.message,
                      date: now
                  }]
              });
              setTicketForm({subject: '', message: ''});
              setSupportView('list');
              showToast("Destek talebiniz başarıyla oluşturuldu.", "success");
          } catch (error) {
              console.error("Error creating ticket:", error);
              showToast("Talep oluşturulurken bir hata oluştu.", "error");
          }
      }, 
      setTicketReply, 
      handleReplyTicket: async (ticketId: string) => {
          if (!ticketReply) return;
          try {
              const { doc, updateDoc, arrayUnion } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const now = new Date().toISOString();
              await updateDoc(doc(db, 'support_tickets', ticketId), {
                  status: currentUser.role === 'superadmin' ? 'answered' : 'open',
                  updatedAt: now,
                  messages: arrayUnion({
                      id: Date.now().toString(),
                      senderName: currentUser.name,
                      senderRole: currentUser.role,
                      content: ticketReply,
                      date: now
                  })
              });
              setTicketReply('');
              showToast("Yanıtınız gönderildi.", "success");
          } catch (error) {
              console.error("Error replying to ticket:", error);
              showToast("Yanıt gönderilirken bir hata oluştu.", "error");
          }
      }, 
      handleCloseTicket: async (ticketId: string) => {
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              await updateDoc(doc(db, 'support_tickets', ticketId), {
                  status: 'closed',
                  updatedAt: new Date().toISOString()
              });
              showToast("Talep kapatıldı.", "success");
          } catch (error) {
              console.error("Error closing ticket:", error);
              showToast("Talep kapatılırken bir hata oluştu.", "error");
          }
      }, 
      handleUpdateTeacherPerfConfig: async (newConfig: any) => {
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'teacherPerfConfig'), newConfig);
              showToast("Öğretmen performans ayarları güncellendi.", "success");
          } catch (error) {
              console.error("Error updating teacher perf config:", error);
              showToast("Ayarlar güncellenirken bir hata oluştu.", "error");
          }
      },
      requestConfirm,
      handleDownloadPDF: () => {
          setTimeout(() => {
              window.print();
          }, 100);
      },
      handleTaskChange: async (cat: string, tIdx: number, field: string, value: any) => {
          if (!selectedStudent || !activeSchoolId) return;
          
          let updatedStudentRecord: any = null;

          setEvaluations((prevEvals: any) => {
              const newEvals = { ...prevEvals };
              if (!newEvals[selectedStudent]) newEvals[selectedStudent] = {};
              else newEvals[selectedStudent] = { ...newEvals[selectedStudent] };

              if (!newEvals[selectedStudent][cat]) newEvals[selectedStudent][cat] = {};
              else newEvals[selectedStudent][cat] = { ...newEvals[selectedStudent][cat] };

              const currentTaskEval = newEvals[selectedStudent][cat][tIdx] || { status: null, score: null };

              // If resetting status (value is null/undefined): clear both status AND score completely!
              if (field === 'status' && (value === null || value === undefined)) {
                  newEvals[selectedStudent][cat][tIdx] = { status: null, score: null, evaluator: null, date: null };
              } else if (field === 'score' && (value === null || value === undefined)) {
                  newEvals[selectedStudent][cat][tIdx] = {
                      ...currentTaskEval,
                      score: null
                  };
              } else {
                  newEvals[selectedStudent][cat][tIdx] = {
                      ...currentTaskEval,
                      [field]: value
                  };
                  if (field === 'status') {
                      newEvals[selectedStudent][cat][tIdx].evaluator = currentUser.name || currentUser.username;
                      newEvals[selectedStudent][cat][tIdx].date = new Date().toISOString();
                  } else if (field === 'score' && !currentTaskEval.status) {
                      newEvals[selectedStudent][cat][tIdx].status = 'YAPTI';
                      newEvals[selectedStudent][cat][tIdx].evaluator = currentUser.name || currentUser.username;
                      newEvals[selectedStudent][cat][tIdx].date = new Date().toISOString();
                  }
              }

              updatedStudentRecord = newEvals[selectedStudent];
              return newEvals;
          });
          
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              
              if (updatedStudentRecord) {
                  const colName = `evaluations_${activeSchoolId}`;
                  await setDoc(doc(db, colName, selectedStudent), updatedStudentRecord);
              }
          } catch (error) {
              console.error("Error saving evaluation:", error);
          }
      },
      handleSloganChange: () => {
          const currentSlogan = schools.find(s => s.id === activeSchoolId)?.slogan || '';
          requestPrompt("Okul Sloganını Güncelle", currentSlogan, async (newSlogan) => {
              if (newSlogan === null) return;
              try {
                  const { doc, updateDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  await updateDoc(doc(db, 'schools', activeSchoolId), { slogan: newSlogan });
                  showToast("Slogan güncellendi.", "success");
                  // Update local state
                  setSchools(prev => prev.map(s => s.id === activeSchoolId ? { ...s, slogan: newSlogan } : s));
              } catch (error) {
                  console.error("Error updating slogan:", error);
                  showToast("Slogan güncellenirken bir hata oluştu.", "error");
              }
          });
      },
      setNewActivity,
      handleAddActivity: async () => {
          if (!selectedStudent || !activeSchoolId || !newActivity.description || !newActivity.levelId || !newActivity.rubricId) {
              showToast("Lütfen tüm alanları doldurun.", "error");
              return;
          }

          const level = devCardConfig.levels.find((l: any) => l.id.toString() === newActivity.levelId);
          const rubric = devCardConfig.rubrics.find((r: any) => r.id.toString() === newActivity.rubricId);
          const score = (level?.score || 0) * (rubric?.multiplier || 0);

          const activity = {
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
              description: newActivity.description,
              levelId: newActivity.levelId,
              rubricId: newActivity.rubricId,
              score: score
          };

          const updatedActivities = [activity, ...devCardData.activities];
          
          try {
              const { doc, setDoc, updateDoc, getDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              
              // Save to the portfolios collection as requested
              const colName = `portfolios_${activeSchoolId}`;
              const docRef = doc(db, colName, selectedStudent);
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                  await updateDoc(docRef, {
                      'developmentCard.activities': updatedActivities
                  });
              } else {
                  await setDoc(docRef, {
                      developmentCard: {
                          activities: updatedActivities
                      }
                  });
              }
              
              setNewActivity({ description: '', levelId: '', rubricId: '' });
              showToast("Aktivite eklendi.", "success");
          } catch (error) {
              console.error("Error adding activity:", error);
              showToast("Aktivite eklenirken bir hata oluştu.", "error");
          }
      },
            handleToggleBadge: async (badgeId: string | number) => {
          if (!selectedStudent || !activeSchoolId) return;
          try {
              const currentBadges = devCardData.manualBadges || [];
              let updatedBadges = [...currentBadges];
              if (updatedBadges.includes(badgeId)) {
                  updatedBadges = updatedBadges.filter(id => id !== badgeId);
              } else {
                  updatedBadges.push(badgeId);
              }
              const { doc, updateDoc, setDoc, getDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = `portfolios_${activeSchoolId}`;
              const docRef = doc(db, colName, selectedStudent);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  await updateDoc(docRef, { manualBadges: updatedBadges });
              } else {
                  await setDoc(docRef, { manualBadges: updatedBadges });
              }
              showToast("Rozet güncellendi.", "success");
          } catch (error) {
              console.error("Error toggling badge:", error);
              showToast("Rozet güncellenirken bir hata oluştu.", "error");
          }
      },
      handleDeleteActivity: async (activityId: string) => {
          if (!selectedStudent || !activeSchoolId) return;

          requestConfirm("Bu aktiviteyi silmek istediğinize emin misiniz?", async () => {
              const updatedActivities = devCardData.activities.filter((a: any) => a.id !== activityId);
              try {
                  const { doc, updateDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const colName = `portfolios_${activeSchoolId}`;
                  await updateDoc(doc(db, colName, selectedStudent), {
                      'developmentCard.activities': updatedActivities
                  });
                  showToast("Aktivite silindi.", "success");
              } catch (error) {
                  console.error("Error deleting activity:", error);
                  showToast("Aktivite silinirken bir hata oluştu.", "error");
              }
          });
      },
      handleDownloadDevCardPDF: () => {
          setTimeout(() => {
              window.print();
          }, 100);
      },
      setSelectedTeacherForPerf, 
      setNewTeacherActivity, 
      handleAddTeacherActivity: async () => {
          if (!selectedTeacherForPerf || !newTeacherActivity.description || !newTeacherActivity.taskTypeId || !newTeacherActivity.rubricId) {
              showToast("Lütfen tüm alanları doldurun.", "error");
              return;
          }
          try {
              const { doc, setDoc, getDoc, updateDoc, arrayUnion } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'teacher_performances' : `teacher_performances_${activeSchoolId}`;
              
              const activity = {
                  id: Date.now().toString(),
                  date: new Date().toISOString(),
                  description: newTeacherActivity.description,
                  taskTypeId: newTeacherActivity.taskTypeId,
                  rubricId: newTeacherActivity.rubricId,
                  addedBy: currentUser.name
              };

              const docRef = doc(db, colName, selectedTeacherForPerf);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                  await updateDoc(docRef, {
                      activities: arrayUnion(activity)
                  });
              } else {
                  await setDoc(docRef, {
                      activities: [activity]
                  });
              }

              setNewTeacherActivity({ description: '', taskTypeId: '', rubricId: '' });
              showToast("Faaliyet başarıyla eklendi.", "success");
          } catch (error) {
              console.error("Error adding teacher activity:", error);
              showToast("Faaliyet eklenirken bir hata oluştu.", "error");
          }
      }, 
      handleDeleteTeacherActivity: async (activityId: string) => {
          requestConfirm("Bu faaliyeti silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, getDoc, updateDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const colName = activeSchoolId === 'default' ? 'teacher_performances' : `teacher_performances_${activeSchoolId}`;
                  
                  const docRef = doc(db, colName, selectedTeacherForPerf);
                  const docSnap = await getDoc(docRef);
                  
                  if (docSnap.exists()) {
                      const data = docSnap.data();
                      const updatedActivities = (data.activities || []).filter((a: any) => a.id !== activityId);
                      await updateDoc(docRef, {
                          activities: updatedActivities
                      });
                      showToast("Faaliyet silindi.", "success");
                  }
              } catch (error) {
                  console.error("Error deleting teacher activity:", error);
                  showToast("Faaliyet silinirken bir hata oluştu.", "error");
              }
          });
      },
      setActiveBehaviorCard, 
      handleAddBehavior: async (behavior: any, card: any) => {
          if (!selectedStudent || !activeSchoolId) return;

          const checkAutoAwards = (currentLog: any[]) => {
              let newLog = [...currentLog];
              const now = new Date();
              const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

              let weeklyPositivePoints = 0;
              let monthlyPositivePoints = 0;
              let hasWeeklyAwardThisWeek = false;
              let hasMonthlyAwardThisMonth = false;

              newLog.forEach(log => {
                  if (log.isDeleted) return;
                  const logDate = new Date(log.date);
                  
                  const isWeekly = log.description?.includes("Haftalık +20 Puan Başarısı") || log.isAutoWeekly;
                  const isMonthly = log.description?.includes("Aylık +50 Puan Başarısı") || log.isAutoMonthly;

                  if (isWeekly && logDate >= oneWeekAgo) {
                      hasWeeklyAwardThisWeek = true;
                  }
                  if (isMonthly && logDate >= oneMonthAgo) {
                      hasMonthlyAwardThisMonth = true;
                  }
                  
                  if (log.score > 0 && log.type === 'behavior' && !isWeekly && !isMonthly) {
                      if (logDate >= oneWeekAgo) weeklyPositivePoints += Number(log.score);
                      if (logDate >= oneMonthAgo) monthlyPositivePoints += Number(log.score);
                  }
              });

              let addedAuto = false;
              if (weeklyPositivePoints >= 20 && !hasWeeklyAwardThisWeek) {
                  newLog.push({
                      id: (Date.now() + 1).toString(),
                      date: new Date().toISOString(),
                      description: "Haftalık +20 Puan Başarısı",
                      score: 10,
                      card: 'white',
                      type: 'behavior',
                      addedBy: 'SİSTEM',
                      isDeleted: false,
                      isAutoWeekly: true
                  });
                  addedAuto = true;
              }

              if (monthlyPositivePoints >= 50 && !hasMonthlyAwardThisMonth) {
                  newLog.push({
                      id: (Date.now() + (addedAuto ? 2 : 1)).toString(),
                      date: new Date().toISOString(),
                      description: "Aylık +50 Puan Başarısı",
                      score: 10,
                      card: 'white',
                      type: 'behavior',
                      addedBy: 'SİSTEM',
                      isDeleted: false,
                      isAutoMonthly: true
                  });
              }
              return newLog;
          };
          
          const logEntry = {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              description: behavior.text,
              score: behavior.points || card.score || 0,
              card: card.id,
              type: 'behavior',
              addedBy: currentUser.username,
              isDeleted: false
          };

          let updatedLog = [...behaviorLog, logEntry];
          updatedLog = checkAutoAwards(updatedLog);
          
          setBehaviorLog(updatedLog);
          setSchoolPortfolios((prev: any) => {
              const newList = [...prev];
              const idx = newList.findIndex((s: any) => s.fullName === selectedStudent);
              if (idx !== -1) {
                  newList[idx] = { ...newList[idx], behaviorLog: updatedLog };
              } else {
                  newList.push({ id: selectedStudent, fullName: selectedStudent, activities: [], behaviorLog: updatedLog });
              }
              return newList;
          });
          
          try {
              const { doc, setDoc, getDoc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = `portfolios_${activeSchoolId}`;
              const docRef = doc(db, colName, selectedStudent);
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                  await updateDoc(docRef, { behaviorLog: updatedLog });
              } else {
                  await setDoc(docRef, { behaviorLog: updatedLog });
              }
              actions.addAuditLog('ADD_BEHAVIOR', 'portfolio', selectedStudent, selectedStudent, null, logEntry, 'medium', `Added behavior: ${behavior.text}`);
              showToast("Davranış notu eklendi.", "success");
          } catch (error) {
              console.error("Error adding behavior:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      handleAddCompensation: async (card: any) => {
          if (!selectedStudent || !activeSchoolId) return;
          
          const logEntry = {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              description: `Telafi Görevi: ${card.name}`,
              score: card.compensation || 0,
              card: card.id,
              type: 'compensation',
              addedBy: currentUser.username,
              isDeleted: false
          };

          const updatedLog = [...behaviorLog, logEntry];
          
          setBehaviorLog(updatedLog);
          setSchoolPortfolios((prev: any) => {
              const newList = [...prev];
              const idx = newList.findIndex((s: any) => s.fullName === selectedStudent);
              if (idx !== -1) {
                  newList[idx] = { ...newList[idx], behaviorLog: updatedLog };
              } else {
                  newList.push({ id: selectedStudent, fullName: selectedStudent, activities: [], behaviorLog: updatedLog });
              }
              return newList;
          });
          
          try {
              const { doc, setDoc, getDoc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = `portfolios_${activeSchoolId}`;
              const docRef = doc(db, colName, selectedStudent);
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                  await updateDoc(docRef, { behaviorLog: updatedLog });
              } else {
                  await setDoc(docRef, { behaviorLog: updatedLog });
              }
              showToast("Telafi görevi eklendi.", "success");
          } catch (error) {
              console.error("Error adding compensation:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      handleSoftDeleteBehavior: async (logId: string) => {
          if (!selectedStudent || !activeSchoolId) return;

          requestConfirm("Bu kaydı silmek istediğinize emin misiniz?", async () => {
              const updatedLog = behaviorLog.map((l: any) => l.id === logId ? { ...l, isDeleted: true } : l);
              
              setBehaviorLog(updatedLog);
              setSchoolPortfolios((prev: any) => {
                  const newList = [...prev];
                  const idx = newList.findIndex((s: any) => s.fullName === selectedStudent);
                  if (idx !== -1) {
                      newList[idx] = { ...newList[idx], behaviorLog: updatedLog };
                  }
                  return newList;
              });
              try {
                  const { doc, updateDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const colName = `portfolios_${activeSchoolId}`;
                  await updateDoc(doc(db, colName, selectedStudent), { behaviorLog: updatedLog });
                  const deletedLog = behaviorLog.find((l: any) => l.id === logId);
                  actions.addAuditLog('DELETE_BEHAVIOR', 'portfolio', selectedStudent, selectedStudent, deletedLog, { ...deletedLog, isDeleted: true }, 'high', 'Kullanıcı silme işlemi onayladı');
                  showToast("Kayıt silindi.", "success");
              } catch (error) {
                  console.error("Error deleting behavior log:", error);
                  showToast("Hata oluştu.", "error");
              }
          });
      },
      setHomeworkTab, setAssignmentType, setAdminHomeworkForm, 
      setGkTab, setSelectedGkReportAssignment, setGkFilterClass,
      handleHomeworkClassToggle: (cls: string) => {
          setAdminHomeworkForm(prev => ({
              ...prev,
              classes: prev.classes.includes(cls as never) 
                  ? prev.classes.filter(c => c !== cls) 
                  : [...prev.classes, cls as never]
          }));
      }, 
      handleHomeworkExcelUpload: (e: any) => {
          const file = e.target.files[0];
          if (!file) return;
          setAdminHomeworkForm(prev => ({ ...prev, fileName: file.name }));
          
          import('xlsx').then(XLSX => {
              const reader = new FileReader();
              reader.onload = (evt: any) => {
                  const bstr = evt.target.result;
                  const wb = XLSX.read(bstr, { type: 'binary' });
                  const wsname = wb.SheetNames[0];
                  const ws = wb.Sheets[wsname];
                  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                  
                  // Check if first row is a header
                  let rowsToProcess = data as any[][];
                  const firstRowStr = String(rowsToProcess[0]?.[0] || '').toLowerCase();
                  if (firstRowStr === 'soru' || firstRowStr === 'question' || firstRowStr === 'kelime') {
                      rowsToProcess = rowsToProcess.slice(1);
                  }

                  const questions = rowsToProcess.map((row: any) => {
                      if (!row || row.length === 0) return null;
                      const clean = (val: any) => val ? String(val).trim() : '';

                      if (assignmentType === 'kelime') return { word: clean(row[0]), meaning: clean(row[1]) };
                      if (assignmentType === 'dogruYanlis') return { sentence: clean(row[0]), answer: clean(row[1]) };
                      if (assignmentType === 'bosluk') return { sentence: clean(row[0]), answer: clean(row[1]) };
                      if (assignmentType === 'coktanSecmeli') {
                          return { 
                              question: clean(row[0]), 
                              a: clean(row[1]), 
                              b: clean(row[2]), 
                              c: clean(row[3]), 
                              d: clean(row[4]), 
                              answer: clean(row[5]) 
                          };
                      }
                      return null;
                  }).filter(q => q !== null);
                  
                  setAdminHomeworkForm(prev => ({ ...prev, questions }));
                  showToast(`${questions.length} soru yüklendi.`, "success");
              };
              reader.readAsBinaryString(file);
          });
      },
      handleCreateAssignment: async () => {
          if (!adminHomeworkForm.title || adminHomeworkForm.classes.length === 0 || adminHomeworkForm.questions.length === 0) {
              showToast("Lütfen tüm alanları doldurun ve Excel yükleyin.", "error");
              return;
          }
          if ((adminHomeworkForm as any).targetType === 'student' && !(adminHomeworkForm as any).targetStudent) {
              showToast("Lütfen hedef öğrenciyi seçiniz.", "error");
              return;
          }

          try {
              const { collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'assignments' : `assignments_${activeSchoolId}`;
              
              await addDoc(collection(db, colName), {
                  ...adminHomeworkForm,
                  type: assignmentType,
                  createdAt: new Date().toISOString(),
                  createdBy: currentUser.username
              });

              setAdminHomeworkForm({ title: '', classes: [], dueDate: '', fileName: '', questions: [] });
              showToast("Ödev başarıyla atandı.", "success");
          } catch (error) {
              console.error("Error creating assignment:", error);
              showToast("Ödev oluşturulurken hata oluştu.", "error");
          }
      }, 
      setEditAssignmentData, 
      handleDeleteAssignment: async (id: string) => {
          requestConfirm("Bu ödevi silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, deleteDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const colName = activeSchoolId === 'default' ? 'assignments' : `assignments_${activeSchoolId}`;
                  await deleteDoc(doc(db, colName, id));
                  showToast("Ödev silindi.", "success");
              } catch (error) {
                  console.error("Error deleting assignment:", error);
                  showToast("Hata oluştu.", "error");
              }
          });
      }, 
      handleUpdateAssignment: async () => {
          if (!editAssignmentData) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'assignments' : `assignments_${activeSchoolId}`;
              const { id, ...data } = editAssignmentData;
              await updateDoc(doc(db, colName, id), data);
              setEditAssignmentData(null);
              showToast("Ödev güncellendi.", "success");
          } catch (error) {
              console.error("Error updating assignment:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      setSelectedReportAssignment, setReportFilterClass,
      setGuidanceFilterForm, setGuidanceFilterClass, setGuidanceFilterStatus, setGuidanceSearchQuery, setGuidanceTab,
      handleSaveGuidanceConfig: async (config: any) => {
          if (!activeSchoolId || !config.title) return;
          try {
              const { collection, addDoc, doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = `guidance_configs_${activeSchoolId}`;
              
              // Firebase throws error if ANY nested key is undefined. Let's reliably strip all undefined properties.
              const validData = JSON.parse(JSON.stringify(config));
              delete validData.id;

              if (config.id) {
                  await setDoc(doc(db, colName, config.id), validData);
              } else {
                  await addDoc(collection(db, colName), {
                      ...validData,
                      createdAt: new Date().toISOString(),
                      createdBy: currentUser?.username || currentUser?.name || 'admin'
                  });
              }
              showToast("Form başarıyla kaydedildi.", "success");
          } catch (error) {
              console.error("Error saving guidance config:", error);
              showToast("Kaydetme sırasında hata oluştu.", "error");
          }
      },
      handleDeleteGuidanceConfig: async (id: string) => {
          requestConfirm("Bu formu silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, deleteDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const colName = `guidance_configs_${activeSchoolId}`;
                  await deleteDoc(doc(db, colName, id));
                  showToast("Form silindi.", "success");
              } catch (error) {
                  console.error("Error deleting guidance config:", error);
                  showToast("Hata oluştu.", "error");
              }
          });
      },
      handleAssignGuidanceForm: async (formId: string, targetType: string, targetClass: string, targetStudent: string | null = null) => {
          if (!formId || !activeSchoolId) return;
          try {
              const { collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'form_assignments' : `form_assignments_${activeSchoolId}`;
              await addDoc(collection(db, colName), {
                  formId,
                  targetType,
                  targetClass,
                  targetStudent,
                  createdAt: new Date().toISOString(),
                  createdBy: currentUser.username
              });
              showToast("Form başarıyla atandı.", "success");
          } catch (error) {
              console.error("Error assigning guidance form:", error);
              showToast("Atama sırasında hata oluştu.", "error");
          }
      },
      handleDeleteGuidanceAssignment: async (id: string) => {
          requestConfirm("Bu atamayı silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, deleteDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const colName = activeSchoolId === 'default' ? 'form_assignments' : `form_assignments_${activeSchoolId}`;
                  await deleteDoc(doc(db, colName, id));
                  showToast("Atama silindi.", "success");
              } catch (error) {
                  console.error("Error deleting guidance assignment:", error);
                  showToast("Hata oluştu.", "error");
              }
          });
      },
      handleDownloadGuidancePDF: () => {
          setTimeout(() => {
              window.print();
          }, 100);
      },
      startHomework: (a: any) => {
          setStudentHomework(a);
          setHomeworkAnswers({});
      },
      submitHomework: async (homeworkId: string, results: any) => {
          if (!activeSchoolId || !currentUser.id) return;
          try {
              const { doc, setDoc, updateDoc, increment } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'homework_progress' : `homework_progress_${activeSchoolId}`;
              const progId = `${currentUser.id}_${homeworkId}`;
              
              await setDoc(doc(db, colName, progId), {
                  userId: currentUser.id,
                  userName: currentUser.name,
                  homeworkId,
                  completed: results.completed || false,
                  remainingIndices: results.remainingIndices || [],
                  correctCount: results.correctCount || 0,
                  incorrectCount: results.incorrectCount !== undefined ? results.incorrectCount : 0,
                  updatedAt: new Date().toISOString()
              }, { merge: true });

              // Update global user total correct if needed
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              if (results.deltaCorrect > 0) {
                  await updateDoc(doc(db, userColName, currentUser.id), {
                      totalCorrect: increment(results.deltaCorrect)
                  });
              }

              if (results.completed) {
                  setStudentHomework(null);
                  showToast("Tebrikler! Ödevi tamamen bitirdin.", "success");
              }
          } catch (error) {
              console.error("Error submitting homework:", error);
          }
      },
      handleUpdateBadges: async (newBadges: any[]) => {
          if (!activeSchoolId) return;
          try {
              const { collection, doc, writeBatch, getDocs } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'homework_badges' : `homework_badges_${activeSchoolId}`;
              
              const batch = writeBatch(db);
              const snapshot = await getDocs(collection(db, colName));
              snapshot.forEach(d => batch.delete(d.ref));
              
              newBadges.forEach(b => {
                 const newRef = doc(collection(db, colName), String(b.id));
                 batch.set(newRef, b);
              });
              await batch.commit();

              showToast("Rozetler güncellendi.", "success");
          } catch (error) {
              console.error("Error updating badges:", error);
          }
      },
      setStudentHomework,
      setHomeworkAnswers,
      submitGuidanceForm: async () => {
          if (!studentGuidanceForm || !currentUser.id || !activeSchoolId) return;
          try {
              const { collection, addDoc, doc, updateDoc, deleteField } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const colName = activeSchoolId === 'default' ? 'guidance_forms' : `guidance_forms_${activeSchoolId}`;
              
              await addDoc(collection(db, colName), {
                  formType: studentGuidanceForm,
                  studentId: currentUser.id,
                  studentName: currentUser.name,
                  classLevel: currentUser.classLevel,
                  answers: studentGuidanceAnswers,
                  createdAt: new Date().toISOString()
              });

              actions.addAuditLog('SUBMIT_GUIDANCE', 'guidance', currentUser.id, currentUser.name, null, { formType: studentGuidanceForm }, 'low');

              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              await updateDoc(doc(db, userColName, currentUser.id), {
                  [`guidanceDrafts.${studentGuidanceForm}`]: deleteField()
              }).catch(e => console.error("Draft clean error:", e));

              setStudentGuidanceForm(null);
              setStudentGuidanceAnswers({});
              showToast("Form başarıyla gönderildi.", "success");
          } catch (error) {
              console.error("Error submitting guidance form:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      saveGuidanceDraft: async (formType: string, answers: any) => {
          if (!currentUser?.id || !activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              await updateDoc(doc(db, userColName, currentUser.id), {
                  [`guidanceDrafts.${formType}`]: answers
              });
          } catch (error) {
              console.error("Error saving guidance draft:", error);
          }
      },
      setStudentGuidanceForm, setStudentGuidanceAnswers, 
      setProfileForm, handleProfileUpdate: async () => {
          if (!currentUser.id || !activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              await updateDoc(doc(db, userColName, currentUser.id), {
                  name: profileForm.name,
                  username: profileForm.username,
                  password: profileForm.password || currentUser.password
              });
              setCurrentUser({
                  ...currentUser,
                  name: profileForm.name,
                  username: profileForm.username,
                  password: profileForm.password || currentUser.password
              });
              showToast("Profil bilgileriniz güncellendi.", "success");
          } catch (error) {
              console.error("Error updating profile:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      setAdminTab, setNewUser, 
      handleAddUser: async () => {
          if (!newUser.name || !activeSchoolId) return;
          try {
              const { collection, addDoc, doc, setDoc, updateDoc, arrayUnion } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const kkAdminType = getKuranKursuAdminType();
              
              let finalName = newUser.name.trim();
              let resolvedStudentGender: 'K' | 'E' | undefined = undefined;
              if (newUser.role === 'student' && !kkAdminType) {
                  const parsedEntry = parseStudentInputEntry(finalName, newUser.studentNo);
                  finalName = parsedEntry.formattedName;
                  resolvedStudentGender = parseStudentGenderToken(newUser.gender) || parsedEntry.gender;
              }

              const creds = generateCredentials(finalName);
              const customUsername = newUser.username?.trim();
              const customPassword = newUser.password?.trim();

              const userToAdd: any = {
                  ...newUser,
                  name: finalName,
                  username: customUsername || creds.username,
                  password: customPassword || creds.password,
                  schoolId: activeSchoolId,
                  createdAt: new Date().toISOString()
              };
              delete userToAdd.studentNo;

              if (kkAdminType === 'E' || kkAdminType === 'K') {
                  const forcedBranch = kkAdminType === 'E' ? "Erkek Kur'an Kursu Öğreticisi" : "Kız Kur'an Kursu Öğreticisi";
                  userToAdd.role = 'teacher';
                  userToAdd.schoolLevel = 'diger';
                  userToAdd.branch = forcedBranch;
                  delete userToAdd.adminSubRole;
                  delete userToAdd.gender;
              } else if (userToAdd.role === 'teacher' || userToAdd.role === 'öğretmen') {
                  userToAdd.branch = (newUser.branch || '').trim();
                  userToAdd.schoolLevel = (newUser.schoolLevel || '').trim();
                  delete userToAdd.adminSubRole;
                  delete userToAdd.gender;
              } else if (userToAdd.role === 'admin' || userToAdd.role === 'yönetici') {
                  const subRole = (newUser.adminSubRole || newUser.branch || 'Yönetici').trim();
                  userToAdd.adminSubRole = subRole;
                  userToAdd.branch = subRole;
                  delete userToAdd.schoolLevel;
                  delete userToAdd.gender;
              } else {
                  delete userToAdd.branch;
                  delete userToAdd.schoolLevel;
                  delete userToAdd.adminSubRole;
                  if (resolvedStudentGender) {
                      userToAdd.gender = resolvedStudentGender;
                  }
              }

              await addDoc(collection(db, userColName), userToAdd);

              // If student, also add to schoolData
              if (userToAdd.role === 'student' && newUser.classLevel) {
                  const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                  const schoolDataRef = doc(db, sysColName, 'schoolData');
                  const nextGenders = {
                      ...studentGenders,
                      ...(resolvedStudentGender ? { [finalName]: resolvedStudentGender } : {})
                  };
                  if (resolvedStudentGender) {
                      setStudentGenders(nextGenders);
                  }
                  await updateDoc(schoolDataRef, {
                      [newUser.classLevel]: arrayUnion(finalName),
                      ...(resolvedStudentGender ? { studentGenders: nextGenders } : {})
                  }).catch(async () => {
                      await setDoc(schoolDataRef, {
                          [newUser.classLevel as string]: [finalName],
                          ...(resolvedStudentGender ? { studentGenders: nextGenders } : {})
                      }, { merge: true });
                  });
              }

              const resetBranch = kkAdminType === 'E'
                  ? "Erkek Kur'an Kursu Öğreticisi"
                  : kkAdminType === 'K'
                  ? "Kız Kur'an Kursu Öğreticisi"
                  : '';
              const resetSchoolLevel = kkAdminType ? 'diger' : (newUser.schoolLevel || '');
              setNewUser({name: '', username: '', password: '', role: 'teacher', branch: resetBranch, schoolLevel: resetSchoolLevel, adminSubRole: 'Yönetici', gender: ''});
              setAdminTab('users');
              showToast("Kullanıcı başarıyla eklendi.", "success");
          } catch (error) {
              console.error("Error adding user:", error);
              showToast("Kullanıcı eklenirken hata oluştu.", "error");
          }
      },
      handleUpdateTeacherBranch: async (targetUser: any, newBranch: string, newSchoolLevel?: string) => {
          if (!targetUser || !activeSchoolId) return;
          try {
              const { doc, updateDoc, collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const isAdminTarget = targetUser.role === 'admin' || targetUser.role === 'yönetici';
              const payload: any = isAdminTarget
                  ? { adminSubRole: newBranch || 'Yönetici', branch: newBranch || 'Yönetici' }
                  : { branch: newBranch };
              if (!isAdminTarget && newSchoolLevel) {
                  payload.schoolLevel = newSchoolLevel;
              }
              if (targetUser.id) {
                  await updateDoc(doc(db, userColName, targetUser.id), payload);
              } else {
                  await addDoc(collection(db, userColName), {
                      ...targetUser,
                      ...payload,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }
              showToast(
                  isAdminTarget
                      ? `${targetUser.name} için yönetici görevi "${newBranch || 'Yönetici'}" olarak güncellendi.`
                      : `${targetUser.name} için branş "${newBranch || 'Belirtilmedi'}" olarak güncellendi.`,
                  "success"
              );
          } catch (error) {
              console.error("Error updating teacher/admin branch:", error);
              showToast("Bilgi güncellenirken hata oluştu.", "error");
          }
      },
      setEditUser, 
      handleUpdateUser: async () => {
          if (!editUser || !activeSchoolId) return;
          try {
              const { doc, updateDoc, setDoc, arrayRemove, arrayUnion, collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const norm = (s: any) => String(s || '').trim().toLowerCase();

              // Find old user for comparison
              const oldUser = users.find((u: any) => (editUser.id && u.id === editUser.id) || (editUser.originalName && norm(u.name) === norm(editUser.originalName)));
              const oldName = editUser.originalName || oldUser?.name || editUser.name;
              const nameChanged = oldName && oldName !== editUser.name;
              const oldClassLevel = editUser.originalClassLevel || oldUser?.classLevel || '';
              const classChanged = oldClassLevel !== editUser.classLevel;

              // Guard in Rahle module: only allow editing students that ONLY use Rahle module
              if (activeProject === 'rahle' && (editUser.role === 'student' || editUser.role === 'öğrenci')) {
                  if (!isStudentRahleOnly(oldName, oldUser || editUser)) {
                      showToast("Bu öğrenci Rahle harici diğer modülleri de kullanmaktadır. Öğrenci bilgileri Rahle modülünden güncellenemez.", "error");
                      setEditUser(null);
                      return;
                  }
              }

              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const schoolDataRef = doc(db, sysColName, 'schoolData');

              const { id, originalName, originalClassLevel, ...updateData } = editUser;
              const kkAdminType = getKuranKursuAdminType();
              if (kkAdminType === 'E' || kkAdminType === 'K') {
                  if (updateData.role !== 'student' && updateData.role !== 'öğrenci') {
                      const wasAdmin = oldUser?.role === 'admin' || oldUser?.role === 'yönetici';
                      if (wasAdmin) {
                          const fixedAdminRole = kkAdminType === 'E' ? "Erkek Kur'an Kursu Yöneticisi" : "Kız Kur'an Kursu Yöneticisi";
                          updateData.role = 'admin';
                          updateData.adminSubRole = fixedAdminRole;
                          updateData.branch = fixedAdminRole;
                      } else {
                          const fixedTeacherBranch = kkAdminType === 'E' ? "Erkek Kur'an Kursu Öğreticisi" : "Kız Kur'an Kursu Öğreticisi";
                          updateData.role = 'teacher';
                          updateData.schoolLevel = 'diger';
                          updateData.branch = fixedTeacherBranch;
                          delete updateData.adminSubRole;
                      }
                  }
              } else if (updateData.role === 'admin' || updateData.role === 'yönetici') {
                  const subRole = updateData.adminSubRole || updateData.branch || 'Yönetici';
                  updateData.adminSubRole = subRole;
                  updateData.branch = subRole;
              }
              if (updateData.role === 'student' || updateData.role === 'öğrenci') {
                  const lockedGenderFilter = getKuranKursuAdminType() || getCurrentUserHafizlikGenderFilter();
                  updateData.gender = lockedGenderFilter
                      ? getStudentGender(oldName, oldUser || editUser)
                      : (parseStudentGenderToken(updateData.gender) || getStudentGender(updateData.name, oldUser || editUser));
              }
              if (id) {
                  await updateDoc(doc(db, userColName, id), updateData);
              } else {
                  await addDoc(collection(db, userColName), {
                      ...updateData,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }

              // Sync with schoolData if student
              if (editUser.role === 'student' || editUser.role === 'öğrenci') {
                  const lockedGenderFilter = getKuranKursuAdminType() || getCurrentUserHafizlikGenderFilter();
                  const resolvedGender: 'K' | 'E' = lockedGenderFilter
                      ? getStudentGender(oldName, oldUser || editUser)
                      : (parseStudentGenderToken(editUser.gender) || getStudentGender(editUser.name, oldUser || editUser));
                  const nextStudentGenders: Record<string, 'K' | 'E'> = { ...studentGenders };
                  if (nameChanged && oldName) {
                      Object.keys(nextStudentGenders).forEach(k => {
                          if (norm(k) === norm(oldName)) delete nextStudentGenders[k];
                      });
                  }
                  nextStudentGenders[editUser.name] = resolvedGender;
                  setStudentGenders(nextStudentGenders);

                  if (activeProject === 'rahle' || editUser.isRahleOnly || isStudentRahleOnly(oldName, oldUser || editUser)) {
                      // Rahle-only student: update rahleClasses, rahleOnlyStudents, hafizlikStudents (never regular school classes)
                      const nextRahleClasses: Record<string, string[]> = {};
                      Object.entries(rahleClasses).forEach(([rCls, stus]) => {
                          let list = (stus || []).map(s => (norm(s) === norm(oldName) ? editUser.name : s));
                          if (classChanged && rCls === oldClassLevel && editUser.classLevel !== rCls) {
                              list = list.filter(s => norm(s) !== norm(editUser.name));
                          }
                          nextRahleClasses[rCls] = list;
                      });
                      if (editUser.classLevel && editUser.classLevel !== 'Hafızlık Havuzu' && nextRahleClasses[editUser.classLevel]) {
                          if (!nextRahleClasses[editUser.classLevel].some(s => norm(s) === norm(editUser.name))) {
                              nextRahleClasses[editUser.classLevel] = [...nextRahleClasses[editUser.classLevel], editUser.name];
                          }
                      }
                      const nextRahleOnly = Array.from(new Set([
                          ...rahleOnlyStudents.filter(s => norm(s) !== norm(oldName)),
                          editUser.name
                      ]));
                      const nextHafizlik = Array.from(new Set([
                          ...hafizlikStudents.filter(s => norm(s) !== norm(oldName)),
                          editUser.name
                      ]));
                      setRahleClasses(nextRahleClasses);
                      setRahleOnlyStudents(nextRahleOnly);
                      setHafizlikStudents(nextHafizlik);
                      await setDoc(schoolDataRef, {
                          rahleClasses: nextRahleClasses,
                          rahleOnlyStudents: nextRahleOnly,
                          hafizlikStudents: nextHafizlik,
                          studentGenders: nextStudentGenders
                      }, { merge: true });
                  } else {
                      // Regular school student edited in Arif/Alim/Pusula
                      await setDoc(schoolDataRef, { studentGenders: nextStudentGenders }, { merge: true }).catch(() => {});
                      if (nameChanged || classChanged) {
                          if (oldClassLevel && oldName) {
                              await updateDoc(schoolDataRef, {
                                  [oldClassLevel]: arrayRemove(oldName)
                              }).catch(() => {});
                          }
                          if (editUser.classLevel && editUser.name) {
                              await updateDoc(schoolDataRef, {
                                  [editUser.classLevel]: arrayUnion(editUser.name)
                              }).catch(() => {});
                          }
                          if (nameChanged) {
                              // Also keep name synced inside rahleClasses if they were assigned to one
                              const nextRahleClasses: Record<string, string[]> = {};
                              let rahleTouched = false;
                              Object.entries(rahleClasses).forEach(([rCls, stus]) => {
                                  const updatedList = (stus || []).map(s => {
                                      if (norm(s) === norm(oldName)) {
                                          rahleTouched = true;
                                          return editUser.name;
                                      }
                                      return s;
                                  });
                                  nextRahleClasses[rCls] = updatedList;
                              });
                              if (rahleTouched) {
                                  setRahleClasses(nextRahleClasses);
                                  await setDoc(schoolDataRef, { rahleClasses: nextRahleClasses }, { merge: true }).catch(() => {});
                              }
                          }
                      }

                      if (typeof editUser.isHafizlik === 'boolean') {
                          if (nameChanged && oldName) {
                              await updateDoc(schoolDataRef, {
                                  hafizlikStudents: arrayRemove(oldName)
                              }).catch(() => {});
                          }
                          await updateDoc(schoolDataRef, {
                              hafizlikStudents: editUser.isHafizlik ? arrayUnion(editUser.name) : arrayRemove(editUser.name)
                          }).catch(() => {});
                      }
                  }
              }

              setEditUser(null);
              showToast("Kullanıcı güncellendi.", "success");
          } catch (error) {
              console.error("Error updating user:", error);
              showToast("Güncelleme sırasında hata oluştu.", "error");
          }
      },
      submitIdea: async (text: string) => {
          if (!currentUser || !currentUser.id || !activeSchoolId) return;
          try {
              const { collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const ideasCol = activeSchoolId === 'default' ? 'ideas' : `ideas_${activeSchoolId}`;
              await addDoc(collection(db, ideasCol), {
                  studentId: currentUser.id,
                  studentName: currentUser.name,
                  studentClass: currentUser.classLevel || '',
                  text,
                  createdAt: new Date().toISOString(),
                  status: 'new'
              });
              showToast("Fikriniz başarıyla iletildi! Teşekkür ederiz.", "success");
          } catch (error) {
              console.error("Error submitting idea:", error);
              showToast("Fikriniz iletilirken hata oluştu.", "error");
          }
      },
      deleteIdea: async (id: string) => {
          if (!id || !activeSchoolId) return;
          requestConfirm("Bu fikri silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, deleteDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const ideasCol = activeSchoolId === 'default' ? 'ideas' : `ideas_${activeSchoolId}`;
                  await deleteDoc(doc(db, ideasCol, id));
                  showToast("Fikir başarıyla silindi.", "success");
              } catch (error) {
                  console.error("Error deleting idea:", error);
                  showToast("Fikir silinirken hata oluştu.", "error");
              }
          });
      },
      markIdeaRead: async (id: string) => {
          if (!id || !activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const ideasCol = activeSchoolId === 'default' ? 'ideas' : `ideas_${activeSchoolId}`;
              await updateDoc(doc(db, ideasCol, id), { status: 'read' });
          } catch (error) {
              console.error("Error marking idea as read:", error);
          }
      },
      handleDeleteUser: async (id: string, explicitStudentName?: string) => {
          if ((!id && !explicitStudentName) || !activeSchoolId) return;
          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const targetUser = id ? users.find((u: any) => u.id === id) : users.find((u: any) => norm(u.name) === norm(explicitStudentName));
          const targetName = explicitStudentName || targetUser?.name || '';

          if (activeProject === 'rahle' && (targetUser?.role === 'student' || targetUser?.role === 'öğrenci' || explicitStudentName)) {
              if (!isStudentRahleOnly(targetName, targetUser)) {
                  showToast("Bu öğrenci Rahle harici diğer modülleri de kullandığı için Rahle modülünden silinemez.", "error");
                  return;
              }
          }

          requestConfirm("Bu kullanıcıyı silmek istediğinize emin misiniz?", async () => {
              try {
                  const { doc, deleteDoc, getDoc, updateDoc, setDoc, arrayRemove } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
                  const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                  const schoolDataRef = doc(db, sysColName, 'schoolData');

                  if (id) {
                      const userRef = doc(db, userColName, id);
                      const userSnap = await getDoc(userRef);

                      if (userSnap.exists()) {
                          const userData = userSnap.data();
                          if ((userData.role === 'student' || userData.role === 'öğrenci') && userData.classLevel && !userData.isRahleOnly) {
                              await updateDoc(schoolDataRef, {
                                  [userData.classLevel]: arrayRemove(userData.name)
                              }).catch(() => {});
                          }
                      }
                      await deleteDoc(userRef);
                  }

                  if (targetName) {
                      const nextRahleClasses: Record<string, string[]> = {};
                      Object.entries(rahleClasses).forEach(([rCls, stus]) => {
                          nextRahleClasses[rCls] = (stus || []).filter(s => norm(s) !== norm(targetName));
                      });
                      const nextRahleOnly = rahleOnlyStudents.filter(s => norm(s) !== norm(targetName));
                      const nextHafizlik = hafizlikStudents.filter(s => norm(s) !== norm(targetName));
                      setRahleClasses(nextRahleClasses);
                      setRahleOnlyStudents(nextRahleOnly);
                      setHafizlikStudents(nextHafizlik);
                      await setDoc(schoolDataRef, {
                          rahleClasses: nextRahleClasses,
                          rahleOnlyStudents: nextRahleOnly,
                          hafizlikStudents: nextHafizlik
                      }, { merge: true }).catch(() => {});
                  }

                  showToast("Kullanıcı silindi.", "success");
              } catch (error) {
                  console.error("Error deleting user:", error);
                  showToast("Silme işlemi başarısız.", "error");
              }
          });
      },
      handleResetPassword: async (user: any) => {
          if (!user || !activeSchoolId) return;
          requestConfirm(`${user.name} kullanıcısının şifresini sıfırlamak istiyor musunuz?`, async () => {
              try {
                  const { doc, updateDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
                  const newPassword = Math.floor(1000 + Math.random() * 9000).toString();
                  
                  await updateDoc(doc(db, userColName, user.id), { password: newPassword });
                  showToast(`Şifre sıfırlandı: ${newPassword}`, "success");
              } catch (error) {
                  console.error("Error resetting password:", error);
                  showToast("Şifre sıfırlanamadı.", "error");
              }
          });
      }, 
      handleExcelUpload: async (e: any, targetClass: string | null = null) => {
          const file = e.target.files[0];
          if (!file) return;
          setExcelFile(file);
          
          try {
              const { read, utils } = await import('xlsx');
              const reader = new FileReader();
              reader.onload = (evt) => {
                  const bstr = evt.target?.result;
                  const wb = read(bstr, { type: 'binary' });
                  const wsname = wb.SheetNames[0];
                  const ws = wb.Sheets[wsname];
                  const data = utils.sheet_to_json(ws, { header: 1 });
                  
                  // Find headers to detect columns intelligently
                  let headerRowIndex = -1;
                  let colIndices = { no: -1, ad: -1, soyad: -1, fullName: -1, cinsiyet: -1 };

                  for (let i = 0; i < Math.min(data.length, 20); i++) {
                      const row = data[i] as any[];
                      if (!row) continue;
                      
                      row.forEach((cell, idx) => {
                          if (!cell) return;
                          const str = cell.toString().trim().toLowerCase();
                          // No column
                          if (str.includes('no') || str.includes('numara')) colIndices.no = idx;
                          
                          // Ad Soyad column (MUST contain both and NOT just be 'soyadı')
                          if (str.includes('ad') && str.includes('soyad') && !['soyadı', 'soyadi', 'soyad'].includes(str)) {
                              colIndices.fullName = idx;
                          }
                          
                          // Ad column (Specific match)
                          if (['ad', 'adı', 'adı', 'adi', 'adiniz', 'adınız'].includes(str)) {
                              colIndices.ad = idx;
                          }
                          
                          // Soyad column (Specific match)
                          if (['soyad', 'soyadı', 'soyadi', 'soyadınız', 'soyadiniz'].includes(str)) {
                              colIndices.soyad = idx;
                          }

                          // Cinsiyet column
                          if (str.includes('cinsiyet') || str === 'k/e' || str === 'cins') {
                              colIndices.cinsiyet = idx;
                          }
                      });

                      // Prioritize Ad + Soyad over FullName if both are available
                      if (colIndices.no !== -1 && colIndices.ad !== -1 && colIndices.soyad !== -1) {
                          headerRowIndex = i;
                          colIndices.fullName = -1; // Specific columns found, unset generic one
                          break;
                      }

                      if (colIndices.no !== -1 && colIndices.fullName !== -1) {
                          headerRowIndex = i;
                          break;
                      }
                  }

                  let preview: any[] = [];

                  if (targetClass) {
                      // We are uploading students to a specific class from the 'Classes' tab
                      if (headerRowIndex !== -1) {
                          preview = data.slice(headerRowIndex + 1).map((row: any) => {
                              let name = '';
                              if (colIndices.ad !== -1 && colIndices.soyad !== -1) {
                                  name = `${row[colIndices.ad] || ''} ${row[colIndices.soyad] || ''}`.trim();
                              } else if (colIndices.fullName !== -1) {
                                  name = row[colIndices.fullName]?.toString() || '';
                              }
                              
                              const no = row[colIndices.no];
                              const rawCombined = no ? `${no} - ${name}` : name;
                              const parsedEntry = parseStudentInputEntry(rawCombined);
                              // 3rd column (row[2]) K or E check first as requested, then colIndices.cinsiyet, then suffix/inferred
                              const col3Gender = parseStudentGenderToken(row?.[2]);
                              const headerColGender = colIndices.cinsiyet !== -1 ? parseStudentGenderToken(row?.[colIndices.cinsiyet]) : null;
                              const resolvedGender: 'K' | 'E' = col3Gender || headerColGender || parsedEntry.explicitGender || inferStudentGender(parsedEntry.formattedName);

                              return {
                                  name: parsedEntry.formattedName,
                                  gender: resolvedGender,
                                  classLevel: targetClass,
                                  role: 'student'
                              };
                          }).filter(r => r.name && r.name.length > 3);
                      } else {
                          preview = data.slice(1).map((row: any) => {
                              if (!row || row.length === 0) return null;
                              const cell0 = row[0] !== undefined && row[0] !== null ? String(row[0]).trim() : '';
                              const cell1 = row[1] !== undefined && row[1] !== null ? String(row[1]).trim() : '';
                              const cell2 = row[2] !== undefined && row[2] !== null ? String(row[2]).trim() : '';

                              // Support both [No, Ad Soyad, K/E] and [Ad Soyad, ..., K/E]
                              let rawNameStr = cell0;
                              if (/^\d+$/.test(cell0) && cell1 && !parseStudentGenderToken(cell1)) {
                                  rawNameStr = `${cell0} - ${cell1}`;
                              }
                              if (!rawNameStr) return null;

                              const parsedEntry = parseStudentInputEntry(rawNameStr);
                              const col3Gender = parseStudentGenderToken(cell2);
                              const col2Gender = (!/^\d+$/.test(cell0)) ? parseStudentGenderToken(cell1) : null;
                              const resolvedGender: 'K' | 'E' = col3Gender || col2Gender || parsedEntry.explicitGender || inferStudentGender(parsedEntry.formattedName);

                              return {
                                  name: parsedEntry.formattedName,
                                  gender: resolvedGender,
                                  classLevel: targetClass,
                                  role: 'student'
                              };
                          }).filter((r: any) => r && r.name);
                      }
                  } else {
                      // We are uploading users from the 'Users' tab
                      preview = data.slice(1).map((row: any) => {
                          const rawRole = (row[3] || '').toString().toLowerCase().trim();
                          return {
                              name: row[0],
                              username: row[1] ? row[1].toString().trim() : '',
                              password: row[2] ? row[2].toString().trim() : '',
                              role: rawRole === 'yonetici' ? 'admin' : 'teacher' // Only allow teacher/admin
                          };
                      }).filter((r: any) => r.name);
                  }
                  
                  if (preview.length > 0) {
                      setExcelPreview(preview);
                      showToast(`${preview.length} kayıt tespit edildi. İçe aktarmayı onaylayın.`, "info");
                  } else {
                      showToast("Dosyada geçerli veri bulunamadı.", "error");
                  }
              };
              reader.readAsBinaryString(file);
          } catch (error) {
              console.error("Excel read error:", error);
              showToast("Excel dosyası okunamadı.", "error");
          }
      },
      handleImportExcel: async () => {
          if (excelPreview.length === 0 || !activeSchoolId) return;
          try {
              const { collection, addDoc, doc, updateDoc, arrayUnion, getDoc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const schoolDataRef = doc(db, sysColName, 'schoolData');
              const isRahleImport = activeProject === 'rahle';

              if (isRahleImport && excelPreview.some((u: any) => u.role === 'student')) {
                  const studentUsers = excelPreview.filter((u: any) => u.role === 'student' && u.name);
                  const targetRahleCls = studentUsers[0]?.classLevel || null;
                  await (actions as any).handleAddRahleOnlyStudents(
                      targetRahleCls,
                      studentUsers.map((u: any) => u.gender ? `${u.name} - ${u.gender}` : u.name)
                  );
                  setAdminTab('classes');
                  setExcelFile(null);
                  setExcelPreview([]);
                  return;
              }

              const nextStudentGenders: Record<string, 'K' | 'E'> = { ...studentGenders };
              let gendersChanged = false;

              for (const user of excelPreview) {
                  const creds = generateCredentials(user.name);
                  const studentGender: 'K' | 'E' | undefined = user.role === 'student'
                      ? (parseStudentGenderToken(user.gender) || inferStudentGender(user.name))
                      : undefined;
                  if (user.role === 'student' && studentGender) {
                      nextStudentGenders[user.name] = studentGender;
                      gendersChanged = true;
                  }
                  await addDoc(collection(db, userColName), {
                      ...user,
                      ...(studentGender ? { gender: studentGender } : {}),
                      ...creds,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });

                  if (user.role === 'student' && user.classLevel) {
                      const snap = await getDoc(schoolDataRef);
                      if (snap.exists()) {
                          await updateDoc(schoolDataRef, {
                              [user.classLevel]: arrayUnion(user.name)
                          });
                      } else {
                          await setDoc(schoolDataRef, {
                              [user.classLevel]: [user.name]
                          });
                      }
                  }
              }

              if (gendersChanged) {
                  setStudentGenders(nextStudentGenders);
                  await setDoc(schoolDataRef, { studentGenders: nextStudentGenders }, { merge: true }).catch(() => {});
              }

              if (excelPreview.length > 0) {
                  const firstUser = excelPreview[0];
                  if (firstUser.role === 'student' && firstUser.classLevel) {
                      setAdminTab('classes');
                  } else {
                      setAdminTab('list');
                  }
              }

              setExcelFile(null);
              setExcelPreview([]);
              showToast(`${excelPreview.length} kullanıcı içe aktarıldı.`, "success");
          } catch (error) {
              console.error("Import error:", error);
              showToast("İçe aktarma başarısız.", "error");
          }
      }, 
      setExcelFile, setExcelPreview,
      setSelectedStudent,
      setSelectedClass,
      handleAddClass: async (className: string) => {
          if (!className || !activeSchoolId) return;
          const formattedName = className.trim().toUpperCase().replace(/^_+/, '');
          if (!formattedName) return;
          try {
              const { doc, updateDoc, setDoc, getDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const docRef = doc(db, sysColName, 'schoolData');
              const snap = await getDoc(docRef);
              const nextOrder = Array.from(new Set([...Object.keys(classes), formattedName]));
              if (snap.exists()) {
                  await updateDoc(docRef, { [formattedName]: [], classOrder: nextOrder });
              } else {
                  await setDoc(docRef, { [formattedName]: [], classOrder: nextOrder });
              }
              showToast("Sınıf eklendi.", "success");
          } catch (error) {
              console.error("Error adding class:", error);
              showToast("Hata oluştu.", "error");
          }
      },
      handleReorderClasses: async (newOrder: string[]) => {
          if (!activeSchoolId || !Array.isArray(newOrder)) return;
          // Optimistically reorder local state
          setClassOrder(newOrder);
          setClasses((prev: any) => {
              const reordered: Record<string, any> = {};
              newOrder.forEach(k => {
                  if (prev[k] !== undefined) reordered[k] = prev[k];
              });
              Object.keys(prev).forEach(k => {
                  if (reordered[k] === undefined) reordered[k] = prev[k];
              });
              return reordered;
          });
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), { classOrder: newOrder }, { merge: true });
              showToast("Sınıf sıralaması güncellendi.", "success");
          } catch (error) {
              console.error("Error reordering classes:", error);
              showToast("Sınıf sıralaması kaydedilirken hata oluştu.", "error");
          }
      },
      handleRenameClass: async (oldClassName: string, rawNewClassName: string): Promise<string | null> => {
          if (!oldClassName || !rawNewClassName || !activeSchoolId) return null;
          const newClassName = String(rawNewClassName).trim().toUpperCase().replace(/^_+/, '');
          if (!newClassName || newClassName === oldClassName) return null;
          if (classes[newClassName] !== undefined) {
              showToast("Bu isimde bir sınıf zaten mevcut!", "error");
              return null;
          }
          try {
              const { doc, updateDoc, deleteField, collection, getDocs, writeBatch, getDoc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const schoolDataRef = doc(db, sysColName, 'schoolData');

              const currentKeys = Object.keys(classes);
              const updatedOrder = currentKeys.map(k => (k === oldClassName ? newClassName : k));
              const studentList = classes[oldClassName] || [];

              // Optimistically update local state
              setClassOrder(updatedOrder);
              setClasses((prev: any) => {
                  const next: Record<string, any> = {};
                  updatedOrder.forEach(k => {
                      if (k === newClassName) next[newClassName] = studentList;
                      else if (prev[k] !== undefined) next[k] = prev[k];
                  });
                  return next;
              });
              if (selectedClass === oldClassName) {
                  setSelectedClass(newClassName);
              }

              // 1. Update schoolData
              const nextAdvisors: Record<string, string> = { ...classAdvisors };
              const cleanOldCls = String(oldClassName).replace(/^_+/, '');
              const cleanNewCls = String(newClassName).replace(/^_+/, '');
              if (nextAdvisors[oldClassName] || nextAdvisors[cleanOldCls]) {
                  const adv = nextAdvisors[oldClassName] || nextAdvisors[cleanOldCls];
                  delete nextAdvisors[oldClassName];
                  delete nextAdvisors[cleanOldCls];
                  nextAdvisors[newClassName] = adv;
                  nextAdvisors[cleanNewCls] = adv;
                  setClassAdvisors(nextAdvisors);
                  try {
                      localStorage.setItem(`maarif_class_advisors_${activeSchoolId || 'default'}`, JSON.stringify(nextAdvisors));
                  } catch {}
              }
              await updateDoc(schoolDataRef, {
                  [newClassName]: studentList,
                  [oldClassName]: deleteField(),
                  classOrder: updatedOrder,
                  classAdvisors: nextAdvisors
              });

              // 2. Update student users in Firestore
              const norm = (s: any) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
              const uSnap = await getDocs(collection(db, userColName));
              const batch = writeBatch(db);
              let batchCount = 0;
              uSnap.forEach(uDoc => {
                  const uData = uDoc.data();
                  if ((uData.role === 'student' || uData.role === 'öğrenci') && (uData.classLevel === oldClassName || norm(uData.classLevel) === norm(oldClassName))) {
                      batch.update(doc(db, userColName, uDoc.id), { classLevel: newClassName });
                      batchCount++;
                  }
              });
              if (batchCount > 0) {
                  await batch.commit();
              }

              // 3. Update Rahle profiles if any belong to oldClassName
              try {
                  const rahleRef = doc(db, 'rahle_hafizlik', activeSchoolId || 'default');
                  const rahleSnap = await getDoc(rahleRef);
                  if (rahleSnap.exists() && rahleSnap.data()?.profiles) {
                      const oldProfiles = rahleSnap.data().profiles;
                      const nextProfiles: Record<string, any> = {};
                      let changedRahle = false;
                      Object.entries(oldProfiles).forEach(([k, prof]: [string, any]) => {
                          if (k.startsWith(`${oldClassName}_`) || prof?.className === oldClassName) {
                              changedRahle = true;
                              const stuName = prof?.studentName || k.substring(oldClassName.length + 1);
                              const newKey = `${newClassName}_${stuName}`;
                              nextProfiles[newKey] = { ...prof, className: newClassName };
                          } else {
                              nextProfiles[k] = prof;
                          }
                      });
                      if (changedRahle) {
                          await setDoc(rahleRef, { profiles: nextProfiles, updatedAt: new Date().toISOString() }, { merge: true });
                      }
                  }
              } catch (e) {
                  console.warn("Rahle class rename sync warning:", e);
              }

              showToast(`Sınıf adı "${newClassName.replace('_', '')}" olarak güncellendi.`, "success");
              return newClassName;
          } catch (error) {
              console.error("Error renaming class:", error);
              showToast("Sınıf adı değiştirilirken hata oluştu.", "error");
              return null;
          }
      },
      handleToggleStudentHafizlik: async (studentName: string, className: string, isHafizlik: boolean) => {
          if (!studentName || !activeSchoolId) return;
          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const targetNorm = norm(studentName);

          // Optimistically update local states
          setHafizlikStudents(prev => {
              const filtered = prev.filter(s => norm(s) !== targetNorm);
              return isHafizlik ? [...filtered, studentName] : filtered;
          });
          setUsers(prev => prev.map(u => {
              if ((u.role === 'student' || u.role === 'öğrenci') && norm(u.name) === targetNorm) {
                  return { ...u, isHafizlik };
              }
              return u;
          }));

          try {
              const { doc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;

              // 1. Update schoolData.hafizlikStudents (and remove from rahleClasses if unchecked)
              const schoolDataRef = doc(db, sysColName, 'schoolData');
              const nextRahleClasses: Record<string, string[]> = {};
              let rahleClassesChanged = false;
              if (!isHafizlik) {
                  Object.entries(rahleClasses).forEach(([rCls, stus]) => {
                      const filteredList = (stus || []).filter(s => norm(s) !== targetNorm);
                      if (filteredList.length !== (stus || []).length) {
                          rahleClassesChanged = true;
                      }
                      nextRahleClasses[rCls] = filteredList;
                  });
                  if (rahleClassesChanged) {
                      setRahleClasses(nextRahleClasses);
                  }
              }
              await setDoc(schoolDataRef, {
                  hafizlikStudents: isHafizlik ? arrayUnion(studentName) : arrayRemove(studentName),
                  ...(rahleClassesChanged ? { rahleClasses: nextRahleClasses } : {})
              }, { merge: true });

              // 2. Update or create student user document in users collection
              const matchedUsers = users.filter((u: any) => (u.role === 'student' || u.role === 'öğrenci') && norm(u.name) === targetNorm);
              if (matchedUsers.length > 0) {
                  for (const u of matchedUsers) {
                      if (u.id) {
                          await updateDoc(doc(db, userColName, u.id), { isHafizlik });
                      }
                  }
              } else {
                  const creds = generateCredentials(studentName);
                  await addDoc(collection(db, userColName), {
                      name: studentName,
                      ...creds,
                      role: 'student',
                      classLevel: className,
                      isHafizlik,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }

              showToast(
                  isHafizlik
                      ? `${studentName} hafızlık öğrencisi olarak tanımlandı ve Hafızlık Havuzuna eklendi.`
                      : `${studentName} hafızlık öğrencisi listesinden çıkarıldı.`,
                  "success"
              );
          } catch (error) {
              console.error("Error toggling student hafizlik:", error);
              showToast("Hafızlık durumu güncellenirken hata oluştu.", "error");
          }
      },
      // --- RAHLE-SPECIFIC CLASS & POOL MANAGEMENT ACTIONS ---
      handleAddRahleClass: async (className: string, explicitGender?: 'K' | 'E' | string): Promise<boolean> => {
          if (!className || !activeSchoolId) return false;
          const formattedName = String(className).trim().toUpperCase().replace(/^_+/, '');
          if (!formattedName || formattedName === 'HAFIZLIK HAVUZU') return false;
          if (rahleClasses[formattedName] !== undefined) {
              showToast("Bu isimde bir Rahle sınıfı zaten mevcut!", "error");
              return false;
          }

          const activeUserGender = getCurrentUserHafizlikGenderFilter();
          const parsedExplicit = parseStudentGenderToken(explicitGender);
          const lowerCls = formattedName.toLocaleLowerCase('tr-TR');
          const nameInferredGender: 'K' | 'E' | null =
              (lowerCls.includes('kız') || lowerCls.includes('kiz')) && !lowerCls.includes('erkek')
                  ? 'K'
                  : lowerCls.includes('erkek') && !lowerCls.includes('kız') && !lowerCls.includes('kiz')
                  ? 'E'
                  : null;

          // If explicitly selected or inferred as Kız/Erkek, use it; otherwise if Kur'an Kursu admin/teacher, use their gender
          const finalClassGender: 'K' | 'E' | null = parsedExplicit || nameInferredGender || activeUserGender;
          if (!finalClassGender) {
              showToast("Lütfen açılacak Rahle sınıfının Kız (K) veya Erkek (E) sınıfı olduğunu seçin.", "error");
              return false;
          }

          const nextClasses = { ...rahleClasses, [formattedName]: [] };
          const nextOrder = Array.from(new Set([...Object.keys(rahleClasses), formattedName]));
          const nextClassGenders: Record<string, 'K' | 'E'> = {
              ...rahleClassGenders,
              [formattedName]: finalClassGender
          };
          setRahleClasses(nextClasses);
          setRahleClassOrder(nextOrder);
          setRahleClassGenders(nextClassGenders);
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleClasses: nextClasses,
                  rahleClassOrder: nextOrder,
                  rahleClassGenders: nextClassGenders
              }, { merge: true });
              const genderLabel = finalClassGender === 'K' ? 'Kız Sınıfı' : 'Erkek Sınıfı';
              showToast(`"${formattedName}" (${genderLabel}) Rahle sınıfı oluşturuldu.`, "success");
              return true;
          } catch (error) {
              console.error("Error adding Rahle class:", error);
              showToast("Rahle sınıfı eklenirken hata oluştu.", "error");
              return false;
          }
      },
      handleUpdateRahleClassGender: async (className: string, gender: 'K' | 'E') => {
          if (!className || !activeSchoolId) return;
          const parsed = parseStudentGenderToken(gender);
          if (!parsed) return;
          const nextClassGenders: Record<string, 'K' | 'E'> = {
              ...rahleClassGenders,
              [className]: parsed
          };
          setRahleClassGenders(nextClassGenders);
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleClassGenders: nextClassGenders
              }, { merge: true });
              showToast(`"${className}" sınıfı ${parsed === 'K' ? 'Kız (K)' : 'Erkek (E)'} sınıfı olarak güncellendi.`, "success");
          } catch (error) {
              console.error("Error updating Rahle class gender:", error);
              showToast("Sınıf cinsiyeti güncellenirken hata oluştu.", "error");
          }
      },
      handleReorderRahleClasses: async (newOrder: string[]) => {
          if (!activeSchoolId || !Array.isArray(newOrder)) return;
          setRahleClassOrder(newOrder);
          const reordered: Record<string, string[]> = {};
          newOrder.forEach(k => {
              if (rahleClasses[k] !== undefined) reordered[k] = rahleClasses[k];
          });
          Object.keys(rahleClasses).forEach(k => {
              if (reordered[k] === undefined) reordered[k] = rahleClasses[k];
          });
          setRahleClasses(reordered);
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleClassOrder: newOrder,
                  rahleClasses: reordered
              }, { merge: true });
              showToast("Rahle sınıf sıralaması güncellendi.", "success");
          } catch (error) {
              console.error("Error reordering Rahle classes:", error);
              showToast("Sıralama kaydedilirken hata oluştu.", "error");
          }
      },
      handleRenameRahleClass: async (oldClassName: string, rawNewClassName: string): Promise<string | null> => {
          if (!oldClassName || !rawNewClassName || !activeSchoolId) return null;
          const newClassName = String(rawNewClassName).trim().toUpperCase().replace(/^_+/, '');
          if (!newClassName || newClassName === oldClassName || newClassName === 'HAFIZLIK HAVUZU') return null;
          if (rahleClasses[newClassName] !== undefined) {
              showToast("Bu isimde bir Rahle sınıfı zaten mevcut!", "error");
              return null;
          }
          try {
              const { doc, setDoc, collection, getDocs, writeBatch } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;

              const currentKeys = Object.keys(rahleClasses);
              const updatedOrder = currentKeys.map(k => (k === oldClassName ? newClassName : k));
              const studentList = rahleClasses[oldClassName] || [];
              const nextRahleClasses: Record<string, string[]> = {};
              updatedOrder.forEach(k => {
                  if (k === newClassName) nextRahleClasses[newClassName] = studentList;
                  else if (rahleClasses[k] !== undefined) nextRahleClasses[k] = rahleClasses[k];
              });

              const nextClassGenders: Record<string, 'K' | 'E'> = {};
              Object.entries(rahleClassGenders).forEach(([k, v]) => {
                  if (k === oldClassName) nextClassGenders[newClassName] = v;
                  else nextClassGenders[k] = v;
              });

              setRahleClassOrder(updatedOrder);
              setRahleClasses(nextRahleClasses);
              setRahleClassGenders(nextClassGenders);
              if (selectedClass === oldClassName) setSelectedClass(newClassName);

              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleClasses: nextRahleClasses,
                  rahleClassOrder: updatedOrder,
                  rahleClassGenders: nextClassGenders
              }, { merge: true });

              // Only update classLevel on Rahle-only students (never touch multi-module students!)
              const norm = (s: any) => String(s || '').trim().toLowerCase();
              const uSnap = await getDocs(collection(db, userColName));
              const batch = writeBatch(db);
              let batchCount = 0;
              uSnap.forEach(uDoc => {
                  const uData = uDoc.data();
                  if ((uData.role === 'student' || uData.role === 'öğrenci') && uData.isRahleOnly && norm(uData.classLevel) === norm(oldClassName)) {
                      batch.update(doc(db, userColName, uDoc.id), { classLevel: newClassName, rahleClassLevel: newClassName });
                      batchCount++;
                  }
              });
              if (batchCount > 0) await batch.commit();

              showToast(`Rahle sınıf adı "${newClassName}" olarak güncellendi.`, "success");
              return newClassName;
          } catch (error) {
              console.error("Error renaming Rahle class:", error);
              showToast("Rahle sınıf adı değiştirilirken hata oluştu.", "error");
              return null;
          }
      },
      handleDeleteRahleClass: async (className: string, onAfterDelete?: () => void) => {
          if (!className || typeof className !== 'string' || !activeSchoolId) return;
          requestConfirm(`${String(className).replace('_', '')} Rahle sınıfını silmek istediğinize emin misiniz? (Öğrencilerin verileri silinmez, Hafızlık Havuzunda kalmaya devam eder.)`, async () => {
              try {
                  const { doc, setDoc } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                  const nextRahleClasses: Record<string, string[]> = {};
                  Object.entries(rahleClasses).forEach(([k, v]) => {
                      if (k !== className) nextRahleClasses[k] = v;
                  });
                  const nextClassGenders: Record<string, 'K' | 'E'> = {};
                  Object.entries(rahleClassGenders).forEach(([k, v]) => {
                      if (k !== className) nextClassGenders[k] = v;
                  });
                  const nextOrder = Object.keys(nextRahleClasses);
                  setRahleClasses(nextRahleClasses);
                  setRahleClassOrder(nextOrder);
                  setRahleClassGenders(nextClassGenders);
                  await setDoc(doc(db, sysColName, 'schoolData'), {
                      rahleClasses: nextRahleClasses,
                      rahleClassOrder: nextOrder,
                      rahleClassGenders: nextClassGenders
                  }, { merge: true });
                  if (selectedClass === className) setSelectedClass(null);
                  if (onAfterDelete) onAfterDelete();
                  showToast("Rahle sınıfı silindi. Öğrenciler Hafızlık Havuzunda korunmaktadır.", "success");
              } catch (error) {
                  console.error("Error deleting Rahle class:", error);
                  showToast("Hata oluştu.", "error");
              }
          });
      },
      handleAssignStudentsToRahleClass: async (targetRahleClass: string, studentNames: string[]) => {
          if (!activeSchoolId || !Array.isArray(studentNames) || studentNames.length === 0) return;
          const isUnassign = !targetRahleClass || targetRahleClass === '__UNASSIGNED__' || targetRahleClass === 'Hafızlık Havuzu';
          const targetClassGender = !isUnassign ? getRahleClassGender(targetRahleClass) : null;
          const validStudentNames = targetClassGender
              ? studentNames.filter(s => getStudentGender(s) === targetClassGender)
              : studentNames;

          if (!isUnassign && targetClassGender && validStudentNames.length === 0) {
              showToast(`Seçilen öğrencilerin cinsiyeti "${targetRahleClass}" (${targetClassGender === 'K' ? 'Kız' : 'Erkek'} Sınıfı) ile uyuşmuyor!`, "error");
              return;
          }

          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const targetNormSet = new Set(validStudentNames.map(s => norm(s)));

          const nextRahleClasses: Record<string, string[]> = {};
          Object.entries(rahleClasses).forEach(([cls, stus]) => {
              // Remove from other Rahle classes so each student has a clean single Rahle class assignment
              const filtered = (stus || []).filter(s => !targetNormSet.has(norm(s)));
              if (cls === targetRahleClass) {
                  nextRahleClasses[cls] = [...filtered, ...validStudentNames];
              } else {
                  nextRahleClasses[cls] = filtered;
              }
          });
          if (!isUnassign && !nextRahleClasses[targetRahleClass]) {
              nextRahleClasses[targetRahleClass] = [...validStudentNames];
          }

          // If target class had no explicit gender stored yet, lock it to the assigned student's gender
          let nextClassGenders = rahleClassGenders;
          let classGendersChanged = false;
          if (!isUnassign && !rahleClassGenders[targetRahleClass] && validStudentNames.length > 0) {
              const inferredClsGender = getStudentGender(validStudentNames[0]);
              nextClassGenders = {
                  ...rahleClassGenders,
                  [targetRahleClass]: inferredClsGender
              };
              classGendersChanged = true;
              setRahleClassGenders(nextClassGenders);
          }

          setRahleClasses(nextRahleClasses);
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleClasses: nextRahleClasses,
                  ...(classGendersChanged ? { rahleClassGenders: nextClassGenders } : {})
              }, { merge: true });
              if (isUnassign) {
                  showToast(`${validStudentNames.length} öğrenci Rahle sınıfından çıkarılarak Hafızlık Havuzuna alındı.`, "success");
              } else {
                  showToast(`${validStudentNames.length} öğrenci "${targetRahleClass}" Rahle sınıfına eklendi (Öğrenci verileri korundu).`, "success");
              }
          } catch (error) {
              console.error("Error assigning students to Rahle class:", error);
              showToast("Öğrenciler Rahle sınıfına atanırken hata oluştu.", "error");
          }
      },
      handleRemoveStudentFromRahleClass: async (rahleClassName: string, studentName: string) => {
          if (!activeSchoolId || !rahleClassName || !studentName) return;
          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const nextRahleClasses: Record<string, string[]> = {
              ...rahleClasses,
              [rahleClassName]: (rahleClasses[rahleClassName] || []).filter(s => norm(s) !== norm(studentName))
          };
          setRahleClasses(nextRahleClasses);
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleClasses: nextRahleClasses
              }, { merge: true });
              showToast(`${studentName} "${rahleClassName}" sınıfından çıkarıldı (Hafızlık Havuzunda mevcut).`, "success");
          } catch (error) {
              console.error("Error removing student from Rahle class:", error);
              showToast("İşlem sırasında hata oluştu.", "error");
          }
      },
      handleAddRahleOnlyStudents: async (
          targetRahleClass: string | null,
          rawInputOrNames: string | string[],
          customSingleCreds?: { username?: string; password?: string; studentNo?: string; gender?: string }
      ) => {
          if (!activeSchoolId) return;
          const rawNames = Array.isArray(rawInputOrNames)
              ? rawInputOrNames.map(n => String(n || '').trim()).filter(Boolean)
              : String(rawInputOrNames || '').split(/[\n,]/).map(n => n.trim()).filter(Boolean);
          if (rawNames.length === 0) return;

          try {
              const { collection, addDoc, doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const norm = (s: any) => String(s || '').trim().toLowerCase();

              const effectiveRahleClass = (targetRahleClass && targetRahleClass !== 'Hafızlık Havuzu' && targetRahleClass !== '__POOL__')
                  ? targetRahleClass
                  : '';
              const targetClassGender = effectiveRahleClass ? getRahleClassGender(effectiveRahleClass) : null;
              const activeUserGender = getCurrentUserHafizlikGenderFilter();
              const enforcedGender: 'K' | 'E' | null = targetClassGender || activeUserGender || null;

              const parsedEntries = rawNames.map((rawLine, index) => {
                  const explicitNo = (index === 0 && customSingleCreds?.studentNo?.trim()) ? customSingleCreds.studentNo.trim() : undefined;
                  const entry = parseStudentInputEntry(rawLine, explicitNo);
                  const singleExplicitGender = index === 0 ? parseStudentGenderToken(customSingleCreds?.gender) : null;
                  const finalGender: 'K' | 'E' = enforcedGender || singleExplicitGender || entry.explicitGender || entry.gender;
                  return {
                      formattedName: entry.formattedName,
                      gender: finalGender
                  };
              });

              const formattedNames = parsedEntries.map(e => e.formattedName);
              const nextStudentGenders: Record<string, 'K' | 'E'> = { ...studentGenders };
              parsedEntries.forEach(e => {
                  nextStudentGenders[e.formattedName] = e.gender;
              });

              for (let i = 0; i < parsedEntries.length; i++) {
                  const { formattedName: name, gender } = parsedEntries[i];
                  const creds = generateCredentials(name);
                  const username = (i === 0 && customSingleCreds?.username?.trim()) ? customSingleCreds.username.trim() : creds.username;
                  const password = (i === 0 && customSingleCreds?.password?.trim()) ? customSingleCreds.password.trim() : creds.password;
                  await addDoc(collection(db, userColName), {
                      name,
                      username,
                      password,
                      gender,
                      role: 'student',
                      classLevel: effectiveRahleClass || 'Hafızlık Havuzu',
                      rahleClassLevel: effectiveRahleClass || '',
                      isHafizlik: true,
                      isRahleOnly: true,
                      allowedProjects: ['rahle'],
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }

              const nextRahleOnly = Array.from(new Set([...rahleOnlyStudents, ...formattedNames]));
              const nextHafizlik = Array.from(new Set([...hafizlikStudents, ...formattedNames]));
              const nextRahleClasses = { ...rahleClasses };
              if (effectiveRahleClass) {
                  const existingList = nextRahleClasses[effectiveRahleClass] || [];
                  const additions = formattedNames.filter(n => !existingList.some(e => norm(e) === norm(n)));
                  nextRahleClasses[effectiveRahleClass] = [...existingList, ...additions];
              }

              setRahleOnlyStudents(nextRahleOnly);
              setHafizlikStudents(nextHafizlik);
              setRahleClasses(nextRahleClasses);
              setStudentGenders(nextStudentGenders);

              await setDoc(doc(db, sysColName, 'schoolData'), {
                  rahleOnlyStudents: nextRahleOnly,
                  hafizlikStudents: nextHafizlik,
                  rahleClasses: nextRahleClasses,
                  studentGenders: nextStudentGenders
              }, { merge: true });

              showToast(
                  effectiveRahleClass
                      ? `${formattedNames.length} yeni Rahle öğrencisi "${effectiveRahleClass}" sınıfına ve Hafızlık Havuzuna eklendi.`
                      : `${formattedNames.length} yeni Rahle öğrencisi Hafızlık Havuzuna eklendi.`,
                  "success"
              );
          } catch (error) {
              console.error("Error adding Rahle-only students:", error);
              showToast("Yeni Rahle öğrencisi eklenirken hata oluştu.", "error");
          }
      },
      handleDeleteClass: async (className: string, onAfterDelete?: () => void) => {
          if (!className || typeof className !== 'string' || !activeSchoolId) return;
          requestConfirm(`${String(className).replace('_', '')} sınıfını ve tüm öğrenci listesini silmek istediğinize emin misiniz?`, async () => {
              try {
                  const { doc, updateDoc, deleteField } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                  const docRef = doc(db, sysColName, 'schoolData');
                  const nextOrder = Object.keys(classes).filter(k => k !== className);
                  const nextAdvisors: Record<string, string> = { ...classAdvisors };
                  delete nextAdvisors[className];
                  delete nextAdvisors[String(className).replace(/^_+/, '')];
                  setClassAdvisors(nextAdvisors);
                  await updateDoc(docRef, { [className]: deleteField(), classOrder: nextOrder, classAdvisors: nextAdvisors });
                  if (selectedClass === className) setSelectedClass(null);
                  if (onAfterDelete) onAfterDelete();
                  showToast("Sınıf silindi.", "success");
              } catch (error) {
                  console.error("Error deleting class:", error);
                  showToast("Hata oluştu.", "error");
              }
          });
      },
      handleUpdateClassAdvisor: async (className: string, teacherName: string) => {
          if (!className || !activeSchoolId) return;
          const cleanCls = String(className).replace(/^_+/, '').trim();
          const cleanTeacher = String(teacherName || '').trim();

          const nextAdvisors: Record<string, string> = { ...classAdvisors };
          if (cleanTeacher) {
              nextAdvisors[className] = cleanTeacher;
              nextAdvisors[cleanCls] = cleanTeacher;
          } else {
              delete nextAdvisors[className];
              delete nextAdvisors[cleanCls];
          }

          setClassAdvisors(nextAdvisors);
          try {
              localStorage.setItem(`maarif_class_advisors_${activeSchoolId || 'default'}`, JSON.stringify(nextAdvisors));
          } catch {}

          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'schoolData'), {
                  classAdvisors: nextAdvisors
              }, { merge: true });
              showToast(
                  cleanTeacher
                      ? `${cleanCls} sınıf rehber öğretmeni "${cleanTeacher}" olarak atandı.`
                      : `${cleanCls} sınıf rehber öğretmeni ataması kaldırıldı.`,
                  "success"
              );
          } catch (error) {
              console.error("Error updating class advisor:", error);
              showToast("Sınıf rehber öğretmeni güncellenirken hata oluştu.", "error");
          }
      },
      handleAddCategory: async (category: string) => {
          if (!category || !activeSchoolId) return;
          try {
              const { doc, updateDoc, arrayUnion, setDoc, getDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const docRef = doc(db, sysColName, 'curriculum');
              const snap = await getDoc(docRef);
              if (snap.exists()) {
                  await updateDoc(docRef, { categories: arrayUnion(category) });
              } else {
                  await setDoc(docRef, { categories: [category], tasks: [] });
              }
              showToast("Kategori eklendi.", "success");
          } catch (error) {
              console.error("Error adding category:", error);
          }
      },
      handleDeleteCategory: async (category: string) => {
          if (!category || !activeSchoolId) return;
          requestConfirm(`${category} kategorisini silmek istediğinize emin misiniz?`, async () => {
              try {
                  const { doc, updateDoc, arrayRemove } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                  await updateDoc(doc(db, sysColName, 'curriculum'), { categories: arrayRemove(category) });
                  showToast("Kategori silindi.", "success");
              } catch (error) {
                  console.error("Error deleting category:", error);
              }
          });
      },
      handleAddTask: async (task: any) => {
          if (!task.title || !activeSchoolId) return;
          try {
              const { doc, updateDoc, arrayUnion } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await updateDoc(doc(db, sysColName, 'curriculum'), { tasks: arrayUnion(task) });
              showToast("Görev eklendi.", "success");
          } catch (error) {
              console.error("Error adding task:", error);
          }
      },
      handleDeleteTask: async (task: any) => {
          if (!task || !activeSchoolId) return;
          requestConfirm(`${task.title} görevini silmek istediğinize emin misiniz?`, async () => {
              try {
                  const { doc, updateDoc, arrayRemove } = await import('firebase/firestore');
                  const { db } = await import('./lib/firebase');
                  const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                  await updateDoc(doc(db, sysColName, 'curriculum'), { tasks: arrayRemove(task) });
                  showToast("Görev silindi.", "success");
              } catch (error) {
                  console.error("Error deleting task:", error);
              }
          });
      },
      handleUpdateTask: async (oldTask: any, newTitle: string) => {
          if (!oldTask || !newTitle || !activeSchoolId) return;
          try {
              const { doc, getDoc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const docRef = doc(db, sysColName, 'curriculum');
              const snap = await getDoc(docRef);
              if (snap.exists()) {
                  const data = snap.data();
                  const newTasks = (data.tasks || []).map((t: any) => {
                      const tTitle = typeof t === 'string' ? t : t.title;
                      const tCat = typeof t === 'string' ? '' : t.category;
                      const oldTitle = typeof oldTask === 'string' ? oldTask : oldTask.title;
                      const oldCat = typeof oldTask === 'string' ? '' : oldTask.category;
                      
                      if (tTitle === oldTitle && tCat === oldCat) {
                          return typeof t === 'string' ? newTitle : { ...t, title: newTitle };
                      }
                      return t;
                  });
                  await updateDoc(docRef, { tasks: newTasks });
                  showToast("Görev güncellendi.", "success");
              }
          } catch (error) {
              console.error("Error updating task:", error);
          }
      },
      handleUpdateCategory: async (oldName: string, newName: string) => {
          if (!oldName || !newName || !activeSchoolId) return;
          try {
              const { doc, getDoc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const docRef = doc(db, sysColName, 'curriculum');
              const snap = await getDoc(docRef);
              if (snap.exists()) {
                  const data = snap.data();
                  const newCategories = (data.categories || []).map((c: string) => c === oldName ? newName : c);
                  const newTasks = (data.tasks || []).map((t: any) => t.category === oldName ? { ...t, category: newName } : t);
                  await updateDoc(docRef, { categories: newCategories, tasks: newTasks });
                  showToast("Kategori güncellendi.", "success");
              }
          } catch (error) {
              console.error("Error updating category:", error);
          }
      },
      handleUpdateSuccessDescription: async (level: number, text: string) => {
          if (!activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await updateDoc(doc(db, sysColName, 'curriculum'), { [`successDescriptions.${level}`]: text });
              showToast("Açıklama güncellendi.", "success");
          } catch (error) {
              console.error("Error updating success description:", error);
          }
      },
      handleUpdateRemedialTask: async (level: number, text: string) => {
          if (!activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await updateDoc(doc(db, sysColName, 'curriculum'), { [`remedialTasks.${level}`]: text });
              showToast("Telafi ödevi güncellendi.", "success");
          } catch (error) {
              console.error("Error updating remedial task:", error);
          }
      },
      handleUpdateRemedialProblem: async (level: number, text: string) => {
          if (!activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await updateDoc(doc(db, sysColName, 'curriculum'), { [`remedialProblems.${level}`]: text });
              showToast("Sorun açıklaması güncellendi.", "success");
          } catch (error) {
              console.error("Error updating remedial problem:", error);
          }
      },
      handleUpdateUncompletedReason: async (level: number, text: string) => {
          if (!activeSchoolId) return;
          try {
              const { doc, updateDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await updateDoc(doc(db, sysColName, 'curriculum'), { [`uncompletedReasons.${level}`]: text });
              showToast("Yapmadi sebebi güncellendi.", "success");
          } catch (error) {
              console.error("Error updating uncompleted reason:", error);
          }
      },
      handleUpdateDevCardConfig: async (config: any) => {
          if (!activeSchoolId) return;
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'devCardConfig'), config);
              showToast("Gelişim kartı ayarları güncellendi.", "success");
          } catch (error) {
              console.error("Error updating devCardConfig:", error);
          }
      },
      handleUpdateClassPerformances: async (records: any[]) => {
          if (!activeSchoolId) return;
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'classPerformances'), { records });
              showToast("Sınıf performans kayıtları güncellendi.", "success");
          } catch (error) {
              console.error("Error updating classPerformances:", error);
          }
      },
      handleUpdateBehaviorConfig: async (config: any) => {
          if (!activeSchoolId) return;
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'behaviorConfig'), config);
              showToast("Davranış kartı ayarları güncellendi.", "success");
          } catch (error) {
              console.error("Error updating behaviorConfig:", error);
          }
      },
      handleUpdateStudentGender: async (studentName: string, className: string, newGender: 'K' | 'E') => {
          if (!studentName || !activeSchoolId) return;
          if (getKuranKursuAdminType() || getCurrentUserHafizlikGenderFilter()) {
              showToast("Kur'an Kursu yöneticisi veya öğreticisi öğrencilerin cinsiyetini değiştiremez.", "error");
              return;
          }
          const validGender: 'K' | 'E' = newGender === 'K' ? 'K' : 'E';
          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const targetNorm = norm(studentName);

          // Optimistically update local states
          setStudentGenders(prev => ({
              ...prev,
              [studentName]: validGender
          }));
          setUsers(prev => prev.map(u => {
              if ((u.role === 'student' || u.role === 'öğrenci') && norm(u.name) === targetNorm) {
                  return { ...u, gender: validGender };
              }
              return u;
          }));

          try {
              const { doc, setDoc, updateDoc, collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;

              const nextGenders: Record<string, 'K' | 'E'> = { ...studentGenders };
              Object.keys(nextGenders).forEach(k => {
                  if (norm(k) === targetNorm && k !== studentName) {
                      delete nextGenders[k];
                  }
              });
              nextGenders[studentName] = validGender;

              await setDoc(doc(db, sysColName, 'schoolData'), {
                  studentGenders: nextGenders
              }, { merge: true });

              const matchedUsers = users.filter((u: any) => (u.role === 'student' || u.role === 'öğrenci') && norm(u.name) === targetNorm);
              if (matchedUsers.length > 0) {
                  for (const u of matchedUsers) {
                      if (u.id) {
                          await updateDoc(doc(db, userColName, u.id), { gender: validGender });
                      }
                  }
              } else if (className) {
                  const creds = generateCredentials(studentName);
                  await addDoc(collection(db, userColName), {
                      name: studentName,
                      ...creds,
                      role: 'student',
                      classLevel: className,
                      gender: validGender,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }

              showToast(`${studentName} öğrencisinin cinsiyeti "${validGender === 'K' ? 'Kız (K)' : 'Erkek (E)'}" olarak güncellendi.`, "success");
          } catch (error) {
              console.error("Error updating student gender:", error);
              showToast("Cinsiyet güncellenirken hata oluştu.", "error");
          }
      },
      handleUpdateStudentAttendanceStatus: async (studentName: string, className: string, newStatus: 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu') => {
          if (!studentName || !activeSchoolId) return;
          const validStatus: 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu' =
              newStatus === 'Sürekli Devamsız'
                  ? 'Sürekli Devamsız'
                  : newStatus === 'Kayıt Dondurdu'
                  ? 'Kayıt Dondurdu'
                  : 'Devam Eden';
          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const targetNorm = norm(studentName);

          // Optimistically update local states
          setStudentAttendanceStatuses(prev => {
              const next: Record<string, 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu'> = { ...prev };
              Object.keys(next).forEach(k => {
                  if (norm(k) === targetNorm && k !== studentName) {
                      delete next[k];
                  }
              });
              next[studentName] = validStatus;
              try {
                  localStorage.setItem(`maarif_student_attendance_${activeSchoolId || 'default'}`, JSON.stringify(next));
              } catch {}
              return next;
          });
          setUsers(prev => prev.map(u => {
              if ((u.role === 'student' || u.role === 'öğrenci') && norm(u.name) === targetNorm) {
                  return { ...u, attendanceStatus: validStatus };
              }
              return u;
          }));

          try {
              const { doc, setDoc, updateDoc, collection, addDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;

              const nextStatuses: Record<string, 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu'> = { ...studentAttendanceStatuses };
              Object.keys(nextStatuses).forEach(k => {
                  if (norm(k) === targetNorm && k !== studentName) {
                      delete nextStatuses[k];
                  }
              });
              nextStatuses[studentName] = validStatus;

              await setDoc(doc(db, sysColName, 'schoolData'), {
                  studentAttendanceStatuses: nextStatuses
              }, { merge: true });

              const matchedUsers = users.filter((u: any) => (u.role === 'student' || u.role === 'öğrenci') && norm(u.name) === targetNorm);
              if (matchedUsers.length > 0) {
                  for (const u of matchedUsers) {
                      if (u.id) {
                          await updateDoc(doc(db, userColName, u.id), { attendanceStatus: validStatus });
                      }
                  }
              } else if (className) {
                  const creds = generateCredentials(studentName);
                  await addDoc(collection(db, userColName), {
                      name: studentName,
                      ...creds,
                      role: 'student',
                      classLevel: className,
                      gender: getStudentGender(studentName),
                      attendanceStatus: validStatus,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }

              showToast(`${studentName} öğrencisinin devam durumu "${validStatus}" olarak güncellendi.`, "success");
          } catch (error) {
              console.error("Error updating student attendance status:", error);
              showToast("Devam durumu güncellenirken hata oluştu.", "error");
          }
      },
      handleBulkAddStudents: async (classId: string, input: string) => {
          if (!classId || !input || !activeSchoolId) return;
          const names = input.split(/[\n,]/).map(n => n.trim()).filter(n => n.length > 0);
          if (names.length === 0) return;

          try {
              const { collection, addDoc, doc, updateDoc, setDoc, arrayUnion } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const { generateCredentials } = await import('./lib/utils');
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;

              const parsedEntries = names.map(rawLine => parseStudentInputEntry(rawLine));
              const formattedNames = parsedEntries.map(e => e.formattedName);
              const nextStudentGenders: Record<string, 'K' | 'E'> = { ...studentGenders };
              parsedEntries.forEach(e => {
                  nextStudentGenders[e.formattedName] = e.gender;
              });
              setStudentGenders(nextStudentGenders);

              for (const entry of parsedEntries) {
                  const creds = generateCredentials(entry.formattedName);
                  await addDoc(collection(db, userColName), {
                      name: entry.formattedName,
                      ...creds,
                      gender: entry.gender,
                      role: 'student',
                      classLevel: classId,
                      schoolId: activeSchoolId,
                      createdAt: new Date().toISOString()
                  });
              }

              const schoolDataRef = doc(db, sysColName, 'schoolData');
              await updateDoc(schoolDataRef, {
                  [classId]: arrayUnion(...formattedNames),
                  studentGenders: nextStudentGenders
              }).catch(async () => {
                  await setDoc(schoolDataRef, {
                      [classId]: formattedNames,
                      studentGenders: nextStudentGenders
                  }, { merge: true });
              });

              showToast(`${formattedNames.length} öğrenci başarıyla eklendi.`, "success");
          } catch (error) {
              console.error("Error bulk adding students:", error);
              showToast("Öğrenciler eklenirken hata oluştu.", "error");
          }
      },
      handleSetViewingAcademicYear: (year: string) => {
          setViewingAcademicYear(year);
          setSelectedClass(null);
          setSelectedStudent(null);
          if (year !== activeAcademicYear) {
              showToast(`${year} eğitim-öğretim yılı arşiv kayıtları yükleniyor (Salt Okunur).`, "info");
          } else {
              showToast(`Aktif döneme (${activeAcademicYear}) dönüldü.`, "success");
          }
      },
      handleUpdateAcademicYearConfig: async (newActiveYear: string, newPastYears: string[]) => {
          try {
              const { doc, setDoc } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              await setDoc(doc(db, sysColName, 'academicYear'), {
                  activeYear: newActiveYear,
                  pastYears: newPastYears,
                  updatedAt: new Date().toISOString()
              }, { merge: true });
              setActiveAcademicYear(newActiveYear);
              setPastAcademicYears(newPastYears);
              localStorage.setItem('maarif_active_academic_year', newActiveYear);
              localStorage.setItem('maarif_past_academic_years', JSON.stringify(newPastYears));
              showToast("Eğitim yılı ayarları başarıyla güncellendi.", "success");
          } catch (e: any) {
              console.error(e);
              showToast("Ayar güncellenirken hata oluştu.", "error");
          }
      },
      handleExecuteYearCloseAndAdvancement: async ({ closedYear, nextYear, newClasses, plans }: any) => {
          try {
              const { doc, setDoc, collection, getDocs, writeBatch } = await import('firebase/firestore');
              const { db } = await import('./lib/firebase');
              const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
              const userColName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;

              // 1. Snapshot current students for archive
              const studentUsersSnap = users.filter((u: any) => u.role === 'student');
              const archiveData = {
                  year: closedYear,
                  closedAt: new Date().toISOString(),
                  closedBy: currentUser?.name || 'Sistem Yöneticisi',
                  classes: { ...classes },
                  students: studentUsersSnap.map((u: any) => ({
                      id: u.id,
                      name: u.name,
                      classLevel: u.classLevel,
                      username: u.username
                  })),
                  totalStudents: studentUsersSnap.length,
                  totalClasses: Object.keys(classes).length
              };

              // 2. Save archive document in Firestore
              await setDoc(doc(db, `academic_archives_${activeSchoolId}`, closedYear), archiveData);

              // 3. Update students classLevel in users collection in batches
              const plansMap = new Map<string, string>(); // oldClassName -> newClassName
              const graduatingClassesSet = new Set<string>();
              plans.forEach((p: any) => {
                  plansMap.set(p.oldClassName, p.newClassName);
                  if (p.isGraduating) graduatingClassesSet.add(p.newClassName);
              });

              const userDocsSnap = await getDocs(collection(db, userColName));
              const batch = writeBatch(db);
              let batchCount = 0;

              userDocsSnap.forEach((uDoc) => {
                  const uData = uDoc.data();
                  if (uData.role === 'student' && uData.classLevel) {
                      const newTargetClass = plansMap.get(uData.classLevel);
                      if (newTargetClass) {
                          const isGrad = graduatingClassesSet.has(newTargetClass);
                          batch.update(doc(db, userColName, uDoc.id), {
                              classLevel: newTargetClass,
                              isGraduated: isGrad,
                              graduatedYear: isGrad ? parseInt(closedYear.split('-')[1] || closedYear, 10) : null,
                              updatedAt: new Date().toISOString()
                          });
                          batchCount++;
                      }
                  }
              });

              if (batchCount > 0) {
                  await batch.commit();
              }

              // 4. Overwrite schoolData with newClasses
              await setDoc(doc(db, sysColName, 'schoolData'), newClasses);

              // 5. Update academicYear config in Firestore
              const updatedPastYears = Array.from(new Set([...pastAcademicYears, closedYear]));
              await setDoc(doc(db, sysColName, 'academicYear'), {
                  activeYear: nextYear,
                  pastYears: updatedPastYears,
                  closedYears: {
                      [closedYear]: {
                          closedAt: new Date().toISOString(),
                          closedBy: currentUser?.name || 'Sistem Yöneticisi',
                          studentCount: studentUsersSnap.length,
                          classCount: Object.keys(classes).length
                      }
                  },
                  updatedAt: new Date().toISOString()
              }, { merge: true });

              // 6. Update local states
              setActiveAcademicYear(nextYear);
              setViewingAcademicYear(nextYear);
              setPastAcademicYears(updatedPastYears);
              setClasses(newClasses);
              localStorage.setItem('maarif_active_academic_year', nextYear);
              localStorage.setItem('maarif_past_academic_years', JSON.stringify(updatedPastYears));

              showToast(`${closedYear} dönemi kapatıldı ve ${nextYear} yılına sene atlatıldı!`, "success");
          } catch (err: any) {
              console.error("Year close execution error:", err);
              showToast("Sene atlatma sırasında hata oluştu: " + err.message, "error");
              throw err;
          }
      }
  };

  const isStudentHafizlik = (studentName: string, studentUserObj?: any): boolean => {
      if (!studentName && !studentUserObj) return false;
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const targetName = norm(studentName || studentUserObj?.name || '');

      if (targetName && rahleOnlyStudents.some(r => norm(r) === targetName)) {
          return true;
      }
      if (targetName && Object.values(rahleClasses).some(stus => (stus || []).some(s => norm(s) === targetName))) {
          return true;
      }

      const matchedUser = users.find((u: any) =>
          (u.role === 'student' || u.role === 'öğrenci') &&
          (
              (targetName && norm(u.name) === targetName) ||
              (studentUserObj?.id && u.id === studentUserObj.id) ||
              (studentUserObj?.username && norm(u.username) === norm(studentUserObj.username))
          )
      );
      if (matchedUser?.isRahleOnly || studentUserObj?.isRahleOnly) {
          return true;
      }
      if (matchedUser && typeof matchedUser.isHafizlik === 'boolean') {
          return matchedUser.isHafizlik;
      }
      if (studentUserObj && typeof studentUserObj.isHafizlik === 'boolean') {
          return studentUserObj.isHafizlik;
      }
      return targetName ? hafizlikStudents.some(h => norm(h) === targetName) : false;
  };

  // Returns the regular school class (e.g. "5A", "6-A") if the student belongs to one (Arif/Alim/Pusula), or null
  const getStudentSchoolClass = (studentName: string): string | null => {
      if (!studentName) return null;
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const targetNorm = norm(studentName);
      for (const [cls, stus] of Object.entries(classes || {})) {
          if (Array.isArray(stus) && stus.some(s => norm(s) === targetNorm)) {
              return cls;
          }
      }
      return null;
  };

  // Returns true ONLY if the student was added exclusively for the Rahle module and does NOT use any other module (Arif/Alim/Pusula)
  const isStudentRahleOnly = (studentName: string, studentUserObj?: any): boolean => {
      if (!studentName && !studentUserObj) return false;
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const targetName = norm(studentName || studentUserObj?.name || '');

      // If the student is in any regular school class (used by Arif, Alim, Pusula), they use other modules -> NOT Rahle-only!
      if (getStudentSchoolClass(studentName || studentUserObj?.name || '') !== null) {
          return false;
      }

      const matchedUser = users.find((u: any) =>
          (u.role === 'student' || u.role === 'öğrenci') &&
          (
              (targetName && norm(u.name) === targetName) ||
              (studentUserObj?.id && u.id === studentUserObj.id) ||
              (studentUserObj?.username && norm(u.username) === norm(studentUserObj.username))
          )
      );

      const allowedProjects = matchedUser?.allowedProjects || studentUserObj?.allowedProjects;
      if (Array.isArray(allowedProjects) && allowedProjects.some((p: string) => p !== 'rahle')) {
          return false;
      }

      if (matchedUser && typeof matchedUser.isRahleOnly === 'boolean') {
          return matchedUser.isRahleOnly;
      }
      if (studentUserObj && typeof studentUserObj.isRahleOnly === 'boolean') {
          return studentUserObj.isRahleOnly;
      }
      return targetName ? rahleOnlyStudents.some(r => norm(r) === targetName) : false;
  };

  // Returns the assigned Rahle class for a student, or null if only in the pool
  const getStudentRahleClass = (studentName: string): string | null => {
      if (!studentName) return null;
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const targetNorm = norm(studentName);
      for (const [rCls, stus] of Object.entries(rahleClasses || {})) {
          if (Array.isArray(stus) && stus.some(s => norm(s) === targetNorm)) {
              return rCls;
          }
      }
      return null;
  };

  // Returns 'K' or 'E' for any student (explicitly stored or automatically inferred from Turkish first name)
  const getStudentGender = (studentName: string, studentUserObj?: any): 'K' | 'E' => {
      const explicitFromObj = parseStudentGenderToken(studentUserObj?.gender);
      if (explicitFromObj) return explicitFromObj;

      const rawName = String(studentName || studentUserObj?.name || '').trim();
      if (rawName) {
          const directMap = parseStudentGenderToken(studentGenders?.[rawName]);
          if (directMap) return directMap;

          const norm = (s: any) => String(s || '').trim().toLowerCase();
          const targetNorm = norm(rawName);
          for (const [k, v] of Object.entries(studentGenders || {})) {
              if (norm(k) === targetNorm) {
                  const parsed = parseStudentGenderToken(v);
                  if (parsed) return parsed;
              }
          }

          const matchedUser = users.find((u: any) =>
              (u.role === 'student' || u.role === 'öğrenci') &&
              (
                  norm(u.name) === targetNorm ||
                  (studentUserObj?.id && u.id === studentUserObj.id) ||
                  (studentUserObj?.username && norm(u.username) === norm(studentUserObj.username))
              )
          );
          const explicitFromUser = parseStudentGenderToken(matchedUser?.gender);
          if (explicitFromUser) return explicitFromUser;
      }

      return inferStudentGender(rawName);
  };

  // Returns 'Devam Eden', 'Sürekli Devamsız', or 'Kayıt Dondurdu' for any student (defaults to 'Devam Eden')
  const getStudentAttendanceStatus = (studentName: string, studentUserObj?: any): 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu' => {
      if (
          studentUserObj?.attendanceStatus === 'Sürekli Devamsız' ||
          studentUserObj?.attendanceStatus === 'Kayıt Dondurdu' ||
          studentUserObj?.attendanceStatus === 'Devam Eden'
      ) {
          return studentUserObj.attendanceStatus;
      }

      const rawName = String(studentName || studentUserObj?.name || '').trim();
      if (rawName) {
          const directVal = studentAttendanceStatuses?.[rawName];
          if (directVal === 'Sürekli Devamsız' || directVal === 'Kayıt Dondurdu' || directVal === 'Devam Eden') {
              return directVal;
          }

          const norm = (s: any) => String(s || '')
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
              .trim();
          const stripNumberPrefix = (s: string) => {
              const m = s.match(/^(\d+)\s*[-–.]+\s*(.+)$/);
              return m ? m[2].trim() : s;
          };
          const targetNorm = norm(rawName);
          const targetPureNorm = norm(stripNumberPrefix(rawName));

          for (const [k, v] of Object.entries(studentAttendanceStatuses || {})) {
              const kNorm = norm(k);
              const kPureNorm = norm(stripNumberPrefix(k));
              if (kNorm === targetNorm || (targetPureNorm && kPureNorm === targetPureNorm)) {
                  if (v === 'Sürekli Devamsız' || v === 'Kayıt Dondurdu' || v === 'Devam Eden') {
                      return v;
                  }
              }
          }

          const matchedUser = users.find((u: any) =>
              (u.role === 'student' || u.role === 'öğrenci') &&
              (
                  norm(u.name) === targetNorm ||
                  (targetPureNorm && norm(stripNumberPrefix(String(u.name || ''))) === targetPureNorm) ||
                  (studentUserObj?.id && u.id === studentUserObj.id) ||
                  (studentUserObj?.username && norm(u.username) === norm(studentUserObj.username))
              )
          );
          if (
              matchedUser?.attendanceStatus === 'Sürekli Devamsız' ||
              matchedUser?.attendanceStatus === 'Kayıt Dondurdu' ||
              matchedUser?.attendanceStatus === 'Devam Eden'
          ) {
              return matchedUser.attendanceStatus;
          }
      }

      return 'Devam Eden';
  };

  // Returns 'K' if logged-in user is Kız Kur'an Kursu Öğreticisi / Yöneticisi (or female student), 'E' if Erkek Kur'an Kursu Öğreticisi / Yöneticisi (or male student), or null otherwise
  const getCurrentUserHafizlikGenderFilter = (userObj: any = currentUser): 'K' | 'E' | null => {
      if (!userObj) return null;
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const liveUser = users.find((u: any) =>
          (userObj.id && u.id === userObj.id) ||
          (userObj.username && norm(u.username) === norm(userObj.username))
      );
      const effectiveRole = String(liveUser?.role ?? userObj.role ?? '').trim().toLowerCase();
      if (effectiveRole === 'student' || effectiveRole === 'öğrenci') {
          return getStudentGender(liveUser?.name || userObj.name, liveUser || userObj);
      }

      const effectiveBranch = String(liveUser?.branch ?? userObj.branch ?? '').trim();
      const effectiveAdminSubRole = String(liveUser?.adminSubRole ?? userObj.adminSubRole ?? '').trim();
      const combined = `${effectiveBranch} ${effectiveAdminSubRole}`.toLocaleLowerCase('tr-TR');

      if (
          effectiveBranch === "Kız Kur'an Kursu Öğreticisi" ||
          effectiveAdminSubRole === "Kız Kur'an Kursu Yöneticisi" ||
          effectiveBranch === "Kız Kur'an Kursu Yöneticisi" ||
          combined.includes("kız kur'an kursu")
      ) {
          return 'K';
      }
      if (
          effectiveBranch === "Erkek Kur'an Kursu Öğreticisi" ||
          effectiveAdminSubRole === "Erkek Kur'an Kursu Yöneticisi" ||
          effectiveBranch === "Erkek Kur'an Kursu Yöneticisi" ||
          combined.includes("erkek kur'an kursu")
      ) {
          return 'E';
      }
      return null;
  };

  // Resolves the gender ('K' | 'E' | null) of a Rahle class from explicit metadata, class name, or assigned students
  const getRahleClassGender = (
      className: string,
      sourceRahleClasses: Record<string, string[]> = rahleClasses,
      sourceClassGenders: Record<string, 'K' | 'E'> = rahleClassGenders
  ): 'K' | 'E' | null => {
      if (!className || className === 'Hafızlık Havuzu') return null;

      const direct = parseStudentGenderToken(sourceClassGenders?.[className]);
      if (direct) return direct;

      const norm = (s: any) => String(s || '').trim().toLocaleLowerCase('tr-TR');
      const targetNorm = norm(className);
      for (const [k, v] of Object.entries(sourceClassGenders || {})) {
          if (norm(k) === targetNorm) {
              const parsed = parseStudentGenderToken(v);
              if (parsed) return parsed;
          }
      }

      if ((targetNorm.includes('kız') || targetNorm.includes('kiz')) && !targetNorm.includes('erkek')) {
          return 'K';
      }
      if (targetNorm.includes('erkek') && !targetNorm.includes('kız') && !targetNorm.includes('kiz')) {
          return 'E';
      }

      const stus = sourceRahleClasses?.[className];
      if (Array.isArray(stus) && stus.length > 0) {
          let kCount = 0;
          let eCount = 0;
          stus.forEach((stu) => {
              const g = getStudentGender(stu);
              if (g === 'K') kCount++;
              else if (g === 'E') eCount++;
          });
          if (kCount > eCount) return 'K';
          if (eCount > kCount) return 'E';
      }

      return null;
  };

  // Returns 'E' if logged-in user is Erkek Kur'an Kursu Yöneticisi, 'K' if Kız Kur'an Kursu Yöneticisi, or null otherwise
  const getKuranKursuAdminType = (userObj: any = currentUser): 'E' | 'K' | null => {
      if (!userObj) return null;
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const liveUser = users.find((u: any) =>
          (userObj.id && u.id === userObj.id) ||
          (userObj.username && norm(u.username) === norm(userObj.username))
      );
      const effectiveRole = String(liveUser?.role ?? userObj.role ?? '').trim().toLowerCase();
      const effectiveBranch = String(liveUser?.branch ?? userObj.branch ?? '').trim();
      const effectiveAdminSubRole = String(liveUser?.adminSubRole ?? userObj.adminSubRole ?? '').trim();
      const combined = `${effectiveBranch} ${effectiveAdminSubRole}`.toLocaleLowerCase('tr-TR');

      if (
          effectiveAdminSubRole === "Erkek Kur'an Kursu Yöneticisi" ||
          effectiveBranch === "Erkek Kur'an Kursu Yöneticisi" ||
          ((effectiveRole === 'admin' || effectiveRole === 'yönetici') && combined.includes("erkek kur'an kursu yöneticisi"))
      ) {
          return 'E';
      }
      if (
          effectiveAdminSubRole === "Kız Kur'an Kursu Yöneticisi" ||
          effectiveBranch === "Kız Kur'an Kursu Yöneticisi" ||
          ((effectiveRole === 'admin' || effectiveRole === 'yönetici') && combined.includes("kız kur'an kursu yöneticisi"))
      ) {
          return 'K';
      }
      return null;
  };

  // Returns the complete deduplicated pool of ALL Hafızlık students (filtered by gender if currentUser is a Kız/Erkek Kur'an Kursu Öğreticisi, Yöneticisi, or Student)
  const getAllHafizlikPoolStudents = (sourceSchoolClasses?: Record<string, string[]>): string[] => {
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const seen = new Set<string>();
      const pool: string[] = [];
      const genderFilter = getCurrentUserHafizlikGenderFilter();

      const addIfValid = (name: string) => {
          const trimmed = String(name || '').trim();
          if (!trimmed) return;
          const n = norm(trimmed);
          if (seen.has(n)) return;
          if (!isStudentHafizlik(trimmed)) return;
          if (genderFilter && getStudentGender(trimmed) !== genderFilter) return;
          seen.add(n);
          pool.push(trimmed);
      };

      // 1. From school classes (students marked as Hafızlık)
      Object.values(sourceSchoolClasses || classes || {}).forEach((stus: any) => {
          if (Array.isArray(stus)) {
              stus.forEach(s => addIfValid(s));
          }
      });

      // 2. From hafizlikStudents & rahleOnlyStudents arrays
      (hafizlikStudents || []).forEach(s => addIfValid(s));
      (rahleOnlyStudents || []).forEach(s => addIfValid(s));

      // 3. From rahleClasses
      Object.values(rahleClasses || {}).forEach((stus: any) => {
          if (Array.isArray(stus)) {
              stus.forEach(s => addIfValid(s));
          }
      });

      // 4. From users collection
      (users || []).forEach((u: any) => {
          if ((u.role === 'student' || u.role === 'öğrenci') && (u.isHafizlik || u.isRahleOnly) && u.name) {
              addIfValid(u.name);
          }
      });

      return pool;
  };

  // Returns Rahle-specific class structure: 'Hafızlık Havuzu' (all Hafızlık students) + Rahle-specific classes (filtered by gender)
  const getRahleFilteredClasses = (sourceClasses?: Record<string, string[]>) => {
      const pool = getAllHafizlikPoolStudents(sourceClasses);
      const norm = (s: any) => String(s || '').trim().toLowerCase();
      const poolSet = new Set(pool.map(s => norm(s)));
      const genderFilter = getCurrentUserHafizlikGenderFilter();

      const result: Record<string, string[]> = {
          'Hafızlık Havuzu': pool
      };

      Object.entries(rahleClasses || {}).forEach(([rCls, stus]) => {
          const clsGender = getRahleClassGender(rCls);
          if (genderFilter && clsGender && clsGender !== genderFilter) {
              return;
          }
          const targetGender = genderFilter || clsGender;
          const validList = (stus || []).filter((stuName: string) => {
              if (targetGender && getStudentGender(stuName) !== targetGender) return false;
              return poolSet.has(norm(stuName)) || isStudentHafizlik(stuName);
          });
          result[rCls] = validList;
      });

      return result;
  };

  (actions as any).isStudentHafizlik = isStudentHafizlik;
  (actions as any).isStudentRahleOnly = isStudentRahleOnly;
  (actions as any).getStudentSchoolClass = getStudentSchoolClass;
  (actions as any).getStudentRahleClass = getStudentRahleClass;
  (actions as any).getStudentGender = getStudentGender;
  (actions as any).getStudentAttendanceStatus = getStudentAttendanceStatus;
  (actions as any).getCurrentUserHafizlikGenderFilter = getCurrentUserHafizlikGenderFilter;
  (actions as any).getRahleClassGender = getRahleClassGender;
  (actions as any).getKuranKursuAdminType = getKuranKursuAdminType;
  (actions as any).getAllHafizlikPoolStudents = getAllHafizlikPoolStudents;
  (actions as any).getRahleFilteredClasses = getRahleFilteredClasses;

  useEffect(() => {
      if (!currentUser) return;
      const isStu = currentUser.role === 'student' || currentUser.role === 'öğrenci';
      if (isStu) {
          if (isStudentRahleOnly(currentUser.name, currentUser) && activeProject !== 'rahle') {
              setActiveProject('rahle');
              setActiveTab('dashboard');
          } else if (activeProject === 'rahle' && !isStudentHafizlik(currentUser.name, currentUser)) {
              setActiveProject('arif');
              setActiveTab('genelkultur');
          }
          return;
      }
      const kkAdmin = getKuranKursuAdminType(currentUser);
      if (kkAdmin) {
          if (activeProject === 'arif' || activeProject === 'alim') {
              setActiveProject('rahle');
              setActiveTab('dashboard');
          } else if (activeProject === 'pusula' && activeTab === 'admin') {
              setActiveTab('dashboard');
          }
      }
  }, [currentUser, users, hafizlikStudents, rahleOnlyStudents, activeProject, activeTab]);

  const kuranKursuAdminType = getKuranKursuAdminType();
  const isKuranKursuAdmin = Boolean(kuranKursuAdminType);

  const state = {
      loginSchoolId, loginCategory, schools, loginUsername, loginPassword, loginError, appTheme, themeColors, appToast,
      currentUser, schoolStats, superAdmins, superAdminTab, newSchoolName, newSa, saPasswordForm, tickets,
      activeSchoolId, supportView, selectedTicket, ticketForm, ticketReply,
      selectedStudent, selectedClass, categories, tasks, evaluations, successDescriptions, remedialTasks, remedialProblems, uncompletedReasons,
      devCardConfig, devCardData, newActivity, schoolPortfolios, classPerformances,
      users, selectedTeacherForPerf, newTeacherActivity, teacherPerfConfig, teacherPerfData,
      behaviorConfig, activeBehaviorCard, behaviorLog, getBehaviorScore,
      assignments, selectedReportAssignment, reportFilterClass, classes, classOrder, classAdvisors, hafizlikStudents, rahleClasses, rahleClassOrder, rahleClassGenders, rahleOnlyStudents, studentGenders, studentAttendanceStatuses, homeworkTab, assignmentType, adminHomeworkForm, editAssignmentData, hwProgress,
      gkAssignments, gkProgress, gkTab, selectedGkReportAssignment, gkFilterClass,
      guidanceForms, guidanceFilterForm, guidanceFilterClass, guidanceFilterStatus, guidanceSearchQuery, guidanceTab, guidanceAssignments, guidanceFormConfigs,
      socialClubs, ideas,
      studentGuidanceForm, studentGuidanceAnswers,
      studentHomework, homeworkAnswers,
      badges, userBadges,
      profileForm,
      adminTab, newUser, editUser, excelFile, excelPreview,
      activeAcademicYear, pastAcademicYears, viewingAcademicYear, academicArchives,
      activeProject,
      kuranKursuAdminType,
      isKuranKursuAdmin,
      currentSchool: schools.find((s: any) => s.id === activeSchoolId)
  };

  if (publicSurveySuffix) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        {publicSurveyLoading ? (
          <div className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-xl max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto animate-duration-500"></div>
            <h3 className="text-lg font-black text-gray-800">Anket Yükleniyor</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">MaarifMerkezi.Com - Maarif Asistanınız</p>
          </div>
        ) : publicSurveyError ? (
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">!</div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-gray-800 leading-tight">Anket Yüklenemedi</h3>
              <p className="text-xs font-semibold text-rose-600 bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 leading-relaxed">{publicSurveyError}</p>
            </div>
            <button 
              type="button" 
              onClick={() => { window.location.href = window.location.origin; }}
              className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        ) : publicSubmitted ? (
          <div className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-xl max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto text-3xl font-black">✓</div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-800 leading-tight">Teşekkür Ederiz!</h3>
              <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                Anket yanıtınız başarıyla kaydedilmiştir. Katılımınız ve değerli görüşleriniz bizim için çok kıymetlidir.
              </p>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">MaarifMerkezi.Com - Maarif Asistanınız</p>
            </div>
          </div>
        ) : publicSurveyData ? (
          <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-2xl max-w-3xl w-full space-y-8 my-8 relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Branding Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 gap-4">
              <div>
                <span className="bg-indigo-50 text-indigo-700 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block">KAMU BAĞLANTISI</span>
                <h1 className="text-xl font-black text-gray-900 mt-2.5 leading-tight">{publicSurveyData.schema.title}</h1>
                <p className="text-xs font-medium text-gray-400 leading-relaxed mt-2">{publicSurveyData.schema.desc}</p>
              </div>
              <div className="shrink-0 font-extrabold text-right hidden sm:block">
                <div className="text-slate-800 text-lg tracking-wider font-sans font-black">MAARİFMERKEZİ.COM</div>
                <div className="text-[9px] text-indigo-500 uppercase tracking-widest leading-none">Maarif Asistanı</div>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest border-l-4 border-indigo-600 pl-3">DEĞERLENDİRME DEĞERLERİ</h4>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {publicSurveyData.schema.questions.map((q: any, idx: number) => {
                  const key = `q_${idx}`;
                  const selectedVal = publicAnswers[key];
                  return (
                    <div key={idx} className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3.5 shadow-sm hover:border-slate-200 transition-all">
                      <div className="space-y-1">
                        <span className="text-[9px] font-extrabold bg-indigo-50 text-indigo-700 uppercase tracking-widest px-2 py-0.5 rounded-sm inline-block">{q.category}</span>
                        <p className="text-xs font-semibold text-slate-800 leading-relaxed pr-2">
                          <span className="text-indigo-600 font-extrabold mr-1">{idx + 1}.</span> {q.text}
                        </p>
                      </div>

                      {/* Columns Choices */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                        {publicSurveyData.schema.columns.map((col: string, colIdx: number) => {
                          const optionValue = col;
                          const isSelected = selectedVal === optionValue;
                          return (
                            <label 
                              key={colIdx}
                              className={`py-2 px-2.5 border rounded-xl text-[10px] font-bold text-center cursor-pointer transition-all select-none flex items-center justify-center min-h-[38px] leading-tight ${isSelected ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'border-gray-200/80 bg-white text-gray-600 hover:border-indigo-350'}`}
                            >
                              <input 
                                type="radio"
                                name={key}
                                checked={isSelected}
                                onChange={() => setPublicAnswers(prev => ({ ...prev, [key]: optionValue }))}
                                className="hidden"
                              />
                              {col}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Open questions if exist */}
                {publicSurveyData.schema.openQuestions?.map((oq: string, oqIdx: number) => {
                  const key = `open_${oqIdx}`;
                  return (
                    <div key={oqIdx} className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-2.5 shadow-sm hover:border-slate-200 transition-all">
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-wider block">Giriş / Açık Uçlu Görüş</span>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">{oq}</p>
                      <textarea
                        rows={3}
                        placeholder="Lütfen görüşlerinizi buraya yazınız..."
                        value={publicAnswers[key] || ''}
                        onChange={e => setPublicAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full bg-white border border-gray-200 py-3 px-4 rounded-xl text-xs font-semibold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submission Button */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="text-rose-500 font-extrabold mr-1">*</span> Tüm değerlendirmelerin girilmesi önem arz etmektedir.
              </span>
              <button 
                type="button"
                disabled={publicSubmitting}
                onClick={handlePublicSurveySubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all select-none cursor-pointer text-xs uppercase"
              >
                {publicSubmitting ? 'Kaydediliyor...' : 'Anketi Gönder'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-xl max-w-md w-full text-center space-y-4">
            <h3 className="text-lg font-black text-gray-800">Bağlantı Kuruluyor</h3>
          </div>
        )}
        {appToast.message && <Toast message={appToast.message} type={appToast.type} onClose={() => setAppToast({ message: null, type: 'info' })} />}
      </div>
    );
  }

  if (!currentUser) {
      return (
          <>
              <Login state={state} actions={actions} />
              {appToast.message && <Toast message={appToast.message} type={appToast.type} onClose={() => setAppToast({ message: null, type: 'info' })} />}
          </>
      );
  }

  if (currentUser.role === 'superadmin') {
      return (
          <>
              <SuperAdminPanel state={state} actions={actions} />
              {appToast.message && <Toast message={appToast.message} type={appToast.type} onClose={() => setAppToast({ message: null, type: 'info' })} />}
              <ConfirmModal isOpen={confirmModal.isOpen} message={confirmModal.message} onConfirm={() => { if(confirmModal.onConfirm) confirmModal.onConfirm(); setConfirmModal({ isOpen: false, message: '', onConfirm: null }); }} onCancel={() => setConfirmModal({ isOpen: false, message: '', onConfirm: null })} />
              <PromptModal isOpen={promptModal.isOpen} message={promptModal.message} defaultValue={promptModal.defaultValue} onConfirm={(val: string) => { if(promptModal.onConfirm) promptModal.onConfirm(val); setPromptModal({ isOpen: false, message: '', defaultValue: '', onConfirm: null }); }} onCancel={() => setPromptModal({ isOpen: false, message: '', defaultValue: '', onConfirm: null })} />
          </>
      );
  }

  if (currentUser.role === 'provincial_admin' || currentUser.role === 'district_admin') {
      return (
          <>
              <RegionalDashboard state={state} actions={actions} />
              {appToast.message && <Toast message={appToast.message} type={appToast.type} onClose={() => setAppToast({ message: null, type: 'info' })} />}
              <ConfirmModal isOpen={confirmModal.isOpen} message={confirmModal.message} onConfirm={() => { if(confirmModal.onConfirm) confirmModal.onConfirm(); setConfirmModal({ isOpen: false, message: '', onConfirm: null }); }} onCancel={() => setConfirmModal({ isOpen: false, message: '', onConfirm: null })} />
          </>
      );
  }

  const currentSchool = schools.find((s: any) => s.id === activeSchoolId);
  const isSpecialEducation = currentSchool?.isSpecialEducation || false;
  const isStudentUserGlobal = currentUser.role === 'student' || currentUser.role === 'öğrenci';
  const isCurrentStudentRahleOnly = isStudentUserGlobal && isStudentRahleOnly(currentUser.name, currentUser);
  const baseSchoolProjects: string[] = isCurrentStudentRahleOnly
      ? ['rahle']
      : (isSpecialEducation ? ['alim'] : (currentSchool?.activeProjects || ['arif', 'alim', 'pusula', 'rahle']));
  const schoolProjects = isKuranKursuAdmin
      ? ['pusula', 'rahle']
      : baseSchoolProjects;
  const canCurrentStudentSeeRahle = !isStudentUserGlobal || isStudentHafizlik(currentUser.name, currentUser);

  if (!activeProject && currentUser.role !== 'superadmin' && currentUser.role !== 'provincial_admin' && currentUser.role !== 'district_admin') {
      const isArifActive = schoolProjects.includes('arif') && !isKuranKursuAdmin;
      const isAlimActive = schoolProjects.includes('alim') && !isKuranKursuAdmin;
      const isPusulaActive = schoolProjects.includes('pusula');
      const isRahleActive = schoolProjects.includes('rahle') && canCurrentStudentSeeRahle;
      const isStudentUser = isStudentUserGlobal;

      return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
              <div className="max-w-6xl w-full space-y-12 animate-in fade-in zoom-in-95 duration-500">
                  <div className="text-center space-y-2">
                      <h1 className="text-3xl font-black text-gray-900">Proje Seçimi</h1>
                      <p className="text-gray-500 font-semibold">Lütfen işlem yapmak istediğiniz projeyi seçin.</p>
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${isKuranKursuAdmin ? 'lg:grid-cols-2 max-w-3xl mx-auto' : canCurrentStudentSeeRahle ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                      {/* Arif */}
                      {!isKuranKursuAdmin && (
                          <div
                              onClick={isArifActive ? () => { setActiveProject('arif'); setActiveTab(isStudentUser ? 'genelkultur' : 'eval'); } : undefined}
                              aria-disabled={!isArifActive}
                              className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center ${
                                  isArifActive
                                      ? 'hover:shadow-2xl hover:border-blue-500 cursor-pointer group'
                                      : 'opacity-35 cursor-not-allowed select-none'
                              }`}
                          >
                              <div className={`w-28 h-28 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-600/30 ${isArifActive ? 'group-hover:scale-110 group-hover:-translate-y-2' : ''}`}>
                                  <BookOpen size={48} />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-blue-900 mb-2">Arif</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                                  <div className="text-[11px] font-bold text-blue-600 mt-1">Değerler Eğitimi Sistemi</div>
                              </div>
                          </div>
                      )}

                      {/* Alim */}
                      {!isKuranKursuAdmin && (
                          <div
                              onClick={isAlimActive ? () => { setActiveProject('alim'); setActiveTab(!isStudentUser && isSpecialEducation ? 'bep' : 'kelimelik'); } : undefined}
                              aria-disabled={!isAlimActive}
                              className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-emerald-900/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center ${
                                  isAlimActive
                                      ? 'hover:shadow-2xl hover:border-emerald-500 cursor-pointer group'
                                      : 'opacity-35 cursor-not-allowed select-none'
                              }`}
                          >
                              <div className={`w-28 h-28 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center transition-all duration-300 shadow-lg shadow-emerald-600/30 ${isAlimActive ? 'group-hover:scale-110 group-hover:-translate-y-2' : ''}`}>
                                  <School size={48} />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-emerald-900 mb-2">Alim</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                                  <div className="text-[11px] font-bold text-emerald-600 mt-1">Eğitim &amp; Gelişim Sistemi</div>
                              </div>
                          </div>
                      )}

                      {/* Pusula */}
                      <div
                          onClick={isPusulaActive ? () => { setActiveProject('pusula'); setActiveTab('dashboard'); } : undefined}
                          aria-disabled={!isPusulaActive}
                          className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-purple-900/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center ${
                              isPusulaActive
                                  ? 'hover:shadow-2xl hover:border-purple-500 cursor-pointer group'
                                  : 'opacity-35 cursor-not-allowed select-none'
                          }`}
                      >
                          <div className={`w-28 h-28 bg-purple-600 text-white rounded-[2rem] flex items-center justify-center transition-all duration-300 shadow-lg shadow-purple-600/30 ${isPusulaActive ? 'group-hover:scale-110 group-hover:-translate-y-2' : ''}`}>
                              <Compass size={48} />
                          </div>
                          <div>
                              <div className="text-4xl font-black text-purple-900 mb-2">Pusula</div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                              <div className="text-[11px] font-bold text-purple-600 mt-1">Öğrenci Koçluk Sistemi</div>
                          </div>
                      </div>

                      {/* Rahle - Only shown to Hafızlık students (and teachers/admins) */}
                      {canCurrentStudentSeeRahle && (
                          <div
                              onClick={isRahleActive ? () => { setActiveProject('rahle'); setActiveTab('dashboard'); } : undefined}
                              aria-disabled={!isRahleActive}
                              className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-amber-900/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center ${
                                  isRahleActive
                                      ? 'hover:shadow-2xl hover:border-amber-500 cursor-pointer group'
                                      : 'opacity-35 cursor-not-allowed select-none'
                              }`}
                          >
                              <div className={`w-28 h-28 bg-amber-600 text-white rounded-[2rem] flex items-center justify-center transition-all duration-300 shadow-lg shadow-amber-600/30 ${isRahleActive ? 'group-hover:scale-110 group-hover:-translate-y-2' : ''}`}>
                                  <RahleIcon size={48} className="text-white" />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-amber-900 mb-2">Rahle</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                                  <div className="text-[11px] font-bold text-amber-600 mt-1">Hafızlık Takip Sistemi</div>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      );
  }

  const renderContent = () => {
      if (activeProject === 'rahle') {
          const isStudentRole = currentUser.role === 'student' || currentUser.role === 'öğrenci';
          if (isStudentRole && !canCurrentStudentSeeRahle) {
              return <StudentHomePanel state={state} actions={actions} section="homework" />;
          }
          if (activeTab === 'admin' && !isStudentRole) return <AdminPanel state={state} actions={{ ...actions, setActiveTab }} />;
          if (activeTab === 'profile') return <ProfilePanel state={state} actions={actions} />;
          if (activeTab === 'support') return <SupportTickets state={state} actions={actions} isSuperAdmin={false} />;

          const rawDisplayClasses = viewingAcademicYear && viewingAcademicYear !== activeAcademicYear && academicArchives[viewingAcademicYear]?.classes
              ? academicArchives[viewingAcademicYear].classes
              : classes;
          const rahleDisplayClasses = getRahleFilteredClasses(rawDisplayClasses);

          const activeGenderFilter = getCurrentUserHafizlikGenderFilter();
          const validSelectedStudent = !isStudentRole && selectedStudent && isStudentHafizlik(selectedStudent) && (!activeGenderFilter || getStudentGender(selectedStudent) === activeGenderFilter)
              ? selectedStudent
              : null;
          const activeStudentName = isStudentRole 
              ? (currentUser.name || currentUser.username) 
              : validSelectedStudent;
          const matchedClassKey = isStudentRole
              ? (Object.keys(rahleDisplayClasses).find(cls =>
                  (rahleDisplayClasses[cls] || []).includes(activeStudentName) ||
                  cls === currentUser.classLevel ||
                  cls.replace('_', '') === String(currentUser.classLevel || '').replace('_', '')
                ) || currentUser.classLevel || Object.keys(rahleDisplayClasses)[0] || 'Genel')
              : (selectedClass && rahleDisplayClasses[selectedClass] ? selectedClass : null);

          return (
              <RahlePanel
                  state={state}
                  actions={actions}
                  isStudent={isStudentRole}
                  selectedClass={matchedClassKey}
                  selectedStudent={activeStudentName}
                  onSelectClass={(cls) => { if (!isStudentRole) { setSelectedClass(cls); setSelectedStudent(null); } }}
                  onSelectStudent={(stu) => { if (!isStudentRole) setSelectedStudent(stu); }}
                  classes={rahleDisplayClasses}
                  activeSchoolId={activeSchoolId}
                  activeTab={activeTab}
                  onSelectTab={(tab) => setActiveTab(tab)}
              />
          );
      }

      if (activeProject === 'pusula') {
          if (activeTab === 'admin' && !isKuranKursuAdmin) return <AdminPanel state={state} actions={{ ...actions, setActiveTab }} />;
          if (activeTab === 'profile') return <ProfilePanel state={state} actions={actions} />;
          if (activeTab === 'support') return <SupportTickets state={state} actions={actions} isSuperAdmin={false} />;

          const rawDisplayClasses = viewingAcademicYear && viewingAcademicYear !== activeAcademicYear && academicArchives[viewingAcademicYear]?.classes
              ? academicArchives[viewingAcademicYear].classes
              : classes;
          const activeGenderFilter = getCurrentUserHafizlikGenderFilter();
          const shouldFilterToRahleStudents = Boolean(isKuranKursuAdmin || activeGenderFilter);
          const displayClasses = shouldFilterToRahleStudents
              ? getRahleFilteredClasses(rawDisplayClasses)
              : rawDisplayClasses;
          const isStudentRole = currentUser.role === 'student' || currentUser.role === 'öğrenci';
          const validSelectedStudent = !isStudentRole && selectedStudent && (
              !shouldFilterToRahleStudents ||
              (isStudentHafizlik(selectedStudent) && (!activeGenderFilter || getStudentGender(selectedStudent) === activeGenderFilter))
          )
              ? selectedStudent
              : null;
          const activeStudentName = isStudentRole 
              ? (currentUser.name || currentUser.username) 
              : validSelectedStudent;
          const activeClassName = isStudentRole 
              ? (currentUser.classLevel || Object.keys(displayClasses)[0] || 'Genel') 
              : (selectedClass && displayClasses[selectedClass] ? selectedClass : null);

          return (
              <PusulaPanel
                  state={state}
                  actions={actions}
                  isStudent={isStudentRole}
                  readOnly={isKuranKursuAdmin}
                  strictClassesOnly={shouldFilterToRahleStudents}
                  selectedClass={activeClassName}
                  selectedStudent={activeStudentName}
                  onSelectClass={(cls) => setSelectedClass(cls)}
                  onSelectStudent={(stu) => setSelectedStudent(stu)}
                  classes={displayClasses}
                  activeSchoolId={activeSchoolId}
                  activeTab={activeTab}
                  onSelectTab={(tab) => setActiveTab(tab)}
              />
          );
      }

      const isStudent = currentUser.role === 'student' || currentUser.role === 'öğrenci';

      if (isStudent) {
          if (activeProject === 'alim') {
              switch (activeTab) {
                  case 'kelimelik': return <StudentHomePanel state={state} actions={actions} section="kelimelik" />;
                  case 'mit': return <StudentMitPanel state={state} actions={actions} />;
                  case 'homework': return <StudentHomePanel state={state} actions={actions} section="homework" />;
                  case 'makale': return <StudentMakalePanel state={state} actions={actions} />;
                  case 'hizliokuma': return <StudentHizliOkumaPanel state={state} actions={actions} />;
                  case 'profile': return <ProfilePanel state={state} actions={actions} />;
                  default: return <StudentHomePanel state={state} actions={actions} section="kelimelik" />;
              }
          }

          switch (activeTab) {
              case 'genelkultur': return <StudentGenelKulturPanel state={state} actions={actions} />;
              case 'guidance': return <StudentHomePanel state={state} actions={actions} section="guidance" />;
              case 'socialclubs': return <SocialClubsPanel state={state} actions={actions} />;
              case 'idea': return <StudentIdeaPanel state={state} actions={actions} />;
              case 'dijitaldefter': return <StudentDigitalNotebook state={state} actions={actions} />;
              case 'profile': return <ProfilePanel state={state} actions={actions} />;
              default: return <StudentGenelKulturPanel state={state} actions={actions} />;
          }
      }

      if (activeProject === 'alim') {
          switch (activeTab) {
              case 'kelimelik': return <AdminKelimelikPanel state={state} actions={actions} />;
              case 'mit': return <AdminMitPanel state={state} actions={actions} />;
              case 'genelkultur': return <AdminGenelKulturPanel state={state} actions={actions} />;
              case 'homework': return <AdminHomeworkPanel state={state} actions={actions} />;
              case 'makale': return <AdminMakalePanel state={state} actions={actions} />;
              case 'hizliokuma': return <AdminHizliOkumaPanel state={state} actions={actions} />;
              case 'bep': return <BepPanel state={state} actions={actions} />;
              case 'teacherperf': return <TeacherPerfPanel state={state} actions={actions} />;
              case 'profile': return <ProfilePanel state={state} actions={actions} />;
              case 'admin': return <AdminPanel state={state} actions={{ ...actions, setActiveTab }} />;
              case 'dijitaldefter': return <StudentDigitalNotebook state={state} actions={actions} />;
              default: return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-800">Seçim Yapın</h2></div>;
          }
      }

      switch (activeTab) {
          case 'home': return <div className="p-8">Hoş Geldiniz</div>;
          case 'portfolio': return <PortfolioPanel state={state} actions={actions} />;
          case 'eval': return <EvaluationPanel state={state} actions={actions} />;
          case 'devcard': return <DevCardPanel state={state} actions={actions} />;
          case 'behavior': return <BehaviorEvalPanel state={state} actions={actions} />;
          case 'guidance': return <AdminGuidancePanel state={state} actions={actions} />;
          case 'socialclubs': return <SocialClubsPanel state={state} actions={actions} />;
          case 'admin': return <AdminPanel state={state} actions={{ ...actions, setActiveTab }} />;
          case 'profile': return <ProfilePanel state={state} actions={actions} />;
          case 'support': return <SupportTickets state={state} actions={actions} isSuperAdmin={false} />;
          case 'dijitaldefter': return <StudentDigitalNotebook state={state} actions={actions} />;
          default: return <div>Not Found</div>;
      }
  };

  return (
      <div className={`min-h-screen bg-[#F8FAFC] font-inter text-gray-800 flex flex-col selection:bg-${activeProject === 'alim' ? 'emerald' : activeProject === 'pusula' ? 'purple' : activeProject === 'rahle' ? 'amber' : 'blue'}-100 selection:text-${activeProject === 'alim' ? 'emerald' : activeProject === 'pusula' ? 'purple' : activeProject === 'rahle' ? 'amber' : 'blue'}-900`} style={{ '--theme-color': activeProject === 'pusula' ? '#9333ea' : activeProject === 'rahle' ? '#d97706' : activeProject === 'alim' ? '#059669' : themeColors[appTheme]?.[600] || '#2563eb', '--theme-bg': activeProject === 'pusula' ? '#faf5ff' : activeProject === 'rahle' ? '#fffbeb' : activeProject === 'alim' ? '#ecfdf5' : themeColors[appTheme]?.[50] || '#eff6ff' } as React.CSSProperties}>
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm print:hidden">
              <DBPatches activeSchoolId={activeSchoolId} />
              <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
                  {/* Left: School Info */}
                  <div className="flex items-center gap-4">
                      {(() => {
                          const currentLogo = platformLogo || localStorage.getItem('maarif_platform_logo') || schools.find(s => s.id === activeSchoolId)?.logoUrl || '/logo.png';
                          return (
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden ${activeProject === 'alim' ? 'shadow-emerald-100' : activeProject === 'pusula' ? 'shadow-purple-100' : activeProject === 'rahle' ? 'shadow-amber-100' : 'shadow-blue-100'} ${currentLogo ? 'bg-white p-1.5 border border-gray-100' : ''}`} style={!currentLogo ? { backgroundColor: 'var(--theme-color)' } : {}}>
                                  {currentLogo ? (
                                      <img src={currentLogo} alt="Logo" className="w-full h-full object-contain" />
                                  ) : (
                                      <School className="text-white" size={24} />
                                  )}
                              </div>
                          );
                      })()}
                      <div className="flex flex-col">
                          <h1 className={`font-black text-xl leading-none tracking-tight ${activeProject === 'alim' ? 'text-emerald-900' : activeProject === 'pusula' ? 'text-purple-900' : activeProject === 'rahle' ? 'text-amber-900' : 'text-blue-900'}`}>
                              {schools.find(s => s.id === activeSchoolId)?.name || 'Kurum Adı'}
                          </h1>
                          {currentUser.role !== 'student' && (
                            <>
                              <div className="flex items-center gap-2 mt-1">
                                  <span 
                                      onClick={() => actions.handleSloganChange()}
                                      className="text-[13px] font-bold text-orange-600 cursor-pointer hover:underline"
                                  >
                                      {schools.find(s => s.id === activeSchoolId)?.slogan || (activeProject === 'alim' ? 'Gönül İlim Hikmet Ocağı' : activeProject === 'pusula' ? 'Öğrenci Koçluk ve Takip Sistemi' : activeProject === 'rahle' ? 'Hafızlık Takip ve Ezber Yönetim Sistemi' : 'Değerler Eğitimi Sistemi')}
                                  </span>
                              </div>
                              <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${activeProject === 'alim' ? 'text-emerald-600' : activeProject === 'pusula' ? 'text-purple-600' : activeProject === 'rahle' ? 'text-amber-700' : 'text-gray-400'}`}>
                                  {activeProject === 'alim' ? 'ALİM - MAARİFMERKEZİ.COM' : activeProject === 'pusula' ? 'PUSULA - MAARİFMERKEZİ.COM' : activeProject === 'rahle' ? 'RAHLE - MAARİFMERKEZİ.COM' : 'ARİF - MAARİFMERKEZİ.COM'}
                              </p>
                            </>
                          )}
                      </div>
                  </div>

                  {/* Middle: Selectors */}
                  {currentUser.role !== 'student' && (() => {
                      const rawDisplayClasses = viewingAcademicYear && viewingAcademicYear !== activeAcademicYear && academicArchives[viewingAcademicYear]?.classes
                          ? academicArchives[viewingAcademicYear].classes
                          : classes;
                      const displayClasses = (activeProject === 'rahle' || (activeProject === 'pusula' && (isKuranKursuAdmin || getCurrentUserHafizlikGenderFilter())))
                          ? getRahleFilteredClasses(rawDisplayClasses)
                          : rawDisplayClasses;
                      const effectiveSelectedClass = selectedClass && displayClasses[selectedClass] ? selectedClass : '';
                      const effectiveSelectedStudent = selectedStudent && effectiveSelectedClass && (displayClasses[effectiveSelectedClass] || []).includes(selectedStudent)
                          ? selectedStudent
                          : '';

                      const normalizeSearchStr = (s: string) =>
                          (s || '')
                              .toLocaleLowerCase('tr-TR')
                              .replace(/ğ/g, 'g')
                              .replace(/ü/g, 'u')
                              .replace(/ş/g, 's')
                              .replace(/ı/g, 'i')
                              .replace(/i̇/g, 'i')
                              .replace(/ö/g, 'o')
                              .replace(/ç/g, 'c')
                              .trim();

                      const allDisplayStudents: Array<{ student: string; className: string }> = [];
                      Object.entries(displayClasses || {}).forEach(([clsKey, studentArr]: [string, any]) => {
                          if (Array.isArray(studentArr)) {
                              studentArr.forEach((stu: string) => {
                                  allDisplayStudents.push({ student: stu, className: clsKey });
                              });
                          }
                      });

                      const searchQ = headerStudentSearch.trim();
                      const normQ = normalizeSearchStr(searchQ);
                      const lowerQ = searchQ.toLocaleLowerCase('tr-TR');
                      const headerSearchResults = searchQ
                          ? allDisplayStudents.filter((item) => {
                                const matchName =
                                    item.student.toLocaleLowerCase('tr-TR').includes(lowerQ) ||
                                    normalizeSearchStr(item.student).includes(normQ);
                                const cleanCls = item.className.replace('_', '');
                                const matchCls =
                                    cleanCls.toLocaleLowerCase('tr-TR').includes(lowerQ) ||
                                    normalizeSearchStr(cleanCls).includes(normQ);
                                return matchName || matchCls;
                            })
                          : [];

                      const accentIconColor =
                          activeProject === 'alim'
                              ? 'text-emerald-500'
                              : activeProject === 'pusula'
                              ? 'text-purple-500'
                              : activeProject === 'rahle'
                              ? 'text-amber-500'
                              : 'text-blue-500';

                      const accentFocusBorder =
                          activeProject === 'alim'
                              ? 'focus:border-emerald-400 focus:ring-emerald-500/10'
                              : activeProject === 'pusula'
                              ? 'focus:border-purple-400 focus:ring-purple-500/10'
                              : activeProject === 'rahle'
                              ? 'focus:border-amber-400 focus:ring-amber-500/10'
                              : 'focus:border-blue-400 focus:ring-blue-500/10';

                      const accentBadgeClass =
                          activeProject === 'alim'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : activeProject === 'pusula'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : activeProject === 'rahle'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200';

                      return (
                      <div className="flex items-start gap-3 flex-wrap">
                          {/* Academic Year Selector */}
                          <div className="relative">
                              <select 
                                  value={viewingAcademicYear || activeAcademicYear} 
                                  onChange={(e) => actions.handleSetViewingAcademicYear(e.target.value)} 
                                  className={`appearance-none py-2.5 pl-3.5 pr-8 rounded-xl text-xs font-black outline-none transition-all shadow-sm cursor-pointer ${
                                      viewingAcademicYear !== activeAcademicYear 
                                          ? 'bg-amber-500 text-white border-transparent' 
                                          : 'bg-blue-50/80 border border-blue-200/80 text-blue-900 focus:bg-white focus:border-blue-500'
                                  }`}
                                  title="Eğitim-Öğretim Yılı / Arşiv Seçici"
                              >
                                  <option value={activeAcademicYear}>🎓 {activeAcademicYear} (Aktif)</option>
                                  {pastAcademicYears.map(yr => (
                                      <option key={yr} value={yr}>📁 {yr} (Arşiv)</option>
                                  ))}
                              </select>
                              <ChevronRight className={`absolute right-2.5 top-3 pointer-events-none rotate-90 ${viewingAcademicYear !== activeAcademicYear ? 'text-white' : 'text-blue-500'}`} size={14}/>
                          </div>

                          <div className="relative">
                              <select 
                                  value={effectiveSelectedClass} 
                                  onChange={(e) => {
                                      const newCls = e.target.value;
                                      setSelectedClass(newCls || null);
                                      if (newCls && displayClasses[newCls]?.length > 0) {
                                          setSelectedStudent(displayClasses[newCls][0]);
                                      } else {
                                          setSelectedStudent(null);
                                      }
                                  }}
                                  className="appearance-none bg-gray-50 border border-gray-200 py-2.5 pl-4 pr-10 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 cursor-pointer transition-all shadow-sm min-w-[120px]"
                              >
                                  <option value="">Sınıf Seç</option>
                                  {Object.keys(displayClasses).map(k => (
                                      <option key={k} value={k}>{k.replace('_', '')}</option>
                                  ))}
                              </select>
                              <ChevronRight className="absolute right-3 top-3 text-gray-400 pointer-events-none rotate-90" size={16}/>
                          </div>

                          {/* Student Selector + Student Search Input Underneath */}
                          <div className="flex flex-col gap-2 min-w-[250px] sm:min-w-[280px]">
                              <div className="relative w-full">
                                  <select 
                                      value={effectiveSelectedStudent} 
                                      onChange={(e) => setSelectedStudent(e.target.value || null)} 
                                      disabled={!effectiveSelectedClass}
                                      className="w-full appearance-none bg-gray-50 border border-gray-200 py-2.5 pl-4 pr-10 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 cursor-pointer transition-all shadow-sm disabled:opacity-50"
                                  >
                                      <option value="">Öğrenci Seç</option>
                                      {effectiveSelectedClass && displayClasses[effectiveSelectedClass]?.map((student: string) => (
                                          <option key={student} value={student}>{student}</option>
                                      ))}
                                  </select>
                                  <ChevronRight className="absolute right-3 top-3 text-gray-400 pointer-events-none rotate-90" size={16}/>
                              </div>

                              {/* Hızlı Öğrenci Arama Kutusu */}
                              <div className="relative w-full">
                                  <Search size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${accentIconColor}`} />
                                  <input
                                      type="text"
                                      value={headerStudentSearch}
                                      onFocus={() => setIsHeaderStudentSearchOpen(true)}
                                      onBlur={() => setTimeout(() => setIsHeaderStudentSearchOpen(false), 180)}
                                      onChange={(e) => {
                                          setHeaderStudentSearch(e.target.value);
                                          setIsHeaderStudentSearchOpen(true);
                                      }}
                                      onKeyDown={(e) => {
                                          if (e.key === 'Enter' && headerSearchResults.length > 0) {
                                              const topMatch = headerSearchResults[0];
                                              setSelectedClass(topMatch.className);
                                              setSelectedStudent(topMatch.student);
                                              setHeaderStudentSearch('');
                                              setIsHeaderStudentSearchOpen(false);
                                          }
                                      }}
                                      placeholder="Öğrenci adı veya numarası ara..."
                                      className={`w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 py-2.5 pl-10 pr-9 rounded-xl text-sm font-bold text-gray-700 placeholder:text-gray-400 placeholder:font-semibold outline-none focus:ring-4 transition-all shadow-sm ${accentFocusBorder}`}
                                  />
                                  {headerStudentSearch && (
                                      <button
                                          type="button"
                                          onClick={() => {
                                              setHeaderStudentSearch('');
                                              setIsHeaderStudentSearchOpen(false);
                                          }}
                                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-black cursor-pointer"
                                      >
                                          ✕
                                      </button>
                                  )}

                                  {isHeaderStudentSearchOpen && searchQ.length > 0 && (
                                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto divide-y divide-gray-50">
                                          {headerSearchResults.length === 0 ? (
                                              <div className="p-3 text-center text-xs font-semibold text-gray-400">
                                                  "{headerStudentSearch}" ile eşleşen öğrenci bulunamadı.
                                              </div>
                                          ) : (
                                              headerSearchResults.slice(0, 20).map((item) => {
                                                  const isCurrent =
                                                      item.student === effectiveSelectedStudent &&
                                                      item.className === effectiveSelectedClass;
                                                  return (
                                                      <button
                                                          key={`${item.className}_${item.student}`}
                                                          type="button"
                                                          onMouseDown={(e) => {
                                                              e.preventDefault();
                                                              setSelectedClass(item.className);
                                                              setSelectedStudent(item.student);
                                                              setHeaderStudentSearch('');
                                                              setIsHeaderStudentSearchOpen(false);
                                                          }}
                                                          className={`w-full text-left px-3.5 py-2 flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                                                              isCurrent ? 'bg-gray-50 font-black text-gray-900' : 'text-gray-700 font-bold'
                                                          }`}
                                                      >
                                                          <span className="truncate text-xs">{item.student}</span>
                                                          <span className={`shrink-0 text-[10px] font-black px-2 py-0.5 rounded-md border ${accentBadgeClass}`}>
                                                              {item.className.replace('_', '')}
                                                          </span>
                                                      </button>
                                                  );
                                              })
                                          )}
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                      );
                  })()}

                  {/* Right: User Info */}
                  <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                      <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl">
                          {!isKuranKursuAdmin && (
                              <>
                                  <button
                                      type="button"
                                      disabled={!schoolProjects.includes('arif')}
                                      onClick={schoolProjects.includes('arif') ? () => {
                                          setActiveProject('arif');
                                          setActiveTab(currentUser.role === 'student' || currentUser.role === 'öğrenci' ? 'genelkultur' : 'eval');
                                      } : undefined}
                                      className={`px-3 py-1.5 rounded-lg font-black text-xs transition-all ${
                                          !schoolProjects.includes('arif')
                                              ? 'opacity-35 cursor-not-allowed text-gray-400 select-none'
                                              : activeProject === 'arif'
                                                  ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                                                  : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                                      }`}
                                  >
                                      ARİF
                                  </button>
                                  <button
                                      type="button"
                                      disabled={!schoolProjects.includes('alim')}
                                      onClick={schoolProjects.includes('alim') ? () => {
                                          setActiveProject('alim');
                                          setActiveTab(currentUser.role !== 'student' && currentUser.role !== 'öğrenci' && isSpecialEducation ? 'bep' : 'kelimelik');
                                      } : undefined}
                                      className={`px-3 py-1.5 rounded-lg font-black text-xs transition-all ${
                                          !schoolProjects.includes('alim')
                                              ? 'opacity-35 cursor-not-allowed text-gray-400 select-none'
                                              : activeProject === 'alim'
                                                  ? 'bg-emerald-600 text-white shadow-xs cursor-pointer'
                                                  : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                                      }`}
                                  >
                                      ALİM
                                  </button>
                              </>
                          )}
                          <button
                              type="button"
                              disabled={!schoolProjects.includes('pusula')}
                              onClick={schoolProjects.includes('pusula') ? () => {
                                  setActiveProject('pusula');
                                  setActiveTab('dashboard');
                              } : undefined}
                              className={`px-3 py-1.5 rounded-lg font-black text-xs transition-all ${
                                  !schoolProjects.includes('pusula')
                                      ? 'opacity-35 cursor-not-allowed text-gray-400 select-none'
                                      : activeProject === 'pusula'
                                          ? 'bg-purple-600 text-white shadow-xs cursor-pointer'
                                          : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                              }`}
                          >
                              PUSULA
                          </button>
                          {canCurrentStudentSeeRahle && (
                              <button
                                  type="button"
                                  disabled={!schoolProjects.includes('rahle')}
                                  onClick={schoolProjects.includes('rahle') ? () => {
                                      setActiveProject('rahle');
                                      setActiveTab('dashboard');
                                      if (!isStudentUserGlobal && selectedStudent && !isStudentHafizlik(selectedStudent)) {
                                          setSelectedStudent(null);
                                      }
                                  } : undefined}
                                  className={`px-3 py-1.5 rounded-lg font-black text-xs transition-all ${
                                      !schoolProjects.includes('rahle')
                                          ? 'opacity-35 cursor-not-allowed text-gray-400 select-none'
                                          : activeProject === 'rahle'
                                              ? 'bg-amber-600 text-white shadow-xs cursor-pointer'
                                              : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                                  }`}
                              >
                                  RAHLE
                              </button>
                          )}
                      </div>
                      {currentUser.originalRole && (
                          <button onClick={() => {
                              setCurrentUser({...currentUser, role: currentUser.originalRole, originalRole: undefined});
                              setActiveSchoolId(null);
                              setActiveProject(null);
                          }} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-bold text-xs hover:bg-purple-200 transition-colors">
                              {currentUser.originalRole === 'superadmin' ? 'Süper Yöneticiye Dön' : 'Rapor Paneline Dön'}
                          </button>
                      )}
                      <div className="text-right hidden sm:block">
                          <div className="font-black text-sm text-gray-900 leading-tight">{currentUser.name || currentUser.username}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{currentUser.role === 'admin' ? 'YÖNETİCİ' : currentUser.role === 'teacher' ? 'ÖĞRETMEN' : 'ÖĞRENCİ'}</div>
                      </div>
                      <button onClick={actions.logout} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition-all" title="Çıkış Yap">
                          <LogOut size={18} />
                      </button>
                  </div>
              </div>
          </header>

          {/* Archive Mode Warning Banner */}
          {viewingAcademicYear && viewingAcademicYear !== activeAcademicYear && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 flex items-center justify-between text-xs font-bold shadow-md print:hidden animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2.5">
                      <Archive size={16} className="shrink-0" />
                      <span>
                          <strong>ARŞİV GÖRÜNTÜLEME MODU (SALT OKUNUR):</strong> {viewingAcademicYear} eğitim-öğretim yılı arşiv kayıtları incelenmektedir.
                      </span>
                  </div>
                  <button 
                      type="button" 
                      onClick={() => actions.handleSetViewingAcademicYear(activeAcademicYear)}
                      className="bg-white text-amber-900 px-3.5 py-1.5 rounded-xl text-xs font-black hover:bg-amber-50 transition-all cursor-pointer shadow-sm shrink-0"
                  >
                      Güncel Döneme Dön ({activeAcademicYear})
                  </button>
              </div>
          )}

          {/* Navigation Tabs */}
          <nav className="bg-white border-b border-gray-200 px-6 overflow-x-auto scrollbar-hide shrink-0 print:hidden">
              <div className={`max-w-[1600px] mx-auto flex items-center gap-8 w-full ${currentUser.role === 'student' ? 'justify-center' : ''}`}>
                  {currentUser.role !== 'student' ? (
                    <>
                      {activeProject === 'rahle' ? (
                          <div className="flex items-center justify-between w-full gap-8">
                              <div className="flex items-center gap-8">
                                  <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'dashboard' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-amber-600' : 'text-gray-400'}/> Genel Durum &amp; Karne
                                  </button>
                                  <button onClick={() => setActiveTab('monthly')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${(activeTab === 'monthly' || activeTab === 'daily' || activeTab === 'matrix') ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <CalendarDays size={18} className={(activeTab === 'monthly' || activeTab === 'daily' || activeTab === 'matrix') ? 'text-amber-600' : 'text-gray-400'}/> Aylık Ders Takip Görünümü
                                  </button>
                                  <button onClick={() => setActiveTab('prep')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'prep' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Timer size={18} className={activeTab === 'prep' ? 'text-amber-600' : 'text-gray-400'}/> Yüzünden Okuma &amp; Hazırlık
                                  </button>
                                  <button onClick={() => setActiveTab('deneme')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'deneme' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Sparkles size={18} className={activeTab === 'deneme' ? 'text-amber-600' : 'text-gray-400'}/> Deneme Cüzü &amp; Potansiyel
                                  </button>
                                  <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'history' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Award size={18} className={activeTab === 'history' ? 'text-amber-600' : 'text-gray-400'}/> Dönüş &amp; Hatim Geçmişi
                                  </button>
                                  <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'profile' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <User size={18} className={activeTab === 'profile' ? 'text-amber-600' : 'text-gray-400'}/> Profilim
                                  </button>
                              </div>
                              {(currentUser.role === 'admin' || currentUser.role === 'teacher' || currentUser.role === 'öğretmen') && (
                                  <button
                                      onClick={() => setActiveTab('admin')}
                                      className={`ml-auto flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 border-red-500 cursor-pointer shrink-0 ${
                                          activeTab === 'admin'
                                              ? 'text-red-600'
                                              : 'text-gray-400 hover:text-gray-800'
                                      }`}
                                  >
                                      <Settings size={18} className={activeTab === 'admin' ? 'text-red-600' : 'text-gray-400'} /> Yönetim Paneli
                                  </button>
                              )}
                          </div>
                      ) : activeProject === 'pusula' ? (
                          <div className="flex items-center justify-between w-full gap-8">
                              <div className="flex items-center gap-8">
                                  <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'dashboard' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400'}/> Genel Durum &amp; Özet
                                  </button>
                                  <button onClick={() => setActiveTab('resources')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'resources' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <BookOpen size={18} className={activeTab === 'resources' ? 'text-purple-600' : 'text-gray-400'}/> Konu &amp; Kaynak Takibi
                                  </button>
                                  <button onClick={() => setActiveTab('exams')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'exams' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Award size={18} className={activeTab === 'exams' ? 'text-purple-600' : 'text-gray-400'}/> Deneme Analizi &amp; Netler
                                  </button>
                                  <button onClick={() => setActiveTab('sinav_analizi')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'sinav_analizi' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <FileSpreadsheet size={18} className={activeTab === 'sinav_analizi' ? 'text-purple-600' : 'text-gray-400'}/> Sınav Analizi
                                  </button>
                                  <button onClick={() => setActiveTab('plan')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'plan' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Calendar size={18} className={activeTab === 'plan' ? 'text-purple-600' : 'text-gray-400'}/> Haftalık Çalışma Planı
                                  </button>
                                  <button onClick={() => setActiveTab('notes')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'notes' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <FileText size={18} className={activeTab === 'notes' ? 'text-purple-600' : 'text-gray-400'}/> Koçluk Seansları &amp; Notlar
                                  </button>
                              </div>
                              {(currentUser.role === 'admin' || currentUser.role === 'teacher' || currentUser.role === 'öğretmen') && !isKuranKursuAdmin && (
                                  <button
                                      onClick={() => setActiveTab('admin')}
                                      className={`ml-auto flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 border-red-500 cursor-pointer shrink-0 ${
                                          activeTab === 'admin'
                                              ? 'text-red-600'
                                              : 'text-gray-400 hover:text-gray-800'
                                      }`}
                                  >
                                      <Settings size={18} className={activeTab === 'admin' ? 'text-red-600' : 'text-gray-400'} /> Yönetim Paneli
                                  </button>
                              )}
                          </div>
                      ) : activeProject === 'alim' ? (
                          isSpecialEducation ? (
                              <div className="flex items-center justify-between w-full gap-8">
                                  <div className="flex items-center gap-8">
                                      <button onClick={() => setActiveTab('bep')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'bep' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                          <Activity size={18} className={activeTab === 'bep' ? 'text-emerald-600' : 'text-gray-400'}/> Bep Modülü
                                      </button>
                                      {currentUser.role === 'admin' && (
                                          <button onClick={() => setActiveTab('teacherperf')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'teacherperf' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                              <Activity size={18} className={activeTab === 'teacherperf' ? 'text-emerald-600' : 'text-gray-400'}/> Öğretmen Performans
                                          </button>
                                      )}
                                      <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'profile' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                          <User size={18} className={activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'}/> Profilim
                                      </button>
                                  </div>
                                  {(currentUser.role === 'admin' || currentUser.role === 'teacher' || currentUser.role === 'öğretmen') && (
                                      <button onClick={() => setActiveTab('admin')} className={`ml-auto flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 border-red-500 cursor-pointer shrink-0 ${activeTab === 'admin' ? 'text-red-600' : 'text-gray-400 hover:text-gray-800'}`}>
                                          <Settings size={18} className={activeTab === 'admin' ? 'text-red-600' : 'text-gray-400'}/> Yönetim Paneli
                                      </button>
                                  )}
                              </div>
                          ) : (
                          <div className="flex items-center justify-between w-full gap-8">
                              <div className="flex items-center gap-8">
                                  <button onClick={() => setActiveTab('kelimelik')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'kelimelik' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <BookOpen size={18} className={activeTab === 'kelimelik' ? 'text-emerald-600' : 'text-gray-400'}/> Kelimelik 
                                      {assignments.filter((a: any) => {
                                          if (!a || !a.classes || !currentUser || !currentUser.classLevel || a.type !== 'kelime') return false;
                                          const normalize = (s: any) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
                                          const isClassMatch = a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel));
                                          if (!isClassMatch) return false;
                                          if (a.targetType === 'student') {
                                              return (normalize(a.targetStudent) === normalize(currentUser.username) || normalize(a.targetStudent) === normalize(currentUser.name)) && !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                          }
                                          return !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                      }).length > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black ml-1">
                                          {assignments.filter((a: any) => {
                                              if (!a || !a.classes || !currentUser || !currentUser.classLevel || a.type !== 'kelime') return false;
                                              const normalize = (s: any) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
                                              const isClassMatch = a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel));
                                              if (!isClassMatch) return false;
                                              if (a.targetType === 'student') {
                                                  return (normalize(a.targetStudent) === normalize(currentUser.username) || normalize(a.targetStudent) === normalize(currentUser.name)) && !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                              }
                                              return !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                          }).length}
                                        </span>
                                      )}
                                  </button>
                                  <button onClick={() => setActiveTab('mit')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'mit' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Target size={18} className={activeTab === 'mit' ? 'text-emerald-600' : 'text-gray-400'}/> MİT
                                  </button>
                                  <button onClick={() => setActiveTab('genelkultur')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'genelkultur' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Globe size={18} className={activeTab === 'genelkultur' ? 'text-emerald-600' : 'text-gray-400'}/> Genel Kültür
                                  </button>
                                  <button onClick={() => setActiveTab('homework')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'homework' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <BookOpen size={18} className={activeTab === 'homework' ? 'text-emerald-600' : 'text-gray-400'}/> Ödev
                                  </button>
                                  <button onClick={() => setActiveTab('makale')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'makale' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <FileText size={18} className={activeTab === 'makale' ? 'text-emerald-600' : 'text-gray-400'}/> Makale Okulu
                                  </button>
                                  <button onClick={() => setActiveTab('hizliokuma')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'hizliokuma' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Zap size={18} className={activeTab === 'hizliokuma' ? 'text-emerald-600' : 'text-gray-400'}/> Hızlı Okuma
                                  </button>
                                  <button onClick={() => setActiveTab('bep')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'bep' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Activity size={18} className={activeTab === 'bep' ? 'text-emerald-600' : 'text-gray-400'}/> Bep Modülü
                                  </button>
                                  {currentUser.role === 'admin' && (
                                      <button onClick={() => setActiveTab('teacherperf')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'teacherperf' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                          <Activity size={18} className={activeTab === 'teacherperf' ? 'text-emerald-600' : 'text-gray-400'}/> Öğretmen Performans
                                      </button>
                                  )}
                                  <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'profile' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <User size={18} className={activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'}/> Profilim
                                  </button>
                              </div>
                              {(currentUser.role === 'admin' || currentUser.role === 'teacher' || currentUser.role === 'öğretmen') && (
                                  <button onClick={() => setActiveTab('admin')} className={`ml-auto flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 border-red-500 cursor-pointer shrink-0 ${activeTab === 'admin' ? 'text-red-600' : 'text-gray-400 hover:text-gray-800'}`}>
                                      <Settings size={18} className={activeTab === 'admin' ? 'text-red-600' : 'text-gray-400'}/> Yönetim Paneli
                                  </button>
                              )}
                          </div>
                          )
                      ) : (
                          <div className="flex items-center justify-between w-full gap-8">
                              <div className="flex items-center gap-8">
                                  <button onClick={() => setActiveTab('eval')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'eval' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Activity size={18} className={activeTab === 'eval' ? 'text-blue-600' : 'text-gray-400'}/> Değerlendirme
                                  </button>
                                  <button onClick={() => setActiveTab('devcard')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'devcard' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Shield size={18} className={activeTab === 'devcard' ? 'text-blue-600' : 'text-gray-400'}/> Gelişim Kartı
                                  </button>
                                  <button onClick={() => setActiveTab('behavior')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'behavior' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <BarChart2 size={18} className={activeTab === 'behavior' ? 'text-blue-600' : 'text-gray-400'}/> Davranış Notu
                                  </button>
                                  <button onClick={() => setActiveTab('guidance')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'guidance' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <FileText size={18} className={activeTab === 'guidance' ? 'text-blue-600' : 'text-gray-400'}/> Rehberlik
                                  </button>
                                  <button onClick={() => setActiveTab('socialclubs')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'socialclubs' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Users size={18} className={activeTab === 'socialclubs' ? 'text-blue-600' : 'text-gray-400'}/> Sosyal Kulüpler
                                  </button>
                                  <button onClick={() => setActiveTab('portfolio')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'portfolio' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Users size={18} className={activeTab === 'portfolio' ? 'text-blue-600' : 'text-gray-400'}/> Portfolyo
                                  </button>
                                  <button onClick={() => setActiveTab('dijitaldefter')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'dijitaldefter' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <BookOpen size={18} className={activeTab === 'dijitaldefter' ? 'text-blue-600' : 'text-gray-400'}/> Dijital Defter
                                  </button>
                                  <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'profile' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <User size={18} className={activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}/> Profilim
                                  </button>
                              </div>
                              {(currentUser.role === 'admin' || currentUser.role === 'teacher' || currentUser.role === 'öğretmen') && (
                                  <button onClick={() => setActiveTab('admin')} className={`ml-auto flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 border-red-500 cursor-pointer shrink-0 ${activeTab === 'admin' ? 'text-red-600' : 'text-gray-400 hover:text-gray-800'}`}>
                                      <Settings size={18} className={activeTab === 'admin' ? 'text-red-600' : 'text-gray-400'}/> Yönetim Paneli
                                  </button>
                              )}
                          </div>
                      )}
                    </>
                  ) : (
                    <>
                      {activeProject === 'rahle' ? (
                          <div className="flex items-center justify-center gap-8">
                              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${(activeTab === 'dashboard' || !['prep', 'deneme', 'monthly', 'daily', 'matrix', 'history', 'profile'].includes(activeTab)) ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <LayoutDashboard size={18} className={(activeTab === 'dashboard' || !['prep', 'deneme', 'monthly', 'daily', 'matrix', 'history', 'profile'].includes(activeTab)) ? 'text-amber-600' : 'text-gray-400'}/> Hafızlık Karnem &amp; Genel Durum
                              </button>
                              <button onClick={() => setActiveTab('prep')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'prep' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Timer size={18} className={activeTab === 'prep' ? 'text-amber-600' : 'text-gray-400'}/> Yüzünden Okuma &amp; Hazırlık
                              </button>
                              <button onClick={() => setActiveTab('deneme')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'deneme' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Sparkles size={18} className={activeTab === 'deneme' ? 'text-amber-600' : 'text-gray-400'}/> Deneme Cüzü &amp; Potansiyel
                              </button>
                              <button onClick={() => setActiveTab('monthly')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${(activeTab === 'monthly' || activeTab === 'daily' || activeTab === 'matrix') ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <CalendarDays size={18} className={(activeTab === 'monthly' || activeTab === 'daily' || activeTab === 'matrix') ? 'text-amber-600' : 'text-gray-400'}/> Aylık Ders Takip Görünümü
                              </button>
                              <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'history' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Award size={18} className={activeTab === 'history' ? 'text-amber-600' : 'text-gray-400'}/> Dönüşlerim
                              </button>
                              <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'profile' ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <User size={18} className={activeTab === 'profile' ? 'text-amber-600' : 'text-gray-400'}/> Profil Bilgileri
                              </button>
                          </div>
                      ) : activeProject === 'pusula' ? (
                          <div className="flex items-center justify-center gap-8">
                              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'dashboard' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400'}/> Genel Durum &amp; Özet
                              </button>
                              <button onClick={() => setActiveTab('plan')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'plan' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Calendar size={18} className={activeTab === 'plan' ? 'text-purple-600' : 'text-gray-400'}/> Haftalık Çalışma Programım
                              </button>
                              <button onClick={() => setActiveTab('exams')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'exams' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Award size={18} className={activeTab === 'exams' ? 'text-purple-600' : 'text-gray-400'}/> Deneme Sonuçlarım &amp; Netler
                              </button>
                              <button onClick={() => setActiveTab('resources')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'resources' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <BookOpen size={18} className={activeTab === 'resources' ? 'text-purple-600' : 'text-gray-400'}/> Konu &amp; Kaynak Takibim
                              </button>
                              <button onClick={() => setActiveTab('notes')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'notes' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <FileText size={18} className={activeTab === 'notes' ? 'text-purple-600' : 'text-gray-400'}/> Koçluk Görüşmelerim &amp; Notlar
                              </button>
                          </div>
                      ) : activeProject === 'alim' ? (
                          isSpecialEducation ? (
                              <>
                                  <button onClick={() => setActiveTab('bep')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'bep' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <Activity size={18} className={activeTab === 'bep' ? 'text-emerald-600' : 'text-gray-400'}/> Bep Modülü
                                  </button>
                                  <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'profile' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                      <User size={18} className={activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'}/> Profilim
                                  </button>
                              </>
                          ) : (
                          <>
                              <button onClick={() => setActiveTab('kelimelik')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'kelimelik' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <BookOpen size={18} className={activeTab === 'kelimelik' ? 'text-emerald-600' : 'text-gray-400'}/> Kelimelik 
                                  {assignments.filter((a: any) => {
                                      if (!a || !a.classes || !currentUser || !currentUser.classLevel || a.type !== 'kelime') return false;
                                      const normalize = (s: any) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
                                      const isClassMatch = a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel));
                                      if (!isClassMatch) return false;
                                      if (a.targetType === 'student') {
                                          return (normalize(a.targetStudent) === normalize(currentUser.username) || normalize(a.targetStudent) === normalize(currentUser.name)) && !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                      }
                                      return !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                  }).length > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black ml-1">
                                      {assignments.filter((a: any) => {
                                          if (!a || !a.classes || !currentUser || !currentUser.classLevel || a.type !== 'kelime') return false;
                                          const normalize = (s: any) => String(s || '').replace(/[\s_\\/-]/g, '').toLowerCase();
                                          const isClassMatch = a.classes.some((c: string) => normalize(c) === normalize(currentUser.classLevel));
                                          if (!isClassMatch) return false;
                                          if (a.targetType === 'student') {
                                              return (normalize(a.targetStudent) === normalize(currentUser.username) || normalize(a.targetStudent) === normalize(currentUser.name)) && !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                          }
                                          return !hwProgress[`${currentUser.id}_${a.id}`]?.completed;
                                      }).length}
                                    </span>
                                  )}
                              </button>
                              <button onClick={() => setActiveTab('mit')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'mit' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Target size={18} className={activeTab === 'mit' ? 'text-emerald-600' : 'text-gray-400'}/> MİT
                              </button>
                              <button onClick={() => setActiveTab('homework')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'homework' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <BookOpen size={18} className={activeTab === 'homework' ? 'text-emerald-600' : 'text-gray-400'}/> Ödevlerim
                              </button>
                              <button onClick={() => setActiveTab('makale')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'makale' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <FileText size={18} className={activeTab === 'makale' ? 'text-emerald-600' : 'text-gray-400'}/> Makale Okulu
                              </button>
                              <button onClick={() => setActiveTab('hizliokuma')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'hizliokuma' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Zap size={18} className={activeTab === 'hizliokuma' ? 'text-emerald-600' : 'text-gray-400'}/> Hızlı Okuma
                              </button>
                              <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'profile' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <User size={18} className={activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'}/> Profil Bilgileri
                              </button>
                          </>
                          )
                      ) : (
                          <>
                              <button onClick={() => setActiveTab('genelkultur')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'genelkultur' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Globe size={18} className={activeTab === 'genelkultur' ? 'text-blue-600' : 'text-gray-400'}/> Genel Kültür
                              </button>
                              <button onClick={() => setActiveTab('guidance')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'guidance' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <FileText size={18} className={activeTab === 'guidance' ? 'text-blue-600' : 'text-gray-400'}/> Rehberlik
                                  {guidanceAssignments.filter((asgn: any) => 
                                      (asgn.targetType === 'class' && asgn.targetClass === currentUser.classLevel) ||
                                      (asgn.targetType === 'student' && (asgn.targetStudent === currentUser.username || asgn.targetStudent === currentUser.name))
                                  ).filter((asgn: any) => !guidanceForms.some((f: any) => f.studentId === currentUser.id && f.formType === asgn.formId)).length > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                                       {guidanceAssignments.filter((asgn: any) => 
                                          (asgn.targetType === 'class' && asgn.targetClass === currentUser.classLevel) ||
                                          (asgn.targetType === 'student' && (asgn.targetStudent === currentUser.username || asgn.targetStudent === currentUser.name))
                                      ).filter((asgn: any) => !guidanceForms.some((f: any) => f.studentId === currentUser.id && f.formType === asgn.formId)).length}
                                    </span>
                                  )}
                              </button>
                              <button onClick={() => setActiveTab('socialclubs')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'socialclubs' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Users size={18} className={activeTab === 'socialclubs' ? 'text-blue-600' : 'text-gray-400'}/> Sosyal Kulüpler
                              </button>
                              <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'profile' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <User size={18} className={activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}/> Profil Bilgileri
                              </button>
                              <button onClick={() => setActiveTab('idea')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'idea' ? 'border-rose-600 text-rose-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <Lightbulb size={18} className={activeTab === 'idea' ? 'text-rose-600' : 'text-gray-400'}/> Bir Fikrim Var
                              </button>
                              <button onClick={() => setActiveTab('dijitaldefter')} className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'dijitaldefter' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'}`}>
                                  <BookOpen size={18} className={activeTab === 'dijitaldefter' ? 'text-blue-600' : 'text-gray-400'}/> Dijital Defter
                              </button>
                          </>
                      )}
                    </>
                  )}
              </div>
          </nav>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto print:overflow-visible print:h-auto p-4 md:p-8 print:p-0">
              <div className="max-w-[1600px] mx-auto">
                  {renderContent()}
              </div>
          </main>

          {/* Modals */}
          {appToast.message && <Toast message={appToast.message} type={appToast.type} onClose={() => setAppToast({ message: null, type: 'info' })} />}
          <ConfirmModal isOpen={confirmModal.isOpen} message={confirmModal.message} onConfirm={() => { if(confirmModal.onConfirm) confirmModal.onConfirm(); setConfirmModal({ isOpen: false, message: '', onConfirm: null }); }} onCancel={() => setConfirmModal({ isOpen: false, message: '', onConfirm: null })} />
          <PromptModal isOpen={promptModal.isOpen} message={promptModal.message} defaultValue={promptModal.defaultValue} onConfirm={(val: string) => { if(promptModal.onConfirm) promptModal.onConfirm(val); setPromptModal({ isOpen: false, message: '', defaultValue: '', onConfirm: null }); }} onCancel={() => setPromptModal({ isOpen: false, message: '', defaultValue: '', onConfirm: null })} />
      </div>
  );
}
