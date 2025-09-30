// Variables globales
let currentScreen = 'welcome';
let currentQuestionIndex = 0;

// Preguntas románticas sobre su historia
const questions = [
    {
        title: "Para continuar, necesito que recuerdes...",
        hint: "¿Cuál fue el primer lugar donde fuimos a comer juntos? 🤔",
        answers: ['tio tomate', 'tiotomate', 'Tio tomate', 'Tiotomate', 'gabimusic', 'Tío tomate', 'tío Tomate', 'tío tomate', 'Tio tomate santiago', 'Tiotomate santiago', 'tiotomate santiago', 'Gabimusic', 'GABIMUSIC']
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
        answers: ['superklub', 'Superklub', 'SUPERKLUB', 'super klub', 'Super Klub', 'HSU SuperKlub', 'hsu superklub', 'HSU', 'hsu']
    },
    {
        title: "Última pregunta para llegar a la sorpresa...",
        hint: "¿A qué país soñamos con ir juntos? 🌍✈️",
        answers: ['españa', 'España', 'ESPAÑA', 'espana', 'Espana']
    }
];

// Elementos del DOM
const screens = {
    welcome: document.getElementById('welcome-screen'),
    questions: document.getElementById('questions-screen'),
    reveal: document.getElementById('reveal-screen'),
    specialVideos: document.getElementById('special-videos-screen'),
    confirmation: document.getElementById('confirmation-screen'),
    tickets: document.getElementById('tickets-screen')
};

const elements = {
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

        // Efectos especiales según la pantalla
        if (screenName === 'questions') {
            loadCurrentQuestion();
        } else if (screenName === 'reveal') {
            createHeartsAnimation();
        } else if (screenName === 'tickets') {
            createTicketAnimation();
        }
    } else {
        console.log('Pantalla no encontrada:', screenName);
    }
}

// Cargar pregunta actual
function loadCurrentQuestion() {
    const question = questions[currentQuestionIndex];
    elements.questionTitle.textContent = question.title;
    elements.questionHint.textContent = question.hint;
    elements.progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    elements.progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    // Limpiar mensajes
    elements.questionErrorMessage.textContent = '';
    elements.questionSuccessMessage.textContent = '';
    elements.questionInput.value = '';
    elements.questionInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    elements.questionInput.style.boxShadow = '';
}

// Validación de respuesta
function validateAnswer() {
    const input = elements.questionInput.value.toLowerCase().trim();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.some(answer => answer.toLowerCase() === input)) {
        // Respuesta correcta
        elements.questionErrorMessage.textContent = '';
        elements.questionSuccessMessage.textContent = '✅ ¡Correcto! Recuerdo perfecto...';
        elements.questionInput.style.borderColor = '#6bcf7f';
        elements.questionInput.style.boxShadow = '0 0 20px rgba(107, 207, 127, 0.3)';

        setTimeout(() => {
            // Si es la primera pregunta y respondió "gabimusic", ir directo a tickets
            if (currentQuestionIndex === 0 && input === 'gabimusic') {
                currentQuestionIndex = 0; // Reset para futuras veces
                showScreen('tickets');
                return;
            }

            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                // Siguiente pregunta
                loadCurrentQuestion();
            } else {
                // Todas las preguntas respondidas
                currentQuestionIndex = 0; // Reset para futuras veces
                showScreen('reveal');
            }
        }, 1500);
    } else {
        // Respuesta incorrecta
        elements.questionErrorMessage.textContent = '❌ Intenta de nuevo, recuerda bien...';
        elements.questionSuccessMessage.textContent = '';
        elements.questionInput.style.borderColor = '#ff6b9d';
        elements.questionInput.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.3)';

        // Efecto de vibración
        elements.questionInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            elements.questionInput.style.animation = '';
        }, 500);
    }
}

// Animaciones especiales
function createHeartsAnimation() {
    const container = screens.reveal;

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.animation = 'fadeIn 1s ease-in-out';
            heart.style.zIndex = '10';

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

function createTicketAnimation() {
    const container = screens.tickets;

    // Efecto de confetti
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff9ff3'][Math.floor(Math.random() * 5)];
            confetti.style.borderRadius = '50%';
            confetti.style.animation = 'confetti-fall 3s ease-in-out forwards';
            confetti.style.zIndex = '5';

            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Efectos de teclado
function handleKeyPress(event) {
    if (currentScreen === 'questions' && event.key === 'Enter') {
        validateAnswer();
    }
}

// Efectos visuales adicionales
function addFloatingHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100vh';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 4s ease-out forwards';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Añadir CSS para la animación flotante
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Botón de inicio
    elements.startBtn.addEventListener('click', () => {
        showScreen('questions');
    });

    // Botón de envío de respuesta
    elements.questionSubmitBtn.addEventListener('click', validateAnswer);

    // Input de respuesta
    elements.questionInput.addEventListener('input', function () {
        elements.questionErrorMessage.textContent = '';
        elements.questionSuccessMessage.textContent = '';
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        this.style.boxShadow = '';
    });

    // Botón para mostrar videos especiales
    if (elements.showTicketsBtn) {
        elements.showTicketsBtn.addEventListener('click', () => {
            showScreen('specialVideos');
        });
    }

    // Botón para mostrar pantalla de confirmación
    const confirmationBtn = document.getElementById('show-confirmation-btn');
    if (confirmationBtn) {
        confirmationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botón presionado, mostrando confirmación');
            showScreen('confirmation');
        });

        // También agregar el evento onclick como backup
        confirmationBtn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Onclick ejecutado');
            showScreen('confirmation');
        };
    } else {
        console.log('Botón de confirmación no encontrado');
    }

    // Botón SÍ para ir a los tickets
    const yesBtn = document.getElementById('yes-btn');
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            console.log('Botón SÍ presionado, mostrando tickets');
            showScreen('tickets');
        });
    } else {
        console.log('Botón SÍ no encontrado');
    }

    // Botón de reinicio
    elements.restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        showScreen('welcome');
        elements.questionInput.value = '';
        elements.questionErrorMessage.textContent = '';
        elements.questionSuccessMessage.textContent = '';
    });

    // Teclado
    document.addEventListener('keypress', handleKeyPress);

    // Efecto de corazones flotantes cada 3 segundos
    setInterval(addFloatingHearts, 3000);

    // Efecto de entrada
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Event listeners para el modal
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Efectos de sonido simulados (visuales)
function createSoundEffect(type) {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.top = '50%';
    effect.style.left = '50%';
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.fontSize = '3rem';
    effect.style.zIndex = '2000';
    effect.style.pointerEvents = 'none';
    effect.style.animation = 'fadeIn 0.5s ease-in-out forwards';

    switch (type) {
        case 'success':
            effect.innerHTML = '✨';
            break;
        case 'error':
            effect.innerHTML = '💔';
            break;
        case 'love':
            effect.innerHTML = '💕';
            break;
    }

    document.body.appendChild(effect);

    setTimeout(() => {
        effect.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        setTimeout(() => {
            effect.remove();
        }, 500);
    }, 1000);
}

