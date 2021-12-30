class MovableObject {
    x = 20;
    y = 40;
    heigth = 100;
    width = 80;
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