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

    countdownTimer = setInterval(updateCountdown, 1000);

    // Reset Countdown Functionality
    document.getElementById("reset-countdown").addEventListener("click", function() {
        const newDate = prompt("Enter new countdown date (YYYY-MM-DD HH:MM:SS):");
        if (newDate) {
            countdownDate = new Date(newDate).getTime();
            clearInterval(countdownTimer);
            countdownTimer = setInterval(updateCountdown, 1000);
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

    // Show first tab content by default
    document.querySelector(".tab-content").style.display = "block";
