document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    TeddyRain.init();
    TeddyCreator.init();
    MemoryGame.init();
    WishManager.init();
});

// Teddy Rain Animation
const TeddyRain = {
    init() {
        this.container = document.querySelector('.teddy-rain-container');
        this.createTeddies();
        setInterval(() => this.createTeddies(), 2000);
    },

    createTeddies() {
        const teddy = document.createElement('div');
        teddy.className = 'falling-teddy';
        teddy.textContent = '🧸';
        
        // Random position and animation duration
        const startPos = Math.random() * window.innerWidth;
        const animDuration = Math.random() * 3 + 2; // 2-5 seconds
        
        teddy.style.left = `${startPos}px`;
        teddy.style.animationDuration = `${animDuration}s`;
        
        this.container.appendChild(teddy);
        
        // Remove teddy after animation
        setTimeout(() => teddy.remove(), animDuration * 1000);
    }
};

// Teddy Creator Component
const TeddyCreator = {
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadSavedTeddy();
    },

    setupElements() {
        this.teddyFace = document.querySelector('.teddy-face');
        this.teddyBody = document.querySelector('.teddy-main');
        this.teddyAccessory = document.querySelector('.teddy-accessory');
        this.saveButton = document.getElementById('save-teddy');
    },

    setupEventListeners() {
        // Face buttons
        document.querySelectorAll('.face-btn').forEach(button => {
            button.addEventListener('click', () => {
                const face = button.dataset.face;
                this.updateFace(face);
                this.addSparkleEffect(button);
            });
        });

        // Color buttons
        document.querySelectorAll('.color-btn').forEach(button => {
            button.addEventListener('click', () => {
                const color = window.getComputedStyle(button).backgroundColor;
                this.updateColor(color);
                this.addSparkleEffect(button);
            });
        });

        // Accessory buttons
        document.querySelectorAll('.accessory-btn').forEach(button => {
            button.addEventListener('click', () => {
                const accessory = button.dataset.accessory;
                this.updateAccessory(accessory);
                this.addSparkleEffect(button);
            });
        });

        // Save button
        this.saveButton.addEventListener('click', () => this.saveTeddy());
    },

    updateFace(face) {
        this.teddyFace.textContent = face;
        this.teddyFace.style.animation = 'bounceIn 0.3s ease';
        setTimeout(() => this.teddyFace.style.animation = '', 300);
    },

    updateColor(color) {
        this.teddyBody.style.backgroundColor = color;
        document.querySelectorAll('.ear').forEach(ear => {
            ear.style.backgroundColor = color;
        });
    },

    updateAccessory(accessory) {
        this.teddyAccessory.textContent = accessory;
        this.teddyAccessory.style.animation = 'bounceIn 0.3s ease';
        setTimeout(() => this.teddyAccessory.style.animation = '', 300);
    },

    addSparkleEffect(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        element.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
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
            const data = JSON.parse(savedTeddy);
            this.updateFace(data.face);
            this.updateColor(data.color);
            this.updateAccessory(data.accessory);
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
        this.setupGame();
        this.setupEventListeners();
    },

    setupGame() {
        this.moves = 0;
        this.matches = 0;
        this.flippedCards = [];
        this.isLocked = false;
        this.createCards();
        this.updateStats();
        this.startTimer();
    },

    createCards() {
        const grid = document.querySelector('.cards-grid');
        grid.innerHTML = '';
        
        const emojis = ['🧸', '❤️', '🎀', '⭐', '🎈', '🎁'];
        const pairs = [...emojis, ...emojis];
        this.shuffleArray(pairs);

        pairs.forEach((emoji, index) => {
            const card = this.createCardElement(emoji, index);
            grid.appendChild(card);
        });
    },

    createCardElement(emoji, index) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="card-front">${emoji}</div>
            <div class="card-back">?</div>
        `;
        card.dataset.value = emoji;
        card.addEventListener('click', () => this.flipCard(card));
        return card;
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
            this.handleWin();
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

    handleWin() {
        clearInterval(this.timer);
        setTimeout(() => {
            alert(`Congratulations! 🎉\nYou completed the game in ${this.moves} moves!`);
            this.setupGame();
        }, 500);
    },

    updateStats() {
        document.querySelector('.moves').textContent = `Moves: ${this.moves}`;
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    setupEventListeners() {
        document.querySelector('.reset-btn').addEventListener('click', () => {
            this.setupGame();
        });
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
        this.wishInput = document.getElementById('wish-text');
        this.wishesDisplay = document.querySelector('.wishes-display');
    },

    setupEventListeners() {
        document.getElementById('send-wish').addEventListener('click', () => {
            this.sendWish();
        });
    },

    sendWish() {
        const wishText = this.wishInput.value.trim();
        if (wishText) {
            this.addWish(wishText);
            this.wishInput.value = '';
            this.saveWishes();
        }
    },

    addWish(text) {
        const wish = document.createElement('div');
        wish.className = 'wish-card';
        wish.innerHTML = `
            <p>🧸 ${text}</p>
            <span class="wish-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        this.wishesDisplay.insertBefore(wish, this.wishesDisplay.firstChild);
        wish.style.animation = 'bounceIn 0.5s ease';
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
                this.addWish(wish.text.replace('🧸 ', ''));
            });
        }
    }
};
