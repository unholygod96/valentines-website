document.addEventListener('DOMContentLoaded', function () {
  // ---- Cute Messages Animation ----
  const cuteMessages = [
    "You're as cuddly as a teddy bear! 🧸",
    "Hugs and cuddles, always! 💖",
    "Your smile warms my heart like a cozy bear hug! 😊",
    "Every moment with you is a soft embrace! 🤗",
    "You're my favorite cuddle buddy! 🧸"
  ];

  const messageElement = document.getElementById('message-display');
  let currentIndex = 0;

  function showCuteMessage() {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      messageElement.textContent = cuteMessages[currentIndex];
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
      currentIndex = (currentIndex + 1) % cuteMessages.length;
      setTimeout(showCuteMessage, 3000);
    }, 500);
  }
  showCuteMessage();

  // ---- Falling Teddy Bears Animation ----
  function createTeddy() {
    const teddy = document.createElement('div');
    teddy.className = 'teddy';
    teddy.textContent = '🧸';
    teddy.style.left = Math.random() * 100 + 'vw';
    teddy.style.transform = `rotate(${Math.random() * 360}deg)`;
    const duration = 7 + Math.random() * 5;
    teddy.style.animationDuration = `${duration}s`;
    document.querySelector('.teddy-falls').appendChild(teddy);
    setTimeout(() => teddy.remove(), duration * 1000);
  }
  setInterval(createTeddy, 500);

  // ---- Build a Bear Interactive Controls ----
  const bearPreview = document.querySelector('.bear-preview .bear-face');
  const changeColorBtn = document.getElementById('change-color');
  const changeExpressionBtn = document.getElementById('change-expression');
  const resetBearBtn = document.getElementById('reset-bear');

  changeColorBtn.addEventListener('click', function () {
    // Randomize the bear face color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    bearPreview.style.background = randomColor;
  });

  changeExpressionBtn.addEventListener('click', function () {
    // Toggle bear mouth style to simulate an expression change
    const bearMouth = document.querySelector('.bear-mouth');
    if (bearMouth.style.borderBottomColor === 'transparent') {
      bearMouth.style.borderBottomColor = '#000';
    } else {
      bearMouth.style.borderBottomColor = 'transparent';
    }
  });

  resetBearBtn.addEventListener('click', function () {
    // Reset the bear’s face color and expression
    bearPreview.style.background = '#ffcc80';
    const bearMouth = document.querySelector('.bear-mouth');
    bearMouth.style.borderBottomColor = '#000';
  });

  // ---- Love Letter Toggle ----
  const loveLetterButton = document.getElementById('love-letter-button');
  const loveLetter = document.getElementById('love-letter');
  const closeLetter = document.getElementById('close-letter');

  loveLetterButton.addEventListener('click', function () {
    loveLetter.classList.add('show');
    createLetterSparkles(loveLetter);
  });

  closeLetter.addEventListener('click', function () {
    loveLetter.classList.remove('show');
  });

  // Close the letter when clicking outside of it
  document.addEventListener('click', function (event) {
    if (
      !loveLetter.contains(event.target) &&
      !loveLetterButton.contains(event.target) &&
      loveLetter.classList.contains('show')
    ) {
      loveLetter.classList.remove('show');
    }
  });

  function createLetterSparkles(element) {
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      element.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  // ---- Background Music Toggle ----
  const musicButton = document.getElementById('toggle-music');
  const backgroundMusic = document.getElementById('background-music');

  musicButton.addEventListener('click', function () {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicButton.textContent = '🎵';
    } else {
      backgroundMusic.pause();
      musicButton.textContent = '🔇';
    }
  });

  // ---- Timer Functions (Similar to your Chocolate Day page) ----
  const timerDisplay = document.getElementById('custom-timer-display');
  let timerInterval;
  let endTime;

  document.getElementById('set-timer').addEventListener('click', function () {
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
      timerDisplay.textContent = "Time's Up! 💖";
      return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.textContent =
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;
  }
});
