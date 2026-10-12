import React, { useState, useEffect, useRef } from 'react';
import { db, app } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FileText, Download, Upload, Plus, Trash2, CheckCircle2, Circle, Clock, File, Activity, Save, User, FileEdit, Users, ClipboardList } from 'lucide-react';

const defaultFormData = {
  studentInfo: {
    birthDate: '', boardDecision: '', diagnosis: '', supportEd: '', supportEdOutside: '',
    materials: '', healthInfo: '', environment: '', bepStart: '', bepEnd: ''
  },
  familyInfo: {
    mother: { name: '', phone: '', address: '', work: '' },
    father: { name: '', phone: '', address: '', work: '' },
    guardian: { name: '', phone: '', address: '', work: '' }
  },
  perfInfo: {
    history: '', behaviorProblem: '',
    performances: [] // { id, subject, level }
  },
  goals: [], // { id, subject, envArrangements, longTermGoals: [ { id, title, shortTermGoals: [ { id, title, criteria, method, materials, dates, evalMethod, evalDates, status } ] } ] }
  unitInfo: {
    otherServices: [], // { id, service, subject, hours, responsible }
    familyInfoFreq: '', familyInfoMethod: '', familyTraining: 'hayir', familyTrainingMethod: '',
    otherDecisions: '', nextMeetingDate: '', generalEval: '',
    members: [] // { id, title, name }
  },
  files: []
};

const SUBJECTS = [
  "Matematik", 
  "Türkçe", 
  "Hayat Bilgisi ve Günlük Yaşam Becerileri", 
  "İletişim Becerileri", 
  "Sosyal Beceriler", 
  "Din Kültürü ve Ahlâk Bilgisi", 
  "Sağlıklı Yaşam ve Güvenlik Becerileri", 
  "Görsel Sanatlar", 
  "Müzik", 
  "Beden Eğitimi, Oyun ve Spor", 
  "Kültürel ve Sosyal Etkinlikler"
];

