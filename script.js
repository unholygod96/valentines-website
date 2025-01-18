// Toggle menu visibility
document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu-dropdown").classList.toggle("hidden");
});

// Tab switching
const tabs = document.querySelectorAll(".tab-link");
tabs.forEach(tab => {
    tab.addEventListener("click", function() {
        const tabName = tab.getAttribute("data-tab");
        const allTabs = document.querySelectorAll(".tab-content");
        allTabs.forEach(tab => tab.classList.add("hidden"));
        document.getElementById(tabName).classList.remove("hidden");
    });
});

// Love letter toggle
document.getElementById("hidden-love-letter").addEventListener("click", function() {
    document.getElementById("love-letter-container").classList.toggle("hidden");
});

// Play background music
document.getElementById("music-btn").addEventListener("click", function() {
    const music = document.getElementById("bg-music");
    music.paused ? music.play() : music.pause();
});

// Adjust music volume
document.getElementById("volume-slider").addEventListener("input", function() {
    const music = document.getElementById("bg-music");
    music.volume = this.value;
});
