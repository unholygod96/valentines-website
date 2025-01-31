document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MENU FUNCTIONALITY
    // ======================
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('nav');
    let menuOpen = false;

    menuButton.addEventListener('click', function() {
        menuOpen = !menuOpen;
        nav.classList.toggle('active');
        this.style.transform = menuOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            nav.classList.remove('active');
            menuOpen = false;
            menuButton.style.transform = 'rotate(0deg)';
        }
    });

    // ======================
    // TIMER FUNCTIONALITY
    // ======================
    let timerInterval;
    let endTime;
    const timerElements = {
        display: document.getElementById('custom-timer-display'),
        start: document.getElementById('start-timer'),
        pause: document.getElementById('pause-timer'),
        reset: document.getElementById('reset-timer'),
        set: document.getElementById('set-timer'),
        input: document.getElementById('calendar-input'),
        overlay: document.getElementById('timer-end-overlay'),
        closeOverlay: document.getElementById('close-overlay'),
        header: document.getElementById('overlay-header')
    };

    function updateTimerDisplay(hours, minutes, seconds) {
        timerElements.display.textContent = 
            `${hours.toString().padStart(2, '0')}:` +
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}`;
    }

    function calculateTimeRemaining() {
        const now = Date.now();
        const distance = endTime - now;
        
        return {
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            distance: distance
        };
    }

    function handleTimerCompletion() {
        clearInterval(timerInterval);
        timerElements.display.textContent = "00:00:00";
        showOverlay("Time's up! 🎉");
        createConfettiEffect();
    }

    function updateTimer() {
        const time = calculateTimeRemaining();
        
        if (time.distance < 0) {
            handleTimerCompletion();
            return;
        }
        
        updateTimerDisplay(time.hours, time.minutes, time.seconds);
    }

    function showOverlay(message) {
        timerElements.header.textContent = message;
        timerElements.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function hideOverlay() {
        timerElements.overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function validateDateTime(selectedDate) {
        if (isNaN(selectedDate.getTime()) || selectedDate < Date.now()) {
            alert("Please select a valid future date and time!");
            return false;
        }
        return true;
    }

    timerElements.start.addEventListener('click', function() {
        if (!endTime) return alert("Please set a timer first!");
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    });

    timerElements.pause.addEventListener('click', () => clearInterval(timerInterval));
    
    timerElements.reset.addEventListener('click', function() {
        clearInterval(timerInterval);
        endTime = null;
        timerElements.display.textContent = "00:00:00";
    });

    timerElements.set.addEventListener('click', function() {
        const selectedDate = new Date(timerElements.input.value);
        if (!validateDateTime(selectedDate)) return;
        endTime = selectedDate.getTime();
        updateTimer();
    });

    timerElements.closeOverlay.addEventListener('click', hideOverlay);

    // ======================
    // LOVE LETTER FUNCTIONALITY
    // ======================
    const loveLetter = {
        container: document.getElementById('love-letter'),
        button: document.getElementById('love-letter-button'),
        isOpen: false
    };

    function toggleLoveLetter() {
        loveLetter.isOpen = !loveLetter.isOpen;
        loveLetter.container.classList.toggle('hidden');
        loveLetter.button.style.transform = loveLetter.isOpen ? 
            'rotate(360deg) scale(1.2)' : 
            'rotate(0deg) scale(1)';
    }

    loveLetter.button.addEventListener('click', toggleLoveLetter);

    // Close love letter when clicking outside
    document.addEventListener('click', function(event) {
        if (!loveLetter.container.contains(event.target) && 
            !loveLetter.button.contains(event.target) && 
            loveLetter.isOpen) {
            toggleLoveLetter();
        }
    });

    // ======================
    // MUSIC FUNCTIONALITY
    // ======================
    const music = {
        button: document.getElementById('toggle-music'),
        player: document.getElementById('background-music'),
        isPlaying: false
    };

    function toggleMusic() {
        music.isPlaying = !music.isPlaying;
        music.isPlaying ? music.player.play() : music.player.pause();
        music.button.textContent = music.isPlaying ? '🔊' : '🔇';
        music.button.style.animation = music.isPlaying ? 
            'pulse 1s infinite' : 'none';
    }

    music.button.addEventListener('click', toggleMusic);

    // ======================
    // SPECIAL EFFECTS
    // ======================
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.cssText = `
            left: ${Math.random() * 100}vw;
            animation-duration: ${Math.random() * 3 + 2}s;
            font-size: ${Math.random() * 20 + 15}px;
        `;
        heart.textContent = '❤';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }

    function createConfettiEffect() {
        const colors = ['#ff69b4', '#8b5cf6', '#7c3aed'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    animation: confetti-fall ${Math.random() * 3 + 2}s linear;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }

    // Initialize effects
    setInterval(createHeart, 300);
    document.querySelectorAll('.day-card').forEach(card => {
        card.addEventListener('click', () => createConfettiEffect());
    });

    // ======================
    // ADDITIONAL ANIMATIONS
    // ======================
    const animationKeyframes = {
        pulse: [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.1)', opacity: 0.8 },
            { transform: 'scale(1)', opacity: 1 }
        ],
        confettiFall: {
            transform: 'translateY(-100vh) rotate(720deg)',
            opacity: 1
        }
    };

    const animationTiming = {
        duration: 1000,
        iterations: Infinity
    };

    // Register animations
    document.styleSheets[0].insertRule(`
        @keyframes confetti-fall {
            from { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `);
});
