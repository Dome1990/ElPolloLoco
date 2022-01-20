class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAbove()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAbove() {
        return this.y < 360 || this.speedY > 0;
    }



    /**
     * 
     * @param {*} IMAGES_WALKING animation for enemies
     */
    playAnimation(IMAGES_WALKING) {
        setInterval(() => {
            //this.walkingAnimation();
            this.animation(this.IMAGES_WALKING);
        }, 100)
        setInterval(() => {
            if (this.x > -1280) {
                this.moveLeft();
            }
            else {
                this.x = 1280;
            }
        }, 1000 / 60);
    }


    checkCharactermovement() {
        setInterval(() => {
            this.walking_sound.pause();
            /**
             * let character walk
             */
            if (this.world.keyboard.RIGHT) {
                if (!this.isAbove()) {
                    this.walking_sound.play();
                }
                this.moveRight();
            }
            if (this.world.keyboard.LEFT) {
                if (this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (!this.isAbove()) {
                    this.walking_sound.play();
                }
            }
            //character will jump with space and arrow up
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAbove()) {//&& this.y >=360
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    }

    animateMovement() {
        setInterval(() => {
            if (this.isDead()) {
                //this.deadAnimation();
                this.animation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                //this.hurtAnimation();
                this.animation(this.IMAGES_HURT);
            }
            if (this.isAbove()) {
                //this.jumpingAnimation();
                this.animation(this.IMAGES_JUMPING);
            }
            if (this.world.keyboard.RIGHT && !this.isAbove()) {
                //this.walkingAnimation();
                if (!this.isHurt()) {
                    this.animation(this.IMAGES_WALKING);
                }
            }
            if (this.world.keyboard.LEFT && !this.isAbove()) {
                //this.walkingAnimation();
                if (!this.isHurt()) {
                    this.animation(this.IMAGES_WALKING);
                }
            }
        }, 60);
    }

    moveRight() {
        if (this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }
    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 40;
    }

    animation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    // jumpingAnimation() {
    //     let i = this.currentImage % this.IMAGES_JUMPING.length;
    //     let path = this.IMAGES_JUMPING[i];
    //     this.img = this.imgCache[path];
    //     this.currentImage++;
    // }

    // walkingAnimation() {
    //     let i = this.currentImage % this.IMAGES_WALKING.length;
    //     let path = this.IMAGES_WALKING[i];
    //     this.img = this.imgCache[path];
    //     this.currentImage++;
    // }

    // deadAnimation() {
    //     let i = this.currentImage % this.IMAGES_DEAD.length;
    //     let path = this.IMAGES_DEAD[i];
    //     this.img = this.imgCache[path];
    //     this.currentImage++;
    // }

    // hurtAnimation() {
    //     let i = this.currentImage % this.IMAGES_HURT.length;
    //     let path = this.IMAGES_HURT[i];
    //     this.img = this.imgCache[path];
    //     this.currentImage++;
    // }

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

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.heigth > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.heigth
    }

    hit() {
        this.energy -= 2;
        console.log(this.energy);
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
       // timePassed = timePassed / 1000 // difference in s
        return timePassed < 500;
    }
}