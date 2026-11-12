import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Users, UserPlus, Shield, GraduationCap, Edit2, Trash2, Key, Upload, FileText, CheckCircle, X, Save, LayoutGrid, Layers, Trophy, Smile, ClipboardList, MessageSquare, Activity, ArrowLeft, Plus, AlertCircle, AlertTriangle, Award, Star, ChevronUp, ChevronDown, Zap, RefreshCw, Calendar, Lightbulb, Globe, Share2, GripVertical, Search, Lock, UserCheck, UserMinus, FolderPlus } from 'lucide-react';
import { formatClassLabel, inferStudentGender } from '../lib/utils';
import { INITIAL_FORM_CONFIGS } from '../lib/constants';

import { AuditLogsPanel } from './AuditLogsPanel';
import { AdminIdeasPanel } from './AdminIdeasPanel';
import { AdminTarifPanel } from './AdminTarifPanel';
import { Sparkles } from 'lucide-react';
import { AdminGenelKulturTestEditor } from './AdminGenelKulturTestEditor';
import { AdminSharePanel } from './AdminSharePanel';
import { AdminMitPanel } from './mit/AdminMitPanel';
import { AcademicYearManager } from './AcademicYearManager';
import { RahleAdminModules } from './rahle/RahleAdminModules';
import { PusulaAdminClassManager } from './pusula/PusulaAdminClassManager';

