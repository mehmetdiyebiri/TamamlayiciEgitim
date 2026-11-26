import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import multer from "multer";
import * as pdfParseModule from "pdf-parse";
import * as mammothModule from "mammoth";
const PDFParse = (pdfParseModule as any).PDFParse;
const mammoth = (mammothModule as any).default || mammothModule;

const app = express();
const PORT = 3000;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024, fieldSize: 50 * 1024 * 1024 }
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateContentWithRetry(aiClient, params, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await aiClient.models.generateContent(params);
    } catch (error) {
      if (i === retries - 1) throw error;
      if (error?.status === 503 || String(error?.message).includes('503') || String(error?.message).includes('UNAVAILABLE') || String(error?.message).includes('high demand')) {
        console.warn(`Model 503 on attempt ${i + 1}. Retrying in ${delayMs * (i + 1)}ms...`);
        await new Promise(res => setTimeout(res, delayMs * (i + 1)));
      } else {
        throw error;
      }
    }
  }
}


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.post("/api/parse-bep", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { mimetype, buffer } = req.file;
    if (mimetype !== "application/pdf" && mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        return res.status(400).json({ error: "Only PDF or DOCX files are supported." });
    }

    let documentText = "";
    if (mimetype === "application/pdf") {
      const parser = new PDFParse({ data: buffer });
      const pdfData = await parser.getText();
      documentText = pdfData.text;
    } else {
      const result = await mammoth.extractRawText({ buffer: buffer });
      documentText = result.value;
    }

    const prompt = `Lütfen aşağıda metni verilen bu BEP (Bireyselleştirilmiş Eğitim Programı) dosyasını incele ve aşağıdaki alanları çıkararak JSON formatında dön.
    Bulamadığın veya dosya içinde olmayan alanlar için boş string ("") kullan.

    Tarihleri her zaman "YYYY-MM-DD" formatında dön. Kısa dönemli amaçların "dates" alanı için belgedeki başlangıç ve bitiş tarihlerini ayrıştırarak her zaman "YYYY-MM-DD|YYYY-MM-DD" (Örn: "2026-09-01|2026-11-13") formatında dön. Eğer tarihte "Eylül" gibi sadece ay verilmişse o ayın başını (01) veya sonunu varsay.
    İstenilen JSON yapısı:
    {
      "studentInfo": {
        "birthDate": "Doğum Tarihi",
        "boardDecision": "Kurul Kararı",
        "diagnosis": "Tanısı",
        "supportEd": "Alacağı Destek Eğitim",
        "supportEdOutside": "Okul Dışında Aldığı Destek Eğitim",
        "materials": "Eğitim Materyalleri",
        "healthInfo": "Sağlık Bilgisi",
        "environment": "Eğitim Ortamı",
        "bepStart": "BEP Başlangıç Tarihi",
        "bepEnd": "BEP Bitiş Tarihi"
      },
      "familyInfo": {
        "mother": { "name": "", "phone": "", "address": "", "work": "" },
        "father": { "name": "", "phone": "", "address": "", "work": "" },
        "guardian": { "name": "", "phone": "", "address": "", "work": "" }
      },
      "perfInfo": {
        "history": "Öğrencinin geçmiş eğitim bilgileri ve performansı",
        "behaviorProblem": "Davranış Problemi Var mı?",
        "performances": [
          { "subject": "Ders/Alan Adı", "level": "Öğrencinin performans düzeyi" }
        ]
      },
      "goals": [
        {
          "subject": "Ders veya Gelişim Alanı",
          "envArrangements": "Eğitim ortamı düzenlemeleri",
          "longTermGoals": [
            {
              "title": "Uzun Dönemli Amaç",
              "shortTermGoals": [
                {
                  "title": "Kısa Dönemli Amaç",
                  "criteria": "Ölçüt (örn: 3/4, %80)",
                  "method": "Öğretim Yöntem ve Teknikleri",
                  "materials": "Kullanılacak Materyaller",
                  "dates": "Öngörülen Başlangıç ve Bitiş Tarihleri (mutlaka YYYY-MM-DD|YYYY-MM-DD formatında, ayraç olarak dik çizgi kullan)",
                  "evalMethod": "Değerlendirme Yöntemi",
                  "evalDates": "Değerlendirme Tarihleri"
                }
              ]
            }
          ]
        }
      ],
      "unitInfo": {
         "familyInfoFreq": "Aile Bilgilendirme Sıklığı",
         "familyInfoMethod": "Aile Bilgilendirme Yöntemi",
         "otherDecisions": "Diğer Kararlar",
         "generalEval": "Genel Değerlendirme"
      }
    }
    `;

    const fullPrompt = prompt + "\n\n--- DOKÜMAN METNİ ---\n\n" + documentText;
    
    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
      }
    });

        let text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    res.json({ data: JSON.parse(text) });

  } catch (error: any) {
    console.error("Parse BEP Error:", error);
    res.status(500).json({ error: error.message || "Failed to parse document" });
  }
});


