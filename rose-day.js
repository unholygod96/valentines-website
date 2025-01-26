document.addEventListener('DOMContentLoaded', function() {
    // Cute Welcome Message Typing Effect
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
                // Add sparkle effect
                createMessageSparkles();
                // Clear and start next message
                setTimeout(() => {
                    typingMessage.textContent = '';
                    currentMessageIndex = (currentMessageIndex + 1) % welcomeMessages.length;
                    typeMessage(welcomeMessages[currentMessageIndex]);
                }, 3000);
            }, 1000);
        }
    }

    // Start the typing animation
    typeMessage(welcomeMessages[0]);

    // Create Sparkles for Messages
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

    // Dynamic Rose Creation and Animation
    function createRose() {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = '🌹';
        
        // Random position and rotation
        rose.style.left = Math.random() * 100 + 'vw';
        rose.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random animation duration between 7 and 12 seconds
        const duration = 7 + Math.random() * 5;
        rose.style.animationDuration = `${duration}s`;
        
        document.querySelector('.roses-falling').appendChild(rose);
        
        // Remove rose after animation
        setTimeout(() => {
            rose.remove();
        }, duration * 1000);
    }

    // Create roses periodically
    setInterval(createRose, 300);

    // Interactive Rose Cards with Special Effects
    const roseCards = document.querySelectorAll('.rose-card');
    roseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add floating petals effect
            createFloatingPetals(this);
            // Add sparkle effect
            createCardSparkles(this);
        });

        card.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            showRoseMessage(color);
        });
    });

    // Create Floating Petals Effect
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

    // Create Card Sparkles
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

    // Show Rose Messages with Cute Animations
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

        // Create and show modal with message
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

        // Add show class after a small delay for animation
        setTimeout(() => modal.classList.add('show'), 10);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        // Add floating hearts to modal
        createFloatingHearts(modal.querySelector('.modal-content'));
    }

    // Create Floating Hearts
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

    // Memory Bubbles Hover Effect
    const memoryBubbles = document.querySelectorAll('.memory-bubble');
    memoryBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            createBubbleSparkles(this);
        });
    });

    // Create Bubble Sparkles
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

    // Secret Notes Hover Effect
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

    // Add smooth scroll for navigation
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
