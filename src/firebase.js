import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let config = {
    
        apiKey: "AIzaSyDMZ_gddOVcUq9qS1Etvw_e-naOUNA3O5M",
        authDomain: "historyipark.firebaseapp.com",
        projectId: "historyipark",
        storageBucket: "historyipark.firebasestorage.app",
        messagingSenderId: "254765141982",
        appId: "1:254765141982:web:e1e0f6d733eb488e49574f",
        measurementId: "G-0PBLLRM7GP"  
};

const firebaseApp = initializeApp(config);

export const firestore = getFirestore(firebaseApp);