export const BepPanel = ({ state, actions }: any) => {
  const { users, classes, activeSchoolId } = state;
  const { showToast } = actions || {};
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  const [formData, setFormData] = useState<any>(JSON.parse(JSON.stringify(defaultFormData)));
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('student');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadType, setUploadType] = useState<'pdf'|'word'>('pdf');
  const isInitialLoad = useRef(true);

  const classStudents = selectedClass && classes[selectedClass] ? classes[selectedClass] : [];

  const loadBepData = async () => {
    if (!selectedStudent || !activeSchoolId || !selectedSubject) return;
    setLoading(true);
    try {
      const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
      const bepRef = doc(db, sysColName, `bep_${selectedStudent}_${selectedSubject}`);
      const snap = await getDoc(bepRef);
      if (snap.exists()) {
        const data = snap.data();
        setFormData({ ...JSON.parse(JSON.stringify(defaultFormData)), ...data });
      } else {
        setFormData(JSON.parse(JSON.stringify(defaultFormData)));
      }
    } catch (err) {
      console.error("Error loading BEP:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    isInitialLoad.current = true;
    loadBepData().then(() => {
       // slightly delay clearing initial load to avoid triggering save right away
       setTimeout(() => { isInitialLoad.current = false; }, 500);
    });
  }, [selectedStudent, selectedSubject, activeSchoolId]);

  useEffect(() => {
    if (isInitialLoad.current) return;
    if (!selectedStudent || !activeSchoolId || !selectedSubject) return;

    const timer = setTimeout(async () => {
      try {
        const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
        const bepRef = doc(db, sysColName, `bep_${selectedStudent}_${selectedSubject}`);
        await setDoc(bepRef, formData, { merge: true });
        console.log("Auto-saved BEP");
      } catch (err) {
        console.error("Auto-save error:", err);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData, selectedStudent, selectedSubject, activeSchoolId]);

  const handleSave = async () => {
    if (!selectedStudent || !activeSchoolId || !selectedSubject) return;
    setSaving(true);
    try {
      const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
      const bepRef = doc(db, sysColName, `bep_${selectedStudent}_${selectedSubject}`);
      await setDoc(bepRef, formData, { merge: true });
      if (showToast) showToast('BEP başarıyla kaydedildi.', 'success');
    } catch (err) {
      console.error("Error saving BEP:", err);
      if (showToast) showToast('Kaydedilirken bir hata oluştu.', 'error');
    }
    setSaving(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSchoolId || !selectedStudent || !selectedSubject) return;

    if (file.size > 800000) {
        if (showToast) showToast('Dosya boyutu çok büyük (Maksimum 800KB).', 'error');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
    }

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      if (showToast) showToast('Dosya yapay zeka ile analiz ediliyor, lütfen bekleyin...', 'success');
      let aiParsedData = null;
      try {
        const res = await fetch('/api/parse-bep', {
          method: 'POST',
          body: formDataToSend,
        });
        if (res.ok) {
          const result = await res.json();
          aiParsedData = result.data;
          if (showToast) showToast('Yapay zeka analizi tamamlandı, veriler aktarıldı.', 'success');
        } else {
          const errorData = await res.json().catch(() => ({}));
          console.error("Parse failed", res.status, errorData);
          if (showToast) showToast('Yapay zeka analizi başarısız oldu.', 'error');
        }
      } catch (err) {
        console.error("AI Parse error:", err);
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Url = event.target?.result as string;
        
        const newFileObj = {
          name: file.name,
          url: base64Url,
          type: uploadType,
          uploadedAt: new Date().toISOString()
        };

        const updatedFiles = [...(formData.files || []), newFileObj];
        
        setFormData((prev: any) => {
           const newData = { ...prev, files: updatedFiles };
           if (aiParsedData) {
             // Merge aiParsedData deeply
             if (aiParsedData.studentInfo) newData.studentInfo = { ...newData.studentInfo, ...aiParsedData.studentInfo };
             if (aiParsedData.familyInfo) {
               if (aiParsedData.familyInfo.mother) newData.familyInfo.mother = { ...newData.familyInfo.mother, ...aiParsedData.familyInfo.mother };
               if (aiParsedData.familyInfo.father) newData.familyInfo.father = { ...newData.familyInfo.father, ...aiParsedData.familyInfo.father };
               if (aiParsedData.familyInfo.guardian) newData.familyInfo.guardian = { ...newData.familyInfo.guardian, ...aiParsedData.familyInfo.guardian };
             }
             if (aiParsedData.perfInfo) newData.perfInfo = { ...newData.perfInfo, ...aiParsedData.perfInfo };
             if (aiParsedData.goals && Array.isArray(aiParsedData.goals)) {
               newData.goals = [...newData.goals, ...aiParsedData.goals];
             }
             if (aiParsedData.unitInfo) newData.unitInfo = { ...newData.unitInfo, ...aiParsedData.unitInfo };
           }
           return newData;
        });
        
        // Auto save after upload
        const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
        const bepRef = doc(db, sysColName, `bep_${selectedStudent}_${selectedSubject}`);
        
        // Save merged data
        const docToSave = aiParsedData ? { 
           files: updatedFiles,
           studentInfo: { ...(formData.studentInfo || {}), ...(aiParsedData.studentInfo || {}) },
           familyInfo: { 
             mother: { ...(formData.familyInfo?.mother || {}), ...(aiParsedData.familyInfo?.mother || {}) },
             father: { ...(formData.familyInfo?.father || {}), ...(aiParsedData.familyInfo?.father || {}) },
             guardian: { ...(formData.familyInfo?.guardian || {}), ...(aiParsedData.familyInfo?.guardian || {}) }
           },
           perfInfo: { ...(formData.perfInfo || {}), ...(aiParsedData.perfInfo || {}) },
           unitInfo: { ...(formData.unitInfo || {}), ...(aiParsedData.unitInfo || {}) },
           goals: [...(formData.goals || []), ...(aiParsedData.goals || [])]
        } : { files: updatedFiles };
        
        await setDoc(bepRef, docToSave, { merge: true });

        if (showToast) showToast('Dosya yüklendi ve BEP bilgileri güncellendi.', 'success');
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.onerror = () => {
        console.error('FileReader error');
        if (showToast) showToast('Dosya okunurken hata oluştu.', 'error');
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('File upload error:', err);
      if (showToast) showToast('Dosya yüklenirken hata oluştu.', 'error');
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getStudentDetails = () => {
    const match = selectedStudent.match(/^(\d+)\s*[-]\s*(.+)$/);
    return {
      no: match ? match[1] : '-',
      name: match ? match[2] : selectedStudent
    };
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'yeterli': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'gelistirilmeli': return <Circle className="text-red-500" size={20} />;
      case 'devam_ediyor': default: return <Clock className="text-orange-500" size={20} />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-white p-8 rounded-[40px] border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Activity size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-900 tracking-tight">BEP Dosyası</h2>
              <div className="flex items-center gap-4 mt-1">
                 <p className="text-sm text-gray-500 font-medium">Bireyselleştirilmiş Eğitim Programı</p>
                 <a href="https://orgm.meb.gov.tr/meb_iys_dosyalar/2022_09/20141302_BEP_Word.docx" target="_blank" rel="noopener noreferrer" className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold hover:bg-emerald-100 hover:text-emerald-700 transition-colors flex items-center gap-1.5 border border-emerald-100">
                    <Download size={12} /> Boş Şablon İndir
                 </a>
              </div>
            </div>
          </div>
          {selectedStudent && selectedSubject && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
            </button>
          )}
        </div>

        {/* Selection Area */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-6 rounded-3xl border border-gray-100">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Sınıf Seçin</label>
            <select 
              className="w-full border border-gray-200 p-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-gray-700 bg-white"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedStudent(''); setSelectedSubject(''); }}
            >
              <option value="">-- Sınıf Seçin --</option>
              {Object.keys(classes || {}).sort().map((c: any) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Öğrenci Seçin</label>
            <select 
              className="w-full border border-gray-200 p-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-gray-700 bg-white"
              value={selectedStudent}
              onChange={(e) => { setSelectedStudent(e.target.value); setSelectedSubject(''); }}
              disabled={!selectedClass}
            >
              <option value="">-- Öğrenci Seçin --</option>
              {classStudents.map((s: string) => {
                const match = s.match(/^(\d+)\s*[-]\s*(.+)$/);
                const pureName = match ? match[2] : s;
                return <option key={s} value={s}>{pureName}</option>;
              })}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Ders Seçin</label>
            <select 
              className="w-full border border-gray-200 p-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-gray-700 bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedStudent}
            >
              <option value="">-- Ders Seçin --</option>
              {SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedStudent && selectedSubject && (
          <div className={`space-y-6 transition-opacity duration-300 relative ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                 <span className="bg-white px-6 py-3 rounded-2xl shadow-xl text-emerald-600 font-bold animate-pulse border border-emerald-100 flex items-center gap-2">
                   <span className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
                   BEP Verileri Yükleniyor...
                 </span>
              </div>
            )}
            {/* FILE UPLOAD SECTION (ALWAYS VISIBLE) */}
            <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h3 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                  <FileText size={20} className="text-emerald-600" />
                  Öğrenci BEP Dosyaları
                </h3>
                <div className="flex items-center gap-3">
                  <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                  <button onClick={() => { setUploadType('pdf'); fileInputRef.current?.click(); }} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50">
                    <Upload size={14} /> PDF Yükle
                  </button>
                  <button onClick={() => { setUploadType('word'); fileInputRef.current?.click(); }} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors border border-blue-200 disabled:opacity-50">
                    <Upload size={14} /> Word Yükle
                  </button>
                  {uploading && <span className="text-xs font-semibold text-emerald-600 animate-pulse">Yükleniyor...</span>}
                </div>
              </div>
              {formData.files?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.files.map((f: any, idx: number) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <File className={f.type === 'pdf' ? 'text-red-500' : 'text-blue-500'} size={20} />
                        <div className="truncate">
                          <p className="font-bold text-sm text-gray-800 truncate">{f.name}</p>
                          <p className="text-xs text-gray-500">{new Date(f.uploadedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <a href={f.url} target="_blank" rel="noopener noreferrer" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                          <Download size={16} />
                        </a>
                        <button onClick={async () => {
                          const newFiles = formData.files.filter((_:any, i:number) => i !== idx);
                          setFormData({...formData, files: newFiles});
                          const sysColName = activeSchoolId === 'default' ? 'system' : `system_${activeSchoolId}`;
                          const bepRef = doc(db, sysColName, `bep_${selectedStudent}_${selectedSubject}`);
                          await updateDoc(bepRef, { files: newFiles });
                        }} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-white border border-dashed border-emerald-200 rounded-2xl">
                  <p className="text-sm text-gray-500 font-medium">Bu öğrenci için henüz BEP dosyası yüklenmemiş.</p>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100">
              {[
                { id: 'student', label: 'I. Öğrenci Bilgileri', icon: User },
                { id: 'perf', label: 'II. Eğitsel Performans', icon: Activity },
                { id: 'goals', label: 'III. Eğitim Planı', icon: FileEdit },
                { id: 'unit', label: 'IV & V. Kararlar & Üyeler', icon: Users }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab.id ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: STUDENT INFO */}
            {activeTab === 'student' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      {/* Section: Öğrenci Bilgileri */}
                      <tr className="border-b border-emerald-200">
                        <td colSpan={2} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">Öğrenci Bilgileri</td>
                      </tr>
                      
                      {/* Adı Soyadı */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 w-1/3 md:w-1/4 font-bold text-emerald-900 border-r border-emerald-100">Adı Soyadı</td>
                        <td className="p-4 font-semibold text-gray-800">{getStudentDetails().name}</td>
                      </tr>
                      
                      {/* Sınıfı ve Okul Numarası */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Sınıfı / Okul Numarası</td>
                        <td className="p-4 font-semibold text-gray-800 flex flex-wrap gap-4 items-center">
                           <span>{selectedClass}</span>
                           <span className="text-emerald-300">|</span>
                           <span>No: {getStudentDetails().no}</span>
                        </td>
                      </tr>
                      
                      {/* Doğum Tarihi */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Doğum Tarihi</td>
                        <td className="p-0">
                          <input type="date" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.birthDate} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, birthDate: e.target.value}})} />
                        </td>
                      </tr>
                      
                      {/* Eğitsel Tanı */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Özel Eğitim İhtiyacına Yönelik Eğitsel Tanı</td>
                        <td className="p-0">
                          <input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.diagnosis} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, diagnosis: e.target.value}})} />
                        </td>
                      </tr>
                      
                      {/* Kurul Kararı */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Yerleştirme Kurul Kararı (Tarih/No)</td>
                        <td className="p-0">
                          <input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.boardDecision} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, boardDecision: e.target.value}})} />
                        </td>
                      </tr>
                      
                      {/* BEP Tarihleri */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">BEP Başlangıç ve Bitiş Tarihi</td>
                        <td className="p-0">
                          <div className="flex flex-col md:flex-row md:divide-x divide-emerald-100 h-full">
                            <input type="date" className="w-full md:w-1/2 p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.bepStart} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, bepStart: e.target.value}})} />
                            <input type="date" className="w-full md:w-1/2 p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors border-t md:border-t-0 border-emerald-100" value={formData.studentInfo.bepEnd} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, bepEnd: e.target.value}})} />
                          </div>
                        </td>
                      </tr>
                      
                      {/* Section: Destek ve İhtiyaçlar */}
                      <tr className="border-b border-emerald-200">
                        <td colSpan={2} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">Destek ve İhtiyaçlar</td>
                      </tr>
                
                      {/* Destek Eğitim */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Okul İçi ve Okul Dışı Destek Eğitim Hizmetleri</td>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none resize-y min-h-[60px] focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.supportEd} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, supportEd: e.target.value}})} />
                        </td>
                      </tr>
                      
                      {/* Materyaller */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Kullandığı Destek Materyalleri/Cihazlar</td>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none resize-y min-h-[60px] focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.materials} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, materials: e.target.value}})} />
                        </td>
                      </tr>
                      
                      {/* Sağlık */}
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Önemli Sağlık Bilgileri (Alerji, İlaç vb.)</td>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none resize-y min-h-[60px] focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.healthInfo} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, healthInfo: e.target.value}})} />
                        </td>
                      </tr>
                      
                      {/* Eğitim Ortamı */}
                      <tr className="hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Eğitim Ortamına İlişkin Düzenlemeler</td>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none resize-y min-h-[60px] focus:bg-emerald-50/30 transition-colors" value={formData.studentInfo.environment} onChange={e => setFormData({...formData, studentInfo: {...formData.studentInfo, environment: e.target.value}})} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 space-y-4">
                   <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                     <table className="w-full text-sm text-left">
                        <tbody>
                          <tr className="border-b border-emerald-200">
                            <td colSpan={5} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">Aile İletişim Bilgileri</td>
                          </tr>
                          <tr className="bg-emerald-50/40 border-b border-emerald-100 font-bold text-emerald-900">
                            <td className="p-4 border-r border-emerald-100"></td>
                            <td className="p-4 border-r border-emerald-100">Adı Soyadı</td>
                            <td className="p-4 border-r border-emerald-100">Telefon</td>
                            <td className="p-4 border-r border-emerald-100">Ev Adresi</td>
                            <td className="p-4">İş Adresi</td>
                          </tr>
                          {['mother', 'father', 'guardian'].map((key) => {
                            const labels: any = { mother: 'Anne', father: 'Baba', guardian: 'Veli/Vasi' };
                            return (
                              <tr key={key} className="border-b border-emerald-50 hover:bg-emerald-50/10">
                                <td className="p-4 border-r border-emerald-100 font-bold bg-emerald-50/40 text-emerald-900">{labels[key]}</td>
                                <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.familyInfo[key].name} onChange={e => setFormData({...formData, familyInfo: {...formData.familyInfo, [key]: {...formData.familyInfo[key], name: e.target.value}}})} /></td>
                                <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.familyInfo[key].phone} onChange={e => setFormData({...formData, familyInfo: {...formData.familyInfo, [key]: {...formData.familyInfo[key], phone: e.target.value}}})} /></td>
                                <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.familyInfo[key].address} onChange={e => setFormData({...formData, familyInfo: {...formData.familyInfo, [key]: {...formData.familyInfo[key], address: e.target.value}}})} /></td>
                                <td className="p-0"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.familyInfo[key].work} onChange={e => setFormData({...formData, familyInfo: {...formData.familyInfo, [key]: {...formData.familyInfo[key], work: e.target.value}}})} /></td>
                              </tr>
                            );
                          })}
                        </tbody>
                     </table>
                   </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PERFORMANCE */}
            {activeTab === 'perf' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">Öğrencinin Gelişim Öyküsü</td>
                      </tr>
                      <tr>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none resize-y min-h-[120px] focus:bg-emerald-50/30 transition-colors" value={formData.perfInfo.history} onChange={e => setFormData({...formData, perfInfo: {...formData.perfInfo, history: e.target.value}})} placeholder="Doğumundan itibaren gelişim öyküsü, tıbbi tanılama süreci vb." />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td colSpan={3} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">Eğitsel Performanslar</td>
                      </tr>
                      <tr className="bg-emerald-50/40 border-b border-emerald-100 font-bold text-emerald-900">
                        <td className="p-4 border-r border-emerald-100 w-1/3">Gelişim Alanları / Dersler</td>
                        <td className="p-4 border-r border-emerald-100">Performans Düzeyi</td>
                        <td className="p-4 w-16 text-center">İşlem</td>
                      </tr>
                      {formData.perfInfo.performances.map((perf: any, idx: number) => (
                        <tr key={perf.id || idx} className="hover:bg-emerald-50/10 border-b border-emerald-100">
                          <td className="p-0 border-r border-emerald-100 bg-emerald-50/20"><input type="text" className="w-full p-4 bg-transparent outline-none font-semibold text-emerald-900 focus:bg-emerald-50/40 transition-colors" placeholder="Ders Adı..." value={perf.subject} onChange={e => {
                            const newPerfs = [...formData.perfInfo.performances];
                            newPerfs[idx].subject = e.target.value;
                            setFormData({...formData, perfInfo: {...formData.perfInfo, performances: newPerfs}});
                          }}/></td>
                          <td className="p-0 border-r border-emerald-100"><textarea className="w-full p-4 bg-transparent outline-none min-h-[60px] resize-y text-gray-700 focus:bg-emerald-50/30 transition-colors" placeholder="Performans düzeyi..." value={perf.level} onChange={e => {
                            const newPerfs = [...formData.perfInfo.performances];
                            newPerfs[idx].level = e.target.value;
                            setFormData({...formData, perfInfo: {...formData.perfInfo, performances: newPerfs}});
                          }}/></td>
                          <td className="p-4 text-center">
                            <button onClick={() => {
                              const newPerfs = formData.perfInfo.performances.filter((_: any, i: number) => i !== idx);
                              setFormData({...formData, perfInfo: {...formData.perfInfo, performances: newPerfs}});
                            }} className="text-emerald-300 hover:text-red-500 transition-colors"><Trash2 size={16} className="mx-auto" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => {
                    const newPerfs = [...formData.perfInfo.performances, { id: Date.now().toString(), subject: '', level: '' }];
                    setFormData({...formData, perfInfo: {...formData.perfInfo, performances: newPerfs}});
                  }} className="w-full p-4 text-emerald-600 font-bold bg-emerald-50/50 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors">
                    <Plus size={16} /> Yeni Performans Alanı Ekle
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">Varsa Davranış Problemi Tanımlayınız</td>
                      </tr>
                      <tr>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none resize-y min-h-[80px] focus:bg-emerald-50/30 transition-colors" value={formData.perfInfo.behaviorProblem} onChange={e => setFormData({...formData, perfInfo: {...formData.perfInfo, behaviorProblem: e.target.value}})} placeholder="YOK" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: GOALS (BEP PLANI) */}
            {activeTab === 'goals' && (
              <div className="space-y-8 animate-in fade-in">
                {formData.goals.map((subjectGoal: any, sIdx: number) => (
                  <div key={subjectGoal.id || sIdx} className="border-2 border-emerald-100 rounded-3xl overflow-hidden bg-white shadow-sm">
                    {/* Subject Header */}
                    <div className="bg-emerald-600 p-4 flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-black text-emerald-200 uppercase tracking-wider mb-1 block">GELİŞİM ALANI / DERS ADI</label>
                        <input type="text" className="w-full bg-white/10 border border-emerald-500/50 text-white placeholder-emerald-200/50 rounded-lg p-2 font-bold outline-none focus:border-emerald-300 transition-colors" value={subjectGoal.subject} onChange={e => {
                          const newGoals = [...formData.goals];
                          newGoals[sIdx].subject = e.target.value;
                          setFormData({...formData, goals: newGoals});
                        }} placeholder="Örn: Türkçe ve Okuma Yazma" />
                      </div>
                      <button onClick={() => {
                        const newGoals = formData.goals.filter((_: any, i: number) => i !== sIdx);
                        setFormData({...formData, goals: newGoals});
                      }} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-red-500 hover:text-white border border-emerald-500/50 transition-colors"><Trash2 size={18}/></button>
                    </div>

                    <div className="p-6 space-y-6">
                      {subjectGoal.longTermGoals.map((ltg: any, lIdx: number) => (
                        <div key={ltg.id || lIdx} className="border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
                          <div className="bg-emerald-100/50 p-3 border-b border-emerald-200 flex items-center gap-3">
                            <span className="font-black text-emerald-800">UZUN DÖNEMLİ AMAÇ:</span>
                            <input type="text" className="flex-1 bg-white border border-emerald-200 rounded-lg p-2 text-sm font-bold outline-none focus:border-emerald-500 text-emerald-950 transition-colors" value={ltg.title} onChange={e => {
                              const newGoals = [...formData.goals];
                              newGoals[sIdx].longTermGoals[lIdx].title = e.target.value;
                              setFormData({...formData, goals: newGoals});
                            }} />
                            <button onClick={() => {
                               const newGoals = [...formData.goals];
                               newGoals[sIdx].longTermGoals = newGoals[sIdx].longTermGoals.filter((_: any, i: number) => i !== lIdx);
                               setFormData({...formData, goals: newGoals});
                            }} className="text-emerald-500 hover:text-red-500 p-2 transition-colors"><Trash2 size={18}/></button>
                          </div>
                          
                          {/* Short Term Goals Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-emerald-50/60 border-b border-emerald-100 text-emerald-900 font-bold">
                                <tr>
                                  <th className="p-3 border-r border-emerald-100 min-w-[200px]">Kısa Dönemli Amaçlar</th>
                                  <th className="p-3 border-r border-emerald-100">Ölçüt</th>
                                  <th className="p-3 border-r border-emerald-100">Yöntem/Teknik</th>
                                  <th className="p-3 border-r border-emerald-100">Materyaller</th>
                                  <th className="p-3 border-r border-emerald-100 min-w-[120px]">Tarihler</th>
                                  <th className="p-3 border-r border-emerald-100">Ölçme & Değerlendirme</th>
                                  <th className="p-3 min-w-[130px]">Performans</th>
                                  <th className="p-3 w-10 text-center">İşlem</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-emerald-50">
                                {ltg.shortTermGoals.map((stg: any, stIdx: number) => (
                                  <tr key={stg.id || stIdx} className="hover:bg-emerald-50/10 border-b border-emerald-50">
                                    <td className="p-0 border-r border-emerald-100 bg-emerald-50/20"><textarea className="w-full p-3 bg-transparent resize-y min-h-[60px] outline-none font-semibold text-emerald-900 focus:bg-emerald-50/40 transition-colors" value={stg.title} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].title = e.target.value; setFormData({...formData, goals: newGoals}); }}/></td>
                                    <td className="p-0 border-r border-emerald-100"><textarea className="w-full p-3 bg-transparent resize-y min-h-[60px] outline-none focus:bg-emerald-50/30 transition-colors" value={stg.criteria} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].criteria = e.target.value; setFormData({...formData, goals: newGoals}); }}/></td>
                                    <td className="p-0 border-r border-emerald-100"><textarea className="w-full p-3 bg-transparent resize-y min-h-[60px] outline-none focus:bg-emerald-50/30 transition-colors" value={stg.method} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].method = e.target.value; setFormData({...formData, goals: newGoals}); }}/></td>
                                    <td className="p-0 border-r border-emerald-100"><textarea className="w-full p-3 bg-transparent resize-y min-h-[60px] outline-none focus:bg-emerald-50/30 transition-colors" value={stg.materials} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].materials = e.target.value; setFormData({...formData, goals: newGoals}); }}/></td>
                                    <td className="p-3 border-r border-emerald-100 align-top">
                                      <input type="date" className="w-full text-[10px] border border-emerald-200 p-1.5 rounded mb-2 outline-none focus:border-emerald-500 bg-white" value={stg.dates.split('|')[0] || ''} onChange={e => { const newGoals = [...formData.goals]; const parts = stg.dates.split('|'); newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].dates = e.target.value + '|' + (parts[1]||''); setFormData({...formData, goals: newGoals}); }} />
                                      <input type="date" className="w-full text-[10px] border border-emerald-200 p-1.5 rounded outline-none focus:border-emerald-500 bg-white" value={stg.dates.split('|')[1] || ''} onChange={e => { const newGoals = [...formData.goals]; const parts = stg.dates.split('|'); newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].dates = (parts[0]||'') + '|' + e.target.value; setFormData({...formData, goals: newGoals}); }} />
                                    </td>
                                    <td className="p-3 border-r border-emerald-100 align-top space-y-2">
                                      <input type="text" placeholder="Yöntem" className="w-full bg-white border border-emerald-200 rounded p-1.5 outline-none text-[10px] focus:border-emerald-500" value={stg.evalMethod} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].evalMethod = e.target.value; setFormData({...formData, goals: newGoals}); }} />
                                      <input type="text" placeholder="Tarihler" className="w-full bg-white border border-emerald-200 rounded p-1.5 outline-none text-[10px] focus:border-emerald-500" value={stg.evalDates} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].evalDates = e.target.value; setFormData({...formData, goals: newGoals}); }} />
                                    </td>
                                    <td className="p-3 align-top border-r border-emerald-100">
                                      <select className="w-full border border-emerald-200 rounded p-1.5 text-xs font-bold outline-none focus:border-emerald-500 bg-white text-emerald-900" value={stg.status} onChange={e => { const newGoals = [...formData.goals]; newGoals[sIdx].longTermGoals[lIdx].shortTermGoals[stIdx].status = e.target.value; setFormData({...formData, goals: newGoals}); }}>
                                        <option value="devam_ediyor">Devam Ediyor</option>
                                        <option value="yeterli">Yeterli (+)</option>
                                        <option value="gelistirilmeli">Geliştirilmeli (-)</option>
                                      </select>
                                      <div className="mt-2 flex justify-center">{getStatusIcon(stg.status)}</div>
                                    </td>
                                    <td className="p-3 text-center align-middle">
                                      <button onClick={() => {
                                        const newGoals = [...formData.goals];
                                        newGoals[sIdx].longTermGoals[lIdx].shortTermGoals = newGoals[sIdx].longTermGoals[lIdx].shortTermGoals.filter((_: any, i: number) => i !== stIdx);
                                        setFormData({...formData, goals: newGoals});
                                      }} className="text-emerald-400 hover:text-red-500 transition-colors"><Trash2 size={16} className="mx-auto" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <button onClick={() => {
                                const newGoals = [...formData.goals];
                                newGoals[sIdx].longTermGoals[lIdx].shortTermGoals.push({ id: Date.now().toString(), title: '', criteria: '', method: '', materials: '', dates: '', evalMethod: '', evalDates: '', status: 'devam_ediyor' });
                                setFormData({...formData, goals: newGoals});
                            }} className="w-full p-3 text-xs font-bold text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors"><Plus size={16} /> Kısa Dönemli Amaç Ekle</button>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => {
                        const newGoals = [...formData.goals];
                        newGoals[sIdx].longTermGoals.push({ id: Date.now().toString(), title: '', shortTermGoals: [] });
                        setFormData({...formData, goals: newGoals});
                      }} className="w-full p-3 border-2 border-dashed border-emerald-200 rounded-xl text-sm font-bold text-emerald-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"><Plus size={16} /> Uzun Dönemli Amaç Ekle</button>

                      <div className="mt-4">
                        <label className="text-xs font-bold text-emerald-600 block mb-1">Eğitim Ortamı Düzenlemeleri (Bu ders/alan için)</label>
                        <input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50" value={subjectGoal.envArrangements} onChange={e => {
                          const newGoals = [...formData.goals];
                          newGoals[sIdx].envArrangements = e.target.value;
                          setFormData({...formData, goals: newGoals});
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button onClick={() => {
                  const newGoals = [...formData.goals, { id: Date.now().toString(), subject: '', envArrangements: '', longTermGoals: [] }];
                  setFormData({...formData, goals: newGoals});
                }} className="w-full py-4 border-2 border-dashed border-emerald-200 rounded-3xl text-emerald-600 font-black hover:bg-emerald-50 hover:border-emerald-300 transition-colors flex items-center justify-center gap-2">
                  <Plus size={20} /> YENİ DERS / GELİŞİM ALANI EKLE
                </button>
              </div>
            )}

            {/* TAB CONTENT: UNIT DECISIONS & MEMBERS */}
            {activeTab === 'unit' && (
              <div className="space-y-8 animate-in fade-in">
                {/* A. Diğer Eğitim Hizmetleri */}
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td colSpan={5} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">A. Okul İçi Diğer Eğitim Hizmetleri</td>
                      </tr>
                      <tr className="bg-emerald-50/40 border-b border-emerald-100 font-bold text-emerald-900">
                        <td className="p-4 border-r border-emerald-100">Hizmet Türü</td>
                        <td className="p-4 border-r border-emerald-100">Gelişim Alanı/Ders</td>
                        <td className="p-4 border-r border-emerald-100">Haftalık Süre</td>
                        <td className="p-4 border-r border-emerald-100">Sorumlu Kişi(ler)</td>
                        <td className="p-4 w-16 text-center">İşlem</td>
                      </tr>
                      {formData.unitInfo.otherServices.map((svc: any, idx: number) => (
                        <tr key={svc.id || idx} className="hover:bg-emerald-50/10 border-b border-emerald-100">
                          <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={svc.service} onChange={e => { const newArr = [...formData.unitInfo.otherServices]; newArr[idx].service = e.target.value; setFormData({...formData, unitInfo: {...formData.unitInfo, otherServices: newArr}}); }}/></td>
                          <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={svc.subject} onChange={e => { const newArr = [...formData.unitInfo.otherServices]; newArr[idx].subject = e.target.value; setFormData({...formData, unitInfo: {...formData.unitInfo, otherServices: newArr}}); }}/></td>
                          <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={svc.hours} onChange={e => { const newArr = [...formData.unitInfo.otherServices]; newArr[idx].hours = e.target.value; setFormData({...formData, unitInfo: {...formData.unitInfo, otherServices: newArr}}); }}/></td>
                          <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={svc.responsible} onChange={e => { const newArr = [...formData.unitInfo.otherServices]; newArr[idx].responsible = e.target.value; setFormData({...formData, unitInfo: {...formData.unitInfo, otherServices: newArr}}); }}/></td>
                          <td className="p-4 text-center"><button onClick={() => { const newArr = formData.unitInfo.otherServices.filter((_: any, i: number) => i !== idx); setFormData({...formData, unitInfo: {...formData.unitInfo, otherServices: newArr}}); }} className="text-emerald-300 hover:text-red-500 transition-colors"><Trash2 size={16} className="mx-auto" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => { const newArr = [...formData.unitInfo.otherServices, { id: Date.now().toString(), service:'', subject:'', hours:'', responsible:'' }]; setFormData({...formData, unitInfo: {...formData.unitInfo, otherServices: newArr}}); }} className="w-full p-4 text-sm font-bold text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors"><Plus size={16}/> Hizmet Ekle</button>
                </div>

                {/* B. Aile Bilgilendirme Süreci */}
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td colSpan={2} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">B. Aile Bilgilendirme Süreci</td>
                      </tr>
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100 w-1/3">Hangi sıklıkla bilgilendirilecek?</td>
                        <td className="p-0">
                          <input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.unitInfo.familyInfoFreq} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, familyInfoFreq: e.target.value}})} />
                        </td>
                      </tr>
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Hangi yolla bilgilendirilecek?</td>
                        <td className="p-0">
                          <input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.unitInfo.familyInfoMethod} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, familyInfoMethod: e.target.value}})} />
                        </td>
                      </tr>
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Aile eğitimi yapılacak mı?</td>
                        <td className="p-4">
                          <select className="border border-emerald-200 rounded-lg p-2 font-bold text-emerald-900 outline-none focus:border-emerald-500 bg-white" value={formData.unitInfo.familyTraining} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, familyTraining: e.target.value}})}>
                            <option value="evet">Evet</option><option value="hayir">Hayır</option>
                          </select>
                        </td>
                      </tr>
                      {formData.unitInfo.familyTraining === 'evet' && (
                        <tr className="hover:bg-emerald-50/10">
                          <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Hangi yolla yapılacak?</td>
                          <td className="p-0">
                            <input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" value={formData.unitInfo.familyTrainingMethod} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, familyTrainingMethod: e.target.value}})} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* C. Diğer Kararlar */}
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td colSpan={2} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">C. Diğer Kararlar & Değerlendirme</td>
                      </tr>
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100 w-1/3">Diğer kararlar</td>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none min-h-[80px] resize-y focus:bg-emerald-50/30 transition-colors" placeholder="Diğer kararlar..." value={formData.unitInfo.otherDecisions} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, otherDecisions: e.target.value}})} />
                        </td>
                      </tr>
                      <tr className="border-b border-emerald-100 hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Bir Sonraki BEP Geliştirme Birimi Toplantı Tarihi</td>
                        <td className="p-4">
                          <input type="date" className="border border-emerald-200 rounded-lg p-2 font-bold text-emerald-900 outline-none focus:border-emerald-500 bg-white" value={formData.unitInfo.nextMeetingDate} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, nextMeetingDate: e.target.value}})} />
                        </td>
                      </tr>
                      <tr className="hover:bg-emerald-50/10">
                        <td className="p-4 bg-emerald-50/40 font-bold text-emerald-900 border-r border-emerald-100">Genel BEP Değerlendirmesi</td>
                        <td className="p-0">
                          <textarea className="w-full p-4 bg-transparent outline-none min-h-[80px] resize-y focus:bg-emerald-50/30 transition-colors" value={formData.unitInfo.generalEval} onChange={e => setFormData({...formData, unitInfo: {...formData.unitInfo, generalEval: e.target.value}})} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* D. Members */}
                <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-emerald-200">
                        <td colSpan={3} className="p-4 bg-emerald-600 font-bold text-white text-center text-lg">V. BEP Geliştirme Birimi Üyeleri</td>
                      </tr>
                      <tr className="bg-emerald-50/40 border-b border-emerald-100 font-bold text-emerald-900">
                        <td className="p-4 border-r border-emerald-100 w-1/2">Unvanı</td>
                        <td className="p-4 border-r border-emerald-100">Adı Soyadı</td>
                        <td className="p-4 w-16 text-center">İşlem</td>
                      </tr>
                      {formData.unitInfo.members.map((mem: any, idx: number) => (
                        <tr key={mem.id || idx} className="hover:bg-emerald-50/10 border-b border-emerald-100">
                          <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none font-semibold text-emerald-900 focus:bg-emerald-50/30 transition-colors" placeholder="Unvan (Örn: Sınıf Öğretmeni)" value={mem.title} onChange={e => { const newArr = [...formData.unitInfo.members]; newArr[idx].title = e.target.value; setFormData({...formData, unitInfo: {...formData.unitInfo, members: newArr}}); }}/></td>
                          <td className="p-0 border-r border-emerald-100"><input type="text" className="w-full p-4 bg-transparent outline-none focus:bg-emerald-50/30 transition-colors" placeholder="Ad Soyad" value={mem.name} onChange={e => { const newArr = [...formData.unitInfo.members]; newArr[idx].name = e.target.value; setFormData({...formData, unitInfo: {...formData.unitInfo, members: newArr}}); }}/></td>
                          <td className="p-4 text-center"><button onClick={() => { const newArr = formData.unitInfo.members.filter((_: any, i: number) => i !== idx); setFormData({...formData, unitInfo: {...formData.unitInfo, members: newArr}}); }} className="text-emerald-300 hover:text-red-500 transition-colors"><Trash2 size={16} className="mx-auto" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => { const newArr = [...formData.unitInfo.members, { id: Date.now().toString(), title:'', name:'' }]; setFormData({...formData, unitInfo: {...formData.unitInfo, members: newArr}}); }} className="w-full p-4 text-sm font-bold text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors"><Plus size={16}/> Üye Ekle</button>
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};
