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
        // Add more promises here...
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
});
