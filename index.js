require('dotenv');

const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./permissions.json");
const data = require('./assets/employers/employers.json');
const collectionKey = 'employers'; 
//name of the collection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => { 
        firestore.collection(collectionKey).doc(data[docKey].id).set(data[docKey]).then((res) => {  
            console.log("Document " + docKey + " successfully written!");}).catch((error) => {   
            console.error("Error writing document: ", error);
        });
    });
}
