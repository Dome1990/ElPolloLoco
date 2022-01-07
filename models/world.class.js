class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Clouds(),
    ];

    /**
     * BackgroundObject('imagePath', height, x, y)
     */
    backgroundObjects = [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 739, 0, 0),         //sky
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 700, 0, 739 - 700),      //background mountains
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 700, 0, 739 - 700),                  //background with cactus
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 700, 0, 739 - 700),            //foreground layer
    ];

    ctx;
    canvas;
    keyboard;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() {
        /**
         * clear the canvas
         */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        /**
         * draw all elements
         */
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);

        /**
         * requestAnimationFrame will recall the draw method
         */
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x *-1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.heigth);
        if (mo.otherDirection) {
            mo.x = mo.x *-1;
            this.ctx.restore();
        }

    }

    setWorld() {
        this.character.world = this;
    }
}