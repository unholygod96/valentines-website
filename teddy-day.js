document.addEventListener('DOMContentLoaded', function() {
    // Teddy Creator
    const faceSelect = document.getElementById('face-select');
    const bodyColor = document.getElementById('body-color');
    const accessorySelect = document.getElementById('accessory-select');
    const teddyFace = document.getElementById('teddy-face');
    const teddyBody = document.getElementById('teddy-body');
    const teddyAccessory = document.getElementById('teddy-accessory');
    const saveTeddyBtn = document.getElementById('save-teddy');

    faceSelect.addEventListener('change', (e) => {
        teddyFace.textContent = e.target.value;
    });

    bodyColor.addEventListener('input', (e) => {
        teddyBody.style.backgroundColor = e.target.value;
    });

    accessorySelect.addEventListener('change', (e) => {
        teddyAccessory.textContent = e.target.value;
    });

    saveTeddyBtn.addEventListener('click', () => {
        alert('Your custom teddy has been saved!');
        // Add functionality to save or send the teddy
    });

    // Memory Game
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
});
