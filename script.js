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
        showConfirmationBtn: document.getElementById('show-confirmation-btn'),
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

    console.log('Abriendo modal:', { src, caption, type });

    modal.style.display = 'block';
    modalCaption.textContent = caption;

    if (type === 'video') {
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = encodeURI(src);
        modalVideo.setAttribute('playsinline', '');
        modalVideo.setAttribute('webkit-playsinline', '');
        modalVideo.setAttribute('preload', 'metadata');
        modalVideo.muted = false;

        modalVideo.load();
        modalVideo.play().catch(error => {
            console.warn('Video autoplay prevented:', error);
        });
    } else {
        modalVideo.style.display = 'none';
        modalImage.style.display = 'block';
        modalImage.src = src;
    }

    console.log('Caption establecida:', modalCaption.textContent);
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
        // PIN correcto
        currentQuestionIndex = questions.length;
        showScreen('reveal');
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
}

// Función para cargar medias guardados desde Firebase
async function loadUserMedia() {
    try {
        console.log('Cargando medias desde Firebase...');
        const snapshot = await db.collection('memories').orderBy('timestamp', 'desc').get();

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

// Función para guardar un media en Firebase
async function saveMediaToFirebase(media) {
    try {
        console.log('Guardando media en Firebase...');
        const docRef = await db.collection('memories').add(media);
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

    // Eliminar solo los items de usuario previamente agregados
    const userItems = gallery.querySelectorAll('.gallery-item[data-user-media]');
    userItems.forEach(item => item.remove());

    // Agregar todos los medias del usuario
    userMedia.forEach((media) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-user-media', 'true');
        galleryItem.setAttribute('data-media-id', media.id);

        if (media.type === 'video') {
            galleryItem.innerHTML = `
                <video muted autoplay loop playsinline webkit-playsinline preload="metadata">
                    <source src="${media.url}" type="video/mp4">
                </video>
                <div class="photo-overlay">${media.caption}</div>
            `;
        } else {
            galleryItem.innerHTML = `
                <img src="${media.url}" alt="Momento especial" loading="lazy">
                <div class="photo-overlay">${media.caption}</div>
            `;
        }

        // Click para abrir modal
        galleryItem.onclick = (e) => {
            if (!e.target.closest('.media-actions')) {
                openModal(media.url, media.caption, media.type);
            }
        };

        // Long press para editar/eliminar
        let pressTimer;
        galleryItem.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => showMediaActions(media.id, media), 500);
        });

        galleryItem.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
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

        gallery.appendChild(galleryItem);
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
            <button class="btn-action btn-edit" onclick="editMedia(${mediaId})">✏️ Editar Título</button>
            <button class="btn-action btn-delete" onclick="deleteMedia(${mediaId})">🗑️ Eliminar</button>
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
            await db.collection('memories').doc(mediaId).update({
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
            await db.collection('memories').doc(mediaId).delete();

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

// Función para comprimir imagen
function compressImage(file, maxWidth = 1200, quality = 0.7) {
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
                const compressedDataURL = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataURL);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Función para agregar media a la galería
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
        let mediaURL;

        if (isVideo) {
            // Para videos, leer directamente (advertir si es muy grande)
            if (file.size > 5 * 1024 * 1024) { // 5MB
                alert('⚠️ El video es muy grande. Por favor selecciona un video más pequeño (máx 5MB).');
                addBtn.innerHTML = originalText;
                addBtn.disabled = false;
                return;
            }
            
            const reader = new FileReader();
            mediaURL = await new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        } else {
            // Para imágenes, comprimir
            addBtn.innerHTML = '⏳ Comprimiendo...';
            mediaURL = await compressImage(file);
        }

        addBtn.innerHTML = '⏳ Guardando...';

        // Crear objeto de media
        const newMedia = {
            url: mediaURL,
            caption: caption,
            type: isVideo ? 'video' : 'image',
            timestamp: Date.now()
        };

        // Guardar en Firebase
        const docId = await saveMediaToFirebase(newMedia);
        
        // Agregar al array local con el ID de Firebase
        newMedia.id = docId;
        userMedia.unshift(newMedia);
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
        
        if (error.message && error.message.includes('1048487')) {
            alert('⚠️ El archivo es muy grande. Por favor selecciona uno más pequeño o de menor calidad.');
        } else {
            alert('⚠️ Error al subir el recuerdo. Intenta de nuevo.');
        }
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

    // Botón para mostrar tickets
    if (elements.showTicketsBtn) {
        elements.showTicketsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mostrando videos especiales...');
            showScreen('specialVideos');
        });
    }

    // Botón para mostrar confirmación
    if (elements.showConfirmationBtn) {
        elements.showConfirmationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mostrando confirmación...');
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

    // Botones de "Volver"
    const backFromSpecialVideosBtn = document.getElementById('back-from-special-videos-btn');
    const backFromConfirmationBtn = document.getElementById('back-from-confirmation-btn');
    const backFromTicketsBtn = document.getElementById('back-from-tickets-btn');

    if (backFromSpecialVideosBtn) {
        backFromSpecialVideosBtn.addEventListener('click', () => showScreen('reveal'));
    }

    if (backFromConfirmationBtn) {
        backFromConfirmationBtn.addEventListener('click', () => showScreen('specialVideos'));
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