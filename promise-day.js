document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Animation
    const sweetMessages = [
        "I promise to always love you! 💖",
        "Our promises are forever! ✨",
        "I promise to cherish you always! 🤝",
        "Every promise with you is a treasure! 🌟",
        "You're my promise come true! 💫",
        "I promise to be your rock! 💙"
    ];

    const messageElement = document.getElementById('message-display');
    let currentIndex = 0;

    function showMessage() {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageElement.textContent = sweetMessages[currentIndex];
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
            
            currentIndex = (currentIndex + 1) % sweetMessages.length;
            
            setTimeout(showMessage, 3000);
        }, 500);
    }

    // Start message animation
    showMessage();

    // Falling Confetti Animation
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = '💖';
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const duration = 7 + Math.random() * 5;
        confetti.style.animationDuration = `${duration}s`;
        
        document.querySelector('.confetti-falling').appendChild(confetti);
        
        setTimeout(() => confetti.remove(), duration * 1000);
    }

    // Create confetti periodically
    setInterval(createConfetti, 500);

    // Interactive Promise Cards
    const promiseCards = document.querySelectorAll('.promise-card');
    
    promiseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createCardSparkles(this);
        });

        card.addEventListener('mouseleave', function() {
            // Remove any remaining sparkles
            const sparkles = this.querySelectorAll('.sparkle');
            sparkles.forEach(sparkle => sparkle.remove());
        });
    });

    // Create Card Sparkles
    function createCardSparkles(element) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 500 + 'ms';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Sweet Memories Animation
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            createMemorySparkles(this);
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Create Memory Sparkles
    function createMemorySparkles(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Interactive Magic Promise
    const magicPromise = document.querySelector('.magic-promise');
    const promiseText = document.querySelector('.promise-text');
    
    magicPromise.addEventListener('click', function() {
        this.style.transform = 'scale(1.5) rotate(720deg)';
        createMagicSparkles(this);
        
        setTimeout(() => {
            promiseText.classList.remove('hidden');
            promiseText.classList.add('show');
        }, 500);

        setTimeout(() => {
            this.style.transform = '';
            promiseText.classList.remove('show');
            setTimeout(() => promiseText.classList.add('hidden'), 300);
        }, 3000);
    });

    // Create Magic Sparkles
    function createMagicSparkles(element) {
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = 50 + (Math.random() - 0.5) * 100 + '%';
            sparkle.style.top = 50 + (Math.random() - 0.5) * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Sweet Notes Hover Effect
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener('mouseenter', function() {
            this.style.transform = `scale(1.1) rotate(${Math.random() * 10 - 5}deg)`;
            createNoteSparkles(this);
        });

        note.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Create Note Sparkles
    function createNoteSparkles(element) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');
    const closeLetter = document.getElementById('close-letter');
    
    loveLetterButton.addEventListener('click',
