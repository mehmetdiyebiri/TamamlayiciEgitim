import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Edit3, 
  Printer, 
  Sparkles, 
  Bookmark, 
  Target, 
  Layers,
  FileText
} from 'lucide-react';
import { RahleStudentProfile } from '../../types/rahle';
import { calculateHafizlikStats } from '../../utils/rahleData';

interface RahleDashboardProps {
  profile: RahleStudentProfile;
  onUpdateProfile: (updated: Partial<RahleStudentProfile>) => void;
  classes: Record<string, string[]>;
}

export const RahleDashboard: React.FC<RahleDashboardProps> = ({
  profile,
  onUpdateProfile
}) => {
  const stats = calculateHafizlikStats(profile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showKarneModal, setShowKarneModal] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    hafizlikBaslamaTarihi: profile.hafizlikBaslamaTarihi || '',
    kacSayfaylaGidiyor: profile.kacSayfaylaGidiyor || 1,
    kacinciDonuste: profile.kacinciDonuste || 1,
    donusBaslamaTarihi: profile.donusBaslamaTarihi || '',
    hamSayisi: profile.hamSayisi || 0,
    hasSayisi: profile.hasSayisi || 0,
    advisorTeacher: profile.advisorTeacher || '',
    targetCompletionDate: profile.targetCompletionDate || '',
    notes: profile.notes || ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditModalOpen(false);
  };

  // Circular progress calculations for SVG Donut chart
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const okunanDash = (stats.percentage / 100) * circumference;
  const kalanDash = circumference - okunanDash;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-900/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-black tracking-wide text-amber-100 border border-white/20">
            <Bookmark size={14} className="text-amber-300" />
            <span>HETS • HAFIZLIK EZBER TAKİP SİSTEMİ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
            <span>{profile.studentName}</span>
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-white/20 border border-white/20">
              {profile.className.replace('_', '')}
            </span>
          </h1>
          <p className="text-amber-100/90 text-sm font-medium max-w-2xl">
            {profile.kacinciDonuste}. Dönüşte • Her cüzden {profile.kacSayfaylaGidiyor} sayfa ile devam ediyor.
            Başlama: <span className="font-bold text-white">{profile.hafizlikBaslamaTarihi}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center shrink-0">
          <button
            onClick={() => setShowKarneModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
          >
            <Printer size={16} /> Hafızlık Karnesi
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-amber-900 hover:bg-amber-50 font-black text-xs transition-all cursor-pointer shadow-lg shadow-black/10"
          >
            <Edit3 size={16} /> Durum Güncelle
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Dönüş & Sayfa */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Hafızlık Dönüşü</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">
            {profile.kacinciDonuste}<span className="text-lg font-bold text-gray-400">. Dönüş</span>
          </div>
          <p className="text-xs font-semibold text-gray-500">
            Her gün <strong className="text-amber-700">{profile.kacSayfaylaGidiyor} sayfa</strong> usulü
          </p>
        </div>

        {/* Card 2: Toplam İlerleme */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Ezber İlerlemesi</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">
            %{stats.percentage}
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <p className="text-xs font-semibold text-gray-500">
            <strong>{stats.totalMemorizedPages}</strong> / 600 sayfa okundu
          </p>
        </div>

        {/* Card 3: Ham & Has Sayıları */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Ham & Has Durumu</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <span className="text-blue-600 font-extrabold">{stats.totalHam} Ham</span>
            <span className="text-gray-300">•</span>
            <span className="text-emerald-600 font-extrabold">{stats.totalHas} Has</span>
          </div>
          <p className="text-xs font-semibold text-gray-500">
            Kalan: <strong className="text-rose-600">{stats.remainingPages} sayfa</strong>
          </p>
        </div>

        {/* Card 4: Ders İstikrarı */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Ders İstikrarı</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">
            {stats.totalLessonsGiven} <span className="text-sm font-bold text-gray-400">Ders</span>
          </div>
          <p className="text-xs font-semibold text-gray-500">
            {stats.totalKaldi > 0 ? `${stats.totalKaldi} Kaldı` : 'Hiç takılmadı'} • {stats.totalAbsent} Mazeret
          </p>
        </div>
      </div>

      {/* Main Grid: HETS Durum Bilgileri + Genel Durum Grafiği */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: HETS Hafızlık Durum Bilgileri Tablosu */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                📋
              </div>
              <h3 className="font-black text-lg text-gray-900">Hafızlık Durum Bilgileri (HETS)</h3>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Güncelle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Öğrenci Adı Soyadı</span>
              <span className="font-black text-gray-900 text-base">{profile.studentName}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Sınıfı / Şubesi</span>
              <span className="font-black text-gray-900 text-base">{profile.className.replace('_', '')}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Hafızlığa Başlama Tarihi (1. Cüz 1. Sayfa)</span>
              <span className="font-bold text-gray-800">{profile.hafizlikBaslamaTarihi || '-'}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Hafızlığı Bitirme Tarihi</span>
              <span className="font-bold text-gray-800">{profile.hafizlikBitirmeTarihi || 'Eğitim Devam Ediyor'}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Ham / Çiğ Sayısı</span>
              <span className="font-bold text-blue-700">{profile.hamSayisi} Cüz / Sayfa</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Has / Pişmiş Sayısı</span>
              <span className="font-bold text-emerald-700">{profile.hasSayisi} Cüz / Sayfa</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Kaçıncı Hatimde / Dönüşte</span>
              <span className="font-bold text-amber-700">{profile.kacinciDonuste}. Dönüş</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Kaç Sayfayla Gidiyor</span>
              <span className="font-bold text-gray-900">{profile.kacSayfaylaGidiyor} Sayfa</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Mevcut Dönüş Başlama Tarihi</span>
              <span className="font-bold text-gray-800">{profile.donusBaslamaTarihi || '-'}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-xs font-bold text-gray-400 block uppercase">Danışman Öğretici</span>
              <span className="font-bold text-gray-800">{profile.advisorTeacher || 'Atanmadı'}</span>
            </div>
          </div>

          {profile.notes && (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 font-medium">
              <strong className="block font-black text-amber-950 mb-0.5">Öğretici Notu:</strong>
              {profile.notes}
            </div>
          )}
        </div>

        {/* Right Col: HETS Hafızlık Genel Durum Grafiği (Circular Chart as in HETS page 5) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col items-center justify-between space-y-6">
          <div className="w-full text-center border-b border-gray-100 pb-3">
            <h3 className="font-black text-base text-gray-900 uppercase tracking-wide">
              Hafızlık Genel Durum Grafiği
            </h3>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">
              HETS Toplam Okunan vs Kalan Oranı
            </p>
          </div>

          {/* Donut Chart */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background ring (Kalan) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-gray-200"
                strokeWidth="18"
                fill="none"
              />
              {/* Foreground ring (Okunan) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-amber-600 transition-all duration-700 ease-out"
                strokeWidth="18"
                strokeDasharray={`${okunanDash} ${circumference}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-gray-900">%{stats.percentage}</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tamamlandı</span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full space-y-2.5 pt-2 border-t border-gray-100 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-600" />
                <span className="font-bold text-gray-700">Okunan / Ezberlenen</span>
              </div>
              <span className="font-black text-gray-900">{stats.totalMemorizedPages} Sayfa (%{stats.percentage})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-gray-200" />
                <span className="font-bold text-gray-700">Kalan Dersler</span>
              </div>
              <span className="font-black text-gray-500">{stats.remainingPages} Sayfa (%{100 - stats.percentage})</span>
            </div>

            <div className="mt-3 p-2.5 bg-amber-50 rounded-xl text-center text-amber-900 font-bold text-[11px]">
              🎯 Hedef Bitiş: {profile.targetCompletionDate || 'Belirlenmedi'}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal (HETS Güncelleme Ekranı - Page 3) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">Öğrenci Hafızlık Bilgilerini Güncelle</h3>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Diyanet HETS Standart Veri Girişi</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Hafızlığa Başlama Tarihi (1. Cüz 1. Sayfa) *
                  </label>
                  <input
                    type="date"
                    required
                    value={editForm.hafizlikBaslamaTarihi}
                    onChange={(e) => setEditForm({...editForm, hafizlikBaslamaTarihi: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Kaçıncı Dönüşte / Hatimde? *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={editForm.kacinciDonuste}
                    onChange={(e) => setEditForm({...editForm, kacinciDonuste: parseInt(e.target.value) || 1})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Kaç Sayfayla Gidiyor? (1..20) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={editForm.kacSayfaylaGidiyor}
                    onChange={(e) => setEditForm({...editForm, kacSayfaylaGidiyor: parseInt(e.target.value) || 1})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Bu Dönüşe Başlama Tarihi
                  </label>
                  <input
                    type="date"
                    value={editForm.donusBaslamaTarihi}
                    onChange={(e) => setEditForm({...editForm, donusBaslamaTarihi: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Ham (Çiğ) Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={editForm.hamSayisi}
                    onChange={(e) => setEditForm({...editForm, hamSayisi: parseInt(e.target.value) || 0})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Has (Pişmiş) Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={editForm.hasSayisi}
                    onChange={(e) => setEditForm({...editForm, hasSayisi: parseInt(e.target.value) || 0})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Danışman / Hafızlık Hocası
                </label>
                <input
                  type="text"
                  placeholder="Örn: Ahmet Hoca"
                  value={editForm.advisorTeacher}
                  onChange={(e) => setEditForm({...editForm, advisorTeacher: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Hedef Hafızlık Tamamlama Tarihi
                </label>
                <input
                  type="date"
                  value={editForm.targetCompletionDate}
                  onChange={(e) => setEditForm({...editForm, targetCompletionDate: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Öğretici Görüşü / Özel Not
                </label>
                <textarea
                  rows={2}
                  placeholder="Öğrencinin ezber durumu, tavsiyeler..."
                  value={editForm.notes}
                  onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-800 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-colors shadow-md shadow-amber-600/20"
                >
                  Bilgileri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Karne & Yazdır Modalı */}
      {showKarneModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 print:hidden">
              <div className="flex items-center gap-2 text-amber-800">
                <FileText size={20} />
                <h3 className="font-black text-lg">Resmi Hafızlık Gelişim Raporu & Karnesi</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white font-black text-xs rounded-xl hover:bg-amber-700 transition-colors shadow-xs"
                >
                  <Printer size={15} /> Yazdır / PDF
                </button>
                <button
                  onClick={() => setShowKarneModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Certificate / Report */}
            <div className="border-4 border-double border-amber-900/30 p-8 rounded-2xl bg-amber-50/20 space-y-6 text-gray-900">
              <div className="text-center space-y-1 border-b-2 border-amber-900/20 pb-4">
                <div className="text-xs font-black tracking-widest text-amber-800 uppercase">
                  T.C. DİYANET İŞLERİ BAŞKANLIĞI / MEB PROTOKOLÜ
                </div>
                <h2 className="text-2xl font-black text-gray-900">
                  HAFIZLIK EĞİTİMİ GELİŞİM VE TAKİP BELGESİ
                </h2>
                <div className="text-xs font-bold text-gray-500">
                  (HETS - Hafızlık Ezber Takip Sistemi Çıktısı)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div><strong>Öğrenci:</strong> {profile.studentName}</div>
                <div><strong>Sınıfı:</strong> {profile.className}</div>
                <div><strong>Başlama Tarihi:</strong> {profile.hafizlikBaslamaTarihi}</div>
                <div><strong>Mevcut Dönüş:</strong> {profile.kacinciDonuste}. Dönüş ({profile.kacSayfaylaGidiyor} sayfa)</div>
                <div><strong>Ham Sayısı:</strong> {stats.totalHam} Sayfa</div>
                <div><strong>Has Sayısı:</strong> {stats.totalHas} Sayfa</div>
                <div><strong>Toplam Okunan:</strong> {stats.totalMemorizedPages} / 600 Sayfa (%{stats.percentage})</div>
                <div><strong>Kalan:</strong> {stats.remainingPages} Sayfa</div>
              </div>

              <div className="border-t border-b border-amber-900/20 py-4 space-y-2">
                <div className="text-xs font-black uppercase text-amber-900">Öğretici Kanaat ve İlerleme Raporu:</div>
                <p className="text-xs leading-relaxed text-gray-700 italic">
                  "{profile.notes || 'Öğrencinin ezber gayreti ve ders verme disiplini takdir edilmekte olup, mevcut hızında devam etmesi halinde öngörülen tarihte hafızlığını ikmal etmesi beklenmektedir.'}"
                </p>
              </div>

              <div className="flex justify-between items-end pt-6 text-xs text-center">
                <div>
                  <div className="font-bold text-gray-800">{profile.advisorTeacher || 'Hafızlık Öğreticisi'}</div>
                  <div className="text-gray-400 mt-1">Hafızlık Danışmanı</div>
                  <div className="text-[10px] text-gray-300 mt-6">(İmza / Mühür)</div>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Kurum Yöneticisi</div>
                  <div className="text-gray-400 mt-1">Eğitim Birimi Sorumlusu</div>
                  <div className="text-[10px] text-gray-300 mt-6">(İmza / Mühür)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
