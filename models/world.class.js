class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Clouds,
    ];
    
    backgroundObjects = [
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0, 739-500),
    ];

    ctx;
    canvas;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);



        this.clouds.forEach(cloud => {
            this.addToMap(cloud)
        });
        // this.backgroundObjects.forEach(backgroundObject => {
        //     this.addToMap(backgroundObject)
        // });
        this.addObjectToMap(this.backgroundObjects);

        this.enemies.forEach(enemy => {
            this.addToMap(enemy)
        });
        this.addToMap(this.character);

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.heigth)
    }
}