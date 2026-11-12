import * as pdfjsLib from 'pdfjs-dist';

// Use Vite-bundled worker so PDF parsing works both in AI Studio and on static Vercel deployments
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export async function extractStructuredTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const allLines: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    let currentLine = '';
    let lastY: number | null = null;

    for (const rawItem of textContent.items as any[]) {
      const str = rawItem?.str ?? '';
      const y = rawItem?.transform ? Math.round(rawItem.transform[5]) : null;

      if (lastY !== null && y !== null && Math.abs(y - lastY) > 2) {
        if (currentLine.trim()) allLines.push(currentLine.trim());
        currentLine = str;
      } else {
        const needsSpace =
          currentLine.length > 0 &&
          !currentLine.endsWith(' ') &&
          str.length > 0 &&
          !str.startsWith(' ');
        currentLine += (needsSpace ? ' ' : '') + str;
      }

      if (rawItem?.hasEOL) {
        if (currentLine.trim()) allLines.push(currentLine.trim());
        currentLine = '';
        lastY = null;
      } else if (y !== null) {
        lastY = y;
      }
    }

    if (currentLine.trim()) {
      allLines.push(currentLine.trim());
    }
  }

  return allLines.join('\n');
}

export function cleanOpticalStudentName(rawName: string): string {
  let name = (rawName || '').trim();
  if (/^(?:[A-ZÇĞİÖŞÜ]\s+){3,}[A-ZÇĞİÖŞÜ]$/i.test(name)) {
    name = name.replace(/\s+/g, '');
    if (name === 'ÖMERÖNDER') return 'ÖMER ÖNDER';
  }
  const knownFixes: Record<string, string> = {
    'RUMEYSADOĞRU': 'RUMEYSA DOĞRU',
    'EMİNEAYŞE AY': 'EMİNE AYŞE AY',
    'BURAK BAYRAKDAROĞUU': 'BURAK BAYRAKDAROĞLU',
    'ELİF TUÇDO AN': 'ELİF TUÇDOĞAN',
    'ŞEYMA GÜN DÜZ': 'ŞEYMA GÜNDÜZ',
    'AYT* İSLEK': 'AYTUĞ İŞLEK',
    'EMİR EKRE MAKGÜN': 'EMİR EKREM AKGÜN',
    'FATMAZEHRA ÜNLÜUYSAL': 'FATMA ZEHRA ÜNLÜUYSAL',
    'MANSURİRGAV': 'MANSUR İRGAV',
    'MUSTAFAAYKUT CANSIZ': 'MUSTAFA AYKUT CANSIZ',
    'ERTUĞRULERSÖZ': 'ERTUĞRUL ERSÖZ',
    'SA E ŞEYMA ÜNLÜUYSAL': 'SARE ŞEYMA ÜNLÜUYSAL',
    'P*NAR KAR BCAK': 'PINAR KARABACAK',
    'YUSUFALİAYDOĞAN': 'YUSUF ALİ AYDOĞAN',
    'ZEHRADEMİRDÖYEN': 'ZEHRA DEMİRDÖYEN',
    'CAHİT KENÇ Ö': 'CAHİT KENÇ'
  };
  if (knownFixes[name]) return knownFixes[name];
  return name;
}

