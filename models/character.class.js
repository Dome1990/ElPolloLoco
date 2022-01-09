class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ]
    currentImage = 0;
    world;
    speed = 8;
    otherDirection;
    x = 0;
    walking_sound = new Audio('audio/running.mp3');
    y=0;


    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.applyGravity();
    }

    animate() {
        /**
         * moving the character and playing walkingsound
         */
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT) {
                this.walking_sound.play();
                if (this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.otherDirection = false;
                }
            }
            if (this.world.keyboard.LEFT) {
                if(this.x > 0){
                    this.x -= this.speed;
                    this.otherDirection = true;
                }
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        /**
         * walking animation
         */
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }
            if (this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }
        }, 60);
    };

}