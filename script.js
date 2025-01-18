document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menu-btn").addEventListener("click", function () {
        document.getElementById("menu-dropdown").classList.toggle("hidden");
    });

    // Tab Switching Logic
    document.querySelectorAll(".tab-link").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".tab-content").forEach(tab => {
                tab.classList.add("hidden");
            });
            document.getElementById(button.dataset.tab).classList.remove("hidden");
        });
    });

    // Love Letter Button Functionality
    document.getElementById("hidden-love-letter").addEventListener("click", function () {
        document.getElementById("love-letter-container").classList.toggle("hidden");
    });

    // Countdown Timer - Reset Function
    document.getElementById("reset-countdown").addEventListener("click", function () {
        const countdown = document.getElementById("countdown");
        countdown.innerHTML = "00d 00h 00m 00s"; // Reset countdown value
    });

    // Background Music Control
    const audioElement = document.getElementById("bg-music");
    document.getElementById("music-btn").addEventListener("click", function () {
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    });

    // Volume Slider
    document.getElementById("volume-slider").addEventListener("input", function () {
        audioElement.volume = this.value;
    });

    // Photo Gallery Logic (Placeholder for images)
    // Remember to upload your own photos later
    const photoGrid = document.getElementById("memories-grid");
    const photoCollages = [
        // Example photos
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ];

    photoCollages.forEach(imgSrc => {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.classList.add("collage-img");
        photoGrid.appendChild(imgElement);
    });
});
