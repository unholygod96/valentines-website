document.addEventListener('DOMContentLoaded', function() {
    // Teddy Messages
    const teddyMessages = [
        "Sending you a big bear hug! 🐻",
        "You're my favorite teddy bear! 🧸",
        "Cuddles make everything better! 💖",
        "Life is better with you by my side! 😊"
    ];

    let currentMessageIndex = 0;
    const typingMessage = document.querySelector('#typing-message');

    function typeMessage(message, index = 0) {
        if (index < message.length) {
            typingMessage.textContent += message.charAt(index);
            setTimeout(() => typeMessage(message, index + 1), 50);
        } else {
            setTimeout(() => {
                typingMessage.textContent = '';
                currentMessageIndex = (currentMessageIndex + 1) % teddyMessages.length;
                typeMessage(teddyMessages[currentMessageIndex]);
            }, 3000);
        }
    }

    // Start the typing animation
    typeMessage(teddyMessages[0]);

    // Teddy Rain Animation
    function createTeddy() {
        const teddy = document.createElement('div');
        teddy.className = 'teddy';
        teddy.textContent = '🧸';
        teddy.style.left = Math.random() * 100 + 'vw';
        teddy.style.animationDuration = Math.random() * 3 + 2 + 's';
        teddy.style.opacity = Math.random();
        teddy.style.fontSize = Math.random() * 10 + 10 + 'px';

        document.querySelector('.teddy-rain').appendChild(teddy);

        setTimeout(() => {
            teddy.remove();
        }, 5000);
    }

    // Create teddies periodically
    setInterval(createTeddy, 300);

    // Teddy Creator
    const faceSelect = document.getElementById('face-select');
    const bodyColor = document.getElementById('body-color');
    const accessorySelect = document.getElementById('accessory-select');
    const teddyFace = document.getElementById('teddy-face');
    const teddyBody = document.getElementById('teddy-body');
    const teddyAccessory = document.getElementById('teddy-accessory');
    const saveTeddyBtn = document.getElementById('save-teddy');

    faceSelect.addEventListener('change', (e) => {
        teddyFace.textContent = e.target.value;
    });

    bodyColor.addEventListener('input', (e) => {
        teddyBody.style.color = e.target.value;
    });

    accessorySelect.addEventListener('change', (e) => {
        teddyAccessory.textContent = e.target.value;
    });

    saveTeddyBtn.addEventListener('click', () => {
        alert('Your custom teddy has been saved! 🎉');
        // Here you could add functionality to actually save the teddy or send it somewhere
    });

    // Memory Game
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));

    // Teddy Wish Sender
    const wishText = document.getElementById('wish-text');
    const sendWishBtn = document.getElementById('send-wish');
    const wishDisplay = document.getElementById('wish-display');

    sendWishBtn.addEventListener('click', function() {
        const wish = wishText.value.trim();
        if (wish) {
            const wishElement = document.createElement('p');
            wishElement.textContent = `💌 ${wish}`;
            wishDisplay.appendChild(wishElement);
            wishText.value = '';
            
            // Add a little animation to the new wish
            wishElement.style.opacity = '0';
            wishElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
                wishElement.style.transition = 'all 0.5s ease';
                wishElement.style.opacity = '1';
                wishElement.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    // Add some interactivity to the header
    const header = document.querySelector('.teddy-day-header');
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        header.style.setProperty('--mouse-x', `${x}px`);
        header.style.setProperty('--mouse-y', `${y}px`);
    });
});
