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
            this.setupComfortingMessages();
            this.setupMemoryGame();
            this.setupWishForm();
        },

        setupTeddy() {
            this.teddy.face.textContent = '(^‿^)';
        },

        setupEventListeners() {
            document.querySelectorAll('.expression-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const expression = btn.dataset.expression;
                    this.setExpression(expression);
                    this.highlightButton(btn, '.expression-btn');
                });
            });

            const colorPicker = document.getElementById('color-picker');
            colorPicker.addEventListener('input', (e) => {
                this.setColor(e.target.value);
            });

            document.querySelectorAll('.accessory-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const accessory = btn.dataset.accessory;
                    this.setAccessory(accessory);
                    this.highlightButton(btn, '.accessory-btn');
                });
            });

            document.getElementById('save-teddy').addEventListener('click', () => {
                this.saveTeddy();
            });
        },

        setExpression(expression) {
            const expressions = {
                happy: '(^‿^)',
                love: '(♥‿♥)',
                shy: '(⁄ ⁄•⁄ω⁄•⁄ ⁄)',
                excited: '(≧◡≦)',
                cool: '(⌐■_■)',
                sleepy: '(￣ω￣)'
            };
            this.teddy.face.textContent = expressions[expression] || '(^‿^)';
        },

        setColor(color) {
            this.teddy.body.style.backgroundColor = color;
            this.teddy.ears.forEach(ear => {
                ear.style.backgroundColor = color;
            });
        },

        setAccessory(accessory) {
            const accessories = {
                bow: '🎀',
                crown: '👑',
                hat: '🎩',
                scarf: '🧣',
                glasses: '👓',
                guitar: '🎸'
            };
            this.teddy.accessory.textContent = accessories[accessory] || '';
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
            this.uploadToGoogleDrive(teddyData);
        },

        loadSavedTeddy() {
            const savedTeddy = JSON.parse(localStorage.getItem('savedTeddy'));
            if (savedTeddy) {
                this.teddy.face.textContent = savedTeddy.expression;
                this.setColor(savedTeddy.color);
                this.teddy.accessory.textContent = savedTeddy.accessory;
                document.getElementById('color-picker').value = savedTeddy.color;
            }
        },

        showSaveConfirmation() {
            const toast = document.createElement('div');
            toast.className = 'save-confirmation';
            toast.textContent = 'Teddy saved successfully!';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        },

        uploadToGoogleDrive(teddyData) {
            // Implement Google Drive API integration here
            console.log('Uploading to Google Drive:', teddyData);
        },

        setupComfortingMessages() {
            const messages = [
                "You're my favorite teddy bear!",
                "Sending you a big bear hug!",
                "You make my heart feel warm and fuzzy.",
                "Our love is as cuddly as a teddy bear.",
                "You're beary special to me!",
                "I love you more than all the teddy bears in the world."
            ];
            const messageDisplay = document.getElementById('message-display');
            setInterval(() => {
                messageDisplay.textContent = messages[Math.floor(Math.random() * messages.length)];
            }, 5000);
        },

        setupMemoryGame() {
            const gameGrid = document.querySelector('.game-grid');
            const resetBtn = document.querySelector('.reset-btn');
            const movesDisplay = document.querySelector('.moves');
            const timeDisplay = document.querySelector('.time');
            let cards = [];
            let flippedCards = [];
            let moves = 0;
            let matchedPairs = 0;
            let timer;

            const cardImages = ['🧸', '🎀', '❤️', '🌟', '🍯', '🌼'];
            const allCards = [...cardImages, ...cardImages];

            function shuffleCards() {
                for (let i = allCards.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
                }
            }

            function createCard(cardImage) {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.image = cardImage;
                card.addEventListener('click', flipCard);
                return card;
            }

            function flipCard() {
                if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                    this.textContent = this.dataset.image;
                    this.classList.add('flipped');
                    flippedCards.push(this);
                    if (flippedCards.length === 2) {
                        moves++;
                        movesDisplay.textContent = `Moves: ${moves}`;
                        setTimeout(checkMatch, 500);
                    }
                }
            }

            function checkMatch() {
                const [card1, card2] = flippedCards;
                if (card1.dataset.image === card2.dataset.image) {
                    matchedPairs++;
                    if (matchedPairs === cardImages.length) {
                        endGame();
                    }
                } else {
                    card1.textContent = '';
                    card2.textContent = '';
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }
                flippedCards = [];
            }

            function startGame() {
                gameGrid.innerHTML = '';
                shuffleCards();
                allCards.forEach(cardImage => {
                    const card = createCard(cardImage);
                    gameGrid.appendChild(card);
                });
                moves = 0;
                matchedPairs = 0;
                movesDisplay.textContent = 'Moves: 0';
                clearInterval(timer);
                let seconds = 0;
                timer = setInterval(() => {
                    seconds++;
                    timeDisplay.textContent = `Time: ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
                }, 1000);
            }

            function endGame() {
                clearInterval(timer);
                alert('Congratulations! You won the game!');
            }

            resetBtn.addEventListener('click', startGame);
            startGame();
        },

        setupWishForm() {
            const wishForm = document.getElementById('wish-form');
            wishForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const wishText = document.getElementById('wish-text').value;
                this.sendWish(wishText);
            });
        },

        sendWish(wishText) {
            // In a real application, you would send this to a server
            // For this example, we'll just display it on the page
            const wishesDisplay = document.querySelector('.wishes-display');
            const wishElement = document.createElement('p');
            wishElement.textContent = wishText;
            wishesDisplay.appendChild(wishElement);
            document.getElementById('wish-text').value = '';

            // Simulating sending an email
            console.log(`Sending wish to kautikshende@gmail.com: ${wishText}`);
        }
    };

    TeddyCreator.init();
});
