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

const firebaseConfig = {
    // REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO FIREBASE
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Reemplazar
    authDomain: "tu-proyecto.firebaseapp.com", // Reemplazar
    projectId: "tu-proyecto-id", // Reemplazar
    storageBucket: "tu-proyecto.appspot.com", // Reemplazar
    messagingSenderId: "123456789012", // Reemplazar
    appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxx" // Reemplazar
};

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

