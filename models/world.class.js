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
    bottle = [];
    collectableBottles = [
        new CollectableObject(200, 200, 'bottle'),
        new CollectableObject(400, 50, 'bottle'),
        new CollectableObject(600, 200, 'bottle'),
        new CollectableObject(1000, 200, 'bottle'),
        new CollectableObject(1200, 50, 'bottle'),
        new CollectableObject(1400, 200, 'bottle'),
        new CollectableObject(2400, 200, 'bottle'),
        new CollectableObject(2600, 50, 'bottle'),
        new CollectableObject(2800, 200, 'bottle')
    ];

    collectableCoins = [
        new CollectableObject(100, 100, 'coin'),
        new CollectableObject(500, 100, 'coin'),
        new CollectableObject(1000, 100, 'coin'),
        new CollectableObject(3000, 100, 'coin'),
        new CollectableObject(3200, 100, 'coin'),
        new CollectableObject(3400, 100, 'coin'),
        new CollectableObject(3500, 100, 'coin')
    ];

    healthBar = new StatusBar(0, 'health', 100);
    coinBar = new StatusBar(250, 'coins', 0);
    bottleBar = new StatusBar(500, 'bottles', 0);

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

            /**
             * check collecting bottles
             */
            this.collectableBottles.forEach(bottle => {
                if(this.character.isColliding(bottle)){
                    bottle.x = -300;
                    bottle.y = -300;
                    this.character.amountBottles++;
                    this.bottleBar.setPercentage((this.character.amountBottles/this.collectableBottles.length)*100, 'bottles');                   
                } 
            });

            /**
             * check collecting coins
             */
             this.collectableCoins.forEach(coin => {
                if(this.character.isColliding(coin)){
                    coin.x = -300;
                    coin.y = -300;
                    this.character.amountCoins++;
                    this.coinBar.setPercentage((this.character.amountCoins/this.collectableCoins.length)*100, 'coins');                   
                } 
            });

        })
    }

    checkThrowObject() {
        if (this.keyboard.ENTER && this.character.amountBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 120, this.character.y + 120, this.character.otherDirection);
            this.bottle.push(bottle);
            this.character.amountBottles--;
            this.bottleBar.setPercentage((this.character.amountBottles/this.collectableBottles.length)*100, 'bottles');
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
        this.addObjectToMap(this.collectableBottles);
        this.addObjectToMap(this.collectableCoins);
        this.addObjectToMap(this.bottle);
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