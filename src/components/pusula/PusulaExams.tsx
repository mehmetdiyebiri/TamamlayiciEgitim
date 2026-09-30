import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';
import { PusulaStudentProfile, PusulaExam } from '../../types/pusula';

interface PusulaExamsProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
  isOpenNewExamModal?: boolean;
  onCloseNewExamModal?: () => void;
}

export const PusulaExams: React.FC<PusulaExamsProps> = ({
  profile,
  onUpdateProfile,
  isOpenNewExamModal = false,
  onCloseNewExamModal
}) => {
  const [showModal, setShowModal] = useState(isOpenNewExamModal);
  const [filterType, setFilterType] = useState<string>('Hepsi');

  // Form State
  const [examType, setExamType] = useState<'TYT' | 'AYT' | 'LGS' | 'KPSS' | 'AGS'>('TYT');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [scoresInput, setScoresInput] = useState<Record<string, { d: string; y: string; net: string }>>({});
  const [mistakeTopicInput, setMistakeTopicInput] = useState('');
  const [selectedMistakes, setSelectedMistakes] = useState<string[]>([]);

  // Open modal if prop changes
  React.useEffect(() => {
    if (isOpenNewExamModal) setShowModal(true);
  }, [isOpenNewExamModal]);

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

    // Auto-calculate net if d and y are numbers
    if (field === 'd' || field === 'y') {
      const dVal = parseFloat(field === 'd' ? val : updated.d) || 0;
      const yVal = parseFloat(field === 'y' ? val : updated.y) || 0;
      const divisor = examType === 'LGS' ? 3 : 4;
      const calcNet = Math.max(0, dVal - (yVal / divisor));
      updated.net = calcNet.toFixed(2).replace(/\.00$/, '');
    }

    setScoresInput(prev => ({ ...prev, [sub]: updated }));
  };

  // Save new exam
  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim()) {
      alert('Lütfen deneme adını girin.');
      return;
    }

    const scoresMap: Record<string, number> = {};
    let total = 0;

    currentSubjects.forEach(sub => {
      const val = parseFloat(scoresInput[sub]?.net || '0') || 0;
      scoresMap[sub] = val;
      total += val;
    });

    const newExam: PusulaExam = {
      id: 'ex_' + Date.now(),
      name: examName.trim(),
      date: examDate,
      type: examType,
      scores: scoresMap,
      mistakeTopics: selectedMistakes,
      totalNet: parseFloat(total.toFixed(2))
    };

    const updatedExams = [newExam, ...(profile.exams || [])];
    onUpdateProfile({ exams: updatedExams });

    // Reset & Close
    setExamName('');
    setScoresInput({});
    setSelectedMistakes([]);
    handleClose();
  };

  // Delete Exam
  const handleDeleteExam = (id: string) => {
    if (confirm('Bu deneme sınavı kaydını silmek istediğinize emin misiniz?')) {
      const filtered = (profile.exams || []).filter(ex => ex.id !== id);
      onUpdateProfile({ exams: filtered });
    }
  };

  // Filtered exams
  const filteredExams = (profile.exams || []).filter(ex => {
    if (filterType === 'Hepsi') return true;
    return ex.type === filterType;
  });

  // Calculate Net stats
  const totalNets = (profile.exams || []).map(ex => ex.totalNet);
  const maxNet = totalNets.length > 0 ? Math.max(...totalNets) : 0;
  const avgNet = totalNets.length > 0 ? (totalNets.reduce((a, b) => a + b, 0) / totalNets.length).toFixed(1) : '0';
  const latestNet = profile.exams?.[0]?.totalNet || 0;

  return (
    <div className="space-y-6">
      {/* Top Action & Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kayıtlı Deneme</span>
          <div className="text-2xl font-black text-gray-900">{profile.exams?.length || 0} Adet</div>
          <p className="text-xs text-purple-600 font-semibold">Tüm denemeler kayıt altında</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">En Yüksek Net</span>
          <div className="text-2xl font-black text-emerald-600">{maxNet} Net</div>
          <p className="text-xs text-gray-500 font-medium">Kişisel en iyi performans</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ortalama Net</span>
          <div className="text-2xl font-black text-blue-600">{avgNet} Net</div>
          <p className="text-xs text-gray-500 font-medium">Genel sınav net ortalaması</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Son Deneme Neti</span>
          <div className="text-2xl font-black text-purple-700">{latestNet} Net</div>
          <p className="text-xs text-gray-500 font-medium">{profile.exams?.[0]?.date || '-'}</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Award size={22} className="text-purple-600" />
              Deneme Sınavları &amp; Net Takip Çizelgesi
            </h3>
            <p className="text-xs font-semibold text-gray-400">
              Sınav türüne göre denemeleri inceleyin, yeni netler ekleyin ve analiz edin.
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
              Öğrencinin çözdüğü ilk deneme sınavının sonuçlarını ekleyerek net analizini başlatın.
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
                  <th className="pb-3">Ders Netleri Dağılımı</th>
                  <th className="pb-3">Kritik Yanlışlar</th>
                  <th className="pb-3 text-right">Toplam Net</th>
                  <th className="pb-3 text-center">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExams.map(ex => (
                  <tr key={ex.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 pl-2 font-bold text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-purple-50 text-purple-800 border border-purple-200">
                          {ex.type}
                        </span>
                        <span className="text-sm">{ex.name}</span>
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
                      <button 
                        onClick={() => handleDeleteExam(ex.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                        title="Denemeyi Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Yeni Deneme Ekle */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Award size={22} className="text-purple-600" />
                  Yeni Deneme Sınavı Net Girişi
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  Sınav türünü seçin, ders ders Doğru / Yanlış sayılarını girin, netler otomatik hesaplansın.
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
                  <input 
                    type="text"
                    value={mistakeTopicInput}
                    onChange={(e) => setMistakeTopicInput(e.target.value)}
                    placeholder="Örn: Paragrafta Anlam, İkinci Dereceden Denklemler..."
                    className="flex-1 bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-semibold outline-none focus:border-purple-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (mistakeTopicInput.trim() && !selectedMistakes.includes(mistakeTopicInput.trim())) {
                          setSelectedMistakes([...selectedMistakes, mistakeTopicInput.trim()]);
                          setMistakeTopicInput('');
                        }
                      }
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      if (mistakeTopicInput.trim() && !selectedMistakes.includes(mistakeTopicInput.trim())) {
                        setSelectedMistakes([...selectedMistakes, mistakeTopicInput.trim()]);
                        setMistakeTopicInput('');
                      }
                    }}
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
                  Deneme Sınavını Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
