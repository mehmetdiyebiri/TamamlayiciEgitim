import React from 'react';
import { 
  School, 
  AlertTriangle, 
  X, 
  Heart, 
  Award, 
  Compass, 
  LayoutGrid, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  Target,
  FileSpreadsheet,
  Layers,
  Flame,
  Zap,
  HelpCircle,
  Clock,
  Activity,
  Smile,
  Check
} from 'lucide-react';
import { RahleIcon } from './rahle/RahleIcon';

export const Login = ({ state, actions }: any) => {
  const { loginSchoolId, loginCategory, schools, loginUsername, loginPassword, loginError, appTheme, themeColors } = state;
  const { setLoginSchoolId, setLoginCategory, setLoginUsername, setLoginPassword, handleLogin, setAppTheme } = actions;

  const [isAboutModalOpen, setIsAboutModalOpen] = React.useState(false);
  const [activeAboutTab, setActiveAboutTab] = React.useState<'modules' | 'benefits' | 'maarif' | 'general'>('modules');
  const [customLogo, setCustomLogo] = React.useState(() => {
    return localStorage.getItem('maarif_platform_logo') || '';
  });

  React.useEffect(() => {
    const handleStorage = () => {
      setCustomLogo(localStorage.getItem('maarif_platform_logo') || '');
    };
    window.addEventListener('storage', handleStorage);

    // Canlı Firestore senkronizasyonu
    let isSubscribed = true;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        if (!isSubscribed) return;
        unsubscribe = onSnapshot(doc(db, 'platform_settings', 'branding'), (docSnap) => {
          if (!isSubscribed) return;
          if (docSnap.exists() && docSnap.data()?.logoUrl) {
            const url = docSnap.data().logoUrl;
            setCustomLogo(url);
            localStorage.setItem('maarif_platform_logo', url);
          } else if (docSnap.exists() && docSnap.data()?.logoUrl === '') {
            setCustomLogo('');
            localStorage.removeItem('maarif_platform_logo');
          }
        }, (err) => {
          console.warn("Branding listener notice:", err);
        });
      } catch (err) {
        console.warn("Branding init error:", err);
      }
    })();

    return () => {
      isSubscribed = false;
      window.removeEventListener('storage', handleStorage);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const selectedSchool = schools.find((s: any) => s.id === loginSchoolId);
  const activeLogo = customLogo || selectedSchool?.logoUrl || '/logo.png';

  const filteredChoices = React.useMemo(() => {
    if (loginCategory === 'superadmin') return [{ id: 'superadmin', name: 'Sistem Yöneticisi' }];
    return schools.filter((s: any) => {
      if (loginCategory === 'il') return s.type === 'il';
      if (loginCategory === 'ilce') return s.type === 'ilce';
      return s.type === 'okul' || !s.type; // Fallback for schools without type
    });
  }, [loginCategory, schools]);

  React.useEffect(() => {
    if (loginCategory === 'superadmin') {
      setLoginSchoolId('superadmin');
    } else {
      setLoginSchoolId('');
    }
  }, [loginCategory, setLoginSchoolId]);

  return (
    <div className="h-screen w-screen max-h-screen bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-inter">
      {/* Centered Compact Login Card */}
      <div className="bg-white p-5 sm:p-7 md:p-8 rounded-[32px] sm:rounded-[40px] shadow-[0_20px_70px_rgba(0,0,0,0.06)] border border-gray-100 w-full max-w-md sm:max-w-lg max-h-[96vh] flex flex-col justify-between overflow-y-auto scrollbar-none animate-in fade-in zoom-in-95 duration-500">
        
        {/* Top Logo Section (Enlarged by 100% preserving aspect ratio) */}
        <div className="text-center mb-3 sm:mb-4 shrink-0">
          <div className="flex items-center justify-center">
            {activeLogo ? (
              <div className="w-full flex items-center justify-center px-1 transition-all">
                <img 
                  src={activeLogo} 
                  alt="Logo" 
                  className="h-32 sm:h-40 md:h-48 max-h-[26vh] w-auto max-w-full object-contain filter drop-shadow-sm select-none"
                  onError={() => {
                    setCustomLogo('');
                  }}
                />
              </div>
            ) : (
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] flex items-center justify-center shadow-xl shadow-blue-500/15 ring-4 ring-white" 
                style={{ backgroundColor: themeColors[appTheme][600] }}
              >
                <School className="text-white" size={56} />
              </div>
            )}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-3.5 shrink-0">
          {/* Giriş Kategorisi */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-bold text-gray-500 ml-1">Giriş Kategorisi</label>
            <div className="relative group">
              <select 
                value={loginCategory} 
                onChange={(e) => setLoginCategory(e.target.value)} 
                className="w-full h-11 sm:h-12 bg-gray-50 border border-gray-200/80 px-4 rounded-xl sm:rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-xs sm:text-[13px] text-gray-700 font-bold cursor-pointer appearance-none shadow-2xs group-hover:bg-gray-100/50"
              >
                <option value="okul">OKUL GİRİŞİ</option>
                <option value="ilce">İLÇE MİLLİ EĞİTİM GİRİŞİ</option>
                <option value="il">İL MİLLİ EĞİTİM GİRİŞİ</option>
                <option value="superadmin">SİSTEM YÖNETİCİSİ</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>

          {/* Okul / Kurum Seçimi */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-bold text-gray-500 ml-1">Okul / Kurum Seçimi</label>
            <div className="relative group">
              <select 
                value={loginSchoolId} 
                onChange={(e) => setLoginSchoolId(e.target.value)} 
                disabled={loginCategory === 'superadmin'}
                className={`w-full h-11 sm:h-12 border px-4 rounded-xl sm:rounded-2xl outline-none transition-all text-xs sm:text-[13px] font-bold appearance-none shadow-2xs ${loginCategory === 'superadmin' ? 'bg-gray-100 border-transparent text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200/80 text-gray-700 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 cursor-pointer group-hover:bg-gray-100/50'}`}
              >
                <option value="">-- Seçim Yapınız --</option>
                {filteredChoices.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                {loginCategory === 'superadmin' && <option value="superadmin">Sistem Yöneticisi</option>}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>

          {/* Kullanıcı Adı & Şifre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-gray-500 ml-1">Kullanıcı Adı</label>
              <input 
                type="text" 
                value={loginUsername} 
                onChange={e=>setLoginUsername(e.target.value)} 
                className="w-full h-11 sm:h-12 bg-gray-50 border border-gray-200/80 px-4 rounded-xl sm:rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-xs sm:text-[13px] font-bold text-gray-800 shadow-2xs hover:bg-gray-100/50" 
                autoCapitalize="none" 
                placeholder="Kullanıcı adınız"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-gray-500 ml-1">Şifre</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={e=>setLoginPassword(e.target.value)} 
                className="w-full h-11 sm:h-12 bg-gray-50 border border-gray-200/80 px-4 rounded-xl sm:rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-xs sm:text-[13px] font-bold text-gray-800 shadow-2xs hover:bg-gray-100/50" 
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="text-red-500 text-xs font-bold bg-red-50 p-2.5 rounded-xl flex items-center gap-2 border border-red-100 animate-shake">
              <AlertTriangle size={15}/> {loginError}
            </div>
          )}

          {/* Login Submit Button */}
          <div className="pt-1 sm:pt-2">
            <button 
              type="submit" 
              className="w-full text-white font-[950] text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl sm:rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all active:scale-[0.98] shadow-md shadow-blue-500/15 uppercase tracking-wider cursor-pointer" 
              style={{ backgroundColor: themeColors[appTheme][600] }}
            >
              SİSTEME GİRİŞ YAP
            </button>
          </div>
        </form>

        {/* Footer: Theme Switcher & About Trigger */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-100/80 shrink-0 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">GÖRÜNÜM TEMASI</span>
            <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-full border border-gray-100">
              {Object.keys(themeColors).map(t => (
                <button 
                  key={t} 
                  type="button" 
                  onClick={() => setAppTheme(t)} 
                  style={{backgroundColor: themeColors[t][600]}} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all relative ${appTheme === t ? 'scale-110 ring-2 ring-blue-500/40 shadow-xs' : 'hover:scale-110 opacity-70 hover:opacity-100'}`} 
                  title={t}
                />
              ))}
            </div>
          </div>

          <div className="text-center pt-0.5">
            <button 
              type="button" 
              onClick={() => setIsAboutModalOpen(true)}
              className="text-xs font-[800] tracking-wide transition-all select-none hover:underline inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
              style={{ color: themeColors[appTheme][600] }}
            >
              <Sparkles size={13} />
              <span>MaarifMerkezi Nedir?</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* DETAYLI MAARİF MERKEZİ TANITIM MODALİ (ALİM, ARİF, PUSULA, RAHLE)    */}
      {/* ------------------------------------------------------------------- */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_32px_96px_rgba(0,0,0,0.18)] border border-gray-100 w-full max-w-5xl h-[90vh] max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-purple-50/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md text-white shrink-0" style={{ backgroundColor: themeColors[appTheme][600] }}>
                  <School size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-[900] tracking-tight text-gray-900">
                    MaarifMerkezi.Com — Bütüncül Eğitim &amp; Gelişim Platformu
                  </h2>
                  <p className="text-[10px] font-black tracking-widest text-purple-700 uppercase">
                    ALİM • ARİF • PUSULA • RAHLE Modülleri ve Maarif Modeli Uyumu
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsAboutModalOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation (Tabs) */}
            <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/60 px-4 sm:px-6 scrollbar-none shrink-0 gap-1">
              {[
                { id: 'modules', label: '🏛️ 4 Temel Modül (ALİM, ARİF, PUSULA, RAHLE)', icon: Layers },
                { id: 'benefits', label: '👥 Kime Ne Fayda Sağlar? (Öğretmen, Öğrenci, Veli)', icon: Users },
                { id: 'maarif', label: '🇹🇷 Maarif Modeli %100 Uyum', icon: ShieldCheck },
                { id: 'general', label: '✨ Genel Bakış ve Misyon', icon: Sparkles }
              ].map(tab => {
                const isActive = activeAboutTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveAboutTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-xs font-bold tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none ${
                      isActive 
                        ? 'border-b-4 text-purple-700 font-[900] bg-white rounded-t-xl shadow-2xs' 
                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                    style={isActive ? { borderColor: themeColors[appTheme][600], color: themeColors[appTheme][700] } : {}}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* TAB 1: 4 TEMEL MODÜL (ALİM, ARİF, PUSULA, RAHLE) */}
              {activeAboutTab === 'modules' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                      <Layers className="text-purple-600" size={22} />
                      MaarifMerkezi.Com'un 4 Ana Taşıyıcı Sütunu
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Öğrencinin aklını, ahlakını, geleceğe dönük hedeflerini ve manevi dünyasını dengeli bir bütünlükte inşa eden 4 entegre sistem:
                    </p>
                  </div>

                  {/* 4 Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* 1. ALİM MODÜLÜ */}
                    <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                            📘
                          </div>
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-black text-[10px] uppercase">
                              AKADEMİK GELİŞİM MERKEZİ
                            </span>
                            <h4 className="text-base font-black text-blue-950">ALİM MODÜLÜ</h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        Öğrencilerin zihinsel potansiyelini, öğrenme stillerini ve ders kazanımlarını en üst düzeye çıkaran akademik motor.
                      </p>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold border-t border-blue-200/60 pt-2">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-blue-600 mt-0.5 shrink-0" />
                          <span><strong>Çoklu Zeka &amp; Öğrenme Stilleri Testi:</strong> 8 zeka alanında öğrenci haritası çıkarır.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-blue-600 mt-0.5 shrink-0" />
                          <span><strong>Dinamik Ödevlendirme:</strong> Öğrenciye özel ödev karnesi ve ilerleme takibi.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-blue-600 mt-0.5 shrink-0" />
                          <span><strong>MİT (Matematik / Zihinden İşlem):</strong> 5. sınıf zihin haritaları ve pratik antrenörler.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-blue-600 mt-0.5 shrink-0" />
                          <span><strong>Hızlı Okuma &amp; LGS/YKS Telafi:</strong> Okuma hızı ve sınav telafi testleri.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 2. ARİF MODÜLÜ */}
                    <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/20">
                            🌿
                          </div>
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-black text-[10px] uppercase">
                              DEĞERLER &amp; ERDEM GELİŞİMİ
                            </span>
                            <h4 className="text-base font-black text-emerald-950">ARİF MODÜLÜ</h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        Milli ve manevi erdemleri teoriden pratiğe döken, ahlaki davranışları ödüllendiren ve takip eden karakter fidanlığı.
                      </p>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold border-t border-emerald-200/60 pt-2">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span><strong>Erdem Puanları &amp; Davranış Takibi:</strong> Dürüstlük, saygı, adalet, vatanseverlik gibi değerleri puanlar.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span><strong>Toplum Hizmeti &amp; Sosyal Kulüpler:</strong> Çevre, satranç, gönüllülük ve yardım projeleri.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span><strong>Bütüncül Gelişim Portfolyosu:</strong> Davranış karnesi ve akran çatışmasını önleyici iklim.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 3. PUSULA MODÜLÜ */}
                    <div className="bg-purple-50/50 p-5 rounded-3xl border border-purple-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-purple-500/20">
                            🧭
                          </div>
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-black text-[10px] uppercase">
                              REHBERLİK, KOÇLUK &amp; SINAV ANALİZİ
                            </span>
                            <h4 className="text-base font-black text-purple-950">PUSULA MODÜLÜ</h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        Öğrencinin hedeflerine yön veren birebir koçluk, haftalık ders çalışma planlama ve MEB uyumlu sınav madde analiz sistemi.
                      </p>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold border-t border-purple-200/60 pt-2">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-purple-600 mt-0.5 shrink-0" />
                          <span><strong>5 Aşamalı Deneme Analizi:</strong> Net Analizi → Konu Analizi → Zayıf Alan Tespiti → Çalışma Planı Üret → Geri Bildirim Yaz.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-purple-600 mt-0.5 shrink-0" />
                          <span><strong>MEB Yazılı Sınav Analizi:</strong> Soru başarı grafikleri, histogram ve 1-2 sayfalık A4 resmi PDF çıktısı.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-purple-600 mt-0.5 shrink-0" />
                          <span><strong>Kişiselleştirilmiş Haftalık Plan:</strong> Eksik konulara özel otomatik üretilen ders çalışma çizelgesi.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 4. RAHLE MODÜLÜ */}
                    <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20">
                            📖
                          </div>
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-black text-[10px] uppercase">
                              DİNİ İLİMLER, EZBER &amp; KUR'AN EĞİTİMİ
                            </span>
                            <h4 className="text-base font-black text-amber-950">RAHLE MODÜLÜ</h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        Kur'an-ı Kerim okuma, tecvid, sure/ayet ezberleri ve temel dini bilgilerin bireysel ilerleyişini takip eden manevi ilim halkası.
                      </p>
                      <ul className="space-y-1.5 text-xs text-gray-700 font-semibold border-t border-amber-200/60 pt-2">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-amber-600 mt-0.5 shrink-0" />
                          <span><strong>Sure &amp; Ayet Ezber Takibi:</strong> Namaz sureleri, Yasin, Mülk vb. ezber kontrol çizelgesi.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-amber-600 mt-0.5 shrink-0" />
                          <span><strong>Tecvid &amp; Kur'an Okuma:</strong> Mahreç, harf talimi ve hatim takip mekanizması.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-amber-600 mt-0.5 shrink-0" />
                          <span><strong>Hitabet &amp; İmam Hatip Pratikleri:</strong> İmamlık, müezzinlik ve vaaz uygulama değerlendirmeleri.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: KİME NE FAYDA SAĞLAR? (ÖĞRETMEN, ÖĞRENCİ, VELİ) */}
              {activeAboutTab === 'benefits' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                      <Users className="text-purple-600" size={22} />
                      Tüm Eğitim Paydaşlarına Sağlanan Somut Kazanımlar
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      MaarifMerkezi.Com; öğretmenin yükünü hafifletir, öğrenciyi kanatlandırır ve veliyi sürecin güvenilir ortağı yapar:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Öğretmene Faydaları */}
                    <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                          👨‍🏫
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-blue-800 uppercase">EĞİTİMCİ DOSTU</span>
                          <h4 className="text-base font-black text-blue-950">Öğretmene Faydaları</h4>
                        </div>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-700 font-semibold pt-2">
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span><strong>Bürokrasiyi Sıfırlar:</strong> Sınav analizlerini, soru ortalamalarını ve MEB raporlarını saniyeler içinde otomatik hazırlar.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span><strong>Sınıf Zeka Haritası:</strong> Öğrencilerin öğrenme stillerini bilerek derse nokta atışı yöntemle girer.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span><strong>Zahmetsiz Takip:</strong> Ödev, davranış ve koçluk seanslarını tek ekrandan yönetir.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Öğrenciye Faydaları */}
                    <div className="p-5 rounded-3xl bg-purple-50/60 border border-purple-200 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-lg">
                          🎓
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-purple-800 uppercase">MERKEZDEKİ BİREY</span>
                          <h4 className="text-base font-black text-purple-950">Öğrenciye Faydaları</h4>
                        </div>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-700 font-semibold pt-2">
                        <li className="flex items-start gap-1.5">
                          <span className="text-purple-600 font-bold">✓</span>
                          <span><strong>Kişiye Özel Telafi Planı:</strong> Denemelerde yanlış yaptığı konulara özel otomatik üretilen haftalık çalışma planı alır.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-purple-600 font-bold">✓</span>
                          <span><strong>Kendi Hızında Gelişim:</strong> Zihinden işlem, hızlı okuma ve ezber modülleriyle eğlenerek öğrenir.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-purple-600 font-bold">✓</span>
                          <span><strong>Motivasyon &amp; Erdem:</strong> Sadece sınav notlarıyla değil; ahlaki gayreti ve sosyal projeleriyle takdir edilir.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Veliye Faydaları */}
                    <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                          👨‍👩‍👧
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-emerald-800 uppercase">ŞEFFAF İŞ BİRLİĞİ</span>
                          <h4 className="text-base font-black text-emerald-950">Veliye Faydaları</h4>
                        </div>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-700 font-semibold pt-2">
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span><strong>Bütüncül Gözlem:</strong> Çocuğunun akademik, ahlaki, sosyal ve ezber gelişimini tek bir portal üzerinden net görür.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span><strong>Doğru Yönlendirme:</strong> Çocuğunun hangi zeka alanında güçlü olduğunu bilerek geleceğini daha sağlıklı planlar.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span><strong>Düzenli İletişim:</strong> Okul anketleri ve geri bildirim kanallarıyla okul yönetimine doğrudan sesini duyurur.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MAARİF MODELİ İLE %100 UYUM */}
              {activeAboutTab === 'maarif' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-6 rounded-3xl shadow-lg">
                    <div className="flex-1 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-black uppercase tracking-wider">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        TÜRKİYE YÜZYILI MAARİF MODELİ VİZYONU
                      </div>
                      <h3 className="text-2xl font-black tracking-tight">
                        "Köklerinden Beslenen, Göklere Uzanan Bütüncül Nesiller"
                      </h3>
                      <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
                        Milli Eğitim Bakanlığı'nın ilan ettiği yeni Maarif Modeli; insanı ahlaki, zihni, bedeni ve ruhi bir bütünlük içinde ele alır. Bilgiyi salt ezber değil; erdeme, beceriye ve eyleme dönüştürmeyi hedefler.
                      </p>
                    </div>
                  </div>

                  {/* 4 Maarif Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2">
                      <span className="text-xs font-black text-purple-700 tracking-wider uppercase block">
                        1. Akl-ı Selim (Akademik &amp; Eleştirel Zihin - ALİM &amp; PUSULA)
                      </span>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Çoklu zeka haritaları, hızlı okuma, zihinden işlem antrenörleri ve 5 aşamalı deneme analizleri ile öğrencinin analitik düşünme yeteneği geliştirilir.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2">
                      <span className="text-xs font-black text-emerald-700 tracking-wider uppercase block">
                        2. Kalb-i Selim (Erdem &amp; Ahlak Eğitimi - ARİF)
                      </span>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Adalet, merhamet, dürüstlük, sabır ve vatan sevgisi gibi değerler soyut birer ders olmaktan çıkıp Erdem Puanları ve sosyal eylemlerle yaşatılır.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2">
                      <span className="text-xs font-black text-amber-700 tracking-wider uppercase block">
                        3. Ruh-ı Selim (Maneviyat &amp; Dini İlimler - RAHLE)
                      </span>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Kur'an-ı Kerim tilaveti, tecvid ve sure/ayet ezberleri takip edilerek öğrencinin manevi dünyası köklü medeniyet mirasımızla beslenir.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2">
                      <span className="text-xs font-black text-blue-700 tracking-wider uppercase block">
                        4. Zevk-i Selim (Toplumsal Hizmet &amp; Sosyal Kulüpler)
                      </span>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Öğrenciler sosyal sorumluluk projeleri, okul kulüpleri ve kültürel etkinliklerle toplumla bütünleşir ve liderlik becerisi kazanır.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GENEL BAKIŞ VE MİSYON */}
              {activeAboutTab === 'general' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="max-w-3xl space-y-3">
                    <h3 className="text-2xl font-[900] tracking-tight text-gray-900">
                      Eğitimin Yeni Akıllı Platformu: MaarifMerkezi.Com
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      <strong>MaarifMerkezi.Com</strong>, çağdaş pedagojik yaklaşımları dijital kolaylıklarla harmanlayan, idarecilerden velilere kadar tüm eğitim paydaşlarını tek çatı altında buluşturan vizyoner bir <strong>Maarif Asistanı</strong> sistemidir.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Sadece ders notlarını ve devamsızlığı takip eden klasik sistemlerin aksine MaarifMerkezi.Com; öğrencilerin ahlaki gelişimini, bireysel yeteneklerini, çoklu zeka profillerini, sosyal sorumluluklarını ve ders dışı kulüp faaliyetlerini yaşayan derinlikli bir <strong>bütüncül gelişim portfolyosuna</strong> dönüştürür.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <h4 className="font-extrabold text-sm text-gray-900">Bürokrasiyi Sıfırlar</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Sınav analizleri, kurul kararları ve idari raporlar otomatik hazırlanır.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                        ❤️
                      </div>
                      <h4 className="font-extrabold text-sm text-gray-900">Karakteri Canlandırır</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Erdem puanları ile iyi ve örnek davranışlar teşvik edilir.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        🎯
                      </div>
                      <h4 className="font-extrabold text-sm text-gray-900">Bireysel Odak</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Her çocuğun zeka stiline ve eksik konularına özel gelişim rotası sunulur.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/60 shrink-0">
              <span className="text-xs font-bold text-gray-400">
                MaarifMerkezi.Com • Eğitim &amp; Değerler Portalı
              </span>
              <button
                type="button"
                onClick={() => setIsAboutModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-md active:scale-95 transition-all cursor-pointer"
                style={{ backgroundColor: themeColors[appTheme][600] }}
              >
                Anladım, Harika!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