export function parseSonucBelgesiBlocksClient(rawText: string) {
  if (!/SONUÇ BELGESİ/i.test(rawText)) return null;
  const blocks = rawText
    .split(/SONUÇ BELGESİ/i)
    .map(b => b.trim())
    .filter(Boolean);
  if (blocks.length === 0) return null;

  const today = new Date().toISOString().split('T')[0];
  const examTitles = new Set<string>();
  const students: any[] = [];

  for (const block of blocks) {
    const lines = block
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    if (lines.length < 5) continue;

    if (lines[0] && lines[0].length > 2 && !/BOLU|OKULU|Öğrenci/i.test(lines[0])) {
      examTitles.add(lines[0]);
    }

    const headerIdx = lines.findIndex(l => /Öğrenci\s+Numara\s+Sınıf/i.test(l));
    if (headerIdx === -1 || headerIdx + 1 >= lines.length) continue;

    const studentLine = lines[headerIdx + 1];
    const stMatch = studentLine.match(
      /^(.*?)\s+(\d+)\s+([0-9]{1,2}\s*[-/]?\s*[A-ZÇĞİÖŞÜa-zçğıöşü])\s*$/i
    );
    if (!stMatch) continue;

    const rawStudentName = stMatch[1].trim();
    const studentName = cleanOpticalStudentName(rawStudentName);
    const rawNo = stMatch[2].trim();
    const studentNo = rawNo === '0' ? '' : rawNo;
    const className = stMatch[3].replace(/\s+/g, '').toUpperCase();
    const isGrade5 = className.startsWith('5');

    let score = 0;
    let rankInClass = '';
    let rankInSchool = '';
    let rankInDistrict = '';
    let rankInProvince = '';
    let rankGeneral = '';

    const scoreLine = lines.find(l => /^(LGS|TYT|AYT|KPSS|AGS)\s+[\d,.]+/i.test(l));
    const katilimLine = lines.find(l => /^Katılımlar:/i.test(l));

    if (scoreLine) {
      const parts = scoreLine.split(/\s+/);
      if (parts[1]) score = parseFloat(parts[1].replace(',', '.')) || 0;
      const katParts = katilimLine
        ? katilimLine.replace(/^Katılımlar:\s*/i, '').split(/\s+/)
        : [];
      if (parts[3]) rankInClass = katParts[0] ? `${parts[3]} / ${katParts[0]}` : parts[3];
      if (parts[4]) rankInSchool = katParts[1] ? `${parts[4]} / ${katParts[1]}` : parts[4];
      if (parts[5]) rankInDistrict = katParts[2] ? `${parts[5]} / ${katParts[2]}` : parts[5];
      if (parts[6]) rankInProvince = katParts[3] ? `${parts[6]} / ${katParts[3]}` : parts[6];
      if (parts[7]) rankGeneral = katParts[4] ? `${parts[7]} / ${katParts[4]}` : parts[7];
    }

    const defaultMaxQ: Record<string, number> = {
      Türkçe: isGrade5 ? 15 : 20,
      'Sosyal Bilgiler': 10,
      'Din Kültürü': 10,
      İngilizce: 10,
      Matematik: isGrade5 ? 15 : 20,
      Fen: isGrade5 ? 15 : 20
    };

    const scores: Record<string, number> = {
      Türkçe: 0,
      'Sosyal Bilgiler': 0,
      'Din Kültürü': 0,
      İngilizce: 0,
      Matematik: 0,
      Fen: 0
    };

    const detailedScores: Record<string, { d: number; y: number; b: number; net: number }> = {
      Türkçe: { d: 0, y: 0, b: defaultMaxQ['Türkçe'], net: 0 },
      'Sosyal Bilgiler': { d: 0, y: 0, b: defaultMaxQ['Sosyal Bilgiler'], net: 0 },
      'Din Kültürü': { d: 0, y: 0, b: defaultMaxQ['Din Kültürü'], net: 0 },
      İngilizce: { d: 0, y: 0, b: defaultMaxQ['İngilizce'], net: 0 },
      Matematik: { d: 0, y: 0, b: defaultMaxQ['Matematik'], net: 0 },
      Fen: { d: 0, y: 0, b: defaultMaxQ['Fen'], net: 0 }
    };

    let totalNet = 0;

    for (const line of lines) {
      if (/^Toplam:/i.test(line)) {
        const tParts = line.replace(/^Toplam:\s*/i, '').split(/\s+/);
        if (tParts.length >= 4) {
          totalNet = parseFloat(tParts[3].replace(',', '.')) || 0;
        }
        break;
      }

      const subjMatch = line.match(
        /^(Türkçe|SOSYAL BİLGİLER|Tarih|Din K\.ve A\.B\.|İngilizce|Matematik|Fen)\s+(\d+)\s+(\d+)\s+(\d+)\s+([-+]?[\d,]+)\s+([-+]?\d+)/i
      );
      if (subjMatch) {
        const rawSubj = subjMatch[1];
        const soru = parseInt(subjMatch[2], 10);
        const dogru = parseInt(subjMatch[3], 10);
        const yanlis = parseInt(subjMatch[4], 10);
        const net = parseFloat(subjMatch[5].replace(',', '.')) || 0;
        const bos = Math.max(0, soru - dogru - yanlis);

        let normSubj = rawSubj;
        if (/SOSYAL|Tarih/i.test(rawSubj)) normSubj = 'Sosyal Bilgiler';
        else if (/Din/i.test(rawSubj)) normSubj = 'Din Kültürü';
        else if (/Türkçe/i.test(rawSubj)) normSubj = 'Türkçe';
        else if (/İngilizce/i.test(rawSubj)) normSubj = 'İngilizce';
        else if (/Matematik/i.test(rawSubj)) normSubj = 'Matematik';
        else if (/Fen/i.test(rawSubj)) normSubj = 'Fen';

        scores[normSubj] = net;
        detailedScores[normSubj] = { d: dogru, y: yanlis, b: bos, net };
      }
    }

    const outcomes: Array<{
      subject: string;
      outcome: string;
      totalQuestions: number;
      correct: number;
      wrong: number;
      empty: number;
      successPercent: number;
    }> = [];

    const analizIdx = lines.findIndex(l => /DERSLERE GÖRE ANALİZ/i.test(l));
    if (analizIdx !== -1) {
      let currentSubj = 'Türkçe';
      for (let i = analizIdx + 1; i < lines.length; i++) {
        const l = lines[i];
        if (/^--\s*\d+\s*of\s*\d+\s*--$/i.test(l) || /^Powered by/i.test(l)) continue;
        if (/^Sözel\s*\(TÜR\)/i.test(l) || /^Türkçe\s+S\s+D\s+Y/i.test(l)) {
          currentSubj = 'Türkçe';
          continue;
        }
        if (
          /^Sözel\s*\((?:SOS|TAR)\)/i.test(l) ||
          /^(?:SOSYAL BİLGİLER|Tarih)\s+S\s+D\s+Y/i.test(l)
        ) {
          currentSubj = 'Sosyal Bilgiler';
          continue;
        }
        if (/^Sözel\s*\(DİN\)/i.test(l) || /^Din K\.ve A\.B\.\s+S\s+D\s+Y/i.test(l)) {
          currentSubj = 'Din Kültürü';
          continue;
        }
        if (/^Sözel\s*\(İNG\)/i.test(l) || /^İngilizce\s+S\s+D\s+Y/i.test(l)) {
          currentSubj = 'İngilizce';
          continue;
        }
        if (/^Sayısal\s*\(MAT\)/i.test(l) || /^Matematik\s+S\s+D\s+Y/i.test(l)) {
          currentSubj = 'Matematik';
          continue;
        }
        if (/^Sayısal\s*\(FEN\)/i.test(l) || /^Fen\s+S\s+D\s+Y/i.test(l)) {
          currentSubj = 'Fen';
          continue;
        }

        const outMatch = l.match(/^(.*?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)$/);
        if (outMatch) {
          const outcomeText = outMatch[1].trim();
          const s = parseInt(outMatch[2], 10);
          const d = parseInt(outMatch[3], 10);
          const y = parseInt(outMatch[4], 10);
          const bPct = parseInt(outMatch[5], 10);
          outcomes.push({
            subject: currentSubj,
            outcome: outcomeText,
            totalQuestions: s,
            correct: d,
            wrong: y,
            empty: Math.max(0, s - d - y),
            successPercent: bPct
          });
        }
      }
    }

    const weakTopics = outcomes
      .filter(o => o.successPercent < 50)
      .map(o => `${o.subject}: ${o.outcome}`);

    const topicMistakesBySubject: Record<string, string[]> = {};
    outcomes
      .filter(o => o.successPercent < 50)
      .forEach(o => {
        if (!topicMistakesBySubject[o.subject]) topicMistakesBySubject[o.subject] = [];
        topicMistakesBySubject[o.subject].push(o.outcome);
      });

    students.push({
      studentName,
      rawStudentName,
      studentNo,
      className,
      totalNet,
      score,
      rankInClass,
      rankInSchool,
      rankInDistrict,
      rankInProvince,
      rankGeneral,
      scores,
      detailedScores,
      outcomes,
      weakTopics,
      topicMistakesBySubject
    });
  }

  if (students.length === 0) return null;

  const titlesArr = Array.from(examTitles);
  const examName =
    titlesArr.length === 1
      ? titlesArr[0]
      : titlesArr.length > 1
        ? 'BH Kurumsal Deneme Sınavı - SDS-1 (Tüm Sınıflar)'
        : 'Kurumsal Deneme Sınavı - SDS-1';

  return {
    examName,
    examType: 'LGS' as const,
    examDate: today,
    students
  };
}

