// Variables globales
let currentScreen = 'welcome';
let currentQuestionIndex = 0;
let userMedia = []; // Array para almacenar medias del usuario

// Preguntas románticas sobre su historia
const questions = [
    {
        title: "Para continuar, necesito que recuerdes...",
        hint: "¿Cuál fue el primer lugar donde fuimos a comer juntos? 🤔",
        answers: ['tio tomate', 'tiotomate', 'Tio tomate', 'Tiotomate', 'Tíotomate', 'tío tomate', 'Tío Tomate']
    },
    {
        title: "Sigamos recordando momentos especiales...",
        hint: "¿Dónde nos conocimos por primera vez? 💕",
        answers: ['la blondie', 'blondie', 'La blondie', 'Blondie', 'la blondie santiago', 'blondie santiago']
    },
    {
        title: "Recordemos un momento gracioso...",
        hint: "¿A qué evento fuimos que fue un fracaso por culpa de Leo Fome Force? 😅",
        answers: ['zapravka', 'Zapravka', 'ZAPRAVKA', 'techno ruso', 'los wnes de zapravka']
    },
    {
        title: "Pero después tuvimos un momento genial...",
        hint: "¿A qué evento fuimos después y la pasamos súper bien? 🎉",
        answers: ['superklub', 'Superklub', 'SUPERKLUB', 'SuoerKlub', 'super klub', 'Super Klub', 'HSU SuperKlub', 'hsu superklub', 'HSU', 'hsu']
    },
    {
        title: "Última pregunta para llegar a la sorpresa...",
        hint: "¿A qué país soñamos con ir juntos? 🌍✈️",
        answers: ['españa', 'España', 'ESPAÑA', 'espana', 'Espana']
    }
];

// Variables para elementos del DOM
let screens = {};
let elements = {};
let skipBtn = null;

// Función para inicializar elementos del DOM
function initializeElements() {
    screens = {
        welcome: document.getElementById('welcome-screen'),
        questions: document.getElementById('questions-screen'),
        reveal: document.getElementById('reveal-screen'),
        specialVideos: document.getElementById('special-videos-screen'),
        confirmation: document.getElementById('confirmation-screen'),
        tickets: document.getElementById('tickets-screen')
    };

    elements = {
        startBtn: document.getElementById('start-btn'),
        questionInput: document.getElementById('question-input'),
        questionSubmitBtn: document.getElementById('question-submit-btn'),
        showTicketsBtn: document.getElementById('show-tickets-btn'),
        yesBtn: document.getElementById('yes-btn'),
        restartBtn: document.getElementById('restart-btn'),
        questionErrorMessage: document.getElementById('question-error-message'),
        questionSuccessMessage: document.getElementById('question-success-message'),
        questionTitle: document.getElementById('question-title'),
        questionHint: document.getElementById('question-hint'),
        progressText: document.getElementById('progress-text'),
        progressFill: document.getElementById('progress-fill')
    };

    console.log('Elementos inicializados:', elements);
}

// Funciones de navegación
function showScreen(screenName) {
    console.log('Intentando mostrar pantalla:', screenName);

    // Ocultar todas las pantallas
    Object.values(screens).forEach(screen => {
        if (screen) {
            screen.classList.remove('active');
        }
    });

    // Mostrar la pantalla solicitada
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
        currentScreen = screenName;
        console.log('Pantalla mostrada:', screenName);

        // Actualizar visibilidad del botón de omitir
        updateSkipButtonVisibility();

        // Efectos especiales según la pantalla
        if (screenName === 'questions') {
            loadCurrentQuestion();
        } else if (screenName === 'reveal') {
            createConfetti();
            // Cargar medias del usuario cuando se muestra la galería
            renderUserMedia();
        } else if (screenName === 'tickets') {
            createConfetti();
        }
    } else {
        console.error('Pantalla no encontrada:', screenName);
    }
}

