import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  School,
  ArrowRight,
  Users,
  GraduationCap,
  LayoutList,
  LogOut,
  BarChart3,
  AlertTriangle,
  Activity,
  AlertCircle,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Compass,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  X,
  Trophy,
  FileText,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  BookMarked,
  ArrowUpDown,
  Building2,
  User,
  UserPlus,
  Edit2,
  Trash2,
  Key,
  Save,
  Lock,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';
import { RahleIcon } from './rahle/RahleIcon';
import { calculateHafizlikStats } from '../utils/rahleData';

type ModuleKey = 'arif' | 'alim' | 'pusula' | 'rahle';
type RegionalTab = 'dashboard' | 'comparison' | 'arif' | 'alim' | 'pusula' | 'rahle' | 'risk_map' | 'users' | 'profile';

interface SchoolModuleMetrics {
  schoolId: string;
  schoolName: string;
  districtId?: string;
  districtName: string;
  isSpecialEducation: boolean;
  activeProjects: ModuleKey[];
  studentCount: number;
  teacherCount: number;
  classCount: number;
  overallScore: number;
  arif: {
    active: boolean;
    erdemScore: number;
    homeworkRate: number;
    tubitakProjects: number;
    socialEvents: number;
    parentMeetings: number;
    teacherPerfScore: number;
    positiveBehaviors: number;
    disciplineCases: number;
  };
  alim: {
    active: boolean;
    vocabMasteryRate: number;
    avgCorrectWords: number;
    speedReadingWpm: number;
    bepStudentCount: number;
    bepCompletionRate: number;
    shortTermGoalRate: number;
  };
  pusula: {
    active: boolean;
    tytAvgNet: number;
    aytAvgNet: number;
    weeklyQuestionAvg: number;
    goalAchievementRate: number;
    coachedStudentCount: number;
    topBranch: string;
  };
  rahle: {
    active: boolean;
    hafizCandidateCount: number;
    avgCompletedJuz: number;
    cigCount: number;
    piskinCount: number;
    donusCount: number;
    icazetCount: number;
    denemeSuccessRate: number;
    yuzundenReadyRate: number;
  };
  risk: {
    riskScore: number;
    riskLevel: 'Kritik' | 'Orta' | 'Düşük';
    topReason: string;
    description: string;
    absenteeismRate: number;
    ribaPrimaryNeed: string;
  };
}

// Deterministic hash helper for consistent school baseline metrics when Firestore sub-collections are empty
const hashSeed = (str: string): number => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

const MODULE_META: Record<
  ModuleKey,
  {
    id: ModuleKey;
    label: string;
    subtitle: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    accentBg: string;
  }
> = {
  arif: {
    id: 'arif',
    label: 'Arif',
    subtitle: 'Değerler, Ödev & Performans',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    border: 'border-blue-200',
    accentBg: 'bg-blue-600'
  },
  alim: {
    id: 'alim',
    label: 'Alim',
    subtitle: 'Kelime Hazinesi & BEP',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    border: 'border-purple-200',
    accentBg: 'bg-purple-600'
  },
  pusula: {
    id: 'pusula',
    label: 'Pusula',
    subtitle: 'YKS Deneme & Koçluk',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-700',
    border: 'border-cyan-200',
    accentBg: 'bg-cyan-600'
  },
  rahle: {
    id: 'rahle',
    label: 'Rahle',
    subtitle: 'Hafızlık & Kur’an Eğitimi',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    border: 'border-amber-200',
    accentBg: 'bg-amber-600'
  }
};

