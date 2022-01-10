class MovableObject {
    x = 100;
    y = 360;
    heigth = 300;
    width = 200;
    img;
    imgCache = {};
    speed = 0.15;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAbove()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAbove() {
        return this.y < 360 || this.speedY > 0;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    playAnimation(IMAGES_WALKING) {
        setInterval(() => {
            let i = this.currentImage % IMAGES_WALKING.length;
            let path = IMAGES_WALKING[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 100)
        this.moveLeft();
    }

    moveRight() {
        console.log('movingRight');
    }
    moveLeft() {
        setInterval(() => {
            if (this.x > -1280) {
                this.x -= this.speed;
            }
            else {
                this.x = 1280;
            }
        }, 1000 / 60);
    }
}