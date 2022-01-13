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
         * backgroudposition that changes, when the character is moving
         */
        this.ctx.translate(this.camera_x, 0);
        /**
         * draw elements
         */
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);

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
        if (mo instanceof Chicken || mo instanceof Character) {
            mo.drawFrame(this.ctx)
        }
    }

    setWorld() {
        this.character.world = this;
    }

}