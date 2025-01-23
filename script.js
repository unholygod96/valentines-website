document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menu-button").addEventListener("click", function () {
        document.querySelector("nav ul").classList.toggle("hidden");
    });

    // Tab Switching Logic
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll(".tab-content").forEach(tab => {
                tab.style.display = "none";
            });
            const target = this.getAttribute("href");
            document.querySelector(target).style.display = "block";
        });
    });

    // Love Letter Button
    document.getElementById("love-letter-button").addEventListener("click", function () {
        document.getElementById("love-letter").classList.toggle("hidden");
    });

    // Custom Timer (now a countdown timer)
    let customTimerInterval = null;
    let customTimerSeconds = 0;

    function updateCustomTimer() {
        if (customTimerSeconds <= 0) {
            clearInterval(customTimerInterval);
            customTimerInterval = null;
            const timerContainer = document.getElementById("timer-container");
            const timerHeader = document.getElementById("timer-header");
            
            // Hide all elements except the header
            Array.from(timerContainer.children).forEach(child => {
                if (child !== timerHeader) {
                    child.style.display = 'none';
                }
            });

            // Update and style the header
            timerHeader.textContent = "It's time to celebrate! 🎉";
            timerHeader.classList.add('celebrate');
            return;
        }

        const hours = Math.floor(customTimerSeconds / 3600);
        const minutes = Math.floor((customTimerSeconds % 3600) / 60);
        const seconds = customTimerSeconds % 60;

        document.getElementById("custom-timer-display").textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        customTimerSeconds--;
    }

    // Start Timer
    document.getElementById("start-timer").addEventListener("click", function () {
        if (!customTimerInterval && customTimerSeconds > 0) {
            customTimerInterval = setInterval(updateCustomTimer, 1000);
        }
    });

    // Pause Timer
    document.getElementById("pause-timer").addEventListener("click", function () {
        clearInterval(customTimerInterval);
        customTimerInterval = null;
    });

    // Reset Timer
    document.getElementById("reset-timer").addEventListener("click", function () {
        clearInterval(customTimerInterval);
        customTimerInterval = null;
        customTimerSeconds = 0;
        document.getElementById("custom-timer-display").textContent = "00:00:00";
        
        // Reset the timer container to its original state
        const timerContainer = document.getElementById("timer-container");
        const timerHeader = document.getElementById("timer-header");
        timerHeader.textContent = "Custom Timer";
        timerHeader.classList.remove('celebrate');
        Array.from(timerContainer.children).forEach(child => {
            child.style.display = '';
        });
    });

    // Set Timer from Input
    document.getElementById("set-timer").addEventListener("click", function () {
        const inputField = document.getElementById("timer-input");
        const calendarInput = document.getElementById("calendar-input");
        const inputValue = inputField.value.trim();
        const calendarValue = calendarInput.value;

        if (calendarValue) {
            const targetDate = new Date(calendarValue);
            const now = new Date();
            customTimerSeconds = Math.floor((targetDate - now) / 1000);
            if (customTimerSeconds < 0) {
                customTimerSeconds = 0;
            }
        } else if (inputValue) {
            const parts = inputValue.split(":").map(x => parseInt(x, 10) || 0);

            let hours = 0;
            let minutes = 0;
            let seconds = 0;

            if (parts.length === 3) {
                // HH:MM:SS
                hours = parts[0];
                minutes = parts[1];
                seconds = parts[2];
            } else if (parts.length === 2) {
                // MM:SS
                minutes = parts[0];
                seconds = parts[1];
            } else if (parts.length === 1) {
                // SS
                seconds = parts[0];
            }

            customTimerSeconds = hours * 3600 + minutes * 60 + seconds;
        }
        updateCustomTimer();
    });

    // Photo Upload and Collage Creation
    document.getElementById("photo-upload").addEventListener("change", function (event) {
        const files = event.target.files;
        const collage = document.getElementById("collage");
        collage.innerHTML = ''; // Clear existing images

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.file = file;
                collage.appendChild(img);

                const reader = new FileReader();
                reader.onload = (function(aImg) { 
                    return function(e) { 
                        aImg.src = e.target.result; 
                    }; 
                })(img);
                reader.readAsDataURL(file);
            }
        }
    });

    // Background Music Control
    const audioElement = document.getElementById("background-music");
    document.getElementById("toggle-music").addEventListener("click", function () {
        if (audioElement.paused) {
            audioElement.play();
            this.textContent = "🔇";
        } else {
            audioElement.pause();
            this.textContent = "🎵";
        }
    });
});

function showProposal() {
    alert("Will you be my Valentine? 💖");
}
