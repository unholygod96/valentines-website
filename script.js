document.addEventListener('DOMContentLoaded', function() {
    // Valentine's Week Dates
    const valentinesDates = {
        'rose-day': new Date('2025-02-07'),
        'propose-day': new Date('2025-02-08'),
        'chocolate-day': new Date('2025-02-09'),
        'teddy-day': new Date('2025-02-10'),
        'promise-day': new Date('2025-02-11'),
        'hug-day': new Date('2025-02-12'),
        'kiss-day': new Date('2025-02-13'),
        'valentines-day': new Date('2025-02-14')
    };

    // Sweet Messages for Teasing
    const teasingMessages = [
        "Getting impatient, aren't you? 😏",
        "Aww, someone's excited! 🙈",
        "The wait makes it more special! 💝",
        "Patience is sweet, just like you! ✨",
        "Almost there, sweetie! 💫",
        "Good things come to those who wait! 🌟"
    ];

    // Menu Toggle
    document.getElementById('menu-button').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });

    // Access Control Functions
    function checkAccess(pageDate) {
        const today = new Date();
        const hasSpecialAccess = localStorage.getItem('specialAccess') === 'true' &&
                                localStorage.getItem('userEmail') === '23f3000516@ds.study.iitm.ac.in';

        // Full access on Valentine's Day
        if (today >= valentinesDates['valentines-day']) return true;
        
        // Special access check
        if (hasSpecialAccess) return true;

        // Regular date check
        return today >= pageDate;
    }

    function showTeasingPopup() {
        const popup = document.getElementById('access-denied');
        const message = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
        popup.querySelector('p').textContent = message;
        popup.classList.remove('hidden');
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.classList.add('hidden'), 300);
        }, 3000);
    }

    // Update Page Access
    function updatePageAccess() {
        const navLinks = document.querySelectorAll('nav a');
        const dayCards = document.querySelectorAll('.day-card');

        navLinks.forEach(link => {
            const pageName = link.getAttribute('href').split('.')[0];
            const pageDate = valentinesDates[pageName];
            
            if (!checkAccess(pageDate)) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showTeasingPopup();
                });
                link.classList.add('locked');
            } else {
                link.classList.add('unlocked');
            }
        });

        dayCards.forEach(card => {
            const dayName = card.getAttribute('data-day');
            const pageDate = valentinesDates[dayName];
            
            if (!checkAccess(pageDate)) {
                card.classList.add('locked');
                card.addEventListener('click', showTeasingPopup);
            } else {
                card.classList.add('unlocked');
            }
        });
    }

    // Heart Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.querySelector('.hearts').appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }

    setInterval(createHeart, 300);

    // Timer Functionality
    const timerDisplay = document.getElementById('custom-timer-display');
    const timerHeader = document.getElementById('timer-header');
    let timerInterval;
    let endTime;

    // Load saved timer if exists
    const savedEndTime = localStorage.getItem('timerEndTime');
    const savedTimerHeader = localStorage.getItem('timerHeader');

    if (savedEndTime) {
        const now = new Date().getTime();
        const endTime = parseInt(savedEndTime);
        if (endTime > now) {
            customTimerSeconds = Math.floor((endTime - now) / 1000);
            if (savedTimerHeader) {
                timerHeader.textContent = savedTimerHeader;
            }
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    document.getElementById('set-timer').addEventListener('click', function() {
        const input = document.getElementById('calendar-input');
        if (input.value) {
            endTime = new Date(input.value).getTime();
            localStorage.setItem('timerEndTime', endTime.toString());
            localStorage.setItem('timerHeader', timerHeader.textContent);
            startTimer();
            createSparkles(this);
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
            localStorage.removeItem('timerEndTime');
            localStorage.removeItem('timerHeader');
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Timer Controls
    document.getElementById('start-timer').addEventListener('click', function() {
        if (!timerInterval && endTime) {
            startTimer();
            createSparkles(this);
        }
    });

    document.getElementById('pause-timer').addEventListener('click', function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            createSparkles(this);
        }
    });

    document.getElementById('reset-timer').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        endTime = null;
        localStorage.removeItem('timerEndTime');
        localStorage.removeItem('timerHeader');
        timerDisplay.textContent = "00:00:00";
        timerHeader.textContent = "Counting moments until we meet! 💫";
        createSparkles(this);
    });

    // Music Controls
    const musicButton = document.getElementById('toggle-music');
    const backgroundMusic = document.getElementById('background-music');
    
    musicButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            this.textContent = '🎵';
            createSparkles(this);
        } else {
            backgroundMusic.pause();
            this.textContent = '🔇';
        }
    });

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');
    
    loveLetterButton.addEventListener('click', function() {
        loveLetter.classList.toggle('show');
        if (!loveLetter.classList.contains('hidden')) {
            createSparkles(this);
        }
    });

    // Close love letter when clicking outside
    document.addEventListener('click', function(event) {
        if (!loveLetter.contains(event.target) && 
            !loveLetterButton.contains(event.target) && 
            !loveLetter.classList.contains('hidden')) {
            loveLetter.classList.remove('show');
        }
    });

    // Sparkle Effect
    function createSparkles(element) {
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

    // Initialize
    updatePageAccess();
    createHeart();
});
