import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  Plus, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Layers, 
  Sparkles,
  Edit2
} from 'lucide-react';
import { RahleStudentProfile, RahleDonusRecord } from '../../types/rahle';

interface RahleHistoryProps {
  profile: RahleStudentProfile;
  onAddDonusRecord: (record: RahleDonusRecord) => void;
  onUpdateDonusRecord: (index: number, record: RahleDonusRecord) => void;
}

export const RahleHistory: React.FC<RahleHistoryProps> = ({
  profile,
  onAddDonusRecord,
  onUpdateDonusRecord
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const history = profile.donusHistory || [];

  // Form state
  const [siraNo, setSiraNo] = useState<number>(history.length + 1);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>('');
  const [totalDays, setTotalDays] = useState<number>(45);
  const [missedDays, setMissedDays] = useState<number>(5);
  const [activeDays, setActiveDays] = useState<number>(40);
  const [hamCount, setHamCount] = useState<number>(30);
  const [hasCount, setHasCount] = useState<number>(30);
  const [pagesPerTurn, setPagesPerTurn] = useState<number>(profile.kacSayfaylaGidiyor || 1);
  const [totalCuz, setTotalCuz] = useState<number>(30);
  const [totalPages, setTotalPages] = useState<number>(30 * (history.length + 1));
  const [status, setStatus] = useState<'devam_ediyor' | 'tamamlandi'>('tamamlandi');
  const [note, setNote] = useState<string>('');

  const openAddModal = () => {
    setEditingIndex(null);
    setSiraNo(history.length + 1);
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setTotalDays(45);
    setMissedDays(5);
    setActiveDays(40);
    setHamCount(30);
    setHasCount(30 * history.length);
    setPagesPerTurn(profile.kacSayfaylaGidiyor || 1);
    setTotalCuz(30);
    setTotalPages(30 * (history.length + 1));
    setStatus('devam_ediyor');
    setNote('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (rec: RahleDonusRecord, idx: number) => {
    setEditingIndex(idx);
    setSiraNo(rec.siraNo);
    setStartDate(rec.startDate);
    setEndDate(rec.endDate || '');
    setTotalDays(rec.totalDays);
    setMissedDays(rec.missedDays);
    setActiveDays(rec.activeDays);
    setHamCount(rec.hamCount);
    setHasCount(rec.hasCount);
    setPagesPerTurn(rec.pagesPerTurn);
    setTotalCuz(rec.totalCuz);
    setTotalPages(rec.totalPages);
    setStatus(rec.status);
    setNote(rec.note || '');
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record: RahleDonusRecord = {
      siraNo,
      startDate,
      endDate: endDate.trim() || undefined,
      totalDays,
      missedDays,
      activeDays,
      hamCount,
      hasCount,
      pagesPerTurn,
      totalCuz,
      totalPages,
      status,
      note: note.trim() || undefined
    };

    if (editingIndex !== null) {
      onUpdateDonusRecord(editingIndex, record);
    } else {
      onAddDonusRecord(record);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-black text-xl text-gray-900 flex items-center gap-2.5">
            <Layers size={22} className="text-amber-600" />
            <span>Geçmiş Hatime / Dönüşe Ait Sayısal Bilgiler</span>
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            Diyanet HETS Kılavuzu uyarınca öğrencinin tamamladığı hatim ve dönüşlerin kronolojik analizi
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-colors shadow-md shadow-amber-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} /> Yeni Dönüş Kaydı Ekle
        </button>
      </div>

      {/* Official HETS Table (As in Manual Page 5) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
            {profile.studentName} • Hatim ve Dönüş İcmali
          </span>
          <span className="text-xs font-bold text-amber-800">
            Toplam {history.length} Dönüş Kayıtlı
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-100/80 text-gray-600 font-black text-[11px] border-b border-gray-200 uppercase">
              <tr>
                <th className="py-3 px-3 text-center">Sıra No</th>
                <th className="py-3 px-3">Başlama Tarihi</th>
                <th className="py-3 px-3">Bitiş Tarihi</th>
                <th className="py-3 px-2 text-center">Kaç Günde Tamamladı</th>
                <th className="py-3 px-2 text-center">Ders Vermediği Gün</th>
                <th className="py-3 px-2 text-center">Ders Verdiği Gün</th>
                <th className="py-3 px-2 text-center text-blue-700">Ham Sayısı</th>
                <th className="py-3 px-2 text-center text-emerald-700">Has Sayısı</th>
                <th className="py-3 px-2 text-center">Kaçla Gidiyor</th>
                <th className="py-3 px-2 text-center">Toplam Cüz</th>
                <th className="py-3 px-2 text-center font-black">Toplam Sayfa</th>
                <th className="py-3 px-3 text-center">Durum</th>
                <th className="py-3 px-2 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-10 text-center text-gray-400 font-semibold">
                    Henüz kayıtlı bir dönüş/hatim verisi bulunmamaktadır.
                  </td>
                </tr>
              ) : (
                history.map((rec, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-3 px-3 text-center font-black text-gray-900 bg-gray-50/60">
                      {rec.siraNo}
                    </td>
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                      {rec.startDate}
                    </td>
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                      {rec.endDate || <span className="text-amber-600 font-bold">Devam Ediyor</span>}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-gray-800">
                      {rec.totalDays} gün
                    </td>
                    <td className="py-3 px-2 text-center text-rose-600 font-bold">
                      {rec.missedDays} gün
                    </td>
                    <td className="py-3 px-2 text-center text-emerald-700 font-bold">
                      {rec.activeDays} gün
                    </td>
                    <td className="py-3 px-2 text-center font-black text-blue-700">
                      {rec.hamCount}
                    </td>
                    <td className="py-3 px-2 text-center font-black text-emerald-700">
                      {rec.hasCount}
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {rec.pagesPerTurn} Sayfa
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {rec.totalCuz} Cüz
                    </td>
                    <td className="py-3 px-2 text-center font-black text-amber-900 bg-amber-50/30">
                      {rec.totalPages} Sayfa
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        rec.status === 'tamamlandi' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.status === 'tamamlandi' ? 'Tamamlandı' : 'Devam Ediyor'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => openEditModal(rec, idx)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                        title="Dönüş Bilgisini Düzenle"
                      >
                        <Edit2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {editingIndex !== null ? 'Dönüş Kaydını Düzenle' : 'Yeni Hatim / Dönüş Bilgi Kayıt'}
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">
                  HETS Kılavuzu Sayfa 3 &amp; 5 Dönüş İcmal Formu
                </p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Dönüş Sıra No *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={siraNo}
                    onChange={(e) => setSiraNo(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Kaç Sayfayla Gidiyor?
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={pagesPerTurn}
                    onChange={(e) => setPagesPerTurn(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Dönüş Başlama Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Dönüş Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Kaç Günde Tamamladı?
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalDays}
                    onChange={(e) => setTotalDays(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Ders Verdiği Gün Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={activeDays}
                    onChange={(e) => setActiveDays(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Ders Vermediği Gün Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={missedDays}
                    onChange={(e) => setMissedDays(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Ham Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={hamCount}
                    onChange={(e) => setHamCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Has Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={hasCount}
                    onChange={(e) => setHasCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Dönüş Durumu
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500"
                  >
                    <option value="tamamlandi">Tamamlandı</option>
                    <option value="devam_ediyor">Devam Ediyor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Özel Not / Açıklama
                </label>
                <textarea
                  rows={2}
                  placeholder="Dönüş ile ilgili hoca notu..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-800 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-colors shadow-md shadow-amber-600/20"
                >
                  Kaydı Tamamla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
