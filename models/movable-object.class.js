class MovableObject {
    x = 0;
    y = 0;
    heigth = 45;
    width = 40;
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