// Configuración de Firebase
// SIGUE ESTOS PASOS PARA CONFIGURAR:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto llamado "propuesta-romantica" (o el nombre que quieras)
// 3. En la página del proyecto, haz clic en el ícono </> (Web)
// 4. Registra tu app web (puedes llamarla "web-app")
// 5. Copia la configuración firebaseConfig que te aparece
// 6. Reemplaza el objeto firebaseConfig abajo con el tuyo
// 7. Habilita Firestore Database (modo producción)
// 8. Configura las reglas de Firestore (ver INSTRUCCIONES_FIREBASE.md)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA54aWjTfcXjXcYNLCAJAy3ShwzILdzpco",
    authDomain: "propuesta-indecente.firebaseapp.com",
    projectId: "propuesta-indecente",
    storageBucket: "propuesta-indecente.firebasestorage.app",
    messagingSenderId: "1090753880579",
    appId: "1:1090753880579:web:5776558d0038231216a436",
    measurementId: "G-C55VV6QJZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado correctamente');

    // Referencias a servicios
    window.db = firebase.firestore();
    window.storage = firebase.storage();

    console.log('✅ Firestore y Storage listos');
} catch (error) {
    console.error('❌ Error al inicializar Firebase:', error);
    console.log('⚠️ Recuerda configurar tu firebaseConfig en firebase-config.js');
}

