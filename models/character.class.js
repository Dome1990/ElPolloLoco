class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ]

    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-40.png'
    ];
    currentImage = 0;
    world;
    speed = 8;
    otherDirection;
    x = 0;
    walking_sound = new Audio('audio/running.mp3');
    y = 360;


    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
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
                if (this.x > 0) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                }
                this.walking_sound.play();
            }
            //character will jump with space and arrow up
            if((this.world.keyboard.SPACE || this.world.keyboard.UP) && this.y >=360){
                this.speedY = 40;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        /**
         * walking animation
         */
        setInterval(() => {
            if (this.isAbove()) {
                let i = this.currentImage % this.IMAGES_JUMPING.length;
                let path = this.IMAGES_JUMPING[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }
            else {
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
            }
        }, 60);
        // setInterval(() => {
        //     // if (this.isAbove()) {
        //     //     let i = this.currentImage % this.IMAGES_JUMPING.length;
        //     //     let path = this.IMAGES_JUMPING[i];
        //     //     this.img = this.imgCache[path];
        //     //     this.currentImage++;
        //     // }
        // }, 10)
    };

}