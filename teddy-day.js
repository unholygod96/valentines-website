document.addEventListener('DOMContentLoaded', function() {
    // Teddy Rain
    function createTeddy() {
        const teddy = document.createElement('div');
        teddy.className = 'teddy-bear';
        teddy.textContent = '🧸';

        teddy.style.left = Math.random() * 100 + 'vw';
        teddy.style.animationDelay = Math.random() * 5 + 's';

        document.querySelector('.teddy-rain').appendChild(teddy);

        teddy.addEventListener('animationend', () => {
            teddy.remove();
        });

        setTimeout(() => {
            teddy.remove();
        }, 12000);
    }

    setInterval(createTeddy, 750);

    // Build-a-Bear Customization
    const furColorSelect = document.getElementById('fur-color');
    const eyeColorSelect = document.getElementById('eye-color');
    const accessorySelect = document.getElementById('accessory');
    const bearImage = document.getElementById('bear');
    const accessoryImage = document.getElementById('accessory-image');

    furColorSelect.addEventListener('change', updateBear);
    eyeColorSelect.addEventListener('change', updateBear);
    accessorySelect.addEventListener('change', updateBear);

    function updateBear() {
        const furColor = furColorSelect.value;
        const eyeColor = eyeColorSelect.value;
        const accessory = accessorySelect.value;

        bearImage.src = `images/${furColor}-bear.png`; // Ensure these images exist

        if (accessory === 'bow') {
            accessoryImage.src = 'images/bow.png'; // Ensure this image exists
            accessoryImage.style.display = 'block';
        } else if (accessory === 'heart') {
            accessoryImage.src = 'images/heart.png'; // Ensure this image exists
            accessoryImage.style.display = 'block';
        } else if (accessory === 'hat') {
            accessoryImage.src = 'images/hat.png'; // Ensure this image exists
            accessoryImage.style.display = 'block';
        }
        else {
            accessoryImage.style.display = 'none';
        }
    }

    // Cute Quotes
    const quotes = [
        "A teddy bear is a friend who never judges, always comforts, and keeps all your secrets.",
        "Teddy bears don't need hearts as they are already stuffed with love.",
        "A teddy bear is a timeless hug that lasts forever.",
        "In a world where everyone seems to be overconnected, teddy bears offer a pure, uncomplicated form of affection."
    ];
    const quoteElement = document.getElementById('quote');
    const newQuoteButton = document.getElementById('new-quote');

    newQuoteButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    });

    // Love Letter Toggle
    const loveLetterButton = document.getElementById('love-letter-button');
    const loveLetter = document.getElementById('love-letter');
    const closeLetter = document.getElementById('close-letter');

    loveLetterButton.addEventListener('click', function() {
        loveLetter.classList.add('show');
    });

    closeLetter.addEventListener('click', function() {
        loveLetter.classList.remove('show');
    });

    // Close letter when clicking outside
    document.addEventListener('click', function(event) {
        if (!loveLetter.contains(event.target) &&
            !loveLetterButton.contains(event.target) &&
            loveLetter.classList.contains('show')) {
            loveLetter.classList.remove('show');
        }
    });

    // Background Music Toggle
    const musicButton = document.getElementById('toggle-music');
    const backgroundMusic = document.getElementById('background-music');

    musicButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicButton.textContent = '🔇';
        }
    });

     // Timer Functions
     const timerDisplay = document.getElementById('custom-timer-display');
     const timerHeader = document.getElementById('timer-header');
     let timerInterval;
     let endTime;
 
     document.getElementById('set-timer').addEventListener('click', function() {
         const input = document.getElementById('calendar-input');
         if (input.value) {
             endTime = new Date(input.value).getTime();
             startTimer();
         }
     });
 
     function startTimer() {
         clearInterval(timerInterval);
         timerInterval = setInterval(updateTimer, 1000);
     }
 
     function updateTimer() {
         const now = new Date().getTime();
         const distance = endTime - now;
 
         if (distance <= 0) {
             clearInterval(timerInterval);
             timerDisplay.textContent = "Time's Up! 💝";
             return;
         }
 
         const hours = Math.floor(distance / (1000 * 60 * 60));
         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
         timerDisplay.textContent = 
             `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     }
});
