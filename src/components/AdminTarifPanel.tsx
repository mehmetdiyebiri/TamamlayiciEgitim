import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Loader2, User } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const AdminTarifPanel = ({ state, actions }: { state: any, actions: any }) => {
  const { activeSchoolId, selectedStudent } = state;
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [savedResearches, setSavedResearches] = useState<any[]>([]);
  const [debugMsg, setDebugMsg] = useState('');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStudent) {
      setStudentId(null);
      setStudentName(null);
      setSummary(null);
      setSavedResearches([]);
      return;
    }
    const fetchStudent = async () => {
      setLoading(true);
      try {
        let foundId = null;
        let foundName = null;
        
        // Use state.users directly which handles superadmin and regular admin context correctly
        if (state.users) {
            const user = state.users.find((u: any) => (u.name === selectedStudent || u.username === selectedStudent) && u.role === 'student');
            if (user) {
                foundId = user.id;
                foundName = user.name || user.username;
            }
        }
        
        if (!foundId) {
            // Fallback just in case
            const userColName = activeSchoolId === 'default' ? 'users' : (activeSchoolId ? `users_${activeSchoolId}` : 'users');
            const q = query(collection(db, userColName), where('role', '==', 'student'));
            const snap = await getDocs(q);
            snap.forEach(d => {
              const ud = d.data();
              if (ud.name === selectedStudent || ud.username === selectedStudent) {
                foundId = d.id;
                foundName = ud.name || ud.username;
              }
            });
        }
        setStudentId(foundId);
        setStudentName(foundName);
        
        if (foundId) {
          try {
             const docRef = doc(db, 'research_chats', foundId);
             const chatSnap = await getDoc(docRef);
                          if (chatSnap.exists() && chatSnap.data().savedResearches) {
                 setSavedResearches(chatSnap.data().savedResearches);
             } else {
                 setSavedResearches([]);
             }
          } catch(e) {
             console.error(e);
          }
        }
      } catch (err) {
        console.error("Error finding student:", err);
      }
      setLoading(false);
    };
    fetchStudent();
  }, [selectedStudent, activeSchoolId]);

  const handleGenerateSummary = async () => {
    if (!studentId) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'research_chats', studentId);
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data().messages) {
        const history = snap.data().messages;
        const savedResearchTitles = (snap.data().savedResearches || []).map((r: any) => r.title);
        const res = await fetch('/api/summarize-research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history, savedResearchTitles })
        });
        const data = await res.json();
        if (data.text) {
            setSummary(data.text);
        }
      } else {
        setSummary("Öğrencinin henüz bir araştırma geçmişi bulunmuyor.");
      }
    } catch (err) {
      console.error("Summary error:", err);
      setSummary("Derleme yapılırken bir hata oluştu.");
    }
    setLoading(false);
  };

  if (!selectedStudent) {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm mt-6">
            <User className="text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Öğrenci Seçilmedi</h2>
            <p className="text-gray-500 text-center">Öğrencinin tarif derlemesini görüntülemek için lütfen üst kısımdan bir öğrenci seçin.</p>
        </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 mt-6">
      <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FileText className="text-indigo-600" size={24} />
                Öğrencinin Yaptığı Araştırmalar (Dijital Defter)
            </h3>
            {savedResearches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedResearches.map((r, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="font-bold text-gray-800 mb-1">{r.title || 'İsimsiz Araştırma'}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(r.date).toLocaleDateString('tr-TR')}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 text-center py-6 border border-dashed border-gray-200 rounded-2xl">
                    Öğrencinin henüz dijital defterde kaydettiği bir araştırma başlığı bulunmuyor.
                </div>
            )}
          </div>
      <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={160} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 flex items-center gap-3">

            <Sparkles size={32} />
            Öğrenci Tarifi (Yapay Zeka)
          </h2>
          <p className="text-indigo-100 text-base font-medium max-w-2xl leading-relaxed opacity-90 mb-6">
            Öğrencinin Araştırma Asistanı ile yaptığı etkileşimleri yapay zeka aracılığıyla derleyerek, ilgi alanlarını, güçlü yönlerini ve rehberlik ihtiyaçlarını analiz edin.
          </p>
          <button 
            onClick={handleGenerateSummary}
            disabled={loading || !studentId}
            className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
            {loading ? "Derleniyor..." : "Araştırma Geçmişini Derle"}
          </button>
        </div>
      </div>

      {summary && (
        <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Sparkles className="text-indigo-600" size={24} />
                {studentName} İçin Derleme ve Rehberlik Önerileri
            </h3>
            <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {summary}
            </div>
        </div>
      )}
    </div>
  );
};