app.post("/api/research-chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }
    const contents = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: "Sen, öğrencilerin araştırma yapmasına ve öğrenmesine yardımcı olan zeki ve destekleyici bir eğitim asistanısın. Açıklayıcı ve merak uyandırıcı cevaplar ver.",
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Research Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});


app.post("/api/generate-title", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }
    
    // We only care about the user messages to generate a title
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.text).join(' - ');
    
    const prompt = `Aşağıdaki mesaj geçmişine bakarak bu araştırma konusu için en fazla 4-5 kelimelik, kısa, öz ve ilgi çekici bir başlık öner. Sadece başlığı metin olarak dön, tırnak işareti kullanma:\n\n${userMessages}`;

    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let title = response.text || "İsimsiz Araştırma";
    title = title.replace(/["']/g, '').trim();

    res.json({ title });
  } catch (error: any) {
    console.error("Generate Title Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate title" });
  }
});

app.post("/api/summarize-research", async (req, res) => {
  try {
    const { history, savedResearchTitles } = req.body;
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: "Invalid history array" });
    }
    
    let prompt = `Öğrencinin yapay zeka asistanı ile yaptığı araştırma geçmişi ve kaydettiği araştırma başlıkları aşağıdadır. 
Bu bilgileri derleyerek, öğrencinin ilgi alanları, öğrenme stili ve güçlü/zayıf yönleri hakkında fikir edin ve öğretmene rehberlik yapması için somut, pratik öneriler sun.
Lütfen profesyonel bir eğitimci diliyle yanıt ver.`;

    if (savedResearchTitles && savedResearchTitles.length > 0) {
       prompt += `\n\nÖğrencinin Kaydettiği Araştırma Başlıkları:\n- ${savedResearchTitles.join('\n- ')}`;
    }

    prompt += `\n\nSon Araştırma Sohbet Geçmişi:\n${history.map((m) => `${m.role === 'user' ? 'Öğrenci' : 'Asistan'}: ${m.text}`).join('\n')}`;
    
    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.6-flash",
      contents: prompt,
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Summarize Research Error:", error);
    res.status(500).json({ error: error.message || "Failed to summarize research" });
  }
});


app.post("/api/generate-math-questions", async (req, res) => {
  try {
    const { grade, topic, count, difficulty } = req.body;
    
    const prompt = `Sen uzman bir matematik öğretmenisin. Lütfen ${grade}. sınıf seviyesinde, "${topic}" konusuyla ilgili ${count} adet ${difficulty} zorluk seviyesinde özgün çoktan seçmeli matematik sorusu üret. 
    Kesinlikle birbirini tekrar eden, sadece sayıları değiştirilmiş şablon sorular ÜRETMEYİN. 
    LGS tarzı Yeni Nesil sorular, gerçek hayat problemleri, görsel betimlemeli analiz soruları ve mantıksal çıkarım gerektiren çeşitli formatlarda sorular kurgulayın. Sorular birbirinden yapısal ve hikaye olarak tamamen farklı olmalıdır.
    Format olarak sadece geçerli bir JSON array dön. Başka hiçbir açıklama yazma.
    JSON Formatı:
    [
      {
        "q": "Soru metni",
        "options": ["A seçeneği", "B seçeneği", "C seçeneği", "D seçeneği"],
        "ans": "Doğru seçeneğin tam metni (options içindekiyle birebir aynı)",
        "hint": "Öğrenciye ipucu",
        "explanation": "Çözüm açıklaması"
      }
    ]
    `;

    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let text = response.text || "[]";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    res.json({ questions: JSON.parse(text) });
  } catch (error) {
    console.error("Generate Math Questions Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate questions" });
  }
});

