import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const apiCode = `
// Makale Okulu APIs
app.post("/api/semantic-match", async (req, res) => {
  try {
    const { studentAnswer, idealAnswer } = req.body;
    const prompt = \`Sen bir öğretmensin. Öğrenci: "\${studentAnswer}", İdeal: "\${idealAnswer}". Benzerliğe göre JSON dön: {"score": 85, "isAcceptable": true, "feedback": "Güzel ancak şurası eksik."}\`;
    const response = await ai.models.generateContent({ model: "gemini-2.5-pro", contents: prompt, config: { responseMimeType: "application/json" } });
    res.json(JSON.parse(response.text));
  } catch (e) {
    res.status(500).json({error: "Failed"});
  }
});

app.post("/api/parse-question", upload.single("file"), async (req, res) => {
  try {
    const prompt = \`Soruyu ve şıkları analiz et. Çeldirici türlerini belirle. JSON dön: {"questionText": "...", "questionStem": "...", "options": [{"letter": "A", "text": "...", "type": "Kapsam Aşımı"}]}\`;
    const response = await ai.models.generateContent({ model: "gemini-2.5-pro", contents: prompt, config: { responseMimeType: "application/json" } });
    res.json(JSON.parse(response.text));
  } catch (e) {
    res.status(500).json({error: "Failed"});
  }
});

  // Vite middleware for development
`;

content = content.replace('  // Vite middleware for development', apiCode);
fs.writeFileSync('server.ts', content);
