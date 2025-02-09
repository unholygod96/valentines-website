document.addEventListener('DOMContentLoaded', function() {
    const TeddyCreator = {
        init() {
            this.teddy = {
                face: document.querySelector('.teddy-face'),
                body: document.querySelector('.teddy-body'),
                accessory: document.querySelector('.teddy-accessory'),
                ears: document.querySelectorAll('.ear')
            };
            this.setupTeddy();
            this.setupEventListeners();
            this.loadSavedTeddy();
        },

        setupTeddy() {
            this.teddy.face.textContent = '😊';
        },

        setupEventListeners() {
            document.querySelectorAll('.expression-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.teddy.face.textContent = btn.textContent;
                    this.highlightButton(btn, '.expression-btn');
                });
            });

            const colorPicker = document.getElementById('color-picker');
            colorPicker.addEventListener('input', (e) => {
                this.teddy.body.style.backgroundColor = e.target.value;
                this.teddy.ears.forEach(ear => {
                    ear.style.backgroundColor = e.target.value;
                });
            });

            document.querySelectorAll('.accessory-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.teddy.accessory.textContent = btn.textContent;
                    this.highlightButton(btn, '.accessory-btn');
                });
            });

            document.getElementById('save-teddy').addEventListener('click', () => {
                this.saveTeddy();
            });
        },

        highlightButton(selectedBtn, btnClass) {
            document.querySelectorAll(btnClass).forEach(btn => {
                btn.classList.remove('selected');
            });
            selectedBtn.classList.add('selected');
        },

        saveTeddy() {
            const teddyData = {
                expression: this.teddy.face.textContent,
                color: this.teddy.body.style.backgroundColor,
                accessory: this.teddy.accessory.textContent
            };
            localStorage.setItem('savedTeddy', JSON.stringify(teddyData));
            this.showSaveConfirmation();
        },

        loadSavedTeddy() {
            const savedTeddy = JSON.parse(localStorage.getItem('savedTeddy'));
            if (savedTeddy) {
                this.teddy.face.textContent = savedTeddy.expression;
                this.teddy.body.style.backgroundColor = savedTeddy.color;
                this.teddy.ears.forEach(ear => {
                    ear.style.backgroundColor = savedTeddy.color;
                });
                this.teddy.accessory.textContent = savedTeddy.accessory;
                document.getElementById('color-picker').value = savedTeddy.color;
            }
        },

        showSaveConfirmation() {
            const toast = document.createElement('div');
            toast.className = 'save-confirmation';
            toast.textContent = 'Teddy saved successfully!';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#4CAF50';
            toast.style.color = 'white';
            toast.style.padding = '15px';
            toast.style.borderRadius = '5px';
            toast.style.zIndex = '1000';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    };

    const MemoryGame = {
        init() {
            this.moves = 0;
            this.time = 0;
            this.timer = null;
            this.cards = ['🐻', '🧸', '🎀', '🎈', '🎁', '❤️', '🍯', '🌈'];
            this.cards = [...this.cards, ...this.cards];
            this.updateDisplay();
            this.setupEventListeners();
            this.createGameGrid();
        },

        updateDisplay() {
            document.querySelector('.moves').textContent = `Moves: ${this.moves}`;
            document.querySelector('.time').textContent = 
                `Time: ${Math.floor(this.time / 60)}:${(this.time % 60).toString().padStart(2, '0')}`;
        },

        setupEventListeners() {
            document.querySelector('.reset-btn').addEventListener('click', () => this.resetGame());
        },

        createGameGrid() {
            const gameGrid = document.querySelector('.game-grid');
            gameGrid.innerHTML = '';
            this.shuffleCards();
            this.cards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.dataset.cardIndex = index;
                cardElement.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">❓</div>
                        <div class="card-back">${card}</div>
                    </div>
                `;
                cardElement.addEventListener('click', () => this.flipCard(cardElement));
                gameGrid.appendChild(cardElement);
            });
        },

        shuffleCards() {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            }
        },

        flipCard(card) {
            if (card.classList.contains('flipped') || this.flippedCards.length === 2) return;
            
            card.classList.add('flipped');
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.moves++;
                this.updateDisplay();
                this.checkForMatch();
            }

            if (this.moves === 1) {
                this.startTimer();
            }
        },

        checkForMatch() {
            const [card1, card2] = this.flippedCards;
            const isMatch = this.cards[card1.dataset.cardIndex] === this.cards[card2.dataset.cardIndex];

            if (isMatch) {
                this.flippedCards = [];
                if (this.checkForWin()) {
                    this.endGame();
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    this.flippedCards = [];
                }, 1000);
            }
        },

        checkForWin() {
            return document.querySelectorAll('.card.flipped').length === this.cards.length;
        },

        startTimer() {
            this.timer = setInterval(() => {
                this.time++;
                this.updateDisplay();
            }, 1000);
        },

        endGame() {
            clearInterval(this.timer);
            alert(`Congratulations! You won in ${this.moves} moves and ${this.time} seconds!`);
        },

        resetGame() {
            clearInterval(this.timer);
            this.moves = 0;
            this.time = 0;
            this.flippedCards = [];
            this.updateDisplay();
            this.createGameGrid();
        }
    };

    const WishSender = {
        init() {
            this.wishInput = document.querySelector('.wish-section textarea');
            this.sendButton = document.querySelector('.send-wish');
            this.wishesDisplay = document.querySelector('.wishes-display');
            this.setupEventListeners();
            this.loadWishes();
        },

        setupEventListeners() {
            this.sendButton.addEventListener('click', () => this.sendWish());
        },

        sendWish() {
            const wishText = this.wishInput.value.trim();
            if (wishText) {
                const wish = { text: wishText, date: new Date().toLocaleString() };
                this.saveWish(wish);
                this.displayWish(wish);
                this.wishInput.value = '';
            }
        },

        saveWish(wish) {
            const wishes = JSON.parse(localStorage.getItem('teddyWishes')) || [];
            wishes.push(wish);
            localStorage.setItem('teddyWishes', JSON.stringify(wishes));
        },

        loadWishes() {
            const wishes = JSON.parse(localStorage.getItem('teddyWishes')) || [];
            wishes.forEach(wish => this.displayWish(wish));
        },

        displayWish(wish) {
            const wishElement = document.createElement('div');
            wishElement.classList.add('wish');
            wishElement.innerHTML = `
                <p>${wish.text}</p>
                <small>${wish.date}</small>
            `;
            this.wishesDisplay.prepend(wishElement);
        }
    };

    TeddyCreator.init();
    MemoryGame.init();
    WishSender.init();
});
