document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Animation
    const sweetMessages = [
        "Sending you a kiss! 💋",
        "Sealed with love! ✨",
        "You're the sweetest! 💝",
        "Every kiss is magic! 🌟",
        "Kisses for you! 💫",
        "Love and kisses! 💋"
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

    // Falling Kisses Animation
    function createKiss() {
        const kiss = document.createElement('div');
        kiss.className = 'kiss';
        kiss.textContent = '💋';
        
        kiss.style.left = Math.random() * 100 + 'vw';
        kiss.style.animationDuration = (Math.random() * 3 + 5) + 's'; // Between 5-8s
        kiss.style.opacity = Math.random();
        
        document.querySelector('.kisses-falling').appendChild(kiss);
        
        setTimeout(() => {
            kiss.remove();
        }, 8000);
    }

    // Create kisses periodically
    setInterval(createKiss, 300);

    // Interactive Magic Kiss
    const magicKiss = document.querySelector('.magic-kiss');
    const wishText = document.querySelector('.wish-text');
    
    magicKiss.addEventListener('click', function() {
        this.style.transform = 'scale(1.5) rotate(720deg)';
        wishText.classList.add('show');
        
        setTimeout(() => {
            this.style.transform = '';
            wishText.classList.remove('show');
        }, 3000);
    });

    // Timer Functions
    const timerDisplay = document.getElementById('custom-timer-display');
    const startButton = document.getElementById('start-timer');
    const pauseButton = document.getElementById('pause-timer');
    const resetButton = document.getElementById('reset-timer');
    const setTimerButton = document.getElementById('set-timer');
    const calendarInput = document.getElementById('calendar-input');

    let countdown;
    let remainingTime = 0;

    function timer(seconds) {
        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if(secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }

            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainderSeconds = seconds % 60;
        const display = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerDisplay.textContent = display;
    }

    startButton.addEventListener('click', function() {
        timer(remainingTime);
    });

    pauseButton.addEventListener('click', function() {
        clearInterval(countdown);
        remainingTime = getTimeLeftInSeconds();
    });

    resetButton.addEventListener('click', function() {
        clearInterval(countdown);
        timerDisplay.textContent = '00:00:00';
        remainingTime = 0;
    });

    setTimerButton.addEventListener('click', function() {
        const end = new Date(calendarInput.value).getTime();
        const now = Date.now();
        const difference = Math.round((end - now) / 1000);

        if (difference > 0) {
            timer(difference);
            remainingTime = difference;
        }
    });

    function getTimeLeftInSeconds() {
        const time = timerDisplay.textContent.split(':');
        return (+time[0]) * 3600 + (+time[1]) * 60 + (+time[2]);
    }

    // Background Music Toggle
    const musicButton = document.getElementById('toggle-music');
    const backgroundMusic = document.getElementById('background-music');
    
    musicButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.textContent = '🔇 Pause Music';
        } else {
            backgroundMusic.pause();
            musicButton.textContent = '🎵 Play Music';
        }
    });

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');
    const closeLetter = document.getElementById('close-letter');
    
    loveLetterButton.addEventListener('click', function() {
        loveLetter.classList.toggle('hidden');
    });

    closeLetter.addEventListener('click', function() {
        loveLetter.classList.add('hidden');
    });

    // Initialize
    createKiss();
});
