class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    bottle = [];
    healthBar = new StatusBar(0, 'health', 100);
    coinBar = new StatusBar(250, 'coins', 0);
    bottleBar = new StatusBar(500, 'bottles', 0);
    gameRunning = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * check multiple parameters in an interval
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkGameOver();
        }, 100);
    }

    /**
     * check for game over
     */
    checkGameOver() {
        if (this.level.enemies[3].isDead()) {
            setTimeout(() => {
                this.gameRunning = false;
            }, 1000);
        }
        else if (this.character.isDead()) {
            this.gameRunning = false;
        }
        else if (this.character.bottlesThrown == this.level.collectableBottles.length) {
            this.gameRunning = false;
        }
    }

    /**
     * check different collisions
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            this.enemieHurtCharacter(enemy);
            this.hitByBottle(enemy);
            this.jumpOnHead(enemy);
        })
        this.collectBottle();
        this.collectCoin();
    }

    /**
     * check if the character jumps on the head of an chicken
     * @param {element} enemy 
     */
    jumpOnHead(enemy) {
        if (this.character.isColliding(enemy) && this.character.y > this.character.lastHeight && enemy instanceof Chicken && !enemy.isDead()) {
            enemy.hit();
            this.character.speedY = 15;
            this.character.lastHeight = this.character.y;
        }
    }

    /**
     * check if the character is hit by an enemy
     * @param {element} enemy 
     */
    enemieHurtCharacter(enemy) {
        if (this.character.isColliding(enemy) && enemy.energy > 0) {
            if (enemy instanceof Chicken && this.character.y >= this.character.lastHeight) {
                return 0;
            }
            else {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy, 'health');
            }
        }
    }

    /**
     * check if the enemy is hit by a bottle
     * @param {element} enemy 
     */
    hitByBottle(enemy) {
        this.bottle.forEach(bottle => {
            if (bottle.isColliding(enemy)) {
                enemy.hit();
                bottle.collided = true;
                bottle.bottleHit_sound.play();
            }
        });
    }

    /**
     * character collects a bottle
     */
    collectBottle() {
        this.level.collectableBottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                bottle.x = -300;
                bottle.y = -300;
                this.character.amountBottles++;
                this.bottleBar.setPercentage((this.character.amountBottles / this.level.collectableBottles.length) * 100, 'bottles');
                bottle.collectBottle_sound.play();
            }
        });
    }

    /**
     * character collects a coin
     */
    collectCoin() {
        this.level.collectableCoins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                coin.coin_sound.play();
                coin.x = -300;
                coin.y = -300;
                this.character.amountCoins++;
                this.coinBar.setPercentage((this.character.amountCoins / this.level.collectableCoins.length) * 100, 'coins');
            }
        });
    }

    /**
     * character throws a bottle with press enter if he has bottles
     */
    checkThrowObject() {
        if (this.keyboard.ENTER && this.character.amountBottles > 0 && !this.character.isDead()) {
            let bottle = new ThrowableObject(this.character.x + 120, this.character.y + 120, this.character.otherDirection);
            this.bottle.push(bottle);
            this.character.amountBottles--;
            this.bottleBar.setPercentage((this.character.amountBottles / this.level.collectableBottles.length) * 100, 'bottles');
            this.character.bottlesThrown++;
        }
    }

    /**
     * draw in canvas
     */
    draw() {
        /**
        *clear the canvas
        */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        /**
        *backgroudposition changes, when the character is moving
        */
        this.ctx.translate(this.camera_x, 0);
        /**
        * draw elements
        */
        this.addLevel();

        if (this.gameRunning) {
            this.renderGame();
        }
        else if (!this.gameRunning) {
            this.renderGameOver();
        }
    }

    /**
     * playing background music an draw character, bars, bottles, enemies. also change camera x and redraw
     */
    renderGame() {
        this.level.levelBgMusic[0].play();
        this.addToMap(this.character);
        this.addBars();
        this.addObjectToMap(this.bottle);
        this.addObjectToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * draw the game over screen when game over and pause music
     */
    renderGameOver() {
        this.level.levelBgMusic[0].pause();
        this.addObjectToMap(this.level.endscreen);
        gameOver();
    }

    /**
     * adding level objects
     */
    addLevel() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.collectableBottles);
        this.addObjectToMap(this.level.collectableCoins);
    }

    /**
     * draw health, coin and bottle bar
     */
    addBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    /**
     * adding every object of an array to the canvas
     * @param {object} objects 
     */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /**
     * adding the object to the canvas
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            mo.mirrorImage(this.ctx, mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            mo.reMirrorImage(this.ctx)
        }
        // painting rectangle
        // if (mo instanceof Chicken || mo instanceof Character || mo instanceof Endboss) {
        //     mo.drawFrame(this.ctx)
        // }
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies[3].world = this;
    }
}