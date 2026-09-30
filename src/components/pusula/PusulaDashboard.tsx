import React from 'react';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  FileText, 
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';
import { PusulaStudentProfile } from '../../types/pusula';

interface PusulaDashboardProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
  onNavigateTab: (tab: string) => void;
  onOpenExamModal: () => void;
  onOpenNoteModal: () => void;
  onOpenGoalModal: () => void;
}

export const PusulaDashboard: React.FC<PusulaDashboardProps> = ({
  profile,
  onNavigateTab,
  onOpenExamModal,
  onOpenNoteModal,
  onOpenGoalModal
}) => {
  // Calculate stats
  const totalSolvedThisWeek = profile.weeklyPlan.filter(p => p.completed).reduce((sum, p) => sum + (p.targetCount || 30), 0);
  const weeklyGoal = profile.weeklyQuestionGoal || 750;
  const weeklyPercent = Math.min(100, Math.round((totalSolvedThisWeek / weeklyGoal) * 100));

  // Count topics progress
  let totalTopics = 0;
  let completedTopics = 0;
  let inProgressTopics = 0;

  Object.values(profile.curriculumProgress || {}).forEach(subjectTopics => {
    Object.values(subjectTopics || {}).forEach(t => {
      totalTopics++;
      if (t.status === 'completed') completedTopics++;
      else if (t.status === 'in_progress') inProgressTopics++;
    });
  });

  const completionRate = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Recent exams
  const recentExams = [...(profile.exams || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastExam = recentExams[0];

  // Net average
  const totalNetSum = recentExams.reduce((sum, ex) => sum + (ex.totalNet || 0), 0);
  const avgNet = recentExams.length > 0 ? (totalNetSum / recentExams.length).toFixed(1) : '-';

  // Aggregate mistake topics
  const mistakeCounts: Record<string, number> = {};
  recentExams.forEach(ex => {
    (ex.mistakeTopics || []).forEach(top => {
      mistakeCounts[top] = (mistakeCounts[top] || 0) + 1;
    });
  });
  const topMistakes = Object.entries(mistakeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner: Student Target & Highlights */}
      <div className="bg-gradient-to-r from-purple-800 via-emerald-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-900/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="space-y-3 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-purple-300" />
            Öğrenci Koçluk Paneli • {profile.currentCategory}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
              {profile.studentName}
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-white/10 text-purple-100">
                {profile.className}
              </span>
            </h2>
            <div className="flex items-center gap-2 mt-2 text-sm text-purple-100">
              <Target size={16} className="text-amber-300" />
              <span>
                Hedef: <strong className="text-white font-bold">{profile.targetSchool || 'Belirlenmedi'}</strong>
                {profile.targetScoreOrNet && ` (${profile.targetScoreOrNet})`}
              </span>
              <button 
                onClick={onOpenGoalModal}
                className="text-xs text-amber-300 hover:text-white underline font-semibold ml-2"
              >
                Hedefi Güncelle
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 z-10 w-full md:w-auto">
          <button 
            onClick={() => window.print()}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700/60 border border-purple-500/40 text-white font-bold text-xs hover:bg-purple-700 transition-all cursor-pointer"
            title="Öğrenci Koçluk Raporu Çıktısı Al"
          >
            <Printer size={16} />
            Rapor Yazdır
          </button>
          <button 
            onClick={onOpenExamModal}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-purple-900 font-black text-xs shadow-md hover:bg-purple-50 transition-all cursor-pointer"
          >
            <Plus size={16} className="text-purple-600" />
            Deneme Neti Gir
          </button>
          <button 
            onClick={() => onNavigateTab('plan')}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700/60 border border-purple-500/40 text-white font-bold text-xs hover:bg-purple-700 transition-all cursor-pointer"
          >
            <Calendar size={16} />
            Haftalık Plan
          </button>
          <button 
            onClick={onOpenNoteModal}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700/60 border border-purple-500/40 text-white font-bold text-xs hover:bg-purple-700 transition-all cursor-pointer"
          >
            <FileText size={16} />
            Koçluk Notu
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Soru Hedefi */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Haftalık Soru Çözümü</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{totalSolvedThisWeek}</span>
            <span className="text-xs font-semibold text-gray-400">/ {weeklyGoal} soru</span>
          </div>
          <div className="space-y-1">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${weeklyPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 font-medium">
              <span>Haftalık Tamamlanma</span>
              <span className="font-bold text-purple-600">%{weeklyPercent}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Net Ortalaması */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deneme Ortalaması</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-900">{avgNet}</span>
            <span className="text-xs font-semibold text-gray-400">Net ({recentExams.length} deneme)</span>
          </div>
          <p className="text-xs text-gray-500 font-medium truncate">
            {lastExam ? `Son Sınav: ${lastExam.name} (${lastExam.totalNet} Net)` : 'Henüz deneme kaydedilmedi'}
          </p>
        </div>

        {/* Metric 3: Konu Bitirme Oranı */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Müfredat İlerlemesi</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">%{completionRate}</span>
            <span className="text-xs font-semibold text-gray-400">tamamlandı</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500">
            <span className="text-emerald-600">✔ {completedTopics} bitti</span>
            <span className="text-amber-600">⏳ {inProgressTopics} aktif</span>
          </div>
        </div>

        {/* Metric 4: Koçluk Durumu */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Koçluk Seansları</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-900">{(profile.coachingNotes || []).length}</span>
            <span className="text-xs font-semibold text-gray-400">Görüşme yapıldı</span>
          </div>
          <p className="text-xs text-purple-700 font-bold truncate">
            {profile.coachingNotes?.[0]?.nextMeetingDate ? `Sonraki: ${profile.coachingNotes[0].nextMeetingDate}` : 'Düzenli takip aktif'}
          </p>
        </div>
      </div>

      {/* Main Grid: Son Denemeler + Kritik Yanlış Konular */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Son Deneme Sonuçları Tablosu */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Award size={20} className="text-purple-600" />
                Son Deneme Sınavı Performansı
              </h3>
              <p className="text-xs font-semibold text-gray-400">Öğrencinin son girdiği denemeler ve net analizi</p>
            </div>
            <button 
              onClick={() => onNavigateTab('exams')}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
            >
              Tümünü Gör <ArrowRight size={14} />
            </button>
          </div>

          {recentExams.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
              <Award size={36} className="mx-auto text-gray-300" />
              <p className="text-sm font-bold text-gray-600">Henüz deneme sınavı kaydı bulunmuyor.</p>
              <button 
                onClick={onOpenExamModal}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-purple-700 cursor-pointer"
              >
                İlk Denemeyi Kaydet
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wider">
                    <th className="pb-3">Sınav Adı</th>
                    <th className="pb-3">Tarih</th>
                    <th className="pb-3">Ders Dağılımı (Netler)</th>
                    <th className="pb-3 text-right">Toplam Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentExams.slice(0, 4).map(ex => (
                    <tr key={ex.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3.5 font-bold text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-50 text-purple-700 border border-purple-200">
                            {ex.type}
                          </span>
                          <span>{ex.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-xs text-gray-500 font-semibold">{ex.date}</td>
                      <td className="py-3.5">
                        <div className="flex flex-wrap gap-1.5 max-w-sm">
                          {Object.entries(ex.scores || {}).map(([sub, score]) => (
                            <span key={sub} className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                              {sub}: <b className="text-gray-900">{score}</b>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 text-right font-black text-base text-purple-700">
                        {ex.totalNet} <span className="text-xs font-semibold text-gray-400">Net</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Col: Kritik Yanlış Yapılan Konular */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" />
                Öncelikli Eksik Konular
              </h3>
              <p className="text-xs font-semibold text-gray-400">Denemelerde en sık hata yapılan ve boş kalanlar</p>
            </div>

            {topMistakes.length === 0 ? (
              <div className="text-center py-10 bg-emerald-50/50 rounded-2xl border border-dashed border-emerald-100 space-y-2 p-4">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
                <p className="text-xs font-bold text-emerald-800">
                  Denemelerde kritik bir konu kaybı tespit edilmedi veya henüz soru analizi girilmedi.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {topMistakes.map(([topic, count], idx) => (
                  <div 
                    key={topic}
                    className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/50 border border-amber-100/80 hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-amber-200/60 text-amber-900 flex items-center justify-center font-black text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-gray-800">{topic}</span>
                    </div>
                    <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      {count} denemede hata
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={() => onNavigateTab('resources')}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 text-purple-800 font-bold text-xs hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen size={16} />
              Konu &amp; Kaynak Takibine Git
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