// Clean optical-form name quirks (e.g., "Ö M E R Ö N D E R", "RUMEYSADOĞRU", "EMİR EKRE MAKGÜN")
function cleanOpticalStudentName(rawName: string): string {
  let name = (rawName || "").trim();
  // Spaced single letters: "Ö M E R Ö N D E R"
  if (/^(?:[A-ZÇĞİÖŞÜ]\s+){3,}[A-ZÇĞİÖŞÜ]$/i.test(name)) {
    name = name.replace(/\s+/g, "");
    if (name === "ÖMERÖNDER") return "ÖMER ÖNDER";
  }
  const knownFixes: Record<string, string> = {
    "RUMEYSADOĞRU": "RUMEYSA DOĞRU",
    "EMİNEAYŞE AY": "EMİNE AYŞE AY",
    "BURAK BAYRAKDAROĞUU": "BURAK BAYRAKDAROĞLU",
    "ELİF TUÇDO AN": "ELİF TUÇDOĞAN",
    "ŞEYMA GÜN DÜZ": "ŞEYMA GÜNDÜZ",
    "AYT* İSLEK": "AYTUĞ İŞLEK",
    "EMİR EKRE MAKGÜN": "EMİR EKREM AKGÜN",
    "FATMAZEHRA ÜNLÜUYSAL": "FATMA ZEHRA ÜNLÜUYSAL",
    "MANSURİRGAV": "MANSUR İRGAV",
    "MUSTAFAAYKUT CANSIZ": "MUSTAFA AYKUT CANSIZ",
    "ERTUĞRULERSÖZ": "ERTUĞRUL ERSÖZ",
    "SA E ŞEYMA ÜNLÜUYSAL": "SARE ŞEYMA ÜNLÜUYSAL",
    "P*NAR KAR BCAK": "PINAR KARABACAK",
    "YUSUFALİAYDOĞAN": "YUSUF ALİ AYDOĞAN",
    "ZEHRADEMİRDÖYEN": "ZEHRA DEMİRDÖYEN",
    "CAHİT KENÇ Ö": "CAHİT KENÇ"
  };
  if (knownFixes[name]) return knownFixes[name];
  return name;
}

