document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessages = [
        "Hey sweetie! 💖",
        "I picked these roses just for you! 🌹",
        "Each one is special, just like you! ✨",
        "Ready for our rose adventure? 🌸"
    ];
    
    let currentMessageIndex = 0;
    const typingMessage = document.querySelector('.message-bubble p');
    
    function typeMessage(message, index = 0) {
        if (index < message.length) {
            typingMessage.textContent += message.charAt(index);
            setTimeout(() => typeMessage(message, index + 1), 50);
        } else {
            setTimeout(() => {
                createMessageSparkles();
                setTimeout(() => {
                    typingMessage.textContent = '';
                    currentMessageIndex = (currentMessageIndex + 1) % welcomeMessages.length;
                    typeMessage(welcomeMessages[currentMessageIndex]);
                }, 3000);
            }, 1000);
        }
    }

    typeMessage(welcomeMessages[0]);

    function createMessageSparkles() {
        const sparkleContainer = document.querySelector('.message-bubble');
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'message-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 1000 + 'ms';
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    function createRose() {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = '🌹';
        rose.style.left = Math.random() * 100 + 'vw';
        rose.style.transform = `rotate(${Math.random() * 360}deg)`;
        const duration = 7 + Math.random() * 5;
        rose.style.animationDuration = `${duration}s`;
        document.querySelector('.roses-falling').appendChild(rose);
        setTimeout(() => rose.remove(), duration * 1000);
    }

    setInterval(createRose, 300);

    const roseCards = document.querySelectorAll('.rose-card');
    roseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createFloatingPetals(this);
            createCardSparkles(this);
        });

        card.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            showRoseMessage(color);
        });
    });

    function createFloatingPetals(element) {
        for (let i = 0; i < 5; i++) {
            const petal = document.createElement('div');
            petal.className = 'floating-petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 1000 + 'ms';
            element.appendChild(petal);
            setTimeout(() => petal.remove(), 2000);
        }
    }

    function createCardSparkles(element) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'card-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 500 + 'ms';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    function showRoseMessage(color) {
        const messages = {
            red: {
                title: "My Red Rose ❤️",
                message: "Like this red rose, my love for you grows deeper every day! Want to know a secret? Every time I see you, my heart does a little dance! 💝"
            },
            pink: {
                title: "My Pink Rose 🌸",
                message: "Sweet and gentle, just like you! Did you know your smile is prettier than all the pink roses in the world? ✨"
            },
            white: {
                title: "My White Rose ✨",
                message: "Pure and perfect, like our love! Every moment with you feels like a fresh start, a new adventure! 💫"
            },
            yellow: {
                title: "My Yellow Rose 🌟",
                message: "Bright and cheerful, just like your personality! You bring so much joy to my life, my little sunshine! ⭐"
            }
        };

        const modal = document.createElement('div');
        modal.className = 'rose-message-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${messages[color].title}</h3>
                <p>${messages[color].message}</p>
                <button class="close-modal">Close with love ✨</button>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => modal.classList.add('show'), 10);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        createFloatingHearts(modal.querySelector('.modal-content'));
    }

    function createFloatingHearts(element) {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2000 + 'ms';
            heart.style.fontSize = (10 + Math.random() * 20) + 'px';
            element.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }
    }

    const memoryBubbles = document.querySelectorAll('.memory-bubble');
    memoryBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            createBubbleSparkles(this);
        });
    });

    function createBubbleSparkles(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'bubble-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

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
