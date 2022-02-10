class MovableObject extends DrawableObject {
    speed = 0.15;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    otherDirection;
    deadAnimationCounter = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAbove()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAbove() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 360 || this.speedY > 0;
        }
    }



    /**
     * 
     * @param {*} IMAGES_WALKING animation for enemies
     */
    playAnimation(movingIMAGES) {
        setInterval(() => {
            if (!this.isDead() && this instanceof Chicken) {
                this.animation(movingIMAGES);
            }

        }, 100)
        if (this instanceof Chicken) {
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
        else if (this instanceof Endboss) {
            setInterval(() => {
                this.otherDirection = false;
                if (!this.isDead() && (this.x - this.world.character.x) > 800) {
                    this.animation(movingIMAGES);
                }
                else if (!this.isDead() && (this.x - this.world.character.x) < 800 && !this.isHurt()) {
                    if ((this.x - this.world.character.x) <= -487) {
                        this.moveRight();
                        this.animation(this.IMAGES_WALK)
                    }
                    else if ((this.x - this.world.character.x) < 800 && (this.x - this.world.character.x) > 190) {
                        this.moveLeft();
                        this.animation(this.IMAGES_WALK);
                    }
                    if (this.isColliding(this.world.character)) {
                        if ((this.x - this.world.character.x) < -300) {
                            this.otherDirection = true;
                        }
                        this.animation(this.IMAGES_ATTACK);
                    }
                }
                else if (!this.isDead() && this.isHurt()) {
                    this.animation(this.IMAGES_HURT);
                }
                else if (this.isDead()) {
                    this.singleAnimation(this.IMAGES_DEAD);
                }
            }, 1000 / 15);
        }
    }


    checkCharactermovement() {
        setInterval(() => {
            this.walking_sound.pause();
            /**
             * let character walk
             */
            if (this.world.keyboard.RIGHT && !this.isDead()) {
                if (!this.isAbove()) {
                    this.walking_sound.play();
                }
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && !this.isDead()) {
                if (this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (!this.isAbove()) {
                    this.walking_sound.play();
                }
            }
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAbove() && !this.isDead()) {//&& this.y >=360
                this.jump();
                this.enableJump = true;
            }
            this.world.camera_x = -this.x + 100;
            this.world.healthBar.x = this.x;
            this.world.coinBar.x = this.x + 250;
            this.world.bottleBar.x = this.x + 500;
        }, 1000 / 60)
    }

    animateMovement() {
        setInterval(() => {
            if (this.isDead()) {
                //this.animation(this.IMAGES_DEAD);
                this.deadAnimation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.animation(this.IMAGES_HURT);
            }
            if(this.enableJump){
                this.checkJumpAnimation();
            }
            // if (this.isAbove()) {
            //     this.animation(this.IMAGES_JUMPING);
            // }
            if (this.world.keyboard.RIGHT && !this.isAbove() && !this.isDead()) {
                if (!this.isHurt()) {
                    this.animation(this.IMAGES_WALKING);
                }
            }
            if (this.world.keyboard.LEFT && !this.isAbove() && !this.isDead()) {
                if (!this.isHurt()) {
                    this.animation(this.IMAGES_WALKING);
                }
            }
        }, 60);
    }

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
    moveLeft() {
        this.x -= this.speed;
    }

    jumpcount = 0;
    jumpPhase = 0;
    lastHeight;
    enableJump = false;

    checkJumpAnimation(){

        if (this.jumpcount == 0){
            //img1
            this.jumpPhase = 1;
            this.animateJump();
            this.jumpcount++;
        }
        else if (this.jumpcount == 1){
            //img2
            this.jumpPhase = 2;
            this.animateJump();
            this.jumpcount++;
            this.lastHeight = this.y;
        }
        else if (this.jumpcount >=1 && this.y - this.lastHeight < 0){
            //img3
            this.jumpPhase = 3;
            this.animateJump();
            this.lastHeight = this.y;
        }
        else if (this.y - this.lastHeight > 0 && ((this.y-20)/340)*100 < 10){
            //img4
            this.jumpPhase = 4;
            this.animateJump();
            this.lastHeight = this.y;
        }
        else if (this.y - this.lastHeight > 0 && ((this.y-20)/340)*100 > 10){
            //img5
            this.jumpPhase = 5;
            this.animateJump();
            this.lastHeight = this.y;
        }
        else if(this.y - this.lastHeight > 0 && ((this.y-20)/340)*100 > 90){
            //img6
            this.jumpPhase = 6;
            this.animateJump();
            this.lastHeight = this.y;
        }
        else if(this.y - this.lastHeight == 0 && this.jumpcount !=3){
            //img7
            this.jumpPhase = 7;
            this.animateJump();
            this.jumpcount = 3;
            this.lastHeight = this.y;
        }
        else if(this.y - this.lastHeight == 0 && this.jumpcount == 3){
           // img 7
           this.enableJump = false;
           this.jumpPhase = 8;
           this.animateJump();
           this.jumpcount = 0;
           this.lastHeight = this.y;
           this.enableJump = false;
        }
    }


    animateJump(){
        let i = this.jumpPhase;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imgCache[path];
    }

    jump() {

        // if (this.jumpcount == 0 && !this.isAbove()){
        //     //img1
        //     this.jumpcount++;
        // }
        // else if (this.jumpcount == 1){
        //     //img2
        //     this.jumpcount++;
        //     this.lastHeight = this.y;
        // }
        // else if (this.jumpcount >=1 && this.y - this.lastHeight < 0){
        //     //img3
        //     this.lastHeight = this.y;
        // }
        // else if (this.y - this.lastHeight > 0 && ((this.y-20)/340)*100 < 80){
        //     //img4
        //     this.lastHeight = this.y;
        // }
        // else if (this.y - this.lastHeight > 0 && ((this.y-20)/340)*100 > 80){
        //     //img5
        //     this.lastHeight = this.y;
        // }
        // else if(this.y - this.lastHeight > 0 && ((this.y-20)/340)*100 > 90){
        //     //img6
        //     this.lastHeight = this.y;
        // }
        // else if(this.y - this.lastHeight == 0){
        //     //img7
        //     this.jumpcount++;
        // }
        // else if(this.y - this.lastHeight == 0 && this.jumpcount == 3){
        //    // img 7
        //    //this.enableJump = true;
        //    this.jumpcount = 0;
        //    this.lastHeight = this.y;
        // }



        this.speedY = 40;


       
    }



    animation(images) {
        if(this instanceof Character){
            console.log('height' + this.y)
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    singleAnimation(images) {
        let i = this.singleAnimationCounter;
        let path = images[i];
        this.img = this.imgCache[path];
        if (i < images.length - 1) {
            this.singleAnimationCounter++;
        }
    }

    deadAnimation(images) {
        let i = this.deadAnimationCounter;
        let path = images[i];
        this.img = this.imgCache[path];
        if (i < images.length - 1) {
            this.deadAnimationCounter++;
        }
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.heigth);
        ctx.stroke();
    }
    mirrorImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }
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

    hit() {
        if (this instanceof Character) {
            this.energy -= 2;
        }
        else if (this instanceof Endboss) {
            this.energy -= 5;
        }
        else if (this instanceof Chicken) {
            this.energy -= 100;
        }
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }
}