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
            <div class="proposal-content">
                <h2>My Love... 💝</h2>
                <p>Every day I choose you, and I always will! 💍</p>
                <div class="proposal-hearts"></div>
            </div>
        `;
        document.body.appendChild(finalProposal);
        
        setTimeout(() => {
            finalProposal.classList.add('show');
            createProposalHearts();
        }, 100);

        setTimeout(() => {
            finalProposal.classList.remove('show');
            setTimeout(() => finalProposal.remove(), 500);
        }, 5000);
    }

    // Create Proposal Hearts
    function createProposalHearts() {
        const heartsContainer = document.querySelector('.proposal-hearts');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'proposal-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);
        }
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineVisibility() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            if (itemTop < window.innerHeight && itemBottom > 0) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }

    window.addEventListener('scroll', checkTimelineVisibility);
    checkTimelineVisibility();

    // Interactive Ring
    const magicRing = document.querySelector('.magic-ring');
    const wishText = document.querySelector('.wish-text');
    
    magicRing.addEventListener('click', function() {
        this.style.transform = 'scale(1.5) rotate(720deg)';
        createRingSparkles(this);
        
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

    // Create Ring Sparkles
    function createRingSparkles(element) {
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'ring-sparkle';
            sparkle.style.left = 50 + (Math.random() - 0.5) * 100 + '%';
            sparkle.style.top = 50 + (Math.random() - 0.5) * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Love Notes Hover Effect
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

