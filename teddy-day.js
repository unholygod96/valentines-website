document.addEventListener('DOMContentLoaded', function () {
  /********************
   * Sweet Messages Animation
   ********************/
  const sweetMessages = [
    "You're as cuddly as a teddy! 🧸",
    "Life is cozy with you! ✨",
    "My favorite hug is yours! 💝",
    "Every moment with you is warm! 🌟",
    "You make my heart feel safe! 💫",
    "The best part of my day is you! 🧸"
  ];

  const messageElement = document.getElementById('message-display');
  let currentIndex = 0;

  function showMessage() {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      messageElement.textContent = sweetMessages[currentIndex];
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
      currentIndex = (currentIndex + 1) % sweetMessages.length;
      setTimeout(showMessage, 3000);
    }, 500);
  }

  // Start message animation
  showMessage();

  /********************
   * Falling Teddies Animation
   ********************/
  function createTeddy() {
    const teddy = document.createElement('div');
    teddy.className = 'teddy';
    teddy.textContent = '🧸';
    teddy.style.left = Math.random() * 100 + 'vw';
    teddy.style.transform = `rotate(${Math.random() * 360}deg)`;
    const duration = 7 + Math.random() * 5;
    teddy.style.animationDuration = `${duration}s`;
    document.querySelector('.teddies-falling').appendChild(teddy);
    setTimeout(() => teddy.remove(), duration * 1000);
  }

  // Create teddies periodically
  setInterval(createTeddy, 500);

  /********************
   * Memory Cards Animation
   ********************/
  const memoryCards = document.querySelectorAll('.memory-card');
  memoryCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)';
      createMemorySparkles(this);
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  function createMemorySparkles(element) {
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      element.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  /********************
   * Interactive Teddy Animation
   ********************/
  const magicTeddy = document.querySelector('.magic-teddy');
  const wishText = document.querySelector('.wish-text');

  magicTeddy.addEventListener('click', function () {
    this.style.transform = 'scale(1.5) rotate(720deg)';
    createMagicSparkles(this);
    setTimeout(() => {
      wishText.classList.remove('hidden');
      wishText.classList.add('show');
    }, 500);
    setTimeout(() => {
      this.style.transform = '';
      wishText.classList.remove('show');
      setTimeout(() => wishText.classList.add('hidden'), 300);
    }, 3000);
  });

  function createMagicSparkles(element) {
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = 50 + (Math.random() - 0.5) * 100 + '%';
      sparkle.style.top = 50 + (Math.random() - 0.5) * 100 + '%';
      element.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  /********************
   * Love Letter Toggle
   ********************/
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
    if (!loveLetter.contains(event.target) &&
        !loveLetterButton.contains(event.target) &&
        loveLetter.classList.contains('show')) {
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

  /********************
   * Background Music Toggle
   ********************/
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

  /********************
   * Timer Functions
   ********************/
  const timerDisplay = document.getElementById('custom-timer-display');
  let timerInterval;
  let endTime = null;
  let remainingTime = null;

  document.getElementById('set-timer').addEventListener('click', function () {
    const input = document.getElementById('calendar-input');
    if (input.value) {
      endTime = new Date(input.value).getTime();
      remainingTime = null;
      startTimer();
    }
  });

  document.getElementById('start-timer').addEventListener('click', function () {
    if (remainingTime !== null) {
      endTime = new Date().getTime() + remainingTime;
      remainingTime = null;
      startTimer();
    }
  });

  document.getElementById('pause-timer').addEventListener('click', function () {
    if (endTime) {
      remainingTime = endTime - new Date().getTime();
      clearInterval(timerInterval);
    }
  });

  document.getElementById('reset-timer').addEventListener('click', function () {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00:00";
    endTime = null;
    remainingTime = null;
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

  /********************
   * Build-a-Bear Functionality with Enhanced Animations
   ********************/
  const bearCanvas = document.getElementById('bearCanvas');
  const ctx = bearCanvas.getContext('2d');
  let currentBearConfig = {};

  // Modified drawBear function that accepts a timestamp (t) for animations.
  function drawBear(config, t) {
    ctx.clearRect(0, 0, bearCanvas.width, bearCanvas.height);

    // Calculate bounce offset (for bounce animation)
    let bounceOffset = 0;
    if (config.animation === 'bounce') {
      bounceOffset = 5 * Math.sin(t / 200);
    }

    // Determine if we should blink (for blink animation)
    let blink = false;
    if (config.animation === 'blink') {
      // Blink for 200ms every 3000ms
      if (t % 3000 < 200) {
        blink = true;
      }
    }

    // Draw the bear body, head, and ears (with bounce offset)
    ctx.fillStyle = config.furColor || '#8B4513';
    // Body
    ctx.beginPath();
    ctx.ellipse(150, 200 + bounceOffset, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(150, 120 + bounceOffset, 40, 0, 2 * Math.PI);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.arc(110, 70 + bounceOffset, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(190, 70 + bounceOffset, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Eyes (blink effect)
    if (blink) {
      ctx.strokeStyle = config.eyeColor || '#000000';
      ctx.lineWidth = 2;
      // Left eye (line)
      ctx.beginPath();
      ctx.moveTo(123, 110 + bounceOffset);
      ctx.lineTo(137, 110 + bounceOffset);
      ctx.stroke();
      // Right eye (line)
      ctx.beginPath();
      ctx.moveTo(163, 110 + bounceOffset);
      ctx.lineTo(177, 110 + bounceOffset);
      ctx.stroke();
    } else {
      ctx.fillStyle = config.eyeColor || '#000000';
      ctx.beginPath();
      ctx.arc(130, 110 + bounceOffset, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(170, 110 + bounceOffset, 7, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Nose
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(150, 140 + bounceOffset, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Mouth (Expressions)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (config.expression === 'smile') {
      ctx.arc(150, 160 + bounceOffset, 20, 0, Math.PI);
    } else if (config.expression === 'sad') {
      ctx.arc(150, 180 + bounceOffset, 20, Math.PI, 2 * Math.PI);
    } else if (config.expression === 'love') {
      ctx.moveTo(140, 160 + bounceOffset);
      ctx.quadraticCurveTo(150, 170 + bounceOffset, 160, 160 + bounceOffset);
      ctx.moveTo(140, 160 + bounceOffset);
      ctx.quadraticCurveTo(150, 150 + bounceOffset, 160, 160 + bounceOffset);
    }
    ctx.stroke();

    // Clothing
    if (config.clothing === 'hat') {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.ellipse(150, 50 + bounceOffset, 30, 15, 0, 0, Math.PI);
      ctx.fill();
    } else if (config.clothing === 'shirt') {
      ctx.fillStyle = 'blue';
      ctx.fillRect(90, 170 + bounceOffset, 120, 50);
    }

    // Accessories
    if (config.accessories === 'scarf') {
      ctx.fillStyle = 'purple';
      ctx.fillRect(90, 170 + bounceOffset, 120, 20);
    } else if (config.accessories === 'bow') {
      ctx.fillStyle = 'pink';
      ctx.beginPath();
      ctx.moveTo(200, 100 + bounceOffset);
      ctx.lineTo(210, 110 + bounceOffset);
      ctx.lineTo(200, 120 + bounceOffset);
      ctx.closePath();
      ctx.fill();
    }

    // Existing wave animation remains
    if (config.animation === 'wave') {
      ctx.beginPath();
      ctx.arc(80, 220 + bounceOffset, 15, 0.5 * Math.PI, 1.5 * Math.PI);
      ctx.stroke();
    }
  }

  // Continuous animation loop for the teddy bear
  function animateBear(timestamp) {
    // Only draw if a config exists; otherwise, draw default bear.
    drawBear(currentBearConfig, timestamp);
    requestAnimationFrame(animateBear);
  }

  /********************
   * Customization & Local Storage for Bear Configuration
   ********************/
  document.getElementById('customizeButton').addEventListener('click', function () {
    currentBearConfig = {
      furColor: document.getElementById('furColor').value,
      eyeColor: document.getElementById('eyeColor').value,
      clothing: document.getElementById('clothing').value,
      accessories: document.getElementById('accessories').value,
      expression: document.getElementById('expression').value,
      animation: document.getElementById('animation').value
    };
    // Save configuration to localStorage
    saveBearConfig();
  });

  document.getElementById('saveButton').addEventListener('click', function () {
    const bearData = JSON.stringify(currentBearConfig);
    download('bear_config.txt', bearData);
  });

  function saveBearConfig() {
    localStorage.setItem('bearConfig', JSON.stringify(currentBearConfig));
  }

  function loadBearConfig() {
    const storedConfig = localStorage.getItem('bearConfig');
    if (storedConfig) {
      currentBearConfig = JSON.parse(storedConfig);
      document.getElementById('furColor').value = currentBearConfig.furColor || '#8B4513';
      document.getElementById('eyeColor').value = currentBearConfig.eyeColor || '#000000';
      document.getElementById('clothing').value = currentBearConfig.clothing || 'none';
      document.getElementById('accessories').value = currentBearConfig.accessories || 'none';
      document.getElementById('expression').value = currentBearConfig.expression || 'smile';
      document.getElementById('animation').value = currentBearConfig.animation || 'none';
    } else {
      // Set a default configuration if none is saved
      currentBearConfig = {
        furColor: '#8B4513',
        eyeColor: '#000000',
        clothing: 'none',
        accessories: 'none',
        expression: 'smile',
        animation: 'none'
      };
    }
  }

  // Download function (for saving configuration as file)
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  /********************
   * Wish Saving Functionality (using localStorage)
   ********************/
  document.getElementById('submit-wish').addEventListener('click', function () {
    const wishInput = document.getElementById('wish-input');
    const wishText = wishInput.value.trim();
    if (wishText.length > 0) {
      let wishes = localStorage.getItem('wishes');
      if (wishes) {
        wishes = JSON.parse(wishes);
      } else {
        wishes = [];
      }
      wishes.push(wishText);
      localStorage.setItem('wishes', JSON.stringify(wishes));
      updateWishesDisplay();
      wishInput.value = '';
    }
  });

  function updateWishesDisplay() {
    let wishes = localStorage.getItem('wishes');
    const wishesList = document.getElementById('wishes-list');
    wishesList.innerHTML = '';
    if (wishes) {
      wishes = JSON.parse(wishes);
      wishes.forEach(function (wish) {
        const li = document.createElement('li');
        li.textContent = wish;
        wishesList.appendChild(li);
      });
    }
  }

  /********************
   * Initialize & Start Animations
   ********************/
  loadBearConfig();
  updateWishesDisplay();
  // Start the continuous animation loop for the teddy bear.
  requestAnimationFrame(animateBear);

  // (Optional) Add extra colors to the furColor select
  const furColorSelect = document.getElementById('furColor');
  const colors = ['#8B4513', '#654321', '#FFFFFF', '#FFC0CB', '#ADD8E6', '#FFFF00', '#800080', '#808080', '#FFA500', '#008000'];
  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.text = color;
    furColorSelect.add(option);
  });
});
