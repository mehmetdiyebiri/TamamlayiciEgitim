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
const upload = multer({ storage: multer.memoryStorage() });

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


app.use(express.json());

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
