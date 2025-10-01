// Configuración de Firebase para "propuesta-indecente"
// Usando Firebase JavaScript SDK v10 (compat mode)

const firebaseConfig = {
    apiKey: "AIzaSyA54aWjTfcXjXcYNLCAJAy3ShwzILdzpco",
    authDomain: "propuesta-indecente.firebaseapp.com",
    projectId: "propuesta-indecente",
    storageBucket: "propuesta-indecente.firebasestorage.app",
    messagingSenderId: "1090753880579",
    appId: "1:1090753880579:web:5776558d0038231216a436",
    measurementId: "G-C55VV6QJZ5"
};

// Inicializar Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado correctamente');
    console.log('📦 Proyecto:', firebaseConfig.projectId);

    // Referencias a servicios
    window.db = firebase.firestore();
    window.storage = firebase.storage();

    console.log('✅ Firestore y Storage listos');
    console.log('🔥 Firebase completamente configurado - ¡Listo para subir recuerdos a la nube!');
} catch (error) {
    console.error('❌ Error al inicializar Firebase:', error);
    alert('⚠️ Error al conectar con Firebase. Verifica la configuración.');
}

