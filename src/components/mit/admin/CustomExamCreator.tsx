import React, { useState } from 'react';
import { CustomMitExam, CustomMitQuestion } from '../../../types/customMitExam';
import { PDF_SAMPLE_QUESTIONS, saveCustomMitExam } from '../../../services/customMitExamService';
import { Form1QuestionTemplate } from './Form1QuestionTemplate';
import { Form2DiagnosticMatrix } from './Form2DiagnosticMatrix';
import { INITIAL_CLASS_DATA } from '../../../lib/constants';
import { ArrowLeft, ArrowRight, CheckCircle2, Send, Users, UserCheck, Clock, BookOpen, Sparkles, AlertCircle, FileSpreadsheet, Brain } from 'lucide-react';

interface CustomExamCreatorProps {
    onBack: () => void;
    onSaved: () => void;
    state?: any;
    showToast?: (msg: string) => void;
    initialExam?: CustomMitExam | null;
}

export const CustomExamCreator: React.FC<CustomExamCreatorProps> = ({
    onBack,
    onSaved,
    state,
    showToast,
    initialExam
}) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Form 1 & 2 ortak soru state'i
    const [questions, setQuestions] = useState<CustomMitQuestion[]>(
        initialExam?.questions || PDF_SAMPLE_QUESTIONS
    );

    // Dağıtım & Sınav Ayarları (Adım 3)
    const [title, setTitle] = useState(initialExam?.title || 'Matematik Seviye Tespit Sınavı');
    const [description, setDescription] = useState(
        initialExam?.description || 'Öğretmen tarafından hazırlanan pedagojik çeldirici analizli seviye tespit sınavı.'
    );
    const [grade, setGrade] = useState<5 | 6 | 7 | 8>(initialExam?.grade || 5);
    const [durationMinutes, setDurationMinutes] = useState(initialExam?.durationMinutes || 35);
    const [targetType, setTargetType] = useState<'class' | 'students'>(initialExam?.targetType === 'students' ? 'students' : 'class');
    const [selectedClasses, setSelectedClasses] = useState<string[]>(initialExam?.targetClasses || ['5A']);
    const [selectedStudents, setSelectedStudents] = useState<string[]>(initialExam?.targetStudents || []);
    const [studentSearch, setStudentSearch] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Sınıf ve Öğrenci Listesi Verisi
    const classesData: Record<string, string[]> = state?.classes || INITIAL_CLASS_DATA;
    const availableClassList = Object.keys(classesData).sort();

    // Seçili sınıflara ait öğrenciler
    const activeClassForStudents = selectedClasses[0] || availableClassList[0] || '5A';
    const studentsInCurrentClass = classesData[activeClassForStudents] || [];

    const filteredStudents = studentsInCurrentClass.filter(s =>
        s.toLowerCase().includes(studentSearch.toLowerCase())
    );

    // Öğrenci Checkbox Değişimi
    const handleToggleStudent = (studentName: string) => {
        if (selectedStudents.includes(studentName)) {
            setSelectedStudents(selectedStudents.filter(s => s !== studentName));
        } else {
            setSelectedStudents([...selectedStudents, studentName]);
        }
    };

    // Tüm Öğrencileri Seç / Kaldır
    const handleSelectAllStudents = () => {
        if (selectedStudents.length === studentsInCurrentClass.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents([...studentsInCurrentClass]);
        }
    };

    // Sınıf Checkbox Değişimi
    const handleToggleClass = (cls: string) => {
        if (selectedClasses.includes(cls)) {
            if (selectedClasses.length > 1) {
                setSelectedClasses(selectedClasses.filter(c => c !== cls));
            } else {
                showToast?.('En az 1 sınıf seçilmelidir.');
            }
        } else {
            setSelectedClasses([...selectedClasses, cls]);
        }
    };

    // Adım Geçiş Doğrulamaları
    const handleProceedToStep2 = () => {
        // En az 1 sorunun metni olmalı
        const emptyCount = questions.filter(q => !q.questionText.trim()).length;
        if (emptyCount === questions.length) {
            showToast?.('Lütfen en az bir soru metni girin.');
            return;
        }
        setStep(2);
    };

    const handleProceedToStep3 = () => {
        setStep(3);
    };

    // Sınavı Kaydet & Yayınla
    const handleSaveAndPublish = async () => {
        if (!title.trim()) {
            showToast?.('Lütfen sınav başlığı belirleyin.');
            return;
        }

        if (targetType === 'students' && selectedStudents.length === 0) {
            showToast?.('Lütfen en az 1 öğrenci seçin veya Tüm Sınıfı seçin.');
            return;
        }

        setIsSaving(true);
        const examId = initialExam?.id || `mit-exam-${Date.now()}`;
        const teacherName = state?.currentUser?.name || 'Matematik Öğretmeni';

        const newExam: CustomMitExam = {
            id: examId,
            title: title.trim(),
            description: description.trim(),
            grade,
            durationMinutes: Number(durationMinutes) || 30,
            teacherName,
            createdAt: initialExam?.createdAt || new Date().toISOString().split('T')[0],
            targetType,
            targetClasses: selectedClasses,
            targetStudents: targetType === 'students' ? selectedStudents : [],
            questions,
            status: 'active'
        };

        const success = await saveCustomMitExam(newExam);
        setIsSaving(false);

        if (success) {
            const targetSummary = targetType === 'class' 
                ? `${selectedClasses.join(', ')} sınıfına`
                : `${selectedStudents.length} öğrenciye`;
            showToast?.(`"${title}" başarıyla oluşturuldu ve ${targetSummary} atandı!`);
            onSaved();
        } else {
            showToast?.('Sınav kaydedilirken bir hata oluştu.');
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Navigation & Stepper */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-xs cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Geri Dön
                </button>

                {/* Step Indicators */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                            step === 1 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>1. Form 1: Soru Şablonu</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setStep(2)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                            step === 2 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        <Brain className="w-3.5 h-3.5" />
                        <span>2. Form 2: Tanılama Matrisi</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setStep(3)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                            step === 3 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        <Send className="w-3.5 h-3.5" />
                        <span>3. Hedef Kitle & Gönderim</span>
                    </button>
                </div>

                {/* Quick Next/Finish CTA */}
                <div className="flex items-center gap-2">
                    {step === 1 && (
                        <button
                            type="button"
                            onClick={handleProceedToStep2}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                            Form 2'ye Geç <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {step === 2 && (
                        <button
                            type="button"
                            onClick={handleProceedToStep3}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                            Dağıtım & Gönderim <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {step === 3 && (
                        <button
                            type="button"
                            disabled={isSaving}
                            onClick={handleSaveAndPublish}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                            {isSaving ? 'Kaydediliyor...' : 'Sınavı Kaydet & Gönder'}
                        </button>
                    )}
                </div>
            </div>

            {/* STEP 1: FORM 1 (Soru ve Uygulama Şablonu) */}
            {step === 1 && (
                <Form1QuestionTemplate
                    questions={questions}
                    onChangeQuestions={setQuestions}
                    showToast={showToast}
                />
            )}

            {/* STEP 2: FORM 2 (Cevap Anahtarı & Tanılama Matrisi) */}
            {step === 2 && (
                <Form2DiagnosticMatrix
                    questions={questions}
                    onChangeQuestions={setQuestions}
                    showToast={showToast}
                />
            )}

            {/* STEP 3: HEDEF KİTLE VE DAĞITIM */}
            {step === 3 && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                            <Send className="w-3.5 h-3.5" />
                            Adım 3 / Hedef Kitle & Dağıtım
                        </div>
                        <h2 className="text-xl font-black text-slate-900">
                            Sınav Bilgileri ve Sınıf / Öğrenciye Gönderim
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Hazırladığınız {questions.length} soruluk seviye tespit sınavını istediğiniz sınıfa veya sınıftaki belirli öğrencilere gönderin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Sol Kolon: Sınav Bilgileri */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-indigo-600" /> Sınav Ayarları
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Sınav Başlığı</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Örn: 5. Sınıf 1. Dönem Seviye Tespit Sınavı"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Sınıf Düzeyi</label>
                                <select
                                    value={grade}
                                    onChange={(e) => setGrade(Number(e.target.value) as any)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value={5}>5. Sınıf (Bursluluk & Temel)</option>
                                    <option value={6}>6. Sınıf (Beceri Temelli)</option>
                                    <option value={7}>7. Sınıf (LGS Ön Hazırlık)</option>
                                    <option value={8}>8. Sınıf (LGS Odaklı)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Sınav Süresi (Dakika)</label>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        min={5}
                                        max={120}
                                        value={durationMinutes}
                                        onChange={(e) => setDurationMinutes(Number(e.target.value))}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama / Yönerge</label>
                                <textarea
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Öğrencilere sınav öncesi hatırlatmalar..."
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                                <div className="flex justify-between">
                                    <span>Toplam Soru Sayısı:</span>
                                    <strong className="text-slate-800">{questions.length} Soru</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>Öğretmen:</span>
                                    <strong className="text-slate-800">{state?.currentUser?.name || 'Matematik Zümresi'}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Sağ Kolon: Dağıtım (Sınıf veya Öğrenci Seçimi) */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                <Users className="w-4 h-4 text-indigo-600" />
                                Gönderim Hedefi Belirleyin
                            </h3>

                            {/* Dağıtım Türü Seçimi */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setTargetType('class')}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                        targetType === 'class'
                                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-black'
                                            : 'border-slate-200 bg-slate-50/50 text-slate-600 font-bold hover:bg-slate-100'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="w-4 h-4 text-indigo-600" />
                                        <span className="text-xs">Tüm Sınıfa Gönder</span>
                                    </div>
                                    <p className="text-[11px] font-normal text-slate-500">
                                        Seçilen sınıf veya sınıflardaki tüm öğrenciler bu sınavı görür.
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setTargetType('students')}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                        targetType === 'students'
                                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-black'
                                            : 'border-slate-200 bg-slate-50/50 text-slate-600 font-bold hover:bg-slate-100'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <UserCheck className="w-4 h-4 text-indigo-600" />
                                        <span className="text-xs">Belirli Öğrencilere Gönder</span>
                                    </div>
                                    <p className="text-[11px] font-normal text-slate-500">
                                        Sınıftan sadece seçtiğiniz öğrencilere özel atama yapın.
                                    </p>
                                </button>
                            </div>

                            {/* Hedef Sınıflar Seçimi */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-700">
                                    {targetType === 'class' ? 'Hedef Sınıfları Seçin:' : 'Öğrencinin Bulunduğu Sınıf:'}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableClassList.map(cls => {
                                        const isSelected = selectedClasses.includes(cls);
                                        return (
                                            <button
                                                key={cls}
                                                type="button"
                                                onClick={() => {
                                                    if (targetType === 'students') {
                                                        setSelectedClasses([cls]);
                                                        setSelectedStudents([]);
                                                    } else {
                                                        handleToggleClass(cls);
                                                    }
                                                }}
                                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                                }`}
                                            >
                                                {cls} Sınıfı
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Eğer "Belirli Öğrencilere Gönder" seçiliyse öğrenci listesi */}
                            {targetType === 'students' && (
                                <div className="space-y-3 pt-3 border-t border-slate-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-slate-800">
                                                {activeClassForStudents} Sınıfı Öğrencileri ({selectedStudents.length} Seçili)
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleSelectAllStudents}
                                                className="text-[11px] text-indigo-600 font-bold hover:underline"
                                            >
                                                {selectedStudents.length === studentsInCurrentClass.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            value={studentSearch}
                                            onChange={(e) => setStudentSearch(e.target.value)}
                                            placeholder="Öğrenci ara..."
                                            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50/50">
                                        {filteredStudents.map(student => {
                                            const isChecked = selectedStudents.includes(student);
                                            return (
                                                <label
                                                    key={student}
                                                    onClick={() => handleToggleStudent(student)}
                                                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                                                        isChecked
                                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold'
                                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => {}}
                                                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-xs truncate">{student}</span>
                                                </label>
                                            );
                                        })}
                                        {filteredStudents.length === 0 && (
                                            <div className="col-span-full p-4 text-center text-xs text-slate-400">
                                                Öğrenci bulunamadı.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Dağıtım Özeti ve Buton */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <div className="text-xs text-slate-500">
                                    Hedef: <strong className="text-slate-800">
                                        {targetType === 'class' ? `${selectedClasses.join(', ')} sınıfları` : `${selectedStudents.length} öğrenci`}
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={handleSaveAndPublish}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    {isSaving ? 'Kaydediliyor ve Gönderiliyor...' : 'Sınavı Kaydet & Sınıfa Gönder'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
