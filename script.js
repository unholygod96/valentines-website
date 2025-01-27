document.addEventListener('DOMContentLoaded', function() {
    // Access Control Variables
    const specialEmail = '23f3000516@ds.study.iitm.ac.in';
    const valentineWeekDates = {
        'rose-day.html': new Date('2025-02-07'),
        'propose-day.html': new Date('2025-02-08'),
        'chocolate-day.html': new Date('2025-02-09'),
        'teddy-day.html': new Date('2025-02-10'),
        'promise-day.html': new Date('2025-02-11'),
        'hug-day.html': new Date('2025-02-12'),
        'kiss-day.html': new Date('2025-02-13'),
        'valentines-day.html': new Date('2025-02-14')
    };

    // Access Control Functions
    function checkAccess() {
        const hasSpecialAccess = localStorage.getItem('specialAccess') === 'true';
        const userEmail = localStorage.getItem('userEmail');
        
        if (hasSpecialAccess && userEmail === specialEmail) {
            return true;
        }

        const today = new Date();
        const valentineWeekStart = new Date('2025-02-07');
        
        if (today < valentineWeekStart) {
            window.location.href = 'landing.html';
            return false;
        }

        return true;
    }

    function updatePageAccess() {
        if (!checkAccess()) return;

        const today = new Date();
        const navLinks = document.querySelectorAll('nav a');
        const dayCards = document.querySelectorAll('.day-card');

        navLinks.forEach(link => {
            const pageDate = new Date(link.getAttribute('data-date'));
            if (today < pageDate && !hasSpecialAccess()) {
                link.classList.add('locked');
                link.classList.remove('unlocked');
            } else {
                link.classList.add('unlocked');
                link.classList.remove('locked');
            }
        });

        dayCards.forEach(card => {
            const cardDate = new Date(card.getAttribute('data-date'));
            if (today < cardDate && !hasSpecialAccess()) {
                card.classList.add('locked');
                card.classList.remove('unlocked');
            } else {
                card.classList.add('unlocked');
                card.classList.remove('locked');
            }
        });
    }

    function hasSpecialAccess() {
        return localStorage.getItem('specialAccess') === 'true' && 
               localStorage.getItem('userEmail') === specialEmail;
    }

    // Initialize access control
    updatePageAccess();

    // Existing Functionality
    
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
    });

    // Close love letter when clicking outside
    document.addEventListener('click', function(event) {
        if (!loveLetter.contains(event.target) && 
            !loveLetterButton.contains(event.target) && 
            loveLetter.classList.contains('show')) {
            loveLetter.classList.remove('show');
        }
    });

    // Page Navigation Protection
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const pageDate = new Date(this.getAttribute('data-date'));
            const today = new Date();
            
            if (today < pageDate && !hasSpecialAccess()) {
                e.preventDefault();
                showAccessDeniedMessage();
            }
        });
    });

    function showAccessDeniedMessage() {
        const message = document.createElement('div');
        message.className = 'access-denied';
        message.innerHTML = `
            <h3>Access Denied 💝</h3>
            <p>This page will unlock on the special day!</p>
            <button onclick="this.parentElement.remove()">Close</button>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 3000);
    }

    // Check access on page load
    if (!checkAccess()) {
        window.location.href = 'landing.html';
    }
});
