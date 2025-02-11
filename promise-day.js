document.addEventListener('DOMContentLoaded', function () {
    // Sweet Messages Animation
    const sweetMessages = [
        "You're sweeter than chocolate! 🍫",
        "Life is delicious with you! ✨",
        "My favorite treat is your smile! 💝",
        "Every moment with you is sweet! 🌟",
        "You melt my heart! 💫",
        "Sweeter than any dessert! 🍫"
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
        "I promise to always stand by your side.",
        "I promise to cherish every moment with you.",
        "I promise to make your happiness my priority.",
        "I promise to grow old with you gracefully.",
        "I promise to never stop learning about you.",
        "I promise to always protect our love.",
        "I promise to be patient and understanding.",
        "I promise to celebrate your successes as my own.",
        "I promise to share all my secrets with you.",
        "I promise to never let go of your hand."
    ];

    promiseJarButton.addEventListener('click', function () {
        // Randomly select a promise
        const randomIndex = Math.floor(Math.random() * promisesList.length);
        const selectedPromise = promisesList[randomIndex];

        // Display the selected promise with animation
        promiseCardContainer.classList.add('reveal');
        
        setTimeout(() => {
            promiseTextElement.textContent = selectedPromise;
            promiseTextElement.classList.add('show');
            
            setTimeout(() => {
                // Hide the card after a few seconds
                promiseCardContainer.classList.remove('reveal');
                promiseTextElement.classList.remove('show');
                setTimeout(() => (promiseTextElement.textContent = ''), 300);
            }, 4000);
            
        }, 500);
    });

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetterContainer = document.getElementById('love-letter');
    const closeLoveLetterButton = document.getElementById('close-letter');

    loveLetterButton.addEventListener('click', function () {
        loveLetterContainer.classList.add('show');
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
});
