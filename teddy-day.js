document.addEventListener('DOMContentLoaded', function () {
  /* --- Cute Messages Animation --- */
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

  /* --- Falling Teddy Bears Animation --- */
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

  /* --- Build-a-Bear Interactive Controls --- */
  const bearFace = document.querySelector('.bear-preview .bear-face');
  const bearMouth = document.querySelector('.bear-mouth');
  const bearHat = document.querySelector('.bear-hat');
  const changeColorBtn = document.getElementById('change-color');
  const changeExpressionBtn = document.getElementById('change-expression');
  const toggleHatBtn = document.getElementById('toggle-hat');
  const resetBearBtn = document.getElementById('reset-bear');
  const saveBearBtn = document.getElementById('save-bear');

  // Change face color using a set of brownish hues
  changeColorBtn.addEventListener('click', function () {
    const browns = ['#A0522D', '#8B4513', '#D2691E', '#CD853F', '#F4A460'];
    const randomColor = browns[Math.floor(Math.random() * browns.length)];
    // Update the bear-face with a radial gradient for a warm effect
    bearFace.style.background = `radial-gradient(circle at 50% 50%, ${randomColor}, #E0A96D)`;
  });

  // Toggle smile (by adding or removing the "no-smile" class)
  changeExpressionBtn.addEventListener('click', function () {
    bearMouth.classList.toggle('no-smile');
  });

  // Toggle the hat's visibility
  toggleHatBtn.addEventListener('click', function () {
    bearHat.classList.toggle('hidden');
  });

  // Reset bear to default appearance
  resetBearBtn.addEventListener('click', function () {
    bearFace.style.background = 'radial-gradient(circle at 50% 50%, #FAD6A5, #E0A96D)';
    bearMouth.classList.remove('no-smile');
    bearHat.classList.add('hidden');
  });

  // Save bear configuration to localStorage
  saveBearBtn.addEventListener('click', function () {
    const config = {
      faceColor: bearFace.style.background,
      smile: !bearMouth.classList.contains('no-smile'),
      hat: !bearHat.classList.contains('hidden')
    };
    localStorage.setItem('bearConfig', JSON.stringify(config));
    alert('Bear configuration saved!');
  });

  // Load saved bear configuration (if it exists)
  const savedConfig = localStorage.getItem('bearConfig');
  if (savedConfig) {
    const config = JSON.parse(savedConfig);
    if (config.faceColor) {
      bearFace.style.background = config.faceColor;
    }
    if (!config.smile) {
      bearMouth.classList.add('no-smile');
    } else {
      bearMouth.classList.remove('no-smile');
    }
    if (config.hat) {
      bearHat.classList.remove('hidden');
    } else {
      bearHat.classList.add('hidden');
    }
  }

  // Add a click animation on the bear face for extra interactivity
  bearFace.addEventListener('click', function () {
    bearFace.classList.add('happy');
    setTimeout(() => {
      bearFace.classList.remove('happy');
    }, 500);
  });

  /* --- Love Letter Toggle --- */
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

  /* --- Background Music Toggle --- */
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

  /* --- Timer Functions (similar to Chocolate Day) --- */
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
