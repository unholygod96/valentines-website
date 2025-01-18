document.addEventListener("DOMContentLoaded", function () {
    // Countdown Timer Logic
    function startCountdown() {
        let targetDate = new Date("Feb 14, 2025 00:00:00").getTime();
        setInterval(() => {
            let now = new Date().getTime();
            let distance = targetDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }
    startCountdown();

    // Toggle Tabs Visibility
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            document.querySelectorAll(".tab-content").forEach(tab => {
               tab.classList.remove("active");
               if (tab.id === targetId) {
                  tab.classList.add("active");
               }
            });       
        });
    });

    // Surprise Proposal Animation
    document.getElementById("proposal").addEventListener("click", function () {
        document.getElementById("hidden-message").style.display = "block";
    });

    // Photo Collage Uploader
    document.getElementById("photo-upload").addEventListener("change", function (event) {
        let collageArea = document.getElementById("collage");
        collageArea.innerHTML = ""; // Clear previous images
        Array.from(event.target.files).forEach(file => {
            let img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.width = "150px";
            img.style.margin = "10px";
            img.style.borderRadius = "10px";
            collageArea.appendChild(img);
        });
    });
});
// Falling Hearts Effect
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    document.body.appendChild(heart);

    // Random Position & Animation Speed
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random speed

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate Hearts Every 0.5 Seconds
setInterval(createHeart, 500);
// Cute Greeting Messages
const greetings = [
    "Hello, my love! 💖",
    "How's my beautiful queen today? 👑",
    "Hey there, cutie! 🥰",
    "Missed you! 💕",
    "Hope you're having a wonderful day! 🌸"
];

// Function to Check the Answer and Reveal the Main Site
function checkAnswer() {
    let userInput = document.getElementById("love-input").value.toLowerCase();
    
    if (userInput.includes("infinity") || userInput.includes("a lot") || userInput.length > 10) {
        document.getElementById("landing-screen").style.opacity = "0"; // Fade out
        setTimeout(() => {
            document.getElementById("landing-screen").style.display = "none"; // Hide landing
            document.getElementById("main-website").style.display = "block"; // Show main site
        }, 1000); // 1-second fade-out effect
    } else {
        alert("Hmm, that's not enough love! Try again! 😜");
    }
}
// Background Music Controls
function toggleMusic() {
    let music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
        document.getElementById("music-btn").innerText = "🔊 Playing";
    } else {
        music.pause();
        document.getElementById("music-btn").innerText = "🎶 Play Music";
    }
}
// Falling Hearts Effect
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    document.body.appendChild(heart);

    // Random Position & Animation Speed
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random speed

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate Hearts Every 0.5 Seconds
setInterval(createHeart, 500);