// Añadir CSS para fadeOut
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Función mejorada de validación con efectos
function validatePasswordWithEffects() {
    const input = elements.passwordInput.value.toLowerCase().trim();

    if (correctPasswords.includes(input)) {
        createSoundEffect('success');
        elements.errorMessage.textContent = '';
        elements.passwordInput.value = '';

        // Efecto de éxito mejorado
        elements.passwordInput.style.borderColor = '#6bcf7f';
        elements.passwordInput.style.boxShadow = '0 0 30px rgba(107, 207, 127, 0.5)';

        setTimeout(() => {
            showScreen('reveal');
            createSoundEffect('love');
        }, 1000);
    } else {
        createSoundEffect('error');
        elements.errorMessage.textContent = '❌ Intenta de nuevo, recuerda bien...';
        elements.passwordInput.style.borderColor = '#ff6b9d';
        elements.passwordInput.style.boxShadow = '0 0 30px rgba(255, 107, 157, 0.5)';

        // Efecto de vibración mejorado
        elements.passwordInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            elements.passwordInput.style.animation = '';
        }, 500);
    }
}

// Reemplazar la función original (solo si existe)
if (elements.submitBtn) {
    elements.submitBtn.removeEventListener('click', validatePassword);
    elements.submitBtn.addEventListener('click', validatePasswordWithEffects);
}

// Funcionalidad del modal
function openModal(src, caption, type) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalCaption = document.getElementById('modalCaption');

    console.log('Abriendo modal:', { src, caption, type });

    modal.style.display = 'block';
    modalCaption.textContent = caption;

    if (type === 'video') {
        const encodedSrc = encodeURI(src);
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';

        // Configuración para mejor compatibilidad móvil/navegadores
        modalVideo.setAttribute('playsinline', '');
        modalVideo.setAttribute('webkit-playsinline', '');
        modalVideo.preload = 'metadata';
        modalVideo.muted = true; // asegura autoplay tras gesto del usuario

        // Reiniciar y cargar antes de reproducir
        try {
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.load();
        } catch (e) {
            console.warn('No se pudo resetear el video previamente:', e);
        }

        modalVideo.src = encodedSrc;
        modalVideo.load();
        modalVideo.play().catch((err) => {
            console.warn('Reproducción bloqueada/pendiente. Intentando mostrar controles:', err);
        });
    } else {
        modalVideo.style.display = 'none';
        modalImage.style.display = 'block';
        modalImage.src = src;
    }

    console.log('Caption establecida:', modalCaption.textContent);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalVideo = document.getElementById('modalVideo');

    modal.style.display = 'none';
    try {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        // Liberar el src para cortar descargas en background
        modalVideo.removeAttribute('src');
        modalVideo.load();
    } catch (e) {
        console.warn('No se pudo limpiar el video al cerrar:', e);
    }
}

// Función para descargar PDF
async function downloadPDF(pdfPath) {
    const fileName = pdfPath.split('/').pop();

    // Mostrar indicador de descarga
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Descargando...';
    button.disabled = true;

    try {
        // Usar fetch para obtener el archivo y forzar descarga
        const response = await fetch(pdfPath);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();

        // Crear URL temporal para el blob
        const url = window.URL.createObjectURL(blob);

        // Crear enlace de descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';

        // Agregar al DOM y hacer click
        document.body.appendChild(link);
        link.click();

        // Limpiar
        setTimeout(() => {
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
            window.URL.revokeObjectURL(url);
        }, 100);

        // Restaurar botón
        button.innerHTML = '✅ ¡Descargado!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);

        console.log(`Descargando ${fileName}...`);

    } catch (error) {
        console.error('Error al descargar PDF:', error);

        // Fallback: método tradicional
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
        }, 100);

        // Restaurar botón
        button.innerHTML = '✅ ¡Descargado!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
}

// Función para mostrar QR en grande
function showQR(qrPath, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalCaption = document.getElementById('modalCaption');

    modal.style.display = 'block';
    modalCaption.textContent = caption;

    // Mostrar imagen, ocultar video
    modalVideo.style.display = 'none';
    modalImage.style.display = 'block';
    modalImage.src = qrPath;
}

