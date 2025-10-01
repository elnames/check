// Configuración de Cloudinary
// Reemplaza 'TU_CLOUD_NAME' con tu Cloud Name de Cloudinary

const CLOUDINARY_CONFIG = {
    cloudName: 'TU_CLOUD_NAME', // 👈 REEMPLAZA ESTO con tu Cloud Name
    uploadPreset: 'propuesta_indecente' // Lo crearemos en Cloudinary
};

// URL base para subir archivos
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;

console.log('✅ Cloudinary configurado');
console.log('📦 Cloud Name:', CLOUDINARY_CONFIG.cloudName);

