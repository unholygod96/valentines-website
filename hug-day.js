document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Animation
    const sweetMessages = [
        "Sending you a warm hug! 🤗",
        "You're my favorite hug! 💖",
        "Life is better with your hugs! ✨",
        "Every moment with you is a warm embrace! 🌟",
        "You make my heart smile! 💫",
        "Hugging you is the best feeling! 🤗"
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

    // Falling Teddies Animation
    function createTeddy() {
        const teddy = document.createElement('div');
        teddy.className = 'teddy';
        teddy.textContent = '🧸';
        
        teddy.style.left = Math.random() * 100 + 'vw';
        teddy.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const duration = 7 + Math.random() * 5;
        teddy.style.animationDuration = `${duration}s`;
        
        document.querySelector('.teddies-falling').appendChild(teddy);
        
        setTimeout(() => teddy.remove(), duration * 1000);
    }

    // Create teddies periodically
    setInterval(createTeddy, 500);

    // Interactive Hug Box
    const hugPieces = document.querySelectorAll('.hug-piece');
    
    hugPieces.forEach(piece => {
        piece.addEventListener('mouseenter', function() {
            createHugSparkles(this);
        });

        piece.addEventListener('mouseleave', function() {
            // Remove any remaining sparkles
            const sparkles = this.querySelectorAll('.sparkle');
            sparkles.forEach(sparkle => sparkle.remove());
        });
    });

    // Create Hug Sparkles
    function createHugSparkles(element) {
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

    // Memory Cards Animation
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

    // Interactive Magic Hug
    const magicHug = document.querySelector('.magic-hug');
    const wishText = document.querySelector('.wish-text');
    
    magicHug.addEventListener('click', function() {
        this.style.transform = 'scale(1.5) rotate(360deg)';
        wishText.classList.add('show');
        
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
            wishText.classList.remove('show');
        }, 3000);
    });

    // Love Letter Animation
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');
    const closeLetter = document.getElementById('close-letter');

    loveLetterButton.addEventListener('click', function() {
        loveLetter.classList.add('show');
    });

    closeLetter.addEventListener('click', function() {
        loveLetter.classList.remove('show');
    });

    // Background Music
    const musicButton = document.getElementById('toggle-music');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    musicButton.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicButton.textContent = '🔇';
        } else {
            backgroundMusic.play();
            musicButton.textContent = '🎵';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Custom Timer Functionality
    const timerDisplay = document.getElementById('custom-timer-display');
    const startButton = document.getElementById('start-timer');
    const pauseButton = document.getElementById('pause-timer');
    const resetButton = document.getElementById('reset-timer');
    const setTimerButton = document.getElementById('set-timer');
    const calendarInput = document.getElementById('calendar-input');

    let countdown;
    let remainingTime = 0;
    let isTimerRunning = false;

    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            countdown = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(countdown);
        isTimerRunning = false;
    }

    function resetTimer() {
        clearInterval(countdown);
        isTimerRunning = false;
        remainingTime = 0;
        updateTimerDisplay();
    }

    function updateTimer() {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimerDisplay();
        } else {
            clearInterval(countdown);
            isTimerRunning = false;
        }
    }

    function updateTimerDisplay() {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    function setCustomTimer() {
        const selectedDate = new Date(calendarInput.value);
        const now = new Date();
        const timeDifference = selectedDate - now;
        
        if (timeDifference > 0) {
            remainingTime = Math.floor(timeDifference / 1000);
            updateTimerDisplay();
        } else {
            alert('Please select a future date and time.');
        }
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    setTimerButton.addEventListener('click', setCustomTimer);

    // Menu Button Functionality
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('nav');

    loveLetterButton.addEventListener('click', function() {
        console.log("Love letter button clicked!");  // Add this line
        loveLetter.classList.add('show');
    });


    menuButton.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
});
