document.addEventListener('DOMContentLoaded', function () {
    // Sweet Messages Animation
    const sweetMessages = [
        "You're my greatest love story. ❤️",
        "Every day with you is Valentine's Day. 💖",
        "You make my heart skip a beat. 💓",
        "I love you more than words can say. 🥰",
        "You are my soulmate, my everything. 💋",
        "Forever and always, you're my Valentine. 🌹"
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

    // Timer Functions
    const timerDisplay = document.getElementById('custom-timer-display');
    let timerInterval;
    let endTime;

    document.getElementById('set-timer').addEventListener('click', function () {
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
            timerDisplay.textContent = "It's time for our date! ❤️";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.textContent =
            `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }

    // Interactive Heart
    const bigHeart = document.querySelector('.big-heart');
    const hugMessage = document.getElementById('hug-message');

    bigHeart.addEventListener('click', function () {
        hugMessage.textContent = "Sending you a big virtual hug! 🤗💖";
        bigHeart.style.animation = 'none'; // Stop the heartbeat animation
        void bigHeart.offsetWidth; // Trigger reflow to restart the animation
        bigHeart.style.animation = 'heartbeat 1.5s ease-in-out infinite'; // Restart the animation

        // Change the message back after a few seconds
        setTimeout(() => {
            hugMessage.textContent = "Click the heart to send a virtual hug!";
        }, 3000);
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