// Función para cargar la pregunta actual
function loadCurrentQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];

        if (elements.questionTitle) elements.questionTitle.textContent = question.title;
        if (elements.questionHint) elements.questionHint.textContent = question.hint;
        if (elements.progressText) elements.progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
        if (elements.progressFill) elements.progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

        // Limpiar mensajes anteriores
        if (elements.questionErrorMessage) elements.questionErrorMessage.textContent = '';
        if (elements.questionSuccessMessage) elements.questionSuccessMessage.textContent = '';
        if (elements.questionInput) elements.questionInput.value = '';
    }
}

// Función para validar respuestas
function validateAnswer() {
    const userAnswer = elements.questionInput.value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.includes(userAnswer)) {
        // Respuesta correcta
        if (elements.questionSuccessMessage) {
            elements.questionSuccessMessage.textContent = '¡Correcto! 💕';
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            // Siguiente pregunta
            setTimeout(() => {
                loadCurrentQuestion();
            }, 1500);
        } else {
            // Todas las preguntas respondidas
            setTimeout(() => {
                showScreen('reveal');
            }, 1500);
        }
    } else {
        // Respuesta incorrecta
        if (elements.questionErrorMessage) {
            elements.questionErrorMessage.textContent = 'Inténtalo de nuevo... 💔';
        }

        // Limpiar mensaje de error después de 2 segundos
        setTimeout(() => {
            if (elements.questionErrorMessage) {
                elements.questionErrorMessage.textContent = '';
            }
        }, 2000);
    }
}

// Función para crear efectos de confeti
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';

    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;

        confettiContainer.appendChild(confetti);
    }

    // Remover confeti después de la animación
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 5000);
}

// Función para abrir modal de imágenes/videos
function openModal(src, caption, type) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalCaption = document.getElementById('modalCaption');

    console.log('🎬 Abriendo modal:', { src, caption, type });

    if (!modal || !modalImage || !modalVideo || !modalCaption) {
        console.error('❌ Elementos del modal no encontrados');
        return;
    }

    modal.style.display = 'block';
    modalCaption.textContent = caption;

    if (type === 'video') {
        console.log('📹 Configurando video en modal');
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';

        // Pausar y limpiar video anterior
        modalVideo.pause();
        modalVideo.src = '';
        modalVideo.load();

        // Configurar nuevo video
        const videoSrc = src.startsWith('http') ? src : encodeURI(src);
        console.log('🎥 URL del video:', videoSrc);

        modalVideo.src = videoSrc;
        modalVideo.setAttribute('playsinline', 'true');
        modalVideo.setAttribute('webkit-playsinline', 'true');
        modalVideo.setAttribute('preload', 'auto');
        modalVideo.muted = false;
        modalVideo.controls = true;

        // Cargar video
        modalVideo.load();

        // Intentar reproducir cuando esté listo
        const playVideo = () => {
            console.log('▶️ Intentando reproducir video');
            modalVideo.play().catch(error => {
                console.warn('⚠️ Autoplay bloqueado (normal en móviles):', error);
            });
        };

        if (modalVideo.readyState >= 3) {
            // Video ya está listo
            playVideo();
        } else {
            // Esperar a que el video esté listo
            modalVideo.addEventListener('loadeddata', playVideo, { once: true });
        }

    } else {
        console.log('🖼️ Configurando imagen en modal');
        modalVideo.style.display = 'none';
        modalImage.style.display = 'block';
        modalImage.src = src;
    }

    console.log('✅ Modal abierto correctamente');
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalVideo = document.getElementById('modalVideo');

    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute('src');
    modalVideo.load();
}

// Función para descargar PDF
function downloadPDF(pdfPath) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop();
    link.click();
}

// Función para mostrar QR
function showQR(qrPath, qrTitle) {
    openModal(qrPath, qrTitle, 'image');
}

