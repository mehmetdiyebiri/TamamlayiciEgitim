import fs from 'fs';
const text = fs.readFileSync('src/data/questions.ts', 'utf8');
const topics = new Set();
let match;
const regex = /"topic":\s*"([^"]+)"/g;
while ((match = regex.exec(text)) !== null) {
    topics.add(match[1]);
}
console.log(Array.from(topics));
