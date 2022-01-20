class World {
    character = new Character();
    level = level1;
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    // console.log('collision with character ' + enemy)
                    this.character.hit();
                    console.log('energy is ' + this.character.energy);
                }
            });
        }, 100);
    }


    draw() {
        /**
         * clear the canvas
         */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        /**
         * backgroudposition changes, when the character is moving
         */
        this.ctx.translate(this.camera_x, 0);
        /**
         * draw elements
         */
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addToMap(this.statusBar);
        this.ctx.translate(-this.camera_x, 0);

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
            mo.mirrorImage(this.ctx, mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            mo.reMirrorImage(this.ctx)
        }
        // painting rectangle
        if (mo instanceof Chicken || mo instanceof Character || mo instanceof Endboss) {
            mo.drawFrame(this.ctx)
        }
    }

    setWorld() {
        this.character.world = this;
    }

}