// Función para manejar el botón de omitir con PIN
function handleSkip() {
    const pinModal = document.getElementById('pin-modal');
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');

    if (pinModal) {
        pinModal.classList.add('active');
        if (pinInput) {
            pinInput.value = '';
            pinInput.focus();
        }
        if (pinError) {
            pinError.textContent = '';
        }
    }
}

// Función para validar PIN
function validatePIN() {
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    const pinModal = document.getElementById('pin-modal');

    const pin = pinInput.value.trim();

    if (pin === '3009') {
        // PIN correcto - ir a galería
        currentQuestionIndex = questions.length;
        showScreen('reveal');
        pinModal.classList.remove('active');
        if (skipBtn) {
            skipBtn.classList.add('hidden');
        }
    } else if (pin === '4224') {
        // PIN especial - ir directo a las entradas
        currentQuestionIndex = questions.length;
        showScreen('tickets');
        pinModal.classList.remove('active');
        if (skipBtn) {
            skipBtn.classList.add('hidden');
        }
    } else {
        // PIN incorrecto
        pinError.textContent = 'PIN incorrecto ❌';
        pinInput.value = '';
        setTimeout(() => {
            pinError.textContent = '';
        }, 2000);
    }
}

// Función para cerrar modal PIN
function closePINModal() {
    const pinModal = document.getElementById('pin-modal');
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');

    if (pinModal) {
        pinModal.classList.remove('active');
    }
    if (pinInput) {
        pinInput.value = '';
    }
    if (pinError) {
        pinError.textContent = '';
    }
}

// Función para abrir modal de subida de archivos
function openUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    const fileInput = document.getElementById('media-upload');
    const captionInput = document.getElementById('media-caption');

    if (uploadModal) {
        uploadModal.classList.add('active');
    }

    // Limpiar formulario
    if (fileInput) fileInput.value = '';
    if (captionInput) captionInput.value = '';
}

// Función para cerrar modal de subida de archivos
function closeUploadModal() {
    const uploadModal = document.getElementById('uploadModal');

    if (uploadModal) {
        uploadModal.classList.remove('active');
    }

    // Limpiar previsualización
    removePreview();
}

// Función para mostrar previsualización del archivo seleccionado
function showPreview(file) {
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const previewVideo = document.getElementById('preview-video');

    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();

    reader.onload = (e) => {
        if (isVideo) {
            previewVideo.src = e.target.result;
            previewVideo.style.display = 'block';
            previewImage.style.display = 'none';
        } else {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            previewVideo.style.display = 'none';
        }

        previewContainer.style.display = 'block';
    };

    reader.readAsDataURL(file);
}

