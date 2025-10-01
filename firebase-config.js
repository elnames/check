// Configuración de Firebase
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

    // Solo Firestore para metadata (los archivos van a Cloudinary)
    window.db = firebase.firestore();

    console.log('✅ Firestore listo (metadata)');
    console.log('☁️ Archivos se subirán a Cloudinary');
    console.log('🔥 Sistema completamente configurado!');
} catch (error) {
    console.error('❌ Error al inicializar Firebase:', error);
    alert('⚠️ Error al conectar con Firebase. Verifica la configuración.');
}

