document.addEventListener('DOMContentLoaded', function() {
    // Sweet Proposal Messages
    const proposalMessages = [
        "Hey sweetie! Ready for something special? 💝",
        "Every day I fall more in love with you! 💫",
        "You make my heart skip a beat! 💖",
        "Will you be mine forever? 💍"
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
                    currentMessageIndex = (currentMessageIndex + 1) % proposalMessages.length;
                    typeMessage(proposalMessages[currentMessageIndex]);
                }, 3000);
            }, 1000);
        }
    }

    // Start the typing animation
    typeMessage(proposalMessages[0]);

    // Create Message Sparkles
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

    // Falling Rings Animation
    function createRing() {
        const ring = document.createElement('div');
        ring.className = 'ring';
        ring.textContent = '💍';
        ring.style.left = Math.random() * 100 + 'vw';
        ring.style.transform = `rotate(${Math.random() * 360}deg)`;
        const duration = 7 + Math.random() * 5;
        ring.style.animationDuration = `${duration}s`;
        document.querySelector('.rings-falling').appendChild(ring);
        setTimeout(() => ring.remove(), duration * 1000);
    }

    // Create rings periodically
    setInterval(createRing, 500);

    // Proposal Cards Interaction
    const proposalCards = document.querySelectorAll('.proposal-card');
    let cardsOpened = 0;

    proposalCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('opened')) {
                this.classList.add('opened');
                cardsOpened++;
                createCardSparkles(this);
                if (cardsOpened === proposalCards.length) {
                    setTimeout(showFinalProposal, 1000);
                }
            }
        });
    });

    // Create Card Sparkles
    function createCardSparkles(element) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'card-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Show Final Proposal
    function showFinalProposal() {
        const finalProposal = document.createElement('div');
        finalProposal.className = 'final-proposal';
        finalProposal.innerHTML = `
            <h2>Will you be mine forever?</h2>
            <p>Every day I choose you, and I always will! 💍</p>
        `;
        document.body.appendChild(finalProposal);
        createFinalSparkles();
    }

    // Create Final Sparkles
    function createFinalSparkles() {
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'final-sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(sparkle);
        }
    }
});