// Función para quitar la previsualización
function removePreview() {
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const previewVideo = document.getElementById('preview-video');
    const fileInput = document.getElementById('media-upload');

    if (previewContainer) previewContainer.style.display = 'none';
    if (previewImage) {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
    if (previewVideo) {
        previewVideo.src = '';
        previewVideo.style.display = 'none';
    }
    if (fileInput) fileInput.value = '';
}

// Función para cargar medias guardados desde Firebase
async function loadUserMedia() {
    try {
        console.log('Cargando medias desde Firebase...');
        // Asegurar que Firestore esté disponible
        if (!window.db && window.firebase && firebase.apps && firebase.apps.length) {
            window.db = firebase.firestore();
        }

        if (!window.db) {
            console.warn('Firestore no está listo aún. Saltando carga de recuerdos.');
            return;
        }

        const snapshot = await window.db.collection('memories').orderBy('timestamp', 'asc').get();

        userMedia = [];
        snapshot.forEach(doc => {
            userMedia.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`${userMedia.length} recuerdos cargados desde Firebase`);
        renderUserMedia();
    } catch (error) {
        console.error('Error al cargar medias desde Firebase:', error);
        alert('⚠️ Error al cargar los recuerdos. Verifica tu conexión.');
    }
}

// Función para subir archivo a Cloudinary
async function uploadToCloudinary(file, type) {
    try {
        console.log('📤 Subiendo a Cloudinary:', file.name);

        // Crear FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        formData.append('folder', 'propuesta-indecente');

        // Subir a Cloudinary
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error al subir: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Archivo subido a Cloudinary:', data.secure_url);

        return data.secure_url;
    } catch (error) {
        console.error('❌ Error subiendo a Cloudinary:', error);
        throw error;
    }
}

// Función para guardar un media en Firebase
async function saveMediaToFirebase(media) {
    try {
        console.log('Guardando media en Firebase...');
        if (!window.db) {
            throw new Error('Firebase no inicializado (db)');
        }
        const docRef = await window.db.collection('memories').add(media);
        console.log('Media guardado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error al guardar en Firebase:', error);
        throw error;
    }
}

// Función para renderizar medias del usuario en la galería
function renderUserMedia() {
    const gallery = document.querySelector('.photo-gallery');
    if (!gallery) return;

    // Eliminar solo los items de usuario previamente agregados (pero no el botón de agregar)
    const userItems = gallery.querySelectorAll('.gallery-item[data-user-media]');
    userItems.forEach(item => item.remove());

    // Buscar el botón de agregar recuerdo
    const addButton = gallery.querySelector('.add-memory-btn');

    // Agregar todos los medias del usuario
    userMedia.forEach((media) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-user-media', 'true');
        galleryItem.setAttribute('data-media-id', media.id);

        if (media.type === 'video') {
            galleryItem.innerHTML = `
                <video muted loop playsinline webkit-playsinline preload="metadata">
                    <source src="${media.url}" type="video/mp4">
                </video>
                <div class="photo-overlay">${media.caption}</div>
            `;

            // Intentar autoplay de forma segura
            const video = galleryItem.querySelector('video');
            if (video) {
                video.play().catch(() => {
                    // Si falla el autoplay, no hacer nada (usuario hará click)
                });
            }
        } else {
            galleryItem.innerHTML = `
                <img src="${media.url}" alt="Momento especial" loading="lazy">
                <div class="photo-overlay">${media.caption}</div>
            `;
        }

        // Long press para editar/eliminar (solo en móvil)
        let pressTimer;
        let isLongPress = false;

        galleryItem.addEventListener('touchstart', (e) => {
            isLongPress = false;
            pressTimer = setTimeout(() => {
                isLongPress = true;
                showMediaActions(media.id, media);
            }, 500);
        });

        galleryItem.addEventListener('touchend', (e) => {
            clearTimeout(pressTimer);
            // Si no fue long press, abrir modal
            if (!isLongPress && !e.target.closest('.media-actions')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Touch end - abriendo modal:', media.caption, media.type);
                openModal(media.url, media.caption, media.type);
            }
        });

        galleryItem.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        });

        // Click normal para desktop y fallback móvil
        galleryItem.addEventListener('click', (e) => {
            if (!e.target.closest('.media-actions')) {
                e.preventDefault();
                console.log('Click - abriendo modal:', media.caption, media.type);
                openModal(media.url, media.caption, media.type);
            }
        });

        galleryItem.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Click izquierdo
                pressTimer = setTimeout(() => showMediaActions(media.id, media), 500);
            }
        });

        galleryItem.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
        });

        galleryItem.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);
        });

        // Insertar ANTES del botón de agregar (para que el botón quede al final)
        if (addButton) {
            gallery.insertBefore(galleryItem, addButton);
        } else {
            gallery.appendChild(galleryItem);
        }
    });
}

