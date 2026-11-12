import React, { useRef, useState } from 'react';
import { User, Download, PenTool, School, Loader2, Award, Sparkles, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const EvaluationPanel = ({ state, actions }: any) => {
  const { 
    selectedStudent, categories, tasks, evaluations, successDescriptions, 
    remedialTasks, remedialProblems, uncompletedReasons, currentUser, 
    activeSchoolId, schools, selectedClass, users, devCardData, devCardConfig 
  } = state;
  const { handleTaskChange } = actions;
  
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfReportRef = useRef<HTMLDivElement>(null);

  const activeSchool = schools?.find((s: any) => s.id === activeSchoolId);
  const schoolName = activeSchool?.name || "DEĞERLER EĞİTİMİ";

  const getEvaluatorName = (evalStr: string) => {
      if (!evalStr) return currentUser?.name || currentUser?.username || "Öğretmen";
      const matchedUser = users?.find((u: any) => u.username === evalStr || u.id === evalStr);
      if (matchedUser) return matchedUser.name || matchedUser.username;
      return evalStr;
  };

  const getTaskEvalData = (cat: string, idx: number) => {
      return evaluations?.[selectedStudent]?.[cat]?.[idx] || { status: null, score: null };
  };

  const handleStatusClick = (cat: string, tIdx: number, targetStatus: string) => {
      const data = getTaskEvalData(cat, tIdx);
      if (data.status === targetStatus) {
          // Eğer aynı butona bir kere daha tıklanırsa hiç puan/durum verilmemiş gibi sıfırla
          handleTaskChange(cat, tIdx, 'status', null);
      } else {
          handleTaskChange(cat, tIdx, 'status', targetStatus);
      }
  };

  const handleScoreClick = (cat: string, tIdx: number, s: number) => {
      const data = getTaskEvalData(cat, tIdx);
      if (data.score === s) {
          // Eğer aynı puana bir kere daha tıklanırsa puanı geri al (hiç puan verilmemiş gibi)
          handleTaskChange(cat, tIdx, 'score', null);
      } else {
          if (!data.status) {
              handleTaskChange(cat, tIdx, 'status', 'YAPTI');
          }
          handleTaskChange(cat, tIdx, 'score', s);
      }
  };

  const getStatusColors = (status: string | null) => {
        if (status === 'YAPTI') return { 
            border: 'border-green-400 shadow-sm shadow-green-100', 
            btnYapti: 'bg-green-500 text-white shadow-sm', 
            btnYapmadi: 'bg-white text-gray-400 hover:bg-gray-50', 
            btnYapamadi: 'bg-white text-gray-400 hover:bg-gray-50', 
            activeCircle: 'bg-green-500 text-white border-green-500 shadow-sm',
            dot: 'bg-green-500', divider: 'border-gray-100'
        };
        if (status === 'YAPMADI') return { 
            border: 'border-red-400 shadow-sm shadow-red-100', 
            btnYapti: 'bg-white text-gray-400 hover:bg-gray-50', 
            btnYapmadi: 'bg-red-500 text-white shadow-sm', 
            btnYapamadi: 'bg-white text-gray-400 hover:bg-gray-50', 
            activeCircle: 'bg-red-500 text-white border-red-500 shadow-sm',
            dot: 'bg-red-500', divider: 'border-gray-100'
        };
        if (status === 'YAPAMADI') return { 
            border: 'border-orange-300 bg-orange-50/50 shadow-sm', 
            btnYapti: 'bg-white text-gray-400 hover:bg-gray-50 border-gray-200', 
            btnYapmadi: 'bg-white text-gray-400 hover:bg-gray-50 border-gray-200', 
            btnYapamadi: 'bg-orange-500 text-white shadow-sm border-orange-500', 
            activeCircle: 'bg-orange-500 text-white border-orange-500 shadow-sm',
            dot: 'bg-orange-500', divider: 'border-orange-100'
        };
        return { 
            border: 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white', 
            btnYapti: 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200', 
            btnYapmadi: 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200', 
            btnYapamadi: 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200', 
            activeCircle: 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50',
            dot: 'bg-gray-300', divider: 'border-gray-100'
        };
  };

  // Öğrencinin ilgili kategorideki rubrik puanlarına göre 3-4 cümlelik pedagojik değerlendirme üretimi
  const getCategoryEvaluationNarrative = (cat: string) => {
    const catTasks = tasks[cat] || [];
    if (catTasks.length === 0) {
      return "Bu kategori için tanımlanmış herhangi bir görev bulunmamaktadır.";
    }

    const evalDataList = catTasks.map((_: any, i: number) => getTaskEvalData(cat, i));
    const evaluatedTasks = evalDataList.filter((d: any) => d.status !== null);
    const countYapti = evalDataList.filter((d: any) => d.status === 'YAPTI').length;
    const countYapamadi = evalDataList.filter((d: any) => d.status === 'YAPAMADI').length;
    const countYapmadi = evalDataList.filter((d: any) => d.status === 'YAPMADI').length;
    
    if (evaluatedTasks.length === 0) {
      return `Öğrencimiz ${selectedStudent} için '${cat}' alanında henüz bir değerlendirme girişi yapılmamıştır. Görevler uygulandıkça öğrencinin gelişim düzeyine göre rubrik temelli kazanım analizi bu bölümde detaylı olarak yer alacaktır. Sürecin sağlıklı takibi için öğretmen ve veli iş birliğiyle haftalık görev kontrollerinin yapılması tavsiye edilir.`;
    }

    const scores = evalDataList
      .filter((d: any) => d.status === 'YAPTI' && d.score !== null && d.score !== undefined)
      .map((d: any) => Number(d.score));
    const avgScore = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : null;
    const successPercentage = Math.round((countYapti / catTasks.length) * 100);

    // Cümle 1: Genel tamamlama ve katılım durumu
    let s1 = "";
    if (countYapti === catTasks.length) {
      s1 = `Öğrencimiz ${selectedStudent}, '${cat}' kategorisinde hedeflenen tüm görevleri eksiksiz ve yüksek bir sorumluluk bilinciyle tamamlayarak %100 başarı oranına ulaşmıştır.`;
    } else if (countYapti > catTasks.length / 2) {
      s1 = `Öğrencimiz ${selectedStudent}, '${cat}' kategorisinde tanımlanan ${catTasks.length} görevin ${countYapti}'sini başarıyla yerine getirerek %${successPercentage} düzeyinde güçlü bir kazanım performansı sergilemiştir.`;
    } else if (countYapti > 0) {
      s1 = `Öğrencimiz ${selectedStudent}, '${cat}' alanındaki görevleri hayata geçirme sürecinde temel aşamaları tamamlamış ve %${successPercentage} düzeyinde kazanım kaydetmiştir.`;
    } else {
      s1 = `Öğrencimiz ${selectedStudent}, '${cat}' alanındaki görevlerde hedeflenen davranışları henüz düzenli uygulamaya aktaramamış olup yönlendirme ve takip desteğine ihtiyaç duymaktadır.`;
    }

    // Cümle 2: Rubrik puanı derinliği ve niteliksel kavrayış
    let s2 = "";
    if (avgScore !== null) {
      if (avgScore >= 4.5) {
        s2 = `Tamamlanan görevlerde elde ettiği ortalama ${avgScore.toFixed(1)}/5 rubrik derecesi, ilgili değer ve becerileri yalnızca uygulamakla kalmayıp örnek bir duyarlılıkla içselleştirdiğini göstermektedir.`;
      } else if (avgScore >= 3.5) {
        s2 = `Değerlendirmede yakaladığı ortalama ${avgScore.toFixed(1)}/5 rubrik puanı, yönergeleri uygulama düzeyinde başarıyla benimsediğini ve olumlu bir gelişim seyri izlediğini kanıtlamaktadır.`;
      } else if (avgScore >= 2.5) {
        s2 = `Elde edilen ortalama ${avgScore.toFixed(1)}/5 rubrik puanı, temel farkındalığın oluştuğunu ancak kazanımların kalıcı davranış kalıbına dönüşmesi için tekrar ve pekiştirmeye ihtiyaç olduğunu göstermektedir.`;
      } else {
        s2 = `Alınan ortalama ${avgScore.toFixed(1)}/5 rubrik puanı, görevlerin başlangıç düzeyinde ele alındığını, yönergelere daha fazla özen gösterilerek verimin artırılabileceğini işaret etmektedir.`;
      }
    } else {
      s2 = `Görevlerin niteliksel değerlendirmesinde rubrik derecelendirmesinin tamamlanmasıyla öğrencinin derinlemesine yetkinlik haritası daha somut biçimde netleşecektir.`;
    }

    // Cümle 3: Telafi / Destek / Güçlü Alanlar
    let s3 = "";
    if (countYapamadi > 0) {
      s3 = `Uygulama sürecinde zorlanılan ${countYapamadi} görev için belirlenen telafi adımlarının ve bireysel yönlendirmelerin takip edilmesi gelişimini hızlandıracaktır.`;
    } else if (countYapmadi > 0) {
      s3 = `Yerine getirilemeyen görevlerin nedenleri analiz edilerek zaman planlaması ve içsel motivasyon desteğiyle tamamlanması hedeflenmektedir.`;
    } else if (avgScore !== null && avgScore >= 4.0) {
      s3 = `Sergilediği özenli ve tutarlı yaklaşım, öğrencinin okul ve sosyal yaşam ortamında akranlarına örnek bir model oluşturmasını sağlamaktadır.`;
    } else {
      s3 = `Mevcut kazanımların süreklilik kazanması adına öğrencinin gösterdiği olumlu çabanın fark edilip desteklenmesi gelişimine önemli katkı sağlayacaktır.`;
    }

    // Cümle 4: Pedagojik Öneri ve Sonuç
    const s4 = `Okul ortamı ile aile rehberliğinin eş güdümlü sürdürülmesi, öğrencinin bu alandaki karakter ve ahlak gelişimini kalıcı bir kazanıma dönüştürecektir.`;

    return `${s1} ${s2} ${s3} ${s4}`;
  };

  // PDF Sayfaları: Her A4 sayfasına tam 3 kategori sığacak şekilde gruplama
  const categoryChunks: string[][] = [];
  for (let i = 0; i < (categories || []).length; i += 3) {
      categoryChunks.push(categories.slice(i, i + 3));
  }

  const localHandleDownloadPDF = async () => {
      if (!pdfReportRef.current) return;
      
      setIsDownloading(true);
      try {
          const pageNodes = pdfReportRef.current.querySelectorAll('.pdf-a4-page');
          if (pageNodes.length === 0) {
              setIsDownloading(false);
              return;
          }

          const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
          
          for (let i = 0; i < pageNodes.length; i++) {
              const pageEl = pageNodes[i] as HTMLElement;
              const dataUrl = await toPng(pageEl, { 
                  quality: 1.0,
                  pixelRatio: 2,
                  filter: (node: any) => !node.hasAttribute?.('data-html2canvas-ignore')
              });
              
              if (i > 0) {
                  pdf.addPage();
              }
              pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
          }
          
          pdf.save(`${selectedStudent}_Degerlendirme_Raporu.pdf`);
      } catch (error) {
          console.error('Error generating PDF:', error);
      } finally {
          setIsDownloading(false);
      }
  };

  if (!selectedStudent) {
      return (
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <User className="text-gray-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Öğrenci Seçiniz</h3>
              <p className="text-gray-500 text-sm max-w-sm text-center">Değerlendirme formunu görüntülemek için yukarıdaki menüden önce sınıf, ardından öğrenci seçimi yapınız.</p>
          </div>
      );
  }

  return (
      <div className="space-y-8 animate-in fade-in pb-12 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                  <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">DEĞERLENDİRME PANELİ</p>
                  <h2 className="font-black text-4xl text-blue-900 tracking-tight lowercase">{selectedStudent}</h2>
              </div>
              <button 
                  onClick={localHandleDownloadPDF} 
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm text-sm print:hidden"
              >
                  {isDownloading ? <><Loader2 size={16} className="animate-spin" /> Hazırlanıyor</> : <><Download size={16} /> Raporu PDF İndir (3 Kategori/Sayfa)</>}
              </button>
          </div>

          {/* EKRAN GÖRÜNTÜLEME VE DEĞERLENDİRME ALANI */}
          <div className="space-y-12">
              {categories.map((cat: string, cIdx: number) => {
                  const catTasks = tasks[cat] || [];
                  const countYapti = catTasks.filter((_: any, i: number) => getTaskEvalData(cat, i).status === 'YAPTI').length;
                  const successPercentage = catTasks.length > 0 ? Math.round((countYapti / catTasks.length) * 100) : 0;
                  const scores = catTasks
                      .map((_: any, i: number) => getTaskEvalData(cat, i))
                      .filter((d: any) => d.status === 'YAPTI' && d.score)
                      .map((d: any) => Number(d.score));
                  const avgScore = scores.length > 0 ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : null;
                  const narrativeText = getCategoryEvaluationNarrative(cat);

                  return (
                      <div key={cIdx} className="space-y-6 bg-gray-50/50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
                              <div>
                                  <h2 className="text-2xl font-black text-blue-900 uppercase tracking-wider">{cat}</h2>
                                  <p className="text-xs text-gray-400 font-semibold mt-0.5">Toplam {catTasks.length} Görev Değerlendirmesi</p>
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="bg-blue-100/70 text-blue-800 font-black px-4 py-1.5 rounded-xl text-xs border border-blue-200">
                                      Başarı: %{successPercentage}
                                  </span>
                                  {avgScore !== null && (
                                      <span className="bg-amber-100/70 text-amber-900 font-black px-4 py-1.5 rounded-xl text-xs border border-amber-200">
                                          Rubrik: {avgScore.toFixed(1)} / 5
                                      </span>
                                  )}
                              </div>
                          </div>

                          {/* Görev Kartları */}
                          <div className="space-y-6">
                              {catTasks.map((task: any, tIdx: number) => {
                                  const data = getTaskEvalData(cat, tIdx);
                                  const colors = getStatusColors(data.status);
                                  const taskText = typeof task === 'string' ? task : task.title;
                                  const parts = taskText.split(':');
                                  const title = parts[0];
                                  const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : '';

                                  return (
                                      <div key={tIdx} className={`p-7 rounded-[2rem] border-2 transition-all duration-300 bg-white ${colors.border}`}>
                                          <div className="flex flex-col lg:flex-row justify-between gap-6">
                                              <div className="flex-1 space-y-2">
                                                  <div className="flex items-center gap-2">
                                                      <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                                                      <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.15em]">GÖREV {tIdx + 1}</span>
                                                  </div>
                                                  <h3 className="font-black text-lg text-gray-900 leading-snug">{title}</h3>
                                                  {desc && <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-3xl">{desc}</p>}
                                              </div>
                                              
                                              {/* YAPTI / YAPMADI / YAPAMADI Butonları (Aynı butona tekrar basıldığında sıfırlanır) */}
                                              <div className="flex gap-2 shrink-0 h-fit bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                                  <button 
                                                      onClick={() => handleStatusClick(cat, tIdx, 'YAPTI')} 
                                                      title={data.status === 'YAPTI' ? "Durumu kaldır (Sıfırla)" : "Yaptı olarak işaretle"}
                                                      className={`px-7 py-2.5 rounded-xl text-xs font-black transition-all border-2 ${data.status === 'YAPTI' ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}
                                                  >
                                                      YAPTI
                                                  </button>
                                                  <button 
                                                      onClick={() => handleStatusClick(cat, tIdx, 'YAPMADI')} 
                                                      title={data.status === 'YAPMADI' ? "Durumu kaldır (Sıfırla)" : "Yapmadı olarak işaretle"}
                                                      className={`px-7 py-2.5 rounded-xl text-xs font-black transition-all border-2 ${data.status === 'YAPMADI' ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-100' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}
                                                  >
                                                      YAPMADI
                                                  </button>
                                                  <button 
                                                      onClick={() => handleStatusClick(cat, tIdx, 'YAPAMADI')} 
                                                      title={data.status === 'YAPAMADI' ? "Durumu kaldır (Sıfırla)" : "Yapamadı olarak işaretle"}
                                                      className={`px-7 py-2.5 rounded-xl text-xs font-black transition-all border-2 ${data.status === 'YAPAMADI' ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}
                                                  >
                                                      YAPAMADI
                                                  </button>
                                              </div>
                                          </div>
                                          
                                          {/* Rubrik Puanları ve Açıklamalar */}
                                          <div className={`mt-6 pt-6 flex flex-col md:flex-row gap-6 items-center border-t-2 transition-colors ${colors.divider}`}>
                                              <div className="flex gap-2 shrink-0">
                                                  {[1, 2, 3, 4, 5].map(s => (
                                                      <button 
                                                          key={s} 
                                                          onClick={() => handleScoreClick(cat, tIdx, s)} 
                                                          className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-2 transition-all text-xs ${data.score === s && data.status ? colors.activeCircle : 'bg-white text-gray-300 border-gray-100 hover:border-gray-300 hover:text-gray-600'}`}
                                                          title={data.score === s ? "Puanı sıfırla / kaldır" : `${s} Puan ver`}
                                                      >
                                                          {s}
                                                      </button>
                                                  ))}
                                              </div>
                                              <div className="flex-1 text-sm italic text-gray-500 font-semibold space-y-1">
                                                  {data.status === 'YAPTI' ? (
                                                      <div>{data.score ? successDescriptions[data.score] : <span className="text-gray-400 not-italic font-normal text-xs">1-5 arası bir başarı derecesi seçebilirsiniz. Aynı puana tıklayarak puanı geri alabilirsiniz.</span>}</div>
                                                  ) : data.status === 'YAPAMADI' ? (
                                                      data.score ? (
                                                          <div className="space-y-1">
                                                              <div className="text-orange-600 font-bold text-[10px] uppercase tracking-wider">Sorun: {remedialProblems?.[data.score]}</div>
                                                              <div className="text-blue-600">Telafi Görevi: {remedialTasks[data.score]}</div>
                                                          </div>
                                                      ) : (
                                                          <div className="text-gray-400 not-italic font-normal text-xs">1-5 arası bir sorun/telafi seviyesi seçebilirsiniz.</div>
                                                      )
                                                  ) : data.status === 'YAPMADI' ? (
                                                      data.score ? (
                                                          <div className="space-y-1">
                                                              <div className="text-red-600 font-bold text-[10px] uppercase tracking-wider">Sebep (Seviye {data.score}):</div>
                                                              <div className="text-red-500 font-semibold">{uncompletedReasons?.[data.score] || "Görevi yerine getirmedi."}</div>
                                                          </div>
                                                      ) : (
                                                          <div className="text-gray-400 not-italic font-normal text-xs">1-5 arası bir sebep derecesi seçebilirsiniz.</div>
                                                      )
                                                  ) : (
                                                      <div className="text-gray-400 not-italic font-normal text-xs">Bu görev için durum (YAPTI / YAPMADI / YAPAMADI) ve puan seçebilirsiniz.</div>
                                                  )}
                                              </div>
                                              <div className="text-[10px] font-black text-gray-400 flex items-center gap-2 shrink-0 ml-auto bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 uppercase tracking-widest">
                                                  <PenTool size={13} className="text-gray-400"/> Değerlendiren: {getEvaluatorName(data.evaluator)}
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>

                          {/* KATEGORİ SONUÇ BÖLÜMÜ (Kullanıcı İsteği: Her kategorinin altına sonuç bölümü ve 3-4 cümlelik rubrik değerlendirmesi) */}
                          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white rounded-3xl border-2 border-blue-200/80 shadow-xs">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-blue-200/60">
                                  <div className="flex items-center gap-2.5">
                                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                                          <Sparkles size={16} />
                                      </div>
                                      <div>
                                          <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">
                                              BÖLÜM SONUÇ DEĞERLENDİRMESİ ({cat})
                                          </h4>
                                          <p className="text-[11px] text-gray-500 font-medium">Öğrencinin ilgili bölümden aldığı rubrik puanlarına dayalı pedagojik sonuç analizi</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-white text-blue-900 border border-blue-200">
                                          Tamamlama: %{successPercentage}
                                      </span>
                                      {avgScore !== null && (
                                          <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                                              Ort. Rubrik: {avgScore.toFixed(1)} / 5
                                          </span>
                                      )}
                                  </div>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                  {narrativeText}
                              </p>
                          </div>
                      </div>
                  );
              })}
          </div>

          {/* =========================================================================
              GİZLİ PDF ÇIKTI ALANI:
              Kullanıcı İsteği: 
              "ayrıca Değerlendirme kısmının PDF raporunun fontları, tabloları vs. çok büyük. 
               her A4 sayfasına 3 kategori sığacak şekilde ölçeklendir."
              Bu alan her A4 sayfasını tam 210mm x 296mm boyutunda bağımsız olarak derler.
              Her sayfaya tam 3 kategori sığar; taşma ve sayfa ortasından bölünme engellenir.
             ========================================================================= */}
          <div className="absolute top-0 right-full w-[210mm] opacity-0 pointer-events-none -z-50" style={{ left: '-9999px' }}>
             <div ref={pdfReportRef}>
                 {categoryChunks.map((chunkCategories: string[], pageIdx: number) => {
                     const totalPages = categoryChunks.length;
                     const isFirstPage = pageIdx === 0;

                     return (
                         <div 
                             key={pageIdx} 
                             className="pdf-a4-page bg-white w-[210mm] h-[296mm] max-h-[296mm] p-7 flex flex-col justify-between box-border overflow-hidden"
                             style={{ width: '210mm', height: '296mm', maxHeight: '296mm', boxSizing: 'border-box' }}
                         >
                             {/* ÜST BİLGİ BAŞLIĞI */}
                             <div>
                                 <div className="h-1.5 bg-blue-600 w-full mb-3 rounded-full"></div>
                                 
                                 {isFirstPage ? (
                                     <div>
                                         <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-2">
                                             <div className="flex items-center gap-3">
                                                 <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center shrink-0 text-blue-700">
                                                     <School size={24} strokeWidth={2.3} />
                                                 </div>
                                                 <div>
                                                     <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">{selectedStudent}</h1>
                                                     <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                                         <span>SINIF: {selectedClass || '-'}</span>
                                                         <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                         <span>MAARİF MODELİ DEĞERLER EĞİTİMİ VE RUBRİK RAPORU</span>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div className="text-right shrink-0">
                                                 <div className="text-xs font-black text-gray-800">{new Date().toLocaleDateString('tr-TR')}</div>
                                                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{schoolName}</div>
                                             </div>
                                         </div>

                                         {/* Kazanılan Rozetler (Varsa kompakt şerit) */}
                                         {(devCardData?.manualBadges && devCardData.manualBadges.length > 0) && (
                                             <div className="mb-2 px-3 py-1.5 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center gap-2 flex-wrap">
                                                 <span className="text-[9px] font-black text-blue-900 uppercase flex items-center gap-1">
                                                     <Award size={12} /> Rozetler:
                                                 </span>
                                                 {devCardData.manualBadges.map((badgeId: any, bIdx: number) => {
                                                     const badgeObj = devCardConfig?.manualBadges?.find((b: any) => b.id === badgeId);
                                                     if (!badgeObj) return null;
                                                     return (
                                                         <span key={bIdx} className="bg-blue-600 text-white text-[8.5px] px-2 py-0.5 rounded font-bold">
                                                             {badgeObj.name}
                                                         </span>
                                                     );
                                                 })}
                                             </div>
                                         )}
                                     </div>
                                 ) : (
                                     <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                                         <div className="text-[11px] font-black text-blue-900 uppercase tracking-wider">
                                             ÖĞRENCİ: {selectedStudent} &nbsp;|&nbsp; SINIF: {selectedClass || '-'} &nbsp;|&nbsp; DEĞERLER EĞİTİMİ GELİŞİM RAPORU
                                         </div>
                                         <div className="text-[10px] font-bold text-gray-500">
                                             {new Date().toLocaleDateString('tr-TR')} • Sayfa {pageIdx + 1} / {totalPages}
                                         </div>
                                     </div>
                                 )}
                             </div>

                             {/* BU SAYFADAKİ 3 KATEGORİ (Ölçeklendirilmiş kompakt tablolar ve sonuç bölümleri) */}
                             <div className="flex-1 flex flex-col justify-between py-1 gap-2.5 overflow-hidden">
                                 {chunkCategories.map((cat: string, cIdx: number) => {
                                     const catTasks = tasks[cat] || [];
                                     const countYapti = catTasks.filter((_: any, i: number) => getTaskEvalData(cat, i).status === 'YAPTI').length;
                                     const successPercentage = catTasks.length > 0 ? Math.round((countYapti / catTasks.length) * 100) : 0;
                                     const scores = catTasks
                                         .map((_: any, i: number) => getTaskEvalData(cat, i))
                                         .filter((d: any) => d.status === 'YAPTI' && d.score)
                                         .map((d: any) => Number(d.score));
                                     const avgScore = scores.length > 0 ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : null;
                                     const narrative = getCategoryEvaluationNarrative(cat);

                                     return (
                                         <div 
                                             key={cIdx} 
                                             className="border border-gray-200 rounded-xl p-3 bg-white shadow-none shrink-0 flex flex-col justify-between"
                                         >
                                             {/* Kategori Başlığı ve Özet Rozeti */}
                                             <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-gray-100">
                                                 <div className="flex items-center gap-1.5">
                                                     <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                                     <h2 className="text-[11px] font-black text-blue-900 tracking-tight uppercase">{cat}</h2>
                                                 </div>
                                                 <div className="flex items-center gap-1.5">
                                                     <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[8.5px] border border-blue-100">
                                                         Başarı: %{successPercentage}
                                                     </span>
                                                     {avgScore !== null && (
                                                         <span className="bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded text-[8.5px] border border-amber-200">
                                                             Rubrik: {avgScore.toFixed(1)}/5
                                                         </span>
                                                     )}
                                                 </div>
                                             </div>

                                             {/* Kompakt Görev Tablosu */}
                                             <table className="w-full text-left border-collapse">
                                                 <thead>
                                                     <tr className="border-b border-gray-200 text-[8px] font-black text-gray-400 uppercase tracking-wider">
                                                         <th className="py-1 w-7 text-center">NO</th>
                                                         <th className="py-1 pl-2">GÖREV VE AÇIKLAMA</th>
                                                         <th className="py-1 text-center w-28">DURUM / PUAN</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody className="divide-y divide-gray-100">
                                                     {catTasks.map((task: any, tIdx: number) => {
                                                         const data = getTaskEvalData(cat, tIdx);
                                                         const taskText = typeof task === 'string' ? task : task.title;
                                                         const [title, ...descParts] = taskText.split(':');
                                                         const desc = descParts.join(':').trim();

                                                         let statusBadge = <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[8px] font-bold uppercase">-</span>;
                                                         if (data.status === 'YAPTI') statusBadge = <span className="bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">YAPTI</span>;
                                                         if (data.status === 'YAPMADI') statusBadge = <span className="bg-[#ffebee] text-[#c62828] border border-[#ffcdd2] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">YAPMADI</span>;
                                                         if (data.status === 'YAPAMADI') statusBadge = <span className="bg-[#fff3e0] text-[#ef6c00] border border-[#ffe0b2] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">YAPAMADI</span>;

                                                         return (
                                                             <tr key={tIdx} className="align-top">
                                                                 <td className="py-1.5 text-center font-bold text-gray-400 text-[9px]">{tIdx + 1}</td>
                                                                 <td className="py-1.5 pl-2 pr-2">
                                                                     <div className="font-bold text-gray-900 text-[9.5px] leading-tight">{title}</div>
                                                                     {desc && <div className="text-gray-500 text-[8px] font-normal leading-tight mt-0.5">{desc}</div>}
                                                                     {data.status === 'YAPTI' && data.score && (
                                                                         <div className="text-emerald-700 text-[8px] font-semibold mt-0.5 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                                                                             Seviye {data.score}: {successDescriptions?.[data.score]}
                                                                         </div>
                                                                     )}
                                                                     {data.status === 'YAPAMADI' && data.score && (
                                                                         <div className="text-orange-700 text-[8px] font-semibold mt-0.5 bg-orange-50 px-1.5 py-0.5 rounded inline-block">
                                                                             Sorun: {remedialProblems?.[data.score]} | Telafi: {remedialTasks?.[data.score]}
                                                                         </div>
                                                                     )}
                                                                     {data.status === 'YAPMADI' && data.score && (
                                                                         <div className="text-[#c62828] text-[8px] font-semibold mt-0.5 bg-red-50 px-1.5 py-0.5 rounded inline-block">
                                                                             Sebep: {uncompletedReasons?.[data.score] || "Görevi yerine getirmedi."}
                                                                         </div>
                                                                     )}
                                                                 </td>
                                                                 <td className="py-1.5 text-center whitespace-nowrap">
                                                                     {statusBadge}
                                                                     {data.score && (
                                                                         <span className="ml-1 text-[8px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                                                                             {data.score}P
                                                                         </span>
                                                                     )}
                                                                 </td>
                                                             </tr>
                                                         );
                                                     })}
                                                 </tbody>
                                             </table>

                                             {/* Her kategorinin altındaki Sonuç Bölümü (PDF) */}
                                             <div className="mt-1.5 p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                                                 <div className="text-[8.5px] font-black text-blue-900 uppercase flex items-center gap-1 mb-0.5">
                                                     <ClipboardCheck size={11} className="text-blue-700" /> Kategori Sonuç ve Rubrik Değerlendirmesi:
                                                 </div>
                                                 <p className="text-[8px] leading-tight text-gray-700 font-medium">
                                                     {narrative}
                                                 </p>
                                             </div>
                                         </div>
                                     );
                                 })}
                             </div>

                             {/* ALT BİLGİ SAYFA NUMARASI */}
                             <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase tracking-wider">
                                 <span>Milli Eğitim Bakanlığı Maarif Modeli Değerler Eğitimi Portfolyo ve Rubrik Değerlendirme Sistemi</span>
                                 <span>Sayfa {pageIdx + 1} / {totalPages}</span>
                             </div>
                         </div>
                     );
                 })}
             </div>
          </div>
      </div>
  );
};
