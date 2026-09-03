import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "ai-studio-15b9e745-84de-4744-8000-4027af82046f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    console.log("Checking db...");
    try {
        const snap = await getDocs(collection(db, 'users'));
        console.log("users:");
        snap.forEach(d => console.log(d.id, d.data().name, d.data().username));

        const snap2 = await getDocs(collection(db, 'research_chats'));
        console.log("research_chats:");
        snap2.forEach(d => console.log(d.id, Object.keys(d.data()), d.data().savedResearches?.length || 0));
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
run();