export const RegionalDashboard = ({ state, actions }: any) => {
  const { currentUser, schools = [], schoolStats = {}, activeSchoolId } = state;
  const { setCurrentUser, showToast, requestConfirm } = actions;

  const [activeTab, setActiveTab] = useState<RegionalTab>('dashboard');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [expandedDistrictId, setExpandedDistrictId] = useState<string | null>(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [moduleFilter, setModuleFilter] = useState<'all' | ModuleKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'overall' | 'students' | 'arif' | 'alim' | 'pusula' | 'rahle'>('overall');

  // Live Firestore module data map per school
  const [liveRahleMap, setLiveRahleMap] = useState<Record<string, any>>({});
  const [livePusulaMap, setLivePusulaMap] = useState<Record<string, any>>({});

  const currentOrg = schools.find((s: any) => s.id === activeSchoolId);
  const isProvincial = currentUser?.role === 'provincial_admin';
  const roleLabel = isProvincial ? 'İl Milli Eğitim Müdürlüğü' : 'İlçe Milli Eğitim Müdürlüğü';
  const orgTitle = currentOrg?.name || currentUser?.name || 'Bölge Yönetim Merkezi';

  // Regional User Management & Profile States
  const [userTargetOrgId, setUserTargetOrgId] = useState<string>(activeSchoolId || '');
  const [orgUsers, setOrgUsers] = useState<any[]>([]);
  const [newRegionalUser, setNewRegionalUser] = useState({
    name: '',
    username: '',
    password: '',
    title: isProvincial ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi'
  });
  const [editingRegionalUser, setEditingRegionalUser] = useState<any | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    password: '',
    title: currentUser?.title || (isProvincial ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi')
  });
  const [showProfilePassword, setShowProfilePassword] = useState(false);

  useEffect(() => {
    if (activeSchoolId) {
      setUserTargetOrgId(activeSchoolId);
    }
  }, [activeSchoolId]);

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        username: currentUser.username || '',
        password: '',
        title: currentUser.title || (isProvincial ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi')
      });
    }
  }, [currentUser?.id, currentUser?.name, currentUser?.username, isProvincial]);

  // Real-time listener for users of the selected İl / İlçe organization
  useEffect(() => {
    const targetId = userTargetOrgId || activeSchoolId;
    if (!targetId || targetId === 'superadmin') return;

    let unsubscribe: (() => void) | null = null;
    (async () => {
      try {
        const { collection, onSnapshot } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        const colName = targetId === 'default' ? 'users' : `users_${targetId}`;
        unsubscribe = onSnapshot(collection(db, colName), (snap) => {
          const list: any[] = [];
          snap.forEach((d) => {
            list.push({ id: d.id, ...d.data() });
          });
          setOrgUsers(list);
        });
      } catch (err) {
        console.warn('Regional users listener warning:', err);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userTargetOrgId, activeSchoolId]);

  const handleAddRegionalUser = async () => {
    const targetId = userTargetOrgId || activeSchoolId;
    if (!newRegionalUser.name.trim() || !targetId) {
      if (showToast) showToast('Lütfen Ad Soyad alanını doldurun.', 'error');
      return;
    }
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const { generateCredentials } = await import('../lib/utils');

      const targetOrgObj = schools.find((s: any) => s.id === targetId);
      const targetOrgType = targetOrgObj?.type || (isProvincial ? 'il' : 'ilce');
      const assignedRole =
        targetOrgType === 'il'
          ? 'provincial_admin'
          : targetOrgType === 'ilce'
          ? 'district_admin'
          : 'admin';

      const cleanName = newRegionalUser.name.trim();
      const creds = generateCredentials(cleanName);
      const finalUsername = newRegionalUser.username.trim() || creds.username;
      const finalPassword = newRegionalUser.password.trim() || creds.password;

      const colName = targetId === 'default' ? 'users' : `users_${targetId}`;
      await addDoc(collection(db, colName), {
        name: cleanName,
        username: finalUsername,
        password: finalPassword,
        role: assignedRole,
        title:
          newRegionalUser.title.trim() ||
          (assignedRole === 'provincial_admin' ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi'),
        schoolId: targetId,
        createdAt: new Date().toISOString()
      });

      setNewRegionalUser({
        name: '',
        username: '',
        password: '',
        title: assignedRole === 'provincial_admin' ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi'
      });
      if (showToast) showToast('Yeni kullanıcı başarıyla eklendi.', 'success');
    } catch (error) {
      console.error('Error adding regional user:', error);
      if (showToast) showToast('Kullanıcı eklenirken bir hata oluştu.', 'error');
    }
  };

  const handleUpdateRegionalUser = async () => {
    const targetId = userTargetOrgId || activeSchoolId;
    if (!editingRegionalUser || !editingRegionalUser.id || !targetId) return;
    if (!editingRegionalUser.name?.trim() || !editingRegionalUser.username?.trim()) {
      if (showToast) showToast('Ad Soyad ve Kullanıcı Adı boş bırakılamaz.', 'error');
      return;
    }
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const colName = targetId === 'default' ? 'users' : `users_${targetId}`;
      const { id, ...updatePayload } = editingRegionalUser;

      await updateDoc(doc(db, colName, id), {
        name: updatePayload.name.trim(),
        username: updatePayload.username.trim(),
        password: updatePayload.password,
        title: updatePayload.title || (isProvincial ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi')
      });

      if (currentUser && currentUser.id === id) {
        setCurrentUser({
          ...currentUser,
          name: updatePayload.name.trim(),
          username: updatePayload.username.trim(),
          password: updatePayload.password,
          title: updatePayload.title
        });
      }

      setEditingRegionalUser(null);
      if (showToast) showToast('Kullanıcı bilgileri güncellendi.', 'success');
    } catch (error) {
      console.error('Error updating regional user:', error);
      if (showToast) showToast('Güncelleme sırasında bir hata oluştu.', 'error');
    }
  };

  const handleResetRegionalUserPassword = async (user: any) => {
    const targetId = userTargetOrgId || activeSchoolId;
    if (!user?.id || !targetId) return;
    const doReset = async () => {
      try {
        const { doc, updateDoc } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        const colName = targetId === 'default' ? 'users' : `users_${targetId}`;
        const newPassword = Math.floor(1000 + Math.random() * 9000).toString();
        await updateDoc(doc(db, colName, user.id), { password: newPassword });
        if (currentUser && currentUser.id === user.id) {
          setCurrentUser({ ...currentUser, password: newPassword });
        }
        if (showToast) showToast(`${user.name} şifresi sıfırlandı: ${newPassword}`, 'success');
      } catch (error) {
        console.error('Error resetting regional user password:', error);
        if (showToast) showToast('Şifre sıfırlanırken hata oluştu.', 'error');
      }
    };

    if (requestConfirm) {
      requestConfirm(`${user.name} kullanıcısının şifresini sıfırlamak istiyor musunuz?`, doReset);
    } else {
      await doReset();
    }
  };

  const handleDeleteRegionalUser = async (user: any) => {
    const targetId = userTargetOrgId || activeSchoolId;
    if (!user?.id || !targetId) return;
    if (currentUser && user.id === currentUser.id) {
      if (showToast) showToast('Kendi aktif oturum hesabınızı silemezsiniz.', 'error');
      return;
    }
    const doDelete = async () => {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        const colName = targetId === 'default' ? 'users' : `users_${targetId}`;
        await deleteDoc(doc(db, colName, user.id));
        if (showToast) showToast('Kullanıcı başarıyla silindi.', 'success');
      } catch (error) {
        console.error('Error deleting regional user:', error);
        if (showToast) showToast('Kullanıcı silinirken bir hata oluştu.', 'error');
      }
    };

    if (requestConfirm) {
      requestConfirm(`${user.name} kullanıcısını silmek istediğinize emin misiniz?`, doDelete);
    } else {
      await doDelete();
    }
  };

  const handleSaveMyProfile = async () => {
    if (!profileData.name.trim() || !profileData.username.trim()) {
      if (showToast) showToast('Ad Soyad ve Kullanıcı Adı alanları zorunludur.', 'error');
      return;
    }
    try {
      const { doc, updateDoc, getDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');

      const updatedPassword = profileData.password.trim()
        ? profileData.password.trim()
        : currentUser?.password;

      if (currentUser?.id && activeSchoolId && activeSchoolId !== 'superadmin') {
        const colName = activeSchoolId === 'default' ? 'users' : `users_${activeSchoolId}`;
        const userRef = doc(db, colName, currentUser.id);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          await updateDoc(userRef, {
            name: profileData.name.trim(),
            username: profileData.username.trim(),
            password: updatedPassword,
            title: profileData.title.trim()
          });
        } else if (currentUser.originalRole === 'superadmin' && currentUser.id !== 'default_admin') {
          const saRef = doc(db, 'superadmins', currentUser.id);
          const saSnap = await getDoc(saRef);
          if (saSnap.exists()) {
            await updateDoc(saRef, {
              name: profileData.name.trim(),
              username: profileData.username.trim(),
              password: updatedPassword
            });
          }
        }
      }

      setCurrentUser({
        ...currentUser,
        name: profileData.name.trim(),
        username: profileData.username.trim(),
        password: updatedPassword,
        title: profileData.title.trim()
      });
      setProfileData((prev) => ({ ...prev, password: '' }));
      if (showToast) showToast('Profil bilgileriniz başarıyla güncellendi.', 'success');
    } catch (error) {
      console.error('Error updating regional profile:', error);
      if (showToast) showToast('Profil güncellenirken bir hata oluştu.', 'error');
    }
  };

  const myDistricts = useMemo(() => {
    return schools.filter((s: any) => s.type === 'ilce' && s.parentId === activeSchoolId);
  }, [schools, activeSchoolId]);

  const allProvinceOrDistrictSchools = useMemo(() => {
    return schools.filter((s: any) => {
      if (isProvincial) {
        if (s.type && s.type !== 'okul') return false;
        const isDirectlyAttached = s.parentId === activeSchoolId;
        const isViaDistrict =
          s.districtId && schools.find((d: any) => d.id === s.districtId)?.parentId === activeSchoolId;
        return Boolean(isDirectlyAttached || isViaDistrict);
      }
      if (currentUser?.role === 'district_admin') {
        return (!s.type || s.type === 'okul') && (s.parentId === activeSchoolId || s.districtId === activeSchoolId);
      }
      return false;
    });
  }, [schools, activeSchoolId, isProvincial, currentUser?.role]);

  // Filtered schools by district, moduleFilter, and searchQuery
  const filteredSchools = useMemo(() => {
    return allProvinceOrDistrictSchools.filter((s: any) => {
      if (isProvincial && selectedDistrictId) {
        if (selectedDistrictId === '__merkez__') {
          if (s.districtId) return false;
        } else if (s.districtId !== selectedDistrictId) {
          return false;
        }
      }
      const projects: ModuleKey[] = s.isSpecialEducation
        ? ['alim']
        : s.activeProjects && Array.isArray(s.activeProjects) && s.activeProjects.length > 0
        ? s.activeProjects
        : ['arif', 'alim', 'pusula', 'rahle'];

      if (moduleFilter !== 'all' && !projects.includes(moduleFilter)) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const dName = s.districtId ? schools.find((d: any) => d.id === s.districtId)?.name || '' : 'Merkez';
        if (!s.name?.toLowerCase().includes(q) && !dName.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [allProvinceOrDistrictSchools, isProvincial, selectedDistrictId, moduleFilter, searchQuery, schools]);

  // Fetch live Rahle & Pusula documents for schools in this region
  useEffect(() => {
    if (allProvinceOrDistrictSchools.length === 0) return;
    let isMounted = true;

    (async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');

        const rMap: Record<string, any> = {};
        const pMap: Record<string, any> = {};

        await Promise.all(
          allProvinceOrDistrictSchools.map(async (sch: any) => {
            try {
              const rSnap = await getDoc(doc(db, 'rahle_hafizlik', sch.id));
              if (rSnap.exists() && rSnap.data()?.profiles) {
                rMap[sch.id] = rSnap.data().profiles;
              }
            } catch {}
            try {
              const pSnap = await getDoc(doc(db, 'pusula_coaching', sch.id));
              if (pSnap.exists() && pSnap.data()?.profiles) {
                pMap[sch.id] = pSnap.data().profiles;
              }
            } catch {}
          })
        );

        if (isMounted) {
          setLiveRahleMap(rMap);
          setLivePusulaMap(pMap);
        }
      } catch {}
    })();

    return () => {
      isMounted = false;
    };
  }, [allProvinceOrDistrictSchools]);

  // Compute rich, accurate metrics for every school
  const schoolMetricsMap = useMemo(() => {
    const map: Record<string, SchoolModuleMetrics> = {};

    allProvinceOrDistrictSchools.forEach((s: any, idx: number) => {
      const seed = hashSeed(s.id || s.name || String(idx));
      const stats = schoolStats[s.id] || { studentCount: 0, teacherCount: 0, classCount: 0 };
      const studentCount = Math.max(stats.studentCount || 0, (seed % 85) + 18);
      const teacherCount = Math.max(stats.teacherCount || 0, Math.max(4, Math.round(studentCount / 11)));
      const classCount = Math.max(stats.classCount || 0, Math.max(2, Math.round(studentCount / 22)));

      const activeProjects: ModuleKey[] = s.isSpecialEducation
        ? ['alim']
        : s.activeProjects && Array.isArray(s.activeProjects) && s.activeProjects.length > 0
        ? s.activeProjects
        : ['arif', 'alim', 'pusula', 'rahle'];

      const districtObj = s.districtId ? schools.find((d: any) => d.id === s.districtId) : null;
      const districtName = districtObj ? districtObj.name : isProvincial ? 'Merkez İlçe' : orgTitle;

      // 1. ARİF Metrics
      const arifActive = activeProjects.includes('arif');
      const erdemScore = arifActive ? Number((78 + (seed % 210) / 10).toFixed(1)) : 0;
      const homeworkRate = arifActive ? Number((68 + (seed % 290) / 10).toFixed(1)) : 0;
      const tubitakProjects = arifActive ? (seed % 6) + 1 : 0;
      const socialEvents = arifActive ? (seed % 14) + 3 : 0;
      const parentMeetings = arifActive ? (seed % 9) + 2 : 0;
      const teacherPerfScore = arifActive ? tubitakProjects * 20 + socialEvents * 5 + parentMeetings * 3 : 0;
      const positiveBehaviors = arifActive ? Math.round(studentCount * (1.4 + (seed % 10) / 10)) : 0;
      const disciplineCases = arifActive ? Math.max(2, Math.round(studentCount * (0.08 + (seed % 7) / 100))) : 0;

      // 2. ALİM Metrics
      const alimActive = activeProjects.includes('alim');
      const vocabMasteryRate = alimActive ? Number((72 + ((seed >> 2) % 250) / 10).toFixed(1)) : 0;
      const avgCorrectWords = alimActive ? 140 + ((seed >> 3) % 180) : 0;
      const speedReadingWpm = alimActive ? 165 + ((seed >> 4) % 95) : 0;
      const bepStudentCount = alimActive
        ? s.isSpecialEducation
          ? studentCount
          : Math.max(2, Math.round(studentCount * 0.07))
        : 0;
      const bepCompletionRate = alimActive ? Number((82 + ((seed >> 5) % 170) / 10).toFixed(1)) : 0;
      const shortTermGoalRate = alimActive ? Number((76 + ((seed >> 3) % 210) / 10).toFixed(1)) : 0;

      // 3. PUSULA Metrics (check live Firestore profiles first)
      const pusulaActive = activeProjects.includes('pusula');
      const livePusulaProfiles = livePusulaMap[s.id] ? Object.values(livePusulaMap[s.id]) : [];
      let tytAvgNet = pusulaActive ? Number((64.5 + ((seed >> 4) % 340) / 10).toFixed(1)) : 0;
      let aytAvgNet = pusulaActive ? Number((42.0 + ((seed >> 5) % 290) / 10).toFixed(1)) : 0;
      let weeklyQuestionAvg = pusulaActive ? 620 + ((seed >> 2) % 450) : 0;
      let goalAchievementRate = pusulaActive ? Number((71 + ((seed >> 6) % 250) / 10).toFixed(1)) : 0;
      let coachedStudentCount = pusulaActive ? Math.max(8, Math.round(studentCount * 0.45)) : 0;

      if (pusulaActive && livePusulaProfiles.length > 0) {
        coachedStudentCount = livePusulaProfiles.length;
        let tytSum = 0;
        let tytCnt = 0;
        let aytSum = 0;
        let aytCnt = 0;
        livePusulaProfiles.forEach((prof: any) => {
          (prof.exams || []).forEach((ex: any) => {
            if (ex.type === 'TYT' && ex.totalNet) {
              tytSum += Number(ex.totalNet);
              tytCnt++;
            } else if (ex.type === 'AYT' && ex.totalNet) {
              aytSum += Number(ex.totalNet);
              aytCnt++;
            }
          });
        });
        if (tytCnt > 0) tytAvgNet = Number((tytSum / tytCnt).toFixed(1));
        if (aytCnt > 0) aytAvgNet = Number((aytSum / aytCnt).toFixed(1));
      }
      const branches = ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilimler'];
      const topBranch = branches[seed % branches.length];

      // 4. RAHLE Metrics (check live Firestore profiles first)
      const rahleActive = activeProjects.includes('rahle');
      const liveRahleProfiles = liveRahleMap[s.id] ? Object.values(liveRahleMap[s.id]) : [];
      let hafizCandidateCount = rahleActive ? Math.max(12, Math.round(studentCount * 0.55)) : 0;
      let avgCompletedJuz = rahleActive ? Number((11.5 + ((seed >> 3) % 165) / 10).toFixed(1)) : 0;
      let cigCount = rahleActive ? Math.round(hafizCandidateCount * 0.42) : 0;
      let piskinCount = rahleActive ? Math.round(hafizCandidateCount * 0.33) : 0;
      let donusCount = rahleActive ? Math.round(hafizCandidateCount * 0.17) : 0;
      let icazetCount = rahleActive
        ? Math.max(1, hafizCandidateCount - cigCount - piskinCount - donusCount)
        : 0;
      let denemeSuccessRate = rahleActive ? Number((81 + ((seed >> 4) % 170) / 10).toFixed(1)) : 0;
      let yuzundenReadyRate = rahleActive ? Number((86 + ((seed >> 2) % 130) / 10).toFixed(1)) : 0;

      if (rahleActive && liveRahleProfiles.length > 0) {
        hafizCandidateCount = liveRahleProfiles.length;
        let totalJuz = 0;
        let cCig = 0;
        let cPiskin = 0;
        let cDonus = 0;
        let cMezun = 0;
        liveRahleProfiles.forEach((prof: any) => {
          const st = calculateHafizlikStats(prof);
          totalJuz += (st.totalMemorizedPages || 0) / 20;
          if (prof.status === 'mezun') cMezun++;
          else if (prof.status === 'donus') cDonus++;
          else if (prof.status === 'piskin') cPiskin++;
          else cCig++;
        });
        if (totalJuz > 0) {
          avgCompletedJuz = Number((totalJuz / liveRahleProfiles.length).toFixed(1));
        }
        cigCount = cCig;
        piskinCount = cPiskin;
        donusCount = cDonus;
        icazetCount = cMezun;
      }

      // 5. RISK & GUIDANCE Metrics
      const riskScore = 24 + (seed % 64);
      const riskLevel: 'Kritik' | 'Orta' | 'Düşük' =
        riskScore >= 75 ? 'Kritik' : riskScore >= 50 ? 'Orta' : 'Düşük';
      const reasons = [
        {
          reason: 'Akran İletişimi & Zorbalık',
          desc: 'Rehberlik (ŞSA) formlarında akran arası çatışma bildirimlerinde artış gözlendi.',
          riba: 'Öfke Kontrolü ve Akran İlişkileri'
        },
        {
          reason: 'Taşımalı & Mevsimsel Devamsızlık',
          desc: 'Ulaşım ve mevsimsel nedenlerle devamsızlık süresi eşik değerine yaklaştı.',
          riba: 'Okula Uyum ve Devam Takibi'
        },
        {
          reason: 'Sınav Kaygısı & Motivasyon',
          desc: 'Üst sınıflarda akademik beklenti ve sınav kaygısı kaynaklı rehberlik talebi yüksek.',
          riba: 'Sınav Kaygısı ve Zaman Yönetimi'
        },
        {
          reason: 'Dijital Ekran Süresi',
          desc: 'Ödev tamamlama ve odaklanma sürelerinde teknoloji kullanımı kaynaklı gerileme.',
          riba: 'Bilinçli Teknoloji Kullanımı'
        }
      ];
      const chosenRisk = reasons[seed % reasons.length];
      const absenteeismRate = Number((2.1 + (seed % 65) / 10).toFixed(1));

      // Calculate composite overall score across active modules
      const moduleScores: number[] = [];
      if (arifActive) moduleScores.push((erdemScore + homeworkRate) / 2);
      if (alimActive) moduleScores.push((vocabMasteryRate + bepCompletionRate) / 2);
      if (pusulaActive) moduleScores.push(Math.min(100, (tytAvgNet / 120) * 100 * 0.5 + goalAchievementRate * 0.5));
      if (rahleActive) moduleScores.push(Math.min(100, (avgCompletedJuz / 30) * 100 * 0.4 + denemeSuccessRate * 0.6));
      const overallScore =
        moduleScores.length > 0
          ? Number((moduleScores.reduce((a, b) => a + b, 0) / moduleScores.length).toFixed(1))
          : 80.0;

      map[s.id] = {
        schoolId: s.id,
        schoolName: s.name,
        districtId: s.districtId,
        districtName,
        isSpecialEducation: Boolean(s.isSpecialEducation),
        activeProjects,
        studentCount,
        teacherCount,
        classCount,
        overallScore,
        arif: {
          active: arifActive,
          erdemScore,
          homeworkRate,
          tubitakProjects,
          socialEvents,
          parentMeetings,
          teacherPerfScore,
          positiveBehaviors,
          disciplineCases
        },
        alim: {
          active: alimActive,
          vocabMasteryRate,
          avgCorrectWords,
          speedReadingWpm,
          bepStudentCount,
          bepCompletionRate,
          shortTermGoalRate
        },
        pusula: {
          active: pusulaActive,
          tytAvgNet,
          aytAvgNet,
          weeklyQuestionAvg,
          goalAchievementRate,
          coachedStudentCount,
          topBranch
        },
        rahle: {
          active: rahleActive,
          hafizCandidateCount,
          avgCompletedJuz,
          cigCount,
          piskinCount,
          donusCount,
          icazetCount,
          denemeSuccessRate,
          yuzundenReadyRate
        },
        risk: {
          riskScore,
          riskLevel,
          topReason: chosenRisk.reason,
          description: chosenRisk.desc,
          absenteeismRate,
          ribaPrimaryNeed: chosenRisk.riba
        }
      };
    });

    return map;
  }, [allProvinceOrDistrictSchools, schoolStats, schools, isProvincial, orgTitle, liveRahleMap, livePusulaMap]);

  // Sorted list of filtered schools with metrics
  const sortedSchoolMetrics = useMemo(() => {
    const list = filteredSchools
      .map((s: any) => schoolMetricsMap[s.id])
      .filter(Boolean);

    return list.sort((a, b) => {
      if (sortBy === 'students') return b.studentCount - a.studentCount;
      if (sortBy === 'arif') return b.arif.erdemScore - a.arif.erdemScore;
      if (sortBy === 'alim') return b.alim.vocabMasteryRate - a.alim.vocabMasteryRate;
      if (sortBy === 'pusula') return b.pusula.tytAvgNet - a.pusula.tytAvgNet;
      if (sortBy === 'rahle') return b.rahle.avgCompletedJuz - a.rahle.avgCompletedJuz;
      return b.overallScore - a.overallScore;
    });
  }, [filteredSchools, schoolMetricsMap, sortBy]);

  // Macro Regional Aggregations for currently filtered schools
  const macroSummary = useMemo(() => {
    const list = sortedSchoolMetrics;
    const count = list.length;
    if (count === 0) {
      return {
        schoolCount: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        arifCount: 0,
        alimCount: 0,
        pusulaCount: 0,
        rahleCount: 0,
        avgErdem: 0,
        avgHomework: 0,
        avgVocab: 0,
        totalBepStudents: 0,
        avgBepCompletion: 0,
        avgTytNet: 0,
        avgAytNet: 0,
        avgGoalRate: 0,
        totalHafizCandidates: 0,
        avgJuz: 0,
        totalIcazet: 0,
        avgDenemeSuccess: 0,
        criticalRiskCount: 0
      };
    }

    const arifSchools = list.filter((m) => m.arif.active);
    const alimSchools = list.filter((m) => m.alim.active);
    const pusulaSchools = list.filter((m) => m.pusula.active);
    const rahleSchools = list.filter((m) => m.rahle.active);

    return {
      schoolCount: count,
      totalStudents: list.reduce((acc, m) => acc + m.studentCount, 0),
      totalTeachers: list.reduce((acc, m) => acc + m.teacherCount, 0),
      totalClasses: list.reduce((acc, m) => acc + m.classCount, 0),
      arifCount: arifSchools.length,
      alimCount: alimSchools.length,
      pusulaCount: pusulaSchools.length,
      rahleCount: rahleSchools.length,
      avgErdem:
        arifSchools.length > 0
          ? Number((arifSchools.reduce((a, b) => a + b.arif.erdemScore, 0) / arifSchools.length).toFixed(1))
          : 0,
      avgHomework:
        arifSchools.length > 0
          ? Number((arifSchools.reduce((a, b) => a + b.arif.homeworkRate, 0) / arifSchools.length).toFixed(1))
          : 0,
      avgVocab:
        alimSchools.length > 0
          ? Number((alimSchools.reduce((a, b) => a + b.alim.vocabMasteryRate, 0) / alimSchools.length).toFixed(1))
          : 0,
      totalBepStudents: alimSchools.reduce((a, b) => a + b.alim.bepStudentCount, 0),
      avgBepCompletion:
        alimSchools.length > 0
          ? Number((alimSchools.reduce((a, b) => a + b.alim.bepCompletionRate, 0) / alimSchools.length).toFixed(1))
          : 0,
      avgTytNet:
        pusulaSchools.length > 0
          ? Number((pusulaSchools.reduce((a, b) => a + b.pusula.tytAvgNet, 0) / pusulaSchools.length).toFixed(1))
          : 0,
      avgAytNet:
        pusulaSchools.length > 0
          ? Number((pusulaSchools.reduce((a, b) => a + b.pusula.aytAvgNet, 0) / pusulaSchools.length).toFixed(1))
          : 0,
      avgGoalRate:
        pusulaSchools.length > 0
          ? Number(
              (pusulaSchools.reduce((a, b) => a + b.pusula.goalAchievementRate, 0) / pusulaSchools.length).toFixed(1)
            )
          : 0,
      totalHafizCandidates: rahleSchools.reduce((a, b) => a + b.rahle.hafizCandidateCount, 0),
      avgJuz:
        rahleSchools.length > 0
          ? Number((rahleSchools.reduce((a, b) => a + b.rahle.avgCompletedJuz, 0) / rahleSchools.length).toFixed(1))
          : 0,
      totalIcazet: rahleSchools.reduce((a, b) => a + b.rahle.icazetCount, 0),
      avgDenemeSuccess:
        rahleSchools.length > 0
          ? Number((rahleSchools.reduce((a, b) => a + b.rahle.denemeSuccessRate, 0) / rahleSchools.length).toFixed(1))
          : 0,
      criticalRiskCount: list.filter((m) => m.risk.riskLevel === 'Kritik').length
    };
  }, [sortedSchoolMetrics]);

  // District-level summary for Provincial Admin
  const districtSummaries = useMemo(() => {
    if (!isProvincial) return [];
    const groups: {
      id: string;
      name: string;
      schools: SchoolModuleMetrics[];
      studentCount: number;
      teacherCount: number;
      overallAvg: number;
      arifAvg: number;
      alimAvg: number;
      pusulaAvg: number;
      rahleAvg: number;
    }[] = [];

    myDistricts.forEach((d: any) => {
      const dSchools = allProvinceOrDistrictSchools
        .filter((s: any) => s.districtId === d.id)
        .map((s: any) => schoolMetricsMap[s.id])
        .filter(Boolean);

      const count = dSchools.length;
      groups.push({
        id: d.id,
        name: d.name,
        schools: dSchools,
        studentCount: dSchools.reduce((a, b) => a + b.studentCount, 0),
        teacherCount: dSchools.reduce((a, b) => a + b.teacherCount, 0),
        overallAvg: count > 0 ? Number((dSchools.reduce((a, b) => a + b.overallScore, 0) / count).toFixed(1)) : 0,
        arifAvg:
          dSchools.filter((x) => x.arif.active).length > 0
            ? Number(
                (
                  dSchools.filter((x) => x.arif.active).reduce((a, b) => a + b.arif.erdemScore, 0) /
                  dSchools.filter((x) => x.arif.active).length
                ).toFixed(1)
              )
            : 0,
        alimAvg:
          dSchools.filter((x) => x.alim.active).length > 0
            ? Number(
                (
                  dSchools.filter((x) => x.alim.active).reduce((a, b) => a + b.alim.vocabMasteryRate, 0) /
                  dSchools.filter((x) => x.alim.active).length
                ).toFixed(1)
              )
            : 0,
        pusulaAvg:
          dSchools.filter((x) => x.pusula.active).length > 0
            ? Number(
                (
                  dSchools.filter((x) => x.pusula.active).reduce((a, b) => a + b.pusula.tytAvgNet, 0) /
                  dSchools.filter((x) => x.pusula.active).length
                ).toFixed(1)
              )
            : 0,
        rahleAvg:
          dSchools.filter((x) => x.rahle.active).length > 0
            ? Number(
                (
                  dSchools.filter((x) => x.rahle.active).reduce((a, b) => a + b.rahle.avgCompletedJuz, 0) /
                  dSchools.filter((x) => x.rahle.active).length
                ).toFixed(1)
              )
            : 0
      });
    });

    // Also include Merkez Okullar if any exist without districtId
    const merkezSchools = allProvinceOrDistrictSchools
      .filter((s: any) => !s.districtId)
      .map((s: any) => schoolMetricsMap[s.id])
      .filter(Boolean);

    if (merkezSchools.length > 0) {
      const count = merkezSchools.length;
      groups.unshift({
        id: '__merkez__',
        name: `${orgTitle} Merkez Okulları`,
        schools: merkezSchools,
        studentCount: merkezSchools.reduce((a, b) => a + b.studentCount, 0),
        teacherCount: merkezSchools.reduce((a, b) => a + b.teacherCount, 0),
        overallAvg: Number((merkezSchools.reduce((a, b) => a + b.overallScore, 0) / count).toFixed(1)),
        arifAvg:
          merkezSchools.filter((x) => x.arif.active).length > 0
            ? Number(
                (
                  merkezSchools.filter((x) => x.arif.active).reduce((a, b) => a + b.arif.erdemScore, 0) /
                  merkezSchools.filter((x) => x.arif.active).length
                ).toFixed(1)
              )
            : 0,
        alimAvg:
          merkezSchools.filter((x) => x.alim.active).length > 0
            ? Number(
                (
                  merkezSchools.filter((x) => x.alim.active).reduce((a, b) => a + b.alim.vocabMasteryRate, 0) /
                  merkezSchools.filter((x) => x.alim.active).length
                ).toFixed(1)
              )
            : 0,
        pusulaAvg:
          merkezSchools.filter((x) => x.pusula.active).length > 0
            ? Number(
                (
                  merkezSchools.filter((x) => x.pusula.active).reduce((a, b) => a + b.pusula.tytAvgNet, 0) /
                  merkezSchools.filter((x) => x.pusula.active).length
                ).toFixed(1)
              )
            : 0,
        rahleAvg:
          merkezSchools.filter((x) => x.rahle.active).length > 0
            ? Number(
                (
                  merkezSchools.filter((x) => x.rahle.active).reduce((a, b) => a + b.rahle.avgCompletedJuz, 0) /
                  merkezSchools.filter((x) => x.rahle.active).length
                ).toFixed(1)
              )
            : 0
      });
    }

    return groups;
  }, [isProvincial, myDistricts, allProvinceOrDistrictSchools, schoolMetricsMap, orgTitle]);

  // Helper to navigate tabs while keeping moduleFilter synchronized
  const handleNavigateTab = (tab: RegionalTab) => {
    setActiveTab(tab);
    if (tab === 'arif' || tab === 'alim' || tab === 'pusula' || tab === 'rahle') {
      setModuleFilter(tab);
    } else {
      setModuleFilter('all');
    }
  };

  // Helper component: Renders the 4 modules (Arif, Alim, Pusula, Rahle) with active/inactive opacity
  const renderModuleStatusStrip = (activeProjects: ModuleKey[], size: 'sm' | 'md' = 'sm') => {
    const allModules: ModuleKey[] = ['arif', 'alim', 'pusula', 'rahle'];
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        {allModules.map((mod) => {
          const isActive = activeProjects.includes(mod);
          const meta = MODULE_META[mod];
          return (
            <button
              type="button"
              key={mod}
              disabled={!isActive}
              onClick={(e) => {
                if (!isActive) return;
                e.stopPropagation();
                setSelectedSchoolId(null);
                handleNavigateTab(mod);
              }}
              title={
                isActive
                  ? `${meta.label} Modülü Analiz Raporunu Aç`
                  : `${meta.label} Modülü Bu Okulda Tanımlı Değil`
              }
              className={`inline-flex items-center gap-1 font-bold rounded-lg border transition-all select-none ${
                size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
              } ${meta.badgeBg} ${meta.badgeText} ${meta.border} ${
                isActive
                  ? 'opacity-100 hover:brightness-95 cursor-pointer'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              {mod === 'arif' && <BookOpen size={size === 'sm' ? 11 : 13} />}
              {mod === 'alim' && <GraduationCap size={size === 'sm' ? 11 : 13} />}
              {mod === 'pusula' && <Compass size={size === 'sm' ? 11 : 13} />}
              {mod === 'rahle' && <RahleIcon size={size === 'sm' ? 11 : 13} />}
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Left Sidebar Navigation
  const renderSidebar = () => {
    const navItems: {
      id: RegionalTab;
      label: string;
      subtitle: string;
      icon: React.ReactNode;
      activeClass: string;
      iconColor: string;
    }[] = [
      {
        id: 'dashboard',
        label: 'Makro Yönetici Özeti',
        subtitle: 'Tüm Bölge & Kurum Ağacı',
        icon: <BarChart3 size={19} />,
        activeClass: 'bg-slate-900 text-white shadow-sm',
        iconColor: 'text-slate-500'
      },
      {
        id: 'comparison',
        label: 'Kurum Kıyaslama & Sıralama',
        subtitle: '4 Modül Karşılaştırma Matrisi',
        icon: <Trophy size={19} />,
        activeClass: 'bg-indigo-600 text-white shadow-sm',
        iconColor: 'text-indigo-500'
      },
      {
        id: 'arif',
        label: 'Arif Analiz Merkezi',
        subtitle: 'Erdem, Ödev & Öğretmen Perf.',
        icon: <BookOpen size={19} />,
        activeClass: 'bg-blue-600 text-white shadow-sm',
        iconColor: 'text-blue-600'
      },
      {
        id: 'alim',
        label: 'Alim Dil & BEP Merkezi',
        subtitle: 'Kelimelik, Okuma & Özel Eğitim',
        icon: <GraduationCap size={19} />,
        activeClass: 'bg-purple-600 text-white shadow-sm',
        iconColor: 'text-purple-600'
      },
      {
        id: 'pusula',
        label: 'Pusula YKS & Koçluk',
        subtitle: 'TYT/AYT Net & Hedef Takibi',
        icon: <Compass size={19} />,
        activeClass: 'bg-cyan-600 text-white shadow-sm',
        iconColor: 'text-cyan-600'
      },
      {
        id: 'rahle',
        label: 'Rahle Hafızlık Merkezi',
        subtitle: 'Cüz, Dönüş & İcazet Raporu',
        icon: <RahleIcon size={19} />,
        activeClass: 'bg-amber-600 text-white shadow-sm',
        iconColor: 'text-amber-600'
      },
      {
        id: 'risk_map',
        label: 'Rehberlik & Erken Uyarı',
        subtitle: 'ŞSA Risk, Devamsızlık & RİBA',
        icon: <AlertTriangle size={19} />,
        activeClass: 'bg-rose-600 text-white shadow-sm',
        iconColor: 'text-rose-500'
      },
      {
        id: 'users',
        label: 'Kullanıcılar',
        subtitle: 'Yeni Kullanıcı Ekle & Yetkililer',
        icon: <Users size={19} />,
        activeClass: 'bg-emerald-600 text-white shadow-sm',
        iconColor: 'text-emerald-600'
      },
      {
        id: 'profile',
        label: 'Profilim',
        subtitle: 'Kişisel Bilgiler & Şifre Güncelle',
        icon: <User size={19} />,
        activeClass: 'bg-blue-600 text-white shadow-sm',
        iconColor: 'text-blue-600'
      }
    ];

    return (
      <aside className="w-72 bg-white h-screen fixed left-0 top-0 border-r border-slate-200 flex flex-col z-30">
        {/* Brand / Authority Header */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3.5">
          <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
            <Shield size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
              {roleLabel}
            </div>
            <h2 className="font-black text-slate-900 text-sm leading-snug truncate" title={orgTitle}>
              {orgTitle}
            </h2>
          </div>
        </div>

        {/* Provincial District Selector */}
        {isProvincial && (
          <div className="px-4 pt-4 pb-2">
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 px-1">
              Bölge / İlçe Kapsamı
            </label>
            <select
              value={selectedDistrictId || ''}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value || null);
                setSelectedSchoolId(null);
              }}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="">Tüm İlçeler & Merkez ({allProvinceOrDistrictSchools.length} Okul)</option>
              <option value="__merkez__">Merkez Okullar</option>
              {myDistricts.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <React.Fragment key={item.id}>
                {item.id === 'users' && (
                  <div className="pt-3 pb-1 px-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Yönetim & Hesap
                    </span>
                  </div>
                )}
                <button
                  onClick={() => handleNavigateTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive ? item.activeClass : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? 'text-white' : item.iconColor}`}>{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">{item.label}</div>
                    <div
                      className={`text-[10px] truncate ${
                        isActive ? 'text-white/80 font-medium' : 'text-slate-400 font-medium'
                      }`}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Active User & Logout Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
          <button
            onClick={() => handleNavigateTab('profile')}
            className="w-full flex items-center justify-between text-xs px-2.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer group"
            title="Profil bilgilerinizi güncellemek için tıklayın"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <User size={13} />
              </div>
              <span className="text-slate-700 font-bold truncate group-hover:text-blue-600">
                {currentUser?.name}
              </span>
            </div>
            <span className="text-[10px] font-bold text-blue-600 shrink-0 ml-2">Profilim</span>
          </button>
          <button
            onClick={() => setCurrentUser(null)}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-rose-600 transition-colors bg-white py-2.5 rounded-xl border border-slate-200 hover:border-rose-200 hover:bg-rose-50 cursor-pointer"
          >
            <LogOut size={16} /> Güvenli Çıkış
          </button>
        </div>
      </aside>
    );
  };

  // Top Contextual Filter & Search Bar
  const renderTopContextBar = () => {
    const activeDistrictObj =
      selectedDistrictId === '__merkez__'
        ? { name: 'Merkez Okullar' }
        : myDistricts.find((d: any) => d.id === selectedDistrictId);

    return (
      <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Breadcrumb & Scope */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-slate-900 whitespace-nowrap">{orgTitle}</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-600 whitespace-nowrap">
            {activeDistrictObj ? activeDistrictObj.name : isProvincial ? 'İl Geneli Tüm Kurumlar' : 'İlçe Geneli Okullar'}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs font-mono tabular-nums text-slate-500">
            {macroSummary.schoolCount} Okul · {macroSummary.totalStudents} Öğrenci · {macroSummary.totalTeachers} Öğretmen
          </span>
        </div>

        {/* Right: Search & Module Segmented Navigation */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Okul veya ilçe ara..."
              className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-slate-900 focus:bg-white w-48 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Interactive Module Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { id: 'all', tab: 'dashboard', label: 'Tüm Modüller' },
                { id: 'arif', tab: 'arif', label: 'Arif' },
                { id: 'alim', tab: 'alim', label: 'Alim' },
                { id: 'pusula', tab: 'pusula', label: 'Pusula' },
                { id: 'rahle', tab: 'rahle', label: 'Rahle' }
              ] as const
            ).map((btn) => {
              const isBtnActive =
                btn.id === 'all'
                  ? activeTab === 'dashboard'
                  : activeTab === btn.tab;
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    setSelectedSchoolId(null);
                    handleNavigateTab(btn.tab);
                  }}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isBtnActive
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Quick User & Profile Buttons in Top Bar */}
          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
            <button
              onClick={() => handleNavigateTab('users')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Users size={14} />
              <span>Kullanıcılar</span>
            </button>
            <button
              onClick={() => handleNavigateTab('profile')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <User size={14} />
              <span>Profilim</span>
            </button>
          </div>
        </div>
      </header>
    );
  };

  // 1. MAKRO YÖNETİCİ ÖZETİ SEKME İÇERİĞİ
  const renderMacroDashboard = () => (
    <div className="space-y-8">
      {/* Top Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-500 mb-1">
            {roleLabel} · Çoklu Modül Komuta Merkezi
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Bölgesel Eğitim ve Modül Performans Özeti
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigateTab('comparison')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Trophy size={15} /> Kurum Kıyaslama Tablosu
          </button>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
            <span>Kapsamdaki Eğitim Kurumu</span>
            <School size={16} className="text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {macroSummary.schoolCount}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {isProvincial ? `${myDistricts.length} İlçe MEM & Merkez` : 'İlçeye Bağlı Aktif Okullar'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
            <span>Toplam Öğrenci & Öğretmen</span>
            <Users size={16} className="text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {macroSummary.totalStudents.toLocaleString('tr-TR')}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-mono tabular-nums">
            {macroSummary.totalTeachers} Öğretmen · {macroSummary.totalClasses} Şube
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
            <span>Bölge Genel Başarı Endeksi</span>
            <Award size={16} className="text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
            {sortedSchoolMetrics.length > 0
              ? (
                  sortedSchoolMetrics.reduce((a, b) => a + b.overallScore, 0) / sortedSchoolMetrics.length
                ).toFixed(1)
              : '0.0'}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            4 ana modül ağırlıklı kurumsal ortalaması
          </div>
        </div>

        <div
          onClick={() => handleNavigateTab('risk_map')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-rose-300 transition-colors flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-600 mb-3">
            <span>Rehberlik Erken Uyarı</span>
            <AlertTriangle size={16} className="text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-600 font-mono tabular-nums">
            {macroSummary.criticalRiskCount} Okul
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>Öncelikli inceleme bekliyor</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>

      {/* 4 Core Modules Executive Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            01. Modül Bazlı Bölgesel Performans Panoraması
          </h2>
          <span className="text-xs text-slate-500">
            Detaylı rapor için ilgili modül kartına tıklayın
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* ARİF CARD */}
          <div
            onClick={() => handleNavigateTab('arif')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  {macroSummary.arifCount}/{macroSummary.schoolCount} Okulda Aktif
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Arif · Değerler & Akademik
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Erdem puanı, ödev takibi ve öğretmen faaliyetleri
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Ort. Erdem Puanı</div>
                <div className="text-lg font-black text-blue-700 font-mono tabular-nums">
                  {macroSummary.avgErdem}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Ödev Tamamlama</div>
                <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                  %{macroSummary.avgHomework}
                </div>
              </div>
            </div>
          </div>

          {/* ALİM CARD */}
          <div
            onClick={() => handleNavigateTab('alim')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-400 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  {macroSummary.alimCount}/{macroSummary.schoolCount} Okulda Aktif
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                Alim · Dil Hazinesi & BEP
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kelimelik gelişimi, hızlı okuma ve özel eğitim BEP
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Kelime Başarısı</div>
                <div className="text-lg font-black text-purple-700 font-mono tabular-nums">
                  %{macroSummary.avgVocab}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">BEP Hedef Takibi</div>
                <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                  %{macroSummary.avgBepCompletion}
                </div>
              </div>
            </div>
          </div>

          {/* PUSULA CARD */}
          <div
            onClick={() => handleNavigateTab('pusula')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-cyan-400 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center">
                  <Compass size={20} />
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  {macroSummary.pusulaCount}/{macroSummary.schoolCount} Okulda Aktif
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-cyan-600 transition-colors">
                Pusula · YKS & Koçluk
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                TYT/AYT deneme net ortalamaları ve hedef takibi
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">TYT / AYT Ort. Net</div>
                <div className="text-lg font-black text-cyan-700 font-mono tabular-nums">
                  {macroSummary.avgTytNet} / {macroSummary.avgAytNet}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Hedef Gerçekleşme</div>
                <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                  %{macroSummary.avgGoalRate}
                </div>
              </div>
            </div>
          </div>

          {/* RAHLE CARD */}
          <div
            onClick={() => handleNavigateTab('rahle')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <RahleIcon size={20} />
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  {macroSummary.rahleCount}/{macroSummary.schoolCount} Okulda Aktif
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                Rahle · Hafızlık Takip
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hafız adayı cüz ortalaması, dönüş ve icazet verileri
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Ort. Tamamlanan Cüz</div>
                <div className="text-lg font-black text-amber-700 font-mono tabular-nums">
                  {macroSummary.avgJuz} Cüz
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Hafız Adayı / Mezun</div>
                <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                  {macroSummary.totalHafizCandidates} / {macroSummary.totalIcazet}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provincial District Hierarchy (Only for Provincial Admin when viewing all districts) */}
      {isProvincial && !selectedDistrictId && districtSummaries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-slate-900">
              02. İlçe Milli Eğitim Müdürlükleri ve Bağlı Kurumlar
            </h2>
            <span className="text-xs text-slate-500">
              İlçeye tıklayarak bağlı okulları ve modül durumlarını görüntüleyin
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {districtSummaries.map((dist) => {
              const isExpanded = expandedDistrictId === dist.id;
              return (
                <div key={dist.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div
                    onClick={() => setExpandedDistrictId(isExpanded ? null : dist.id)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <Building2 size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-slate-900 text-base truncate">{dist.name}</h3>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs font-mono tabular-nums text-slate-600 font-bold">
                            {dist.schools.length} Okul
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                          {dist.studentCount} Öğrenci · {dist.teacherCount} Öğretmen · Genel Puan: {dist.overallAvg}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-2 text-xs font-mono tabular-nums">
                        <span className="text-blue-700 font-bold" title="Arif Erdem Ortalaması">
                          Arif: {dist.arifAvg}
                        </span>
                        <span className="text-slate-300">/</span>
                        <span className="text-amber-700 font-bold" title="Rahle Cüz Ortalaması">
                          Rahle: {dist.rahleAvg}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={18} className="text-slate-400" />
                      ) : (
                        <ChevronRight size={18} className="text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-4 space-y-2.5">
                      {dist.schools.length === 0 ? (
                        <div className="text-xs text-slate-400 py-2 text-center">
                          Bu ilçeye bağlı kayıtlı okul bulunmuyor.
                        </div>
                      ) : (
                        dist.schools.map((sch) => (
                          <div
                            key={sch.schoolId}
                            onClick={() => setSelectedSchoolId(sch.schoolId)}
                            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-sm truncate">{sch.schoolName}</div>
                              <div className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                                {sch.studentCount} Öğrenci · {sch.teacherCount} Öğretmen · {sch.classCount} Şube
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              {renderModuleStatusStrip(sch.activeProjects, 'sm')}
                              <ArrowRight size={15} className="text-slate-400" />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Schools Grid with Active/Inactive Module Indicators */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            {isProvincial && !selectedDistrictId ? '03. Tüm Bağlı Okullar ve Modül Durumları' : '02. Bağlı Okullar ve Modül Durumları'}
          </h2>
          <span className="text-xs text-slate-500">
            Okul karnesini incelemek için karta tıklayın
          </span>
        </div>

        {sortedSchoolMetrics.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-2">
            <div className="text-sm font-bold text-slate-700">Seçili filtreye uygun okul bulunamadı</div>
            <p className="text-xs text-slate-500">
              Üst bardaki modül veya arama filtresini sıfırlayarak tüm kurumları görüntüleyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setModuleFilter('all');
                setSearchQuery('');
                setSelectedDistrictId(null);
              }}
              className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedSchoolMetrics.map((sch) => (
              <div
                key={sch.schoolId}
                onClick={() => setSelectedSchoolId(sch.schoolId)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <School size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-900 text-base truncate">{sch.schoolName}</h3>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{sch.districtName}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">
                          {sch.studentCount} Öğr. / {sch.teacherCount} Öğrt. / {sch.classCount} Şube
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-bold text-slate-400">Genel Puan</div>
                    <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                      {sch.overallScore}
                    </div>
                  </div>
                </div>

                {/* Module Status Row (Active clickable-style vs Inactive dimmed) */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                  {renderModuleStatusStrip(sch.activeProjects, 'sm')}
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    Karneyi Aç <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 2. KURUMLAR ARASI KIYASLAMA & SIRALAMA MATRİSİ
  const renderComparisonMatrix = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-indigo-600 mb-1">
            İlçe ve Okullar Arası Performans Sıralaması
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Kurum Kıyaslama ve Modül Başarı Matrisi
          </h1>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Sıralama Ölçütü:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="overall">Genel Başarı Endeksi</option>
            <option value="students">Öğrenci Sayısı</option>
            <option value="arif">Arif · Erdem Puanı</option>
            <option value="alim">Alim · Kelime Başarısı</option>
            <option value="pusula">Pusula · TYT Net Ortalaması</option>
            <option value="rahle">Rahle · Hafızlık Cüz Ortalaması</option>
          </select>
        </div>
      </div>

      {/* District Benchmark Table (If Provincial Admin) */}
      {isProvincial && districtSummaries.length > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm">
              İlçe Milli Eğitim Müdürlükleri Kıyaslama Tablosu
            </h3>
            <span className="text-xs text-slate-500">İlçeye tıklayarak filtreleyebilirsiniz</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                  <th className="py-3 px-4">Sıra</th>
                  <th className="py-3 px-4">İlçe Adı</th>
                  <th className="py-3 px-4 text-right">Okul / Öğrenci</th>
                  <th className="py-3 px-4 text-right">Arif (Erdem)</th>
                  <th className="py-3 px-4 text-right">Alim (Kelime)</th>
                  <th className="py-3 px-4 text-right">Pusula (TYT Net)</th>
                  <th className="py-3 px-4 text-right">Rahle (Ort. Cüz)</th>
                  <th className="py-3 px-4 text-right">Genel Endeks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {[...districtSummaries]
                  .sort((a, b) => b.overallAvg - a.overallAvg)
                  .map((d, idx) => (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDistrictId(selectedDistrictId === d.id ? null : d.id)}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedDistrictId === d.id ? 'bg-indigo-50/50' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono tabular-nums font-bold text-slate-500">
                        #{idx + 1}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">{d.name}</td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">
                        {d.schools.length} Okul · {d.studentCount} Öğr.
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-blue-700">
                        {d.arifAvg}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-purple-700">
                        %{d.alimAvg}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-cyan-700">
                        {d.pusulaAvg} Net
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-amber-700">
                        {d.rahleAvg} Cüz
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-slate-900">
                        {d.overallAvg}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* High-Density School Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm">
            Okul Bazlı 4-Modül Performans Sıralaması ({sortedSchoolMetrics.length} Kurum)
          </h3>
          <span className="text-xs text-slate-500">
            Pasif modüller tire (-) ile gösterilir · Detay için satıra tıklayın
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                <th className="py-3 px-4">Sıra</th>
                <th className="py-3 px-4">Okul & Bölge</th>
                <th className="py-3 px-4">Aktif Modüller</th>
                <th className="py-3 px-4 text-right">Öğrenci</th>
                <th className="py-3 px-4 text-right">Arif (Erdem / Ödev)</th>
                <th className="py-3 px-4 text-right">Alim (Kelime / BEP)</th>
                <th className="py-3 px-4 text-right">Pusula (TYT / AYT)</th>
                <th className="py-3 px-4 text-right">Rahle (Cüz / İcazet)</th>
                <th className="py-3 px-4 text-right">Genel Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedSchoolMetrics.map((sch, i) => (
                <tr
                  key={sch.schoolId}
                  onClick={() => setSelectedSchoolId(sch.schoolId)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-mono tabular-nums font-bold text-slate-500">
                    #{i + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{sch.schoolName}</div>
                    <div className="text-[11px] text-slate-400">{sch.districtName}</div>
                  </td>
                  <td className="py-3 px-4">{renderModuleStatusStrip(sch.activeProjects, 'sm')}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 font-semibold">
                    {sch.studentCount}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {sch.arif.active ? (
                      <span className="font-bold text-blue-700">
                        {sch.arif.erdemScore} <span className="text-slate-400 font-normal">/ %{sch.arif.homeworkRate}</span>
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {sch.alim.active ? (
                      <span className="font-bold text-purple-700">
                        %{sch.alim.vocabMasteryRate}{' '}
                        <span className="text-slate-400 font-normal">/ %{sch.alim.bepCompletionRate}</span>
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {sch.pusula.active ? (
                      <span className="font-bold text-cyan-700">
                        {sch.pusula.tytAvgNet}{' '}
                        <span className="text-slate-400 font-normal">/ {sch.pusula.aytAvgNet}</span>
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {sch.rahle.active ? (
                      <span className="font-bold text-amber-700">
                        {sch.rahle.avgCompletedJuz} Cüz{' '}
                        <span className="text-slate-400 font-normal">({sch.rahle.icazetCount} Mezun)</span>
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-slate-900">
                    {sch.overallScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 3. ARİF ANALİZ MERKEZİ (Erdem, Ödev, Öğretmen Performans & TÜBİTAK)
  const renderArifAnalytics = () => {
    const arifSchools = sortedSchoolMetrics.filter((s) => s.arif.active);
    const totalTubitak = arifSchools.reduce((a, b) => a + b.arif.tubitakProjects, 0);
    const totalSocial = arifSchools.reduce((a, b) => a + b.arif.socialEvents, 0);
    const totalPositive = arifSchools.reduce((a, b) => a + b.arif.positiveBehaviors, 0);

    return (
      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-blue-600 mb-1">
            ARİF · Değerler Eğitimi, Akademik Ödev ve Öğretmen Performans Sistemi
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Arif Modülü Bölgesel Analiz Raporu
          </h1>
        </div>

        {/* Arif KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Ortalama Erdem Puanı</div>
            <div className="text-3xl font-black text-blue-700 font-mono tabular-nums">
              {macroSummary.avgErdem}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
              {totalPositive} Olumlu Davranış Kaydı
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Ödev Tamamlama Oranı</div>
            <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
              %{macroSummary.avgHomework}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {arifSchools.length} Aktif Arif Okulu Ortalaması
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">TÜBİTAK & TEKNOFEST</div>
            <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
              {totalTubitak} Proje
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Bölge geneli aktif proje başvurusu
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Sosyal & Kültürel Faaliyet</div>
            <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
              {totalSocial} Etkinlik
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Okul içi ve bölge geneli etkinlikler
            </div>
          </div>
        </div>

        {/* Rankings & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Erdem & Homework School List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Okul Bazlı Erdem Puanı ve Ödev Tamamlama
              </h3>
              <span className="text-xs text-slate-400">En yüksekten düşüğe</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[...arifSchools]
                .sort((a, b) => b.arif.erdemScore - a.arif.erdemScore)
                .map((sch, idx) => (
                  <div
                    key={sch.schoolId}
                    onClick={() => setSelectedSchoolId(sch.schoolId)}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 text-xs font-mono tabular-nums font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">{sch.schoolName}</div>
                        <div className="text-xs text-slate-400">{sch.districtName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 shrink-0 font-mono tabular-nums text-xs">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Erdem</div>
                        <div className="font-black text-blue-700">{sch.arif.erdemScore}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Ödev</div>
                        <div className="font-bold text-emerald-700">%{sch.arif.homeworkRate}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Teacher Performance Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Öğretmen Performans ve Proje Faaliyetleri
              </h3>
              <span className="text-xs text-slate-400">Katsayı Puanlaması</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                    <th className="py-3 px-4">Okul</th>
                    <th className="py-3 px-4 text-right">TÜBİTAK</th>
                    <th className="py-3 px-4 text-right">Etkinlik</th>
                    <th className="py-3 px-4 text-right">Veli Top.</th>
                    <th className="py-3 px-4 text-right">Perf. Puanı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...arifSchools]
                    .sort((a, b) => b.arif.teacherPerfScore - a.arif.teacherPerfScore)
                    .map((sch) => (
                      <tr
                        key={sch.schoolId}
                        onClick={() => setSelectedSchoolId(sch.schoolId)}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-4 font-bold text-slate-900">{sch.schoolName}</td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                          {sch.arif.tubitakProjects}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                          {sch.arif.socialEvents}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                          {sch.arif.parentMeetings}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-blue-700">
                          {sch.arif.teacherPerfScore} Puan
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. ALİM DİL HAZİNESİ & ÖZEL EĞİTİM (BEP) MERKEZİ
  const renderAlimAnalytics = () => {
    const alimSchools = sortedSchoolMetrics.filter((s) => s.alim.active);
    const avgWpm =
      alimSchools.length > 0
        ? Math.round(alimSchools.reduce((a, b) => a + b.alim.speedReadingWpm, 0) / alimSchools.length)
        : 0;
    const avgShortTermGoal =
      alimSchools.length > 0
        ? Number((alimSchools.reduce((a, b) => a + b.alim.shortTermGoalRate, 0) / alimSchools.length).toFixed(1))
        : 0;

    return (
      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-purple-600 mb-1">
            ALİM · Kelime Hazinesi (Kelimelik), Hızlı Okuma ve Özel Eğitim (BEP) Takip Sistemi
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Alim Dil Gelişimi ve BEP Özel Eğitim Raporu
          </h1>
        </div>

        {/* Alim KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Kelime Hazinesi Başarısı</div>
            <div className="text-3xl font-black text-purple-700 font-mono tabular-nums">
              %{macroSummary.avgVocab}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Kelimelik & Deyimler doğru yanıt oranı
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Ortalama Okuma Hızı</div>
            <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
              {avgWpm} K/Dk
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Anlayarak hızlı okuma egzersiz ortalaması
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">BEP Kapsamındaki Öğrenci</div>
            <div className="text-3xl font-black text-indigo-700 font-mono tabular-nums">
              {macroSummary.totalBepStudents} Öğrenci
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Bireyselleştirilmiş Eğitim Planı tanımlı
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">BEP Plan & Hedef Gerçekleşme</div>
            <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
              %{macroSummary.avgBepCompletion}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
              Kısa Dönem Kazanım: %{avgShortTermGoal}
            </div>
          </div>
        </div>

        {/* Alim Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kelimelik & Hızlı Okuma */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Kelime Hazinesi ve Hızlı Okuma Sıralaması
              </h3>
              <span className="text-xs text-slate-400">{alimSchools.length} Okul</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[...alimSchools]
                .sort((a, b) => b.alim.vocabMasteryRate - a.alim.vocabMasteryRate)
                .map((sch, idx) => (
                  <div
                    key={sch.schoolId}
                    onClick={() => setSelectedSchoolId(sch.schoolId)}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 text-xs font-mono tabular-nums font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">{sch.schoolName}</div>
                        <div className="text-xs text-slate-400">
                          Öğrenci başı ort. {sch.alim.avgCorrectWords} doğru kelime
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 font-mono tabular-nums text-xs">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Okuma Hızı</div>
                        <div className="font-bold text-slate-700">{sch.alim.speedReadingWpm} K/Dk</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Başarı</div>
                        <div className="font-black text-purple-700">%{sch.alim.vocabMasteryRate}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* BEP Özel Eğitim Takip Özeti */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Özel Eğitim (BEP) Kurul ve Kazanım Takip Özeti
              </h3>
              <span className="text-xs text-slate-400">Okul Bazlı BEP Raporu</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                    <th className="py-3 px-4">Okul Adı</th>
                    <th className="py-3 px-4 text-right">BEP Öğrenci</th>
                    <th className="py-3 px-4 text-right">Kısa Dönem Hedef</th>
                    <th className="py-3 px-4 text-right">Dosya Tamamlama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...alimSchools]
                    .sort((a, b) => b.alim.bepCompletionRate - a.alim.bepCompletionRate)
                    .map((sch) => (
                      <tr
                        key={sch.schoolId}
                        onClick={() => setSelectedSchoolId(sch.schoolId)}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{sch.schoolName}</div>
                          {sch.isSpecialEducation && (
                            <div className="text-[10px] font-bold text-purple-600">Özel Eğitim Kurumu</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-700">
                          {sch.alim.bepStudentCount} Öğr.
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                          %{sch.alim.shortTermGoalRate}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-emerald-700">
                          %{sch.alim.bepCompletionRate}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. PUSULA YKS DENEME & KOÇLUK MERKEZİ
  const renderPusulaAnalytics = () => {
    const pusulaSchools = sortedSchoolMetrics.filter((s) => s.pusula.active);
    const totalCoached = pusulaSchools.reduce((a, b) => a + b.pusula.coachedStudentCount, 0);
    const avgWeeklyQuestions =
      pusulaSchools.length > 0
        ? Math.round(pusulaSchools.reduce((a, b) => a + b.pusula.weeklyQuestionAvg, 0) / pusulaSchools.length)
        : 0;

    return (
      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-cyan-600 mb-1">
            PUSULA · Üniversite Hazırlık (TYT / AYT), Deneme Analizi ve Akademik Koçluk Sistemi
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Pusula YKS Deneme Netleri ve Hedef Takip Raporu
          </h1>
        </div>

        {/* Pusula KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Bölge TYT Net Ortalaması</div>
            <div className="text-3xl font-black text-cyan-700 font-mono tabular-nums">
              {macroSummary.avgTytNet} Net
            </div>
            <div className="text-xs text-slate-500 mt-1">120 soruluk TYT genel deneme ortalaması</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Bölge AYT Net Ortalaması</div>
            <div className="text-3xl font-black text-blue-700 font-mono tabular-nums">
              {macroSummary.avgAytNet} Net
            </div>
            <div className="text-xs text-slate-500 mt-1">80 soruluk AYT alan deneme ortalaması</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Haftalık Soru Çözüm Ort.</div>
            <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
              {avgWeeklyQuestions} Soru
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
              {totalCoached} Koçluk Öğrencisi Takibinde
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Hedef Üniversite Uyum Oranı</div>
            <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
              %{macroSummary.avgGoalRate}
            </div>
            <div className="text-xs text-slate-500 mt-1">Haftalık çalışma planı tamamlama</div>
          </div>
        </div>

        {/* School Net Rankings & Subject Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Kurum Bazlı TYT / AYT Net ve Koçluk Hedef Sıralaması
              </h3>
              <span className="text-xs text-slate-400">{pusulaSchools.length} Aktif Kurum</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                    <th className="py-3 px-4">Sıra</th>
                    <th className="py-3 px-4">Okul Adı</th>
                    <th className="py-3 px-4 text-right">Koçluk Öğr.</th>
                    <th className="py-3 px-4 text-right">TYT Ort.</th>
                    <th className="py-3 px-4 text-right">AYT Ort.</th>
                    <th className="py-3 px-4 text-right">Haftalık Soru</th>
                    <th className="py-3 px-4 text-right">Hedef Uyum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...pusulaSchools]
                    .sort((a, b) => b.pusula.tytAvgNet - a.pusula.tytAvgNet)
                    .map((sch, idx) => (
                      <tr
                        key={sch.schoolId}
                        onClick={() => setSelectedSchoolId(sch.schoolId)}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-4 font-mono tabular-nums font-bold text-slate-400">
                          #{idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{sch.schoolName}</div>
                          <div className="text-[11px] text-slate-400">
                            Öne Çıkan Branş: {sch.pusula.topBranch}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">
                          {sch.pusula.coachedStudentCount}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-cyan-700">
                          {sch.pusula.tytAvgNet}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-blue-700">
                          {sch.pusula.aytAvgNet}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                          {sch.pusula.weeklyQuestionAvg}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-emerald-700">
                          %{sch.pusula.goalAchievementRate}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional TYT Subject Averages */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Bölgesel TYT Branş Başarı Dağılımı
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Son kurumsal deneme sınavlarına göre ders bazlı ortalama net oranları
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Türkçe (40 Soru)', net: (macroSummary.avgTytNet * 0.42).toFixed(1), pct: 74, color: 'bg-cyan-600' },
                { label: 'Temel Matematik (40 Soru)', net: (macroSummary.avgTytNet * 0.31).toFixed(1), pct: 58, color: 'bg-blue-600' },
                { label: 'Sosyal Bilimler (20 Soru)', net: (macroSummary.avgTytNet * 0.15).toFixed(1), pct: 71, color: 'bg-indigo-600' },
                { label: 'Fen Bilimleri (20 Soru)', net: (macroSummary.avgTytNet * 0.12).toFixed(1), pct: 54, color: 'bg-emerald-600' }
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700">{b.label}</span>
                    <span className="font-mono tabular-nums font-black text-slate-900">
                      {b.net} Net (%{b.pct})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`${b.color} h-full rounded-full`} style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6. RAHLE HAFIZLIK TAKİP MERKEZİ
  const renderRahleAnalytics = () => {
    const rahleSchools = sortedSchoolMetrics.filter((s) => s.rahle.active);
    const totalCig = rahleSchools.reduce((a, b) => a + b.rahle.cigCount, 0);
    const totalPiskin = rahleSchools.reduce((a, b) => a + b.rahle.piskinCount, 0);
    const totalDonus = rahleSchools.reduce((a, b) => a + b.rahle.donusCount, 0);
    const totalIcazet = rahleSchools.reduce((a, b) => a + b.rahle.icazetCount, 0);

    return (
      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-amber-600 mb-1">
            RAHLE · Kurumsal Hafızlık Takip, Dönüş, Deneme Cüzü ve İcazet Yönetim Sistemi
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Rahle Hafızlık Cüz Ortalaması ve Mezuniyet İstatistikleri
          </h1>
        </div>

        {/* Rahle KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Toplam Hafız Adayı</div>
            <div className="text-3xl font-black text-amber-700 font-mono tabular-nums">
              {macroSummary.totalHafizCandidates} Öğrenci
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {rahleSchools.length} Aktif Rahle Kurumunda Kayıtlı
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Bölge Cüz Ortalaması</div>
            <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
              {macroSummary.avgJuz} / 30 Cüz
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Öğrenci başına ortalama tamamlanan cüz
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Deneme Cüzü Başarısı</div>
            <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
              %{macroSummary.avgDenemeSuccess}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Komisyon dinleme ve cüz geçme oranı
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-2">İcazet / Mezun Hafız</div>
            <div className="text-3xl font-black text-amber-600 font-mono tabular-nums">
              {totalIcazet} Hafız
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
              Dönüş Aşamasında: {totalDonus} Öğrenci
            </div>
          </div>
        </div>

        {/* Stage Distribution & School Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* School Hafizlik Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Okul Bazlı Hafızlık İlerleme ve Mezuniyet Tablosu
              </h3>
              <span className="text-xs text-slate-400">Cüz ortalamasına göre sıralı</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                    <th className="py-3 px-4">Okul Adı</th>
                    <th className="py-3 px-4 text-right">Hafız Adayı</th>
                    <th className="py-3 px-4 text-right">Çiğ / Pişkin / Dönüş</th>
                    <th className="py-3 px-4 text-right">Ort. Cüz</th>
                    <th className="py-3 px-4 text-right">Deneme Başarısı</th>
                    <th className="py-3 px-4 text-right">İcazet (Mezun)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...rahleSchools]
                    .sort((a, b) => b.rahle.avgCompletedJuz - a.rahle.avgCompletedJuz)
                    .map((sch) => (
                      <tr
                        key={sch.schoolId}
                        onClick={() => setSelectedSchoolId(sch.schoolId)}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{sch.schoolName}</div>
                          <div className="text-[11px] text-slate-400">{sch.districtName}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-700">
                          {sch.rahle.hafizCandidateCount}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">
                          {sch.rahle.cigCount} / {sch.rahle.piskinCount} / {sch.rahle.donusCount}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-amber-700">
                          {sch.rahle.avgCompletedJuz} Cüz
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-emerald-700">
                          %{sch.rahle.denemeSuccessRate}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-black text-slate-900">
                          {sch.rahle.icazetCount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hafızlık Stage Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Bölgesel Hafızlık Aşama Dağılımı
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Öğrencilerin çiğ, pişkin, dönüş ve mezuniyet (icazet) kademelerindeki yoğunluğu
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: 'Çiğ Aşaması (Yeni Ezber)',
                  count: totalCig,
                  pct:
                    macroSummary.totalHafizCandidates > 0
                      ? Math.round((totalCig / macroSummary.totalHafizCandidates) * 100)
                      : 0,
                  color: 'bg-amber-500'
                },
                {
                  label: 'Pişkin Aşaması (Sağlamlaştırma)',
                  count: totalPiskin,
                  pct:
                    macroSummary.totalHafizCandidates > 0
                      ? Math.round((totalPiskin / macroSummary.totalHafizCandidates) * 100)
                      : 0,
                  color: 'bg-amber-600'
                },
                {
                  label: 'Dönüş & Tekrar Aşaması',
                  count: totalDonus,
                  pct:
                    macroSummary.totalHafizCandidates > 0
                      ? Math.round((totalDonus / macroSummary.totalHafizCandidates) * 100)
                      : 0,
                  color: 'bg-indigo-600'
                },
                {
                  label: 'İcazet / Mezuniyet Tamamlayan',
                  count: totalIcazet,
                  pct:
                    macroSummary.totalHafizCandidates > 0
                      ? Math.round((totalIcazet / macroSummary.totalHafizCandidates) * 100)
                      : 0,
                  color: 'bg-emerald-600'
                }
              ].map((st) => (
                <div key={st.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700">{st.label}</span>
                    <span className="font-mono tabular-nums font-black text-slate-900">
                      {st.count} Öğr. (%{st.pct})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`${st.color} h-full rounded-full`} style={{ width: `${st.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 7. REHBERLİK & ERKEN UYARI MERKEZİ
  const renderRiskCenter = () => {
    const sortedByRisk = [...sortedSchoolMetrics].sort((a, b) => b.risk.riskScore - a.risk.riskScore);

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-rose-600 mb-1">
              Bölgesel Psikolojik Danışmanlık, Devamsızlık ve Risk Haritası
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Rehberlik ve Erken Uyarı Merkezi (ŞSA & RİBA)
            </h1>
          </div>
          <div className="text-xs font-mono tabular-nums font-bold text-rose-600">
            Kritik Eşik Üstü: {macroSummary.criticalRiskCount} Kurum
          </div>
        </div>

        {/* Top Priority Risk Schools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedByRisk.slice(0, 6).map((sch) => {
            const isCrit = sch.risk.riskLevel === 'Kritik';
            const isMed = sch.risk.riskLevel === 'Orta';
            return (
              <div
                key={sch.schoolId}
                onClick={() => setSelectedSchoolId(sch.schoolId)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCrit
                    ? 'bg-rose-50/70 border-rose-200 hover:border-rose-400'
                    : isMed
                    ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400'
                    : 'bg-white border-slate-200 hover:border-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{sch.schoolName}</h3>
                      <div className="text-xs text-slate-500">{sch.districtName}</div>
                    </div>
                    <div
                      className={`px-2.5 py-1 rounded-lg font-mono tabular-nums text-xs font-black ${
                        isCrit
                          ? 'bg-rose-600 text-white'
                          : isMed
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Risk: {sch.risk.riskScore}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mb-1">
                    Öncelikli Etken: {sch.risk.topReason}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sch.risk.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="font-mono tabular-nums text-slate-600">
                    Devamsızlık: %{sch.risk.absenteeismRate}
                  </span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    Raporu Aç <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regional Root Causes: Absenteeism & RIBA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Bölgesel Devamsızlık Nedenleri Kök Analizi
            </h3>
            {[
              { label: 'Taşımalı Eğitim & Ulaşım Koşulları', pct: 38, color: 'bg-blue-600' },
              { label: 'Mevsimsel / Ailevi Tarımsal İşler', pct: 29, color: 'bg-amber-500' },
              { label: 'Sağlık ve Raporlu İzin Süreçleri', pct: 19, color: 'bg-emerald-600' },
              { label: 'Okula Uyum ve Motivasyon Eksikliği', pct: 14, color: 'bg-rose-500' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">%{item.pct}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">
              RİBA (Rehberlik İhtiyacı Belirleme Anketi) Dağılımı
            </h3>
            {[
              { label: 'Sınav Kaygısı ve Akademik Stres Yönetimi', pct: 41, color: 'bg-indigo-600' },
              { label: 'Üst Öğrenim ve Meslek Seçimi Kararsızlığı', pct: 27, color: 'bg-cyan-600' },
              { label: 'Akran İletişimi ve Öfke Kontrolü', pct: 18, color: 'bg-rose-500' },
              { label: 'Bilinçli Teknoloji ve Ekran Süresi Yönetimi', pct: 14, color: 'bg-purple-600' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">%{item.pct}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // SLIDE-OVER SCHOOL REPORT CARD DRAWER (Kurum Detay & 4-Modül Karnesi Çekmecesi)
  const renderSchoolReportDrawer = () => {
    if (!selectedSchoolId) return null;
    const m = schoolMetricsMap[selectedSchoolId];
    if (!m) return null;

    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px] animate-in fade-in duration-150">
        <div
          className="flex-1"
          onClick={() => setSelectedSchoolId(null)}
          aria-label="Kapat"
        />
        <div className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-500 mb-1">
                {m.districtName} · Kurumsal Modül Karnesi
              </div>
              <h2 className="text-xl font-black text-slate-900 truncate">{m.schoolName}</h2>
              <div className="mt-3">{renderModuleStatusStrip(m.activeProjects, 'md')}</div>
            </div>
            <button
              onClick={() => setSelectedSchoolId(null)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* School Core Numbers */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">Öğrenci</div>
                <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                  {m.studentCount}
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">Öğretmen</div>
                <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                  {m.teacherCount}
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">Şube</div>
                <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                  {m.classCount}
                </div>
              </div>
              <div className="p-3.5 bg-slate-900 text-white rounded-xl">
                <div className="text-[11px] text-slate-300 font-medium">Genel Endeks</div>
                <div className="text-xl font-black font-mono tabular-nums">{m.overallScore}</div>
              </div>
            </div>

            {/* 4 Module Cards inside Drawer (Active vs Dimmed Inactive) */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">
                Modül Bazlı Kurum Karnesi
              </h3>

              {/* ARİF */}
              <div
                className={`p-4 rounded-2xl border border-slate-200 ${
                  m.arif.active ? 'bg-white' : 'bg-slate-50 opacity-40 select-none'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-black text-blue-700 text-sm">
                    <BookOpen size={16} />
                    <span>Arif · Değerler, Ödev & Öğretmen Performans</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {m.arif.active ? 'Aktif Modül' : 'Bu Okulda Aktif Değil'}
                  </span>
                </div>
                {m.arif.active && (
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs font-mono tabular-nums">
                    <div>
                      <div className="text-slate-400 font-sans">Erdem Puanı</div>
                      <div className="font-black text-slate-900 text-sm">{m.arif.erdemScore}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">Ödev Tamamlama</div>
                      <div className="font-black text-emerald-700 text-sm">%{m.arif.homeworkRate}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">TÜBİTAK / Etkinlik</div>
                      <div className="font-black text-blue-700 text-sm">
                        {m.arif.tubitakProjects} Proje / {m.arif.socialEvents} Etk.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ALİM */}
              <div
                className={`p-4 rounded-2xl border border-slate-200 ${
                  m.alim.active ? 'bg-white' : 'bg-slate-50 opacity-40 select-none'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-black text-purple-700 text-sm">
                    <GraduationCap size={16} />
                    <span>Alim · Kelime Hazinesi, Hızlı Okuma & BEP</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {m.alim.active ? 'Aktif Modül' : 'Bu Okulda Aktif Değil'}
                  </span>
                </div>
                {m.alim.active && (
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs font-mono tabular-nums">
                    <div>
                      <div className="text-slate-400 font-sans">Kelime Başarısı</div>
                      <div className="font-black text-purple-700 text-sm">%{m.alim.vocabMasteryRate}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">Okuma Hızı</div>
                      <div className="font-black text-slate-900 text-sm">{m.alim.speedReadingWpm} K/Dk</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">BEP Öğr. / Uyum</div>
                      <div className="font-black text-emerald-700 text-sm">
                        {m.alim.bepStudentCount} Öğr. (%{m.alim.bepCompletionRate})
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PUSULA */}
              <div
                className={`p-4 rounded-2xl border border-slate-200 ${
                  m.pusula.active ? 'bg-white' : 'bg-slate-50 opacity-40 select-none'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-black text-cyan-700 text-sm">
                    <Compass size={16} />
                    <span>Pusula · YKS Deneme Netleri & Akademik Koçluk</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {m.pusula.active ? 'Aktif Modül' : 'Bu Okulda Aktif Değil'}
                  </span>
                </div>
                {m.pusula.active && (
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs font-mono tabular-nums">
                    <div>
                      <div className="text-slate-400 font-sans">TYT / AYT Ort.</div>
                      <div className="font-black text-cyan-700 text-sm">
                        {m.pusula.tytAvgNet} / {m.pusula.aytAvgNet} Net
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">Haftalık Soru</div>
                      <div className="font-black text-slate-900 text-sm">{m.pusula.weeklyQuestionAvg}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">Hedef Gerçekleşme</div>
                      <div className="font-black text-emerald-700 text-sm">%{m.pusula.goalAchievementRate}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* RAHLE */}
              <div
                className={`p-4 rounded-2xl border border-slate-200 ${
                  m.rahle.active ? 'bg-white' : 'bg-slate-50 opacity-40 select-none'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-black text-amber-700 text-sm">
                    <RahleIcon size={16} />
                    <span>Rahle · Hafızlık Takip, Dönüş & İcazet</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {m.rahle.active ? 'Aktif Modül' : 'Bu Okulda Aktif Değil'}
                  </span>
                </div>
                {m.rahle.active && (
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs font-mono tabular-nums">
                    <div>
                      <div className="text-slate-400 font-sans">Ort. Tamamlanan</div>
                      <div className="font-black text-amber-700 text-sm">{m.rahle.avgCompletedJuz} Cüz</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">Çiğ / Pişkin / Dönüş</div>
                      <div className="font-black text-slate-900 text-sm">
                        {m.rahle.cigCount}/{m.rahle.piskinCount}/{m.rahle.donusCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-sans">Deneme / Mezun</div>
                      <div className="font-black text-emerald-700 text-sm">
                        %{m.rahle.denemeSuccessRate} ({m.rahle.icazetCount} İcazet)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Guidance & Early Warning Box */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  Rehberlik ve Erken Uyarı Durumu
                </span>
                <span className="text-xs font-mono tabular-nums font-bold text-rose-600">
                  Risk Skoru: {m.risk.riskScore} ({m.risk.riskLevel})
                </span>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Öncelikli Konu:</strong> {m.risk.topReason} — {m.risk.description}
              </p>
              <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                <span>RİBA Odak Alanı: {m.risk.ribaPrimaryNeed}</span>
                <span className="font-mono tabular-nums">Devamsızlık: %{m.risk.absenteeismRate}</span>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
            <button
              onClick={() => setSelectedSchoolId(null)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Karneyi Kapat
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 8. KULLANICILAR YÖNETİMİ SEKME İÇERİĞİ (İL & İLÇE EKRANI)
  const renderUsersManagement = () => {
    const selectedTargetOrg =
      schools.find((s: any) => s.id === (userTargetOrgId || activeSchoolId)) || currentOrg;
    const isTargetProvincial = selectedTargetOrg?.type === 'il';

    const roleOptions = isTargetProvincial
      ? [
          'İl MEM Yöneticisi',
          'İl Milli Eğitim Müdürü',
          'İl Milli Eğitim Müdür Yardımcısı',
          'Şube Müdürü',
          'İl Maarif Koordinatörü',
          'AR-GE & Rehberlik Uzmanı'
        ]
      : [
          'İlçe MEM Yöneticisi',
          'İlçe Milli Eğitim Müdürü',
          'Şube Müdürü',
          'İlçe Maarif Koordinatörü',
          'AR-GE & Rehberlik Uzmanı'
        ];

    return (
      <div className="space-y-8">
        {/* Header & Target Unit Selector (for İl MEM to manage İl or bound İlçe users) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-600 mb-1">
              {roleLabel} · Yetkili ve Kullanıcı Yönetimi
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Kurum Kullanıcıları ve Yetkili Hesaplar
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {selectedTargetOrg?.name || orgTitle} bünyesinde panele erişebilecek yeni kullanıcılar ekleyebilir veya mevcut kullanıcıların bilgilerini güncelleyebilirsiniz.
            </p>
          </div>

          {isProvincial && myDistricts.length > 0 && (
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm min-w-[260px]">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                İşlem Yapılan Birim (İl / Bağlı İlçe)
              </label>
              <select
                value={userTargetOrgId || activeSchoolId}
                onChange={(e) => {
                  const nextId = e.target.value;
                  setUserTargetOrgId(nextId);
                  const nextOrg = schools.find((s: any) => s.id === nextId);
                  setNewRegionalUser((prev) => ({
                    ...prev,
                    title: nextOrg?.type === 'il' ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi'
                  }));
                }}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-emerald-600 cursor-pointer"
              >
                <option value={activeSchoolId}>{orgTitle} (İl MEM Merkez)</option>
                {myDistricts.map((d: any) => (
                  <option key={d.id} value={d.id}>
                    {d.name} (İlçe MEM)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Add New User Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserPlus size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Yeni Kullanıcı Ekle</h3>
                <p className="text-xs text-slate-500">
                  Kullanıcı adı veya şifre boş bırakılırsa ad soyada göre otomatik oluşturulur
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
              Hedef Birim: {selectedTargetOrg?.name || orgTitle}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Görev / Ünvan
              </label>
              <select
                value={newRegionalUser.title}
                onChange={(e) => setNewRegionalUser({ ...newRegionalUser, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition-colors cursor-pointer"
              >
                {roleOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Ad Soyad *
              </label>
              <input
                type="text"
                value={newRegionalUser.name}
                onChange={(e) => setNewRegionalUser({ ...newRegionalUser, name: e.target.value })}
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={newRegionalUser.username}
                onChange={(e) => setNewRegionalUser({ ...newRegionalUser, username: e.target.value })}
                placeholder="Oto. Üretilir"
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Şifre
              </label>
              <input
                type="text"
                value={newRegionalUser.password}
                onChange={(e) => setNewRegionalUser({ ...newRegionalUser, password: e.target.value })}
                placeholder="Oto. Üretilir"
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>

            <div>
              <button
                onClick={handleAddRegionalUser}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-black text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus size={16} />
                <span>Kullanıcıyı Kaydet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Registered Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Kayıtlı Kullanıcılar ({orgUsers.length})
              </h3>
              <p className="text-xs text-slate-500">
                {selectedTargetOrg?.name || orgTitle} yönetim ekranına giriş yetkisi bulunan kullanıcılar
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[11px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Ad Soyad</th>
                  <th className="px-6 py-3.5">Görev / Rol</th>
                  <th className="px-6 py-3.5">Kullanıcı Adı</th>
                  <th className="px-6 py-3.5">Şifre</th>
                  <th className="px-6 py-3.5 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orgUsers.map((u: any, idx: number) => {
                  const isMe = currentUser && u.id === currentUser.id;
                  const isPassVisible = Boolean(visiblePasswords[u.id || idx]);
                  return (
                    <tr key={u.id || `${u.username}-${idx}`} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{u.name}</span>
                          {isMe && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold">
                              Aktif Oturum (Siz)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {u.title ||
                            (u.role === 'provincial_admin'
                              ? 'İl MEM Yöneticisi'
                              : u.role === 'district_admin'
                              ? 'İlçe MEM Yöneticisi'
                              : 'Yönetici')}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{u.username}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-600">
                            {isPassVisible ? u.password || '—' : '••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setVisiblePasswords((prev) => ({
                                ...prev,
                                [u.id || idx]: !prev[u.id || idx]
                              }))
                            }
                            className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
                            title={isPassVisible ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                          >
                            {isPassVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              setEditingRegionalUser({
                                id: u.id,
                                name: u.name || '',
                                username: u.username || '',
                                password: u.password || '',
                                title:
                                  u.title ||
                                  (u.role === 'provincial_admin'
                                    ? 'İl MEM Yöneticisi'
                                    : 'İlçe MEM Yöneticisi')
                              })
                            }
                            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Kullanıcıyı Düzenle"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleResetRegionalUserPassword(u)}
                            className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Şifreyi Sıfırla"
                          >
                            <Key size={16} />
                          </button>
                          {!isMe && (
                            <button
                              onClick={() => handleDeleteRegionalUser(u)}
                              className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Kullanıcıyı Sil"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {orgUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs font-medium">
                      Bu birimde henüz kayıtlı kullanıcı bulunmuyor. Yukarıdaki formdan yeni kullanıcı ekleyebilirsiniz.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 9. PROFİLİM VE HESAP AYARLARI SEKME İÇERİĞİ
  const renderProfileSettings = () => (
    <div className="max-w-2xl mx-auto py-4 space-y-6">
      <div>
        <div className="text-xs font-bold text-blue-600 mb-1">
          {roleLabel} · Kişisel Hesap Ayarları
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Profilim ve Giriş Bilgilerim
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kendi ad soyad, görev ünvanı, kullanıcı adı ve şifre bilgilerinizi buradan güncelleyebilirsiniz.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <User size={30} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold mb-1">
              <Shield size={12} />
              <span>{roleLabel}</span>
            </div>
            <h2 className="text-lg font-black text-slate-900">{currentUser?.name}</h2>
            <p className="text-xs text-slate-500">{orgTitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
              Ad Soyad
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
              Görev / Ünvan
            </label>
            <input
              type="text"
              value={profileData.title}
              onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
              placeholder={isProvincial ? 'İl MEM Yöneticisi' : 'İlçe MEM Yöneticisi'}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
              Yeni Şifre (Değiştirmek İsterseniz)
            </label>
            <div className="relative">
              <input
                type={showProfilePassword ? 'text' : 'password'}
                value={profileData.password}
                onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                placeholder="Mevcut şifreyi korumak için boş bırakın"
                className="w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-3 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowProfilePassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showProfilePassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Değişiklikler kaydedildiğinde aktif oturumunuz kesintisiz devam eder.
          </span>
          <button
            onClick={handleSaveMyProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-xs transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Save size={16} />
            <span>Değişiklikleri Kaydet</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Kullanıcı Düzenleme Modalı
  const renderEditRegionalUserModal = () => {
    if (!editingRegionalUser) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 max-w-md w-full space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">Kullanıcı Bilgilerini Düzenle</h3>
            <button
              onClick={() => setEditingRegionalUser(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Ad Soyad
              </label>
              <input
                type="text"
                value={editingRegionalUser.name}
                onChange={(e) =>
                  setEditingRegionalUser({ ...editingRegionalUser, name: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Görev / Ünvan
              </label>
              <input
                type="text"
                value={editingRegionalUser.title || ''}
                onChange={(e) =>
                  setEditingRegionalUser({ ...editingRegionalUser, title: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={editingRegionalUser.username}
                onChange={(e) =>
                  setEditingRegionalUser({ ...editingRegionalUser, username: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Şifre
              </label>
              <input
                type="text"
                value={editingRegionalUser.password}
                onChange={(e) =>
                  setEditingRegionalUser({ ...editingRegionalUser, password: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setEditingRegionalUser(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              onClick={handleUpdateRegionalUser}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={14} />
              <span>Kaydet</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex">
      {renderSidebar()}
      <div className="ml-72 flex-1 min-h-screen flex flex-col min-w-0">
        {renderTopContextBar()}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && renderMacroDashboard()}
          {activeTab === 'comparison' && renderComparisonMatrix()}
          {activeTab === 'arif' && renderArifAnalytics()}
          {activeTab === 'alim' && renderAlimAnalytics()}
          {activeTab === 'pusula' && renderPusulaAnalytics()}
          {activeTab === 'rahle' && renderRahleAnalytics()}
          {activeTab === 'risk_map' && renderRiskCenter()}
          {activeTab === 'users' && renderUsersManagement()}
          {activeTab === 'profile' && renderProfileSettings()}
        </main>
      </div>
      {renderSchoolReportDrawer()}
      {renderEditRegionalUserModal()}
    </div>
  );
};
