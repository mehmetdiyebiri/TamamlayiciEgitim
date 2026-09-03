const fs = require('fs');
const file = 'src/components/StudentHizliOkumaPanel.tsx';
let content = fs.readFileSync(file, 'utf-8');

// The active tab state and setter needs to be passed to actions for AICoach to use it.
const searchStr = `export const StudentHizliOkumaPanel = ({ state, actions }: any) => {
    const { currentUser } = state;
    const [activeTab, setActiveTab] = useState('dashboard');`;

const newStr = `export const StudentHizliOkumaPanel = ({ state, actions }: any) => {
    const { currentUser } = state;
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Enrich actions with setActiveTab so subcomponents can navigate
    const enrichedActions = {
        ...actions,
        setActiveTab
    };`;

content = content.replace(searchStr, newStr);

// We must also update where actions is passed
content = content.replace(/actions=\{actions\}/g, "actions={enrichedActions}");

fs.writeFileSync(file, content);
console.log('Patched StudentHizliOkumaPanel');
