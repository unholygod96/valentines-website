// Love Letter Reveal
document.getElementById("hidden-heart").addEventListener("dblclick", function () {
    document.getElementById("love-letter-container").style.display = "block";
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

// Countdown Reset
document.getElementById("reset-countdown").addEventListener("click", function () {
    let newDate = prompt("Enter a new date for the countdown (YYYY-MM-DD):", "2025-02-14");
    if (newDate) {
        startCountdown(new Date(newDate + "T00:00:00").getTime());
    }
});

// Menu Toggle
document.getElementById("menu-btn").addEventListener("click", function () {
    let menu = document.getElementById("tabs-container");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Open Tabs
function openTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
        if (tab.id === tabId) tab.classList.add("active");
    });
}

// Background Music Controls
function toggleMusic() {
    let music = document.getElementById("bg-music");
    let musicBtn = document.getElementById("music-btn");

    if (music.paused) {
        music.play();
        musicBtn.innerText = "🔊 Playing";
    } else {
        music.pause();
        musicBtn.innerText = "🎶 Play Music";
    }
}
