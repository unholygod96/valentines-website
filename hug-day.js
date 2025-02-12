document.addEventListener('DOMContentLoaded', function() {
    // Sweet Messages Animation
    const sweetMessages = [
        "Sending you a big warm hug! 🤗",
        "A virtual hug just for you! 💖",
        "Hugs make everything better! ✨",
        "Wrap yourself in my love! 💕",
        "Can you feel the squeeze? 🥰",
        "Hugs are the best medicine! 💊"
    ];

    const messageElement = document.getElementById('message-display');
    let currentIndex = 0;

    function showMessage() {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.textContent = sweetMessages[currentIndex];
            messageElement.style.opacity = '1';
            currentIndex = (currentIndex + 1) % sweetMessages.length;
            setTimeout(showMessage, 3000);
        }, 500);
    }

    showMessage();

    // Hug Animation Trigger
    const hugAnimation = document.querySelector('.hug-animation');
    hugAnimation.addEventListener('click', function() {
        this.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 2000);
    });

    // Hug Coupon Animation
    const hugCoupon = document.querySelector('.coupon');
    hugCoupon.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 10px 20px rgba(233, 30, 99, 0.3)';
    });
    hugCoupon.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(233, 30, 99, 0.2)';
    });

    // Floating Hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Reason Hover Effect
    const reasons = document.querySelectorAll('.reason');
    reasons.forEach(reason => {
        reason.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
        });
        reason.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Quote Fade-in Effect
    const quotes = document.querySelectorAll('.quote');
    function checkQuotes() {
        quotes.forEach(quote => {
            const quoteTop = quote.getBoundingClientRect().top;
            const quoteBottom = quote.getBoundingClientRect().bottom;
            if (quoteTop < window.innerHeight && quoteBottom > 0) {
                quote.style.opacity = '1';
                quote.style.transform = 'translateY(0)';
            }
        });
    }
    window.addEventListener('scroll', checkQuotes);
    checkQuotes();

    // Menu Button Functionality
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('nav');
    menuButton.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
});
