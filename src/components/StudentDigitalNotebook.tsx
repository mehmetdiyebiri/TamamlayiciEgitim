import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Search, Bot, User, Sparkles, BookOpen, Loader2, Save, Plus, Clock, FileText, ArrowRight, Trash2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const StudentDigitalNotebook = ({ state, actions }: { state: any, actions?: any }) => {
  const { currentUser, selectedStudent, activeSchoolId } = state;
  const isStudent = currentUser?.role === 'student' || currentUser?.role === 'öğrenci';
  const [studentId, setStudentId] = useState<string | null>(isStudent ? currentUser?.id : null);
  const [studentName, setStudentName] = useState<string | null>(isStudent ? currentUser?.name || currentUser?.username : null);
  
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [savedResearches, setSavedResearches] = useState<any[]>([]);
  
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [savingResearch, setSavingResearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStudent) {
      setStudentId(currentUser.id);
      setStudentName(currentUser.name || currentUser.username);
    } else {
      if (selectedStudent) {
        const fetchStudent = async () => {
            let foundId = null;
            let foundName = null;
            
            if (state.users) {
                const user = state.users.find((u: any) => (u.name === selectedStudent || u.username === selectedStudent) && u.role === 'student');
                if (user) {
                    foundId = user.id;
                    foundName = user.name || user.username;
                }
            }
            
            if (!foundId) {
                const { collection, query, where, getDocs } = await import('firebase/firestore');
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
        };
        fetchStudent();
      } else {
        setStudentId(null);
        setStudentName(null);
      }
    }
  }, [selectedStudent, isStudent, activeSchoolId, currentUser]);

  useEffect(() => {
    if (!studentId) {
       setLoading(false);
       return;
    }
    const loadChat = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'research_chats', studentId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setMessages([{ role: 'model', text: 'Merhaba! Ben senin eğitim ve araştırma asistanınım. Hangi konuda araştırma yapmak istersin?' }]);
          if (snap.data().savedResearches) {
            setSavedResearches(snap.data().savedResearches);
          }
        } else {
          setMessages([{ role: 'model', text: 'Merhaba! Ben senin eğitim ve araştırma asistanınım. Hangi konuda araştırma yapmak istersin?' }]);
        }
      } catch (err) {
        console.error("Error loading chat:", err);
      }
      setLoading(false);
    };
    loadChat();
  }, [studentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveState = async (newMessages: any[], newSaved: any[]) => {
    if (!studentId) return;
    try {
      const docRef = doc(db, 'research_chats', studentId);
      await setDoc(docRef, { messages: newMessages, savedResearches: newSaved }, { merge: true });
    } catch (err) {
      console.error("Error saving chat:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const userText = input.trim();
    setInput('');
    const newMsgs = [...messages, { role: 'user', text: userText }];
    setMessages(newMsgs);
    setSending(true);
    await saveState(newMsgs, savedResearches);

    try {
      const res = await fetch('/api/research-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs })
      });
      const data = await res.json();
      if (data.text) {
        const finalMsgs = [...newMsgs, { role: 'model', text: data.text }];
        setMessages(finalMsgs);
        await saveState(finalMsgs, savedResearches);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([...newMsgs, { role: 'model', text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar dene.' }]);
    }
    setSending(false);
  };

  const handleSaveResearch = async () => {
     if (messages.length <= 1 || savingResearch) return; // Only default message
     setSavingResearch(true);
     try {
       const res = await fetch('/api/generate-title', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ messages })
       });
       const data = await res.json();
       const title = data.title || "İsimsiz Araştırma";

       const newSaved = [{ id: Date.now().toString(), title, date: new Date().toISOString(), messages: [...messages] }, ...savedResearches];
       setSavedResearches(newSaved);
       await saveState(messages, newSaved);
     } catch (err) {
       console.error("Save research error:", err);
       const title = "İsimsiz Araştırma";
       const newSaved = [{ id: Date.now().toString(), title, date: new Date().toISOString(), messages: [...messages] }, ...savedResearches];
       setSavedResearches(newSaved);
       await saveState(messages, newSaved);
     }
     setSavingResearch(false);
  };

  const handleNewResearch = async () => {
     const newMsgs = [{ role: 'model', text: 'Merhaba! Ben senin eğitim ve araştırma asistanınım. Hangi konuda araştırma yapmak istersin?' }];
     setMessages(newMsgs);
     await saveState(newMsgs, savedResearches);
  };

  const handleLoadSaved = async (id: string) => {
     const found = savedResearches.find(r => r.id === id);
     if (found) {
        setMessages(found.messages);
        await saveState(found.messages, savedResearches);
     }
  };

  const handleDeleteResearch = async (id: string) => {
      if (actions?.requestConfirm) {
          actions.requestConfirm("Bu araştırmayı silmek istediğinize emin misiniz?", async () => {
              const newSaved = savedResearches.filter(r => r.id !== id);
              setSavedResearches(newSaved);
              await saveState(messages, newSaved);
          });
      } else {
          const confirmDelete = window.confirm("Bu araştırmayı silmek istediğinize emin misiniz?");
          if (!confirmDelete) return;
          const newSaved = savedResearches.filter(r => r.id !== id);
          setSavedResearches(newSaved);
          await saveState(messages, newSaved);
      }
  };

  if (!isStudent && !selectedStudent) {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm mt-6">
            <BookOpen className="text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Öğrenci Seçilmedi</h2>
            <p className="text-gray-500 text-center">Yapay Zeka Araştırma Asistanını görüntülemek için lütfen üst kısımdan bir öğrenci seçin.</p>
        </div>
    );
  }

  if (loading) {
    return <div className="p-12 text-center text-emerald-600 font-bold flex items-center justify-center gap-3">
        <Loader2 className="animate-spin" size={24} />
        Asistan Yükleniyor...
    </div>;
  }

  if (!isStudent && selectedStudent) {
    return (
        <div className="max-w-5xl mx-auto mt-6 space-y-6 pb-12 animate-in fade-in duration-500">
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
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-6 pb-12 animate-in fade-in duration-500">
        <div className="flex flex-col h-[700px] max-h-[80vh] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <Sparkles size={24} className="text-emerald-100" />
                </div>
                <div>
                    <h2 className="text-xl font-black">
                        {!isStudent && studentName ? `${studentName} - Araştırma Asistanı` : 'Yapay Zeka Araştırma Asistanı'}
                    </h2>
                    <p className="text-emerald-100 text-sm font-medium opacity-90">
                        Öğrenmek istediğin her şeyi sorabilir, birlikte araştırma yapabiliriz.
                    </p>
                </div>
            </div>
            {isStudent && (
                <div className="flex gap-2">
                    <button 
                        onClick={handleSaveResearch}
                        disabled={savingResearch}
                        className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-70"
                    >
                        {savingResearch ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                        {savingResearch ? "Kaydediliyor..." : "Araştırmayı Kaydet"}
                    </button>
                    <button 
                        onClick={handleNewResearch}
                        className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} /> Yeni Araştırma
                    </button>
                </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                        <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-emerald"><ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown></div>
                    </div>
                </div>
            ))}
            {sending && (
                <div className="flex gap-4 flex-row">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-600">
                        <Bot size={20} />
                    </div>
                    <div className="max-w-[75%] p-4 rounded-2xl shadow-sm bg-white border border-gray-100 text-gray-800 rounded-tl-none flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-emerald-600" />
                        <span className="text-sm text-gray-500 font-medium">Asistan düşünüyor...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {isStudent && (
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3 relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ne hakkında araştırma yapmak istersin?"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
                        disabled={sending}
                    />
                    <button 
                        type="submit"
                        disabled={!input.trim() || sending}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white rounded-2xl px-6 flex items-center justify-center transition-colors shadow-sm"
                    >
                        <Send size={20} />
                    </button>
                </form>
              </div>
          )}
        </div>

        {/* Saved Researches */}
        {savedResearches.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="text-emerald-600" size={20} />
                    Kaydedilen Araştırmalar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedResearches.map(research => (
                        <div key={research.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:border-emerald-200 transition-colors flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-gray-800 line-clamp-1">{research.title}</h4>
                                <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                                    <Clock size={12} />
                                    {new Date(research.date).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                {research.messages.filter((m: any) => m.role === 'user').map((m: any) => m.text).join(' - ')}
                            </p>
                            <div className="mt-auto flex items-center justify-between">
                                <button 
                                    onClick={() => handleLoadSaved(research.id)}
                                    className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                >
                                    Sohbeti Yükle <ArrowRight size={14} />
                                </button>
                                <button
                                    onClick={() => handleDeleteResearch(research.id)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};
