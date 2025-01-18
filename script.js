document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menu-btn").addEventListener("click", function() {
        document.getElementById("menu-dropdown").classList.toggle("hidden");
    });

    // Tab Switching Logic
    document.querySelectorAll(".tab-link").forEach(button => {
        button.addEventListener("click", function() {
            document.querySelectorAll(".tab-content").forEach(tab => {
                tab.classList.add("hidden");
            });
            document.getElementById(this.getAttribute("data-tab")).classList.remove("hidden");
        });
    });

    // Proposal Animation Toggle
    document.getElementById("proposal-btn").addEventListener("click", function() {
        document.getElementById("proposal-animation").classList.toggle("hidden");
    });

    // Love Letter Reveal
    document.getElementById("hidden-love-letter").addEventListener("click", function() {
        document.getElementById("love-letter-container").classList.remove("hidden");
    });

    // Countdown Timer
    function startCountdown(targetDate) {
        setInterval(() => {
            let now = new Date().getTime();
            let distance = targetDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }
    startCountdown(new Date("Feb 14, 2025 00:00:00").getTime());

    // Background Music Controls
    document.getElementById("music-btn").addEventListener("click", function() {
        let music = document.getElementById("bg-music");
        if (music.paused) {
            music.play();
            this.innerText = "🔊 Playing";
        } else {
            music.pause();
            this.innerText = "🎶 Play Music";
        }
    });
});
