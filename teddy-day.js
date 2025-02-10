document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Animation
    const sweetMessages = [
        "You're as cuddly as a teddy! 🧸",
        "Life is cozy with you! ✨",
        "My favorite hug is yours! 💝",
        "Every moment with you is warm! 🌟",
        "You make my heart feel safe! 💫",
        "The best part of my day is you! 🧸"
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

    // Interactive Teddy Animation
    const magicTeddy = document.querySelector('.magic-teddy');
    const wishText = document.querySelector('.wish-text');

    magicTeddy.addEventListener('click', function() {
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

    // ==============================
    // Build-a-Bear Functionality (Animated Version)
    // ==============================
    const bearCanvas = document.getElementById('bearCanvas');
    const ctx = bearCanvas.getContext('2d');
    let currentBearConfig = {
        furColor: '#8B4513',
        eyeColor: 'black',
        clothing: 'none',
        accessories: 'none',
        expression: 'smile',
        animation: 'none'
    };

    // Helper function to draw a rounded rectangle.
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
        ctx.fill();
    }

    // Draw the bear with the current configuration and current time for animation.
    function drawBear(config, time) {
        ctx.clearRect(0, 0, bearCanvas.width, bearCanvas.height);

        const furColor = config.furColor || '#8B4513';
        const eyeColor = config.eyeColor || 'black';
        const clothing = config.clothing || 'none';
        const accessories = config.accessories || 'none';
        const expression = config.expression || 'smile';
        const animation = config.animation || 'none';

        // Draw Body with a gradient for extra appeal.
        const bodyGradient = ctx.createLinearGradient(70, 150, 230, 330);
        bodyGradient.addColorStop(0, furColor);
        bodyGradient.addColorStop(1, '#FFFFFF');
        ctx.fillStyle = bodyGradient;
        drawRoundedRect(ctx, 70, 150, 160, 180, 30);

        // Draw Head.
        ctx.fillStyle = furColor;
        drawRoundedRect(ctx, 80, 30, 140, 130, 40);

        // Draw Ears.
        ctx.fillStyle = furColor;
        ctx.beginPath();
        ctx.arc(50, 50, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(250, 50, 20, 0, 2 * Math.PI);
        ctx.fill();

        // Draw Eyes.
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(120, 70, 7, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(180, 70, 7, 0, 2 * Math.PI);
        ctx.fill();

        // Draw Nose.
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(150, 110, 8, 5, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Draw Mouth (with basic expressions).
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (expression === 'smile') {
            ctx.arc(150, 130, 15, 0, Math.PI, false);
        } else if (expression === 'sad') {
            ctx.arc(150, 145, 15, Math.PI, 2 * Math.PI, false);
        } else if (expression === 'love') {
            ctx.moveTo(140, 130);
            ctx.quadraticCurveTo(150, 140, 160, 130);
        }
        ctx.stroke();

        // Draw Clothing.
        if (clothing === 'hat') {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.ellipse(150, 30, 20, 10, 0, 0, Math.PI);
            ctx.fill();
        } else if (clothing === 'shirt') {
            ctx.fillStyle = 'blue';
            drawRoundedRect(ctx, 80, 200, 140, 50, 10);
        }

        // Draw Accessories.
        if (accessories === 'scarf') {
            ctx.fillStyle = 'purple';
            ctx.fillRect(80, 200, 140, 10);
        }

        // Animated Feature: Waving Paw.
        if (animation === 'wave') {
            const waveAngle = Math.sin(time / 500) * (Math.PI / 8); // Oscillates between ±22.5°
            ctx.save();
            ctx.translate(90, 200); // Pivot point.
            ctx.rotate(waveAngle);
            ctx.fillStyle = furColor;
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        } else {
            // Draw fixed-position paw.
            ctx.fillStyle = furColor;
            ctx.beginPath();
            ctx.arc(90, 200, 12, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Animation loop.
    function animateBear(time) {
        drawBear(currentBearConfig, time);
        requestAnimationFrame(animateBear);
    }
    requestAnimationFrame(animateBear);

    // Update configuration immediately when any option changes.
    const customizationElements = ['furColor', 'eyeColor', 'clothing', 'accessories', 'expression', 'animation'];
    customizationElements.forEach(id => {
        document.getElementById(id).addEventListener('change', function() {
            currentBearConfig[id] = this.value;
            saveBearConfig();
        });
    });

    // "Customize Teddy" button also updates all settings.
    document.getElementById('customizeButton').addEventListener('click', function() {
        currentBearConfig = {
            furColor: document.getElementById('furColor').value,
            eyeColor: document.getElementById('eyeColor').value,
            clothing: document.getElementById('clothing').value,
            accessories: document.getElementById('accessories').value,
            expression: document.getElementById('expression').value,
            animation: document.getElementById('animation').value
        };
        saveBearConfig();
    });

    // Save the bear configuration persistently.
    function saveBearConfig() {
        localStorage.setItem('bearConfig', JSON.stringify(currentBearConfig));
    }

    // Load saved bear configuration.
    function loadBearConfig() {
        const storedConfig = localStorage.getItem('bearConfig');
        if (storedConfig) {
            currentBearConfig = JSON.parse(storedConfig);
            customizationElements.forEach(id => {
                document.getElementById(id).value = currentBearConfig[id] || document.getElementById(id).value;
            });
        }
    }
    loadBearConfig();
});