// Función para mostrar acciones de media (editar/eliminar)
function showMediaActions(mediaId, media) {
    const modal = document.createElement('div');
    modal.className = 'media-actions-modal';
    modal.innerHTML = `
        <div class="media-actions-content">
            <h3>¿Qué deseas hacer?</h3>
            <p class="media-caption-preview">"${media.caption}"</p>
            <button class="btn-action btn-edit" onclick="editMedia('${mediaId}')">✏️ Editar Título</button>
            <button class="btn-action btn-delete" onclick="deleteMedia('${mediaId}')">🗑️ Eliminar</button>
            <button class="btn-action btn-cancel" onclick="closeMediaActions()">Cancelar</button>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Función para cerrar el modal de acciones
function closeMediaActions() {
    const modal = document.querySelector('.media-actions-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Función para editar el título de un media
async function editMedia(mediaId) {
    const media = userMedia.find(m => m.id === mediaId);
    if (!media) return;

    const newCaption = prompt('Nuevo título:', media.caption);
    if (newCaption !== null && newCaption.trim() !== '') {
        try {
            if (!window.db) {
                alert('⚠️ Firestore no está disponible en este momento.');
                return;
            }
            await window.db.collection('memories').doc(mediaId).update({
                caption: newCaption.trim()
            });

            // Actualizar localmente
            media.caption = newCaption.trim();
            renderUserMedia();
            closeMediaActions();
            alert('✅ Título actualizado!');
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('⚠️ Error al actualizar el título');
        }
    }
}

// Función para eliminar un media
async function deleteMedia(mediaId) {
    if (confirm('¿Estás seguro de que quieres eliminar este recuerdo? 😢')) {
        try {
            if (!window.db) {
                alert('⚠️ Firestore no está disponible en este momento.');
                return;
            }
            await window.db.collection('memories').doc(mediaId).delete();

            // Actualizar localmente
            userMedia = userMedia.filter(m => m.id !== mediaId);
            renderUserMedia();
            closeMediaActions();
            alert('🗑️ Recuerdo eliminado');
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('⚠️ Error al eliminar el recuerdo');
        }
    }
}

// Función para comprimir imagen con validación de tamaño
function compressImage(file, maxWidth = 800, quality = 0.6) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calcular nuevo tamaño manteniendo proporción
                if (width > maxWidth) {
                    height = (height / width) * maxWidth;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convertir a base64 con compresión
                let compressedDataURL = canvas.toDataURL('image/jpeg', quality);

                // Si aún es muy grande, comprimir más
                let currentQuality = quality;
                while (compressedDataURL.length > 900000 && currentQuality > 0.1) {
                    currentQuality -= 0.1;
                    compressedDataURL = canvas.toDataURL('image/jpeg', currentQuality);
                }

                console.log(`Imagen comprimida: ${Math.round(compressedDataURL.length / 1024)}KB, calidad: ${currentQuality.toFixed(1)}`);
                resolve(compressedDataURL);
            };
            img.onerror = () => reject(new Error('Error al cargar la imagen'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsDataURL(file);
    });
}

// Función para agregar media a la galería usando Firebase Storage
async function addMediaToGallery() {
    const fileInput = document.getElementById('media-upload');
    const captionInput = document.getElementById('media-caption');

    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Por favor selecciona una imagen o video 📸');
        return;
    }

    const file = fileInput.files[0];
    const caption = captionInput.value.trim() || 'Un momento especial 💕';

    // Mostrar loading
    const addBtn = document.getElementById('add-media-btn');
    const originalText = addBtn.innerHTML;
    addBtn.innerHTML = '⏳ Subiendo...';
    addBtn.disabled = true;

    try {
        const isVideo = file.type.startsWith('video/');

        // Validar tamaño de video (máx 10MB para Storage)
        if (isVideo && file.size > 10 * 1024 * 1024) {
            alert('⚠️ El video es muy grande. Por favor selecciona un video más pequeño (máx 10MB).');
            addBtn.innerHTML = originalText;
            addBtn.disabled = false;
            return;
        }

        // Validar tamaño de imagen (máx 5MB para Storage)
        if (!isVideo && file.size > 5 * 1024 * 1024) {
            alert('⚠️ La imagen es muy grande. Por favor selecciona una imagen más pequeña (máx 5MB).');
            addBtn.innerHTML = originalText;
            addBtn.disabled = false;
            return;
        }

        // Subir archivo a Cloudinary
        addBtn.innerHTML = '☁️ Subiendo a la nube...';
        const downloadURL = await uploadToCloudinary(file, isVideo ? 'video' : 'image');

        // Crear objeto de media con la URL de Storage
        addBtn.innerHTML = '⏳ Guardando...';
        const newMedia = {
            url: downloadURL,
            caption: caption,
            type: isVideo ? 'video' : 'image',
            timestamp: Date.now()
        };

        // Guardar metadata en Firestore
        const docId = await saveMediaToFirebase(newMedia);

        // Agregar al array local con el ID de Firebase
        newMedia.id = docId;
        userMedia.push(newMedia);
        renderUserMedia();

        // Limpiar formulario
        fileInput.value = '';
        captionInput.value = '';

        // Restaurar botón
        addBtn.innerHTML = originalText;
        addBtn.disabled = false;

        // Cerrar modal
        closeUploadModal();

        // Mensaje de éxito
        alert('¡Recuerdo agregado con éxito! 💕');
    } catch (error) {
        console.error('Error al agregar media:', error);
        addBtn.innerHTML = originalText;
        addBtn.disabled = false;

        let errorMsg = '⚠️ Error al subir el recuerdo.';

        if (error.message) {
            if (error.message.includes('401') || error.message.includes('unauthorized')) {
                errorMsg = '⚠️ Error de configuración de Cloudinary. Verifica el upload preset.';
            } else if (error.message.includes('quota') || error.message.includes('exceeded')) {
                errorMsg = '⚠️ Se acabó el espacio de almacenamiento.';
            } else if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
                errorMsg = '⚠️ Error de conexión. Verifica tu internet.';
            } else {
                errorMsg += ' ' + error.message;
            }
        }

        alert(errorMsg);
    }
}

// Función para actualizar la visibilidad del botón de omitir
function updateSkipButtonVisibility() {
    if (skipBtn) {
        // Ocultar el botón si ya estamos en la pantalla de revelación o más adelante
        if (currentScreen === 'reveal' || currentScreen === 'specialVideos' ||
            currentScreen === 'confirmation' || currentScreen === 'tickets') {
            skipBtn.classList.add('hidden');
        } else {
            skipBtn.classList.remove('hidden');
        }
    }
}

// CSS para animación de confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado, inicializando...');

    // Inicializar elementos
    initializeElements();

    // Cargar medias del usuario desde localStorage
    loadUserMedia();

    // Inicializar botón de omitir
    skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', handleSkip);
        console.log('Botón de omitir configurado');
    }

    console.log('Botón start:', elements.startBtn);

    // Botón de inicio
    if (elements.startBtn) {
        elements.startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botón empezar clickeado!');
            showScreen('questions');
        });
        console.log('Event listener del botón empezar configurado');
    } else {
        console.error('No se encontró el botón start-btn');
    }

    // Botón de envío de respuesta
    if (elements.questionSubmitBtn) {
        elements.questionSubmitBtn.addEventListener('click', validateAnswer);
    }

    // Input de respuesta
    if (elements.questionInput) {
        elements.questionInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                validateAnswer();
            }
        });
    }

    // Botón para mostrar confirmación (antes iba a videos especiales)
    if (elements.showTicketsBtn) {
        elements.showTicketsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Ir a pantalla de confirmación...');
            showScreen('confirmation');
        });
    }

    // Botón de confirmación (¡SÍ!)
    if (elements.yesBtn) {
        elements.yesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Confirmación aceptada!');
            showScreen('tickets');
        });
    }

    // Botón "No" que se escapa (broma)
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        // Función para mover el botón a una posición aleatoria en toda la página
        function moveNoButton() {
            // Hacer visible el botón si no lo está
            noBtn.style.display = 'block';
            
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;
            
            // Calcular posiciones aleatorias dentro de la ventana visible
            // Dejar margen de 20px en todos los lados
            const maxX = window.innerWidth - btnWidth - 20;
            const maxY = window.innerHeight - btnHeight - 20;
            
            // Asegurar que no sea negativo
            const minX = 20;
            const minY = 20;
            
            const randomX = Math.random() * (maxX - minX) + minX;
            const randomY = Math.random() * (maxY - minY) + minY;
            
            // Aplicar nueva posición
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
        }

        // Función para mostrar el botón cuando estamos en confirmación
        function showNoButtonOnConfirmation() {
            const confirmationScreen = document.getElementById('confirmation-screen');
            if (confirmationScreen && confirmationScreen.classList.contains('active')) {
                moveNoButton();
            } else {
                noBtn.style.display = 'none';
            }
        }

        // Observar cambios en las pantallas
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    showNoButtonOnConfirmation();
                }
            });
        });

        // Observar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            observer.observe(screen, { attributes: true });
        });
        
        // Desktop: mouseenter - se escapa solo con acercarse
        noBtn.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        
        // Móvil: click/touch - se escapa solo al hacer click
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            moveNoButton();
        });
        
        // Prevenir el comportamiento por defecto en touch pero sin mover
        // (solo se moverá con click)
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
        });
        
        // Reposicionar si cambia el tamaño de la ventana
        window.addEventListener('resize', () => {
            showNoButtonOnConfirmation();
        });
    }

    // Botón de confirmación (Si)
    const siBtn = document.getElementById('si-btn');
    if (siBtn) {
        siBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Confirmación aceptada!');
            showScreen('tickets');
        });
    }

    // Botón de reinicio
    if (elements.restartBtn) {
        elements.restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            showScreen('welcome');
            if (elements.questionInput) elements.questionInput.value = '';
            // Mostrar el botón de omitir nuevamente
            if (skipBtn) {
                skipBtn.classList.remove('hidden');
            }
        });
    }

    // Modal PIN event listeners
    const pinSubmitBtn = document.getElementById('pin-submit');
    const pinCancelBtn = document.getElementById('pin-cancel');
    const pinInput = document.getElementById('pin-input');
    const pinModal = document.getElementById('pin-modal');

    if (pinSubmitBtn) {
        pinSubmitBtn.addEventListener('click', validatePIN);
    }

    if (pinCancelBtn) {
        pinCancelBtn.addEventListener('click', closePINModal);
    }

    if (pinInput) {
        pinInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                validatePIN();
            }
        });
    }

    // Cerrar modal PIN al hacer clic fuera
    if (pinModal) {
        pinModal.addEventListener('click', function (e) {
            if (e.target === pinModal) {
                closePINModal();
            }
        });
    }

    // Botón de agregar media
    const addMediaBtn = document.getElementById('add-media-btn');
    if (addMediaBtn) {
        addMediaBtn.addEventListener('click', addMediaToGallery);
    }

    // Event listener para previsualización al seleccionar archivo
    const mediaUploadInput = document.getElementById('media-upload');
    if (mediaUploadInput) {
        mediaUploadInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                showPreview(file);
            }
        });
    }

    // Botones de "Volver"
    const backFromConfirmationBtn = document.getElementById('back-from-confirmation-btn');
    const backFromTicketsBtn = document.getElementById('back-from-tickets-btn');

    if (backFromConfirmationBtn) {
        backFromConfirmationBtn.addEventListener('click', () => showScreen('reveal'));
    }

    if (backFromTicketsBtn) {
        backFromTicketsBtn.addEventListener('click', () => showScreen('confirmation'));
    }

    // Modal event listeners
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Modal de upload listeners
    const uploadModal = document.getElementById('uploadModal');

    if (uploadModal) {
        uploadModal.addEventListener('click', function (e) {
            if (e.target === uploadModal) {
                closeUploadModal();
            }
        });
    }

    console.log('Todos los event listeners configurados');
});