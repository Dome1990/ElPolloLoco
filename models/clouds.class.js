class Clouds extends MovableObject {
    y = 0;
    width = 1280;
    heigth = 800;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = Math.random() * 1280;
        this.animate();
    }

    animate() {
        this.moveLeft()
        // setInterval(() => {
        //     if (this.x > -1280) {
        //         this.x -= this.speed;
        //     }
        //     else{
        //         this.x = 1280;
        //     }
        // }, 1000 / 60);
    }
}

