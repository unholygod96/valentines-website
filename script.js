document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('nav');
    let menuOpen = false;

    menuButton.addEventListener('click', function() {
        menuOpen = !menuOpen;
        nav.classList.toggle('active');
        this.style.transform = menuOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            nav.classList.remove('active');
            menuOpen = false;
            menuButton.style.transform = 'rotate(0deg)';
        }
    });

    // Timer Functionality
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

    // Love Letter Functionality
    const loveLetterContainer = document.getElementById('love-letter-container');
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');

    function createFloatingHearts() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '❤️';
                heart.style.left = `${Math.random() * 80 + 10}%`;
                heart.style.animation = `floatUp ${Math.random() * 2 + 2}s ease-in`;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 300);
        }
    }

    function toggleLoveLetter() {
        loveLetterContainer.classList.toggle('open');
        loveLetter.classList.toggle('hidden');
        
        if (loveLetterContainer.classList.contains('open')) {
            createFloatingHearts();
        }
    }

    loveLetterButton.addEventListener('click', toggleLoveLetter);

    document.addEventListener('click', function(event) {
        if (!loveLetter.contains(event.target) && 
            !loveLetterButton.contains(event.target) &&
            !loveLetter.classList.contains('hidden')) {
            toggleLoveLetter();
        }
    });

    // Music Control
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

    // Special Effects
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

    // Initialize Effects
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        heart.textContent = '❤';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);

    // Animation Definitions
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti-fall {
            from { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
});
