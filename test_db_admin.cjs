const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function run() {
    const snap = await db.collection('research_chats').get();
    if (snap.empty) {
        console.log("No research_chats documents.");
    }
    snap.forEach(doc => {
        console.log("DOC:", doc.id, "keys:", Object.keys(doc.data()));
        if (doc.data().savedResearches) {
            console.log("Saved count:", doc.data().savedResearches.length);
        }
    });
}
run();
