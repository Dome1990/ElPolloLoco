class BackgroundObject extends MovableObject {
    heigth = 500;
    width = 1280;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}