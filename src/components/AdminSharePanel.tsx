import React, { useState, useEffect, useRef } from 'react';
import { Share2, Package, FileText, Plus, Search, CheckCircle2, XCircle, Trash2, Download, Check, Upload, File, Users, Clock } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { CITIES } from '../lib/cities';

export const AdminSharePanel = ({ state, actions }: { state: any, actions: any }) => {
  const { activeSchoolId, schools } = state;
  const currentSchool = schools.find((s:any) => s.id === activeSchoolId);
  
  const [activeTab, setActiveTab] = useState<'materials'|'documents'>('materials');
  const [materials, setMaterials] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  
  // Materials Form
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [matForm, setMatForm] = useState({ type: 'surplus', itemName: '', description: '', quantity: 1, condition: 'Yeni', city: '', district: '' });
  const [submitting, setSubmitting] = useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');

  // Documents Form
  const [showDocForm, setShowDocForm] = useState(false);
  const [docFile, setDocFile] = useState<{name: string, type: string, data: string} | null>(null);
  const [selectedTargetSchools, setSelectedTargetSchools] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docSubTab, setDocSubTab] = useState<'myshared'|'sharedwithme'>('myshared');
  const [editingDocId, setEditingDocId] = useState<string | null>(null);


  const formSelectedCityData = CITIES.find(c => c.name === matForm.city);
  const formDistricts = formSelectedCityData ? formSelectedCityData.districts : [];

  const filterSelectedCityData = CITIES.find(c => c.name === filterCity);
  const filterDistricts = filterSelectedCityData ? filterSelectedCityData.districts : [];

  useEffect(() => {
    if (!activeSchoolId) return;
    const unsubMat = onSnapshot(query(collection(db, 'materials_sharing'), orderBy('createdAt', 'desc')), (snap) => {
       const mats: any[] = [];
       snap.forEach(d => mats.push({ id: d.id, ...d.data() }));
       setMaterials(mats);
    });
    
    const unsubDoc = onSnapshot(query(collection(db, 'documents_sharing'), orderBy('uploadedAt', 'desc')), (snap) => {
       const docs: any[] = [];
       snap.forEach(d => docs.push({ id: d.id, ...d.data() }));
       setDocuments(docs);
    });
    
    return () => { unsubMat(); unsubDoc(); };
  }, [activeSchoolId]);

  // MATERIAL LOGIC
  const handleCreateMaterial = async () => {
    if (!matForm.itemName || !matForm.quantity || !activeSchoolId) return;
    setSubmitting(true);
    try {
       await addDoc(collection(db, 'materials_sharing'), {
          schoolId: activeSchoolId,
          schoolName: currentSchool?.name || 'Bilinmeyen Okul',
          city: matForm.city,
          district: matForm.district,
          type: matForm.type,
          itemName: matForm.itemName,
          description: matForm.description,
          quantity: Number(matForm.quantity),
          condition: matForm.type === 'surplus' ? matForm.condition : null,
          status: 'active',
          requests: [],
          createdAt: new Date().toISOString()
       });
       setShowMaterialForm(false);
       setMatForm({ type: 'surplus', itemName: '', description: '', quantity: 1, condition: 'Yeni', city: '', district: '' });
       actions.showToast('İlan başarıyla oluşturuldu', 'success');
    } catch(err) {
       actions.showToast('Hata oluştu', 'error');
    }
    setSubmitting(false);
  };

  const handleDeleteMaterial = async (id: string) => {
     if(true) {
        await deleteDoc(doc(db, 'materials_sharing', id));
     }
  };

  const handleRequestMaterial = async (mat: any) => {
     if (mat.requests.some((r:any) => r.schoolId === activeSchoolId)) {
        actions.showToast('Bu ilan için zaten talebiniz bulunuyor', 'info');
        return;
     }
     const newReq = { reqId: Date.now().toString(), schoolId: activeSchoolId, schoolName: currentSchool?.name, status: 'pending', date: new Date().toISOString() };
     await updateDoc(doc(db, 'materials_sharing', mat.id), {
        requests: [...mat.requests, newReq]
     });
     actions.showToast('Talebiniz iletildi', 'success');
  };

  const handleApproveRequest = async (mat: any, reqId: string) => {
     const updatedRequests = mat.requests.map((r:any) => r.reqId === reqId ? { ...r, status: 'approved' } : { ...r, status: 'rejected' });
     await updateDoc(doc(db, 'materials_sharing', mat.id), {
        requests: updatedRequests,
        status: 'completed'
     });
     actions.showToast('Talep onaylandı, ilan tamamlandı', 'success');
  };

  const printProtocol = (mat: any, approvedReq: any) => {
     const printWindow = window.open('', '_blank');
     if(!printWindow) return;
     
     const html = `
        <html>
        <head>
          <title>Teslimat Tutanağı</title>
          <style>
             body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
             h1 { text-align: center; margin-bottom: 40px; }
             .content { font-size: 16px; margin-bottom: 60px; }
             .signatures { display: flex; justify-content: space-between; margin-top: 80px; }
             .signature-box { text-align: center; width: 40%; }
             .line { border-bottom: 1px solid #000; margin-top: 40px; margin-bottom: 10px; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <h1>TESLİMAT TUTANAĞI</h1>
          <div class="content">
             <p><strong>Teslim Eden Kurum:</strong> ${mat.schoolName}</p>
             <p><strong>Teslim Alan Kurum:</strong> ${approvedReq.schoolName}</p>
             <p><strong>Teslimat Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
             <br/>
             <p>Yukarıda bilgileri yer alan <strong>${approvedReq.schoolName}</strong> isimli kuruma, aşağıda cinsi ve miktarı belirtilen malzeme eksiksiz ve sağlam olarak teslim edilmiştir.</p>
             <br/>
             <table border="1" cellpadding="10" cellspacing="0" width="100%">
               <tr><th>Malzeme/Ürün Adı</th><th>Miktar</th><th>Durum</th></tr>
               <tr><td>${mat.itemName}</td><td style="text-align:center;">${mat.quantity}</td><td style="text-align:center;">${mat.condition || '-'}</td></tr>
             </table>
          </div>
          <div class="signatures">
             <div class="signature-box">
                <strong>Teslim Eden</strong><br/>${mat.schoolName}<br/>Yetkili İmzası
                <div class="line"></div>
             </div>
             <div class="signature-box">
                <strong>Teslim Alan</strong><br/>${approvedReq.schoolName}<br/>Yetkili İmzası
                <div class="line"></div>
             </div>
          </div>
        </body>
        </html>
     `;
     printWindow.document.write(html);
     printWindow.document.close();
  };


  // DOCUMENTS LOGIC
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if(!file) return;
     
     // Sadece word, excel, pdf
     const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
     
     if(!validTypes.includes(file.type) && !file.name.match(/\\.(pdf|doc|docx|xls|xlsx)$/i)) {
        actions.showToast('Sadece PDF, Word ve Excel dosyaları yüklenebilir', 'error');
        if(fileInputRef.current) fileInputRef.current.value = '';
        return;
     }
     
     if(file.size > 800000) {
        actions.showToast('Dosya boyutu en fazla 800KB olabilir', 'error');
        if(fileInputRef.current) fileInputRef.current.value = '';
        return;
     }
     
     const reader = new FileReader();
     reader.onload = (ev) => {
        setDocFile({
           name: file.name,
           type: file.type || 'application/octet-stream',
           data: ev.target?.result as string
        });
     };
     reader.readAsDataURL(file);
  };

  
  const handleEditDocClick = (docItem: any) => {
     setEditingDocId(docItem.id);
     setDocFile({ name: docItem.fileName, type: docItem.fileType, data: docItem.fileData });
     setSelectedTargetSchools(docItem.sharedWith);
     setShowDocForm(true);
  };

  const handleShareDoc = async () => {
     if(!docFile || selectedTargetSchools.length === 0 || !activeSchoolId) return;
     setSubmitting(true);
     try {
        if (editingDocId) {
           await updateDoc(doc(db, 'documents_sharing', editingDocId), {
              fileName: docFile.name,
              fileType: docFile.type,
              fileData: docFile.data,
              sharedWith: selectedTargetSchools,
           });
           actions.showToast('Dosya paylaşımı güncellendi', 'success');
        } else {
           await addDoc(collection(db, 'documents_sharing'), {
              schoolId: activeSchoolId,
              schoolName: currentSchool?.name || '',
              fileName: docFile.name,
              fileType: docFile.type,
              fileData: docFile.data,
              sharedWith: selectedTargetSchools,
              uploadedAt: new Date().toISOString()
           });
           actions.showToast('Dosya başarıyla paylaşıldı', 'success');
        }
        setShowDocForm(false);
        setDocFile(null);
        setSelectedTargetSchools([]);
        setEditingDocId(null);
        if(fileInputRef.current) fileInputRef.current.value = '';
     } catch (err) {
        actions.showToast('İşlem sırasında hata oluştu', 'error');
     }
     setSubmitting(false);
  };

  
  const handleDeleteDoc = async (id: string) => {
     if(true) {
        await deleteDoc(doc(db, 'documents_sharing', id));
     }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Share2 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black">Okullar Arası Paylaşım</h2>
            <p className="text-blue-100 font-medium">İhtiyaç fazlası materyalleri veya belgeleri diğer okullarla güvenle paylaşın.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
         <button onClick={() => setActiveTab('materials')} className={`py-4 px-6 font-bold text-sm transition-colors border-b-2 ${activeTab === 'materials' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>Malzeme Paylaşımı</button>
         <button onClick={() => setActiveTab('documents')} className={`py-4 px-6 font-bold text-sm transition-colors border-b-2 ${activeTab === 'documents' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>Döküman Paylaşımı</button>
      </div>

      {activeTab === 'materials' && (
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
               <div className="flex justify-between items-center">
                  <div>
                     <h3 className="text-lg font-black text-gray-800">İlan Panosu</h3>
                     <p className="text-sm text-gray-500">Okulların paylaştığı veya ihtiyaç duyduğu malzemeler.</p>
                  </div>
                  <button onClick={() => setShowMaterialForm(!showMaterialForm)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                     <Plus size={18} /> Yeni İlan Girişi
                  </button>
               </div>
               <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 mb-1">İl Filtresi</label>
                     <select className="w-full border border-gray-200 rounded-xl p-2 outline-none focus:border-blue-500 bg-white" value={filterCity} onChange={e => { setFilterCity(e.target.value); setFilterDistrict(''); }}>
                        <option value="">Tüm İller</option>
                        {CITIES.map(city => <option key={city.name} value={city.name}>{city.name}</option>)}
                     </select>
                  </div>
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 mb-1">İlçe Filtresi</label>
                     <select className="w-full border border-gray-200 rounded-xl p-2 outline-none focus:border-blue-500 bg-white" value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} disabled={!filterCity}>
                        <option value="">Tüm İlçeler</option>
                        {filterDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                     </select>
                  </div>
               </div>
            </div>

            {showMaterialForm && (
               <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 animate-in slide-in-from-top-4">
                  <h4 className="font-bold text-blue-900 mb-4">İlan Detayları</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">İl</label>
                        <select className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-white" value={matForm.city} onChange={e => setMatForm({...matForm, city: e.target.value, district: ''})}>
                           <option value="">İl Seçiniz</option>
                           {CITIES.map(city => <option key={city.name} value={city.name}>{city.name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">İlçe</label>
                        <select className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-white" value={matForm.district} onChange={e => setMatForm({...matForm, district: e.target.value})} disabled={!matForm.city}>
                           <option value="">İlçe Seçiniz</option>
                           {formDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                        </select>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">İlan Türü</label>
                        <select className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-white" value={matForm.type} onChange={e => setMatForm({...matForm, type: e.target.value})}>
                           <option value="surplus">Fazla Malzeme Paylaşımı</option>
                           <option value="need">İhtiyaç Talebi</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Malzeme / Ürün Adı</label>
                        <input type="text" className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500" value={matForm.itemName} onChange={e => setMatForm({...matForm, itemName: e.target.value})} placeholder="Örn: Projeksiyon Cihazı, A4 Kağıt..." />
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Adet</label>
                        <input type="number" min="1" className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500" value={matForm.quantity} onChange={e => setMatForm({...matForm, quantity: Number(e.target.value)})} />
                     </div>
                     {matForm.type === 'surplus' && (
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Durumu</label>
                           <select className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-white" value={matForm.condition} onChange={e => setMatForm({...matForm, condition: e.target.value})}>
                              <option value="Yeni">Yeni / Sıfır</option>
                              <option value="İyi">İyi / Az Kullanılmış</option>
                              <option value="Kullanılabilir">Kullanılabilir</option>
                           </select>
                        </div>
                     )}
                     
                     <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Açıklama</label>
                        <textarea className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 resize-y" rows={2} value={matForm.description} onChange={e => setMatForm({...matForm, description: e.target.value})} placeholder="Ek bilgiler..." />
                     </div>
                  </div>
                  <div className="flex justify-end gap-3">
                     <button onClick={() => setShowMaterialForm(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50">İptal</button>
                     <button onClick={handleCreateMaterial} disabled={submitting || !matForm.itemName} className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">İlanı Yayınla</button>
                  </div>
               </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {materials.filter(mat => 
                  (!filterCity || (mat.city && mat.city.toLowerCase().includes(filterCity.toLowerCase()))) &&
                  (!filterDistrict || (mat.district && mat.district.toLowerCase().includes(filterDistrict.toLowerCase())))
               ).map(mat => (
                  <div key={mat.id} className={`bg-white rounded-3xl p-6 border ${mat.status === 'completed' ? 'border-gray-200 opacity-75' : 'border-blue-100'} shadow-sm relative`}>
                     {mat.schoolId === activeSchoolId && (
                        <button onClick={() => handleDeleteMaterial(mat.id)} className="absolute top-6 right-6 text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                     )}
                     
                     <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${mat.type === 'surplus' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                           <Package size={24} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${mat.type === 'surplus' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                 {mat.type === 'surplus' ? 'Fazla Malzeme' : 'İhtiyaç Talebi'}
                              </span>
                              <span className="text-xs text-gray-400 font-bold">{new Date(mat.createdAt).toLocaleDateString('tr-TR')}</span>
                           </div>
                           <h4 className="font-black text-gray-900 text-lg">{mat.itemName} <span className="text-gray-500 font-medium">({mat.quantity} Adet)</span></h4>
                           <p className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-1.5">
                              {mat.schoolName}
                              {(mat.city || mat.district) && (
                                 <span className="text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    {mat.city}{mat.city && mat.district ? ' / ' : ''}{mat.district}
                                 </span>
                              )}
                           </p>
                        </div>
                     </div>
                     
                     {mat.description && <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">{mat.description}</p>}
                     
                     {mat.condition && <div className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500"/> Durum: {mat.condition}</div>}
                     
                     <div className="border-t border-gray-100 pt-4 mt-4">
                        {mat.status === 'completed' ? (
                           <div className="text-center font-bold text-emerald-600 bg-emerald-50 py-2 rounded-xl text-sm">Bu ilan tamamlanmıştır.</div>
                        ) : mat.schoolId !== activeSchoolId ? (
                           // Not my listing
                           mat.requests.some((r:any) => r.schoolId === activeSchoolId) ? (
                              <div className="text-center font-bold text-amber-600 bg-amber-50 py-2 rounded-xl text-sm">Talebiniz değerlendiriliyor...</div>
                           ) : (
                              <button onClick={() => handleRequestMaterial(mat)} className="w-full bg-blue-50 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors">
                                 {mat.type === 'surplus' ? 'Bu Malzemeyi Talep Et' : 'Bu İhtiyacı Karşılayabilirim'}
                              </button>
                           )
                        ) : (
                           // My listing
                           <div>
                              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Gelen Talepler ({mat.requests.filter((r:any) => r.status === 'pending').length})</p>
                              {mat.requests.length === 0 ? (
                                 <div className="text-sm text-gray-500">Henüz talep yok.</div>
                              ) : (
                                 <div className="space-y-2">
                                    {mat.requests.map((req:any) => (
                                       <div key={req.reqId} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                          <span className="font-semibold text-sm text-gray-800">{req.schoolName}</span>
                                          {req.status === 'pending' ? (
                                             <button onClick={() => handleApproveRequest(mat, req.reqId)} className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-200">Onayla</button>
                                          ) : req.status === 'approved' ? (
                                             <button onClick={() => printProtocol(mat, req)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center gap-1"><FileText size={14}/> Tutanak Yazdır</button>
                                          ) : (
                                             <span className="text-xs text-rose-500 font-bold">Reddedildi</span>
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        )}
                     </div>
                  </div>
               ))}
               {materials.length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-400 font-bold bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                     Henüz ilan bulunmamaktadır.
                  </div>
               )}
            </div>
         </div>
      )}

      {activeTab === 'documents' && (
         <div className="space-y-6">
            <div className="flex gap-4">
               <button onClick={() => setDocSubTab('myshared')} className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-colors ${docSubTab === 'myshared' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Benim Paylaştıklarım</button>
               <button onClick={() => setDocSubTab('sharedwithme')} className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-colors ${docSubTab === 'sharedwithme' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Benimle Paylaşılanlar</button>
            </div>

            {docSubTab === 'myshared' && (
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-black text-gray-800">Sisteme Yüklediğim Dosyalar</h3>
                     <button onClick={() => { setEditingDocId(null); setDocFile(null); setSelectedTargetSchools([]); setShowDocForm(!showDocForm); }} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
                        <Upload size={16} /> Dosya Yükle ve Paylaş
                     </button>
                  </div>

                  {showDocForm && (
                     <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 animate-in slide-in-from-top-4 mb-6">
                        <h4 className="font-bold text-emerald-900 mb-4">{editingDocId ? 'Paylaşımı Düzenle' : 'Yeni Belge Paylaş'}</h4>
                        <div className="space-y-4">
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Dosya Seçin (Word, Excel, PDF - Maks 800KB)</label>
                              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx,.xls,.xlsx" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 focus:outline-none" />
                           </div>
                           
                           {docFile && (
                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Hangi Kurumlarla Paylaşılacak?</label>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-3 bg-white border border-gray-200 rounded-xl">
                                    {schools.filter((s:any) => s.id !== activeSchoolId).map((s:any) => (
                                       <label key={s.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-emerald-50 rounded-lg">
                                          <input type="checkbox" checked={selectedTargetSchools.includes(s.id)} onChange={(e) => {
                                             if(e.target.checked) setSelectedTargetSchools([...selectedTargetSchools, s.id]);
                                             else setSelectedTargetSchools(selectedTargetSchools.filter(id => id !== s.id));
                                          }} className="rounded text-emerald-600 focus:ring-emerald-500" />
                                          <span className="text-sm font-medium text-gray-700 line-clamp-1">{s.name}</span>
                                       </label>
                                    ))}
                                 </div>
                              </div>
                           )}

                           <div className="flex justify-end gap-3 pt-2">
                              <button onClick={() => {setShowDocForm(false); setDocFile(null); setSelectedTargetSchools([]); setEditingDocId(null); if(fileInputRef.current) fileInputRef.current.value='';}} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50">İptal</button>
                              <button onClick={handleShareDoc} disabled={submitting || !docFile || selectedTargetSchools.length === 0} className="px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50">{editingDocId ? 'Güncelle' : 'Paylaş'}</button>
                           </div>
                        </div>
                     </div>
                  )}

                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="border-b border-gray-200 text-sm text-gray-400">
                              <th className="pb-3 font-bold">Dosya Adı</th>
                              <th className="pb-3 font-bold">Paylaşılan Okul Sayısı</th>
                              <th className="pb-3 font-bold">Tarih</th>
                              <th className="pb-3 font-bold text-right">İşlem</th>
                           </tr>
                        </thead>
                        <tbody>
                           {documents.filter(d => d.schoolId === activeSchoolId).map(doc => (
                              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                                 <td className="py-4 flex items-center gap-3">
                                    <File size={18} className="text-blue-500" />
                                    <span className="font-semibold text-gray-800">{doc.fileName}</span>
                                 </td>
                                 <td className="py-4 text-sm font-medium text-gray-600">
                                    <div className="flex items-center gap-1"><Users size={14}/> {doc.sharedWith.length} Kurum</div>
                                 </td>
                                 <td className="py-4 text-sm text-gray-500">{new Date(doc.uploadedAt).toLocaleString('tr-TR')}</td>
                                 <td className="py-4 text-right">
                                    <button onClick={() => handleEditDocClick(doc)} className="text-gray-400 hover:text-blue-500 transition-colors p-2 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button><button onClick={() => handleDeleteDoc(doc.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                                 </td>
                              </tr>
                           ))}
                           {documents.filter(d => d.schoolId === activeSchoolId).length === 0 && (
                              <tr>
                                 <td colSpan={4} className="py-8 text-center text-gray-400 font-medium">Henüz paylaştığınız bir belge yok.</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {docSubTab === 'sharedwithme' && (
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-black text-gray-800 mb-6">Benimle Paylaşılan Belgeler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {documents.filter(d => d.sharedWith.includes(activeSchoolId)).map(doc => (
                        <div key={doc.id} className="border border-gray-200 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow bg-gray-50/50">
                           <div>
                              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                                 <FileText size={20} />
                              </div>
                              <h4 className="font-bold text-gray-900 mb-1 line-clamp-2" title={doc.fileName}>{doc.fileName}</h4>
                              <p className="text-xs font-medium text-blue-600 mb-4">{doc.schoolName}</p>
                           </div>
                           <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                              <span className="text-[10px] font-bold text-gray-400 uppercase"><Clock size={10} className="inline mr-1"/> {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}</span>
                              <a href={doc.fileData} download={doc.fileName} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-1">
                                 <Download size={14} /> İndir
                              </a>
                           </div>
                        </div>
                     ))}
                     {documents.filter(d => d.sharedWith.includes(activeSchoolId)).length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-400 font-medium bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                           Sizinle paylaşılan belge bulunmuyor.
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
      )}

    </div>
  );
};
