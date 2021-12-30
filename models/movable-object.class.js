class MovableObject {
    x = 100;
    y = 360;
    heigth = 300;
    width = 200;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('movingRight');
    }
    moveLeft() {

    }
}