document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    TeddyCreator.init();
    MemoryGame.init();
    WishManager.init();
});

// Teddy Creator Component
const TeddyCreator = {
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadSavedTeddy();
    },

    setupElements() {
        this.preview = document.querySelector('.teddy-preview');
        this.faceButtons = document.querySelectorAll('.face-btn');
        this.colorButtons = document.querySelectorAll('.color-btn');
        this.accessoryButtons = document.querySelectorAll('.accessory-btn');
        this.saveButton = document.getElementById('save-teddy');
        this.teddyFace = document.querySelector('.teddy-face');
        this.teddyBody = document.querySelector('.teddy-main');
        this.teddyAccessory = document.querySelector('.teddy-accessory');
    },

    setupEventListeners() {
        // Face selection
        this.faceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const face = button.dataset.face;
                this.teddyFace.textContent = face;
                this.addSparkleEffect(button);
            });
        });

        // Color selection
        this.colorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const color = button.style.backgroundColor;
                this.teddyBody.style.backgroundColor = color;
                document.querySelectorAll('.ear').forEach(ear => {
                    ear.style.backgroundColor = color;
                });
                this.addSparkleEffect(button);
            });
        });

        // Accessory selection
        this.accessoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const accessory = button.dataset.accessory;
                this.teddyAccessory.textContent = accessory;
                this.addSparkleEffect(button);
            });
        });

        // Save functionality
        this.saveButton.addEventListener('click', () => {
            this.saveTeddy();
            this.createSaveSparkles();
        });
    },

    addSparkleEffect(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.setProperty('--x', Math.random() * 100 + '%');
        sparkle.style.setProperty('--y', Math.random() * 100 + '%');
        element.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    },

    createSaveSparkles() {
        const sparklesContainer = document.querySelector('.sparkles-container');
        for(let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'save-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            sparklesContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    },

    saveTeddy() {
        const teddyData = {
            face: this.teddyFace.textContent,
            color: this.teddyBody.style.backgroundColor,
            accessory: this.teddyAccessory.textContent
        };
        localStorage.setItem('savedTeddy', JSON.stringify(teddyData));
        this.showSaveConfirmation();
    },

    loadSavedTeddy() {
        const savedTeddy = localStorage.getItem('savedTeddy');
        if (savedTeddy) {
            const teddyData = JSON.parse(savedTeddy);
            this.teddyFace.textContent = teddyData.face;
            this.teddyBody.style.backgroundColor = teddyData.color;
            this.teddyAccessory.textContent = teddyData.accessory;
        }
    },

    showSaveConfirmation() {
        const toast = document.createElement('div');
        toast.className = 'save-toast';
        toast.textContent = 'Your teddy has been saved! 🎉';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

// Memory Game Component
const MemoryGame = {
    init() {
        this.setupVariables();
        this.createCards();
        this.setupEventListeners();
        this.startNewGame();
    },

    setupVariables() {
        this.cardsContainer = document.querySelector('.cards-grid');
        this.movesDisplay = document.querySelector('.moves');
        this.timerDisplay = document.querySelector('.timer');
        this.resetButton = document.querySelector('.reset-btn');
        this.cards = [];
        this.flippedCards = [];
        this.isLocked = false;
        this.moves = 0;
        this.matches = 0;
        this.timer = null;
        this.seconds = 0;
    },

    createCards() {
        const emojis = ['🧸', '❤️', '🎀', '🌟', '🎈', '🎁'];
        const pairs = [...emojis, ...emojis];
        this.shuffleArray(pairs);

        this.cardsContainer.innerHTML = '';
        pairs.forEach((emoji, index) => {
            const card = this.createCardElement(emoji, index);
            this.cards.push(card);
            this.cardsContainer.appendChild(card);
        });
    },

    createCardElement(emoji, index) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = emoji;
        
        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = emoji;
        
        const back = document.createElement('div');
        back.className = 'card-back';
        back.textContent = '?';
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', () => this.flipCard(card));
        return card;
    },

    setupEventListeners() {
        this.resetButton.addEventListener('click', () => this.startNewGame());
    },

    startNewGame() {
        this.resetGameState();
        this.createCards();
        this.startTimer();
    },

    resetGameState() {
        clearInterval(this.timer);
        this.flippedCards = [];
        this.isLocked = false;
        this.moves = 0;
        this.matches = 0;
        this.seconds = 0;
        this.updateStats();
    },

    flipCard(card) {
        if (this.isLocked || this.flippedCards.includes(card)) return;
        
        card.classList.add('flipped');
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateStats();
            this.checkMatch();
        }
    },

    checkMatch() {
        const [first, second] = this.flippedCards;
        const match = first.dataset.value === second.dataset.value;
        
        this.isLocked = true;
        setTimeout(() => {
            if (match) {
                this.handleMatch();
            } else {
                this.handleMismatch();
            }
        }, 1000);
    },

    handleMatch() {
        this.matches++;
        this.flippedCards.forEach(card => {
            card.removeEventListener('click', () => this.flipCard(card));
        });
        this.resetTurn();
        
        if (this.matches === 6) {
            this.handleGameWin();
        }
    },

    handleMismatch() {
        this.flippedCards.forEach(card => {
            card.classList.remove('flipped');
        });
        this.resetTurn();
    },

    resetTurn() {
        this.flippedCards = [];
        this.isLocked = false;
    },

    startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.seconds++;
            this.updateStats();
        }, 1000);
    },

    updateStats() {
        this.movesDisplay.textContent = `Moves: ${this.moves}`;
        const minutes = Math.floor(this.seconds / 60);
        const remainingSeconds = this.seconds % 60;
        this.timerDisplay.textContent = 
            `Time: ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    handleGameWin() {
        clearInterval(this.timer);
        setTimeout(() => {
            alert(`Congratulations! 🎉\nYou completed the game in ${this.moves} moves and ${this.seconds} seconds!`);
            this.startNewGame();
        }, 500);
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
};

// Wish Manager Component
const WishManager = {
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadWishes();
    },

    setupElements() {
        this.wishText = document.getElementById('wish-text');
        this.sendButton = document.getElementById('send-wish');
        this.wishesDisplay = document.querySelector('.wishes-display');
    },

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendWish());
    },

    sendWish() {
        const wish = this.wishText.value.trim();
        if (wish) {
            this.addWish(wish);
            this.wishText.value = '';
        }
    },

    addWish(wish) {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-card';
        wishElement.innerHTML = `
            <p>💝 ${wish}</p>
            <span class="wish-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        this.wishesDisplay.insertBefore(wishElement, this.wishesDisplay.firstChild);
        wishElement.style.opacity = '0';
        wishElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            wishElement.style.opacity = '1';
            wishElement.style.transform = 'translateY(0)';
        }, 10);

        this.saveWishes();
    },

    saveWishes() {
        const wishes = Array.from(this.wishesDisplay.children).map(wish => ({
            text: wish.querySelector('p').textContent,
            time: wish.querySelector('.wish-time').textContent
        }));
        localStorage.setItem('teddyWishes', JSON.stringify(wishes));
    },

    loadWishes() {
        const savedWishes = localStorage.getItem('teddyWishes');
        if (savedWishes) {
            JSON.parse(savedWishes).forEach(wish => {
                const wishElement = document.createElement('div');
                wishElement.className = 'wish-card';
                wishElement.innerHTML = `
                    <p>${wish.text}</p>
                    <span class="wish-time">${wish.time}</span>
                `;
                this.wishesDisplay.appendChild(wishElement);
            });
        }
    }
};
