document.addEventListener('DOMContentLoaded', function() {
  // Teddy Messages Animation
  const teddyMessages = [
    "You are as cuddly as a teddy bear! 🧸",
    "Every cuddle with you warms my heart! ❤️",
    "Your smile is my favorite snuggle! 🧸",
    "Hugs, cuddles, and love – all for you! ❤️",
    "Forever wrapped in your love! 🧸"
  ];
  const messageElement = document.getElementById('message-display');
  let currentIndex = 0;
  function showMessage() {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      messageElement.textContent = teddyMessages[currentIndex];
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
      currentIndex = (currentIndex + 1) % teddyMessages.length;
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

  // Teddy Customization Functionality
  const applyButton = document.getElementById('apply-customization');
  const playAnimationButton = document.getElementById('play-animation');
  const saveTeddyButton = document.getElementById('save-teddy');
  const loadTeddyButton = document.getElementById('load-teddy');

  const furColorInput = document.getElementById('fur-color');
  const eyeColorInput = document.getElementById('eye-color');
  const clothingColorInput = document.getElementById('clothing-color');
  const accessorySelect = document.getElementById('accessory-select');
  const animationSelect = document.getElementById('animation-select');

  const teddyHead = document.getElementById('teddy-head');
  const teddyEarLeft = document.getElementById('teddy-ear-left');
  const teddyEarRight = document.getElementById('teddy-ear-right');
  const teddyBody = document.getElementById('teddy-body');
  const teddyEyeLeft = document.getElementById('teddy-eye-left');
  const teddyEyeRight = document.getElementById('teddy-eye-right');
  const teddyClothing = document.getElementById('teddy-clothing');
  const teddyHat = document.getElementById('teddy-hat');

  applyButton.addEventListener('click', function() {
    // Apply fur color
    const furColor = furColorInput.value;
    teddyHead.setAttribute('fill', furColor);
    teddyEarLeft.setAttribute('fill', furColor);
    teddyEarRight.setAttribute('fill', furColor);
    teddyBody.setAttribute('fill', furColor);
    
    // Apply eye color
    const eyeColor = eyeColorInput.value;
    teddyEyeLeft.setAttribute('fill', eyeColor);
    teddyEyeRight.setAttribute('fill', eyeColor);
    
    // Apply clothing color
    const clothingColor = clothingColorInput.value;
    teddyClothing.setAttribute('fill', clothingColor);
    
    // Apply accessory
    const accessory = accessorySelect.value;
    if (accessory === 'hat') {
      teddyHat.style.display = 'block';
      teddyHat.setAttribute('fill', clothingColor);
      teddyClothing.style.stroke = 'none';
    } else if (accessory === 'scarf') {
      // For demonstration, add a red stroke to simulate a scarf effect.
      teddyHat.style.display = 'none';
      teddyClothing.style.stroke = '#FF0000';
      teddyClothing.style.strokeWidth = '4';
    } else {
      teddyHat.style.display = 'none';
      teddyClothing.style.stroke = 'none';
    }
    
    // Save configuration to a variable for later saving
    currentTeddyConfig = {
      furColor: furColor,
      eyeColor: eyeColor,
      clothingColor: clothingColor,
      accessory: accessory,
      animation: animationSelect.value
    };
    
    displayTemporaryMessage("Your teddy is now as unique as our love!", 2000);
  });

  // Display a temporary message on the screen
  function displayTemporaryMessage(msg, duration) {
    const tempMessage = document.createElement('div');
    tempMessage.className = 'temp-message';
    tempMessage.textContent = msg;
    tempMessage.style.position = 'absolute';
    tempMessage.style.top = '10px';
    tempMessage.style.left = '50%';
    tempMessage.style.transform = 'translateX(-50%)';
    tempMessage.style.background = 'rgba(255,255,255,0.8)';
    tempMessage.style.padding = '10px';
    tempMessage.style.borderRadius = '10px';
    document.body.appendChild(tempMessage);
    setTimeout(() => tempMessage.remove(), duration);
  }

  // Teddy Animation Functionality
  playAnimationButton.addEventListener('click', function() {
    const animation = animationSelect.value;
    // Add a temporary CSS class for animation on the SVG container
    const teddyContainer = document.getElementById('teddy-svg');
    if (animation === 'flying-kiss') {
      teddyContainer.classList.add('flying-kiss-animation');
      setTimeout(() => teddyContainer.classList.remove('flying-kiss-animation'), 2000);
    } else if (animation === 'hug') {
      teddyContainer.classList.add('hug-animation');
      setTimeout(() => teddyContainer.classList.remove('hug-animation'), 2000);
    } else if (animation === 'wave') {
      teddyContainer.classList.add('wave-animation');
      setTimeout(() => teddyContainer.classList.remove('wave-animation'), 2000);
    }
  });

  // Save teddy configuration (simulate saving to Google Drive)
  // Here we simply create a downloadable JSON file.
  let currentTeddyConfig = {};
  saveTeddyButton.addEventListener('click', function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentTeddyConfig));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "teddy_config_" + new Date().getTime() + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    displayTemporaryMessage("Teddy saved! You can upload the file later.", 2000);
    // For true Google Drive integration, you could integrate the Google Picker API here.
  });

  // Load teddy configuration (simulate loading)
  loadTeddyButton.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        const config = JSON.parse(e.target.result);
        furColorInput.value = config.furColor;
        eyeColorInput.value = config.eyeColor;
        clothingColorInput.value = config.clothingColor;
        accessorySelect.value = config.accessory;
        animationSelect.value = config.animation;
        applyButton.click();
        displayTemporaryMessage("Teddy loaded!", 2000);
      };
      reader.readAsText(file);
    });
    fileInput.click();
  });

  // Mini Game: Teddy Hunt Game
  const gameArea = document.getElementById('teddy-game-area');
  const gameScoreDisplay = document.getElementById('game-score');
  let gameScore = 0;
  function spawnGameTeddy() {
    const gameTeddy = document.createElement('div');
    gameTeddy.className = 'teddy game-teddy';
    gameTeddy.textContent = '🧸';
    gameTeddy.style.position = 'absolute';
    gameTeddy.style.left = Math.random() * 90 + '%';
    gameTeddy.style.top = '0';
    gameTeddy.style.fontSize = '30px';
    gameArea.appendChild(gameTeddy);
    let pos = 0;
    const fallInterval = setInterval(() => {
      pos += 2;
      gameTeddy.style.top = pos + '%';
      if (pos > 100) {
        clearInterval(fallInterval);
        gameTeddy.remove();
      }
    }, 50);
    gameTeddy.addEventListener('click', function() {
      gameScore += 10;
      gameScoreDisplay.textContent = "Score: " + gameScore;
      clearInterval(fallInterval);
      gameTeddy.remove();
    });
  }
  setInterval(spawnGameTeddy, 2000);

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
      timerDisplay.textContent = "Time's Up! ❤️";
      return;
    }
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
});
