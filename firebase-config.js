// Configuración de Firebase
// INSTRUCCIONES PARA CONFIGURAR:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto (o usa uno existente)
// 3. Agrega una aplicación web
// 4. Copia la configuración y reemplaza los valores abajo
// 5. Habilita Firestore Database y Storage en la consola de Firebase

const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_AUTH_DOMAIN_AQUI",
    projectId: "TU_PROJECT_ID_AQUI",
    storageBucket: "TU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
    appId: "TU_APP_ID_AQUI"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a servicios
const db = firebase.firestore();
const storage = firebase.storage();

console.log('Firebase inicializado correctamente');

