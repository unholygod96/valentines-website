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

    // Toggle Valentine's Week Tabs
    function toggleMenu() {
        let menu = document.getElementById("valentine-menu");
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
    document.getElementById("menu-btn").addEventListener("click", toggleMenu);

    // Love Letter Reveal
    function revealLetter() {
        let letter = document.getElementById("hidden-love-letter");
        if (letter) {
            letter.innerHTML = `<p>Happy Valentine’s Day!  
                I don’t know when you’re seeing this, but thank you for being such an amazing girlfriend.  
                I love you so much, and I miss you.  
                I can’t wait to see you!  
                You are the best thing that has ever happened to me, and I don’t know what I’d do without you.  
                [Add more cute, long, heartfelt lines here].</p>`;
            letter.style.display = "block";
        }
    }
    window.revealLetter = revealLetter;

    // Surprise Proposal Animation
    function showSurprise() {
        let proposeSection = document.getElementById("propose-day");
        if (proposeSection) {
            let ringAnimation = document.createElement("div");
            ringAnimation.innerHTML = "💍🎁✨";
            ringAnimation.style.fontSize = "50px";
            ringAnimation.style.animation = "zoomIn 1s ease-in-out";
            proposeSection.appendChild(ringAnimation);

            setTimeout(() => {
                ringAnimation.remove();
            }, 3000);
        }
    }
    window.showSurprise = showSurprise;

    // Background Music Toggle
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
    window.toggleMusic = toggleMusic;

    // Photo Collage Upload and Display
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
                    img.classList.add("collage-image");
                    collageArea.appendChild(img);

                    img.addEventListener("click", function () {
                        let fullScreenImg = document.createElement("div");
                        fullScreenImg.innerHTML = `<img src="${img.src}" style="width: 90%; height: auto; display: block; margin: auto;">`;
                        fullScreenImg.style.position = "fixed";
                        fullScreenImg.style.top = "0";
                        fullScreenImg.style.left = "0";
                        fullScreenImg.style.width = "100%";
                        fullScreenImg.style.height = "100%";
                        fullScreenImg.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                        fullScreenImg.style.display = "flex";
                        fullScreenImg.style.alignItems = "center";
                        fullScreenImg.style.justifyContent = "center";
                        fullScreenImg.addEventListener("click", () => {
                            fullScreenImg.remove();
                        });

                        document.body.appendChild(fullScreenImg);
                    });
                });
            }
        });
    }
});
