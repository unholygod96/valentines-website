document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    FloatingElements.init();
    TeddyCreator.init();
    MemoryGame.init();
    WishGenerator.init();
});

// Floating Background Elements
const FloatingElements = {
    init() {
        this.createFloatingElements();
        this.animateElements();
    },

    createFloatingElements() {
        const elements = {
            hearts: ['❤️', '💖', '💝', '💕'],
            stars: ['⭐', '✨', '🌟'],
            teddies: ['🧸']
        };

        Object.entries(elements).forEach(([type, symbols]) => {
            const container = document.querySelector(`.${type}-container`);
            for(let i = 0; i < 10; i++) {
                const element = document.createElement('div');
                element.className = `floating-${type.slice(0, -1)}`;
                element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                element.style.left = `${Math.random() * 100}vw`;
                element.style.animationDelay = `${Math.random() * 5}s`;
                element.style.fontSize = `${Math.random() * 20 + 20}px`;
                container.appendChild(element);
            }
        });
    },

    animateElements() {
        const elements = document.querySelectorAll('[class^="floating-"]');
        elements.forEach(element => {
            element.style.animation = `float ${Math.random() * 3 + 4}s ease-in-out infinite`;
        });
    }
};

// Teddy Creator Component
const TeddyCreator = {
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadSavedTeddy();
        this.initRotation();
    },

    setupElements() {
        this.teddyStage = document.querySelector('.teddy-stage');
        this.teddyModel = document.querySelector('.teddy-model');
        this.teddyFace = document.querySelector('.teddy-face');
        this.teddyBody = document.querySelector('.teddy-body');
        this.teddyAccessory = document.querySelector('.teddy-accessory');
        this.rotateButtons = document.querySelectorAll('.rotate-btn');
        this.currentRotation = 0;
    },

    setupEventListeners() {
        // Expression buttons
        document.querySelectorAll('.expression-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const expression = btn.dataset.expression;
                this.updateExpression(expression);
                this.addButtonSparkle(btn);
            });
        });

        // Color buttons
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const color = window.getComputedStyle(btn).background;
                this.updateColor(color);
                this.addButtonSparkle(btn);
            });
        });

        // Accessory buttons
        document.querySelectorAll('.accessory-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const accessory = btn.dataset.accessory;
                this.updateAccessory(accessory);
                this.addButtonSparkle(btn);
            });
        });

        // Rotation controls
        this.rotateButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.classList.contains('left') ? -1 : 1;
                this.rotateTeddy(direction);
            });
        });

        // Save button
        document.querySelector('.save-teddy-btn').addEventListener('click', () => {
            this.saveTeddy();
            this.createSaveEffect();
        });
    },

    updateExpression(expression) {
        this.teddyFace.textContent = expression;
        this.teddyFace.style.animation = 'popIn 0.3s ease-out';
        setTimeout(() => this.teddyFace.style.animation = '', 300);
    },

    updateColor(color) {
        this.teddyBody.style.background = color;
        document.querySelectorAll('.ear').forEach(ear => {
            ear.style.background = color;
        });
    },

    updateAccessory(accessory) {
        this.teddyAccessory.textContent = accessory;
        this.teddyAccessory.style.animation = 'popIn 0.3s ease-out';
        setTimeout(() => this.teddyAccessory.style.animation = '', 300);
    },

    rotateTeddy(direction) {
        this.currentRotation += direction * 45;
        this.teddyModel.style.transform = `translate(-50%, -50%) rotateY(${this.currentRotation}deg)`;
    },

    addButtonSparkle(button) {
        const sparkle = document.createElement('div');
        sparkle.className = 'button-sparkle';
        button.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    },

    createSaveEffect() {
        const particles = document.createElement('div');
        particles.className = 'save-particles';
        document.body.appendChild(particles);
        setTimeout(() => particles.remove(), 1000);
    },

    saveTeddy() {
        const teddyData = {
            expression: this.teddyFace.textContent,
            color: this.teddyBody.style.background,
            accessory: this.teddyAccessory.textContent,
            rotation: this.currentRotation
        };
        localStorage.setItem('savedTeddy', JSON.stringify(teddyData));
        this.showSaveToast();
    },

    loadSavedTeddy() {
        const savedTeddy = localStorage.getItem('savedTeddy');
        if (savedTeddy) {
            const data = JSON.parse(savedTeddy);
            this.updateExpression(data.expression);
            this.updateColor(data.color);
            this.updateAccessory(data.accessory);
            this.currentRotation = data.rotation;
            this.teddyModel.style.transform = `translate(-50%, -50%) rotateY(${this.currentRotation}deg)`;
        }
    },

    showSaveToast() {
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
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLocked = false;
        this.moves = 0;
        this.timer = null;
        this.seconds = 0;
        
        this.createCards();
        this.updateStats();
        this.startTimer();
    },

    createCards() {
        const grid = document.querySelector('.memory-grid');
        grid.innerHTML = '';
        
        const emojis = ['🧸', '❤️', '🎀', '⭐', '🎈', '🎁'];
        const pairs = [...emojis, ...emojis];
        this.shuffleArray(pairs);

        pairs.forEach((emoji, index) => {
            const card = this.createCardElement(emoji, index);
            this.cards.push(card);
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
        this.flippedCards.forEach(card => {
            card.classList.add('matched');
            card.removeEventListener('click', () => this.flipCard(card));
        });
        this.matchedPairs++;
        this.resetTurn();

        if (this.matchedPairs === 6) {
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
            alert(`Congratulations! 🎉\nYou completed the game in ${this.moves} moves and ${this.seconds} seconds!`);
            this.setupGame();
        }, 500);
    },

    startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.seconds++;
            this.updateStats();
        }, 1000);
    },

    updateStats() {
        document.querySelector('.moves').textContent = `Moves: ${this.moves}`;
        const minutes = Math.floor(this.seconds / 60);
        const remainingSeconds = this.seconds % 60;
        document.querySelector('.timer').textContent = 
            `Time: ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    setupEventListeners() {
        document.querySelector('.reset-game-btn').addEventListener('click', () => {
            this.setupGame();
        });
    }
};

// Wish Generator Component
const WishGenerator = {
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadWishes();
    },

    setupElements() {
        this.wishInput = document.querySelector('.wish-input');
        this.wishesDisplay = document.querySelector('.wishes-display');
    },

    setupEventListeners() {
        document.querySelector('.send-wish-btn').addEventListener('click', () => {
            this.sendWish();
        });

        document.querySelectorAll('.decoration-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.addDecoration(btn.dataset.decoration);
            });
        });
    },

    sendWish() {
        const wishText = this.wishInput.value.trim();
        if (wishText) {
            this.createWishCard(wishText);
            this.wishInput.value = '';
            this.saveWishes();
        }
    },

    createWishCard(text) {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
            <p>${text}</p>
            <span class="wish-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        this.wishesDisplay.insertBefore(card, this.wishesDisplay.firstChild);
        card.style.animation = 'popIn 0.5s ease-out';
    },

    addDecoration(decoration) {
        const cursorPos = this.wishInput.selectionStart;
        const text = this.wishInput.value;
        this.wishInput.value = text.slice(0, cursorPos) + decoration + text.slice(cursorPos);
        this.wishInput.focus();
        this.wishInput.setSelectionRange(cursorPos + decoration.length, cursorPos + decoration.length);
    },

    saveWishes() {
        const wishes = Array.from(this.wishesDisplay.children).map(card => ({
            text: card.querySelector('p').textContent,
            time: card.querySelector('.wish-time').textContent
        }));
        localStorage.setItem('teddyWishes', JSON.stringify(wishes));
    },

    loadWishes() {
        const savedWishes = localStorage.getItem('teddyWishes');
        if (savedWishes) {
            JSON.parse(savedWishes).forEach(wish => {
                this.createWishCard(wish.text);
            });
        }
    }
};
