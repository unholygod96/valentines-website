 document.addEventListener('DOMContentLoaded', function() {
     // ----- Configuration -----
     const animationDuration = 800; // milliseconds
     const sparkleCount = 10;
 
     // ----- Helper Functions -----
     const getRandom = (min, max) => Math.random() * (max - min) + min;
 
     const createSparkle = (parent) => {
         const sparkle = document.createElement('div');
         sparkle.className = 'sparkle';
         sparkle.style.left = `${getRandom(0, 100)}%`;
         sparkle.style.top = `${getRandom(0, 100)}%`;
         parent.appendChild(sparkle);
         setTimeout(() => sparkle.remove(), animationDuration);
     };
 
     // ----- Sweet Messages -----
     const sweetMessages = [
         "You're warmer than a hug! 🤗",
         "Life is cozier with you! ✨",
         "My favorite comfort is your presence! 💖",
         "Every moment with you feels like a warm hug! 🌟",
         "You make my heart feel so snug! 💫",
         "Sweeter than any embrace! 🥰"
     ];
 
     let messageIndex = 0;
     const messageDisplay = document.getElementById('message-display');
 
     const animateMessage = () => {
         messageDisplay.style.opacity = 0;
         messageDisplay.style.transform = 'translateY(20px)';
 
         setTimeout(() => {
             messageDisplay.textContent = sweetMessages[messageIndex];
             messageDisplay.style.opacity = 1;
             messageDisplay.style.transform = 'translateY(0)';
 
             messageIndex = (messageIndex + 1) % sweetMessages.length;
             setTimeout(animateMessage, 3000);
         }, animationDuration / 4);
     };
 
     animateMessage();
 
     // ----- Falling Hearts -----
     const heartsContainer = document.querySelector('.hearts');
 
     const createHeart = () => {
         const heart = document.createElement('div');
         heart.className = 'heart';
         heart.textContent = '❤';
 
         heart.style.left = `${getRandom(0, 100)}vw`;
         heart.style.transform = `rotate(${getRandom(0, 360)}deg)`;
         heart.style.animationDuration = `${getRandom(7, 12)}s`;
 
         heartsContainer.appendChild(heart);
         setTimeout(() => heart.remove(), 12000);
     };
 
     setInterval(createHeart, 500);
 
     // ----- Hug Box -----
     const hugPieces = document.querySelectorAll('.hug-piece');
 
     hugPieces.forEach(piece => {
         piece.addEventListener('mouseenter', () => {
             for (let i = 0; i < sparkleCount; i++) createSparkle(piece);
             piece.classList.add('active');
         });
 
         piece.addEventListener('mouseleave', () => {
             piece.classList.remove('active');
         });
     });
 
     // ----- Sweet Memories -----
     const memoryCards = document.querySelectorAll('.memory-card');
 
     memoryCards.forEach(card => {
         card.addEventListener('mouseenter', () => {
             for (let i = 0; i < sparkleCount / 2; i++) createSparkle(card);
             card.classList.add('active');
         });
 
         card.addEventListener('mouseleave', () => {
             card.classList.remove('active');
         });
     });
 
     // ----- Interactive Hug -----
     const magicHug = document.querySelector('.magic-hug');
     const wishText = document.querySelector('.wish-text');
 
     const showWish = () => {
         wishText.classList.add('show');
         setTimeout(() => wishText.classList.remove('show'), 3000);
     };
 
     magicHug.addEventListener('click', () => {
         magicHug.classList.add('active');
         for (let i = 0; i < sparkleCount * 2; i++) createSparkle(magicHug);
 
         setTimeout(() => {
             magicHug.classList.remove('active');
             showWish();
         }, animationDuration);
     });
 
     // ----- Sweet Notes -----
     const notes = document.querySelectorAll('.note');
 
     notes.forEach(note => {
         note.addEventListener('mouseenter', () => {
             for (let i = 0; i < sparkleCount / 3; i++) createSparkle(note);
             note.classList.add('active');
         });
 
         note.addEventListener('mouseleave', () => {
             note.classList.remove('active');
         });
     });
 
     // ----- Love Letter -----
     const loveLetterButton = document.getElementById('love-letter-button');
     const loveLetter = document.getElementById('love-letter');
     const closeLetter = document.getElementById('close-letter');
 
     const toggleLetter = () => loveLetter.classList.toggle('show');
 
     loveLetterButton.addEventListener('click', toggleLetter);
     closeLetter.addEventListener('click', toggleLetter);
 
     document.addEventListener('click', (event) => {
         if (!loveLetter.contains(event.target) && !loveLetterButton.contains(event.target) && loveLetter.classList.contains('show')) {
             toggleLetter();
         }
     });
 
     // ----- Background Music -----
     const musicButton = document.getElementById('toggle-music');
     const backgroundMusic = document.getElementById('background-music');
 
     musicButton.addEventListener('click', () => {
         if (backgroundMusic.paused) {
             backgroundMusic.play();
             musicButton.textContent = '🎵';
         } else {
             backgroundMusic.pause();
             musicButton.textContent = '🔇';
         }
     });
 
     // ----- Timer -----
     const timerDisplay = document.getElementById('custom-timer-display');
     const timerHeader = document.getElementById('timer-header');
     const timerEndOverlay = document.getElementById('timer-end-overlay');
     const overlayHeader = document.getElementById('overlay-header');
     const closeOverlayButton = document.getElementById('close-overlay');
     let timerInterval;
     let endTime;
 
     const updateTimer = () => {
         const now = new Date().getTime();
         const distance = endTime - now;
 
         if (distance <= 0) {
             clearInterval(timerInterval);
             timerDisplay.textContent = "Time's Up! 🥰";
             overlayHeader.textContent = "Time for a warm hug! 🤗";
             timerEndOverlay.classList.remove('hidden');
             return;
         }
 
         const hours = Math.floor(distance / (1000 * 60 * 60));
         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
         timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     };
 
     const startTimer = () => {
         clearInterval(timerInterval);
         timerInterval = setInterval(updateTimer, 1000);
     };
 
     const pauseTimer = () => clearInterval(timerInterval);
 
     const resetTimer = () => {
         clearInterval(timerInterval);
         timerDisplay.textContent = "00:00:00";
         timerEndOverlay.classList.add('hidden');
     };
 
     document.getElementById('set-timer').addEventListener('click', () => {
         const input = document.getElementById('calendar-input');
         if (input.value) {
             endTime = new Date(input.value).getTime();
             startTimer();
         }
     });
 
     document.getElementById('start-timer').addEventListener('click', startTimer);
     document.getElementById('pause-timer').addEventListener('click', pauseTimer);
     document.getElementById('reset-timer').addEventListener('click', resetTimer);
     closeOverlayButton.addEventListener('click', () => timerEndOverlay.classList.add('hidden'));
 
     // ----- Menu -----
     const menuButton = document.getElementById('menu-button');
     const nav = document.querySelector('nav');
 
     menuButton.addEventListener('click', () => nav.classList.toggle('show'));
 
     // ----- Initialize -----
     createHeart();
 });
