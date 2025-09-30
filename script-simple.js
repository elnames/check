// Script simple para debuggear el botón Empezar
console.log('Script cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    
    const startBtn = document.getElementById('start-btn');
    console.log('Botón encontrado:', startBtn);
    
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón clickeado!');
            
            // Ocultar pantalla de bienvenida
            const welcomeScreen = document.getElementById('welcome-screen');
            if (welcomeScreen) {
                welcomeScreen.classList.remove('active');
                console.log('Pantalla de bienvenida ocultada');
            }
            
            // Mostrar pantalla de preguntas
            const questionsScreen = document.getElementById('questions-screen');
            if (questionsScreen) {
                questionsScreen.classList.add('active');
                console.log('Pantalla de preguntas mostrada');
            }
        });
        
        console.log('Event listener agregado al botón');
    } else {
        console.error('No se encontró el botón start-btn');
    }
});
