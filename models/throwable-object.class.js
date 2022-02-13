class ThrowableObject extends MovableObject {
    collided = false;
    bottleHit_sound = new Audio('audio/bottleHit.mp3');


    IMAGES_BOTTLEROTAION = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',
    ]

    IMAGES_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
    ]

    constructor(x, y, otherDirection) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.loadImages(this.IMAGES_BOTTLEROTAION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.heigth = 100;
        this.width = 100;
        this.throw(this.x, this.y)
    }

    /**
     * throw an object
     */
    throw() {
        this.speedX = 15;
        this.speedY = 40;
        this.applyGravity();
        if (this.otherDirection) {
            this.throwLeft();
        }
        else {
            this.throwRight();
        }
    }

    /**
     * throw the object left
     */
    throwLeft() {
        setInterval(() => {
            if (!this.collided) {
                this.x -= this.speedX;
                this.animation(this.IMAGES_BOTTLEROTAION);
            }
            else {
                this.splash();
            }
        }, 1000 / 25);
    }

    /**
     * throw the object right
     */
    throwRight(){
        setInterval(() => {
            if (!this.collided) {
                this.x += this.speedX;
                this.animation(this.IMAGES_BOTTLEROTAION);
            }
            else {
                this.splash();
            }
        }, 1000 / 25);
    }

    splash() {
        this.x += this.speedX;
        this.singleAnimation(this.IMAGES_SPLASH);
    }
}
