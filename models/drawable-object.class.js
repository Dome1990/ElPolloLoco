class DrawableObject {
    x = 100;
    y = 360;
    heigth;
    width;
    img;
    imgCache = {};
    currentImage = 0;
    singleAnimationCounter = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth);
    }


}