class MovableObject extends DrawableObject {
    speed = 0.15;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    otherDirection;
    deadAnimationCounter = 0;
    hitChicken_sound = new Audio('audio/hitChicken.mp3');
    defeatedEndboss_sound = new Audio('audio/defeatedEndboss.mp3');
    jumpcount = 0;
    jumpPhase = 0;
    lastHeight;
    enableJump = false;

    /**
     * let an object fall if it is above ground
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAbove()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * check if the object is above the ground (y = 360)
     * @returns true or false
     */
    isAbove() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 360 || this.speedY > 0;
        }
    }



    /**
     * animate the enemies by changing the images and move their location
     * @param {array} movingIMAGES 
     */
    playAnimation(movingIMAGES) {
        if (this instanceof Chicken) {
            this.chickenAnimation(movingIMAGES);
        }
        else if (this instanceof Endboss) {
            this.endbossAnimation(movingIMAGES);
        }
    }

    /**
     * movement and animation of the chickens
     * @param {array} movingIMAGES 
     */
    chickenAnimation(movingIMAGES) {
        this.movementAnimation(movingIMAGES);
        this.moveTo();
    }

    /**
     * chicken animation for the movement
     * @param {array} movingIMAGES 
     */
    movementAnimation(movingIMAGES) {
        setInterval(() => {
            if (!this.isDead()) {
                this.animation(movingIMAGES);
            }
        }, 100)
    }

    /**
     * the movement of the chicken (changeing the x)
     */
    moveTo() {
        setInterval(() => {
            if (this.x > -1280 && !this.isDead()) {
                this.moveLeft();
            }
            else if (this.isDead) {
                this.singleAnimation(this.IMAGES_DEAD);
            }
            else {
                this.x = 1280;
            }
        }, 1000 / 60);
    }

    /**
     * animation of the endboss
     * @param {array} movingIMAGES 
     */
    endbossAnimation(movingIMAGES) {
        setInterval(() => {
            this.otherDirection = false;
            this.endbossLookingAngry(movingIMAGES);
            this.endbossReactingToCharacter();
            this.endbossHurtDead();
        }, 1000 / 15);
    }

    /**
     * animates andgry looking endboss
     * @param {array} movingIMAGES 
     */
    endbossLookingAngry(movingIMAGES) {
        if (!this.isDead() && this.distanceToCharacter() > 800) {
            this.animation(movingIMAGES);
        }
    }

    /**
     * the endboss walks to the character and attacks him
     */
    endbossReactingToCharacter() {
        if (!this.isDead() && this.distanceToCharacter() < 800 && !this.isHurt()) {
            this.goToCharacter();
            this.attack();
        }
    }

    /**
     * endboss will go to the character
     */
    goToCharacter() {
        if (this.distanceToCharacter() <= -487) {
            this.moveRight();
            this.animation(this.IMAGES_WALK)
        }
        else if (this.distanceToCharacter() < 800 && this.distanceToCharacter() > 190) {
            this.moveLeft();
            this.animation(this.IMAGES_WALK);
        }
    }

    /**
     * endboss attacks the character
     */
    attack() {
        if (this.isColliding(this.world.character)) {
            if (this.distanceToCharacter() < -300) {
                this.otherDirection = true;
            }
            this.animation(this.IMAGES_ATTACK);
        }
    }

    /**
     * animation for endboss beeing hurt or dead
     */
    endbossHurtDead() {
        if (!this.isDead() && this.isHurt()) {
            this.animation(this.IMAGES_HURT);
        }
        else if (this.isDead()) {
            this.singleAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * the distande between the character and the endboss
     * @returns number
     */
    distanceToCharacter() {
        return this.x - this.world.character.x;
    }

    /**
     * move the character
     */
    checkCharactermovement() {
        setInterval(() => {
            this.walking_sound.pause();
            this.goRight();
            this.goLeft();
            this.characterJump();
            this.changeLocations();
        }, 1000 / 60)
    }

    /**
     * move character right
     */
    goRight() {
        if (this.world.keyboard.RIGHT && !this.isDead()) {
            if (!this.isAbove()) {
                this.walking_sound.play();
            }
            this.moveRight();
        }
    }

    /**
     * move character left
     */
    goLeft() {
        if (this.world.keyboard.LEFT && !this.isDead()) {
            if (this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (!this.isAbove()) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * character will jump
     */
    characterJump() {
        if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAbove() && !this.isDead()) {//&& this.y >=360
            this.jump();
            this.enableJump = true;
            this.jumping_sound.play();
        }
    }

    /**
     * change the x location of world items
     */
    changeLocations() {
        this.world.camera_x = -this.x + 100;
        this.world.healthBar.x = this.x;
        this.world.coinBar.x = this.x + 250;
        this.world.bottleBar.x = this.x + 500;
        this.world.level.endscreen[0].x = this.x - 100;
    }

    /**
     * character animation
     */
    animateMovement() {
        setInterval(() => {
            this.deadCharacter();
            this.hurtCharacter();
            this.characterIsJumping();
            this.movingRightAnimation();
            this.movingLeftAnimation();
        }, 60);
    }

    /**
     * animation for dying character
     */
    deadCharacter() {
        if (this.isDead()) {
            this.deadAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * hurt animation for the character
     */
    hurtCharacter() {
        if (this.isHurt()) {
            this.animation(this.IMAGES_HURT);
        }
    }

    /**
     * jumping animation for the character
     */
    characterIsJumping() {
        if (this.enableJump) {
            this.checkJumpAnimation();
        }
    }

    /**
     * moving right animation for the character
     */
    movingRightAnimation() {
        if (this.world.keyboard.RIGHT && !this.isAbove() && !this.isDead()) {
            if (!this.isHurt()) {
                this.animation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * moving left animation for the character
     */
    movingLeftAnimation() {
        if (this.world.keyboard.LEFT && !this.isAbove() && !this.isDead()) {
            if (!this.isHurt()) {
                this.animation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * increase the x position
     */
    moveRight() {
        if (this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            if (this instanceof Character) {
                this.otherDirection = false;
            }
            else if (this instanceof Endboss) {
                this.otherDirection = true;
            }
        }
    }

    /**
     * decrease the x position
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * check the phase of the jump and animate the right picture
     */
    checkJumpAnimation() {
        this.startJump();
        if (this.jumpcount >= 1 && this.y - this.lastHeight < 0) {
            this.jumpUp();
        }
        else if (this.y - this.lastHeight > 0 && ((this.y - 20) / 340) * 100 < 10) {
            this.jumpDown1();
        }
        else if (this.y - this.lastHeight > 0 && ((this.y - 20) / 340) * 100 > 10) {
            this.jumpDown2();
        }
        else if (this.y - this.lastHeight > 0 && ((this.y - 20) / 340) * 100 > 90) {
            this.jumpDown3();
        }
        else if (this.y - this.lastHeight == 0 && this.jumpcount != 3) {
            this.landing1();
        }
        else if (this.y - this.lastHeight == 0 && this.jumpcount == 3) {
            this.landing2();
        }
    }

    /**
     * animate the first and second jumping phase
     */
    startJump() {
        if (this.jumpcount == 0) {
            this.jumpPhase = 1;
            this.animateJump();
            this.jumpcount++;
        }
        else if (this.jumpcount == 1) {
            this.jumpPhase = 2;
            this.animateJump();
            this.jumpcount++;
            this.lastHeight = this.y;
        }
    }

    /**
     * animate the third jumping phase
     */
    jumpUp() {
        this.jumpPhase = 3;
        this.animateJump();
        this.lastHeight = this.y;
    }

    /**
     * falling down first phase
     */
    jumpDown1() {
        this.jumpPhase = 4;
        this.animateJump();
        this.lastHeight = this.y;
    }

    /**
     * falling down second phase
     */
    jumpDown2() {
        this.jumpPhase = 5;
        this.animateJump();
        this.lastHeight = this.y;
    }

    /**
     * falling down third pahse
     */
    jumpDown3() {
        this.jumpPhase = 6;
        this.animateJump();
        this.lastHeight = this.y;
    }

    /**
     * landing first phase
     */
    landing1() {
        this.jumpPhase = 7;
        this.animateJump();
        this.jumpcount = 3;
        this.lastHeight = this.y;
    }

    /**
     * landing second phase
     */
    landing2() {
        this.enableJump = false;
        this.jumpPhase = 8;
        this.animateJump();
        this.jumpcount = 0;
        this.lastHeight = this.y;
        this.enableJump = false;
    }

    /**
     * the animation of the jumping phase
     */
    animateJump() {
        let i = this.jumpPhase;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imgCache[path];
    }

    /**
     * for the y movement
     */
    jump() {
        this.speedY = 40;
    }

    /**
     * changing the image for the animation
     * @param {array} images 
     */
    animation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * a single animation
     * @param {array} images 
     */
    singleAnimation(images) {
        let i = this.singleAnimationCounter;
        let path = images[i];
        this.img = this.imgCache[path];
        if (i < images.length - 1) {
            this.singleAnimationCounter++;
        }
    }

    /**
     * single animation for dying
     * @param {array} images 
     */
    deadAnimation(images) {
        let i = this.deadAnimationCounter;
        let path = images[i];
        this.img = this.imgCache[path];
        if (i < images.length - 1) {
            this.deadAnimationCounter++;
        }
    }

    /**
     * draw a frame arround and object (visual hitbox)
     * @param {context} ctx 
     */
    // drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = "5";
    //     ctx.strokeStyle = "blue";
    //     ctx.rect(this.x, this.y, this.width, this.heigth);
    //     ctx.stroke();
    // }

    /**
     * mirroring the image when walking in the other direction
     * @param {context} ctx 
     */
    mirrorImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    /**
     * put the image back in the right direction
     * @param {context} ctx 
     */
    reMirrorImage(ctx) {
        this.x = this.x * -1;
        ctx.restore();
    }

    /**
     * check if the character ist colliding with an movable object
     * @param {object} mo 
     * @returns 
     */
    isColliding(mo) {
        return (this.x + this.width > mo.x &&
            this.y + this.heigth > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.heigth) ||
            (this.x > mo.x &&
                this.x < mo.x + mo.width &&
                this.y + this.heigth > mo.y &&
                this.y < mo.y + mo.heigth)
    }

    /**
     * making damage
     */
    hit() {
        if (this instanceof Character) {
            this.hitCharacter();
        }
        else if (this instanceof Endboss && this.energy >= 4) {
            this.hitEndboss();
        }
        else if (this instanceof Chicken && this.energy > 80) {
            this.hitChicken();
        }
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * damage to the character
     */
    hitCharacter() {
        this.energy -= 2;
        if (this.energy > 2) {
            this.characterHit_sound.play();
        }
    }

    /**
     * damage to endboss
     */
    hitEndboss() {
        this.energy -= 5;
        if (this.energy < 5) {
            this.defeatedEndboss_sound.play();
        }
        else if (this.energy > 6) {
            this.hitChicken_sound.play();
        }
    }

    /**
     * damage to chicken
     */
    hitChicken() {
        this.energy -= 100;
        this.hitChicken_sound.play();
    }

    /**
     * check if dead
     * @returns false or true
     */
    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }
}