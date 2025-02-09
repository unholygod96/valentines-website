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

    //Memory Cards Animation
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

    //Interactive Teddy Animation
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

    //Love Letter Toggle
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

    //Timer Functions
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

    // Build-a-Bear Functionality
    const bearCanvas = document.getElementById('bearCanvas');
    const ctx = bearCanvas.getContext('2d');
    let currentBearConfig = {};

    function drawBear(config) {
        // Clear the canvas
        ctx.clearRect(0, 0, bearCanvas.width, bearCanvas.height);

        // Default configurations
        const defaultFurColor = '#8B4513'; // Brown
        const defaultEyeColor = 'black';
        const defaultClothing = 'none';
        const defaultAccessories = 'none';
        const defaultExpression = 'smile';
        const defaultAnimation = 'none';

        // Use provided configurations or defaults
        const furColor = config.furColor || defaultFurColor;
        const eyeColor = config.eyeColor || defaultEyeColor;
        const clothing = config.clothing || defaultClothing;
        const accessories = config.accessories || defaultAccessories;
        const expression = config.expression || defaultExpression;
        const animation = config.animation || defaultAnimation;

       // Function to draw a rounded rectangle
        function roundedRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.fill();
        }

        // Body
        ctx.fillStyle = furColor;
        roundedRect(ctx, 70, 150, 160, 180, 30);

        // Head
        ctx.fillStyle = furColor;
        roundedRect(ctx, 80, 30, 140, 130, 40);

        // Ears
        ctx.fillStyle = furColor;
        ctx.beginPath();
        ctx.arc(50, 50, 20, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(250, 50, 20, 0, 2 * Math.PI);
        ctx.fill();

        // Eyes
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(120, 70, 7, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(180, 70, 7, 0, 2 * Math.PI);
        ctx.fill();

        // Nose
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(150, 110, 8, 5, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Mouth (Expressions)
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (expression === 'smile') {
            ctx.arc(150, 130, 15, 0, Math.PI / 2, false);
        } else if (expression === 'sad') {
            ctx.arc(150, 150, 15, Math.PI, Math.PI / 2 * 3, false);
        } else if (expression === 'love') {
            ctx.moveTo(140, 130);
            ctx.quadraticCurveTo(150, 140, 160, 130);
        }
        ctx.stroke();

         // Clothing
        if (clothing === 'hat') {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.ellipse(150, 30, 20, 10, 0, 0, Math.PI);
            ctx.fill();
        } else if (clothing === 'shirt') {
            ctx.fillStyle = 'blue';
            roundedRect(ctx, 80, 200, 140, 50, 10);
        }

        // Accessories
        if (accessories === 'scarf') {
            ctx.fillStyle = 'purple';
            ctx.fillRect(80, 200, 140, 10);
        }

         // Animations (Simple Example)
        if (animation === 'wave') {
            // Waving paw
            ctx.beginPath();
            ctx.arc(50, 170, 10, 0.5 * Math.PI, 1.5 * Math.PI);
            ctx.stroke();
        }
    }

     // Function to download data to a file
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Event listeners for customization options
    document.getElementById('customizeButton').addEventListener('click', function() {
        currentBearConfig = {
            furColor: document.getElementById('furColor').value,
            eyeColor: document.getElementById('eyeColor').value,
            clothing: document.getElementById('clothing').value,
            accessories: document.getElementById('accessories').value,
            expression: document.getElementById('expression').value,
            animation: document.getElementById('animation').value
        };
        drawBear(currentBearConfig);
        saveBearConfig(); // Save the configuration after customizing
    });

    document.getElementById('submit-wish').addEventListener('click', function() {
        const wishInput = document.getElementById('wish-input');
        const wishText = wishInput.value;

        // Send the wish to the email address
        sendWishEmail(wishText);

        // Clear the input field
        wishInput.value = '';

        // Show a confirmation message or perform any other actions
        alert('Your wish has been sent!');
    });

    function sendWishEmail(wishText) {
        // Construct the email body
        const emailBody = `Wish: ${wishText}`;

        // Construct the mailto link
        const mailtoLink = `mailto:kautikshende@gmail.com?subject=New Wish&body=${encodeURIComponent(emailBody)}`;

        // Open the mail client in a new tab
        window.open(mailtoLink, '_blank');
    }

    // Local PC Storage
    document.getElementById('saveButton').addEventListener('click', function() {
        const bearData = JSON.stringify(currentBearConfig);
        download('bear_config.txt', bearData);
    });

    // Persistent saving to localStorage
    function saveBearConfig() {
        localStorage.setItem('bearConfig', JSON.stringify(currentBearConfig));
    }

    function loadBearConfig() {
        const storedConfig = localStorage.getItem('bearConfig');
        if (storedConfig) {
            currentBearConfig = JSON.parse(storedConfig);
            // Set select values to match stored config
            document.getElementById('furColor').value = currentBearConfig.furColor || '#8B4513';
            document.getElementById('eyeColor').value = currentBearConfig.eyeColor || 'black';
            document.getElementById('clothing').value = currentBearConfig.clothing || 'none';
            document.getElementById('accessories').value = currentBearConfig.accessories || 'none';
            document.getElementById('expression').value = currentBearConfig.expression || 'smile';
            document.getElementById('animation').value = currentBearConfig.animation || 'none';

            drawBear(currentBearConfig);
        }
    }

    // Add more colors to select options
    const furColorSelect = document.getElementById('furColor');
    const colors = ['#8B4513', '#FFFFFF', '#FFC0CB', '#ADD8E6', '#FFFF00', '#800080', '#808080', '#FFA500', '#008000'];

    colors.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.text = color;
        furColorSelect.add(option);
    });

    // Initialize
    loadBearConfig(); // Call loadBearConfig to load saved configuration on page load
    createTeddy();
    showMessage();
});
