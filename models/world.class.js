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
    healthBar = new StatusBar(0, 'health');
    coinBar = new StatusBar(250, 'coins');
    bottleBar = new StatusBar(500, 'bottles');
    bottle = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
        }, 100);
    }

    checkCollisions() {
        /**
         * check collision between enemy and character
         */
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy, 'health');
                console.log('energy is ' + this.character.energy);
            }

/**
 * check for bottle collision with enemies
 */
            this.bottle.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    bottle.collided = true;
                    
                }
            });

        })
    }

    checkThrowObject() {
        if (this.keyboard.ENTER) {
            let bottle = new ThrowableObject(this.character.x + 120, this.character.y + 120, this.character.otherDirection);
            this.bottle.push(bottle);
        }
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

        //this.addObjectToMap(this.level.statusBar);
        this.addToMap(this.character);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addObjectToMap(this.bottle);
        //this.addToMap(this.bottle);
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