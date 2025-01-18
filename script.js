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
            
            let timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
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
    let proposalSection = document.getElementById("proposal");
    if (proposalSection) {
        proposalSection.addEventListener("click", function () {
            let hiddenMessage = document.getElementById("hidden-message");
            if (hiddenMessage) {
                hiddenMessage.style.display = "block";
            }
        });
    }

    // Photo Collage Uploader
    let photoUpload = document.getElementById("photo-upload");
    if (photoUpload) {
        photoUpload.addEventListener("change", function (event) {
            let collageArea = document.getElementById("collage");
            if (collageArea) {
                collageArea.innerHTML = ""; // Clear previous images
                Array.from(event.target.files).forEach(file => {
                    let img = document.createElement("img");
                    img.src = URL.createObjectURL(file);
                    img.style.width = "150px";
                    img.style.margin = "10px";
                    img.style.borderRadius = "10px";
                    collageArea.appendChild(img);
                });
            }
        });
    }

    // Falling Hearts Effect (Only One Version)
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
    setInterval(createHeart, 500); // Run only once

    // Cute Greeting Messages
    const greetings = [
        "Hello, my love! 💖",
        "How's my beautiful queen today? 👑",
        "Hey there, cutie! 🥰",
        "Missed you! 💕",
        "Hope you're having a wonderful day! 🌸"
    ];

    function showGreeting() {
        let greetingPopup = document.getElementById("greeting-popup");
        if (greetingPopup) {
            let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            greetingPopup.innerText = randomGreeting;
            greetingPopup.style.display = "block";
            setTimeout(() => {
                greetingPopup.style.display = "none";
            }, 6000);
        }
    }
    showGreeting();

    // Function to Check the Answer and Reveal the Main Site
    function checkAnswer() {
        let userInput = document.getElementById("love-input")?.value.toLowerCase();
        
        if (userInput && (userInput.includes("infinity") || userInput.includes("a lot") || userInput.length > 10)) {
            let landingScreen = document.getElementById("landing-screen");
            let mainWebsite = document.getElementById("main-website");

            if (landingScreen && mainWebsite) {
                landingScreen.style.opacity = "0"; // Fade out
                setTimeout(() => {
                    landingScreen.style.display = "none"; // Hide landing
                    mainWebsite.style.display = "block"; // Show main site
                }, 1000); // 1-second fade-out effect
            }
        } else {
            alert("Hmm, that's not enough love! Try again! 😜");
        }
    }

    // Background Music Controls
    function toggleMusic() {
        let music = document.getElementById("bg-music");
        let musicBtn = document.getElementById("music-btn");
        
        if (music && musicBtn) {
            if (music.paused) {
                music.play();
                musicBtn.innerText = "🔊 Playing";
            } else {
                music.pause();
                musicBtn.innerText = "🎶 Play Music";
            }
        }
    }

    // Reveal the Love Letter
    function revealLetter() {
        let loveLetter = document.getElementById("love-letter");
        if (loveLetter) {
            loveLetter.style.display = "block";
        }
    }

    // Make functions globally accessible
    window.checkAnswer = checkAnswer;
    window.toggleMusic = toggleMusic;
    window.revealLetter = revealLetter;
});
