document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Array
    const sweetMessages = [
        { text: "You're", duration: 2000 },
        { text: "better", duration: 2000 },
        { text: "than chocolate!", duration: 2000 },
        { text: "sweetest", duration: 2000 },
        { text: "delicious", duration: 2000 },
        { text: "you! ⭐", duration: 2000 }
    ];

    const messageElement = document.getElementById('sweet-message');
    let currentIndex = 0;

    function showMessage() {
        if (currentIndex >= sweetMessages.length) {
            currentIndex = 0;
        }

        const currentMessage = sweetMessages[currentIndex];

        // Clear previous message and add new one with fade effect
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageElement.textContent = currentMessage.text;
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
            
            // Schedule next message
            setTimeout(() => {
                currentIndex++;
                showMessage();
            }, currentMessage.duration);
        }, 500);
    }

    // Start message animation
    showMessage();

    // Falling Chocolates Animation
    function createChocolate() {
        const chocolate = document.createElement('div');
        chocolate.className = 'chocolate';
        chocolate.textContent = '🍫';
        
        chocolate.style.left = Math.random() * 100 + 'vw';
        chocolate.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const duration = 7 + Math.random() * 5;
        chocolate.style.animationDuration = `${duration}s`;
        
        document.querySelector('.chocolates-falling').appendChild(chocolate);
        
        setTimeout(() => chocolate.remove(), duration * 1000);
    }

    // Create chocolates periodically
    setInterval(createChocolate, 500);

    // Interactive Chocolate Box
    const chocolatePieces = document.querySelectorAll('.chocolate-piece');
    let piecesOpened = 0;

    chocolatePieces.forEach(piece => {
        piece.addEventListener('click', function() {
            if (!this.classList.contains('opened')) {
                this.classList.add('opened');
                piecesOpened++;
                createChocolateSparkles(this);

                if (piecesOpened === chocolatePieces.length) {
                    setTimeout(showSweetSurprise, 1000);
                }
            }
        });
    });

    // Create Chocolate Sparkles
    function createChocolateSparkles(element) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'chocolate-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 500 + 'ms';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Show Sweet Surprise
    function showSweetSurprise() {
        const surprise = document.createElement('div');
        surprise.className = 'sweet-surprise';
        surprise.innerHTML = `
            <div class="surprise-content">
                <h2>Sweet Surprise! 🍫</h2>
                <p>You're the sweetest part of my life! 💝</p>
                <div class="chocolate-hearts"></div>
            </div>
        `;
        document.body.appendChild(surprise);
        
        setTimeout(() => {
            surprise.classList.add('show');
            createChocolateHearts();
        }, 100);

        setTimeout(() => {
            surprise.classList.remove('show');
            setTimeout(() => surprise.remove(), 500);
        }, 5000);
    }

    // Create Chocolate Hearts
    function createChocolateHearts() {
        const heartsContainer = document.querySelector('.chocolate-hearts');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'chocolate-heart';
            heart.innerHTML = '🍫';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);
        }
    }

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

    // Create Memory Sparkles
    function createMemorySparkles(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'memory-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Interactive Magic Chocolate
    const magicChocolate = document.querySelector('.magic-chocolate');
    const wishText = document.querySelector('.wish-text');
    
    magicChocolate.addEventListener('click', function() {
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

    // Create Magic Sparkles
    function createMagicSparkles(element) {
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'magic-sparkle';
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

    // Create Note Sparkles
    function createNoteSparkles(element) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'note-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Smooth Scroll Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').split('#')[1];
            if (targetId) {
                e.preventDefault();
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
