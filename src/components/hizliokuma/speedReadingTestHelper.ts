import { recordSpeedReadingSession } from '../../data/hizliOkumaService';

export function resolveActiveStudentIdentity(state: any): { studentName: string; studentClass: string } {
  const { currentUser, selectedStudent, selectedClass, classes } = state || {};
  const isStudentRole = currentUser?.role === 'student' || currentUser?.role === 'öğrenci';

  if (isStudentRole) {
    const studentName = currentUser?.name || currentUser?.username || 'Öğrenci';
    const studentClass = currentUser?.classLevel || selectedClass || (classes && Object.keys(classes)[0]) || '6A';
    return { studentName, studentClass };
  }

  // If teacher/admin is testing or viewing a student
  if (selectedStudent) {
    const studentClass = selectedClass || (classes && Object.keys(classes).find((c) => (classes[c] || []).includes(selectedStudent))) || '6A';
    return { studentName: selectedStudent, studentClass };
  }

  const fallbackClass = selectedClass || (classes && Object.keys(classes)[0]) || '6A';
  const fallbackStudent = (classes && classes[fallbackClass]?.[0]) || currentUser?.name || 'Öğrenci';
  return { studentName: fallbackStudent, studentClass: fallbackClass };
}

export function recordSpeedReadingTestResult(
  state: any,
  selectedText: { title: string; words: number },
  wpm: number,
  compScore: number,
  durationSec: number
) {
  const { activeSchoolId, classes } = state || {};
  const { studentName, studentClass } = resolveActiveStudentIdentity(state);
  const perfScore = Math.round((wpm / 300) * 100 * 0.7 + compScore * 0.3);

  return recordSpeedReadingSession(
    activeSchoolId,
    studentName,
    studentClass,
    {
      type: 'speed_test',
      typeLabel: 'Hızlı Okuma Testi',
      title: selectedText.title,
      wpm,
      comprehension: compScore,
      durationSeconds: durationSec,
      details: `${selectedText.words} kelime • Performans: ${perfScore} Puan`
    },
    classes
  );
}
