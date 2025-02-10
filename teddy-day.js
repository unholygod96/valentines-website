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
  const bearMouth = document.querySelector('.bear-mouth');
  const bearHat = document.querySelector('.bear-hat');
  const changeColorBtn = document.getElementById('change-color');
  const changeExpressionBtn = document.getElementById('change-expression');
  const toggleHatBtn = document.getElementById('toggle-hat');
  const resetBearBtn = document.getElementById('reset-bear');
  const saveBearBtn = document.getElementById('save-bear');

  // Change the bear face color randomly
  changeColorBtn.addEventListener('click', function () {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    bearPreview.style.background = randomColor;
  });

  // Toggle the bear's mouth expression (simulate smile)
  changeExpressionBtn.addEventListener('click', function () {
    if (bearMouth.style.borderBottomColor === 'transparent') {
      bearMouth.style.borderBottomColor = '#000';
    } else {
      bearMouth.style.borderBottomColor = 'transparent';
    }
  });

  // Toggle the bear hat (show/hide)
  toggleHatBtn.addEventListener('click', function () {
    bearHat.classList.toggle('hidden');
  });

  // Reset bear to default settings
  resetBearBtn.addEventListener('click', function () {
    bearPreview.style.background = '#ffcc80';
    bearMouth.style.borderBottomColor = '#000';
    bearHat.classList.add('hidden');
  });

  // Save bear configuration to localStorage
  saveBearBtn.addEventListener('click', function () {
    const bearConfig = {
      faceColor: bearPreview.style.background,
      mouthVisible: bearMouth.style.borderBottomColor !== 'transparent',
      hatVisible: !bearHat.classList.contains('hidden')
    };
    localStorage.setItem('bearConfig', JSON.stringify(bearConfig));
    alert("Bear configuration saved!");
  });

  // Load bear configuration if available
  const savedConfig = localStorage.getItem('bearConfig');
  if (savedConfig) {
    const config = JSON.parse(savedConfig);
    if (config.faceColor) {
      bearPreview.style.background = config.faceColor;
    }
    if (config.mouthVisible === false) {
      bearMouth.style.borderBottomColor = 'transparent';
    } else {
      bearMouth.style.borderBottomColor = '#000';
    }
    if (config.hatVisible) {
      bearHat.classList.remove('hidden');
    } else {
      bearHat.classList.add('hidden');
    }
  }

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