// Deterministic parser for multi-page or single-page "SONUÇ BELGESİ" + "DERSLERE GÖRE ANALİZ" PDFs
function parseSonucBelgesiBlocks(rawText: string) {
  if (!/SONUÇ BELGESİ/i.test(rawText)) return null;
  const blocks = rawText.split(/SONUÇ BELGESİ/i).map(b => b.trim()).filter(Boolean);
  if (blocks.length === 0) return null;

  const today = new Date().toISOString().split('T')[0];
  const examTitles = new Set<string>();
  const students: any[] = [];

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 5) continue;

    if (lines[0] && lines[0].length > 2 && !/BOLU|OKULU|Öğrenci/i.test(lines[0])) {
      examTitles.add(lines[0]);
    }

    const headerIdx = lines.findIndex(l => /Öğrenci\s+Numara\s+Sınıf/i.test(l));
    if (headerIdx === -1 || headerIdx + 1 >= lines.length) continue;

    const studentLine = lines[headerIdx + 1];
    const stMatch = studentLine.match(/^(.*?)\s+(\d+)\s+([0-9]{1,2}\s*[-/]?\s*[A-ZÇĞİÖŞÜa-zçğıöşü])\s*$/i);
    if (!stMatch) continue;

    const rawStudentName = stMatch[1].trim();
    const studentName = cleanOpticalStudentName(rawStudentName);
    const rawNo = stMatch[2].trim();
    const studentNo = rawNo === "0" ? "" : rawNo;
    const className = stMatch[3].replace(/\s+/g, "").toUpperCase();
    const isGrade5 = className.startsWith("5");

    let score = 0;
    let rankInClass = "";
    let rankInSchool = "";
    let rankInDistrict = "";
    let rankInProvince = "";
    let rankGeneral = "";

    const scoreLine = lines.find(l => /^(LGS|TYT|AYT|KPSS|AGS)\s+[\d,.]+/i.test(l));
    const katilimLine = lines.find(l => /^Katılımlar:/i.test(l));

    if (scoreLine) {
      const parts = scoreLine.split(/\s+/);
      if (parts[1]) score = parseFloat(parts[1].replace(",", ".")) || 0;
      const katParts = katilimLine ? katilimLine.replace(/^Katılımlar:\s*/i, "").split(/\s+/) : [];
      if (parts[3]) rankInClass = katParts[0] ? `${parts[3]} / ${katParts[0]}` : parts[3];
      if (parts[4]) rankInSchool = katParts[1] ? `${parts[4]} / ${katParts[1]}` : parts[4];
      if (parts[5]) rankInDistrict = katParts[2] ? `${parts[5]} / ${katParts[2]}` : parts[5];
      if (parts[6]) rankInProvince = katParts[3] ? `${parts[6]} / ${katParts[3]}` : parts[6];
      if (parts[7]) rankGeneral = katParts[4] ? `${parts[7]} / ${katParts[4]}` : parts[7];
    }

    const defaultMaxQ: Record<string, number> = {
      "Türkçe": isGrade5 ? 15 : 20,
      "Sosyal Bilgiler": 10,
      "Din Kültürü": 10,
      "İngilizce": 10,
      "Matematik": isGrade5 ? 15 : 20,
      "Fen": isGrade5 ? 15 : 20
    };

    const scores: Record<string, number> = {
      "Türkçe": 0,
      "Sosyal Bilgiler": 0,
      "Din Kültürü": 0,
      "İngilizce": 0,
      "Matematik": 0,
      "Fen": 0
    };

    const detailedScores: Record<string, { d: number; y: number; b: number; net: number }> = {
      "Türkçe": { d: 0, y: 0, b: defaultMaxQ["Türkçe"], net: 0 },
      "Sosyal Bilgiler": { d: 0, y: 0, b: defaultMaxQ["Sosyal Bilgiler"], net: 0 },
      "Din Kültürü": { d: 0, y: 0, b: defaultMaxQ["Din Kültürü"], net: 0 },
      "İngilizce": { d: 0, y: 0, b: defaultMaxQ["İngilizce"], net: 0 },
      "Matematik": { d: 0, y: 0, b: defaultMaxQ["Matematik"], net: 0 },
      "Fen": { d: 0, y: 0, b: defaultMaxQ["Fen"], net: 0 }
    };

    let totalNet = 0;

    for (const line of lines) {
      if (/^Toplam:/i.test(line)) {
        const tParts = line.replace(/^Toplam:\s*/i, "").split(/\s+/);
        if (tParts.length >= 4) {
          totalNet = parseFloat(tParts[3].replace(",", ".")) || 0;
        }
        break;
      }

      const subjMatch = line.match(/^(Türkçe|SOSYAL BİLGİLER|Tarih|Din K\.ve A\.B\.|İngilizce|Matematik|Fen)\s+(\d+)\s+(\d+)\s+(\d+)\s+([-+]?[\d,]+)\s+([-+]?\d+)/i);
      if (subjMatch) {
        const rawSubj = subjMatch[1];
        const soru = parseInt(subjMatch[2], 10);
        const dogru = parseInt(subjMatch[3], 10);
        const yanlis = parseInt(subjMatch[4], 10);
        const net = parseFloat(subjMatch[5].replace(",", ".")) || 0;
        const bos = Math.max(0, soru - dogru - yanlis);

        let normSubj = rawSubj;
        if (/SOSYAL|Tarih/i.test(rawSubj)) normSubj = "Sosyal Bilgiler";
        else if (/Din/i.test(rawSubj)) normSubj = "Din Kültürü";
        else if (/Türkçe/i.test(rawSubj)) normSubj = "Türkçe";
        else if (/İngilizce/i.test(rawSubj)) normSubj = "İngilizce";
        else if (/Matematik/i.test(rawSubj)) normSubj = "Matematik";
        else if (/Fen/i.test(rawSubj)) normSubj = "Fen";

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
      let currentSubj = "Türkçe";
      for (let i = analizIdx + 1; i < lines.length; i++) {
        const l = lines[i];
        if (/^--\s*\d+\s*of\s*\d+\s*--$/i.test(l) || /^Powered by/i.test(l)) continue;
        if (/^Sözel\s*\(TÜR\)/i.test(l) || /^Türkçe\s+S\s+D\s+Y/i.test(l)) { currentSubj = "Türkçe"; continue; }
        if (/^Sözel\s*\((?:SOS|TAR)\)/i.test(l) || /^(?:SOSYAL BİLGİLER|Tarih)\s+S\s+D\s+Y/i.test(l)) { currentSubj = "Sosyal Bilgiler"; continue; }
        if (/^Sözel\s*\(DİN\)/i.test(l) || /^Din K\.ve A\.B\.\s+S\s+D\s+Y/i.test(l)) { currentSubj = "Din Kültürü"; continue; }
        if (/^Sözel\s*\(İNG\)/i.test(l) || /^İngilizce\s+S\s+D\s+Y/i.test(l)) { currentSubj = "İngilizce"; continue; }
        if (/^Sayısal\s*\(MAT\)/i.test(l) || /^Matematik\s+S\s+D\s+Y/i.test(l)) { currentSubj = "Matematik"; continue; }
        if (/^Sayısal\s*\(FEN\)/i.test(l) || /^Fen\s+S\s+D\s+Y/i.test(l)) { currentSubj = "Fen"; continue; }

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
    outcomes.filter(o => o.successPercent < 50).forEach(o => {
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
  const examName = titlesArr.length === 1
    ? titlesArr[0]
    : titlesArr.length > 1
      ? "BH Kurumsal Deneme Sınavı - SDS-1 (Tüm Sınıflar)"
      : "Kurumsal Deneme Sınavı - SDS-1";

  return {
    examName,
    examType: "LGS" as const,
    examDate: today,
    students
  };
}

// Fallback rule-based parser for common Turkish mock exam reports / tables
function parseExamTextFallback(rawText: string) {
  const sonucResult = parseSonucBelgesiBlocks(rawText);
  if (sonucResult && sonucResult.students.length > 0) {
    return sonucResult;
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  let examName = "Kurumsal Deneme Sınavı";
  let examType: 'LGS' | 'TYT' | 'AYT' | 'KPSS' | 'AGS' = 'LGS';
  const today = new Date().toISOString().split('T')[0];

  // Try to find exam name in first 10 lines
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
    } else if (l.toLowerCase().includes('deneme') || l.toLowerCase().includes('karne') || l.toLowerCase().includes('sınav')) {
      examName = l;
    }
  }

  const students: any[] = [];
  
  // Look for lines that look like a student record: e.g. "1 45 HAMZA ÖZMEN 5A 18 2 17.33 ..."
  for (const line of lines) {
    const studentMatch = line.match(/(?:^\d+\s+)?(?:(\d{1,5})\s+)?([A-ZÇĞİÖŞÜa-zçğıöşü\s]{4,35})\s+((?:[5-9]|10|11|12)[\/-]?[A-Z]|5A|6A|7A|8A|5B|6B|7B|8B)\s+(.*)/i);
    if (studentMatch) {
      const studentNo = studentMatch[1] || "";
      const studentName = studentMatch[2].trim();
      const className = studentMatch[3].toUpperCase().replace('/', '').replace('-', '');
      const rest = studentMatch[4].trim();

      const numbers = (rest.match(/[-+]?[0-9]*\.?[0-9]+/g) || []).map(n => parseFloat(n));
      if (numbers.length >= 2) {
        let totalNet = 0;
        let score = 0;
        const scores: Record<string, number> = {};

        if (examType === 'LGS') {
          const subNames = ['Türkçe', 'Matematik', 'Fen Bilimleri', 'İnkılap Tarihi', 'İngilizce', 'Din Kültürü'];
          subNames.forEach((sName, idx) => {
            if (idx < numbers.length) {
              scores[sName] = Math.max(0, numbers[idx]);
            }
          });
          totalNet = numbers[numbers.length - 2] || Object.values(scores).reduce((a, b) => a + b, 0);
          score = numbers[numbers.length - 1] || 0;
        } else {
          const subNames = ['Türkçe', 'Sosyal Bilgiler', 'Temel Matematik', 'Fen Bilimleri'];
          subNames.forEach((sName, idx) => {
            if (idx < numbers.length) {
              scores[sName] = Math.max(0, numbers[idx]);
            }
          });
          totalNet = numbers[numbers.length - 1] || Object.values(scores).reduce((a, b) => a + b, 0);
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

app.post("/api/parse-exam-pdf", upload.single("file"), async (req, res) => {
  try {
    let documentText = "";
    
    if (req.file) {
      const { mimetype, buffer } = req.file;
      if (mimetype === "application/pdf" || req.file.originalname?.toLowerCase().endsWith(".pdf")) {
        const parser = new PDFParse({ data: buffer });
        const pdfData = await parser.getText();
        documentText = pdfData.text || "";
      } else {
        documentText = buffer.toString("utf-8");
      }
    } else if (req.body && req.body.text) {
      documentText = req.body.text;
    } else {
      return res.status(400).json({ error: "Lütfen bir PDF dosyası yükleyin veya metin girin." });
    }

    if (!documentText.trim()) {
      return res.status(400).json({ error: "PDF dosyasından metin okunamadı." });
    }

    const requestedMode = req.body?.mode || 'okul';

    // 1. First check if the document is a structured multi-page or single-page SONUÇ BELGESİ
    // This handles 1 to 500+ students with full DERSLERE GÖRE ANALİZ outcomes in milliseconds without token limits
    const structuredResult = parseSonucBelgesiBlocks(documentText);
    if (structuredResult && structuredResult.students.length > 0) {
      return res.json({
        success: true,
        mode: requestedMode,
        ...structuredResult,
        rawPreview: documentText.slice(0, 300)
      });
    }

    // 2. Otherwise use Gemini AI for unstructured/other publisher formats
    try {
      const prompt = `Aşağıda Türkiye'deki bir okulda veya kurumda uygulanan deneme sınavına ait sonuç belgesi metni (Karne, Sınıf Karnesi, Okul Sıralı Deneme Listesi veya Öğrenci Bireysel Sonuç Belgesi) yer almaktadır.
Lütfen bu metindeki sınav bilgilerini ve her bir öğrencinin ders ders sınav netlerini eksiksiz çıkararak geçerli bir JSON nesnesi olarak döndür.

Kurallar:
1. "examName": Sınavın tam adı (Örn: "8. Sınıf Kurumsal LGS Deneme Sınavı 1", "Özdebir Türkiye Geneli LGS-1", "Kazanım Değerlendirme Sınavı 2"). Bulunamazsa "Genel Deneme Sınavı" yaz.
2. "examType": Sadece şunlardan biri olabilir: "LGS", "TYT", "AYT", "KPSS", "AGS". (5, 6, 7, 8. sınıflar için LGS seç).
3. "examDate": Belgede belirtilen sınav tarihi "YYYY-MM-DD" formatında. Bulunamazsa "${new Date().toISOString().split('T')[0]}".
4. "students": Belgedeki tüm öğrencilerin listesi (dizi). Her öğrenci için:
   - "studentName": Öğrencinin adı ve soyadı (BÜYÜK HARFLE ve Türkçe karakterlerle, örn: "ALİ KAAN TERLİ", "HAMZA ÖZMEN", "EMİR EKREM AKGÜN").
   - "className": Sınıfı (Örn: "6A", "6-A", "8A", "5B").
   - "studentNo": Varsa okul numarası (örn: "39"), yoksa "".
   - "totalNet": Toplam net sayısı (ondalıklı sayı, örn: 28.67).
   - "score": Sınav puanı (varsa ondalıklı sayı örn: 281.508, yoksa 0).
   - "rankInClass": Sınıf sırası (varsa örn: "7 / 13", yoksa "").
   - "rankInSchool": Kurum/Okul sırası (varsa örn: "10 / 22", yoksa "").
   - "rankInDistrict": İlçe sırası (varsa örn: "10 / 22", yoksa "").
   - "rankInProvince": İl sırası (varsa örn: "51 / 105", yoksa "").
   - "rankGeneral": Genel derece (varsa örn: "2698 / 5383", yoksa "").
   - "scores": Her dersin netini içeren nesne. Ders isimleri standart olmalı:
     LGS için standart isimler: "Türkçe", "Matematik", "Fen", "Sosyal Bilgiler", "İngilizce", "Din Kültürü" (veya "Din K.ve A.B.").
     TYT için standart isimler: "Türkçe", "Temel Matematik", "Fen Bilimleri", "Sosyal Bilgiler".
     AYT için: "Matematik", "Fizik", "Kimya", "Biyoloji", "Edebiyat", "Tarih-1", "Coğrafya-1".
     Değerler sadece net sayısıdır (ondalıklı sayı örn: 10.67, 6.00, 7.33, 0.33, 0.00, 4.33).
   - "detailedScores": Ders bazında Soru, Doğru, Yanlış ve Net detayları (varsa):
     { "Türkçe": { "d": 13, "y": 7, "net": 10.67 }, "Matematik": { "d": 2, "y": 6, "net": 0.00 }, ... }
   - "outcomes": Belgede "DERSLERE GÖRE ANALİZ" veya kazanım analiz tablosu varsa, her bir kazanımın S (Soru Sayısı), D (Doğru), Y (Yanlış) ve B% (Başarı Yüzdesi) bilgilerini içeren dizi:
     [
       {
         "subject": "Türkçe",
         "outcome": "Metnin yüzey anlamını belirleyebilme",
         "totalQuestions": 7,
         "correct": 3,
         "wrong": 4,
         "successPercent": 43
       }
     ]
   - "weakTopics": Yanlış yapılan kazanım veya konu başlıkları dizisi (özellikle başarı yüzdesi <%50 olan kazanım başlıkları).

Yalnızca geçerli JSON formatında yanıt ver. Markdown tırnakları (\`\`\`json) kullanabilirsin.

DOKÜMAN METNİ:
${documentText.slice(0, 45000)}
`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      let text = response.text || "{}";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }

      const parsedData = JSON.parse(text);
      if (parsedData && Array.isArray(parsedData.students) && parsedData.students.length > 0) {
        return res.json({
          success: true,
          mode: requestedMode,
          examName: parsedData.examName || "Kurumsal Deneme Sınavı",
          examType: parsedData.examType || "LGS",
          examDate: parsedData.examDate || new Date().toISOString().split('T')[0],
          students: parsedData.students,
          rawPreview: documentText.slice(0, 300)
        });
      }
    } catch (aiErr) {
      console.warn("AI parse failed, switching to regex fallback:", aiErr);
    }

    // Fallback rule-based parsing
    const fallbackResult = parseExamTextFallback(documentText);
    return res.json({
      success: true,
      mode: requestedMode,
      ...fallbackResult,
      isFallback: true,
      rawPreview: documentText.slice(0, 300)
    });

  } catch (error: any) {
    console.error("Parse Exam PDF Error:", error);
    res.status(500).json({ error: error.message || "PDF belgesi ayrıştırılırken bir hata oluştu." });
  }
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
