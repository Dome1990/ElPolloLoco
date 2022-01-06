class MovableObject {
    x = 100;
    y = 360;
    heigth = 300;
    width = 200;
    img;
    imgCache = {};
    speed = 0.15;

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