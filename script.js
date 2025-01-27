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

    // Teasing Messages
    const teasingMessages = [
        "Getting impatient, aren't you? 😏",
        "Aww, someone's excited! 🙈",
        "The wait makes it more special! 💝",
        "Patience is sweet, just like you! ✨",
        "Almost there, sweetie! 💫",
        "Good things come to those who wait! 🌟"
    ];

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
        const popup = document.createElement('div');
        popup.className = 'tease-popup';
        const randomMessage = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
        
        popup.innerHTML = `
            <h3>Hey Sweetie! 💝</h3>
            <p>${randomMessage}</p>
            <button onclick="this.parentElement.remove()">Okay, I'll wait! 🥰</button>
        `;
        
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
        
        // Remove popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
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
                updateCountdown(card, pageDate);
            } else {
                card.classList.add('unlocked');
            }
        });
    }

    // Countdown Timer
    function updateCountdown(element, unlockDate) {
        const countdownDiv = document.createElement('div');
        countdownDiv.className = 'countdown';
        element.appendChild(countdownDiv);

        function updateTimer() {
            const now = new Date();
            const distance = unlockDate - now;

            if (distance <= 0) {
                element.classList.remove('locked');
                element.classList.add('unlocked');
                countdownDiv.remove();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            countdownDiv.textContent = `Unlocks in: ${days}d ${hours}h`;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Sparkle Effect
    function createSparkles(element) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
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

    // Music Controls
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

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');
    
    loveLetterButton.addEventListener('click', function() {
        loveLetter.classList.toggle('show');
        if (!loveLetter.classList.contains('hidden')) {
            createSparkles(loveLetter);
        }
    });

    // Initialize
    updatePageAccess();
    
    // Check for Valentine's Day
    const today = new Date();
    if (today >= valentinesDates['valentines-day']) {
        document.body.classList.add('valentines-day');
    }
});
