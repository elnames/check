// Variables globales
let currentScreen = 'welcome';
let currentQuestionIndex = 0;

// Preguntas románticas sobre su historia
const questions = [
    {
        title: "Para continuar, necesito que recuerdes...",
        hint: "¿Cuál fue el primer lugar donde fuimos a comer juntos? 🤔",
        answers: ['tio tomate', 'tiotomate', 'Tio tomate', 'Tiotomate', 'gabimusic', 'Gabimusic', 'GABIMUSIC', 'Tío tomate', 'tío tomate', 'Tíotomate']
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

// Variables para elementos del DOM
let screens = {};
let elements = {};

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

        // Efectos especiales según la pantalla
        if (screenName === 'questions') {
            loadCurrentQuestion();
        } else if (screenName === 'reveal') {
            createConfetti();
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

// Utilidad para normalizar texto (minúsculas, sin acentos ni símbolos)
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
}

// Función para validar respuestas
function validateAnswer() {
    const rawAnswer = elements.questionInput.value.trim();
    const userAnswer = rawAnswer.toLowerCase();
    const normalizedAnswer = normalizeText(rawAnswer);
    const currentQuestion = questions[currentQuestionIndex];

    // Atajo: si en la primera pregunta escriben "gabimusic" (en cualquier variante), ir directo a entradas
    if (currentQuestionIndex === 0 && normalizedAnswer === 'gabimusic') {
        showScreen('tickets');
        return;
    }
    
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
        elements.questionInput.addEventListener('keypress', function(e) {
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

    // Botón de confirmación
    if (elements.yesBtn) {
        elements.yesBtn.addEventListener('click', (e) => {
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
        });
    }

    // Modal event listeners
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    console.log('Todos los event listeners configurados');
});
