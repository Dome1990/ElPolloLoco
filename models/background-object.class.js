class BackgroundObject extends MovableObject {
    width = 1280;

    constructor(imagePath, height, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.heigth = height;
    }
}