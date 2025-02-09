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
        const defaultFurColor = 'lightBrown';
        const defaultEyeColor = 'black';

        // Use provided configurations or defaults
        const furColor = config.furColor || defaultFurColor;
        const eyeColor = config.eyeColor || defaultEyeColor;

        // Draw the bear head and body
        ctx.fillStyle = furColor;
        ctx.beginPath();
        // Head
        ctx.ellipse(150, 130, 60, 70, 0, 0, 2 * Math.PI);
        // Body
        ctx.ellipse(150, 270, 70, 90, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Draw the ears
        ctx.fillStyle = furColor;
        ctx.beginPath();
        ctx.arc(90, 90, 20, 0, 2 * Math.PI);  // Left ear
        ctx.arc(210, 90, 20, 0, 2 * Math.PI); // Right ear
        ctx.fill();

        // Draw the eyes
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(120, 120, 8, 0, 2 * Math.PI); // Left eye
        ctx.arc(180, 120, 8, 0, 2 * Math.PI); // Right eye
        ctx.fill();

        // Draw the nose
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(150, 170, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Smile
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(150, 190, 30, 0, Math.PI);
        ctx.stroke();

        // Add paws
        ctx.fillStyle = furColor;
        ctx.beginPath();
        ctx.arc(80, 300, 20, 0, 2 * Math.PI);  // Left paw
        ctx.arc(220, 300, 20, 0, 2 * Math.PI); // Right paw
        ctx.fill();
    }

    // Initial draw
    drawBear(currentBearConfig);

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

    // Placeholder for Google Drive integration
    document.getElementById('saveButton').addEventListener('click', function() {
        // **IMPORTANT:** Replace this with actual Google Drive API code
        // 1. Authenticate with Google Drive API
        // 2. Convert bear configuration to JSON
        // 3. Upload JSON to Google Drive
        // 4. Store the Google Drive link somewhere (e.g., local storage)
        const bearData = JSON.stringify(currentBearConfig);
        console.log("Saving bear configuration:", bearData);
        alert("Saving to Google Drive (Not fully implemented). Check console for data.");
        // Placeholder for storing the configuration
        localStorage.setItem('savedBear', bearData);
    });

    // Check if there's a saved bear configuration
    const savedBearData = localStorage.getItem('savedBear');
    if (savedBearData) {
        currentBearConfig = JSON.parse(savedBearData);
        drawBear(currentBearConfig);
    }

    // Additional comforting lines
    const additionalComfortingLines = [
        "A teddy is a hug made lovable.",
        "May your day be filled with bear hugs and sweet moments.",
        "Sending you a teddy and all my love."
    ];

    // Function to add more comforting lines dynamically
    function addComfortingLines(lines) {
        const sweetMemoriesSection = document.querySelector('.sweet-memories .memory-container');
        lines.forEach(line => {
            const memoryCard = document.createElement('div');
            memoryCard.className = 'memory-card';
            memoryCard.innerHTML = `
                <h3>A Teddy to Remind You of My Love</h3>
                <p>${line}</p>
            `;
            sweetMemoriesSection.appendChild(memoryCard);
        });
    }

    // Call the function to add the lines
    addComfortingLines(additionalComfortingLines);

    //Initialize
    createTeddy();
    showMessage();
});
