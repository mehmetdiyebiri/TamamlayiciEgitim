import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Calendar, 
  FileText, 
  Users, 
  Search, 
  ChevronRight, 
  Target, 
  Sparkles,
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { PusulaStudentProfile, PusulaExam, PusulaPlanItem, PusulaCoachingNote } from '../../types/pusula';
import { PusulaDashboard } from './PusulaDashboard';
import { PusulaResources } from './PusulaResources';
import { PusulaExams } from './PusulaExams';
import { PusulaPlan } from './PusulaPlan';
import { PusulaNotes } from './PusulaNotes';
import { PusulaSinavAnalizi } from './PusulaSinavAnalizi';

interface PusulaPanelProps {
  state: any;
  actions: any;
  selectedClass: string | null;
  selectedStudent: string | null;
  onSelectStudent: (student: string) => void;
  onSelectClass: (className: string) => void;
  classes: Record<string, string[]>;
  activeSchoolId: string;
  activeTab?: string;
  onSelectTab?: (tab: 'dashboard' | 'resources' | 'exams' | 'sinav_analizi' | 'plan' | 'notes') => void;
}

export const PusulaPanel: React.FC<PusulaPanelProps> = ({
  state,
  actions,
  selectedClass,
  selectedStudent,
  onSelectStudent,
  onSelectClass,
  classes = {},
  activeSchoolId,
  activeTab,
  onSelectTab
}) => {
  const [internalTab, setInternalTab] = useState<'dashboard' | 'resources' | 'exams' | 'sinav_analizi' | 'plan' | 'notes'>('dashboard');
  const pusulaTab: 'dashboard' | 'resources' | 'exams' | 'sinav_analizi' | 'plan' | 'notes' = 
    (activeTab && ['dashboard', 'resources', 'exams', 'sinav_analizi', 'plan', 'notes'].includes(activeTab))
      ? (activeTab as any)
      : internalTab;

  const setPusulaTab = (tab: 'dashboard' | 'resources' | 'exams' | 'sinav_analizi' | 'plan' | 'notes') => {
    setInternalTab(tab);
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  const [studentSearch, setStudentSearch] = useState('');
  
  // Modals triggerable from anywhere
  const [isOpenExamModal, setIsOpenExamModal] = useState(false);
  const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
  const [isOpenGoalModal, setIsOpenGoalModal] = useState(false);

  // Goal modal state
  const [targetSchoolInput, setTargetSchoolInput] = useState('');
  const [targetScoreInput, setTargetScoreInput] = useState('');
  const [weeklyGoalInput, setWeeklyGoalInput] = useState<number>(750);

  // Pusula Profiles Database in memory / Firestore / localStorage
  const storageKey = `pusula_profiles_${activeSchoolId || 'default'}`;
  const [profiles, setProfiles] = useState<Record<string, PusulaStudentProfile>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Sync with Firestore
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const { doc, onSnapshot, getDoc } = await import('firebase/firestore');
        const { db } = await import('../../lib/firebase');
        const docRef = doc(db, 'pusula_coaching', activeSchoolId || 'default');
        
        const unsub = onSnapshot(docRef, (snap) => {
          if (!isSubscribed) return;
          if (snap.exists()) {
            const data = snap.data();
            if (data?.profiles) {
              setProfiles(data.profiles);
              localStorage.setItem(storageKey, JSON.stringify(data.profiles));
            }
          }
        }, (err) => {
          console.warn("Pusula firestore listener note:", err);
        });

        return () => { unsub(); };
      } catch (e) {
        console.warn("Pusula init error:", e);
      }
    })();

    return () => { isSubscribed = false; };
  }, [activeSchoolId]);

  // Persist helper
  const saveProfiles = async (newProfiles: Record<string, PusulaStudentProfile>) => {
    setProfiles(newProfiles);
    localStorage.setItem(storageKey, JSON.stringify(newProfiles));
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      await setDoc(doc(db, 'pusula_coaching', activeSchoolId || 'default'), {
        profiles: newProfiles,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Pusula Firestore save error:", err);
    }
  };

  // Get active student profile or create default
  const studentKey = selectedStudent ? `${selectedClass || 'Genel'}_${selectedStudent}` : null;
  const currentProfile: PusulaStudentProfile = studentKey && profiles[studentKey] 
    ? profiles[studentKey] 
    : {
        studentName: selectedStudent || '',
        className: selectedClass || '',
        targetSchool: 'Hedef Belirlenmedi',
        targetScoreOrNet: '',
        weeklyQuestionGoal: 750,
        currentCategory: 'YKS',
        exams: [],
        weeklyPlan: [],
        curriculumProgress: {},
        coachingNotes: [],
        testResults: {}
      };

  // Update active student profile
  const handleUpdateProfile = (updatedFields: Partial<PusulaStudentProfile>) => {
    if (!studentKey) return;
    const updated = {
      ...currentProfile,
      ...updatedFields
    };
    const newProfiles = {
      ...profiles,
      [studentKey]: updated
    };
    saveProfiles(newProfiles);
  };

  // Save Goal
  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateProfile({
      targetSchool: targetSchoolInput.trim() || currentProfile.targetSchool,
      targetScoreOrNet: targetScoreInput.trim() || currentProfile.targetScoreOrNet,
      weeklyQuestionGoal: weeklyGoalInput || 750
    });
    setIsOpenGoalModal(false);
  };

  // List all students for selector screen
  const allStudentsList: Array<{ student: string; className: string }> = [];
  Object.entries(classes).forEach(([className, studentNames]) => {
    (studentNames || []).forEach(name => {
      allStudentsList.push({ student: name, className });
    });
  });

  const filteredStudents = allStudentsList.filter(s => 
    s.student.toLowerCase().includes(studentSearch.toLowerCase()) || 
    s.className.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // If Sınav Analizi tab is selected, render it immediately (class-level tool)
  if (pusulaTab === 'sinav_analizi') {
    return (
      <PusulaSinavAnalizi
        state={state}
        actions={actions}
        activeSchoolId={activeSchoolId}
        selectedClass={selectedClass}
        classes={classes}
      />
    );
  }

  // If no student is selected yet, show the Coaching Student Directory
  if (!selectedStudent) {
    return (
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-300">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl shadow-purple-950/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 z-10 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-black uppercase tracking-widest">
              <Compass size={14} className="text-purple-300" />
              PUSULA ÖĞRENCİ KOÇLUK SİSTEMİ
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Öğrenci Koçluk &amp; Bireysel Takip Portalı
            </h1>
            <p className="text-purple-100 text-sm sm:text-base font-medium leading-relaxed">
              Milli Eğitim ve YKS / LGS / KPSS sınavlarına hazırlık sürecinde öğrencilerinize hedef belirleyin, 
              deneme sınavı netlerini analiz edin, haftalık çalışma planları oluşturun ve koçluk seanslarını kayıt altına alın.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setPusulaTab('sinav_analizi')}
                className="px-5 py-2.5 rounded-2xl bg-white text-purple-950 font-black text-xs hover:bg-purple-50 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <FileSpreadsheet size={16} className="text-purple-700" />
                MEB Sınav Analizi Modülüne Git
              </button>
            </div>
          </div>
        </div>

        {/* Student Selector Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Users size={22} className="text-purple-600" />
                Koçluk Yapılacak Öğrenciyi Seçin
              </h2>
              <p className="text-xs font-semibold text-gray-400">
                Sisteminizde kayıtlı {allStudentsList.length} öğrenci içerisinden seçim yapın veya yukarıdaki menüyü kullanın.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
              <input 
                type="text" 
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Öğrenci veya sınıf adı ara..."
                className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Student Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
                Kayıtlı öğrenci bulunamadı. Lütfen sol üstteki okul ve sınıf menüsünden bir sınıf oluşturun.
              </div>
            ) : (
              filteredStudents.map(({ student, className }) => {
                const sKey = `${className}_${student}`;
                const prof = profiles[sKey];
                const examCount = prof?.exams?.length || 0;
                const noteCount = prof?.coachingNotes?.length || 0;

                return (
                  <div
                    key={sKey}
                    onClick={() => {
                      onSelectClass(className);
                      onSelectStudent(student);
                    }}
                    className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                        {className.replace('_', '')}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ChevronRight size={16} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-gray-900 group-hover:text-purple-700 transition-colors">
                        {student}
                      </h3>
                      <p className="text-xs text-gray-400 font-semibold truncate mt-0.5">
                        {prof?.targetSchool ? `🎯 ${prof.targetSchool}` : 'Hedef belirlenmedi'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
                      <span>{examCount} Deneme</span>
                      <span>•</span>
                      <span>{noteCount} Görüşme</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Student Coaching Panel
  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-300">
      {/* Render Active View */}
      {pusulaTab === 'dashboard' && (
        <PusulaDashboard 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          onNavigateTab={(tab) => setPusulaTab(tab as any)}
          onOpenExamModal={() => setIsOpenExamModal(true)}
          onOpenNoteModal={() => setIsOpenNoteModal(true)}
          onOpenGoalModal={() => {
            setTargetSchoolInput(currentProfile.targetSchool || '');
            setTargetScoreInput(currentProfile.targetScoreOrNet || '');
            setWeeklyGoalInput(currentProfile.weeklyQuestionGoal || 750);
            setIsOpenGoalModal(true);
          }}
        />
      )}

      {pusulaTab === 'resources' && (
        <PusulaResources 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {pusulaTab === 'exams' && (
        <PusulaExams 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          isOpenNewExamModal={isOpenExamModal}
          onCloseNewExamModal={() => setIsOpenExamModal(false)}
        />
      )}

      {pusulaTab === 'plan' && (
        <PusulaPlan 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {pusulaTab === 'notes' && (
        <PusulaNotes 
          profile={currentProfile}
          onUpdateProfile={handleUpdateProfile}
          isOpenNewNoteModal={isOpenNoteModal}
          onCloseNewNoteModal={() => setIsOpenNoteModal(false)}
        />
      )}

      {/* Modal: Hedef Güncelle */}
      {isOpenGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Target size={22} className="text-purple-600" />
                  Öğrenci Hedef Belirleme Kartı
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  {currentProfile.studentName} için üniversite/lise ve soru hedefini güncelleyin.
                </p>
              </div>
              <button 
                onClick={() => setIsOpenGoalModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Hedef Kurum / Üniversite / Bölüm</label>
                <input 
                  type="text"
                  required
                  value={targetSchoolInput}
                  onChange={(e) => setTargetSchoolInput(e.target.value)}
                  placeholder="Örn: Hacettepe Üniversitesi Tıp Fakültesi"
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Hedef Net veya Puan</label>
                <input 
                  type="text"
                  value={targetScoreInput}
                  onChange={(e) => setTargetScoreInput(e.target.value)}
                  placeholder="Örn: 105 TYT / 72 AYT veya 485 LGS Puanı"
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Haftalık Soru Çözüm Hedefi</label>
                <input 
                  type="number"
                  min="100"
                  step="50"
                  value={weeklyGoalInput}
                  onChange={(e) => setWeeklyGoalInput(parseInt(e.target.value) || 750)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsOpenGoalModal(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Vazgeç
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Hedefi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
