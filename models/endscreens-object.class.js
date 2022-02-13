class Endscreen extends DrawableObject {
    
    YOU_LOST = [
        'img/9.Intro _ Outro Image/_Game over_ screen/3.Game over.png',
        // 'img/9.Intro _ Outro Image/_Game over_ screen/Muestra.png',
    ]
    
    constructor() {
        super().loadImage('img/9.Intro _ Outro Image/_Game over_ screen/3.Game over.png');
        //this.loadImages(this.YOU_LOST);
        this.x = 0;
        this.y = 0;
        this.heigth = 739;
        this.width = 1280;
    }
}