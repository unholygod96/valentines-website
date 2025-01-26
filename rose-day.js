document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation for Rose Message
    const messages = [
        "Like a rose that blooms in adversity, our love grows stronger each day...",
        "Every petal represents a moment we've shared together...",
        "You are the most beautiful rose in my garden of life..."
    ];
    
    let currentMessageIndex = 0;
    const typingMessage = document.querySelector('.typing-message');
    
    function typeMessage(message, index = 0) {
        if (index < message.length) {
            typingMessage.textContent += message.charAt(index);
            setTimeout(() => typeMessage(message, index + 1), 50);
        } else {
            setTimeout(() => {
                // Clear the message
                typingMessage.textContent = '';
                // Move to next message
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                // Start typing the next message
                typeMessage(messages[currentMessageIndex]);
            }, 3000);
        }
    }

    // Start the typing animation
    typeMessage(messages[0]);

    // Rose Petals Animation
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random position and rotation
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random animation duration
        const duration = 5 + Math.random() * 5;
        petal.style.animationDuration = `${duration}s`;
        
        document.querySelector('.rose-petals').appendChild(petal);
        
        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Create petals periodically
    setInterval(createPetal, 300);

    // Interactive Rose Cards
    const roseCards = document.querySelectorAll('.rose-card');
    roseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add sparkle effect
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            this.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => sparkle.remove(), 1000);
        });

        card.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            showRoseMeaning(color);
        });
    });

    function showRoseMeaning(color) {
        const meanings = {
            red: "Red roses symbolize deep love and passion. They are the ultimate expression of romantic love.",
            pink: "Pink roses represent grace, admiration, and joy. They're perfect for showing appreciation and gratitude.",
            white: "White roses symbolize purity and innocence. They represent new beginnings and pure love.",
            yellow: "Yellow roses symbolize friendship and joy. They bring warmth and happiness to any relationship."
        };

        // Create and show modal with meaning
        const modal = document.createElement('div');
        modal.classList.add('rose-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${color.charAt(0).toUpperCase() + color.slice(1)} Rose Meaning</h3>
                <p>${meanings[color]}</p>
                <button class="close-modal">✖</button>
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
    }

    // Memory Book Page Turn Effect
    const memoryPages = document.querySelectorAll('.memory-page');
    memoryPages.forEach(page => {
        page.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Virtual Garden Image Hover Effect
    const arrangements = document.querySelectorAll('.rose-arrangement');
    arrangements.forEach(arrangement => {
        arrangement.addEventListener('mouseenter', function() {
            const info = this.querySelector('.arrangement-info');
            info.style.transform = 'translateY(0)';
        });

        arrangement.addEventListener('mouseleave', function() {
            const info = this.querySelector('.arrangement-info');
            info.style.transform = 'translateY(100%)';
        });
    });

    // Add Parallax Effect to Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.rose-day-header');
        const scrollPosition = window.scrollY;
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Custom Cursor with Rose Trail
    let trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', function(e) {
        // Create new trail element
        const trailDot = document.createElement('div');
        trailDot.classList.add('rose-trail');
        trailDot.style.left = e.pageX + 'px';
        trailDot.style.top = e.pageY + 'px';
        document.body.appendChild(trailDot);

        // Add to trail array
        trail.push(trailDot);

        // Remove old trail elements
        if (trail.length > trailLength) {
            trail[0].remove();
            trail.shift();
        }

        // Fade out trail
        trail.forEach((dot, index) => {
            dot.style.opacity = (index + 1) / trail.length;
        });
    });

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

// Add CSS styles for new elements
const style = document.createElement('style');
style.textContent = `
    .rose-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }

    .rose-modal.show {
        opacity: 1;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }

    .rose-modal.show .modal-content {
        transform: scale(1);
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .rose-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: #ff8fab;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    .sparkle {
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #fff 0%, transparent 70%);
        animation: sparkleAnim 1s ease-out;
    }

    @keyframes sparkleAnim {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
`;

document.head.appendChild(style);