export const AdminPanel = ({ state, actions }: any) => {
  const { users, classes, classAdvisors = {}, rahleClasses = {}, rahleClassGenders = {}, rahleOnlyStudents = [], adminTab, newUser, editUser, excelFile, excelPreview, activeSchoolId, categories, tasks, successDescriptions, remedialTasks, remedialProblems, uncompletedReasons, devCardConfig, tickets, teacherPerfConfig, behaviorConfig, ideas, activeProject } = state;
  const {
    setAdminTab, setNewUser, handleAddUser, setEditUser, handleUpdateUser, handleDeleteUser, handleResetPassword,
    handleExcelUpload, handleImportExcel, setExcelFile, setExcelPreview, setActiveTab,
    handleAddClass, handleDeleteClass, handleReorderClasses, handleRenameClass, handleUpdateClassAdvisor,
    handleToggleStudentHafizlik, isStudentHafizlik, isStudentRahleOnly, getStudentSchoolClass, getStudentRahleClass,
    getStudentGender, getStudentAttendanceStatus, getCurrentUserHafizlikGenderFilter, getRahleClassGender, getKuranKursuAdminType, handleUpdateStudentGender, handleUpdateStudentAttendanceStatus,
    getAllHafizlikPoolStudents, getRahleFilteredClasses,
    handleAddRahleClass, handleUpdateRahleClassGender, handleReorderRahleClasses, handleRenameRahleClass, handleDeleteRahleClass,
    handleAssignStudentsToRahleClass, handleRemoveStudentFromRahleClass, handleAddRahleOnlyStudents,
    handleAddCategory, handleDeleteCategory, handleAddTask, handleDeleteTask, handleBulkAddStudents,
    handleUpdateSuccessDescription, handleUpdateRemedialTask, handleUpdateRemedialProblem, handleUpdateUncompletedReason,
    handleUpdateCategory, handleUpdateTask, handleUpdateDevCardConfig, handleUpdateBehaviorConfig, markIdeaRead, deleteIdea,
    handleUpdateTeacherBranch
  } = actions;

  const [selectedAdminClass, setSelectedAdminClass] = useState<string | null>(null);
  const [selectedRahleAdminView, setSelectedRahleAdminView] = useState<string>('Hafızlık Havuzu');
  const [newClassName, setNewClassName] = useState('');
  const [newRahleClassName, setNewRahleClassName] = useState('');
  const [newRahleClassGender, setNewRahleClassGender] = useState<'K' | 'E' | ''>('');
  const [draggedClass, setDraggedClass] = useState<string | null>(null);
  const [dragOverClass, setDragOverClass] = useState<string | null>(null);
  const [isRenamingClass, setIsRenamingClass] = useState(false);
  const [renameClassInput, setRenameClassInput] = useState('');
  const [rahlePoolSearch, setRahlePoolSearch] = useState('');
  const [rahlePoolFilter, setRahlePoolFilter] = useState<'all' | 'assigned' | 'unassigned' | 'rahle_only' | 'multi_module'>('all');
  const [selectedPoolStudents, setSelectedPoolStudents] = useState<string[]>([]);
  const [targetBulkRahleClass, setTargetBulkRahleClass] = useState<string>('');
  const [newRahleSingleStudent, setNewRahleSingleStudent] = useState({ no: '', name: '', gender: '', username: '', password: '' });
  const [rahleBulkNewStudentInput, setRahleBulkNewStudentInput] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newTask, setNewTask] = useState({ title: '', category: '', points: 10 });
  const [bulkStudentInput, setBulkStudentInput] = useState('');
  const [editingField, setEditingField] = useState<{ type: 'success' | 'remedial' | 'problem' | 'uncompleted' | 'category' | 'task', level?: number, id?: string | number, category?: string } | null>(null);
  const [behaviorSubTab, setBehaviorSubTab] = useState<'cards' | 'forms'>('cards');

  const schoolUsers = users;

  const activeIdeasCount = ideas?.filter((i:any) => i.status === 'new').length || 0;

  const currentSchool = state.schools?.find((s: any) => s.id === activeSchoolId);
  const isSpecialEducation = currentSchool?.isSpecialEducation || false;
  const isRahle = activeProject === 'rahle';
  const isAlim = activeProject === 'alim';
  const isPusula = activeProject === 'pusula';

  const SCHOOL_LEVEL_LABELS: Record<string, string> = {
    ilkokul: 'İlkokul',
    ortaokul: 'Ortaokul / İHO',
    lise: 'Lise / Anadolu / İHL',
    ozel_egitim: 'Özel Eğitim',
    diger: 'Diğer'
  };

  const ADMIN_SUB_ROLE_OPTIONS = [
    'Yönetici',
    "Erkek Kur'an Kursu Yöneticisi",
    "Kız Kur'an Kursu Yöneticisi"
  ];

  const SCHOOL_LEVEL_BRANCHES: Record<string, string[]> = {
    ilkokul: [
      'Sınıf Öğretmenliği',
      'İngilizce',
      'Din Kültürü ve Ahlak Bilgisi',
      'Rehberlik ve Psikolojik Danışmanlık',
      'Özel Eğitim',
      'Okul Öncesi Öğretmenliği',
      'Beden Eğitimi',
      'Görsel Sanatlar',
      'Müzik',
      'Bilişim Teknolojileri'
    ],
    ortaokul: [
      'Türkçe',
      'İlköğretim Matematik',
      'Fen Bilimleri',
      'Sosyal Bilgiler',
      'T.C. İnkılap Tarihi ve Atatürkçülük',
      'İngilizce',
      'Din Kültürü ve Ahlak Bilgisi',
      'İHO / İHL Meslek Dersleri',
      'Arapça',
      'Kur\'an-ı Kerim / Hafızlık Öğreticisi',
      'Rehberlik ve Psikolojik Danışmanlık',
      'Bilişim Teknolojileri ve Yazılım',
      'Görsel Sanatlar',
      'Müzik',
      'Beden Eğitimi ve Spor',
      'Teknoloji ve Tasarım',
      'Özel Eğitim'
    ],
    lise: [
      'Türk Dili ve Edebiyatı',
      'Matematik',
      'Fizik',
      'Kimya',
      'Biyoloji',
      'Tarih',
      'Coğrafya',
      'Felsefe Grubu',
      'İngilizce',
      'Almanca / Yabancı Dil',
      'Din Kültürü ve Ahlak Bilgisi',
      'İHL Meslek Dersleri',
      'Arapça',
      'Rehberlik ve Psikolojik Danışmanlık',
      'Bilişim Teknolojileri',
      'Beden Eğitimi ve Spor',
      'Görsel Sanatlar',
      'Müzik',
      'Meslek Dersleri (Mesleki ve Teknik)',
      'Özel Eğitim'
    ],
    ozel_egitim: [
      'Özel Eğitim Öğretmenliği',
      'Zihinsel Engelliler Sınıf Öğretmenliği',
      'Görme / İşitme Engelliler Öğretmenliği',
      'Rehberlik ve Psikolojik Danışmanlık',
      'Dil ve Konuşma Terapisi',
      'El Sanatları / İş ve Teknik Atölye',
      'Beden Eğitimi',
      'Görsel Sanatlar',
      'Müzik'
    ],
    diger: [
      "Erkek Kur'an Kursu Öğreticisi",
      "Kız Kur'an Kursu Öğreticisi"
    ]
  };

  const resolveStudentGender = (studentName: string, studentUserObj?: any): 'K' | 'E' => {
    if (getStudentGender) return getStudentGender(studentName, studentUserObj);
    const g = String(studentUserObj?.gender || '').toUpperCase();
    if (g === 'K' || g === 'E') return g as 'K' | 'E';
    return inferStudentGender(studentName);
  };

  const resolveRahleClassGender = (rCls: string): 'K' | 'E' | null => {
    if (!rCls || rCls === 'Hafızlık Havuzu') return null;
    if (getRahleClassGender) return getRahleClassGender(rCls);
    const direct = String(rahleClassGenders?.[rCls] || '').toUpperCase();
    if (direct === 'K' || direct === 'E') return direct as 'K' | 'E';
    return null;
  };

  const activeGenderFilter: 'K' | 'E' | null = getCurrentUserHafizlikGenderFilter ? getCurrentUserHafizlikGenderFilter() : null;
  const kuranKursuAdminType: 'E' | 'K' | null = state.kuranKursuAdminType ?? (getKuranKursuAdminType ? getKuranKursuAdminType() : null);
  const forcedKuranKursuTeacherBranch = kuranKursuAdminType === 'E'
    ? "Erkek Kur'an Kursu Öğreticisi"
    : kuranKursuAdminType === 'K'
    ? "Kız Kur'an Kursu Öğreticisi"
    : null;
  const forcedKuranKursuAdminRole = kuranKursuAdminType === 'E'
    ? "Erkek Kur'an Kursu Yöneticisi"
    : kuranKursuAdminType === 'K'
    ? "Kız Kur'an Kursu Yöneticisi"
    : null;

  const staffGenderFilter: 'E' | 'K' | null = kuranKursuAdminType || activeGenderFilter;
  const canKuranKursuAdminSeeUser = (u: any): boolean => {
    if (!u || u.role === 'student' || u.role === 'öğrenci') return false;
    if (!staffGenderFilter) return true;
    const br = String(u.branch || '').trim();
    const sub = String(u.adminSubRole || '').trim();
    const combined = `${br} ${sub}`.toLocaleLowerCase('tr-TR');
    if (staffGenderFilter === 'E') {
      return (
        br === "Erkek Kur'an Kursu Öğreticisi" ||
        br === "Erkek Kur'an Kursu Yöneticisi" ||
        sub === "Erkek Kur'an Kursu Yöneticisi" ||
        combined.includes("erkek kur'an kursu öğreticisi") ||
        combined.includes("erkek kur'an kursu yöneticisi")
      );
    }
    if (staffGenderFilter === 'K') {
      return (
        br === "Kız Kur'an Kursu Öğreticisi" ||
        br === "Kız Kur'an Kursu Yöneticisi" ||
        sub === "Kız Kur'an Kursu Yöneticisi" ||
        combined.includes("kız kur'an kursu öğreticisi") ||
        combined.includes("kız kur'an kursu yöneticisi")
      );
    }
    return true;
  };

  const visibleStaffUsers = (schoolUsers || []).filter((u: any) => u.role !== 'student' && u.role !== 'öğrenci' && canKuranKursuAdminSeeUser(u));

  const detectedSchoolLevel = (() => {
    if (currentSchool?.schoolLevel && SCHOOL_LEVEL_BRANCHES[currentSchool.schoolLevel]) {
      return currentSchool.schoolLevel;
    }
    if (isSpecialEducation) return 'ozel_egitim';
    const sName = (currentSchool?.name || '').toLocaleLowerCase('tr-TR');
    if (sName.includes('ilkokul')) return 'ilkokul';
    if (sName.includes('lise') || sName.includes('çpal') || sName.includes('cpal') || sName.includes('ihl')) return 'lise';
    if (sName.includes('ortaokul') || sName.includes('iho') || sName.includes('yibo')) return 'ortaokul';
    const clsKeys = Object.keys(classes || {});
    if (clsKeys.some(k => /^[1-4][A-Z-\s]/i.test(k))) return 'ilkokul';
    if (clsKeys.some(k => /^(9|10|11|12)[A-Z-\s]/i.test(k))) return 'lise';
    return 'ortaokul';
  })();

  const activeNewUserSchoolLevel = kuranKursuAdminType ? 'diger' : (newUser.schoolLevel || detectedSchoolLevel);
  const activeNewUserBranches = forcedKuranKursuTeacherBranch
    ? [forcedKuranKursuTeacherBranch]
    : (SCHOOL_LEVEL_BRANCHES[activeNewUserSchoolLevel] || SCHOOL_LEVEL_BRANCHES.ortaokul);

  let tabs = isRahle
    ? [
        { id: 'classes', label: 'Hafızlık Havuzu & Rahle Sınıfları', icon: LayoutGrid },
        { id: 'rahle_students', label: 'Hafız & Hoca Ataması', icon: GraduationCap },
        { id: 'rahle_planning', label: 'Dönüş & Sayfa Planlama', icon: Layers },
        { id: 'rahle_criteria', label: 'Hazırlık & Deneme Kriterleri', icon: Sparkles },
        { id: 'rahle_stats', label: 'Kurum İstatistik & Veri Yönetimi', icon: Activity },
        { id: 'users', label: 'Hocalar & Yöneticiler', icon: Users },
        { id: 'support', label: 'Destek Talepleri', icon: MessageSquare },
        { id: 'logs', label: 'Sistem Logları', icon: ClipboardList },
      ]
    : isPusula
    ? [
        { id: 'classes', label: 'Sınıflar', icon: LayoutGrid },
        { id: 'pusula_akademi_gelisim', label: 'Akademi & Gelişim Sınıfları', icon: Award },
        { id: 'academic_year', label: 'Eğitim Yılı & Sene Atlatma', icon: Calendar },
        { id: 'users', label: 'Kullanıcılar', icon: Users },
        { id: 'support', label: 'Destek Talepleri', icon: MessageSquare },
        { id: 'ideas', label: 'Fikirler', icon: Lightbulb },
        { id: 'tarif', label: 'Öğrenci Tarifi', icon: Sparkles },
        { id: 'share', label: 'Paylaşım', icon: Share2 },
        { id: 'logs', label: 'Sistem Logları', icon: ClipboardList },
      ]
    : isAlim
    ? [
        { id: 'classes', label: 'Sınıflar', icon: LayoutGrid },
        { id: 'academic_year', label: 'Eğitim Yılı & Sene Atlatma', icon: Calendar },
        { id: 'users', label: 'Kullanıcılar', icon: Users },
        { id: 'teacherperf', label: 'Öğretmen Performans', icon: Activity },
        { id: 'support', label: 'Destek Talepleri', icon: MessageSquare },
        { id: 'ideas', label: 'Fikirler', icon: Lightbulb },
        { id: 'tarif', label: 'Öğrenci Tarifi', icon: Sparkles },
        { id: 'share', label: 'Paylaşım', icon: Share2 },
        { id: 'genelkultur', label: 'Genel Kültür', icon: Globe },
        { id: 'mit', label: 'M.İ.T Modülü', icon: GraduationCap },
        { id: 'logs', label: 'Sistem Logları', icon: ClipboardList },
      ]
    : [
        { id: 'classes', label: 'Sınıflar', icon: LayoutGrid },
        { id: 'academic_year', label: 'Eğitim Yılı & Sene Atlatma', icon: Calendar },
        { id: 'tasks', label: 'Görev & Değerlendirme', icon: Layers },
        { id: 'users', label: 'Kullanıcılar', icon: Users },
        { id: 'devcard', label: 'Gelişim Kartı Ayarları', icon: Trophy },
        { id: 'behavior', label: 'Davranış Modülü Ayarları', icon: Smile },
        { id: 'teacherperf', label: 'Öğretmen Performans', icon: Activity },
        { id: 'support', label: 'Destek Talepleri', icon: MessageSquare },
        { id: 'ideas', label: 'Fikirler', icon: Lightbulb },
        { id: 'tarif', label: 'Öğrenci Tarifi', icon: Sparkles },
        { id: 'share', label: 'Paylaşım', icon: Share2 },
        { id: 'logs', label: 'Sistem Logları', icon: ClipboardList },
      ];

  if (!isRahle && isSpecialEducation) {
    tabs = tabs.filter(t => ['classes', 'pusula_akademi_gelisim', 'academic_year', 'users', 'logs', 'teacherperf', 'share'].includes(t.id));
  }

  const normalizedAdminTab = (adminTab === 'list' || adminTab === 'add' || adminTab === 'import') ? 'users' : adminTab;
  const effectiveAdminTab = tabs.some(t => t.id === normalizedAdminTab) ? adminTab : 'classes';

  const activeTicketsCount = tickets?.filter((t: any) => t.schoolId === activeSchoolId && t.status !== 'closed').length || 0;

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
        <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm overflow-hidden">
            {/* Admin Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-gray-100 bg-[#FBFBFC]">
                <div className="flex items-center gap-4">
                    <h2 className={`text-lg font-black tracking-tight ${isRahle ? 'text-amber-900' : isAlim ? 'text-emerald-900' : isPusula ? 'text-purple-900' : 'text-blue-900'}`}>
                        {isRahle ? 'Rahle Hafızlık Yönetim Paneli' : 'Yönetim Paneli'}
                    </h2>
                    <button 
                        onClick={() => setActiveTab(isRahle ? 'dashboard' : isPusula ? 'dashboard' : isAlim ? 'kelimelik' : 'eval')}
                        className={`flex items-center gap-2 px-3.5 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 font-bold text-xs transition-all shadow-sm w-fit cursor-pointer ${
                            isRahle ? 'hover:border-amber-400 hover:text-amber-700' : isAlim ? 'hover:border-emerald-400 hover:text-emerald-700' : isPusula ? 'hover:border-purple-400 hover:text-purple-700' : 'hover:border-blue-400 hover:text-blue-600'
                        }`}
                    >
                        <ArrowLeft size={12} /> Panele Dön
                    </button>
                </div>
            </div>

            {/* Admin Tabs */}
            <div className="flex gap-8 border-b border-gray-200 px-6 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                    const isTabActive = effectiveAdminTab === tab.id || (effectiveAdminTab === 'list' && tab.id === 'users') || (effectiveAdminTab === 'add' && tab.id === 'users') || (effectiveAdminTab === 'import' && tab.id === 'users');
                    const activeBorderText = isRahle
                        ? 'border-amber-600 text-amber-700'
                        : isAlim
                        ? 'border-emerald-600 text-emerald-700'
                        : isPusula
                        ? 'border-purple-600 text-purple-700'
                        : 'border-blue-600 text-blue-700';
                    const activeIconColor = isRahle
                        ? 'text-amber-600'
                        : isAlim
                        ? 'text-emerald-600'
                        : isPusula
                        ? 'text-purple-600'
                        : 'text-blue-600';

                    return (
                    <button
                        key={tab.id}
                        onClick={() => setAdminTab(tab.id)}
                        className={`flex items-center gap-2.5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                            isTabActive
                                ? activeBorderText
                                : 'border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300'
                        }`}
                    >
                        <tab.icon size={18} className={isTabActive ? activeIconColor : 'text-gray-400'} />
                        {tab.label}
                        {tab.id === 'support' && activeTicketsCount > 0 && (
                            <span className="bg-[#FF3B30] text-white text-[10px] font-black min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5 shadow-lg shadow-red-100 ml-1">
                                {activeTicketsCount}
                            </span>
                        )}
                        {tab.id === 'ideas' && activeIdeasCount > 0 && (
                            <span className="bg-[#FF3B30] text-white text-[10px] font-black min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5 shadow-lg shadow-red-100 ml-1">
                                {activeIdeasCount}
                            </span>
                        )}
                    </button>
                    );
                })}
            </div>

            <div className="p-6">
                {(effectiveAdminTab === 'users' || effectiveAdminTab === 'list' || effectiveAdminTab === 'add' || effectiveAdminTab === 'import') && (
                    <div className="space-y-10 animate-in fade-in duration-500">
                        {/* Inline Add User Form */}
                        <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-5">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div>
                                    <h3 className="text-base font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                                        <UserPlus size={18} className={isRahle ? 'text-amber-600' : 'text-blue-600'} />
                                        {forcedKuranKursuTeacherBranch
                                            ? `Yeni ${forcedKuranKursuTeacherBranch} Ekle`
                                            : 'Yeni Kullanıcı (Öğretmen / Yönetici) Ekle'}
                                    </h3>
                                    <p className="text-xs font-medium text-gray-400 mt-0.5">
                                        {forcedKuranKursuTeacherBranch
                                            ? `${forcedKuranKursuAdminRole} olarak sisteme sadece "${forcedKuranKursuTeacherBranch}" rolünde kullanıcı ekleyebilirsiniz.`
                                            : `Öğretmen eklerken okul kademesine (${SCHOOL_LEVEL_LABELS[activeNewUserSchoolLevel]}) göre branş seçimi yapabilirsiniz.`}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Rol</label>
                                    <select 
                                        value={forcedKuranKursuTeacherBranch ? 'teacher' : newUser.role} 
                                        disabled={Boolean(forcedKuranKursuTeacherBranch)}
                                        onChange={e => setNewUser({
                                            ...newUser,
                                            role: e.target.value,
                                            schoolLevel: e.target.value === 'teacher' ? (newUser.schoolLevel || detectedSchoolLevel) : '',
                                            adminSubRole: e.target.value === 'admin' ? (newUser.adminSubRole || 'Yönetici') : ''
                                        })}
                                        className="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer disabled:opacity-80"
                                    >
                                        <option value="teacher">Öğretmen</option>
                                        {!forcedKuranKursuTeacherBranch && (
                                            <option value="admin">Yönetici</option>
                                        )}
                                    </select>
                                </div>

                                {!forcedKuranKursuTeacherBranch && (newUser.role === 'admin' || newUser.role === 'yönetici') && (
                                    <div className="space-y-2 lg:col-span-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Yönetici Görevi / Türü</label>
                                        <select
                                            value={newUser.adminSubRole || 'Yönetici'}
                                            onChange={e => setNewUser({
                                                ...newUser,
                                                adminSubRole: e.target.value,
                                                branch: e.target.value
                                            })}
                                            className="w-full bg-purple-50/40 border border-purple-200 px-4 py-3 rounded-2xl text-sm font-bold text-purple-900 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all cursor-pointer"
                                        >
                                            {ADMIN_SUB_ROLE_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {(forcedKuranKursuTeacherBranch || newUser.role === 'teacher' || newUser.role === 'öğretmen') && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Okul Seviyesi</label>
                                            <select
                                                value={activeNewUserSchoolLevel}
                                                disabled={Boolean(forcedKuranKursuTeacherBranch)}
                                                onChange={e => {
                                                    const nextLevel = e.target.value;
                                                    const nextBranches = SCHOOL_LEVEL_BRANCHES[nextLevel] || [];
                                                    setNewUser({
                                                        ...newUser,
                                                        schoolLevel: nextLevel,
                                                        branch: nextBranches.includes(newUser.branch || '') ? newUser.branch : ''
                                                    });
                                                }}
                                                className="w-full bg-blue-50/40 border border-blue-200 px-4 py-3 rounded-2xl text-sm font-bold text-blue-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer disabled:opacity-80"
                                            >
                                                {forcedKuranKursuTeacherBranch ? (
                                                    <option value="diger">{SCHOOL_LEVEL_LABELS.diger}</option>
                                                ) : (
                                                    Object.entries(SCHOOL_LEVEL_LABELS).map(([lvlKey, lvlLabel]) => (
                                                        <option key={lvlKey} value={lvlKey}>{lvlLabel}</option>
                                                    ))
                                                )}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Öğretmen Branşı</label>
                                            <select
                                                value={forcedKuranKursuTeacherBranch || newUser.branch || ''}
                                                disabled={Boolean(forcedKuranKursuTeacherBranch)}
                                                onChange={e => setNewUser({ ...newUser, branch: e.target.value, schoolLevel: activeNewUserSchoolLevel })}
                                                className="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer disabled:opacity-80"
                                            >
                                                {!forcedKuranKursuTeacherBranch && (
                                                    <option value="">-- Branş Seçiniz ({SCHOOL_LEVEL_LABELS[activeNewUserSchoolLevel]}) --</option>
                                                )}
                                                {activeNewUserBranches.map((br) => (
                                                    <option key={br} value={br}>{br}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Ad Soyad</label>
                                    <input 
                                        type="text" 
                                        value={newUser.name} 
                                        onChange={e => setNewUser({...newUser, name: e.target.value})}
                                        placeholder="Ad Soyad giriniz..."
                                        className="w-full bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Kullanıcı Adı</label>
                                    <input 
                                        type="text" 
                                        value={newUser.username} 
                                        onChange={e => setNewUser({...newUser, username: e.target.value})}
                                        placeholder="Oto. Üretilir"
                                        className="w-full bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="flex items-end gap-3">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Şifre</label>
                                        <input 
                                            type="text" 
                                            value={newUser.password} 
                                            onChange={e => setNewUser({...newUser, password: e.target.value})}
                                            placeholder="Oto. Üretilir"
                                            className="w-full bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (forcedKuranKursuTeacherBranch) {
                                                setNewUser({
                                                    ...newUser,
                                                    role: 'teacher',
                                                    schoolLevel: 'diger',
                                                    branch: forcedKuranKursuTeacherBranch
                                                });
                                            } else if (newUser.role === 'teacher' && !newUser.schoolLevel) {
                                                setNewUser({ ...newUser, schoolLevel: activeNewUserSchoolLevel });
                                            }
                                            handleAddUser();
                                        }}
                                        className={`${isRahle ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} text-white px-7 py-3 rounded-2xl font-black text-sm transition-all shadow-lg cursor-pointer shrink-0`}
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* User List Table */}
                        <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">
                                        <tr>
                                            <th className="px-8 py-5">AD SOYAD</th>
                                            <th className="px-8 py-5">KULLANICI ADI</th>
                                            <th className="px-8 py-5">ŞİFRE</th>
                                            <th className="px-8 py-5">ROL</th>
                                            <th className="px-8 py-5">BRANŞ / GÖREV</th>
                                            <th className="px-8 py-5 text-right">İŞLEM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {visibleStaffUsers
                                            .map((u: any, idx: number) => {
                                                const isTeacherRow = u.role === 'teacher' || u.role === 'öğretmen';
                                                const rowLevel = u.schoolLevel && SCHOOL_LEVEL_BRANCHES[u.schoolLevel] ? u.schoolLevel : detectedSchoolLevel;
                                                const primaryBranches = SCHOOL_LEVEL_BRANCHES[rowLevel] || SCHOOL_LEVEL_BRANCHES.ortaokul;

                                                return (
                                                <tr key={`${u.id || u.username}-${idx}`} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-5 font-bold text-gray-900">{u.name}</td>
                                                    <td className="px-8 py-5 text-gray-500 font-medium">{u.username}</td>
                                                    <td className="px-8 py-5 text-gray-300 font-medium tracking-widest">••••••</td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                                            u.role === 'admin' 
                                                                ? 'bg-purple-50 text-purple-600 border-purple-100' 
                                                                : 'bg-blue-50 text-blue-600 border-blue-100'
                                                        }`}>
                                                            {u.role === 'admin' ? 'YÖNETİCİ' : 'ÖĞRETMEN'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        {kuranKursuAdminType ? (
                                                            <span className={`inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold border ${
                                                                isTeacherRow
                                                                    ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200'
                                                                    : 'bg-purple-50/70 text-purple-800 border-purple-200'
                                                            }`}>
                                                                {isTeacherRow ? forcedKuranKursuTeacherBranch : forcedKuranKursuAdminRole}
                                                            </span>
                                                        ) : isTeacherRow ? (
                                                            <div className="flex items-center gap-2 max-w-xs">
                                                                <select
                                                                    value={u.branch || ''}
                                                                    onChange={(e) => {
                                                                        const selectedBranch = e.target.value;
                                                                        const matchedLevel = Object.entries(SCHOOL_LEVEL_BRANCHES).find(([, list]) => list.includes(selectedBranch))?.[0] || rowLevel;
                                                                        handleUpdateTeacherBranch?.(u, selectedBranch, matchedLevel);
                                                                    }}
                                                                    className={`w-full px-3.5 py-2 rounded-xl text-xs font-bold border outline-none transition-all cursor-pointer ${
                                                                        u.branch
                                                                            ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200 hover:border-emerald-400'
                                                                            : 'bg-amber-50/60 text-amber-800 border-amber-200 hover:border-amber-400'
                                                                    }`}
                                                                    title="Öğretmen branşını seçin veya değiştirin"
                                                                >
                                                                    <option value="">-- Branş Seçin --</option>
                                                                    {u.branch && !Object.values(SCHOOL_LEVEL_BRANCHES).some(list => list.includes(u.branch)) && (
                                                                        <option value={u.branch}>{u.branch}</option>
                                                                    )}
                                                                    <optgroup label={`${SCHOOL_LEVEL_LABELS[rowLevel]} Branşları`}>
                                                                        {primaryBranches.map((br) => (
                                                                            <option key={br} value={br}>{br}</option>
                                                                        ))}
                                                                    </optgroup>
                                                                    {Object.entries(SCHOOL_LEVEL_BRANCHES)
                                                                        .filter(([lvlKey]) => lvlKey !== rowLevel)
                                                                        .map(([lvlKey, brList]) => (
                                                                            <optgroup key={lvlKey} label={`${SCHOOL_LEVEL_LABELS[lvlKey]} Branşları`}>
                                                                                {brList.map((br) => (
                                                                                    <option key={`${lvlKey}_${br}`} value={br}>{br}</option>
                                                                                ))}
                                                                            </optgroup>
                                                                        ))}
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 max-w-xs">
                                                                <select
                                                                    value={u.adminSubRole || (ADMIN_SUB_ROLE_OPTIONS.includes(u.branch) ? u.branch : 'Yönetici')}
                                                                    onChange={(e) => {
                                                                        const selectedSubRole = e.target.value;
                                                                        handleUpdateTeacherBranch?.(u, selectedSubRole);
                                                                    }}
                                                                    className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border bg-purple-50/70 text-purple-800 border-purple-200 hover:border-purple-400 outline-none transition-all cursor-pointer"
                                                                    title="Yönetici görevini seçin veya değiştirin"
                                                                >
                                                                    {ADMIN_SUB_ROLE_OPTIONS.map((opt) => (
                                                                        <option key={opt} value={opt}>{opt}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => setEditUser({
                                                                    ...u,
                                                                    schoolLevel: kuranKursuAdminType ? 'diger' : (u.schoolLevel || detectedSchoolLevel),
                                                                    branch: kuranKursuAdminType
                                                                        ? (isTeacherRow ? forcedKuranKursuTeacherBranch : forcedKuranKursuAdminRole)
                                                                        : (u.branch || ''),
                                                                    adminSubRole: kuranKursuAdminType
                                                                        ? forcedKuranKursuAdminRole
                                                                        : (u.adminSubRole || (ADMIN_SUB_ROLE_OPTIONS.includes(u.branch) ? u.branch : 'Yönetici'))
                                                                })} 
                                                                className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                                                                title="Kullanıcıyı ve Branşını Düzenle"
                                                            >
                                                                <Edit2 size={18}/>
                                                            </button>
                                                            <button 
                                                                onClick={() => handleResetPassword(u)} 
                                                                className="text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
                                                                title="Şifreyi Sıfırla"
                                                            >
                                                                <Zap size={18}/>
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteUser(u.id)} 
                                                                className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                                                                title="Sil"
                                                            >
                                                                <Trash2 size={18}/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                );
                                            })}
                                        {visibleStaffUsers.length === 0 && (
                                            <tr key="empty_admin">
                                                <td colSpan={6} className="p-16 text-center text-gray-400 font-medium bg-gray-50/50">
                                                    <Users size={48} className="mx-auto mb-4 opacity-10" />
                                                    Kayıtlı yönetici veya öğretici bulunmuyor.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Import Section (Optional/Hidden in main view but logic kept) */}
                        {adminTab === 'import' && (
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm mt-8">
                                <h3 className="font-black text-lg text-blue-900 mb-6 flex items-center gap-2 uppercase tracking-tight"><Upload size={20}/> Toplu Kullanıcı İçe Aktar</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 mb-6">
                                            <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-1.5"><FileText size={16}/> Excel Formatı Nasıl Olmalı?</h4>
                                            <p className="text-xs text-blue-600/80 mb-3 leading-relaxed">Yükleyeceğiniz Excel dosyasının ilk satırı başlık olmalı ve aşağıdaki sütunları içermelidir:</p>
                                            <ul className="text-xs text-blue-700 space-y-1.5 font-medium bg-white p-3 rounded-xl border border-blue-100">
                                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 1. Sütun: <strong className="text-blue-900">Ad Soyad</strong></li>
                                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 2. Sütun: <strong className="text-blue-900">Kullanıcı Adı</strong> (İsteğe bağlı, boş bırakılırsa otomatik üretilir)</li>
                                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 3. Sütun: <strong className="text-blue-900">Şifre</strong> (İsteğe bağlı, boş bırakılırsa otomatik üretilir)</li>
                                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 4. Sütun: <strong className="text-blue-900">Rol</strong> (ogretmen, yonetici)</li>
                                            </ul>
                                        </div>

                                        <label className="relative flex flex-col items-center justify-center w-full h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                            <Upload className="text-gray-400 group-hover:text-blue-500 mb-3" size={32}/>
                                            <span className="text-sm font-bold text-gray-600 group-hover:text-blue-700">Excel dosyasını seçin veya sürükleyin</span>
                                            <span className="text-xs text-gray-400 mt-1 font-medium">Sadece .xlsx veya .xls formatları</span>
                                            <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="hidden" />
                                        </label>
                                    </div>

                                    <div>
                                        {excelPreview.length > 0 ? (
                                            <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full">
                                                <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
                                                    <span className="font-bold text-sm text-gray-800 flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Önizleme ({excelPreview.length} Kayıt)</span>
                                                    <button onClick={handleImportExcel} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors shadow-sm">İçe Aktar</button>
                                                </div>
                                                <div className="overflow-y-auto flex-1 max-h-[300px] p-4">
                                                    <div className="space-y-2">
                                                        {excelPreview.slice(0, 10).map((row: any, idx: number) => (
                                                            <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 text-xs flex justify-between items-center shadow-sm">
                                                                <span className="font-bold text-gray-800">{row.name}</span>
                                                                <div className="flex gap-2">
                                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold uppercase tracking-wider text-[10px]">{row.role}</span>
                                                                    {row.classLevel && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-semibold uppercase tracking-wider text-[10px]">{row.classLevel}</span>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {excelPreview.length > 10 && (
                                                            <div className="text-center text-xs text-gray-400 font-medium pt-2">... ve {excelPreview.length - 10} kayıt daha</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50">
                                                <FileText size={48} className="mb-4 opacity-20"/>
                                                <p className="text-sm font-medium">Dosya yüklendiğinde önizleme burada görünecektir.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {effectiveAdminTab === 'classes' && isRahle && (() => {
                    const poolStudents: string[] = getAllHafizlikPoolStudents ? getAllHafizlikPoolStudents(classes) : [];
                    const rahleClassKeys = Object.keys(rahleClasses || {}).filter((rCls) => {
                        const clsGender = resolveRahleClassGender(rCls);
                        if (activeGenderFilter && clsGender && clsGender !== activeGenderFilter) {
                            return false;
                        }
                        return true;
                    });
                    const activeView = (selectedRahleAdminView === 'Hafızlık Havuzu' || rahleClassKeys.includes(selectedRahleAdminView))
                        ? selectedRahleAdminView
                        : 'Hafızlık Havuzu';
                    const isPoolView = activeView === 'Hafızlık Havuzu';
                    const activeClassGender: 'K' | 'E' | null = !isPoolView
                        ? (resolveRahleClassGender(activeView) || activeGenderFilter || null)
                        : null;
                    const targetClassStudentGender: 'K' | 'E' | null = activeGenderFilter || activeClassGender;

                    const filteredPoolStudents = poolStudents.filter((stuName: string) => {
                        const sUser = schoolUsers.find((u: any) => u.name === stuName && u.role === 'student');
                        const rawAssigned = getStudentRahleClass ? getStudentRahleClass(stuName) : null;
                        const assignedRahleCls = rawAssigned && rahleClassKeys.includes(rawAssigned) ? rawAssigned : null;
                        const rahleOnly = isStudentRahleOnly ? isStudentRahleOnly(stuName, sUser) : false;

                        if (rahlePoolSearch.trim()) {
                            const q = rahlePoolSearch.toLowerCase();
                            const schoolCls = getStudentSchoolClass ? getStudentSchoolClass(stuName) : '';
                            if (
                                !stuName.toLowerCase().includes(q) &&
                                !(sUser?.username || '').toLowerCase().includes(q) &&
                                !(assignedRahleCls || '').toLowerCase().includes(q) &&
                                !(schoolCls || '').toLowerCase().includes(q)
                            ) {
                                return false;
                            }
                        }

                        if (rahlePoolFilter === 'assigned') return Boolean(assignedRahleCls);
                        if (rahlePoolFilter === 'unassigned') return !assignedRahleCls;
                        if (rahlePoolFilter === 'rahle_only') return rahleOnly;
                        if (rahlePoolFilter === 'multi_module') return !rahleOnly;
                        return true;
                    });

                    const activeRahleClassStudents: string[] = !isPoolView
                        ? (rahleClasses[activeView] || []).filter((sName: string) => {
                            const sUser = schoolUsers.find((u: any) => u.name === sName && u.role === 'student');
                            const isHafiz = isStudentHafizlik ? isStudentHafizlik(sName, sUser) : true;
                            if (!isHafiz) return false;
                            if (targetClassStudentGender && resolveStudentGender(sName, sUser) !== targetClassStudentGender) return false;
                            return true;
                        })
                        : [];

                    const unassignedOrOtherPoolStudents = !isPoolView
                        ? poolStudents.filter((sName: string) => {
                            if (activeRahleClassStudents.includes(sName)) return false;
                            const sUser = schoolUsers.find((u: any) => u.name === sName && u.role === 'student');
                            if (targetClassStudentGender && resolveStudentGender(sName, sUser) !== targetClassStudentGender) return false;
                            if (!rahlePoolSearch.trim()) return true;
                            return sName.toLowerCase().includes(rahlePoolSearch.toLowerCase());
                        })
                        : [];

                    return (
                        <div className="space-y-8">
                            {/* Info Banner explaining Rahle Pool & Class isolation + data protection */}
                            <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                <div className="flex items-start gap-3.5">
                                    <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-amber-950">
                                            Hafızlık Öğrenci Havuzu ve Rahle Özel Sınıfları
                                        </h4>
                                        <p className="text-xs text-amber-800 font-medium leading-relaxed">
                                            Tüm hafızlık öğrencileri <strong>Hafızlık Öğrenci Havuzu</strong>'nda toplanır. Buradan Rahle modülüne özel sınıflar oluşturabilir, havuzdaki öğrencileri verileri değişmeden bu sınıflara atayabilir veya sadece Rahle modülünde yer alacak yeni öğrenciler ekleyebilirsiniz. <strong>Rahle harici diğer modülleri (Arif, Alim, Pusula) kullanan öğrencilerin kişisel verileri Rahle modülünden değiştirilemez.</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                                    <div className="px-4 py-2 rounded-2xl bg-white border border-amber-200 text-center">
                                        <div className="text-lg font-black text-amber-900">{poolStudents.length}</div>
                                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">Havuzdaki Hafız</div>
                                    </div>
                                    <div className="px-4 py-2 rounded-2xl bg-white border border-amber-200 text-center">
                                        <div className="text-lg font-black text-amber-900">{rahleClassKeys.length}</div>
                                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">Rahle Sınıfı</div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Selector: Hafızlık Havuzu + Rahle Classes + Create Rahle Class */}
                            <div className="space-y-3">
                                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {/* Unified Hafızlık Pool Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedRahleAdminView('Hafızlık Havuzu');
                                                setIsRenamingClass(false);
                                                setSelectedPoolStudents([]);
                                            }}
                                            className={`px-6 py-3.5 rounded-2xl font-black text-sm transition-all border shadow-sm flex items-center gap-2.5 cursor-pointer ${
                                                isPoolView
                                                    ? 'bg-amber-600 text-white border-amber-600 shadow-amber-100'
                                                    : 'bg-white text-amber-900 border-amber-200 hover:border-amber-400 hover:bg-amber-50/60'
                                            }`}
                                        >
                                            <Users size={17} className={isPoolView ? 'text-white' : 'text-amber-600'} />
                                            <span>Hafızlık Öğrenci Havuzu</span>
                                            <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                                                isPoolView ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
                                            }`}>
                                                {poolStudents.length}
                                            </span>
                                        </button>

                                        {/* Draggable Rahle-Only Classes */}
                                        {rahleClassKeys.map((rCls) => {
                                            const isBeingDragged = draggedClass === rCls;
                                            const isDragTarget = dragOverClass === rCls && draggedClass !== rCls;
                                            const isSelected = activeView === rCls;
                                            const pillClassGender = resolveRahleClassGender(rCls);
                                            const effectivePillGender = activeGenderFilter || pillClassGender;
                                            const clsCount = (rahleClasses[rCls] || []).filter((sName: string) => {
                                                const sUser = schoolUsers.find((u: any) => u.name === sName && u.role === 'student');
                                                const isHafiz = isStudentHafizlik ? isStudentHafizlik(sName, sUser) : true;
                                                if (!isHafiz) return false;
                                                if (effectivePillGender && resolveStudentGender(sName, sUser) !== effectivePillGender) return false;
                                                return true;
                                            }).length;

                                            return (
                                                <div
                                                    key={rCls}
                                                    draggable
                                                    onDragStart={(e) => {
                                                        setDraggedClass(rCls);
                                                        e.dataTransfer.effectAllowed = 'move';
                                                        try { e.dataTransfer.setData('text/plain', rCls); } catch {}
                                                    }}
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                        e.dataTransfer.dropEffect = 'move';
                                                        if (dragOverClass !== rCls) setDragOverClass(rCls);
                                                    }}
                                                    onDragLeave={() => {
                                                        if (dragOverClass === rCls) setDragOverClass(null);
                                                    }}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        const sourceCls = draggedClass || e.dataTransfer.getData('text/plain');
                                                        setDraggedClass(null);
                                                        setDragOverClass(null);
                                                        if (!sourceCls || sourceCls === rCls) return;
                                                        const fromIdx = rahleClassKeys.indexOf(sourceCls);
                                                        const toIdx = rahleClassKeys.indexOf(rCls);
                                                        if (fromIdx === -1 || toIdx === -1) return;
                                                        const reordered = [...rahleClassKeys];
                                                        const [moved] = reordered.splice(fromIdx, 1);
                                                        reordered.splice(toIdx, 0, moved);
                                                        handleReorderRahleClasses?.(reordered);
                                                    }}
                                                    onDragEnd={() => {
                                                        setDraggedClass(null);
                                                        setDragOverClass(null);
                                                    }}
                                                    onClick={() => {
                                                        setSelectedRahleAdminView(rCls);
                                                        setIsRenamingClass(false);
                                                        setRenameClassInput(formatClassLabel(rCls));
                                                        setSelectedPoolStudents([]);
                                                    }}
                                                    title="Sırasını değiştirmek için sürükleyip bırakın"
                                                    className={`px-5 py-3.5 rounded-2xl font-bold text-sm transition-all border shadow-sm cursor-grab active:cursor-grabbing flex items-center gap-2 select-none ${
                                                        isBeingDragged ? 'opacity-40 scale-95' : ''
                                                    } ${
                                                        isDragTarget ? 'ring-2 ring-offset-2 ring-amber-500 scale-105' : ''
                                                    } ${
                                                        isSelected
                                                            ? 'bg-amber-600 text-white border-amber-600 shadow-amber-100'
                                                            : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                                                    }`}
                                                >
                                                    <GripVertical size={15} className={isSelected ? 'text-white/75' : 'text-gray-300'} />
                                                    <span>{formatClassLabel(rCls)}</span>
                                                    {pillClassGender && (
                                                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                                                            isSelected
                                                                ? 'bg-white/20 text-white'
                                                                : pillClassGender === 'K'
                                                                ? 'bg-pink-50 text-pink-700 border border-pink-200'
                                                                : 'bg-sky-50 text-sky-700 border border-sky-200'
                                                        }`}>
                                                            {pillClassGender === 'K' ? 'Kız' : 'Erkek'}
                                                        </span>
                                                    )}
                                                    <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black ${
                                                        isSelected ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {clsCount}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Create New Rahle-Only Class */}
                                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 bg-white p-2.5 rounded-[24px] border border-amber-200 shadow-sm w-full xl:w-auto">
                                        <input
                                            type="text"
                                            value={newRahleClassName}
                                            onChange={e => setNewRahleClassName(e.target.value)}
                                            onKeyDown={async (e) => {
                                                if (e.key === 'Enter' && newRahleClassName.trim()) {
                                                    const genderToUse = activeGenderFilter || newRahleClassGender;
                                                    const formattedTarget = newRahleClassName.trim().toUpperCase().replace(/^_+/, '');
                                                    const created = await handleAddRahleClass?.(newRahleClassName, genderToUse);
                                                    if (created) {
                                                        if (!activeGenderFilter || genderToUse === activeGenderFilter) {
                                                            setSelectedRahleAdminView(formattedTarget);
                                                        }
                                                        setNewRahleClassName('');
                                                        if (!activeGenderFilter) setNewRahleClassGender('');
                                                    }
                                                }
                                            }}
                                            placeholder="Yeni Rahle Sınıfı (Örn: HAFIZLIK-1)"
                                            className="bg-amber-50/50 border-none px-4 py-2.5 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500/20 w-full sm:w-56 text-gray-800"
                                        />
                                        {activeGenderFilter ? (
                                            <span className={`px-3.5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap border ${
                                                activeGenderFilter === 'K'
                                                    ? 'bg-pink-50 text-pink-700 border-pink-200'
                                                    : 'bg-sky-50 text-sky-700 border-sky-200'
                                            }`}>
                                                {activeGenderFilter === 'K' ? 'Kız Sınıfı (K)' : 'Erkek Sınıfı (E)'}
                                            </span>
                                        ) : (
                                            <select
                                                value={newRahleClassGender}
                                                onChange={(e) => setNewRahleClassGender(e.target.value as 'K' | 'E' | '')}
                                                className={`px-3.5 py-2.5 rounded-xl text-xs font-black outline-none border cursor-pointer transition-all ${
                                                    newRahleClassGender === 'K'
                                                        ? 'bg-pink-50 text-pink-700 border-pink-200'
                                                        : newRahleClassGender === 'E'
                                                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                                                        : 'bg-amber-50/70 text-amber-900 border-amber-200'
                                                }`}
                                                title="Açılacak Rahle sınıfının Kız veya Erkek sınıfı olduğunu seçin"
                                            >
                                                <option value="">Cinsiyet Seçin (Kız / Erkek) *</option>
                                                <option value="K">Kız Sınıfı (K)</option>
                                                <option value="E">Erkek Sınıfı (E)</option>
                                            </select>
                                        )}
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                const genderToUse = activeGenderFilter || newRahleClassGender;
                                                const formattedTarget = newRahleClassName.trim().toUpperCase().replace(/^_+/, '');
                                                const created = await handleAddRahleClass?.(newRahleClassName, genderToUse);
                                                if (created) {
                                                    if (!activeGenderFilter || genderToUse === activeGenderFilter) {
                                                        setSelectedRahleAdminView(formattedTarget);
                                                    }
                                                    setNewRahleClassName('');
                                                    if (!activeGenderFilter) setNewRahleClassGender('');
                                                }
                                            }}
                                            className="bg-amber-600 hover:bg-amber-700 shadow-amber-100 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap shadow-lg cursor-pointer"
                                        >
                                            <FolderPlus size={15} /> Rahle Sınıfı Ekle
                                        </button>
                                    </div>
                                </div>

                                {rahleClassKeys.length > 1 && (
                                    <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                                        <GripVertical size={13} className="text-gray-300" />
                                        Rahle sınıflarını sürükleyip bırakarak sıralamasını değiştirebilirsiniz. Bu sınıflar sadece Rahle modülünde görünür.
                                    </p>
                                )}
                            </div>

                            {isPoolView ? (
                                /* ================= HAFIZLIK ÖĞRENCİ HAVUZU VIEW ================= */
                                <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                                    <div className="p-6 sm:p-8 border-b border-gray-100 bg-[#FBFBFC] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-[20px] bg-amber-600 shadow-xl shadow-amber-200 flex items-center justify-center shrink-0">
                                                <Users className="text-white" size={28} />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-2xl tracking-tight text-amber-950">
                                                    Hafızlık Öğrenci Havuzu (Tüm Hafızlık Öğrencileri)
                                                </h3>
                                                <p className="text-xs font-bold text-gray-500 mt-1">
                                                    Toplam {poolStudents.length} Hafızlık Öğrencisi • Havuzdaki öğrencileri verileri değişmeden istediğiniz Rahle sınıfına atayabilirsiniz.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Search & Filter */}
                                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                                            <div className="relative flex-1 sm:w-64">
                                                <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={rahlePoolSearch}
                                                    onChange={e => setRahlePoolSearch(e.target.value)}
                                                    placeholder="Havuzda öğrenci ara..."
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-amber-500"
                                                />
                                            </div>
                                            <select
                                                value={rahlePoolFilter}
                                                onChange={e => setRahlePoolFilter(e.target.value as any)}
                                                className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-amber-500 cursor-pointer"
                                            >
                                                <option value="all">Tümü ({poolStudents.length})</option>
                                                <option value="unassigned">Rahle Sınıfına Atanmayanlar</option>
                                                <option value="assigned">Rahle Sınıfına Atananlar</option>
                                                <option value="rahle_only">Sadece Rahle Öğrencileri (Düzenlenebilir)</option>
                                                <option value="multi_module">Diğer Modülleri de Kullananlar (Salt Okunur)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Bulk Assign Selected Pool Students to a Rahle Class */}
                                    {rahleClassKeys.length > 0 && (
                                        <div className="px-6 py-4 bg-amber-50/60 border-b border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="text-xs font-bold text-amber-900 flex items-center gap-2">
                                                <UserCheck size={16} className="text-amber-700" />
                                                <span>
                                                    Seçili Öğrenci: <strong>{selectedPoolStudents.length}</strong> kişi
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                                                <select
                                                    value={targetBulkRahleClass}
                                                    onChange={e => setTargetBulkRahleClass(e.target.value)}
                                                    className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-600 cursor-pointer"
                                                >
                                                    <option value="">Hedef Rahle Sınıfı Seçin...</option>
                                                    {rahleClassKeys.map(rCls => (
                                                        <option key={rCls} value={rCls}>{formatClassLabel(rCls)}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    disabled={selectedPoolStudents.length === 0 || !targetBulkRahleClass}
                                                    onClick={async () => {
                                                        if (!targetBulkRahleClass || selectedPoolStudents.length === 0) return;
                                                        await handleAssignStudentsToRahleClass?.(targetBulkRahleClass, selectedPoolStudents);
                                                        setSelectedPoolStudents([]);
                                                    }}
                                                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                                                >
                                                    Seçilenleri Rahle Sınıfına Ata
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Pool Students Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-white text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-200">
                                                <tr>
                                                    <th className="p-4 pl-6 w-10">
                                                        <input
                                                            type="checkbox"
                                                            checked={filteredPoolStudents.length > 0 && filteredPoolStudents.every(s => selectedPoolStudents.includes(s))}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedPoolStudents(Array.from(new Set([...selectedPoolStudents, ...filteredPoolStudents])));
                                                                } else {
                                                                    setSelectedPoolStudents(selectedPoolStudents.filter(s => !filteredPoolStudents.includes(s)));
                                                                }
                                                            }}
                                                            className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                                                        />
                                                    </th>
                                                    <th className="p-4">OKUL NO</th>
                                                    <th className="p-4">AD SOYAD</th>
                                                    <th className="p-4">CİNSİYET</th>
                                                    <th className="p-4">KULLANICI ADI</th>
                                                    <th className="p-4">OKUL SINIFI</th>
                                                    <th className="p-4">RAHLE SINIFI ATAMASI</th>
                                                    <th className="p-4">MODÜL & VERİ DURUMU</th>
                                                    <th className="p-4 pr-6 text-right">İŞLEMLER</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {filteredPoolStudents.map((studentName: string, idx: number) => {
                                                    const studentUser = schoolUsers.find((u: any) => u.name === studentName && u.role === 'student');
                                                    const match = studentName.match(/^(\d+)\s*[-]\s*(.+)$/);
                                                    const okulNo = match ? match[1] : '-';
                                                    const pureName = match ? match[2] : studentName;
                                                    const schoolCls = getStudentSchoolClass ? getStudentSchoolClass(studentName) : null;
                                                    const assignedRahleCls = getStudentRahleClass ? getStudentRahleClass(studentName) : null;
                                                    const canModifyData = isStudentRahleOnly ? isStudentRahleOnly(studentName, studentUser) : false;
                                                    const currentGender = resolveStudentGender(studentName, studentUser);

                                                    return (
                                                        <tr key={`${studentName}-${idx}`} className="hover:bg-amber-50/20 transition-colors">
                                                            <td className="p-4 pl-6">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedPoolStudents.includes(studentName)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setSelectedPoolStudents([...selectedPoolStudents, studentName]);
                                                                        } else {
                                                                            setSelectedPoolStudents(selectedPoolStudents.filter(s => s !== studentName));
                                                                        }
                                                                    }}
                                                                    className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                                                                />
                                                            </td>
                                                            <td className="p-4 font-bold text-gray-400">{okulNo}</td>
                                                            <td className="p-4 font-bold text-gray-900">{pureName}</td>
                                                            <td className="p-4">
                                                                {staffGenderFilter ? (
                                                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl border text-xs font-black ${
                                                                        currentGender === 'K'
                                                                            ? 'bg-pink-50 border-pink-200 text-pink-700'
                                                                            : 'bg-sky-50 border-sky-200 text-sky-700'
                                                                    }`}>
                                                                        {currentGender === 'K' ? 'Kız (K)' : 'Erkek (E)'}
                                                                    </span>
                                                                ) : (
                                                                    <select
                                                                        value={currentGender}
                                                                        onChange={(e) => handleUpdateStudentGender?.(studentName, schoolCls || assignedRahleCls || 'Hafızlık Havuzu', e.target.value as 'K' | 'E')}
                                                                        className={`px-3 py-1.5 rounded-xl border text-xs font-black outline-none cursor-pointer transition-all ${
                                                                            currentGender === 'K'
                                                                                ? 'bg-pink-50 border-pink-200 text-pink-700 hover:border-pink-400'
                                                                                : 'bg-sky-50 border-sky-200 text-sky-700 hover:border-sky-400'
                                                                        }`}
                                                                        title="Öğrenci cinsiyetini seçin veya değiştirin"
                                                                    >
                                                                        <option value="K">Kız (K)</option>
                                                                        <option value="E">Erkek (E)</option>
                                                                    </select>
                                                                )}
                                                            </td>
                                                            <td className="p-4 text-gray-500 font-medium">{studentUser?.username || '-'}</td>
                                                            <td className="p-4">
                                                                {schoolCls ? (
                                                                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs">
                                                                        {formatClassLabel(schoolCls)}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-xs font-semibold text-gray-400 italic">Sadece Rahle</span>
                                                                )}
                                                            </td>
                                                            <td className="p-4">
                                                                <select
                                                                    value={assignedRahleCls && rahleClassKeys.includes(assignedRahleCls) ? assignedRahleCls : ''}
                                                                    onChange={async (e) => {
                                                                        const nextRahleCls = e.target.value;
                                                                        if (!nextRahleCls) {
                                                                            if (assignedRahleCls) {
                                                                                await handleRemoveStudentFromRahleClass?.(assignedRahleCls, studentName);
                                                                            }
                                                                        } else {
                                                                            await handleAssignStudentsToRahleClass?.(nextRahleCls, [studentName]);
                                                                        }
                                                                    }}
                                                                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold outline-none cursor-pointer transition-all ${
                                                                        assignedRahleCls && rahleClassKeys.includes(assignedRahleCls)
                                                                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                                                                            : 'bg-gray-50 border-gray-200 text-gray-500'
                                                                    }`}
                                                                >
                                                                    <option value="">Havuzda (Sınıf Atanmadı)</option>
                                                                    {rahleClassKeys
                                                                        .filter(rCls => {
                                                                            const cGender = resolveRahleClassGender(rCls);
                                                                            return !cGender || cGender === currentGender;
                                                                        })
                                                                        .map(rCls => {
                                                                            const cGender = resolveRahleClassGender(rCls);
                                                                            return (
                                                                                <option key={rCls} value={rCls}>
                                                                                    {formatClassLabel(rCls)}{cGender ? ` (${cGender === 'K' ? 'Kız' : 'Erkek'})` : ''}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                </select>
                                                            </td>
                                                            <td className="p-4">
                                                                {canModifyData ? (
                                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">
                                                                        Sadece Rahle Öğrencisi
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold"
                                                                        title="Bu öğrenci Rahle harici okul modüllerini de kullanmaktadır. Öğrenci bilgileri sadece genel okul yönetiminden değiştirilebilir."
                                                                    >
                                                                        <Lock size={12} /> Diğer Modüllerde Aktif
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                {canModifyData ? (
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setEditUser(
                                                                                studentUser
                                                                                    ? { ...studentUser, originalName: studentName, classLevel: assignedRahleCls || '', isHafizlik: true, isRahleOnly: true, gender: currentGender }
                                                                                    : { name: studentName, originalName: studentName, role: 'student', classLevel: assignedRahleCls || '', isHafizlik: true, isRahleOnly: true, gender: currentGender }
                                                                            )}
                                                                            className="text-amber-600 hover:text-amber-800 transition-colors p-2 hover:bg-amber-50 rounded-lg cursor-pointer"
                                                                            title="Öğrenci Bilgilerini Düzenle"
                                                                        >
                                                                            <Edit2 size={17} />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleDeleteUser(studentUser?.id || studentName)}
                                                                            className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg cursor-pointer"
                                                                            title="Öğrenciyi Sil"
                                                                        >
                                                                            <Trash2 size={17} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-[11px] font-semibold text-gray-400 italic">
                                                                        Veri Güncellenemez
                                                                    </span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {filteredPoolStudents.length === 0 && (
                                                    <tr>
                                                        <td colSpan={9} className="p-12 text-center text-gray-400 font-medium bg-gray-50/30 italic">
                                                            {poolStudents.length === 0
                                                                ? 'Henüz hafızlık havuzunda kayıtlı öğrenci bulunmuyor.'
                                                                : 'Arama veya filtre kriterlerine uygun hafızlık öğrencisi bulunamadı.'}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Add Brand-New Rahle-Only Student directly to Pool / Optional Rahle Class */}
                                    <div className="p-6 sm:p-8 bg-amber-50/30 border-t border-amber-100 space-y-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div>
                                                <h4 className="text-sm font-black text-amber-950 flex items-center gap-2">
                                                    <UserPlus size={17} className="text-amber-700" />
                                                    Rahle Modülüne Yeni Öğrenci Ekle (Sadece Rahle Öğrencisi)
                                                </h4>
                                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                                    Buradan eklenen yeni öğrenciler sadece Rahle modülüne kaydedilir ve verileri Rahle yöneticisi tarafından güncellenebilir.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-2xs">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Okul No</label>
                                                <input
                                                    type="text"
                                                    value={newRahleSingleStudent.no}
                                                    onChange={e => setNewRahleSingleStudent({ ...newRahleSingleStudent, no: e.target.value })}
                                                    placeholder="Örn: 145"
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Ad Soyad *</label>
                                                <input
                                                    type="text"
                                                    value={newRahleSingleStudent.name}
                                                    onChange={e => setNewRahleSingleStudent({ ...newRahleSingleStudent, name: e.target.value })}
                                                    placeholder="Örn: 123 - Ad Soyad - Cinsiyet(virgülle ayırın veya altalta girin"
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Cinsiyet</label>
                                                {staffGenderFilter ? (
                                                    <div className={`w-full px-3 py-2.5 rounded-xl border text-xs font-black ${
                                                        staffGenderFilter === 'K'
                                                            ? 'bg-pink-50 border-pink-200 text-pink-700'
                                                            : 'bg-sky-50 border-sky-200 text-sky-700'
                                                    }`}>
                                                        {staffGenderFilter === 'K' ? 'Kız (K)' : 'Erkek (E)'}
                                                    </div>
                                                ) : (
                                                    <select
                                                        value={newRahleSingleStudent.gender || ''}
                                                        onChange={e => setNewRahleSingleStudent({ ...newRahleSingleStudent, gender: e.target.value })}
                                                        className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 cursor-pointer"
                                                    >
                                                        <option value="">Oto (İsimden)</option>
                                                        <option value="K">Kız (K)</option>
                                                        <option value="E">Erkek (E)</option>
                                                    </select>
                                                )}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Rahle Sınıfı</label>
                                                <select
                                                    value={targetBulkRahleClass}
                                                    onChange={e => setTargetBulkRahleClass(e.target.value)}
                                                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500 cursor-pointer"
                                                >
                                                    <option value="">Sadece Havuz</option>
                                                    {rahleClassKeys.map(rCls => (
                                                        <option key={rCls} value={rCls}>{formatClassLabel(rCls)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Şifre (İsteğe Bağlı)</label>
                                                <input
                                                    type="text"
                                                    value={newRahleSingleStudent.password}
                                                    onChange={e => setNewRahleSingleStudent({ ...newRahleSingleStudent, password: e.target.value })}
                                                    placeholder="Oto. Üretilir"
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-500"
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        const rawName = newRahleSingleStudent.name.trim();
                                                        if (!rawName) return;
                                                        const fullLabel = newRahleSingleStudent.no.trim()
                                                            ? `${newRahleSingleStudent.no.trim()} - ${rawName}`
                                                            : rawName;
                                                        await handleAddRahleOnlyStudents?.(targetBulkRahleClass || null, [fullLabel], {
                                                            username: newRahleSingleStudent.username,
                                                            password: newRahleSingleStudent.password,
                                                            gender: newRahleSingleStudent.gender || (activeGenderFilter || undefined)
                                                        });
                                                        setNewRahleSingleStudent({ no: '', name: '', gender: '', username: '', password: '' });
                                                    }}
                                                    className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                                                >
                                                    <Plus size={15} /> Yeni Öğrenci Ekle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* ================= SPECIFIC RAHLE CLASS VIEW ================= */
                                <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                                    {/* Rahle Class Header */}
                                    <div className="p-6 sm:p-8 border-b border-gray-100 bg-[#FBFBFC] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-[20px] flex items-center justify-center shadow-xl bg-amber-600 shadow-amber-200">
                                                <Users className="text-white" size={28} />
                                            </div>
                                            <div>
                                                {isRenamingClass ? (
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={renameClassInput}
                                                            onChange={e => setRenameClassInput(e.target.value)}
                                                            onKeyDown={async (e) => {
                                                                if (e.key === 'Enter') {
                                                                    const updated = await handleRenameRahleClass?.(activeView, renameClassInput);
                                                                    if (updated) {
                                                                        setSelectedRahleAdminView(typeof updated === 'string' ? updated : renameClassInput.trim().toUpperCase());
                                                                        setIsRenamingClass(false);
                                                                    }
                                                                } else if (e.key === 'Escape') {
                                                                    setIsRenamingClass(false);
                                                                }
                                                            }}
                                                            placeholder="Yeni Rahle Sınıf Adı"
                                                            autoFocus
                                                            className="bg-white border-2 border-amber-500 px-4 py-2 rounded-xl text-base font-black text-gray-900 outline-none w-52"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                const updated = await handleRenameRahleClass?.(activeView, renameClassInput);
                                                                if (updated) {
                                                                    setSelectedRahleAdminView(typeof updated === 'string' ? updated : renameClassInput.trim().toUpperCase());
                                                                    setIsRenamingClass(false);
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                                                        >
                                                            <Save size={14} /> Kaydet
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsRenamingClass(false)}
                                                            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-xs cursor-pointer"
                                                        >
                                                            İptal
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <h3 className="font-black text-2xl tracking-tight text-amber-900">
                                                            {formatClassLabel(activeView)} (Rahle Sınıfı)
                                                        </h3>
                                                        {activeGenderFilter ? (
                                                            <span className={`px-3 py-1 rounded-xl text-xs font-black border ${
                                                                activeGenderFilter === 'K'
                                                                    ? 'bg-pink-50 text-pink-700 border-pink-200'
                                                                    : 'bg-sky-50 text-sky-700 border-sky-200'
                                                            }`}>
                                                                {activeGenderFilter === 'K' ? 'Kız Sınıfı (K)' : 'Erkek Sınıfı (E)'}
                                                            </span>
                                                        ) : (
                                                            <select
                                                                value={activeClassGender || ''}
                                                                onChange={(e) => {
                                                                    const val = e.target.value as 'K' | 'E';
                                                                    if (val === 'K' || val === 'E') {
                                                                        handleUpdateRahleClassGender?.(activeView, val);
                                                                    }
                                                                }}
                                                                className={`px-3 py-1.5 rounded-xl text-xs font-black outline-none border cursor-pointer transition-all ${
                                                                    activeClassGender === 'K'
                                                                        ? 'bg-pink-50 text-pink-700 border-pink-200 hover:border-pink-400'
                                                                        : activeClassGender === 'E'
                                                                        ? 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400'
                                                                        : 'bg-amber-50 text-amber-800 border-amber-200'
                                                                }`}
                                                                title="Rahle sınıfının cinsiyetini seçin veya değiştirin"
                                                            >
                                                                {!activeClassGender && <option value="">Cinsiyet Seçin</option>}
                                                                <option value="K">Kız Sınıfı (K)</option>
                                                                <option value="E">Erkek Sınıfı (E)</option>
                                                            </select>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setRenameClassInput(formatClassLabel(activeView));
                                                                setIsRenamingClass(true);
                                                            }}
                                                            className="p-2 rounded-xl bg-gray-100 hover:bg-amber-50 text-gray-500 hover:text-amber-700 transition-colors cursor-pointer"
                                                            title="Rahle Sınıf Adını Değiştir"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3 mt-1">
                                                    <p className="text-[11px] font-black text-amber-700 uppercase tracking-[0.15em]">
                                                        {activeRahleClassStudents.length} HAFIZLIK ÖĞRENCİSİ
                                                    </p>
                                                    <span className="text-gray-300">•</span>
                                                    <p className="text-[11px] font-bold text-gray-400">
                                                        Sadece Rahle modülüne özel sınıf
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {!isRenamingClass && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setRenameClassInput(formatClassLabel(activeView));
                                                        setIsRenamingClass(true);
                                                    }}
                                                    className="flex items-center gap-2 px-5 py-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-200 font-black text-xs uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                                                >
                                                    <Edit2 size={15} /> Sınıf Adını Değiştir
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleDeleteRahleClass?.(activeView, () => setSelectedRahleAdminView('Hafızlık Havuzu'));
                                                }}
                                                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all group cursor-pointer"
                                            >
                                                <Trash2 size={16} className="group-hover:scale-110 transition-transform" /> Rahle Sınıfını Sil
                                            </button>
                                        </div>
                                    </div>

                                    {/* Assign Existing Students from Hafızlık Pool to This Rahle Class */}
                                    <div className="p-6 bg-amber-50/40 border-b border-amber-100 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <h4 className="text-sm font-black text-amber-950 flex items-center gap-2">
                                                    <UserCheck size={17} className="text-amber-700" />
                                                    Hafızlık Havuzundan "{formatClassLabel(activeView)}" Sınıfına Öğrenci Ekle (Verileri Değişmez)
                                                </h4>
                                                <p className="text-xs text-gray-500 font-medium">
                                                    Havuzdaki hafızlık öğrencilerini seçerek verilerini değiştirmeden bu Rahle sınıfına dahil edebilirsiniz.
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={rahlePoolSearch}
                                                        onChange={e => setRahlePoolSearch(e.target.value)}
                                                        placeholder="Havuzda öğrenci ara..."
                                                        className="pl-8 pr-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-amber-500 w-48"
                                                    />
                                                </div>
                                                {selectedPoolStudents.length > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={async () => {
                                                            await handleAssignStudentsToRahleClass?.(activeView, selectedPoolStudents);
                                                            setSelectedPoolStudents([]);
                                                        }}
                                                        className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-xs"
                                                    >
                                                        Seçilen {selectedPoolStudents.length} Öğrenciyi Bu Sınıfa Ekle
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {unassignedOrOtherPoolStudents.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto p-1">
                                                {unassignedOrOtherPoolStudents.map((stuName: string) => {
                                                    const currentRCls = getStudentRahleClass ? getStudentRahleClass(stuName) : null;
                                                    const schoolCls = getStudentSchoolClass ? getStudentSchoolClass(stuName) : null;
                                                    const isChecked = selectedPoolStudents.includes(stuName);
                                                    return (
                                                        <div
                                                            key={stuName}
                                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                                                                isChecked
                                                                    ? 'bg-amber-100 border-amber-400 text-amber-950'
                                                                    : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedPoolStudents([...selectedPoolStudents, stuName]);
                                                                    } else {
                                                                        setSelectedPoolStudents(selectedPoolStudents.filter(s => s !== stuName));
                                                                    }
                                                                }}
                                                                className="w-3.5 h-3.5 rounded border-gray-300 text-amber-600 accent-amber-600 cursor-pointer"
                                                            />
                                                            <span>{stuName}</span>
                                                            {schoolCls && (
                                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                                                                    {formatClassLabel(schoolCls)}
                                                                </span>
                                                            )}
                                                            {currentRCls && (
                                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                                                    {formatClassLabel(currentRCls)}
                                                                </span>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAssignStudentsToRahleClass?.(activeView, [stuName])}
                                                                className="ml-1 px-2 py-0.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black cursor-pointer"
                                                                title="Bu Rahle Sınıfına Ekle"
                                                            >
                                                                + Ekle
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">
                                                Havuzdaki tüm hafızlık öğrencileri zaten bu sınıfta yer alıyor veya aramanıza uygun öğrenci bulunamadı.
                                            </p>
                                        )}
                                    </div>

                                    {/* Students in This Rahle Class */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-white text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-200">
                                                <tr>
                                                    <th className="p-5 pl-6">OKUL NO</th>
                                                    <th className="p-5">AD SOYAD</th>
                                                    <th className="p-5">CİNSİYET</th>
                                                    <th className="p-5">KULLANICI ADI</th>
                                                    <th className="p-5">OKUL SINIFI</th>
                                                    <th className="p-5">RAHLE SINIFI</th>
                                                    <th className="p-5">ŞİFRE</th>
                                                    <th className="p-5">MODÜL & VERİ DURUMU</th>
                                                    <th className="p-5 pr-6 text-right">İŞLEMLER</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {activeRahleClassStudents.map((studentName: string, idx: number) => {
                                                    const studentUser = schoolUsers.find((u: any) => u.name === studentName && u.role === 'student');
                                                    const match = studentName.match(/^(\d+)\s*[-]\s*(.+)$/);
                                                    const okulNo = match ? match[1] : '-';
                                                    const pureName = match ? match[2] : studentName;
                                                    const schoolCls = getStudentSchoolClass ? getStudentSchoolClass(studentName) : null;
                                                    const canModifyData = isStudentRahleOnly ? isStudentRahleOnly(studentName, studentUser) : false;
                                                    const currentGender = resolveStudentGender(studentName, studentUser);

                                                    return (
                                                        <tr key={`${studentName}-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="p-5 pl-6 font-bold text-gray-400">{okulNo}</td>
                                                            <td className="p-5 font-bold text-gray-900">{pureName}</td>
                                                            <td className="p-5">
                                                                {staffGenderFilter ? (
                                                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl border text-xs font-black ${
                                                                        currentGender === 'K'
                                                                            ? 'bg-pink-50 border-pink-200 text-pink-700'
                                                                            : 'bg-sky-50 border-sky-200 text-sky-700'
                                                                    }`}>
                                                                        {currentGender === 'K' ? 'Kız (K)' : 'Erkek (E)'}
                                                                    </span>
                                                                ) : (
                                                                    <select
                                                                        value={currentGender}
                                                                        onChange={(e) => handleUpdateStudentGender?.(studentName, schoolCls || activeView, e.target.value as 'K' | 'E')}
                                                                        className={`px-3 py-1.5 rounded-xl border text-xs font-black outline-none cursor-pointer transition-all ${
                                                                            currentGender === 'K'
                                                                                ? 'bg-pink-50 border-pink-200 text-pink-700 hover:border-pink-400'
                                                                                : 'bg-sky-50 border-sky-200 text-sky-700 hover:border-sky-400'
                                                                        }`}
                                                                        title="Öğrenci cinsiyetini seçin veya değiştirin"
                                                                    >
                                                                        <option value="K">Kız (K)</option>
                                                                        <option value="E">Erkek (E)</option>
                                                                    </select>
                                                                )}
                                                            </td>
                                                            <td className="p-5 text-gray-500 font-medium">{studentUser?.username || '-'}</td>
                                                            <td className="p-5">
                                                                {schoolCls ? (
                                                                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs">
                                                                        {formatClassLabel(schoolCls)}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-xs font-semibold text-gray-400 italic">Sadece Rahle</span>
                                                                )}
                                                            </td>
                                                            <td className="p-5 text-amber-800 font-black">{formatClassLabel(activeView)}</td>
                                                            <td className="p-5 font-mono text-gray-400 font-bold">
                                                                {canModifyData ? (studentUser?.password || '****') : '••••'}
                                                            </td>
                                                            <td className="p-5">
                                                                {canModifyData ? (
                                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">
                                                                        Sadece Rahle Öğrencisi
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold"
                                                                        title="Bu öğrenci Rahle harici bir modül daha kullanmaktadır. Kişisel verileri Rahle modülünden güncellenemez."
                                                                    >
                                                                        <Lock size={12} /> Diğer Modüllerde Aktif
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="p-5 pr-6 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveStudentFromRahleClass?.(activeView, studentName)}
                                                                        className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                                                                        title="Öğrenciyi bu Rahle sınıfından çıkar (Hafızlık Havuzunda kalmaya devam eder)"
                                                                    >
                                                                        <UserMinus size={14} /> Sınıftan Çıkar
                                                                    </button>
                                                                    {canModifyData && (
                                                                        <>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => setEditUser(
                                                                                    studentUser
                                                                                        ? { ...studentUser, originalName: studentName, classLevel: activeView, isHafizlik: true, isRahleOnly: true, gender: currentGender }
                                                                                        : { name: studentName, originalName: studentName, role: 'student', classLevel: activeView, isHafizlik: true, isRahleOnly: true, gender: currentGender }
                                                                                )}
                                                                                className="text-orange-400 hover:text-orange-600 transition-colors p-2 hover:bg-orange-50 rounded-lg cursor-pointer"
                                                                                title="Öğrenci Verilerini Düzenle"
                                                                            >
                                                                                <Edit2 size={18} />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleDeleteUser(studentUser?.id || studentName)}
                                                                                className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg cursor-pointer"
                                                                                title="Öğrenciyi Tamamen Sil"
                                                                            >
                                                                                <Trash2 size={18} />
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {activeRahleClassStudents.length === 0 && (
                                                    <tr>
                                                        <td colSpan={9} className="p-12 text-center text-gray-400 font-medium bg-gray-50/30 italic">
                                                            Bu Rahle sınıfında henüz öğrenci bulunmuyor. Yukarıdaki "Hafızlık Havuzundan Öğrenci Ekle" bölümünden mevcut hafızları ekleyebilir veya aşağıdan yeni öğrenci oluşturabilirsiniz.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Add Brand-New (Rahle-Only) Students to This Rahle Class */}
                                    <div className="p-6 sm:p-8 bg-gray-50/40 border-t border-gray-100 space-y-4">
                                        <div>
                                            <h4 className="text-sm font-black text-amber-950 flex items-center gap-2">
                                                <UserPlus size={17} className="text-amber-700" />
                                                "{formatClassLabel(activeView)}" Sınıfına Yeni (Sadece Rahle) Öğrenci Ekle
                                            </h4>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                                Bu bölümden eklediğiniz yeni öğrenciler sadece Rahle modülüne ait olur ve verileri Rahle yöneticisi tarafından değiştirilebilir.
                                            </p>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <textarea
                                                value={rahleBulkNewStudentInput}
                                                onChange={e => setRahleBulkNewStudentInput(e.target.value)}
                                                placeholder="Örn: 123 - Ad Soyad - Cinsiyet(virgülle ayırın veya altalta girin"
                                                className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20 min-h-[80px] resize-none"
                                            />
                                            <div className="flex flex-col gap-2 md:self-end">
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        if (!rahleBulkNewStudentInput.trim()) return;
                                                        await handleAddRahleOnlyStudents?.(activeView, rahleBulkNewStudentInput);
                                                        setRahleBulkNewStudentInput('');
                                                    }}
                                                    className="bg-amber-600 hover:bg-amber-700 shadow-amber-100 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 h-fit cursor-pointer"
                                                >
                                                    <Plus size={18} /> Yeni Öğrenci Olarak Ekle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}

                {effectiveAdminTab === 'classes' && !isRahle && (
                    <div className="space-y-10">
                        {/* Class Selection & Add Class */}
                        <div className="space-y-3">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex flex-wrap gap-3">
                                    {Object.keys(classes).map(cls => {
                                        const isBeingDragged = draggedClass === cls;
                                        const isDragTarget = dragOverClass === cls && draggedClass !== cls;
                                        return (
                                            <div
                                                key={cls}
                                                draggable
                                                onDragStart={(e) => {
                                                    setDraggedClass(cls);
                                                    e.dataTransfer.effectAllowed = 'move';
                                                    try { e.dataTransfer.setData('text/plain', cls); } catch {}
                                                }}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    e.dataTransfer.dropEffect = 'move';
                                                    if (dragOverClass !== cls) setDragOverClass(cls);
                                                }}
                                                onDragLeave={() => {
                                                    if (dragOverClass === cls) setDragOverClass(null);
                                                }}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    const sourceCls = draggedClass || e.dataTransfer.getData('text/plain');
                                                    setDraggedClass(null);
                                                    setDragOverClass(null);
                                                    if (!sourceCls || sourceCls === cls) return;
                                                    const currentKeys = Object.keys(classes);
                                                    const fromIdx = currentKeys.indexOf(sourceCls);
                                                    const toIdx = currentKeys.indexOf(cls);
                                                    if (fromIdx === -1 || toIdx === -1) return;
                                                    const reordered = [...currentKeys];
                                                    const [moved] = reordered.splice(fromIdx, 1);
                                                    reordered.splice(toIdx, 0, moved);
                                                    handleReorderClasses?.(reordered);
                                                }}
                                                onDragEnd={() => {
                                                    setDraggedClass(null);
                                                    setDragOverClass(null);
                                                }}
                                                onClick={() => {
                                                    setSelectedAdminClass(cls);
                                                    setIsRenamingClass(false);
                                                    setRenameClassInput(formatClassLabel(cls));
                                                }}
                                                title="Sırasını değiştirmek için sürükleyip bırakın"
                                                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border shadow-sm cursor-grab active:cursor-grabbing flex items-center gap-2 select-none ${
                                                    isBeingDragged ? 'opacity-40 scale-95' : ''
                                                } ${
                                                    isDragTarget ? 'ring-2 ring-offset-2 ring-blue-500 scale-105' : ''
                                                } ${
                                                    selectedAdminClass === cls
                                                        ? (isRahle ? 'bg-amber-600 text-white border-amber-600 shadow-amber-100' : 'bg-blue-600 text-white border-blue-600 shadow-blue-100')
                                                        : (isRahle ? 'bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:bg-amber-50/50' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50')
                                                }`}
                                            >
                                                <GripVertical size={15} className={selectedAdminClass === cls ? 'text-white/75' : 'text-gray-300'} />
                                                <span>{formatClassLabel(cls)} Sınıfı</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-3 bg-white p-2.5 rounded-[24px] border border-gray-100 shadow-sm w-full md:w-auto">
                                    <input
                                        type="text"
                                        value={newClassName}
                                        onChange={e => setNewClassName(e.target.value)}
                                        placeholder="Sınıf Adı (Örn: 5A)"
                                        className="bg-gray-50 border-none px-5 py-2.5 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500/20 w-full md:w-48"
                                    />
                                    <button
                                        onClick={() => {
                                            handleAddClass(newClassName);
                                            setNewClassName('');
                                        }}
                                        className={`${isRahle ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'} text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap shadow-lg cursor-pointer`}
                                    >
                                        Sınıf Ekle
                                    </button>
                                </div>
                            </div>
                            {Object.keys(classes).length > 1 && (
                                <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
                                    <GripVertical size={13} className="text-gray-300" />
                                    Sınıf butonlarını sürükleyip bırakarak sınıfların sıralamasını değiştirebilirsiniz.
                                </p>
                            )}
                        </div>

                        {selectedAdminClass && typeof selectedAdminClass === 'string' ? (
                            <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                                <div className="p-8 border-b border-gray-100 bg-[#FBFBFC] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shadow-xl ${isRahle ? 'bg-amber-600 shadow-amber-200' : 'bg-blue-600 shadow-blue-200'}`}>
                                            <Users className="text-white" size={28} />
                                        </div>
                                        <div>
                                            {isRenamingClass ? (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={renameClassInput}
                                                        onChange={e => setRenameClassInput(e.target.value)}
                                                        onKeyDown={async (e) => {
                                                            if (e.key === 'Enter') {
                                                                const updated = await handleRenameClass?.(selectedAdminClass, renameClassInput);
                                                                if (updated) {
                                                                    const nextCls = typeof updated === 'string' ? updated : renameClassInput.trim().toUpperCase().replace(/^_+/, '');
                                                                    setSelectedAdminClass(nextCls);
                                                                    setIsRenamingClass(false);
                                                                }
                                                            } else if (e.key === 'Escape') {
                                                                setIsRenamingClass(false);
                                                            }
                                                        }}
                                                        placeholder="Yeni Sınıf Adı (Örn: 5-A)"
                                                        autoFocus
                                                        className="bg-white border-2 border-blue-500 px-4 py-2 rounded-xl text-base font-black text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/10 w-44"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={async () => {
                                                            const updated = await handleRenameClass?.(selectedAdminClass, renameClassInput);
                                                            if (updated) {
                                                                const nextCls = typeof updated === 'string' ? updated : renameClassInput.trim().toUpperCase().replace(/^_+/, '');
                                                                setSelectedAdminClass(nextCls);
                                                                setIsRenamingClass(false);
                                                            }
                                                        }}
                                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                                                    >
                                                        <Save size={14} /> Kaydet
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsRenamingClass(false)}
                                                        className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-xs cursor-pointer"
                                                    >
                                                        İptal
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <h3 className={`font-black text-2xl tracking-tight ${isRahle ? 'text-amber-900' : 'text-blue-900'}`}>{formatClassLabel(selectedAdminClass)} Sınıf Listesi</h3>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setRenameClassInput(formatClassLabel(selectedAdminClass));
                                                            setIsRenamingClass(true);
                                                        }}
                                                        className="p-2 rounded-xl bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                                                        title="Sınıf Adını Değiştir"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{classes[selectedAdminClass]?.length || 0} ÖĞRENCİ MEVCUDU</p>
                                                <span className="text-gray-300">•</span>
                                                <p className="text-[11px] font-black text-amber-600 uppercase tracking-[0.15em]">
                                                    {(classes[selectedAdminClass] || []).filter((sName: string) => {
                                                        const sUser = schoolUsers.find((u: any) => u.name === sName && u.role === 'student');
                                                        return isStudentHafizlik ? isStudentHafizlik(sName, sUser) : Boolean(sUser?.isHafizlik || (state.hafizlikStudents || []).includes(sName));
                                                    }).length} HAFIZLIK ÖĞRENCİSİ
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-5 py-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 font-black text-xs uppercase tracking-widest select-none">
                                            Sınıf Rehber Öğretmeni
                                        </span>
                                        <select
                                            value={classAdvisors?.[selectedAdminClass] || classAdvisors?.[formatClassLabel(selectedAdminClass)] || ''}
                                            onChange={(e) => handleUpdateClassAdvisor?.(selectedAdminClass, e.target.value)}
                                            className="px-4 py-3 bg-white text-gray-800 rounded-2xl border border-gray-200 font-bold text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer min-w-[220px] shadow-xs"
                                        >
                                            <option value="">— Öğretmen Seçiniz —</option>
                                            {(schoolUsers || [])
                                                .filter((u: any) => u.role === 'teacher' || u.role === 'öğretmen')
                                                .sort((a: any, b: any) => String(a.name || '').localeCompare(String(b.name || ''), 'tr'))
                                                .map((t: any, tIdx: number) => (
                                                    <option key={t.id || `${t.name}-${tIdx}`} value={t.name}>
                                                        {t.name}{t.branch ? ` (${t.branch})` : ''}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {!isRenamingClass && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRenameClassInput(formatClassLabel(selectedAdminClass));
                                                    setIsRenamingClass(true);
                                                }}
                                                className="flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Edit2 size={15} /> Sınıf Adını Değiştir
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleDeleteClass(selectedAdminClass, () => setSelectedAdminClass(null));
                                            }}
                                            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all group cursor-pointer"
                                        >
                                            <Trash2 size={16} className="group-hover:scale-110 transition-transform" /> Sınıfı Sil
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-200">
                                            <tr>
                                                <th className="p-6">OKUL NO</th>
                                                <th className="p-6">AD SOYAD</th>
                                                <th className="p-6">CİNSİYET</th>
                                                <th className="p-6">KULLANICI ADI</th>
                                                <th className="p-6">DEVAM DURUMU</th>
                                                <th className="p-6">SINIF</th>
                                                <th className="p-6">ŞİFRE</th>
                                                <th className="p-6 text-center">HAFIZLIK ÖĞRENCİSİ Mİ?</th>
                                                <th className="p-6 text-right">İŞLEMLER</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {(classes[selectedAdminClass] || [])
                                                .filter((studentName: string) => {
                                                    if (!activeGenderFilter) return true;
                                                    const studentUser = schoolUsers.find((u: any) => u.name === studentName && u.role === 'student');
                                                    const isHafizlik = isStudentHafizlik
                                                        ? isStudentHafizlik(studentName, studentUser)
                                                        : Boolean(studentUser?.isHafizlik || (state.hafizlikStudents || []).includes(studentName));
                                                    return isHafizlik && resolveStudentGender(studentName, studentUser) === activeGenderFilter;
                                                })
                                                .map((studentName: string, idx: number) => {
                                                const studentUser = schoolUsers.find((u: any) => u.name === studentName && u.role === 'student');
                                                const match = studentName.match(/^(\d+)\s*[-]\s*(.+)$/);
                                                const okulNo = match ? match[1] : '-';
                                                const pureName = match ? match[2] : studentName;
                                                const isHafizlik = isStudentHafizlik
                                                    ? isStudentHafizlik(studentName, studentUser)
                                                    : Boolean(studentUser?.isHafizlik || (state.hafizlikStudents || []).includes(studentName));
                                                const currentGender = resolveStudentGender(studentName, studentUser);
                                                const currentAttendanceStatus: 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu' = getStudentAttendanceStatus
                                                    ? getStudentAttendanceStatus(studentName, studentUser)
                                                    : (studentUser?.attendanceStatus === 'Sürekli Devamsız' || studentUser?.attendanceStatus === 'Kayıt Dondurdu'
                                                        ? studentUser.attendanceStatus
                                                        : 'Devam Eden');
                                                return (
                                                    <tr key={`${studentName}-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="p-6 font-bold text-gray-400">{okulNo}</td>
                                                        <td className="p-6 font-bold text-gray-900">{pureName}</td>
                                                        <td className="p-6">
                                                            {staffGenderFilter ? (
                                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-xl border text-xs font-black ${
                                                                    currentGender === 'K'
                                                                        ? 'bg-pink-50 border-pink-200 text-pink-700'
                                                                        : 'bg-sky-50 border-sky-200 text-sky-700'
                                                                }`}>
                                                                    {currentGender === 'K' ? 'Kız (K)' : 'Erkek (E)'}
                                                                </span>
                                                            ) : (
                                                                <select
                                                                    value={currentGender}
                                                                    onChange={(e) => handleUpdateStudentGender?.(studentName, selectedAdminClass, e.target.value as 'K' | 'E')}
                                                                    className={`px-3 py-1.5 rounded-xl border text-xs font-black outline-none cursor-pointer transition-all ${
                                                                        currentGender === 'K'
                                                                            ? 'bg-pink-50 border-pink-200 text-pink-700 hover:border-pink-400'
                                                                            : 'bg-sky-50 border-sky-200 text-sky-700 hover:border-sky-400'
                                                                    }`}
                                                                    title="Öğrenci cinsiyetini seçin veya değiştirin"
                                                                >
                                                                    <option value="K">Kız (K)</option>
                                                                    <option value="E">Erkek (E)</option>
                                                                </select>
                                                            )}
                                                        </td>
                                                        <td className="p-6 text-gray-500 font-medium">{studentUser?.username || '-'}</td>
                                                        <td className="p-6">
                                                            <select
                                                                value={currentAttendanceStatus}
                                                                onChange={(e) => handleUpdateStudentAttendanceStatus?.(studentName, selectedAdminClass, e.target.value as 'Devam Eden' | 'Sürekli Devamsız' | 'Kayıt Dondurdu')}
                                                                className={`px-3 py-1.5 rounded-xl border text-xs font-black outline-none cursor-pointer transition-all ${
                                                                    currentAttendanceStatus === 'Sürekli Devamsız'
                                                                        ? 'bg-rose-50 border-rose-200 text-rose-700 hover:border-rose-400'
                                                                        : currentAttendanceStatus === 'Kayıt Dondurdu'
                                                                        ? 'bg-amber-50 border-amber-200 text-amber-700 hover:border-amber-400'
                                                                        : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400'
                                                                }`}
                                                                title="Öğrenci devam durumunu seçin veya değiştirin"
                                                            >
                                                                <option value="Devam Eden">Devam Eden</option>
                                                                <option value="Sürekli Devamsız">Sürekli Devamsız</option>
                                                                <option value="Kayıt Dondurdu">Kayıt Dondurdu</option>
                                                            </select>
                                                        </td>
                                                        <td className="p-6 text-gray-600 font-bold">{formatClassLabel(selectedAdminClass)}</td>
                                                        <td className="p-6 font-mono text-gray-400 font-bold">{studentUser?.password || '****'}</td>
                                                        <td className="p-6 text-center">
                                                            <label className="inline-flex items-center justify-center gap-2 cursor-pointer select-none">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isHafizlik}
                                                                    onChange={(e) => handleToggleStudentHafizlik?.(studentName, selectedAdminClass, e.target.checked)}
                                                                    className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                                                                />
                                                                {isHafizlik && (
                                                                    <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                                                                        Hafız
                                                                    </span>
                                                                )}
                                                            </label>
                                                        </td>
                                                        <td className="p-6 text-right">
                                                            <div className="flex items-center justify-end gap-3">
                                                                <button onClick={() => setEditUser(studentUser ? { ...studentUser, isHafizlik, gender: currentGender, attendanceStatus: currentAttendanceStatus } : { name: studentName, role: 'student', classLevel: selectedAdminClass, isHafizlik, gender: currentGender, attendanceStatus: currentAttendanceStatus })} className="text-orange-400 hover:text-orange-600 transition-colors p-2 hover:bg-orange-50 rounded-lg" title="Düzenle"><Edit2 size={18}/></button>
                                                                <button onClick={() => handleDeleteUser(studentUser?.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg" title="Sil"><Trash2 size={18}/></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {(!classes[selectedAdminClass] || classes[selectedAdminClass].length === 0) && (
                                                <tr key="empty_students">
                                                    <td colSpan={9} className="p-12 text-center text-gray-400 font-medium bg-gray-50/30 italic">
                                                        Bu sınıfta henüz kayıtlı öğrenci bulunmuyor.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Bulk Add Students */}
                                <div className="p-6 bg-gray-50/30 border-t border-gray-100">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <textarea
                                            value={bulkStudentInput}
                                            onChange={e => setBulkStudentInput(e.target.value)}
                                            placeholder="Örn: 123 - Ad Soyad - Cinsiyet(virgülle ayırın veya altalta girin"
                                            className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px] resize-none"
                                        />
                                        <div className="flex flex-col gap-2 md:self-end">
                                            <input 
                                                type="file" 
                                                id="excel-upload" 
                                                className="hidden" 
                                                accept=".xlsx, .xls"
                                                onChange={(e) => {
                                                    handleExcelUpload(e, selectedAdminClass);
                                                }}
                                            />
                                            <label 
                                                htmlFor="excel-upload"
                                                className={`bg-white border-2 border-dashed px-8 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer h-fit ${
                                                    isRahle ? 'text-amber-700 border-amber-200 hover:bg-amber-50' : 'text-blue-600 border-blue-100 hover:bg-blue-50'
                                                }`}
                                            >
                                                <Upload size={18} /> Excel'den Yükle
                                            </label>
                                            <button
                                                onClick={() => {
                                                    handleBulkAddStudents(selectedAdminClass, bulkStudentInput);
                                                    setBulkStudentInput('');
                                                }}
                                                className={`${isRahle ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'} text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 h-fit cursor-pointer`}
                                            >
                                                <Plus size={18} /> Toplu Ekle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${isRahle ? 'bg-amber-50' : 'bg-blue-50'}`}>
                                    <LayoutGrid size={40} className={isRahle ? 'text-amber-300' : 'text-blue-200'} />
                                </div>
                                <h3 className={`text-xl font-black mb-2 ${isRahle ? 'text-amber-900' : 'text-blue-900'}`}>Sınıf Seçiniz</h3>
                                <p className="text-gray-400 font-medium max-w-xs mx-auto">Öğrenci listesini görüntülemek ve yönetmek için yukarıdan bir sınıf seçin.</p>
                            </div>
                        )}
                    </div>
                )}

                {(effectiveAdminTab === 'rahle_students' || effectiveAdminTab === 'rahle_planning' || effectiveAdminTab === 'rahle_criteria' || effectiveAdminTab === 'rahle_stats') && (
                    <RahleAdminModules
                        activeSubTab={effectiveAdminTab as any}
                        classes={getRahleFilteredClasses ? getRahleFilteredClasses(classes) : classes}
                        users={staffGenderFilter ? visibleStaffUsers : users}
                        activeSchoolId={activeSchoolId}
                        showToast={actions.showToast}
                    />
                )}

                {effectiveAdminTab === 'pusula_akademi_gelisim' && (
                    <PusulaAdminClassManager
                        activeSchoolId={activeSchoolId}
                        showToast={actions.showToast}
                    />
                )}

                {effectiveAdminTab === 'academic_year' && (
                    <AcademicYearManager 
                        activeSchoolId={activeSchoolId}
                        currentSchool={currentSchool}
                        classes={classes}
                        users={users}
                        activeAcademicYear={state.activeAcademicYear || '2025-2026'}
                        pastAcademicYears={state.pastAcademicYears || []}
                        viewingAcademicYear={state.viewingAcademicYear || state.activeAcademicYear || '2025-2026'}
                        onSetViewingAcademicYear={actions.handleSetViewingAcademicYear}
                        onUpdateAcademicYearConfig={actions.handleUpdateAcademicYearConfig}
                        onExecuteYearCloseAndAdvancement={actions.handleExecuteYearCloseAndAdvancement}
                        archives={state.academicArchives || {}}
                        currentUser={state.currentUser}
                    />
                )}

                {effectiveAdminTab === 'tasks' && (
                    <div className="space-y-12 pb-10">
                        {/* Top Cards: Success Descriptions, Uncompleted Reasons, and Remedial Tasks */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-10">
                            {/* Success Descriptions Card */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                                            <Award size={32} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-blue-900 text-2xl tracking-tight leading-none mb-1">Başarı Seviyeleri</h3>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">"YAPTI" Durumu Açıklamaları</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (true) {
                                                [1, 2, 3, 4, 5].forEach(level => {
                                                    const { INITIAL_SUCCESS_DESCRIPTIONS } = require('../lib/constants');
                                                    handleUpdateSuccessDescription(level, INITIAL_SUCCESS_DESCRIPTIONS[level]);
                                                });
                                            }
                                        }}
                                        className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl transition-all"
                                    >
                                        Varsayılanları Yükle
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div key={level} className="group">
                                            <div className="flex items-start gap-6">
                                                <div className="w-10 h-10 rounded-full border-2 border-green-100 bg-green-50 flex items-center justify-center text-green-600 font-black text-sm shrink-0 mt-0.5 group-hover:border-green-400 transition-colors">
                                                    {level}
                                                </div>
                                                
                                                <div className="flex-1">
                                                    {editingField?.type === 'success' && editingField?.level === level ? (
                                                        <textarea
                                                            autoFocus
                                                            value={successDescriptions?.[level] || ''}
                                                            onChange={(e) => handleUpdateSuccessDescription(level, e.target.value)}
                                                            onBlur={() => setEditingField(null)}
                                                            className="w-full bg-white border-2 border-green-500/30 px-4 py-3 rounded-2xl text-base font-medium text-gray-700 outline-none transition-all min-h-[80px] resize-y shadow-sm"
                                                        />
                                                    ) : (
                                                        <div 
                                                            onClick={() => setEditingField({ type: 'success', level })}
                                                            className="w-full px-2 py-2 rounded-xl text-base font-medium text-gray-700 cursor-pointer hover:bg-green-50/50 transition-all border border-transparent flex items-center min-h-[40px]"
                                                        >
                                                            {successDescriptions?.[level] || <span className="text-gray-300 italic">Açıklama ekle...</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Uncompleted Reasons Card */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-sm border border-red-100">
                                            <AlertTriangle size={32} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-blue-900 text-2xl tracking-tight leading-none mb-1">Mazeret Sebepleri</h3>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">"YAPMADI" Durumu Açıklamaları</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (true) {
                                                [1, 2, 3, 4, 5].forEach(level => {
                                                    const { INITIAL_UNCOMPLETED_REASONS } = require('../lib/constants');
                                                    handleUpdateUncompletedReason(level, INITIAL_UNCOMPLETED_REASONS[level]);
                                                });
                                            }
                                        }}
                                        className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl transition-all"
                                    >
                                        Varsayılanları Yükle
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    {[1, 2, 3, 4, 5].map((level) => {
                                        let levelTitle = "";
                                        if (level === 1) levelTitle = "Seviye 1 (Unutkanlık / Dikkatsizlik)";
                                        if (level === 2) levelTitle = "Seviye 2 (İmkan / Ortam Yetersizliği)";
                                        if (level === 3) levelTitle = "Seviye 3 (Erteleme / Zaman Yönetimi)";
                                        if (level === 4) levelTitle = "Seviye 4 (İsteksizlik / Motivasyon Kaybı)";
                                        if (level === 5) levelTitle = "Seviye 5 (Bilinçli Reddetme / Önemsememe)";

                                        return (
                                            <div key={level} className="group">
                                                <div className="flex items-start gap-6">
                                                    <div className="w-10 h-10 rounded-full border-2 border-red-100 bg-red-50 flex items-center justify-center text-red-600 font-black text-sm shrink-0 mt-0.5 group-hover:border-red-400 transition-colors animate-fade-in">
                                                        {level}
                                                    </div>
                                                    
                                                    <div className="flex-1 space-y-1">
                                                        <div className="text-[11px] font-black text-red-500 uppercase tracking-wider">{levelTitle}</div>
                                                        {editingField?.type === 'uncompleted' && editingField?.level === level ? (
                                                            <textarea
                                                                autoFocus
                                                                value={uncompletedReasons?.[level] || ''}
                                                                onChange={(e) => handleUpdateUncompletedReason(level, e.target.value)}
                                                                onBlur={() => setEditingField(null)}
                                                                className="w-full bg-white border-2 border-red-500/30 px-4 py-3 rounded-2xl text-base font-medium text-gray-700 outline-none transition-all min-h-[80px] resize-y shadow-sm"
                                                            />
                                                        ) : (
                                                            <div 
                                                                onClick={() => setEditingField({ type: 'uncompleted', level })}
                                                                className="w-full px-2 py-2 rounded-xl text-base font-medium text-gray-700 cursor-pointer hover:bg-red-50/50 transition-all border border-transparent flex items-center min-h-[40px]"
                                                            >
                                                                {uncompletedReasons?.[level] || <span className="text-gray-300 italic">Mazeret sebebi ekle...</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Remedial Tasks Card */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                                            <AlertCircle size={32} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-blue-900 text-2xl tracking-tight leading-none mb-1">Telafi Görevleri</h3>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">"YAPAMADI" Durumu İçerikleri</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (true) {
                                                [1, 2, 3, 4, 5].forEach(level => {
                                                    const { INITIAL_REMEDIAL_TASKS, INITIAL_REMEDIAL_PROBLEMS } = require('../lib/constants');
                                                    handleUpdateRemedialTask(level, INITIAL_REMEDIAL_TASKS[level]);
                                                    handleUpdateRemedialProblem(level, INITIAL_REMEDIAL_PROBLEMS[level]);
                                                });
                                            }
                                        }}
                                        className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl transition-all"
                                    >
                                        Varsayılanları Yükle
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div key={level} className="group">
                                            <div className="flex items-start gap-6">
                                                <div className="w-10 h-10 rounded-full border-2 border-orange-200 bg-orange-50 flex items-center justify-center text-orange-600 font-black text-sm shrink-0 mt-0.5 group-hover:border-orange-400 transition-colors">
                                                    {level}
                                                </div>
                                                
                                                <div className="flex-1 space-y-3">
                                                    {/* Remedial Task */}
                                                    <div className="space-y-1">
                                                        {editingField?.type === 'remedial' && editingField?.level === level ? (
                                                            <textarea
                                                                autoFocus
                                                                value={remedialTasks?.[level] || ''}
                                                                onChange={(e) => handleUpdateRemedialTask(level, e.target.value)}
                                                                onBlur={() => setEditingField(null)}
                                                                className="w-full bg-white border-2 border-orange-500/30 px-4 py-3 rounded-2xl text-base font-medium text-gray-700 outline-none transition-all min-h-[80px] resize-y shadow-sm"
                                                            />
                                                        ) : (
                                                            <div 
                                                                onClick={() => setEditingField({ type: 'remedial', level })}
                                                                className="w-full px-2 py-2 rounded-xl text-base font-medium text-gray-700 cursor-pointer hover:bg-orange-50/50 transition-all border border-transparent flex items-center min-h-[40px]"
                                                            >
                                                                {remedialTasks?.[level] || <span className="text-gray-300 italic">Ödev ekle...</span>}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Problem Description (Subtle) */}
                                                    <div className="pl-2">
                                                        {editingField?.type === 'problem' && editingField?.level === level ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] font-black text-orange-400 uppercase shrink-0">SORUN:</span>
                                                                <input
                                                                    autoFocus
                                                                    type="text"
                                                                    value={remedialProblems?.[level] || ''}
                                                                    onChange={(e) => handleUpdateRemedialProblem(level, e.target.value)}
                                                                    onBlur={() => setEditingField(null)}
                                                                    className="flex-1 bg-white border-b border-orange-200 px-1 py-0.5 text-[11px] font-bold text-orange-600 outline-none"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div 
                                                                onClick={() => setEditingField({ type: 'problem', level })}
                                                                className="text-[11px] font-bold text-orange-400/70 hover:text-orange-600 cursor-pointer transition-colors flex items-center gap-2"
                                                            >
                                                                <span className="uppercase text-[9px] font-black tracking-tighter">NEDEN:</span>
                                                                {remedialProblems?.[level] || "Belirtilmemiş"}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Categories and Tasks Section */}
                        <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-[#FBFBFC]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                                        <LayoutGrid size={28} />
                                    </div>
                                    <h3 className="font-black text-blue-900 text-2xl tracking-tight">Kategoriler ve Görevler</h3>
                                </div>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={e => setNewCategory(e.target.value)}
                                        placeholder="Yeni Kategori Adı"
                                        className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 w-64 transition-all"
                                    />
                                    <button
                                        onClick={() => {
                                            handleAddCategory(newCategory);
                                            setNewCategory('');
                                        }}
                                        className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                    >
                                        Kategori Ekle
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                {categories.map((cat: string) => {
                                    const catTasks = Array.isArray(tasks) 
                                        ? tasks.filter((t: any) => t.category === cat)
                                        : (tasks[cat] || []);

                                    return (
                                        <div key={cat} className="border border-gray-200 rounded-2xl overflow-hidden">
                                            <div className="bg-gray-50/50 p-4 border-b border-gray-200 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    {editingField?.type === 'category' && editingField?.id === cat ? (
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            defaultValue={cat}
                                                            onBlur={(e) => {
                                                                const newName = e.target.value;
                                                                if (newName && newName !== cat) handleUpdateCategory(cat, newName);
                                                                setEditingField(null);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const newName = (e.target as HTMLInputElement).value;
                                                                    if (newName && newName !== cat) handleUpdateCategory(cat, newName);
                                                                    setEditingField(null);
                                                                }
                                                            }}
                                                            className="bg-white border border-blue-400 px-2 py-1 rounded-lg text-sm font-black uppercase tracking-wider outline-none"
                                                        />
                                                    ) : (
                                                        <>
                                                            <h4 className="font-black text-blue-900 uppercase tracking-wider">{cat}</h4>
                                                            <button 
                                                                onClick={() => setEditingField({ type: 'category', id: cat })}
                                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                                            >
                                                                <Edit2 size={14} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                                <button 
                                                    onClick={() => handleDeleteCategory(cat)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="p-4 space-y-4">
                                                <div className="space-y-3">
                                                    {catTasks.map((task: any, idx: number) => {
                                                        const taskTitle = typeof task === 'string' ? task : task.title;
                                                        const isEditing = editingField?.type === 'task' && editingField?.category === cat && editingField?.id === idx;

                                                        return (
                                                            <div key={idx} className={`flex items-start justify-between group p-2 rounded-xl transition-all ${isEditing ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}>
                                                                <div className="flex items-start gap-4 flex-1">
                                                                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-black text-[10px] shrink-0 mt-1">
                                                                        {idx + 1}
                                                                    </div>
                                                                    {isEditing ? (
                                                                        <textarea
                                                                            autoFocus
                                                                            defaultValue={taskTitle}
                                                                            onBlur={(e) => {
                                                                                const newTitle = e.target.value;
                                                                                if (newTitle && newTitle !== taskTitle) handleUpdateTask(task, newTitle);
                                                                                setEditingField(null);
                                                                            }}
                                                                            className="flex-1 bg-white border-2 border-blue-400 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 outline-none shadow-sm min-h-[60px] resize-y"
                                                                        />
                                                                    ) : (
                                                                        <span 
                                                                            onClick={() => setEditingField({ type: 'task', category: cat, id: idx })}
                                                                            className="text-sm font-medium text-gray-700 cursor-pointer flex-1 py-1"
                                                                        >
                                                                            {taskTitle}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <button 
                                                                    onClick={() => handleDeleteTask(task)}
                                                                    className={`text-gray-300 hover:text-red-500 transition-all p-1.5 hover:bg-red-50 rounded-lg shrink-0 ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                    {catTasks.length === 0 && (
                                                        <div className="text-center py-4 text-gray-400 italic text-xs">Bu kategoride henüz görev yok.</div>
                                                    )}
                                                </div>
                                                
                                                <div className="pt-4 border-t border-gray-50 flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Bu kategoriye yeni bir görev ekle..."
                                                        className="flex-1 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleAddTask({ title: (e.target as HTMLInputElement).value, category: cat, points: 10 });
                                                                (e.target as HTMLInputElement).value = '';
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            const input = (e.currentTarget.previousSibling as HTMLInputElement);
                                                            if (input.value) {
                                                                handleAddTask({ title: input.value, category: cat, points: 10 });
                                                                input.value = '';
                                                            }
                                                        }}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all"
                                                    >
                                                        Görev Ekle
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {effectiveAdminTab === 'devcard' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
                        
                        {/* Rozet Ayarları */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Award size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-blue-900 tracking-tight">Gelişim Kartı Rozet Ayarları (Örn: Lojistik Sorumlusu)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(devCardConfig.manualBadges || []).map((badge: any, idx: number) => (
                                    <div key={badge.id} className="bg-white border border-gray-200 p-4 rounded-2xl flex flex-col gap-2 relative group">
                                        <input
                                            type="text"
                                            value={badge.name}
                                            onChange={(e) => {
                                                const newBadges = [...(devCardConfig.manualBadges || [])];
                                                newBadges[idx] = { ...newBadges[idx], name: e.target.value };
                                                handleUpdateDevCardConfig({ ...devCardConfig, manualBadges: newBadges });
                                            }}
                                            className="w-full font-bold text-sm text-gray-800 outline-none bg-transparent"
                                        />
                                        <button
                                            onClick={() => {
                                                const newBadges = (devCardConfig.manualBadges || []).filter((_: any, i: number) => i !== idx);
                                                handleUpdateDevCardConfig({ ...devCardConfig, manualBadges: newBadges });
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newBadges = [...(devCardConfig.manualBadges || []), { id: Date.now(), name: 'Yeni Rozet' }];
                                        handleUpdateDevCardConfig({ ...devCardConfig, manualBadges: newBadges });
                                    }}
                                    className="bg-blue-50/50 border-2 border-dashed border-blue-200 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors text-blue-600 font-bold text-sm"
                                >
                                    <Plus size={16} /> Rozet Ekle
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Levels (Seviyeler) */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Trophy size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 tracking-tight">Seviyeler (Kapsam)</h3>
                                </div>

                                <div className="space-y-6">
                                    {devCardConfig.levels.map((level: any, idx: number) => (
                                        <div key={level.id} className="flex items-start gap-4 group">
                                            <div className="text-sm font-black text-gray-300 mt-4 w-4">{idx + 1}.</div>
                                            <div className="flex-1 bg-gray-50/50 border border-gray-200 p-6 rounded-[32px] space-y-4 group-hover:bg-white group-hover:border-blue-100 transition-all">
                                                <div className="flex gap-4">
                                                    <input 
                                                        type="text" 
                                                        value={level.name}
                                                        onChange={(e) => {
                                                            const newLevels = [...devCardConfig.levels];
                                                            newLevels[idx] = { ...newLevels[idx], name: e.target.value };
                                                            handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                                        }}
                                                        className="flex-1 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
                                                    />
                                                    <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase">Puan</span>
                                                        <input 
                                                            type="number" 
                                                            value={level.score}
                                                            onChange={(e) => {
                                                                const newLevels = [...devCardConfig.levels];
                                                                newLevels[idx] = { ...newLevels[idx], score: parseInt(e.target.value) || 0 };
                                                                handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                                            }}
                                                            className="w-10 text-center text-base font-black text-blue-600 outline-none"
                                                        />
                                                        <div className="flex flex-col text-gray-400">
                                                            <button onClick={() => {
                                                                const newLevels = [...devCardConfig.levels];
                                                                newLevels[idx] = { ...newLevels[idx], score: (newLevels[idx].score || 0) + 1 };
                                                                handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                                            }} className="hover:text-blue-500 transition-colors"><ChevronUp size={14}/></button>
                                                            <button onClick={() => {
                                                                const newLevels = [...devCardConfig.levels];
                                                                newLevels[idx] = { ...newLevels[idx], score: Math.max(0, (newLevels[idx].score || 0) - 1) };
                                                                handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                                            }} className="hover:text-blue-500 transition-colors"><ChevronDown size={14}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea 
                                                    value={level.desc}
                                                    placeholder="Seviye açıklaması..."
                                                    onChange={(e) => {
                                                        const newLevels = [...devCardConfig.levels];
                                                        newLevels[idx] = { ...newLevels[idx], desc: e.target.value };
                                                        handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                                    }}
                                                    className="w-full bg-transparent text-xs font-medium text-gray-500 outline-none px-1 resize-none border-none focus:ring-0"
                                                />
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    const newLevels = devCardConfig.levels.filter((_: any, i: number) => i !== idx);
                                                    handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                                }}
                                                className="mt-6 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-xl"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => {
                                        const newLevels = [...devCardConfig.levels, { id: Date.now(), name: 'Yeni Seviye', score: 1, desc: '' }];
                                        handleUpdateDevCardConfig({ ...devCardConfig, levels: newLevels });
                                    }}
                                    className="w-full py-5 border-2 border-dashed border-blue-100 rounded-[32px] text-blue-600 font-black text-sm hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} /> Yeni Seviye Ekle
                                </button>
                            </div>

                            {/* Rubrics (Çarpanlar) */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Star size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 tracking-tight">Başarı Çarpanları (Rubrik)</h3>
                                </div>

                                <div className="space-y-6">
                                    {devCardConfig.rubrics.map((rubric: any, idx: number) => (
                                        <div key={rubric.id} className="flex items-start gap-4 group">
                                            <div className="text-sm font-black text-gray-300 mt-4 w-4">{idx + 1}.</div>
                                            <div className="flex-1 bg-gray-50/50 border border-gray-100 p-6 rounded-[32px] space-y-4 group-hover:bg-white group-hover:border-blue-100 transition-all">
                                                <div className="flex gap-4">
                                                    <input 
                                                        type="text" 
                                                        value={rubric.name}
                                                        onChange={(e) => {
                                                            const newRubrics = [...devCardConfig.rubrics];
                                                            newRubrics[idx] = { ...newRubrics[idx], name: e.target.value };
                                                            handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                                        }}
                                                        className="flex-1 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
                                                    />
                                                    <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase">x</span>
                                                        <input 
                                                            type="number" 
                                                            value={rubric.multiplier}
                                                            onChange={(e) => {
                                                                const newRubrics = [...devCardConfig.rubrics];
                                                                newRubrics[idx] = { ...newRubrics[idx], multiplier: parseInt(e.target.value) || 1 };
                                                                handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                                            }}
                                                            className="w-10 text-center text-base font-black text-emerald-600 outline-none"
                                                        />
                                                        <div className="flex flex-col text-gray-400">
                                                            <button onClick={() => {
                                                                const newRubrics = [...devCardConfig.rubrics];
                                                                newRubrics[idx] = { ...newRubrics[idx], multiplier: (newRubrics[idx].multiplier || 1) + 1 };
                                                                handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                                            }} className="hover:text-emerald-500 transition-colors"><ChevronUp size={14}/></button>
                                                            <button onClick={() => {
                                                                const newRubrics = [...devCardConfig.rubrics];
                                                                newRubrics[idx] = { ...newRubrics[idx], multiplier: Math.max(1, (newRubrics[idx].multiplier || 1) - 1) };
                                                                handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                                            }} className="hover:text-emerald-500 transition-colors"><ChevronDown size={14}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea 
                                                    value={rubric.desc}
                                                    placeholder="Çarpan açıklaması..."
                                                    onChange={(e) => {
                                                        const newRubrics = [...devCardConfig.rubrics];
                                                        newRubrics[idx] = { ...newRubrics[idx], desc: e.target.value };
                                                        handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                                    }}
                                                    className="w-full bg-transparent text-xs font-medium text-gray-500 outline-none px-1 resize-none border-none focus:ring-0"
                                                />
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    const newRubrics = devCardConfig.rubrics.filter((_: any, i: number) => i !== idx);
                                                    handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                                }}
                                                className="mt-6 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-xl"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => {
                                        const newRubrics = [...devCardConfig.rubrics, { id: Date.now(), name: 'Yeni Çarpan', multiplier: 1, desc: '' }];
                                        handleUpdateDevCardConfig({ ...devCardConfig, rubrics: newRubrics });
                                    }}
                                    className="w-full py-5 border-2 border-dashed border-emerald-100 rounded-[32px] text-emerald-600 font-black text-sm hover:bg-emerald-50 hover:border-emerald-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} /> Yeni Çarpan Ekle
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Award size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-blue-900 tracking-tight">Kazanımlar & Unvanlar</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {devCardConfig.titles.map((title: any, idx: number) => (
                                    <div key={title.id} className="bg-blue-50/30 border border-blue-100 p-8 rounded-[40px] space-y-6 relative group hover:bg-white hover:border-blue-300 transition-all">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">AŞAMA {idx + 1}</span>
                                            <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
                                                <span className="text-[10px] font-black text-gray-400">≥</span>
                                                <input 
                                                    type="number" 
                                                    value={title.threshold}
                                                    onChange={(e) => {
                                                        const newTitles = [...devCardConfig.titles];
                                                        newTitles[idx] = { ...newTitles[idx], threshold: parseInt(e.target.value) || 0 };
                                                        handleUpdateDevCardConfig({ ...devCardConfig, titles: newTitles });
                                                    }}
                                                    className="w-10 text-center text-xs font-black text-blue-600 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <input 
                                                type="text" 
                                                value={title.name}
                                                onChange={(e) => {
                                                    const newTitles = [...devCardConfig.titles];
                                                    newTitles[idx] = { ...newTitles[idx], name: e.target.value };
                                                    handleUpdateDevCardConfig({ ...devCardConfig, titles: newTitles });
                                                }}
                                                className="w-full bg-transparent text-xl font-black text-gray-900 outline-none placeholder-gray-300"
                                                placeholder="Unvan Adı"
                                            />
                                            <div className="w-full h-1 bg-gradient-to-r from-blue-100 to-transparent rounded-full"></div>
                                            <textarea 
                                                value={title.right}
                                                placeholder="Kazanım hakları ve açıklaması..."
                                                onChange={(e) => {
                                                    const newTitles = [...devCardConfig.titles];
                                                    newTitles[idx] = { ...newTitles[idx], right: e.target.value };
                                                    handleUpdateDevCardConfig({ ...devCardConfig, titles: newTitles });
                                                }}
                                                className="w-full bg-transparent text-[13px] font-medium text-gray-500 outline-none resize-none min-h-[60px] border-none focus:ring-0 leading-relaxed"
                                            />
                                        </div>

                                        <button 
                                            onClick={() => {
                                                const newTitles = devCardConfig.titles.filter((_: any, i: number) => i !== idx);
                                                handleUpdateDevCardConfig({ ...devCardConfig, titles: newTitles });
                                            }}
                                            className="absolute -top-3 -right-3 w-10 h-10 bg-white border border-red-100 text-red-500 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-red-50 z-20"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                <button 
                                    onClick={() => {
                                        const newTitles = [...devCardConfig.titles, { id: Date.now(), name: 'Yeni Unvan', threshold: 0, right: '' }];
                                        handleUpdateDevCardConfig({ ...devCardConfig, titles: newTitles });
                                    }}
                                    className="border-2 border-dashed border-blue-100 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 text-blue-400 hover:bg-blue-50 hover:border-blue-200 transition-all min-h-[220px]"
                                >
                                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <Plus size={32} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest">Yeni Aşama Ekle</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {effectiveAdminTab === 'behavior' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                        <div className="flex bg-gray-50 p-2 rounded-2xl w-max border border-gray-100 mb-8 mx-auto xl:mx-0">
                            <button
                                onClick={() => setBehaviorSubTab('cards')}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${behaviorSubTab === 'cards' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'}`}
                            >
                                <Smile size={16} /> Davranış Kart Ayarları
                            </button>
                            <button
                                onClick={() => setBehaviorSubTab('forms')}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${behaviorSubTab === 'forms' ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'}`}
                            >
                                <FileText size={16} /> Davranış Formları
                            </button>
                        </div>

                        {behaviorSubTab === 'cards' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                {/* 1. Üst Kısım: Kart Genel Ayarları */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {behaviorConfig?.cards?.map((card: any, idx: number) => {
                                        const IconComp = (Icons as any)[card.icon] || Award;
                                        return (
                                    <div key={card.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col space-y-6 relative overflow-hidden group hover:border-blue-200 transition-all">
                                        <div className="flex items-center justify-between z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-4 rounded-[20px] border shadow-sm ${card.id === 'white' ? 'border-gray-200 text-gray-700 bg-gray-50' : card.id === 'struggle_pos' ? 'border-blue-200 text-blue-600 bg-blue-50' : card.id === 'struggle_neg' ? 'border-orange-200 text-orange-600 bg-orange-50' : card.id === 'green' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : card.id === 'yellow' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' : 'border-red-200 text-red-600 bg-red-50'}`}>
                                                    <IconComp size={28} />
                                                </div>
                                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">{card.name}</h3>
                                            </div>
                                            <IconComp size={82} className="text-gray-50/50 absolute -right-4 -top-4 rotate-12 group-hover:text-blue-50 group-hover:rotate-0 transition-all duration-500" />
                                        </div>

                                        <div className="space-y-5 pt-6 border-t border-gray-50 z-10 w-full">
                                            <div className="flex items-center justify-between bg-gray-50/50 p-2 rounded-xl">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Taban Puan</span>
                                                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                                                    <input 
                                                        type="number" 
                                                        value={card.score}
                                                        onChange={(e) => {
                                                            const newCards = [...behaviorConfig.cards];
                                                            newCards[idx] = { ...newCards[idx], score: parseInt(e.target.value) || 0 };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                        }}
                                                        className={`w-12 text-center text-sm font-black outline-none ${card.score > 0 ? 'text-green-600' : card.score < 0 ? 'text-red-600' : 'text-gray-800'}`}
                                                    />
                                                    <div className="flex flex-col text-gray-400">
                                                        <button onClick={() => {
                                                            const newCards = [...behaviorConfig.cards];
                                                            newCards[idx] = { ...newCards[idx], score: (newCards[idx].score || 0) + 1 };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                        }}><ChevronUp size={12}/></button>
                                                        <button onClick={() => {
                                                            const newCards = [...behaviorConfig.cards];
                                                            newCards[idx] = { ...newCards[idx], score: (newCards[idx].score || 0) - 1 };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                        }}><ChevronDown size={12}/></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Açıklama</span>
                                                <textarea
                                                    rows={2}
                                                    value={card.desc || ''}
                                                    onChange={(e) => {
                                                        const newCards = [...behaviorConfig.cards];
                                                        newCards[idx] = { ...newCards[idx], desc: e.target.value };
                                                        handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                    }}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-600 font-medium outline-none resize-none"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between bg-orange-50/50 p-2 rounded-xl border border-orange-100">
                                                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2 pl-2">
                                                    <RefreshCw size={14}/> Telafi Puanı
                                                </span>
                                                <div className="flex items-center gap-2 border border-orange-200 rounded-lg px-2 py-1 bg-white">
                                                    <span className="text-orange-600 font-black text-sm">+</span>
                                                    <input 
                                                        type="number" 
                                                        value={card.compensation || 0}
                                                        onChange={(e) => {
                                                            const newCards = [...behaviorConfig.cards];
                                                            newCards[idx] = { ...newCards[idx], compensation: parseInt(e.target.value) || 0 };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                        }}
                                                        className="w-8 text-center text-sm font-black text-orange-600 outline-none"
                                                    />
                                                    <div className="flex flex-col text-orange-400">
                                                        <button onClick={() => {
                                                            const newCards = [...behaviorConfig.cards];
                                                            newCards[idx] = { ...newCards[idx], compensation: (newCards[idx].compensation || 0) + 1 };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                        }}><ChevronUp size={12}/></button>
                                                        <button onClick={() => {
                                                            const newCards = [...behaviorConfig.cards];
                                                            newCards[idx] = { ...newCards[idx], compensation: Math.max(0, (newCards[idx].compensation || 0) - 1) };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, cards: newCards });
                                                        }}><ChevronDown size={12}/></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* 2. Alt Kısım: Davranış Listeleri */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-12">
                            {behaviorConfig?.cards?.map((card: any) => {
                                const items = behaviorConfig.behaviors[card.id] || [];
                                return (
                                    <div key={card.id} className="space-y-4">
                                        <h4 className={`text-[15px] font-black uppercase tracking-wider ${card.id === 'white' ? 'text-blue-600' : card.id === 'struggle_pos' ? 'text-blue-800' : card.id === 'struggle_neg' ? 'text-gray-800' : card.id === 'green' ? 'text-emerald-600' : card.id === 'yellow' ? 'text-yellow-600' : 'text-red-600'} pb-3 border-b border-gray-200`}>
                                            {card.name} Davranışları
                                        </h4>
                                        <div className="space-y-2">
                                            {items.map((item: any, itemIdx: number) => (
                                                <div key={item.id || itemIdx} className="flex flex-col md:flex-row md:items-center gap-4 py-2 border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                                                    <input 
                                                        type="text" 
                                                        value={item.text}
                                                        onChange={(e) => {
                                                            const newBehaviors = { ...behaviorConfig.behaviors };
                                                            newBehaviors[card.id][itemIdx] = { ...newBehaviors[card.id][itemIdx], text: e.target.value };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                        }}
                                                        className="flex-[2] bg-transparent outline-none text-[13px] font-bold text-gray-700 px-3 py-2 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                                                        placeholder="Davranış Tanımı"
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={item.task || ''}
                                                        onChange={(e) => {
                                                            const newBehaviors = { ...behaviorConfig.behaviors };
                                                            newBehaviors[card.id][itemIdx] = { ...newBehaviors[card.id][itemIdx], task: e.target.value };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                        }}
                                                        className="flex-1 bg-transparent outline-none text-xs font-semibold text-gray-400 md:border-l border-gray-200 px-3 py-2 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                                                        placeholder="Telafi / Ödül"
                                                    />
                                                    <div className="flex items-center gap-4 md:border-l border-gray-200 px-4">
                                                        <div className="flex items-center gap-2 bg-white border border-gray-200 px-2 py-1.5 rounded-xl shadow-sm">
                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Puan:</span>
                                                            <input 
                                                                type="number" 
                                                                value={item.points ?? card.score}
                                                                onChange={(e) => {
                                                                    const newBehaviors = { ...behaviorConfig.behaviors };
                                                                    newBehaviors[card.id][itemIdx] = { ...newBehaviors[card.id][itemIdx], points: parseInt(e.target.value) || 0 };
                                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                                }}
                                                                className="w-8 text-center text-[13px] font-black outline-none"
                                                            />
                                                            <div className="flex flex-col text-gray-400">
                                                                <button onClick={() => {
                                                                    const newBehaviors = { ...behaviorConfig.behaviors };
                                                                    newBehaviors[card.id][itemIdx] = { ...newBehaviors[card.id][itemIdx], points: (newBehaviors[card.id][itemIdx].points ?? card.score) + 1 };
                                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                                }}><ChevronUp size={12}/></button>
                                                                <button onClick={() => {
                                                                    const newBehaviors = { ...behaviorConfig.behaviors };
                                                                    newBehaviors[card.id][itemIdx] = { ...newBehaviors[card.id][itemIdx], points: (newBehaviors[card.id][itemIdx].points ?? card.score) - 1 };
                                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                                }}><ChevronDown size={12}/></button>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newBehaviors = { ...behaviorConfig.behaviors };
                                                                newBehaviors[card.id] = newBehaviors[card.id].filter((_: any, i: number) => i !== itemIdx);
                                                                handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                            }}
                                                            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <button 
                                                onClick={() => {
                                                    const newBehaviors = { ...behaviorConfig.behaviors };
                                                    if (!newBehaviors[card.id]) newBehaviors[card.id] = [];
                                                    newBehaviors[card.id].push({ id: Date.now(), text: '', points: card.score, task: '' });
                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, behaviors: newBehaviors });
                                                }}
                                                className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors pt-4 pl-2 inline-block w-max"
                                            >
                                                <Plus size={14} className="inline"/> Yeni {card.name} Davranışı Ekle
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                        )}

                        {behaviorSubTab === 'forms' && (
                        <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-10 animate-in fade-in slide-in-from-bottom-4">
                            {/* 3. Alt Kısım: Davranış Formları */}
                            <div className="flex items-center gap-4 pb-4 border-b border-gray-50">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <FileText size={28} />
                                </div>
                                <h4 className="text-2xl font-black text-blue-900 tracking-tight">Form Şablonları</h4>
                            </div>
                            <div className="grid grid-cols-1 gap-12">
                                {Object.entries(behaviorConfig?.forms || INITIAL_FORM_CONFIGS).map(([key, form]: [string, any]) => (
                                    <div key={key} className="p-10 rounded-[40px] border-2 border-gray-200 bg-[#FBFBFC] space-y-8 shadow-sm hover:border-blue-100 transition-all">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-blue-600/50 uppercase tracking-widest pl-1">Form Başlığı ({key})</span>
                                            <input
                                                type="text"
                                                value={form.title || ''}
                                                onChange={(e) => {
                                                    const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                    newForms[key] = { ...newForms[key], title: e.target.value };
                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                }}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm font-bold text-gray-800 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                        {form.description !== undefined && (
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Açıklama</span>
                                                <textarea
                                                    rows={2}
                                                    value={form.description || ''}
                                                    onChange={(e) => {
                                                        const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                        newForms[key] = { ...newForms[key], description: e.target.value };
                                                        handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-600 font-medium outline-none resize-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                                />
                                            </div>
                                        )}
                                        {form.content !== undefined && (
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">İçerik Şablonu</span>
                                                <textarea
                                                    rows={4}
                                                    value={form.content || ''}
                                                    onChange={(e) => {
                                                        const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                        newForms[key] = { ...newForms[key], content: e.target.value };
                                                        handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-600 font-medium outline-none resize-y focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                                />
                                                <p className="text-[10px] text-gray-400 mt-1 pl-1">Kullanılabilir değişkenler: {"{studentName}"}, {"{date}"}, {"{teacherName}"}</p>
                                            </div>
                                        )}
                                        {['schoolResponsibilities', 'parentResponsibilities', 'studentResponsibilities'].map(arrKey => {
                                            if (form[arrKey] === undefined) return null;
                                            return (
                                                <div key={arrKey} className="space-y-2">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                                                        {arrKey === 'schoolResponsibilities' ? 'Okul Sorumlulukları' :
                                                         arrKey === 'parentResponsibilities' ? 'Veli Sorumlulukları' : 'Öğrenci Sorumlulukları'}
                                                    </span>
                                                    {(form[arrKey] || []).map((item: string, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <input
                                                                type="text"
                                                                value={item}
                                                                onChange={(e) => {
                                                                    const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                                    const newArr = [...newForms[key][arrKey]];
                                                                    newArr[idx] = e.target.value;
                                                                    newForms[key] = { ...newForms[key], [arrKey]: newArr };
                                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                                }}
                                                                className="flex-1 bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm text-gray-600 font-medium outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                                            />
                                                            <button 
                                                                onClick={() => {
                                                                    const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                                    const newArr = newForms[key][arrKey].filter((_: any, i: number) => i !== idx);
                                                                    newForms[key] = { ...newForms[key], [arrKey]: newArr };
                                                                    handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                                }}
                                                                className="text-gray-300 hover:text-red-500 p-2"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button 
                                                        onClick={() => {
                                                            const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                            const newArr = [...(newForms[key][arrKey] || []), ''];
                                                            newForms[key] = { ...newForms[key], [arrKey]: newArr };
                                                            handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                        }}
                                                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pl-1"
                                                    >
                                                        <Plus size={14}/> Madde Ekle
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        {form.footer !== undefined && (
                                            <div className="space-y-2 mt-4">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Alt Bilgi (Footer)</span>
                                                <textarea
                                                    rows={2}
                                                    value={form.footer || ''}
                                                    onChange={(e) => {
                                                        const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                        newForms[key] = { ...newForms[key], footer: e.target.value };
                                                        handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-600 font-medium outline-none resize-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                                />
                                            </div>
                                        )}
                                        {key === 'studentContract' && form.page2 !== undefined && (
                                            <div className="space-y-2 mt-4">
                                                <span className="text-[10px] font-black text-blue-600/50 uppercase tracking-widest pl-1">Sözleşme 2. Sayfa (HTML İçerik)</span>
                                                <textarea
                                                    rows={10}
                                                    value={form.page2 || ''}
                                                    onChange={(e) => {
                                                        const newForms = { ...(behaviorConfig.forms || INITIAL_FORM_CONFIGS) };
                                                        newForms[key] = { ...newForms[key], page2: e.target.value };
                                                        handleUpdateBehaviorConfig({ ...behaviorConfig, forms: newForms });
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-[10px] font-mono text-gray-500 outline-none resize-y focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                                />
                                            </div>
                                        )}
                                        <hr className="my-6 border-gray-100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}

                    </div>
                )}

                {effectiveAdminTab === 'support' && (
                    <div className="animate-in fade-in">
                        {actions.renderSupportContent(false)}
                    </div>
                )}

                {effectiveAdminTab === 'ideas' && (
                    <AdminIdeasPanel state={state} actions={actions} />
                )}
                {effectiveAdminTab === "tarif" && (
                    <AdminTarifPanel state={state} actions={actions} />
                )}
                {effectiveAdminTab === 'share' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <AdminSharePanel state={state} actions={actions} />
                    </div>
                )}

                {effectiveAdminTab === 'mit' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-full h-full p-4"><AdminMitPanel state={state} actions={actions} /></div>
                    </div>
                )}


                {effectiveAdminTab === 'genelkultur' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <AdminGenelKulturTestEditor showToast={actions.showToast} />
                    </div>
                )}

                {effectiveAdminTab === 'logs' && (
                    <AuditLogsPanel activeSchoolId={activeSchoolId} />
                )}

                {effectiveAdminTab === 'teacherperf' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Görev Tipleri */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Layers size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 tracking-tight">Görev Tipleri</h3>
                                </div>

                                <div className="space-y-4">
                                    {teacherPerfConfig?.taskTypes?.map((task: any, idx: number) => (
                                        <div key={task.id} className="flex items-start gap-4 group">
                                            <div className="text-sm font-black text-gray-400 mt-3 w-4">{idx + 1}.</div>
                                            <div className="flex-1 bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-3 group-hover:bg-white group-hover:border-blue-100 transition-all">
                                                <div className="flex gap-3">
                                                    <input 
                                                        type="text" 
                                                        value={task.name}
                                                        onChange={(e) => {
                                                            const newTaskTypes = [...teacherPerfConfig.taskTypes];
                                                            newTaskTypes[idx] = { ...newTaskTypes[idx], name: e.target.value };
                                                            actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                                        }}
                                                        className="flex-1 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500 transition-all"
                                                    />
                                                    <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                                                        <span className="text-[10px] font-black text-gray-400">Puan:</span>
                                                        <input 
                                                            type="number" 
                                                            value={task.score}
                                                            onChange={(e) => {
                                                                const newTaskTypes = [...teacherPerfConfig.taskTypes];
                                                                newTaskTypes[idx] = { ...newTaskTypes[idx], score: parseInt(e.target.value) || 0 };
                                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                                            }}
                                                            className="w-8 text-center text-sm font-black text-blue-600 outline-none"
                                                        />
                                                        <div className="flex flex-col text-gray-400">
                                                            <button onClick={() => {
                                                                const newTaskTypes = [...teacherPerfConfig.taskTypes];
                                                                newTaskTypes[idx] = { ...newTaskTypes[idx], score: (newTaskTypes[idx].score || 0) + 1 };
                                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                                            }}><ChevronUp size={12}/></button>
                                                            <button onClick={() => {
                                                                const newTaskTypes = [...teacherPerfConfig.taskTypes];
                                                                newTaskTypes[idx] = { ...newTaskTypes[idx], score: Math.max(0, (newTaskTypes[idx].score || 0) - 1) };
                                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                                            }}><ChevronDown size={12}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    value={task.desc}
                                                    placeholder="Açıklama..."
                                                    onChange={(e) => {
                                                        const newTaskTypes = [...teacherPerfConfig.taskTypes];
                                                        newTaskTypes[idx] = { ...newTaskTypes[idx], desc: e.target.value };
                                                        actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                                    }}
                                                    className="w-full bg-transparent text-[11px] font-medium text-gray-400 outline-none px-1"
                                                />
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    const newTaskTypes = teacherPerfConfig.taskTypes.filter((_: any, i: number) => i !== idx);
                                                    actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                                }}
                                                className="mt-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => {
                                        const newTaskTypes = [...(teacherPerfConfig?.taskTypes || []), { id: Date.now(), name: 'Yeni Görev', score: 1, desc: '' }];
                                        actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, taskTypes: newTaskTypes });
                                    }}
                                    className="w-full py-4 border-2 border-dashed border-blue-100 rounded-2xl text-blue-600 font-black text-sm hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Yeni Görev Ekle
                                </button>
                            </div>

                            {/* Çarpanlar */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Star size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 tracking-tight">Nitelik Çarpanları</h3>
                                </div>

                                <div className="space-y-4">
                                    {teacherPerfConfig?.rubrics?.map((rubric: any, idx: number) => (
                                        <div key={rubric.id} className="flex items-start gap-4 group">
                                            <div className="text-sm font-black text-gray-400 mt-3 w-4">{idx + 1}.</div>
                                            <div className="flex-1 bg-gray-50/50 border border-gray-100 p-4 rounded-2xl space-y-3 group-hover:bg-white group-hover:border-blue-100 transition-all">
                                                <div className="flex gap-3">
                                                    <input 
                                                        type="text" 
                                                        value={rubric.name}
                                                        onChange={(e) => {
                                                            const newRubrics = [...teacherPerfConfig.rubrics];
                                                            newRubrics[idx] = { ...newRubrics[idx], name: e.target.value };
                                                            actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                                        }}
                                                        className="flex-1 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-blue-500 transition-all"
                                                    />
                                                    <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl">
                                                        <span className="text-[10px] font-black text-gray-400">Çarpan: x</span>
                                                        <input 
                                                            type="number" 
                                                            value={rubric.multiplier}
                                                            onChange={(e) => {
                                                                const newRubrics = [...teacherPerfConfig.rubrics];
                                                                newRubrics[idx] = { ...newRubrics[idx], multiplier: parseInt(e.target.value) || 1 };
                                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                                            }}
                                                            className="w-8 text-center text-sm font-black text-green-600 outline-none"
                                                        />
                                                        <div className="flex flex-col text-gray-400">
                                                            <button onClick={() => {
                                                                const newRubrics = [...teacherPerfConfig.rubrics];
                                                                newRubrics[idx] = { ...newRubrics[idx], multiplier: (newRubrics[idx].multiplier || 1) + 1 };
                                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                                            }}><ChevronUp size={12}/></button>
                                                            <button onClick={() => {
                                                                const newRubrics = [...teacherPerfConfig.rubrics];
                                                                newRubrics[idx] = { ...newRubrics[idx], multiplier: Math.max(1, (newRubrics[idx].multiplier || 1) - 1) };
                                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                                            }}><ChevronDown size={12}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    value={rubric.desc}
                                                    placeholder="Açıklama..."
                                                    onChange={(e) => {
                                                        const newRubrics = [...teacherPerfConfig.rubrics];
                                                        newRubrics[idx] = { ...newRubrics[idx], desc: e.target.value };
                                                        actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                                    }}
                                                    className="w-full bg-transparent text-[11px] font-medium text-gray-400 outline-none px-1"
                                                />
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    const newRubrics = teacherPerfConfig.rubrics.filter((_: any, i: number) => i !== idx);
                                                    actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                                }}
                                                className="mt-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => {
                                        const newRubrics = [...(teacherPerfConfig?.rubrics || []), { id: Date.now(), name: 'Yeni Nitelik', multiplier: 1, desc: '' }];
                                        actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, rubrics: newRubrics });
                                    }}
                                    className="w-full py-4 border-2 border-dashed border-blue-100 rounded-2xl text-blue-600 font-black text-sm hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Yeni Nitelik Ekle
                                </button>
                            </div>
                        </div>

                        {/* Yıllık Görevler */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-8 mt-8 col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                                    <Calendar size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-blue-900 tracking-tight">Yıllık Görevler</h3>
                            </div>
                            <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr>
                                            <th className="p-4 border-b border-gray-200 bg-gray-50 text-[10px] text-gray-400 uppercase font-black tracking-widest w-16">NO</th>
                                            <th className="p-4 border-b border-gray-200 bg-gray-50 text-[10px] text-gray-400 uppercase font-black tracking-widest w-32 border-l border-white">AY</th>
                                            <th className="p-4 border-b border-gray-200 bg-gray-50 text-[10px] text-gray-400 uppercase font-black tracking-widest border-l border-white">YAPILACAK İŞ</th>
                                            <th className="p-4 border-b border-gray-200 bg-gray-50 text-[10px] text-gray-400 uppercase font-black tracking-widest w-48 border-l border-white">TARİH</th>
                                            <th className="p-4 border-b border-gray-200 bg-gray-50 text-[10px] text-gray-400 uppercase font-black tracking-widest w-16 text-center border-l border-white">İŞLEM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {teacherPerfConfig?.yearlyTasks?.map((task: any, idx: number) => (
                                            <tr key={`${task.id}-${idx}`} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="p-4 text-sm font-black text-gray-400">{idx + 1}</td>
                                                <td className="p-4">
                                                    <select
                                                        value={task.month}
                                                        onChange={(e) => {
                                                            const newTasks = [...teacherPerfConfig.yearlyTasks];
                                                            newTasks[idx] = { ...newTasks[idx], month: e.target.value };
                                                            actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, yearlyTasks: newTasks });
                                                        }}
                                                        className="w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 rounded-lg px-2 py-1 text-sm font-bold text-gray-700 outline-none transition-all"
                                                    >
                                                        {['EYLÜL', 'EKİM', 'KASIM', 'ARALIK', 'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS'].map(m => (
                                                            <option key={m} value={m}>{m}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="p-4">
                                                    <textarea 
                                                        value={task.task}
                                                        onChange={(e) => {
                                                            const newTasks = [...teacherPerfConfig.yearlyTasks];
                                                            newTasks[idx] = { ...newTasks[idx], task: e.target.value };
                                                            actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, yearlyTasks: newTasks });
                                                        }}
                                                        rows={1}
                                                        className="w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 rounded-lg px-2 py-1 text-sm font-medium text-gray-600 outline-none transition-all resize-none"
                                                        placeholder="Yapılacak İş..."
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <input 
                                                        type="text" 
                                                        value={task.dateRange}
                                                        onChange={(e) => {
                                                            const newTasks = [...teacherPerfConfig.yearlyTasks];
                                                            newTasks[idx] = { ...newTasks[idx], dateRange: e.target.value };
                                                            actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, yearlyTasks: newTasks });
                                                        }}
                                                        className="w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 rounded-lg px-2 py-1 text-sm font-bold text-gray-700 outline-none transition-all"
                                                        placeholder="Tarih"
                                                    />
                                                </td>
                                                <td className="p-4 text-center">
                                                    <button 
                                                        onClick={() => {
                                                            const newTasks = teacherPerfConfig.yearlyTasks.filter((_: any, i: number) => i !== idx);
                                                            actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, yearlyTasks: newTasks });
                                                        }}
                                                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 bg-red-50 hover:bg-red-100 rounded-lg"
                                                        title="Sil"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button 
                                onClick={() => {
                                    const newTasks = [...(teacherPerfConfig?.yearlyTasks || []), { id: Date.now(), month: 'EYLÜL', task: '', dateRange: '' }];
                                    actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, yearlyTasks: newTasks });
                                }}
                                className="w-full py-4 border-2 border-dashed border-blue-100 rounded-2xl text-blue-600 font-black text-sm hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={18} /> Yeni Yıllık Görev Ekle
                            </button>
                        </div>
                        
                        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 mt-6">
                            <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 flex items-center justify-center text-indigo-600 border border-indigo-100/50">
                                    <Users size={20} />
                                </div>
                                Görevi Yapacak Sorumlu Birim Ekle
                            </h3>
                            <div className="space-y-4">
                                {teacherPerfConfig?.assignmentGroups?.map((group: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <input 
                                                value={group.name} 
                                                onChange={(e) => {
                                                    const newGroups = [...teacherPerfConfig.assignmentGroups];
                                                    newGroups[idx] = { ...newGroups[idx], name: e.target.value };
                                                    actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, assignmentGroups: newGroups });
                                                }}
                                                className="w-full bg-white border border-gray-200 py-3 px-4 rounded-xl text-sm font-semibold text-gray-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all hover:border-gray-300"
                                                placeholder="Birim Adı (Örn: Okul Müdürü, Tüm Öğretmenler)"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const newGroups = teacherPerfConfig.assignmentGroups.filter((_: any, i: number) => i !== idx);
                                                actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, assignmentGroups: newGroups });
                                            }}
                                            className="text-gray-400 hover:text-red-600 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                            title="Birimi Sil"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => {
                                    const newGroups = [...(teacherPerfConfig?.assignmentGroups || []), { id: `GROUP_${Date.now()}`, name: '' }];
                                    actions.handleUpdateTeacherPerfConfig({ ...teacherPerfConfig, assignmentGroups: newGroups });
                                }}
                                className="w-full mt-6 py-4 border-2 border-dashed border-indigo-100 rounded-2xl text-indigo-600 font-black text-sm hover:bg-indigo-50 hover:border-indigo-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={18} /> Yeni Sorumlu Birim Ekle
                            </button>
                        </div>
                    </div>
                )}

                {/* Excel İçe Aktarma Önizleme Modalı (Sınıflar sekmesi için) */}
                {adminTab !== 'import' && excelPreview.length > 0 && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[32px] shadow-2xl p-8 max-w-2xl w-full animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                                        <CheckCircle size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl text-gray-900 uppercase tracking-tight">Excel Önizleme</h3>
                                        <p className="text-sm font-medium text-gray-400">{excelPreview.length} öğrenci başarıyla tespit edildi.</p>
                                    </div>
                                </div>
                                <button onClick={() => setExcelPreview([])} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-xl"><X size={24}/></button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-8 custom-scrollbar">
                                {excelPreview.map((row: any, idx: number) => {
                                    const match = row.name.match(/^(\d+)\s*[-]\s*(.+)$/);
                                    const no = match ? match[1] : '-';
                                    const name = match ? match[2] : row.name;
                                    const rowGender = row.gender || resolveStudentGender(row.name, row);
                                    return (
                                        <div key={idx} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-blue-100 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="text-xs font-black text-gray-300 w-6">{idx + 1}.</div>
                                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-blue-600 font-black text-xs shadow-sm">
                                                    {no}
                                                </div>
                                                <span className="font-bold text-gray-800">{name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                                                    rowGender === 'K'
                                                        ? 'bg-pink-50 text-pink-700 border-pink-200'
                                                        : 'bg-sky-50 text-sky-700 border-sky-200'
                                                }`}>
                                                    {rowGender === 'K' ? 'Kız (K)' : 'Erkek (E)'}
                                                </span>
                                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                    {formatClassLabel(row.classLevel)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end gap-4 p-2">
                                <button 
                                    onClick={() => setExcelPreview([])} 
                                    className="px-8 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
                                >
                                    Vazgeç
                                </button>
                                <button 
                                    onClick={() => {
                                        handleImportExcel();
                                        setAdminTab('classes'); // Ensure we stay/return to classes
                                    }} 
                                    className="px-10 py-4 bg-green-600 text-white hover:bg-green-700 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-green-100 flex items-center gap-2"
                                >
                                    <Plus size={18}/> Hepsini İçe Aktar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Kullanıcı Düzenleme Modalı */}
        {editUser && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full animate-in zoom-in-95 duration-200 space-y-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-xl text-gray-900">
                            {isRahle && editUser.role === 'student' ? 'Rahle Öğrencisini Düzenle' : 'Kullanıcıyı Düzenle'}
                        </h3>
                        <button onClick={() => setEditUser(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20}/></button>
                    </div>

                    {isRahle && editUser.role === 'student' && !(isStudentRahleOnly ? isStudentRahleOnly(editUser.originalName || editUser.name, editUser) : Boolean(editUser.isRahleOnly)) ? (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 space-y-2">
                            <p>Bu öğrenci Rahle harici diğer modülleri de kullanmaktadır.</p>
                            <p>Diğer modülleri kullanan öğrencilerin kişisel verileri Rahle modülünden güncellenemez.</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-5">
                                {editUser.role === 'student' ? (
                                    <>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Okul No</label>
                                                <input 
                                                    type="text" 
                                                    value={editUser.name.match(/^(\d+)\s*[-]\s*(.+)$/)?.[1] || ''} 
                                                    onChange={e => {
                                                        const no = e.target.value.trim();
                                                        const match = editUser.name.match(/^(\d+)\s*[-]\s*(.+)$/);
                                                        const pure = match ? match[2] : editUser.name;
                                                        setEditUser({...editUser, name: no ? `${no} - ${pure}` : pure});
                                                    }}
                                                    className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white text-gray-800"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Ad Soyad</label>
                                                <input 
                                                    type="text" 
                                                    value={editUser.name.match(/^(\d+)\s*[-]\s*(.+)$/)?.[2] || editUser.name} 
                                                    onChange={e => {
                                                        const name = e.target.value;
                                                        const match = editUser.name.match(/^(\d+)\s*[-]\s*(.+)$/);
                                                        const no = match ? match[1] : '';
                                                        setEditUser({...editUser, name: no ? `${no} - ${name}` : name});
                                                    }}
                                                    className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white text-gray-800"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Cinsiyet</label>
                                            {staffGenderFilter ? (
                                                <div className={`w-full border p-3.5 rounded-xl font-black text-sm ${
                                                    (editUser.gender || resolveStudentGender(editUser.name, editUser)) === 'K'
                                                        ? 'bg-pink-50 border-pink-200 text-pink-700'
                                                        : 'bg-sky-50 border-sky-200 text-sky-700'
                                                }`}>
                                                    {(editUser.gender || resolveStudentGender(editUser.name, editUser)) === 'K' ? 'Kız (K)' : 'Erkek (E)'}
                                                </div>
                                            ) : (
                                                <select
                                                    value={editUser.gender || resolveStudentGender(editUser.name, editUser)}
                                                    onChange={e => setEditUser({ ...editUser, gender: e.target.value })}
                                                    className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white cursor-pointer text-gray-800"
                                                >
                                                    <option value="K">Kız (K)</option>
                                                    <option value="E">Erkek (E)</option>
                                                </select>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Rol</label>
                                            <select
                                                value={editUser.role || 'teacher'}
                                                disabled={Boolean(kuranKursuAdminType)}
                                                onChange={e => setEditUser({
                                                    ...editUser,
                                                    role: e.target.value,
                                                    schoolLevel: e.target.value === 'teacher' ? (editUser.schoolLevel || detectedSchoolLevel) : editUser.schoolLevel,
                                                    adminSubRole: e.target.value === 'admin' ? (editUser.adminSubRole || 'Yönetici') : editUser.adminSubRole
                                                })}
                                                className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white cursor-pointer text-gray-800 disabled:opacity-80"
                                            >
                                                <option value="teacher">Öğretmen</option>
                                                {(!kuranKursuAdminType || editUser.role === 'admin' || editUser.role === 'yönetici') && (
                                                    <option value="admin">Yönetici</option>
                                                )}
                                            </select>
                                        </div>
                                        {(editUser.role === 'admin' || editUser.role === 'yönetici') && (
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Yönetici Görevi / Türü</label>
                                                <select
                                                    value={forcedKuranKursuAdminRole || editUser.adminSubRole || (ADMIN_SUB_ROLE_OPTIONS.includes(editUser.branch) ? editUser.branch : 'Yönetici')}
                                                    disabled={Boolean(kuranKursuAdminType)}
                                                    onChange={e => setEditUser({
                                                        ...editUser,
                                                        adminSubRole: e.target.value,
                                                        branch: e.target.value
                                                    })}
                                                    className="w-full border border-purple-200 p-3.5 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-semibold text-sm bg-purple-50/40 focus:bg-white cursor-pointer text-purple-900 disabled:opacity-80"
                                                >
                                                    {(forcedKuranKursuAdminRole ? [forcedKuranKursuAdminRole] : ADMIN_SUB_ROLE_OPTIONS).map((opt) => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        {(editUser.role === 'teacher' || editUser.role === 'öğretmen') && (() => {
                                            const modalSchoolLevel = kuranKursuAdminType
                                                ? 'diger'
                                                : ((editUser.schoolLevel && SCHOOL_LEVEL_BRANCHES[editUser.schoolLevel])
                                                    ? editUser.schoolLevel
                                                    : detectedSchoolLevel);
                                            const modalBranches = forcedKuranKursuTeacherBranch
                                                ? [forcedKuranKursuTeacherBranch]
                                                : (SCHOOL_LEVEL_BRANCHES[modalSchoolLevel] || SCHOOL_LEVEL_BRANCHES.ortaokul);

                                            return (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Okul Seviyesi</label>
                                                        <select
                                                            value={modalSchoolLevel}
                                                            disabled={Boolean(kuranKursuAdminType)}
                                                            onChange={e => {
                                                                const nextLvl = e.target.value;
                                                                setEditUser({
                                                                    ...editUser,
                                                                    schoolLevel: nextLvl
                                                                });
                                                            }}
                                                            className="w-full border border-blue-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-blue-50/40 focus:bg-white cursor-pointer text-blue-900 disabled:opacity-80"
                                                        >
                                                            {forcedKuranKursuTeacherBranch ? (
                                                                <option value="diger">{SCHOOL_LEVEL_LABELS.diger}</option>
                                                            ) : (
                                                                Object.entries(SCHOOL_LEVEL_LABELS).map(([k, lbl]) => (
                                                                    <option key={k} value={k}>{lbl}</option>
                                                                ))
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Branş</label>
                                                        <select
                                                            value={forcedKuranKursuTeacherBranch || editUser.branch || ''}
                                                            disabled={Boolean(kuranKursuAdminType)}
                                                            onChange={e => setEditUser({
                                                                ...editUser,
                                                                branch: e.target.value,
                                                                schoolLevel: modalSchoolLevel
                                                            })}
                                                            className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white cursor-pointer text-gray-800 disabled:opacity-80"
                                                        >
                                                            {!forcedKuranKursuTeacherBranch && (
                                                                <option value="">-- Branş Seçiniz --</option>
                                                            )}
                                                            {!forcedKuranKursuTeacherBranch && editUser.branch && !modalBranches.includes(editUser.branch) && (
                                                                <option value={editUser.branch}>{editUser.branch}</option>
                                                            )}
                                                            {modalBranches.map((br) => (
                                                                <option key={br} value={br}>{br}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Ad Soyad</label>
                                            <input type="text" value={editUser.name || ''} onChange={e=>setEditUser({...editUser, name: e.target.value})} className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white text-gray-800"/>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Kullanıcı Adı</label>
                                    <input type="text" value={editUser.username || ''} onChange={e=>setEditUser({...editUser, username: e.target.value})} className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white text-gray-800"/>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Şifre</label>
                                    <input type="text" value={editUser.password || ''} onChange={e=>setEditUser({...editUser, password: e.target.value})} className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white text-gray-800"/>
                                </div>
                                {editUser.role === 'student' && (
                                    isRahle ? (
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Rahle Sınıfı</label>
                                            <select
                                                value={editUser.classLevel === 'Hafızlık Havuzu' ? '' : (editUser.classLevel || '')}
                                                onChange={e => setEditUser({ ...editUser, classLevel: e.target.value, isHafizlik: true, isRahleOnly: true })}
                                                className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white cursor-pointer appearance-none text-gray-800"
                                            >
                                                <option value="">Havuzda (Sınıf Atanmadı)</option>
                                                {Object.keys(rahleClasses || {}).map(c => (
                                                    <option key={c} value={c}>{formatClassLabel(c)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Sınıf</label>
                                                <select value={editUser.classLevel || ''} onChange={e=>setEditUser({...editUser, classLevel: e.target.value})} className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-sm bg-gray-50 focus:bg-white cursor-pointer appearance-none text-gray-800">
                                                    {Object.keys(classes).map(c => <option key={c} value={c}>{formatClassLabel(c)}</option>)}
                                                </select>
                                            </div>
                                            <label className="flex items-center justify-between p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 cursor-pointer select-none">
                                                <div>
                                                    <div className="text-xs font-black text-amber-900 uppercase tracking-wide">Hafızlık Öğrencisi mi?</div>
                                                    <div className="text-[11px] font-medium text-amber-700">Seçildiğinde öğrenci Rahle projesini görebilir ve Rahle listelerinde yer alır.</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(editUser.isHafizlik)}
                                                    onChange={e => setEditUser({ ...editUser, isHafizlik: e.target.checked })}
                                                    className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                                                />
                                            </label>
                                        </>
                                    )
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                <button onClick={() => setEditUser(null)} className="px-5 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors">İptal</button>
                                <button onClick={handleUpdateUser} className={`px-6 py-2.5 text-white rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2 ${isRahle ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}>
                                    <Save size={16}/> Kaydet
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};
