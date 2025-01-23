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
            document.querySelector(this.getAttribute("href")).style.display = "block";
        });
    });

    // Love Letter Button Functionality
    document.getElementById("love-letter-button").addEventListener("click", function () {
        document.getElementById("love-letter").classList.toggle("hidden");
    });

    // Countdown Timer
    let countdownDate = new Date("February 14, 2024 00:00:00").getTime();
    let countdownTimer;

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = countdownDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft < 0) {
            clearInterval(countdownTimer);
            document.getElementById("timer").innerHTML = "Happy Valentine's Day!";
        }
    }

    // Start updating the countdown every second
    countdownTimer = setInterval(updateCountdown, 1000);

    // Reset Countdown Functionality
    document.getElementById("reset-countdown").addEventListener("click", function () {
        const newDate = prompt("Enter new countdown date (YYYY-MM-DD HH:MM:SS):");
        if (newDate) {
            countdownDate = new Date(newDate).getTime();
            clearInterval(countdownTimer);
            countdownTimer = setInterval(updateCountdown, 1000);
        }
    });

    // Custom Timer Functionality
    let customTimerInterval;
    let customTimerSeconds = 0;

    function updateCustomTimer() {
        const hours = Math.floor(customTimerSeconds / 3600);
        const minutes = Math.floor((customTimerSeconds % 3600) / 60);
        const seconds = customTimerSeconds % 60;
        document.getElementById("custom-timer-display").textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start Button
    document.getElementById("start-timer").addEventListener("click", function () {
        if (!customTimerInterval) {
            customTimerInterval = setInterval(function () {
                customTimerSeconds++;
                updateCustomTimer();
            }, 1000);
        }
    });

    // Pause Button
    document.getElementById("pause-timer").addEventListener("click", function () {
        clearInterval(customTimerInterval);
        customTimerInterval = null;
    });

    // Reset Button
    document.getElementById("reset-timer").addEventListener("click", function () {
        clearInterval(customTimerInterval);
        customTimerSeconds = 0;
        customTimerInterval = null;
        updateCustomTimer();
    });

    // NEW: Set Timer Button - allows user to customize starting time
    document.getElementById("set-timer").addEventListener("click", function () {
        // For example, user can enter HH:MM:SS
        const input = prompt("Enter custom timer start time (HH:MM:SS):");
        if (input) {
            // Split the input by ':' to get hours, minutes, seconds
            const parts = input.split(":");
            let hours = 0, minutes = 0, seconds = 0;

            if (parts.length === 3) {
                hours = parseInt(parts[0]) || 0;
                minutes = parseInt(parts[1]) || 0;
                seconds = parseInt(parts[2]) || 0;
            } else if (parts.length === 2) {
                // If user only enters something like "MM:SS"
                minutes = parseInt(parts[0]) || 0;
                seconds = parseInt(parts[1]) || 0;
            } else if (parts.length === 1) {
                // If user only enters seconds
                seconds = parseInt(parts[0]) || 0;
            }

            // Convert everything to total seconds
            customTimerSeconds = hours * 3600 + minutes * 60 + seconds;
            updateCustomTimer();
        }
    });
});