export function parseExamTextClientFallback(rawText: string) {
  const sonucResult = parseSonucBelgesiBlocksClient(rawText);
  if (sonucResult && sonucResult.students.length > 0) {
    return sonucResult;
  }

  const lines = rawText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);
  let examName = 'Kurumsal Deneme Sınavı';
  let examType: 'LGS' | 'TYT' | 'AYT' | 'KPSS' | 'AGS' = 'LGS';
  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const l = lines[i];
    if (l.toLowerCase().includes('lgs')) {
      examType = 'LGS';
      examName = l;
      break;
    } else if (l.toLowerCase().includes('tyt') || l.toLowerCase().includes('yks')) {
      examType = 'TYT';
      examName = l;
      break;
    } else if (l.toLowerCase().includes('ayt')) {
      examType = 'AYT';
      examName = l;
      break;
    } else if (
      l.toLowerCase().includes('deneme') ||
      l.toLowerCase().includes('karne') ||
      l.toLowerCase().includes('sınav')
    ) {
      examName = l;
    }
  }

  const students: any[] = [];

  for (const line of lines) {
    const studentMatch = line.match(
      /(?:^\d+\s+)?(?:(\d{1,5})\s+)?([A-ZÇĞİÖŞÜa-zçğıöşü\s]{4,35})\s+((?:[5-9]|10|11|12)[/-]?[A-Z]|5A|6A|7A|8A|5B|6B|7B|8B)\s+(.*)/i
    );
    if (studentMatch) {
      const studentNo = studentMatch[1] || '';
      const studentName = studentMatch[2].trim();
      const className = studentMatch[3].toUpperCase().replace('/', '').replace('-', '');
      const rest = studentMatch[4].trim();

      const numbers = (rest.match(/[-+]?[0-9]*\.?[0-9]+/g) || []).map(n => parseFloat(n));
      if (numbers.length >= 2) {
        let totalNet = 0;
        let score = 0;
        const scores: Record<string, number> = {};

        if (examType === 'LGS') {
          const subNames = [
            'Türkçe',
            'Matematik',
            'Fen',
            'Sosyal Bilgiler',
            'İngilizce',
            'Din Kültürü'
          ];
          subNames.forEach((sName, idx) => {
            if (idx < numbers.length) {
              scores[sName] = Math.max(0, numbers[idx]);
            }
          });
          totalNet =
            numbers[numbers.length - 2] || Object.values(scores).reduce((a, b) => a + b, 0);
          score = numbers[numbers.length - 1] || 0;
        } else {
          const subNames = ['Türkçe', 'Sosyal Bilgiler', 'Temel Matematik', 'Fen Bilimleri'];
          subNames.forEach((sName, idx) => {
            if (idx < numbers.length) {
              scores[sName] = Math.max(0, numbers[idx]);
            }
          });
          totalNet =
            numbers[numbers.length - 1] || Object.values(scores).reduce((a, b) => a + b, 0);
        }

        students.push({
          studentName,
          className,
          studentNo,
          totalNet: Math.round(totalNet * 100) / 100,
          score: Math.round(score * 100) / 100,
          scores,
          detailedScores: {},
          weakTopics: []
        });
      }
    }
  }

  return {
    examName,
    examType,
    examDate: today,
    students
  };
}
