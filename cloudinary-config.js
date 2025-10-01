// Configuración de Cloudinary
// Reemplaza 'TU_CLOUD_NAME' con tu Cloud Name de Cloudinary

const CLOUDINARY_CONFIG = {
    cloudName: 'dn7fu1lyj', // Tu Cloud Name de Cloudinary
    uploadPreset: 'propuesta_indecente' // Creado en Cloudinary Settings > Upload
};

// URL base para subir archivos
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;

console.log('✅ Cloudinary configurado');
console.log('📦 Cloud Name:', CLOUDINARY_CONFIG.cloudName);

