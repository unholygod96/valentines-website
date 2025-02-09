document.addEventListener('DOMContentLoaded', function() {
  // Sweet Messages Animation
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
  showMessage();

  // Falling Teddies Animation
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
  setInterval(createTeddy, 500);

  // Memory Cards Animation
  const memoryCards = document.querySelectorAll('.memory-card');
  memoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      createMemorySparkles(this);
    });
    card.addEventListener('mouseleave', function() {
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

  // Interactive Teddy Animation
  const magicTeddy = document.querySelector('.magic-teddy');
  const wishText = document.querySelector('.wish-text');
  magicTeddy.addEventListener('click', function() {
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

  // Sweet Notes Hover Effect
  const notes = document.querySelectorAll('.note');
  notes.forEach(note => {
    note.addEventListener('mouseenter', function() {
      this.style.transform = `scale(1.1) rotate(${Math.random() * 10 - 5}deg)`;
      createNoteSparkles(this);
    });
    note.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
  function createNoteSparkles(element) {
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      element.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  // Love Letter Toggle
  const loveLetterButton = document.getElementById('love-letter-button');
  const loveLetter = document.getElementById('love-letter');
  const closeLetter = document.getElementById('close-letter');
  loveLetterButton.addEventListener('click', function() {
    loveLetter.classList.add('show');
    createLetterSparkles(loveLetter);
  });
  closeLetter.addEventListener('click', function() {
    loveLetter.classList.remove('show');
  });
  document.addEventListener('click', function(event) {
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
  let timerInterval;
  let endTime;
  document.getElementById('set-timer').addEventListener('click', function() {
    const input = document.getElementById('calendar-input');
    if (input.value) {
      endTime = new Date(input.value).getTime();
      startTimer();
    }
  });
  document.getElementById('start-timer').addEventListener('click', function() {
    if (endTime) {
      startTimer();
    }
  });
  document.getElementById('pause-timer').addEventListener('click', function() {
    clearInterval(timerInterval);
  });
  document.getElementById('reset-timer').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00:00";
    endTime = null;
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
      const overlay = document.getElementById('timer-end-overlay');
      const overlayHeader = document.getElementById('overlay-header');
      overlayHeader.textContent = "Time's Up!";
      overlay.classList.remove('hidden');
      return;
    }
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timerDisplay.textContent =
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('timer-end-overlay').classList.add('hidden');
  });

  // Build-a-Bear Functionality
  const bearCanvas = document.getElementById('bearCanvas');
  const ctx = bearCanvas.getContext('2d');
  let currentBearConfig = {};
  function drawBear(config) {
    ctx.clearRect(0, 0, bearCanvas.width, bearCanvas.height);
    const defaultFurColor = '#8B4513';
    const defaultEyeColor = 'black';
    const defaultClothing = 'none';
    const defaultAccessories = 'none';
    const defaultExpression = 'smile';
    const defaultAnimation = 'none';
    const furColor = config.furColor || defaultFurColor;
    const eyeColor = config.eyeColor || defaultEyeColor;
    const clothing = config.clothing || defaultClothing;
    const accessories = config.accessories || defaultAccessories;
    const expression = config.expression || defaultExpression;
    const animation = config.animation || defaultAnimation;
    ctx.fillStyle = furColor;
    // Body
    ctx.beginPath();
    ctx.ellipse(150, 200, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(150, 120, 40, 0, 2 * Math.PI);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.arc(110, 70, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(190, 70, 20, 0, 2 * Math.PI);
    ctx.fill();
    // Eyes
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(130, 110, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(170, 110, 7, 0, 2 * Math.PI);
    ctx.fill();
    // Nose
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(150, 140, 4, 0, 2 * Math.PI);
    ctx.fill();
    // Mouth (Expressions)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (expression === 'smile') {
      ctx.arc(150, 160, 20, 0, Math.PI);
    } else if (expression === 'sad') {
      ctx.arc(150, 180, 20, Math.PI, 2 * Math.PI);
    } else if (expression === 'love') {
      ctx.moveTo(140, 160);
      ctx.quadraticCurveTo(150, 170, 160, 160);
      ctx.moveTo(140, 160);
      ctx.quadraticCurveTo(150, 150, 160, 160);
    }
    ctx.stroke();
    // Clothing
    if (clothing === 'hat') {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.ellipse(150, 50, 30, 15, 0, 0, Math.PI);
      ctx.fill();
    } else if (clothing === 'shirt') {
      ctx.fillStyle = 'blue';
      ctx.fillRect(90, 170, 120, 50);
    }
    // Accessories
    if (accessories === 'scarf') {
      ctx.fillStyle = 'purple';
      ctx.fillRect(90, 170, 120, 20);
    }
    // Animation: wave
    if (animation === 'wave') {
      ctx.beginPath();
      ctx.arc(80, 220, 15, 0.5 * Math.PI, 1.5 * Math.PI);
      ctx.stroke();
    }
  }
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  document.getElementById('customizeButton').addEventListener('click', function() {
    currentBearConfig = {
      furColor: document.getElementById('furColor').value,
      eyeColor: document.getElementById('eyeColor').value,
      clothing: document.getElementById('clothing').value,
      accessories: document.getElementById('accessories').value,
      expression: document.getElementById('expression').value,
      animation: document.getElementById('animation').value
    };
    drawBear(currentBearConfig);
    saveBearConfig();
  });
  document.getElementById('submit-wish').addEventListener('click', function() {
    const wishInput = document.getElementById('wish-input');
    const wishText = wishInput.value;
    sendWishEmail(wishText);
    wishInput.value = '';
    alert('Your wish has been sent!');
  });
  function sendWishEmail(wishText) {
    const emailBody = `Wish: ${wishText}`;
    const mailtoLink = `mailto:kautikshende@gmail.com?subject=New Wish&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
  }
  document.getElementById('saveButton').addEventListener('click', function() {
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
      document.getElementById('eyeColor').value = currentBearConfig.eyeColor || 'black';
      document.getElementById('clothing').value = currentBearConfig.clothing || 'none';
      document.getElementById('accessories').value = currentBearConfig.accessories || 'none';
      document.getElementById('expression').value = currentBearConfig.expression || 'smile';
      document.getElementById('animation').value = currentBearConfig.animation || 'none';
      drawBear(currentBearConfig);
    }
  }
  const furColorSelect = document.getElementById('furColor');
  const colors = ['#8B4513', '#A0522D', '#FFFFFF', '#FFC0CB', '#ADD8E6', '#FFFF00', '#800080', '#808080', 'orange', 'green'];
  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    let displayText = color;
    if (!color.startsWith('#')) {
      displayText = color.charAt(0).toUpperCase() + color.slice(1);
    }
    option.text = displayText;
    furColorSelect.add(option);
  });
  loadBearConfig();
});
