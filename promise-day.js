document.addEventListener('DOMContentLoaded', function () {
    // Promise Day related messages
    const promiseDayMessages = [
        "Every promise strengthens our bond! 💖",
        "Our love is built on promises kept! 🤝",
        "Promises are the foundation of our future! ✨",
        "Each day with you is a promise of forever! 💑",
        "Our promises are the threads of our love story! 📖",
        "Together, we promise a lifetime of happiness! 🌟"
    ];

    const messageElement = document.getElementById('message-display');
    let currentIndex = 0;

    function showMessage() {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';

        setTimeout(() => {
            messageElement.textContent = promiseDayMessages[currentIndex];
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';

            currentIndex = (currentIndex + 1) % promiseDayMessages.length;

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

    // Memory Cards Animation
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            createMemorySparkles(this);
        });

        card.addEventListener('mouseleave', function () {
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

    // Promise Jar Functionality
    const promiseJarButton = document.getElementById('promise-jar-button');
    const promiseCardContainer = document.getElementById('promise-card-container');
    const promiseTextElement = document.getElementById('promise-text');

    const promisesList = [
        "I promise to always listen to you.",
        "I promise to be your biggest cheerleader.",
        "I promise to make you laugh every day.",
        "I promise to support your dreams.",
        "I promise to always be honest with you.",
        "I promise to hold your hand through tough times.",
        "I promise to love you unconditionally.",
        "I promise to never take you for granted.",
        "I promise to always respect your opinions.",
        "I promise to surprise you with little joys.",
        "I promise to be patient and understanding.",
        "I promise to grow with you.",
        "I promise to be your partner in all of life's adventures.",
        "I promise to comfort you in times of sorrow.",
        "I promise to celebrate your successes.",
        "I promise to be your safe haven.",
        "I promise to always communicate openly with you.",
        "I promise to work through challenges together.",
        "I promise to keep the romance alive.",
        "I promise to be your best friend and lover."
    ];

    promiseJarButton.addEventListener('click', function () {
        // Randomly select a promise
        const randomIndex = Math.floor(Math.random() * promisesList.length);
        const selectedPromise = promisesList[randomIndex];

        // Display the selected promise with animation
        promiseCardContainer.classList.add('open');
        
        setTimeout(() => {
            promiseTextElement.textContent = selectedPromise;
            promiseTextElement.classList.add('show');
            
            setTimeout(() => {
                // Close the paper after 7 seconds
                promiseCardContainer.classList.remove('open');
                promiseCardContainer.classList.add('close');
                
                setTimeout(() => {
                    promiseTextElement.classList.remove('show');
                    promiseCardContainer.classList.remove('close');
                    promiseTextElement.textContent = '';
                }, 500);
            }, 7000);
            
        }, 500);
    });

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetterContainer = document.getElementById('love-letter-container');
    const closeLoveLetterButton = document.getElementById('close-letter');

    loveLetterButton.addEventListener('click', function () {
        loveLetterContainer.classList.toggle('show');
    });

    closeLoveLetterButton.addEventListener('click', function () {
        loveLetterContainer.classList.remove('show');
    });

    // Close letter when clicking outside
    document.addEventListener('click', function (event) {
        if (!loveLetterContainer.contains(event.target) &&
            !loveLetterButton.contains(event.target) &&
            loveLetterContainer.classList.contains('show')) {
            loveLetterContainer.classList.remove('show');
        }
    });

    // Background Music Toggle
    const musicButton = document.getElementById('toggle-music');
    const backgroundMusic = document.getElementById('background-music');

    musicButton.addEventListener('click', function () {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicButton.textContent = '🔇';
        }
    });

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

    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00:00";
        endTime = null;
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's Up! 💖";
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});
