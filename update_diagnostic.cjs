const fs = require('fs');
const file = 'src/components/mit/views/DiagnosticView.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `    const diagnosticQuestions = useMemo(() => {
        const getQuestionsForGrade = (grade) => {
            const gradeQ = QUESTIONS[grade] || [];
            return [...gradeQ].sort(() => 0.5 - Math.random()).slice(0, 5);
        };
        
        const selected = [
            ...getQuestionsForGrade(5),
            ...getQuestionsForGrade(6),
            ...getQuestionsForGrade(7),
            ...getQuestionsForGrade(8)
        ];
        
        return selected;
    }, []);`;

content = content.replace(/const allQuestions = useMemo\(\(\) => \{[\s\S]*?\}, \[allQuestions\]\);/, replacement);

fs.writeFileSync(file, content);
