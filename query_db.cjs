import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "ai-studio-15b9e745-84de-4744-8000-4027af82046f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    const snap = await getDocs(collection(db, 'users_188'));
    console.log("users_188:");
    snap.forEach(d => console.log(d.id, d.data()));

    const snap2 = await getDocs(collection(db, 'research_chats'));
    console.log("research_chats:");
    snap2.forEach(d => console.log(d.id, Object.keys(d.data())));
}
run();
