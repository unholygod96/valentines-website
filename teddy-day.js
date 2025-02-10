document.addEventListener('DOMContentLoaded', function () {
  /* 1) Random Cute Quotes – updates every 5 seconds */
  const cuteQuotes = [
    "You are the sweetest part of my day!",
    "Every hug from you feels like home.",
    "You light up my life with your smile!",
    "Being with you is like a dream come true.",
    "Your love is my greatest treasure.",
    "You make every moment magical."
  ];
  const quoteDisplay = document.getElementById('quote-display');
  function updateQuote() {
    const randomIndex = Math.floor(Math.random() * cuteQuotes.length);
    quoteDisplay.textContent = cuteQuotes[randomIndex];
  }
  updateQuote();
  setInterval(updateQuote, 5000);

  /* 2) Falling Teddies Animation (kept as before) */
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

  /* 3) Timer Functions (unchanged) */
  const timerDisplay = document.getElementById('custom-timer-display');
  const timerHeader = document.getElementById('timer-header');
  let timerInterval, endTime;
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
      timerDisplay.textContent = "Time's Up! 💝";
      return;
    }
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timerDisplay.textContent =
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /* 4) Build-a-Bear Functionality (New Implementation) */
  const bearCanvas = document.getElementById('bearCanvas');
  const ctx = bearCanvas.getContext('2d');
  let currentBearConfig = {
    furColor: '#8B4513',
    eyeColor: '#000000',
    clothing: 'none',
    accessories: 'none',
    expression: 'smile',
    animation: 'none'
  };

  function drawBear() {
    ctx.clearRect(0, 0, bearCanvas.width, bearCanvas.height);
    // Draw Head (a simple circle)
    ctx.beginPath();
    ctx.arc(200, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = currentBearConfig.furColor;
    ctx.fill();
    // Draw Ears
    ctx.beginPath();
    ctx.arc(120, 80, 30, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(280, 80, 30, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Eyes
    ctx.beginPath();
    ctx.arc(170, 130, 10, 0, 2 * Math.PI);
    ctx.fillStyle = currentBearConfig.eyeColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(230, 130, 10, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Nose (triangle)
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(190, 170);
    ctx.lineTo(210, 170);
    ctx.fillStyle = 'black';
    ctx.fill();
    // Draw Mouth based on expression
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    if (currentBearConfig.expression === 'smile') {
      ctx.beginPath();
      ctx.arc(200, 160, 20, 0, Math.PI, false);
      ctx.stroke();
    } else if (currentBearConfig.expression === 'sad') {
      ctx.beginPath();
      ctx.arc(200, 180, 20, Math.PI, 0, true);
      ctx.stroke();
    } else if (currentBearConfig.expression === 'love') {
      ctx.beginPath();
      ctx.moveTo(190, 160);
      ctx.quadraticCurveTo(200, 170, 210, 160);
      ctx.stroke();
    }
    // Draw Clothing
    if (currentBearConfig.clothing === 'shirt') {
      ctx.fillStyle = 'blue';
      ctx.fillRect(150, 250, 100, 50);
    } else if (currentBearConfig.clothing === 'hat') {
      ctx.fillStyle = 'red';
      ctx.fillRect(150, 50, 100, 30);
    }
    // Draw Accessories (scarf)
    if (currentBearConfig.accessories === 'scarf') {
      ctx.fillStyle = 'purple';
      ctx.fillRect(150, 220, 100, 20);
    }
    // Animation: Waving paw if selected
    if (currentBearConfig.animation === 'wave') {
      const time = Date.now();
      const waveAngle = Math.sin(time / 500) * (Math.PI / 8);
      ctx.save();
      ctx.translate(150, 220);
      ctx.rotate(waveAngle);
      ctx.fillStyle = currentBearConfig.furColor;
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    } else {
      // Static paw
      ctx.fillStyle = currentBearConfig.furColor;
      ctx.beginPath();
      ctx.arc(150, 220, 15, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  // Initial draw
  drawBear();
  // Update bear when options change
  const customizationElements = [
    'furColor',
    'eyeColor',
    'clothing',
    'accessories',
    'expression',
    'animation'
  ];
  customizationElements.forEach((id) => {
    document.getElementById(id).addEventListener('change', function () {
      currentBearConfig[id] = this.value;
      drawBear();
    });
  });
  // "Customize Teddy" button also updates all settings.
  document.getElementById('customizeButton').addEventListener('click', function () {
    currentBearConfig = {
      furColor: document.getElementById('furColor').value,
      eyeColor: document.getElementById('eyeColor').value,
      clothing: document.getElementById('clothing').value,
      accessories: document.getElementById('accessories').value,
      expression: document.getElementById('expression').value,
      animation: document.getElementById('animation').value
    };
    drawBear();
  });
  // Save Teddy configuration to a file
  document.getElementById('saveButton').addEventListener('click', function () {
    const bearData = JSON.stringify(currentBearConfig);
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(bearData)
    );
    element.setAttribute('download', 'bear_config.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });

  /* 5) Love Letter Toggle – Fixed Implementation */
  const loveLetterButton = document.getElementById('love-letter-button');
  const loveLetter = document.getElementById('love-letter');
  const closeLetter = document.getElementById('close-letter');

  loveLetterButton.addEventListener('click', function (e) {
    e.stopPropagation();
    loveLetter.style.display = 'block';
  });
  closeLetter.addEventListener('click', function (e) {
    e.stopPropagation();
    loveLetter.style.display = 'none';
  });
  // Close love letter when clicking outside of it
  document.addEventListener('click', function (e) {
    if (!loveLetter.contains(e.target) && !loveLetterButton.contains(e.target)) {
      loveLetter.style.display = 'none';
    }
  });

  /* 6) Background Music Toggle (unchanged) */
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
});
