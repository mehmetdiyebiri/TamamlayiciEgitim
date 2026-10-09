import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PusulaStudentProfile, PusulaCoachingNote } from '../../types/pusula';

interface PusulaNotesProps {
  profile: PusulaStudentProfile;
  onUpdateProfile: (updated: Partial<PusulaStudentProfile>) => void;
  isOpenNewNoteModal?: boolean;
  onCloseNewNoteModal?: () => void;
}

export const PusulaNotes: React.FC<PusulaNotesProps> = ({
  profile,
  onUpdateProfile,
  isOpenNewNoteModal = false,
  onCloseNewNoteModal
}) => {
  const [showModal, setShowModal] = useState(isOpenNewNoteModal);

  // New Note State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDate, setNoteDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [sessionType, setSessionType] = useState<PusulaCoachingNote['sessionType']>('Birebir Koçluk');
  const [noteSummary, setNoteSummary] = useState('');
  const [actionItemInput, setActionItemInput] = useState('');
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [nextMeetingDate, setNextMeetingDate] = useState('');

  React.useEffect(() => {
    if (isOpenNewNoteModal) setShowModal(true);
  }, [isOpenNewNoteModal]);

  const handleClose = () => {
    setShowModal(false);
    if (onCloseNewNoteModal) onCloseNewNoteModal();
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) {
      alert('Lütfen görüşme başlığını girin.');
      return;
    }

    const newNote: PusulaCoachingNote = {
      id: 'note_' + Date.now(),
      title: noteTitle.trim(),
      date: noteDate,
      sessionType,
      summary: noteSummary.trim(),
      actionItems,
      nextMeetingDate: nextMeetingDate || undefined
    };

    const updated = [newNote, ...(profile.coachingNotes || [])];
    onUpdateProfile({ coachingNotes: updated });

    // Reset & Close
    setNoteTitle('');
    setNoteSummary('');
    setActionItems([]);
    setNextMeetingDate('');
    handleClose();
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Bu koçluk görüşme kaydını silmek istediğinize emin misiniz?')) {
      const filtered = (profile.coachingNotes || []).filter(n => n.id !== id);
      onUpdateProfile({ coachingNotes: filtered });
    }
  };

  const notes = profile.coachingNotes || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <FileText size={22} className="text-purple-600" />
            Koçluk Seansları &amp; Rehberlik Görüşme Günlüğü
          </h2>
          <p className="text-xs font-semibold text-gray-400">
            Öğrenciyle yapılan görüşmeleri, alınan kararları ve takip ödevlerini kaydedin.
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
        >
          <Plus size={16} />
          Yeni Görüşme Kaydı Ekle
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 space-y-3">
            <MessageSquare size={44} className="mx-auto text-gray-300" />
            <h4 className="font-bold text-gray-700">Kayıtlı Koçluk Seansı Bulunmuyor</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Öğrenciyle gerçekleştirdiğiniz haftalık görüşme notlarını ve ödevleri buraya ekleyebilirsiniz.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-md"
            >
              + İlk Seansı Kaydet
            </button>
          </div>
        ) : (
          notes.map(note => (
            <div 
              key={note.id}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3.5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-50 text-purple-800 border border-purple-200">
                    {note.sessionType}
                  </span>
                  <h3 className="font-black text-lg text-gray-900">{note.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <Calendar size={14} /> {note.date}
                  </span>
                  <button 
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-300 hover:text-red-600 transition-colors p-1 cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              {note.summary && (
                <div className="text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  {note.summary}
                </div>
              )}

              {/* Action items / Homework */}
              {note.actionItems && note.actionItems.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    Alınan Kararlar &amp; Öğrenciye Verilen Ödevler:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {note.actionItems.map((act, i) => (
                      <div key={i} className="flex items-start gap-2 bg-purple-50/40 p-2.5 rounded-xl border border-purple-100 text-xs font-semibold text-purple-900">
                        <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next meeting footer */}
              {note.nextMeetingDate && (
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-purple-700">
                  <Clock size={14} />
                  <span>Bir Sonraki Koçluk Randevusu: <b>{note.nextMeetingDate}</b></span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal: Yeni Görüşme Ekle */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <FileText size={20} className="text-purple-600" />
                  Yeni Koçluk Görüşme Kaydı
                </h3>
                <p className="text-xs font-semibold text-gray-400">
                  Öğrenciyle yapılan görüşmenin detaylarını ve ödevleri not alın.
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Görüşme Türü</label>
                  <select 
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                  >
                    <option value="Birebir Koçluk">Birebir Koçluk</option>
                    <option value="Hedef & Motivasyon">Hedef &amp; Motivasyon</option>
                    <option value="Deneme Değerlendirmesi">Deneme Değerlendirmesi</option>
                    <option value="Sınav Kaygısı">Sınav Kaygısı &amp; Psikoloji</option>
                    <option value="Veli Görüşmesi">Veli Bilgilendirme</option>
                    <option value="Genel">Genel Değerlendirme</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Tarih</label>
                  <input 
                    type="date"
                    value={noteDate}
                    onChange={(e) => setNoteDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Görüşme Başlığı</label>
                <input 
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Örn: Kasım Ayı Net Analizi ve Paragraf Rutini"
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Görüşme Özeti &amp; Konuşulan Konular</label>
                <textarea 
                  rows={4}
                  value={noteSummary}
                  onChange={(e) => setNoteSummary(e.target.value)}
                  placeholder="Öğrencinin haftalık çalışma temposu, deneme netlerindeki değişimler ve moral-motivasyon durumu..."
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-semibold outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Action items */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">
                  Alınan Kararlar / Ödevler (Opsiyonel)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={actionItemInput}
                    onChange={(e) => setActionItemInput(e.target.value)}
                    placeholder="Örn: Günlük 30 paragraf çözülecek, Fizik kuvvet tekrarı yapılacak"
                    className="flex-1 bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-semibold outline-none focus:border-purple-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (actionItemInput.trim()) {
                          setActionItems([...actionItems, actionItemInput.trim()]);
                          setActionItemInput('');
                        }
                      }
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      if (actionItemInput.trim()) {
                        setActionItems([...actionItems, actionItemInput.trim()]);
                        setActionItemInput('');
                      }
                    }}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Ekle
                  </button>
                </div>

                {actionItems.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-xs font-semibold">
                        <span>• {item}</span>
                        <button 
                          type="button"
                          onClick={() => setActionItems(actionItems.filter((_, i) => i !== idx))}
                          className="text-purple-700 hover:text-red-600 font-black cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Bir Sonraki Görüşme Tarihi</label>
                <input 
                  type="date"
                  value={nextMeetingDate}
                  onChange={(e) => setNextMeetingDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold outline-none"
                />
              </div>

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
                  Görüşmeyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
