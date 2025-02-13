document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Animation
    const sweetMessages = [
        "Sending you a kiss! 💋",
        "Sealed with love! ✨",
        "You're the sweetest! 💝",
        "Every kiss is magic! 🌟",
        "Kisses for you! 💫",
        "Love and kisses! 💋"
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

    // Falling Kisses Animation
    function createKiss() {
        const kiss = document.createElement('div');
        kiss.className = 'kiss';
        kiss.textContent = '💋';
        
        kiss.style.left = Math.random() * 100 + 'vw';
        kiss.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const duration = 7 + Math.random() * 5;
        kiss.style.animationDuration = `${duration}s`;
        
        document.querySelector('.kisses-falling').appendChild(kiss);
        
        setTimeout(() => kiss.remove(), duration * 1000);
    }

    // Create kisses periodically
    setInterval(createKiss, 500);

    // Interactive Magic Kiss
    const magicKiss = document.querySelector('.magic-kiss');
    const wishText = document.querySelector('.wish-text');
    
    magicKiss.addEventListener('click', function() {
        this.style.transform = 'scale(1.5) rotate(720deg)';
        createMagicSparkles(this);
        
        setTimeout(() => {
            wishText.classList.remove('hidden');
            wishText.classList.add('show');
        }, 500);

        setTimeout(() => {
            this.style.transform = '';
            wishText.classList.remove('show');
            setTimeout(() => wishText.classList.add('hidden'), 300);
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
    
    loveLetterButton.addEventListener('click', function() {
        loveLetter.classList.add('show');
        createLetterSparkles(loveLetter);
    });

    closeLetter.addEventListener('click', function() {
        loveLetter.classList.remove('show');
    });

    // Close letter when clicking outside
    document.addEventListener('click', function(event) {
        if (!loveLetter.contains(event.target) && 
            !loveLetterButton.contains(event.target) && 
            loveLetter.classList.contains('show')) {
            loveLetter.classList.remove('show');
        }
    });

    // Create Letter Sparkles
    function createLetterSparkles(element) {
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Background Music Toggle
    const musicButton = document.getElementById('toggle-music');
    const backgroundMusic = document.getElementById('background-music');
    
    musicButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicButton.textContent = '🔇';
        }
    });

    // Timer Functions
    const timerDisplay = document.getElementById('custom-timer-display');
    const timerHeader = document.getElementById('timer-header');
    let timerInterval;
    let endTime;

    document.getElementById('set-timer').addEventListener('click', function() {
        const input = document.getElementById('calendar-input');
        if (input.value) {
            endTime = new Date(input.value).getTime();
            startTimer();
        }
    });

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's Up! 💝";
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Initialize
    createKiss();
    showMessage();
});
