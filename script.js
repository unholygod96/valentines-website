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

        if (timeLeft > 0) {
            document.getElementById("timer").innerHTML =
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            clearInterval(countdownTimer);
            document.getElementById("timer").innerHTML = "Happy Valentine's Day!";
        }
    }

    // Immediately show the countdown & update every second
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);

    // Reset Countdown
    document.getElementById("reset-countdown").addEventListener("click", function () {
        const newDate = prompt("Enter new countdown date (YYYY-MM-DD HH:MM:SS):");
        if (newDate) {
            countdownDate = new Date(newDate).getTime();
            clearInterval(countdownTimer);
            updateCountdown(); 
            countdownTimer = setInterval(updateCountdown, 1000);
        }
    });

    // Custom Timer
    let customTimerInterval = null;
    let customTimerSeconds = 0;

    function updateCustomTimer() {
        const hours = Math.floor(customTimerSeconds / 3600);
        const minutes = Math.floor((customTimerSeconds % 3600) / 60);
        const seconds = customTimerSeconds % 60;

        document.getElementById("custom-timer-display").textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start Timer
    document.getElementById("start-timer").addEventListener("click", function () {
        if (!customTimerInterval) {
            customTimerInterval = setInterval(function () {
                customTimerSeconds++;
                updateCustomTimer();
            }, 1000);
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
        customTimerSeconds = 0;
        customTimerInterval = null;
        updateCustomTimer();
    });

    // Set Timer from Input
    document.getElementById("set-timer").addEventListener("click", function () {
        const inputField = document.getElementById("timer-input");
        const inputValue = inputField.value.trim();

        if (inputValue) {
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
            updateCustomTimer();
        }
    });
});
