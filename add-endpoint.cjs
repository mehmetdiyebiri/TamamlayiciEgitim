const fs = require('fs');
const file = 'server.ts';
let content = fs.readFileSync(file, 'utf8');

const newEndpoint = `
app.post("/api/generate-math-questions", async (req, res) => {
  try {
    const { grade, topic, count, difficulty } = req.body;
    
    const prompt = \`Sen uzman bir matematik öğretmenisin. Lütfen \${grade}. sınıf seviyesinde, "\${topic}" konusuyla ilgili \${count} adet \${difficulty} zorluk seviyesinde özgün çoktan seçmeli matematik sorusu üret. 
    Sorular birbirine benzememeli, konunun farklı yönlerini ve farklı örneklerini içermelidir (örneğin hepsi aynı tarz denklem veya aynı tarz işlem olmasın).
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
    \`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let text = response.text || "[]";
    const jsonMatch = text.match(/\\[[\\s\\S]*\\]/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    res.json({ questions: JSON.parse(text) });
  } catch (error) {
    console.error("Generate Math Questions Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate questions" });
  }
});

`;

content = content.replace('async function startServer()', newEndpoint + '\nasync function startServer()');
fs.writeFileSync(file, content);
