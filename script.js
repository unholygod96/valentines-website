document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menu-button").addEventListener("click", function () {
        document.querySelector("nav").classList.toggle("active");
    });

    // Love Letter Button with Cute Animation
    document.getElementById("love-letter-button").addEventListener("click", function () {
        const letter = document.getElementById("love-letter");
        if (letter.classList.contains("hidden")) {
            letter.classList.remove("hidden");
            this.innerHTML = "ðŸ’Œâœ¨";
            // Add sparkle effect
            createSparkles(this);
        } else {
            letter.classList.add("hidden");
            this.innerHTML = "ðŸ’Œ";
        }
    });

    // Sparkle Effect Function
    function createSparkles(element) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 60 + 'px';
            sparkle.style.top = Math.random() * 60 + 'px';
            sparkle.style.animationDelay = Math.random() * 1000 + 'ms';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Custom Timer with localStorage persistence
    let customTimerInterval = null;
    let customTimerSeconds = 0;

    // Check if there's a saved timer when page loads
    const savedEndTime = localStorage.getItem("timerEndTime");
    const savedTimerHeader = localStorage.getItem("timerHeader");
    if (savedEndTime) {
        const now = new Date().getTime();
        const endTime = parseInt(savedEndTime);
        if (endTime > now) {
            customTimerSeconds = Math.floor((endTime - now) / 1000);
            if (savedTimerHeader) {
                document.getElementById("timer-header").textContent = savedTimerHeader;
            }
            updateCustomTimer();
            customTimerInterval = setInterval(updateCustomTimer, 1000);
        } else {
            localStorage.removeItem("timerEndTime");
            localStorage.removeItem("timerHeader");
        }
    }

    function updateCustomTimer() {
        if (customTimerSeconds <= 0) {
            clearInterval(customTimerInterval);
            customTimerInterval = null;
            localStorage.removeItem("timerEndTime");
            localStorage.removeItem("timerHeader");
            
            const customHeader = document.getElementById("timer-header").textContent;
            const overlay = document.getElementById("timer-end-overlay");
            const overlayHeader = document.getElementById("overlay-header");
            overlayHeader.textContent = customHeader;
            overlay.classList.remove("hidden");
            overlay.classList.add("show");
            
            // Add celebration effects
            createCelebration();
            return;
        }

        const hours = Math.floor(customTimerSeconds / 3600);
        const minutes = Math.floor((customTimerSeconds % 3600) / 60);
        const seconds = customTimerSeconds % 60;

        document.getElementById("custom-timer-display").textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        customTimerSeconds--;
    }

    // Celebration Effects
    function createCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        document.body.appendChild(celebration);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            celebration.appendChild(confetti);
        }

        setTimeout(() => celebration.remove(), 5000);
    }

    // Timer Buttons
    document.getElementById("start-timer").addEventListener("click", function () {
        if (!customTimerInterval && customTimerSeconds > 0) {
            customTimerInterval = setInterval(updateCustomTimer, 1000);
            createSparkles(this);
        }
    });

    document.getElementById("pause-timer").addEventListener("click", function () {
        if (customTimerInterval) {
            clearInterval(customTimerInterval);
            customTimerInterval = null;
            const now = new Date().getTime();
            const endTime = now + (customTimerSeconds * 1000);
            localStorage.setItem("timerEndTime", endTime.toString());
            createSparkles(this);
        }
    });

    document.getElementById("reset-timer").addEventListener("click", function () {
        clearInterval(customTimerInterval);
        customTimerInterval = null;
        customTimerSeconds = 0;
        localStorage.removeItem("timerEndTime");
        localStorage.removeItem("timerHeader");
        document.getElementById("custom-timer-display").textContent = "00:00:00";
        
        const timerContainer = document.getElementById("timer-container");
        const timerHeader = document.getElementById("timer-header");
        timerHeader.textContent = "Counting moments until I see you! ðŸ’«";
        Array.from(timerContainer.children).forEach(child => {
            child.style.display = '';
        });
        createSparkles(this);
    });

    document.getElementById("set-timer").addEventListener("click", function () {
        const calendarInput = document.getElementById("calendar-input");
        const calendarValue = calendarInput.value;

        if (calendarValue) {
            const targetDate = new Date(calendarValue);
            const now = new Date();
            customTimerSeconds = Math.floor((targetDate - now) / 1000);
            if (customTimerSeconds > 0) {
                localStorage.setItem("timerEndTime", targetDate.getTime().toString());
                localStorage.setItem("timerHeader", document.getElementById("timer-header").textContent);
                updateCustomTimer();
                if (!customTimerInterval) {
                    customTimerInterval = setInterval(updateCustomTimer, 1000);
                }
                createSparkles(this);
            }
        }
    });

    // Close Overlay Button
    document.getElementById("close-overlay").addEventListener("click", function() {
        const overlay = document.getElementById("timer-end-overlay");
        overlay.classList.remove("show");
        overlay.classList.add("hidden");
        
        const timerContainer = document.getElementById("timer-container");
        const timerHeader = document.getElementById("timer-header");
        timerHeader.textContent = "Set another special moment! ðŸ’«";
        Array.from(timerContainer.children).forEach(child => {
            child.style.display = '';
        });
        createSparkles(this);
    });

    // Background Music Control with Cute Toggle
    const audioElement = document.getElementById("background-music");
    const musicButton = document.getElementById("toggle-music");
    
    musicButton.addEventListener("click", function () {
        if (audioElement.paused) {
            audioElement.play();
            this.textContent = "ðŸŽµâœ¨";
            createSparkles(this);
        } else {
            audioElement.pause();
            this.textContent = "ðŸŽµ";
        }
    });

    // Add hover effects to all interactive elements
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
});
