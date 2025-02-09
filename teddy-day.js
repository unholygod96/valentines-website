document.addEventListener('DOMContentLoaded', function () {

    const TeddyCreator = {
        init() {
            this.teddy = {
                face: document.querySelector('.teddy-face'),
                body: document.querySelector('.teddy-body'),
                accessory: document.querySelector('.teddy-accessory'),
                clothes: document.querySelector('.teddy-clothes'),
                ears: document.querySelectorAll('.ear')
            };

            this.setupEventListeners();
            this.loadSavedTeddies();
        },

        setupEventListeners() {
            document.getElementById('size-picker').addEventListener('change', (e) => {
                this.changeTeddySize(e.target.value);
            });

            document.getElementById('fur-color').addEventListener('input', (e) => {
                this.teddy.body.style.backgroundColor = e.target.value;
                this.teddy.ears.forEach(ear => ear.style.backgroundColor = e.target.value);
            });

            document.getElementById('fur-pattern').addEventListener('change', (e) => {
                this.applyFurTexture(e.target.value);
            });

            document.querySelectorAll('.clothing-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.teddy.clothes.textContent = btn.textContent;
                });
            });

            document.getElementById('hug-teddy').addEventListener('click', () => {
                this.teddy.body.classList.add('hugging');
                setTimeout(() => this.teddy.body.classList.remove('hugging'), 600);
                this.playSoundEffect();
            });

            document.getElementById('save-teddy').addEventListener('click', () => {
                this.saveTeddy();
            });
        },

        changeTeddySize(size) {
            let scale;
            if (size === 'small') scale = '0.8';
            else if (size === 'medium') scale = '1';
            else scale = '1.2';

            document.querySelector('.teddy-preview').style.transform = `scale(${scale})`;
        },

        applyFurTexture(texture) {
            if (texture === 'solid') {
                this.teddy.body.style.backgroundImage = 'none';
            } else if (texture === 'fluffy') {
                this.teddy.body.style.backgroundImage = "url('fluffy-texture.png')";
            } else if (texture === 'striped') {
                this.teddy.body.style.backgroundImage = "linear-gradient(45deg, #deb887 25%, transparent 25%, transparent 50%, #deb887 50%, #deb887 75%, transparent 75%, transparent)";
                this.teddy.body.style.backgroundSize = "20px 20px";
            } else if (texture === 'spotted') {
                this.teddy.body.style.backgroundImage = "radial-gradient(circle, #deb887 10%, transparent 10%)";
                this.teddy.body.style.backgroundSize = "20px 20px";
            }
        },

        saveTeddy() {
            const teddyData = {
                bodyColor: this.teddy.body.style.backgroundColor,
                furPattern: document.getElementById('fur-pattern').value,
                clothing: this.teddy.clothes.textContent,
                accessory: this.teddy.accessory.textContent
            };

            let savedTeddies = JSON.parse(localStorage.getItem('savedTeddies')) || [];
            savedTeddies.push(teddyData);
            localStorage.setItem('savedTeddies', JSON.stringify(savedTeddies));

            this.displaySavedTeddies();
        },

        loadSavedTeddies() {
            this.displaySavedTeddies();
        },

        displaySavedTeddies() {
            const savedTeddyContainer = document.querySelector('.saved-teddy-container');
            savedTeddyContainer.innerHTML = "";
            const savedTeddies = JSON.parse(localStorage.getItem('savedTeddies')) || [];

            savedTeddies.forEach((teddy, index) => {
                const teddyDiv = document.createElement('div');
                teddyDiv.classList.add('saved-teddy');
                teddyDiv.style.backgroundColor = teddy.bodyColor;
                teddyDiv.innerHTML = `
                    <div class="saved-teddy-preview">
                        <div class="saved-teddy-face">😊</div>
                        <div class="saved-teddy-clothing">${teddy.clothing}</div>
                        <div class="saved-teddy-accessory">${teddy.accessory}</div>
                    </div>
                    <button class="delete-teddy" data-index="${index}">❌</button>
                `;
                savedTeddyContainer.appendChild(teddyDiv);
            });

            document.querySelectorAll('.delete-teddy').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.deleteTeddy(e.target.dataset.index);
                });
            });
        },

        deleteTeddy(index) {
            let savedTeddies = JSON.parse(localStorage.getItem('savedTeddies')) || [];
            savedTeddies.splice(index, 1);
            localStorage.setItem('savedTeddies', JSON.stringify(savedTeddies));
            this.displaySavedTeddies();
        },

        playSoundEffect() {
            const popSound = new Audio('pop.mp3'); 
            popSound.play();
        }
    };

    TeddyCreator.init();
});
