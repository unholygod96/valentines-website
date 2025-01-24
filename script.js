document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menu-button").addEventListener("click", function () {
        document.querySelector("nav").classList.toggle("active");
    });

    // Tab Switching Logic with Close Functionality
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("href");
            const selectedContent = document.querySelector(target);
            
            // If content is already visible, hide it and return
            if (selectedContent.style.display === "block") {
                selectedContent.style.display = "none";
            } else {
                // Hide all tab content first
                document.querySelectorAll(".tab-content").forEach(tab => {
                    tab.style.display = "none";
                });
                // Show the selected content
                selectedContent.style.display = "block";
            }
            
            // Close the menu
            document.querySelector("nav").classList.remove("active");
        });
    });

    // Love Letter Button
    document.getElementById("love-letter-button").addEventListener("click", function () {
        document.getElementById("love-letter").classList.toggle("hidden");
    });

    // Custom Timer (now with overlay)
    let customTimerInterval = null;
    let customTimerSeconds = 0;

    function updateCustomTimer() {
        if (customTimerSeconds <= 0) {
            clearInterval(customTimerInterval);
            customTimerInterval = null;
            
            // Get the customized header text
            const customHeader = document.getElementById("timer-header").textContent;
            
            // Show the overlay with the custom header
            const overlay = document.getElementById("timer-end-overlay");
            const overlayHeader = document.getElementById("overlay-header");
            overlayHeader.textContent = customHeader;
            overlay.classList.remove("hidden");
            overlay.classList.add("show");
            
            return;
        }

        const hours = Math.floor(customTimerSeconds / 3600);
        const minutes = Math.floor((customTimerSeconds % 3600) / 60);
        const seconds = customTimerSeconds % 60;

        document.getElementById("custom-timer-display").textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        customTimerSeconds--;
    }

    // Start Timer
    document.getElementById("start-timer").addEventListener("click", function () {
        if (!customTimerInterval && customTimerSeconds > 0) {
            customTimerInterval = setInterval(updateCustomTimer, 1000);
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
        customTimerInterval = null;
        customTimerSeconds = 0;
        document.getElementById("custom-timer-display").textContent = "00:00:00";
        
        // Reset the timer container to its original state
        const timerContainer = document.getElementById("timer-container");
        const timerHeader = document.getElementById("timer-header");
        timerHeader.textContent = "Custom Timer";
        Array.from(timerContainer.children).forEach(child => {
            child.style.display = '';
        });
    });

    // Set Timer from Calendar Input
    document.getElementById("set-timer").addEventListener("click", function () {
        const calendarInput = document.getElementById("calendar-input");
        const calendarValue = calendarInput.value;

        if (calendarValue) {
            const targetDate = new Date(calendarValue);
            const now = new Date();
            customTimerSeconds = Math.floor((targetDate - now) / 1000);
            if (customTimerSeconds < 0) {
                customTimerSeconds = 0;
            }
            updateCustomTimer();
        }
    });

    // Close Overlay Button
    document.getElementById("close-overlay").addEventListener("click", function() {
        const overlay = document.getElementById("timer-end-overlay");
        overlay.classList.remove("show");
        overlay.classList.add("hidden");
        
        // Reset the timer container to its original state
        const timerContainer = document.getElementById("timer-container");
        const timerHeader = document.getElementById("timer-header");
        timerHeader.textContent = "Custom Timer";
        Array.from(timerContainer.children).forEach(child => {
            child.style.display = '';
        });
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
});

function showProposal() {
    alert("Will you be my Valentine? 💖");
}
