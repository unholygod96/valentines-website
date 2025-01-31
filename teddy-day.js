document.addEventListener('DOMContentLoaded', function() {
    const TeddyCreator = {
        init() {
            this.teddy = {
                face: document.createElement('div'),
                body: document.querySelector('.teddy-preview'),
                accessory: document.createElement('div')
            };
            this.setupTeddy();
            this.setupEventListeners();
        },

        setupTeddy() {
            // Set default expression
            this.teddy.face.className = 'teddy-expression';
            this.teddy.face.textContent = '😊';
            this.teddy.body.appendChild(this.teddy.face);

            // Set default accessory
            this.teddy.accessory.className = 'teddy-accessory';
            this.teddy.body.appendChild(this.teddy.accessory);
        },

        setupEventListeners() {
            // Expression buttons
            document.querySelectorAll('.expression-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.teddy.face.textContent = btn.textContent;
                    this.highlightButton(btn, '.expression-btn');
                });
            });

            // Color buttons
            const colorPicker = document.querySelector('.color-picker');
            if (colorPicker) {
                colorPicker.addEventListener('input', (e) => {
                    this.teddy.body.style.backgroundColor = e.target.value;
                    document.querySelectorAll('.ear').forEach(ear => {
                        ear.style.backgroundColor = e.target.value;
                    });
                });
            }

            // Accessory buttons
            document.querySelectorAll('.accessory-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.teddy.accessory.textContent = btn.textContent;
                    this.highlightButton(btn, '.accessory-btn');
                });
            });

            // Save button
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

        showSaveConfirmation() {
            const toast = document.createElement('div');
            toast.className = 'save-confirmation';
            toast.textContent = 'Teddy saved successfully!';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }
    };

    const MemoryGame = {
        init() {
            this.moves = 0;
            this.time = 0;
            this.timer = null;
            this.updateDisplay();
            this.setupEventListeners();
        },

        updateDisplay() {
            document.querySelector('.moves').textContent = `Moves: ${this.moves}`;
            document.querySelector('.time').textContent = 
                `Time: ${Math.floor(this.time / 60)}:${(this.time % 60).toString().padStart(2, '0')}`;
        },

        setupEventListeners() {
            document.querySelector('.reset-game').addEventListener('click', () => {
                this.resetGame();
            });
        },

        resetGame() {
            this.moves = 0;
            this.time = 0;
            clearInterval(this.timer);
            this.updateDisplay();
        }
    };

    const WishManager = {
        init() {
            this.setupEventListeners();
        },

        setupEventListeners() {
            document.querySelector('.send-wish').addEventListener('click', () => {
                const wishText = document.querySelector('textarea').value.trim();
                if (wishText) {
                    this.addWish(wishText);
                    document.querySelector('textarea').value = '';
                }
            });
        },

        addWish(text) {
            const wish = document.createElement('div');
            wish.className = 'wish';
            wish.textContent = text;
            document.querySelector('.wishes-display').prepend(wish);
        }
    };

    // Initialize all components
    TeddyCreator.init();
    MemoryGame.init();
    WishManager.init();
});
